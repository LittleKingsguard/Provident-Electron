# Spec — A3: Permanent CI Divergence Leg + `code.load` Teardown Pin

Status: **SPEC** (delegation gate for the A3 reshape unit). Source:
`docs/specs/architecture-review.md` §4 A3. The R13 one-shot Electron divergence
check (`scripts/electron-divergence.mjs`) proved the DOM shim matches the real
DOM for the 12-element counter. A3 makes it a **repeatable, self-verifying CI
leg** (not a one-shot a developer runs manually) + pins `code.load`'s teardown
== `provident.teardown` so the authoring surface and the battery's C3/C4
invariants cannot drift.

## 1. Scope

Two parts:

1. **A3-a — a repeatable divergence harness** — promote
   `scripts/electron-divergence.mjs` into a `tests/`-resident script that:
   - is runnable via `npm run divergence` (a package.json script);
   - boots the real Electron app + the DOM-shim battery
     host, drives the SAME minimal scenario (bootstrap + a `dispatch` + a
     3–4-deep path-fork render), compares structural surfaces (census, SSR
     `data-node-id` set, nodeId vocabulary, dirtied ids, counter content,
     non-empty dispatch), and exits non-zero on any divergence;
   - asserts `hasPendingWork() === false` after teardown in BOTH runtimes;
   - is **HERMETIC IN THE ISOLATION SENSE (amended 2026-09-27, `H-r19`)**: a
     **temp `userData` profile** so gate groups and settings are deterministic, no
     network, and **no writes outside the temp dir**.
2. **A3-b — `code.load` teardown == `provident.teardown` pin** — the authoring
   surface's `code.load` re-derives the graph via `loadEnvelope` (which tears
   down first). The pin: `code.load` of a NEW envelope leaves the graph in the
   SAME root-only-then-loaded state as a `provident.teardown` followed by a
   `provident.load`; specifically, after a `code.load`, `hasPendingWork()` is
   false + the prior graph's userData is cleared (no leak into the new load).

> **AMENDED 2026-09-27 — THE HERMETICITY CLAIM, CORRECTED (`H-r19`).** This
> spec previously asserted the leg "boots the real Electron app **(headless,
> offscreen)**" and is "HERMETIC (**no network, no display**; uses Electron's
> offscreen/`show:false` mode + a temp userData dir)". **That claim was FALSE about
> the code, and it is replaced by the two-part truth:**
>
> 1. **ISOLATION — achievable, and now REQUIRED.** A temp `userData` profile, no
>    network, no writes outside the temp dir. This half the leg *can* and *must*
>    hold, and it is what makes the gate groups and the settings deterministic.
> 2. **HEADLESSNESS — NOT achievable in this environment, and now DECLARED as an
>    environment prerequisite.** The app's `BrowserWindow` is created with **no
>    `show:false`/offscreen option** and the leg spawns with `--ozone-platform=x11`
>    + `DISPLAY || ':0'` + `ELECTRON_DISABLE_SANDBOX=1` `(engine recon)`. The leg
>    therefore needs a **display server** (`DISPLAY`, or an xvfb wrapper the
>    operator supplies), and its failure mode must be an **ACTIONABLE
>    PREREQUISITE ERROR NAMING THE FIX — never a silent skip and never a false
>    green.**
>
> **A leg with an undeclared environment prerequisite is the flake class this
> correction closes.** **This repo has NO CI config** (`.github/**` → no files), so
> "CI leg" here means "a repeatable script a human/agent runs" — the correction
> therefore binds the **spec text and the failure message**, not a runner. **Do
> NOT add `show:false` and do NOT add a CI config**; a future pass that wants true
> headlessness must either accept a `show:false` claim it can measure or run under
> xvfb, and either is **outside this pass**.

## 0. Contract-prohibitions (`H-r8` — the six prohibitions as a per-unit assertion table)

**`H-r4` requires every adopted unit's spec to carry this block** (`H-r8`, six rows). **This
amendment's unit (`U-DIVERGENCE-EXT`) is a HARNESS unit, admitted by `A-d8`/`H-r10` directly** — so
the table states **why each prohibition holds**, not a claim that they were tested as mechanism rows.

| # | Prohibition (`S-d8` / `H-r8`) | Status for `U-DIVERGENCE-EXT` | The row that pins it |
| --- | --- | --- | --- |
| **1** | No consumer vocabulary as a symbol, closed-union member, default or documented constant | **HOLDS — vacuous.** The extension names **no** consumer id/zone/pane/tab/region/token. Its only new vocabulary is a scenario **kind** string (`'demo'`, `'props-falsy-toggle'`) — an **instrument** label, not a contract name, and it crosses to neither the app nor the engine. | `A-1`, `A-4` |
| **2** | No app UI content (literal text, controls, affordances, styling) | **HOLDS — vacuous.** The extension adds a scenario envelope (data) and comparisons; it authors **no** UI, no control and no styling. The demo envelope's existing node text is unchanged. | §1 (`A-4`), §6 item 5 |
| **3** | No policy defaults | **HOLDS — asserted.** The extension changes **no** default: no security default, no gate default, no engine default. | `A-6` |
| **4** | No UI-config store or persistence of its own | **HOLDS — asserted.** The extension persists nothing; the leg's only writes are its own scratch temp profiles, cleaned on exit (the inherited spawn fix). | `A-6` |
| **5** | No new MCP surface — no new tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry | **HOLDS — asserted, and it is the reason the scenario channel is shaped as it is.** The scenario envelope is delivered through the **EXISTING** `provident.load` (and, on the real leg, the existing `provident.load`/`code.load` path). **`ALL_TOOLS` stays 21; `RpcMethod` stays 21; no group is added.** | `A-1`, §6 item 4 |
| **6** | No criterion unverifiable on a layer this repo owns | **HOLDS — and this unit is the one that makes `M-46`'s criterion verifiable at last.** The new attribute comparison is taken on the leg's **`[A]`** layer, on both hosts, at run time. | `A-2`, `A-3`, §5 |

**Register consequence:** these prohibitions produce **no register row** — see §5.5's zero-row
exemption.

## AMENDMENT BLOCK (`U-DIVERGENCE-EXT`, 2026-09-27) — the `H-r10` scenario-envelope channel + the attribute-presence extractor

> **THIS IS AN AMENDMENT TO THIS FILE, AND IT IS WRITTEN IN THIS FILE'S OWN CONVENTION: the
> amendment is ADDED, every clause it changes is marked `SUPERSEDED … AMENDED 2026-09-27` in
> place (never rewritten, never deleted), and §8 is the supersession index. NO EXISTING
> NORMATIVE CLAUSE OF THIS CONTRACT IS REWRITTEN.** The amendment's unit is
> **`U-DIVERGENCE-EXT`** (wave `C`, `docs/next-steps.md` `## OPEN` row **C2**); its governing rows
> are `H-r10` (the channel + the extractor + the `props` falsy-toggle scenario + the landed-shim
> precondition), `H-r18` (the `N = 9` **hard constraint**, the ownership split, the leg's ordering)
> and `A-d8`/`S-d15` (the browser-integration flow adopted as two harness units).
> **The filing status this block replaces:** the handoff review's filings table recorded
> *"**The divergence-spec amendment** … **OWED — not filed** (`H-r10`)"* — **this block is that
> filing.**

**The unit's four deliverable clauses, in one paragraph each (§`A-1`…`A-6` below carry the exact
contract):** `A-1` the **scenario-envelope channel**; `A-2` the **attribute-presence extractor**
(**set-wise, never a substring diff**); `A-3` the **`props` falsy-toggle scenario** (the first real
attribute row); `A-4` the **`N = 9` decision** (the pinned count stays **EXACTLY intact**, by a
mechanical rule — see `A-4`, and the arithmetic is verified in this pass's own reading of the
harness); `A-5` **revertibility** (the extension is revertible without touching the new `ui` leg and
weakens none of the existing eight structural comparisons); `A-6` the **preconditions,
layer-honesty and fail states.**

### A-1. The scenario-envelope channel (`H-r10`(1))

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-1.1** | **The entry point** | A parameterized scenario envelope **`scenarioEnvelope(kind)`** — one function, called **identically on both legs**, returning the envelope object the leg will load. |
| **A-1.2** | **Supply to the REAL Electron leg** | The resolved envelope is delivered to the booted app over the **EXISTING** MCP tool surface: `provident.load {kind:'envelope', envelope}` (the harness already proves `provident.load` is reachable live — `scripts/electron-divergence.mjs:159`, read). **No new tool, no new group, no new RPC method** (§0 prohibition 5). |
| **A-1.3** | **Supply to the SHIM comparison leg** | The **same** resolved envelope, by the **same** shape, to the shim battery host: `provident.load {kind:'envelope', envelope}` (the existing call at `scripts/electron-divergence.mjs:159`, read, which is how the shim leg is made equal to the real leg today). |
| **A-1.4** | **ONE resolution per run** | `scenarioEnvelope(kind)` is resolved **once per run** and the **same object** is handed to both legs. **Resolving it twice (even from the same source) is a contract violation of this clause** — see `A-1.6`. |
| **A-1.5** | **The pinned kinds** | `kind` is a closed set of **two** members in this amendment: **`'demo'`** — the existing demo envelope, byte-for-byte the function at `scripts/electron-divergence.mjs:42-72` (read; **12 nodes**: root + h1 + counter-card + h2 + counter + 3 buttons + echo-card + h2 + input + echo-out — **⟶ CORRECTED 2026-09-27 (the `U-DIVERGENCE-EXT` (`C2`) documentation pass): the LIVE CENSUS IS `18` NODES, NOT `12`** — `U-GUTTER-UI` (`E10`) grew the demo envelope `12 → 18` with its authored gutter card, **and the leg's own green confirms it: `R13 RESULT: 9 checks, 0 failures` with census `electron=18 shim=18` on BOTH legs.** **The as-filed `12` is this clause's own reading against the pre-`E10` tree and is KEPT VISIBLE; a row quoting `12` as live is quoting a superseded figure.** **The clause's CONTRACT is unmoved: this is a census of the `'demo'` kind's authored shape, not a pin — the pinned count is `N = 9` (`A-4`), and the census is compared set-wise on both hosts, so an envelope that legitimately grows does not move the pin.**); and **`'props-falsy-toggle'`** — the scenario of `A-3`. **A third kind is a new contract row, not a free choice.** |
| **A-1.6** | **THE FAIL STATE: the two legs given DIFFERENT envelopes** | The leg records a **canonical digest** of the resolved envelope it handed each host (the pinned canonicalization: `JSON.stringify` of the resolved envelope object, taken **once** from the single resolution of `A-1.4`; recorded twice, once per host). **If the two recorded digests differ — or if either host's load does not report the envelope it was given — the leg reports `ENVELOPE-MISMATCH` for the run and exits `1`.**** **`ENVELOPE-MISMATCH` is NOT a divergence verdict.** It is an **instrument error**: the comparison of `A-2` never runs, no surface is compared, and **no divergence may be reported from that run** (a surface difference between two hosts that ran *different* scenarios is **meaningless**). **A run that reports a surface divergence while its envelope digests differ is a review finding.** |

### A-2. The attribute-presence extractor (`H-r10`(2)) — set-wise, NEVER a substring diff

**Why this exists (`M-46`, `M-42`, `RK-6`): the real DOM does not serialize a boolean attribute's
value the way the shim does. The real DOM emits `<div hidden>`; the shim emits `hidden="true"`. A
row written as `includes('hidden="true"')` is therefore a GUARANTEED FALSE RED against the real DOM
— it can never pass, and a "fix" for it would be to weaken the row.** The extractor exists so the
comparison is made on **attribute NAMES present**, never on serialized text.

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-2.1** | **The observable** | `renderedHtml` **as returned by `provident.get_rendered_html`** — the same surface the harness already reads (`scripts/electron-divergence.mjs:85`, `:87`, read). **No new surface, no private read.** |
| **A-2.2** | **The extractor's return shape** | A **set of attribute NAMES** (case-insensitive fold permitted and recommended, since HTML attribute names are case-insensitive; **the fold must be applied identically on both sides**, and the leg records which fold it used). **It is a SET, not a string, not a sorted string, not a count.** |
| **A-2.3** | **What counts as present** | An attribute **name** is present when it appears in an **attribute position** of a tag in the HTML: either in the **valued** form `name="…"` / `name='…'` (the shim's and the SSR adapter's form, `src/shared/dom-shim.ts:108-114`, read) **or in the BARE form** `name` with no `=` (the real DOM's form for a boolean attribute). **Both forms are ONE presence fact** — that is the whole point of the extractor. |
| **A-2.4** | **NORMALIZATION — pinned, and applied per host BEFORE any comparison** | **(i) `nodeId` normalization:** the token pattern `/node-\d+/g` is replaced by `node#` — **the harness's own `norm()` rule** (`scripts/electron-divergence.mjs:81-83`, read), which exists because the shim host boots root-only and then `provident.load`s the demo (so its minted ids are offset relative to the real app's; `:74-80`, read). **(ii) The `data-*` normalization:** the **same token rule** applies inside any attribute **value** that carries a minted id. **(iii) What normalization may NEVER do:** it may **not** be applied to the **attribute-NAME set itself** in a way that collapses two distinct names into one, and it may **not** be a blanket `String(s).replace(/node-\d+/g,'node#')` if that would also mutate the **values the assertion reads** (the same hazard `docs/specs/engine-drift-measurements.md` `M-21` names for `dirtied`: **a row that records only the normalized form is not evidence**). **The raw (pre-normalization) form must be recorded alongside the normalized one.** |
| **A-2.5** | **THE COMPARISON RULE (set equality)** | For each compared extraction point, the two legs' sets are compared by **set equality**: `|A| === |B|` **and** `A ⊇ B` **and** `B ⊇ A` — equivalently `A △ B = ∅`. **The comparison is NEVER a substring search, NEVER a count-only comparison, and NEVER over the serialized HTML text.** |
| **A-2.6** | **THE FAIL STATE: one leg emits an attribute the other does not** | The symmetric difference is reported **by attribute NAME** (both directions), as its own labelled output line, with the two **raw** extracted sets printed beside it. The run exits `1`. **The reverse case — a name present on the other leg only — is the same fail state, not a second one.** **The empty symmetric difference is the only pass.** |
| **A-2.7** | **What the extractor does NOT compare (stated so it is not over-read)** | It compares **names present**, not **values**; **it is not a geometry check, not a style check, not a layout check**; and **it does not make the leg a real-DOM *identity* leg** — the `divergence` leg remains an identity check on the `N = 9` pinned structural surfaces (§`A-4`), and this comparison is an **added, separately-tallied** attribute observation. **A single boolean-member row is NOT a claim that "the shim is faithful".** |
| **A-2.8** | **The extractor must be reachable from a test** | The extractor's pure half (HTML string → set) is exercised in the **node suite** against **fixed literal HTML**: a valued form, a **bare** form, a duplicate name, an empty tag, a self-closing tag, an attribute whose value contains a `node-N` token, and an attribute whose value contains the literal text `data-node-id`. **The real-DOM half is `[A]`-layer and only the leg can take it.** |

### A-3. The `props` falsy-toggle scenario (`H-r10`(3)) — the FIRST real attribute row

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-3.1** | **The scenario** | `scenarioEnvelope('props-falsy-toggle')` authors a target node carrying a **boolean-member** prop in its **ON** form (the pinned member is **`inert`** — the member the pin's closed set admits at `0.5.1`; a second named member, `readonly`, may be added **only** as its own row, never as this row's substitute). |
| **A-3.2** | **The two writes the scenario performs** | **(a) the boolean-member OFF write** — a `props.<member>` write carrying a **falsy** value (the engine's OFF form; the truthiness rule treats `false`/`0`/`'0'`/`'false'`/`''`/`null`/`undefined` as OFF), and **(b) the REMOVAL path** — a **nullish** write on the **`props.<member>`** spelling, which ruling 1 of the pin unit makes a **legitimate REMOVAL that is APPLIED** (a bare name and the `css:<key>` colon twin are **ALLOWED but INERT** and are **NEVER the row that proves a removal** — that validity rule is carried from `docs/specs/engine-pin.md` §§3.4 `PA-9`/`PA-10`). |
| **A-3.3** | **How the writes are driven** | Through an authored handler body on the scenario's own node, loaded via the `A-1` channel, so the write is engine-applied in **both** hosts' realms. **The scenario is a DATA change to the harness, not a new MCP surface.** |
| **A-3.4** | **The extraction points** | **Three points, recorded for BOTH legs, at the SAME points:** **(P1)** after the scenario load, before any write (the **ON** state); **(P2)** after the OFF write; **(P3)** after the removal write. **Each point is one set-wise comparison (`A-2.5`).** |
| **A-3.5** | **The expected presence facts, and which is the PIN** | **P2 and P3 are the row's PINNED half:** the member's **NAME must be absent** from the extracted set on **both** legs after the removal (P3), and — where the engine's OFF write removes the attribute — absent at P2 as well. **P1 is the ON half:** the name must be **present** on **both** legs. **The serialized FORM is explicitly NOT pinned** (that is `A-2.3`: real DOM bare, shim valued). **A row that asserts `hidden="true"` (or any `name="value"` string) is a guaranteed false red and is forbidden by this contract.** |
| **A-3.6** | **The fail state** | Any of the three points failing set equality (`A-2.6`), or the expected presence fact not holding on a leg, ⇒ the run exits `1`, with **both** raw sets recorded and the symmetric difference named by attribute. |

### A-4. The `N = 9` decision — **the pin stays EXACTLY INTACT** (and how that is mechanically enforced)

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-4.1** | **THE DECISION, and which of the two admissible shapes it is** | **The new checks land WITHOUT changing the pinned count.** `N = 9` is **NOT re-pinned** by this unit. **Why this shape and not a re-pin, stated:** (i) `H-r18` makes *"keeping `divergence`'s `N = 9` identity intact"* a **HARD constraint**; (ii) `docs/specs/ci-divergence-leg.md` §5 calls `N = 9` *"a PIN, not a count that may drift"*; (iii) the pin is the leg's **identity** — a re-pinned count would silently change what `R13 RESULT: 9 checks, 0 failures` means in every tracker that quotes it (`docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE`, `docs/specs/engine-pin-live-status.md` §7.2, the two DONE records in `docs/next-steps.md`), and would let the **extension's** failures hide inside a count the repo has already accepted as green. **The re-pin shape is therefore REJECTED, and this clause is the reason.** |
| **A-4.2** | **The mechanical rule that keeps `N` intact** | **The extension's checks MUST NOT pass through the harness's pinned `ok(...)` helper.** Verified by reading `scripts/electron-divergence.mjs` this pass: `function ok(label, cond, extra)` at **`:26`** increments `checks` at **`:27`** and `failures` at **`:30-31`**; the summary line is printed at **`:181`** as `` `R13 RESULT: ${checks} checks, ${failures} failures` ``. **Any new assertion routed through `ok(...)` would change `N` — so the extension reports through a SEPARATE tally** (see `A-4.3`). |
| **A-4.3** | **The extension's tally, pinned** | A **separate** extension tally prints, per check, a labelled line carrying the **`[EXT]`** prefix (so the two vocabularies are never confused), and a separate extension summary line. **`[EXT]` checks are NOT counted in `checks`.** Extension failures are accumulated in a **separate** extension-failure counter that is still OR-ed into the leg's exit condition (`exit 1` if the pinned failures **or** the extension failures are non-zero). **Net effect: `N = 9` on a green run, unchanged, while an `[EXT]` failure still turns the leg red — a red that can never be mistaken for a pinned-comparison regression.** |
| **A-4.4** | **THE ARITHMETIC, verified by reading the harness in THIS pass (not quoted)** | **`ok(...)` is CALLED at 10 sites:** `:146`, and `:165`, `:166`, `:167`, `:168`, `:169`, `:170`, `:171`, `:172`, `:174`. **Per run, `N = 9`:** the **eight** comparisons inside the `if (electronOut)` block (`:165`–`:172`) **plus** `:146` (`'electron: dispatch renderedNonEmpty'`) = **9**. **The remaining two sites are OFF-GREEN branches:** `:174` is the `else` branch of `if (electronOut)` — it runs **instead of** the eight comparisons — and the single bare `failures += 1` at `:148` (the `electron connect/drive failed` catch) is the only failure increment that does not call `ok`. **⇒ a bootstrap failure produces `checks = 1` and `failures = 2` — `1` from the single `ok(...)` that runs (`:174`) and `1` from the bare increment (`:148`) — i.e. `R13 RESULT: 1 checks, 2 failures`** — exactly the signature recorded live in `docs/specs/engine-pin-live-status.md` §1.1. **This amendment states the arithmetic from its own reading of the file and invents no check name.** |
| **A-4.5** | **A self-check the extension must keep** | The extension **must** assert the pinned count against a **literal `9`** (a `PINNED_CHECKS` constant compared to the run's `checks`), so a future pass that routes a new assertion through `ok(...)` **turns the leg red immediately** instead of silently moving `N`. **The comparison itself is an extension check** (`A-4.3`), never an `ok(...)` check. |
| **A-4.6** | **What the re-pin would have been, so a later pass need not re-derive it** | **If the architect later re-pins** (a decision this unit may not take), the arithmetic to state at that time is: `N = 9 + m`, where `m` is the number of `[EXT]` checks (this amendment declares **three extraction points × one set comparison per point = 3** for `A-3.4`, i.e. `N = 12` **if and only if** the `[EXT]` checks were folded into the pinned tally). **Recorded as the honest alternative, NOT adopted** (`A-4.1`). **⟶ CORRECTED 2026-09-27 (the `U-DIVERGENCE-EXT` (`C2`) documentation pass — the figure was re-MEASURED against the leg's own output rather than re-derived from this clause): `m = 4`, NOT `3`.** **The landed leg reports `EXT RESULT: 4 extension checks, 0 extension failures`** — the extension's own `[EXT]` tally carries a **fourth** check beside `A-3.4`'s three extraction-point comparisons (the digest / `ENVELOPE-MISMATCH` observation of `A-1.6` reports through the same tally), **so the hypothetical re-pin is `N = 9 + m` with `m = 4` ⇒ `N = 13` IF AND ONLY IF the `[EXT]` checks were folded into the pinned tally — and they are NOT** (`A-4.1`: **no re-pin is taken**; `A-4.5`'s literal-`9` self-check keeps the pin from moving silently, and a laundering mutation through `ok(...)` was MEASURED to trip it). **The as-filed `3` / `N = 12` is KEPT VISIBLE as this cell's own reading and is SUPERSEDED; a later pass that re-pins must state `m = 4`, re-counted from the leg's output rather than from this cell.** |

### A-5. Revertibility, and what must NOT weaken

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-5.1** | **Separate unit, separate revert boundary** | This extension lands as **`U-DIVERGENCE-EXT`**, **separately from** `U-REALDOM-BOOT` (amendment record §1.12), and **is not superseded by it**. |
| **A-5.2** | **The revert must not touch the `ui` leg** | The extension lives **inside `scripts/electron-divergence.mjs`** (plus, where the Implementer judges it necessary, a module it imports). **Reverting it must not require editing `scripts/electron-ui.mjs`, `package.json`'s `"ui"` script, the shared Electron-spawn helper's contract, or the one production seam** — i.e. **the revert is a diff confined to the divergence harness (and any module only that harness imports).** **A revert that breaks the `ui` leg is a review finding.** |
| **A-5.3** | **What must NOT weaken** | **The existing eight structural comparisons stay EXACTLY as they are** — census `inTree`, census `registered`, normalized `dirtied` ids, normalized SSR fragment, `data-node-id` set, nodeId vocabulary, the counter's presence in the rendered HTML (the `counterPresent` substring check — a known caveat, see `docs/specs/engine-drift.md` §2.3), and non-empty dispatch results (`:165`–`:172`, read) — **each keeps its own `ok(...)` call, its own label and its own conditional.** **No comparison may be removed, merged, re-ordered into another, or made conditional on an `[EXT]` check.** The `:146` dispatch check and the `:148` bootstrap failure path are likewise untouched. |
| **A-5.4** | **The demo leg's continuity** | With `scenarioEnvelope('demo')` selected, the leg's pinned output must be **the same nine comparisons on the same surfaces**, and the leg must still be able to produce **`R13 RESULT: 9 checks, 0 failures`** on the tree where that is recorded. *(**Quoted baseline, not re-measured:** the landed spawn fix + post-change tree gave `R13 RESULT: 9 checks, 0 failures`, Electron 44.4.5 / node 24.21.0 — `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE`, `docs/specs/engine-pin-live-status.md` §7.2. **A difference is a FINDING, never a rebaseline.**)* |
| **A-5.5** | **The inherited spawn fix stays** | The two flagged spawn flags (`--disable-dev-shm-usage` + a fresh scratch `--user-data-dir` per spawn, `:111`–`:113`, `:126`, `:137`, cleaned at `:114-123`) are a **supervisor-landed** fix this unit **INHERITS** and must **not** remove, relax or re-scope (`docs/decisions.md` `DIVERGENCE-SPAWN-FIX`; `docs/specs/engine-pin-live-status.md` §7.1: *"this is a HARNESS change … `U-DIVERGENCE-EXT` INHERITS the fix"*). **Removing either flag re-introduces the measured `SIGTRAP` and the non-hermetic GPU-cache write.** |
| **A-5.6** | **The pin-unit guard must not be edited** | The extension may **not** edit `src/shared/dom-shim.ts`, `src/renderer/runtime.ts`'s predicates, `src/renderer/secure-panels.ts`, `package.json`'s dependency rows, or any existing test file. **A real-DOM divergence this extension measures is a FINDING to route, not a licence to relax a guard.** **⟶ SUPERSEDED IN PART, RECORDED AT ITS OWN SITE 2026-09-27 (the `U-DIVERGENCE-EXT` (`C2`) DONE pass) — THE CLAUSE'S *"may not edit `src/shared/dom-shim.ts`"* HALF IS SPENT FOR THIS ONE FILE, AND THE REST OF THE CLAUSE STANDS EXACTLY AS FILED.** **WHAT HAPPENED, measured:** the extractor's first real use **found a real divergence on this file's surface** — **the real DOM carries `data-wire` while the shim emitted nothing for `el.dataset.wire = wire`** — and the fix is the **attribute-backed `dataset` proxy** recorded at `A-6.5` as the regression row **`EXT-F6-HOST-1`** (falsifiable: it FAILS on the pre-fix bytes, PASSES on the fixed ones). **THE CLAUSE'S INTENT IS HONOURED, NOT BENT:** *"a finding to route, not a licence to relax a guard"* — **no guard was relaxed, weakened or removed**; the divergence was **FIXED**, with its regression row, and **a HOST-side cause is fixed HERE** by `AGENTS.md` item 7 (a package cause still goes to `docs/defects.md` + `docs/HANDOFF.md`, and **no package defect is owed**). **THE LICENCE FOR THE EDIT:** the architect's ruling that the divergence harness and its update scope cover a legitimate unit's forced change (`docs/decisions.md` `THE DIVERGENCE HARNESS IS A TESTING TOOL AND IS IN THE UPDATE SCOPE`) **plus** the finding's host attribution. **THE REST OF THE CLAUSE IS UNCHANGED AND STILL BINDS:** the extension may **not** edit `src/renderer/runtime.ts`'s predicates, `src/renderer/secure-panels.ts`, `package.json`'s dependency rows, or any existing test file — **and no such edit happened** (the `engine-pin` re-grain of SIX literal-pinning rows, `1dc6315`, was forced by the shim fix and is recorded at `A-6.5`/the DONE record's clause 9, not smuggled here). |

### A-6. Preconditions, layer honesty, and the extension's fail states

| # | Clause | Exact statement |
| --- | --- | --- |
| **A-6.1** | **The measurement precondition (`M-46`)** | `docs/specs/engine-drift-measurements.md`'s **`M-46`** records real-DOM attribute presence/absence as **`UNMEASURABLE`** — *"**No extractor exists on the harness (`H-r10` is owed to `U-DIVERGENCE-EXT`) and the leg is silent on attributes by design (`M-42`).** … this row may never be reported as `CONSISTENT`"* (`docs/specs/engine-drift.md` §6 stop condition 8) — **and this unit is its named revisit condition.** **This contract discharges that revisit condition by landing the extractor; the RECORD is not edited from here** (the record's own diff scope excludes it). **No `ui`-leg measurement closes `M-46`** (the `ui` leg takes ONE number, not an attribute row). |
| **A-6.2** | **The shim precondition (`H-r10`(4))** | The pin unit's `removeAttribute` completion **must have landed** — otherwise the **shim leg throws during `provident.load`** and the failure would be **misattributed to the real DOM**. **State: LANDED** (`src/shared/dom-shim.ts`'s `removeAttribute` incl. the `id` and `value` slot clears; `docs/decisions.md` `SHIM-COMPLETION-CARVE-OUT`, `U-ENGINE-PIN` `DONE`). **The clause stays in force**: a red `provident.load` on the **shim** side must be attributed to the shim, never reported as a real-DOM divergence. |
| **A-6.3** | **The display prerequisite is inherited, undeclared-nowhere-new** | This leg **needs a `DISPLAY`** (no `show:false`/offscreen option exists in the app). **This amendment adds no new environment prerequisite and repeats none of `H-r19`'s false headlessness claim** — see `A-6.6`. |
| **A-6.4** | **A green divergence leg is STRUCTURAL-SURFACES-ONLY evidence — NEVER IPC-layer (the `LIVE-OP-REJECT` lesson), and this amendment does not change that** | The leg's green buys the harness's structural comparisons; it is **silent** on the app's `provident.op` hop. **The proof is the repo's own history:** the pin unit's envelope-layer `PA-*`/`P*`/`E-11` rows were **green** while the **assembled app refused every `provident.op` command shape** — a HOST-owned, pre-existing defect (**since FIXED + LIVE-VERIFIED, 2026-09-27**, `docs/defects.md` `## FIXED (in this repo)`, `docs/decisions.md` `LIVE-OP-REJECT-CLOSED`). **The harness never calls `provident.op`** (it uses `get_rendered_html` / `dispatch` / `list_targets`, `:85`–`:97`, read), **so no `9/0` may be read as an IPC pass — and the attribute comparison added by this amendment is an `[A]`-layer observation, not an IPC one.** |
| **A-6.5** | **The extension's fail states, enumerated (this is the complete list for this amendment)** | **`EXT-F1`** — **`ENVELOPE-MISMATCH`** (`A-1.6`): the two legs did not run the same scenario; **no comparison runs**; exit 1. **`EXT-F2`** — **symmetric difference non-empty** at any extraction point (`A-2.6`): exit 1, both raw sets printed, names listed. **`EXT-F3`** — **an extraction on one leg only** (a host failed to load, or its render did not return): **the missing leg is reported as MISSING, never as an empty set** — an empty set would silently *pass* an absence comparison and is a **fabricated pass**; exit 1. **`EXT-F4`** — **the pinned-count self-check fails** (`A-4.5`): `checks !== 9` ⇒ exit 1, reported as a **pin drift**, never absorbed into an `[EXT]` failure. **`EXT-F5`** — **the extractor absent/mis-wired** (the raw form not recorded, or a substring search in place of set equality): a **review finding**; the row is not evidence. **`EXT-F6`** — **a real-DOM vs shim divergence**: a **finding to route** — a HOST-side cause is fixed here with a regression row; a **package** cause goes to `docs/defects.md` + `docs/HANDOFF.md` and **the package is NEVER patched** (`AGENTS.md` item 7). **⟶ LANDED 2026-09-27 (the `U-DIVERGENCE-EXT` (`C2`) DONE pass) — `EXT-F6` IS NOW A FILED REGRESSION ROW AND NOT ONLY A CONTRACT CLAUSE: `EXT-F6-HOST-1`.** **THE FINDING IT PINS: the real DOM carries `data-wire` while the shim emitted NOTHING for `el.dataset.wire = wire`** — a real divergence on the attribute surface this extractor exists to read. **THE FIX, host-side and bounded: `src/shared/dom-shim.ts` now carries an ATTRIBUTE-BACKED `dataset` PROXY — camelCase↔kebab mirrored in both directions, with ONE unmappable form's bound STATED IN THE CODE.** **THE MUTATION EVIDENCE: `EXT-F6-HOST-1` FAILS on the pre-fix shim bytes and PASSES on the fixed ones**, so the row is falsifiable against the defect it pins rather than a restatement of the fix. **NO PACKAGE DEFECT AND NO `docs/HANDOFF.md` ROUND IS OWED** — the cause is HOST-side (this repo's own shim; `AGENTS.md` item 7). **`A-5.6`'s filed prohibition is therefore SUPERSEDED FOR THIS ONE FILE, and the supersession is recorded at its own site and marked in this clause rather than left silent** (see `A-5.6`'s dated note): the clause forbade the extension editing `src/shared/dom-shim.ts`, **its INTENT is honoured** (no guard was relaxed, weakened or removed — the divergence was FIXED rather than absorbed), and the edit is licensed by the architect's ruling that the divergence harness is a testing tool inside the update scope (`docs/decisions.md` `THE DIVERGENCE HARNESS IS A TESTING TOOL AND IS IN THE UPDATE SCOPE`) plus the finding's host attribution. |
| **A-6.6** | **What this amendment must NOT do** | **Do not add `show:false`; do not add a CI config; do not claim headlessness.** This repo has **no CI config** (verified this pass: glob `.github/**` → no files), so "CI leg" means *"a repeatable script a human/agent runs"* and the ruling binds **the spec text and the failure message**, not a runner. |
| **A-6.7** | **What this amendment must NOT be read as proving** | It does **not** prove the shim faithful; it does **not** make the leg a real-DOM **identity** leg; it does **not** convert any envelope-layer green into an assembled-app or IPC claim; it does **not** retire `H-r10` for any *other* unit; and **it does not close `M-46` in the record** — it makes the measurement **possible**, which is what `M-46`'s revisit condition asks for. |

## 8. Supersession index (the amendment's own — what each clause above supersedes, discharges or must not touch)

**Reading the index:** **SUPERSEDED-IN-PLACE** = the clause below was marked at its own site and is
retained; **DISCHARGED** = the amendment meets the obligation; **INHERITED-ONLY** = landed state the
extension consumes but does not own; **NOT THIS UNIT** = belongs elsewhere, listed so a later pass
does not route it here.

| Row / clause | Where it lives | Status for `U-DIVERGENCE-EXT` | Lands at |
| --- | --- | --- | --- |
| `H-r10` (the channel + extractor + falsy-toggle scenario + the shim precondition) | handoff review's blocking-reshapes table | **DISCHARGED** (this amendment is the filing `H-r10`'s filings row marked `OWED`) | `A-1`…`A-3`, `A-6.2` |
| `H-r18` (the `N = 9` HARD constraint; ownership split; the leg's ordering) | same | **DISCHARGED** — the pin stays intact **mechanically** | `A-4` |
| `A-d8` / `S-d15` (browser integration as two harness units) | amendment record §1 / `S-d15` | **INHERITED-ONLY** (the charter) | this block |
| `docs/next-steps.md` `## OPEN` row **C2** | the `## OPEN` table | **DISCHARGED as the spec's filing obligation** (the amendment now exists); the row itself stays `BLOCKED` until its legs run | this block |
| handoff review's **`The divergence-spec amendment`** filings row (`OWED — not filed`) | §Filings | **DISCHARGED** | this block |
| `docs/specs/engine-drift-measurements.md` **`M-46`** | the record | **DISCHARGED as its named revisit condition** — the extractor lands; **the record is not edited from here** | `A-6.1` |
| `docs/specs/engine-drift-measurements.md` **`M-42`** | the record | **INHERITED-ONLY** — the negative evidence this amendment's first row replaces | `A-2`, `A-3` |
| `docs/specs/engine-drift.md` §2.2 **`F5`** / §3.7 **`F-8`** (adding assertions to a pinned harness) | that spec | **DISCHARGED — and ONLY BY THIS UNIT** (`F5`: *"the harness change belongs to `U-DIVERGENCE-EXT`"*) — **every other unit's `F5`/`F-8` stays live** | `A-4`, `A-5.3` |
| `docs/specs/engine-drift.md` §6 stop condition **8** (`M-46` may never be reported `CONSISTENT`) | that spec | **INHERITED-ONLY** — this unit does not report `M-46`; it makes the measurement possible | `A-6.1` |
| `docs/specs/engine-drift.md` §5.4a / §2.2 `F6` (harness-owned routing) | that spec | **DISCHARGED as the routing** | this block |
| `docs/specs/engine-pin.md` §3a **`A-7`** / §3b **`AF-4`**-family (`null` member / attr serialization) | that spec | **INHERITED-ONLY** — the `null`-member measurement is the record's, not this amendment's | `A-3` |
| `docs/specs/engine-pin.md` **§4.4 "does NOT buy"** clause + §6 stop condition 8 | that spec | **SUPERSEDED-IN-PLACE for THIS leg's attribute half** — the clause's *"no attribute-presence extractor"* is what this amendment lands; **its other halves (geometry, IPC, packaging) stand unchanged** | `A-2` |
| `docs/specs/ci-divergence-leg.md` §5 (the `N=9` pin, and its existing `H-r10` extension note) | **this file**, unchanged | **AMENDED 2026-09-27** — the pin's **value** is unchanged; the clause now points at this amendment's `A-4` | §5 |
| `docs/decisions.md` `DIVERGENCE-SPAWN-FIX` | decisions | **INHERITED-ONLY** — the two flags stay | `A-5.5` |
| `docs/decisions.md` `DIVERGENCE-LEG-GREEN-POST-CHANGE` | decisions | **INHERITED-ONLY** (the quoted baseline) | `A-5.4` |
| `docs/decisions.md` `SHIM-COMPLETION-CARVE-OUT` | decisions | **INHERITED-ONLY** — the precondition is landed | `A-6.2` |
| `LIVE-OP-REJECT` / `LIVE-OP-REJECT-CLOSED` | defects / decisions | **NOT THIS UNIT** — **but its layer lesson binds** | `A-6.4` |
| `RK-6` (the guaranteed false red from real-DOM boolean serialization) | handoff review's risk register | **DISCHARGED** — the extractor is its mitigation | `A-2` |
| `RK-7` / `RK-14` (undeclared-prerequisite flake class) | same | **INHERITED-ONLY** — this leg's prerequisite is already declared; this amendment adds none | `A-6.3`, `A-6.6` |
| `scripts/electron-divergence.mjs`'s `counterPresent` substring caveat | `docs/specs/engine-drift.md` §2.3 | **NOT THIS UNIT** — recorded there as a source-reading caveat; **this amendment may not "fix" it** (it is one of the eight pinned comparisons, `A-5.3`) | `A-5.3` |
| `docs/specs/ci-ui-leg.md` (`U-REALDOM-BOOT`) | that file | **NOT THIS UNIT** — the ordering sibling; this extension must remain revertible without touching it | `A-5.1`, `A-5.2` |

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (justified), not a register**

**`H-r4` obliges an explicit zero-row/typed PBT decision per unit: THIS REPO HAS NO PBT HARNESS.**
The `devDependencies` key set is `@types/node`, `electron`, `esbuild`, `typescript`, `vitest`
(`package.json:25-31`, **read this pass** — five keys; **no `fast-check`, no `hypothesis`, no
property runner**). **Every row this amendment declares is a fixed, deterministic comparison on a
bounded extraction set — so this contract records a ZERO-ROW register, and here is why that is the
honest answer rather than a dodge.**

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **One candidate, and it is not quantified as claimed.** *"For every attribute name the engine's closed boolean set can emit, presence survives a toggle"* **looks** like a property — but the **closed set's membership is a `(engine recon)` claim this repo does not verify** (`docs/specs/engine-drift-measurements.md` `M-38`, recorded `UNMEASURABLE`; the `27`-member count is attributed, not measured here). **A property over a population whose membership is unverified would report an evidence class this repo cannot carry** — the exact overclaim `M-38` exists to prevent. **So: table-of-fixed-members, not a property.** |
| Could this unit execute a table-driven property **as a property**? | **No — and not because of effort.** The three extraction points × two legs is a **fixed 6-cell table** (`A-3.4`); there is no generated input space, no shrinking to do, and no failure mode a generator would find that the pinned ON/OFF/removal triple does not. **A generator would also need a `devDependencies` change — outside this amendment's diff scope and needing its own gate.** |
| Do the layers permit a property run here? | **Partly, and the part that matters is not a property.** The extractor's **pure half** (HTML string → set) is node-testable against **fixed literal HTML** (`A-2.8`); the **real-DOM half** is `[A]`-layer and executable **only** by a live boot. **A property over the real-DOM half would require N boots** — a runtime budget this repo has not declared for this leg (the same condition that keeps the battery's migration out of scope). |
| How are the fixed comparisons executed? | **Deterministic, fixed order, no randomness, no shrinking, no generated inputs** — the pin spec's §5.5 strategy discipline. **A strategy-id here is a repeat-drive label (`S-TAB-DIVEXT-ATTR-1`), not a property id.** |

**Register count: 0 rows. Not "0 executed" — 0 rows, declared.**

1. **No row of this unit may be reported as "executed" if it was sampled** — the pin spec's honesty
   anchor, carried.
2. **`M-38`'s unverified closed-set membership is the reason the "every boolean member" shape is
   refused**, and it stays `UNMEASURABLE` in the record — this amendment does **not** convert it.
3. **No `fast-check` and no generator is added by this unit.**

**Register change summary: none** — no register row is introduced, so nothing needs reconciling with
`docs/specs/engine-pin.md` §5.5's register or `docs/specs/engine-drift.md` §5.5's zero-row exemption.

> **⟶ SUPERSEDED 2026-09-27 (the `U-DIVERGENCE-EXT` (`C2`) documentation pass) — THIS ZERO-ROW EXEMPTION
> IS NO LONGER THE UNIT'S GATE-11 DISPOSITION, AND IT IS KEPT VISIBLE HERE RATHER THAN DELETED.**
> **WHY:** the block above was authored under `H-r4` and **before the gate-11 ruling**; per **`AGENTS.md`
> item 11** (mirroring `docs/decisions.md`'s ACTIVE row `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`) a
> code-bearing unit's spec **must carry a typed `§5.x` register**, and item **11(g)** confines the
> zero-row exemption to **genuinely invariant-free / doc-only / config-only / non-JS units** — **this unit
> is code-bearing** (`scripts/**` + one test file + one `src/shared/dom-shim.ts` fix), **so the exemption
> is UNAVAILABLE and the register is `OWED`.** **The block's reasoning still stands AS FAR AS IT GOES and
> is not refuted by this banner:** its `M-38` argument is a sound reason to **decline ONE candidate
> property** (a quantified universal over the engine's boolean-member set, whose membership this repo does
> not verify) — **it is NOT a reason to declare the unit invariant-free**, because the unit has discernible,
> driveable invariants a typed register expresses. **THE CURRENT DISPOSITION IS `§5.5.1` BELOW** (appended
> at the file's end as this file's own dated exception, so **no section number moves and no existing row is
> renumbered**).

## 3a. Adversarial findings for the amendment — **OWED** (no pass has run) + the seed set

**Status as filed: `OWED`. THIS PASS TOOK NO MEASUREMENT AND RAN NO ADVERSARIAL REVIEW for
`U-DIVERGENCE-EXT`.** Per `AGENTS.md` item 6 / RCA-3 the adversarial pass is **MANDATORY per
completed unit**: when it runs, its findings land **here** (host findings fixed here +
regression-tested; package findings → `docs/defects.md` + `docs/HANDOFF.md`).

| Seed | What to probe (edge cases / unauthorized access / malformed inputs, in this unit's terms) | Why it is a seed |
| --- | --- | --- |
| **DE-1** | **The false red itself**: write the naive `includes('hidden="true"')` row and confirm it fails against the real DOM while the set-wise row passes — i.e. prove the extractor exists to prevent a real failure, not a stylistic preference. | `A-2`, `RK-6` |
| **DE-2** | **Set-equality laundering**: replace set equality with a count or a sorted-string comparison and find an input pair that passes while differing (duplicate names, case variants, an attribute present only in the bare form). | `A-2.5`, `A-2.6` |
| **DE-3** | **Normalization over-reach**: an attribute **value** containing `node-7`, and a value containing the literal text `data-node-id` — does the extractor's normalization corrupt the name set or the value the assertion reads? | `A-2.4` |
| **DE-4** | **Envelope laundering**: give the two legs *different* envelopes (or resolve `scenarioEnvelope(kind)` twice with a side effect) and confirm `ENVELOPE-MISMATCH` fires **and no surface comparison runs**. | `A-1.4`, `A-1.6` |
| **DE-5** | **Pin drift smuggling**: route one new assertion through `ok(...)` and confirm the `A-4.5` self-check turns the leg red (i.e. `N` cannot move silently). | `A-4.2`, `A-4.5` |
| **DE-6** | **Fabricated pass by emptiness**: make one leg's extraction fail (host not loaded) and confirm the missing leg is reported **MISSING**, not as an empty set that would trivially satisfy an absence comparison. | `A-6.5` `EXT-F3` |
| **DE-7** | **Inert-spelling trap**: write the removal via a **bare** name or the `css:<key>` colon twin (both ALLOWED but INERT) and confirm the row does **not** claim a removal. | `A-3.2`; the carried validity rule |
| **DE-8** | **Serialized-form over-read**: assert a **value** where only a **name** is contracted (e.g. `inert="true"` vs bare `inert`) and confirm the row is rejected as a false red rather than "adjusted". | `A-3.5` |
| **DE-9** | **Layer smuggling**: read the new attribute green as an IPC or real-DOM-**identity** claim, or as evidence the shim is faithful. | `A-2.7`, `A-6.4`, `A-6.7` |
| **DE-10** | **Revert breakage**: revert the extension and confirm `scripts/electron-ui.mjs`, the `"ui"` script and the production seam are untouched, and that `npm run divergence` still prints its nine comparisons. | `A-5.2`, `A-5.3` |
| **DE-11** | **Spawn-fix removal**: drop either spawn flag and confirm the leg dies `SIGTRAP` / writes the GPU cache — i.e. the inherited fix is load-bearing, not decorative. | `A-5.5` |
| **DE-12** | **`M-46` over-close**: report `M-46` as `CONSISTENT` because the extractor "exists" — the record's own stop condition 8 forbids the conversion, and this unit cannot edit the record. | `A-6.1` |
| **DE-13** | **`counterPresent`-class copying**: add a new substring assertion on rendered HTML anywhere in the extension. | `A-5.3`'s caveat row; `docs/specs/engine-drift.md` §2.3 |

## 3b. The adversarial pass's findings (amendment) — disposition as THIS contract will reflect them

**Status: `OWED` (the same pass as §3a).** The table below is the **owed disposition table — the
shape the findings must land in**.

| # | Finding (this unit's — to be filled) | Class | Disposition in this contract |
| --- | --- | --- | --- |
| **G-1..G-n** | *(to be filled by the adversarial pass; each entry states what was probed, the observation, and the classification)* | host / package / contract / instrument / environment | *(per finding: fixed here + regression row, or routed — `docs/defects.md` + `docs/HANDOFF.md` only for a **package** finding)* |

**Rows this amendment inherits that are NOT live findings (listed so no later pass reads them as
open):** `M-42` (`CONSISTENT`, negative evidence) · `RK-6` (mitigated by `A-2`) · the pin unit's
`counterPresent` caveat (recorded in `docs/specs/engine-drift.md` §2.3, **not this unit's to
change**) · `DIVERGENCE-SPAWN-FIX` (**inherited**, not owed).

> **`ui`-LEG BOUNDARY NOTE — `OWED` until `U-REALDOM-BOOT` lands (A-d8).** **⟶ AMENDED 2026-09-27
> (parenthetical ONLY — the boundary itself is unchanged): the `ui` leg's spec
> `docs/specs/ci-ui-leg.md` is now FILED by the wave-C SpecWriter pass, so the words
> *"(**OWED — not filed**)"* below are SPENT. Every other clause of this note stands: the two legs
> remain separate, `divergence` remains an identity check, `ui` remains a measurement leg, and
> **`divergence`'s pinned `N = 9` stays exactly intact** (see the AMENDMENT BLOCK above, clause
> `A-4`; and §4's `N = 9`, which the amendment does not move).** The
> browser-integration ruling **A-d8** adds a **THIRD, observational** gate leg
> (`npm run ui`) as its own unit **`U-REALDOM-BOOT`**, with its own spec
> `docs/specs/ci-ui-leg.md` (**⟶ that parenthetical is SPENT TWICE: the spec is FILED (2026-09-27) and the LEG IS LANDED-GREEN (2026-09-27); see the `AMENDED` note at the head of this boundary note and `docs/next-steps.md`'s `WAVE-C CHECKPOINT — U-REALDOM-BOOT`**), and the `H-r10` extension to
> **this** leg as **`U-DIVERGENCE-EXT`** (the scenario-envelope channel + the
> attribute-presence extractor). **The boundary, stated so the two legs never
> merge:** `divergence` is an **identity check** (shim ≡ real on the pinned
> structural properties); `ui` is a **measurement** leg for properties no other leg
> can see. **`divergence`'s pinned N=9 identity stays EXACTLY intact** and must not
> absorb `ui`'s rows (§4 below). A `ui` green is **NOT** stronger than a
> `divergence` red: the `ui` leg's own precondition row is "`npm run divergence` is
> green for the same built tree", and where it is not, that leg reports
> **PRECONDITION-FAILED**, not a measurement. **Both are OUTSIDE the trio**
> (`npm test` / `npm run typecheck` / `npm run build`), exactly as `battery` is.

## 2. The surface

- `scripts/electron-divergence.mjs` (rewritten/extended) — driven by
  `npm run divergence`; the existing 9-check comparison + the new
  `hasPendingWork()`-after-teardown assertion for both runtimes.
  **AMENDED 2026-09-27 (`U-DIVERGENCE-EXT`) — this bullet's diff scope gains the `H-r10`
  extension, and its comparison-set wording is CLARIFIED, not weakened: the script's pinned
  comparison set is the `N = 9` of §4 (the `ok(...)`-tallied checks), and the extension's
  **new** scenario channel + attribute-presence extractor report through a **separate `[EXT]`
  tally that is NOT counted in `N`** — the AMENDMENT BLOCK's `A-4`, with the arithmetic (`10`
  `ok(...)` call sites, `9` per green run) verified by reading the script in the 2026-09-27
  SpecWriter pass. The `hasPendingWork()`-after-teardown assertion named here was NOT added to
  this harness (§4: *"NOT in the divergence harness (there is no MCP tool for it)"*) — the
  bullet's wording predates that correction and is retained as history.**
- `package.json` — a `"divergence"` script.
- `tests/code-load-teardown-pin.test.ts` — a vitest unit pinning A3-b against
  the Runtime (no Electron): `codeLoad` after a `codeSet` → `hasPendingWork()
  === false`; `codeLoad` of a fresh envelope after a userData-bearing load →
  no stale userData.

## 3. Behavior (every state / fail-state)

- `npm run divergence` exits 0 only if EVERY structural check matches AND both
  runtimes report `hasPendingWork() === false` after teardown; any mismatch →
  exit 1 with a per-check report.
- The divergence harness does **NOT** depend on `show: false` or offscreen
  rendering — **it requires a DISPLAY** (the app's `BrowserWindow` has no
  offscreen option and the leg spawns with `--ozone-platform=x11` +
  `DISPLAY || ':0'` `(engine recon)`). The missing-display failure must name the
  fix. **AMENDED 2026-09-27 (`H-r19`) — see the two-part truth above.**
- The harness IS hermetic in the **isolation** sense: a temp `userData` dir, no
  network, no writes outside it. `webPreferences` matches the app.
- A3-b: after `codeLoad()` (no explicit teardown), the Runtime's
  `hasPendingWork()` → false (the `loadEnvelope` path's settle-gate drains).
- A3-b: a `loadEnvelope(env, {userData:{u}})` then a `codeLoad(otherEnv)` (no
  userData) → the new graph's dispatch sees NO `u` (the prior userData does not
  leak into the `code.load` re-derive; the fresh-supervisor rebuild clears it).

## 4. Verify (states)

- `npm run divergence` → exit 0, report `N/N checks green` (N = 9 — the
  structural comparison checks). The R6 settle-gate (`hasPendingWork() ===
  false`) is asserted at the Runtime unit level (`tests/runtime-battery.test.ts`
  A3-b), NOT in the divergence harness (there is no MCP tool for it).
  **AMENDED 2026-09-27 (`U-DIVERGENCE-EXT`): the extension's `[EXT]` checks are reported
  SEPARATELY and are NOT part of `N` — so this row's `N = 9` is unchanged by the amendment
  (`A-4`). The harness's real summary line is `R13 RESULT: <N> checks, <M> failures`
  (`scripts/electron-divergence.mjs:181`, read), which is what a DONE row quotes; `N/N checks
  green` is this row's own prose and is retained.**
- `tests/code-load-teardown-pin.test.ts`:
  - `runtime.codeLoad()` after a `codeSet` → `hasPendingWork() === false` +
    `census.inTree > 1`.
  - `loadEnvelope(env, {userData:{username:'alice'}})` dispatch (sees alice) →
    `codeLoad(otherEnv)` (no userData) → a dispatch on the same handler shape
    sees `ANON`, NOT `alice`.

## 5. Notes

- A3-a is a harness/test-script change, NOT application code. It MUST remain
  hermetic **in the isolation sense** (no network, temp userData, no writes
  outside the temp dir) so a runner can execute it — **and it must DECLARE its
  display prerequisite rather than claim headlessness** (`H-r19`, the two-part
  truth above). **AMENDED 2026-09-27: the earlier "no display" wording was false
  about the code.**
- **N=9 is a PIN, not a count that may drift.** The `H-r10` extension
  (`U-DIVERGENCE-EXT`) adds a **scenario-envelope channel** and an
  **attribute-presence extractor** to this leg **without changing N=9** — the
  extractor compares the **set** of attribute names present (a substring row is a
  **guaranteed false red**, because the real DOM serializes a boolean attribute
  without its value while the shim emits `hidden="true"`). **`U-DIVERGENCE-EXT`
  lands as its own unit** (it modifies a pinned, passing leg and must be
  revertible without touching the new `ui` leg), **blocked on `U-ENGINE-PIN`'s
  shim completion** — until that lands, the shim leg **throws during
  `provident.load`** and the failure would be misattributed to the real DOM.
  **AMENDED 2026-09-27 (the `U-DIVERGENCE-EXT` SpecWriter pass) — each clause of this
  bullet, restated with its current state, NOT overwritten: (i) the `N=9` clause is now
  MECHANICAL — the AMENDMENT BLOCK's `A-4` (the `[EXT]` tally + the literal-`9`
  self-check); (ii) the extractor clause is now contract — `A-2` (the pinned return shape,
  the normalization, the set-equality rule and the symmetric-difference fail state); (iii)
  the scenario channel is now contract — `A-1` (plus `A-1.6`'s `ENVELOPE-MISMATCH` fail
  state, which `H-r10` did not name); (iv) the `props` falsy-toggle scenario is now
  contract — `A-3` (three extraction points, the ON/OFF/removal triple); (v) **the
  `blocked on U-ENGINE-PIN`'s shim completion` clause is SPENT** — the shim completion
  LANDED and `U-ENGINE-PIN` is `DONE` (2026-09-27), so `A-6.2` states the precondition as
  landed **with the attribution rule still in force** (a red `provident.load` on the SHIM
  side is attributed to the shim, never reported as a real-DOM divergence).**
- A3-b is a host-side pin (the `code.load`/`loadEnvelope` path already clears
  userData via the fresh-supervisor rebuild; the pin makes that a regression
  net, not an assumption).

## 9. Filing notes — sources read, what they leave open, and the unverified marks

**Written by the wave-C SpecWriter pass (2026-09-27) so a later pass knows exactly what this
amendment was derived from and what it deliberately did NOT pin.** Every `file:line` below was
**read this pass**; anything attributed rather than read is marked `(attributed)`.

| # | Source (read this pass unless marked) | What it gives the amendment | What it leaves open / contradicts |
| --- | --- | --- | --- |
| **M-1** | `docs/specs/provident-electron-shell-chrome-handoff-review.md` — the appended **`Amendment record (A-d4…A-d8)`**: `A-d8`, `S-d15`, `H-r10`, `H-r18`, `H-r19`, `H-r20`, §1.11, §1.12, §1.13, `RK-6`, `RK-14`, the filings table (**"The divergence-spec amendment … OWED — not filed (`H-r10`)"**) and §8's owed-spec list | the governing contract: the channel, the set-wise extractor, the `props` falsy-toggle scenario, the **`N = 9` HARD constraint**, the ownership split, the unit ordering | **`H-r18` is explicit that `N = 9` must stay EXACTLY intact; `docs/specs/engine-drift-measurements.md` `M-46`'s revisit clause says the extractor lands and *"`N = 9` is re-pinned by that unit"*** — **the two sources contradict each other and this amendment does NOT silently reconcile them: it takes `H-r18` as governing (`A-4.1`) and records the record-side wording for the supervisor (reported, not edited).** |
| **M-2** | `docs/next-steps.md` `## OPEN` row **C2** (+ the wave-C inheritance block) | the unit, its spec obligation, its three deliverables, the "`BLOCKED` → then `U-REALDOM-BOOT`" ordering, and the inheriting rows (`M-46` as revisit condition, `M-48`, the landed spawn fix, `N = 9`) | the row's `Blocked on` cell names `U-REALDOM-BOOT`, **which does not exist yet** — consistent, no contradiction; **the row is not edited by this pass.** **⟶ SUPERSEDED 2026-09-27 (the wave-C checkpoint — a status note only, no clause of this filing-note table is rewritten): `U-REALDOM-BOOT` HAS LANDED** (`scripts/electron-ui.mjs` + the shared helper `scripts/electron-spawn.mjs` + the one additive `src/main/main.ts` seam + the `"ui"` key; live `npm run ui` → exit 0, `UI RESULT: 0 failures (5/5 rows green)`, the ONE measurement `427x22` at `fontSize="16px"`), so the ordering clause above is **SPENT** and this extension's own precondition is now **MET** — while **`N = 9` stays EXACTLY intact** (`R13 RESULT: 9 checks, 0 failures`, unchanged; the extension's `[EXT]` tally rule `A-4` still binds). `U-DIVERGENCE-EXT` itself remains `BLOCKED` on its own deliverables, and `docs/next-steps.md`'s row `C2` carries the same correction. See `docs/next-steps.md`'s `WAVE-C CHECKPOINT — U-REALDOM-BOOT` block |
| **M-3** | `scripts/electron-divergence.mjs` (**read whole, 187 lines**) | the arithmetic (`ok(...)` at `:26-33`, `10` call sites at `:146`, `:165`–`:172`, `:174`; the bare `failures += 1` at `:148`; the summary at `:181`), the eight pinned comparisons, `norm()` at `:81-83`, `drive()` at `:84-99`, the demo envelope at `:42-72`, the landed spawn vector at `:111-113`/`:126`/`:137`, the profile cleanup at `:114-123` | **`counterPresent` (`:96`, `:171`) is a substring test** on a demo whose envelope also authors `counter-card`/`counter-value` — **recorded as a caveat in `docs/specs/engine-drift.md` §2.3 and NOT changed by this amendment** (it is one of the eight pinned comparisons, `A-5.3`) |
| **M-4** | `docs/specs/engine-drift-measurements.md` — `M-42`, `M-46`, the tally block | the preconditions and the negative evidence; `M-46`'s verbatim revisit condition | see `M-1`'s contradiction note |
| **M-5** | `docs/specs/engine-drift.md` §2.2 `F5`, §2.3, §3.7 `F-8`, §5.4a, §6 stop condition 8, §5.5 | the harness-owned routing, the pinned-harness prohibition, the `M-46`/`M-31` layer rules | `F5` says *"the harness change belongs to `U-DIVERGENCE-EXT`"* — **this amendment is that change, so `F5`/`F-8` are discharged FOR THIS FILE ONLY for this unit** (§8's index) |
| **M-6** | `docs/decisions.md` (read; rows cited by id) | `DIVERGENCE-SPAWN-FIX`, `DIVERGENCE-LEG-GREEN-POST-CHANGE`, `SHIM-COMPLETION-CARVE-OUT`, `ENGINE-PIN-DIVERGENCE-LEG-IN`, `LIVE-OP-REJECT-CLOSED`, `REAL-DOM-UI-GATE-LEG` | the quoted baselines are **quoted, not re-measured** (`A-5.4`) |
| **M-7** | `docs/specs/engine-pin-live-status.md` §1.1/§1.3/§3/§7 (read) | the `R13 RESULT: 1 checks, 2 failures` off-green signature (which `A-4.4` reproduces arithmetically), the two-flag necessity, the post-change green | **`LIVE-OP-REJECT` is CLOSED and independent of this leg** — `A-6.4` keeps the layer lesson |
| **M-8** | `package.json:8-20`, `:25-31` (read) | the five `devDependencies` keys (§5.5's no-PBT statement), the script block | — |
| **M-9** | `.github/**` (glob this pass → **no files**) | this repo has **no CI config**, so "CI leg" means a repeatable script (`A-6.6`) | — |
| **M-10** | `docs/skills/` (glob this pass → **`process-guardrails.md` only**) | **`docs/skills/designing-pages.md` does NOT exist in this tree** | the page-design layer (and its test-use-case coverage matrix + demo-page index) **has nothing to update for this unit**; recorded so no later pass hunts for an owed edit |

**Unverified marks, stated so no reader mistakes an inference for a read:** the extension's
`[EXT]` output format and the `PINNED_CHECKS` constant are **contract, not code** (nothing in the
harness implements them yet); the `'props-falsy-toggle'` kind's node shapes are **this amendment's
contract**, and the exact authored prop names beyond `inert` are left to the Implementer **subject
to `A-3.1`**; **no new Electron API semantics are pinned anywhere in this amendment** (see
`docs/specs/ci-ui-leg.md` §4.2 `ADD-2`/`ADD-3` for the one place this pass explicitly refuses to
pin an API it could not verify by reading).

## 5.5.1 The gate-11 disposition — the typed register is **`OWED`**, and the zero-row exemption is RULED UNAVAILABLE (recorded 2026-09-27, the `U-DIVERGENCE-EXT` (`C2`) documentation pass)

**NOT a new contract section and NOT a new number: this is a STATUS/GATE disposition appended at the file's
end, after `§9`, as this file's own dated exception (the placement `§3a`/`§3b` also use) — so NO section
number moves, NO row id is renamed or renumbered, no clause is rewritten, and `§5.5`'s exemption block stays
VISIBLE above under a dated SUPERSEDED banner (which is what `AGENTS.md` item 11(g) requires of an exemption
block in a spec that has moved past it).**

**THE DISPOSITION, ONE SENTENCE:** **the register is `OWED` — and it is `OWED` because the exemption is
UNAVAILABLE to this unit, not because a register was judged unnecessary.** **THE REASONING, stated so a
later pass does not have to re-derive it:** **(a) the unit is CODE-BEARING** — its landed change set is
**`scripts/electron-divergence.mjs` + `scripts/electron-spawn.mjs` + `tests/divergence-attribute-extractor.test.ts`
+ one `src/shared/dom-shim.ts` fidelity fix** — and item 11(g) makes the zero-row exemption **"not available
to a code-bearing unit"**, keeping it only for **genuinely invariant-free / doc-only / config-only / non-JS**
units; **(b) the exemption cannot be rescued by this amendment's own argument**, because `§5.5`'s honest
`M-38` reasoning declines **one** candidate property (a universal over an unverified member set) while the
unit carries **several discernible, falsifiable invariants a typed row expresses**; **(c) recording the
exemption as taken when it is not available is exactly the silent-default failure item 11(g) exists to
forbid**, so the honest state is an **owed register with its candidate rows NAMED below** — a later pass then
DERIVES its typed register rather than searching for subject matter.

**THE CANDIDATE ROWS, NAMED BY THE CLAUSES THAT MAKE THEM FALSIFIABLE — the unit's next SPEC pass authors
the typed `§5.x` register from these (their row ids are that pass's to choose; NOTHING here renumbers or
pre-allocates one):**

| # | Candidate property (this amendment's terms) | Type | Making clauses |
| --- | --- | --- | --- |
| **C-1** | **THE SET-EQUALITY INVARIANT OF THE EXTRACTOR** — *for every fixed literal HTML input in the declared corpus, the extracted attribute-NAME set is a set (not a string, not a sort, not a count), the VALUED and BARE forms of one name yield ONE membership fact, and two extractions of the same input are equal as sets* — driveable **deterministically and exhaustively** over the pure half (HTML string → set), **which is node-testable today** | `P-IM` | `A-2.2`, `A-2.3`, `A-2.5`, `A-2.8` |
| **C-2** | **THE SET-INEQUALITY / SYMMETRIC-DIFFERENCE INVARIANT** — *for every deliberately-differing pair in the corpus (a bare vs valued mismatch that is NOT a presence mismatch, a case variant, a duplicate name, a self-closing tag, an empty tag, an attribute whose value contains a `node-N` token, an attribute whose value contains the literal text `data-node-id`), the comparison reports the symmetric difference BY NAME in both directions and NEVER passes on a substring or a count* | `P-IM` | `A-2.4`, `A-2.5`, `A-2.6`, `A-2.8` |
| **C-3** | **THE ONE-RESOLUTION / DIGEST-IDENTITY INVARIANT** — *for every run, `scenarioEnvelope(kind)` is resolved ONCE and the digest handed to each host is the SAME value for the same kind, and a difference (or a host not reporting the envelope it was given) yields `ENVELOPE-MISMATCH` with NO surface comparison* | `P-SM` | `A-1.4`, `A-1.6` |
| **C-4** | **THE PIN-DRIFT SELF-CHECK** — *for every run, the harness's pinned tally equals the literal `9`; a new assertion routed through the pinned helper turns the leg red as a PIN DRIFT and is never absorbed into an `[EXT]` failure* | `P-SM` | `A-4.2`, `A-4.3`, `A-4.5`, `A-6.5` `EXT-F4` |
| **C-5** | **THE THREE-POINT PRESENCE TRIPLE (the `props` falsy-toggle scenario)** — *for the pinned boolean member `inert`, presence is a fact at P1 (ON) and ABSENCE is a fact at P2 (after the falsy write) and P3 (after the nullish removal), on BOTH hosts, with the serialized FORM explicitly NOT pinned* — the live half is `[A]`-layer and is taken by the leg, so the register states which half each drive reaches | `P-SM` | `A-3.1`, `A-3.4`, `A-3.5`, `A-3.6` |
| **C-6** | **THE KIND-SET CLOSURE (totality)** — *for every `kind` argument, `scenarioEnvelope` answers a resolved envelope or refuses; the closed set is `2` members in this amendment and a third kind is a CONTRACT row, never a free choice* — a **totality** row over the argument domain (including a non-string / unknown kind), which is the `P-TP` shape | `P-TP` | `A-1.1`, `A-1.5` |

**WHAT THIS PASS DID *NOT* DO, stated so the `OWED` is not read as done:** **it authored NO register row, ran
NO property layer, and executed NOTHING** — no leg, no suite, no `tsc`, no Electron boot; **it wrote no source
and no test file.** **The unit's code and declared legs are green (`R13 RESULT: 9 checks, 0 failures` +
`EXT RESULT: 4 extension checks, 0 extension failures`; `UI RESULT: 0 failures (11/11)`), while its FORMAL
GATE RECORD IS PARTIAL: the adversarial pass (`§3a`/`§3b` `OWED`), the blind-greens set (`OWED`), the full
per-unit documentation review (`OWED`) and this register (`OWED`) are the four items, each with its owner in
`docs/next-steps.md`'s `## DONE — U-DIVERGENCE-EXT` clauses (7)/(10)/(11) and `docs/pending.md` §J.**
**NO CLAUSE OF `§0`–`§9` WAS AMENDED BY THIS SUBSECTION** — it is the gate-11 disposition only.