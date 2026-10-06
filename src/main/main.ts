// src/main/main.ts — the Electron main process entry. Creates the BrowserWindow
// (the renderer owns the provident-ssr graph + DOM), starts the MCP server
// (stdio or Streamable HTTP), and bridges MCP tool calls to the renderer via
// IPC.
import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'node:path'
import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync, rmSync, openSync, closeSync, fsyncSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { IPC_INVOKE, IPC_REPLY, IPC_READY, IPC_SECURITY_GET, IPC_SECURITY_SET, IPC_NOTIFY, IPC_MODULE_GET, IPC_MODULE_SET_DISABLED, type RpcReply, type NotifyPayload, type SecuritySettings } from '../shared/types.js'
import { ProvidentMcpServer, RendererBackend, type McpTransportKind } from './mcp-server.js'
import { createSecurityStore, type SecurityStore, type SecurityWriteReceipt } from './security-store.js'
import { createModuleStore, type ModuleStore, type ModuleRecord, type ModuleStoreStatus } from './module-store.js'
import { STORE_FILE_GET, STORE_FILE_PUT, IPC_SECURITY_EXCLUSION } from './store-channels.js'
import { CapabilityRouter } from '../renderer/extensions.js'
import { syncModuleRouter } from './mcp-server.js'
import { SecurityGate, type ToolGroup } from './security.js'

// The main process is bundled as CJS (Electron runs it reliably that way), so
// `__dirname` is available.
const here = __dirname

/** THE RESERVED SETTINGS TOP-LEVEL NAMES (`docs/specs/store-persist.md` §2.7 item 4 / §2.8
 *  item 4 — the collision rule's set, `NW-10`): a module id colliding with one is REFUSED
 *  `reason:'reserved-namespace'`, never a silent overwrite. */
const RESERVED_NAMESPACES: readonly string[] = ['window', 'tabs', 'layout', 'settings', 'tracked', 'modules']

/** THE MODULE RECORD'S SHA-256 — always derived from `source` at put time, never trusted from
 *  input, and re-verified at every boot from the store's own record (the module half's landed
 *  hash-verify posture, `docs/specs/store-persist.md` §2.6 item 4 / §2.8 item 1(2)). */
function sha256(source: string): string {
  return createHash('sha256').update(source, 'utf8').digest('hex')
}

function transportFromArgs(argv: string[]): McpTransportKind {
  const flag = argv.find((a) => a.startsWith('--mcp-transport='))
  if (flag) {
    const v = flag.slice('--mcp-transport='.length)
    if (v === 'http' || v === 'stdio') return v
  }
  const env = process.env.PROVIDENT_MCP_TRANSPORT
  if (env === 'http' || env === 'stdio') return env
  return 'http'
}

function portFromArgs(argv: string[]): number {
  const flag = argv.find((a) => a.startsWith('--mcp-port='))
  if (flag) {
    const v = Number(flag.slice('--mcp-port='.length))
    if (Number.isFinite(v)) return v
  }
  const env = Number(process.env.PROVIDENT_MCP_PORT)
  if (Number.isFinite(env)) return env
  return 3787
}

/** Read a user-data override off the process's own command line, using the same
 *  argv-scan idiom as `--mcp-transport=` / `--mcp-port=` above: the flag is a
 *  `--`-prefixed argument carrying the scratch profile path, and `undefined` when
 *  it is absent — the inert case (`SEAM-1`). The spec pins the argv route only
 *  (§4.2 ADD-2), so no env fallback is added: a narrower seam is the safer seam.
 *  The flag SPELLING is passed in by `main()` (recorded in the leg and in
 *  docs/decisions.md when the unit lands). */
function userDataFromArgs(argv: string[], flagName: string): string | undefined {
  const flag = argv.find((a) => a.startsWith(flagName))
  if (flag === undefined) return undefined
  const v = flag.slice(flagName.length)
  return v !== '' ? v : undefined
}

async function main(): Promise<void> {
  console.error(`[provident-main] node ${process.versions.node} electron ${process.versions.electron} crypto=${typeof globalThis.crypto}`)
  // ADDITIVE SEAM (docs/specs/ci-ui-leg.md §4): honour a user-data override
  // BEFORE the security store is created, so a controlled temp profile can be
  // booted. `app.setPath('userData', …)` must run before `app.whenReady()`
  // resolves — `main()` itself runs inside `app.whenReady().then(...)`, so this
  // is in time. Absent ⇒ nothing below changes (SEAM-1): the store paths keep
  // their landed `app.getPath('userData')` derivation.
  const userDataOverride = userDataFromArgs(process.argv.slice(1), '--provident-user-data=')
  if (userDataOverride !== undefined) app.setPath('userData', userDataOverride)
  const transport = transportFromArgs(process.argv.slice(1))
  const port = portFromArgs(process.argv.slice(1))

  // The manual-UI security settings (mcp-endpoint.md §6.4): persisted to
  // userData so a restart restores them. The MCP server gate is built from the
  // persisted config (read+dispatch ON by default on first run).
  const securityStore: SecurityStore = createSecurityStore({
    path: join(app.getPath('userData'), 'provident-security.json'),
  })
  const persisted = securityStore.get()
  // `docs/specs/secure-exclusion.md` `§2.1` item 4 — THE ORDERING ENVELOPE, STEP 2: the gate is
  // CONSTRUCTED here (after the store, before the transports) and the exclusion record is
  // INITIALIZED to its boot terminal `'mcp-enabled'` AT THIS CONSTRUCTION SITE — never read from
  // a file, because the flag is NOT persisted (`D-19`). A crash, a torn record, a corrupt file and
  // a missing file therefore all resolve to the SAFE pair.
  const gate = new SecurityGate({ token: persisted.token, enabled: persisted.enabled as ToolGroup[] })
  const backend = new RendererBackend()

  // ═══════════════════════════ TIER 1 — THE CHANNEL + THE FILE (G2 `U-STORE-PERSIST`,
  // `docs/specs/store-persist.md` §2.7/§2.8) ═══════════════════════════
  // Tier 1's carrier is `<userData>/provident-settings.json` (the consolidated-location
  // rule, §2.7 item 1). The legacy `<userData>/provident-modules.json` is named ONLY at the
  // migration's removal declaration (§2.8 step (4)) — it is never WRITTEN by this boot.
  const settingsPath = join(app.getPath('userData'), 'provident-settings.json')
  const legacyModulesPath = join(app.getPath('userData'), 'provident-modules.json')
  /** THE THIRD HOLDER OF TIER-1 STATE IN MAIN (`C-10` / `R1` — `bootRecord`): the parsed
   *  settings record held between the boot read and the Y-1 hand-off — populated at the boot
   *  read, refreshed ONLY by the channel's own committed writes, served at each realm's Y-1
   *  and NEVER authoritative after the hand-off (§2.10). */
  let bootRecord: Record<string, unknown> | null = null
  /** The module half's cold-vs-corrupt status: a missing settings file is the COLD tier
   *  (`corrupt: false`), an unreadable/invalid one is `corrupt: true` (§2.6 item 4). */
  let settingsCorrupt = false

  /** THE BOOT READ — read the file ONCE, validate (a JSON object whose keys are admissible
   *  `file.*` reference spellings plus the single reserved `schemaVersion` member), hold the
   *  parsed record. A missing file and a corrupt/invalid file both answer the REGISTERED
   *  DEFAULTS (the empty record today) — this read NEVER throws (§2.6 item 4; the plan's
   *  failure-mode (2) clause). */
  function readSettingsRecord(): { readonly record: Record<string, unknown>; readonly corrupt: boolean } {
    let record: Record<string, unknown> = {}
    let corrupt = false
    try {
      if (existsSync(settingsPath)) {
        const parsed: unknown = JSON.parse(readFileSync(settingsPath, 'utf8'))
        if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
          const candidate = parsed as Record<string, unknown>
          let admissible = true
          for (const key of Object.keys(candidate)) {
            if (key !== 'schemaVersion' && !key.startsWith('file.')) admissible = false
          }
          if (admissible && candidate['schemaVersion'] === '1') record = candidate
          else corrupt = true
        } else {
          corrupt = true
        }
      }
    } catch {
      corrupt = true
    }
    return { record, corrupt }
  }
  const bootRead = readSettingsRecord()
  bootRecord = bootRead.record
  settingsCorrupt = bootRead.corrupt

  // ══ THE Q-5 MIGRATION — the five steps (§2.8 item 1): (1) READ the legacy registry through
  // the module store's landed load/sanitize shape; (2) VERIFY — the SHA-256 per-record
  // re-verification rides WITH the record (the hash is re-verified at every boot from the
  // store's own record; `quarantined`/`corrupt` stay DERIVED per process, never migrated);
  // (3) WRITE the records + their `disabled` flags under `file.modules.<id>` in ONE atomic
  // settings write; (4) THE ONE-BOOT WINDOW — the legacy file is retained READ-ONLY for this
  // boot (never written) and REMOVED after it; the settings file wins from then on. ══
  if (existsSync(legacyModulesPath)) {
    const legacyStore = createModuleStore({ path: legacyModulesPath })
    const legacyRecords = legacyStore.list()
    if (legacyRecords.length > 0) {
      const migrated: Record<string, unknown> = Object.create(null)
      if (bootRecord !== null) {
        for (const key of Object.keys(bootRecord)) {
          if (key.startsWith('file.')) migrated[key] = bootRecord[key]
        }
      }
      for (const rec of legacyRecords) {
        // a derived value is not data — `quarantined` is re-derived per process, never migrated
        const clean: ModuleRecord = { ...rec, quarantined: undefined }
        migrated[`file.modules.${rec.name}`] = clean
      }
      migrated['schemaVersion'] = '1'
      commitSettingsWrite(migrated)
    }
    rmSync(legacyModulesPath, { force: true })
  }

  // ══ THE SETTINGS-BACKED MODULE SURFACE (§2.8 item 2 — BOTH writer classes re-pointed to
  // the store's file tier): the MCP `module.*` handlers (writer class 2, received through the
  // server's `moduleStore` option) and the operator `IPC_MODULE_SET_DISABLED` toggle (writer
  // class 1) both mutate THIS surface, whose every mutation lands via the channel's ONE
  // atomic write — a single authority, so after a `module.update` + a `setDisabled` on the
  // same module the store's record and the file AGREE. The readers (`syncModuleRouter`,
  // `status().loaded`) read the same record. ══
  const moduleRecordsOf = (): ModuleRecord[] => {
    const out: ModuleRecord[] = []
    if (bootRecord === null) return out
    for (const key of Object.keys(bootRecord)) {
      if (!key.startsWith('file.modules.')) continue
      const entry: unknown = bootRecord[key]
      if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) out.push(entry as ModuleRecord)
    }
    return out
  }
  const modulePayloadWith = (key: string, rec: ModuleRecord): Record<string, unknown> | null => {
    if (bootRecord === null) return null
    const payload: Record<string, unknown> = Object.create(null)
    for (const k of Object.keys(bootRecord)) payload[k] = bootRecord[k]
    payload[key] = rec
    payload['schemaVersion'] = '1'
    return payload
  }
  const moduleSurface: ModuleStore = {
    get(name: string): ModuleRecord | undefined {
      if (bootRecord === null) return undefined
      const entry: unknown = bootRecord[`file.modules.${name}`]
      if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) return undefined
      return entry as ModuleRecord
    },
    list(): ModuleRecord[] {
      return moduleRecordsOf()
    },
    status(): ModuleStoreStatus {
      const loadedNames: string[] = []
      const quarantinedNames: string[] = []
      for (const rec of moduleRecordsOf()) {
        // boot re-verification: the hash is ALWAYS re-derived from the record's own source
        if (rec.hash !== sha256(rec.source)) quarantinedNames.push(rec.name)
        else if (rec.disabled !== true) loadedNames.push(rec.name)
      }
      return { corrupt: settingsCorrupt, quarantined: quarantinedNames, loaded: loadedNames }
    },
    put(record: ModuleRecord): ModuleRecord {
      // F2 (adversarial) — put() validates its input like the disk path: never crash, never
      // persist a malformed record. The collision rule (§2.8 item 4): a module id colliding
      // with a RESERVED top-level settings key is refused reason:'reserved-namespace'.
      if (record === null || typeof record !== 'object') throw new Error('module put: record must be an object')
      if (typeof record.name !== 'string' || record.name === '') throw new Error('module put: name required')
      if (typeof record.version !== 'string' || record.version === '') throw new Error('module put: version required')
      if (typeof record.source !== 'string' || record.source === '') throw new Error('module put: source required')
      if (RESERVED_NAMESPACES.includes(record.name)) {
        throw new Error(`module put: '${record.name}' collides with a reserved settings namespace — refusal reason:'reserved-namespace', never a silent overwrite`)
      }
      const rec: ModuleRecord = {
        name: record.name,
        version: record.version,
        source: record.source,
        hash: sha256(record.source),
        capabilities: record.capabilities,
        installedAt: record.installedAt ?? new Date().toISOString(),
        disabled: record.disabled === true,
        quarantined: false,
      }
      const payload = modulePayloadWith(`file.modules.${rec.name}`, rec)
      if (payload !== null) commitSettingsWrite(payload)
      return { ...rec, capabilities: rec.capabilities }
    },
    remove(name: string): boolean {
      if (bootRecord === null) return false
      const key = `file.modules.${name}`
      if (!(key in bootRecord)) return false
      const payload: Record<string, unknown> = Object.create(null)
      for (const k of Object.keys(bootRecord)) if (k !== key) payload[k] = bootRecord[k]
      payload['schemaVersion'] = '1'
      commitSettingsWrite(payload)
      return true
    },
    setDisabled(name: string, disabled: boolean): void {
      const rec = moduleSurface.get(name)
      if (rec === undefined) return
      const next: ModuleRecord = { ...rec, disabled }
      const payload = modulePayloadWith(`file.modules.${name}`, next)
      if (payload !== null) commitSettingsWrite(payload)
    },
  }
  // U9-FIX — the live capability router (main-process). Synced from the store's record so
  // installed modules' declared tools become callable. Passed to the MCP server so dynamic
  // module tools are registered + two-gated.
  const moduleRouter = new CapabilityRouter()
  syncModuleRouter(moduleRouter, moduleSurface)
  // THE ONE-LINE OPTIONS PASS (§2.8 item 3): the server's construction options receive the
  // re-pointed module surface — the module tools' REPLY SHAPES are UNCHANGED.
  const mcp = new ProvidentMcpServer({ backend, transport, port, gate, moduleStore: moduleSurface, router: moduleRouter })

  // The manual-UI settings IPC: main owns the config + re-wires the MCP server
  // tool-gating on change. This is manual-UI-ONLY — it is NOT reachable over an
  // MCP tool (the MCP tool handlers never route to it), so an agent cannot grant
  // itself capabilities.

  // ══ THE TIER-1 CHANNEL HANDLERS (§2.9 — registered BEFORE the BrowserWindow) ══

  // THE Y-1 BOOT HAND-OFF (the request channel, §2.3): once per realm, at boot, BEFORE the
  // first graph load. The response is `{name, value}[]` — the persisted reference list, and
  // `[]` for a cold tier. A missing/corrupt file NEVER throws — the read-back answers the
  // declared recovery (§2.6 item 4) in every case.
  ipcMain.handle(STORE_FILE_GET, async () => {
    // THE THIRD HOLDER (§2.10): the boot read populated `bootRecord`; a realm that drives
    // this handler without the boot read performs the ONE guarded read here — a second Y-1
    // in the same realm re-serves the current record, never a second file read.
    if (bootRecord === null) {
      let record: Record<string, unknown> = {}
      try {
        if (existsSync(settingsPath)) {
          const parsed: unknown = JSON.parse(readFileSync(settingsPath, 'utf8'))
          if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
            const candidate = parsed as Record<string, unknown>
            if (candidate['schemaVersion'] === '1') record = candidate
          }
        }
      } catch {
        record = {}
      }
      bootRecord = record
    }
    const entries: { name: string; value: unknown }[] = []
    for (const key of Object.keys(bootRecord)) {
      if (key === 'schemaVersion') continue
      entries.push({ name: key, value: bootRecord[key] })
    }
    return entries
  })

  // THE Y-2 COMMIT CHANNEL (the crossing's wire, §2.4): ONE crossing per commit — the
  // incoming `value` is the STABLE-JSON TRANSLATION of the graph (a JSON string). The
  // channel VALIDATES it, projects it to the file-tier record, stamps `schemaVersion` from
  // the FIRST write (§2.7 item 5), and answers the minimal status — `{status:'committed'}`
  // or a refused receipt `{status:'refused', reason}`. A refusal clears NOTHING and leaves
  // the previous file intact (§2.4 item 4); the receipt is ALWAYS answered, never a swallow.
  ipcMain.handle(STORE_FILE_PUT, (_event, row: { name?: unknown; value?: unknown }) => {
    const MALFORMED = 'malformed-payload'
    let projected: Record<string, unknown> = Object.create(null)
    try {
      if (row === null || typeof row !== 'object') return { status: 'refused', reason: MALFORMED }
      const raw: unknown = (row as { value?: unknown }).value
      if (typeof raw !== 'string') return { status: 'refused', reason: MALFORMED }
      let translated: unknown
      try {
        translated = JSON.parse(raw)
      } catch {
        return { status: 'refused', reason: MALFORMED }
      }
      if (translated === null || typeof translated !== 'object' || Array.isArray(translated)) {
        return { status: 'refused', reason: MALFORMED }
      }
      // THE FILE-TIER PROJECTION (§2.7 item 3 / §0A item 6): every `file.*`-keyed spelling of
      // the crossing's translation lands (incl. the file.settings.* and file.modules.*
      // namespaces); the `mem.*`/`temp.*`/`secure.*` keys NEVER land in the file; the single
      // reserved `schemaVersion` member is stamped on the projected record.
      for (const key of Object.keys(translated as Record<string, unknown>)) {
        if (typeof key === 'string' && key.startsWith('file.')) {
          projected[key] = (translated as Record<string, unknown>)[key]
        }
      }
      projected['schemaVersion'] = '1'
    } catch {
      return { status: 'refused', reason: MALFORMED }
    }
    return commitSettingsWrite(projected)
  })

  /** THE ONE ATOMIC WRITE MACHINERY (§2.6 items 1-3/6 — THE HEADLINE): IN ORDER — the parent
   *  directory created recursively, the projected record STAGED to `${path}.tmp`, the staged
   *  file FLUSHED before the rename, the rename onto the real path, then the parent DIRECTORY
   *  flushed after it. The real path changes ONLY at the rename, so a torn file is IMPOSSIBLE
   *  by construction; a failure at any point leaves the previous file intact and answers the
   *  refused receipt; a successful persist leaves NO `${path}.tmp` residue and refreshes
   *  `bootRecord` (the third holder's refresh rule, §2.10 clause (b)); the non-atomic plain
   *  write of `security-store.ts` is the pattern this machinery must NOT copy (§2.6 item 1). */
  function commitSettingsWrite(payload: Record<string, unknown>): { status: 'committed' | 'refused'; reason?: 'malformed-payload' | 'write-failed' } {
    const WRITE_FAILED = 'write-failed'
    try {
      mkdirSync(dirname(settingsPath), { recursive: true })
      writeFileSync(`${settingsPath}.tmp`, JSON.stringify(payload, null, 2))
      const tmpFd = openSync(`${settingsPath}.tmp`, 'r')
      fsyncSync(tmpFd)
      closeSync(tmpFd)
      renameSync(`${settingsPath}.tmp`, settingsPath)
      const dirFd = openSync(dirname(settingsPath), 'r')
      fsyncSync(dirFd)
      closeSync(dirFd)
      bootRecord = payload
      return { status: 'committed' }
    } catch {
      return { status: 'refused', reason: WRITE_FAILED }
    }
  }

  // PAR-9 — the GET response record is EXTENDED ADDITIVELY by the declared `exclusion` member
  // (the landed `write` member's precedent below): the member is NEVER absent on a read.
  ipcMain.handle(IPC_SECURITY_GET, () => ({ ...securityStore.get(), exclusion: gate.exclusionState() }))
  ipcMain.handle(IPC_SECURITY_SET, (_event, patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }) => {
    // THE RECEIPT'S ADDITIVE DELIVERY (§2.3 items 2/4 — the C-11 NON-BREAKING
    // reading, G3 2026-10-03): `set()`'s OWN return stays the post-state
    // SecuritySettings (no consumer reads it — the pane bodies fire-and-forget);
    // the RESPONSE record is the post-state extended by the declared member
    // `write` — `{ ...settings, write }`, a SUPERSET of the old resolution (a
    // reader typed to the old shape continues to typecheck and reads
    // identically). The `write` member is NEVER absent on a SET response — the
    // handler just performed a write (totality, P-SE-TP-1).
    const updated = { ...securityStore.set(patch), write: securityStore.lastWriteReceipt() } as SecuritySettings & { write: SecurityWriteReceipt }
    // Re-gate the live MCP server + persist.
    mcp.applyGatePatch({ token: patch.token, groups: patch.groups as ToolGroup[] | undefined, disable: patch.disable as ToolGroup[] | undefined })
    // `§2.1` item 3 `T-5` / `PAR-9` — the SET is NOT a transition site: the response carries the
    // SAME additive `exclusion` member BESIDE the landed `write`, and the state is untouched (a
    // SET that flipped the exclusion would make it a side effect of an unrelated write). The
    // member is attached to the SAME post-state record `set()` minted, so the landed
    // `return updated` resolution — and every reader anchored on it — is unchanged.
    ;(updated as unknown as { exclusion: string }).exclusion = gate.exclusionState()
    return updated
  })

  // `docs/specs/secure-exclusion.md` §2.4 item 4 / PAR-8 — THE TRANSITION'S OWN CHANNEL. It is
  // SEPARATE from the settings write, so the transition and the settings write stay two
  // distinguishable operations (`T-5` is observable rather than inferred) and `set(patch)`'s
  // declared domain stays unmoved. THE HANDLER IS TOTAL OVER ITS DECLARED DOMAIN: the two legal
  // tokens apply the transition; EVERY outside value — a boolean, a number, an object, an array,
  // `undefined`, `null`, an unknown string, a case-variant, a whitespace-padded string — is
  // REFUSED AS A VALUE, never a throw and never a silent no-op that looks applied.
  ipcMain.handle(IPC_SECURITY_EXCLUSION, (_event, state: unknown) => {
    if (state !== 'mcp-enabled' && state !== 'mcp-disabled') {
      return { applied: false, state: gate.exclusionState(), reason: 'malformed-state' }
    }
    // THE TRANSITION IS THE GATE'S OWN (the pure-constructor form) and the server's live gate is
    // REPLACED exactly as `applyGatePatch` replaces it: the record, the epoch bump and the
    // in-flight invalidation land together, and the registered handles are toggled beside them.
    // A SELF-TRANSITION is a legal no-op: no bump, no invalidation, the toggles re-applied
    // idempotently (an epoch bump on a no-op would be a denial-of-service surface).
    mcp.applyExclusion(state)
    return { applied: true, state: gate.exclusionState() }
  })

  // U8 → Q-5 — the module management IPC (module-feature-list.md §4). Manual-UI only: the
  // module registry is operator-owned (the settings-backed surface above); an agent never
  // reaches it over MCP.
  const moduleBridgeResult = () => {
    const status = moduleSurface.status()
    return {
      corrupt: status.corrupt,
      quarantined: status.quarantined,
      loaded: status.loaded,
      modules: moduleSurface.list().map((r) => ({
        name: r.name,
        version: r.version,
        capabilities: r.capabilities,
        disabled: r.disabled,
        quarantined: r.quarantined,
      })),
    }
  }
  ipcMain.handle(IPC_MODULE_GET, () => moduleBridgeResult())
  ipcMain.handle(IPC_MODULE_SET_DISABLED, (_event, payload: { name?: string; disabled?: boolean }) => {
    if (typeof payload?.name === 'string' && payload.name !== '') {
      // WRITER CLASS 1 (§2.8 item 2) — the operator's `disabled` TOGGLE re-pointed to the
      // store's file tier (the single writer site for the disabled flag).
      moduleSurface.setDisabled(payload.name, payload.disabled === true)
      // U9-FIX (#2) — disabling/enabling a module must re-sync the live router
      // so its tools are registered/deregistered accordingly.
      syncModuleRouter(moduleRouter, moduleSurface)
    }
    return moduleBridgeResult()
  })

  // The MCP stdio transport is spawned by a client (the battery, a test, or an
  // agent). When that client disconnects, stdin closes. Exit so a test run does
  // NOT leave an orphaned Electron app instance open on the machine — otherwise
  // every test spawn leaves a live BrowserWindow behind.
  if (transport === 'stdio') {
    process.stdin.on('end', () => {
      console.error('[provident-main] stdin closed — MCP client disconnected; exiting')
      void mcp.close().finally(() => app.exit(0))
    })
    process.stdin.on('error', () => {
      void mcp.close().finally(() => app.exit(0))
    })
  }

  // `docs/specs/secure-exclusion.md` §2.4 item 5(a) — THIS HANDLER STAYS UNCHANGED AND
  // UNCONDITIONAL, and the rationale is recorded HERE, OUTSIDE the body, on purpose: the row that
  // reads the handler's own body asserts it carries NO state-clearing token at all, so the body
  // below is left byte-for-byte the landed one. `markReady()` is the renderer's ARRIVAL signal,
  // not the operator's CONSENT signal; a gate re-armed on readiness would be re-armed by the very
  // party the gate exists to constrain (the `G-7` hazard), so no readiness path ever derives from
  // or clears the operator's disabled state.
  ipcMain.on(IPC_READY, () => {
    backend.markReady()
    console.error('[provident-main] renderer ready — MCP backend armed')
  })
  ipcMain.on(IPC_REPLY, (_event, reply: RpcReply) => {
    backend.handleReply(reply)
  })
  // N4 (live-notification-review.md) — the app-graph-changed push from the
  // renderer. Maps it into a resource-updated notification over the stdio MCP
  // server (N2: HTTP is stateless → no-op). Sourced ONLY from the app Runtime
  // re-render; SecurePanels never emits here.
  ipcMain.on(IPC_NOTIFY, (_event, payload: NotifyPayload) => {
    void mcp.notifyGraphChanged()
  })

  const win = new BrowserWindow({
    width: 980,
    height: 720,
    webPreferences: {
      preload: join(here, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  backend.attachWindow(win)

  const rendererHtml = join(here, '..', 'renderer', 'index.html')
  await win.loadFile(rendererHtml)

  await mcp.start()

  win.on('closed', () => {
    void mcp.close()
    app.quit()
  })
}

app.whenReady().then(() => {
  void main().catch((e) => {
    console.error('[provident-main] fatal:', e)
    app.exit(1)
  })
})

app.on('window-all-closed', () => {
  app.quit()
})