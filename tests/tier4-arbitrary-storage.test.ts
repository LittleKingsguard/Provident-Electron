/**
 * ============================================================================
 * S2 = U-TIER4-ARBITRARY-STORAGE — THE RED SET (RCA-1: tests FIRST, RUN and
 * REPORTED failing, before any implementation).  Author: TestWriter.
 * Layer: `[H]`/`[T]` per `§1.4`; the `[U]` battery is gate 6's and is NOT driven
 * here (`§5.2` item 6).
 *
 * Spec: `docs/specs/tier4-arbitrary-storage.md` (read in FULL — 466 lines at
 * red-authoring; every operative cell is cited by `§`/row id, never by line).
 * Register harness: `tests/tier4-arbitrary-storage-register.ts` (the `§5.5.1`
 * typed rows + their executor; a non-`.test.ts` module so it is never collected
 * as its own suite).
 *
 * WHAT THIS FILE IS: the store-local arbitrary-storage opening's and the four
 * gating clauses' red set — authored from THE SPEC ALONE against the CURRENT
 * tree.  Everything the contract declares (`readEntry`/`writeEntry` · the
 * `entries` member · the STATIC HOLDER `src/main/tier4-state.ts` (`A-1`'s `2026-10-11`
 * ruling, `§0A` item 1) · the `'tier4-closed'` channel token
 * and its message · the additive `read` carrier member · the pane's two
 * re-sourced cells and the ONE additive `· refused: tier4-closed` segment) is
 * asserted AS IF IT ALREADY EXISTED, so the absent symbols fail FIRST, in the
 * honest form `§4.1` demands ("the register's un-run rows are reported as
 * FAILURES").
 *
 * ── THE STATES THIS FILE ENUMERATES, BEFORE THE ROWS (`§3.1`/`§3.2`) ────────
 * VALID / HAPPY (`§3.1`): `M-1` boot OPEN, nothing ingested (record = the
 * first-run default; `entries` EMPTY and ABSENT from the file) · `M-2` the
 * boot-ingestion read inside the declared OPEN window (succeeds, no exception) ·
 * `M-3` a legacy file carrying foreign top-level keys (ingested VERBATIM into
 * `entries`, readable, and surviving the next successful write) · `M-4` CLOSED,
 * a tier read (PRE-CALL value, detached; a never-written name ⇒ `null`; no
 * throw) · `M-5` CLOSED, a tier write (the closed refusal VALUE; `set()` answers
 * the PRE-WRITE record; the receipt answers the refusal; no filesystem call, no
 * advance) · `M-6` OPEN, a tier write — THE NON-VACUITY TERM (commits and lands;
 * the file's bytes move) · `M-7` OPEN, `writeEntry` with an admitted value
 * (committed; live map AND file agree; `readEntry` answers a detached
 * `{name, value}`) · `M-8` OPEN, a name written twice (the LAST admitted value;
 * live == durable) · `M-9` the operator's carrier while OPEN and while CLOSED
 * (both members legible; neither blanked by the gated store) · `M-10` the return
 * transition then a write (REFUSED — the measured `SC-D-07` shape closes) ·
 * `M-11` a self-transition and an outside-value payload (no-op / refused as a
 * value; no epoch bump, no boolean move).
 * FAIL-STATES (`§3.2`), one row each: `FS-T4-01`…`FS-T4-13`.  `FS-T4-11`'s RACE
 * is explicitly NOT covered (`§0A` item 2, `SC-D-08` `MANUAL`): the row asserts
 * only that a read landing inside the window answers ONE side of the pair.
 *
 * ── THE CONTROLS ADDED (each absence-asserting arm carries one) ─────────────
 * `CTL-1` the store-accessor helpers `absent()` when the member is missing (so
 *   an absent member is reported as the DECLARED absent symbol, never a bare
 *   `TypeError`) — and the register's broken/un-run bounds are proven able to
 *   FAIL by the synthetic control runs.
 * `CTL-2` the `· refused: tier4-closed` detector is driven against a carrier
 *   whose `read` is `null` (it must NOT fire) and against a refusal carrier (it
 *   MUST fire) — a detector that cannot fail proves nothing.
 * `CTL-3` the token-census detector is driven against a mutated string (it must
 *   FIRE, so `'exclusion-closed'`'s absence is attributable).
 * `CTL-4` the filesystem-call detector is driven against a COMMITTED write (the
 *   log MUST move) — so "no filesystem call on a refusal" is not vacuous.
 * `CTL-5` the pane's `data-state` probe is driven against a pane whose carrier
 *   was NOT refreshed (the probe MUST be able to read a stale value).
 *
 * ── THE TYPE SHIM (the sibling red sets' `-mend`-style pattern) ─────────────
 * Leg 4 is `npm run typecheck:tests` (`tsc -p tsconfig.tests.json`), which
 * compiles the WHOLE `tests/**` tree under `--strict`.  The declared surfaces DO
 * NOT EXIST on the landed types, so a direct member access would be a TS2339
 * that makes this file fail leg 4 — and a test file that fails
 * `typecheck:tests` is NOT a valid red set.  Every not-yet-widened surface is
 * therefore read through a NARROW, LOCAL receiver type with an explicit
 * `as unknown as` at the call site.  The shim changes NO runtime value and
 * weakens NO assertion: every drive still asserts the declared shape, and an
 * absent member is reported by the drive itself.
 *
 * ── THE DECLARED LIMIT, STATED (never hidden) ──────────────────────────────
 * `§1.4` item 3: NO timing figure is claimed anywhere; every drive asserts ORDER
 * and OUTCOME.  The `[H]` rows that must read `main.ts`'s boot window and the
 * GET handler are **source probes with a declared limit**, exactly the form
 * `docs/specs/secure-store-discipline.md` `§9` item 5(c) permits for a clause
 * whose seam the contract forbids the unit to export; each such row names its
 * limit in-line.
 * ============================================================================
 */
import { beforeAll, afterAll, beforeEach, describe, expect, it } from 'vitest'
import { mkdtemp, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { installShim, mountEl } from '../src/shared/dom-shim.js'
import { SecurePanels } from '../src/renderer/secure-panels.js'
import { SecurityGate } from '../src/main/security.js'
import {
  BOUNDED_ROWS, DECLARED_CARRIER_MEMBERS, DECLARED_OPTION_CENSUS, DECLARED_SURFACE_MEMBERS,
  DECLARED_TERMS, EXCLUSION_CLOSED, LANDED_CARRIER_MEMBERS, LANDED_OPTION_CENSUS, LANDED_SURFACE_MEMBERS,
  MAIN_SRC, MCP_SERVER_SRC, MEASURED_FROZEN_PINS, PRELOAD_SRC, REGISTER_ROW_CAP, REGISTER_ROW_IDS,
  REGISTER_TOTAL_CAP, SECURE_PANELS_SRC, SECURITY_STORE_PIN, SECURITY_STORE_PIN_CHAIN, SECURITY_STORE_SRC,
  SHARED_TYPES_SRC, STATE_MCP_DISABLED, STATE_MCP_ENABLED, STOP_AFTER_CONSECUTIVE, STRATEGY_IDS,
  STORE_CHANNELS_SRC, STORE_CORE_SRC, TIER4_CLOSED, TIER4_CLOSED_MESSAGE, TIER4_STATE_SRC,
  brokenCountCheckOf, brokenCountGuardOldForm, declaredReasonTokens, declaredTotalReport, exists,
  executeRegister, loadStoreModule, registerReportLines, sha256Of, sourceOrEmpty,
  syntheticBrokenRegisterControlOnly, syntheticUnRunRegisterControlOnly,
  type Drive, type RegisterRow,
} from './tier4-arbitrary-storage-register.js'

/* ═══════════════════════════ THE INSTRUMENTED FS (§2.1 item 5, `A-1`'s declared
 * default).  The `A-1` reader and the write path's `fs` seam are BOTH handed to the
 * store at construction, so "a refusal makes NO filesystem call" is a MEASURED
 * reading rather than an inference from a code read — and the seam is a declared
 * option of THIS unit's own surface (`§0A` item 1), not an invented export
 * (`§2.1` item 1 forbids a new exported name).  An implementation that lands the
 * reader under a different option NAME fails these rows by VALUE, which is the
 * spec-amendment this red set must force (§4.3 item 1).                         */

interface FsLog {
  readonly calls: string[]
  writeFileAt: number | null
  fsyncAt: number | null
  renameFail: boolean
}
function freshFsLog(): FsLog {
  return { calls: [], writeFileAt: null, fsyncAt: null, renameFail: false }
}
/** THE SEAM'S TYPE — exact-`typeof` compatibility (`leg 4`, `npm run typecheck:tests`):
 *  each member is declared with the REAL `node:fs` signature, so the seam is
 *  structurally assignable to whatever narrowed fs surface the store declares. */
const fsModule = await import('node:fs')
type FsSeam = {
  readFileSync: typeof fsModule.readFileSync
  existsSync: typeof fsModule.existsSync
  mkdirSync: typeof fsModule.mkdirSync
  writeFileSync: typeof fsModule.writeFileSync
  openSync: typeof fsModule.openSync
  closeSync: typeof fsModule.closeSync
  fsyncSync: typeof fsModule.fsyncSync
  renameSync: typeof fsModule.renameSync
  rmSync: typeof fsModule.rmSync
}

function makeFsSeam(log: FsLog): FsSeam {
  // The dynamic `import('node:fs')` inside a test does NOT pass through vitest's
  // module mock graph, so the seam is the store's OWN declared construction input
  // (`A-1`'s declared default + the write path's fs seam).
  let fsyncSeen = 0
  const seam: FsSeam = {
    // The store's own read shape: a UTF-8 string. Declared explicitly (and cast) so the
    // seam satisfies the real `node:fs` overload without widening the store's contract.
    readFileSync: ((path: Parameters<typeof fsModule.readFileSync>[0], options?: unknown) =>
      fsModule.readFileSync(path as never, (options ?? 'utf8') as never) as never) as FsSeam['readFileSync'],
    existsSync: (path) => fsModule.existsSync(path),
    mkdirSync: (dir, options) => {
      log.calls.push(`mkdir:${String(dir)}`)
      return fsModule.mkdirSync(dir, options)
    },
    writeFileSync: (file, data, options) => {
      log.calls.push(`writeFile:${String(file)}`)
      if (log.writeFileAt !== null && log.calls.filter((c) => c.startsWith('writeFile:')).length === log.writeFileAt) {
        throw new Error('injected: tmp-write failure')
      }
      return fsModule.writeFileSync(file, data as never, options as never)
    },
    openSync: (path, flags, mode) => {
      log.calls.push(`open:${String(path)}`)
      return fsModule.openSync(path, flags, mode)
    },
    closeSync: (fd) => {
      fsModule.closeSync(fd)
    },
    fsyncSync: (fd) => {
      log.calls.push('fsync')
      fsyncSeen += 1
      if (log.fsyncAt !== null && fsyncSeen === log.fsyncAt) throw new Error('injected: fsync failure')
      fsModule.fsyncSync(fd)
    },
    renameSync: (oldPath, newPath) => {
      log.calls.push(`rename:${String(oldPath)}→${String(newPath)}`)
      if (log.renameFail) throw new Error('injected: rename failure')
      fsModule.renameSync(oldPath, newPath)
    },
    rmSync: (path, options) => {
      log.calls.push(`rm:${String(path)}`)
      fsModule.rmSync(path, options)
    },
  }
  return seam
}

/* ═══════════════════════════ THE STORE FIXTURE ═════════════════════════════ */

type StoreLike = {
  get(): Record<string, unknown>
  set(patch: unknown): Record<string, unknown>
  lastWriteReceipt?: () => unknown
  readEntry?: (name: unknown) => unknown
  writeEntry?: (name: unknown, value: unknown) => unknown
}

let storeModule: Awaited<ReturnType<typeof loadStoreModule>> = { module: null, reason: 'not loaded' }
let baseDir = ''
let seq = 0
/** The TEST-SIDE mirror of the holder, kept ONLY so the legacy fallback can drive the landed
 *  option while `src/main/tier4-state.ts` is absent. The DECLARED value is the leaf's. */
let openState: boolean = true

/* ═══════════════════════════ THE STATIC HOLDER (`A-1`'s `2026-10-11` RULING) ═══════════════
 * `docs/specs/tier4-arbitrary-storage.md` `§0A` item 1's dated amendment REPLACED the injected
 * thunk with ONE main-side LEAF module: `src/main/tier4-state.ts`, whose STATIC module-level
 * holder IS the one boolean, whose declared INITIAL VALUE is STORE-OPEN, whose ONE reader is
 * `tier4OpenState()` and whose ONE writer is `setTier4OpenState()` (its only production caller
 * being the transition). `SecurityStoreOptions` is UNMOVED at `{ path }`, so these rows drive the
 * holder — never an option. The module is resolved by a FRAGMENT-ASSEMBLED specifier (the
 * `loadStoreModule` precedent), so its ABSENCE is DATA: while it is absent the fixture falls back
 * to the landed option so the OTHER rows keep their own subjects, and every row that ASSERTS the
 * holder reddens with the declared absent symbol. */
const TIER4_STATE_SPEC = ['..', 'src', 'main', 'tier4-state.js'].join('/')
interface Tier4StateModule {
  tier4OpenState?: () => boolean
  setTier4OpenState?: (open: boolean) => void
}
let tier4StateModule: Tier4StateModule | null = null
let tier4StateReason = 'not loaded'
async function loadTier4StateModule(): Promise<void> {
  try {
    const mod = (await import(/* @vite-ignore */ TIER4_STATE_SPEC)) as Tier4StateModule
    if (typeof mod.tier4OpenState !== 'function') {
      tier4StateModule = null
      tier4StateReason = 'ABSENT: the leaf exports no `tier4OpenState`'
      return
    }
    tier4StateModule = mod
    tier4StateReason = ''
  } catch (e) {
    tier4StateModule = null
    tier4StateReason = `ABSENT: ${e instanceof Error ? e.message : String(e)}`
  }
}
function tier4HolderAbsent(where: string): Error {
  return new Error(`S2-RED: the STATIC HOLDER is absent (${where}) — ${tier4StateReason}; \`src/main/tier4-state.ts\` must export \`tier4OpenState()\` (\`§0A\` item 1, the \`A-1\` ruling)`)
}
/** THE DECLARED READER (`§0A` item 1): `tier4OpenState()` — read ONCE PER CALL at the call's own
 *  turn. While the leaf is absent the fixture's LEGACY fallback keeps the mirror authoritative, so
 *  only the rows that assert the holder redden. */
const tier4Reader = (): boolean => (tier4StateModule === null ? openState : (tier4StateModule.tier4OpenState as () => boolean)())
/** THE DECLARED WRITER (`§0A` item 1): `setTier4OpenState(open)`. In PRODUCTION its only caller is
 *  the transition (`mcp-server.ts`'s `applyExclusion`); a test driving it directly is not a second
 *  production site, and the one-writer census is asserted over `src/main/**` by `P-T4-IM-2`. */
function setTier4Open(open: boolean): void {
  openState = open
  tier4StateModule?.setTier4OpenState?.(open)
}

interface StoreFixture {
  store: StoreLike
  path: string
  log: FsLog
  calls: () => readonly string[]
  bytes: () => Promise<string | null>
  mtime: () => Promise<number | null>
  seed: (record: Record<string, unknown>) => Promise<void>
  rawSeed: (text: string) => Promise<void>
  makeDirAtPath: () => Promise<void>
}

async function makeStoreFixture(opts?: { fsOpts?: boolean }): Promise<StoreFixture> {
  if (storeModule.module === null) {
    throw new Error(`S2-RED: the store module is ABSENT — ${storeModule.reason}`)
  }
  const dir = join(baseDir, String(seq++))
  const path = join(dir, 'provident-security.json')
  const log = freshFsLog()
  // `SecurityStoreOptions` IS UNMOVED AT `{ path }` (`§0A` item 1, `A-1`'s ruling): the ONLY
  // construction input is the path. The `fs` seam stays an UNDECLARED construction extra (`§9`
  // item 5(b)), so it moves no option term. WHILE THE LEAF IS ABSENT the fixture passes the landed
  // `tier4Open` thunk as a LEGACY FALLBACK — dead code the instant `src/main/tier4-state.ts`
  // lands — so the rows that do NOT assert the holder keep their own subjects.
  const construction: Record<string, unknown> = { path }
  if (tier4StateModule === null) construction.tier4Open = () => openState
  if (opts?.fsOpts !== false) construction.fs = makeFsSeam(log)
  const store = storeModule.module.createSecurityStore(construction) as StoreLike
  return {
    store, path, log,
    calls: () => log.calls,
    bytes: async () => { try { return await readFile(path, 'utf8') } catch { return null } },
    mtime: async () => { try { return (await stat(path)).mtimeMs } catch { return null } },
    seed: async (record) => {
      await mkdir(dir, { recursive: true })
      await writeFile(path, JSON.stringify(record))
    },
    rawSeed: async (text) => {
      await mkdir(dir, { recursive: true })
      await writeFile(path, text)
    },
    makeDirAtPath: async () => { await mkdir(path, { recursive: true }) },
  }
}

const FIRST_RUN_DEFAULT = { token: null, enabled: ['read', 'dispatch'], maxJournalLength: undefined }
const SEEDED = { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 }

/* ── the RED-honest accessors (`CTL-1`): an absent member reports the DECLARED
 *    absent symbol, never a bare TypeError.                                   */
function readEntryOf(store: StoreLike, name: unknown): unknown {
  const fn = store.readEntry
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `readEntry` does not exist on the store (§2.1 item 3) — the arbitrary-storage opening is ABSENT')
  }
  return fn.call(store, name)
}
function writeEntryOf(store: StoreLike, name: unknown, value: unknown): unknown {
  const fn = store.writeEntry
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `writeEntry` does not exist on the store (§2.1 item 3) — the arbitrary-storage opening is ABSENT')
  }
  return fn.call(store, name, value)
}
function receiptOf(store: StoreLike): unknown {
  const fn = store.lastWriteReceipt
  if (typeof fn !== 'function') {
    throw new Error('S2-RED: `lastWriteReceipt` does not exist (§2.1 item 3)')
  }
  return fn.call(store)
}
function assertClosedRefusal(answer: unknown, where: string): void {
  expect(answer, `${where} — the refusal is a VALUE from the closed vocabulary (§3.4): ${JSON.stringify(answer)}`).toEqual({
    status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE,
  })
}

/* ═══════════════════════════ THE PANE FIXTURE (`§2.6`) ═════════════════════ */
function carrierRecord(exclusion: string, read: unknown): Record<string, unknown> {
  return { token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion, read }
}
async function mountPaneFor(carrier: Record<string, unknown>): Promise<{ panels: SecurePanels; mount: unknown; reads: () => number }> {
  let reads = 0
  const bridge = {
    get: async () => { reads += 1; return { ...carrier } },
  }
  ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: bridge } }
  const mount = mountEl()
  const panels = new SecurePanels(mount as never)
  await panels.refresh()
  return { panels, mount, reads: () => reads }
}
function paneTextOf(panels: SecurePanels, nodeId: string): string {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}" (the landed SecurePanels surface)`)
  return String((node as { content?: unknown }).content ?? '')
}
function panePropOf(panels: SecurePanels, nodeId: string, prop: string): unknown {
  const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
  const node = nodes.find((n) => ((n as { props?: { id?: string } }).props?.id) === nodeId)
  if (node === undefined) throw new Error(`the pane carries no node with id "${nodeId}"`)
  return (node as { props?: Record<string, unknown> }).props?.[prop]
}
const REFUSAL_SEGMENT = '· refused: tier4-closed'
function segmentDetector(text: string, read: unknown): boolean {
  const present = text.includes(REFUSAL_SEGMENT)
  return read === null ? !present : present
}
function fabricatedDisabledDetector(text: string, exclusion: string): boolean {
  if (exclusion === STATE_MCP_DISABLED) return /· MCP: disabled/.test(text)
  return /· MCP: enabled/.test(text)
}

/* ═══════════════════════════ THE `main.ts` SOURCE PROBES (`[H]`, declared limit) ═════ */
function getHandlerBody(mainSrc: string): string {
  const match = /ipcMain\.handle\(\s*IPC_SECURITY_GET\s*,[\s\S]*?\n\}\)/.exec(mainSrc)
  return match?.[0] ?? ''
}
function setHandlerBody(mainSrc: string): string {
  const match = /ipcMain\.handle\(\s*IPC_SECURITY_SET\s*,[\s\S]*?\n\}\)/.exec(mainSrc)
  return match?.[0] ?? ''
}
function bootWindowIndexes(mainSrc: string): {
  store: number
  bootRead: number
  gate: number
  readerConstructed: boolean
  storeIndex: number
} {
  const storeIndex = mainSrc.search(/createSecurityStore\(/)
  const bootRead = mainSrc.search(/securityStore\.get\(\)/)
  const gate = mainSrc.search(/new SecurityGate\(/)
  // `§0A` item 1 (AMENDED `2026-10-11`, the `A-1` ruling): NO READER IS CONSTRUCTED AT ALL — the
  // holder is a module-level static needing no construction site, and the as-filed "reader before
  // the store" price is WITHDRAWN. A `tier4Open:` option handed at construction is the WITHDRAWN
  // shape and is what this probe detects.
  const readerConstructed = /tier4Open\s*:/.test(mainSrc)
  return { store: storeIndex, bootRead, gate, readerConstructed, storeIndex }
}
/** THE CARRIER'S COMPOSITION, read off the live handler's own bytes (`§2.4` item 7).
 *  The handler closure is `() => ({ … })`, so the answer record's member set is the
 *  object literal's OWN top-level keys — read WITHOUT evaluating anything. */
function carrierMemberCensus(mainSrc: string): string[] {
  const body = getHandlerBody(mainSrc)
  const braceAt = body.indexOf('({')
  if (braceAt === -1) return []
  let depth = 0
  let end = -1
  for (let i = braceAt + 1; i < body.length; i++) {
    const ch = body[i]
    if (ch === '{') depth += 1
    else if (ch === '}') { depth -= 1; if (depth === 0) { end = i; break } }
  }
  if (end === -1) return []
  const literal = body.slice(braceAt + 1, end + 1)
  const keys: string[] = []
  for (const m of literal.matchAll(/(?:^|[,{]\s*)([A-Za-z_$][\w$]*)\s*:/g)) keys.push(m[1])
  if (/\.\.\./.test(literal)) keys.push('...spread')
  return [...new Set(keys)]
}

/* ═══════════════════════════ THE REGISTER (`§5.5.1`) ═══════════════════════ */

/** Build the ten rows. Every drive is the REAL assertion its row's property states. */
function buildRegister(): RegisterRow[] {
  /** A refusal's three readings, shared so the terms stay exactly what `§5.5.1` declares. */
  async function assertRefusedWrite(fx: StoreFixture, drive: Drive['run'], where: string): Promise<void> {
    const before = await fx.bytes()
    const beforeMtime = await fx.mtime()
    const preRecord = JSON.stringify(fx.store.get())
    const callsBefore = fx.calls().length
    await drive()
    assertClosedRefusal(receiptOf(fx.store), `${where} — the receipt`)
    expect(JSON.stringify(fx.store.get()), `${where} — the record did NOT advance (the PRE-WRITE record is answered, §2.1 item 5 step 1)`).toBe(preRecord)
    expect(fx.calls().length, `${where} — NO filesystem call on a refusal (§3.3 item 4): ${fx.calls().slice(callsBefore).join(', ')}`).toBe(callsBefore)
    expect(await fx.bytes(), `${where} — the file's bytes did NOT move`).toBe(before)
    expect(await fx.mtime(), `${where} — the file was not replaced (mtime unmoved)`).toBe(beforeMtime)
  }

  const rows: RegisterRow[] = [
    /* ── ROW 1 · P-T4-TP-1 · S-T4-WGATE-1 · 12 = 4 × 3 ─────────────────── */
    {
      id: 'P-T4-TP-1', type: 'P-TP', strategyId: 'S-T4-WGATE-1', term: 12,
      property: 'THE GATED WRITE IS REFUSED WHOLESALE — while CLOSED a tier-4 write does not commit, does not persist, does not advance the record, and answers the declared refusal as a VALUE; NON-VACUITY: the SAME write while OPEN commits and lands',
      drives: [
        {
          label: 'set({token}) · CLOSED ⇒ refused, no fs, no advance',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); await assertRefusedWrite(fx, () => { fx.store.set({ token: 'NOPE' }) }, 'set({token}) CLOSED') },
        },
        {
          label: 'set({token}) · OPEN ⇒ committed and landed (the non-vacuity term)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const before = await fx.bytes()
            fx.store.set({ token: 'YES' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            expect(fx.store.get().token).toBe('YES')
            expect(await fx.bytes()).not.toBe(before)
            expect(await fx.bytes()).toContain('YES')
          },
        },
        {
          label: 'set({token}) · the TRANSIENT BOOT WINDOW (OPEN at the call, CLOSED after the flip) ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ token: 'WINDOW' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'any'), 'the flip closes the store (§2.5 item 4)').toBeNull()
            const callsBefore = fx.calls().length
            fx.store.set({ token: 'AFTER' })
            assertClosedRefusal(receiptOf(fx.store), 'post-flip write')
            expect(fx.calls().length).toBe(callsBefore)
          },
        },
        {
          label: 'set(four-member patch) · CLOSED ⇒ refused, no fs, no advance',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); await assertRefusedWrite(fx, () => { fx.store.set({ token: 'T', groups: ['code'], disable: ['read'], maxJournalLength: 7 }) }, 'set(four-member) CLOSED') },
        },
        {
          label: 'set(four-member patch) · OPEN ⇒ committed and landed',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            fx.store.set({ token: 'T', groups: ['code'], disable: ['read'], maxJournalLength: 7 })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            const live = fx.store.get()
            expect(live.token).toBe('T')
            expect(live.maxJournalLength).toBe(7)
            expect(String(await fx.bytes())).toContain('"maxJournalLength": 7')
          },
        },
        {
          label: 'set(four-member patch) · the TRANSIENT BOOT WINDOW ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ groups: ['code'] })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
            setTier4Open(false)
            fx.store.set({ groups: ['graph'] })
            assertClosedRefusal(receiptOf(fx.store), 'window patch · post-flip')
          },
        },
        {
          label: 'writeEntry(name, value) · CLOSED ⇒ refused, no fs, nothing written',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const before = await fx.bytes()
            const callsBefore = fx.calls().length
            const answer = writeEntryOf(fx.store, 'alpha', { n: 1 })
            assertClosedRefusal(answer, 'writeEntry CLOSED')
            expect(readEntryOf(fx.store, 'alpha'), 'nothing was written (§2.1 item 5 step 1)').toBeNull()
            expect(fx.calls().length).toBe(callsBefore)
            expect(await fx.bytes()).toBe(before)
          },
        },
        {
          label: 'writeEntry(name, value) · OPEN ⇒ committed; the entry is live AND in the file',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const answer = writeEntryOf(fx.store, 'alpha', { n: 1 })
            expect(answer).toEqual({ status: 'committed' })
            expect(readEntryOf(fx.store, 'alpha')).toEqual({ name: 'alpha', value: { n: 1 } })
            expect(String(await fx.bytes()), 'the file carries the entry (§2.2 item 2)').toContain('alpha')
          },
        },
        {
          label: 'writeEntry(name, value) · the TRANSIENT BOOT WINDOW ⇒ the write inside the window commits',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'boot', 9)).toEqual({ status: 'committed' })
            setTier4Open(false)
            const callsBefore = fx.calls().length
            assertClosedRefusal(writeEntryOf(fx.store, 'boot', 10), 'window writeEntry · post-flip')
            expect(readEntryOf(fx.store, 'boot'), 'the PRE-CALL value of that name is answered (2), not the refused write').toEqual({ name: 'boot', value: 9 })
            expect(fx.calls().length).toBe(callsBefore)
          },
        },
        {
          label: 'the whole-record patch path (a patch the landed admission refuses) · CLOSED ⇒ the GATE refusal precedes the admission',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            await assertRefusedWrite(fx, () => { fx.store.set({ token: 12 as never }) }, 'whole-record patch CLOSED')
          },
        },
        {
          label: 'the whole-record patch path · OPEN ⇒ the LANDED admission refusal (`write-failed`) is what answers',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const answer = fx.store.set({ token: 12 as never })
            expect(receiptOf(fx.store), 'the landed admission refusal, NOT the gate refusal (§2.1 item 5 step 3)').toEqual({ status: 'refused', reason: 'write-failed' })
            expect(answer).toBeTruthy()
          },
        },
        {
          label: 'the gate consult is AHEAD of the admission and BESIDE `persist()` — a CLOSED refusal of a patch the admission would ALSO refuse answers `tier4-closed`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            fx.store.set({ token: 12 as never })
            expect(receiptOf(fx.store), 'the gate consult runs FIRST (§2.1 item 5 step 1 — a consult after the admission FAILS)').toEqual({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
          },
        },
      ],
    },

    /* ── ROW 2 · P-T4-TP-2 · S-T4-RGATE-1 · 10 = 6 + 1 + 3 ─────────────── */
    {
      id: 'P-T4-TP-2', type: 'P-TP', strategyId: 'S-T4-RGATE-1', term: 10,
      property: 'THE GATED READ IS REFUSED AS A VALUE — while CLOSED every tier read (get · lastWriteReceipt · readEntry, and the boot-ingestion read) answers the tier PRE-CALL value, detached and cycle-safe, and NEVER throws; the refusal is legible on the CHANNEL, never in the returned value. NON-VACUITY: the same read while OPEN answers the live value',
      drives: [
        {
          label: 'get() · CLOSED ⇒ PRE-CALL record, detached, no throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const pre = JSON.stringify(SEEDED)
            const read = fx.store.get()
            expect(JSON.stringify(read)).toBe(pre)
            expect(JSON.stringify(read), 'the refusal is NOT in the value (§2.4 item 6)').not.toContain(TIER4_CLOSED)
            read.token = 'MUTATED'
            expect(fx.store.get().token, 'the copy is DETACHED (§3.3 item 6)').toBe('SEED')
          },
        },
        {
          label: 'get() · OPEN ⇒ the live value',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(fx.store.get().token).toBe('SEED')
          },
        },
        {
          label: 'get() · the TRANSIENT BOOT WINDOW ⇒ the live value inside the window',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            expect(fx.store.get().token).toBe('SEED')
            setTier4Open(false)
            expect(fx.store.get().token, 'no carve-out: the value is the tier PRE-CALL record').toBe('SEED')
          },
        },
        {
          label: 'lastWriteReceipt() · CLOSED ⇒ the PRE-CALL receipt, detached (no carve-out, §2.3 G-2)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'k', 1)).toEqual({ status: 'committed' })
            setTier4Open(false)
            const pre = receiptOf(fx.store)
            expect(pre, 'the PRE-CALL receipt is answered, not the gate refusal (§2.4 item 6)').toEqual({ status: 'committed' })
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'k2', 2)).toEqual({ status: 'committed' })
            setTier4Open(false)
            expect(receiptOf(fx.store), 'the receipt did not advance while CLOSED').toEqual({ status: 'committed' })
          },
        },
        {
          label: 'lastWriteReceipt() · OPEN ⇒ the live receipt',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(receiptOf(fx.store)).toBeNull()
            fx.store.set({ token: 'A' })
            expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
          },
        },
        {
          label: 'lastWriteReceipt() · the TRANSIENT BOOT WINDOW ⇒ one side of the pair, never a mixture',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            setTier4Open(true)
            fx.store.set({ token: 'A' })
            const open = receiptOf(fx.store)
            setTier4Open(false)
            const closed = receiptOf(fx.store)
            expect([JSON.stringify(open), JSON.stringify(closed)].includes(JSON.stringify({ status: 'committed' }))).toBe(true)
            expect(JSON.stringify(closed), 'NO half-moved pair is legible (§2.5 item 6)').not.toContain('mcp-')
          },
        },
        {
          label: 'THE BOOT-INGESTION READ — the read at the declared boot turn answers the ingested record (a CLOSED boot read is the FAILING arm `§5.5.1` names)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            const bootSrc = sourceOrEmpty(MAIN_SRC)
            const bootReadIndex = bootSrc.search(/securityStore\.get\(\)/)
            expect(bootReadIndex, 'the boot read exists at `main.ts` (§2.5 item 5 `F-3`)').toBeGreaterThan(-1)
            const beforeBoot = bootSrc.slice(0, bootReadIndex)
            expect(/new SecurityGate\(/.test(beforeBoot), 'THE BOOT ORDER: the store is constructed (and its OPEN boot value declared) BEFORE the gate exists (`§0A` item 4 / `D-19`)').toBe(false)
            expect(/const\s+persisted\s*=\s*securityStore\.get\(\)/.test(bootSrc), 'the boot-ingestion read is a PLAIN read — no try/catch exception (`§2.5` item 5 `F-3`)').toBe(true)
            setTier4Open(true)
            expect(fx.store.get().token, 'the boot read is INSIDE the declared OPEN window and succeeds without exception').toBe('SEED')
          },
        },
        {
          label: 'the carrier cell: `read` is PRESENT and is the closed refusal on a CLOSED read (§2.4 item 7)',
          run: () => {
            const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(census, `the GET response record carries the additive read member beside exclusion (§5.1 item 4) — measured members: [${census.join(', ')}]`).toContain('read')
            expect(census).toContain('exclusion')
          },
        },
        {
          label: 'the carrier cell: `read` ABSENT ⇒ FAILS (`PAR-8` — absence is the OUTSIDE value)',
          run: () => {
            const census = carrierMemberCensus('() => ({ ...securityStore.get(), exclusion: mcp.gate.exclusionState() })')
            expect(census.includes('read'), 'CONTROL: the census detector FIRES on the pre-repair member set').toBe(false)
            const live = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(live.includes('read'), `the live handler member set must carry read: [${live.join(', ')}]`).toBe(true)
          },
        },
        {
          label: 'the carrier cell: the MESSAGE substituted for the STATE ⇒ FAILS (`PAR-9` — a message is not a state)',
          run: () => {
            const bad = /exclusion:\s*(TIER4_CLOSED_MESSAGE|EXCLUSION_CLOSED_MESSAGE)/
            expect(bad.test('exclusion: TIER4_CLOSED_MESSAGE'), 'CONTROL: the substitution detector FIRES on a substituted state').toBe(true)
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(bad.test(handler), 'the live handler never substitutes a MESSAGE for the `exclusion` state').toBe(false)
          },
        },
      ],
    },

    /* ── ROW 3 · P-T4-IM-1 · S-T4-PAIR-1 · 12 = 2 × 2 × 3 ──────────────── */
    {
      id: 'P-T4-IM-1', type: 'P-IM', strategyId: 'S-T4-PAIR-1', term: 12,
      property: 'THE TWO SIDES NEVER DISAGREE — at every instant the store\'s functions and the MCP enforcement path read the SAME ONE value: CLOSED ⇒ a tier-4 write is refused AND the MCP endpoints answer the declared receipt; OPEN ⇒ the store commits AND the MCP endpoints answer normally; no half-moved pair is ever legible',
      drives: [
        {
          label: 'the store side · the CLOSED half (a write is refused)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'p', 1), 'pair · closed') },
        },
        {
          label: 'the store side · the OPEN half (a write commits)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'p', 1)).toEqual({ status: 'committed' }) },
        },
        {
          label: 'the store side · the TRANSIENT WINDOW (the store reads ONE side, never a mixture)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const a = writeEntryOf(fx.store, 'p', 1)
            setTier4Open(false)
            const b = writeEntryOf(fx.store, 'p', 2)
            expect([JSON.stringify(a), JSON.stringify(b)]).toEqual([JSON.stringify({ status: 'committed' }), JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })])
          },
        },
        {
          label: 'the MCP side · the CLOSED half (the endpoints answer the declared receipt — `G-3`, landed)',
          run: () => {
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(mcp).toContain(`export const EXCLUSION_CLOSED = '${EXCLUSION_CLOSED}'`)
            expect(/exclusionAllowsWork\(gate\(\)\.exclusionState\(\)\)/.test(mcp), 'the invocation turn reads the LIVE reader, not a snapshot (`§2.2` item 2(a), S1)').toBe(true)
          },
        },
        {
          label: 'the MCP side · the OPEN half (the same predicate answers normally)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            expect(gate.exclusionState(), 'the ONE value, read off the one record (`security.ts:202`)').toBe(STATE_MCP_ENABLED)
            const open = gate.withExclusion(STATE_MCP_DISABLED)
            expect(open.exclusionState()).toBe(STATE_MCP_DISABLED)
          },
        },
        {
          label: 'the MCP side · the TRANSIENT WINDOW (the transition moves BOTH axes together)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const moved = gate.withExclusion(STATE_MCP_DISABLED)
            expect(moved.exclusion, 'the derived pair moves as ONE (`§2.1` item 2, S1)').toEqual({ mcpEnabled: false, tier4Open: true })
            expect(gate.exclusion, 'the receiver is unchanged (the pure-constructor form)').toEqual({ mcpEnabled: true, tier4Open: false })
          },
        },
        {
          label: 'ONE live value · the store and the MCP side read the SAME boolean, closed',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(false)
            const storeRefused = (writeEntryOf(fx.store, 'x', 1) as { reason?: string }).reason === TIER4_CLOSED
            const mcpRefuses = fx.store.get() !== undefined && !tier4Reader()
            expect(storeRefused && mcpRefuses, 'the two sides read the SAME one value — never two homes').toBe(true)
          },
        },
        {
          label: 'ONE live value · the same reading, open',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            const storeCommitted = JSON.stringify(writeEntryOf(fx.store, 'x', 1)) === JSON.stringify({ status: 'committed' })
            expect(storeCommitted && tier4Reader()).toBe(true)
          },
        },
        {
          label: 'ONE live value · a flipped pair is never legible in halves (the reader is re-read per call)',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            const first = JSON.stringify(writeEntryOf(fx.store, 'x', 1))
            setTier4Open(false)
            const second = JSON.stringify(writeEntryOf(fx.store, 'x', 2))
            expect(first).toBe(JSON.stringify({ status: 'committed' }))
            expect(second).toBe(JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
          },
        },
        {
          label: 'the PAIR TABLE · `{MCP-ENABLED, TIER-4-CLOSED}` is the CLOSED half (`exclusionAllowsWork` refuses work)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            expect(gate.exclusion).toEqual({ mcpEnabled: true, tier4Open: false })
          },
        },
        {
          label: 'the PAIR TABLE · `{MCP-DISABLED, TIER-4-OPEN}` is the OPEN half',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const flipped = gate.withExclusion(STATE_MCP_DISABLED)
            expect(flipped.exclusion).toEqual({ mcpEnabled: false, tier4Open: true })
          },
        },
        {
          label: 'the PAIR TABLE · the ILLEGAL pair is unreachable through the ONE writer (`withExclusion` is the only move)',
          run: () => {
            const src = sourceOrEmpty(SECURITY_STORE_SRC)
            void src
            const gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
            const illegal = gate.withExclusion('bogus' as never)
            expect(illegal.exclusionState(), 'a `T-4` outside value answers the UNCHANGED gate — no illegal pair is minted').toBe(STATE_MCP_ENABLED)
          },
        },
      ],
    },

    /* ── ROW 4 · P-T4-IM-2 · S-T4-STATE-1 · 8 = 4 + 2 + 2 ──────────────── */
    {
      id: 'P-T4-IM-2', type: 'P-IM', strategyId: 'S-T4-STATE-1', term: 8,
      property: 'THE BOOLEAN IS ONE VALUE WITH ONE WRITER, READABLE REGARDLESS OF GATING — one home, one writer, no reader routes through a store read, so a gated store cannot blank the operator\'s reader',
      drives: [
        {
          label: 'reader 1 · the store\'s functions read the ONE value at their own turn (off the STATIC HOLDER, read once per call)',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'never'), 'the holder is consulted and the tier answers CLOSED').toBeNull()
            setTier4Open(true)
            expect(writeEntryOf(fx.store, 'never', 1)).toEqual({ status: 'committed' })
          },
        },
        {
          label: 'reader 2 · the MCP invocation turn reads the LIVE gate (never a captured snapshot)',
          run: () => {
            expect(/exclusionTurn\(\(\) => this\._gate\)/.test(sourceOrEmpty(MCP_SERVER_SRC)), 'the turn takes the gate\'s READER, not a gate (`§2.2` item 2(a))').toBe(true)
          },
        },
        {
          label: 'reader 3 · the operator\'s carrier reads the boolean INDEPENDENTLY of any store read (off the STATIC HOLDER)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(handler.length, 'the GET handler exists').toBeGreaterThan(0)
            expect(/securityStore\.get\(\)/.test(handler), 'the boolean is NOT routed through a store read (`§2.4` item 7 — the deadlock\'s dissolution)').toBe(false)
            expect(/tier4OpenState\(\)/.test(handler), 'the carrier reads the ONE boolean off the STATIC HOLDER (`§0A` item 1, the `A-1` ruling — the `F-1` captured-instance class is closed structurally)').toBe(true)
          },
        },
        {
          label: 'reader 4 · the boot\'s ingestion does not read the gate at all (the boot is inside the declared OPEN state)',
          run: () => {
            const boot = sourceOrEmpty(MAIN_SRC)
            const bootRead = boot.search(/securityStore\.get\(\)/)
            expect(bootRead, 'the boot read exists').toBeGreaterThan(-1)
            expect(/gate\.exclusionState\(\)|SecurityGate\s*\(/.test(boot.slice(0, bootRead)), 'no gate is consulted BEFORE the boot-ingestion read (`§0A` item 4)').toBe(false)
          },
        },
        {
          label: 'a second WRITER · the ONE home is the DECLARED leaf module and the ONE writer is the transition (drive RE-GRAINED at `KB-1`)',
          run: () => {
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted the SUPERSEDED clause) — the as-filed second half required ZERO
             * `withExclusion(` occurrences in `mcp-server.ts` + `main.ts` while `FS-T4-12` required
             * EXACTLY `1` in `mcp-server.ts` (the LANDED transition site `applyExclusion`, `§2.5`
             * item 2's ONE production call, which `§2.3` `G-3` cites as landed): the two rows were
             * mutually unsatisfiable. THE AMENDED CLAUSE (`§0A` item 1, the `A-1` ruling): the
             * boolean's home is the STATIC HOLDER of the ONE main-side leaf `src/main/tier4-state.ts`,
             * and its ONE writer is the TRANSITION, whose only production site is that same
             * `applyExclusion`. So the drive now counts SITES, on the amended terms. */
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, item (b): the detector is
             * MODULE-SCOPE ANCHORED). The as-filed form was
             * `/^\s*(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m` — its leading `\s*`
             * let it fire on ANY INDENTED line, i.e. on four UNRELATED FUNCTION LOCALS that
             * happen to bind a boolean (`main.ts`'s `let settingsCorrupt = false` · `let corrupt
             * = false` · `let admissible = true`, and `security-store.ts`'s `let loaded = false`),
             * so `main.ts`/`security-store.ts` were reported as holding a SECOND HOME for the one
             * boolean while holding none. The term's subject is a **MODULE-LEVEL** mutable
             * boolean, so the detector is now anchored to MODULE SCOPE — a column-0 declaration —
             * and the indented class is driven as a NEGATIVE control beside it. */
            const moduleLevelAssignment = /^(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m
            expect(moduleLevelAssignment.test('let storeOpen = true;'), 'CONTROL: the holder detector FIRES on a MODULE-LEVEL mutable boolean (column 0)').toBe(true)
            expect(moduleLevelAssignment.test('  let settingsCorrupt = false'), 'CONTROL (negative): and it does NOT fire on a FUNCTION LOCAL (`main.ts`:127/136/142, `security-store.ts`:169 — the four unrelated `let … = true|false` bindings the as-filed form misfired on)').toBe(false)
            const leaf = sourceOrEmpty(TIER4_STATE_SRC)
            expect(moduleLevelAssignment.test(leaf), 'the ONE declared home — `src/main/tier4-state.ts` — DOES hold the module-level mutable boolean (`§0A` item 1)').toBe(true)
            for (const [label, src] of [['mcp-server.ts', sourceOrEmpty(MCP_SERVER_SRC)], ['main.ts', sourceOrEmpty(MAIN_SRC)], ['security-store.ts', sourceOrEmpty(SECURITY_STORE_SRC)]] as Array<[string, string]>) {
              expect(moduleLevelAssignment.test(src), `${label} holds NO module-level mutable home for the boolean — the home is the ONE leaf, never a second holder`).toBe(false)
            }
            /* THE SITE DETECTOR READS CODE, NEVER PROSE (`2026-10-11`, the same class as item
             * (b)'s scope anchoring): the as-filed counter matched raw source, so the store's
             * own DOC COMMENT naming the leaf's two names (`§2.5` item 1's *"the store CONSULTS
             * the holder; it never writes it"*) counted as a WRITE SITE. The subject is a call,
             * so comments are stripped before counting, and a commented mention is driven as a
             * NEGATIVE control. */
            const withoutComments = (src: string): string => src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
            const writer = /setTier4OpenState\s*\(/g
            const sitesIn = (src: string): number => (withoutComments(src).match(writer) ?? []).length
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(sitesIn('setTier4OpenState(true)'), 'CONTROL: the writer-sites detector FIRES on a call').toBe(1)
            expect(sitesIn('// the transition calls setTier4OpenState(...) here\n'), 'CONTROL (negative): and a COMMENTED mention is not a write site — the detector reads code, never prose').toBe(0)
            expect(sitesIn(mcp), '`mcp-server.ts` holds the transition\'s ONE write of the holder').toBe(1)
            expect(sitesIn(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own (`F-11`: main supplies STATE, never takes the DECISION)').toBe(0)
            expect(sitesIn(sourceOrEmpty(SECURITY_STORE_SRC)), 'the store CONSULTS the holder; it never writes it (`§2.5` item 1)').toBe(0)
            const withExclusionSites = (source: string): number => (withoutComments(source).match(/withExclusion\s*\(/g) ?? []).length
            expect(withExclusionSites('const gate = other.withExclusion(next)'), 'CONTROL: the detector FIRES on a foreign site').toBe(1)
            expect(withExclusionSites(mcp), '`mcp-server.ts` holds the ONE landed transition site (`applyExclusion`) — the row `FS-T4-12` also counts, so the two rows now AGREE (`KB-1`)').toBe(1)
            expect(withExclusionSites(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own').toBe(0)
          },
        },
        {
          label: 'a second writer · a second gate\'s `withExclusion` must NOT observe the first (one live home)',
          run: () => {
            const first = new SecurityGate({ token: null, enabled: [] })
            const second = new SecurityGate({ token: null, enabled: [] })
            const moved = first.withExclusion(STATE_MCP_DISABLED)
            expect(moved.exclusionState()).toBe(STATE_MCP_DISABLED)
            expect(second.exclusionState(), 'a gate constructed independently never observes another\'s transition').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'readable-regardless-of-gating · a CLOSED-state OPERATOR read still succeeds (`§2.6` item 2)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            expect(/tier4OpenState\(\)/.test(handler), 'the operator\'s read is off the STATIC HOLDER, so a gated store cannot blank it (`§0A` item 1)').toBe(true)
            expect(/securityStore\.get\(\)/.test(handler)).toBe(false)
          },
        },
        {
          label: 'readable-regardless-of-gating · CLOSED: the STORE read is refused while the OPERATOR read is not',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            assertClosedRefusal(writeEntryOf(fx.store, 'z', 1), 'store side, closed')
            const carried = carrierRecord(STATE_MCP_DISABLED, null)
            expect(carried.exclusion, 'the operator still reads the STATE').toBe(STATE_MCP_DISABLED)
            expect(carried.read, 'and the refusal is legible BESIDE it').toBeNull()
          },
        },
      ],
    },

    /* ── ROW 5 · P-T4-TP-3 · S-T4-VOCAB-1 · 14 = 8 + 6 ─────────────────── */
    {
      id: 'P-T4-TP-3', type: 'P-TP', strategyId: 'S-T4-VOCAB-1', term: 14,
      property: 'EVERY REFUSAL IS A VALUE FROM THE CLOSED VOCABULARY — exactly two reason tokens and no third; the two FORMS are closed at status/reason with `message` additive and present only on `tier4-closed`; the message names the CAUSE (the MCP is open) and the REMEDY (disable MCP) and is server-authored; `exclusion-closed`\'s own domain is untouched; neither token is a store-union member; nothing throws',
      drives: [
        {
          label: '(1) a CLOSED-state write · CLOSED ⇒ the closed value, never a throw',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'v', 1), 'vocab (1) closed') },
        },
        {
          label: '(1) a CLOSED-state write · OPEN ⇒ no gate refusal at all',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1)).toEqual({ status: 'committed' }) },
        },
        {
          label: '(2) a non-representable value · CLOSED ⇒ the gate token (the consult precedes the admission)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'v', 1n), 'vocab (2) closed') },
        },
        {
          label: '(2) a non-representable value · OPEN ⇒ the LANDED `write-failed` form (two tokens, no third)',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1n)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: '(3) a hostile patch · CLOSED ⇒ the PRE-WRITE record as a VALUE, never a throw (drive RE-GRAINED at `KB-2`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const hostile = new Proxy({}, { get: () => { throw new Error('hostile get') }, ownKeys: () => { throw new Error('hostile keys') } })
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted the SUPERSEDED clause). The as-filed assertion called
             * `assertClosedRefusal(fx.store.set(hostile))`, requiring `set()` to ANSWER the closed
             * refusal while CLOSED — contradicting its OWN label, `M-5` and `§2.1` item 5 step 1
             * ("the answer is the PRE-WRITE record (for `set`) or the closed refusal VALUE (for
             * `writeEntry`)"). THE AMENDED CLAUSE, quoted: "the answer is the **PRE-WRITE** record
             * (for `set`) or the closed refusal VALUE (for `writeEntry`)" — and `§2.1` item 3's
             * table: "the record now live (... the **PRE-WRITE** record on any refusal)". So the
             * drive asserts the AMENDED answer, and keeps the refusal's legibility on the RECEIPT
             * — which is where `§2.1` item 5 step 1 puts it: `lastReceipt = { status:'refused',
             * reason:'tier4-closed', message: TIER4_CLOSED_MESSAGE }`. */
            const returned = fx.store.set(hostile)
            expect(returned, '`set()` answers the PRE-WRITE record as a VALUE — the hostile patch changes nothing about that answer').toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
            assertClosedRefusal(receiptOf(fx.store), 'vocab (3) closed · the receipt carries the closed refusal')
          },
        },
        {
          label: '(3) a hostile patch · OPEN ⇒ the LANDED refused form, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(() => fx.store.set(new Proxy({}, { get: () => { throw new Error('hostile get') } }) as never)).not.toThrow()
            expect(receiptOf(fx.store)).toEqual({ status: 'refused', reason: 'write-failed' })
          },
        },
        {
          label: '(4) an out-of-domain patch · CLOSED ⇒ the gate token',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); fx.store.set(null as never); assertClosedRefusal(receiptOf(fx.store), 'vocab (4) closed') },
        },
        {
          label: '(4) an out-of-domain patch · OPEN ⇒ the LANDED refused form',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(() => fx.store.set(null as never)).not.toThrow(); expect(receiptOf(fx.store)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'vocabulary cell: NOT A THROW — no declared member throws in any state',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            const arms: Array<() => unknown> = [
              () => fx.store.get(), () => fx.store.set({}), () => receiptOf(fx.store),
              () => readEntryOf(fx.store, 'x'), () => writeEntryOf(fx.store, 'x', 1),
            ]
            for (const state of [true, false]) {
              setTier4Open(state)
              for (const arm of arms) expect(arm, `no member throws (state open=${String(state)})`).not.toThrow()
            }
          },
        },
        {
          label: 'vocabulary cell: the token is spelled VERBATIM `tier4-closed` (one token, lowercase, hyphenated)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { reason?: unknown }
            expect(answer.reason).toBe('tier4-closed')
            expect(TIER4_CLOSED).toBe('tier4-closed')
            expect(sourceOrEmpty(MCP_SERVER_SRC), 'its HOME is beside `EXCLUSION_CLOSED` (`§2.4` item 1)').toContain("'tier4-closed'")
          },
        },
        {
          label: 'vocabulary cell: NO case variant and NO whitespace variant',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { reason?: unknown }
            expect(['tier4-closed']).toContain(answer.reason)
            expect(String(answer.reason)).not.toMatch(/[A-Z\s]/)
          },
        },
        {
          label: 'vocabulary cell: the message is PRESENT, server-authored, and names CAUSE + REMEDY (`PAR-7`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false)
            const answer = writeEntryOf(fx.store, 'x', 1) as { message?: unknown }
            expect(typeof answer.message).toBe('string')
            expect(String(answer.message).length).toBeGreaterThan(0)
            expect(String(answer.message).trim().length).toBeGreaterThan(0)
            expect(/MCP endpoint is open/i.test(String(answer.message)), 'the message names the CAUSE (the MCP is open)').toBe(true)
            expect(/disable MCP/i.test(String(answer.message)), 'the message names the REMEDY (disable MCP)').toBe(true)
            expect(sourceOrEmpty(MCP_SERVER_SRC), 'built in THIS module, never derived from caller input (`PAR-7`)').toContain('TIER4_CLOSED_MESSAGE')
          },
        },
        {
          label: 'vocabulary cell: `reason` is NEVER `null` and NEVER a third token (the module\'s own receipt bytes)',
          run: () => {
            const tokens = declaredReasonTokens()
            expect(tokens, `the closed token set read off the module's own receipt type: [${tokens.join(', ')}]`).toEqual(['write-failed'])
            expect(tokens).not.toContain('tier4-closed')
            expect(tokens, 'CONTROL: the token extractor FIRES on a mutated copy').not.toContain('nonexistent-token')
          },
        },
        {
          label: 'vocabulary cell: `exclusion-closed` STAYS an MCP-side channel token and neither token enters the store union',
          run: () => {
            const mcp = sourceOrEmpty(MCP_SERVER_SRC)
            expect(mcp).toContain(`'${EXCLUSION_CLOSED}'`)
            expect(sourceOrEmpty(STORE_CORE_SRC), '`tier4-closed` is NOT a member of the store\'s closed union (`D-GATE` clause (2))').not.toContain(`'${TIER4_CLOSED}'`)
            expect(sourceOrEmpty(STORE_CHANNELS_SRC), 'nor a `store-channels.ts` constant (`§2.4` item 2)').not.toContain(TIER4_CLOSED)
          },
        },
      ],
    },

    /* ── ROW 6 · P-T4-IM-3 · S-T4-PANE-1 · 10 = 4 + 6 ──────────────────── */
    {
      id: 'P-T4-IM-3', type: 'P-IM', strategyId: 'S-T4-PANE-1', term: 10,
      property: 'THE PANE FABRICATES NO OBSERVABLE — the `MCP:` segment and the toggle\'s `data-state`/affordance are fed by the BOOLEAN-sourced carrier member, never by a store-derived value, never by the pane\'s own prior state; the refusal segment is present IFF the carrier\'s `read` is non-null; no tier-4 value or name ever appears in a rendered surface',
      drives: [
        {
          label: 'the `MCP:` segment · OPEN (`exclusion: mcp-disabled`) ⇒ the boolean-sourced word',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(paneTextOf(panels, 'security-status')).toContain('· MCP: disabled')
          },
        },
        {
          label: 'the `MCP:` segment · CLOSED (`exclusion: mcp-enabled`) ⇒ the word, never blanked',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            expect(paneTextOf(panels, 'security-status')).toContain('· MCP: enabled')
          },
        },
        {
          label: 'the toggle\'s `data-state` · OPEN ⇒ `mcp-disabled`',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_DISABLED)
          },
        },
        {
          label: 'the toggle\'s `data-state` · CLOSED ⇒ `mcp-enabled`',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 1: fed by a store-derived value ⇒ FAILS (the refusal must ride `read`)',
          run: async () => {
            const bad = carrierRecord(STATE_MCP_ENABLED, STATE_MCP_ENABLED)
            expect(segmentDetector('· MCP: enabled', STATE_MCP_ENABLED), 'CONTROL: a non-null `read` with no refusal segment FAILS the detector').toBe(false)
            expect(bad.read).not.toBeNull()
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            expect(paneTextOf(panels, 'security-status'), 'a non-null `read` ⇒ the segment is PRESENT').toContain(REFUSAL_SEGMENT)
          },
        },
        {
          label: 'FABRICATION 2: fed by the pane\'s own PRIOR state ⇒ FAILS (a refresh must re-source, not re-use)',
          run: async () => {
            const first = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(panePropOf(first.panels, 'exclusion-toggle', 'data-state')).toBe(STATE_MCP_DISABLED)
            // the SAME pane instance, refreshed with the OTHER carrier value:
            const secondCarrier = carrierRecord(STATE_MCP_ENABLED, null)
            ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...secondCarrier }) } } }
            await first.panels.refresh()
            expect(panePropOf(first.panels, 'exclusion-toggle', 'data-state'), 'the pane re-sources from the CARRIER, never from its own prior value').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 3: stale after a gated store read ⇒ FAILS (`M-9` — the state word stays legible)',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            const text = paneTextOf(panels, 'security-status')
            expect(text).toContain('· MCP: enabled')
            expect(text).toContain(REFUSAL_SEGMENT)
          },
        },
        {
          label: 'FABRICATION 4: the AFFORDANCE WORD substituted for the state ⇒ FAILS (`PAR-11`)',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
            const affordance = paneTextOf(panels, 'exclusion-toggle')
            expect(affordance, 'the affordance word is a CONTROL label (`§2.4` item 2, S1)').toMatch(/Disable MCP|Enable MCP/)
            expect(panePropOf(panels, 'exclusion-toggle', 'data-state'), 'the state member carries the STATE token').toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'FABRICATION 5: a fabricated `disabled` while the state is OPEN ⇒ FAILS',
          run: async () => {
            const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            const text = paneTextOf(panels, 'security-status')
            expect(fabricatedDisabledDetector(text, STATE_MCP_DISABLED), 'CONTROL: the detector FIRES on the declared rendering').toBe(true)
            expect(fabricatedDisabledDetector('· MCP: enabled', STATE_MCP_DISABLED), 'CONTROL: it does NOT fire on the fabricated rendering').toBe(false)
          },
        },
        {
          label: 'FABRICATION 6: the segment ABSENT while `read` is non-null ⇒ FAILS; and PRESENT while `read` is null ⇒ FAILS',
          run: async () => {
            const closed = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
            expect(segmentDetector(paneTextOf(closed.panels, 'security-status'), { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })).toBe(true)
            const open = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
            expect(paneTextOf(open.panels, 'security-status'), '`read: null` ⇒ NO refusal segment').not.toContain(REFUSAL_SEGMENT)
          },
        },
      ],
    },

    /* ── ROW 7 · P-T4-SM-1 · S-T4-BOOT-1 · 10 = 4 + 3 + 3 ──────────────── */
    {
      id: 'P-T4-SM-1', type: 'P-SM', strategyId: 'S-T4-BOOT-1', term: 10,
      property: 'THE BOOT WINDOW IS THE DECLARED DEFAULT, NOT AN ILLEGAL PAIR — at boot the boolean is STORE-OPEN; the boot-ingestion read therefore succeeds without exception; the flip to store-closed lands BEFORE the MCP is enabled; `{MCP-DISABLED, TIER-4-CLOSED}` is reachable ONLY inside the window and is not a legal steady pair',
      drives: [
        {
          label: 'D-19 step 1 OPEN · the store is constructed with NO READER AT ALL, and the holder\'s declared initial value is STORE-OPEN (drive RE-GRAINED at the `A-1` ruling)',
          run: () => {
            /* The as-filed drive asserted the WITHDRAWN `§0A` item 1 price (`readerBeforeStore`). The
             * amended clause: the one boolean lives in a STATIC module-level holder with no
             * construction site, so there is no reader to construct and no boot re-ordering — the
             * LANDED window `store → boot read → gate → flip → mcp.start()` stands, and the store's
             * OPEN reading at the boot read comes from the holder's declared initial. */
            const idx = bootWindowIndexes(sourceOrEmpty(MAIN_SRC))
            expect(idx.storeIndex, 'the store construction exists at `main.ts`').toBeGreaterThan(-1)
            expect(idx.readerConstructed, 'NO reader is constructed and no `tier4Open` option is handed (`§0A` item 1, amended)').toBe(false)
            const leaf = sourceOrEmpty(TIER4_STATE_SRC)
            expect(leaf, 'the STATIC HOLDER is a main-side leaf (`src/main/tier4-state.ts`)').not.toBe('')
            expect(/export function tier4OpenState\s*\(/.test(leaf), 'its ONE reader is `tier4OpenState()`').toBe(true)
            expect(/export function setTier4OpenState\s*\(/.test(leaf), 'its ONE writer is `setTier4OpenState()` — the transition\'s').toBe(true)
            expect(/^\s*(?:let|var)\s+\w+\s*=\s*(?:true|false)\s*;?\s*$/m.test(leaf), 'the holder is a STATIC module-level boolean reference').toBe(true)
            expect(/from\s+['"][^'"]*shared\//.test(leaf), 'the leaf imports NOTHING from `src/shared/**` (which would pull the renderer in)').toBe(false)
            const declaredInitial = /^\s*(?:let|var)\s+(\w+)\s*=\s*(true|false)\s*;?\s*$/m.exec(leaf)
            expect(declaredInitial?.[2], `the holder's DECLARED INITIAL VALUE is \`STORE-OPEN\` (\`true\`) — D-19's window; measured initializer: ${String(declaredInitial?.[2])}`).toBe('true')
          },
        },
        {
          label: 'D-19 step 2 INGEST · the boot read is a plain read inside the declared OPEN window',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const idx = bootWindowIndexes(src)
            expect(idx.bootRead).toBeGreaterThan(idx.storeIndex === -1 ? Number.MAX_SAFE_INTEGER : idx.storeIndex)
            expect(/const\s+persisted\s*=\s*securityStore\.get\(\)/.test(src), 'no try/catch exception wraps the boot read (`§2.5` item 5 `F-3`)').toBe(true)
          },
        },
        {
          label: 'D-19 step 3 CLOSE · the flip lands BEFORE the MCP is enabled',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const enable = src.search(/await\s+mcp\.start\(/)
            const flip = src.search(/mcp\.applyExclusion\(/)
            expect(enable, 'the enable site exists').toBeGreaterThan(-1)
            expect(flip, 'the flip site exists — a design in which the MCP enables while the state still says store-open FAILS').toBeGreaterThan(-1)
            expect(flip).toBeLessThan(enable)
          },
        },
        {
          label: 'D-19 step 4 ENABLE · the enable site exists after the flip (the four steps, in order)',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            const store = src.search(/createSecurityStore\(/)
            const bootRead = src.search(/securityStore\.get\(\)/)
            const gate = src.search(/new SecurityGate\(/)
            expect(store).toBeGreaterThan(-1)
            expect(bootRead).toBeGreaterThan(store)
            expect(gate === -1 || gate > bootRead, 'store → boot read → gate (`main.ts:86-95`)').toBe(true)
          },
        },
        {
          label: 'PAIR 1 · `{MCP-ENABLED, TIER-4-CLOSED}` is legal (the steady closed pair)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: [] })
            expect(gate.exclusionState()).toBe(STATE_MCP_ENABLED)
          },
        },
        {
          label: 'PAIR 2 · `{MCP-DISABLED, TIER-4-OPEN}` is legal (the steady open pair)',
          run: () => {
            const gate = new SecurityGate({ token: null, enabled: [] }).withExclusion(STATE_MCP_DISABLED)
            expect(gate.exclusion).toEqual({ mcpEnabled: false, tier4Open: true })
          },
        },
        {
          label: 'PAIR 3 · `{MCP-DISABLED, TIER-4-CLOSED}` is reachable ONLY inside the boot window — never as a steady pair',
          run: () => {
            const src = sourceOrEmpty(MAIN_SRC)
            expect(src, 'the boot value is DECLARED STORE-OPEN (`§0A` item 4, now the HOLDER\'s declared initial: `§0A` item 1, amended)').toMatch(/createSecurityStore\(/)
            const gateAfterStore = (() => { const i = bootWindowIndexes(src); return i.gate === -1 || i.gate > i.storeIndex })()
            expect(gateAfterStore).toBe(true)
            expect(/^\s*(?:let|var)\s+\w+\s*=\s*true\s*;?\s*$/m.test(sourceOrEmpty(TIER4_STATE_SRC)), 'and the HOLDER\'s declared initial value is STORE-OPEN (`§0A` item 1, amended) — which is what makes the boot read legal without any exception').toBe(true)
          },
        },
        {
          label: 'BOOT FAIL-STATE 1 · a MISSING file, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture()
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
            expect(fx.store.get().enabled).toEqual(FIRST_RUN_DEFAULT.enabled)
          },
        },
        {
          label: 'BOOT FAIL-STATE 2 · a CORRUPT file, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.rawSeed('{ not json at all')
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
          },
        },
        {
          label: 'BOOT FAIL-STATE 3 · a path that IS A DIRECTORY, ingested while OPEN ⇒ the first-run default, never a throw',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.makeDirAtPath()
            setTier4Open(true)
            expect(fx.store.get().token).toBe(FIRST_RUN_DEFAULT.token)
          },
        },
      ],
    },

    /* ── ROW 8 · P-T4-TP-4 · S-T4-OPEN-1 · 16 = 4 × 2 + 8 ──────────────── */
    {
      id: 'P-T4-TP-4', type: 'P-TP', strategyId: 'S-T4-OPEN-1', term: 16,
      property: 'THE OPENED SHAPE IS TOTAL AND LOSSLESS AT BOOT, AND ADMISSION-CONTROLLED ON WRITE — the name-addressed surface answers for every name in its domain and refuses out-of-domain names as values; a top-level member outside the four declared names is INGESTED VERBATIM (never dropped) and survives every subsequent write; NO per-entry admission runs at boot; every WRITE runs the landed value-preservation admission, refusing the whole request with no filesystem call',
      drives: [
        {
          label: 'SURFACE ARM 1 · the name-addressed READ · CLOSED ⇒ the PRE-CALL value',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, entries: { a: 1 } }); setTier4Open(false)
            expect(readEntryOf(fx.store, 'a')).toEqual({ name: 'a', value: 1 })
          },
        },
        {
          label: 'SURFACE ARM 1 · the name-addressed READ · OPEN ⇒ the live value, detached',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            writeEntryOf(fx.store, 'a', { deep: { n: [1, 2] } })
            const read = readEntryOf(fx.store, 'a') as { name: string; value: { deep: { n: number[] } } }
            expect(read).toEqual({ name: 'a', value: { deep: { n: [1, 2] } } })
            read.value.deep.n.push(3)
            expect((readEntryOf(fx.store, 'a') as { value: { deep: { n: number[] } } }).value.deep.n, 'detached at EVERY depth (§2.2 item 6)').toEqual([1, 2])
          },
        },
        {
          label: 'SURFACE ARM 2 · the name-addressed WRITE · CLOSED ⇒ the gate refusal',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(false); assertClosedRefusal(writeEntryOf(fx.store, 'a', 1), 'arm 2 closed') },
        },
        {
          label: 'SURFACE ARM 2 · the name-addressed WRITE · OPEN ⇒ committed and durable',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'a', 1)).toEqual({ status: 'committed' })
            expect(JSON.parse(String(await fx.bytes())).entries.a, 'the file carries the entry (reading (b))').toBe(1)
          },
        },
        {
          label: 'SURFACE ARM 3 · the boot treatment of unknown keys · CLOSED ⇒ a CLOSED store still cannot read them',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, thirdPartyBlob: { x: 1 } })
            setTier4Open(false)
            expect(readEntryOf(fx.store, 'thirdPartyBlob'), 'the refused read answers the PRE-CALL value — which here EXISTS').toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
          },
        },
        {
          label: 'SURFACE ARM 3 · the boot treatment of unknown keys · OPEN ⇒ INGESTED VERBATIM, never dropped (`M-3`)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, thirdPartyBlob: { x: 1 }, extra: 'keep' })
            setTier4Open(true)
            expect(readEntryOf(fx.store, 'thirdPartyBlob')).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
            expect(readEntryOf(fx.store, 'extra')).toEqual({ name: 'extra', value: 'keep' })
          },
        },
        {
          label: 'SURFACE ARM 4 · the persisted format\'s evolution · CLOSED ⇒ the file is untouched by a refused write',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED)
            const before = await fx.bytes()
            setTier4Open(false)
            writeEntryOf(fx.store, 'a', 1)
            expect(await fx.bytes()).toBe(before)
            expect(JSON.parse(String(before)).entries, '`entries` is ABSENT until the first successful write (§2.2 item 2(i))').toBeUndefined()
          },
        },
        {
          label: 'SURFACE ARM 4 · the persisted format\'s evolution · OPEN ⇒ `{token, enabled, maxJournalLength, entries}` and NO `schemaVersion`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            writeEntryOf(fx.store, 'a', 1)
            const persisted = JSON.parse(String(await fx.bytes())) as Record<string, unknown>
            expect(Object.keys(persisted).sort()).toEqual(['enabled', 'entries', 'maxJournalLength', 'token'])
            expect(persisted.schemaVersion, 'NO `schemaVersion` member (§2.2 item 2(iv))').toBeUndefined()
          },
        },
        {
          label: 'VALUE CLASS 1 refused: `BigInt`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', 1n)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 2 refused: `Symbol`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', Symbol('s'))).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 3 refused: a function',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', () => 1)).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 4 refused: `Map`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Map())).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 5 refused: `Set`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Set([1]))).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 6 refused: `Date`',
          run: async () => { const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true); expect(writeEntryOf(fx.store, 'v', new Date())).toEqual({ status: 'refused', reason: 'write-failed' }) },
        },
        {
          label: 'VALUE CLASS 7 refused: a CYCLIC value (and a JSON round trip is NOT the check)',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            const cyclic: Record<string, unknown> = {}
            cyclic.self = cyclic
            expect(writeEntryOf(fx.store, 'v', cyclic)).toEqual({ status: 'refused', reason: 'write-failed' })
            expect(() => JSON.stringify(cyclic), 'CONTROL: the round trip THROWS on this fixture (`A1` answer (2) — it must not be the implementation)').toThrow()
          },
        },
        {
          label: 'VALUE CLASS 8 refused: `Infinity` / `NaN`',
          run: async () => {
            const fx = await makeStoreFixture(); await fx.seed(SEEDED); setTier4Open(true)
            expect(writeEntryOf(fx.store, 'v', Number.POSITIVE_INFINITY)).toEqual({ status: 'refused', reason: 'write-failed' })
            expect(writeEntryOf(fx.store, 'v', Number.NaN)).toEqual({ status: 'refused', reason: 'write-failed' })
          },
        },
      ],
    },

    /* ── ROW 9 · P-T4-IM-4 · S-T4-HOME-1 · 8 ───────────────────────────── */
    {
      id: 'P-T4-IM-4', type: 'P-IM', strategyId: 'S-T4-HOME-1', term: 8,
      property: 'THE TOKEN\'S HOME AND EVERY UNMOVED SET ARE HELD — `tier4-closed` is a CHANNEL token declared beside `EXCLUSION_CLOSED`; it is NOT a constant in `store-channels.ts`, NOT in `src/shared/**`, NOT a member of the store\'s closed 16-member union; no `GraphNodeFlag` widening, no frozen-byte move, no fourth tier-4/file distinction',
      drives: [
        {
          label: 'the token\'s home ✓ `src/main/mcp-server.ts` (beside `EXCLUSION_CLOSED`)',
          run: () => { expect(sourceOrEmpty(MCP_SERVER_SRC), 'the constant lands beside the landed pair (`§2.4` item 1)').toContain("'tier4-closed'") },
        },
        {
          label: 'the token\'s home ✗ `store-channels.ts` (its constant census stays 3)',
          run: () => {
            const src = sourceOrEmpty(STORE_CHANNELS_SRC)
            expect(src).not.toContain(TIER4_CLOSED)
            const constants = [...src.matchAll(/^export const [A-Z_0-9]+/gm)].length
            expect(constants, `the constants census is 3: [${[...src.matchAll(/^export const ([A-Z_0-9]+)/gm)].map((m) => m[1]).join(', ')}]`).toBe(3)
          },
        },
        {
          label: 'the token\'s home ✗ `src/shared/**` (`src/shared/types.ts` stays byte-identical)',
          run: () => {
            expect(sourceOrEmpty(SHARED_TYPES_SRC)).not.toContain(TIER4_CLOSED)
            expect(sha256Of(SHARED_TYPES_SRC), 'the shared type is UNMOVED (`§1.3` item 5)').toBe('29af4efaf16a5cadf1ac22b63afda063495ce63ec95b56f1f6e397da1d8189c6')
          },
        },
        {
          label: 'the store\'s refusal union reads 16 members (no security token added)',
          run: () => {
            const src = sourceOrEmpty(STORE_CORE_SRC)
            const union = /export type GraphRefusalReason\s*=([\s\S]*?)\n\n/.exec(src)?.[1] ?? ''
            const members = [...union.matchAll(/'([^']+)'/g)].map((m) => m[1])
            expect(members.length, `the union is 16: [${members.join(', ')}]`).toBe(16)
            expect(members).not.toContain(TIER4_CLOSED)
            expect(members).not.toContain(EXCLUSION_CLOSED)
          },
        },
        {
          label: 'the two frozen field-7 pins are UNMOVED (`0664c52f…` / `5c0c1a97…`)',
          run: () => {
            for (const [rel, pin] of Object.entries(MEASURED_FROZEN_PINS)) {
              expect(sha256Of(join(REPO_ROOT, rel)), `the frozen pin of ${rel} is UNMOVED (§2.7 item 1)`).toContain(pin.slice(0, 8))
            }
          },
        },
        {
          label: '`GraphNodeFlag`\'s three-member domain is UNMOVED (no widening)',
          run: () => {
            const src = sourceOrEmpty(STORE_CORE_SRC)
            const domain = /export type GraphNodeFlag\s*=\s*([^\n]+)/.exec(src)?.[1] ?? ''
            expect(domain.replace(/\s/g, '')).toBe("'temp'|'mem'|'file'")
          },
        },
        {
          label: 'the constants census (3) and the measured `store-channels.ts` bytes are UNMOVED',
          run: () => {
            expect(sha256Of(STORE_CHANNELS_SRC), 'no new channel constant (`§2.4` item 2)').toBe('1444834a9c55589f57dab719a44bc01836329c7c94c2c5ed7ffd798ba5724f8d')
          },
        },
        {
          label: 'the preload\'s `security` member set is unchanged in COUNT (3) — the widening is a TYPE intersection, not a member add',
          run: () => {
            const src = sourceOrEmpty(PRELOAD_SRC)
            const interfaceBlock = /export interface ProvidentBridge[\s\S]*?\n\}\n/.exec(src)?.[0] ?? ''
            const block = /\n  security:\s*\{([\s\S]*?)\n  \}/.exec(interfaceBlock)?.[1] ?? ''
            const members = [...block.matchAll(/^\s{4}(\w+)\(/gm)].map((m) => m[1])
            expect(members, `the preload security members: [${members.join(', ')}]`).toEqual(['get', 'set', 'setExclusion'])
          },
        },
      ],
    },

    /* ── ROW 10 · P-T4-IM-5 · S-T4-CARRIER-1 · 8 = 4 + 4 ───────────────── */
    {
      id: 'P-T4-IM-5', type: 'P-IM', strategyId: 'S-T4-CARRIER-1', term: 8,
      property: 'THE CARRIER\'S HONESTY — on EVERY read, `read` is present (`null` iff the read was performed, the closed refusal otherwise) and `exclusion` carries the STATE token, never the message, never a tier-4 value; the widening is an INTERSECTION at the two declaration sites in lockstep, and `SecuritySettings` itself is unmoved',
      drives: [
        {
          label: 'the carrier\'s two members · OPEN ⇒ `exclusion` = the state token, `read` = `null`',
          run: () => {
            const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
            expect(census).toContain('exclusion')
            expect(census).toContain('read')
            const carrier = carrierRecord(STATE_MCP_DISABLED, null)
            expect(carrier.exclusion).toBe(STATE_MCP_DISABLED)
            expect(carrier.read).toBeNull()
          },
        },
        {
          label: 'the carrier\'s two members · CLOSED ⇒ `read` = the closed refusal (drive RE-GRAINED at `KB-3`)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a): the as-filed drive
             * asserted an UNSATISFIABLE instrument). The as-filed form read
             * `expect(handler, …).toBeGreaterThan(0)` where `handler = getHandlerBody(MAIN_SRC)` is a
             * `string`, so vitest answered "actual value must be number or bigint, received string"
             * for EVERY possible implementation — unconditionally unsatisfiable. THE AMENDED DRIVE
             * keeps the SAME bite on the handler's own bytes (`handler.length`) and adds the amended
             * clause's own term: the `read` member derives from the SAME ONE READING of the STATIC
             * HOLDER as `exclusion`. */
            expect(handler.length, 'the refusal rides the CHANNEL (`§2.4` item 7)').toBeGreaterThan(0)
            expect(/read\s*:/.test(handler), 'the `read` member is composed in the handler').toBe(true)
            expect(/tier4OpenState\(\)/.test(handler), 'and BOTH members derive from ONE reading of the STATIC HOLDER (`§0A` item 1, amended)').toBe(true)
          },
        },
        {
          label: 'the carrier\'s two members · the STATE member is never absent (`PAR-9`)',
          run: () => { expect(/exclusion\s*:\s*tier4OpenState\(\)\s*\?/.test(getHandlerBody(sourceOrEmpty(MAIN_SRC))), 'the state member is fed by the ONE STATIC HOLDER reading and never routes through the store read (`§0A` item 1, amended)').toBe(true) },
        },
        {
          label: 'the carrier\'s two members · neither is substituted for the other (§3.4)',
          run: () => {
            const handler = getHandlerBody(sourceOrEmpty(MAIN_SRC))
            const stateFedByRefusal = /exclusion\s*:\s*(?:[^,{}]*\W)?read\b/.test(handler)
            const refusalFedByState = /read\s*:\s*exclusion\b/.test(handler)
            expect(stateFedByRefusal, 'CONTROL: the substitution detector FIRES on a state fed by the refusal member').toBe(true)
            expect(refusalFedByState, 'the live handler substitutes neither member for the other').toBe(false)
          },
        },
        {
          label: 'OUTSIDE cell: the MESSAGE substituted for `exclusion` ⇒ FAILS (`PAR-9`)',
          run: () => { expect(/exclusion\s*:\s*TIER4_CLOSED_MESSAGE/.test('exclusion: TIER4_CLOSED_MESSAGE'), 'CONTROL: the detector FIRES').toBe(true) },
        },
        {
          label: 'OUTSIDE cell: `read` ABSENT on a read ⇒ FAILS (`PAR-8`)',
          run: () => {
            const members = carrierMemberCensus('() => ({ ...securityStore.get(), exclusion: mcp.gate.exclusionState() })')
            expect(members.includes('read'), 'CONTROL: the census detector FIRES on the absent member').toBe(false)
          },
        },
        {
          label: 'OUTSIDE cell: a HALF-WIDENED declaration site ⇒ FAILS (`PAR-10` — the two sites move together)',
          run: () => {
            const preload = sourceOrEmpty(PRELOAD_SRC)
            const panels = sourceOrEmpty(SECURE_PANELS_SRC)
            expect(/read\s*:\s*Tier4ClosedRefusal\s*\|\s*null/.test(preload), 'site 1 (`preload.ts`) carries the widened `read` member').toBe(true)
            expect(/read\s*:\s*Tier4ClosedRefusal\s*\|\s*null/.test(panels), 'site 2 (`secure-panels.ts`\'s `declare global`) carries it in LOCKSTEP').toBe(true)
            const halfWidened = 'get(): Promise<SecuritySettings & { exclusion: EXCLUSION_STATE }>'
            expect(/read\s*:/.test(halfWidened), 'CONTROL: the half-widening detector FIRES on the unwidened site').toBe(false)
          },
        },
        {
          label: 'OUTSIDE cell: `SecuritySettings` ITSELF widened ⇒ DENIED (a COLLISION finding)',
          run: () => {
            const shared = sourceOrEmpty(SHARED_TYPES_SRC)
            const iface = /export interface SecuritySettings\s*\{[\s\S]*?\n\}/.exec(shared)?.[0] ?? ''
            expect(iface.length).toBeGreaterThan(0)
            expect(/read\s*:|entries\s*:|write\s*:/.test(iface), 'the shared type gains NO carrier member (§1.3 item 5)').toBe(false)
          },
        },
      ],
    },
  ]
  return rows
}

/** The repo root as a PLAIN PATH (`REPO` from the register module is a URL; `join`
 *  needs a path). */
const REPO_ROOT = fileURLToPath(new URL('./../', import.meta.url))

/* ═══════════════════════════ THE SUITE ═════════════════════════════════════ */
let registerRows: RegisterRow[] = []
let execReport: Awaited<ReturnType<typeof executeRegister>> | null = null

beforeAll(async () => {
  installShim()
  baseDir = await mkdtemp(join(tmpdir(), 's2-tier4-red-'))
  storeModule = await loadStoreModule()
  await loadTier4StateModule()
  registerRows = buildRegister()
})
afterAll(async () => {
  if (baseDir !== '') await rm(baseDir, { recursive: true, force: true })
})
beforeEach(() => { setTier4Open(true) })

describe('S2 §2.1 THE STORE\'S DECLARED SURFACE (census, options, member order)', () => {
  it('P-T4-CENSUS: `Object.keys(store)` is EXACTLY the declared FIVE, in the declared order', async () => {
    const fx = await makeStoreFixture()
    const keys = Object.keys(fx.store)
    expect(keys, `5 = 3 (landed: get · lastWriteReceipt · set) + 2 (new: readEntry · writeEntry) — measured [${keys.join(', ')}]`).toEqual([...DECLARED_SURFACE_MEMBERS])
    expect(keys.length).toBe(LANDED_SURFACE_MEMBERS.length + 2)
  })

  it('P-T4-OPTIONS RE-GRAINED (`kick-back resolution`, outcome (a)): the option census is UNMOVED at `1 = 1 (path)` — the `1 → 2` movement is WITHDRAWN', async () => {
    /* ── RE-GRAINED `2026-10-11`. The as-filed row asserted the SUPERSEDED `1 → 2` clause
     * (`§2.1` item 2 / `§1.2` item 9 / `§5.1` item 4 / `§7b` row 3). THE AMENDED CLAUSE (`§0A`
     * item 1, the `A-1` ruling), quoted VERBATIM: "**`SecurityStoreOptions` IS UNMOVED AT
     * `{ path: string }`, AND THE TWO CLAUSES THAT MOVED IT ARE WITHDRAWN.** The as-filed
     * **`1 → 2` option-census clause** … and the **injected-thunk shape** … are **SUPERSEDED IN
     * EFFECT**: the operative census is **`1 = 1 (path)`**, UNMOVED and owed by no amendment." */
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    const iface = /export interface SecurityStoreOptions\s*\{[\s\S]*?\n\}/.exec(src)?.[0] ?? ''
    expect(iface, 'the options interface exists').not.toBe('')
    const declared = [...iface.matchAll(/^\s*(\w+)\??\s*:/gm)].map((m) => m[1])
    expect(declared, `the option census is UNMOVED at 1 = 1 (path) — measured [${declared.join(', ')}]`).toHaveLength(DECLARED_OPTION_CENSUS)
    expect(declared.length, 'the census is UNMOVED (`1 = 1 (path)`)').toBe(LANDED_OPTION_CENSUS)
    expect(declared).toEqual(['path'])
    expect(declared, 'the `A-1` reader is NOT an option — it is the STATIC HOLDER (`§0A` item 1, amended)').not.toContain('tier4Open')
    /* ── RE-GRAINED `2026-10-11` (`kick-back resolution`, outcome (a)): the AS-FILED term
     * here was `/tier4Open/.test(src) === false` — *"and the withdrawn option leaves no
     * trace in the module's own bytes"* — and it CONTRADICTED the clause it rode with.
     * `§0A` item 1 / `§2.1` item 2's amendment REQUIRE `security-store.ts` to consult the
     * holder THROUGH the leaf's declared reader **`tier4OpenState()`**, whose identifier
     * CONTAINS the withdrawn option's token as a substring: no module that names the
     * reader can be token-free, so the two clauses could not both hold and the only
     * token-free bytes would need an UNDECLARED seam (a fragment-assembled key lookup, or
     * an alias invented in `mcp-server.ts` — both outside `§5.1` item 1's edit set).
     * THE RE-GRAINED TERM PINS WHAT THE CLAUSE ACTUALLY PINS — the OPTION CENSUS
     * (`1 = 1 (path)`: no injected option member) — and REQUIRES the reader's name
     * beneath it, so the bite survives: re-adding `tier4Open?: () => boolean` to the
     * interface reddens BOTH the census terms above and the member term here. */
    const optionMemberShaped = /(?:^|[\s{,(])tier4Open\s*\??\s*:/m
    expect(optionMemberShaped.test('  tier4Open?: () => boolean'), 'CONTROL — the option-member detector FIRES on the withdrawn declaration').toBe(true)
    expect(optionMemberShaped.test('  tier4OpenState(): boolean'), 'CONTROL (negative) — and it does NOT fire on the REQUIRED reader\'s own name, which is the substring that made the as-filed term unsatisfiable').toBe(false)
    expect(optionMemberShaped.test(src), 'the withdrawn OPTION MEMBER (`tier4Open: …`) is declared NOWHERE in the module — the census is `1 = 1 (path)`').toBe(false)
    expect(/tier4OpenState\(\)/.test(src), 'AND the store reads the ONE boolean through the leaf\'s DECLARED READER (`tier4OpenState()`, `§0A` item 1) — the token the withdrawn option shares is REQUIRED here, never banished').toBe(true)
  })

  it('P-T4-EXPORTS: the module\'s export census moves by NOTHING (the four landed names survive)', async () => {
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    for (const name of ['createSecurityStore', 'SecurityStoreOptions', 'SecurityStore', 'SecurityWriteReceipt']) {
      expect(src, `the landed export ${name} is not renamed or removed (§2.1 item 1)`).toMatch(new RegExp(`export (function|interface|type) ${name}\\b`))
    }
  })

  it('P-T4-TYPES: the two NEW declared types land and `SecurityWriteReceipt` stays byte-identical in shape', async () => {
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    expect(/export type Tier4Entry\s*=/.test(src), '`Tier4Entry = { name: string; value: unknown }` (§2.1 item 3)').toBe(true)
    expect(/export type Tier4WriteAnswer\s*=/.test(src), '`Tier4WriteAnswer` is the declared SUPERSET (§2.1 item 3)').toBe(true)
    expect(/export type SecurityWriteReceipt\s*=\s*\{\s*status:\s*'committed'\s*\}\s*\|\s*\{\s*status:\s*'refused';\s*reason:\s*'write-failed'\s*\}/.test(src.replace(/\s+/g, ' ')), '`SecurityWriteReceipt` ITSELF is NOT widened (§2.4 item 3)').toBe(true)
  })

  it('P-T4-TOKEN-HOME: `TIER4_CLOSED` and its message are declared in `mcp-server.ts`, exported', async () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    expect(/export const TIER4_CLOSED\s*=\s*'tier4-closed'/.test(src), 'the token, beside `EXCLUSION_CLOSED` (§2.4 item 1)').toBe(true)
    expect(/export const TIER4_CLOSED_MESSAGE\s*=/.test(src), 'its server-authored message, beside `EXCLUSION_CLOSED_MESSAGE`').toBe(true)
  })
})

describe('S2 §3.1 THE HAPPY STATES (M-1…M-11)', () => {
  it('M-1 the boot: the first-run default, `entries` empty and ABSENT from the file', async () => {
    const fx = await makeStoreFixture()
    expect(fx.store.get().token).toBeNull()
    expect(fx.store.get().enabled).toEqual(['read', 'dispatch'])
    expect(fx.store.get().maxJournalLength).toBeUndefined()
    expect(await fx.bytes(), 'the constructor writes NO file (`S3` §2.1 item 2)').toBeNull()
    expect(readEntryOf(fx.store, 'anything'), '`entries` is EMPTY').toBeNull()
  })

  it('M-2 the boot-ingestion read at the declared OPEN window succeeds without exception', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    let threw = false
    try { fx.store.get() } catch { threw = true }
    expect(threw, '`G-2` binds and PASSES at boot (`§2.5 item 5 F-3`) — no carve-out is needed').toBe(false)
    expect(fx.store.get().token).toBe('SEED')
  })

  it('M-3 a legacy file\'s foreign top-level keys are INGESTED VERBATIM and survive the next successful write', async () => {
    const fx = await makeStoreFixture()
    await fx.seed({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, thirdPartyBlob: { x: 1 }, extra: 'keep' })
    setTier4Open(true)
    expect(readEntryOf(fx.store, 'thirdPartyBlob')).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
    expect(readEntryOf(fx.store, 'extra')).toEqual({ name: 'extra', value: 'keep' })
    expect(writeEntryOf(fx.store, 'mine', 1)).toEqual({ status: 'committed' })
    const persisted = JSON.parse(String(await fx.bytes())) as Record<string, unknown>
    const flat = JSON.stringify(persisted)
    expect(flat, 'the foreign key survives the re-serialization (`§2.2` item 4 arms 3/6)').toContain('thirdPartyBlob')
    expect(flat).toContain('keep')
  })

  it('M-4 the CLOSED state: a tier read answers the PRE-CALL value, detached; a never-written name answers null', async () => {
    const fx = await makeStoreFixture(); await fx.seed({ ...SEEDED, entries: { a: { deep: 1 } } })
    setTier4Open(false)
    const read = readEntryOf(fx.store, 'a') as { name: string; value: { deep: number } }
    expect(read).toEqual({ name: 'a', value: { deep: 1 } })
    read.value.deep = 99
    expect((readEntryOf(fx.store, 'a') as { value: { deep: number } }).value.deep, 'the PRE-CALL value is DETACHED').toBe(1)
    expect(readEntryOf(fx.store, 'never-written')).toBeNull()
    expect(readEntryOf(fx.store, 'never-written'), '`null` never means "refused" (`PAR-5`)').not.toEqual({ status: 'refused' })
  })

  it('M-5 the CLOSED state: a write answers the VALUE, `set()` the PRE-WRITE record, the receipt the refusal', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const returned = fx.store.set({ token: 'NOPE' })
    expect(returned, '`set()` answers the PRE-WRITE record (§2.1 item 3)').toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
    assertClosedRefusal(receiptOf(fx.store), 'M-5 receipt')
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 1), 'M-5 writeEntry')
    expect(await fx.bytes(), 'no filesystem call, no record advance').toContain('SEED')
  })

  it('M-6 THE NON-VACUITY TERM: the OPEN state\'s write commits and lands', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const before = await fx.bytes()
    fx.store.set({ token: 'LANDED' })
    expect(receiptOf(fx.store)).toEqual({ status: 'committed' })
    const after = await fx.bytes()
    expect(after).not.toBe(before)
    expect(after).toContain('LANDED')
  })

  it('M-7 the OPEN state: an admitted `writeEntry` commits; the entry is live AND durable; the read is detached', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'alpha', { n: 1 })).toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'alpha')).toEqual({ name: 'alpha', value: { n: 1 } })
    expect(JSON.parse(String(await fx.bytes())).entries.alpha).toEqual({ n: 1 })
  })

  it('M-8 the OPEN state: a name written twice answers the LAST admitted value, live == durable', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    writeEntryOf(fx.store, 'k', 1)
    writeEntryOf(fx.store, 'k', 2)
    expect(readEntryOf(fx.store, 'k')).toEqual({ name: 'k', value: 2 })
    expect(JSON.parse(String(await fx.bytes())).entries.k).toBe(2)
  })

  it('M-9 the operator\'s carrier: OPEN ⇒ `read: null`; CLOSED ⇒ the refusal BESIDE the state word', () => {
    expect(carrierRecord(STATE_MCP_DISABLED, null)).toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120, exclusion: STATE_MCP_DISABLED, read: null })
    expect(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }).exclusion).toBe(STATE_MCP_ENABLED)
    const census = carrierMemberCensus(sourceOrEmpty(MAIN_SRC))
    expect(census, `the GET record gains ONE additive member (2 = 1 exclusion + 1 read) — measured [${census.join(', ')}]`).toContain('read')
    expect(DECLARED_CARRIER_MEMBERS.length).toBe(LANDED_CARRIER_MEMBERS.length + 1)
  })

  it('M-10 the RETURN transition then a write: REFUSED (the measured SC-D-07 shape closes)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    let gate = new SecurityGate({ token: null, enabled: ['read', 'dispatch'] })
    setTier4Open(false) // the MCP is enabled ⇒ the store is closed
    const closedWrite = writeEntryOf(fx.store, 'ret', 1)
    assertClosedRefusal(closedWrite, 'M-10 · closed')
    gate = gate.withExclusion(STATE_MCP_DISABLED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'ret', 1), 'the operator returns ⇒ the write commits').toEqual({ status: 'committed' })
    setTier4Open(false)
    expect(writeEntryOf(fx.store, 'ret', 2), 'and the return to MCP-enabled closes it again').toEqual({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
    expect(gate.exclusionState()).toBe(STATE_MCP_DISABLED)
  })

  it('M-11 a self-transition and an outside-value payload are a no-op / refused as a value', () => {
    const gate = new SecurityGate({ token: null, enabled: [] })
    const self = gate.withExclusion(STATE_MCP_ENABLED)
    expect(self.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect((self as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.(), 'T-3: the epoch does not bump').toBe((gate as unknown as { exclusionEpoch?: () => number }).exclusionEpoch?.())
    const outside = gate.withExclusion('mcp-ENABLED' as never)
    expect(outside.exclusionState()).toBe(STATE_MCP_ENABLED)
    expect(JSON.stringify(outside.exclusion), 'the boolean does not move').toBe(JSON.stringify({ mcpEnabled: true, tier4Open: false }))
  })
})

describe('S2 §3.2 THE FAIL-STATES (FS-T4-01…FS-T4-13)', () => {
  it('FS-T4-01 a write while CLOSED: the refusal VALUE; no commit, no persist, no advance, NO filesystem call', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const before = await fx.bytes()
    const mtimeBefore = await fx.mtime()
    const callsBefore = fx.calls().length
    assertClosedRefusal(receiptOf(fx.store) === null ? writeEntryOf(fx.store, 'a', 1) : writeEntryOf(fx.store, 'a', 1), 'FS-T4-01')
    expect(fx.calls().length, `the refusal touched NO file: [${fx.calls().slice(callsBefore).join(', ')}]`).toBe(callsBefore)
    expect(await fx.bytes()).toBe(before)
    expect(await fx.mtime()).toBe(mtimeBefore)
    // CTL-4 — the same detector MUST move on a COMMITTED write (non-vacuity):
    setTier4Open(true)
    const callsBeforeCommit = fx.calls().length
    fx.store.set({ token: 'MOVED' })
    expect(fx.calls().length, 'CONTROL: the filesystem-call detector FIRES on a committed write').toBeGreaterThan(callsBeforeCommit)
  })

  it('FS-T4-02 a read while CLOSED: the PRE-CALL value, detached; the refusal is NOT in the value', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(false)
    const read = fx.store.get()
    expect(read).toEqual({ token: 'SEED', enabled: ['read', 'dispatch'], maxJournalLength: 120 })
    expect(JSON.stringify(read)).not.toContain('refused')
    expect(JSON.stringify(read)).not.toContain(TIER4_CLOSED)
  })

  it('FS-T4-03 `writeEntry` with a non-representable value: the landed refused form, no filesystem call', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    for (const [label, bad] of [['BigInt', 1n], ['Symbol', Symbol('s')], ['function', () => 1], ['Map', new Map()], ['Set', new Set()], ['Date', new Date()], ['Infinity', Infinity], ['NaN', NaN], ['undefined', undefined]] as Array<[string, unknown]>) {
      const callsBefore = fx.calls().length
      expect(writeEntryOf(fx.store, 'bad', bad), `${label} REFUSES the whole request (§2.2 item 5)`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(fx.calls().length, `${label}: no filesystem call`).toBe(callsBefore)
      expect(readEntryOf(fx.store, 'bad'), `${label}: NOTHING moves, and undefined is NEVER a delete (§2.2 item 5)`).toBeNull()
    }
  })

  it('FS-T4-04 a name OUTSIDE `PAR-3`\'s domain: a write refuses in the landed form, a read answers null, neither throws', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const names: Array<[string, unknown]> = [['non-string', 12], ['empty string', ''], ['over-long', 'x'.repeat(513)], ['control char', 'a\u0000b'], ['DEL', 'a\u007fb']]
    for (const [label, name] of names) {
      expect(readEntryOf(fx.store, name), `${label}: a READ answers null (§6 PAR-3)`).toBeNull()
      expect(writeEntryOf(fx.store, name, 1), `${label}: a WRITE answers the landed refused form`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(readEntryOf(fx.store, name), `${label}: nothing was written`).toBeNull()
    }
    expect(() => writeEntryOf(fx.store, Symbol('s'), 1), 'neither throws').not.toThrow()
    expect(readEntryOf(fx.store, 'x'.repeat(512)), 'the boundary itself is IN the domain').toBeNull()
  })

  it('FS-T4-05 a patch OUTSIDE `set()`\'s declared domain: the landed refused form, never a throw', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    const patches: Array<[string, unknown]> = [['null', null], ['array', [1, 2]], ['number', 7], ['Date (non-plain)', new Date()], ['hostile proxy', new Proxy({}, { get: () => { throw new Error('hostile') } })]]
    for (const [label, patch] of patches) {
      expect(() => fx.store.set(patch), `${label}: never a throw (§2.3 item 1)`).not.toThrow()
      expect(receiptOf(fx.store), `${label}: the landed refused form`).toEqual({ status: 'refused', reason: 'write-failed' })
    }
  })

  it('FS-T4-06 a `persist()` failure: refused; the record stays PRE-WRITE; the live map advances nothing', async () => {
    for (const [label, arm] of [['tmp write', (l: FsLog) => { l.writeFileAt = 1 }], ['tmp fsync', (l: FsLog) => { l.fsyncAt = 1 }], ['rename', (l: FsLog) => { l.renameFail = true }]] as Array<[string, (l: FsLog) => void]>) {
      const fx = await makeStoreFixture(); await fx.seed(SEEDED)
      setTier4Open(true)
      arm(fx.log)
      const before = await fx.bytes()
      expect(writeEntryOf(fx.store, 'k', 1), `${label} failure ⇒ the landed refusal`).toEqual({ status: 'refused', reason: 'write-failed' })
      expect(fx.store.get().token, `${label}: the record stayed PRE-WRITE`).toBe('SEED')
      expect(readEntryOf(fx.store, 'k'), `${label}: the live map advanced NOTHING`).toBeNull()
      expect(await fx.bytes(), `${label}: the previous file's bytes stand at the real path`).toBe(before)
    }
  })

  it('FS-T4-07 a post-rename directory-`fsync` failure is NOT a refusal (the write stays committed)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    setTier4Open(true)
    fx.log.fsyncAt = 2 // call 2 = the parent-directory fsync AFTER the rename (the commit point has passed)
    expect(writeEntryOf(fx.store, 'k', 1), 'the successful rename answers `committed` regardless of the directory fsync (§2.1 item 6)').toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'k'), 'nothing rolls back').toEqual({ name: 'k', value: 1 })
    expect(String(await fx.bytes())).toContain('"k"')
  })

  it('FS-T4-08 a malformed `entries` member at boot is treated as ABSENT (the ONE declared non-verbatim arm)', async () => {
    for (const [label, malformed] of [['array', [1, 2]], ['string', 'nope'], ['number', 7], ['null', null], ['boolean', true]] as Array<[string, unknown]>) {
      const fx = await makeStoreFixture()
      await fx.seed({ ...SEEDED, entries: malformed, thirdPartyBlob: { x: 1 } })
      setTier4Open(true)
      expect(readEntryOf(fx.store, 'anything'), `${label}: the map reads EMPTY (§2.2 item 4 arm 5)`).toBeNull()
      expect(readEntryOf(fx.store, 'thirdPartyBlob'), `${label}: the top-level arm still ingests VERBATIM (the residue is BOUNDED)`).toEqual({ name: 'thirdPartyBlob', value: { x: 1 } })
    }
  })

  it('FS-T4-09 WITHDRAWN / RE-GRAINED (`kick-back resolution`, outcome (a)): the store reads the STATIC HOLDER, its declared initial value is STORE-OPEN, and NO absent arm, fail-safe default or sibling-site wave exists', async () => {
    /* ── RE-GRAINED `2026-10-11`. The as-filed row asserted the now-SUPERSEDED `§3.2` `FS-T4-09`
     * (`"tier4Open absent from the options ⇒ FAIL-SAFE: the tier answers CLOSED"`), which drove the
     * fixture with `{ absentReader: true }`. THE AMENDED CLAUSE (`§0A` item 1, the `A-1` ruling;
     * `§2.1` item 2's amendment), quoted: "**THERE IS NO `READER OMITTED` STATE AND NO FAIL-SAFE
     * DEFAULT**: the holder always exists and its **declared initial value is `STORE-OPEN`**, so a
     * bare `createSecurityStore({ path })` reads it and behaves exactly as before". So the row now
     * asserts (i) the option census is `{ path }` — hence no absent arm can exist; (ii) the store
     * reads THE HOLDER: a bare store admits a write while the holder says OPEN and refuses it with
     * the closed token once the holder says CLOSED — same instance, no re-construction; (iii) the
     * holder's declared initial is STORE-OPEN, so the bare construction behaves exactly as before. */
    const src = sourceOrEmpty(SECURITY_STORE_SRC)
    const iface = /export interface SecurityStoreOptions\s*\{[\s\S]*?\n\}/.exec(src)?.[0] ?? ''
    const declared = [...iface.matchAll(/^\s*(\w+)\??\s*:/gm)].map((m) => m[1])
    expect(declared, `there is NO reader option to omit — measured [${declared.join(', ')}]`).toEqual(['path'])
    expect(/tier4Open/.test(iface), 'the withdrawn option is NOT declared (no absent arm exists)').toBe(false)
    expect(tier4StateModule, `the STATIC HOLDER must exist — ${tier4StateReason}`).not.toBeNull()
    const fx = await makeStoreFixture()
    await fx.seed(SEEDED)
    setTier4Open(true)
    expect(writeEntryOf(fx.store, 'a', 1), 'a BARE `createSecurityStore({ path })` reads the holder: OPEN ⇒ the write commits and lands').toEqual({ status: 'committed' })
    expect(readEntryOf(fx.store, 'a'), 'and the read answers the live value').toEqual({ name: 'a', value: 1 })
    setTier4Open(false)
    assertClosedRefusal(writeEntryOf(fx.store, 'a', 2), 'the SAME instance, the holder now CLOSED ⇒ the closed refusal VALUE (`G-1`)')
    expect(readEntryOf(fx.store, 'a'), 'the refused read answers the PRE-CALL value, detached — no throw').toEqual({ name: 'a', value: 1 })
    expect(() => fx.store.get()).not.toThrow()
    expect(() => receiptOf(fx.store)).not.toThrow()
    expect(/^\s*(?:let|var)\s+\w+\s*=\s*true\s*;?\s*$/m.test(sourceOrEmpty(TIER4_STATE_SRC)), 'the holder\'s DECLARED INITIAL VALUE is STORE-OPEN (`true`), which is `D-19`\'s window — a bare store therefore behaves exactly as before').toBe(true)
  })

  it('FS-T4-10 a missing / corrupt / directory-shaped file at boot: the first-run default, never a throw', async () => {
    const missing = await makeStoreFixture()
    expect(missing.store.get().token).toBeNull()
    const corrupt = await makeStoreFixture(); await corrupt.rawSeed('{ broken json')
    expect(corrupt.store.get().token).toBeNull()
    const dirShaped = await makeStoreFixture(); await dirShaped.makeDirAtPath()
    expect(dirShaped.store.get().token).toBeNull()
  })

  it('FS-T4-11 a read landing inside the transition window answers ONE side of the pair, never a mixture (the RACE is NOT covered)', async () => {
    const fx = await makeStoreFixture(); await fx.seed(SEEDED)
    const flips = [true, false, true, false]
    for (const state of flips) {
      setTier4Open(state)
      const answer = JSON.stringify(writeEntryOf(fx.store, 'w', 1))
      const expected = state
        ? JSON.stringify({ status: 'committed' })
        : JSON.stringify({ status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
      expect(answer, 'one side of the pair, never a mixture (§3.3 item 3)').toBe(expected)
    }
    expect(sourceOrEmpty(SECURITY_STORE_SRC), 'the race itself is declared OUT (§7 item 5, `SC-D-08` MANUAL): no row here covers it').not.toContain('SC-D-08')
  })

  it('FS-T4-12 a second home or a second writer for the boolean is a FAILING row', () => {
    const src = sourceOrEmpty(MCP_SERVER_SRC)
    const assignments = [...src.matchAll(/^\s*(?!\/\/|\*)(?:let|var)\s+(\w*(?:exclusion|storeOpen|tier4Open)\w*)\s*=/gm)].map((m) => m[1])
    expect(assignments, `NO module-level mutable home for the boolean — measured [${assignments.join(', ')}]`).toEqual([])
    // THE ONE WRITER (`§2.5` item 2): `withExclusion` lives in `security.ts` and is called
    // from exactly ONE production site. The detector is COUNTABLE (a second writer means a
    // `withExclusion(` occurrence appearing in a module that today holds none), and it is
    // driven both ways so it cannot be vacuous.
    const writerSites = (source: string): number => (source.match(/withExclusion\s*\(/g) ?? []).length
    expect(writerSites('const gate = other.withExclusion(next)'), 'CONTROL: the detector FIRES on a foreign site').toBe(1)
    expect(writerSites(src), '`mcp-server.ts` holds ONE landed site — the transition the spec CITES as landed (`applyExclusion`)').toBe(1)
    expect(writerSites(sourceOrEmpty(MAIN_SRC)), '`main.ts` holds NO writer of its own (`F-11`: main supplies STATE, never takes the DECISION)').toBe(0)
    const securitySrc = sourceOrEmpty(join(REPO_ROOT, 'src/main/security.ts'))
    expect(writerSites(securitySrc), 'the ONE writer — the pure-constructor transition — lives in `security.ts`').toBe(1)
    // the STATE's one home (`§2.5` item 1): a direct `_exclusion` assignment anywhere outside
    // its own module is a SECOND writer, and the detector is driven both ways:
    const directAssignment = (source: string): boolean => /_exclusion\s*=[^=]/.test(source)
    expect(directAssignment('this._exclusion = next'), 'CONTROL: the detector FIRES on a direct assignment').toBe(true)
    expect(directAssignment(sourceOrEmpty(MCP_SERVER_SRC)), '`mcp-server.ts` never assigns the record directly (it replaces the GATE)').toBe(false)
  })

  it('FS-T4-13 the pane rendering a state the carrier did not supply is a FAILING row', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, null))
    const text = paneTextOf(panels, 'security-status')
    expect(text, 'the state word comes from the carrier, never from the pane\'s own prior value').toContain('· MCP: enabled')
    expect(text, 'CONTROL: the fabrication detector FIRES on the opposite rendering').not.toContain('· MCP: disabled')
    expect(text, '`read: null` ⇒ no fabricated refusal segment (§2.6 item 4)').not.toContain(REFUSAL_SEGMENT)
  })
})

describe('S2 §2.6 THE PANE\'S TWO RE-SOURCED CELLS + THE ONE ADDITIVE SEGMENT', () => {
  it('the carrier is READ (the pane drives its cells from the response record, not from a store read)', async () => {
    const pane = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(pane.reads(), 'the pane read the carrier').toBeGreaterThan(0)
  })

  it('the `MCP:` segment and the toggle follow the carrier across a refresh (CTL-5: the probe can read a stale value)', async () => {
    const first = await mountPaneFor(carrierRecord(STATE_MCP_DISABLED, null))
    expect(paneTextOf(first.panels, 'security-status')).toContain('· MCP: disabled')
    expect(paneTextOf(first.panels, 'security-status'), 'CONTROL: the probe can distinguish the two renderings').not.toContain('· MCP: enabled')
    const next = carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE })
    ;(globalThis as unknown as { window?: unknown }).window = { provident: { security: { get: async () => ({ ...next }) } } }
    await first.panels.refresh()
    const text = paneTextOf(first.panels, 'security-status')
    expect(text).toContain('· MCP: enabled')
    expect(text, 'the additive trailing segment is present iff `read` is non-null (`PAR-11`)').toContain(REFUSAL_SEGMENT)
  })

  it('the segment carries a TOKEN, never a message body, never a tier-4 value or name (`§2.6` item 4)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const text = paneTextOf(panels, 'security-status')
    expect(text).toContain(REFUSAL_SEGMENT)
    expect(text, 'the message body is NOT rendered in place of the token').not.toContain(TIER4_CLOSED_MESSAGE)
    expect(text, 'no group set leaks into the segment').not.toContain('read, dispatch,')
  })

  it('no new node, class or geometry: the segment rides the landed line (`§2.6` item 5)', async () => {
    const { panels } = await mountPaneFor(carrierRecord(STATE_MCP_ENABLED, { status: 'refused', reason: TIER4_CLOSED, message: TIER4_CLOSED_MESSAGE }))
    const nodes = (panels as unknown as { supervisor: { allNodes(): unknown[] } }).supervisor.allNodes()
    const ids = nodes.map((n) => ((n as { props?: { id?: string } }).props?.id) ?? '')
    expect(ids, 'the authored node census is UNMOVED (D1–D8 stand)').toContain('security-status')
    expect(ids.filter((id) => id === 'security-status')).toHaveLength(1)
  })
})

describe('S2 §4.2 THE AUTHORING ORDER (the static/census rows REDDENED FIRST on the tree as it stood; this row is RE-GRAINED to the GREEN direction)', () => {
  it('the census row RE-GRAINED (`kick-back resolution`, outcome (a)): `Object.keys(store)` is the DECLARED FIVE and BOTH new members exist', async () => {
    /* ── RE-GRAINED `2026-10-11` (the Implementer's `§10` item 6 kick-back): the as-filed row was a
     * RED-STATE assertion (`"the landed census is 3 and the landed tree carries NO
     * \`readEntry\`/\`writeEntry\`"`) that contradicted `P-T4-CENSUS` (the declared FIVE) inside the
     * SAME file. The green-side form keeps the row's own bite — the census TERMS are printed, and
     * both members are asserted to be FUNCTIONS, not merely present keys. */
    const fx = await makeStoreFixture()
    const keys = Object.keys(fx.store)
    expect(keys, `5 = 3 (landed: get · lastWriteReceipt · set) + 2 (new: readEntry · writeEntry) — measured [${keys.join(', ')}]`).toEqual([...DECLARED_SURFACE_MEMBERS])
    expect(keys.length, 'the movement is exactly 3 → 5').toBe(LANDED_SURFACE_MEMBERS.length + 2)
    expect(typeof fx.store.readEntry, 'the name-addressed READ landed').toBe('function')
    expect(typeof fx.store.writeEntry, 'the name-addressed WRITE landed').toBe('function')
  })
})

describe('S2 §5.5.1 THE REGISTER (executed deterministically — 10 rows / 108 attempts)', () => {
  it('REGISTER-EXEC: every row executes its FULL declared term, in register order, and no row is un-run', async () => {
    execReport = await executeRegister(registerRows)
    expect(execReport.rows.length, '10 rows executed — an un-run row is a FAILURE, never a pass').toBe(10)
    expect(execReport.rows.map((r) => r.id)).toEqual([...REGISTER_ROW_IDS])
    expect(execReport.rows.map((r) => r.strategyId)).toEqual([...STRATEGY_IDS])
    expect(execReport.rows.every((r) => r.attemptsRun === r.declaredTerm), 'every row executed its full term').toBe(true)
    expect(execReport.unrunRows, `un-run rows: [${execReport.unrunRows.join(', ')}]`).toEqual([])
    expect(execReport.attemptsExecuted).toBe(108)
  })

  it('REGISTER-TERMS: the total is the SUM OF ITS OWN PRINTED TERMS, with the subtotals and the caps', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    const declared = declaredTotalReport()
    expect(declared.sum, `108 = ${DECLARED_TERMS.join(' + ')}`).toBe(108)
    expect(declared.sum).toBe(DECLARED_TERMS.reduce((a, b) => a + b, 0))
    expect(execReport.rows.map((r) => r.declaredTerm)).toEqual([...DECLARED_TERMS])
    expect(execReport.subtotals).toEqual({ im: 46, sm: 10, tp: 52 })
    expect(execReport.subtotals.im + execReport.subtotals.sm + execReport.subtotals.tp).toBe(108)
    expect(Math.max(...DECLARED_TERMS), `per row ≤ ${REGISTER_ROW_CAP}`).toBeLessThanOrEqual(REGISTER_ROW_CAP)
    expect(execReport.declaredTotal).toBeLessThanOrEqual(REGISTER_TOTAL_CAP)
    expect(BOUNDED_ROWS, 'no row takes a draw (`§5.5.2` item 3)').toEqual([])
    expect(STOP_AFTER_CONSECUTIVE).toBe(5)
  })

  it('REGISTER-REPORT: prints each row\'s strategy id + attempts + held/broken and the total WITH its terms', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    process.stdout.write('\n' + registerReportLines(execReport).join('\n') + '\n')
    const literal = await executeRegister(registerRows, { honourStopRule: true })
    process.stdout.write(`\nREGISTER-STOP-RULE (literal stop-after-5 reading): stoppedAtRow=${String(literal.stoppedAtRow)} · attemptsExecuted=${literal.attemptsExecuted} · un-run rows=[${literal.unrunRows.join(', ')}]\n`)
    expect(execReport.rows.every((r) => r.strategyId.length > 0 && r.declaredTerm > 0)).toBe(true)
  })

  it('REGISTER-CONTROL: the broken/un-run bounds are able to FAIL (CTL-1)', async () => {
    if (execReport === null) execReport = await executeRegister(registerRows)
    const brokenRun = await syntheticBrokenRegisterControlOnly()
    expect(brokenCountGuardOldForm(brokenRun), 'CONTROL: the pre-repair (vacuous) form PASSES a broken run').toBe(true)
    expect(brokenCountCheckOf(brokenRun).brokenOk, 'CONTROL: the new bound FAILS it').toBe(false)
    const unRun = syntheticUnRunRegisterControlOnly()
    expect(brokenCountCheckOf(unRun).unrunOk, 'CONTROL: the un-run bound FAILS an abandoned register').toBe(false)
    expect(brokenCountCheckOf(unRun).unrun).toBe(9)
    expect(brokenCountCheckOf(execReport).unrunOk, 'the register really ran every row').toBe(true)
  })

  it('REGISTER-GREEN (RE-GRAINED from `REGISTER-RED`; `kick-back resolution`, outcome (a)): the register\'s rows hold — `broken === 0` for every row, executed = declared, total printed WITH its terms', async () => {
    /* ── RE-GRAINED `2026-10-11` (the Implementer's `§10` item 6 kick-back): the as-filed row was a
     * RED-STATE assertion (`broken > 0` / `rowsWithoutBreak === []`), which `§9` item 3 itself had
     * already assigned to the green's inversion. The green-side form keeps the SAME instrument and
     * the SAME terms, and only flips the direction (`§4.3` item 3: re-grained BESIDE its as-filed
     * form, never silently rewritten). */
    if (execReport === null) execReport = await executeRegister(registerRows)
    const broken = execReport.rows.reduce((a, r) => a + r.broken, 0)
    const held = execReport.rows.reduce((a, r) => a + r.held, 0)
    const summary = execReport.rows.map((r) => `${r.id} ${r.held}/${r.attemptsRun}`).join(' · ')
    const rowsWithoutBreak = execReport.rows.filter((r) => r.broken === 0).map((r) => r.id)
    expect(held + broken, 'held + broken = the executed total').toBe(execReport.attemptsExecuted)
    expect(broken, `EVERY row holds at green (executed = declared) — per row: ${summary}`).toBe(0)
    expect(rowsWithoutBreak, `rows carrying NO broken attempt: [${rowsWithoutBreak.join(', ')}]`).toEqual([...REGISTER_ROW_IDS])
    expect(held, 'the held attempts are the DECLARED total, WITH its terms').toBe(108)
    expect(execReport.attemptsExecuted, `executed = declared = ${DECLARED_TERMS.join(' + ')}`).toBe(declaredTotalReport().sum)
    expect(execReport.unrunRows, 'and no row is un-run — an un-run row is a FAILURE, never a pass').toEqual([])
  })
})
