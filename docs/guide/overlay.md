# `U-OVERLAY` — the pure overlay state machine and the inert-background declaration

You have an overlay to open, hold, close and dismiss, and you want to know which half of that
job this repo has already decided for you. In one line: `src/shared/overlay.ts` gives you a
**state machine that returns data** (`overlayTransition`) and an **inert-background write that is
returned, never performed** (`overlayInertDeclaration`), while the overlay element, the scrim,
the key handling, the applied attribute write and the node's placement stay yours — **and the inert half is a
fork decision between two non-equivalent routes, spelled out in *Making the background inert: you must choose a
route* below, whose absence was the miscommunication a downstream consumer ruled on (`OS-1`)**. Unit
**`U-OVERLAY`**, wave **`E`**, ledger row **`E9`**; the landed record is the
`## DONE — U-OVERLAY` section of `docs/next-steps.md`.

## What it is

This is one of the repo's pure mechanisms: two functions over caller arguments, no import
statement of any kind, no module-level state, no element, no node, no listener and no session.
It owns exactly two disciplines — **which state follows which verb** (a decision returned as a
record) and **what an inert-background write looks like as data** (a value returned to the
caller, who applies it). Everything else about an overlay is the caller's: the state word, the
verb word, the `Escape`-equivalent, the attribute name, the background identity and the boolean
all arrive as arguments, and the rendered overlay itself is authored elsewhere.

For a **baseline consumer** that means the decision is already made and already shaped for
assertion: give it a state and a verb, read back the next state plus whether anything moved.
For a **fork author** it means a boundary you must not cross by accident: this module will not
touch the DOM, will not install a listener, will not remember a value between calls, will not
own or default your attribute name, and will not move a node.

The distinction the whole unit turns on is **returned ≠ applied**. The write record describes a
write; this module performs none. That places it in the family's declaration class, whose
precedent the contract names explicitly (`docs/decisions.md`, row
`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`; `docs/specs/overlay.md` §0 ruling 2).
Setting your attribute, rendering your overlay, restoring focus and placing the node are the
consumer's work by construction, not by omission.

Two consequences a reader should get right the first time. First, the module has **no in-tree
consumer** — EXCEPT its ONE admitted store-wave caller: `src/renderer/overlay-store.ts` imports `overlayTransition`/`overlayInertDeclaration` (`U-STORE-MODULES-SEAMS`/H2b; `docs/specs/store-modules-seams.md` §2.2) and reads/writes `mem.overlay.<name>.state` with the store's `{found,value}` resolve shape — nothing else in the shell or the demo envelope exercises
it for you, and its value is the contract rather than a feature (`docs/specs/overlay.md` §1
item 9, §2.5 item 5). Second, `SCH-12`'s **re-parent half is refused, with its reason stated and
the residual re-filed** — there is no node reference, no move verb and no returned move plan
anywhere in this unit (`docs/specs/overlay.md` §1 item 3, §2.5 item 6). A reader who comes
looking for a move plan is looking for a clause this contract declines.

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/overlay.ts` | values `overlayTransition`, `overlayInertDeclaration`; types `OverlayState`, `OverlayTransition`, `OverlayInertWrite` — five names, two value + three type (`docs/specs/overlay.md` §2.1 item 1, §2.1 item 6) |
| `tests/overlay.test.ts` | the unit's own rows — including the static byte/token scans and the existence rows; it imports the three type names as `import type` from `'../src/shared/overlay.js'` and reaches the runtime values through a computed specifier (`docs/specs/overlay.md` §3.4 `R-1`…`R-14`, §3.5, §5.2) |
| `docs/specs/overlay.md` | the contract (this page cites it and is never a second authority for it) |
| `docs/next-steps.md` | the landed record — `## DONE — U-OVERLAY`, wave `E`'s tenth and last unit |

The module carries **no import statement at all**, not even type-only, and no file under `src/**`
imports it — as read in this pass, none of the repo's own `from '…/shared/…'` imports names it,
and `tests/overlay.test.ts`'s `I-9` row asserts the same (`docs/specs/overlay.md` §2.1 item 3,
§2.5 item 5).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/overlay.md` | §2.1 | the surface: the five exported names in two halves, both signatures, both returned shapes, the empty import census, the empty seam set |
| `docs/specs/overlay.md` | §2.2 | what is caller-supplied, the prohibition table `P-OV-1`…`P-OV-12`, and the semantics row for every identifier the contract names |
| `docs/specs/overlay.md` | §2.3 | the verb normalization table and the whole state × verb transition matrix, with the `changed` observable |
| `docs/specs/overlay.md` | §2.4 | the name-echo rule, the value/removal rule, the never-consulted `target`, the no-write rule and the fresh-record rule |
| `docs/specs/overlay.md` | §2.5 | the composition boundary, the no-fabricated-edge rows, and the entry-point answer `NO` |
| `docs/specs/overlay.md` | §1 items 1–9 | the scope: what the unit is, and every declared non-goal — including the **refused** re-parent half (§1 item 3) |
| `docs/specs/overlay.md` | §3.1 `M-1`…`M-9`, §3.2 `F-1`…`F-10`, §3.3 `I-1`…`I-13` | every happy state, every documented fail-state and every invariant |
| `docs/specs/overlay.md` | §3.4 `R-1`…`R-14` | the static rows a reader can check against this unit's own bytes |
| `docs/specs/overlay.md` | §3.5 `X-1`…`X-6` | the existence rows — the repo-state claims, each with the probe that can fail |
| `docs/specs/overlay.md` | §4.4 `S-OV-1`…`S-OV-11` | the rows' stop conditions |
| `docs/specs/overlay.md` | §5.1, §5.2 | the diff scope with its denied set, and the declared verification set with the three-part refusal of a live/DOM row and of a divergence row |
| `docs/specs/overlay.md` | §6, §7 | the falsification conditions and the honest statements |
| `docs/decisions.md` | rows `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`, `PROHIBITION-5-IS-AN-ADOPTION-BOUND`, `UI-RENDERED-WITH-PROVIDENT` | the rulings the unit derives from |

## Making the background inert: you must choose a route

**This is a fork decision, not an omission, and the two routes are NOT equivalent.** Everything above hands
you a declaration; the routes differ in **where that declaration is applied** and in **who owns the applied
half**. What the declaration gives you is unchanged either way, and this is exact:

| `inert` argument | Returned record |
| --- | --- |
| the strict boolean `true` | `{ name: <the echoed non-empty string, or null when the name is unusable>, value: 'true', removal: false, target }` |
| **anything else** (the string `'true'` included) | `{ name, value: false, removal: true, target }` |

The set arm's `value` is the **string `'true'`**; the removal arm's is the **boolean `false`**; the case is read
from the **`removal` member alone — never inferred from an empty value** (`docs/specs/overlay.md` §2.4 items 1–4,
§2.2 `P-OV-7`/`P-OV-9`).

| Route | What it is | Owner | Layer | What verifies it |
| --- | --- | --- | --- | --- |
| **(a) `props: { inert: 'true' }` on an authored node** | the project-wide UI-constraint route: the attribute rides the authored envelope as pure data (the project-wide constraint; `docs/decisions.md` `UI-RENDERED-WITH-PROVIDENT` — **not** a clause of `docs/specs/overlay.md`) | you, as the app authoring the node | the authored envelope — `[T]` | the node suite, asserting the authored envelope |
| **(b) a DOM write at your own write site** | `setAttribute` / `removeAttribute` on the background element, at your own write site (the shell-chrome carve-out; `docs/specs/overlay.md` §2.5 item 2 — *"the applied write is the CONSUMER's"* — with §5.2's `[U]` refusal and `[D]` non-claim) | you, in your app/shell wiring | the app layer — `[U]`/`[D]`, never this unit's `[T]` | the live real-Electron leg (`npm run ui`) — **and that leg's own precondition is not green in this repo's current state, so it would take no measurement here** |

**The removal arm of route (b) needs `ShimElement.removeAttribute` — the one admitted shim addition
(`SHIM-COMPLETION-CARVE-OUT` / `H-r7`, `docs/specs/overlay.md` §0 ruling 9) — and it already exists.** The
composition is the same for both routes: `overlayInertDeclaration(bg, ATTRIBUTE, overlayTransition(state, verb).changed)`.

**Write the attribute name yourself — the spelling above is yours, not ours.** This mechanism owns, defaults
and documents no attribute name (`docs/specs/overlay.md` §2.2 `P-OV-7`), and this repo contains no DOM `inert`
attribute to copy and no layer that reads an applied one back (§5.2's reader question, answered `NONE`).

## Use cases

**UC-1 — drive your own overlay from your own events.** You own the key handling and the click
on your scrim, so you own the mapping from a user gesture to a verb; what you do not want to
re-derive is the state discipline, especially the hold case. You call `overlayTransition` with
your current state word and your chosen verb and keep the returned `state` as your next state.

**UC-2 — hand the `Escape`-equivalent in as a callback.** Your dismissal work (focus restore,
class flip, whatever your app does) is a function you already have. You pass it as the third
argument and the mechanism invokes it once for the `'escape'` verb — never installing a listener
of its own, and never letting your bug become its throw.

**UC-3 — take the inert-background write as data and apply it with your own element and your own
attribute name.** You have the element and you know the spelling; the mechanism owns neither. You
call `overlayInertDeclaration`, read the four members, and make the one call that changes the
document — yours.

**UC-4 — compose the two.** A common wiring is "when the overlay's state actually moved, toggle
the background". The transition's `changed` boolean is exactly the argument the declaration's
`inert` parameter wants, and the strict rule makes that composition total: `true` sets, `false`
removes.

## Code, runnable

The import specifier below is the one this repo's own `src/**` files use for a sibling
`src/shared/` module (`src/renderer/renderer.ts`); from a file in `tests/`, the same module is
`'../src/shared/overlay.js'` (`tests/overlay.test.ts`).

```ts
// UC-1 — your events choose the verb; the mechanism chooses the next state
import { overlayTransition, type OverlayState } from '../shared/overlay.js'

// the state is YOURS: the mechanism holds nothing between calls and mints no word
let state: OverlayState = 'closed'

function onUserVerb(verb: unknown): OverlayState {
  const t = overlayTransition(state, verb)
  state = t.state
  return t.state
}

onUserVerb('open')      // t === { state: 'open',   changed: true  }
onUserVerb('toggle')    // t === { state: 'closed', changed: true  }
onUserVerb('toggle')    // t === { state: 'open',   changed: true  }

// the hold is respected: 'toggle' and 'open' do not move a held overlay
overlayTransition('held', 'toggle')  // { state: 'held',   changed: false }
overlayTransition('held', 'open')    // { state: 'held',   changed: false }
overlayTransition('held', 'close')   // { state: 'closed', changed: true  }

// a verb this contract does not name is a no-move, not an error and not a guess
overlayTransition('open', 'dismiss') // { state: 'open',   changed: false }
```

```ts
// UC-2 — the Escape-equivalent is your callback; the mechanism installs no listener
import { overlayTransition } from '../shared/overlay.js'

let dismissals = 0
const dismiss = (): void => { dismissals += 1 }   // your own dismissal work

overlayTransition('open', 'escape', dismiss)
// { state: 'closed', changed: true }   · dismissals === 1

overlayTransition('closed', 'escape', dismiss)
// { state: 'closed', changed: false }  · dismissals === 2 — the callback fires for every state

overlayTransition('open', 'close', dismiss)
// { state: 'closed', changed: true }   · dismissals stays 2 — only 'escape' calls it

const buggy = (): void => { throw new Error('your defect') }
overlayTransition('open', 'escape', buggy)
// { state: 'closed', changed: true } — the throw is absorbed: nothing escapes the call
```

```ts
// UC-3 — the write is DATA; your element and your attribute name
import { overlayInertDeclaration } from '../shared/overlay.js'

// the element your app already holds — however it obtained it (the mechanism takes none)
declare const appBackground: Element
const ATTRIBUTE = 'inert'   // your spelling; this module owns no attribute name

const set = overlayInertDeclaration(appBackground, ATTRIBUTE, true)
// { name: 'inert', value: 'true', removal: false, target: appBackground }

// the applied call is yours — and only the strict boolean `true` produces this arm
if (set.name !== null) appBackground.setAttribute(set.name, String(set.value))

const remove = overlayInertDeclaration(appBackground, ATTRIBUTE, false)
// { name: 'inert', value: false, removal: true, target: appBackground }

// removal is discriminated by the `removal` member, never inferred from an empty value
if (remove.removal && remove.name !== null) appBackground.removeAttribute(remove.name)

// everything that is not the boolean `true` is the removal case — the string included
overlayInertDeclaration(appBackground, ATTRIBUTE, 'true')
// { name: 'inert', value: false, removal: true, target: appBackground }

// an unusable name is a declared `null`; the background identity comes back untouched
overlayInertDeclaration(appBackground, '', true)
// { name: null, value: 'true', removal: false, target: appBackground }
```

```ts
// UC-4 — compose the two exports: the transition's `changed` drives the write's `inert`
import { overlayTransition, overlayInertDeclaration, type OverlayState } from '../shared/overlay.js'

declare const appBackground: Element
const ATTRIBUTE = 'inert'

function driveOverlay(state: OverlayState, verb: unknown) {
  const t = overlayTransition(state, verb)
  const write = overlayInertDeclaration(appBackground, ATTRIBUTE, t.changed)
  return { next: t.state, changed: t.changed, write }
}

driveOverlay('closed', 'open')   // the state moved ⇒ the background is written
// { next: 'open', changed: true,
//   write: { name: 'inert', value: 'true', removal: false, target: appBackground } }

driveOverlay('open', 'open')     // nothing moved ⇒ the removal case
// { next: 'open', changed: false,
//   write: { name: 'inert', value: false, removal: true, target: appBackground } }
```

## What it refuses / does not do

- **Move, re-parent or release a node, and return a move plan** — refused with its reason, with
  the residual re-filed, and with the element identity and the post-close owner left caller-side
  (`docs/specs/overlay.md` §1 item 3, §2.5 item 6; `docs/pending.md`, the `SCH-12` row).
- **Own a focus model, a focus trap or a focus walk** — that half stays re-filed
  (`docs/specs/overlay.md` §1 item 3, §2.2 `P-OV-11`).
- **Author a rendered overlay, a scrim, markup, styling or any UI element** — the rendered
  overlay is the consumer's or a UI unit's, never this module's (`docs/specs/overlay.md` §1
  item 4, §2.2 `P-OV-2`).
- **Perform a write of any kind** — no attribute write, no class, no style, no element access;
  the removal case is a data pair (`docs/specs/overlay.md` §2.4 item 4, §2.2 `P-OV-9`).
- **Own, default or document an attribute name** — including the literal `inert`, which the
  module never carries as a name (`docs/specs/overlay.md` §2.2 `P-OV-7`, §2.4 item 1).
- **Install a listener, wire an event or hold a node reference** — the `Escape`-equivalent
  arrives as an argument (`docs/specs/overlay.md` §2.2 `P-OV-8`, §1 item 2).
- **Decide a policy** — no default verb, no automatic close, no timer, no priority between verbs
  and no state the caller did not supply (`docs/specs/overlay.md` §1 item 6, §2.2 `P-OV-3`).
- **Keep anything** — no store, no cache, no persistence, no retained callback and no
  module-level mutable state; the state crosses the call boundary only as an argument
  (`docs/specs/overlay.md` §1 item 5, §2.2 `P-OV-4`, §3.3 `I-4`).
- **Add an MCP surface** — no tool, no resource, no group and no renderer method; the contract
  requires none (`docs/specs/overlay.md` §2.2 `P-OV-5`, §3.3 `I-9`).
- **Compose a sibling** — the import census is empty and no sibling surface is re-expressed here
  (`docs/specs/overlay.md` §2.1 item 3, §2.5 items 3/4).
- **Observe the applied attribute** — no row of this unit claims that an attribute exists on an
  element, that a background is inert or that an overlay appeared; the applied half is refused
  rather than promised (`docs/specs/overlay.md` §5.2, §7 items 2/4).

## What a fork must supply

**This unit has no seams.** That is a stated derivation, not an oversight
(`docs/specs/overlay.md` §2.1 item 4), and two readings establish it: the module's **import
census is empty** — it receives no engine surface, no session, no sibling value
(`docs/specs/overlay.md` §2.1 item 3) — and the one callable it ever invokes is an **argument**,
not a public fork-implemented contract (`docs/specs/overlay.md` §2.1 item 4, under the family's
form row `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` in `docs/decisions.md`).

The row below is therefore an **argument's declared degradation**, listed because a fork author
still needs it, and it is explicitly **not** a seam:

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `callback` (the third parameter of `overlayTransition`) | OPTIONAL — an argument consumed inside one synchronous call, **not a seam** (`docs/specs/overlay.md` §2.1 item 4, §2.1 item 7) | the caller / the consumer | omitted or `undefined`: the declared state/`changed` pair is returned and nothing throws (`docs/specs/overlay.md` §3.2 `F-3`) | the same declared pair is returned and nothing throws; a row asserting that the mechanism refuses an unusable callback is citing a clause this contract does not contain (`docs/specs/overlay.md` §3.2 `F-3`, §4.4 `S-OV-3`) | one attempted invocation, the throw absorbed, the same declared record returned, never retried (`docs/specs/overlay.md` §2.3 item 1 row (4), §3.2 `F-3`) |

What a fork supplies beyond that is **not a seam either, and is not supplied through this module
at all**: the rendered overlay element, the scrim, the key/pointer handling that selects a verb,
the applied attribute write and the node's placement are all **caller-side data obligations**
(`docs/specs/overlay.md` §2.2, §2.5 item 2, §1 item 3). Nothing in the module can be configured
to take them over.

## Gotchas measured in this repo

- **Nothing in this repo imports the module.** No `src/**` file carries an overlay import (read
  in this pass), and `tests/overlay.test.ts`'s `I-9` row asserts it; the shell and the demo
  envelope will not exercise it for you (`docs/specs/overlay.md` §2.5 item 5).
- **A held overlay survives `'toggle'` and `'open'`.** `('held', 'toggle')` returns
  `{ state: 'held', changed: false }`, not `'closed'` — only `'close'` and `'escape'` release it
  (`src/shared/overlay.ts`; `docs/specs/overlay.md` §2.3 item 2's matrix, row `M-3`).
- **Every call returns a fresh, unfrozen record.** A `toBe` between two calls' records fails by
  design; assert `toEqual` plus a distinct-identity check between the two records
  (`docs/specs/overlay.md` §2.4 item 5, §3.2 `F-9`).
- **The member census and its order are pinned.** `Object.keys` reads `['state', 'changed']` on
  the transition and `['name', 'value', 'removal', 'target']` on the write, in those orders — a
  missing or additional member fails (`docs/specs/overlay.md` §2.4 item 5, §3.1 `M-1`/`M-5`).
- **The removal case's `value` is the boolean `false`, and `'false'`/`'true'` as strings and `1`
  as a number are NOT the set case.** Only the strict boolean `true` sets; a truthiness
  implementation fails here (`src/shared/overlay.ts`; `docs/specs/overlay.md` §2.4 item 2,
  §3.1 `M-6`).
- **The name-echo rule is `typeof` plus emptiness, nothing else** — a whitespace-only string IS
  echoed, and an object carrying its own `toString` reads `name: null` with that hook never
  invoked (`src/shared/overlay.ts`; `docs/specs/overlay.md` §2.4 item 1, §3.1 `M-7`).
- **An unusable `state` is not "closed because the verb said so".** For a `state` outside the
  declared set the transition never consults the verb — `overlayTransition('bogus', 'open')`
  returns `{ state: 'closed', changed: false }` — while a `'escape'` verb still invokes the
  callback in that same call (`src/shared/overlay.ts`). The contract's `'escape'` row is stated
  for the four declared states, so that last combination rests on the module's bytes here:
  **unverified** against a contract row; it would be settled by a row driving an unusable
  `state` together with `'escape'` (`docs/specs/overlay.md` §2.3 item 1 row (4), §3.2 `F-1`/`F-3`).
- **Do not assert the printed identity as an equation.** `docs/specs/overlay.md` §2.4 item 2's
  printed `removal === (value !== true)` is not satisfiable as a strict equation on the set arm,
  because that arm's `value` is the string `'true'`; the **declared pair** is what the module
  returns (`src/shared/overlay.ts`), and the contract carries the wording as an owed clause-level
  note rather than a repair (`docs/next-steps.md`, `## DONE — U-OVERLAY`, clause (12)).
- **The three type names cannot be pinned at run time.** `OverlayState`, `OverlayTransition` and
  `OverlayInertWrite` are erased at run time; the repo pins them with an `import type` in
  `tests/overlay.test.ts` plus a strict standalone `tsc` over that file
  (`docs/specs/overlay.md` §3.4 `R-5`(b), §5.2).
- **Whether the module appears in a built bundle**: the unit's record states the built output set
  is unchanged because the module is imported by nobody (`docs/next-steps.md`,
  `## DONE — U-OVERLAY`, clause (6)) — **unverified** here (no build was run in this pass); it
  would be settled by running `npm run build` and comparing the output set, and an unchanged
  output set would anyway be consistency, not evidence the module works.

## See also

- `docs/guide/README.md` — the index, the two readers and the reading order.
- `docs/guide/00-base-surface.md` — read first: the tool set, the dispatch path, the runtime and
  the group model.
- `docs/guide/container.md` — the sibling mechanism page in the same returned-declaration class
  (different shape: a returned text declaration rather than a four-member write).
- `docs/specs/overlay.md` — the contract this page cites; the spec governs if the two disagree.
- `docs/next-steps.md` — the `## DONE — U-OVERLAY` landed record (red/green figures, the
  adversarial findings and the owed items, stated as owed).
