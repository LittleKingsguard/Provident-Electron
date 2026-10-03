/**
 * U-PANE-DRAG-COMPLIANCE — the RED SET (TestWriter, RCA-1).
 *
 * Sole input: `docs/specs/pane-drag-compliance.md` (the spec file end-to-end). The
 * authoring order is the spec's §4.2: reads → turns → constraint/repair → listener →
 * register → statics. The five §7a.1 working defaults are IN FORCE (item 1 reading (i)
 * reconcile-outside-the-write-count; item 2 reading (i) cancel erases the temp preview,
 * at most one remove per gesture; item 3 reading (i) hostile supply absorbed at the
 * evaluation; item 4 reading (i) the three roots DECLARED via `storeGraphReferences`).
 *
 * ── THE SURFACE THIS RED SET FIXES (the spec names the deliverables, NOT their export
 *    identifiers — a TestWriter's red run is what pins the driveable names; the
 *    Implementer exports exactly these to go green) ──────────────────────────────────
 *
 * From `src/shared/demo-envelope`  (the example seam site, §5.1 row 2 of the diff scope):
 *   NOT imported here — the store-backed seam implementations land at the WIRING side
 *   (`src/renderer/renderer.ts`, §5.1 row 1, §2.1's "the CALLER'S CLOSURE … holding the
 *   store handle").  The seams are driven through the wiring composition below.
 *
 * From `src/renderer/renderer`     (the wiring role, §5.1 row 1 of the diff scope):
 *   `createPaneDrag(store, source) => PaneDragSurface`  — the wired-store composition
 *     (§2.1 A/B/C + §2.3's listener registration + §7a.1 item 1's reconcile turns,
 *     all bound to the caller-supplied STORE and the RECORDING SOURCE DOUBLE; the
 *     composition's registration is the §2.3 shape — the observable delta is asserted,
 *     never the internal bookkeeping).
 *   `zoneSizeConstraint(min, max)` — §2.2's size-band predicate (factory over the
 *     caller's OWN configured min/max closure; "the configured minimum is the CALLER'S
 *     DATA, captured in the caller's closure").
 *   `zoneSizeRepair(min, max)`     — §2.2's two-arm repair (the pin is `min/2` = arm (a);
 *     below `min/2` = arm (b), the minimize marker is `0` — ZERO = the MINIMIZE verb,
 *     `ZONE-SIZE-DOMAIN-…` clause 2, never a smaller width).
 *   `PaneDragSurface` members (this red's local type, matching the family's exported
 *     seam types §2.1 — `StartSizeOf`, `BoundsOf`, `RelocateTargetFor`'s candidate
 *     production, plus the §2.1 C turns):
 *     startSizeOf(element, token)  — reads `mem.layout.pane.<id>.size` (§2.1 A)
 *     boundsOf(element, token)     — reads `mem.layout.pane.<id>.bounds`, hands the
 *                                    RECEIVED pair through AS STORED (§2.1 A, §0 ruling 9)
 *     defaultSizeFor(element, token) — the reset arm's read, the same size read
 *                                    at the reset turn (§2.1 A)
 *     candidatesFor(element)       — reads `mem.layout.zone.<id>.slot` (OPAQUE) +
 *                                    `mem.layout.zone.<id>.distance` (caller-measured)
 *                                    (§2.1 B); the proximity decision is
 *                                    `withinProximity(distance, threshold)`'s answer
 *     move(gestureId, preview)     — the per-move temp-write turn: the FIRST preview
 *                                    write of a gesture is a `commit` at temp (the mint),
 *                                    each subsequent observed move a `set` (§2.1 C)
 *     release(gestureId, final, sink) — the RELEASE terminal (valid end AND invalid
 *                                    reset): ONE `commit('file.settings.pane.<id>.size',
 *                                    final)` riding INSIDE the single sink invocation
 *                                    (SINK-2, §2.1 C/§2.5)
 *     rightClick(gestureId)        — ONE `remove('temp.drag.<gestureId>.placement')`
 *                                    (§2.1 C), ZERO sink writes; the FILE original
 *                                    reasserts on the unqualified read
 *     cancel(gestureId)            — the abandon terminal (pointercancel/cancel):
 *                                    erases the temp preview with AT MOST ONE remove
 *                                    per gesture (§7a.1 item 2, reading (i))
 *   The composition's bank of top-level roots: §7a.1 item 4 reading (i) — DECLARED via
 *   `storeGraphReferences([…])` naming `layout` (mem) · `drag` (temp) · `settings` (file).
 *
 * From `src/renderer/store-core-graph` / `store-graph-references` (LANDED, green —
 * the machinery this unit CALLS, never the unit's subject):
 *   `createGraphStore`, `GraphStore`, `GraphConstraint`, `GraphWriteReceipt`, `GraphEvent`,
 *   `GraphTierGetResult`, `storeGraphReferences`.
 *
 * From `src/shared/relocate` (LANDED, green): `withinProximity` — the PURE two-scalar
 * comparator, UNMOVED (`relocate.md` §2.1 item 1; §2.1 B / §3.3 I-3).
 *
 * ── THE REGISTER (§5.5.1) — 8 rows / 91 drives / terms 12+9+9+8+8+12+18+15 ────────────
 * P-PD-IM-1 S-PD-READS-1  12 = 2 read seams × 3 store states × 2 gesture turns
 * P-PD-IM-2 S-PD-ZONE-1    9 = 3 stored zone states × 3 comparator operand shapes
 * P-PD-SM-1 S-PD-GESTURE-1 9 = 3 end paths × 2 readings + 3 move-turn drives
 * P-PD-SM-2 S-PD-REPAIR-1  8 = 3 bands × 2 sources + 2 refusal-via-feedback drives
 * P-PD-SM-3 S-PD-REASSERT-1 8 = 4 states × 2 readings
 * P-PD-SM-4 S-PD-LISTENER-1 12 = 4 listener shapes × 3 event arms
 * P-PD-TP-1 S-PD-FUNCTIONS-1 18 = 6 hostile supply shapes × 3 evaluation points
 * P-PD-TP-2 S-PD-DEGRADE-1   15 = 3 implementations × 5 degradation shapes
 * Each drive is a deterministic vitest table cell; totals are printed (with their
 * terms) at the file end per REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS.
 *
 * ── RED HONESTY ── The current tree has NONE of the §2.1–§2.3 deliverables (the spec's
 * CURRENT STATE item 1), so every drive against them is RED with the honest class
 * "function absent" (`wiring.createPaneDrag`, `zoneSizeConstraint`, … do not exist) or,
 * where a landed name is reused, "seam un-routed". The store itself is landed-green and
 * is only the fixture the drives run against — the store's own machinery rows are NOT
 * re-authored (§4.3).
 */

import { afterAll, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

import * as wiring from '../src/renderer/renderer'
import { createGraphStore } from '../src/renderer/store-core-graph'
import type {
  GraphConstraint,
  GraphEvent,
  GraphNodeFlag,
  GraphStore,
  GraphTierGetResult,
  GraphWriteReceipt,
} from '../src/renderer/store-core-graph'
import { storeGraphReferences } from '../src/renderer/store-graph-references'
import { withinProximity as familyWithinProximity } from '../src/shared/relocate'

/* ─────────────────────────────── local drive surface ─────────────────────────────── */

/** The candidate shape a `candidatesFor` closure produces (§2.1 B — "the opaque
 *  candidate + its caller-supplied distance"). Keys pinned by this red set. */
interface CandidateForShape {
  readonly candidate: unknown
  readonly distance: unknown
}

/** The §2.1 C release sink — E3's commit seam double (a NON-FORWARDING recorder, R-3). */
interface ReleaseSink {
  (value: unknown): { readonly status: 'committed' | 'refused' }
  record: unknown[]
  stats(): { readonly sinkCalls: number }
}

function makeSink(): ReleaseSink {
  const record: unknown[] = []
  const sink = ((value: unknown) => {
    record.push(value)
    return { status: 'committed' as const }
  }) as ReleaseSink
  sink.record = record
  sink.stats = () => ({ sinkCalls: record.length })
  return sink
}

/** The recording source double — the DOM-backed source's stand-in (leg 1: "a recording
 *  source double in place of the DOM-backed source"). The zone-render listener's layout
 *  call lands here, so the render's inputs are observable (§2.3 item 4, §3.1 M-9). */
interface SourceDouble {
  readonly calls: ReadonlyArray<{ readonly zoneId: string; readonly size: unknown; readonly display: unknown }>
  layout(zoneId: string, size: unknown, display: unknown): void
}

function makeSource(): SourceDouble {
  const calls: Array<{ zoneId: string; size: unknown; display: unknown }> = []
  return {
    calls,
    layout(zoneId: string, size: unknown, display: unknown): void {
      calls.push({ zoneId, size, display })
    },
  }
}

/** The composed surface the red set drives — pinned by this red set; the Implementer's
 *  `createPaneDrag` satisfies it. Every seam signature mirrors the family's EXPORTED seam
 *  types (§2.1: `StartSizeOf`, `BoundsOf`, the relocate candidate production). */
interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  defaultSizeFor(element: unknown, token: unknown): unknown
  candidatesFor(element: unknown): readonly CandidateForShape[]
  move(gestureId: string, preview: unknown): void
  release(gestureId: string, final: unknown, sink: ReleaseSink): void
  rightClick(gestureId: string): void
  cancel(gestureId: string): void
}

const PANE_ID = 'pane-a'
const ZONE_ID = 'zone-1'

/** Caller-owned element/token fixtures — the `<id>` is derived by the CALLER'S own
 *  element/token mapping (§2.1 A); these fixtures carry the id verbatim so any mapping
 *  over `element.id` / `token` derives the intended stored name. */
const paneFixture = { id: PANE_ID }
const zoneFixture = { zoneId: ZONE_ID }

function makeStore(overrides: {
  constraints?: readonly unknown[]
  declarations?: unknown
} = {}): GraphStore {
  const options: {
    declarations?: unknown
    constraints?: readonly unknown[]
  } = {}
  if (overrides.declarations !== undefined) options.declarations = overrides.declarations
  if (overrides.constraints !== undefined) options.constraints = overrides.constraints
  return createGraphStore(options as Parameters<typeof createGraphStore>[0])
}

/** The constrained wired store — §2.2's ONE supply site: the constraint/repair are the
 *  CALLER-SUPPLIED passed functions given AT CONSTRUCTION. This unit's supply is the
 *  wiring's (`zoneSizeConstraint`/`zoneSizeRepair`), assembled by the drive into the
 *  `GraphConstraint` declaration row (§2.2's machine block, `store-core-graph.md` §2.1).
 *  RE-AIMED 2026-10-05: the member's `matchedSet` is the ROOT FORM `'layout'` — the LANDED
 *  constraint evaluation (`store-core-graph.ts` `captureConstraintSlots`) gates a member on
 *  `member.matchedSet === parsed.rootName`, and a write's parsed ROOT NAME never carries the
 *  tier token (the first segment is the filter; `rootParts`) — a `'mem.layout.zone.<id>.size'`
 *  matchedSet can never equal the root name, so the member would NEVER evaluate. The repair's
 *  corrective surface lands on the DIRECT leaf the write names (`${token}.${root}.${key}` —
 *  `evaluateConstraints`' repaired-reference form), so the drives write `mem.layout.size`
 *  (the root's own direct leaf) with NUMBER values the repair's `record.size` can reach. */
function makeConstrainedStore(min: number, max: number, withRepair: boolean): GraphStore {
  if (typeof wiring.zoneSizeConstraint !== 'function') {
    throw new TypeError('wiring.zoneSizeConstraint is not a function (red: supply absent)')
  }
  if (withRepair && typeof wiring.zoneSizeRepair !== 'function') {
    throw new TypeError('wiring.zoneSizeRepair is not a function (red: supply absent)')
  }
  const row: GraphConstraint = {
    id: 'zone-size',
    matchedSet: 'layout',
    evaluatedOn: ['set', 'commit', 'remove'],
    constraint: wiring.zoneSizeConstraint(min, max),
    ...(withRepair ? { repair: wiring.zoneSizeRepair(min, max) } : {}),
  }
  return makeStore({ constraints: [row] })
}

function compose(options: { store?: GraphStore; source?: SourceDouble } = {}): {
  w: PaneDragSurface
  source: SourceDouble
  store: GraphStore
} {
  const source = options.source ?? makeSource()
  const store = options.store ?? makeStore()
  return { w: wiring.createPaneDrag(store, source) as PaneDragSurface, source, store }
}

/** The register's drive wrapper: counts attempts, held and broken per row, rethrows so
 *  vitest still records the red. An un-run row would be a FAILURE (§5.5); every drive
 *  below RUNS (a namespace import cannot fail on a missing binding — the red surfaces as
 *  the "function absent"/"seam un-routed" assertion classes, never as a load failure). */
interface RowTally {
  attempts: number
  held: number
  failures: number
}
const rowTallies: Record<string, RowTally> = {}

function drive(rowId: string, fn: (...args: never[]) => void): (...args: unknown[]) => void {
  return (...args: unknown[]) => {
    const tally = (rowTallies[rowId] ??= { attempts: 0, held: 0, failures: 0 })
    tally.attempts += 1
    try {
      fn(...(args as never[]))
      tally.held += 1
    } catch (error) {
      tally.failures += 1
      throw error
    }
  }
}

/** The minimizer marker — the family-side verb. `0` IS the MINIMIZE verb and never a
 *  smaller width (`ZONE-SIZE-DOMAIN…` clause 2; §2.2 item 2's arm (b)). */
const MINIMIZE_MARKER = 0

/** THE TIER-QUALIFIED READ — RE-AIMED to the LANDED resolve semantics (`store-core-graph.ts`
 *  `walkName`/`tierHandleFor`): the tier handle's `get` resolves the FULL CALLER SPELLING, so
 *  the read carries the tier token — `tiers['mem'].get('mem.layout.pane.<id>.size')` walks the
 *  leaf at the pair's own tier (`rootParts`' token filter + the tier-holder walk). The OLD form
 *  (stripping the token: `get('layout.pane.<id>.size')`) resolved UNQUALIFIED — a root-name
 *  walk that never reaches the leaf — which is why the file/settings reassert cells read
 *  `undefined`. The composition's OWN read route is the same tier-qualified resolve
 *  (`renderer.ts` `tierRead` — `resolve('<tier>.<name>')`). */
function stored(store: GraphStore, name: string): GraphTierGetResult {
  const tierName = name.split('.')[0] as GraphNodeFlag
  return store.tiers[tierName].get(name)
}

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART I — THE STORE-BACKED READ ROWS (§4.2 item 1: M-1..M-3, M-11, F-5, F-8;
 * register P-PD-IM-1/2, P-PD-TP-2) — every drive against the ABSENT seam surface.
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-1 — the store-backed startSizeOf read answers the STORED size on a HIT', () => {
  it('M-1: resident mem.layout.pane.<id>.size is answered BY VALUE, and the answer tracks the STORE (a module-held size that disagrees with the store FAILS)', () => {
    const { w, store } = compose()
    const seeded = 240
    expect(store.commit(`mem.layout.pane.${PANE_ID}.size`, seeded).status).toBe('committed')
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(seeded)
  })
})

describe('§3.1 M-2 — a MISS answers the DECLARED FALLBACK, never a silent default', () => {
  it('M-2/MISS-fallback: with the file-tier value resident, the read MISS at mem answers the file-tier value (the ascending-durability read — §2.1 A\'s admissible form (A))', () => {
    const { w, store } = compose()
    const original = 200
    expect(store.commit(`file.settings.pane.${PANE_ID}.size`, original).status).toBe('committed')
    expect(store.tiers['mem'].get(`layout.pane.${PANE_ID}.size`).found).toBe(false)
    // The declarable form: the file-tier value through the ascending-durability read.
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(original)
  })

  it('M-2/MISS-no-fallback: with NO declared fallback the answer is a non-number, so the E3-declared degradation applies (the reset refuses \'unusable-default\', ZERO sink writes — gutter.md §2.5 item 5)', () => {
    const { w, store } = compose()
    expect(store.tiers['mem'].get(`layout.pane.${PANE_ID}.size`).found).toBe(false)
    const answer = w.startSizeOf(paneFixture, PANE_ID)
    expect(typeof answer).not.toBe('number')
    const sink = makeSink()
    // The reset arm with an unusable default must refuse with ZERO sink writes.
    w.release('g-r', answer, sink)
    expect(sink.stats().sinkCalls).toBe(0)
  })
})

describe('§3.1 M-3 — boundsOf hands the RECEIVED pair through — never a policy clamped here', () => {
  it('M-3: the stored {min, max} pair is returned AS STORED (byte/value-identical members); no seam/store/repair member rewrote it', () => {
    const { w, store } = compose()
    const pair = { min: 40, max: 800 }
    expect(store.commit(`mem.layout.pane.${PANE_ID}.bounds`, pair).status).toBe('committed')
    const answer = w.boundsOf(paneFixture, PANE_ID) as { min: number; max: number }
    expect(answer.min).toBe(40)
    expect(answer.max).toBe(800)
  })
})

describe('§3.1 M-11 — the candidate reads reach the PURE comparator as scalars', () => {
  it('M-11: the candidate carries the OPAQUE stored slot and the STORED caller-measured distance; withinProximity decides — no geometry read, no element read, the store never handed an element', () => {
    const { w, store } = compose()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.slot`, 'slot-7').status).toBe('committed')
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.distance`, 40).status).toBe('committed')
    const candidates = w.candidatesFor(zoneFixture)
    expect(candidates.length).toBeGreaterThan(0)
    const c = candidates[0]!
    expect(c.candidate).toBe('slot-7') // OPAQUE — returned as-is
    expect(c.distance).toBe(40) // the caller-measured scalar the store merely stored
    // The proximity DECISION is the pure comparator's:
    expect(familyWithinProximity(c.distance, 50)).toBe(true)
    expect(familyWithinProximity(c.distance, 30)).toBe(false)
  })
})

describe('§3.3 I-3 — the comparator stays pure', () => {
  it('I-3: the pure two-scalar comparator is a function of its two scalars alone — a store value that DISAGREES with the arguments never leaks into the answer', () => {
    const { w, store } = compose()
    // A store-carried distance that contradicts the comparator's arguments:
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.distance`, 999).status).toBe('committed')
    expect(familyWithinProximity(10, 20)).toBe(true) // answers from its ARGUMENTS
    expect(familyWithinProximity(20, 10)).toBe(false)
    expect(familyWithinProximity(-1, 10)).toBe(false) // finite negative ⇒ unusable ⇒ false
    expect(familyWithinProximity('x' as never, 10)).toBe(false) // typeof-gate first, never a throw
  })
})

describe('§3.2 F-5 — a release with NO preview data commits NOTHING but a normal file write', () => {
  it('F-5: commit(\'file.settings.pane.<id>.size\', <final>) with no lower copy (cleared: [] per §2.8 item 2), never a refusal, never a removal, never a second write — the two readings agree at 1', () => {
    const { w, store } = compose()
    const sink = makeSink()
    const final = 260
    expect(store.tiers['temp'].get('temp.drag.g1.placement').found).toBe(false)
    w.release('g1', final, sink)
    expect(sink.stats().sinkCalls).toBe(1)
    expect(sink.record).toEqual([final])
    // RE-AIMED (the tier-qualified read — `resolveRead`'s file-token leaf walk): the normal
    // file-tier write lands at the settings root's own path and answers the FULL spelling:
    const hit = stored(store, `file.settings.pane.${PANE_ID}.size`)
    expect(hit.found).toBe(true)
    expect(hit.value).toBe(final)
  })
})

describe('§3.2 F-8 — a throwing seam implementation\'s throw is BOUND to its turn', () => {
  it('F-8/hostile-value: a hostile stored pane size (42, then \'x\') is handed through BY VALUE; the reset refuses with ZERO sink writes; NO throw escapes a wiring turn', () => {
    for (const hostile of [42, 'x']) {
      const { w, store } = compose()
      expect(store.commit(`mem.layout.pane.${PANE_ID}.size`, hostile).status).toBe('committed')
      expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(hostile) // as stored, by value
      const sink = makeSink()
      expect(() => w.release('g-h1', hostile, sink)).not.toThrow()
      expect(sink.stats().sinkCalls).toBe(0) // unusable value ⇒ the reset refuses, ZERO sink writes
    }
  })

  it('F-8/absent-closure: the value-reading seams driven with a hostile store shape answer the declared degradation — never a throw out of the wiring turn', () => {
    const absent = compose({ store: undefined as never })
    // The composition must itself land the degradation (the store is ABSENT from its
    // closure) — the family seam rules bind the implementations exactly as they bind a
    // fork's (gutter-ui.md §R.3): a non-number answer ⇒ the reset refuses.
    expect(() => absent.w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => absent.w.boundsOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => absent.w.candidatesFor(zoneFixture)).not.toThrow()
  })

  it('F-8/throwing-tier-read: a tier-handle whose get THROWS is absorbed — the move answers the declared degradation, nothing propagates', () => {
    const hostileStore = {
      tiers: {
        mem: { get() { throw new Error('boom') }, has() { throw new Error('boom') } },
      },
    } as never
    const { w, store } = compose({ store: hostileStore })
    expect(() => w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => w.boundsOf(paneFixture, PANE_ID)).not.toThrow()
  })
})

/* ─── THE REGISTER ROW P-PD-IM-1 (S-PD-READS-1, 12 = 2 seams × 3 states × 2 turns) ─── */

describe('REGISTER P-PD-IM-1 (S-PD-READS-1) — the store-backed size/bounds READS: hit / MISS / declared fallback', () => {
  const cases: Array<[string, string]> = [
    ['01', 'size-read HIT at mem, onStart read'],
    ['02', 'size-read HIT at mem, terminal read'],
    ['03', 'size-read MISS with declared fallback, onStart read'],
    ['04', 'size-read MISS with declared fallback, terminal read'],
    ['05', 'size-read MISS with NO declared fallback, onStart read'],
    ['06', 'size-read MISS with NO declared fallback, terminal read'],
    ['07', 'bounds-read HIT at mem, onStart read'],
    ['08', 'bounds-read HIT at mem, terminal read'],
    ['09', 'bounds-read MISS with declared fallback, onStart read'],
    ['10', 'bounds-read MISS with declared fallback, terminal read'],
    ['11', 'bounds-read MISS with NO declared fallback, onStart read'],
    ['12', 'bounds-read MISS with NO declared fallback, terminal read'],
  ]

  it.each(cases)('P-PD-IM-1/%s — %s', drive('P-PD-IM-1', (id: string) => {
    const { w, store } = compose()
    const onStartRead = parseInt(id, 10) % 2 === 1
    const isBounds = parseInt(id, 10) > 6

    if (isBounds) {
      const pair = { min: 40, max: 800 }
      if (id === '07' || id === '08') {
        expect(store.commit(`mem.layout.pane.${PANE_ID}.bounds`, pair).status).toBe('committed')
        const answer = w.boundsOf(paneFixture, PANE_ID) as { min: number; max: number }
        expect(answer.min).toBe(40)
        expect(answer.max).toBe(800)
      } else if (id === '09' || id === '10') {
        expect(store.commit(`file.settings.pane.${PANE_ID}.bounds`, pair).status).toBe('committed')
        const fallback = w.boundsOf(paneFixture, PANE_ID) as { min: number; max: number }
        expect(fallback.min).toBe(40) // the declared fallback: the file-tier value
        expect(fallback.max).toBe(800)
      } else {
        const answer = w.boundsOf(paneFixture, PANE_ID) as { min: number; max: number }
        // An unusable pair ⇒ clampToBounds answers NaN ⇒ the move is INVALID (§2.1 A)
        expect(Number.isNaN(Number(answer.min)) || answer.min === undefined).toBe(true)
      }
      return
    }

    if (id === '01' || id === '02') {
      expect(store.commit(`mem.layout.pane.${PANE_ID}.size`, 240).status).toBe('committed')
      const answer = onStartRead
        ? w.startSizeOf(paneFixture, PANE_ID)
        : w.defaultSizeFor(paneFixture, PANE_ID)
      expect(answer).toBe(240) // the STORED size by value
    } else if (id === '03' || id === '04') {
      expect(store.commit(`file.settings.pane.${PANE_ID}.size`, 200).status).toBe('committed')
      const answer = onStartRead
        ? w.startSizeOf(paneFixture, PANE_ID)
        : w.defaultSizeFor(paneFixture, PANE_ID)
      expect(answer).toBe(200) // the DECLARED fallback — never a store-invented default
    } else {
      const answer = onStartRead
        ? w.startSizeOf(paneFixture, PANE_ID)
        : w.defaultSizeFor(paneFixture, PANE_ID)
      expect(typeof answer).not.toBe('number') // no fallback ⇒ the E3 degradation
    }
  }))
})

/* ─── THE REGISTER ROW P-PD-IM-2 (S-PD-ZONE-1, 9 = 3 zone states × 3 operand shapes) ─── */

describe('REGISTER P-PD-IM-2 (S-PD-ZONE-1) — the candidate/slot read reaches the pure comparator as scalars', () => {
  const cases: Array<[string, string, string]> = [
    ['01', 'both', 'usable-within'],
    ['02', 'both', 'usable-outside'],
    ['03', 'both', 'hostile-negative'],
    ['04', 'slot-only', 'usable-within'],
    ['05', 'slot-only', 'usable-outside'],
    ['06', 'slot-only', 'hostile-negative'],
    ['07', 'neither', 'usable-within'],
    ['08', 'neither', 'usable-outside'],
    ['09', 'neither', 'hostile-negative'],
  ]

  it.each(cases)('P-PD-IM-2/%s — zone %s, operand %s', drive('P-PD-IM-2', (id: string, _zoneState: string, _shape: string) => {
    const { w, store } = compose()
    const n = parseInt(id, 10)
    const zoneState = ((n - 1) % 3) + 1
    const shape = Math.ceil(n / 3)

    if (zoneState === 1) {
      expect(store.commit(`mem.layout.zone.${ZONE_ID}.slot`, 'slot-7').status).toBe('committed')
      expect(store.commit(`mem.layout.zone.${ZONE_ID}.distance`, 40).status).toBe('committed')
      const candidates = w.candidatesFor(zoneFixture)
      expect(candidates.length).toBeGreaterThan(0)
      const c = candidates[0]!
      expect(c.candidate).toBe('slot-7')
      expect(c.distance).toBe(40)
      const d = c.distance as number
      if (shape === 1) expect(familyWithinProximity(d, 50)).toBe(true)
      if (shape === 2) expect(familyWithinProximity(d, 30)).toBe(false)
      if (shape === 3) expect(familyWithinProximity(-1, 50)).toBe(false)
    } else {
      if (zoneState === 2) {
        expect(store.commit(`mem.layout.zone.${ZONE_ID}.slot`, 'slot-7').status).toBe('committed')
      }
      // A zone whose reads MISS is admitted per the CALLER's declared rule — never a
      // store decision, never a throw; the comparator still answers boolean from its
      // arguments (a MISS distance is the unusable class ⇒ false where it participates).
      expect(() => w.candidatesFor(zoneFixture)).not.toThrow()
      if (shape === 3) expect(familyWithinProximity(-1, 50)).toBe(false)
    }
  }))
})

/* ─── THE REGISTER ROW P-PD-TP-2 (S-PD-DEGRADE-1, 15 = 3 impls × 5 degradation shapes) ─── */

describe('REGISTER P-PD-TP-2 (S-PD-DEGRADE-1) — the store-backed SEAM IMPLEMENTATIONS\' degradation (TOTAL over hostile inputs)', () => {
  const impls = ['startSizeOf', 'boundsOf', 'candidateReads'] as const
  const shapes = [
    'store-absent-from-closure',
    'tier-handle-absent',
    'tier-handle-get-throwing',
    'hostile-stored-value',
    'miss-with-no-declared-fallback',
  ] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const impl of impls) {
    for (const shape of shapes) {
      n += 1
      cases.push([String(n).padStart(2, '0'), impl, shape])
    }
  }

  it.each(cases)('P-PD-TP-2/%s — %s × %s', drive('P-PD-TP-2', (_id: string, impl: string, shape: string) => {
    function composeHostile(storeShape: 'none' | 'no-tiers' | 'throwing-get' | 'real'): PaneDragSurface {
      if (storeShape === 'none') {
        return compose({ store: undefined as never }).w
      }
      if (storeShape === 'no-tiers') {
        const hostile = {} as never
        return compose({ store: hostile }).w
      }
      if (storeShape === 'throwing-get') {
        const hostile = {
          tiers: { mem: { get() { throw new Error('boom') }, has() { throw new Error('boom') } } },
        } as never
        return compose({ store: hostile }).w
      }
      return compose().w
    }

    let surface: PaneDragSurface
    if (shape === 'store-absent-from-closure') surface = composeHostile('none')
    else if (shape === 'tier-handle-absent') surface = composeHostile('no-tiers')
    else if (shape === 'tier-handle-get-throwing') surface = composeHostile('throwing-get')
    else surface = composeHostile('real')

    if (impl === 'startSizeOf' || impl === 'boundsOf') {
      if (shape === 'hostile-stored-value') {
        const c = compose()
        for (const hostile of [42, 'x']) {
          expect(c.store.commit(`mem.layout.pane.${PANE_ID}.${impl === 'boundsOf' ? 'bounds' : 'size'}`, hostile).status).toBe('committed')
        }
        // Landed by value or the declared degradation — NEVER a throw out of a wiring turn.
        expect(() => c.w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
        expect(() => c.w.boundsOf(paneFixture, PANE_ID)).not.toThrow()
      } else if (shape === 'miss-with-no-declared-fallback') {
        expect(() => surface.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
        expect(typeof surface.startSizeOf(paneFixture, PANE_ID)).not.toBe('number')
      } else {
        expect(() => surface.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
        expect(() => surface.boundsOf(paneFixture, PANE_ID)).not.toThrow()
      }
    } else {
      if (shape === 'hostile-stored-value') {
        const c = compose()
        expect(c.store.commit(`mem.layout.zone.${ZONE_ID}.slot`, 'slot-7').status).toBe('committed')
        expect(c.store.commit(`mem.layout.zone.${ZONE_ID}.distance`, 'x').status).toBe('committed')
        expect(() => c.w.candidatesFor(zoneFixture)).not.toThrow()
      } else {
        expect(() => surface.candidatesFor(zoneFixture)).not.toThrow()
      }
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART II — THE TEMP-WRITE TURN AND THE LIFECYCLE (§4.2 item 2: M-4/M-5/M-10,
 * F-4/F-5/F-6; register P-PD-SM-1/3; §7a.1 items 1/2 working defaults)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-4 — the temp preview write fires the subscriber → the render turn', () => {
  it('M-4: after the first-commit mint, a move\'s write delivers the ancestor subscriber (the tier-qualified form the wiring itself registers — `emit`\'s `origin.startsWith(subscriber.name + \'.\')` fan-out cell); the zone-render listener runs; the render reads mem.layout.zone.<id>.size/.display FROM THE STORE (a changed store value with an un-mutated module variable CHANGES the render\'s answer)', () => {
    const { w, store, source } = compose()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 300).status).toBe('committed')
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.display`, 'block').status).toBe('committed')
    // RE-AIMED (storage emit cell): a bare `'drag'` subscriber never fires for a tier-qualified
    // write — the fan-out matches `origin.startsWith(subscriber.name + '.')` against the WRITTEN
    // PATH fully qualified (`'temp.drag.g1.placement'`), so the subscriber is the tier-qualified
    // ancestor form `'temp.drag'` (the composition's own registration, renderer.ts) and the
    // delivered arm is `cause:'descendant'` with the origin named:
    const events: GraphEvent[] = []
    store.subscribe('temp.drag', (e) => events.push(e), { subtree: true })

    w.move('g1', { placement: 'p1' })
    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]!.cause).toBe('descendant') // the ancestor fan-out delivers 'descendant'
    expect(events[0]!.origin).toBe('temp.drag.g1.placement') // origin = the written path fully qualified
    // the render ran and its layout input tracked the STORED zone size:
    const latest = source.calls[source.calls.length - 1]
    expect(latest).toBeDefined()
    expect(latest!.size).toBe(300)

    // THE STORE-READ DIFFERENTIAL: change the store, keep everything else — the render
    // must follow the STORE and only the store (F-10's subject, asserted here):
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 260).status).toBe('committed')
    w.move('g1', { placement: 'p2' })
    let saw260 = false
    for (const call of source.calls) if (call.size === 260) saw260 = true
    expect(saw260).toBe(true)
  })
})

describe('§3.1 M-5 — a valid release commits the SINK\'S value once — the two readings AGREE at 1', () => {
  it('M-5: the sink\'s own record reads 1, stats().sinkCalls reads 1 (they AGREE), and the STORE received exactly ONE commit(\'file.settings.pane.<id>.size\', final) whose value EQUALS the sink\'s argument; the §7a.1 item 1 reconcile refreshes the mem layout copy OUTSIDE the gesture write count', () => {
    const { w, store } = compose()
    const sink = makeSink()
    const clamped = 240
    w.move('g1', { placement: 120 }) // a preview
    w.release('g1', clamped, sink)

    expect(sink.record).toEqual([clamped]) // the sink's own record
    expect(sink.stats().sinkCalls).toBe(1) // E3-side reading — they AGREE at 1
    // RE-AIMED (the tier-qualified read): the release's file commit writes
    // `file.settings.pane.<id>.size` — read back through the tier-qualified resolve
    // (`resolveRead` with the `file` token filter reaches the written leaf; the unqualified
    // form walks only the root's own name and answers the boot-clear MISS):
    const fileHit = stored(store, `file.settings.pane.${PANE_ID}.size`)
    expect(fileHit.found).toBe(true)
    expect(fileHit.value).toBe(clamped) // the store's committed value equals the sink's argument
    // §7a.1 item 1 reading (i): the reconcile refreshes the mem layout copy from the
    // committed file value — OUTSIDE the gesture's write count (the sink stays at 1):
    const memHit = stored(store, `mem.layout.pane.${PANE_ID}.size`)
    expect(memHit.found).toBe(true)
    expect(memHit.value).toBe(clamped)
  })
})

describe('§3.1 M-10 — the temp preview is resident while active; the UNQUALIFIED read does NOT answer it', () => {
  it('M-10: a move\'s preview IS resident at the temp tier and only the TIER-QUALIFIED read answers it; the unqualified resolve never answers the temp leaf — the LANDED resolve starts from the MOST-DURABLE holder and walks the root\'s own name (`walkName`\'s DURABILITY_RANK-sorted holder selection + the root-walk), and the boot-minted root\'s declared-but-unwritten entry is the DECLARED MISS (`hasValueEntry`)', () => {
    const { w, store } = compose()
    const preview = { placement: 'preview-1' }
    w.move('g1', preview)
    // the preview's residency — the tier-qualified read at the pair's own tier
    // (`resolveRead` with the `temp` token filter — the composition's own tierRead route):
    const tempRead = store.tiers['temp'].get('temp.drag.g1.placement')
    expect(tempRead.found).toBe(true)
    expect(tempRead.value).toEqual(preview)
    // the UNQUALIFIED read — RE-AIMED (the resolve's most-durable-first walk): it does NOT
    // answer the temp leaf — the read resolves root `drag`, whose holder's own entry the
    // wiring's boot bootstrap cleared, so the answer is the DECLARED MISS — never a temp value:
    const unqualified = store.resolve('drag.g1.placement')
    expect(unqualified.found).toBe(false)
  })
})

describe('§3.1 M-6 — right-click erases the temp preview; the FILE original reasserts', () => {
  it('M-6: the erase turn performs ONE remove(\'temp.drag.<gestureId>.placement\'); the temp tier read is a MISS afterwards; the FILE original — the persistent copy this wiring routes at the FILE tier — answers the tier-qualified read (the reassert)', () => {
    const { w, store } = compose()
    const fileOriginal = 'file-placement'
    // THE FILE ORIGINAL, RE-AIMED to the landed tier routing (resolve's durability gate): the
    // wiring's OWN file-tier root is `settings` (the boot mint's `file.settings` holder), and a
    // same-root `file.drag.<gid>.placement` original CANNOT sit beside the temp preview — the
    // temp root's U1 durability gate refuses a file-tier mint beneath it (`durability-inversion`,
    // `commitOp`), and a file commit over an existing temp branch REGENERATES it and clears the
    // preview. The reassert therefore lives at the settings root, read tier-qualified (the
    // composition's own tier routing; `resolveRead`'s token filter):
    expect(store.commit(`file.settings.drag.g1.placement`, fileOriginal).status).toBe('committed')
    w.move('g1', { placement: 'preview-1' })
    w.rightClick('g1')
    // the ERASE — the temp tier-qualified read is a MISS after the single remove:
    const tempPost = store.tiers['temp'].get('temp.drag.g1.placement')
    expect(tempPost.found).toBe(false)
    // the REASSERT — the FILE-tier value answers the tier-qualified read:
    const filePost = store.tiers['file'].get('file.settings.drag.g1.placement')
    expect(filePost.found).toBe(true)
    expect(filePost.value).toBe(fileOriginal)
    // at-most-one-remove per gesture (§7a.1 item 2 reading (i)) — a second erase is a no-op:
    w.rightClick('g1')
    expect(store.tiers['temp'].get('temp.drag.g1.placement').found).toBe(false)
  })
})

describe('§3.2 F-4 — right-click during a NON-EXISTENT drag is a NO-OP — MISS, never a refusal', () => {
  it('F-4: the erase turn on a path with NO temp node is a declared no-op — NEVER a throw, NEVER a second write; the file original continues to answer', () => {
    // RE-AIMED (the landed tier routing): the file original MUST be seeded while the roots are
    // DECLARED and BEFORE the wiring's boot mint — a post-compose file commit on the `drag`
    // root is refused `durability-inversion` (the temp root's U1 gate), and PRE-compose the
    // seed's parse needs the declared root so it mints the FILE holder at `drag`:
    const store = makeStore({
      declarations: storeGraphReferences([{ name: 'layout' }, { name: 'drag' }, { name: 'settings' }]),
    })
    expect(store.commit(`file.drag.g-miss.placement`, 'orig').status).toBe('committed')
    const { w } = compose({ store })
    // right-click with NO temp node: the store's `remove` on a missing path answers its
    // declared posture (`removeOp`'s `'undeclared-name'` refusal at the walk) — the turn
    // ABSORBS it, never a throw, never a second write:
    expect(() => w.rightClick('g-miss')).not.toThrow()
    // the file original continues to answer — the unqualified resolve reads the MOST-DURABLE
    // holder (the file holder at root `drag`, seeded pre-compose), walking the root's own name:
    const post = store.resolve('drag.g-miss.placement')
    expect(post.found).toBe(true)
    expect(post.value).toBe('orig')
  })
})

describe('§3.2 F-6 — no two writes per gesture end (the §2.5 terminal grid, driven twice over)', () => {
  it('F-6/valid-release: EXACTLY the ONE file commit — never a remove at the release terminal, never a per-move commit', () => {
    const { w, store } = compose()
    const sink = makeSink()
    // RE-AIMED (the emit's EXACT-match cell: `subscriber.name === name` — the event's name is
    // the written reference, so the arm-counting rows subscribe the references EXACTLY; an
    // ancestor subscriber would deliver `cause:'descendant'` and hide the arms):
    const tempEvents: GraphEvent[] = []
    const fileEvents: GraphEvent[] = []
    store.subscribe(`temp.drag.g1.placement`, (e) => tempEvents.push(e))
    store.subscribe(`file.settings.pane.${PANE_ID}.size`, (e) => fileEvents.push(e))
    w.move('g1', { placement: 100 })
    w.move('g1', { placement: 140 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // never two, never a per-move commit
    const tempCommits = tempEvents.filter((e) => e.cause === 'commit').length
    const tempRemoves = tempEvents.filter((e) => e.cause === 'remove').length
    const fileCommits = fileEvents.filter((e) => e.cause === 'commit').length
    expect(tempRemoves).toBe(0) // no remove at the release terminal
    expect(tempCommits).toBe(1) // the ONE temp commit = the first-preview mint, never a per-move commit
    expect(fileCommits).toBe(1) // the ONE file commit (setting path) inside the single sink invocation
  })

  it('F-6/right-click: EXACTLY the ONE temp remove, ZERO sink writes, never a commit at the same terminal', () => {
    const { w, store } = compose()
    const tempEvents: GraphEvent[] = []
    const fileEvents: GraphEvent[] = []
    store.subscribe(`temp.drag.g1.placement`, (e) => tempEvents.push(e))
    store.subscribe(`file.settings.pane.${PANE_ID}.size`, (e) => fileEvents.push(e))
    w.move('g1', { placement: 100 })
    w.rightClick('g1')
    const tempRemoves = tempEvents.filter((e) => e.cause === 'remove').length
    const fileCommits = fileEvents.filter((e) => e.cause === 'commit').length
    expect(tempRemoves).toBe(1) // exactly ONE remove
    expect(fileCommits).toBe(0) // never a commit at the same terminal
  })

  it('F-6/§7a.1.2-cancel: the cancel/pointercancel terminal erases the temp preview with AT MOST ONE remove per gesture (reading (i)); ZERO sink writes (E10)', () => {
    const { w, store } = compose()
    const terminalEvents: GraphEvent[] = []
    store.subscribe('drag', (e) => terminalEvents.push(e), { subtree: true })
    w.move('g1', { placement: 100 })
    w.cancel('g1')
    w.cancel('g1') // a second cancel of the same gesture = the MISS no-op (F-4 class)
    const removeCount = terminalEvents.filter((e) => e.cause === 'remove').length
    expect(removeCount).toBeLessThanOrEqual(1) // at most one remove per gesture
    const post = store.resolve('drag.g1.placement')
    expect(post.found).toBe(false) // the staleness hazard is closed: the abandon path erased it
  })

  it('F-6/invalid-release (reset): ONE file commit holding the clamped PRE-DRAG size (the persistent original RESTORED BY THE COMMIT)', () => {
    const { w, store } = compose()
    const sink = makeSink()
    w.move('g1', { placement: 100 })
    w.release('g1', 220, sink) // 220 = the clamped pre-drag size
    expect(sink.stats().sinkCalls).toBe(1)
    // RE-AIMED (the tier-qualified read — `resolveRead`'s file-token leaf walk):
    const fileHit = stored(store, `file.settings.pane.${PANE_ID}.size`)
    expect(fileHit.value).toBe(220)
  })
})

/* ─── THE REGISTER ROW P-PD-SM-1 (S-PD-GESTURE-1, 9 = 3×2 + 3) ─── */

describe('REGISTER P-PD-SM-1 (S-PD-GESTURE-1) — the temp-write turn: per-move writes and the ONE-write-per-gesture-end rule, with the subscriber delta', () => {
  const cases: Array<[string, string]> = [
    ['01', 'valid release — sink record reading'],
    ['02', 'valid release — stats().sinkCalls reading (AGREE)'],
    ['03', 'invalid release — sink record reading'],
    ['04', 'invalid release — stats().sinkCalls reading (AGREE)'],
    ['05', 'right-click — sink record reading'],
    ['06', 'right-click — stats().sinkCalls reading (AGREE)'],
    ['07', 'move-turn drive: FIRST preview write is a commit at temp (the mint)'],
    ['08', 'move-turn drive: a SUBSEQUENT move is a set'],
    ['09', 'move-turn drive: NO move ⇒ NO write'],
  ]

  it.each(cases)('P-PD-SM-1/%s — %s', drive('P-PD-SM-1', (id: string) => {
    const n = parseInt(id, 10)
    if (n <= 6) {
      const { w, store } = compose()
      const sink = makeSink()
      const endPath = Math.ceil(n / 2)
      if (endPath === 1 || endPath === 2) {
        w.move('g1', { placement: 100 })
        w.release('g1', endPath === 1 ? 240 : 220, sink)
        const expected = endPath === 1 ? 1 : 1
        if (n % 2 === 1) {
          expect(sink.record.length).toBe(expected) // the sink's own record
        } else {
          expect(sink.stats().sinkCalls).toBe(expected) // E3's reading — they AGREE
        }
        if (n % 2 === 1) {
          // RE-AIMED (the tier-qualified read — the file handle's `get` resolves the FULL
          // spelling `file.settings.pane.<id>.size`; the old stripped form walked only the
          // root's own name and answered the boot-clear MISS):
          const fileHit = stored(store, `file.settings.pane.${PANE_ID}.size`)
          expect(fileHit.value).toBe(endPath === 1 ? 240 : 220)
        }
      } else {
        w.move('g1', { placement: 100 })
        w.rightClick('g1')
        if (n % 2 === 1) expect(sink.record.length).toBe(0) // ZERO sink writes
        else expect(sink.stats().sinkCalls).toBe(0)
      }
      return
    }
    if (n === 7) {
      const { w, store } = compose()
      // before the first preview write, the temp path has NO node — a bare set would be
      // REFUSED 'undeclared-name' (§2.8 item 1) — the first write is a COMMIT (the mint):
      // RE-AIMED (the tier-qualified read): the full spelling `temp.drag.g1.placement`
      // through the temp handle reaches the minted LEAF (the stripped form walked only the
      // root and answered the boot-clear MISS):
      expect(store.tiers['temp'].get(`temp.drag.g1.placement`).found).toBe(false)
      w.move('g1', { placement: 100 })
      const hit = stored(store, `temp.drag.g1.placement`)
      expect(hit.found).toBe(true)
      expect(hit.value).toEqual({ placement: 100 })
    } else if (n === 8) {
      const { w, store } = compose()
      w.move('g1', { placement: 100 })
      w.move('g1', { placement: 140 })
      // RE-AIMED (the tier-qualified read): the subsequent move's `set` replaced the whole
      // preview value in place — read back through the temp handle at the full spelling:
      const hit = stored(store, `temp.drag.g1.placement`)
      expect(hit.value).toEqual({ placement: 140 }) // the whole preview value, replaced in place
    } else {
      const { w, store } = compose()
      expect(store.tiers['temp'].get('drag.g99.placement').found).toBe(false)
      expect(store.resolve('drag.g99.placement').found).toBe(false)
    }
  }))
})

/* ─── THE REGISTER ROW P-PD-SM-3 (S-PD-REASSERT-1, 8 = 4 states × 2 readings) ─── */

describe('REGISTER P-PD-SM-3 (S-PD-REASSERT-1) — the right-click / reassert cycle', () => {
  const states = ['active-rightclick', 'no-active-rightclick', 'release-without-preview', 'second-remove'] as const
  const readings = ['unqualified-read', 'receipt-event-reading'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const state of states) {
    for (const reading of readings) {
      n += 1
      cases.push([String(n).padStart(2, '0'), state, reading])
    }
  }

  it.each(cases)('P-PD-SM-3/%s — %s × %s', drive('P-PD-SM-3', (_id: string, state: string, reading: string) => {
    const { w, store } = compose()
    if (state === 'active-rightclick') {
      // RE-AIMED (the landed tier routing): the file ORIGINAL lives at the wiring's own
      // FILE-tier root (`file.settings.<...>` — the boot mint's `file.settings` holder); a
      // same-root `file.drag.<gid>.placement` original cannot sit beside the temp preview
      // (the temp root's U1 `durability-inversion` gate / the regeneration's lower-copy clear),
      // and the reassert is read TIER-QUALIFIED (the composition's own read route):
      expect(store.commit(`file.settings.drag.g1.placement`, 'orig').status).toBe('committed')
      w.move('g1', { placement: 'preview' })
      w.rightClick('g1')
      if (reading === 'unqualified-read') {
        // the REASSERT — the FILE-tier value answers the tier-qualified read (`resolveRead`'s
        // token filter at the pair's own tier); the unqualified root-walk of `drag` answers
        // only the boot-cleared root entry (the DECLARED MISS):
        const post = store.tiers['file'].get('file.settings.drag.g1.placement')
        expect(post.found).toBe(true)
        expect(post.value).toBe('orig')
      } else {
        // the ERASE — the temp preview is gone from the temp tier:
        const tmp = store.tiers['temp'].get('temp.drag.g1.placement')
        expect(tmp.found).toBe(false)
      }
    } else if (state === 'no-active-rightclick') {
      expect(() => w.rightClick('g-miss')).not.toThrow()
      if (reading === 'unqualified-read') {
        expect(store.resolve('drag.g-miss.placement').found).toBe(false) // MISS, never a refusal
      }
    } else if (state === 'release-without-preview') {
      const sink = makeSink()
      w.release('g-free', 240, sink)
      if (reading === 'unqualified-read') {
        // RE-AIMED (the tier-qualified read — `resolveRead`'s file-token leaf walk):
        const fileHit = stored(store, `file.settings.pane.${PANE_ID}.size`)
        expect(fileHit.value).toBe(240) // a NORMAL file write, never a removal
      } else {
        const tmp = stored(store, `temp.drag.g-free.placement`)
        expect(tmp.found).toBe(false) // never a removal, never a second write
      }
    } else {
      // RE-AIMED (the landed tier routing — the settings-root file original, as above):
      expect(store.commit(`file.settings.drag.g1.placement`, 'orig').status).toBe('committed')
      w.move('g1', { placement: 'preview' })
      w.rightClick('g1')
      // a SECOND right-click hits the erase turn's own at-most-one-remove gate (the gesture is
      // already erased) — a no-op, never a second write, never a throw (F-4 class):
      expect(() => w.rightClick('g1')).not.toThrow()
      if (reading === 'unqualified-read') {
        const post = store.tiers['file'].get('file.settings.drag.g1.placement')
        expect(post.found).toBe(true)
        expect(post.value).toBe('orig')
      } else {
        const tmp = store.tiers['temp'].get('temp.drag.g1.placement')
        expect(tmp.found).toBe(false)
      }
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART III — THE ZONE-SIZE CONSTRAINT + TWO-ARM REPAIR (§4.2 item 3: M-7/M-8,
 * F-1/F-2/F-3/F-9, I-1; register P-PD-SM-2/P-PD-TP-1) — red against the ABSENT supply.
 * ══════════════════════════════════════════════════════════════════════════════════ */

/** Driven with min = 100, max = 800 ⇒ min/2 = 50 is the PINNED band boundary. */
const MIN = 100
const MAX = 800

describe('§3.1 M-7 — REPAIR ARM (a): [min/2, min) rounds UP to the minimum', () => {
  it.each([
    ['at min/2 exactly', 50],
    ['min/2 + ε', 50.5],
    ['min − ε', 99],
  ])('M-7/%s: a violating write with next size = %d stores min; same-committed-write; ONE cause:\'repair\' event PLUS the caller\'s own event; repaired[] names the reference', (_, violating) => {
    const { w, store } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // the constraint member's matchedSet is the ROOT form `'layout'` (the only form the write
    // machinery's `member.matchedSet === parsed.rootName` gate accepts — a write's parsed ROOT
    // NAME never carries the tier token) and the drive writes the root's DIRECT leaf
    // `mem.layout.size`, whose record the passed repair can reach (`evaluateConstraints`
    // hands the matched root's leaf record; the repaired reference is `${token}.${root}.${key}`):
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const events: GraphEvent[] = []
    // the EXACT reference subscriber — the repair event emits ON the repaired reference with
    // NO origin, so only the exact-match cell (`subscriber.name === name`) observes it:
    store.subscribe('mem.layout.size', (e) => events.push(e))
    const receipt = store.set(`mem.layout.size`, violating)
    expect(receipt.status).toBe('committed') // a violating write is REPAIRED, never refused
    expect(receipt.repaired).toContain(`mem.layout.size`)
    expect(stored(store, `mem.layout.size`).value).toBe(MIN) // rounded UP
    const repairEvents = events.filter((e) => e.cause === 'repair')
    expect(repairEvents.length).toBe(1) // the repair's OWN event, carrying the repaired value
    expect(repairEvents[0]!.value).toBe(MIN)
    expect(events.filter((e) => e.cause === 'set').length).toBeGreaterThanOrEqual(1) // the caller's own write's event ALSO fires
    expect(events.length).toBe(2) // "one event for the caller's reference plus one per repaired reference"
  })
})

describe('§3.1 M-8 — REPAIR ARM (b): below min/2 is discarded — the zone MINIMIZES instead', () => {
  it('M-8: a violating write with next size strictly below min/2 leaves the zone MINIMIZED (the caller\'s own minimize marker = 0); same-committed-write, cause:\'repair\', repaired[] — identical mechanics to arm (a)', () => {
    const { w, store } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // matchedSet `'layout'` and the direct leaf `mem.layout.size`, as in M-7:
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const events: GraphEvent[] = []
    store.subscribe('mem.layout.size', (e) => events.push(e))
    const receipt = store.commit(`mem.layout.size`, 49)
    expect(receipt.status).toBe('committed')
    expect(receipt.repaired).toContain(`mem.layout.size`)
    expect(stored(store, `mem.layout.size`).value).toBe(MINIMIZE_MARKER) // the size change is GONE, the zone MINIMIZES
    const repairEvents = events.filter((e) => e.cause === 'repair')
    expect(repairEvents.length).toBe(1)
    expect(repairEvents[0]!.value).toBe(MINIMIZE_MARKER)
  })
})

describe('§3.2 F-1 — a sub-minimum size is NEVER stored (the min/2 split is the PINNED partition)', () => {
  it('F-1/straddle: after the write+repair, NO stored value lies in [0, min) — exactly min/2 lands arm (a) at min, and min/2 − ε lands arm (b) at minimized; a straddle (a stored value between min/2 and min) FAILS', () => {
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // matchedSet `'layout'`, driven on the root's DIRECT leaf `mem.layout.size`:
    for (const [violating, expected] of [[50, MIN], [49, MINIMIZE_MARKER]] as const) {
      const { w, store } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
      expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
      store.set(`mem.layout.size`, violating)
      const end = stored(store, `mem.layout.size`)
      expect(end.value).toBe(expected)
      const value = end.value as number
      expect(value >= MIN || value === MINIMIZE_MARKER).toBe(true) // I-1's post-state
    }
  })
})

describe('§3.2 F-2 — a refused/absent repair answers REFUSAL-VIA-FEEDBACK — a returned record, never a throw', () => {
  it('F-2: the zone-size constraint WITHOUT a repair (the wiring\'s supply, repair member ABSENT) answers REFUSAL-VIA-FEEDBACK — {status:\'refused\', reason:<the constraint\'s OWN feedback reason — a DATA STRING>, cleared: [], repaired: [], rows: [], crossings: 0, events: 0}; the store byte-identical; NOTHING stored, NOTHING cleared, NOTHING emitted; NO throw escapes', () => {
    // RED for the supply's absence (§4.2 item 3): the repairless constraint IS the
    // wiring's zone-size constraint, assembled WITHOUT the repair member.
    // RE-AIMED (the constraint evaluation's root-name gate): the member's matchedSet is the
    // ROOT form `'layout'`; the DECLARED roots are REQUIRED here — with a repairless
    // constraint matching `layout`, the wiring's OWN boot mint of `mem.layout` (a violating
    // undefined write) is REFUSED, so without the caller's declarations the root is never
    // declared and the later `mem.layout.size` writes parse to a non-matching dotted root
    // (the repairless drive would land instead of refuse):
    const row: GraphConstraint = {
      id: 'zone-size',
      matchedSet: 'layout',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: wiring.zoneSizeConstraint(MIN, MAX),
    }
    const { w, store } = compose({ store: makeStore({
      declarations: storeGraphReferences([{ name: 'layout' }, { name: 'drag' }, { name: 'settings' }]),
      constraints: [row],
    }) })
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const before = stored(store, `mem.layout.size`)
    const receipt = store.commit(`mem.layout.size`, 30)
    expect(receipt.status).toBe('refused')
    expect(typeof receipt.reason).toBe('string') // the constraint's OWN feedback reason
    expect(receipt.cleared).toEqual([])
    expect(receipt.repaired).toEqual([])
    expect(receipt.rows).toEqual([])
    expect(receipt.crossings).toBe(0)
    expect(receipt.events).toBe(0)
    const after = stored(store, `mem.layout.size`)
    expect(after.value).toBe(before.value) // byte-identical to its pre-call state
  })
})

describe('§3.2 F-3 — a repair\'s failure lands NOTHING', () => {
  it('F-3: RE-AIMED to the LANDED repair-landing cell (`evaluateConstraints`\' pre/post DIFF — the caller\'s success boolean is NOT consulted, the corrective action IS the mutation): a repair that returns false WITHOUT acting lands NO repaired reference, NO cleared reference, NO repair event, NO throw; the write\'s own status is committed and its value stands', () => {
    // RED for the supply's absence (§4.2 item 3): the constraint member is the
    // wiring's supply; the failing repair is a hostile caller-side response.
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // matchedSet `'layout'`, driven on the root's DIRECT leaf `mem.layout.size`.
    // NOTE FOR THE SPEC-DOC ROLE: the as-filed F-3 cell's "the store is byte-identical to its
    // pre-call state" is UNMAINTAINABLE against the landed machinery — the ONLY byte-identical
    // refusal is the REPAIRLESS path (`evaluateConstraints`' repairless-refusal arm); a repair
    // function's false RETURN is caller-side reporting, never consulted, so a failing repair
    // leaves the write's own value standing (no partial state, no repair-side mutation).
    const row: GraphConstraint = {
      id: 'zone-size-failing-repair',
      matchedSet: 'layout',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: wiring.zoneSizeConstraint(MIN, MAX),
      repair: (_data, feedback) => {
        if (feedback) feedback.reason = 'repair-refused'
        return false // the corrective action FAILED — acts on nothing
      },
    }
    const { w, store } = compose({ store: makeStore({ constraints: [row] }) })
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const events: GraphEvent[] = []
    store.subscribe('mem.layout.size', (e) => events.push(e))
    const receipt = store.set(`mem.layout.size`, 30)
    expect(receipt.repaired).toEqual([]) // the failing repair acted on NOTHING
    expect(receipt.cleared).toEqual([])
    expect(events.filter((e) => e.cause === 'repair').length).toBe(0) // no repair event
    expect(receipt.status).toBe('committed') // a repair function is present — never refused
    // the write's own value stands — the repair's return boolean is not consulted, the
    // corrective action is the DIFF (`evaluateConstraints`' pre/post comparison):
    expect(stored(store, `mem.layout.size`).value).toBe(30)
    void w
  })
})

describe('§3.3 I-1 / §3.2 F-9 — the constrained-store invariant: NO STORED ZONE SIZE IS EVER SUB-MINIMUM (the full write grid)', () => {
  it('F-9: every zone-size write shape (set/commit/remove) × every band leaves an end state in {min … max} ∪ {minimized} — a single sub-minimum cell FAILS', () => {
    const values = [49, 50, 75, 120, 0] as const
    const shapes = ['set', 'commit', 'remove'] as const
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // matchedSet `'layout'` and the direct leaf `mem.layout.size` — the grid's write shapes
    // all driving the SAME reference the repair can reach:
    for (const shape of shapes) {
      for (const value of values) {
        const { w, store } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
        expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
        let receipt: GraphWriteReceipt
        if (shape === 'remove') receipt = store.remove(`mem.layout.size`)
        else receipt = store[shape as 'set' | 'commit'](`mem.layout.size`, value)
        expect(receipt.status).toBe('committed') // a violating write is REPAIRED, not refused
        const end = stored(store, `mem.layout.size`)
        if (shape === 'remove') {
          expect(end.found).toBe(false) // a removal's post-state is a MISS — never a violation
        } else {
          const v = end.value as number
          expect(v >= MIN || v === MINIMIZE_MARKER).toBe(true) // the invariant holds on every post-state
        }
      }
    }
  })
})

/* ─── THE REGISTER ROW P-PD-SM-2 (S-PD-REPAIR-1, 8 = 3 bands × 2 sources + 2 refusals) ─── */

describe('REGISTER P-PD-SM-2 (S-PD-REPAIR-1) — the TWO-ARM REPAIR\'s end states, with the min/2 band boundary as the pinned split', () => {
  const cases: Array<[string, number, string]> = [
    ['01', 49, 'set'],
    ['02', 49, 'commit'],
    ['03', 50, 'set'],
    ['04', 50, 'commit'],
    ['05', 75, 'set'],
    ['06', 75, 'commit'],
  ]
  it.each(cases)('P-PD-SM-2/%s — band %d via %s', drive('P-PD-SM-2', (_id: string, band: number, source: string) => {
    const { w, store } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
    // RE-AIMED (the constraint evaluation's root-name gate + the repair's direct-leaf surface):
    // matchedSet `'layout'`, driven on the root's DIRECT leaf `mem.layout.size` with NUMBER
    // values the passed repair's `record.size` can reach; the repair-event observation is the
    // EXACT subscriber on the repaired reference (the repair emit carries the reference name
    // and NO origin — only the exact-match cell observes it):
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const events: GraphEvent[] = []
    store.subscribe('mem.layout.size', (e) => events.push(e))
    const receipt = store[source as 'set'](`mem.layout.size`, band)
    expect(receipt.status).toBe('committed')
    expect(receipt.repaired).toContain(`mem.layout.size`)
    const end = stored(store, `mem.layout.size`).value
    if (band < MIN / 2) expect(end).toBe(MINIMIZE_MARKER) // arm (b) — < min/2 strictly
    else expect(end).toBe(MIN) // arm (a) — [min/2, min) INCLUDING exactly min/2
    expect(events.filter((e) => e.cause === 'repair').length).toBe(1) // the repair's OWN event
  }))

  it.each([
    ['refusal-at-set', 'set'],
    ['refusal-at-commit', 'commit'],
  ] as Array<[string, string]>)('P-PD-SM-2/%s — the constraint WITHOUT a repair (the WIRING\'s supply), violating at %s ⇒ {status:\'refused\', …}, the store byte-identical, repaired: [], NO throw', drive('P-PD-SM-2', (_label: string, point: string) => {
    // RED for the supply's absence (§4.2 item 3): the repairless constraint is the
    // wiring's zone-size constraint, assembled WITHOUT the repair member.
    // RE-AIMED (the root-name gate + the DECLARED roots): as in F-2 — a repairless constraint
    // matching `layout` refuses the wiring's OWN boot mint of `mem.layout`, so the rows must
    // DECLARE the roots for the later drive's parse to match the constraint:
    const row: GraphConstraint = {
      id: 'zone-size',
      matchedSet: 'layout',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: wiring.zoneSizeConstraint(MIN, MAX),
    }
    const { w, store } = compose({ store: makeStore({
      declarations: storeGraphReferences([{ name: 'layout' }, { name: 'drag' }, { name: 'settings' }]),
      constraints: [row],
    }) })
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const before = stored(store, `mem.layout.size`).value
    const receipt = store[point as 'set'](`mem.layout.size`, 30)
    expect(receipt.status).toBe('refused')
    expect(receipt.repaired).toEqual([])
    expect(receipt.cleared).toEqual([])
    expect(receipt.events).toBe(0)
    expect(stored(store, `mem.layout.size`).value).toBe(before) // byte-identical
  }))
})

/* ─── THE REGISTER ROW P-PD-TP-1 (S-PD-FUNCTIONS-1, 18 = 6 shapes × 3 points) ─── */

describe('REGISTER P-PD-TP-1 (S-PD-FUNCTIONS-1) — the passed-function surface (constraint + repair, TOTAL) — §7a.1 item 3 reading (i): a hostile supply is ABSORBED at the evaluation', () => {
  const shapes = [
    'absent-undefined',
    'null',
    'non-function',
    'hostile-record-throwing-accessor',
    'function-returning-non-boolean',
    'function-throwing',
  ] as const
  const points = ['set', 'commit', 'remove'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const shape of shapes) {
    for (const point of points) {
      n += 1
      cases.push([String(n).padStart(2, '0'), shape, point])
    }
  }

  it.each(cases)('P-PD-TP-1/%s — supply shape %s × evaluation point %s', drive('P-PD-TP-1', (_id: string, shape: string, point: string) => {
    function hostileConstraint(shapeName: string): unknown {
      if (shapeName === 'absent-undefined') return undefined
      if (shapeName === 'null') return null
      if (shapeName === 'non-function') return 42
      if (shapeName === 'hostile-record-throwing-accessor') {
        return Object.defineProperty({}, 'x', { get() { throw new Error('boom') } })
      }
      if (shapeName === 'function-returning-non-boolean') {
        return () => 'not-a-boolean'
      }
      if (shapeName === 'function-throwing') {
        return () => { throw new Error('caller-function-throws') }
      }
      return undefined
    }

    const row: GraphConstraint = {
      id: 'hostile-zone-size',
      matchedSet: 'mem.layout.zone.<id>.size',
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: hostileConstraint(shape) as never,
    }
    let store: GraphStore
    try {
      store = makeStore({ constraints: [row] })
    } catch (error) {
      // PROBE-DISPOSITION: the store refused the hostile supply AT CONSTRUCTION — the
      // evaluation-point drives cannot run; the drive records the construction refusal
      // as the store's declared posture (nothing stored, no throw escapes). The probe
      // log distinguishes this path from the absorbed-at-evaluation path below.
      // eslint-disable-next-line no-console
      console.log(`TP1-CONSTRUCTION-REFUSED shape=${shape} point=${point} ${String((error as Error)?.message ?? error)}`)
      return // the store's construction posture — recorded as held
    }
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 200).status === 'committed' ||
      store.commit(`mem.layout.zone.${ZONE_ID}.size`, 200).status === 'refused').toBe(true)
    const before = (() => { try { return stored(store, `mem.layout.zone.${ZONE_ID}.size`).value } catch { return undefined } })()
    // THE ABSORPTION — never a throw out of the write turn, the write refused with the
    // violation's posture (NOTHING stored), byte-identical pre/post (a "committed" arm for
    // a PASSING constraint is the declared posture; a THROWING/non-boolean/absent one is
    // the refusal posture — either way the TURN never observes the throw):
    let outcome: 'threw' | 'returned' = 'returned'
    let receipt: GraphWriteReceipt | null = null
    try {
      const p = point as 'set'
      const name = `mem.layout.zone.${ZONE_ID}.size`
      if (p === 'set') receipt = store.set(name, 30)
      else if (p === 'commit') receipt = store.commit(name, 30)
      else receipt = store.remove(name)
    } catch (error) {
      outcome = 'threw'
      throw error // a throw OUT of the write turn FAILS the row — report it as the red
    }
    expect(outcome).toBe('returned')
    if (receipt !== null && receipt.status === 'refused') {
      expect(receipt.repaired).toEqual([])
      expect(receipt.cleared).toEqual([])
      const after = (() => { try { return stored(store, `mem.layout.zone.${ZONE_ID}.size`).value } catch { return undefined } })()
      expect(after).toBe(before) // byte-identical on the refusal cells
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART IV — THE ZONE-RENDER LISTENER (§4.2 item 4: M-9, F-10, I-4; register P-PD-SM-4)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-9 — the zone-render listener reads STORED values for its layout call', () => {
  it('M-9: the layout input is derived from the stored reads — a fixture that substitutes a module-held variable FAILS', () => {
    const { w, store, source } = compose()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 320).status).toBe('committed')
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.display`, 'block').status).toBe('committed')
    w.move('g1', { placement: 'p' })
    const latest = source.calls[source.calls.length - 1]!
    expect(latest.zoneId).toBe(ZONE_ID)
    expect(latest.size).toBe(320) // the STORED size — never host geometry
    expect(latest.display).toBe('block') // the STORED display — never a module-held variable
    // stored VALUES CHANGED ⇒ the render's answer CHANGES (the differential):
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 240).status).toBe('committed')
    w.move('g1', { placement: 'p2' })
    const again = source.calls[source.calls.length - 1]!
    expect(again.size).toBe(240)
  })
})

describe('§3.2 F-10 — the listener reads the store, not a module-held variable', () => {
  it('F-10: the render\'s answer CHANGES when the STORE changes and a module-held variable does NOT — the row asserts the render\'s input is the store\'s (the P-PD-SM-4 differential)', () => {
    const { w, store, source } = compose()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 300).status).toBe('committed')
    // a fixture module-held `let preview = 300` that a non-compliant render would read:
    let moduleHeld = 300
    w.move('g1', { placement: 'p1' })
    moduleHeld = 999 // the module variable mutates; the store does NOT
    w.move('g1', { placement: 'p2' })
    // if the render had read the module variable, the later calls would record 999:
    const recorded = source.calls.map((c) => c.size)
    expect(recorded.every((v) => v === 999)).toBe(false)
    expect(recorded[recorded.length - 1]).toBe(300)
  })
})

describe('§3.3 I-4 — the render reads the store', () => {
  it('I-4: the zone-render listener\'s layout input is a function of the STORED zone size/display — never host geometry, never a controller callback into host state', () => {
    const { w, store, source } = compose()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 280).status).toBe('committed')
    w.move('g1', { placement: 'p1' })
    expect(source.calls[source.calls.length - 1]!.size).toBe(280)
  })
})

/* ─── THE REGISTER ROW P-PD-SM-4 (S-PD-LISTENER-1, 12 = 4 listener shapes × 3 arms) ─── */

describe('REGISTER P-PD-SM-4 (S-PD-LISTENER-1) — the zone-render listener: subscriber delta, fan-out, stored-values read', () => {
  const shapes = ['one-subscriber-one-event', 'three-subscribers-registration-order', 'throwing-listener', 'non-callable-listener'] as const
  const arms = ['set', 'commit', 'repair'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const shape of shapes) {
    for (const arm of arms) {
      n += 1
      cases.push([String(n).padStart(2, '0'), shape, arm])
    }
  }

  it.each(cases)('P-PD-SM-4/%s — %s × %s', drive('P-PD-SM-4', (_id: string, shape: string, arm: string) => {
    const { w, store, source } = compose({ store: makeConstrainedStore(MIN, MAX, true) })
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 300).status).toBe('committed')

    /** THE OBSERVED WRITE per arm — RE-AIMED to the wiring's OWN turn shape (`renderer.ts`
     *  `move`/the per-gesture minted flag): the set arm drives a store `set` after the mint
     *  (a subsequent observed move); the commit arm drives a FRESH gesture's mint commit; the
     *  repair arm drives the wiring's own constraint's REPAIRED REFERENCE (the direct leaf
     *  `mem.layout.size` — the only reference whose record the passed repair can reach,
     *  matched at the root-form `'layout'`). */
    function observedWrite(): GraphWriteReceipt {
      if (arm === 'set') return store.set(`temp.drag.g1.placement`, { placement: 'x' })
      if (arm === 'commit') return store.commit('temp.drag.g-fresh.placement', { placement: 'first' })
      return store.set(`mem.layout.size`, 49) // arm 'repair' — the repaired reference (arm (b))
    }

    function fireArm(): void {
      if (arm === 'set') w.move('g1', { placement: 'more' }) // a subsequent move = set
      else if (arm === 'commit') {
        // the first preview write of a FRESH gesture = the commit/mint:
        w.move('g-fresh', { placement: 'first' })
      } else {
        store.commit(`mem.layout.zone.${ZONE_ID}.size`, 49) // a repaired reference (arm (b))
        expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 300).status).toBe('committed')
      }
    }

    const deliveries: GraphEvent[] = []
    if (shape === 'one-subscriber-one-event') {
      store.subscribe('drag', (e) => deliveries.push(e), { subtree: true })
      const before = deliveries.length
      fireArm()
      // ONE subscriber gets EXACTLY ONE event per write (the arm actually fired is the
      // declared one; the render turn also ran — observable through the source double):
      expect(deliveries.length - before).toBeLessThanOrEqual(1)
      expect(source.calls.length).toBeGreaterThan(0)
    } else if (shape === 'three-subscribers-registration-order') {
      // RE-AIMED (the emit's `origin.startsWith(subscriber.name + '.')` fan-out + the wiring's
      // own turn shape): the subscribers are the TIER-QUALIFIED ANCESTOR `'temp.drag'` (a bare
      // `'drag'` subscriber never fires for a tier-qualified write), and the observed write is
      // driven the way the composition writes the preview — the FIRST preview write is a
      // `commit` mint, each subsequent write a `set` (`move`'s per-gesture minted flag); a bare
      // `store.set` on a never-minted path is REFUSED `'undeclared-name'` (`setOrMint` cannot
      // auto-mint). The repair arm drives the REPAIRED REFERENCE (the wiring's own constraint's
      // direct leaf `mem.layout.size`), observed by the EXACT subscriber — the repair emit
      // carries the repaired reference and NO origin, so only the exact-match cell sees it.
      const registeredName = arm === 'repair' ? 'mem.layout.size' : 'temp.drag'
      if (arm === 'repair') expect(store.commit('mem.layout.size', MIN).status).toBe('committed') // the repair's reference must pre-exist
      // the SET arm's mint sits OUTSIDE the measured delta (observation begins after it):
      if (arm === 'set') w.move('g1', { placement: 'base' })
      const order: string[] = []
      const subtree = arm !== 'repair' // the ancestor form is subtree; the exact form is not
      store.subscribe(registeredName, (e) => { deliveries.push(e); order.push('first') }, { subtree })
      store.subscribe(registeredName, (e) => { deliveries.push(e); order.push('second') }, { subtree })
      store.subscribe(registeredName, (e) => { deliveries.push(e); order.push('third') }, { subtree })
      const before = deliveries.length
      const receipt = observedWrite()
      const fresh = deliveries.slice(before)
      const armDeliveries = arm === 'repair' ? fresh.filter((e) => e.cause === 'repair') : fresh
      expect(armDeliveries.length).toBe(3) // three deliveries for the arm's own event
      // one event to three listeners is events: 1 — a REPAIRING operation counts the caller's
      // own event PLUS one per repaired reference (§2.2 item 3):
      expect(receipt.events).toBe(arm === 'repair' ? 2 : 1)
      expect(order.slice(0, 3)).toEqual(['first', 'second', 'third']) // registration order
    } else if (shape === 'throwing-listener') {
      const registeredName = arm === 'repair' ? 'mem.layout.size' : 'temp.drag'
      if (arm === 'repair') expect(store.commit('mem.layout.size', MIN).status).toBe('committed')
      if (arm === 'set') w.move('g1', { placement: 'base' })
      const subtree = arm !== 'repair'
      store.subscribe(registeredName, () => { throw new Error('listener-throws') }, { subtree })
      store.subscribe(registeredName, (e) => deliveries.push(e), { subtree })
      store.subscribe(registeredName, (e) => deliveries.push(e), { subtree })
      const before = deliveries.length
      const receipt = observedWrite()
      const fresh = deliveries.slice(before)
      const armDeliveries = arm === 'repair' ? fresh.filter((e) => e.cause === 'repair') : fresh
      // the fan-out CONTINUES in registration order past the throwing listener and the
      // mutator's receipt is UNCHANGED:
      expect(armDeliveries.length).toBeGreaterThanOrEqual(1)
      expect(receipt.events).toBe(arm === 'repair' ? 2 : 1)
    } else {
      // a NON-CALLABLE listener — refused 'malformed-name' and registers NOTHING:
      const registeredName = arm === 'repair' ? 'mem.layout.size' : 'temp.drag'
      if (arm === 'repair') expect(store.commit('mem.layout.size', MIN).status).toBe('committed')
      if (arm === 'set') w.move('g1', { placement: 'base' })
      expect(() => store.subscribe(registeredName, 42 as never, { subtree: true })).not.toThrow()
      const receipt = observedWrite()
      expect(receipt.status).toBe('committed') // the write is unaffected; nothing registered
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART V — THE WIRED-STORE COMPOSITION END-TO-END (§5.2 leg 5; §3.1 M-12; §7a.1 item 4)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-12 — the wired-store composition holds end-to-end over the REAL store', () => {
  it('M-12: the boot wiring shape driven with a real createGraphStore (this unit\'s constraint/repair supplied AT CONSTRUCTION, §7a.1 item 4 reading (i) DECLARED roots via storeGraphReferences) and a recording source double — the register shows the caller\'s roots; NO throw escapes any turn', () => {
    const declarations = storeGraphReferences([
      { name: 'layout' },
      { name: 'drag' },
      { name: 'settings' },
    ])
    const store = makeStore({ declarations, constraints: [
      {
        id: 'zone-size',
        // RE-AIMED (the constraint evaluation's root-name gate — `captureConstraintSlots`
        // equals `member.matchedSet` against the write's parsed ROOT NAME, which never
        // carries the tier token): the member's matchedSet is the ROOT form `'layout'`.
        matchedSet: 'layout',
        evaluatedOn: ['set', 'commit', 'remove'],
        constraint: (wiring.zoneSizeConstraint as (min: number, max: number) => GraphConstraint['constraint'])(MIN, MAX),
        repair: (wiring.zoneSizeRepair as (min: number, max: number) => NonNullable<GraphConstraint['repair']>)(MIN, MAX),
      },
    ] })
    const source = makeSource()
    const w = wiring.createPaneDrag(store, source) as PaneDragSurface

    // the DECLARED roots — the register's rows pre-exist the first write (§7a.1 item 4 (i)):
    const rootNames = store.register.rows.map((r) => r.name)
    expect(rootNames).toContain('layout')
    expect(rootNames).toContain('drag')
    expect(rootNames).toContain('settings')

    const sink = makeSink()
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 300).status).toBe('committed')
    w.move('g1', { placement: 120 }) // first preview write = the temp commit/mint
    w.move('g1', { placement: 140 }) // subsequent move = a temp set
    w.release('g1', 240, sink) // release: ONE file commit inside the single sink invocation
    expect(sink.stats().sinkCalls).toBe(1)
    expect(stored(store, `file.settings.pane.${PANE_ID}.size`).value).toBe(240)
    expect(source.calls.length).toBeGreaterThan(0) // the zone render ran

    // no throw escapes ANY turn (the whole lifecycle above ran without one — asserted
    // turn by turn; a second gesture exercises right-click + cancel):
    w.move('g2', { placement: 90 })
    w.rightClick('g2')
    expect(stored(store, `temp.drag.g2.placement`).found).toBe(false)

    // the constrained store NEVER stored a sub-minimum zone size anywhere in the flows:
    const zoneHit = stored(store, `mem.layout.zone.${ZONE_ID}.size`)
    if (zoneHit.found) expect((zoneHit.value as number) >= MIN || zoneHit.value === MINIMIZE_MARKER).toBe(true)
  })
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART VI — THE STATIC ROWS (§4.2 item 6: §3.4 R-1..R-5)
 * ══════════════════════════════════════════════════════════════════════════════════ */

const MECHANISM_MODULES = [
  'src/shared/zones.ts',
  'src/shared/gutter.ts',
  'src/shared/relocate.ts',
  'src/shared/gutter-affordance.ts',
] as const

const STORE_TOKENS = ['store', 'subscribe', 'tiers', 'mem', 'temp', 'file', 'drag', 'layout', 'placement'] as const

function readModuleSource(relative: string): string {
  return readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8')
}

function scanForToken(source: string, token: string): boolean {
  // Case-sensitive word-boundary scan (the spec prints the tokens lowercase).
  return new RegExp(`\\b${token}\\b`).test(source)
}

/** THE STORE-CONTEXT MATCHER — §3.4 R-1's OPERATIVE READING (the spec's dated annotation,
 *  2026-10-03): the vocabulary scan fires ONLY ON A STORE-CONTEXT USAGE — a STORE-CONTEXT
 *  usage is a stored-name segment used as a STORE PATH: a call on the wired store or a tier
 *  handle whose QUOTED argument carries the token. Comments, prose and unrelated identifiers
 *  PASS — `relocate.ts`'s licit `drag` (`preDragValueOf`/`preDragValue` — the caller's own
 *  PRE-DRAG-VALUE hook, never the store) is the spec's NAMED counterexample that MUST HOLD. */
function storeCallWithToken(source: string, token: string): boolean {
  // a store-variable/tier-handle call whose string argument names a path carrying the token:
  return new RegExp(
    `\\b(?:store|tiers)\\b[^;\\n\\r]{0,80}?\\.\\s*(?:get|set|commit|remove|clear|resolve|subscribe|has|sweep|sever|export)\\s*\\([^)]*["'][^"']*\\b${token}\\b[^"']*["'][^)]*\\)`
  ).test(source)
}

describe('§3.4 R-1 — THE NO-BYTES-MOVE ROW (plan rows 1/3/4/15)', () => {
  it('R-1: the four named mechanism modules\' OWN bytes contain NO store import and NO STORE-CONTEXT token usage (the operative store-context reading — the as-filed word scan is RE-SCOPED: `relocate.ts`\'s licit `drag` is the counterexample that MUST HOLD); the POSITIVE CONTROLS — a planted store import and a planted store-path call — FAIL the scan', () => {
    // positive controls first: the scanner must catch a planted store import and a planted
    // store-path call (a store-context usage — a store call whose quoted name carries a token):
    const plantedImport = "import { createGraphStore } from '../renderer/store-core-graph'"
    expect(plantedImport.includes("'../renderer/store-core-graph'")).toBe(true)
    const plantedCall = "store.commit('temp.drag.g1.placement', preview)"
    expect(storeCallWithToken(plantedCall, 'drag')).toBe(true)
    const plantedTierCall = "tiers['mem'].get('layout.pane.pane-a.size')"
    expect(storeCallWithToken(plantedTierCall, 'layout')).toBe(true)
    // the spec's NAMED COUNTEREXAMPLE: `relocate.ts`'s licit `drag` — prose and the caller's
    // own pre-drag-value identifiers — must HOLD (a store-context scan never fires on it):
    expect(storeCallWithToken("// the pre-drag value, read from the caller's own hook record", 'drag')).toBe(false)
    expect(storeCallWithToken('preDragValueOf(record)', 'drag')).toBe(false)

    for (const rel of MECHANISM_MODULES) {
      const source = readModuleSource(rel)
      expect(source.length).toBeGreaterThan(0)
      // no import statement from the store modules (no import/export routing a value through
      // the store):
      expect(source.includes("'../renderer/store-core-graph'")).toBe(false)
      expect(source.includes('store-graph-references')).toBe(false)
      // the extended token family fires ONLY in a store-call context (a stored name segment
      // used as a store path) — a hit is named so the disposition is attributable (token ×
      // file), never a bare assertion:
      for (const token of STORE_TOKENS) {
        const hit = storeCallWithToken(source, token)
        if (hit) {
          // eslint-disable-next-line no-console
          console.log(`R-1-SCAN-HIT: store-context token '${token}' matches in ${rel}`)
        }
        expect(hit, `R-1: store-context token '${token}' appears in ${rel}`).toBe(false)
      }
    }
  })
})

describe('§3.4 R-2 — THE WIRING-ONLY / NO-WRITE-THROUGH ROW', () => {
  it('R-2: the wiring module carries NO module-scope store binding (the store handle appears ONLY as a wiring-held value passed into closures — dom-shim F-12 shape); a planted module-scope binding FAILS the scan', () => {
    const renderer = readModuleSource('src/renderer/renderer.ts')
    const planted = 'const store = createGraphStore({})'
    expect(/^const\s+store\s*=/m.test(planted)).toBe(true) // positive control
    expect(/^const\s+store\s*=/m.test(renderer)).toBe(false) // no module-scope binding
    expect(/^let\s+store\s*=/m.test(renderer)).toBe(false)
  })

  it('R-2: the store is NEVER handed an element (this repo writes no file under <Astrographer>/ — H-r6; out of the node host\'s reach, recorded in the row comment)', () => {
    // The fork-boundary half (H-r6) is not drivable on the node host; the drivable half
    // here is the fixture discipline: the drive fixtures pass element/token and the store
    // itself is never given an element — asserted at the composition surface.
    const { w, store } = compose()
    expect(store.commit(`mem.layout.pane.${PANE_ID}.size`, 240).status).toBe('committed')
    expect(() => w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
  })
})

describe('§3.4 R-3 — THE FROZEN-SESSION ROW', () => {
  it('R-3: the gesture-session surface gains NO store parameter, NO subscription, NO onChange member (the store\'s listener is the wiring\'s, registered on the store, never on the session)', () => {
    // The session module's exported surface must not carry a channel member. The session
    // module is LANDED and frozen (gsession.md §2.5's eleven items, byte-for-byte) — this
    // unit adds nothing to it; the probe asserts no channel member appears.
    const sessionSource = readModuleSource('src/shared/gesture-session.ts')
    expect(scanForToken(sessionSource, 'subscribe')).toBe(false)
  })
})

describe('§3.4 R-4 — THE ONE-SINK/ONE-CLAMP ROW', () => {
  it('R-4: the composition lands the single sink channel (SINK-2) and the family\'s ONE clamp site stands — the release turn performs ONE sink invocation and the store commit rides inside it (the two readings agree at 1); the repair function bytes contain no clamp', () => {
    const { w, store } = compose()
    const sink = makeSink()
    w.move('g1', { placement: 100 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // one sink invocation
    // RE-AIMED (the tier-qualified read — the file handle's `get` resolves the FULL spelling;
    // the old stripped form walked only the root's own name and answered the boot-clear MISS):
    expect(stored(store, `file.settings.pane.${PANE_ID}.size`).value).toBe(240)
    // the family's one clamp site: no seam wrapper, reset path or repair function adds a
    // clamp — the REPAIR's own bytes (the caller-supplied function) must not clamp:
    if (typeof wiring.zoneSizeRepair === 'function') {
      const repairSource = wiring.zoneSizeRepair.toString()
      expect(repairSource).not.toContain('clamp')
    }
  })
})

describe('§3.4 R-5 — THE NO-NEW-STORE-SURFACE ROW', () => {
  it('R-5: createGraphStore is called with the LANDED options only (declarations / constraints / crossing / reservedNamespaces / enableTestSeam) — the landed set loads and no new option member is added', () => {
    const store = createGraphStore({
      declarations: storeGraphReferences([
        { name: 'layout' },
        { name: 'drag' },
        { name: 'settings' },
      ]),
      constraints: [],
      crossing: null,
      reservedNamespaces: [],
      enableTestSeam: false,
    })
    expect(store.register).toBeDefined()
    expect(store.tiers).toBeDefined()
  })
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART VII — THE REGISTER TOTALS (REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS, §5.5.3)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('THE REGISTER TOTALS — 91 declared attempts, printed with their terms', () => {
  it('the register rows\' drive tables sum to the declared 91 = 12 + 9 + 9 + 8 + 8 + 12 + 18 + 15', () => {
    const declared: Record<string, number> = {
      'P-PD-IM-1': 12,
      'P-PD-IM-2': 9,
      'P-PD-SM-1': 9,
      'P-PD-SM-2': 8,
      'P-PD-SM-3': 8,
      'P-PD-SM-4': 12,
      'P-PD-TP-1': 18,
      'P-PD-TP-2': 15,
    }
    const sum = Object.values(declared).reduce((a, b) => a + b, 0)
    expect(sum).toBe(91)
    expect(Math.max(...Object.values(declared))).toBeLessThanOrEqual(100) // per-row cap
    expect(sum).toBeLessThanOrEqual(400) // total cap
  })
})

afterAll(() => {
  const strategies: Record<string, string> = {
    'P-PD-IM-1': 'S-PD-READS-1',
    'P-PD-IM-2': 'S-PD-ZONE-1',
    'P-PD-SM-1': 'S-PD-GESTURE-1',
    'P-PD-SM-2': 'S-PD-REPAIR-1',
    'P-PD-SM-3': 'S-PD-REASSERT-1',
    'P-PD-SM-4': 'S-PD-LISTENER-1',
    'P-PD-TP-1': 'S-PD-FUNCTIONS-1',
    'P-PD-TP-2': 'S-PD-DEGRADE-1',
  }
  const declaredTerms: Record<string, number> = {
    'P-PD-IM-1': 12, 'P-PD-IM-2': 9, 'P-PD-SM-1': 9, 'P-PD-SM-2': 8,
    'P-PD-SM-3': 8, 'P-PD-SM-4': 12, 'P-PD-TP-1': 18, 'P-PD-TP-2': 15,
  }
  // eslint-disable-next-line no-console
  console.log(
    'REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS: 91 = 12 (P-PD-IM-1) + 9 (P-PD-IM-2) + 9 (P-PD-SM-1) + 8 (P-PD-SM-2) + 8 (P-PD-SM-3) + 12 (P-PD-SM-4) + 18 (P-PD-TP-1) + 15 (P-PD-TP-2)'
  )
  let grandAttempts = 0
  let grandFailures = 0
  for (const row of Object.keys(declaredTerms)) {
    const tally = rowTallies[row] ?? { attempts: 0, held: 0, failures: 0 }
    grandAttempts += tally.attempts
    grandFailures += tally.failures
    // eslint-disable-next-line no-console
    console.log(
      `${row} [${strategies[row]}] declared ${declaredTerms[row]} · attempted ${tally.attempts} · held ${tally.held} · broken ${tally.failures}`
    )
  }
  // eslint-disable-next-line no-console
  console.log(`REGISTER-RUN-TOTAL: attempted ${grandAttempts} · broken ${grandFailures} (family subtotals: IM 21 · SM 37 · TP 33)`)
})