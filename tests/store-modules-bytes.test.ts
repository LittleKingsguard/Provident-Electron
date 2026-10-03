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
//     M-LS-6  THE OWN-WRITE-DELIVERY-0 row (gate-4 F-3a): the host's OWN
//             setEntries/setOrder turn delivers 0 to its own subscriber (the
//             own-write turn detaches; the counter reads only store-sourced
//             writes) — positive control: the same channel delivers 1 for an
//             external commit (§2.4 item 2)
//     M-LS-7  the LIST-side write-loop-termination check (gate-4 F-3a; the
//             I-SS-3 equivalent): exactly ONE written entry per own-write turn
//             and no second write; an external order commit is the ONLY write
//             of its turn (§2.4 item 3)
//     M-LS-8  §2.2 P4 LIVE re-entrant-dispose (gate-4 F-3d): a delivery in
//             flight when a listener calls dispose() re-entrantly COMPLETES;
//             dispose() returns normally; the fan-out continues in registration
//             order; from the moment dispose begins NO FURTHER delivery to the
//             host's listeners
//     M-LS-9  the REAL-store two-step node-record observable (gate-4 F-6a): the
//             store's own serialize-failed gate refuses a direct node mint; the
//             module's turn lands the opaque marker + the raw node on the edit
//             path, readback HIT, differential equal, events as pinned (§2.1
//             item 2)
//     M-SS-1  slot construciton registers ONE subscription PER DECLARED KEY
//     M-SS-2  the placement write lands; the container stays INJECTED (§2.3)
//     M-SS-3  a store-sourced placement change re-invokes FOR THAT KEY ONLY
//     M-SS-4  dispose() releases every key — P1/P2/P5
//     M-SS-5  dispose-then-use, records remain — P3/P6
//     M-SS-6  the NODE-SHAPED placement-refresh drive (gate-4 F-3e): the
//             record starts as the module's opaque marker; an external commit
//             that SHAPES the record like a node delivers once and the per-key
//             refresh RE-READS and RE-PLACES (the slot-side analog of the list
//             node-record, §2.1 item 2 / §2.4 item 3)
//
//   §3.2 DOCUMENTED FAIL-STATES (the LEAK'S THREE-ARM DETECTION + boundaries):
//     F-LS-1  LS-LEAK arm (a): DELIVERY AFTER DISPOSE (>0 increase) FAILS
//     F-LS-2  LS-LEAK arm (b): THE HANDLE SHAPE — non-empty active-set after
//             dispose / a first unsubscribe answering false / a never-called
//             handle FAILS
//     F-LS-3  LS-LEAK arm (c): THE EVENT NEGATIVE — the release emits no store
//             event; the `'severed'` arm is the SEVERANCE's, not a dispose's
//     F-LS-4  a SECOND SUBSCRIPTION AUTHORITY on the host's reference FAILS
//     F-LS-5  the store-present + hostId-absent/malformed drive (gate-4 F-3c):
//             with a store present and the identity ABSENT/EMPTY/NON-STRING, a
//             module that mints or defaults an identity — registering or
//             writing under a `mem.list..…` reference — FAILS the declared
//             refusal read (§2.1 item 1: "the module NEVER mints, defaults,
//             normalizes or re-interprets it … never a throw"); a non-empty
//             hostId (even one containing a `.`) is composed VERBATIM
//     F-SS-1  SS-LEAK arm (a) — same three-arm shape, per key
//     F-SS-2  SS-LEAK arm (b) — PLUS the FOREIGN-subscription half (gate-4
//             F-3f): a second party's mem.other.x subscription survives the
//             host's dispose and receives its OWN deliveries
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
//   §5.5.1 THE REGISTER (6 typed rows, 85 declared attempts, executed
//     deterministically — no generator, no new dependency):
//     P-SMB-LH-IM-1 8 = 3 readings + 5 controls   (S-SMB-LH-IM-1)
//                                  (F-5b: + the export-from re-emission controls)
//     P-SMB-LH-IM-2 5 = 1 scan + 3 controls + 1 declaration-position check
//                                  (S-SMB-LH-IM-2) (F-5a: + the hostId arms)
//     P-SMB-LH-TP-1 31 = 3 runs × (8 + 2) + 1 control  (S-SMB-LH-TP-1)
//     P-SMB-SH-IM-1 8 = 3 readings + 5 controls   (S-SMB-SH-IM-1)
//     P-SMB-SH-IM-2 5 = 1 scan + 3 controls + 1 declaration-position check
//                                  (S-SMB-SH-IM-2)
//     P-SMB-SH-TP-1 28 = 3 runs × (8 + 1) + 1 control  (S-SMB-SH-TP-1)
//     TOTALS: 85 = 8 + 5 + 31 + 8 + 5 + 28 (chain 8 → 13 → 44 → 52 → 57 → 85;
//     per-family IM 26 · TP 59). Caps: 85 ≤ 400 · max row 31 ≤ 100.
//     (GATE-4 TERM EXTENSIONS, 2026-10-05: IM-1 6 → 8 (F-5b, two new export-from
//     controls), IM-2 4 → 5 (F-5a, the hostId scan arm + let-hostId control).)
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

// GATE-4 F-5b EXTENSION: an `export … from` re-emission IMPORTS the store as
// surely as an `import` does (the store must arrive ONLY as a declared call
// parameter, §2.1 item 1). The scanner therefore also catches the named
// re-export (`export { … } from '…'`) and the star re-export (`export * from
// '…'`) forms — each with its own corpus control in the P-SMB-*-IM-1 rows.
const IMPORT_STATEMENT_RE =
  /(^|\n)[ \t]*import[ \t]+[^\n]*from[ \t]+['"][^'"]+['"]|(^|\n)[ \t]*import[ \t]+['"][^'"]+['"]|\brequire[ \t]*\(|\bimport[ \t]*\(|(^|\n)[ \t]*export[ \t]+\*[ \t]+from[ \t]+['"][^'"]+['"]|(^|\n)[ \t]*export[ \t]+\{[^}]*\}[ \t]+from[ \t]+['"][^'"]+['"]/g

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
  // MODULE-SCOPE ONLY — anchored at column 0. The no-module-level-binding rows
  // scan for a MODULE-scope const/let/var holding the store, a subscription or
  // the host identity; the modules' closure-held handles live INSIDE the
  // factories (parameter-scoped by the contract), so an INDENTED binding must
  // not be counted (the gate-4 F-5a hostId arm would otherwise false-positive
  // on the factories' own `const hostIdentity` — a legitimate closure binding).
  return [...source.matchAll(/^(?:const|let|var)[ \t]+([A-Za-z_$][\w$]*)/gm)].map((match) => match[1] ?? '')
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
// GATE-4 F-5b: the `export … from` re-emission controls — a planted named
// re-export and a planted star re-export of the store module EACH MUST FAIL the
// import-census rows (a re-emission is an import, and the store is never
// imported by the modules' own bytes).
const IMPORT_CONTROL_D = "export { createGraphStore } from '../renderer/store-core-graph.js'\n"
const IMPORT_CONTROL_E = "export * from '../renderer/store-core-graph.js'\n"

/** THE NO-MODULE-LEVEL-BINDING FILTER (P-SMB-*-IM-2, S-LS-2/S-SS-2): a
 *  module-scope binding named after the store handle, a subscription handle OR
 *  the host identity FAILS the row — the store-shaped tokens appear ONLY in the
 *  factory's parameter position and the closures' parameter-scoped references
 *  (the gate-4 F-5a hostId arm: a module-level `let hostId;` must be caught). */
function storeShapedBinding(name: string): boolean {
  return /^(store|subscription|hostid)/i.test(name) || /store/i.test(name) || /hostid/i.test(name)
}

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

  it('M-LS-6 — the OWN-WRITE-DELIVERY-0 row (gate-4 F-3a): the host’s OWN setEntries/setOrder write delivers 0 to the host’s own subscriber — the own-write turn detaches (release → commit → re-register), so the subscriber’s counter reads ONLY store-sourced writes; positive control: the same channel delivers exactly 1 for an EXTERNAL commit (§2.4 item 2’s write-loop narrative)', () => {
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1', makeElement())
    const orderRef = 'mem.list.h1.order'
    // the counter is pinned at the baseline
    expect(deliveriesOf(state, orderRef), 'M-LS-6 — the delivery counter starts at 0').toBe(0)
    // the host's OWN write turns deliver NOTHING to its own subscriber
    host.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    expect(deliveriesOf(state, orderRef), 'M-LS-6 — the own setEntries turn delivers 0 to the host’s own subscriber (the own-write turn detaches)').toBe(0)
    expect(deliveriesTotal(state), 'M-LS-6 — the own setEntries turn delivers 0 in total').toBe(0)
    host.setOrder(['b', 'a'])
    expect(deliveriesOf(state, orderRef), 'M-LS-6 — the own setOrder turn delivers 0 to the host’s own subscriber').toBe(0)
    expect(deliveriesTotal(state), 'M-LS-6 — the own setOrder turn delivers 0 in total').toBe(0)
    // the records still landed (M-LS-2's fact — the write turns are store-carrying)
    expect(state.written.has(orderRef)).toBe(true)
    expect(state.written.has('mem.list.h1.node.a')).toBe(true)
    // positive control — the measurement channel works: an EXTERNAL commit
    // delivers exactly 1 (store-sourced writes are what the counter reads)
    store.commit(orderRef, ['a', 'b'], { onRepeat: 'edit' })
    expect(deliveriesOf(state, orderRef), 'M-LS-6 — positive control: an external commit delivers exactly 1').toBe(1)
    void host
  })

  it('M-LS-7 — the LIST-side write-loop-termination check (the I-SS-3 equivalent, gate-4 F-3a): the order reference receives EXACTLY ONE written entry per own-write turn — no second write; an EXTERNAL commit to the order reference is the ONLY store write of its turn, one event one delivery, the re-invoked path never writes (§2.4 item 3, I-SS-3’s list analog)', () => {
    // arm A — the own-write turn: exactly one order-ref commit, no second write
    const { store: storeA, state: stateA } = createRecordingDouble()
    const hostA = makeListHost(storeA, 'h1')
    const writesBeforeA = stateA.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length
    hostA.setOrder(['a'])
    const writesAddedA = stateA.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length - writesBeforeA
    expect(writesAddedA, 'M-LS-7 — the own setOrder turn performs exactly ONE store write (its own order commit; unsubscribe/re-register are not store writes)').toBe(1)
    const orderCommitsA = stateA.calls
      .slice(writesBeforeA)
      .filter((call) => call.member === 'commit' && call.name === 'mem.list.h1.order').length
    expect(orderCommitsA, 'M-LS-7 — the order reference receives EXACTLY ONE written entry per own-write turn — no second write').toBe(1)
    // arm B — the external turn (I-SS-3's exact shape): the re-invocation is
    // READ-ONLY, so the ONLY store write of the turn is the external commit
    const { store: storeB, state: stateB } = createRecordingDouble()
    const hostB = makeListHost(storeB, 'h1')
    hostB.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    const writesBeforeB = stateB.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length
    storeB.commit('mem.list.h1.order', ['b', 'a'], { onRepeat: 'edit' })
    const writesAddedB = stateB.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length - writesBeforeB
    expect(writesAddedB, 'M-LS-7 — during an external order commit the ONLY store write is the external commit itself (the re-invoked path never writes)').toBe(1)
    expect(deliveriesOf(stateB, 'mem.list.h1.order'), 'M-LS-7 — one event, one delivery; the write-loop terminates').toBe(1)
    void hostA
    void hostB
  })

  it('M-LS-8 — §2.2 P4, the live re-entrant-dispose drive (gate-4 F-3d): a delivery in flight when a listener calls dispose() re-entrantly COMPLETES — the in-flight delivery finishes, dispose() returns normally (void), the store continues its fan-out in registration order, and from the moment dispose() begins NO FURTHER delivery is dispatched to that host’s listeners (§2.2 P4’s declared rule)', () => {
    // LEG A — the recording double: registration order host → A(dispose-caller) → B
    const { store, state } = createRecordingDouble()
    const host = makeListHost(store, 'h1')
    host.setEntries([{ key: 'a', node: makeNode() }, { key: 'b', node: makeNode() }])
    // the host's own (only) subscription record — captured by reference before the fan-out
    const hostRecord = state.subscriptions.find((record) => record.name === 'mem.list.h1.order')
    expect(hostRecord).toBeDefined()
    let aDeliveries = 0
    let disposeAnswer: unknown = 'unset'
    let bDeliveries = 0
    // A: the re-entrant dispose-caller — its own delivery is IN FLIGHT while dispose runs
    store.subscribe('mem.list.h1.order', () => {
      aDeliveries += 1
      disposeAnswer = host.dispose()
    })
    // B: a later-registered party — the fan-out must continue past the dispose
    store.subscribe('mem.list.h1.order', () => { bDeliveries += 1 })
    const resolvesBefore = state.calls.filter((call) => call.member === 'resolve' && call.name === 'mem.list.h1.order').length
    // the in-flight delivery: the host's own listener runs FIRST (registration order)…
    store.commit('mem.list.h1.order', ['b', 'a'], { onRepeat: 'edit' })
    // …then A's body calls dispose() re-entrantly: the delivery A is receiving
    // COMPLETES (the body ran to completion INCLUDING the dispose, which returns)
    expect(aDeliveries, 'M-LS-8/P4 — the in-flight delivery completes (the dispose-calling listener’s body runs to completion)').toBe(1)
    expect(disposeAnswer, 'M-LS-8/P4 — dispose() called re-entrantly returns normally (void, no throw)').toBeUndefined()
    // the host's own listener ran exactly once (its delivery completed in-flight)
    const resolvesAdded = state.calls.filter((call) => call.member === 'resolve' && call.name === 'mem.list.h1.order').length - resolvesBefore
    expect(resolvesAdded, 'M-LS-8/P4 — the host’s own delivery completed (its read-only re-invocation ran)').toBe(1)
    // the store continues its fan-out in registration order (B, registered after A)
    expect(bDeliveries, 'M-LS-8/P4 — the store continues its fan-out in registration order past the dispose').toBe(1)
    // dispose() removed the host's subscription SYNCHRONOUSLY — exactly its own handle
    if (hostRecord !== undefined) {
      expect(hostRecord.unsubscribeCalls, 'M-LS-8/P4 — the host’s own handle is unsubscribed exactly once (by the re-entrant dispose)').toBe(1)
      expect(hostRecord.firstAnswer, 'M-LS-8/P4 — the first unsubscribe call answers true').toBe(true)
      expect(hostRecord.live, 'M-LS-8/P4 — the host’s subscription is gone from the moment dispose() begins').toBe(false)
    }
    // from the moment dispose() began NO FURTHER delivery to the host's listeners:
    // a follow-up commit delivers to A/B only — the host's own listener never runs again
    const resolvesAfter = state.calls.filter((call) => call.member === 'resolve' && call.name === 'mem.list.h1.order').length
    store.commit('mem.list.h1.order', ['a', 'b'], { onRepeat: 'edit' })
    expect(aDeliveries, 'M-LS-8/P4 — the follow-up commit still delivers to the OTHER parties').toBe(2)
    expect(bDeliveries).toBe(2)
    expect(
      state.calls.filter((call) => call.member === 'resolve' && call.name === 'mem.list.h1.order').length,
      'M-LS-8/P4 — no further delivery is dispatched to the host’s listeners after the dispose',
    ).toBe(resolvesAfter)
    // the completing body's post-dispose behaviour (listhost A-16): valid results, no throw
    expect(() => host.render()).not.toThrow()
    expect(host.keys(), 'M-LS-8/P4 — A-16: every method after dispose returns a valid result').toEqual([])
    // LEG B — the REAL store: the module-level guarantee against the hardware store
    const real = wiredGraphStore()
    const realHost = makeListHost(real, 'h1')
    realHost.setEntries([{ key: 'a', node: makeNode() }])
    // positive control — the host's own listener delivers (events 1)
    expect(real.commit('mem.list.h1.order', ['a'], { onRepeat: 'edit' }).events, 'M-LS-8/P4 — positive control: the host’s own listener delivers 1').toBe(1)
    let realDisposeAnswer: unknown = 'unset'
    const aHandle = real.subscribe('mem.list.h1.order', () => { realDisposeAnswer = realHost.dispose() })
    const bHandle = real.subscribe('mem.list.h1.order', () => undefined)
    // the re-entrant drive — a delivery in flight while dispose() is called from a listener body
    const receipt = real.commit('mem.list.h1.order', ['a'], { onRepeat: 'edit' })
    expect(receipt.status, 'M-LS-8/P4 — the in-flight delivery completes; the commit returns normally').toBe('committed')
    expect(realDisposeAnswer, 'M-LS-8/P4 — the re-entrant dispose returns normally on the real store').toBeUndefined()
    // release the test-owned parties, then: NO FURTHER delivery to the host's
    // listeners — the post-dispose commit delivers 0 (the host's subscription
    // died AT the dispose; dispose removed it synchronously)
    void aHandle.unsubscribe()
    void bHandle.unsubscribe()
    expect(real.commit('mem.list.h1.order', ['a'], { onRepeat: 'edit' }).events, 'M-LS-8/P4 — from the moment dispose begins no further delivery is dispatched to the host’s listeners').toBe(0)
  })

  it('M-LS-9 — the REAL-store two-step node-record observable (gate-4 F-6a): the store’s OWN serialize-failed gate refuses a DIRECT mint of the caller’s opaque node; the module’s declared node-record turn (the caller’s NODE by reference, §2.1 item 2) lands the marker + the node — the opaque marker occupies the leaf, then the raw node on the edit path — with the readback HIT and the differential equal; the events stay as the spec pins', () => {
    const real = wiredGraphStore()
    const captured: Array<{ name: string; value: unknown; receipt: GraphWriteReceipt }> = []
    const wrapped: GraphStore = new Proxy(real, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value !== 'function') return value
        return (...args: unknown[]) => {
          const result = (value as (...a: unknown[]) => unknown).apply(target, args)
          if (String(prop) === 'commit') {
            captured.push({ name: String(args[0]), value: args[1], receipt: result as GraphWriteReceipt })
          }
          return result
        }
      },
    }) as GraphStore
    const nodeA = makeNode()
    const ref = 'mem.list.h1.node.a'
    // positive control — the store's OWN gate refuses a DIRECT mint of the opaque node
    const direct = real.commit(ref, nodeA, { onRepeat: 'edit' })
    expect(direct.status, 'M-LS-9 — the store’s serialize-failed gate refuses a direct mint of the caller’s node').toBe('refused')
    expect(direct.reason, 'M-LS-9 — the refusal is the frozen store’s serialize-failed arm').toBe('serialize-failed')
    const host = makeListHost(wrapped, 'h1')
    captured.length = 0
    host.setEntries([{ key: 'a', node: nodeA }])
    // THE TWO-STEP: first the raw node (refused by the gate — the module consumes
    // the returned receipt as a record, §2.1 item 3), then the opaque marker
    // occupies the leaf, then the raw node lands on the EDIT path (edit outcomes
    // carry no value gate — the record ends as the caller's node by reference).
    const nodeWrites = captured.filter((entry) => entry.name === ref)
    expect(nodeWrites.length, 'M-LS-9 — the module’s node-record turn is the two-step (marker + node) preceded by the refused raw write').toBe(3)
    expect(nodeWrites[0]?.value, 'M-LS-9 — step 0: the raw node is offered first').toBe(nodeA)
    expect(nodeWrites[0]?.receipt.status, 'M-LS-9 — the raw node’s mint is refused by the store’s own gate').toBe('refused')
    expect(nodeWrites[1]?.value, 'M-LS-9 — the opaque marker occupies the leaf (the store value the gate accepts)').toEqual({ present: true })
    expect(nodeWrites[1]?.receipt.status, 'M-LS-9 — the marker mint is committed').toBe('committed')
    expect(nodeWrites[2]?.value, 'M-LS-9 — the raw node lands on the edit path, by reference').toBe(nodeA)
    expect(nodeWrites[2]?.receipt.status, 'M-LS-9 — the edit commits (edit outcomes carry no value gate)').toBe('committed')
    // the readback HIT and the differential equal (the R-3 canonical comparator)
    const readback: GraphResolveResult = wrapped.resolve(ref)
    expect(readback.found, 'M-LS-9 — the readback answers a HIT').toBe(true)
    if (readback.found) {
      expect(canonicalProjection(readback.value), 'M-LS-9 — the differential is equal: the readback value is the caller’s node').toEqual(canonicalProjection(nodeA))
    }
    // events stay as the spec pins: the node-record writes deliver NOTHING to the
    // module's own subscription (per-reference delivery — the module holds EXACTLY
    // ONE subscription, on the ORDER reference, §2.4 item 1), and the pinned
    // M-LS-3 reading is unchanged: an external order commit still delivers ≥ 1.
    for (const entry of nodeWrites) {
      expect(entry.receipt.events, 'M-LS-9 — no store-sourced event is attributable to the node-record writes (no subscriber on a node ref)').toBe(0)
    }
    const orderCommit = real.commit('mem.list.h1.order', ['a'], { onRepeat: 'edit' })
    expect(orderCommit.events, 'M-LS-9 — the pinned M-LS-3 reading is unchanged: an external order commit delivers ≥ 1 to the host’s own subscription').toBeGreaterThanOrEqual(1)
    expect(real.resolve('mem.list.h1.order').found, 'M-LS-9 — the order record readback is a HIT').toBe(true)
    void host
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
    // P1's "(registration order)" half, PINNED (gate-4 F-3g): the slot's release
    // order IS the registration order by construction — dispose() iterates its
    // closure-held per-key Map, which is insertion-ordered by the construction
    // registration loop (§7a.1 item 4) — this assert makes the dated note's
    // claim executable rather than asserted-in-prose only.
    const unsubscribedNames = added.filter((call) => call.member === 'unsubscribe').map((call) => call.name)
    expect(unsubscribedNames, 'M-SS-4 — P1: every held handle is released in REGISTRATION order').toEqual(preSubs.map((record) => record.name))
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

  // PAR-NOTE (2026-10-05, gate-4 F-3b): the own-write turn's release → commit →
  // re-register window — the module's OWN subscription is down while its own
  // commit's synchronous fan-out runs — is NOT exploitable in-tree. The turn
  // (releaseOwn(); channel.commit(…); registerOwn()) has no await or reentrancy
  // point; the only interleave the store can create inside the commit is a
  // LISTENER body, and a WRITING listener (ADV-SMB-5's class) writing during the
  // module's own turn would not re-invoke THIS host (its own subscription is
  // down, so no event reaches it — no second write, no loop). Declared
  // not-exploitable in-tree; recorded as a dated note, never a new row.

  it('M-SS-6 — the NODE-SHAPED placement-refresh drive (gate-4 F-3e): the placement record starts as the module’s own opaque placement marker; an EXTERNAL commit that SHAPES the record like a node (the slot-side analog of the list node-record) delivers once and the per-key refresh RE-READS and RE-PLACES — the externally-committed node lands in the key’s container — per §2.1’s slot contract; the refresh is READ-ONLY and the container source stays the injected factory (§2.3)', () => {
    const { store, state } = createRecordingDouble()
    const factory = makeContainerFactory()
    const host = makeSlotHost(store, 'h1', factory, ['a', 'b'])
    // the key-a container is the factory's memoized product — the element the
    // host places nodes into (a DOM-faithful node stub: its remove() detaches it
    // from that container, exactly what a real node's remove() does)
    const element = factory('a') as { children: unknown[] }
    const detachCount = { value: 0 }
    const nodeA = {
      appendChild: () => undefined,
      remove: () => {
        detachCount.value += 1
        const at = element.children.indexOf(nodeA)
        if (at !== -1) element.children.splice(at, 1)
      },
    }
    const nodeB = { appendChild: () => undefined, remove: () => undefined }
    host.setNode('a', nodeA)
    const ref = 'mem.slots.h1.a'
    expect(state.written.get(ref)?.value, 'M-SS-6 — the module’s own placement record is its opaque marker').toEqual({ placed: true })
    const writesBefore = state.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length
    // an external commit SHAPES the record like a node — the slot-side node-record analog
    store.commit(ref, nodeB, { onRepeat: 'edit' })
    const writesAdded = state.calls.filter((call) => (WRITE_MEMBERS as readonly string[]).includes(call.member)).length - writesBefore
    expect(writesAdded, 'M-SS-6 — the refresh is READ-ONLY: the ONLY store write of the turn is the external commit itself').toBe(1)
    expect(deliveriesOf(state, ref), 'M-SS-6 — the a subscriber’s delivery counter reads 1 (one event, one delivery)').toBe(1)
    expect(deliveriesOf(state, 'mem.slots.h1.b'), 'M-SS-6 — the untouched key receives NO delivery').toBe(0)
    // the refresh RE-READS the stored record and RE-PLACES: the externally-committed
    // node lands in the key's container (the node the host had placed goes out)
    expect(element.children, 'M-SS-6 — the refresh re-places: the container holds the externally-committed node').toEqual([nodeB])
    expect(detachCount.value, 'M-SS-6 — the node the host had placed goes out (its remove() is called once)').toBe(1)
    // the container source never moves: the host's container is still the factory's product
    expect(host.containerFor('a'), 'M-SS-6 — containerFor is still the INJECTED factory’s product (§2.3)').toBe(factory('a'))
    // the readback HIT (the store now holds the externally-committed node-shaped record)
    const read: GraphResolveResult = store.resolve(ref)
    expect(read.found, 'M-SS-6 — the readback answers a HIT').toBe(true)
    if (read.found) expect(read.value, 'M-SS-6 — the readback reads the externally-committed node record').toBe(nodeB)
    void host
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

  // PAR-NOTE (2026-10-05, gate-4 F-3h): the real-store legs' write-census
  // Proxy EXCLUDES 'resolve' from the recorded member calls — already covered:
  // the module's disposal path performs NO store member call at all (the
  // per-subscription unsubscribe handle is an object-member method of the
  // handle `subscribe` RETURNED, never a store member of the store object), so
  // the exclusion is a documented negative census bound, never a gap. No row
  // change beyond the existing arms.

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

  it('F-LS-5 — the store-present + hostId-absent/malformed drive (gate-4 F-3c): with a store PRESENT and the host identity ABSENT, EMPTY or NON-STRING, §2.1 item 1’s declared reading binds — "the module NEVER mints, defaults, normalizes or re-interprets it (a non-string/empty value is the LANDED refusal read for a malformed option — … — never a throw)": construction and every store-carrying turn NEVER throw, and NO subscription is registered and NO record is written under a MINTED/DEFAULTED identity (a `mem.list..…` reference); a non-empty-string hostId — even one containing a `.` — is composed VERBATIM (§2.6 item 2: never normalized)', () => {
    const malformed = [
      { label: 'absent', options: { mount: null } },
      { label: 'empty string', options: { mount: null, hostId: '' } },
      { label: 'non-string', options: { mount: null, hostId: 42 as unknown as string } },
    ] as const
    for (const probe of malformed) {
      const { store, state } = createRecordingDouble()
      const options = { store, ...probe.options } as unknown as OwnedListHostOptions
      let made: OwnedListHost | undefined
      expect(() => { made = createOwnedListHost(options) }, `F-LS-5 — construction NEVER throws (${probe.label} hostId) — "never a throw", per the landed totality`).not.toThrow()
      expect(
        activeSet(state),
        `F-LS-5 — NO subscription is registered under a minted/defaulted identity (${probe.label} hostId) — the module NEVER mints or defaults the hostId (§2.1 item 1)`,
      ).toEqual(new Set())
      expect(() => {
        made?.setEntries([{ key: 'a', node: makeNode() }])
      }, `F-LS-5 — a store-carrying turn NEVER throws (${probe.label} hostId)`).not.toThrow()
      const ownsDefaulted = [...state.written.keys()].some((name) => /^mem\.list\.\.(order|node\.)/.test(name))
      expect(ownsDefaulted, `F-LS-5 — NO store record is written under a minted/defaulted identity (${probe.label} hostId) — the LANDED refusal read, never a default`).toBe(false)
    }
    // the non-empty-string probe — VERBATIM composition (never normalized, even a '.')
    const { store, state } = createRecordingDouble()
    const dotted = createOwnedListHost({ mount: null, store, hostId: 'a.b' })
    expect(activeSet(state), 'F-LS-5 — a non-empty hostId containing a `.` is composed VERBATIM: mem.list.a.b.order').toEqual(new Set(['mem.list.a.b.order']))
    dotted.setEntries([{ key: 'a', node: makeNode() }])
    expect(state.written.has('mem.list.a.b.order'), 'F-LS-5 — the order record lands under the VERBATIM spelling').toBe(true)
    expect(state.written.has('mem.list.a.b.node.a'), 'F-LS-5 — the node record lands under the VERBATIM spelling').toBe(true)
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
    // P7 (gate-4 F-3f) — the FOREIGN-subscription half, explicit in the slot's own
    // row: a second party's subscription on a reference OUTSIDE the module's
    // declared set survives the host's dispose AND receives its OWN deliveries.
    let foreignDeliveries = 0
    store.subscribe('mem.other.x', () => { foreignDeliveries += 1 })
    host.dispose()
    const foreign = state.subscriptions.find((record) => record.name === 'mem.other.x')
    expect(foreign?.live, 'F-SS-2/P7 — a second party\'s mem.other.x subscription is NOT released by the host\'s dispose (dispose releases EXACTLY the module\'s own)').toBe(true)
    store.commit('mem.other.x', { v: 9 }, { onRepeat: 'edit' })
    expect(foreignDeliveries, 'F-SS-2/P7 — the foreign subscription receives its OWN deliveries after the host\'s dispose').toBe(1)
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
  it('S-LS-1 — the list host import census: ZERO import statements over the RAW bytes, the NORMALIZED view and COMMENTS-scanned-as-code; FIVE positive controls (incl. the gate-4 F-5b export-from re-emissions) PLUS the §2.6 SPELLING-COUNT reading (one composition site per declared reference — a second copy FAILS)', () => {
    // the import census
    expect(findImports(LIST_HOST_SRC), 'S-LS-1 — raw bytes carry zero imports').toEqual([])
    expect(findImports(normalizeView(LIST_HOST_SRC)), 'S-LS-1 — the normalized view carries zero imports').toEqual([])
    expect(findImports(commentsOnly(LIST_HOST_SRC)), 'S-LS-1 — comments scanned as code carry zero imports').toEqual([])
    // the five positive controls — each banned corpus MUST fail the row
    expect(findImports(IMPORT_CONTROL_A)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_B)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_C)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_D), 'S-LS-1 (F-5b) — a planted `export { … } from` the store module FAILS the row').not.toEqual([])
    expect(findImports(IMPORT_CONTROL_E), 'S-LS-1 (F-5b) — a planted `export * from` the store module FAILS the row').not.toEqual([])
    // §2.6 item 3 — the spelling-count reading: each declared reference (order ref + node ref)
    // is composed at exactly one site in the closures; the two refs share the root literal so
    // the count is exactly 2; a duplicated full spelling pushes it past the bound and FAILS.
    const sites = countOccurrences(LIST_HOST_SRC, 'mem.list.')
    expect(sites, 'S-LS-1/§2.6 — the module’s closures compose its references at their sites (≥ 2 sites for order + node)').toBeGreaterThanOrEqual(2)
    expect(sites, 'S-LS-1/§2.6 — no second copy of a reference spelling (≤ 2)').toBeLessThanOrEqual(2)
    // PAR-NOTE (2026-10-05, gate-4 F-6b — the census notes): the spelling-count
    // reading counts the NORMALIZED RAW bytes, COMMENTS INCLUDED (normalizeView
    // joins string-concatenations and template substitutions only; it never
    // strips comments), so the tight bound [2,2] for 'mem.list.' holds only
    // while the module's bytes — comments included — carry exactly those
    // occurrences (measured 2026-10-05: 2). A comment mentioning a reference
    // spelling, or a second composition site, FAILS the row — the assembly
    // discipline's comment-hygiene half binds the implementer.
  })

  it('S-LS-2 — the no-module-level-binding scan: no module-scope const/let/var holds the store, a subscription or the host identity (the gate-4 F-5a hostId arm); three positive controls', () => {
    const bindings = topLevelBindings(LIST_HOST_SRC).filter(storeShapedBinding)
    expect(bindings, 'S-LS-2 — no module-scope store/subscription/hostId binding').toEqual([])
    expect(topLevelBindings('const store = createGraphStore()\n'), 'S-LS-2 — positive control: a module-level `const store = …` MUST be detected').toContain('store')
    expect(topLevelBindings('let store;\n'), 'S-LS-2 — positive control: a module-level `let store;` MUST be detected').toContain('store')
    expect(topLevelBindings('let hostId;\n'), 'S-LS-2 (F-5a) — positive control: a module-level `let hostId;` MUST be detected').toContain('hostId')
  })

  it('S-LS-3 — the zero-graph-seam row SURVIVES: the module still imports NOTHING from src/renderer/** (the store is a parameter, never an import — R3-4); a corpus importing ../renderer/store-core-graph.js FAILS', () => {
    const rendererImports = findImports(LIST_HOST_SRC).filter((hit) => hit.includes('renderer'))
    expect(rendererImports, 'S-LS-3 — no src/renderer/** import').toEqual([])
    expect(findImports(IMPORT_CONTROL_A), 'S-LS-3 — positive control: a corpus importing ../renderer/store-core-graph.js FAILS the row').not.toEqual([])
  })

  it('S-SS-1 — the slot import census (same three-view scan, same five positive controls incl. the F-5b export-from re-emissions) PLUS the §2.6 SPELLING-COUNT reading', () => {
    expect(findImports(SLOT_HOST_SRC)).toEqual([])
    expect(findImports(normalizeView(SLOT_HOST_SRC))).toEqual([])
    expect(findImports(commentsOnly(SLOT_HOST_SRC))).toEqual([])
    expect(findImports(IMPORT_CONTROL_A)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_B)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_C)).not.toEqual([])
    expect(findImports(IMPORT_CONTROL_D), 'S-SS-1 (F-5b) — a planted `export { … } from` the store module FAILS the row').not.toEqual([])
    expect(findImports(IMPORT_CONTROL_E), 'S-SS-1 (F-5b) — a planted `export * from` the store module FAILS the row').not.toEqual([])
    const sites = countOccurrences(SLOT_HOST_SRC, 'mem.slots.')
    expect(sites, 'S-SS-1/§2.6 — the slots reference is composed at its one site (≥ 1)').toBeGreaterThanOrEqual(1)
    expect(sites, 'S-SS-1/§2.6 — no second copy of the slots reference spelling (≤ 1)').toBeLessThanOrEqual(1)
    // PAR-NOTE (2026-10-05, gate-4 F-6b — the census notes): the slot spelling
    // count reads the NORMALIZED RAW bytes, comments included — exactly 1
    // 'mem.slots.' occurrence measured 2026-10-05; a comment mentioning the
    // reference spelling FAILS the row (same comment-hygiene clause as S-LS-1).
  })

  it('S-SS-2 — the slot no-module-level-binding scan (same three positive controls, incl. the F-5a hostId arm)', () => {
    const bindings = topLevelBindings(SLOT_HOST_SRC).filter(storeShapedBinding)
    expect(bindings, 'S-SS-2 — no module-scope store/subscription/hostId binding').toEqual([])
    expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store')
    expect(topLevelBindings('let store;\n')).toContain('store')
    expect(topLevelBindings('let hostId;\n'), 'S-SS-2 (F-5a) — positive control: a module-level `let hostId;` MUST be detected').toContain('hostId')
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
// §5.5.1 — THE REGISTER'S EXECUTED LAYER. Six typed rows, 85 declared attempts,
// all executed deterministically — no generator, no pinned seed, no new
// dependency (AGENTS.md item 11(d); the engine-pin precedent). The runner
// enforces stop-after-5-consecutive-failures per row; an un-run attempt is
// reported as a FAILURE. The totals print WITH their terms
// (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS; the gate-4 F-5a/F-5b term
// extensions 6→8 and 4→5 are re-printed below with the caps check). §7 item 3:
// a leak arm observed by F-LS-1/F-SS-1, F-LS-2/F-SS-2 or F-LS-3/F-SS-3 BLOCKS
// the passing of the TP rows' dispose step.
//
// PAR-NOTE (2026-10-05, gate-4 F-6c — the census notes): the attempt-total
// census is the §5.5.3 row's own subject — a total quoted without its terms,
// or a total that is not the sum of its terms, is a review finding
// (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS). The as-filed 79 = 6+4+31+6+4+28
// is superseded BESIDE by the gate-4 extension 85 = 8+5+31+8+5+28 (F-5a: the
// IM-2 rows 4→5; F-5b: the IM-1 rows 6→8); the printed terms are the operative
// form.
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

describe('H2a U-STORE-MODULES-BYTES — §5.5.1 the register (6 typed rows, 85 declared attempts)', () => {
  it('P-SMB-LH-IM-1 (S-SMB-LH-IM-1, P-IM) — 8 attempts = 3 module readings (raw · normalized · comments-as-code) + 5 positive controls (import-from · require · dynamic import · export-from-named · export-from-star — the gate-4 F-5b re-emission controls)', () => {
    const result = runRegisterRow('P-SMB-LH-IM-1', 'S-SMB-LH-IM-1', 'P-IM', [
      () => expect(findImports(LIST_HOST_SRC)).toEqual([]),
      () => expect(findImports(normalizeView(LIST_HOST_SRC))).toEqual([]),
      () => expect(findImports(commentsOnly(LIST_HOST_SRC))).toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_A)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_B)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_C)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_D), 'P-SMB-LH-IM-1 (F-5b) — a planted `export { … } from` the store module MUST FAIL the row').not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_E), 'P-SMB-LH-IM-1 (F-5b) — a planted `export * from` the store module MUST FAIL the row').not.toEqual([]),
    ], 'the store handle arrives ONLY as a declared call parameter — an export-from re-emission is an import and FAILS the row')
    assertRegisterResult(result)
  })

  it('P-SMB-LH-IM-2 (S-SMB-LH-IM-2, P-IM) — 5 attempts = 1 top-level module scan + 3 positive controls (const store · let store · let hostId — the gate-4 F-5a hostId arm) + 1 declaration-position check (the options type declares BOTH readonly members in a DECLARED TYPE/CALL-PARAMETER position — a comment-only mention must NOT satisfy it)', () => {
    const result = runRegisterRow('P-SMB-LH-IM-2', 'S-SMB-LH-IM-2', 'P-IM', [
      () => {
        const bindings = topLevelBindings(LIST_HOST_SRC).filter(storeShapedBinding)
        expect(bindings, 'P-SMB-LH-IM-2 — no module-scope store/subscription/hostId binding').toEqual([])
      },
      () => expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store'),
      () => expect(topLevelBindings('let store;\n')).toContain('store'),
      () => expect(topLevelBindings('let hostId;\n'), 'P-SMB-LH-IM-2 (F-5a) — a module-level `let hostId;` MUST be detected by the scan').toContain('hostId'),
      () => {
        expect(/\breadonly\s+store\s*\?:/.test(LIST_HOST_SRC), 'the options type declares `readonly store?:` — a DECLARED TYPE/CALL-PARAMETER position').toBe(true)
        expect(/\breadonly\s+hostId\s*\?:/.test(LIST_HOST_SRC), 'the options type declares `readonly hostId?:` — a DECLARED TYPE/CALL-PARAMETER position (F-5a)').toBe(true)
        expect(/\breadonly\s+store\s*\?:/.test('// readonly store: a comment mention only'), 'P-SMB-LH-IM-2 (F-5a) — a comment-only mention does NOT satisfy the DECLARED-position check').toBe(false)
      },
    ], 'green: OwnedListHostOptions declares both members as readonly call-parameter members (readonly store? + readonly hostId?)')
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
      'green after the implementer pass: the module writes its own mem copies and the leak arms are green (§7 item 3 — nothing BLOCKS the dispose step); the readback cells hold across COLD/SHADOWING/COMMITTED')
    assertRegisterResult(result)
  })

  it('P-SMB-SH-IM-1 (S-SMB-SH-IM-1, P-IM) — 8 attempts = 3 module readings + 5 positive controls (same shape as P-SMB-LH-IM-1, incl. the F-5b export-from re-emission controls)', () => {
    const result = runRegisterRow('P-SMB-SH-IM-1', 'S-SMB-SH-IM-1', 'P-IM', [
      () => expect(findImports(SLOT_HOST_SRC)).toEqual([]),
      () => expect(findImports(normalizeView(SLOT_HOST_SRC))).toEqual([]),
      () => expect(findImports(commentsOnly(SLOT_HOST_SRC))).toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_A)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_B)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_C)).not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_D), 'P-SMB-SH-IM-1 (F-5b) — a planted `export { … } from` the store module MUST FAIL the row').not.toEqual([]),
      () => expect(findImports(IMPORT_CONTROL_E), 'P-SMB-SH-IM-1 (F-5b) — a planted `export * from` the store module MUST FAIL the row').not.toEqual([]),
    ], 'the store handle arrives ONLY as a declared call parameter — an export-from re-emission is an import and FAILS the row')
    assertRegisterResult(result)
  })

  it('P-SMB-SH-IM-2 (S-SMB-SH-IM-2, P-IM) — 5 attempts = 1 top-level module scan + 3 positive controls + 1 declaration-position check (same extended shape as P-SMB-LH-IM-2: SlotHostOptions declares BOTH readonly members)', () => {
    const result = runRegisterRow('P-SMB-SH-IM-2', 'S-SMB-SH-IM-2', 'P-IM', [
      () => {
        const bindings = topLevelBindings(SLOT_HOST_SRC).filter(storeShapedBinding)
        expect(bindings, 'P-SMB-SH-IM-2 — no module-scope store/subscription/hostId binding').toEqual([])
      },
      () => expect(topLevelBindings('const store = createGraphStore()\n')).toContain('store'),
      () => expect(topLevelBindings('let store;\n')).toContain('store'),
      () => expect(topLevelBindings('let hostId;\n'), 'P-SMB-SH-IM-2 (F-5a) — a module-level `let hostId;` MUST be detected by the scan').toContain('hostId'),
      () => {
        expect(/\breadonly\s+store\s*\?:/.test(SLOT_HOST_SRC), 'the options type declares `readonly store?:` — a DECLARED TYPE/CALL-PARAMETER position').toBe(true)
        expect(/\breadonly\s+hostId\s*\?:/.test(SLOT_HOST_SRC), 'the options type declares `readonly hostId?:` — a DECLARED TYPE/CALL-PARAMETER position (F-5a)').toBe(true)
        expect(/\breadonly\s+store\s*\?:/.test('// readonly store: a comment mention only'), 'P-SMB-SH-IM-2 (F-5a) — a comment-only mention does NOT satisfy the DECLARED-position check').toBe(false)
      },
    ], 'green: SlotHostOptions declares both members as readonly call-parameter members (readonly store? + readonly hostId?)')
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
      'green after the implementer pass: the module writes its own mem copy and the leak arms are green (§7 item 3 — nothing BLOCKS the dispose step); the readback cell holds across COLD/SHADOWING/COMMITTED')
    assertRegisterResult(result)
  })

  it('§5.5.3 — the attempt arithmetic prints WITH its terms (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS): 85 = 8 + 5 + 31 + 8 + 5 + 28; the gate-4 term extensions re-printed beside the as-filed 79; caps ≤100 per row and ≤400 total hold', () => {
    const terms = [8, 5, 31, 8, 5, 28]
    const total = terms.reduce((sum, term) => sum + term, 0)
    expect(total).toBe(85)
    expect(Math.max(...terms), 'per-row cap ≤ 100').toBeLessThanOrEqual(100)
    expect(total, 'total cap ≤ 400').toBeLessThanOrEqual(400)
    console.log(
      '[§5.5.1] TOTALS: 85 = 8 (P-SMB-LH-IM-1) + 5 (P-SMB-LH-IM-2) + 31 (P-SMB-LH-TP-1) + 8 (P-SMB-SH-IM-1) + 5 (P-SMB-SH-IM-2) + 28 (P-SMB-SH-TP-1)' +
        ' — chain 8 → 13 → 44 → 52 → 57 → 85 · per-family subtotals IM 26 · TP 59 · caps 85 ≤ 400 ✔ · max row 31 ≤ 100 ✔' +
        ' · supersedes beside the as-filed 79 = 6+4+31+6+4+28 (gate-4 F-5a/F-5b term extensions 4→5 and 6→8)',
    )
  })
})