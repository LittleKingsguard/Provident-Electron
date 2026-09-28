# `U-CONTAINER` — the pure selector/normalizer mechanism and the returned-as-text `contain` declaration

`U-CONTAINER` is wave `E`, ledger row `E5`. This page is for a developer reading
`src/shared/container.ts` for the first time and for a fork author who must supply the two
closures it calls. The one-line answer: it is three pure functions that **select** the
caller's token answer, **normalize** the caller's opaque edge value to the caller's own
orientation value, and **return** the one shipped `contain` declaration as unparsed text
beside the caller's class name — it applies nothing, reads no geometry and writes nothing.

## What it is

It owns three responsibilities and no fourth: selecting a caller answer, normalizing a
caller value, and returning a text constant. The caller supplies everything the mechanism
operates on — the `chrome` value, the token mapping, the `edge` value, the axis mapping and
the class name — and the mechanism hands each answer on unchanged. The mirror-class
taxonomy the mechanism serves is the caller's and appears in no byte of the module
(`docs/specs/container.md` §1 items 1/2, §2.2).

The one artifact it owns is a string. `contain: layout style paint` is a module-owned opaque
constant that is **returned**, never parsed and never applied; the consumer applies it
(`docs/decisions.md`, ACTIVE row `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`).
That reading is why the unit is provable in this repo's node suite at all, and why no live
battery is owed (`docs/specs/container.md` §0A note 1, §5.2).

It deliberately does **not** own emptiness, reveal or minimization; token formatting; the
record build; the mirror-class taxonomy; any selector, rule or stylesheet; any coordinate,
geometry or element; and any write of any kind (`docs/specs/container.md` §1 items 2–6,
§2.5 item 3).

It is a reusable-contract module, not a feature: it is imported by no `src/**` file and
appears in none of the built bundles. Its value is the discipline a fork implements plus the
declaration text it returns (`docs/specs/container.md` §1 item 8).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/container.ts` | values `tokensFor`, `orientationFor`, `containerDeclarationFor`; types `ChromeTokenFn`, `AxisResolver`, `ContainerDeclaration` — six names, three value + three type (`docs/specs/container.md` §2.1 item 1, §3.4 `R-5`) |
| `tests/container.test.ts` | the unit's own rows, including its property-register rows and the static byte/token scans — it reaches the module for values through a dynamic `import` and imports the three type names as `import type` (`docs/specs/container.md` §3.4 `R-1`…`R-13`, §5.2 legs 1/5) |
| `docs/specs/container.md` | the contract (this page cites it; never a second authority for it) |
| `docs/next-steps.md` | the landed record — `## DONE — U-CONTAINER`, the ledger's fifteenth `DONE` row, wave `E`'s seventh |

The module imports nothing at all — not even type-only — and that emptiness is a pinned row
(`docs/specs/container.md` §2.1 item 3, §3.4 `R-4`).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/container.md` | §2.1 | the surface, the signatures, the export census in two halves, the import census |
| `docs/specs/container.md` | §2.3 | the dispatch rules, the value rules, the closed literal set, `className` as a returned value |
| `docs/specs/container.md` | §2.4 | the two contract edges, their REQUIRED status and their declared degradations |
| `docs/specs/container.md` | §2.5 | what the module may read, the no-reach clause, the entry-point path answer |
| `docs/specs/container.md` | §2.2 | what is caller-supplied, the prohibitions, the `axisResolver`↔`AxisOf` reconciliation |
| `docs/specs/container.md` | §1 items 2–6 | the declared non-goals (no token production/formatting, no emptiness, no UI element, no geometry) |
| `docs/specs/container.md` | §5.2 | the five declared legs and the three-part refusal of a `[U]` row and of a `[D]` row |
| `docs/specs/container.md` | §3.4, §3.5 | the static rows and the existence rows a reader can check in the source |
| `docs/decisions.md` | the rows `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` and `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE` | the two architect rulings the unit derives from |
| `docs/decisions.md` | the row `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` | why each seam's degradation is contract text rather than a convenience |

## Use cases

**UC-1 — I have my own chrome vocabulary and need my own token mapping consulted once.**
Your panes carry a chrome record with members only your app knows (`pane`, `region`, your own
mode flags). You want the mapping applied by the mechanism, exactly once, with nothing merged
into or filtered out of the answer.

**UC-2 — I have an opaque edge value and my own axis vocabulary.**
A gesture or gutter hands you a value whose meaning is entirely yours — an enum, a record, a
string. You want it normalized to your own orientation value without the mechanism acquiring
an edge vocabulary of its own.

**UC-3 — I need the `contain` declaration and the class name that goes with it.**
You are wiring containment into your own layer; you want the shipped declaration text and your
own caller-supplied class name returned to you as data, so your renderer (or your CSS layer)
does the applying.

**UC-4 — I am on the seam side: a caller passes no mapping, or one that throws.**
You are writing a calling layer that may be handed a missing or failing closure — a fork
composing a mechanism with no configured mapping yet. You need the declared degradation to be
a value you can branch on, not an exception you must catch. This is also the use case most
worth pinning in your own test, since the repo's own suite drives it.

## Code, runnable

```ts
// UC-1 — select my own token answer for my own chrome record, once.
// (The specifier below is the one this repo's own test file uses; import the
//  module by whatever specifier your own layout needs — it imports nothing.)
import { tokensFor } from '../src/shared/container.js'

// My vocabulary, my record, my closure.
const chrome = { pane: 'left', region: 'gutter', collapsed: false }
const calls: unknown[] = []
const tokenFn = (value: unknown) => {
  calls.push(value)
  const record = value as typeof chrome
  return `${record.pane}-${record.region}`
}

const token = tokensFor(chrome, tokenFn)
// token: 'left-gutter'  — the closure's answer, returned by identity
// calls: [chrome]       — exactly one invocation, with the value I supplied
```

```ts
// UC-2 — normalize my opaque edge value to my own orientation value.
import { orientationFor } from '../src/shared/container.js'

type Edge = { from: 'top' | 'bottom' | 'left' | 'right' }
type Axis = 'horizontal' | 'vertical'

const edge: Edge = { from: 'left' }
const axisResolver = (value: unknown): Axis => {
  const { from } = value as Edge
  return from === 'left' || from === 'right' ? 'horizontal' : 'vertical'
}

const axis = orientationFor(edge, axisResolver)
// axis: 'horizontal' — my own answer, by identity; the mechanism has no edge vocabulary
```

```ts
// UC-3 — the shipped declaration text, returned beside my class name.
import { containerDeclarationFor } from '../src/shared/container.js'

const result = containerDeclarationFor('my-pane-chrome')
// result: { className: 'my-pane-chrome', declaration: 'contain: layout style paint' }
```

```ts
// UC-4 — the declared degradation, as a value; and the same fact pinned in this repo's suite style.
import { expect, it } from 'vitest'
import { containerDeclarationFor, orientationFor, tokensFor } from '../src/shared/container.js'

// (a) the degradation: absent and throwing seams both yield the declared empty answer
const noMapping = tokensFor({ any: 'record' }, undefined)
// noMapping: undefined — zero invocations, nothing thrown
const throwingMapping = tokensFor({ any: 'record' }, () => {
  throw new Error('my mapping failed')
})
// throwingMapping: undefined — the invocation was attempted, the throw was absorbed

// (b) pinning it, the way the repo's own rows are written
it('a throwing resolver yields undefined and never escapes', () => {
  let attempts = 0
  const axisResolver = (): never => {
    attempts += 1
    throw new Error('no axis configured')
  }
  expect(orientationFor({ from: 'left' }, axisResolver)).toBeUndefined()
  expect(attempts).toBe(1)
  expect(containerDeclarationFor(undefined).className).toBe('')
})
```

Observed on `npm test`: the unit's own file in `tests/container.test.ts` drives these facts
and passes; the declaration member comes back byte-identical to `'contain: layout style paint'`
and the class-name member comes back verbatim for any string of length ≥ 1
(`docs/specs/container.md` §2.3 items 1–4, §3.1 the `M-1`…`M-12` rows).

## What it refuses / does not do

- **No applied styling.** The declaration is returned, never applied; the unit performs no
  write of any kind and offers no row for containment taking effect, for a layout or paint
  boundary, or for any stylesheet or `:has()` match (`docs/specs/container.md` §5.2, §2.3 item 4).
- **No token production or formatting.** No token, size, unit, `-0` rule, empty-token limb or
  malformed-spec limb is computed; the module's arithmetic is zero operations
  (`docs/specs/container.md` §1 item 2).
- **No emptiness, reveal or minimization decision.** It consults no member of `chrome` for any
  decision; the returned value is the caller's own answer, unaffected by the record's members
  (`docs/specs/container.md` §1 item 3, §2.3 item 3).
- **No coordinate, geometry or element.** No parameter through which an event object, a
  coordinate, a bounding rect, a computed style or an element could arrive
  (`docs/specs/container.md` §1 item 5, §2.5 item 2; `docs/decisions.md`, ACTIVE row
  `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`).
- **No UI element, class taxonomy, selector or stylesheet.** The taxonomy it serves is the
  caller's and the module names no rule and no selector (`docs/specs/container.md` §1 item 4).
- **No import, no factory, no options object, no session, no state.** Not even a type-only
  import; the own-seam set is empty (`docs/specs/container.md` §2.1 item 3, §2.4).
- **No new surface.** No MCP tool, resource, group, `RpcMethod` member, `MUTATING_METHODS`
  entry, IPC method, shim member, CSS file, store or persistence
  (`docs/specs/container.md` §1 item 6, §3.4 `R-2`/`R-3`/`R-11`).
- **No renderer wiring, no demo envelope and no live battery.** The unit is imported by no
  `src/**` file; its `[U]` row is not offered and its gate 6 status is `STRUCTURAL`, not waived
  (`docs/specs/container.md` §5.1, §5.2).

## What a fork must supply

The own-seam set is empty — no factory, no options object, no session. The only two contract
edges are the injected callables, and they are the whole seam contract a fork implements
(`docs/specs/container.md` §2.4).

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `tokenFn` | REQUIRED | the fork / the calling layer — its mirror-class taxonomy lives here and only here | the declared empty answer `undefined`, zero invocations, nothing thrown (`docs/specs/container.md` §2.4, §2.3 item 1(b)) | the same declared empty answer `undefined` — no coercion, no guess, no mechanism default (`docs/specs/container.md` §2.4) | the invocation is attempted exactly once, the throw is absorbed, `undefined` is returned, nothing escapes, never retried (`docs/specs/container.md` §2.4) |
| `axisResolver` | REQUIRED | the fork / the calling layer — the **same single closure** it wires into the family's other axis seams, so two axis readings cannot disagree (`docs/specs/container.md` §2.2 item 3, §2.5 item 4) | the declared empty answer `undefined`, zero invocations, nothing thrown (`docs/specs/container.md` §2.4, §2.3 item 2) | the same declared empty answer `undefined` (`docs/specs/container.md` §2.4) | one attempted invocation, the throw absorbed, `undefined` returned, nothing escapes, never retried (`docs/specs/container.md` §2.4) |

Both seam types are exported so a fork can import the shape it must implement:
`ChromeTokenFn = (chrome: unknown) => unknown` and `AxisResolver = (edge: unknown) => unknown`
(`docs/specs/container.md` §2.1 item 1, §2.4). `AxisResolver` is shape-identical to the landed
`AxisOf` — a name/shape relation, never an import edge (`docs/specs/container.md` §2.2 item 3).

The fork also supplies the values, because this repo supplies none of them to this module: the
`chrome` record, the `edge` value and the class name (`docs/specs/container.md` §2.2).

## Gotchas measured in this repo

- The module is 85 lines with an empty import census and is imported by no `src/**` file; the
  built output set is unchanged by its presence — the unit ships a contract, not a feature
  (`src/shared/container.ts`; `docs/specs/container.md` §1 item 8, §5.2 leg 3).
- The only two `src/**` references to sibling container paths anywhere under `tests/**` are
  path **strings** used by the denied-path and allow-list probes of other units' scan rows —
  the specifier appears as a literal, never as a value import (`tests/gutter.test.ts`,
  `tests/menu-template.test.ts`).
- `className` is a **declared exempt member name** on this unit's own no-write scan, while the
  write forms themselves stay banned with no exemption: what the two landed UI-write lists ban
  is the write, and this module returns the name as a value
  (`docs/specs/container.md` §2.3 item 6, §3.4 `R-10`).
- The returned declaration is a constant returned by constant reference — byte-identical and
  `27` characters, for every argument — and no byte of it is read for any decision
  (`src/shared/container.ts`; `docs/specs/container.md` §2.3 item 4, §3.4 `R-8`).
- Import the module as `'../shared/container.js'` (or from a test, `'../src/shared/container.js'`)
  — `.js` in the specifier, matching every landed import in this tree; the module itself carries
  no import to copy from (`tests/container.test.ts`, the `import type` lines; `tests/gutter.test.ts`).
- The repo's own test file reaches this module's values through a dynamic `import` assembled
  from fragments, so an absent module fails each row rather than failing to load the file
  (`tests/container.test.ts`).
- **The unit's own closing trio (gate 9) is `OWED`** in its landed record: the close-out pass
  that wrote `## DONE — U-CONTAINER` held no shell and marked every leg cell `OWED AT THIS PASS`
  (`docs/next-steps.md`, `## DONE — U-CONTAINER` clauses 1/6). The last recorded full-suite
  figure for this unit's neighbourhood is `70` files / `1696` passed / `2` skipped from an
  earlier pass — **unverified as the current tree's reading**; would be settled by running
  `npm test` now.
- **Two carried obligations remain open for this unit, both `OWED` rather than covered:** the
  lone-surrogate class-name coverage gap in the executed property layer, and the six
  negative-generator rows (`docs/specs/container.md` `CURRENT STATE` item 11, §3b;
  `docs/next-steps.md`, `## DONE — U-CONTAINER` clause 12).
- **The fork-facing seam block and adopted-name glossary for this unit are still owed in
  `docs/FORKER.md`** — measured at its close-out pass, that file's `U-CONTAINER` row carries no
  seam block (`docs/next-steps.md`, `## DONE — U-CONTAINER` clause 12). Until it lands, this page's
  seam table is a guide reading, not the fork-facing carry.

## See also

- `docs/guide/TEMPLATE.md` — the binding page template and the two rules.
- `docs/guide/README.md` — the index, the readers and the reading order.
- `docs/guide/seams.md` — every seam in the closed wave, in one table.
- `docs/specs/container.md` — the contract this page cites.
- `docs/specs/container-greens.md` — the blind green-scenario artifact for this unit.
- `docs/next-steps.md` — the `## DONE — U-CONTAINER` record.
