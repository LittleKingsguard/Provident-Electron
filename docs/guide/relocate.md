# `U-RELOCATE` — the node-local relocate/drop session, composed on the landed gesture session

You are building an Electron app on the `provident-ssr` prebuild baseline and you have a
draggable pane (or tab, or card) and some zones it could be dropped into. You do not want to
re-implement drag bookkeeping, and you do not want the framework guessing what "near enough"
means for your layout. **`U-RELOCATE` (wave `E`, ledger row `E4`) is the module that takes your
measurements and your policies and answers the two questions a drop needs: is this observation
inside your proximity, and what exactly gets written when the gesture ends.** It ships as
`src/shared/relocate.ts` — two runtime exports (`createRelocateSession`, `withinProximity`) plus
eight type declarations — and it is a *mechanism you wire*, not a wired-in feature: no `src/**`
file imports it today.

## What it is

It is the **policy shell around a drop decision**. It owns the order in which your callbacks are
consulted, the one comparison against your threshold, which of its own channels a given write
belongs to, and the single sink write a gesture gets. Everything that is a *decision* — which
candidates are near, which one is chosen, what the reveal state is, what the pre-drag value was —
is injected by you as a seam. The module ships no default for any of them.

It is **composed on the frozen gesture session** (`src/shared/gesture-session.ts`,
`docs/specs/gsession.md` §2.5) rather than alongside it. The session remains the only thing that
attaches listeners, establishes a gesture and runs a terminal; this module reads the session it is
handed and delegates `install`, `reset` and `dispose` to it (`docs/specs/relocate.md` §2.5 item 1).
You pass a session in as an option — the module never imports the session factory.

It is **node-local and geometry-free**. It never sees an event object, a coordinate, a bounding
box or a CSS value, and it computes no distance: the distance is *your* measurement, travelling
beside your opaque candidate inside the answer your `candidatesFor` closure returns. Its own
arithmetic is one exported pure total function — `withinProximity` — which is the same comparison
the composition uses internally, so your own "is this near?" code and the module cannot disagree
(`docs/specs/relocate.md` §2.3 item 1).

It carries **three channels as three different functions**: your durable reveal state write, your
per-move transient presentation channel (the ghost and the zone's show/hide), and the session's own
reset terminal for an out-of-range release (`docs/specs/relocate.md` §2.3 item 4). It declares **no
code of its own**: refusals either propagate the session's code verbatim or are returned as a
record on paths where the session is not called (`docs/specs/relocate.md` §2.4 item 5).

What it deliberately is not: it publishes no MCP tool or resource, keeps no store, persists
nothing, authors no DOM, and makes no claim about what is rendered. The ghost's position, the
expanded zone's box and the perceived revert are **not verified anywhere in this repo** — a fact the
unit records rather than hides (`docs/specs/relocate.md` §5.2, §7 items 4/5).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/relocate.ts` | `createRelocateSession(options?)`, `withinProximity(distance, threshold)`; types `CandidateFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`, `RelocateOptions`, `RelocateSession`, `RelocateStats`, `RelocateTargetFor` — **2 value exports + 8 type declarations = 10 exported names**, and nothing else (`RelocateResetResult`, the record `reset(element)` returns, is **not** exported) |
| `src/shared/gesture-session.ts` | the frozen session it composes: `createGestureSession(options?)`, `POINTER_TYPES`, `installGestureListeners`, `detachGestureListeners`; types `GestureElement`, `EventSource`, `GestureOptionsInput`, `GestureOptions`, `GestureHandle`, `SessionOptions`, `SessionStats`, `GestureStats` |
| `tests/relocate.test.ts` | the unit's own rows (the landed table drives the contract's states, fail-states and property register) |
| `docs/specs/relocate.md` | the contract; `docs/specs/relocate-greens.md` is its blind-scenario set |

The module's whole import census is one type-only statement —
`import type { GestureHandle } from './gesture-session.js'` — and it holds no module-level mutable
state (`docs/specs/relocate.md` §2.1 item 4; measured: `grep` finds no `src/**` file importing
`relocate`, so the mechanism has no in-tree consumer and appears in none of the build outputs — the
build half is the close-out record's measurement in `docs/next-steps.md`, `## DONE — U-RELOCATE`
clause 6, which I did not re-run).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/relocate.md` | §2.1 items 1–4 | the export census, the seven-seam options object with its declared status and degradation, the factory signature, the member surface and the import census |
| `docs/specs/relocate.md` | §2.1 item 7 | the hooks record's `preDragValueOf` member and its no-caller-value refusal |
| `docs/specs/relocate.md` | §2.3 items 1–5, 7, 9 | the one comparison's rule, the distance's transport, the `threshold` reconciliation, the three channels, the mid-drag monotonicity rule, the evaluation order, the pre-drag value's capture point and the reset arity |
| `docs/specs/relocate.md` | §2.4 items 1–5 | the seven named safe defaults, the throw dispositions per seam class, the candidate answer's field-by-field degradation, the total member-read rule and the no-invented-code rule |
| `docs/specs/relocate.md` | §2.5 items 1–7 | the composition boundary: the closed session call set, the handle channel, the write site, the session's terminal order and the pinned terminal hook |
| `docs/specs/relocate.md` | §3.1 / §3.2 / §3.3 | the valid states, the documented fail-states (including the positive controls that must fail) and the invariants |
| `docs/specs/relocate.md` | §5.2 | the four legs the unit runs, the three-part refusal of a real-DOM row, and gate 6's `STRUCTURAL` status |
| `docs/specs/relocate.md` | §7 items 2–5, 11 | the recorded honest limits: no coordinate/geometry claim, no capture, no rendered-state claim, no MCP surface |
| `docs/specs/gsession.md` | §2.5 | the frozen delegate list this module composes and re-expresses none of |
| `docs/decisions.md` | `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` (ACTIVE) | the referent of `threshold` |
| `docs/decisions.md` | `U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN` (ACTIVE) | the revealed zone's hide rule, and that displayed-ness is not monotonic in a gesture |
| `docs/decisions.md` | `E10-SINGLE-SINK-CHANNEL` (ACTIVE) | the single-sink-writer rule the composition must obey |
| `docs/decisions.md` | `SEAM-THROW-DISPOSITION-VALUE-READING-SEAMS-ABSORBED` (ACTIVE) | which seam classes absorb a throw and which two propagate |
| `docs/next-steps.md` | `## DONE — U-RELOCATE` | the landed record: the surface, the red/green chain, the leg figures and the two rows still owed |

## Use cases

**UC-1 — "a pane drag should commit a drop decision to my own state."** You have panes and zones,
you can measure how far a zone is from the pointer, and you want the drop recorded exactly once,
at the end of the gesture, with the target your policy chose. You supply the session, your
candidate closure, your resolver, your reveal write and your sink; the module owns the order and
the once-ness.

**UC-2 — "a drop outside every zone must revert to the pane's pre-drag value."** The pane must not
be left in a half-moved state when the user releases out of range. You supply `preDragValueOf` on
the per-control hooks record and a sink that receives it; the module takes the invalid arm from its
own move turn, while the gesture is still active.

**UC-3 — "Escape (or a toolbar button) must end the drag the same way an out-of-range release
does."** A consumer-driven cancellation has to take the same arm, with the same commit, rather than
inventing a second code path. You call `reset(element)` and read the returned record.

**UC-4 — "my ghost code and the module must agree on what 'near' means."** You want your own
preview/filtering logic to use the identical proximity rule the composition applies, without
duplicating a comparison. You call the exported pure `withinProximity`.

## Code, runnable

Every example below runs against the landed modules; the recording `source` object stands in for the
browser's pointer events so the examples are self-contained. The observed values in the trailing
comments were produced by driving the landed `src/shared/relocate.ts` and
`src/shared/gesture-session.ts`.

### UC-1 — one drop decision, written once at the terminal

```ts
// UC-1 — wire a pane drag so the drop decision lands in your own sink
import { createGestureSession } from '../src/shared/gesture-session.js'
import { createRelocateSession } from '../src/shared/relocate.js'
import type { CandidateFor, RelocateHandle } from '../src/shared/relocate.js'

// your side: record the handlers the session attaches, so this example can drive a gesture
const attached = new Map<string, () => void>()
const source = {
  on(_element: unknown, type: string, handler: () => void): void {
    attached.set(type, handler)
  },
  off(_element: unknown, type: string): void {
    attached.delete(type)
  },
}

const pane = { id: 'pane-A' } // an opaque element: the module only passes it through
const session = createGestureSession({ source }) // the wiring owns the session's own commit

const written: Array<{ outcome: string | null; value: unknown }> = []
const revealed: unknown[] = []
const states: unknown[] = []

const relocate = createRelocateSession({
  session,
  threshold: 24, // your measured proximity radius
  candidatesFor: (_element): readonly CandidateFor[] => [
    { candidate: { zoneId: 'B' }, distance: 12 }, // the distance is YOUR measurement
  ],
  resolveTarget: (_element, candidates) => candidates[0]?.candidate,
  onReveal: (target) => {
    revealed.push(target)
  },
  commit: (gesture, value) => {
    written.push({ outcome: gesture.outcome, value })
  },
  onPreview: (state) => {
    states.push(state)
  },
})

const hooks: RelocateHandle = {
  preDragValueOf: () => ({ height: 320 }), // what this pane looked like before the drag
  onEnd: () => {
    /* your own bookkeeping */
  },
}

relocate.attach(pane, hooks) // → true

attached.get('pointerdown')?.() // the session establishes the gesture
attached.get('pointermove')?.() // one observed move, inside proximity
attached.get('pointerup')?.() // the terminal

// Observed:
// written:  [{ outcome: 'end', value: { zoneId: 'B' } }]
// revealed: [{ zoneId: 'B' }]
// states:   [{ withinProximity: true, shown: { zoneId: 'B' }, hidden: undefined }]
// relocate.stats(): { attached: 1, gestures: 1, moves: 1, candidateCalls: 1, resolveCalls: 1,
//                     revealWrites: 1, revealWritesApplied: 1, resets: 0, sinkCalls: 1,
//                     written: 1, lastCode: 'ok' }
```

Two moves across **two different** zones read as a retarget — one presentation write carrying both
the old and the new candidate, and still exactly one reveal at the terminal:

```ts
// Observed for moves [zone A at 5] then [zone B at 7], then 'pointerup':
// states:   [{ withinProximity: true, shown: { zoneId: 'A' } },
//            { withinProximity: true, shown: { zoneId: 'B' }, hidden: { zoneId: 'A' } }]
// revealed: [{ zoneId: 'B' }]
// written:  [{ outcome: 'end', value: { zoneId: 'B' } }]
// stats():  moves: 2, candidateCalls: 2, resolveCalls: 2, revealWrites: 1, sinkCalls: 1
```

### UC-2 — an out-of-range move reverts, once, with your value

```ts
// UC-2 — releasing (or moving) outside every candidate takes the invalid arm
import { createGestureSession } from '../src/shared/gesture-session.js'
import { createRelocateSession } from '../src/shared/relocate.js'

const attached = new Map<string, () => void>()
const source = {
  on(_element: unknown, type: string, handler: () => void): void {
    attached.set(type, handler)
  },
  off(_element: unknown, type: string): void {
    attached.delete(type)
  },
}

const pane = { id: 'pane-A' }
const session = createGestureSession({ source })

const written: Array<{ outcome: string | null; value: unknown }> = []
const revealed: unknown[] = []
const states: unknown[] = []

const relocate = createRelocateSession({
  session,
  threshold: 24,
  candidatesFor: () => [], // no zone is near this move
  resolveTarget: () => undefined,
  onReveal: () => {
    revealed.push('reveal')
  },
  commit: (gesture, value) => {
    written.push({ outcome: gesture.outcome, value })
  },
  onPreview: (state) => {
    states.push(state)
  },
})

relocate.attach(pane, { preDragValueOf: () => ({ height: 320 }) })

attached.get('pointerdown')?.() // establishment: the pre-drag value is captured here
attached.get('pointermove')?.() // out of proximity: this IS the invalid arm
attached.has('pointerup') // → false: the session has already detached the tracking listeners

// Observed:
// written:  [{ outcome: 'reset', value: { height: 320 } }]  ← the CALLER's pre-drag value
// revealed: []                                              ← channel (A) reads zero on this arm
// states:   [{ withinProximity: false, shown: undefined }]
// relocate.stats(): { ..., resolveCalls: 0, revealWrites: 0, revealWritesApplied: 0,
//                     resets: 1, sinkCalls: 1, written: 1, lastCode: 'ok' }
```

### UC-3 — a consumer-driven reset (Escape) takes the same arm

```ts
// UC-3 — end an active drag as a reset, from your own code
import { createGestureSession } from '../src/shared/gesture-session.js'
import { createRelocateSession } from '../src/shared/relocate.js'

const attached = new Map<string, () => void>()
const source = {
  on(_element: unknown, type: string, handler: () => void): void {
    attached.set(type, handler)
  },
  off(_element: unknown, type: string): void {
    attached.delete(type)
  },
}

const pane = { id: 'pane-A' }
const session = createGestureSession({ source })

const written: Array<{ outcome: string | null; value: unknown }> = []

const relocate = createRelocateSession({
  session,
  threshold: 24,
  candidatesFor: (): readonly { candidate: unknown; distance?: unknown }[] => [
    { candidate: { zoneId: 'A' }, distance: 5 },
  ],
  resolveTarget: (_element, candidates) => candidates[0]?.candidate,
  onReveal: () => {
    /* no reveal on this arm */
  },
  commit: (gesture, value) => {
    written.push({ outcome: gesture.outcome, value })
  },
  onPreview: () => {
    /* the ghost channel is yours */
  },
})

relocate.attach(pane, { preDragValueOf: () => 320, onEnd: () => undefined })

attached.get('pointerdown')?.() // establish
attached.get('pointermove')?.() // at least ONE observed move: this is what captures the handle

const first = relocate.reset(pane)
// first:  { ok: true, code: 'ok', committed: true }
// written: [{ outcome: 'reset', value: 320 }]
// relocate.stats(): { ..., revealWrites: 0, resets: 1, sinkCalls: 1, written: 1, lastCode: 'ok' }

const second = relocate.reset(pane)
// second: { ok: false, code: 'no-gesture', committed: false }  ← the arm is sticky per gesture

const neverStarted = createRelocateSession() // no session at all: a valid but inert module
const inert = neverStarted.reset(pane)
// inert:  { ok: false, code: 'no-gesture', committed: false }
```

### UC-4 — the same proximity rule, used directly

```ts
// UC-4 — filter your own candidate list with the module's own comparison
import { withinProximity } from '../src/shared/relocate.js'
import type { CandidateFor } from '../src/shared/relocate.js'

const measured: readonly CandidateFor[] = [
  { candidate: { zoneId: 'A' }, distance: 10 },
  { candidate: { zoneId: 'B' }, distance: 24 }, // exactly ON the boundary
  { candidate: { zoneId: 'C' }, distance: 24.5 },
]

const threshold = 24
const near = measured.filter((record) => withinProximity(record.distance, threshold))
// near: [{ candidate: { zoneId: 'A' }, distance: 10 },
//        { candidate: { zoneId: 'B' }, distance: 24 }]   ← the boundary is INSIDE

withinProximity(24, 24) // true
withinProximity(24.5, 24) // false
withinProximity(NaN, 24) // false
withinProximity(-5, -1) // false — a finite negative operand is not a distance
withinProximity('12', 24) // false — no coercion, no parsing
withinProximity(-Infinity, -Infinity) // true — a non-finite operand reaches the comparison
```

## What it refuses / does not do

- **No coordinate, no event, no geometry, and no distance computation of its own.** The distance is
  your scalar, delivered inside your candidate answer; the module has no parameter through which an
  event object or a coordinate could arrive (`docs/specs/relocate.md` §1 item 2, §2.2 `P-1`, §7
  item 2).
- **No UI.** It authors no element, text, class, attribute, stylesheet, cursor or geometry; the
  ghost, the zone expansion and the visible revert are the consumer's writes (`docs/specs/relocate.md`
  §1 item 5, §2.2 `P-12`, §5.2).
- **No listener and no capture of its own.** Every attach is a `session.install` delegation, and it
  installs no capture opt-in — so a drag whose pointer leaves the moved element's box **loses its
  reading**, a limitation stated for forks (`docs/specs/relocate.md` §2.2 `P-3`/`P-7`, §7 item 3).
- **No second gesture authority.** It never calls `session.begin`, `session.end` or
  `session.cancel`, and never becomes a second writer on a channel the session owns
  (`docs/specs/relocate.md` §2.2 `P-4`, §2.5 items 1/3).
- **No default of any kind** — no default threshold, candidate set, target or reveal state
  (`docs/specs/relocate.md` §2.2 `P-8`, §2.4 item 1).
- **No code of its own.** Refusals propagate the session's own code verbatim, or are returned as a
  record on paths where the session is not called (`docs/specs/relocate.md` §2.4 item 5, §7 item 12).
- **No store, no persistence, no cache, no module-level state**, and nothing carries across a
  gesture boundary (`docs/specs/relocate.md` §2.2 `P-6`, §3.3 `I-9`).
- **No MCP or IPC surface.** `stats()` is a module method, not an agent-reachable one
  (`docs/specs/relocate.md` §7 item 11).
- **No rendered-geometry claim, and no real-DOM row.** The unit offers no `[U]` row and claims no
  `[D]` row, with its structural reason stated rather than excused
  (`docs/specs/relocate.md` §5.2, §7 items 4/5).

## What a fork must supply

Every seam in the factory options is declared **OPTIONAL**, because every one has a *named* safe
default; a composition that supplies none of them is the valid but inert module
(`docs/specs/relocate.md` §2.1 item 2, §2.4 item 1). In practice the session, your candidate closure
and your threshold are what make it do anything.

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `session` | OPTIONAL | the wiring — a `createGestureSession({ source })` instance | the valid-but-inert module (`docs/specs/relocate.md` §2.4 item 1) | read through the module's total member-read, degrading to unusable, never a throw (`§2.4` item 4) | absorbed; the read is total (`§2.4` items 2/4) |
| `candidatesFor` | OPTIONAL | your app policy (its closure returns your `CandidateFor[]`) | no candidates ⇒ the invalid arm at once (`§2.4` item 1) | an attempt — counted, never retried — and the invalid arm (`§3.2` `F-15`) | absorbed into the same arm (`§2.4` item 2) |
| `resolveTarget` | OPTIONAL | your app policy | `undefined` ⇒ a committing terminal writes nothing (`§2.4` item 1) | the same declared outcome (`§2.4` item 3) | absorbed into `undefined` (`§2.4` item 2) |
| `onReveal` | OPTIONAL | your durable reveal state | a zero-effect attempt: the invocation is counted (`§2.4` item 1) | an attempt, counted, with `revealWritesApplied` staying `0` (`§3.2` `F-17`) | absorbed at the module's own commit seam; never retried (`§2.4` item 2) |
| `commit` | OPTIONAL | your sink — the composition's single writer (`docs/decisions.md` `E10-SINGLE-SINK-CHANNEL`) | a no-writer composition: the write count reads `0` where `1` is required (`§2.4` item 1, `§3.2` `F-4`) | the same no-writer reading | **PROPAGATES** from the terminal turn, counted and never retried (`§2.4` item 2) |
| `threshold` | OPTIONAL | your measured radius (referent: `docs/decisions.md` `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`) | unusable ⇒ never within proximity ⇒ the invalid arm; no mechanism default exists (`§2.4` item 1) | n/a — it is never called; it is an operand class test (`§2.4` item 2) | n/a — same (`§2.4` item 2) |
| `onPreview` | OPTIONAL | your transient presentation channel (the ghost **and** the zone's show/hide) | no carrier: zero preview invocations, and every count row still holds (`§2.4` item 1) | the same zero-carrier reading | **PROPAGATES** from the observed-move turn, and the per-gesture record is discarded (`§2.4` item 2) |
| `preDragValueOf` — a member of the `attach` hooks record, **not** one of the seven seams (`§2.1` item 7) | OPTIONAL | your per-control record | reads `undefined`: nothing is invented, nothing throws (`§2.1` item 7(c)) | the same refusal — the reset's third argument reads `undefined` (`§2.1` item 7(c)) | absorbed; the arm is still taken, with arity three (`§2.1` item 7(c)) |

The two propagation arms are the *only* exceptions to the module's totality
(`docs/specs/relocate.md` §2.4 item 1's universal, in its own words).

## Gotchas measured in this repo

- **`reset(element)` is only accepted once the module has captured the handle from a move.** Called
  on a live gesture *before* any observed move it returns the session's own
  `{ ok: false, code: 'stale', committed: false }` (the handle is captured in the move wrapper), and
  the attempt is still counted (`stats().resets` increments). After at least one move the same call
  returns `{ ok: true, code: 'ok', committed: true }` with one sink write carrying your pre-drag
  value and zero reveals — and a second `reset(element)` for that gesture then reads
  `{ ok: false, code: 'no-gesture', committed: false }` (source: `src/shared/relocate.ts`'s
  `resetEntry` and `moveWrapper`; observed against the landed module; the contract's own rows are
  `docs/specs/relocate.md` §3.1 `M-13`).
- **A `reset(element)` that the session refuses still marks that gesture's arm as taken** — a later
  `reset(element)` returns `ok: false` and, when the handle has since been captured, behaves like a
  committing terminal (it writes the resolved target and fires `onReveal` once). The module's own
  comment on `resetEntry` says the refused entry is retryable, so **trust the measured reading**
  (source: `src/shared/relocate.ts`'s `resetEntry`, observed against the landed module).
- **Attaching two distinct elements wedges `detach()` forever.** `attach(a)` and `attach(b)` both
  return `true`, then every `detach()` returns `false` with no `dispose` delegation and `detached`
  stays `false` permanently (source: `src/shared/relocate.ts`'s `detach`, whose guard is
  `ledger.size !== 1`; the contract's row is `docs/specs/relocate.md` §3.1 `M-18`).
- **A non-callable `candidatesFor` still counts as an attempt.** With `candidatesFor: 42`, one
  observed move reads `candidateCalls: 1` (attempts, not invocations) while `resolveCalls` stays `0`
  (source: `src/shared/relocate.ts`'s `seek`; `docs/specs/relocate.md` §3.2 `F-15`).
- **`onReveal` receives the resolved target as *both* arguments.** The module invokes it as
  `(target, decision)` and its call site passes the last resolved target for each (source:
  `src/shared/relocate.ts`'s `reveal`; observed `[{ zoneId: 'B' }, { zoneId: 'B' }]` for one target).
- **The presentation state's key set differs between a show and a hide.** A show carries
  `withinProximity`, `shown` and `hidden` (with `hidden` present as `undefined` on the first show); a
  hide carries `withinProximity` and `shown` only; a retarget is **one** call carrying
  `hidden === previous && shown === next` (source: `src/shared/relocate.ts`'s `present`/`hide`;
  `docs/specs/relocate.md` §2.1's `PreviewSink` block and `§3.1` `M-11`).
- **After the invalid arm, a late `pointerup` reaches no handler at all.** It is not "refused" — the
  session's reset terminal has already detached its tracking listeners (source:
  `src/shared/gesture-session.ts`'s `runTerminal` → `detachTracking`; observed as the move/end
  handlers disappearing from a recording source; `docs/specs/relocate.md` §3.1 `M-8`'s annotation).
- **A finite negative operand answers `false`, even when the plain inequality says otherwise.**
  `withinProximity(-5, -1)` is `false` because a finite negative value is the unusable class, while
  `withinProximity(-Infinity, -Infinity)` is `true` (source: `src/shared/relocate.ts`'s
  `withinProximity`; `docs/specs/relocate.md` §3.1 `M-2`, §3.2 `F-3`).
- **The reveal's "applied" counter is `revealWritesApplied`, not `revealed`.** The earlier spelling
  collided with a banned consumer vocabulary token and was renamed; there are exactly eleven
  `RelocateStats` fields and none of them counts a capture (source: `src/shared/relocate.ts`'s
  `RelocateStats`/`stats`; `docs/specs/relocate.md` §0A note 14 item 1, §2.1 item 5).
- **`RelocateResetResult` is not exported.** The record `reset(element)` returns is declared in the
  module but is not one of the ten exported names, so a consumer reads it structurally (source:
  `src/shared/relocate.ts`; `docs/specs/relocate.md` §2.1's export census).
- **Nothing in the assembled app uses this module yet** — no `src/**` file imports it, so no rendered
  behaviour, no MCP observation and no live battery exercises it (source: `grep` over `src/**`;
  `docs/specs/relocate.md` §5.2; `docs/next-steps.md` `## DONE — U-RELOCATE` clauses 3/6/7). Whether
  a future importer's ghost or expanded zone behaves as intended in a real window is **UNVERIFIED
  here** — it would be settled by a unit that owns that rendered surface.

## See also

- `docs/guide/README.md` — the index and the reading order (this page is the `relocate.md` row).
- `docs/guide/TEMPLATE.md` — the binding page shape, and the two rules this page follows.
- `docs/specs/relocate.md` — the contract this page cites and never restates.
- `docs/specs/relocate-greens.md` — the unit's blind-scenario set.
- `docs/specs/gsession.md` — the frozen session it composes; `docs/decisions.md` — the ACTIVE rulings
  named above.
- `src/shared/relocate.ts`, `src/shared/gesture-session.ts`, `tests/relocate.test.ts` — the bytes.
