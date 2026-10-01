# The seam-contract family — every caller-supplied edge in this repo's mechanism layer, and what each declares when you don't supply it

Read this as a fork author. Five mechanisms in `src/shared/` — `U-CONTAINER` (wave E, `E5`), `U-RELOCATE` (`E4`),
`U-FOCUS-MODEL` (wave F, `F2`), `U-THEME` (wave E, `E8`) and their siblings — accept their policy through
**injected callables and values instead of imports**, so the vocabulary, the geometry and the storage stay yours.
This page is the family's one table: the seam name, whether it is REQUIRED or OPTIONAL, who supplies it, and the
**declared degradation for absent / non-callable / throwing**, each cited. Every landed unit's own DONE record is
in `docs/next-steps.md` (`## DONE — U-CONTAINER`, `## DONE — U-RELOCATE`, `## DONE — U-FOCUS-MODEL`,
`## DONE — U-THEME`); the family's fork-facing carry is `docs/FORKER.md` §4.

## What it is

A **seam** here is a caller-supplied edge of a mechanism: a callable, an options member or a value the consumer
passes in, which the mechanism invokes or reads **instead of** importing a policy. The family's rule is an ACTIVE
architect ruling, `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` (`docs/decisions.md`): a seam's
**signature, REQUIRED/OPTIONAL status and declared degradation are normative contract text**, the seam **types are
part of the module's exported census** so a fork can import them, and this repo's own wiring is **one sample
implementation, never the contract**.

What the mechanism owns, and what you own, is the whole point of the split. The mechanism owns the arithmetic,
the ordering, the refusal vocabulary and the count sites — `withinProximity` is `U-RELOCATE`'s one comparison site,
the five refusal codes are `U-FOCUS-MODEL`'s, the pinned declaration text is `U-CONTAINER`'s. You own the mirror-class
taxonomy, the candidate set and the measured distance, the reveal state, the sink, the cursor/presentation channel,
the focus entries and their order, the OS preference reading and the attribute name. None of those words appears in
any mechanism's bytes.

Two consequences follow. **First, the degradation is contract, not a courtesy.** Each mechanism declares what
happens when a seam is absent, when it is not callable, and when it throws — and the three states are separate
readings: for `U-RELOCATE` they collapse into one NAMED safe default per seam, while for `commit` and `onPreview`
the absent arm and the throwing arm are deliberately different (a no-writer composition vs. a throw at the consumer
boundary) (`docs/specs/relocate.md` §2.4 items 1/2). **Second, a mechanism with no seam at all still belongs to the
family** — `U-THEME` declares an EMPTY seam set (`docs/specs/theme.md` §2.1 item 3) and takes its one environment
reading as an ordinary argument.

This page does not cover every unit in the ledger. The sibling seam families — `U-GUTTER`'s resize controller,
`U-GUTTER-UI`'s eleven caller seams and `U-MENULIB`'s picker — carry their own seam blocks in `docs/FORKER.md` §4;
their contracts are `docs/specs/gutter.md`, `docs/specs/gutter-ui.md` and `docs/specs/menulib.md`. Read those
blocks for those units; do not infer them from this page.

**⟶ AND THE TWO OWNED-HOST FAMILIES' SEAMS ARE NOW IN THE TABLE BELOW (`2026-10-04`).** This paragraph used to
route *"the two owned-host families"* away from this page entirely, and that routing is what left `slot-host`'s
container source and `owned-list-host`'s mount/factory with **no seam row anywhere in this tree** — a downstream
fork read the modules' **headers**, found no row, and asked whether an envelope-authored consumer could satisfy
the container seam at all. The rows are now below (`containerFactory`, and `mount` + `itemFactory`); read
`docs/specs/slothost.md` and `docs/specs/listhost.md` for their contracts, and `docs/FORKER.md` §4's
`### THE HOST CONTAINER SOURCE — WHAT A FORK SUPPLIES, AND WHEN IT IS CALLED` for the fork-facing recipe.

**⟶ A PAGE'S OWN SCOPE PARAGRAPH IS NOT A CONTRACT EITHER (`2026-10-04`).** The routing sentence above was
**accurate about WHICH PAGE carries those units' fork-facing material**, and it is kept for that reason — but it
was **wrong as a statement about where a fork-facing seam contract may live undocumented**: `docs/guide/README.md`'s
*"Units that have no page here"* is a list of pages this tree **does not have**, never a licence to leave a
**fork-facing seam** with no row anywhere. When you find a seam with no row on this page, the fix is **a row that
cites the spec** — not a pointer.

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/container.ts` | values `tokensFor`, `orientationFor`, `containerDeclarationFor`; types `ChromeTokenFn`, `AxisResolver`, `ContainerDeclaration` |
| `src/shared/relocate.ts` | values `createRelocateSession`, `withinProximity`; types `CandidateFor`, `RelocateTargetFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`, `RelocateOptions`, `RelocateSession`, `RelocateStats` |
| `src/shared/focus-model.ts` | values `focusTransition`, `focusOrder`, `focusIndex`, `persist`; types `FocusId`, `FocusEntry`, `FocusVerb`, `FocusRefusalCode`, `FocusState` |
| `src/shared/theme.ts` | values `resolveTheme`, `applyThemeDeclaration`; types `ThemeResolution`, `ThemeAttributeWrite`, `ThemeEnv` |
| `src/renderer/renderer.ts` | the one landed consumer: `:10` imports `focusTransition`, `focusOrder`, `FocusEntry`, `FocusState` from `../shared/focus-model.js` (the `U-FOCUS-TOOL` wiring) |
| `tests/container.test.ts`, `tests/relocate.test.ts`, `tests/focus-model.test.ts`, `tests/theme.test.ts` | the units' own rows. A fact measured by a test is cited where it is used |

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/container.md` | §2.1 | the surface and its six exported names |
| `docs/specs/container.md` | §2.4 | the **two contract edges** — signature, REQUIRED status, declared degradation, and the row that can fail |
| `docs/specs/container.md` | §2.5 item 2 | the no-reach clause: no geometry, no element, no coordinate can arrive |
| `docs/specs/relocate.md` | §2.1 item 1 | the **seven-seam table** — signature, REQUIRED/OPTIONAL, supplier, degradation |
| `docs/specs/relocate.md` | §2.4 item 1 | the seven NAMED SAFE DEFAULTS |
| `docs/specs/relocate.md` | §2.4 item 2 | the throw dispositions, per turn |
| `docs/specs/relocate.md` | §2.1 item 7 | the hooks record's value-reading member and its no-caller-value refusal |
| `docs/specs/focus-model.md` | §2.1 | the nine-name census and the surface |
| `docs/specs/focus-model.md` | §2.4 | the **three-seam table** — firing point, payload, and the declared degradation of each |
| `docs/specs/focus-model.md` | §2.5 item 2 | what the module owns, and what it does not |
| `docs/specs/theme.md` | §2.1 item 3 | the **empty seam set** |
| `docs/specs/theme.md` | §2.3 items 1–3 | the resolver's rules, including the one-member environment reading |
| `docs/specs/theme.md` | §2.4 items 2/3 | the removal case as DATA, and the applier's no-write rule |
| `docs/decisions.md` | `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` (ACTIVE) | the seam's status as public contract; the exported seam types; this repo's demo as one implementation |
| `docs/FORKER.md` | §4 | the family's fork-facing seam blocks, carried per unit |

## Use cases

**UC-1 — “my own vocabulary must not appear in your module.”** You are forking this baseline and your panes carry a
class vocabulary of your own (`is-empty`, `is-minimized`) that no mechanism may learn. `U-CONTAINER` takes the
mapping as a callable and hands your answer on untouched, so you pass your closure and the module stays
vocabulary-free.

**UC-2 — “I am wiring relocate before my candidate source exists.”** You have the drag session but not yet the
proximity policy. `U-RELOCATE` is TOTAL for every absent seam: with no session you get a **valid but inert** module
that refuses rather than throws, so your wiring can land in stages; with a session but no candidate source, the
invalid arm fires at once and is explicitly **not a cancel**.

**UC-3 — “I want to observe focus changes, not become the gate.”** You need a refusal log and a change log for
debugging, and you must not be able to make the model accept or refuse by throwing or by rewriting what it hands
you. `U-FOCUS-MODEL`'s `refuse`/`onChange` are observation only; `persist` is a separate top-level export the
module **never calls** — you call it when you decide to persist.

**UC-4 — “my layer has no seam — who supplies the reading?”** For appearance you want a mechanism but no injected
callable at all. `U-THEME` is the family's zero-seam member: the OS reading arrives as an argument record, and the
attribute write comes back as **data** for you to apply.

## Code, runnable

Each example is a complete file you can drop in `tests/` and run with `npx vitest run tests/<name>.test.ts`. The
import specifier form `../src/shared/<x>.js` is the repo's own (`src/renderer/renderer.ts:10` uses it; the unit
suites resolve the same specifier dynamically, `tests/container.test.ts:201`). **A static import from a new
`tests/` file is unverified by this page** — the unit suites deliberately use a dynamic import so a missing module
reports as a red assertion. Every export, argument and returned member below was read from the cited source file.

```ts
// tests/seam-uc1.test.ts — UC-1: your mirror-class taxonomy, supplied as a closure
import { describe, it, expect } from 'vitest'
import { tokensFor, orientationFor, containerDeclarationFor } from '../src/shared/container.js'

const TOKENS: Record<string, readonly string[]> = { 'pane-a': ['is-empty', 'is-minimized'] }

// your mapping — the module never learns these words (docs/specs/container.md §2.4)
const tokenFn = (chrome: unknown): unknown => {
  const key = (chrome as { readonly pane?: unknown }).pane
  return typeof key === 'string' ? TOKENS[key] : undefined
}

// your axis mapping for your own opaque edge vocabulary (same section)
const axisResolver = (edge: unknown): unknown => ({ axis: 'vertical', edge })

describe('UC-1', () => {
  it('carries my token answer, and absorbs my mistakes', () => {
    expect(tokensFor({ pane: 'pane-a' }, tokenFn)).toEqual(['is-empty', 'is-minimized'])
    expect(tokensFor({ pane: 'pane-a' }, undefined)).toBeUndefined()          // absent: zero invocations
    expect(tokensFor({ pane: 'pane-a' }, 42)).toBeUndefined()                 // non-callable: never coerced
    expect(tokensFor({ pane: 'pane-a' }, () => { throw new Error('boom') })).toBeUndefined() // absorbed

    expect(orientationFor('top', axisResolver)).toEqual({ axis: 'vertical', edge: 'top' })

    // the declaration is RETURNED AS TEXT; you apply it (docs/specs/container.md §2.3 item 4)
    expect(containerDeclarationFor('zone-track')).toEqual({
      className: 'zone-track', declaration: 'contain: layout style paint',
    })
    expect(containerDeclarationFor(42).className).toBe('')   // any non-string/non-empty argument ⇒ ''
  })
})
```

```ts
// tests/seam-uc2.test.ts — UC-2: landing the wiring in stages
import { describe, it, expect } from 'vitest'
import { createRelocateSession, withinProximity } from '../src/shared/relocate.js'

describe('UC-2', () => {
  it('an absent session is a valid but inert module, never a throw', () => {
    const inert = createRelocateSession()            // the options record is optional
    expect(inert.attach({ id: 'card-1' })).toBe(false)                 // zero session delegations
    expect(inert.stats().attached).toBe(0)
    expect(inert.reset({ id: 'card-1' })).toEqual({ ok: false, code: 'no-gesture', committed: false })
    expect(inert.detached).toBe(false)
  })

  it('the one comparison site this module owns', () => {
    expect(withinProximity(4, 4)).toBe(true)          // the boundary is INSIDE
    expect(withinProximity(4.0001, 4)).toBe(false)
    expect(withinProximity(-1, 10)).toBe(false)       // a negative operand is not a distance
    expect(withinProximity(10, undefined)).toBe(false) // an unusable threshold: nothing is ever within proximity
  })
})
```

```ts
// tests/seam-uc3.test.ts — UC-3: observe, never gate
import { describe, it, expect } from 'vitest'
import { focusTransition, focusOrder, focusIndex, persist } from '../src/shared/focus-model.js'
import type { FocusEntry, FocusState } from '../src/shared/focus-model.js'

const entries: readonly FocusEntry[] = [
  { id: 'a', target: 'doc-1', label: 'First' },
  { id: 'b', target: 'doc-2' },
]
const state: FocusState = { entries, activeId: null }

describe('UC-3', () => {
  it('the observers are observation; the verdict is the model\'s', () => {
    const seen: string[] = []
    const opened = focusTransition(state, 'open', {
      entry: { id: 'a', target: 'doc-1' },
      refuse: (refusal) => { seen.push(refusal.code) },
      onChange: () => { seen.push('accepted') },
    })
    // opening an UNOWNED id whose target matches an existing entry ACTIVATES that entry:
    // no append, the existing entry's id seats, and one change notification fires.
    expect(opened.accepted).toBe(true)
    expect(opened.verb).toBe('open')
    expect(opened.seated).toBe('a')
    expect(opened.refusals).toEqual([])
    expect(opened.changed).toBe(true)
    expect(seen).toEqual(['accepted'])
    // focusTransition NEVER calls persist: this member is the not-called reading
    expect(opened.persisted).toEqual({ present: false, value: undefined })

    const nowhere = focusTransition(state, 'next')   // activeId is null: no position at all
    expect(nowhere.accepted).toBe(false)
    expect(nowhere.refusals.map((r) => r.code)).toEqual(['no-next'])
    expect(nowhere.state).toBe(state)                // the prior state, BY IDENTITY
    expect(nowhere.changed).toBe(false)

    expect(focusOrder(state.entries)).toBe(entries)  // your array, as supplied — not copied, not sorted
    expect(focusIndex(state, 'b')).toBe(1)
    expect(focusIndex(state, 'zzz')).toBe(-1)        // the declared sentinel

    // YOU call persist, when you decide to (docs/specs/focus-model.md §2.4 seam 3)
    const write = persist((held: FocusState) => held.activeId, state)
    expect(write).toEqual({ present: true, value: null })
    expect(persist(undefined, state)).toEqual({ present: false, value: undefined })
  })
})
```

```ts
// tests/seam-uc4.test.ts — UC-4: a mechanism with no seam — you supply the reading, you apply the write
import { describe, it, expect } from 'vitest'
import { resolveTheme, applyThemeDeclaration } from '../src/shared/theme.js'

describe('UC-4', () => {
  it('the environment reading is an argument, and the attribute write is DATA', () => {
    expect(resolveTheme('dark', { prefersDark: true }))
      .toEqual({ setting: 'dark', prefersDark: true, source: 'env' })

    // an INHERITED member is not the reading: the own-property descriptor is what is consulted
    expect(resolveTheme('dark', Object.create({ prefersDark: true })))
      .toEqual({ setting: 'dark', prefersDark: false, source: 'degraded-env' })

    expect(resolveTheme(null, {})).toEqual({ setting: null, prefersDark: false, source: 'degraded-env' })

    // you own the attribute NAME and you perform the write; the applier only describes it
    expect(applyThemeDeclaration('data-theme', 'dark'))
      .toEqual({ name: 'data-theme', value: 'dark', removal: false })
    expect(applyThemeDeclaration('data-theme', undefined))
      .toEqual({ name: 'data-theme', value: '', removal: true })   // the removal case is DATA, never a call
  })
})
```

## What it refuses / does not do

- **`U-CONTAINER` performs no write of any kind.** The `contain` declaration is an opaque module-owned string
  **returned as text and never parsed or applied**; there is no token, class, axis, taxonomy member, unit or
  selector in it — those are the caller's. No coordinate, geometry, `clientX`/`pointerId`/`getBoundingClientRect`
  result, `matchMedia` result or element lookup can arrive through any parameter. (`docs/specs/container.md` §2.4,
  §2.5 items 2/3, §3.4 R-6.)
- **`U-RELOCATE` reads no coordinate, no event and no geometry, and computes no distance of its own.** The measured
  scalar travels inside the caller's candidate answer; the module owns exactly one comparison. It has **no capture
  member**, invents **no policy default**, and adds **no code** to the session's closed refusal union — it
  propagates the session's codes verbatim. (`docs/specs/relocate.md` §2.1 item 1, §2.4 items 1/5.)
- **`U-FOCUS-MODEL` holds no store, no DOM and no vocabulary.** It owns no entry, id, target, label, order,
  comparator, index, cache, default or policy; there is **no equality/comparator seam** (identity is the one rule),
  and **`persist` is never called by `focusTransition`**. (`docs/specs/focus-model.md` §2.4, §2.5 item 2.)
- **`U-THEME` declares an EMPTY seam set** — no injected callable at all. It owns no token name or value, no
  attribute name (`data-theme` is not in its bytes), no `matchMedia`, no element parameter and no write; the
  applier returns the write it would perform. (`docs/specs/theme.md` §2.1 item 3, §2.4 items 2/3.)

## What a fork must supply

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `tokenFn` `(chrome) => unknown` (`container.ts`) | REQUIRED | the fork | the declared EMPTY answer `undefined`, ZERO invocations, no throw (`container.md` §2.4) | the same declared EMPTY answer — never coerced, never guessed (`container.md` §2.4) | one ATTEMPTED invocation, the throw ABSORBED, `undefined` returned, nothing escapes, never retried (`container.md` §2.4) |
| `axisResolver` `(edge) => unknown` (`container.ts`) | REQUIRED | the fork (the same closure you wire into `E3`/`U-GUTTER-UI`) | `undefined`, ZERO invocations (`container.md` §2.4) | the same declared EMPTY answer (`container.md` §2.4) | one attempt, throw absorbed, `undefined`, never retried (`container.md` §2.4) |
| `session` (`relocate.ts`, read through the frozen session's own surface) | OPTIONAL | **the wiring** (not the fork) | a VALID BUT INERT module: `attach` ⇒ `false` with ZERO delegations, `reset` ⇒ a refusal record, `detach()` ⇒ `false`, zeroed stats, never a throw (`relocate.md` §2.4 item 1) | the same NAMED safe default (the three states are one declared outcome for this seam) (`relocate.md` §2.4 item 1) | the same (`relocate.md` §2.4 item 1) |
| `candidatesFor` `(element) => unknown` (an ARRAY of `CandidateFor`) | OPTIONAL | the fork (app policy) | the EMPTY candidate set ⇒ nothing within proximity ⇒ **the invalid arm at once, not a cancel** (`relocate.md` §2.4 item 1; the answer shape is pinned at §2.4 item 3) | the attempt is COUNTED, the answer is nothing within proximity ⇒ the invalid arm (`relocate.md` §2.4 items 1/2) | the attempt is COUNTED, the throw ABSORBED at the observed-move turn, never retried (`relocate.md` §2.4 item 2) |
| `resolveTarget` `(element, candidates, gesture) => unknown` | OPTIONAL | the fork | `undefined` ⇒ a committing terminal writes **NOTHING** — and it is **NOT a cancel** (`relocate.md` §2.4 item 1) | the attempt is COUNTED, `undefined` ⇒ no target this move (`relocate.md` §2.4 items 1/2) | the attempt is COUNTED, the throw ABSORBED, `undefined`, never retried (`relocate.md` §2.4 item 2) |
| `onReveal` `(target, decision) => void` (channel A) | OPTIONAL | the fork (your layout/reveal state) | a ZERO-EFFECT attempt: the invocation count degenerates and **no default reveal state is invented** (`relocate.md` §2.4 item 1) | no invocation; nothing is invented (`relocate.md` §2.4 item 1) | the attempt is COUNTED, the throw ABSORBED at the module's own commit seam, never retried; it does not escape the terminal turn (`relocate.md` §2.4 items 1/2) |
| `commit` `(gesture, value) => void` — the SINGLE sink writer | OPTIONAL | the fork | a NO-WRITER composition: the write count reads `0` where `1` is required, which **a row must be able to fail** — never a silent success (`relocate.md` §2.4 item 1) | same as absent: no call, the sink count reads `0` (`src/shared/relocate.ts:425-431`) | **PROPAGATES** to the caller of the terminal turn; the attempt is COUNTED, never retried (`relocate.md` §2.4 items 1/2) |
| `threshold` (a caller scalar, **a value — never invoked**) | OPTIONAL | the fork | unusable ⇒ `withinProximity` answers `false` ⇒ nothing is EVER within proximity ⇒ the invalid arm; **no mechanism default exists** (`relocate.md` §2.4 item 1) | not a call surface: a non-number (including a function) fails the comparator's `typeof` gate and answers `false` (`src/shared/relocate.ts:43-48`, `:373`) | no throw arm — the value is never called; an unusable value answers `false` (`relocate.md` §2.4 item 1) |
| `onPreview` `(state) => void` (channel B) | OPTIONAL | the fork (a transient channel, NEVER the sink) | the ghost and the hide have **no carrier**: zero preview invocations, and every count row still holds (`relocate.md` §2.4 item 1) | no carrier write; the module still satisfies its count rows (`src/shared/relocate.ts:398-411`) | **PROPAGATES** from the observed-move turn; the per-gesture record is discarded in the module's `finally` (`relocate.md` §2.4 items 1/2) |
| `preDragValueOf` `(element) => unknown` — a member of the `attach` hooks record, **not an eighth seam** | OPTIONAL | the fork (per-control record) | the NO-CALLER-VALUE refusal: nothing is invented, the third `reset` argument reads `undefined`, and neither `attach` nor the establishment turn throws (`relocate.md` §2.1 item 7, §2.4's amendment note) | the same refusal, absorbed (`relocate.md` §2.1 item 7) | the same refusal: the capture is ABSORBED, never propagated (`relocate.md` §2.1 item 7) |
| `refuse` `(refusal) => void` (`focus-model.ts` ← `arg.refuse`) | OPTIONAL | the caller | no call attempted; the refused result is the no-seam result (`focus-model.md` §2.4 seam 1, law 1) | no call attempted; the verdict is unmoved (`focus-model.md` §2.4 seam 1) | SWALLOWED; the refusal stands, and **no refusal code is invented for caller code** (`focus-model.md` §2.4 seam 1, law 4) |
| `onChange` `(next, previous, refusal?) => void` (← `arg.onChange`) | OPTIONAL | the caller | no call attempted; the accepted result is bit-for-bit the called case (`focus-model.md` §2.4 seam 2) | no call attempted, same result (`focus-model.md` §2.4 seam 2) | SWALLOWED — the transition is still ACCEPTED with the same result (`focus-model.md` §2.4 seam 2) |
| `persist` `(seam, state) => {present, value}` — a **top-level export the caller calls**; `focusTransition` never calls it | OPTIONAL | the caller | `{ present: false, value: undefined }`, and the module calls NOTHING (`focus-model.md` §2.4 seam 3) | `{ present: false, value: undefined }`, no call attempted (`focus-model.md` §2.4 seam 3) | `{ present: false, value: undefined }`, the throw SWALLOWED, nothing escapes (`focus-model.md` §2.4 seam 3) |
| **`U-THEME`** — no seam | — | — | the seam set is EMPTY: the `env` reading is an ordinary argument record (`theme.md` §2.1 item 3, §2.3 item 2) | n/a — there is no callable to be non-callable | n/a — nothing is invoked, so nothing can throw from a seam (`theme.md` §2.4 item 3) |
| `containerFactory` `(key) => unknown` (`slot-host.ts`) — **the SOLE container source** | OPTIONAL | the fork | **nothing is placeable**: the key's container is treated as ABSENT, `placed` `[]`, `containerFor(key)` returns `null` for every key, `keys()`/`order` still valid, and **no refusal is invented** — in particular `'no-container'` is DECLARED-BUT-NOT-EMITTED (`slothost.md` §2.1's container-source clause items 4/5, `§3.2 F-11`/`F-12`) | the SAME declared outcome as absent — `F-12` states all five drives (omitted · `undefined` · non-callable · throwing · unusable-return) as ONE `F-6`-class degradation, so a non-callable factory is not a separate state (`slothost.md` §3.2 `F-12`) | the same: the throw is **CAUGHT**, never re-thrown, and becomes no refusal code of its own (`slothost.md` §2.1's totality-boundary table, the FIFTH seam; `§3.2 F-12`) |
| `mount` (`owned-list-host.ts`) — the single container the host places your nodes in; plus `itemFactory` `(entry) => N \| null` | OPTIONAL | the fork | a VALID no-op with **no placement and no container-state refusal**: the mount is *"the container the host places CALLER-CREATED nodes inside"*, and an unusable one simply places nothing (`listhost.md` §2.1; `src/shared/owned-list-host.ts:129-132`, `:172-176`) | the same declared no-op shape — `mount` is a container, not a callable, so "non-callable" has no separate arm (`listhost.md` §2.1) | the factory's throw is **ABSORBED** and takes the same safe default as a factory returning nothing: the typed `'factory-returned-null'` refusal for that entry (`listhost.md` §2.1, `§3.2`; `src/shared/owned-list-host.ts:271-289`) |

**⟶ WHY THE LAST TWO ROWS ARE HERE WHEN THIS PAGE'S SCOPE PARAGRAPH USED TO SEND THEIR UNITS ELSEWHERE (`2026-10-04`, the `SLOT-HOST-ENVELOPE-AUTHORED-CONTAINER-SOURCE` gate-1 disposition's guide pass).** **They were missing, and their absence is what made a downstream fork ask this repo whether an envelope-authored consumer could satisfy the container seam at all:** it read the two hosts' **module headers** (*"a container manager for CALLER-CREATED nodes"*) as the contract, found no seam row on this page, and filed a capability gap against a contract that already admitted its case. **THE READING THAT GOVERNS IS THE NORMATIVE ONE, AND A MODULE HEADER IS NOT A CLAUSE.** A container is **any value offering a function-valued `appendChild`** — `slothost.md` §2.1's container-source clause item 3: *"a real DOM element satisfies it; a shim `ShimElement` satisfies it; a plain object offering an `appendChild` function satisfies it; **no predicate such as `instanceof` or a tag check is asserted or admissible**"* — and the module's own predicate is exactly that one test (`isNodeShaped`/`isUsable`, `src/shared/slot-host.ts:167-171`, `:199-203`, with `obtainContainer` accepting on `isUsable` alone). **So a runtime-materialised, framework-authored element is admitted BY CONSTRUCTION, and the header's *"CALLER-CREATED nodes"* describes WHOSE NODES the host places — never what a container may be.** **The one constraint on top of the shape is TIMING, not category:** the factory is invoked only when the host is **driven** for that key with a present and usable injected `container` (`src/shared/slot-host.ts:305-322`, reached from `setNode`/`setOrder`/`render`; **never at construction**), so the value must exist at that moment and be re-supplied if the consumer's own tree re-materialises. **A source that READS A TREE — a projection, a lookup, a `querySelector`-family read — is NOT admissible**, and this repo declines to add one (`docs/decisions.md`'s ACTIVE row `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` stays untouched: the source is **injected**, and the ambient read stays deleted). **The fork-facing recipe, the ordering rule and the `owned-list-host` divergence are in `docs/FORKER.md` §4's `### THE HOST CONTAINER SOURCE — WHAT A FORK SUPPLIES, AND WHEN IT IS CALLED`; the pinning decision is `docs/decisions.md`'s ACTIVE row `SLOTHOST-CONTAINER-SOURCE-ADMITS-A-RUNTIME-MATERIALISED-CONTAINER` (cited by row name); the full four-step disposition and its `OWED` residues are `docs/specs/slot-host-envelope-authored-container-source-review.md` and `docs/pending.md` §N.**

**⟶ THE PERSISTENCE BOUNDARY, AT THE `persist` ROW (`2026-09-29`):** **the family's answer to persistence is the caller-called returned write above — `persist(seam, state)` hands your seam's own value back to YOU — and the foundation supplies NO store** (`docs/decisions.md` ACTIVE row `NO-FOUNDATION-CONFIG-FILE-FACILITY`; `S-d4` + `H-r16` in `docs/specs/provident-electron-shell-chrome-handoff-review.md`; a fork's own carrier is `docs/FORKER.md` §4's `### PERSISTENCE — WHAT A FORK OWNS`).

## Gotchas measured in this repo

### Expectations — four facts a fork gets wrong BEFORE it files an ask about the gesture layer

- **The per-move value push is YOUR `onMove` handle; `sizeFor` is read ONCE, at the committing terminal.**
  There is no mechanism-side per-move presentation seam to request, and the preview channel is the
  consumer's own and is **never the sink** (the rows above cite `docs/specs/gutter.md` §2.3 item 2(b),
  §2.3's *"The consumer-owned preview channel"* block, §2.5, §2.6 item 4b, §4.4 `S-10` class (b), `I-2b`).
  The affordance's `applyPreview` seam is where a presentation write goes, with its degradation declared
  at its own row.
- **The clamp happens at exactly one site, and `clampToBounds` is a public pure VALUE export you may call
  directly.** A second clamp site is not admissible (`docs/specs/gutter.md` §2.1, §2.3 item 3 clause
  (iii), §4.4 `S-PURE-4`) — so an interim of your own that calls it **is** the family's clamp, not a
  rival authority.
- **The affordance COMPOSES the controller and takes your SESSION; it does not accept a controller, and a
  refused `attach()` rolls its own listeners back.** The direction is fixed by contract, not by taste
  (`docs/specs/gutter-ui.md` §2.1 clause 4 and its `attach` cell, §3.1 `M-6`; the ACTIVE row
  `E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY`; `docs/specs/gsession.md` §2.4 item 2).
- **Element identity survives a PATCH write, and a full graph re-derivation is OUT OF CONTRACT** — the
  wiring does not re-attach and the affordance goes **inert**, with no throw (`docs/specs/gutter-ui.md`
  §2.3 rows 15/**16**, §7 item 15, §3.3 `I-15`). Write through the managed patch channel or defer the
  reveal; do not ask for a re-claim route (the delegate surface is frozen:
  `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`). **And a `0px` track is a TOKEN this family emits, never
  a box** — a member's slot/location geometry is the consumer's to measure (`docs/specs/zones.md` §2.3
  item 7, §3.3 `I-10`, §4.4 `S-6`; `docs/specs/census.md` §2.5; the mandatory clause `S-d11`).

- **`U-FOCUS-MODEL` is imported by a `src/**` file today**, although its own unit record and module header say
  “imported by NO `src/**` file”: `src/renderer/renderer.ts:10` imports `focusTransition`, `focusOrder`,
  `FocusEntry` and `FocusState` (the `U-FOCUS-TOOL` wiring). Read that census claim as scoped to the unit's own
  diff — the unit's row records the renderer path as a named exemption (`tests/focus-model.test.ts`, the
  `DECLARED_IMPORTER_EXEMPTIONS` message at `:952`).
- **Two return shapes you cannot import.** `RelocateResetResult` (the type of `RelocateSession.reset`'s return) is
  declared **without** `export` (`src/shared/relocate.ts:206`), and `FocusResult`, `FocusRefusal` and
  `FocusTransitionArg` are likewise module-local (`src/shared/focus-model.ts:88`, `:102`, `:109`) even though
  values return them and `arg.refuse`/`arg.onChange` take them. A fork re-declares those four shapes.
- **`threshold` is a VALUE seam, not a callable.** `createRelocateSession({ threshold: () => 24 })` never brings
  anything within proximity: the option is handed raw to `withinProximity`, whose `typeof` gate answers `false` for
  a non-number (`src/shared/relocate.ts:373`, `:44`).
- **Attempt counting differs per seam.** `candidateCalls`/`resolveCalls` count an ATTEMPT whenever the option
  carried anything other than `undefined` — including a non-callable and a throwing callable — while
  `sinkCalls` counts **only an actual invocation** of `commit`, so a non-callable sink reads `0`
  (`src/shared/relocate.ts:357`, `:389`, `:425-431`).
- **`focusTransition`'s `persisted` member is always `{ present: false, value: undefined }`.** The module never
  calls `persist`; only your own call to the exported `persist` can produce `present: true`
  (`src/shared/focus-model.ts:294`, `:323`, `:450`).
- **`detach()` on a relocate session returns `false` unless exactly ONE element is in its ledger** — with two
  attached elements it reports `false` and the session is not disposed (`src/shared/relocate.ts:704-714`). A
  repeat `attach` of the same element, and a `null`/`undefined` element, are refused (`:611-614`).
- **`containerDeclarationFor` returns a FRESH record every call** whose two member values equal the first call's,
  with `declaration` returned by constant reference — compare member values, never record identity
  (`src/shared/container.ts:80-84`; the pinned reading is `docs/specs/container.md` §3.4 R-8's class).
- **`U-THEME` reads `prefersDark` by own-property descriptor only**: an inherited member reads
  `{ prefersDark: false, source: 'degraded-env' }` (`src/shared/theme.ts:45`).
- **`U-CONTAINER`, `U-RELOCATE` and `U-THEME` are imported by no `src/**` file**, and the build's five entries are
  the paths named in `package.json`'s `build` script — so those three modules are in **no shipped bundle** and a
  fork consumes them as source. `U-FOCUS-MODEL` is the exception (see above).
- **The examples above were not executed by this pass.** Every export name, argument and outcome is read from the
  cited source lines, but a static `../src/shared/<x>.js` value import from a new `tests/` file is — **unverified**;
  it would be settled by running one of the four snippets under `npx vitest run`.

## See also

- `docs/guide/README.md` — the index, and the reading order (this page is read third, as a fork author).
- `docs/guide/TEMPLATE.md` — the binding section order and the three rules (the third: a module header is not a clause).
- `docs/guide/00-base-surface.md` — the base surface, the tool set and the gate model.
- `docs/FORKER.md` §4 — the fork-facing seam blocks, unit by unit; `docs/decisions.md` — the ACTIVE family ruling.
- `docs/specs/container.md`, `docs/specs/relocate.md`, `docs/specs/focus-model.md`, `docs/specs/theme.md`,
  `docs/specs/slothost.md`, `docs/specs/listhost.md` — the
  contracts. If this page and a spec disagree, the spec governs and this page is the thing to fix.
- `docs/specs/slot-host-envelope-authored-container-source-review.md` + `docs/pending.md` §N — the disposition
  that added the two host-family rows above, with its `OWED` residues; `docs/guide/README.md`'s *"Units that have
  no page here"* — why these units have no page, and the rules that keep a missing page from becoming a
  missing contract.
