# `U-THEME` — the pure appearance resolver and the declaration-only applier

This page is for a developer using this repo as a prebuild baseline and for a fork
author who is replacing a reading or consuming the resolver's result. It documents
the unit **`U-THEME`** (wave `E`, ledger row `E8`), whose landed record is the
`## DONE — U-THEME` section of `docs/next-steps.md` and whose contract is
`docs/specs/theme.md`. One opaque caller token plus one injected environment reading
go in; one three-member resolution record comes out. A second function takes that
resolution and returns, as data, the attribute write a consumer would perform —
it writes nothing.

## What it is

A pure, total, stateless mechanism of two functions in `src/shared/theme.ts`:
`resolveTheme(setting, env)` resolves a caller-supplied appearance token against a
caller-supplied environment record, and `applyThemeDeclaration(attributeName, resolved)`
returns the attribute write it *would* perform, with the attribute name caller-supplied
and the removal case represented as a data member (`docs/specs/theme.md` §1 item 1,
§2.1 item 2, §2.4 items 2/3).

It **owns** exactly its two function names, three type names, the six member names of
its two returned records, and its five declared string-literal bodies — and nothing
else (`docs/specs/theme.md` §2.5 item 2). The token vocabulary stays in the consumer's
stylesheet, the attribute's name and meaning stay with the caller, the environment
claim stays with the caller, and every persisted preference is consumer-side
(`docs/specs/theme.md` §2.2 opening paragraph, §2.5 item 2).

**It decides nothing about appearance.** `setting` and `prefersDark` are two
independent members of one record; there is no precedence, no override, no third state
and no derived token (`docs/specs/theme.md` §2.3 item 3, §2.2 `P-TH-10`). An explicit
setting never "wins" over the environment reading, because the mechanism has no rule
that relates them.

**It never throws and has no refusal domain.** An unusable argument produces a declared
value — the declared `null`, the declared `false`, or the declared removal case — and
there is no `ok`, `code`, `reason` or `thrown` anywhere in the returned records
(`docs/specs/theme.md` §2.1 item 2, §3.2's note).

**It is not this repo's appearance authority, and deliberately so.** The authority that
already exists is `src/renderer/index.html`'s `<style>` block whose first rule is
`:root { color-scheme: light dark; }` (measured by reading the file: 43 lines, the rule
at line 8); no value this unit returns can reach or influence it, and the authored
appearance control is the separate unit `U-THEME-CONTROL` (`F1`)
(`docs/specs/theme.md` §1 item 3, §2.5 items 3/5, §5.1 items 1/2).

**What a green proves, and what it does not.** Every row of this unit is a node-suite
row over two pure functions: it proves returned values, a pass-through identity, a
strict environment reading, a name-echo rule and a removal-as-data case. It proves
nothing about an applied attribute, a stylesheet that reacted, a rendered control, an
operating-system preference, or the app — this unit reads no OS, no media query, no DOM
and no element, and nothing measures an applied declaration back
(`docs/specs/theme.md` §5.2, §7 item 2, layer anchors 1/2/5).

## Where it lives

| File | Exports / what it carries |
| --- | --- |
| `src/shared/theme.ts` | `resolveTheme`, `applyThemeDeclaration`; type declarations `ThemeResolution`, `ThemeAttributeWrite`, `ThemeEnv` (read from the file: five exported names, two value exports and three types; the module imports nothing) |
| `tests/theme.test.ts` | the unit's own rows (58 at the close-out), including the existence/scan rows over the module's bytes |
| `src/renderer/renderer.ts` | `themeWiringRole` — the neighbouring wiring role that holds the consumer's attribute name (`'theme'`); it does **not** import this module (read: `src/renderer/renderer.ts:421`; the role is `U-THEME-CONTROL`'s, `docs/specs/theme-control.md` §2.4) |
| `docs/specs/theme.md` | the contract |
| `docs/specs/theme-greens.md` | the green-scenario set (32 executed scenarios), authored from the documentation alone and run against the landed module; cited below where a reading is quoted |
| `docs/specs/theme-review.md` | the proposal-review record this contract derives from |

## The contract it obeys

| Contract | Section | What that section fixes |
| --- | --- | --- |
| `docs/specs/theme.md` | §1 | the scope, and what is explicitly not this unit |
| `docs/specs/theme.md` | §2.1 | the five-name export census, both signatures, both return shapes, the empty import census, the empty seam set, and the never-throws error pattern |
| `docs/specs/theme.md` | §2.2 (A)/(B) | the twelve prohibitions (`P-TH-1`…`P-TH-12`) with the test that pins each |
| `docs/specs/theme.md` | §2.2 (D) | the semantics table: each identifier's referent, domain and source |
| `docs/specs/theme.md` | §2.3 | the `setting` pass-through rule, the closed one-member environment reading with the strict `=== true` rule, and the no-precedence rule |
| `docs/specs/theme.md` | §2.4 | the name-echo rule, the removal case as data, and the no-write rule |
| `docs/specs/theme.md` | §2.5 | the composition boundary, and the entry-point-path answer |
| `docs/specs/theme.md` | §3.1, §3.2 | the happy states (`M-1`…`M-7`) and the documented non-happy states (`F-1`…`F-8`) |
| `docs/specs/theme.md` | §3.3 | the invariants that hold in every state (`I-1`…`I-11`) |
| `docs/specs/theme.md` | §3.4 | the static scan rows (`R-1`…`R-12`) and their declared exemptions |
| `docs/specs/theme.md` | §5.1 | the denied file set and the allow-list |
| `docs/specs/theme.md` | §5.2 | the five legs, the three-part `[U]` refusal and the non-claimed `[D]` row |
| `docs/specs/theme.md` | §7, §7a.1 | the honest limits, and the pass-through reading recorded as a working default |
| `docs/decisions.md` | the ACTIVE row `THEME-MECHANISM-AND-AUTHORED-CONTROL` | the charter (cited by row name; the ledger is appended-to) |
| `docs/specs/theme-greens.md` | §B, §C, §D | the measured readings quoted in **Gotchas** below (the artifact's own scenario ids) |

## Use cases

**UC-1 — carry the user's own token into one resolution record.** You hold a preference
string of your own and a claim about the environment, and you want a single record to
branch on without the mechanism learning your vocabulary. You pass both in and read
`setting`, `prefersDark` and `source`.

**UC-2 — turn a resolution into the attribute write your element needs.** You have
decided the attribute name (yours, not the mechanism's) and you need the value to set,
or the fact that the attribute should be removed. The mechanism hands you the write as
a record; your own code performs it — this is also the shape a fork author implements
when replacing the write path.

**UC-3 — survive an unknown or hostile environment reading.** The environment record may
come from a config file, a bridge payload or third-party code: a missing member, a
string `'true'`, a number `1`, an inherited member, or a `Proxy`. You want the call to
return a declared value and to tell you *that the reading was absorbed* rather than
throwing or silently pretending the reading succeeded.

**UC-4 — keep your token block authoritative.** A fork author's stylesheet owns the
token vocabulary. You need proof that a token the mechanism could plausibly "recognize"
— `system`, `DARK`, `' dark '`, a custom property name — comes back character for
character, that a non-string never becomes a token, and that no default token is
fabricated on your behalf.

## Code, runnable

```ts
// UC-1 — carry the caller's own token into one resolution record
import { resolveTheme } from '../src/shared/theme.js'

const setting = 'my-app-theme'      // your token, opaque to the mechanism
const env = { prefersDark: true }   // your claim about the environment

const resolution = resolveTheme(setting, env)
// resolution: { setting: 'my-app-theme', prefersDark: true, source: 'env' }
// Object.keys(resolution): ['setting', 'prefersDark', 'source']  (declared order)
// resolution.setting === setting — the same string, by identity: nothing parsed,
// enumerated, trimmed or folded
// source: 'env' — the environment reading resolved.
// resolveTheme(setting, { prefersDark: false }) is a NORMAL reading too:
//   { setting: 'my-app-theme', prefersDark: false, source: 'env' }
```

```ts
// UC-2 — return the attribute write as data, and let your own code perform it
import { resolveTheme, applyThemeDeclaration } from '../src/shared/theme.js'
import type { ThemeAttributeWrite } from '../src/shared/theme.js'

const attributeName = 'data-app-theme'   // YOUR name — the mechanism owns none

const write: ThemeAttributeWrite = applyThemeDeclaration(
  attributeName,
  resolveTheme('my-app-theme', { prefersDark: false }).setting,
)
// write: { name: 'data-app-theme', value: 'my-app-theme', removal: false }
// nothing was written: your code applies it —
//   if (write.removal) el.removeAttribute(write.name) else el.setAttribute(write.name, write.value)

const removal: ThemeAttributeWrite = applyThemeDeclaration(
  attributeName,
  resolveTheme('', {}).setting,   // '' resolves to the declared null, i.e. no token
)
// removal: { name: 'data-app-theme', value: '', removal: true }
// the removal is signalled by the removal member ONLY — no call, no sentinel name,
// and the name is still echoed: a removal WITH a name is a normal return
```

```ts
// UC-3 — a hostile or unknown environment reading never throws
import { resolveTheme } from '../src/shared/theme.js'

resolveTheme('my-app-theme', {})
// { setting: 'my-app-theme', prefersDark: false, source: 'degraded-env' }  (member missing)

resolveTheme('my-app-theme', { prefersDark: 1 })
// { setting: 'my-app-theme', prefersDark: false, source: 'degraded-env' }
// the number 1 is NOT read as true — the rule is strict === true

resolveTheme('my-app-theme', Object.create({ prefersDark: true }))
// { setting: 'my-app-theme', prefersDark: false, source: 'degraded-env' }
// an INHERITED true is not a reading: the member is read by OWN member

resolveTheme('my-app-theme', new Proxy({}, {
  get: () => true, has: () => true, getOwnPropertyDescriptor: () => undefined,
}))
// { setting: 'my-app-theme', prefersDark: false, source: 'degraded-env' }
// traps that expose NO own member are not a member, however they answer

resolveTheme('my-app-theme', undefined)
// { setting: 'my-app-theme', prefersDark: false, source: 'degraded-env' }  (env omitted)
```

```ts
// UC-4 — your token block keeps its authority: nothing is recognized, nothing defaulted
import { resolveTheme, applyThemeDeclaration } from '../src/shared/theme.js'

const tokens = ['dark', 'light', 'system', 'DARK', ' dark ', 'my-app-theme', 'false', '0', ' ']
for (const token of tokens) {
  const r = resolveTheme(token, { prefersDark: true })
  // r.setting is THE SAME STRING by identity in every iteration
  //   ('system' is not treated as a third state; ' dark ' is not trimmed; 'DARK' is not folded)
  // r.source is 'env' in every iteration
  void r
}

resolveTheme(42, { prefersDark: true }).setting           // null — a non-string never becomes a token
resolveTheme('', { prefersDark: true }).setting           // null — the empty string is an ABSENCE, never ''
applyThemeDeclaration('class', 'dark')                    // { name: 'class', value: 'dark', removal: false }
applyThemeDeclaration('class', 'false')                   // { name: 'class', value: 'false', removal: false }
// 'false' and '0' are LEGAL TOKENS, not booleans or numbers; a spelling is merely echoed
```

## What it refuses / does not do

- **No token names, no token values, no token namespace** — the token block stays the consumer's (`docs/specs/theme.md` §1 item 2, §2.2 `P-TH-1`, §3.4 `R-8`).
- **No attribute name, and no attribute documentation** — not `data-theme`, not `class`, not `color-scheme`; the name arrives as an argument (`docs/specs/theme.md` §2.2 `P-TH-7`, §2.4 item 1).
- **No write of any kind, no element parameter, no DOM read** (`docs/specs/theme.md` §2.4 item 3, §2.2 `P-TH-9`, §3.4 `R-2`).
- **No OS read, no media query, no ambient global** — the environment reading is injected (`docs/specs/theme.md` §2.2 `P-TH-8`, §3.4 `R-7`, §3.3 `I-7`).
- **No precedence rule and no tri-state semantics** between the setting and the environment reading (`docs/specs/theme.md` §2.3 item 3, §2.2 `P-TH-10`).
- **No store, no persistence, no cache, no module-level state** — persistence stays consumer-side, and adding a store to either unit of this adoption is a new gate (`docs/specs/theme.md` §1 item 6, §2.2 `P-TH-4`, §3.3 `I-4`).
- **No new MCP surface** — no tool, resource, group, RPC method or mutating-method entry (`docs/specs/theme.md` §2.2 `P-TH-5`, §5.1 item 6).
- **No UI element and no styling** — it authors no text, control, affordance, class taxonomy, slot content or stylesheet; the authored control is `U-THEME-CONTROL`'s (`docs/specs/theme.md` §1 items 3/4, §2.5 item 3).
- **No import edge in either direction**, including to that control unit — a fabricated edge is a stop condition (`docs/specs/theme.md` §2.1 item 3, §2.5 items 3/4, §4.4 `S-TH-9`).
- **No applied-appearance, rendered or OS claim** — the `ui` leg row is not offered (three-part refusal) and the divergence row is not claimed (`docs/specs/theme.md` §5.2, §3.3 `I-11`).
- **No coercion hooks** — a non-string setting or name never has `String()`, `toString` or `valueOf` consulted for it (`docs/specs/theme.md` §2.3 item 1(c), §2.4 item 1(c), §4.4 `S-TH-4`).

## What a fork must supply

**This unit has no seams.** It declares no caller-implemented closure to replace: the
two inputs are a value and an environment record, and the second is `{prefersDark}`
(`docs/specs/theme.md` §2.1 item 4). How that was established, in this tree: the
module's **import census is empty** (read from `src/shared/theme.ts` — it contains no
import statement, not even type-only), so there is no injected collaboration to
substitute, and `docs/specs/theme.md` §2.1 item 4 states the empty seam set as a
derivation rather than an oversight. There is therefore **no seam table** for this
page, and a pass asserting a seam for this unit would be asserting a clause the
contract does not carry.

What the caller (or fork) supplies instead is data and the applied write itself, all
fixed by `docs/specs/theme.md` §2.2's caller-supplied paragraph and §2.2 (D)'s
semantics table:

- the **`setting`** value and its entire token vocabulary (`docs/specs/theme.md` §2.2 (D), the `setting` rows);
- the **`env`** record's single `prefersDark` member, as a claim about the caller's own environment (`docs/specs/theme.md` §2.2 (D), the `env`/`prefersDark` rows; §7 item 7);
- the **`attributeName`** string, and the attribute's meaning (`docs/specs/theme.md` §2.2 (D), the `attributeName` row);
- the **token block, the stylesheet and every persisted preference**, consumer-side (`docs/specs/theme.md` §2.2 opening paragraph, §1 item 6);
- the **write itself**: the returned `ThemeAttributeWrite` is data your code applies (`docs/specs/theme.md` §2.4 item 3).

Note for a fork: at the close-out this module was imported by **no** `src/**` file, so
a fork is its first importer. That denial binds this unit's own change set and does not
forbid a later pass from importing it (`docs/specs/theme.md` §2.5 item 3, the closing
sentence of §5.1).

## Gotchas measured in this repo

- **The discriminator member is spelled `source`.** It was renamed from the as-filed `basis` at this unit's spec gate; the landed module declares and returns `source` (`src/shared/theme.ts:7`, `:64`; the rename is recorded at `docs/specs/theme.md` §0A note 6). Code written against the as-filed spelling reads `undefined`.
- **The module is imported by no `src/**` file** — a search of `src/**` for the module's specifier returns nothing, and even the neighbouring wiring role `themeWiringRole` (`src/renderer/renderer.ts:421`) does not import it; it holds the attribute name `'theme'` and returns it inertly (`src/renderer/renderer.ts:421-423`; the no-importer claim is `docs/specs/theme.md` §3.4 `R-6`, §3.5 `X-1`).
- **There is already an appearance authority in the repo, and it is not this unit's.** `src/renderer/index.html`'s first `<style>` rule is `:root { color-scheme: light dark; }` (measured: the rule is at line 8 of a 43-line file); no value this unit returns can influence it (`docs/specs/theme.md` `CURRENT STATE` item 10, §3.5 `X-5`). The contract's filing-time read of that file was 44 lines — the file has changed since.
- **An inherited `prefersDark: true` is NOT a reading.** `resolveTheme('my-app-theme', Object.create({ prefersDark: true }))` reads `prefersDark: false` with `source: 'degraded-env'`, because the member is read through its own-member form (the module uses `Object.getOwnPropertyDescriptor`; `src/shared/theme.ts:45-48`; `docs/specs/theme.md` §2.3 item 2 rows (12)/(13)). The same form means a `Proxy` whose traps answer `true` but expose no own member reads as degraded, while a container carrying a genuine own member reads that member (`docs/specs/theme.md` §2.3 item 2's pinning sentence; measured as `inherited-true->false/degraded-env own-true->true/env` in `docs/specs/theme-greens.md` §B `TG-07`).
- **A `false` member is a normal reading, not a degradation.** `{ prefersDark: false }` gives `prefersDark: false` with `source: 'env'`; only a missing/malformed reading gives `'degraded-env'` (`docs/specs/theme-greens.md` §B `TG-06`; `docs/specs/theme.md` §2.3 item 2 row (2)).
- **The two arguments of the applier are independent.** `applyThemeDeclaration('data-x', '')` returns `{ name: 'data-x', value: '', removal: true }` — a removal *with* an echoed name — while `applyThemeDeclaration('', 'dark')` returns `{ name: null, value: 'dark', removal: false }`, a null name with no removal (`docs/specs/theme-greens.md` §C `TG-19`; `docs/specs/theme.md` §2.4 items 1/2).
- **`'false'`, `'0'` and `' '` are legal resolved values, so they are not removals.** They come back as their own values with `removal: false` — only `''`, `null`, the omitted argument and other non-strings are removals (`docs/specs/theme-greens.md` §C `TG-18`; `docs/specs/theme.md` §2.4 item 2).
- **Each call returns a fresh, plain record while its member values are carried by identity.** `toEqual` across repeated calls holds, but a `toBe` between two calls' records fails by design; the records are neither frozen nor sealed (`docs/specs/theme-greens.md` §C `TG-30`; `docs/specs/theme.md` §2.4 item 4, §4.4 `S-TH-8`).
- **Coercion hooks are never consulted.** Passing an object that carries recording `toString`/`valueOf` as the setting (and as the attribute name) reads `null` on both with invocation counts of `0` (`docs/specs/theme-greens.md` §B `TG-05`).
- **Under the node suite the module is reached as `'../src/shared/theme.js'`** (the specifier `tests/theme.test.ts` uses and asserts); under a plain Node ESM run it was reached as a `file://` URL to `src/shared/theme.ts` with native type stripping (`docs/specs/theme-greens.md` §A).
- **Whether `prefersDark` matches a real operating-system setting — unverified, and structurally unobservable in this repo.** The module reads no OS and no media query, the injected record is the caller's own claim, and no instrument this repo owns reads an applied declaration back (`docs/specs/theme.md` §5.2, §7 items 2/7). It would be settled only by a unit that owns an OS or rendered surface — which for a themed appearance is the consumer's stylesheet plus the authored control.

## See also

- `docs/guide/README.md` — the index, the two readers, and the reading order.
- `docs/guide/00-base-surface.md` — the tool set, dispatch path, renderer wiring (including `themeWiringRole`) and the group model.
- `docs/guide/theme-control.md` — the authored appearance control page (planned; its contract is `docs/specs/theme-control.md`).
- `docs/specs/theme.md` — the contract; `docs/specs/theme-greens.md` — the green-scenario readings; `docs/specs/theme-review.md` — the review record this contract derives from.
- `docs/guide/seams.md` — every seam in the repo's closed wave in one table (planned; this unit contributes no row, per **What a fork must supply** above).
