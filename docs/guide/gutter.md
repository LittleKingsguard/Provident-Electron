# `U-GUTTER` — the resize controller: injected readings in, one clamped commit out

You are starting an Electron app on this baseline, you have a pane whose width a user drags, and
you want the value to reach your own code exactly once, already narrowed into your own bounds —
without this layer owning a coordinate, a default or an opinion about what is being resized.
That is unit **`U-GUTTER`** (wave **E**, ledger row **`E3`**, closed — `docs/next-steps.md`'s
`## DONE — U-GUTTER`), and the answer is one `src/shared` module: a resize controller composed on
the landed gesture session, plus the pure `clampToBounds`.

## What it is

`U-GUTTER` is the **policy-free clamp-and-commit layer** of the panes/zones family. It owns the
arithmetic between readings it is handed and the one write it is permitted: a value read once at a
gesture's terminal, narrowed through `clampToBounds` over a caller-supplied bounds pair, and handed
to a caller-supplied sink at most once per gesture (`docs/specs/gutter.md` §1 item 1, §2.3 item 1).

It owns **no lifecycle**. The session it composes — `U-GSESSION`, `docs/specs/gsession.md` — establishes,
tracks and terminates every gesture; this module forwards your four hooks into the session's own
install path, reads the session's state through its own members only, and calls it through a frozen,
enumerated delegate surface (`docs/specs/gutter.md` §2.5 item 1). It re-expresses none of that
lifecycle and becomes no second gesture authority (§2.5 item 3).

It owns **no policy**. There is no default bound, no default size, no axis vocabulary, no unit
string, no threshold, no store and no census read in its bytes: every one of those arrives as an
injected seam or an injected argument (§2.2, §1 item 3). The only arithmetic it performs is
`clampToBounds`'s one formula, and the only write it performs is one call into the sink it was handed.

It owns **no magnitude, and that is a named cost, not an omission** (§1 item 2, §7 item 2). The
controller never sees an event object and reads no coordinate; the value is CONSUMER-PRODUCED — you
compute it in your own `onMove` and push it with `gesture.set(value)`, and this module reads that
value at the terminal (§2.3 item 1). What a local handler buys is origin *reachability*, not
magnitude-equivalence, and no page or pass may claim a drag here produces a size.

It owns **no UI**. The rendered drag affordance — the only place a coordinate source could live — is
a separate unit (`U-GUTTER-UI`, ledger row `E10`), which composes this module rather than amending
it (§1 item 5, §2.6 item 7). This module authors no element, text, class, attribute or stylesheet.

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/gutter.ts` | value: `createResizeController`, `clampToBounds` · type: `AxisFor`, `BoundsFor`, `ClampBounds`, `CommitSink`, `DefaultSizeFor`, `IsResizable`, `ResizeController`, `ResizeControllerHandle`, `ResizeControllerOptions`, `ResizeStats` — **two value exports and ten type declarations, twelve names** (§2.1) |
| `tests/gutter.test.ts` | the unit's own rows (a fact measured by one is cited where it is used) |
| `src/shared/gutter-affordance.ts` | the in-tree consumer (`U-GUTTER-UI`): value-imports `clampToBounds` and `createResizeController`, and publishes `domEventSource`, `createGutterAffordance`, `cursorDeclarationFor` |
| `src/renderer/renderer.ts` | `startGutterAffordance` — the demo wiring that builds the session and attaches the affordance |

`ResizeCode` and `ResizeResetResult` are deliberately **not** exports: the module declares them
module-locally, and a consumer reads the codes as string literals off `reset(element)`'s inferred
return and `stats().lastCode` (`src/shared/gutter.ts`; `docs/specs/gutter.md` §2.1's corrected
census). The module's only import statement is a type-only import of `./gesture-session.js` (§2.1,
§0A note 2).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/gutter.md` | §1 items 1–3, 5 | the scope, the named cost, and what this unit is not |
| `docs/specs/gutter.md` | §2.1 | the surface: every exported name, signature, return shape, and the seven seams with `capture` absent |
| `docs/specs/gutter.md` | §2.2 | what is caller-supplied, and the eleven prohibitions `P-1`–`P-11` |
| `docs/specs/gutter.md` | §2.3 | the value-source chain, the evaluation order, the write-count clause (`reset` codes at item 4) |
| `docs/specs/gutter.md` | §2.4 | the seven named safe defaults, and the four consumer-callable throw paths |
| `docs/specs/gutter.md` | §2.5 | the composition boundary: the call census, one controller per session, the reset entry point |
| `docs/specs/gutter.md` | §3.1–§3.3 | the happy states, the documented fail-states (`F-*`), the invariants (`I-*`) |
| `docs/specs/gutter.md` | §5.2, §6, §7 | the declared legs and refusals, the stop conditions, the honest statements |
| `docs/specs/gsession.md` | §2.5 | the frozen delegate surface this unit composes |

## Use cases

**UC-1 — I already know the number and the pair; I want one total function.** You hold a desired
width from your own arithmetic and a pane's `{min, max}`; you want the narrowing in one pure call
that has no refusal domain and never throws, so a stale or hostile input becomes `NaN` rather than
an exception in your event handler (`docs/specs/gutter.md` §2.3 item 2, §2.4 item 1).

**UC-2 — wire one resize handle so exactly one clamped value reaches my sink.** You construct the
session with your own source and a non-forwarding commit recorder, compose the controller over it
with your four policy seams, `attach` your element with the hooks, and let your own `onMove` push
the value you computed. At the terminal you want exactly one `commit(gesture, clamped)` call and a
counter reading you can trust (`docs/specs/gutter.md` §2.3 item 3, §2.5 item 1).

**UC-3 — give the invalid-release and drop-revert paths a surface.** When a release is not a valid
resize, you want the pane to go back to the pre-drag size you hold — clamped, committed at most
once, and distinguishable from a cancel — through the controller's own `reset(element)` entry point,
whose answer is a record rather than a throw (`docs/specs/gutter.md` §2.3 item 4, §2.5 item 5).

**UC-4 — replace or omit a seam and know exactly what degrades.** You are a fork author: maybe you
have no session yet, maybe your bounds source can throw. You need the declared outcome for each
seam's absent, non-callable and throwing states before you write the wiring
(`docs/specs/gutter.md` §2.4 items 1–2).

## Code, runnable

```ts
// UC-1 — narrow a value you computed into your own pair
import { clampToBounds } from '../shared/gutter.js'

const pair = { min: 120, max: 480 }

const narrowed = clampToBounds(600, pair)        // 480 — the formula, over your two numbers
const unknown = clampToBounds('600', pair)       // NaN — a non-number value is gated, never coerced
const noPair = clampToBounds(300, undefined)     // NaN — a non-number bound is gated too
const mapPair = clampToBounds(300, new Map([['min', 0], ['max', 100]])) // NaN — not a pair of fields

const negativeZero = clampToBounds(-0, { min: -0, max: 480 })
// Object.is(negativeZero, -0) === true; with { min: 0, max: 480 } the same call answers +0
```

```ts
// UC-2 — one handle, one consumer-produced value, one clamped commit
import type { Runtime } from '../renderer/runtime.js'
import { createGestureSession } from '../shared/gesture-session.js'
import type { GestureHandle } from '../shared/gesture-session.js'
import { domEventSource } from '../shared/gutter-affordance.js'
import { createResizeController } from '../shared/gutter.js'

export function wirePaneResize(
  runtime: Runtime,
  handleNodeId: string,
  preDragSize: number,
): { readonly attach: boolean; readonly writes: number[]; readonly controller: ReturnType<typeof createResizeController> } {
  const writes: number[] = []
  const element = runtime.elementForNodeId(handleNodeId)

  const session = createGestureSession({
    source: domEventSource(),
    // the session's own channel records and writes nothing — no second writer exists (§2.5 item 4)
    commit: (): void => undefined,
  })

  const controller = createResizeController({
    session,
    axisFor: () => 'inline',                          // any token YOU decide on; never interpreted here
    boundsFor: () => ({ min: 120, max: 480 }),
    defaultSizeFor: () => preDragSize,                // clamped and used only by reset(element)
    isResizable: () => true,                          // evaluated once per gesture, at establishment
    sizeFor: (_element, gesture: GestureHandle) => gesture.value,
    commit: (_gesture, value: number) => { writes.push(value) },
  })

  let dragged = preDragSize
  const attach = controller.attach(element, {
    onMove: (gesture: GestureHandle) => {
      dragged = dragged + 60          // your own arithmetic — this module reads no coordinate
      gesture.set(dragged)
    },
  })

  return { attach, writes, controller }
}
// attach: true
// one user drag from 320 that ends on `dragged = 600`:
//   writes: [480]                    — clamped into your pair, written at the terminal, once
//   controller.stats(): { attached: 1, gestures: 1, sinkCalls: 1, written: 1, resets: 0, lastCode: 'ok' }
```

```ts
// UC-3 — the invalid-release / drop-revert path, and the reset record you read back
// (uses `wirePaneResize` from UC-2, in scope in your own module)
import type { Runtime } from '../renderer/runtime.js'

export function revertPaneToPreDrag(runtime: Runtime, handleNodeId: string, preDragSize: number): void {
  const { controller } = wirePaneResize(runtime, handleNodeId, preDragSize)
  const element = runtime.elementForNodeId(handleNodeId)

  // an active, resizable gesture whose default is usable: ONE clamped commit of your pre-drag size
  const committed = controller.reset(element)
  // { ok: true, code: 'ok', committed: true }
  // and your sink received the CLAMPED default (320 into the 120..480 pair)

  const noGesture = controller.reset(element)
  // { ok: false, code: 'no-gesture', committed: false } — no active gesture, zero session calls
  void noGesture
  // with `isResizable: () => false` on the active gesture:
  //   { ok: false, code: 'not-resizable', committed: false }        (zero session calls)
  // with no `defaultSizeFor` seam, or one that returns a non-number:
  //   { ok: false, code: 'unusable-default', committed: false }     (zero session calls)
  // every code the session itself returns arrives verbatim; 'ok', 'not-installed', 'busy', 'disposed',
  // 'disconnected', 'stale' and 'no-gesture' are the session's domain, and this module adds no member to it
}
```

```ts
// UC-4 — what you get when a seam is missing: the declared degradation, as data
import { createResizeController } from '../shared/gutter.js'

const inert = createResizeController()          // no session supplied at all
const element = {}

inert.attach(element)    // false — nothing was delegated
inert.stats()            // { attached: 0, gestures: 0, sinkCalls: 0, written: 0, resets: 0, lastCode: 'ok' }
inert.reset(element)     // { ok: false, code: 'no-gesture', committed: false }
inert.detach()           // false
inert.detached           // false
// a throwing `boundsFor` is the one degradation that PROPAGATES, not the one that is swallowed:
// drive an `end` terminal with `boundsFor: () => { throw new Error('boom') }` and the throw reaches
// the caller of the terminal, while stats() reads sinkCalls: 0 and your element stays installed
```

## What it refuses / does not do

- **No coordinate, no event object, no drag arithmetic, no magnitude** — a named, recorded cost
  (`docs/specs/gutter.md` §1 item 2, §2.2 `P-1`/`P-8`, §7 item 2).
- **No bound, no default size, no axis vocabulary, no unit string, no selector, no threshold** — you
  supply every one of them (§1 item 3, §2.2 `P-5`, §0A note 4).
- **No listener and no capture opt-in of its own**: `capture` is absent from the options and from
  what it passes to the session, so *no capture before establishment* is inherited and observed
  (§2.2 `P-3`/`P-7`, §0A note 7).
- **No session lifecycle of its own**: it never calls `session.begin`, `end` or `cancel`, attaches no
  listener, owns no window and no disposal order, and never becomes a second writer (§2.2 `P-4`,
  §2.5 items 1/3).
- **No census read and no sibling import** other than the type-only session import: a `sizes`-style
  value can only reach it as an argument to your own closures (§2.2 `P-9`/`P-10`, §2.5 item 2).
- **No store, no persistence, no cache, no module-level state**; the per-gesture record is discarded
  at every terminal and only the instance counters persist (§2.2 `P-6`, §2.3 item 5).
- **No UI content and no MCP surface**: no element, text, class, attribute or stylesheet; `stats()`
  is a module method, not an agent-reachable tool or resource (§1 item 5, §3.4 `R-11`, §7 item 11).
- **No rendered-geometry claim, and no measurement leg offered in which one could be made** — it
  reads no coordinate and has no importer of its own, so nothing rendered is asserted here (§5.2,
  §7 items 4/6).
- **It cannot see a second controller**: the mechanism keeps no shared registry and no module of this
  unit refuses or reports on that account — the composition rule carries that requirement, and a
  second writer is caught by a count instead of a check (§2.5 item 4).
- **It does not read the gesture's value back from the handle at the terminal** — the committed value
  is carried by the sink's own argument (§2.3 item 4 clause 8).
- **`detach()` refuses when more than one element is attached to it**, because the session is shared
  and detaching on behalf of one control would detach the others (§2.1's `detach` cell, §7a.1 item 2).

## What a fork must supply

All seven seams are declared optional on `ResizeControllerOptions` (`src/shared/gutter.ts`), and each
has a named safe default, so nothing here throws for want of a seam (`docs/specs/gutter.md` §2.4
item 1). `session` is the one whose absence makes the whole controller inert — supply a session you
constructed yourself with `createGestureSession`, since this module constructs none.

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `session` | OPTIONAL in the type; the only one whose absence disables everything | the fork (constructed via `createGestureSession`) | a valid but inert controller: `attach ⇒ false`, declared refusals, zeroed stats, no throw (§2.4 item 1; §3.2 `F-16`) | an unusable member set is the same inert reading (§2.4 item 1; §0A note 9) | a throwing accessor is read totally ⇒ the same inert reading, never a throw (§2.4 item 3; §3.2 `F-16`) |
| `axisFor` | OPTIONAL | the fork | the token is `undefined`, passed on opaquely (§2.4 item 1) | the token is `undefined` (§2.4 item 1) | swallowed: token `undefined`, the gesture still establishes (§2.4 item 2 row 1) |
| `boundsFor` | OPTIONAL | the fork | unusable ⇒ the clamp answers `NaN` ⇒ no sink write (§2.4 item 1) | it is never invoked; the named safe default answers ⇒ no sink write (§2.4 item 3's asymmetry) | **PROPAGATES** to the caller of the terminal, with zero writes on that path (§2.4 item 2 row 4) |
| `defaultSizeFor` | OPTIONAL | the fork | `reset` refuses `'unusable-default'` with zero session calls; the active gesture is untouched (§2.4 item 1, item 2 row 3) | same refusal (§2.4 item 3's asymmetry) | swallowed ⇒ same refusal, zero session calls (§2.4 item 2 row 3) |
| `isResizable` | OPTIONAL | the fork | not resizable; the gesture establishes and ends normally with zero writes (§2.4 item 1) | reached and read once, its `TypeError` swallowed ⇒ not resizable, zero writes (§2.4 item 5's shape table) | swallowed ⇒ not resizable, zero writes, and the outcome is not a cancel (§2.4 items 1/2) |
| `sizeFor` | OPTIONAL | the fork | `undefined` ⇒ `sinkCalls === 0`, and it is **not** a cancel (§2.4 item 1) | guarded on callability: never invoked, nothing propagates, zero writes (§2.4 item 3's asymmetry) | **PROPAGATES** to the caller of the terminal, zero or exactly one write — never two (§2.4 item 2 row 4) |
| `commit` | OPTIONAL | the fork | the slot-empty composition attaches and terminates normally with zero writes, while the session still reports `committed: true` (§2.3 item 3; §3.2 `F-10`) | treated as absent: no write site, zero writes (§2.3 item 3) | counted as an attempt and never retried: `stats().sinkCalls` is `1` while `stats().written` is `0` (§2.4 item 1; §3.2 `F-11`) |

The four per-control hooks (`onStart`, `onMove`, `onEnd`, `onCancel`) are all optional too and travel
into the session unchanged — the controller adds no fifth hook and computes no value in them (§2.2,
§2.3 item 3).

## Gotchas measured in this repo

- **`clampToBounds` answers `NaN` — it does not refuse and does not throw.** `NaN` is a value here, and
  there is no `ok`, `code` or `reason` on it (`docs/specs/gutter.md` §2.3 item 2, §0A note 8; measured
  this pass: `'600'` ⇒ `NaN`, `undefined` bounds ⇒ `NaN`, a `Map`-shaped pair ⇒ `NaN`).
- **`-0` survives only when it is the formula's own answer**: `clampToBounds(-0, { min: -0, max: 480 })`
  answers `-0` under `Object.is`, while `{ min: 0, max: 480 }` makes the answer `+0` (§2.3 item 2's
  `-0` rule; measured this pass).
- **`ResizeCode` and `ResizeResetResult` are not importable** — the reset codes are read as string
  literals off the record and `stats().lastCode` (`src/shared/gutter.ts`; `docs/specs/gutter.md` §2.1's
  corrected census).
- **The code domain is nine members**: the session's seven, propagated verbatim, plus the two
  controller-local codes `'unusable-default'` and `'not-resizable'`, which are emitted only on paths
  where the session is never called (§2.3 item 4's table, §2.4 item 4). A reset whose bounds are
  unusable is neither of them: it answers `{ ok: false, code: 'ok', committed: false }` — the session's
  terminal ran and nothing was written (§2.3 item 4 clause 3; measured this pass).
- **On the inert controller, `reset(element)` answers `code: 'no-gesture'` without updating
  `stats().lastCode`**, which still reads `'ok'` (measured this pass; the record's `code` is the
  reading to use, `src/shared/gutter.ts`).
- **`attach` is first-config-wins per element**: a repeat `attach` on the same element returned `false`
  and delegated nothing, while a second element attaches normally (measured this pass: `attached` `2`).
- **`detach()` answers `false` with two elements attached and makes no session call**; with one
  attached it delegates `session.dispose()` and answers `true` only when the session reported
  `complete === true` (measured this pass; §2.1's `detach` cell, §7a.1 item 2).
- **`detached` is permanent once `detach()` completes**, and it also reads `true` when the session
  reports `disposed === true` — after which `attach` and `detach` short-circuit with zero session calls
  (measured this pass: `attach` after `detach` ⇒ `false`; `src/shared/gutter.ts`, `§2.1`'s `detached` cell).
- **A throwing `boundsFor` propagates out of the gesture terminal while `stats()` leaves `sinkCalls`
  at `0`** and the element stays installed (§2.4 item 2 row 4; measured this pass: the throw reached
  the caller of the terminal, the sink record stayed empty).
- **A throwing sink does not propagate**: `stats().sinkCalls` read `1` beside `stats().written` `0`
  (measured this pass; §2.4 item 2's column-`(c)` universal, §3.2 `F-11`).
- **`src/shared/gutter.ts` now has an in-tree importer**: `src/shared/gutter-affordance.ts` value-imports
  `clampToBounds` and `createResizeController` (`docs/next-steps.md`, `## DONE — U-GUTTER` clause 3).
- **Naming variance between the spec block and the landed module**: `docs/specs/gutter.md` §2.1's code
  block writes the value-source seam as an exported `SizeFor` type, while the landed module declares
  that seam inline on `ResizeControllerOptions` as `sizeFor?: (element, gesture, axis) => unknown` and
  exports no `SizeFor` name (`src/shared/gutter.ts`). The export table above names only the landed
  names; whether the spec intends an exported `SizeFor` is **unverified** in this pass — it would be
  settled by a census read of `src/shared/gutter.ts`'s exports against §2.1's block.
- **The live event that produces the session's `cancel` terminal is not exercised on this page** —
  `cancel ⇒ zero commits and zero sink writes` is the clause this unit is bound by
  (`docs/specs/gutter.md` §2.3 item 3), while the terminal's trigger belongs to the session
  (`docs/specs/gsession.md` §2.3 item 4). **unverified** here; it would be settled by driving the
  session's own documented cancel path.

## See also

- [`relocate.md`](relocate.md) — `U-RELOCATE`, the sibling composed on the same frozen session.
- [`gutter-ui.md`](gutter-ui.md) — `U-GUTTER-UI`: the rendered affordance that composes this module.
- [`zones.md`](zones.md), [`container.md`](container.md) — the other panes/zones mechanisms.
- [`seams.md`](seams.md) — every seam in the closed wave in one table.
- [`00-base-surface.md`](00-base-surface.md) — the MCP tool set and dispatch path this layer does not touch.
- The contracts: `docs/specs/gutter.md`, `docs/specs/gsession.md`, `docs/specs/gutter-review.md`.
