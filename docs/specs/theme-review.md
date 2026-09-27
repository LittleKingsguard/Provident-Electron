# Review — `U-THEME` (wave **E**, ledger row `E8`) — **GATE 1: the four-step proposal review**

**Status: STEPS `1`, `2`, `3` AND `4` ARE CARRIED BY THIS RECORD AND GATE 1 IS COMPLETE AS A REVIEW** —
`VALID-WITH-CONDITIONS` (step 1, conditions `C-1`…`C-10`) · `SOUND-WITH-CONDITIONS` (step 2, fifteen findings and
three architect questions) · step 3's architecture derivation, **`DELEGABLE-WITH-CONDITIONS` in the PASS-THROUGH
form, `[T]`-only** · step 4's change analysis, **`DELEGABLE-WITH-CONDITIONS` for the SPEC GATE**, conditions
`G-1`…`G-6`. **This pass HOLDS NO SHELL and ran NO leg**: every figure in it is a **read-tool measurement of this
workspace**, a **quoted tracker cell**, a **quoted ruling**, or **this filing's own derivation** — and each is
**attributed at its own site**. Nothing here is a measurement of the unit's behaviour, because **the unit does not
exist**.

**THE PROVENANCE OF THIS RECORD, STATED FIRST BECAUSE IT IS THE WHOLE OF `A-4`, AND IT IS A DOCUMENTED
COMPRESSION.** **Step 1's and step 2's reports were NEVER FILED as artifacts of their own.** That is the **same
process finding the `E4` cycle already recorded as `P-1`** (`docs/specs/relocate-review.md` `§5.9`: *step-1/step-2
reports that were never filed as any artifact at all*) — a class this repo has now seen three times. **THE RECORD
YOU ARE READING WAS WRITTEN BY THE FILING PASS, NOT BY THE REVIEWERS.** Steps 1 and 2 returned to the supervisor;
**no file was written by either pass**; **this single pass landed their substance as this record so nothing is
lost**, and in the **same pass** it filed the contract those conditions gate (`docs/specs/theme.md`). **THE READER
MUST READ THE PROVENANCE CORRECTLY: (a)** the **verdicts, the condition count, the finding count and the three
architect questions are the reviewers' returns** — filed here as substance, not re-derived; **(b)** the
**clause-level expansions, the collision table, the register sketch and every derivation flag are THIS FILING
PASS's**, and each is marked as such where a marker matters; **(c)** **no reviewer re-read this file before it
landed**, so a reviewer's own wording that a later reader needs is **not recoverable from this record and is not
quoted as though it were** — the honest statement of the compression. **`A-4` is therefore CLOSED AS A FILING, and
OPEN AS A PROCESS ITEM** (`§7`). **A later pass may not read this record as four sequentially filed reviews.**

**`A-d6` AND EVERY LANDED CONTRACT ARE CITED AND NOT RE-OPENED.** The architect's adoption is
**`THEME-MECHANISM-AND-AUTHORED-CONTROL`** (`docs/decisions.md`, ACTIVE) and the disposition chain is
`docs/pending.md`'s **upstream-`SCH-3`** row (`DECLINED + REFILED`, reason code `TOO-THIN-WRONGLY-TARGETED`, then
`SUPERSEDED BY A-d6`) and its **`SCH-3`-shape** candidate row (promoted, then retired as a candidate). **The
`U-THEME-MIN` escalation name is RETIRED and is not used as a unit name anywhere in this record or its contract.**
The landed sibling contracts (`menulib.md`, `container.md`, `relocate.md`, `gsession.md`, `zones.md`, `census.md`,
`gutter.md`, `gutter-ui.md`, `listhost.md`, `projection.md`, `slothost.md`, `mount-invariant-guard.md`) are cited;
so is the handoff record's `H-r8` (the six prohibitions), `H-r7` (the one admitted shim member) and
`SHIM-COMPLETION-CARVE-OUT`. **`A-d6`'s own two-unit shape — a MECHANISM here and an AUTHORED CONTROL in `F1` — is
the boundary this record's step 3 DERIVES and never questions.**

| | |
| --- | --- |
| **Unit** | `U-THEME` — wave `E`'s **NINTH** unit: the **pure total `resolveTheme(setting, env)`** + a **DECLARATION-ONLY** applier whose **attribute name is caller-supplied** |
| **Wave / ledger row** | **E** / **`E8`** (`docs/next-steps.md`'s `## OPEN` row `E8`) |
| **Upstream** | **`SCH-3`** — pre-`A-d6` disposition **`DECLINED + REFILED`**, reason code **`TOO-THIN-WRONGLY-TARGETED`** (`docs/pending.md`'s upstream-`SCH-3` row); **`SUPERSEDED BY A-d6 (2026-09-27)`**, which **ADOPTED-RESHAPED it as TWO units** — **`U-THEME` (this mechanism) and `U-THEME-CONTROL` (the ledger's `F1`, a UI unit)** |
| **Code-bearing?** | **YES** — a `src/shared/` TS mechanism with **two** value exports. **`AGENTS.md` item 11 binds: a typed `§5.x` register BEFORE the red set, and the zero-row exemption is UNAVAILABLE** |
| **Dependency** | **`U-MENULIB` (`E7`) is `DONE`** (the ledger's sixteenth `DONE` row, `docs/next-steps.md`'s `## DONE — U-MENULIB`) — **so this unit's only live precondition is its own red set.** `F1`'s `U-THEME-CONTROL` is **BLOCKED ON this unit** and is not this unit's subject |
| **Charter, in the tracker's words** | `docs/next-steps.md`'s `E8` row, quoted: *"`U-THEME` — the pure total `resolveTheme(setting, env)` + the **declaration-only** applier with a **caller-supplied** attribute name; **no token values, no `data-theme` literal, no `matchMedia`, no store**"*, with the `## ⟶ THE REMAINING E-GROUP UNITS` block adding *(its legs are the node suite and the six-prohibition static rows only)* |
| **Contract** | **`docs/specs/theme.md` — `OWED — not filed` at gate-1 time; FILED BY THIS PASS, in the same commit** (the filing this record gates; `§8` item 3) |
| **Gate-1 steps** | **`1` `role_validity`** → **`VALID-WITH-CONDITIONS`**, `C-1`…`C-10` (**§2**) · **`2` `role_critique`** → **`SOUND-WITH-CONDITIONS`**, **15 findings** + **three architect questions `Q1`/`Q2`/`Q3`** (**§3**) · **`3` `role_architecture_review`** → **`DELEGABLE-WITH-CONDITIONS`**, `[T]`-only, **pass-through form** (**§4**) · **`4` `role_change_analysis`** → **`DELEGABLE-WITH-CONDITIONS` for the SPEC GATE**, `G-1`…`G-6` (**§5**) |
| **Filing provenance** | **Written by the FILING PASS, not by the reviewers** (`A-4`; the header block above; `§7`) |
| **Tree state** | **Not measured as a commit.** The measurements this record DOES assert are **read-tool searches this pass ran over this workspace** — listed in **§2.4** and **§7** — and **none of them is a leg, a suite or a build** |

---

## §1 THE UNIT, AND WHAT THE PROPOSAL ASKS

**`E8` / `U-THEME` is the pure appearance MECHANISM half of `A-d6`'s two-unit adoption, and nothing else.** In
`A-d6`'s own words (quoted in substance from `docs/decisions.md`'s `THEME-MECHANISM-AND-AUTHORED-CONTROL`): a
**pure TOTAL `resolveTheme(setting, env)`** over an **opaque `setting`** × an **INJECTED `env = { prefersDark:
boolean }`** — where **`undefined`/`null`/number/unknown-string/frozen-env all yield a resolvable member, never a
throw** — **plus a DECLARATION-ONLY applier that RETURNS the attribute write it would perform and writes nothing,
with the attribute NAME caller-supplied.** **Its negative rows, quoted: no token names/values** (the token block
stays the consumer's stylesheet) **· no `data-theme` literal** (the mechanism may not document it) **· no
`matchMedia`** (the OS reading is injected) **· no store · no ambient `document`/`window`/`localStorage`/`fs` · no
new MCP surface in the mechanism · every row falsifiable in the node suite.**

**WHAT THE PROPOSAL IS NOT, in the same ruling's words.** **The AUTHORED provident appearance control is `F1`'s
(`U-THEME-CONTROL`)**: a `select`/button group in the foundation's **own demo envelope**, dispatching `state-slice`
onto the authored setting, **dispatchable and MCP-visible through the EXISTING tools with NO new tool and NO new
group**. **The persistence boundary: this repo owns no UI-config store, `S-d4` is intact**, and persistence stays
consumer-side. **Three honest costs the ruling itself records, carried here because they bind this unit's filing:
(a)** the demo envelope gains content, so demo-keyed census assertions **may drift for the demo only** — *measure
it, do not assume it*; **(b)** the control is **demonstration code and may not be generalised into a shipped
appearance UI**; **(c) `U-THEME`'s spec MUST BE READABLE WITH THE DEMO DELETED.**

---

## §2 STEP 1 — `role_validity`: **`VALID-WITH-CONDITIONS`**, conditions `C-1`…`C-10`

**The verdict and the condition count are the step-1 reviewer's return, filed here as substance.** The ten
conditions are **the family's ten, re-pointed to this unit** — the same ten `docs/specs/container-review.md` `§2.1`
carries for `U-CONTAINER` (its `C-1`…`C-10`), each obliging the same *kind* of clause in this unit's own terms.
**A condition is an INTERFACE OBLIGATION ON THE SPEC THAT FOLLOWS** — `docs/specs/theme.md` **derives** them and
**may not re-litigate** them.

### §2.1 The condition table, clause by clause

| # | Condition (the family's ten, re-pointed to `U-THEME`) | What it obliges here, at clause level | Discharged at |
| --- | --- | --- | --- |
| **`C-1`** | **The `H-r8` `§0` six-row prohibition table, each row naming the test that pins it** | `H-r4` requires every adopted unit's spec to carry an `H-r8` **`§0 Contract-prohibitions`** block: **one row per prohibition, and each row must NAME the test that pins it** (a prohibition citing *"a static source row"* with no id is not a row). The six: **no consumer vocabulary as symbols/enumerated constants · no app UI content authored · no policy defaults · no UI-config store or persistence · no new MCP surface · no criterion unverifiable on a layer this repo owns** | `theme.md` `§0` + `§2.2` (the six-row table and its `P-TH-*` rows) |
| **`C-2`** | **A SEMANTICS TABLE for EVERY identifier this contract names, with `undefined-until-answered` on NONE** | One row per identifier carrying **referent · kind · domain and the values outside it · who supplies it · who evaluates it · where any arithmetic lives · the observable that proves it · the clause that pins it · STATUS**. `H-3`'s rule: **no bare identifier in a contract.** **Any row whose STATUS is `undefined-until-answered` blocks a `DELEGABLE` verdict** | `theme.md` `§2.2`(D) — **and no row there is `undefined-until-answered`**, which is this record's own ground for a `DELEGABLE` reading of step 3 |
| **`C-3`** | **The collision reconciliation for every token in step 1's collision table (`§2.4`), in the form *"banned in layer X for reason Y, legitimate in layer Z because …"*, with the module's own scan row NAMING its exemptions** | The scan row **must name its declared exemptions** or it is **vacuous**; the landed form is `relocate.md` `§3.4 R-1` (a NAMED exemption set with both controls) and `relocate.md` `§2.3` item 3 (a three-row reconciliation table) | `theme.md` `§2.2`(C) — **the three rows, in the demanded form** — and `§3.4 R-1` |
| **`C-4`** | **The MECHANISM-VS-UI-ELEMENT finding for the RETURNED WRITE**, reconciled with `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test — or recorded as an open architect question | The test, quoted: a mechanism is outside the UI constraint **because it is not a UI element** — *"it authors no text, no control, no affordance, no class taxonomy, no slot content and no styling"* — and *"a mechanism that authors content … IS a UI element authored outside the provident graph and remains a review finding."* **THE FINDING FOR THIS UNIT: the applier RETURNS A WRITE-SHAPED RECORD AND PERFORMS NO WRITE** — so `returned` is not `written`, exactly as `container.md` `§0A` note 1's `E5-B-1` ruling pins for a returned declaration string | `theme.md` `§0A` note 3, `§2.4` item 3, `§3.4 R-8`, `§7` item 4 |
| **`C-5`** | **The layer / `[U]` / `[D]` / gate-6 / `§7.1`-predicate block** | The three-part `[U]` refusal — **(1) the refusal** (no `[U]` row is offered), **(2) the structural reason** (no importer ⇒ no rendered surface; no element/coordinate/DOM read ⇒ nothing for a measuring leg to measure), **(3) the `zones.md` `§4.4 S-6` sentence** (*"the row may not be moved to the `ui` leg silently"*); **`[D]` recorded as NOT CLAIMED**; **gate 6 `STRUCTURAL`, the word `waived` forbidden**; and the **`docs/specs/user-flow-audit.md` `§2`/`§7.1` predicate decision RECORDED either way with its evidence and its falsifier**, never from preference | `theme.md` `§5.2` (the refusal, the non-claim, the gate-6 statement and the `DOES NOT TRIGGER` decision with its falsifier) |
| **`C-6`** | **The typed `§5.x` register FROM THE FILING** — drive-count terms, totals printed with their terms, the seed, the caps | `AGENTS.md` item 11: typed rows only (`P-IM`/`P-SM`/`P-TP`), **never an `F-` row and never a `§6`/`FS-n` citation used as a register row**; **executed deterministically**; each row reporting **strategy id + held/broken**; **caps `≤100`/row · `≤400` total · stop-after-5-consecutive-failures**; **an un-run row reported as a FAILURE**; **the total printed WITH its per-row terms**; **a declared term is a DRIVE COUNT and assertions are printed BESIDE it**; **no new dependency, no fourth leg**; **the row count is an OUTCOME, not a budget** | `theme.md` `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3` |
| **`C-7`** | **The fork-facing seam carry** | `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`: a caller seam is a **PUBLIC, EXPORTED, DOCUMENTED CONTRACT downstream consumers IMPLEMENT**, and *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is normative contract text."* **THE HONEST FORM FOR THIS UNIT: its seam set is EMPTY** — there is **no injected caller closure** here (the two inputs are a value and an environment record) — **so the carry is the two EXPORTED SIGNATURES plus the two exported input/output TYPES, and the `docs/FORKER.md` carry stays OWED to whatever pass next touches that file** | `theme.md` `§2.1` item 3 (the empty seam set), `§8`'s citation index, `§7` item 7 |
| **`C-8`** | **A DERIVED allow/deny set, answering *"is there a path from the application's entry point to this mechanism?"*** | `UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`: *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*, and gate 1 must answer the entry-point question explicitly. **For this unit the derivation has a MEASURED second authority to route — see `§2.4` row 1** | `theme.md` `§5.1` (**the DERIVED DENIED set, named first**), `§2.5` (the no-fabricated-edge rows) |
| **`C-9`** | **The boundary to every sibling with NO IMPORT EDGE IN EITHER DIRECTION, and no fabricated edge** | The dissolved-edge class (`H-r6`): **an edge asserted later in either direction would be a FABRICATED EDGE.** **The boundary this unit owes beyond the empty import census is `menulib.md`'s own scan row — which bans the token `theme` INSIDE ITS OWN MODULE'S SCAN SCOPE** (`§2.4` row 1) — and the two `resolve`/`token` overload sites (`§2.4` row 3) | `theme.md` `§2.5`, `§5.1`, `§3.3 I-8`/`I-9` |
| **`C-10`** | **Prohibition 5 as a NON-GOAL ROW, plus the negative file/config set** | `PROHIBITION-5-IS-AN-ADOPTION-BOUND`: prohibition 5 is *"an adoption bound on units"*; **the pinned MCP sets are asserted as SET EQUALITY AGAINST THE NAMES, never by a number quoted in the spec**; and the family's negative sets hold — **no store, no persistence (`S-d4` intact · `U-THEME` is exactly where the persistence boundary is most tempting), no `src/main/**`, no `electron`/`node:*`, no shim member (`H-r5` amended not weakened; `H-r7` admits exactly one), no `package.json`/config/script/dependency (`AGENTS.md` item 11(d))** | `theme.md` `§0` ruling 6, `§2.2` `P-TH-5`, `§5.1` items 6–12 |

### §2.2 What step 1's verdict does and does not mean

**`VALID-WITH-CONDITIONS` is a verdict on the PROPOSAL, not on a contract** — `docs/specs/theme.md` did not exist
when it was returned. **No condition above is satisfiable by prose where it names a test**: `C-1` names the test per
prohibition, `C-3` names the scan row's exemption list, `C-5` names the falsifier, `C-6` names the caps and the
printed terms.

### §2.3 Step 1's measured facts, AS FILED, WITH `U-THEME`'s OWN RE-MEASUREMENT

**The step-1 reviewer measured the tree and returned these facts.** **This filing pass RE-MEASURED each one with
read tools, and both readings are printed so a drift is attributable rather than silent.** **Every entry is a count
of MATCHING LINES or a file-existence result — a discovery device, not a proof.**

| The step-1 fact, as returned | This filing's re-measurement |
| --- | --- |
| **Nothing in `src/**` reads or writes a theme, an appearance setting, a `data-theme` attribute, `matchMedia` or `prefers-color-scheme`** | **CONFIRMED.** A search over `src/**` for `matchMedia|prefers-color-scheme|data-theme|color-scheme|appearance` returns **ONE** matching line — `src/renderer/index.html`'s `:root { color-scheme: light dark; }` — and the `*.ts` search over `src/**` for `theme|appearance|dark` returns **NO MATCHES**. **There is no TS theme surface anywhere under `src/**`.** |
| **No appearance control exists** | **CONFIRMED (in substance).** `docs/decisions.md`'s `THEME-MECHANISM-AND-AUTHORED-CONTROL` states it as its own premise and `docs/pending.md`'s `SCH-3`-shape row records it verbatim: *"a provident-authored appearance control (which `docs/decisions.md:53` requires and which does not exist today)"*. **No pass may read the demo envelope as already carrying one** |
| **No theme MCP tool and no theme resource** | **NOT RE-MEASURED THIS PASS.** The step-1 reading stands as the reviewer's; the contract asserts the MCP negatives as **SET EQUALITY AGAINST NAMES**, never as a count, so **no figure depends on the re-measurement** |
| **No theme test files exist** | **CONFIRMED.** A search for `theme` across `tests/**/*.ts` returns matches **in eight files**, and **NOT ONE of them is a theme test**: seven are the **provident envelope's own `template.root.hooks` VALUE** (`'theme'` as a hook NAME, in `runtime-battery`, `loadbatch`, `blind-*`, `gemma4-blind-battery`) and **one is a SCAN ROW'S OWN BANNED-VOCABULARY LIST** (`tests/menu-template.test.ts`: `...['zone','pane','tab','region','dashboard','gutter','theme', …]`, a `controlHits` corpus of `menu-template`'s `R-1` row — `§2.4` row 1). **The glob `**/theme*` returns NO FILES at all** |
| **`docs/specs/theme.md` did not exist** | **CONFIRMED AT GATE-1 TIME** — and `docs/next-steps.md`'s `E8` row and `## ⟶ THE REMAINING E-GROUP UNITS` block both read it **`OWED — not filed`**; `docs/pending.md`'s `SCH-3` rows read the same. **IT IS FILED BY THIS PASS** (the same commit) |
| **The only theme-ish artifact in the tree is `src/renderer/index.html`'s `:root { color-scheme: light dark; }`, with hard-coded colours, which NO attribute or injected boolean can influence — so a SECOND AUTHORITY exists and it belongs to `F1`** | **CONFIRMED BY READING THE FILE.** `src/renderer/index.html` carries **one** `<style>` block: `:root { color-scheme: light dark; }` plus **hard-coded** component colours (`#f4f6f8`, `#fff`, `#556`, `#d8dde3`, `#b9c2cc`, `#445`, `#667`, `#c0392b`). **No `data-*` attribute, no class toggle and no injected boolean participates in any of them** — **so this file is an EXISTING appearance authority that this unit's write cannot reach and must not claim.** **It is `F1`'s surface** (`§4.4`, the derived DENIED set) |

### §2.4 STEP 1's COLLISION TABLE — the three hits, carried whole

**Three collisions the adopted surface runs into. Each is a RECONCILIATION OBLIGATION, never a request to soften a
landed ban** (`relocate.md` `§2.3` item 3's own boundary clause: *"the bans stay … the fix is a reconciliation step,
never a relaxation of a prohibition"*). **The contract carries the same three rows in the demanded form**
(`theme.md` `§2.2`(C)).

| # | Token / name | Where it is banned, and the ban's OWN SCOPE (quoted) | The reconciliation |
| --- | --- | --- | --- |
| **1** | **`theme`** | **BANNED AS CONSUMER VOCABULARY, INSIDE A MODULE-SCOPED SCAN ROW** — `docs/specs/menulib.md` `§3.4 R-1` clause **(b)**: *"a consumer-vocabulary token (`zone`, `pane`, `tab`, `region`, `dashboard`, `gutter`, **`theme`**, `is-empty`, …)"*, scoped by that row's own words to *"the MODULE's source (`src/shared/menu-template.ts`) INCLUDING its comments"*. **The landed harness confirms the scope**: `tests/menu-template.test.ts` carries `theme` inside a `controlHits` corpus (`§2.3`), i.e. as that row's **positive control**, not as repo-wide vocabulary | **BANNED IN LAYER `menulib.md` FOR REASON "`U-MENULIB`'s module must carry no consumer vocabulary".** **LEGITIMATE HERE BECAUSE THIS MODULE'S IDENTIFIERS SIT OUTSIDE THAT SCAN'S SCOPE:** `U-MENULIB`'s `R-1` sweeps **`src/shared/menu-template.ts` alone** (`§2.2` `P-ML-1`'s row is scoped to that file), so **`resolveTheme`'s own name, this file's name and this module's bytes are not in that row's object** — and **`theme` is this unit's CHARTER word**: `docs/decisions.md`'s ruling name is `THEME-MECHANISM-AND-AUTHORED-CONTROL`, `docs/next-steps.md`'s row is `U-THEME`, and **the contract path `docs/specs/theme.md` is fixed by `H-r4`'s own list**. **THE NARROW FORM THIS CONTRACT PINS: `theme` appears ONLY as an IDENTIFIER — `resolveTheme` — and NEVER as a token NAME, a token VALUE, an attribute name or a CSS literal** (`P-TH-1`), with the positive control that a token literal, a `data-theme` literal or a second theme-name identifier FAILS the applier's scan rows |
| **2** | **`matchMedia`** | **BANNED EVERYWHERE, AND STAYS BANNED.** The landed sites, each quoted: `H-r5`'s list (*"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam"*), `SHIM-COMPLETION-CARVE-OUT`, `relocate.md` `§3.4 R-1`/`R-2`, `container.md` `§3.4 R-1`(g), `gsession.md` `§1` item 3/`I-13`/`R-2`, `gutter.md` `§3.4 R-2`, `listhost.md` `§2.2`, `projection.md` `§1`, and **`A-d6` itself**: *"no `matchMedia` (the OS reading is injected)"* | **BANNED, EVERYWHERE, FOR REALM-ACCESS AND CSS-RESOLUTION REASONS — AND THE BAN IS UPHELD IN FULL.** **THIS UNIT'S RECONCILIATION IS THAT IT NEVER NEEDS THE READING: the OS preference ARRIVES AS AN INJECTED MEMBER** (`env.prefersDark`) and **the module performs exactly ONE strict comparison against the literal `true`** (`§4.5`). **There is therefore NO reconciliation to make and NO exemption to declare — and that is the honest form: an exemption here would be a relaxation.** **The scan row that pins it is `theme.md` `§3.4 R-2`, with both controls: a corpus reading `matchMedia` FAILS; the module, which reads the injected member, PASSES.** |
| **3** | **`resolve` · `token`** | **OVERLOADED ACROSS SIBLINGS, AND NEITHER IS BANNED.** `U-RELOCATE` (`docs/specs/relocate.md` `§2.1`/`§2.4`) owns **`resolveTarget`** — `RelocateTargetFor = (element, candidates, gesture) => unknown`, an **OPTIONAL caller seam called DURING the gesture**, ABSORBED to `undefined` when unusable. `U-CONTAINER` (`docs/specs/container.md` `§2.1`) owns **`tokensFor(chrome, tokenFn)`** / **`tokenFn`** — *"called EXACTLY ONCE per `tokensFor` invocation, with the chrome value"* — **and `token` is simultaneously three senses in this family**: `zones.md`/`census.md`'s **track-token STRING**, `gutter-ui.md`'s **opaque axis TOKEN**, and `H-r8` prohibition 1's **banned consumer VOCABULARY token** | **NOT BANNED IN ANY LAYER — THE COLLISION IS SPELLING AND OVERLOAD, NOT CONFLICT.** **THIS UNIT DECLARES ITS OWN CONTRACT VOCABULARY AND ASSERTS NO IMPORT EDGE AND NO DUPLICATION:** `resolveTheme` is **NOT** `resolveTarget` (no element, no gesture, no candidate set, no caller seam, no invocation count — it is **a pure function of two arguments**), and **this unit owns NO `tokenFn`, NO `tokensFor` and NO token value of any kind** (`A-d6`: *"no token names/values (the token block stays the consumer's stylesheet)"*). **THE TWO ROWS THAT CAN FAIL FOR IT: a reference to `resolveTarget`/`tokensFor`/`tokenFn` or to `U-RELOCATE`'s/`U-CONTAINER`'s surface FAILS `theme.md` `§3.4 R-11`; a token NAMESPACE or a `--`-shaped custom-property literal FAILS `R-8`.** **Both are stated as DERIVATIONS with both controls, never as a relaxation.** |

**The table's own honesty note, carried from the reviewer and re-affirmed here:** every hit above is a **count of
search matches or a quoted scope**, which is a **discovery device, not a proof** — a row is a collision because the
token's **referent** is claimed by a landed row, never because a search returned something.

---

## §3 STEP 2 — `role_critique`: **`SOUND-WITH-CONDITIONS`**, fifteen findings and three architect questions

**The verdict is the step-2 reviewer's return: `SOUND-WITH-CONDITIONS`, with FIFTEEN FINDINGS across the axes
below and THREE ARCHITECT QUESTIONS (`Q1`/`Q2`/`Q3`).** **The axis names and the finding count are the reviewer's;
the one-line content of each axis is filed here as substance, and the questions are carried VERBATIM in substance
because step 3 answers them.**

### §3.1 The fifteen findings, by axis

| Axis | Findings | The finding, condensed | Discharged by |
| --- | --- | --- | --- |
| **THE NAME AXIS** | the axis's findings begin from **only `resolveTheme` was named** | **`A-d6`'s contract names ONE identifier — `resolveTheme(setting, env)` — and NOTHING ELSE.** **The applier has NO name, NO arity, NO return shape and NO removal case named; the two inputs' referents are undeclared (`setting` could be a string, a record or a closure; `env` is typed `{prefersDark: boolean}` in the ruling but its CLOSURE and its coercion rule are not stated); and the return type has no name at all.** **Every one of those is an `H-3` finding — a declared parameter without a semantics row** | **step 3 pins `applyThemeDeclaration(attributeName, resolved)`, the three types `ThemeResolution`/`ThemeAttributeWrite`/`ThemeEnv`, and the whole `§2.2`(D) semantics table** — `C-2`; `theme.md` `§2.1`/`§2.2`(D) |
| **THE RETURN DOMAIN** | the resolved value's domain and the source of its member literals | **The ruling says `setting` is OPAQUE and the env reading is injected, but it does NOT say WHAT the resolved value IS** — a token the caller handed over, or a value this mechanism mints from a member pool of its own (`'light'`/`'dark'`/`'system'`). **The two readings differ in the module's VOCABULARY (prohibition 1) and in the fork-facing contract** | **`Q1` (§3.2) — and step 3 DERIVES it as far as it goes: the resolved value is the CALLER's own opaque token passed through** (§4.2) |
| **THE PRECEDENCE COLLISION** | the tri-state axis's precedence | **The original request's "tri-state appearance controller" implies an explicit-vs-system PRECEDENCE, but `A-d6`'s reshaped surface has NO tri-state member and NO precedence rule** — `setting` and `env.prefersDark` are two independent inputs with no declared relationship, so a row asserting *"an explicit setting overrides the OS preference"* is asserting a clause that does not exist | **step 3's derivation: `env.prefersDark` is REPORTED in `basis`/`prefersDark` and is NOT the value's source** — so there is no precedence to declare and no row may invent one (`theme.md` `§3.4 S-TH-4`) |
| **THE WRITE'S REPRESENTATION** | `declaration-only` as a bare NOUN | **"a declaration-only applier that returns the attribute write it would perform" does not say WHICH of four readings it is** — a returned `[name, value]` PAIR, a returned `{name, value}` RECORD, a returned call to `removeAttribute` (i.e. a closure), or a returned statement the consumer parses — and **the removal case (what the applier returns when the setting is unset) is named NOWHERE** | **`Q2` (§3.2) — and step 3 pins `{name, value, removal}`, with the removal case as DATA** (§4.3) |
| **THE NAME-ECHO RULE** | what happens to the caller's attribute name | **The attribute name is caller-supplied, but the ruling does NOT say whether it is echoed VERBATIM, coerced (`String(name)`), validated or defaulted** — and an applier that CONSULTS `toString`/`valueOf` on the caller's argument reads a member of caller data as a DECISION (the `S-ML-7`/`S-7` class), which no contract here may require | **step 3 pins the rule: a non-empty string echoes VERBATIM BY IDENTITY; a non-string / `''` / omitted argument yields `name: null`; `String()`/`toString`/`valueOf` are NEVER consulted for the name** (`theme.md` `§2.4` item 1) |
| **THE TRI-STATE AXIS** | the third state | **`A-d6`'s `SCH-3`-shape row records the original ask as a TRI-STATE appearance controller, while the adopted `env` has ONE boolean member** — so **the third state has no home**: either the resolved value's domain carries it (a member pool), or it lives in the caller's own setting and is opaque here | **the same derivation as `Q1`** — with **`env` CLOSED at one member** (`Q3`), the third state is the CALLER's, carried in the opaque token (`theme.md` `§2.3` item 1) |
| **THE `env` ROBUSTNESS AXIS** | coercion and hostile shapes | **The ruling lists `undefined`/`null`/number/unknown-string/frozen-env as "yielding a resolvable member, never a throw" — but it does NOT say whether a member that is merely TRUTHY counts, whether the reading is `=== true`, and whether a THROWING accessor, a trap-throwing `Proxy` or a REVOKED `Proxy` is also covered.** **A truthiness read and a strict read differ on `1`, `'false'`, `[]` and `{}` — four shapes a fork's own env record can produce** | **`Q3` (§3.2) — and step 3 pins the CLOSED one-member env with STRICT `=== true`, every hostile shape resolving `false`, absorbed PER MEMBER with nothing throwing** (`theme.md` `§2.3` item 2) |
| **THE UI-CONTENT AXIS** | `S-d8` `(C)#2` | **The applier RETURNS a write. Under `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test, a mechanism that AUTHORS content is a UI element; a mechanism that returns a value is not.** **The finding is that the RETURN-vs-AUTHORS distinction must be stated, because a later pass could read *"the attribute write it would perform"* as authorship** | **ITS `C-4` FINDING, discharged at `theme.md` `§0A` note 3 and `§2.4` item 3, with the
`E5-B-1` precedent cited** |
| **THE SECOND-AUTHORITY COLLISION** | the existing appearance authority | **`src/renderer/index.html`'s `:root { color-scheme: light dark; }` is ALREADY an appearance authority in this repo (§2.3), and it is unreachable by any value this unit returns** — so **a later pass could read this unit as the ONE theme authority and be wrong**, or route an `F1` requirement here | **step 3's derived DENIED set denies `src/renderer/**` (the index.html path included) and the demo envelope, because `F1` owns them** (§4.6, `theme.md` `§5.1` items 1/2) |
| **THE LAYER AXIS** | the layer / `[U]` / `[D]` / gate-6 story | **The unit is `[T]`-only, and its legs are the node suite plus the six-prohibition static rows — but the refusal must be THREE-PART and STRUCTURAL, and gate 6 must be stated as `STRUCTURAL` with a falsifier rather than quietly omitted** | **`C-5`** — `theme.md` `§5.2` |
| **THE GATE-6 FALSIFIER** | what would break the structural claim | **A `STRUCTURAL` gate 6 is only honest if a diff scope admitting `src/renderer/**` (**including the demo-envelope path**), any `src/**` importer, an authored attribute write or a proving probe FIRES the `§7.1` predicate.** **The falsifier must be stated so the claim can fail** | **step 3 states it in the record's own words** (§4.7) — `theme.md` `§5.1`'s closing sentence and `§5.2` |
| **THE `F1` BOUNDARY** | the two-unit split | **`A-d6` adopts TWO units, so this mechanism must declare a NO-EDGE boundary to the authored control — and must NOT fabricate an edge in either direction** (the `H-r6` dissolved-edge class) | **step 3's no-fabricated-edge rows** (§4.6) — `theme.md` `§2.5` |
| **THE PROCESS AXIS** | the filing itself | **The gate's own reporting discipline: a review whose step-1/2 reports are never filed is the `E4` `P-1` defect recurring** — and **step 1's and step 2's reports were, in fact, never filed** | **`A-4`, discharged as a FILING by this record and left OPEN as a process item** (`§7`) |
| **THE OPTIONS AXIS** | the alternatives, with costs | **The critique weighed the alternatives to adoption — including REFUSE TO FILE AS STILL TOO THIN** (`TOO-THIN-WRONGLY-TARGETED`'s original reason code, which the pre-`A-d6` change-analysis had used to override the architecture pass's marginal adoption) — **and each option carries a cost: a refuse costs the fork its theme settings; a member-pool adoption costs prohibition 1 and the fork's own token block; a store-bearing adoption breaks `S-d4`.** | **`A-d6` HAS ALREADY RULED the adoption** (`docs/decisions.md`), so **the refuse option is SPENT and is not re-opened here**; what survives is its **residue — the two units' honest costs** (§1), which is why `U-THEME`'s spec must be readable with the demo deleted |
| **THE EXTERNALITIES AXIS** | what the adoption costs elsewhere | **The demo envelope gains content and its demo-keyed census assertions may drift FOR THE DEMO ONLY (measure it, do not assume it); the control is demonstration code and may not be generalised; and the mechanism's own value is contract value, since no `src/**` consumer imports it** | **`F1`'s obligations, carried in this unit's citation index as NOT THIS UNIT** — `theme.md` `§1` item 3, `§5.1`, `§8` |

### §3.2 Step 2's THREE ARCHITECT QUESTIONS, carried verbatim in substance

**These are the reviewer's questions, not this filing's and not rulings.**

| # | The question | Where step 3 landed it |
| --- | --- | --- |
| **`Q1`** | **The resolved domain and the admissible source of its member literals** — i.e. *is the value this mechanism resolves the CALLER's own opaque token passed through, or a member of a pool this mechanism declares (`'light'`/`'dark'`/`'system'`)?* | **DERIVED AS FAR AS IT GOES — the pass-through reading**, with the alternative (a declared two-member pool) recorded as a fileable, architect-reversible default (`A-1`; §4.2, §6) |
| **`Q2`** | **The applier's exported name, arity, returned shape and removal-case representation** | **PINNED — `applyThemeDeclaration(attributeName, resolved)` returning `{name, value, removal}`** (§4.3) |
| **`Q3`** | **Whether `env` is CLOSED, and what coercion/robustness governs it** | **PINNED — closed at one member `prefersDark`, strict `=== true`, every hostile shape absorbed to `false` with nothing throwing** (§4.5) |

**Step 4's subsequent judgement, recorded because it changes how a reader must treat these three: `A-1` (which is
`Q1`'s residue: pass-through form versus a declared two-member pool) and `A-2` (a naming confirmation for the
observable degradation) are FILEABLE as RECORDED WORKING DEFAULTS with architect-reversible alternatives; `A-3`
does not survive; and `A-4` is the process item of this record's header.** **Only `Q2` and `Q3` were pinned on the
merits; `Q1` is a default.**

---

## §4 STEP 3 — `role_architecture_review`: **`DELEGABLE-WITH-CONDITIONS` — `[T]`-ONLY, IN THE PASS-THROUGH FORM**

**The verdict is step 3's return, and it is a verdict about the SPEC's readiness, not about any red set.** **This
section is a SUMMARY OF ITS DERIVATION, carrying every clause a TestWriter would otherwise have to re-derive.**
**Nothing in this section was measured by this filing pass**; the derivation is a design act, and its only
falsifiers are the contract's rows.

### §4.1 The shape it resolves

**One NEW module, `src/shared/theme.ts`, with TWO value exports and THREE exported types — and NO factory, NO
options object, NO session, NO module-level state and NO write of any kind.** **The three exported types are
`ThemeResolution`, `ThemeAttributeWrite` and `ThemeEnv`, and the SURFACE IS FIVE NAMES IN TWO HALVES:**

| Half | The names | Count |
| --- | --- | --- |
| **Runtime value exports** | **`resolveTheme`** · **`applyThemeDeclaration`** | **`2`** |
| **Type declarations** | **`ThemeResolution`** · **`ThemeAttributeWrite`** · **`ThemeEnv`** | **`3`** |
| **Total** | | **`2 + 3 = 5`** |

**THE SEAM SET IS EMPTY.** `A-d6` names **no injected caller closure** for this mechanism: **the two inputs are a
VALUE (`setting`) and an ENVIRONMENT RECORD (`env`)**, and the second is `{prefersDark}` — **so `GUTTER-CALLER-
SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` has no seam here to make normative, and the fork-facing carry is the
two exported signatures plus the three exported types** (`C-7`). **An empty seam set is a DERIVATION, stated as
one, and a later pass asserting a seam would be asserting a clause this unit's charter does not contain.**

### §4.2 `Q1` — the resolved domain, DERIVED AS FAR AS IT GOES (the pass-through reading)

**RULED BY DERIVATION, and marked as a derivation at every site: the RESOLVED VALUE IS THE CALLER'S OWN OPAQUE TOKEN
PASSED THROUGH, `String()`-coerced ONLY for a non-string — and `env.prefersDark` is REPORTED in `basis`/`prefersDark`
rather than being the value's source.** **THE MECHANISM THEREFORE OWNS NO THEME VOCABULARY: it contains no
`'light'`, no `'dark'`, no `'system'`, no attribute name, no token name and no token value** — which is the only
reading under which `A-d6`'s own negative row (*"no token names/values"*) and prohibition 1 hold **literally**.

**THE ALTERNATIVE, NAMED AND NOT TAKEN (the residue of `Q1`, carried as `A-1` and filed as a WORKING DEFAULT): a
DECLARED TWO-MEMBER POOL** — the mechanism would own exactly two member literals and choose between them from
`env.prefersDark`. **Its cost, stated so the choice is checkable: it puts two consumer-vocabulary literals inside a
mechanism whose charter forbids them (`H-r8` prohibition 1), it makes the caller's own token block unreachable
from the resolved value, and it would move `§2.1`, `§2.3`, `§3.1` and the register's `P-TH-IM-1`/`P-TH-TP-2` domains
— i.e. a register RE-GRAIN in the pass that takes it.**

### §4.3 `Q2` — PINNED: `applyThemeDeclaration(attributeName, resolved)` returning `{name, value, removal}`

**PINNED ON THE MERITS, in the pass-through form.** **The exported name is `applyThemeDeclaration`; the arity is
TWO; the returned shape is a THREE-MEMBER record `ThemeAttributeWrite = {name, value, removal}`; and the REMOVAL
CASE IS `{name: <echoed>, value: '', removal: true}`.** **THE `H-r7` `removeAttribute` CLASS IS REPRESENTED AS
DATA, NEVER CALLED** — **there is no `removeAttribute` invocation, no element parameter, no realm access and no
write of any kind anywhere in this unit**, and **the returned record is exactly what a CONSUMER would need to
perform the write on an element it owns.**

**THE NAME-ECHO RULE, ALSO PINNED (and it is the half a fork reads first): a NON-EMPTY STRING `attributeName`
ECHOES VERBATIM BY IDENTITY; a NON-STRING, an `''` or an OMITTED argument yields `name: null`; and `String()`,
`toString` and `valueOf` are NEVER consulted for the name.** **The reason, stated so the rule is not arbitrary:
consulting a coercion hook would make the name a read of caller data as a DECISION — the class `S-ML-7`/`S-7`
forbids — and an echoed null is an ABSENCE rather than a fabricated name** (prohibition 3's absence discipline,
which `menulib.md` `I-12` states for its own declared empty answers).

### §4.4 The layer map

| Label | Claim |
| --- | --- |
| **`[T]`** | **THE UNIT'S WHOLE PROVABLE LAYER**: the repo's own `tests/**` under `npm test` plus this unit's test file. **Every row of the contract is `[T]` or `static`.** |
| **`[H]`** | **host-side `src/**`** — this unit's own `src/shared/theme.ts`, its export census and its no-importer probe (legs 2/3/4 and a standalone strict `tsc`) |
| **`[U]`** | **REFUSED, IN THE FAMILY'S FIXED THREE-PART FORM.** **(1) the refusal: no `[U]` row is offered, for any row of this unit**; **(2) the structural reason: the module is imported by NO `src/**` file, so there is NO RENDERED SURFACE TO OBSERVE, and it reads NO DOM, NO ELEMENT, NO COORDINATE and NO OS, so there is NOTHING FOR A MEASURING LEG TO MEASURE** — the `ui` leg exists and is green, so the refusal is not an excuse about leg availability; **(3) `zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row may not be moved to the `ui` leg silently."*** |
| **`[D]`** | **NOT CLAIMED.** The divergence harness (`N = 9` pinned) exists and is green, **and its only subject is a shim's rendering versus a real host's — a RENDERED SURFACE, which this unit authors none of.** **`R-7`/`R-9` are the probes that keep the non-claim falsifiable** |

### §4.5 `Q3` — PINNED: `env` is CLOSED at ONE member, `prefersDark`, with STRICT `=== true`

**PINNED ON THE MERITS.** **`ThemeEnv = { readonly prefersDark: boolean }` — ONE member and no second**; **the
reading is STRICT `=== true` and is NEVER a truthiness test**; **and every hostile shape resolves to `false`,
ABSORBED PER MEMBER, with NOTHING THROWING:** a missing member, a string (including `'false'` and `'true'`), a
number (including `1`), `undefined`/`null`/a non-object env, a FROZEN env, a THROWING ACCESSOR, and a
REVOKED or TRAP-THROWING `Proxy`. **THE DEGRADATION IS OBSERVABLE VIA `basis`** — that observability is `A-2`'s
naming question (`§6`), filed as a working default. **A truthiness read and a strict read differ on `1`, `'false'`,
`[]` and `{}`, so the choice is testable; the strict read is the one `A-d6`'s own words support** (*"an injected
`env = { prefersDark: boolean }`"* — a `boolean`, not a truthy value).

### §4.6 The DERIVED DENIED set, the composition boundary, and the `F1` boundary

**THE DENIED SET IS DERIVED, NAMED FIRST IN THE CONTRACT, AND ITS TWO SUBJECTS ARE `F1`'s.** **THE TWO `F1`-OWNED PATHS ARE DENIED** — the demo envelope path (`src/shared/demo-envelope.ts`) and
`src/renderer/index.html` — **because `F1` owns them:** the authored control is `A-d6`'s **authored** unit, and
`index.html` is the repo's **already-present appearance authority** (`§2.3`) which **no value this mechanism
returns can reach**. **The rest of the set is the family's**: `src/main/**` ·
`src/renderer/**` · `src/preload/**` · `src/shared/dom-shim.ts` · every sibling module and test file ·
`package.json`/`package-lock.json` · `scripts/**` · the config files · the MCP surface · every sibling artifact ·
`docs/skills/designing-pages.md` (**which does not exist** — the probe is the contract's `R-9`) · **and
`docs/specs/theme-review.md`, this record itself.**

**THE COMPOSITION BOUNDARY: NO IMPORT EDGE IN EITHER DIRECTION, AND NONE FABRICATED.** **The module imports
NOTHING — not even type-only**; **it is imported by no `src/**` file**; **and no sibling's surface is composed,
re-expressed or asserted as an edge.** **The `F1` BOUNDARY IS A NO-EDGE BOUNDARY:** this mechanism and the authored
control are **two units of one adoption**, and **neither imports the other, neither asserts a dependency on the
other, and a later pass asserting an edge between them would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge
class). **`F1` is BLOCKED ON this unit *as a tracker ordering*, which is not an import edge and is not a
composition.**

### §4.7 Gate 6 is `STRUCTURAL`, with its falsifier

**GATE 6 IS `STRUCTURAL`, NEVER WAIVED — the word `waived` is forbidden.** **The honest status: the live app
CANNOT REACH this module** — it is imported by no `src/**` file and appears in none of the built outputs — **so
gate 6 is closed by the same structural reason `[U]` is refused.** **THE FALSIFIER, in step 3's own terms, stated
so the claim can FAIL: a `§5.1` containing `src/renderer/**` — INCLUDING THE DEMO-ENVELOPE PATH — OR ANY `src/**`
IMPORTER, OR AN AUTHORED ATTRIBUTE WRITE, OR A PROVING PROBE FIRES the `§7.1` predicate, makes the three-part
`[U]` refusal UNAVAILABLE, converts gate 6 into a LIVE BATTERY the unit owes, and turns the ledger's `Legs` cell
into a finding.**

### §4.8 The `§7.1` PREDICATE DECISION, with its evidence and its falsifier

**DECISION — `DOES NOT TRIGGER`, on both limbs, from the recorded change set and not from preference.**
**Limb A (`DOM-SHIM-BLINDNESS`) does not hold**: the change **authors NO rendered surface** — no element, no class,
no attribute write, no text, no style, no cursor, no coordinate. **Limb B (`UI-OVERHAUL`) does not hold**: the
module is **imported by no `src/**` file and changes no user-visible flow**. **THE EVIDENCE THAT DECIDED IT: the
allow-list contains no `src/renderer/**` path, no `src/main/**` path, no demo-envelope path and no attribute-writing
probe; and `docs/skills/designing-pages.md` does not exist, so there is no live surface for the audit to reach.**
**THE FALSIFIER is `§4.7`'s sentence, verbatim in substance.** **CONSEQUENCE, stated so the exemption is not
confused with an empty report: NO `§5.U` matrix and NO `§6.1` report are emitted, and the exemption is RECORDED
with its reason** — *"'no report' and 'an empty report' are different artefacts and the first is the only
admissible form of the exemption."*

### §4.9 An 8-ROW REGISTER SKETCH WITH FOUR DOMAINS NAMED

**The sketch, AS A SKETCH — the register itself is the contract's `§5.5.x`, and the sketch's row ids are NOT its
ids.** **`P-TH-IM-1`…`IM-3` · `P-TH-SM-1`…`SM-2` · `P-TH-TP-1`…`TP-3` = `8` rows**, and the four DOMAINS:

| # | Domain | Statement |
| --- | --- | --- |
| **1** | **THE SETTING DOMAIN** | **ANY JavaScript value — the callers' opaque appearance token, and the values OUTSIDE the pass-through form: `undefined`, `null`, `''`, a number, a boolean, a `Symbol`, a `12n`, an object, an array, a function, a hostile `Proxy`** |
| **2** | **THE ENVIRONMENT DOMAIN** | **CLOSED AT ONE MEMBER `prefersDark`, with the strict-`=== true` rule; every other env shape is a DEGRADATION, not a member** |
| **3** | **THE REMOVAL / ECHO DOMAIN** | **the caller's attribute name as a non-empty string (echoed verbatim) versus every non-string, `''` and omitted form (`name: null`)** |
| **4** | **THE OPAQUE, NEVER-INTERPRETED RESOLVED DOMAIN** | **the resolved value's members are NEVER validated, never enumerated and never compared** — **a domain that is never interpreted must be DECLARED as such or the rows read as validation rows** |

### §4.10 The three collision reconciliation rows, and the filing checklist

**The three rows are `§2.4`'s (`theme`; `matchMedia`; `resolve`/`token`) — carried into the contract in the
*"banned in layer X for reason Y, legitimate in layer Z because …"* form, with `matchMedia` upheld in full and no
exemption declared for it.** **The filing checklist step 3 left: (1) file `docs/specs/theme.md` with the five-name
surface and the two shapes it pinned; (2) carry the `H-r8` six-row `§0` table; (3) carry the `§2.2`(C) three-row
reconciliation; (4) carry the `§2.2`(D) semantics table with no `undefined-until-answered` row; (5) carry the
empty seam set and the two exported signatures as the fork-facing carry; (6) carry the derived DENIED set with the
two `F1`-owned paths named; (7) state gate 6 `STRUCTURAL` with its falsifier; (8) record the `§7.1` decision with
its evidence and falsifier; (9) land the typed register from the filing, with the four domains declared and the
totals printed with their terms; (10) record the two fileable defaults in the `E5-B-3` form.**
**Every item is discharged in `docs/specs/theme.md`, filed by this pass.**

**STEP 3's BLOCKER SET, FILED AS JUDGED:** **`A-1`** (the pass-through form versus a declared two-member pool) and
**`A-2`** (a naming confirmation for the observable degradation) are **FILEABLE as recorded working defaults with
architect-reversible alternatives**; **`A-3` DOES NOT SURVIVE** (it was raised and found not to hold, and is
recorded here so it is not re-raised); **`A-4` is the process item of this record's header** (`§7`).

---

## §5 STEP 4 — `role_change_analysis`: **`DELEGABLE-WITH-CONDITIONS` FOR THE SPEC GATE**, conditions `G-1`…`G-6`

**The verdict is about READINESS FOR THE SPEC GATE — not about any red set, green run or leg.** **No red set is
delegable off this record alone**: `AGENTS.md` item 11 requires the typed register **before** a red set is authored,
and `AGENTS.md` item 9 requires a TestWriter to have **RUN and REPORTED** the red set. **The verdict says: the spec
may be FILED from step 3's resolved shape plus the six conditions below.**

| | Condition | Falsifiable discharge test |
| --- | --- | --- |
| **`G-1`** | **The DIFF SCOPE is exactly `src/shared/theme.ts` + `tests/theme.test.ts`, with NO `src/**` edit, NO config change and NO dependency** | FALSIFIED by any other written path in the unit's change set, or by a new `scripts` key in `package.json` (`tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET, so any further key reddens it and a config change cannot satisfy it) |
| **`G-2`** | **THE FIVE-NAME SURFACE and THE TWO SHAPES exactly as step 3 pinned them** — `2` value exports + `3` types, `applyThemeDeclaration(attributeName, resolved)` returning `{name, value, removal}`, the removal case `{name: <echoed>, value: '', removal: true}`, and the EMPTY seam set | FALSIFIED by a SIXTH export, by a moved return shape, by a moved arity, or by a declared seam |
| **`G-3`** | **`env` CLOSED at one member `prefersDark` with STRICT `=== true`** | FALSIFIED by any truthiness read (a row must drive `1`, `'true'`, `'false'`, `[]`, `{}` and assert all of them `false`) or by a SECOND env member |
| **`G-4`** | **The SIX PROHIBITIONS carried as `§0` rows, and the unit READABLE WITH THE DEMO DELETED** | FALSIFIED by a `data-theme` literal, a `matchMedia` reference or a token literal anywhere in the module, or by a demo-envelope reference in the contract's normative clauses |
| **`G-5`** | **The register typed-only, EXECUTED, with totals printed WITH their terms** | FALSIFIED by an `F-` row, by a `§6`/`FS-n` citation used as a register row, by an un-run row reported as a pass, or by a total that lacks its per-row terms or is not their sum |
| **`G-6`** | **Gate 6 `STRUCTURAL` PLUS the `§7.1` decision filed with its evidence** | FALSIFIED by a claimed live battery, by the word *"waived"*, or by an unstated non-trigger |

### §5.1 Step 4's recorded corrections, and its scope finding

1. **`A-1`/`A-2` ARE FILEABLE DEFAULTS** — step 4 **agreed** with step 3's judgement and **did not remand the
   filing** for either.
2. **`A-2` IS RESTATED AS A NAMING QUESTION — finding `A-5`** — so that it **does not read as a re-open** of a
   settled clause. **Its subject is the NAME of the observable degradation, not whether one exists.**
3. **NO `src/**` PATH IS DERIVABLE AS ALLOWED UNDER THIS UNIT'S CHARTER.** **The demo envelope and the renderer are
   `F1`'s** (`§4.6`), and this unit's own module is the only allowed production path — **so the entry-point path
   question is answered `NO`, and that answer is a DERIVATION rather than an inherited copy.**
4. **ONE THING TO REGISTER, corrected by step 4 and carried into the contract: `E8`'s `§5.1` denial is a SCOPE
   PROHIBITION ON WHAT THIS UNIT WRITES — a later `F1` pass LAWFULLY importing this module must not be read as
   falsifying `E8`.** **The denial binds this unit's own diff; it does not declare the module permanently
   importer-less, and it does not forbid `F1` from consuming it.**

**NOT TAKEN, and no later pass should take them as owed:** **`[U]`** (the three-part refusal stands) and
**`[D]`** (not claimed). **The `[T]`-only reading is not a limitation to be lifted by a later pass without a new
gate: it is the layer the unit's whole contract lives on.**

---

## §6 THE TWO RECORDED WORKING DEFAULTS, IN THE `E5-B-3` FORM, AND `A-3`'s NON-SURVIVAL

**The form is `docs/decisions.md`'s `E5-B-3` row's (whose own title reads *"NOTE (not `DECIDED`)"*) and
`docs/specs/gutter-ui.md` `§7a.1`'s: A FILEABLE ITEM IS *"a RECORDED WORKING DEFAULT … it does NOT gate the
filing"*, and THE DEFAULT IS STATED, THE ALTERNATIVE IS NAMED, THE CLAUSE IT BLOCKS IS NAMED, AND A ROW CARRIES
EACH.** **NEITHER ITEM IS AN ARCHITECT'S RULING, and this record must not be read as presenting one as such.**
**Both are carried into `docs/specs/theme.md`'s `§7a`/`§7a.1` in the same form, and the SPEC GATE RATIFIES OR
REVERSES THEM.**

| Item | The default, as recorded | The alternative, named | The clause it blocks | Its row |
| --- | --- | --- | --- | --- |
| **`A-1`** — **`Q1`'s residue: the RESOLVED DOMAIN** | **the CALLER's own opaque token PASSED THROUGH**, `String()`-coerced only for a non-string, with `env.prefersDark` **REPORTED** in `basis`/`prefersDark` rather than being the value's source (`§4.2`) | **a DECLARED TWO-MEMBER POOL** owned by the mechanism | `§2.1`, `§2.3`, `§3.1`, and the register rows `P-TH-IM-1`/`P-TH-TP-2` — **a re-grain in the pass that takes it** | `theme.md` `§7a.1` item 1; `§3.4 S-TH-4` |
| **`A-2`** — **restated by step 4 as a NAMING question (`A-5`)** | **the observable degradation is named `basis` on `ThemeResolution`** — the member whose value reports that the environment reading was degraded | **a differently-named observable**, or the degradation reported on `ThemeEnv` instead | **`§2.1`'s `ThemeResolution` block and the env rows that read `basis`** (`P-TH-IM-2`'s observable half) — **a RENAME moves no row id, no term and no shape** | `theme.md` `§7a.1` item 2 |

**`A-3` DOES NOT SURVIVE.** **It was raised at step 3 and step 4 confirms it does not hold: it is recorded here,
with no default and no row, so no later pass re-derives it as an open item.**

**WHAT THE ARCHITECT OWES, AND WHEN, stated in the family's form: NOTHING IS HELD.** The filing proceeds on both
defaults; **either may be reversed by a dated annotation at the spec gate**, and a reversal of `A-1` **owes a
register re-grain** while a reversal of `A-2` owes **none**. **`Q2` and `Q3` are PINNED and are not open** (`§4.3`,
`§4.5`). **⟶ THE SPEC GATE HAS SINCE ANSWERED THIS PARAGRAPH (`2026-09-27`): `A-1` STANDS AS FILED (ratified, still
architect-reversible — its reversal still owes the re-grain this paragraph names) and `A-2` IS CLOSED BY THE RULING
AS A RENAME (`basis` → `source`), which owes NO re-grain — exactly the case this paragraph predicted. The ruling is
the SPEC-GATE RULING ANNOTATION at this record's end; the table ABOVE keeps its as-filed wording.**

---

## §7 PROCESS FINDINGS THIS GATE PRODUCED

| | Finding | Owner |
| --- | --- | --- |
| **`A-4`** | **THE STEPS 1 AND 2 REPORTS WERE NEVER FILED — AND THIS RECORD IS THE COMPRESSION THAT CARRIES THEM.** **The `E4` cycle recorded the identical defect as `P-1`** (`docs/specs/relocate-review.md` `§5.9`: step-1/step-2 reports that were *never filed as any artifact at all*). **This pass landed both steps' substance as THIS record and filed the contract they gate — BUT THE RECORD WAS WRITTEN BY THE FILING PASS, NOT BY THE REVIEWERS**, and **the reviewers' own wording is therefore not recoverable from it.** **A later reader must not read this file as four sequentially filed reviews, and a reviewer who needs the original return must go to the session — which is exactly the loss `P-1` names.** | **The supervisor** (it owns gate boundaries and `RCA-8(a)` commits) — **the FILING half is DISCHARGED by this pass; the PROCESS half stays `OPEN`** |
| **`P-T-1`** | **NO LEG WAS RUN AND NO SHELL WAS HELD BY THIS PASS** — no suite, no trio, no `tsc`, no Electron boot, no `npm run ui`, no `npm run divergence`, no register execution. **Every figure in this record is a read, a quote or a derivation**, and **no later pass may quote any figure here as a measurement of its own** (`RCA-12`). | **The supervisor**, at gate 9 (its measurement is the only one that counts) |
| **`P-T-2`** | **THE LEDGER ROW `E8` CARRIES A STALE CELL SET, RE-MEASURED THIS PASS** (`docs/next-steps.md`'s `## OPEN` row `E8`, read this pass): its **`Spec`** cell reads `docs/specs/theme.md` (**`OWED — not filed`**) — **FALSE AS OF THIS PASS**; its **chain** cell reads `BLOCKED → then U-MENULIB → spec → TestWriter red` — **the dependency `U-MENULIB` (`E7`) is `DONE` and the tracker's own queue block names `E8` as the next action, so `BLOCKED` is spent**; and its **`Legs`** cell reads *"node suite only (the six-prohibition static rows)"*, **which does not name the family's five legs**. | **The supervisor's reconciliation pass** — a cell repair, `RCA-8(d)`-safe (**annotate beside, never rewrite**) |
| **`P-T-3`** | **THE SECOND APPEARANCE AUTHORITY IS A TRACKER-VISIBLE FACT NO TRACKER ROW STATES.** `src/renderer/index.html` carries `:root { color-scheme: light dark; }` and hard-coded colours (`§2.3`), **and no OPEN or `F1` row names it as the existing appearance authority `F1` will work beside.** **A fresh reader can therefore start from "this repo has no appearance authority", which is false.** | **Whatever pass next touches `F1`'s row** — it gates no unit, and `F1` is blocked on this unit anyway |
| **`P-T-4`** | **THE FILING'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE:** this pass wrote **exactly TWO NEW files** — this record and `docs/specs/theme.md` — and **edited NO existing file**; **no tracker row, no decision row and no sibling spec was changed**; and **the two new files are untracked and must be committed by the supervisor** (`RCA-8(a)`/`(c)`). | **The supervisor** |

**THE MEASUREMENTS THIS PASS DID TAKE, named so they are attributable rather than implied:** **(a)** a `src/**`
search for `matchMedia|prefers-color-scheme|data-theme|color-scheme|appearance` (**`1` matching line**); **(b)** a
`src/**/*.ts` search for `theme|appearance|dark` (**`0` matches**); **(c)** a `tests/**/*.ts` search for `theme`
(**matches in `8` files, none of them a theme test** — `7` are the envelope's `template.root.hooks` VALUE and `1`
is `menu-template`'s own scan-row control corpus); **(d)** the `**/theme*` glob (**no files**); **(e)** the
read of `src/renderer/index.html` (**`44` lines, one `<style>` block, the `:root` line at `8`**); and **(f)** the
read of `docs/next-steps.md`'s row `E8`. **All six are read-tool results, and none is a leg.**

---

## §8 WHAT MUST HAPPEN NEXT, IN ORDER

1. **File `docs/specs/theme.md`** — **DONE BY THIS PASS, in the same commit as this record** — carrying the
   five-name surface, the two pinned shapes, the `§0` six-row prohibition table, the `§2.2`(C) three-row
   reconciliation, the `§2.2`(D) semantics table with no `undefined-until-answered` row, the empty seam set, the
   derived DENIED set with the two `F1`-owned paths named, the gate-6 `STRUCTURAL` statement with its falsifier,
   the `§7.1` `DOES NOT TRIGGER` decision with its evidence, the typed `§5.5.x` register, and the two defaults in
   the `§7a.1` `E5-B-3` form. **This record's filing checklist (`§4.10`) is discharged item by item there.**
2. **Commit both files at this gate boundary, scoped to this unit** (`RCA-8(a)`/`(f)`), so the gate leaves a
   commit rather than a session — **and commit BEFORE any later pass edits either file** (`RCA-8(b)`/`(c)`).
3. **Repair the `E8` row's `Spec`, chain and `Legs` cells** (`P-T-2`), by **annotating beside** the as-written
   cells rather than rewriting them.
4. **Put `docs/specs/theme.md` to the SPEC GATE** (`AGENTS.md` item 10a) — the architect's ONE approval, and the
   place where `A-1`/`A-2` are ratified or reversed.
5. **ONLY after the spec gate: the TestWriter red** (`AGENTS.md` items 9 + 11) — **never before**, because the
   register must exist first and this record is not a red set. **Then `AGENTS.md` item 10a's autonomy clause
   carries the unit through gates 3–10 without further permission.**
6. **Do NOT start `F1` (`U-THEME-CONTROL`) here.** It is **blocked on this unit**, it is a **UI unit owing the
   MANDATORY live battery of gate 6**, and **its spec (`docs/specs/theme-control.md`) remains `OWED — not filed`.**

**THE ONE THING THAT REACHES THE ARCHITECT, AND WHEN: `A-1` and `A-2`, NOW BUT AS RECORDED DEFAULTS AND NOT AS A
STOP.** The filing proceeds; the spec gate is the natural place to ratify or reverse them, and **either ordering
needs no second round-trip** — a reversal of `A-1` owes a register re-grain and a reversal of `A-2` owes none.

---

## ⟶ FILING-PASS ANNOTATION (`2026-09-27`, the `E8` / `U-THEME` GATE-1 FILING PASS)

**WHAT THIS PASS WAS, in three lines: it wrote TWO NEW FILES — this record and `docs/specs/theme.md` — and edited
nothing else.** **BOTH THE STEP-1/2 FILING (`A-4`'s filing half) AND THE CONTRACT FILING HAPPENED HERE, IN ONE PASS,
BECAUSE THE REVIEWS' REPORTS WERE NEVER FILED AND THE CONTRACT THEY GATE WAS DUE** — which is **the honest reason
this record and the contract share one filing rather than two gate boundaries.** **NOTHING ABOVE IS REWRITTEN BY
THIS ANNOTATION, and no condition, verdict, finding, default or derivation is amended by it.**

**WHAT IS `OWED` AT THIS PASS, EACH WITH ITS OWNER: (a)** the `docs/FORKER.md` carry for this unit's two exported
signatures and three exported types (`C-7`; owner: whatever pass next touches that file — **it gates no unit**);
**(b)** the `E8` row's three stale cells (`P-T-2`; the supervisor's reconciliation pass); **(c)** the statement, on
`F1`'s row, that `src/renderer/index.html` is the repo's existing appearance authority (`P-T-3`); **(d)** the
per-gate commit (`P-T-4`; the supervisor); and **(e)** `A-4`'s **PROCESS** half — **the class of unfiled gate-1
reports is now three instances deep** (`E4`'s `P-1`, the `E5`-era filing, and now `E8`), and **no tracker row
counts them**. **WHAT IS NOT OWED AND MUST NOT BE MANUFACTURED: no architect answer for `Q2`/`Q3`** (both are
pinned), **no re-opening of `A-d6` or of the pre-`A-d6` `TOO-THIN-WRONGLY-TARGETED` decline** (the decline is
`SUPERSEDED` provenance and the architect **overruled** it), **no `U-THEME-MIN`** (the name is retired), and **no
`[U]`/`[D]` row** (both refusals are structural).

---

## ⟶ SPEC-GATE RULING ANNOTATION (`2026-09-27`, the `E8` / `U-THEME` SPEC GATE)

**THE GATE'S OUTCOME, IN ONE LINE: `docs/specs/theme.md` IS APPROVED AS FILED — APPROVED AT THE SPEC GATE
(`AGENTS.md` item 10a, the ONE approval the chain waits for) — WITH ONE CHANGE: the discriminator field
`ThemeResolution.basis` is REPHRASED AS `ThemeResolution.source`.** **NOTHING ABOVE IN THIS RECORD IS REWRITTEN BY
THIS ANNOTATION: no step verdict, no condition (`C-*`, `G-*`), no finding, no question and no derivation is amended
by it — the two items the gate adjudicated are ANNOTATED BESIDE, and the as-filed wording of both is kept visible
here and in the spec.**

**STEP 4's VERDICT IS DISCHARGED, AND THE GATE IS CLOSED. `§5`'s `DELEGABLE-WITH-CONDITIONS FOR THE SPEC GATE` with
`G-1`…`G-6`, and `§8` item 4's *"put `docs/specs/theme.md` to the SPEC GATE — the place where `A-1`/`A-2` are
ratified or reversed"*, are answered HERE: the filing was accepted as filed, and the TWO RECORDED WORKING DEFAULTS
`§6` carries were RATIFIED OR CLOSED as follows.**

**1. `A-1` (the pass-through resolved domain — `Q1`'s residue) STANDS AS FILED.** **The recorded working default
`§6` states — the caller's own opaque token PASSED THROUGH, with `env.prefersDark` REPORTED rather than being the
value's source — is APPROVED at the spec gate.** **IT REMAINS ARCHITECT-REVERSIBLE** (`E5-B-3`'s form is not spent by
an approval): a later reversal still moves the sites `theme.md` `§7a.1` item 1 names and **still owes a register
RE-GRAIN, which this ruling does NOT trigger** (`§6`'s own clause, unmoved).

**2. `A-2` (the NAME of the observable degradation — restated by step 4 as a NAMING question, finding `A-5`) IS
CLOSED BY THE RULING, AND IT IS CLOSED AS A RENAME RATHER THAN A SEMANTICS CHANGE.** **The member's OBSERVABILITY
and its CLOSED two-body domain `'env'` | `'degraded-env'` were approved AS FILED; the ruling renames the SPELLING
`basis` → `source` and moves nothing else.** **THE REASON, stated as the ruling's own: the member is the
DISCRIMINATOR that reports whether the environment reading resolved or was absorbed, so respelling it changes no
reading, no degradation rule and no body's meaning** — and **no body's wording depended on the old field name, so the
members stay `'env'` | `'degraded-env'` with the SAME cardinality (`2`).** **WHAT THE RENAME MOVES, EXHAUSTIVELY, and
what it does NOT: expectations STRINGS only — in `theme.md` `§2.1`'s `ThemeResolution` block, `§2.2`(D)'s semantics
table, `§2.3` item 2's column, `§3.1 M-1`/`M-2`/`M-3`, `§3.2 F-1`, `§3.3 I-3`, `§3.4 R-1`/`R-8`, `§4.4 S-TH-11`,
`§5.3` item 3, `§5.5.1`'s register rows and domains, `§5.5.2` item 8, `§7` item 10, `§7a.1` item 2, `§3a`'s `A-2`
seed and `§8`'s index. **NO register TERM moves (the declared total stays `102` = its twelve terms) · NO ROW ID
moves · NO STRATEGY ID moves · NO SEED moves (`20260927`) · NO CAP moves (`≤100`/row · `≤400` total ·
stop-after-5) · NO shape, pool member, domain, `(bounded)` marking, section number, export name, arity or record
member beyond that one spelling moves · and NO REGISTER RE-GRAIN IS OWED.** **`§6`'s own sentence stands as
written — *"a reversal of `A-1` owes a register re-grain while a reversal of `A-2` owes none"* — and this ruling is
the case it named.**

**WHERE THE RULING IS RECORDED, so no reader has to reconstruct it: (a) `docs/specs/theme.md`'s `§0A` note 6** (the
dated ruling note, carrying the AS-FILED declaration as a verbatim quotation and the site census) **; (b) `§7a.1`
item 2** (annotated CLOSED, its as-filed question and answer kept visible) **; (c) `§7` item 10** and the `§7a`
intro/arithmetic (**annotated: `1` item standing · `1` closed · `1` not surviving) **; (d) `§8`'s index row for the
ruling itself ; and (e) `docs/next-steps.md`'s row `E8`, `Spec` cell** (**the spec-gate APPROVAL and the post-ruling
`source` spelling now stand BESIDE the as-filed wording, with NO ledger count changed and `E8` still an OPEN unit**).

**THE RECORD'S OWN PROVENANCE CLAUSES ARE UNTOUCHED: `A-4`** (this record is the filing pass's compression of
unfiled step-1/step-2 reports) **, `P-T-1`** (no leg ran, no shell held) **, `P-T-3`** (`src/renderer/index.html` is
the repo's EXISTING appearance authority) **and the FILING-PASS ANNOTATION above all stand as filed.** **`P-T-2`'s
`Spec`-cell half is DISCHARGED by the ledger amendment this ruling's recording pass landed**; **its chain and `Legs`
cell halves remain owed, and `docs/FORKER.md`'s carry (`C-7`) and the per-gate commit remain owed as `§8` item 3 and
the filing-pass annotation say.**

**WHAT THE RULING DOES NOT DO, stated so no later pass over-reads it: it advances NO gate after the spec gate.** **No
red set has been authored or RUN, no module exists, no register row has been executed, and `E8` remains an OPEN
unit** — the chain continues at the TestWriter red under `AGENTS.md` items 9/10a/11, and **`G-5`'s register
obligation (typed rows, executed, totals printed WITH their terms) is not discharged by any clause of this
annotation.**

**⟶ CLOSE-OUT ANNOTATION (`2026-09-27`, the supervisor's `U-THEME` gate-10 doc-writer pass — APPENDED at the
record's end; every clause ABOVE is KEPT VISIBLE AND UNREWRITTEN, and this annotation is a STATUS record, not a
re-opening of any condition, verdict or default).** **THE UNIT IS `DONE` — the ledger's SEVENTEENTH `DONE` row — and
its authoritative record is `docs/next-steps.md`'s `## DONE — U-THEME` section.** **WHAT CHANGED SINCE THE SPEC GATE,
in this record's own terms: the paragraph immediately above is TRUE AS OF THE SPEC GATE and is now SPENT — a red set
was authored and RUN (`tests/theme.test.ts`, `58` rows, `40` failed / `18` passed against the absent module at
`178f1ab`, the register stopping at `P-TH-IM-1` after five consecutive failures with eleven un-run rows reported as
FAILURES), the module `src/shared/theme.ts` (`73` lines) exists, and the register's EXECUTED layer ran `103/103` with
`broken 0` and `registerStoppedAt: null`** (the supervisor's measurement at `36b8c3d`). **`G-5`'s register obligation
IS NOW DISCHARGED** as that clause requires: typed rows, executed, with the totals printed WITH their per-row terms
(`103` = `12+12+10+8+6+3+12+12+11+8+6+3`; the distinct sibling `100`), and **the two figures it also carried as
obligations are CLOSED OR DISPOSITIONED: `G-2` (the five-name surface and the two pinned shapes) is LANDED, and
`G-6` (gate 6 `STRUCTURAL` plus the `§7.1` decision recorded with its evidence) is LANDED — `[U]` not offered,
`[D]` not claimed, gate 6 `STRUCTURAL`, NEVER WAIVED.** **`G-1` (the diff scope) held: NO `src/**` edit, NO config
change and NO new dependency; the six-artifact build census is UNCHANGED.** **`G-3`/`G-4` held as filed (the env
closed at one member with the strict `=== true` read; the six prohibitions carried; the spec readable with the demo
deleted).** **THE TWO RECORDED WORKING DEFAULTS ARE DISPOSED, NOT RE-OPENED: `A-1` STANDS AS FILED (approved at the
spec gate, still architect-reversible, its reversal still owing the four sites and a re-grain) and `A-2` IS CLOSED BY
THE RULING AS THE RENAME `basis` → `source` — and the table at `§6` above keeps its as-filed `basis` wording, which a
reader must read as the AS-FILED spelling of the member now named `source` (quotations are not respelled).**
**`A-4`'s FILING half stays DISCHARGED and its PROCESS half stays `OPEN` (the reviewer returns are still not
recoverable — this record is the compression, not four filed reviews).** **`P-T-2`'s stale ledger cells ARE REPAIRED
by the close-out (the `E8` row now reads `E8 — MOVED TO DONE (2026-09-27)` with its spec cell carrying the SPEC-GATE
APPROVAL and the live register figures beside the as-filed ones, and its chain and `Legs` cells annotated)**;
**`P-T-3` IS NOW DISCHARGED TOO — the second appearance authority is named in the ledger's `F1` row's own terms as
well as here**; and **`C-7`'s `docs/FORKER.md` carry is recorded as `OWED` with its owner, in that file's own
words — a `DONE` unit does NOT imply the fork-facing contract was delivered.** **HONEST EXTENT, as this record's
`P-T-1` demands of any pass: THE CLOSE-OUT PASS THAT LANDED THIS ANNOTATION HELD NO SHELL — every figure in it is the
supervisor's own measurement or a recorded file read, and NONE of it is a leg run of that pass.** **THE FULL RECORD IS
`archive/reviews/2026-09-27-U-THEME-doc-review.md`** (gate 8, folded with gate 7 into the same close-out pass and
recorded as ONE pass, not two).


