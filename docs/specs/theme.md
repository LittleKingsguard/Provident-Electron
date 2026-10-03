# Spec — `U-THEME`: the pure total appearance resolver + the DECLARATION-ONLY applier (one opaque caller token × one injected environment reading)

**Unit `U-THEME` · wave `E` · ledger row `E8` · upstream `SCH-3` (`THEME-TOKEN-LAYER`, pre-`A-d6` disposition
`DECLINED + REFILED`, reason code `TOO-THIN-WRONGLY-TARGETED`, then `SUPERSEDED BY A-d6`) · derives
`docs/specs/theme-review.md`'s step-1 conditions `C-1`…`C-10`, its step-2 `SOUND-WITH-CONDITIONS` (15 findings and
three architect questions `Q1`/`Q2`/`Q3`), its step-3 `DELEGABLE-WITH-CONDITIONS` derivation, and its step-4
`DELEGABLE-WITH-CONDITIONS` verdict with conditions `G-1`…`G-6` · filed 2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/theme-review.md` is the gate-1 record** (the four steps filed
as one record — **step 1's and step 2's reports were never filed as artifacts of their own, and the record was
written by the FILING PASS rather than by the reviewers**, which the record states at its own header as `A-4`).
**This spec DERIVES the record's conditions and its step-3 derivation. It does NOT re-litigate, weaken or re-open
any of them**, and **a clause of this file that contradicts the record is a finding against this file, not a
re-opening of the record** (the rule `docs/specs/gutter.md` states for its own record and which `docs/specs/
menulib.md`, `container.md`, `relocate.md` and `listhost.md` restate).

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** **⟶ POST-RULING (`2026-09-27`): GATE 2 IS
**APPROVED AS FILED**, WITH THE ONE CHANGE BEING THE FIELD RENAME `basis` → `source` (`§0A` note 6) — the as-filed
`FILED` status above is KEPT VISIBLE, and NOTHING BEYOND THE SPEC GATE IS ADVANCED (the module, the red set, the
legs and every later gate stay `OWED`).** This filing lands **one NEW file**
(`docs/specs/theme.md`) and **nothing else**. **The module does not exist. No test file exists. No red set has been
authored or run. No leg, no trio, no `tsc` invocation and no register row has been executed. No gate record after
gate 1 exists for this unit.** The unit stays an open `## OPEN` row (`E8`) with its ledger status the supervisor's,
and **it is NOT delegable until a TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and this
filing's own dated ruling notes · the layer declaration — the four labels and the honesty anchors · `§1` — the scope
with its NOT-THIS-UNIT items, **the `F1` boundary and what `F1` owns** · `§2.1` the five-name surface · `§2.2`
the caller-supplied set, the `H-r8` six-row prohibition table, **the three collision reconciliation rows** and the
semantics table · `§2.3` the value rules (the pass-through reading, the `String()` coercion, the strict `=== true`
env rule and its hostile-shape table) · `§2.4` the applier's rules · `§2.5` the composition boundary · `§3.1`–`§3.5`
every state, fail-state, invariant and static row · `§4` the red, its order, its stop conditions and the delegation
gate · `§5.1`–`§5.3` the diff scope, the legs and the DONE row's shape · **`§5.5`/`§5.5.1`/`§5.5.2`/`§5.5.3` the
typed register** · `§6`–`§8` falsification, honest limits, the two working defaults and the citation index ·
`§3a`/`§3b` at the file end.

**Cite SECTIONS and ROW IDS, never line counts, of any file** (`docs/decisions.md`'s rows are cited **by NAME** —
that ledger is appended-to and its line anchors drift; `docs/next-steps.md` **by ROW ID**).

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end
note — the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY — *AS FILED*.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly two files — the NEW `docs/specs/theme.md` and the NEW `docs/specs/theme-review.md`** — and edited **no
   existing file**, ran **no suite, no leg, no trio, no `tsc`, no Electron boot and no register row**, and made **no
   commit and no writing git command of any kind**. **The module (`src/shared/theme.ts`), the test file
   (`tests/theme.test.ts`), the red set, the legs, the register's EXECUTED layer, the greens set, the gate records
   and the DONE row ALL DO NOT EXIST YET** (globbed this pass: `**/theme*` → **no files**). The unit is **`OWED` at
   every gate after this one**, and **it is NOT delegable until a TestWriter has RUN and REPORTED the red set**
   (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW `src/shared/theme.ts`** exporting
   **TWO value exports and THREE type declarations = FIVE exported names** (`§2.1`), with **NO IMPORT STATEMENT OF
   ANY KIND — not even type-only**, **no factory, no options object, no session, no module-level mutable state, no
   element parameter and no write of any kind** (`§2.5`), and **an EMPTY SEAM SET** (`§2.1` item 3).
3. **THE REGISTER (`§5.5.1`): `12` typed ROWS carrying `12` TERMS, in THREE families** —
   `P-TH-IM-1`…`P-TH-IM-4` · `P-TH-SM-1`/`P-TH-SM-2` · `P-TH-TP-1`…`P-TH-TP-6` — **`102` declared attempts, printed
   with their TWELVE terms and a term-by-term addition at `§5.5.3`** — one pinned-seed generator
   (`S-TH-TOTAL-1`, seed `20260927`, one LCG step per draw, `pool.length = 12`), caps `≤100`/row · `≤400` total ·
   stop-after-5, the **four DOMAINS declared by name**, and **five `(bounded)` markings**. **The register
   overshoots the `≤8` component-breakdown signal on purpose, in the ruling's own form** (`§5.5.2` item 1).
   **There is NO `§5.5.0` in this file**: it is filed **after** the gate-11 ruling and carries its register **from
   the start**, so there is no superseded zero-row exemption to keep visible. **⟶ POST-ANNOTATION (`2026-09-27`,
   `§0A` note 8; the as-filed figures in this item are KEPT VISIBLE above): the live declaration is `103` declared
   attempts — from `P-TH-TP-3`'s term `10 → 11`, the pre-committed `NG-2` re-grain now taken — and **six** `(bounded)`
   markings, the sixth being `F4`'s marking of `P-TH-TP-5` (**a count of ROWS, not a term**); the arithmetic is at
   `§5.5.3`.**
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus `npm run typecheck` `[H]`
   (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]` (**this unit adds a module imported by
   nobody, so the built output set must be UNCHANGED**), `npm run typecheck:tests` `[H]` (the additive fourth leg,
   `AGENTS.md` item 4), and a **standalone strict `tsc --noEmit` over `tests/theme.test.ts`** as the named leg that
   pins the type half of the export census (`§5.2`). **NO `[U]` ROW IS OFFERED** (the three-part refusal, `§5.2`)
   and **NO `[D]` ROW IS CLAIMED** (`§5.2`).
5. **THE GATE RECORDS AFTER THIS ONE: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`),
   no blind-greens record (`docs/specs/theme-greens.md` is named in the diff scope and is `OWED`), no per-unit
   documentation review, no DONE row (`§5.3` fixes its twelve-item shape), and **gate 6 is `STRUCTURAL`, not
   waived** (`§5.2`).
6. **THE OPEN ITEMS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1` — **TWO** items, and **both are
   RECORDED WORKING DEFAULTS in the `E5-B-3` form, neither of them a blocker**): item **1** = the **pass-through
   resolved domain** (`A-1`, the residue of the reviewer's `Q1`); item **2** = **the NAME of the observable
   degradation** (`A-2`, which step 4 restated as a **naming question**, finding `A-5`). **Each has a working
   default implemented in `§2` and a recommendation; a later pass that changes one must open a gate.** **`Q2` and
   `Q3` ARE PINNED, not open** (`§0A` notes 2/3, `§4.3`/`§4.5` of the record). **⟶ POST-RULING (`2026-09-27`, `§0A`
   note 6): item 2's member is named `source` (the as-filed spelling was `basis`); `A-1` STANDS AS FILED (approved at
   the spec gate, still architect-reversible); and `A-2` IS CLOSED BY THE RULING as a RENAME. The spec is APPROVED at
   its gate, `E8` stays an OPEN unit, and NO register term, row id, strategy id, seed or cap moves.**
7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO existing
   file):** `docs/next-steps.md`'s row **`E8`** still reads its spec cell as **`OWED — not filed`** and its chain
   cell as **`BLOCKED → then U-MENULIB → spec → TestWriter red`** — **stale on both counts, since `U-MENULIB` is
   `DONE` and `docs/specs/theme.md` is filed by this pass** — and its **`Legs`** cell reads *"node suite only (the
   six-prohibition static rows)"* against this spec's five declared legs. **All three are listed as owed tracker
   items in this filing's report and are NOT edited here** (`§7` item 11, `§8`'s archival note). **⟶ POST-RULING
   (`2026-09-27`): the `Spec` cell's item (a) IS landed by this pass's ledger amendment** (the spec-gate APPROVAL and
   the post-ruling `A-1`/`A-2` sentence now stand beside the as-filed wording there, with NO ledger count changed);
   **the chain cell (b) and the `Legs` cell (c) remain owed, as the as-filed sentence above says.**
8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone (globbed
   `docs/skills/*` this pass), so there is **no test-use-case coverage matrix and no demo-page index to update**,
   and **this unit renders no page** (`§3.5 X-4`'s probe; `§7` item 6).
9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** Two new files written, zero files edited, no test run,
   no leg run, no trio run, no `tsc` invocation, no Electron boot, no commit. The new files are **untracked and must
   be committed by the supervisor** (`RCA-8`'s per-gate rule). **The MEASUREMENTS this pass DID take are the four
   existence/token probes of `§3.5 X-1`/`X-2`/`X-4`/`X-5` and the collision table's re-read scope** — every one of
   them a **read-tool search over this workspace**, attributed at its own site, and **none of them a run of any
   leg**.
10. **THE SECOND APPEARANCE AUTHORITY, NAMED HERE BECAUSE IT IS THE ONE FACT A FRESH READER WOULD GET WRONG.**
    **`src/renderer/index.html` — measured this pass, `44` lines — carries ONE `<style>` block whose first rule is
    `:root { color-scheme: light dark; }`, followed by hard-coded colours**, and **NOTHING this unit returns can
    influence any of them**: no `data-*` attribute, no class toggle and no injected boolean participates.
    **So an appearance authority ALREADY EXISTS in this repo and is NOT this unit's — it is `F1`'s surface, and
    `src/renderer/**` (that file included) is in this unit's DERIVED DENIED set** (`§5.1` item 2). **A pass reading
    this unit as "this repo's one theme authority" is reading a falsehood.**
11. **THE GATE-4 AND GATE-5 RECORDS, LANDED `2026-09-27` BY THIS ANNOTATION (READ THIS BESIDE ITEMS 1 AND 5, WHICH
    ARE THE FILING-TIME STATE AND ARE KEPT VISIBLE: item 5's *"THE GATE RECORDS AFTER THIS ONE: NONE"* and this
    note's opening *"NOTHING ELSE IS ADVANCED"* were TRUE AS FILED and are STALE ON THEIR STATUS CELLS ONLY — every
    term, row id, strategy id, seed, cap, shape, pool member and `(bounded)` marking in this file is UNMOVED, and
    the two records below were written by ANNOTATION, never by rewrite).** **BOTH GATES HAVE NOW RUN, and NOTHING
    IS FIXED AND NOTHING IS CLOSED:** **GATE 4** (the read-only adversarial pass + the gate-11 PBT audit) returned
    **SEVEN items — `F1`…`F7`, NONE yet fixed, each dispositioned with its OWNING SIDE at `§3b`** (two
    CONTRACT-side: `F1`, `F4`; five TEST-side: `F2`, `F3`, `F5`, `F6`, `F7`; severity as `§3b` prints it — `F5`/`F7`
    `LOW`, the rest `MED` / `LOW-MED`), together with **its negative-generator task list `NG-1`…`NG-3`** and **the confirmation block `§3b`
    records in the pass's own words — including `PACKAGE DEFECTS: NONE`**; and **GATE 5** (the blind greens,
    `docs/specs/theme-greens.md`) ran **`32` executed scenarios — `32` PASS / `0` FAIL / `7`
    `NOT-BLIND-RUNNABLE` — BLACK-BOX FROM THE DOCUMENTATION ALONE, at `fd70033`**, with **its two recorded
    ambiguities, its five self-repaired driver defects (`§F`), its `POST-GREEN` re-drive clause and its `32`-count
    census all carried at `§3c`.** **THE `NG-2` RE-GRAIN (`10→11` / `102→103`) IS PRE-COMMITTED BUT NOT TAKEN —
    `P-TH-TP-3` still declares `10` and the declared total is still `102` — and NO other figure in this file moves.**
    **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8: the sentence immediately above, KEPT VISIBLE, is the as-written
    pre-grain state and is STALE ON ITS ARITHMETIC ONLY): THE `NG-2` RE-GRAIN IS NOW TAKEN** — the TestWriter authored
    **the inherited-`env` drive** (`Object.create({prefersDark: true})`) into `P-TH-TP-3`, so **that row's term moves
    `10 → 11`, the DECLARED total moves `102 → 103`, the DISTINCT total moves `99 → 100`, and the `(bounded)` marked
    set moves `5 → 6` ROWS** (`F4`'s marking of `P-TH-TP-5` — **a count of ROWS, NOT a term**). **Each figure is
    printed with its own terms, its own chain, its own family subtotals and its own cap re-check at `§5.5.3`, with the
    as-filed figures kept visible there; and NO TERM OTHER THAN `P-TH-TP-3`'S MOVES** — no row id, no strategy id, no
    seed, no cap, no shape and no section number moves. **`F1`/`F4`/`F7`/`F2` are dispositioned at `§3b`'s
    `AMEND-1`…`AMEND-4`; the seven `F1`…`F7` rows stay UNFIXED on their own sides, gate 4's and gate 5's censuses
    stand exactly as recorded, and `E8` remains an OPEN unit at gate 3 GREEN with gates 4 and 5 RUN.**
    **STATE, PLAINLY: `E8` is GREEN at gate 3 with GATES 4 AND 5 RUN, and it is NOT `DONE`; these findings are OWED,
    not closed; the ledger is UNMOVED at `16 DONE / 5 open` = `21` units (`docs/next-steps.md`, the supervisor's);
    and the contract is FILED AND APPROVED.** **THE ORDERED NEXT ACTIONS ARE `docs/next-steps.md`'s
    `## ⟶ HANDOVER — E8 (U-THEME) AT GATE 5` section's `§D`, cited BY NAME.**

12. **THE CLOSE-OUT, LANDED `2026-09-27` BY THE SUPERVISOR'S DOC-WRITER PASS — READ THIS BESIDE ITEM 11, WHICH IS
    THE GATE-5 STATE AND IS KEPT VISIBLE (item 11's *"it is NOT `DONE`"*, its *"THESE FINDINGS ARE OWED, NOT
    CLOSED"* and its *"the ledger is UNMOVED at `16 DONE / 5 open`"* were TRUE AS WRITTEN and are STALE ON THEIR
    STATUS CELLS ONLY).** **THE UNIT IS `DONE`: THE LEDGER'S SEVENTEENTH `DONE` ROW, and the record is
    `docs/next-steps.md`'s `## DONE — U-THEME` section, cited BY NAME.** **THE LEDGER MOVED IN THE SAME PASS —
    `17 DONE / 4 open` UNITS = `21` units (`17 + 4 = 21`), the open set `E9` · `F1` · `F2` · `F3` = `4` — and the
    ledger row `E8` is KEPT VISIBLE as an `E8 — MOVED TO DONE (2026-09-27)` provenance row, its cells annotated as
    spent, exactly as the family's other moved rows are (`docs/next-steps.md`, the supervisor's).**
    **GATES 6/7/8/9/10 ALL LANDED IN THAT CLOSE-OUT: gate 6 remains `STRUCTURAL`, NEVER WAIVED (`§5.2`); gate 7
    (the proofreader's stale-cell sweep) and gate 8 (this unit's per-unit documentation review) were FOLDED INTO
    THE ONE CLOSE-OUT PASS and are RECORDED AS ONE PASS, NOT TWO, at the gate-8 record
    `archive/reviews/2026-09-27-U-THEME-doc-review.md`; gate 9 is the SUPERVISOR'S OWN MEASURED GREEN at
    `36b8c3d`; and gate 10 is the DONE row plus the ledger move.** **THE REGISTER'S EXECUTED LAYER IS GREEN AND IS
    THE SUPERVISOR'S MEASUREMENT, QUOTED AND NOT RE-RUN BY THIS PASS: ALL `103` DECLARED ATTEMPTS EXECUTED with
    `broken 0` on every row and `registerStoppedAt: null`, `rowsExecuted 12`, seed `20260927` — per row
    `attemptsRun/held` `IM-1 12/12 · IM-2 12/12 · IM-3 10/10 · IM-4 8/8 · SM-1 6/6 · SM-2 3/3 · TP-1 12/12 ·
    TP-2 12/12 · TP-3 11/11 · TP-4 8/8 · TP-5 6/6 · TP-6 3/3` — so the DESIGN this file carries (`§5.5.1`,
    `§5.5.2`, `§5.5.3`) and its EXECUTED layer now agree, and the un-run-row-is-a-FAILURE rule (`§4.2`) was
    satisfied rather than waived.** **THE GATE-4 `F1`…`F7` ROWS AND `NG-1`…`NG-3` ARE DISPOSITIONED THROUGH THE
    DATED ANNOTATION NOW AT `§3b`'s tail — the contract-side remedies `AMEND-1`/`AMEND-2`/`AMEND-3` are LANDED and
    the five `[T]`-side items (`F2`, `F3`, `F5`, `F6`, `F7`) are recorded there as CLEARED by the supervisor's
    adjudicated repair pass, with THIS pass's own file-read corroboration for each named at the doc-review record
    (the test file's own header now reads `103` / the SIX `(bounded)` rows, and its `HARNESS-3` asserts the
    six-row set — item 11's *"stay UNFIXED"* sentence is therefore STALE ON THAT FACT ONLY, and the `[T]`-side
    evidence for it is a FILE READ, never a leg run).** **NO TERM, ROW ID, STRATEGY ID, SEED, CAP, SHAPE, POOL
    MEMBER OR `(bounded)` MARKING MOVED IN THE CLOSE-OUT: the register stands `12` rows / `12` terms / `103`
    DECLARED attempts, its distinct sibling `100`, and the marked set `6` rows.** **AND THE HONEST EXTENT OF THIS
    ITEM, stated as notes 7/8 state their own: this pass held a READ/SEARCH/DOC-WRITE tool wall and NO SHELL — it
    ran no suite, no leg, no `tsc`, no build, no Electron boot and no commit — so every figure above is the
    supervisor's own measured reading or a recorded file read, and NONE of it is a run of this pass's.**

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** Where a ruling
is **quoted**, the quotation is marked; where a step is this filing's own **derivation**, it says so in place.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`THEME-MECHANISM-AND-AUTHORED-CONTROL`** (`docs/decisions.md`, ACTIVE; architect ruling **`A-d6`**). **`SCH-3` is ADOPTED-RESHAPED as TWO UNITS** — *"the pure `U-THEME` mechanism + the AUTHORED `U-THEME-CONTROL`"* — and **this unit is the MECHANISM half**: a **pure TOTAL `resolveTheme(setting, env)`** over an **opaque `setting`** × an **injected `env = { prefersDark: boolean }`** **+ a DECLARATION-ONLY applier that RETURNS the attribute write it would perform and writes nothing, with the attribute NAME caller-supplied.** | `§0A` notes 1/2/3, `§1` item 1, `§2.1`, `§2.3`, `§2.4`, `§8` |
| **2** | **`A-d6`'s NEGATIVE ROWS, quoted:** *"no token names/values (the token block stays the consumer's stylesheet) · no `data-theme` literal (the mechanism may not document it) · no `matchMedia` (the OS reading is injected) · no store · no ambient `document`/`window`/`localStorage`/`fs` · no new MCP surface in the mechanism · every row falsifiable in the node suite."* | `§0` ruling 4, `§2.2` `P-TH-1`/`P-TH-3`/`P-TH-4`/`P-TH-5`/`P-TH-7`, `§3.4 R-2`/`R-7`/`R-8`, `§3.5 X-5` |
| **3** | **`A-d6`'s PERSISTENCE BOUNDARY, quoted:** *"persistence stays CONSUMER-side unchanged — this repo owns no UI-config store, `S-d4` is intact … if this repo ever needs to remember a theme across restarts it must gain a store, which is a new gate and must not be smuggled in via `U-THEME`/`U-THEME-CONTROL`."* **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed ruling above is KEPT VISIBLE and is NOT rewritten): THE BOUNDARY'S NO-STORE HALF IS SUPERSEDED FOR THE BOUNDARY by the answered plan (`data-ownership-model-plan.md` `§5.9` row 21: the appearance setting is now read from tier 1, cost CA+RG+RS+FV) — the store edge lands at the CALLER file `src/renderer/theme-store.ts` (`store-modules-seams.md` `§2.3`), which reads `file.settings.theme.token`. WHAT SURVIVES: the mechanism's own bytes are UNMOVED — `theme.ts` still imports NOTHING (the EMPTY IMPORT CENSUS, THE FLAG ROW, re-verified by `P-SMS-TH-IM-1`), writes nothing, and holds no store; the authored-control half stays provident data; and "a new gate must not be smuggled in via `U-THEME`/`U-THEME-CONTROL`" reads for the MODULE's own bytes — the caller file is `H2b`'s declared wiring, an admitted store edge AT THE CALLER, never a module byte.** | `§2.2` `P-TH-4`, `§3.3 I-4`, `§3.4 R-3` |
| **4** | **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE). **The mechanism-vs-UI-element test, quoted:** a mechanism is outside the UI constraint **because it is not a UI element** — *"it authors no text, no control, no affordance, no class taxonomy, no slot content and no styling"* — and *"a mechanism that **authors content** — a status text, a status element, a mirror-class taxonomy, a slot model, **a literal default** — **IS a UI element authored outside the provident graph and remains a review finding**."* | `§0A` note 3, `§1` item 4, `§2.2` `P-TH-2`, `§3.3 I-6`, `§3.4 R-8`, `§5.1` |
| **5** | **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** (`docs/decisions.md`, ACTIVE; the `U-CONTAINER` gate-1 ruling `B-1`=`B`). **The precedent this unit's applier is the SIBLING of, quoted in substance:** *"the module RETURNS the declaration TEXT and the consumer applies it"* — **the unit performs NO WRITE OF ANY KIND; `returned` is not `written`; the applied proof is REFUSED three-part rather than parked; and gate 6 remains `STRUCTURAL`.** | `§0A` note 3, `§2.4` item 3, `§5.2`, `§7` item 3 |
| **6** | **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE; restated by `H-r14`): prohibition 5 is *"an adoption bound on units"* — **a (C)-admissible unit's own contract may not itself require a new MCP surface** — and it is a **NON-GOAL ROW, never a licence**. | `§2.2` `P-TH-5`, `§3.3 I-9` |
| **7** | **`UI-RENDERED-WITH-PROVIDENT`** (`docs/decisions.md`, ACTIVE; the project-wide constraint, `AGENTS.md`'s *"Project-wide constraint (UI rendering)"*): **all non-shell UI must be provident-rendered data driven through the producing graph**, and **an element authored outside the framework is a review finding.** **The AUTHORED control `A-d6` requires is `F1`'s and is REQUIRED *by* this rule, not an exception to it.** | `§1` items 3/4, `§2.2` `P-TH-2`, `§5.1` item 2 |
| **8** | **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE): *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*, and gate 1 must answer explicitly whether the allowed file set contains a path from the application's entry point to this mechanism. | `§2.5` item 5, `§5.1` (the DERIVED DENIED set, named first) |
| **9** | **`SHIM-COMPLETION-CARVE-OUT`** and **`H-r7`** (`docs/decisions.md`; the handoff record): the shim admits **EXACTLY ONE** addition (`ShimElement.removeAttribute`) and **every other member in `H-r5`'s list stays forbidden** — *"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam"*. | `§0A` note 2 (`H-r7`), `§2.2` `P-TH-6`, `§2.4` item 2, `§3.4 R-3` |
| **10** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE): a code-bearing unit's register is **MANDATORY before its red set**; the zero-row exemption is **UNAVAILABLE**; the row count is an **OUTCOME, not a budget**. | `§5.5`, `§5.5.1`, `§5.5.2` items 1/2 |
| **11** | **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE): assertions, observations and readings are printed **BESIDE** a term and **NEVER** counted in it; and *"a total that is not the sum of its own terms, or a total quoted without its terms, is a review finding."* | `§5.5.1` (every cell), `§5.5.2` item 3, `§5.5.3` |
| **12** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE), **cited for the form and for the fact that this unit's seam set is EMPTY**: a caller seam is a **PUBLIC, EXPORTED, DOCUMENTED CONTRACT a fork IMPLEMENTS**, and *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is normative contract text."* | `§2.1` item 3 (the empty seam set), `§2.2`(D), `§8` |
| **13** | **`DOC-REVIEW-GATE`** / **`BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE): a per-unit **documentation review** is MANDATORY after the greens (`AGENTS.md` item 10d / RCA-6) and **every `*-greens.md` is blind-verified by a fresh writer**. | `§5.1` rows 4/5, `§5.3` item 8 |
| **14** | **`E5-B-3`'s PRECEDENT for the FORM of a FILEABLE item** (`docs/decisions.md`; `docs/specs/container-review.md` `§9.5` `G-3`): a **`FILEABLE`** item is *"a RECORDED WORKING DEFAULT … it does NOT gate the filing"*, and its sibling form is `docs/specs/gutter-ui.md` `§7a.1`. | `§0A` note 5, `§7a.1` (both items) |
| **15** | **`H-r8`** (the handoff record): **every adopted unit's contract must survive the SIX PROHIBITIONS as a testable assertion set, one row each** — *"no consumer vocabulary as symbols/enumerated constants; no app UI content authored; no policy defaults; no UI-config store or persistence; no new MCP surface; no criterion unverifiable on a layer this repo owns"* — carried as a **`§0 Contract-prohibitions`** block, **with the test that pins each row**. | `§2.2`(A) (the six-row table) |

**Where a ruling's own row records a DERIVATION, this filing carries the derivation flag with it** — see `§0A`
note 4.

### 0A. The dated ruling notes — the clauses the record leaves to this filing, DECIDED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about the module, its
exports, the two pinned signatures, the removal case, the name-echo rule, the env closure and the register sketch;
it is **silent** about several clauses a TestWriter must have before it can author a **falsifiable** row. **This
filing DECIDES each of those clauses here**, each with its reason and its landing site. **No note below weakens a
condition, a ruling or a register row**; the places where a clause is **this filing's own choice rather than a
derivation** are **flagged as such and reported at `§7a`/`§7a.1`**.

**Note 1 — THE MODULE PATH IS `src/shared/theme.ts`, AND THE TEST FILE IS `tests/theme.test.ts`.** The record fixes
the module's directory (`§4.9` of the record, and `docs/pending.md`'s `SCH-3` row: *"`U-THEME` (mechanism;
`src/shared/theme.ts`)"*); the sibling naming convention (`gesture-session.ts` · `gutter.ts` · `relocate.ts` ·
`container.ts` · `menu-template.ts` · `owned-list-host.ts` · `slot-host.ts` · `layout-projection.ts`) agrees; and
**this pass globbed `**/theme*` and it returned NO FILES.** **Nothing else in this file presumes a path.** The test
file is named because **`§5.1`'s diff scope must be a real, checkable allow-list.**

**Note 2 — THE APPLIER'S NAME, ARITY, RETURNED SHAPE AND REMOVAL CASE — `Q2` PINNED.**
**RULED: the exported name is `applyThemeDeclaration`; the arity is TWO (`attributeName`, `resolved`); the returned
value is the THREE-MEMBER record `ThemeAttributeWrite = {name, value, removal}`; and THE REMOVAL CASE IS
`{ name: <echoed>, value: '', removal: true }`.** **THE `H-r7` `removeAttribute` CLASS IS REPRESENTED AS DATA AND
IS NEVER CALLED:** there is **no `removeAttribute` invocation, no `element` parameter, no realm access and no write
of any kind in this module** — **the returned record is exactly what a CONSUMER needs in order to perform the write
on an element it owns** (ruling 5's `E5-B-1` precedent, applied to this unit's artifact). **WHY `removal` IS A
THIRD MEMBER RATHER THAN AN ABSENT `value` OR A `null` NAME: a two-member record forces the consumer to infer the
removal case from a value's emptiness — and *"the value is `''`"* is a legal CALLER token, so the inference would be
ambiguous.** **`removal: true` is the DECLARED discrimination, and a row can FAIL for a module that signals removal
by a sentinel name, an absent `value` member or a fourth member.** **The type name `ThemeAttributeWrite` is this
filing's choice, required because the record pins the SHAPE and not its name — it is a TYPE name only and moves no
row term.**

**Note 3 — THE APPLIER IS A MECHANISM AND NOT A UI ELEMENT — `C-4`'s finding, derived.** **This module
`authors` NOTHING: it returns a record of three values and touches no element, no class, no attribute, no text and
no stylesheet** — so under `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test it is **not a UI element**, and
`UI-RENDERED-WITH-PROVIDENT` **has no element of this unit's to apply to**. **THE ONE READING THIS NOTE REFUSES,
stated so it cannot be read as a licence: *"returns the attribute write it would perform"* does NOT mean the
mechanism performs it, documents the attribute, or knows what the attribute MEANS.** **`returned` is not `written`,
and the attribute's NAME is the caller's — the mechanism may not document it** (`A-d6`: *"no `data-theme` literal"*).

**Note 4 — THE PASS-THROUGH READINGS ARE THIS FILING'S DERIVATIONS, AND THEY ARE LABELLED AT EVERY SITE.**
**The record's own words are *"the resolved value is the CALLER's own opaque token PASSED THROUGH (`String()`-coerced
only for a non-string), with `env.prefersDark` REPORTED in `basis`/`prefersDark` rather than being the value's
source"*** (its `§4.2`) — **THE QUOTED `basis` HERE IS THE AS-FILED NAME of the member the `2026-09-27` spec gate
renamed `source` (`§0A` note 6): A VERBATIM QUOTATION OF THE RECORD IS NOT RESPELLED** — and **the record itself
marks that as `Q1` *"DERIVED AS FAR AS IT GOES"*, not pinned**.
**THIS FILING THEREFORE IMPLEMENTS IT AS A RECORDED WORKING DEFAULT (`A-1`, `§7a.1` item 1) AND LABELS EVERY ROW
THAT DEPENDS ON IT**: `§2.3` item 1's non-string arm, `P-TH-IM-1`, `P-TH-TP-2` and the `§2.1` census's
`ThemeResolution` block. **THE ALTERNATIVE — a DECLARED TWO-MEMBER POOL owned by the mechanism — is NAMED AT
`§7a.1` item 1 and is NOT TAKEN.** **NO OTHER CLAUSE OF THIS FILE DEPENDS ON THE CHOICE**, and a reversal **moves
those four sites and owes a register re-grain**; **no export name, no arity, no returned-shape member and no section
number moves.**

**Note 5 — THE FILING'S OWN DECISION RECORD, IN THE `E5-B-3` FORM: TWO ITEMS, `FILEABLE`, NEITHER A BLOCKER.**
**`Q2` AND `Q3` OWE NO ARCHITECT ANSWER AT ALL** — the record **pinned** them (its `§4.3`/`§4.5`), and **a later
pass re-typing either as an open question would manufacture a blocker out of a settled clause.** **`A-1` (the
pass-through domain) and `A-2` (the NAME of the observable degradation) are genuine architect-owned questions and
NEITHER IS A BLOCKER, because each has a recorded working default with an architect-reversible alternative** — the
`E5-B-3` precedent exactly (`docs/decisions.md`'s `E5-B-3` row's own title says *"NOTE (not `DECIDED`)"*). **SO
THIS FILING PROCEEDS ON THE DEFAULTS AND LETS THE ARCHITECT REVERSE BY DATED ANNOTATION.** **`A-3` DOES NOT
SURVIVE** (the record's `§4.10`): it is recorded at `§7a` with no default and no row.

**Note 6 — THE SPEC-GATE RULING OF `2026-09-27`: THE DISCRIMINATOR FIELD `basis` IS RENAMED `source`, AND IT IS A
RENAME ONLY.** **WHAT THE ARCHITECT RULED, in one line: THIS SPEC IS APPROVED AS FILED, WITH ONE CHANGE — the
discriminator field `ThemeResolution.basis` is to be REPHRASED AS `ThemeResolution.source`.** **WHY IT IS A RENAME AND
NOT A SEMANTICS CHANGE, stated as the ruling's own reason: the member is the OBSERVABLE that reports whether the
environment reading resolved or was absorbed, and the ruling renames the SPELLING of that member and moves nothing
else — no body's meaning, no reading, no degradation rule and no observability claim changes.** **THE MEMBER SET IS
UNCHANGED: the declared CLOSED domain stays `'env'` | `'degraded-env'`, exactly TWO bodies, `2` before and `2` after,
because NO member's wording depended on the old field name** (each of the two bodies names an ENVIRONMENT READING
state, not the field).

**THE AS-FILED FORM, KEPT VISIBLE** (annotate-never-rewrite: the as-filed declaration is QUOTED here rather than
erased from the file's history)**:**

```ts
  /** `basis`    — THE OBSERVABLE DEGRADATION: `'env'` when the environment reading resolved
   *               normally, `'degraded-env'` when the reading was absorbed to `false` by one
   *               of the declared hostile shapes (`§2.3` item 2's table). A CLOSED TWO-MEMBER
   *               STRING DOMAIN, and its NAME is `A-2`'s open naming question (`§7a.1` item 2). */
  readonly basis: 'env' | 'degraded-env'
```

**WHAT THE RENAME TOUCHED, EXHAUSTIVELY** — every site in this file that NAMES the member: **`§2.1`'s
`ThemeResolution` block and its item 5 literal list · `§2.2`(D)'s semantics table · `§2.3` items 2/3 (the `env`
table's column and the honest-limit sentence) · `§3.1 M-1`/`M-2`/`M-3` · `§3.2 F-1` · `§3.3 I-3` · `§3.4 R-1`'s
exemptions and `R-8` · `§4.4 S-TH-11` · `§5.3` item 3 · `§5.5.1`'s register rows and their domains · `§5.5.2` item 8 ·
`§7` item 10 · `§7a`/`§7a.1` item 2 · `§3a`'s `A-2` seed · and `§8`'s index (the ruling's own citation row).**
**NOTHING ELSE MOVED, stated explicitly because a typed register is involved: NO register TERM moves** (`102` and its
twelve terms are unmoved — `12 + 12 + 10 + 8 + 6 + 3 + 12 + 12 + 10 + 8 + 6 + 3`) **· NO ROW ID moves**
(`P-TH-IM-1`…`P-TH-TP-6` are the same ids) **· NO STRATEGY ID moves** (`S-TH-*`) **· NO SEED moves** (`20260927`,
one LCG step per draw, `pool.length = 12`) **· NO CAP moves** (`≤100`/row · `≤400` total · stop-after-5) **· and NO
shape, pool member, domain, `(bounded)` marking, section number, export name, arity, or record member beyond the ONE
RENAMED SPELLING moves.** **NO REGISTER RE-GRAIN IS OWED BY THIS RULING.**

**THE GATE-1 RECORD'S VERBATIM QUOTATION IS NOT RESPELLED.** The record's own sentence — *"`env.prefersDark` REPORTED
in `basis`/`prefersDark` rather than being the value's source"* — is **quoted as it stands** at `§0A` note 4 and
`§7a.1` item 1, and **a reader must read that quoted spelling as the AS-FILED NAME of the member this ruling renamed
`source`.** **A pass that respells a quotation is misquoting the record, not applying the ruling.**

**THE TWO OPEN ITEMS, POST-RULING (the gate's own outcome).** **`A-1` STANDS AS FILED** — the pass-through resolved
domain is **APPROVED at the spec gate** and **remains ARCHITECT-REVERSIBLE** (a reversal still moves the four sites
`§7a.1` item 1 names and still owes a register re-grain) — and **`A-2` IS CLOSED BY THE RULING**, as a **RENAME**
rather than a semantics change: **the observability and the two bodies were approved as filed, and only the spelling
is ruled.** **A later pass that re-types `A-2` as an open question is citing a clause this file no longer carries.**

**NO STATUS BEYOND THE SPEC GATE IS ADVANCED BY THIS NOTE** — the module does not exist, the red set has not been
authored or run, and `E8` remains an OPEN unit (`CURRENT STATE` items 1/6; `§4.5`).

**Note 7 — THE RED RUN'S PROVENANCE, AND THE FOUR CONTRACT DEFECTS IT EXPOSED (amendment of `2026-09-27`, SECOND
DATED NOTE OF THE SAME DAY, APPENDED — NOTHING ABOVE MOVES).** **THE RED SET HAS NOW BEEN AUTHORED AND RUN.**
**PROVENANCE, recorded verbatim so no later pass re-derives it:** the file is **`tests/theme.test.ts`**, it carries
**`58` rows**, and it ran against the **ABSENT MODULE** with **`40` FAILED / `18` PASSED**. **The `§5.5.1` register
STOPPED AT `P-TH-IM-1` after FIVE CONSECUTIVE FAILURES** (the `§5.5.1` method-note-3 stop rule), and **the ELEVEN
rows not reached are REPORTED AS UN-RUN FAILURES, never as passes** (`§4.2`). **This is `[T]`-layer, module-absent
evidence only** — the layer anchors are unmoved and **no green is claimed anywhere by this note.**

**THE FOUR DEFECTS THE RED RUN EXPOSED, IN THE REGISTER'S ARITHMETIC AND LEDGER, AND THIS AMENDMENT'S FOUR FIXES.
THE TERMS THEMSELVES ARE UNCHANGED: NO TERM, NO ROW ID, NO STRATEGY ID, NO SEED, NO CAP, NO SHAPE, NO POOL MEMBER
AND NO SECTION NUMBER MOVES.**

1. **`§5.5.3` MIXED TWO FIGURES.** The twelve **TERMS** sum to **`102`**, while **`§5.5.2` item 3's DISTINCT figures
   sum to `99`** (`102 − 12 + 9`): `§5.5.3` printed only the `102` chain, so **a DONE row reconciling DECLARED
   versus DISTINCT had no authority.** **FIXED at `§5.5.3`, which now prints BOTH figures, each with its own terms
   and its own chain, and states in one sentence which is which and where each is used — the as-filed `102` chain
   and the as-filed sentence are KEPT VISIBLE there.**
2. **`§5.5.2` item 3's LEDGER OMITTED `P-TH-TP-5`.** `§5.5.1` declares its term as `6`, but the ledger listed only
   `8` rows (one of them the catch-all) and carried no `P-TH-TP-5` line at all. **FIXED: the row is ADDED to the
   ledger with its declared `6` / distinct `6`**, exactly as `P-TH-TP-5`'s own cell declares it.
3. **`§5.5.2` item 3's catch-all MISLABELLED SIX ROWS AS *"the other five rows"*.** The rows are **`P-TH-IM-1`,
   `P-TH-IM-3`, `P-TH-IM-4`, `P-TH-SM-1`, `P-TH-TP-2` and `P-TH-TP-3` — SIX — each with a distinct figure equal to
   its term.** **FIXED: the count is corrected to SIX and the six rows are NAMED; the as-written *"the other five
   rows"* form is KEPT VISIBLE.**
4. **`§3.4 R-1`'s EXEMPTION LIST IMPLIED THE `typeof`-TAG BODIES RATHER THAN CARRYING THEM.** `§2.1` item 5 fixes
   the module's **FIVE** literal bodies — `''`, `'env'`, `'degraded-env'`, `'string'`, `'object'` — and the last two
   are the `typeof` tags the value rules REQUIRE. **`R-1`'s exemptions now NAME the exemption set explicitly,
   including a named `typeof`-TAG SUB-SET**, so the row's scan can hold and still FAIL for a genuinely spelled
   token (`S-TH-7`'s class).

**ALSO RECORDED HERE AS DATED METHOD NOTES — the two readings the red set had to CHOOSE, because the spec is SILENT
on them and a later author must NOT re-discover them:**

- **(a) THE OMITTED-ARGUMENT DRIVE IS DRIVEN AT ARITY 0.** `§2.3` item 1(c) and `§2.4` item 1(d) name the OMITTED
  case but fix **NO MARKER VALUE** for it — so the red set drives **the applier's (and the resolver's) omitted arm by
  invoking the function with ZERO arguments (ARITY 0)** rather than through a marker value. **NO MARKER IS
  INTRODUCED, NO ARGUMENT DOMAIN WIDENS, and a later pass that invents a marker value is adding a clause this
  contract does not carry.**
- **(b) TWO POOL MULTIPLICITIES ARE EACH ONE MEMBER.** `P-TH-TP-1`'s *"deeply nested array"* (its depth being the
  red set's own construction) and `P-TH-IM-1`'s shapes `(8)` and `(10)` (which name several values apiece —
  `0`/`-0`/`NaN`/`1`, and a `Symbol` plus a `12n`) are each taken as **ONE MEMBER**, as `§5.5.1` declares them:
  **the pools keep their declared lengths and each such shape consumes ONE drive.** **The multiplicity naming is a
  POOL LABEL, never a term.**

**AND THE HONEST EXTENT OF THIS NOTE: it edits THIS FILE ONLY. It runs no leg, no suite, no `tsc` and no register
row, changes no tracker, and adds no commit of its own** (`RCA-8`: the pass that lands it commits it).

**Note 8 — THE GATE-4 CONTRACT-SIDE DISPOSITIONS AND THE `NG-2` RE-GRAIN, TAKEN (amendment of `2026-09-27`, THIRD
DATED NOTE OF THE SAME DAY, APPENDED — NOTHING ABOVE MOVES).** **WHAT THIS NOTE IS: the contract-side half of the
gate-4 findings (`§3b`'s `F1` and `F4`) is PINNED, and the re-grain this file PRE-COMMITTED to (`CURRENT STATE` item
11; `§3b`'s `NG-2`) IS NOW TAKEN because the TestWriter authored the drive it waits on.** **THE FIVE DISPOSITIONS,
each with its landing site:**

1. **`F1` — THE `env` MEMBER-READ FORM IS PINNED AT `§2.3` item 2 (its new row `(13)`, plus the pinning sentence
   beside that table).** The mechanism reads the member through its **OWN-member form**, as **the inherited-member
   obligation (`§2.3` item 2 row `(12)`) already implied** — so **an object whose traps expose no own `prefersDark`
   member reads the DECLARED DEGRADATION (`false`, `source: 'degraded-env'`), and a container carrying a genuine own
   member reads THAT member.** **NO MODULE FIX IS OWED: the landed `src/shared/theme.ts` already conforms**
   (read this pass: its `envReading` reads `Object.getOwnPropertyDescriptor` and declares the degradation when the
   descriptor is `undefined`).
2. **`F4` — `P-TH-TP-5` CARRIES ITS `(bounded)` MARKING (`§5.5.1`'s cell, `§5.5.2` item 2).** **THE MARKING IS A COUNT
   OF ROWS: the marked set moves `5 → 6` rows (`5 + 7 = 12` → `6 + 6 = 12`), and it moves NO TERM.**
3. **THE `NG-2` RE-GRAIN, TAKEN (`§5.5.1` `P-TH-TP-3`'s cell, `§5.5.2` items 2/3/11, `§5.5.3`, `§5.3` item 11,
   `§7` item 9, `§8`).** **`P-TH-TP-3`'s term `10 → 11` — the `11`th hostile member is an INHERITED `env`
   (`Object.create({prefersDark: true})`), driven in that row and in `F-2`'s pool — so the DECLARED total moves
   `102 → 103` and the DISTINCT total moves `99 → 100`.** **EVERY FIGURE IS PRINTED AT `§5.5.3` WITH ITS OWN TERMS,
   ITS OWN ELEVEN-STEP CHAIN, ITS OWN FAMILY SUBTOTALS AND ITS OWN CAP RE-CHECK (against the DECLARED figure), AND
   THE AS-FILED FIGURES ARE KEPT VISIBLE THERE UNDER A DATED ANNOTATION.** **THE ONLY TERMS THAT MOVE ARE
   `P-TH-TP-3`'S: no other term, no row id, no strategy id, no seed, no cap, no shape and no section number moves.**
4. **`F7` — RECORDED, AND IT IS A TEXT-OF-METHOD NOTE, NOT A CONTRACT CHANGE:** **step 2's ledger title claimed SIX
   differing rows while its own ledger expects ONE** (only `P-TH-IM-2`'s `12 → 9` differs; the other eleven distinct
   figures equal their terms) — **the title is corrected to the ledger's own reading as-written at `§5.5.2` item 3,
   with the as-written form kept visible.** **NO TERM AND NO FIGURE MOVES BY THIS CORRECTION.**
5. **`F2` — RECORDED AS A `[T]`-SIDE OBLIGATION THE TESTWRITER OWES, NOT AS A CONTRACT CHANGE** (`§3b`'s new
   `AMEND-1` row): **the declared invocation-count-`0` assertion of `P-TH-IM-1`/`P-TH-IM-3` is structurally zero
   because the recorder is NEVER PASSED to the module** — **so the assertion must be re-grounded by the TestWriter
   (red-first) before any DONE row may cite it.** **THIS FILE'S OWN TERMS, ROWS AND FIGURES ARE UNTOUCHED BY IT: a
   contract cannot repair an instrument it does not own.**

**AND THE HONEST EXTENT OF THIS NOTE, stated as note 7's was: it edits THIS FILE ONLY.** It runs **no leg, no suite,
no `tsc` and no register row**, changes **no tracker**, and adds **no commit of its own** (`RCA-8`: the pass that
lands it commits it). **The `11`-member pool, the `103`/`100` figures and the `6`-row marked set are CONTRACT
DESIGN until the register rows are EXECUTED: an un-run register row is reported as a FAILURE, never as a pass**
(`§4.2`, `§5.5.3`).

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no `tsc` invocation
was made, no Electron window booted, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` under the node suite | not a browser, not a real OS, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/theme.ts` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg | **not** an identity leg; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **nothing this unit's contract needs to observe**; **this spec claims no `[D]` row** (`§5.2`) |

**Seven honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence, and NEVER OS evidence.**
   It says this repo's vitest files pass against this unit's module. **No window is booted, no OS preference is
   read, no `matchMedia` is consulted, no attribute is written, no element is touched, no MCP transport is
   exercised, and no real appearance change is observed anywhere in the run.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a document**: the only
   arguments are **a caller value and a caller's environment record**. **A `[T]` green here proves THE RETURN
   VALUES OF TWO PURE FUNCTIONS AND NOTHING ELSE.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no `process`,
   no `navigator`, no `globalThis`-rooted lookup, no `matchMedia`, no `localStorage`, no `Date`, no `Math.random`,
   no `fs`. **Every value is an argument.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its rows are
   authored in **this unit's own test file** and executed by the **same node suite** (`npm test`, `§5.2` leg 1) —
   so **a register row is `[T]` evidence exactly as a `§3` row is**, and **no register row may be read as `[H]`,
   `[U]`, `[D]`, OS or assembled-app evidence.**
5. **A green on the returned write is NOT a green on an APPLIED attribute.** **No row of this unit may be read as
   evidence that an attribute exists on any element, that a `color-scheme` resolves, that a stylesheet reacts, that
   the app looks different, or that the OS preference is what the caller supplied** — **none of which this unit
   produces, performs or observes** (`§2.4` item 3, `§3.3 I-7`).
6. **The `env` argument is a CALLER CLAIM ABOUT ITS OWN ENVIRONMENT, and `prefersDark` is NOT an OS reading.**
   **Every other "dark mode" sentence in this file is a statement about a VALUE RULE, never about an operating
   system this repo can observe.**
7. **The resolved value is OPAQUE and CARRIED, and CARRIED IS NOT INTERPRETED.** No value this unit returns is
   read by the module as a decision, **and no row proves that any resolved token is one a stylesheet accepts.**

---

## 1. Scope

**One deliverable: one `src/shared/` module — a PURE, TOTAL, STATELESS mechanism of TWO functions: the appearance
resolver and the DECLARATION-ONLY attribute-write applier** — with **the environment reading injected and never
read ambiently**, **no token name and no token value in any module byte**, **no attribute name owned by the
mechanism**, and **no write of any kind**.

1. **What the unit is, in one sentence.** A **node-local, policy-free-by-construction mechanism** that
   (a) **RESOLVES** a caller-supplied, opaque appearance `setting` against a caller-supplied environment record
   into the three-member `ThemeResolution` (**for every input shape, including the malformed, the hostile and the
   absent, and never by throwing**); and (b) **RETURNS THE ATTRIBUTE WRITE IT WOULD PERFORM** as the three-member
   `ThemeAttributeWrite`, **with the attribute NAME caller-supplied, the removal case represented as DATA, and
   nothing written anywhere**. **No factory, no session, no options object, no state** (`§2.5`).
2. **What the unit is NOT — no token names and no token values.** **The module contains NO `'light'`, no `'dark'`,
   no `'system'`, no token name, no token value, no CSS custom-property name, no `--`-shaped literal and no token
   namespace** (ruling 2's own words: *"no token names/values (the token block stays the consumer's stylesheet)"*).
   **The resolved value is the CALLER's own token, carried** (`§2.3` item 1).
3. **What the unit is NOT — no attribute name, and no appearance control.** **The module owns NO attribute name —
   not `data-theme`, not `class`, not `color-scheme`, not any other spelling** (**the mechanism may not even
   DOCUMENT one**: ruling 2's *"no `data-theme` literal"*). **And it owns no control**: the AUTHORED appearance
   control is **`F1`'s (`U-THEME-CONTROL`), a UI unit, in the demo envelope**, and **this unit does not implement
   it, render it, wire it, dispatch it, persist it or count it** (`§2.5` item 3).
4. **What the unit is NOT — no UI element, no write, no styling.** Per ruling 4's mechanism test this module
   authors **no text, no control, no affordance, no class taxonomy, no slot content and no styling**; **it returns
   one record**, and **`UI-RENDERED-WITH-PROVIDENT` has no element of this unit's to apply to** (`§0A` note 3).
5. **What the unit is NOT — no OS read, no environment reading of its own.** **There is no parameter through which
   an OS or a media query could be observed and no ambient read that could supply one. `env` ARRIVES AS AN
   ARGUMENT**, and the module performs **exactly ONE strict comparison** against the literal `true` (`§3.3 I-7`,
   `§3.4 R-7`).
6. **What the unit is NOT — no store, no persistence, no journal, no cache.** **This repo owns no UI-config store,
   `S-d4` is intact, and persistence stays consumer-side** (ruling 3): **a later pass that adds a store to either
   of this adoption's units owes a NEW GATE and must not smuggle it in here** (`§3.3 I-4`). **⟶ READ BESIDE 2026-10-03
   (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set — the `A-d6`
   boundary's *"this repo owns no UI-config store"* half is SUPERSEDED FOR THE BOUNDARY by the answered plan's
   `§5.9` row 21; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed item above is KEPT VISIBLE and is NOT rewritten): the
   appearance setting is now read from tier 1 (`file.settings.theme.token`) by the CALLER's resolution site —
   `src/renderer/theme-store.ts`, the `U-STORE-MODULES-SEAMS` unit's declared wiring file (`store-modules-seams.md`
   `§2.3`) — which passes the value as `resolveTheme(setting, env)`'s parameter. **WHAT SURVIVES: the mechanism (this
   module) writes nothing, holds no store and keeps its `0`-import census — THE FLAG ROW (re-verified by
   `P-SMS-TH-IM-1`) — and the AUTHORED-control half of `A-d6` stays: the authored control is provident data (`F1`'s
   surface), never a store consumer. The "later pass" sentence above reads for THIS module's own bytes: the store
   edge is `H2b`'s declared caller file, not a byte smuggled into `U-THEME`/`U-THEME-CONTROL`.**
7. **What is EXPLICITLY OUT of scope (do not do in this unit).** No renderer wiring and no demo-envelope work
   (`§5.1`'s DENIED set — **the demo path and `src/renderer/index.html` are `F1`'s**); **no import of any sibling
   module, not even type-only** (`§2.1` item 3); no `electron` and no `node:*`; **no element parameter and no DOM
   read of any kind**; no `matchMedia` and no media-query read; no `setAttribute`/`removeAttribute` invocation; no
   store, no persistence and no module-level mutable state; no new MCP surface, no IPC method, no tool and no
   resource; no divergence-harness work and **no `[D]` row**; no `scripts/**`; **no
   `docs/skills/designing-pages.md` update — that file DOES NOT EXIST** (globbed `docs/skills/*` this pass:
   `process-guardrails.md` alone), and **this unit renders no page** (`§3.5 X-4` is the probe that keeps that claim
   falsifiable).
8. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec + its
   `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new
   `src/shared/` module and touches **no existing file** except this spec and the trackers (`§5.1`).
9. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY.** **The unit ships no feature and has NO IN-TREE
   CONSUMER**: `src/shared/theme.ts` will be **imported by no `src/**` file** and will appear in **none of the
   built bundles**. **Its value is the contract itself, and for a fork it is exactly three things:** the
   **resolver discipline** (an opaque setting and an injected environment become a declared three-member
   resolution, never a throw), the **applier discipline** (a write is returned as data, and the removal case is a
   declared record rather than a call), and the **boundary discipline** (the mechanism carries the caller's own
   token and owns no vocabulary, no attribute name, no store and no OS read). **THE NAMED COST, carried because
   the family carries its own:** this repo ships **no appearance control and no stylesheet for one**, so **a fork
   implements the control and the token block, and this repo proves only the value** — and **the honest reading of
   *"prefersDark"* is that it is a CALLER CLAIM ABOUT AN ENVIRONMENT, never an OS behaviour this repo can
   observe** (`§2.3` item 2; `§7` item 2). **The honest cost of the unit itself**: this spec + a **`12`-row /
   `12`-term / `102`-attempt** register + red/green **with remands** + the adversarial pass + blind greens + the
   per-unit documentation review + a DONE row + per-gate commits (`RCA-8(f)`). **⟶ (`2026-09-27`, `§0A` note 8: the
   `102` in that sentence is the AS-FILED figure, STALE ON THE ARITHMETIC ONLY): the `NG-2` re-grain is TAKEN, so the
   LIVE cost figure is `103` declared / `100` distinct, with a `(bounded)` marked set of `6` ROWS — each printed with
   its own terms, chain, subtotals and cap re-check at `§5.5.3`.**

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/theme.ts`** (`§0A` note 1). **It imports NOTHING** (`§2.1` item 3).

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: FIVE exported names, in TWO HALVES —
TWO value exports and THREE type declarations.** **The two halves are counted separately on purpose** (the family's
census rule: `docs/specs/container.md` `§2.1`, `docs/specs/menulib.md` `§2.1`), because **a type declaration is
erased at runtime** — so a single *"5 exports"* claim would be **half-unfalsifiable**. **A row asserting only a
COUNT without NAMING the names FAILS `§3.4 R-5`'s own text** (`§4.4 S-TH-6`).

1. **THE TWO RUNTIME VALUE EXPORTS — exactly `resolveTheme` and `applyThemeDeclaration`** (`§3.4 R-5`(a) reads the
   imported namespace's own keys **by name**, with a positive control that a namespace carrying a **THIRD** value
   export FAILS). **THE THREE TYPE DECLARATIONS — exactly `ThemeResolution`, `ThemeAttributeWrite` and
   `ThemeEnv`** (`§3.4 R-5`(b): a type-only name is **erased at run time**, so the type half is a **PRESENCE**
   claim pinned by **`§5.2` leg 5's standalone strict `tsc`**). **`2 + 3 = 5`.**
2. **THE TWO FUNCTIONS, IN FULL, WITH THEIR RETURN SHAPES, THEIR DECLARED DEGRADATIONS AND THEIR ERROR PATTERNS.**
   **THE ERROR PATTERN IS THE CONTRACT AND IT IS UNIFORM: NEITHER FUNCTION EVER THROWS, FOR ANY ARGUMENT, AND
   NEITHER HAS A REFUSAL DOMAIN.** There is **no `ok`, no `code`, no `reason`, no `thrown`, no `disabled` and no
   sentinel in this contract**: an unusable argument produces **a DECLARED VALUE** — the declared degraded
   resolution, or a declared `name: null` write.

```ts
/** WHAT `resolveTheme` RETURNS — the THREE-member resolution record, in THIS declaration
 *  order, and no fourth member (`§2.1` item 2, `§7a.1` item 1).
 *  `setting`  — THE CALLER'S OWN TOKEN, handed on BY IDENTITY where the argument was a
 *               non-empty string; the declared `null` for every non-string, every `''`
 *               and the omitted case (`§2.3` item 1). IT IS NEVER PARSED, NEVER
 *               ENUMERATED, NEVER COMPARED and NEVER interpreted.
 *  `prefersDark` — the boolean READING of the caller's own `env.prefersDark` member under
 *               the STRICT `=== true` rule (`§2.3` item 2). IT IS A REPORT, NEVER THE
 *               SOURCE OF `setting`.
 *  `source`   — THE OBSERVABLE DEGRADATION: `'env'` when the environment reading resolved
 *               normally, `'degraded-env'` when the reading was absorbed to `false` by one
 *               of the declared hostile shapes (`§2.3` item 2's table). A CLOSED TWO-MEMBER
 *               STRING DOMAIN; ITS NAME IS RULED (`source` — the as-filed spelling was
 *               `basis`, renamed by the 2026-09-27 spec gate, `§0A` note 6: a RENAME ONLY). */
export interface ThemeResolution {
  readonly setting: string | null
  readonly prefersDark: boolean
  readonly source: 'env' | 'degraded-env'
}

/** WHAT `applyThemeDeclaration` RETURNS — the THREE-member attribute write, in THIS
 *  declaration order, and no fourth member (`§0A` note 2).
 *  `name`    — THE ECHOED ATTRIBUTE NAME: the caller's non-empty string BY IDENTITY; the
 *               declared `null` for every non-string, every `''` and the omitted case.
 *               `String()`/`toString`/`valueOf` ARE NEVER CONSULTED for it (`§2.4` item 1).
 *  `value`   — the RESOLVED value the write would carry: the `setting` member of the
 *               resolution, or the declared `''` WHEN AND ONLY WHEN `removal` is `true`
 *               (`§2.4` item 2).
 *  `removal` — `true` when the write is the REMOVAL case (the H-r7 `removeAttribute` class
 *               REPRESENTED AS DATA AND NEVER CALLED), `false` otherwise. It is the ONLY
 *               member that discriminates a removal (`§2.4` item 2).
 *  THE RECORD IS A FRESH, PLAIN RECORD each call (`§3.3 I-3`), and it is DATA: no element,
 *  no attribute, no class and no realm read participates in producing it. */
export interface ThemeAttributeWrite {
  readonly name: string | null
  readonly value: string
  readonly removal: boolean
}

/** THE CALLER'S ENVIRONMENT RECORD — CLOSED AT EXACTLY ONE MEMBER, `prefersDark`,
 *  and the reading is STRICT `=== true` (`§0A` note 4 of the record; `§2.3` item 2).
 *  ANY object shape is admissible as an ARGUMENT (the parameter is `unknown`), and every
 *  shape that is not this one — missing member, string, number, `undefined`/non-object,
 *  frozen, throwing accessor, revoked/trap-throwing Proxy — is a DECLARED DEGRADATION
 *  (`§2.3` item 2's table), never a throw and never a second member. */
export interface ThemeEnv {
  readonly prefersDark: boolean
}

/** THE APPEARANCE RESOLVER — PURE, TOTAL, STATELESS.
 *  Returns the THREE-member `ThemeResolution`:
 *    - `setting` is the CALLER's own token BY IDENTITY for a non-empty string argument,
 *      and the declared `null` for EVERY other shape (`§2.3` item 1);
 *    - `prefersDark` is the STRICT `=== true` reading of the single declared env member,
 *      and `false` for every hostile env shape (`§2.3` item 2);
 *    - `source` is `'env'` when the reading resolved normally and `'degraded-env'` when it
 *      was absorbed (`§2.3` item 2's table).
 *  IT READS NO AMBIENT GLOBAL, owns NO token vocabulary, applies NO precedence between
 *  `setting` and `prefersDark` (`§3.4 S-TH-4`), and NEVER THROWS. */
export function resolveTheme(setting: unknown, env: unknown): ThemeResolution

/** THE DECLARATION-ONLY APPLIER — PURE, TOTAL, STATELESS, and IT PERFORMS NO WRITE.
 *  Returns the THREE-member `ThemeAttributeWrite` it WOULD perform:
 *    - `name` echoes the caller's `attributeName` VERBATIM BY IDENTITY when that argument
 *      is a NON-EMPTY STRING, and is the declared `null` for every non-string, every `''`
 *      and the omitted case — with `String()`/`toString`/`valueOf` NEVER consulted
 *      (`§2.4` item 1);
 *    - `value` and `removal` are determined by the RESOLVED value it is handed: a resolved
 *      STRING that is NOT `''` yields `{value: <the resolved string by identity>, removal: false}`,
 *      and a resolved value that is `null` or `''` yields the REMOVAL CASE
 *      `{value: '', removal: true}` (`§2.4` item 2).
 *  IT CALLS NOTHING: no `setAttribute`, no `removeAttribute`, no element access and no
 *  realm read. The `H-r7` removal class is REPRESENTED AS DATA (`§0A` note 2). NEVER THROWS. */
export function applyThemeDeclaration(attributeName: unknown, resolved: unknown): ThemeAttributeWrite
```

3. **THE IMPORT CENSUS: NONE — NOT ONE STATEMENT, NOT EVEN TYPE-ONLY.** **`§3.4 R-4` is the row that pins it, and
   `R-4`'s positive control is that a SINGLE import of ANY path FAILS it.** **Why it is EMPTY, stated because two
   sibling units each needed one type-only line:** **(a)** the module **receives no element, no session, no engine
   surface and no sibling value** — its whole surface is **a value and two caller arguments**; **(b)** its three
   types are **declared locally in three lines**, so there is **no shape it needs to borrow**; **(c)** **ruling 2's
   acceptance line names `document`/`window`/`localStorage`/`fs` as absent**, and an EMPTY census satisfies it in
   the strongest form; and **(d)** **`docs/specs/gsession.md` `§2.5` is NOT this unit's surface**: this unit
   neither composes a session nor names it. **A later pass asserting an import edge in EITHER direction is a
   `§4.4 S-TH-9` STOP.**
4. **THE SEAM SET IS EMPTY — AND THIS IS A DERIVATION STATED AS ONE, NOT AN OVERSIGHT.** `A-d6` names **no
   injected caller closure** for this mechanism: the two inputs are **a VALUE and an ENVIRONMENT RECORD**, and the
   second is `{prefersDark}`. **So `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` has no seam here to
   make normative, the fork-facing carry is the two exported signatures plus the three exported types, and a later
   pass asserting a seam would be asserting a clause this unit's charter does not contain.** **THE `docs/FORKER.md`
   CARRY IS `OWED` to whatever pass next touches that file; it gates no unit** (`§7` item 7).
5. **THE MODULE'S DECLARED STRING LITERALS, PINNED AS A CLOSED SET SO THE SCAN ROWS (`§3.4 R-8`) CAN BE
   FALSIFIED.** **THE MODULE OWNS EXACTLY FIVE STRING-LITERAL BODIES: `''` (the declared empty value) · `'env'` and
   `'degraded-env'` (the `source` domain) · `'string'` (the `typeof` tag the pass-through rule needs) · and
   `'object'` (the `typeof` tag the environment read needs, together with a `null` guard).** **The export member
   names and the type names are IDENTIFIERS, never literals.** **THE CLAIM IS A CLOSED SET WITH BOTH CONTROLS: a
   module carrying a token literal (`'dark'`, `'light'`, `'system'`), an attribute name literal (`'data-theme'`,
   `'class'`), a CSS custom-property literal (`'--`), or a THIRD `source` body FAILS the row; a module carrying
   exactly the declared bodies PASSES it.** **⚠ AND THE LIMIT, STATED SO NO ROW OVERREACHES: a `typeof` tag is a
   string literal a conformant implementation MUST have** — so **a row asserting *"the module's only literals are
   `''`, `'env'` and `'degraded-env'`"* would redden the module the value rules require, and is `S-TH-7`'s
   class.** **The row must name the `typeof`-tag bodies as part of the allowed set, exactly as `container.md`
   `§0A` note 8.2 had to.**

### 2.2 What is CALLER-SUPPLIED, the prohibitions, the three collision reconciliation rows, and the semantics table

**Caller-supplied (never built in, never defaulted, never enumerated):** the **`setting`** value with its whole
token vocabulary and every character of it; the **`env`** record and its `prefersDark` member; the
**`attributeName`** string; and — through the consumer, never through this module — **the token block, the
stylesheet, the attribute's MEANING and every persisted preference**. **THE MODULE CONTAINS NO TOKEN NAME, NO TOKEN
VALUE, NO ATTRIBUTE NAME, NO STYLESHEET, NO ATTRIBUTE WRITE, NO ELEMENT, NO MEDIA QUERY, NO STORE, NO ARITHMETIC
AND NO PRECEDENCE RULE.**

**(A) THE `H-r8` `§0 Contract-prohibitions` SIX-ROW TABLE — one row per prohibition, each row NAMING the test that
pins it** (`H-r8`/ruling 15; the sibling form is `docs/specs/zones.md` `§2.2`, `docs/specs/menulib.md` `§2.2`(A)
and `docs/specs/container.md` `§2.2`(A)). **A prohibition citing *"a static source row"* with no id is not a row.**

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by (the test that pins it) |
| --- | --- | --- | --- |
| **`P-TH-1`** | **No consumer vocabulary** as a symbol, a closed string-union member, a default or a documented constant | **`A-d6`'s pass-through answer:** *"no token names/values (the token block stays the consumer's stylesheet)"*. **The module's own vocabulary is TWO function names, THREE type names, the SIX member names of the two records, and the FIVE declared literal bodies (`§2.1` item 5) — and NOTHING else.** **NO `'light'`, NO `'dark'`, NO `'system'`, no token namespace and no `--`-shaped literal appears in any byte** | **`R-1`** (the vocabulary scan, with its declared exemptions named and both controls), **`R-8`** (the closed-set literal row), `§5.5.1 P-TH-IM-1` |
| **`P-TH-2`** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates (`(C)#2`) | The module **authors no element, no text, no class, no attribute and no stylesheet** — it **returns one record.** **It renders no control, wires no demo envelope and applies no declaration**: `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test is satisfied **because the module is not a UI element** (`§0A` note 3) | **`R-2`** (the no-DOM/no-write row), `§3.3 I-6`, `§3.2 F-6` |
| **`P-TH-3`** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default (`(C)#3`) | **Every value is caller-supplied.** **The only degenerate values the module owns are the ABSENCE of a value it would otherwise have to fabricate: `null` for an unusable `setting`, `null` for an unusable attribute name, `false` for an unusable environment reading, and `''` as the removal case's value — each DECLARED, each a VALUE, none a policy.** **There is NO default token, NO default attribute name, NO default state, NO fallback vocabulary, NO epsilon, NO sentinel, NO precedence rule and NO `try`-and-guess** | **`R-1`**, **`R-8`**, `§2.3` items 1/2, `§4.4 S-TH-4`, `§5.5.1 P-TH-IM-1`/`P-TH-TP-1` |
| **`P-TH-4`** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` (`(C)#4`; `S-d4`) | **ZERO module-level state**: no store, no cache, no registry, no memo, no counter, no `Map`/`WeakMap` of its own, no persistence, no module-level mutable binding. **Every call is a pure function of its arguments** — and **`A-d6`'s persistence boundary is carried verbatim: this repo owns no UI-config store, and persistence stays consumer-side** (ruling 3) **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed row above is KEPT VISIBLE and is NOT rewritten): THE STORE EDGE LANDS AT THE CALLER, NEVER THE MODULE GAINS A STORE.** The caller file `src/renderer/theme-store.ts` (the `U-STORE-MODULES-SEAMS` unit's declared wiring, its `§2.3`) reads `file.settings.theme.token` (tier-qualified `resolve`, the default-seed rule on a MISS) and passes the value as `resolveTheme(setting, env)`'s parameter — the plan's `§5.2.7` row 12, the FLAG ROW. **The theme MODULE's own bytes are UNMOVED: `0` import statements (THE EMPTY IMPORT CENSUS, THE FLAG ROW, re-verified by `P-SMS-TH-IM-1`), no store, no module-level state — this row's module-byte force SURVIVES IN FULL; the `A-d6` no-store half is superseded FOR THE BOUNDARY only (`§5.9` row 21).** | **`R-3`**, `§3.3 I-4`, `§5.5.1 P-TH-SM-2` |
| **`P-TH-5`** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry (`(C)#5`) — **a NON-GOAL ROW, never a licence** (`PROHIBITION-5-IS-AN-ADOPTION-BOUND`) | This module is **imported by no `src/**` file** and registers nothing: the pinned sets keep **exactly the names they carry today** (`ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` — asserted **BY NAME as SET equality, never by a number quoted here**, per `§4.4 S-TH-6`). **The module's contract REQUIRES no tool — and the AUTHORED control `A-d6` requires (a possible future `agent-facing` surface) is `F1`'s and is NOT this unit's** | **`R-3`** (the file-set row), **`R-6`** (the diff-scope row), `§3.3 I-9` |
| **`P-TH-6`** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** (`(C)#6`; `H-r5`) | **Every row in this file is `[T]` or `static`** — two pure functions over arguments — **EXCEPT the OS-facing half, which this spec REFUSES in the family's fixed three-part form rather than promising** (`§5.2`; `(C)#6` is satisfied **by a refusal that names the criterion and states why no instrument reads it**). **`src/shared/dom-shim.ts` gains no member** (`SHIM-COMPLETION-CARVE-OUT` / `H-r7` admit exactly one, and **this unit's removal case is DATA, so it needs no shim member AT ALL** — the second independent reason the denial holds) | **`R-7`** (the no-OS-read row), **`R-9`** (the page-design probe), `§5.2`, `§3.3 I-7` |

**(B) THE PROHIBITION TABLE'S FURTHER ROWS — the module's own derived prohibitions, each with an enumerated static
row.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **`P-TH-7`** | **NO ATTRIBUTE NAME AND NO ATTRIBUTE DOCUMENTATION** — the mechanism may not own, default or document an attribute name (`A-d6`: *"no `data-theme` literal (the mechanism may not document it)"*), and may not name `class`, `color-scheme`, `data-*` or any other spelling | The name **arrives as the `attributeName` argument**, is **echoed verbatim when it is a non-empty string**, and is **otherwise `null`**; **the module contains no attribute-name literal of any kind** | **`R-8`** (the closed literal set), `§2.4` item 1, `§5.5.1 P-TH-IM-3` |
| **`P-TH-8`** | **NO OS READ, NO MEDIA QUERY, NO ENVIRONMENT READING OF ITS OWN** — no `matchMedia`, no `prefers-color-scheme` subscription, no `process.env`, no `navigator`, no `os`/`node:*`, no theme cookie or system-preference probe | **`env` arrives as an argument** and the module performs **ONE strict comparison against `true`**; **there is no ambient read anywhere in the module and no parameter through which one could arrive** | **`R-7`**, `§3.3 I-7`, `§5.5.1 P-TH-IM-2`/`P-TH-TP-3` |
| **`P-TH-9`** | **NO WRITE OF ANY KIND AND NO ELEMENT** — no `setAttribute`/`removeAttribute`/`classList`/`style`/`setProperty` invocation, no `element` parameter, no node creation, no document access | The applier **returns DATA**; the `H-r7` removal class is a `removal: true` member, **never a call** (`§0A` note 2) | **`R-2`**, `§2.4` item 3, `§5.5.1 P-TH-TP-5` |
| **`P-TH-10`** | **NO PRECEDENCE RULE AND NO TRI-STATE SEMANTICS** — the mechanism decides **nothing** about whether an explicit setting overrides the caller's environment reading, and it holds no third state | `setting` and `prefersDark` are **two independent reports in one record**; **no row may assert an ordering, an override or a precedence between them**, and **the third state (if the caller has one) lives in the opaque `setting`** | **`R-1`**/**`R-8`** (no vocabulary to express one), `§4.4 S-TH-4`, `§5.5.1 P-TH-TP-2` |
| **`P-TH-11`** | **NO SECOND AUTHORITY OVER THE CONSUMER'S STYLESHEET, TOKEN BLOCK OR PERSISTENCE** — no stylesheet, no CSS rule, no token value, no store, no journal, no preference record | The mechanism **returns a value and writes nothing**; **the token block and the stylesheet are the consumer's**; **persistence is consumer-side and a store addition is a NEW GATE** (`A-d6`) **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed row above is KEPT VISIBLE and is NOT rewritten): THE STORE EDGE LANDS AT THE CALLER — `src/renderer/theme-store.ts` (`store-modules-seams.md` `§2.3`) holds the ONE store read of `file.settings.theme.token`; **there is NO second authority over the consumer's stylesheet/token block (that half is UNCHANGED), and NO second authority over the persistence edge (the caller file is the declared ONE, spelled once, `P-SMS-TH-IM-2`)**; the MODULE's own "returns a value and writes nothing" half SURVIVES in full.** | **`R-3`**, `§3.3 I-4`/`I-5`, `§5.1` |
| **`P-TH-12`** | **NO FABRICATED EDGE TO ANY SIBLING — AND NONE TO `F1`** | **ZERO import statements**; `docs/specs/gsession.md` `§2.5`, **the demo envelope**, **the authored control**, `tokensFor`, `resolveTarget` and every other sibling surface are **named here ONLY as boundaries** — never composed, never imported, never re-expressed **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed row above is KEPT VISIBLE and is NOT rewritten): THE MODULE'S OWN ZERO-IMPORT CENSUS IS UNMOVED — the store edge is the CALLER's, and it is the CALLER FILE that imports the module, never the reverse: `src/renderer/theme-store.ts` (`store-modules-seams.md` `§2.3`) value-imports `resolveTheme`/`applyThemeDeclaration` (the caller is the store-backed party; the caller-file census is the `H2b` register's `P-SMS-TH-IM-1` drive). No sibling surface is fabricated as an edge BY THIS MODULE, in either direction — the caller import is the admitted consumer edge, not a fabricated one.** | **`R-4`**/**`R-11`**, `§2.5`, `§3.3 I-8` |

**(C) THE THREE COLLISION RECONCILIATION ROWS — the reconciliation this filing owes, in the RCA's own form:
*"banned in layer X for reason Y, legitimate in layer Z because …"*.** **Each ban site's own SCOPE is quoted; the
reconciliation is a DERIVATION WITH DECLARED EXEMPTIONS AND BOTH CONTROLS, never a relaxation of a landed
prohibition** (`docs/specs/relocate.md` `§2.3` item 3's own boundary clause: *"the bans stay … the fix is a
reconciliation step, never a relaxation of a prohibition"*).

| # | Token | Where it is BANNED, and the ban's own scope (quoted) | Why this unit is legitimate there — the reconciliation |
| --- | --- | --- | --- |
| **1** | **`theme`** | **BANNED IN LAYER `docs/specs/menulib.md` FOR REASON "`U-MENULIB`'s module must carry no consumer vocabulary":** its `§3.4 R-1` clause **(b)** sweeps *"a consumer-vocabulary token (`zone`, `pane`, `tab`, `region`, `dashboard`, `gutter`, **`theme`**, `is-empty`, …)"* over **THE MODULE's source** — the row's own words: *"Over the MODULE's source (`src/shared/menu-template.ts`) INCLUDING its comments"* — and **the landed harness confirms that scope**: `tests/menu-template.test.ts` carries the token inside a `controlHits` corpus, i.e. as that row's positive control rather than as repo-wide vocabulary | **BANNED IN LAYER `menulib.md` FOR REASON "that module must carry no consumer vocabulary".** **LEGITIMATE HERE BECAUSE THIS MODULE'S IDENTIFIERS SIT OUTSIDE THAT SCAN'S SCOPE:** `R-1`'s sweep is **one path** (`src/shared/menu-template.ts`), so **`resolveTheme`'s name, this file's name, this module's bytes and `U-THEME`'s own tracker row are not that row's object** — and **`theme` is this unit's CHARTER word**: the ruling's name is `THEME-MECHANISM-AND-AUTHORED-CONTROL`, the ledger row is `U-THEME`, and the contract path `docs/specs/theme.md` is fixed by the handoff record's own `H-r4` list. **THE NARROW FORM THIS CONTRACT PINS: the token appears ONLY inside the identifier `resolveTheme` (and in this spec's own prose about that identifier); it NEVER appears as a token NAME, a token VALUE, an attribute name, a CSS literal or a second identifier** (`P-TH-1`). **BOTH CONTROLS: a module carrying `'dark'`/`'light'`/`'system'`, a `data-theme` literal or a second theme-name symbol FAILS `R-8`; the module carrying exactly the five declared bodies of `§2.1` item 5 PASSES.** |
| **2** | **`matchMedia`** | **BANNED EVERYWHERE, AND THE BAN IS UPHELD IN FULL — no exemption is declared for it, anywhere, by this unit.** The landed sites, each quoted: `H-r5`'s list (*"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam"*) · `SHIM-COMPLETION-CARVE-OUT` · `docs/specs/relocate.md` `§3.4 R-1`/**`R-2`** · `docs/specs/container.md` `§3.4 R-1`(g) · `docs/specs/gsession.md` `§1` item 3 / `I-13` / `R-2` · `docs/specs/gutter.md` `§3.4 R-2` · `docs/specs/listhost.md` `§2.2` · `docs/specs/projection.md` `§1` · **and `A-d6` itself**: *"no `matchMedia` (the OS reading is injected)"* | **BANNED EVERYWHERE FOR REALM-ACCESS AND CSS-RESOLUTION REASONS — AND THE BAN IS UPHELD.** **THIS UNIT NEVER NEEDS THE READING, SO THERE IS NOTHING TO RECONCILE AND NO EXEMPTION TO DECLARE — and that is the honest form: an exemption here would be a RELAXATION of a landed prohibition.** **The OS preference arrives as the INJECTED `env.prefersDark` member and the module compares it to one literal `true`** (`§2.3` item 2). **BOTH CONTROLS: a corpus reading `matchMedia` FAILS `R-2`/`R-7`; the module, which reads the injected member, PASSES.** |
| **3** | **`resolve` · `token`** | **OVERLOADED ACROSS SIBLINGS; NEITHER IS BANNED ANYWHERE.** `U-RELOCATE` (`docs/specs/relocate.md` `§2.1`/`§2.4`) owns **`resolveTarget`** — `RelocateTargetFor = (element, candidates, gesture) => unknown`, an **OPTIONAL caller seam** called at most once per observed move and **ABSORBED to `undefined`** when unusable. `U-CONTAINER` (`docs/specs/container.md` `§2.1`) owns **`tokensFor(chrome, tokenFn)`** and **`tokenFn`** — *"called EXACTLY ONCE per `tokensFor` invocation, with the chrome value"*. **And `token` is three senses in this family at once:** `zones.md`/`census.md`'s **track-token STRING**, `gutter-ui.md`'s **opaque axis TOKEN**, and `H-r8` prohibition 1's **banned consumer VOCABULARY token** | **NOT BANNED IN ANY LAYER; THE COLLISION IS SPELLING AND OVERLOAD, NOT CONFLICT.** **THIS UNIT DECLARES ITS OWN CONTRACT VOCABULARY AND ASSERTS NO IMPORT EDGE AND NO DUPLICATION:** `resolveTheme` is **NOT** `resolveTarget` — **no element, no gesture, no candidate set, no caller closure, no invocation count: it is a pure function of two arguments** — and **this unit owns NO `tokenFn`, NO `tokensFor` and NO token value of any kind** (`A-d6`: *"no token names/values"*). **BOTH CONTROLS: a reference to `resolveTarget`/`tokensFor`/`tokenFn` or to either sibling's surface FAILS `R-11`; a token NAMESPACE or a `'--`-shaped custom-property literal FAILS `R-8`; the module, which carries neither, PASSES both.** |

**THE SCAN ROWS' DECLARED EXEMPTIONS, NAMED HERE ONCE SO NO SCAN ROW IS VACUOUS** (`§4.4 S-TH-2`): **`R-1`'s
exemptions are this unit's own contract vocabulary — the two function names, the three type names, the six member
names of `ThemeResolution`/`ThemeAttributeWrite`/`ThemeEnv`, and the words `theme`, `setting`, `env`, `source`,
`attributeName`, `prefersDark`, `removal` AS IDENTIFIERS AND MEMBER NAMES** — **plus the five declared literal
bodies of `§2.1` item 5 as LITERALS** — **AND, NAMED EXPLICITLY AS THEIR OWN SUB-SET (`2026-09-27` amendment,
`§0A` note 7 item 4): the `typeof`-TAG BODIES `'string'` and `'object'` ARE PART OF `R-1`'s EXEMPT SET, because
`§2.1` item 5 fixes them as two of the five literal bodies the value rules REQUIRE** (`S-TH-7`; the
`docs/specs/container.md` `§0A` note 8.2 precedent) — **so `R-1`'s exemption list CARRIES them rather than leaving
them implied, and the row's scan can hold and still FAIL for a genuinely spelled token**; **`R-8`'s exemptions are
exactly those five bodies, NAMED.** **A scan row that does not name them is VACUOUS.**

**(D) THE SEMANTICS TABLE FOR EVERY IDENTIFIER THIS CONTRACT NAMES — and NONE of them is
`undefined-until-answered`.** **Every row states the identifier's REFERENT, its DOMAIN and its SOURCE, so no
TestWriter has to guess what a name means** (`H-3`'s rule, and the record's condition `C-2`).

| Identifier | What it IS (the referent) | Its domain (exactly) | Its source |
| --- | --- | --- | --- |
| **`resolveTheme`** | a **value export**: the pure, total appearance resolver | the input domain is **ANY `setting` value × ANY `env` value**; the return is **`ThemeResolution`** | caller — the module's own name (`A-d6`) |
| **`applyThemeDeclaration`** | a **value export**: the **declaration-only** applier — it **returns** the write it would perform and **performs none** | the input domain is **ANY `attributeName` value × ANY `resolved` value**; the return is **`ThemeAttributeWrite`** | caller — the module's own name (`A-d6`; the record's `Q2` pin) |
| **`ThemeResolution`** | a **type declaration**: the resolved record | **three members, declared order: `setting` · `prefersDark` · `source`** | caller — the record's step-3 derivation |
| **`ThemeAttributeWrite`** | a **type declaration**: the returned write | **three members, declared order: `name` · `value` · `removal`** | caller — the record's `Q2` pin; **the TYPE NAME is this filing's choice** (`§0A` note 2) |
| **`ThemeEnv`** | a **type declaration**: the caller's environment record | **exactly ONE member, `prefersDark: boolean`; a second member is a contract violation** | caller — `A-d6`'s own `env = { prefersDark: boolean }` |
| **`setting`** (the parameter) | **the CALLER's opaque appearance token** — never a value this mechanism mints | **ANY JavaScript value**; the module passes through only a **non-empty string** and yields `null` for every other shape | caller (`A-d6`: *"over an opaque `setting`"*) |
| **`setting`** (the resolved member) | **the carried token** | **`string \| null`** — the caller's own string BY IDENTITY, or the declared `null` | this contract — `§2.3` item 1 |
| **`env`** (the parameter) | **the CALLER's environment record** — never an OS this module reads | **ANY JavaScript value**; only an object with a `prefersDark` member that is strictly `true` reads `true` | caller (`A-d6`: *"an **injected** `env`"*) |
| **`prefersDark`** (the input member) | **a caller CLAIM about its own environment** | **`true` ONLY when strictly `=== true`; `false` for every other value, every missing member and every hostile env shape** | caller — `§2.3` item 2 |
| **`prefersDark`** (the resolved member) | **a REPORT of that reading**, and **NEVER the source of `setting`** | **a `boolean`** — `true` or `false` | this contract — `§2.3` item 2 |
| **`source`** | **the observable degradation** — the member that says whether the environment reading resolved or was absorbed | **a CLOSED two-member string domain: `'env'` \| `'degraded-env'`**; **its NAME IS RULED (`source` — the as-filed spelling was `basis`, `§0A` note 6: a RENAME ONLY, with the two bodies and the observability approved as filed)** (`§7a.1` item 2, CLOSED) | this contract — `§0A` notes 4/6; `A-2` (CLOSED BY THE RULING) |
| **`attributeName`** | **the CALLER's attribute name** — the mechanism may not own or document one | **ANY JavaScript value**; a **non-empty string** is echoed verbatim by identity and **every other shape reads `null`** | caller (`A-d6`: *"with the attribute NAME caller-supplied"*) |
| **`name`** (the returned member) | **the ECHOED attribute name** | **`string \| null`** — the caller's own string BY IDENTITY, or the declared `null` | this contract — `§2.4` item 1 |
| **`value`** (the returned member) | **the value the returned write would carry** | **a `string`** — the resolution's `setting` member, or the declared `''` **when and only when `removal` is `true`** | this contract — `§2.4` item 2 |
| **`removal`** | **the DECLARED discrimination of the removal case** — the `H-r7` `removeAttribute` class **represented as DATA and NEVER CALLED** | **a `boolean`**: `true` exactly when the resolved value was `null` or `''` | this contract — `§0A` note 2, `§2.4` item 2 |
| **`resolved`** (the applier's second parameter) | **the resolution's `setting` member, handed on by the consumer as the applier's argument** | **ANY JavaScript value**; **a non-empty string yields a non-removal write; `null`, `''` and every other shape yield the removal case** | caller — the applier's own arity (`§0A` note 2) |
| **`'env'` / `'degraded-env'`** | **the `source` domain's two bodies** | exactly those two strings, **and no third** | this contract — `§2.3` item 2's table |
| **the removal case `{name: <echoed>, value: '', removal: true}`** | **a DECLARED RETURN SHAPE, not a call** — the value a consumer would use to remove the attribute | a `ThemeAttributeWrite` whose `removal` is `true` and whose `value` is `''` | the record's `Q2` pin — `§0A` note 2 |
| **`U-THEME-CONTROL` / `F1`** | **the OTHER unit of `A-d6`'s adoption** — the AUTHORED appearance control | **not this module's subject in any respect**; **its own spec is `docs/specs/theme-control.md`, `OWED — not filed`** | caller — `A-d6`; **a reference to it inside this module FAILS `R-11`** |
| **`src/renderer/index.html`** | **the repo's EXISTING appearance authority** (`:root { color-scheme: light dark; }` plus hard-coded colours) | **not reachable by any value this unit returns**, and **DENIED to this unit's diff** | measured this pass (`§3.5 X-5`); **`F1`'s surface** |
| **the `matchMedia` token** | **the API this mechanism must NOT call** | **an absent spelling in this module's bytes** | ruling 2; `§2.2`(C) row 2 |

### 2.3 The value rules — stated falsifiably

**Item 1 — THE RESOLVER'S PASS-THROUGH RULE FOR `setting`, IN FULL (`A-1`'s DEFAULT; `§0A` note 4 labels every row
that depends on it).**

| Order | Condition (exact) | The `setting` member of the returned resolution |
| --- | --- | --- |
| **(a)** | `typeof setting === 'string'` **and** `setting !== ''` | **the CALLER'S OWN STRING, BY IDENTITY** (`toBe`) — **never parsed, never enumerated, never compared, never lower-cased, never trimmed and never validated against any vocabulary** |
| **(b)** | `typeof setting === 'string'` **and** `setting === ''` | **the declared `null`** — **the ABSENCE of a token, NEVER `''` and NEVER a fabricated default** |
| **(c)** | **otherwise** — `undefined` (omitted), `null`, a number, a boolean, a `Symbol`, a `12n`, an object, an array, a function, a hostile `Proxy`, a revoked `Proxy` | **the declared `null`**, with **NOTHING THROWN**; **and `String(setting)`, `setting.toString()` and `valueOf` ARE NEVER CALLED** |

**THE ONE OPERATION THE MODULE PERFORMS ON A `setting` IS A `typeof` TEST AND AN EMPTINESS TEST.** **A row that
requires a `String()` coercion of the setting — or of the attribute name — FAILS `§4.4 S-TH-4`'s class: a coercion
hook is a READ OF CALLER DATA AS A DECISION, and it is exactly the `S-ML-7`/`S-7` pattern the family forbids.**
**⚠ NOTE THE ONE PLACE THE WORDS *"`String()`-coerced only for a non-string"* APPEAR, and how this filing reads
them: the record's own sentence is about the RESOLVED DOMAIN's provenance, and every clause of it that is TESTABLE
lands in this table — a non-string setting CANNOT be coerced into a token without consulting `toString`, which the
same family's rows forbid.** **So this filing pins the table above as the reading, records the coarser sentence as
its provenance, and flags the difference at `§7a.1` item 1 rather than silently reconciling it.**

**Item 2 — THE ENVIRONMENT READING: CLOSED AT ONE MEMBER, STRICT `=== true`, ABSORBED PER MEMBER, NOTHING THROWING
(the record's `Q3` pin).** **THE DECLARED READING IS `env.prefersDark === true` — STRICT IDENTITY, NEVER
TRUTHINESS** — **and `source` is the observable that reports whether the reading resolved or was degraded.**

| # | The `env` shape (exact) | `prefersDark` | `source` | What is NOT done |
| --- | --- | --- | --- | --- |
| **(1)** | a plain object with `prefersDark: true` | **`true`** | **`'env'`** | — |
| **(2)** | a plain object with `prefersDark: false` | **`false`** | **`'env'`** | a `false` member is a **NORMAL READING**, not a degradation |
| **(3)** | the member **missing** | **`false`** | **`'degraded-env'`** | **no member is fabricated and no throw occurs** |
| **(4)** | the member present as **`undefined`** | **`false`** | **`'degraded-env'`** | — |
| **(5)** | `env` **omitted** (`undefined`), `null`, or a **non-object** (a number, a string, a boolean, a `Symbol`, a `12n`, a function) | **`false`** | **`'degraded-env'`** | **no coercion, no call, no throw** |
| **(6)** | the member is a **string** (`'true'`, `'false'`, `''`) | **`false`** — **a string is NEVER truthy-tested** | **`'degraded-env'`** | **a truthiness read would yield `true` for `'false'`; the strict read does not** |
| **(7)** | the member is a **number** (`1`, `0`, `NaN`, `-0`) | **`false`** | **`'degraded-env'`** | **`1` is the sharpest discriminator: truthiness says `true`, this contract says `false`** |
| **(8)** | the member is an object, an array or a function | **`false`** | **`'degraded-env'`** | — |
| **(9)** | `env` is **FROZEN** (`Object.freeze`) with `prefersDark: true` | **`true`** | **`'env'`** | **a frozen env is a NORMAL reading: freezing is not a degradation** |
| **(10)** | `env` carries a **THROWING ACCESSOR** at `prefersDark` | **`false`** | **`'degraded-env'`** | **the throw is CAUGHT and ABSORBED; NOTHING ESCAPES the call** |
| **(11)** | `env` is a **revoked `Proxy`** (or a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` trap **throws**) | **`false`** | **`'degraded-env'`** | **the trap's throw is ABSORBED, including the `TypeError` a revoked proxy raises on ANY access** |
| **(12)** | `env` is an object whose `prefersDark` member is an **inherited** value | **`false`** unless the member is an **OWN** `true` — **the read is BY OWN MEMBER, and an inherited `true` is NOT a reading** | **`'degraded-env'`** for the inherited case | **the own-member discipline, stated so the reading is not an ambient prototype walk** |
| **(13)** | `env` is a **NON-THROWING DIVERGING `Proxy`** — a `Proxy` that **does not throw** and whose **`get` answers `true`, whose `has` answers `true`**, **but whose `getOwnPropertyDescriptor` answers `undefined`** so **NO OWN `prefersDark` MEMBER IS EXPOSED** (the `F1` shape) **— or any other object whose traps likewise expose NO own member** | **`false`** — **the member is not read, because no own member exists to read** | **`'degraded-env'`** | **the value the traps' `get` would literally return is NOT read: this contract's reading is the OWN-member form, and a trap-only answer is not a member** |

**ITEMS (3) THROUGH (13) ARE ALL "ABSORBED PER MEMBER WITH NOTHING THROWING", AND `source` IS HOW THE DEGRADATION
BECOMES OBSERVABLE.** **A module that THROWS on any shape above FAILS `P-TH-TP-3`; a module that reads `1` or
`'false'` as `true` FAILS `P-TH-IM-2`; a module that reports `'env'` for a degraded reading FAILS the same row.**

**THE MEMBER-READ FORM IS PINNED, ONCE, IN ONE SENTENCE (`F1`'s contract disposition, `§0A` note 8 item 1): THE
MECHANISM READS THE MEMBER THROUGH ITS OWN-MEMBER FORM — an OWN DATA OR OWN ACCESSOR MEMBER ON THE OBJECT itself (the
reading this table's inherited-member obligation, row `(12)`, already implies) — SO AN OBJECT WHOSE TRAPS EXPOSE NO OWN
`prefersDark` MEMBER READS AS THE DECLARED DEGRADATION (`false`, `source: 'degraded-env'`) EVEN WHEN ITS TRAPS ANSWER
`true`, WHILE A CONTAINER CARRYING A GENUINE OWN MEMBER (`Object.assign([], {prefersDark: true})`, a `Map` with an own
member) READS **THAT MEMBER**.** **THE FALSIFIER, NAMED SO THE PIN IS FALSIFIABLE: A MODULE THAT READS A TRAP-ONLY
MEMBER AS `true` MUST FAIL — the row is `P-TH-TP-3`'s row `(13)` and the same shape is driven in `F-2`'s pool;
`§4.4 S-TH-4`'s read list already names this as the strict OWN-member test of `env.prefersDark`, so this pinning adds
NO read to the contract's declared read set.** **AND THE LANDED MODULE ALREADY CONFORMS — `src/shared/theme.ts` reads
`Object.getOwnPropertyDescriptor(env, 'prefersDark')` and declares the degradation when that descriptor is
`undefined`** (read this pass: the `F1` diverging `Proxy` reads `{prefersDark: false, source: 'degraded-env'}`, and
`Object.assign([], {prefersDark: true})` and a `Map` carrying an own member each read `true`) — **so NO MODULE FIX IS
OWED and no `F1` repair is parked here.**
**AND THE HONEST LIMIT, stated so no row overreaches: the `source` VALUE's SPELLING WAS `A-2`'s naming question**
(`§7a.1` item 2) — **the OBSERVABILITY is the contract, and THE SPELLING IS NOW RULED (`source`; the as-filed
spelling was `basis`) BY THE 2026-09-27 SPEC GATE** (`§0A` note 6).

**Item 3 — `prefersDark` IS A REPORT AND NEVER THE SOURCE OF `setting` (`Q1`'s derivation, `A-1`'s default).**
**THE MODULE APPLIES NO PRECEDENCE, NO OVERRIDE AND NO TRANSITION.** **`setting` and `prefersDark` are two
independent members of one record, and the module performs NO computation that relates them** — **so a row asserting
*"an explicit setting overrides the OS preference"*, or asserting a tri-state transition between an explicit and a
system state, is asserting a clause this contract does not contain and IS `§4.4 S-TH-4`'s class (`P-TH-10`).**

**Item 4 — THE RESOLVER IS TOTAL, AND ITS TOTALITY IS THE CONTRACT'S FOUNDATION.** **For EVERY input in the
declared `setting` and `env` domains (`§5.5.1`'s two domains and their pools), the returned value is a declared
`ThemeResolution` and NOTHING THROWS.** **A shape gate that refuses an input, a coercion that converts one, a
truthiness read and a throw on any member are each FAILURES.** **The pools are DECLARED EXTENTS, not the whole of
JavaScript's value space, and the `(bounded)` markings say so in their own cells.**

### 2.4 The applier's rules — the name-echo rule, the removal case as DATA, and never a call

**Item 1 — THE NAME-ECHO RULE (the record's `Q2` pin, carried exactly).**

| # | The `attributeName` argument (exact) | The returned `name` |
| --- | --- | --- |
| **(a)** | a **NON-EMPTY STRING** — including a whitespace-only string, a `data-`-shaped string, and any other spelling the CONSUMER chose | **the CALLER'S OWN STRING, BY IDENTITY** (`toBe`) — **echoed VERBATIM, never trimmed, never normalized, never parsed and never validated** |
| **(b)** | `''` (the empty string) | **the declared `null`** |
| **(c)** | a **NON-STRING** — a number, a boolean, a `Symbol`, a `12n`, an object, an array, a function, a hostile `Proxy` | **the declared `null`**, and **`String(attributeName)`, `attributeName.toString()` and `valueOf` ARE NEVER CONSULTED for the name** |
| **(d)** | **omitted** (`undefined`) or explicitly `null` | **the declared `null`** |

**THE FALSIFIABLE HALF, STATED SO A ROW CAN FAIL: a module that TRIMS, that lower-cases, that prefixes, that
defaults a MISSING name to an attribute of its own, or that CONSULTS an object's `toString` for the name FAILS
`P-TH-IM-3`; and a module that COERCES a number into a string name FAILS it too.** **The whitespace-only case is
deliberately INSIDE the echoed arm: `' '` is a non-empty string the consumer supplied, and this mechanism has no
basis on which to rule it invalid.**

**Item 2 — THE REMOVAL CASE IS DATA, AND `removal` IS THE DISCRIMINATION (`§0A` note 2).**

| # | The `resolved` argument (exact) | The returned `ThemeAttributeWrite` |
| --- | --- | --- |
| **(a)** | a **non-empty string** | **`{name: <echoed>, value: <the resolved string BY IDENTITY>, removal: false}`** |
| **(b)** | `''` | **`{name: <echoed>, value: '', removal: true}`** — **THE REMOVAL CASE** |
| **(c)** | `null`, `undefined` (omitted), or **any other non-string** (a number, a `Symbol`, a `12n`, an object, an array, a function, a hostile `Proxy`) | **`{name: <echoed>, value: '', removal: true}`** — **THE SAME DECLARED REMOVAL CASE, with NO throw, NO coercion and NO fabricated value** |

**THE TWO INDEPENDENT MEMBERS ARE INDEPENDENT: the `name` rule (`§2.4` item 1) and the `removal` rule above are
driven by DIFFERENT arguments, so a row that couples them — *"a removal always has `name: null`"*, or *"a `null`
name implies a removal"* — is asserting a clause this contract does not contain.** **THE COMPOSED SHAPE A
TESTWRITER MUST DRIVE, stated once: `applyThemeDeclaration('data-x', resolveTheme('dark', {prefersDark: false}).setting)`
⇒ `{name: 'data-x', value: 'dark', removal: false}`, and `applyThemeDeclaration('data-x', resolveTheme('', {}).setting)`
⇒ `{name: 'data-x', value: '', removal: true}`.**

**Item 3 — THE APPLIER PERFORMS NO WRITE, AND THE `H-r7` CLASS IS NEVER CALLED.** **The applier issues NO
`setAttribute`, NO `removeAttribute`, NO `classList`, NO `style`/`setProperty`, NO element access and NO realm read
— and it takes **no element parameter at all**. **The removal case is a DATA MEMBER (`removal: true`), and that is
the only form in which this unit represents the `H-r7` `removeAttribute` class.** **BOTH CONTROLS, stated so the
row is non-vacuous: a module that CALLS `removeAttribute` on any object — including on a recording fake element —
FAILS `R-2`; the module, which returns the record, PASSES it.** **THE CONSEQUENCE FOR THE LAYER STORY: this unit
needs NO shim member, so the `H-r7` carve-out is untouched by it, and gate 6 stays `STRUCTURAL` for a second,
independent reason** (`§5.2`).

**Item 4 — THE RETURNED RECORDS ARE FRESH, PLAIN AND FROZEN-FREE.** **Each call returns a NEW record** (a repeated
call with the same arguments returns an **equal but distinct** object), **its prototype is `Object.prototype`, no
member is a getter, and nothing is frozen or sealed** — **so a row that asserts a `toBe` between two calls' records
FAILS by design, and the correct assertion is `toEqual` plus a distinct-identity pairwise check** (`P-TH-SM-2`).
**`Object.keys` on either record reads its THREE declared names IN DECLARED ORDER, and a fourth member FAILS.**

### 2.5 The composition boundary

**Item 1 — WHAT THE MODULE MAY READ, AND NOTHING ELSE.** **`setting` is read by `typeof` and by emptiness
only**; **`env` is read for ONE OWN member under the strict rule**; **`attributeName` is read by `typeof` and by
emptiness only**; and **`resolved` is read by `typeof` and by emptiness only.** **A record read is a TOTAL read: a
hostile holder, an absent member, an inherited member or a THROWING accessor yields "degraded" rather than an
exception** (`§2.3` item 2). **Consequence: the caller's own objects MAY BE MUTATED between calls without changing
any contract claim; the module never writes to them and never retains them.**

**Item 2 — WHAT THE MODULE OWNS, AND WHAT IT DOES NOT.** **The module OWNS: the two function names, the three type
names, the six member names of its two records, and the five declared literal bodies (`§2.1` item 5).** **It owns
NOTHING ELSE** — no token name, no token value, no attribute name, no CSS, no stylesheet, no control, no store, no
default, no precedence and no element. **The token vocabulary is the CALLER's; the attribute name is the CALLER's;
the environment claim is the CALLER's; the stylesheet is the CONSUMER's.**

**Item 3 — THE `F1` BOUNDARY, STATED AS A NO-EDGE BOUNDARY.** **`U-THEME-CONTROL` (`F1`) is the OTHER unit of
`A-d6`'s adoption: an AUTHORED provident appearance control in the demo envelope, dispatchable and MCP-visible
through the EXISTING tools.** **THIS MODULE DOES NOT IMPLEMENT IT, RENDER IT, WIRE IT, DISPATCH IT, MOUNT IT,
PERSIST IT, IMPORT IT OR ASSERT ANY DEPENDENCY ON IT** — and **`F1` is BLOCKED ON this unit as a TRACKER ORDERING,
which is not an import edge and not a composition.** **A pass asserting an edge between the two units — in either
direction — is asserting a FABRICATED EDGE** (`H-r6`'s dissolved-edge class; `§4.4 S-TH-9`).
**AND THE COROLLARY STEP 4 RECORDED, CARRIED VERBATIM IN SUBSTANCE: `§5.1`'s denial is a SCOPE PROHIBITION ON WHAT
THIS UNIT WRITES — a later `F1` pass LAWFULLY importing this module must NOT be read as falsifying `U-THEME`.**
**The denial binds this unit's own diff; it does not declare the module permanently importer-less.**

**Item 4 — THE COMPOSITION BOUNDARY, AND THE SIBLINGS THIS UNIT DOES NOT COMPOSE.** **This module composes
NOTHING**: it imports no sibling (`§2.1` item 3), it is imported by no `src/**` file (`§3.5 X-1`), it names no
session, **and `docs/specs/gsession.md` `§2.5`'s frozen delegate surface has no referent here** — **it is named in
this file for exactly one purpose: so that a later pass CANNOT read this unit as composing it.** **A pass asserting
ANY composition or import edge between this unit and any sibling, in either direction, is a FABRICATED EDGE and a
`§4.4 S-TH-9` STOP.**

**Item 5 — THE ENTRY-POINT PATH QUESTION, ANSWERED (`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`).** **DOES THE
ALLOWED FILE SET CONTAIN A PATH FROM THE APPLICATION'S ENTRY POINT TO THIS MECHANISM? — NO, AND THAT IS THE
DERIVATION'S OWN RESULT, NOT AN INHERITED COPY.** **Because `§5.1`'s allow-list contains ONE production path
(`src/shared/theme.ts`) and NO `src/**` edit, no `src/renderer/**` path, no `src/main/**` path and no demo-envelope
path can reach it** — **so the mechanism has NO importer, NO rendered surface and NO in-app instantiation site**
(`§5.2`'s structural refusal). **AND THE SECOND FACT, WHICH IS WHY THE ANSWER MATTERS HERE: the repo's EXISTING
appearance authority (`src/renderer/index.html`) is REACHED BY NOTHING THIS UNIT RETURNS** (`CURRENT STATE` item
10) — **so this unit neither consumes nor competes with the authority that exists.**

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]** the
divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row, and every row is a
contract row for the TestWriter; none is a measurement this pass took.** **Every row carries an id and a `Pinned
by` citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The resolver returns the three-member resolution, and the top-level member census is EXACTLY three names** | `resolveTheme('dark', { prefersDark: true })`, then `Object.keys(resolution)` | **`Object.keys(resolution)` deep-equals `['setting','prefersDark','source']`** in that order; **`resolution.setting === 'dark'`** and it **IS the caller's own string BY IDENTITY (`toBe`)**; **`resolution.prefersDark === true`**; **`resolution.source === 'env'`**; **`Object.getPrototypeOf(resolution) === Object.prototype`** and no member is a getter; **NOTHING THROWS** | `§2.1` items 1/2, `§2.3` items 1/2, `P-TH-IM-1` | `[T]` |
| **M-2** | **The pass-through is EXACT — the caller's token is carried and NOTHING is interpreted** | `resolveTheme` over a set of caller tokens that include a token this mechanism could plausibly "recognize" (`'dark'`, `'light'`, `'system'`, `'DARK'`, `' dark '`, a 200-character token, a token containing `-` and `_`) | **each returns ITS OWN token, character for character, by identity**; **`'DARK'` is NOT folded, `' dark '` is NOT trimmed, and `'system'` is NOT treated as any kind of third state**; **`source` is `'env'` in every drive** | `§2.3` item 1(a), `§2.3` item 3, `§2.2` `P-TH-1` | `[T]` |
| **M-3** | **The environment reading is STRICT and the report is independent of the token** | (a) `resolveTheme('dark', { prefersDark: false })`; (b) `resolveTheme('light', { prefersDark: true })`; (c) `resolveTheme('x', {})`; (d) `resolveTheme('x', { prefersDark: 1 })` | **(a) `prefersDark === false` and `source === 'env'`** (a `false` member is a NORMAL reading, not a degradation); **(b) `prefersDark === true`**; **(c) `prefersDark === false` and `source === 'degraded-env'`**; **(d) `prefersDark === false` and `source === 'degraded-env'`** — **the number `1` is NOT read as `true`**; **(a)/(b)'s `setting` members are their own tokens by identity, unaffected by the environment** | `§2.3` item 2, `§2.3` item 3, `P-TH-IM-2` | `[T]` |
| **M-4** | **The applier returns the write record, and the top-level member census is EXACTLY three names** | `applyThemeDeclaration('data-x', 'dark')`, then `Object.keys(write)` | **`Object.keys(write)` deep-equals `['name','value','removal']`** in that order; **`write.name === 'data-x'` BY IDENTITY**; **`write.value === 'dark'` BY IDENTITY**; **`write.removal === false`**; **the three members are a `string \| null` and two `boolean`/`string` as declared**; **NOTHING THROWS**; **and NO element, attribute or class was touched anywhere in the drive** | `§2.1` items 1/2, `§2.4` items 1/2/4, `P-TH-IM-3` | `[T]` |
| **M-5** | **THE REMOVAL CASE IS RETURNED AS DATA — for both triggers, and with the name echoed** | (a) `applyThemeDeclaration('data-x', '')`; (b) `applyThemeDeclaration('data-x', null)`; (c) `applyThemeDeclaration('data-x', resolveTheme('', {}).setting)`; (d) `applyThemeDeclaration('data-x', undefined)` | **every one returns `{name: 'data-x', value: '', removal: true}`** — **the name ECHOED, the value the declared `''`, and `removal` `true`**; **NOTHING THROWS**; **and `removeAttribute` is NOT called on anything** (the drive passes NO element at all) | `§0A` note 2, `§2.4` item 2, `P-TH-IM-4` | `[T]` |
| **M-6** | **THE NAME ECHOES VERBATIM, and the empty/non-string arms are separate observables** | (a) `applyThemeDeclaration('data-x', 'dark')`; (b) `' class '` (whitespace-padded); (c) `''`; (d) `42`; (e) `null`; (f) the argument OMITTED; (g) an object carrying its own `toString` | **(a)/(b) echo the caller's own string BY IDENTITY, untrimmed and untransformed**; **(c)–(f) each read `name: null`**; **(g) reads `name: null` AND its `toString` is NOT invoked** (the drive records invocation counts of `toString` and `valueOf` on the argument and asserts `0` for both); **NOTHING THROWS in any drive** | `§0A` note 2, `§2.4` item 1, `P-TH-IM-3` | `[T]` |
| **M-7** | **The whole surface is reachable and returns its declared shapes in ONE composition** | a single drive that imports the module and calls both exports in sequence with a conformant caller set, chaining the resolver's `setting` member into the applier | **`resolveTheme` ⇒ the three-member resolution; `applyThemeDeclaration` ⇒ the three-member write; NOTHING THROWS; the drive's own totals read `2` records of `3` members each, `1` returned removal `false`, and `0` element accesses** | `§2.1` items 1/2, `§3.4 R-5`, `P-TH-TP-6` | `[T]` |

**A NOTE ON WHAT MAKES THESE ROWS NON-VACUOUS.** **`M-1`/`M-4` are the member CENSUS rows and each DRIVES a
key-set reading, not a prose claim** (`§4.4 S-TH-6`); **`M-2` is the row a *"member-pool"* implementation FAILS,
because such an implementation cannot return `' dark '` or `'DARK'` unchanged** (`A-1`'s discriminator); **`M-3`(d)
is the row a truthiness implementation FAILS**; **`M-5` is the row a *"removal is an absent member"*
implementation FAILS**; and **`M-6`(g) is the row a `String()`-coercing implementation FAILS.**

### 3.2 Documented fail-states / non-happy states

**NOTE THE SHAPE: this unit has NO REFUSAL DOMAIN — every outcome below is a VALUE, not an error, and there is no
`ok`/`code`/`reason`/`thrown` anywhere in this contract** (`§2.1` item 2, `§4.4 S-TH-3`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **AN UNUSABLE SETTING — the pass-through's whole outside, driven in full** | `setting` = omitted · `null` · `''` · `0` · `-0` · `NaN` · `false` · `true` · a `Symbol` · `12n` · `{}` · `Object.create(null)` · `[]` · a `Map` · a function · a revoked `Proxy` · a trap-throwing `Proxy` · an object with a THROWING `toString` | **every drive returns `setting: null`**; **`String()`, `toString` and `valueOf` are NOT invoked** (recorded counts `0` where the object has them); **`source`/`prefersDark` are unaffected by the `setting` shape**; **NOTHING THROWS; no default token, no `''` token and no sentinel appears** | `§2.3` item 1(c)/4, `P-TH-IM-1`/`P-TH-TP-1` | `[T]` |
| **F-2** | **A HOSTILE ENVIRONMENT — the whole hostile-shape table as its own row** | `env` = omitted · `null` · `42` · `'x'` · `true` · a `Symbol` · `12n` · `{}` (member MISSING) · `{prefersDark: undefined}` · `{prefersDark: 'true'}` · `{prefersDark: 'false'}` · `{prefersDark: 1}` · `{prefersDark: 0}` · `{prefersDark: NaN}` · `{prefersDark: []}` · `{prefersDark: {}}` · a FROZEN `{prefersDark: true}` · a record whose `prefersDark` accessor THROWS · a revoked `Proxy` · a trap-throwing `Proxy` · an object whose `prefersDark` is INHERITED · **a NON-THROWING DIVERGING `Proxy`** (`get` ⇒ `true`, `has` ⇒ `true`, `getOwnPropertyDescriptor` ⇒ `undefined`: **the `F1` shape — its `get` answer is NOT a member**, `§2.3` item 2 row `(13)`) · **a CONTAINER with a GENUINE own member** (`Object.assign([], {prefersDark: true})`, and a `Map` likewise — **these read the own member, so they are the row's `true`/`'env'` arms and NOT hostiles**) | **every shape lands in the declared pair of the `§2.3` item 2 table: `false` + `'degraded-env'` for every hostile shape — the diverging `Proxy` included, which reads the DECLARED DEGRADATION and NEVER the `true` its `get` would answer — EXCEPT the FROZEN `true` case, which reads `true` + `'env'`, AND the two containers with a GENUINE own member, which read `true` + `'env'`**; **NOTHING THROWS in any drive, the revoked `Proxy`'s `TypeError` included**; **and no member is fabricated.** **THE INVERSION, NAMED AS THE FALSIFIER: a module that reads the diverging `Proxy` as `true` FAILS this row** (`§0A` note 8 item 1) | `§2.3` item 2 (all thirteen rows), `P-TH-IM-2`/`P-TH-TP-3` | `[T]` |
| **F-3** | **THE NON-REMOVAL / REMOVAL SPLIT, driven from both sides by `resolved`** | `applyThemeDeclaration('data-x', resolved)` for `resolved` = `'dark'` · `'0'` · `'false'` · `' '` (a whitespace-only string) · `''` · `null` · `undefined` · `42` · a `Symbol` · an object | **the three non-empty STRINGS (`'dark'`, `'0'`, `'false'`, `' '`) return `removal: false` with their own value by identity — note `'false'` is a LEGAL TOKEN and must NOT be read as a boolean**; **`''`, `null`, `undefined`, `42`, a `Symbol` and an object return the REMOVAL case `{value: '', removal: true}`**; **NOTHING THROWS** | `§2.4` item 2, `P-TH-IM-4`/`P-TH-TP-4` | `[T]` |
| **F-4** | **AN UNUSABLE ATTRIBUTE NAME, and the independence of the two arguments** | `applyThemeDeclaration(attributeName, 'dark')` for `attributeName` = `''` · omitted · `null` · `42` · `true` · a `Symbol` · `12n` · `{}` · `[]` · a function · a revoked `Proxy`; **and the CROSSED drives** `applyThemeDeclaration('', '')` and `applyThemeDeclaration('data-x', '')` | **every unusable name reads `name: null` WITHOUT throwing**; **the CROSSED drives prove the independence the contract pins: `('', '')` reads `{name: null, value: '', removal: true}` while `('data-x', '')` reads `{name: 'data-x', value: '', removal: true}`** — **so a removal with an echoed name is a NORMAL return, not a contradiction** | `§2.4` items 1/2, `P-TH-IM-3`/`P-TH-TP-4` | `[T]` |
| **F-5** | **THE COMPOSED PATH, DRIVEN END TO END — the row that ties the two functions together** | `applyThemeDeclaration(name, resolveTheme(setting, env).setting)` over the cross-product of: `setting` ∈ {a token, `''`, `null`, `42`} × `env` ∈ {`{prefersDark: true}`, `{}`, a throwing accessor} × `name` ∈ {`'data-x'`, `''`} | **every cell returns a declared `ThemeAttributeWrite` with the `name` from the name rule and the `removal` from the resolved value** — **so `('' , resolveTheme('dark', {}).setting)` reads `{name: null, value: 'dark', removal: false}` while `('data-x', resolveTheme(null, {}).setting)` reads `{name: 'data-x', value: '', removal: true}`**; **NOTHING THROWS in any cell, the throwing-accessor env included** | `§2.1` item 2, `§2.3` items 1/2, `§2.4` items 1/2, `P-TH-TP-4`/`P-TH-TP-6` | `[T]` |
| **F-6** | **THE NO-WRITE / NO-DOM CONTROL — a positive control that MUST FAIL the row it is attached to** | a corpus (NOT the module) that (a) calls `removeAttribute` on a recording fake element; (b) calls `setAttribute`; (c) writes `classList`/`style`; (d) reads `matchMedia`; (e) reads `document`/`window` | **the ROWS FAIL for all five shapes**: the drive demonstrates that `§3.4 R-2`'s no-DOM/no-write scan and `R-7`'s no-ambient-read row **catch every one of them**; **a scan that passes for any of the five is UNFALSIFIED and must not be filed** (`§4.4 S-TH-2`) | `§2.4` item 3, `§3.4 R-2`/`R-7`, `§4.4 S-TH-2` | static |
| **F-7** | **THE IMPORT-CLASS CONTROL — a positive control that MUST FAIL** | a corpus module carrying exactly one import statement of ANY path — including `import type { GestureHandle } from './gesture-session.js'`, `import { tokensFor } from './container.js'` and `import { createOwnedListHost } from './owned-list-host.js'` | **the row FAILS**, and the three named forms are the SPECIFIC positive controls because they are the three imports a spec writer is most tempted to add (`§2.1` item 3, `§2.5` item 4) | `§2.1` item 3, `§3.4 R-4`, `§4.4 S-TH-9` | static |
| **F-8** | **A SECOND CALL'S INDEPENDENCE — no retention, no cache, no drift, and FRESH records each call** | five repeated calls of each export with the SAME arguments, each call's return value compared against the first | **every repeated call returns an EQUAL value (`toEqual`)**; **each returned RECORD is a DISTINCT OBJECT** (pairwise `!==` over distinct indices, `P-TH-SM-2`); **the resolved `setting` member is the caller's own token by identity in every call**; **and no observable state differs between the first and the fifth call** | `§2.5` items 1/2, `§2.4` item 4, `P-TH-SM-2`, `I-3` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **NO ENTRY POINT THROWS, FOR ANY ARGUMENT** — an unusable setting, an unusable env, an unusable name, a throwing accessor and a revoked `Proxy` each produce a DECLARED VALUE | `A-d6`'s own words — *"`undefined`/`null`/number/unknown-string/frozen-env all yield a resolvable member, **never a throw**"* — plus the family's totality discipline; **a throw would be a refusal domain this contract does not have** | `§2.1` item 2, `§2.3` items 1/2/4, `§2.4` items 1/2, `P-TH-TP-1`/`P-TH-TP-3` |
| **I-2** | **THE ENVIRONMENT READING IS STRICT AND IT IS A REPORT, NEVER A SOURCE** — `prefersDark` is `true` exactly when the single closed member is strictly `true`, and it never determines `setting` | `A-d6`'s `env = { prefersDark: boolean }` is a **`boolean`**, not a truthy value; and the mechanism owns no vocabulary with which to translate the reading into a token | `§2.3` items 2/3, `§2.2` `P-TH-10`, `P-TH-IM-2` |
| **I-3** | **THE RETURNED RECORDS' MEMBER CENSUS IS EXACTLY THE DECLARED ONE** — three members on `ThemeResolution` (`setting`, `prefersDark`, `source`), three on `ThemeAttributeWrite` (`name`, `value`, `removal`), in declared order, **and each returned record is a FRESH plain object** | a consumer reads the shape, and a phantom or a missing member is unreadable; and the freshness half is what keeps the mechanism stateless | `§2.1` items 1/2, `§2.4` item 4, `M-1`/`M-4`, `P-TH-IM-1`/`P-TH-SM-2` |
| **I-4** | **NO STORE, NO CACHE, NO MODULE-LEVEL MUTABLE STATE, AND NOTHING RETAINED ACROSS CALLS** — the module holds no value between invocations, writes no file, and returns declared values each call. **`S-d4` IS INTACT AND PERSISTENCE STAYS CONSUMER-SIDE** **⟶ READ BESIDE 2026-10-03 (the `H2b` gate-4 landing pass; `docs/specs/store-modules-seams.md` `§2.7` item 7's amendment set, `RCA-8(d)` — the as-filed invariant above is KEPT VISIBLE and is NOT rewritten): THE INVARIANT'S FORCE IS THE MODULE'S OWN BYTES — `theme.ts` still holds no value between invocations, writes no file, imports NOTHING (the EMPTY IMPORT CENSUS, THE FLAG ROW, re-verified by `P-SMS-TH-IM-1`) and returns declared values each call; the STORE read of `file.settings.theme.token` lives at the CALLER file `src/renderer/theme-store.ts` (`store-modules-seams.md` `§2.3`), which passes the value as `resolveTheme(setting, env)`'s parameter — so the module's answers remain functions of the passed `setting`/`env`, never of store state (`P-SMS-TH-TP-1`).** | `A-d6`'s persistence boundary (ruling 3) and prohibition 4; **this unit is exactly where a store would be most tempting, which is why the boundary is stated at this unit** — **the temptation is answered AT THE CALLER, not in the module's bytes** | `§2.2` `P-TH-4`/`P-TH-11`, `§3.2 F-8`, `§3.4 R-3`, `P-TH-SM-2` |
| **I-5** | **THE MECHANISM DECIDES NO POLICY** — no default token, no default attribute name, no default state, no fallback vocabulary, no precedence and no transition; **and it carries every caller value it carries VERBATIM** | `A-d6`'s *"no token names/values"* plus `(C)#3`'s prohibition; **the declared `null`/`false`/`''` values are ABSENCES, never policies** | `§2.2` `P-TH-3`/`P-TH-10`, `§2.3` items 1/3, `P-TH-TP-1`/`P-TH-TP-2` |
| **I-6** | **THE MECHANISM AUTHORS NO UI CONTENT AND PERFORMS NO WRITE** — no element, no attribute write, no class, no text, no style, no node, no stylesheet and no rule; **`returned` is not `written`** | `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test; `UI-RENDERED-WITH-PROVIDENT` has **no element** here to apply to | `§2.2` `P-TH-2`/`P-TH-9`, `§2.4` item 3, `§3.4 R-2` |
| **I-7** | **NO OS CLAIM AND NO AMBIENT READ, EVER: no row of this unit may assert that an OS preference was read, that a media query matched, that an attribute was applied, that a stylesheet reacted or that the app looks different** — **every claim is data-in/data-out and falsifiable in the node suite** | `A-d6`'s *"no `matchMedia` (the OS reading is injected)"* and the layer anchors 1/5 | `§2.3` item 2, `§3.4 R-7`/`R-9`, `§5.2`, `§7` item 2 |
| **I-8** | **NO IMPORT EDGE IN EITHER DIRECTION, AND NONE FABRICATED — INCLUDING TO `F1`** — the module imports nothing, is imported by no `src/**` file, and **no sibling's and no control unit's surface is composed, re-expressed or asserted as an edge** | the `H-r6` dissolved-edge class; `A-d6`'s two-unit split | `§2.1` item 3, `§2.5` items 3/4, `§3.4 R-4`/`R-11` |
| **I-9** | **NO STORE, NO PERSISTENCE, NO MCP SURFACE, NO SHIM MEMBER, NO `electron`/`node:*` IMPORT, NO NEW DEPENDENCY, NO SCRIPT** — no tool, no resource, no group, no `RpcMethod`, no `MUTATING_METHODS` entry, no IPC method, and **`src/shared/dom-shim.ts` gains no member** | prohibitions 4/5/6; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`; `SHIM-COMPLETION-CARVE-OUT`; `AGENTS.md` item 11(d) | `§2.2` `P-TH-5`/`P-TH-6`, `§3.4 R-3`/`R-4` |
| **I-10** | **THE DECLARED DEGENERATE VALUES ARE `null` (an unusable setting, an unusable name), `false` (an unusable environment reading) AND `''` (the removal case's value) — AND THEY ARE THE ONLY DEGENERATE VALUES IN THE CONTRACT** | prohibition 3's absence discipline: each is the **absence of a value the module would otherwise have to fabricate**, names nothing, and cannot be mistaken for a caller value | `§2.3` items 1/2, `§2.4` item 2, `M-3`/`M-5`, `P-TH-TP-1`/`P-TH-TP-3` |
| **I-11** | **`[U]` IS NOT OFFERED AND `[D]` IS NOT CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL** | `§5.2`; `docs/specs/zones.md` `§4.4 S-6` | `§5.2`, `§3.4 R-7`/`R-9`, `§7` item 4 |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its twelve
prohibitions**. **A prohibition citing *"a static source row"* with no id is not a row** (the sibling reviews'
recurring finding), so **every static claim in this file has an id here**, and **each scan is closed against the
evasion class (token assembly, comment-carrying, realm-rooted computed access) by `§4.4 S-TH-2`.** **Every row here
is `static`-layer: it reads this unit's own FILES or drives an injected argument, never a real DOM and never a real
OS.**

**THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY ROW BELOW INHERITS IT** (`S-TH-2`): every scan reads a
**NORMALIZED view** in which **string-literal concatenation is JOINED** (`'dar' + 'k'` reads as one literal) **and
COMMENTS ARE SCANNED AS CODE** — so a banned token in a comment, in a fragment-assembled literal, or in a template
hole **FAILS as if it were spelled plainly**. **THE ORDER IS NOT FREE: THE JOIN RUNS BEFORE QUOTES ARE STRIPPED**,
because a view that strips quotes first can no longer see the `'…' + '…'` boundary the joiner needs — **so an
assembly-evasion control run against a strip-then-join view is UNFALSIFIED WHILE LOOKING GREEN** (the
`docs/specs/container.md` `§3.4` dated method note, carried here as contract).

| id | Row (a TestWriter authors this) | Its DECLARED EXEMPTIONS, and both controls | Pinned by | Layer |
| --- | --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (`P-TH-1`, `P-TH-3`, `P-TH-10`).** *Over the MODULE's source (`src/shared/theme.ts`) INCLUDING its comments and in the normalized view, no occurrence, in any form, of:* **(a)** a TOKEN NAME OR TOKEN VALUE literal (`'light'`, `'dark'`, `'system'`, `'auto'`, `'color-scheme'`, `'prefers-color-scheme'`, a `--`-shaped custom-property literal, a token namespace); **(b)** an ATTRIBUTE-NAME literal (`'data-theme'`, `'data-*'`, `'class'`, `'className'`, `'style'`); **(c)** a consumer-vocabulary token (`zone`, `pane`, `tab`, `region`, `dashboard`, `gutter`, `menu`, `catalog`, `is-empty`, `is-minimized`, `is-revealed`, `census`, `trackProp`); **(d)** a store token (`localStorage`, `sessionStorage`, `indexedDB`, `store`, `cache`, `memo`, `persist`, `journal`); **(e)** a realm/ambient token (`document`, `window`, `navigator`, `globalThis`, `self`, `matchMedia`, `prefers-color-scheme`, `getComputedStyle`, `getBoundingClientRect`, `activeElement`, `process.env`, `process.platform`, `os.platform`, `eval`, `new Function`, and the `globalThis[`-style computed realm access); **(f)** a selector or DOM-write token (`querySelector`, `querySelectorAll`, `closest`, `getElementById`, `createElement`, `innerHTML`, `outerHTML`, `textContent`, `classList`, `appendChild`, `setAttribute`, `removeAttribute`, `setProperty`, `style.`, `focus(`).* | **THE DECLARED EXEMPTIONS, NAMED — a scan row that does not name them is VACUOUS (`S-TH-2`):** **this unit's own contract vocabulary, AS IDENTIFIERS AND MEMBER NAMES** — `resolveTheme`, `applyThemeDeclaration`, `ThemeResolution`, `ThemeAttributeWrite`, `ThemeEnv`, and the members `setting`, `prefersDark`, `source`, `name`, `value`, `removal`, `attributeName`, `resolved`, plus the word `theme` **as part of `resolveTheme`** — **and the FIVE declared literal bodies of `§2.1` item 5** (`''`, `'env'`, `'degraded-env'`, `'string'`, `'object'`) **— OF WHICH THE `typeof`-TAG SUB-SET IS NAMED HERE EXPLICITLY: `'string'` and `'object'` are PART OF THE EXEMPT SET, because `§2.1` item 5 fixes them as two of the five literal bodies the value rules REQUIRE, and a row that omitted them would redden the conformant module** (`S-TH-7`; `container.md` `§0A` note 8.2's precedent). **BOTH CONTROLS: (i) a corpus carrying `const t = 'dark'`, a `'data-theme'` literal or a `matchMedia` reference FAILS; (ii) the module, carrying exactly the declared vocabulary and the five bodies, PASSES.** **AND THE VACUITY WARNING, carried because it is the row's likeliest failure: a scan asserting *"the module contains no `theme` token at all"* is UNFALSIFIED — the module's own two exported names contain it** (`§2.2`(C) row 1). | `P-TH-1`/`P-TH-3`/`P-TH-10`, `§2.1` item 5, `§2.2`(C) row 1 | static |
| **R-2** | **THE NO-DOM / NO-WRITE / NO-OS-CALL ROW (`P-TH-2`, `P-TH-9`, `P-TH-11`; `I-6`, `I-7`).** *Over the MODULE's source and over this unit's own `[T]` test file, the change set contains **no `setAttribute` / `removeAttribute` / `classList` / `setProperty` / `style` write or read, no attribute write of any kind, no `createElement`, no node creation, no `document`/`window` access, no `matchMedia` reference, no media-query subscription, no stylesheet or CSS rule text, no file or console write, and NO ELEMENT PARAMETER anywhere in the module's surface**.* **ITS FALSIFIABLE HALF: any of the above FAILS, and the `F-6` corpus is the positive control.** | **no exemptions** — the row bans the whole class; **both controls: (i) the `F-6` corpus (a `removeAttribute` call, a `setAttribute` call, a `classList` write, a `matchMedia` read, a `document` read) FAILS; (ii) the module, which contains none of them, PASSES** | `P-TH-2`/`P-TH-9`/`P-TH-11`, `§2.4` item 3, `§3.2 F-6` | static + `[T]` |
| **R-3** | **The NO-SHIM / NO-NEW-SURFACE / NO-STORE / NO-PERSISTENCE ROW (`P-TH-4`, `P-TH-5`, `P-TH-6`; `I-4`, `I-9`).** *`src/shared/dom-shim.ts` is byte-identical before and after; no `scripts/**` file changes; no config file changes; no `package.json`/`package-lock.json` change; no new dependency or devDependency; no MCP registration site changes; and no store, no persistence channel and no journal is added anywhere.* **A shim member addition, a new `scripts` key, a config edit, a `package.json` change or a persistence channel FAILS.** **THE MCP NEGATIVES ARE ASSERTED AS SET EQUALITY AGAINST THE NAMES, never as a count quoted here** (`S-TH-6`) | **none** | `P-TH-4`/`P-TH-5`/`P-TH-6`, `I-4`/`I-9`, `§5.1`, `AGENTS.md` item 11(d) | static |
| **R-4** | **The IMPORT-BOUNDARY row (`P-TH-12`; `I-8`, `I-9`).** *`src/shared/theme.ts` contains ZERO import statements — no value import, no type-only import, no dynamic `import(`, no `require(`.* **ANY import statement of ANY path FAILS, and THREE forms are the NAMED positive controls: `import type { GestureHandle } from './gesture-session.js'` (the frozen-session type a spec writer is most tempted to borrow), `import { tokensFor } from './container.js'` (the sibling whose name is the nearest overload — `§2.2`(C) row 3) and `import { createOwnedListHost } from './owned-list-host.js'`.** | **none** | `P-TH-12`, `§2.1` item 3, `§3.2 F-7` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/theme.ts` exports EXACTLY the five names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `resolveTheme` and `applyThemeDeclaration`** (read from the imported namespace's own keys **by name**, with a **positive control** that a namespace carrying a **THIRD** value export FAILS); **(b) THE TYPE-ONLY NAMES — `ThemeResolution`, `ThemeAttributeWrite`, `ThemeEnv` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 5 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text** (`S-TH-6`) | **none** | `§2.1` items 1/2, `§5.2` leg 5, `§3.2 F-7` | runtime + type-level |
| **R-6** | **The DIFF-SCOPE row and the no-importer probe (`P-TH-4`, `P-TH-12`).** *Every changed path in this unit's commit range is inside `§5.1`'s allow-list; NO path in `§5.1`'s DENIED set appears; and at the time this unit's red set runs, `src/shared/theme.ts` is imported by NO `src/**` file* (an import-graph probe: a read of the tree for the module's specifier returns ZERO). **SCOPE RULE, so the row cannot mistake correct gate work for a boundary violation: a diff-scope row asserted over a COMMIT RANGE must scope its allow-list census to THIS UNIT'S OWN ARTIFACTS** — the module, this unit's test file, this spec, this record, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits or a sibling's dirty file as this unit's diff. The DENIED set is the exception and binds the WHOLE committed set.** **IMPLEMENTATION FORM, pinned because `git` is not available at run time: a FILESYSTEM PROBE** — every DENIED path PRESENT on disk, every artifact path of this unit's allow-list EXISTING, and the IMPORTER GRAPH READ FROM THE TREE (a recursive `src/**` read matching the module's specifier, never a git command and never a comment) | **none** | `§5.1`, `I-8`/`I-9`, `§3.2 F-7` | static |
| **R-7** | **THE NO-OS-READ / NO-MEDIA-QUERY ROW (`P-TH-8`; `I-7`; `§2.2`(C) row 2).** *Over the MODULE's source, no `matchMedia`, no `prefers-color-scheme` subscription, no `process.env`, no `process.platform`, no `navigator`/`userAgent`, no `require('os')`/`node:os`, no `electron` reference, no theme cookie, no system-preference probe, and no UA sniffing — so exactly ONE comparison against the environment is present and it is against the literal `true`.* **ITS FALSIFIABLE HALF: any ambient environment read, any media-query read and any truthiness test of the env member FAILS.** **BOTH CONTROLS: (i) a corpus reading `matchMedia` or `process.env` FAILS; (ii) a corpus reading the caller's own `env.prefersDark` under strict identity PASSES** | **the literal `true`, DECLARED BY NAME** — and **`matchMedia` gets NO exemption at all** (`§2.2`(C) row 2) | `P-TH-8`, `§2.3` item 2, `§5.5.1 P-TH-IM-2` | static |
| **R-8** | **THE CLOSED-SET LITERAL ROW (`P-TH-1`, `P-TH-7`, `P-TH-10`; `§2.1` item 5).** *The module's STRING LITERAL BODIES are the declared closed set: `''` · `'env'` · `'degraded-env'` · `'string'` · `'object'` — with the two `typeof`-tag bodies INCLUDED because the value rules require them.* **A TOKEN LITERAL (`'dark'`/`'light'`/`'system'`), an ATTRIBUTE-NAME literal, a `--`-shaped custom-property literal, a THIRD `source` body, or any spelling variant of a declared body FAILS.** **BOTH CONTROLS: (i) a corpus carrying `const t2 = 'dark'` in a second constant, or a `'system'` literal, FAILS; (ii) the module carrying exactly the five declared bodies PASSES.** **SCOPE, stated so it is not vacuous: this row reads the NORMALIZED view (`§3.4`'s normalization), so the assembly evasion lands here as well** | **the five declared bodies, NAMED: `''` · `'env'` · `'degraded-env'` · `'string'` · `'object'`** — **no other body is exempt, and a module needing a further body owes this contract an amendment** (`§2.1` item 5's limit) | `§2.1` item 5, `P-TH-1`/`P-TH-7`, `I-5`/`I-6` | static |
| **R-9** | **The ABSENT-PAGE-DESIGN probe (the existence row that keeps `§1` item 7 falsifiable).** *`docs/skills/designing-pages.md` does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update.* **THE PROBE: a file-existence check whose FAIL is meaningful — if the file comes to exist, this unit OWES the coverage row and the demo-page entry** (with the honest note that a mechanism which renders nothing can contribute an **absence** row only) | **none** | `§1` item 7, `§7` item 6 | static |
| **R-10** | **THE NO-INTERPRETATION / NO-PRECEDENCE ROW (`P-TH-10`; `§2.3` item 3).** *Over the MODULE's source, no computation relates `setting` to `prefersDark`: no comparison between them, no branch selecting a value from the reading, no transition, no state name, no override rule and no tri-state member.* **ITS FALSIFIABLE HALF, and it is the row's whole content: a module that returns a token derived from `prefersDark` rather than the caller's own token FAILS; a module that carries an explicit-vs-system precedence FAILS; the ONE legal use of the reading is the `prefersDark` REPORT itself.** | **none** | `P-TH-10`, `§2.3` item 3, `§5.5.1 P-TH-TP-2` | static + `[T]` |
| **R-11** | **The NO-SIBLING-COMPOSITION / NO-FABRICATED-EDGE ROW (`P-TH-12`; `I-8`; `§2.5` items 3/4).** *No reference to any sibling module or its surface and NONE to the control unit: no `createGestureSession`, no `GestureHandle`, no `tokensFor`/`tokenFn`/`orientationFor`/`containerDeclarationFor`, no `computeTrackVars`/`isEmpty`, no `createOwnedListHost`/`createSlotHost`, no `createRelocateSession`/`resolveTarget`, no `project`/`applyProjection`, no `probeMountInvariant`, no `normalizeCatalog`/`buildMenuTemplate`/`selectCatalogItem`, no `demo-envelope` path, and no `U-THEME-CONTROL` symbol.* **A reference to any of them FAILS**, because each would be a **composed sibling** this unit's charter does not admit and a **fabricated edge** in the family's `H-r6` class | **none** — **and the row is why `§2.5` items 3/4's non-edges are CHECKABLE claims rather than promises** | `P-TH-12`, `§2.5` items 3/4, `I-8` | static |
| **R-12** | **THE MEMBER-CENSUS NEGATIVE ROW (`§2.1` items 1/2; `I-3`).** *(a) `Object.keys` on every returned record deep-equals EXACTLY its declared three-name list, IN DECLARED ORDER; (b) a FOURTH-member negative drive: a corpus record carrying a fourth key is asserted to FAIL the census reading; (c) the DECLARED-TYPE half, on the `tsc` leg: `setting` and `name` are `string \| null`, `prefersDark`/`removal` are `boolean`, `value` is `string`, and all five members are `readonly`.* **BOTH CONTROLS: (i) the fourth-member corpus FAILS; (ii) the module's two records PASS both halves.** | **none** | `§2.1` items 1/2, `§2.4` item 4, `§5.2` leg 5, `P-TH-IM-1`/`P-TH-IM-3` | static + `[T]` + type-level |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Claim | The probe (its FAIL is meaningful) |
| --- | --- | --- |
| **X-1** | **`src/shared/theme.ts` DOES NOT EXIST at filing, and `tests/theme.test.ts` DOES NOT EXIST at filing** — **the two absence facts the red set's own red form rests on** *(measured this pass: the glob `**/theme*` returned NO FILES)*. **THE ROW BRANCHES ON THE MODULE'S PRESENCE, because the red form FAILS once the work is done: THE RED BRANCH (module absent, governing AT RED TIME)** is the absence of both paths; **THE GREEN BRANCH (module present, governing AT GREEN TIME)** is the PAIR's presence **plus the EXPORT CENSUS BY NAME** (`§2.1` item 1's two value exports by name; the type half is `§5.2` leg 5's, because a type name is erased at run time) | a file-existence check for both paths; **its RED form is the module-resolution failure the red set reports**, and **its GREEN form is the pair's presence plus the export census BY NAME** (`§4.1`) |
| **X-2** | **`docs/specs/theme.md` is THIS file — the unit's contract is FILED** | a file-existence check; **the tracked-path assertion is the supervisor's commit** (`RCA-8`) |
| **X-3** | **`docs/specs/theme.md` is NOT the gate-1 record, and the gate-1 record is NOT edited by this unit** | the record (`docs/specs/theme-review.md`) is a DENIED path in `§5.1` item 11; a diff-scope row (`R-6`) reads it |
| **X-4** | **`docs/skills/designing-pages.md` does not exist** (`§1` item 7; `R-9`) | the file-existence probe of `R-9`, whose FAIL means this unit owes the coverage row |
| **X-5** | **`src/**` contains NO theme, appearance, attribute-write, media-query or OS-preference surface, AND the only theme-ish artifact is `src/renderer/index.html`'s `:root { color-scheme: light dark; }`, which NOTHING this unit returns can influence** — **re-measured this pass: a `src/**` search for `matchMedia|prefers-color-scheme|data-theme|color-scheme|appearance` returns `1` matching line (that `:root` rule, in `src/renderer/index.html`); a `src/**/*.ts` search for `theme|appearance|dark` returns `0` matches; the file is `44` lines with one `<style>` block and hard-coded colours; NO test file under `tests/**` is a theme test** | a token census over `src/**` plus the read of that file; **its FAIL means a theme surface already exists and this unit's denial list must be re-derived.** **AND ITS SECOND HALF IS THE FACT A FRESH READER NEEDS: the existing authority is `F1`'s and is unreachable from this unit's returned values** (`CURRENT STATE` item 10) |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/theme.test.ts`** (`§0A` note 1) — authored **first**, **RUN**, and its
failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/theme.js'` (or the repo's equivalent module-resolution failure) for every row
that imports the module, **plus the static/existence rows that can already be evaluated** — `§3.4`'s `R-9` (the
absent-page-design probe), `R-3`'s config/dependency half, `R-6`'s no-importer half and **`§3.5`'s
`X-1`/`X-2`/`X-4`/`X-5`** — **which need no module at all**; `R-4`/`R-5`/`R-12` become fully evaluable when the
module lands, **while `R-1`/`R-2`/`R-7`/`R-8`/`R-10`/`R-11` scan THIS module's bytes and become evaluable exactly
when it lands** (which is what `X-1`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely additive**, and
**the unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that two pure functions return
their declared records, that the pass-through carries the caller's own token unchanged, that the environment
reading is strict and its degradation is observable, that the attribute name echoes verbatim or reads `null`, and
that the removal case is returned as DATA with no call**. It is **NOT** evidence that any attribute exists on any
element, that a stylesheet reacted, that the app looks different, that an OS preference was read, or that any of
this is reachable from the app — **in particular, at the end of this cycle the module is still imported by NO
`src/**` file** (`R-6`), **and the environment reading is a claim about a VALUE, never about an operating system**
(`§2.3` item 2, `I-7`).

### 4.2 Red-set authoring order

1. **The `§3.5` existence rows `X-1`/`X-2`/`X-4`/`X-5` FIRST**, with **`§3.4`'s `R-3`'s config half, `R-9` and
   `R-6`'s no-importer half** — they are the red's own premise and are evaluable before this unit's module exists.
2. **Then the `§3.4` static rows** (`R-4`/`R-5`/`R-12` become complete once the module exists;
   `R-1`/`R-2`/`R-7`/`R-8`/`R-10`/`R-11` read the module file and are evaluable **once it exists**).
3. **Then the totality and degradation rows `F-1`…`F-8` and `I-1`…`I-11`** — this unit's failure surface comes
   **before** its happy paths, because **a totality claim is what the whole contract rests on** and a red on
   totality is diagnosis a green cannot give. **`F-2` (the hostile environment) and `F-3`/`F-4` (the removal and
   the name arms) are the three rows that carry the unit's hardest claims.**
4. **Then `M-1`…`M-7`** — the happy states, **with `M-5` (the removal case) and `M-6` (the name echo) sitting with
   the static rows they make falsifiable**, and **`M-7` (the one composition drive) last**.
5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**, after the
   `M-*` rows, **in register order** (`P-TH-IM-1` · `IM-2` · `IM-3` · `IM-4` · `P-TH-SM-1` · `SM-2` · `P-TH-TP-1` ·
   `TP-2` · `TP-3` · `TP-4` · `TP-5` · `TP-6`). They ride **`npm test` (leg 1)** unchanged and **need no new file,
   no new script, no `package.json` change and no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and existence row
   that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are
   recorded. **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first, with the
   old text kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order** with
**STOP AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop early**, and
**the un-run rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run that reports all `102`
attempts as executed is the finding, not the expectation.** **⟶ (`2026-09-27`, `§0A` note 8 item 3: read that `102` as
the LIVE `103`, the pre-committed `NG-2` re-grain having been taken — the sentence's own claim, *"every attempt
executed"*, is UNCHANGED and is what the row tests.)** **The register's execution markings are DESIGN, not
results**: **a row that is marked executable in `§5.5.1` but broken when run is a SPEC FINDING, reported rather
than tuned to green.**

### 4.3 What the red is NOT

- **Not a DOM test and not a visual test.** **No real `Element`, no `document`, no shim member, no attribute and
  no rendered appearance**: **there is no element parameter anywhere in this module's surface** (`§2.5` item 2).
  **No row may need an element at all** — and a row that constructs a fake element to watch a write is `S-TH-4`'s
  class, because **this unit performs no write to watch.**
- **Not an OS test, and NOT a system-preference test.** The rows never read `matchMedia`, never subscribe to a
  media query, never read `process.env` or a system preference, and never spawn a platform. **`R-7` is the row that
  forbids an ambient read and `I-7` is the invariant.**
- **Not a store or persistence test.** **This unit owns no store, and `A-d6`'s boundary makes a store a NEW GATE**
  (ruling 3): a row asserting that a preference SURVIVES a restart belongs to the fork or to a future store unit,
  and **must not be filed here** (`S-TH-9`).
- **Not a control, dispatch or MCP test.** **The AUTHORED control is `F1`'s**; a row asserting a `select` rendered,
  a `state-slice` dispatched, a tool called or an envelope node authored **belongs to `F1` and must not be filed
  here** (`§2.5` item 3).
- **Not a sibling test, and not a composition test.** **No row may assert a `U-MENULIB`/`U-CONTAINER`/`U-RELOCATE`/
  `U-GSESSION`/`U-ZONES`/`U-CENSUS`/`U-GUTTER`/`U-PROJ`/`U-LISTHOST`/`U-SLOTHOST` behaviour, import a sibling's
  module, or require `src/shared/theme.ts` to be wired into anything** (`R-11`).
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a vocabulary test.** A row naming a real token value, an attribute name, a `'--'` literal or a consumer
  token is a `P-TH-1` violation — such spellings may appear **only** inside `R-1`'s/`R-8`'s own control corpora.

### 4.4 The stop conditions (binding)

**`S-TH-*` are this unit's own classes, derived in substance from the gate-1 record's conditions `C-1`…`C-10` and
`G-1`…`G-6`, from `Q2`/`Q3`'s pins and from `A-1`/`A-2`'s recorded defaults, and from this filing's own surface.
All eleven bind the red set, the implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-TH-1** | A row is only satisfiable if the module **READS AN OS, AN AMBIENT GLOBAL, A MEDIA QUERY, A DOM OR AN ELEMENT** | **Violates `P-TH-8`/`P-TH-9` and `I-7`.** The claim is DELETED; **the obligation is routed to the caller**, which is where the environment claim and the write both legitimately live. |
| **S-TH-2** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed.** The row forms are `R-1`/`R-2`/`R-7`/`R-8`/`R-11`, **and each must NAME its declared exemptions (`R-1`'s contract-vocabulary set, `R-7`'s `true`, `R-8`'s five declared bodies) or it is vacuous** (`§2.2`(D)); **and see the mirror warning at `§2.1` item 5: a literal census that EXCLUDES the `typeof`-tag bodies reddens the module the value rules require.** |
| **S-TH-3** | A row asserts a **`code`/`reason`/`ok`/`thrown`/result-record** shape from either export, or expects a **throw** from one | **Violates `§2.1` item 2** — **this unit has NO REFUSAL DOMAIN** and every outcome is a VALUE. **Re-write as a value assertion; adding a union is a NEW CONTRACT and needs its own gate.** |
| **S-TH-4** | A row requires the module to **read a caller member as a DECISION** beyond the three declared reads (the `typeof`/emptiness test of `setting`, the strict own-member test of `env.prefersDark`, the `typeof`/emptiness test of `attributeName`/`resolved`), **to COERCE a caller argument (`String()`, `toString`, `valueOf`), to apply a PRECEDENCE between `setting` and `prefersDark`, or to WATCH A WRITE on an element** | **Violates `P-TH-3`/`P-TH-10`, `§2.3` items 1/2/3 and `§2.4` items 1/3.** **The row is DELETED**: **a coercion hook is a read of caller data as a decision; a precedence rule is a clause this contract does not contain; and this unit performs no write for a probe to observe.** |
| **S-TH-5** | A row requires the module to **persist, remember, journal or restore** an appearance setting, **or to hold a store** | **Violates `P-TH-4`/`P-TH-11`, `I-4`, and `A-d6`'s persistence boundary.** **A store addition is a NEW GATE and must not be smuggled in via this unit** (`§1` item 6). |
| **S-TH-6** | A row asserts a prohibition by a **bare COUNT** (*"five exports"*, *"three members"*, *"`ALL_TOOLS` is 21"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a surface.** The row must assert **SET EQUALITY AGAINST THE NAMES**, or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-5`/`R-6`/`R-12`), and **an existence claim must be a probe whose FAIL is meaningful** (`R-9`, `X-1`…`X-5`). |
| **S-TH-7** | A row asserts a claim about the module's **STRING LITERALS** that excludes the `typeof`-tag bodies (`'string'`/`'object'`), **or asserts the absence of a `typeof` keyword** | **Violates `§2.1` item 5's own limit.** The row is RE-WRITTEN with the five declared bodies named; **a row that reddens the conformant module is a SPEC FINDING, not a defect in the module** (`container.md` `§0A` note 8.2's precedent). |
| **S-TH-8** | A row asserts that the module's **returned record IS a caller's own object by `toBe`**, or that **two calls return the SAME record object** | **Violates `§2.4` item 4 and `§2.3` item 1(a)'s distinction: the RECORD is FRESH each call while the MEMBER VALUES are carried BY IDENTITY.** The row must assert **`toEqual` across calls plus a distinct-identity pairwise check**, and **member-level `toBe` only.** |
| **S-TH-9** | A row needs a **sibling import** (value or type-only), **a session, a census read, a store, a persistence channel, a shim change, a new dependency, or a reference to the `F1` control** | **Violates `§2.1` items 3/4, `P-TH-12`, `I-8`/`I-9`** — **a dependency edge asserted toward any sibling or toward `F1` would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class), and the three named positive controls are `F-7`'s. **Stop and route the row to its owner.** |
| **S-TH-10** | A row offers a **`[U]`** row, claims a **`[D]`** row, moves a rejected row to the `ui` leg (silently or not), reports gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason**, or omits the `§7.1` **`DOES NOT TRIGGER`** decision | **Violates `§5.2`'s three-part refusal and `H-r6`'s layer discipline.** The claim is DELETED; **the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words, carried at `§5.2`). **Any pass wanting a rendered, applied or visual row must get it from the unit that OWNS the rendered surface — which, for a themed appearance, is `F1` and the consumer's own stylesheet.** |
| **S-TH-11** | A row asserts a `source` SPELLING other than the one the SPEC GATE RULED (`2026-09-27`: the member is `source`, the as-filed spelling was `basis` — `§0A` note 6), or asserts **`ThemeResolution`'s/`ThemeAttributeWrite`'s TYPE NAMES** as though the record pinned them | **Violates `§0A` notes 2/4/5/6 and `§7a.1` items 1/2.** **The member's NAME IS RULED (`source`) — so a row is authored against the RULED spelling, and a row authored against the as-filed `basis` is the mirror error — while the two TYPE names remain RECORDED WORKING DEFAULTS** (a later change to THOSE still **must open a gate rather than edit a row's expectation to match a rename**). |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken a row to
reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist** (*done: this filing*), **(b) a
TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), **(c) its typed register to exist**
(*done: `§5.5.1`* — item 11's precondition is satisfied **before** any red set), and **(d) the supervisor's
ordering** — and `E8`'s ledger row stays an open `## OPEN` row whose status is the supervisor's. **No status is
advanced by this filing.** **`E8`'s `Spec` cell still reads `OWED — not filed` and its chain cell still reads
`BLOCKED`** (`CURRENT STATE` item 7; the record's `P-T-2`): **its own named dependency `U-MENULIB` (`E7`) is
`DONE`** and the tracker's own queue block names `E8` as **the next action**, so **this unit's only live
precondition is its own red set.**
**`U-MENULIB` (`E7`), `U-OVERLAY` (`E9`), `U-GUTTER` (`E3`), `U-RELOCATE` (`E4`), `U-CONTAINER` (`E5`),
`U-GSESSION` (`E6`), `U-GUTTER-UI` (`E10`), `U-ZONES` (`E1`), `U-CENSUS` (`E2`), `U-PROJ` (`D4`), `U-LISTHOST`
(`D2`) and `U-SLOTHOST` (`D3`) are SIBLINGS and NOT dependencies in either direction** — a later pass asserting an
edge would be a FABRICATED EDGE (`I-8`).
**`U-THEME-CONTROL` (`F1`) is BLOCKED ON this unit** — **a tracker ordering, not an edge** — and **is not this
unit's subject** (`§2.5` item 3).

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST, DERIVED FROM THIS UNIT'S OWN CHARTER

**THE DENIED SET, NAMED FIRST, because it binds absolutely and outranks the allow-list** (ruling 8: *"each unit's
DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*). **THE DERIVATION IS STATED
BEFORE THE LIST, because the derivation is the thing that can be wrong:** this unit's charter is **two pure
functions over caller arguments — a value and an environment record — with an EMPTY import census and a value
RETURNED rather than written** (`§2.1`, `§2.5`) — so **every path whose only role would be to COMPOSE an
appearance, RENDER a control, LOAD an OS preference, APPLY the returned write, OBSERVE the artifact or register a
surface is denied, because nothing in this unit's contract needs it.** **AND THE TWO SUBJECTS THIS UNIT'S CHARTER
NAMES EXPLICITLY, as `F1`'s: the demo-envelope path and `src/renderer/index.html`** — the second of which is
**the repo's EXISTING appearance authority** (`CURRENT STATE` item 10), **an authority this unit's returned values
can neither reach nor replace.**

1. **`src/shared/demo-envelope.ts`** — **THE DEMO ENVELOPE IS `F1`'s**, because `A-d6` puts the AUTHORED
   appearance control there, **and this unit implements no control, authors no node and dispatches nothing.**
   ***THIS IS THE CLAUSE THAT BINDS***: **a demo-side implementation of the applier, of a control or of a token
   block is `F1`'s work, and `A-d6`'s own requirement that *"`U-THEME`'s spec must be readable with the demo
   deleted"* is what makes the denial checkable** (`§3.4 R-6`, `§7` item 5).
2. **`src/renderer/**` — `src/renderer/index.html` INCLUDED** — **the file that currently carries the repo's
   appearance authority (`:root { color-scheme: light dark; }` plus hard-coded colours).** **This unit writes no
   CSS, no stylesheet, no class, no attribute and no renderer wiring**, and **a later pass asserting an edit here
   is a FINDING.**
3. **`src/main/**`** — **the process boundary.** **Two independent grounds deny it: (i)** this unit reads no OS and
   needs no privileged API — **and the OS reading is INJECTED, so there is nothing to fetch** (ruling 2); **(ii)**
   `(C)` admits a **reusable shell-chrome MECHANISM**, and a main-process appearance integration is the shell's
   chrome work and **the fork's**. **A later pass asserting an edit under `src/main/**` is a FINDING.**
4. **`src/preload/**` and the app graph** — no node, no envelope, no handler body, no component binding, no mount
   change, no IPC method.
5. **`src/shared/dom-shim.ts`** — **FROZEN** (`SHIM-COMPLETION-CARVE-OUT`/`H-r7` admit exactly one member, and
   **this unit adds none — its removal case is DATA**).
6. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no registration site.
7. **`package.json`** and **`package-lock.json`** — **no script, no dependency, no devDependency.** *(This denial
   is LOAD-BOUNDED: `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET, so **any further script key
   reddens that row until a TestWriter extends the landed set; a config change cannot satisfy it** — `AGENTS.md`
   item 4's recorded process hazard. **Leg 5 of `§5.2` therefore adds NO SCRIPT.**)*
8. **`scripts/**`** — no helper, no leg driver.
9. **`tsconfig.json`**, **`tsconfig.tests.json`** and **`vitest.config.ts`** — no include/exclude/compiler-option
   change.
10. **Any store, any persistence channel, any journal, any `.css` file, any new JSON data file** — this unit ships
    no artifact of any kind besides its module, **and a store is a NEW GATE** (ruling 3).
11. **Every sibling and gate artifact** — a sibling unit's module, test file, `*-greens.md`, review record and
    tracker-only rows, **plus `docs/specs/theme-review.md` (the gate-1 record, whose conditions, derivation and
    verdicts this spec derives and may not re-litigate)**, **plus `docs/decisions.md`'s ACTIVE rows** (a spec may
    not edit a ruling) and **`docs/pending.md`'s `§K` REQUEST list, whose vocabulary is NOT used anywhere in this
    file as though it were in force.**
12. **`docs/skills/designing-pages.md`** — it **does not exist**, and this unit does not create it (`R-9`'s probe;
    `§7` item 6).
13. **`F1`'s own artifacts** — `docs/specs/theme-control.md` (still `OWED — not filed`), `F1`'s ledger row, and any
    decision or pending row about the authored control. **A pass editing them in this unit's diff is a FINDING.**

**THE ALLOW-LIST:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/theme.ts` | **NEW** — the **two value exports + three type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/theme.test.ts` | **NEW** — the red set (`§4.2`), the register rows and the static/existence rows | always |
| 3 | `docs/specs/theme.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/theme-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/theme-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and **a sibling spec only for a dated status/annotation correction that changes NO normative clause** | the pass that produces them |

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule, stated so a
scope row cannot mistake correct gate work for a boundary violation**: a diff-scope row asserted over a **commit
range** must scope its **allow-list census to THIS UNIT'S OWN ARTIFACTS** — *the module, this unit's test file,
this spec, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows* — and
**must NOT read a later unit's commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this
unit's diff.** **The DENIED set is the exception and is the half that binds the WHOLE committed set**: a denied
path anywhere in the range **FAILS** the row regardless of which pass committed it. **A non-denied path outside the
allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate boundary
to leave a commit). **The canonical artifacts must be non-vacuously present in the range**, and **`§3.4 R-6` is the
row that carries this rule.**

**THE FALSIFIER THIS SCOPE CAN FAIL, stated so the layer decision is falsifiable rather than asserted** (the
record's own words, verbatim in substance): ***if this spec's diff scope contains `src/renderer/**` — INCLUDING THE
DEMO-ENVELOPE PATH — or any `src/**` importer, or an authored attribute write, or a proving probe, then the `§7.1`
predicate TRIGGERS, the three-part `[U]` refusal is UNAVAILABLE, the live/UI battery is OWED, and the ledger's leg
cell becomes a finding.*** **AND THE SCOPE-ONLY LIMIT, WHICH STEP 4 REQUIRED BE REGISTERED: this denial binds THIS
UNIT'S OWN DIFF — a later `F1` pass LAWFULLY importing `src/shared/theme.ts` must NOT be read as falsifying
`U-THEME`** (`§2.5` item 3).

### 5.2 The legs this unit MUST run — THE FIVE, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app or OS evidence** — for this unit it proves **two pure functions' returned records, one pass-through identity, one strict environment reading with its observable degradation, one name-echo rule and one removal-as-data case**, and **nothing** about an applied attribute, a stylesheet, a rendered control, an OS or the app (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the three type declarations, the two value signatures and the returned members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild: **this unit adds a module imported by nobody, so the built output set must be UNCHANGED** — **a bundle census that changed is a FINDING, and a census that did NOT change is not evidence the module works.** **THE OUTPUT SET IS NAMED AS A SET, NOT AS A NUMBER QUOTED HERE** (`S-TH-6`): the unit requires **byte-identical outputs**, which is the claim that can fail. |
| **4** | **test-layer typecheck** | `npm run typecheck:tests` | **[H]** (the additive fourth leg, `AGENTS.md` item 4) | compiles the whole `tests/**` tree under the same strictness a unit's own leg 5 uses. **`tsconfig.json` excludes `tests`, so a unit that cites typecheck as evidence about its OWN test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/theme.test.ts`** — the named leg for `§3.4 R-5`(b) and `R-12`(c)'s type halves | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts three **TYPE-ONLY** names, **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail**; and **the declared-member-type claim (`R-12`(c)) has NO runtime falsifier.** It fails exactly here, and **leg 2 does not compile `tests/**` at all.** **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script to `package.json`, no dependency and no diff-scope row**. |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as the family requires. A
one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — and in particular **NOT for an
   applied attribute, NOT for a resolved `color-scheme`, NOT for the app's appearance in dark mode, and NOT for
   any OS preference being what the caller supplied.** **`[U]` is the real-Electron observation leg (`npm run ui`),
   and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, in two parts, and this is why it is STRUCTURAL rather than a leg-availability excuse:
   (a) the module is imported by NO `src/**` file** (`R-6`, `X-1`) — **so there is NO RENDERED SURFACE TO OBSERVE
   and NO CONTROL TO RENDER**; **and (b) the module READS NO OS, NO MEDIA QUERY, NO DOM AND NO ELEMENT** (`P-TH-8`;
   `R-7`/`R-2`) — **so there is NOTHING FOR A MEASURING LEG TO MEASURE, and nothing is written for a probe to
   watch.** **The `ui` leg exists and is green, and the divergence leg is green — the refusal is not an excuse
   about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row may not be moved to the `ui` leg
   silently."*** **Any later pass that wants an applied-appearance, rendered-control or OS-acceptance row must get
   it from the unit that OWNS that surface — and for an appearance, that is the CONSUMER's stylesheet plus `F1`'s
   authored control, not this repo's mechanism.** **A `[U]` row moved here silently is `§4.4 S-TH-10`, and it does
   not land.**

**THE READER QUESTION, ANSWERED: `NONE`.** **No instrument on any layer this repo owns reads an APPLIED CSS
declaration back** — the family has already measured this limit (the `U-CONTAINER` pass's own finding, and
`SHIM-COMPLETION-CARVE-OUT`'s list of forbidden shim members), **and the `ui` leg observes a rendered document, not
a stylesheet's resolution.** **So the applied half is REFUSED rather than promised, and the returned-value reading
is the only one under which this unit's artifact is `[T]`-provable** (`§2.4` item 3; `I-7`).

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED, AND THE NON-CLAIM IS RECORDED IN THESE
WORDS.** The divergence leg (`npm run divergence`, `N = 9` pinned) and its landed extension channel exist and are
green — **but this unit's contract needs nothing from them**: its rows assert **two functions' returned records and
nothing rendered**, and a divergence harness can only compare **a shim's rendering against a real host's** — a claim
about a **RENDERED SURFACE**, which this unit authors none of. **`R-7`/`R-9` are the probes that keep the non-claim
falsifiable**, and **no pass may claim `[D]` evidence from the existing pinned leg or from this unit's node green.**

**GATE 6 IS `STRUCTURAL`, NOT WAIVED.** **The word is `STRUCTURAL` and the word `waived` is FORBIDDEN here.** The
live-app verification gate is **not waived by this filing and not satisfied by it either**: **gate 6's honest status
is that the live app CANNOT REACH this module** — it is imported by no `src/**` file and appears in none of the
built outputs — **and this unit writes nothing and reads no OS, which is a SECOND independent structural reason.**
**The DONE row must STATE the structural reason rather than omit the gate. A DONE row that reports gate 6 as
*"waived"* is a review finding; the correct form is *"structural — no importer, no rendered surface, and the reason
stated"*.**

**THE `§7.1` PREDICATE DECISION, RECORDED — `DOES NOT TRIGGER`.** *(`docs/specs/user-flow-audit.md` `§2`/its
`§7.1` predicate require the decision to be RECORDED either way — *"the decision is RECORDED either way
(`TRIGGERS` or `DOES NOT TRIGGER`, with the evidence that decided it)"* — never from preference.)*
**DECISION — `DOES NOT TRIGGER`, on both limbs, from this unit's own recorded change set and not from preference:**
**Limb A (`DOM-SHIM-BLINDNESS`) does not hold** — **the change authors NO rendered surface**: no element, no node,
no class, no text, no style, no attribute write and no geometry (`I-6`); **Limb B (`UI-OVERHAUL`) does not hold** —
**the module is imported by no `src/**` file, renders no control and changes no user-visible flow** (`§2.5`).
**THE EVIDENCE THAT DECIDED IT:** `§5.1`'s allow-list contains **no `src/renderer/**`, no `src/main/**`, no
`src/shared/demo-envelope.ts` and no attribute-writing probe**, and `§1` item 7 records that
`docs/skills/designing-pages.md` does not exist, so there is no live surface for the audit to reach. **ITS
FALSIFIER** (carried at `§5.1`'s closing sentence): **a diff scope admitting a renderer path — the demo envelope's
included — any `src/**` importer, an authored attribute write or a proving probe FIRES the predicate, makes the
three-part refusal unavailable, and converts the ledger's leg cell into a finding.** **CONSEQUENCE, stated so the
exemption is not confused with an empty report: NO `§5.U` matrix and NO `§6.1` report are emitted, and the
exemption is RECORDED with its reason** — *"'no report' and 'an empty report' are different artefacts and the first
is the only admissible form of the exemption."*

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE items**:

1. **Unit + wave + status**: `U-THEME` · wave **E** (ledger row `E8`) · `DONE` or the honest non-DONE status.
2. **The scope-boundary confirmation, explicitly**: *"a pure, total, stateless `src/shared/` mechanism of two
   functions and nothing else: an opaque caller `setting` and an injected `env` RESOLVED into a three-member
   resolution, and the attribute write RETURNED as DATA with the caller's own attribute name echoed; **no token
   name, no token value, no attribute name, no stylesheet, no control**; **the module COMPOSES NOTHING** — no
   element, no write, no `setAttribute`, no `removeAttribute`, no `matchMedia`; **no OS read, no media query, no
   DOM read and no element parameter**; **no import statement of any kind**; **no store, no persistence, no cache,
   no module-level state, no shim member, no MCP surface, no new dependency and no UI**; **and it is readable with
   the demo deleted**."* **A DONE row that does not state this is a review finding** — it is the unit's defining
   constraint (`§1` items 1–6; `§2.4`; `§2.5`).
3. **The surface confirmation, explicitly**: *"`src/shared/theme.ts` exports exactly **TWO value exports**
   (`resolveTheme`, `applyThemeDeclaration`) and **THREE type declarations** (`ThemeResolution`,
   `ThemeAttributeWrite`, `ThemeEnv`) — **`2 + 3 = 5` names** — its **seam set is EMPTY**, its `resolveTheme`
   returns the **three-member** record (`setting` · `prefersDark` · `source`), its `applyThemeDeclaration` returns
   the **three-member** write (`name` · `value` · `removal`) with the removal case
   `{name: <echoed>, value: '', removal: true}`, the environment is **closed at one member with a strict `=== true`
   read**, and it imports **NOTHING — not even type-only** and is **imported by NO `src/**` file**."* **The census
   is `§2.1`'s and `R-5` is its row.** **A DONE row that prints a sixth exported name, that prints a fourth record
   member, or that omits this census, is a review finding.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows
   ran and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**` ONLY*** ·
   `npm run build` `[H]` (whether the output set was **byte-identical**) · `npm run typecheck:tests` `[H]` ·
   **leg 5** (the standalone strict `tsc` over `tests/theme.test.ts`, **the leg that pins the three type names and
   the declared member types**) — **and the explicit sentence that the node-suite green is envelope/pure-layer
   evidence and NOT assembled-app or OS evidence**, and for this unit **that it proves nothing about an applied
   attribute, a stylesheet, a rendered control, a dark-mode rendering, an OS preference or the app** (`RCA-12`;
   `§2.4` item 3; `I-7`).
7. **The `[U]`/`[D]` status, the recorded `§7.1` decision, and gate 6's structural status**: **`[U]` not offered**,
   with `§5.2`'s **THREE-PART** clause (the refusal · the structural reason — no importer, no rendered surface, no
   OS/DOM/element read, nothing written · the `zones.md` `§4.4 S-6` sentence); **the reader question answered
   `NONE`**; **`[D]` not claimed**; **the `§7.1` predicate decision re-stated as `DOES NOT TRIGGER` with its
   evidence and its falsifier**; **gate 6 stated as `STRUCTURAL`, never `waived`, with its reason**; **and the
   scope-only limit restated — the denial binds THIS UNIT and does not forbid `F1` from importing the module.**
   **A DONE row that claims an applied-attribute, rendered-control, dark-mode or OS-preference proof, a `[D]` row,
   or a waived gate 6 is a review finding.**
8. **The adversarial pass's findings** (`AGENTS.md` RCA-3, MANDATORY per completed unit, **including the gate-11
   read-only PBT audit of `§5.5.1`'s executed tables and the pool-versus-boundary check re-run against the landed
   tables**) and the **blind-greens + per-unit documentation-review records** (`AGENTS.md` items 10a/10d,
   RCA-4/RCA-6 — the blind set is **`docs/specs/theme-greens.md`**). **A DONE row that cites no adversarial pass
   is a review finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this unit's
   only live dependency was `U-MENULIB` (`E7`, `DONE`) and that every other unit is a SIBLING and NOT a dependency
   in either direction**, that **`F1` is blocked on this unit as a tracker ordering and not as an edge**, and that
   **the owed tracker items of `§7` item 11 are discharged or re-parked with owners**.
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type · attempts-run ·
    held · broken · controls** counts, **each row's strategy id (`S-TH-*`)**, the **pinned seed `20260927`** and
    its **step form** for `P-TH-TP-1`, the **stop-after-5-consecutive-failures status** (`not triggered`, or
    `triggered at row …`), the **total attempts reported against the `≤400` cap** with **every row's count against
    the `≤100` per-row cap**, and **the explicit sentence that every row whose property text quantifies over a
    domain larger than its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it
    states.** **A DONE row that reports the register as "executed" without these per-row counts and strategy ids
    is a review finding** — the markings are **execution DESIGN**, and **a read-only PBT audit may not accept this
    spec's table alone**: it reads the counts here **and** the TestWriter's tables in `tests/theme.test.ts`.
11. **The register's ARITHMETIC.** The DONE row must print the **total WITH its per-row terms** — **the LIVE figure
    `103` = `12` (`P-TH-IM-1`) + `12` (`P-TH-IM-2`) + `10` (`P-TH-IM-3`) + `8` (`P-TH-IM-4`) + `6` (`P-TH-SM-1`) + `3`
    (`P-TH-SM-2`) + `12` (`P-TH-TP-1`) + `12` (`P-TH-TP-2`) + `11` (`P-TH-TP-3`) + `8` (`P-TH-TP-4`) + `6`
    (`P-TH-TP-5`) + `3` (`P-TH-TP-6`), whose DISTINCT sibling is `100`** — **and must reconcile that figure against
    the tables the test file actually produces**: **a total that is not the sum of its own terms is a review finding**
    (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`). **Where a row's attempts are several assertions over ONE
    execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row must report BOTH the declared
    attempts and the honest DISTINCT-DRIVE figure** (`§5.5.2` item 3's ledger is the authority). **The DECLARED
    figures are what the caps are compared against; the distinct figures are reported BESIDE them and never
    substituted.**
    **⟶ THIS ITEM'S AS-FILED FIGURES, KEPT VISIBLE (`2026-09-27`, `§0A` note 8 item 3 — the `102` and the
    `10`-term `P-TH-TP-3` are the PRE-GRAIN figures and are STALE ON THE ARITHMETIC ONLY): *"`102` = `12`
    (`P-TH-IM-1`) + `12` (`P-TH-IM-2`) + `10` (`P-TH-IM-3`) + `8` (`P-TH-IM-4`) + `6` (`P-TH-SM-1`) + `3`
    (`P-TH-SM-2`) + `12` (`P-TH-TP-1`) + `12` (`P-TH-TP-2`) + `10` (`P-TH-TP-3`) + `8` (`P-TH-TP-4`) + `6`
    (`P-TH-TP-5`) + `3` (`P-TH-TP-6`)"*.** **THE RE-GRAIN IS TAKEN: `P-TH-TP-3`'s term `10 → 11` (the inherited-`env`
    member), so the DECLARED total is `103` and the DISTINCT total `100` — each printed with its own terms, its own
    chain, its own family subtotals and its own cap re-check at `§5.5.3`; and **`F4`'s `(bounded)` marking of
    `P-TH-TP-5` MOVES NO TERM (the marked set is a count of ROWS, `5 → 6` rows)** (`§5.5.2` item 2).**
    **⟶ THE TWO FIGURES NOW HAVE A PRINTED AUTHORITY FOR BOTH HALVES (`2026-09-27` amendment, `§0A` note 7 item 1;
    read `102`/`99` there as the as-filed pair this amendment supersedes with `103`/`100`): `§5.5.3` prints the
    DECLARED total with its twelve terms and its chain, AND the DISTINCT total with its own twelve terms and its own
    chain, in one sentence that says which is which and where each is used — so a DONE row that reconciles DECLARED
    versus DISTINCT cites `§5.5.3` (with `§5.5.2` item 3's ledger as the distinct half's source) rather than deriving
    either figure itself.** **NO TERM OTHER THAN `P-TH-TP-3`'S, NO ROW ID, NO STRATEGY ID, NO SEED AND NO CAP MOVES,
    AND THE DECLARED FIGURE REMAINS THE ONE THE CAPS ARE COMPARED AGAINST.**
12. **The `§5.3` → `§5.5` numbering note, cited**: **there is NO `§5.4`** — the gap is DELIBERATE and is the
    family's (`docs/specs/gutter.md` `§5.3`'s own note). **This file also has NO `§5.5.0`**: it was filed **after**
    the gate-11 ruling and carries its register **from the start**, so there is no superseded zero-row exemption to
    keep visible. **A DONE row that reports a `§5.5.0` exemption for this unit is citing a clause this file does
    not contain.**

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`AGENTS.md` item 11 makes the register MANDATORY BEFORE the red set for a code-bearing unit.** **This repo HAS NO
PBT HARNESS**: `package.json`'s `devDependencies` key set is the five names — `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **no `fast-check`, no property runner**. **This unit is CODE-BEARING** (two exported
functions, an injected environment record, a totality surface over two untrusted arguments and a structural claim
over two returned records), so the **recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it**
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`). **There is NO `§5.5.0` in this file** — no superseded exemption exists to
keep visible. **`§5.5.1` below is therefore a real typed register**, executed by **plain deterministic vitest
tables**, **with NO new dependency, no sixth leg and no `package.json` change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE
(`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).** **A register ENUMERATES every
discernible testable property of its unit; the per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A CEILING.**
**THEREFORE this filing enumerates `12` rows carrying `12` TERMS and reports the count as its EXTENT — no property
was dropped, merged or left unenumerated to fit a threshold — and `12` ROWS / `12` TERMS IS AN OUTCOME.**
**THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S OWN FORM: the record's step-3 sketch carried `8` rows, and this
filing enumerates `12` because FOUR further properties are GENUINELY SEPARABLE and the record's own step-4
corrections named three of them:** **(a)** the **name-echo rule gets its OWN row** (`P-TH-IM-3`), **because its
degenerate arms (a non-string, `''`, the omitted case) are a different observable from the setting's
pass-through** — **step 4's correction 1**; **(b)** the **two environment rows must not assert the same property
twice** (`P-TH-IM-2` asserts the STRICT READING on a usable shape, `P-TH-TP-3` asserts the ABSORPTION over the
hostile pool — **one is a reading, the other is a totality claim** — **step 4's correction 2**; **(c)** an
**explicit row states that the removal case is DATA AND PERFORMS NO CALL** (`P-TH-TP-5`), **because a totality row
over the applier does not say WHETHER A CALL HAPPENS** — **step 4's correction 3**; and **(d)** the **two
composition/constancy properties** (`P-TH-SM-2`, `P-TH-TP-6`) are separable from the purity row they descend from.
**NO PROPERTY WAS DROPPED, MERGED OR LEFT UNENUMERATED TO FIT A THRESHOLD.** **THE BREAKDOWN RECOMMENDATION,
named once (`§5.5.2` item 1): `P-TH-IM-1`'s setting half and its env half are separable in principle, and
`P-TH-TP-1`'s module-wide universal could be split per entry point; splitting them is NOT owed, NOT done, and
changes no term.**

**THE REGISTER'S OWN STRUCTURE, stated once so the numbering is not read as an error: the `§5.3 → §5.5` gap (there
is NO `§5.4`) is DELIBERATE and is the family's** — the same gap in `docs/specs/gutter.md`, `gsession.md`,
`zones.md`, `census.md`, `projection.md`, `listhost.md`, `container.md`, `relocate.md` and `menulib.md`, recorded
by their documentation reviews (`AGENTS.md` item 10d / RCA-6). **`§5.3` is the DONE row's shape and `§5.5` is the
property register; NO clause is missing — the section simply does not exist, and renaming or renumbering is
FORBIDDEN for citation stability.** **This file has NO `§5.5.0`.** **`§5.5` is followed by `§5.5.1`, `§5.5.2` and
`§5.5.3`, and nothing else.**

#### 5.5.1 THE REGISTER — **`12` typed ROWS carrying `12` TERMS, in THREE families, ALL executed by design**

**What this section is, in one sentence.** A **typed register of `12` rows / `12` terms** whose **six genuine
quantifications** — (i) *the resolver's pass-through and totality over the declared setting domain*; (ii) *the
environment reading's strict rule and its hostile-shape absorption with the degradation observable*; (iii) *the
name-echo rule and its degenerate arms*; (iv) *the removal case as DATA, with no call*; (v) *the two returned
records' member census and their cross-call constancy*; and (vi) *the module-wide totality universal* — are
**executed here as quantifications over finite, pinned enumerations**, **hand-rolled and deterministic, with no new
dependency**.

**THE FOUR DOMAINS THIS REGISTER DRIVES, DECLARED BY NAME — and the declaration is part of the register's own
terms, because a domain that is NEVER INTERPRETED must be stated as such or its rows read as validation rows** (the
gate-1 record's own confirmation of the declaration, its `§4.9`):

1. **THE SETTING DOMAIN** — **the caller's opaque appearance token, and the values OUTSIDE the pass-through form:
   `undefined`, `null`, `''`, a number, a boolean, a `Symbol`, a `12n`, an object, an array, a function, a hostile
   `Proxy` and a revoked `Proxy`.** **It is a DECLARED EXTENT, not the whole of JavaScript's value space**, and
   **the module NEVER interprets a member of it** — it carries the string and declares `null` for everything else.
2. **THE ENVIRONMENT DOMAIN** — **CLOSED AT ONE MEMBER**, `prefersDark`, with the **strict `=== true`** rule; **a
   MISSING member and every non-`true` value are DEGRADATIONS rather than members**, and **a `false` member is a
   NORMAL reading, not a degradation**. **The domain's shape pool is the THIRTEEN rows of `§2.3` item 2** — **and the
   member-read form is the OWN-member form, so a trap-only `true` is NOT a member and a container carrying a genuine
   own member IS read** (`§2.3` item 2 rows `(12)`/`(13)` and the pinning sentence beside that table; the as-filed
   text of this item read *"the twelve rows"*, `§0A` note 8 item 1).
3. **THE REMOVAL / ECHO DOMAIN** — **the caller's attribute name as a NON-EMPTY STRING (echoed verbatim by
   identity) versus every non-string, every `''` and the omitted form (`name: null`), composed with the removal
   trigger set (`''`, `null`, `undefined` and every other non-string `resolved`).**
4. **THE OPAQUE, NEVER-INTERPRETED RESOLVED DOMAIN** — **NO member of the resolved value is ever validated,
   enumerated, parsed, lower-cased, trimmed or compared** — **its referent is the caller's own token and its
   literal set is the CALLER's, which is why the `setting` rows below are carry rows and never validation rows.**

**THE IDS ARE THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-TH-*`** (`TH` = this unit) — so
**a register row is never mistaken for a `§3` row** (whose families are `M-*`/`F-*`/`I-*`/`R-*`/`X-*`) **and never
for a sibling's register** (`P-ML-*`, `P-CT-*`, `P-RL-*`, `P-GT-*`, `P-GU-*`, `P-GS-*`, `P-ZN-*`, `P-CN-*`,
`P-PJ-*`, `P-LH-*`, `P-SH-*`). **The three families are the type algebra `docs/specs/engine-pin.md` `§5.5` pins:**
**`IM`** = injected seams, carried data and invariants · **`SM`** = the emitted value's state classes and the
purity/statelessness discipline · **`TP`** = totality. **The strategy-id prefix is `S-TH-*`, ONE PER ROW —
TWELVE distinct ids: `S-TH-RESOLVE-1` · `S-TH-ENV-1` · `S-TH-ECHO-1` · `S-TH-REMOVAL-1` · `S-TH-STATE-1` ·
`S-TH-CONST-1` · `S-TH-TOTAL-1` · `S-TH-RULE-1` · `S-TH-ABSORB-1` · `S-TH-WRITE-1` · `S-TH-NOCALL-1` ·
`S-TH-COMPOSE-1`** — **of which ELEVEN are ENUMERATION strategies and ONE (`S-TH-TOTAL-1`) is the pinned-seed
GENERATOR.** **EACH ROW'S OWN CELL NAMES ITS ID, THE IDS ARE DISTINCT, AND NO ROW IS LEFT WITHOUT ONE.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/theme.test.ts`, `§4.1`/`§5.1`) — the file the
   red set already owes, and the file the register **rides as part of the red** (`§4.2` item 5). **No row of this
   register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript inside the
   test file.** **ONE row uses a generator** — `P-TH-TP-1` — and **it is pinned to literals in the test file
   itself: a hand-rolled 32-bit LCG with `state₀ = 20260927`; `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod
   2³²`; and EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state selecting the pool member —
   `index = stateₙ₊₁ mod pool.length`, with `pool.length = 12`** — so **one pool draw consumes exactly ONE LCG
   step.** **No `Math.random`, no wall-clock seed, no shrinking and no adaptive input search.** **Every other row's
   table is fixed and enumerated.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's remaining attempts
   are abandoned and no further row starts). **A register row is never refused on the ground that "no PBT harness
   exists."**
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** **No `§3` row is weakened,
   widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and
   **a row whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)`
   marking** (`§5.5.2` item 2).
6. **The register's own boundaries, named rather than silently relied on:** **(a) NO DOM, NO ELEMENT, NO OS, NO
   COORDINATE AND NO CSS RESOLUTION IS NEEDED OR USED BY ANY ROW** — every row drives **pure values, recording
   closures and throwing stubs**; **(b) the hostile shapes are FIXED table members, deliberately, so no draw is
   ambiguous**; **(c) each row's pool/table is a SUBSET of the input space this contract pins**, and **its silence
   about a shape it does not list is a stated boundary, not an unrecorded omission** — **the shapes deliberately
   EXCLUDED are named at `§5.5.2` item 4**; **(d) the row/claim map, printed so no row is quoted for another's
   claim: `P-TH-IM-1` the setting domain and the three-member census · `P-TH-IM-2` the strict environment reading ·
   `P-TH-IM-3` the name-echo rule · `P-TH-IM-4` the removal case · `P-TH-SM-1` the two records' state classes ·
   `P-TH-SM-2` cross-call constancy and freshness · `P-TH-TP-1` the module-wide totality universal ·
   `P-TH-TP-2` the no-precedence / no-derived-token rule · `P-TH-TP-3` the hostile-environment absorption ·
   `P-TH-TP-4` the name and removal degenerate arms (THE CROSS PRODUCT ROW) · `P-TH-TP-5` the no-call /
   removal-is-data row · `P-TH-TP-6` the composition reachability row — **and NO OTHER ROW MAY BE QUOTED FOR ANY
   OF THEM.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-TH-IM-1`** *(the setting domain, the pass-through and the returned census — the row that closes the "no shape gate" question for the resolver)* | `P-IM` invariant | **For EVERY one of the row's `12` declared setting shapes: `resolveTheme` returns the three-member record; `setting` is the CALLER's own non-empty string BY IDENTITY for shapes `(1)`–`(4)` and the declared `null` for the other `8`; the three members' names, order and types are exactly `§2.1`'s; NO member is a getter; the record's prototype is `Object.prototype`; `String()`/`toString`/`valueOf` are NEVER invoked; and `resolveTheme` THROWS FOR NONE.** | **YES (bounded — the property text says "EVERY setting shape" while the table drives `12` shapes and the universal is NOT proven)** | `M-1`, `M-2`, `F-1`, `I-1`/`I-3`/`I-10`, `§2.3` items 1/4 | `S-TH-RESOLVE-1` | **`12` attempts** = **the `12`-shape setting pool, ONE DRIVE EACH.** **The `12` shapes:** **(1)** a short token (`'dark'`) · **(2)** a token this mechanism could plausibly "recognize" (`'system'`) · **(3)** a CASE variant (`'DARK'`) · **(4)** a WHITESPACE variant (`' dark '`) · **(5)** `''` (the empty string) · **(6)** the argument OMITTED (`undefined`) · **(7)** `null` · **(8)** a number (`0`, `-0`, `NaN`, `1`) · **(9)** a boolean (`true`, `false`) · **(10)** a `Symbol` and a `12n` · **(11)** an object, an array and a function — **including one whose `toString`/`valueOf` record their invocations** · **(12)** a revoked `Proxy` and a trap-throwing `Proxy`. **Per attempt assert:** the three-member key set in declared order; the `setting` value's identity (`toBe`) or its declared `null`; the member TYPES; the `toString`/`valueOf` invocation count (`0`); and that nothing threw. |
| **`P-TH-IM-2`** *(the environment reading's STRICTNESS on usable shapes — the REPORT, and the degradation's observability. **This row asserts the READING; the hostile pool is `P-TH-TP-3`'s, per step 4's correction 2**)* | `P-IM` invariant | **For EVERY one of the row's `8` usable environment shapes: `prefersDark` is the STRICT `=== true` reading of the SINGLE declared own member — `true` ONLY for a strictly-`true` own member, `false` for a strictly-`false` one — and `source` reports `'env'` in EVERY one of them; a SECOND member on the env object changes NOTHING; freezing changes NOTHING; the `setting` member is unaffected by the environment in every attempt; and NOTHING THROWS.** **IT ASSERTS THE READING AND ITS REPORT — never the absorption (that is `P-TH-TP-3`) and never the setting's provenance (`P-TH-TP-2`).** | **YES** *(a closed eight-Shape grid over one member and two `source` values, every cell with its own declared pair)* | `M-3`(a)/(b), `F-2`'s frozen case, `I-1`/`I-2`, `§2.3` item 2 rows (1)/(2)/(9) | `S-TH-ENV-1` | **`12` attempts** = **`8` usable env shapes × `1` reading each (`8`) + `4` further drives.** **The `8` shapes:** **(1)** `{prefersDark: true}` · **(2)** `{prefersDark: false}` · **(3)** a FROZEN `{prefersDark: true}` · **(4)** a null-prototype record with `prefersDark: true` **as its own member** · **(5)** `{prefersDark: true, extra: 'must-be-ignored'}` (the SECOND-MEMBER control: the reading is unchanged and the extra member is never read) · **(6)** an object whose `prefersDark` is `true` **by an OWN property descriptor that is non-enumerable** (the reading is asserted and its outcome declared for THIS contract: **the read is by own member, not by enumeration**, so the value is read) · **(7)** `{prefersDark: true}` with the setting drawn from `P-TH-IM-1`'s pool inside the attempt (the INDEPENDENCE assertion) · **(8)** the same as `(7)` with `{prefersDark: false}`. **The `4` further drives:** **(a)** a recording getter on `prefersDark` whose invocation count must be EXACTLY `1` per call (a module reading the member twice FAILS); **(b)** the same object driven TWICE, asserting the count rises by exactly `1` (no cache); **(c)** the `basis` value asserted against the declared `'env'` body BY NAME; **(d)** the second-member control's negative half — a corpus module that READS `extra` FAILS this row. **Per attempt assert:** the `prefersDark` boolean, the `basis` body, the getter count where one is installed, and that nothing threw. |
| **`P-TH-IM-3`** *(THE NAME-ECHO RULE, as its OWN row — **step 4's correction 3 (a)**)* | `P-IM` invariant | **For EVERY one of the row's `10` attribute-name shapes: the returned `name` is the CALLER's own non-empty string BY IDENTITY (`toBe`) for the echoed arms and the declared `null` for every other arm; NO trimming, NO case folding, NO prefixing and NO default attribute name ever occurs; `String()`/`toString`/`valueOf` are NEVER consulted for the name (recorded counts `0`); the write's `value`/`removal` members are INDEPENDENT of the name's shape; and NOTHING THROWS.** | **YES** *(a fixed `10`-shape table, every shape with its own declared value)* | `M-6`, `F-4`, `I-3`, `§2.4` item 1, `P-TH-7` | `S-TH-ECHO-1` | **`10` attempts** = **the `10` name shapes, ONE DRIVE EACH, each driven against a FIXED non-removal `resolved` (`'dark'`).** **The `10` shapes:** **(1)** `'data-x'` · **(2)** `'class'` (a spelling the module must merely ECHO) · **(3)** `''` · **(4)** the argument OMITTED (`undefined`) · **(5)** `null` · **(6)** a number (`42`, `NaN`) · **(7)** a boolean · **(8)** a `Symbol` and a `12n` · **(9)** an object carrying its own `toString`/`valueOf` (both invocation counts asserted `0`) · **(10)** a revoked `Proxy` whose access raises a `TypeError` (asserted ABSORBED, with `null` as the declared name). **Per attempt assert:** the echoed identity or the declared `null`; the two coercion-hook counts; the independence of `value`/`removal`; and that nothing threw. |
| **`P-TH-IM-4`** *(THE REMOVAL CASE, as its OWN row — the `H-r7` class represented as DATA)* | `P-IM` invariant | **For EVERY one of the row's `8` resolved shapes: the returned record's `removal` is `true` EXACTLY for the removal arms and `false` for every non-empty string arm; the removal case's `value` is EXACTLY `''`; a removal is NEVER signalled by an absent `value` member, a `null` value, a sentinel name or a fourth member; `'false'`, `'0'` and `' '` are LEGAL TOKENS and read as NON-removals; the `name` member is independent of the removal arm; and NOTHING THROWS.** | **YES** *(a fixed `8`-shape table with its own declared pair per shape)* | `M-5`, `F-3`, `I-3`/`I-10`, `§2.4` item 2, `P-TH-3` | `S-TH-REMOVAL-1` | **`8` attempts** = **the `8` resolved-value shapes, ONE DRIVE EACH, each driven against a FIXED valid name (`'data-x'`).** **The `8` shapes:** **(1)** `'dark'` · **(2)** `'false'` (a legal token, NOT a boolean) · **(3)** `'0'` (a legal token, NOT a number) · **(4)** `' '` (a whitespace-only token) · **(5)** `''` · **(6)** `null` · **(7)** the argument OMITTED (`undefined`) and a number/boolean/`Symbol`/`12n` in one attempt each (the non-string arms) · **(8)** an object, an array and a function. **Per attempt assert:** the `removal` boolean; the `value` (identity for the token arms, exactly `''` for the removal arms); the key set's exactness (no fourth member, no absent member); and that nothing threw. |
| **`P-TH-SM-1`** *(THE TWO RECORDS' DECLARED MEMBER CENSUS AND ORDER AS A STATE CLASS OF THE EMITTED VALUE — never as a state machine this model does not have)* | `P-SM` state-machine | **The returned value of each export lands in EXACTLY ONE declared SHAPE CLASS and the class is a function of the arguments ALONE: `resolveTheme` always returns the `{setting, prefersDark, source}` class (with `setting` in the carried arm, `null` in the absent arm, and `source` in the `'env'` or `'degraded-env'` arm); `applyThemeDeclaration` always returns the `{name, value, removal}` class (with `name` in the echoed or `null` arm and `removal` in the non-removal or removal arm). NO fourth member exists, NO class is reachable by data alone, and the module holds NO state between calls.** **IT ASSERTS THE CLASS; the constancy across repeated calls is `P-TH-SM-2`'s.** | **YES** *(two exports × their declared arms, each arm with its own declared member pair)* | `M-1`, `M-3`, `M-4`, `M-5`, `F-1`, `I-3`, `§2.1` items 1/2, `§2.4` item 4 | `S-TH-STATE-1` | **`6` attempts** = **`2` exports × `3` arms.** **`resolveTheme`'s `3` arms:** **(A)** the carried arm (`'dark'` with a strict-`true` env ⇒ `setting` carried + `prefersDark` `true` + `source` `'env'`) · **(B)** the absent-setting arm (`''`/`null`/omitted with the same env ⇒ `setting` `null`, the other two as in `(A)`) · **(C)** the degraded arm (a valid setting with a hostile env ⇒ `source` `'degraded-env'` and `prefersDark` `false`). **`applyThemeDeclaration`'s `3` arms:** **(D)** the echoed + non-removal arm · **(E)** the echoed + removal arm · **(F)** the `null`-name + removal arm. **Per attempt assert:** the exact three-name key set in declared order; each member's declared value; the ABSENCE of the other arms' signatures (a `'degraded-env'` source on a strict-`true` drive FAILS this row); and that no module-level binding is read or written. **The class is NOT a lifecycle**: no row here claims a transition, a session or a retained state. |
| **`P-TH-SM-2`** *(cross-call constancy and RECORD FRESHNESS — no cache, no drift, no shared record)* | `P-SM` state-machine | **For EVERY one of the row's `3` repeated-call shapes: five successive calls with the SAME arguments return EQUAL values (`toEqual`), each returned RECORD is a DISTINCT OBJECT (pairwise `!==` over distinct indices), the carried `setting`/`name`/`value` members are the caller's own values BY IDENTITY in every call, and NO observable state differs between the first and the fifth call.** | **YES** | `F-8`, `M-7`, `I-3`/`I-4`, `§2.4` item 4, `§5.5.1` method note 6(c) | `S-TH-CONST-1` | **`3` attempts** = **`3` repeated-call shapes, each driven FIVE times.** **The `3` shapes:** **(1)** `resolveTheme('dark', {prefersDark: true})` · **(2)** `resolveTheme('dark', {prefersDark: true})` **with a recording getter installed on the env member** (asserting the count is exactly `5` at the fifth call — a count of `6` FAILS this row for a cache) · **(3)** `applyThemeDeclaration('data-x', 'dark')` and its removal twin. **Per attempt assert:** the five values' mutual equality; the pairwise distinct-identity reading over the five returned records; the member-level identity; and the getter count on `(2)`. |
| **`P-TH-TP-1`** *(the MODULE-WIDE TOTALITY universal — with its BOUND in its own words, over a pinned-seed pool, and NAMING both entry points and both return shapes so the row can FAIL)* | `P-TP` totality | **For EVERY hostile shape drawn from the pinned `12`-member pool: (a) NEITHER ENTRY POINT THROWS — `resolveTheme(setting, env)` returns a `{setting, prefersDark, source}` record and `applyThemeDeclaration(attributeName, resolved)` returns a `{name, value, removal}` record — for ANY argument, INCLUDING `NaN`, a `Symbol`, a `12n`, `Object.create(null)`, a revoked `Proxy`, a trap-throwing `Proxy` and a throwing accessor; AND (b) THE DECLARED RETURN SHAPES HOLD on every draw: each record's `Object.keys` reads its three declared names in declared order and each member's type is the declared one. The drawn shape is supplied as the `setting`, as the `env`, as the `attributeName` and as the `resolved` in turn INSIDE each single attempt.** **The universal is over the DRAWN domain and NOT over the whole input space.** | **YES (bounded — the property text says "EVERY hostile shape" while the pool holds `12` members and the drive performs `12` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-1`, `F-2`, `F-4`, `I-1`, `I-10`, `M-7`, `§2.3` items 1/2/4 | `S-TH-TOTAL-1` | **`12` attempts** = **`12` pinned-seed DRAWS, each applying EXACTLY ONE LCG step (`index = stateₙ₊₁ mod 12`), each draw driven through BOTH entry points in sequence.** **THE `12`-MEMBER POOL:** **(1)** `Object.create(null)` with own keys · **(2)** `NaN` · **(3)** a `Symbol` · **(4)** a `12n` · **(5)** a revoked `Proxy` · **(6)** a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` traps THROW · **(7)** a record whose `prefersDark` accessor THROWS · **(8)** a self-referential record · **(9)** a `Map` · **(10)** a `Set` · **(11)** a function · **(12)** `[]` and a deeply nested array (one member, driven as both). **Per attempt assert:** every returned value's declared class; the three-member key sets in order; the member types; and that nothing threw — **including for the four POSITIONAL drives (as `setting`, as `env`, as `attributeName`, as `resolved`), which are ASSERTIONS inside the attempt and never extra drives.** |
| **`P-TH-TP-2`** *(THE NO-PRECEDENCE / NO-DERIVED-TOKEN RULE — **step 4's `R-10` row made a register row**)* | `P-TP` totality | **For EVERY one of the row's `12` (setting, env) PAIRS: the returned `setting` member is the caller's own token BY IDENTITY or the declared `null`, and it is NEVER a value derived from `prefersDark`; no comparison, branch, transition, override or tri-state member relates the two inputs; and the same setting reads the SAME `setting` member under BOTH a strict-`true` and a degraded environment.** **THE ROW CAN FAIL: a member-pool implementation returns a pool member instead of the caller's token and FAILS EVERY ATTEMPT whose setting is a pool-shaped string.** | **YES (bounded — the property text says "EVERY (setting, env) pair" while the table drives `12` pairs)** | `M-2`, `M-3`, `F-1`, `I-2`/`I-5`, `§2.3` item 3, `P-TH-10` | `S-TH-RULE-1` | **`12` attempts** = **`3` setting shapes × `4` env shapes.** **The `3` settings:** **(1)** a pool-shaped token (`'dark'`) · **(2)** a NON-pool token (`'my-app-theme'`) · **(3)** an out-of-domain shape (`42`). **The `4` envs:** **(i)** `{prefersDark: true}` · **(ii)** `{prefersDark: false}` · **(iii)** `{}` (missing) · **(iv)** a hostile shape from the pool. **Per attempt assert:** the `setting` member's IDENTITY against the caller's own string; the ABSENCE of any pool member in the return (`'dark'` may only appear because the CALLER supplied it); the `prefersDark` report's independence; and that nothing threw. **THE DISCRIMINATING CELLS, named: `(1)`×(i) versus `(1)`×(ii) must return the SAME `setting` — a precedence implementation returns two different ones.** |
| **`P-TH-TP-3`** *(THE HOSTILE-ENVIRONMENT ABSORPTION — the totality half of the env rule. **It asserts ABSORPTION AND ITS OBSERVABILITY, never the strict reading on a usable shape (that is `P-TH-IM-2`'s), per step 4's correction 2**)* | `P-TP` totality | **For EVERY one of the row's `11` hostile environment shapes: the reading lands on `false`, `source` reads `'degraded-env'`, NOTHING THROWS — the revoked `Proxy`'s `TypeError` and the throwing accessor's throw included — no member is fabricated, the `setting` member is unaffected, and the degradation is OBSERVABLE through `source` (so a module that silently reads `false` without reporting `'degraded-env'` FAILS this row).** | **YES (bounded — the property text says "EVERY hostile env shape" while the table drives `11`; the universal is NOT proven)** | `F-2`, `M-3`(c)/(d), `I-1`/`I-2`/`I-10`, `§2.3` item 2 rows (3)–(13) | `S-TH-ABSORB-1` | **`11` attempts** = **the `11` hostile shapes of `§2.3` item 2, ONE DRIVE EACH, each driven with a FIXED valid setting (`'dark'`).** **The `11`:** **(1)** the member MISSING (`{}`) · **(2)** `{prefersDark: undefined}` · **(3)** `{prefersDark: 'true'}` · **(4)** `{prefersDark: 'false'}` · **(5)** `{prefersDark: 1}` · **(6)** `{prefersDark: 0}` **and `NaN`** · **(7)** `{prefersDark: []}` **and `{}` and a function** · **(8)** `env` itself `undefined`/`null`/a non-object · **(9)** a record whose accessor THROWS · **(10)** a revoked `Proxy` **and** a trap-throwing `Proxy` · **(11)** **an INHERITED `env` — `Object.create({prefersDark: true})`** (the `NG-2` re-grain, TAKEN by the `2026-09-27` amendment, `§0A` note 8 item 3: **an inherited `true` is NOT a reading, so the pair is `false`/`'degraded-env'`**). **Per attempt assert:** `prefersDark === false`; `source === 'degraded-env'` BY NAME; the setting's identity; the absence of a fabricated member; and that nothing threw. **THE MIRROR CONTROL, named so the row is not vacuous: the SAME drive with `{prefersDark: false}` must read `source: 'env'` — a module reporting `'degraded-env'` for a legitimate `false` FAILS `P-TH-IM-2`.** |
| **`P-TH-TP-4`** *(THE NAME AND REMOVAL DEGENERATE ARMS, AS A CROSS PRODUCT — the correction that the two arguments are independent)* | `P-TP` totality | **For EVERY cell of the row's `4 × 4` cross product (`4` attribute-name shapes × `4` resolved shapes): the returned record's `name` follows the NAME rule and its `value`/`removal` follow the RESOLVED rule, INDEPENDENTLY — so a removal with an ECHOED name and a non-removal with a `null` name are both NORMAL, declared returns; every cell's key set is exactly the three declared names; and NOTHING THROWS in any cell.** | **YES** *(the `16`-cell grid is the declared extent, and every cell has its own declared triple)* | `F-3`, `F-4`, `F-5`, `I-3`, `§2.4` items 1/2, `P-TH-12` | `S-TH-WRITE-1` | **`8` attempts** = **`4` name shapes × `4` resolved shapes (`16` cells), reported as `8` DRIVES of `2` cells each — the pairing stated so the term is checkable.** **The `4` name shapes:** **(1)** `'data-x'` · **(2)** `''` · **(3)** omitted · **(4)** a non-string (`42`). **The `4` resolved shapes:** **(a)** `'dark'` · **(b)** `''` · **(c)** `null` · **(d)** a non-string (`42`). **Per attempt assert (for both its cells):** the echoed identity or the declared `null`; the `value`'s identity or exactly `''`; the `removal` boolean; the exact three-name key set; and that nothing threw. **THE TWO CELLS THAT MUST BE PRINTED, because they are the ones a coupled implementation gets wrong: `('' , 'dark')` ⇒ `{name: null, value: 'dark', removal: false}` and `('data-x', '')` ⇒ `{name: 'data-x', value: '', removal: true}`.** |
| **`P-TH-TP-5`** *(THE REMOVAL CASE IS DATA AND PERFORMS NO CALL — **step 4's correction 3 (c), an explicit row**)* | `P-TP` totality | **On EVERY removal drive of the whole register: (a) NO method is invoked on any argument — no `setAttribute`, no `removeAttribute`, no `classList`, no `setProperty`, no property WRITE on the caller's objects — asserted by driving each removal shape against a RECORDING PROXY/fake whose every `get`/`set`/`apply`/`has`/`deleteProperty`/`ownKeys` trap is counted; (b) the removal is represented ONLY by the `removal: true` member, never by a call, a throw, a sentinel name or an absent member; (c) the caller's own objects are byte-identical before and after; and (d) the module takes NO element parameter through which a call could be made.** | **YES — `(bounded)`** *(**`F4`'s marking, ADDED by the `2026-09-27` amendment, `§0A` note 8 item 2: the property text says "EVERY removal drive of the whole register" while the table drives `3` shapes × `2` instruments, so this contract's own rule owes the marking and the universal is NOT proven** — a closed drive set: every removal shape × the recording instrument, plus the two positive controls)* | `M-5`, `F-3`, `I-6`, `§2.4` item 3, `P-TH-9`, `H-r7` | `S-TH-NOCALL-1` | **`6` attempts** = **`3` removal shapes × `2` instrument configurations, PLUS nothing else.** **The `3` removal shapes:** **(1)** `resolved = ''` · **(2)** `resolved = null` · **(3)** `resolved` omitted. **The `2` instrument configurations:** **(i)** every argument (name AND resolved) is a recording `Proxy` whose traps count, **and** a fake element-shaped object is ALSO in scope (never passed to the module) with its own write counters; **(ii)** the same drive with the argument objects frozen. **Per attempt assert:** every trap count is `0`; the fake element's write counters are `0`; the returned record's exact three members; and that nothing threw. **THE TWO POSITIVE CONTROLS, named so the instrument is proven live: the DRIVER itself calls one method on the fake (count `1`) and writes one property on a proxy (count `1`); a run reading `0` for those FAILS this row as an INSTRUMENT failure.** **THE MARKING IS A COUNT OF ROWS AND MOVES NO TERM: this row's term stays `6`** (`§0A` note 8 item 2). |
| **`P-TH-TP-6`** *(THE COMPOSITION REACHABILITY ROW — both entry points reachable and returning their declared shapes in ONE pass-through composition)* | `P-TP` totality | **In ONE composition — `applyThemeDeclaration(name, resolveTheme(setting, env).setting)` — for EVERY one of the row's `6` composed shapes: both entry points are reachable from the module's imported namespace BY NAME; each returns its declared record; the composed `value` is the resolver's own `setting` member BY IDENTITY; the composed removal follows the resolved rule; NO state crosses the two calls (so the applier cannot depend on the resolver having run); and NOTHING THROWS.** | **YES** *(a fixed `6`-shape composed table, every shape with its own declared triple)* | `M-7`, `F-5`, `I-3`, `§2.1` item 1, `§3.4 R-5` | `S-TH-COMPOSE-1` | **`3` attempts** = **`3` composed shapes, each driven TWICE — once as the chained composition and once with the applier called FIRST on a literal token (`2` drives per attempt).** **The `3` composed shapes:** **(1)** `('data-x', resolveTheme('dark', {prefersDark: true}).setting)` · **(2)** `('data-x', resolveTheme('', {}).setting)` (the composed REMOVAL) · **(3)** `('', resolveTheme(42, {prefersDark: 1}).setting)` (both rules degraded at once). **Per attempt assert:** both records' key sets and member types; the composed `value`'s identity with the resolver's `setting`; the `removal` boolean; the `name` rule's independence; **and the ORDER-INDEPENDENCE half: the applier's result for the same `(name, resolved)` pair is identical whether or not the resolver was called first — a module with cross-call state FAILS here.** |

#### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

1. **THE ROW COUNT IS AN EXTENT, AND THE OVERSHOOT IS JUSTIFIED ONCE** (`§5.5`'s ruling block): **`12` rows / `12`
   terms, above the `≤8` breakdown SIGNAL, with the four separable properties step 4's corrections named each
   accounted for by their own row.** **THE BREAKDOWN RECOMMENDATION, restated: the setting half and the env half of
   `P-TH-IM-1` are separable in principle, and `P-TH-TP-1`'s module-wide universal could be split per entry point —
   splitting them is NOT owed, NOT done, and changes no term.**
2. **THE `(bounded)` MARKINGS ARE OWED WHEREVER A PROPERTY TEXT QUANTIFIES OVER A DOMAIN LARGER THAN ITS TABLE —
   and this register carries FIVE: `P-TH-IM-1` · `P-TH-TP-1` · `P-TH-TP-2` · `P-TH-TP-3` · `P-TH-TP-4`** — `5` of
   the `12` rows (`5 + 7 = 12`, so the count is checkable rather than asserted). **THE OTHER SEVEN quantify over
   closed named lists, fixed grids or closed drive sets.** **A row marked `(bounded)` IS NOT A PROOF of the
   unbounded universal it states, and no reader may read it as one.** **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8
   item 2; the as-filed `5`-row set above is KEPT VISIBLE): `F4`'s marking of `P-TH-TP-5` is ADDED, so the live set is
   SIX rows — `P-TH-IM-1` · `P-TH-TP-1` · `P-TH-TP-2` · `P-TH-TP-3` · `P-TH-TP-4` · `P-TH-TP-5` — and **`6 + 6 = 12`**.
   **THE MARKING IS A COUNT OF ROWS: IT MOVES NO TERM, and `P-TH-TP-5`'s term stays `6`.**
3. **THE DECLARED-VERSUS-DISTINCT LEDGER, printed because the DONE row must reconcile both** (`§5.3` item 11):

   | Row | Declared term | The honest DISTINCT-drive figure | What the difference is |
   | --- | --- | --- | --- |
   | `P-TH-IM-2` | `12` | `9` | **the `4` further drives share the `8` shapes' objects (`(7)`/`(8)` reuse `(1)`/`(2)`'s env; `(b)`/`(c)`/`(d)` are readings on already-driven objects)** |
   | `P-TH-SM-1` | `6` | `6` | none |
   | `P-TH-SM-2` | `3` | `3` | the five repetitions are **assertions inside one attempt**, not drives |
   | `P-TH-TP-1` | `12` | `12` | the four POSITIONAL drives are assertions inside one attempt |
   | `P-TH-TP-4` | `8` | `8` | the `16` cells are paired into `8` drives, and the pairing is stated in the cell |
   | `P-TH-TP-5` | `6` | `6` | none |
   | `P-TH-TP-6` | `3` | `3` | the second drive is inside the attempt |
   | `P-TH-IM-1` | `12` | `12` | none |
   | `P-TH-IM-3` | `10` | `10` | none |
   | `P-TH-IM-4` | `8` | `8` | none |
   | `P-TH-TP-2` | `12` | `12` | none |
   | `P-TH-TP-3` | `11` | `11` | none — **the `NG-2` inherited-`env` member is a FULL drive, so the declared term and the distinct figure BOTH move `10 → 11`** (`2026-09-27` amendment, `§0A` note 8 item 3; the as-filed pair was `10`/`10`) |
   | **THE FIVE ROWS ABOVE — `P-TH-IM-1` · `P-TH-IM-3` · `P-TH-IM-4` · `P-TH-TP-2` · `P-TH-TP-3` — PLUS `P-TH-SM-1` (already carried above at `6`/`6`) ARE THE SIX ROWS THE AS-FILED FORM OF THIS LEDGER'S LAST ROW MISLABELLED `"the other five rows"`** (`2026-09-27` amendment, `§0A` note 7 item 3) — ***THE AS-WRITTEN FORM, KEPT VISIBLE: "*(the other five rows)* | — | equal to their terms | no collapsing"*** — **the count was SIX, and the six rows are `P-TH-IM-1`, `P-TH-IM-3`, `P-TH-IM-4`, `P-TH-SM-1`, `P-TH-TP-2` and `P-TH-TP-3`, each with a distinct figure equal to its term.** **THIS IS A COUNT AND A NAMING CORRECTION ONLY: NO TERM, NO ROW ID, NO STRATEGY ID, NO SEED AND NO CAP MOVES.** | — | — |
   **THE LEDGER'S OWN TWO ADDITIONS, STATED ONCE SO THE FIGURES RECONCILE** (`2026-09-27` amendment, `§0A` note 7
   items 1/2): **`P-TH-TP-5` was OMITTED from this ledger as filed although `§5.5.1` declares its term as `6` — it is
   ADDED above with its declared `6` and its distinct `6`** (item 2); and **the twelve DISTINCT figures this ledger
   now carries are `12` (`IM-1`), `9` (`IM-2`), `10` (`IM-3`), `8` (`IM-4`), `6` (`SM-1`), `3` (`SM-2`), `12`
   (`TP-1`), `12` (`TP-2`), `10` (`TP-3`), `8` (`TP-4`), `6` (`TP-5`) and `3` (`TP-6`) — their own sum, printed
   with its terms and its own chain at `§5.5.3`, is `99` (`12 + 9 + 10 + 8 + 6 + 3 + 12 + 12 + 10 + 8 + 6 + 3 =
   99`).** **THE DISTINCT FIGURE IS A REPORTED FIGURE AND IS NEVER SUBSTITUTED FOR THE
   DECLARED TOTAL.** **The caps compare against the DECLARED figures** (`102 ≤ 400`; largest row `12 ≤ 100`) —
   **and the two figures, each with its own terms and its own sum, are printed at `§5.5.3` so a DONE row
   reconciling DECLARED versus DISTINCT has an authority for BOTH.**
   **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8 items 3/4; the paragraph immediately above, KEPT VISIBLE, is the
   AS-FILED form and is STALE ON THE TWO FIGURES IT CARRIES): the `NG-2` re-grain is TAKEN, so `TP-3`'s pair is
   `11`/`11` and the twelve DISTINCT figures are `12` · `9` · `10` · `8` · `6` · `3` · `12` · `12` · **`11`** · `8` ·
   `6` · `3`, whose own sum is **`100`** (`12 + 9 + 10 + 8 + 6 + 3 + 12 + 12 + 11 + 8 + 6 + 3 = 100`); and the caps
   compare against the DECLARED figure **`103`** (`103 ≤ 400`; largest row `12 ≤ 100`).** **AND `F7`'s CORRECTION,
   RECORDED AS A TEXT-OF-METHOD NOTE AND NOT AS A CONTRACT CHANGE (`§0A` note 8 item 4): THIS ITEM'S LAST LEDGER ROW
   IS TITLED *"THE FIVE ROWS ABOVE … PLUS `P-TH-SM-1` … ARE THE SIX ROWS THE AS-FILED FORM … MISLABELLED `"the other
   five rows"`"* — and **the SIX that title counts are the rows whose distinct figure EQUALS its term**, NOT rows that
   DIFFER.** **THE LEDGER EXPECTS **ONE** DIFFERING ROW — `P-TH-IM-2`'s `12 → 9` — and the title's own `"the six rows
   whose distinct figure DIFFERS"` READING was the AS-WRITTEN Wording this annotation CORRECTS to the ledger's own
   reading, kept visible verbatim: *"the six rows whose distinct figure differs"*.** **NO FIGURE, TERM, ROW ID,
   STRATEGY ID, SEED OR CAP MOVES BY THIS CORRECTION.**
4. **THE SHAPES DELIBERATELY EXCLUDED FROM EVERY POOL — named as a STATED BOUNDARY rather than left implied:**
   **(a)** a **lone-surrogate string** as a `setting` (it would exercise no rule this contract pins, and its only
   observable is identity pass-through, which shape `(1)`–`(4)` already assert) · **(b)** a **`Symbol.toPrimitive`
   that throws only on its SECOND invocation** (it would make a draw's count ambiguous, and this module consults no
   coercion hook at all — `P-TH-IM-1`'s count-`0` assertion is the stronger claim) · **(c)** a **holder whose
   getter returns different answers on successive reads** (equally ambiguous for a draw; `P-TH-IM-2`'s double-read
   drive asserts the count instead). **NONE of the three is an unrecorded omission, and a pass that wants one
   driven owes a NEW dated amendment and a register re-grain under `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.**
5. **THE POOL-VERSUS-BOUNDARY CHECK, RUN AT FILING — and its honest result.** **Each row's pool/table was read
   against its own boundary text, and the check is CLEAN for all `12` rows**: every pool member is consistent with
   the row's declared domain, no `(bounded)` row's cell claims its grid IS the domain, and no unmarked row
   quantifies over an open domain. **A `(bounded)` marking that is missing is a SPEC FINDING, and a marking that
   is present on a closed-domain row is OVER-STRENGTH.**
6. **THE NESTED-HOSTILE / RECURSION HAZARD, NAMED BECAUSE THE FAMILY HAS BEEN BITTEN BY IT** (`docs/specs/
   menulib.md`'s `A-1`/`PBT-F4`): **this unit has NO recursion and NO nested read** — its reads are **one `typeof`,
   one own-member read and two emptiness tests** — **so the hazard class is structurally absent, and the row that
   would expose it is `P-TH-TP-1`, whose pool includes `(8)` a self-referential record and `(12)` a deeply nested
   array.** **A pass that finds a recursion here is finding a contract violation, not a boundary.**
7. **WHAT THIS REGISTER CANNOT PROVE, stated so no DONE row over-reads it: it proves NOTHING about an applied
   attribute, a stylesheet, a rendered control, a dark-mode rendering, an OS preference, persistence, or the app.**
   **Every claim above is a value, a count, a key-set name or a file-property claim over arguments** — and **the
   one class that would have been `[U]`-shaped is REFUSED at filing time and carries NO row at all** (`§5.2`).
8. **THE `source` SPELLING IS NOW RULED AND THE TWO TYPE NAMES REMAIN DEFAULTS, NOT RULINGS** (`§4.4 S-TH-11`):
   **`P-TH-IM-2`, `P-TH-SM-1`, `P-TH-TP-3` and `P-TH-TP-4` read `source`'s body by NAME — and the 2026-09-27 spec
   gate's RENAME (`basis` → `source`) settled that spelling, changing those four cells' expectation STRINGS and
   moving NO term, NO row id, NO strategy id, NO seed, NO cap and NO shape (`§0A` note 6).** **THE AS-FILED FORM OF
   THIS ITEM read: *"THE `basis` SPELLING AND THE TWO TYPE NAMES ARE DEFAULTS, NOT RULINGS … a reversal of `A-2`
   re-grains those four cells' expectation STRINGS"* — kept visible per the annotate-never-rewrite convention, and
   read as the FILING-time state: a reversal of `A-2` is no longer available (the item is CLOSED), while a change to
   either TYPE name still owes a gate.**
9. **THE CROSS-ROW ASSERTIONS, printed BESIDE the terms and NEVER counted inside them** (`A DECLARED REGISTER TERM
   IS A DRIVE COUNT`): **(1)** the three-member key set of BOTH records is asserted on EVERY attempt of the whole
   register; **(2)** the `toString`/`valueOf` count-`0` claim is asserted on every attempt whose argument object
   carries them; **(3)** the "nothing threw" claim is asserted on every attempt of every row; **(4)** the
   no-module-level-mutable-binding reading is a **static companion assertion** reported beside the terms; and
   **(5)** the no-element-parameter reading is a **static** claim (`R-12`'s sibling) reported beside them.
10. **THE ONE COVERAGE GAP THIS REGISTER RECORDED RATHER THAN HID — NOW DRIVEN, SO THE OBLIGATION IS DISCHARGED
    AND ITS AS-FILED FORM IS KEPT VISIBLE:** **the `env` member's OWN-vs-INHERITED distinction is driven in
    `P-TH-IM-2` shape `(4)` (an own member on a null-prototype record) but NOT as one
    `P-TH-TP-3` hostile member** — **so an environment record that INHERITS `prefersDark: true` is a RECORDED
    OBLIGATION with a named owner (the TestWriter), not a silent absence.** **Its pre-committed re-grain, if a
    later pass drives it: `P-TH-TP-3` `10 → 11`, total `102 → 103`, `TP 51 → 52`.** **⟶ POST-ANNOTATION
    (`2026-09-27`, `§0A` note 8 item 3): THE OBLIGATION IS DISCHARGED — the TestWriter authored the inherited-`env`
    drive (`Object.create({prefersDark: true})`) as `P-TH-TP-3`'s `11`th hostile member (and into `F-2`'s pool), so
    the re-grain IS TAKEN exactly as pre-committed: `P-TH-TP-3` `10 → 11`, DECLARED total `102 → 103`, DISTINCT total
    `99 → 100`, `TP` family subtotal `51 → 52` (both figures), and the `(bounded)` marked set of this item's sibling
    `5 → 6` ROWS — every figure printed with its own terms, chain, subtotals and cap re-check at `§5.5.3`, and NO
    TERM OTHER THAN `P-TH-TP-3`'S MOVED.** **THE GAP IS CLOSED; THE OWN-vs-INHERITED RULE ITSELF IS PINNED AT `§2.3`
    item 2 (rows `(12)`/`(13)`) and its `F1` half is dispositioned at `§3b`'s `AMEND-1`.**

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**⟶ THIS SECTION CARRIES TWO FIGURES, AND THIS ONE SENTENCE IS THE AUTHORITY FOR WHICH IS WHICH (`2026-09-27`
amendment, `§0A` note 7 item 1): THE DECLARED FIGURE `102` IS THE SUM OF THE TWELVE DECLARED ROW TERMS AND IS THE
FIGURE EVERY CAP COMPARISON USES, WHILE THE DISTINCT FIGURE `99` IS THE SUM OF THE TWELVE DISTINCT-DRIVE FIGURES
`§5.5.2` item 3's ledger reports and is the figure a reconciliation of DECLARED versus DISTINCT uses — the two are
DIFFERENT FIGURES, each with its own terms and its own sum, and NEITHER substitutes for the other.** **THE AS-FILED
FORM BELOW PRINTED ONLY THE `102` CHAIN; it is KEPT VISIBLE, and this amendment ADDS the `99` block beside it.**
**NO TERM, ROW ID, STRATEGY ID, SEED OR CAP MOVES.** **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8 item 3: the
sentences above are the as-written PRE-GRAIN authority and are KEPT VISIBLE): the `NG-2` re-grain is now TAKEN, so the
LIVE pair this section carries is the DECLARED figure `103` (the sum of the twelve declared row terms — `P-TH-TP-3`'s
term having moved `10 → 11` — and the figure every cap comparison now uses) and the DISTINCT figure `100` (the sum of
the twelve distinct-drive figures `§5.5.2` item 3's ledger reports after the same move). EACH is printed below with its
own terms, its own eleven-step chain, its own family subtotals and its own cap re-check, and the AS-FILED pair
(`102`/`99`) is printed beside it. NO TERM OTHER THAN `P-TH-TP-3`'S MOVES, and NO ROW ID, STRATEGY ID, SEED OR CAP
MOVES.**

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses.** **⟶ POST-ANNOTATION
(`2026-09-27`, `§0A` note 8 item 3): THE FIGURES PRINTED IN THIS BLOCK ARE THE **AS-FILED** FIGURES (`102`, the chain
ending `… 99 → 102`, `P-TH-TP-3`'s term `10`), KEPT VISIBLE per annotate-never-rewrite; the LIVE figures, after the
`NG-2` re-grain, are the block printed immediately below this one: DECLARED `103` with the amended term row.** **NO TERM
OTHER THAN `P-TH-TP-3`'S MOVES, in either block.**

**AS FILED — `102` = `12` + `12` + `10` + `8` + `6` + `3` + `12` + `12` + `10` + `8` + `6` + `3`**

**THE DECLARED CHAIN, the twelve terms summed as a chain of eleven steps: `12` → `24` → `34` → `42` → `48` →
`51` → `63` → `75` → `85` → `93` → `99` → `102`.** **⚠ THE `99` THIS CHAIN PASSES THROUGH AT ITS ELEVENTH STEP IS
A RUNNING DECLARED SUBTOTAL AND IS **NOT** THE DISTINCT FIGURE `99` OF `§5.5.2` item 3 — the two `99`s are a
COINCIDENCE OF ARITHMETIC and must never be quoted for one another** (`§0A` note 7 item 1).

**⟶ THE LIVE DECLARED TOTAL, AFTER THE `NG-2` RE-GRAIN (`2026-09-27`, `§0A` note 8 item 3) — the figure every cap
comparison now uses:**

**`103` = `12` + `12` + `10` + `8` + `6` + `3` + `12` + `12` + `11` + `8` + `6` + `3`**

**THE LIVE DECLARED CHAIN: `12` → `24` → `34` → `42` → `48` → `51` → `63` → `75` → `86` → `94` → `100` → `103`**
— **eleven steps, and the ONLY step that differs from the as-filed chain is the ninth (`75` → `86` rather than `75` →
`85`, i.e. `P-TH-TP-3`'s `10 → 11`).** **⚠ THE `100` THIS CHAIN PASSES THROUGH AT ITS ELEVENTH STEP IS A RUNNING
DECLARED SUBTOTAL — the same coincidence class the as-filed note above records for its own two `99`s: it is NOT
automatically the live DISTINCT figure, which happens to read `100` as well, and neither may be quoted for the other.**

| The term (AS FILED) | Its row | The enumeration that produces it |
| --- | --- | --- |
| **`12`** | `P-TH-IM-1` | the `12`-shape setting pool, one drive each |
| **`12`** | `P-TH-IM-2` | `8` usable env shapes (`8`) **+ `4` further drives** |
| **`10`** | `P-TH-IM-3` | the `10` attribute-name shapes, one drive each |
| **`8`** | `P-TH-IM-4` | the `8` resolved-value shapes, one drive each |
| **`6`** | `P-TH-SM-1` | `2` exports × `3` arms |
| **`3`** | `P-TH-SM-2` | `3` repeated-call shapes, each driven five times (the repetitions are ASSERTIONS inside one attempt) |
| **`12`** | `P-TH-TP-1` | `12` pinned-seed draws × `1` two-entry-point sweep each (the `4` positional drives are ASSERTIONS inside the attempt) |
| **`12`** | `P-TH-TP-2` | `3` setting shapes × `4` env shapes |
| **`10`** → **`11`** | `P-TH-TP-3` | **AS FILED: the `10` hostile env shapes, one drive each. LIVE (`NG-2`, `§0A` note 8 item 3): `11` — the tenth plus an INHERITED `env` (`Object.create({prefersDark: true})`), one drive each** |
| **`8`** | `P-TH-TP-4` | `4` name shapes × `4` resolved shapes (`16` cells) **reported as `8` drives of `2` cells each** |
| **`6`** | `P-TH-TP-5` | `3` removal shapes × `2` instrument configurations — **now `(bounded)` (`F4`), a ROW marking, term UNMOVED** |
| **`3`** | `P-TH-TP-6` | `3` composed shapes, each driven twice (`2` drives per attempt) |

**THE TERM-BY-TERM ADDITION, so the total is checkable rather than asserted** *(the order is `§5.5.1`'s row
order; **AS FILED**)**: **`12` + `12` = `24`** · **`+ 10` = `34`** · **`+ 8` = `42`** · **`+ 6` = `48`** · **`+ 3` = `51`** ·
**`+ 12` = `63`** · **`+ 12` = `75`** · **`+ 10` = `85`** · **`+ 8` = `93`** · **`+ 6` = `99`** · **`+ 3` =
`102`.** **ELEVEN steps, the first term being the chain's own first figure.**

**THE LIVE TERM-BY-TERM ADDITION (`NG-2`, `§0A` note 8 item 3): `12` + `12` = `24`** · **`+ 10` = `34`** ·
**`+ 8` = `42`** · **`+ 6` = `48`** · **`+ 3` = `51`** · **`+ 12` = `63`** · **`+ 12` = `75`** · **`+ 11` = `86`** ·
**`+ 8` = `94`** · **`+ 6` = `100`** · **`+ 3` = `103`.** **ELEVEN steps, the first term being the chain's own
first figure.**

**THE FAMILY SUBTOTALS, stated consistently with that addition.** **AS FILED: `IM` = `12 + 12 + 10 + 8` = `42`** · **`SM` =
`6 + 3` = `9`** · **`TP` = `12 + 12 + 10 + 8 + 6 + 3` = `51`** — and **`42 + 9 + 51 = `102` = the as-filed declared
total.** **LIVE: `IM` = `42` (UNMOVED)** · **`SM` = `9` (UNMOVED)** · **`TP` = `12 + 12 + 11 + 8 + 6 + 3` = `52`** — and
**`42 + 9 + 52 = `103` = the live declared total.**

**CAPS RE-CHECKED AGAINST IT — BOTH FIGURES, AS THE INSTRUCTION OWES (`§0A` note 8 item 3).** **AS FILED: `102 ≤ 400`
(total headroom `298`), largest row `12 ≤ 100` (headroom `88`).** **LIVE (the figures the caps are compared against
NOW): `103 ≤ 400`** (total headroom `297`)**, largest row `12 ≤ 100`** (headroom `88`) — **both caps HOLD under either
figure, and neither is close.** **THE CAPS ARE COMPARED AGAINST THE DECLARED FIGURE — `103` live, `102` as filed — AND
NEVER AGAINST THE DISTINCT FIGURE `100` (`99` as filed)** (`§5.5.2` item 3's own sentence).

**⟶ THE DISTINCT TOTAL, PRINTED WITH ITS OWN TERMS AND ITS OWN CHAIN — THE SECOND FIGURE, ADDED BY THE `2026-09-27`
AMENDMENT (`§0A` note 7 item 1; the source of every figure is `§5.5.2` item 3's DECLARED-VERSUS-DISTINCT LEDGER,
which is the authority for the distinct half).** **THE FIGURES PRINTED IN THIS BLOCK ARE THE **AS-FILED** FIGURES
(`99`, the chain ending `… 96 → 99`, `P-TH-TP-3`'s distinct `10`), KEPT VISIBLE per annotate-never-rewrite; the LIVE
distinct figure after the `NG-2` re-grain is **`100`**, and its terms, chain, subtotals and cap relation are printed
in the block immediately below this one.**

**AS FILED — `99` = `12` + `9` + `10` + `8` + `6` + `3` + `12` + `12` + `10` + `8` + `6` + `3`**

| The DISTINCT term (AS FILED) | Its row | Where the difference from the declared term comes from |
| --- | --- | --- |
| **`12`** | `P-TH-IM-1` | none (`§5.5.2` item 3: no collapsing) |
| **`9`** | `P-TH-IM-2` | the `4` further drives share the `8` shapes' objects |
| **`10`** | `P-TH-IM-3` | none |
| **`8`** | `P-TH-IM-4` | none |
| **`6`** | `P-TH-SM-1` | none |
| **`3`** | `P-TH-SM-2` | the five repetitions are assertions inside one attempt, not drives |
| **`12`** | `P-TH-TP-1` | the four POSITIONAL drives are assertions inside one attempt |
| **`12`** | `P-TH-TP-2` | none |
| **`10`** → **`11`** | `P-TH-TP-3` | **AS FILED: none. LIVE (`NG-2`, `§0A` note 8 item 3): the inherited-`env` member is a FULL drive, so the distinct figure moves `10 → 11` — and it still EQUALS its own term (`11`/`11`), so it is NOT a differing row** |
| **`8`** | `P-TH-TP-4` | the `16` cells are paired into `8` drives |
| **`6`** | `P-TH-TP-5` | none |
| **`3`** | `P-TH-TP-6` | the second drive is inside the attempt |

**THE DISTINCT CHAIN, the twelve distinct terms summed as a chain of eleven steps: `12` → `21` → `31` → `39` → `45` →
`48` → `60` → `72` → `82` → `90` → `96` → `99`.** **(AS FILED.)**

**THE DISTINCT TERM-BY-TERM ADDITION, so THAT total is checkable rather than asserted** *(the order is `§5.5.1`'s row
order; **AS FILED**)**: **`12` + `9` = `21`** · **`+ 10` = `31`** · **`+ 8` = `39`** · **`+ 6` = `45`** · **`+ 3` = `48`** ·
**`+ 12` = `60`** · **`+ 12` = `72`** · **`+ 10` = `82`** · **`+ 8` = `90`** · **`+ 6` = `96`** · **`+ 3` = `99`.**
**ELEVEN steps, the first term being the chain's own first figure.**

**⟶ THE LIVE DISTINCT TOTAL, AFTER THE `NG-2` RE-GRAIN (`2026-09-27`, `§0A` note 8 item 3):**

**`100` = `12` + `9` + `10` + `8` + `6` + `3` + `12` + `12` + `11` + `8` + `6` + `3`**

**THE LIVE DISTINCT CHAIN: `12` → `21` → `31` → `39` → `45` → `48` → `60` → `72` → `83` → `91` → `97` → `100`** —
**eleven steps, and the ONLY step that differs from the as-filed chain is the ninth (`72` → `83` rather than `72` →
`82`, i.e. `P-TH-TP-3`'s distinct `10 → 11`).** **⚠ THE `100` THIS CHAIN ENDS ON AND THE `100` THE LIVE DECLARED
CHAIN PASSES THROUGH AT ITS ELEVENTH STEP ARE THE SAME NUMERAL FOR TWO DIFFERENT FIGURES — a COINCIDENCE OF
ARITHMETIC of the exact class the as-filed `99`/`99` note records, and neither may be quoted for the other**

**THE LIVE DISTINCT TERM-BY-TERM ADDITION: `12` + `9` = `21`** · **`+ 10` = `31`** · **`+ 8` = `39`** ·
**`+ 6` = `45`** · **`+ 3` = `48`** · **`+ 12` = `60`** · **`+ 12` = `72`** · **`+ 11` = `83`** · **`+ 8` = `91`** ·
**`+ 6` = `97`** · **`+ 3` = `100`.** **ELEVEN steps, the first term being the chain's own first figure.**

**THE TWO FIGURES' RELATION, printed so it is arithmetic rather than prose — BOTH READINGS, AS THE AMENDMENT OWES:
AS FILED, `102 − 99 = 3`; LIVE, `103 − 100 = 3`, and in EITHER reading the difference is ENTIRELY `P-TH-IM-2`'s
`12 → 9` collapse (`−3`) — the as-filed reading `102 − 12 + 9` names the same three attempts, and now ALL TWELVE rows
except `P-TH-IM-2` show a distinct figure equal to their term, so `100` and `103` agree on ELEVEN of the twelve terms
and **THE LIVE LEDGER EXPECTS **ONE** DIFFERING ROW (`P-TH-IM-2`), which is `F7`'s correction, recorded at `§5.5.2`
item 3.**
**THE DISTINCT FAMILY SUBTOTALS, stated consistently with that addition — BOTH READINGS: AS FILED, `IM` = `12 + 9 + 10
+ 8` = `39`** · **`SM` = `6 + 3` = `9`** · **`TP` = `12 + 12 + 10 + 8 + 6 + 3` = `51`** — and **`39 + 9 + 51` = `99` =
the as-filed distinct total.** **LIVE: `IM` = `12 + 9 + 10 + 8` = `39` (UNMOVED)** · **`SM` = `9` (UNMOVED)** · **`TP` =
`12 + 12 + 11 + 8 + 6 + 3` = `52`** — and **`39 + 9 + 52` = `100` = the live distinct total.** **THE DECLARED FAMILY
SUBTOTALS ARE `42` / `9` / `51` (as filed) and `42` / `9` / `52` (live, `§5.5.3` above); the DISTINCT ones are
`39` / `9` / `51` (as filed) and `39` / `9` / `52` (live), and in EITHER reading the two sets differ ONLY in `IM` —
by exactly the `3` attempts `P-TH-IM-2`'s collapse accounts for.**

**THE DISTINCT FIGURE IS A REPORTED FIGURE AND IS NEVER SUBSTITUTED FOR THE DECLARED TOTAL; and a DONE row that
prints one of the two WITHOUT its terms, or that prints a total that is not the sum of its own terms, is a review
finding** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; `§5.3` item 11).

**THE `(bounded)` SET: AS FILED, `5` of the `12` rows — `P-TH-IM-1` · `P-TH-TP-1` · `P-TH-TP-2` · `P-TH-TP-3` ·
`P-TH-TP-4`; LIVE, `6` rows — those five PLUS **`P-TH-TP-5`** (`F4`'s marking, `§0A` note 8 item 2: **a ROW count, and
its term stays `6`**)** (`§5.5.2` item 2).

**THE ROW/TERM RECONCILIATION, printed so it is checkable:** **the `12` ROWS and their terms are `IM-1` (`12`) ·
`IM-2` (`12`) · `IM-3` (`10`) · `IM-4` (`8`) · `SM-1` (`6`) · `SM-2` (`3`) · `TP-1` (`12`) · `TP-2` (`12`) ·
`TP-3` (`11` LIVE; `10` as filed) · `TP-4` (`8`) · `TP-5` (`6`) · `TP-6` (`3`)** — **`12` rows (`4` `IM` + `2` `SM` + `6`
`TP`), `12` TERMS (one per row, with NO row carrying a second term), and the DECLARED total is `103` LIVE (`102` as
filed) — with the DISTINCT total `100` LIVE (`99` as filed) printed beside it, from the same twelve rows' distinct
figures, and NO term substituted for another** (`§0A` note 8 item 3).**

**THE PINNED SEED AND ITS FORM: `20260927`**, one hand-rolled 32-bit LCG step per draw
(`stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`), `index = stateₙ₊₁ mod pool.length` with **`pool.length =
12`**, for the register's **ONE** generator row (`P-TH-TP-1`, `S-TH-TOTAL-1`).

**NO NEW DEPENDENCY, NO SIXTH LEG, NO `package.json` CHANGE:** the register rides `npm test` (leg 1) unchanged, and
**an un-run register row is reported as a FAILURE, never as a pass.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly. Each half names the rows that would fail.**

1. **THE RESOLVER HALF.** *If a pure, total, stateless `resolveTheme(setting, env)` cannot return the declared
   three-member resolution for every input in its enumerated domains — carrying the caller's own token by identity,
   declaring `null` without ever consulting a coercion hook, and reading the single environment member strictly
   while reporting the degradation — then the mechanism half is not realisable **the way `A-d6` pins it**, and the
   unit fails on that half.* **The tests are `M-1`/`M-2`/`M-3`, `F-1`/`F-2`, `I-1`/`I-2`/`I-10`, `R-1`/`R-5`, and
   the register rows `P-TH-IM-1`/`P-TH-IM-2`/`P-TH-TP-1`/`P-TH-TP-3`.**
2. **THE APPLIER HALF.** *If a pure, total, stateless `applyThemeDeclaration(attributeName, resolved)` cannot
   return the declared three-member write for every input — echoing a non-empty name by identity, declaring `null`
   for every unusable name, and representing the removal case as `removal: true` DATA rather than as a call — then
   the `Q2` pin is not realisable and the unit fails.* **The tests are `M-4`/`M-5`/`M-6`, `F-3`/`F-4`,
   `I-3`/`I-6`, `R-8`/`R-12`, and the register rows `P-TH-IM-3`/`P-TH-IM-4`/`P-TH-TP-4`/`P-TH-TP-5`.**
3. **THE BOUNDARY HALF.** *If this unit cannot be stated without an import edge to any sibling, without a token
   name or token value in its bytes, without owning the attribute name, without an OS read, without a store and
   without a write — then the unit is not the mechanism `A-d6` adopted, and the unit fails.* **The tests are
   `R-1`/`R-2`/`R-3`/`R-4`/`R-6`/`R-7`/`R-8`/`R-10`/`R-11`, `F-6`/`F-7`, `I-5`/`I-7`/`I-8`/`I-9`, and the register
   rows `P-TH-TP-2`/`P-TH-TP-5`/`P-TH-TP-6`.**
4. **THE LAYER HALF.** *If any row of this unit can only be falsified on a layer this repo does not own — an
   applied attribute, a resolved `color-scheme`, a rendered control, an OS preference — then the
   `STRUCTURAL`/three-part refusal is not honest, gate 6 is not `STRUCTURAL`, and the unit fails.* **The tests are
   `§5.2`'s block itself, `I-11`, `S-TH-10`, and the falsifier printed at `§5.1`'s end.**

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause is found
and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded **before** implementation
continues; **(c)** the unit is **declined back** — admissible only if a clause is shown to be **inseparable from
reading an OS, writing to an element or owning a token vocabulary** (which would refute `A-d6`'s reshaped surface
and require the architect's dated annotation, not a spec edit) or **insurmountable without a store** (which would
refute ruling 3 and owe a NEW GATE), and **either would be a NEW GATE, not this unit's call.**

**Stop conditions (`S-TH-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row whose
assertion cannot be falsified on `[T]`/`static` is NOT silently dropped and is NOT moved to a `[U]`/`[D]` leg** — it
is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This filing has NO such
candidate**: **every claim in `§5.5.1` is a value, a count, a key-set name or a file-property claim over
arguments**, and **the one class that would have been `[U]`-shaped — an applied attribute, a stylesheet's
resolution, a rendered control and any OS preference — is REFUSED at filing time and carries NO row at all**
(`§5.2`).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **two new spec
   files** and **nothing else**. The module, the test file, the red set, the legs, the register's executed layer and
   every gate after gate 1 are **OWED**; **the unit is NOT delegable until a TestWriter has RUN and REPORTED the red
   set** (`§4.5`).
2. **THE OS-FACING HALF IS REFUSED, NOT PARKED, AND THE REFUSAL IS THE HONEST FORM.** **No instrument on any layer
   this repo owns reads an applied appearance back** (`§5.2`'s reader question: `NONE`). **No pass may claim this
   unit's green proves that an attribute exists on an element, that a stylesheet reacted, that the app renders
   differently in dark mode, that `prefersDark` matched an operating system, or that persistence survives a
   restart.**
3. **THE REMOVAL CASE IS DATA, AND THAT IS THE WHOLE OF THIS UNIT'S RELATIONSHIP TO `H-r7`.** **The admitted shim
   member (`ShimElement.removeAttribute`) is NOT used, NOT needed and NOT touched by this unit**, and **the
   `E5-B-1` precedent — *"the module RETURNS the declaration TEXT and the consumer applies it"* — is this unit's
   applier's exact sibling**: **`returned` is not `written`, in the same sense and for the same reason.**
4. **THE LAYER DECISION IS STRUCTURAL, AND IT IS RECORDED AS SUCH RATHER THAN AS A WAIVER.** **`[U]` is not offered
   (the three-part refusal, `§5.2`); `[D]` is not claimed; gate 6 is `STRUCTURAL`, never `waived`; and the `§7.1`
   predicate decision is `DOES NOT TRIGGER` with its evidence and its falsifier.** **Any pass that reports gate 6
   as *"waived"*, or that moves a rejected row to the `ui` leg, is citing a clause this file does not contain.**
5. **THE UNIT IS READABLE WITH THE DEMO DELETED — and that is a REQUIREMENT OF THE RULING, not a claim about the
   demo.** **No clause of `§2`–`§5` names `src/shared/demo-envelope.ts`, the authored control, or any demo key;
   `§5.1` DENIES the demo path and the renderer; and `§3.4 R-11` is the row that can FAIL for a reference to
   `F1`'s surface.** **A pass that finds a demo-keyed clause in this file is finding a defect in this file.**
6. **THE PAGE-DESIGN LAYER DOES NOT EXIST, AND THIS UNIT RENDERS NO PAGE** — so **there is no test-use-case
   coverage matrix and no demo-page index to update** (`R-9`'s probe; `docs/skills/` holds
   `process-guardrails.md` alone, globbed this pass). **If `docs/skills/designing-pages.md` comes to exist, this
   unit owes the coverage row and the demo-page entry — and the honest form of that row is an ABSENCE row,
   because a mechanism that renders nothing contributes no page.**
7. **`prefersDark` IS A CALLER CLAIM, NOT AN OBSERVATION.** **The module detects nothing about an operating
   system, a display, a user setting or a media query** (`R-7`), and **the environment record is the caller's own
   claim about its own environment** — **the honest reading of the whole injected-env claim is *"for a caller that
   supplies `{prefersDark: true}`, one member of the returned record reads `true` and one reads `'env'`."***
8. **THE `THEME` TOKEN'S COLLISION IS SPELLING, AND THE BAN IT RUNS INTO IS ANOTHER MODULE'S SCAN SCOPE.**
   `docs/specs/menulib.md` `§3.4 R-1` bans `theme` **inside its own module's source scan**; **this unit's
   identifiers sit outside that scope, and `theme` is this unit's charter word** (`§2.2`(C) row 1). **The
   reconciliation is a derivation with DECLARED EXEMPTIONS and both controls — and a pass reading it either as a
   relaxation of that ban or as a ban on this unit's own name is a review finding.**
9. **THE REGISTER'S TOTAL IS PRINTED WITH ITS TERMS, AND THE ARITHMETIC IS THE CONTRACT'S OWN.** **AS FILED: `102` =
   its twelve terms, with the chain, the three family subtotals and the `(bounded)` set of `5` all printed
   (`§5.5.3`).** **⟶ (`2026-09-27`, `§0A` note 8 items 2/3; the as-filed sentence above is KEPT VISIBLE and is STALE
   ON ITS TWO FIGURES ONLY): LIVE, the DECLARED total is `103` and the DISTINCT total is `100`** — from `P-TH-TP-3`'s
   term `10 → 11` (the `NG-2` re-grain, taken) — **and the `(bounded)` set is `6` ROWS** (from `F4`'s marking of
   `P-TH-TP-5`, **a count of ROWS and not a term**) — **each printed with its own terms, chain, family subtotals and
   cap re-check at `§5.5.3`.** **A total that is not the sum of its own terms, or a total quoted without its terms,
   is a review finding** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).
10. **THE TWO WORKING DEFAULTS ARE DEFAULTS, AND NEITHER IS AN ARCHITECT'S RULING.** `A-1` (the pass-through
    resolved domain) and `A-2` (the NAME of the observable degradation) are carried at `§7a`/`§7a.1` **in the
    `E5-B-3` form**: **default stated, alternative named, blocked clause named, row carried.** **A pass that
    presents either as a ruling misreads this file**; and **`Q2`/`Q3` ARE PINNED and owe no architect answer at
    all.** **⟶ POST-RULING (`2026-09-27`, `§0A` note 6 — THE ITEM'S OWN AS-FILED TEXT IS KEPT ABOVE): the spec gate
    RATIFIED BOTH — `A-1` STANDS AS FILED (approved, still architect-reversible) — and CLOSED `A-2` BY RULING (the
    RENAME `basis` → `source`, no semantics change). So a pass presenting `A-1` as an unruled default is now the
    mirror error of the one this item names, and a pass presenting `A-2` as open is citing a closed item.**
11. **THE TRACKER ITEMS THIS FILING BELIEVES ARE OWED — listed, and NOT edited here** (`§5.1`'s allow-list row
    5 is the pass that may land them): **(a)** `docs/next-steps.md`'s row `E8` — its `Spec` cell
    (`OWED — not filed`), its chain cell (`BLOCKED` while its dependency is `DONE`) and its `Legs` cell (which
    should read this spec's five legs); **(b)** `docs/FORKER.md` — **no `U-THEME` seam block or adopted-name
    glossary** for this unit's two signatures and three types; **(c)** `docs/pending.md`'s `SCH-3` rows — still
    readable as `BLOCKED — awaiting architect go-ahead`; and **(d)** `F1`'s row — the fact that
    `src/renderer/index.html` is the repo's EXISTING appearance authority. **This pass edits NO existing file, so
    every one of the four is the supervisor's or the next pass's to land.** **⟶ POST-RULING (`2026-09-27`): item
     (a) IS LANDED by this pass's ledger amendment — `docs/next-steps.md`'s `E8` `Spec` cell now carries the
     spec-gate APPROVAL, the post-ruling `source` spelling and the `A-1`/`A-2` outcome BESIDE the as-filed wording,
     with NO ledger count changed; items (b), (c) and (d) remain owed exactly as the as-filed text above says.**
12. **NO LEG WAS RUN AND NO SHELL WAS HELD BY THIS PASS** — recorded so no later pass quotes any figure here as a
    measurement of its own (`RCA-12`). **The measurements this pass took are the five probes of `§3.5` and the
    collision table's scope re-read**, each a read-tool result attributed at its own site.

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **TWO items** could not be derived **falsifiably** from the gate-1
record with a single reading, because **two admissible readings both satisfy its words and the choice changes
either a PUBLIC SYMBOL or a CONSUMER-VISIBLE BEHAVIOUR.** **Both are OPEN with a WORKING DEFAULT** (this filing's
choice, implemented in `§2` and marked as such), with a RECOMMENDATION and the clause each one BLOCKS. **No item is
left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or diff-scope clause is weakened,
widened or re-scoped by this report.** **Both items are the record's `A-1`/`A-2`, which its step 3 and step 4
adjudicated FILEABLE and NOT filing-blockers; `A-3` is recorded below as NOT SURVIVING.** **A later pass that
changes any of these defaults MUST OPEN A GATE**, and **none of them may be presented as an architect's ruling**
(the `E5-B-3` form, `docs/decisions.md`). **⟶ POST-RULING (`2026-09-27`, `§0A` note 6): BOTH ITEMS WERE ADJUDICATED AT
THE SPEC GATE — `A-1` STANDS AS FILED (approved and still architect-reversible) and `A-2` IS CLOSED BY THE RULING
(the RENAME `basis` → `source`). THE PARAGRAPH ABOVE DESCRIBES THE FILING STATE and is read as the AS-FILED FORM; the
heading's `THE OPEN ITEMS` is likewise the as-filed label, and the post-ruling reading is `1` item standing with its
alternative named · `1` item closed · `1` item (`A-3`) not surviving.**

### 7a.1 THE OPEN ITEMS — two working defaults, none of them a blocker

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **`A-1` — THE RESOLVED DOMAIN, AND THE SOURCE OF ITS MEMBER LITERALS (`Q1`'s residue)** — **⟶ POST-RULING (`2026-09-27`): `A-1` STANDS AS FILED — APPROVED at the spec gate and STILL ARCHITECT-REVERSIBLE (its reversal still moves the sites named in its last cell and still owes a register re-grain); the `basis` inside the record quotation below is the AS-FILED name of the member renamed `source` (`§0A` note 6), and the quotation is not respelled.** | **The record's step 3 RESOLVES the reading — *"the resolved value is the CALLER's own opaque token PASSED THROUGH … with `env.prefersDark` REPORTED in `basis`/`prefersDark` rather than being the value's source"* — but records it as `Q1` *"DERIVED AS FAR AS IT GOES"*, NOT PINNED.** **The two readings differ in a PUBLIC CONTRACT and in whether the mechanism owns consumer vocabulary at all**, and **the record's own sentence about `String()`-coercion is COARSER than any testable clause** (`§2.3` item 1's note) | **THE DEFAULT (implemented): the resolved `setting` is the caller's own NON-EMPTY STRING BY IDENTITY, and the declared `null` for every non-string, every `''` and the omitted case; `prefersDark` is a REPORT and never the value's source; and the mechanism owns NO token vocabulary** (`§2.3` items 1/3, `§2.1`'s `ThemeResolution` block, `P-TH-IM-1`, `P-TH-TP-2`) | **Do you CONFIRM the pass-through reading — the mechanism carries the caller's token and owns no member literal — or do you take the alternative: a DECLARED TWO-MEMBER POOL the mechanism owns and selects from `env.prefersDark`?** | **CONFIRM the pass-through reading (recommended)** — it is the only reading under which `A-d6`'s own negative row (*"no token names/values (the token block stays the consumer's stylesheet)"*) and `H-r8` prohibition 1 hold **literally**, and it is the reading under which the fork's own token block stays reachable from the returned value | **Nothing is blocked on the RECOMMENDED reading. THE REVERSAL IS NAMED AND BOUNDED: a declared pool moves `§2.1`'s `ThemeResolution` block, `§2.2` `P-TH-1`, `§2.3` items 1/3, `§3.1 M-2`, `§3.4 R-1`/`R-8`/`R-10`, and the register rows `P-TH-IM-1`/`P-TH-TP-2` — **and under it those two rows' DOMAINS change, so a REGISTER RE-GRAIN (new terms printed with their total) is owed. NO section number, NO export name, NO arity and NO returned-shape member moves under either reading.** |
| **2** | **`A-2` — THE NAME OF THE OBSERVABLE DEGRADATION (restated by step 4 as a NAMING question, its finding `A-5`) — ⟶ CLOSED BY THE SPEC-GATE RULING OF `2026-09-27` (`§0A` note 6): the member is `source`, and the AS-FILED spelling was `basis` — a RENAME ONLY, not a semantics change.** | **The record requires the degradation to be *"observable via `basis`"* (that spelling is the AS-FILED name of the member this ruling renamed `source`; the quotation is not respelled) but does NOT pin the member's own name, nor whether the observability lives on `ThemeResolution` or on `ThemeEnv`.** **The two readings change a CONSUMER-VISIBLE member name** — and **step 4 restated it as a NAMING question precisely so it does not read as a re-open of the settled env semantics** | **THE AS-FILED DEFAULT (implemented), NOW RULED: the observable is a member named `source` ON `ThemeResolution`, with the CLOSED two-body domain `'env'`/`'degraded-env'`** (as filed this member was named `basis`, and the ruling REPHRASED it as `source` — `§2.1`'s `ThemeResolution` block, `§2.3` item 2's table, `P-TH-IM-2`, `P-TH-TP-3`) | **Do you CONFIRM `source` on `ThemeResolution` with the two declared bodies — or do you prefer a differently-named observable, or one reported on `ThemeEnv` instead?** **⟶ ANSWERED AT THE SPEC GATE: CONFIRMED, WITH THE ONE CHANGE THAT THE FIELD IS REPHRASED `basis` → `source`; the as-filed question read `basis` in place of `source` and is kept visible here.** | **CONFIRM `source` on `ThemeResolution` (the as-filed recommendation read `basis`, and the ruling took the rename)** — it is the member the ENV rows already read, it makes the degradation observable **without inventing a second record**, and **the two bodies name the two states the table already declares** | **CLOSED: NOTHING WAS BLOCKED, THE RULING TOOK THE RENAME, AND NO RE-GRAIN IS OWED — the RENAME moved `§2.1`'s `ThemeResolution` block, `§2.3` item 2's `source` column (as filed: its `basis` column), `§3.1 M-3`, `§3.4 R-12`, and the EXPECTATION STRINGS of `P-TH-IM-2`/`P-TH-SM-1`/`P-TH-TP-3`/`P-TH-TP-4` — **NO row id, NO strategy id, NO term, NO seed, NO cap and NO shape moved, so NO re-grain is owed.** **Reporting it on `ThemeEnv` instead is a LARGER move and would touch the type census's meaning; it is named here so the choice is explicit.** |

**`A-3` DOES NOT SURVIVE, AND IS RECORDED HERE WITH NO DEFAULT AND NO ROW.** **It was raised at step 3 and step 4
confirmed it does not hold** (the record's `§4.10`): **the alternative reading `A-3` proposed — a two-member
resolved axis or a tri-state transition — is not derivable from `A-d6`'s surface and would require the mechanism to
own a vocabulary or a precedence rule this contract's prohibitions forbid** (`P-TH-1`, `P-TH-10`). **No later pass
re-derives it as an open item.**

**The report's arithmetic, stated so the gate is checkable: `2` items reported · `2` OPEN with a working default and
a recommendation · `1` item recorded as NOT SURVIVING · `2` clause groups blocked by an OPEN item · `0` items left as
a silent gap.** **Every item's default IS implemented in this spec's text**, so **the red set may be authored
against the defaults** — but **each default is a DEFAULT, marked as one, and a later pass that changes one must open
a gate.** **⟶ POST-RULING (`2026-09-27`, `§0A` note 6): THE ARITHMETIC ABOVE IS THE FILING-TIME READING AND IS KEPT
VISIBLE. The post-ruling reading is: `2` items reported · `1` STANDS AS FILED (`A-1` — approved and still
architect-reversible) · `1` CLOSED BY THE RULING (`A-2` — the RENAME `basis` → `source`, which blocks no clause, moves
no term and owes no re-grain) · `1` item (`A-3`) recorded as NOT SURVIVING · `0` items left as a silent gap** — and
**the red set is still authored against the DEFAULTS as implemented, with `source` as the RULED spelling.**

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with another owner
and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS UNIT** = closed elsewhere or
another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited **BY SECTION
or BY ROW NAME, never by line length** — `docs/decisions.md`'s rows are appended-to and their line anchors drift;
`docs/next-steps.md` is cited **by ROW ID** (`E8`, `E7`, `F1`).

| Source | Status for `U-THEME` | Where |
| --- | --- | --- |
| **`docs/specs/theme-review.md`** — the gate-1 record: the four steps, `C-1`…`C-10`, the 15 findings and `Q1`/`Q2`/`Q3`, step 3's derivation and step 4's `G-1`…`G-6` | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** **Its provenance is a DOCUMENTED COMPRESSION (written by the filing pass, not by the reviewers — its `A-4`)**, and **the record is NEVER edited by this unit** (`§5.1` item 11) | `§0`, `§0A`, `§2`..`§5`, `§5.1`, and this row |
| **THE SPEC-GATE RULING OF `2026-09-27`** — the architect's decision on this spec: **APPROVED AS FILED**, with the ONE change that the discriminator field `basis` is **REPHRASED AS `source`** | **RULED — THE UNIT'S ONE APPROVAL (`AGENTS.md` item 10a), and a RENAME ONLY: no register term, row id, strategy id, seed, cap or shape moves; the member set stays `'env'` \| `'degraded-env'`; `A-1` STANDS as filed (still architect-reversible) and `A-2` is CLOSED by the ruling.** **Recorded in this file at `§0A` note 6, in the gate-1 record's spec-gate annotation, and in the `E8` ledger row's `Spec` cell** | `§0A` note 6, `§2.1`, `§2.2`(D), `§2.3` item 2, `§4.4 S-TH-11`, `§5.5.2` item 8, `§7` item 10, `§7a`/`§7a.1` item 2, `§8` (this row) |
| **`THEME-MECHANISM-AND-AUTHORED-CONTROL`** (`docs/decisions.md`, ACTIVE; architect ruling **`A-d6`**) | **ADOPTED as this unit's upstream** — the pure total `resolveTheme(setting, env)` + the declaration-only applier with the caller-supplied attribute name, **and the two-unit split with `U-THEME-CONTROL`**, and the persistence boundary. **Cited by NAME, never re-opened** | `§0` ruling 1, `§0A` notes 1–4, `§1` items 1–6, `§2.1`, `§2.4`, `§5.1` item 13, `§8` (this row) |
| **upstream-`SCH-3`** (`docs/pending.md`) — **`DECLINED + REFILED`, reason code `TOO-THIN-WRONGLY-TARGETED`**, then **`SUPERSEDED BY A-d6`**; and its **`SCH-3`-shape** candidate row (promoted, then retired as a candidate) | **READ AS PROVENANCE.** **The decline was OVERRULED by the architect** and **`U-THEME-MIN` is RETIRED**; **this unit does not re-open the pre-`A-d6` disposition and does not resurrect the retired name** | `§0` ruling 1, `§1` item 1, `§8` (this row) |
| **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the mechanism-vs-UI-element test, and the reason this unit needs no exception to the project-wide constraint | `§0` ruling 4, `§0A` note 3, `§1` item 4, `§2.2` `P-TH-2`, `§3.3 I-6` |
| **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** (`docs/decisions.md`, ACTIVE) | **CARRIED AS THE PRECEDENT THIS UNIT'S APPLIER IS THE SIBLING OF: returned, never applied; no write; gate 6 `STRUCTURAL`** | `§0` ruling 5, `§0A` note 3, `§2.4` item 3, `§7` item 3 |
| **`UI-RENDERED-WITH-PROVIDENT`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the constraint that has NO element of this unit's to apply to** — and as the rule that REQUIRES the authored control `F1` owns | `§0` ruling 7, `§1` items 3/4, `§2.2` `P-TH-2` |
| **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the rule that DERIVES this unit's DENIED set, and as the entry-point question this spec ANSWERS (`NO`)** | `§0` ruling 8, `§2.5` item 5, `§5.1` |
| **`SHIM-COMPLETION-CARVE-OUT`** + **`H-r7`** (the handoff record) | **CARRIED, and NOT USED**: exactly one shim member is admitted, **this unit adds none and CALLS none — its removal case is DATA** | `§0` ruling 9, `§0A` note 2, `§2.2` `P-TH-6`, `§2.4` item 3, `§7` item 3 |
| **`H-r8`** (the handoff record), the **six-prohibition** table | **DISCHARGED BY THIS FILING** — the six-row `§0 Contract-prohibitions` block is `§2.2`(A), **each row naming the test that pins it** | `§0` ruling 15, `§2.2`(A) |
| **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — prohibition 5 is a NON-GOAL row here, and the pinned MCP sets are asserted as **SET claims against the names** | `§0` ruling 6, `§2.2` `P-TH-5`, `§3.3 I-9` |
| **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE) | **CARRIED FOR THE FORM, AND THIS UNIT'S SEAM SET IS EMPTY** — **a derivation, stated as one** (`§2.1` item 4) | `§0` ruling 12, `§2.1` item 4, `§8` (this row) |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`**, **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`**, **`A DECLARED REGISTER TERM IS A DRIVE COUNT`**, **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`12` typed ROWS carrying `12` TERMS in three families, `102` attempts printed WITH their twelve terms, a chain, three family subtotals, a `(bounded)` set of `5`, one pinned-seed generator (seed `20260927`), caps `≤100`/row · `≤400` total · stop-after-5, the four domains declared by name, and NO `F-` row, NO `§6`/`FS-n` citation as a row, NO new dependency and NO extra leg** (**the `102` and the `5` in this cell are the AS-FILED figures — `2026-09-27`, `§0A` note 8: LIVE, the register declares `103` attempts and a `(bounded)` set of `6` ROWS, and only `P-TH-TP-3`'s term moved**) | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **`DOC-REVIEW-GATE`** / **`BLIND-ALL-GREENS`** (`docs/decisions.md`, ACTIVE) | **CARRIED as obligations this unit's DONE row must cite**: the per-unit documentation review and the blind-greens record are owed after the greens | `§0` ruling 13, `§5.1` rows 4/5, `§5.3` item 8 |
| **`E5-B-3`'s PRECEDENT** (`docs/decisions.md`; `docs/specs/container-review.md` `§9.5` `G-3`) and **`docs/specs/gutter-ui.md` `§7a.1`** | **CARRIED AS THE FORM** for this filing's two working defaults — *"a RECORDED WORKING DEFAULT … it does NOT gate the filing"* | `§0` ruling 14, `§0A` note 5, `§7a`/`§7a.1` (both items) |
| **`docs/next-steps.md`'s `## OPEN` row `E8`** | **CARRIED IN SUBSTANCE at filing: its `Spec` cell (`OWED — not filed`), its chain cell (`BLOCKED` while its dependency `U-MENULIB` is `DONE`) and its `Legs` cell are listed as owed (`§7` item 11).** **THIS PASS EDITS NO TRACKER.** | `CURRENT STATE` item 7, `§4.5`, `§7` item 11 |
| **`docs/next-steps.md`'s `E8` row's `Blocked on` cell and the `## DONE — U-MENULIB` section** | **CARRIED**: **the unit's only live dependency `U-MENULIB` (`E7`) is `DONE`** — the ledger's sixteenth `DONE` row — **so this unit's only live precondition is its own red set** | `§4.5` |
| **`docs/next-steps.md`'s row `F1`** (`U-THEME-CONTROL`) and **`docs/pending.md`'s `SCH-3` rows** | **NOT THIS UNIT, and `F1` is BLOCKED ON this unit as a TRACKER ORDERING** — **not an import edge and not a composition**; **`docs/specs/theme-control.md` remains `OWED — not filed`**; **a pass asserting an edge between the two units is a FABRICATED EDGE** | `§2.5` item 3, `§3.4 R-11`, `§4.5`, `§8` (this row) |
| **`docs/specs/menulib.md` `§3.4 R-1`** — its scan row's banned consumer-vocabulary list, which **names `theme`** | **RECONCILED, NOT RELAXED**: the ban's scope is **that module's own source file**, so this unit's identifiers sit outside it; **carried as `§2.2`(C) row 1 with both controls** | `§2.2`(C) row 1, `§3.4 R-1`, `§7` item 8 |
| **`docs/specs/container.md` `§2.1`** (`tokensFor`/`tokenFn`) and **`docs/specs/relocate.md` `§2.1`/`§2.4`** (`resolveTarget`) | **NAMED AS OVERLOADS, NEVER COMPOSED**: this unit declares its own contract vocabulary and asserts **no import edge and no duplication** | `§2.2`(C) row 3, `§3.4 R-11`, `§8` (this row) |
| **`docs/specs/relocate.md` `§3.4 R-1`/`R-2`**, **`container.md` `§3.4 R-1`**, **`gsession.md` `I-13`/`R-2`**, **`gutter.md` `§3.4 R-2`**, **`listhost.md` `§2.2`**, **`projection.md` `§1`** — the landed rows that ban `matchMedia` | **CARRIED AS THE FORM OF A NAMED-EXEMPTION SCAN, and cited as the ban this unit UPHOLDS IN FULL with NO exemption declared** | `§2.2`(C) row 2, `§3.4 R-1`/`R-2`/`R-7` |
| **`docs/specs/user-flow-audit.md` `§2`** and its `§7.1` trigger predicate | **APPLIED, and the decision RECORDED**: **`DOES NOT TRIGGER`**, with the evidence that decided it and its falsifier | `§5.2` (the decision block), `§5.3` item 7 |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row may not be moved to the `ui` leg silently"* | **CARRIED VERBATIM in this unit's three-part `[U]` refusal** | `§5.2`, `§4.4 S-TH-10`, `§7` item 4 |
| **`docs/specs/container.md` `§0A` note 8.2** — its string-literal census correction (`4` distinct bodies, the `typeof` tags INCLUDED) | **CARRIED AS THE FORM AND AS THE HAZARD**: a literal census that excludes the `typeof`-tag bodies **reddens the module the value rules require**, so `§2.1` item 5 names the five bodies and `S-TH-7` stops such a row | `§2.1` item 5, `§3.4 R-8`, `§4.4 S-TH-7` |
| **`docs/specs/menulib.md` `§3b`'s `A-1`/`PBT-F4`** — the nested-hostile / recursion hazard | **CARRIED AS A NAMED HAZARD CLASS THIS UNIT IS STRUCTURALLY FREE OF** (no recursion, one own-member read) | `§5.5.2` item 6 |
| **`docs/specs/listhost.md` `§5.5.1`**, **`projection.md` `§5.5.1`**, **`container.md` `§5.5.1`**, **`relocate.md` `§5.5.1`**, **`menulib.md` `§5.5.1`** | **CARRIED AS THE FORM** (typed rows, strategy ids, `(bounded)` markings, the declared-vs-distinct ledger, the printed terms) | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3` |
| **`docs/FORKER.md`** | **AN OWED ROW AND NOT DELIVERED: this unit's two exported signatures and three exported types have NO fork-facing carry**, and a fork cannot read a contract only this repo can honour. **Owner: whatever pass next touches that file; it gates no unit.** | `§2.1` item 4, `§7` item 11(b), `§8` (this row) |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | `§1` item 7, `§3.4 R-9`, `§7` item 6 |
| **`src/renderer/index.html`** | **NOT THIS UNIT — it is the repo's EXISTING appearance authority and it is `F1`'s surface**, unreachable by any value this unit returns. **DENIED to this unit's diff** | `CURRENT STATE` item 10, `§3.5 X-5`, `§5.1` item 2 |
| **`docs/pending.md` `§K`** (the RCA's requested harness modifications) | **BACKGROUND ONLY.** Its own header reads *"REQUESTS, NOT LANDED RULINGS"*. **Its vocabulary is NOT used anywhere in this file as though it were in force** | `§5.1` item 11, `§8` (this row) |
| **`docs/specs/theme.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 3, `§7` item 11 |
| **THE `2026-09-27` AMENDMENT — THE RED RUN'S PROVENANCE AND THE FOUR REGISTER/SCAN-EXEMPTION CORRECTIONS** (`tests/theme.test.ts`: `58` rows · `40` failed / `18` passed against the absent module · the register stopped at `P-TH-IM-1` after five consecutive failures, with the eleven un-run rows reported as FAILURES) | **RECORDED — AN ANNOTATE-NEVER-REWRITE AMENDMENT OF THIS FILE ONLY, and NOT a ruling**: it moves **no** term, row id, strategy id, seed, cap, shape, pool member or section number. **Its four fixes are `§5.5.3` (both totals printed with their own terms), `§5.5.2` item 3 (`P-TH-TP-5` added; the six mislabelled rows named), `§3.4 R-1`/`§2.2`'s exemption note (the `typeof`-tag sub-set named), and its two dated method notes (the arity-0 omitted drive; the single-member pool multiplicities)** | `§0A` note 7, `§2.2`'s exemption paragraph, `§3.4 R-1`, `§5.3` item 11, `§5.5.2` item 3, `§5.5.3` |
| **THE `2026-09-27` AMENDMENT (SECOND OF ITS KIND) — THE GATE-4 CONTRACT-SIDE DISPOSITIONS AND THE `NG-2` RE-GRAIN, TAKEN** (`§3b`'s `F1` · `F4` · `F7` · `F2`; the `NG-2` inherited-`env` drive now authored by the TestWriter) | **RECORDED — AN ANNOTATE-NEVER-REWRITE AMENDMENT OF THIS FILE ONLY, and NOT a ruling. `F1` IS PINNED (the own-member read form: trap-only ⇒ the DECLARED DEGRADATION, a genuine own member ⇒ read, with the `true`-reading module as the FALSIFIER and the landed module already conforming); `F4`'s `(bounded)` MARKING IS ADDED to `P-TH-TP-5` (a count of ROWS: `5 → 6`, and NO term moves); the `NG-2` RE-GRAIN IS TAKEN (`P-TH-TP-3` `10 → 11`, DECLARED total `102 → 103`, DISTINCT total `99 → 100`, `TP` subtotal `51 → 52`, each printed with its own terms, chain, subtotals and cap re-check, with the as-filed figures kept visible); `F7`'s ledger-title correction is recorded (ONE differing row, `P-TH-IM-2`, as-written form visible); and `F2` is recorded as a `[T]`-SIDE obligation the TestWriter owes (the un-passed recorder making the count-`0` assertion structurally zero).** **THE ONLY TERMS THAT MOVE ARE `P-TH-TP-3`'S: no other term, row id, strategy id, seed, cap, shape, pool member or section number moves; no status beyond gate 5 advances; and the seven `F-n` rows stay UNFIXED.** | `§0A` note 8, `CURRENT STATE` items 3/11, `§2.3` item 2 (row `(13)` and the pinning sentence), `§3.2 F-2`, `§3b`'s `AMEND-1`…`AMEND-4`, `§3c` item 6, `§5.3` item 11, `§5.5.1` (`P-TH-TP-3`/`P-TH-TP-5`, the environment domain), `§5.5.2` items 2/3/10, `§5.5.3`, `§7` item 9 |
| **`docs/specs/theme-greens.md`** | **`OWED` at filing — the gate-5 blind-greens artifact; named in the diff scope so the pass that produces it has an allowed home** | `§5.1` row 4, `§5.3` item 8 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates **two new
documents** and edits **no existing document** — **no tracker row is touched, no sibling spec is annotated, and no
citation is repointed.** **Row `E8`'s `Spec` cell therefore still reads `OWED — not filed` until the supervisor's
reconciliation pass flips it** — recorded here so the staleness is **attributable rather than silent**. **This pass
ran no test, no leg and no trio, edited exactly two files, and made no commit** (`RCA-8`: **the new files are
untracked and must be committed by the supervisor**).

**⟶ THE SECOND AMENDMENT'S OWN ARCHIVAL-LOOP LINE (`2026-09-27`, `§0A` note 8): it EDITS THIS FILE AND NOTHING ELSE**
— **no tracker row, no sibling spec, no `*-greens.md` and no `src/**` or `tests/**` byte; it archives, moves and
repoints NOTHING** (there is nothing to repoint: **no section number, no row id and no citation target moved**), **and
it runs no leg, no suite and no register row.** **It RE-MEASURES one thing and owns it: the landed
`src/shared/theme.ts` reads the env member through `Object.getOwnPropertyDescriptor`, so `F1`'s pin is satisfied by the
module as landed and NO module fix is owed** — **that reading is attributed at `§2.3` item 2's pinning sentence.**
**The commit that carries this amendment is the supervisor's pass** (`RCA-8(a)`/`(d)`): **an append, never a whole-file
rewrite — every pre-existing byte named in this file's own annotations was verified present after the edit.**

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its vocabulary
and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A later pass appends
**inside `§3a`/`§3b`** or inside an existing section; **no section number moves, nothing is renumbered, and the
`§5.3 → §5.5` gap (no `§5.4`) stays exactly as recorded**, because **renaming is forbidden for citation
stability.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-THEME`** — **the unit has no green yet**, and `RCA-3`
runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding, and none may be cited
as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no `src/**`), it
**must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the per-row attempts, the
strategy ids, the `103` total against its twelve terms, the stop-after-5 rule, the pinned seed and its
one-step-per-draw form (`pool.length = 12`), and the `(bounded)` set of `6` ROWS** *(**`2026-09-27`, `§0A` note 8: the
figures this pass must READ are the LIVE ones — `103` declared and the six marked rows; the as-filed `102` and the
as-filed five-row set it read at gate 4 are STALE ON THE ARITHMETIC ONLY, so an audit reading `102`/`5` against the
live tables is itself the finding. `P-TH-TP-3`'s cell now carries the `11`th hostile member and `P-TH-TP-5` carries
its `(bounded)` marking.)* — **and it must RE-RUN the
pool-versus-boundary check against the LANDED tables** (`§5.5.2` item 5). **Its findings are recorded in `§3b` and a
HOST finding is fixed here with regression rows — never in `docs/defects.md`, because a host finding is this repo's.**
**A genuine `provident-ssr` package defect would go to `docs/defects.md` + `docs/HANDOFF.md`, and the package is
NEVER patched** — **though this unit exercises no package surface at all, so no such finding can arise from it.**

**The vocabularies the disposition table uses, defined so no status word is ever left undefined:**
**`CONFIRMED-FIXED`** = a host finding, fixed here and regression-tested as a new `§3` row · **`CONFIRMED-RULED`** = a
behaviour examined and ruled correct, with the ruling recorded and its reason · **`CONTRACT-AMENDED`** = a seed that
exposed a gap in this spec, amended with the old text kept visible as `SUPERSEDED` · **`NOT-A-FINDING`** = raised,
examined, recorded with the reason · **`OWED`** = raised and **not yet resolved** (the pass may not report done with
an `OWED` row) · **`OWED — TEST-SIDE`** = a finding whose remedy is a row the TestWriter owns, with no `§5.5.1`
statement, id, strategy id or attempt term changed for it · **`BLOCKING — SCOPE`** = a scope violation the unit may
not land with · **`PARKED-with-revisit-condition`** = recorded, not fixed, with the condition that reopens it and
its owner. **The as-filed status of every seed below is `OWED`, and `OWED` is defined here rather than left bare.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **THE PASS-THROUGH PROBE, exhaustively:** across every entry point and every drive, **is the returned `setting` the CALLER's own token by identity — with `'DARK'`, `' dark '` and `'system'` returned UNCHANGED and NO pool member ever appearing that the caller did not supply?** **Is any coercion hook (`String`, `toString`, `valueOf`) ever consulted — including on a proxy, a hostile object and a `Symbol`?** | `[T]` + static |
| **`A-2`** | **THE ENV-STRICTNESS PROBE:** for `{prefersDark: true}` · `false` · `1` · `0` · `'true'` · `'false'` · `[]` · `{}` · a missing member · `undefined` · a frozen record · a throwing accessor · a revoked `Proxy` — **is every reading the DECLARED one, is `source` the DECLARED body (the RULED spelling; as filed the member was named `basis` — `§0A` note 6), and does the read happen EXACTLY ONCE per call?** **Is any truthiness test reachable?** | `[T]` + static |
| **`A-3`** | **THE NAME-ECHO PROBE:** for a normal name, a whitespace-padded name, `''`, a non-string, `null`, the omitted case and an object with its own `toString` — **is the echoed name the caller's own string BY IDENTITY, does every unusable arm read the declared `null`, and is `toString`/`valueOf` NEVER invoked?** | `[T]` + static |
| **`A-4`** | **THE REMOVAL-AS-DATA PROBE — the `H-r7` class never called:** across every removal shape and **with every argument instrumented as a recording proxy and a fake element in scope** — **is EVERY trap count `0`, is EVERY write counter `0`, is the removal signalled ONLY by `removal: true`, and is there NO element parameter through which a call could be made?** **Is the recording instrument itself proven LIVE by its two positive controls?** | `[T]` + static |
| **`A-5`** | **THE MEMBER-CENSUS PROBE:** on both returned records — **is `Object.keys` EXACTLY the declared three names in declared order, is there NO fourth member, is NO member a getter, is the prototype `Object.prototype`, and is each member's TYPE the declared one (falsified on the `tsc` leg where it is a type claim)?** | `[T]` + type-level |
| **`A-6`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything at all — value, type-only, dynamic or `require`? **Is `src/shared/dom-shim.ts` untouched, are the sibling modules and test files untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-7`** | **THE VOCABULARY PROBE — and its own collision:** does the module's source (comments included, in the NORMALIZED view) carry a TOKEN value, an ATTRIBUTE name, a CSS literal, a store token or a realm token — **raw, token-assembled or in a comment?** **Is the scan's exemption list NAMED rather than implied, and does the scan AVOID the vacuity trap of banning the `theme` token while the module's own exported names contain it?** **Does the literal census INCLUDE the `typeof`-tag bodies, or does it redden the conformant module (`S-TH-7`)?** | static |
| **`A-8`** | **THE ATTRIBUTE-NAME-OWNERSHIP PROBE:** does the module DEFAULT, prefix, normalize or DOCUMENT an attribute name anywhere — in code, in a comment, in a type doc or in a string? **`A-d6`'s *"the mechanism may not document it"* clause is a SOURCE-BYTE claim, and this is the pass that reads the landed module's bytes.** | static |
| **`A-9`** | **THE `A-1`/`A-2` PROBE — READ POST-RULING (`2026-09-27`, `§0A` note 6):** `A-1` STANDS AS FILED (approved, still architect-reversible) and `A-2` IS CLOSED BY THE RULING (a RENAME), so **the probe's two current failure modes are the mirrors of its as-filed ones: a pass that presents `A-1` as an unruled default, or `A-2` as an open question, is a review finding — while a pass that presents the RULED `source` spelling as an unruled default is the same finding.** *(the as-filed probe, kept visible:)* do the two items remain marked as **working defaults with their reversible alternatives named** rather than silently hardened into contract without a ruling — and has the supervisor routed them? **A pass that treats a working default as ruled, or that presents one as an architect's sentence, is a review finding.** **AND: does `A-3`'s NON-SURVIVAL stay recorded as such rather than reappearing as an open item?** | static + the DONE row |
| **`A-10`** | **THE NO-PRECEDENCE PROBE:** does ANY code path derive `setting` from `prefersDark`, compare the two, branch between them, or hold a third state? **Does the same setting read the same `setting` member under a strict-`true` and a degraded environment?** | static + `[T]` |
| **`A-11`** | **THE STORE/PERSISTENCE PROBE:** is any store, cache, memo, module-level binding, file write or persistence channel added — **including a "remember the last setting" convenience, which `A-d6` makes a NEW GATE?** | static |
| **`A-12`** | **THE FABRICATED-EDGE PROBE:** does any pass assert an import or composition edge between this unit and **any** sibling **or between this unit and the `F1` control** — **including reading the `resolve`/`token` overloads (`§2.2`(C) row 3) as shared dependencies, or reading `F1`'s blocked-on ordering as a dependency edge?** | static |
| **`A-13`** | **THE `[U]`/`[D]` PROBE:** does any pass offer a `[U]` row for an applied attribute, a stylesheet, a rendered control or an OS preference; claim a `[D]` row; move an applied row to the `ui` leg (silently or not); report gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason stated**; or omit the `§7.1` `DOES NOT TRIGGER` decision? | the DONE row + `§3.4 R-7`/`R-9` |
| **`A-14`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the declared total `102` = `12 + 12 + 10 + 8 + 6 + 3 + 12 + 12 + 10 + 8 + 6 + 3`**? **In particular: is `P-TH-IM-3`'s and `P-TH-IM-4`'s separate-row claim present (step 4's correction 1), does `P-TH-IM-2` avoid asserting the same property as `P-TH-TP-3` (correction 2), and is `P-TH-TP-5`'s no-call row present WITH its two live-instrument controls (correction 3)?** Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form (`pool.length = 12`) what the test file actually contains? **AND: is every pool/table member still consistent with its row's declared boundary text** — `§5.5.2` item 5's check re-run against the LANDED tables? **AND: does the audit read the `(bounded)` set correctly — `5` marked of `12` ROWS?** **Any mismatch is a SPEC FINDING.** **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8): the totals this probe reads are
the LIVE ones — DECLARED `103` = `12 + 12 + 10 + 8 + 6 + 3 + 12 + 12 + 11 + 8 + 6 + 3`, with the distinct
sibling `100`, `P-TH-TP-3`'s term being `11` (the inherited-`env` member, the `NG-2` re-grain), and the `(bounded)`
set reading `6` marked of `12` ROWS (those five plus `P-TH-TP-5`, `F4`'s marking).** **A mismatch against the AS-FILED
figures quoted in this seed's own text above is NOT a finding: the as-filed `102`, the as-filed `10`-term `P-TH-TP-3`
and the as-filed `5`-row marked set are the PRE-GRAIN state, kept visible at `§5.5.3` and `§5.5.2` items 2/3.** | `[T]` + the test file |
| **`A-15`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **applied-attribute, stylesheet, dark-mode, rendered-control or OS-preference** evidence from this unit's `[T]` green — and does it state explicitly that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app or any OS behaves differently**? | the DONE row |
| **`A-16`** | **THE `F1`-BOUNDARY PROBE:** does any pass read this unit as delivering the AUTHORED control, a rendered `select`, a dispatch, a persisted preference or an MCP-visible surface — **or read the demo envelope's absence from the diff as a defect rather than as the ruling's own requirement that this unit be readable with the demo deleted?** | static + the DONE row |
| **`A-17`** | **THE HONESTY-BLOCK PROBE:** does `§5.5.2` name the register's ONE coverage gap (the INHERITED `prefersDark` case) as an OBLIGATION rather than a silent absence, does it name the three deliberately-excluded shapes, and does the DONE row carry the gap as `OWED` rather than covered? | static + the DONE row |
| **`A-18`** | **THE COLLISION-TABLE PROBE:** does any pass read `§2.2`(C)'s reconciliations as **RELAXING** a landed prohibition — particularly the `theme`-in-another-module's-scan-scope row and the `matchMedia` row it upholds in full — **or, conversely, redden this module for a spelling that has no ban site at all?** | static |
| **`A-19`** | **THE AUTHORITY-PROBE:** does any pass read this unit as **this repo's appearance authority**, or claim that its returned record reaches `src/renderer/index.html`'s `:root { color-scheme: light dark; }`? **The measured fact is that nothing this unit returns can influence that file** (`CURRENT STATE` item 10). | static + the DONE row |
| **`A-20`** | **THE RED-PROVENANCE PROBE:** is the red set's failing set recorded **AS RUN**, with the stop-after-5 outcome and the un-run register rows reported as FAILURES — and does any pass quote a `102`-of-`102` executed red as if it were the expectation (`§4.2`)? | the DONE row + `§4.2` |

**The seed set's own status: `20` seeds, ALL `OWED` at FILING.** **`A-14` is the gate-11 audit; `A-1`/`A-2`/`A-3`
are the three claims the resolver's central artifact rests on; **`A-4` is the claim the applier's artifact rests
on**; `A-5`/`A-7` are the census and the vocabulary classes; `A-6`/`A-11`/`A-12` are the boundary classes;
`A-8`/`A-9`/`A-10` are the ownership, the defaults and the no-precedence claims; `A-13`/`A-15`/`A-16`/`A-19` are
the layer-honesty and authority probes; and `A-17`/`A-18`/`A-20` are the honesty, collision and provenance
classes.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended findings block
needs **no renumbering and no new section**. **A row added later must use one of the statuses defined at `§3a`, or
the pass must define its new token IN THIS TABLE with a one-line meaning** — **a bare `OWED` is the one status that
may not survive the pass** (`AGENTS.md` item 11(e)).

**⟶ THE PASS RAN (`2026-09-27`, the gate-4 read-only adversarial pass + gate-11 PBT audit): SEVEN items, ALL
UNFIXED, each with its DISPOSITION and its OWNING SIDE.** **The as-filed row above is KEPT VISIBLE as the
pre-run state (annotate-never-rewrite).** **NO item below is fixed, no row of `tests/theme.test.ts` was edited,
no register term, row id, strategy id, seed, cap, shape, pool member or section number moves, and no `§3a` seed's
own text is rewritten.** **THE PASS'S PROVENANCE, STATED WITH ITS OWNER: every figure in this block is THAT PASS'S
OWN READING, quoted; it is not a measurement taken by the pass that lands this block.**

| Finding | Status | The finding, one line | Where the remedy lands |
| --- | --- | --- | --- |
| **`F1`** | **`OWED` — CONTRACT-side (MED)** | **A NON-THROWING DIVERGING `Proxy` AS `env`:** its traps return `true` and its `getOwnPropertyDescriptor` answers `undefined`, so the read returns **`{prefersDark: false, source: 'degraded-env'}`** while a literal **`=== true`** reading of the same object would read `true`. **No pool member and no cell covers it**, so **the DESCRIPTOR-FORM vs PROPERTY-FORM reading must be PINNED** (the pass's own reading). | A **CONTRACT DISPOSITION** — `docs/specs/theme.md` `§2.3` item 2 (the reading's form), under the ordered next action (1) |
| **`F2`** | **`OWED — TEST-SIDE` (MED)** | **`P-TH-IM-1`/`P-TH-IM-3`'s declared *"invocation count (`0`)"* assertion is built from a `hookRecorder()` that is NEVER PASSED**, so the count is zero BY CONSTRUCTION and the real check sits **outside the declared term**. | A **TestWriter red-first repair** (the pass's action (2)) |
| **`F3`** | **`OWED — TEST-SIDE` (MED)** | **`P-TH-TP-1`'s pinned draw is WITH REPLACEMENT and the drawn indices are never printed or asserted**, so repeats could leave pool members undriven while the row still reads **`attemptsRun:12 · held:12`**. | A **TestWriter red-first repair** — **assert or print the twelve drawn indices (a `Set` size of `12`)**, carried as `NG-3` below |
| **`F4`** | **`OWED` — CONTRACT-side (LOW/MED)** | **`P-TH-TP-5`'s property text says *"EVERY removal drive of the whole register"* while its table drives `3` shapes × `2` instruments**, and **the row is UNMARKED although this contract owes `(bounded)` wherever its text outruns its table.** | A **CONTRACT DISPOSITION** — the `(bounded)` marking of `§5.5.1 P-TH-TP-5`, under action (1) |
| **`F5`** | **`OWED — TEST-SIDE` (LOW)** | **`P-TH-TP-5` clause (c)'s BEFORE/AFTER BYTE-IDENTITY is asserted by TRAP COUNTS ONLY** — **no snapshot exists**. | A **TestWriter red-first repair** (a caller-object snapshot; carried as `NG-2` below) |
| **`F6`** | **`OWED — TEST-SIDE` (MED)** | **`P-TH-TP-6`'s *"applier called FIRST on a literal token"* drive RECOMPUTES THE SAME CALL AS DRIVE 1**, so a module with **cross-call state PASSES** and **order-independence is UNFALSIFIABLE**. | A **TestWriter red-first repair** (action (2)) |
| **`F7`** | **`OWED — TEST-SIDE` (LOW)** | **`§5.5.2` item 3's ledger title says *"the six rows whose distinct figure DIFFERS"* while its ledger expects ONE differing row** — **the spec's six are the rows whose figure EQUALS the term.** | A **TestWriter-visible text repair at `§5.5.2` item 3** (action (2); the title is annotated, never silently rewritten) |
| **`AMEND-1`** | **`CONTRACT-AMENDED` — `F1`, PINNED (`2026-09-27`, `§0A` note 8 item 1)** | **THE `env` MEMBER-READ FORM IS THE OWN-MEMBER FORM:** **an object whose traps expose no own `prefersDark` member reads the DECLARED DEGRADATION (`false`, `source: 'degraded-env'`), and a container carrying a genuine own member (`Object.assign([], {prefersDark: true})`, a `Map` with an own member) reads THAT member.** **FALSIFIER: a module that reads a trap-only member as `true` must FAIL.** **THE LANDED MODULE ALREADY CONFORMS (`src/shared/theme.ts` reads `Object.getOwnPropertyDescriptor`), SO NO MODULE FIX IS OWED.** | **LANDED: `§2.3` item 2's new row `(13)` and the pinning sentence beside that table; `F-2`'s pool; `§5.5.1`'s environment domain** |
| **`AMEND-2`** | **`CONTRACT-AMENDED` — `F4`, MARKED (`2026-09-27`, `§0A` note 8 item 2)** | **`P-TH-TP-5` carries its `(bounded)` marking**, because its property text says *"EVERY removal drive of the whole register"* while its table drives `3` shapes × `2` instruments. **THE MARKING IS A COUNT OF ROWS, NOT A TERM: the marked set moves `5 → 6` rows (`5 + 7 = 12` → `6 + 6 = 12`) and `P-TH-TP-5`'s term stays `6`.** | **LANDED: `§5.5.1`'s `P-TH-TP-5` cell, `§5.5.2` item 2, `§5.5.3`'s `(bounded)` set, `§7` item 9** |
| **`AMEND-3`** | **`CONTRACT-AMENDED` — THE `NG-2` RE-GRAIN, TAKEN (`2026-09-27`, `§0A` note 8 item 3)** | **`P-TH-TP-3`'s term `10 → 11`** (the `11`th hostile member is an INHERITED `env`, `Object.create({prefersDark: true})`), **so the DECLARED total moves `102 → 103`, the DISTINCT total `99 → 100` and the `TP` family subtotal `51 → 52` (both figures)** — **printed with each figure's own terms, chain, subtotals and cap re-check, with the as-filed figures kept visible. THE ONLY TERMS THAT MOVE ARE `P-TH-TP-3`'S.** | **LANDED: `§5.5.1` `P-TH-TP-3`, `§5.5.2` items 2/3/10, `§5.5.3`, `§3.2 F-2`, `§5.3` item 11, `§7` item 9, `CURRENT STATE` items 3/11** |
| **`AMEND-4`** | **`OWED — TEST-SIDE` — `F2`, CARRIED AS AN OBLIGATION (`2026-09-27`, `§0A` note 8 item 5; `F7`'s text repair is carried with it)** | **`P-TH-IM-1`/`P-TH-IM-3`'s declared *"invocation count (`0`)"* assertion is STRUCTURALLY ZERO because the recorder (`hookRecorder()`) is NEVER PASSED to the module — the real check sits OUTSIDE the declared term** — **and `§5.5.2` item 3's ledger title is corrected to the ledger's own reading (ONE differing row: `P-TH-IM-2`'s `12 → 9`).** **THIS IS A `[T]`-SIDE OBLIGATION THE TESTWRITER OWES: NO CONTRACT TERM, ROW, FIGURE OR SHAPE MOVES FOR IT.** | A **TestWriter red-first repair** (the pass's action (2)) |

**WHAT THE SAME PASS CONFIRMED, RECORDED SO IT IS NOT RE-DERIVED** (its own readings): **the ARITHMETIC independently
— the twelve terms sum `102`, the distinct figures sum `99`, both chains are consistent, the caps are compared
against the DECLARED figure, `5` of `12` rows carry `(bounded)`, and the seed `20260927` takes one step per draw**;
*(**`2026-09-27`, `§0A` note 8: those four figures are GATE 4's OWN AS-FILED READINGS and are STALE ON THE ARITHMETIC
ONLY — after the `NG-2` re-grain the live readings are the twelve terms summing `103`, the distinct figures summing
`100`, the same two caps holding against `103`, `6` of `12` rows carrying `(bounded)`, and the seed form UNMOVED. The
pass's CONFIRMATIONS below are unaffected — in particular the own-descriptor read is the `F1` pin's own mechanism.)*
**that A WRITE IS STRUCTURALLY IMPOSSIBLE — the module invokes no method on any argument and the applier takes no
element**; **that NO IMPORT BYTE EXISTS**; **that EVERY `env` READ SITS INSIDE A `try`**; and **that the only global
touches are OWN-DESCRIPTOR READS** — **with ONE recorded limit: a patched `Object.keys` would silently degrade every
`env` read, ruled `NOT-A-DEFECT` under `§2.5`.** **`PACKAGE DEFECTS: NONE`** (as `§7` item 2 expects).

**THE PASS'S NEGATIVE-GENERATOR TASK LIST, CARRIED BECAUSE IT IS OWED — `NG-1`…`NG-3`, and `NG-2` CARRIES A
PRE-COMMITTED RE-GRAIN THAT IS *NOT TAKEN*:** *(**`2026-09-27`, `§0A` note 8 item 3: read this heading by its own
POST-ANNOTATION below — `NG-2`'s re-grain IS NOW TAKEN, and the heading's *"NOT TAKEN"* is the PRE-GRAIN state kept
visible.)*
- **`NG-1`** — the **diverging `Proxy`** of `F1` and **a CONTAINER `env`** (`Object.assign([], {prefersDark: true})`,
  and a `Map` likewise) **into the `env` rows**.
- **`NG-2`** — **an INHERITED `env`** (`Object.create({prefersDark: true})`) **into `P-TH-TP-3`**, under the
  contract's own **PRE-COMMITTED RE-GRAIN `10→11` / `102→103`** — **RECORDED HERE AS PRE-COMMITTED AND NOT TAKEN:
  `P-TH-TP-3` still declares `10`, the total is still `102`, and the re-grain lands only if that drive is authored**;
  **plus the whitespace-only name `' '` into `P-TH-IM-3`, and a CALLER-OBJECT SNAPSHOT for `P-TH-TP-5`(c) (the `F5`
  remedy).** **⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8 item 3: the as-written *"NOT TAKEN"* above is the
  PRE-GRAIN state and is KEPT VISIBLE): THE DRIVE IS NOW AUTHORED AND THE RE-GRAIN IS TAKEN** — `P-TH-TP-3` declares
  **`11`**, the DECLARED total is **`103`** and the DISTINCT total **`100`**, each printed with its own terms and
  chain at `§5.5.3`; **`F5`'s snapshot and `NG-1`/`NG-3` remain owed on the `[T]` side.**
- **`NG-3`** — for **`P-TH-TP-1`**: **assert or print the twelve drawn indices (a `Set` size of `12`)** (the `F3`
  remedy).

**No pass may report this unit `DONE` while a row above is missing, while a bare `OWED` survives, or while a
`CONTRACT-AMENDED` row lacks its as-written form kept visible as `SUPERSEDED`.** **Every `F-n` row above is
DISPOSITIONED (its side named) and NONE is CLOSED; these findings are OWED, not fixed.** **A `DONE` row that reads
an `F-n` row as fixed, or that quotes `NG-2`'s re-grain figures `11`/`103` as the live ones, is a review finding.**
**⟶ POST-ANNOTATION (`2026-09-27`, `§0A` note 8): the sentence immediately above is the PRE-GRAIN form and is KEPT
VISIBLE, and the LIVE reading of it is the exact mirror — after this amendment the figures `11` (`P-TH-TP-3`'s term)
and `103` (the DECLARED total) ARE the live ones, so **a `DONE` row that quotes `10`/`102` as the live pair, or that
reads `P-TH-TP-5` as UNMARKED, is now the review finding** (`§5.5.3`, `§5.5.2` item 2).** **AND THE FIVE `AMEND-1`…`AMEND-4`
ROWS above are the CONTRACT-side dispositions this annotation landed: **`AMEND-1`/`AMEND-2`/`AMEND-3` are LANDED
(`CONTRACT-AMENDED`, each with its as-filed form kept visible at its own site) and `AMEND-4` carries `F2`/`F7` as a
`[T]`-SIDE obligation the TestWriter owes** — **so the seven `F-n` rows stay UNFIXED on their own sides while their
CONTRACT-side remedies are now recorded.** **And `PACKAGE DEFECTS: NONE` is the expectation for this unit** — it exercises no `provident-ssr` surface, so
**`docs/defects.md` and `docs/HANDOFF.md` should receive nothing from it** (`§7` item 2).

**⟶ THE DATED CLOSE-OUT ANNOTATION (`2026-09-27`, the supervisor's doc-writer close-out pass — appended BELOW the
as-filed blocks above, which are KEPT VISIBLE AND UNREWRITTEN: this is an annotation, never a rewrite, and the seven
`F-n` table rows above still read `OWED` as their PASS-TIME disposition).** **WHAT IT RECORDS, ONE LINE PER ITEM, so
the `DONE` row's clause (8) and the gate-8 record can cite it rather than re-derive it. NO register term, row id,
strategy id, seed, cap, shape, pool member or `(bounded)` marking moves in this annotation.**

| Finding | Live status after the close-out | The evidence, and ITS OWNER |
| --- | --- | --- |
| **`F1`** | **`CONTRACT-AMENDED` — the own-member read form is PINNED** (`AMEND-1`, `§2.3` item 2 row `(13)`), and **the landed module already conformed, so no module fix was owed.** The `NG-1` diverging-`Proxy` control is **authored in the test file**. | The contract pin is this file's; the landed module's conformance is `§0A` note 8 item 1's reading; the `NG-1` control's presence is **THIS PASS'S OWN FILE READ** of `tests/theme.test.ts`. |
| **`F2`** | **CLEARED — the `[T]`-side obligation is discharged:** the declared count-`0` assertion now rides the **DECLARED drive's OWN argument and its own recorder** (`shape.observe()` returns both), so the claim is falsifiable on the drive it is declared in; a fresh recorder is still passed explicitly as a CONTROL. | **THE SUPERVISOR's repair pass is the authority** (one adjudicated repair that cleared all six defect classes); **corroborated by THIS PASS'S OWN FILE READ** of `tests/theme.test.ts`'s `P-TH-IM-1` row and its in-place `F2` note. **NOT a leg run.** |
| **`F3`** | **CLEARED — the draw's twelve indices are PRINTED and the distinct-member coverage is ASSERTED against a measured figure**, with the undriven members named. | Supervisor's repair pass; **corroborated by THIS PASS'S OWN FILE READ** (`NG-3`'s `drawnIndices` / `Set` assertion). **NOT a leg run.** |
| **`F4`** | **`CONTRACT-AMENDED` — `P-TH-TP-5` carries its `(bounded)` marking; the marked set is `6` ROWS and `P-TH-TP-5`'s term stays `6`** (`AMEND-2`). | This file's `§5.5.1` cell and `§5.5.2` item 2, both landed `2026-09-27`. |
| **`F5`** | **CLEARED — `P-TH-TP-5`(c) carries a caller-object SNAPSHOT (before/after, both arms) and the snapshot instrument is itself proven LIVE** (a driver-made write must move it). | Supervisor's repair pass; **corroborated by THIS PASS'S OWN FILE READ** (`snapshotOf` + its liveness control). **NOT a leg run.** |
| **`F6`** | **CLEARED — the applier-first drive is a GENUINE order-independence drive on a literal token**, not a recomputation of drive 1. | Supervisor's repair pass; **corroborated by THIS PASS'S OWN FILE READ** (the `F6` drive-2 comment and its own call site). **NOT a leg run.** |
| **`F7`** | **`CONTRACT-AMENDED` (text) — the ledger title is corrected to the ledger's own reading (ONE differing row, `P-TH-IM-2`'s `12 → 9`), with the as-written six-row form kept visible, and the harness now asserts the ONE-row ledger.** | This file's `§5.5.2` item 3; the assertion is **corroborated by THIS PASS'S OWN FILE READ** (`HARNESS-4`). **NOT a leg run.** |
| **`NG-1`** · **`NG-3`** | **LANDED on the `[T]` side** (the diverging-`Proxy`/container controls; the printed drawn indices). | Supervisor's repair pass + this pass's file read. |
| **`NG-2`** | **LANDED, and its re-grain is TAKEN** (`P-TH-TP-3` `10 → 11`; declared `103`, distinct `100`; the inherited-`env` member is driven in `P-TH-TP-3` and in `F-2`'s pool). | This file's `§0A` note 8 item 3; **corroborated by THIS PASS'S OWN FILE READ** of `tests/theme.test.ts`'s register table and `HARNESS-1`. |

**THE HONEST LIMIT OF THIS ANNOTATION, STATED SO IT IS NOT OVER-READ: this pass ran NO LEG.** The five `[T]`-side
CLEARED cells above rest on **the supervisor's adjudicated repair pass** (its authority) plus **this pass's own file
read of the landed test file** (corroboration) — **neither is a re-run of `tests/theme.test.ts`, and the executed
green (`58/58`; the register `103/103`, `broken 0`, `registerStoppedAt: null`) is THE SUPERVISOR'S at `36b8c3d`,
quoted and never claimed as this pass's measurement.** **A later pass that wants the executed evidence must re-run
the commands; the doc-review record `archive/reviews/2026-09-27-U-THEME-doc-review.md` prints what each cell rests
on, cell by cell.**

## 3c. GATE 5 — THE BLIND GREENS, RECORDED (`2026-09-27`; the artifact is `docs/specs/theme-greens.md`, cited BY NAME)

**This subsection is the CONTRACT-side record of a gate that ran. It is APPENDED at the file end so that nothing
follows `§3b`'s own closing note, and it moves no term, row id, strategy id, seed, cap, shape, pool member, `(bounded)`
marking or section number. NO FIGURE BELOW IS THE MEASUREMENT OF THE PASS THAT LANDS IT: every one is the
BLIND-GREENS PASS'S OWN READING, quoted with that ownership (as `docs/specs/theme-greens.md` records it).**

1. **WHAT RAN, AND ITS CENSUS.** **`32` executed scenarios — `32` PASS / `0` FAIL / `7`
   `NOT-BLIND-RUNNABLE`** — driven **BLACK-BOX FROM THE DOCUMENTATION ALONE**: **the module was NEVER READ, only
   imported** (one path string handed to a dynamic `import()`), and **the red set `tests/theme.test.ts` was never
   read either** (the blindness claim is that pass's own, recorded at the artifact's `§I`). **Its revision is
   `fd70033`.** **The `7` non-runnable claims are NAMED at the artifact's `§E` and are counted as NEITHER pass NOR
   evidence** — **a green here proves THE RETURN VALUES OF TWO PURE FUNCTIONS AND NOTHING ELSE** (this file's layer
   declaration, honesty anchors 1/2/5).
2. **WHAT IT DROVE, INCLUDING THE CLAUSES THIS CONTRACT'S `§R`/`§M` ROWS ARE BUILT ON:** the **pass-through
   reading**; **`source`'s CLOSED DOMAIN over twelve `env` rows**; **the NAME-ECHO rule over twelve shapes**;
   **REMOVAL-AS-DATA**; **the exact key sets**; **a `48`-drive TOTALITY SWEEP**; and **the prohibitions as
   CALLER-OBSERVABLE FACTS — zero writes, zero element calls, zero realm reads in a TRAPPED CHILD.**
3. **ITS TWO RECORDED AMBIGUITIES — CARRIED, because each was resolved by CHOOSING A READING rather than by asking,
   and a later pass must not re-discover them:** **(a)** the **`§2.3` item 1 clause governing the NON-STRING
   reading** against the **coarser `String()` sentence in `§0A` note 4 / `§7a.1` item 1** — **resolved TOWARD THE
   CONTRACT'S `§2.3` TABLE, which governs**; and **(b)** the **omitted-name drive taken at ARITY 2 with `undefined`
   in the name slot**, per **`§0A` note 7(a)**'s arity-0 method note, **with no marker value invented** (the call
   whose BOTH slots are omitted is filed under the REMOVAL arm, where the contract declares it).
4. **ITS FIVE SELF-REPAIRED DRIVER DEFECTS — CARRIED AT THE ARTIFACT'S OWN `§F`, AND NONE OF THEM A CLAIM ABOUT THE
   MODULE** (`D-1` the `JSON.stringify` equality read; `D-2` the shadowed freshness identifier; `D-3` the
   arity-0/name-omitted conflation; `D-4` the restored-global probe; `D-5` the liveness control that could not
   fire): **all five are the WRITER'S OWN INSTRUMENTATION, repaired before the readings above, and the census was
   `32` executed before and after — only the readings moved.** **A later pass that reads `D-1`…`D-5` as module
   findings is misreading the artifact.**
5. **ITS `POST-GREEN` RE-DRIVE CLAUSE IS BINDING, AND IT IS CARRIED HERE IN SUBSTANCE.** **The set was authored
   against the module at `fd70033`; a LATER CHANGE TO `src/shared/theme.ts` STALES IT AND OWES A TARGETED RE-DRIVE
   RECORDED IN THAT FILE** — owed in particular for **(a)** any change to the **`source`** member's spelling or
   domain, **(b)** any change to the **name-echo** or **removal** rules, **(c)** any change to the **freshness**
   rule, and **(d)** any change to the module's **import set**. **The re-drive's readings must be APPENDED BESIDE
   the as-filed ones, never substituted, and a re-drive is its OWN pass with its own census printed beside this
   one** (`32` PASS / `0` FAIL / `7` `NOT-BLIND-RUNNABLE` stands as THAT pass's count).
6. **WHAT THIS RECORD DOES NOT DO, STATED SO IT CANNOT BE OVER-READ.** **It closes NO `§3b` finding** (all seven
   `F-n` rows stay `OWED`), **it re-asserts NO register figure** (the artifact's own `§G` item 7 makes no claim
   about the register's arithmetic, seed, caps or `(bounded)` set — `TG-NB-3`), **it offers NO `[U]` and claims NO
   `[D]`** (gate 6 stays **`STRUCTURAL`, never `waived`**), and **it moves no status beyond gate 5: `E8` remains an
   OPEN unit at gate 3 GREEN with gates 4 and 5 RUN** (`CURRENT STATE` item 11). **⟶ POST-ANNOTATION (`2026-09-27`,
   `§0A` note 8): this record's own readings are UNTOUCHED by the amendment that follows it — the `32` PASS / `0` FAIL
   / `7` `NOT-BLIND-RUNNABLE` census, its revision `fd70033` and its five driver defects all stand exactly as
   recorded — and the re-grain is a CONTRACT-side declaration (terms `11`/`103`/`100`, marked set `6` rows) that
   `TG-NB-3` expressly leaves outside this artifact's claims; the `POST-GREEN` re-drive clause (item 5) is triggered
   only by a change to `src/shared/theme.ts`, and the `F1` pin is satisfied by the LANDED module, so NO re-drive is
   owed by this amendment.**








