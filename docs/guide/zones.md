# `U-ZONES` — the pure track-token mechanism (`isEmpty`, `trackFor`)

`U-ZONES` is wave E's first unit (ledger row `E1`; its landed record is
`docs/next-steps.md`'s `## DONE — U-ZONES`, and this page's slot is
`docs/guide/README.md`). Two readers: a developer who has a zone's size and needs the
exact CSS token their own stylesheet expects, and a fork author replacing the inputs —
the census, the zone keys, the unit token, the empty token — with their own. The
one-line answer: it is arithmetic over a size and a boolean, and both arrive as
arguments.

## What it is

A **pure, total two-function mechanism** with one type declaration beside it. It owns
two jobs: deciding whether one zone is empty **according to a census it was handed**,
and rendering the token text for one track from **a spec, a size and an emptiness flag
it was handed**. It owns no census, no zone set, no registry, no default and no count
(`docs/specs/zones.md` §1 item 2).

It is the **token-formatting authority** of the panes/zones family: the census unit
delegates its token bytes here rather than formatting a second time, and the two calls
it may make are the whole delegate surface (`docs/specs/zones.md` §2.1, the delegate
clause; §1 item 6). So a reader who wants a whole zone→token record composes this
module's two calls — it is the arithmetic half, not the map half.

It ships **no CSS**: no stylesheet, no rule, no declaration, no class name and no
styling literal, **not even the `'0px'` form**, which is the caller's `emptyToken`
(`docs/specs/zones.md` §1 item 3, §7 item 3). It reads no DOM, writes nothing anywhere,
holds no module-level state, and reads no environment — not `document`, not
`process.env`, not `Date` (`docs/specs/zones.md` §3.3 `I-1`/`I-2`/`I-3`/`I-8`).

It also carries **no zone/pane/tab vocabulary** — every string it emits is an argument
it was handed, which is why it can serve any consumer's naming without naming anything
itself (`docs/specs/zones.md` §2.2 P-1, §7 item 4). Nothing about it is a UI element,
so it is outside the render-with-provident constraint rather than an exception to it
(`docs/specs/zones.md` §7 item 5).

And it has **no refusal domain**: there is no error object, no code, no skip list. Every
outcome is a value — a token string, the degenerate `''`, or a boolean
(`docs/specs/zones.md` §2.3 item 4).

## Where it lives

| File | Exports |
| --- | --- |
| `src/shared/zones.ts` | `isEmpty`, `trackFor`, type `TrackSpec` — three names, and the file imports nothing |
| `tests/zones.test.ts` | the unit's own 58 rows (a fact measured by a row is cited where it is used) |
| `src/shared/census.ts` | the in-repo consumer: it publishes `computeTrackVars` and imports `isEmpty` and `trackFor` from `./zones.js` — those two names are this unit's, the rest are that unit's |

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/zones.md` | §2.1 | the surface, both signatures, the export census, and the delegate clause |
| `docs/specs/zones.md` | §2.2 | the caller-supplied list and the six prohibitions |
| `docs/specs/zones.md` | §2.3 | both decision tables, the collapsed `false`, and the geometry boundary (items 4–7) |
| `docs/specs/zones.md` | §2.4 | the emitted form — the raw `String(size) + unit` concatenation and the verbatim `emptyToken` |
| `docs/specs/zones.md` | §0A | the ruling notes on the clauses the charter left open (`-0`, the `Map` shape, the malformed class) |
| `docs/specs/zones.md` | §3.1 – §3.3 | the `M-*` / `F-*` / `I-*` rows: every valid state, every documented non-happy state, every invariant |
| `docs/specs/zones.md` | §5.2 | the legs, and why no rendered-geometry row is offered |
| `docs/specs/zones.md` | §7 | the honest statements (items 2, 3, 4, 6, 10 in particular) |
| `docs/next-steps.md` | `## DONE — U-ZONES` | the landed record: what was measured, on which layer |
| `docs/FORKER.md` | the `U-ZONES` row | the fork-facing summary and its layer caveat |

## Use cases

**UC-1 — turn a zone's size into the token your stylesheet already expects.** You hold a
size (a number your own code computed) and you want the custom-property text for it,
with your own property name, your own unit and your own empty spelling. This is the
call that gives you a string and nothing else — no write, no lookup, no registry
(`docs/specs/zones.md` §2.1, §2.4).

**UC-2 — ask whether a zone is empty, using a census you already hold.** Your counts
live in a `Map` or in a plain object and you want the boolean, with the read being a
read: nothing is created, defaulted, cached or written into your census
(`docs/specs/zones.md` §1 item 2, §3.3 `I-7`).

**UC-3 — build the whole zone→token record yourself, the delegate way.** You want one
record of tokens and you want to decide emptiness yourself. The emptiness flag reaches
the formatter only through its own third argument — the mechanism never calls the
emptiness reader for you (`docs/specs/zones.md` §2.3 item 6, §2.1's delegate clause) —
so you call both and own the loop. `src/shared/census.ts` is the in-repo consumer built
this way (its own unit, its own contract).

**UC-4 — hand it junk and keep running.** Sizes arrive from a layout store, and a census
may be missing or hostile. Both calls answer for every input, so the guard you write is
a policy guard, not a crash guard (`docs/specs/zones.md` §2.3 items 1/2, §3.3
`I-1`/`I-2`).

## Code, runnable

```ts
// UC-1 — the token for one zone, from your own spec
import { trackFor, type TrackSpec } from '../src/shared/zones.js'

const spec: TrackSpec = { trackProp: '--zone-main', unit: 'px', emptyToken: '0px' }

trackFor(spec, 120, false)   // '120px'
trackFor(spec, 1.5, false)   // '1.5px'   — String(size), never rounded (M-2/§2.4 item 3)
trackFor(spec, 0, false)     // '0px'     — a zero track is not an empty track (M-5)
trackFor(spec, 120, true)    // '0px'     — your emptyToken, verbatim (M-11)
trackFor(spec, -1, false)    // '0px'     — a non-representable size takes the same arm (F-2)
trackFor({ trackProp: '--zone-main', unit: '', emptyToken: 'none' }, 2, false)
                             // '2'       — the bare-number form (F-6)
// trackProp is required but is never read for a value: a spec missing it, or carrying a
// non-string field, is the malformed class and answers '' (F-1, §2.3 item 1 (d)).
```

```ts
// UC-2 — the emptiness decision, over your own census
import { isEmpty } from '../src/shared/zones.js'

const census = new Map<unknown, unknown>([['main', 0], ['side', 3]])
isEmpty(census, 'main')                      // true
isEmpty(census, 'side')                      // false

isEmpty({ main: 0, side: 3 }, 'main')        // true   — a plain record is read by OWN key
isEmpty({ main: 0 }, 'nowhere')              // false  — absent is not empty (F-3)
isEmpty({ main: 0 }, 0)                      // false  — a record needs a STRING key (F-4)
isEmpty({}, 'constructor')                   // false  — prototype members are never read (F-5)
isEmpty(null, 'main')                        // false  — not a census: still no throw (F-4)
```

```ts
// UC-3 — compose both calls into a zone→token record (the delegate shape)
import { isEmpty, trackFor, type TrackSpec } from '../src/shared/zones.js'

const zones = ['main', 'side', 'hidden'] as const
const census: Record<string, number> = { main: 120, side: 0 }   // your census, never mutated
const specOf: Record<string, TrackSpec> = {
  main: { trackProp: '--zone-main', unit: 'px', emptyToken: '0px' },
  side: { trackProp: '--zone-side', unit: 'px', emptyToken: '0px' },
  hidden: { trackProp: '--zone-hidden', unit: 'px', emptyToken: 'none' },
}

const vars: Record<string, string> = {}
for (const zone of zones) {
  const empty = isEmpty(census, zone)                        // your decision, your call
  vars[specOf[zone].trackProp] = trackFor(specOf[zone], census[zone], empty)
}
// vars: { '--zone-main': '120px', '--zone-side': '0px', '--zone-hidden': 'none' }
// 'side' is empty in the census, so it takes the empty token; 'hidden' is absent, so
// isEmpty answers false (F-3) and its size is undefined ⇒ the same empty-token arm (F-2).
// Nothing above wrote to `census` or to `specOf` (I-6), and this module never builds
// a record for you — that is the census unit's job (§2.1's delegate clause).
```

```ts
// UC-4 — no try/catch needed: the values you get back for junk
import { isEmpty, trackFor, type TrackSpec } from '../src/shared/zones.js'

const spec: TrackSpec = { trackProp: '--z', unit: 'px', emptyToken: 'NONE' }

trackFor(spec, '120', false)       // 'NONE' — a numeric string is NOT parsed (F-2, §2.4 item 4)
trackFor(spec, NaN, false)         // 'NONE'
trackFor(spec, undefined, false)   // 'NONE' — an absent size is the same class, not a throw
trackFor({ unit: 'px' }, 120, true)  // ''    — malformed spec: '' even though `empty` is true
trackFor(null, 120, true)          // ''    — and never the empty token, never a throw (F-1)
isEmpty(undefined, 'z')            // false
isEmpty([0], 0)                    // false — an array is not a supported census shape (§0A note 3)

// `''` is overloaded, deliberately: a malformed spec and a caller whose own emptyToken is
// '' produce the SAME string (F-8). Keep your emptyToken non-empty if you need to tell
// the two apart from this call alone.
```

## What it refuses / does not do

- **No census of its own** — it takes counts, it does not own, create, default or
  remember them (`docs/specs/zones.md` §1 item 2, §3.3 `I-7`).
- **No CSS, at any point** — the `:has()` rules and the collapse-override declaration
  stay consumer-side, and no styling literal is built in (`docs/specs/zones.md` §1 item
  3, §2.2 P-1/P-2).
- **No vocabulary** — no zone/pane/tab name, union member, documented default or
  documented constant (`docs/specs/zones.md` §2.2 P-1).
- **No store, no cache, no persistence, no writes** — identical arguments give identical
  answers, always (`docs/specs/zones.md` §2.2 P-4, §3.3 `I-3`/`I-6`).
- **No validation, trimming, normalizing or sanitizing** of a caller's property name,
  unit or empty token; no rounding, no `toFixed`, no parsing or coercion of a size
  (`docs/specs/zones.md` §2.4 items 1–4, §4.4 S-9).
- **No refusal domain** — no `code`, no `reason`, no `ok`, no `skipped`, no result
  record; every outcome is a value (`docs/specs/zones.md` §2.3 item 4).
- **No zone-map builder** — it does not produce a zone→token record, does not iterate a
  zone list, and has no key-set rule or reveal decision (`docs/specs/zones.md` §1 item
  6, §4.4 S-5).
- **No claim about rendering** — the emitted token is a string; whether a browser
  accepts, applies or paints it is not this unit's claim and no result from it may be
  reported as one (`docs/specs/zones.md` §2.3 item 7, §3.3 `I-10`, §7 item 6).
- **No new MCP surface** and no shim member (`docs/specs/zones.md` §2.2 P-5/P-6).

## What a fork must supply

**This unit has no seams.** Established by three readings, not by assumption: the module
**imports nothing at all** — not a sibling mechanism, not `node:*`, not the engine, not
even a type-only import (`docs/specs/zones.md` §3.4 `R-3`; verified by reading
`src/shared/zones.ts`, which carries no import statement and greps clean); every value it
works from arrives as an **argument** (`docs/specs/zones.md` §2.2's caller-supplied
list); and the unit declares no injected host, sink or resolver, with its two candidate
dependencies explicitly recorded as absent (`docs/specs/zones.md` §1 item 7, §7 item 8).
There is therefore no absent / non-callable / throwing degradation to declare — nothing
is looked for and nothing can be missing.

What a fork supplies is **data, per call**: the property name (`trackProp`), the unit
token (`unit`), the empty token (`emptyToken`), the size, the emptiness flag, the census
and the zone key (`docs/specs/zones.md` §2.2). Its own stylesheet, its own token values
and its own census shape remain the fork's, and the module will not substitute a default
for any of them.

## Gotchas measured in this repo

### Expectations — what a consumer most often gets wrong about this pair

- **A `0px` track is the whole TOKEN the family emits — never a box claim.** Nothing here reads a cell, a
  slot, a rect or an element: the module works from its **arguments** alone and the emitted string says
  nothing about a rendered extent (`docs/specs/zones.md` §2.3 item 7, §3.3 `I-10`, §3.4 `R-7`, §4.4 `S-6`;
  `docs/specs/census.md` §2.5, and the mandatory geometry clause `S-d11`). A question of the form *"what
  box does a collapsed member have?"* is not answerable from this module, by design.
- **The member's slot/location geometry is the CONSUMER's to measure** — and so is the size decision that
  sits beside it. The ruled shape: a zone's minimum is enforced (an attempt below it rounds to the
  minimum or to zero), **zero is the minimize verb and never a smaller width**, and a minimized zone
  **keeps its location** so proximity detection can expand it back to its configured size and host a pane
  (`docs/decisions.md`'s ACTIVE row `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`,
  cited by row name; the family-side half is a pure clamp over values you supply, and its own record lands
  separately).
- **An emptiness flag and a size of `0` are two different things, and the overloading is yours.** The
  module emits your `emptyToken` for a truthy flag **or** a non-finite/negative size, while a size of `0`
  is a legitimate SIZE — so *"zero means minimized"* belongs in **your** predicate/census, never in the
  mechanism (`docs/specs/zones.md` §2.3 items 1–2, §4.4 `S-9`; `docs/specs/census.md` §2.4 `C-C`).
- **No vocabulary, no default, no store.** Every name, unit and token is an argument; a constraint that
  also requires this pair to learn what a cell/slot *is* cannot be satisfied at all
  (`docs/specs/zones.md` §2.2 `P-1`/`P-3`/`P-4`).

- **A malformed spec beats the empty flag.** `trackFor({ unit: 'px' }, 120, true)` is
  `''`, not your `emptyToken` — the malformed limb is evaluated first and gates the other
  three (`src/shared/zones.ts`, read in order; `docs/specs/zones.md` §2.3 item 1's
  operative precedence clause, §3.2 `F-1`).
- **`trackProp` is required and never used.** Two specs differing only in `trackProp`
  emit the same string (M-3), yet a spec whose `trackProp` is missing or non-string is
  the malformed class and answers `''` (F-1). Carry it; nothing reads it.
- **`-0` is asymmetric.** As a size it is a legitimate zero: `trackFor(spec, -0, false)`
  is `'0px'` with no sign (M-6). As a census value it is EMPTY: `isEmpty({ a: -0 }, 'a')`
  is `true` (M-15) — the two halves use different comparisons.
- **A record census needs a string key.** `isEmpty({ main: 0 }, 0)` is `false` while
  `isEmpty(new Map([[0, 0]]), 0)` is `true` (`src/shared/zones.ts`'s record branch
  requires a string `zoneId`; `docs/specs/zones.md` §2.3 item 2, `F-4`). This bites
  consumers that pass numeric ids: the in-repo consumer's `ZoneId` is `string | number`
  (`src/shared/census.ts`) and it passes the id through verbatim, so numeric ids only
  resolve against a `Map`-shaped census.
- **The callable-`get` duck-type branch is checked before the array/`Set` exclusion.**
  `src/shared/zones.ts` treats any object or function carrying a callable `get` as a map
  read, and only afterwards excludes arrays and `Set`s. `docs/specs/zones.md` §2.3 item
  2 (a) supports the callable-`get` branch while its operative clause also says an array
  or a `Set` answers `false` "even when its `get` is callable"; **that one reconciliation
  is UNVERIFIED here** — no row of `tests/zones.test.ts` drives an array or `Set`
  carrying a callable `get`, and it would be settled by such a row (or by the unit's
  adversarial record, `docs/specs/zones.md` §3b).
- **The emitted number is `String(size)`, not a fixed-precision format.**
  `0.1 + 0.2` gives `'0.30000000000000004px'` (M-8) and `1e21` gives `'1e+21px'` (M-7).
  Pre-round the size yourself if your stylesheet needs a decimal count — rounding is a
  caller decision, and the module will not make it.
- **`''` means two different things.** A malformed spec and a caller whose own
  `emptyToken` is `''` produce the same string (F-8); one call cannot tell them apart
  (`docs/specs/zones.md` §2.3 item 4, §7 item 7 (iv)).
- **`isEmpty`'s `false` collapses two facts.** "This zone is not empty" and "this zone is
  not a key of this census" are the same `false`, deliberately — read your census's key
  set when existence matters (`docs/specs/zones.md` §2.3 item 5, §7 item 7 (iii)).
- **It is not in the running app.** Neither `trackFor` nor `computeTrackVars` occurs in
  any of the five built bundles (measured by searching `dist/**`); the module's only
  in-repo consumer is `src/shared/census.ts`, which is itself imported by no file under
  `src/**` (asserted non-vacuously by `tests/census.test.ts`'s no-consumer row). So a
  green here is evidence about two pure functions for a caller — never about the
  assembled application, applied lengths or rendered geometry (`docs/specs/zones.md`
  §7 item 2/10, §5.2).
- **How this page's facts were established.** Every behavioural sentence above is read
  from `src/shared/zones.ts`, cited to `docs/specs/zones.md` by section or row id, or
  measured by a row of `tests/zones.test.ts`; nothing here is remembered from another
  project.

## See also

- `docs/specs/zones.md` — the contract. Cite it; this page never governs.
- `docs/guide/00-base-surface.md` — the MCP surface, runtime and wiring this mechanism
  sits beside (it adds no tool, no resource and no group).
- `docs/guide/README.md` — the index, the two readers, and the reading order.
- `docs/guide/TEMPLATE.md` — the binding section order and the three rules (the third: a module header is not a clause).
- `docs/FORKER.md` — what a fork gets per unit, with the layer caveat.
- `docs/specs/census.md` — the unit that consumes this one and delegates its token
  bytes here.
