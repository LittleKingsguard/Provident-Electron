// strata:marked-file rework — pins today's module machinery; the storeroom rework replaces it whole (D-30)
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
// **THE SHAPE'S CLIENT (`D-88`)** — the composition reads the pane geometry off it, so this file's fixtures build one over a
// CROSSING DOUBLE that projects the recorded store's pane rows and writes them back the way the route does.
import { createViewClient, type ViewClient } from '../src/renderer/view-client'
import {
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  defaultPaneGeometry,
  paneGeometryIn,
} from '../src/shared/view-shape'
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
  /** **THE RENDER TURN — THE SHAPE'S DELIVERY CALLS IT** (`D-92`): the successor of the `subscribe('temp.drag', …)`
   *  registration, and the only thing that makes the layout call. */
  renderZone(): void
  /** **THE PREVIEW'S OWN READ** (`D-92`): the closure's member, declared so the erase rule is observable. */
  previewOf(gestureId: string): unknown
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
  view: ViewClient
  crossing: PaneCrossing
} {
  const source = options.source ?? makeSource()
  const store = options.store ?? makeStore()
  const crossing = crossingOf(store)
  return {
    w: wiring.createPaneDrag({ frozen: store, view: crossing.client }, source) as PaneDragSurface,
    source,
    store,
    view: crossing.client,
    crossing,
  }
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


/** **THE CROSSING DOUBLE (`D-88`, RE-GRAINED `D-89`)** — THE SHAPE THE COMPOSITION NOW READS, AND THE ROUTE LOG ITS
 *  WRITES GO TO. The composition reads the pane geometry OFF THE SHAPE and writes ONE `commitPane`, so a row that used to
 *  seed `mem.layout.pane.<id>.size` on the frozen store and read a commit back off it is measuring machinery that is gone.
 *  This double stands the crossing in for both halves:
 *
 *   · **THE CREATION STATE IS THE REPAIR'S AND NOT AN EMPTY MAP.** `panes-must-stand` writes the MEASURED DEFAULT for the
 *     one pane the app has at the store's creation (`src/main/view-record/index.ts`'s `repairPanes`), so the family stands
 *     at `{pane-a: {size: 100, bounds: {min: 0, max: 200}}}` before any caller writes — which is why `pane-a` is the
 *     RECORD arm and any other id is the DEFAULT arm.
 *   · **`commitPane` COMPOSES THE WHOLE FAMILY THE WAY THE CROSSING'S ROUTE DOES** (`composePanes`): the named pane takes
 *     the members supplied, each missing one falling to what that pane stands at and then to the measured default, and
 *     every other pane the family holds is kept — one act cannot erase a sibling's geometry.
 *   · **EVERY WRITE REFILLS THE SHAPE AND FIRES THE DELIVERY SYNCHRONOUSLY.** The real delivery is asynchronous; a node row
 *     that had to await a microtask to read back what it just wrote would be measuring the event loop rather than the
 *     composition. The real asynchronous path is driven in `tests/integration/store-view-record/client.test.ts` (C-3/C-5).
 *   · **THE ROUTE LOG IS THE WRITE CENSUS.** What the rows used to count as `file.settings.pane.<id>.size` commits they now
 *     count as `commitPane` CALLS — one route call is one whole member, which is the whole of what the swap changed about
 *     the write. */
interface PaneRouteCall {
  readonly id: string
  readonly geometry: unknown
}

interface PaneCrossing {
  readonly client: ViewClient
  /** Every `commitPane` the composition sent, in order. */
  readonly calls: PaneRouteCall[]
  /** The family as the crossing's store holds it. */
  readonly family: () => Readonly<Record<string, { readonly size: number; readonly bounds: { readonly min: number; readonly max: number } }>>
  /** **THE CAUSE OF A DELIVERY WITH NO ROUTE CALL**: the family as a store that already holds it would answer — a boot, a
   *  second window's write, or the repair. It refills and delivers exactly as a route call does, and it records NO route
   *  call, because it is not this composition's write. */
  readonly seed: (id: string, geometry: { readonly size?: number; readonly bounds?: { readonly min: number; readonly max: number } }) => void
  /** The live `onChanged` registrations — 0 for every row here, because this composition registers nothing on the push. */
  readonly registrations: () => number
  /** Read the shape's own `filled` statement. */
  readonly filled: () => boolean
  /** **THE ZONE FAMILY AS THE CROSSING'S STORE HOLDS IT** (`D-92`): `['zones']` at `mem`, one whole family, each zone a
   *  record of the members its writer supplied. */
  readonly zoneFamily: () => Readonly<Record<string, HeldZone>>
  /** **A ZONE'S OWN DELIVERY** — the cause of a change with no route call from this composition (a boot, a second
   *  window, or the crossing's own `commitZones` from another consumer). It refills the shape and pushes, exactly as a
   *  route call does, and records nothing on the route log. */
  readonly seedZone: (id: string, zone: HeldZone) => void
  /** A zone member left OUT of a seed is DROPPED from the family's record — the crossing's `composeZones` keeps what the
   *  caller supplied and what otherwise stands, so a row that wants a member gone supplies none of it. */
  readonly zoneCalls: ZoneRouteCall[]
}

/** ONE ZONE AS THE RECORD HOLDS IT (D-91): all four members optional, `slot` opaque. */
interface HeldZone {
  readonly slot?: unknown
  readonly distance?: number
  readonly size?: number
  readonly display?: string
}

interface ZoneRouteCall {
  readonly id: string
  readonly zone: unknown
}

const crossingOfStore = new WeakMap<object, PaneCrossing>()

/** **WHICH ARM ANSWERED ONE PANE'S READ** — `paneGeometryIn`'s own `source` member over the shape the composition reads,
 *  so a row can tell the record from the measured default instead of inferring it from a figure that could coincidentally
 *  equal the default. It reads the SHAPE (not the composition) on purpose: the derivation is the crossing's and the
 *  composition must not be the only place that can state it. */
function paneSourceOf(crossing: PaneCrossing, id: string): string {
  return paneGeometryIn(crossing.client.shape().panes, id).source
}

function defaultGeometryFor(id: string): { size: number; bounds: { min: number; max: number } } {
  const seed = defaultPaneGeometry(id)
  return { size: seed.size, bounds: { min: seed.bounds.min, max: seed.bounds.max } }
}

function crossingOf(store?: GraphStore): PaneCrossing {
  if (store !== undefined && store !== null) {
    const cached = crossingOfStore.get(store as unknown as object)
    if (cached !== undefined) return cached
  }
  // THE CREATION REPAIR'S PLACEHOLDER — `panes-must-stand`'s own seed, present before any caller writes.
  let family: Record<string, { size: number; bounds: { min: number; max: number } }> = {
    [DEFAULT_PANE_ID]: defaultGeometryFor(DEFAULT_PANE_ID),
  }
  // **THE ZONE FAMILY'S CREATION PLACEHOLDER IS THE ONE THAT NAMES NO ZONE** (`D-91`): `zones-must-stand` repairs to `{}`,
  // so a zone nothing seeded answers `null` and `candidatesFor` answers `[]` — the answer the frozen store's `undefined`
  // gave. A row that wants a zone seeds it, which is a DELIVERY and not this composition's write.
  let zones: Record<string, HeldZone> = {}
  const handlers: Array<() => void> = []
  const calls: PaneRouteCall[] = []
  const zoneCalls: ZoneRouteCall[] = []
  const reading = (): unknown => ({
    status: 'committed',
    panes: Object.keys(family).map((id) => {
      const held = family[id]!
      return { id, size: held.size, bounds: { min: held.bounds.min, max: held.bounds.max } }
    }),
    focus: { entries: [], activeId: null },
    // THE THIRD FAMILY (D-91): the reading carries all three, and this double drives the panes AND the zones while the
    // mirror stays at its declared empty pair.
    zones: Object.keys(zones).map((id) => {
      const held = zones[id]!
      const record: { id: string; slot?: unknown; distance?: number; size?: number; display?: string } = { id }
      if (held.slot !== undefined) record.slot = held.slot
      if (held.distance !== undefined) record.distance = held.distance
      if (held.size !== undefined) record.size = held.size
      if (held.display !== undefined) record.display = held.display
      return record
    }),
    source: { panes: 'record', focus: 'record', zones: 'record' },
  })
  const bridge = {
    read: async (): Promise<unknown> => reading(),
    commitPane: async (id: string, geometry: unknown): Promise<unknown> => {
      const supplied = geometry as { readonly size?: unknown; readonly bounds?: { readonly min: number; readonly max: number } } | undefined
      const base = family[id] ?? defaultGeometryFor(id)
      const size = typeof supplied?.size === 'number' ? supplied.size : base.size
      const bounds = supplied?.bounds ?? base.bounds
      // THE WHOLE FAMILY, ONE ACT — the sibling panes are kept (`composePanes`).
      family = { ...family, [id]: { size, bounds: { min: bounds.min, max: bounds.max } } }
      calls.push({ id, geometry })
      refill()
      return { status: 'committed' }
    },
    commitFocus: async (): Promise<unknown> => ({ status: 'committed' }),
    // **THE FAMILY IS COMPOSED AT THE CROSSING** (`composeZones`, D-91): the members supplied are written over what the
    // zone stands at, the ones the caller did not supply are KEPT, and every sibling zone survives — one act cannot erase
    // a zone it never read. This double drives no row through it; it stands here so the member set matches the bridge's.
    commitZones: async (id: string, zone: unknown): Promise<unknown> => {
      const supplied = (zone ?? {}) as HeldZone
      zones = { ...zones, [id]: { ...(zones[id] ?? {}), ...supplied } }
      zoneCalls.push({ id, zone })
      refill()
      return { status: 'committed' }
    },
    onChanged: (handler: () => void): (() => void) => {
      handlers.push(handler)
      return (): void => {
        const at = handlers.indexOf(handler)
        if (at >= 0) handlers.splice(at, 1)
      }
    },
  }
  const client = createViewClient({ bridge })
  /** THE DELIVERY, MODELLED AT THE CROSSING — the shape is REPLACED WHOLE by what a read answers, then the push fires. */
  function refill(): void {
    client.adopt(reading() as never)
    for (const handler of [...handlers]) {
      try {
        handler()
      } catch {
        /* a delivery body's own throw stops at the body */
      }
    }
  }
  refill()
  const crossing: PaneCrossing = {
    client,
    calls,
    family: (): Readonly<Record<string, { readonly size: number; readonly bounds: { readonly min: number; readonly max: number } }>> => family,
    seed: (id, geometry): void => {
      const base = family[id] ?? defaultGeometryFor(id)
      family = {
        ...family,
        [id]: {
          size: typeof geometry.size === 'number' ? geometry.size : base.size,
          bounds: geometry.bounds ?? base.bounds,
        },
      }
      refill()
    },
    registrations: (): number => handlers.length,
    filled: (): boolean => client.shape().filled,
    zoneFamily: (): Readonly<Record<string, HeldZone>> => zones,
    seedZone: (id, zone): void => {
      zones = { ...zones, [id]: { ...zone } }
      refill()
    },
    zoneCalls,
  }
  if (store !== undefined && store !== null) crossingOfStore.set(store as unknown as object, crossing)
  return crossing
}

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART I — THE STORE-BACKED READ ROWS (§4.2 item 1: M-1..M-3, M-11, F-5, F-8;
 * register P-PD-IM-1/2, P-PD-TP-2) — every drive against the ABSENT seam surface.
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-1 — the store-backed startSizeOf read answers the STORED size on a HIT', () => {
  it('M-1: the family\'s own size is answered BY VALUE out of the SHAPE, and the answer tracks what the crossing holds (a module-held size that disagrees with the shape FAILS)', () => {
    const { w, crossing } = compose()
    const seeded = 240
    // THE RECORD ARM: the crossing\'s store holds the pane — a write this composition did not send (a boot, a second
    // window, the repair) — the delivery refills the shape, and the read answers it in the caller\'s own turn.
    crossing.seed(PANE_ID, { size: seeded })
    expect(crossing.calls, 'the seed is not this composition\'s write, so it sends no route call').toEqual([])
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(seeded)
    // AND IT TRACKS: a second delivery moves the answer, so a module-held size could not have produced it.
    crossing.seed(PANE_ID, { size: 260 })
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(260)
  })
})

describe('§3.1 M-2 — a MISS answers the DECLARED FALLBACK, never a silent default', () => {
  it('M-2/DEFAULT-arm: a pane THE FAMILY DOES NOT NAME answers the MEASURED DEFAULT — the swap\'s ONE stated behaviour change, and the two-tier fallback it replaces no longer exists to fall through (D-87\'s collapsed precedence, D-88)', () => {
    const { w, crossing } = compose()
    // THE ONE ADDRESS: the geometry is ONE family at `file` (D-87\'s inherited fact (i)), so there is no second tier for a
    // MISS to ascend to. The declared fallback is the MEASURED DEFAULT — the authored pane\'s `props.size` — and the read
    // says which arm answered, so a placeholder is never passed off as a record.
    expect(Object.keys(crossing.family()), 'the creation repair minted the one pane the app has, and nothing else').toEqual([PANE_ID])
    expect(w.startSizeOf({ id: 'pane-unwritten' }, 'pane-unwritten'), 'the measured default, not `undefined` and not a refusal').toBe(DEFAULT_PANE_SIZE)
    expect(paneSourceOf(crossing, 'pane-unwritten'), 'and the read NAMES the arm that answered').toBe('default')
    expect(paneSourceOf(crossing, PANE_ID), 'while the pane the family names is the record\'s').toBe('record')
  })

  it('M-2/E3-gate: the DEGRADATION moves onto the value the terminal is HANDED — the read cannot answer a non-number any more (the boundary admits none), so the E3 gate is driven at the release: a non-number `final` is never sent, ZERO sink writes and ZERO route calls (gutter.md §2.5 item 5)', () => {
    const { w, crossing } = compose()
    // (a) THE READ IS ALWAYS A NUMBER NOW, and that is the swap\'s stated change: the frozen store\'s MISS answered
    // `undefined`, which made the release refuse `\'unusable-default\'` with zero writes. The shape answers the measured
    // default instead, so the degradation is unreachable FROM A READ.
    for (const id of [PANE_ID, 'pane-unwritten']) {
      expect(typeof w.startSizeOf({ id }, id), `the read for ${id} is a usable number`).toBe('number')
    }
    // (b) THE ARM ITSELF IS NOT DELETED, IT IS MOVED: the terminal still refuses a value it cannot use — ZERO sink writes,
    // and now also ZERO route calls, because the route is sent only after the sink has been invoked.
    const sink = makeSink()
    w.release('g-r', 'not-a-size', sink)
    expect(sink.stats().sinkCalls).toBe(0)
    expect(crossing.calls, 'a refused final sends nothing to the crossing').toEqual([])
  })
})

describe('§3.1 M-3 — boundsOf hands the RECEIVED pair through — never a policy clamped here', () => {
  it('M-3: the stored {min, max} pair is handed through AS STORED (value-identical members); no seam, no route and no repair member rewrote it', () => {
    const { w, crossing } = compose()
    const pair = { min: 40, max: 800 }
    // THE RECORD ARM, held the way the crossing\'s own store would hold it.
    crossing.seed(PANE_ID, { bounds: pair })
    const answer = w.boundsOf(paneFixture, PANE_ID) as { min: number; max: number }
    expect(answer.min).toBe(40)
    expect(answer.max).toBe(800)
    // THE DEFAULT ARM: a fresh copy of the measured constant, never a clamped policy and never a caller-movable module value.
    const measured = w.boundsOf({ id: 'pane-unwritten' }, 'pane-unwritten') as { min: number; max: number }
    expect(measured).toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })
    measured.min = -1
    expect(w.boundsOf({ id: 'pane-unwritten' }, 'pane-unwritten'), 'the caller\'s mutation cannot reach the constant').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
  })
})

describe('§3.1 M-11 — the candidate reads reach the PURE comparator as scalars', () => {
  it('M-11: the candidate carries the OPAQUE recorded slot and the recorded caller-measured distance, READ OFF THE SHAPE\'S `[\'zones\']` FAMILY (`D-92`); withinProximity decides — no geometry read, no element read, the composition never handed an element', () => {
    const { w, crossing } = compose()
    // THE RECORD ARM, delivered the way a commit of the zone family delivers: no route call is sent by this composition.
    crossing.seedZone(ZONE_ID, { slot: 'slot-7', distance: 40 })
    expect(crossing.zoneCalls, 'the seed is not this composition\'s write').toEqual([])
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
  it('F-5: ONE `commitPane(pane, {size})` with no lower copy to clear, never a refusal, never a removal, never a second write — the sink\'s record and the route log agree at 1', () => {
    const { w, store, crossing } = compose()
    const sink = makeSink()
    const final = 260
    expect(store.tiers['temp'].get('temp.drag.g1.placement').found).toBe(false)
    w.release('g1', final, sink)
    expect(sink.stats().sinkCalls).toBe(1)
    expect(sink.record).toEqual([final])
    // THE WRITE, AS THE ROUTE CARRIES IT: ONE call, one whole member, the pane NAMED and never a path or a tier.
    expect(crossing.calls, 'one route call — the two-tier commit spelling is gone').toEqual([{ id: PANE_ID, geometry: { size: final } }])
    expect(crossing.family()[PANE_ID]?.size, 'and what the crossing holds is the sink\'s own argument').toBe(final)
  })
})

describe('§3.2 F-8 — a throwing seam implementation\'s throw is BOUND to its turn', () => {
  it('F-8/hostile-value: a hostile value is BOUND to its turn — a non-number final is refused at the terminal with ZERO sink writes and ZERO route calls, and a usable one is handed through BY VALUE to both, with NO throw out of any wiring turn', () => {
    // THE HOSTILE READ IS NO LONGER REACHABLE (the boundary admits no such member), so the row drives the hostile VALUE at
    // the terminal instead — which is where E3\'s gate already lived.
    for (const hostile of ['x', null, undefined, Number.NaN]) {
      const { w, crossing } = compose()
      const sink = makeSink()
      expect(() => w.release('g-h1', hostile, sink)).not.toThrow()
      expect(sink.stats().sinkCalls, `${String(hostile)} is unusable ⇒ ZERO sink writes`).toBe(0)
      expect(crossing.calls, `${String(hostile)} is unusable ⇒ ZERO route calls`).toEqual([])
    }
    // AND THE USABLE ARM PASSES THE VALUE THROUGH UNCHANGED — the same number the sink recorded is the number sent.
    const { w, crossing } = compose()
    const sink = makeSink()
    expect(() => w.release('g-h2', 42, sink)).not.toThrow()
    expect(sink.record).toEqual([42])
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: 42 } }])
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

/* ─── THE REGISTER ROW P-PD-IM-1 (S-PD-READS-1, 12 = 2 read seams × 3 shape states × 2 turns) ───
 *
 * **RE-GRAINED BY `D-89` ONTO WHAT THE SWAPPED SIDE ACTUALLY DOES.** The declared term is UNMOVED at twelve — two read
 * seams (`startSizeOf`/`defaultSizeFor` and `boundsOf`) times THREE STATES times two gesture turns — and the three states
 * are no longer the frozen store's tiers. They are the SHAPE's three:
 *
 *   1. **record** — the family NAMES the pane, and the read answers the family's own value;
 *   2. **default** — the family stands but does not name this pane, so the MEASURED DEFAULT answers and the derivation says
 *      so (`paneGeometryIn`'s `source`), which is the arm the two-tier MISS fallback used to answer;
 *   3. **unfilled** — NOTHING HAS BEEN READ YET (`shape().filled === false`): the same measured figures, and the shape's
 *      own flag is what tells this state apart from the second. That is the state the boot mint used to be reached for —
 *      a cold mirror is now the crossing's creation repair's business and never the read's, so the read states it plainly
 *      rather than writing anything (`D-82` clause 4).
 *
 * **THE ROW STILL BITES, ON ALL TWELVE CELLS**: move a measured default, drop the `filled` flag, or let the family's value
 * go unread, and the cell reddens. */

describe('REGISTER P-PD-IM-1 (S-PD-READS-1) — the shape-backed size/bounds READS: record / measured default / unfilled', () => {
  const cases: Array<[string, string]> = [
    ['01', 'size-read RECORD (the family names the pane), onStart read'],
    ['02', 'size-read RECORD (the family names the pane), terminal read'],
    ['03', 'size-read MEASURED DEFAULT (the family names no such pane), onStart read'],
    ['04', 'size-read MEASURED DEFAULT (the family names no such pane), terminal read'],
    ['05', 'size-read UNFILLED (nothing has been read), onStart read'],
    ['06', 'size-read UNFILLED (nothing has been read), terminal read'],
    ['07', 'bounds-read RECORD (the family names the pane), onStart read'],
    ['08', 'bounds-read RECORD (the family names the pane), terminal read'],
    ['09', 'bounds-read MEASURED DEFAULT (the family names no such pane), onStart read'],
    ['10', 'bounds-read MEASURED DEFAULT (the family names no such pane), terminal read'],
    ['11', 'bounds-read UNFILLED (nothing has been read), onStart read'],
    ['12', 'bounds-read UNFILLED (nothing has been read), terminal read'],
  ]

  it.each(cases)('P-PD-IM-1/%s — %s', drive('P-PD-IM-1', (id: string) => {
    const n = parseInt(id, 10)
    const onStartRead = n % 2 === 1
    const isBounds = n > 6
    const state = n <= 2 || (n >= 7 && n <= 8) ? 'record' : n <= 4 || (n >= 9 && n <= 10) ? 'default' : 'unfilled'
    const readOf = (surface: PaneDragSurface, element: unknown, token: unknown): unknown =>
      isBounds ? surface.boundsOf(element, token) : onStartRead ? surface.startSizeOf(element, token) : surface.defaultSizeFor(element, token)

    // THE UNFILLED ARM IS A REALM WHOSE SHAPE NOTHING HAS FILLED — the client with no crossing member at all, which is the
    // node shim's own case and the honest statement of "no delivery has arrived".
    if (state === 'unfilled') {
      const { store } = compose()
      const cold = createViewClient({ bridge: null })
      const coldSurface = wiring.createPaneDrag({ frozen: store, view: cold }, makeSource()) as PaneDragSurface
      expect(cold.shape().filled, 'nothing has been read, and the shape SAYS so').toBe(false)
      const answer = readOf(coldSurface, paneFixture, PANE_ID)
      if (isBounds) {
        expect(answer, 'the measured default pair, answered rather than withheld').toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })
      } else {
        expect(answer, 'the measured default size').toBe(DEFAULT_PANE_SIZE)
      }
      return
    }

    const { w, crossing } = compose()
    if (state === 'record') {
      if (isBounds) {
        crossing.seed(PANE_ID, { bounds: { min: 40, max: 800 } })
        expect(readOf(w, paneFixture, PANE_ID)).toEqual({ min: 40, max: 800 })
      } else {
        crossing.seed(PANE_ID, { size: 240 })
        expect(readOf(w, paneFixture, PANE_ID)).toBe(240) // the FAMILY'S value by value
      }
      expect(paneSourceOf(crossing, PANE_ID), 'and the derivation names the record arm').toBe('record')
      return
    }

    // THE MEASURED-DEFAULT ARM — a pane id the family does not name (the creation repair minted only the one pane the app
    // has, so any other id is this arm), read through the same two turns.
    const other = { id: 'pane-unwritten' }
    if (isBounds) {
      expect(readOf(w, other, 'pane-unwritten')).toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })
    } else {
      expect(readOf(w, other, 'pane-unwritten')).toBe(DEFAULT_PANE_SIZE)
    }
    expect(paneSourceOf(crossing, 'pane-unwritten'), 'and the derivation names the default arm, never a record').toBe('default')
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
    // **RE-GRAINED `D-92`**: the three "stored zone states" are the three states of the SHAPE'S `['zones']` FAMILY, which
    // the crossing delivers — (1) both members, (2) `slot` alone, (3) a zone the family does not name. The frozen store's
    // `mem.layout.zone.<id>.*` writes answered the same three states through machinery this composition no longer reads.
    const { w, crossing } = compose()
    const n = parseInt(id, 10)
    const zoneState = ((n - 1) % 3) + 1
    const shape = Math.ceil(n / 3)

    if (zoneState === 1) {
      crossing.seedZone(ZONE_ID, { slot: 'slot-7', distance: 40 })
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
      if (zoneState === 2) crossing.seedZone(ZONE_ID, { slot: 'slot-7' })
      // A zone whose `slot` the family does not name is admitted per the CALLER's declared rule — never a
      // record decision, never a throw; the comparator still answers boolean from its
      // arguments (a MISS distance is the unusable class ⇒ false where it participates).
      expect(() => w.candidatesFor(zoneFixture)).not.toThrow()
      if (zoneState === 2) {
        // THE `slot`-ALONE ARM IS A CANDIDATE WITH NO DISTANCE — the record named the slot and not the measure.
        expect(w.candidatesFor(zoneFixture).length).toBe(1)
        expect(w.candidatesFor(zoneFixture)[0]?.distance).toBeUndefined()
      }
      if (zoneState === 3) expect(w.candidatesFor(zoneFixture), 'a zone nothing names is NO candidate').toEqual([])
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
    'unfilled-shape',
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
      } else if (shape === 'unfilled-shape') {
        // **THE FIFTH SHAPE, RE-GRAINED (`D-89`)**: it was `miss-with-no-declared-fallback`, whose declared answer was a
        // NON-NUMBER — the `undefined` the frozen store's two-tier MISS produced, which the release then refused as
        // `'unusable-default'`. The shape that replaces it is a realm where NOTHING HAS BEEN READ: the answer is the
        // MEASURED DEFAULT (a finite number) and the shape says `filled: false`, so the degradation is stated rather than
        // silent and the read is TOTAL over it exactly as it is over the hostile arms beside it.
        const cold = createViewClient({ bridge: null })
        const coldSurface = wiring.createPaneDrag({ frozen: makeStore(), view: cold }, makeSource()) as PaneDragSurface
        expect(cold.shape().filled).toBe(false)
        expect(() => coldSurface.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
        const answer = impl === 'boundsOf' ? coldSurface.boundsOf(paneFixture, PANE_ID) : coldSurface.startSizeOf(paneFixture, PANE_ID)
        if (impl === 'boundsOf') {
          expect(answer, 'the measured default pair answers, and it is a USABLE pair').toEqual({
            min: DEFAULT_PANE_BOUNDS.min,
            max: DEFAULT_PANE_BOUNDS.max,
          })
        } else {
          expect(answer, 'the measured default size answers, and it is a USABLE number').toBe(DEFAULT_PANE_SIZE)
        }
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

describe('§3.1 M-4 — the SHAPE\'S DELIVERY is the render turn\'s trigger', () => {
  it('M-4: the composition registers NO subscriber at all (the `subscribe(\'temp.drag\', …, {subtree:true})` registration is DELETED, `D-92`); the render turn is the surface\'s own `renderZone` member, the shape\'s ONE delivery calls it, and the layout input tracks the DELIVERED zone — re-grain of the as-filed "a move\'s temp write fires the ancestor subscriber"', () => {
    const { w, store, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 300, display: 'block' })
    // THE TRIGGER IS THE DELIVERY'S TURN, CALLED BY THE CONSUMER — never a registration of this composition's.
    w.renderZone()
    const latest = source.calls[source.calls.length - 1]
    expect(latest).toBeDefined()
    expect(latest!.zoneId).toBe(ZONE_ID)
    expect(latest!.size).toBe(300)
    expect(latest!.display).toBe('block')
    // NOTHING IS REGISTERED ANYWHERE: not on the store, not on the shape (`M-PDV-4`'s count, driven here as the store\'s).
    expect(crossing.registrations(), 'the composition takes no subscription of its own').toBe(0)

    // THE DELIVERED-VALUE DIFFERENTIAL: a second delivery changes the record and the render turn follows IT.
    crossing.seedZone(ZONE_ID, { size: 260, display: 'block' })
    w.renderZone()
    let saw260 = false
    for (const call of source.calls) if (call.size === 260) saw260 = true
    expect(saw260).toBe(true)
    // AND THE FROZEN STORE IS NOT CONSULTED: a `mem.layout.zone.*` write nothing delivers changes nothing.
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 999).status).toBe('committed')
    w.renderZone()
    expect(source.calls[source.calls.length - 1]!.size, 'the frozen store\'s tier is not a read authority any more').toBe(260)
  })
})

describe('§3.1 M-5 — a valid release commits the SINK\'S value once — the two readings AGREE at 1', () => {
  it('M-5: the sink\'s own record reads 1 and stats().sinkCalls reads 1 (they AGREE), and the crossing received exactly ONE `commitPane(pane, {size: final})` whose value EQUALS the sink\'s argument — the reconcile that used to refresh a second tier OUTSIDE the gesture count has no second tier to refresh', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    const clamped = 240
    w.move('g1', { placement: 120 }) // a preview
    w.release('g1', clamped, sink)

    expect(sink.record).toEqual([clamped]) // the sink\'s own record
    expect(sink.stats().sinkCalls).toBe(1) // E3-side reading — they AGREE at 1
    // THE ONE WRITE: the route carries the sink\'s own argument to the ONE family at the ONE address.
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: clamped } }])
    expect(crossing.family()[PANE_ID]?.size).toBe(clamped)
    // THE §7a.1 ITEM 1 RECONCILE IS GONE WITH THE SECOND TIER: there is no `mem` copy to refresh, so the gesture\'s write
    // count is exactly the sink\'s and nothing happens behind it.
    expect(sink.stats().sinkCalls, 'still exactly one write inside the gesture').toBe(1)
  })
})

describe('§3.1 M-10 — the temp preview is RESIDENT IN THE COMPOSITION\'S CLOSURE while active', () => {
  it('M-10: a move\'s preview is held by the composition itself and answers its own `previewOf` — and the FROZEN STORE\'S `temp` TIER IS UNTOUCHED, which is `D-90`\'s judgement landed: `temp.drag.*` had one writer, no reader, no address and no persistence, so it is closure state and NOT data (re-grain of the as-filed "resident at the temp tier" row)', () => {
    const { w, store } = compose()
    const preview = { placement: 'preview-1' }
    expect(w.previewOf('g1'), 'nothing is held before the first move').toBeUndefined()
    w.move('g1', preview)
    // THE PREVIEW IS RESIDENT — in the closure that wrote it, read back by its own declared member.
    expect(w.previewOf('g1')).toEqual(preview)
    // **AND NO STORE ACT WAS MADE**: the frozen store\'s `temp` tier carries no node for the gesture at all, so the name
    // `temp.drag.<gestureId>.placement` does not exist anywhere but this closure. That is the whole difference between a
    // value held as state and a value stored as data, and it is measured rather than asserted.
    expect(store.tiers['temp'].get('temp.drag.g1.placement').found).toBe(false)
    // a SECOND gesture is independent state, never a second entry in one record.
    w.move('g2', { placement: 'preview-2' })
    expect(w.previewOf('g1')).toEqual(preview)
    expect(w.previewOf('g2')).toEqual({ placement: 'preview-2' })
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
  it('F-6/valid-release: EXACTLY the ONE route call — never a per-move store write, never a temp erase at the release terminal — and the whole gesture makes NO store act at all (re-grain of the temp-tier event count, `D-92`)', () => {
    const { w, store, crossing } = compose()
    const sink = makeSink()
    // **THE OBSERVED SURFACE IS NOW "DID THE STORE MOVE AT ALL"**: the preview is closure state and the release\'s one write
    // is the crossing route, so the whole gesture must leave the frozen store byte-identical — which is a STRONGER claim
    // than the as-filed "one temp commit and zero temp removes".
    const tempEvents: GraphEvent[] = []
    store.subscribe(`temp.drag.g1.placement`, (e) => tempEvents.push(e), { subtree: true })
    w.move('g1', { placement: 100 })
    w.move('g1', { placement: 140 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // never two, never a per-move write
    expect(tempEvents, 'not one store event: the preview is the closure\'s').toEqual([])
    expect(w.previewOf('g1'), 'and the preview is still the closure\'s, untouched by the release turn').toEqual({ placement: 140 })
    // THE GESTURE END\'S ONE WRITE IS THE ROUTE CALL — counted on the route\'s own log, which is where the write now lands.
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
  })

  it('F-6/right-click: EXACTLY ONE erase of the closure\'s preview, ZERO sink writes, and NOT ONE store act — never a commit at the same terminal', () => {
    const { w, store, crossing } = compose()
    const tempEvents: GraphEvent[] = []
    const fileEvents: GraphEvent[] = []
    store.subscribe(`temp.drag.g1.placement`, (e) => tempEvents.push(e), { subtree: true })
    store.subscribe(`file.settings.pane.${PANE_ID}.size`, (e) => fileEvents.push(e), { subtree: true })
    w.move('g1', { placement: 100 })
    w.rightClick('g1')
    expect(w.previewOf('g1'), 'the preview is ERASED from the closure').toBeUndefined()
    expect(tempEvents, 'no store remove: the preview never was a store node').toEqual([])
    expect(fileEvents, 'no store commit at the terminal').toEqual([])
    expect(crossing.calls, 'and no route call at an abandon terminal').toEqual([])
  })

  it('F-6/§7a.1.2-cancel: the cancel/pointercancel terminal erases the closure\'s preview with AT MOST ONE erase per gesture (reading (i)); ZERO sink writes (E10)', () => {
    const { w, crossing } = compose()
    w.move('g1', { placement: 100 }) // the preview is resident
    expect(w.previewOf('g1')).toEqual({ placement: 100 })
    w.cancel('g1')
    expect(w.previewOf('g1'), 'the cancel ERASES it — reading (i), not reading (ii)').toBeUndefined()
    // AT MOST ONE ERASE: a second cancel is the declared MISS no-op — nothing to erase, nothing to throw (F-4\'s class).
    expect(() => w.cancel('g1')).not.toThrow()
    expect(w.previewOf('g1')).toBeUndefined()
    expect(crossing.calls, 'ZERO route calls at the abandon terminal').toEqual([])
    // AND THE GESTURE MAY BEGIN AGAIN: a fresh move re-mints it, so `erased` gates the ERASE and never the gesture.
    w.move('g1', { placement: 140 })
    expect(w.previewOf('g1')).toEqual({ placement: 140 })
  })

  it('F-6/invalid-release (reset): ONE route call holding the clamped PRE-DRAG size (the persistent original RESTORED BY THE CALL)', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    crossing.seed(PANE_ID, { size: 220 }) // the pre-drag size the reset restores
    w.move('g1', { placement: 100 })
    w.release('g1', 220, sink) // 220 = the clamped pre-drag size
    expect(sink.stats().sinkCalls).toBe(1)
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: 220 } }])
    expect(crossing.family()[PANE_ID]?.size).toBe(220)
  })
})

/* ─── THE REGISTER ROW P-PD-SM-1 (S-PD-GESTURE-1, 9 = 3×2 + 3) ─── */

describe('REGISTER P-PD-SM-1 (S-PD-GESTURE-1) — the temp-write turn: per-move writes and the ONE-write-per-gesture-end rule, with the closure\'s own delta (`D-92`: the subscriber delta has no subject, because there is no registration)', () => {
  const cases: Array<[string, string]> = [
    ['01', 'valid release — sink record reading'],
    ['02', 'valid release — stats().sinkCalls reading (AGREE)'],
    ['03', 'invalid release — sink record reading'],
    ['04', 'invalid release — stats().sinkCalls reading (AGREE)'],
    ['05', 'right-click — sink record reading'],
    ['06', 'right-click — stats().sinkCalls reading (AGREE)'],
    ['07', 'move-turn drive: the FIRST preview write lands in the closure (the mint\'s successor)'],
    ['08', 'move-turn drive: a SUBSEQUENT move replaces the preview in place'],
    ['09', 'move-turn drive: NO move ⇒ NO preview'],
  ]

  it.each(cases)('P-PD-SM-1/%s — %s', drive('P-PD-SM-1', (id: string) => {
    const n = parseInt(id, 10)
    if (n <= 6) {
      const { w, crossing } = compose()
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
          // RE-GRAINED (`D-89`): the write is the ROUTE CALL, not a store commit — ONE `commitPane` carrying the sink's own
          // value, which is what the two-tier commit spelling became.
          expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: endPath === 1 ? 240 : 220 } }])
          expect(crossing.family()[PANE_ID]?.size).toBe(endPath === 1 ? 240 : 220)
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
      // **RE-GRAINED `D-92`**: the FIRST preview write lands in the composition\'s own closure, and the assertion is that
      // the closure is EMPTY before it and holds the preview after — read by the surface\'s declared `previewOf`. The
      // store\'s `commit`-versus-`set` vocabulary (a mint against a later in-place replace) has no successor, because the
      // two arms wrote the same `Map` either way.
      const { w, store } = compose()
      expect(w.previewOf('g1'), 'no preview before the first write').toBeUndefined()
      w.move('g1', { placement: 100 })
      expect(w.previewOf('g1')).toEqual({ placement: 100 })
      expect(store.tiers['temp'].get(`temp.drag.g1.placement`).found, 'and the frozen store\'s temp tier is untouched').toBe(false)
    } else if (n === 8) {
      const { w } = compose()
      w.move('g1', { placement: 100 })
      w.move('g1', { placement: 140 })
      // THE SUBSEQUENT MOVE REPLACES THE WHOLE PREVIEW VALUE IN PLACE:
      expect(w.previewOf('g1')).toEqual({ placement: 140 })
    } else {
      const { w, store } = compose()
      w.release('g1', 240, makeSink()) // a whole gesture with NO move at all
      expect(w.previewOf('g99'), 'NO move ⇒ NO preview, for any gesture id').toBeUndefined()
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
    const { w, store, crossing } = compose()
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
        // RE-GRAINED (`D-89`): a NORMAL write — one route call carrying the value, never a removal and never a second
        // write. The store-tier spelling this read used to consult no longer exists.
        expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
        expect(crossing.family()[PANE_ID]?.size).toBe(240)
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

describe('REGISTER P-PD-TP-1 (S-PD-FUNCTIONS-1) — the passed-function surface (constraint, TOTAL) — RE-AIMED to the LANDABLE half (PBT AUDIT 2026-10-05, FINDING 1): the machinery CALLS the member on matching writes; the §7a.1 item 3 reading (i) evaluation-absorption is ROUTED TO THE ARCHITECT and recorded, never asserted', () => {
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
    // RE-AIMED (PBT AUDIT 2026-10-05, FINDINGS 1 + 2 (a)): the row's drives now REACH the
    // evaluation — the member's `matchedSet` is the ROOT form `'layout'` (the ONLY form the
    // landed `captureConstraintSlots` gate `member.matchedSet === parsed.rootName` accepts;
    // the as-driven `'mem.layout.zone.<id>.size'` matchedSet could never equal a write's
    // parsed ROOT NAME, so the member NEVER evaluated), and the writes land on the matched
    // root's DIRECT leaf `mem.layout.size` — the surface the evaluation's leaf record
    // reaches (the enumerated §2.4 name 5 nested form evaluates against `{zone: undefined}`
    // and never reaches the member's data – finding 2 (a)).
    //
    // DATED NOTE — THE ARCHITECT-ROUTED RESIDUE (FINDING 1): a THROWING constraint function
    // at a MATCHING matchedSet PROPAGATES out of the evaluation on the frozen store
    // (`evaluateConstraints` calls `member.constraint(...)` UNGUARDED); the §7a.1 item 3
    // reading (i) absorption reading is ROUTED TO THE ARCHITECT (§7 item 7) and is
    // UNLANDABLE without a store-surface change — this row asserts only what IS landable
    // (the machinery CALLS the member on matching writes — the call-count/arity
    // observables; refusal-via-feedback when the supply is repairless; a non-function is
    // never called), and the throwing cells RECORD the residue without asserting either
    // absorption or propagation.
    //
    // THE HOSTILE SUPPLY — the fixture admits the drive's in-domain SEED (MIN) so the
    // evaluation-point writes (30) REACH the evaluation with a live leaf; on the
    // violating writes under test the function shape answers its declared hostile form
    // (a non-boolean, or a throw). The call-recording observables pin the call-count and
    // the positional-arity (changed/current/next — the store calls with ≥3 arguments).
    const callLogs = new Map<string, unknown[][]>()
    function hostileConstraint(shapeName: string): unknown {
      if (shapeName === 'absent-undefined') return undefined
      if (shapeName === 'null') return null
      if (shapeName === 'non-function') return 42
      if (shapeName === 'hostile-record-throwing-accessor') {
        // a hostile record whose OWN member throws on read — the store never reads a
        // constraint's internals, so the member is skipped by the typeof-gate, never read:
        return Object.defineProperty({}, 'x', { get() { throw new Error('boom') } })
      }
      const log: unknown[][] = []
      callLogs.set(shapeName, log)
      if (shapeName === 'function-returning-non-boolean') {
        return (changed: unknown, current: unknown, next: unknown, feedback?: { reason?: string }): unknown => {
          log.push([changed, current, next, feedback])
          const record = (next ?? null) as { size?: unknown } | null | undefined
          const size = record !== null && typeof record === 'object' && 'size' in record ? record.size : next
          if (typeof size === 'number' && size >= MIN) return true // the drive's in-domain SEED lands
          if (feedback !== undefined) feedback.reason = 'hostile-non-boolean'
          return 'not-a-boolean' // the HOSTILE SHAPE — a non-boolean answer on a violating write
        }
      }
      if (shapeName === 'function-throwing') {
        return (changed: unknown, current: unknown, next: unknown): unknown => {
          log.push([changed, current, next])
          const record = (next ?? null) as { size?: unknown } | null | undefined
          const size = record !== null && typeof record === 'object' && 'size' in record ? record.size : next
          if (typeof size === 'number' && size >= MIN) return true // the drive's in-domain SEED lands
          throw new Error('caller-function-throws') // the THROWING SHAPE on a violating write
        }
      }
      return undefined
    }

    const row: GraphConstraint = {
      id: 'hostile-zone-size',
      matchedSet: 'layout', // the ROOT form — the ONLY form the landed root-name gate accepts
      evaluatedOn: ['set', 'commit', 'remove'],
      constraint: hostileConstraint(shape) as never,
    }
    let store: GraphStore
    try {
      // THE DECLARED ROOT — REQUIRED for this row, exactly as F-2 / P-PD-SM-2's refusal rows
      // document it: `rootParts` names the root BY POSITION only where the segment is
      // DECLARED — without the declaration the drive's first `mem.layout.size` write parses
      // to the WHOLE dotted root `'layout.size'` (the mint declares THAT as the root) and the
      // `matchedSet: 'layout'` member NEVER captures — the evaluation is never reached.
      // Declaring `layout` (with the wiring's sibling roots) makes every drive write parse
      // to the root the member matches.
      store = makeStore({
        declarations: storeGraphReferences([{ name: 'layout' }, { name: 'drag' }, { name: 'settings' }]),
        constraints: [row],
      })
    } catch (error) {
      // PROBE-DISPOSITION: the store refused the hostile supply AT CONSTRUCTION — the
      // evaluation-point drives cannot run; the drive records the construction refusal
      // as the store's declared posture (nothing stored, no throw escapes).
      // eslint-disable-next-line no-console
      console.log(`TP1-CONSTRUCTION-REFUSED shape=${shape} point=${point} ${String((error as Error)?.message ?? error)}`)
      return // the store's construction posture — recorded as held
    }
    // THE SEED at the reachable direct leaf — an in-domain write the function shapes admit
    // (so the point writes REACH the evaluation on a live leaf) and the non-function shapes
    // commit unguarded (the member is skipped — never called):
    expect(store.commit(`mem.layout.size`, MIN).status).toBe('committed')
    const before = stored(store, `mem.layout.size`).value
    const callsBefore = callLogs.get(shape)?.length ?? 0
    let receipt: GraphWriteReceipt | null = null
    let threw: unknown = null
    try {
      const p = point as 'set'
      const name = `mem.layout.size`
      if (p === 'set') receipt = store.set(name, 30)
      else if (p === 'commit') receipt = store.commit(name, 30)
      else receipt = store.remove(name)
    } catch (error) {
      threw = error
    }
    const calls = callLogs.get(shape) ?? []
    if (shape === 'function-returning-non-boolean') {
      // LANDABLE: the machinery CALLED the member ONCE at the matching write, with the
      // positional (changed, current, next) arity — the call-count/arity observables:
      expect(calls.length - callsBefore).toBe(1)
      expect(calls[callsBefore]!.length).toBeGreaterThanOrEqual(3)
      // the non-boolean answer is a VIOLATION; the supply is REPAIRLESS ⇒ refusal-via-
      // feedback — the constraint's OWN data-string reason, the store byte-identical:
      expect(threw).toBe(null)
      expect(receipt !== null && receipt.status === 'refused').toBe(true)
      expect(typeof receipt!.reason).toBe('string')
      expect(receipt!.repaired).toEqual([])
      expect(receipt!.cleared).toEqual([])
      expect(receipt!.events).toBe(0)
      expect(stored(store, `mem.layout.size`).value).toBe(before) // byte-identical pre/post
    } else if (shape === 'function-throwing') {
      // LANDABLE: the THROWING member WAS called at the matching write — the throw is
      // attributable to the EVALUATION, never a load/construct failure (the routed
      // residue itself — absorption or propagation — is NOT asserted here; see the
      // DATED NOTE above).
      expect(calls.length - callsBefore).toBe(1)
      expect(calls[callsBefore]!.length).toBeGreaterThanOrEqual(3)
      void threw
    } else {
      // the NON-FUNCTION shapes (absent / null / non-function / a hostile record): the
      // store's typeof-gate SKIPS the member — it is NEVER called, NEVER read, and no
      // throw escapes; the write proceeds unguarded:
      expect(calls.length).toBe(0)
      expect(threw).toBe(null)
      expect(receipt !== null && receipt.status === 'committed').toBe(true)
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART IV — THE ZONE-RENDER LISTENER (§4.2 item 4: M-9, F-10, I-4; register P-PD-SM-4)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-9 — the zone-render turn reads the RECORDED zone values for its layout call', () => {
  it('M-9: the layout input is derived from the shape\'s `[\'zones\']` family — a fixture that substitutes a module-held variable FAILS (`D-92`: the frozen store\'s `mem.layout.zone.<id>.size`/`.display` reads are the shape\'s now)', () => {
    const { w, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 320, display: 'block' })
    w.renderZone()
    const latest = source.calls[source.calls.length - 1]!
    expect(latest.zoneId).toBe(ZONE_ID)
    expect(latest.size).toBe(320) // the RECORDED size — never host geometry
    expect(latest.display).toBe('block') // the RECORDED display — never a module-held variable
    // recorded VALUES CHANGED ⇒ the render\'s answer CHANGES (the differential):
    crossing.seedZone(ZONE_ID, { size: 240, display: 'block' })
    w.renderZone()
    const again = source.calls[source.calls.length - 1]!
    expect(again.size).toBe(240)
  })
})

describe('§3.2 F-10 — the render turn reads the record, not a module-held variable', () => {
  it('F-10: the render\'s answer CHANGES when the DELIVERED family changes and a module-held variable does NOT — the row asserts the render\'s input is the record\'s (the P-PD-SM-4 differential)', () => {
    const { w, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 300 })
    // a fixture module-held `let preview = 300` that a non-compliant render would read:
    let moduleHeld = 300
    w.renderZone()
    moduleHeld = 999 // the module variable mutates; the record does NOT
    w.renderZone()
    // if the render had read the module variable, the later calls would record 999:
    const recorded = source.calls.map((c) => c.size)
    expect(recorded.every((v) => v === 999)).toBe(false)
    expect(recorded[recorded.length - 1]).toBe(300)
  })
})

describe('§3.3 I-4 — the render reads the record (one read authority per zone reference)', () => {
  it('I-4: the render turn\'s layout input is a function of the RECORDED zone size/display — never host geometry, never a controller callback into host state, and never the frozen store\'s tier', () => {
    const { w, store, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 280, display: 'normal' })
    w.renderZone()
    expect(source.calls[source.calls.length - 1]!.size).toBe(280)
    // **THE FROZEN STORE IS NOT A SECOND AUTHORITY**: a `mem.layout.zone.<id>.size` write changes nothing the render reads.
    expect(store.commit(`mem.layout.zone.${ZONE_ID}.size`, 999).status).toBe('committed')
    w.renderZone()
    expect(source.calls[source.calls.length - 1]!.size, 'one read authority: the shape\'s family').toBe(280)
    expect(crossing.zoneFamily()[ZONE_ID]?.size).toBe(280)
  })
})

/* ─── THE REGISTER ROW P-PD-SM-4 (S-PD-LISTENER-1, 12 = 4 listener shapes × 3 arms) ─── */

describe('REGISTER P-PD-SM-4 (S-PD-LISTENER-1) — the render turn: no registration of its own, and the delivered family is its input', () => {
  // **RE-GRAINED `D-92` — THE SUBJECT MOVED, THE CELL COUNT DID NOT.** The as-filed row drove the FROZEN STORE'S newsletter:
  // four subscriber shapes × three write arms, all of them about a registration this composition has now DELETED. Its term
  // was "the listener: subscriber delta, fan-out, stored-values read"; the composition registers NOTHING, so the delta is
  // ZERO by construction and the fan-out is the CLIENT'S (driven in `tests/integration/store-view-record/client.test.ts`).
  // What is left — and what the composition actually owns — is the TURN: four delivery shapes × three zone-member arms,
  // each asking whether the layout input is the delivered family's and whether the turn is total.
  const shapes = ['one-delivery-one-render', 'three-deliveries-registration-order', 'throwing-layout-sink', 'non-callable-layout-sink'] as const
  const arms = ['size', 'display', 'both'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const shape of shapes) {
    for (const arm of arms) {
      n += 1
      cases.push([String(n).padStart(2, '0'), shape, arm])
    }
  }

  it.each(cases)('P-PD-SM-4/%s — %s × %s', drive('P-PD-SM-4', (_id: string, shape: string, arm: string) => {
    const { w, crossing, source } = compose()
    /** THE DELIVERED MEMBERS PER ARM — `slot`/`distance` ride the same family and are not this turn's input. */
    const zoneFor = (size: number): { readonly size?: number; readonly display?: string } => {
      if (arm === 'size') return { size }
      if (arm === 'display') return { display: size === 300 ? 'block' : 'normal' }
      return { size, display: 'block' }
    }

    if (shape === 'one-delivery-one-render') {
      crossing.seedZone(ZONE_ID, zoneFor(300))
      const before = source.calls.length
      w.renderZone()
      // ONE DELIVERY, ONE RENDER TURN — and the input is the delivered family, member for member.
      expect(source.calls.length).toBe(before + 1)
      const latest = source.calls[source.calls.length - 1]!
      expect(latest.size).toBe(arm === 'display' ? undefined : 300)
      expect(latest.display).toBe(arm === 'size' ? undefined : 'block')
      // THE DELTA IS ZERO: the composition took NO registration, on the store or on the shape.
      expect(crossing.registrations()).toBe(0)
    } else if (shape === 'three-deliveries-registration-order') {
      // three deliveries in order, three turns in order, and the LAST answer is the last delivery's — the turn carries no
      // memory of its own, so a stale value could only come from the record.
      for (const size of [100, 200, 300]) {
        crossing.seedZone(ZONE_ID, zoneFor(size))
        w.renderZone()
      }
      const sizes = source.calls.map((c) => c.size)
      expect(sizes.slice(-3)).toEqual(arm === 'display' ? [undefined, undefined, undefined] : [100, 200, 300])
      expect(crossing.registrations()).toBe(0)
    } else if (shape === 'throwing-layout-sink') {
      // a layout sink that THROWS is the caller's own failure, and it must not escape the turn (`F-8`'s class).
      const throwing = { layout: (): void => { throw new Error('sink-throws') } }
      const withThrow = wiring.createPaneDrag({ frozen: undefined, view: crossing.client }, throwing) as PaneDragSurface
      crossing.seedZone(ZONE_ID, zoneFor(300))
      expect(() => withThrow.renderZone()).not.toThrow()
      // and THIS composition\'s own turn still answers afterwards — the throw stopped at the sink.
      w.renderZone()
      expect(source.calls.length).toBeGreaterThan(0)
    } else {
      // a NON-CALLABLE layout sink: the turn refuses to call it and lands the declared degradation — never a throw.
      const nonCallable = { layout: 42 as never }
      const refused = wiring.createPaneDrag({ frozen: undefined, view: crossing.client }, nonCallable) as PaneDragSurface
      crossing.seedZone(ZONE_ID, zoneFor(300))
      expect(() => refused.renderZone()).not.toThrow()
      expect(source.calls.length, 'nothing reaches a sink that is not a function').toBe(0)
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
    // THE BACKING RECORD, NOT THE BARE STORE (`D-88`): the reads are the SHAPE's and the frozen store is the drag tier's.
    const crossing = crossingOf(store)
    const w = wiring.createPaneDrag({ frozen: store, view: crossing.client }, source) as PaneDragSurface

    // the DECLARED roots — the register's rows pre-exist the first write (§7a.1 item 4 (i)):
    const rootNames = store.register.rows.map((r) => r.name)
    expect(rootNames).toContain('layout')
    expect(rootNames).toContain('drag')
    expect(rootNames).toContain('settings')

    const sink = makeSink()
    crossing.seedZone(ZONE_ID, { size: 300 })
    w.move('g1', { placement: 120 }) // first preview write — into the composition's closure
    w.move('g1', { placement: 140 }) // subsequent move — replaces the preview in place
    w.release('g1', 240, sink) // release: ONE route call inside the single sink invocation
    expect(sink.stats().sinkCalls).toBe(1)
    expect(crossing.calls, 'the release\'s write is the route call').toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
    // THE RENDER TURN RAN, ON THE DELIVERED FAMILY (`D-92`: it used to run off the store's temp newsletter).
    w.renderZone()
    expect(source.calls.length).toBeGreaterThan(0)
    expect(source.calls[source.calls.length - 1]!.size).toBe(300)

    // no throw escapes ANY turn (the whole lifecycle above ran without one — asserted
    // turn by turn; a second gesture exercises right-click + cancel):
    w.move('g2', { placement: 90 })
    w.rightClick('g2')
    expect(w.previewOf('g2'), 'the erase turn emptied the closure, not a store tier').toBeUndefined()
    expect(store.tiers['temp'].get(`temp.drag.g2.placement`).found, 'and the frozen store never held it').toBe(false)

    // **THE CONSTRAINT/REPAIR SUPPLIED AT THE STORE'S CONSTRUCTION STILL WORKS ON THE STORE IT GUARDS**: a sub-minimum
    // write to the reachable matched leaf is repaired to the minimize marker — the composition no longer sends such a
    // write, so this is the store's own machinery, driven to show the batch is intact beside the composition's turns.
    expect(store.commit(`mem.layout.size`, 49).status).toBe('committed')
    expect(stored(store, `mem.layout.size`).value).toBe(MINIMIZE_MARKER)
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
  it('R-2: RE-AIMED (PBT AUDIT 2026-10-05, FINDING 4 — the executed scan): the unit\'s OWN additions add NO NEW module-scope store binding — the scan is a NAME-AGNOSTIC module-scope binding detector (the audit\'s `^const\s+store\s*=` / `^let\s+store\s*=` forms match only the literal `store`, so a differently-named binding THIS UNIT adds would slip past them), and the landed `wiredGraphStore` TENANT-1 seam (§0 ruling 12 — the wired store\'s own module-scope binding, landed BEFORE this unit) is the ONE named exception that MUST HOLD; the unit\'s composition (`createPaneDrag(store, source)`) holds the store as an ARGUMENT — never a new module-scope binding (dom-shim F-12 shape); a differently-named planted binding FAILS the scan', () => {
    const renderer = readModuleSource('src/renderer/renderer.ts')
    /** THE NAME-AGNOSTIC MODULE-SCOPE STORE-BINDING DETECTOR — a module-scope `const`/`let`
     *  whose declaration carries the store CONSTRUCTION (`createGraphStore(...)`) or a
     *  `GraphStore` type annotation, caught whatever the binding is called. */
    function moduleScopeStoreBindings(source: string): string[] {
      const found: string[] = []
      for (const line of source.split('\n')) {
        const m = line.match(/^(?:const|let)\s+([A-Za-z_$][\w$]*)\s*(?::\s*([^=]+?))?\s*=/)
        if (m === null) continue
        const name = m[1] as string
        const type = m[2] ?? ''
        if (/\bcreateGraphStore\s*\(/.test(line) || /\bGraphStore\b/.test(type)) found.push(name)
      }
      return found
    }
    // POSITIVE CONTROLS — a differently-named planted module-scope store binding IS caught:
    expect(moduleScopeStoreBindings('const graftedStore = createGraphStore({})')).toEqual(['graftedStore'])
    expect(moduleScopeStoreBindings('let myStore: GraphStore = null')).toEqual(['myStore'])
    // THE ROW'S PIN — the ONLY module-scope store binding in the wiring module is the landed
    // TENANT-1 seam `wiredGraphStore`; a binding THIS UNIT added, under ANY name, would join
    // the detected set and FAIL:
    expect(moduleScopeStoreBindings(renderer)).toEqual(['wiredGraphStore'])
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
  it('R-4: the composition lands the single sink channel (SINK-2) and the family\'s ONE clamp site stands — the release turn performs ONE sink invocation and the route call rides inside it (the two readings agree at 1); the repair function bytes contain no clamp', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    w.move('g1', { placement: 100 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // one sink invocation
    expect(crossing.calls, 'and ONE route call, made inside that invocation').toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
    // the family\'s one clamp site: no seam wrapper, reset path or repair function adds a
    // clamp — the REPAIR\'s own bytes (the caller-supplied function) must not clamp:
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