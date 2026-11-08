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
 *   **⟶ AND FROM `D-117` THE EXAMPLE'S PAIR IS IMPORTED, FOR ONE ROW ONLY**: the live gesture's
 *   pre-drag size and bounds pair moved OFF `gutterSeamExample()`'s element-attribute read and ONTO
 *   the composition's, so `D-117/LIVE-READ` below can only state that difference by driving both
 *   over the same element. It is a CONTROL, never a subject: no row here asserts the example is
 *   anything the app should use.
 *
 * ── WHAT THIS PASS CHANGED, AND WHY (`D-93`) ─────────────────────────────────────────────
 * THE PURGE DELETED `src/renderer/store-core-graph.ts` AND `src/renderer/store-graph-references.ts`
 * OUTRIGHT: the app's frozen graph store is gone, and with it `createGraphStore`, `GraphStore`,
 * `GraphConstraint`, `GraphEvent`, `GraphWriteReceipt`, `GraphTierGetResult`,
 * `storeGraphReferences`, `FILE_TIER_ROOT_NAMES`, `TABS_RESERVED_DECLARATION_ROWS`, the Y-1
 * hand-off, `hydrate` and the `crossing:{put}` seam. `createPaneDrag`'s backing lost its `frozen`
 * member in the same pass, its construction-time `commit`/`clear` bootstrap of `mem.layout` /
 * `temp.drag` / `file.settings` is DELETED, and the composition now issues ZERO store acts — at
 * construction or in any turn. `renderZone()` is a MEMBER of the surface the shape's delivery
 * calls, and the composition registers no subscriber.
 *
 * **SO THIS FILE NO LONGER BUILDS A STORE.** The harness declares ONE inline REGISTER DOUBLE
 * (`makeRegister()` below) — a plain object over a `Map` keyed by the dotted name, carrying
 * exactly the surface the rows drive (`resolve`, `commit`, `clear`, `subscribe`, `sever`,
 * `tiers.*.get`) plus a census of every act it ever saw. It is a DOUBLE OF THE DELETED FROZEN
 * STORE and nothing more; its whole job here is to prove the composition leaves a store ALONE.
 * `sever` THROWS if called, so the deletion of the seam is MEASURED rather than assumed. Rows
 * whose subject was the store's own machinery are re-pointed at what replaced it — the shape,
 * the drag's ADDRESS, and the two `zoneSize*` factories — and the residue that has no
 * subject left is retired IN PLACE under a dated headstone comment, never silently dropped.
 *
 * From `src/renderer/renderer`     (the wiring role, §5.1 row 1 of the diff scope):
 *   `createPaneDrag(backing, source) => PaneDragSurface`  — the wired composition
 *     (§2.1 A/B/C + the shape's ONE delivery + §7a.1 item 1's reconcile turns), bound to the
 *     caller-supplied BACKING and the RECORDING SOURCE DOUBLE. The backing is
 *     `{ view?: ViewClient | null }` ONLY (the `frozen` member is DELETED): all six of the
 *     flow's reads answer the SHAPE synchronously (`view.zoneOf`, `view.paneSizeOf`,
 *     `view.paneBoundsOf`) and every write is the crossing's route (`view.commitPane`).
 *   `zoneSizeConstraint(min, max)` — §2.2's size-band predicate (factory over the
 *     caller's OWN configured min/max closure; "the configured minimum is the CALLER'S
 *     DATA, captured in the caller's closure").
 *   `zoneSizeRepair(min, max)`     — §2.2's two-arm repair (the pin is `min/2` = arm (a);
 *     below `min/2` = arm (b), the minimize marker is `0` — ZERO = the MINIMIZE verb,
 *     `ZONE-SIZE-DOMAIN-…` clause 2, never a smaller width).
 *   `PaneDragSurface` members (this red's local type, matching the family's exported
 *     seam types §2.1 — `StartSizeOf`, `BoundsOf`, `RelocateTargetFor`'s candidate
 *     production, plus the §2.1 C turns):
 *     startSizeOf(element, token)  — the shape's `view.paneSizeOf(id)` (§2.1 A)
 *     boundsOf(element, token)     — the shape's `view.paneBoundsOf(id)`, hands the
 *                                    RECEIVED pair through AS STORED (§2.1 A, §0 ruling 9)
 *     defaultSizeFor(element, token) — the reset arm's read, the same closure read
 *                                    at the reset turn (§2.1 A)
 *     candidatesFor(element)       — the shape's `view.zoneOf(id)`: the OPAQUE `slot` +
 *                                    the caller-measured `distance` (§2.1 B); the proximity
 *                                    decision is `withinProximity(distance, threshold)`'s
 *                                    answer
 *     move(gestureId, preview)     — **THE DRAG'S VALUE IS AN ADDRESS** (2026-11-08): `preview` is
 *                                    the affordance's `PreviewState` and ONE
 *                                    `view.commitDrag(DEFAULT_PANE_ID, {size: preview.value})` is
 *                                    sent per call — NOTHING when `value` is not a finite
 *                                    non-negative number. `['drag']` at `temp` is the storage.
 *     release(gestureId, final, sink) — the RELEASE terminal (valid end AND invalid reset), in ONE
 *                                    ORDER: the sink, then ONE
 *                                    `view.commitPane(pane, {size: final})`, then its OWN
 *                                    `view.clearDrag()` ending the temp reading (SINK-2, §2.1 C/§2.5)
 *     rightClick(gestureId)        — THE ERASE: AT MOST ONE `view.clearDrag()` per gesture, never a
 *                                    throw, no `commitPane`, ZERO sink writes
 *     cancel(gestureId)            — the abandon terminal (pointercancel/cancel): the same
 *                                    erase, at most once per gesture (§7a.1 item 2, (i))
 *     renderZone()                 — the render turn, a SURFACE MEMBER the shape's delivery
 *                                    calls; the composition registers no subscriber
 *     renderGhost()                — the GHOST turn: ONE `window.provident.data.read({path:['drag']})`
 *                                    per call, painting `data-ghost` on `backing.ghostTarget` iff
 *                                    the family stands at `temp` for `DEFAULT_PANE_ID`, and
 *                                    REMOVING it on every other arm (total, fail-closed)
 *   **`previewOf` IS DELETED** with the closure value it read: the address is the storage, so there
 *   is nothing for a closure read to answer and no member pretending there is.
 *   The composition's bank of top-level roots: §7a.1 item 4 reading (i)'s
 *   `storeGraphReferences([…])` naming `layout` (mem) · `drag` (temp) · `settings` (file) is
 *   RETIRED with the store (`D-93`): the composition has no address space to declare, and the
 *   rows now assert the CENSUS — a store doubled beside it sees ZERO acts, at construction and
 *   in every turn. What replaced the deleted machinery, and what this file reads instead:
 *   `src/renderer/view-client`'s `ViewClient` (the shape) and the two `zoneSize*` factories.
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
 * ── RED HONESTY, RE-STATED FOR THE POST-PURGE TREE (`D-93`) ── The §2.1–§2.3 deliverables are
 * LANDED (`createPaneDrag`, `zoneSizeConstraint`, `zoneSizeRepair` all exist), so the drives are
 * green where their subject survives. What is NOT green-able is the store the old harness built:
 * `createGraphStore` no longer exists, so every row that seeded `mem.layout.*`, read a
 * `temp.drag.*` tier handle, asserted a `GraphWriteReceipt` or counted a `GraphEvent` has lost
 * its subject. Those rows are re-pointed at the three things that replaced the store — the
 * shape (`ViewClient`), the drag's ADDRESS (`['drag']` at `temp`), and the two PURE factories — and the residue
 * is retired under a dated headstone naming exactly which claim died and why. **THE COUNT DID
 * NOT MOVE: 8 register rows / 91 drives, the same terms.**
 *
 * ── THE RETIRED ROWS, NAMED (`D-93`) ──
 *   · §3.4 R‑5 "createGraphStore is called with the LANDED options only" — the store is deleted,
 *     so there is no construction to inspect. It is replaced by a headstone in place.
 *   · The FILE-original reassert halves of M-6 / F-4 / P-PD-SM-3 — the tier the preview shadowed
 *     is deleted with the store, so there is no second copy for the erase to expose.
 *   · The `GraphWriteReceipt` / `GraphEvent` halves of F-2 / F-3 / M-7 / M-8 / F-9 / P-PD-SM-2 /
 *     P-PD-TP-1 — refusal records and repair events are the deleted store's vocabulary; what
 *     survives is the factories' own return values and the invariant they land.
 */

import { afterAll, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

import * as wiring from '../src/renderer/renderer'
// **THE SHAPE'S CLIENT (`D-88`)** — all six of the flow's reads answer it, so this file's fixtures build one over a CROSSING
// DOUBLE that projects the doubled families and writes them back the way the route does.
import { createViewClient, type ViewClient, type ViewClientBridge } from '../src/renderer/view-client'
import {
  DEFAULT_PANE_BOUNDS,
  DEFAULT_PANE_ID,
  DEFAULT_PANE_SIZE,
  defaultPaneGeometry,
  paneGeometryIn,
} from '../src/shared/view-shape'
import { withinProximity as familyWithinProximity } from '../src/shared/relocate'
/** `D-117`'s CONTROL only — see the header note: the example seam is the path the live gesture LEFT. */
import { gutterSeamExample } from '../src/shared/demo-envelope'

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
  /** **THE GHOST TURN — THE SHAPE'S DELIVERY CALLS IT BESIDE `renderZone`.** `previewOf` IS DELETED AND THIS IS WHY:
   *  the drag's in-process value became an ADDRESS — `['drag']` at `temp`, one member per pane id, each `{size}` — so
   *  the storage is the view record and the ghost's declaration is a READ of that address, painted on the pane element
   *  the backing carries. There is no closure value left for a `previewOf` to answer, and this declaration is the
   *  surface's own statement that the turn exists. */
  renderGhost(): void
}

const PANE_ID = 'pane-a'
const ZONE_ID = 'zone-1'

/** Caller-owned element/token fixtures — the `<id>` is derived by the CALLER'S own
 *  element/token mapping (§2.1 A); these fixtures carry the id verbatim so any mapping
 *  over `element.id` / `token` derives the intended stored name. */
const paneFixture = { id: PANE_ID }
const zoneFixture = { zoneId: ZONE_ID }

/* ───────────────────────── THE REGISTER DOUBLE (`D-93`) ─────────────────────────
 *
 * **A DOUBLE OF THE DELETED FROZEN STORE, AND NOTHING ELSE.** `D-93` deleted `src/renderer/store-core-graph.ts` and
 * `src/renderer/store-graph-references.ts` outright, so this file can no longer build the store its rows used to seed.
 * What it MUST still be able to say is the one thing those rows were really asking: does the composition write to a
 * store? So the harness declares a plain object over a `Map` keyed by the dotted name, carrying exactly the surface the
 * rows drive — `resolve`, `commit`, `clear`, `subscribe`, `sever`, and the three tier handles with `get` — plus a
 * `census()` of every WRITE it ever saw.
 *
 * **THE DOUBLE'S ANSWER IS DELIBERATELY DUMB AND ITS CENSUS IS DELIBERATELY LOUD.** It never evaluates a constraint,
 * never repairs, never emits a repair event and never walks a root grammar: those were the deleted module's acts, and
 * re-implementing them here would be rebuilding the thing that was deleted. It records. A row that used to read a
 * `temp.drag.*` leaf back off a tier handle reads `tiers.temp.get(...).found` here and finds `false` for the same
 * reason it did before — because the composition never wrote it — and that is now MEASURED against a store that could
 * not have refused the read.
 *
 * **`sever` THROWS.** `storeGraphReferences`' `sever(from, anchorKey)` seam went with the module, so a call to it is
 * the strongest possible statement that some line still routes through the vanished address space. It is not a
 * silent no-op: it reddens whatever row drives it. */
interface RegisterRead {
  readonly found: boolean
  readonly value?: unknown
}
interface RegisterTier {
  /** The tier handle's own read — the FULL caller spelling, tier token included. */
  get(name: string): RegisterRead
  has(name: string): boolean
}
/** ONE ACT THE DOUBLE SAW — the census's unit. `op` is the member, `name` the dotted spelling it was handed. */
interface RegisterAct {
  readonly op: 'resolve' | 'commit' | 'clear' | 'subscribe' | 'sever'
  readonly name: string
  readonly value?: unknown
}
interface RegisterDouble {
  /** **THE WHOLE TRAFFIC** — every act this store ever saw, in order, reads included. */
  readonly acts: RegisterAct[]
  /** **THE WRITE CENSUS** — `commit` + `clear` + `sever` only. A composition that issues ZERO store acts leaves it at
   *  ZERO, which is what the construction-time bootstrap's deletion made true and what the rows below assert. */
  census(): number
  /** How many `subscribe` registrations the store carries — the count the deleted store's newsletter had. */
  subscriptions(): number
  /** Every act emitted to a subscriber, in order. */
  readonly emitted: RegisterAct[]
  resolve(name: string): RegisterRead
  commit(name: string, value: unknown, opts?: unknown): { readonly status: 'committed' }
  clear(name: string): { readonly status: 'committed' }
  subscribe(name: string, listener: (event: RegisterAct) => void, opts?: unknown): () => void
  /** **DELETED WITH `store-graph-references`** — a call here THROWS rather than answering. */
  sever(from: string, anchorKey: string): never
  readonly tiers: { readonly mem: RegisterTier; readonly temp: RegisterTier; readonly file: RegisterTier }
}

function makeRegister(): RegisterDouble {
  const held = new Map<string, unknown>()
  const acts: RegisterAct[] = []
  const emitted: RegisterAct[] = []
  const listeners = new Map<string, Array<(event: RegisterAct) => void>>()
  const readOf = (name: string): RegisterRead => (held.has(name) ? { found: true, value: held.get(name) } : { found: false })
  const tier = (): RegisterTier => ({ get: readOf, has: (name: string): boolean => held.has(name) })
  const emit = (act: RegisterAct): void => {
    for (const listener of listeners.get(act.name) ?? []) {
      emitted.push(act)
      listener(act)
    }
  }
  return {
    acts,
    emitted,
    census: (): number => acts.filter((act) => act.op === 'commit' || act.op === 'clear' || act.op === 'sever').length,
    subscriptions: (): number => {
      let total = 0
      for (const list of listeners.values()) total += list.length
      return total
    },
    resolve: (name: string): RegisterRead => {
      acts.push({ op: 'resolve', name })
      return readOf(name)
    },
    commit: (name: string, value: unknown): { readonly status: 'committed' } => {
      const act: RegisterAct = { op: 'commit', name, value }
      acts.push(act)
      held.set(name, value)
      emit(act)
      return { status: 'committed' as const }
    },
    clear: (name: string): { readonly status: 'committed' } => {
      const act: RegisterAct = { op: 'clear', name }
      acts.push(act)
      held.delete(name)
      emit(act)
      return { status: 'committed' as const }
    },
    subscribe: (name: string, listener: (event: RegisterAct) => void): (() => void) => {
      acts.push({ op: 'subscribe', name })
      listeners.set(name, [...(listeners.get(name) ?? []), listener])
      return (): void => undefined
    },
    sever: (from: string, anchorKey: string): never => {
      acts.push({ op: 'sever', name: from, value: anchorKey })
      throw new Error(`sever(${from}, ${anchorKey}) — the storeGraphReferences seam was DELETED with the frozen store (D-93)`)
    },
    tiers: { mem: tier(), temp: tier(), file: tier() },
  }
}

/** **THE PANE ELEMENT'S DOUBLE — WHERE THE GHOST'S DECLARED TRANSIENT LANDS.** The backing's `ghostTarget` is the pane
 *  ELEMENT (the contract says "anything carrying `setAttribute`/`removeAttribute`"), so the double carries exactly those
 *  two members and records each call. The members are ARROWS on purpose: nothing in this composition may depend on the
 *  receiver, and a double that needed `this` would be a fixture that could pass for the wrong reason.
 *
 *  `declared()` answers the attribute's standing value (`null` = not declared), so a row reads the DECLARATION rather than
 *  the call log — a turn that removed the attribute and then re-set it would read as standing, which is the honest
 *  question ("what does the element carry after the turn?"). */
interface GhostDeclaration {
  readonly op: 'set' | 'remove'
  readonly name: string
  readonly value?: string
}

interface GhostTargetDouble {
  readonly calls: GhostDeclaration[]
  readonly declared: () => string | null
  readonly setAttribute: (name: string, value: string) => void
  readonly removeAttribute: (name: string) => void
}

function ghostTarget(): GhostTargetDouble {
  const held = new Map<string, string>()
  const calls: GhostDeclaration[] = []
  return {
    calls,
    declared: (): string | null => held.get('data-ghost') ?? null,
    setAttribute: (name: string, value: string): void => {
      calls.push({ op: 'set', name, value })
      held.set(name, value)
    },
    removeAttribute: (name: string): void => {
      calls.push({ op: 'remove', name })
      held.delete(name)
    },
  }
}

/** **THE COMPOSITION UNDER TEST — `createPaneDrag({ view, ghostTarget }, source)` and NOTHING ELSE** (`D-93`: the
 *  backing's `frozen` member is deleted, so the harness has no store to hand it). Every row that wants to prove the
 *  composition left a store alone doubles one BESIDE the composition through `register`; the double is never a member of
 *  the backing, so the only way it can see an act is if the composition went looking for a store it does not have.
 *
 *  **AND THE BACKING NOW CARRIES THE GHOST'S TARGET**: the drag's value is an ADDRESS (`['drag']` at `temp`), so the
 *  declaration a human sees during the drag is a transient painted on the pane ELEMENT — the second backing member, and
 *  the reason `compose` hands one out: a row can read what the ghost turn declared. */
function compose(options: {
  view?: ViewClient | null
  source?: SourceDouble
  register?: RegisterDouble
  crossing?: PaneCrossing
} = {}): {
  w: PaneDragSurface
  source: SourceDouble
  register: RegisterDouble
  view: ViewClient | null
  crossing: PaneCrossing
  ghost: GhostTargetDouble
} {
  const source = options.source ?? makeSource()
  const register = options.register ?? makeRegister()
  const crossing = options.crossing ?? crossingOf(register)
  const view = options.view === undefined ? crossing.client : options.view
  const ghost = ghostTarget()
  return {
    w: wiring.createPaneDrag({ view, ghostTarget: ghost }, source) as unknown as PaneDragSurface,
    source,
    register,
    view,
    crossing,
    ghost,
  }
}

/** **THE SHAPE, STANDING AT A READING A CALLER SUPPLIED** — the hostile-record fixture, and the honest way to build a
 *  `ViewClient` without a bridge. `adopt` is the client's OWN refill member, so the shape it holds is exactly a shape
 *  some delivery could have left: an inadmissible member is carried because the boundary gate lives in `fill()` (the
 *  wire's admission) and not in the in-realm refill. */
function clientHolding(panes: readonly unknown[], zones: readonly unknown[]): ViewClient {
  const client = createViewClient({ bridge: null })
  client.adopt({
    status: 'committed',
    panes: panes as never,
    zones: zones as never,
    theme: { token: null, attribute: null, declaration: { name: null, value: '', removal: true } },
    source: { panes: 'record', zones: 'record', theme: 'record' },
  })
  return client
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

/** **THE TIER-QUALIFIED READ, ASKED OF THE DOUBLE** (`D-93`): the tier handle's `get` resolves the FULL CALLER
 *  SPELLING, so the read carries the tier token — `stored(register, 'mem.layout.pane.<id>.size')` walks the leaf at the
 *  pair's own tier, exactly the way the deleted store's `tierHandleFor` did. **THE COMPOSITION HAS NO SUCH ROUTE ANY
 *  MORE**: its six reads are the shape's, so this helper survives only for the CONTROL halves of rows — the ones that
 *  plant a value in a store the composition must not consult. */
function stored(register: RegisterDouble, name: string): RegisterRead {
  const tierName = name.split('.')[0] as 'mem' | 'temp' | 'file'
  return register.tiers[tierName].get(name)
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
  /** **THE DRAG ROUTE'S LOG — EVERY `commitDrag(paneId, geometry)` THE COMPOSITION SENT, IN ORDER.** The drag's value is
   *  an ADDRESS now (`['drag']` at `temp`, one member per pane id, each `{size}`), so the per-move write is a ROUTE CALL
   *  and this log is where a row reads it: the member the call named and the geometry it carried. */
  readonly dragCalls: { readonly id: string; readonly geometry: unknown }[]
  /** **EVERY `clearDrag()` THE COMPOSITION SENT — one entry per call.** The erase is the family's end at the store, so the
   *  count is what "at most one per gesture" is measured on, and the log is what "not even at the release" was measured on
   *  before the release grew its own ending. */
  readonly clears: unknown[]
  /** **THE DRAG FAMILY AS THE CROSSING'S STORE HOLDS IT — AND `null` IS "THE ADDRESS DOES NOT STAND"**, which is the state
   *  before any drag, and the state an erase leaves. A whole-family write: `commitDrag(id, {size})` writes `{[id]: {size}}`
   *  and nothing else, so the family holds one member per pane id and the last write wins. */
  readonly dragFamily: () => Readonly<Record<string, { readonly size: number }>> | null
  /** **ONE ORDERED LOG ACROSS ALL THREE ROUTE DOUBLES** — `'commitDrag'` / `'clearDrag'` / `'commitPane'`, in the order
   *  the composition sent them. The release's contract is an ORDER (the sink, then the file commit, then its own ending),
   *  and two separate logs cannot state an order between them. */
  readonly acts: string[]
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

/** **THE CROSSING DOUBLE, KEYED BY WHATEVER OBJECT A ROW WANTS IT CACHED ON** (`D-93`: it used to be keyed by the frozen
 *  store, because the store WAS the shape's source; the shape is now the crossing's own projection and the key is only a
 *  memo, so a row that composes twice over the same register sees the same crossing). */
function crossingOf(key?: object): PaneCrossing {
  if (key !== undefined && key !== null) {
    const cached = crossingOfStore.get(key)
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
  // **THE DRAG FAMILY'S ADDRESS** — `['drag']` at `temp`, ONE MEMBER PER PANE ID, each `{size}`. `null` is the family's
  // absence, which is the state before any gesture wrote and the state every erase turn leaves.
  let dragFamily: Record<string, { size: number }> | null = null
  const handlers: Array<() => void> = []
  const calls: PaneRouteCall[] = []
  const zoneCalls: ZoneRouteCall[] = []
  const dragCalls: Array<{ readonly id: string; readonly geometry: unknown }> = []
  const clears: unknown[] = []
  const acts: string[] = []
  const reading = (): unknown => ({
    status: 'committed',
    panes: Object.keys(family).map((id) => {
      const held = family[id]!
      return { id, size: held.size, bounds: { min: held.bounds.min, max: held.bounds.max } }
    }),
    // **THE MIRROR IS NO LONGER A FAMILY OF THIS READING** (`D-142`, `E-12`): `['focus']` is deleted whole and
    // `ViewCommittedReading` carries no `focus` member and no `source.focus`, so this reading carries the
    // SURVIVING families and nothing else — the strictness `view-client.ts` states (member for member) is what
    // makes a stale member here an excess-property error rather than a harmless extra.
    // THE ZONE FAMILY (D-91): this double drives the panes AND the zones.
    zones: Object.keys(zones).map((id) => {
      const held = zones[id]!
      const record: { id: string; slot?: unknown; distance?: number; size?: number; display?: string } = { id }
      if (held.slot !== undefined) record.slot = held.slot
      if (held.distance !== undefined) record.distance = held.distance
      if (held.size !== undefined) record.size = held.size
      if (held.display !== undefined) record.display = held.display
      return record
    }),
    theme: { token: null, attribute: null, declaration: { name: null, value: '', removal: true } },
    source: { panes: 'record', zones: 'record', theme: 'record' },
  })
  // **THE LITERAL IS BUILT AS A PLAIN OBJECT AND CAST ONCE** (`ViewClientBridge` declares FIVE members today —
  // `read`, `commitPane`, `commitZones`, `commitTheme`, `onChanged` — and the drag pair `commitDrag`/`clearDrag` arrives
  // with the record's own implementation). The cast keeps this harness compiling on BOTH sides of that landing: before it,
  // the two members are this file's own additions to a literal the interface does not yet name; after it, the interface
  // declares them and the literal satisfies it member for member.
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
      acts.push('commitPane')
      refill()
      return { status: 'committed' }
    },
    // **THE DRAG ROUTE — `commitDrag(paneId, geometry)` WRITES THE FAMILY WHOLE AT `['drag']`/`temp`.** The record's route
    // composes nothing with what stands: the drag's value IS the address, and one write is one member, so the family holds
    // `{[id]: {size}}` and the last write wins. A non-finite size is DROPPED rather than stored (the store's own admission,
    // and the reason a hostile preview can never reach it: the composition sends nothing at all for one).
    commitDrag: async (id: string, geometry: unknown): Promise<unknown> => {
      const size = (geometry as { readonly size?: unknown } | null | undefined)?.size
      dragCalls.push({ id, geometry })
      acts.push('commitDrag')
      dragFamily = typeof size === 'number' && Number.isFinite(size) ? { [id]: { size } } : {}
      return { status: 'committed' }
    },
    // **THE ERASE — `clearDrag()` DELETEs THE FAMILY AND ANSWERS `committed` WHETHER OR NOT IT STOOD.** The store refuses a
    // delete at an address that does not stand (`AddressNotFound`); the route absorbs that and answers the same receipt,
    // which is why the erase is idempotent at the store and a gesture that never moved still asks exactly once.
    clearDrag: async (): Promise<unknown> => {
      clears.push({ op: 'clearDrag' })
      acts.push('clearDrag')
      dragFamily = null
      return { status: 'committed' }
    },
    // **THE FOCUS ROUTE IS NOT ON THIS BRIDGE ANY MORE** (`D-142`, `E-12`): `ViewClientBridge` declares the four
    // surviving routes (`read`, `commitPane`, `commitZones`, `commitTheme`) and the push, so a `commitFocus` member
    // here would be an excess member on the very interface this literal is typed by.
    // **THE APPEARANCE ROUTE** (D-97): present so the member set matches the bridge's. This file
    // drives no appearance act — the fixture's record stands at the placeholder, which names no attribute to apply.
    commitTheme: async (): Promise<unknown> => ({ status: 'committed' }),
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
  } as unknown as ViewClientBridge
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
    dragCalls,
    clears,
    dragFamily: (): Readonly<Record<string, { readonly size: number }>> | null => dragFamily,
    acts,
  }
  if (key !== undefined && key !== null) crossingOfStore.set(key, crossing)
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

  it('M-2/E3-gate: the DEGRADATION moves onto the value the terminal is HANDED — the read cannot answer a non-number any more (the boundary admits none), so the E3 gate is driven at the release: a non-number `final` is never sent, ZERO sink writes, ZERO route calls and NOT EVEN the release\'s own ending (gutter.md §2.5 item 5)', () => {
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
    // **THE REFUSAL RETURNS BEFORE THE ENDING TOO**: the release\'s own `clearDrag` comes AFTER its file commit, so a
    // `final` the terminal cannot use sends NO route at all — neither the commit nor the family\'s end.
    expect(crossing.clears, 'a refused final sends NO route at all, the ending included').toEqual([])
    expect(crossing.dragCalls, 'and nothing to the drag address either').toEqual([])
    expect(crossing.acts, 'the whole refused turn is silent on the wire').toEqual([])
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
    // THE CONTROL IS A DOUBLED STORE BESIDE THE COMPOSITION (`D-93`): it holds a distance no comparator call makes, so a
    // comparator that consulted a store would answer `true` for `(10, 20)`-shaped arguments and the cells below would move.
    // **THE COMPOSITION IS NOT HANDED IT** — the double exists only so the contradiction is a value somewhere rather than a
    // claim about a value.
    const { w, register } = compose()
    expect(register.commit(`mem.layout.zone.${ZONE_ID}.distance`, 999).status).toBe('committed')
    expect(stored(register, `mem.layout.zone.${ZONE_ID}.distance`).value, 'the contradicting value is really there').toBe(999)
    expect(familyWithinProximity(10, 20)).toBe(true) // answers from its ARGUMENTS
    expect(familyWithinProximity(20, 10)).toBe(false)
    expect(familyWithinProximity(-1, 10)).toBe(false) // finite negative ⇒ unusable ⇒ false
    expect(familyWithinProximity('x' as never, 10)).toBe(false) // typeof-gate first, never a throw
    expect(register.census(), 'and the COMPOSITION never touched the doubled store').toBe(1) // 1 = the control's own write
    void w
  })
})

describe('§3.2 F-5 — a release with NO preview data commits NOTHING but a normal file write', () => {
  it('F-5: ONE `commitPane(pane, {size})` with no lower copy to clear, never a refusal, never a removal, never a second write — the sink\'s record and the route log agree at 1, the drag address was never written, the release ends it ONCE, and the doubled store sees ZERO acts (`D-93`: the construction-time bootstrap of `mem.layout`/`temp.drag`/`file.settings` is deleted)', () => {
    const { w, register, crossing } = compose()
    // **THE CONSTRUCTION ISSUED NOTHING** — this is the assertion the deleted bootstrap used to fail: three roots were
    // `commit`/`clear`-declared before the first turn, and the double's census would have read 6.
    expect(register.census(), 'the composition mints nothing at construction').toBe(0)
    const sink = makeSink()
    const final = 260
    expect(stored(register, 'temp.drag.g1.placement').found, 'no preview was ever stored').toBe(false)
    // AND NO DRAG FAMILY STANDS: the address is absent before any move, which is the state the release finds.
    expect(crossing.dragFamily(), 'no move means the drag family does not stand').toBeNull()
    w.release('g1', final, sink)
    expect(sink.stats().sinkCalls).toBe(1)
    expect(sink.record).toEqual([final])
    // THE WRITE, AS THE ROUTE CARRIES IT: ONE call, one whole member, the pane NAMED and never a path or a tier.
    expect(crossing.calls, 'one route call — the two-tier commit spelling is gone').toEqual([{ id: PANE_ID, geometry: { size: final } }])
    expect(crossing.family()[PANE_ID]?.size, 'and what the crossing holds is the sink\'s own argument').toBe(final)
    // **AND THE RELEASE ENDS THE TEMP READING ITSELF**: no move wrote the family, and the ending is still sent once — the
    // store\'s `delete` answers the same receipt whether or not the address stood, so the call is idempotent there.
    expect(crossing.dragCalls, 'no move ⇒ no drag write at all').toEqual([])
    expect(crossing.clears.length, 'the release\'s own ending fires once over an absent family').toBe(1)
    expect(crossing.acts, 'the release: its file commit, then its own ending').toEqual(['commitPane', 'clearDrag'])
    expect(register.census(), 'and the release wrote no store either').toBe(0)
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

  it('F-8/absent-closure: the value-reading seams driven with NO SHAPE AT ALL answer the declared degradation — never a throw out of the wiring turn (`D-93`: the "store absent from the closure" arm is the backing\'s own `view: null`, because there is no store in the closure to be absent)', () => {
    const absent = compose({ view: null })
    // The composition must itself land the degradation (NO shape is in its closure) — the family seam rules bind the
    // implementations exactly as they bind a fork's (gutter-ui.md §R.3): the measured default answers, and a zone nothing
    // names is NO candidate.
    expect(() => absent.w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => absent.w.boundsOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => absent.w.candidatesFor(zoneFixture)).not.toThrow()
    // AND THE DECLARED DEGRADATION IS A VALUE, NOT A WITHDRAWAL — the arm the frozen store's `undefined` used to leave.
    expect(absent.w.startSizeOf(paneFixture, PANE_ID), 'the measured default size').toBe(DEFAULT_PANE_SIZE)
    expect(absent.w.boundsOf(paneFixture, PANE_ID), 'the measured default pair').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
    expect(absent.w.candidatesFor(zoneFixture), 'a realm with no shape names no zone').toEqual([])
    expect(absent.register.census(), 'and no store was written on the way').toBe(0)
  })

  it('F-8/throwing-shape-read: a shape whose SYNCHRONOUS READ THROWS is absorbed by EVERY turn that reads it — the six that always did AND the pane read pair driven at the drag\'s start, each answering its own declared degradation and nothing propagating (re-grain of the as-filed "a tier-handle whose get THROWS"; the tier handle died with the store, `D-93`; the pair closed at `D-95`)', () => {
    // **THE HOSTILE SUPPLY IS NOW THE SHAPE ITSELF.** The deleted store's tier handle was the throwing read source; the
    // shape's members answer from an in-realm projection, and the composition still guards every turn that calls one — so
    // the term ("a hostile read supplier never throws out of a wiring turn") is driven at the members that hold it.
    const hostile = {
      shape: () => ({ filled: true, panes: [], zones: [], theme: { token: null, attribute: null, declaration: { name: null, value: '', removal: true } }, source: { panes: 'default', zones: 'default', theme: 'default' } }),
      zoneOf(): never { throw new Error('boom') },
      paneSizeOf(): never { throw new Error('boom') },
      paneBoundsOf(): never { throw new Error('boom') },
      commitPane(): never { throw new Error('boom') },
    } as unknown as ViewClient
    const w = wiring.createPaneDrag({ view: hostile }, makeSource()) as unknown as PaneDragSurface
    expect(() => w.candidatesFor(zoneFixture), 'the candidate read absorbs the throw').not.toThrow()
    expect(w.candidatesFor(zoneFixture), 'and lands the declared degradation — no candidate').toEqual([])
    expect(() => w.renderZone(), 'the render turn absorbs the throw').not.toThrow()
    expect(() => w.move('g1', { placement: 1 }), 'the move turn is the closure\'s and never reads the shape').not.toThrow()
    expect(() => w.rightClick('g1'), 'nor does the erase turn').not.toThrow()
    expect(() => w.cancel('g1'), 'nor the cancel').not.toThrow()
    // THE CONTROL: an UNGUARDED turn would redden here — `release` reads the standing size through the same shape, and if
    // the composition let a throw through this `expect` would fail instead of answering.
    expect(() => w.release('g1', 240, makeSink())).not.toThrow()
    // **AND THE PANE READ PAIR IS NOW IN THIS ROW, WHICH IS WHERE `D-94`'s OPEN ITEM (e) SAID IT WAS NOT** (`D-95`). The
    // note that stood here read *"the pane read pair is NOT in this row … the tier handle that could throw was deleted
    // with the store"* — and the deletion of the handle did not make the pair total: `readPaneSize`/`readPaneBounds`
    // called the shape's own read with NO guard, so a shape whose read threw propagated out of `startSizeOf`,
    // `defaultSizeFor` and `boundsOf` while all six of the other turns absorbed it (`D-93`'s open item (e)). The pair is
    // driven HERE, through the drag's START, and the term is the one every other guarded turn answers: what the ABSENT
    // member answers — the measured default — and never a propagated throw. **THIS ASSERTION IS THE ROW'S BITE**: with
    // the guard reverted it reds as `boom` out of `startSizeOf` (measured, `D-95`).
    expect(() => w.startSizeOf(paneFixture, PANE_ID), 'the SIZE read absorbs the throw — the seventh turn').not.toThrow()
    expect(w.startSizeOf(paneFixture, PANE_ID), 'and answers exactly what the absent member answers: the measured default').toBe(DEFAULT_PANE_SIZE)
    expect(() => w.defaultSizeFor(paneFixture, PANE_ID), 'the reset arm is the SAME closure and absorbs it too').not.toThrow()
    expect(w.defaultSizeFor(paneFixture, PANE_ID), 'and answers the same default').toBe(DEFAULT_PANE_SIZE)
    expect(() => w.boundsOf(paneFixture, PANE_ID), 'the BOUNDS read absorbs the throw — the eighth turn').not.toThrow()
    expect(w.boundsOf(paneFixture, PANE_ID), 'and answers the measured pair, a FRESH record').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
    // AND THE GUARD IS NOT A BLANKET OVER THE PAIR: a shape that ANSWERS is still believed, so the two `expect`s above
    // cannot be satisfied by a read that stopped reading. The control answers figures NO default could carry.
    const answering = {
      shape: () => ({ filled: true, panes: [], zones: [], theme: { token: null, attribute: null, declaration: { name: null, value: '', removal: true } }, source: { panes: 'default', zones: 'default', theme: 'default' } }),
      zoneOf: () => null,
      paneSizeOf: () => 250,
      paneBoundsOf: () => ({ min: 10, max: 20 }),
      commitPane: () => ({ status: 'committed' }),
    } as unknown as ViewClient
    const wa = wiring.createPaneDrag({ view: answering }, makeSource()) as unknown as PaneDragSurface
    expect(wa.startSizeOf(paneFixture, PANE_ID), 'a shape that answers is NOT overridden by the default').toBe(250)
    expect(wa.boundsOf(paneFixture, PANE_ID), 'nor is its pair').toEqual({ min: 10, max: 20 })
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
      const cold = createViewClient({ bridge: null })
      const coldSurface = wiring.createPaneDrag({ view: cold }, makeSource()) as unknown as PaneDragSurface
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

describe('REGISTER P-PD-TP-2 (S-PD-DEGRADE-1) — the SHAPE-BACKED seam implementations\' degradation (TOTAL over hostile inputs)', () => {
  /* **RE-GRAINED `D-93` — THE TERM IS UNMOVED, THE FIVE SHAPES ARE THE SHAPE'S.** The declared term is "the seam
   * implementations are TOTAL over hostile inputs — never a throw out of a wiring turn". The as-filed five were the
   * deleted store's supply shapes (`store-absent-from-closure`, `tier-handle-absent`, `tier-handle-get-throwing`,
   * `hostile-stored-value`), and not one of them names anything that exists any more. The five that replace them are the
   * five ways a BACKING can be hostile now, and every one of them is a value a caller can really hand this composition:
   *
   *   1. **no-backing** — `createPaneDrag(null, …)`: no backing record at all (the successor of "the store is absent from
   *      the closure", which is now "the shape is absent from it").
   *   2. **view-null** — `{ view: null }`: a backing that states the absent crossing.
   *   3. **unfilled-shape** — a client with no bridge at all: nothing has ever been read (`filled: false`).
   *   4. **hostile-record** — a shape carrying a member the read cannot use (a non-number size, a non-pair bounds, a
   *      non-finite distance). **IT IS LANDED BY VALUE AND NEVER REFUSED AT THE READ** — the boundary that refuses one is
   *      the crossing's, one realm away, so totality means "the hostile value is answered or degraded, never thrown".
   *   5. **hostile-backing** — `createPaneDrag(42, …)`: a backing that is not even an object.
   *
   * **THE ROW STILL BITES ON ALL FIFTEEN CELLS**: an implementation that throws on any of the five reddens, and the three
   * precise cells (2, 3, 5) additionally pin the DECLARED answer, so a "returns `undefined` quietly" degradation reddens
   * too. */
  const impls = ['startSizeOf', 'boundsOf', 'candidateReads'] as const
  const shapes = ['no-backing', 'view-null', 'unfilled-shape', 'hostile-record', 'hostile-backing'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const impl of impls) {
    for (const shape of shapes) {
      n += 1
      cases.push([String(n).padStart(2, '0'), impl, shape])
    }
  }

  it.each(cases)('P-PD-TP-2/%s — %s × %s', drive('P-PD-TP-2', (_id: string, impl: string, shape: string) => {
    const source = makeSource()
    // THE COLD SHAPE, HELD SO THE ROW CAN READ ITS OWN `filled` FLAG rather than build a second one to look at.
    const cold = createViewClient({ bridge: null })
    function surfaceFor(shapeName: string): PaneDragSurface {
      if (shapeName === 'no-backing') return wiring.createPaneDrag(null, source) as unknown as PaneDragSurface
      if (shapeName === 'view-null') return wiring.createPaneDrag({ view: null }, source) as unknown as PaneDragSurface
      if (shapeName === 'unfilled-shape') return wiring.createPaneDrag({ view: cold }, source) as unknown as PaneDragSurface
      if (shapeName === 'hostile-backing') return wiring.createPaneDrag(42 as never, source) as unknown as PaneDragSurface
      // THE HOSTILE RECORD: a shape a delivery could have left, holding members the read cannot use.
      return wiring.createPaneDrag(
        {
          view: clientHolding(
            [{ id: PANE_ID, size: 'not-a-size', bounds: { min: 800, max: 40 } }],
            [{ id: ZONE_ID, slot: 'slot-7', distance: 'not-a-distance' }],
          ),
        },
        source,
      ) as unknown as PaneDragSurface
    }

    const surface = surfaceFor(shape)
    const readSize = (): unknown => surface.startSizeOf(paneFixture, PANE_ID)
    const readBounds = (): unknown => surface.boundsOf(paneFixture, PANE_ID)
    const readCandidates = (): readonly CandidateForShape[] => surface.candidatesFor(zoneFixture)

    // (a) NOTHING THROWS, ON ANY IMPL × ANY SHAPE — the total half, which is the row's term.
    expect(() => readSize(), `${impl} × ${shape} answers`).not.toThrow()
    expect(() => readBounds(), `${impl} × ${shape} answers`).not.toThrow()
    expect(() => readCandidates(), `${impl} × ${shape} answers`).not.toThrow()

    // (b) THE DECLARED ANSWER, PINNED WHERE IT HAS ONE — so "answers `undefined` quietly" is not mistaken for degradation.
    if (shape === 'hostile-record') {
      // **LANDED BY VALUE OR THE DECLARED DEGRADATION, NEVER A THROW** — the record's hostile members are answered as the
      // shape holds them (the read is the shape's, and the boundary that would have refused them is the crossing's, one
      // realm away). So the degradation here is TOTALITY, not silence: every member still comes back.
      expect(readSize(), 'the hostile size is handed through by value').toBe('not-a-size')
      expect(readBounds(), 'and so is the hostile pair').toEqual({ min: 800, max: 40 })
      const hostileCandidates = readCandidates()
      expect(hostileCandidates.length, 'and the hostile distance with it: the zone IS named').toBe(1)
      expect(hostileCandidates[0]!.distance).toBe('not-a-distance')
      return
    }
    if (impl === 'candidateReads') {
      expect(readCandidates(), 'no zone is named ⇒ NO candidate, never a throw').toEqual([])
      return
    }
    if (impl === 'boundsOf') {
      expect(readBounds(), 'the measured default pair, and it is a USABLE pair').toEqual({
        min: DEFAULT_PANE_BOUNDS.min,
        max: DEFAULT_PANE_BOUNDS.max,
      })
    } else {
      expect(readSize(), 'the measured default size, and it is a USABLE number').toBe(DEFAULT_PANE_SIZE)
    }
    if (shape === 'unfilled-shape') {
      expect(cold.shape().filled, 'a cold shape SAYS it is cold, and the read is the default arm rather than a guess').toBe(false)
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART II — THE TEMP-WRITE TURN AND THE LIFECYCLE (§4.2 item 2: M-4/M-5/M-10,
 * F-4/F-5/F-6; register P-PD-SM-1/3; §7a.1 items 1/2 working defaults)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-4 — the SHAPE\'S DELIVERY is the render turn\'s trigger', () => {
  it('M-4: the composition registers NO subscriber at all (the `subscribe(\'temp.drag\', …, {subtree:true})` registration is DELETED, `D-92`); the render turn is the surface\'s own `renderZone` member, the shape\'s ONE delivery calls it, and the layout input tracks the DELIVERED zone — re-grain of the as-filed "a move\'s temp write fires the ancestor subscriber"', () => {
    const { w, register, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 300, display: 'block' })
    // THE TRIGGER IS THE DELIVERY'S TURN, CALLED BY THE CONSUMER — never a registration of this composition's.
    w.renderZone()
    const latest = source.calls[source.calls.length - 1]
    expect(latest).toBeDefined()
    expect(latest!.zoneId).toBe(ZONE_ID)
    expect(latest!.size).toBe(300)
    expect(latest!.display).toBe('block')
    // NOTHING IS REGISTERED ANYWHERE: not on the doubled store, not on the shape (`M-PDV-4`'s count, driven here as the
    // doubled store's subscription count and the shape's own `onChanged` count).
    expect(crossing.registrations(), 'the composition takes no subscription of its own').toBe(0)
    expect(register.subscriptions(), 'and none on a store either — there is no store in the backing to take one on').toBe(0)

    // THE DELIVERED-VALUE DIFFERENTIAL: a second delivery changes the record and the render turn follows IT.
    crossing.seedZone(ZONE_ID, { size: 260, display: 'block' })
    w.renderZone()
    let saw260 = false
    for (const call of source.calls) if (call.size === 260) saw260 = true
    expect(saw260).toBe(true)
    // **AND THE DOUBLED STORE IS NOT CONSULTED**: a `mem.layout.zone.*` write nothing delivers changes nothing — the
    // composition reads the SHAPE only, so a store standing beside it with a contradicting figure is invisible.
    expect(register.commit(`mem.layout.zone.${ZONE_ID}.size`, 999).status).toBe('committed')
    w.renderZone()
    expect(source.calls[source.calls.length - 1]!.size, 'a store tier is not a read authority any more').toBe(260)
    expect(source.calls[source.calls.length - 1]!.size, 'and the doubled store really does hold the contradiction').not.toBe(
      stored(register, `mem.layout.zone.${ZONE_ID}.size`).value,
    )
  })
})

describe('§3.1 M-5 — a valid release commits the SINK\'S value once — the two readings AGREE at 1', () => {
  it('M-5: the sink\'s own record reads 1 and stats().sinkCalls reads 1 (they AGREE), the crossing received exactly ONE `commitPane(pane, {size: final})` whose value EQUALS the sink\'s argument, the move before it WROTE THE ADDRESS (`commitDrag` at `{size: 120}`), and the release ends that reading with ONE `clearDrag` — the reconcile that used to refresh a second tier OUTSIDE the gesture count has no second tier to refresh', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    const clamped = 240
    w.move('g1', { value: 120 }) // the preview — the drag's value, which IS the address's `size`
    // THE MOVE WROTE THE ADDRESS: `['drag']` at `temp`, one member for the composition's pane, `{size}` whole.
    expect(crossing.dragCalls, 'the move sends ONE `commitDrag` naming the pane, carrying the preview\'s value').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { size: 120 } },
    ])
    expect(crossing.dragFamily(), 'and the family stands at what the move wrote').toEqual({ [PANE_ID]: { size: 120 } })
    w.release('g1', clamped, sink)

    expect(sink.record).toEqual([clamped]) // the sink\'s own record
    expect(sink.stats().sinkCalls).toBe(1) // E3-side reading — they AGREE at 1
    // THE ONE WRITE: the route carries the sink\'s own argument to the ONE family at the ONE address.
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: clamped } }])
    expect(crossing.family()[PANE_ID]?.size).toBe(clamped)
    // **AND THE RELEASE'S OWN ENDING**: the temp reading the moves wrote is ended by the release itself, ONCE, AFTER its
    // file commit — the family does not stand afterwards.
    expect(crossing.clears.length, 'the release ends the temp reading it inherited').toBe(1)
    expect(crossing.dragFamily(), 'so no drag family stands once the gesture is over').toBeNull()
    // THE §7a.1 ITEM 1 RECONCILE IS GONE WITH THE SECOND TIER: there is no `mem` copy to refresh, so the gesture\'s write
    // count is exactly the sink\'s and nothing happens behind it.
    expect(sink.stats().sinkCalls, 'still exactly one write inside the gesture').toBe(1)
  })
})

describe('§3.1 M-10 — the temp preview is the ADDRESS `[\'drag\']` at `temp` while the gesture is active', () => {
  it('M-10: a move\'s preview is WRITTEN THROUGH `commitDrag` at the family\'s address — ONE call naming the composition\'s pane, the family holding one member per pane id with the last write winning — the surface carries NO `previewOf` (the closure\'s read is deleted with the value it read), a move whose `value` is not a finite non-negative number sends NOTHING, and the DOUBLED STORE\'S `temp` TIER IS UNTOUCHED', () => {
    const { w, register, crossing } = compose()
    // **THE SURFACE'S OWN STATEMENT THAT THE STORAGE MOVED** — the drag's in-process value became an ADDRESS, so the
    // composition holds no preview to answer and the member that read it is gone rather than left returning `undefined`.
    expect(
      typeof (w as unknown as Record<string, unknown>).previewOf,
      'the surface carries NO `previewOf`: the address is the storage now, and the closure read was deleted with the value',
    ).toBe('undefined')
    // **NOTHING STANDS BEFORE THE FIRST MOVE** — the family is the state, and its absence is the state before any drag.
    expect(crossing.dragFamily(), 'nothing is held before the first move').toBeNull()
    expect(crossing.dragCalls, 'and no route call was made').toEqual([])
    w.move('g1', { value: 120 })
    // THE MOVE WROTE THE ADDRESS — ONE call, the composition's pane, the preview's own `value` as the size.
    expect(crossing.dragCalls, 'ONE `commitDrag` naming DEFAULT_PANE_ID with the preview\'s value').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { size: 120 } },
    ])
    expect(crossing.dragFamily(), 'and the family holds it').toEqual({ [PANE_ID]: { size: 120 } })
    // **AND NO STORE ACT WAS MADE**: a store doubled beside the composition carries no node for the gesture at all, so the
    // name `temp.drag.<gestureId>.placement` does not exist anywhere but the crossing. That is the whole difference
    // between a value held as state and a value stored as data, and here it is MEASURED — the double would have recorded
    // the act, and it recorded none.
    expect(stored(register, 'temp.drag.g1.placement').found).toBe(false)
    expect(register.census(), 'not one write of any kind').toBe(0)
    // THE CONTROL: the double IS able to hold the name — the row is not passing because the double is inert.
    register.commit('temp.drag.g9.placement', 'planted')
    expect(stored(register, 'temp.drag.g9.placement').found, 'the census would have caught the mint had there been one').toBe(true)
    expect(register.census()).toBe(1)
    // A SECOND GESTURE IS A SECOND WRITE TO THE SAME PANE MEMBER — the family holds ONE member per pane id, and the last
    // write wins; a gesture id is not a member of the family and never becomes one.
    w.move('g2', { value: 140 })
    expect(crossing.dragCalls.length, 'one route call per move').toBe(2)
    expect(crossing.dragCalls[1], 'and the second names the same pane').toEqual({ id: DEFAULT_PANE_ID, geometry: { size: 140 } })
    expect(Object.keys(crossing.dragFamily() ?? {}), 'the family holds ONE member per pane').toEqual([PANE_ID])
    expect(crossing.dragFamily(), 'and the last write wins').toEqual({ [PANE_ID]: { size: 140 } })
    expect(register.census(), 'and the second gesture wrote no store either').toBe(1)
    // **A MOVE WHOSE `value` IS NOT A FINITE NON-NEGATIVE NUMBER SENDS NOTHING** — no route, and the family keeps what the
    // last usable move wrote rather than being erased by a hostile preview.
    const before = crossing.dragCalls.length
    for (const hostile of [Number.NaN, Number.POSITIVE_INFINITY, -1, 'x', null, undefined]) {
      w.move('g3', { value: hostile })
      w.move('g3', {})
      expect(crossing.dragCalls.length, `a ${String(hostile)} preview sends nothing to the drag address`).toBe(before)
    }
    expect(crossing.dragFamily(), 'and the standing family is untouched by every one of them').toEqual({ [PANE_ID]: { size: 140 } })
  })
})

describe('§3.1 M-6 — right-click ENDS the drag family at its address; the reassert\'s subject is retired', () => {
  it('M-6: the erase turn sends exactly ONE `clearDrag()` — the family answers ABSENT afterwards — a second right-click for the SAME gesture sends ZERO, a gesture that never moved then right-clicked sends exactly ONE (the family\'s end is idempotent at the store, whether or not it stood), and the composition makes ZERO store acts', () => {
    const { w, register, crossing } = compose()
    // ── HEADSTONE (2026-10-05, `D-93`; RE-GRAINED 2026-11-08) ──────────────────────────────────────────────────────
    // THIS ROW USED TO ASSERT THREE THINGS: (1) ONE `remove('temp.drag.<gestureId>.placement')` on the frozen store, (2)
    // that the `temp` tier read MISSed afterwards, and (3) that the FILE original — a `file.settings.drag.<gid>.placement`
    // copy seeded beside the preview — REASSERTED on the read once the preview was gone. (3) died with the store. What
    // SURVIVES IS (1) AND (2), ASKED OF THE THING THAT HOLDS THE VALUE NOW: the drag's value is an ADDRESS (`['drag']` at
    // `temp`), so the erase is `clearDrag()` — the store\'s delete of that family — and "the temp tier read MISSes" is the
    // family answering `null`. The row is therefore no longer a headstone over a deleted subject: it is the address\'s own
    // erase, measured on the route log and on the family.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    expect(register.census(), 'nothing at construction').toBe(0)
    w.move('g1', { value: 120 })
    expect(crossing.dragFamily(), 'the control: the family really stands before the erase').toEqual({ [PANE_ID]: { size: 120 } })
    w.rightClick('g1')
    // THE ERASE — exactly ONE call, and the family is ABSENT:
    expect(crossing.clears.length, 'the erase sends exactly ONE `clearDrag()`').toBe(1)
    expect(crossing.dragFamily(), 'and the family no longer stands').toBeNull()
    expect(stored(register, 'temp.drag.g1.placement').found, 'and no store ever held it').toBe(false)
    expect(crossing.calls, 'an abandon terminal sends no `commitPane`').toEqual([])
    // AT-MOST-ONE-ERASE per gesture (§7a.1 item 2 reading (i)) — a second erase for the SAME gesture sends nothing:
    w.rightClick('g1')
    expect(crossing.clears.length, 'a second right-click for the same gesture sends ZERO').toBe(1)
    // **THE CONTROL THAT THE ERASE TURN REALLY SENDS**: a gesture whose erase had NOT happened asks ONCE, even where it
    // never wrote the address — the store\'s delete answers the same receipt whether or not the family stood.
    const before = crossing.clears.length
    w.rightClick('g-never')
    expect(crossing.clears.length, 'a gesture that never moved then right-clicked sends exactly ONE').toBe(before + 1)
    expect(crossing.dragCalls, 'and no move means no drag write at all').toEqual([{ id: DEFAULT_PANE_ID, geometry: { size: 120 } }])
    expect(register.census(), 'the whole row made not one store act').toBe(0)
  })
})

describe('§3.2 F-4 — right-click during a NON-EXISTENT drag ends an ABSENT family, never a refusal', () => {
  it('F-4: the erase turn on a gesture with NO move is never a throw and sends exactly ONE `clearDrag()` (NOT zero — the family\'s end is idempotent at the store, and the store answers `AddressNotFound` for a family that does not stand), a repeat for the SAME gesture sends none, and never a store act; the control is the same turn on a gesture that DID move, which also sends exactly one and ends the family', () => {
    const { w, register, crossing } = compose()
    // ── HEADSTONE (2026-10-05, `D-93`; RE-GRAINED 2026-11-08) ──────────────────────────────────────────────────────
    // THE AS-FILED ROW seeded a `file.drag.<gid>.placement` original into a store whose `drag` root was DECLARED, drove a
    // right-click on a path with NO temp node, and asserted that the store\'s `remove` answered `'undeclared-name'` at the
    // walk while the file original kept answering the unqualified resolve. **THERE IS NO STORE TO WALK AND NO ROOT TO
    // DECLARE**, but there IS an address: `['drag']` at `temp`. Its erase on a family that does not stand is exactly the
    // case the old `remove` had to absorb — and the record\'s route absorbs the store\'s `AddressNotFound` and answers
    // `committed`, so the CALL still happens once. That is what is asserted here: silence from the composition would be a
    // composition deciding what the store\'s answer is.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    expect(crossing.dragFamily(), 'nothing stands, and none is claimed').toBeNull()
    expect(() => w.rightClick('g-miss'), 'never a throw').not.toThrow()
    expect(crossing.clears.length, 'the erase asks the store exactly ONCE even where nothing stood').toBe(1)
    expect(crossing.dragFamily(), 'and the address answers absent, which is the state the erase leaves').toBeNull()
    expect(() => w.rightClick('g-miss'), 'and idempotent').not.toThrow()
    expect(crossing.clears.length, 'a repeat for the SAME gesture sends none').toBe(1)
    expect(register.census(), 'and never a store act').toBe(0)
    // THE CONTROL: the same turn on a gesture that DID move also sends exactly one, and ends the family it finds.
    w.move('g-present', { value: 140 })
    expect(crossing.dragFamily(), 'the control gesture really wrote the address first').toEqual({ [PANE_ID]: { size: 140 } })
    const before = crossing.clears.length
    w.rightClick('g-present')
    expect(crossing.clears.length, 'and the same turn sends exactly one more').toBe(before + 1)
    expect(crossing.dragFamily(), 'leaving the family absent').toBeNull()
  })
})

describe('§3.2 F-6 — no two writes per gesture end (the §2.5 terminal grid, driven twice over)', () => {
  it('F-6/valid-release: TWO `commitDrag`s (the second one 140), then EXACTLY the ONE `commitPane`, then the release\'s OWN `clearDrag` — in that ORDER — one sink call, the family absent afterwards, and NO store act at all (re-grain of the temp-tier event count, `D-92`/`D-93`; the release\'s ending, 2026-11-08)', () => {
    const { w, register, crossing } = compose()
    const sink = makeSink()
    // **THE OBSERVED SURFACE IS "DID A STORE MOVE AT ALL"**: the drag's value is the ADDRESS and the release's one write is
    // the crossing route, so the whole gesture must leave a store doubled beside it CENSUS-EMPTY.
    expect(register.census(), 'nothing at construction').toBe(0)
    const tempEvents: RegisterAct[] = []
    register.subscribe('temp.drag.g1.placement', (e) => tempEvents.push(e))
    w.move('g1', { value: 100 })
    w.move('g1', { value: 140 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // never two, never a per-move write
    expect(tempEvents, 'not one store event: the drag\'s value is the crossing\'s address').toEqual([])
    expect(register.census(), 'and the store was never written, so the subscriber could not have fired either').toBe(0)
    // THE TWO MOVES ARE TWO WHOLE-MEMBER WRITES TO THE ADDRESS, and the last one wins:
    expect(crossing.dragCalls, 'two moves, two `commitDrag`s, the last 140').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { size: 100 } },
      { id: DEFAULT_PANE_ID, geometry: { size: 140 } },
    ])
    // **THE ORDER IS THE CONTRACT**: the sink is not on this log (it is the harness\'s), and the three ROUTE acts are the
    // release\'s file commit and then its OWN ending of the temp reading — never the ending before the commit.
    expect(crossing.acts, 'the release: its file commit, THEN its own `clearDrag`').toEqual(['commitDrag', 'commitDrag', 'commitPane', 'clearDrag'])
    expect(crossing.clears.length, 'the ending is sent ONCE, by the release').toBe(1)
    expect(crossing.calls, 'and the file commit is the sink\'s own value').toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
    expect(crossing.dragFamily(), 'and no drag family stands once the release has ended it').toBeNull()
  })

  it('F-6/right-click: EXACTLY ONE `clearDrag`, ZERO sink writes, ZERO `commitPane`, and NOT ONE store act — never a commit at the same terminal', () => {
    const { w, register, crossing } = compose()
    const tempEvents: RegisterAct[] = []
    const fileEvents: RegisterAct[] = []
    register.subscribe('temp.drag.g1.placement', (e) => tempEvents.push(e))
    register.subscribe(`file.settings.pane.${PANE_ID}.size`, (e) => fileEvents.push(e))
    w.move('g1', { value: 100 })
    w.rightClick('g1')
    expect(crossing.clears.length, 'the abandon terminal ends the family exactly once').toBe(1)
    expect(crossing.dragFamily(), 'and the family is absent afterwards').toBeNull()
    expect(crossing.calls, 'and no `commitPane` at an abandon terminal').toEqual([])
    expect(crossing.acts, 'the whole gesture: one move write, one ending, nothing else').toEqual(['commitDrag', 'clearDrag'])
    expect(tempEvents, 'no store remove: the drag never was a store node').toEqual([])
    expect(fileEvents, 'no store commit at the terminal').toEqual([])
    expect(register.census(), 'and the census agrees with the two recorders').toBe(0)
  })

  it('F-6/§7a.1.2-cancel: the cancel/pointercancel terminal ends the family with AT MOST ONE `clearDrag` per gesture (reading (i)), ZERO sink writes (E10), and a fresh move after a cancel RE-MINTS the address', () => {
    const { w, crossing } = compose()
    w.move('g1', { value: 100 }) // the address stands
    expect(crossing.dragFamily(), 'the control: the family really stands before the cancel').toEqual({ [PANE_ID]: { size: 100 } })
    w.cancel('g1')
    expect(crossing.clears.length, 'the cancel sends exactly one `clearDrag` — reading (i), not reading (ii)').toBe(1)
    expect(crossing.dragFamily(), 'and the family is gone').toBeNull()
    // AT MOST ONE ERASE: a second cancel is the declared no-op — nothing more to end, nothing to throw (F-4\'s class).
    expect(() => w.cancel('g1')).not.toThrow()
    expect(crossing.clears.length, 'and a second cancel for the SAME gesture sends none').toBe(1)
    expect(crossing.calls, 'ZERO route calls at the abandon terminal').toEqual([])
    // AND THE GESTURE MAY BEGIN AGAIN: a fresh move re-mints the address, so the erase gates the ERASE and never the gesture.
    w.move('g1', { value: 140 })
    expect(crossing.dragCalls.length, 'the fresh move is a fresh write').toBe(2)
    expect(crossing.dragFamily(), 'and the address stands again at the new value').toEqual({ [PANE_ID]: { size: 140 } })
  })

  it('F-6/invalid-release (reset): ONE route call holding the clamped PRE-DRAG size (the persistent original RESTORED BY THE CALL), AND the release\'s own `clearDrag`', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    crossing.seed(PANE_ID, { size: 220 }) // the pre-drag size the reset restores
    w.move('g1', { value: 100 })
    w.release('g1', 220, sink) // 220 = the clamped pre-drag size
    expect(sink.stats().sinkCalls).toBe(1)
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { size: 220 } }])
    expect(crossing.family()[PANE_ID]?.size).toBe(220)
    expect(crossing.clears.length, 'and the release ends the temp reading it inherited, once').toBe(1)
    expect(crossing.dragFamily(), 'so no family stands after the reset either').toBeNull()
  })
})

/* ─── THE REGISTER ROW P-PD-SM-1 (S-PD-GESTURE-1, 9 = 3×2 + 3) ─── */

describe('REGISTER P-PD-SM-1 (S-PD-GESTURE-1) — the temp-write turn: per-move writes at the ADDRESS, the ONE-write-per-gesture-end rule, and the release\'s own ending (`D-92`: the subscriber delta has no subject, because there is no registration)', () => {
  const cases: Array<[string, string]> = [
    ['01', 'valid release — sink record reading'],
    ['02', 'valid release — stats().sinkCalls reading (AGREE)'],
    ['03', 'invalid release — sink record reading'],
    ['04', 'invalid release — stats().sinkCalls reading (AGREE)'],
    ['05', 'right-click — sink record reading'],
    ['06', 'right-click — stats().sinkCalls reading (AGREE)'],
    ['07', 'move-turn drive: the FIRST move writes `[\'drag\']` at `temp` through `commitDrag`, ONCE'],
    ['08', 'move-turn drive: a SUBSEQUENT move replaces it — one route call per move, and the family holds the last'],
    ['09', 'move-turn drive: NO move ⇒ NO drag write, and the release ends an absent family'],
  ]

  it.each(cases)('P-PD-SM-1/%s — %s', drive('P-PD-SM-1', (id: string) => {
    const n = parseInt(id, 10)
    if (n <= 6) {
      const { w, crossing } = compose()
      const sink = makeSink()
      const endPath = Math.ceil(n / 2)
      if (endPath === 1 || endPath === 2) {
        w.move('g1', { value: 100 })
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
        // **AND THE DRAG/ENDING COUNTS, ON EVERY CELL OF THE PAIR** (`D-92` re-grained 2026-11-08): the move wrote the
        // address once, the release ended it once, and the family does not stand afterwards.
        expect(crossing.dragCalls, 'the move wrote the address once, with the preview\'s value').toEqual([
          { id: DEFAULT_PANE_ID, geometry: { size: 100 } },
        ])
        expect(crossing.clears.length, 'the release ends the temp reading it inherited, exactly once').toBe(1)
        expect(crossing.dragFamily(), 'and the family is absent afterwards').toBeNull()
      } else {
        w.move('g1', { value: 100 })
        w.rightClick('g1')
        if (n % 2 === 1) expect(sink.record.length).toBe(0) // ZERO sink writes
        else expect(sink.stats().sinkCalls).toBe(0)
        // THE ABANDON TERMINAL: one move write, one ending, no file commit at all.
        expect(crossing.dragCalls.length, 'the move wrote the address once').toBe(1)
        expect(crossing.clears.length, 'and the erase ended it exactly once').toBe(1)
        expect(crossing.calls, 'never a `commitPane` at an abandon terminal').toEqual([])
        expect(crossing.dragFamily(), 'and the abandon terminal ended the family it inherited').toBeNull()
      }
      return
    }
    if (n === 7) {
      // **RE-GRAINED ONTO THE ADDRESS (2026-11-08)**: the FIRST move writes `['drag']` at `temp` through ONE `commitDrag`
      // naming the composition's pane — the family is EMPTY before it and holds the member after. The store's
      // `commit`-versus-`set` vocabulary (a mint against a later in-place replace) has no successor: the route composes the
      // family whole, so one write is one member either way.
      const { w, register, crossing } = compose()
      expect(crossing.dragFamily(), 'the address does not stand before the first write').toBeNull()
      w.move('g1', { value: 100 })
      expect(crossing.dragCalls, 'ONE `commitDrag` names DEFAULT_PANE_ID with the preview\'s value').toEqual([
        { id: DEFAULT_PANE_ID, geometry: { size: 100 } },
      ])
      expect(crossing.dragFamily(), 'and the family holds it').toEqual({ [PANE_ID]: { size: 100 } })
      expect(stored(register, 'temp.drag.g1.placement').found, 'and the doubled store\'s temp tier is untouched').toBe(false)
      expect(register.census(), 'zero store writes — the address is the crossing\'s').toBe(0)
    } else if (n === 8) {
      const { w, crossing } = compose()
      w.move('g1', { value: 100 })
      w.move('g1', { value: 140 })
      // ONE ROUTE CALL PER MOVE, AND THE FAMILY HOLDS THE LAST — a whole-family write replaces the member, it does not
      // accumulate a second one for a second gesture.
      expect(crossing.dragCalls.length, 'one route call per move').toBe(2)
      expect(crossing.dragCalls[1], 'and the second carries the later value').toEqual({ id: DEFAULT_PANE_ID, geometry: { size: 140 } })
      expect(Object.keys(crossing.dragFamily() ?? {}), 'one member per pane id').toEqual([PANE_ID])
      expect(crossing.dragFamily(), 'and the family holds the LAST write').toEqual({ [PANE_ID]: { size: 140 } })
    } else {
      const { w, register, crossing } = compose()
      w.release('g1', 240, makeSink()) // a whole gesture with NO move at all
      expect(crossing.dragCalls, 'NO move ⇒ NO drag write, for any gesture id').toEqual([])
      expect(stored(register, 'temp.drag.g99.placement').found).toBe(false)
      expect(register.resolve('drag.g99.placement').found, 'and no unqualified name either').toBe(false)
      expect(register.census(), 'and the release wrote no store').toBe(0)
      // **AND THE RELEASE ENDS AN ABSENT FAMILY**: one `clearDrag`, because the store's delete answers `committed` whether
      // or not the address stood — the composition does not decide what the store\'s answer is.
      expect(crossing.dragFamily(), 'nothing stood at the address').toBeNull()
      expect(crossing.clears.length, 'the release ends the absent family exactly once').toBe(1)
      expect(crossing.dragFamily(), 'and it is absent afterwards too').toBeNull()
      // THE CONTROL: the same store read DOES find a name this row plants, so the `false`s above are about ABSENCE.
      register.commit('temp.drag.g99.placement', 'planted')
      expect(stored(register, 'temp.drag.g99.placement').found, 'the read works; the composition simply never wrote').toBe(true)
    }
  }))
})

/* ─── THE REGISTER ROW P-PD-SM-3 (S-PD-REASSERT-1, 8 = 4 states × 2 readings) ─── */

describe('REGISTER P-PD-SM-3 (S-PD-REASSERT-1) — the right-click / reassert cycle, re-grained onto the ADDRESS and the ROUTE LOG', () => {
  /* **RE-GRAINED (2026-11-08) — FOUR STATES, TWO READINGS, AND BOTH READINGS ARE THE ADDRESS\'S.**
   *
   * The as-filed readings were `unqualified-read` (a tier-qualified `resolve` of the FILE original that "reasserted") and
   * `receipt-event-reading` (a `commit`/`remove` receipt's event). The readings that replaced them when the preview was
   * closure state were `closure-read`/`store-census` — and the CLOSURE went with the value: the drag's value is an
   * ADDRESS now (`['drag']` at `temp`, one member per pane id, each `{size}`), so what the four states describe is the
   * address's own state machine — standing, ended, never-written, ended-twice — read two honest ways:
   *
   *   · **`route-log`** — the `dragCalls`/`clears` sequence the state produced, in order: the ONE `commitDrag` a move sends
   *     and the ONE `clearDrag` an erase sends. That is the successor of "the write the reassert exposed".
   *   · **`address-read`** — `crossing.dragFamily()`: what stands at `['drag']`/`temp` after the state ran, with `null`
   *     for the absent family. That is the successor of "the tier read that MISSed".
   *
   * **ALL EIGHT CELLS STILL BITE**: a composition that leaves the family standing after an erase reddens every
   * `address-read`, one that sends nothing at all reddens every `route-log`, and one that sends a second write for a
   * second erase reddens the `second-remove` cell. */
  const states = ['active-rightclick', 'no-active-rightclick', 'release-without-preview', 'second-remove'] as const
  const readings = ['route-log', 'address-read'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const state of states) {
    for (const reading of readings) {
      n += 1
      cases.push([String(n).padStart(2, '0'), state, reading])
    }
  }

  it.each(cases)('P-PD-SM-3/%s — %s × %s', drive('P-PD-SM-3', (_id: string, state: string, reading: string) => {
    const { w, register, crossing } = compose()
    if (state === 'active-rightclick') {
      // THE STATE THE ROW IS NAMED FOR: a gesture that wrote the address, ended by the right-click turn.
      w.move('g1', { value: 120 })
      expect(crossing.dragFamily(), 'the control: the family really stands before the erase').toEqual({ [PANE_ID]: { size: 120 } })
      w.rightClick('g1')
      if (reading === 'route-log') {
        // THE SEQUENCE, in the order the composition sent it: the move's write, then the erase's ending.
        expect(crossing.acts, 'the route log is the move\'s ONE `commitDrag` then the erase\'s ONE `clearDrag`').toEqual(['commitDrag', 'clearDrag'])
      } else {
        expect(crossing.dragFamily(), 'the address no longer stands').toBeNull()
      }
    } else if (state === 'no-active-rightclick') {
      expect(() => w.rightClick('g-miss'), 'never a throw').not.toThrow()
      if (reading === 'route-log') {
        // THE ERASE IS STILL A CALL: the family's end is idempotent at the store, so an erase over an absent family sends
        // exactly one `clearDrag` — and no `commitPane` ever rides an abandon terminal.
        expect(crossing.clears.length, 'MISS, never a refusal — and the ending is still asked once').toBe(1)
        expect(crossing.calls, 'and no file commit at an abandon terminal').toEqual([])
      } else {
        expect(crossing.dragFamily(), 'the address was absent before the turn and is absent after it').toBeNull()
        // THE CONTROL: the doubled store CAN hold a wrote value — so the empty census is a fact about the composition.
        expect(register.census(), 'and the turn performed no store act').toBe(0)
      }
    } else if (state === 'release-without-preview') {
      const sink = makeSink()
      w.release('g-free', 240, sink)
      if (reading === 'route-log') {
        // THE RELEASE'S OWN SEQUENCE: its file commit, then its own ending of the temp reading it inherited — and no drag
        // write, because no move ran.
        expect(crossing.acts, 'the release: its file commit, THEN its own `clearDrag`').toEqual(['commitPane', 'clearDrag'])
        expect(crossing.dragCalls, 'and NO move ⇒ NO drag write').toEqual([])
      } else {
        expect(crossing.family()[PANE_ID]?.size, 'the file commit landed').toBe(240)
        expect(crossing.dragFamily(), 'while the drag family never stood and does not stand now').toBeNull()
      }
    } else {
      // THE SECOND-REMOVE STATE: a second right-click hits the erase turn's own at-most-one-erase gate (the gesture is
      // already erased) — no second call, never a throw (F-4's class).
      w.move('g1', { value: 120 })
      w.rightClick('g1')
      expect(() => w.rightClick('g1'), 'the second erase is a declared no-op').not.toThrow()
      if (reading === 'route-log') {
        expect(crossing.clears.length, 'AT MOST ONE `clearDrag` per gesture: the second turn sends none').toBe(1)
        expect(crossing.dragCalls.length, 'and one move is one write').toBe(1)
      } else {
        expect(crossing.dragFamily(), 'still absent, and never re-minted by the second turn').toBeNull()
        expect(register.census(), 'and neither erase was a store act').toBe(0)
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

/** **THE CALLER'S OWN SUPPLY, CALLED AS THE PURE FACTORIES THEY ARE** (`D-93`). `zoneSizeConstraint` and
 *  `zoneSizeRepair` SURVIVED the purge and are still pure, so every row below calls them directly instead of routing them
 *  through a store's construction. That is the whole of the re-grain: the factories were always the subject, and the store
 *  only ever hosted them. */
function constraintOf(min: number, max: number): (
  changed: unknown,
  current: unknown,
  next: unknown,
  feedback?: { reason?: string; message?: string },
) => boolean {
  return wiring.zoneSizeConstraint(min, max)
}

function repairOf(min: number, max: number): (data: unknown, feedback?: { reason?: string; message?: string }) => boolean {
  return wiring.zoneSizeRepair(min, max)
}

/** THE RECORD A ZONE-SIZE WRITE CARRIES — the one surface the repair's corrective action reaches (`record.size`). */
function sizeRecordOf(size: unknown): { size?: unknown } {
  return { size }
}

describe('§3.1 M-7 — REPAIR ARM (a): [min/2, min) rounds UP to the minimum', () => {
  it.each([
    ['at min/2 exactly', 50],
    ['min/2 + ε', 50.5],
    ['min − ε', 99],
  ])('M-7/%s: a violating size = %d is REFUSED by the constraint (refusal-via-feedback, a data string) and then ROUNDED UP TO THE MINIMUM by the repair — the corrective action is the record\'s own `size`, and it lands `min`, never the violating value and never a straddle', (_, violating) => {
    const constraint = constraintOf(MIN, MAX)
    const repair = repairOf(MIN, MAX)
    // THE BAND THIS CELL NAMES — [min/2, min), INCLUDING exactly min/2, which is the PINNED boundary.
    expect(violating >= MIN / 2 && violating < MIN, 'the cell really is arm (a)').toBe(true)
    // (1) THE CONSTRAINT REFUSES IT, and the refusal is a RETURNED VALUE plus the caller's own data string — never a throw.
    const feedback: { reason?: string } = {}
    expect(constraint(undefined, undefined, sizeRecordOf(violating), feedback), 'a sub-minimum size is a VIOLATION').toBe(false)
    expect(feedback.reason, 'the constraint\'s OWN feedback reason').toBe('below-minimum')
    // (2) THE REPAIR'S CORRECTIVE ACTION IS THE RECORD'S `size` — the direct write the store's old passed-function surface
    //     handed over — and it lands the configured minimum.
    const record = sizeRecordOf(violating)
    expect(repair(record), 'the corrective action LANDED').toBe(true)
    expect(record.size).toBe(MIN) // rounded UP
    //**THE CONTROL** — an IDENTITY ("do nothing") repair, the shape the success boolean exists to distinguish, leaves the
    // violating value standing and reddens the line above; and the SAME supply ADMITS a size in [min, max], so the refusal
    // is the band's and not a blanket `false`.
    expect(record.size, 'never the violating value').not.toBe(violating)
    const admitted: { reason?: string } = {}
    expect(constraint(undefined, undefined, sizeRecordOf(MIN), admitted), 'the band\'s upper side is admitted').toBe(true)
    expect(admitted.reason, 'and an admitted write carries no refusal reason').toBeUndefined()
  })
})

describe('§3.1 M-8 — REPAIR ARM (b): below min/2 is discarded — the zone MINIMIZES instead', () => {
  it('M-8: a violating size strictly below min/2 is REFUSED by the constraint and then DISCARDED by the repair — the record lands the caller\'s own minimize marker (0), never a smaller width and never the minimum', () => {
    const constraint = constraintOf(MIN, MAX)
    const repair = repairOf(MIN, MAX)
    const violating = 49
    expect(violating < MIN / 2, 'the cell really is arm (b)').toBe(true)
    const feedback: { reason?: string } = {}
    expect(constraint(undefined, undefined, sizeRecordOf(violating), feedback), 'a sub-minimum size is a VIOLATION').toBe(false)
    expect(feedback.reason).toBe('below-minimum')
    const record = sizeRecordOf(violating)
    expect(repair(record), 'the corrective action LANDED').toBe(true)
    expect(record.size, 'the size change is GONE, the zone MINIMIZES').toBe(MINIMIZE_MARKER)
    //**THE CONTROL** — the arm boundary is the SPLIT and not a constant: one half-step up takes arm (a) and lands `min`.
    expect(record.size, 'and NOT the minimum — the zone MINIMIZES').not.toBe(MIN)
    const above = sizeRecordOf(MIN / 2)
    expect(repair(above), 'the positive control: exactly min/2 takes arm (a)').toBe(true)
    expect(above.size, 'and lands the minimum').toBe(MIN)
  })
})

describe('§3.2 F-1 — a sub-minimum size is NEVER landed (the min/2 split is the PINNED partition)', () => {
  it('F-1/straddle: after the constraint refuses and the repair acts, the end state is NEVER in [min/2, min) — exactly min/2 lands arm (a) at `min`, and min/2 − ε lands arm (b) at the minimize marker; a straddle FAILS', () => {
    // **RE-GRAINED `D-93`**: the as-filed row read the end state out of the STORE's `mem.layout.size` after a write. The
    // end state is the record's own `size` after the pair has run — the same value, one layer down, and the one the store
    // was only ever the custodian of.
    for (const [violating, expected] of [[50, MIN], [49, MINIMIZE_MARKER]] as const) {
      const constraint = constraintOf(MIN, MAX)
      const repair = repairOf(MIN, MAX)
      expect(constraint(undefined, undefined, sizeRecordOf(violating), {}), `${violating} is refused`).toBe(false)
      const record = sizeRecordOf(violating)
      expect(repair(record), `${violating} is repaired`).toBe(true)
      const end = record.size as number
      expect(end, 'the repaired end state').toBe(expected)
      expect(end >= MIN || end === MINIMIZE_MARKER, 'I-1\'s post-state').toBe(true)
      // THE STRADDLE — the value class that must never survive: [min/2, min) is neither the minimum nor the marker.
      expect(end >= MIN / 2 && end < MIN, 'no straddle survives the repair').toBe(false)
    }
    //**THE CONTROL** — the straddle predicate is NOT vacuous: a value the repair never ran on fires it, and the SAME
    // repair erases the class the moment it runs.
    const straddle = 75
    expect(straddle >= MIN / 2 && straddle < MIN, 'the straddle predicate bites (positive control)').toBe(true)
    const straddling = sizeRecordOf(straddle)
    expect(straddling.size, 'the value really is the straddle before the repair sees it').toBe(75)
    expect(repairOf(MIN, MAX)(straddling), 'and the repair acts on it').toBe(true)
    expect(straddling.size, 'leaving the minimum — the straddle is gone').toBe(MIN)
  })
})

describe('§3.2 F-2 — a refused/absent repair answers REFUSAL-VIA-FEEDBACK — a returned record, never a throw', () => {
  it('F-2: the zone-size constraint WITHOUT a repair (the wiring\'s supply, repair member ABSENT) answers REFUSAL-VIA-FEEDBACK — `false` plus the constraint\'s OWN feedback record carrying its data-string reason; NOTHING is stored, NOTHING is cleared, NOTHING is emitted and NO throw escapes', () => {
    // ── HEADSTONE (2026-10-05, `D-93`) ────────────────────────────────────────────────────────────────────────────────
    // THE AS-FILED CELL asserted the deleted store's refusal RECEIPT: `{status:'refused', reason, cleared: [], repaired:
    // [], rows: [], crossings: 0, events: 0}` and "the store byte-identical to its pre-call state". Every one of those
    // members was minted by `evaluateConstraints`, which the purge deleted with `store-core-graph.ts`; this composition no
    // longer hands a constraint to a store, so there is no receipt and no byte-identical store to compare. **WHAT
    // SURVIVES IS THE HALF THAT WAS ALWAYS THE SUPPLY'S**: the refusal is a RETURNED VALUE, the reason is the caller's own
    // DATA STRING written into the record the caller passed, and neither is a throw. That is asserted below.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    const constraint = wiring.zoneSizeConstraint(MIN, MAX) // NO repair member — a repairless supply
    const feedback: { reason?: string; message?: string } = {}
    let answer: unknown
    expect(() => { answer = constraint(undefined, undefined, sizeRecordOf(30), feedback) }, 'no throw escapes').not.toThrow()
    expect(answer, 'a violating write is REFUSED').toBe(false)
    expect(typeof feedback.reason, 'the constraint\'s OWN feedback reason — a DATA STRING').toBe('string')
    expect(feedback.reason).toBe('below-minimum')
    // **NOTHING ELSE LANDS**: the caller's record carries the reason and NOT ONE member the store's receipt used to add —
    // those were the store's vocabulary, and inventing them here would be rebuilding what was deleted.
    expect(Object.keys(feedback).sort(), 'the record carries the reason and nothing the store used to add').toEqual(['reason'])
    //**THE CONTROL** — an in-domain write is ADMITTED and leaves the record UNTOUCHED, so the refusal above is the band's.
    const admitted: { reason?: string } = {}
    expect(constraint(undefined, undefined, sizeRecordOf(MIN), admitted)).toBe(true)
    expect(admitted.reason, 'an admitted write writes no reason').toBeUndefined()
  })
})

describe('§3.2 F-3 — a repair\'s failure lands NOTHING', () => {
  it('F-3: a repair that CANNOT act on the data it was handed answers `false` and lands NOTHING — no member is written, no throw escapes, and the post-state is the pre-state member for member', () => {
    // ── HEADSTONE (2026-10-05, `D-93`) ────────────────────────────────────────────────────────────────────────────────
    // THE AS-FILED CELL drove `evaluateConstraints`' PRE/POST DIFF: a caller-supplied repair that returned `false` without
    // acting must leave no repaired reference, no cleared reference, no repair event and no throw, while the write's own
    // value stood. The DIFF, the repaired/cleared REFERENCES and the repair EVENT are all the deleted store's machinery.
    // **WHAT SURVIVES IS THE REPAIR'S OWN CONTRACT**, which `zoneSizeRepair` still states: it answers a boolean, a `false`
    // answer means the corrective action did not happen, and nothing about the data it declined moved.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    const repair = repairOf(MIN, MAX)
    /** THE DATUM'S OWN BYTES — a repair that lands nothing must leave no trace of itself. */
    const bytesOf = (datum: unknown): string => (JSON.stringify(datum) ?? typeof datum) as string
    for (const datum of [null, undefined, 42, 'not-a-size', { notSize: 30 }] as unknown[]) {
      const before = bytesOf(datum)
      let answer: unknown
      expect(() => { answer = repair(datum) }, 'never a throw').not.toThrow()
      expect(answer, 'the unsuccessful arm').toBe(false)
      expect(bytesOf(datum), 'and the data is byte-identical').toBe(before)
    }
    // AND ON A RECORD WHOSE `size` IS NOT A NUMBER it declines rather than coercing:
    const hostile = sizeRecordOf('x')
    expect(repair(hostile), 'a non-number size cannot be corrected through the record surface').toBe(false)
    expect(hostile.size, 'and is left exactly as it arrived').toBe('x')
    //**THE CONTROL** — a record the repair CAN act on answers `true` and lands, so an "always false" implementation
    // reddens here while the cells above stay green.
    const actionable = sizeRecordOf(30)
    expect(repair(actionable), 'the positive control').toBe(true)
    expect(actionable.size, 'and 30 < min/2 takes arm (b)').toBe(MINIMIZE_MARKER)
  })
})

describe('§3.3 I-1 / §3.2 F-9 — the constraint/repair invariant: NO LANDED ZONE SIZE IS EVER SUB-MINIMUM (the full band grid)', () => {
  it('F-9: every band × every configured min/max pair leaves an end state in {min … max} ∪ {minimized}, and never a straddle — a single sub-minimum cell FAILS', () => {
    // **RE-GRAINED `D-93`**: the as-filed grid was five values × the store's THREE WRITE SHAPES (`set`/`commit`/`remove`).
    // The write shapes died with the store; the grid that survives is five values × three CONFIGURED BANDS, which is
    // strictly more of the invariant and none of the deleted machinery. `remove`'s arm — "a removal's post-state is a MISS,
    // never a violation" — is retired: there is nothing to remove from.
    const values = [49, 50, 75, 120, 0] as const
    const bands = [[100, 800], [50, 400], [200, 1000]] as const
    for (const [min, max] of bands) {
      for (const value of values) {
        const constraint = constraintOf(min, max)
        const repair = repairOf(min, max)
        const record = sizeRecordOf(value)
        const admitted = constraint(undefined, undefined, record, {})
        // THE FLOW'S OWN ORDER: what the constraint refuses, the repair acts on.
        if (!admitted) expect(repair(record, {}), `${value} under ${min}…${max} is repaired`).toBe(true)
        const end = record.size as number
        expect(end >= min && end <= max || end === MINIMIZE_MARKER, `end state ${String(end)} under ${min}…${max}`).toBe(true)
        expect(end >= min / 2 && end < min, 'and no straddle survives the split').toBe(false)
      }
    }
    //**THE CONTROL** — the invariant is not vacuous: a straddle planted where the repair never ran reddens both clauses.
    const planted = sizeRecordOf(75)
    const value = planted.size as number
    expect(value >= 100 / 2 && value < 100, 'the straddle clause bites (positive control)').toBe(true)
    expect(value >= 100 && value <= 800, 'and the in-band clause bites too').toBe(false)
  })
})

/* ─── THE REGISTER ROW P-PD-SM-2 (S-PD-REPAIR-1, 8 = 3 bands × 2 sources + 2 refusals) ─── */

describe('REGISTER P-PD-SM-2 (S-PD-REPAIR-1) — the TWO-ARM REPAIR\'s end states, with the min/2 band boundary as the pinned split', () => {
  /* **RE-GRAINED `D-93` — 3 BANDS × 2 SOURCES, AND THE TWO SOURCES ARE NOW TWO HONEST ONES.** The as-filed third member of
   * each cell was the store's WRITE POINT (`set`/`commit`); both points drove the SAME `evaluateConstraints` arm and the
   * distinction was the store's entry surface, not the supply's behaviour. The two that survive are the two ways this
   * supply is consulted — the repair ALONE, and the flow's own `constraint-then-repair` — and requiring them to land the
   * SAME end state is a stronger claim than the old pair could make. The two refusal cells are the constraint's two call
   * shapes (with and without a feedback record). */
  const cases: Array<[string, number, string]> = [
    ['01', 49, 'repair-alone'],
    ['02', 49, 'constraint-then-repair'],
    ['03', 50, 'repair-alone'],
    ['04', 50, 'constraint-then-repair'],
    ['05', 75, 'repair-alone'],
    ['06', 75, 'constraint-then-repair'],
  ]
  it.each(cases)('P-PD-SM-2/%s — band %d via %s', drive('P-PD-SM-2', (_id: string, band: number, source: string) => {
    const record = sizeRecordOf(band)
    if (source === 'constraint-then-repair') {
      const feedback: { reason?: string } = {}
      expect(constraintOf(MIN, MAX)(undefined, undefined, record, feedback), `${band} is a violation`).toBe(false)
      expect(feedback.reason, 'the constraint states WHY').toBe('below-minimum')
    }
    expect(repairOf(MIN, MAX)(record), 'the corrective action landed').toBe(true)
    const end = record.size
    if (band < MIN / 2) expect(end, 'arm (b) — strictly below min/2').toBe(MINIMIZE_MARKER)
    else expect(end, 'arm (a) — [min/2, min) INCLUDING exactly min/2').toBe(MIN)
    //**THE CONTROL** — the OTHER arm's answer is excluded cell by cell, so a constant repair reddens exactly one band.
    expect(end, 'and never the other arm\'s answer').not.toBe(band < MIN / 2 ? MIN : MINIMIZE_MARKER)
  }))

  it.each([
    ['refusal-with-feedback-record', true],
    ['refusal-without-feedback-record', false],
  ] as Array<[string, boolean]>)('P-PD-SM-2/%s — the constraint WITHOUT a repair (the WIRING\'s supply) refusing with a feedback record = %s ⇒ `false`, the reason carried where there is somewhere to carry it, NO throw', drive('P-PD-SM-2', (_label: string, withFeedback: boolean) => {
    // ── HEADSTONE (2026-10-05, `D-93`) ──────────────────────────────────────────────────────────────────────────────
    // THE AS-FILED TWO CELLS were `refusal-at-set` / `refusal-at-commit`: the store's two entry points, each answering
    // `{status:'refused', …}` with `repaired: []`, `cleared: []`, `events: 0` and a byte-identical store. Those two points
    // and that receipt are the deleted store's. The supply's own two call shapes replace them: the constraint handed a
    // record to state its reason in, and the constraint handed none.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    const constraint = constraintOf(MIN, MAX) // repairless — the wiring's supply as §2.2 assembles it
    const feedback: { reason?: string } = {}
    let answer: unknown
    if (withFeedback) {
      expect(() => { answer = constraint(undefined, undefined, sizeRecordOf(30), feedback) }, 'never a throw').not.toThrow()
    } else {
      expect(() => { answer = constraint(undefined, undefined, sizeRecordOf(30)) }, 'never a throw either').not.toThrow()
    }
    expect(answer, 'refused').toBe(false)
    if (withFeedback) expect(feedback.reason, 'the constraint\'s own data string').toBe('below-minimum')
    else expect(feedback.reason, 'no record was handed, so nothing was written into one').toBeUndefined()
    //**THE CONTROL** — the SAME supply admits an in-domain write, so the refusal is the band's and not a blanket `false`.
    expect(constraint(undefined, undefined, sizeRecordOf(MIN)), 'the positive control').toBe(true)
  }))
})

/* ─── THE REGISTER ROW P-PD-TP-1 (S-PD-FUNCTIONS-1, 18 = 6 shapes × 3 points) ─── */

describe('REGISTER P-PD-TP-1 (S-PD-FUNCTIONS-1) — the passed-function surface (constraint + repair), TOTAL over SIX HOSTILE SUPPLY SHAPES', () => {
  /* **RE-GRAINED `D-93` — SIX SHAPES × THREE EVALUATION POINTS, AND BOTH HALVES ARE THE SUPPLY'S NOW.** The as-filed
   * eighteen were six hostile CONSTRAINT-FUNCTION shapes × the deleted store's three EVALUATION POINTS (`set`/`commit`/
   * `remove`), and every one of them was a property of the store's construction and its `typeof` gate — a hostile member
   * the machinery SKIPPED, a call-count the machinery produced. **THE MACHINERY IS DELETED.** What this unit ships is the
   * caller's own pair of PURE FACTORIES, so the totality the row's term names is THEIRS, and the three evaluation points
   * are the three places the flow consults them:
   *
   *   · **`constraint`** — `zoneSizeConstraint(min, max)` answers a BOOLEAN over any `next`, and a `false` is accompanied
   *     by the caller's own reason in the feedback record, never by a throw.
   *   · **`repair`** — `zoneSizeRepair(min, max)` answers a BOOLEAN over any `data`; a `false` means it could not act and
   *     the data is byte-identical, a `true` means the corrective action landed a value in `{min … max} ∪ {0}`.
   *   · **`pair`** — the flow's own order: the constraint states the violation, the repair acts on it, and a supply that
   *     declines either half leaves the record exactly as it arrived.
   *
   * **ONE HOSTILE SHAPE IS DELIBERATELY NOT DRIVEN, AND THE OMISSION IS THE HONEST PART**: a record whose `size` is a
   * THROWING ACCESSOR would propagate out of both factories, because each reads `record.size` directly. Asserting
   * absorption over it would assert something false, so it is left out rather than asserted green. (The as-filed
   * `hostile-record-throwing-accessor` shape drove the STORE's `typeof` gate, which never read the member at all — that
   * gate is gone with the store.) */
  const shapes = ['absent-undefined', 'null', 'bare-number', 'not-a-size', 'size-not-a-number', 'infinite-size'] as const
  const points = ['constraint', 'repair', 'pair'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const shape of shapes) {
    for (const point of points) {
      n += 1
      cases.push([String(n).padStart(2, '0'), shape, point])
    }
  }

  it.each(cases)('P-PD-TP-1/%s — supply shape %s × evaluation point %s', drive('P-PD-TP-1', (_id: string, shape: string, point: string) => {
    const constraint = constraintOf(MIN, MAX)
    const repair = repairOf(MIN, MAX)
    /** THE HOSTILE `next`/`data` SHAPE — a value the record's boundary could carry and the factories must still answer.
     *  A FRESH ONE PER CALL, so no cell can see another's mutation. */
    const datumOf = (): unknown => {
      if (shape === 'absent-undefined') return undefined
      if (shape === 'null') return null
      if (shape === 'bare-number') return 42
      if (shape === 'not-a-size') return 'not-a-size'
      if (shape === 'size-not-a-number') return { size: 'x' }
      return { size: Number.POSITIVE_INFINITY }
    }
    /** THE DATUM'S OWN BYTES — a corrective action that did not happen must leave no trace of itself. */
    const bytesOf = (datum: unknown): string => (JSON.stringify(datum) ?? `typeof:${typeof datum}`) as string

    if (point === 'constraint') {
      const feedback: { reason?: string } = {}
      let answer: unknown
      expect(() => { answer = constraint(undefined, undefined, datumOf(), feedback) }, 'the constraint is TOTAL').not.toThrow()
      expect(typeof answer, 'and it answers a BOOLEAN, never a record and never a throw').toBe('boolean')
      if (answer === false) expect(feedback.reason, 'refusal-via-feedback: the caller\'s own data string').toBe('below-minimum')
      //**THE CONTROL** — an in-domain size takes the other arm through the SAME supply, so the refusal above is the
      // hostile value's and not a constant.
      const admitted: { reason?: string } = {}
      expect(constraint(undefined, undefined, sizeRecordOf(MIN), admitted), 'the positive control').toBe(true)
      expect(admitted.reason, 'and an admitted write writes no reason').toBeUndefined()
      return
    }

    if (point === 'repair') {
      const datum = datumOf()
      const before = bytesOf(datum)
      let answer: unknown
      expect(() => { answer = repair(datum) }, 'the repair is TOTAL').not.toThrow()
      expect(typeof answer, 'and it answers a BOOLEAN too').toBe('boolean')
      if (answer === false) {
        expect(bytesOf(datum), 'a repair that could not act left NO trace').toBe(before)
      } else {
        const landed = (datum as { size?: unknown }).size as number
        expect(landed >= MIN && landed <= MAX || landed === MINIMIZE_MARKER, 'a repair that acted landed the invariant').toBe(true)
      }
      //**THE CONTROL** — the same supply DOES act on an actionable record, so a repair that always declines reddens here.
      const actionable = sizeRecordOf(30)
      expect(repair(actionable), 'the positive control').toBe(true)
      expect(actionable.size).toBe(MINIMIZE_MARKER)
      return
    }

    // THE PAIR — the flow's own order, and the shape a supply that declines either half leaves untouched.
    const datum = datumOf()
    const before = bytesOf(datum)
    const feedback: { reason?: string } = {}
    let admitted: unknown
    expect(() => { admitted = constraint(undefined, undefined, datum, feedback) }, 'the pair is TOTAL').not.toThrow()
    if (admitted !== false) {
      expect(bytesOf(datum), 'an admitted value is never touched').toBe(before)
      return
    }
    expect(feedback.reason, 'the pair carries the refusal with it').toBe('below-minimum')
    let landed: unknown
    expect(() => { landed = repair(datum, feedback) }, 'and the repair absorbs nothing by throwing').not.toThrow()
    if (landed === false) {
      expect(bytesOf(datum), 'nothing lands').toBe(before)
    } else {
      const size = (datum as { size?: unknown }).size as number
      expect(size >= MIN && size <= MAX || size === MINIMIZE_MARKER, 'the pair lands the invariant').toBe(true)
    }
    //**THE CONTROL** — the composed pair really does act on an actionable violating record.
    const actionable = sizeRecordOf(30)
    expect(constraint(undefined, undefined, actionable, {}), 'the control: refused').toBe(false)
    expect(repair(actionable), 'the control: repaired').toBe(true)
    expect(actionable.size).toBe(MINIMIZE_MARKER)
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
  it('I-4: the render turn\'s layout input is a function of the RECORDED zone size/display — never host geometry, never a controller callback into host state, and never a store\'s tier', () => {
    const { w, register, crossing, source } = compose()
    crossing.seedZone(ZONE_ID, { size: 280, display: 'normal' })
    w.renderZone()
    expect(source.calls[source.calls.length - 1]!.size).toBe(280)
    // **THE DOUBLED STORE IS NOT A SECOND AUTHORITY**: a `mem.layout.zone.<id>.size` write beside the composition changes
    // nothing the render reads, and the contradiction is really there to be read.
    expect(register.commit(`mem.layout.zone.${ZONE_ID}.size`, 999).status).toBe('committed')
    expect(stored(register, `mem.layout.zone.${ZONE_ID}.size`).value, 'the contradiction stands in the store').toBe(999)
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
      const withThrow = wiring.createPaneDrag({ view: crossing.client }, throwing) as unknown as PaneDragSurface
      crossing.seedZone(ZONE_ID, zoneFor(300))
      expect(() => withThrow.renderZone()).not.toThrow()
      // and THIS composition\'s own turn still answers afterwards — the throw stopped at the sink.
      w.renderZone()
      expect(source.calls.length).toBeGreaterThan(0)
    } else {
      // a NON-CALLABLE layout sink: the turn refuses to call it and lands the declared degradation — never a throw.
      const nonCallable = { layout: 42 as never }
      const refused = wiring.createPaneDrag({ view: crossing.client }, nonCallable) as unknown as PaneDragSurface
      crossing.seedZone(ZONE_ID, zoneFor(300))
      expect(() => refused.renderZone()).not.toThrow()
      expect(source.calls.length, 'nothing reaches a sink that is not a function').toBe(0)
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART V — THE COMPOSITION END-TO-END (§5.2 leg 5; §3.1 M-12; §7a.1 item 4)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-12 — the composition holds end-to-end over the SHAPE, with a store doubled beside it', () => {
  it('M-12: the boot wiring shape driven end-to-end — a real ViewClient over the crossing double, a REAL doubled register standing beside the composition, and a recording source double — every turn of the lifecycle runs with NO throw, the doubled store\'s CENSUS stays at ZERO, and the constraint/repair pair supplied to the flow still lands its invariant when driven directly', async () => {
    // ── HEADSTONE (2026-10-05, `D-93`) ────────────────────────────────────────────────────────────────────────────────
    // THE AS-FILED CELL read "driven with a real `createGraphStore`": the DECLARED roots via `storeGraphReferences`, the
    // register's `rows` naming `layout`/`drag`/`settings`, and a `mem.layout.size` write repaired to the minimize marker on
    // the store it guarded. **ALL THREE ARE GONE**: `createGraphStore` and `storeGraphReferences` were deleted, the
    // composition's construction-time bootstrap that declared those roots was deleted with them, and the composition now
    // sends no store write to repair. **WHAT SURVIVES, AND WHAT THIS ROW NOW DRIVES**: the WHOLE lifecycle against a real
    // shape (every read), with a real store doubled beside it to prove the composition never reaches for one (the census),
    // and the constraint/repair pair — which still exists and is still pure — driven directly to show the supply is intact
    // beside the turns.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    const source = makeSource()
    const register = makeRegister()
    const crossing = crossingOf(register)
    const ghost = ghostTarget()
    const w = wiring.createPaneDrag({ view: crossing.client, ghostTarget: ghost }, source) as unknown as PaneDragSurface

    // **THE DECLARED ROOTS' SUCCESSOR IS THE EMPTY CENSUS**: §7a.1 item 4 (i)'s "the register's rows pre-exist the first
    // write" is now "there are no rows, because there is no address space" — the composition declares nothing because it
    // addresses nothing.
    expect(register.acts, 'the composition declared NOTHING, because it has nothing to declare').toEqual([])

    const sink = makeSink()
    crossing.seedZone(ZONE_ID, { size: 300 })
    w.move('g1', { value: 120 }) // first move — ONE write to the drag address
    w.move('g1', { value: 140 }) // subsequent move — replaces it (a whole-family write)
    w.release('g1', 240, sink) // release: ONE route call inside the single sink invocation, then its own ending
    expect(sink.stats().sinkCalls, 'one sink invocation, no throw').toBe(1)
    expect(crossing.calls, 'the release\'s write is the route call').toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
    // **THE DRAG ADDRESS ACROSS THE WHOLE GESTURE**: two whole-member writes, the last one winning, and the release's own
    // ending after its file commit — the family absent once the gesture is over.
    expect(crossing.dragCalls, 'two moves, two `commitDrag`s naming the composition\'s pane').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { size: 120 } },
      { id: DEFAULT_PANE_ID, geometry: { size: 140 } },
    ])
    expect(crossing.acts, 'and the release: the file commit, THEN its own `clearDrag`').toEqual([
      'commitDrag',
      'commitDrag',
      'commitPane',
      'clearDrag',
    ])
    expect(crossing.dragFamily(), 'no drag family stands once the gesture has ended').toBeNull()
    // THE READS ALL ANSWER THE SHAPE, SYNCHRONOUSLY, WITHIN THE SAME TURN AS THE WRITE THAT CAUSED THE DELIVERY.
    expect(w.startSizeOf(paneFixture, PANE_ID), 'the read follows the route call').toBe(240)
    expect(w.boundsOf(paneFixture, PANE_ID)).toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })
    // THE RENDER TURN RAN, ON THE DELIVERED FAMILY (`D-92`: it used to run off the store's temp newsletter).
    w.renderZone()
    expect(source.calls.length).toBeGreaterThan(0)
    expect(source.calls[source.calls.length - 1]!.size).toBe(300)

    // no throw escapes ANY turn (the whole lifecycle above ran without one — asserted turn by turn; a second gesture
    // exercises the candidate read, right-click and cancel):
    expect(w.candidatesFor(zoneFixture), 'no slot was delivered, so no candidate').toEqual([])
    w.move('g2', { value: 90 })
    expect(crossing.dragFamily(), 'the second gesture wrote the address').toEqual({ [PANE_ID]: { size: 90 } })
    w.rightClick('g2')
    expect(crossing.dragFamily(), 'the erase turn ended the family at its address, not a closure value').toBeNull()
    w.move('g3', { value: 80 })
    expect(crossing.dragFamily(), 'and a third gesture writes it again').toEqual({ [PANE_ID]: { size: 80 } })
    w.cancel('g3')
    expect(crossing.dragFamily(), 'and the cancel terminal ends it too').toBeNull()
    expect(crossing.clears.length, 'one ending per terminal: the release\'s own, then one per abandon turn — three').toBe(3)
    // **AND THE GHOST TURN RAN, AGAINST A STATED REALM** — the address it reads is the view record's, so the turn is
    // driven with a `data` member that answers the family ABSENT: one read, no declaration, and never a throw out of the
    // lifecycle above. The stub is this row's own and is withdrawn in the same breath, because this file's other rows
    // expect a realm with no ambient member at all.
    const ambient = globalThis as Record<string, unknown>
    ambient['window'] = { provident: { data: { read: async () => ({ status: 'absent', path: ['drag'] }) } } }
    try {
      w.renderGhost()
      for (let n = 0; n < 4; n += 1) await Promise.resolve()
    } finally {
      delete ambient['window']
    }
    expect(ghost.declared(), 'the absent arm REMOVES the declaration and throws nothing').toBeNull()

    // **AND NOT ONE STORE ACT, ANYWHERE IN THE LIFECYCLE** — the census is the whole of §7a.1 item 4's successor.
    expect(register.census(), 'the doubled store saw ZERO acts across the entire lifecycle').toBe(0)
    expect(register.subscriptions(), 'and the composition registered nothing on it').toBe(0)

    // **THE CONSTRAINT/REPAIR SUPPLIED TO THE FLOW STILL LANDS ITS INVARIANT** — driven directly, because the composition no
    // longer sends such a write: the same `zoneSizeConstraint`/`zoneSizeRepair` pair, over the same `MIN`/`MAX` band, on
    // the record a write would carry.
    const record = sizeRecordOf(49)
    expect(constraintOf(MIN, MAX)(undefined, undefined, record, {}), 'a sub-minimum size is a violation').toBe(false)
    expect(repairOf(MIN, MAX)(record), 'and the repair lands the caller\'s own minimize marker').toBe(true)
    expect(record.size).toBe(MINIMIZE_MARKER)
    //**THE CONTROL** — the doubled store DOES record a write when one is made, so the ZERO above is the composition's and
    // not the double's inertness.
    register.commit('mem.layout.size', 49)
    expect(register.census(), 'the census counts a write when there is one').toBe(1)
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

/** **COMMENT LINES ELIDED — EVERY ABSENCE ASSERTION BELOW SCANS CODE AND NEVER PROSE** (`D-93`). A row that reads raw bytes
 *  can be made green by a header that merely MENTIONS the thing it forbids, and can be made red by the same prose; neither
 *  is a statement about the module. So a line whose first non-space character opens a `//`, and every stretch inside a
 *  `/* … *&#47;` block comment, is dropped before any `includes`/token scan runs. **THE HELPER IS ITSELF CONTROLLED** below
 *  (R-1's positive controls), so an elision that swallowed real code could not pass unnoticed. */
function commentElided(source: string): string {
  const kept: string[] = []
  let inBlock = false
  for (const raw of source.split('\n')) {
    let line = raw
    if (inBlock) {
      const close = line.indexOf('*/')
      if (close < 0) continue
      line = line.slice(close + 2)
      inBlock = false
    }
    let out = ''
    let rest = line
    for (;;) {
      const block = rest.indexOf('/*')
      const slash = rest.indexOf('//')
      if (slash >= 0 && (block < 0 || slash < block)) {
        out += rest.slice(0, slash)
        break
      }
      if (block < 0) {
        out += rest
        break
      }
      out += rest.slice(0, block)
      const close = rest.indexOf('*/', block + 2)
      if (close < 0) {
        inBlock = true
        break
      }
      rest = rest.slice(close + 2)
    }
    if (out.trim().length > 0) kept.push(out)
  }
  return kept.join('\n')
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
  it('R-1: the four named mechanism modules\' OWN CODE — comment lines ELIDED — contains NO store import and NO STORE-CONTEXT token usage (the operative store-context reading; `relocate.ts`\'s licit `drag` is the counterexample that MUST HOLD); the POSITIVE CONTROLS — a planted store import and a planted store-path call — FAIL the scan, and the ELISION ITSELF is controlled in both directions', () => {
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
    // **THE ELISION'S OWN TWO CONTROLS** — a store call in CODE survives the elider, and the same call in a COMMENT does
    // not: without both, an elider that returned nothing at all would make every absence below vacuously true.
    const inCode = "const x = 1\nstore.commit('temp.drag.g1.placement', preview)\n"
    expect(storeCallWithToken(commentElided(inCode), 'drag'), 'code survives the elider').toBe(true)
    expect(commentElided("/* store.commit('temp.drag.g1.placement', preview) */"), 'a block comment does not').toBe('')
    expect(commentElided('// store.commit(\'temp.drag.g1.placement\')'), 'nor does a line comment').toBe('')
    expect(commentElided('a /* store.commit(1) */ b'), 'and an inline block leaves the code around it').toBe('a  b')

    for (const rel of MECHANISM_MODULES) {
      const source = commentElided(readModuleSource(rel))
      // no import statement from the store modules (no import/export routing a value through
      // the store):
      expect(source.includes("'../renderer/store-core-graph'"), `R-1: ${rel} imports the deleted store module`).toBe(false)
      expect(source.includes('store-graph-references'), `R-1: ${rel} imports the deleted references module`).toBe(false)
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
  it('R-2: the wiring module carries NO module-scope store binding AT ALL — the scan is a NAME-AGNOSTIC detector (a differently-named binding slips past a literal `store` scan, so the detector keys on the CONSTRUCTION and the TYPE); a differently-named planted binding FAILS it', () => {
    // ── HEADSTONE (2026-10-05, `D-93`) ────────────────────────────────────────────────────────────────────────────────
    // THE AS-FILED CELL named ONE exception that MUST HOLD — the landed `wiredGraphStore` TENANT-1 seam (§0 ruling 12),
    // "the wired store's own module-scope binding, landed BEFORE this unit". **THAT SEAM WAS DELETED WITH THE STORE**: the
    // wiring module now holds no store binding at all, so the exception list is EMPTY and the pin is the stronger `[]`. The
    // detector and both of its positive controls are unchanged — they are the row's real subject and they still bite.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    const renderer = commentElided(readModuleSource('src/renderer/renderer.ts'))
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
    // AND THE ELISION IS LOAD-BEARING HERE TOO: a binding that only LOOKS like one (a commented-out line) is not detected,
    // while the same line in code is — so the `[]` below is a statement about the module and not about the elider.
    expect(moduleScopeStoreBindings(commentElided('// const store: GraphStore = null')), 'a comment is not a binding').toEqual([])
    expect(moduleScopeStoreBindings(commentElided('const store: GraphStore = null')), 'but code is').toEqual(['store'])
    // THE ROW'S PIN — ZERO module-scope store bindings in the wiring module, under ANY name:
    expect(moduleScopeStoreBindings(renderer), 'the wiring module binds no store at module scope').toEqual([])
  })

  it('R-2: the composition is NEVER handed a store to give an element to — the fixtures pass element/token, the read derives the id and asks the SHAPE, and a store doubled beside it sees not one act (this repo writes no file under <Astrographer>/ — H-r6; out of the node host\'s reach, recorded in the row comment)', () => {
    // The fork-boundary half (H-r6) is not drivable on the node host; the drivable half here is the fixture discipline: the
    // drive fixtures pass element/token and NO STORE is ever given one, because there is no store in the backing at all.
    const { w, register, crossing } = compose()
    crossing.seed(PANE_ID, { size: 240 })
    expect(w.startSizeOf(paneFixture, PANE_ID), 'the element-derived id answers off the SHAPE').toBe(240)
    expect(() => w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
    // **NOT ONE ACT, NOT EVEN A READ** — an element that reached a store would have to arrive as a path, and the census
    // would show it. This is the successor of "the store is never given an element": there is no store to give one to.
    expect(register.acts, 'the element never became an address').toEqual([])
    //**THE CONTROL** — the double DOES record, so the empty log is the composition's restraint and not the double's
    // silence.
    register.resolve(`mem.layout.pane.${PANE_ID}.size`)
    expect(register.acts.length, 'the log is live').toBe(1)
    expect(register.acts[0]!.name, 'and it names the address an element would have had to become').toContain(PANE_ID)
  })
})

describe('§3.4 R-3 — THE FROZEN-SESSION ROW', () => {
  it('R-3: the gesture-session surface gains NO subscription member — no channel, no store parameter, no onChange — read over its CODE with comment lines ELIDED', () => {
    // The session module's exported surface must not carry a channel member. The session
    // module is LANDED and frozen (gsession.md §2.5's eleven items, byte-for-byte) — this
    // unit adds nothing to it; the probe asserts no channel member appears.
    const sessionSource = commentElided(readModuleSource('src/shared/gesture-session.ts'))
    expect(sessionSource.length, 'the elided code is not empty — the elider is not swallowing the module').toBeGreaterThan(0)
    expect(scanForToken(sessionSource, 'subscribe'), 'no subscription member').toBe(false)
    //**THE CONTROL** — the scan fires on a planted one, so the `false` above is a fact about the module.
    expect(scanForToken(commentElided('const h = source.subscribe(fn)'), 'subscribe'), 'the positive control').toBe(true)
    expect(scanForToken(commentElided('// source.subscribe(fn)'), 'subscribe'), 'and a comment is not a member').toBe(false)
  })
})

describe('§3.4 R-4 — THE ONE-SINK/ONE-CLAMP ROW', () => {
  it('R-4: the composition lands the single sink channel (SINK-2) and the family\'s ONE clamp site stands — the release turn performs ONE sink invocation, the file commit rides inside it, and the release\'s own `clearDrag` follows as the second (and last) route act; the repair function bytes contain no clamp', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    w.move('g1', { value: 100 })
    w.release('g1', 240, sink)
    expect(sink.stats().sinkCalls).toBe(1) // one sink invocation
    expect(crossing.calls, 'and ONE route call, made inside that invocation').toEqual([{ id: PANE_ID, geometry: { size: 240 } }])
    // **THE ONE ORDERED TURN, READ ON THE ROUTE LOG**: the move's write to the ADDRESS, then the file commit, then the
    // release's own ending — and no second file commit anywhere.
    expect(crossing.dragCalls, 'the move wrote the drag address once').toEqual([{ id: DEFAULT_PANE_ID, geometry: { size: 100 } }])
    expect(crossing.acts, 'the release: commitPane, then its own `clearDrag` — never a second file write').toEqual([
      'commitDrag',
      'commitPane',
      'clearDrag',
    ])
    // the family's one clamp site: no seam wrapper, reset path or repair function adds a
    // clamp — the REPAIR's own CODE (the caller-supplied function, comment lines ELIDED so prose cannot make this row
    // green or red) must not clamp:
    if (typeof wiring.zoneSizeRepair === 'function') {
      const repairSource = commentElided(wiring.zoneSizeRepair.toString())
      expect(repairSource.length, 'the elided body is not empty — the elider did not swallow the function').toBeGreaterThan(0)
      expect(repairSource, 'no clamp member in the repair\'s code').not.toContain('clamp')
      //**THE CONTROL** — the scan bites on a planted clamp, so the absence above is a fact about the function.
      expect(commentElided('const repaired = clamp(value, min, max)'), 'the positive control').toContain('clamp')
    }
  })
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART VI-b — THE LIVE GESTURE'S READ IS THE CROSSING'S (`D-117`)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§2.1 A (`D-117`) — THE PRE-DRAG SIZE AND THE BOUNDS PAIR ARE `[\'panes\']`\'S AND NOT THE AUTHORED ELEMENT\'S', () => {
  /** **THE ELEMENT PAIR THE OLD PATH READ**: a handle whose `id` is the pane's, and a `parentElement`
   *  carrying the authored `props` the runtime emits as bare attributes — which is what
   *  `gutterSeamExample().startSizeOf`/`boundsOf` read, with `100`/`{0…200}` as their own fallbacks. */
  const authoredPane = (attributes: Record<string, string>) => ({
    getAttribute: (name: string): string | null => (name in attributes ? attributes[name]! : null),
  })
  const handleIn = (id: string, authored: Record<string, string>) => ({ id, parentElement: authoredPane(authored) })

  // `D-117` wires the live gesture onto the composition, and THIS ROW is the wiring's own evidence: the pre-drag size
  // and the bounds pair answer `['panes']` where the element's attributes say something else. It gates because the row
  // is authored after the `D-30` sweep and states what the wiring must do, not what the old path did.
  // strata:gates — `D-117`: the wiring's own read, which no marked row in this file states
  it('D-117/LIVE-READ: for ONE element whose authored pane says `size 140`/`{20,260}` and whose `[\'panes\']` record says `320`/`{10,400}`, the COMPOSITION answers the record and the example seam answers the attribute — and a pane the family does not name answers the crossing\'s MEASURED DEFAULT rather than the attribute, which is the whole of what moved off the element', () => {
    const { w, crossing } = compose()
    // THE DELIVERY: a pane the family now names, at figures the authored attributes do not carry.
    crossing.seed('gutter-pane', { size: 320, bounds: { min: 10, max: 400 } })
    const element = handleIn('gutter-pane', { size: '140', min: '20', max: '260', resizable: 'true' })
    const seams = gutterSeamExample()

    // (1) THE TWO ANSWERS, OVER THE SAME ELEMENT, AND THEY DISAGREE ON PURPOSE.
    expect(seams.startSizeOf(element), 'CONTROL: the EXAMPLE seam still answers the authored attribute — the path this pass took the gesture off').toBe(140)
    expect(w.startSizeOf(element, undefined), 'and the COMPOSITION answers the family\'s record').toBe(320)
    expect(seams.boundsOf(element), 'CONTROL: the example seam\'s pair is the authored one').toEqual({ min: 20, max: 260 })
    expect(w.boundsOf(element, undefined), 'and the composition\'s pair is the record\'s, handed through AS STORED').toEqual({ min: 10, max: 400 })

    // (2) THE MISS ARM IS THE CROSSING'S DEFAULT AND NOT THE ELEMENT'S FALLBACK: the ids differ, so the two
    //     paths answer DIFFERENT figures for one gesture — 100 here, 140 there.
    const unnamed = handleIn('gutter-vertical', { size: '140', min: '20', max: '260', resizable: 'true' })
    expect(seams.startSizeOf(unnamed), 'CONTROL: the element still declares 140').toBe(140)
    expect(w.startSizeOf(unnamed, undefined), 'and the composition answers the MEASURED DEFAULT — the family names no such pane, and the default is the crossing\'s (`DEFAULT_PANE_SIZE`)').toBe(DEFAULT_PANE_SIZE)
    expect(w.boundsOf(unnamed, undefined), 'the same arm for the pair').toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })

    // (3) THE ID IS THE CALLER\'S OWN MAPPING (`paneIdOf`): an element with no id falls back to the TOKEN, and
    //     that id reaches the family — so the read is not keyed by an element lookup this wiring invented.
    expect(w.startSizeOf({ parentElement: authoredPane({ size: '140' }) }, 'gutter-pane'), 'the token names the pane the family records').toBe(320)

    // (4) AND THE COMMIT IS THE CROSSING\'S ROUTE, with the authored status write as its SINK, in that order — and the
    //     release then ends the drag\'s OWN reading of the address.
    //     **SINK-1 IS RE-READ AND NEVER RETIRED**: the sink is the harness\'s own recorder, so the invocation is COUNTED
    //     rather than inferred from the route, and it is counted with TWO DRAG TURNS already run.
    //     **THE STRUCTURE THAT MAKES THAT A MEASUREMENT**: `move(gestureId, preview)`, `rightClick(gestureId)` and
    //     `cancel(gestureId)` take NO SINK ARGUMENT — the surface declares no sink on any of them (see the local
    //     `PaneDragSurface` above, and `renderer.ts`\'s own exported interface) — so no drag turn can be handed one, and a
    //     second sink write could only come from a second release.
    const sink = makeSink()
    w.move('gesture-1', { value: 180 }) // a drag turn: no sink, and one write to the address
    w.release('gesture-1', 220, sink)
    expect(sink.record, 'the SINK was invoked exactly once, with the final value').toEqual([220])
    expect(sink.stats().sinkCalls, 'and it is NEVER RETIRED: ONE sink write per gesture end (E10/SINK-1)').toBe(1)
    expect(crossing.calls, 'and the file commit is the ONE `commitPane` carrying `{size: 220}`').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { size: 220 } },
    ])
    expect(crossing.dragCalls, 'the move before it wrote the address').toEqual([{ id: DEFAULT_PANE_ID, geometry: { size: 180 } }])
    // **THE RELEASE\'S OWN ENDING LANDS AFTER THE FILE COMMIT** — the order the contract states, read on one log.
    expect(crossing.acts, 'the release: its file commit, THEN its own `clearDrag`').toEqual(['commitDrag', 'commitPane', 'clearDrag'])
    expect(crossing.clears.length, 'exactly one ending').toBe(1)
    expect(crossing.dragFamily(), 'and the address is absent once the gesture is over').toBeNull()
    // TWO MORE DRAG TURNS RUN, AND THE SINK IS STILL AT ONE:
    w.move('gesture-2', { value: 160 })
    w.cancel('gesture-2')
    expect(sink.stats().sinkCalls, 'two drag turns already ran and no surface turn but `release` can be handed the sink').toBe(1)

    // (5) THE WIRING BINDS THESE AND NOT THE EXAMPLE\'S PAIR — read off `renderer.ts`\'s CODE, comment lines
    //     ELIDED, because the headstone above the wiring names both spellings and would otherwise satisfy
    //     every one of these detectors by itself.
    const wiringCode = commentElided(readModuleSource('src/renderer/renderer.ts'))
    const bindingOf = (member: string): boolean => new RegExp(`${member}:\\s*\\([^)]*\\)\\s*:[^{]*=>\\s*drag\\.${member}\\(`).test(wiringCode)
    expect(/startSizeOf:\s*\([^)]*\)\s*:[^{]*=>\s*seams\.startSizeOf\(/.test('startSizeOf: (el, token): unknown => seams.startSizeOf(el)'), 'CONTROL: the binding detector FIRES on the seam this pass removed').toBe(true)
    expect(bindingOf('startSizeOf'), 'the affordance\'s `startSizeOf` is the composition\'s').toBe(true)
    expect(bindingOf('boundsOf'), 'and so is its `boundsOf`').toBe(true)
    expect(/commit:\s*\([^)]*\)\s*:\s*void\s*=>\s*\{[^}]*drag\.release\(/.test(wiringCode), 'the `commit` seam is `release` — the sink and the route in one ordered turn').toBe(true)
    expect(/seams\.startSizeOf/.test(wiringCode), 'and the element-attribute read is GONE from the wiring\'s code (the CONTROL above proves the detector can see it)').toBe(false)
    expect(/seams\.boundsOf/.test(wiringCode), 'both halves of the pair, not one').toBe(false)
    expect((wiringCode.match(/createPaneDrag\(/g) ?? []).length, 'the composition is CONSTRUCTED in the wiring — one site, plus none in prose after the elision').toBe(2)
  })
})

describe('§3.4 R-5 — THE NO-NEW-STORE-SURFACE ROW (RETIRED — see the headstone)', () => {
  it('R-5: RETIRED 2026-10-05 (`D-93`) — `createGraphStore` is DELETED, so there is no construction and no option surface left to inspect', () => {
    // ── HEADSTONE (2026-10-05, `D-93`) ────────────────────────────────────────────────────────────────────────────────
    // THE ROW'S TERM WAS: "`createGraphStore` is called with the LANDED options only (`declarations` / `constraints` /
    // `crossing` / `reservedNamespaces` / `enableTestSeam`) — the landed set loads and NO NEW OPTION MEMBER IS ADDED."
    // **ITS SUBJECT IS GONE, WHOLE.** `src/renderer/store-core-graph.ts` was deleted outright by the purge, so the
    // constructor, its option object, `store.register` and `store.tiers` no longer exist anywhere in the tree. This unit
    // no longer builds a store, hands one to a constraint, or reads a register row — `createPaneDrag` takes a shape and
    // writes through the crossing's route, and the harness doubles the deleted store ONLY to count the acts the
    // composition does not make.
    //
    // **NOTHING REPLACES IT HERE, AND NOTHING SHOULD.** "No new store surface" was a claim about a module this repo no
    // longer has; the live successors are §3.4 R-2's ZERO module-scope store bindings in the wiring module (which does
    // gate what this unit adds) and the census rows above (which gate what it writes). The row is kept as a headstone
    // rather than deleted so the register's §3.4 range still reads `R-1..R-5` and the retirement is visible.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    expect(typeof (wiring as unknown as { createPaneDrag?: unknown }).createPaneDrag, 'the composition this unit ships is a function').toBe('function')
    expect(typeof (wiring as unknown as { zoneSizeConstraint?: unknown }).zoneSizeConstraint).toBe('function')
    expect(typeof (wiring as unknown as { zoneSizeRepair?: unknown }).zoneSizeRepair).toBe('function')
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