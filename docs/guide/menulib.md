# `U-MENULIB` — the consumer-agnostic menu-template builder: normalize a catalog, project a template, select your injected picker's answer

`U-MENULIB` is wave `E`, ledger row `E7`, landed as the ledger's sixteenth `DONE` row
(`docs/next-steps.md`, `## DONE — U-MENULIB`). This page is for a developer reading
`src/shared/menu-template.ts` for the first time and for a fork author who must supply the one
closure it calls. The one-line answer: three pure functions that **normalize** an untrusted
catalog into carried entries, **project** a caller-shaped template value whose only structural
difference across platforms is the `'darwin'` collapse, and **select** the answer of a picker the
caller injects — the module composes no menu, opens no dialog, reads no OS and writes nothing.

## What it is

It owns three responsibilities and no fourth: normalizing caller data, projecting caller data, and
selecting a caller's own answer. Everything the mechanism operates on is caller-supplied — the
catalog and every element, own key and value of it; every `id`, `label`, `accelerator`, `role`,
`kind`, `submenu` and `enabled`; the `platform` value; and the picker closure with its own
vocabulary and its own answer. The module's own vocabulary is its three function names, six type
names, seven carried key names, two platform member names and the two tokens `'darwin'` and
`'picker'` — and nothing else (`docs/specs/menulib.md` §2.2, §2.5 item 2).

The renamed symbol matters when you arrive from a fork's older code: the builder is
`buildMenuTemplate`, and the fork's `buildMenuFromCatalog` is **retired, not aliased** — it is not
an export, not a re-export and not a deprecated name, and the landed module contains no occurrence
of it at all (`docs/specs/menulib.md` §1 item 2, §3.4 `R-5`(a); `docs/next-steps.md`,
`## DONE — U-MENULIB` clause (3)).

It is a contract module rather than a feature. This repo supplies it no consumer: the module is
imported by no `src/**` file, appears in none of the built outputs, and ships neither a menu nor a
picker. Its value is the discipline a fork implements — the normalizer's (untrusted data becomes
carried entries, never a throw), the projector's (seven keys verbatim, others dropped, one platform
rule and no other structural difference) and the seam's (the fork's picker is called and its answer
handled, or its absence declared) (`docs/specs/menulib.md` §1 item 9, §2.5 item 5).

It is not a UI element, which is why it sits outside the project-wide provident-rendering rule: it
authors no text, control, affordance, class taxonomy, slot content or styling, and it returns one
value rather than populating anything
(`docs/decisions.md`, ACTIVE row `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`; `docs/specs/menulib.md`
§1 item 4, §2.2 `P-ML-2`).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/menu-template.ts` | values `normalizeCatalog`, `buildMenuTemplate`, `selectCatalogItem`; types `PickerFn`, `CatalogEntry`, `PlatformProjection`, `ProjectedItem`, `MenuTemplate`, `TemplateOptions` — nine names, three value + six type (`docs/specs/menulib.md` §2.1 item 1, §3.4 `R-5`) |
| `tests/menu-template.test.ts` | the unit's own rows — the happy states `M-1`…`M-9`, the fail-states `F-1`…`F-10`, the invariants `I-1`…`I-12`, the static rows `R-1`…`R-13`, the existence rows it drives (`X-1`/`X-2`/`X-4`/`X-5`, of the five the spec files at `§3.5`), and the dated regression rows of `§3d` (`docs/specs/menulib.md` §3.1–§3.5; the landed record counts the file's rows in its clause (4)) |
| `docs/specs/menulib.md` | the contract (this page cites it; it is never a second authority for it) |
| `docs/specs/menu-template-greens.md` | the unit's scenario artifact, authored from the documentation alone (`docs/specs/menulib.md` §5.3 item 8) |
| `docs/next-steps.md` | the landed record — `## DONE — U-MENULIB`, the ledger's sixteenth `DONE` row |
| `docs/FORKER.md` | the fork-facing row for this unit — the seam block and the unit's honest limits (`docs/FORKER.md`, its `U-MENULIB` row) |

The module imports nothing at all — not even type-only — and that emptiness is a pinned row
(`docs/specs/menulib.md` §2.1 item 3, §3.4 `R-4`).

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/menulib.md` | §1 | the scope, the renamed symbol, and the declared non-goals |
| `docs/specs/menulib.md` | §2.1 | the surface, the three signatures, the return shapes, the export census in two halves, the import census, the closed literal set |
| `docs/specs/menulib.md` | §2.2 | what is caller-supplied, the twelve prohibitions, the token-collision reconciliations, and the semantics table for every identifier |
| `docs/specs/menulib.md` | §2.3 | the value rules — the normalizer's dispatch, the carry and drop rule, the platform projection, the collapse, the seam invocation, the `id` domain |
| `docs/specs/menulib.md` | §2.4 | the one contract edge, its four declared degradations, `platform`'s REQUIRED status, and the OS-boundary clause |
| `docs/specs/menulib.md` | §2.5 | the composition boundary — what the module may read, and the no-fabricated-edge clause |
| `docs/specs/menulib.md` | §3.1–§3.5 | every state, fail-state, invariant, static row and existence row a reader can check |
| `docs/specs/menulib.md` | §3c, §3d, §3.1's dated `enabled` pin | the dated pins the landed module is read through (the carry-rule sub-readings, the regression rows, and the degraded `'picker'` item's `enabled`) |
| `docs/decisions.md` | the row `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` | why each seam's declared degradation is normative contract text rather than a convenience |
| `docs/decisions.md` | the row `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` | the mechanism-vs-UI-element test this module satisfies |
| `docs/specs/menulib-review.md` | its four filed steps | the closed review record the contract derives from (cite it for provenance; the contract is the authority) |

## Use cases

**UC-1 — I have untrusted catalog data and nothing may throw.**
Your catalog comes from a config file, a plugin or a fork's own registration code, so it may be
`undefined`, a non-array, or an array carrying `null`s, primitives, functions and hostile records.
You want entries you can reason about, with the unusable parts skipped rather than thrown over.

**UC-2 — I need the same catalog as a platform-shaped template value.**
You are handing a shape to your own composer, and one of your platforms wants the `'picker'`-kind
entries collapsed into a single parent while the others want the sequence unchanged. You want both
shapes from one call, and you want to know which platform value produced which shape.

**UC-3 — I want my own picker to choose among the picker-kind entries.**
Your app has its own way of asking (a native dialog on one platform, your own in-renderer list on
another). You want the choice made by your closure and handed back unchanged, and you want a
missing or failing picker to be a `null` answer rather than an exception.

**UC-4 — I am on the seam side: I implement the picker.**
You are writing the fork-side closure the module calls, with the type it exports, and you need the
declared behaviour for the three ways your seam can be unusable — absent, non-callable and
throwing — because those become values your caller can branch on.

## Code, runnable

```ts
// UC-1 — normalize the app's own catalog data; unusable elements are skipped, nothing throws.
import { normalizeCatalog } from '../shared/menu-template.js'

const catalog = [
  { id: 'open', label: 'Open…', accelerator: 'CmdOrCtrl+O', kind: 'file', enabled: true },
  { id: 'pick-a', label: 'Alpha', kind: 'picker' },
  { id: 'pick-b', label: 'Beta', kind: 'picker' },
  { id: 'quit', label: 'Quit', role: 'quit', extra: 'not carried' },
  null,
]

const entries = normalizeCatalog(catalog)
// entries.length: 4                      — the `null` element is skipped, never thrown over
// Object.keys(entries[0]): ['id', 'label', 'accelerator', 'kind', 'enabled']
// Object.keys(entries[3]): ['id', 'label', 'role']   — `extra` is DROPPED, never copied,
//                                                     and `enabled` is absent (not `undefined`)
// normalizeCatalog(undefined): []        — the declared empty answer for a non-array
```

```ts
// UC-2 — project the same catalog for my platform values.
import { buildMenuTemplate } from '../shared/menu-template.js'

const catalog = [
  { id: 'n1', kind: 'file', enabled: true },
  { id: 'pa', kind: 'picker', enabled: true },
  { id: 'pb', kind: 'picker', enabled: true },
  { id: 'pc', kind: 'picker', enabled: true },
  { id: 'n2', kind: 'file', enabled: true },
]

const onWindows = buildMenuTemplate(catalog, { platform: 'win32' })
// onWindows.platform: { recognized: true, collapsing: false }
// onWindows.items.length: 5   — the identity projection, every entry carried as its own record

const onMac = buildMenuTemplate(catalog, { platform: 'darwin' })
// onMac.platform: { recognized: true, collapsing: true }
// onMac.items.length: 3       — [pa, pb, pc] became ONE parent; `n1` and `n2` keep their positions
// onMac.items[1]: { id: 'pa', kind: 'picker', enabled: false,
//                   submenu: [ { id: 'pb', kind: 'picker', enabled: true },
//                              { id: 'pc', kind: 'picker', enabled: true } ] }
//   (no picker was supplied here, so the parent's `enabled` records the seam's state — see the
//    `enabled` gotcha below; the submenu's own entries keep their carried values)

const unset = buildMenuTemplate(catalog)
// unset.platform: { recognized: false, collapsing: false }   — never a silent `'darwin'` default
// unset.items.length: 5                                      — the identity projection
```

```ts
// UC-3 — let my own picker choose, and get my answer back unchanged.
import { selectCatalogItem } from '../shared/menu-template.js'

const catalog = [{ id: 'open' }, { id: 'edit' }]

selectCatalogItem(catalog, (candidates) => candidates[1].id)
// 'edit' — my own answer, returned by identity, after exactly one invocation

selectCatalogItem(catalog, () => 'nope')
// null — the answer names no `id` this catalog's carried entries carry

selectCatalogItem(catalog)
// null — no picker at all; zero invocations, nothing thrown

selectCatalogItem([{ id: 1 }], () => '1')
// null — the comparison is strict identity, so a string never matches the number `1`
```

```ts
// UC-4 — the seam side: implement `PickerFn` and rely on the declared degradations.
import { buildMenuTemplate, selectCatalogItem } from '../shared/menu-template.js'
import type { CatalogEntry, PickerFn } from '../shared/menu-template.js'

const catalog = [
  { id: 'p1', kind: 'picker', enabled: true },
  { id: 'p2', kind: 'picker', enabled: true },
]

const myPicker: PickerFn = (candidates: readonly CatalogEntry[]) => {
  const first = candidates[0]
  return first === undefined ? null : first.id
}

selectCatalogItem(catalog, myPicker)
// 'p1' — one invocation, with the PRE-collapse carried candidates

buildMenuTemplate(catalog, { platform: 'darwin', picker: myPicker }).items
// [ { id: 'p1', kind: 'picker', enabled: true,
//     submenu: [ { id: 'p2', kind: 'picker', enabled: true } ] } ]
//   a callable seam leaves the source's own `enabled` verbatim

let attempts = 0
const throwingPicker: PickerFn = () => {
  attempts += 1
  throw new Error('my picker failed')
}

buildMenuTemplate(catalog, { platform: 'darwin', picker: throwingPicker }).items[0].enabled
// false  — the invocation was attempted exactly once and the throw was absorbed inside the module
// attempts: 1 — never retried

buildMenuTemplate(catalog, { platform: 'darwin' }).items[0].enabled
// false  — the seam is absent, and the item is still EMITTED (never dropped)
```

Every reading in the four blocks above was taken by running the landed module
(`src/shared/menu-template.ts`) directly; the facts they illustrate are fixed at
`docs/specs/menulib.md` §2.3 items 1/2/4/5/6/8, §2.4 item 1, and the dated `enabled` pin of §3.1.

## What it refuses / does not do

- **No menu composition and no OS integration.** It composes no `Menu`, calls no
  `setApplicationMenu`, registers no accelerator, renders no picker, opens no dialog, and asserts
  no equivalence between a native menu and any in-renderer picker. What it emits is a caller-shaped
  template value and nothing else, and every claim about it is data-in/data-out
  (`docs/specs/menulib.md` §2.4 item 5 with its six falsifiers, §2.2 `P-ML-8`).
- **No OS read and no platform detection.** `platform` arrives as an argument, is compared to
  exactly one literal (`'darwin'`), and is otherwise never interpreted; there is no
  `process.platform`, no `navigator`, no `os` import, no prefix or case-folding test
  (`docs/specs/menulib.md` §2.4 item 2, §2.2 `P-ML-7`).
- **No error channel.** Nothing throws for any argument and there is no refusal domain: an unusable
  catalog yields `[]`, an unusable picker yields `null`, and an absent or non-string `platform`
  yields `{ recognized: false, collapsing: false }` (`docs/specs/menulib.md` §2.1 item 2,
  §2.3 items 1/4).
- **No policy defaults.** No default accelerator, role, label, `kind`, `enabled` or platform —
  and no silent `'darwin'` default. The only degenerate values it owns are the declared *absences*
  `[]`, `null` and `{ recognized: false, collapsing: false }` (`docs/specs/menulib.md` §2.2
  `P-ML-3`, §2.4 item 2).
- **No `id` validation, minting or coercion.** No type test, uniqueness test, trimming, case
  folding or stringification; the only operation on an `id` is a strict-identity comparison inside
  `selectCatalogItem` (`docs/specs/menulib.md` §2.3 item 8, §2.2 `P-ML-10`).
- **No interpretation of `role` or `kind` as vocabulary.** They are carried verbatim; the only
  `kind` value the module compares is the literal `'picker'` (`docs/specs/menulib.md` §2.2
  `P-ML-9`, §2.3 item 5).
- **No recursive collapse.** The collapse replaces a parent's `submenu`; a run entry that owned a
  `submenu` of its own is carried as-is, and a run of exactly one `'picker'` entry is not collapsed
  (`docs/specs/menulib.md` §2.3 item 5 rules 2/4).
- **No import, no factory, no options object, no session, no store, no module-level state.** No
  `electron`, no `node:*`, no sibling module, not even type-only; nothing is cached between calls
  (`docs/specs/menulib.md` §2.1 item 3, §2.4, §2.2 `P-ML-4`).
- **No new surface and no in-app reach.** No MCP tool, resource, group, RPC method, IPC method,
  shim member, config or dependency — and no path from the application's entry point to this
  mechanism, because it has no importer at all
  (`docs/specs/menulib.md` §2.2 `P-ML-5`/`P-ML-6`, §2.5 item 5, §3.4 `R-2`/`R-3`).

## What a fork must supply

The own-seam set is a single OPTIONAL member. `platform` is REQUIRED input but it is a value, not a
seam: the fork passes it and the module compares it (`docs/specs/menulib.md` §2.4 items 2/3,
`TemplateOptions` in §2.1 item 2). The only contract edge is the injected picker, and each of its
degradations is separate observable behaviour rather than one shared fallback
(`docs/specs/menulib.md` §2.4 item 1; `docs/decisions.md`, ACTIVE row
`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`).

| Seam | Class | Supplier | Absent | Non-callable | Throwing |
| --- | --- | --- | --- | --- | --- |
| `picker` | OPTIONAL | the fork / the calling layer — the picker is injected, never owned, and its vocabulary lives here and only here | zero invocations; the `'picker'`-kind item is still emitted and, on the `'darwin'` path, reads `enabled: false`; `selectCatalogItem` returns `null`; nothing throws (`docs/specs/menulib.md` §2.4 item 1 class (1), §3.1's dated `enabled` pin) | the same declared behaviour as absent — no coercion into a call, no guessed callable (`docs/specs/menulib.md` §2.4 item 1 class (2)) | the invocation is attempted exactly once, the throw is absorbed inside the module's own wrapper, the item is emitted disabled, `selectCatalogItem` returns `null`, and the call is never retried or propagated (`docs/specs/menulib.md` §2.4 item 1 class (3)) |
| `picker`'s answer, in `selectCatalogItem` | OPTIONAL | the fork / the calling layer | — (the absent column is the seam row above) | — | a non-`null` answer that names no known `id` returns `null`: not a validation error, no coercion, no fallback (`docs/specs/menulib.md` §2.4 item 1 class (4), §2.3 item 8) |

The seam type is exported so you can import the shape you must implement:
`PickerFn = (candidates: readonly CatalogEntry[]) => unknown`, and the candidates it receives are
the pre-collapse carried entries, in catalog order, handed to it at most once per call
(`docs/specs/menulib.md` §2.1 item 2, §2.3 item 6 with its dated argument pin). The builder uses
only *whether* the invocation succeeded — its answer is never read, carried or returned
(`docs/specs/menulib.md` §2.4's `PIN 3`).

A fork also supplies everything else, because this repo supplies the module nothing: the catalog
and every member value, the `platform` value, and the picker with its answer
(`docs/specs/menulib.md` §2.2). And it supplies both halves of the integration the unit refuses to
own — the menu and the picker, plus the judgement that they are equivalent for your app
(`docs/FORKER.md`, its `U-MENULIB` row; `docs/specs/menulib.md` §2.4 item 5 half 6).

## Gotchas measured in this repo

- **Nothing in this repo consumes the module.** A search for its specifier under `src/**` and
  `scripts/**` returns no match, and its name appears in no file under `dist/`
  (`src/shared/menu-template.ts` is present and `330` lines; `docs/specs/menulib.md` §1 item 8,
  §2.5 item 5, §3.4 `R-13`'s no-importer probe).
- **`enabled: false` on a degraded `'picker'`-kind item is a `'darwin'`-path reading, and the
  identity path is different.** With no picker supplied, `buildMenuTemplate(catalog, { platform:
  'darwin' })` writes `false` onto the collapsed parent (and onto an uncollapsed singleton), while
  `buildMenuTemplate(catalog, { platform: 'win32' })` carries the source's own `enabled` verbatim —
  measured `true` for a source owning `enabled: true`. Read the dated `enabled` pin
  (`docs/specs/menulib.md` §3.1, cited in that file as `§2.4` item 6) before you write a row about
  it.
- **`Object.keys` insertion order is the write order, not the declared order, on a degraded
  collapse parent.** Measured on `{ id, label, kind }` sources with the seam absent:
  `['id', 'label', 'kind', 'enabled', 'submenu']` — `enabled` lands before `submenu`. The
  seven-name SET is as declared; whether the declared order
  (`id · label · accelerator · role · kind · submenu · enabled`, `docs/specs/menulib.md` §2.3
  item 2, §3.4 `R-12`(a)) is normative for `Object.keys` on that one path is **unverified** —
  it would be settled by reading the landed `M-7`/`M-4` drives in `tests/menu-template.test.ts`.
  Assert the set, not the insertion order, when you compare emitted keys yourself.
- **A function element is skipped, not carried keyless.** Measured: `normalizeCatalog([fn]).length`
  is `0` and `buildMenuTemplate([item, fn, item]).items.length` is `2`
  (`docs/specs/menulib.md` §2.3 item 1(c) with its dated `PIN 1`; `tests/menu-template.test.ts`
  §3d's six-shape regression rows).
- **An element with no intersection is still emitted, keyless.** Measured: `normalizeCatalog([{}])`
  is ONE entry whose own key set is empty — carried, never dropped — while a non-array catalog,
  including `undefined` and a primitive, is `[]` (`docs/specs/menulib.md` §3c `pin 2`, §2.3
  item 1(e)).
- **An array element is carried at its own present index keys.** Measured: `normalizeCatalog([[0, 1]])`
  yields one entry whose key set is `['0', '1']`; `length` is never carried, a sparse array is
  carried only at its present indices, and a digit-string own key such as `'01'` is DROPPED
  (`docs/specs/menulib.md` §3c `pin 1`; `tests/menu-template.test.ts` §3d's array-like-key row).
- **A cyclic element does not throw.** Measured: for `const cyc = { id: 'c' }; cyc.submenu = [cyc]`,
  `normalizeCatalog([cyc])` returns one entry whose keys are `['id', 'submenu']`, with no
  `RangeError` and no unbounded nesting (`src/shared/menu-template.ts`'s carry-path guard;
  `docs/specs/menulib.md` §3d's `A-1` regression rows).
- **A declared member owned NON-ENUMERABLY loses the whole element in the landed module.**
  Measured: `normalizeCatalog([{ id: 'n', role: <non-enumerable> }])` returns `[]` — the element is
  skipped — where the contract's pinned reading has the non-enumerable member omitted and the item
  keeping the other six names (`docs/specs/menulib.md` §2.3 item 2's `PIN 2`, and its §3b `A-2`
  row, whose own text records the row that drives it as `OWED — TEST-SIDE`). Which reading governs
  is **unverified** from this page; the divergence is recorded rather than adjudicated.
- **The builder never reads your picker's answer.** Measured: a picker returning a whole
  entry-shaped record produces the same template as one returning `undefined`, because the builder
  only registers whether the invocation succeeded; only `selectCatalogItem` reads an answer
  (`docs/specs/menulib.md` §2.4's `PIN 3`).
- **Import it with a `.js` specifier** — `'../shared/menu-template.js'` from another `src/shared/`
  file, or `'../src/shared/menu-template.js'` from a test, matching every landed import in this
  tree; the module carries no import to copy from (`src/shared/menu-template.ts`, an empty import
  census; `docs/specs/menulib.md` §2.1 item 3).
- **Two carried obligations belong to this unit rather than to this page.** The scenario artifact
  `docs/specs/menu-template-greens.md` was authored against an earlier revision of the module and
  its own `POST-GREEN` clause records a targeted re-drive as owed, so its readings must not be
  re-quoted as readings of the current tree; and `docs/FORKER.md`'s `U-MENULIB` row records the
  adopted-name glossary beside its seam block as still owed
  (`docs/specs/menu-template-greens.md`, its `POST-GREEN` clause; `docs/FORKER.md`, its
  `U-MENULIB` row; `docs/next-steps.md`, `## DONE — U-MENULIB` clause (12)).

## See also

- `docs/guide/TEMPLATE.md` — the binding page template and the three rules (the third: a module header is not a clause).
- `docs/guide/README.md` — the index, the readers and the reading order.
- `docs/guide/00-base-surface.md` — the base surface this mechanism is not part of.
- `docs/guide/container.md` — a sibling mechanism page, for the family's seam-table shape.
- `docs/specs/menulib.md` — the contract this page cites.
- `docs/specs/menu-template-greens.md` — the unit's scenario artifact.
- `docs/specs/menulib-review.md` — the closed review record the contract derives from.
- `docs/FORKER.md` — the fork-facing row and limits for this unit.
- `docs/next-steps.md` — the `## DONE — U-MENULIB` record.
