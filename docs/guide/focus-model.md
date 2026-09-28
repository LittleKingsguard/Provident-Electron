# U-FOCUS-MODEL — the pure ordered-entry transition reducer over caller-owned opaque ids and targets

You are building a list, tab strip or pane set in a fork of this baseline and you need
"which of these is active, and what happens when the user opens / activates / closes / steps
to the next one" to be a piece of *data* you own — not a store, not a DOM read, not a
vocabulary the framework imposes on you. `U-FOCUS-MODEL` (wave `F`, ledger row `F2`) is the
answer: one `src/shared/` module exporting `focusTransition`, `focusOrder`, `focusIndex` and
`persist`, which takes your state record as an argument and hands you back a value. Its
contract is `docs/specs/focus-model.md`, filed and approved, and its close-out record is the
`## DONE — U-FOCUS-MODEL` row in `docs/next-steps.md`.

## What it is

A **reducer, not a session**. `focusTransition(state, verb, arg?)` returns a result value; the
state record `{ entries, activeId }` is yours to hold, and the module holds nothing between
calls (`docs/specs/focus-model.md` §1 item 2, §3.3 `I-2`). There is no factory, no
`create…` name, no options object and no module-level mutable binding — the module's own file
header says the import census is zero and "NO MODULE-LEVEL BINDING EXISTS"
(`src/shared/focus-model.ts` lines 11–34).

**Order is your array.** The module sorts nothing, owns no order and holds no comparator
invocation site; `focusOrder(entries)` hands your own sequence back. That is why the unit is
not a third order authority beside the two landed hosts that project their own
(`docs/specs/focus-model.md` §2.2(C) row 3, §2.3 item 3, §3.3 `I-11`).

**Identity is the only rule, and it is opaque.** An entry's `id` and its `target` are `unknown`
to the module: `id` is consulted by exactly one equality test, and `target` is carried and
returned without being consulted — with one licensed `===` activation test
(`src/shared/focus-model.ts` lines 37–63, 202–214; `docs/specs/focus-model.md` §2.3 items 4/7).

**Refusal is data, never a throw.** None of the four value exports throws for any argument or
any seam shape; a refusal is a record the result carries, at most one per call
(`src/shared/focus-model.ts` lines 15–18; `docs/specs/focus-model.md` §2.1 item 2, §3.3 `I-3`).

**It is deliberately not a UI mechanism.** The module reads no `document`, no `window`, no
`activeElement`, installs no listener, authors no element and produces no rendered surface —
the word `focus` in its name covers a transition model over your entries and nothing else
(`docs/specs/focus-model.md`, Layer declaration honesty anchors 2/3/5; §2.5 items 1/7).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/focus-model.ts` | value exports `focusTransition`, `focusOrder`, `focusIndex`, `persist`; type declarations `FocusId`, `FocusEntry`, `FocusVerb`, `FocusRefusalCode`, `FocusState` — nine exported names in two halves, and no `create…` name among them (`docs/specs/focus-model.md` §2.1 item 1). The four record declarations `Read`, `FocusTransitionArg`, `FocusRefusal` and `FocusResult` are declared in the file and **not exported** (`src/shared/focus-model.ts` lines 88, 102, 109, 125) |
| `tests/focus-model.test.ts` | no exports; the unit's own rows (`§3.1` `M-1`…`M-14`, `§3.2` `F-1`…`F-14`, `§3.3` `I-1`…`I-14`, the `§3.4` static scans, and the `§0A` note 10 clause-ruling rows) |

The module's declared import census is zero — not one statement, not even type-only
(`docs/specs/focus-model.md` §2.1 item 6, pinned by `§3.4 R-4`). One consumer exists in the
tree today and it is *not* this unit: `src/renderer/renderer.ts` imports `focusTransition`,
`focusOrder`, `type FocusEntry` and `type FocusState` (line 10) and holds the live state in a
wiring-held `holder` (lines 283, 343); that consumer's own contract is
`docs/specs/focus-tool.md`.

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/focus-model.md` | §2.1 | the surface: the four value exports, the five type declarations, the four signatures, the result's seven members, the refusal record's three, the empty import census, the eleven declared string bodies |
| `docs/specs/focus-model.md` | §2.2(A)/(B) | the prohibition rows `P-FM-1`…`P-FM-11` and the test that pins each |
| `docs/specs/focus-model.md` | §2.2(C) | the twelve-token collision reconciliation — why `focus`, `order`, `refuse`, `persist` and `label` are legal *in this layer* |
| `docs/specs/focus-model.md` | §2.2(D) | the semantics table for every identifier this contract names (referent / domain / source) |
| `docs/specs/focus-model.md` | §2.3 | the value and opacity rules: the entry record, verb normalisation, order, the duplicate rule, the declared re-seating, the label, refusals, `changed` |
| `docs/specs/focus-model.md` | §2.4 | the three-seam table: where each arrives, when it fires, its payload, and its declared degradation for absent / non-callable / throwing |
| `docs/specs/focus-model.md` | §2.5 | the composition boundary (what the module may read, what it owns, the no-edge sibling relations) |
| `docs/specs/focus-model.md` | §3.1 · §3.2 · §3.3 | the valid states `M-1`…`M-14`, the fail-states `F-1`…`F-14`, the invariants `I-1`…`I-14` |
| `docs/specs/focus-model.md` | §1 | the scope, and the NOT-THIS-UNIT list |
| `docs/specs/focus-model.md` | §5.2 | the legs this unit declares, and its layer refusals (no real-DOM row offered, no divergence-harness row claimed) |
| `docs/specs/focus-model-adoption-dossier.md` | §1 · §3 | the adopted identifiers and the two cited working defaults |
| `docs/specs/focus-tool.md` | §2.1 · §2.5 | the consumer's surface and where the live `{entries, activeId}` holder sits |
| `docs/specs/mcp-endpoint.md` | §3 · §6.2 | the MCP tool table and the group model — which this module adds nothing to (`docs/specs/focus-model.md` §1 item 7) |

## Use cases

**UC-1 — Hold the state yourself and drive the verbs from your own event source.** You have a
list of entries and a click or key handler that decides "open a new entry" or "activate the
existing one"; you need the next state, the seated id and a machine-readable outcome, in one
call, without inventing a store. You keep the state in your own wiring, pass it in, and take
`result.state` back out (`docs/specs/focus-model.md` §2.1 item 10, §3.1 `M-2`).

**UC-2 — Render the list in your own order and ask where the active entry is.** You want the
sequence exactly as you supplied it, plus the zero-based position of one id, with a single
documented "not in the set" value — and you specifically do *not* want the mechanism re-sorting
your entries (`docs/specs/focus-model.md` §2.3 item 3, §3.1 `M-8`/`M-9`).

**UC-3 — Observe refusals and accepted changes for logging or for your own renderer.** You want
one callback per refusal and one per accepted transition, with the guarantee that your callback
is observation only: a callback that rewrites what it receives, or throws, cannot change the
outcome (`docs/specs/focus-model.md` §2.4 seams 1/2 and laws 1/4, §0A note 10 item 4).

**UC-4 — Hand the next state to your own storage.** Storage is yours; the module performs none.
`persist(seam, state)` calls *your* callback and returns its return value to you, and an absent,
non-callable or throwing callback reads the declared absence (`docs/specs/focus-model.md`
§0A note 3, §2.4 seam 3).

## Code, runnable

```ts
// UC-1 — drive a transition and keep the state yourself.
// Placed beside the module's real consumer, so the specifier is the one
// src/renderer/renderer.ts line 10 uses.
import { focusTransition, type FocusEntry, type FocusState } from '../shared/focus-model.js'

// THE CALLER OWNS {entries, activeId}: there is no session to create.
let state: FocusState = { entries: [], activeId: null }

const alpha: FocusEntry = { id: 'list:a', target: '#alpha', label: 'Alpha' }
const beta: FocusEntry = { id: 'list:b', target: '#beta', label: 'Beta' }

const opened = focusTransition(state, 'open', { entry: alpha })
state = opened.state
// opened: {
//   state: { entries: [alpha], activeId: 'list:a' },   // entries[0] IS `alpha`
//   accepted: true,
//   verb: 'open',
//   refusals: [],
//   seated: 'list:a',
//   changed: true,
//   persisted: { present: false, value: undefined },
// }

const second = focusTransition(state, 'open', { entry: beta })
state = second.state
// second: { state: { entries: [alpha, beta], activeId: 'list:b' }, accepted: true,
//           verb: 'open', refusals: [], seated: 'list:b', changed: true, ... }

// A repeated `target` under a NEW id ACTIVATES the existing entry and appends nothing —
// the identity rule on `target`, not a duplicate rule (docs/specs/focus-model.md §3.1 M-3).
const again = focusTransition(state, 'open', { entry: { id: 'list:c', target: '#alpha' } })
state = again.state
// again.accepted === true ; again.refusals.length === 0
// again.seated === 'list:a'          <- the EXISTING entry's id, so the seat moved off 'list:b'
// again.changed === true             <- the seat changed, so the state record is fresh
// again.state.entries.length === 2   <- 'list:c' was NOT appended
// again.state.entries[0] === alpha   <- your own object, by identity
// A structurally equal but not `===`-identical target appends instead (same section: identity only).

// An unknown verb is total: no throw, your state back by identity, one refusal.
const bogus = focusTransition(state, 'toggle')
// bogus: { state: <the SAME object you passed>, accepted: false, verb: 'unknown',
//          refusals: [{ code: 'unknown-verb', verb: 'unknown', id: null }],
//          seated: 'list:a', changed: false, persisted: { present: false, value: undefined } }
```

```ts
// UC-2 — the caller's own order, and the position of one entry.
import { focusOrder, focusIndex, type FocusEntry, type FocusState } from '../shared/focus-model.js'

const c: FocusEntry = { id: 'c', target: '#c' }
const b: FocusEntry = { id: 'b', target: '#b' }
const a: FocusEntry = { id: 'a', target: '#a' }

const entries: FocusEntry[] = [c, b, a] // deliberately NOT alphabetical
const state: FocusState = { entries, activeId: 'b' }

focusOrder(entries)             // === entries — your own array, in your own order
focusOrder(state.entries)[0]    // === c
focusOrder(null as never)       // []  — a non-array reads the empty sequence; the cast is
                                // deliberate, since the parameter is declared `readonly FocusEntry[]`

focusIndex(state, 'b')          // 1
focusIndex(state, 'c')          // 0
focusIndex(state, 'nope')       // -1  — the declared sentinel, never null/undefined
focusIndex({ entries: [], activeId: null }, 'b') // -1
```

```ts
// UC-3 — observe refusals and accepted changes; observation cannot move the outcome.
import { focusTransition, type FocusEntry, type FocusState } from '../shared/focus-model.js'

const entry: FocusEntry = { id: 'a', target: '#a' }
const state: FocusState = { entries: [entry], activeId: 'a' }

const refused = focusTransition(state, 'activate', {
  id: 'ghost',
  // `refuse` is typed by the module's own arg record, so no exported type is needed here.
  refuse: (refusal) => {
    console.log(refusal.code) // 'unknown-id'
    // A callback REWRITES what it received — the module handed it a copy, and the
    // result's refusal is the module's own record (§0A note 10 item 4).
    Object.assign(refusal as object, { code: 'caller-bug', verb: 'prev', id: 'rewritten' })
  },
  onChange: (next, previous, refusal) => {
    // Not reached on a refusal: onChange fires once per ACCEPTED transition only.
    console.log(next === previous, refusal)
  },
})
// refused: { state: <the SAME object you passed>, accepted: false, verb: 'activate',
//            refusals: [{ code: 'unknown-id', verb: 'activate', id: 'ghost' }],  // NOT 'caller-bug'
//            seated: 'a', changed: false, persisted: { present: false, value: undefined } }
// The `refuse` count for this call is 1; the `onChange` count is 0.

const stepped = focusTransition(state, 'next', { refuse: (r) => console.log(r.code) })
// stepped: { state: <SAME object by identity>, accepted: false, verb: 'next',
//            refusals: [{ code: 'no-next', verb: 'next', id: 'a' }], seated: 'a', changed: false, ... }
// The ends refuse: no wrap and no clamp (docs/specs/focus-model.md §3.2 F-5).
```

```ts
// UC-4 — the returned-write seam: your storage, your callback, its return value handed back.
import { persist, type FocusState } from '../shared/focus-model.js'

const state: FocusState = { entries: [], activeId: null }

// Annotate the callback's parameter: the seam argument itself is typed `unknown`.
const handed = persist((held: FocusState) => ({ saved: held.entries.length }), state)
// handed: { present: true, value: { saved: 0 } }   <- the seam's own return, by identity

persist(undefined, state)              // { present: false, value: undefined } — absent
persist('not a function', state)       // { present: false, value: undefined } — non-callable
persist(() => { throw new Error('x') }, state) // { present: false, value: undefined } — swallowed
```

## What it refuses / does not do

- **No store, no session, no factory, no options object, no construction** — the module holds
  nothing between calls (`docs/specs/focus-model.md` §1 item 2, §3.3 `I-2`/`I-12`).
- **No persistence of its own**: no file, no `localStorage`, no `indexedDB`, no store handle,
  and `focusTransition` never calls `persist` (`docs/specs/focus-model.md` §1 item 5,
  §2.1 item 4, §3.3 `I-4`).
- **No DOM, no element, no listener, no focus walk, no `activeElement`, no `matchMedia`** —
  the shim's ban is upheld without an exemption (`docs/specs/focus-model.md` §1 item 3,
  §2.2 `P-FM-8`, §3.3 `I-8`).
- **No order authority, no sort, no comparator, no rank member, no memoised sequence**
  (`docs/specs/focus-model.md` §2.2(C) row 3, §2.3 item 3, §3.3 `I-11`).
- **No consumer vocabulary**: no `'tab'`, `'pane'`, zone or region as a symbol, union member or
  default, and the endpoint's own nouns are not in the module's bytes
  (`docs/specs/focus-model.md` §2.2(A) `P-FM-1`, §2.2(C) rows 2/6).
- **No policy defaults**: no default verb, no auto-advance, no wrap, no clamp, no timer, no key
  mapping, no default entry, id, target or label (`docs/specs/focus-model.md` §1 item 6,
  §2.2 `P-FM-3`, §3.3 `I-5`).
- **No MCP surface, no tool, no `RpcMethod`, no group, no mutating-list entry, no IPC method,
  no resource and no channel** (`docs/specs/focus-model.md` §1 item 7, §2.2 `P-FM-5`,
  §3.3 `I-9`).
- **No authored UI content of any kind** — it authors no element, text, class, attribute or
  styling (`docs/specs/focus-model.md` §1 item 4, §2.2 `P-FM-2`).
- **The module imports nothing** — not even a type — composes no sibling surface, borrows no shape
  from another module and asserts no edge to one (`docs/specs/focus-model.md` §2.1 item 6,
  §2.5 item 3, §3.3 `I-10`).
- **No real-DOM row and no divergence-harness row**: the unit offers no real-Electron observation
  row and claims no divergence evidence, and neither refusal is an excuse about a leg's
  availability (`docs/specs/focus-model.md` §5.2).

## What a fork must supply

The module needs **no host, no store, no element, no engine surface and no session** — its import
census is zero and the only couplings are the three optional callbacks below. What a fork still
owns for the behaviour to be visible is named in the contract itself: the entry rendering, the
key handling that selects a verb, the verb mapping, the refusal presentation and every byte of
storage (`docs/specs/focus-model.md` §1 item 10).

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `refuse` (`arg.refuse`) | OPTIONAL | the fork / the host consumer | the refusal still lands in `result.refusals`, and no refusal code is invented (`docs/specs/focus-model.md` §2.4 seam 1 and laws 1/4) | the same declared reading — the outcome is identical to the no-seam case (`docs/specs/focus-model.md` §2.4 seam 1, §3.2 `F-8`) | the throw is swallowed; the verdict, `accepted`, `seated`, `changed` and `state` are unchanged (`docs/specs/focus-model.md` §2.4 seam 1 and law 1, §0A note 10 item 4) |
| `onChange` (`arg.onChange`) | OPTIONAL | the fork / the host consumer | the accepted transition is unaffected; the result is bit-for-bit the no-callback case (`docs/specs/focus-model.md` §2.4 seam 2) | no call is attempted (`docs/specs/focus-model.md` §2.4 seam 2) | the throw is swallowed and the transition is still accepted with the same result (`docs/specs/focus-model.md` §2.4 seam 2) |
| `persist` (a top-level value export, `persist(seam, state)`) | OPTIONAL | the fork — storage is the consumer's | `{ present: false, value: undefined }`, the module calls nothing (`docs/specs/focus-model.md` §2.4 seam 3, §0A note 3) | `{ present: false, value: undefined }`, no call attempted (`docs/specs/focus-model.md` §2.4 seam 3) | `{ present: false, value: undefined }`, the throw swallowed and nothing escaping (`docs/specs/focus-model.md` §2.4 seam 3) |

There is no comparator seam, no `equals` seam and no element or node parameter: identity is the
one equality rule (`docs/specs/focus-model.md` §2.2(D), the `FocusEquality` absence row).

## Gotchas measured in this repo

- **`persist` is a value export that `focusTransition` never calls.** Every transition result's
  `persisted` is `{ present: false, value: undefined }`; the hand-back only exists when you call
  `persist(seam, state)` yourself (`src/shared/focus-model.ts` lines 255–257, 294, 323;
  `docs/specs/focus-model.md` §2.1 item 4).
- **The two position functions do not take the same argument.** `focusOrder` takes the
  **entries array**, `focusIndex` takes the **state record** — the real consumer writes
  `focusOrder(state.entries)` (`src/shared/focus-model.ts` lines 421, 433;
  `src/renderer/renderer.ts` line 288).
- **The result, refusal and argument record types are not exported.** Name a result with
  `ReturnType<typeof focusTransition>` — exactly what the renderer's wiring does
  (`src/shared/focus-model.ts` lines 88/102/109 are `interface`s, not `export interface`;
  `src/renderer/renderer.ts` line 315; the export census is `docs/specs/focus-model.md` §2.1 item 1).
- **The verb parameter is typed `unknown` on purpose.** A mistyped verb compiles and refuses at
  run time with `'unknown-verb'` rather than failing the compiler
  (`src/shared/focus-model.ts` line 342; `docs/specs/focus-model.md` §3.2 `F-1`).
- **A repeated `target` under a new id activates instead of appending**, so a caller that
  expects an append gets an unchanged `entries` length and the *existing* entry's id in `seated`
  (`src/shared/focus-model.ts` lines 363–371; measured by `tests/focus-model.test.ts`, the
  `CLAUSE-1` row of the `§0A` note 10 block, and `§3.1 M-3`).
- **A `refuse` callback cannot rewrite the verdict.** The callback receives an observation copy,
  so rewriting every field of what it got leaves `result.refusals[0]` untouched
  (`src/shared/focus-model.ts` lines 285–298; measured by `tests/focus-model.test.ts`, the
  `CLAUSE-4` row; `docs/specs/focus-model.md` §0A note 10 item 4).
- **`focusIndex` returns the sentinel `-1`**, never `null` or `undefined`, and every return is a
  number (`src/shared/focus-model.ts` lines 433–440; `docs/specs/focus-model.md` §3.1 `M-9`).
- **`undefined` is a legal opaque id, distinct from `null`.** An absent `activeId` member reads as
  `undefined` by the declared absence, and neither value may be mapped onto the other
  (`src/shared/focus-model.ts` lines 166–178; `docs/specs/focus-model.md` §2.2(D) `FocusId` /
  `activeId` rows, §3.2 `F-4`).
- **Nothing throws, for any argument or seam shape** — including hostile holders, revoked
  proxies and throwing accessors (`src/shared/focus-model.ts` lines 15–18, 144–164;
  `docs/specs/focus-model.md` §2.3 item 10, §3.2 `F-7`).
- **This module focuses nothing.** A green node suite is evidence about returned values and seam
  call counts only; no row here may be read as a claim that anything was focused, that a tab or
  pane changed, or that a user-visible flow moved (`docs/specs/focus-model.md`, Layer declaration
  honesty anchors 1/5).
- **The contract's own §2.5 item 5 answer about importers is a statement of that unit's as-filed
  allow-list, not a census of today's tree**: the module now has exactly one importer,
  `src/renderer/renderer.ts` (lines 10, 283, 343), whose own surface is `docs/specs/focus-tool.md`
  (`docs/specs/focus-model.md` §2.5 item 5).

## See also

- `docs/guide/README.md` — the index, the two readers and the reading order.
- `docs/guide/00-base-surface.md` — the tool set, the dispatch path and the group model.
- `docs/guide/focus-tool.md` — the `provident.focus` tool built on this model (listed in the
  index; the consumer unit's page).
- `docs/specs/focus-model.md` — the contract; `docs/specs/focus-model-greens.md` — the
  independent scenario artifact; `docs/specs/focus-model-adoption-dossier.md` — the adopted
  identifiers.
