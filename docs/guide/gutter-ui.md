# `U-GUTTER-UI` (`E10`) — the provident-authored gutter affordance and the wiring that attaches it

This page is for a developer who wants a draggable gutter — a resize handle that an agent can also
see and drive — without authoring one, and for a fork author who is replacing this repo's example
seams with their own. The unit is `U-GUTTER-UI`, wave `E`, ledger row `E10`; its landed record is
the `## DONE — U-GUTTER-UI` section of `docs/next-steps.md`. The one-line answer (LEGACY app path): an authored
provident card supplies the handle, `src/shared/gutter-affordance.ts` turns real pointer events into
previews and one committed value, and the renderer wiring attaches it from the producing graph —
whereas the CURRENT store-backed flow (`demo/pane-drag-demo/`) uses TS pane records + `createPaneDrag(store, { layout })`
with NO authored envelope card and NO `Runtime` (see the STORE-WAVE SCOPING BANNER above).

**⟶ STORE-WAVE SCOPING BANNER (`2026-10-04`, read this page beside `docs/FORKER.md` §4's
`### THE STORE-BACKED DRAG + GUTTER FEATURES`):** the flow BELOW — the transient inline `width`
preview, the `state-slice` write to the authored `GUTTER_STATUS_ID` status node, the MCP
`runtime.nodeState(GUTTER_STATUS_ID)` read-back — is the **LEGACY app wiring** (`startGutterAffordance`
+ `demo-envelope.ts`). **The CURRENT store-backed flow** (the `demo/pane-drag-demo/` 50/50 live suite)
differs on exactly the four points this banner names:
- **The preview is a STORE TEMP WRITE**, not an inline style — `temp.drag.<gid>.placement`, FIRST
  preview = `commit` (the mint) then `set` per move, and the page's layout (zone-2 width + gutter
  position) is a pure function of the store-carried size (temp while dragging, the FILE value
  otherwise). The module's `applyPreview` seam remains only for the legacy path. (GU-1)
- **THE one write per gesture end is the FILE-TIER COMMIT** — `commit('file.settings.pane.<id>.size',
  final)` — ONE file commit, the temp parked (the single-sink channel). There is NO status-node
  `state-slice` in the store flow (the pane-drag composition also hard-codes the `pane-a` tenant
  on release). (GU-2)
- **The abandon/reset is TEMP-REMOVAL-WITH-FILE-REASSERT**, not a revert write — right-click/cancel
  does `remove('temp.drag.<gid>.placement')`: ZERO commits, ZERO sink writes, ZERO revert writes; the
  temp erases and the FILE original reasserts on the next layout pass. The "visible revert … one
  revert write" rows below describe the LEGACY module-side reset only. (GU-3)
- **The committed-value read-back is the STORE TIERS** (`file.settings.pane.<id>.size` /
  `mem.layout.pane.<id>.size`, `{found, value}` answers) — the MCP status-node read-back is the
  legacy path only. (GU-4)

**⟶ LEDGER + CITATION UPDATES (`2026-10-04`):** the ledger is now **`30 DONE / 0 open` UNITS = 30**
(`## DONE — U-STORE-SECURITY`, the ledger's thirtieth row) — not 21 (GU-6); the sibling pages
`docs/guide/gutter.md` and `docs/guide/seams.md` both EXIST and are linked froM `docs/guide/README.md`
(GU-7).

## What it is

`U-GUTTER-UI` is the **UI half of the panes/zones family**. The mechanism half (`U-GUTTER`, `E3`)
owns the clamp and the commit discipline and reads no coordinate; the `U-GUTTER-UI` module owns the
**coordinate**, the **hover cursor**, the **mid-drag preview**, the **visible revert** on the invalid
and drop arms, and the per-gesture record. It composes the `E3` controller and, through it, the
frozen gesture session (`U-GSESSION`, `E6`) — and it adds no second writer and no second gesture
authority (`docs/specs/gutter-ui.md` §1 items 1–6, §2.6 item 1).

It is **not** a UI author. The affordance the reader sees is provident **envelope data** — authored
nodes and handler-body strings in `src/shared/demo-envelope.ts` — and the module's own bytes create
no element, resolve no selector and carry no cursor, axis or unit vocabulary of their own
(`docs/specs/gutter-ui.md` §2.2 `P-1`, §1 item 7; the project-wide provident-authoring constraint in
`AGENTS.md`).

The unit's third piece is **bounded renderer wiring**: `startGutterAffordance(runtime)` constructs
the session and the controller, resolves the affordance and target elements from the producing graph,
attaches, and owns the two presentation seams. Its licence inside `src/renderer/**` is exactly the
five named roles of `docs/specs/gutter-ui.md` §2.1 item 8 (`§R.1`); the shell chrome and the
preload/MCP surface stay outside the unit's scope (§5.1).

Everything the module does is **declared and total**: no member throws for any argument, every
absent or non-callable or throwing seam reaches a named degradation, and the per-gesture record is
discarded at every terminal (`docs/specs/gutter-ui.md` §2.3, `§R.3`, §3.3 `I-7`).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/gutter-affordance.ts` | values `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource`; types `GutterAffordance`, `GutterAffordanceOptions`, `GutterAffordanceStats`, `EventSourceLike`, `PointerPosition`, `PointerResolver`, `PreviewState`, `CursorOf`, `SizeFromPointer`, `AxisOf`, `ApplyPreview`, `ApplyCursor`, `StartSizeOf`, `BoundsOf`, `ResizableOf`, `Commit`, `MoveTypeOf` (that is the whole surface: `3` value exports + `17` type declarations = `20` names, `docs/specs/gutter-ui.md` `§R.3`) |
| `src/shared/demo-envelope.ts` | `gutterSeamExample()`, `demoEnvelope()`, `GUTTER_AFFORDANCE_ID` (`'gutter-vertical'`), `GUTTER_TARGET_ID` (`'gutter-target'`), `GUTTER_STATUS_ID` (`'gutter-status'`) — the authored gutter card, the three ids, and this repo's ONE example implementation of the eleven caller seams |
| `src/renderer/renderer.ts` | `startGutterAffordance(runtime)`, type `GutterWriteReading` — the wiring (five roles) |
| `src/renderer/runtime.ts` | `Runtime.elementForNodeId(id)` — the one graph read the wiring owes (`docs/specs/gutter-ui.md` `§R.2` `R-9`) |
| `tests/gutter-ui.test.ts` | the unit's own `84` rows: the register, the seam/degradation rows, the gate-4 regression rows. Non-exported helpers there (`RecordingSource`, `moduleSource`) are the file's, not the module's |

Module-local and deliberately **not** exported: `resolveEventPointer`, `resolvePointerPosition`,
`pointerPair`, `seamAnswer`, `sizeClampedFor`, `preRevert`-building helpers, and the per-gesture
`DragRecord` (`src/shared/gutter-affordance.ts`; `docs/specs/gutter-ui.md` `§R.3`).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/gutter-ui.md` | §1 | the scope and the five named boundaries |
| `docs/specs/gutter-ui.md` | §2.1 | the surface, the export/import census, the nine clauses, the `attach` cell |
| `docs/specs/gutter-ui.md` | §2.2 | what is caller-supplied, and the prohibitions `P-1`…`P-10` |
| `docs/specs/gutter-ui.md` | §2.3 | the drag-state machine, the transition rows, the terminal write table |
| `docs/specs/gutter-ui.md` | §2.4 | the one coordinate read and the value chain |
| `docs/specs/gutter-ui.md` | §2.5 | the preview channel, which is never the sink |
| `docs/specs/gutter-ui.md` | §2.6 | the composition seam, the cursor, the withdrawn capture decision |
| `docs/specs/gutter-ui.md` | §3.1, §3.2, §3.3 | the `M-*` state rows, the `F-*` fail-states, the `I-*` invariants |
| `docs/specs/gutter-ui.md` | §3.4 `R-1` | the by-name export census (a twenty-first name fails it) |
| `docs/specs/gutter-ui.md` | §5.1, §5.2 | the diff scope (allow list and denied set) and the seven legs |
| `docs/specs/gutter-ui.md` | §5.U | the capped delta matrix (`U-1`…`U-8`) the live read-back is judged by |
| `docs/specs/gutter-ui.md` | `§R.1`, `§R.2`, `§R.3` | who constructs it, from which file, by what command; the eleven seams as downstream contract; the normative seam + degradation tables |
| `docs/specs/gutter.md` (`E3`) | §0 ruling 1, §2.1 seam 6, §2.4, §3.2 `F-11` | the composed controller, the single sink, and the absorbed throwing sink |
| `docs/specs/gsession.md` (`E6`) | §2.5 | the frozen delegate surface and the consumer-side value channel |
| `docs/specs/user-flow-audit.md` | §6.1, §6.2 | the structured coverage report and its read-only audit |
| `AGENTS.md` | "Project-wide constraint (UI rendering)" | why the affordance is envelope data and not hand-written DOM |

## Use cases

**UC-1 — I want a working resize handle in my own Electron app, without authoring one.** You author
(or keep) an envelope card carrying a handle, a target and a status node, then wire the module into
your `main()` the way `src/renderer/renderer.ts` does: resolve from the graph, construct the session
with a non-forwarding channel, pass the eleven seams, attach, and let the composed controller be the
only writer (`docs/specs/gutter-ui.md` `§R.1` items 1/2, §2.1 item 8).

**UC-2 — I must replace the example seams with mine.** The eleven caller seams are the family's
**downstream contract**: a fork imports the module's exported seam types and implements them with its
own axis vocabulary, cursor strings, bounds, resizability policy and commit route. The demo's closures
are an implementation, never the contract (`docs/specs/gutter-ui.md` `§R.2`, `§R.3`).

**UC-3 — I need to verify my wiring without a window.** Drive the module over caller-supplied doubles:
a recording event source, plain-object elements, a real session over the same source, synthetic
events, and read `stats()` beside `controller.stats()`. This is the layer the unit's own rows run at
(`docs/specs/gutter-ui.md` §5.2 leg 1, `§5.U`; `tests/gutter-ui.test.ts`), and it proves call counts,
never a rendered geometry.

**UC-4 — the agent (or I) must see the committed size.** The one write route is a `state-slice` write
to the authored **status** node — deliberately a peer of the handle, so the element the listeners are
on is not re-rendered — and the wiring keeps each write's runtime answer so a refusal is a visible
reading. Read it back through the existing MCP surface (`docs/specs/gutter-ui.md` §2.1 item 8(v),
§2.5 item 5, §2.6 item 5).

## Code, runnable

```ts
// UC-1 — a fork's own boot wiring: graph-resolved elements, one session, one sink
import { Runtime } from './runtime.js'
import { createGestureSession, POINTER_TYPES } from '../shared/gesture-session.js'
import { createGutterAffordance, domEventSource } from '../shared/gutter-affordance.js'
import {
  demoEnvelope, gutterSeamExample,
  GUTTER_AFFORDANCE_ID, GUTTER_TARGET_ID, GUTTER_STATUS_ID,
} from '../shared/demo-envelope.js'

export function startMyGutter(runtime: Runtime): { readonly attached: boolean } {
  const element = runtime.elementForNodeId(GUTTER_AFFORDANCE_ID)   // the handle
  const target = runtime.elementForNodeId(GUTTER_TARGET_ID)        // the pane the preview moves
  const seams = gutterSeamExample()
  const source = domEventSource()
  const session = createGestureSession({
    source: source as never,
    // the session's own channel is NOT the sink: it records and writes nothing
    commit: (): void => undefined,
  })
  const affordance = createGutterAffordance({
    session: session as never,
    source,
    element,
    target,
    sizeFromPointer: seams.sizeFromPointer,
    pointerOf: seams.pointerOf,
    axisOf: seams.axisOf,
    cursorOf: seams.cursorOf,
    applyPreview: (state): void => {
      // the demo's own preview is one transient inline `width` on `target`; yours may differ
      void state
    },
    applyCursor: (el, declaration): void => {
      void el
      void declaration
    },
    startSizeOf: seams.startSizeOf,
    boundsOf: seams.boundsOf,
    resizableOf: seams.resizableOf,
    // MUST be the session's own token: a non-empty string registers the module's move listener
    moveTypeOf: (): unknown => POINTER_TYPES.move,
    // THE ONE SINK — the composed controller invokes it; the module never does
    commit: (_gesture, value): void => {
      runtime.applyCommand({
        kind: 'state-slice',
        node: GUTTER_STATUS_ID,
        mutation: [{ targetProp: 'content', mode: 'replace', value: String(value) }],
      })
    },
  })
  const attached = affordance.attach()
  return { attached }
}

// in your main(): const runtime = new Runtime({ mount, envelope: demoEnvelope() })
//                   runtime.bootstrap(); startMyGutter(runtime)
// attached: true  — every delegation succeeded (a false rolls the module's own registrations back;
//                   a delegation the composed controller already took is completed by `detach()`)
```

```ts
// UC-2 — your own eleven seams, typed by the module's exported types
import { Runtime } from './runtime.js'
import {
  createGutterAffordance, cursorDeclarationFor, domEventSource,
  type AxisOf, type BoundsOf, type Commit, type CursorOf,
  type PointerPosition, type PointerResolver, type ResizableOf,
  type SizeFromPointer, type StartSizeOf, type ApplyPreview, type ApplyCursor,
} from '../shared/gutter-affordance.js'
import { GUTTER_AFFORDANCE_ID, GUTTER_TARGET_ID, GUTTER_STATUS_ID } from '../shared/demo-envelope.js'
import { POINTER_TYPES, createGestureSession } from '../shared/gesture-session.js'

// my vocabulary: an authored axis token -> my cursor declaration
const axisOf: AxisOf = (element): unknown =>
  (element as { getAttribute?: (n: string) => string | null } | null | undefined)?.getAttribute?.('axis') ?? undefined
const cursorOf: CursorOf = (token): unknown => ({ cursor: token === GUTTER_AFFORDANCE_ID ? 'col-resize' : 'row-resize' })

// my arithmetic and my bounds policy
const sizeFromPointer: SizeFromPointer = (pointer, start): number => pointer.x - start
const startSizeOf: StartSizeOf = (): number => 100
const boundsOf: BoundsOf = (): { min: number; max: number } => ({ min: 0, max: 480 })
const resizableOf: ResizableOf = (): boolean => true

// my coordinate read: a non-object / partial / non-finite answer returns null and the move is INVALID
const pointerOf: PointerResolver = (event): PointerPosition | null => {
  const holder = event as { clientX?: unknown; clientY?: unknown } | null | undefined
  const x = holder?.clientX
  const y = holder?.clientY
  if (typeof x !== 'number' || typeof y !== 'number') return null
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null
  return { x, y }
}

// my single sink route
const commit: Commit = (_gesture, value): void => {
  runtime.applyCommand({
    kind: 'state-slice',
    node: GUTTER_STATUS_ID,
    mutation: [{ targetProp: 'content', mode: 'replace', value: String(value) }],
  })
}
const applyPreview: ApplyPreview = (state): void => {
  const pane = runtime.elementForNodeId(GUTTER_TARGET_ID) as { style?: { width?: string } } | null
  if (pane?.style) pane.style.width = `${String(state.value)}px`
}
const applyCursor: ApplyCursor = (element, declaration): void => {
  const handle = element as { style?: Record<string, unknown> } | null
  if (handle?.style) handle.style['cursor'] = declaration === undefined ? '' : declaration
}

export function myGutter(runtime: Runtime): { readonly attached: boolean } {
  const source = domEventSource()
  const session = createGestureSession({ source: source as never, commit: (): void => undefined })
  const affordance = createGutterAffordance({
    session: session as never,
    source,
    element: runtime.elementForNodeId(GUTTER_AFFORDANCE_ID),
    target: runtime.elementForNodeId(GUTTER_TARGET_ID),
    sizeFromPointer, pointerOf, axisOf, cursorOf, startSizeOf, boundsOf, resizableOf, commit,
    applyPreview, applyCursor,
    moveTypeOf: (): unknown => POINTER_TYPES.move,
  })
  const attached = affordance.attach()
  return { attached }
}

// the resolver beside it is total, and it reads an OWN property only:
cursorDeclarationFor({ cursor: ' col-resize ' })            // 'col-resize'  (trimmed)
cursorDeclarationFor(Object.create({ cursor: 'col-resize' }))// undefined     (a prototype member)
cursorDeclarationFor({ cursor: '   ' })                      // undefined
```

```ts
// UC-3 — verify the wiring headlessly: doubles, synthetic events, counters
import { createGestureSession, POINTER_TYPES } from '../shared/gesture-session.js'
import { createGutterAffordance, type EventSourceLike } from '../shared/gutter-affordance.js'

interface Entry { readonly element: unknown; readonly type: string; readonly handler: (event: unknown) => void }

/** THE CALLER'S OWN SOURCE DOUBLE — the pattern `tests/gutter-ui.test.ts` uses (its `RecordingSource`). */
function recordingSource(entries: Entry[]): EventSourceLike & { fire(type: string, event: unknown): number } {
  return {
    on(element, type, handler): void { entries.push({ element, type, handler }) },
    off(element, type, handler): void {
      const at = entries.findIndex((e) => e.element === element && e.type === type && e.handler === handler)
      if (at >= 0) entries.splice(at, 1)
    },
    fire(type, event): number {
      const hits = entries.filter((e) => e.type === type)
      for (const hit of hits) hit.handler(event)
      return hits.length
    },
  }
}

export function driveHeadless(): {
  readonly attached: boolean
  readonly repeatAttach: boolean
  readonly cursorWrites: number
  readonly lastCursor: string
} {
  const entries: Entry[] = []
  const source = recordingSource(entries)
  const handle = { name: 'handle' }        // plain-object doubles: no DOM is involved at this layer
  const pane = { name: 'pane' }
  let previews = 0
  const session = createGestureSession({ source: source as never, commit: (): void => undefined })
  const affordance = createGutterAffordance({
    session: session as never,
    source,
    element: handle,
    target: pane,
    sizeFromPointer: (pointer, start): unknown => pointer.x - start,
    axisOf: (): unknown => 'gutter-vertical',
    cursorOf: (): unknown => ({ cursor: 'col-resize' }),
    applyPreview: (): void => { previews += 1 },
    applyCursor: (): void => undefined,
    startSizeOf: (): unknown => 100,
    boundsOf: (): unknown => ({ min: 0, max: 200 }),
    resizableOf: (): unknown => true,
    moveTypeOf: (): unknown => POINTER_TYPES.move,
    commit: (): void => undefined,
  })
  const attached = affordance.attach()
  const repeatAttach = affordance.attach()          // a repeat attach is the pinned no-op
  source.fire('pointerover', { clientX: 10, clientY: 10 })
  source.fire('pointerdown', { button: 0, clientX: 10, clientY: 10 })
  source.fire(POINTER_TYPES.move, { clientX: 175, clientY: 300 })
  source.fire(POINTER_TYPES.end, { clientX: 175, clientY: 300 })
  const stats = affordance.stats()
  const controllerStats = affordance.controller.stats()
  void controllerStats.sinkCalls
  void previews
  return { attached, repeatAttach, cursorWrites: stats.cursorWrites, lastCursor: stats.lastCursor }
}

// attached: true · repeatAttach: false (§2.3 row 3, pinned by tests/gutter-ui.test.ts's `I-3` row)
// cursorWrites: 1 and lastCursor: 'col-resize' for one declaring hover (§2.1 item 5, `M-10`)
// this layer proves CALL COUNTS over doubles — never a rendered geometry, an applied style or a
// real pointer (§5.U item 1; `RCA-12`'s layer rule)
```

```ts
// UC-4 — read the committed size back: the wiring's record, and the agent's view
import { Runtime } from './runtime.js'
import { startGutterAffordance, type GutterWriteReading } from './renderer.js'
import { GUTTER_STATUS_ID } from '../shared/demo-envelope.js'

export function bootAndInspect(runtime: Runtime): {
  readonly attached: boolean
  readonly writes: readonly GutterWriteReading[]
} {
  const gutter = startGutterAffordance(runtime)
  // gutter.attached — true once the affordance is live
  // gutter.writes  — one entry per commit write, each carrying the runtime's OWN answer:
  //   { node: 'gutter-status', value: '<the clamped value, as the state-slice writes it>', status: 'applied' }
  //   a refused write is recorded with status: 'rejected' (and logged), never silently dropped
  const nodeState = runtime.nodeState(GUTTER_STATUS_ID)
  // nodeState: { nodeId, states, census } — the authored status node's own `content` is the read-back
  return { attached: gutter.attached, writes: gutter.writes }
}

// with the app running (`npm start`), from a second shell — the commands the live record used:
//   npm run mcp -- --target http --port 3787 targets
//   npm run mcp -- --target http --port 3787 html
//   node scripts/mcp-cli.mjs --target http --port 3787 node-state gutter-status
// observed there (docs/specs/gutter-ui-live-battery.md): the affordance resolves as node-12
// (cssId = propsId = 'gutter-vertical'), the authored status node is node-14, and after a drag the
// status node's content carries the committed value (`U-5`: 145 = 200 - 55), with the handle's
// element identity held across the write (`U-8`(e)(1) PASS).
```

## What it refuses / does not do

- It never writes to the sink: the `commit` seam is handed to the composed controller and the module
  calls it nowhere (`docs/specs/gutter-ui.md` §2.6 item 1, `§R.3`'s `commit` row).
- It authors no UI: no created element, no selector, no markup, no class, no attribute and no authored
  style (`docs/specs/gutter-ui.md` §2.2 `P-1`, §5.1's renderer constraint). A renderer edit that
  hand-writes DOM is a review finding.
- It installs no pointer **capture** — `capturePointer` is declared and ignored, and no `capture`
  field is passed anywhere (§2.6 item 4, §3.3 `I-13`); the need is recorded as an `E3`-side owed item
  (§8).
- It reads the coordinate in **one** place and carries no event reference in its pointer record — no
  target, no button, no gesture identity (`docs/specs/gutter-ui.md` §2.4, §2.1's `PointerPosition`).
- It keeps no element-keyed store and re-expresses no lifecycle: one per-gesture record at most,
  discarded at every terminal; no session member is referenced by name (`§2.2` `P-5`, §2.3,
  `docs/specs/gsession.md` §2.5).
- It does not own the clamp or the commit policy — that is the composed `E3` controller
  (`docs/specs/gutter.md` §2.1 seam 6, §2.4) — and it never re-attaches or rebinds: after a post-boot
  re-derivation the affordance is inert until reload, and it throws nothing (§2.3 row 16, §7 item 15).
- It does not grow: a twenty-first exported name of any kind fails the census row (§3.4 `R-1`(b),
  `§R.3`).

## What a fork must supply

The eleven caller seams below are **the family's downstream contract** (`docs/specs/gutter-ui.md`
`§R.2`, ruled in `docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`).
`gutterSeamExample()` in `src/shared/demo-envelope.ts` is this repo's ONE example implementation of
them. The degradation in each row is the declared one, cited at its own cell — a seam row without a
citation would be a review finding.

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `sizeFromPointer` | REQUIRED | the fork | a non-number answer reaches `clampToBounds` ⇒ the move is INVALID ⇒ the reset arm (`§R.3` `sizeFromPointer`) | the same arm — the module's total seam read answers "absent" for both (§3.1 `M-20` 2nd drive) | absorbed by that total read ⇒ same arm (`§R.3` degradation-class table; §3.2 `F-1`/`F-6`) |
| `axisOf` | REQUIRED | the fork | an `undefined` token ⇒ the cursor seam is refused (no write), and `E3`'s bounds/default/resizability seams see the same `undefined` (`§R.3` `axisOf`; `docs/specs/gutter.md` §2.4) | same arm (§3.1 `M-20` 2nd drive) | absorbed ⇒ same arm |
| `cursorOf` | REQUIRED | the fork | `cursorDeclarationFor` answers `undefined` ⇒ no cursor write and `stats().lastCursor` stays `''` (`§R.3` `cursorOf`) | same arm | absorbed ⇒ no write |
| `applyPreview` | REQUIRED | the fork | no preview is written; `stats().previews` does not move (`src/shared/gutter-affordance.ts`'s `writePreview`) | same arm | the throw PROPAGATES from the module's own turn; the record is discarded (§3.2 `F-8`, `§R.3`) |
| `applyCursor` | REQUIRED | the fork | no cursor write or clear happens (`src/shared/gutter-affordance.ts`) | same arm | the throw PROPAGATES; the clear never happens for that hover (§3.2 `F-8`) |
| `startSizeOf` | REQUIRED | the fork | a non-number ⇒ the reset's clamp yields `NaN` ⇒ the reset is refused with zero sink writes (`§R.3` `startSizeOf`) | same arm | absorbed ⇒ same arm |
| `boundsOf` | REQUIRED | the fork | an unusable pair ⇒ `clampToBounds` answers `NaN` ⇒ the move is INVALID ⇒ the reset arm (`§R.3` `boundsOf`) | same arm | absorbed ⇒ same arm |
| `resizableOf` | REQUIRED | the fork | a falsy answer ⇒ `E3` short-circuits every terminal: zero commits, zero previews, the gesture still establishes (`§R.3` `resizableOf`, §3.1 `M-16`) | same arm | absorbed ⇒ same arm |
| `commit` | REQUIRED | the fork | nothing is written at the committing terminal — this seam is the only sink route, and no second writer exists (`§R.3` `commit`; `docs/specs/gutter.md` §3.2 `F-11`) | same arm | the composed `E3` **absorbs** it: `sinkCalls` `1` beside `written` `0` (`docs/specs/gutter.md` §2.4, §3.2 `F-11`) |
| `pointerOf` | OPTIONAL | the fork | the module's own total `resolveEventPointer` is used (`§R.3` `pointerOf`) | the module's total gate answers `null` ⇒ the move is INVALID (§3.2 `F-1`/`F-6`) | the throw is absorbed by that gate — it never escapes the module's turn |
| `moveTypeOf` | OPTIONAL | the fork | no move listener is attached; the session's own wrapped move turn is the only move turn (§3.1 `M-18`, §2.3 rows 2/8) | same arm | absorbed ⇒ same arm. **A token that is not the session's own fails `§3.4` `R-14`** |

Beyond the seams, `GutterAffordanceOptions` carries four REQUIRED inputs the wiring supplies —
`session`, `source`, `element`, `target` — plus the OPTIONAL `isDragValid` veto (only an exact
`false` marks a drag INVALID) and the declared-and-ignored `capturePointer`
(`src/shared/gutter-affordance.ts`; `docs/specs/gutter-ui.md` §2.1 items 3/5, §2.6 item 4).

## Gotchas measured in this repo

### Expectations — what a consumer most often gets wrong about this composition

- **The affordance COMPOSES the controller — it does not accept one.** Your **session** is a REQUIRED
  argument and is yours; the controller is built by the module and exposed, and the contract **requires**
  that direction (`docs/specs/gutter-ui.md` §2.1 clause 4, §2.1's `attach` cell, §3.1 `M-6`; the ACTIVE row
  `E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY`). Handing it a controller you built is not a missing
  composition; it is blocked by the element/ledger identity refusal — **and a refused `attach()` rolls the
  module's OWN listeners back and answers `false`, displacing nothing** (§2.1's `attach` cell; `docs/specs/gsession.md`
  §2.4 item 2).
- **Element identity is preserved across a PATCH write — and a full graph re-derivation is OUT OF
  CONTRACT.** A `state-slice` apply patches the element in place, so the affordance is multi-shot and no
  rebind is owed; a post-boot re-derivation tears the graph down, the wiring does not re-attach, and the
  affordance goes **inert (no gesture, no cursor, no preview)** with no throw (`docs/specs/gutter-ui.md`
  §2.3 row 15 and **row 16**, §7 item 15, §3.3 `I-15`). Do not re-derive during a gesture — write through
  the managed patch channel or defer the reveal.
- **The preview is the consumer's channel and is never the sink; `sizeFor` is read once, at the
  committing terminal, and the per-move push is the caller's `onMove` handle** (`docs/specs/gutter-ui.md`
  §2.5, §2.6 item 1; `docs/specs/gutter.md` §2.3 item 2(b) and §2.5). The affordance's own `applyPreview`
  seam is where your presentation write goes, with the degradation declared at its own row.
- **A member's own cell/slot geometry is YOURS to measure.** This composition owns the coordinate, the
  cursor and the preview — never a box for a zone or a pane (`docs/specs/gutter-ui.md` §2.4; and the
  family-side refusal at `docs/specs/zones.md` §2.3 item 7, §3.3 `I-10`, §4.4 `S-6`).

- **The authored pane's data is emitted as BARE attributes, not `data-*`.** `props: { size, min, max,
  resizable }` lands on the element as `size="100" min="0" max="200" resizable="true"`, so the example
  seams read `getAttribute('size')` with a `dataset` fallback (`src/shared/demo-envelope.ts`'s
  `attributeOf`); the live battery measured `dataset = { wire, nodeId }` only — an earlier
  `dataset[...]`-only read missed every time and every seam answered its fallback (whose values
  happened to match the authored ones) (`docs/specs/gutter-ui-live-battery.md` `L-6`, reading `A5`;
  ADV-GU-7).
- **Do not pass the example's `moveTypeOf` through to the module.** `gutterSeamExample().moveTypeOf`
  answers `undefined` (its own `GUTTER_MOVE_TYPE`), and the module registers its move listener **only
  for a non-empty string token**; the shipped wiring therefore supplies `POINTER_TYPES.move` itself
  (`src/renderer/renderer.ts`, `src/shared/demo-envelope.ts`, `src/shared/gutter-affordance.ts`;
  `§R.3`'s `moveTypeOf` row, `§3.4` `R-14`).
- **The module's `POINTER_TYPES` import is unreferenced in the landed bytes** (grep the module: the
  binding appears on the import line only), so no module-side move-type fallback exists despite the
  prose around `§2.1` item 9; the close-out records it as an owed ruling with nothing removed pending
  it (`docs/next-steps.md`, the `U-GUTTER-UI` close-out pointer, item (b)).
- **Two counters count different things.** `stats().previews` counts seam **invocations** — a
  non-finite value or an absent `applyPreview` leaves it unmoved (the ADV-GU-12 fix) — while
  `stats().cursorWrites` moves as soon as a **declaration is resolved**, before the `applyCursor`
  callability check (`src/shared/gutter-affordance.ts`; `docs/specs/gutter-ui.md` §3.1 `M-11`).
- **The commit target is a peer node, not the handle.** The one write is `state-slice` on the authored
  status node's id (`GUTTER_STATUS_ID`); writing the handle's own node is the named re-render hazard.
  The landed wiring also keeps `{node, value, status}` per write, because an earlier form discarded a
  `{status:'rejected'}` answer and turned a refused write into a silent no-op
  (`src/renderer/renderer.ts`; `docs/specs/gutter-ui.md` §2.1 item 8(v), §2.5 item 5).
- **`elementForNodeId` is attribute-walk-only and total**: it resolves engine `nodeId` → authored
  `css.id` → authored `props.id`, walks the live mount's `data-node-id` attributes with no selector,
  `closest`, `querySelector*` or element creation, and answers `null` for an empty or unresolvable id
  (`src/renderer/runtime.ts`; `docs/specs/gutter-ui.md` `§R.2` `R-9`). The wiring resolves once, at
  boot, immediately after `runtime.bootstrap()`.
- **The handle's own box has to be wide enough to hold a drag**: with no capture opt-in the session's
  tracking listeners are local, and an earlier revision's handle measured `w=0, h=44` — hit-testing
  could not land on it. The authored card gives it `width: '200px'` and it is hit-testable live at
  `200×44` (`elementFromPoint` → `node-12`) (`src/shared/demo-envelope.ts`'s `handleStyle`;
  `docs/specs/gutter-ui-live-battery.md`; `docs/next-steps.md` `## DONE — U-GUTTER-UI` clause (12)).
- **A real OS-level mouse press reaching the composition is `unverified` here.** The live record
  reports that a CDP `Input.dispatchMouseEvent mousePressed` at the handle's box centre produced no
  effect, and the committed-value readings were taken by driving the element's own listeners with
  untrusted `PointerEvent`s; the three `MANUAL OPERATOR` rows (`U-3`, `U-4`, `U-6`) remain owed to a
  session with a human at the window. This page ran no live session — would be settled by an operator
  pass following `docs/specs/user-flow-audit.md` §6.1's rows.
- **A node-suite green is envelope-layer evidence.** The unit's `84` rows and the trio prove pure
  call-count behaviour over doubles and the shim — never a window, a rendered geometry, an applied
  style or an IPC round-trip; the assembled-layer evidence is the live battery's own
  (`docs/next-steps.md` `## DONE — U-GUTTER-UI` clause (6); `RCA-12`).

## See also

- `docs/guide/README.md` — the index, the two readers and the reading order.
- `docs/guide/00-base-surface.md` — the MCP tool set and dispatch path the UC-4 read-back uses.
- `docs/guide/gutter.md`, `docs/guide/seams.md` — the sibling pages `README.md` lists (not yet written);
  the mechanism half's contract is `docs/specs/gutter.md` (`U-GUTTER`, `E3`).
- `docs/specs/gutter-ui.md` — this unit's contract (`§R`/`§R.1`–`§R.3` carry the gate-1 repairs, the
  seam ruling and the normative seam table).
- `docs/specs/gsession.md` (`U-GSESSION`, `E6`) — the frozen delegate surface this unit composes.
- `docs/specs/gutter-ui-greens.md`, `docs/specs/gutter-ui-live-battery.md` — the blind greens set and
  the mandatory live battery's readings.
- `docs/specs/user-flow-audit.md` §6.1/§6.2 — the coverage report and its read-only audit.
- `docs/next-steps.md` — the `## DONE — U-GUTTER-UI` record, and the ledger (`21 DONE / 0 open`).
