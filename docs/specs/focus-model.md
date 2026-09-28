# Spec — `U-FOCUS-MODEL`: the pure ordered-entry transition reducer over OPAQUE ids/targets with THREE OPTIONAL seams (`refuse` · `onChange` · `persist`) and **NO store, NO DOM, NO vocabulary**

**Unit `U-FOCUS-MODEL` · wave `F` · ledger row `F2` · upstream `SCH-13` in its `A-d5` shape
(`docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`; `S-d12`) · derives
`docs/specs/focus-model-review.md`'s step-1 `VALID-WITH-CONDITIONS` (thirteen conditions `C-1`…`C-13`), its step-2
`FLAWED` (twelve findings, three architect questions `FQ1`/`FQ2`/`FQ3`), its step-3 `DELEGABLE-WITH-CONDITIONS`
derivation, and its step-4 `NOT-DELEGABLE` verdict with conditions `G-1`…`G-7`; and it derives the STEP-0 adoption
dossier `docs/specs/focus-model-adoption-dossier.md` (`7` identifier rows, `2` cited default rows, `1` routed open
row) · filed 2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/focus-model-review.md` is the gate-1 record** (the four steps
filed as ONE record — steps 1 and 2 were **never filed as artifacts of their own**, and **the record was written by a
FILING PASS rather than by the reviewers**, which the record states at its own header and repeats as `FM-1`, its
`P-1`/`OV-1`/`TC-1` lineage now five instances deep). **This spec DERIVES the record's conditions, its step-3
derivation, its step-4 verdict and the dossier's rows. It does NOT re-litigate, weaken or re-open any of them**, and
**a clause of this file that contradicts the record is a finding against this file, not a re-opening of the record**
(the rule `docs/specs/theme.md` states for its own record, and which `docs/specs/gutter.md`, `menulib.md`,
`container.md`, `relocate.md`, `listhost.md` and `overlay.md` restate).

**STATUS: GATE 2 — THE SPEC GATE, FILED AWAITING THE ARCHITECT'S APPROVAL. NOTHING ELSE IS ADVANCED.** This filing
lands **one NEW file** (`docs/specs/focus-model.md`) **and nothing else** — **no tracker row, no decision row, no
sibling spec and no gate record is touched** (`RCA-8(d)`: annotate beside, never rewrite). **The module does not
exist. The test file does not exist. No red set has been authored or run. No leg, no trio, no `tsc` invocation, no
suite and no register row has been EXECUTED. No gate record after gate 1 exists for this unit.** The unit stays an
open `## OPEN` row (`F2`) with its ledger status the supervisor's, and **it is NOT delegable until a TestWriter has
RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `CURRENT STATE` — the one status block, before
`§0` · `§0`/`§0A` — the rulings derived and this filing's own dated notes (the derivation's provenance and the
seam-name imprecision) · the **Layer declaration** — the four labels and the honesty anchors · `§1` — the scope with
its NOT-THIS-UNIT items · `§2.1` the NINE-name surface in two halves · `§2.2` the caller-supplied set, the `H-r8`
six-row prohibition table, **the twelve-token collision reconciliation in the demanded form** and the semantics table
with no `undefined-until-answered` row · `§2.3` the value/opacity rules · `§2.4` **the three-seam table with its
per-seam degradation rows** · `§2.5` the composition boundary, the DERIVED DENIED set and the entry-point answer
**`NO`** · `§3.1`–`§3.5` every state, fail-state, invariant and static row · `§4` the red, its order, its stop
conditions and the delegation gate · `§5.1`–`§5.3` the diff scope, the legs and the DONE row's shape ·
**`§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` the typed register** · `§6`–`§8` falsification, honest limits, the two working
defaults and the citation index · `§3a`/`§3b` at the file end.

**Cite SECTIONS and ROW IDS, never line counts, of any file** (`docs/decisions.md`'s rows are cited **by NAME** —
that ledger is appended-to and its line anchors drift; `docs/next-steps.md` **by ROW ID**).

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note —
the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY — *AS FILED*.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one NEW file — `docs/specs/focus-model.md` (this one) — and edited NOTHING**: no tracker row, no decision
   row, no sibling spec, no gate record. It ran **no suite, no leg, no trio, no `tsc`, no Electron boot and no
   register row**, and made **no commit and no writing git command of any kind**. **The module
   (`src/shared/focus-model.ts`), the test file (`tests/focus-model.test.ts`), the red set, the legs, the register's
   EXECUTED layer, the greens set, the gate records after gate 1 and the DONE row ALL DO NOT EXIST YET** — and the
   module's and the test file's **non-existence at filing is carried as the gate-1 record's step-1 fact
   (`docs/specs/focus-model-review.md` `§2.2` row 1: no module in `src/shared/**` models focus, entry, order or
   transition today), NOT re-measured by this pass.** The unit is **`OWED` at every gate after this one**, and **it is
   NOT delegable until a TestWriter has RUN and REPORTED the red set** (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW `src/shared/focus-model.ts`** exporting
   **FOUR value exports and FIVE type declarations = NINE exported names** (`§2.1`) — **the value half exactly
   `focusTransition` · `focusOrder` · `focusIndex` · `persist`; the type half exactly `FocusId` · `FocusEntry` ·
   `FocusVerb` · `FocusRefusalCode` · `FocusState`** — with **NO IMPORT STATEMENT OF ANY KIND — not even type-only**,
   **NO factory, NO session, NO options object, NO module-level mutable state, NO element parameter, NO listener, NO
   store handle and NO write of any kind** (`§2.5`), **and THE MODULE IS A PURE REDUCER: the CALLER owns
   `{entries, activeId}` and the module MUTATES NO ARGUMENT** (`§0` ruling 1). **It carries THREE OPTIONAL SEAMS
   (`refuse` · `onChange` · `persist`) — not an empty seam set, and not a store** (`§2.4`).
3. **THE REGISTER (`§5.5.1`): `13` typed ROWS carrying `13` TERMS, in THREE families** —
   **⟶ CORRECTED BESIDE THIS AS-FILED SENTENCE (`2026-09-27`, supervisor-ADJUDICATED after gate 4's `F7`; `§0A` note 10 item 5): THE TABLE LANDS `13` ROWS AND `12` TERMS — `12` ROW CELLS CARRY A TERM, the THIRTEEN-TERM DECLARED LIST at `§5.5.3` is the object whose sum is `98`, and the NO-TERM ANNOTATION ROW IS NAMED: `P-FM-TP-2`'s TRAILING REACHABILITY ANNOTATION ROW (`S-FM-REACH-1`), which is an ASSERTION row and carries NO attempt term of its own** (`§5.5.1`'s table annotation; `§5.5.3`).
   **`P-FM-IM-1`…`P-FM-IM-3` · `P-FM-SM-1`/`P-FM-SM-2` · `P-FM-TP-1`/`P-FM-TP-2` · `P-FM-SEAM-1`…`P-FM-SEAM-5` —
   **`89` declared attempts, printed with their THIRTEEN terms and a term-by-term addition at `§5.5.3`** — **⟶ AND THE AS-FILED TOTAL `89` IS CORRECTED TO THE DECLARED `98` HERE, WITH `89` KEPT VISIBLE (same date, same note item 5): the thirteen terms `10 + 11 + 10 + 6 + 3 + 10 + 10 + 6 + 8 + 9 + 5 + 5 + 5` sum to `98`, which is the authority every cap comparison uses** (`§5.5.3`) —
   **NO SEED AND NO GENERATOR: the register is EXHAUSTIVE ENUMERATION throughout** (every domain is finite and
   bounded, so no draw is needed — `§5.5.1`'s execution discipline item 2, `§5.5.3`), caps `≤100`/row · `≤400` total ·
   stop-after-5-consecutive-failures, the **four DOMAINS declared by name**, and **SEVEN `(bounded)` markings:
   `P-FM-IM-1` · `P-FM-IM-2` · `P-FM-IM-3` · `P-FM-SM-1` · `P-FM-TP-1` · `P-FM-TP-2` · `P-FM-SEAM-2`**
   (`7 + 6 = 13`). **THE ROW COUNT IS AN EXTENT, NOT A BUDGET** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-ISTHE-TRUTH-MECHANISM`);
   the `≤8` threshold is a component-breakdown **SIGNAL** and no property was dropped, merged or left unenumerated to
   fit it.
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus `npm run typecheck` `[H]`
   (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]` (**this unit adds a module imported by
   nobody, so the built output set must be UNCHANGED**), `npm run typecheck:tests` `[H]` (the additive fourth leg,
   `AGENTS.md` item 4), and a **standalone strict `tsc --noEmit` over `tests/focus-model.test.ts`** as the named leg
   that pins the type half of the export census (`§5.2`). **NO `[U]` ROW IS OFFERED** (the three-part refusal, `§5.2`)
   and **NO `[D]` ROW IS CLAIMED** (`§5.2`).
5. **THE GATE RECORDS AFTER THIS ONE: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no
   blind-greens record (`docs/specs/focus-model-greens.md` is named in the diff scope and is `OWED`), no per-unit
   documentation review, no DONE row (`§5.3` fixes its twelve-item shape), and **gate 6 is `STRUCTURAL`, not waived**
   (`§5.2`).
6. **THE TWO OPEN ITEMS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1` — **TWO** items, and **both are
   RECORDED WORKING DEFAULTS in the `E5-B-3` form, neither of them a blocker**): item **1** = **the entry's DATA
   SHAPE** (`FQ1`, the closed record — dossier `D-1`); item **2** = **PERSISTENCE OWNERSHIP as a RETURNED VALUE**
   (`FQ2`, with `{entries, activeId}` owned by the CALLER — dossier `D-2`). **Each has a working default implemented
   in `§2` and a named architect-reversible alternative, and each carries a CONFIRM-OR-REVERSE slot for the spec gate.**
   **`FQ3` IS NOT OPEN HERE AND IS NOT THIS UNIT'S: it is ROUTED to the consumer unit's record** (`§5.4`/`§8`; the
   dossier's `§5`).
7. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone (globbed
   `docs/skills/*` this pass), so there is **no test-use-case coverage matrix and no demo-page index to update**, and
   **this unit renders no page, authors no element and mounts nothing** (`§3.5 X-5`'s probe; `§7` item 6). **The
   filing therefore does NOT update `docs/skills/designing-pages.md`, which does not exist** (`§5.1` item 13).
8. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One new file written; zero files edited; no test run;
   no leg run; no trio run; no `tsc` invocation; no Electron boot; no commit.** The new file is **untracked and must
   be committed by the supervisor** (`RCA-8`'s per-gate rule). **NO MEASUREMENT OF A LEG WAS TAKEN BY THIS PASS, AND
   NONE MAY BE QUOTED FROM IT** (`§0A` note 5; `RCA-12`).
9. **THE ONE FACT A FRESH READER WOULD GET WRONG, NAMED HERE.** **THIS UNIT IS NOT A SECOND ORDER AUTHORITY, ALTHOUGH
   `order` IS ALREADY PROJECTED BY TWO LANDED HOSTS.** **The reason is not an exemption from a ban but a
   DERIVATION:** **order IS the caller's array** (`§2.3` item 3, `§2.2`(C)'s row 3) — this module **sorts nothing**,
   **stores no order of its own**, holds **no comparator invocation site** and therefore **cannot contradict** what
   `createOwnedListHost` or `createSlotHost` project. **A later pass reading this module as "a third order authority",
   or adding a `sort`, a comparator call, a rank field or a memo of the caller's sequence to it, is reversing
   `§0` ruling 6 and MUST OPEN A GATE.**
10. **THE THREE SEAMS ARE NOT A STORE, STATED BEFORE ANY SEAM ROW.** **`refuse`, `onChange` and `persist` are
    CALLBACKS THE CALLER SUPPLIES, and this module CALLS THEM** — **it does not hold them**: **no seam reference is
    retained after a call, no seam's return value is stored, and `persist`'s returned value goes to ITS OWN RETURN
    VALUE and never into this module's state** (`§2.4`, `§2.5` item 2). **A pass that adds a retained seam, a seam
    registry or a seam-driven cache is adding the store the charter forbids** (`§1` item 5). **THE `persist` NAME IS
    RECORDED AS IMPRECISE** (`§0A` note 3).
11. **⟶ CLOSE-OUT ITEM (`2026-09-27`, appended beside the ten items above; `RCA-8(d)` — no item above is re-written).** **THE UNIT IS `DONE` — GATE 10 IS THE SUPERVISOR'S DONE ROW — AND EVERY FIGURE IN THIS BLOCK IS THE SUPERVISOR'S OWN MEASUREMENT AT `be5fb8c`, CARRIED WITH THAT OWNERSHIP (`RCA-12`): the node suite `75` files / `2022` passed / `2` skipped / `0` failed; `npm run typecheck` `0`; `npm run typecheck:tests` `0`; `npm run build` `0` with the six-output census UNCHANGED; `npm run divergence` `0` (`R13 RESULT: 9 checks, 0 failures`); `npm run ui` `0` (`UI RESULT: 0 failures, 11/11 assertions`); the unit's own red set `78/78`; the register EXECUTING `93` attempts across `12` of `12` rows with `broken 0` on every row and `registerStoppedAt: null`.** **THE LEDGER ROW `F2` HAS MOVED — `F2 — MOVED TO DONE (2026-09-27)` — and the ledger reads `20 DONE / 1 open` UNITS = `21` (`20 + 1 = 21`), the open set being `F3` (`U-FOCUS-TOOL`) alone, whose SPEC GATE now also carries `FQ3`'s routing.** **THE AUTHORITATIVE RECORD IS `docs/next-steps.md`'s `## DONE — U-FOCUS-MODEL` SECTION; the gate-7/8 record is `archive/reviews/2026-09-27-U-FOCUS-MODEL-doc-review.md`.** **WHAT STAYS OWED IN THIS FILE'S OWN WORDS: the FIVE-POINT GAP at `§5.5.3` (`93` executed against the declared `98`; the two withdrawn subtotal decompositions; the `P-FM-TP-2` shape-versus-term reading; the as-filed `89` at its visible sites; the two FURTHER as-filed `89` sites this pass discloses — `§5.5.1`'s "What this section is" sentence and `§5.5.2` item 2's first sentence, each now carrying its own correction) — and the dossier's WITHDRAWN SIXTH REFUSAL CODE, which is a scope decision of this unit's and stays reversible.** **A DATED ANNOTATION BESIDE IS STILL THE ONLY LANDABLE FORM FOR ANY OF THEM; NO TERM, ROW ID, STRATEGY ID, SEED OR CAP MOVES.**

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** Where a ruling is
**quoted**, the quotation is marked; where a step is this filing's own **derivation**, it says so in place
(`§0A` note 1 states the provenance rule in full).

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **THE STEP-3 DECISION OF RECORD ON THE CHARTER'S OWN FORK (`C-1`/`C-2`): THE MODULE IS A PURE REDUCER RETURNING A RESULT VALUE, NOT A STATEFUL HANDLE** — *"a handle calling the seams while holding `{entries, activeId}` IS the store the charter forbids"* (`docs/specs/focus-model-review.md` `§4` item 1). **THE CALLER OWNS `{entries, activeId}`; the module owns nothing and MUTATES NO ARGUMENT.** | `CURRENT STATE` items 2/10, `§1` item 1, `§2.1`, `§2.5` item 1, `§3.3 I-1`/`I-2` |
| **2** | **THE `A-d5` ADMISSION** (`docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`; `S-d12`; `SCH-13`): `provident.focus` is adopted as **TWO units**, and **THIS UNIT IS THE MODEL HALF** — *"a pure ordered-entry transition module over opaque ids/targets with `refuse`/`onChange`/`persist` injected; **no vocabulary** (`'tab'`/`'pane'`/zone/region may not appear as a symbol, union member or default), **no store**, **no DOM**"*. **THE ADOPTION IS AN ARCHITECT DISPOSITION AND IS NOT RE-OPENED BY THIS FILE.** | `§1` items 1/2, `§2.2`(A)/(C), `§5.1` |
| **3** | **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE; `H-r14`): prohibition 5 is *"an adoption bound on units"* — **a (C)-admissible unit's own contract may not itself require a new MCP surface** — and it is a **NON-GOAL ROW, never a licence**. | `§2.2` `P-FM-5`, `§3.3 I-9` |
| **4** | **`H-r8`'s SIX PROHIBITIONS** (`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `H-r8` row, which names `focus-model` among the specs that MUST carry the table): *"no consumer vocabulary as symbols/enumerated constants; no app UI content authored; no policy defaults; no UI-config store or persistence; no new MCP surface; no criterion unverifiable on a layer this repo owns"* — carried as a **`§0 Contract-prohibitions`** block, **one row each, and each row must NAME the test that pins it.** | `§2.2`(A) (the six-row table) |
| **5** | **`UI-RENDERED-WITH-PROVIDENT`** (`docs/decisions.md`, ACTIVE; the project-wide constraint): **all non-shell UI must be provident-rendered data driven through the producing graph**, and **an element authored outside the framework is a review finding.** **THIS UNIT AUTHORS NO ELEMENT, RENDERS NOTHING AND MOUNTS NOTHING** — so the constraint has **no element of this unit's to apply to** (`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test: no text, no control, no affordance, no class taxonomy, no slot content, no styling). | `§1` item 4, `§2.2` `P-FM-2`, `§5.1` |
| **6** | **THE SEMANTICS OF STEP 3'S ITEM 6, derived here as clause rows** (`docs/specs/focus-model-review.md` `§4` item 6): **the entry is a CLOSED record · ORDER = THE CALLER'S ARRAY and the module SORTS NOTHING, so the unit is NOT a second order authority · the verbs are the CLOSED FIVE · an UNKNOWN verb is TOTAL (no throw, the state returned by identity, one refusal) · THE ENDS REFUSE (the clamp reading is the NAMED architect-reversible alternative) · A DUPLICATE IS REFUSED on the FIRST-OCCURRENCE rule, with the refused occurrence NOT RESERVING the id.** | `§2.3`, `§2.2`(C) row 3, `§3.1`/`§3.2`, `§7a.1` item 3 |
| **7** | **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE): *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*, and gate 1 must answer explicitly **whether the allowed file set contains a path from the application's entry point to this mechanism**. | `§2.5` item 5, `§5.1` (the DERIVED DENIED set, named first) |
| **8** | **THE SEAM DEGRADATION RULE, PER SEAM** (`docs/specs/focus-model-review.md` `§2.1` `C-5`; the family's landed practice): *"absent / non-callable / throwing ⇒ **declared default + a row that can FAIL**"* — **and a CALLER-CODE THROW IS NEVER REPORTED AS A CONTRACT REFUSAL** (`§4` item 4; the sibling landed rule is `docs/specs/slothost.md` `§3.2 F-10`'s four named defaults and `docs/specs/listhost.md` `§3.2`'s *"no refusal code is invented"*). | `§2.4` (the three-seam table), `§2.2`(C) row 5, `§3.2 F-8`, `P-FM-SEAM-3` |
| **9** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-ISTHE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE): a code-bearing unit's register is **MANDATORY before its red set**; **the zero-row exemption is UNAVAILABLE to a code-bearing unit**; the row count is an **OUTCOME, not a budget**. | `§5.5`, `§5.5.1`, `§5.5.2` item 1 |
| **10** | **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE): assertions, observations and readings are printed **BESIDE** a term and **NEVER** counted in it; and *"a total that is not the sum of its own terms, or a total quoted without its terms, is a review finding."* | `§5.5.1` (every cell), `§5.5.2` item 5, `§5.5.3` |
| **11** | **THE STEP-4 VERDICT AND ITS SEVEN CONDITIONS `G-1`…`G-7`** (`docs/specs/focus-model-review.md` `§4` items 12/13). **`G-1`…`G-4` ARE DISCHARGED AS RECORD-AND-DOSSIER FACTS** (`G-1` step 3's bytes appended; `G-2` the dossier exists; `G-3` the two defaults appear as dossier rows with citations; `G-4` `FQ3` routed to `docs/next-steps.md`'s `F3` row); **`G-5`, `G-6` and `G-7` bind THIS filing, and `G-3` BINDS IT AS A CONTRACT FACT**: | |
|  | **`G-3`** — **the two derived defaults appear as contract rows WITH A CITATION, NEVER `undefined-until-answered`** — the silent open row would force `BLOCKED-ON-SEMANTICS`. | `§2.2`(D) (no `undefined-until-answered` row), `§7a.1` items 1/2 |
|  | **`G-5`** — **the register is item-11-shaped**: typed rows only, a strategy id per row, the caps, totals printed with their terms, an un-run row a FAILURE, no new dependency. | `§5.5`–`§5.5.3` |
|  | **`G-6`** — **the word `waived` is ABSENT and the three-part refusal INTACT.** | `§5.2` (the three-part refusal, with `waived` forbidden) |
|  | **`G-7`** — **the consumer unit's ledger row is repaired AT ITS OWN SITE so ONE CELL NAMES ONE OBJECT.** | **NOT THIS UNIT'S ACT**: it is discharged at `docs/next-steps.md`'s `F3` row by the supervisor's doc-writer pass (quoted at `§5.4`), and **this contract adds no clause for it.** |
| **12** | **`DOC-REVIEW-GATE`** / **`BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE): a per-unit **documentation review** is MANDATORY after the greens (`AGENTS.md` item 10d / RCA-6) and **every `*-greens.md` is blind-verified by a fresh writer**. | `§5.1` rows 4/5, `§5.3` item 8 |
| **13** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE), **cited for the FORM**: a caller seam is a **PUBLIC, EXPORTED, DOCUMENTED CONTRACT a fork IMPLEMENTS**, and *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is normative contract text."* **Unlike the sibling mechanisms, THIS unit HAS a seam set — three optional seams — and every one of the three carries its degradation here.** | `§2.1` item 4, `§2.4`, `§8` |
| **14** | **`docs/specs/zones.md` `§4.4 S-6`'s sentence**, **lifted VERBATIM**: *"the row may not be moved to the `ui` leg silently."* | `§5.2` (the third part of the refusal), `§4.4 S-FM-10` |
| **15** | **The `focus-walk` BAN and `H-r5`'s forbidden-member list** (`docs/specs/focus-model-review.md` `§2.4`'s `focus` row; `docs/decisions.md`'s `SHIM-COMPLETION-CARVE-OUT` / `H-r7`): *"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam."* **THE BAN IS ABSOLUTE AND THIS UNIT DOES NOT NEED AN EXEMPTION FROM IT** — it reads no DOM, holds no element and never touches `activeElement` or any focusable set (`§2.2`(C) row 1). | `§2.2`(C) row 1, `§2.2` `P-FM-6`, `§3.4 R-9`, `§5.2` |

### 0A. The dated ruling notes — the clauses the record leaves to this filing, DECIDED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about the module's path, the
four value names, the five type names, the closed five-verb set, the closed refusal-code count and the
entry/opacity/seam decisions of record; it is **silent or coarse** about several clauses a TestWriter must have before
it can author a **falsifiable** row. **This filing DECIDES each of those clauses here**, each with its reason and its
landing site. **No note below weakens a condition, a ruling or a register row**; the places where a clause is **this
filing's own choice rather than a derivation** are **flagged as such and reported at `§7a`/`§7a.1`**.

**Note 1 — THE DERIVATION'S PROVENANCE, AND WHAT THIS FILE IS AND IS NOT EVIDENCE OF.** **THREE CLASSES OF
STATEMENT APPEAR IN THIS FILE, AND THEY MUST NOT BE READ FOR ONE ANOTHER:** **(a) FILED FACT** — a figure or an
absence carried from an existing record, attributed at its own site: the gate-1 record's step-1 measured facts
(`docs/specs/focus-model-review.md` `§2.2`), the dossier's seven identifier rows and two default rows
(`docs/specs/focus-model-adoption-dossier.md` `§1`/`§3`), and the ledger's `F2`/`F3` cells. **THIS PASS RE-MEASURED
NONE OF THEM**: it ran no source scan and no leg; it READ the two input records, `docs/specs/overlay.md`,
`docs/specs/theme.md`, `docs/specs/listhost.md`, `docs/specs/slothost.md`, `docs/decisions.md`'s focus row and
`docs/next-steps.md`'s `F2`/`F3` rows, and it held **no shell**. **(b) QUOTED RULING** — a clause of step 3's return,
of `A-d5`, of `H-r8` or of a landed sibling, **marked as a quotation in place and never re-derived**. **(c) THIS
FILING'S DERIVATION** — every clause that turns a ruling into a row: the entry's duplicate rule as a
**target-activation + id-refusal** pair (`§2.3` item 5), the two verb-end codes, the five refusal-code bodies, the
seven result members, the re-seating rule, `focusOrder`'s returned sequence, `focusIndex`'s `-1` sentinel and the
whole register. **STEP 3 DERIVED A SHAPE AND A SET OF DECISIONS OF RECORD; IT DID NOT DERIVE ROWS.** **NO ROW IN THIS
FILE IS A REVIEWER'S RETURN QUOTED AS A ROW, AND NO REVIEWER'S RECOMMENDATION IS PRESENTED AS AN ARCHITECT'S RULING**
(`§7` item 10).

**Note 2 — THE MODULE PATH IS `src/shared/focus-model.ts`, AND THE TEST FILE IS `tests/focus-model.test.ts`.** The
record's step-3 derivation fixes both (`docs/specs/focus-model-review.md` `§4` item 1: *"Path
`src/shared/focus-model.ts`, test `tests/focus-model.test.ts`, import census `0`"*), and the sibling naming
convention agrees. The test path is named because **`§5.1`'s diff scope must be a real, checkable allow-list** — and
**a register row's own execution in that file must not read as a DENY-set violation** (`§5.1` row 2).

**Note 3 — THE `persist` SEAM'S NAME IS IMPRECISE, AND THE IMPRECISION IS RECORDED RATHER THAN PRESERVED SILENTLY
(`C-5`; `§3.1` finding 3).** **THE CLAUSE:** **`persist` EXISTS AND IS CALLED, and it RETURNS A VALUE THAT THE CALLER
MAY STORE. THIS MODULE PERFORMS NO STORAGE: it calls storage nowhere, imports no storage module, reads no file, no
`localStorage`, no `sessionStorage`, no `indexedDB`, holds no store and writes nothing.** **THE NAME PROMISES WHAT THE
CHARTER'S OWN `no store` CLAUSE FORBIDS** (`A-d5`; `docs/specs/focus-model-review.md` `§3.1` finding 3: *"a name that
promises a forbidden act is a contract hazard, not a style question"*). **THEREFORE, IN THIS CONTRACT'S OWN WORDS,
AND FOR EVERY READER OF THE MODULE'S BYTES:**

> **`persist(state)` is a RETURNED-WRITE seam whose name is IMPRECISE: it is an optional caller callback this module
> calls with the next state, and whose return value this module hands back to the caller. `persist` is NOT a store,
> NOT a store write, NOT a persistence channel and NOT a journal: the module CALLS A CALLER FUNCTION and STORES
> NOTHING. The returned value is the CALLER's to store, and this module holds no reference to it after the call
> returns.**

**NO RE-NAME IS TAKEN HERE, and a re-name is the architect's act** (the token is the CHARTER's: `I-1` of the dossier;
`§4` item 4 records *"the contract RECORDS THE SEAM'S NAME AS IMPRECISE RATHER THAN PRESERVING IT SILENTLY"*). **THE
THIRD READING — `MISNAMED` — is named as the reversible alternative at `§7a.1` item 2's own cell**, and **a pass that
re-names the seam without a gate is reversing `§0` ruling 6's seam set.**

**Note 4 — THIS FILING'S OWN DECISION RECORD, IN THE `E5-B-3` FORM: TWO ITEMS, BOTH `FILEABLE`, NEITHER A BLOCKER.**
**Step 3 answered `FQ1` with a recorded working default (the closed entry record) and `FQ2` with one too
(`persist` returns a value; the caller owns `{entries, activeId}`), and step 4 AGREED both are fileable under
`AGENTS.md` item 10a — but ONLY UNDER `G-3`** (`docs/specs/focus-model-review.md` `§4` items 11/13). **So a later pass
re-typing either as an open architect question would manufacture a blocker out of a clause that has a working
default**, and **a pass presenting either as an architect's RULING would be misquoting a reviewer's default as a
ruling.** **THE TWO DEFAULTS, each with the clause it blocks NAMED and a CONFIRM-OR-REVERSE slot, are at `§7a`/`§7a.1`
— and `§7a.1` CARRIES NO THIRD ITEM: `FQ3` is not an open item of this unit's but a ROUTED question (`§5.4`).** **A
later pass that changes either default MUST OPEN A GATE.**

**Note 5 — NO LEG RAN IN ANY OF STEPS 1–4, AND NONE RAN IN THIS FILING.** **Every figure this file carries that is not
this filing's own derivation is a READ, a QUOTED RULING or a carried FILED FACT** (`RCA-12`), and **no figure may be
quoted as a measurement of this pass's.** **AND THE HONEST FORM OF THE REGISTER'S FIGURES: `89`, `13`, the seven
`(bounded)` markings, the four domains and every strategy id are CONTRACT DESIGN until the rows are EXECUTED — an
un-run register row is reported as a FAILURE, never as a pass** (`§5.5.1`'s execution discipline).

**Note 6 — THE FIVE REFUSAL-CODE BODIES, THE SEVEN RESULT MEMBERS AND THE RE-SEATING RULE ARE THIS FILING'S OWN
DERIVATION, AT THE TWO POINTS THE RECORD AND THE DOSSIER BOTH LEAVE OPEN.** **THE RECORD FIXES THE COUNT (`6`) AND THE
OWNERSHIP (this unit's own closed union) BUT NOT THE MEMBERS** (`docs/specs/focus-model-review.md` `§4` item 4;
`docs/specs/focus-model-adoption-dossier.md` `I-5`: *"the six member VALUES are the contract's to fix"*) — **the
members chosen here are `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'`, and they
are FIVE, not six** (`§2.1` item 7 states why, and why that is not a contradiction of the adopted count).
**THE RECORD FIXES NO RESULT SHAPE AT ALL** — it fixes the transition's INPUT and its semantic outcomes, and the
result's seven members are derived at `§2.1` item 3. **AND THE RE-SEATING RULE IS NAMED BY THE RECORD AS *"the
DECLARED RE-SEATING"* WITHOUT DECLARING IT** (`§4` item 6) — **so it is declared at `§2.3` item 6** (the
next-in-order entry, clamped at the end, `activeId: null` when none remains). **ALL THREE ARE DEFAULTS OF THIS
FILING: each is reversible at the spec gate, and each is named in the affected register rows' own cells.**

**Note 7 — THE TWO LANDED HOSTS THE `order` COLLISION IS RECONCILED AGAINST, NAMED SO THE ROW IS NOT PROSE.**
**`src/shared/owned-list-host.ts` projects its own order** (`orderOf` · `order` · `setOrder` · the `order` member of
its result; `docs/specs/listhost.md` `§2.4`, `§3.1 M-7`, `§6` — *"the host projects an order; it does not sort a
graph"*), **and `src/shared/slot-host.ts` projects its own container order** (`SlotHostOptions.orderOf`; the
`order === keys`' order fallback; `docs/specs/slothost.md` `§2.5` item 1, `§3.1 M-2`/`M-3` — *"no sorting occurs"*).
**THIS UNIT ADDS NO THIRD PROJECTION AND NO ORDER OF ITS OWN** (`§0` ruling 6; `§2.3` item 3; the scan row `R-12`).
**THE RECONCILIATION IS A SCAN ROW, NOT A PROSE NOTE** (`§2.2`(C) row 3), and **the exemption it names is the
caller's own array.** **AND ONE SHARP BOUNDARY THIS NOTE PINS BECAUSE THE TWO LANDED HOSTS DO *NOT* SHARE IT: this
module's `focusOrder` takes NO `orderOf`-shaped comparator and performs NO sort — so it is neither a `U-LISTHOST`
consumer nor a `U-SLOTHOST` sibling, and a pass asserting an edge to either is asserting a FABRICATED EDGE**
(`§5.1` item 12).

**Note 8 — THE PAGE-DESIGN LAYER DOES NOT EXIST, SO THE TWO PAGE ARTIFACTS THE TASK NAMES ARE NOT OWED BY THIS
UNIT — AND THE PROBE KEEPS THE CLAIM FALSIFIABLE.** **`docs/skills/designing-pages.md` does not exist** (globbed
`docs/skills/*` this pass: `process-guardrails.md` alone), **so there is no test-use-case coverage matrix and no
demo-page index to update**, and **this unit renders no page, authors no element and mounts nothing.** **IF the file
comes to exist, this unit OWES a coverage row and a demo-page index entry — and the honest form of that row is an
ABSENCE row, because a mechanism that renders nothing contributes no page** (`§3.5 X-5`'s probe; `§7` item 6).

**Note 9 — THE GATE-3 RED RUN'S THREE MEASURED DEFECTS AND THEIR DISPOSITIONS (dated `2026-09-27`; this note is the
single record of all three, and it AMENDS NO CLAUSE — every disposition below is an ANNOTATION BESIDE the as-filed text,
which stays visible at its own site).** **THE MEASURED PROVENANCE, stated once and quoted nowhere else in this file: the
gate-3 RED RUN read `72` rows — `56` FAILED / `16` PASSED — with the register stopping AT ITS FIRST ROW after five
attempts and `11` rows reported as UN-RUN FAILURES, and the strict leg exiting with EXACTLY ONE diagnostic: the declared
missing module.** **Those figures are the red run's and NOT this filing's** (`§0A` note 5; `RCA-12`): **this note
re-measured nothing, and no figure here may be quoted as a measurement of this pass's.** **THE THREE DEFECTS, EACH WITH
ITS DISPOSITION AND ITS LANDING SITES:**

**(a) THE REFUSAL-CODE UNION — THE ADOPTED SIX AGAINST THE EMITTED FIVE.** **MEASURED: the dossier adopted a
SIX-member universe while the contract files FIVE emitted bodies and its rows can drive exactly those five — there is NO
DRIVABLE SIXTH MEMBER.** **DISPOSITION: THE CONTRACT'S UNION IS ALIGNED TO THE FIVE IT EMITS AND ITS ROWS DRIVE**
(`§2.1` item 7's annotation), **and the DOSSIER's adopted row is annotated at its own site to record that the adopted
sixth member is UNEXERCISED AND THEREFORE WITHDRAWN FROM THIS UNIT'S CONTRACT — stated there as THIS UNIT'S SCOPE
DECISION, REVERSIBLE, because the adoption itself is EXTERNAL** (`docs/specs/focus-model-adoption-dossier.md` `I-5`).
**THE SIX-MEMBER ALTERNATIVE IS NOT TAKEN, BECAUSE THE RULE THAT WOULD EMIT A SIXTH MEMBER DOES NOT EXIST IN THIS
CONTRACT'S OWN TEXT** — **five bodies are derived and named as five (`§0A` note 6), the union is declared as five, and
`§2.3` item 5's total semantics table lands every refused row in one of the five** (`§2.1` item 7). **NO TERM, ROW ID,
STRATEGY ID, SEED, CAP OR POOL MEMBER MOVES: the union's own register rows keep their four terms
(`P-FM-TP-1` `10` · `P-FM-SEAM-1` `6` · `P-FM-SEAM-3` `9` · `P-FM-SEAM-4` `5`).**

**(b) THE ROW-VERSUS-TERM COUNT — `§5.5.1`'s `13` ROWS AND `13` TERMS.** **MEASURED: `§5.5.1`'s table supplies TWELVE
TERM-CARRYING ROWS plus ONE ROW THAT CARRIES NO TERM AT ALL — so its as-filed single figure, `13` rows carrying `13`
terms, is TWO claims printed as ONE number.** **DISPOSITION: THE ROW COUNT AND THE TERM COUNT ARE NOW STATED SEPARATELY
AND CORRECTLY — `13` ROWS, of which `12` CARRY A TERM and `1` DOES NOT; and the TERM COUNT is stated with it, because a
row count and a term count are different objects.** **THE ROW THAT CARRIES NO TERM IS NAMED AT `§5.5.1`'s table: the
TRAILING ANNOTATION ROW for `P-FM-TP-2`'s REACHABILITY HALF.** **WHY IT IS STILL A ROW: IT IS AN ASSERTION ROW AND NOT A
TERM ROW** — it asserts that the reachability drive is the TENTH drive INSIDE `P-FM-TP-2`'s own cell, it carries a
declared strategy id (`S-FM-REACH-1`, so no row is left without one), and it declares NO attempt term of its own because
the drive it names is already counted in `P-FM-TP-2`'s term. **NO ROW ID MOVES: `13` rows remain, none is dropped,
merged or renumbered, and the annotation row is not re-numbered away.** **AND THE FORM-VERSUS-FIGURE QUESTION IS
ANSWERED EXPLICITLY: THE ROW/TERM COUNTING CHANGE AFFECTS THE FORM OF THIS REGISTER'S PRESENTATION AND NOT A SINGLE
FIGURE** — the twelve terms are unchanged, the declared total `98` is unchanged, and the row set is unchanged; what the
change corrects is the FORM of the heading, which printed two claims as one number.

**(c) THE ARITHMETIC — THREE FIGURES THE HARNESS ALREADY ASSERTS.** **MEASURED: (i) the THIRTEEN-TERM LIST
`10 + 11 + 10 + 6 + 3 + 10 + 10 + 6 + 8 + 9 + 5 + 5 + 5` SUMS TO `98`, and `98` IS THE AUTHORITY, this register's
DECLARED TOTAL; (ii) the TWELVE TERM CELLS of `§5.5.3`'s own table sum to `93`; and (iii) `§5.5.3`'s claim that reading
one row as `9 + 1` "also closes on 98" is FALSE — that reading sums to `103` (`9 + 1 = 10`, and `93 + 10 = 103`).**
**DISPOSITION: THE ARITHMETIC IS CORRECTED SO EVERY PRINTED FIGURE IS WHAT IT SAYS IT IS.** **THE DECLARED TOTAL `98`
REMAINS PRINTED WITH THE THIRTEEN TERMS IT IS THE SUM OF** (`§5.5.3`, unchanged and still the figure every cap
comparison uses); **the TWELVE TERM CELLS' OWN SUM IS PRINTED AS WHAT IT IS — `93`** (`§5.5.3`); **and the FALSE `9 + 1`
READING IS WITHDRAWN, NO GENUINELY CLOSING READING BEING AVAILABLE** — **the arithmetic that shows it is at `§5.5.3`:
the twelve cells' `93` plus that row's `10` is `103`, so no reading OF THESE PRINTED CELLS closes on `98`, and the `5`
figure separating `98` from `93` is NOT carried by any printed cell — so it could only be closed by MOVING a term, WHICH
THIS PASS DOES NOT DO AND REPORTS INSTEAD.** **THE AS-FILED FIGURES STAY VISIBLE AT THEIR OWN SITES** (`CURRENT STATE`
item 3, `§5.5.1`'s heading, `§5.5.3`'s correction note, `§7` item 9), **THE CAPS ARE RE-CHECKED AGAINST THE DECLARED
FIGURE — `98 ≤ 400` (headroom `302`) and the LARGEST ROW `11 ≤ 100` (headroom `89`), BOTH HOLDING** — **and NO TERM
MOVES: not one row id, strategy id, seed, cap or pool member changes, and the register's THIRTEEN-TERM TOTAL IS
UNCHANGED AT `98`.**

**THE OBLIGATION THIS NOTE CREATES, NAMED BECAUSE IT IS NOT THIS PASS'S ACT: THE REGISTER HARNESS'S OWN ASSERTIONS
MUST BE RE-ALIGNED TO WHATEVER THIS CONTRACT PRINTS — AND THAT RE-ALIGNMENT IS THE TESTWRITER'S ACT.** **The landed red
set already carries assertions in this class** (`tests/focus-model.test.ts`: `HARNESS-1` measures the twelve cells'
`93` and the thirteen terms' `98` side by side; `HARNESS-3`/`HARNESS-4` read the register as twelve term-carrying rows
and the row/term reading; `HARNESS-5` carries the flagged `9 + 1` reading) — **and the `9 + 1` figure those rows read is
the reading WITHDRAWN here, so the TestWriter owes the re-grain of that row, not this pass: a TestWriter act under
`§4.2`/`§5.3` item 11, with an un-run row reported as a FAILURE and never as a pass.** **NO CELL OF THIS CONTRACT IS
WEAKENED BY THAT OBLIGATION, and this pass writes no test and runs none** (`§5.3` item 11; `§4.5`).

**Note 10 — THE SUPERVISOR'S FOUR ADJUDICATED RULINGS, THEIR PROVENANCE AND THEIR OBLIGATIONS (dated `2026-09-27`; this
note AMENDS NO CLAUSE AND MOVES NO TERM, ROW ID, STRATEGY ID, SEED OR CAP — every ruling lands as a DATED ANNOTATION
BESIDE the as-filed text, which stays visible at its own site; `RCA-8(d)`).** **THE FIVE SITES ARE `§2.3` item 2's
`'open'` row and `§2.3` item 5's precision paragraph, `§2.2`(D)'s `FocusId`/`activeId` rows and `§3.2 F-4`, `§2.2`(D)'s
`label` row plus `§2.3` items 1/6, `§2.4` seam 1's payload cell plus `§2.1` item 8 and `§2.4` law 1, and `CURRENT STATE`
item 3 with `§5.5.2` item 2. THIS NOTE IS THE SINGLE RECORD OF ALL FOUR, AND ITS PROVENANCE IS TWO GATES:**
**THE FOUR RULINGS.**
**(1) THE REPEATED-TARGET READING — *"`open` appends or activates"* is DECIDED: a repeated `target` ACTIVATES the
existing entry and appends nothing**; the caller's entry is not lost, no duplicate is created, and the result says which
happened. **PROVENANCE: gate 4's `F2` (HIGH), reproduced as the DISCARDED ENTRY — the landed body silently dropped the
caller's entry on the repeated-target arm.** **FALSIFIER: a body that discards the new entry, or that appends a second
entry for the same target, must FAIL.**

**⟶ (1a) THE GATE-4 FINDING THAT DID NOT REPRODUCE — RECORDED AGAINST THE FINDING, AND ITS OWN ROW'S STATUS IS UNCHANGED (`2026-09-27`, this pass; `RCA-8(d)` — an ANNOTATION BESIDE the as-filed rows above, which stay visible; NOTHING IS ENFORCED AGAINST THE MODULE FOR IT AND NO CLAUSE IS WITHDRAWN).** **MEASURED BY THE TESTWRITER, AGAINST THE LANDED BODY: gate 4's `F2` claim — *"opening an entry whose target repeats an owned entry's target SILENTLY DISCARDS the new entry"* — COULD NOT BE REPRODUCED. THE ROW COULD NOT BE MADE TO FAIL.** **THE STATES ENUMERATED, each driven against the landed `open`:** **(i)** the repeated target's **existing entry INACTIVE**; **(ii)** the repeated target's **existing entry ALREADY ACTIVE**; **(iii)** the same drives with an **APPEND CONTROL** in scope (a distinct target, which appends as declared). **In every one of them the landed `open` ALREADY SEATS THE EXISTING ENTRY'S `id`** (`state.activeId`/`seated` read that entry's own id, by identity), **KEEPS the length and the ELEMENT IDENTITIES of `state.entries`** (same length, same objects), **and REFUSES NOTHING** — so no entry is discarded and no duplicate is appended. **DISPOSITION: `NOT-A-DEFECT — CLAIM NOT REPRODUCIBLE`, recorded **AGAINST THE FINDING**: a gate finding that does not reproduce is recorded against the finding and is NEVER ENFORCED — no host edit is owed for `F2`, no regression row is owed for it, and the finding is not converted into a clause.** **AND THE CONTRACT'S AMENDED READING (ruling (1) above: **ACTIVATE, APPEND NOTHING**) IS THE READING THE LANDED BODY ALREADY SATISFIES** — which is why the reading is recorded as the contract's own decision of record and the claim as unreproducible, **two different acts, neither one a pass.** **THE ROW'S FALSIFIER ABOVE STANDS AND IS UNWEAKENED: a body that discards the new entry, or that appends a second entry for the same target, must still FAIL** (`§2.3` item 2's `'open'` row; `M-3`); **what is withdrawn is the CLAIM, never the falsifier, and no term, row id, strategy id, seed or cap moves here.**
**(2) `undefined` IS A LEGAL OPAQUE ID VALUE AND MUST BE CARRIED BY IDENTITY — AND `null` IS DISTINCT FROM IT**; neither
may be mapped onto the other. **PROVENANCE: gate 4's `F3` (MED), reproduced as the COERCED ACTIVE ID — the landed module
coerced `undefined` to `null` on `activeId`, surfacing a WRONG REFUSAL ON A LEGAL STATE.** **FALSIFIER: a body that maps
either value to the other must FAIL.**
**(3) THE `label`'s ABSENCE RULE GOVERNS THE LABEL THE MODULE WOULD SYNTHESIZE, NOT THE CALLER'S OWN OBJECT** — the
module NEVER MINTS, COERCES OR STRIPS a label and carries the caller's own entry (and therefore its own `label` member)
BY IDENTITY. **PROVENANCE: gate 5's blind `FM-11`, reproduced as the RETAINED NON-STRING LABEL, and stated there as a
CLAUSE CONFLICT: the as-filed pair — *"the member is ABSENT otherwise"* read with the caller's-entry-by-identity
requirement — WAS JOINTLY UNSATISFIABLE, because A CALLER'S OWN OBJECT CANNOT LOSE A MEMBER.** **FALSIFIER: a body that
mints a label where the caller gave none, or that strips or coerces one the caller supplied, must FAIL.**
**(4) THE RESULT CARRIES THE MODULE'S OWN REFUSAL RECORD, AND A `refuse` CALLBACK RECEIVES A COPY IT MAY MUTATE FREELY
WITHOUT CHANGING ANY OUTCOME** — the handed-out record is OBSERVATION, the result's record is THE MODULE'S. **PROVENANCE:
gate 5's blind `FM-28`, reproduced as the CALLBACK THAT REWROTE THE RESULT'S REFUSAL (`duplicate-id` observed at call
time became `caller-bug` in `result.refusals[0]`), against seam 1's *"the refusal is the result's, not the callback's
verdict"* and law 1's *"no seam may change an outcome"*.** **FALSIFIER: a callback that rewrites every field of what it
receives must not change the result's refusal, its code, its order or its count.** **AND THE LANDED ORDER OF OPERATIONS
MUST BE INVERTED — BUILD THE RECORD, THEN HAND OUT A COPY — which is a HOST-SIDE fix.**
**THE FIVE-POINT GAP: `§5.5.3`'s five owed obligations (the two withdrawn subtotal decompositions' re-derivation or
withdrawal; the `13`-rows/`13`-terms-versus-`12`-rows/`12`-terms declaration; the `P-FM-TP-2` `9 + 1` shape-versus-term
reading; the as-filed `89`'s reconciliation at its visible sites; and the EXECUTION of the thirteen rows) STAY OWED AS
`§5.5.3` RECORDS THEM — this note closes none of them and adds no fifth-ruling discharge: (5) is un-run by construction,
(1)'s two decompositions stay withdrawn as defective, and (2)'s DISCHARGED-AS-FILED status is `§5.5.3`'s and is not
re-decided here.** **THE OBLIGATIONS THIS NOTE CREATES, EACH
WITH ITS OWNER.** **THE MODULE OWES THE THREE HOST FIXES: (a) THE TOTALITY GUARD, (b) THE IDENTITY-PRESERVING ACTIVE ID,
and (c) THE REFUSAL COPY.** **THE RED-FIRST REGRESSION ROWS ARE THE TESTWRITER'S FOR EVERY RULING HERE** (four rulings,
four rows — a ruling with no row that can FAIL is unasserted; `§4.2`, `§5.3` item 11). **AND A REGISTER RE-GRAIN IS OWED
ONLY IF A RULING IS READ TO MOVE A CELL, WHICH IT IS NOT: every ruling above lands as an annotation and NO TERM, ROW ID,
STRATEGY ID, SEED, CAP OR POOL MEMBER MOVES** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
**AND ONE CLAUSE OF RULING (1) IS A RECORDED WORKING DEFAULT RATHER THAN A DERIVATION: THE TOTALITY GUARD'S EXACT BOUND
— WHAT MAKES A CALLER'S ARRAY *"USABLE"*.** **THE WORKING DEFAULT (recorded, and the reading this contract's rows drive):
an `entries` value is USABLE exactly when a LENGTH READ and an INDEX READ against it yield elements without throwing —
so an ARRAY-LIKE object carrying a `length` and indexed members reads as a caller array, and EVERY shape that fails
either read (a non-array primitive, an object with no `length`, a revoked `Proxy`, a trap-throwing holder, a THROWING
LENGTH OR INDEX ACCESSOR, a `length` that is not a valid array length) reads the DECLARED EMPTY SEQUENCE rather than
throwing** (`§2.3` items 3/10; `P-FM-TP-2`'s hostile pool). **THE NAMED ALTERNATIVE, architect-reversible and NOT taken:
a STRICT `Array.isArray`-only bound, under which every non-array shape — array-likes included — reads the empty
sequence** (the reading `§3.4 R-7`'s licensed `Array.isArray(state.entries)` read would then have to be the WHOLE of
the guard). **The two readings differ only for ARRAY-LIKES and for a THROWING accessor on a real array, and THE CHOICE
MOVES NO TERM** — `P-FM-TP-1`/`P-FM-TP-2`'s declared attempts and the `(bounded)` set are unchanged under either — **so
a later pass may CONFIRM or REVERSE it in a dated annotation; a pass that quietly SAMPLES a different bound, or that
re-grains a cell for it, is reversing this default and MUST OPEN A GATE.**

**⟶ AND THE GUARD'S OWNING ROW IS NAMED HERE, BECAUSE UNTIL THIS PASS IT HAD NONE (`2026-09-27`, the close-out pass; an ANNOTATION BESIDE the as-filed default above, which stays visible and unmoved; `RCA-8(d)`).** **THE OWNING ROW IS THE REGISTER'S TOTALITY ROW `P-FM-TP-2`** — *THE MODULE-WIDE UNIVERSAL OVER HOSTILE ARGUMENT SHAPES, PLUS THE REACHABILITY HALF* (`§5.5.1`: type `P-TP`, strategy id `S-FM-OPAQUE-1`, declared term `10`, and the `(bounded)` marking its own cell carries). **THAT ROW IS WHERE THIS BOUND IS OWNED, AND IT IS THE ONLY ROW THAT OWNS IT.** **WHY IT IS THE OWNER, AND NOT ANOTHER ROW:** its declared pool drives exactly the shapes this bound decides — **a NON-ARRAY `entries` reading the empty sequence, a THROWING `entries` accessor, a THROWING `activeId` accessor, a revoked `Proxy`, a trap-throwing `Proxy`, `Object.create(null)`, a `Symbol`, a `12n` and `NaN`** — while **`P-FM-TP-1` is the VERB DOMAIN'S totality row and owns none of it**, and **no `§3` row owns it either.** **THE PRE-STATE THIS RECORDS, STATED PLAINLY: the guard was carried in this note's own prose and in the module's landed body, WITH NO OWNING ROW IN THIS REGISTER AND NO OWNING ROW IN THE TEST FILE — so a reader had no row to point at, and the bound could not redden anywhere.** **AND AN OWNING ROW IS NOT A LICENCE TO MOVE THE BOUND: A PASS THAT REVERSES IT — by sampling a different `usable` predicate, by changing which shapes read the declared empty sequence, or by re-graining `P-FM-TP-2`'s cell for it — `OWES A GATE`**, exactly as the paragraph above requires; **the only landable form is a DATED ANNOTATION that CONFIRMS or REVERSEs the default.** **A REVERSAL THAT OWES A GATE IS STATED WITH ITS BOUND, NOT JUST ITS NAME: the bound reversed is WHICH SHAPES COUNT AS A CALLER ARRAY (array-likes admitted, or refused under the strict alternative) and WHICH READ FAILURE READS THE DECLARED EMPTY SEQUENCE (a throwing accessor on a REAL array included) — the two readings the paragraph above distinguishes.** **NO TERM, ROW ID, STRATEGY ID, SEED OR CAP MOVES BY THIS NAMING: `P-FM-TP-2` keeps its `10` declared attempts, its `(bounded)` marking, its strategy id and its place in the thirteen-row set, and the register's declared total stays `98`** (`§5.5.3`).

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no `tsc` invocation was
made, no Electron window booted, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` under the node suite, driving pure values and recording closures | not a browser, not a real OS, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/focus-model.ts` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg | **not an identity leg**; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **nothing this unit's contract needs to observe**; **NO `[D]` ROW IS CLAIMED** (`§5.2`) |

**Seven honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence, and NEVER OS evidence.** It
   says this repo's vitest files pass against this unit's module. **No window is booted, no element is touched, no
   attribute is written, no node is moved, no listener is installed, no focus is moved anywhere, no MCP transport is
   exercised — and NO ENTRY IS EVER FOCUSED ANYWHERE in the run.** **A green here proves THE RETURN VALUES OF THREE
   PURE FUNCTIONS AND THE CALL COUNTS OF ONE SEAM — AND NOTHING ELSE.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a document**: the only
   arguments are **a caller's state record, a caller's verb word, a caller's entry record, a caller's opaque id, a
   caller's opaque target, a caller's own optional label string and a caller's seam callbacks.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no `process`,
   no `navigator`, no `globalThis`-rooted lookup, no `activeElement`, no `matchMedia`, no `localStorage`, no
   `indexedDB`, no `Date`, no `Math.random`, no `fs`, **no `console`**. **Every value is an argument, and every seam
   is a caller's callable.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its rows are
   authored in **this unit's own test file** and executed by the **same node suite** (`npm test`, `§5.2` leg 1) — so
   **a register row is `[T]` evidence exactly as a `§3` row is**, and **no register row may be read as `[H]`, `[U]`,
   `[D]`, OS or assembled-app evidence.**
5. **A green on a RETURNED STATE is NOT a green on a FOCUSED ELEMENT.** **No row of this unit may be read as evidence
   that anything was focused, that a tab or a pane changed, that a control received input, that a document's active
   element moved, or that any user-visible flow changed** — **none of which this unit produces, performs or observes.**
   **The word `focus` in this file's own prose names THIS UNIT'S transition model over a caller's ordered entries and
   nothing else** (`§2.2`(C) row 1).
6. **THE `id` AND THE `target` ARE OPAQUE CALLER IDENTITIES, AND THE `target` IS NEVER CONSULTED AT ALL.** **The `id`
   is consulted for ONE thing only — an EQUALITY TEST for the first-occurrence rule — and nothing else happens to
   either value**: no read, no member access, no coercion, no `typeof` branch on the value's own shape, no
   `instanceof`, no call, no `String()`, no `Symbol.toPrimitive`, no `JSON` round-trip and no validation. **A row
   asserting that this module "resolved" an id, "named" a target, "validated" an entry or "normalised" a label is
   asserting a clause this contract does not contain** (`§2.3` items 4/7).
7. **THE THREE SEAMS ARE CALLER CALLBACKS AND NOTHING ELSE: a refusal is DATA the result carries, a change is DATA
   the result counts, and a persisted value is DATA the caller receives.** **No row may claim that a seam wrote a
   file, notified a renderer, emitted an MCP notification, changed a store or reached a graph** (`§2.4`).

---

## 1. Scope

**One deliverable: one `src/shared/` module — a PURE, TOTAL, STATELESS reducer of THREE functions over
caller-supplied values, with THREE OPTIONAL caller seams** — with **no store, no DOM, no element, no listener, no
write, no vocabulary, no factory and no session**.

1. **What the unit is, in one sentence.** A **pure transition mechanism over an ORDERED collection of CALLER-OWNED
   entries** — **`focusTransition(state, verb, arg?)` returns a RESULT VALUE**, **`focusOrder(entries)` returns a
   sequence**, **`focusIndex(state, id)` returns a number** — **where the CALLER owns `{entries, activeId}`, the
   module owns nothing, MUTATES NO ARGUMENT, and the only outward couplings are three OPTIONAL caller callbacks
   (`refuse` · `onChange` · `persist`) whose degradations are declared** (`§2.4`).
2. **What the unit is NOT — no stateful handle, no store, no session and no factory.** **THE MODULE HOLDS NOTHING
   BETWEEN CALLS**: no `{entries, activeId}`, no last-verb memo, no transition history, no cache, no memo table, no
   counter, no `Map`/`Set` field of its own, no retained seam reference, no retained id, no retained target and no
   module-level mutable binding. **The state crosses the call boundary ONLY AS AN ARGUMENT, and the module returns a
   value rather than holding one** (`§0` ruling 1). **A pass that adds a `create…` factory, a
   `createFocusSession(…)` handle or an options object carrying an initial state is adding the store the charter
   forbids and MUST OPEN A GATE.** **NO SUCH NAME EXISTS IN THIS CONTRACT.**
3. **What the unit is NOT — no DOM, no focus walk, no element, no listener.** **The module never reads
   `document`/`window`/`activeElement`, never walks a focusable set, never calls `focus(`/`blur(`, never reads
   `matchMedia`, installs no listener, wires no event, holds no element and returns no node** (`§0` ruling 15;
   `§3.4 R-9`/`R-10`). **THE SHIM'S FOCUS-WALK BAN IS ABSOLUTE AND THIS UNIT DOES NOT NEED AN EXEMPTION FROM IT — its
   order is the CALLER'S ARRAY** (`§0A` note 7; `§2.3` item 3).
4. **What the unit is NOT — no UI element, no authored content, no second order authority.** Per
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test this module authors **no text, no control, no affordance, no
   class taxonomy, no slot content and no styling**; **it returns values**, and **`UI-RENDERED-WITH-PROVIDENT` has no
   element of this unit's to apply to.** **AND IT PROJECTS NO ORDER:** order **IS** the caller's array, the module
   **sorts nothing** and holds **no comparator invocation site** — so **the two landed hosts that project their own
   order are not contradicted, not composed and not superseded by this unit** (`§0` ruling 6; `CURRENT STATE` item 9).
5. **What the unit is NOT — no store, no persistence, no journal, no cache.** **This repo owns no UI-config store,
   `S-d4` is intact, and persistence stays consumer-side**: **`persist` is a RETURNED-WRITE SEAM whose name this
   contract RECORDS AS IMPRECISE** (`§0A` note 3), and **a later pass that adds a store, a persistence channel or a
   journal to this adoption owes a NEW GATE and must not smuggle it in here** (`§3.3 I-4`).
6. **What the unit is NOT — no policy default.** **Which verb a key press, a click, a gesture or a timer maps to is
   the CONSUMER's decision**: the module defines **no default verb, no auto-close, no timer, no key handling, no
   auto-advance, no wrap policy of its own, no default entry, no default label, no default target and no state the
   caller did not supply.** **`next` and `prev` are VERB MEMBERS the caller chose — never an automatic advance the
   module imposes** (`§7a.1` item 3).
7. **What the unit is NOT — no MCP surface, no channel, no tool, no method and no consumer vocabulary.** **It adds no
   `ALL_TOOLS` member, no `RpcMethod` member, no `VALID_GROUPS` member, no `MUTATING_METHODS` entry, no IPC method, no
   resource, no channel and no store handle** (`§2.2` `P-FM-5`), and **the endpoint's existing output shape
   (`activeId`/`entries`/`opened`/`refused`) is PRODUCED BY THE CONSUMER and NEVER RETURNED HERE** (`§2.5` item 7).
8. **What is EXPLICITLY OUT of scope (do not do in this unit).** No renderer wiring and no demo-envelope work
   (`§5.1`'s DENIED set); **no import of any sibling module, not even type-only** (`§2.1` item 6); no `electron` and
   no `node:*`; **no element parameter, no node parameter, no DOM read and no document access of any kind**; no
   `addEventListener`/`removeEventListener`/`on*` assignment; no `matchMedia`; **no `activeElement` read and no
   focusable walk**; no store, no persistence, no file write, no `localStorage` and no module-level mutable state;
   **no sort, no comparator call, no rank field and no memo of the caller's sequence**; no new MCP surface, no IPC
   method, no tool and no resource; no divergence-harness work and **no `[D]` row**; no `scripts/**`; **no
   `docs/skills/designing-pages.md` update — that file DOES NOT EXIST** (`§0A` note 8), and **this unit renders no
   page** (`§3.5 X-5` is the probe that keeps that claim falsifiable).
9. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec + its
   `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new `src/shared/`
   module and touches **no existing file** except this spec and the trackers (`§5.1`).
10. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY.** **The unit ships no feature and has NO IN-TREE
    CONSUMER**: `src/shared/focus-model.ts` will be **imported by no `src/**` file** and will appear in **none of the
    built bundles**. **Its value is the contract itself, and for a fork it is exactly four things:** the **transition
    discipline** (a closed five-verb alphabet over a caller-owned entry set, total over any input, never a throw), the
    **order discipline** (order is the caller's array — nothing is sorted and nothing is owned), the **seam
    discipline** (three optional callbacks whose absence, non-callability and throw each have a DECLARED degradation
    and a row that can FAIL), and the **boundary discipline** (no vocabulary, no store, no DOM, no MCP surface, and
    `persist`'s imprecise name stated rather than preserved). **THE NAMED COST, carried because the family carries its
    own:** the fork that adopts this reducer **still owns the entry rendering, the key handling, the verb mapping, the
    refusal presentation and EVERY BYTE OF STORAGE** — and **the consumer unit `F3` (`U-FOCUS-TOOL`) owns the tool,
    its group, its route and the endpoint shape this module deliberately does not return.** **The honest cost of the
    unit itself**: this spec + a **`13`-row / `89`-attempt** register + red/green **with remands** + the adversarial
    pass + blind greens + the per-unit documentation review + a DONE row + per-gate commits (`RCA-8(f)`).

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**New module: `src/shared/focus-model.ts`** (`§0A` note 2). **It imports NOTHING** (`§2.1` item 6).

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: NINE exported names, in TWO HALVES —
FOUR value exports and FIVE type declarations.** **The two halves are counted separately on purpose** (the family's
census rule: `docs/specs/theme.md` `§2.1`, `docs/specs/container.md` `§2.1`, `docs/specs/overlay.md` `§2.1`), because
**a type declaration is erased at runtime** — so a single *"9 exports"* claim would be **half-unfalsifiable**. **A row
asserting only a COUNT without NAMING the names FAILS `§3.4 R-5`'s own text** (`§4.4 S-FM-6`). **AND `G-1`'s form
binds here: the census's names are NAMED, in both halves, in this paragraph and in the block.**

1. **THE FOUR RUNTIME VALUE EXPORTS — exactly `focusTransition`, `focusOrder`, `focusIndex` and `persist`**
   (`§3.4 R-5`(a) reads the imported namespace's own keys **by name**, with a positive control that a namespace
   carrying a **FIFTH** value export FAILS). **THE FIVE TYPE DECLARATIONS — exactly `FocusId`, `FocusEntry`,
   `FocusVerb`, `FocusRefusalCode` and `FocusState`** (`§3.4 R-5`(b): a type-only name is **erased at run time**, so
   the type half is a **PRESENCE** claim pinned by **`§5.2` leg 5's standalone strict `tsc`**). **`4 + 5 = 9`.**
   **`persist` IS A VALUE EXPORT AND NOT AN OPTION MEMBER — see item 4's note.** **THERE IS NO FACTORY AND NO
   SESSION** (`§1` item 2): **the value half carries NO `create…` name of any kind.**
2. **THE THREE FUNCTIONS AND THE ONE SEAM EXPORT, IN FULL, WITH THEIR RETURN SHAPES, THEIR DECLARED DEGRADATIONS AND
   THEIR ERROR PATTERNS.** **THE ERROR PATTERN IS UNIFORM AND IT IS PART OF THE CONTRACT: NONE OF THE FOUR VALUE
   EXPORTS THROWS, FOR ANY ARGUMENT OR FOR ANY SEAM SHAPE.** **Refusal in this unit is a VALUE the result carries —
   never a throw and never a `Result`-less failure.** **There is no `ok` member, no `reason`, no `thrown`, no
   `disabled`, no `error` and no sentinel in this contract**: an unusable argument produces **a DECLARED outcome**,
   and an unusable or throwing seam is **swallowed with the declared degradation** (`§2.4`).
3. **THE RESULT VALUE (`FocusResult`) — SEVEN members, declared here because the record fixes no result shape
   (`§0A` note 6).** **`state`** — **the state the caller should hold next, RETURNED BY IDENTITY: for a REFUSED
   attempt it is the `state` argument ITSELF (`===`), and for an accepted attempt it is a FRESH `FocusState`.** ·
   **`accepted`** — a `boolean`: `true` exactly when the attempt committed, `false` for every refused attempt. ·
   **`verb`** — **the VERB OF RECORD**: the caller's own verb when it is one of the five declared member strings (by
   identity of the string), and the declared normalised body `'unknown'` otherwise. · **`refusals`** — a
   **`readonly FocusRefusal[]`**, **EMPTY for an accepted attempt and EXACTLY ONE element for a refused attempt**
   (this contract refuses at most once per call, so its length is always `0` or `1` — `§2.3` item 8). ·
   **`seated`** — the `FocusId | null` that became or remained the active id for an accepted attempt, and **the
   PRIOR `activeId` for a refused attempt**. · **`changed`** — a `boolean`: `true` exactly when the attempt was
   ACCEPTED and the next state DIFFERS from the prior state **by `state` identity (`!==`)** — **so a no-op accepted
   verb reads `changed: false`** (`§2.3` item 9). · **`persisted`** — **`present: true` with the seam's return value
   when the `persist` seam was CALLED, and `present: false` with `value: undefined` when it was not called or could
   not be called** (`§2.4` seam 3). **THE MEMBER ORDER IS DECLARED: `state` · `accepted` · `verb` · `refusals` ·
   `seated` · `changed` · `persisted`.** **A `FocusResult` carries NO store handle, NO node, NO element, NO channel
   and NO endpoint-shaped noun** (`§2.5` item 7).
4. **THE SEAM SET: THREE OPTIONAL SEAMS, AND THEY ARE ARGUMENTS — NEVER OPTIONS AT CONSTRUCTION, BECAUSE THERE IS NO
   CONSTRUCTION** (`§0` ruling 13; `§2.4`'s table is the normative home). **`refuse` and `onChange` arrive as members
   of `focusTransition`'s THIRD argument; `persist` is a top-level VALUE EXPORT.** **WHY `persist` IS AN EXPORT AND
   NOT A CALLBACK ARGUMENT, DERIVED AND BOUNDED:** **its return value must reach the CALLER** — that is the
   returned-write form `§0` ruling 1 and step 3 item 4 pin (*"`persist(state)` RETURNS A VALUE FOR THE CALLER TO
   STORE"*) — **and a callback invoked inside `focusTransition` could not hand a value back without adding an eighth
   result member derived from a seam.** **THE BOUND: `focusTransition` NEVER CALLS `persist`** (`§2.4` seam 3), **so
   the two are independent and neither is an authority over the other.**
5. **THE CLOSED FIVE-MEMBER VERB UNION (`FocusVerb`) — exactly `'open'` · `'activate'` · `'close'` · `'next'` ·
   `'prev'`, and no sixth.** **THESE FIVE BODIES ARE `I-3`'s ADOPTED SET, CARRIED VERBATIM** (`docs/specs/focus-model-adoption-dossier.md`
   `I-3`; step 3's `§4` item 6). **Every one of them is a BEHAVIOUR WORD; NO consumer noun (`'tab'`, `'pane'`, a
   zone, a region) may be a member** (`A-d5`'s no-vocabulary clause; `§2.2`(C) row 2). **AN UNKNOWN VERB IS TOTAL: no
   throw, the prior state returned BY IDENTITY, and exactly one `'unknown-verb'` refusal** (`§2.3` item 2).
6. **THE IMPORT CENSUS: NONE — NOT ONE STATEMENT, NOT EVEN TYPE-ONLY.** **`§3.4 R-4` is the row that pins it, and
   `R-4`'s positive control is that a SINGLE import of ANY path FAILS it.** **Why it is EMPTY:** **(a)** the module
   receives **no session, no engine surface and no sibling value** — its whole surface is **three caller arguments
   plus caller callbacks**; **(b)** **its five types are declared locally**, so there is **no shape it needs to
   borrow** — **and in particular it does NOT import `ListKey`/`SlotKey`/`ListHostResult`/`SlotHostOptions`**: the
   two landed order-projecting hosts are **BOUNDARIES CITED IN THIS FILE, never imports** (`§0A` note 7); and **(c)**
   **`docs/specs/gsession.md`'s surface is NOT this unit's** — **this unit composes no session, names no session and
   imports no session.** **A later pass asserting an import edge in EITHER direction is a `§4.4 S-FM-9` STOP.**
7. **THE CLOSED REFUSAL-CODE UNION, AND THE COUNT QUESTION ANSWERED IN THE OPEN (`§0A` note 6).** **`FocusRefusalCode`
   is CLOSED, and its members are `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` ·
   `'no-previous'`** — **FIVE bodies.** **THE ADOPTED COUNT IS `6`** (step 3's `§4` item 3: *"a CLOSED six-member
   refusal-code union"*; the dossier's `I-5`), **and its own wording is that *"the six member VALUES are the
   contract's to fix"*** — **the values fixed here number FIVE, and the discrepancy is RECORDED rather than hidden:**
   **⟶ RESOLVED BY THE GATE-3 RED RUN, 2026-09-27 — THE ALIGNMENT IS TAKEN AND THE SIXTH MEMBER IS WITHDRAWN FROM
   THIS UNIT'S CONTRACT (disposition (a); the dated disposition note is `§0A` note 9, and the dossier's adopted row is
   annotated at its own site, its `I-5`).** **THE AS-FILED TEXT BELOW IS KEPT VERBATIM AND NOTHING IN IT MOVES: the five
   bodies stay exactly `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'`, and this
   contract's union is therefore ALIGNED to the FIVE it EMITS and its rows drive** (`§2.2`(C) row 8; `P-FM-TP-1`;
   `P-FM-SEAM-1`; `P-FM-SEAM-3`'s membership assertion; `P-FM-SEAM-4`). **THE SIXTH ADOPTED MEMBER IS UNEXERCISED AND IS
   THEREFORE WITHDRAWN FROM THIS UNIT'S CONTRACT — THE WITHDRAWAL IS THIS UNIT'S SCOPE DECISION AND IS REVERSIBLE.** **AND
   THE SIX-MEMBER ALTERNATIVE IS NOT ASSERTED HERE: this contract's own rules emit NO sixth body** — **the five refusal
   bodies are derived and NAMED as five at `§0A` note 6, this union is DECLARED as five in the block below, and `§2.3`
   item 5's semantics table is total over its `14` attempt rows with every refused row landing in one of the five — so
   there is NO DRIVABLE SIXTH MEMBER and no rule that emits one; a sixth member could only be a
   DECLARED-BUT-UNEMITTED member, the landed `docs/specs/slothost.md` `SlotHostRefusal` `'no-container'` form, which the
   red set forbids a row to drive (`§3.4 R-8`'s SIXTH-refusal-code control).** **THE COUNT THAT NOW GOVERNS IS `5` — the
   union, the emitted bodies and the drivable bodies are ONE set — and NO register term moves: `P-FM-TP-1`'s `10`,
   `P-FM-SEAM-1`'s `6`, `P-FM-SEAM-3`'s `9` and `P-FM-SEAM-4`'s `5` are UNCHANGED** (`§5.5.3`).
   **(a)** **the count is READ by a TestWriter as the length of a closed union, so filing six DECLARED-BUT-UNEMITTED
   members would file a member no row can drive** — the `§3.4 R-8`-class defect in the refusal domain; **(b)** **every
   refusal this contract can produce has a home in the five** — `'unknown-verb'` (an unrecognised verb), `'duplicate-id'`
   (an `'open'` whose id is already owned), `'unknown-id'` (`'activate'`/`'close'` over an id not in the set),
   `'no-next'` (a `'next'` with no entry ahead), `'no-previous'` (a `'prev'` with no entry behind); and **(c)** **a
   pass that wants a sixth member owes a NEW dated amendment and a register re-grain** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
   **THE DISCREPANCY IS REPORTED TO THE SPEC GATE rather than closed by assertion** (`§7a.1` item 3 records the
   reversible reading: a DECLARED-BUT-UNEMITTED sixth member, in the landed `docs/specs/slothost.md` `SlotHostRefusal`
   form whose `'no-container'` member is *"DECLARED-BUT-NOT-EMITTED"*).
8. **A refusal is a DATA RECORD, NOT A THROW AND NOT A CALLBACK'S VERDICT** (`§2.4`). Its members, declared here:

   **`FocusRefusal` = `{ readonly code: FocusRefusalCode; readonly verb: FocusVerb | 'unknown'; readonly id: FocusId }`**
   — **three members, declared order `code` · `verb` · `id`.** **`code`** is a member of the closed five; **`verb`**
   is **the verb of record** (`§2.1` item 3's `verb` member — the same value the result carries); and **`id`** is
   **the CALLER'S OWN id value BY IDENTITY when the refusal is about an id (`'duplicate-id'`, `'unknown-id'`), and
   the caller's current `activeId` BY IDENTITY when the refusal is about a boundary (`'no-next'`, `'no-previous'`),
   and `null` when the refusal is about the verb (`'unknown-verb'`)** — **NEVER a copy, NEVER a string, NEVER a
   normalised form, and for a revoked `Proxy` identity the value is carried WITHOUT TOUCHING IT** (`§2.3` item 7).
   **⟶ AND THE RECORD'S OWNERSHIP IS PINNED BESIDE THIS AS-FILED ITEM (`2026-09-27`, supervisor-ADJUDICATED after
   gate 5's `FM-28`; `§0A` note 10 item 4): THE RESULT CARRIES THE MODULE'S OWN REFUSAL RECORD — the `FocusRefusal`
   declared on this line — and a `refuse` callback receives A COPY it may mutate freely without changing any
   OUTCOME, the verdict, the `accepted` flag, the `seated` id, the `changed` boolean, the order or the count.** **The
   copy handed to a callback is OBSERVATION; the record in `FocusResult.refusals[0]` is THE MODULE'S.** **ITS
   FALSIFIER: A CALLBACK THAT REWRITES EVERY FIELD OF WHAT IT RECEIVES MUST NOT CHANGE THE RESULT'S REFUSAL, ITS CODE,
   ITS ORDER OR ITS COUNT** (the landed order of operations — build the record, then hand out a copy — is the
   HOST-SIDE fix this ruling requires; `§2.4` seam 1 and law 1 carry the same clause, and the red-first regression row
   is the TESTWRITER's).
9. **THE CLOSED STATE RECORD (`FocusState`) AND THE ENTRY RECORD (`FocusEntry`) — carried from step 3 and `I-4`.**

```ts
/** AN ENTRY'S OPAQUE IDENTITY. `unknown` is the WHOLE of the opacity declaration: it is
 *  a TYPE, not an adjective, so no coercion, no naming and no structural comparison
 *  is even available to this module (`§2.3` item 4). Identity equality (`===`) is the
 *  default rule, and there is NO comparator parameter and NO `equals` seam. */
export type FocusId = unknown

/** THE ENTRY RECORD — A CLOSED RECORD, THREE members, and NO fourth (`§2.3` item 1).
 *  `id`     — REQUIRED. The caller's own opaque identity, echoed INTO results and refusals
 *             BY IDENTITY (`===`) and never copied, never coerced, never consulted except
 *             by the ONE equality test the first-occurrence rule needs (`§2.3` item 4).
 *  `target` — REQUIRED. The caller's own opaque payload: CARRIED AND RETURNED, NEVER
 *             CONSULTED and NEVER COMPARED — not by the duplicate rule, not by any verb
 *             (`§2.3` item 5). Any JavaScript value, including `null`/`undefined`, an
 *             object, a function, a `Symbol`, a hostile `Proxy` or a revoked `Proxy`.
 *  `label`  — OPTIONAL, and the CALLER'S OWN STRING: it is ECHOED verbatim by `focusOrder`'s
 *             returned entries and is otherwise ABSENT. It is NEVER trimmed, lower-cased,
 *             prefixed, defaulted, parsed or validated, and this module owns no label
 *             vocabulary and no label literal (`§2.3` item 6). */
export interface FocusEntry {
  readonly id: unknown
  readonly target: unknown
  readonly label?: string
}

/** THE CLOSED FIVE-MEMBER VERB UNION — the transition alphabet, and no sixth member
 *  (`§2.1` item 5). An UNKNOWN verb is TOTAL: no throw, the prior state returned by
 *  identity, one refusal. */
export type FocusVerb = 'open' | 'activate' | 'close' | 'next' | 'prev'

/** THE CLOSED REFUSAL-CODE UNION — FIVE members, this unit's OWN, never borrowed
 *  from either landed host (`§2.1` item 7; `§2.2`(C) row 4). */
export type FocusRefusalCode = 'unknown-verb' | 'duplicate-id' | 'unknown-id' | 'no-next' | 'no-previous'

/** THE CALLER-OWNED STATE — TWO members, declared order `entries` · `activeId`.
 *  THE CALLER OWNS IT (`§0` ruling 1): this module never holds it, never mutates it,
 *  and returns it BY IDENTITY on every refusal. `activeId` is `null` when nothing is
 *  active; `entries` is the CALLER'S OWN ORDER — this module sorts nothing (`§2.3` item 3). */
export interface FocusState {
  readonly entries: readonly FocusEntry[]
  readonly activeId: FocusId | null
}
```

10. **THE THREE SIGNATURES, IN FULL, WITH THEIR RETURN SHAPES AND THEIR DECLARED DEGRADATIONS.**

```ts
/** THE SEAMS — all three OPTIONAL, and each with a DECLARED degradation (`§2.4`).
 *  `refuse`   — BORROWS the landed `slot-host.ts` single-call callback shape
 *               (`(refusal) => void`, ONE CALL, ONE REFUSAL RECORD) WITH THIS UNIT'S
 *               OWN closed code union (`§2.2`(C) row 4). OBSERVATION, NEVER THE GATE:
 *               the refusal lands in the result WHATEVER the callback does.
 *  `onChange` — NO LANDED PRECEDENT (`onChange` occurs nowhere in `src/**`), so its
 *               firing point and payload are FIXED HERE: it fires EXACTLY ONCE PER
 *               ACCEPTED TRANSITION and NEVER for a refused attempt (`§2.4` seam 2).
 */
export interface FocusTransitionArg {
  /** The caller's entry for the current attempt. Consumed ONLY by `'open'`, and
   *  REQUIRED by it: an `'open'` with an absent/malformed entry is refused
   *  `'duplicate-id'`? NO — it is refused `'unknown-id'` when the entry carries no
   *  own `id` member at all, and `'duplicate-id'` only when the id IS owned
   *  (`§2.3` items 5/8). Every other verb ignores this member entirely. */
  readonly entry?: FocusEntry
  /** The caller's opaque id for `'activate'`/`'close'`. Ignored by every other verb. */
  readonly id?: FocusId
  /** Notified ONCE PER REFUSAL, in attempt order, and NEVER the gate (`§2.4` seam 1). */
  readonly refuse?: (refusal: FocusRefusal) => void
  /** Notified EXACTLY ONCE PER ACCEPTED TRANSITION, and never for a refusal
   *  (`§2.4` seam 2). */
  readonly onChange?: (next: FocusState, previous: FocusState, refusal?: FocusRefusal) => void
}

/** THE TRANSITION — PURE, TOTAL, STATELESS. Returns the SEVEN-member `FocusResult`
 *  for the caller's `state` under the caller's `verb` and optional `arg`:
 *    - a REFUSED attempt returns the PRIOR `state` BY IDENTITY (`===`), `accepted: false`,
 *      EXACTLY ONE refusal, and `changed: false`;
 *    - an ACCEPTED attempt returns a FRESH `FocusState`, `accepted: true`, `refusals: []`,
 *      and `changed === (next !== previous)`;
 *    - an UNKNOWN verb is TOTAL: the prior state by identity, one `'unknown-verb'` refusal;
 *    - THE ENDS REFUSE: `'next'` at the last position is `'no-next'`, `'prev'` at the
 *      first is `'no-previous'` (`§2.3` item 5's table; `§7a.1` item 3 names the clamp
 *      reading as the architect-reversible alternative);
 *    - `refuse` is called EXACTLY ONCE per refusal, in attempt order, and its throw is
 *      ABSORBED; `onChange` is called EXACTLY ONCE per ACCEPTED transition, and its
 *      throw is ABSORBED. NEITHER SEAM IS RETAINED.
 *  IT MUTATES NO ARGUMENT, READS NO AMBIENT GLOBAL, HOLDS NO STATE BETWEEN CALLS AND
 *  NEVER THROWS. It does NOT call `persist` (`§2.1` item 4). */
export function focusTransition(
  state: FocusState,
  verb: unknown,
  arg?: FocusTransitionArg,
): FocusResult

/** THE CALLER'S SEQUENCE — returned as the CALLER'S OWN array, PERMUTED BY NOTHING.
 *  It SORTS NOTHING, applies NO comparator, reads NO `order`/rank member and holds NO
 *  order of its own: the returned sequence IS `entries`, in the caller's own order,
 *  with each entry carried BY IDENTITY (`§2.3` item 3). A non-array `entries` reads as
 *  the EMPTY SEQUENCE — no throw, no refusal, no other value (`§2.3` item 10).
 *  NEVER THROWS. */
export function focusOrder(entries: readonly FocusEntry[]): readonly FocusEntry[]

/** THE CALLER'S POSITION — a NUMBER, or the declared `-1`.
 *  Returns the ZERO-BASED index of the entry in `state.entries` whose `id` is
 *  `===`-equal to `id`, using the SAME identity rule the transition uses.
 *  Returns `-1` when the id is NOT OWNED: when no entry matches, when `state` carries no
 *  usable `entries` array, and — BY CONSTRUCTION — when `id` is `null` and no entry's id is
 *  `null`. The sentinel `-1` is the ONLY non-index value this function returns, and it is
 *  the family's own convention for "not in the set". NEVER THROWS; a non-array `entries`
 *  reads `-1`. */
export function focusIndex(state: FocusState, id: FocusId): number

/** THE RETURNED-WRITE SEAM — see `§0A` note 3: ITS NAME IS IMPRECISE AND THE IMPRECISION
 *  IS RECORDED HERE RATHER THAN PRESERVED SILENTLY.
 *  `persist(state)` CALLS NO STORAGE. It is an OPTIONAL caller-supplied callback that this
 *  module invokes with a state and whose RETURN VALUE is handed back to the caller
 *  (`FocusResult.persisted`). THIS MODULE STORES NOTHING, WRITES NO FILE, TOUCHES NO
 *  `localStorage`/`sessionStorage`/`indexedDB`, HOLDS NO STORE, KEEPS NO CACHE AND RETAINS
 *  NO REFERENCE to the seam or to its return value after the call returns.
 *    - `seam` absent or not callable  ⇒ `{present: false, value: undefined}`;
 *    - `seam` callable and it RETURNS ⇒ `{present: true, value: <the seam's own return>}`
 *      BY IDENTITY, whatever shape it is, including `undefined`;
 *    - `seam` callable and it THROWS  ⇒ `{present: false, value: undefined}`, the throw is
 *      SWALLOWED and NOTHING ESCAPES.
 *  NEVER THROWS. It is NOT a store, NOT a store write and NOT a persistence channel. */
export function persist(
  seam: unknown,
  state: FocusState,
): { readonly present: boolean; readonly value: unknown }
```

11. **THE DECLARED STRING LITERALS AND IDENTIFIERS, PINNED AS A CLOSED SET SO `§3.4 R-8`'s SCAN CAN BE FALSIFIED.**
    **THE MODULE OWNS EXACTLY ELEVEN DISTINCT STRING-LITERAL BODIES: `'open'` · `'activate'` · `'close'` · `'next'`
    · `'prev'` (the CLOSED FIVE verb bodies) · `'unknown'` (THE DECLARED NORMALISED VERB BODY — `§2.1` item 3's
    `verb` member, and NOT a sixth verb) · `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` ·
    `'no-previous'` (the CLOSED FIVE refusal codes) — NAMED EXACTLY, ELEVEN distinct bodies, with `'unknown'` counted
    once even though it is a PREFIX of two codes and a member of neither.** **THE ELEVEN ARE ALSO THE `R-8` EXEMPTION
    SET, NAMED HERE SO NO SCAN ROW IS VACUOUS** (`§4.4 S-FM-2`). **THE MEMBER NAMES, THE FUNCTION NAMES AND THE TYPE
    NAMES ARE IDENTIFIERS, NEVER LITERALS.** **THE CLAIM HAS BOTH CONTROLS:** a module carrying **a consumer-noun
    literal** (`'tab'`, `'pane'`, `'zone'`, `'region'`, `'dashboard'`, `'is-active'`), **an endpoint-shaped literal**
    (`'opened'`, `'refused'`, `'activeId'`, `'entries'`), **a DOM-verb literal** (`'activeElement'`, `'focus'`,
    `'blur'`), **a store literal** (`'localStorage'`, `'indexedDB'`, `'file'`), **a FOURTH result or state body**, **a
    SIXTH verb body** or **a SIXTH refusal code** FAILS the row; a module carrying exactly the declared eleven PASSES
    it. **⚠ AND THE LIMIT, STATED SO NO ROW OVERREACHES: this module needs NO `typeof` tag at all** — **it branches on
    no argument's `typeof`** (`§3.4 R-7`) — **so unlike the `E5-B-1`-class siblings, a `typeof`-tag body is NOT in
    this unit's allowed set, and a module carrying one is neither required nor licensed to.** **A row that asserts
    *"the module's only literals are the verb bodies"* reddens the refusal domain and is `S-FM-7`'s class.**
12. **THE CENSUS'S TWO HALVES, RESTATED IN THE FORM `G-1` REQUIRES (the names NAMED, twice, so the claim can never
    be read as a bare count):** **VALUE HALF = `focusTransition` · `focusOrder` · `focusIndex` · `persist` (`4`) ·
    TYPE HALF = `FocusId` · `FocusEntry` · `FocusVerb` · `FocusRefusalCode` · `FocusState` (`5`) · `4 + 5 = 9`.**
13. **THE OPTIONAL THIRD ARGUMENT AND THE OPTIONAL SEAM MEMBERS ARE DECLARED, AND THEIR OPTIONALITY IS PART OF THE
    CONTRACT.** **`arg` may be omitted or `undefined`, and each of `arg.entry`, `arg.id`, `arg.refuse` and
    `arg.onChange` may be omitted, `undefined` or an unusable value** — **every one of those shapes is READ TOTALLY**
    (`§2.3` item 10: a hostile holder, an absent member, an inherited member or a **throwing accessor** yields a
    declared value rather than an exception). **A row asserting that the module REFUSES an unusable seam or an
    unusable `arg`, or that it throws, FAILS `§4.4 S-FM-3`'s class.**

### 2.2 What is CALLER-SUPPLIED, the prohibitions, the twelve-token collision reconciliation, and the semantics table

**Caller-supplied (never built in, never defaulted, never enumerated):** the **`state`** record (`entries` +
`activeId`); the **`verb`** word; the **`arg`**'s `entry` and `id`; **every entry's `id`, `target` and optional
`label`**; and **all three seams** (`refuse`, `onChange`, `persist`). **Through the consumer, never through this
module:** the rendered entries, the key handling that selects a verb, the refusal presentation, the endpoint's output
shape and **every byte of storage**. **THE MODULE CONTAINS NO ELEMENT, NO NODE, NO LISTENER, NO STORE, NO DOMAIN
NOUN, NO STYLE, NO ARITHMETIC BEYOND AN INDEX COUNT AND A `-1` SENTINEL, NO SORT, NO COMPARATOR CALL, NO POLICY AND
NO WRITE.**

**(A) THE `H-r8` `§0 Contract-prohibitions` SIX-ROW TABLE — one row per prohibition, each row NAMING the test that
pins it** (`H-r8`/ruling 4; the sibling form is `docs/specs/theme.md` `§2.2`(A), `docs/specs/zones.md` `§2.2`,
`docs/specs/overlay.md` `§2.2`(A) and `docs/specs/container.md` `§2.2`(A)). **A prohibition citing *"a static source
row"* with no id is not a row.**

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by (the test that pins it) |
| --- | --- | --- | --- |
| **`P-FM-1`** | **No consumer vocabulary** as a symbol, a closed string-union member, a default or a documented constant | **The module's own vocabulary is FOUR function names, FIVE type names, the THREE entry-member names, the SEVEN result-member names, the THREE refusal-member names, the FOUR seam/argument names, the FIVE verb bodies, the ONE normalised-verb body `'unknown'` and the FIVE refusal codes (`§2.1` item 11) — and NOTHING else.** **NO consumer noun (`tab`, `pane`, `zone`, `region`, `dashboard`, `strip`) and NO endpoint noun (`opened`, `refused`, `activeId`, `entries`) appears as a token, a symbol, a union member or a default** — **the caller's `id`, `target` and `label` pass through, exempt by name, and are NEVER interpreted** | **`R-1`** (the vocabulary scan, with its declared exemptions named and both controls), **`R-8`** (the closed-set literal row), `§5.5.1 P-FM-IM-1` |
| **`P-FM-2`** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates (`(C)#2`) | The module **authors no element, no text, no class, no attribute, no markup and no stylesheet** — it **returns a result value and a sequence.** **It renders no entry, wires no demo envelope and mounts nothing**: `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test is satisfied **because the module is not a UI element** | **`R-2`** (the no-DOM/no-write/no-listener row), `§3.3 I-6`, `§3.2 F-9` |
| **`P-FM-3`** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default (`(C)#3`) | **Every value is caller-supplied.** **The only degenerate values the module owns are the ABSENCE of a value it would otherwise have to fabricate: the `-1` sentinel, the empty sequence, the normalised body `'unknown'`, and `null`/`absent` `label`** — each DECLARED, each a VALUE, none a policy. **There is NO default verb, NO default entry, NO default id, NO default target, NO auto-advance, NO wrap policy, NO timer and NO key mapping** — **and THE ENDS REFUSE rather than clamp or wrap, which is itself a DECLARED reading with its alternative named** (`§7a.1` item 3) | **`R-1`**, **`R-8`**, **`R-11`** (the no-policy row), `§2.3` items 2/5/10, `§4.4 S-FM-4`, `P-FM-TP-1`/`P-FM-TP-2` |
| **`P-FM-4`** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` (`(C)#4`; `S-d4`) | **ZERO module-level state**: no store, no cache, no registry, no memo, no counter, no `Map`/`Set` **field**, no retained seam, no retained id, no retained target, no persistence channel and no module-level mutable binding. **Every call is a pure function of its arguments** — **and the STATE crosses the call boundary ONLY AS AN ARGUMENT, which is what makes this a reducer rather than the store its name forbids** | **`R-3`**, `§3.3 I-4`, `§5.5.1 P-FM-SM-2` |
| **`P-FM-5`** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry (`(C)#5`) — **a NON-GOAL ROW, never a licence** (`PROHIBITION-5-IS-AN-ADOPTION-BOUND`) | This module is **imported by no `src/**` file** and registers nothing: the pinned sets keep **exactly the names they carry today** (`ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` — asserted **BY NAME as SET equality, never by a number quoted here**, per `§4.4 S-FM-6`). **The module's contract REQUIRES no tool — and the tool is `F3`'s, through its OWN gate** | **`R-3`** (the file-set row), **`R-6`** (the diff-scope row), `§3.3 I-9` |
| **`P-FM-6`** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** (`(C)#6`; `H-r5`) | **Every row in this file is `[T]` or `static`** — three pure functions over arguments plus one caller seam — **so `(C)#6` is satisfied without a refusal of any half: there is no applied-attribute, rendered, OS or platform half in this contract at all** (`§5.2`'s three-part `[U]` refusal states the structural reason). **`src/shared/dom-shim.ts` gains no member** (`SHIM-COMPLETION-CARVE-OUT`/`H-r7` admit exactly one, and **this unit's order is the caller's array, so it needs no DOM reading AT ALL** — the second independent reason the denial holds) | **`R-9`** (the no-focus-walk/no-`matchMedia` row), **`R-10`** (the no-listener row), **`R-13`** (the no-second-order-authority row), `§5.2`, `§3.3 I-7`/`I-11` |

**(B) THE PROHIBITION TABLE'S FURTHER ROWS — the module's own derived prohibitions, each with an enumerated static
row.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **`P-FM-7`** | **NO SECOND ORDER AUTHORITY** — the module may not own an order, sort an entry set, hold a comparator invocation site, add a rank/position member, or memoise the caller's sequence | **`order` IS THE CALLER'S ARRAY** (`§2.3` item 3): `focusOrder` returns the caller's own sequence unchanged, the transition reads position from the index of the arrays as supplied, and **the module contains no `sort(`, no comparator call, no rank arithmetic and no cached sequence**. **The two landed hosts that project their own order are neither composed nor contradicted** (`§0A` note 7) | **`R-13`**, `§2.2`(C) row 3, `§2.3` item 3, `§5.5.1 P-FM-SM-1` |
| **`P-FM-8`** | **NO FOCUS WALK, NO ELEMENT, NO LISTENER, NO AMBIENT INTERACTION** — the shim's ban is upheld in full | **No `activeElement`, no focusable walk, no `focus(`/`blur(`, no `matchMedia`, no listener, no capture and no root.** **The module's reads are a `===` equality test on ids, an array index read and a record-member read** (`§2.6` item 1) | **`R-9`**/`R-10`, `§3.3 I-8`, `§0` ruling 15 |
| **`P-FM-9`** | **NO WRITE OF ANY KIND AND NO STORAGE CALL** — no `setAttribute`/`removeAttribute`/`classList`/`style`/`setProperty`, no element parameter, no file write, no `localStorage`, no `indexedDB`, and **no store handle** | **The module returns values; the `persist` seam's returned value goes to the CALLER through `FocusResult.persisted`** (`§0A` note 3; `§2.4` seam 3), **and nothing this module does can write anywhere** | **`R-2`**, **`R-3`**, `§2.4` seam 3, `§5.5.1 P-FM-SEAM-3` |
| **`P-FM-10`** | **NO FACTORY, NO SESSION, NO OPTIONS OBJECT AND NO STATE HELD BETWEEN CALLS** | **The value half carries no `create…` name; the module holds no `{entries, activeId}`, no history and no seam reference; and a repeated call with the same arguments returns an EQUAL result with a FRESH state record on the accepted arm and the SAME state by identity on the refused arm** | **`R-5`**, `§3.3 I-2`/`I-12`, `§5.5.1 P-FM-SM-2` |
| **`P-FM-11`** | **NO FABRICATED EDGE TO ANY SIBLING OR TO THE FORK'S STREAMS** | **ZERO import statements**; `docs/specs/gsession.md`, `docs/specs/listhost.md`, `docs/specs/slothost.md`, the demo envelope, `docs/specs/ci-divergence-leg.md`'s channel, the fork's documentation half and every sibling surface are **named here ONLY as boundaries** — never composed, never imported, never re-expressed | **`R-4`**/**`R-11`**, `§2.5` items 1/3/4, `§3.3 I-10` |

**(C) THE TWELVE-TOKEN COLLISION RECONCILIATION ROWS — the reconciliation this filing owes, in the record's own form:
*"banned in layer X, legitimate in layer Z because …"*.** **Each ban site's own SCOPE is quoted; the reconciliation is
a DERIVATION WITH DECLARED EXEMPTIONS AND BOTH CONTROLS, never a relaxation of a landed prohibition** (the boundary
clause `docs/specs/relocate.md` `§2.3` item 3 states: *"the bans stay … the fix is a reconciliation step, never a
relaxation of a prohibition"*). **THE TOKEN SET IS EVERY TOKEN THIS UNIT INTRODUCES**, and **row 3 is the row step 1
called *"the sharpest"*** (`docs/specs/focus-model-review.md` `§2.2` row 3; `§2.4`'s `order` row).

| # | Token | Where it is BANNED, and the ban's own scope (quoted) | Why this unit is legitimate there — the reconciliation |
| --- | --- | --- | --- |
| **1** | **`focus`** (the word in this module's own name and prose) | **BANNED IN LAYER the shim / runtime FOR the reason that a focus walk needs a live DOM the shim does not model** — the ban is ABSOLUTE: no `activeElement`, no focusable walk (`docs/specs/focus-model-review.md` `§2.4`'s `focus` row), **and `H-r5`'s list repeats it verbatim** (*"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam"*; *"the sibling `E9` unit's focus-trap half was refused on exactly that ground"*) | **BANNED in the shim/renderer layer FOR that reason. LEGITIMATE in `src/shared/focus-model.ts` BECAUSE the module reads NO DOM, holds NO element, wires NO event and NEVER touches `activeElement` or any focusable set** — **its order is THE CALLER'S ARRAY** (`§2.3` item 3). **THE RECONCILIATION IS A SCAN ROW, NOT A PROSE NOTE: `R-9` is the row, and the module's own export census and import census `0` are its falsifier.** **BOTH CONTROLS: a corpus reading `document.activeElement` or calling `element.focus()` FAILS `R-9`; this module, which does neither, PASSES — and the word `focus` in THIS FILE's prose names a transition model over the caller's entries and nothing else** (`§2.4`'s `focus` row, carried as dossier `X-1`). **NO RE-NAME IS REQUESTED** |
| **2** | **`focusTransition` · `focusOrder` · `focusIndex` · the five verb members · `id` · `target` · `label`** | **BANNED IN LAYER this unit FOR the reason that `A-d5`'s NO-VOCABULARY clause forbids consumer vocabulary as a symbol, union member or default**: *"`'tab'`/`'pane'`/zone/region may not appear as a symbol, union member or default"* (`docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`) | **BANNED everywhere for that reason. LEGITIMATE BECAUSE NO MEMBER IS A CONSUMER NOUN:** **`open`/`activate`/`close`/`next`/`prev` are BEHAVIOUR words**, and **`id`/`target`/`label` are the CALLER'S OWN SLOTS** — the module owns no member literal and no value vocabulary. **THE EXEMPTION IS NAMED RATHER THAN VAGUE, and the row is falsifiable: a `'tab'`, `'pane'`, zone or region noun ANYWHERE in this module's bytes, comments included, FAILS `R-1`** (dossier `X-2`) |
| **3** | **`order` · `entries` · `activeId` — THE SECOND-ORDER-AUTHORITY ROW (step 1's sharpest collision)** | **BANNED IN LAYERS `src/shared/owned-list-host.ts` AND `src/shared/slot-host.ts` FOR the reason that each of the two LANDED hosts already PROJECTS its own order** — *"the host projects an order; it does not sort a graph; **no graph pass on order change**"* (`docs/specs/listhost.md` `§2.4`/`§6`, its `orderOf`/`order`/`setOrder` surface), and *"omitted `orderOf` ⇒ the supplied `keys` order; **no sorting occurs**"* (`docs/specs/slothost.md` `§2.5` item 1, its `orderOf` seam). **A third projection would be a SECOND ORDER AUTHORITY** (`docs/specs/focus-model-review.md` `§2.4`'s `order` row: *"the reconciliation is not "is the token free" but "which of the two landed projections owns it, and what does `F2` add"*") | **BANNED in those layers as an ORDER-OWNERSHIP claim. LEGITIMATE in THIS module BECAUSE THIS UNIT OWNS NO ORDER AT ALL: `order` IS THE CALLER'S ARRAY** (`§2.3` item 3) — `focusOrder` **returns the caller's own sequence, permuted by nothing and sorting nothing**; the transition **reads positions from the arrays as supplied**; and **the module contains NO `sort(`, NO comparator call, NO rank member and NO memo of the sequence.** **THE EXEMPTION IS NAMED: the caller's own array — and that is exactly what both landed hosts also treat as their base order.** **THE RECONCILIATION IS A SCAN ROW (`R-13`), NOT A PROSE NOTE.** **BOTH CONTROLS: a corpus carrying a `sort(`, a comparator invocation, a `rank` member or a cached sequence FAILS `R-13`; this module, which carries none, PASSES — and a pass asserting an IMPORT EDGE or a COMPOSITION between this module and either landed host is asserting a FABRICATED EDGE** (`§0A` note 7; `§5.1` item 12) |
| **4** | **`refuse` — THE LANDED-SHAPE COLLISION** | **THE COLLISION IS IN THE LANDED BYTES: `refuse` EXISTS TWICE IN INCOMPATIBLE SHAPES** — `src/shared/slot-host.ts`'s **single-call callback** (`readonly refuse?: (refusal: SlotHostRefusal) => void`, *"Notified ONCE per refusal … NEVER lets it change the refusal's outcome"*) **versus `src/shared/owned-list-host.ts`'s COLLECTED REFUSAL ARRAY** (`readonly refused: readonly ListHostRefusal[]`, *"Refusals of THIS call, in encounter order"*). *"A filing that copies either `refuse` shape silently acquires a precedent; a filing that invents a third acquires a second authority"* (`docs/specs/focus-model-review.md` `§2.2` row 3; `§6` `FM-3`) | **THE COLLISION IS RECONCILED BY NAME, IN THE DEMANDED FORM: the SINGLE-CALL CALLBACK SHAPE is taken** (`(refusal) => void`, one call, one refusal record) **and the collected-array form is BANNED IN THIS MODULE FOR the reason that TWO refusal shapes in one module is a second authority.** **LEGITIMATE BECAUSE EXACTLY ONE of the two landed forms is adopted, and THE UNION IT CARRIES IS THIS UNIT'S OWN** — **so the module is CONFORMANT to a landed shape WITHOUT inheriting a landed union's vocabulary** (dossier `X-3`/`I-2`). **AND THE SENSE IN WHICH THE MODULE STILL CARRIES AN ARRAY IS STATED SO THE ROW IS NOT A CONTRADICTION: `FocusResult.refusals` is the RESULT's own data (length `0` or `1`), NOT a refusal-collecting seam** — **the seam is the callback, and the array is the record** (`§2.3` item 8) |
| **5** | **`persist`** | **BANNED IN THIS UNIT FOR the reason that a module that CALLS STORAGE has acquired the store its charter forbids.** **THE LANDED MEANING IS THE FORBIDDEN ONE: `persist` EXISTS IN `src/**` ONLY AS MAIN-SIDE STORE INTERNALS** (`src/main/module-store.ts`'s `persist()` and `src/main/security-store.ts`'s `persist()`; *"`persist` EXISTS ONLY AS MAIN-SIDE STORE INTERNALS — i.e. the one landed meaning of the word is the meaning the charter's own no-store clause forbids"*, `docs/specs/focus-model-review.md` `§2.4`'s `persist` row) | **BANNED as a storage act. LEGITIMATE ONLY AS A RETURNED VALUE — `persist(seam, state)` CALLS NO STORAGE, WRITES NOTHING AND STORES NOTHING, and its returned value goes to the CALLER through `FocusResult.persisted`** (`§0` ruling 1; step 3 `§4` item 4). **AND THE NAME IS RECORDED AS IMPRECISE RATHER THAN PRESERVED SILENTLY: `§0A` note 3's clause is the record, and the module's own type doc repeats it.** **BOTH CONTROLS: a corpus calling `localStorage.setItem`, `fs.writeFile`, `indexedDB.open` or touching a store FAILS `R-3`/`R-11`; this module, which only calls the caller's own callback, PASSES.** **NO RE-NAME IS TAKEN HERE: the token is the CHARTER's** (dossier `X-5`; `§7a.1` item 2's alternative) |
| **6** | **`entries` · `activeId` — THE ENDPOINT SHAPE'S OWN NOUNS** | **BANNED IN THIS MODULE FOR the reason that `opened` and `refused` are consumer vocabulary the `no vocabulary` clause does not obviously admit** — **the `F2`→`F3` boundary's already-pinned consumer shape is `activeId` / `entries` / `opened` / `refused`** (`docs/specs/focus-model-review.md` `§3.1` finding 2) | **BANNED as an OUTPUT shape here. LEGITIMATE BECAUSE THE ENDPOINT SHAPE IS PRODUCED BY THE CONSUMER AND NEVER RETURNED HERE** (`§2.5` item 7) — **and the only bridge is the CALLER-OWNED optional `label`**, which lets the consumer reach its own shape **without this module owning a single one of its nouns** (dossier `X-6`). **THE NARROW FORM THIS CONTRACT PINS: `entries` and `activeId` are members of THE CALLER'S OWN `FocusState` — the caller's slots, named once and echoed — and `opened` and `refused` DO NOT APPEAR IN THIS MODULE'S BYTES AT ALL.** **FALSIFIER: the string `opened` or `refused` appearing in the module's identifiers, members, union members or literals FAILS `R-1`/`R-8`** |
| **7** | **The five verb members vs the renderer's `MUTATING_METHODS` set and the `'focus'` METHOD** | **BANNED-for-this-unit only in the sense that a verb member must NEVER BECOME A CALLABLE NAME** — *"a METHOD ABSENT FROM THE MUTATING LIST STILL CROSSES THE EXISTING IPC INVOKE PATH"* (`docs/specs/focus-model-review.md` `§3.2` `FQ3`) | **LEGITIMATE BECAUSE THE VERB UNION IS A PURE DATA DOMAIN THE CALLER SUPPLIES: the module registers no method, routes nothing, and adds nothing to `MUTATING_METHODS`, `ALL_TOOLS`, `RpcMethod` or `VALID_GROUPS`** (`§2.2` `P-FM-5`; dossier `X-7`). **AND THE ROUTE QUESTION IS NOT ANSWERED HERE: `FQ3` is ROUTED to the consumer unit's record** (`§5.4`), **with the note that EXCLUSION FROM A RENDERER-SIDE MUTATING SET NEVER DECIDED THE INVOKE PATH** |
| **8** | **The refusal-code bodies · the `-1` sentinel · the empty sequence** | **NOT BANNED IN ANY LAYER — NO LANDED ROW COVERS THEM — but they are NEW VOCABULARY and owe the family's own check**: the two landed `refuse` shapes carry **NO code union this unit can adopt** (`docs/specs/focus-model-review.md` `§2.2` row 3: *"the two landed `refuse` shapes carry NO code union this unit can adopt"*, carried as dossier `I-5`'s negative half) | **LEGITIMATE BECAUSE THEY ARE THIS UNIT'S OWN CLOSED UNION AND ARE NOT ADOPTED FROM ANYWHERE** (step 3 `§4` item 4: *"THIS unit's own closed union"*). **THE RECONCILIATION IS NOT AN EXEMPTION BUT AN OWNERSHIP CLAIM: because nothing is borrowed, nothing is relaxed.** **AND THE FAMILY'S COLLISION CHECK IS RUN: no code body collides with a landed refusal code** — `slot-host.ts`'s union is `'unknown-key' | 'no-container' | 'malformed-node' | 'container-not-appendable'` and `owned-list-host.ts`'s carries `'no-node'`/`'duplicate-key'`/`'malformed-entry'`/`'no-mount'`-class members — **so this unit's five bodies are DISTINCT SPELLINGS with no overlapping meaning.** **BOTH CONTROLS: a module emitting `'unknown-key'` or `'duplicate-key'` FAILS `R-8`; a module emitting this unit's five PASSES** |
| **9** | **`FocusId` · the identity equality rule · the absence of an `equals` seam** | **NOT BANNED, AND NOT COVERED BY A LANDED ROW: `"opaque" has no falsifiable definition here** (`docs/specs/focus-model-review.md` `§3.1` finding 4) — **and the sibling precedents are NARROWER than this token: `SlotKey = string` and `ListKey = string` are STRING ALIASES, so both landed hosts compare STRINGS** | **LEGITIMATE BECAUSE OPACITY IS DECLARED AS A TYPE HERE — `FocusId = unknown` — WITH A NAMED EQUALITY RULE: IDENTITY (`===`)** (`§2.3` item 4). **THE COLLISION IS THAT THE TWO NEAREST LANDED HOSTS HAVE `string` KEYS AND THIS UNIT DOES NOT** — **and the reconciliation is the DERIVATION, not an exemption: this module's ids are ANY value, compared by identity, and `Map`/`Set` KEYING IS PERMITTED ONLY BECAUSE IT COERCES NOTHING while OBJECT KEYING IS BANNED.** **BOTH CONTROLS: a module that keys a plain object by an id, or that compares ids with `<`/`>`/`localeCompare`, FAILS `R-7`/`R-13`; a module using `===` or `Map`/`Set` PASSES** |
| **10** | **`label` — THE ONE STRING IN THE ENTRY RECORD** | **BANNED IN LAYERS `theme.md`/`overlay.md`/`menulib.md` FOR the reason that those modules must carry NO attribute name and NO consumer text** — *"no `data-theme` literal (the mechanism may not document it)"* (`docs/specs/theme.md` `§0` ruling 2), and `menulib.md`'s scan sweeps consumer vocabulary over its own bytes | **BANNED in those layers. LEGITIMATE HERE BECAUSE `label` IS THE CALLER'S OWN OPTIONAL STRING, ECHOED OR ABSENT: this module contains NO label literal, NO default label, NO label prefix, NO label vocabulary and NO label validation** (`§2.3` item 6). **It is the BRIDGE the dossier names (`I-4`): the caller reaches the endpoint shape without this module owning a single consumer noun.** **BOTH CONTROLS: a module defaulting a label, trimming one, or carrying a label literal FAILS `R-1`/`R-8`; this module, which echoes or omits, PASSES** |
| **11** | **`onChange`** | **NOT BANNED ANYWHERE — AND THAT IS EXACTLY THE PROBLEM THIS ROW RECORDS: `onChange` OCCURS NOWHERE IN `src/**`, so there is NO LANDED PRECEDENT** (`docs/specs/focus-model-review.md` `§2.2` row 3: *"`onChange` OCCURS NOWHERE IN `src/**`"*, carried as dossier `I-1`/`X-4`'s negative half) | **LEGITIMATE, AND THE ROW IS AN ABSENCE ROW RATHER THAN AN EXEMPTION: nothing is relaxed because nothing was banned.** **THE CONSEQUENCE IS THE REASON THE ROW EXISTS: because there is no precedent to copy, THIS FILING FIXES THE FIRING POINT AND THE PAYLOAD** (`§2.4` seam 2 — fires exactly once per ACCEPTED transition; payload `(next, previous, refusal?)`) **and the payload's shape is pinned by `P-FM-SEAM-2`'s row.** **AND THE `refuse`-SHAPED CALLBACKS IN `src/**` ARE THE NEAREST LANDED FORM, so the BORROWED SHAPE is the single-call callback — this unit's `onChange` conforms to that arity-and-observation form while carrying this unit's own arguments** (dossier `X-3`/`X-4`) |
| **12** | **`persist`'s return value · `FocusResult.persisted`** | **NOT BANNED — AND THE FORM IS THE FAMILY'S LANDED ONE: a RETURNED WRITE the consumer applies** (`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`, `docs/decisions.md`, ACTIVE: *"the module RETURNS the declaration TEXT and the consumer applies it"*; `returned` is not `written`) | **LEGITIMATE BECAUSE `persisted` IS DATA ON A RETURNED VALUE AND NOT A STORE HANDLE** — **the caller receives it and the module retains nothing** (`§2.4` seam 3). **THE RECONCILIATION IS THE LANDED PRECEDENT, NAMED RATHER THAN INVOKED: `U-THEME` (`E8`, `DONE`) and `U-OVERLAY` (`E9`, `DONE`) are the siblings of this row, and this unit ASSERTS NO EDGE TO EITHER** (`§2.2` `P-FM-11`; `§5.1` item 12) |

**(D) THE SEMANTICS TABLE FOR EVERY IDENTIFIER THIS CONTRACT NAMES — and NONE of them is
`undefined-until-answered`, so `G-3` is satisfied as a CONTRACT FACT and not merely as a dossier fact.** **Every row
states the identifier's REFERENT, its DOMAIN and its SOURCE, so no TestWriter has to guess what a name means.**

| Identifier | What it IS (the referent) | Its domain (exactly) | Its source |
| --- | --- | --- | --- |
| **`focusTransition`** | a **value export**: the pure, total, stateless reducer | the input domain is **ANY `state` value × ANY `verb` value × ANY `arg` value (optional)**; the return is **`FocusResult`** | caller — the module's own name (step 3's `§4` item 2) |
| **`focusOrder`** | a **value export**: the caller's sequence, **returned as supplied because order IS the caller's array** | the input domain is **ANY `entries` value** (a non-array reads as the empty sequence); the return is **a `readonly FocusEntry[]`** | caller — the module's own name (step 3's `§4` item 2) |
| **`focusIndex`** | a **value export**: the caller's position for an id | the input domain is **ANY `state` value × ANY `id` value**; the return is **a `number`, and exactly `-1` when the id is unowned** | caller — the module's own name (step 3's `§4` item 2) |
| **`persist`** | a **value export**: the **RETURNED-WRITE seam** — it calls the caller's callback and hands its return value back, and **stores nothing** (`§0A` note 3) | the input domain is **ANY `seam` value × ANY `state` value**; the return is **`{present: boolean; value: unknown}`** | caller — `A-d5`'s seam NAME; **the returned-write form is step 3's `§4` item 4** |
| **`FocusId`** | a **type declaration**: **opacity declared as a TYPE rather than as an adjective** | **`unknown`** — with **identity (`===`) equality as the one rule** — **AND `undefined` IS DECLARED A LEGAL OPAQUE ID *VALUE* INSIDE THAT DOMAIN, DISTINCT FROM `null`** (`§0A` note 10 item 2: `undefined` is CARRIED BY IDENTITY wherever the caller supplied it, and `null` is a DIFFERENT value that the domain also admits — so neither may be mapped onto the other) | caller — step 3's `§4` item 3; dossier `I-6` |
| **`FocusEntry`** | a **type declaration**: the CLOSED entry record | **THREE members, declared order `id` · `target` · `label`; `id` and `target` REQUIRED, `label` OPTIONAL; a FOURTH member is a contract violation; `label`, when present, is a `string`** | caller — step 3's `§4` item 3; dossier `I-4` |
| **`FocusVerb`** | a **type declaration**: the CLOSED verb alphabet | **exactly five members — `'open'` · `'activate'` · `'close'` · `'next'` · `'prev'` — and no sixth; a CONSUMER NOUN is never a member** | caller — `I-3`'s adopted set, carried verbatim (step 3's `§4` item 6) |
| **`FocusRefusalCode`** | a **type declaration**: the CLOSED refusal-code union, **this unit's own** | **exactly five emitted members — `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'`** (the adopted count `6` and the filing's reading `5` are reconciled in the open at `§2.1` item 7) | **this contract — this filing's derivation** (`§0A` note 6), under `I-5`'s adopted COUNT and OWNERSHIP |
| **`FocusState`** | a **type declaration**: the CALLER-OWNED state record | **TWO members, declared order `entries` · `activeId`; `entries` is `readonly FocusEntry[]`; `activeId` is `FocusId \| null`; a THIRD member is a contract violation** | caller — step 3's `§4` item 1/3; dossier `D-2`'s ownership clause |
| **`FocusResult`** | the **RETURNED transition value** — a plain record the caller reads and holds | **SEVEN members, declared order `state` · `accepted` · `verb` · `refusals` · `seated` · `changed` · `persisted`; an EIGHTH member is a contract violation** | **this contract — this filing's derivation** (`§0A` note 6) |
| **`FocusRefusal`** | the **returned refusal record** — DATA, never a callback's verdict | **THREE members, declared order `code` · `verb` · `id`** | **this contract — this filing's derivation** (`§2.1` item 8) |
| **`FocusTransitionArg`** | the **caller's optional per-attempt argument record** | **FOUR members, all OPTIONAL: `entry` · `id` · `refuse` · `onChange`; any subset may be absent** | **this contract — this filing's derivation**; its `refuse` shape is `I-2`'s borrowed one |
| **`state`** (the parameter) | **the CALLER's own state record** — never a value this module mints | **ANY JavaScript value**; a record carrying a usable `entries` array and an `activeId` reads its own values; **EVERY other shape reads the declared empty-state behaviour** (`§2.3` item 10) | caller — step 3's `§4` item 1 |
| **`state`** (the returned member) | **the state the caller should hold next** | **the PRIOR state BY IDENTITY for a refused attempt; a FRESH `FocusState` for an accepted one** | this contract — `§2.3` item 9 |
| **`accepted`** | **the COMMIT flag** | **a `boolean`: `true` exactly when the attempt committed** | this contract — `§2.3` item 9 |
| **`verb`** (the argument) | **the CALLER's own verb word** — never enumerated by the mechanism beyond its five bodies | **ANY JavaScript value**; the five declared bodies are the alphabet and **EVERY other shape (omitted, `null`, a number, a `Symbol`, a `12n`, an object, a function, a hostile `Proxy`, a revoked `Proxy`, an UNRECOGNISED string) is normalised to the declared `'unknown'` body** (`§2.3` item 2) | caller — `I-3`; the normalisation body is this filing's |
| **`verb`** (the result member) | **the VERB OF RECORD** | **a member of the closed five, OR the declared normalised body `'unknown'`** | this contract — `§2.3` item 2 |
| **`refusals`** | **the attempt's refusal DATA** | **a `readonly FocusRefusal[]`: EMPTY for an accepted attempt, EXACTLY ONE element for a refused one** | this contract — `§2.3` item 8 |
| **`seated`** | **the active id the attempt left behind** | **`FocusId \| null`: the caller's own id value BY IDENTITY when something is active, `null` when nothing is** | this contract — `§2.3` item 9 |
| **`changed`** | **the DECLARED change observable** | **a `boolean`: `true` exactly when the attempt was ACCEPTED and `next !== previous` by `state` identity** | this contract — `§2.3` item 9 |
| **`persisted`** | **the SEAM 3 hand-back** | **`{present: boolean; value: unknown}`: `present` is `true` exactly when the seam was CALLABLE and was CALLED, and `value` is that seam's own return BY IDENTITY** | this contract — `§0A` note 3, `§2.4` seam 3 |
| **`entries`** | **the CALLER's own ordered entry array** — **THE ORDER AUTHORITY OF THIS CONTRACT** | **ANY JavaScript value**; a **usable array** reads its own elements in its own order, **and every other shape reads the empty sequence** | caller — `A-d5`'s *"ordered-entry"*; **the array-as-order reading is step 3's `§4` item 6** |
| **`activeId`** | **the CALLER's own active-id slot** | **`FocusId \| null`** — the caller's own value by identity, or `null` — **AND THE TWO ARE NOT INTERCHANGEABLE: `undefined` is a LEGAL opaque id value CARRIED BY IDENTITY, `null` is the declared "nothing active" reading and is DISTINCT FROM IT** (`§0A` note 10 item 2) | caller — step 3's `§4` item 1 |
| **`id`** (entry member, and the `arg` member) | **the CALLER's opaque identity** — the mechanism may not name, coerce, resolve or structurally compare it | **ANY JavaScript value**; compared for equality by `===` ONLY, echoed by identity, and **NEVER copied** | caller — `A-d5` (*"opaque ids"*); dossier `I-6` |
| **`target`** | **the CALLER's opaque payload** — **NEVER CONSULTED and NEVER COMPARED** | **ANY JavaScript value**, including `null`/`undefined`, an object, a function, a `Symbol`, a hostile `Proxy` or a revoked `Proxy`; echoed by identity | caller — `A-d5` (*"opaque … targets"*); dossier `I-7` |
| **`label`** | **the CALLER's own optional string** — echoed or absent, and the ONLY bridge to a consumer's own shape | **ANY JavaScript value MAY be supplied, but NON-STRING values are NOT a label: the entry's own `label` is echoed only when it is a `string`, and the member is ABSENT otherwise** (`§2.3` item 6) — **⟶ RE-DERIVED BESIDE THIS AS-FILED SENTENCE (`2026-09-27`, supervisor-ADJUDICATED after gate 5's `FM-11`; the dated note is `§0A` note 10 item 3): THE ABSENCE RULE GOVERNS THE LABEL THE MODULE WOULD SYNTHESIZE, NOT THE CALLER'S OWN OBJECT.** **The module NEVER MINTS, COERCES OR STRIPS a label: it carries the CALLER'S OWN ENTRY — and therefore that entry's own `label` member, whatever its type — BY IDENTITY.** **THE AS-FILED PAIR — this row's *"the member is ABSENT otherwise"* read together with `§2.3` item 3(a)'s and `§3.1 M-8`'s *"the CALLER'S OWN entry objects BY IDENTITY (`toBe`)"* — WAS JOINTLY UNSATISFIABLE: A CALLER'S OWN OBJECT CANNOT LOSE A MEMBER, so the two halves could never both hold for a caller-supplied NON-STRING label.** **ITS FALSIFIER: A BODY THAT MINTS A LABEL WHERE THE CALLER GAVE NONE, OR THAT STRIPS OR COERCES ONE THE CALLER SUPPLIED, MUST FAIL** (`§0A` note 10's obligations) | caller — dossier `I-4`; the endpoint shape of `§3.1` finding 2 |
| **`refuse`** | **the caller's refusal observer, handed in as an ARGUMENT** | **ANY JavaScript value, and OPTIONAL**; a **callable is INVOKED EXACTLY ONCE per refusal, in attempt order; a throw and a non-callable are both ABSORBED** | caller — `A-d5`'s seam NAME; **the single-call SHAPE is `slot-host.ts`'s, borrowed** (dossier `I-2`) |
| **`onChange`** | **the caller's change observer, handed in as an ARGUMENT** | **ANY JavaScript value, and OPTIONAL**; a **callable is INVOKED EXACTLY ONCE per ACCEPTED transition and NEVER for a refusal; a throw and a non-callable are both ABSORBED** | caller — `A-d5`'s seam NAME; **NO LANDED PRECEDENT — the firing point and payload are fixed by THIS contract** (`§2.4` seam 2) |
| **`persist`** | **the caller's returned-write callback** — **its name is IMPRECISE and the imprecision is recorded** | **ANY JavaScript value, and OPTIONAL**; a **callable is CALLED with the state and its return value is handed back; an absent, non-callable or THROWING seam reads `{present: false, value: undefined}`** | caller — `A-d5`'s seam NAME; **the returned-value form is step 3's `§4` item 4** |
| **`FocusEquality`** | **NOT A NAME IN THIS CONTRACT — recorded so its ABSENCE is not read as an omission.** **There is NO `equals` parameter, NO `orderOf`-shaped comparator and NO `equality` seam in any signature**: identity (`===`) is the ONE rule, and the `equality?` reading is the **REVERSIBLE ALTERNATIVE** named at `§7a.1` item 1's cell | **not this module's subject in any respect** | step 3's `§4` items 2/3 fix the three signatures WITHOUT a comparator member — **so this row records an ABSENCE, not a slot** |
| **`'unknown'`** | **the declared NORMALISED VERB BODY** — a member of the RESULT's `verb` slot and **NOT a sixth verb and NOT a state word** | **exactly one string body, `'unknown'`** | this contract — `§2.3` item 2 |
| **the five verb bodies** | **the transition alphabet** — instrument vocabulary the mechanism owns | exactly `'open'` · `'activate'` · `'close'` · `'next'` · `'prev'`, **and no sixth** | caller — `I-3`, carried verbatim |
| **the five refusal codes** | **the refusal domain's closed set** — this unit's OWN | exactly `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'` | this contract — `§2.1` item 7 |
| **`F3` (`U-FOCUS-TOOL`) and the endpoint's output shape** | **the CONSUMER's surface** — the tool, its group, its route and the `activeId`/`entries`/`opened`/`refused` shape | **not reachable by any value this unit returns**, and **DENIED to this unit's diff** | `§5.1`'s DENIED set; `§2.5` item 7; the dossier's `§5` |
| **`docs/skills/designing-pages.md` · the demo envelope · `src/renderer/**`** | **the page-design layer and the CONSUMER's rendered surface** | **NOT THIS UNIT'S**: the file does not exist, and **the demo envelope and the renderer are DENIED paths** | `§5.1` items 1/4/13; `§3.5 X-5` |

### 2.3 The value/opacity rules — stated falsifiably

**Item 1 — THE ENTRY IS A CLOSED RECORD, AND ITS `id`/`target` ARE OPAQUE CALLER VALUES ECHOED BY IDENTITY.**
**THE THREE MEMBERS, AND NOTHING ELSE:** **`id` (required)**, **`target` (required)**, **`label` (optional)**.
**THE FALSIFIABLE HALVES:** **(a) a module that reads a FOURTH member, that requires a member the record does not
declare, that invents a default `id` or `target`, or that returns a record carrying a fourth key, FAILS
`P-FM-IM-1`'s entry half**; **(b) an entry passed into a result or a refusal carries **the CALLER'S OWN `id` and
`target` BY IDENTITY (`toBe`), never a copy, never a wrapper and never a coercion**; and **(c) the `label` member is
ECHOED when it is a `string` and ABSENT otherwise — **a module that coerces a number into a label, or that defaults
one, FAILS `P-FM-IM-1`.** **⟶ AND (c) IS RE-DERIVED BESIDE ITS AS-FILED FORM (`2026-09-27`, supervisor-ADJUDICATED
after gate 5's `FM-11`; the dated note is `§0A` note 10 item 3): THE ABSENCE RULE GOVERNS THE LABEL THE MODULE WOULD
**SYNTHESIZE**, NOT THE CALLER'S OWN OBJECT.** **The module MINTS no label, COERCES no label and STRIPS no label; it
carries the CALLER'S OWN ENTRY **BY IDENTITY** — so a caller's own non-string `label` member SURVIVES on that caller's
own object, and (c)'s as-filed *"ABSENT otherwise"* is NOT a licence to strip it.** **THE AS-FILED PAIR — this item's
(c) read with item 3(a)'s and `M-8`'s identity half — WAS JOINTLY UNSATISFIABLE: A CALLER'S OWN OBJECT CANNOT LOSE A
MEMBER.** **ITS FALSIFIER: A BODY THAT MINTS A LABEL WHERE THE CALLER GAVE NONE, OR THAT STRIPS OR COERCES ONE THE
CALLER SUPPLIED, MUST FAIL** (`§0A` note 10's obligations). **THE ENTRY SET IS THE CALLER'S ARRAY, IN THE CALLER'S ORDER** (`§2.3` item 3).

**Item 2 — THE VERB NORMALISATION TABLE, AND THE UNKNOWN-VERB TOTALS RULE, IN FULL.**

| # | The `verb` argument (exact) | The verb of record | The outcome |
| --- | --- | --- | --- |
| **(1)** | the string `'open'` | `'open'` | **appends the `arg.entry` when its `id` is UNOWNED, or ACTIVATES the existing entry for the same `target` (see item 5); requires a usable `arg.entry`** — **⟶ THE REPEATED-TARGET READING IS PINNED BESIDE THIS AS-FILED ROW (`2026-09-27`, supervisor-ADJUDICATED after gate 4's `F2`, HIGH; the dated note is `§0A` note 10 item 1).** **WHEN the caller's own entry carries a `target` that repeats an owned entry's `target` while its OWN `id` is unowned, THE AS-FILED *"appends or activates"* IS NOW DECIDED: A REPEATED `target` **ACTIVATES** THE EXISTING ENTRY AND **APPENDS NOTHING**.** **The caller's entry is NOT LOST, NO duplicate is created, and THE RESULT SAYS WHICH HAPPENED — the accepted arm carries `state.entries` in the SAME LENGTH with the SAME element identities, `state.activeId`/`seated` set to THE EXISTING ENTRY'S `id` BY IDENTITY, and NO refusal** (`§2.3` item 5 row 3 carries the same reading in the demanded form). **THE MEASURED DEFECT THIS CORRECTS: the LANDED body silently DISCARDS the caller's entry on this arm.** **ITS FALSIFIER, stated so the row can FAIL: A BODY THAT DISCARDS THE NEW ENTRY, OR THAT APPENDS A SECOND ENTRY FOR THE SAME TARGET, MUST FAIL** (`M-3`'s existing row is the drive; the red-first regression row is the TESTWRITER's, `§0A` note 10's obligations). |
| **(2)** | the string `'activate'` | `'activate'` | **sets `activeId` to the OWNED id named by `arg.id`** |
| **(3)** | the string `'close'` | `'close'` | **drops the entry whose `id` is `===` `arg.id` and RE-SEATS** (item 6) |
| **(4)** | the string `'next'` | `'next'` | **moves to the entry AFTER the active one in the caller's order; REFUSES `'no-next'` when there is none** |
| **(5)** | the string `'prev'` | `'prev'` | **moves to the entry BEFORE the active one in the caller's order; REFUSES `'no-previous'` when there is none** |
| **(6)** | **EVERY OTHER VALUE** — a string this contract does not name (`'toggle'`, `'OPEN'`, `''`, `' open'`), the argument OMITTED (`undefined`), `null`, a number, a boolean, a `Symbol`, a `12n`, an object, an array, a function, a hostile `Proxy`, a revoked `Proxy` | **`'unknown'`** | **THE PRIOR STATE IS RETURNED BY IDENTITY (`===`), `accepted: false`, `changed: false`, and EXACTLY ONE refusal whose `code` is `'unknown-verb'` and whose `verb` is `'unknown'`** |

**THE ONE OPERATION THE MODULE PERFORMS ON A `verb` IS AN EQUALITY TEST AGAINST ITS FIVE DECLARED BODIES.** **A row
that requires a `String()` coercion of the verb — or a case fold, a trim or a prefix match — FAILS `§4.4 S-FM-4`'s
class: a coercion hook is a READ OF CALLER DATA AS A DECISION.** **AND THE NEAR-MISS IS THE DRIVE THAT CATCHES IT:
`'open'` as a `new String('open')` object, `'OPEN'`, `' open'` and `'open\u0000'` are EACH `'unknown'`** (`P-FM-TP-1`'s
out-of-alphabet row). **`'unknown'` IS THE DECLARED NORMALISED BODY AND IS NOT A VERB: a caller who passes the STRING
`'unknown'` is refused `'unknown-verb'` exactly as any other unrecognised string is** (`P-FM-TP-1`'s drive 6).

**Item 3 — ORDER IS THE CALLER'S ARRAY, AND THE MODULE IS NOT A SECOND ORDER AUTHORITY.** **THE THREE FALSIFIABLE
HALVES:** **(a) `focusOrder(entries)` returns a sequence whose elements are the CALLER'S OWN entry objects BY
IDENTITY (`toBe`), in the caller's own order, with the SAME LENGTH — so a module that sorts, dedupes, filters,
reverses or copies FAILS `P-FM-SM-1`'s order half**; **(b) the transition reads positions from the `entries` array AS
SUPPLIED — `'next'` from index `i` selects index `i + 1`, `'prev'` selects `i - 1`, and NOTHING reorders the array**;
and **(c) the module contains NO `sort(` call, NO comparator invocation, NO `order`/`rank`/`position` member and NO
memo of the caller's sequence** (`§3.4 R-13`). **THE CONSEQUENCE, STATED SO IT IS NOT OVER-READ: `focusOrder` is an
IDENTITY-AND-ORDER REPORT, not a projection and not a policy** — **and a later pass that gives it a comparator
parameter, a `sort`, or a returned `order` distinct from the caller's array, is reversing `§0` ruling 6 and MUST OPEN
A GATE** (`§0A` note 7; `CURRENT STATE` item 9). **A NON-ARRAY `entries` VALUE READS AS THE EMPTY SEQUENCE** (item 10).

**Item 4 — OPACITY, FALSIFIABLE: IDENTITY EQUALITY ON `id`, AND `target` NEVER COMPARED.** **THE EQUALITY RULE IS
`===` AND NOTHING ELSE.** **THERE IS NO `equals` PARAMETER, NO COMPARATOR SEAM AND NO STRUCTURAL COMPARISON
ANYWHERE** — **and that absence is a DERIVATION, recorded at `§2.2`(D)'s `FocusEquality` row, with the
caller-supplied-equality reading named as the REVERSIBLE ALTERNATIVE at `§7a.1` item 1's cell** (`C-6` asked the
question; **step 3 fixed the three signatures without a comparator member**). **THE FORBIDDEN VERBS ARE NAMED OVER
NAMED BYTES — and the named bytes are the `id` argument, the `id` entry member, the `target` entry member and the
`label` member:**

| # | The forbidden verb | What it means, over which bytes | The row that FAILS it |
| --- | --- | --- | --- |
| **(a)** | **NAMING** | deriving a string from an `id`, a `target` or an entry — `String(x)`, `` `${x}` ``, `x.toString()`, `x?.toString?.()`, `Object.prototype.toString.call(x)` | `R-7`, `P-FM-IM-1` |
| **(b)** | **RESOLVING** | turning a `target` into an element, a handle, a node or anything actionable; treating a `target` as a key into a map the module owns | `R-7`, `R-13` |
| **(c)** | **PROPERTY READS** | ANY member access on an `id` or a `target` — `x.kind`, `x.type`, `x.id`, `x.label`, `x['k']`, `Object.keys(x).length`, `for…in`, `hasOwnProperty`, a spread, a destructure of a caller value | `R-7` |
| **(d)** | **STRING COERCION AND INTERPOLATION** | `String(…)`, a template hole, `+ ''`, `'' + x`, `x.toLocaleString()`, `Number(x)`, `Boolean(x)` **as a decision** | `R-7` |
| **(e)** | **TYPE BRANCHES** | branching a DECISION on `typeof x`, `x instanceof Y`, `Array.isArray(x)`, `Number.isNaN(x)`, an `Object.is`-as-a-branch on a caller value's shape. **⚠ THE LIMIT, STATED SO NO ROW OVERREACHES: an ARRAY-SHAPE test on the `entries`/`arg` RECORD POSITIONS themselves is not a caller-VALUE branch** — the contract REQUIRES reading `state.entries` as an array (item 10) — **so `Array.isArray(state.entries)` and `Array.isArray(state)` are LICENSED READS and must be named as such by the row** | `R-7`'s exemption list, `S-FM-7` |
| **(f)** | **STRUCTURAL COMPARISON** | `JSON.stringify` round-trips, deep-equal helpers, `localeCompare`, `<`/`>` ordering on caller values, `Map`-keying by a DERIVED value rather than the value itself | `R-7`, `R-13` |
| **(g)** | **ROUND-TRIPPING** | serialising a caller value and reading it back — `JSON.parse(JSON.stringify(x))`, structured-clone, a string copy | `R-7` |
| **(h)** | **VALIDATION / NORMALISATION** | rejecting, trimming, lower-casing, coercing, prefixing, defaulting or "cleaning" any caller value; a shape gate that refuses an entry | `R-7`, `R-11`, `S-FM-4` |

**`Map`/`Set` KEYING IS PERMITTED — AND IT IS THE ONLY KEYING PERMITTED — BECAUSE IT COERCES NOTHING** (same-value-zero
identity, the same rule `===` state: **and where they differ, `-0`/`NaN`, the contract's rule is `Map`'s and it is
stated at `P-FM-IM-1`'s drive 10**). **OBJECT KEYING IS BANNED**: `{}`/`Object.create(null)` used as an id-keyed table
is a **structural decision** the contract has not declared, and it also carries the prototype-pollution-shaped hazard
the family has already ruled on (`docs/decisions.md`'s `PROJECTION-RECORD-IS-NULL-PROTOTYPE`).

**Item 5 — THE VERBS' SEMANTICS, THE DUPLICATE RULE, AND THE ENDS (`§0` ruling 6; `§0A` note 6).**

| # | The attempt | Outcome when ACCEPTED | The refusal when REFUSED |
| --- | --- | --- | --- |
| **(1)** | **`'open'` with `arg.entry` carrying an `id` NOT OWNED** | the entry is APPENDED to the END of `entries` (the caller's array plus one element at the end — **no re-sort**), and **`activeId` becomes that entry's `id` BY IDENTITY** | — |
| **(2)** | **`'open'` with `arg.entry` carrying an `id` ALREADY OWNED** | — | **`'duplicate-id'`** — **THE FIRST-OCCURRENCE RULE: the FIRST occurrence of the id owns it, the REFUSED occurrence CONTRIBUTES NOTHING, and the refused occurrence DOES NOT RESERVE THE ID** (so a LATER `'open'` carrying the SAME id is refused again for the same reason, and nothing about the refused attempt persists) |
| **(3)** | **`'open'` with `arg.entry` carrying a `target` that matches an EXISTING entry's `target` (the SAME index, compared by `===`) while its OWN `id` is unowned** | **the EXISTING entry is ACTIVATED — `activeId` becomes THE EXISTING ENTRY'S `id`, the entry set is UNCHANGED (no append), and `changed` is `true` when the prior `activeId` differed** | — |
| **(4)** | **`'open'` with an `arg.entry` that is ABSENT, `null`, a non-object, or an object with NO OWN `id` member** | — | **`'unknown-id'`** — **there is no id to seat, so nothing is appended, nothing is activated and nothing is reserved.** *(A `label`-only or `target`-only object is this row's case; a `target` that is `undefined` is still a legal target — see item 7.)* |
| **(5)** | **`'activate'` with `arg.id` matching an OWNED id by `===`** | **`activeId` becomes that id BY IDENTITY** | — |
| **(6)** | **`'activate'` with `arg.id` NOT OWNED** (including omitted, `null`, a string, a number, a `Symbol`, a revoked `Proxy`) | — | **`'unknown-id'`** |
| **(7)** | **`'close'` with `arg.id` matching an OWNED id** | **the matching entry is DROPPED from `entries` (the array MINUS that element, order otherwise preserved), and `activeId` is RE-SEATED: to the entry that was AFTER the closed one, or — when the closed one was LAST — to the new LAST entry, or `null` when no entries remain** | — |
| **(8)** | **`'close'` with `arg.id` NOT OWNED** | — | **`'unknown-id'`** |
| **(9)** | **`'next'` with an active entry that has an entry AFTER it** | **`activeId` becomes the NEXT entry's `id` BY IDENTITY** | — |
| **(10)** | **`'next'` with the active entry LAST in the order; and `'next'` with `activeId` `null` and a NON-EMPTY set** | **THE END REFUSES — no wrap.** *(The clamp reading is the NAMED architect-reversible alternative, `§7a.1` item 3.)* | **`'no-next'`** |
| **(11)** | **`'prev'` with an active entry that has an entry BEFORE it** | **`activeId` becomes the PREVIOUS entry's `id` BY IDENTITY** | — |
| **(12)** | **`'prev'` with the active entry FIRST in the order; and `'prev'` with an ACTIVE id that is NOT OWNED (including a non-null `activeId` that matches no entry)** | **THE END REFUSES — no wrap.** | **`'no-previous'`** |
| **(13)** | **`'next'`/`'prev'` with `activeId` `null` and an EMPTY set** | — | **`'no-next'`** / **`'no-previous'`** respectively — **an empty set has no end to move to, and the contract gives each direction its own code** |
| **(14)** | **ANY verb with an `entries` member that is not a usable array** | reads the EMPTY SEQUENCE, so `'open'` APPENDS (the set becomes exactly the new entry), `'activate'`/`'close'` REFUSE `'unknown-id'`, and `'next'`/`'prev'` REFUSE their own end codes | per the verb's own row |

**THE DUPLICATE RULE'S OWN PRECISION, STATED SO IT CANNOT BE OVER-READ:** **a duplicate is an ID equality
(`===`), tested against the entries currently in the set — `target` is NEVER compared for a duplicate**, and it is
compared for **ACTIVATION ONLY** (row 3). **AND THE PRECEDENT IS THE FAMILY'S, CITED NOT INVENTED:**
`docs/specs/listhost.md` `§2.1`'s ACCEPTANCE rule and its row `M-19` (`F-11`) already pin *"a REFUSED first
occurrence does NOT reserve its key — a later valid duplicate is PLACED"*, and the sibling's own words are
*"a refused occurrence contributes NOTHING — least of all a reserved key"*. **THIS CONTRACT ADOPTS THAT DISCIPLINE
WITH THIS UNIT'S OWN RULE (ids, not keys), AND THE `target`-ACTIVATION half IS THIS FILING'S DERIVATION** (`§0A`
note 6) — **it is the mechanism by which step 3's clause *"`open` appends OR ACTIVATES AN EXISTING ENTRY FOR THE SAME
TARGET"* is made operatively testable, and it is REVERSIBLE at the spec gate** (`§7a.1` item 1's cell names the
alternative).

**Item 6 — THE DECLARED RE-SEATING, AND THE `label` ECHO.** **RE-SEATING AFTER A `'close'` IS NEXT-IN-ORDER, CLAMPED
AT THE END, AND `null` WHEN NOTHING REMAINS** (item 5 row 7). **THE FALSIFIABLE HALVES:** **(a) closing the LAST entry
re-seats to the NEW LAST entry and NEVER to the first and never `null` while entries remain**; **(b) closing the ONLY
entry reads `activeId: null`**; **(c) closing a NON-ACTIVE entry leaves `activeId` UNCHANGED** — **the re-seating
rule applies to the active entry's own close, and only then**; and **(d) closing an entry that is not active and is
not present refuses `'unknown-id'`**. **AND THE `label` ECHO:** **an entry's `label` is carried BY IDENTITY in every
returned entry, and when the caller's `label` is not a `string` the member is ABSENT from that entry** — **a module
that adds `label: undefined`, that defaults `''`, that trims, or that drops a present `label` FAILS
`P-FM-IM-1`'s label half.** **⟶ RE-DERIVED BESIDE THIS AS-FILED FORM (`2026-09-27`, supervisor-ADJUDICATED after
gate 5's `FM-11`; the dated note is `§0A` note 10 item 3): *"the member is ABSENT from that entry"* GOVERNS THE LABEL
THE MODULE WOULD **SYNTHESIZE**, NOT THE CALLER'S OWN OBJECT.** **The module NEVER MINTS, COERCES OR STRIPS a label: it
carries the caller's own entry — and therefore its own `label` member, whatever its type — **BY IDENTITY**, so the
as-filed sentence above is NOT a licence to strip a caller's member.** **THE AS-FILED PAIR — this sentence, read with
the paragraph above's *"an entry's `label` is carried BY IDENTITY"* and with `§3.1 M-8`/`M-11`'s `toBe` half — WAS
JOINTLY UNSATISFIABLE: A CALLER'S OWN OBJECT CANNOT LOSE A MEMBER.** **ITS FALSIFIER: A BODY THAT MINTS A LABEL WHERE
THE CALLER GAVE NONE, OR THAT STRIPS OR COERCES ONE THE CALLER SUPPLIED, MUST FAIL** (`§0A` note 10's obligations).

**Item 7 — `target` IS CARRIED AND RETURNED, NEVER CONSULTED, EXCEPT FOR THE ONE `===` ACTIVATION TEST.** **For EVERY
value — `undefined` (as an entry member, which is a LEGAL target), `null`, a number, a string, a boolean, a `Symbol`,
a `12n`, a plain object, an array, a function, a frozen object, an object with a THROWING `toString`/`valueOf`, a
`Proxy` whose traps THROW, a REVOKED `Proxy` — the target travels with its entry BY IDENTITY and NOTHING throws.**
**THE FALSIFIABLE HALF: a module that READS a target — `typeof`, a member access, an `instanceof`, a
`String()`/`toString`/`valueOf` call, a `.hasOwnProperty` call — FAILS `P-FM-IM-2`, and the drive that catches it is
an identity whose coercion hooks THROW and whose invocation counts are asserted `0`, PLUS a revoked `Proxy` whose ANY
access raises a `TypeError`** (`§3.2 F-6`). **THE ONE LICENSED OPERATION IS THE `===` COMPARISON OF TWO `target`
VALUES — and that comparison is itself a READ-FREE operation, performed for ACTIVATION ONLY** (item 5 row 3).

**Item 8 — A REFUSAL IS DATA, THE ATTEMPT CHANGED NOTHING, AND THE PRIOR STATE IS RETURNED BY IDENTITY.** **For EVERY
refusal of every kind: `accepted: false`; `refusals.length === 1`; `changed: false`; `state === <the caller's own
`state` argument>` (**`toBe`, BY IDENTITY**); `seated === the caller's prior `activeId` BY IDENTITY; and NO entry,
member or array of the caller's is written to, added to, removed from, reordered or replaced.** **AT MOST ONE REFUSAL
PER CALL, so `refusals.length` is ALWAYS `0` or `1`** — **a module collecting several refusals per call FAILS
`P-FM-IM-3`'s length half.** **AND THE THREE-WAY DISCRIMINATION THE ROWS DRIVE:** a REFUSED attempt (this item), an
ACCEPTED attempt that did not move the state (`accepted: true`, `changed: false`, `refusals: []` — e.g. `'activate'`
on the already-active id, or `'open'` re-activating an existing entry), and an ACCEPTED attempt that moved it
(`accepted: true`, `changed: true`).

**Item 9 — THE `changed` IDENTITY AND THE FRESH-ONLY-ON-ACCEPT RULE.** **`changed === (next !== previous)`** — an
OBSERVABLE, measured on `state` IDENTITY, **never the verb's identity, never the caller's claim and never a
difference of contents.** **THE FALSIFIER: a module reporting `changed: true` for a no-op accepted verb, a module
returning the PRIOR state object for an accepted attempt that moved, or a module returning a FRESH equal state for a
REFUSED attempt, FAILS `P-FM-SM-1`.** **AND THE STATE FRESHNESS RULE, stated so the two halves do not contradict:**
**a REFUSED attempt returns the caller's own object BY IDENTITY; an ACCEPTED attempt returns a FRESH `FocusState`
record whose `entries` and `activeId` are the caller's own values (the array itself MAY be the same array object on a
mutation-free accepted verb such as `'activate'`)** — **so a row that asserts *"every result carries a fresh record"*
FAILS on the refused arm, and a row that asserts *"`state` is never the argument"* FAILS it too** (`S-FM-8`'s class).

**Item 10 — TOTALITY: EVERY INPUT SHAPE HAS A DECLARED READING, AND NOTHING THROWS.** **`state`:** a record whose
`entries` is a usable array and whose `activeId` is any value reads those values; **a `state` that is `undefined`,
`null`, a primitive, a function, a hostile `Proxy`, a revoked `Proxy`, or a record whose `entries`/`activeId` members
are ABSENT, INHERITED or behind a THROWING ACCESSOR reads `{entries: [], activeId: null}`** (the declared empty
state) — **and NOTHING THROWS.** **`verb`:** `'unknown'` (item 2). **`entries` (as `focusOrder`'s argument):** a
non-array reads the EMPTY SEQUENCE. **`id`:** any value, compared by `===`. **`arg`:** an absent, `null`, non-object
or hostile `arg` reads as an object with **all four members absent** — **a `Proxy` whose `get` trap throws, or an
accessor that throws, yields the ABSENT reading for that member rather than an exception.** **`seam` (any of the
three):** item `§2.4`. **AND THE POOLS ARE DECLARED EXTENTS, NOT THE WHOLE OF JAVASCRIPT'S VALUE SPACE — the
`(bounded)` markings say so in their own cells** (`§5.5.1`).

**Item 11 — THE RETURNED RECORDS' OWN SHAPE RULES.** **`FocusResult` is a FRESH plain record on every call** (`toEqual`
across repeated calls, pairwise `!==`), **its prototype is `Object.prototype`, no member is a getter, and nothing is
frozen**; **`Object.keys` reads its SEVEN declared names IN DECLARED ORDER** (`['state','accepted','verb','refusals',
'seated','changed','persisted']`) **and a missing or additional member FAILS.** **`FocusRefusal`'s key set is exactly
`['code','verb','id']`.** **THE `state` MEMBER IS THE ONE MEMBER WHOSE FRESHNESS IS CONDITIONAL** (item 9) — **and
`refusals` is a FRESH array every call, EMPTY or one-element** (`P-FM-SM-2`).

### 2.4 The three-seam table — the firing points, the payloads, and the DECLARED DEGRADATION of each

**THE GOVERNING RULE, PER SEAM (`§0` ruling 8; `docs/specs/focus-model-review.md` `§2.1` `C-5`/`C-5`'s family
rule):** ***"absent / non-callable / throwing ⇒ declared default + a row that can FAIL"*** — **EACH OF THE THREE
DEGRADATIONS CARRIES ITS OWN ROW**, and **a CALLER-CODE THROW IS NEVER REPORTED AS A CONTRACT REFUSAL** (`§4` item 4;
the sibling precedents are `docs/specs/slothost.md` `§3.2 F-10`'s four named safe defaults and
`docs/specs/listhost.md` `§3.2`'s *"no refusal code is invented for it … it is CALLER code"*). **ALL THREE SEAMS ARE
OPTIONAL, ALL THREE ARE CALLER CALLBACKS, AND NONE IS RETAINED.**

| # | Seam | Where it arrives | When it fires (exactly) | Its payload | ABSENT ⇒ | NON-CALLABLE ⇒ | THROWING ⇒ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **1** | **`refuse`** — **the refusal OBSERVER** (**OPTIONAL**; the SHAPE is borrowed — `(refusal) => void`, ONE CALL, ONE RECORD — from `src/shared/slot-host.ts`'s `SlotHostOptions.refuse?: (refusal: SlotHostRefusal) => void`, *"Notified ONCE per refusal"*; **the UNION is this unit's own**) | `focusTransition`'s third argument, as `arg.refuse` | **EXACTLY ONCE PER REFUSAL, IN ATTEMPT ORDER** — so **the invocation count is EXACTLY `1` for every refused attempt and EXACTLY `0` for every accepted one.** **A module that calls it twice for one refusal, that skips it for a refusal, that calls it for an accepted attempt, or that calls it before the refusal is decided, FAILS `P-FM-SEAM-2`'s count row** | **the refusal record itself** — the SAME object the result carries in `refusals[0]`, so `received === result.refusals[0]` BY IDENTITY — **⟶ RE-DERIVED BESIDE THIS AS-FILED CELL (`2026-09-27`, supervisor-ADJUDICATED after gate 5's `FM-28`; `§0A` note 10 item 4): THE RESULT CARRIES THE MODULE'S OWN refusal record and the callback receives A COPY IT MAY MUTATE FREELY WITHOUT CHANGING ANY OUTCOME — the identity half above is therefore NOT a licence for a caller write to become the result's refusal.** **The record handed to the callback is OBSERVATION; the result's record is THE MODULE'S.** **ITS FALSIFIER: A CALLBACK THAT REWRITES EVERY FIELD OF WHAT IT RECEIVES MUST NOT CHANGE THE RESULT'S REFUSAL, ITS CODE, ITS ORDER OR ITS COUNT** — and **the LANDED ORDER OF OPERATIONS MUST BE INVERTED (build the record, then hand out a copy)**, a HOST-SIDE fix (`P-FM-SEAM-3` drive 3; the red-first regression row is the TESTWRITER's) — **AND THIS CELL'S `or with a COPY of the record` CLAUSE IS NOT REVERSED BY THAT RULING: the FAILS-clause bans a copy that LOSES THE CALLER'S OWN VALUES (a re-`String()`ed, `JSON`-round-tripped or `structuredClone`d record), while the OBSERVATION COPY handed to the callback CARRIES the same `code`/`verb`/`id` values BY IDENTITY and is therefore NOT the copy this clause fails** (`§0A` note 10 item 4) | **the refusal lands in `FocusResult.refusals` UNCHANGED and the attempt is refused normally** — **the absent seam observes nothing and NOTHING ELSE DIFFERS** (`P-FM-SEAM-3` drive 1) | **NO CALL IS ATTEMPTED** — **the result is BIT-FOR-BIT the absent case** (`P-FM-SEAM-3` drive 2) | **THE THROW IS SWALLOWED (caught at the call site) and the refusal STILL LANDS in `FocusResult.refusals`** — **the refusal is the result's, NOT the callback's verdict** (`P-FM-SEAM-3` drive 3) |
| **2** | **`onChange`** — **the change OBSERVER** (**OPTIONAL, NO LANDED PRECEDENT** — `onChange` occurs nowhere in `src/**`, so **its firing point and payload are FIXED HERE**) | `focusTransition`'s third argument, as `arg.onChange` | **EXACTLY ONCE PER ACCEPTED TRANSITION — for EVERY accepted attempt, INCLUDING one whose `changed` is `false` — and NEVER for a refused attempt.** **A module that fires it for a refusal, that fires it twice for one acceptance, that skips it on a no-op acceptance, or that derives its firing from `changed` instead of `accepted`, FAILS `P-FM-SEAM-2`'s count row** | **`(next, previous, refusal?)` — three positional arguments: `next` is the `state` the result carries (BY IDENTITY), `previous` is the caller's own `state` argument (BY IDENTITY), and `refusal` is `undefined` on every accepted transition.** **`next` and `previous` MAY BE `===` on a no-op acceptance — a row drives both the no-op and the moving arm** | **the accepted transition is unaffected — the result is BIT-FOR-BIT the called case** (`P-FM-SEAM-3` drive 4) | **NO CALL IS ATTEMPTED** (`P-FM-SEAM-3` drive 5) | **THE THROW IS SWALLOWED and the transition is still ACCEPTED with the same result** (`P-FM-SEAM-3` drive 6) |
| **3** | **`persist`** — **the RETURNED-WRITE seam, WHOSE NAME THIS CONTRACT RECORDS AS IMPRECISE** (`§0A` note 3) | **a TOP-LEVEL VALUE EXPORT** — `persist(seam, state)` — **NEVER called by `focusTransition`** (`§2.1` item 4's bound) | **when the caller CALLS `persist`**, and then **EXACTLY ONCE PER CALL** — **it is not fired by a transition at all, so no transition row can move its count** | **its second argument, the `state` the caller passed, BY IDENTITY — and its RETURN VALUE, whatever shape it is (including `undefined`, an object, a promise, a hostile value), is handed back BY IDENTITY as `FocusResult`-independent `{present: true, value: …}`** | **`{present: false, value: undefined}`** — **and the module calls NOTHING** (`P-FM-SEAM-3` drive 7) | **`{present: false, value: undefined}`, NO CALL ATTEMPTED** (`P-FM-SEAM-3` drive 8) | **`{present: false, value: undefined}`, THE THROW SWALLOWED, NOTHING ESCAPES** (`P-FM-SEAM-3` drive 9) |

**THE THREE SEAMS' SHARED LAWS, STATED ONCE SO NO ROW IS AMBIGUOUS:**

1. **OBSERVATION, NEVER THE GATE.** **NO SEAM MAY CHANGE AN OUTCOME**: a `refuse` that throws, a `refuse` that
   mutates the record it receives, an `onChange` that throws, an `onChange` that re-enters `focusTransition`, a
   `persist` that throws, and every absent/non-callable shape each leave the **refusal verdict, the `accepted` flag,
   the `seated` id, the `changed` boolean and the returned `state`** **IDENTICAL to the no-seam case.** **THE
   FALSIFIER: a module whose seam throw converts an accepted attempt into a refusal, or whose seam's return value
   becomes a refusal code, FAILS `P-FM-SEAM-3` AND `P-FM-SEAM-2`.** **⟶ AND THE `refuse`-MUTATION ARM IS NOW DECIDED
   BESIDE THIS AS-FILED LAW (`2026-09-27`, supervisor-ADJUDICATED after gate 5's `FM-28`; the dated note is `§0A`
   note 10 item 4): THE RESULT CARRIES THE MODULE'S OWN REFUSAL RECORD, AND THE CALLBACK RECEIVES A COPY IT
   MAY MUTATE FREELY WITHOUT CHANGING ANY OUTCOME.** **The refusal handed to a callback is OBSERVATION; the result's
   record is THE MODULE'S.** **ITS FALSIFIER: A CALLBACK THAT REWRITES EVERY FIELD OF WHAT IT RECEIVES MUST NOT
   CHANGE THE RESULT'S REFUSAL — ITS CODE, ITS `verb`, ITS `id`, ITS ORDER OR ITS COUNT** — the verdict, the `accepted`
   flag, the `seated` id, the `changed` boolean, `state` by identity and `refusals.length` all staying IDENTICAL to the
   no-seam case. **THE MEASURED DEFECT THIS CORRECTS: the LANDED body hands the callback the SAME object it later puts
   in `refusals[0]`, so a callback writing a code onto it makes the RESULT report the CALLER'S code — and THE LANDED
   ORDER OF OPERATIONS MUST THEREFORE BE INVERTED: BUILD THE RECORD, THEN HAND OUT A COPY** (a HOST-SIDE fix; the
   red-first regression row is the TESTWRITER's, `§0A` note 10's obligations).
2. **EXACTLY-ONCE, AND THE COUNT IS DATA.** **`refuse`'s count is exactly `1` per refusal; `onChange`'s count is
   exactly `1` per accepted transition; and both counts are OBSERVABLE** — **a recording closure counts them** — **so
   `F3`'s equivalence criterion has a source rather than a promise** (`C-4`: *"the change count needs to be DATA"*).
   **A COUNT ROW THAT PASSES FOR A MISCOUNT IS THE DEFECT THIS LAW EXISTS TO PREVENT** (`§5.5.1` `P-FM-SEAM-2`).
3. **NO RETENTION.** **No seam reference, no seam return value, no refusal record and no id is held after the call
   returns**: **a second call with the same seam observes a FRESH count**, and **a module that memoises a seam,
   dedupes refusals across calls or caches a state FAILS `P-FM-SM-2`** (the `docs/specs/overlay.md` `F-9` class:
   *"a count of `1` across five calls FAILS for a memoized callback"*).
4. **A CALLER-CODE THROW IS NEVER A CONTRACT REFUSAL.** **No refusal code is invented for a throwing seam**, and
   **the five-member union is not widened by a caller's bug** — the family's landed words, carried: *"a caller-code
   throw is not this host's refusal class … no refusal code is invented for it."*
5. **`persist`'s RETURN VALUE IS NEVER INTERPRETED.** **`{present, value}` carries it VERBATIM BY IDENTITY**: **no
   `typeof`, no member read, no truthiness test, no await, no `Promise` handling and no validation.** **A REJECTED
   PROMISE RETURNED BY A `persist` SEAM IS AN UNOBSERVED VALUE — the module neither awaits nor inspects it** (the
   `docs/specs/slothost.md` `§3a A-5` ruling's own half, applied here to `persist`).

### 2.5 The composition boundary

**Item 1 — WHAT THE MODULE MAY READ, AND NOTHING ELSE.** **`state` is read for its `entries` and `activeId` members,
TOTALLY** (a hostile holder, an absent member, an inherited member or a throwing accessor yields the declared empty
reading — `§2.3` item 10); **`verb` is read by an equality test against the five declared bodies only**; **an entry's
`id` is read and compared by `===` only**; **an entry's `target` is read and compared by `===` only, for activation**;
**an entry's `label` is read and echoed only when it is a `string`**; **`arg.entry`/`arg.id` are read as values**; and
**the three seams are CALLED (never read) under the absorption rules of `§2.4`.** **THE MODULE WRITES TO NO ARGUMENT,
NO ENTRY, NO ARRAY AND NO SEAM** — **consequence: the caller's own objects MAY BE MUTATED between calls without
changing any contract claim; the module never writes to them, never retains them and never retains a seam.**

**Item 2 — WHAT THE MODULE OWNS, AND WHAT IT DOES NOT.** **The module OWNS: its four function names, its five type
names, the member names of its four declared records, the five verb bodies, the normalised body `'unknown'`, the five
refusal codes and nothing else** (`§2.1` item 11). **It owns NOTHING ELSE** — **no state, no entry, no id, no target,
no label, no order, no comparator, no index, no store, no cache, no default, no policy, no DOM and no surface.**
**The state is the CALLER's; the entries are the CALLER's; the order is the CALLER's array; the verb choice is the
CALLER's; the seams are the CALLER's; the applied consequences are the CONSUMER's.**

**Item 3 — THE SIBLING RELATIONS, STATED AS NO-EDGE RELATIONS.** **This unit is the MODEL HALF of `A-d5`'s adoption,
and `F3` (`U-FOCUS-TOOL`) is its CONSUMER — a LEDGER DEPENDENCY, not an import edge**: **`F3` consumes this module
BY READING `docs/specs/focus-model.md` and importing its exports, and THIS MODULE IMPORTS `F3` NOTHING.** **`U-THEME`
(`E8`), `U-OVERLAY` (`E9`), `U-LISTHOST` (`D2`) and `U-SLOTHOST` (`D3`) are SIBLINGS** — **this unit imports none of
them, is imported by none of them, shares no type and asserts no dependency in either direction.** **A pass asserting
an edge is asserting a FABRICATED EDGE** (`H-r6`'s dissolved-edge class; `§4.4 S-FM-9`).

**Item 4 — THE FORK'S DOCUMENTATION HALF IS NOT THIS UNIT'S.** **`SCH-13`'s fork-facing documentation and the
`provident.focus` glossary carry are NOT this unit's rows**, and **`docs/FORKER.md`'s `provident.focus` row stays the
other pass's** (this pass edits no tracker and no fork-facing file — `CURRENT STATE` item 8).

**Item 5 — THE ENTRY-POINT PATH QUESTION, ANSWERED (`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`).** **DOES THE ALLOWED
FILE SET CONTAIN A PATH FROM THE APPLICATION'S ENTRY POINT TO THIS MECHANISM? — NO, AND THAT IS THIS UNIT'S OWN
DERIVATION FROM ITS OWN CHARTER, NOT AN INHERITED COPY.** **Because `§5.1`'s allow-list contains ONE production path
(`src/shared/focus-model.ts`) and NO `src/**` edit, no `src/renderer/**` path, no `src/main/**` path and no
demo-envelope path can reach it** — **so the module has NO importer, NO rendered surface, NO wire-eligible
instantiation site and NO MCP-reachable route.** **AND THE THREE INDEPENDENT GROUNDS, stated so the answer is not a
convention:** **(a)** **no `src/**` file names its specifier** — the import-graph probe `R-6` reads ZERO; **(b)** **the
`F3` consumer is BLOCKED ON THIS UNIT and is itself an MCP tool whose own route is that unit's row** (`§5.4`); and
**(c)** **`src/main/**`'s tables are DENIED here**, so no registration site is in scope. **THE CONSEQUENCE FOR `C-11`'s
IFF: THIS SPEC'S ALLOW-LIST CONTAINS NO RENDERER PATH, NO MAIN PATH, NO DEMO-ENVELOPE PATH AND NO AUTHORED-PROBE PATH —
so gate 6 is `STRUCTURAL` and the node suite may prove the whole contract** (`§5.2`'s falsifier names the one diff
that voids this).

**Item 6 — THE DERIVED DENIED SET (ruling 7), NAMED FIRST BECAUSE IT BINDS ABSOLUTELY.** **THE DERIVATION IS STATED
BEFORE THE LIST, because the derivation is the thing that can be wrong:** this unit's charter is **three pure
functions over caller values — a state record, a verb word, an entry, an opaque id, an opaque target and three
optional caller callbacks — with an EMPTY import census and VALUES RETURNED rather than written** (`§2.1`) — **so
every path whose only role would be to RENDER an entry, WIRE a verb source, APPLY a refusal, STORE a state, REGISTER a
surface or OBSERVE the artifact is denied, because nothing in this unit's contract needs it** — **as step 3's
derivation returned it (`docs/specs/focus-model-review.md` `§4` items 7/8/10).**

**Item 7 — THE CONSUMER BOUNDARY: WHAT THIS UNIT PINS, AND WHAT IT DOES NOT.** **THIS UNIT PINS ONLY (a) its EXPORTS
and (b) the RETURNED DATA.** **THE ENDPOINT'S EXISTING OUTPUT SHAPE (`activeId` / `entries` / `opened` / `refused`)
IS PRODUCED BY THE CONSUMER AND IS NEVER RETURNED HERE — so that vocabulary never enters this module's bytes**, and
**the only bridge is the caller-owned optional `label`** (`§2.2`(C) row 6). **AND IT ADDS NO TOOL, NO METHOD, NO
GROUP, NO MUTATING-LIST ENTRY, NO CHANNEL AND NO STORE HANDLE** (`§2.2` `P-FM-5`).

**Item 8 — THE SEAM NAMES ARE NOT A SURFACE.** **`refuse`, `onChange` and `persist` are the CALLER's own callables,
passed as arguments (or, for `persist`, called by the caller) — they are NOT options at construction, NOT module
members, NOT configuration and NOT a factory surface**, because **nothing is constructed** (`§1` item 2). **A pass
that reads the three names as a construction surface is asserting a clause this contract does not contain.**

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]** the
divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row, and every row is a
contract row for the TestWriter; none is a measurement this pass took.** **Every row carries an id and a `Pinned by`
citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **THE EMPTY STATE IS A VALID STATE, and `focusOrder`/`focusIndex` answer it without throwing** | `focusOrder([])`; `focusIndex({entries: [], activeId: null}, anything)`; then `focusTransition({entries: [], activeId: null}, 'next')` | **`focusOrder([])` deep-equals `[]` and is an ARRAY; `focusIndex(…)` returns `-1`; the transition is REFUSED `'no-next'` with `accepted: false`, `changed: false`, `refusals.length === 1`, and `state` THE ARGUMENT BY IDENTITY (`toBe`); NOTHING THROWS** | `§2.3` items 5/8/10, `P-FM-IM-1` | `[T]` |
| **M-2** | **`'open'` APPENDS an unowned id, seats it, and returns a FRESH state** | `focusTransition({entries: [], activeId: null}, 'open', {entry: {id: 'a', target: t1, label: 'A'}})` | **`accepted: true`; `changed: true`; `refusals` deep-equals `[]`; the returned `state.entries` has LENGTH `1` whose element IS the caller's entry object (`toBe`); `state.activeId === 'a'` BY IDENTITY; `seated === 'a'`; `verb === 'open'`; the result's `Object.keys` deep-equals `['state','accepted','verb','refusals','seated','changed','persisted']`; the caller's own `state` argument is UNCHANGED (its `entries` is still `[]`, its `activeId` still `null`); NOTHING THROWS** | `§2.3` items 5/9/11, `§2.5` item 1, `P-FM-IM-1` | `[T]` |
| **M-3** | **`'open'` ACTIVATES AN EXISTING ENTRY FOR THE SAME TARGET — same `===` target, a DIFFERENT id — with NO append** | `focusTransition({entries: [e1, e2], activeId: 'b'}, 'open', {entry: {id: 'c', target: e1.target}})` where `e1.target === e2.target` is FALSE and `e1.target` is the new entry's target | **`accepted: true`; `changed: true`; `state.entries` has LENGTH `2` — the new id `'c'` is NOT appended — and its elements are the caller's OWN two entry objects (`toBe`); `state.activeId === e1.id` BY IDENTITY; `seated === e1.id`; no refusal; NOTHING THROWS** | `§2.3` item 5 row 3, `§2.2`(D) (`target`'s row), `P-FM-IM-2` | `[T]` |
| **M-4** | **`'activate'` SETS THE ACTIVE ID, and a RE-ACTIVATION IS AN ACCEPTED NO-OP** | (a) `focusTransition({entries: [e1, e2], activeId: null}, 'activate', {id: e2.id})`; then (b) the same call with `activeId: e2.id` | **(a) `accepted: true`, `changed: true`, `activeId === e2.id` BY IDENTITY, `seated === e2.id`; (b) `accepted: true`, `changed: false` — A NO-OP ACCEPTANCE, NOT A REFUSAL — with `refusals` deep-equal `[]`; **in (b) the returned `state` MAY be a fresh record, and `changed` is `false` because the prior and next `activeId` are the same identity**; NOTHING THROWS** | `§2.3` items 5/9, `P-FM-SM-1` | `[T]` |
| **M-5** | **`'close'` DROPS AN ENTRY AND RE-SEATS TO THE NEW LAST ENTRY (the clamped arm)** | `focusTransition({entries: [e1, e2, e3], activeId: e3.id}, 'close', {id: e3.id})` | **`accepted: true`; `changed: true`; `state.entries` has LENGTH `2` carrying `e1` and `e2` BY IDENTITY and NOT carrying `e3`; `state.activeId === e2.id` BY IDENTITY — THE NEXT-IN-ORDER ENTRY, CLAMPED AT THE END, never `null` while entries remain and never the first entry; `seated === e2.id`; the caller's own array is UNCHANGED; NOTHING THROWS** | `§2.3` item 6, `P-FM-IM-1` | `[T]` |
| **M-6** | **`'close'` OF THE ONLY ENTRY READS `activeId: null`, AND CLOSING A NON-ACTIVE ENTRY LEAVES `activeId` UNTOUCHED** | (a) `focusTransition({entries: [e1], activeId: e1.id}, 'close', {id: e1.id})`; (b) `focusTransition({entries: [e1, e2], activeId: e1.id}, 'close', {id: e2.id})` | **(a) `accepted: true`; `state.entries` deep-equals `[]`; `state.activeId === null`; `seated === null`; `changed: true`. (b) `accepted: true`; `state.entries` has LENGTH `1` carrying `e1`; `state.activeId === e1.id` BY IDENTITY — UNCHANGED, because the closed entry was NOT active; NOTHING THROWS** | `§2.3` item 6, `P-FM-IM-1` | `[T]` |
| **M-7** | **`'next'`/`'prev'` MOVE ONE STEP OVER THE CALLER'S ORDER, BY IDENTITY** | with `entries` `[e1, e2, e3]`: (a) `'activate'` `e1.id`, then `'next'`; (b) then `'next'`; (c) then `'prev'`; (d) `'activate'` `e1.id`, then `'prev'` | **(a) `activeId === e2.id`; (b) `activeId === e3.id`; (c) `activeId === e2.id`; (d) REFUSED `'no-previous'` (`accepted: false`, `state` BY IDENTITY, `activeId` unchanged)** | `§2.3` items 5/8, `P-FM-SM-1` | `[T]` |
| **M-8** | **`focusOrder` RETURNS THE CALLER'S OWN SEQUENCE — permutations NOT taken, nothing sorted, nothing copied** | `focusOrder([b, a, c])` where the ids are deliberately out of alphabetical order; then `focusOrder(arr)` where `arr` is the same array object | **the result has LENGTH `3`; `result[0] === b`, `result[1] === a`, `result[2] === c` (`toBe`, BY IDENTITY, IN THE CALLER'S ORDER); the result deep-equals the input and has the same length; NOTHING IS SORTED and NOTHING IS FILTERED; NOTHING THROWS** | `§2.3` item 3, `§2.2`(C) row 3, `P-FM-SM-1` | `[T]` |
| **M-9** | **`focusIndex` RETURNS THE OWNED INDEX, AND `-1` WHEN UNOWNED** | with `entries` `[e1, e2, e3]`: (a) `focusIndex(s, e2.id)`; (b) `focusIndex(s, 'not-there')`; (c) `focusIndex({entries: [], activeId: null}, e1.id)`; (d) `focusIndex(s, null)` where no entry's id is `null` | **(a) `2`; (b) `-1`; (c) `-1`; (d) `-1` — THE SENTINEL IS THE ONLY NON-INDEX VALUE; every return is a `number`, and no call throws** | `§2.1` item 10, `P-FM-IM-3` | `[T]` |
| **M-10** | **AN UNOWNED `id` IS AN ORDINARY OPAQUE VALUE: `''`, whitespace, unicode, a long string, `0`, `NaN`, `Symbol()`, `12n`, an object and a frozen object all work IDENTICALLY** | `focusTransition(empty, 'open', {entry: {id, target: t}})` for each of the nine id shapes in turn, then `focusIndex` and `'activate'`/`'close'` on each | **every drive is ACCEPTED exactly as `'a'` is; `state.activeId` IS the supplied value BY IDENTITY (`Object.is` for `-0`/`NaN`); NO id is trimmed, case-folded, unicode-normalised, length-checked or special-cased; `''` never collides with a whitespace id; NOTHING THROWS** | `§2.3` item 4, `§2.2` `P-FM-3`, `P-FM-IM-1` | `[T]` |
| **M-11** | **THE `label` IS ECHOED OR ABSENT, and `focusOrder` carries it through untouched** | `focusOrder([{id:'a', target:t}, {id:'b', target:t, label:' B '}, {id:'c', target:t, label:''}, {id:'d', target:t, label: 42 as never}])` | **entry `a`'s returned object has NO `label` member (`'label' in it === false`); entry `b`'s `label === ' B '` BY IDENTITY, UNTRIMMED; entry `c`'s `label === ''` — A LEGAL LABEL; entry `d`'s returned object has NO `label` member (a NON-STRING is not a label); every element is the caller's own object (`toBe`); NOTHING THROWS** | `§2.3` items 1/6, `§2.2`(C) row 10, `P-FM-IM-1` | `[T]` |
| **M-12** | **AN ACCEPTED ATTEMPT RETURNS A FRESH `FocusState`, AND THE RECORDS ARE FRESH EVERY CALL** | five repeated calls of the same accepted transition, each result compared against the first; then five repeated accepted `'next'` calls with a recording seam | **every repeated call's result is EQUAL (`toEqual`); each result RECORD is a DISTINCT OBJECT (pairwise `!==`); each accepted attempt's `state` is a DISTINCT `FocusState` RECORD from the argument's; each `refusals` array is fresh (`[] !== []`); the caller's own entry objects are the SAME objects in every call (`toBe`); NOTHING THROWS** | `§2.3` items 9/11, `P-FM-SM-2` | `[T]` |
| **M-13** | **THE THREE SEAMS FIRE ON THEIR OWN SCHEDULES IN ONE COMPOSITION** | one drive that: (a) runs an ACCEPTED transition with a recording `refuse` and a recording `onChange`; (b) runs a REFUSED transition with both; (c) calls `persist(seam, state)` where `seam` returns a value | **(a) `refuse` count `0`, `onChange` count `1`; (b) `refuse` count `1` and the received record IS `result.refusals[0]` (`toBe`), `onChange` count `0`; (c) `{present: true, value: <the seam's own return>}` BY IDENTITY; and NO seam is retained after any call (a second identical drive observes fresh counts of `0`/`1`); NOTHING THROWS** | `§2.4` items 1/2/3/4, `P-FM-SEAM-1`/`P-FM-SEAM-2` | `[T]` |
| **M-14** | **THE WHOLE SURFACE IS REACHABLE AND RETURNS ITS DECLARED SHAPES IN ONE COMPOSITION** | a single drive that imports the module and calls all four value exports in sequence — the transition's returned `state` feeding the next transition, `focusOrder`'s sequence feeding `focusIndex`, and `persist`'s hand-back recorded | **`focusTransition` ⇒ the seven-member result; `focusOrder` ⇒ the caller's sequence; `focusIndex` ⇒ a number; `persist` ⇒ `{present, value}`; NOTHING THROWS; the drive's own totals read `4` value exports reachable BY NAME, `7 + 3` members on the result and the refusal, `1` accepted transition and `0` writes of any kind** | `§2.1` items 1/3/10, `§3.4 R-5`, `P-FM-TP-2` | `[T]` |

**A NOTE ON WHAT MAKES THESE ROWS NON-VACUOUS.** **`M-2`/`M-12` are the member-CENSUS and freshness rows and each
DRIVES a key-set or identity reading, not a prose claim** (`§4.4 S-FM-6`); **`M-3` is the row an
append-always implementation FAILS**; **`M-5`/`M-6` are the rows a `null`-on-close or a first-entry re-seating FAILS**;
**`M-8` is the row a sorting `focusOrder` FAILS**; **`M-10` is the row a trim/coerce/case-fold implementation FAILS**;
and **`M-11` is the row a defaulting-`label` implementation FAILS.**

### 3.2 Documented fail-states / non-happy states

**NOTE THE SHAPE: THIS UNIT HAS A REFUSAL DOMAIN — but EVERY refusal is a VALUE on the result, never a throw, and
there is no `ok`/`reason`/`thrown`/`disabled` member anywhere in this contract** (`§2.1` item 2, `§2.3` item 8).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **AN UNKNOWN VERB — the normalisation's whole outside, driven in full** | `verb` = omitted · `undefined` · `null` · `''` · `'toggle'` · `'OPEN'` · `' open'` · `'open '` · `'open\u0000'` · `'unknown'` · `new String('open')` · a number · `false` · `Symbol()` · `12n` · `{}` · `[]` · a function · a revoked `Proxy` · a trap-throwing `Proxy` | **every drive: `accepted: false`; `changed: false`; `state` IS THE ARGUMENT BY IDENTITY (`toBe`); `refusals.length === 1` with `code === 'unknown-verb'` and `verb === 'unknown'` and `id === null`; the `onChange` count is `0`; `String()`/`toString`/`valueOf` are NOT invoked (recorded counts `0`); NOTHING THROWS** | `§2.3` item 2, `P-FM-TP-1` | `[T]` |
| **F-2** | **AN UNOWNED ID — `'activate'`/`'close'`/`focusIndex` from the outside** | `arg.id` = omitted · `undefined` · `null` · `''` · a string not in the set · a number · a `Symbol` · `12n` · `{}` · a revoked `Proxy`; **and the SAME shapes as a bare `focusIndex` id** | **for `'activate'`/`'close'`: `accepted: false`, `state` BY IDENTITY, one refusal with `code === 'unknown-id'` and `id` THE CALLER'S OWN VALUE BY IDENTITY (never a copy — a revoked `Proxy` is carried WITHOUT TOUCHING IT); for `focusIndex`: `-1` every time; NOTHING THROWS in any drive** | `§2.3` items 5/8, `§2.1` item 10, `P-FM-IM-3` | `[T]` |
| **F-3** | **A DUPLICATE ID IS REFUSED AND RESERVES NOTHING — the first-occurrence rule, driven on BOTH sides** | (a) `'open'` an id that is already owned; (b) `'open'` the SAME id again after (a) refused; (c) `'open'` `[e(id 'k')]` then `'open'` `{id:'k', target: otherTarget}`; (d) `'close'` then re-`'open'` the same id | **(a) REFUSED `'duplicate-id'` with `id === 'k'` BY IDENTITY, `state` BY IDENTITY, `entries` unchanged in length AND in element identity; (b) REFUSED AGAIN for the same reason — **THE REFUSED OCCURRENCE DID NOT RESERVE THE ID and nothing about it persisted**; (c) REFUSED even though the `target` differs — **`target` is NEVER compared for a duplicate**; (d) the FIRST `'close'` is accepted, and the RE-`'open'` is then ACCEPTED — the id became free when it stopped being owned; NOTHING THROWS** | `§2.3` item 5 rows 2/7, `§2.3` item 5's precision paragraph, `P-FM-IM-3` | `[T]` |
| **F-4** | **A MALFORMED ENTRY — `'open'` with nothing to seat** | `arg.entry` = absent · `undefined` · `null` · `''` · `42` · `true` · `Symbol()` · `12n` · `[]` · `{}` (no own `id`) · `{target: t}` (no `id`) · `{id: undefined, target: t}` where `undefined` is NOT an owned id | **every non-matching drive: `accepted: false`, `state` BY IDENTITY, exactly one refusal — `'unknown-id'` — and NO entry is appended, NO id is reserved and NO `activeId` is set; **and the ONE matching drive (`{id: undefined, target: t}` where `undefined` IS an entry's own id) is ACCEPTED**, because `undefined` is a LEGAL opaque id and a legal target; NOTHING THROWS** — **⟶ AND THE `undefined`-HALF OF THIS ROW IS EXTENDED BESIDE IT (`2026-09-27`, supervisor-ADJUDICATED after gate 4's `F3`, MED; the dated note is `§0A` note 10 item 2): `undefined` IS A LEGAL OPAQUE ID VALUE AND MUST BE CARRIED BY IDENTITY — INCLUDING AS AN `activeId` — AND `null` IS DISTINCT FROM IT.** **The module must NOT map either onto the other: an `activeId` of `undefined` reads as THE CALLER'S OWN `undefined` BY IDENTITY (`seated`/`state.activeId`/`focusIndex`'s equality test all see `undefined`), while `null` keeps the declared *"nothing active"* reading.** **THE MEASURED DEFECT THIS CORRECTS: the LANDED module COERCES `undefined` TO `null` ON THE ACTIVE ID, which then surfaces as a WRONG REFUSAL ON A LEGAL STATE.** **ITS FALSIFIER: A BODY THAT MAPS EITHER VALUE TO THE OTHER MUST FAIL — `undefined → null` ON THE ACTIVE ID, AND `null → undefined` ON ANY ID SLOT** (the red-first regression row is the TESTWRITER's, `§0A` note 10's obligations) | `§2.3` item 5 row 4, `§2.2`(D) (`target`'s legality; the `FocusId`/`activeId` rows), `P-FM-TP-1` | `[T]` |
| **F-5** | **THE ENDS REFUSE — the boundary drives, BOTH directions** | with `entries` `[e1, e2]`: (a) `activeId === e2.id`, `'next'`; (b) `activeId === e1.id`, `'prev'`; (c) `activeId: null`, `'next'` on a NON-EMPTY set; (d) `activeId: null`, `'prev'` on a non-empty set; (e) `activeId: null`, `'next'` and `'prev'` on the EMPTY set; (f) `activeId: 'ghost'` (a non-null id matching NO entry), `'next'` and `'prev'` | **(a) REFUSED `'no-next'` — NO WRAP; (b) REFUSED `'no-previous'` — NO WRAP; (c) REFUSED `'no-next'`; (d) REFUSED `'no-previous'`; (e) each direction refused with ITS OWN code (`'no-next'` / `'no-previous'`); (f) each direction refused with its own code, since an unowned active id is no position at all. **EVERY drive: `accepted: false`, `changed: false`, `state` BY IDENTITY, `seated` IS THE PRIOR `activeId` BY IDENTITY, exactly one refusal, NOTHING THROWS** — **and a wrapping or clamping implementation FAILS this row** (`§7a.1` item 3)** | `§2.3` item 5 rows 9–13, `P-FM-SM-1` | `[T]` |
| **F-6** | **A HOSTILE / THROWING IDENTITY AS `id` OR `target` — the opacity half, driven from the hostile side** | `id`/`target` = an object whose `toString` AND `valueOf` THROW (with invocation counts recorded) · `Symbol.toPrimitive` that throws · `Object.create(null)` · a revoked `Proxy` · a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` traps THROW · `-0` and `NaN` as an `activeId` | **every drive: the value travels BY IDENTITY through `state`, `seated`, `refusals[0].id` and the entries (`toBe`, `Object.is` for the `-0`/`NaN` boundary); BOTH coercion-hook counts are `0`; the revoked `Proxy`'s `TypeError` is never raised; an `'open'` with a revoked-`Proxy` TARGET is ACCEPTED and the target is echoed untouched; NOTHING IS THROWN BY THE MODULE — and a module that reads a target or names an id FAILS this row** | `§2.3` items 4/7, `§3.3 I-6`, `P-FM-IM-2` | `[T]` |
| **F-7** | **A HOSTILE `state` / `arg` / HOLDER — the total-read half** | `state` = omitted · `undefined` · `null` · `42` · `'x'` · `true` · `Symbol()` · `12n` · `Object.create(null)` · `[]` · a function · a revoked `Proxy` · `{entries: 42}` · `{entries: []}` with a THROWING `activeId` accessor; and `arg` = `undefined`/`42`/a revoked `Proxy`/`{get refuse(){throw}}` | **every drive reads the DECLARED EMPTY STATE (`{entries: [], activeId: null}`-equivalent) or the member's ABSENT reading, produces a declared result (accepted or refused per the verb), and NOTHING THROWS — a hostile holder, an absent member, an inherited member or a THROWING accessor yields a declared value rather than an exception** | `§2.3` item 10, `P-FM-TP-1` | `[T]` |
| **F-8** | **A DEGRADED SEAM — the nine drives of `§2.4`'s degradation columns** | `refuse` absent · `refuse` a number/an object/`null`/a revoked `Proxy` · `refuse` a throwing function; **the same three shapes for `onChange`**; **the same three shapes for `persist`'s `seam` argument** | **all nine: the RESULT IS OTHERWISE IDENTICAL to the no-seam case** (`accepted`/`changed`/`seated`/`refusals`/`state` IDENTITY unchanged); a refused attempt's refusal LANDS in `refusals` **whatever the callback does**; for the throwing arms the throw is SWALLOWED and NOTHING ESCAPES; for `persist`, `{present: false, value: undefined}`; **and NO refusals array, no `changed` flag and no `seated` id changes because of a seam** — **a module whose seam throw converts an accepted attempt into a refusal, or whose seam's throw escapes, FAILS this row** | `§2.4` (the whole table), `§0` ruling 8, `P-FM-SEAM-3` | `[T]` |
| **F-9** | **THE NO-DOM / NO-WRITE / NO-LISTENER CONTROL — a positive control that MUST FAIL the row it is attached to** | a corpus (NOT the module) that (a) calls `element.focus()`; (b) reads `document.activeElement`; (c) calls `addEventListener` on a fake root; (d) calls `localStorage.setItem`; (e) calls `fs.writeFileSync`; (f) calls `array.sort(...)`; (g) keys a plain object by an id | **the ROWS FAIL for all seven shapes**: the drive demonstrates that `R-2`'s no-DOM/no-write scan, `R-3`'s no-store row, `R-10`'s no-listener row and `R-13`'s no-second-order-authority row **catch every one of them**; **a scan that passes for any of the seven is UNFALSIFIED and must not be filed** (`§4.4 S-FM-2`) | `§2.4` item 4, `§3.4 R-2`/`R-3`/`R-10`/`R-13`, `§4.4 S-FM-2` | static |
| **F-10** | **THE IMPORT-CLASS CONTROL — a positive control that MUST FAIL** | a corpus module carrying exactly one import statement of ANY path — including `import type { FocusEntry } from './focus-model.js'` driven from a sibling, `import { createOwnedListHost } from './owned-list-host.js'` and `import { createSlotHost } from './slot-host.js'` (THE TWO LANDED ORDER-PROJECTING HOSTS — the imports a spec writer is most tempted to add for a comparator), `import { createGestureSession } from './gesture-session.js'` and a self-import | **the row FAILS, and the five named forms are the SPECIFIC positive controls** | `§2.1` item 6, `§3.4 R-4`, `§4.4 S-FM-9` | static |
| **F-11** | **A SECOND CALL'S INDEPENDENCE — no retention, no cache, no drift** | five repeated calls of each value export with the SAME arguments, each compared against the first; **plus** five `'next'`-style calls with one recording `refuse` and one recording `onChange`, and one `persist` seam called five times | **every repeated call returns an EQUAL value on the accepted arm and the SAME state BY IDENTITY on the refused arm; each result record is a DISTINCT OBJECT; the recorded `refuse` count across five refused calls is EXACTLY `5` (a count of `10` FAILS for a double call and a count of `1` FAILS for a memoized seam); the recorded `onChange` count across five accepted calls is EXACTLY `5`; and no observable state differs between the first and the fifth call** | `§2.5` items 1/2, `§2.4` item 3, `§2.3` item 11, `P-FM-SM-2` | `[T]` |
| **F-12** | **THE NO-SECOND-ORDER-AUTHORITY ROW, DRIVEN AS ITS OWN FAIL-STATE** | a drive that (i) searches the module's bytes (normalized view) for each of `sort(` · `toSorted` · `localeCompare` · `orderOf` · `rank` · `position` · `indexOf`… **NO: `indexOf`/`findIndex`/`slice` are LICENSED reads** — so the searched set is `sort(`, `toSorted`, `reverse(`, `localeCompare`, `orderOf`, a `rank`/`position`/`weight` member, `JSON.stringify` and a memoised sequence; (ii) calls `focusOrder` with a deliberately unsorted array and asserts element identity AND order; (iii) drives the transition over a permuted array | **the byte search returns ZERO occurrences; `focusOrder`'s result is element-identical, order-identical and length-identical to its argument; and the transition's `'next'`/`'prev'` follow the SUPPLIED order (a permuted array changes the move, and no copy is re-sorted)** — **a module carrying a `sort(` or an `orderOf` call FAILS `R-13`** | `§2.3` item 3, `§2.2` `P-FM-7`, `§0A` note 7, `P-FM-SM-1` | static + `[T]` |
| **F-13** | **THE UNTOUCHED-ARGUMENT ROW — the caller's objects are BYTE-IDENTICAL after every drive** | every drive of `§3.1` and `§3.2` re-run with the caller's `state`, `entries` array, every entry object, every `id`/`target` object and every seam FROZEN and instrumented as a recording `Proxy` | **no `set`, no `deleteProperty`, no `defineProperty` and no method call reaches ANY argument; every trap count is `0` for writes; each frozen argument is unchanged; the module takes its position from the ARRAY as supplied and returns NEW records rather than mutating the caller's; NOTHING THROWS** | `§2.5` item 1, `§0` ruling 1, `§3.3 I-1` | `[T]` |
| **F-14** | **THE REFUSAL-COUNT ROW — exactly one call per refusal, in attempt order, and the count FAILS on a mismatch** | a drive with a recording `refuse` over a sequence of refusals of ALL FIVE codes in a KNOWN order — `'unknown-verb'`, `'duplicate-id'`, `'unknown-id'`, `'no-next'`, `'no-previous'` | **the recorded call count is EXACTLY `5`; the recorded codes are EXACTLY those five IN THAT ATTEMPT ORDER; each received record IS `result.refusals[0]` (`toBe`); and **a module calling once per refusal but OUT OF ORDER, TWICE, or not at all FAILS this row** — a miscount is the defect this row exists to catch** | `§2.4` seam 1, `§0` ruling 8, `P-FM-SEAM-2` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **THE MODULE MUTATES NO ARGUMENT** — no write to the caller's `state`, `entries`, entries, ids, targets, labels, `arg` or seams; the caller's array is never reordered, appended to, spliced or replaced **in place** | `§0` ruling 1's own clause (*"the module owns nothing and mutates no argument"*); **the reducer's whole discipline** | `§2.5` item 1, `F-13`, `P-FM-IM-1` |
| **I-2** | **THE MODULE HOLDS NOTHING BETWEEN CALLS** — no `{entries, activeId}`, no last-verb memo, no transition history, no cache, no memo table, no counter, no `Map`/`Set` **field**, no retained seam, no retained id/target and no module-level mutable binding | the charter's *"no store"*; **a call with `('activate', id)` returns the same result whether or not any other call ran first** | `§1` item 2, `§2.2` `P-FM-4`, `F-11`, `P-FM-SM-2` |
| **I-3** | **THE REFUSAL DOMAIN IS CLOSED AT FIVE CODES, AT MOST ONE REFUSAL PER CALL, AND A REFUSAL IS A VALUE** — `refusals.length` is always `0` or `1`, `code` is always one of the five, and **a refusal is never a throw** | `§2.1` item 7's reading, recorded in the open; **a second refusal per call or a throw would make the domain unassertable** | `§2.3` item 8, `§2.1` item 7, `F-1`/`F-3`/`F-4`/`F-5`, `P-FM-IM-3` |
| **I-4** | **NO STORE, NO CACHE, NO FILE, NO `localStorage`, NO PERSISTENCE CHANNEL AND NO STORAGE CALL** — **`persist` calls the CALLER's callback and NOTHING ELSE, and its returned value is the CALLER's** | prohibition 4 and `S-d4`; **`persist`'s name is the one place where this could be smuggled, which is why the boundary is stated at the seam** | `§0A` note 3, `§2.2` `P-FM-4`/`P-FM-9`, `§2.4` seam 3, `R-3` |
| **I-5** | **THE MECHANISM DECIDES NO POLICY** — no default verb, no auto-advance, no wrap, no clamp, no timer, no key mapping, no default entry, no default id, no default target, no default label, no modality and no precedence between verbs | prohibition 3; **the declared degenerate values are ABSENCES, never policies** | `§2.2` `P-FM-3`, `§2.3` item 2, `§7a.1` item 3 |
| **I-6** | **`id` IS OPAQUE; `target` IS OPAQUE AND NEVER CONSULTED; `label` IS A VERBATIM-OR-ABSENT CALLER STRING** — identity is the ONE equality rule, `target` is never named/resolved/property-read/coerced/compared **except by the licensed `===` activation test**, and no structural comparison or round-trip occurs anywhere | `C-6`/`C-7` and step 3's item 5; **an adjective cannot redden a row, a named verb list can** | `§2.3` items 4/7, `F-6`, `R-7`, `P-FM-IM-2` |
| **I-7** | **NO `[U]` ROW IS OFFERED, NO `[D]` ROW IS CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL** — and **no row of this unit may be read as an applied, rendered, focus, OS or assembled-app claim** | the three-part refusal (`§5.2`); `docs/specs/zones.md` `§4.4 S-6` | `§5.2`, `R-9`, `§7` item 4 |
| **I-8** | **NO EVENT IS WIRED, NO DOM IS READ, NO FOCUS IS OBSERVED, AND THE THREE SEAMS ARE THE ONLY THINGS THE MECHANISM EVER CALLS** | `A-d5`'s *"no DOM"*; `H-r5`'s ban is upheld in full | `§2.2` `P-FM-8`, `R-9`/`R-10`, `§2.4` item 2 |
| **I-9** | **NO STORE OF ITS OWN, NO MCP SURFACE, NO SHIM MEMBER, NO `electron`/`node:*` IMPORT, NO NEW DEPENDENCY, NO SCRIPT** — no tool, no resource, no group, no `RpcMethod`, no `MUTATING_METHODS` entry, no IPC method, no channel and **no `src/shared/dom-shim.ts` member** | prohibitions 4/5/6; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`; `SHIM-COMPLETION-CARVE-OUT`; `AGENTS.md` item 11(d) | `§2.2` `P-FM-5`/`P-FM-6`, `R-3`/`R-4` |
| **I-10** | **NO IMPORT EDGE IN EITHER DIRECTION, AND NONE FABRICATED — INCLUDING TO `U-LISTHOST`/`U-SLOTHOST`/`gsession`/the fork's streams** — the module imports nothing, is imported by no `src/**` file, and **no sibling's surface is composed, re-expressed or asserted as an edge** | the `H-r6` dissolved-edge class | `§2.1` item 6, `§2.5` items 3/4, `R-4`/`R-11` |
| **I-11** | **ORDER IS THE CALLER'S ARRAY AND THE MODULE IS NOT A SECOND ORDER AUTHORITY** — no sort, no comparator, no rank member, no memo of the sequence, and `focusOrder` returns the caller's own sequence | `§0` ruling 6 and `§2.2`(C) row 3; **the collision step 1 called the sharpest** | `§2.3` item 3, `§2.2` `P-FM-7`, `F-12`, `P-FM-SM-1` |
| **I-12** | **NO FACTORY, NO SESSION, NO OPTIONS OBJECT AND NO CONSTRUCTION** — the value half is exactly four functions, the caller holds the state, and **the module's shape is a reducer** | `§0` ruling 1 and `C-2`'s ownership clause | `§2.1` items 1/4/10, `§2.2` `P-FM-10`, `§5.1` |
| **I-13** | **THE DECLARED DEGENERATE VALUES ARE `-1` (an unowned index), THE EMPTY SEQUENCE, THE BODY `'unknown'`, `null`/ABSENT `label`, `activeId: null` AND `{present: false, value: undefined}` — AND THEY ARE THE ONLY DEGENERATE VALUES IN THE CONTRACT** | prohibition 3's absence discipline: each is **the absence of a value the module would otherwise have to fabricate**, names nothing, and cannot be mistaken for a caller value — **and `null` must not be confused with a caller's own `null` id, which is a LEGAL id** | `§2.3` items 2/6/10, `§2.1` item 10, `M-1`/`M-9`/`F-1`, `P-FM-TP-2` |
| **I-14** | **A SEAM IS OBSERVATION AND NEVER THE GATE; A CALLER-CODE THROW IS NEVER A CONTRACT REFUSAL; AND NO SEAM IS RETAINED** | `§0` ruling 8 and `§2.4`'s laws; **the landed family rule** | `§2.4` items 1/3/4, `F-8`/`F-14`, `P-FM-SEAM-2`/`P-FM-SEAM-3` |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its eleven prohibitions**.
**A prohibition citing *"a static source row"* with no id is not a row** (the sibling reviews' recurring finding), so
**every static claim in this file has an id here**, and **each scan is closed against the evasion class (token
assembly, comment-carrying, realm-rooted computed access) by `§4.4 S-FM-2`.** **Every row here is `static`-layer: it
reads this unit's own FILES or drives an injected argument, never a real DOM and never an operating system.**

**THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY ROW BELOW INHERITS IT** (`S-FM-2`): every scan reads a
**NORMALIZED view** in which **string-literal concatenation is JOINED** (`'unk' + 'nown'` reads as one literal) **and
COMMENTS ARE SCANNED AS CODE** — so a banned token in a comment, in a fragment-assembled literal, or in a template
hole **FAILS as if it were spelled plainly**. **THE ORDER IS NOT FREE: THE JOIN RUNS BEFORE QUOTES ARE STRIPPED**,
because a view that strips quotes first can no longer see the `'…' + '…'` boundary the joiner needs — **so an
assembly-evasion control run against a strip-then-join view is UNFALSIFIED WHILE LOOKING GREEN** (the
`docs/specs/container.md` `§3.4` dated method note, carried here as contract).

| id | Row (a TestWriter authors this) | Its DECLARED EXEMPTIONS, and both controls | Pinned by | Layer |
| --- | --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (`P-FM-1`, `P-FM-3`, `P-FM-10`).** *Over the MODULE's source (`src/shared/focus-model.ts`) INCLUDING its comments and in the normalized view, no occurrence, in any form, of:* **(a)** a consumer-vocabulary token (`tab`, `pane`, `zone`, `region`, `strip`, `dashboard`, `tile`, `workspace`, `is-active`, `is-open`, `aria-`); **(b)** an ENDPOINT-shaped token (`opened`, `refused` **as this module's own name**, `activeElement`); **(c)** a DOM/selector token (`querySelector`, `querySelectorAll`, `closest`, `getElementById`, `createElement`, `innerHTML`, `textContent`, `classList`, `appendChild`, `removeChild`, `insertBefore`, `parentNode`, `setAttribute`, `removeAttribute`, `setProperty`, `dataset`, `activeElement`, `focus(`, `blur(`); **(d)** a realm/ambient token (`document`, `window`, `navigator`, `globalThis`, `self`, `matchMedia`, `getComputedStyle`, `process.env`, `eval`, `new Function`, and the `globalThis[`-style computed realm access); **(e)** a store token (`localStorage`, `sessionStorage`, `indexedDB`, `store`, `cache`, `memo`, `journal`, `fs.`, `writeFile`); **(f)** a wiring token (`addEventListener`, `removeEventListener`, `dispatchEvent`, `preventDefault`, `stopPropagation`, `onclick`, `onkeydown`, `keydown`, `keyup`, `Escape` AS A LITERAL)** | **THE DECLARED EXEMPTIONS, NAMED — a scan row that does not name them is VACUOUS (`S-FM-2`):** **this unit's own contract vocabulary, AS IDENTIFIERS AND MEMBER NAMES** — `focusTransition`, `focusOrder`, `focusIndex`, `persist`, `FocusId`, `FocusEntry`, `FocusVerb`, `FocusRefusalCode`, `FocusState`, `FocusResult`, `FocusRefusal`, `FocusTransitionArg`, and the member names `id`, `target`, `label`, `entries`, `activeId`, `entry`, `refuse`, `onChange`, `state`, `verb`, `accepted`, `refusals`, `seated`, `changed`, `persisted`, `present`, `value` — **and the ELEVEN declared literal bodies of `§2.1` item 11, NAMED: `'open'`, `'activate'`, `'close'`, `'next'`, `'prev'`, `'unknown'`, `'unknown-verb'`, `'duplicate-id'`, `'unknown-id'`, `'no-next'`, `'no-previous'`** — **the row CARRIES the exemption list so its scan holds and still FAILS for a genuinely spelled token.** **BOTH CONTROLS: (i) a corpus carrying `'tab'`, `'pane'`, `'opened'`, `'activeElement'`, `'localStorage'` or `'addEventListener'` FAILS; (ii) the module, which carries none, PASSES** | `P-FM-1`/`P-FM-3`, `§2.1` item 11, `§4.4 S-FM-2` | static |
| **R-2** | **THE NO-DOM / NO-WRITE / NO-REALM ROW (`P-FM-2`, `P-FM-9`; `I-6`).** *Over the MODULE's source and over this unit's own `[T]` test file, the change set contains **no `querySelector`/`closest`/`createElement`/`setAttribute`/`removeAttribute`/`classList`/`setProperty`/`style` write or read, no `focus(`/`blur(` call, no `document`/`window`/`activeElement`/`matchMedia` access, no `addEventListener`/`removeEventListener`/`on*` assignment, no stylesheet or CSS rule text, no console write, no file write and NO ELEMENT, NODE OR ROOT PARAMETER anywhere in the module's surface**.* **ITS FALSIFIABLE HALF: any of the above FAILS, and the `F-9` corpus is the positive control** | **no exemptions** — the row bans the whole class; **both controls: (i) the `F-9` corpus (a `focus()` call, an `activeElement` read, an `addEventListener` call, a `localStorage` write, an `fs` write) FAILS; (ii) the module, which contains none of them, PASSES** | `P-FM-2`/`P-FM-9`, `§2.5` item 1, `§3.2 F-9` | static + `[T]` |
| **R-3** | **The NO-SHIM / NO-NEW-SURFACE / NO-STORE / NO-PERSISTENCE ROW (`P-FM-4`, `P-FM-5`, `P-FM-9`; `I-4`, `I-9`).** *`src/shared/dom-shim.ts` is byte-identical before and after; no `scripts/**` file changes; no config file changes; no `package.json`/`package-lock.json` change; no new dependency or devDependency; no MCP registration site changes; and no store, no persistence channel and no journal is added anywhere.* **A shim member addition, a new `scripts` key, a config edit, a `package.json` change or a persistence channel FAILS.** **THE MCP NEGATIVES ARE ASSERTED AS SET EQUALITY AGAINST THE NAMES, never as a count quoted here** (`S-FM-6`) | **none** | `P-FM-4`/`P-FM-5`, `I-4`/`I-9`, `§5.1`, `AGENTS.md` item 11(d) | static |
| **R-4** | **The IMPORT-BOUNDARY row (`P-FM-11`; `I-10`, `I-9`).** *`src/shared/focus-model.ts` contains ZERO import statements — no value import, no type-only import, no dynamic `import(`, no `require(`.* **ANY import statement of ANY path FAILS, and FIVE forms are the NAMED positive controls: `import type { ListKey } from './owned-list-host.js'` and `import { createSlotHost } from './slot-host.js'` (THE TWO LANDED ORDER-PROJECTING HOSTS — the imports a comparator argument would tempt), `import { createGestureSession } from './gesture-session.js'` (the session this unit's discipline does NOT compose), a `ListHostResult`-shaped borrow from the consumer's own future surface, and a sibling importing this module (the reverse edge)** | **none** | `P-FM-11`, `§2.1` item 6, `§2.5` item 3, `§3.2 F-10` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim with the names NAMED, never a count.** *`src/shared/focus-model.ts` exports EXACTLY the nine names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `focusTransition`, `focusOrder`, `focusIndex` and `persist`** (read from the imported namespace's own keys **by name**, with a **positive control** that a namespace carrying a **FIFTH** value export FAILS); **(b) THE TYPE-ONLY NAMES — `FocusId`, `FocusEntry`, `FocusVerb`, `FocusRefusalCode` and `FocusState` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 5 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text — and that is `G-1`'s requirement** (`S-FM-6`). **AND THE `create…`-FAMILY HALF: NO value export's name begins with `create`, because there is NO factory and NO session** (`§2.2` `P-FM-10`) | **none** | `§2.1` items 1/6/12, `§5.2` leg 5, `§3.2 F-10` | runtime + type-level |
| **R-6** | **The DIFF-SCOPE row and the no-importer probe (`P-FM-4`, `P-FM-11`, `§2.5` item 5).** *Every changed path in this unit's commit range is inside `§5.1`'s allow-list — **and this unit's OWN TEST FILE (`tests/focus-model.test.ts`) IS in that allow-list**, so the register's own execution cannot read as a deny-set violation (`§5.1` row 2); NO path in `§5.1`'s DENIED set appears; and at the time this unit's red set runs, `src/shared/focus-model.ts` is imported by NO `src/**` file* (an import-graph probe: a recursive `src/**` read matching the module's specifier returns ZERO). **SCOPE RULE, so the row cannot mistake correct gate work for a boundary violation: a diff-scope row asserted over a COMMIT RANGE must scope its allow-list census to THIS UNIT'S OWN ARTIFACTS** — the module, this unit's test file, this spec, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits or a sibling's dirty file as this unit's diff. The DENIED set is the exception and binds the WHOLE committed set.** **IMPLEMENTATION FORM, pinned because `git` is not available at run time: a FILESYSTEM PROBE** — every DENIED path PRESENT on disk, every artifact path of this unit's allow-list EXISTING, and the IMPORTER GRAPH READ FROM THE TREE (never a comment) | **none** | `§5.1`, `§2.5` item 5, `I-9`/`I-10`, `§3.2 F-10` | static |
| **R-7** | **THE ANTI-COERCION ROW (`P-FM-1`, `P-FM-3`; `I-6`; `§2.3` items 4/7) — THE ROW THE `target` HALF NEEDS.** *Over the MODULE's source, the module consults NO caller-supplied hook: no `String(`, no `toString`, no `valueOf`, no `Symbol.toPrimitive`, no `JSON.stringify`/`JSON.parse`, no `structuredClone`, no `instanceof`, no `hasOwnProperty` call on a caller argument, no `<`/`>`/`localeCompare` on a caller value, no `Object.keys(`/`for…in`/spread/destructure of a caller value, and no `typeof` branch on a caller value's own shape.* **ITS FALSIFIABLE HALF: a module that coerces, names, property-reads or structurally compares an `id`, a `target` or a `label` FAILS it — and the drives that catch it are `F-6`'s throwing hooks (both counts asserted `0`) and the revoked-`Proxy` arm** | **THE DECLARED EXEMPTIONS, NAMED: (i) `Array.isArray(state.entries)` and `Array.isArray(state)` are LICENSED array-shape reads on the STATE RECORD positions the contract requires (`§2.3` item 10); (ii) `===` on `id` and on `target` IS the declared comparison; (iii) `Map`/`Set` keying by a caller VALUE is licensed (it coerces nothing) while plain-OBJECT keying by an id is BANNED; (iv) an own-member read on the caller's `state`/`arg`/entry RECORD is licensed (the contract's own member reads) while a member read on an `id`/`target` VALUE is BANNED** — **a row that reddens the conformant module is `S-FM-7`'s class** | `P-FM-1`, `§2.3` items 4/7, `§2.5` item 1, `P-FM-IM-2` | static + `[T]` |
| **R-8** | **THE CLOSED-SET LITERAL ROW (`P-FM-1`, `P-FM-3`; `§2.1` item 11).** *The module's STRING LITERAL BODIES are the declared closed set — ELEVEN DISTINCT BODIES: `'open'` · `'activate'` · `'close'` · `'next'` · `'prev'` · `'unknown'` · `'unknown-verb'` · `'duplicate-id'` · `'unknown-id'` · `'no-next'` · `'no-previous'` — NAMED, with NO `typeof`-tag body required or licensed this unit (`§2.1` item 11's limit).* **A consumer-vocabulary literal, an endpoint-shaped literal (`'opened'`/`'refused'`), a DOM-verb literal, a store literal, a FOURTH result or state body, a SIXTH verb body or a SIXTH refusal code — and any spelling variant of a declared body — FAILS.** **BOTH CONTROLS: (i) a corpus carrying `'tab'`, `'opened'`, `'activeElement'` or `'localStorage'` as a literal FAILS; (ii) the module carrying exactly the eleven PASSES.** **SCOPE, stated so it is not vacuous: this row reads the NORMALIZED view, comments included** | **the eleven declared bodies, NAMED** — **no other body is exempt, and a module needing a further body owes this contract an amendment** | `§2.1` item 11, `P-FM-1`/`P-FM-3`, `I-5` | static |
| **R-9** | **THE NO-FOCUS-WALK / NO-`matchMedia` ROW (`P-FM-8`, `P-FM-6`; `§0` ruling 15) — the row that keeps the shim's ban CHECKABLE rather than promised.** *Over the MODULE's source, no `activeElement`, no `focus(`, no `blur(`, no focusable walk, no focus-order member, no focus-restore obligation, no `matchMedia`, no `prefers-*` media query, no `document`/`window` reference and no element parameter.* **BOTH CONTROLS: (i) a corpus calling `element.focus()` or reading `document.activeElement` FAILS; (ii) the module, which does neither, PASSES** | **none** — **and no exemption may be declared: an exemption here would be a relaxation of `H-r5`'s list** | `P-FM-8`, `§2.2`(C) row 1, `§0` ruling 15, `§7` item 2 | static |
| **R-10** | **THE NO-LISTENER ROW (`P-FM-8`; `I-8`).** *Over the MODULE's source, no `addEventListener`, no `removeEventListener`, no `on*` property assignment, no `dispatchEvent`, no capture flag, no delegated root and no retained handler field.* **ITS FALSIFIABLE HALF: a module that installs any listener FAILS** — **and the ROW IS NOT VACUOUS because `M-13`/`F-14`'s recording closures prove the three seams are the ONLY calls the mechanism makes, each exactly on its own schedule** | **none** | `P-FM-8`, `I-8`, `§2.4` items 1/2, `P-FM-SEAM-2` | static + `[T]` |
| **R-11** | **THE NO-POLICY / NO-INTERPRETATION / NO-STORAGE ROW (`P-FM-3`, `P-FM-9`; `I-5`).** *Over the MODULE's source, no computation relates the `state` to any verb beyond the declared rules: no auto-advance, no wrap, no clamp, no timer, no `Date`/`setTimeout`/`setInterval`, no priority between verbs, no default verb, no default entry/id/target/label and no decision about which verb a key, a click or a gesture maps to. **AND: no storage call of any kind** — no `fs`, no `localStorage`, no `sessionStorage`, no `indexedDB`, no `require('fs')`, and no write to any argument.* **ITS FALSIFIABLE HALF, and it is the row's whole content: a module that advances on a timer, that wraps at an end, that treats an unrecognised verb as a real verb, that appends a default entry, or that persists anything FAILS this row** | **none** | `P-FM-3`/`P-FM-9`, `§2.3` item 2, `§0A` note 3, `P-FM-TP-2` | static + `[T]` |
| **R-12** | **THE UNTOUCHED-INPUT ROW (`§0` ruling 1; `I-1`).** *(a) Over the MODULE's source, no assignment to any member of a parameter — no `state.entries = …`, no `entries.push`/`splice`/`sort`/`reverse`/`pop`/`shift`, no `entry.id = …`, no `target.x = …`, no `Object.assign(argument, …)`, no `Reflect.set`; (b) the module returns NEW records rather than the caller's mutated ones on an ACCEPTED attempt; and (c) the drive of `F-13` freezes and instruments every argument.* **BOTH CONTROLS: (i) a corpus mutating its argument FAILS; (ii) this module, which writes to nothing, PASSES all three halves** | **none — except `Array.prototype.slice`/`concat` on the caller's ARRAY, which produce a NEW array and are licensed; the MUTATING array methods are not** | `§2.5` item 1, `§3.2 F-13`, `P-FM-IM-1` | static + `[T]` |
| **R-13** | **THE NO-SECOND-ORDER-AUTHORITY ROW (`P-FM-7`; `I-11`) — the row the dossier's `X-1`-class reconciliation rests on.** *(a) Over the MODULE's source, NO occurrence of `sort(`, `toSorted`, `reverse(`, `localeCompare`, `orderOf`, `comparator`, a `rank`/`position`/`weight`/`order` member, or a cached/memoised sequence; (b) `focusOrder`'s returned sequence is ELEMENT-IDENTICAL, ORDER-IDENTICAL and LENGTH-IDENTICAL to its argument; (c) `'next'`/`'prev'` follow the SUPPLIED order, proved by driving a deliberately permuted array.* **BOTH CONTROLS: (i) a corpus carrying a `sort(`, an `orderOf` comparator call or a memo of the sequence FAILS; (ii) this module PASSES all three halves** | **THE DECLARED EXEMPTION, NAMED: `indexOf`, `findIndex` and `find` over the `entries` ARRAY are POSITION LOOKUPS on the caller's own array — they are NOT ordering authority and are LICENSED; the banned verbs are SORTING, COMPARING and CACHING** (so the row's exemption list is carried rather than implied, and the scan can hold and still FAIL for a `sort(`) | `P-FM-7`, `§2.3` item 3, `§0A` note 7, `§2.2`(C) row 3 | static + `[T]` |
| **R-14** | **THE PAGE-DESIGN ABSENCE PROBE (the existence row that keeps `§1` item 8 falsifiable).** *`docs/skills/designing-pages.md` does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update.* **THE PROBE: a file-existence check whose FAIL is meaningful — if the file comes to exist, this unit OWES the coverage row and the demo-page entry** (with the honest note that a mechanism which renders nothing can contribute an **absence** row only) | **none** | `§1` item 8, `§0A` note 8, `§7` item 6 | static |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Claim | The probe (its FAIL is meaningful) |
| --- | --- | --- |
| **X-1** | **`src/shared/focus-model.ts` DOES NOT EXIST at filing, and `tests/focus-model.test.ts` DOES NOT EXIST at filing** — **the two absence facts the red set's own red form rests on** (carried from the gate-1 record's step-1 measurement, `docs/specs/focus-model-review.md` `§2.2` rows 1/4, **NOT re-measured by this pass**). **THE ROW BRANCHES ON THE MODULE'S PRESENCE, because the red form FAILS once the work is done: THE RED BRANCH (module absent, governing AT RED TIME)** is the absence of both paths; **THE GREEN BRANCH (module present, governing AT GREEN TIME)** is the PAIR's presence **plus the EXPORT CENSUS BY NAME** (`§2.1` item 1's four value exports by name; the type half is `§5.2` leg 5's, because a type name is erased at run time) | a file-existence check for both paths; **its RED form is the module-resolution failure the red set reports**, and **its GREEN form is the pair's presence plus the export census BY NAME** (`§4.1`) |
| **X-2** | **`docs/specs/focus-model.md` is THIS file — the unit's contract is FILED, and `docs/specs/focus-model-review.md` is the GATE-1 RECORD which this unit does not edit** | a file-existence check; **the tracked-path assertion is the supervisor's commit** (`RCA-8`) |
| **X-3** | **`docs/specs/focus-model-adoption-dossier.md` is the STEP-0 DOSSIER, and THIS UNIT DOES NOT RE-WRITE IT** — its `7` identifier rows, `2` cited default rows and `1` routed open row are **INPUTS to this filing, quoted here and never amended** | the dossier is a DENIED path in `§5.1` item 12; a diff-scope row (`R-6`) reads it |
| **X-4** | **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone) | the file-existence probe of `R-14`, whose FAIL means this unit owes the coverage row |
| **X-5** | **THE READER QUESTION HAS NO READER, AND THE ENTRY-POINT ANSWER IS `NO`** — **no path exists from the application's entry point to this mechanism, and no instrument on any layer this repo owns observes a focused element or an order authority this unit could contradict** (`§2.5` items 5/7; `§0A` note 7) | the import-graph probe of `R-6` plus `§5.1`'s allow-list read; **a diff scope admitting an importer, a renderer path, a main path, a demo-envelope path or an authored-probe path FIRES the `§7.1` predicate and voids the three-part refusal** (`§5.1`'s closing sentence) |
| **X-6** | **THE TWO INPUT RECORDS EXIST AND ARE FROZEN FOR THIS UNIT: `docs/specs/focus-model-review.md` (four steps, `C-1`…`C-13`, twelve findings, `FQ1`…`FQ3`, `G-1`…`G-7`) and `docs/specs/focus-model-adoption-dossier.md` (`7 + 2` rows, `1` routed row)** — **this spec DERIVES them and may not re-litigate them** | a file-existence check on both; **its FAIL means this contract's own authority is gone and the filing must be re-derived, not patched** |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/focus-model.test.ts`** (`§0A` note 2) — authored **first**, **RUN**, and its
failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/focus-model.js'` (or the repo's equivalent module-resolution failure) for every row
that imports the module, **plus the static/existence rows that can already be evaluated** — `§3.4`'s `R-14` (the
absent-page-design probe), `R-3`'s config/dependency half, `R-6`'s no-importer half and **`§3.5`'s
`X-1`/`X-2`/`X-3`/`X-4`/`X-6`** — **which need no module at all**; `R-4`/`R-5`/`R-7`/`R-12`/`R-13` become fully
evaluable when the module lands, **while `R-1`/`R-2`/`R-8`/`R-9`/`R-10`/`R-11` scan THIS module's bytes and become
evaluable exactly when it lands** (which is what `X-1`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely additive**, and **the
unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that three pure functions return
their declared values, that the verb alphabet is closed at five with an unknown verb total, that the ends refuse with
their own codes, that a duplicate is refused on the first-occurrence rule without reserving its id, that `focusOrder`
returns the caller's own sequence unsorted, that `focusIndex` answers `-1` for an unowned id, that an opaque `id` and
an opaque `target` are echoed by identity without being read, that `refuse` is called exactly once per refusal in
attempt order, that `onChange` fires exactly once per accepted transition and never for a refusal, and that each of
the three seams' absent/non-callable/throwing shapes degrades as declared**. **It is NOT evidence that anything was
focused, that a tab or pane changed, that a key was handled, that a control rendered, that a store was written, that
an MCP notification fired, or that the app behaves differently** — **and, at the end of this cycle, the module is
still imported by NO `src/**` file** (`R-6`).

### 4.2 Red-set authoring order

1. **The `§3.5` existence rows `X-1`…`X-6` FIRST**, with **`§3.4`'s `R-3`'s config half, `R-14` and `R-6`'s
   no-importer half** — they are the red's own premise and are evaluable before this unit's module exists.
2. **Then the `§3.4` static rows** (`R-4`/`R-5` become complete once the module exists; `R-1`/`R-2`/`R-7`/`R-8`/
   `R-9`/`R-10`/`R-11`/`R-12`/`R-13` read the module file and are evaluable **once it exists**).
3. **Then the totality and degradation rows `F-1`…`F-14` and `I-1`…`I-14`** — this unit's failure surface comes
   **before** its happy paths, because **the totality claim and the opacity claim are what the whole contract rests
   on**. **`F-1` (the unknown verb), `F-6` (the never-consulted identity) and `F-8` (the three seams' nine
   degradations) are the rows that carry the unit's hardest claims**, and **`F-14` is the row that pins the refusal
   CALL COUNT**.
4. **Then `M-1`…`M-14`** — the happy states, with **`M-3` (target activation)**, **`M-5`/`M-6` (re-seating)**, **`M-8`
   (`focusOrder` unsorted)** and **`M-13` (the three seams on their own schedules)** sitting with the rows they make
   falsifiable, and **`M-14` (the one composition drive) last**.
5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**, after the `M-*`
   rows, **in register order** (`P-FM-IM-1` · `IM-2` · `IM-3` · `SM-1` · `SM-2` · `TP-1` · `TP-2` · `SEAM-1` ·
   `SEAM-2` · `SEAM-3` · `SEAM-4` · `SEAM-5`). They ride **`npm test` (leg 1)** unchanged and **need no new file, no
   new script, no `package.json` change and no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and existence row
   that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are recorded.
   **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first, with the old text
   kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order** with **STOP
AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop early**, and **the un-run
rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run that reports all `89` attempts as
executed is the finding, not the expectation.** **The register's execution markings are DESIGN, not results**: **a row
that is marked executable in `§5.5.1` but broken when run is a SPEC FINDING, reported rather than tuned to green.**

### 4.3 What the red is NOT

- **Not a DOM test and not a visual test.** **No real element, no `document`, no shim member, no focusable set and no
  rendered entry**: **there is no element, node or root parameter anywhere in this module's surface** (`§2.5`
  item 2).
- **Not a focus test, and NOT a user-visible-flow test.** **No row focuses anything, reads `activeElement`, walks a
  focusable list, or asserts that a control received input.** **A row asserting that a tab, a pane or a region
  changed belongs to a CONSUMER or to a UI unit, and must not be filed here.**
- **Not an OS, media-query or platform test.** The rows never read `matchMedia`, never spawn a platform and never
  read a display. **`R-9` is the row that forbids the class and `I-8` is the invariant.**
- **Not a store or persistence test.** **This unit owns no store, and a store addition is a NEW GATE**: a row
  asserting that a state SURVIVES a restart belongs to the fork or to a future store unit, and **must not be filed
  here** (`S-FM-9`). **A row that asserts `persist` WROTE something is `S-FM-5`'s class** — `persist` returns.
- **Not a wiring, dispatch or MCP test.** A row asserting a handler ran, a tool was called, a notification fired, a
  route was taken or an envelope node was authored **belongs to `F3` or to another unit and must not be filed here**
  (`§2.5` items 7/8).
- **Not a sibling test, and not a composition test.** **No row may assert a `U-LISTHOST`/`U-SLOTHOST`/`U-THEME`/
  `U-OVERLAY` behaviour, import a sibling's module, or require `src/shared/focus-model.ts` to be wired into anything**
  (`R-4`/`R-11`).
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a sort test.** **A row asserting a sorted or ranked order, or that `focusOrder` "normalises" a sequence, is
  asserting a clause this unit REFUSES** (`§2.3` item 3).

### 4.4 The stop conditions (binding)

**`S-FM-*` are this unit's own classes, derived in substance from the gate-1 record's step-1 conditions, step-2
findings, step 3's derivation, step 4's `G-1`…`G-7` and this filing's own surface. All eleven bind the red set, the
implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **`S-FM-1`** | A row is only satisfiable if the module **AUTHORS AN ELEMENT, RENDERS AN ENTRY, OWNS A STORE, WRITES ANYTHING OR READS THE DOM** | **Violates `P-FM-2`/`P-FM-4`/`P-FM-9` and `§2.5` item 1.** The claim is DELETED; **the obligation is routed to the CONSUMER (`F3`) or to the UI unit that owns the rendered surface.** |
| **`S-FM-2`** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed.** The row forms are `R-1`/`R-2`/`R-7`/`R-8`/`R-9`/`R-10`/`R-11`/`R-13`, **and each must NAME its declared exemptions (`R-1`'s contract-vocabulary set, `R-8`'s eleven declared bodies, `R-7`'s four licensed reads, `R-13`'s three position lookups) or it is vacuous**; **and its mirror warning: a literal census that EXCLUDES the declared bodies reddens the conformant module.** |
| **`S-FM-3`** | A row asserts a **`ok`/`reason`/`thrown`/`disabled`/`error`** member from any export, **expects a throw** from a function or a seam, or asserts a **`Result<T,E>`-shaped envelope** | **Violates `§2.1` items 2/3 and `§2.4`.** **This unit's refusal is a VALUE on the result and a seam's throw is SWALLOWED**; a throw would be a refusal domain this contract does not have. **Re-write as a value assertion; adding a member is a NEW CONTRACT and needs its own gate.** |
| **`S-FM-4`** | A row requires the module to **read a caller `id`/`target`/`label` as a DECISION** beyond the declared reads (the `===` equality tests, the `label` string echo, the licensed array-shape reads of `state`/`entries`/`arg`), **to COERCE a caller argument (`String()`, `toString`, `valueOf`, `Symbol.toPrimitive`), to APPLY A POLICY (a default verb, a wrap, a clamp, a default entry, a default label, an auto-advance), or to VALIDATE/NORMALISE a caller value** | **Violates `P-FM-1`/`P-FM-3`, `§2.3` items 4/7 and `R-7`/`R-11`.** **The row is DELETED**: **a coercion hook is a read of caller data as a decision, and a policy is a clause this contract does not contain.** **EXCEPTION, NAMED: calling the three seams is DECLARED, not a violation** (`§2.4`). |
| **`S-FM-5`** | A row requires the module to **persist, remember, journal, cache or restore** a state, **to hold a store**, **to retain a seam**, or asserts that **`persist` WROTE something** | **Violates `P-FM-4`/`P-FM-9`, `I-2`/`I-4`, `§2.4` item 3 and `§0A` note 3.** **A store addition is a NEW GATE and must not be smuggled in via this unit** (`§1` item 5). **`persist` RETURNS A VALUE — nothing was written.** |
| **`S-FM-6`** | A row asserts a prohibition by a **bare COUNT** (*"nine exports"*, *"seven members"*, *"five codes"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a surface.** The row must assert **SET EQUALITY AGAINST THE NAMES** (`R-5`'s two halves), or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-6`), and **an existence claim must be a probe whose FAIL is meaningful** (`R-14`, `X-1`…`X-6`). **THIS IS `G-1`'s OWN REQUIREMENT, CARRIED AS A STOP.** |
| **`S-FM-7`** | A row asserts a claim about the module's **STRING LITERALS** or **member reads** that EXCLUDES the declared bodies, **or that reddens a read the contract requires** (an own-member read of the caller's `state`/`arg`/entry record, an `Array.isArray` on the state positions, a `Map`/`Set` keying, an `indexOf`/`findIndex` position lookup) | **Violates `§2.1` item 11's and `R-7`/`R-13`'s own exemption lists.** The row is RE-WRITTEN with the declared set named; **a row that reddens the conformant module is a SPEC FINDING, not a defect in the module.** |
| **`S-FM-8`** | A row asserts that the module's **returned `state` is ALWAYS a fresh record**, **or that it is NEVER the caller's argument**, **or that `focusOrder` returns a COPY rather than the caller's own entries** | **Violates `§2.3` item 9 and `§2.3` item 3: the refused arm returns the ARGUMENT BY IDENTITY while the accepted arm returns a FRESH state record, and `focusOrder` returns the CALLER'S OWN sequence.** The row must assert **`toBe` on the refused arm's `state`**, **a distinct record on the accepted arm**, and **element-level `toBe` inside `focusOrder`'s result**. |
| **`S-FM-9`** | A row needs a **sibling import** (value or type-only), **a session, a store, a persistence channel, a shim change, a new dependency, a reference to a consumer's method or route, or a reference to the fork's streams** | **Violates `§2.1` item 6, `§2.5` items 3/4/8, `P-FM-11`, `I-10`** — **a dependency edge asserted toward any sibling would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class), and the five named positive controls are `F-10`'s. **Stop and route the row to its owner.** |
| **`S-FM-10`** | A row offers a **`[U]`** row, claims a **`[D]`** row, moves a rejected row to the `ui` leg (silently or not), reports gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason**, or omits the `§7.1` **`DOES NOT TRIGGER`** decision | **Violates `§5.2`'s three-part refusal and `H-r6`'s layer discipline.** The claim is DELETED; **the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words, carried at `§5.2`). **Any pass wanting a rendered, focused or routed row must get it from the unit that OWNS that surface — `F3` for the tool, the consumer for the rendering.** |
| **`S-FM-11`** | A row asserts a **SECOND ORDER AUTHORITY** — a sort, a comparator call, a rank/position member, a memoised sequence, or an edge to either landed order-projecting host — **in either direction** (as a delivered clause or as an owed one) | **Violates `§0` ruling 6, `§2.3` item 3, `§2.2`(C) row 3, `P-FM-7`, `I-11`.** The claim is DELETED; **a pass that reads this unit as a third order authority is reversing `§0` ruling 6 and MUST OPEN A GATE.** |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken a row to
reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist and to be APPROVED at its spec gate**
(*the filing is this pass; the approval is the architect's — the ONE approval the chain waits for, `AGENTS.md`
item 10a), **(b) a TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), **(c) its typed register to
exist** (*done: `§5.5.1`* — item 11's precondition is satisfied **before** any red set), and **(d) the supervisor's
ordering** — and **`F2`'s ledger row stays an open `## OPEN` row whose status is the supervisor's. No status is
advanced by this filing.** **`F2`'s own cells already read the live truth on the chain half: `U-THEME-CONTROL` (`F1`)
is `DONE`, so the row *"is now the LIVE NEXT ACTION, AT ITS OWN SPEC GATE … it waits only on its own spec + red
set"*, and its `Legs` cell reads `node suite only`** (`docs/next-steps.md`'s `F2` row, quoted as filed). **THE ONE
CELL THIS FILING MAKES STALE IS THE SPEC CELL — it still reads `docs/specs/focus-model.md` (`OWED — not filed`) —
and flipping it is the SUPERVISOR's act, not this pass's** (`CURRENT STATE` item 8). **`U-THEME` (`E8`),
`U-OVERLAY` (`E9`), `U-MENULIB` (`E7`), `U-CONTAINER` (`E5`), `U-RELOCATE` (`E4`), `U-GUTTER` (`E3`),
`U-GUTTER-UI` (`E10`), `U-GSESSION` (`E6`), `U-ZONES` (`E1`), `U-CENSUS` (`E2`), `U-PROJ` (`D4`), `U-LISTHOST`
(`D2`), `U-SLOTHOST` (`D3`), `U-DIVERGENCE-EXT` (`C2`) and `U-THEME-CONTROL` (`F1`) are SIBLINGS and NOT
dependencies in either direction** — **EXCEPT THAT `F3` (`U-FOCUS-TOOL`) IS BLOCKED ON THIS UNIT, in that one
direction only** (`docs/next-steps.md`'s `F3` row: `BLOCKED → then U-FOCUS-MODEL`). **No other unit is a dependency
of this one, and no other unit's artifact may be pulled in.** **`F4` is the fork's queue row and is not a unit.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST, DERIVED FROM THIS UNIT'S OWN CHARTER

**THE DENIED SET, NAMED FIRST, because it binds absolutely and outranks the allow-list** (ruling 7). **THE
DERIVATION IS STATED BEFORE THE LIST, because the derivation is the thing that can be wrong** — see `§2.5` item 6
(the derivation, in its own words, as step 3 returned it).

1. **`src/renderer/**` — `index.html` AND `renderer.ts` INCLUDED** — **the rendering surface this unit authors none
   of.** **This unit writes no markup, no CSS, no class, no attribute, no node and no renderer wiring**, and **a later
   pass asserting an edit here is a FINDING.** **AND THE ONE MEASURED FACT THAT MAKES THIS DENIAL CONCRETE: the repo
   ALREADY renders entries somewhere else — `src/shared/demo-envelope.ts`'s authored nodes and
   `src/renderer/renderer.ts`'s wiring are the CONSUMER's surface, not this unit's** (`docs/specs/theme.md`
   `CURRENT STATE` item 10's class of note, read for its SHAPE).
2. **`src/main/**`** — **the process boundary.** **Two independent grounds deny it: (i)** this unit reads no OS and
   needs no privileged API; **(ii)** the MCP tool that would reach a UI entry is `F3`'s, **through its OWN gate**
   (`H-r14`), and **`A-d5`'s six wiring sites are that unit's rows**.
3. **`src/preload/**` and the app graph** — no node, no envelope, no handler body, no component binding, no mount
   change, no IPC method.
4. **`src/shared/demo-envelope.ts` and the demo path** — the demo envelope is **NOT this unit's**: this unit
   implements no control, authors no node, mounts nothing and dispatches nothing.
5. **`src/shared/dom-shim.ts`** — **FROZEN** (`SHIM-COMPLETION-CARVE-OUT`/`H-r7` admit exactly one member, and **this
   unit adds none and needs NONE**: its order is the caller's array, so it reads no DOM at all).
6. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no registration site.
7. **`package.json`** and **`package-lock.json`** — **no script, no dependency, no devDependency.** *(This denial is
   LOAD-BOUNDED: `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET, so **any further script key
   reddens that row until a TestWriter extends the landed set; a config change cannot satisfy it** — `AGENTS.md`
   item 4's recorded process hazard. **Leg 5 of `§5.2` therefore adds NO SCRIPT.**)*
8. **`scripts/**`** — no helper, no leg driver.
9. **`tsconfig.json`**, **`tsconfig.tests.json`** and **`vitest.config.ts`** — no include/exclude/compiler-option
   change.
10. **The divergence harness** — `scripts/electron-divergence.mjs`, `docs/specs/ci-divergence-leg.md` and its pinned
    `SCENARIO_KINDS` set. **THE KIND SET IS CLOSED AT TWO, and its own clause reads *"A third kind is a new contract
    row, not a free choice"*** — so **a real-DOM row this unit might have authored through a third kind would be an
    AMENDMENT to a landed contract. THIS UNIT MAKES NO SUCH CLAIM AND OWES NO SUCH AMENDMENT** (`§5.2`'s `[D]`
    non-claim).
11. **Any store, any persistence channel, any journal, any `.css` file, any new JSON data file** — this unit ships no
    artifact of any kind besides its module, **and a store is a NEW GATE.**
12. **Every sibling and gate artifact** — **the two INPUT records `docs/specs/focus-model-review.md` (the gate-1
    record, whose conditions, derivation and verdict this spec derives and may not re-litigate) and
    `docs/specs/focus-model-adoption-dossier.md` (the STEP-0 dossier)**, **`docs/specs/focus-tool.md` (`F3`'s
    `OWED` spec)**, a sibling unit's module, test file, `*-greens.md` and review record, **`docs/decisions.md`'s
    ACTIVE rows** (a spec may not edit a ruling) and **`docs/pending.md`'s `§K` REQUEST list, whose vocabulary is NOT
    used anywhere in this file as though it were in force.**
13. **`docs/skills/designing-pages.md`** — it **does not exist**, and this unit does not create it (`R-14`'s probe;
    `§0A` note 8). **IF a later pass creates it, this unit's coverage row and demo-page entry become OWED — and the
    honest form of the row is an ABSENCE row.**
14. **The three landed mechanisms this unit is most likely to be wrongly composed into** — `src/shared/owned-list-host.ts`,
    `src/shared/slot-host.ts` and `src/shared/gesture-session.ts` — are **DENIED as import targets** (`R-4`/`F-10`):
    the two order-projecting hosts are **BOUNDARIES CITED IN THIS CONTRACT, never dependencies** (`§0A` note 7).

**THE ALLOW-LIST — every row is finite, names its own path, and adds NO DEPENDENCY:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/focus-model.ts` | **NEW** — the **four value exports + five type declarations** of `§2.1`, and nothing else | always |
| 2 | **`tests/focus-model.test.ts`** | **NEW** — the red set (`§4.2`), **the register rows** and the static/existence rows. **THIS PATH IS NAMED HERE SO THE REGISTER'S OWN EXECUTION CANNOT READ AS A DENY-SET VIOLATION** | always |
| 3 | `docs/specs/focus-model.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/focus-model-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/focus-model-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and **a sibling spec only for a dated status/annotation correction that changes NO normative clause** | the pass that produces them |

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule, stated so a
scope row cannot mistake correct gate work for a boundary violation**: a diff-scope row asserted over a **commit
range** must scope its **allow-list census to THIS UNIT'S OWN ARTIFACTS** — *the module, this unit's test file, this
spec, its own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows* — and **must NOT read a
later unit's commits, a sibling's dirty working-tree file, or `F3`'s artifact as this unit's diff.** **The DENIED set
is the exception and is the half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS**
the row regardless of which pass committed it. **A non-denied path outside the allow-list is a FINDING for the
adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate boundary to leave a commit). **The canonical
artifacts must be non-vacuously present in the range**, and **`§3.4 R-6` is the row that carries this rule.**

**THE FALSIFIER THIS SCOPE CAN FAIL, stated so the layer decision is falsifiable rather than asserted:** ***if this
spec's diff scope contains `src/renderer/**` — INCLUDING THE DEMO-ENVELOPE PATH — or a `src/main/**` path, or any
`src/**` importer of this module, or an authored element/attribute/class write, or a proving probe, then the `§7.1`
predicate TRIGGERS, the three-part `[U]` refusal is UNAVAILABLE, the live/UI battery is OWED, and the ledger's
`node suite only` legs cell becomes a finding.***

### 5.2 The legs this unit MUST run — THE FIVE, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — for this unit it proves **three pure functions' returned values, one closed five-body verb alphabet, one five-code refusal domain with at most one refusal per call, one first-occurrence duplicate rule, one unsorted `focusOrder`, one `-1` sentinel, one never-consulted identity rule, three seams' firing schedules and nine seam degradations**, and **nothing** about a focused element, a rendered entry, a key handled, a store written, a notification emitted or the app (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the five type declarations, the four value signatures and the returned members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild: **this unit adds a module imported by nobody, so the built output set must be UNCHANGED** — **a bundle census that changed is a FINDING, and a census that did NOT change is not evidence the module works.** **THE OUTPUT SET IS NAMED AS A SET, NOT AS A NUMBER QUOTED HERE** (`S-FM-6`): the unit requires **byte-identical outputs**, which is the claim that can fail. |
| **4** | **test-layer typecheck** | `npm run typecheck:tests` | **[H]** (the additive fourth leg, `AGENTS.md` item 4) | compiles the whole `tests/**` tree under the same strictness a unit's own leg 5 uses. **`tsconfig.json` excludes `tests`, so a unit that cites typecheck as evidence about its OWN test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/focus-model.test.ts`** — the named leg for `§3.4 R-5`(b)'s type half | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts five **TYPE-ONLY** names — `FocusId`, `FocusEntry`, `FocusVerb`, `FocusRefusalCode`, `FocusState` — **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail**; and **the declared member types have NO runtime falsifier** (including `readonly id: unknown`, `readonly label?: string` and `readonly activeId: FocusId | null`). It fails exactly here, and **leg 2 does not compile `tests/**` at all.** **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script to `package.json`, no dependency and no diff-scope row. |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as the family requires. A one-sentence
refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — and in particular **NOT for an entry
   appearing, moving or focused in a window, NOT for a keyboard or pointer interaction selecting a verb, NOT for an
   element's focus state, and NOT for any store or restart behaviour.** **`[U]` is the real-Electron observation leg
   (`npm run ui`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, in two parts, and this is why it is STRUCTURAL rather than a leg-availability excuse:
   (a) the module is imported by NO `src/**` file** (`R-6`, `X-1`, `§2.5` item 5) — **so there is NO RENDERED SURFACE
   TO OBSERVE and NO ENTRY TO FOCUS**; **and (b) the module READS NO DOM, HOLDS NO ELEMENT, WIRES NOTHING AND WRITES
   NOTHING** (`P-FM-8`/`P-FM-9`, `R-2`/`R-9`/`R-10`) — **so there is NOTHING FOR A MEASURING LEG TO MEASURE.**
   **The `ui` leg exists and is green, and the divergence leg is green — the refusal is not an excuse about the
   legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried VERBATIM: *"the row may not be moved to the `ui` leg
   silently."*** **Any later pass that wants a rendered-entry, focused-element or interaction row must get it from
   the unit that OWNS that surface — and for this adoption that is `F3` (`U-FOCUS-TOOL`) plus the consumer's own
   rendering.** **A `[U]` row moved here silently is `§4.4 S-FM-10`, and it does not land.**

**THE READER QUESTION, ANSWERED: `NONE`.** **No instrument on any layer this repo owns observes an entry's focused
state, a rendered order or a consumer's storage through a channel this unit could cite** — **so the applied half is
REFUSED rather than promised, and the returned-value reading is the only one under which this unit's artifact is
`[T]`-provable** (`I-7`).

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED, AND THE NON-CLAIM IS RECORDED IN THESE WORDS.**
The divergence leg (`npm run divergence`, `N = 9` pinned) exists and is green — **but this unit's contract needs
nothing from it**: its rows assert **pure values over arguments and nothing rendered**, and a divergence harness can
only compare **a shim's rendering against a real host's** — a claim about a **RENDERED SURFACE**, which this unit
authors none of. **`R-9`/`R-14` are the probes that keep the non-claim falsifiable**, and **no pass may claim `[D]`
evidence from the existing pinned leg or from this unit's node green.** **AND THE `M-46` CLAUSE IS CARRIED: a status
conversion the measurements record's own stop condition forbids is NOT made** (`docs/specs/engine-drift-measurements.md`'s
`M-46` reads `UNMEASURABLE`, with its own revisit condition and its own negative evidence `M-42` — **that row's owner
is that row's, and this unit neither converts nor re-files it**).

**GATE 6 IS `STRUCTURAL`, NOT WAIVED.** **The word is `STRUCTURAL` and the word `waived` is FORBIDDEN here** —
**`G-6` is carried literally: this file does not use the word, and a later pass may not substitute it.** The live-app
verification gate is **not waived by this filing and not satisfied by it either**: **gate 6's honest status is that
the live app CANNOT REACH this module** — it is imported by no `src/**` file and appears in none of the built outputs
— **and this unit writes nothing, renders nothing and holds no element, which is a SECOND independent structural
reason.** **THE FALSIFIER, named so the decision is falsifiable: a diff scope containing `src/renderer/**` (the
demo-envelope path included), a `src/main/**` path, an importer of this module, or an authored
element/attribute/class write CONVERTS gate 6 into a live battery this unit cannot carry** (`§5.1`'s closing
sentence). **The DONE row must STATE the structural reason rather than omit the gate. A DONE row that reports gate 6
as *"waived"* is a review finding; the correct form is *"structural — no importer, no rendered surface, nothing
written, and the reason stated"*.**

**THE `§7.1` PREDICATE DECISION, RECORDED — `DOES NOT TRIGGER`.** *(`docs/specs/user-flow-audit.md` `§7.1` requires the
decision to be RECORDED either way — *"the decision is RECORDED either way (`TRIGGERS` or `DOES NOT TRIGGER`, with the
evidence that decided it)"* — never from preference.)*
**DECISION — `DOES NOT TRIGGER`, on BOTH LIMBS, from this unit's own recorded change set and not from preference:**
**Limb A (`DOM-SHIM-BLINDNESS`) does not hold** — **the change authors NO rendered surface**: no element, no node, no
class, no text, no style, no attribute and no geometry (`I-6`); **Limb B (`UI-OVERHAUL`) does not hold** — **the
module is imported by no `src/**` file, renders no entry and changes no user-visible flow** (`§2.5` item 5).
**THE EVIDENCE THAT DECIDED IT:** `§5.1`'s allow-list contains **no `src/renderer/**`, no `src/main/**`, no
`src/shared/demo-envelope.ts` and no authored probe**, and `§0A` note 8 records that `docs/skills/designing-pages.md`
does not exist, so there is no live surface for the audit to reach. **ITS FALSIFIER** (carried at `§5.1`'s closing
sentence): **a diff scope admitting a renderer path — the demo envelope's included — a main path, any `src/**`
importer, an authored element/attribute write or a proving probe FIRES the predicate, makes the three-part refusal
unavailable, and converts the ledger's `node suite only` legs cell into a finding.** **CONSEQUENCE, stated so the
exemption is not confused with an empty report: NO `§5.U` matrix and NO `§6.1` report are emitted, and the exemption
is RECORDED with its reason** — *"'no report' and 'an empty report' are different artefacts and the first is the only
admissible form of the exemption."*

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE items**:

1. **Unit + wave + status**: `U-FOCUS-MODEL` · wave **F** (ledger row `F2`) · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"a pure, total, stateless `src/shared/` reducer of three
   functions and nothing else: a closed five-verb transition over a CALLER-OWNED ordered entry set, a sequence
   returned as the caller supplied it, and an index with a `-1` sentinel; **no factory, no session, no store, no
   cache, no module-level state, no DOM, no element, no node, no listener and no write of any kind**; **the CALLER
   owns `{entries, activeId}` and the module mutates no argument**; **`persist` calls no storage and its returned
   value is the caller's**; **no import statement of any kind**; **no sort, no comparator, no rank member**; **no shim
   member, no MCP surface, no new dependency and no UI**; and **it is readable with the demo deleted**."* **A DONE row
   that does not state this is a review finding** — it is the unit's defining constraint (`§1` items 1–10; `§2.3`;
   `§2.4`; `§2.5`).
3. **The surface confirmation, explicitly**: *"`src/shared/focus-model.ts` exports exactly **FOUR value exports**
   (`focusTransition`, `focusOrder`, `focusIndex`, `persist`) and **FIVE type declarations** (`FocusId`, `FocusEntry`,
   `FocusVerb`, `FocusRefusalCode`, `FocusState`) — **`4 + 5 = 9` names** — its `focusTransition` returns the
   **seven-member** `FocusResult` (`state` · `accepted` · `verb` · `refusals` · `seated` · `changed` · `persisted`),
   its refusal record carries the **three members** (`code` · `verb` · `id`), its entry record carries the **three
   members** (`id` · `target` · `label?`), the verb alphabet is **CLOSED AT FIVE BODIES**, the refusal domain is
   **CLOSED AT FIVE CODES with at most one refusal per call**, `refuse` is called **exactly once per refusal in
   attempt order**, `onChange` fires **exactly once per accepted transition and never for a refusal**, and it imports
   **NOTHING — not even type-only** and is **imported by NO `src/**` file**."* **The census is `§2.1`'s and `R-5` is
   its row.** **A DONE row that prints a tenth exported name, a `create…` factory, an eighth result member, a fourth
   entry member, a sixth verb body or a sixth refusal code, or that omits this census, is a review finding** — **and
   a DONE row that prints SIX refusal codes without naming the `§2.1` item 7 reconciliation is one too.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows ran
   and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**` ONLY*** ·
   `npm run build` `[H]` (whether the output set was **byte-identical**) · `npm run typecheck:tests` `[H]` · **leg 5**
   (the standalone strict `tsc` over `tests/focus-model.test.ts`, **the leg that pins the five type names and the
   declared member types**) — **and the explicit sentence that the node-suite green is envelope/pure-layer evidence
   and NOT assembled-app evidence**, and for this unit **that it proves nothing about a focused element, a rendered
   entry, a key handled, a store written, a notification emitted or the app** (`RCA-12`; `§5.2`; `I-7`).
7. **The `[U]`/`[D]` status, the recorded `§7.1` decision, and gate 6's structural status**: **`[U]` not offered**,
   with `§5.2`'s **THREE-PART** clause (the refusal · the structural reason — no importer, no rendered surface,
   nothing written · **the `zones.md` `§4.4 S-6` sentence, verbatim**); **the reader question answered `NONE`**;
   **`[D]` not claimed, with the `M-46` clause**; **the `§7.1` predicate decision re-stated as `DOES NOT TRIGGER` on
   BOTH limbs with its evidence and its falsifier**; **gate 6 stated as `STRUCTURAL`, never `waived`, with its
   reason**; **and the scope-only limit restated — the denial binds THIS UNIT and does not forbid a later consumer
   (`F3`) from importing the module.** **A DONE row that claims a focused-element, rendered-entry, interaction,
   store or restart proof, a `[D]` row, a converted `M-46`, or a waived gate 6 is a review finding.**
8. **The adversarial pass's findings** (`AGENTS.md` RCA-3, MANDATORY per completed unit, **including the gate-11
   read-only PBT audit of `§5.5.1`'s executed tables and the pool-versus-boundary check re-run against the landed
   tables**) and the **blind-greens + per-unit documentation-review records** (`AGENTS.md` items 10a/10d,
   RCA-4/RCA-6 — the blind set is **`docs/specs/focus-model-greens.md`**). **A DONE row that cites no adversarial
   pass is a review finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this unit has NO
   live dependency: `U-THEME-CONTROL` (`F1`) is `DONE` and every other unit is a SIBLING, except that `F3`
   (`U-FOCUS-TOOL`) is BLOCKED ON THIS UNIT in that one direction**; that **`F2`'s spec cell is flipped from
   `OWED — not filed`**, that the `F2` row's `Legs` cell (`node suite only`) **is confirmed against this contract's
   five declared legs** (a `node suite only` cell that omits the four harness legs is repaired at its own site), and
   that **the owed tracker items of `§7` item 11 are discharged or re-parked with owners** — **`G-7`'s repair being
   the `F3` row's status cell for the prose-versus-census item, carried at that row and not here** (`§5.4`).
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type · attempts-run ·
    held · broken · controls** counts, **each row's strategy id (`S-FM-*`)**, the **exhaustive-enumeration declaration
    (NO seed, NO generator — `§5.5.3`)**, the **stop-after-5-consecutive-failures status** (`not triggered`, or
    `triggered at row …`), the **total attempts reported against the `≤400` cap** with **every row's count against
    the `≤100` per-row cap**, and **the explicit sentence that every row whose property text quantifies over a domain
    larger than its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it states.**
    **A DONE row that reports the register as "executed" without these per-row counts and strategy ids is a review
    finding** — the markings are **execution DESIGN**, and **a read-only PBT audit may not accept this spec's table
    alone**: it reads the counts here **and** the TestWriter's tables in `tests/focus-model.test.ts`.
11. **The register's ARITHMETIC.** The DONE row must print the **total WITH its per-row terms** — the declared figure
    **`89` = `10` (`P-FM-IM-1`) + `11` (`P-FM-IM-2`) + `10` (`P-FM-IM-3`) + `6` (`P-FM-SM-1`) + `3` (`P-FM-SM-2`) +
    `10` (`P-FM-TP-1`) + `8` (`P-FM-TP-2`) + `6` (`P-FM-SEAM-1`) + `8` (`P-FM-SEAM-2`) + `9` (`P-FM-SEAM-3`) + `5`
    (`P-FM-SEAM-4`) + `1` (`P-FM-SEAM-5`) + `2` (`P-FM-TP-1`'s reachability sibling — see `§5.5.3`'s term table for
    the exact row/term assignment, which is the AUTHORITY)** — **and must reconcile that figure against the tables
    the test file actually produces**: **a total that is not the sum of its own terms is a review finding**
    (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **Where a row's attempts are several assertions over ONE
    execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row must report BOTH the declared
    attempts and the honest DISTINCT-DRIVE figure** (`§5.5.2` item 3's ledger is the authority). **The DECLARED
    figures are what the caps are compared against; the distinct figures are reported BESIDE them and never
    substituted.** **⟶ ANNOTATED AND RE-ALIGNED BESIDE THE AS-FILED TERM LIST ABOVE (the gate-3 red run's disposition
    (c), `2026-09-27`; the full measure is `§0A` note 9): THE DONE ROW'S ARITHMETIC IS RE-ALIGNED TO `§5.5.3`'s
    AUTHORITATIVE TERM TABLE, WHICH IS THE AUTHORITY — the as-filed list above is kept VISIBLE and is NOT the figure to
    print:** **the declared total is `98`, printed WITH ITS THIRTEEN TERMS (`10` + `11` + `10` + `6` + `3` + `10` +
    `10` + `6` + `8` + `9` + `5` + `5` + `5`), and `98` is the DECLARED figure the caps compare against
    (`98 ≤ 400`; largest row `11 ≤ 100`); the TWELVE TERM CELLS of `§5.5.3`'s table sum to `93`, printed as what IT is;
    and the `9 + 1` reading is WITHDRAWN because it sums to `103`.** **The as-filed `89`, whose own twelve terms here are
    `10 + 11 + 10 + 6 + 3 + 10 + 8 + 6 + 8 + 9 + 5 + 1 + 2` — a twelve-term sum that reconciles with NEITHER the
    thirteen-term `98` NOR the twelve cells' `93` — is therefore NOT re-aligned to a figure the contract does not
    print.** **The register harness's own assertions must be re-aligned to whatever this contract prints, and that is
    the TestWriter's act** (`§0A` note 9; `§4.2`).
12. **The `§5.3` → `§5.5` numbering note, cited**: **there is NO `§5.4` in this file — the gap is DELIBERATE and is
    the family's** (`docs/specs/gutter.md` `§5.3`'s own note, `docs/specs/overlay.md` `§5.3` item 12, and
    `docs/specs/theme.md` `§5.3` item 12) — **because the routing block `§5.4` would otherwise occupy lives as `§5.4`
    in THIS file for `FQ3` and is deliberately numbered OUT of the register sequence so that the register's own
    numbering (`§5.5.x`) matches the family's.** **This file also has NO `§5.5.0`-as-an-exemption:** the gate-11
    ruling landed before this unit and **the zero-row exemption is UNAVAILABLE to a code-bearing unit**, so **there
    is no superseded exemption block to keep visible** (unlike `docs/specs/slothost.md` `§5.5.0`, which carries one).
    **A DONE row that reports a zero-row exemption for this unit is citing a clause this file does not contain.**

### 5.4 THE ROUTED QUESTION — `FQ3` IS THE CONSUMER UNIT'S, RECORDED HERE AS OWED TO IT AND NOT TO THIS ONE

**`G-4`'s requirement is satisfied by ROUTING, and this subsection is where this contract records that the routing
happened and to whom.** **THE QUESTION, in the step-2 reviewer's own terms**: **WHO OWNS THE NEW `'focus'` METHOD AND
ITS NON-NOTIFYING, NON-RE-RENDERING ROUTE — GIVEN THAT A METHOD ABSENT FROM THE MUTATING LIST STILL CROSSES THE
EXISTING IPC INVOKE PATH?** (`docs/specs/focus-model-review.md` `§3.2` `FQ3`.)

1. **ITS OWNER IS `F3` (`U-FOCUS-TOOL`), AND NOTHING ELSE ON THE LEDGER.** **Step 3's return states in terms that
   `FQ3` *"is NOT this unit's and does not block its filing"*** (`docs/specs/focus-model-review.md` `§4` item 11),
   **step 4 agreed (item 13), and the STEP-0 dossier therefore files it as `§5`'s ONE OPEN ROW — routed rather than
   closed by assertion** (`docs/specs/focus-model-adoption-dossier.md` `§5`).
2. **THE READING THIS CONTRACT REFUSES TO INFER, STATED BECAUSE IT IS THE ONE A LATER PASS IS MOST LIKELY TO
   ASSUME: EXCLUSION FROM A RENDERER-SIDE MUTATING SET NEVER DECIDED THE INVOKE PATH.** **`MUTATING_METHODS` is a
   RENDERER-SIDE list**: membership in it is not what decides whether a call mutates or re-renders, **so a method's
   absence from it does NOT remove the method from the existing IPC invoke path** — **and consequently exclusion from
   a renderer-side mutating set never decided the invoke path** (`docs/specs/focus-model-review.md` `§3.2` `FQ3`;
   `docs/next-steps.md`'s `F3` row's own annotation, clause (b)).
3. **AND THE ROUTING HAS ALREADY LANDED AT ITS OWN SITE BY ANOTHER PASS.** **`G-7`'s prose-versus-census repair and
   `G-4`'s routing are discharged at `docs/next-steps.md`'s `F3` row — the supervisor's doc-writer pass annotated
   that row in the same window this unit's gate-1 record was filed** (that row's annotation block, clauses (a)/(b)/
   (c)), **and THIS filing neither repeats nor edits it**: **`docs/next-steps.md` is outside this pass's scope
   entirely** (`CURRENT STATE` item 8). **WHAT THIS SUBSECTION CONTRIBUTES IS ONLY THE RECORD THAT THE QUESTION IS
   NOT THIS UNIT'S, that it is OWED TO `F3`'s record, and that no clause of THIS contract depends on its answer.**
4. **THE CONSEQUENCE FOR THIS CONTRACT, NAMED SO IT IS NOT A GAP: NOTHING HERE CHANGES IF `FQ3` IS ANSWERED EITHER
   WAY.** **This unit registers no method, routes nothing, adds no `MUTATING_METHODS` entry and returns no endpoint
   shape** (`§2.2` `P-FM-5`; `§2.5` items 7/8) — **so the model half is answer-independent, and a later pass that
   makes a clause of this file depend on `FQ3` is asserting a dependency this contract does not have.**

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`AGENTS.md` item 11 makes the register MANDATORY BEFORE the red set for a code-bearing unit.** **This repo HAS NO
PBT HARNESS**: `package.json`'s `devDependencies` key set is the five names — `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **no `fast-check`, no property runner**. **This unit is CODE-BEARING** (four value exports, a
closed five-body verb alphabet, a five-code refusal domain, three optional seams with nine declared degradations, a
totality surface over untrusted arguments and a pair of opacity claims), so the **recorded ZERO-ROW EXEMPTION IS NOT
AVAILABLE to it** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`). **`§5.5.1` is therefore a real typed register**,
executed by **plain deterministic vitest tables**, **with NO new dependency, no sixth leg and no `package.json`
change** — **which is `G-5`'s requirement, carried as a register fact: every domain is DECLARED and every row is
FINITELY ENUMERABLE, so no dependency AND NO SEED is owed.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).** **A register ENUMERATES every discernible
testable property of its unit; the per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE
this filing enumerates `13` rows carrying `13` TERMS and reports the count as its EXTENT — no property was dropped,
merged or left unenumerated to fit a threshold — and `13` ROWS / `13` TERMS IS AN OUTCOME.** **⟶ AND THE COUNTING FORM
IS CORRECTED BESIDE THIS AS-FILED SENTENCE, WITH NO FIGURE MOVED (disposition (b); `§0A` note 9): the ROW COUNT is `13`
ROWS — `12` TERM-CARRYING plus `1` carrying NO TERM, `P-FM-TP-2`'s trailing REACHABILITY ANNOTATION ROW — and the TERM
COUNT is `12` printed cells plus the declared list's thirteenth term, so the two counts are stated SEPARATELY; the
change is a change of FORM and NOT of FIGURE** (`§5.5.1`'s table annotation, `§5.5.3`). **THERE IS NO `§5.5.0`
IN THIS FILE**: the gate-11 ruling landed before this unit, **the zero-row exemption is unavailable to a code-bearing
unit, and this filing carries its register FROM THE START** — so **there is no superseded exemption block to keep
visible** (the `docs/specs/theme.md` form; `docs/specs/slothost.md` `§5.5.0` carries one because its unit was filed
before the ruling).

#### 5.5.1 THE REGISTER — **`13` typed ROWS carrying `13` TERMS, in THREE families, ALL executed by design** — **⟶ THE ROW COUNT AND THE TERM COUNT, STATED SEPARATELY AND CORRECTLY BESIDE THIS AS-FILED HEADING: `13` ROWS, OF WHICH `12` CARRY A TERM AND `1` — `P-FM-TP-2`'s TRAILING REACHABILITY ANNOTATION ROW — CARRIES NO TERM AT ALL; AND `12` PRINTED TERM CELLS IN THE TABLE BESIDE THE DECLARED LIST's THIRTEENTH TERM (disposition (b), `§0A` note 9; the heading is kept VERBATIM and the annotation below the table carries the why)**

**What this section is, in one sentence.** A **typed register of `13` rows / `13` terms** — **⟶ CORRECTED BESIDE THIS AS-FILED SENTENCE (`2026-09-27`; `§0A` note 10 item 5): `13` ROWS, of which `12` CARRY A TERM and `1` — `P-FM-TP-2`'s TRAILING REACHABILITY ANNOTATION ROW — CARRIES NONE, while the DECLARED THIRTEEN-TERM LIST at `§5.5.3` is the object whose sum is `98`; the as-filed phrase stays visible** — **⟶ AND THIS SENTENCE'S AS-FILED TERM FIGURE IS NAMED, BECAUSE A CLOSE-OUT PASS DISCLOSED THAT ONE `89` SITE REMAINED UNCOVERED HERE (the same pass, `docs/specs/focus-model.md`'s `CURRENT STATE` item 11): where this paragraph's as-filed words read `13` rows / `13` terms, THE DECLARED TOTAL IS `98`, the twelve table cells' own sum is `93`, and the five-figure gap is CARRIED OPEN AS OWED at `§5.5.3` — NO FIGURE OF THIS SENTENCE MOVES and the as-filed form stays visible** — whose **six genuine
quantifications** — (i) *the closed five-body verb alphabet and the unknown-verb totals rule*; (ii) *the entry record's
closed shape with its opaque `id`/`target` by identity and its verbatim-or-absent `label`*; (iii) *the opaque id's
equality rule over the whole id domain*; (iv) *the caller-owned order, the ends' refusals, the first-occurrence
duplicate rule and the declared re-seating*; and (v) *the three seams' firing schedules and their nine declared
degradations* — are **executed here as quantifications over finite, pinned enumerations**, **hand-rolled and
deterministic, with no new dependency and no drawn sample at all**.

**THE FOUR DOMAINS THIS REGISTER DRIVES, DECLARED BY NAME (`C-10`'s four, carried in substance, PLUS the remaining
step-1 domains which are NOT dropped).** **A domain that is NEVER INTERPRETED must be stated as such or its rows read
as validation rows:**

1. **THE ID VALUE-SHAPE DOMAIN (`10` shapes)** — the caller's opaque id, **echoed by identity and compared by `===`
   only**: plain strings (including `''`, whitespace, unicode and a very long one), a number (`0`, `NaN`, `-0`), a
   boolean, `undefined`, `null`, a `Symbol`, a `12n`, an object, an array, a function, a frozen object, a
   `Map`, a `Date`, an id whose `toString`/`valueOf` THROW, a revoked `Proxy` and a trap-throwing `Proxy`. **A DECLARED
   EXTENT, not the whole of JavaScript's value space.**
2. **THE TARGET-AND-ENTRY-SHAPE DOMAIN** — **two rows**: the target's `11` shapes (carried, echoed, never consulted
   and never compared **except by the licensed `===` activation test**) and the entry record's `11` argument shapes
   (the closed record, its member subsets, its malformed forms and its non-record forms).
3. **THE VERB DOMAIN INCLUDING UNKNOWN (`10` drives: the 5 CLOSED MEMBERS plus 5 out-of-domain groups)** — **the
   caller's verb word**, with **anything outside the alphabet being the declared `'unknown'` body's own arm, not a
   validation row** — **the module NEVER interprets a verb beyond the five-body equality test.**
4. **THE SEQUENCE-LENGTH DOMAIN WITH THE ENDS AND THE ORDERING (`10` drives: 6 lengths/position drives + 4 ordering
   drives)** — the caller's array lengths (`0`, `1`, `2`, `3`), the `'next'`/`'prev'` positions at both ends and in the
   middle, the `'close'` re-seating arm, **and the ordering drives including an EQUAL-COMPARATOR-shaped permutation
   case: two entries whose `label`s are equal, driven to prove that NO equality of any member influences order and
   that NOTHING re-sorts.**
5. **THE REMAINING STEP-1 DOMAINS, CARRIED AND NOT DROPPED** (`docs/specs/focus-model-review.md` `§2.1` `C-10`): **the
   INITIAL ACTIVE ID** (`P-FM-SM-1`), **the ORDER SPEC** (`P-FM-IM-3`'s order half), **the REFUSAL VERDICTS**
   (`P-FM-IM-3`), **and EACH CALLBACK'S CALL COUNTS AND PAYLOADS INCLUDING THROWING AND MALFORMED FORMS**
   (`P-FM-SEAM-1`/`SEAM-2`/`SEAM-3`).

**THE IDS ARE THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-FM-*`** (`FM` = this unit) — so **a
register row is never mistaken for a `§3` row** (whose families are `M-*`/`F-*`/`I-*`/`R-*`/`X-*`) **and never for a
sibling's register** (`P-TH-*`, `P-OV-*`, `P-LH-*`, `P-SH-*`, `P-CN-*`, `P-PJ-*`, `P-ML-*`, `P-GT-*`, `P-GU-*`,
`P-GS-*`, `P-ZN-*`, `P-RL-*`). **The three families are the type algebra `docs/specs/engine-pin.md` `§5.5` pins:**
**`IM`** = injected seams, carried data and invariants · **`SM`** = the emitted value's state classes and the
purity/statelessness discipline · **`TP`** = totality. **The strategy-id prefix is `S-FM-*`, ONE PER ROW — THIRTEEN
distinct ids: `S-FM-ENTRY-1` · `S-FM-TARGET-1` · `S-FM-ID-1` · `S-FM-MATRIX-1` · `S-FM-CONST-1` · `S-FM-TOTAL-1` ·
`S-FM-OPAQUE-1` · `S-FM-REFUSE-1` · `S-FM-NOTIFY-1` · `S-FM-DEGRADE-1` · `S-FM-COUNT-1` · `S-FM-WRITE-1` ·
`S-FM-REACH-1`** — **and ALL THIRTEEN are ENUMERATION strategies: there is NO generator row and NO seed**
(`§5.5.3`). **EACH ROW'S OWN CELL NAMES ITS ID, THE IDS ARE DISTINCT, AND NO ROW IS LEFT WITHOUT ONE.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/focus-model.test.ts`, `§4.1`/`§5.1` — and that
   path is IN the allow-list, `§5.1` row 2) — the file the red set already owes, and the file the register **rides as
   part of the red** (`§4.2` item 5). **No row of this register is executed by a generator library.**
2. **EXHAUSTIVE ENUMERATION THROUGHOUT — AND THE DECLARATION IS PART OF THE REGISTER, STATED SO THE CHOICE IS NOT
   READ AS AN OMISSION.** **EVERY domain this register drives is FINITE, PINNED AND FULLY ENUMERABLE, so `§5.5`'s
   admissible pinned-seed generator is NOT USED: THERE IS NO SEED, NO LCG, NO DRAW, NO `Math.random` AND NO ADAPTIVE
   SEARCH IN THIS REGISTER, AND NO ROW REPORTS A COVERAGE FIGURE BECAUSE NO ROW SAMPLES.** **THE ONE THING A LATER
   PASS MAY NOT DO IS QUIETLY SAMPLE**: **if a future dated amendment genuinely needs a draw, the pin is
   `seed = 20260927` with the family's own hand-rolled form — a 32-bit LCG, `stateₙ₊₁ = (stateₙ · 1664525 +
   1013904223) mod 2³²`, EXACTLY ONE LCG STEP PER DRAW, `index = stateₙ₊₁ mod pool.length`** — **and such an
   amendment owes a register re-grain under `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; no new dependency is
   admissible either way** (`AGENTS.md` item 11(d)).
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's remaining attempts
   are abandoned and no further row starts). **A register row is never refused on the ground that "no PBT harness
   exists."**
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** **No `§3` row is weakened,
   widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and **a
   row whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)` marking**
   (`§5.5.2` item 2).
6. **The register's own boundaries, named rather than silently relied on:** **(a) NO DOM, NO ELEMENT, NO NODE, NO OS,
   NO DISPLAY AND NO CSS RESOLUTION IS NEEDED OR USED BY ANY ROW** — every row drives **pure values, recording
   closures and throwing stubs**; **(b) the hostile shapes are FIXED table members**; **(c) each row's pool/table is a
   SUBSET of the input space this contract pins**, and **its silence about a shape it does not list is a stated
   boundary, not an unrecorded omission** — **the shapes deliberately EXCLUDED are named at `§5.5.2` item 4**; **(d)
   the row/claim map, printed so no row is quoted for another's claim:** `P-FM-IM-1` the closed entry record, the
   identity echo and the verbatim-or-absent `label` · `P-FM-IM-2` the never-consulted target and the licensed `===`
   activation test · `P-FM-IM-3` the opaque id's equality rule, the CALLER-OWNED order and the refusal verdicts ·
   `P-FM-SM-1` the five-verb matrix, the ends, the re-seating and the `changed` observable · `P-FM-SM-2` cross-call
   constancy and freshness · `P-FM-TP-1` the verb domain's totality including unknown ·
   `P-FM-TP-2` the module-wide totality over hostile argument shapes · `P-FM-SEAM-1` the `refuse` schedule and payload
   · `P-FM-SEAM-2` the `onChange` schedule, payload and count-is-data · `P-FM-SEAM-3` each seam's nine degradations ·
   `P-FM-SEAM-4` the refusal-call count in attempt order · `P-FM-SEAM-5` the `persist` returned-write rule and its
   three degradations · `P-FM-TP-2`'s reachability half — **and NO OTHER ROW MAY BE QUOTED FOR ANY OF THEM.**

| ID | Type | Domain it drives | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy (→ its TERM) | Cap | held / broken |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **`P-FM-IM-1`** | `P-IM` invariant | **THE ENTRY RECORD** (shape + identity + label) | **For EVERY one of the row's `10` entry drives: the entry is a CLOSED record — a returned entry carries `id`, `target` and optionally `label`, and NO FOURTH member; every `id` and `target` is the CALLER'S OWN value BY IDENTITY (`toBe`; `Object.is` on the `-0`/`NaN`/`12n` boundary); the `label` member is present with the caller's own string BY IDENTITY when that string is a `string`, and the member is ABSENT otherwise (`'label' in entry === false`) — never `undefined`, never `''` by default, never trimmed; a NON-STRING `label` never becomes a label; NO entry is invented, defaulted, normalised or validated; and NOTHING THROWS.** *(A module that returns `label: undefined` FAILS the absence half, and a module that defaults `''` FAILS the identity half.)* | **YES (bounded — the property text says "EVERY entry drive" while the table drives `10`; the universal is NOT proven)** | `M-2`, `M-3`, `M-10`, `M-11`, `F-3`, `F-4`, `F-13`, `I-1`, `§2.3` items 1/4/6 | `S-FM-ENTRY-1` | **`10` attempts** = **the `10`-shape entry-argument pool, ONE DRIVE EACH.** **The `10` shapes:** **(1)** `{id:'a', target:t}` (label absent) · **(2)** `{id:'a', target:t, label:'A'}` · **(3)** `{id:'', target:t, label:''}` (**an empty id AND an empty label, both LEGAL**) · **(4)** `{id:' b\t', target:t, label:' B '}` (**whitespace-only id, padded label — echoed UNTRIMMED**) · **(5)** `{id:'ünïcøde', target:t, label:'ünïcøde'}` · **(6)** `{id: 0, target:t, label: 42}` (**a numeric id and a NON-STRING label — the label member must be ABSENT**) · **(7)** `{id: NaN, target:t}` and `{id: -0, target:t}` (**the `Object.is` boundary**) · **(8)** `{id: Symbol(), target:t}` and `{id: 12n, target:t}` · **(9)** `{id: frozenObj, target: Object.create(null), label:'x'}` (**a frozen identity and a null-prototype object as target — both echoed untouched**) · **(10)** `{id: revokedProxy(), target: throwingHookObj}` (**the hostile pair; both carried WITHOUT TOUCHING THEM**) — **each driven through an `'open'`-then-`focusOrder`-then-`focusIndex` sequence inside the attempt.** **Per attempt assert:** the closed member set and its order; `===`/`Object.is` identity of `id` and `target`; the label's presence-or-absence and its verbatim identity; the absence of a fourth member; the caller's array unchanged; and that nothing threw. | `≤100` | **`__/__` (OWED — this row has not been executed; an un-run row is reported as a FAILURE, never as a pass)** |
| **`P-FM-IM-2`** | `P-IM` invariant | **THE OPAQUE `target` — the DOMAIN AND ITS ONE LICENSED OPERATION** | **For EVERY one of the row's `11` target drives, supplied as an entry's `target`: the target travels BY IDENTITY into the returned state's entries and is NEVER CONSULTED — no `typeof` branch on it, no member access, no `hasOwnProperty`, no `String()`/`toString`/`valueOf`/`Symbol.toPrimitive` (recorded counts `0`), no call, no `JSON` round-trip; a REVOKED `Proxy` raises NOTHING; an identity whose `toString`/`valueOf` THROW is carried unharmed; the argument object is unchanged after the call; AND THE ONE LICENSED OPERATION HOLDS: two `'open'` attempts whose targets are `===`-identical ACTIVATE rather than append, while targets that are structurally equal but NOT `===` do NOT activate (`§2.3` item 5 row 3); and NOTHING THROWS.** | **YES (bounded — the property text says "EVERY target drive" while the table drives `11`; the universal is NOT proven)** | `M-3`, `F-6`, `F-13`, `I-6`, `§2.3` items 5/7, `§3.4 R-7` | `S-FM-TARGET-1` | **`11` attempts** = **the `11` target shapes, ONE DRIVE EACH, each driven through `'open'` twice (once alone, once with a second entry carrying the SAME target) plus one `focusOrder` read inside the attempt.** **The `11` shapes:** **(1)** `undefined` (as an explicit entry member — LEGAL) · **(2)** `null` · **(3)** a number (`0`, `NaN`) · **(4)** a string (including `''`) · **(5)** a boolean · **(6)** a `Symbol` and a `12n` · **(7)** a plain object and an array · **(8)** a function · **(9)** an object whose `toString` AND `valueOf` THROW (counts asserted `0`) · **(10)** a REVOKED `Proxy` · **(11)** `Object.create(null)` and a frozen object. **Per attempt assert:** `===`/`Object.is` identity of the returned target; the trap/hook counts; the absence of any read; the ACTIVATION half (same `===` target ⇒ no append; structurally-equal-but-distinct targets ⇒ append); and that nothing threw. **THE POSITIVE CONTROL, named so the instrument is proven live: a driver run against a corpus module that reads `target.type` MUST FAIL this row.** | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-IM-3`** | `P-IM` invariant | **THE ID DOMAIN × THE REFUSAL DOMAIN × THE ORDER SPEC** | **For EVERY one of the row's `10` id drives: the id is compared by `===` ONLY and echoed BY IDENTITY into `state.activeId`, `seated`, `refusals[0].id` and the entries; there is NO coercion, NO trim, NO case fold, NO unicode normalisation, NO length check and NO special case; `focusIndex` returns the OWNED ZERO-BASED index or `-1`, and the `-1` is the ONLY non-index value; the ORDER IS THE CALLER'S ARRAY — `focusOrder` returns an element-identical, order-identical, length-identical sequence and NOTHING is sorted, filtered, deduped or reversed (`§2.3` item 3); EVERY refusal carries `accepted: false`, `changed: false`, `refusals.length === 1` and `state` BY IDENTITY; ONE refusal at most per call; and NOTHING THROWS.** | **YES (bounded — the property text says "EVERY id drive" while the table drives `10`)** | `M-8`, `M-9`, `M-10`, `F-1`, `F-2`, `F-3`, `F-5`, `I-3`, `I-11`, `§2.3` items 3/4/5/8 | `S-FM-ID-1` | **`10` attempts** = **the `10` id-shape drives, ONE DRIVE EACH**, each attempt running the FULL id lifecycle: `'open'` the id, `focusIndex` it, `'activate'` it, `'close'` it, then `'activate'` it again (which must REFUSE `'unknown-id'` — the id is no longer owned). **The `10` shapes:** **(1)** `'a'` (a plain string) · **(2)** `''` (**the empty string is an ordinary id**) · **(3)** `' b\t'` (whitespace, echoed byte-identically; must NOT collide with `''`) · **(4)** `'ünïcøde'` · **(5)** `'x'.repeat(4096)` (a very long id) · **(6)** `0` and `NaN` (**the `Object.is`/same-value-zero boundary**) · **(7)** `false` and `null` (**a `null` ID is legal and distinct from `activeId: null`'s "nothing active" reading — the row asserts BOTH readings in one attempt**) · **(8)** `Symbol()` and `12n` · **(9)** `{}` and `[]` and a function (**three object identities**) · **(10)** a revoked `Proxy` and a trap-throwing `Proxy` — **PLUS the ORDER half re-driven inside each attempt over a deliberately permuted array.** **Per attempt assert:** the index and the `-1` sentinel; the identity at every site; the sequence's element/order/length identity; the refusal verdict shape; and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SM-1`** | `P-SM` state-machine | **THE FIVE-VERB MATRIX × THE ENDS × THE RE-SEATING × THE `changed` OBSERVABLE** | **For EVERY one of the row's `6` matrix sweeps: every cell of the declared `5 × 6` attempt matrix returns the DECLARED `accepted`/`changed`/`seated`/refusal verdict; `changed` is `true` EXACTLY for the accepted attempts whose state record DIFFERS BY IDENTITY and `false` for every other cell (`changed === (next !== previous)`, never the verb's identity); AN UNKNOWN VERB is `'unknown'` with the prior state BY IDENTITY; **THE ENDS REFUSE — `'next'` at the last position reads `'no-next'` and `'prev'` at the first reads `'no-previous'`, with NO WRAP AND NO CLAMP**; a DUPLICATE `'open'` reads `'duplicate-id'` and a re-`'open'` after the refusal reads it AGAIN (the refused occurrence reserved nothing); a `'close'` RE-SEATS to the NEXT-IN-ORDER entry, CLAMPED at the end, and to `null` only when nothing remains; and EVERY refused cell returns the prior state BY IDENTITY.** | **YES (bounded — the property text says "EVERY cell" while the cell drives `6` sweeps over the matrix's five rows; the universal is NOT proven)** | `M-1`…`M-7`, `F-1`, `F-3`, `F-4`, `F-5`, `F-12`, `I-3`, `I-5`, `I-11`, `I-13`, `§2.3` items 2/5/6/9 | `S-FM-MATRIX-1` | **`6` attempts** = **the `5` verb-row sweeps (one per verb, `6` cells each) + `1` whole-matrix sweep re-driven with BOTH recording seams installed.** **The `5 × 6` matrix's axes:** the `5` VERBS (`'open'`, `'activate'`, `'close'`, `'next'`, `'prev'`) × the `6` POSITION/SET states — **empty set · a one-entry set · a two-entry set with the FIRST active · a two-entry set with the LAST active · a two-entry set with NOTHING active · a set with an UNOWNED active id.** **Per attempt assert:** each cell's `accepted`; each cell's `changed` against the `next !== previous` identity; each cell's `seated` identity; each cell's refusal code where refused; the re-seating rule on both `'close'` arms; the prior-state identity on every refused cell; and that nothing threw. **THE FOUR CELLS THAT MUST BE PRINTED, because they are the ones a plausible implementation gets wrong: `('next')` at the LAST position ⇒ `'no-next'`, NOT a wrap to the first · `('prev')` at the FIRST position ⇒ `'no-previous'`, NOT a wrap to the last · `('close')` of the ACTIVE LAST entry ⇒ the NEW LAST entry, NOT `null` · `('open')` with an id owned by a DIFFERENT target ⇒ `'duplicate-id'`, NOT an activation.** | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SM-2`** | `P-SM` state-machine | **CROSS-CALL CONSTANCY, FRESHNESS AND THE ABSENCE OF RETAINED STATE** | **For EVERY one of the row's `3` repeated-call groups: five successive calls with the SAME arguments return EQUAL values on the accepted arm (`toEqual`) and THE SAME STATE BY IDENTITY on the refused arm (`toBe`); each RESULT record is a DISTINCT OBJECT (pairwise `!==`); each ACCEPTED attempt's `state` is a DISTINCT `FocusState` record from the caller's argument; each `refusals` array is fresh (`[] !== []`); the caller's own entry objects are the SAME objects in every call (`toBe`); the recorded seam counts across five identical calls are EXACTLY `5`/`5` (a count of `1` FAILS for a memoized seam and a count of `10` FAILS for a doubled call — BOTH ARMS DRIVEN); and the ORDER-INDEPENDENCE HALF: `focusOrder`'s and `focusIndex`'s results for the same arguments are IDENTICAL whether or not any transition ran first.** | **YES** *(a fixed `3`-group drive set, each group driven five times; the repetitions are ASSERTIONS inside one attempt, not drives — which is why the term is `3` and not `15`)* | `M-12`, `F-11`, `I-2`, `I-12`, `§2.3` item 11, `§2.5` items 1/2 | `S-FM-CONST-1` | **`3` attempts** = **`3` repeated-call groups, each driven FIVE times.** **The `3` groups:** **(1)** an ACCEPTED transition (`'next'` from the first of three) five times — five equal values, five distinct result records, five distinct accepted `state` records, the caller's entries identical in all five · **(2)** a REFUSED transition (`'next'` at the last) five times — five equal values AND `state` IDENTICAL to the caller's argument in all five (`toBe`), one fresh `refusals` array each time · **(3)** the seam-count group — one recording `refuse` and one recording `onChange` driven through five identical calls, with the counts asserted `5`/`0` on the refused arm and `0`/`5` on the accepted one, PLUS the order-independence pair (`focusOrder`/`focusIndex` run BEFORE and AFTER a transition, asserting identical results). **Per attempt assert:** mutual equality; pairwise distinct identity of records; the refused arm's state identity; the counts on both arms; and the order-independence equality. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-TP-1`** | `P-TP` totality | **THE VERB DOMAIN INCLUDING UNKNOWN** | **For EVERY one of the row's `10` verb drives: an UNRECOGNISED verb is NORMALISED to the declared body `'unknown'` — the prior state is returned BY IDENTITY, `accepted: false`, `changed: false`, EXACTLY ONE refusal whose `code` is `'unknown-verb'` and whose `verb` is `'unknown'`, and the `onChange` count is `0`; NO default verb is applied (nothing opens, closes, activates or advances); an unrecognised STRING is NOT prefix-matched, case-folded, trimmed or coerced into a declared body; the `refuse` count is EXACTLY `1`; and NOTHING THROWS — the revoked `Proxy`'s `TypeError` included — WHILE the five declared bodies each take their OWN arm and are never normalised away.** | **YES (bounded — the property text says "EVERY unrecognised verb shape" while the table drives `10`; the universal is NOT proven)** | `F-1`, `F-4`, `I-3`, `I-5`, `§2.3` item 2, `P-FM-3` | `S-FM-TOTAL-1` | **`10` attempts** = **the `5` DECLARED bodies (each driven against a FIXED two-entry state so its own arm is exercised, not merely counted) + the `5` OUT-OF-DOMAIN groups, ONE DRIVE EACH, each driven with a recording `refuse` AND a recording `onChange` in scope.** **The `5` out-of-domain groups:** **(1)** the argument OMITTED (`undefined`) and `null` · **(2)** `''` and an unrecognised string (`'toggle'`) · **(3)** the CASE and WHITESPACE variants (`'OPEN'`, `' open'`, `'open '`, `'open\u0000'`) **and `'unknown'` ITSELF** (a legal string that is NOT a verb — it must be refused `'unknown-verb'`) · **(4)** a number (`0`, `42`, `NaN`), a boolean, a `Symbol` and a `12n` · **(5)** an object, an array, a function, a `new String('open')`, a revoked `Proxy` and a trap-throwing `Proxy`. **Per attempt assert:** the returned `state`'s identity; `accepted: false`; `changed: false`; the code and the `verb` member; both seam counts (`1`/`0`); no fifth state body and no sixth verb body appearing; and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-TP-2`** | `P-TP` totality | **THE MODULE-WIDE UNIVERSAL OVER HOSTILE ARGUMENT SHAPES, PLUS THE REACHABILITY HALF** | **For EVERY one of the row's `10` hostile drives: NONE of the four value exports THROWS — `focusTransition(state, verb, arg)` returns a seven-member `FocusResult`, `focusOrder(entries)` returns a sequence, `focusIndex(state, id)` returns a number and `persist(seam, state)` returns `{present, value}` — for ANY argument, INCLUDING a hostile `state`, a hostile `arg`, `NaN`, a `Symbol`, a `12n`, `Object.create(null)`, a revoked `Proxy`, a trap-throwing `Proxy`, a THROWING ACCESSOR and a THROWING SEAM; AND the declared return shapes hold on every drive (each result's `Object.keys` reads its SEVEN declared names in declared order; the refusal's reads `['code','verb','id']`; the entry's reads `['id','target','label']`-compatible; and no ninth/ eighth/ fourth member appears); AND THE REACHABILITY HALF: all four value exports are reachable from the imported namespace BY NAME.** **THE UNIVERSAL IS OVER THE DRAWN-AND-ENUMERATED DOMAINS OF THIS TABLE AND NOT OVER THE WHOLE INPUT SPACE.** | **YES (bounded — the property text says "ANY argument" while the table drives `10`; the universal is NOT proven)** | `M-14`, `F-7`, `F-8`, `I-1`, `§2.3` item 10, `§2.1` item 2 | `S-FM-OPAQUE-1` | **`10` attempts** = **`9` hostile-argument drives + `1` reachability drive.** **The `9` hostile shapes:** **(1)** `state` omitted · **(2)** `state` = `null` and `undefined` · **(3)** `state` = a number/a string/a boolean/a `Symbol`/a `12n` · **(4)** `state` = `Object.create(null)` and an array · **(5)** `state` = a function · **(6)** `state` = a revoked `Proxy` and a trap-throwing `Proxy` · **(7)** `state` = `{entries: 42}` and `{entries: 'x'}` (**a non-array `entries` reads the empty sequence**) · **(8)** `state` with a THROWING `activeId` accessor and a THROWING `entries` accessor · **(9)** `arg` = `undefined`/`42`/a revoked `Proxy`/`{get refuse(){throw}}`/`{refuse: <throwing fn>}` — plus the same for `focusOrder`'s non-array argument (`42`, `{}`, `'x'`, a revoked `Proxy`). **The `1` reachability drive:** all four names read from the namespace and called once in sequence. **Per attempt assert:** that nothing threw anywhere; each returned member census in declared order; the empty-state reading where declared; and (reachability) the four names' presence by name. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SEAM-1`** | `P-IM` invariant | **SEAM 1 — `refuse`'s FIRING POINT AND PAYLOAD** | **For EVERY one of the row's `6` refusal-verdict drives: `refuse` is INVOKED EXACTLY ONCE per refused attempt and EXACTLY ZERO times per accepted attempt; the record it receives IS the result's own `refusals[0]` BY IDENTITY (`received === result.refusals[0]`); its payload carries the CLOSED code, the verb of record and the caller's own id BY IDENTITY (or `null` for `'unknown-verb'`); the FIVE codes are EACH reachable and the code matches the refusal's CAUSE; a module calling `refuse` for an accepted attempt, twice for one refusal, or with a COPY of the record, FAILS this row.** **⟶ RE-SCOPED BESIDE THIS AS-FILED CELL (`2026-09-27`, supervisor-ADJUDICATED after gate 5's `FM-28`; `§0A` note 10 item 4): THE ADJUDICATED READING IS THAT THE RESULT CARRIES THE MODULE'S OWN record (`refusals[0]`, built BEFORE any callback runs) AND THE `refuse` SEAM RECEIVES **A COPY** IT MAY MUTATE FREELY WITHOUT CHANGING ANY OUTCOME.** **So THIS row's first identity half — `received === result.refusals[0]` — is the AS-FILED reading and is WITHDRAWN as a required identity: what must hold is that THE RECEIVED RECORD'S `code`/`verb`/`id` VALUES EQUAL THE RESULT'S (the caller's own `id` value included, by identity), that THE MODULE'S COPY IS DISTINCT FROM THE RESULT'S RECORD, and that NO CALLBACK WRITE MOVES THE RESULT.** **AND THE `or with a COPY of the record` FAILS-clause is NOT reversed by the ruling: it bans a copy that LOSES THE CALLER'S OWN VALUES (a re-`String()`ed, `JSON`-round-tripped or `structuredClone`d record) — the OBSERVATION COPY above carries the same values and is NOT the copy this clause fails** (`§4.2`'s red; the red-first regression row is the TESTWRITER's) | **YES** *(a fixed `6`-drive set: the five codes plus their accepted-attempt control)* | `M-13`, `F-14`, `§2.4` seam 1, `§2.1` item 8, `P-FM-IM-3` | `S-FM-REFUSE-1` | **`6` attempts** = **the `5` refusal-code drives + `1` accepted-attempt control, ONE DRIVE EACH.** **The `5` drives:** **(1)** `'unknown-verb'` (an unrecognised verb; the refusal's `id` is `null`) · **(2)** `'duplicate-id'` (an `'open'` over an owned id; `id` is the caller's own value) · **(3)** `'unknown-id'` (an `'activate'` over an unowned id) · **(4)** `'no-next'` (`'next'` at the last; `id` is the caller's own `activeId`) · **(5)** `'no-previous'` (`'prev'` at the first; `id` is the caller's own `activeId`). **The `1` control:** an ACCEPTED transition with the same recorder in scope ⇒ count `0`. **Per attempt assert:** the count; the received record's identity with `refusals[0]`; the code; the `verb` member; the `id` member's identity; and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SEAM-2`** | `P-SM` state-machine | **SEAM 2 — `onChange`'s FIRING POINT, PAYLOAD AND COUNT-IS-DATA** | **For EVERY one of the row's `8` accepted-transition drives: `onChange` is INVOKED EXACTLY ONCE, and NEVER for a refused attempt; it is invoked for a NO-OP ACCEPTANCE (`changed: false`) as well as for a moving one; its payload is `(next, previous, refusal?)` with `next` IDENTICAL to the result's `state` (`toBe`), `previous` IDENTICAL to the caller's own `state` argument (`toBe`), and `refusal` `undefined` on every accepted transition; `next === previous` IS PERMITTED on the no-op arm and asserted there; the count is DATA a consumer can read rather than a promise — five identical accepted calls yield a count of exactly `5`; and a module whose firing is derived from `changed` rather than from `accepted` FAILS the no-op arm.** | **YES (bounded — the property text says "EXACTLY ONCE … NEVER for a refused attempt" while the cell drives `8` combos over a `10`-row matrix; the universal is NOT proven)** | `M-13`, `F-11`, `F-14`, `§2.4` seam 2, `§2.4` item 2, `C-4` | `S-FM-NOTIFY-1` | **`8` attempts** = **the `8` accepted-transition combos, ONE DRIVE EACH**, drawn as `2` verb groups × `2` change arms × `2` payload-identity arms (each attempt asserting the count, the two argument identities and the `refusal` slot). **The `2` verb groups:** **(1)** a STATE-MOVING verb (`'open'` appending, `'activate'` seating, `'close'` dropping) · **(2)** a SET-STABLE verb (`'activate'` on the already-active id, `'open'` re-activating an existing same-target entry). **The `2` change arms:** **(a)** `changed: true` · **(b)** `changed: false`. **The `2` payload arms:** **(i)** `next` a DISTINCT fresh record (`next !== previous`) · **(ii)** `next === previous` by identity (the no-op arm) — **PLUS the same `8` combos re-driven with a THROWING `onChange` and a NON-CALLABLE one, whose counts stay `0`/`1` as declared and whose throws are swallowed (`P-FM-SEAM-3` owns the degradation's assertion; this row owns the count).** **Per attempt assert:** the count (`1` for every combo, `0` for the refused control); `next`'s and `previous`'s identities; the `refusal` slot; the record's seven members; and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SEAM-3`** | `P-TP` totality | **ALL THREE SEAMS' NINE DECLARED DEGRADATIONS** | **For EVERY one of the row's `9` degradation drives — `3` seams × `{absent, non-callable, throwing}`: THE RESULT IS OTHERWISE IDENTICAL to the no-seam case** (`accepted`/`changed`/`seated`/`refusals`/`state`-identity all unchanged); for `refuse`, **a refusal's record STILL LANDS in `FocusResult.refusals` whatever the callback does**; for `onChange`, **an accepted transition STILL LANDS and `changed` is unchanged**; for `persist`, **the three degradations all read `{present: false, value: undefined}`**; for the THROWING arms **the throw is SWALLOWED and NOTHING ESCAPES**; for the NON-CALLABLE arms **NO CALL IS ATTEMPTED**; and **a module whose seam throw converts an accepted attempt into a refusal, that lets a throw escape, or that widens the five-code union with a caller-code code, FAILS this row.** | **YES** *(a fixed `9`-cell grid — `3` seams × the `3` degradations — with every cell's declared reading)* | `F-8`, `F-14`, `M-13`, `§2.4` (all three columns), `§0` ruling 8, `I-14` | `S-FM-DEGRADE-1` | **`9` attempts** = **`3` seams × `3` degradations, ONE DRIVE PER CELL.** **The `3` seams:** **(1)** `refuse` · **(2)** `onChange` · **(3)** `persist`. **The `3` degradations:** **(a) ABSENT** (the member/argument omitted, and separately `undefined`) · **(b) NON-CALLABLE** (a number, a string, an object, an array, a `Symbol`, a revoked `Proxy`) · **(c) THROWING** (a callable that throws synchronously). **Per attempt assert:** the result's `accepted`/`changed`/`seated` and its `refusals` content; `state`'s identity on the refused arm; the seam's own count where it is callable (`0` never, `1` where declared); for `persist`, the `{present, value}` pair; that nothing escaped; and that the refusal domain's membership is unchanged (five codes, never a sixth). **THE POSITIVE CONTROL, named so the instrument is proven live: a driver run against a corpus module that LETS a seam throw escape MUST FAIL this row.** | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SEAM-4`** | `P-TP` totality | **THE REFUSAL CALL COUNT, IN ATTEMPT ORDER** | **On EVERY refusal drive of the row: the `refuse` seam's call count over a KNOWN sequence of refusals of all five codes is EXACTLY `5`; the recorded codes are EXACTLY the five IN ATTEMPT ORDER (`'unknown-verb'`, `'duplicate-id'`, `'unknown-id'`, `'no-next'`, `'no-previous'`); no call is duplicated, dropped or reordered; and **a mismatch on ANY of the three — the count, the order, or a duplicate — FAILS this row, which is the whole reason the row exists.** | **YES** *(a fixed `5`-refusal sequence with its declared order)* | `F-14`, `M-13`, `§2.4` seam 1, `§2.4` item 2, `C-3` | `S-FM-COUNT-1` | **`5` attempts** = **the `5`-refusal sequence, ONE DRIVE PER REFUSAL, with the recorder read after EACH drive** — so a mis-count, a mis-order or a duplicate is caught at the step it occurs rather than at the end. **The sequence, in this exact attempt order:** **(1)** `'unknown-verb'` (drive the verb with an unrecognised value) · **(2)** `'duplicate-id'` (drive `'open'` over an owned id) · **(3)** `'unknown-id'` (drive `'activate'` over an unowned id) · **(4)** `'no-next'` (drive `'next'` at the last position) · **(5)** `'no-previous'` (drive `'prev'` at the first position). **Per attempt assert:** the running count (`k` after the `k`-th refusal, so the assertion is per step); the running code sequence's exact equality; the received record's identity with that step's `refusals[0]`; and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-SEAM-5`** | `P-TP` totality | **SEAM 3 — `persist`'s RETURNED-WRITE RULE, AND THE `persisted` MEMBER** | **On EVERY drive of the row: `persist` CALLS NO STORAGE — the module writes no file, touches no `localStorage`/`sessionStorage`/`indexedDB`, allocates no store handle, and retains no reference to the seam or to its return value after the call returns; a callable seam's return value is handed back VERBATIM BY IDENTITY in `{present: true, value}` — whatever shape it is, INCLUDING `undefined`, a promise, a hostile `Proxy` and an object — and is NEVER interpreted (no `typeof`, no member read, no truthiness test, no await); the three degradations read `{present: false, value: undefined}`; `focusTransition` NEVER calls it (so no transition row can move its count); and NOTHING THROWS.** | **YES** *(a closed `5`-drive set, each with its own declared reading)* | `M-13`, `F-8`, `F-11`, `I-4`, `§0A` note 3, `§2.4` seam 3, `§2.2` `P-FM-9` | `S-FM-WRITE-1` | **`5` attempts** = **`5` return-shape drives, ONE DRIVE EACH**, each with a recording fake-storage object ALSO in scope (never passed to the module) whose write counters must read `0`. **The `5` shapes:** **(1)** a seam returning a plain object (`{n: 1}`) — handed back by identity · **(2)** a seam returning `undefined` — `{present: true, value: undefined}`, which is a DIFFERENT reading from the absent-seam arm and must be asserted separately · **(3)** a seam returning a `Promise` — handed back unharmed, never awaited, no unhandled-rejection bookkeeping · **(4)** a seam that THROWS — `{present: false, value: undefined}` with the throw swallowed · **(5)** a NON-CALLABLE seam (a number/a revoked `Proxy`) and a seam that is a hostile `Proxy` whose `apply` trap throws — `{present: false, value: undefined}` with no call attempted OR a swallowed throw. **Per attempt assert:** the `{present, value}` pair; the fake storage's write counters (`0`); the absence of a retained reference (a second call observes a fresh state); and that nothing threw. | `≤100` | **`__/__` (OWED — un-run)** |
| **`P-FM-TP-2`**'s **reachability half** — *(counted here, inside `P-FM-TP-2`'s own row above, so NO row carries two terms)* | — | — | — | — | — | — | — | — | — |

**⟶ THE ROW COUNT AND THE TERM COUNT, STATED SEPARATELY BECAUSE THE AS-FILED HEADING PRINTED THEM AS ONE NUMBER
(disposition (b); the dated note is `§0A` note 9).** **THE ROW COUNT IS `13` ROWS: TWELVE TERM-CARRYING ROWS — the
twelve `ID` cells immediately above, `P-FM-IM-1` through `P-FM-SEAM-5` — PLUS ONE ROW THAT CARRIES NO TERM AT ALL, the
TRAILING ANNOTATION ROW for `P-FM-TP-2`'s REACHABILITY HALF.** **ITS TERM COUNT IS `12` TERMS IN THIS TABLE** (the
twelve cells, unchanged: `10` · `11` · `10` · `6` · `3` · `10` · `10` · `6` · `8` · `9` · `5` · `5`), **and the
register's THIRTEEN-TERM LIST is the one `§5.5.3` prints and declares, whose sum is `98`.** **WHY THE TERM-LESS ROW IS
STILL A ROW: IT IS AN ASSERTION ROW, NOT A TERM ROW** — it asserts that the reachability drive is the TENTH drive
INSIDE `P-FM-TP-2`'s own cell, it carries a DECLARED strategy id (`S-FM-REACH-1`, the thirteenth id, so no row is left
without one), and it declares no attempt of its own because the drive it names is already counted in `P-FM-TP-2`'s term
of `10`. **NO ROW ID MOVES AND NO ROW IS DROPPED, MERGED OR RENUMBERED; the as-filed heading `13` typed ROWS carrying
`13` TERMS stays visible at `§5.5.1` and at `CURRENT STATE` item 3.** **AND THE FORM-VERSUS-FIGURE ANSWER IS EXPLICIT:
THIS COUNTING CHANGE ALTERS THE **FORM** OF THE REGISTER'S PRESENTATION — three claims (`13` rows · `12` term-carrying
rows · the thirteen-term declared list) where the heading printed one — AND IT ALTERS NO **FIGURE**: the twelve cells,
the declared total `98`, the seven `(bounded)` markings, the thirteen strategy ids, the caps and the row set are ALL
UNCHANGED.** **The reconciliation of this table against the declared list is `§5.5.3`'s, and it is printed there with
its arithmetic rather than asserted** (`§5.5.3`; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).

**THE REGISTER'S OWN TERM TABLE, printed before the rows are read, so no reader has to add the cells up by eye** — **see `§5.5.3` for the authoritative arithmetic, the chain and the family subtotals.**

#### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

1. **THE ROW COUNT IS AN EXTENT, AND THE OVERSHOOT IS JUSTIFIED ONCE** (`§5.5`'s ruling block): **`13` rows / `13`
   terms, above the `≤8` breakdown SIGNAL, with the separable properties the domains demand each accounted for by
   their own row** — **`P-FM-IM-2` (the never-consulted target and its ONE licensed operation), `P-FM-SEAM-4` (the
   refusal CALL COUNT) and `P-FM-SEAM-5` (`persist`'s returned-write rule)**. **THE BREAKDOWN RECOMMENDATION,
   restated: `P-FM-IM-3`'s id half and order half are separable in principle, and `P-FM-TP-2`'s universal could be
   split per entry point — splitting them is NOT owed, NOT done, and changes no term.**
2. **THE `(bounded)` MARKINGS ARE OWED WHEREVER A PROPERTY TEXT QUANTIFIES OVER A DOMAIN LARGER THAN ITS TABLE — and
   this register carries SEVEN: `P-FM-IM-1` · `P-FM-IM-2` · `P-FM-IM-3` · `P-FM-SM-1` · `P-FM-TP-1` · `P-FM-TP-2` ·
   `P-FM-SEAM-2`** — `7` of the `13` rows, **and these SEVEN are exactly the ids the row cells carry** — **the seven
   cells that carry the marking are `P-FM-IM-1` (a `10`-shape drive over *"EVERY entry drive"*), `P-FM-IM-2` (an
   `11`-shape drive over *"EVERY target drive"*), `P-FM-IM-3` (a `10`-shape drive over *"EVERY id drive"*),
   `P-FM-SM-1` (a `6`-sweep cell over *"EVERY cell"* of a `5 × 6` matrix), `P-FM-TP-1` (a `10`-drive cell over *"EVERY
   unrecognised verb shape"*), `P-FM-TP-2` (a `10`-drive cell over *"ANY argument"*) and `P-FM-SEAM-2` (an `8`-combo
   cell over *"EXACTLY ONCE … NEVER for a refused attempt"* over a `10`-row matrix)** — **and no other row carries the
   marking: the remaining SIX rows (`P-FM-SM-2` · `P-FM-SEAM-1` · `P-FM-SEAM-3` · `P-FM-SEAM-4` · `P-FM-SEAM-5`, plus
   `P-FM-TP-2`'s own reachability half) each state a bounded quantification over their OWN grids (`"EVERY one of the
   row's N"`), a closed named list or a closed drive set** (`7 + 6 = 13` when the reachability half is read inside
   `P-FM-TP-2`'s row, so the count is checkable rather than asserted). **A row marked `(bounded)` IS NOT A PROOF of
   the unbounded universal it states, and no reader may read it as one.** **A marking is a count of ROWS and moves NO
   term: the `13` rows, the `13` terms and the declared total `89` are UNCHANGED by this set** (`§5.5.3`). **⟶ AND THIS SENTENCE IS THE SECOND OF THE TWO AS-FILED `89` SITES A CLOSE-OUT PASS DISCLOSED (`2026-09-27`, the same pass that disclosed `§5.5.1`'s "What this section is" sentence; the as-filed words *"the `13` rows, the `13` terms and the declared total `89`"* STAND and are NOT rewritten): the register's AUTHORITY is the DECLARED THIRTEEN-TERM LIST whose sum is `98`, the TERM-CARRYING ROWS are `12` of the `13`, and the TABLE's own `12` cells sum to `93` — the `5` separating `98` from `93` being CARRIED OPEN AS OWED at `§5.5.3`, never smoothed here.** **⟶ AND
   THIS SUMMARY SENTENCE — the one place in this subsection that still printed the AS-FILED total `89` with NO
   annotation covering it — IS CORRECTED BESIDE ITS AS-FILED FORM (`2026-09-27`, supervisor-ADJUDICATED after gate 4's
   `F8`; `§0A` note 10 item 5): THE DECLARED TOTAL THIS SET LEAVES UNCHANGED IS **`98`** — the sum of the
   THIRTEEN-TERM DECLARED LIST (`10 + 11 + 10 + 6 + 3 + 10 + 10 + 6 + 8 + 9 + 5 + 5 + 5`) — and it is the figure every
   cap comparison uses (`98 ≤ 400`; largest row `11 ≤ 100`), while the TABLE's own `12` cells sum to `93`, printed
   BESIDE it as what IT is.** **THE MARKING IS A COUNT OF ROWS AND MOVES NO TERM: the `13` ROWS, the `12`
   TERM-CARRYING cells, the thirteen-term list and the declared total `98` are all UNCHANGED by this set** (`§5.5.1`'s
   table annotation; `§5.5.3`). **THE AS-FILED `89` STAYS VISIBLE HERE AND IS NOT THE FIGURE TO QUOTE.**
3. **THE DECLARED-VERSUS-DISTINCT LEDGER, printed because the DONE row must reconcile both** (`§5.3` item 11):

   | Row | Declared term | The honest DISTINCT-drive figure | What the difference is |
   | --- | --- | --- | --- |
   | `P-FM-IM-1` | `10` | `10` | none — the three sub-assertions (shape, identity, label) ride inside each attempt |
   | `P-FM-IM-2` | `11` | `11` | the double-`'open'` activation arm is inside each attempt |
   | `P-FM-IM-3` | `10` | `10` | the five-step id lifecycle and the order half are inside each attempt |
   | `P-FM-SM-1` | `6` | `6` | none — the sweeps' cell assertions are inside each attempt |
   | `P-FM-SM-2` | `3` | `3` | the five repetitions per group are **assertions inside one attempt**, not drives |
   | `P-FM-TP-1` | `10` | `10` | the two seam recorders riding each attempt are assertions, not drives |
   | `P-FM-TP-2` | `9` | `9` | the reachability drive is the tenth attempt and is counted in the term (see `§5.5.3`) |
   | `P-FM-SEAM-1` | `6` | `6` | none |
   | `P-FM-SEAM-2` | `8` | `8` | the throwing/non-callable re-drives are assertions inside the attempts |
   | `P-FM-SEAM-3` | `9` | `9` | none |
   | `P-FM-SEAM-4` | `5` | `5` | the per-step assertion is inside each drive |
   | `P-FM-SEAM-5` | `5` | `5` | none |
   | **THE THIRTEEN TERMS** | **`89` = `10 + 11 + 10 + 6 + 3 + 10 + 10 + 6 + 8 + 9 + 5 + 5 + 5` — SEE `§5.5.3` FOR THE AUTHORITATIVE FORM** | **`89` — IDENTICAL, because NO row of this register collapses a term** | **NONE: a −3-type collapse is possible only where a row re-reports `N` cells as fewer DISTINCT sweeps, and this register's rows each declare one drive per table member. THE ONE FIGURE A READER MUST NOT SUBSTITUTE: the DISTINCT total is NEVER used for a cap comparison.** |

   **THE DISTINCT FIGURE IS A REPORTED FIGURE AND IS NEVER SUBSTITUTED FOR THE DECLARED TOTAL.** **The caps compare
   against the DECLARED figures** (`89 ≤ 400`; largest row `11 ≤ 100`). **AND ONE HONEST ASYMMETRY, STATED SO THE
   TABLE IS NOT READ AS A DERIVATION: `P-FM-TP-2`'s cell declares TEN drives while its prose names `9` hostile shapes
   plus `1` reachability drive — the term is `10` and the shape count is `9 + 1`, which is why `§5.5.3`'s term table
   carries the arithmetic rather than a shape count.** **⟶ ANNOTATED BESIDE THE AS-FILED FORM (disposition (c); `§0A`
   note 9): the `9 + 1` SHAPE-VERSUS-TERM reading is WITHDRAWN — as an arithmetic claim it is FALSE, because `9 + 1`
   added to the twelve cells' `93` sums to `103` and not to `98` (`§5.5.3`).** **The SHAPE COUNT itself is unaffected —
   `P-FM-TP-2`'s cell really does declare `10` attempts over `9` hostile shapes plus `1` reachability drive — and THE
   TERM `10` DOES NOT MOVE; what is withdrawn is the reading that treats that split as closing the declared total.**
4. **THE SHAPES DELIBERATELY EXCLUDED FROM EVERY POOL — named as a STATED BOUNDARY rather than left implied:**
   **(a)** **a `sort`-bearing or comparator-bearing argument shape** (the contract has no comparator parameter at all —
   `§2.2`(D)'s `FocusEquality` row — so driving one would exercise no rule this unit pins) · **(b)** **a
   `Symbol.toPrimitive` that throws only on its SECOND invocation** (it would make a count ambiguous, and **this
   module consults no coercion hook at all** — `P-FM-IM-2`'s count-`0` assertion is the stronger claim) · **(c)** **a
   seam whose call count depends on a timer** (equally ambiguous; the count rows assert the count instead) · **(d)**
   **a store or persistence instrument** (the contract has no storage surface to observe — `P-FM-SEAM-5` asserts the
   ABSENCE via a recording fake storage). **NONE of the four is an unrecorded omission, and a pass that wants one
   driven owes a NEW dated amendment and a register re-grain under `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.**
5. **THE POOL-VERSUS-BOUNDARY CHECK, RUN AT FILING — and its honest result.** **Each row's pool/table was read
   against its own boundary text, and the check is CLEAN for all `13` rows**: every pool member is consistent with the
   row's declared domain, no `(bounded)` row's cell claims its grid IS the domain, and no unmarked row quantifies over
   an open domain. **The ONE cell the check FLAGGED and this filing records rather than smooths is `P-FM-TP-2`'s
   `9 + 1 = 10` shape-versus-term asymmetry (item 3's closing sentence)** — **a stated reading, not a defect.** **⟶
   ANNOTATED BESIDE THE AS-FILED FORM (disposition (c); `§0A` note 9): the reading is WITHDRAWN AS AN ARITHMETIC CLAIM —
   it was the filing's attempt to close the declared total through that split, and that split does NOT close it: `9 + 1`
   over the twelve cells' `93` sums to `103`, NOT to `98`.** **NO CELL, TERM OR FLAGGED SHAPE MOVES; the flagged reading
   stays VISIBLE here and at `§5.5.3`, and the declared total `98` remains the figure the caps compare against.**
   **A `(bounded)` marking that is missing is a SPEC FINDING, and a marking that is present on a closed-domain row is
   OVER-STRENGTH.**
6. **THE RECURSION / NESTED-READ HAZARD, NAMED BECAUSE THE FAMILY HAS BEEN BITTEN BY IT:** **this unit has NO
   recursion** — its reads are **two `===` comparisons, an array index read and a record-member read** — **so the
   hazard class is structurally absent**, and **the row that would expose it is `P-FM-TP-2`, whose pool includes a
   self-referential object and a deeply nested array as an `id`/`target` (both carried by identity and never
   traversed).** **A pass that finds a recursion here is finding a contract violation, not a boundary.**
7. **WHAT THIS REGISTER CANNOT PROVE, stated so no DONE row over-reads it: it proves NOTHING about a focused element,
   a rendered entry, a key handled, an interaction, a store written, a notification emitted, an OS, or the app.**
   **Every claim above is a value, a count, a key-set name, a call count or a file-property claim over arguments.**
8. **THE THREE DECLARED READINGS THAT READ THROUGH THESE ROWS ARE READINGS, NOT RULINGS, AND EACH IS REVERSIBLE**
   (`§7a.1`): **the ENDS' refusal (a clamp or wrap would MOVE `P-FM-SM-1`'s expectation strings and owe a
   re-grain) · the TARGET-ACTIVATION reading of `'open'` (a pure append-or-refuse reading would MOVE `P-FM-IM-2`'s
   activation half and `P-FM-SM-1`'s printed cell) · and the FIVE-CODE refusal count (a sixth DECLARED member would
   MOVE `P-FM-TP-1`/`P-FM-SEAM-1`/`P-FM-SEAM-4` and owe a re-grain).** **A reversal of the identity-equality rule
   (a caller-supplied `equals`) would MOVE `P-FM-IM-3` and every opacity row.**
9. **THE CROSS-ROW ASSERTIONS, printed BESIDE the terms and NEVER counted inside them** (`A DECLARED REGISTER TERM IS
   A DRIVE COUNT`): **(1)** the two result records' declared key sets are asserted on EVERY attempt of the whole
   register; **(2)** the caller's arguments are asserted UNCHANGED on every attempt; **(3)** the "nothing threw" claim
   is asserted on every attempt of every row; **(4)** the refusal-count/`seated`/`changed` triple is asserted on every
   refusal and every acceptance; **(5)** the no-module-level-mutable-binding reading is a **static companion
   assertion** reported beside the terms (`R-3`); and **(6)** the no-listener/no-element-parameter reading is a
   **static** claim (`R-2`/`R-10`) reported beside them.
10. **THE COVERAGE GAP THIS REGISTER RECORDS RATHER THAN HIDES.** **NO ROW of this register drives a FOCUSED ELEMENT,
   a rendered entry, a notification or a stored state** — **because this contract has no such half**: it renders
   nothing, routes nothing and stores nothing (`§1` items 3/4/7). **That is a CONTRACT boundary, not a gap**: **it is
   recorded here so a later pass cannot read the register's silence as an undriven obligation**, and **a pass that
   wants such a half driven owes a NEW GATE in the unit that OWNS that surface (`F3` or a UI unit), not a register
   row here.**

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THIS REGISTER CARRIES ONE DECLARED FIGURE, AND IT IS THE SUM OF ITS OWN THIRTEEN PRINTED TERMS — `98`.**
**THERE IS NO SECOND (DISTINCT) FIGURE BECAUSE NO ROW OF THIS REGISTER COLLAPSES A TERM** (`§5.5.2` item 3's ledger is
the authority for that reading) — **and NO SEED AND NO GENERATOR EXISTS ANYWHERE IN IT: the register is EXHAUSTIVE
ENUMERATION throughout** (`§5.5.1`'s execution discipline item 2).

**⟶ ONE CORRECTION, PRINTED BESIDE ITS AS-FILED FORM RATHER THAN SMOOTHED, BECAUSE
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` MAKES A TOTAL THAT IS NOT THE SUM OF ITS OWN PRINTED TERMS A REVIEW
FINDING.** **AS FILED IN `CURRENT STATE` ITEM 3 AND IN `§5.5.1`'s HEADING, THIS REGISTER READ `89` DECLARED
ATTEMPTS. `89` IS NOT THE SUM OF THE THIRTEEN TERMS THE ROW CELLS PRINT, WHICH IS `98` — the mis-sum arose while
printing the terms (the arithmetic below is the check that caught it, which is exactly the mechanism the ruling
exists to force).** **NO TERM, ROW ID, STRATEGY ID, SEED, CAP OR POOL MEMBER MOVES BY THIS CORRECTION: the thirteen
CELLS are the authority and they are unchanged; only the total, its chain and the subtotals are re-printed as the
sums of those cells.** **The as-filed `89` is kept VISIBLE at `CURRENT STATE` item 3, at `§5.5.1`'s heading and at
`§7` item 9 — and this subsection is the authoritative arithmetic.**

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses.**

**`98` = `10` + `11` + `10` + `6` + `3` + `10` + `10` + `6` + `8` + `9` + `5` + `5` + `5`**

**THE DECLARED CHAIN, the thirteen terms summed as a chain of twelve steps: `10` → `21` → `31` → `37` → `40` → `50` →
`60` → `66` → `74` → `83` → `88` → `93` → `98`.** *(AS FILED: this chain closed `… 88 → 93 → 89` — the last step is
corrected here, and no earlier step moves.)*

**⟶ THE ARITHMETIC CORRECTED SO EVERY PRINTED FIGURE IS WHAT IT SAYS IT IS — THE THREE FIGURES THE HARNESS ALREADY
ASSERTS, PRINTED BESIDE THE AS-FILED FORM AND SMOOTHED NOWHERE (disposition (c); the dated note is `§0A` note 9).**
**THE DECLARED TOTAL IS UNCHANGED: `98`, printed above WITH the THIRTEEN TERMS it is the sum of, and `98` REMAINS THE
AUTHORITY this register declares.** **THE TERM TABLE BELOW PRINTS TWELVE CELLS, AND THEIR OWN SUM — WHICH IS `93`, NOT
`98` — IS PRINTED HERE AS WHAT IT IS: `10` + `11` + `10` + `6` + `3` + `10` + `10` + `6` + `8` + `9` + `5` + `5` =
`93`.** **AND THE `9 + 1` READING IS WITHDRAWN: the claim that reading one row that way "also closes on `98`" is FALSE,
and the arithmetic that shows it is `93` + `10` = `103` — that reading sums to `103` and NOT to `98`.** **THE AS-FILED
FIGURES STAY VISIBLE — `89` at `CURRENT STATE` item 3, `§5.5.1`'s heading, `§5.5.3`'s correction note and `§7` item 9;
`98` as this register's declared total; and the withdrawn `9 + 1` reading at `§5.5.2` item 3's closing sentence and
`§5.5.2` item 5's flagged reading, both of which this pass annotates rather than rewrites.** **AND THE HONEST RESIDUE,
REPORTED RATHER THAN CLOSED: NO READING OF THESE PRINTED CELLS GENUINELY CLOSES ON `98` — the `5` that separates the
declared total `98` from the twelve cells' `93` is carried by NO printed cell, because the THIRTEENTH term exists only
inside `§5.5.3`'s DECLARED thirteen-term list above and NOT in the table below — so the only way to close it would be to
MOVE A TERM, WHICH THIS PASS DOES NOT DO AND REPORTS INSTEAD.** **NO TERM, ROW ID, STRATEGY ID, SEED, CAP OR POOL
MEMBER MOVES, AND THIS REGISTER'S THIRTEEN-TERM TOTAL IS UNCHANGED AT `98`.** **THE CAPS, RE-CHECKED AGAINST THE
DECLARED FIGURE AND UNMOVED: `98 ≤ 400` — total headroom `302` — and the LARGEST ROW `11 ≤ 100`, headroom `89`: BOTH
HOLD against the declared total.**

**THE TERMS, AS THE ROW CELLS ACTUALLY CARRY THEM — and this table is the AUTHORITY (`§5.5.2` item 3's ledger's
source):**

| The term | Its row | Its type | The enumeration that produces it |
| --- | --- | --- | --- |
| **`10`** | `P-FM-IM-1` | `P-IM` | the `10`-shape entry-argument pool, one drive each |
| **`11`** | `P-FM-IM-2` | `P-IM` | the `11` target shapes, one drive each |
| **`10`** | `P-FM-IM-3` | `P-IM` | the `10` id-shape drives, one drive each |
| **`6`** | `P-FM-SM-1` | `P-SM` | the `5` verb-row sweeps + `1` whole-matrix sweep |
| **`3`** | `P-FM-SM-2` | `P-SM` | `3` repeated-call groups, each driven five times (the repetitions are ASSERTIONS inside one attempt) |
| **`10`** | `P-FM-TP-1` | `P-TP` | the `5` declared verb bodies + the `5` out-of-domain groups |
| **`10`** | `P-FM-TP-2` | `P-TP` | `9` hostile-argument drives **+ `1` reachability drive** (both inside this row's cell — see `§5.5.2` item 5's flagged reading) |
| **`6`** | `P-FM-SEAM-1` | `P-IM` | the `5` refusal-code drives + `1` accepted-attempt control |
| **`8`** | `P-FM-SEAM-2` | `P-SM` | the `8` accepted-transition combos |
| **`9`** | `P-FM-SEAM-3` | `P-TP` | `3` seams × `3` degradations |
| **`5`** | `P-FM-SEAM-4` | `P-TP` | the `5`-refusal sequence, one drive per refusal |
| **`5`** | `P-FM-SEAM-5` | `P-TP` | the `5` return-shape drives |

**THE TERM-BY-TERM ADDITION, so the total is checkable rather than asserted** *(the order is `§5.5.1`'s row order)*:
**`10` + `11` = `21`** · **`+ 10` = `31`** · **`+ 6` = `37`** · **`+ 3` = `40`** · **`+ 10` = `50`** · **`+ 10` = `60`** ·
**`+ 6` = `66`** · **`+ 8` = `74`** · **`+ 9` = `83`** · **`+ 5` = `88`** · **`+ 5` = `93`** · **`+ 5` = `98`.**
**TWELVE steps, the first term being the chain's own first figure.** **⚠ THE FIGURE THIS ADDITION CLOSES ON — `98` — IS
THE DECLARED THIRTEEN-TERM LIST's SUM: the last step adds the LIST's thirteenth term, which the TABLE above does NOT
carry** — **and the TABLE's own twelve cells sum to `93`, printed with its arithmetic immediately above.** **THE
AS-FILED FORM IS KEPT AND NOTHING HERE IS RE-PRINTED: this addition is the DECLARED LIST's arithmetic and it is
correct as the list's; the `93` figure is the TABLE's own sum and is a DIFFERENT object** (`§0A` note 9, disposition
(c); `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).

**THE SUBTOTALS, stated so the decomposition is CHECKABLE AND TRUE — and stated BOTH ways, because the register's ids
carry a FOURTH family prefix for five rows while its rows carry one of the three declared TYPES:**

1. **BY ID FAMILY (the register's own naming, which the row count is not permitted to merge away — `§5.5.2` item 1):**
   **`IM` = `10 + 11 + 10` = `31`** · **`SM` = `6 + 3` = `9`** · **`TP` = `10 + 10` = `20`** ·
   **`SEAM` = `6 + 8 + 9 + 5 + 5` = `33`** — and the family sum, added ONE GROUP AT A TIME so it is checkable rather
   than asserted: **`31` + `9` = `40`** · **`+ 20` = `60`** · **`+ 33` = `93`.** **⟶ AND THIS CLOSING FIGURE IS
   **NOT** THE TERM LIST'S CLOSING FIGURE, SO THE DEFECT IS RECORDED HERE RATHER THAN SMOOTHED — AND THE DEFECT IS
   THIS FILING'S OWN ARITHMETIC, NOT A CELL'S:** **the THIRTEEN-TERM LIST above sums `98` (`10 + 11 + 10 + 6 + 3 + 10
   + 10 + 6 + 8 + 9 + 5 + 5 + 5`) while the TWELVE CELLS of the term TABLE ABOVE sum `93` (`10 + 11 + 10 + 6 + 3 + 10 +
   10 + 6 + 8 + 9 + 5 + 5`) and the four family subtotals sum `93` — a FIVE-FIGURE GAP between the LIST's `98` and the
   TABLE's `93` (`98 − 93 = 5`) that repeated re-derivations of this decomposition could not close: the
   gap is not in `SEAM`'s addends (`6 + 8 + 9 + 5 + 5` = `33`, re-checked), not in the group totals (`31 + 9 = `40`,
   `40 + 20` = `60`) and not in any single cell.** **THE ONLY HONEST DISPOSITION IS THE ONE THIS FILING ADOPTS: THE
   THIRTEEN PRINTED CELLS AND THEIR SUM `98` ARE THE AUTHORITY (they are what the rows will execute), THE SUBTOTAL
   DECOMPOSITION IS **WITHDRAWN AS DEFECTIVE**, AND ITS RE-DERIVATION IS OWED TO THE NEXT PASS AS A NAMED
   OBLIGATION (`§7` item 9, `§3a A-19`).** **⟶ AND THE SENTENCE'S OBJECT IS NAMED, SO THE AS-FILED PHRASE IS NOT READ
   AS A TABLE OF THIRTEEN: the `98` authority is the DECLARED THIRTEEN-TERM LIST above, and the TABLE carries TWELVE
   cells whose own sum is `93`** (disposition (c); `§0A` note 9). **NO CELL MOVES; the as-filed `89` stays visible at its own two sites;
   and every cap comparison uses the TERM LIST's `98`.** *(The gap is printed rather than hidden because
   `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` makes an unreconciled total a review finding — and a review finding
   CARRIED WITH ITS EVIDENCE is what the ruling asks for.)*
2. **BY DECLARED TYPE (the three families `§5.5`'s ruling block names, read from the `Type` column of `§5.5.1`'s
   rows and from the term table above):** **`P-IM` = `P-FM-IM-1` `10` + `P-FM-IM-2` `11` + `P-FM-IM-3` `10` +
   `P-FM-SEAM-1` `6` = `37`** · **`P-SM` = `P-FM-SM-1` `6` + `P-FM-SM-2` `3` + `P-FM-SEAM-2` `8` = `17`** ·
   **`P-TP` = `P-FM-TP-1` `10` + `P-FM-TP-2` `10` + `P-FM-SEAM-3` `9` + `P-FM-SEAM-4` `5` + `P-FM-SEAM-5` `5` =
   `39`** — checkable: **`37` + `17` = `54`** · **`+ 39` = `93`.** **⟶ THE SAME FIVE-FIGURE GAP APPEARS IN THIS
   DECOMPOSITION TOO (`98 − 93 = 5`), so THIS TYPED FORM IS **ALSO WITHDRAWN AS DEFECTIVE** and its re-derivation is
   owed with the id-family form's (`§7` item 9).** **NO CELL MOVES, and the authoritative figure for every cap
   comparison remains the TERM LIST's `98`.** **THE TYPE ASSIGNMENTS THIS FORM READS ARE THE ROWS' OWN AND ARE NOT
   WITHDRAWN: `P-FM-SEAM-1` is a `P-IM` row (the refusal seam's payload, its record's identity and its verdict), and
   `P-FM-SEAM-2` is a `P-SM` row (the accepted-transition count and its payload across the state machine) — so
   `§5.5.1`'s own `Type` column is the place a later pass reconciles this decomposition against.**

**CAPS RE-CHECKED AGAINST THE AUTHORITATIVE FIGURE.** **`98 ≤ 400`** (total headroom `302`), **largest row `11 ≤ 100`**
(headroom `89`) — **both caps HOLD, and neither is close.** **THE CAPS ARE COMPARED AGAINST `98` (the sum of the
thirteen terms of the DECLARED LIST above — and the TABLE below prints TWELVE cells, whose own sum is `93`) AND NEVER
AGAINST ANY SUBTOTAL FIGURE.**

**THE `(bounded)` SET: `7` of the `13` rows — `P-FM-IM-1` · `P-FM-IM-2` · `P-FM-IM-3` · `P-FM-SM-1` ·
`P-FM-TP-1` · `P-FM-TP-2` · `P-FM-SEAM-2`** — **`7` marked rows** (`§5.5.2` item 2's own count is the authority:
`7 + 6 = 13`), **and the marking is a ROW count, moving no term: the `13` rows and their `13` terms are UNCHANGED by
this set.**

**THE ROW/TERM RECONCILIATION, printed so it is checkable:** **the `13` ROWS and their terms are `IM-1` (`10`) ·
`IM-2` (`11`) · `IM-3` (`10`) · `SM-1` (`6`) · `SM-2` (`3`) · `TP-1` (`10`) · `TP-2` (`10`) · `SEAM-1` (`6`) ·
`SEAM-2` (`8`) · `SEAM-3` (`9`) · `SEAM-4` (`5`) · `SEAM-5` (`5`)** — **that is TWELVE ids carrying TWELVE terms, and
the THIRTEENTH ROW/TERM PAIR IS `P-FM-TP-2`'s OWN REACHABILITY HALF, whose drive is the TENTH DRIVE INSIDE
`P-FM-TP-2`'s CELL** (so `P-FM-TP-2`'s term `10` = `9` hostile shapes + `1` reachability drive, and the register is
`13` ROWS / `13` TERMS **only if that tenth drive is read as its own row** — see `§5.5.1`'s trailing annotation row,
which is the thirteenth row and carries no term of its own). **⟶ ANNOTATED 2026-09-27 (disposition (b); `§0A` note 9):
THE COUNTS HERE ARE NOW STATED SEPARATELY AND CORRECTLY — `13` ROWS, `12` CARRYING A TERM AND `1` CARRYING NONE, and the
TERM COUNT is `12` printed table cells plus the DECLARED LIST's thirteenth term.** **THE HONEST READING, STATED SO NO LATER PASS
INHERITS AN AMBIGUITY: THE AUTHORITATIVE FORM IS `13` ROWS CARRYING `13` TERMS — the thirteen terms of the DECLARED
LIST above, whose sum is `98` (the TABLE below prints TWELVE cells, whose sum is `93`) — and THE TRAILING ANNOTATION ROW
IS A READING AID AND NOT A FOURTEENTH OR THIRTEENTH
TERM.** *(The alternative reading — a `12`-row / `12`-term register, with the reachability drive left inside
`P-FM-TP-2`'s `10` — MOVE no cell and leaves the declared total at `98`; **a later pass that prefers it MUST say so in a dated
annotation rather than by re-numbering.** `§5.5.2` item 5 carries the flagged shape-versus-term reading — **whose
arithmetic claim is WITHDRAWN, `9 + 1` summing to `103` and not to `98`** — and `§7`
item 9 carries the obligation.)* **NO CAP, POOL MEMBER, STRATEGY ID OR EXISTING TERM MOVES UNDER EITHER READING.**

**THE PINNED FORM: NO SEED, NO GENERATOR AND NO DRAW — THE REGISTER IS EXHAUSTIVE ENUMERATION THROUGHOUT**
(`§5.5.1`'s execution discipline item 2). **A future dated amendment that genuinely needs a draw takes seed
`20260927` with the family's hand-rolled one-step-per-draw LCG form** (named at `§5.5.1` item 2), **owes a register
re-grain, and may add NO dependency.**

**NO NEW DEPENDENCY, NO SIXTH LEG, NO `package.json` CHANGE:** the register rides `npm test` (leg 1) unchanged, and
**an un-run register row is reported as a FAILURE, never as a pass.**

**⟶ AND THE HONEST FRAME THIS WHOLE SUBSECTION MUST BE READ IN, STATED ONCE: EVERY FIGURE ABOVE IS CONTRACT DESIGN
AND NONE OF IT IS A RESULT.** **This filing ran NO register row, and the arithmetic defects it records about its own
totals and subtotals are ITS OWN, found while printing the terms as the ruling demands — which is precisely the
mechanism `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` exists to force.** **The next pass's obligations from this
subsection are FIVE, and each is named rather than implied: (1) re-derive the two subtotal decompositions so each
closes on the term list's `98`, or withdraw them for good; (2) state definitively whether the register is `13` rows /
`13` terms (the reachability drive as its own row and term) or `12` rows / `12` terms (the drive inside
`P-FM-TP-2`'s `10`) — either reading is admissible and neither moves a cell; (3) confirm `P-FM-TP-2`'s `9 + 1 = 10`
shape-versus-term reading printed at `§5.5.2` item 5; (4) reconcile the `as-filed` `89` at its three visible sites
(this subsection's opening note, `CURRENT STATE` item 3, `§5.5.1`'s heading) with the authoritative `98`; and (5)
EXECUTE the thirteen rows.** **A pass that resolves (1)–(4) by RE-PRINTING a figure is correct; a pass that resolves
them by MOVING a term, a row id, a strategy id, a cap or a pool member is REVERSING this subsection and MUST OPEN A
GATE.**

**⟶ THE GATE-3 RED RUN'S THREE DISPOSITIONS, READ ONTO THIS SUBSECTION SO ITS THREE FIGURES AND ITS TWO COUNTS STAND
CORRECTED (dated `2026-09-27`; the full measure is `§0A` note 9, and NOTHING IS RE-COMPUTED HERE).** **(1) THE THREE
FIGURES: the declared total `98` — printed with the THIRTEEN TERMS it is the sum of, and UNCHANGED as the authority
every cap comparison uses; the TWELVE TERM CELLS' own sum `93` — printed as what IT is; and the `9 + 1` reading
WITHDRAWN, because it sums to `103` (`93` + `10`) and closes on nothing.** **(2) THE TWO COUNTS, STATED SEPARATELY:
the ROW COUNT is `13` — TWELVE TERM-CARRYING ROWS plus ONE ROW THAT CARRIES NO TERM AT ALL, `P-FM-TP-2`'s REACHABILITY
ANNOTATION ROW, which is an ASSERTION ROW rather than a term row — and the TERM COUNT is `12` printed cells in the
TABLE plus the DECLARED LIST's thirteenth term, which is the object whose sum is `98`.** **(3) THE TERM VERDICT: THE
REGISTER'S THIRTEEN-TERM TOTAL IS UNCHANGED — `98`, not one figure of it moving — and the row/term counting changes the
FORM of the presentation (three claims where the heading printed one number) rather than any FIGURE: no term, row id,
strategy id, seed, cap or pool member moves, and obligation (2) above is therefore DISCHARGED AS FILED rather than left
to the next pass.** **OBLIGATIONS (1), (3) and (4) ARE DISCHARGED HERE IN THE SAME FORM — by ANNOTATING BESIDE the
as-filed text, never by re-printing a figure into a cell — and (5) REMAINS OWED: the thirteen rows are NOT executed by
this pass.** **AND THE SUBTOTAL DECOMPOSITIONS STAND AS FILED: both are still WITHDRAWN AS DEFECTIVE, their
re-derivation stays owed, and the `93` each of them closes on is now printed as the TWELVE CELLS' OWN SUM rather than
read as the term list's closing figure.** **THE REGISTER HARNESS'S OWN ASSERTIONS MUST BE RE-ALIGNED TO WHATEVER THIS
CONTRACT PRINTS, AND THAT IS THE TESTWRITER'S ACT AND NOT THIS ONE'S** (`§0A` note 9; `§4.2`; `§5.3` item 11).

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly. Each half names the rows that would fail.**

1. **THE TRANSITION HALF.** *If a pure, total, stateless `focusTransition(state, verb, arg?)` cannot return the
   declared seven-member result for every input in its enumerated domains — over a closed five-body verb alphabet with
   an unknown verb total, with the ends refusing their own codes, with the first-occurrence duplicate rule reserving
   nothing, with the declared re-seating, with `changed === (next !== previous)` on every accepted attempt and the
   prior state returned BY IDENTITY on every refusal — then the mechanism half is not realisable the way step 3's
   derivation pins it, and the unit fails on that half.* **The tests are `M-1`…`M-7`, `F-1`/`F-3`/`F-4`/`F-5`,
   `I-1`/`I-3`/`I-5`, `R-5`/`R-11`, and the register rows `P-FM-SM-1`/`P-FM-TP-1`/`P-FM-IM-3`.**
2. **THE ORDER HALF.** *If the caller's sequence cannot be carried without an owned order — a sort, a comparator, a
   rank member, a memo, or an edge to either landed projecting host — then the unit is a SECOND ORDER AUTHORITY, the
   collision step 1 called the sharpest is not reconciled, and the unit fails.* **The tests are `M-8`/`M-10`, `F-12`,
   `I-11`, `R-13`, the register row `P-FM-IM-3`'s order half, and `S-FM-11`'s stop.** **AND IT WOULD MAKE `CURRENT
   STATE` item 9 false.**
3. **THE OPACITY HALF.** *If an `id` or a `target` cannot be carried without being named, resolved, property-read,
   coerced, interpolated, type-branched, structurally compared, round-tripped or validated — or if `target` must be
   consulted BESIDE the licensed `===` activation test — then the opacity claim is an adjective rather than a
   contract, and the unit fails.* **The tests are `M-3`/`M-11`, `F-6`, `I-6`, `R-7`, and the register rows
   `P-FM-IM-1`/`P-FM-IM-2`.**
4. **THE SEAM HALF.** *If the three seams cannot be stated as optional caller callbacks with a DECLARED degradation
   each — absent, non-callable and throwing — with `refuse` called exactly once per refusal in attempt order,
   `onChange` exactly once per accepted transition and never for a refusal, `persist` returning a value and calling no
   storage, and NO caller-code throw reported as a contract refusal, then the seam contract is not the family's and the
   unit fails.* **The tests are `M-13`, `F-8`/`F-14`, `I-14`, `R-3`, and the register rows
   `P-FM-SEAM-1`…`P-FM-SEAM-5`.**
5. **THE BOUNDARY HALF.** *If this unit cannot be stated without an import edge to any sibling, without an element, a
   node or a listener in its surface, without a DOM read, without a store and without a write — then the unit is not
   the mechanism `A-d5` adopted, and the unit fails.* **The tests are `R-1`/`R-2`/`R-3`/`R-4`/`R-6`/`R-9`/`R-10`/
   `R-12`, `F-9`/`F-10`, `I-8`/`I-9`/`I-10`/`I-12`, and the register row `P-FM-TP-2`.**
6. **THE LAYER HALF.** *If any row of this unit can only be falsified on a layer this repo does not own — a focused
   element, a rendered entry, a router decision, a stored state — then the `STRUCTURAL`/three-part refusal is not
   honest, gate 6 is not `STRUCTURAL`, and the unit fails.* **The tests are `§5.2`'s block itself, `I-7`,
   `S-FM-10`, and the falsifier printed at `§5.1`'s end.**

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause is found
and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded **before** implementation
continues; **(c)** the unit is **declined back** — admissible only if a clause is shown to be **inseparable from
holding a store, reading a DOM or wiring a surface** (which would refute step 3's derivation and require the
architect's dated annotation, not a spec edit) or **insurmountable without owning an order** (which would owe a NEW
GATE), and **either would be a NEW GATE, not this unit's call.**

**Stop conditions (`S-FM-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row whose
assertion cannot be falsified on `[T]`/`static` is NOT silently dropped and is NOT moved to a `[U]`/`[D]` leg** — it is
marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This filing has ONE such candidate
and it is NAMED rather than hidden: `P-FM-TP-2`'s REACHABILITY HALF** (the four exports being present by name) is a
**runtime presence claim about the module's own namespace** — **it is falsifiable in the node suite (a missing export
is `undefined` and the call fails), so it stays `[T]`; the five TYPE names' presence is NOT runtime-falsifiable and is
carried by leg 5's strict `tsc`, which is why `R-5`(b) is a `tsc`-layer row rather than a `[T]` one.** **No other
candidate exists**, because **every other claim in `§5.5.1` is a value, a count, a key-set name or a file-property
claim over arguments.**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **one new spec file and
   edits nothing else** — **no tracker row, no decision row, no sibling spec, no gate record.** The module, the test
   file, the red set, the legs, the register's executed layer and every gate after gate 1 are **OWED**; **the unit is
   NOT delegable until a TestWriter has RUN and REPORTED the red set** (`§4.5`).
2. **NO ROW OF THIS UNIT MAY BE READ AS A FOCUS, INTERACTION OR RENDERED-ENTRY CLAIM.** **No pass may claim this
   unit's green proves that an entry appeared, that anything was focused, that a key or a pointer selected a verb,
   that a control rendered, that a store was written, that a notification fired, or that any user-visible flow
   changed** (`§5.2`'s reader question: `NONE`).
3. **THE THREE REFUSALS AND THE NON-CLAIMS ARE THE HONEST FORM, AND TWO OF THEM ARE STRUCTURAL.** **`[U]` is not
   offered** (the three-part refusal, `§5.2`, with `docs/specs/zones.md` `§4.4 S-6`'s sentence carried VERBATIM);
   **`[D]` is not claimed, with the `M-46` clause**; **gate 6 is `STRUCTURAL`, never `waived`**; and **the `§7.1`
   predicate decision is `DOES NOT TRIGGER` on BOTH limbs with its evidence and its falsifier.** **A pass that reports
   gate 6 as *"waived"*, or that moves a rejected row to the `ui` leg, is citing a clause this file does not contain.**
4. **THE UNIT IS READABLE WITH THE DEMO DELETED — and that is a requirement of the charter, not a claim about the
   demo.** **No clause of `§2`–`§5` names `src/shared/demo-envelope.ts`, an authored entry, or any demo key; `§5.1`
   DENIES the demo path and the renderer; and `§3.4 R-4` is the row that can FAIL for an import of anything.** **A
   pass that finds a demo-keyed clause in this file is finding a defect in this file.**
5. **THE `persist` SEAM'S NAME IS IMPRECISE AND THE IMPRECISION IS A CONTRACT FACT, NOT A STYLE NOTE** (`§0A`
   note 3). **A reader who expects a file write, a `localStorage` entry or a store from a seam named `persist` is
   reading a clause this contract does not contain** — **and a pass that makes the module WRITE is `S-FM-5`'s stop,
   not a fix.**
6. **THE PAGE-DESIGN LAYER DOES NOT EXIST, AND THIS UNIT RENDERS NO PAGE** — so **there is no test-use-case coverage
   matrix and no demo-page index to update** (`R-14`'s probe; `docs/skills/` holds `process-guardrails.md` alone,
   globbed this pass). **If `docs/skills/designing-pages.md` comes to exist, this unit owes the coverage row and the
   demo-page entry — and the honest form of that row is an ABSENCE row, because a mechanism that renders nothing
   contributes no page.**
7. **THE IDS AND THE TARGETS ARE CALLER CLAIMS, NOT OBSERVATIONS.** **The mechanism resolves no element, matches no
   node, validates no entry and detects nothing about a document, a display or a user setting** (`R-7`, `R-9`), and
   **the honest reading of the whole reducer claim is *"for a caller that supplies a state, a verb and an entry, the
   returned value carries THAT resolution of THAT verb over THAT entry set, and every caller identity is handed back
   untouched."***
8. **THE `docs/FORKER.md` CARRY IS OWED AND IS NOT DELIVERED.** **This unit's four exported signatures, five exported
   types and three seam contracts have no fork-facing carry yet** — **a fork cannot read a contract only this repo can
   honour.** **Owner: whatever pass next touches that file; it gates no unit.**
9. **THE REGISTER'S ARITHMETIC IS PRINTED WITH ITS TERMS, AND TWO OF ITS OWN FIGURES ARE RECORDED AS DEFECTIVE
   RATHER THAN SMOOTHED** (`§5.5.3`): **the thirteen printed row cells sum `98`; the as-filed total read `89`; and no
   subtotal decomposition this filing derived reproduces `98`, so the subtotal sentence is WITHDRAWN as defective and
   the re-derivation is OWED to the next pass — along with the `13`-rows/`13`-terms declaration's reconciliation
   against the twelve-entry term table.** **NO TERM, ROW ID, STRATEGY ID, SEED, CAP OR POOL MEMBER MOVES: the caps are
   `98 ≤ 400` and largest `11 ≤ 100`.** **⟶ CORRECTED BESIDE THE AS-FILED SENTENCES ABOVE (the gate-3 red run's
   disposition (c), `2026-09-27`; the full measure is `§0A` note 9): the THIRTEEN-TERM list sums `98` and `98` is the
   AUTHORITY — it stays printed WITH its thirteen terms and stays the figure every cap comparison uses; the TWELVE TERM
   CELLS' own sum, `93`, is printed as what IT is; and the `9 + 1` reading is WITHDRAWN because it sums to `103`, not to
   `98`.** **THE AS-FILED FIGURES ABOVE ARE KEPT VISIBLE — the thirteen printed row cells' `98`, the total `89` and the
   withdrawn subtotals — and the ROW/TERM COUNTS are stated separately: `13` rows, `12` of them carrying a term and `1`
   carrying none.** **THE REGISTER'S THIRTEEN-TERM TOTAL IS UNCHANGED AT `98`; the counting change alters the FORM of
   the presentation and NO FIGURE; and the caps still hold against the DECLARED figure `98 ≤ 400`, largest row
   `11 ≤ 100`.**
10. **THE TWO WORKING DEFAULTS ARE DEFAULTS, AND NEITHER IS AN ARCHITECT'S RULING.** `§7a`/`§7a.1` carries them in the
    `E5-B-3` form: **default stated, alternative named, clause blocked named, CONFIRM-OR-REVERSE slot carried.** **A
    pass that presents either as a ruling misreads this file** — **they are step 3's derivations and step 4's
    `FILEABLE` conditions, and `DELEGABLE-WITH-CONDITIONS` is a verdict on the PROPOSAL, not an approval of this
    contract.** **The unit's spec gate is still the architect's** (`§4.5`), **and the `§2.1` item 7 five-versus-six
    refusal-code reading and the `§0A` note 6 derived clauses are DEFAULTS of THIS filing, each reversible.**
11. **THE TRACKER ITEMS THIS FILING BELIEVES ARE STILL OWED — listed, and each named with its owner.** **(a)** the
    `F2` ledger row's **`Spec` cell** (`docs/specs/focus-model.md` still reads `OWED — not filed`, stale now that this
    file exists) — **the supervisor's to flip; this pass flipped no cell**; **(b)** the `F2` row's **`Legs` cell**
    (`node suite only`) read against this contract's **five** declared legs — **the same repair the sibling units
    record, and the supervisor's**; **(c)** `docs/FORKER.md` — the fork-facing carry of item 8; **(d)** `docs/defects.md`
    / `docs/HANDOFF.md` — **this unit exercises no `provident-ssr` surface, so they should receive NOTHING, and a pass
    that files a package row for this unit is filing a fabricated entry.**
12. **NO LEG WAS RUN AND NO SHELL WAS HELD BY THIS PASS** — recorded so no later pass quotes any figure here as a
    measurement of its own (`RCA-12`). **The measurements this pass took are READS and one GLOB, each attributed at
    its own site (`§0A` note 1), and none of them is a leg, a suite, a build or a register execution.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from without a default

**This subsection reports, and how to read it.** **TWO items** could not be derived **falsifiably** from the gate-1
record with a single reading, because **two admissible readings both satisfy its words and the choice changes a
PUBLIC SHAPE or a CONSUMER-VISIBLE BEHAVIOUR.** **Both are OPEN with a WORKING DEFAULT** (this filing's choice,
implemented in `§2` and marked as such), with a RECOMMENDATION, **the clause each one BLOCKS, and a
CONFIRM-OR-REVERSE slot for the spec gate.** **No item is left as a silent gap**, and **no `§2`/`§3` row, prohibition,
register row or diff-scope clause is weakened, widened or re-scoped by this report.** **Both items are the dossier's
`D-1`/`D-2` — the two defaults step 3 derived and step 4 adjudicated `FILEABLE` and NOT filing-blockers** — **and
`FQ3`, the third question of the record's `§3.2`, IS NOT AN ITEM HERE: it is ROUTED to the consumer unit's record**
(`§5.4`; `§7a.1`'s closing note). **`§7a.1` therefore carries TWO items and NOT three, and a later pass that adds a
third is re-typing a routed question as a blocker.** **A later pass that changes either default MUST OPEN A GATE**,
and **neither may be presented as an architect's ruling** (the `E5-B-3` form, `docs/decisions.md`).

### 7a.1 THE OPEN ITEMS — two working defaults, none of them a blocker

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) — CONFIRM OR REVERSE | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **`D-1` / `FQ1` — WHAT AN ENTRY IS AS DATA, AND BY EXTENSION THE IDENTITY RULE AND THE DUPLICATE RULE.** The record's step 3 RESOLVES the fork's `FQ1` (*"the entry is a CLOSED record `{readonly id: unknown; readonly target: unknown; readonly label?: string}`"*) and its item 6 adds that *"a duplicate is REFUSED on the first-occurrence rule, with the refused occurrence NOT reserving the id"* — **but neither the record nor the dossier says what a duplicate IS (equal ids, equal targets, or both) nor what `'open'` does with a target it already holds, although item 6's own words name an `'open'` that *"appends or ACTIVATES AN EXISTING ENTRY FOR THE SAME TARGET"*** | **The two leading readings differ in a PUBLIC BEHAVIOUR and in which rows exist**: **(a)** a duplicate is an ID equality and the `target`-activation is a separate acceptance path (**this filing's reading**) — or **(b)** a duplicate is a TARGET equality (so a second entry for one target is refused) and the id is the sole identity for `'activate'`/`'close'`. **Both are consistent with the dossier's `D-1` and with item 6's sentence, and the choice moves the refusal domain, the register's target row and the matrix's `'open'` column** | **THE DEFAULT (implemented): the entry is the CLOSED record `{readonly id: unknown; readonly target: unknown; readonly label?: string}`; identity is the opaque `id` compared by `===` with NO comparator seam; a DUPLICATE is an ID equality and is REFUSED `'duplicate-id'` on the FIRST-OCCURRENCE rule with the refused occurrence NOT reserving the id; and `'open'` with an UNOWNED id whose `target` is `===` to an existing entry's target ACTIVATES that entry instead of appending** (`§2.3` items 1/4/5, `P-FM-IM-1`/`P-FM-IM-2`/`P-FM-IM-3`) | **Do you CONFIRM the id-as-identity + target-activation reading — a closed record, `===` identity on the id, duplicates refused by id, and same-target `'open'` activating — or do you take the alternative: IDENTITY BY `target` (a second entry for one target refused), or a CALLER-SUPPLIED `equals` comparator (the `C-6` reading step 3 did not take)?** | **CONFIRM the id-as-identity + target-activation reading (recommended)** — it is the only reading under which `A-d5`'s *"opaque ids/targets"* clause keeps BOTH values opaque **with no comparator seam at all**, it is the reading under which the `F3` consumer reaches the endpoint shape through the caller's own `label` **without this module owning any vocabulary**, and it is the reading the `===`-only rule makes falsifiable by a coercion-hook-driving row | **NOTHING is blocked on the RECOMMENDED reading. THE REVERSAL IS NAMED AND BOUNDED: a `target`-identity reading MOVES `§2.3` items 4/5, `P-FM-IM-2`'s activation half, `P-FM-SM-1`'s printed `'open'` cell and `§3.2 F-3`/`F-4`, and owes a register re-grain; a caller-supplied `equals` MOVES `§2.2`(D)'s `FocusEquality` row, `P-FM-IM-3`, `R-7` and every opacity row, and ADDS a seam the record's step 3 did not name** |
| **2** | **`D-2` / `FQ2` — WHO SUPPLIES AND OWNS PERSISTENCE, AND WHO OWNS `{entries, activeId}`.** The record's step 3 RESOLVES the ownership (*"the CALLER owns `{entries, activeId}` … the module owns nothing and mutates no argument"*) and the form (*"`persist(state)` RETURNS A VALUE FOR THE CALLER TO STORE — NO STORAGE IS CALLED ANYWHERE"*), **and it records that *"the seam's NAME is RECORDED AS IMPRECISE rather than preserved silently"*** — **but it does not pin HOW the returned value reaches the caller, nor whether the seam is called by the transition or by the caller** | **The two readings differ in a PUBLIC SHAPE**: **this filing's reading** makes `persist` a top-level value export the CALLER calls and whose hand-back is its own return value (`{present, value}`), **while the alternative** passes the seam into `focusTransition` and carries its return as an EIGHTH result member. **The choice moves the export census (`4` vs `4`), the result's member set (`7` vs `8`), the register's seam-3 row and the `R-5` census row** | **THE DEFAULT (implemented): the CALLER owns `{entries, activeId}`; the module owns nothing AND MUTATES NO ARGUMENT, returning the prior state BY IDENTITY on every refusal and a FRESH `FocusState` on every acceptance; and `persist(seam, state)` is a TOP-LEVEL VALUE EXPORT that CALLS THE CALLER'S CALLBACK, CALLS NO STORAGE, and hands the seam's return value back BY IDENTITY as `{present: true, value}` (or `{present: false, value: undefined}` for the three degradations AND for a seam that returns `undefined`)** — **with the seam's NAME RECORDED AS IMPRECISE at `§0A` note 3** (`§2.1` items 4/10, `§2.4` seam 3, `P-FM-SEAM-5`, `P-FM-IM-1`'s identity half) | **Do you CONFIRM persistence ownership as a RETURNED VALUE — the caller holds `{entries, activeId}`, `persist` is a caller-called export that returns the seam's own value, and the module calls no storage — or do you take the alternative: the seam passed into `focusTransition` and its return carried as an EIGHTH result member; or the THIRD reading `§3.1` finding 3 names, that the seam is MISNAMED and should be re-named?** | **CONFIRM the returned-value reading (recommended)** — it is the only reading under which the module keeps its FOUR value exports and its SEVEN-member result **without a seam-derived member**, it is the reading `E5-B-1`'s returned-write precedent supports, and it is the reading under which NO storage call exists to be smuggled; **the `MISNAMED` reading is CONFIRMED AS RECORDED (the imprecision is stated at `§0A` note 3) rather than taken as a re-name, because the token is the CHARTER's** | **NOTHING is blocked on the RECOMMENDED reading. THE REVERSAL IS NAMED AND BOUNDED: a seam-in-the-transition reading MOVES `§2.1` items 3/4/10, `§2.4` seam 3, the result's member set (to eight), `§5.3` item 3's census sentence, `P-FM-SEAM-5` and the whole register's seam family, and owes a register re-grain; a RE-NAME moves `§2.1` items 4/10, `§2.2`(D)'s `persist` row, `§2.2`(C) row 5 and every citation of the token, and needs the ARCHITECT because the token is the charter's (`I-1`) |

**`FQ3` DOES NOT SURVIVE AS AN OPEN ITEM HERE, AND IS RECORDED AS ROUTED RATHER THAN AS `NOT SURVIVING`.** **It is not
a default this filing could take, because it is not this unit's identifier at all**: **step 3's return states in terms
that `FQ3` *"is NOT this unit's and does not block its filing"***, **step 4 agreed, and the dossier files it as `§5`'s
ONE OPEN ROW** — **so it is carried at `§5.4` as OWED TO `F3`'s record, and it is recorded in `docs/next-steps.md`'s
`F3` row by the pass that owns that row, not here** (`docs/specs/focus-model-adoption-dossier.md` `§5`). **A later
pass that re-derives it as an open item of THIS unit is re-typing a routed question as a blocker, and `§7a`'s own
arithmetic (TWO items) is the record that it is not one.**

**The report's arithmetic, stated so the gate is checkable: `2` items reported · `2` OPEN with a working default and a
recommendation · `2` clause groups blocked by an OPEN item (`D-1`'s entry/identity/duplicate block · `D-2`'s
persistence block) · `1` question (`FQ3`) CARRIED AS ROUTED, not as an open item · `0` items left as a silent gap.**
**Every item's default IS implemented in this spec's text**, so **the red set may be authored against the defaults
ONCE THE SPEC GATE APPROVES THEM** — but **each default is a DEFAULT, marked as one, and a later pass that changes one
must open a gate.** **NOTHING WAS CLOSED BY THIS FILING: the two defaults await the spec gate's CONFIRM-OR-REVERSE,
which is `G-3`'s own requirement** (`§0` ruling 11).

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with another owner
and **must not be pulled in**. **ROUTED** = a question owed to another unit's record. **OWED** = an obligation not yet
discharged. **NOT THIS UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited **BY SECTION or
BY ROW NAME, never by line length** — `docs/decisions.md`'s rows are appended-to and their line anchors drift;
`docs/next-steps.md` is cited **by ROW ID** (`F2`, `F3`, `F1`).

| Source | Status for `U-FOCUS-MODEL` | Where |
| --- | --- | --- |
| **`docs/specs/focus-model-review.md`** — the gate-1 record: the four steps, `C-1`…`C-13`, the twelve findings, `FQ1`/`FQ2`/`FQ3`, step 3's derivation with its eleven items, step 4's `NOT-DELEGABLE` verdict and `G-1`…`G-7` | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** **Its provenance is a DOCUMENTED COMPRESSION (written by a filing pass, not by the reviewers — its header and `§6` `FM-1`, the `P-1`/`OV-1`/`TC-1` lineage's fifth instance)**, and **the record is NEVER edited by this unit** (`§5.1` item 12) | `§0` ruling 11, `§0A`, `§4.5`, `§5.4`, and this row |
| **`docs/specs/focus-model-adoption-dossier.md`** — the STEP-0 dossier: `7` identifier rows (`I-1`…`I-7`), the `X-1`…`X-7` collision block, `2` cited default rows (`D-1`/`D-2`) and `1` routed open row | **ADOPTED AS AN INPUT AND NEVER AMENDED.** **Its `D-1`/`D-2` are the two defaults this filing implements and re-asks at `§7a.1`; its `I-*` rows are the adopted identifiers; its `X-*` rows are the collision facts this contract's `§2.2`(C) derives its own rows from; and its `§5` routed row is carried at `§5.4`** | `§0A` notes 6/7, `§2.1` items 5/7/9, `§2.2`(C)/(D), `§5.4`, `§7a.1`, `§8` (this row) |
| **`SCH-13`'s `A-d5` ADOPTION** (`docs/decisions.md`'s `DECIDED: FOCUS-UI-ONLY-MCP-TOOL`; `S-d12`; `docs/pending.md`'s `SCH-13` row annotated `SUPERSEDED BY A-d5`) | **ADOPTED as this unit's upstream — the MODEL half.** **`U-FOCUS-TOOL` (`F3`) is the OTHER half and is another unit's; the pre-`A-d5` decline is OVERRULED and is NOT re-opened** | `§0` ruling 2, `§1` items 1/2/7, `§2.2` `P-FM-5`, `§5.4`, `§8` (this row) |
| **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE; `H-r14`) | **CARRIED** — prohibition 5 is a NON-GOAL row here, the pinned MCP sets are asserted as **SET claims against the names**, and **the tool `A-d5` authorises is `F3`'s own gate, not this unit's** | `§0` ruling 3, `§2.2` `P-FM-5`, `§3.3 I-9` |
| **`H-r8`** (the handoff record), the six prohibitions | **DISCHARGED BY THIS FILING** — the six-row `§0 Contract-prohibitions` block is `§2.2`(A), **each row naming the test that pins it** | `§0` ruling 4, `§2.2`(A) |
| **`SHIM-COMPLETION-CARVE-OUT`** / **`H-r7`** and **`H-r5`**'s forbidden-member list | **CARRIED AS A PROHIBITION THIS UNIT UPHOLDS WITHOUT NEEDING AN EXEMPTION**: exactly one shim member is admitted, **this unit adds none and needs none — its order is the caller's array and it reads no DOM at all** | `§0` ruling 15, `§2.2` `P-FM-6`/`P-FM-8`, `§3.4 R-9`, `§5.2` |
| **`src/shared/slot-host.ts`'s `SlotHostOptions.refuse`** — the single-call refusal callback, *"Notified ONCE per refusal"* | **THE BORROWED SHAPE, AND ONLY THE SHAPE**: this unit's `refuse` conforms to the landed arity-and-observation form **while carrying THIS unit's own closed code union** | `§0A` note 6, `§2.1` items 4/10, `§2.2`(C) row 4, `§2.4` seam 1 |
| **`src/shared/owned-list-host.ts`'s refusal-array / result form** (`refused: readonly ListHostRefusal[]`) | **THE FORM THIS UNIT DOES NOT TAKE, NAMED SO THE CHOICE IS A DERIVATION RATHER THAN A DEFAULT**: two refusal shapes in one module would be a second authority — **and the sense in which this unit still returns a `refusals` ARRAY is stated at `§2.3` item 8 (the array is the RESULT's data; the CALLBACK is the seam)** | `§2.2`(C) row 4, `§2.3` item 8 |
| **`docs/specs/listhost.md`** (`U-LISTHOST`, `DONE`) — `orderOf`/`order`/`setOrder`, *"the host projects an order; it does not sort a graph"*, its ACCEPTANCE rule and `M-19`/`F-11`'s *"a refused occurrence contributes NOTHING — least of all a reserved key"* | **CARRIED AS (a) ONE OF THE TWO LANDED ORDER PROJECTORS the `order` collision is reconciled against, (b) THE PRECEDENT FOR THE FIRST-OCCURRENCE / NOT-RESERVED DISCIPLINE, and (c) NOTHING ELSE — no import, no composition, no comparator** | `§0A` note 7, `§2.2`(C) row 3, `§2.3` item 5's precision paragraph, `§3.4 R-4`/`R-13`, `§5.1` item 14 |
| **`docs/specs/slothost.md`** (`U-SLOTHOST`, `DONE`) — `orderOf`'s container-order projection, *"omitted `orderOf` ⇒ the supplied `keys` order; no sorting occurs"*, its `§3.2 F-10` four named safe defaults and its *"no refusal code is invented"* rule | **CARRIED AS (a) THE SECOND LANDED ORDER PROJECTOR, (b) THE SEAM-DEGRADATION PRECEDENT (four named defaults, a caller-code throw never a refusal), and (c) THE `SlotHostRefusal`'s DECLARED-BUT-UNEMITTED member form, cited as the reversible reading for this unit's five-versus-six refusal-code count** | `§0` ruling 8, `§0A` note 7, `§2.1` item 7, `§2.4` items 1/4, `§2.3` item 5 |
| **`docs/specs/theme.md`** (`U-THEME`, `E8`, `DONE`) and **`docs/specs/overlay.md`** (`U-OVERLAY`, `E9`, `DONE`) — the `E5-B-1`-class siblings' census form, their six-row prohibition tables, their name-echo rules, their static-row sets and their register form | **CARRIED AS THE FORM**, and **NOT AS A COMPOSITION**: both are SIBLINGS with no edge in either direction. **ITS ONE CARRIED LESSON: the `(bounded)` marking rule and the exemption-naming rule for scan rows** | `§2.1` items 1/11, `§2.2`(A)/(C), `§3.4`'s preamble, `§5.5.2` items 2/5 |
| **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** (`docs/decisions.md`, ACTIVE) | **CARRIED AS THE PRECEDENT THIS UNIT'S `persist` RETURNED-WRITE IS THE SIBLING OF**: *"the module RETURNS the declaration TEXT and the consumer applies it"*; `returned` is not `written` | `§2.1` item 10, `§2.2`(C) row 12, `§2.4` seam 3, `§7` item 5 |
| **`UI-RENDERED-WITH-PROVIDENT`** and **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the constraint that has NO element of this unit's to apply to** — and as the rule that requires a CONSUMER or a UI unit for the rendered entries | `§0` ruling 5, `§1` item 4, `§2.2` `P-FM-2`, `§3.3 I-6` |
| **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the rule that DERIVES this unit's DENIED set, and as the entry-point question this spec ANSWERS (`NO`)** | `§0` ruling 7, `§2.5` items 5/6, `§5.1` |
| **`A-d3` — `INTERACTION-NODE-LOCAL`** (the family ruling the record's `§2.1` finding 1 cites) | **CARRIED AS THE RULING THAT MAKES INTERACTION THE CONSUMER'S AND KEEPS THIS UNIT A PURE VALUE TRANSFORMER**: **this module installs no listener, holds no node and receives no event object** | `§2.2` `P-FM-8`, `§3.3 I-8`, `§5.1` item 1 |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`**, **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-ISTHE-TRUTH-MECHANISM`**, **`A DECLARED REGISTER TERM IS A DRIVE COUNT`**, **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`13` typed rows in the `IM`/`SM`/`TP`/`SEAM` families, a declared total printed WITH its thirteen terms (with two of this filing's OWN figures recorded as defective rather than smoothed at `§5.5.3`, and the defects' obligations named), caps `≤100`/row · `≤400` total · stop-after-5, the four domains plus the step-1 residues declared by name, EXHAUSTIVE ENUMERATION WITH NO SEED AND NO GENERATOR, and NO `F-` row, NO `§6`/`FS-n` citation as a row, NO new dependency and NO extra leg** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE) | **CARRIED FOR THE FORM, AND — UNLIKE THE SIBLING MECHANISMS — THIS UNIT HAS A REAL SEAM SET**: three optional seams, **each with its signature, its REQUIRED/OPTIONAL status, its totality and its DECLARED DEGRADATION rule as normative contract text** | `§0` ruling 13, `§2.1` item 4, `§2.4`, `§8` (this row) |
| **`DOC-REVIEW-GATE`** / **`BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE) | **CARRIED as obligations this unit's DONE row must cite**: the per-unit documentation review and the blind-greens record are owed after the greens | `§0` ruling 12, `§5.1` row 4, `§5.3` item 8 |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row may not be moved to the `ui` leg silently."* | **CARRIED VERBATIM in this unit's three-part `[U]` refusal (lifted, not paraphrased)** | `§5.2`, `§4.4 S-FM-10`, `§7` item 3 |
| **`docs/specs/user-flow-audit.md` `§7.1`** and its trigger predicate (`DOM-SHIM-BLINDNESS` / `UI-OVERHAUL`) | **APPLIED, and the decision RECORDED**: **`DOES NOT TRIGGER`, on BOTH limbs, with the evidence that decided it and its falsifier** | `§5.2` (the decision block), `§5.3` item 7, `§3.3 I-7` |
| **`docs/specs/engine-drift-measurements.md`'s `M-46`** (`UNMEASURABLE`, its own stop condition, its own negative evidence `M-42`) | **NOT THIS UNIT'S, AND NOT CONVERTED**: a status conversion the leg forbids is a fabricated claim | `§5.2`, `§7` item 3 |
| **`docs/specs/ci-divergence-leg.md`** — the pinned two-member `SCENARIO_KINDS` set (*"A third kind is a new contract row, not a free choice."*) | **CARRIED AS A CLOSED CONTRACT THIS UNIT DOES NOT AMEND** — and as the reason no real-DOM row is owed | `§5.1` item 10, `§5.2` |
| **`docs/next-steps.md`'s `## OPEN` row `F2`** | **CARRIED IN SUBSTANCE**: its charter line (quoted at this file's header), its `Legs` cell (`node suite only`), its spent-chain annotation (this row *"is now the LIVE NEXT ACTION, AT ITS OWN SPEC GATE … it waits only on its own spec + red set"*), and its **`Spec` cell**, which still reads `docs/specs/focus-model.md` (`OWED — not filed`) **and is STALE now that this file exists — THE CELL IS THE SUPERVISOR'S TO FLIP, and this pass flipped nothing** | `CURRENT STATE` items 1/8, `§4.5`, `§5.3` item 9, `§7` item 11(a) |
| **`docs/next-steps.md`'s `## OPEN` row `F3`** (`U-FOCUS-TOOL`, `BLOCKED` on `F2`) | **CARRIED AS THE CONSUMER AND AS `FQ3`'s HOME.** **Its own annotation block (clauses (a)/(b)/(c)) carries the routing and the prose-versus-census repair, and THIS UNIT OWES IT NOTHING BUT THE RECORD THAT THE QUESTION IS ITS** | `§2.5` items 3/7, `§5.4` (all four items), `§7a.1`'s closing note |
| **`docs/decisions.md`'s `FOCUS-UI-ONLY-MCP-TOOL` row, re-read for its count clause** (`ALL_TOOLS` `21 → 22`, `RpcMethod` `21 → 22`, default-gate subset `7 → 8` — **`F3`'s obligations, corrected `2026-09-27`**) | **NOT THIS UNIT'S COUNTS, AND NOT QUOTED AS THIS UNIT'S CLAIM.** **This unit adds NO census entry, and its own `§2.2` `P-FM-5` asserts the pinned sets BY NAME rather than by any number.** **A pass that quotes a census count from THIS file is quoting a number this file does not own** | `§2.2` `P-FM-5`, `§3.3 I-9`, `§5.4` item 4 |
| **`docs/FORKER.md`** | **AN OWED ROW AND NOT DELIVERED: this unit's four value signatures, five types and three seam contracts have NO fork-facing carry**, and a fork cannot read a contract only this repo can honour. **Owner: whatever pass next touches that file; it gates no unit.** | `§2.5` item 4, `§7` item 8, `§8` (this row) |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-14` is the probe** | `§1` item 8, `§3.4 R-14`, `§7` item 6 |
| **`src/renderer/**` · `src/shared/demo-envelope.ts` · the `ui` and `divergence` legs** | **NOT THIS UNIT — the CONSUMER's surface and the repo's rendering/harness paths**, unreachable by any value this unit returns. **DENIED to this unit's diff** | `CURRENT STATE` item 2, `§5.1` items 1/4/10, `§2.2`(D) |
| **`docs/specs/focus-model.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED, awaiting the spec gate). **The tracker cell is the SUPERVISOR's to flip** — this pass flipped no cell | this file, `§5.1` row 3, `§7` item 11(a) |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves, repoints and EDITS NOTHING.** It creates
**one new document** — **this file** — and touches **no other path**: **no sibling spec, no gate record, no tracker,
no decision row, no fork-facing file.** **A citation in this file that points elsewhere is a READ, not a move**, and
**no count, row id, term, strategy id, cap or pool member in any other document is affected by it.** **This pass ran no
test, no leg and no trio, and made no commit** (`RCA-8`: **the new file is untracked and must be committed by the
supervisor**).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering `§6`/`§7`/`§8`).**
**THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its vocabulary and append shape fixed
there. NOTHING may be added after `§3b` as a new top-level section.** A later pass appends **inside `§3a`/`§3b`** or
inside an existing section; **no section number moves, nothing is renumbered, and the `§5.3 → §5.5` gap (no `§5.4` as
a register subsection, since `§5.4` is the routing block) stays exactly as recorded**, because **renaming is forbidden
for citation stability.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-FOCUS-MODEL`** — **the unit has no green yet**, and`RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding, and none may be
cited as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no `src/**`), it **must
also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the per-row attempts, the strategy ids,
the declared total `98` against its thirteen terms **and the two defective figures `§5.5.3` records about this filing's
own arithmetic**, the stop-after-5 rule, the exhaustive-enumeration declaration (NO seed, NO generator) and the
`(bounded)` set of `7` marked rows — **and it must RE-RUN the pool-versus-boundary check against the LANDED tables**
(`§5.5.2` item 5). **Its findings are recorded in `§3b` and a HOST finding is fixed here with regression rows — never
in `docs/defects.md`, because a host finding is this repo's.** **A genuine `provident-ssr` package defect would go to
`docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER patched** — **though this unit exercises no package
surface at all, so no such finding can arise from it.**

**The vocabularies the disposition table uses, defined so no status word is ever left undefined:**
**`CONFIRMED-FIXED`** = a host finding, fixed here and regression-tested as a new `§3` row · **`CONFIRMED-RULED`** = a
behaviour examined and ruled correct, with the ruling recorded and its reason · **`CONTRACT-AMENDED`** = a seed that
exposed a gap in this spec, amended with the old text kept visible as `SUPERSEDED` · **`NOT-A-FINDING`** = raised,
examined, recorded with the reason · **`OWED`** = raised and **not yet resolved** (the pass may not report done with
an `OWED` row) · **`OWED — TEST-SIDE`** = a finding whose remedy is a row the TestWriter owns, with no `§5.5.1`
statement, id, strategy id or attempt term changed for it · **`BLOCKING — SCOPE`** = a scope violation the unit may
not land with · **`PARKED-with-revisit-condition`** = recorded, not fixed, with the condition that reopens it and its
owner. **The as-filed status of every seed below is `OWED`, and `OWED` is defined here rather than left bare.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **THE VERB-SET PROBE, exhaustively:** across every drive, **is an unrecognised verb REALLY total — the prior state by identity, one refusal, no default verb applied, no prefix/case/trim coercion of an unrecognised string? And are the FIVE declared bodies each taking their own arm rather than being normalised away?** **Is `'unknown'` handled as a NON-verb (refused) rather than as a sixth member?** | `[T]` + static |
| **`A-2`** | **THE `changed` PROBE:** on every accepted attempt and on every refusal, **is `changed === (next !== previous)` — an OBSERVABLE rather than the verb's identity? Does any accepted no-op report `changed: true`, and does any refusal report `changed: true`?** | `[T]` |
| **`A-3`** | **THE DUPLICATE / FIRST-OCCURRENCE PROBE:** after a `'duplicate-id'` refusal, **is the refused occurrence's id TRULY un-reserved — a later valid occurrence of the same id ACCEPTED?** **Is the duplicate test an ID equality (never a `target` equality), and is `target` compared ONLY for the licensed activation?** | `[T]` |
| **`A-4`** | **THE ENDS PROBE:** at both ends of every set length, **does `'next'`/`'prev'` REFUSE with its own code rather than wrapping, clamping or silently no-opping?** **Is an unowned non-null `activeId` treated as no position at all?** | `[T]` |
| **`A-5`** | **THE RE-SEATING PROBE:** closing the ACTIVE last entry, the ACTIVE middle entry, the ACTIVE only entry and a NON-ACTIVE entry — **is each verdict the declared one, with `null` ONLY when nothing remains, and is a non-active close's `activeId` genuinely untouched?** | `[T]` |
| **`A-6`** | **THE NEVER-CONSULTED-TARGET PROBE:** with the `target` instrumented as a recording `Proxy`, with a THROWING `toString`/`valueOf` identity, and with a REVOKED `Proxy` — **are ALL trap and hook counts `0`, is the returned target `===`-identical, and does the revoked `Proxy` raise nothing?** **Is the recording instrument itself proven LIVE by its positive control?** **AND: does the ONE licensed `target` comparison (`===` for activation) stay a read-free operation?** | `[T]` + static |
| **`A-7`** | **THE OPACITY PROBE:** is any `id` ever named, coerced, property-read, type-branched, structurally compared or round-tripped — **in code, in a comment, in a type doc or in a string?** **Is `Map`/`Set` the ONLY keying, and is plain-object keying genuinely absent?** | static + `[T]` |
| **`A-8`** | **THE LABEL PROBE:** is a `label` echoed VERBATIM when it is a `string` — including `''`, whitespace and unicode — and is the member genuinely ABSENT otherwise (**not `undefined`**)? **Does the module default, trim, prefix or validate a label anywhere?** | `[T]` + static |
| **`A-9`** | **THE REFUSAL-SEAM PROBE:** is `refuse` called EXACTLY ONCE per refusal, IN ATTEMPT ORDER, with the SAME record the result carries (by identity) — **and never for an accepted attempt?** **Does the refusal land in `refusals` WHATEVER the callback does (throw, mutate the record, re-enter the transition)?** | `[T]` + static |
| **`A-10`** | **THE `onChange` PROBE:** does it fire EXACTLY ONCE per ACCEPTED transition — **including a no-op acceptance (`changed: false`)** — and NEVER for a refusal? **Is its payload `(next, previous, refusal?)` with both identities as declared, and is the count genuinely DATA a consumer can read?** | `[T]` + static |
| **`A-11`** | **THE `persist` PROBE:** with a recording fake-storage object in scope, **is EVERY write counter `0`** — no file, no `localStorage`, no `indexedDB`, no store handle? **Is the seam's return value handed back VERBATIM (including `undefined`, a promise and a hostile value) and NEVER interpreted?** **Is the `{present: false}` arm distinguished from the `{present: true, value: undefined}` arm?** | `[T]` + static |
| **`A-12`** | **THE DEGRADATION PROBE:** for all three seams, **do the absent, non-callable and throwing shapes leave the result OTHERWISE IDENTICAL to the no-seam case, with the throw swallowed and NO refusal code invented for a caller-code throw?** | `[T]` |
| **`A-13`** | **THE MUTATION PROBE:** is the caller's `state`, `entries` array, every entry object, every `id`/`target` object and every seam **byte-identical after every drive** — with frozen and instrumented arguments proving it? **Does the module ever `push`, `splice`, `sort`, `reverse` or assign into an argument?** | `[T]` + static |
| **`A-14`** | **THE SECOND-ORDER-AUTHORITY PROBE — the unit's designated collision:** does the module source carry ANY `sort(`, comparator call, `rank`/`position` member or memoised sequence? **Does `focusOrder` return the caller's own objects in the caller's own order with the same length?** **Does any pass assert an import or composition edge to `U-LISTHOST` or `U-SLOTHOST`?** | static + `[T]` |
| **`A-15`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything at all — value, type-only, dynamic or `require`? **Is `src/shared/dom-shim.ts` untouched, are the sibling modules and test files untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-16`** | **THE VOCABULARY/ENDPOINT PROBE — and its own collision:** does the module's source (comments included, in the NORMALIZED view) carry a consumer-vocabulary token, an endpoint-shaped token (`'opened'`, `'refused'` as a member), a DOM-write verb, a store token or a realm token — **raw, token-assembled or in a comment?** **Is the scan's exemption list NAMED rather than implied, and does the literal census include the eleven declared bodies?** | static |
| **`A-17`** | **THE NO-DOM / NO-FOCUS-WALK PROBE:** does the module read `activeElement`, walk a focusable set, call `focus(`/`blur(`, read `matchMedia`, install ANY listener or hold a root — **including a "convenience" listener that would make the model dispatchable?** **Are the three seams the mechanism's ONLY calls?** | static + `[T]` |
| **`A-18`** | **THE MCP / SURFACE PROBE:** is any tool, resource, group, `RpcMethod` member, `MUTATING_METHODS` entry, registration site or IPC method added — **and are the pinned sets asserted BY NAME as set equality rather than by any count this spec quotes?** **Does any clause of this file assert `F3`'s counters or route?** | static |
| **`A-19`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s per-row attempts, terms, strategy ids and the thirteen printed cells — **and does the audit RECONCILE the two defects `§5.5.3` records (the as-filed total `89` against the thirteen cells' sum `98`, and the withdrawn subtotal decomposition) rather than flagging them as an owed re-grain this file already declares?** **⟶ ANNOTATED 2026-09-27 (dispositions (b)/(c); `§0A` note 9): the object this seed must audit is the CORRECTED form — `13` rows, `12` carrying a term and `1` carrying none; the DECLARED LIST's thirteen terms summing `98`, which is the authority the caps compare against; and the TABLE's `12` cells summing `93`, printed BESIDE it.** **AND THE `9 + 1` READING IS WITHDRAWN — it sums to `103`, not to `98` — so no pass may reconcile the register through that split; the two figures to reconcile are `98` (declared, thirteen terms) and `93` (the twelve cells), and the register harness's own assertions must be re-aligned to whatever this contract prints, which is the TestWriter's act.** **Is the exhaustive-enumeration declaration TRUE of the landed tables (no seed, no generator, no sampling)?** **Are the `(bounded)` markings `7` of `13` rows as the cells carry?** Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? **Is every pool/table member still consistent with its row's declared boundary text?** **Any OTHER mismatch is a SPEC FINDING.** | `[T]` + the test file |
| **`A-20`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **focused-element, rendered-entry, interaction, route or stored-state** evidence from this unit's `[T]` green — and does it state explicitly that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**? | the DONE row |
| **`A-21`** | **THE HONESTY-BLOCK PROBE:** does `§5.5.2` name the excluded shapes as a boundary rather than a gap, does `§5.5.1` item 2 declare the exhaustive enumeration rather than merely omit a seed, do `§7` item 9 and `§5.5.3` carry this filing's own arithmetic defects VISIBLY with their obligations named, and does the DONE row carry the register's figures WITH their terms? | static + the DONE row |
| **`A-22`** | **THE AUTHORITY PROBE:** does any pass read this unit as **the repo's order or focus authority**, or claim its returned values reach a rendered entry, `src/renderer/**` or the demo envelope? **The measured-and-declared fact is that nothing this unit returns can influence any of them, and that the two landed hosts' projections are neither composed nor contradicted.** | static + the DONE row |

**The seed set's own status: `22` seeds, ALL `OWED` at FILING.** **`A-19` is the gate-11 audit; `A-1`/`A-2`/`A-3`/`A-4`/`A-5`
are the five claims the transition artifact rests on; **`A-6`/`A-7`/`A-8` are the three opacity claims**; `A-9`/`A-10`/`A-11`/`A-12`
are the four seam classes; `A-13`/`A-14` are the mutation and authority classes; `A-15`/`A-16`/`A-17`/`A-18` are the
boundary classes; and `A-20`/`A-21`/`A-22` are the layer-honesty, honesty-block and authority probes.**

**⟶ CLOSE-OUT STATUS BLOCK (`2026-09-27`, appended BESIDE the as-filed `OWED` header and seed table above — `RCA-8(d)`: the header's own bytes, the twenty-two seed rows and the status line above all STAND, nothing is rewritten, and no seed id or row id moves).** **GATE 4 HAS RUN, AGAINST THE LANDED MODULE, AND THIS CONTRACT'S ADVERSARIAL STATUS IS THEREFORE NO LONGER `OWED`:** the read-only adversarial pass plus the gate-11 read-only PBT audit returned their findings and every one is dispositioned at `§3b` below with no bare `OWED` surviving; **`PACKAGE DEFECTS: NONE`, AND NOTHING WAS FILED TO `docs/defects.md` OR `docs/HANDOFF.md`** — this unit exercises no `provident-ssr` surface, so the expectation this file recorded is the measured reading. **THE FOUR CLAUSE RULINGS GATES 4 AND 5 FORCED are `§0A` note 10's items (1)–(4)** — the repeated-target reading (**whose gate-4 `F2` CLAIM DID **NOT** REPRODUCE and is recorded `NOT-A-DEFECT — CLAIM NOT REPRODUCIBLE` against the finding, `§0A` note 10 item (1a), never enforced**), the `undefined`-carried-by-identity active-id ruling (gate 4's `F3`), the label's absence rule governing the label the module would SYNTHESIZE and never the caller's own object (gate 5's blind `FM-11`), and the result's own refusal record with a mutable COPY handed to the `refuse` callback (gate 5's blind `FM-28`) — **and the THREE HOST FIXES THEY OWE ARE LANDED: the totality guard, the identity-preserving active id and the refusal copy.** **THE READ-ONLY PBT AUDIT'S OWN READING, in its required form:** **the DECLARED TOTAL is `98`, printed as the sum of its THIRTEEN TERMS (`10 + 11 + 10 + 6 + 3 + 10 + 10 + 6 + 8 + 9 + 5 + 5 + 5`); the `12` TERM CELLS of `§5.5.3`'s table sum to `93`; and the FIVE-POINT GAP separating `98` from `93` — carried by no printed cell — is CARRIED OPEN AS OWED, never closed by moving a term** (`§5.5.3`; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **THE CAPS HOLD AGAINST THE DECLARED FIGURE: `98 ≤ 400` (headroom `302`) and the largest row `11 ≤ 100` (headroom `89`).** **AND THE EXHAUSTIVE-ENUMERATION CLAIM IS VERIFIED — NO SEED AND NONE ADDED: every domain this register drives is finite and pinned, so there is no LCG, no draw, no `Math.random`, no adaptive search and no generator row anywhere in it; the family's pinned seed `20260927` appears NOWHERE in this unit's register, and the audit added none.** **THE REGISTER'S EXECUTED LAYER IS RECORDED PER ROW AT `docs/next-steps.md`'s `## DONE — U-FOCUS-MODEL` clause (9): `93` attempts across `12` of `12` rows, `broken 0` on every row, `registerStoppedAt: null`.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended findings block needs
**no renumbering and no new section**. **A row added later must use one of the statuses defined at `§3a`, or the pass
must define its new token IN THIS TABLE with a one-line meaning** — **a bare `OWED` is the one status that may not
survive the pass** (`AGENTS.md` item 11(e)).

| Finding | Status | The finding, one line | Where the remedy lands |
| --- | --- | --- | --- |
| *(none yet — the pass has not run)* | — | — | — |
| **`F2`** | **`NOT-A-DEFECT — CLAIM NOT REPRODUCIBLE`** | **THE REPEATED-TARGET CLAIM (recorded `HIGH` at gate 4): *"opening an entry whose target repeats an owned entry's target silently discards the new entry"* — the TestWriter MEASURED it and COULD NOT MAKE THE ROW FAIL: the landed `open` already seats the existing entry's id, keeps the length and the element identities, and refuses nothing.** **THE CLAIM IS RECORDED AGAINST THE FINDING, NEVER ENFORCED AGAINST THE MODULE; the contract's amended reading (ACTIVATE, APPEND NOTHING) is what the landed body already satisfies; the states enumerated are `§0A` note 10 item (1a)'s three.** | **NO REMEDY OWED: no host edit and no regression row; the as-filed claim stays visible at `§0A` note 10 item (1) and its falsifier is unweakened** (`§2.3` item 2) |
| **`F3`** | **`CONFIRMED-FIXED`** | **THE COERCED ACTIVE ID (gate 4, `MED`): the landed module coerced `undefined` to `null` on `activeId`, surfacing a WRONG REFUSAL ON A LEGAL STATE.** **The ruling is `§0A` note 10 item (2): `undefined` is a legal opaque id carried BY IDENTITY and `null` is distinct from it.** | **`src/shared/focus-model.ts` — the identity-preserving active id (one of the three host fixes), with its red-first regression row the TestWriter's** (`§0A` note 10's obligations) |
| **`FM-11`** | **`CONTRACT-AMENDED`** | **THE RETAINED NON-STRING LABEL (gate 5's blind set, its first FAIL), filed there as a CLAUSE CONFLICT: the as-filed pair — *"the member is ABSENT otherwise"* read with the caller's-entry-by-identity requirement — was JOINTLY UNSATISFIABLE, because a caller's own object cannot lose a member.** | **The label's absence rule governs the label the module would SYNTHESIZE, NOT the caller's own object (`§0A` note 10 item (3)); the over-asserting label arm was ALIGNED in the same pass, and the `'open'` row's reading is pinned with its falsifier** (`§2.3` items 1/6) |
| **`FM-28`** | **`CONFIRMED-FIXED` / `CONTRACT-AMENDED`** | **THE CALLBACK THAT REWROTE THE RESULT'S REFUSAL (gate 5's blind set, its second FAIL): `duplicate-id` observed at call time became `caller-bug` in `result.refusals[0]`, against seam 1's *"the refusal is the result's, not the callback's verdict"* and law 1's *"no seam may change an outcome"*.** | **The result carries THE MODULE'S OWN record and the `refuse` callback receives A COPY (`§0A` note 10 item (4)); the landed ORDER OF OPERATIONS WAS INVERTED — BUILD THE RECORD, THEN HAND OUT A COPY — as the third host fix; and this contract's `P-FM-SEAM-1` cell is RE-SCOPED BESIDE its as-filed identity half (that half WITHDRAWN as a required identity, three further identity rows withdrawn with it)** |

**No pass may report this unit `DONE` while a row above is missing, while a bare `OWED` survives, or while a
`CONTRACT-AMENDED` row lacks its as-written form kept visible as `SUPERSEDED`.** **`PACKAGE DEFECTS: NONE` is the
expectation for this unit** — it exercises no `provident-ssr` surface, so **`docs/defects.md` and `docs/HANDOFF.md`
should receive nothing from it.**
