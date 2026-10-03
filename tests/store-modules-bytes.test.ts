// ---------------------------------------------------------------------------
// H2a · U-STORE-MODULES-BYTES — the RED SET (RCA-1: tests first, reported
// failing, before any implementation). Contract: docs/specs/store-modules-bytes.md
// (760 lines, read in full). TestWriter wall: write ONLY this file; touch no
// src/** byte, no spec, no other test file.
//
// THE STATE MACHINE THIS FILE DRIVES (enumerated before the rows, per the
// TestWriter discipline):
//
//   §3.1 VALID / HAPPY STATES (store-carrying families, ADDITIVE):
//     M-LS-1  list host construciton registers its subscription (§2.4 item 1)
//     M-LS-2  the record writes land — mem.list.<hostId>.order / .node.<key>
//             via commit(…, {onRepeat:'edit'}) (§2.1 item 2)
//     M-LS-3  a store-sourced order change re-invokes the host (§2.4 items 2/3)
//     M-LS-4  dispose() releases — P1/P2/P5 (§2.2)
//     M-LS-5  dispose-then-use, records remain — P3/P6 (§2.2)
//     M-SS-1  slot construciton registers ONE subscription PER DECLARED KEY
//     M-SS-2  the placement write lands; the container stays INJECTED (§2.3)
//     M-SS-3  a store-sourced placement change re-invokes FOR THAT KEY ONLY
//     M-SS-4  dispose() releases every key — P1/P2/P5
//     M-SS-5  dispose-then-use, records remain — P3/P6
//
//   §3.2 DOCUMENTED FAIL-STATES (the LEAK'S THREE-ARM DETECTION + boundaries):
//     F-LS-1  LS-LEAK arm (a): DELIVERY AFTER DISPOSE (>0 increase) FAILS
//     F-LS-2  LS-LEAK arm (b): THE HANDLE SHAPE — non-empty active-set after
//             dispose / a first unsubscribe answering false / a never-called
//             handle FAILS
//     F-LS-3  LS-LEAK arm (c): THE EVENT NEGATIVE — the release emits no store
//             event; the `'severed'` arm is the SEVERANCE's, not a dispose's
//     F-LS-4  a SECOND SUBSCRIPTION AUTHORITY on the host's reference FAILS
//     F-SS-1  SS-LEAK arm (a) — same three-arm shape, per key
//     F-SS-2  SS-LEAK arm (b)
//     F-SS-3  SS-LEAK arm (c)
//     F-SS-4  (two readings, both driven) — the container-source falsifier
//             (§2.3, part of this row id per §3.2) AND the slot's
//             second-subscription-authority negative (§2.4 item 4 — the row id
//             is cited there for the slot; recorded as a citation annotation,
//             see the report)
//
//   §3.3 INVARIANTS (hold in EVERY state, landed and store-backed):
//     I-LS-1 store is a sharing channel, never a second authority (§2.5 item 7)
//     I-LS-2 own-node ownership and foreign-sibling rules UNCHANGED
//     I-LS-3 no throw class added (§2.1 item 3)
//     I-SS-1 the container source is the injected factory in EVERY state (§2.3)
//     I-SS-2 the typed refusal domain stays the module's ('no-container'
//            declared-but-not-emitted, landed F-11)
//     I-SS-3 the per-key re-invocation is READ-ONLY and the write-loop
//            terminates (§2.4 item 3)
//
//   §3.4 STATICS (each a scanner with its positive control):
//     S-LS-1 import census (three views) + the §2.6 SPELLING-COUNT reading
//     S-LS-2 no-module-level-binding scan
//     S-LS-3 the zero-graph-seam row SURVIVES (no src/renderer/** import)
//     S-SS-1 slot import census + spelling-count reading
//     S-SS-2 slot no-module-level-binding scan
//     S-SS-3 the container-source static (store-access never feeds a
//            container-obtaining site)
//
//   §3.5 EXISTENCE ROWS: E-1 (no src/** import of either module) · E-2 (the
//     store is byte-unchanged: the frozen modules' digests are pinned) · E-3
//     (the landed suites exist to be added to — the count probe is the landing
//     pass's own run, per the spec's probe cell).
//
//   §5.5.1 THE REGISTER (6 typed rows, 79 declared attempts, executed
//     deterministically — no generator, no new dependency):
//     P-SMB-LH-IM-1 6 = 3 readings + 3 controls   (S-SMB-LH-IM-1)
//     P-SMB-LH-IM-2 4 = 1 scan + 2 controls + 1 declaration-position check
//                                                              (S-SMB-LH-IM-2)
//     P-SMB-LH-TP-1 31 = 3 runs × (8 + 2) + 1 control  (S-SMB-LH-TP-1)
//     P-SMB-SH-IM-1 6 = 3 readings + 3 controls   (S-SMB-SH-IM-1)
//     P-SMB-SH-IM-2 4 = 1 scan + 2 controls + 1 declaration-position check
//                                                              (S-SMB-SH-IM-2)
//     P-SMB-SH-TP-1 28 = 3 runs × (8 + 1) + 1 control  (S-SMB-SH-TP-1)
//     TOTALS: 79 = 6 + 4 + 31 + 6 + 4 + 28 (chain 6 → 10 → 41 → 47 → 51 → 79;
//     per-family IM 20 · TP 59). Caps: 79 ≤ 400 · max row 31 ≤ 100.
//
//   §2.2 THE HEADLINE — THE dispose() RELEASE OBLIGATION, DECIDED AS
//     UNSUBSCRIBE-ON-DISPOSE, with its SEVEN POST-CONDITIONS:
//     P1 every held handle's unsubscribe() called EXACTLY ONCE (registration
//        order), first answer true, later calls false, never a throw
//     P2 no further delivery to a disposed host (delivery counter stays)
//     P3 idempotence — a second dispose() is a no-op; no handle is called again
//     P4 a delivery in flight during dispose COMPLETES; from the moment dispose
//        begins NO FURTHER delivery is dispatched; dispose() removes the
//        subscriptions synchronously and returns normally (the live re-entrant
//        drive is ADV-SMB-1's, owed to the adversarial gate)
//     P5 the release itself emits NO store event
//     P6 the records REMAIN (dispose releases subscriptions, not records)
//     P7 no second release authority — exactly the module's own subscriptions
//     THE LEAK FAIL-STATE LS-LEAK/SS-LEAK and its three-arm detection: (a)
//     F-LS-1/F-SS-1 delivery · (b) F-LS-2/F-SS-2 handle shape · (c) F-LS-3/
//     F-SS-3 event negative. A host that registers a subscription and never
//     releases it on dispose MUST FAIL a row.
//
//   §7a.1 working defaults IN FORCE: item 1 (MISS rule: bookkeeping-authority,
//     re-mint on the next write — driven as a declared outcome, not a
//     fail-state), item 4 (registration moment — THE TESTWRITER PINS
//     CONSTRUCTION REGISTRATION: the active set reads the declared set from
//     the moment of construction).
//
// WHY THIS IS RED: the pair's own bytes (src/shared/owned-list-host.ts,
// src/shared/slot-host.ts) do not yet route through any store — there is no
// store/hostId option member, no subscription, no store record, and dispose()
// releases nothing. Every store-carrying family row therefore FAILS for the
// honest reason that the obligation is not implemented.
// ---------------------------------------------------------------------------

import { describe, expect, it } from 'vitest'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

import { createOwnedListHost } from '../src/shared/owned-list-host.js'
import { createSlotHost } from '../src/shared/slot-host.js'
import { createGraphStore } from '../src/renderer/store-core-graph.js'
import { storeGraphReferences } from '../src/renderer/store-graph-references.js'
import type {
  GraphEvent,
  GraphNodeFlag,
  GraphReadHit,
  GraphRefusalReason,
  GraphResolveResult,
  GraphStore,
  GraphSubscription,
  GraphTierHandle,
  GraphTierGetResult,
  GraphTierToken,
  GraphWriteOptions,
  GraphWriteReceipt,
} from '../src/renderer/store-core-graph.js'
import type { ListEntry, ListHostResult, OwnedListHost, OwnedListHostOptions } from '../src/shared/owned-list-host.js'
import type { SlotHost, SlotHostOptions, SlotHostResult, SlotKey } from '../src/shared/slot-host.js'

// ---------------------------------------------------------------------------
// §4.2 STEP 1 — THE HARNESS/Double LAYER. The recording store double conforms
// to the FROZEN surface's shapes for the members this unit's contract names
// (commit, resolve, subscribe returning {name, subtree, unsubscribe(): boolean}
// — store-core-graph.md §2.1) and adds NO member of its own; the instrumentation
// (active set, written map, delivery counters, event census, call log) lives on
// the harness's returned `state`, never on the store-shaped object.
// ---------------------------------------------------------------------------

const LIST_HOST_SRC = readFileSync(new URL('../src/shared/owned-list-host.ts', import.meta.url), 'utf8')
const SLOT_HOST_SRC = readFileSync(new URL('../src/shared/slot-host.ts', import.meta.url), 'utf8')

/** The two NEW declared option members (§2.1 item 1) — the TESTWITER's spelling
 *  of the future option shape. The red reason these rows fail is precisely that
 *  the landed option interfaces do not carry them. */
type ListStoreOptions = OwnedListHostOptions & { readonly store: GraphStore | null; readonly hostId: string }
type SlotStoreOptions = SlotHostOptions & { readonly store: GraphStore | null; readonly hostId: string }

function makeNode(): { appendChild: () => void; remove: () => void } {
  return { appendChild: () => undefined, remove: () => undefined }
}

function makeElement(): { children: unknown[]; appendChild: (child: unknown) => void; remove: () => void } {
  const element = {
    children: [] as unknown[],
    appendChild(child: unknown): void {
      element.children.push(child)
    },
    remove(): void {
      // a detached element simply stands alone
    },
  }
  return element
}

function makeContainerFactory(): (key: SlotKey) => unknown {
  const made = new Map<SlotKey, unknown>()
  return (key: SlotKey): unknown => {
    if (!made.has(key)) made.set(key, makeElement())
    return made.get(key) as unknown
  }
}

function makeListHost(store: GraphStore | null, hostId: string, mount: unknown | null = null): OwnedListHost {
  const options: ListStoreOptions = { mount, store, hostId }
  return createOwnedListHost(options)
}

function makeSlotHost(
  store: GraphStore | null,
  hostId: string,
  factory: (key: SlotKey) => unknown,
  keys: readonly SlotKey[],
): SlotHost {
  const options: SlotStoreOptions = {
    container: makeElement(),
    keys,
    orderOf: undefined,
    classNameOf: undefined,
    attributesOf: undefined,
    refuse: undefined,
    containerFactory: factory,
    store,
    hostId,
  }
  return createSlotHost(options)
}

interface SubscriptionRecord {
  name: string
  subtree: boolean
  listener: (event: GraphEvent) => void
  live: boolean
  unsubscribeCalls: number
  firstAnswer: boolean | null
}

interface WrittenEntry {
  value: unknown
  opts: GraphWriteOptions | undefined
  via: 'commit' | 'set'
}

interface DoubleState {
  written: Map<string, WrittenEntry>
  subscriptions: SubscriptionRecord[]
  deliveries: Map<string, number>
  events: GraphEvent[]
  calls: Array<{ member: string; name?: string }>
}

const WRITE_MEMBERS = ['commit', 'set', 'remove', 'clear', 'sweep', 'sever'] as const

function tierOf(name: string): GraphNodeFlag {
  if (name.startsWith('temp.')) return 'temp'
  if (name.startsWith('mem.')) return 'mem'
  if (name.startsWith('file.')) return 'file'
  return 'temp'
}

const DURABILITY_RANK: Readonly<Record<string, number>> = { file: 3, mem: 2, temp: 1 }

function createRecordingDouble(): { store: GraphStore; state: DoubleState } {
  const state: DoubleState = {
    written: new Map(),
    subscriptions: [],
    deliveries: new Map(),
    events: [],
    calls: [],
  }

  const deliver = (record: SubscriptionRecord, event: GraphEvent): void => {
    if (!record.live) return
    state.events.push(event)
    state.deliveries.set(event.name, (state.deliveries.get(event.name) ?? 0) + 1)
    record.listener(event)
  }

  const emit = (name: string, value: unknown, cleared: readonly string[], cause: GraphEvent['cause']): number => {
    let delivered = 0
    for (const record of state.subscriptions) {
      if (!record.live) continue
      if (record.name === name) {
        deliver(record, { name, flag: tierOf(name), value, cleared, cause })
        delivered += 1
      }
    }
    return delivered
  }

  const receipt = (
    name: unknown,
    status: 'committed' | 'refused',
    events: number,
    cleared: readonly string[],
    reason?: string,
  ): GraphWriteReceipt => {
    const out: Record<string, unknown> = {
      status,
      name: typeof name === 'string' ? name : '',
      cleared: cleared.slice(),
      repaired: [],
      rows: [],
      crossings: 0,
      events,
    }
    if (reason !== undefined) out['reason'] = reason
    return out as unknown as GraphWriteReceipt
  }

  const resolveImpl = (raw: unknown): GraphResolveResult => {
    state.calls.push({ member: 'resolve', name: typeof raw === 'string' ? raw : undefined })
    const name = typeof raw === 'string' ? raw : ''
    const entry = state.written.get(name)
    if (entry !== undefined) {
      return { found: true, value: entry.value, tier: tierOf(name), flag: tierOf(name), cache: cacheHandle(tierOf(name)), name }
    }
    return { found: false, value: undefined, tier: null, cache: null, name }
  }

  const lowerCopiesOf = (name: string): string[] => {
    const logical = name.split('.').slice(1).join('.')
    const requested = tierOf(name)
    const copies: string[] = []
    for (const tier of ['temp', 'mem', 'file'] as const) {
      if (tier === requested) continue
      if ((DURABILITY_RANK[tier] ?? 0) >= (DURABILITY_RANK[requested] ?? 0)) continue
      copies.push(`${tier}.${logical}`)
    }
    return copies
  }

  /** A shape-conformant cache handle for a READ HIT (the module treats read
   *  records as opaque; the cache member is never read by this unit's rows). */
  const cacheHandles = new Map<GraphNodeFlag, GraphTierHandle>()
  const cacheHandle = (flag: GraphNodeFlag): GraphTierHandle => {
    const existing = cacheHandles.get(flag)
    if (existing !== undefined) return existing
    const handle: GraphTierHandle = {
      tier: flag,
      get: (): GraphTierGetResult => ({ found: false, value: undefined, name: '' }),
      has: (): boolean => false,
      set: (): GraphWriteReceipt => receipt('', 'committed', 0, []),
      clear: (): GraphWriteReceipt => receipt('', 'committed', 0, []),
    }
    cacheHandles.set(flag, handle)
    return handle
  }

  const commitImpl = (raw: unknown, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt => {
    state.calls.push({ member: 'commit', name: typeof raw === 'string' ? raw : undefined })
    const name = typeof raw === 'string' ? raw : ''
    if (name.length === 0) return receipt(raw, 'refused', 0, [], 'malformed-name')
    const cleared: string[] = []
    const lowerCopies = lowerCopiesOf(name)
    for (const copy of lowerCopies) {
      if (!state.written.has(copy)) continue
      cleared.push(copy)
      emit(copy, undefined, [], 'clear')
      state.written.delete(copy)
    }
    state.written.set(name, { value, opts, via: 'commit' })
    const events = emit(name, value, cleared, 'commit')
    return receipt(raw, 'committed', events, cleared)
  }

  const setImpl = (raw: unknown, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt => {
    state.calls.push({ member: 'set', name: typeof raw === 'string' ? raw : undefined })
    const name = typeof raw === 'string' ? raw : ''
    if (!state.written.has(name)) return receipt(raw, 'refused', 0, [], 'undeclared-name')
    state.written.set(name, { value, opts, via: 'set' })
    const events = emit(name, value, [], 'set')
    return receipt(raw, 'committed', events, [])
  }

  const removeImpl = (raw: unknown): GraphWriteReceipt => {
    state.calls.push({ member: 'remove', name: typeof raw === 'string' ? raw : undefined })
    const name = typeof raw === 'string' ? raw : ''
    if (!state.written.has(name)) return receipt(raw, 'refused', 0, [], 'undeclared-name')
    state.written.delete(name)
    const events = emit(name, undefined, [], 'remove')
    return receipt(raw, 'committed', events, [])
  }

  const clearImpl = (raw: unknown): GraphWriteReceipt => {
    state.calls.push({ member: 'clear', name: typeof raw === 'string' ? raw : undefined })
    const name = typeof raw === 'string' ? raw : ''
    state.written.delete(name)
    const events = emit(name, undefined, [], 'clear')
    return receipt(raw, 'committed', events, [])
  }

  const sweepImpl = (raw: unknown): GraphWriteReceipt => {
    state.calls.push({ member: 'sweep', name: typeof raw === 'string' ? raw : undefined })
    return receipt(raw, 'committed', 0, [])
  }

  const exportImpl = (raw: unknown): GraphResolveResult | GraphRefusalReason => resolveImpl(raw)

  const severImpl = (from: unknown, anchorKey: unknown): GraphWriteReceipt => {
    state.calls.push({ member: 'sever', name: typeof from === 'string' ? from : undefined })
    if (typeof from !== 'string' || typeof anchorKey !== 'string') return receipt(from, 'refused', 0, [], 'malformed-name')
    const released = `${from}.${anchorKey}`
    const events = emit(released, undefined, [released], 'severed')
    for (const record of state.subscriptions) {
      if (record.name === released) record.live = false
    }
    return receipt(from, 'committed', events, [released])
  }

  const subscribeImpl = (
    name: unknown,
    listener: unknown,
    opts?: { subtree?: boolean },
  ): GraphSubscription | GraphWriteReceipt => {
    state.calls.push({ member: 'subscribe', name: typeof name === 'string' ? name : undefined })
    if (typeof name !== 'string' || name.length === 0) return receipt(name, 'refused', 0, [], 'malformed-name')
    if (typeof listener !== 'function') return receipt(name, 'refused', 0, [], 'malformed-name')
    const subtree = opts !== null && typeof opts === 'object' && (opts as { subtree?: unknown }).subtree === true
    const record: SubscriptionRecord = {
      name,
      subtree,
      listener: listener as (event: GraphEvent) => void,
      live: true,
      unsubscribeCalls: 0,
      firstAnswer: null,
    }
    state.subscriptions.push(record)
    return {
      name,
      subtree,
      unsubscribe(): boolean {
        state.calls.push({ member: 'unsubscribe', name })
        record.unsubscribeCalls += 1
        if (!record.live) {
          if (record.firstAnswer === null) record.firstAnswer = false
          return false
        }
        record.live = false
        state.subscriptions = state.subscriptions.filter((candidate) => candidate !== record)
        if (record.firstAnswer === null) record.firstAnswer = true
        return true
      },
    }
  }

  const tierHandle = (tier: GraphTierToken): GraphTierHandle => ({
    tier,
    get(name: string): GraphTierGetResult {
      state.calls.push({ member: `${tier}.get`, name })
      const answer = resolveImpl(name)
      if (!answer.found) return { found: false, value: undefined, name }
      return { found: true, value: answer.value, name }
    },
    has(name: string): boolean {
      const entry = state.written.get(name)
      return entry !== undefined && tierOf(name) === tier
    },
    set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt {
      return setImpl(name, value, opts)
    },
    clear(name: string): GraphWriteReceipt {
      return clearImpl(name)
    },
  })

  const store: GraphStore = {
    resolve: resolveImpl,
    set: setImpl,
    commit: commitImpl,
    remove: removeImpl,
    clear: clearImpl,
    sweep: sweepImpl,
    export: exportImpl,
    sever: severImpl,
    subscribe: (name: string, listener: (event: GraphEvent) => void, opts?: { subtree?: boolean }): GraphSubscription =>
      subscribeImpl(name, listener, opts) as GraphSubscription,
    tiers: Object.freeze({
      temp: tierHandle('temp'),
      mem: tierHandle('mem'),
      file: tierHandle('file'),
    }),
    register: { rows: [] },
    constraints: [],
  }

  return { store, state }
}

function activeSet(state: DoubleState): Set<string> {
  return new Set(state.subscriptions.filter((record) => record.live).map((record) => record.name))
}

function deliveriesOf(state: DoubleState, name: string): number {
  return state.deliveries.get(name) ?? 0
}

function deliveriesTotal(state: DoubleState): number {
  let total = 0
  for (const count of state.deliveries.values()) total += count
  return total
}

function writtenSnapshot(state: DoubleState): Map<string, WrittenEntry> {
  return new Map(state.written)
}

/** THE ROUND-3 COMPARATOR (R-3, cited): canonical structural comparison — own
 *  enumerable keys sorted, primitives by value, `===` for primitive answers;
 *  functions normalized (a fresh identity every call is unsatisfiable by
 *  construction for object answers). No deep-equality dependency. */
function canonicalProjection(value: unknown): unknown {
  if (value === null) return null
  const kind = typeof value
  if (kind === 'number') return Number.isNaN(value as number) ? 'NaN' : Object.is(value, -0) ? '-0' : value
  if (kind === 'string' || kind === 'boolean' || kind === 'undefined' || kind === 'bigint' || kind === 'symbol') {
    return value
  }
  if (kind === 'function') return '<fn>'
  if (Array.isArray(value)) return (value as unknown[]).map(canonicalProjection)
  const out: Record<string, unknown> = {}
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    out[key] = canonicalProjection((value as Record<string, unknown>)[key])
  }
  return out
}

// ---------------------------------------------------------------------------
// THE SCANNERS (§3.4 / §5.5.1 — closed against assembly and comments: the
// three-view rule and the SLOTHOST-CONTAINER-SOURCE-IS-INJECTED anti-assembly
// discipline bind every scanner below).
// ---------------------------------------------------------------------------

const IMPORT_STATEMENT_RE =
  /(^|\n)[ \t]*import[ \t]+[^\n]*from[ \t]+['"][^'"]+['"]|(^|\n)[ \t]*import[ \t]+['"][^'"]+['"]|\brequire[ \t]*\(|\bimport[ \t]*\(/g

function findImports(view: string): string[] {
  return view.match(IMPORT_STATEMENT_RE) ?? []
}

function normalizeView(source: string): string {
  let out = source
  out = out.replace(/`[^`]*`/g, (template: string) => {
    const body = template.slice(1, -1).replace(/\$\{[^}]*\}/g, '')
    return `'${body}'`
  })
  for (let index = 0; index < 6; index += 1) {
    out = out.replace(/'([^'\n]*)'\s*\+\s*'([^'\n]*)'/g, "'$1$2'")
  }
  return out
}

function commentsOnly(source: string): string {
  return (source.match(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g) ?? []).join('\n')
}

function topLevelBindings(source: string): string[] {
  return [...source.matchAll(/^[ \t]*(?:const|let|var)[ \t]+([A-Za-z_$][\w$]*)/gm)].map((match) => match[1] ?? '')
}

function countOccurrences(source: string, needle: string): number {
  const normalized = normalizeView(source)
  let count = 0
  let at = 0
  for (;;) {
    const index = normalized.indexOf(needle, at)
    if (index === -1) break
    count += 1
    at = index + needle.length
  }
  return count
}

const IMPORT_CONTROL_A = "import { createGraphStore } from '../renderer/store-core-graph.js'\n"
const IMPORT_CONTROL_B = "const s = require('../renderer/store-core-graph.js')\n"
const IMPORT_CONTROL_C = "const s = await import('../renderer/store-core-graph.js')\n"

function wiredGraphStore(): GraphStore {
  return createGraphStore({
    declarations: storeGraphReferences([
      { name: 'mem.list' },
      { name: 'mem.slots' },
      { name: 'mem.ambient' },
      { name: 'file.sev' },
    ]),
    enableTestSeam: true,
  })
}

/** THE AMBIENT-READING FIXTURE (the differential's positive control): an answer
 *  that consults a name OUTSIDE the module's declared set must FAIL the
 *  cross-run equality — this fixture demonstrates the probe detects it. */
function ambientFixture(store: GraphStore, hostId: string): unknown {
  const answer: GraphResolveResult | GraphReadHit = store.resolve(`ambient.${hostId}.order`)
  if (answer.found) return (answer as GraphReadHit).value
  return 'MISS'
}

// ---------------------------------------------------------------------------
// §3.1 — THE VALID / HAPPY STATES (store-carrying drives; the double + the real
// store; §7a.1 item 4 pins CONSTRUCTION registration).
// ---------------------------------------------------------------------------

describe('H2a U-STORE-MODULES-BYTES — §3.1 valid states (the store-backed families)', () => {
  it('M-LS-1 — construction registers the list host’s subscription: active-set = {mem.list.<hostId>.order} EXACTLY, one handle, EXACT-REFERENCE (§2.4 item 1; §7a.1 item 4 pins construction registration)', () => {
    const { store, state } = createRecordingDouble()
    void makeListHost(store, 'h1')
    expect(activeSet(state), 'M-LS-1 — the double’s active-subscription set must read {mem.list.h1.order} at construction').toEqual(
      new Set(['mem.list.h1.order']),
    )
    const subs = state.subscriptions.filter((record) => record.name === 'mem.list.h1.order')
    expect(subs.length, 'M-LS-1 — exactly ONE subscription on the order reference').toBe(1)
    expect(subs[0]?.subtree, 'M-LS-1 — the subscription is EXACT-REFERENCE ({subtree} unset)').toBe(false)
    expect(state.subscriptions.length, 'M-LS-1 — the count after any graph re-derivation stays 1').toBe(1)
  })

  it('M-LS-2 — the record writes land: commit(…, {onRepeat:\'edit\'}) writes mem.list.<hostId>.order and mem.list.<hostId>.node.<key> per owned key; answers match the landed M-row answers (§2.1 item 2)', () => {
    const { store, state } = createRecordingDouble()
    // an APPENDABLE mount so the landed placement answers (placed: [nA, nB]) are the drive's own
    const host = makeListHost(store, 'h1', makeElement())
    const nodeA = makeNode()
    const nodeB = makeNode()
    const first = host.setEntries([{ key: 'a', node: nodeA }, { key: 'b', node: nodeB }])
    expect(first.ok).toBe(true)
    expect(first.order).toEqual(['a', 'b'])
    expect(first.placed).toEqual([nodeA, nodeB])
    expect(first.refused).toEqual([])
    const orderRef = 'mem.list.h1.order'
    expect(state.written.has(orderRef), 'M-LS-2 — setEntries must commit mem.list.<hostId>.order').toBe(true)
    expect(canonicalProjection(state.written.get(orderRef)?.value)).toEqual(canonicalProjection(['a', 'b']))
    expect(state.written.get(orderRef)?.opts?.onRepeat, 'M-LS-2 — the write verb is commit with {onRepeat:\'edit\'}').toBe('edit')
    expect(state.written.get('mem.list.h1.node.a')?.value, 'M-LS-2 — an acquired key writes its node record').toBe(nodeA)
    expect(state.written.get('mem.list.h1.node.b')?.value).toBe(nodeB)
    const reordered = host.setOrder(['b', 'a'])
    expect(reordered.order).toEqual(['b', 'a'])
    expect(canonicalProjection(state.written.get(orderRef)?.value)).toEqual(canonicalProjection(['b', 'a']))
  })

  it('M-LS-3 — a store-sourced order change re-invokes the host: delivery counter 1 (one event, one delivery) on the double; the REAL store’s receipt counts the event; keys() re-projects from the STORED order (§2.4 items 2/3)', () => {
    // leg A — the recording double: the subscriber's delivery counter reads 1
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    host.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    store.commit('mem.list.h1.order', ['b', 'a'], { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.list.h1.order'), 'M-LS-3 — the subscriber’s delivery counter reads 1 (events: 1)').toBe(1)
    // leg B — the REAL store: the external commit's receipt events census proves the delivery
    const real = wiredGraphStore()
    const realHost = makeListHost(real, 'h1')
    realHost.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    const receipt = real.commit('mem.list.h1.order', ['b', 'a'], { onRepeat: 'edit' })
    expect(receipt.events, 'M-LS-3 — the real store’s receipt counts the delivered event (≥ 1)').toBeGreaterThanOrEqual(1)
    // the re-invoked render path re-projects from the STORED order
    expect(realHost.keys(), 'M-LS-3 — the re-invocation re-projects from the stored order').toEqual(['b', 'a'])
  })

  it('M-LS-4 — dispose() releases §2.2 P1/P2/P5: every held handle’s unsubscribe() called EXACTLY ONCE (registration order, first answer true); active-set EMPTY; a post-dispose write delivers NONE; void, no throw', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    // positive control — the module's own subscription EXISTS (registration at construction)
    expect(activeSet(state), 'M-LS-4 — pre-dispose active-set = the declared set').toEqual(new Set(['mem.list.h1.order']))
    const preSubs = state.subscriptions.filter((record) => record.name === 'mem.list.h1.order')
    expect(preSubs.length, 'M-LS-4 — exactly one registration').toBe(1)
    // dispose
    const callsBefore = state.calls.length
    const eventsBefore = state.events.length
    expect(host.dispose()).toBeUndefined()
    const added = state.calls.slice(callsBefore)
    for (const call of added) expect(call.member, 'M-LS-4 — dispose() calls only its own unsubscribe() handles (P5: event-silent release)').toBe('unsubscribe')
    expect(state.events.length, 'M-LS-4 — P5: the release itself emits NO store event').toBe(eventsBefore)
    expect(activeSet(state), 'M-LS-4 — P1: active-set EMPTY after dispose').toEqual(new Set())
    const unsubscribed = added.filter((call) => call.member === 'unsubscribe').map((call) => call.name)
    expect(unsubscribed, 'M-LS-4 — P1: every held handle is released, in registration order').toEqual(preSubs.map((record) => record.name))
    for (const record of preSubs) {
      expect(record.unsubscribeCalls, 'M-LS-4 — P1: called EXACTLY ONCE').toBe(1)
      expect(record.firstAnswer, 'M-LS-4 — P1: the first call answers true').toBe(true)
    }
    // P2 — no further delivery to a disposed host
    const deliveredBefore = deliveriesOf(state, 'mem.list.h1.order')
    store.commit('mem.list.h1.order', ['x'], { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.list.h1.order'), 'M-LS-4 — P2: a post-dispose write delivers NONE (counter stays)').toBe(deliveredBefore)
    // P3 — idempotence: a second dispose is a no-op, no handle is called again
    const callsAfterFirst = state.calls.length
    expect(host.dispose()).toBeUndefined()
    expect(state.calls.length).toBe(callsAfterFirst)
    for (const record of preSubs) expect(record.unsubscribeCalls).toBe(1)
  })

  it('M-LS-5 — dispose-then-use: every landed method once (setEntries, remove, setOrder, render, activate, close, keys) answers a valid result; the records REMAIN (§2.2 P3/P6; landed A-16)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    host.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    expect(state.written.has('mem.list.h1.order')).toBe(true)
    expect(state.written.has('mem.list.h1.node.a')).toBe(true)
    const before = writtenSnapshot(state)
    host.dispose()
    // every landed method once — a valid result, never a throw (landed A-16; no-throw totality)
    const calls: Array<{ label: string; run: () => unknown }> = [
      { label: 'setEntries', run: () => host.setEntries([{ key: 'c', node: makeNode() }]) },
      { label: 'remove', run: () => host.remove('c') },
      { label: 'setOrder', run: () => host.setOrder(['c']) },
      { label: 'render', run: () => host.render() },
      { label: 'activate', run: () => host.activate('c') },
      { label: 'close', run: () => host.close('c') },
    ]
    for (const call of calls) {
      let answer: unknown
      expect(() => { answer = call.run() }, `M-LS-5 — ${call.label} never throws after dispose`).not.toThrow()
      const record = answer as ListHostResult
      expect(typeof record.ok, `M-LS-5 — ${call.label} answers a valid result`).toBe('boolean')
    }
    expect(Array.isArray(host.keys())).toBe(true)
    // P6 — the records REMAIN: dispose released subscriptions, not records
    expect(writtenSnapshot(state), 'M-LS-5 — P6: the written map STILL holds the host’s records after dispose').toEqual(before)
    // P3 — a second dispose is a no-op
    expect(host.dispose()).toBeUndefined()
  })

  it('M-SS-1 — construction registers one subscription PER DECLARED KEY: active-set EXACT, count = declaredKeyCount, one handle per key, EXACT-REFERENCE (§2.4 item 1)', () => {
    const { store, state } = createRecordingDouble()
    void makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b', 'c'])
    expect(activeSet(state), 'M-SS-1 — one subscription per declared key at construction').toEqual(
      new Set(['mem.slots.h1.a', 'mem.slots.h1.b', 'mem.slots.h1.c']),
    )
    expect(state.subscriptions.length, 'M-SS-1 — the count reads = declaredKeyCount while alive').toBe(3)
    for (const key of ['a', 'b', 'c']) {
      const subs = state.subscriptions.filter((record) => record.name === `mem.slots.h1.${key}`)
      expect(subs.length, `M-SS-1 — exactly one handle per key (${key})`).toBe(1)
      expect(subs[0]?.subtree, 'M-SS-1 — EXACT-REFERENCE each ({subtree} unset)').toBe(false)
    }
  })

  it('M-SS-2 — the placement write lands (mem.slots.<hostId>.<key> via commit {onRepeat:\'edit\'}); the container stays INJECTED — containerFor reference-identical to the factory’s product, never a store value (§2.1 item 2, §2.3)', () => {
    const { store, state } = createRecordingDouble()
    const factory = makeContainerFactory()
    const host = makeSlotHost(store, 'h1', factory, ['a', 'b', 'c'])
    const result = host.setNode('a', makeNode())
    expect(result.ok).toBe(true)
    const ref = 'mem.slots.h1.a'
    expect(state.written.has(ref), 'M-SS-2 — setNode must commit the placement record').toBe(true)
    expect(state.written.get(ref)?.opts?.onRepeat, 'M-SS-2 — the write verb is commit with {onRepeat:\'edit\'}').toBe('edit')
    // F-SS-4 (b) negative — the record's value never IS a container
    expect(state.written.get(ref)?.value, 'M-SS-2 — the record value never IS a container').not.toBe(host.containerFor('a'))
    // §2.3 — the container is the INJECTED factory's product, reference-identical
    expect(host.containerFor('a'), 'M-SS-2 — containerFor is the factory’s product (reference-identical)').toBe(factory('a'))
  })

  it('M-SS-3 — a store-sourced placement change re-invokes the host FOR THAT KEY: b’s counter reads 1; a/c receive NO delivery (§2.4 items 2/3, per-key re-invocation)', () => {
    // leg A — the recording double: per-key delivery counters
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b', 'c'])
    host.setNode('b', makeNode())
    store.commit('mem.slots.h1.b', { placement: 'b' }, { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.slots.h1.b'), 'M-SS-3 — the b subscriber’s delivery counter reads 1').toBe(1)
    expect(deliveriesOf(state, 'mem.slots.h1.a'), 'M-SS-3 — keys a receive NO delivery').toBe(0)
    expect(deliveriesOf(state, 'mem.slots.h1.c'), 'M-SS-3 — keys c receive NO delivery').toBe(0)
    // leg B — the REAL store: the external commit's receipt counts the delivered event
    const real = wiredGraphStore()
    const realHost = makeSlotHost(real, 'h1', makeContainerFactory(), ['a', 'b', 'c'])
    realHost.setNode('b', makeNode())
    const receipt = real.commit('mem.slots.h1.b', { placement: 'b' }, { onRepeat: 'edit' })
    expect(receipt.events, 'M-SS-3 — the real store’s receipt counts the delivered event (≥ 1)').toBeGreaterThanOrEqual(1)
  })

  it('M-SS-4 — dispose() releases EVERY key §2.2 P1/P2/P5: every held handle unsubscribed once (true), active-set EMPTY, post-dispose writes to any released key deliver NONE, void/no-throw', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b'])
    expect(activeSet(state), 'M-SS-4 — pre-dispose active-set = the declared key set').toEqual(
      new Set(['mem.slots.h1.a', 'mem.slots.h1.b']),
    )
    const preSubs = state.subscriptions.slice()
    expect(preSubs.length).toBe(2)
    const callsBefore = state.calls.length
    const eventsBefore = state.events.length
    expect(host.dispose()).toBeUndefined()
    const added = state.calls.slice(callsBefore)
    for (const call of added) expect(call.member, 'M-SS-4 — dispose() calls only its own unsubscribe() handles (P5)').toBe('unsubscribe')
    expect(state.events.length, 'M-SS-4 — P5: the release emits NO store event').toBe(eventsBefore)
    expect(activeSet(state), 'M-SS-4 — P1: active-set EMPTY after dispose').toEqual(new Set())
    for (const record of preSubs) {
      expect(record.unsubscribeCalls, 'M-SS-4 — P1: each handle called exactly once').toBe(1)
      expect(record.firstAnswer, 'M-SS-4 — P1: first answer true').toBe(true)
    }
    // P2 — post-dispose external writes to ANY released key deliver NONE
    const deliveredBefore = deliveriesTotal(state)
    store.commit('mem.slots.h1.a', { x: 1 }, { onRepeat: 'edit' })
    store.commit('mem.slots.h1.b', { x: 2 }, { onRepeat: 'edit' })
    expect(deliveriesTotal(state), 'M-SS-4 — P2: post-dispose writes deliver NONE').toBe(deliveredBefore)
  })

  it('M-SS-5 — dispose-then-use, records remain §2.2 P3/P6: every landed method once answers a valid result; the placement records STILL hold', () => {
    const { store, state } = createRecordingDouble()
    const factory = makeContainerFactory()
    const host = makeSlotHost(store, 'h1', factory, ['a', 'b'])
    host.setNode('a', makeNode())
    expect(state.written.has('mem.slots.h1.a')).toBe(true)
    const before = writtenSnapshot(state)
    host.dispose()
    const calls: Array<{ label: string; run: () => unknown }> = [
      { label: 'setNode', run: () => host.setNode('b', makeNode()) },
      { label: 'remove', run: () => host.remove('a') },
      { label: 'setOrder', run: () => host.setOrder(['b', 'a']) },
      { label: 'render', run: () => host.render() },
    ]
    for (const call of calls) {
      let answer: unknown
      expect(() => { answer = call.run() }, `M-SS-5 — ${call.label} never throws after dispose`).not.toThrow()
      const record = answer as SlotHostResult
      expect(typeof record.ok, `M-SS-5 — ${call.label} answers a valid result`).toBe('boolean')
    }
    expect(Array.isArray(host.keys())).toBe(true)
    expect(host.containerFor('a'), 'M-SS-5 — the landed F-6/F-7/F-12 classes, dispose column: valid state').toBeNull()
    expect(writtenSnapshot(state), 'M-SS-5 — P6: the double’s written map still holds the placement records').toEqual(before)
    expect(host.dispose(), 'M-SS-5 — P3: idempotent, no throw').toBeUndefined()
  })
})

// ---------------------------------------------------------------------------
// §3.2 — THE DOCUMENTED FAIL-STATES (the LEAK's three-arm detection + the
// boundaries). A host that registers a subscription and never releases it on
// dispose MUST FAIL a row.
// ---------------------------------------------------------------------------

describe('H2a U-STORE-MODULES-BYTES — §3.2 fail-states (LS-LEAK / SS-LEAK three-arm detection)', () => {
  it('F-LS-1 — LS-LEAK arm (a): DELIVERY AFTER DISPOSE — a delivery counter > 0 after dispose FAILS; positive control: the SAME drive before dispose delivers exactly 1 (§3.2)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    // positive control — the measurement channel delivers exactly 1 BEFORE dispose
    store.commit('mem.list.h1.order', ['x'], { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.list.h1.order'), 'F-LS-1 — positive control: the same drive before dispose delivers exactly 1').toBe(1)
    host.dispose()
    const before = deliveriesOf(state, 'mem.list.h1.order')
    store.commit('mem.list.h1.order', ['y'], { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.list.h1.order'), 'F-LS-1 — a delivery AFTER dispose (>0 increase) is the leak').toBe(before)
  })

  it('F-LS-2 — LS-LEAK arm (b): THE HANDLE SHAPE — a NON-EMPTY active-set after dispose, or a first unsubscribe answering false, or a never-called handle FAILS; positive control: pre-dispose active-set = the declared set (§3.2)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    // positive control — the host's own subscription exists pre-dispose
    expect(activeSet(state), 'F-LS-2 — positive control: the pre-dispose active-set = the declared set').toEqual(
      new Set(['mem.list.h1.order']),
    )
    expect(state.subscriptions.length).toBe(1)
    host.dispose()
    expect(activeSet(state), 'F-LS-2 — the active-subscription set reads EMPTY after dispose').toEqual(new Set())
    for (const record of state.subscriptions) {
      expect(record.unsubscribeCalls, 'F-LS-2 — every held handle’s unsubscribe() is called').toBeGreaterThanOrEqual(1)
      expect(record.firstAnswer, 'F-LS-2 — the first call answers true (never false)').toBe(true)
    }
    // P7 — dispose releases EXACTLY the module's own subscriptions: a subscription ANOTHER
    // party registered is untouched by the host's dispose
    store.subscribe('mem.other.x', () => undefined)
    host.dispose()
    const other = state.subscriptions.find((record) => record.name === 'mem.other.x')
    expect(other?.live, 'F-LS-2/P7 — a subscription another party registered is NOT released by the host’s dispose').toBe(true)
  })

  it('F-LS-3 — LS-LEAK arm (c): THE EVENT NEGATIVE — the release emits NO store event; a \'severed\'/\'clear\'/\'set\' attributable to dispose FAILS; positive control: a real sever emits exactly ONE \'severed\' naming the released reference (§2.2 P5, store-core-graph.md §2.10 item 3)', () => {
    // double leg — the event census + call log
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    const eventsBefore = state.events.length
    const callsBefore = state.calls.length
    host.dispose()
    expect(state.events.length, 'F-LS-3 — the dispose call adds 0 events to the event census').toBe(eventsBefore)
    const added = state.calls.slice(callsBefore)
    for (const call of added) {
      expect(call.member, 'F-LS-3 — only unsubscribe (event-silent) may be called by dispose — a severed/clear/set needs a write call').toBe('unsubscribe')
    }
    // real-store leg — a call-recording wrapper around the REAL store: dispose adds ZERO store-level calls
    const real = wiredGraphStore()
    const writes: string[] = []
    const wrapped: GraphStore = new Proxy(real, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value !== 'function') return value
        return (...args: unknown[]) => {
          if (String(prop) !== 'resolve') writes.push(String(prop))
          return (value as (...a: unknown[]) => unknown).apply(target, args)
        }
      },
    }) as GraphStore
    const realHost = makeListHost(wrapped, 'h1')
    writes.length = 0
    realHost.dispose()
    expect(writes, 'F-LS-3 — dispose is event-silent: zero store-level member calls attributable to it').toEqual([])
    // positive control — a REAL sever on a store link emits exactly ONE 'severed' naming the
    // released reference (the store's own F-11, cited — the arm is the SEVERANCE's). The
    // released reference a sever of the 'child' anchor under root 'sev' names is
    // 'file.sev.child' (referenceNamesOf walks from the ROOT's local name + the anchor key).
    const store2 = createGraphStore({ declarations: storeGraphReferences([{ name: 'file.sev' }]) })
    store2.commit('file.sev.parent', {})
    store2.commit('file.sev.parent.child', { tag: 'c' })
    let severed = 0
    let severedName = ''
    const sub = store2.subscribe('file.sev.child', (event) => {
      if (event.cause === 'severed') {
        severed += 1
        severedName = event.name
      }
    })
    const receipt = store2.sever('file.sev.parent', 'child')
    expect(severed, 'F-LS-3 — the sever control: exactly ONE \'severed\' event').toBe(1)
    expect(severedName).toBe('file.sev.child')
    expect(receipt.events).toBe(1)
    expect(sub.unsubscribe(), 'F-LS-3 — the severed reference is released (later unsubscribe answers false)').toBe(false)
  })

  it('F-LS-4 — a SECOND SUBSCRIPTION AUTHORITY on the host’s reference FAILS: per-reference count reads 2 with an outside subscriber while the host is alive; positive control: the module-alone drive reads exactly 1 (§2.4 item 4)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    const count = (name: string): number => state.subscriptions.filter((record) => record.name === name && record.live).length
    // positive control — the module-alone drive reads exactly 1
    expect(count('mem.list.h1.order'), 'F-LS-4 — positive control: the module-alone drive reads exactly 1').toBe(1)
    // the fail-drive — an outside subscription while the host is alive makes the count 2
    store.subscribe('mem.list.h1.order', () => undefined)
    expect(count('mem.list.h1.order'), 'F-LS-4 — a second subscription authority on the same reference reads 2 and FAILS').toBe(2)
    void host
  })

  it('F-SS-1 — SS-LEAK arm (a): DELIVERY AFTER DISPOSE — per-key counter > 0 after dispose FAILS; positive control: the same drive before dispose delivers 1 (§3.2)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a'])
    store.commit('mem.slots.h1.a', { v: 1 }, { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.slots.h1.a'), 'F-SS-1 — positive control: the same drive before dispose delivers 1').toBe(1)
    host.dispose()
    const before = deliveriesOf(state, 'mem.slots.h1.a')
    store.commit('mem.slots.h1.a', { v: 2 }, { onRepeat: 'edit' })
    expect(deliveriesOf(state, 'mem.slots.h1.a'), 'F-SS-1 — a delivery after dispose (>0 increase) is the leak').toBe(before)
  })

  it('F-SS-2 — SS-LEAK arm (b): THE HANDLE SHAPE — non-empty active-set after dispose / a first unsubscribe answering false / a never-called handle FAILS; positive control: pre-dispose active-set = the declared key set (§3.2)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b'])
    expect(activeSet(state), 'F-SS-2 — positive control: the pre-dispose active-set = the declared key set').toEqual(
      new Set(['mem.slots.h1.a', 'mem.slots.h1.b']),
    )
    expect(state.subscriptions.length).toBe(2)
    host.dispose()
    expect(activeSet(state), 'F-SS-2 — the active-subscription set reads EMPTY after dispose').toEqual(new Set())
    for (const record of state.subscriptions) {
      expect(record.unsubscribeCalls).toBeGreaterThanOrEqual(1)
      expect(record.firstAnswer, 'F-SS-2 — the first call answers true (never false)').toBe(true)
    }
  })

  it('F-SS-3 — SS-LEAK arm (c): THE EVENT NEGATIVE — the release emits NO store event; positive control: the sever control of F-LS-3 (§2.2 P5)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a'])
    const eventsBefore = state.events.length
    const callsBefore = state.calls.length
    host.dispose()
    expect(state.events.length, 'F-SS-3 — the dispose call adds 0 events to the event census').toBe(eventsBefore)
    const added = state.calls.slice(callsBefore)
    for (const call of added) expect(call.member, 'F-SS-3 — only unsubscribe (event-silent) may be called by dispose').toBe('unsubscribe')
    // real-store leg — zero store-level calls attributable to the dispose
    const real = wiredGraphStore()
    const writes: string[] = []
    const wrapped: GraphStore = new Proxy(real, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value !== 'function') return value
        return (...args: unknown[]) => {
          if (String(prop) !== 'resolve') writes.push(String(prop))
          return (value as (...a: unknown[]) => unknown).apply(target, args)
        }
      },
    }) as GraphStore
    const realHost = makeSlotHost(wrapped, 'h1', makeContainerFactory(), ['a'])
    writes.length = 0
    realHost.dispose()
    expect(writes, 'F-SS-3 — dispose is event-silent: zero store-level member calls attributable to it').toEqual([])
  })

  it('F-SS-4 (second-subscription-authority reading, §2.4 item 4 — the row id is cited there for the slot; §3.2’s F-SS-4 cell is the container-source falsifier, driven in its own block below) — an outside subscription on the host’s key ref while the host is alive FAILS; positive control: the module-alone drive reads exactly the declared key count', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b'])
    const count = (name: string): number => state.subscriptions.filter((record) => record.name === name && record.live).length
    // positive control — module alone: exactly one per declared key
    expect(activeSet(state), 'F-SS-4 — positive control: module-alone = exactly one per declared key').toEqual(
      new Set(['mem.slots.h1.a', 'mem.slots.h1.b']),
    )
    expect(count('mem.slots.h1.a')).toBe(1)
    // the fail-drive — an outside subscription makes the per-reference count 2
    store.subscribe('mem.slots.h1.a', () => undefined)
    expect(count('mem.slots.h1.a'), 'F-SS-4 — a second subscription authority on the same reference reads 2 and FAILS').toBe(2)
    void host
  })

  it('F-SS-4 (container-source falsifier, §2.3 items 1/2 — SLOTHOST-CONTAINER-SOURCE-IS-INJECTED unmoved): no module-side store→container path; the record’s value never IS (or contains) a container; positive control: the injected-factory drive passes with containerFor reference-identical to the factory’s product', () => {
    // drive (a) — a MODULE byte that reads a store value into a container-obtaining position,
    // or stores a container in its own record, FAILS the boundary. Today the module carries
    // NO store-access site at all (the declared-parameter form does not exist yet), so the
    // static scan holds vacuously — the boundary is asserted, not yet exercised.
    expect(SLOT_HOST_SRC).not.toMatch(/store\s*\.\s*resolve\(/)
    expect(SLOT_HOST_SRC).not.toMatch(/resolve\([^)]*\)[\s\S]{0,120}obtainContainer/)
    expect(SLOT_HOST_SRC).not.toMatch(/record\.container\s*=\s*(?:store|resolve)/)
    // drive (b) — the record-value rule: a mem.slots.<hostId>.<key> record whose value IS (or
    // contains) a container FAILS (dynamic half: the container the host places into is never a
    // store value; containerFor is the injected product).
    const { store, state } = createRecordingDouble()
    const factory = makeContainerFactory()
    const host = makeSlotHost(store, 'h1', factory, ['a'])
    host.setNode('a', makeNode())
    const entry = state.written.get('mem.slots.h1.a')
    if (entry !== undefined) {
      expect(entry.value).not.toBe(host.containerFor('a'))
    }
    expect(host.containerFor('a'), 'F-SS-4 — positive control: containerFor is the injected factory’s product (reference-identical)').toBe(factory('a'))
  })

  it('§2.1 item 5 (the STORE-RECORD MISS rule — a declared outcome, not a fail-state): a {found:false} read of the module’s own name drives bookkeeping-authority; positive control: after the MISS the next commit re-mints and a subsequent read answers a HIT with the module’s own value (§2.1 item 5, §7a.1 item 1)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    // the module's own store-carrying turns proceed on its own bookkeeping and the NEXT
    // store-write turn re-mints the record from bookkeeping (self-healing — never a default)
    host.setEntries([{ key: 'a', node: makeNode() }])
    host.setOrder(['a'])
    expect(state.written.has('mem.list.h1.order'), '§2.1 item 5 — the next store-write turn re-mints the record').toBe(true)
    const read: GraphResolveResult = store.resolve('mem.list.h1.order')
    expect(read.found, '§2.1 item 5 — positive control: after the re-mint the read answers a HIT').toBe(true)
    if (read.found) {
      expect(canonicalProjection(read.value)).toEqual(canonicalProjection(['a']))
    }
  })
})

// ---------------------------------------------------------------------------
// §3.3 — THE INVARIANTS (hold in EVERY state, landed and store-backed).
// ---------------------------------------------------------------------------

describe('H2a U-STORE-MODULES-BYTES — §3.3 invariants', () => {
  it('I-LS-1 — the store is a sharing channel, never a second authority: no module answer consults a store name OUTSIDE the declared set; a store value never becomes a host DECISION (§2.5 item 7; the differential executes it)', () => {
    const { store } = createRecordingDouble()
    const withStore = makeListHost(store, 'h1')
    const without = createOwnedListHost({ mount: null })
    const script = (host: OwnedListHost): unknown[] => [
      host.setEntries([{ key: 'a', node: makeNode() }]),
      host.setOrder(['a']),
      host.render(),
      host.keys(),
      host.remove('a'),
    ]
    expect(canonicalProjection(script(withStore)), 'I-LS-1 — the store-carrying shape answers EXACTLY as the landed shape (the sharing channel is never a decision input)').toEqual(
      canonicalProjection(script(without)),
    )
  })

  it('I-LS-2 — the own-node ownership and foreign-sibling rules are UNCHANGED in every store state: a foreign sibling of the mount is never touched, reordered or removed (§2.1 item 3)', () => {
    const mount = makeElement()
    const foreign = makeNode()
    mount.children.push(foreign)
    const { store } = createRecordingDouble()
    const host = makeListHost(store, 'h1', mount)
    const result = host.setEntries([{ key: 'a', node: makeNode() }])
    expect(result.ok).toBe(true)
    expect(mount.children).toContain(foreign)
    expect(mount.children.filter((child) => child !== foreign).length, 'I-LS-2 — only the host’s own placed node joins the mount').toBe(1)
  })

  it('I-LS-3 — no throw class added: every store-call result is a returned record; the landed no-throw totality is UNCHANGED (§2.1 item 3)', () => {
    const { store } = createRecordingDouble()
    // a store whose commit REFUSES (a caller-supplied constraint's repairless violation — a
    // returned record, never a throw; THROWING-SUPPLY-ABSORPTION-LIVES-AT-THE-WIRING-TURN)
    const refusing: GraphStore = {
      ...store,
      commit: (): GraphWriteReceipt => ({
        status: 'refused',
        reason: 'validate-failed',
        name: '',
        cleared: [],
        repaired: [],
        rows: [],
        crossings: 0,
        events: 0,
      }),
    }
    const host = createOwnedListHost({ mount: null, store: refusing, hostId: 'h1' } as ListStoreOptions)
    expect(() => host.setEntries([{ key: 'a', node: makeNode() }])).not.toThrow()
    expect(() => host.setOrder(['a'])).not.toThrow()
    expect(() => host.render()).not.toThrow()
    expect(() => host.keys()).not.toThrow()
    expect(() => host.dispose()).not.toThrow()
  })

  it('I-SS-1 — the container source is the injected factory in EVERY store state — present/absent/cold/shadowing/committed — and containerFor never returns a store value (§2.3)', () => {
    const shadow = wiredGraphStore()
    shadow.seed?.([{ name: 'temp.slots.h1.a', value: { shadow: true } }])
    const committed = wiredGraphStore()
    committed.seed?.([{ name: 'file.slots.h1.a', value: { committed: true } }])
    const states: Array<{ label: string; store: GraphStore | null }> = [
      { label: 'absent', store: null },
      { label: 'present-cold', store: wiredGraphStore() },
      { label: 'present-shadowing', store: shadow },
      { label: 'present-committed', store: committed },
    ]
    for (const state of states) {
      const factory = makeContainerFactory()
      const host = makeSlotHost(state.store, 'h1', factory, ['a'])
      host.setNode('a', makeNode())
      expect(host.containerFor('a'), `I-SS-1 — containerFor is the factory’s product in the ${state.label} store state`).toBe(factory('a'))
    }
  })

  it('I-SS-2 — the typed refusal for an undeclared key stays the module’s; the store-backed turns change NO refusal code; \'no-container\' stays declared-but-not-emitted (plan row 10, landed F-1/F-3/F-11)', () => {
    const { store } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a'])
    const result = host.setNode('undeclared', makeNode())
    expect(result.ok).toBe(false)
    expect(result.refused[0]?.code, 'I-SS-2 — the typed refusal for an undeclared key is unknown-key').toBe('unknown-key')
    expect(result.refused.some((refusal) => refusal.code === 'no-container'), 'I-SS-2 — no-container stays DECLARED-BUT-NOT-EMITTED').toBe(false)
  })

  it('I-SS-3 — the per-key placement re-invocation is READ-ONLY and the write-loop terminates: during an external commit the ONLY store write is the external commit itself; one event, one delivery, no second write (§2.4 item 3)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b'])
    host.setNode('b', makeNode())
    const writesBefore = state.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length
    store.commit('mem.slots.h1.b', { placement: 'x' }, { onRepeat: 'edit' })
    const writesAdded = state.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length - writesBefore
    expect(writesAdded, 'I-SS-3 — the re-invoked path never writes the store (read-only rule §2.4 item 3)').toBe(1)
    expect(deliveriesOf(state, 'mem.slots.h1.b'), 'I-SS-3 — one event, one delivery; the write-loop terminates').toBe(1)
    void host
  })
})

// ---------------------------------------------------------------------------
// §3.4 — THE STATIC ROWS (each a scanner with its positive control; the
// NORMALIZED view and COMMENTS-as-code scans bind, per §7 item 2).
// ---------------------------------------------------------------------------

describe('H2a U-STORE-MODULES-BYTES — §3.4 statics', () => {
  it('S-LS-1 — the list host import census: ZERO import statements over the RAW bytes, the NORMALIZED view and COMMENTS-scanned-as-code; three positive controls; PLUS the §2.6 SPELLING-COUNT reading (one composition site per declared reference — a second copy FAILS)', () => {
    // the import census
    expect(findImports(LIST_HOST_SRC), 'S-LS-1 — raw bytes carry zero imports').toEqual([])
    expect(findImports(normalizeView(LIST_HOST_SRC)), 'S-LS-1 — the normalized view carries zero imports').toEqual([])
    expect(findImports(commentsOnly(LIST_HOST_SRC)), 'S-LS-1 — comments scanned as code carry zero imports').toEqual([])
    // the three positive controls — each banned corpus MUST fail the row
    expect(findImports(IMPORT_CONTROL_A)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_B)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_C)).not.toEqual([])
    // §2.6 item 3 — the spelling-count reading: each declared reference (order ref + node ref)
    // is composed at exactly one site in the closures; the two refs share the root literal so
    // the count is exactly 2; a duplicated full spelling pushes it past the bound and FAILS.
    const sites = countOccurrences(LIST_HOST_SRC, 'mem.list.')
    expect(sites, 'S-LS-1/§2.6 — the module’s closures compose its references at their sites (≥ 2 sites for order + node)').toBeGreaterThanOrEqual(2)
    expect(sites, 'S-LS-1/§2.6 — no second copy of a reference spelling (≤ 2)').toBeLessThanOrEqual(2)
  })

  it('S-LS-2 — the no-module-level-binding scan: no module-scope const/let/var holds the store; store-shaped tokens appear ONLY in the factory’s parameter position; two positive controls', () => {
    const bindings = topLevelBindings(LIST_HOST_SRC).filter((name) => /^(store|subscription)/i.test(name) || /store/i.test(name))
    expect(bindings, 'S-LS-2 — no module-scope store/subscription binding').toEqual([])
    expect(topLevelBindings('const store = createGraphStore()\n'), 'S-LS-2 — positive control: a module-level `const store = …` MUST be detected').toContain('store')
    expect(topLevelBindings('let store;\n'), 'S-LS-2 — positive control: a module-level `let store;` MUST be detected').toContain('store')
  })

  it('S-LS-3 — the zero-graph-seam row SURVIVES: the module still imports NOTHING from src/renderer/** (the store is a parameter, never an import — R3-4); a corpus importing ../renderer/store-core-graph.js FAILS', () => {
    const rendererImports = findImports(LIST_HOST_SRC).filter((hit) => hit.includes('renderer'))
    expect(rendererImports, 'S-LS-3 — no src/renderer/** import').toEqual([])
    expect(findImports(IMPORT_CONTROL_A), 'S-LS-3 — positive control: a corpus importing ../renderer/store-core-graph.js FAILS the row').not.toEqual([])
  })

  it('S-SS-1 — the slot import census (same three-view scan, same three positive controls) PLUS the §2.6 SPELLING-COUNT reading', () => {
    expect(findImports(SLOT_HOST_SRC)).toEqual([])
    expect(findImports(normalizeView(SLOT_HOST_SRC))).toEqual([])
    expect(findImports(commentsOnly(SLOT_HOST_SRC))).toEqual([])
    expect(findImports(IMPORT_CONTROL_A)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_B)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_C)).not.toEqual([])
    const sites = countOccurrences(SLOT_HOST_SRC, 'mem.slots.')
    expect(sites, 'S-SS-1/§2.6 — the slots reference is composed at its one site (≥ 1)').toBeGreaterThanOrEqual(1)
    expect(sites, 'S-SS-1/§2.6 — no second copy of the slots reference spelling (≤ 1)').toBeLessThanOrEqual(1)
  })

  it('S-SS-2 — the slot no-module-level-binding scan (same two positive controls)', () => {
    const bindings = topLevelBindings(SLOT_HOST_SRC).filter((name) => /^(store|subscription)/i.test(name) || /store/i.test(name))
    expect(bindings, 'S-SS-2 — no module-scope store/subscription binding').toEqual([])
    expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store')
    expect(topLevelBindings('let store;\n')).toContain('store')
  })

  it('S-SS-3 — the container-source static: no code path in src/shared/slot-host.ts obtains a container from a store value; the injected containerFactory is the SOLE container source; positive control: the injected-factory drive passes (M-SS-2)', () => {
    expect(SLOT_HOST_SRC).not.toMatch(/store\s*\.\s*(?:resolve|commit|subscribe)\(/)
    expect(SLOT_HOST_SRC).not.toMatch(/resolve\([^)]*\)[\s\S]{0,120}obtainContainer/)
    expect(SLOT_HOST_SRC).not.toMatch(/record\.container\s*=\s*(?:store|resolve)/)
    const { store } = createRecordingDouble()
    const factory = makeContainerFactory()
    const host = makeSlotHost(store, 'h1', factory, ['a'])
    host.setNode('a', makeNode())
    expect(host.containerFor('a')).toBe(factory('a'))
  })
})

// ---------------------------------------------------------------------------
// §3.5 — THE EXISTENCE ROWS.
// ---------------------------------------------------------------------------

describe('H2a U-STORE-MODULES-BYTES — §3.5 existence rows', () => {
  it('E-1 — no in-tree src/** file imports either module (the reason [T] evidence is envelope-green and gate 6 is STRUCTURAL)', () => {
    const srcDir = fileURLToPath(new URL('../src', import.meta.url))
    const hits: string[] = []
    const walk = (dir: string): void => {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        if (statSync(full).isDirectory()) {
          walk(full)
        } else if (full.endsWith('.ts')) {
          const bytes = readFileSync(full, 'utf8')
          if (/from\s+['"][^'"]*(?:shared\/owned-list-host|shared\/slot-host)(?:\.js)?['"]/.test(bytes)) hits.push(full)
        }
      }
    }
    walk(srcDir)
    expect(hits, 'E-1 — createOwnedListHost/createSlotHost appear in NO src/** import statement').toEqual([])
  })

  it('E-2 — no store byte changes in this unit: the frozen modules’ sha256 digests recompute to their RED-AUTHORING pins (a change during this unit breaks the pin)', () => {
    const digestOf = (rel: string): string =>
      createHash('sha256').update(readFileSync(new URL(`../${rel}`, import.meta.url))).digest('hex')
    expect(digestOf('src/renderer/store-core-graph.ts'), 'E-2 — store-core-graph.ts byte-unchanged').toBe(
      '8995f0abf884d5a1b8385b20a3ddbcba9b1d4ec5919b39fed780d7d2f76829f2',
    )
    expect(digestOf('src/renderer/store-graph-references.ts'), 'E-2 — store-graph-references.ts byte-unchanged').toBe(
      '5c0c1a971d7f9268866b46b4d34f803694dd5a43f3b06a0cf81012c20d8f9657',
    )
  })

  it('E-3 — the two landed suites exist to be added to (the count probe — listhost 62 rows / slothost 61 rows — is the landing pass’s own vitest run, per the spec’s probe cell)', () => {
    expect(existsSync(new URL('../tests/owned-list-host.test.ts', import.meta.url)), 'E-3 — the landed list-host suite exists').toBe(true)
    expect(existsSync(new URL('../tests/slot-host.test.ts', import.meta.url)), 'E-3 — the landed slot-host suite exists').toBe(true)
  })
})

// ---------------------------------------------------------------------------
// §5.5.1 — THE REGISTER'S EXECUTED LAYER. Six typed rows, 79 declared attempts,
// all executed deterministically — no generator, no pinned seed, no new
// dependency (AGENTS.md item 11(d); the engine-pin precedent). The runner
// enforces stop-after-5-consecutive-failures per row; an un-run attempt is
// reported as a FAILURE. The totals print WITH their terms
// (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS). §7 item 3: a leak arm observed by
// F-LS-1/F-SS-1, F-LS-2/F-SS-2 or F-LS-3/F-SS-3 BLOCKS the passing of the TP rows'
// dispose step.
// ---------------------------------------------------------------------------

interface RegisterRowResult {
  rowId: string
  strategy: string
  type: string
  declared: number
  run: number
  failures: Array<{ attempt: number; message: string }>
}

function runRegisterRow(
  rowId: string,
  strategy: string,
  type: string,
  attempts: Array<() => void>,
  note: string,
): RegisterRowResult {
  const declared = attempts.length
  const failures: Array<{ attempt: number; message: string }> = []
  let consecutive = 0
  let run = 0
  for (let index = 0; index < declared; index += 1) {
    if (consecutive >= 5) break
    run += 1
    try {
      attempts[index]()
      consecutive = 0
    } catch (error) {
      consecutive += 1
      failures.push({ attempt: index + 1, message: error instanceof Error ? error.message : String(error) })
    }
  }
  const unRun = declared - run
  const held = failures.length === 0 && unRun === 0
  console.log(
    `[§5.5.1] ${rowId} (${strategy}, ${type}): ${run}/${declared} attempts run` +
      `${unRun > 0 ? `, ${unRun} UN-RUN (stop-after-5) — FAILURE` : ''} — ${held ? 'HELD' : 'BROKEN'}` +
      `${failures.length > 0 ? ` — ${failures.length} failing cells` : ''}${note !== '' ? ` — ${note}` : ''}`,
  )
  return { rowId, strategy, type, declared, run, failures }
}

function assertRegisterResult(result: RegisterRowResult): void {
  if (result.run !== result.declared) {
    throw new Error(`${result.rowId}: ${result.declared - result.run} declared attempts UN-RUN — an un-run register row is a FAILURE`)
  }
  if (result.failures.length > 0) {
    throw new Error(`${result.rowId} (${result.strategy}): ${result.failures.length} failing cells:\n${result.failures
      .map((failure) => `  attempt ${failure.attempt}: ${failure.message}`)
      .join('\n')}`)
  }
}

/** THE FIXED 8-CALL SCRIPT of P-SMB-LH-TP-1 (§5.5.1): a FIXED ARGUMENT TUPLE
 *  (fixed options incl. hostId 'h1') — setEntries, setOrder, render, activate,
 *  setOrder, remove, keys, dispose. */
function runLhScript(store: GraphStore): unknown[] {
  const host = makeListHost(store, 'h1')
  const nodeA = makeNode()
  const nodeB = makeNode()
  return [
    host.setEntries([{ key: 'a', node: nodeA }, { key: 'b', node: nodeB }]),
    host.setOrder(['b', 'a']),
    host.render(),
    host.activate('b'),
    host.setOrder(['a', 'b']),
    host.remove('a'),
    host.keys(),
    host.dispose(),
  ]
}

function lhReadbacks(store: GraphStore): unknown[] {
  return [store.resolve('mem.list.h1.order'), store.resolve('mem.list.h1.node.b')]
}

/** THE FIXED 8-CALL SCRIPT of P-SMB-SH-TP-1 (the spec's own enumeration):
 *  setNode, setOrder, render, keys, containerFor, remove, render, dispose. */
function runShScript(store: GraphStore): unknown[] {
  const host = makeSlotHost(store, 'h1', makeContainerFactory(), ['a', 'b'])
  return [
    host.setNode('a', makeNode()),
    host.setOrder(['b', 'a']),
    host.render(),
    host.keys(),
    host.containerFor('a'),
    host.remove('b'),
    host.render(),
    host.dispose(),
  ]
}

function shReadbacks(store: GraphStore): unknown[] {
  return [store.resolve('mem.slots.h1.a')]
}

function tierStore(tier: 'cold' | 'shadowing' | 'committed', family: 'list' | 'slots'): GraphStore {
  const store = wiredGraphStore()
  if (family === 'list') {
    if (tier === 'shadowing') {
      store.seed?.([
        { name: 'temp.list.h1.order', value: 'SHADOW-ORDER' },
        { name: 'temp.list.h1.node.b', value: 'SHADOW-NODE-B' },
      ])
    } else if (tier === 'committed') {
      store.seed?.([
        { name: 'file.list.h1.order', value: 'COMMITTED-ORDER' },
        { name: 'file.list.h1.node.b', value: 'COMMITTED-NODE-B' },
      ])
    }
  } else {
    if (tier === 'shadowing') {
      store.seed?.([
        { name: 'temp.slots.h1.a', value: { SHADOW: true } },
      ])
    } else if (tier === 'committed') {
      store.seed?.([
        { name: 'file.slots.h1.a', value: { COMMITTED: true } },
      ])
    }
  }
  if (tier === 'shadowing') {
    store.seed?.([{ name: 'temp.ambient.h1.order', value: 'shadow-ambient' }])
  } else if (tier === 'committed') {
    store.seed?.([{ name: 'file.ambient.h1.order', value: 'file-ambient' }])
  }
  return store
}

describe('H2a U-STORE-MODULES-BYTES — §5.5.1 the register (6 typed rows, 79 declared attempts)', () => {
  it('P-SMB-LH-IM-1 (S-SMB-LH-IM-1, P-IM) — 6 attempts = 3 module readings (raw · normalized · comments-as-code) + 3 positive controls (each banned import corpus MUST FAIL)', () => {
    const result = runRegisterRow('P-SMB-LH-IM-1', 'S-SMB-LH-IM-1', 'P-IM', [
      () => expect(findImports(LIST_HOST_SRC)).toEqual([]),
      () => expect(findImports(normalizeView(LIST_HOST_SRC))).toEqual([]),
      () => expect(findImports(commentsOnly(LIST_HOST_SRC))).toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_A)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_B)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_C)).not.toEqual([]),
    ], 'the store handle arrives ONLY as a declared call parameter')
    assertRegisterResult(result)
  })

  it('P-SMB-LH-IM-2 (S-SMB-LH-IM-2, P-IM) — 4 attempts = 1 top-level module scan + 2 positive controls (const store/let store) + 1 declaration-position check (the options type declares the readonly store member)', () => {
    const result = runRegisterRow('P-SMB-LH-IM-2', 'S-SMB-LH-IM-2', 'P-IM', [
      () => {
        const bindings = topLevelBindings(LIST_HOST_SRC).filter((name) => /^(store|subscription)/i.test(name) || /store/i.test(name))
        expect(bindings).toEqual([])
      },
      () => expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store'),
      () => expect(topLevelBindings('let store;\n')).toContain('store'),
      () => expect(/\breadonly\s+store\s*:/.test(LIST_HOST_SRC), 'the options type declares the store member as a readonly call-parameter member').toBe(true),
    ], 'declaration-position check red today: OwnedListHostOptions does not declare the store member')
    assertRegisterResult(result)
  })

  it('P-SMB-LH-TP-1 (S-SMB-LH-TP-1, P-TP) — 31 attempts = 3 runs × (8 script answers + 2 readbacks) + 1 positive control (the ambient-reading fixture MUST FAIL the cross-run equality); COLD / SHADOWING / COMMITTED; R-3 canonical comparator; §7 item 3: a red leak arm BLOCKS this row’s dispose step', () => {
    const cold = tierStore('cold', 'list')
    const shadowing = tierStore('shadowing', 'list')
    const committed = tierStore('committed', 'list')
    const runs: Record<'cold' | 'shadowing' | 'committed', { answers: unknown[]; readbacks: unknown[] }> = {
      cold: { answers: runLhScript(cold), readbacks: lhReadbacks(cold) },
      shadowing: { answers: runLhScript(shadowing), readbacks: lhReadbacks(shadowing) },
      committed: { answers: runLhScript(committed), readbacks: lhReadbacks(committed) },
    }
    const cells: Array<() => void> = []
    // 3 runs × 10 cells — run-major, in the declared order
    for (const run of ['cold', 'shadowing', 'committed'] as const) {
      for (let index = 0; index < 8; index += 1) {
        cells.push(() => {
          expect(canonicalProjection(runs[run].answers[index])).toEqual(canonicalProjection(runs.cold.answers[index]))
        })
      }
      for (let index = 0; index < 2; index += 1) {
        cells.push(() => {
          expect(canonicalProjection(runs[run].readbacks[index])).toEqual(canonicalProjection(runs.cold.readbacks[index]))
        })
      }
    }
    // + 1 positive control — the ambient-reading fixture MUST FAIL the cross-run equality
    cells.push(() => {
      const answers = [ambientFixture(cold, 'h1'), ambientFixture(shadowing, 'h1'), ambientFixture(committed, 'h1')]
      const differs = answers[0] !== answers[1] || answers[1] !== answers[2] || answers[0] !== answers[2]
      expect(differs, 'P-SMB-LH-TP-1 control — an ambient-reading fixture MUST differ across tier states (the probe is non-vacuous)').toBe(true)
    })
    const result = runRegisterRow('P-SMB-LH-TP-1', 'S-SMB-LH-TP-1', 'P-TP', cells,
      'red today: the readback cells differ across tier states (the module never wrote its mem copies); dispose step BLOCKED by the red leak arms (F-LS-1/F-LS-2/F-LS-3, §7 item 3)')
    assertRegisterResult(result)
  })

  it('P-SMB-SH-IM-1 (S-SMB-SH-IM-1, P-IM) — 6 attempts = 3 module readings + 3 positive controls (same shape as P-SMB-LH-IM-1)', () => {
    const result = runRegisterRow('P-SMB-SH-IM-1', 'S-SMB-SH-IM-1', 'P-IM', [
      () => expect(findImports(SLOT_HOST_SRC)).toEqual([]),
      () => expect(findImports(normalizeView(SLOT_HOST_SRC))).toEqual([]),
      () => expect(findImports(commentsOnly(SLOT_HOST_SRC))).toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_A)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_B)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_C)).not.toEqual([]),
    ], 'the store handle arrives ONLY as a declared call parameter')
    assertRegisterResult(result)
  })

  it('P-SMB-SH-IM-2 (S-SMB-SH-IM-2, P-IM) — 4 attempts = 1 top-level module scan + 2 positive controls + 1 declaration-position check (SlotHostOptions declares the readonly store member)', () => {
    const result = runRegisterRow('P-SMB-SH-IM-2', 'S-SMB-SH-IM-2', 'P-IM', [
      () => {
        const bindings = topLevelBindings(SLOT_HOST_SRC).filter((name) => /^(store|subscription)/i.test(name) || /store/i.test(name))
        expect(bindings).toEqual([])
      },
      () => expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store'),
      () => expect(topLevelBindings('let store;\n')).toContain('store'),
      () => expect(/\breadonly\s+store\s*:/.test(SLOT_HOST_SRC), 'the options type declares the store member as a readonly call-parameter member').toBe(true),
    ], 'declaration-position check red today: SlotHostOptions does not declare the store member')
    assertRegisterResult(result)
  })

  it('P-SMB-SH-TP-1 (S-SMB-SH-TP-1, P-TP) — 28 attempts = 3 runs × (8 script answers + 1 readback) + 1 positive control; the spec’s own fixed 8-call script (setNode, setOrder, render, keys, containerFor, remove, render, dispose) + 1 readback (mem.slots.<hostId>.<key> for one declared key)', () => {
    const cold = tierStore('cold', 'slots')
    const shadowing = tierStore('shadowing', 'slots')
    const committed = tierStore('committed', 'slots')
    const runs: Record<'cold' | 'shadowing' | 'committed', { answers: unknown[]; readbacks: unknown[] }> = {
      cold: { answers: runShScript(cold), readbacks: shReadbacks(cold) },
      shadowing: { answers: runShScript(shadowing), readbacks: shReadbacks(shadowing) },
      committed: { answers: runShScript(committed), readbacks: shReadbacks(committed) },
    }
    const cells: Array<() => void> = []
    for (const run of ['cold', 'shadowing', 'committed'] as const) {
      for (let index = 0; index < 8; index += 1) {
        cells.push(() => {
          expect(canonicalProjection(runs[run].answers[index])).toEqual(canonicalProjection(runs.cold.answers[index]))
        })
      }
      for (let index = 0; index < 1; index += 1) {
        cells.push(() => {
          expect(canonicalProjection(runs[run].readbacks[index])).toEqual(canonicalProjection(runs.cold.readbacks[index]))
        })
      }
    }
    cells.push(() => {
      const answers = [ambientFixture(cold, 'h1'), ambientFixture(shadowing, 'h1'), ambientFixture(committed, 'h1')]
      const differs = answers[0] !== answers[1] || answers[1] !== answers[2] || answers[0] !== answers[2]
      expect(differs, 'P-SMB-SH-TP-1 control — an ambient-reading fixture MUST differ across tier states').toBe(true)
    })
    const result = runRegisterRow('P-SMB-SH-TP-1', 'S-SMB-SH-TP-1', 'P-TP', cells,
      'red today: the readback cell differs across tier states (the module never wrote its mem copy); dispose step BLOCKED by the red leak arms (F-SS-1/F-SS-2/F-SS-3, §7 item 3)')
    assertRegisterResult(result)
  })

  it('§5.5.3 — the attempt arithmetic prints WITH its terms (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS): 79 = 6 + 4 + 31 + 6 + 4 + 28; caps ≤100 per row and ≤400 total hold', () => {
    const terms = [6, 4, 31, 6, 4, 28]
    const total = terms.reduce((sum, term) => sum + term, 0)
    expect(total).toBe(79)
    expect(Math.max(...terms), 'per-row cap ≤ 100').toBeLessThanOrEqual(100)
    expect(total, 'total cap ≤ 400').toBeLessThanOrEqual(400)
    console.log(
      '[§5.5.1] TOTALS: 79 = 6 (P-SMB-LH-IM-1) + 4 (P-SMB-LH-IM-2) + 31 (P-SMB-LH-TP-1) + 6 (P-SMB-SH-IM-1) + 4 (P-SMB-SH-IM-2) + 28 (P-SMB-SH-TP-1)' +
        ' — chain 6 → 10 → 41 → 47 → 51 → 79 · per-family subtotals IM 20 · TP 59 · caps 79 ≤ 400 ✔ · max row 31 ≤ 100 ✔',
    )
  })
})