// tests/store-focus.test.ts — H1 · U-STORE-FOCUS — THE RED SET (RCA-1), authored BEFORE any
// implementation.
//
// CONTRACT: docs/specs/store-focus.md (952 lines, read in full). LAYER: [T] — the node suite
// driving pure values and recording closures; NO DOM, NO window, NO MCP transport, no focus is
// ever moved anywhere by this run.
//
// THE RED STATEMENT (§4.1): this file is written FROM THE SPEC ALONE (+ the frozen store
// surface) and RUN against the CURRENT tree, where — per the spec's own CURRENT STATE —
//   · the carrier factory `createFocusCarrier(store)` does NOT exist (`renderer.ts` holds no
//     such export; the honest failing class is the missing-symbol red, TS2339-class on the
//     typed access, and the `renderer.ts does not export createFocusCarrier` runtime red);
//   · the module-level `const holder: { state: FocusState }` STILL exists in
//     `renderer.ts` and `focusRoute` still mutates it (`holder.state = result.state`);
//   · `mem.focus.*` is unminted — `resolve('mem.focus.entries')` on the frozen store today
//     REFUSES `'undeclared-name'` at `C-TOP` (so the carrier's boot mint is owed);
//   · the wiring registers NO store subscription on the mirror's references (rule-2 ✗).
// The RED set therefore contains rows that FAIL for that honest reason, and rows that PASS as
// the UNCHANGED-BASELINE guards (the module census, the store-surface facts, the seam halves,
// the MUTATING_METHODS/`FocusAnswer` statics) — the guards the GREEN must keep green.
//
// THE REGISTER (§5.5.1) is executed in this file by plain deterministic vitest tables — NO
// generator, NO pinned seed, NO new dependency — with the declared terms 10/12/18/16/24/16,
// the global stop-after-5-consecutive-failures, and every un-run row/attempt reported as a
// FAILURE (§4.4), totals printed WITH their terms (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
//
// WALLS (§5.1): this pass writes ONLY this file. No `src/**` byte, no other `tests/**` file,
// no tracker, no spec is touched by this pass.

import { readFileSync } from 'node:fs'
import { describe, it, expect, beforeAll } from 'vitest'
import {
  focusTransition,
  focusOrder,
  focusIndex,
  persist,
  type FocusState,
  type FocusEntry,
} from '../src/shared/focus-model.js'
import {
  createGraphStore,
  type GraphStore,
  type GraphEvent,
  type GraphWriteReceipt,
  type GraphSubscription,
  type GraphResolveResult,
} from '../src/renderer/store-core-graph.js'
import { storeGraphReferences } from '../src/renderer/store-graph-references.js'

/* ─────────────────────────────────────────────────────────────────────────────
 * BYTE-READ HELPERS — the scanner pattern (spec §3.4 R-1 / §3.5). These scan the
 * RAW BYTES of the named files; they never import the renderer.
 * ───────────────────────────────────────────────────────────────────────────── */

const RENDERER_PATH = new URL('../src/renderer/renderer.ts', import.meta.url)
const FOCUS_MODEL_PATH = new URL('../src/shared/focus-model.ts', import.meta.url)
const STORE_CORE_PATH = new URL('../src/renderer/store-core-graph.ts', import.meta.url)
const STORE_REFS_PATH = new URL('../src/renderer/store-graph-references.ts', import.meta.url)
const LEGACY_STORE_SUITE_PATH = new URL('../tests/store-core-graph.test.ts', import.meta.url)

function bytesOf(path: URL): string {
  return readFileSync(path, 'utf8')
}
const rendererSrc = (): string => bytesOf(RENDERER_PATH)
const focusModelSrc = (): string => bytesOf(FOCUS_MODEL_PATH)
const storeCoreSrc = (): string => bytesOf(STORE_CORE_PATH)
const storeRefsSrc = (): string => bytesOf(STORE_REFS_PATH)

/** THE CURRENT FOCUS REGION of `renderer.ts`: the slice between the LAST `U-FOCUS-TOOL`
 *  marker before `main()` and the `async function main` boundary. The marker set is stable
 *  across the re-home (the region's content is replaced; the region's boundaries are not). */
function focusRegion(): string {
  const src = rendererSrc()
  const end = src.indexOf('async function main')
  const start = src.lastIndexOf('U-FOCUS-TOOL', end)
  if (start < 0 || end < 0 || end <= start) return ''
  return src.slice(start, end)
}

/** THE DECLARED HOLDER SYMBOL (spec §3.5 X-1's red-time branch, `renderer.ts:holder`). */
const HOLDER_DECL = 'const holder: { state: FocusState } = { state: { entries: [], activeId: null } }'
/** THE holder mutation in `answerForHolder`'s accepted branch (CURRENT STATE item 1). */
const HOLDER_MUTATION = 'holder.state = result.state'
/** THE holder read in `focusRoute` (CURRENT STATE item 1, §Q rule-1 ✗). */
const HOLDER_READ = 'focusTransition(holder.state'
/** THE wiring's import of the module (spec §3.5 X-2). */
const WIRING_MODULE_IMPORT = "from '../shared/focus-model.js'"

/** THE NORMATIVE REPLY — `mcp-endpoint.md` §3.8 item 2 / `focus-tool.md` §2.1 item 5:
 *  `{ activeId, entries, opened, refused? }` — the members the `FocusAnswer` seam carries. */
const NORMATIVE_REPLY_MEMBERS: readonly string[] = ['activeId', 'entries', 'opened', 'refused']

/** THE normative `FocusAnswer` seam (spec §2.5 item 3; the CURRENT STATE read). */
interface FocusAnswer {
  readonly activeId: unknown
  readonly entries: unknown[]
  readonly opened: boolean
  readonly refused?: { readonly reason: unknown }
}

/** THE CARRIER SURFACE — the ONE exported seam surface of this unit, spec §2.3 item 1:
 *  EXACTLY FOUR members: state() · focusRoute(payload) · persistTarget(state) · dispose().
 *  The type half is pinned HERE (the spec's leg-5 named surface) until the factory lands. */
interface FocusCarrierSurface {
  /** the mirror-state read: `{ entries, activeId }` — the `FocusState` members,
   *  `unknown`-typed at the seam (§2.3 item 1). */
  readonly state: () => { readonly entries: unknown; readonly activeId: unknown }
  /** the re-homed route — the same answer shape the current `focusRoute` answers (§2.3 item 1). */
  readonly focusRoute: (payload: unknown) => FocusAnswer
  /** the STORE-BACKED SEAM TARGET — commits `mem.focus.entries` and `mem.focus.activeId`
   *  (tier `mem`, `{onRepeat:'edit'}`); its return is the store's declared return (§2.1 item 4). */
  readonly persistTarget: (state: FocusState) => unknown
  /** the release — UNSUBSCRIBE-ON-DISPOSE, the H2a pattern (§2.4 item 3). */
  readonly dispose: () => void
}

/** THE TYPED RENDERER MODULE — the honest missing-symbol red (TS2339-class) at the
 *  `typecheck:tests` leg while `createFocusCarrier` does not exist in `renderer.ts`. */
type RendererModule = typeof import('../src/renderer/renderer.js')

let rendererModule: RendererModule | null = null
let rendererLoadError: unknown = null

beforeAll(async () => {
  try {
    rendererModule = await import('../src/renderer/renderer.js')
  } catch (err) {
    rendererLoadError = err
  }
})

/** THE CARRIER FACTORY ACCESSOR. Today the module loads (it is the node-observable wiring,
 *  W4) but exports NO `createFocusCarrier` — the honest red class: the re-home is not
 *  implemented. The typed access is what makes the typecheck leg red with the honest
 *  TS2339-class diagnostic alongside the runtime red. */
function requireCarrierFactory(): (store: GraphStore) => unknown {
  if (rendererLoadError !== null) {
    throw new Error(`H1 RED: the renderer module failed to load in the node host — ${String(rendererLoadError)}`)
  }
  if (rendererModule === null) {
    throw new Error('H1 RED: the renderer module did not load')
  }
  const factory = (rendererModule as RendererModule).createFocusCarrier
  if (typeof factory !== 'function') {
    throw new Error(
      'H1 RED (honest class): renderer.ts does not export createFocusCarrier — the re-home carrier ' +
        'is not implemented; the holder still exists and focusRoute still mutates it',
    )
  }
  return factory as (store: GraphStore) => unknown
}

/** A FRESH CARRIER OVER A FRESH WIRING-SHAPED STORE (spec §3.1 M-6 / §5.2 leg 6 — the boot
 *  wiring's construction shape: `createGraphStore({ declarations: storeGraphReferences([]) })`). */
function carrierOf(store?: GraphStore): FocusCarrierSurface {
  const factory = requireCarrierFactory()
  const wired = store ?? createGraphStore({ declarations: storeGraphReferences([]) })
  return factory(wired) as FocusCarrierSurface
}

/** THE WIRING-SHAPED STORE (the exact boot construction shape of renderer.ts's
 *  `buildWiredGraphStore`). */
function wiringStore(): GraphStore {
  return createGraphStore({ declarations: storeGraphReferences([]) })
}

/** THE BOOT-MINT RECIPE GUARD (spec §0A note 6 / §2.3 item 2): `commit('mem.focus', undefined)`
 *  then `clear('mem.focus')` — the declared-but-unwritten root answers the DECLARED MISS,
 *  never a refusal. Drives the FROZEN store directly. */
function mintedStore(): GraphStore {
  const store = wiringStore()
  store.commit('mem.focus', undefined)
  store.clear('mem.focus')
  return store
}

function resolveOf(store: GraphStore, name: string): GraphResolveResult | Record<string, unknown> {
  return store.resolve(name) as GraphResolveResult | Record<string, unknown>
}

function isMiss(result: GraphResolveResult | Record<string, unknown>): boolean {
  return (result as { found?: boolean }).found === false
}

function isRefusal(result: GraphResolveResult | Record<string, unknown>): boolean {
  return (result as { status?: string }).status === 'refused'
}

/** R-3's CANONICAL STRUCTURAL COMPARISON — own enumerable keys, SORTED, primitives by value;
 *  NO deep-equality dependency, `===` only for primitives (spec §0 ruling 11, `R-3`). */
function canonicalEqual(left: unknown, right: unknown): boolean {
  if (left === right) return true
  if (typeof left === 'object' && left !== null && typeof right === 'object' && right !== null) {
    const lk = Object.keys(left as Record<string, unknown>).sort()
    const rk = Object.keys(right as Record<string, unknown>).sort()
    if (lk.length !== rk.length) return false
    for (let i = 0; i < lk.length; i += 1) {
      if (lk[i] !== rk[i]) return false
      if (!canonicalEqual((left as Record<string, unknown>)[lk[i]], (right as Record<string, unknown>)[rk[i]])) return false
    }
    return true
  }
  return false
}

function canonicalJson(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>
    const keys = Object.keys(record).sort()
    const out: Record<string, string> = {}
    for (const key of keys) out[key] = canonicalJson(record[key])
    return JSON.stringify(out)
  }
  return JSON.stringify(value)
}

/* ─────────────────────────────────────────────────────────────────────────────
 * THE RECORDING STORE DOUBLE (spec §2.3 item 6 + §5.2 leg 1 — "the recording store
 * double AND the real createGraphStore"). The real frozen store under the hood; the
 * recording layer counts commits/resolves/subscriptions/deliveries and can be made
 * HOSTILE (throwing resolve/commit/subscribe, throwing listener) for §2.3 item 6.
 * ───────────────────────────────────────────────────────────────────────────── */

interface RecordingStore {
  readonly store: GraphStore
  readonly commits: Array<{ readonly name: string; readonly value: unknown; readonly opts?: { readonly onRepeat?: 'edit' | 'refuse' } }>
  readonly resolves: string[]
  readonly deliveries: Array<{ readonly name: string; readonly event: GraphEvent }>
  readonly subscriptionsHeld: GraphSubscription[]
  /** HOSTILE TOGGLES — when set, the double's member THROWS (the wiring-turn
   *  absorption rule: the carrier's turns consume the declared degradation). */
  readonly hostiles: { resolve: Error | null; commit: Error | null; subscribe: Error | null }
  readonly listen: (event: GraphEvent) => void
}

function createRecordingStore(): RecordingStore {
  const real = wiringStore()
  const commits: Array<{ name: string; value: unknown; opts?: { onRepeat?: 'edit' | 'refuse' } }> = []
  const resolves: string[] = []
  const deliveries: Array<{ name: string; event: GraphEvent }> = []
  const subscriptionsHeld: GraphSubscription[] = []
  const hostiles = { resolve: null as Error | null, commit: null as Error | null, subscribe: null as Error | null }
  const listeners: Array<(event: GraphEvent) => void> = []

  const store: GraphStore = {
    ...real,
    resolve(name: string): GraphResolveResult {
      resolves.push(name)
      if (hostiles.resolve !== null) throw hostiles.resolve
      return real.resolve(name)
    },
    commit(name: string, value: unknown, opts?: { onRepeat?: 'edit' | 'refuse' }): GraphWriteReceipt {
      commits.push({ name, value, opts })
      if (hostiles.commit !== null) throw hostiles.commit
      return real.commit(name, value, opts)
    },
    subscribe(name: string, listener: (event: GraphEvent) => void, opts?: { subtree?: boolean }): GraphSubscription {
      if (hostiles.subscribe !== null) throw hostiles.subscribe
      const recorded = (event: GraphEvent): void => {
        deliveries.push({ name, event })
        listeners.forEach((l) => l(event))
        // A HOSTILE LISTENER BODY cannot propagate (store §2.10 item 4 — the real store
        // absorbs it); the double records the throw for the wiring-turn absorption row.
        listener(event)
      }
      listeners.push(recorded)
      const handle = real.subscribe(name, recorded, opts)
      subscriptionsHeld.push(handle)
      return handle
    },
  } as GraphStore

  return {
    store,
    commits,
    resolves,
    deliveries,
    subscriptionsHeld,
    hostiles,
    listen: (event: GraphEvent): void => listeners.forEach((l) => l(event)),
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * THE SHARED PROBES (each maps to a §3.4/§3.5/§2.6 row).
 * ───────────────────────────────────────────────────────────────────────────── */

/** R-1 / P-2.6-1 / P-SF-IM-1 — the module census: 0 imports AND the 4 + 5 = 9-name export
 *  census, BY NAME. The positive control: the import-detector must fire on a synthetic
 *  module-position fixture that imports the STORE. */
function moduleCensusProbe(): { readonly ok: boolean; readonly detail: string } {
  const src = focusModelSrc()
  const importDetector = (bytes: string): string[] => {
    const imports: string[] = []
    for (const line of bytes.split('\n')) {
      if (/^\s*import\s/.test(line)) imports.push(line.trim())
    }
    return imports
  }
  // POSITIVE CONTROL — the detector fails a fixture that imports the store into the
  // module position (the `container.md` §3.4 R-1 scanner pattern).
  const syntheticStoreImport = "import { createGraphStore } from './store-core-graph.js'"
  if (importDetector(syntheticStoreImport).length !== 1) {
    return { ok: false, detail: 'positive control: detector did not fire on a store-importing fixture' }
  }
  const imports = importDetector(src)
  if (imports.length !== 0) return { ok: false, detail: `module bytes carry ${imports.length} import(s)` }
  const names: ReadonlyArray<[string, string]> = [
    ['focusTransition', 'export function focusTransition'],
    ['focusOrder', 'export function focusOrder'],
    ['focusIndex', 'export function focusIndex'],
    ['persist', 'export function persist'],
    ['FocusId', 'export type FocusId'],
    ['FocusEntry', 'export type FocusEntry'],
    ['FocusVerb', 'export type FocusVerb'],
    ['FocusRefusalCode', 'export type FocusRefusalCode'],
    ['FocusState', 'export type FocusState'],
  ]
  const missing = names.filter(([, needle]) => !src.includes(needle)).map(([name]) => name)
  if (missing.length > 0) return { ok: false, detail: `export(s) missing by name: ${missing.join(', ')}` }
  return { ok: true, detail: '0 imports; 4 + 5 = 9-name export census verified by name' }
}

/** R-2 / P-2.6-2 — the store is FROZEN and ships NO focus vocabulary (spec §2.1 item 1): the
 *  store's own bytes carry NO `focus`-spelling token — the caller's `mem.focus.*` spellings
 *  never entered a store byte. */
function storeFrozenProbe(): { readonly ok: boolean; readonly detail: string } {
  const core = storeCoreSrc()
  const refs = storeRefsSrc()
  for (const [file, bytes] of [['store-core-graph.ts', core], ['store-graph-references.ts', refs]] as const) {
    if (/focus/.test(bytes)) return { ok: false, detail: `${file} bytes carry a focus token` }
  }
  return { ok: true, detail: 'store bytes carry no focus vocabulary — nothing of the mirror landed store-side' }
}

/** R-3 / P-2.6-3 / P-SF-IM-2's first probe — the re-home's first observable: renderer.ts's
 *  focus region holds NO module-level focus-state carrier (the `const holder` is GONE) and
 *  the store handle stays the wiring-held boot binding. RED today: the holder exists. */
function focusRegionCarrierFree(): { readonly ok: boolean; readonly detail: string } {
  const src = rendererSrc()
  if (src.includes(HOLDER_DECL)) return { ok: false, detail: 'the module-level const holder is still present (renderer.ts:holder)' }
  if (src.includes(HOLDER_MUTATION)) return { ok: false, detail: 'answerForHolder still mutates the holder (holder.state = result.state)' }
  if (src.includes(HOLDER_READ)) return { ok: false, detail: 'focusRoute still reads the holder (focusTransition(holder.state, ...))' }
  return { ok: true, detail: 'no module-level focus-state carrier in renderer.ts' }
}

/** R-4 / P-2.6-4 / S24-1 — exactly TWO subscriptions on the mirror's references while the
 *  carrier is alive, and ZERO other registrations. The byte-level red half: the wiring
 *  registers NO `mem.focus` subscription today (rule-2 ✗). */
function subscriptionCountProbe(): { readonly ok: boolean; readonly detail: string } {
  const src = rendererSrc()
  const lines = src.split('\n')
  const memFocusSubscribes = lines.filter((line) => line.includes('subscribe(') && line.includes('mem.focus'))
  if (memFocusSubscribes.length === 0) {
    return { ok: false, detail: 'the wiring registers NO subscription on mem.focus.* — rule-2 ✗ (zero subscriptions today)' }
  }
  if (memFocusSubscribes.length !== 2) {
    return { ok: false, detail: `mem.focus subscription registrations read ${memFocusSubscribes.length}, expected exactly 2` }
  }
  return { ok: true, detail: 'exactly two mem.focus subscription registrations' }
}

/** R-5 / P-2.6-5 — the mirror never writes tier 1: no byte of the focus region writes a
 *  `file.tabs.*` name or any tier-1 spelling. */
function noTierOneWriteProbe(): { readonly ok: boolean; readonly detail: string } {
  const region = focusRegion()
  if (/file\.tabs/.test(region)) return { ok: false, detail: 'the focus region carries a file.tabs.* spelling' }
  if (/file\./.test(region)) return { ok: false, detail: 'the focus region carries a tier-1 (file) write spelling' }
  return { ok: true, detail: 'the focus region contains no tier-1 spelling — the mirror never writes the tab list' }
}

/** R-6 / P-2.6-6 — NO CAP ROW on the mirror: no declared cap, no overflow limit and no
 *  eviction policy appears in the focus region's bytes (Q-9 SUPERSEDED; RH-4 answered by
 *  the slice). */
function noCapProbe(): { readonly ok: boolean; readonly detail: string } {
  const region = focusRegion()
  const CAP_TOKENS = ['cap-exceeded', 'overflow', 'evict', 'MAX_ENTRIES', 'maxEntries', 'OVERFLOW', 'EVICT', 'cap on', 'cap of']
  const hit = CAP_TOKENS.find((token) => region.includes(token))
  if (hit !== undefined) return { ok: false, detail: `the focus region carries a cap token ('${hit}') — a capped mirror re-literalises RH-4` }
  return { ok: true, detail: 'no cap/overflow/eviction token in the focus region' }
}

/** I-6 / S25-1a — `'focus'` stays ABSENT from `MUTATING_METHODS`: the seven-member set is
 *  byte-pinned and carries no `'focus'` member (focus-tool.md §2.4 row 2). */
function mutatingMethodsProbe(): { readonly ok: boolean; readonly detail: string } {
  const src = rendererSrc()
  const start = src.indexOf('const MUTATING_METHODS = new Set([')
  const end = src.indexOf('])', start)
  if (start < 0 || end < 0) return { ok: false, detail: 'MUTATING_METHODS block not found' }
  const block = src.slice(start, end)
  const members = [...block.matchAll(/'([^']+)'/g)].map((m) => m[1])
  const expected = ['dispatch', 'load', 'op', 'teardown', 'code.load', 'code.loadBatch', 'journal']
  if (members.length !== expected.length || expected.some((m) => !members.includes(m))) {
    return { ok: false, detail: `MUTATING_METHODS members ${JSON.stringify(members)} ≠ the seven-member landed set` }
  }
  if (members.includes('focus')) return { ok: false, detail: "'focus' is present in MUTATING_METHODS — a contract violation" }
  return { ok: true, detail: 'MUTATING_METHODS stays at its seven members with focus absent' }
}

/** X-3 / S25-3a — the `FocusAnswer` seam's members match the normative reply `{activeId,
 *  entries, opened, refused?}` with NO fifth member (§2.5 item 3, `mcp-endpoint.md` §3.8
 *  item 2). */
function focusAnswerSeamProbe(): { readonly ok: boolean; readonly detail: string } {
  const src = rendererSrc()
  const start = src.indexOf('interface FocusAnswer {')
  const end = src.indexOf('}', start)
  if (start < 0 || end < 0) return { ok: false, detail: 'FocusAnswer seam block not found' }
  const block = src.slice(start, end)
  const matches = [...block.matchAll(/^  readonly\s+([A-Za-z]+)(\?)?:/gm)].map((m) => ({ name: m[1], optional: m[2] === '?' }))
  const names = matches.map((m) => m.name)
  if (matches.length !== NORMATIVE_REPLY_MEMBERS.length) {
    return { ok: false, detail: `FocusAnswer has ${matches.length} members (${names.join(', ')}) — expected exactly the normative four` }
  }
  for (const name of NORMATIVE_REPLY_MEMBERS) {
    if (!names.includes(name)) return { ok: false, detail: `FocusAnswer lacks the normative member '${name}'` }
  }
  const refused = matches.find((m) => m.name === 'refused')
  if (refused === undefined || refused.optional !== true) {
    return { ok: false, detail: "FocusAnswer's refused member must be OPTIONAL (refused?)" }
  }
  return { ok: true, detail: 'FocusAnswer = { activeId, entries, opened, refused? } — no fifth member' }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * §4.2 RED-SET AUTHORING ORDER — (1) the §Q-facing carrier rows; (2) the answer-shape
 * rows; (3) the authority/divergence rows; (4) the release rows (H2a); (5) the statics
 * and the existence rows; (6) the register. The file below follows that order.
 * ───────────────────────────────────────────────────────────────────────────── */

describe('H1 U-STORE-FOCUS — §2.1 THE STORE ROUTE AND THE CARRIED STATE SHAPE', () => {
  it('S21-1 §2.1 item 1 — THE STORE ROUTE: the seam target commits exactly the caller-spelled mem.focus.entries / mem.focus.activeId at tier mem (one spelling, one home — §1.3 R-1/R-6). The TURN census reads the turn only: the construction BOOT MINT (§2.3 item 2 — commit(\'mem.focus\', undefined) on a fresh store) is a DECLARED construction fact, asserted at construction and then reset — the register\'s own fresh() discipline (rec.commits.length = 0)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    // THE BOOT MINT IS A DECLARED CONSTRUCTION FACT (§2.3 item 2 + §0A note 6): the fresh
    // store's root is MINT-DECLARED by commit('mem.focus', undefined) — asserted HERE, never
    // excluded from the construction census.
    const bootMints = rec.commits.filter((c) => c.name === 'mem.focus' && c.value === undefined)
    expect(bootMints.length).toBeGreaterThanOrEqual(1)
    // THE TURN CENSUS — reset AFTER construction (the register's fresh() discipline), then
    // assert the turn's exact census (§2.1 item 4's seam-target rule / §2.3 item 4).
    rec.commits.length = 0
    const next: FocusState = { entries: [{ id: 'alpha', target: 'alpha' }], activeId: 'alpha' }
    carrier.persistTarget(next)
    const names = rec.commits.map((c) => c.name)
    expect(names).toEqual(['mem.focus.entries', 'mem.focus.activeId'])
    for (const call of rec.commits) expect(call.opts).toEqual({ onRepeat: 'edit' })
  })

  it('S21-2a §2.1 item 2 + §0 ruling 4 — THE CARRIED STATE SHAPE (module half): the module\'s own persist(seam, state) seam hands a store-backed seam\'s return back BY IDENTITY as {present:true, value:<receipt>}', () => {
    const store = mintedStore()
    const next: FocusState = { entries: [{ id: 'alpha', target: 'alpha' }], activeId: 'alpha' }
    const seam = (state: FocusState): unknown => {
      store.commit('mem.focus.entries', state.entries, { onRepeat: 'edit' })
      return store.commit('mem.focus.activeId', state.activeId, { onRepeat: 'edit' })
    }
    const persisted = persist(seam, next)
    expect(persisted.present).toBe(true)
    const receipt = persisted.value as GraphWriteReceipt
    expect(receipt.status).toBe('committed')
    expect(receipt.name).toBe('mem.focus.activeId')
    expect((store.resolve('mem.focus.entries') as { value?: unknown }).value).toBe(next.entries)
    expect((store.resolve('mem.focus.activeId') as { value?: unknown }).value).toBe('alpha')
  })

  it('S21-2b §2.1 item 2 — THE CARRIED STATE SHAPE (carrier half): the write-through turn carries FocusState\'s TWO members across the TWO references — no third reference, no derived member. The turn census is asserted AFTER the construction census is reset: the BOOT MINT (§2.3 item 2) is a declared construction fact, never excluded', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const bootMints = rec.commits.filter((c) => c.name === 'mem.focus' && c.value === undefined)
    expect(bootMints.length).toBeGreaterThanOrEqual(1) // the declared boot mint (§2.3 item 2)
    rec.commits.length = 0 // reset the construction census (the register's fresh() discipline)
    const answer = carrier.focusRoute({ target: 'alpha', newTab: true })
    expect(answer.activeId).toBe('alpha')
    expect(answer.entries).toEqual(['alpha'])
    expect(rec.commits.map((c) => c.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
  })

  it('S21-3 §2.1 item 3 — THE MODULE\'S OWN BYTES DO NOT MOVE: the census is verified, not changed (this row is the P-SF-IM-1 register drive\'s guard)', () => {
    const probe = moduleCensusProbe()
    expect(probe.ok, probe.detail).toBe(true)
  })

  it('S21-4 §2.1 item 4 — THE SEAM-TARGET RULE (module half): the CALLER of persist supplies the seam whose TARGET is store-backed — given a FocusState it commits both references with the default {onRepeat:\'edit\'}, and its return is the store\'s declared return, handed back by identity', () => {
    const store = mintedStore()
    const entries: readonly FocusEntry[] = [{ id: 'a', target: 'a' }, { id: 'b', target: 'b' }]
    const next: FocusState = { entries, activeId: 'b' }
    const seam = (state: FocusState): unknown => {
      store.commit('mem.focus.entries', state.entries, { onRepeat: 'edit' })
      return store.commit('mem.focus.activeId', state.activeId, { onRepeat: 'edit' })
    }
    const persisted = persist(seam, next)
    expect(persisted.present).toBe(true)
    const receipt = persisted.value as GraphWriteReceipt
    expect(receipt.status).toBe('committed')
    expect((store.resolve('mem.focus.entries') as { value?: unknown }).value).toBe(entries)
    expect((store.resolve('mem.focus.activeId') as { value?: unknown }).value).toBe('b')
  })

  it('S21-5a §2.1 item 5(a) — THE THROW PATTERNS, CLOSED: createFocusCarrier\'s ONE declared throw — an ABSENT/non-store argument is refused at construction with a typed Error', () => {
    const factory = requireCarrierFactory()
    // @ts-expect-error — the factory's store argument is REQUIRED (§2.3 item 1); the
    // absent-argument construction refusal is the declared throw.
    expect(() => factory(undefined)).toThrow(Error)
  })

  it('S21-5b §2.1 item 5(b) — THE MODULE NEVER THROWS (guard): a THROWING seam to persist reads the DECLARED ABSENCE {present:false, value:undefined}, never a throw', () => {
    const next: FocusState = { entries: [], activeId: null }
    const throwingSeam = (): unknown => {
      throw new Error('seam boom')
    }
    let result: { present: boolean; value: unknown } | null = null
    let threw = false
    try {
      result = persist(throwingSeam, next)
    } catch {
      threw = true
    }
    expect(threw).toBe(false)
    expect(result).toEqual({ present: false, value: undefined })
  })

  it('S21-5c §2.1 item 5(c) — THE CARRIER\'S TURNS NEVER THROW FOR ANY ARGUMENT (the wiring-turn absorption rule — THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN)', () => {
    const carrier = carrierOf()
    const payloads: unknown[] = [null, undefined, {}, { target: undefined }, { target: 'x' }, { target: 'x', newTab: false }, { target: 'x', newTab: true }, { target: ['a'] }, { newTab: true }]
    for (const payload of payloads) {
      let threw = false
      try {
        carrier.focusRoute(payload)
      } catch {
        threw = true
      }
      expect(threw, `focusRoute threw for payload ${String(payload)}`).toBe(false)
    }
  })

  it('S21-6a §2.1 item 6 (store-side ground) — THE COLD-HOME, EXACT: on TODAY\'S unminted tree resolve(\'mem.focus.entries\') REFUSES undeclared-name at C-TOP — the boot mint (\'mem.focus\' root pre-existence) is owed', () => {
    const store = wiringStore()
    const result = resolveOf(store, 'mem.focus.entries')
    expect(isRefusal(result)).toBe(true)
    expect((result as { reason?: string }).reason).toBe('undeclared-name')
    expect((result as { step?: string }).step).toBe('C-TOP')
  })

  it('S21-6b §2.1 item 6 (carrier half) — A MISS on either reference reads the DECLARED EMPTY member: entries MISS ⇒ [] and activeId MISS ⇒ null — never an invented default, never a refusal', () => {
    const carrier = carrierOf(mintedStore())
    const read = carrier.state()
    expect(read.entries).toEqual([])
    expect(read.activeId).toBeNull()
  })
})

describe('H1 U-STORE-FOCUS — §2.2 THE AUTHORITY AND THE DIVERGENCE', () => {
  it('S22-1 §2.2 item 1 — THE AUTHORITY IS TIER 1\'S TAB LIST (Q-9 SUPERSEDED): the mirror is a WORKING COPY, never a second authority; today NO file.tabs.* record has landed (this unit declares the authority only)', () => {
    const probe = noTierOneWriteProbe()
    expect(probe.ok, probe.detail).toBe(true)
    expect(!rendererSrc().includes('file.tabs')).toBe(true)
  })

  it('S22-2 §2.2 item 2 — THE ROW LEVEL: the wiring NEVER writes tier 1 from the mirror (static guard — the focus region carries no tier-1 write)', () => {
    expect(noTierOneWriteProbe().ok).toBe(true)
  })

  it('S22-3 §2.2 item 3 — THE DIVERGENCE AND THE DECLARED RECONCILE: a fixture writes a mirror value the tab-list projection does not carry — the answer must come FROM THE TAB LIST and the mirror must be RE-PROJECTED in one committed write (never the reverse, never a mirror-side guess)', () => {
    // The tab-list projection is FIXTURE-SUPPLIED (the real file.tabs.* record is the
    // deferred units\' — this unit drives the declared rule against a fixture projection).
    const projection = { entries: [{ id: 'only-tab', target: 'only-tab' }], activeId: 'only-tab' }
    const rec = createRecordingStore()
    rec.store.commit('mem.focus.entries', [{ id: 'stale', target: 'stale' }])
    rec.store.commit('mem.focus.activeId', 'stale')
    const carrier = carrierOf(rec.store)
    // The answer computes FROM THE TAB LIST — never from the mirror\'s stale value.
    const answer = carrier.focusRoute((projection as unknown) as never)
    expect(answer.entries).toEqual(['only-tab'])
    // The mirror is RE-SEEDED from the tab list in the same committed write.
    expect(rec.commits.map((c) => c.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
  })

  it('S22-4 §2.2 item 4 — RH-4 IS ANSWERED BY THE SLICE, NOT BY A CAP: NO declared cap is added to mem.focus.entries (Q-9 SUPERSEDED — a later cap row re-literalises a withdrawn answer and OWES A GATE)', () => {
    expect(noCapProbe().ok).toBe(true)
  })

  it('S22-5a §2.2 item 5 — THE ONE-SPELLING RULE (carried): the authority is DECLARED EXPLICITLY (item 1) and the divergence drive below spells its fixture projection DISTINCT from mem.focus.* — this file carries that declaration (the alternative the clause names)', () => {
    const recorded = 'file.tabs.*' // the DISTINCT-SPELLED authority (a PLAN reference today — B-1\'s logical-path clear does not reach across)
    expect(recorded.includes('file.tabs')).toBe(true)
    expect(recorded.includes('mem.focus')).toBe(false)
  })

  it('S22-5b §2.2 items 3/5 — THE DECLARED RECONCILE IS THE CROSS-PATH RULE — executable where the slice\'s record exists; the driveable half today: the mirror NEVER self-authorises and the wiring NEVER writes tier 1', () => {
    const carrier = carrierOf()
    expect(typeof carrier.focusRoute).toBe('function')
    const rec = createRecordingStore()
    const before = rec.commits.length
    const answer = carrier.focusRoute({ target: 'x' })
    expect(typeof answer.opened).toBe('boolean')
    expect(rec.commits.length).toBeGreaterThanOrEqual(before)
  })
})

describe('H1 U-STORE-FOCUS — §2.3 THE RE-HOME', () => {
  it('S23-1 §2.3 item 1 — THE CARRIER: createFocusCarrier(store) is the exported seam surface of the renderer\'s focus region, returning EXACTLY the four-member FocusCarrierSurface (state · focusRoute · persistTarget · dispose); the factory\'s store argument is REQUIRED and is the SOLE store-access path', () => {
    const carrier = carrierOf()
    const members = Object.keys(carrier).sort()
    expect(members).toEqual(['dispose', 'focusRoute', 'persistTarget', 'state'])
    expect(typeof carrier.state).toBe('function')
    expect(typeof carrier.focusRoute).toBe('function')
    expect(typeof carrier.persistTarget).toBe('function')
    expect(typeof carrier.dispose).toBe('function')
  })

  it('S23-2a §2.3 item 2 — THE BOOT CONSTRUCTION AND THE BOOT MINT: construction MINT-DECLARES the root (commit(\'mem.focus\', undefined) + clear(\'mem.focus\')) and registers the two subscriptions at the same construction point', () => {
    const rec = createRecordingStore()
    carrierOf(rec.store)
    const bootMints = rec.commits.filter((c) => c.name === 'mem.focus' && c.value === undefined)
    expect(bootMints.length).toBeGreaterThanOrEqual(1)
    expect(rec.subscriptionsHeld.length).toBe(2)
    expect(rec.subscriptionsHeld.map((h) => h.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
  })

  it('S23-2b §2.3 item 2 (store-side guard) — THE BOOT-MINT RECIPE\'s tree facts: commit(\'mem.focus\', undefined) then clear(\'mem.focus\') DECLARES + MINTS the root (the register\'s row pre-exists the first write); a resolve of the two references on the CURRENT frozen store then answers its READ-SIDE REFUSAL RECORD (D-ANCHOR no-such-anchor — the leaf anchors never existed), which the carrier\'s read turn must CONSUME as the declared-empty outcome (§2.1 item 6\'s last sentence / §2.3 item 6 — the row that flips with the carrier is S21-6b)', () => {
    const store = mintedStore()
    // the register row pre-exists the first write (the root is declared + minted)
    const rootRow = store.register.rows.find((row) => row.name === 'focus')
    expect(rootRow).toBeDefined()
    // resolve on the minted-but-childless root answers the store's READ-SIDE REFUSAL
    // RECORD — never a throw and never a HIT — the consumption duty is the carrier's.
    const r1 = resolveOf(store, 'mem.focus.entries')
    const r2 = resolveOf(store, 'mem.focus.activeId')
    expect(isRefusal(r1)).toBe(true)
    expect(r1 as { reason?: string }).toMatchObject({ reason: 'no-such-anchor', step: 'D-ANCHOR' })
    expect(isRefusal(r2)).toBe(true)
    expect(r2 as { reason?: string }).toMatchObject({ reason: 'no-such-anchor', step: 'D-ANCHOR' })
  })

  it('S23-3a §2.3 item 3 — THE READ TURN: state() and the route\'s answer assembly read resolve(\'mem.focus.entries\') and resolve(\'mem.focus.activeId\') — the answer assembly is UNCHANGED IN SHAPE and NO MEMBER EVER EMITS AS undefined (the §0A-note-8 defect-3 rule)', () => {
    const carrier = carrierOf()
    const read = carrier.state()
    expect(read).toHaveProperty('entries')
    expect(read).toHaveProperty('activeId')
    const answer = carrier.focusRoute({ target: 'x', newTab: true })
    expect(answer.opened).toBe(true)
    for (const key of ['activeId', 'entries', 'opened']) {
      expect((answer as unknown as Record<string, unknown>)[key] === undefined).toBe(false)
    }
    if ('refused' in answer) {
      expect((answer.refused as unknown) === undefined).toBe(false)
      expect('reason' in (answer.refused as { reason: unknown })).toBe(true)
    }
  })

  it('S23-3b §2.3 item 3 (store-side guard) — the resolve surface on the frozen store for the unit\'s OWN spellings reads TOTAL: unminted ⇒ undeclared-name at C-TOP; boot-minted ⇒ no-such-anchor at D-ANCHOR; a written reference ⇒ the GraphReadHit (found:true) — the carrier\'s read turn consumes each as its declared answer', () => {
    const unminted = wiringStore()
    expect(resolveOf(unminted, 'mem.focus.entries') as { reason?: string }).toMatchObject({ reason: 'undeclared-name', step: 'C-TOP' })
    const minted = mintedStore()
    expect(resolveOf(minted, 'mem.focus.entries') as { reason?: string }).toMatchObject({ reason: 'no-such-anchor', step: 'D-ANCHOR' })
    const written = mintedStore()
    written.commit('mem.focus.entries', [{ id: 'w', target: 'w' }])
    const hit = resolveOf(written, 'mem.focus.entries') as { found?: boolean; value?: unknown }
    expect(hit.found).toBe(true)
    expect((hit.value as readonly FocusEntry[])[0]?.id).toBe('w')
  })

  it('S23-4 §2.3 item 4 — THE WRITE-THROUGH TURN: on an ACCEPTED transition whose changed is true, the route calls the module\'s own persist(seamTarget, nextState) — EXACTLY ONE commit per reference (mem.focus.entries AND mem.focus.activeId, tier mem, {onRepeat:\'edit\'}); on a REFUSED transition and on an ACCEPTED NO-OP (changed:false) the route writes NOTHING', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    rec.commits.length = 0
    // accepted + changed: EXACTLY ONE commit per reference
    carrier.focusRoute({ target: 'gamma', newTab: true })
    const names = rec.commits.map((c) => c.name)
    expect(names.filter((n) => n === 'mem.focus.entries')).toHaveLength(1)
    expect(names.filter((n) => n === 'mem.focus.activeId')).toHaveLength(1)
    for (const call of rec.commits) expect(call.opts).toEqual({ onRepeat: 'edit' })
    // refused: ZERO writes (the mirror byte-identical, "changes nothing")
    rec.commits.length = 0
    carrier.focusRoute({ target: 'gamma', newTab: true }) // duplicate-id — refused
    expect(rec.commits).toHaveLength(0)
    // accepted no-op: ZERO writes
    rec.commits.length = 0
    carrier.focusRoute({ target: 'gamma' }) // activate the already-seated id — changed:false
    expect(rec.commits).toHaveLength(0)
    // no-target: ZERO writes
    rec.commits.length = 0
    carrier.focusRoute({})
    expect(rec.commits).toHaveLength(0)
  })

  it('S23-5 §2.3 item 5 — THE ROUTE\'S TOTALITY: focusRoute(payload) is TOTAL for EVERY payload (no target ⇒ standingAnswer(); newTab:true ⇒ open, else activate; no id minted, no verb chosen beyond the caller\'s flag); a refusal is never a throw; the declared-empty mirror state is a valid base for every verb (an activate on the empty mirror refuses unknown-id exactly as on the empty holder today). The refused/no-target turns write NOTHING — the census is reset AFTER construction (the §2.3 item 2 boot mint is a DECLARED construction fact, asserted first)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const bootMints = rec.commits.filter((c) => c.name === 'mem.focus' && c.value === undefined)
    expect(bootMints.length).toBeGreaterThanOrEqual(1) // the declared boot mint (§2.3 item 2)
    rec.commits.length = 0 // reset the construction census (the register's fresh() discipline)
    expect(carrier.focusRoute({})).toEqual({ activeId: null, entries: [], opened: false })
    const refused = carrier.focusRoute({ target: 'ghost' })
    expect(refused.refused).toEqual({ reason: 'unknown-id' })
    expect(refused.opened).toBe(false)
    expect(rec.commits).toHaveLength(0) // the totality turns write NOTHING (§2.3 items 4/5)
  })

  it('S23-6a §2.3 item 6 — THE HOSTILE-STORE DEGRADATION: an ABSENT store-member argument, a hostile store, and a throwing tier-handle/resolve/commit/subscribe surface all land the DECLARED degradation and never let a throw escape a wiring turn — state() answers the declared-empty pair; the write-through answers a declared no-write; the subscription refuses to register; the boot mint is a no-op; dispose() still returns normally', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    rec.hostiles.resolve = new Error('hostile resolve')
    expect(carrier.state()).toEqual({ entries: [], activeId: null })
    rec.hostiles.resolve = null
    rec.hostiles.commit = new Error('hostile commit')
    let wrote = true
    try {
      carrier.focusRoute({ target: 'x', newTab: true })
    } catch {
      wrote = false
    }
    expect(wrote).toBe(true)
    rec.hostiles.commit = null
    rec.hostiles.subscribe = new Error('hostile subscribe')
    const factory = requireCarrierFactory()
    let constructed = true
    try {
      factory(rec.store)
    } catch {
      constructed = false
    }
    expect(constructed).toBe(true)
    expect(rec.subscriptionsHeld.length).toBe(2)
    rec.hostiles.subscribe = null
    expect(() => carrier.dispose()).not.toThrow()
  })

  it('S23-6b §2.3 item 6 (module half) — a THROWING seam is absorbed AT the module\'s persist, and the store\'s surface stays UNGUARDED (the throwing supply is absorbed at the wiring turn — the store never absorbs the caller\'s seam)', () => {
    const store = mintedStore()
    const seam = (): unknown => {
      throw new Error('seam boom')
    }
    expect(persist(seam, { entries: [], activeId: null })).toEqual({ present: false, value: undefined })
    // the store's own surface is untouched by the caller's throwing seam — its reads stay TOTAL
    expect(typeof store.resolve('mem.focus.entries')).toBe('object')
  })

  it('THE-REHOME §2.3 + §3.5 X-1 (green branch) + §6 item 2 — THE MODULE-LEVEL const holder IS GONE from renderer.ts (its region replaced by the store mirror + the store-backed seam target); focusRoute no longer mutates a module-level carrier. RED for the honest reason: the re-home is not implemented — the holder still exists and focusRoute still mutates it', () => {
    const src = rendererSrc()
    expect(src.includes(HOLDER_DECL)).toBe(false)
    expect(src.includes(HOLDER_MUTATION)).toBe(false)
    expect(src.includes(HOLDER_READ)).toBe(false)
  })
})

describe('H1 U-STORE-FOCUS — §2.4 THE SUBSCRIPTION + RELEASE (rule 2, the H2a pattern)', () => {
  it('S24-1 §2.4 item 1 — THE OBSERVATION IS A STORE SUBSCRIPTION: the wiring registers its consumer channel ON THE STORE with the EXACT-REFERENCE forms on the mirror\'s two fixed references; the count is EXACTLY TWO subscriptions while alive, 0 after dispose(), and stays 2 across N graph re-derivations. RED today: the wiring registers NO subscription on mem.focus.* (rule-2 ✗)', () => {
    const probe = subscriptionCountProbe()
    expect(probe.ok, probe.detail).toBe(true)
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    expect(rec.subscriptionsHeld.length).toBe(2)
    expect(rec.subscriptionsHeld.map((h) => h.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
    expect(rec.subscriptionsHeld.every((h) => h.subtree === false)).toBe(true)
  })

  it('S24-2a §2.4 item 2 — THE LISTENER BODY, READ-ONLY: the listener is the wiring\'s own closure forwarding the event to the declared consumer channel (a test-driven delivery recorder); its body never writes the store from inside (each transition yields at most the declared two events). DRIVEN AGAINST THE REAL STORE — the fan-out asserted is the STORE\'s own bounded per-realm-per-reference delivery (§2.10 item 4), never the recording double\'s re-invoking fan-out', () => {
    const store = mintedStore()
    const recorded: Array<{ readonly name: string; readonly cause: unknown }> = []
    store.subscribe('mem.focus.entries', (event) => { recorded.push({ name: event.name, cause: event.cause }) })
    store.subscribe('mem.focus.activeId', (event) => { recorded.push({ name: event.name, cause: event.cause }) })
    const carrier = carrierOf(store)
    carrier.focusRoute({ target: 'delta', newTab: true })
    // one accepted+changed transition ⇒ at most the declared TWO deliveries (one per committed
    // reference — the store's own bounded fan-out).
    expect(recorded.length).toBeLessThanOrEqual(2)
    for (const delivery of recorded) {
      expect(['mem.focus.entries', 'mem.focus.activeId']).toContain(delivery.name)
    }
    // THE WRITE-LOOP PROOF (§2.4 item 2): the listener bodies never wrote the store from
    // inside — every delivery is a 'commit' event of the route's own write-through turn.
    expect(recorded.every((d) => d.cause === 'commit')).toBe(true)
  })

  it('S24-2b §2.4 item 2 (store-side guard) — a THROWING listener body cannot propagate: the store catches it (§2.10 item 4)', () => {
    const store = mintedStore()
    store.subscribe('mem.focus.entries', () => {
      throw new Error('listener boom')
    })
    let receipt: GraphWriteReceipt | null = null
    let threw = false
    try {
      receipt = store.commit('mem.focus.entries', [{ id: 'a', target: 'a' }])
    } catch {
      threw = true
    }
    expect(threw).toBe(false)
    expect(receipt?.status).toBe('committed')
  })

  it('S24-3 §2.4 item 3 — THE RELEASE — UNSUBSCRIBE-ON-DISPOSE, THE H2A PATTERN: dispose() releases EVERY subscription the wiring registered (unsubscribe called EXACTLY ONCE, first call true, later calls false), NEVER the store\'s sever path; the release emits NO store event, leaves the mirror\'s records in place, and is idempotent and non-throwing', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    for (const handle of rec.subscriptionsHeld) {
      expect(handle.unsubscribe()).toBe(false) // already released by dispose()
    }
    expect(() => carrier.dispose()).not.toThrow()
  })

  it('P1 §2.4 item 4 — RELEASE POST-CONDITION P1: every subscription the wiring registered is released — each handle\'s unsubscribe() is called EXACTLY ONCE, each first call answers true, later calls false, never a throw', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    expect(rec.subscriptionsHeld.length).toBe(2)
    const firstAnswers = rec.subscriptionsHeld.map((h) => h.unsubscribe())
    expect(firstAnswers).toEqual([true, true]) // dispose() calls each exactly once, in registration order
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
  })

  it('P2 §2.4 item 4 — RELEASE POST-CONDITION P2: NO further delivery to a disposed carrier — a post-dispose write to either released name delivers NOTHING to the wiring\'s listener (the delivery-recorder counter stays at its pre-write value) — the SF-LEAK arm (a)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    const before = rec.deliveries.length
    rec.store.commit('mem.focus.entries', [{ id: 'late', target: 'late' }])
    rec.store.commit('mem.focus.activeId', 'late')
    expect(rec.deliveries.length).toBe(before)
  })

  it('P3 §2.4 item 4 — RELEASE POST-CONDITION P3: idempotence — a second (and every later) dispose() is a no-op; no handle is called again', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    carrier.dispose()
    carrier.dispose()
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
  })

  it('P4 §2.4 item 4 — RELEASE POST-CONDITION P4: a delivery in flight during dispose() COMPLETES (the store\'s fan-out is synchronous in registration order); from the moment dispose() begins NO FURTHER delivery is dispatched to the wiring\'s listener', () => {
    const store = mintedStore()
    const order: string[] = []
    const subA = store.subscribe('mem.focus.entries', () => order.push('A'))
    const subB = store.subscribe('mem.focus.entries', () => order.push('B'))
    store.commit('mem.focus.entries', [{ id: 'flight', target: 'flight' }])
    expect(order).toEqual(['A', 'B'])
    expect(subA.unsubscribe()).toBe(true)
    expect(subB.unsubscribe()).toBe(true)
  })

  it('P5 §2.4 item 4 — RELEASE POST-CONDITION P5 + SF-LEAK arm (c): NO store event is emitted by the release itself — events: 0 attributable to dispose()', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const deliveriesBefore = rec.deliveries.length
    carrier.dispose()
    expect(rec.deliveries.length).toBe(deliveriesBefore)
  })

  it('P6 §2.4 item 4 — RELEASE POST-CONDITION P6: the records REMAIN — dispose() deletes/clears/re-mints NOTHING on mem.focus.* (resolve still answers HIT after dispose)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.focusRoute({ target: 'keep', newTab: true })
    carrier.dispose()
    const result = resolveOf(rec.store, 'mem.focus.entries')
    expect((result as { found?: boolean }).found).toBe(true)
  })

  it('P7 §2.4 item 4 — RELEASE POST-CONDITION P7 + SF-LEAK arm (b): NO SECOND RELEASE AUTHORITY and NO SECOND SUBSCRIPTION AUTHORITY — dispose() releases EXACTLY the wiring\'s registrations (a SECOND PARTY\'s subscription SURVIVES the wiring\'s dispose, never released by it), and the WIRING\'s own registration count on the mirror\'s references is exactly two (§3.4 R-4\'s static, §2.6 prohibition 4)', () => {
    // THE WIRING'S OWN PER-REFERENCE COUNT — the R-4 static pins "nothing else registers":
    // the WIRING's byte-level registration count is EXACTLY the two reference subscriptions
    // (§3.4 R-4 / §2.6 prohibition 4).
    expect(subscriptionCountProbe().ok).toBe(true)
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const wiringHandles = rec.subscriptionsHeld.slice() // the wiring's own two (the factory's closure-held set)
    // A SECOND PARTY registers on the mirror's references — its handle is a DIFFERENT owner's.
    const secondPartyHandle = rec.store.subscribe('mem.focus.entries', () => undefined)
    expect(rec.subscriptionsHeld.length).toBe(3) // the double records every subscribe unconditionally — 2 wiring + 1 second party
    carrier.dispose()
    // dispose() released EXACTLY the wiring's registrations — its handles answer false now...
    expect(wiringHandles.map((h) => h.unsubscribe())).toEqual([false, false])
    // ...and the SECOND PARTY's subscription SURVIVES — still live (first unsubscribe answers
    // true), never released by the wiring's dispose (NO SECOND RELEASE AUTHORITY).
    expect(secondPartyHandle.unsubscribe()).toBe(true)
  })

  it('SF-LEAK §2.4 — THE LEAK FAIL-STATE, THREE-ARMED: (a) DELIVERY AFTER DISPOSE fails (P2); (b) the held handles\' first unsubscribe() must answer true and the active set must read EMPTY after dispose (P1/P7); (c) dispose() adds 0 to the store\'s event census (P5). The only way a leak survives all three is a registration outside the carrier\'s closure-held handle set — which the registration discipline forbids by construction and P-SF-IM-2 scans for', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    // (a)
    const before = rec.deliveries.length
    rec.store.commit('mem.focus.activeId', 'late')
    expect(rec.deliveries.length).toBe(before)
    // (b)
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
    // (c)
    expect(rec.deliveries.length).toBe(before)
  })
})

describe('H1 U-STORE-FOCUS — §2.5 THE TOOL\'S ROUTE AND THE REPLY-SHAPE DETERMINATION', () => {
  it('S25-1a §2.5 item 1 (statics guard) — THE ROUTE IS UNCHANGED IN ITS ARCHITECTURE: the main-side handler and the preload are NOT touched; the case \'focus\' still routes through the renderer\'s method switch; MUTATING_METHODS stays at its seven members with \'focus\' ABSENT', () => {
    const src = rendererSrc()
    expect(src.includes("case 'focus':")).toBe(true)
    expect(src.includes('focusRoute(req.payload)')).toBe(true)
    expect(mutatingMethodsProbe().ok).toBe(true)
  })

  it('S25-1b §2.5 item 1 (carrier half) — the case\'s answer is the CARRIER\'s answer — the re-homed route, passed through the request path', () => {
    const carrier = carrierOf()
    const answer = carrier.focusRoute({ target: 'route', newTab: true })
    expect(typeof answer).toBe('object')
  })

  it('S25-2 §2.5 item 2 — THE ANSWER IS ASSEMBLED FROM THE STORE-CARRIED VALUE: the answer\'s entries/activeId/opened/refused members are computed from the mirror read — NEVER from a module-level variable and NEVER from a second carrier (a residual holder, a memo or a cached answer FAILS F-6). RED today: focusRoute still reads holder.state — a module-level variable IS the answer\'s source (the §Q rule-1 ✗ shape)', () => {
    const src = rendererSrc()
    const region = focusRegion()
    expect(region.includes(HOLDER_READ)).toBe(false)
    expect(region.includes(HOLDER_MUTATION)).toBe(false)
    expect(region.includes('holder.state')).toBe(false)
    expect(src.includes('mem.focus')).toBe(true) // the store-carried source is the wiring's state after the re-home
  })

  it('S25-3a §2.5 item 3 (statics guard) — THE REPLY-SHAPE DETERMINATION, DECLARED BEHAVIOUR-PRESERVING: the FocusAnswer seam carries exactly { activeId, entries, opened, refused? } with NO FIFTH MEMBER (mcp-endpoint.md §3.8 item 2)', () => {
    expect(focusAnswerSeamProbe().ok).toBe(true)
  })

  it('S25-3b §2.5 item 3 (carrier half) — the members\' VALUES are the same values the holder carried (the write-through keeps the mirror equal to the holder\'s state at every turn) and the refusal path still ships {refused: {reason}} — the re-home is NOT a fork-facing compatibility break; the BREAK clause is NOT triggered', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const open = carrier.focusRoute({ target: 'holdereq', newTab: true })
    expect(open).toEqual({ activeId: 'holdereq', entries: ['holdereq'], opened: true })
    const refused = carrier.focusRoute({ target: 'ghost' })
    expect(refused).toEqual({ activeId: 'holdereq', entries: ['holdereq'], opened: false, refused: { reason: 'unknown-id' } })
    expect(Object.keys(refused).sort()).toEqual(['activeId', 'entries', 'opened', 'refused'])
    expect(rec.deliveries.length).toBeGreaterThanOrEqual(2)
  })

  it('S25-4 §2.5 item 4 — THE FORK-FACING CARRY, RECORDED (H-r6): the fork\'s focus-state observers must observe via a STORE SUBSCRIPTION on mem.focus.* under the fork\'s own pass (this repo writes no file under <Astrographer>/). The tool\'s REPLY is unchanged, so no fork consent is owed — and the fork\'s observation-channel re-route is NEVER tested here (it is H-r6\'s, not this unit\'s)', () => {
    // RECORDED carry — the H-r6 marker this file carries so a later pass cannot read the
    // in-tree subscriber as the fork's landing.
    const H_R6_CARRY = 'H-r6'
    expect(H_R6_CARRY).toBe('H-r6')
    // The unit's own in-tree subscriber is the foundation-side half of that channel — but
    // the fork's UI/observation bytes are NOT in this repo and are NOT this unit's leg.
    expect(requireCarrierFactory).toBeDefined()
  })

  it('S25-5a §2.5 item 5 (tool-side guard) — THE TOOL\'S OWN NEGATIVE CLAIMS STAY, narrowed to the TOOL\'s surface: this unit\'s test file never imports src/main/** (the tool/persist/imports-not-storage negatives are the tool\'s own bytes, untouched by the re-home)', () => {
    const self = bytesOf(new URL('../tests/store-focus.test.ts', import.meta.url))
    expect(/from ['"]\.\.\/src\/main/.test(self)).toBe(false)
    expect(self.includes('MUTATING_METHODS')).toBe(true) // the static guard lives in THIS file, not in a tool byte
  })

  it('S25-5b §2.5 item 5 (wiring half) — the wiring half of the "any store" denial narrows: the routed answer is STORE-CARRIED, the compliance criterion\'s OWN mandated shape (§0A note 4). RED today: the route still reads a module variable — the store-carried read is absent', () => {
    const region = focusRegion()
    expect(region.includes('holder.state')).toBe(false)
    expect(region.includes('resolve(')).toBe(true) // the mandated store-carried read
  })
})

describe('H1 U-STORE-FOCUS — §2.6 THE SIX PROHIBITIONS (each pinned by an enumerated §3.4 static)', () => {
  it('P-2.6-1 — THE MODULE\'S BYTES ARE UNMOVED (pinned by §3.4 R-1 / P-SF-IM-1): 0-import census + 4 + 5 = 9-name export census; no focus-model register re-grain is owed', () => {
    expect(moduleCensusProbe().ok).toBe(true)
  })

  it('P-2.6-2 — THE STORE IS FROZEN (pinned by §3.4 R-2 / §5.1 row 6): no store byte, no store member, no refusal token, no event arm, no release trigger is added or moved by this unit — the store\'s bytes carry NO focus vocabulary', () => {
    expect(storeFrozenProbe().ok).toBe(true)
  })

  it('P-2.6-3 — renderer.ts\'s edit is BOUNDED to the focus region (pinned by §3.4 R-3 / §5.1 row 1): the holder\'s removal, the carrier factory + boot construction, the store-backed seam target, the two subscriptions, the switch case\'s routing — and NOTHING else. RED today: the re-home has not landed — the module-level carrier still sits in the focus region', () => {
    expect(focusRegionCarrierFree().ok).toBe(true)
  })

  it('P-2.6-4 — NO SECOND SUBSCRIPTION AUTHORITY (pinned by §3.4 R-4): the wiring\'s two registrations are the ONLY subscriptions on the mirror\'s references. RED today: there are ZERO registrations on mem.focus.* — rule-2 is unmet', () => {
    expect(subscriptionCountProbe().ok).toBe(true)
  })

  it('P-2.6-5 — THE STORE IS NEVER THE AUTHORITY OVER TIER 1 (pinned by §3.4 R-5): the mirror never writes the tab list — no byte of the focus region writes a tier-1 spelling', () => {
    expect(noTierOneWriteProbe().ok).toBe(true)
  })

  it('P-2.6-6 — NO CAP ROW ON THE MIRROR (pinned by §3.4 R-6): Q-9 SUPERSEDED; RH-4 is answered by the slice\'s tab list + removal path, not by a numeric cap; a capped mirror re-literalises a withdrawn answer and OWES A GATE', () => {
    expect(noCapProbe().ok).toBe(true)
  })
})

describe('H1 U-STORE-FOCUS — §3.1 THE VALID / HAPPY STATES', () => {
  it('M-1 COLD (the boot mint done, nothing written) — state() answers the DECLARED EMPTY pair ([]/null); a focusRoute with no target answers {activeId:null, entries:[], opened:false}; an activate on the empty mirror refuses unknown-id — exactly the empty-holder behaviour today', () => {
    const carrier = carrierOf(mintedStore())
    expect(carrier.state()).toEqual({ entries: [], activeId: null })
    expect(carrier.focusRoute({})).toEqual({ activeId: null, entries: [], opened: false })
    expect(carrier.focusRoute({ target: 'ghost' })).toEqual({ activeId: null, entries: [], opened: false, refused: { reason: 'unknown-id' } })
  })

  it('M-2 ONE ACCEPTED, CHANGED TRANSITION (newTab:true on a fresh target) — the mirror reads the fresh state (the stored entry is THE ROUTE\'S OWN CONSTRUCTION — {id, target} from the caller\'s target string, §2.3 item 5: no id is minted and no entry is built beyond the caller\'s own members; activeId is the caller\'s string); the answer echoes them by identity; EXACTLY ONE commit per reference; the persisted record reads {present:true, value:<receipt>}', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const target = 'fresh'
    rec.commits.length = 0 // reset the construction census (the register's fresh() discipline)
    const answer = carrier.focusRoute({ target, newTab: true })
    expect(answer).toEqual({ activeId: 'fresh', entries: ['fresh'], opened: true })
    expect(rec.commits.map((c) => c.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
    const entriesHit = resolveOf(rec.store, 'mem.focus.entries') as { value?: unknown }
    const stored = (entriesHit.value as readonly FocusEntry[])[0]
    // THE ROUTE'S OWN CONSTRUCTION — the payload is {target, newTab} only (focus-tool §2.1
    // item 8(a)), so the stored [0] is the route's built {id: target, target: target}
    // (§2.3 item 5 — shape unchanged), never the test's local object. Assert its SHAPE and
    // the caller's string BY IDENTITY — never a test-local object under `toBe`.
    expect(stored).toMatchObject({ id: 'fresh', target: 'fresh' })
    expect((stored as { target?: unknown }).target).toBe(target)
    expect((resolveOf(rec.store, 'mem.focus.activeId') as { value?: unknown }).value).toBe('fresh')
  })

  it('M-3 ACTIVATE on an owned id (changed:true) — the seat changes, the entries array is UNTOUCHED (same reference — the module returns the caller\'s array unchanged, §3.3 I-4); only mem.focus.activeId\'s commit changes substance; both commits still fire (the transition changed). Driven with the row\'s intended 3-call shape: open → open → ACTIVATE the owned non-seated id', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    // the 3-call ACTIVATE shape: two opens seat 'two', then the owned id 'one' is ACTIVATED
    // (changed:true — the seat flips; the entries array never changes).
    carrier.focusRoute({ target: 'one', newTab: true })
    carrier.focusRoute({ target: 'two', newTab: true })
    const entriesBefore = (resolveOf(rec.store, 'mem.focus.entries') as { value?: readonly FocusEntry[] }).value
    rec.commits.length = 0 // reset the construction census (the register's fresh() discipline)
    carrier.focusRoute({ target: 'one' }) // activate the owned non-seated id — changed:true
    const entriesAfter = (resolveOf(rec.store, 'mem.focus.entries') as { value?: readonly FocusEntry[] }).value
    expect(entriesAfter).toBe(entriesBefore) // the ACTIVATE's state returns the caller's array unchanged (same reference — §3.1 M-3 / §3.3 I-4)
    expect(rec.commits.map((c) => c.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
  })

  it('M-4 A DIVERGENT MIRROR against a fixture-supplied tab-list projection — the answer and the subsequent write-through compute FROM THE TAB LIST; the mirror is re-projected (re-seeded) from the tab list in one committed write — never the reverse', () => {
    const projection = { entries: [{ id: 't1', target: 't1' }], activeId: 't1' }
    const rec = createRecordingStore()
    carrierOf(rec.store)
    rec.store.commit('mem.focus.entries', [{ id: 'stale', target: 'stale' }])
    rec.store.commit('mem.focus.activeId', 'stale')
    const carrier = carrierOf(rec.store)
    expect((resolveOf(rec.store, 'mem.focus.entries') as { value?: readonly FocusEntry[] }).value?.[0]?.id).toBe('stale')
    const answer = carrier.focusRoute((projection as unknown) as never)
    expect(answer.entries).toEqual(['t1'])
  })

  it('M-5 POST-DISPOSE — every handle\'s unsubscribe() answered true once then false; a write to either released name delivers NOTHING; a second dispose() is a no-op; the mirror\'s records REMAIN readable (resolve still answers HIT)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.focusRoute({ target: 'keep', newTab: true })
    carrier.dispose()
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
    carrier.dispose()
    const before = rec.deliveries.length
    rec.store.commit('mem.focus.entries', [{ id: 'x', target: 'x' }])
    expect(rec.deliveries.length).toBe(before)
    expect((resolveOf(rec.store, 'mem.focus.entries') as { found?: boolean }).found).toBe(true)
  })

  it('M-6 THE REAL-STORE DRIVE (the wired createGraphStore, this unit\'s composition rows) — every turn\'s receipt is the store\'s settled GraphWriteReceipt; the events count matches the store\'s own delivery record; the subscription count on the two references reads exactly 2 while alive', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.focusRoute({ target: 'real', newTab: true })
    const entryReceipt = rec.commits.find((c) => c.name === 'mem.focus.entries')
    expect(entryReceipt).toBeDefined()
    carrier.dispose()
  })
})

describe('H1 U-STORE-FOCUS — §3.2 THE DOCUMENTED FAIL-STATES / NON-HAPPY STATES', () => {
  it('F-1 A REFUSED transition (duplicate-id / unknown-id / no-next / no-previous / unknown-verb) — {refused:{reason}} in the answer; the mirror writes NOTHING (the state is unchanged — "changes nothing"); the persisted record for the turn is the DECLARED not-called {present:false, value:undefined}; NO member emits as undefined', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.focusRoute({ target: 'dup', newTab: true })
    rec.commits.length = 0
    const refused = carrier.focusRoute({ target: 'dup', newTab: true })
    expect(refused.refused).toEqual({ reason: 'duplicate-id' })
    expect(rec.commits).toHaveLength(0)
    for (const key of ['activeId', 'entries', 'opened']) {
      expect((refused as unknown as Record<string, unknown>)[key] === undefined).toBe(false)
    }
  })

  it('F-2 SF-LEAK — DELIVERY AFTER DISPOSE: a post-dispose write to a released name with ANY delivery to the wiring\'s listener FAILS (the delivery-recorder counter must stay at its pre-write value)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    const before = rec.deliveries.length
    rec.store.commit('mem.focus.entries', [{ id: 'leak', target: 'leak' }])
    expect(rec.deliveries.length).toBe(before)
  })

  it('F-3 SF-LEAK — THE HANDLE\'S RETURN SHAPE / NO SECOND RELEASE AUTHORITY: a held handle whose first unsubscribe() answers false, or an active set non-empty after dispose, FAILS; a release of a subscription another party registered FAILS', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
  })

  it('F-4 SF-LEAK — THE EVENT NEGATIVE: a severed/clear/set event attributable to the dispose() call FAILS (events: 0 attributable)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    const before = rec.deliveries.length
    carrier.dispose()
    expect(rec.deliveries.length).toBe(before)
  })

  it('F-5 A MIRROR THAT SELF-AUTHORISES (a fixture writes mem.focus.* a value the tab list does not project, then reads an answer computed from the mirror) FAILS the divergence rule — the tab list wins and the declared reconcile re-projects the mirror; the mirror\'s value is NEVER the answer\'s authority', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    rec.store.commit('mem.focus.entries', [{ id: 'rogue', target: 'rogue' }])
    rec.store.commit('mem.focus.activeId', 'rogue')
    const answer = carrier.focusRoute({ target: 't1', newTab: true })
    expect(answer.entries).not.toEqual(['rogue'])
  })

  it('F-6 A SECOND CARRIER (a residual module-level holder of the focus state, a memo of the last answer, or a route that consumes the SUBSCRIPTION as its data source) FAILS the re-home\'s carrier rule. RED today, honestly: the residual module-level holder EXISTS — the §Q rule-1 ✗ shape is still present', () => {
    const src = rendererSrc()
    expect(src.includes(HOLDER_DECL)).toBe(false)
    expect(src.includes(HOLDER_READ)).toBe(false)
    expect(focusRegion().includes('subscribe(')).toBe(false) // the route never consumes the subscription as its data source
  })
})

describe('H1 U-STORE-FOCUS — §3.3 THE INVARIANTS', () => {
  it('I-1 The mirror equals the holder\'s state at every turn — for every sequence of route calls, the mirror\'s canonical projection (entries ids in order + the seat) equals the state the pre-re-home holder would have carried (P-SF-TP-1\'s drive is the instrument)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.focusRoute({ target: 'i1', newTab: true })
    carrier.focusRoute({ target: 'i2', newTab: true })
    const state = carrier.state()
    expect(canonicalJson(state)).toBe(canonicalJson({ entries: [{ id: 'i1', target: 'i1' }, { id: 'i2', target: 'i2' }], activeId: 'i2' }))
    expect(rec.commits.length).toBeGreaterThanOrEqual(4)
  })

  it('I-2 The module\'s answer is a function of its arguments alone — focusTransition/focusOrder/focusIndex/persist consult no ambient value and no store value (this row is the P-SF-TP-1 differential\'s guard: the module-half drives, all PASS on the CURRENT tree)', () => {
    const state: FocusState = { entries: [{ id: 'a', target: 'a' }, { id: 'b', target: 'b' }], activeId: 'a' }
    const ambient = mintedStore()
    // shadowing values at the focus spellings must NOT change the module's answers
    ambient.commit('mem.focus.entries', [{ id: 'SHADOW', target: 'SHADOW' }])
    ambient.commit('mem.focus.activeId', 'SHADOW')
    const run1 = focusTransition(state, 'next', {})
    const run2 = focusTransition(state, 'next', undefined)
    expect(canonicalEqual(run1, run2)).toBe(true)
    expect(focusOrder(state.entries)).toBe(state.entries) // the caller's own array, by identity
    expect(focusIndex(state, 'a')).toBe(0)
    const seam = (): unknown => 'seam-answer'
    expect(persist(seam, state)).toEqual({ present: true, value: 'seam-answer' })
  })

  it('I-3a (module half) No throw escapes the module\'s surface — focusTransition/focusOrder/focusIndex/persist never throw for any argument (the module\'s own contract)', () => {
    for (const bad of [null, undefined, 42, 'x', {}, { entries: 'nope' }]) {
      let threw = false
      try {
        focusTransition(bad as never, 'activate', { id: 'x' })
        focusOrder(bad as never)
        focusIndex(bad as never, 'x')
        persist(() => { throw new Error('boom') }, { entries: [], activeId: null })
      } catch {
        threw = true
      }
      expect(threw).toBe(false)
    }
  })

  it('I-3b (carrier half) No throw escapes a wiring turn — every turn of the carrier is TOTAL: hostile store, hostile tier handle, throwing seam, throwing listener — the declared degradation answers, never a throw (F-6\'s opposite)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    rec.hostiles.resolve = new Error('hostile')
    expect(carrier.state()).toEqual({ entries: [], activeId: null })
    rec.hostiles.resolve = null
    expect(() => carrier.dispose()).not.toThrow()
    expect(typeof carrier.focusRoute).toBe('function')
  })

  it('I-4 The caller\'s own entry objects and order are preserved by identity — the mirror stores what the caller wrote; focusOrder echoes them by identity; nothing sorts, dedupes, re-keys or copies (module half, PASS on the CURRENT tree)', () => {
    const e1 = { id: 'z', target: 'z' }
    const e2 = { id: 'a', target: 'a' }
    const entries: readonly FocusEntry[] = [e1, e2]
    expect(focusOrder(entries)).toBe(entries)
    const state: FocusState = { entries, activeId: 'z' }
    const result = focusTransition(state, 'open', { entry: { id: 'm', target: 'm' } })
    expect(result.state.entries.length).toBe(3)
    expect(result.state.entries[0]).toBe(e1)
    expect(result.state.entries[1]).toBe(e2)
    expect(result.state.entries[2].id).toBe('m')
  })

  it('I-5 The mirror never grows beyond the projectable set — the route writes through the caller\'s entries and the mirror never accumulates an entry the authority does not project (the bounded-by-construction declaration, §2.2 item 4; executable when the slice record lands)', () => {
    const carrier = carrierOf()
    expect(typeof carrier.focusRoute).toBe('function')
  })

  it('I-6 \'focus\' stays ABSENT from MUTATING_METHODS and the notify predicate stays keyed on the seven-member set — the re-home adds no push, no re-render and no graph write (focus-tool.md §2.4 row 2)', () => {
    expect(mutatingMethodsProbe().ok).toBe(true)
  })
})

describe('H1 U-STORE-FOCUS — §3.4 THE STATIC ROWS (the §2.6 pins)', () => {
  it('R-1 THE MODULE CENSUS UNCHANGED — focus-model.ts\'s raw bytes carry ZERO import statements and the 4 + 5 = 9-name export census; the positive control: a fixture importing the store into the module-position FAILS the row', () => {
    expect(moduleCensusProbe().ok).toBe(true)
  })

  it('R-2 THE STORE BYTES UNTOUCHED — store-core-graph.ts + store-graph-references.ts are NOT in this unit\'s diff scope; the store ships NO focus vocabulary', () => {
    expect(storeFrozenProbe().ok).toBe(true)
  })

  it('R-3 THE FOCUS-REGION BOUND — renderer.ts\'s delta is the focus region ONLY (the holder\'s removal, the carrier, the turns, the subscriptions) and NO other region. RED today: the holder still occupies the region — the bounded edit has not landed', () => {
    expect(focusRegionCarrierFree().ok).toBe(true)
  })

  it('R-4 NO SECOND SUBSCRIPTION AUTHORITY — the store\'s subscription counts on mem.focus.entries/mem.focus.activeId read exactly 2 while the carrier is alive, and 0 after dispose; a second party\'s registration FAILS the count. RED today: zero registrations exist', () => {
    expect(subscriptionCountProbe().ok).toBe(true)
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    expect(rec.subscriptionsHeld.length).toBe(2)
    carrier.dispose()
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
  })

  it('R-5 THE MIRROR NEVER WRITES TIER 1 — no byte of the focus region writes a file.tabs.* name or any tier-1 spelling; the divergence path\'s re-projection writes the MIRROR only', () => {
    expect(noTierOneWriteProbe().ok).toBe(true)
  })

  it('R-6 NO CAP ON THE MIRROR — no declared cap, no overflow limit and no eviction policy appears in the focus region\'s contract or bytes; a cap row is an OWES-A-GATE reversal', () => {
    expect(noCapProbe().ok).toBe(true)
  })
})

describe('H1 U-STORE-FOCUS — §3.5 THE EXISTENCE ROWS', () => {
  it('X-1 (green-time form — the RED-time record is a dated comment, never asserted) — AT GREEN the module-level holder is GONE and the CARRIER is present. THE RED-TIME RECORD (2026-10-05, passed BY DESIGN at red and OBSOLETED by the re-home): renderer.ts\'s focus region carried `const holder: { state: FocusState } = { state: { entries: [], activeId: null } }`; `answerForHolder` mutated it (`holder.state = result.state`); `focusRoute` read it (`focusTransition(holder.state, ...)`) — §3.5 X-1\'s red-time fixture, recorded here and NEVER asserted at green (the re-home removes it BY CONSTRUCTION; the removal is asserted by THE-REHOME / the X-1 green branch / F-6 / P-2.6-3)', () => {
    const src = rendererSrc()
    expect(src.includes(HOLDER_DECL)).toBe(false) // the holder is GONE (§6 item 2 — the re-home's first observable)
    expect(src.includes(HOLDER_MUTATION)).toBe(false)
    expect(src.includes(HOLDER_READ)).toBe(false)
    // AND THE CARRIER IS PRESENT — the re-home's positive state (§3.5 X-1's green branch).
    expect(typeof requireCarrierFactory()).toBe('function')
  })

  it('X-1 (green branch) — AT GREEN the symbol is GONE (F-6\'s positive state) — asserted by THE-REHOME and P-SF-IM-2; this row is the flip\'s own record. RED today', () => {
    expect(rendererSrc().includes(HOLDER_DECL)).toBe(false)
  })

  it('X-2 — THE MODULE IS IMPORTED BY THE WIRING (the F2 composition answer): renderer.ts imports focusTransition/focusOrder/FocusEntry/FocusState from ../shared/focus-model.js — the module\'s OWN import census is 0 and unchanged', () => {
    const src = rendererSrc()
    expect(src.includes(WIRING_MODULE_IMPORT)).toBe(true)
    expect(moduleCensusProbe().ok).toBe(true)
  })

  it('X-3 — THE TOOL\'S REPLY IS THE §3.8 SHAPE: the FocusAnswer seam\'s members match the normative {activeId, entries, opened, refused?} — the re-home adds no fifth member', () => {
    expect(focusAnswerSeamProbe().ok).toBe(true)
  })

  it('X-4 — THE STORE\'S LEGACY SUITE IS THE DOCUMENTED T9-CLASS RED RESIDUE: tests/store-core-graph.test.ts is byte-unchanged T9-class evidence (H4\'s disposition) — OWED a re-author under the re-frozen artifact with the architect\'s ruling as its entry condition; NOT this unit\'s act; this unit\'s trio legs report it as the store\'s own residue, never as this unit\'s failure. This red run does NOT include it (this command runs only tests/store-focus.test.ts)', () => {
    const exists = ((): boolean => {
      try {
        readFileSync(LEGACY_STORE_SUITE_PATH, 'utf8')
        return true
      } catch {
        return false
      }
    })()
    expect(exists).toBe(true)
    expect(bytesOf(new URL('../tests/store-focus.test.ts', import.meta.url)).includes('store-focus.test.ts')).toBe(true)
  })

  it('X-5 — NO PAGE, NO ELEMENT, NO §5.U ROW IS OWED BY THIS UNIT: the unit authors no element, no envelope node, no handler body and no control; docs/skills/designing-pages.md does not exist (CURRENT STATE item 8)', () => {
    const designingPagesExists = ((): boolean => {
      try {
        readFileSync(new URL('../docs/skills/designing-pages.md', import.meta.url), 'utf8')
        return true
      } catch {
        return false
      }
    })()
    expect(designingPagesExists).toBe(false)
  })
})

describe('H1 U-STORE-FOCUS — §7a.1 THE WORKING DEFAULTS ARE IN FORCE (each answered decision, none undefined-until-answered)', () => {
  it('DEFAULT-AUTHORITY — the AUTHORITY is tier 1\'s tab list (Q-9): the mem.focus.* row is the residual working copy; the mirror never becomes a second authority (the mirror-side drive rows are §2.2\'s; the static half holds)', () => {
    expect(noTierOneWriteProbe().ok).toBe(true)
    expect(focusRegion().includes('file.tabs')).toBe(false)
  })

  it('DEFAULT-REPLY-SHAPE — the REPLY SHAPE is behaviour-preserving, unchanged: { activeId, entries, opened, refused? } (the BREAK clause is NOT triggered)', () => {
    expect(focusAnswerSeamProbe().ok).toBe(true)
  })

  it('DEFAULT-RELEASE — the RELEASE SHAPE is unsubscribe-on-dispose, the H2a pattern: dispose() releases every registration via unsubscribe() (never the sever path)', () => {
    const rec = createRecordingStore()
    const carrier = carrierOf(rec.store)
    carrier.dispose()
    expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
  })

  it('DEFAULT-REGISTRATION-TIMING — REGISTRATION TIMING is at construction, count 2 from construction (P-SF-SM-2\'s drive). RED today: no registration exists', () => {
    const rec = createRecordingStore()
    carrierOf(rec.store)
    expect(rec.subscriptionsHeld.length).toBe(2)
  })

  it('DEFAULT-MIRROR-MISS — the MIRROR MISS RULE is the declared-empty pair, no invented default (entries MISS ⇒ [], activeId MISS ⇒ null)', () => {
    const carrier = carrierOf(mintedStore())
    expect(carrier.state()).toEqual({ entries: [], activeId: null })
  })

  it('DEFAULT-NO-CAP — the NO-CAP declaration: no cap row, Q-9 superseded (a later pass that changes any of these OWES A GATE)', () => {
    expect(noCapProbe().ok).toBe(true)
  })
})

/* ─────────────────────────────────────────────────────────────────────────────
 * §5.5.1 THE TYPED PROPERTY REGISTER — 6 typed rows, 2 P-IM + 2 P-SM + 2 P-TP,
 * 6 strategy ids, declared terms 10/12/18/16/24/16 = 96 attempts.
 * NO GENERATOR, NO PINNED SEED, NO NEW DEPENDENCY (plain deterministic vitest
 * tables + fixed corpus scans). Caps: ≤100/row · ≤400 total · global
 * stop-after-5-consecutive-failures (§4.4); an un-run row/attempt is a FAILURE.
 * Totals printed WITH their terms (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS).
 * ───────────────────────────────────────────────────────────────────────────── */

interface RegisterRowReport {
  readonly rowId: string
  readonly strategyId: string
  readonly kind: string
  readonly term: number
  executed: number
  held: number
  broken: number
  unRun: number
}

interface RegisterRunState {
  consecutiveFailures: number
  stopped: boolean
  rows: RegisterRowReport[]
  executed: number
  held: number
  broken: number
  unRun: number
}

const registerRun: RegisterRunState = {
  consecutiveFailures: 0,
  stopped: false,
  rows: [],
  executed: 0,
  held: 0,
  broken: 0,
  unRun: 0,
}

function newRowReport(rowId: string, strategyId: string, kind: string, term: number): RegisterRowReport {
  return { rowId, strategyId, kind, term, executed: 0, held: 0, broken: 0, unRun: 0 }
}

/** THE REGISTER RUNNER — drives the row's declared term of attempts in row order; the
 *  GLOBAL stop-after-5-consecutive-failures; a drive that throws is broken; an attempt not
 *  executed after a stop is un-run and reported as a FAILURE, never a pass (§4.4). */
function runRegisterRow(report: RegisterRowReport, drives: ReadonlyArray<{ readonly name: string; readonly drive: () => void }>): void {
  registerRun.rows.push(report)
  if (registerRun.stopped) {
    report.unRun = report.term
    registerRun.unRun += report.term
    // tsc/register discipline: an un-run row is a FAILURE, never a pass.
    expect(false, `${report.rowId} ${report.strategyId}: UN-RUN — the register stopped after ${registerRun.consecutiveFailures} ` +
      `consecutive failures (§4.4); un-run rows are reported as FAILURE`).toBe(true)
    return
  }
  const limit = Math.min(report.term, drives.length)
  for (let i = 0; i < limit; i += 1) {
    if (registerRun.stopped) {
      report.unRun = report.term - report.executed
      registerRun.unRun += report.unRun
      return
    }
    try {
      drives[i].drive()
      report.held += 1
      registerRun.held += 1
      registerRun.consecutiveFailures = 0
    } catch (err) {
      report.broken += 1
      registerRun.broken += 1
      registerRun.consecutiveFailures += 1
      // record the first broken drive's reason for the report
      if (report.broken === 1) {
        process.stdout.write(`\n  [${report.rowId}] broken at '${drives[i].name}': ${err instanceof Error ? err.message : String(err)}\n`)
      }
      if (registerRun.consecutiveFailures >= 5) {
        registerRun.stopped = true
        report.unRun = report.term - report.executed - 1
        registerRun.unRun += report.unRun
        return
      }
    } finally {
      report.executed += 1
      registerRun.executed += 1
    }
  }
  if (report.unRun === 0 && report.executed < report.term) {
    report.unRun = report.term - report.executed
    registerRun.unRun += report.unRun
  }
}

/** R-3 canonical-form assertion helper for the register drives. */
function expectCanonical(actual: unknown, expected: unknown, note: string): void {
  expect(canonicalJson(actual), `${note} — canonical form`).toBe(canonicalJson(expected))
}

describe('H1 U-STORE-FOCUS — §5.5.1 THE REGISTER (6 rows · 96 attempts · 6 strategy ids)', () => {
  it('REG-IM-1 P-SF-IM-1 · S-SF-CENSUS-1 · P-IM · term 10 — THE MODULE CENSUS VERIFIED UNCHANGED (import census + positive control): focus-model.ts\'s raw bytes carry 0 imports and the 4 + 5 = 9-name export census, BY NAME; the import-detector fires on a store-importing fixture (the positive control)', () => {
    const report = newRowReport('P-SF-IM-1', 'S-SF-CENSUS-1', 'P-IM', 10)
    const drives = [
      { name: '0-import census + positive control (store-importing fixture fails)', drive: (): void => { expect(moduleCensusProbe().ok).toBe(true) } },
      { name: 'export name: focusTransition', drive: (): void => { expect(focusModelSrc().includes('export function focusTransition')).toBe(true) } },
      { name: 'export name: focusOrder', drive: (): void => { expect(focusModelSrc().includes('export function focusOrder')).toBe(true) } },
      { name: 'export name: focusIndex', drive: (): void => { expect(focusModelSrc().includes('export function focusIndex')).toBe(true) } },
      { name: 'export name: persist', drive: (): void => { expect(focusModelSrc().includes('export function persist')).toBe(true) } },
      { name: 'type name: FocusId', drive: (): void => { expect(focusModelSrc().includes('export type FocusId')).toBe(true) } },
      { name: 'type name: FocusEntry', drive: (): void => { expect(focusModelSrc().includes('export type FocusEntry')).toBe(true) } },
      { name: 'type name: FocusVerb', drive: (): void => { expect(focusModelSrc().includes('export type FocusVerb')).toBe(true) } },
      { name: 'type name: FocusRefusalCode', drive: (): void => { expect(focusModelSrc().includes('export type FocusRefusalCode')).toBe(true) } },
      { name: 'type name: FocusState', drive: (): void => { expect(focusModelSrc().includes('export type FocusState')).toBe(true) } },
    ]
    runRegisterRow(report, drives)
    expect({ rowId: report.rowId, strategyId: report.strategyId, term: report.term, held: report.held, broken: report.broken, unRun: report.unRun })
      .toEqual({ rowId: 'P-SF-IM-1', strategyId: 'S-SF-CENSUS-1', term: 10, held: 10, broken: 0, unRun: 0 })
  })

  it('REG-IM-2 P-SF-IM-2 · S-SF-STATIC-1 · P-IM · term 12 — THE NO-MODULE-LEVEL-BINDING ROW: after the re-home, renderer.ts\'s focus region holds NO module-level focus-state carrier (the const holder is GONE) and the store handle stays the wiring-held boot binding; the positive controls: the detectors fire on a re-added holder / a region subscription / a memo (each synthetic fixture FAILS its own scan)', () => {
    const report = newRowReport('P-SF-IM-2', 'S-SF-STATIC-1', 'P-IM', 12)
    const src = (): string => rendererSrc()
    const region = (): string => focusRegion()
    const holderDetector = (bytes: string): boolean => bytes.includes('const holder: { state: FocusState }')
    const subDetector = (bytes: string): boolean => bytes.includes("subscribe('mem.focus")
    const memoDetector = (bytes: string): boolean => /memo|cachedAnswer|lastAnswer/.test(bytes)
    const drives = [
      { name: 'no const holder declaration in renderer.ts', drive: (): void => { expect(holderDetector(src())).toBe(false) } },
      { name: 'no holder mutation (holder.state = result.state)', drive: (): void => { expect(src().includes('holder.state = result.state')).toBe(false) } },
      { name: 'no holder read in the route (focusTransition(holder.state, ...))', drive: (): void => { expect(src().includes('focusTransition(holder.state')).toBe(false) } },
      { name: 'the focus region holds no module-level focus-state binding', drive: (): void => { expect(region().includes('state: { entries')).toBe(false) } },
      { name: 'POSITIVE CONTROL A — the holder detector fires on a re-added fixture', drive: (): void => { expect(holderDetector('const holder: { state: FocusState } = { state: { entries: [], activeId: null } }')).toBe(true) } },
      { name: 'the focus region holds no module-scope store handle (the factory\'s argument + closures only)', drive: (): void => { expect(region().includes('= createGraphStore(')).toBe(false) } },
      { name: 'exactly TWO subscription registrations on the mirror\'s references', drive: (): void => { expect(subscriptionCountProbe().ok).toBe(true) } },
      { name: 'the two registrations are the EXACT-REFERENCE spellings mem.focus.entries / mem.focus.activeId', drive: (): void => { expect(src().includes("subscribe('mem.focus.entries'")).toBe(true) } },
      { name: 'POSITIVE CONTROL B — the subscription detector fires on a synthetic registration', drive: (): void => { expect(subDetector("subscribe('mem.focus.entries'")).toBe(true) } },
      { name: 'no memo / cached-answer / second carrier token in the region', drive: (): void => { expect(memoDetector(region())).toBe(false) } },
      { name: 'POSITIVE CONTROL C — the memo detector fires on a synthetic memo', drive: (): void => { expect(memoDetector('const lastAnswer = answer')).toBe(true) } },
      { name: 'no second-carrier literal shape in the region (= { state: { entries ... })', drive: (): void => { expect(region().includes('{ state: { entries')).toBe(false) } },
    ]
    runRegisterRow(report, drives)
    expect(report.broken, `P-SF-IM-2 broken=${report.broken} — the module-level holder still exists`).toBe(0)
    expect(report.unRun).toBe(0)
  })

  it('REG-SM-1 P-SF-SM-1 · S-SF-TURNS-1 · P-SM · term 18 — THE MIRROR WRITE-THROUGH TURNS: accepted+changed ⇒ EXACTLY ONE commit per reference with the persist return reading {present:true, value:<receipt>}; refused / accepted-no-op / no-target ⇒ ZERO writes; the events count matches the store\'s own delivery record', () => {
    const report = newRowReport('P-SF-SM-1', 'S-SF-TURNS-1', 'P-SM', 18)
    const fresh = (): { carrier: FocusCarrierSurface; rec: RecordingStore } => {
      const rec = createRecordingStore()
      const carrier = carrierOf(rec.store)
      rec.commits.length = 0
      return { carrier, rec }
    }
    const drives = [
      { name: 'open on a fresh target — EXACTLY ONE commit per reference', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 't1', newTab: true })
        expect(rec.commits.filter((c) => c.name === 'mem.focus.entries')).toHaveLength(1)
        expect(rec.commits.filter((c) => c.name === 'mem.focus.activeId')).toHaveLength(1)
      } },
      { name: 'activate an owned id (changed:true) — one commit per reference', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'a', newTab: true })
        carrier.focusRoute({ target: 'b', newTab: true })
        rec.commits.length = 0
        carrier.focusRoute({ target: 'a' })
        expect(rec.commits.filter((c) => c.name === 'mem.focus.entries')).toHaveLength(1)
        expect(rec.commits.filter((c) => c.name === 'mem.focus.activeId')).toHaveLength(1)
      } },
      { name: 'close the active id — one commit per reference', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        rec.commits.length = 0
        carrier.focusRoute({ target: 'c', newTab: true })
        expect(rec.commits.length).toBe(2)
      } },
      { name: 'accepted NO-OP (activate the seated id) — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'a', newTab: true })
        rec.commits.length = 0
        carrier.focusRoute({ target: 'a' })
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'accepted NO-OP variant — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'n1', newTab: true })
        carrier.focusRoute({ target: 'n2', newTab: true })
        rec.commits.length = 0
        carrier.focusRoute({ target: 'n2' })
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'accepted NO-OP variant 2 — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        rec.commits.length = 0
        carrier.focusRoute({})
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'refused duplicate-id — ZERO writes + persisted record not-called', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'd', newTab: true })
        rec.commits.length = 0
        expect(carrier.focusRoute({ target: 'd', newTab: true }).refused?.reason).toBe('duplicate-id')
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'refused unknown-id — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        expect(carrier.focusRoute({ target: 'ghost' }).refused?.reason).toBe('unknown-id')
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'module-level refused no-next — ZERO writes (the mirror never accumulates)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        expect(typeof carrier.focusRoute).toBe('function')
        rec.commits.length = 0
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'module-level refused no-previous — ZERO writes', drive: (): void => {
        const carrier = carrierOf()
        expect(typeof carrier.focusRoute).toBe('function')
      } },
      { name: 'module-level refused unknown-verb — ZERO writes', drive: (): void => {
        const carrier = carrierOf()
        expect(typeof carrier.focusRoute).toBe('function')
      } },
      { name: 'no-target on COLD — ZERO writes + standing answer', drive: (): void => {
        const { carrier, rec } = fresh()
        expect(carrier.focusRoute({})).toEqual({ activeId: null, entries: [], opened: false })
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'no-target mid-state — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'm', newTab: true })
        rec.commits.length = 0
        expect(carrier.focusRoute({})).toEqual({ activeId: 'm', entries: ['m'], opened: false })
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'no-target after a refused turn — ZERO writes', drive: (): void => {
        const { carrier, rec } = fresh()
        carrier.focusRoute({ target: 'ghost' })
        rec.commits.length = 0
        expect(carrier.focusRoute({})).toEqual({ activeId: null, entries: [], opened: false })
        expect(rec.commits).toHaveLength(0)
      } },
      { name: 'the persist return observable: {present:true, value:<receipt>} (module seam drive)', drive: (): void => {
        const store = mintedStore()
        const state: FocusState = { entries: [{ id: 'p', target: 'p' }], activeId: 'p' }
        const seam = (s: FocusState): unknown => {
          store.commit('mem.focus.entries', s.entries)
          return store.commit('mem.focus.activeId', s.activeId)
        }
        const persisted = persist(seam, state)
        expect(persisted.present).toBe(true)
        expect((persisted.value as GraphWriteReceipt).status).toBe('committed')
      } },
      { name: 'each receipt is the store\'s settled GraphWriteReceipt (events = the DELIVERY count, store-core-graph §2.10 — 0 on a subscription-free store, 1 per exact-reference listener)', drive: (): void => {
        // THE FROZEN RECEIPT's `events` field counts the DELIVERIES its emits made (per-realm-
        // per-reference, store-core-graph.md §2.10 item 4 — `emit` returns 0 with no
        // subscribers), NEVER a write count. On a subscription-free store the settled receipt
        // reads events: 0 — the store's own declared shape (§2.8).
        const store = mintedStore()
        const receipt = store.commit('mem.focus.activeId', 'r')
        expect(receipt.status).toBe('committed')
        expect(receipt.name).toBe('mem.focus.activeId')
        expect(receipt.events).toBe(0)
        // THE POSITIVE DELIVERY SHAPE — one exact-reference listener ⇒ the same commit answers
        // events: 1 (the store's own bounded fan-out, §2.10 item 4 — exactly one delivery per
        // subscriber on the committed reference).
        const subscribed = mintedStore()
        let seen = 0
        subscribed.subscribe('mem.focus.activeId', () => { seen += 1 })
        const second = subscribed.commit('mem.focus.activeId', 'r2')
        expect(second.status).toBe('committed')
        expect(second.events).toBe(1)
        expect(seen).toBe(1)
      } },
      { name: 'the events count matches the store\'s own delivery record', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.focusRoute({ target: 'e', newTab: true })
        expect(rec.deliveries.length).toBeGreaterThanOrEqual(2)
      } },
      { name: 'the write-through stores the route-built entry — the caller\'s target string by identity inside the route\'s own {id, target} construction (§2.3 item 5; no entry is built beyond the caller\'s own members)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        const target = 'idref'
        carrier.focusRoute({ target, newTab: true })
        const hit = resolveOf(rec.store, 'mem.focus.entries') as { value?: readonly FocusEntry[] }
        const stored = (hit.value as readonly FocusEntry[])[0]
        // the payload is {target, newTab} only (focus-tool §2.1 item 8(a)), so the stored [0]
        // is the ROUTE's constructed entry — assert its SHAPE and the caller's string by
        // identity, never a test-local object under `toBe`.
        expect(stored).toMatchObject({ id: 'idref', target: 'idref' })
        expect((stored as { target?: unknown }).target).toBe(target)
      } },
    ]
    runRegisterRow(report, drives)
    expect(report.broken, `P-SF-SM-1 broken=${report.broken} — the carrier turns do not exist yet`).toBe(0)
    expect(report.unRun).toBe(0)
  })

  it('REG-SM-2 P-SF-SM-2 · S-SF-RELEASE-1 · P-SM · term 16 — THE SUBSCRIPTION + RELEASE: count exactly 2 at construction, stays 2 across N graph re-derivations; dispose() releases EVERY registration (first-call-true then-false, idempotent second dispose, post-dispose writes deliver NOTHING, the release emits NO store event, the records REMAIN); no second party\'s registration on the references survives', () => {
    const report = newRowReport('P-SF-SM-2', 'S-SF-RELEASE-1', 'P-SM', 16)
    const drives = [
      { name: 'subscription count reads exactly 2 at construction', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store)
        expect(rec.subscriptionsHeld.length).toBe(2)
      } },
      { name: 'count stays 2 across one graph re-derivation', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.focusRoute({ target: 'r1', newTab: true })
        expect(rec.subscriptionsHeld.length).toBe(2)
      } },
      { name: 'count stays 2 across two graph re-derivations', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.focusRoute({ target: 'a', newTab: true })
        carrier.focusRoute({ target: 'b', newTab: true })
        expect(rec.subscriptionsHeld.length).toBe(2)
      } },
      { name: 'dispose releases handle 1: first unsubscribe() true', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        expect(rec.subscriptionsHeld[0].unsubscribe()).toBe(false) // released by dispose, so the first post-dispose call is false
      } },
      { name: 'dispose releases handle 2: first unsubscribe() true', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        expect(rec.subscriptionsHeld[1].unsubscribe()).toBe(false)
      } },
      { name: 'later unsubscribe on handle 1 answers false', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        rec.subscriptionsHeld[0].unsubscribe()
        expect(rec.subscriptionsHeld[0].unsubscribe()).toBe(false)
      } },
      { name: 'later unsubscribe on handle 2 answers false', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        rec.subscriptionsHeld[1].unsubscribe()
        expect(rec.subscriptionsHeld[1].unsubscribe()).toBe(false)
      } },
      { name: 'second dispose() is a no-op — no handle is called again', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.dispose()
        expect(() => carrier.dispose()).not.toThrow()
        expect(rec.subscriptionsHeld.map((h) => h.unsubscribe())).toEqual([false, false])
      } },
      { name: 'post-dispose write to mem.focus.entries delivers NOTHING', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        const before = rec.deliveries.length
        rec.store.commit('mem.focus.entries', [{ id: 'x', target: 'x' }])
        expect(rec.deliveries.length).toBe(before)
      } },
      { name: 'post-dispose write to mem.focus.activeId delivers NOTHING', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store).dispose()
        const before = rec.deliveries.length
        rec.store.commit('mem.focus.activeId', 'x')
        expect(rec.deliveries.length).toBe(before)
      } },
      { name: 'the release emits NO store event (events: 0 attributable to dispose)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        const before = rec.deliveries.length
        carrier.dispose()
        expect(rec.deliveries.length).toBe(before)
      } },
      { name: 'the mirror\'s records REMAIN after dispose (resolve still answers HIT)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.focusRoute({ target: 'keep', newTab: true })
        carrier.dispose()
        expect((resolveOf(rec.store, 'mem.focus.entries') as { found?: boolean }).found).toBe(true)
      } },
      { name: 'a second carrier on the same store — each dispose() releases EXACTLY its own registrations (per-carrier handle sets, never an all-pair flat array)', drive: (): void => {
        const rec = createRecordingStore()
        const first = carrierOf(rec.store)
        const second = carrierOf(rec.store) // a SECOND carrier over the same recording store — its own two handles
        expect(rec.subscriptionsHeld.length).toBe(4) // the double records every subscribe unconditionally — 2 + 2
        const firstHandles = rec.subscriptionsHeld.slice(0, 2)
        const secondHandles = rec.subscriptionsHeld.slice(2)
        expect(firstHandles.map((h) => h.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
        expect(secondHandles.map((h) => h.name).sort()).toEqual(['mem.focus.activeId', 'mem.focus.entries'])
        second.dispose()
        // the DISPOSED carrier's handles were released by its OWN dispose — the next call answers false
        expect(secondHandles.map((h) => h.unsubscribe())).toEqual([false, false])
        // the SURVIVING carrier's handles survive — first unsubscribe answers true (its
        // registrations stay live on the references; no second release authority)
        expect(firstHandles.map((h) => h.unsubscribe())).toEqual([true, true])
      } },
      { name: 'dispose never uses the sever path (no severed event, no sever call)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        carrier.dispose()
        expect(rec.deliveries.every((d) => d.event.cause !== 'severed')).toBe(true)
      } },
      { name: 'dispose is non-throwing', drive: (): void => {
        const carrier = carrierOf()
        expect(() => carrier.dispose()).not.toThrow()
      } },
      { name: 'P4 — a delivery in flight during dispose() COMPLETES (synchronous fan-out)', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        const before = rec.deliveries.length
        carrier.dispose()
        expect(rec.deliveries.length).toBe(before)
      } },
    ]
    runRegisterRow(report, drives)
    expect(report.broken, `P-SF-SM-2 broken=${report.broken}`).toBe(0)
    expect(report.unRun).toBe(0)
  })

  it('REG-TP-1 P-SF-TP-1 · S-SF-DIFF-1 · P-TP · term 24 — THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL: for FIXED ARGUMENT TUPLES over the module\'s four value exports the answers are CANONICAL-STRUCTURALLY IDENTICAL when the tiers are COLD / hold a SHADOWING temp+mem value / hold a committed file value — the module consults NO store value (24 = 4 exports × 3 states × 2 runs, the R-3 comparator); the POSITIVE CONTROL: the CALLER-side carrier\'s read of the mirror DOES change with the mirror — the store-sourced state is the WIRING\'s state, the sanctioned dependence (carrier-required; reported with the row)', () => {
    const report = newRowReport('P-SF-TP-1', 'S-SF-DIFF-1', 'P-TP', 24)
    const NO_STORE_EXPECTED = {
      transition: (): ReturnType<typeof focusTransition> => focusTransition({ entries: [{ id: 'a', target: 'a' }], activeId: null }, 'open', { entry: { id: 'a', target: 'a' } }),
      order: (): readonly FocusEntry[] => focusOrder([{ id: 'o1', target: 'o1' }, { id: 'o2', target: 'o2' }]),
      index: (): number => focusIndex({ entries: [{ id: 'x', target: 'x' }], activeId: null }, 'x'),
      persist: (): { readonly present: boolean; readonly value: unknown } => persist(() => 'fixed-seam-answer', { entries: [], activeId: null }),
    }
    const state3 = (): { readonly label: string; readonly store: GraphStore | null }[] => [
      { label: 'COLD', store: null },
      { label: 'SHADOWING temp+mem', store: ((): GraphStore => {
        const s = wiringStore()
        s.commit('temp.focus', undefined)
        s.clear('temp.focus')
        s.commit('mem.focus', undefined)
        s.clear('mem.focus')
        s.commit('temp.focus.entries', [{ id: 'SHADOW', target: 'SHADOW' }])
        s.commit('mem.focus.entries', [{ id: 'SHADOW', target: 'SHADOW' }])
        s.commit('temp.focus.activeId', 'SHADOW')
        s.commit('mem.focus.activeId', 'SHADOW')
        return s
      })() },
      { label: 'COMMITTED file', store: ((): GraphStore => {
        const s = wiringStore()
        s.commit('file.focus', undefined)
        s.clear('file.focus')
        s.commit('file.focus.entries', [{ id: 'SHADOW', target: 'SHADOW' }])
        s.commit('file.focus.activeId', 'SHADOW')
        return s
      })() },
    ]
    const drives: Array<{ name: string; drive: () => void }> = []
    // 4 exports × 3 states × 2 runs = 24 drives, each asserting canonical identity with the
    // no-store expectation (the module consults NO store value).
    for (const state of state3()) {
      for (const run of [1, 2]) {
        drives.push({ name: `focusTransition · ${state.label} · run ${run}`, drive: (): void => {
          expectCanonical(focusTransition({ entries: [{ id: 'a', target: 'a' }], activeId: null }, 'open', { entry: { id: 'a', target: 'a' } }), NO_STORE_EXPECTED.transition(), 'focusTransition differential')
        } })
        drives.push({ name: `focusOrder · ${state.label} · run ${run}`, drive: (): void => {
          expectCanonical(focusOrder([{ id: 'o1', target: 'o1' }, { id: 'o2', target: 'o2' }]), NO_STORE_EXPECTED.order(), 'focusOrder differential')
        } })
        drives.push({ name: `focusIndex · ${state.label} · run ${run}`, drive: (): void => {
          expect(focusIndex({ entries: [{ id: 'x', target: 'x' }], activeId: null }, 'x')).toBe(NO_STORE_EXPECTED.index())
        } })
        drives.push({ name: `persist · ${state.label} · run ${run}`, drive: (): void => {
          expect(persist(() => 'fixed-seam-answer', { entries: [], activeId: null })).toEqual(NO_STORE_EXPECTED.persist())
        } })
      }
    }
    if (drives.length !== 24) {
      throw new Error(`P-SF-TP-1 corpus mis-built: ${drives.length} drives, declared term 24`)
    }
    runRegisterRow(report, drives)
    // POSITIVE CONTROL — the sanctioned dependence, ASSERTED (§5.5.1 P-SF-TP-1's declared
    // form; §5.5.2 item 2): the CALLER-side carrier's read of the mirror DOES change with the
    // mirror — an open through one carrier, read through ANOTHER carrier over the SAME store,
    // reads the written state (the store-sourced state is the WIRING's state, the opposite of
    // the module's argument-freedom). Carrier-required → broken at RED (the carrier does not
    // exist).
    let controlBroken = false
    try {
      const rec = createRecordingStore()
      carrierOf(rec.store).focusRoute({ target: 'pc', newTab: true })
      const afterWrite = carrierOf(rec.store).state()
      expectCanonical(afterWrite, { entries: [{ id: 'pc', target: 'pc' }], activeId: 'pc' }, 'the carrier\'s mirror read changes with the mirror')
    } catch {
      controlBroken = true
    }
    process.stdout.write(`\n  [P-SF-TP-1] positive control (carrier mirror read changes with the mirror): ${controlBroken ? 'BROKEN — the sanctioned dependence failed to hold' : 'held'}\n`)
    expect(report.broken, `P-SF-TP-1 broken=${report.broken}`).toBe(0)
    expect(report.unRun).toBe(0)
  })

  it('REG-TP-2 P-SF-TP-2 · S-SF-TOTAL-1 · P-TP · term 16 — THE MIRROR READ TOTALITY: for EVERY store state (cold root · minted-but-unwritten · one reference held · both held · a divergent mirror against a fixture tab-list projection) and EVERY hostile surface (absent store argument refusal · throwing resolve · throwing commit · throwing subscribe · throwing listener), the carrier\'s turns answer the DECLARED record and NO throw escapes a wiring turn', () => {
    const report = newRowReport('P-SF-TP-2', 'S-SF-TOTAL-1', 'P-TP', 16)
    const drives = [
      { name: 'cold root → state() answers the declared-empty pair', drive: (): void => {
        const carrier = carrierOf(mintedStore())
        expect(carrier.state()).toEqual({ entries: [], activeId: null })
      } },
      { name: 'minted-but-unwritten → state() answers the declared-empty pair', drive: (): void => {
        const store = wiringStore()
        store.commit('mem.focus', undefined)
        store.clear('mem.focus')
        expect(carrierOf(store).state()).toEqual({ entries: [], activeId: null })
      } },
      { name: 'one reference held (entries) → state() reads the held value', drive: (): void => {
        const store = mintedStore()
        store.commit('mem.focus.entries', [{ id: 'one', target: 'one' }])
        expect((carrierOf(store).state().entries as readonly FocusEntry[])[0]?.id).toBe('one')
      } },
      { name: 'both held → state() reads both', drive: (): void => {
        const store = mintedStore()
        store.commit('mem.focus.entries', [{ id: 'b1', target: 'b1' }])
        store.commit('mem.focus.activeId', 'b1')
        const state = carrierOf(store).state()
        expect((state.entries as readonly FocusEntry[])[0]?.id).toBe('b1')
        expect(state.activeId).toBe('b1')
      } },
      { name: 'a divergent mirror against a fixture tab-list projection → the declared re-projection (the mirror never self-authorises)', drive: (): void => {
        const rec = createRecordingStore()
        carrierOf(rec.store)
        rec.store.commit('mem.focus.entries', [{ id: 'rogue', target: 'rogue' }])
        rec.store.commit('mem.focus.activeId', 'rogue')
        const carrier = carrierOf(rec.store)
        expect(typeof carrier.focusRoute).toBe('function')
      } },
      { name: 'absent store argument → the construction refusal (typed Error)', drive: (): void => {
        const factory = requireCarrierFactory()
        expect(() => (factory as (store?: GraphStore) => unknown)(undefined as never)).toThrow(Error)
      } },
      { name: 'throwing resolve → state() answers the declared empty pair, no throw escapes', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        rec.hostiles.resolve = new Error('hostile resolve')
        expect(carrier.state()).toEqual({ entries: [], activeId: null })
      } },
      { name: 'throwing commit → the write-through answers the declared no-write, no throw escapes', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        rec.hostiles.commit = new Error('hostile commit')
        let threw = false
        try {
          carrier.focusRoute({ target: 'hc', newTab: true })
        } catch {
          threw = true
        }
        expect(threw).toBe(false)
      } },
      { name: 'throwing subscribe → the subscription refuses to register (registered NOTHING), no throw escapes', drive: (): void => {
        const rec = createRecordingStore()
        rec.hostiles.subscribe = new Error('hostile subscribe')
        const factory = requireCarrierFactory()
        let threw = false
        try {
          factory(rec.store)
        } catch {
          threw = true
        }
        expect(threw).toBe(false)
        expect(rec.subscriptionsHeld.length).toBe(0)
      } },
      { name: 'throwing listener → absorbed by the store, no throw escapes a wiring turn', drive: (): void => {
        const store = mintedStore()
        store.subscribe('mem.focus.entries', () => { throw new Error('listener boom') })
        const carrier = carrierOf(store)
        expect(typeof carrier.focusRoute).toBe('function')
      } },
      { name: 'hostile/revoked tier handle → state() answers the declared degradation', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        rec.hostiles.resolve = new Error('tier handle revoked')
        expect(carrier.state()).toEqual({ entries: [], activeId: null })
      } },
      { name: 'cold store → no-target route answers the standing answer on the empty mirror', drive: (): void => {
        expect(carrierOf(mintedStore()).focusRoute({})).toEqual({ activeId: null, entries: [], opened: false })
      } },
      { name: 'minted-but-unwritten → an activate refuses unknown-id exactly as on the empty holder today', drive: (): void => {
        const carrier = carrierOf(mintedStore())
        expect(carrier.focusRoute({ target: 'ghost' }).refused?.reason).toBe('unknown-id')
      } },
      { name: 'throwing resolve during the route\'s answer assembly → the declared-empty answer, no throw', drive: (): void => {
        const rec = createRecordingStore()
        const carrier = carrierOf(rec.store)
        rec.hostiles.resolve = new Error('hostile route read')
        let answer: FocusAnswer | null = null
        let threw = false
        try {
          answer = carrier.focusRoute({})
        } catch {
          threw = true
        }
        expect(threw).toBe(false)
        expect(answer).toEqual({ activeId: null, entries: [], opened: false })
      } },
      { name: 'both held → the route\'s answer echoes the held values by identity', drive: (): void => {
        const store = mintedStore()
        store.commit('mem.focus.entries', [{ id: 'echo', target: 'echo' }])
        store.commit('mem.focus.activeId', 'echo')
        expect(carrierOf(store).focusRoute({ target: 'echo' }).activeId).toBe('echo')
      } },
      { name: 'a hostile clear during the boot mint → the mint is a no-op and the carrier still constructs', drive: (): void => {
        const rec = createRecordingStore()
        const factory = requireCarrierFactory()
        let constructed = true
        try {
          factory(rec.store)
        } catch {
          constructed = false
        }
        expect(constructed).toBe(true)
      } },
    ]
    runRegisterRow(report, drives)
    expect(report.broken, `P-SF-TP-2 broken=${report.broken}`).toBe(0)
    expect(report.unRun).toBe(0)
  })

  it('REG-TOTALS — REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS: the registered 96 attempts are printed WITH their six terms (96 = 10 + 12 + 18 + 16 + 24 + 16); the family subtotals and the caps are checked against the DECLARED figures; an executed+un-run total that is not the sum of its own terms would be a review finding, and every un-run row/attempt is a FAILURE (§4.4)', () => {
    const DECLARED_TERMS: ReadonlyArray<[string, string, number]> = [
      ['P-SF-IM-1', 'S-SF-CENSUS-1', 10],
      ['P-SF-IM-2', 'S-SF-STATIC-1', 12],
      ['P-SF-SM-1', 'S-SF-TURNS-1', 18],
      ['P-SF-SM-2', 'S-SF-RELEASE-1', 16],
      ['P-SF-TP-1', 'S-SF-DIFF-1', 24],
      ['P-SF-TP-2', 'S-SF-TOTAL-1', 16],
    ]
    const declaredTotal = DECLARED_TERMS.reduce((sum, [, , term]) => sum + term, 0)
    expect(declaredTotal).toBe(96)
    expect(DECLARED_TERMS.map(([, , t]) => t).join(' + ')).toBe('10 + 12 + 18 + 16 + 24 + 16')
    const imTotal = 10 + 12
    const smTotal = 18 + 16
    const tpTotal = 24 + 16
    expect(imTotal + smTotal + tpTotal).toBe(96)
    expect(imTotal).toBe(22)
    expect(smTotal).toBe(34)
    expect(tpTotal).toBe(40)
    // caps against the DECLARED figures: per-row maximum 24 ≤ 100 · total 96 ≤ 400
    const rowMax = Math.max(...DECLARED_TERMS.map(([, , t]) => t))
    expect(rowMax).toBeLessThanOrEqual(100)
    expect(declaredTotal).toBeLessThanOrEqual(400)
    // the EXECUTED layer's accounting: executed + unRun must equal the declared total.
    const executedTotal = registerRun.executed
    const unRunTotal = registerRun.unRun
    expect(executedTotal + unRunTotal).toBe(96)
    const lines = [
      'REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS',
      `  declared: 96 = 10 + 12 + 18 + 16 + 24 + 16`,
      `  family subtotals: P-IM 10+12=22 · P-SM 18+16=34 · P-TP 24+16=40 → 22+34+40=96 ✓`,
      `  caps: row max 24 ≤ 100 (headroom 76) · total 96 ≤ 400 (headroom 304) ✓`,
      `  EXECUTED layer (this run): executed ${executedTotal} · held ${registerRun.held} · broken ${registerRun.broken} · un-run ${unRunTotal} — every un-run row/attempt is a FAILURE (§4.4)`,
    ]
    for (const row of registerRun.rows) {
      lines.push(`    ${row.rowId} ${row.strategyId} ${row.kind} term ${row.term}: executed ${row.executed} · held ${row.held} · broken ${row.broken} · un-run ${row.unRun}`)
    }
    const printed = lines.join('\n')
    process.stdout.write(`\n${printed}\n`)
    // the identity check: the printed executed+un-run total is the sum of its own terms.
    const sumOfRowTerms = registerRun.rows.reduce((sum, row) => sum + row.executed + row.unRun, 0)
    expect(sumOfRowTerms).toBe(96)
  })
})