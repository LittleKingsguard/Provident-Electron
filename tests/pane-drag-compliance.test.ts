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
 * construction or in any turn. **NO ZONE TURN STANDS ON THIS SURFACE AND NONE EVER RAN** (`D-168`): `renderZone` is
 * DELETED, the shape's ONE delivery body is `theme?.apply(); ghost?.(); readout?.()` — the ghost turn among them and
 * nothing else — no zone layout is rendered anywhere in this tree, and the composition registers no subscriber.
 *
 * ── WHAT `D-168` DELETED, AND WHY THIS FILE MOVED WITH IT ─────────────────────────────────────────────────────────
 * FOUR surface members left `PaneDragSurface` with no call site in `src/` or `demo/` — `renderZone`, `candidatesFor`,
 * `defaultSizeFor` and `rightClick` — plus the two docblocks claiming the delivery calls the first, and the four private
 * bindings whose only reader a deleted member was (`sourceRecord`, `zoneOf`, `zoneIdOf`, the `DEFAULT_ZONE_ID` import).
 * `move` is LIVE through the affordance's `applyPreview` seam and `previewOf` was already gone; `rightClick` and `cancel`
 * were always the SAME call (`endReading`), so ONE abandon terminal is named here and `contextmenu` occurs nowhere else.
 * Thirteen rows below are RE-GRAINED IN PLACE (the property survives on a surviving seam) and FOUR ARE RETIRED BY NAME —
 * `M-9`, `F-10`, `I-4`, `P-PD-SM-4` — because their whole subject IS that zone-layout turn: it does not exist in this
 * tree at all, so nothing moved and nothing replaced it.
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
 *     `{ view?: ViewClient | null, ghostTarget?: unknown }` ONLY (the `frozen` member is
 *     DELETED): BOTH of the flow's reads answer the SHAPE synchronously (`view.paneSizeOf`,
 *     `view.paneBoundsOf`) and every write is the crossing's route (`commitDrag`, `clearDrag`,
 *     `commitPane`). **`D-168` LEFT THE `source` PARAMETER STANDING AND ITS BINDING GONE**: the
 *     surface's only reader of it was `renderZone`'s `layout` guard, so the double below is now
 *     the ABSENCE's recorder — a source that COULD log a layout call and never sees one.
 *   `zoneSizeConstraint(min, max)` — §2.2's size-band predicate (factory over the
 *     caller's OWN configured min/max closure; "the configured minimum is the CALLER'S
 *     DATA, captured in the caller's closure").
 *   `zoneSizeRepair(min, max)`     — §2.2's two-arm repair (the pin is `min/2` = arm (a);
 *     below `min/2` = arm (b), the minimize marker is `0` — ZERO = the MINIMIZE verb,
 *     `ZONE-SIZE-DOMAIN-…` clause 2, never a smaller width).
 *   `PaneDragSurface` members (**SIX TURNS, AND SIX IS THE WHOLE SURFACE** — `D-168` deleted the
 *     other four, so this local type is the family's exported seam types §2.1 A plus the §2.1 C
 *     turns and the ghost turn; `Object.keys(createPaneDrag(…))` is asserted against exactly these
 *     six in `P-PD-TP-2`, so a re-added member cannot slip in unreported):
 *     startSizeOf(element, token)  — the shape's `view.paneSizeOf(id)` (§2.1 A)
 *     boundsOf(element, token)     — the shape's `view.paneBoundsOf(id)`, hands the
 *                                    RECEIVED pair through AS STORED (§2.1 A, §0 ruling 9)
 *     move(gestureId, preview)     — **THE DRAG'S VALUE IS AN ADDRESS** (2026-11-08): `preview` is
 *                                    the affordance's `PreviewState` and ONE
 *                                    `view.commitDrag(DEFAULT_PANE_ID, {size: preview.value})` is
 *                                    sent per call — NOTHING when `value` is not a finite
 *                                    non-negative number. `['drag']` at `temp` is the storage.
 *     release(gestureId, final, sink) — the RELEASE terminal (valid end AND invalid reset), in ONE
 *                                    ORDER: the sink, then ONE
 *                                    `view.commitPane(pane, {size: final})`, then its OWN
 *                                    `view.clearDrag()` ending the temp reading (SINK-2, §2.1 C/§2.5)
 *     cancel(gestureId)            — THE ONE ABANDON TERMINAL (pointercancel/cancel): AT MOST ONE
 *                                    `view.clearDrag()` per gesture, never a throw, no `commitPane`,
 *                                    ZERO sink writes (§7a.1 item 2, (i)). **`rightClick` WAS THIS
 *                                    SAME CALL AND IS DELETED** (`D-168`): the affordance's three
 *                                    abandon arms all reach the preview seam with `valid: false`,
 *                                    which the wiring sends here
 *     renderGhost()                — the GHOST turn: ONE `window.provident.data.read({path:['drag']})`
 *                                    per call, painting `data-ghost` on `backing.ghostTarget` iff
 *                                    the family stands at `temp` for `DEFAULT_PANE_ID`, and
 *                                    REMOVING it on every other arm (total, fail-closed)
 *   **DELETED MEMBERS, NAMED ONCE (`D-168`)**: `defaultSizeFor` (a second name over the same
 *   `readPaneSize` closure — the affordance's own `options.defaultSizeFor` seam reads it, and
 *   `interaction`'s `P-GU-IM-2` is its measurement), `candidatesFor` (the relocate-candidate
 *   production — `src/shared/relocate.ts` declares the seam and has NO `src/` importer, so no
 *   implementation of it exists anywhere in `src/` after this pass; the ZONE READ keeps its
 *   owner, `store-view-record`'s `view.zoneOf`), `rightClick` (the same call as `cancel`) and
 *   `renderZone` (see the header: no zone layout is rendered in this tree).
 *   **`previewOf` WAS ALREADY DELETED** with the closure value it read: the address is the storage,
 *   so there is nothing for a closure read to answer and no member pretending there is.
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
 * ── THE REGISTER (§5.5.1) — 7 rows / 79 drives / terms 12+9+9+8+8+18+15 ─────────────
 * P-PD-IM-1 S-PD-READS-1  12 = 2 read seams × 3 shape states × 2 gesture turns
 * P-PD-IM-2 S-PD-ZONE-1    9 = 3 shape zone states × 3 comparator operand shapes
 * P-PD-SM-1 S-PD-GESTURE-1 9 = 3 end paths × 2 readings + 3 move-turn drives
 * P-PD-SM-2 S-PD-REPAIR-1  8 = 3 bands × 2 sources + 2 refusal-via-feedback drives
 * P-PD-SM-3 S-PD-REASSERT-1 8 = 4 states × 2 readings
 * P-PD-TP-1 S-PD-FUNCTIONS-1 18 = 6 hostile supply shapes × 3 evaluation points
 * P-PD-TP-2 S-PD-DEGRADE-1   15 = 3 implementation groups × 5 degradation shapes (the SIX survivors)
 * `P-PD-SM-4 S-PD-LISTENER-1` (12 = 4 listener shapes × 3 event arms) IS RETIRED BY NAME (`D-168`).
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
 * is retired under a dated headstone naming exactly which claim died and why. **`D-93` MOVED NO COUNT
 * (8 rows / 91 drives); `D-168` MOVES IT BY `P-PD-SM-4` ALONE: 7 rows / 79 drives.**
 *
 * ── THE RETIRED ROWS, NAMED (`D-93`) ──
 *   · §3.4 R‑5 "createGraphStore is called with the LANDED options only" — the store is deleted,
 *     so there is no construction to inspect. It is replaced by a headstone in place.
 *   · The FILE-original reassert halves of M-6 / F-4 / P-PD-SM-3 — the tier the preview shadowed
 *     is deleted with the store, so there is no second copy for the erase to expose.
 *   · The `GraphWriteReceipt` / `GraphEvent` halves of F-2 / F-3 / M-7 / M-8 / F-9 / P-PD-SM-2 /
 *     P-PD-TP-1 — refusal records and repair events are the deleted store's vocabulary; what
 *     survives is the factories' own return values and the invariant they land.
 *
 * ── THE RETIRED ROWS, NAMED AGAIN (`D-168`, 2026-11-09) — FOUR, BECAUSE THE ZONE-LAYOUT RENDER
 *    TURN DOES NOT EXIST IN THIS TREE AT ALL: `M-9`, `F-10`, `I-4` and `P-PD-SM-4`. Each measured
 *    the input, the differential, the read authority or the listener of `renderZone` — a member
 *    with no call site anywhere, whose `layout` consumer the app's only `source` never carried
 *    (`domEventSource()` has no `layout` member) and whose subject ("the render's input is the
 *    recorded zone") is therefore a claim about a turn that never ran. **NOTHING REPLACED THEM AND
 *    NOTHING SHOULD**: `['zones']` keeps its declaration, its `commitZones` route (itself with no
 *    UI caller, `D-151`) and the client's `zoneOf` — and NO renderer. Their headstones stand where
 *    they stood, and the collected count moves by exactly four (`P-PD-SM-4`'s TWELVE cells leaving
 *    the `79 = …` literal with them). ──
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

/* ─────────────────────────────── local drive surface ─────────────────────────────── */

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
 *  source double in place of the DOM-backed source"). **ITS ONE MEMBER IS NOW THE ABSENCE'S
 *  RECORDER** (`D-168`): the deleted `renderZone` was the surface's only reader of a source, and
 *  its `layout` call was the one thing a delivery could make. The double keeps the member so a
 *  pass that re-introduces a layout consumer has somewhere to land — and every row below reads
 *  `calls` as ZERO, which is a measurement only because the double could hold one. */
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
 *  `createPaneDrag` satisfies it. **SIX MEMBERS, AND THE SIX ARE THE WHOLE SURFACE** (`D-168`):
 *  the four `D-168` deleted (`renderZone`, `candidatesFor`, `defaultSizeFor`, `rightClick`) are
 *  named in the file header and asserted ABSENT by `M-4`, `M-11` and `P-PD-IM-2`; `P-PD-TP-2`
 *  reads the real composition's own key set against this list, so this declaration cannot drift
 *  from the source without reddening. */
interface PaneDragSurface {
  startSizeOf(element: unknown, token: unknown): unknown
  boundsOf(element: unknown, token: unknown): unknown
  move(gestureId: string, preview: unknown): void
  release(gestureId: string, final: unknown, sink: ReleaseSink): void
  /** **THE ONE ABANDON TERMINAL** (`D-168`): `rightClick` was this same call (`endReading`), and
   *  the affordance only ever reaches `cancel` — so one name stands and a re-added second one does
   *  not exist to be driven. */
  cancel(gestureId: string): void
  /** **THE GHOST TURN — THE SHAPE'S ONE DELIVERY CALLS IT, AND IT IS THE DELIVERY'S ONLY DRAG
   *  TURN** (`D-138`, `D-144`, `D-168`). `previewOf` IS DELETED AND THIS IS WHY: the drag's
   *  in-process value became an ADDRESS — `['drag']` at `temp`, one member per pane id, each
   *  `{size}` — so the storage is the view record and the ghost's declaration is a READ of that
   *  address, painted on the pane element the backing carries. */
  renderGhost(): void
}

const PANE_ID = 'pane-a'
const ZONE_ID = 'zone-1'

/** Caller-owned element/token fixtures — the `<id>` is derived by the CALLER'S own
 *  element/token mapping (§2.1 A); these fixtures carry the id verbatim so any mapping
 *  over `element.id` / `token` derives the intended stored name. */
const paneFixture = { id: PANE_ID }
// **`zoneFixture` IS DELETED WITH ITS ONE READER** (`D-168`): it was the element a `candidatesFor` call was handed, and that
// member is gone — the zone read keeps its owner at the CLIENT (`view.zoneOf`), which takes a bare id and no element.
// `ZONE_ID` survives on its own, because the rows that seed the family and read it by id still name it.

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
  readonly family: () => Readonly<Record<string, HeldPane>>
  /** **THE CAUSE OF A DELIVERY WITH NO ROUTE CALL**: the family as a store that already holds it would answer — a boot, a
   *  second window's write, or the repair. It refills and delivers exactly as a route call does, and it records NO route
   *  call, because it is not this composition's write. */
  readonly seed: (id: string, geometry: { readonly width?: number; readonly height?: number; readonly bounds?: { readonly min: number; readonly max: number } }) => void
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
  /** **A SEED IS A DELIVERY AND REPLACES THE ZONE WHOLE**, so a zone member left OUT of a seed is DROPPED from the
   *  family's record and a row that wants a member gone supplies none of it. **THE ROUTE CANNOT DROP ONE AND NO LONGER
   *  COMPOSES ANYTHING** (`D-151`, `D-152`): `composeZones` is DELETED, `commitZones` writes ONE LEAF PER SUPPLIED MEMBER
   *  (`['zones', id, 'slot']`, `['zones', id, 'distance']`, `['zones', id, 'size']`, `['zones', id, 'display']`), so a
   *  member the caller omits is never written and keeps standing, and an id outside the record's DECLARED set is REFUSED
   *  `undeclared-zone` rather than silently creating a zone. */
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
   *  before any drag, and the state an erase leaves. A whole-family write: `commitDrag(id, { height })` — the pane's
   *  ADJUSTABLE axis member and no other, its NAME the axis (`D-189`, `D-190`) — writes `{[id]: { height }}` and nothing
   *  else, so the family holds one member per pane id and the last write wins. */
  readonly dragFamily: () => Readonly<Record<string, HeldDragMember>> | null
  /** **ONE ORDERED LOG ACROSS ALL THREE ROUTE DOUBLES** — `'commitDrag'` / `'clearDrag'` / `'commitPane'`, in the order
   *  the composition sent them. The release's contract is an ORDER (the sink, then the file commit, then its own ending),
   *  and two separate logs cannot state an order between them. */
  readonly acts: string[]
}

/** **ONE PANE AS THIS HARNESS'S FAMILY HOLDS IT, WITH BOTH AXIS MEMBERS** (`D-189`, `D-192`): `size` has no home on the
 *  record any more, so every row below names the member it means. The pair is required and stays so, because the shape
 *  admits no unstated axis member. */
interface HeldPane {
  readonly width: number
  readonly height: number
  readonly bounds: { readonly min: number; readonly max: number }
}

/** **ONE PLACEMENT AT `['drag']`** — the ADJUSTABLE axis's own member and no other (`D-189`, `D-190`). The fixtures below
 *  hold a stage-resident pane, so the member is `height`; the interface names it rather than typing a bare number, so a row
 *  cannot read the wrong axis by accident. */
interface HeldDragMember {
  readonly width?: number
  readonly height?: number
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

function defaultGeometryFor(id: string): HeldPane {
  const seed = defaultPaneGeometry(id)
  // THE MEASURED DEFAULT CARRIES BOTH AXIS MEMBERS (`D-189`, `D-192`) and, on this fixture, the pair a stage pane stores.
  return {
    width: seed.width,
    height: seed.height,
    bounds: seed.bounds === undefined
      ? { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max }
      : { min: seed.bounds.min, max: seed.bounds.max },
  }
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
  let family: Record<string, HeldPane> = {
    [DEFAULT_PANE_ID]: defaultGeometryFor(DEFAULT_PANE_ID),
  }
  // **THE ZONE FAMILY'S CREATION PLACEHOLDER NAMES EVERY DECLARED ID WITH AN EMPTY RECORD** (`D-151`, `D-152`; `D-91`'s
  // "the family that names no zone" is SUPERSEDED BY POINTER and stands unrewritten, `D-46`): `zones-must-stand` repairs to
  // `viewZonesPlaceholder()` = `{'zone-1': {}}` — one entry per id in `DECLARED_ZONE_IDS`, derived from `DEFAULT_ZONE_ID` in
  // `src/shared/view-shape.ts` (ONE id at this head) — so a DECLARED zone nothing has written answers a MEMBERLESS zone
  // (`{id}`) rather than `null`, and `null` now answers only an id the record does not declare. **NOTHING ON THIS COMPOSITION
  // READS THE ZONE FAMILY ANY MORE** (`D-168`: `candidatesFor` and `renderZone` were its two readers and both are DELETED —
  // the read keeps its owner, `store-view-record`'s `view.zoneOf`, which the rows drive on the CLIENT), so a zone `size`/
  // `display` has no consumer to be `undefined` for (`D-152` (b)'s answer stands, unread). A row that wants a zone WITH
  // members seeds it, and that seed is a DELIVERY and not this composition's write. **THE `let zones` BELOW SEEDS NO ZONE**
  // (measured, not repaired): it stands `{}` where the repair now creates `{'zone-1': {}}`, so a row wanting the
  // placeholder's memberless arm must seed `{}` for the declared id itself — both arms answer alike, so no row here depends
  // on the gap.
  let zones: Record<string, HeldZone> = {}
  // **THE DRAG FAMILY'S ADDRESS** — `['drag']` at `temp`, ONE MEMBER PER PANE ID, each `{size}`. `null` is the family's
  // absence, which is the state before any gesture wrote and the state every erase turn leaves.
  let dragFamily: Record<string, HeldDragMember> | null = null
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
      return { id, width: held.width, height: held.height, bounds: { min: held.bounds.min, max: held.bounds.max } }
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
      // **ONE LEAF PER SUPPLIED MEMBER AT THAT MEMBER'S OWN NAME** (`D-191`, `D-138`): `{ width }` or `{ height }`, then
      // `{ bounds }` carrying its PAIR — so a member the act does not name keeps what stands and no copy of the family is
      // taken. The two axis members are the record's (`D-189`); `size` has no home here any more.
      const supplied = geometry as {
        readonly width?: unknown
        readonly height?: unknown
        readonly bounds?: { readonly min: number; readonly max: number }
      } | undefined
      const base = family[id] ?? defaultGeometryFor(id)
      const width = typeof supplied?.width === 'number' ? supplied.width : base.width
      const height = typeof supplied?.height === 'number' ? supplied.height : base.height
      const bounds = supplied?.bounds ?? base.bounds
      family = { ...family, [id]: { width, height, bounds: { min: bounds.min, max: bounds.max } } }
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
      const carried = (geometry ?? null) as { readonly width?: unknown; readonly height?: unknown } | null
      dragCalls.push({ id, geometry })
      acts.push('commitDrag')
      if (carried !== null && typeof carried.height === 'number' && Number.isFinite(carried.height)) dragFamily = { [id]: { height: carried.height } }
      else if (carried !== null && typeof carried.width === 'number' && Number.isFinite(carried.width)) dragFamily = { [id]: { width: carried.width } }
      else dragFamily = {}
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
    // **THE CROSSING COMPOSES NO ZONE FAMILY ANY MORE, AND THIS DOUBLE STANDS FOR THE MEMBER SET** (`D-151`, `D-152`):
    // `composeZones` is DELETED — `commitZones` writes ONE LEAF PER SUPPLIED MEMBER (`['zones', id, 'slot']`,
    // `['zones', id, 'distance']`, `['zones', id, 'size']`, `['zones', id, 'display']`), so the members supplied are
    // written, the ones the caller did not supply are never touched and keep standing, and an id the record does not
    // declare is REFUSED `undeclared-zone` rather than creating a zone — the id domain is CLOSED to `DECLARED_ZONE_IDS`
    // (derived from `DEFAULT_ZONE_ID`, one id at this head) and the repair CREATES each declared record, which is what a
    // leaf write needs standing under it. This double drives no row through it; it stands here so the member set matches
    // the bridge's.
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
    family: (): Readonly<Record<string, HeldPane>> => family,
    seed: (id, geometry): void => {
      const base = family[id] ?? defaultGeometryFor(id)
      family = {
        ...family,
        [id]: {
          width: typeof geometry.width === 'number' ? geometry.width : base.width,
          height: typeof geometry.height === 'number' ? geometry.height : base.height,
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
    dragFamily: (): Readonly<Record<string, HeldDragMember>> | null => dragFamily,
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
    crossing.seed(PANE_ID, { height: seeded })
    expect(crossing.calls, 'the seed is not this composition\'s write, so it sends no route call').toEqual([])
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(seeded)
    // AND IT TRACKS: a second delivery moves the answer, so a module-held size could not have produced it.
    crossing.seed(PANE_ID, { height: 260 })
    expect(w.startSizeOf(paneFixture, PANE_ID)).toBe(260)
  })
})

describe('§3.1 M-2 — a MISS answers the DECLARED FALLBACK, never a silent default', () => {
  it('M-2/DEFAULT-arm: a pane THE FAMILY DOES NOT NAME answers the MEASURED DEFAULT — the swap\'s ONE stated behaviour change, and the two-tier fallback it replaces no longer exists to fall through (D-87\'s collapsed precedence, D-88)', () => {
    const { w, crossing } = compose()
    // THE ONE ADDRESS: the geometry is ONE family at `file` (D-87\'s inherited fact (i)), so there is no second tier for a
    // MISS to ascend to. The declared fallback is the MEASURED DEFAULT — the figure `D-87` measured off the authored pane\'s
    // `props.size`, which the node NO LONGER CARRIES (`F11`, `D-129`) — and the read says which arm answered, so a
    // placeholder is never passed off as a record.
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

describe('§3.1 M-11 — the candidate production is ABSENT, and the zone read keeps its owner', () => {
  // ── RE-GRAINED 2026-11-09 (`D-168`) ──────────────────────────────────────────────────────────────
  // THIS ROW USED TO DRIVE `candidatesFor(element)` AND ASSERT THE CANDIDATE IT PRODUCED — the OPAQUE
  // `slot` and the caller-measured `distance`, read off the shape's `['zones']` family, with
  // `withinProximity` deciding. **THE PRODUCTION IS GONE**: `D-168` deleted the member, because
  // `src/shared/relocate.ts` declares the `candidatesFor?` seam and has NO `src/` importer (`D-111`'s
  // census; its only importer is a battery's own drive), so after this pass NO implementation of that
  // seam exists anywhere in `src/`. **WHAT SURVIVES, AND WHERE**: the zone READ keeps its owner —
  // `store-view-record`'s `view.zoneOf` at `['zones']`, measured by
  // `tests/integration/store-view-record/zone-family.test.ts` — and the DECISION keeps its own pure
  // function, `src/shared/relocate`'s `withinProximity`, which this row still drives as a scalar
  // comparator (`I-3` below is its purity). **THE ROW IS NOT WEAKER: IT NOW ASSERTS THE ABSENCE AND
  // ITS OWN CONTROL, AND NAMES THE TWO SURVIVORS BY OWNER.**
  // ────────────────────────────────────────────────────────────────────────────────────────────────
  it('M-11: the surface exposes NO candidate production at all (`D-168`: `candidatesFor` is DELETED, and no `src/` file implements `relocate.ts`\'s seam) — the ZONE READ keeps its owner, `store-view-record`\'s `view.zoneOf` over the shape\'s `[\'zones\']` family, and the DECISION keeps `withinProximity`, which answers its two scalars alone', () => {
    const { w, crossing, source } = compose()
    // **THE ABSENCE, ASSERTED WITH ITS OWN CONTROL.** `typeof` is `'undefined'` for the deleted member —
    // and the control is that the SAME reading finds the surviving members, so the absence above is a
    // fact about the surface and not about a probe that answers `undefined` for everything.
    const surfaceAsRecord = w as unknown as Record<string, unknown>
    expect(typeof surfaceAsRecord.candidatesFor, 'the candidate production is DELETED, not stubbed').toBe('undefined')
    for (const survivor of ['startSizeOf', 'boundsOf', 'move', 'release', 'cancel', 'renderGhost']) {
      expect(typeof surfaceAsRecord[survivor], `CONTROL: ${survivor} IS on the surface, so the probe can see a member`).toBe('function')
    }
    // **THE ZONE READ'S OWNER, NAMED AND DRIVEN**: the family is delivered the way a commit delivers it —
    // no route call from this composition — and the CLIENT answers it. `zoneOf` is
    // `store-view-record`'s member; this file reads it to show the read was not lost with the
    // production, and never claims to own it.
    crossing.seedZone(ZONE_ID, { slot: 'slot-7', distance: 40 })
    expect(crossing.zoneCalls, 'the seed is not this composition\'s write').toEqual([])
    const zone = crossing.client.zoneOf(ZONE_ID)
    expect(zone, 'the zone read keeps its owner and answers the delivered family').toEqual({ id: ZONE_ID, slot: 'slot-7', distance: 40 })
    // **THE DECISION IS STILL THE PURE COMPARATOR'S**, driven over the distance the record carries: this
    // half of the as-filed row is unmoved, because `withinProximity` never had anything to do with the
    // deleted member.
    expect(familyWithinProximity(zone?.distance, 50)).toBe(true)
    expect(familyWithinProximity(zone?.distance, 30)).toBe(false)
    // AND NOTHING RENDERED ANY OF IT: the composition's own source double, which COULD record a layout
    // call, saw none — the zone family's delivery reached no renderer anywhere in this tree (`D-168`).
    expect(source.calls, 'the source double records a layout call when one is made, and none was').toEqual([])
    // CONTROL: the double really does record one — the empty reading above is a measurement and not an
    // inert fixture (`D-93`'s discipline, applied to the absence this pass created).
    source.layout(ZONE_ID, 300, 'block')
    expect(source.calls.length, 'the recorder is live').toBe(1)
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
    expect(crossing.calls, 'one route call — the two-tier commit spelling is gone').toEqual([{ id: PANE_ID, geometry: { height: final } }])
    expect(crossing.family()[PANE_ID]?.height, 'and what the crossing holds is the sink\'s own argument').toBe(final)
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
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { height: 42 } }])
  })

  it('F-8/absent-closure: the SIX SURVIVING TURNS driven with NO SHAPE AT ALL answer the declared degradation — never a throw out of the wiring turn (`D-93`: the "store absent from the closure" arm is the backing\'s own `view: null`, because there is no store in the closure to be absent; `D-168`: SIX is the surface, and the deleted four are not driven here or anywhere) — re-grain 2026-11-09', () => {
    const absent = compose({ view: null })
    // The composition must itself land the degradation (NO shape is in its closure) — the family seam rules bind the
    // implementations exactly as they bind a fork's (gutter-ui.md §R.3): the measured default answers.
    expect(() => absent.w.startSizeOf(paneFixture, PANE_ID)).not.toThrow()
    expect(() => absent.w.boundsOf(paneFixture, PANE_ID)).not.toThrow()
    // **THE OTHER FOUR SURVIVORS ARE TOTALLY DRIVEN TOO**: a realm with no crossing still has a gesture, an ending and a
    // ghost turn, and none of them may throw. The ghost turn's own answer is the DECLARATION's (there is no `data` member
    // on this realm either), and it is checked after the turn — a rejected read is settled on the microtask queue.
    expect(() => absent.w.move('g-a', { value: 120 }), 'a move with no shape is silent and total').not.toThrow()
    expect(() => absent.w.release('g-a', 240, makeSink()), 'a release with no shape is silent and total').not.toThrow()
    expect(() => absent.w.cancel('g-a'), 'and the abandon terminal with it').not.toThrow()
    expect(() => absent.w.renderGhost(), 'the ghost turn with no shape and no `data` member is total').not.toThrow()
    expect(absent.ghost.declared(), 'and it declares nothing: there is nothing to read, so nothing is painted').toBeNull()
    // AND THE DECLARED DEGRADATION IS A VALUE, NOT A WITHDRAWAL — the arm the frozen store's `undefined` used to leave.
    expect(absent.w.startSizeOf(paneFixture, PANE_ID), 'the measured default size').toBe(DEFAULT_PANE_SIZE)
    expect(absent.w.boundsOf(paneFixture, PANE_ID), 'the measured default pair').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
    // **AND THE ABSENT REALM SENT NOTHING TO THE CROSSING**: a null `view` is a realm with no route, so no write — and the
    // store doubled beside the composition saw nothing either.
    expect(absent.crossing.calls, 'no shape means no file commit').toEqual([])
    expect(absent.crossing.clears, 'and no drag ending reached a crossing that is not there').toEqual([])
    expect(absent.register.census(), 'and no store was written on the way').toBe(0)
  })

  it('F-8/throwing-shape-read: a shape whose SYNCHRONOUS READ THROWS is absorbed by EVERY one of the SIX SURVIVING turns that reads it — the pane read pair and the release\'s own standing read each answering its own declared degradation, and nothing propagating (re-grain of the as-filed "a tier-handle whose get THROWS"; the tier handle died with the store, `D-93`; the pair closed at `D-95`; **the totality is now over SIX and not over the ten the pre-`D-168` surface carried**) — re-grain 2026-11-09', () => {
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
    expect(() => w.move('g1', { placement: 1 }), 'the move turn is the closure\'s and never reads the shape').not.toThrow()
    expect(() => w.cancel('g1'), 'the abandon terminal absorbs it and writes nothing else').not.toThrow()
    // THE CONTROL: an UNGUARDED turn would redden here — `release` reads the standing size through the same shape, and if
    // the composition let a throw through this `expect` would fail instead of answering.
    expect(() => w.release('g1', 240, makeSink())).not.toThrow()
    // **AND THE PANE READ PAIR IS NOW IN THIS ROW, WHICH IS WHERE `D-94`'s OPEN ITEM (e) SAID IT WAS NOT** (`D-95`). The
    // note that stood here read *"the pane read pair is NOT in this row … the tier handle that could throw was deleted
    // with the store"* — and the deletion of the handle did not make the pair total: `readPaneSize`/`readPaneBounds`
    // called the shape's own read with NO guard, so a shape whose read threw propagated out of `startSizeOf` and
    // `boundsOf` while the other turns absorbed it (`D-93`'s open item (e)). The pair is driven HERE, through the drag's
    // START, and the term is the one every other guarded turn answers: what the ABSENT member answers — the measured
    // default — and never a propagated throw. **THIS ASSERTION IS THE ROW'S BITE**: with the guard reverted it reds as
    // `boom` out of `startSizeOf` (measured, `D-95`).
    expect(() => w.startSizeOf(paneFixture, PANE_ID), 'the SIZE read absorbs the throw — one of the SIX').not.toThrow()
    expect(w.startSizeOf(paneFixture, PANE_ID), 'and answers exactly what the absent member answers: the measured default').toBe(DEFAULT_PANE_SIZE)
    expect(() => w.boundsOf(paneFixture, PANE_ID), 'the BOUNDS read absorbs the throw — another of the SIX').not.toThrow()
    expect(w.boundsOf(paneFixture, PANE_ID), 'and answers the measured pair, a FRESH record').toEqual({
      min: DEFAULT_PANE_BOUNDS.min,
      max: DEFAULT_PANE_BOUNDS.max,
    })
    // **AND THE SIXTH TURN — THE GHOST — IS DRIVEN LAST, BECAUSE ITS ANSWER IS ASYNCHRONOUS**: it reads `['drag']` through
    // the realm's `data` route and not through the shape, so a throwing SHAPE is not its hostile supply; its own totality is
    // driven where its supply lives (`P-PD-TP-2`'s `ghostTurn` group and `M-12`'s stated realm).
    expect(() => w.renderGhost(), 'the ghost turn never throws out of the surface either').not.toThrow()
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

/* ─── THE REGISTER ROW P-PD-IM-1 (S-PD-READS-1, 12 = 2 read seams × 3 shape states × 2 turns) ───
 *
 * **RE-GRAINED BY `D-89` ONTO WHAT THE SWAPPED SIDE ACTUALLY DOES.** The declared term is UNMOVED at twelve — two read
 * seams times THREE STATES times two gesture turns — and the three states are no longer the frozen store's tiers. They are
 * the SHAPE's three:
 *
 *   1. **record** — the family NAMES the pane, and the read answers the family's own value;
 *   2. **default** — the family stands but does not name this pane, so the MEASURED DEFAULT answers and the derivation says
 *      so (`paneGeometryIn`'s `source`), which is the arm the two-tier MISS fallback used to answer;
 *   3. **unfilled** — NOTHING HAS BEEN READ YET (`shape().filled === false`): the same measured figures, and the shape's
 *      own flag is what tells this state apart from the second. That is the state the boot mint used to be reached for —
 *      a cold mirror is now the crossing's creation repair's business and never the read's, so the read states it plainly
 *      rather than writing anything (`D-82` clause 4).
 *
 * **RE-GRAINED AGAIN BY `D-168`, AND THE COLUMN THAT LEFT IS `defaultSizeFor`'s.** The declared term is UNMOVED at twelve
 * — two read seams (`startSizeOf`/`boundsOf`) times THREE STATES times the TWO GESTURE TURNS that read them: the PRE-DRAG
 * read (`startSizeOf`/`boundsOf` at the drag's start) and the TERMINAL read (`release`'s own standing-figure read, `R2` in
 * design §3, which reads `readPaneSize`/`readPaneBounds` for `DEFAULT_PANE_ID` before it commits). The third member this
 * row used to drive for the size seam, `defaultSizeFor`, is DELETED: the reset arm's read is the AFFORDANCE's own seam
 * (`options.defaultSizeFor`, `src/shared/gutter.ts`, supplied by `gutter-affordance.ts`), and its measurement is
 * `interaction`'s `P-GU-IM-2` — **the property did not leave, its OWNER did, so this file names it and does not restate
 * it**. The three states are the SHAPE's, unmoved since `D-89`; what the terminal cells now measure is that the turn that
 * ends a gesture reads the SAME shape member the start read does, once, naming the composition's pane.
 *
 * **THE ROW STILL BITES, ON ALL TWELVE CELLS**: move a measured default, drop the `filled` flag, let the family's value go
 * unread, or give the terminal a pair it cannot clamp, and the cell reddens. */

/** **THE COUNTING SHAPE** — a `ViewClient` that answers everything the real one does and records the two READS this row is
 *  about, so "the terminal read the shape" is a counted fact rather than an inferred one. Every other member is forwarded
 *  bound to the real client, so the composition sees exactly the member set it would see unwrapped. */
interface CountingView {
  readonly view: ViewClient
  readonly reads: Array<{ readonly member: string; readonly id: unknown }>
}

function countingView(inner: ViewClient): CountingView {
  const reads: Array<{ member: string; id: unknown }> = []
  const view = new Proxy(inner, {
    get(target, property, receiver): unknown {
      const value = Reflect.get(target, property, receiver) as unknown
      if (typeof value !== 'function') return value
      if (property === 'paneSizeOf' || property === 'paneBoundsOf') {
        return (id: unknown): unknown => {
          reads.push({ member: String(property), id })
          return (value as (id: unknown) => unknown).call(target, id)
        }
      }
      return (value as (...args: unknown[]) => unknown).bind(target)
    },
  })
  return { view, reads }
}

/** WHICH ARM ANSWERED ONE PANE'S READ, over any shape — `paneSourceOf`'s body for a client this row built itself. */
function sourceArmOf(view: ViewClient, id: string): string {
  return paneGeometryIn(view.shape().panes, id).source
}

describe('REGISTER P-PD-IM-1 (S-PD-READS-1) — the shape-backed size/bounds READS at the drag\'s TWO turns: record / measured default / unfilled', () => {
  const cases: Array<[string, string]> = [
    ['01', 'size-read RECORD (the family names the pane), the drag\'s start read'],
    ['02', 'size-read RECORD (the family names the pane), the TERMINAL read (the release\'s own standing read)'],
    ['03', 'size-read MEASURED DEFAULT (the family names no such pane), the drag\'s start read'],
    ['04', 'size-read MEASURED DEFAULT (the family names no such pane), the TERMINAL read (the release\'s own standing read)'],
    ['05', 'size-read UNFILLED (nothing has been read), the drag\'s start read'],
    ['06', 'size-read UNFILLED (nothing has been read), the TERMINAL read (the release\'s own standing read)'],
    ['07', 'bounds-read RECORD (the family names the pane), the drag\'s start read'],
    ['08', 'bounds-read RECORD (the family names the pane), the TERMINAL read (the release\'s own standing read)'],
    ['09', 'bounds-read MEASURED DEFAULT (the family names no such pane), the drag\'s start read'],
    ['10', 'bounds-read MEASURED DEFAULT (the family names no such pane), the TERMINAL read (the release\'s own standing read)'],
    ['11', 'bounds-read UNFILLED (nothing has been read), the drag\'s start read'],
    ['12', 'bounds-read UNFILLED (nothing has been read), the TERMINAL read (the release\'s own standing read)'],
  ]

  // RE-GRAINED 2026-11-09 (`D-168`): the `defaultSizeFor` column leaves this register row (its property's owner is
  // `interaction`'s `P-GU-IM-2`), and the second "turn" of each seam is the TERMINAL read the release itself makes.
  it.each(cases)('P-PD-IM-1/%s — %s', drive('P-PD-IM-1', (id: string) => {
    const n = parseInt(id, 10)
    const onStartRead = n % 2 === 1
    const isBounds = n > 6
    const state = n <= 2 || (n >= 7 && n <= 8) ? 'record' : n <= 4 || (n >= 9 && n <= 10) ? 'default' : 'unfilled'

    /** THE SHAPE THE STATE NAMES, as a client the composition can be handed.
     *  · record — a filled shape NAMING the pane, at figures no default carries;
     *  · default — a FILLED shape naming no pane at all (`filled: true`, `panes: []`), so the derivation names the
     *    default arm while the shape still says a reading landed;
     *  · unfilled — a client nothing has ever filled.
     *  **THE TERMINAL READS `DEFAULT_PANE_ID` AND NOT THE ELEMENT'S ID** (`R2`: `readPaneSize({}, DEFAULT_PANE_ID)`), so the
     *  states are built for that id — which is the same pane the record arm seeds, and the pane `paneFixture` names. */
    const clientFor = (): ViewClient => {
      if (state === 'unfilled') return createViewClient({ bridge: null })
      if (state === 'record') {
        return clientHolding(
          [{ id: DEFAULT_PANE_ID, width: 1_000, height: 240, bounds: { min: 40, max: 800 } }],
          [],
        )
      }
      return clientHolding([], [])
    }
    const client = clientFor()
    expect(client.shape().filled, 'the state is the one this cell names').toBe(state !== 'unfilled')

    if (onStartRead) {
      // ── THE DRAG'S START READ — the surface's own two read members, over the state's shape.
      const surface = wiring.createPaneDrag({ view: client }, makeSource()) as unknown as PaneDragSurface
      const element = state === 'default' ? { id: 'pane-unwritten' } : paneFixture
      const token = state === 'default' ? 'pane-unwritten' : PANE_ID
      const readId = state === 'default' ? 'pane-unwritten' : DEFAULT_PANE_ID
      const answer = isBounds ? surface.boundsOf(element, token) : surface.startSizeOf(element, token)
      if (state === 'record') {
        expect(answer, 'the family\'s own figure, BY VALUE').toEqual(isBounds ? { min: 40, max: 800 } : 240)
        expect(sourceArmOf(client, readId), 'and the derivation names the record arm').toBe('record')
      } else {
        expect(answer, 'the MEASURED default, answered rather than withheld').toEqual(
          isBounds ? { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } : DEFAULT_PANE_SIZE,
        )
        expect(sourceArmOf(client, readId), 'and the derivation names the default arm, never a record').toBe('default')
      }
      return
    }

    // ── THE TERMINAL READ — `release` reads the standing size AND the bounds pair through the same two members, for
    // `DEFAULT_PANE_ID`, before its sink and its route. The COUNTING client makes that a measured fact: the seam this cell
    // is about was read exactly once, at the composition's own pane, and the release then proceeded on a usable figure.
    const counted = countingView(client)
    const surface = wiring.createPaneDrag({ view: counted.view }, makeSource()) as unknown as PaneDragSurface
    const sink = makeSink()
    const released = 240
    surface.release('g-terminal', released, sink)
    const seam = isBounds ? 'paneBoundsOf' : 'paneSizeOf'
    const seamReads = counted.reads.filter((entry) => entry.member === seam)
    expect(seamReads.length, `the terminal reads the shape's \`${seam}\` exactly ONCE`).toBe(1)
    expect(seamReads[0]?.id, 'and it reads the COMPOSITION\'s pane, not the element the start read was handed').toBe(DEFAULT_PANE_ID)
    // THE FIGURE THE TERMINAL READ IS THE STATE'S OWN — taken off the SHAPE, so this row's own reading does not add to the
    // count above (the counting client would record it, and the count is exactly what this cell measures).
    const geometry = paneGeometryIn(client.shape().panes, DEFAULT_PANE_ID)
    if (state === 'record') {
      expect(isBounds ? geometry.pane.bounds : geometry.pane.height, 'the family\'s own figure, read AT THE TERMINAL').toEqual(
        isBounds ? { min: 40, max: 800 } : 240,
      )
      expect(geometry.source, 'and the derivation names the record arm at the terminal too').toBe('record')
    } else {
      expect(isBounds ? geometry.pane.bounds : geometry.pane.height, 'the MEASURED default at the terminal').toEqual(
        isBounds ? { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max } : DEFAULT_PANE_SIZE,
      )
      expect(geometry.source, 'and the derivation names the default arm').toBe('default')
    }
    // AND THE TERMINAL PROCEEDED ON IT — one sink invocation, so the read above is the one its own `R2` consumed rather
    // than a read taken by this row for its own amusement; and `R2` reads BOTH standing members, so both are counted once.
    expect(sink.stats().sinkCalls, 'the release ran: the standing figure was usable').toBe(1)
    expect(counted.reads.filter((entry) => entry.member === (isBounds ? 'paneSizeOf' : 'paneBoundsOf')).length,
      'and the OTHER standing read ran once too: `R2` reads the size and the pair').toBe(1)
    // **THE CONTROL THAT MAKES THE BOUNDS TERMINAL CELL BITE** — the same turn over a shape whose pair CANNOT be clamped
    // sends NOTHING at all (`R2`'s refusing arm): a composition that never read the shape could not tell the two apart.
    if (isBounds && state === 'record') {
      const hostile = clientHolding([{ id: DEFAULT_PANE_ID, width: 1_000, height: 240, bounds: { min: 'x', max: 'y' } }], [])
      const refusing = wiring.createPaneDrag({ view: hostile }, makeSource()) as unknown as PaneDragSurface
      const refusingSink = makeSink()
      expect(() => refusing.release('g-refused', released, refusingSink), 'and it does not throw doing it').not.toThrow()
      expect(refusingSink.stats().sinkCalls, 'an unclampable standing pair is REFUSED: no sink, no route').toBe(0)
    }
  }))
})


/* ─── THE REGISTER ROW P-PD-IM-2 (S-PD-ZONE-1, 9 = 3 zone states × 3 operand shapes) ─── */

describe('REGISTER P-PD-IM-2 (S-PD-ZONE-1) — the candidate production is ABSENT in every zone state; the zone READ and the pure comparator are its survivors', () => {
  /* **RE-GRAINED 2026-11-09 (`D-168`) — THE TERM IS UNMOVED AT NINE, AND THE SUBJECT OF EACH CELL IS NOW TWO-FOLD.**
   *
   * The as-filed nine were "3 zone states × 3 comparator operand shapes", each driving `candidatesFor(element)` and reading
   * the candidate it produced. **THE PRODUCTION IS DELETED** (`H2`: `src/shared/relocate.ts` declares the seam and has NO
   * `src/` importer, so no implementation of it exists anywhere in `src/` after this pass), so a cell that drove it would be
   * a cell about nothing. What each of the nine asserts instead, in the SAME three zone states and over the SAME three
   * operand shapes:
   *
   *   · **THE ABSENCE** — the surface carries no candidate production, in that zone state, and the control is that the six
   *     survivors ARE there (a probe that answered `undefined` for everything could not report both);
   *   · **THE ZONE READ'S OWNER** — `store-view-record`'s `view.zoneOf` answers the state the family stands at (both
   *     members / `slot` alone / a zone the family does not name), so the read was not lost with the production; and
   *   · **THE DECISION** — `withinProximity`', the pure two-scalar comparator, still answers from its arguments over the
   *     operand shape, which is the half of the as-filed row that never depended on the deleted member.
   *
   * **THE EIGHT CELLS STILL BITE**: a re-added `candidatesFor`, a zone read that stopped answering its family, or a
   * comparator that began consulting anything but its two scalars each reddens its own cells. */
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

  it.each(cases)('P-PD-IM-2/%s — zone %s, operand %s', drive('P-PD-IM-2', (id: string, zoneState: string, shape: string) => {
    const { w, crossing, source } = compose()
    // THE STATE, DELIVERED THE WAY A COMMIT OF THE ZONE FAMILY DELIVERS IT — no route call is this composition's.
    if (zoneState === 'both') crossing.seedZone(ZONE_ID, { slot: 'slot-7', distance: 40 })
    if (zoneState === 'slot-only') crossing.seedZone(ZONE_ID, { slot: 'slot-7' })
    expect(crossing.zoneCalls, 'the seed is not this composition\'s write').toEqual([])

    // (1) THE ABSENCE, WITH ITS CONTROL: no candidate production, on a surface that demonstrably HAS its six members.
    const surfaceAsRecord = w as unknown as Record<string, unknown>
    expect(typeof surfaceAsRecord.candidatesFor, `zone ${zoneState}: no candidate production exists to drive`).toBe('undefined')
    expect(typeof surfaceAsRecord.startSizeOf, 'CONTROL: the surface is a surface, and its six members are readable').toBe('function')

    // (2) THE ZONE READ'S OWNER — the CLIENT's `zoneOf`, which is `store-view-record`'s member and answers the state.
    const zone = crossing.client.zoneOf(ZONE_ID)
    if (zoneState === 'both') {
      expect(zone, 'both members, as the record carries them').toEqual({ id: ZONE_ID, slot: 'slot-7', distance: 40 })
    } else if (zoneState === 'slot-only') {
      expect(zone, 'the slot alone — the record named no distance').toEqual({ id: ZONE_ID, slot: 'slot-7' })
    } else {
      expect(zone, 'a zone the family does not name answers `null`, and invents no geometry').toBeNull()
    }

    // (3) THE DECISION — the pure comparator, over the operand this cell names.
    if (shape === 'usable-within') expect(familyWithinProximity(40, 50)).toBe(true)
    if (shape === 'usable-outside') expect(familyWithinProximity(40, 30)).toBe(false)
    if (shape === 'hostile-negative') expect(familyWithinProximity(-1, 50)).toBe(false)

    // (4) AND NOTHING RENDERED, ANYWHERE: the source double could have recorded a layout call and recorded none.
    expect(source.calls, `zone ${zoneState}: no renderer consumed the zone family`).toEqual([])
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
   * **RE-GRAINED AGAIN 2026-11-09 (`D-168`), AND THE GROUPS ARE THE SIX SURVIVORS.** The term is UNMOVED at fifteen, and the
   * three "implementations" are now the three GROUPS the six surviving turns fall into — `readPair` (`startSizeOf` +
   * `boundsOf`), `gestureTurns` (`move` + `release` + `cancel`) and `ghostTurn` (`renderGhost`) — over the same five hostile
   * shapes. **THE GROUPING CANNOT SILENTLY OMIT A MEMBER**: every cell first reads the real composition's OWN KEY SET and
   * asserts it is EXACTLY these six, so a re-added member (the deleted four) reddens all fifteen and a member that left
   * unreported reddens them too. The deleted `candidateReads` group is gone with its subject (`D-168`).
   *
   * **THE ROW BITES ON ALL FIFTEEN CELLS**: a turn that throws on any of the five reddens, and the precise cells pin the
   * DECLARED answer where one exists, so a "returns `undefined` quietly" degradation reddens too. */
  const impls = ['readPair', 'gestureTurns', 'ghostTurn'] as const
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
            [{ id: PANE_ID, width: 1_000, height: 'not-a-size', bounds: { min: 800, max: 40 } }],
            [{ id: ZONE_ID, slot: 'slot-7', distance: 'not-a-distance' }],
          ),
        },
        source,
      ) as unknown as PaneDragSurface
    }

    const surface = surfaceFor(shape)

    // (0) THE SURFACE IS SIX MEMBERS AND NOTHING ELSE — the structural half `D-168` owes, on every cell of all three groups.
    // `Object.keys` reads the REAL composition's return, so this is the source's own statement and not this file's.
    expect(Object.keys(surface).sort(), `${shape}: the surface is the SIX survivors, member for member`).toEqual([
      'boundsOf',
      'cancel',
      'move',
      'release',
      'renderGhost',
      'startSizeOf',
    ])

    const readSize = (): unknown => surface.startSizeOf(paneFixture, PANE_ID)
    const readBounds = (): unknown => surface.boundsOf(paneFixture, PANE_ID)

    // (a) NOTHING THROWS, ON ANY GROUP × ANY SHAPE — the total half, which is the row's term. Each group drives EVERY member
    // it names, so "the group is total" is a statement about all six turns and not about a representative.
    if (impl === 'readPair') {
      expect(() => readSize(), `${impl} × ${shape}: startSizeOf answers`).not.toThrow()
      expect(() => readBounds(), `${impl} × ${shape}: boundsOf answers`).not.toThrow()
    } else if (impl === 'gestureTurns') {
      expect(() => surface.move('g-tp', { value: 120 }), `${impl} × ${shape}: move answers`).not.toThrow()
      expect(() => surface.release('g-tp', 240, makeSink()), `${impl} × ${shape}: release answers`).not.toThrow()
      expect(() => surface.cancel('g-tp'), `${impl} × ${shape}: cancel answers`).not.toThrow()
    } else {
      expect(() => surface.renderGhost(), `${impl} × ${shape}: renderGhost answers`).not.toThrow()
    }

    // (b) THE DECLARED ANSWER, PINNED WHERE IT HAS ONE — so "answers `undefined` quietly" is not mistaken for degradation.
    if (shape === 'hostile-record' && impl === 'readPair') {
      // **LANDED BY VALUE OR THE DECLARED DEGRADATION, NEVER A THROW** — the record's hostile members are answered as the
      // shape holds them (the read is the shape's, and the boundary that would have refused them is the crossing's, one
      // realm away). So the degradation here is TOTALITY, not silence: every member still comes back.
      expect(readSize(), 'the hostile size is handed through by value').toBe('not-a-size')
      expect(readBounds(), 'and so is the hostile pair').toEqual({ min: 800, max: 40 })
      return
    }
    if (impl === 'readPair') {
      if (shape === 'hostile-record') return
      expect(readSize(), 'the measured default size, and it is a USABLE number').toBe(DEFAULT_PANE_SIZE)
      expect(readBounds(), 'the measured default pair, and it is a USABLE pair').toEqual({
        min: DEFAULT_PANE_BOUNDS.min,
        max: DEFAULT_PANE_BOUNDS.max,
      })
    } else if (impl === 'gestureTurns') {
      // A HOSTILE BACKING HAS NO CROSSING TO WRITE TO, so the turns are silent — which is their declared degradation, and the
      // whole of what these cells can pin without a crossing: no throw and no source call.
      expect(source.calls, `${shape}: no gesture turn reaches a layout sink`).toEqual([])
    } else if (shape === 'unfilled-shape') {
      expect(cold.shape().filled, 'a cold shape SAYS it is cold, and the ghost turn reads its own address rather than guessing').toBe(false)
    }
  }))
})

/* ══════════════════════════════════════════════════════════════════════════════════
 * PART II — THE TEMP-WRITE TURN AND THE LIFECYCLE (§4.2 item 2: M-4/M-5/M-10,
 * F-4/F-5/F-6; register P-PD-SM-1/3; §7a.1 items 1/2 working defaults)
 * ══════════════════════════════════════════════════════════════════════════════════ */

describe('§3.1 M-4 — the SHAPE\'S DELIVERY registers nothing, and NO ZONE TURN STANDS ON THE SURFACE TO BE CALLED', () => {
  it('M-4: the composition registers NO subscriber at all (the `subscribe(\'temp.drag\', …, {subtree:true})` registration is DELETED, `D-92`), AND THE HALF THAT SAID "the delivery calls `renderZone`" INVERTS (`D-168`): the surface carries NO render turn, so a delivery has nothing of that kind to call, and a source that COULD record a layout call records NONE across a delivery and a gesture — re-grain of the as-filed "a move\'s temp write fires the ancestor subscriber"', () => {
    const { w, register, crossing, source } = compose()
    // **THE INVERSION, FIRST AND WITH ITS CONTROL.** The member the as-filed row asserted was the delivery's trigger does
    // not exist: `renderZone` is DELETED (`H1`: no call site in `src/` or `demo/`, and the app's only `source` is
    // `domEventSource()`, which carries no `layout` member at all). The control is that the same reading FINDS the ghost
    // turn the shape's ONE delivery actually calls — `theme?.apply(); ghost?.(); readout?.()` and nothing else.
    const surfaceAsRecord = w as unknown as Record<string, unknown>
    expect(typeof surfaceAsRecord.renderZone, 'NO render turn stands here: the delivery has nothing of the kind to call').toBe('undefined')
    expect(typeof surfaceAsRecord.renderGhost, 'CONTROL: and the ghost turn — the delivery\'s ONE drag turn — IS here').toBe('function')
    // A DELIVERY, THEN EVERY DRAG TURN A GESTURE CAN TAKE: not one of them reaches the source, which is what a layout
    // call would have had to do.
    crossing.seedZone(ZONE_ID, { size: 300, display: 'block' })
    w.renderGhost()
    w.move('g-m4', { value: 120 })
    w.cancel('g-m4')
    expect(source.calls, 'no turn on this surface renders a zone: the source double saw nothing').toEqual([])
    // CONTROL: the double records a layout call the moment one is made, so the reading above is a measurement — the
    // deleted turn would have filled exactly this array.
    source.layout(ZONE_ID, 300, 'block')
    expect(source.calls, 'the recorder is live, so the zero above is a fact about the surface').toEqual([
      { zoneId: ZONE_ID, size: 300, display: 'block' },
    ])
    // NOTHING IS REGISTERED ANYWHERE: not on the doubled store, not on the shape (`M-PDV-4`\'s count, driven here as the
    // doubled store\'s subscription count and the shape\'s own `onChanged` count).
    expect(crossing.registrations(), 'the composition takes no subscription of its own').toBe(0)
    expect(register.subscriptions(), 'and none on a store either — there is no store in the backing to take one on').toBe(0)
    // **AND THE DELIVERED ZONE IS STILL DELIVERED, TO ITS OWN OWNER**: the shape carries it and the client answers it —
    // the `['zones']` family was not deleted with the turn that once (never) rendered it (`D-151`, `D-168`).
    expect(crossing.client.zoneOf(ZONE_ID), 'the zone family is delivered and readable; it is simply not rendered').toEqual({
      id: ZONE_ID,
      slot: undefined,
      distance: undefined,
      size: 300,
      display: 'block',
    })
    // **AND THE DOUBLED STORE IS NOT CONSULTED**: a `mem.layout.zone.*` write nothing delivers changes nothing.
    expect(register.commit(`mem.layout.zone.${ZONE_ID}.size`, 999).status).toBe('committed')
    expect(stored(register, `mem.layout.zone.${ZONE_ID}.size`).value, 'the contradicting value really is in the store').toBe(999)
    expect(crossing.client.zoneOf(ZONE_ID)?.size, 'and the shape does not follow it').toBe(300)
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
      { id: DEFAULT_PANE_ID, geometry: { height: 120 } },
    ])
    expect(crossing.dragFamily(), 'and the family stands at what the move wrote').toEqual({ [PANE_ID]: { height: 120 } })
    w.release('g1', clamped, sink)

    expect(sink.record).toEqual([clamped]) // the sink\'s own record
    expect(sink.stats().sinkCalls).toBe(1) // E3-side reading — they AGREE at 1
    // THE ONE WRITE: the route carries the sink\'s own argument to the ONE family at the ONE address.
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { height: clamped } }])
    expect(crossing.family()[PANE_ID]?.height).toBe(clamped)
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
      { id: DEFAULT_PANE_ID, geometry: { height: 120 } },
    ])
    expect(crossing.dragFamily(), 'and the family holds it').toEqual({ [PANE_ID]: { height: 120 } })
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
    expect(crossing.dragCalls[1], 'and the second names the same pane').toEqual({ id: DEFAULT_PANE_ID, geometry: { height: 140 } })
    expect(Object.keys(crossing.dragFamily() ?? {}), 'the family holds ONE member per pane').toEqual([PANE_ID])
    expect(crossing.dragFamily(), 'and the last write wins').toEqual({ [PANE_ID]: { height: 140 } })
    expect(register.census(), 'and the second gesture wrote no store either').toBe(1)
    // **A MOVE WHOSE `value` IS NOT A FINITE NON-NEGATIVE NUMBER SENDS NOTHING** — no route, and the family keeps what the
    // last usable move wrote rather than being erased by a hostile preview.
    const before = crossing.dragCalls.length
    for (const hostile of [Number.NaN, Number.POSITIVE_INFINITY, -1, 'x', null, undefined]) {
      w.move('g3', { value: hostile })
      w.move('g3', {})
      expect(crossing.dragCalls.length, `a ${String(hostile)} preview sends nothing to the drag address`).toBe(before)
    }
    expect(crossing.dragFamily(), 'and the standing family is untouched by every one of them').toEqual({ [PANE_ID]: { height: 140 } })
  })
})

describe('§3.1 M-6 — the ONE abandon terminal (`cancel`) ENDS the drag family at its address; the reassert\'s subject is retired', () => {
  it('M-6: the erase turn sends exactly ONE `clearDrag()` — the family answers ABSENT afterwards — a second cancel for the SAME gesture sends ZERO, a gesture that never moved then cancelled sends exactly ONE (the family\'s end is idempotent at the store, whether or not it stood), and the composition makes ZERO store acts. **RE-GRAINED 2026-11-09 (`D-168`): THE DRIVE IS `cancel`, THE TERMINAL THE AFFORDANCE ACTUALLY REACHES** — `rightClick` was the same call and is DELETED, so this row would otherwise drive a member that does not exist', () => {
    const { w, register, crossing } = compose()
    // ── HEADSTONE (2026-10-05, `D-93`; RE-GRAINED 2026-11-08; DRIVE MOVED 2026-11-09 BY `D-168`) ────────────────────
    // THIS ROW USED TO ASSERT THREE THINGS: (1) ONE `remove('temp.drag.<gestureId>.placement')` on the frozen store, (2)
    // that the `temp` tier read MISSed afterwards, and (3) that the FILE original — a `file.settings.drag.<gid>.placement`
    // copy seeded beside the preview — REASSERTED on the read once the preview was gone. (3) died with the store. What
    // SURVIVES IS (1) AND (2), ASKED OF THE THING THAT HOLDS THE VALUE NOW: the drag's value is an ADDRESS (`['drag']` at
    // `temp`), so the erase is `clearDrag()` — the store\'s delete of that family — and "the temp tier read MISSes" is the
    // family answering `null`. The row is therefore no longer a headstone over a deleted subject: it is the address\'s own
    // erase, measured on the route log and on the family. **AND THE TURN THAT SENDS IT IS `cancel`**: `rightClick` and
    // `cancel` were always `endReading(key)`, the affordance's three abandon arms all reach the preview seam with
    // `valid: false` (which the wiring sends to `cancel`), and `contextmenu` occurs nowhere in `src/` or `tests/`.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    expect(register.census(), 'nothing at construction').toBe(0)
    w.move('g1', { value: 120 })
    expect(crossing.dragFamily(), 'the control: the family really stands before the erase').toEqual({ [PANE_ID]: { height: 120 } })
    w.cancel('g1')
    // THE ERASE — exactly ONE call, and the family is ABSENT:
    expect(crossing.clears.length, 'the erase sends exactly ONE `clearDrag()`').toBe(1)
    expect(crossing.dragFamily(), 'and the family no longer stands').toBeNull()
    expect(stored(register, 'temp.drag.g1.placement').found, 'and no store ever held it').toBe(false)
    expect(crossing.calls, 'an abandon terminal sends no `commitPane`').toEqual([])
    // AT-MOST-ONE-ERASE per gesture (§7a.1 item 2 reading (i)) — a second erase for the SAME gesture sends nothing:
    w.cancel('g1')
    expect(crossing.clears.length, 'a second cancel for the same gesture sends ZERO').toBe(1)
    // **THE CONTROL THAT THE ERASE TURN REALLY SENDS**: a gesture whose erase had NOT happened asks ONCE, even where it
    // never wrote the address — the store\'s delete answers the same receipt whether or not the family stood.
    const before = crossing.clears.length
    w.cancel('g-never')
    expect(crossing.clears.length, 'a gesture that never moved then cancelled sends exactly ONE').toBe(before + 1)
    expect(crossing.dragCalls, 'and no move means no drag write at all').toEqual([{ id: DEFAULT_PANE_ID, geometry: { height: 120 } }])
    expect(register.census(), 'the whole row made not one store act').toBe(0)
  })
})

describe('§3.2 F-4 — the abandon terminal during a NON-EXISTENT drag ends an ABSENT family, never a refusal', () => {
  it('F-4: the erase turn on a gesture with NO move is never a throw and sends exactly ONE `clearDrag()` (NOT zero — the family\'s end is idempotent at the store, and the store answers `AddressNotFound` for a family that does not stand), a repeat for the SAME gesture sends none, and never a store act; the control is the same turn on a gesture that DID move, which also sends exactly one and ends the family. **RE-GRAINED 2026-11-09 (`D-168`): THE TURN IS `cancel`** — `rightClick` was this same call and is DELETED, and a gesture with no move is exactly the case `E1`\'s other arm is lawful for', () => {
    const { w, register, crossing } = compose()
    // ── HEADSTONE (2026-10-05, `D-93`; RE-GRAINED 2026-11-08; DRIVE MOVED 2026-11-09 BY `D-168`) ────────────────────
    // THE AS-FILED ROW seeded a `file.drag.<gid>.placement` original into a store whose `drag` root was DECLARED, drove a
    // right-click on a path with NO temp node, and asserted that the store\'s `remove` answered `'undeclared-name'` at the
    // walk while the file original kept answering the unqualified resolve. **THERE IS NO STORE TO WALK AND NO ROOT TO
    // DECLARE**, but there IS an address: `['drag']` at `temp`. Its erase on a family that does not stand is exactly the
    // case the old `remove` had to absorb — and the record\'s route absorbs the store\'s `AddressNotFound` and answers
    // `committed`, so the CALL still happens once. That is what is asserted here: silence from the composition would be a
    // composition deciding what the store\'s answer is.
    // ────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    expect(crossing.dragFamily(), 'nothing stands, and none is claimed').toBeNull()
    expect(() => w.cancel('g-miss'), 'never a throw').not.toThrow()
    expect(crossing.clears.length, 'the erase asks the store exactly ONCE even where nothing stood').toBe(1)
    expect(crossing.dragFamily(), 'and the address answers absent, which is the state the erase leaves').toBeNull()
    expect(() => w.cancel('g-miss'), 'and idempotent').not.toThrow()
    expect(crossing.clears.length, 'a repeat for the SAME gesture sends none').toBe(1)
    expect(register.census(), 'and never a store act').toBe(0)
    // THE CONTROL: the same turn on a gesture that DID move also sends exactly one, and ends the family it finds.
    w.move('g-present', { value: 140 })
    expect(crossing.dragFamily(), 'the control gesture really wrote the address first').toEqual({ [PANE_ID]: { height: 140 } })
    const before = crossing.clears.length
    w.cancel('g-present')
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
      { id: DEFAULT_PANE_ID, geometry: { height: 100 } },
      { id: DEFAULT_PANE_ID, geometry: { height: 140 } },
    ])
    // **THE ORDER IS THE CONTRACT**: the sink is not on this log (it is the harness\'s), and the three ROUTE acts are the
    // release\'s file commit and then its OWN ending of the temp reading — never the ending before the commit.
    expect(crossing.acts, 'the release: its file commit, THEN its own `clearDrag`').toEqual(['commitDrag', 'commitDrag', 'commitPane', 'clearDrag'])
    expect(crossing.clears.length, 'the ending is sent ONCE, by the release').toBe(1)
    expect(crossing.calls, 'and the file commit is the sink\'s own value').toEqual([{ id: PANE_ID, geometry: { height: 240 } }])
    expect(crossing.dragFamily(), 'and no drag family stands once the release has ended it').toBeNull()
  })

  it('F-6/right-click: EXACTLY ONE `clearDrag`, ZERO sink writes, ZERO `commitPane`, and NOT ONE store act — never a commit at the same terminal. **RE-GRAINED 2026-11-09 (`D-168`): ITS DRIVE IS NOW `cancel`, WHICH IS THE TERMINAL THE AFFORDANCE ACTUALLY REACHES** — `rightClick` was the same `endReading` call and is DELETED, so this row keeps the id the design names it by and drives the member that exists ("right-click" is the as-filed name of the abandon arm, not a member); `F-6/§7a.1.2-cancel` below is the OTHER cancel arm (reading (i) and the re-mint), so both survive and neither copies the other', () => {
    const { w, register, crossing } = compose()
    const tempEvents: RegisterAct[] = []
    const fileEvents: RegisterAct[] = []
    register.subscribe('temp.drag.g1.placement', (e) => tempEvents.push(e))
    register.subscribe(`file.settings.pane.${PANE_ID}.size`, (e) => fileEvents.push(e))
    w.move('g1', { value: 100 })
    w.cancel('g1')
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
    expect(crossing.dragFamily(), 'the control: the family really stands before the cancel').toEqual({ [PANE_ID]: { height: 100 } })
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
    expect(crossing.dragFamily(), 'and the address stands again at the new value').toEqual({ [PANE_ID]: { height: 140 } })
  })

  it('F-6/invalid-release (reset): ONE route call holding the clamped PRE-DRAG size (the persistent original RESTORED BY THE CALL), AND the release\'s own `clearDrag`', () => {
    const { w, crossing } = compose()
    const sink = makeSink()
    crossing.seed(PANE_ID, { height: 220 }) // the pre-drag size the reset restores
    w.move('g1', { value: 100 })
    w.release('g1', 220, sink) // 220 = the clamped pre-drag size
    expect(sink.stats().sinkCalls).toBe(1)
    expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { height: 220 } }])
    expect(crossing.family()[PANE_ID]?.height).toBe(220)
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
    ['05', 'cancel (the abandon terminal) — sink record reading'],
    ['06', 'cancel (the abandon terminal) — stats().sinkCalls reading (AGREE)'],
    ['07', 'move-turn drive: the FIRST move writes `[\'drag\']` at `temp` through `commitDrag`, ONCE'],
    ['08', 'move-turn drive: a SUBSEQUENT move replaces it — one route call per move, and the family holds the last'],
    ['09', 'move-turn drive: NO move ⇒ NO drag write, and the release ends an absent family'],
  ]

  // RE-GRAINED 2026-11-09 (`D-168`): cells 05/06 drive `cancel`, the ONE abandon terminal the affordance reaches —
  // `rightClick` was the same call and is DELETED, so the as-filed label named a member that no longer exists.
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
          expect(crossing.calls).toEqual([{ id: PANE_ID, geometry: { height: endPath === 1 ? 240 : 220 } }])
          expect(crossing.family()[PANE_ID]?.height).toBe(endPath === 1 ? 240 : 220)
        }
        // **AND THE DRAG/ENDING COUNTS, ON EVERY CELL OF THE PAIR** (`D-92` re-grained 2026-11-08): the move wrote the
        // address once, the release ended it once, and the family does not stand afterwards.
        expect(crossing.dragCalls, 'the move wrote the address once, with the preview\'s value').toEqual([
          { id: DEFAULT_PANE_ID, geometry: { height: 100 } },
        ])
        expect(crossing.clears.length, 'the release ends the temp reading it inherited, exactly once').toBe(1)
        expect(crossing.dragFamily(), 'and the family is absent afterwards').toBeNull()
      } else {
        w.move('g1', { value: 100 })
        // **THE ABANDON TERMINAL IS `cancel`** (`D-168`: `rightClick` was this same call and is DELETED; the affordance's
        // three abandon arms all reach it).
        w.cancel('g1')
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
        { id: DEFAULT_PANE_ID, geometry: { height: 100 } },
      ])
      expect(crossing.dragFamily(), 'and the family holds it').toEqual({ [PANE_ID]: { height: 100 } })
      expect(stored(register, 'temp.drag.g1.placement').found, 'and the doubled store\'s temp tier is untouched').toBe(false)
      expect(register.census(), 'zero store writes — the address is the crossing\'s').toBe(0)
    } else if (n === 8) {
      const { w, crossing } = compose()
      w.move('g1', { value: 100 })
      w.move('g1', { value: 140 })
      // ONE ROUTE CALL PER MOVE, AND THE FAMILY HOLDS THE LAST — a whole-family write replaces the member, it does not
      // accumulate a second one for a second gesture.
      expect(crossing.dragCalls.length, 'one route call per move').toBe(2)
      expect(crossing.dragCalls[1], 'and the second carries the later value').toEqual({ id: DEFAULT_PANE_ID, geometry: { height: 140 } })
      expect(Object.keys(crossing.dragFamily() ?? {}), 'one member per pane id').toEqual([PANE_ID])
      expect(crossing.dragFamily(), 'and the family holds the LAST write').toEqual({ [PANE_ID]: { height: 140 } })
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

describe('REGISTER P-PD-SM-3 (S-PD-REASSERT-1) — the abandon terminal / reassert cycle, re-grained onto the ADDRESS and the ROUTE LOG', () => {
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
  // **THE STATE NAMES MOVED WITH THE MEMBER** (`D-168`): the drives are `cancel`, the terminal the affordance reaches, and the
  // names say so — the as-filed `*-rightclick` ids named a member that is deleted.
  const states = ['active-cancel', 'no-active-cancel', 'release-without-preview', 'second-remove'] as const
  const readings = ['route-log', 'address-read'] as const
  const cases: Array<[string, string, string]> = []
  let n = 0
  for (const state of states) {
    for (const reading of readings) {
      n += 1
      cases.push([String(n).padStart(2, '0'), state, reading])
    }
  }

  // RE-GRAINED 2026-11-09 (`D-168`): the two `*-rightclick` states are renamed and DRIVEN by `cancel` — `rightClick` was the
  // same `endReading` call and is DELETED, and `cancel` is the terminal the affordance's three abandon arms reach.
  it.each(cases)('P-PD-SM-3/%s — %s × %s', drive('P-PD-SM-3', (_id: string, state: string, reading: string) => {
    const { w, register, crossing } = compose()
    if (state === 'active-cancel') {
      // THE STATE THE ROW IS NAMED FOR: a gesture that wrote the address, ended by the abandon terminal (`cancel`, `D-168`).
      w.move('g1', { value: 120 })
      expect(crossing.dragFamily(), 'the control: the family really stands before the erase').toEqual({ [PANE_ID]: { height: 120 } })
      w.cancel('g1')
      if (reading === 'route-log') {
        // THE SEQUENCE, in the order the composition sent it: the move's write, then the erase's ending.
        expect(crossing.acts, 'the route log is the move\'s ONE `commitDrag` then the erase\'s ONE `clearDrag`').toEqual(['commitDrag', 'clearDrag'])
      } else {
        expect(crossing.dragFamily(), 'the address no longer stands').toBeNull()
      }
    } else if (state === 'no-active-cancel') {
      expect(() => w.cancel('g-miss'), 'never a throw').not.toThrow()
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
        expect(crossing.family()[PANE_ID]?.height, 'the file commit landed').toBe(240)
        expect(crossing.dragFamily(), 'while the drag family never stood and does not stand now').toBeNull()
      }
    } else {
      // THE SECOND-REMOVE STATE: a second `cancel` hits the erase turn's own at-most-one-erase gate (the gesture is
      // already erased) — no second call, never a throw (F-4's class).
      w.move('g1', { value: 120 })
      w.cancel('g1')
      expect(() => w.cancel('g1'), 'the second erase is a declared no-op').not.toThrow()
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
 * PART IV — THE ZONE-RENDER LISTENER: FOUR ROWS RETIRED BY NAME (`D-168`, 2026-11-09)
 *
 * **THEIR WHOLE SUBJECT IS THE ZONE-LAYOUT RENDER TURN, AND THAT TURN DOES NOT EXIST IN THIS TREE AT ALL.** The four rows
 * this section used to carry are named here, one by one, with the reason each has no subject — this corpus's habit for a
 * retirement (`Z-9` at `D-152`, the sibling-pane half at `D-154`, the `focus` route rows at `D-142`): a recorded
 * retirement, never a silent deletion. **NOTHING REPLACED THEM, AND NOTHING SHOULD.** `renderZone` was a surface member
 * with NO call site in `src/` or `demo/`, the app's only `source` is `domEventSource()` — which carries no `layout` member
 * at all, so even a call would have returned at its own `typeof layout !== 'function'` gate — and **NO ZONE LAYOUT IS
 * RENDERED ANYWHERE IN THIS TREE**: `['zones']` keeps its declaration, its `commitZones` route (itself with no UI caller,
 * `D-151`) and the client's `zoneOf`, and has no renderer, because no layout consumer exists in `src/`, no authored node
 * declares a zone (the word `zone` occurs ZERO times in the envelope) and no zone→panes membership exists at all. The
 * properties these rows measured were never true of anything that ran, which is why they are RETIRED and not re-grained.
 *
 *   · **`M-9`** — "the zone-render turn reads the RECORDED zone values for its layout call". Its subject IS that call: the
 *     turn, its input and the sink it wrote. All three are gone together; the record it was to read from still stands,
 *     unrendered. **Replaced by nothing.**
 *   · **`F-10`** — "the render turn reads the record, not a module-held variable": the differential was the RENDER's
 *     answer changing with the delivered family. With no render there is no answer to differ. **Replaced by nothing** —
 *     the same property over the turns that DO run is `M-10`'s and the ghost's (`D-132`, `D-144`), and it is already
 *     measured there.
 *   · **`I-4`** — "the render reads the record (one read authority per zone reference)": an authority claim about a read
 *     no line makes. **Replaced by nothing** — the zone family's ONE read authority is `store-view-record`'s and is
 *     measured in `tests/integration/store-view-record/zone-family.test.ts` (`Z-8`/`Z-9`), which is where that
 *     property's owner always was.
 *   · **`P-PD-SM-4`** (the register row `S-PD-LISTENER-1`, 12 = 4 listener shapes × 3 event arms) — the listener delta,
 *     the fan-out and the delivered-values read of the same turn. With it leave its TWELVE cells: the file's register
 *     literal moves `91 = 12+9+9+8+8+12+18+15` → `79 = 12+9+9+8+8+18+15` and its row count `8` → `7`. The composition's
 *     "registers nothing" half — the only half that was ever a property of the composition rather than of the turn — is
 *     driven by `M-4` and by `M-PDV-4` in `tests/store-modules-seams.test.ts` (`hosts`'), which keep it.
 *
 * **AND THE COUNT MOVES BY EXACTLY FOUR** — the four collected rows (three `it`s and one `it.each`), with the twelve
 * table cells they carried — which is the number `D-168`'s authority books and §8 of the design states.
 * ══════════════════════════════════════════════════════════════════════════════════ */

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
    expect(crossing.calls, 'the release\'s write is the route call').toEqual([{ id: PANE_ID, geometry: { height: 240 } }])
    // **THE DRAG ADDRESS ACROSS THE WHOLE GESTURE**: two whole-member writes, the last one winning, and the release's own
    // ending after its file commit — the family absent once the gesture is over.
    expect(crossing.dragCalls, 'two moves, two `commitDrag`s naming the composition\'s pane').toEqual([
      { id: DEFAULT_PANE_ID, geometry: { height: 120 } },
      { id: DEFAULT_PANE_ID, geometry: { height: 140 } },
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
    // **NO RENDER TURN RAN, ON THE DELIVERED FAMILY OR ANYTHING ELSE** (`D-168`): the surface has none to run, and the
    // source double — which could record a layout call — records none for the whole lifecycle. That is the absence this
    // row now measures where it used to measure a render, and the CONTROL is that the recorder is live.
    expect(source.calls, 'no turn in this lifecycle rendered a zone').toEqual([])
    source.layout(ZONE_ID, 300, 'block')
    expect(source.calls.length, 'CONTROL: the source double does record a layout call when one is made').toBe(1)

    // no throw escapes ANY turn (the whole lifecycle above ran without one — asserted turn by turn; two more gestures
    // exercise the abandon terminal twice):
    w.move('g2', { value: 90 })
    expect(crossing.dragFamily(), 'the second gesture wrote the address').toEqual({ [PANE_ID]: { height: 90 } })
    // **THE ABANDON TERMINAL IS `cancel`** (`D-168`: `rightClick` was the same call and is DELETED).
    w.cancel('g2')
    expect(crossing.dragFamily(), 'the erase turn ended the family at its address, not a closure value').toBeNull()
    w.move('g3', { value: 80 })
    expect(crossing.dragFamily(), 'and a third gesture writes it again').toEqual({ [PANE_ID]: { height: 80 } })
    w.cancel('g3')
    expect(crossing.dragFamily(), 'and the cancel terminal ends it too').toBeNull()
    expect(crossing.clears.length, 'one ending per terminal: the release\'s own, then one per abandon turn — three').toBe(3)
    // AND THE READS ANSWER THE SHAPE, NEVER THE DOUBLED STORE: two more gestures later, the family's figure is still 240.
    expect(w.startSizeOf(paneFixture, PANE_ID), 'the shape is the ONE read authority across the whole lifecycle').toBe(240)
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
    crossing.seed(PANE_ID, { height: 240 })
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
    expect(crossing.calls, 'and ONE route call, made inside that invocation').toEqual([{ id: PANE_ID, geometry: { height: 240 } }])
    // **THE ONE ORDERED TURN, READ ON THE ROUTE LOG**: the move's write to the ADDRESS, then the file commit, then the
    // release's own ending — and no second file commit anywhere.
    expect(crossing.dragCalls, 'the move wrote the drag address once').toEqual([{ id: DEFAULT_PANE_ID, geometry: { height: 100 } }])
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
   *  carrying the authored `props` the runtime emits as bare attributes — `140`/`{20,260}` here, figures the
   *  `['panes']` record below does NOT carry. **IT IS NOW A COUNTER-FIGURE AND NO LONGER A SECOND ANSWER**
   *  (`F11`, `D-129`): the example seams that read these attributes (`startSizeOf`, `boundsOf`) were deleted
   *  with the props they read, so the element states a size the gesture cannot consult at all — which is the
   *  property clause (1) measures by ABSENCE, over the module's own code. */
  const authoredPane = (attributes: Record<string, string>) => ({
    getAttribute: (name: string): string | null => (name in attributes ? attributes[name]! : null),
  })
  const handleIn = (id: string, authored: Record<string, string>) => ({ id, parentElement: authoredPane(authored) })

  // `D-117` wires the live gesture onto the composition, and THIS ROW is the wiring's own evidence: the pre-drag size
  // and the bounds pair answer `['panes']` where the element's attributes say something else. It gates because the row
  // is authored after the `D-30` sweep and states what the wiring must do, not what the old path did.
  // strata:gates — `D-117`: the wiring's own read, which no marked row in this file states
  it('D-117/LIVE-READ: for ONE element whose authored pane says `size 140`/`{20,260}` and whose `[\'panes\']` record says `320`/`{10,400}`, the COMPOSITION answers the record, a pane the family does not name answers the crossing\'s MEASURED DEFAULT rather than the attribute, and the EXAMPLE-SEAM read of those attributes is GONE — `startSizeOf`, `boundsOf` and their one private reader `numberFrom` occur nowhere in `demo-envelope.ts`\'s code (`F11`)', () => {
    const { w, crossing } = compose()
    // THE DELIVERY: a pane the family now names, at figures the authored attributes do not carry.
    crossing.seed('gutter-pane', { height: 320, bounds: { min: 10, max: 400 } })
    const element = handleIn('gutter-pane', { size: '140', min: '20', max: '260', resizable: 'true' })

    // (1) THE COMPOSITION\'S TWO ANSWERS OVER THAT ELEMENT — the property `D-117` moved — AND THE RETIRED CONTROL
    //     INVERTED INTO THE ABSENCE IT MEASURED. The pair of `seams.startSizeOf`/`seams.boundsOf` assertions that
    //     stood here retired WITH THEIR SUBJECT (`F11` deleted both members and the props they read), and what
    //     replaces them is the claim they were the control FOR: no reader of the authored attributes survives in
    //     the module, read over COMMENT-ELIDED code so a docblock that merely NAMES the retired pair can neither
    //     satisfy nor redden it (`D-93`'s rule, `D-169`'s `M-4` form, `D-29`).
    expect(w.startSizeOf(element, undefined), 'the COMPOSITION answers the family\'s record').toBe(320)
    expect(w.boundsOf(element, undefined), 'and the composition\'s pair is the record\'s, handed through AS STORED').toEqual({ min: 10, max: 400 })
    const envelopeCode = commentElided(readModuleSource('src/shared/demo-envelope.ts'))
    expect(envelopeCode.length, 'the elided module is not empty — the elider is not swallowing the file').toBeGreaterThan(0)
    for (const gone of ['startSizeOf', 'boundsOf', 'numberFrom']) {
      expect(scanForToken(envelopeCode, gone), `the example carries no \`${gone}\` any more — the authored attributes have no reader left to answer them (\`F11\`)`).toBe(false)
    }
    // **THE PLANTABLE CONTROL, IN THE FORM THE ROW ALREADY CARRIES AT CLAUSE (5)**: the same scanner over a synthetic
    // string spelling the DELETED shapes — the two seams and the `numberFrom` fallbacks they read — fires on all
    // three, so each `false` above is a fact about the module and not a detector that cannot see anything.
    const plantedDeletedPair = "startSizeOf: (el) => numberFrom(paneOf(el), 'size', 100), boundsOf: (el) => ({ min: numberFrom(paneOf(el), 'min', 0) })"
    for (const gone of ['startSizeOf', 'boundsOf', 'numberFrom']) {
      expect(scanForToken(commentElided(plantedDeletedPair), gone), `the positive control for \`${gone}\``).toBe(true)
    }
    expect(scanForToken(commentElided(`// ${plantedDeletedPair}`), 'numberFrom'), 'and a comment is not a member (the elision control)').toBe(false)

    // (2) THE MISS ARM IS THE CROSSING'S DEFAULT AND NOT THE ELEMENT'S FALLBACK: the ids differ, so the element's own
    //     `140` — a figure no reader in the tree consults any more (clause (1)) — cannot answer, and the composition
    //     answers `100` instead.
    const unnamed = handleIn('gutter-vertical', { size: '140', min: '20', max: '260', resizable: 'true' })
    expect(w.startSizeOf(unnamed, undefined), 'and the composition answers the MEASURED DEFAULT — the family names no such pane, and the default is the crossing\'s (`DEFAULT_PANE_SIZE`)').toBe(DEFAULT_PANE_SIZE)
    expect(w.boundsOf(unnamed, undefined), 'the same arm for the pair').toEqual({ min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max })

    // (3) THE ID IS THE CALLER\'S OWN MAPPING (`paneIdOf`): an element with no id falls back to the TOKEN, and
    //     that id reaches the family — so the read is not keyed by an element lookup this wiring invented.
    expect(w.startSizeOf({ parentElement: authoredPane({ size: '140' }) }, 'gutter-pane'), 'the token names the pane the family records').toBe(320)

    // (4) AND THE COMMIT IS THE CROSSING\'S ROUTE, with the CALLER\'S own recorder as its SINK, in that order — the sink is
    //     NOT a write of the authored status node (`D-164` deleted that write, and the read-out is the DELIVERY\'s,
    //     `renderPaneSize`) — and the release then ends the drag\'s OWN reading of the address.
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
      { id: DEFAULT_PANE_ID, geometry: { height: 220 } },
    ])
    expect(crossing.dragCalls, 'the move before it wrote the address').toEqual([{ id: DEFAULT_PANE_ID, geometry: { height: 180 } }])
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

describe('THE REGISTER TOTALS — 79 declared attempts, printed with their terms', () => {
  it('the register rows\' drive tables sum to the declared 79 = 12 + 9 + 9 + 8 + 8 + 18 + 15 — `P-PD-SM-4`\'s TWELVE cells retired with its subject (`D-168`, 2026-11-09), which is the whole of what this literal moved', () => {
    const declared: Record<string, number> = {
      'P-PD-IM-1': 12,
      'P-PD-IM-2': 9,
      'P-PD-SM-1': 9,
      'P-PD-SM-2': 8,
      'P-PD-SM-3': 8,
      'P-PD-TP-1': 18,
      'P-PD-TP-2': 15,
    }
    const sum = Object.values(declared).reduce((a, b) => a + b, 0)
    expect(sum).toBe(79)
    expect(Object.keys(declared).length, 'SEVEN register rows: the eighth retired with its subject').toBe(7)
    expect(Object.keys(declared).includes('P-PD-SM-4'), 'and the retired id is not a row here (`D-168`)').toBe(false)
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
    'P-PD-TP-1': 'S-PD-FUNCTIONS-1',
    'P-PD-TP-2': 'S-PD-DEGRADE-1',
  }
  const declaredTerms: Record<string, number> = {
    'P-PD-IM-1': 12, 'P-PD-IM-2': 9, 'P-PD-SM-1': 9, 'P-PD-SM-2': 8,
    'P-PD-SM-3': 8, 'P-PD-TP-1': 18, 'P-PD-TP-2': 15,
  }
  // eslint-disable-next-line no-console
  console.log(
    'REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS: 79 = 12 (P-PD-IM-1) + 9 (P-PD-IM-2) + 9 (P-PD-SM-1) + 8 (P-PD-SM-2) + 8 (P-PD-SM-3) + 18 (P-PD-TP-1) + 15 (P-PD-TP-2) — P-PD-SM-4 retired with its subject (D-168)'
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