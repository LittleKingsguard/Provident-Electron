// src/main/main.ts — the Electron main process entry. Creates the BrowserWindow
// (the renderer owns the provident-ssr graph + DOM), starts the MCP server
// (stdio or Streamable HTTP), and bridges MCP tool calls to the renderer via
// IPC.
import {app, BrowserWindow, ipcMain} from 'electron'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createHash} from 'node:crypto'
import {IPC_INVOKE, IPC_REPLY, IPC_READY, IPC_SECURITY_GET, IPC_SECURITY_SET, IPC_SECURITY_CHANGED, IPC_NOTIFY, IPC_MODULE_GET, IPC_MODULE_SET_DISABLED, IPC_MODULE_CHANGED, IPC_DATA_READ, IPC_DATA_WRITE, IPC_DATA_DELETE, IPC_DATA_LIST, IPC_DATA_JOURNAL, type RpcReply, type NotifyPayload} from '../shared/types.js'
import {ProvidentMcpServer, RendererBackend, type McpTransportKind} from './mcp-server.js'
import type {SettingsAppStateRow} from './settings-surface/index.js'
import {createSettingsSurface} from './settings-surface/index.js'
// THE REGISTRY'S INTERFACE ONLY — the record shape, the status answer and the six verbs. They lived
// in the deleted `src/main/module-store.ts` and are declared by the module tools' own module now
// (`D-81`); this file CONSTRUCTS nothing from them: the one implementation is the object literal
// below, over the secure crossing's rows.
import type {ModuleStore, ModuleRecord, ModuleStoreStatus} from './mcp-server.js'
// ⟶ **TWO CONSTANTS LEAVE THIS IMPORT AND THE FILE KEEPS ONE** (`D-93`): `STORE_FILE_GET` and `STORE_FILE_PUT` are
// deleted with the projection they carried, and `IPC_SECURITY_EXCLUSION` — the exclusion transition's own channel — stands
// because its surface is the SECURE CROSSING's and has nothing to do with the renderer's frozen store.
import {IPC_SECURITY_EXCLUSION, IPC_SECURITY_PANE} from './store-channels.js'
import {CapabilityRouter} from '../renderer/extensions.js'
import {syncModuleRouter} from './mcp-server.js'
import {SecurityGate, type ToolGroup} from './security.js'
// central-data (`docs/L1/central-data-census-exception.md` §2 E-3) — the module's surface enters the
// composition here, and nothing else of this file moves: it constructs no store and touches no file
// until a `data.*` tool is called (D-11, D-13).
import {createDataSurface} from './data/index.js'
// `store-tabs-record` (D-62, D-63) — the tab record's surface enters the composition HERE and nothing else
// of this file moves: it constructs no store, spells no `provident-*.json` literal for one, and reaches the
// record only through the surface's own read/commit (the arrangement the operator's store already uses).
import {createTabsSurface} from './tabs-surface/index.js'
import {tabsConstraintDeclarations, tabsDeclaredRoots} from './tabs-record/index.js'
import {createProfileStore} from './storeroom.js'
import {PROFILE_FILE_NAME} from './data/store.js'
import {IPC_TABS_READ, IPC_TABS_COMMIT, IPC_TABS_REMOVE, IPC_TABS_CHANGED} from '../shared/tabs-channels.js'
// `view-record` (D-87) — THE CROSSING'S SECOND DECLARATION SET, and the last address the frozen graph store was holding:
// the pane geometry, the zone family and the appearance record. It enters the composition HERE and nothing else of this file's shape moves:
// its three declarations are batched into the SAME `createProfileStore` call the tab record's six ride (D-65), its surface
// is constructed beside the tab record's, and its six handlers stand beside the tab record's three. It constructs no
// store and spells no `provident-*.json` literal for one.
import {createViewSurface} from './view-surface/index.js'
import {viewConstraintDeclarations, viewDeclaredRoots} from './view-record/index.js'
import {IPC_VIEW_READ, IPC_VIEW_PANE_COMMIT, IPC_VIEW_ZONES_COMMIT, IPC_VIEW_THEME_COMMIT, IPC_VIEW_DRAG_COMMIT, IPC_VIEW_DRAG_CLEAR, IPC_VIEW_CHANGED} from '../shared/view-channels.js'

// This entry is emitted as ESM (`dist/main/main.mjs`, the artifact `package.json`'s `main` field
// names), so the module scope is a file URL rather than a CommonJS directory global: `here` is the
// directory holding this artifact, derived from the URL the loader supplies for this module — the
// only module-scope directory source an ESM entry has — and both joins that compose from it are
// unchanged: the `preload:` join in the `BrowserWindow` options, and the renderer-HTML join that
// builds `rendererHtml` below it (D-41: name the site, never the offset).
const here = dirname(fileURLToPath(import.meta.url))

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

  // The manual-UI security settings (mcp-endpoint.md §6.4): persisted to userData so a restart
  // restores them. The MCP server gate is built from the persisted config (read+dispatch ON by
  // default on first run).
  //
  // ═══ `A-1`'S RULING (`docs/specs/tier4-arbitrary-storage.md` `§0A` item 1, AMENDED
  // `2026-10-11`) — THE ONE BOOLEAN'S HOME IS THE STATIC HOLDER, AND THIS MODULE HOLDS NO READER
  // AND NO WRITER OF IT ═══
  // The as-filed named-reader option is WITHDRAWN: the surface is constructed and then read
  // through its own `read()`, so no reader is constructed ahead of the read — and the LANDED boot
  // order stands unmoved in kind, the order the code below performs: the surface's construction,
  // then its own boot `read()`, then the gate's construction, then the flip — the surface's
  // `attach` of the live server — then the window's creation and its renderer load, and the enable
  // LAST. The boot read below answers the INSTANCE'S OWN record, whose `mem`
  // exclusion row boots to its declared SAFE pair, so the read is legal without any exception, and
  // `main` supplies STATE and never takes the DECISION (`F-11`).
  //
  // ═══ THE COMPOSITION'S FIRST ACT IS THE SURFACE MODULE'S (exception §2 E-3; D-16, D-17) ═══
  // The retired `security-store.ts` is gone — disregarded, not carried — and the instance the
  // settings live in is constructed INSIDE `src/main/settings-surface/`, the operator path's ONE
  // reference to it (D-18). So this file constructs no store, spells no `provident-*.json` literal
  // for one (the surface module owns the file names — C-4), and reads the boot record through the
  // surface's own `read()`. The holder's ONE writer is that module (ASM-4, settled at L1 rev 3);
  // `mcp.applyExclusion` now only ENFORCES.
  const settingsSurface = createSettingsSurface({
    userDataDir: app.getPath('userData'),
    // **THE APP-STATE ROWS' CHANGE PUSH** (`D-104`; `D-82`'s `V3`): the secure crossing's third address delivers inside
    // `writeAppState`, the surface hands the change to this broadcast, and the renderer's own listener answers with a
    // re-read — so a module row's change REACHES the renderer instead of waiting to be asked for. It carries NO value and
    // NO address, exactly as the two crossing pushes beside it carry none: the push is a SIGNAL and the read is the
    // consumer's. Every window is told, because every window is a realm that renders the registry (`IPC_MODULE_GET`'s own
    // answer is per-window and this is what tells a window it is stale).
    onAppStateChanged: () => {
      for (const win of BrowserWindow.getAllWindows()) {
        if (!win.isDestroyed()) win.webContents.send(IPC_MODULE_CHANGED)
      }
    },
    // **THE SECURITY RECORD'S CHANGE PUSH** (`D-106`; the rule `D-104` read as the architecture): the surface's delivery body
    // fires for `['operator-settings']` and for the `mem` `['operator-exclusion']` pair — the two addresses the instance's one
    // subscription has always bound and whose deliveries never crossed to the renderer — and every window is told, so the
    // operator's pane re-reads instead of being re-asked after every click. It carries NO value and NO address, exactly as the
    // three pushes beside it carry none: the push is a SIGNAL and the read is the consumer's.
    onSecurityChanged: () => {
      for (const win of BrowserWindow.getAllWindows()) {
        if (!win.isDestroyed()) win.webContents.send(IPC_SECURITY_CHANGED)
      }
    },
    // **THE PORT IS THE EXCLUSION'S DELIVERY'S CONSEQUENCE** (`D-123`; `D-82` clause 2). This callback is called INSIDE the
    // instance's delivery body, after the gate has been re-patched from the same reading, and it hands the state it landed
    // as to the ONE consumer that owns a socket. **IT IS NOT THE TRANSITION'S EDGE AND THAT IS THE POINT**: the invariant's
    // repair writes the pair from inside a write that never passes through `transition`, so a hook at the transition site
    // would miss exactly the landing the invariant exists for. `followExclusion` reconciles an HTTP listener and touches
    // no stdio transport — measured fatal there (`D-122`).
    onExclusionChanged: (state) => { mcp.followExclusion(state) },
  })
  // **THE BOOT ORDER (D-65), IN THREE ACTS.** (1) COLLECT: every module that imposes a constraint declares it — the tab
  // record's SIX are gathered here (`tabsConstraintDeclarations` returns six: `tabs-must-stand`, `order-names-its-tabs`,
  // `exactly-one-active`, `tab-has-title`, `tab-has-content`, `tab-has-lastActiveAt`), and a module that wanted a listener
  // would declare one beside them. **THE SECOND IS THE ONE TESTED AT THIS STORE'S OWN CREATION** (`D-83`): the holder below
  // is bound only after `createProfileStore` answers, so every WRAPPED body abstains at that instant and the two unwrapped
  // ones are the two that can repair a seat the profile FILE brought broken — the clause-3 repair the renderer's deleted
  // boot step could not be. (2) CONSTRUCT: the app's ONE store, built here with the BATCHED constraints, so the pass is armed before
  // anything can write. (3) LISTENERS DRIVE: the surfaces read and write that store, and a commit's listeners carry the flow
  // from there.
  const storeHolder: { current: ReturnType<typeof createProfileStore> | null } = { current: null }
  // ═══ THE BOOT'S ONE STORE CONSTRUCTION, AND THE ONE REFUSAL THAT MUST BE LEGIBLE (D-80) ═══
  // `createProfileStore` REFUSES rather than degrades: a `filePath` that can never be OCCUPIED — a directory
  // standing where the file goes, an absent parent, an existing file that is not writable, a read-only mount,
  // a denied create — throws the store's own `FilePathUnreachable` and returns NO instance (`guide §8.2`,
  // measured 2026-11-02 over a directory at `<userData>/provident-profile.json`). **D-79/D-80 collapsed the
  // `data` surface onto THIS handle and DELETED its construction**, so no surface is left that could answer
  // that refusal as `store-unreachable` (`src/main/data/mapper.ts`'s own translation arm): the refusal now
  // reaches the boot, and nothing downstream of it can translate one.
  //
  // **WHAT THE CATCH BELOW IS, EXACTLY — AND WHAT IT IS NOT.** It is **FATALITY MADE LEGIBLE**: the app still
  // dies here, at the same instant, with the same exit code as before, and the failure now NAMES what failed,
  // the store's own `status`, the path involved and the consequence. It SWALLOWS NOTHING, substitutes no
  // default, retries nothing and constructs no second instance to work around the first. **WHETHER THE APP
  // SHOULD INSTEAD DEGRADE INTO A STATED, WINDOW-VISIBLE STATE IS OPEN AND NEEDS A RULING** (D-80) — and the
  // measurement that makes it a product call rather than a wording one is the ORDER, which `D-19`'s boot
  // sequence fixes and this file keeps: this construction is the boot's SECOND act, and `const win = new
  // BrowserWindow` is its ELEVENTH, so at the instant this throws **NO WINDOW EXISTS** and a stated message can
  // reach a log and never a user (the offset is deliberately not cited: the site is the name, `D-41`).
  const profileFilePath = join(app.getPath('userData'), PROFILE_FILE_NAME)
  let centralStore: ReturnType<typeof createProfileStore>
  try {
    centralStore = createProfileStore({
      filePath: profileFilePath,
      // ═══ THE BATCH IS TWO MODULES' AND ONE CALL (D-65, D-87, D-91, D-97) ═══
      // The tab record's six, and the view record's three — `panes-must-stand`, `zones-must-stand` and
      // `theme-must-stand` — NINE declarations in ONE construction. **NOTHING CONSTRUCTS A SECOND INSTANCE**: this is the
      // app's one `createProfileStore`, and a module that declares a constraint hands its declaration HERE rather than
      // building a store of its own. The two unwrapped pairs of the tab record's batch and ALL THREE of the view
      // record's are the ones that can act at the registration instant, because the holder below is bound only after this
      // call answers — which is exactly why those five bodies judge `context.value` and reach for no handle. The order is
      // each module's own and the two sets do not interleave: the ids are one namespace, and `viewConstraintDeclarations`'
      // three carry a `-must-stand` suffix no tab-record id repeats.
      constraints: [...tabsConstraintDeclarations(() => storeHolder.current), ...viewConstraintDeclarations(() => storeHolder.current)] as never,
    })
  } catch (refusal) {
    const shape = refusal as { status?: unknown; message?: unknown } | null
    const status = typeof shape?.status === 'string' ? shape.status : 'no `status` member, so this is not a store refusal'
    const reason = typeof shape?.message === 'string' ? shape.message : String(refusal)
    throw new Error(
      `the profile store could not be CONSTRUCTED at boot, so the profile cannot be opened and the app cannot run: ` +
      `status '${status}' at '${profileFilePath}' — the store's own words: "${reason}". ` +
      `Nothing degraded, defaulted or retried, and no second instance was constructed: this boot is over (D-80).`,
      { cause: refusal },
    )
  }
  storeHolder.current = centralStore
  // THE TAB RECORD'S SURFACE (D-63): the one reference the crossing holds, named by no MCP-reachable file — the crossing
  // is the bridge's and only the bridge's (L2 §2, L3 §6). It constructs nothing: the store above is its store.
  const tabsSurface = createTabsSurface({
    store: centralStore,
    // THE CHANGE PUSH (L2 §2): the record moved, and every window is told so it can re-read. The delivery
    // carries no value — the address is the L2's contract, and a payload here would be a second copy.
    onChanged: () => {
      for (const win of BrowserWindow.getAllWindows()) {
        if (!win.isDestroyed()) win.webContents.send(IPC_TABS_CHANGED)
      }
    },
  })
  // **THE VIEW RECORD'S SURFACE (D-87)** — the same shape at the other family: one reference, over the ONE store this
  // boot constructed, and one subscription that fires for any of its four roots. It constructs nothing.
  const viewSurface = createViewSurface({
    store: centralStore,
    onChanged: () => {
      for (const win of BrowserWindow.getAllWindows()) {
        if (!win.isDestroyed()) win.webContents.send(IPC_VIEW_CHANGED)
      }
    },
  })
  const persisted = settingsSurface.read()
  // `docs/specs/secure-exclusion.md` `§2.1` item 4 — THE ORDERING ENVELOPE, STEP 2: the gate is
  // CONSTRUCTED here (after the construction and the boot read, before the transports) and the exclusion record is
  // INITIALIZED to its boot terminal `'mcp-enabled'` AT THIS CONSTRUCTION SITE — never read from
  // a file, because the flag is NOT persisted (`D-19`). A crash, a torn record, a corrupt file and
  // a missing file therefore all resolve to the SAFE pair.
  const gate = new SecurityGate({ token: persisted.token, enabled: persisted.enabled as ToolGroup[] })
  const backend = new RendererBackend()

  // ═══════════════════════════ TIER 1 — THE CHANNEL + THE INSTANCE'S RECORD (G2 `U-STORE-PERSIST`,
  // `docs/specs/store-persist.md` §2.7/§2.8) ═══════════════════════════
  // Tier 1's carrier is the instance's app-state record (`['operator-app-state']`, `file`), served
  // through the surface's `state()` and written by its one `commit` (E-1; L1 §3). This file spells
  // no file name for it: the instance module owns the one it reads and the store owns the one it
  // writes — and it spells no `provident-*.json` literal at all.
  //
  // ═══ WHAT STOOD HERE, WHY IT IS GONE, AND WHAT HAPPENS TO THE FILE IT READ (D-78's second clause,
  // the user's ruling, carried here as `D-81`) ═══
  // The Q-5 MIGRATION arm stood at this point until 2026-11-02: `const legacyModulesPath =
  // join(app.getPath('userData'), 'provident-modules.json')`, `createModuleStore({ path:
  // legacyModulesPath })`, its `.list()`, a loop projecting each record into a `file.modules.<id>`
  // row through `rowsWith`, ONE `settingsSurface.commit` of the composed rows, and a closing
  // `rmSync(legacyModulesPath, { force: true })`. D-78 measured what it was for and held it: a
  // one-way migration input, reachable on EVERY boot, and — because the JSON outranks a standing row
  // at the one boot it is read — not dead. **The ruling then given is the disposition the tabs rows
  // got (D-75): *"There is no migration … Do not build a boot migration."*** So the arm is DELETED,
  // `src/main/module-store.ts` with it, and the rows are the registry for the product's whole life:
  // every read and every write below goes through `settingsSurface.state()` / `.commit()` and no
  // other source exists.
  //
  // **AN EXISTING `<userData>/provident-modules.json` IS NOT DELETED. THE BOOT LEAVES IT ON DISK,
  // UNREAD.** That is deliberate and it is the half of the old arm most likely to be missed: the
  // `rmSync` above is what used to remove the file, and with the arm gone nothing in this tree opens,
  // parses, rewrites or unlinks that name — it is not READ, so its records reach no row, and it is
  // not REMOVED, so a profile that carried one keeps it byte-for-byte. This is D-75's own rule for the
  // tabs rows, *"stop projecting, not delete"*, applied to the module registry: the app stops
  // looking, and the profile is the operator's to tidy. A boot MUST NOT fail on such a file (measured
  // 2026-11-02: the built bundle starts over a scratch profile carrying one, ignores it, leaves it in
  // place), which is why no probe, no guard and no `try`/`catch` stands here either.

  /** THE REPLACE-OR-APPEND RULE: the rows in their order, the row named `key` replaced by
   *  `{name: key, value}`, else appended. It REPLACES rather than appends because the whole-map
   *  write refuses two rows naming one name as a VALUE, so an append would refuse the whole commit —
   *  and a refused commit is a module the operator installed and cannot see (design §4; interface §6
   *  `ASM-L2-6`). **THE MIGRATION THAT FIRST MADE THIS RULE MANDATORY IS GONE (D-81) AND THE RULE IS
   *  NOT**: `modulePayloadWith` is the live caller and the duplicate-name refusal is still driven at
   *  the instance's own verb (`tests/unit/settings-carrier-retirement/main-source.test.ts` `MS-4`). */
  function rowsWith(rows: readonly SettingsAppStateRow[], key: string, value: unknown): SettingsAppStateRow[] {
    const next: SettingsAppStateRow[] = []
    let replaced = false
    for (const row of rows) {
      if (row.name !== key) next.push(row)
      else {
        next.push({ name: key, value })
        replaced = true
      }
    }
    if (!replaced) next.push({ name: key, value })
    return next
  }

  // ══ THE MODULE REGISTRY'S ROWS ARE THE WHOLE STORY (§2.8 item 2 — BOTH writer classes re-pointed to
  // the instance's app-state record): the MCP `module.*` handlers (writer class 2, received through the
  // server's `moduleStore` option) and the operator `IPC_MODULE_SET_DISABLED` toggle (writer class
  // 1) both mutate THIS surface, whose every mutation issues ONE commit of the whole composed rows
  // list — a single authority, so after a `module.update` + a `setDisabled` on the same module the
  // record and the served rows AGREE. The readers (`syncModuleRouter`, `status().loaded`) read the
  // same rows. ══
  const moduleRecordsOf = (): ModuleRecord[] => {
    const out: ModuleRecord[] = []
    for (const row of settingsSurface.state().rows) {
      if (!row.name.startsWith('file.modules.')) continue
      const entry: unknown = row.value
      if (entry !== null && typeof entry === 'object' && !Array.isArray(entry)) out.push(entry as ModuleRecord)
    }
    return out
  }
  const modulePayloadWith = (key: string, rec: ModuleRecord): SettingsAppStateRow[] =>
    rowsWith(settingsSurface.state().rows, key, rec)
  const moduleSurface: ModuleStore = {
    get(name: string): ModuleRecord | undefined {
      const entry: unknown = settingsSurface.state().rows.find((row) => row.name === `file.modules.${name}`)?.value
      if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) return undefined
      return entry as ModuleRecord
    },
    list(): ModuleRecord[] {
      return moduleRecordsOf()
    },
    status(): ModuleStoreStatus {
      const loadedNames: string[] = []
      const quarantinedNames: string[] = []
      const answer = settingsSurface.state()
      for (const row of answer.rows) {
        if (!row.name.startsWith('file.modules.')) continue
        const rec = row.value as ModuleRecord
        if (rec === null || typeof rec !== 'object' || Array.isArray(rec)) continue
        // boot re-verification: the hash is ALWAYS re-derived from the record's own source
        if (rec.hash !== sha256(rec.source)) quarantinedNames.push(rec.name)
        else if (rec.disabled !== true) loadedNames.push(rec.name)
      }
      // THE CORRUPT FLAG IS THE IMPORT ANSWER'S, never a second reader: a corrupt retired carrier or
      // a store that never stood (`legacy === 'corrupt' || storage === 'unreachable'`) — a landed
      // import is not a corruption (L1 §4; interface §5 `ASM-L2-3`).
      return { corrupt: answer.legacy === 'corrupt' || answer.storage === 'unreachable', quarantined: quarantinedNames, loaded: loadedNames }
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
      // ONE commit of the whole composed list, and no receipt crosses a member's answer.
      settingsSurface.commit(modulePayloadWith(`file.modules.${rec.name}`, rec))
      return { ...rec, capabilities: rec.capabilities }
    },
    remove(name: string): boolean {
      const key = `file.modules.${name}`
      const held = settingsSurface.state().rows
      if (!held.some((row) => row.name === key)) return false
      settingsSurface.commit(held.filter((row) => row.name !== key))
      return true
    },
    setDisabled(name: string, disabled: boolean): void {
      const rec = moduleSurface.get(name)
      if (rec === undefined) return
      const next: ModuleRecord = { ...rec, disabled }
      settingsSurface.commit(modulePayloadWith(`file.modules.${name}`, next))
    },
  }
  // U9-FIX — the live capability router (main-process). Synced from the store's record so
  // installed modules' declared tools become callable. Passed to the MCP server so dynamic
  // module tools are registered + two-gated.
  const moduleRouter = new CapabilityRouter()
  syncModuleRouter(moduleRouter, moduleSurface)
  // THE ONE-LINE OPTIONS PASS (§2.8 item 3): the server's construction options receive the
  // re-pointed module surface — the module tools' REPLY SHAPES are UNCHANGED.
  // **AND THE `data` SURFACE IS HANDED THE BOOT'S OWN STORE** (D-79, D-80): `centralStore` was constructed above
  // (`:132`), and without this handle the surface opens a SECOND instance on the same
  // `provident-profile.json` — its own register, its own journal, one file, and every flush from it discards what the
  // other instance wrote (measured 2026-11-02). Two instances are the ruling's whole number, so the handle is passed
  // and the surface constructs nothing — **and now it CANNOT**: `DataSurfaceOptions.store` is required and the
  // fallback construction is deleted, so this line is the surface's only source of an instance (D-80).
  const dataSurface = createDataSurface({ profileDir: app.getPath('userData'), store: centralStore, declaredRoots: [...tabsDeclaredRoots(), ...viewDeclaredRoots()] })
  // **AND THE SURFACE IS NAMED ONCE HERE BECAUSE THE FIVE ROUTES ARE ANSWERED FROM IT** (`D-112`; `interface.md` §5): the
  // handlers below and the server's option are the SAME object, so a bridge request and a `provident.data.*` tool call
  // reach one adapter and cannot carry two answers. Nothing else about the options pass moves — it is still ONE line, the
  // exception's `E-3` claim, with `dataSurface` passed by name instead of constructed in it.
  const mcp = new ProvidentMcpServer({ backend, transport, port, gate, moduleStore: moduleSurface, router: moduleRouter, dataSurface })
  // `§0A` item 1 (the `A-1` ruling) — NO RE-POINT IS OWED HERE ANY MORE. The landed `R-2` re-point
  // existed because the store consulted a reader `main` had to keep aimed at the LIVE server
  // (`mcp-server.ts`'s `get gate()`). Neither half of that exists now: the retired store is gone
  // (D-16), and the STATIC HOLDER's ONE writer is the surface module constructed above — not the
  // server's `applyExclusion`, which only ENFORCES. So there is nothing to re-point, no window in
  // which the record and the operator could disagree, and no second home and no second writer.

  // The manual-UI settings IPC: the surface module owns the config and re-patches the MCP server's
  // tool-gating from its own subscription when the record changes; the three handlers below only
  // delegate to it. This is manual-UI-ONLY — it is NOT reachable over an MCP tool (the MCP tool
  // handlers never route to it), so an agent cannot grant itself capabilities.

  /* ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════
   * THE TIER-1 CHANNEL HANDLERS ARE DELETED FROM THIS SITE (`D-93`; `D-78`'s purge, `D-90`'s clause (3)).
   *
   * **WHAT STOOD HERE — TWO HANDLERS, ELEVEN LINES AND A SIXTEEN-LINE PROJECTION LOOP BETWEEN THEM.** `STORE_FILE_GET` was
   * the Y-1 boot hand-off: it copied `settingsSurface.state().rows` into a `{name, value}[]` for the renderer's frozen
   * store to hydrate from. `STORE_FILE_PUT` was the Y-2 commit wire: it parsed the incoming STABLE-JSON translation of the
   * frozen graph, walked `Object.keys(...)` keeping every spelling that `startsWith('file.')`, and made ONE
   * `settingsSurface.commit(projected)` of them — the renderer's `file.*` projection persisted into the secure crossing's
   * `['operator-app-state']` rows. That projection is the "legacy content inside an intended store" `D-78`'s inventory named,
   * and both handlers existed for it alone.
   *
   * **WHAT SURVIVES, AND WHY IT IS NOT THE SAME SUBJECT.** `settingsSurface.state()` and `settingsSurface.commit()` STAY
   * BESIDE THIS HEADSTONE AND ARE NOT THIS PASS'S TO DELETE: they are ALSO the MODULE REGISTRY's path — every read and
   * every write of the `ModuleStore` object literal below goes through them (`state().rows`, `commit(rowsWith(...))`,
   * `commit(modulePayloadWith(...))`, the remove arm, `attach(mcp)`), which is `D-81`'s landed arrangement. `D-90`'s clause
   * (3) measured this before it ruled: *"Nothing on the main side exists only for it except the two handlers, the
   * projection loop and the two preload members"*. So the deletion is those and exactly those.
   *
   * **AND NOTHING ON THE MAIN SIDE EVER READ WHAT THE PROJECTION WROTE**: the rows landed at `['operator-app-state']` and
   * were served back only to the renderer's own store, which the renderer has now stopped reading. The secure crossing's
   * three declarations (`operator-record` · `operator-settings` · `operator-app-state`) stand, and the address keeps its
   * real writers — the module registry's.
   * ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════ */

  // PAR-9 — the GET response record is EXTENDED ADDITIVELY by the declared `exclusion` member (the
  // landed `write` member's precedent below): the member is NEVER absent on a read.
  // **THE CARRIER IS THE SURFACE MODULE'S ANSWER (exception §2 E-3; D-17).** The gate-6 `F-1`
  // hazard the landed wording worked around — a handler closing over a since-REPLACED gate instance
  // — stays closed STRUCTURALLY and one layer further out: `read()` mints both additive members
  // from ONE reading of the instance's row, so `read` (`null` iff the answer was minted while the
  // pair stands at `mcp-enabled`, the closed refusal otherwise) and `exclusion` cannot carry two
  // states in one response. They remain mutual inverses on one axis and NEITHER is substituted for
  // the other (`§3.4`). THIS FILE NOW READS NO STORE AND NO HOLDER: the surface module holds the
  // one reference and patches the gate through this file's own sink methods (ASM-4 — and the HOLDER
  // that clause named, `src/main/tier4-state.ts`, is DELETED at `D-117`, its projection having been
  // read by no file under `src/`), while `mcp.gate` remains the ENFORCEMENT path's accessor. `main`
  // supplies STATE, never the DECISION.
  // THE TAB RECORD'S TWO CHANNELS (L2 §2): a whole-record read takes no argument, and a commit names its tab.
  // The surface's shape arm answers `malformed-row` before any store verb; nothing here inspects the argument.
  ipcMain.handle(IPC_TABS_READ, () => tabsSurface.read())
  ipcMain.handle(IPC_TABS_COMMIT, (_event, row: unknown) => tabsSurface.commit(row))
  ipcMain.handle(IPC_TABS_REMOVE, (_event, id: unknown) => tabsSurface.remove(id))
  // the change push: one subscription, taken here so the window's teardown can withdraw exactly what it took
  tabsSurface.attach()
  // **THE VIEW RECORD'S SIX CHANNELS (D-87, D-91, D-97, D-132, L2 §2)**: a whole-view read takes no argument; a pane commit names
  // a pane id and a geometry and never a path; a zone commit names
  // a zone id and the members it carries, and the crossing composes the family; **the appearance commit hands the ACT —
  // the setting the authored control produced and the caller-held attribute name — and composes NOTHING**, because the
  // crossing's own pair resolves it inside that commit and the declaration never crosses this channel; and the drag pair
  // hands the gesture's placement and its ending — one whole value at `temp`, and a delete that ends it. The surface's shape
  // arms answer `malformed-pane`/`malformed-zone`/`malformed-theme` before any store verb; nothing here
  // inspects an argument.
  ipcMain.handle(IPC_VIEW_READ, () => viewSurface.read())
  ipcMain.handle(IPC_VIEW_PANE_COMMIT, (_event, id: unknown, geometry: unknown) => viewSurface.commitPane(id, geometry))
  ipcMain.handle(IPC_VIEW_ZONES_COMMIT, (_event, id: unknown, zone: unknown) => viewSurface.commitZones(id, zone))
  ipcMain.handle(IPC_VIEW_THEME_COMMIT, (_event, token: unknown, attributeName: unknown) => viewSurface.commitTheme(token, attributeName))
  ipcMain.handle(IPC_VIEW_DRAG_COMMIT, (_event, id: unknown, geometry: unknown) => viewSurface.commitDrag(id, geometry))
  ipcMain.handle(IPC_VIEW_DRAG_CLEAR, () => viewSurface.clearDrag())
  // and its change push, taken at the same point and for the same reason as the tab record's
  viewSurface.attach()
  // ═══ THE FIVE `data.*` ROUTES' ANSWER SITES (`D-112`; `docs/L2/central-data/interface.md` §5) ═══
  // Each hands the caller's argument object to the module's adapter UNTOUCHED and answers §2's shape verbatim, so the
  // bridge route and the `provident.data.*` tool of the same name are ONE answer site — the property the MCP
  // registrations already state from their own side (`src/main/mcp-server.ts`'s five rows). Nothing here inspects an
  // argument: the surface's own arms refuse a malformed call BY NAME, and a `main.ts` that validated first would be a
  // second authority over the register's declared members (`interface.md` §1).
  // **NO CHANGE PUSH IS TAKEN HERE, AND THAT IS THE ROUTE'S SHAPE RATHER THAN AN OMISSION** (`types.ts`'s constant block
  // carries the reason): a write at a declared family root is delivered by THAT family's listener, and this module renders
  // nothing, so no `data.*` delivery exists to register. **AND NO FRAME GUARD IS ADDED, WHICH IS THE SAME RULE READ ON THE
  // SITES BESIDE THEM**: every handler in this file — the tab record's three, the view record's six, the secure crossing's
  // four and the module registry's two — discards its `IpcMainInvokeEvent` and checks no sender, so a guard here would be
  // the only one in the file and would make one crossing stricter than its siblings; `bridge-route.test.ts` asserts the
  // absent member and the absent guard together, over comment-elided code.
  ipcMain.handle(IPC_DATA_READ, (_event, args: unknown) => dataSurface.read(args))
  ipcMain.handle(IPC_DATA_WRITE, (_event, args: unknown) => dataSurface.write(args))
  ipcMain.handle(IPC_DATA_DELETE, (_event, args: unknown) => dataSurface.delete(args))
  ipcMain.handle(IPC_DATA_LIST, (_event, args: unknown) => dataSurface.list(args))
  ipcMain.handle(IPC_DATA_JOURNAL, (_event, args: unknown) => dataSurface.journal(args))
  ipcMain.handle(IPC_SECURITY_GET, () => settingsSurface.read())
  ipcMain.handle(IPC_SECURITY_SET, (_event, patch: { token?: string | null; groups?: string[]; disable?: string[]; maxJournalLength?: number | null }) => {
    // THE RECEIPT'S ADDITIVE DELIVERY (§2.3 items 2/4 — the C-11 NON-BREAKING reading, G3
    // 2026-10-03): the ANSWER is the post-state settings extended by the declared member `write` —
    // `{ ...settings, write }`, a SUPERSET of the old resolution (a reader typed to the old shape
    // continues to typecheck and reads identically). The `write` member is NEVER absent on a SET
    // answer: the surface just performed a write (totality, P-SE-TP-1). `§2.1` item 3 `T-5` /
    // `PAR-9` — the SET is NOT a transition site: the answer carries the SAME additive `exclusion`
    // member BESIDE the landed `write`, minted from the same post-state reading, so the state is
    // untouched by an unrelated write.
    //
    // AND THIS HANDLER RE-PATCHES NO GATE: the re-patch rides the surface module's OWN subscription,
    // inside the write, so the gate already holds the granted groups when this answer is minted and
    // no second edge exists (D-17; design §3, §6).
    return settingsSurface.set(patch)
  })

  // `docs/specs/secure-exclusion.md` §2.4 item 4 / PAR-8 — THE TRANSITION'S OWN CHANNEL. It is
  // SEPARATE from the settings write, so the transition and the settings write stay two
  // distinguishable operations (`T-5` is observable rather than inferred) and `set(patch)`'s
  // declared domain stays unmoved. THE ANSWER IS TOTAL OVER THE DECLARED DOMAIN and the surface
  // module mints it: the two legal tokens apply the transition — the instance's ONE `mem` write,
  // whose committed delivery makes the EPOCH BUMP and the in-flight invalidation land inside
  // `mcp.applyExclusion`, and whose self-transition is the legal no-op that bumps nothing (an epoch
  // bump on a no-op would be a denial-of-service surface) — while EVERY outside value — a boolean,
  // a number, an object, an array, `undefined`, `null`, an unknown string, a case-variant, a
  // whitespace-padded string — is REFUSED AS A VALUE naming `reason:'malformed-state'`, never a
  // throw and never a silent no-op that looks applied. THE ANSWER CARRIES NO RECEIPT MEMBER:
  // `write` is declared on `set` alone (ASM-L2-4).
  ipcMain.handle(IPC_SECURITY_EXCLUSION, (_event, state: unknown) => settingsSurface.transition(state))

  // **THE PANE'S OWN CHANNEL** (`D-123`; `D-82` clause 4 — *client-driven writes are driven by external events*). The realm
  // writes what its own overlay did — one boolean, the predicate the mechanism already computes — and NOTHING HERE DECIDES
  // ANYTHING: no port is touched on this path, no exclusion is written here, and a malformed argument is refused as a value
  // by the surface. The lockout is the crossing's constraint, and the port is the exclusion's delivery's consequence.
  ipcMain.handle(IPC_SECURITY_PANE, (_event, open: unknown) => settingsSurface.pane(open))

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

  // `D-19` STEP 3 — THE CLOSE (`tier4-arbitrary-storage.md` `§2.5` item 4 / `§0A` item 4, AMENDED
  // `2026-10-11` by the gate-4 repair contract's `D-vii`; `§3c`'s `S2-ADV-01` limb (b)): the flip
  // lands HERE — **AFTER THE HANDLERS AND BEFORE THE WINDOW IS CREATED OR LOADED** — as the surface
  // module's `attach`, which is the composition's SECOND ACT and the ONLY gate edge (exception §2
  // E-3; D-17): it subscribes FIRST, writes the holder from the boot record, re-patches the gate
  // from that same record and lands the boot terminal `'mcp-enabled'`. The gate was constructed
  // with its boot terminal, so that last act is a SELF-TRANSITION — the landed `T-3` arm: a legal
  // NO-OP that bumps no epoch and invalidates nothing. It is written explicitly because the ORDER is
  // the clause: `{MCP-DISABLED, TIER-4-CLOSED}` is reachable ONLY inside this window and is not a
  // legal steady pair, and a design in which the MCP enables while the state still says store-open
  // FAILS. **`D-vii`'s own repair, stated at the bytes:** the landed boot created the window and
  // LOADED the renderer (`win.loadFile(...)`, below) BEFORE this flip, so a renderer turn in that
  // gap could take its carrier read with the holder still `STORE-OPEN` and paint the INVERSE of the
  // steady pair with nothing re-sourcing it. The close therefore MOVES AHEAD of the window's
  // creation/load; `D-19`'s order `construction → boot read → gate → flip → window → renderer
  // load → mcp.start()` is PRESERVED UNMOVED (the boot read still precedes the flip, and the
  // enable below still follows it), and nothing else in the boot is re-ordered. From here the two
  // axes move together, and NOTHING ELSE IN THIS FILE RE-PATCHES OR RE-TRANSITIONS THE GATE.
  settingsSurface.attach(mcp)

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

  // `D-19` STEP 4 — ENABLE: the MCP is enabled LAST, with the close already landed above, so no
  // reader ever observes the pre-flip value (`D-vii`).
  await mcp.start()
  // **AND THE LISTENER IS RECONCILED TO THE RECORD IT NOW SERVES** (`D-123`): the boot's start above is the enable's act,
  // and this one line makes the port a CONSEQUENCE of the record rather than a fact beside it — so a boot whose exclusion
  // already stands closed (an operator's transition inside the window-load gap) lands a closed port and not an open one.
  mcp.followExclusion(settingsSurface.read().exclusion)

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