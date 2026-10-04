# Spec — the AMENDED store architecture: the node-anchor-link graph as the SOURCE OF TRUTH (the walk, the register, the two caches, the regeneration transaction, the event surface, the export)

**THE SUCCESSOR CONTRACT · derives the gate-1 record `docs/specs/store-node-graph-review.md` (the TWENTIETH member of the
`docs/specs/<proposal>-review.md` gate-record family) and, through it, the proposal
`docs/specs/store-node-graph-proposal.md` · STEP-0 dossier block at `§6` of THIS FILE · filed 2026-10-01 (machine clock)
against git `HEAD` `b6c95ec`.**

**⟶ THIS FILING'S AUTHORITY, stated once.** `docs/specs/store-node-graph-review.md` is the **CLOSED gate-1 record** for
this amendment: step 1 `BLOCKED-ON-SEMANTICS` · `FLAWED`, step 2 `BLOCKED-ON-SEMANTICS`, step 3 `APPROVE-WITH-CONDITIONS`
/ `NOT-DELEGABLE`, step 4 `APPROVE-WITH-CONDITIONS` printed beside this repo's in-force word
**`DELEGABLE-WITH-CONDITIONS`** for **the successor contract, after its spec gate**. **This file DERIVES the record and,
through it, the architect's directive and his round-2/round-3 answers; it does NOT re-litigate, weaken or re-open any
ruling, and a clause of this file that contradicts a ruling is a FINDING AGAINST THIS FILE, not a re-opening.**

**⟶ THIS FILE SUPERSEDES `docs/specs/store-core.md` BY RE-FILING, NOT BY EDITING.** The record's `§4` decides
**RE-FILE a successor** (its `§7` states the decided fate and the reason: the governing ruling *"THE FIRST RED SET CARRIES
THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"* requires **one red set against one contract**, and in-place
amendment would pay its filing saving with a **re-grain of a register whose own declaration and term table disagree with
its own size**). **Therefore: (a) `docs/specs/store-core.md` KEEPS ITS BYTES** — this pass edits no byte of it, and the
**one dated status marker** the record's `§7` owes it is written by the **supervisor's spec-gate pass**, not here; **(b)
its typed register is NEVER RE-GRAINED** and survives as the as-filed record of the **OLD** model; **(c) its red set is
never authored** and its *"authorable today"* status (`§4.1`/`§4.2` of that file) becomes **spent provenance**; **(d) its
two arithmetic findings — the declared row count (`20`) against its own table's rows, and its term table's coverage —
are corrected BY ANNOTATION BESIDE THE AS-FILED FORMS**, at that file's spec-gate pass or this one's, **never by
rewrite** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE, cited by row name). **This file is the successor's
contract; the held file is its predecessor and its provenance.**

**⟶ EVERY LANDED ROW THIS FILE DERIVES FROM IS CITED BY ROW NAME, NEVER RESTATED** — the ledgers are appended-to and
their line anchors drift. **The set, named once so a reader can complete it without assembling it:
`FOUR-TIER-DATA-OWNERSHIP-MODEL`** (its clause (1) alone: the four tiers and their scope) **·
`QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION`** (its clause (2)'s merged read, the subtree rule and the
one-envelope event surface, and its clause (1)'s qualifier-only rule) **·
`NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-PER-REFERENCE-CLEAR-EVENTS-DOWNWARD-REMOVAL-THE-REFERENCE-SET-CROSSING-AND-THE-CRITERION-AS-A-PLACEMENT-RULE`**
(its `R3-1` zero-active selection, its `R3-3` one-event-per-affected-reference rule, its `R3-6` downward removal and its
ordered-reference-set crossing) **· `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`**
(the scope ruling this amendment's walk depends on) **· `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY`**
(with `NO-FOUNDATION-CONFIG-FILE-FACILITY`'s clauses 2/3 surviving) **· `E10-SINGLE-SINK-CHANNEL`** **·
`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** **· `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** **·
`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (with `S-d11`) **· `ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`**
**· `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** **· `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** **·
`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`** **· `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** **· `AUTONOMY AFTER SPEC APPROVAL`.**
**No clause of any of them is restated here; where one is needed it is cited by name and the clause is read at its own
row.**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **THIS SPEC CARRIES NO LENGTH
CENSUS OF ANY FILE and makes no timing figure of any kind.**

**LAYER LABELS (`RCA-12`), binding on every behavioural claim below:** **[T]** node suite / pure module · **[H]** this
repo's `src/**` · **[U]** the real-DOM `ui` leg · **[D]** the divergence leg · **APP** the assembled app.

---

## CURRENT STATE (2026-10-01) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b` file-end note —
the placement the sibling specs use.)** **This block is the FILING-TIME state, and it is the whole of it:**

1. **THE FILING STATE, HONESTLY. NOTHING IS IMPLEMENTED, NO TEST IS AUTHORED, NOTHING IS GREEN.** This pass wrote
   **exactly ONE NEW FILE — `docs/specs/store-core-graph.md` (this contract), whose `§6` carries the STEP-0 dossier block
   the record's `§5`(c) owes** — and **edited NO existing file**: not `docs/specs/store-core.md`, not its dossier, not the
   proposal, not the record, not `docs/specs/data-ownership-model-plan.md`, not any tracker, not any sibling spec, not
   `AGENTS.md`, not `package.json`, not a script and not a config. **The modules (`src/renderer/store-core-graph.ts` and
   `src/renderer/store-graph-references.ts`), the test file (`tests/store-core-graph.test.ts`), the red set, the legs, the
   register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT EXIST YET.** The unit is
   **`OWED` at every gate after this one, and it is NOT delegable until a TestWriter has RUN and REPORTED the red set**
   (`AGENTS.md` item 9).

   **⟶ ANNOTATED 2026-10-05 (THE `U-STORE-DOC-SWEEP` PASS — the store's own standing-staleness reconciliation the
   `U-PANE-DRAG-COMPLIANCE` close-out routed; `RCA-8(d)` ANNOTATE-BESIDE — item `1`'s bytes above stand byte-for-byte and
   are this contract's FILING-TIME state, not a claim about the tree today).** **WHAT HAS LANDED SINCE, SO THIS BLOCK IS
   NOT READ AS CURRENT: both modules exist and are conformed to the frozen-surface artifacts; `tests/store-core-graph.test.ts`
   and `tests/store-core-graph-integration.test.ts` exist; the module wave ran `MODULE-RED → MODULE-GREEN → MODULE-AUDITED
   → FROZEN` and the integration wave `T4 → T5 → T6 → WAVE-GREEN`; `src/renderer/renderer.ts` wires the store at boot
   (`docs/specs/store-core-graph-compliance-review.md` `§9A`/`§9B`/`§9C`; `docs/next-steps.md`'s `G1` cell; `docs/pending.md`
   `P-8`).** **AND THE CARVE-OUT EVERY GREEN CLAIM ABOUT THIS UNIT OWES — THE LEGACY SUITE IS RED: `tests/store-core-graph.test.ts`
   carries `11` T9-class failing rows on the current tree (the supervisor's measured count, recorded at the compliance
   review's `§9B`/`§9C` and at the `G1` cell), because its `FIXTURE_CONSTRAINTS` still carries the SUPERSEDED data-table form
   and after `AMENDMENT CONSTRAINT-RE-DERIVE-1` the machinery evaluates only function-carrier members
   (`src/renderer/store-core-graph.ts:evaluateConstraints`).** **THE SUITE IS BYTE-UNCHANGED EVIDENCE, OWED A RE-AUTHOR UNDER
   THE RE-FROZEN ARTIFACT, AND ITS FATE (RE-AUTHOR vs RETIRE) IS THE ARCHITECT'S TO RULE — that ruling being the item's
   ENTRY CONDITION (`docs/specs/store-core-graph-compliance-review.md` `§9B`'s disposition block).** **THE UNIT'S GREENS ARE
   `ENVELOPE-GREEN` / first-root `INTEGRATION-green` AND ARE NEVER `APP-green`; the store is NOT to be reported as
   `landed-green` SIMPLICITER while this suite is red.** **NO OTHER WORD OF item `1`, and no other item of this block, moves.**
2. **THE SURFACE THIS FILING PINS (nothing of it exists yet):** a **NEW `src/renderer/store-core-graph.ts`** exporting
   **`TWO` runtime value exports and `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names** (`§2.1`), plus a
   **NEW `src/renderer/store-graph-references.ts`** holding the register's caller-declaration input and its type
   (`§2.1` item 3, `§2.4` item 8). **No existing file moves, and no held file is imported** (`§2.1` item 2). **A third
   module home for the graph, the register or the two caches is NOT taken** (`DR-13`(a) as a working default, `§7a.1`
   item 9).
   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-1`; `RCA-8(d)` ANNOTATE-BESIDE — the clause above stands byte-for-byte as filed and this clause is this pass's dated reading of it). THE AS-FILED `TWENTY-SEVEN` IS CORRECTED BESIDE: by this pass's own read of `§2.1`'s type block, that block declares `TWENTY-NINE` named exported type declarations — `29` lines there begin `export type`/`export interface`, the `2` `export function` lines excluded — because `GraphTierGetResult` and `GraphAffectedRow` are declared AS NAMED EXPORTS and are NOT inline shapes (`§2.1` item `3`'s annotation prints the count BY NAME and with its terms).** **THE OPERATIVE CENSUS IS `2` VALUE EXPORTS + `29` TYPE DECLARATIONS = `31` EXPORTED NAMES.** **The as-filed `TWENTY-SEVEN` / `TWENTY-NINE` are kept visible as the pre-correction pair; the `27`-figure's own terms (`3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27`) omit exactly those two declarations, and the corrected terms are `3 + 6 + 4 + 1 + 1 + 5 + 2 + 2 + 5 = 29` ✓.** **EVERY SITE THAT PRINTS THE CENSUS IS RECONCILED BESIDE IN THIS SAME PASS at `§2.1` item `3`'s annotation (`§4.1`'s green branch · `§5.1` row `1` · `§5.2` leg `2` · `§5.3` item `3` · `§6.1`'s declared surface · `§6.4`'s closing paragraph · the file-end note), and no byte of this item's second sentence is rewritten: the two modules, the two paths and the two value exports the item names are UNMOVED.**

   **⟶ RE-ANNOTATED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the item's own words and its earlier annotation both stand). THE OPERATIVE CENSUS IS `2` VALUE EXPORTS + `TWENTY-SEVEN` TYPE DECLARATIONS = `TWENTY-NINE` EXPORTED NAMES: the two declarations that existed only to serve the withdrawn merged arm — `GraphPart` · `GraphMergedRead` — are WITHDRAWN, so the `29` this item's earlier annotation printed is superseded BESIDE, and the operand list is the `§2.1` item `3` second annotation's, printed BY NAME with the arithmetic `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓.** **`GraphTierGetResult` and `GraphAffectedRow` remain counted, and the item's own *"NO existing file moves, and no held file is imported"* sentence, the two module paths and the two value exports are UNMOVED.**

3. **THE REGISTER (`§5.5.1`): `21` typed rows — `13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP` — `389` declared attempts,
   printed WITH their twenty-one terms and with a term-by-term addition at `§5.5.3`**, **`21` strategy ids
   (`S-GR-*`), one pinned-seed generator (`S-GR-TOTAL-1`, seed `20261002`, one LCG step per draw, `pool.length = 22`)**,
   and **`2` rows carrying a `(bounded)` marking**. **The caps are compared against the DECLARED figures: `389 ≤ 400`;
   per-row maximum `36` (`P-GR-IM-2`) ≤ `100`.** **The row count is an OUTCOME, not a budget.**

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS; `RCA-8(d)` ANNOTATE-BESIDE — the clause above stands byte-for-byte as filed and this clause is this pass's dated reading of it). THE AS-FILED `389` IS SUPERSEDED BESIDE: `389` IS NOT THE SUM OF ANY TERM SET THIS FILE PRINTS, and the nearest partial sums the as-filed chain prints are `388` (after `P-GR-TP-3`) and `403` (after `P-GR-TP-5`).** **Both sums this file prints WITH their terms are named here, and the register's twenty-one terms are enumerated once at `§5.5.3`'s closing block: the `§5.5.1` table's own twenty-one terms sum to `427` (the AS-FILED drive forms — the count that FAILED the cap), and `§5.5.3`'s corrected column sums to `233` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12`.** **THE OPERATIVE DECLARED TOTAL IS `233` AND THE OPERATIVE PER-ROW MAXIMUM IS `40` (`P-GR-IM-13`) — because a declared term IS a DRIVE count (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`) and `§5.5.3`'s caps paragraph compares the caps against the CORRECTED figures — so the operative comparison is `233 ≤ 400` ✔ with per-row maximum `40` ≤ `100` ✔.** **The row count above is UNMOVED and UNCHALLENGED: `21` typed rows — `13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `13 + 1 + 7 = 21` ✓ — with `21` strategy ids and the `2` `(bounded)` markings `P-GR-TP-1`/`P-GR-IM-12`.** **Every site in this file that prints a register attempt total or a per-row maximum is reconciled in `§5.5.3`'s closing block, which names each site and lists it as AGREEING, CORRECTED BESIDE, or OUT OF CLASS; the one finding that block raises is the `§5.5.1` table's printed terms summing to `427` while the note above it names `233` — with its own owner and its own positive revisit condition.** **NO OTHER WORD OF item `3` MOVES: no row, term, strategy id, pinned seed, cap value or `(bounded)` marking changes.**
   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — item `3`'s bytes above stand, its earlier annotation included, and this clause is this pass's dated reading of the register's size). THE ARCHITECT'S TWO AMENDMENTS, FOLDED IN BY THIS PASS, MOVE THIS ITEM'S REGISTER FIGURES, AND THE AS-FILED FIGURES STAY VISIBLE BESIDE: `22` TYPED ROWS — `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓ — AND `249` DECLARED ATTEMPTS, with per-row maximum `40` (`P-GR-IM-13`).** **(1) THE ROW COUNT: the architect's MONOTONIC-PERSISTENCE amendment adds ONE row, `P-GR-IM-14` (the named tree invariant, `§2.1`'s named-invariant block; the row is printed in `§5.5.1`'s table with strategy `S-GR-PERSIST-1` and term `16`, driven as the state-machine/totality pair over the four tokens), so the as-filed `21` (`13 + 1 + 7`) is superseded beside.** **`22` strategy ids (`S-GR-*`), the one pinned-seed generator `S-GR-TOTAL-1` (seed `20261002`, one LCG step per draw, `pool.length = 22`) and the `2` `(bounded)` markings `P-GR-TP-1`/`P-GR-IM-12` are UNMOVED.** **(2) THE DECLARED TOTAL: `249` = `233` + `16`, printed with ALL TWENTY-TWO terms at `§5.5.3`'s closing block, whose item `(8)` prints the chain `6 → 18 → … → 237 → 249` and whose item `(10)` reconciles every site that prints a total, a row count or a per-row maximum.** **The as-filed `389` and its `389 ≤ 400` / per-row `36` (`P-GR-IM-2`) were already superseded beside at `§5.5.3`'s closing block and remain visible here; the operative comparison is `249 ≤ 400` ✔ with per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔.** **THE CAPS ARE OTHERWISE UNMOVED: `RCAP-1`/`RCAP-2`/`RCAP-3` still count ROOT ROWS and amplifier-form subscriptions over top-level names (`§2.4` item `6`'s annotation), because MONOTONIC PERSISTENCE IS VACUOUS AT A ROOT — a root node has no parent link.** **NO OTHER WORD OF item `3` MOVES: no term of the `21` as-filed rows, no strategy id, no pinned seed, no cap value and no `(bounded)` marking changes.**

4. **THE LEGS THIS UNIT DECLARES (none run): `npm test` `[T]`** — the whole of this unit's green — plus
   `npm run typecheck` `[H]` (`src/**` ONLY; it never reads `tests/**`), `npm run build` `[H]`, **`npm run typecheck:tests`**
   (the ADDITIVE fourth leg that is the only leg compiling `tests/**`), plus a **standalone strict `tsc --noEmit` over this
   unit's own test file** (`§5.2`). **NO `[U]` ROW IS OFFERED and `[D]` IS NOT CLAIMED** — both refusals are three-part
   (`§5.2` items 2/3).
5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no read-only PBT audit,
   no blind-greens record, no per-unit documentation review and no DONE row (`§5.3` fixes its shape). **GATE 6 IS
   `STRUCTURAL`, NOT `waived` — the word `waived` may not be substituted for it** (`§5.2` item 3).
6. **THE `user-flow-audit.md` `§7.1` PREDICATE IS DETERMINED AS NOT TRIGGERING, RECORDED, AND NO REPORT IS DUE.**
   **The determination, in the predicate's own terms: no admitted unit authors a rendered surface.** This unit authors
   **no element, no envelope node, no handler body, no component binding and no control** — so **limb A is absent** — and
   **a store traversal, a register, a cache and a collector change no user-visible flow** — so **limb B is absent**.
   **The admissible form is NO report: a zero-row report is INVALID** (`user-flow-audit.md` `§7.1`; the record's `§7`).
   **A pass that files a zero-row `§5.U` report for this unit has failed this item.**
7. **THE OPEN DECISION REQUESTS THIS FILING RAISES, AND NOTHING ELSE BLOCKS** (`§7a.1`): **eleven** items, each with a
   working default implemented in `§2` and a recommendation so the red set is authorable today. **A later pass that
   changes one MUST open a gate.** **None is `undefined-until-answered`, and none blocks the spec gate** — the record's
   `C-1`…`C-9` are contract-content, values, filing and tracker conditions, and this file discharges the contract-content
   ones.
   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the clause above stands byte-for-byte). THE COUNT OF `eleven` IS UNMOVED: this pass adds no item, drops none and renumbers none.** **The two folded-in amendments touch FOUR of them and leave the other SEVEN alone: item `1` (the refusal union's closure — the recommended figure `eighteen` is CORRECTED BESIDE to the operative `SIXTEEN` = `8` held + `5` this contract's amendment + `3` added by the two amendments), item `2` (the flag's minting site — the recommendation is UNMOVED and the minted flag is now bounded by the parent node's own flag), item `10` (the per-`(path, tier)` repeat's routing surface — UNMOVED, with the `'durability-inversion'` arm beside it) and item `11` (the regeneration's census instrument — UNMOVED, with the transaction now five steps).** **Items `3` · `4` · `5` · `6` · `7` · `8` · `9` DO NOT MOVE, each for the reason printed in `§7a.1`'s closing effect block. The item's own closing claim — *"None is `undefined-until-answered`, and none blocks the spec gate"* — is TRUE of all eleven after this pass as it was before it.**

8. **THE TRACKER RESIDUES THIS FILING LEAVES** (the supervisor's to flip, because this pass edits NO existing file):
   `docs/next-steps.md`'s row **`G1`** still reads its spec cell as `OWED — not filed`; the ledger stays
   **`21 DONE / 3 open` UNITS = `24`** **unmoved**; **`RCA-8(f)` is satisfied and not breached — the architect admits
   ROWS, not a pass, and this pass writes no row.** **No count moved anywhere.**
9. **`docs/skills/designing-pages.md` DOES NOT EXIST** (`docs/skills/*` holds `process-guardrails.md` alone — globbed
   this pass), so **there is no test-use-case coverage matrix and no demo-page index to update** — and **this unit renders
   no page and authors no page design** (`§3.4 R-9` is the probe that keeps that claim falsifiable; `§5.2` item 3).
10. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no test run, no leg
    run, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command, no commit.** The
    new file is **untracked and must be committed by the supervisor** (`RCA-8(a)`'s per-gate commit rule; `RCA-8(c)` — it
    is a NEW file).

    **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS; `RCA-8(d)` ANNOTATE-BESIDE — the clause above stands as filed and this clause is this pass's dated reading of it). THE FILE IS TRACKED: this contract was COMMITTED at `50306fd` — *"SUCCESSOR SPEC FILED — `U-STORE-CORE`'s successor contract at `docs/specs/store-core-graph.md` (`1860` lines), awaiting the architect's spec-gate approval"* — a ONE-FILE commit adding this path with `1860` lines (`1860` insertions, no deletion), so the as-filed *"untracked and must be committed by the supervisor"* is SPENT on its filing status alone and is superseded beside.** **THE FIGURE IS READ AT THAT COMMIT: `50306fd`'s version of this path is `1860` lines (this pass's read of the blob), against the `1902` lines this pass reads in the working tree before its own edits — the `42`-line difference being the post-commit annotation passes, which the supervisor commits at the gate boundary (`RCA-8(a)`) and which this pass neither commits nor reverts.** **`RCA-8(e)` IS SATISFIED FOR THIS EDIT: the edited path exists in `HEAD` at `50306fd`, so this pass's annotations cannot be an unrecoverable loss.** **THIS PASS'S OWN EXTENT, IN item `10`'s OWN TERMS: ONE file edited (`docs/specs/store-core-graph.md`), ZERO files committed, no leg, no `npm test`, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session — the only `git` commands run being READ-ONLY inspections (`git show` · `git log` · `git status`) taken to name the commit above and its line count, stated here rather than left implicit.**

    **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — every word of item `10` above and of its earlier annotation stands byte-for-byte). THIS PASS'S OWN EXTENT, IN item `10`'s OWN TERMS: ONE file edited (`docs/specs/store-core-graph.md`), ZERO files committed, ZERO tests run — no leg, no `npm test`, no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no register row driven.** **The only `git` commands run were two READ-ONLY inspections (`git log --oneline -1` and `git status --porcelain`, taken to confirm `HEAD` `ec89565` and the clean worktree), and `RCA-8(e)` is satisfied for every byte this pass added, because the edited path exists in `HEAD`.** **WHAT THIS PASS DID, IN ONE SENTENCE: it folded in the architect's TWO AMENDMENTS (reversible tier-1 commits via serialization and validation; monotonic persistence as the second named tree invariant) and repaired the NINE observations the summary pass filed at `docs/specs/store-core-graph-summary.md` `§9`, each BESIDE its as-filed text, by ANCHORED EDITS ONLY — no whole-file write, no deletion of an as-filed sentence, and no line number cited anywhere in the annotations added.** **NO OTHER FILE WAS TOUCHED, READ FOR EDIT OR WRITTEN — not `docs/specs/store-core-graph-summary.md`, not the held contract or its dossier, not the proposal, the plan or the gate-1 record, not a tracker, not `docs/decisions.md`, not `AGENTS.md`, not `src/**` or `tests/**`.** **THE HEADING SET IS UNMOVED: `50` heading lines, and every heading's TEXT is unchanged (this pass's insertions are paragraphs placed beside headings, never a heading rewrite).** **NO TRACKER WAS UPDATED BY THIS PASS, WHICH IS THE ONE THING A LATER PASS MUST DISCHARGE: this contract's own `CURRENT STATE` item `8` still leaves the `G1` cell and the ledger counts to the supervisor, and this pass moved no count anywhere outside this file.**

**⟶ THE DATED RULING NOTES THIS FILING ADDS (2026-10-01).** **(1) The `R-9` SCOPE RULING LANDS.** The ACTIVE row
`R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET` is in force; its
decision row is filed and this contract is the artifact that carries its consequences, **its positive control is
RE-POINTED so that it is not vacuous** (`§3.4 R-9`, `§5.5.1` `P-GR-TP-2`). **(2) THE HELD CONTRACT'S FATE IS RECORDED
ABOVE: RE-FILED, SUPERSEDED-BESIDE, MARKER OWED TO ANOTHER PASS.** **(3) THE HELD DOSSIER IS REUSED, cited by path and
amended in place at the spec-gate pass** — its `A-6`/`A-7`/(`A-8`) re-statuses and its `R-9` collision reconciliation are
**authored at `§6` of THIS FILE BY ROW ID** (`§6` item 3). **(4) THE HELD REGISTER'S ARITHMETIC IS NOT INHERITED: this
file's register prints every total WITH its terms and re-derives every carried term** (`§5.5.1`, `§5.5.3`).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.**

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **the graph is the SOURCE OF TRUTH, with internal caching for traversal speed** — the record's `§5`(c) determination and the proposal's `§0.4` `A-A` | `§1` item 1, `§2.1` item 1, `§2.2` `P-1`, `§2.5`, `§3.3 I-1` |
| **2** | **ANCHORS ARE IMMUTABLE; RE-PARENTING = DELETE THE ANCHORS AND MINT NEW ONES** (the proposal's `§0.4` `A-F`) | `§2.2` `P-2`, `§2.3` item 4, `§2.7` item 5, `§3.2 F-6`, `§3.3 I-2` |
| **3** | **A DOTTED NAME IS AN ADDRESS** — register → top-level node → anchor → link → target; **the tier token is a FILTER, not part of the name**, and **the leaf node stores its OWN LOCAL NAME** (the proposal's `§0.4` `A-D`) | `§2.3` items 1/2, `§3.1 M-1`/`M-2`, `§3.2 F-1`…`F-5` |
| **4** | **A FAILED RESOLUTION RETURNS A VERBOSE PER-STEP DIAGNOSTIC NAMING THE FAILING STEP** (the architect's four named cases: no registered top-level name · no such anchor/property · no such leaf · no leaf with the requested tier) | `§2.3` item 6, `§2.4` item 7, `§3.2 F-1`…`F-5`, `§5.5.1 P-GR-TP-1` |
| **5** | **THE GRAPH IS A TREE BY CONSTRUCTION** (one parent link per node) **AND A SEGMENT IS DATA** — never coerced, never a prototype key (`'__proto__'` / `'constructor'` / `'toString'` are ordinary strings) (the record's `§2`; the proposal's `DR-4` ruling) | `§2.2` `P-3`, `§2.3` item 3, `§3.3 I-2`, `§3.4 R-2`, `§5.5.1 P-GR-IM-2`/`P-GR-TP-2` |
| **6** | **TIERS COMPOSE, UNDER A PER-`(LOGICAL PATH, TIER)` UNIQUENESS CONSTRAINT** — two holders may coexist across tiers; **at most one node per pair**; a repeat is **an edit to the existing node or a loud failure, per call params**; **THE MERGED READ AND ITS `parts` SURVIVE** (the record's `§2`(3), the proposal's `DR-11` ruling) | `§2.3` item 5, `§2.5` item 4, `§2.7` item 4, `§3.1 M-6`, `§3.2 F-6`, `§3.3 I-3`, `§5.5.1 P-GR-IM-3` |
| **7** | **TWO CACHES** — the register's and per-link — **each a `name → lowest-durability match` dictionary, INVALIDATED BY ANY REGISTER CHANGE OR ANY CHANGE TO A LINK'S ANCHOR SET** (the proposal's `§0.4` `A-F`) | `§2.6` items 1/2/3, `§3.4 R-5`, `§5.5.1 P-GR-IM-5`/`P-GR-TP-2` |
| **8** | **CAPS LIVE ON THE TOP-LEVEL REGISTER; REACHABILITY COLLECTS WITHIN THE GRAPH** (the proposal's `§0.4` `A-G`) | `§2.4` items 6/7, `§2.7` item 6, `§3.2 F-18`…`F-20`, `§5.5.1 P-GR-TP-4` |
| **9** | **A COMMIT TO A HIGHER TIER REGENERATES THE WHOLE SUBTREE AS A TRANSACTION: BUILD → COMPARE CENSUS → DELETE THE ORIGINAL ONLY ON A MATCH**; a mismatch is **a declared failure that leaves the original alive**; `N` affected references, **one receipt row per reference**, **one crossing per ordered reference set**, **the per-affected-reference event rule unchanged** (the proposal's `§0.4` `A-E`) | `§2.5` item 5, `§2.8` items 5/6/7, `§3.1 M-11`…`M-13`, `§3.2 F-9`/`F-10`, `§5.5.1 P-GR-SM-1` |
| **10** | **A SEVERED `file`-TIER NODE IS DELETED; THE FILE IS WRITTEN BY TRANSLATING THE GRAPH TO STABLE JSON** (the proposal's `§0.4` `A-B`) | `§2.7` item 7, `§2.8` item 8, `§2.9` item 6, `§3.1 M-14`, `§3.2 F-11`, `§5.5.1 P-GR-TP-6` |
| **11** | **NO PIN SET** — it is DELETED, not carried; **A WRITE TO AN ORPHANED REFERENCE FAILS, LOUDLY**, as a returned record (the proposal's `§0.4` `A-C`) | `§2.3` item 6 arm (vii), `§2.7` item 6, `§3.2 F-7`, `§3.3 I-6` |
| **12** | **`secure` IS A SEPARATE MAIN-SIDE COLLECTION**, refused **BY NAME, BEFORE THE REGISTER IS CONSULTED AND BEFORE ANY TRAVERSAL** | `§2.3` item 1, `§2.4` item 5, `§3.2 F-15`/`F-16`, `§5.5.1 P-GR-TP-5` |
| **13** | **`R-9`'s SCOPE IS RULED** (row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`): the clause bans a **GLOBAL engine-id-keyed map**, **not** a per-link, caller-keyed, walk-gated target set; **its no-counter / no-UUID half STANDS and binds the store-minted handle's minting** (working default `§7a.1` item 8) | `§2.2` `P-8`, `§2.4` item 2, `§3.4 R-9`, `§5.5.1 P-GR-TP-2`, `§6` item 3 |
| **14** | **THE HELD CONTRACT'S FATE: RE-FILE, SUPERSEDED-BESIDE, NEVER RE-GRAINED** (the record's `§4`/`§7`) | `CURRENT STATE` (this file's opening), `§8` item 1 |
| **15** | **THE HELD DOSSIER IS REUSED, CITED BY PATH, AND AMENDED IN PLACE AT THE SPEC-GATE PASS** (the record's `§5`(c)) | `§6` items 2/3 |
| **16** | **THE STEP-0 TRIGGER DOES NOT FIRE, AND A ZERO-ROW DOSSIER WITH A WRITTEN RATIONALE IS OWED** (the record's `§5`(c)) | `§6` item 1 |
| **17** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` + `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` + `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT` + `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** — the register is MANDATORY **before** the red set; the zero-row exemption is **not available** here; **a declared term is a DRIVE count**; **the total is printed WITH its terms** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` item 10 |
| **18** | **`AUTONOMY AFTER SPEC APPROVAL`** — after the spec gate the chain proceeds without further permission; **the spec gate is the one approval the chain waits for** | `§4.5`, `§5.3` |
| **19** | **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** — the family's OPACITY DISCIPLINE with the no-reach clause: **no parameter through which a coordinate, a magnitude or an element reach could arrive** | `§2.2` `P-9`, `§3.4 R-7`, `§5.5.1 P-GR-TP-5` |
| **20** | **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** — **THE STORE REFUSES NAMES, TIERS AND CAPS; IT NEVER REFUSES SIZES** | `§2.2` `P-6`, `§3.4 R-7` |
| **21** | **`E10-SINGLE-SINK-CHANNEL` / `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` / `SHELL-CHROME-PANES-ZONES-IN-SCOPE` (with `S-d11`)** — cited **by row name only**: this unit ships **no** sink, **no** gesture, **no** session member, **no** element and **no** geometry claim, and adds nothing to any frozen surface | `§2.2` `P-4`/`P-10`/`P-11`, `§3.4 R-8`/`R-10`, `§8` item 12 |

**Where the record, the proposal or a step report corrects a citation, this filing obeys the correction** — the corrected
site is cited, never the transcription that was corrected. **The known corrections, named so no reader re-derives them:**
the held register's **declared row count** (`20`, with its `11 + 1 + 8` split and the non-existent `P-SC-TP-8`) against
its **own table's rows** (`13 + 1 + 7 = 21`), and its **term table's coverage** (`20` terms for `21` rows) — **both
annotated beside the as-filed forms and neither inherited**; the proposal's own `§12` headline arithmetic (a summary that
does not sum) — **step 3's finding, carried and not re-derived**; and the `[H]` fact that `src/renderer/runtime.ts`
`:loadEnvelope` / `:loadDoc` tear the graph down and build a new `Supervisor` while `:tearDownGraph` never calls
`Supervisor.dispose()` — **carried as the retention record's `RH-1` reading, with `RH-5` for the never-released root,
and NOT re-measured by this pass.**

**⟶ THE ARCHITECT'S TWO AMENDMENTS, FOLDED IN BY THE DOCS-REPAIR PASS (2026-10-01) — NEW CONTRACT CONTENT THAT OUTRANKS NO RULING AND EXTENDS TWO OF THEM. Both are recorded here in the architect's own words, with the ruling each extends named, so no reader has to reconstruct which clause moved; each is then printed in operative form at its OWNING SITE.**

**(A1) TIER-1 COMMITS ARE REVERSIBLE UNTIL SERIALIZED AND VALIDATED.** **The architect's words, verbatim: *"Commits to file store level must be reversible at least until the actual file store has been serialized and validated. An attempted write to a file store should fail if it cannot be converted to saveable JSON."*** **THE OPERATIVE SENTENCE IT ADDS, PRINTED ONCE HERE AND AT ITS OWNING SITES (`§2.8` items `5`/`6`, with its read face at `§2.5` item `5`): *A COMMIT THAT REGENERATES A SET IN THE `file` TIER IS REVERSIBLE UNTIL ITS BUILT SET HAS BEEN SERIALIZED TO STABLE JSON AND THAT SERIALIZED FORM HAS VALIDATED; ONLY THEN IS IT ACCEPTED, AND ONLY THEN IS THE ORIGINAL DELETED — AND A WRITE THAT CANNOT BE CONVERTED TO SAVEABLE JSON FAILS.*** **It EXTENDS ruling `9` of the table above — the regeneration transaction — from `build → compare census → delete only on a match` to `build → compare census → serialize to stable JSON → validate the serialized form → accept-and-delete`, and it weakens, re-opens or re-reads no clause of ruling `9`.** **Its failure arms are THREE, each with its own declared token (`§2.8` item `6`'s annotation prints the arm/step/token/receipt-wording table): `'rebuild-failed'` — the EXISTING token, covering the CENSUS MISMATCH and nothing else of the three · `'serialize-failed'` — NEW, a value of the built set that cannot be represented as saveable JSON · `'validate-failed'` — NEW, a serialized form that does not validate.** **The refusal union therefore GROWS BY TWO MEMBERS, and the growth is reconciled against the block's DECLARED and PRINTED membership at `§2.1`'s block annotation (`O-9`: the operative count is `SIXTEEN`).**

**(A2) MONOTONIC PERSISTENCE — THE SECOND NAMED TREE INVARIANT.** **The architect's confirmation, verbatim: *"a node cannot have higher persistence than its parent."*** **THE OPERATIVE SENTENCE IT ADDS, PRINTED ONCE HERE AND AT ITS OWNING SITES (`§2.1`'s named-invariant block, beside `§2.3` item `4`, beside `§3.3` `I-2`, and at `§2.4`'s ruling block): *FOR EVERY PARENT LINK, `durability(child) ≤ durability(parent)`, UNDER THE ORDERING `file` > `mem` > `temp`; `secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING AND CARRIES NO GRAPH NODE — AND THE INVARIANT IS VACUOUS AT A ROOT.*** **It EXTENDS ruling `5` of the table above (the graph is a tree by construction, and a segment is data) with a SECOND tree invariant, and it adds ONE register row (`§5.5.1`'s `P-GR-IM-14`, strategy `S-GR-PERSIST-1`, term `16`), ONE refusal token (`'durability-inversion'`) and ONE write-side arm (`§2.4` item `7`'s annotation, arm `(h)`) — the union's THIRD added member.** **Its violation disposition is a DECLARED REFUSAL, not a repair: the alternative is priced and refused at `§2.1`'s named-invariant block, because a silent downward re-tier would be the store choosing a caller's residency (the second-authority class `§2.2` `P-7` closes).**

**AND THE TWO AMENDMENTS' LANDING SITES, SO NOTHING IS LEFT TO ASSEMBLY.** **A1 — `§2.8` items `2`/`5`/`6`/`8` (items `2`, `5` and `6` annotated; the crossing at item `8`, unmoved) · `§2.5` item `5` (the reversibility window) · `§3.1` `M-11`/`M-12` and `§3.2` `F-9`/`F-10`/`F-12` (annotated after their tables) · `§5.5.1` `P-GR-IM-9`/`P-GR-SM-1` (annotated after the table) · `§7a.1` item `11` and the closing effect block · `§8` item `8` (annotated).** **A2 — `§2.1` (the named invariant, in full) · `§2.3` item `4` · `§3.3` `I-2` · `§2.4`'s ruling block and item `7` (arm `(h)`) · `§2.4` item `6` (the caps: UNCHANGED, root rows) · `§2.6` item `3` (the invalidator set: UNCHANGED) · `§2.5` item `4` (the merged read: UNCHANGED) · `§5.5.1`'s new row and the register's re-printed total · `§5.5.3`'s closing block (the arithmetic and the site reconciliation) · `§7a.1` (items `1`/`2`/`4`/`10`/`11` and the closing effect block) · `§8` item `12`.** **⟶ SUPERSEDED IN PART 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` ABOVE; `RCA-8(d)` ANNOTATE-BESIDE — the landing-sites index above stands byte-for-byte). ONE ENTRY OF IT MOVES: *"`§2.5` item `4` (the merged read: UNCHANGED)"* is read as *"`§2.5` item `4` (the merged read: WITHDRAWN, and the read's surviving case set printed there)"*.** **THE OTHER TEN LANDING SITES OF `A2` ARE UNMOVED, and `A2`'s invariant, its three enforcement sites, its `'durability-inversion'` refusal and its register row `P-GR-IM-14` are untouched.** that prompt names `§2.7` for the regeneration transaction, and `§2.7` of this contract is the CONSTRAINT TABLE — the transaction is pinned at `§2.8` items `5`/`6`/`7` (its read face at `§2.5` item `5`, its ruling at `§0` ruling `9`), and this pass applied the amendment at the sites that own the transaction, not at the section the prompt names.** **NO HEADING IS RENUMBERED, NO ROW IS RENUMBERED, AND NO RULING IN THE TABLE ABOVE IS REWRITTEN.**

**(A3) THE MERGED ARM IS WITHDRAWN — THE ARCHITECT'S RULING ON THE READ'S CASE SET (2026-10-01, folded in by the withdrawal pass; `RCA-8(d)`: NOT ONE BYTE ABOVE IS REWRITTEN).** **The architect's words, verbatim: *"The merged arm is not in the graph spec because in the graph pattern the nodes already contain their tier references locally. Passing the clone/reference to the function calling the read already allows it to identify the node tier."*** **THE OPERATIVE SENTENCE IT ADDS, PRINTED ONCE HERE AND AT ITS OWNING SITES (`§2.5` item `4`, `§2.1`'s block, `§3.1` `M-5`, `§3.2` `F-8`): *THE READ HAS THREE CASES — HIT · QUALIFIED · MISS — AND THE MERGED ARM IS WITHDRAWN WITH EVERYTHING THAT EXISTED ONLY TO SERVE IT: the `parts` provenance list, the overlay order, the `GraphPart` type, the `GraphMergedRead` type and the read result's `merged`/`parts` members.*** **WHY, IN THE RULING'S OWN TERMS: a node carries its tier flag LOCALLY (`GraphNode.flag` is *"the ONLY residency carrier"*, `§2.1`'s `GraphNode` block), and a caller that receives the subtree — the clone or the reference — identifies each node's tier from the node ITSELF, so a store-assembled composite with a provenance list has NO SUBJECT: there is no state in which a path's descendants are resident while the path is unheld, because a descendant is reached THROUGH its parent's anchors (`§2.3` item `2`, `§2.2` `P-3`).**
**WHAT IT WITHDRAWS, NAMED SO THE SET IS CLOSED AND COUNTABLE: `§0` ruling `6`'s *"THE MERGED READ AND ITS `parts` SURVIVE"* clause · `§2.1` item `3`(b)'s `GraphPart` and `GraphMergedRead` declarations and the read result's `merged`/`parts` members · `§2.1`'s block comment on the merged arm and on `GraphResolveResult`'s third member · `§2.3` item `5`'s merged-read half and item `8`'s `merged`/`parts` sentence · `§2.5` item `4` in full (replaced by the case set below) · `§2.6` item `6`'s `parts`-ABSENT-as-ABSENT comparator clause · `§3.1` `M-5`'s as-filed subject · `§3.2` `F-8`'s as-filed subject (kept and restated as a plain property of the HIT arm) · `§3.3` `I-3`'s merged half · `§5.5.1` `P-GR-TP-7`'s as-filed subject and `P-GR-IM-13`'s `parts`-comparator clause · `§7` item `6`'s merged half · `§8` item `5`'s falsifier · `§3a`'s `ADV-GR-10` seed.**
**WHAT IT DOES *NOT* WITHDRAW, so the withdrawal is not over-read: TIERS STILL COMPOSE (two holders for one logical path across tiers, `§0` ruling `6`, `§2.3` item `5`), the per-`(path, tier)` uniqueness constraint and its two declared outcomes are UNMOVED, the tier token is still a FILTER on the node's OWN flag, and the `file`-tier commit's lower-tier clear (`§2.8` item `2`) is UNMOVED.** **NO ROW OF `§3` IS RENUMBERED, NO REGISTER ROW IS ADDED, DROPPED OR RENUMBERED, AND NO RULING IN THE TABLE ABOVE IS REWRITTEN: `§0` ruling `6`'s merged half is WITHDRAWN BESIDE its own bytes, which stand.**

### 0A. The dated ruling notes — the clauses the record leaves to a working default (RULED here as REVERSIBLE DEFAULTS, 2026-10-01)

**What this subsection is, and what it is not.** The record is **contract-exact** about the conditions `C-1`…`C-9` and
about the nine contract-content `DR-*` items; what it does **not** do is write the clause. **This filing DECIDES each of
those clauses HERE, AS A WORKING DEFAULT**, each with its reason and its landing site, **and every one is recorded as
REVERSIBLE at `§7a.1` with the alternative and its cost named — exactly as the held contract recorded its six.** **No note
below weakens a ruling, a condition or a prohibition row.**

**Note 1 — the two module paths, and why the successor needs a second file at all.** **No source names the successor's
paths.** **RULED: the STORE is `src/renderer/store-core-graph.ts` and the register's caller-declaration INPUT is
`src/renderer/store-graph-references.ts`** — both verified free 2026-10-01 (`src/**/store*` matches no file;
`tests/store*` matches no file). **The second file is not decoration: it is what keeps the store's own bytes free of the
caller's spellings, and what lets the register have a declared-but-cold row without a second declaration surface
(`§2.4` item 8).** **The held `src/renderer/store-references.ts` is NOT reused and NOT edited** — it is the held model's
declaration table, and this unit neither imports it nor moves a byte of it (`§5.1`'s DENIED set).

**⟶ READ UNDER THE ARCHITECT'S REGISTER CLARIFICATION 2026-10-01 — THE AS-FILED NOTE KEPT VISIBLE ABOVE.** **The second file's role is the CALLER'S TOP-LEVEL NAME DECLARATIONS: it names ROOT NAMES and it contributes NO REGISTER ROW, because a row exists for a root or not at all (`§2.4` items 3/8's annotations).** **The path, the two-module shape, the realm argument and the reason a second file exists — the store's own bytes must stand a scan with an EMPTY exemption set — are UNCHANGED.** **The note's phrase *"a declared-but-cold row"* is read as *"a declared-but-cold ROOT NAME"*: the state survives, the ROW does not.**

**Note 2 — where the graph, the register and the two caches live (the record's `DR-13`, resolved as a working default).**
**RULED: ONE renderer-realm module owns all four — `src/renderer/store-core-graph.ts`.** **The census, stated in full: two
modules exist in this unit's diff, and `store-core-graph.ts` carries EXACTLY TWO import statements — `./store-graph-references.js`,
and NOTHING ELSE at run time.** **No new module is created for the graph, the register or the two caches, and the fork's
moving set and the plan's re-vendor identity `15 = 2 + 6 + 7` are therefore untouched.** **Why the realm is FORCED rather
than chosen:** the graph's nodes are **live object references**, the register row's handle is a live value, and a graph
spanning two realms is unimplementable for the reason `docs/specs/store-core.md` `§0A` note 1b records for `cache`
(`docs/specs/mcp-endpoint.md` `P-E6`) — **so the graph is renderer-realm and `secure` stays main-side, which is what the
directive's *"separate collection"* asks for anyway.**

**Note 3 — the two-run store-state-independence row is SATISFIABLE AS LANDED, and the reason is the rebuild's SITE.**
The held row `docs/specs/store-core.md` `§5.5.1` `P-SC-IM-11` requires a call's answer to be **identical across two runs
whose only difference is the store's tier state**. **A read that rebuilds a cache entry is still a function of its
arguments iff the rebuild is deterministic in the graph state — which `§2.6` item 2 makes it (the entry is the
lowest-durability match, computed from the graph, with no clock, no counter and no insertion time).** **But the row's own
TWO RUNS could still differ in the cache's STATE after the first run**, which is why `§2.6` item 4 puts the rebuild **at
the invalidation site and never on the read path**: **the read is then side-effect-free over derived state, which is the
posture two landed rows pin** (the held `§2.9` item 3: *"`read` is UNCAPPED: a read never changes a count and can never
overflow"*; the plan's `§4.3` hop 1: *"a read fires nothing"*). **The row is NOT re-derived and NOT relaxed — it is
satisfied, and `§3.4 R-6` is the successor's own form of it.**

**Note 4 — the flag's declaration site is `commit` (the record's `DR-1`(iii), resolved as a working default).** **The
architect's four-step walk makes the flag *"the property it looks for"*, and the regeneration transaction is the one
operation that RE-TIERS a node — so the flag's minting site and the transaction's site are ONE.** **RULED: `commit` MINTS
a node's `type` (a missing node) and RE-MINTS it (an existing node, by regenerating the whole subtree). `set` NEVER mints
a node and NEVER changes a flag; on a path with no node it is REFUSED `'undeclared-name'`** — **because a `set`-supplied
flag would be a flag the caller declares, and *"a flag nobody declares is a default"*, which the held `docs/specs/store-core.md`
`§2.2` `P-2` closes.** **The surface that carries it: `commit(name, value, opts?)` — the minting operation's own
signature, with NO flag parameter.** **The flag is `GraphTierName`, and it is set ONCE per node generation.**

**Note 5 — the register's row shape is PURELY DERIVED PLUS A DECLARED-ROW INPUT (the record's `DR-1`(i)/(ii) and `DR-9`,
resolved as working defaults).** **RULED: (a) the register is a PROJECTION of the graph's parentless nodes AND of the
caller's declared rows; (b) a declared row with no node is the COLD ITEM and is `derived:false`; (c) resolution of a cold
item is the DECLARED MISS, not a refusal** — **which is the held `docs/specs/store-core.md` `§3.2` `F-9` control,
preserved at top level and therefore still decidable.** **The alternative — a purely graph-derived register — is recorded
at `§7a.1` item 5 with its cost: it would re-home the held declared miss onto a node that does not exist, and the `F-9`
control would lose its subject.** **The register's REFUSED SET is closed at `§2.4` item 5 (six construction-time arms) and
its write-side mapping is `§2.4` item 7.**

**⟶ SUPERSEDED IN PART 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE AS-FILED NOTE IS KEPT VISIBLE ABOVE AND THIS PARAGRAPH IS ITS OPERATIVE READING.** **The note's own title reading — *"PURELY DERIVED PLUS A DECLARED-ROW INPUT"* — is **NOT** the operative reading: **THE REGISTER IS PURELY DERIVED, THE DECLARED-ROW HALF OF THAT ADMISSION IS WITHDRAWN, and the register holds ONLY TOP-LEVEL NAMES (the root nodes of descendant trees), one row per root and never a row below one** (`§2.4`'s ruling block and item 3's annotation).** **What of the note STANDS: `(b)` — a cold item — and `(c)` — the declared miss is NOT a refusal — with the cold item re-stated as **A ROOT NAME WITH NO ROW YET** (`§2.4` item 4's annotation); `(a)`'s *"AND of the caller's declared rows"* is WITHDRAWN in those words.** **The alternative the note records — *"a purely graph-derived register"* — is therefore THE RULING rather than the alternative, and the cost the note priced against it (the held `F-9` control *"would lose its subject"*) **IS NOT PAID**: the control's subject is the TOP-LEVEL NAME DECLARATION, which survives at `§2.4` item 8, and `F-2`'s two arms keep their own positive controls.** **The note's closing pointers to `§2.4` items 5 and 7 stand, with item 5's arm-by-arm annotation and item 7's arm-(a) annotation beside them.** ***(The record's items this note resolves are `DR-1`(i)/(ii) and `DR-9`; `§7a.1` item 5 is their successor-side row and carries the amended working default, printed in the block under that table.)***

**Note 6 — the tier-side caps are SUPERSEDED BY RELOCATION, and the two cap families must not be confused.** **The held
`docs/specs/store-core.md` `§2.9`'s `CAP-1`/`CAP-2`/`CAP-3` bound tier-side quantities (a `mem` collection's element
count; the `temp` entry count; the amplifier-form subscription count). The amendment's `RCAP-1`/`RCAP-2`/`RCAP-3` bound
REGISTER ROWS (`§2.4` item 6), and the held `'cap-exceeded'` token KEEPS A REFERENT because the register is where the
top-level names are counted.** **RULED: the register-side caps are the live caps for this model; the tier-side `CAP-*`
figures are CITED as the working values' provenance and are NOT re-declared as live caps of this contract** — **so no row
of this file may assert a tier-side element count, and the two families never appear in one row.** **`RCAP-3` is the one
figure the record calls the LEAST re-derived** (the held `CAP-3` already counts subscriptions), **and it is declared here
unchanged in shape: an EXACT-reference subscription is NEVER capped.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE AS-FILED NOTE IS KEPT VISIBLE ABOVE; THE RELOCATION STANDS AND THE QUANTITY IS NOW FIXED.** **Under the ruling the register's rows ARE the root nodes, so `RCAP-1`/`RCAP-2` count ROOT ROWS (top-level names) whose own node carries the family's flag, and `RCAP-3` counts the amplifier-form subscriptions over top-level names — **never a total node count and never a non-root node** (`§2.4` item 6's annotation prints the three quantities with their terms).** **The note's own sentence *"the register is where the top-level names are counted"* is therefore the ruling's own sentence and is the operative one.** **The rest of the note is UNTOUCHED: the tier-side `CAP-*` figures stay CITED as provenance and are not re-declared as live caps; the two families still never appear in one row; and an EXACT-reference subscription is still NEVER capped.**

**Note 7 — the export's authority status is inherited, and its crossing rule is LOCAL-ONLY.** **RULED: the multi-level
export is a SNAPSHOT — a fresh object per call, NON-AUTHORITATIVE, recomputed on every read — which reuses the status the
held model already declares for its one composite (the held `docs/specs/store-core.md` `§2.5` item 5: *"NON-AUTHORITATIVE —
no tier holds it, it is recomputed on every read"*; the record's `§10` `R3` risk).** **AND: THE EXPORT IS LOCAL-ONLY AND IS
NOT REQUIRED TO SERIALIZE** — the directive's own words are *"for local use within a function"* — **so an export MAY NOT
carry a live `cache` handle beyond its caller and may not be claimed to cross an IPC boundary; the crossing form is the
named escalation if a host caller ever needs it** (`§2.9` item 7, `§3.4 R-8`).

**Note 8 — the store's own construction and ownership, stated once.** **The renderer's wiring creates EXACTLY ONE graph
store per realm, at boot, before the first `Y-1` hand-off, and holds it in the wiring's own closure or a realm-scope
binding owned by the wiring — NEVER in a module-level binding inside `store-core-graph.ts`.** **A second construction is
caught by the ROW that counts constructions, not by a silent second authority.** **The store is TOTAL and never refuses
construction: the only throws in the whole unit are the factory's LOAD REFUSAL for a malformed declared-row input (a
`GraphLoadError`), and the two test-seam throws** (`§2.2` `P-5`).

**Note 9 — the reference segment's own string operations are the held list, unchanged.** **The store's whole string
processing stays at the held four: a `typeof`/length check, `name.split('.')`, a whole-segment equality, and a
whole-logical-path equality.** **No trim, no lower-case, no prefix match, no suffix match, no `includes`, no sort, no
dedupe, no re-key, no numeric coercion** — **which is what makes `§2.2` `P-3` (segments are data) checkable rather than
assumed, and what makes the anchor key, the leaf's local name and the register row's spelling all the SAME kind of thing:
the caller's own string, carried verbatim.**

---

## 1. Scope

**One deliverable: the amended model, in one renderer-realm module pair — a node-anchor-link graph that IS the source of
truth, a top-level register projected from it with its own caps, a resolution walk with a per-step diagnostic, two
caches with an exhaustive invalidator set, a per-`(path, tier)` uniqueness constraint, a regeneration transaction, a
severance with its own arm and release rule, a stable-JSON translation, and a non-authoritative multi-level export.**

1. **What the unit is, in one sentence.** The successor contract for the amended store architecture: **the graph as the
   single residency authority** (one `type` flag per node), **the tier token as a filter** applied by a walk whose every
   failure arm names its own step, **the register as the graph's top-level projection with caps**, **the two caches'
   invalidator set and rebuild site**, **the per-`(path, tier)` uniqueness constraint with its two declared outcomes**,
   **the subtree-regeneration transaction with its census match and its declared failure**, **the `severed` event arm
   with its subscriber-release rule**, **the stable-JSON translation's rules**, and **the export's snapshot and
   local-only crossing rule**. **It is ONE CONTRACT and ONE RED SET: no second core pass is declared.**
2. **What the unit is NOT — no policy default, no second authority, no consumer vocabulary.** **No registered default is
   invented; a miss is a miss. No segment is interpreted, coerced or re-spelled. No store-side clamp exists: THE STORE
   REFUSES NAMES, TIERS AND CAPS, NEVER SIZES.** **No `is-*` literal, no consumer noun as the store's own vocabulary, no
   unit string, no element-id key** (`§2.2` `P-1`…`P-3`, `P-6`, `P-8`…`P-10`).
3. **What the unit is NOT — no MCP surface, no new seam, no frozen-surface change.** **No tool, no resource, no
   `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, no preload member, no
   `scripts` key and no config change** (`§2.2` `P-4`), **and no member is added to `docs/specs/gsession.md` `§2.5`'s
   frozen delegate surface** (`§2.2` `P-11`).
4. **What the unit is NOT — nothing of the held file's bytes moves, and nothing of the held file is imported.** **The held
   `docs/specs/store-core.md` keeps its bytes; its register is never re-grained; its red set is never authored; and this
   unit's two modules import NEITHER it NOR `src/renderer/store-references.ts`.** **Every held type this contract needs
   is RE-DECLARED in this file's own `§2.1` block, under a name that does not collide with any held name** (`§5.1`).
5. **What the unit is NOT — no UI, no geometry, no rendered surface.** **It authors no element, no text, no class, no
   attribute, no stylesheet and no control, and reads no coordinate, rect, computed style or clock.** **Therefore gate 6
   is `STRUCTURAL`** (`§5.2` item 3) **and the `user-flow-audit.md` `§7.1` predicate does not trigger** (`CURRENT STATE`
   item 6).
6. **What the unit is NOT — no persistence of its own and no channel.** **The store owns no file, no `fs`, no atomic write,
   no recovery and no tombstone.** **What crosses the channel is the TRANSLATION (`§2.9` item 6), and the channel is
   `U-STORE-PERSIST`'s; this unit drives it through a declared, STUBBED `crossing` seam and asserts NOTHING about it.**
7. **What is EXPLICITLY OUT of scope (do not do in this unit).** The tier-1 channel's atomic write, `fsync`, `.tmp`/rename
   discipline, recovery and `Y-3` push (`U-STORE-PERSIST`); tier 4's own API, its re-home and its receipt
   (`U-STORE-SECURITY`); the settings schema version and the migration; the tabs/focus slice's declaration rows and its
   two authored pages (`U-STORE-FOCUS`, a PROPOSAL); the rendered tab strip (`U-STORE-TABS-STRIP`, a PROPOSAL); the
   fifteen modules' store obligations (`U-STORE-MODULES`, a PROPOSAL); any `docs/skills/designing-pages.md` update — **the
   file does not exist and this unit renders no page**; and the held file's own arithmetic annotations (owed, routed,
   authored elsewhere).
8. **What the unit may land.** **`src/renderer/store-core-graph.ts` (NEW) ·
   `src/renderer/store-graph-references.ts` (NEW) · `tests/store-core-graph.test.ts` (NEW) · this spec (which carries its
   own STEP-0 dossier block at `§6`) · the unit's own `*-greens.md` · the unit's own `§3a`/`§3b` findings and tracker
   rows.** **NO edit to the held contract, the held dossier, the proposal, the record, `docs/next-steps.md` counts, any
   sibling spec, `AGENTS.md`, `package.json`, a script or a config.** **`src/shared/**` and the vendored tree stay
   BYTE-IDENTICAL.**
9. **The value is a FACILITY'S CONTRACT, and the honest cost is stated.** **This unit ships modules imported by the
   renderer wiring and by nothing else** — so its green is **envelope/pure-layer evidence that the contract holds for a
   driven in-realm graph store**, never that the app behaves differently. **The honest cost**: this spec + a **21-row**
   register + red/green **with remands** + the adversarial pass and read-only PBT audit + blind greens + the per-unit
   documentation review + a DONE row + per-gate commits.

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the cost sentence above stands byte-for-byte, its *"**21-row**"* included). ONE FIGURE OF THE COST IS CORRECTED BESIDE: THE REGISTER IS NOW `22` ROWS (`14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓) WITH AN OPERATIVE DECLARED TOTAL OF `249`, because the architect's monotonic-persistence amendment adds `P-GR-IM-14` (`§2.1`'s named-invariant block; `§5.5.1`'s table; `§5.5.3`'s closing block prints all twenty-two terms).** **NO OTHER TERM OF THE COST MOVES: the red/green with remands, the adversarial pass and the read-only PBT audit, the blind greens, the per-unit documentation review, the DONE row and the per-gate commits are all unmoved, and this pass added no gate to the chain.**
10. **The one thing this contract explicitly does NOT do:** **it makes no claim about the tier-1 channel's behaviour, the
    migration, the security tier's own API, the fork's tree, or any rendered surface.** **Those are other units', and a
    clause of this file read as reaching them is a finding against this file.**

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and throw pattern

**Two NEW modules, and an import census that is EXACT and TOTAL.**

1. **`src/renderer/store-core-graph.ts` — THE STORE.** It carries **exactly TWO import statements**:
   **(a)** `./store-graph-references.js`, **for the register's caller-declaration input and its row TYPE**; and
   **(b)** **NOTHING ELSE.** It imports **no `provident-ssr`**, **no `electron`**, **no `node:*`**, **no `src/main/**`**,
   **no `src/shared/**`**, **no sibling mechanism module**, **and not the held `store-core.js` or the held
   `store-references.js`.** **Every held type it needs is RE-DECLARED in this block** (`§1` item 4).
2. **`src/renderer/store-graph-references.ts` — THE INPUT.** It holds the **register's caller-declaration input** (the
   declared top-level rows and, where a caller wants one, a reserved flag) and **its own row type**. **Its export census
   is `ONE` value export (`storeGraphReferences`) plus `THREE` type declarations (`StoreGraphDeclarationRow`,
   `StoreGraphDeclarationInput`, `StoreGraphReferenceFixture`)** — **and it imports nothing but its own types.**
   *(`StoreGraphReferenceFixture` is the TEST-ONLY fixture type carried by this unit's own test file; it is declared here
   so the fixture's shape is contract-exact rather than invented at the test site.)*
   **⟶ AMENDED 2026-10-01 (THE DOCS-REPAIR PASS, `O-8`; `RCA-8(d)` ANNOTATE-BESIDE — item `2` above stands byte-for-byte, its census, its role and its parenthetical included). THIS ITEM PRINTS A CENSUS AND NO SIGNATURE, WHILE EVERY OTHER SURFACE OF THIS CONTRACT PRINTS ONE EXACTLY; THE MISSING SIGNATURE IS ADDED HERE, IN THE CONTRACT'S OWN SIGNATURE FORM, AS THE ONE FORM A RED SET CAN BE WRITTEN AGAINST.** **THE ADDED SIGNATURE, printed beside this item and OPERATIVE from this pass on:**

   ```ts
   /** THE ONE VALUE EXPORT of `src/renderer/store-graph-references.ts` — the CALLER'S TOP-LEVEL NAME DECLARATIONS
    *  (`§2.4` item 8's annotation): the names that MAKE a name a ROOT NAME. It contributes NO ROW to the register
    *  (`§2.4` item 3's annotation) and it imports nothing but its own types (`§5.5.1 P-GR-TP-6`). */
   export function storeGraphReferences(
     rows: readonly StoreGraphDeclarationRow[]
   ): StoreGraphDeclarationInput
   ```

   **WHY THIS FORM, STATED SO IT IS NOT MISTAKEN FOR AN INVENTED SHAPE: the factory consumes `declarations?: StoreGraphDeclarationInput` (`§2.1`'s block below), and item `2`'s own neighbour says that *"the real tenant's rows arrive later as an input"* (`§2.4` item 8) — so the module's single value export takes the CALLER'S OWN ROWS, carried verbatim and uninterpreted, and returns the input the factory loads.** **It adds no default, no policy predicate and no spelling of its own, which keeps this module the NAME surface it is (`§2.4` item 8's annotation) and keeps the store's own bytes scan-clean (`§2.2` `P-1`).** **THE ALTERNATIVE FORM IS NAMED RATHER THAN HIDDEN: `export const storeGraphReferences: StoreGraphDeclarationInput` — a DATA declaration, the shape the held `storeReferences` table had — is the second admissible form, and it is NOT taken because a data value cannot carry *"the real tenant's rows [that] arrive later as an input"*.** **THE CHOICE IS ARCHITECT-REVERSIBLE AND CARRIES AN OWNER AND A POSITIVE REVISIT CONDITION, NEVER A BARE `OWED`: OWNER — the architect, at the spec gate; POSITIVE REVISIT CONDITION — the first pass that writes the module either takes the printed form or rules the alternative, a one-line amendment here (`§7a.1`'s closing effect block records the same ruling request, and this pass adds NO twelfth decision-request item because the eleven-item set is counted at three sites).** **The item's CENSUS (`ONE` value export + `THREE` type declarations), its three type NAMES, the TEST-ONLY fixture type's provenance and the module's import census are UNMOVED: this annotation adds a SIGNATURE to a surface that had none, and changes no name, no count and no clause.**

3. **The export census of `store-core-graph.ts`, stated before the block so that it MUST AGREE with it: `TWO` runtime
   value exports and `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names.** **The two halves are counted
   separately on purpose**, because a type declaration is erased at run time, so a single *"29 exports"* claim would be
   half-unfalsifiable.
   **(a) THE TWO RUNTIME VALUE EXPORTS — exactly `createGraphStore` and `createGraphStoreError`.**
   **(b) THE TWENTY-SEVEN TYPE DECLARATIONS — exactly `GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason` ·
   `GraphResolveStep` · `GraphResolveDiagnostic` · `GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` ·
   `GraphTierHandle` · `GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry` ·
   `GraphConstraint` · `GraphPart` · `GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` · `GraphResolveResult` ·
   `GraphWriteReceipt` · `GraphWriteOptions` · `GraphEvent` · `GraphSubscription` · `GraphCrossing` · `GraphStore` ·
   `GraphLoadError` — **and NOTHING ELSE.** `createGraphStore`'s option record, the tier-local get result, the write
   receipt's `rows[]` pair and the write-side refusal record are **INLINE structural types, NOT named exports.**
   *(`createGraphStore` and `createGraphStoreError` are the two value exports and are NOT counted again among the
   twenty-seven; the four inline shapes are deliberately unnamed so the type half stays countable BY NAME.)*
   **⟶ THE ARITHMETIC, PRINTED WITH ITS TERMS, so a reader can check the census cell against the block beside it: the
   three domain types (`GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason`) · the six graph-structure types
   (`GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphCrossing`) · the four
   register-and-cache types (`GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry`) ·
   the one constraint type (`GraphConstraint`) · the one provenance pair (`GraphPart`) · the three read-result shapes and
   their union (`GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` · `GraphResolveResult`) · the walk's own two
   (`GraphResolveStep` · `GraphResolveDiagnostic`) · the event envelope and its subscription (`GraphEvent` ·
   `GraphSubscription`) · the write receipt and its options, and the store and the load error (`GraphWriteReceipt` ·
   `GraphWriteOptions` · `GraphStore` · `GraphLoadError`) = **`3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27` slots, and the block
   declares exactly `27` distinct named exports — so THE DECLARED COUNT IS `27` AND `3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 =
   27` ✓, every slot printed WITH its term.** **The as-filed `TWENTY-ONE` figure in this block's own opening sentence is
   therefore CORRECTED to `TWENTY-SEVEN`, kept visible rather than silently rewritten (`S-3`'s own remedy), and the
   census cell, the block and the DONE row's item 3 must all print `TWO + TWENTY-SEVEN = TWENTY-NINE` exported names.**
   **A row asserting a COUNT without NAMING the names FAILS.**
   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-1`; `RCA-8(d)` ANNOTATE-BESIDE — every sentence of item `3` above stands byte-for-byte, its `TWENTY-ONE → TWENTY-SEVEN` correction included, and this clause is this pass's dated reading of the census). THE CONTRADICTION IS RESOLVED ONE WAY AND APPLIED CONSISTENTLY: THE TWO SHAPES ARE COUNTED, NOT MADE INLINE.** **The reason is mechanical rather than preferential: the type block declares them as NAMED EXPORTS (`export interface GraphTierGetResult` · `export interface GraphAffectedRow`), so a reading that called them inline would leave the block's own bytes asserting an export the census denies — while counting them costs only a corrected figure, and the "and NOTHING ELSE" claim then becomes TRUE rather than read around.** **THE OPERATIVE CENSUS, BY NAME AND WITH ITS TERMS: `TWO` runtime value exports (`createGraphStore` · `createGraphStoreError`) + `TWENTY-NINE` type declarations = `THIRTY-ONE` exported names.** **THE TWENTY-NINE, BY NAME: the twenty-seven named above (`GraphTierToken` … `GraphLoadError`) PLUS `GraphTierGetResult` and `GraphAffectedRow`.** **THE CORRECTED TERMS, replacing item `3`'s `3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27`: `3` domain (`GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason`) + `6` graph-structure (`GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphCrossing`) + `4` register-and-cache (`GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry`) + `1` constraint (`GraphConstraint`) + `1` provenance pair (`GraphPart`) + `5` read-result shapes and their union (`GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` · `GraphResolveResult` · `GraphTierGetResult`) + `2` walk (`GraphResolveStep` · `GraphResolveDiagnostic`) + `2` event (`GraphEvent` · `GraphSubscription`) + `5` receipt, its `rows[]` pair, its options, the store and the error (`GraphWriteReceipt` · `GraphAffectedRow` · `GraphWriteOptions` · `GraphStore` · `GraphLoadError`) = `3 + 6 + 4 + 1 + 1 + 5 + 2 + 2 + 5 = 29` ✓ — every term printed, and each added slot NAMED rather than absorbed.** **THE INLINE SHAPES ARE THEREFORE `TWO`, NOT FOUR: of the four shapes item `3` calls inline-and-unnamed, the tier-local get result and the receipt's `rows[]` pair ARE those two declarations, so `4 − 2 = 2` ✓ — `createGraphStore`'s option record and the write-side refusal record remain inline, and the type half stays countable BY NAME.** **The already-printed `TWENTY-ONE → TWENTY-SEVEN` correction is itself corrected BESIDE rather than rewritten: `27 → 29`, and `TWO + TWENTY-SEVEN = TWENTY-NINE` → `TWO + TWENTY-NINE = THIRTY-ONE`.** **EVERY SITE THAT PRINTS THE CENSUS IS RECONCILED AT ITS OWN SITE IN THIS SAME PASS, each keeping its as-filed figure visible: `CURRENT STATE` item `2` · `§4.1`'s green branch · `§5.1` row `1` · `§5.2` leg `2` · `§5.3` item `3` · `§6.1`'s declared surface · `§6.4`'s closing paragraph · the file-end note.** **AND `A ROW ASSERTING A COUNT WITHOUT NAMING THE NAMES FAILS` KEEPS ITS FORCE: the count printed here is printed with all twenty-nine names and all nine terms.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`, FOLDED IN BY THE WITHDRAWAL PASS; `RCA-8(d)` ANNOTATE-BESIDE — EVERY SENTENCE OF ITEM `3` ABOVE STANDS BYTE-FOR-BYTE, BOTH EARLIER CORRECTIONS INCLUDED, AND THIS CLAUSE IS THE OPERATIVE CENSUS AFTER THE WITHDRAWAL). THE TWO TYPE DECLARATIONS THAT EXISTED ONLY TO SERVE THE MERGED ARM ARE WITHDRAWN — `GraphPart` (the provenance pair) AND `GraphMergedRead` (the merged arm) — SO THE TYPE HALF OF THE CENSUS MOVES AND IS RE-PRINTED BELOW BY NAME AND WITH ITS TERMS. THE WITHDRAWN ARM'S OWN REASON IS RECORDED AT `§0`(A3) IN THE ARCHITECT'S VERBATIM WORDS AND AT `§2.5` ITEM `4`.**
**THE OPERATIVE CENSUS, BY NAME AND WITH ITS TERMS: `TWO` runtime value exports (`createGraphStore` · `createGraphStoreError`) + `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names.**
**THE TWENTY-SEVEN, BY NAME, IN THE BLOCK'S OWN GROUP ORDER: `3` domain — `GraphTierToken` · `GraphNodeFlag` · `GraphRefusalReason`; `6` graph-structure — `GraphNodeRef` · `GraphNode` · `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphCrossing`; `4` register-and-cache — `GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` · `GraphLinkCacheEntry`; `1` constraint — `GraphConstraint`; `0` provenance pair — **NONE, `GraphPart` BEING WITHDRAWN**; `4` read-result shapes and their union — `GraphReadHit` · `GraphReadMiss` · `GraphResolveResult` · `GraphTierGetResult`; `2` walk — `GraphResolveStep` · `GraphResolveDiagnostic`; `2` event — `GraphEvent` · `GraphSubscription`; `5` receipt, its `rows[]` pair, its options, the store and the error — `GraphWriteReceipt` · `GraphAffectedRow` · `GraphWriteOptions` · `GraphStore` · `GraphLoadError`.**
**THE ARITHMETIC, PRINTED SO A READER CAN CHECK THE CENSUS CELL AGAINST THE BLOCK BESIDE IT: `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓ — twenty-seven slots and twenty-seven distinct named declarations, every term printed and every withdrawn slot printed as `0` rather than dropped from the sum.**
**TWO SUPERSEDED FIGURES STAY VISIBLE BESIDE, AND THEY ARE NOT THE SAME FIGURE AS THE OPERATIVE ONE EVEN WHERE THEY SHARE A NUMBER: the as-filed `TWENTY-SEVEN` (`3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27`, whose membership INCLUDES `GraphPart` and `GraphMergedRead` and EXCLUDES `GraphTierGetResult` and `GraphAffectedRow`) and the pre-withdrawal corrected `TWENTY-NINE` (`3 + 6 + 4 + 1 + 1 + 5 + 2 + 2 + 5 = 29`, which includes all four of those). THE OPERATIVE `27` SHARES THE AS-FILED FIGURE AND NOT ONE MEMBER OF ITS DISPUTED PAIR: it EXCLUDES the two withdrawn declarations and INCLUDES the two the `O-1` correction counted — so a row that asserts `27` without naming the names FAILS, exactly as the sentence above requires.**
**EVERY SITE IN THIS FILE THAT PRINTS THE CENSUS IS RECONCILED BESIDE IN THIS SAME PASS, EACH KEEPING ITS AS-FILED FIGURE VISIBLE: `CURRENT STATE` item `2` · `§2.1`'s block annotation (this clause's neighbour, item `(2)`) · `§4.1`'s green branch · `§5.1` row `1` · `§5.2` leg `2` · `§5.3` item `3` · `§6.1`'s declared surface · `§6.4`'s closing paragraph · `§3b`'s audit of the file-end note.**
**AND THE DECLARED COUNT IS STILL PRINTED WITH ALL THREE OF ITS READINGS: the value half (`2`), the type half (`27`) and the total (`29`) — because a type declaration is erased at run time, so a single *"29 exports"* claim would be half-unfalsifiable.**

4. **THE TIER TOKENS ARE NOT EXPORTED NAMES.** `GraphTierToken` is a **closed union type**, and the tokens themselves are
   **literals inside that union** — **so a row that reads the namespace's value keys and finds a `tier` constant object
   FAILS.** **The set the contract pins is named here so it is falsifiable: `'temp'` · `'mem'` · `'file'` · `'secure'`,
   EXACTLY four, case-sensitive.** **`GraphNodeFlag` is `'temp' | 'mem' | 'file'` — three members, because a
   `secure`-flagged node never appears in the register or the traversal** (`§2.4` item 5).

```ts
/* ───────────────────────────── THE CLOSED DOMAINS ───────────────────────────── */

/** THE FOUR TIER TOKENS — the name's CLOSED first-segment domain, CASE-SENSITIVE (§2.3 item 1).
 *  'secure' is a LEGAL PREFIX and is REFUSED by every generic operation, BEFORE the register and BEFORE any traversal. */
export type GraphTierToken = 'temp' | 'mem' | 'file' | 'secure'

/** THE FLAG A NODE CARRIES — THREE members. The tier token is the FILTER; this is the ONLY residency carrier. */
export type GraphNodeFlag = 'temp' | 'mem' | 'file'

/** THE CLOSED REFUSAL-REASON UNION — EIGHTEEN members, and this contract CLOSES it.
 *  A reason is a RETURNED RECORD MEMBER; it is NEVER a throw (§2.2 P-5).
 *  The EIGHT held members (cited, not restated) are 'undeclared-name' · 'malformed-name' · 'secure-refused' ·
 *  'reserved-name' · 'malformed-pattern' · 'cap-exceeded' · 'ambiguous-path' · 'reserved-namespace'.
 *  The FIVE this amendment adds are: 'duplicate-path-tier' (§2.7 item 4) · 'no-such-anchor' (§2.3 item 6 (ii)) ·
 *  'severed-link' (§2.3 item 6 (v)) · 'rebuild-failed' (§2.3 item 6 (vi)) · 'tier-filter-miss' (§2.3 item 6 (iv)). */
export type GraphRefusalReason =
  | 'undeclared-name' | 'malformed-name' | 'secure-refused' | 'reserved-name'
  | 'malformed-pattern' | 'cap-exceeded' | 'ambiguous-path' | 'reserved-namespace'
  | 'duplicate-path-tier' | 'no-such-anchor' | 'severed-link' | 'rebuild-failed' | 'tier-filter-miss'

/** THE WALK'S SEVEN STEPS, as an id the diagnostic can name (§2.3 item 6). */
export type GraphResolveStep =
  | 'A-PARSE' | 'B-SECURE-GATE' | 'C-TOP' | 'D-ANCHOR' | 'E-LINK' | 'F-CACHE' | 'G-RESOLVE-LEAF' | 'H-FLAG'

/** THE VERBOSE PER-STEP DIAGNOSTIC. `reason` names the failure's CLASS; `step` names WHERE it failed;
 *  `segment` is the caller's own segment that failed, or null where no segment failed; `owner` names the node
 *  the walk had reached, or null at step C. ABSENT-FRIENDLY: the record is returned ONLY on a refused resolution. */
export interface GraphResolveDiagnostic {
  readonly reason: GraphRefusalReason
  readonly step: GraphResolveStep
  readonly segment: string | null
  readonly owner: GraphNodeRef | null
}

/* ───────────────────────────── THE GRAPH ───────────────────────────── */

/** THE STORE-MINTED NODE HANDLE. A per-graph monotone string, minted by the store (§7a.1 item 8).
 *  IT IS NEVER LOOKED UP BY ANY PATH SEGMENT — the walk reaches a node through its ANCHORS and LINKS (§2.4 item 2). */
export type GraphNodeRef = string

/** ONE NODE. `flag` is the ONLY residency carrier and is set ONCE per generation (§7a.1 item 2).
 *  `localName` is the LEAF'S OWN NAME — never a stored dotted path (§2.3 item 2).
 *  `anchors` is a FROZEN array; `parentLink` is `null` for a top-level node and names the ONE link that reaches it. */
export interface GraphNode {
  readonly ref: GraphNodeRef
  readonly flag: GraphNodeFlag
  readonly localName: string
  readonly anchors: readonly GraphAnchor[]
  readonly parentLink: GraphLink | null
}

/** ONE NAMED PROPERTY SLOT. `key` is the CALLER'S OWN SEGMENT, carried verbatim (§2.2 P-3).
 *  ANCHORS ARE IMMUTABLE: there is NO anchor-mutation operation; re-parenting DELETES and RE-MINTS (§2.2 P-2). */
export interface GraphAnchor {
  readonly owner: GraphNodeRef
  readonly key: string
  readonly link: GraphLink | null
}

/** THE EDGE AN ANCHOR HOLDS. `to` is the store's own handle for the child; `cache` is THIS link's cache entry.
 *  A link whose `to` has been severed is NOT followable: it answers as a node holding no anchors and no targets. */
export interface GraphLink {
  readonly from: GraphNodeRef
  readonly to: GraphNodeRef | null
  readonly cache: GraphLinkCacheEntry
  readonly constraint: string | null
}

/** THE PER-TIER COLLECTION'S OWN HANDLE — a VIEW over the graph, membership by the node's own flag (§2.6 item 1).
 *  It is the SAME object each time it is read, so the held identity rule survives (§2.5 item 3). */
export interface GraphTierHandle {
  readonly tier: GraphTierToken
  get(name: string): GraphTierGetResult
  has(name: string): boolean
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  clear(name: string): GraphWriteReceipt
}

/** THE TIER-LOCAL GET — a record for EVERY name, never a throw (§2.8 item 4). */
export interface GraphTierGetResult {
  readonly found: boolean
  readonly value: unknown
  readonly name: string
}

/* ───────────────────────────── THE REGISTER AND THE TWO CACHES ───────────────────────────── */

/** ONE REGISTER ROW — the register's OWN row shape, re-derived for this model (§2.4 item 1).
 *  `derived` is `false` exactly for a COLD ITEM (a declared row whose path holds no node). */
export interface GraphRegisterRow {
  readonly name: string
  readonly nodeRef: GraphNodeRef | null
  readonly constraintId: string | null
  readonly reserved: boolean
  readonly derived: boolean
}

/** THE REGISTER — the graph's top-level PROJECTION plus the caller's declared rows. Immutable view. */
export interface GraphRegister {
  readonly rows: readonly GraphRegisterRow[]
}

/** THE REGISTER CACHE ENTRY — a dictionary of `name → THE LOWEST-DURABILITY MATCH` (§2.6 item 1). */
export interface GraphRegisterCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}

/** THE PER-LINK CACHE ENTRY — the SAME dictionary shape, scoped to ONE link (§2.6 item 1). */
export interface GraphLinkCacheEntry {
  readonly name: string
  readonly matchedRef: GraphNodeRef
  readonly matchedTier: GraphNodeFlag
}
```

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — TWO COMMENTS IN THE BLOCK ABOVE DESCRIBE THE REGISTER, AND BOTH ARE KEPT VISIBLE WITH THEIR OPERATIVE READING PRINTED HERE, SO A TESTWRITER DERIVING A RED SET FROM `§2.1` DOES NOT IMPLEMENT THE WITHDRAWN ADMISSION.** **The declarations themselves — `GraphRegisterRow`'s five members and `GraphRegister`'s one member — are UNCHANGED and no export is added or removed.** **What changes is the reading of two comments: (1) `GraphRegister`'s comment, *"the graph's top-level PROJECTION plus the caller's declared rows"* — the **caller's-declared-rows half is WITHDRAWN**; the register is the graph's top-level projection AND ONLY THAT, holding ONLY top-level names (the root nodes of descendant trees), one row per root and never a row below one (`§2.4`'s ruling block, item 3's annotation). (2) `GraphRegisterRow`'s comment, *"`derived` is `false` exactly for a COLD ITEM (a declared row whose path holds no node)"* — under the ruling a COLD ITEM IS A ROOT NAME WITH NO ROW YET, so **`derived` is `true` on every row that exists and `derived:false` is UNREACHABLE**; the cold item is expressed by the ROW'S ABSENCE, never by a row (`§2.4` item 4's annotation).** **`GraphRegisterCacheEntry`'s comment needs no amendment and one addition, carried here: the dictionary's `name → THE LOWEST-DURABILITY MATCH` is over **TOP-LEVEL NAMES ONLY**, because nothing below a root is registered (`§2.6` item 1's annotation).**

```ts
/* ───────────────────────────── THE CONSTRAINT TABLE ───────────────────────────── */

/** ONE CONSTRAINT ROW — the held table's four columns plus its MATCHED SET (§2.8 item 9). */
export interface GraphConstraint {
  readonly id: string
  readonly kind: 'count-exactly-one' | 'unique-path-tier'
  readonly matchedSet: string
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]
  readonly repair: 'next-surviving-by-order' | 'none'
  readonly onRepeat: 'edit' | 'refuse'
  readonly refusalReason: GraphRefusalReason | null
}

/* ═══════ SUPERSEDED / RE-DERIVED 2026-10-03 — THE ACTIVE ROW `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS` ═══════
 *  (`docs/decisions.md`, 2026-10-03 — "THE CONSTRAINTS ARE PASSED FUNCTIONS, NOT A DATA TABLE"; `RCA-8(d)`
 *  ANNOTATE-BESIDE — THE DATA-ROW FORM ABOVE IS THE SUPERSEDED READING, KEPT VISIBLE BYTE-FOR-BYTE). THE OPERATIVE
 *  FORM IS THE FUNCTION-CARRIER BELOW: per permitted constraint the caller supplies an `id` (a DECLARATION KEY,
 *  never a mechanism word), the `matchedSet` (a CALLER-SUPPLIED NAME the register/link resolves to the data it
 *  checks), the operation list it is evaluated on, THE CONSTRAINT FUNCTION and THE OPTIONAL REPAIR FUNCTION (absent
 *  where rejection-via-refusal is the whole answer). THE CLOSED `kind` / `repair` / `onRepeat` DATA-TOKEN DOMAINS ARE
 *  REMOVED from this type: `'count-exactly-one'` is ONE EXAMPLE use (`§2.7` item 5), never a closed kind;
 *  `'unique-path-tier'` is NOT a constraint at all — the single-holder-per-`(path, tier)` rule is a GRAPH INVARIANT
 *  enforced by the store's own write machinery (`§2.7` item 4) and never appears in this type; and `onRepeat` /
 *  `'duplicate-path-tier'` routing stays in the WRITE machinery (`GraphWriteOptions`; `§7a.1` item 10). The
 *  `evaluatedOn` member and the evaluation points are UNCHANGED (`§2.7` items 2/3). */

/** ONE CALLER-SUPPLIED CONSTRAINT — CODE, NOT DATA (`§2.7` item 1). The store CALLS these members; it never
 *  interprets a constraint's or a repair's internals (`§2.7` item 7), and no constraint is installed or mutated at
 *  RUNTIME — the set is supplied AT CONSTRUCTION through the factory option (`createGraphStore`'s `constraints`) and
 *  is read back only through the store's READ-ONLY view (`store.constraints`); no `addConstraint`-style surface
 *  exists or is added. */
export interface GraphConstraint {
  readonly id: string
  readonly matchedSet: string
  readonly evaluatedOn: readonly ('set' | 'commit' | 'remove')[]
  /** THE CONSTRAINT FUNCTION — CALLER CODE. The register/link calls it with (1) the CHANGED DATA, (2) the CURRENT
   *  state and (3) the NEXT state, and expects a BOOLEAN back; it may carry an ERROR MESSAGE / REFUSAL REASON back
   *  through the call's feedback — a RETURNED RECORD, never a throw (`§2.7` items 1/3). */
  readonly constraint: (
    changed: unknown,
    current: unknown,
    next: unknown,
    feedback: { readonly reason?: string; readonly message?: string }
  ) => boolean
  /** THE REPAIR FUNCTION — CALLER CODE, OPTIONAL. Called on a violation of this constraint; it takes CORRECTIVE
   *  ACTION on the data and outputs a SUCCESS BOOLEAN and an OPTIONAL ERROR MESSAGE through the same feedback.
   *  ABSENT ⇒ refusal-via-feedback is the whole answer (`§2.7` item 3). */
  readonly repair?: (
    data: unknown,
    feedback: { readonly reason?: string; readonly message?: string }
  ) => boolean
}

/* ───────────────────────────── THE READ AND THE WALK ───────────────────────────── */

/** A PROVENANCE PAIR: the TIER and THE PATH THAT TIER ACTUALLY HOLDS — never the read path (§2.5 item 4). */
export interface GraphPart {
  readonly tier: GraphNodeFlag
  readonly path: string
}

/** THE HIT. `cache` is the per-tier collection's handle — a VIEW, never a copy (§2.5 item 3). */
export interface GraphReadHit {
  readonly found: true
  readonly value: unknown
  readonly tier: GraphNodeFlag
  readonly cache: GraphTierHandle
  readonly name: string
  readonly merged?: undefined
  readonly parts?: undefined
}

/** THE DECLARED MISS — a cold item, or a resolved leaf that holds no value (§2.8 item 2). */
export interface GraphReadMiss {
  readonly found: false
  readonly value: undefined
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged?: undefined
  readonly parts?: undefined
}

/** THE MERGED ARM — no node holds the path, descendants do (§2.5 item 4). The merged read SURVIVES the amendment. */
export interface GraphMergedRead {
  readonly found: true
  readonly value: unknown
  readonly tier: null
  readonly cache: null
  readonly name: string
  readonly merged: true
  readonly parts: readonly GraphPart[]
}

export type GraphResolveResult = GraphReadHit | GraphReadMiss | GraphMergedRead

/** THE WRITE'S RECEIPT. `refused` carries a reason and NOTHING is mutated. `rows` is one row PER AFFECTED REFERENCE. */
export interface GraphWriteReceipt {
  readonly status: 'committed' | 'refused'
  readonly reason?: GraphRefusalReason
  readonly diagnostic?: GraphResolveDiagnostic
  readonly name: string
  readonly cleared: readonly string[]
  readonly repaired: readonly string[]
  readonly rows: readonly GraphAffectedRow[]
  readonly crossings: number
  readonly events: number
}

/** ONE ROW PER AFFECTED REFERENCE (§2.8 item 7). */
export interface GraphAffectedRow {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly nodeRef: GraphNodeRef
}

/** THE CALL PARAMS THAT ROUTE A REPEAT TO ONE OF ITS TWO DECLARED OUTCOMES (§2.7 item 4). */
export interface GraphWriteOptions {
  readonly onRepeat?: 'edit' | 'refuse'
  readonly onDuplicate?: 'edit' | 'refuse'
}

/* ───────────────────────────── THE EVENT SURFACE ───────────────────────────── */

/** ONE EVENT PER AFFECTED REFERENCE. The members are present AS KEYS on EVERY arm; the PER-ARM required set is the
 *  EIGHT-ROW TABLE (§2.10 item 2), which is THE TOTAL STATEMENT. */
export interface GraphEvent {
  readonly name: string
  readonly flag: GraphNodeFlag
  readonly value: unknown
  readonly cleared: readonly string[]
  readonly cause: 'set' | 'commit' | 'clear' | 'sweep' | 'remove' | 'repair' | 'descendant' | 'severed'
  readonly origin?: string
  readonly subtree?: true
}

export interface GraphSubscription {
  readonly name: string
  readonly subtree: boolean
  unsubscribe(): boolean
}

/* ───────────────────────────── THE SEAMS, THE FACTORY, THE STORE ───────────────────────────── */

/** THE TIER-1 CROSSING SEAM, INJECTED AND STUBBED. This unit declares it and asserts NOTHING about it.
 *  THE DEFAULT is a no-op recorder answering `{status:'committed'}`. */
export interface GraphCrossing {
  put(row: { readonly name: string; readonly value: unknown }): { readonly status: 'committed' | 'refused' }
}

/** THE LOAD REFUSAL — the ONE declared throw of the factory, for a declared-row input that does not load. */
export interface GraphLoadError extends Error {
  readonly reason: GraphRefusalReason
}

/** THE FACTORY. TOTAL: it NEVER returns a null/primitive for ANY argument. `{ declarations }` DEFAULTS to the empty
 *  input, so a store with no declared row is legal and every top-level item is minted by `commit`. */
export function createGraphStore(options: {
  readonly declarations?: StoreGraphDeclarationInput
  /** ⟶ RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`): the OPERATIVE reading of this
   *  option — the caller SUPPLIES the constraint/repair FUNCTIONS AT CONSTRUCTION, THROUGH THIS CALL PARAMETER (a CODE
   *  FEATURE); the as-filed reading of it as a DATA-TABLE input is SUPERSEDED. It is the ONE constraint supply site:
   *  no constraint-install path as data exists or is added, nothing mutates this set at runtime, and the store's
   *  read-only `constraints` view is the only way the set is read back. */
  readonly constraints?: readonly GraphConstraint[]
  readonly crossing?: GraphCrossing | null
  readonly reservedNamespaces?: readonly string[]
  readonly enableTestSeam?: boolean
}): GraphStore

/** THE ONE EXPORTED ERROR CONSTRUCTOR — the error the factory throws for an input that does not LOAD. */
export function createGraphStoreError(message: string, reason: GraphRefusalReason): GraphLoadError

export interface GraphStore {
  /** THE WALK (§2.3). TOTAL: for every argument, a GraphResolveResult or a refusal RECORD. */
  resolve(name: string): GraphResolveResult
  /** THE GENERIC WRITE, TIER-QUALIFIED. `set` NEVER MINTS and NEVER CHANGES A FLAG (§7a.1 item 2). */
  set(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  /** THE COMMIT — the MINTING and RE-GENERATING operation (§2.8 items 5/6). */
  commit(name: string, value: unknown, opts?: GraphWriteOptions): GraphWriteReceipt
  /** THE DOWNWARD REMOVAL — the held rule, cited by row name, unchanged in shape (§2.8 item 4). */
  remove(name: string): GraphWriteReceipt
  /** THE TIER-LOCAL, NON-RECURSIVE CLEAR (§2.8 item 4). */
  clear(name: string): GraphWriteReceipt
  /** THE SWEEP: unmark and clear the swept entries; N swept entries => N events, NEVER one event (§2.8 item 4). */
  sweep(name: string): GraphWriteReceipt
  /** THE MULTI-LEVEL EXPORT — a NON-AUTHORITATIVE SNAPSHOT, LOCAL-ONLY (§2.9). */
  export(name: string): GraphResolveResult | GraphRefusalReason
  /** SEVER ONE LINK. The reclaim operation: it DELETES the `file`-flagged node on the far side and RELEASES the
   *  subscriptions on it, emitting the `'severed'` arm (§2.10 item 3). */
  sever(from: string, anchorKey: string): GraphWriteReceipt
  /** THE SUBSCRIPTION. `{subtree}` is OPTIONAL and DEFAULTS TO false. */
  subscribe(name: string, listener: (event: GraphEvent) => void,
            opts?: { subtree?: boolean }): GraphSubscription
  /** THE THREE COLLECTIONS, BY TIER NAME, FROZEN — each a VIEW over the graph (§2.6 item 1). */
  readonly tiers: Readonly<Record<GraphNodeFlag, GraphTierHandle>>
  /** THE REGISTER'S OWN READ-ONLY VIEW (§2.4). */
  readonly register: GraphRegister
  /** THE CONSTRAINT TABLE'S READ-ONLY VIEW. ⟶ RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`):
   *  the OPERATIVE reading is a READ-ONLY VIEW OF THE CALLER-SUPPLIED CONSTRAINT SET (the functions given at
   *  construction, in their function-carrier form, `§2.1`'s block) — NEVER a data table a caller mutates at runtime,
   *  and never a constraint-install path; the row's own members are CODE, not data. */
  readonly constraints: readonly GraphConstraint[]
  /** THE TEST-ONLY SEAM. PRESENT ONLY when `{ enableTestSeam: true }`; ABSENT otherwise, as a ROW (§3.4 R-4). */
  reset?(): void
  seed?(rows: readonly { readonly name: string; readonly value: unknown }[]): void
  parentLinkCountOf?(nodeRef: GraphNodeRef): number
  cacheEntryFor?(name: string): GraphRegisterCacheEntry | null
  /** ⟶ ADDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`; `RCA-8(d)` — every byte of the four members above and of
   *  this block's own comment STANDS, and these three are APPENDED in the block's own declaration form). THE THREE
   *  READ-ONLY TEST-ONLY READERS, so a row can OBSERVE what the walk reaches: `nodeFor` answers a NODE by the reference
   *  a resolution yielded (its `ref` and its `flag`), `anchorFor` answers the ANCHOR on an owner for a caller's own
   *  `key` (its `key` and its `link`), and `linkFor` answers the LINK that anchor holds (its target — the declared `to`,
   *  `null` once the target is severed — and its PER-LINK CACHE ENTRY, the declared `cache`). READ-ONLY, each answers
   *  the graph's own object OR `null` when no such object exists, and NONE mutates the graph, the register, either cache
   *  or a listener set (`§2.4` item 2's handle-is-never-a-lookup-key rule is UNMOVED: these members take a REFERENCE
   *  the caller already holds, never a path segment). TEST-ONLY and PRODUCTION-NEGATIVE exactly as the four members
   *  above: PRESENT ONLY when `{ enableTestSeam: true }`, ABSENT otherwise. */
  nodeFor?(nodeRef: GraphNodeRef): GraphNode | null
  anchorFor?(owner: GraphNodeRef, key: string): GraphAnchor | null
  linkFor?(owner: GraphNodeRef, key: string): GraphLink | null
  /** ⟶ ADDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-2`). THE TEST-ONLY FAULT INJECTOR, ONE-SHOT AND
   *  ONE-SUBJECT: it arms the NEXT rebuild the INVALIDATION SITE performs (`§2.6` item 4 — the record's `DR-7`) to
   *  fail, which is what makes the walk's arm (vi) `'rebuild-failed'` at `F-CACHE` (`§2.3` item 6) DRIVEABLE.
   *  IT CAN FAULT NOTHING ELSE: not a read, not a write, not a serialization, not a validation, not a crossing, and
   *  not the CENSUS-COMPARISON arm whose own token is also `'rebuild-failed'` (`§2.8` item 6 (a)). The armed failure is
   *  INTERNAL and arrives as the arm's DECLARED RETURNED RECORD — it adds NO throw class (`§2.2` `P-5`'s three named
   *  exceptions are unmoved) and no event. TEST-ONLY and PRODUCTION-NEGATIVE exactly as the members above: PRESENT ONLY
   *  when `{ enableTestSeam: true }`, ABSENT otherwise. */
  failNextCacheRebuild?(): void
}
```

**⟶ AMENDED 2026-10-01 (THE DOCS-REPAIR PASS, `O-9` AND THE TWO FOLDED-IN AMENDMENTS; `RCA-8(d)` ANNOTATE-BESIDE — every byte of every block above stands as filed, its comments included, and this clause is the OPERATIVE READING of `GraphRefusalReason`, of the union's size, and of the export census the block's own declarations carry).**

**(1) THE REFUSAL UNION, RECONCILED: DECLARED COUNT AGAINST PRINTED MEMBERSHIP, WITH THE TERMS PRINTED.** **As filed the block's comment declares the union CLOSED AT `EIGHTEEN` members while the union expression it prints carries `THIRTEEN` (`8` held + `5` added), and NO TERM SET THIS FILE PRINTS REPRODUCES `18` — so the as-filed `EIGHTEEN` is CORRECTED BESIDE and recorded as SUPERSEDED, never silently rewritten, exactly as `CURRENT STATE` item `3`'s `389` is.** **THE OPERATIVE DECLARED COUNT IS `SIXTEEN`, AND IT IS THE PRINTED MEMBERSHIP: `16` = `8` HELD + `5` ADDED BY THIS CONTRACT'S AMENDMENT + `3` ADDED BY THE TWO ARCHITECT AMENDMENTS THIS PASS FOLDS IN. The three term groups, named:** **the held `8` — `'undeclared-name'` · `'malformed-name'` · `'secure-refused'` · `'reserved-name'` · `'malformed-pattern'` · `'cap-exceeded'` · `'ambiguous-path'` · `'reserved-namespace'`; the amendment's `5` — `'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` · `'tier-filter-miss'`; the two amendments' `3` — `'serialize-failed'` (A1: the built set cannot be represented as saveable JSON) · `'validate-failed'` (A1: the serialized form does not validate) · `'durability-inversion'` (A2: a child node would be more durable than its parent).** **`8 + 5 + 3 = 16` ✓.** **HOW A TESTWRITER READS IT: the union's members are the block's printed `13` PLUS these `3`, NAMED — and a red set asserting closure over `13`, `15`, `18` or any figure other than `16` is a red set against a superseded figure.** **EVERY SITE THAT PRINTS EITHER FIGURE IS RECONCILED BESIDE IN THIS SAME PASS: `§7a.1` item `1` (its recommended closure *"at eighteen members"*) · `§6.4`'s `O-6` row (*"RE-CLOSED BY THIS CONTRACT AT EIGHTEEN MEMBERS"*) · `§6.1`(d)'s *"five new refusal tokens"* · the file-end note.** **AND THE `O-9` FINDING IS FILED HERE WITH ITS ARITHMETIC RATHER THAN LEFT TO A READER: the as-filed pair (`18` declared against `13` printed) is a mismatch of the class `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` names for totals, and `18` is retained as the as-filed record that no printed term set reproduces.** **OWNER: the architect, at the spec gate, on the union's closure as `§7a.1` item `1`. POSITIVE REVISIT CONDITION: the first pass that writes the union's members into the block itself must print `16` with the three term groups above — or, if the architect's ruling on item `1` moves the figure, that ruling is recorded in the same pass and the figure is re-printed with its terms.** **No other comment, member or type of the blocks above moves, and no export is added or removed by this reconciliation.**

**(2) THE EXPORT CENSUS THE BLOCKS CARRY, ALREADY RECONCILED: the blocks above declare `2` value exports (`createGraphStore` · `createGraphStoreError`) and `29` NAMED type declarations — `GraphTierGetResult` and `GraphAffectedRow` among them — so the operative census is `31` exported names, and item `3`'s annotation prints the twenty-nine by name with their terms (`O-1`).** **The block's bytes are UNTOUCHED: the defect was the census, not the declarations.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — clause `(2)` ABOVE STANDS BYTE-FOR-BYTE). THE OPERATIVE CENSUS IS `2` VALUE EXPORTS + `27` TYPE DECLARATIONS = `29` EXPORTED NAMES, because TWO OF THE DECLARATIONS THE BLOCKS ABOVE PRINT ARE WITHDRAWN: `GraphPart` (the provenance pair) AND `GraphMergedRead` (the merged arm), each of which existed ONLY to serve the withdrawn merged read (`§0`(A3), `§2.5` item `4`, item `3`'s annotation beside this block).**
**THE WITHDRAWAL OF THE *MEMBERS* IS STATED AS WELL AS THE WITHDRAWAL OF THE *TYPES*, so a TestWriter does not re-derive a member that no longer exists: the read's result union is `GraphResolveResult = GraphReadHit | GraphReadMiss` — its third member `GraphMergedRead` is withdrawn — and the hit and the miss arms' `merged?: undefined` / `parts?: undefined` member lines are WITHDRAWN WITH IT, because those two lines existed only to make the merged arm's members ABSENT on the other two arms.** **`GraphReadHit`'s and `GraphReadMiss`'s remaining members are UNMOVED (`found` · `value` · `tier` · `cache` · `name`), and the block's own bytes are KEPT VISIBLE: the declarations are read as WITHDRAWN BESIDE their printed form rather than deleted from the block, which is what `RCA-8(d)` requires of a supersession.** **NO OTHER DECLARATION IS TOUCHED: the value exports, `GraphTierGetResult`, `GraphAffectedRow` and every other named type keep their bytes, and the type half stays countable BY NAME at item `3`'s annotation, where the withdrawn slots are printed as `0`.**

**(3) THE INTERACTION-PRECONDITION WITHDRAWAL, RECONCILED AGAINST THIS UNION — THE COUNT AND THE MEMBERSHIP BOTH UNMOVED, AND EVERY SITE THAT PRINTS EITHER NAMED AND DISPOSITIONED (2026-10-01, THE ARCHITECT'S RULING; `RCA-8(d)`, NOT ONE BYTE ABOVE REWRITTEN).** **WHAT WAS WITHDRAWN: `§2.7` item 6's as-filed precondition — the refusal of an input carrying two distinct constraint ids where neither declares an interaction rule — is WITHDRAWN, its exception being UNEXPRESSIBLE BY CONSTRUCTION, because `§2.7` item 1's declaration shape carries NO interaction-rule member; its operative text (the `N`-independent-rows rule) is printed at that item, whose as-filed bytes stand.** **THE UNION IS A SET OF TOKENS, AND THE WITHDRAWAL REMOVES AN ARM AND NO MEMBER: the withdrawn arm minted `'malformed-pattern'`, which IS one of the HELD `8` and STILL FIRES at its surviving construction-time site `§2.4` item `5`(f) (carried at `§2.4` item `7`(g); driven by the register's `§5.5.1` `P-GR-IM-6` arm `(f)`).** **SO THE OPERATIVE COUNT REMAINS `SIXTEEN` = `8` HELD + `5` THIS CONTRACT'S AMENDMENT + `3` THE TWO ARCHITECT AMENDMENTS, `8 + 5 + 3 = 16` ✓, and the three term groups are those printed at item `(1)` above, UNMOVED TOKEN FOR TOKEN: the held `8` — `'undeclared-name'` · `'malformed-name'` · `'secure-refused'` · `'reserved-name'` · `'malformed-pattern'` · `'cap-exceeded'` · `'ambiguous-path'` · `'reserved-namespace'`; the amendment's `5` — `'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` · `'tier-filter-miss'`; the two amendments' `3` — `'serialize-failed'` · `'validate-failed'` · `'durability-inversion'`.** **EVERY SITE IN THIS FILE THAT PRINTS THE COUNT OR THE MEMBERSHIP, EACH NAMED AND DISPOSITIONED — `UNCHANGED` where the site already prints `SIXTEEN` WITH ITS TERMS, `UNCHANGED AND READ UNDER THIS CLAUSE` where it prints an as-filed figure an earlier pass already corrected BESIDE:** **this block's own comment above (`EIGHTEEN` declared against `THIRTEEN` printed) — AS FILED, KEPT VISIBLE, already corrected beside at item `(1)`, and NOT moved by this pass · item `(1)` above (`SIXTEEN` = `8` + `5` + `3`) — UNCHANGED · `§2.4` item `7`'s `A2` clause (`SIXTEEN`) — UNCHANGED · `§2.7` item 6's new annotation (the withdrawal removes an ARM, never a MEMBER) — UNCHANGED · `§2.8` item 6's annotation (*"the union grows to SIXTEEN members"*) — UNCHANGED · `§5.5.1` `P-GR-IM-14`'s `TW-3` clause (*"the union's operative count stays `SIXTEEN`"*) — UNCHANGED, with a dated sentence added at that clause in this same pass · `§6.1`(d)'s token list (*"`SIXTEEN`, not thirteen"*) — UNCHANGED · `§6.4`'s `O-6` row (`EIGHTEEN` corrected beside to `SIXTEEN`) — UNCHANGED, with a dated sentence added at that block in this same pass · `§7a.1` item `1` (its recommended closure `eighteen`, corrected beside) and `§7a.1`'s post-table effect block (`SIXTEEN`) — UNCHANGED, with a dated paragraph added at that block in this same pass · `§3a`'s `ADV-GR-14` seed (*"the cascading case — which does not load"*) — **CORRECTED BESIDE**: it is the ONE site that printed the withdrawn clause's consequence, and the cascading case is RE-HOMED (an evaluation-time outcome), never a load refusal · the file-end note's item `(4)` (`SIXTEEN`) — UNCHANGED, extended by one dated item in this same pass.** **AND THE SITE LIST IS CLOSED AGAINST THE FILE'S OWN BYTES: no other site in this file prints the union's count or its membership, and no site prints the withdrawn precondition.** **NO ARM OF `§2.4` ITEM `5`'S CLOSED SIX MOVES EITHER: the withdrawn precondition was NEVER one of the six, and `§2.4` item 5(f) owns the token before and after this ruling.** **NO OTHER COMMENT, MEMBER OR TYPE OF THE BLOCKS ABOVE MOVES.**

**⟶ ADDED 2026-10-01 (THE ARCHITECT'S SECOND AMENDMENT, `A2`; THE NAMED-INVARIANT BLOCK THIS PASS ADDS — placed in `§2.1`, beside this unit's surface, so a TestWriter meets it before `§2.3`'s walk; printed in operative form again beside `§2.3` item `4`, beside `§3.3` `I-2`, and at `§2.4`'s ruling block).**

**THE SECOND NAMED TREE INVARIANT: MONOTONIC PERSISTENCE.** **The architect's confirmation, verbatim: *"a node cannot have higher persistence than its parent."*** **THE INVARIANT, IN THE CONTRACT'S OWN TOKENS: THE FOUR TIER TOKENS ORDER BY DURABILITY `file` > `mem` > `temp` (`file` most durable, `temp` least), AND `secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING THAT CARRIES NO GRAPH NODE (`§2.4` item `5`, `§2.11` item `2`; `GraphNodeFlag` is `'temp' | 'mem' | 'file'`, so no `secure`-flagged node exists).** **THE RULE, FOR EVERY NODE AND EVERY STATE: `durability(child) ≤ durability(parent)` along EVERY parent link — a node may never be MORE durable than the node that reaches it.** **THE INVARIANT IS VACUOUS AT A ROOT: a top-level node has no parent link (`GraphNode.parentLink` is `null`), so a root may carry ANY of the three flags — which is why the register's root-row caps do not move.** **IT SITS BESIDE THE TREE-BY-CONSTRUCTION INVARIANT (`§2.3` item `4`, `§3.3` `I-2`): the first invariant says every node has EXACTLY ONE parent link; this second one says WHAT THAT LINK MAY CARRY.**

**WHAT ENFORCES IT — THREE SITES, EACH WITH ITS OWN CLAUSE.** **(1) THE MINTING OPERATION: `commit` is the ONLY site that assigns a flag (`§0A` note `4`; `§2.8` items `1`/`3`), so a node minted BELOW A ROOT must take a flag whose durability is `≤` the flag of the node its last link reaches; a mint at a root is unconstrained by this invariant.** **(2) THE REGENERATION (`§2.8` items `5`/`6`): the transaction is the ONLY re-tiering operation and it re-tiers the WHOLE SUBTREE in ONE committed write, so no descendant can be left above its parent; the transaction's NEW ROOT node's tier must be `≤` the flag of the ORIGINAL root's own parent node where such a parent exists — so re-tiering a whole subtree DOWNWARD is legal and re-tiering a CHILD UPWARD is not.** **(3) THE UNIQUENESS CONSTRAINT (`§2.3` item `5`, `§2.7` item `4`): at most ONE node holds a `(logical path, tier)` pair, and NEITHER of its two declared outcomes can raise a node's durability — an `'edit'` repeat rewrites the existing node's VALUE and never changes a flag, and a `'refuse'` repeat writes nothing — so a caller cannot create a second, more-durable holder of a child path beside an unchanged parent.** **NO OPERATION ON THE SURFACE ASSIGNS A FLAG IN PLACE, which is why this invariant holds BY CONSTRUCTION rather than by a per-walk check — the same shape as the tree-by-construction invariant.**

**WHAT HAPPENS ON AN ATTEMPT TO VIOLATE IT: A DECLARED REFUSAL, NOT A REPAIR.** **An attempt to mint or regenerate a node at a tier more durable than its parent node's flag is REFUSED with a RETURNED RECORD — `{status:'refused', reason:'durability-inversion', cleared: [], repaired: [], rows: [], crossings: 0, events: 0}` — and the store is LEFT COMPLETELY UNCHANGED.** **Its sites: the MINT (`§2.8` item `3`), the REGENERATION's new root tier (`§2.8` item `5`), and the register's write-side mapping, where it enters as arm `(h)` (`§2.4` item `7`'s annotation).** **THE REPAIR ALTERNATIVE IS PRICED AND REFUSED: silently re-tiering a child DOWNWARD to satisfy the invariant would be the store CHOOSING a caller's residency change — the second-authority class `§2.2` `P-7` closes, and the same reason the cap posture refuses rather than evicts (`§2.4` item `6`) — so the store refuses loudly and the caller restates its tier.** **THE TOKEN JOINS THE REFUSAL UNION (the sixteenth member, above) AND THE WRITE-SIDE REFUSAL SET (`§2.4` item `7`); no other arm is touched.**

**ITS CONSEQUENCES FOR THE CLAUSES THAT INTERACT, EACH NAMED WITH WHAT MOVES AND WHAT DOES NOT.** **(a) THE COMMIT REGENERATION (`§2.8` items `5`/`6`): re-tiering a WHOLE SUBTREE DOWNWARD is LEGAL (every child's new tier is `≤` the new parent's); re-tiering a CHILD UPWARD is NOT — the new root tier is bounded by the original root's parent node's flag, the bound is checked BEFORE the census step, and its failure token is `'durability-inversion'`.** **(b) THE MERGED READ (`§2.5` item `4`): UNMOVED — and this is the invariant that makes its overlay order realizable: because a MORE durable parent may hold LESS durable children, a `file`-flagged parent may hold `temp` children, which is precisely the case the merged read's `parts` serves; `parts`' rules, the overlay order (`file` → `mem` → `temp`, descending durability) and the first-hit boundary (`§3.2` `F-8`) do not move, and no entry of a `parts` list may name a tier more durable than the read path's own parent chain.** **⟶ SUPERSEDED IN PART 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — clause `(b)` above stands byte-for-byte). THE MERGED READ IS WITHDRAWN, SO THIS CLAUSE'S SUBJECT IS THE NODE-LOCAL TIER READING AND NOT A `parts` LIST: the invariant's consequence for the read is now that **EVERY node a caller receives carries its own `flag`, and no tier a caller identifies can be more durable than the flag on the node the read resolved** — an overlay order and a provenance list have no subject where the caller reads each node's tier from the node itself (`§0`(A3), `§2.5` item `4`). **The invariant ITSELF, its three enforcement sites, its `'durability-inversion'` refusal and its register row `P-GR-IM-14` (strategy `S-GR-PERSIST-1`, term `16`) are ALL UNMOVED; what moves is one named consequence cell's read face.** **(c) THE FLAG-MINTING RULE: it is pinned at `§0A` note `4` and `§2.8` items `1`/`3` — NOT at `§2.10`, which is the EVENT SURFACE (the amendment's own prompt names `§2.10` there; the citation is corrected here rather than propagated) — and the rule's SUBJECT is unchanged (`commit` mints and re-mints, `set` never mints and never changes a flag) while its VALUE RANGE is now bounded by `(1)` above.** **(d) THE CACHE INVALIDATION RULE (`§2.6` item `3`): UNMOVED — a re-tier is already an invalidator by the two-part rule (it changes the register and the anchor sets), and THIS INVARIANT ADDS NO INVALIDATOR; what it adds is a FALSIFIER: no cache entry's `matchedTier` may be more durable than its matched node's own parent chain.** **(e) THE REGISTER'S ROOT-ROW CAPS (`§2.4` item `6`): UNCHANGED — `RCAP-1`/`RCAP-2`/`RCAP-3` still count ROOT ROWS and amplifier-form subscriptions over top-level names, because the invariant is VACUOUS AT A ROOT.** **(f) THE EVENT SURFACE (`§2.10`): UNMOVED — an event's `flag` member is the node's OWN flag (`§2.10` item `1`) and this invariant bounds WHICH flags can exist, so no arm, member or count of the eight-row arm table moves.** **(g) THE WALK (`§2.3` item `7`): UNMOVED — no step is added, because the invariant constrains the flag a node carries, not the walk that reaches it.**

**ITS EXECUTED FORM: the register row `§5.5.1` `P-GR-IM-14`, strategy `S-GR-PERSIST-1`, driven as a STATE-MACHINE/TOTALITY PAIR over the four tokens, with its term and its drives printed at `§5.5.1`'s table and `§5.5.3`'s closing block; its falsifier is printed beside `§3.3` `I-2` and inside `§8` item `8`'s annotation.** **NO NEW `I-` ROW IS ADDED AND NO ID IS RENUMBERED: the `§3.3` family is cited as `I-1`…`I-17` at `§4.1`, and this pass does not move that citation; the invariant's readable statement is this block and its driven form is the register row.**

**⟶ ADDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1` AND `TW-2`; `RCA-8(d)` ANNOTATE-BESIDE — every as-filed byte of the `GraphStore` block above STANDS, its own comment *"THE TEST-ONLY SEAM. PRESENT ONLY when `{ enableTestSeam: true }`; ABSENT otherwise, as a ROW (`§3.4 R-4`)"* included, and this clause is the dated reading of the FOUR MEMBERS THIS PASS APPENDS to that seam).**

**WHY THEY ARE APPENDED TO THE BLOCK RATHER THAN DECLARED IN PROSE, STATED SO THE FORM IS NOT MISTAKEN: the contract's test-only seam already exists IN the `GraphStore` declaration, and a TestWriter derives the red set FROM that block — so a seam member declared anywhere else would be a member the block's own bytes deny, the same defect class `O-1` filed for the export census.** **The four appended members are printed in the block above in the block's own declaration form: three optional READ-ONLY readers and one optional ONE-SHOT fault injector, each carrying the `?` marker the four as-filed members carry.**

**(1) THE SEAM'S MEMBER CENSUS, PRINTED WITH ITS TERMS: `8` DECLARED SEAM MEMBERS = `4` AS-FILED — `reset` · `seed` · `parentLinkCountOf` · `cacheEntryFor` — PLUS `4` APPENDED BY THIS PASS — `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild`; `4 + 4 = 8` ✓.** **THE APPEND IS ADDITIVE: no as-filed member is renamed, re-typed, given a default or removed, and the seam's own four as-filed names remain the ones a production-negative reading checks.**

**(2) THEIR DEGRADATION, STATED SO AN ABSENT MEMBER CANNOT SILENTLY PASS A ROW: a row that needs one of these four and finds it ABSENT — the seam not enabled, or the implementation not carrying it — REPORTS THE GAP (`§5.5` item 5: *"An un-run register row is reported as a FAILURE, never as a pass"*), and a row whose drive answered `null` from a reader where the contract's own fixture says a node, an anchor or a link EXISTS FAILS.** **No row may satisfy itself with a fabricated seam, and no reader below may be read as PRESENT when the seam is ABSENT.**

**(3) TEST-ONLY AND PRODUCTION-NEGATIVE, WITH THE EXISTING REQUIREMENT KEPT BINDING ON THE NEW MEMBERS: the production-negative row is UNCHANGED IN KIND AND EXTENDED IN SUBJECT — `§3.4 R-12`(c) and `§5.5.1` `P-GR-IM-10` read the store's own key set as *"EXACTLY the interface's declared members"* when the seam is not enabled, so ALL EIGHT seam keys — the four as-filed names PLUS `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild` — are ABSENT in a production-shaped construction and PRESENT only under `{ enableTestSeam: true }`.** **THE APPENDED MEMBERS ADD NO MCP SURFACE AND NO `scripts` KEY, AND THEY DECLARE NO SECOND SEAM: `§2.2` `P-4` is UNMOVED, this is the ONE seam the contract already declares, and `§2.11` item 1's construction count is unmoved.**

**(4) THE ROWS THEY UNBLOCK, NAMED — AND THE REASON THE FOUR ARE WORTH DECLARING AT ALL.** **`anchorFor` unblocks `§5.5.1` `P-GR-IM-2`'s ANCHOR half** (*"for EVERY anchor object read before and after an operation, `key` and `link` are UNCHANGED"*), **which the red set reports today as a contract gap because no declared member yielded an anchor; `linkFor` unblocks `P-GR-IM-5`'s LINK-ENTRY half** (the per-link cache entry, `GraphLink.cache` — the row's *"the link entry for the written path"* and *"the link entry for an untouched path"*), **which is unreadable off `cacheEntryFor` alone because that probe's declared key domain is TOP-LEVEL NAMES** (`§2.6` item 1's annotation); **`nodeFor` unblocks `P-GR-IM-2`'s FLAG half and `P-GR-IM-14`'s own two reads** — the node's `flag`, and the `parentLink` the monotonic-persistence drive reads, which that row's cell already says it reads *"never from a name, never from a register row and never from a tier token"* — **and it is the ONE member that answers a node's `ref`, so *"`flag` changes only together with a NEW `ref`"* becomes observable rather than inferred; and `failNextCacheRebuild` unblocks `P-GR-IM-8`'s arm-(vi) drive** (`§2.3` item 6 (vi), `'rebuild-failed'` at `F-CACHE`; **its compensating `§3` row is `F-6`**).

**(5) WHY NO TERM MOVES: a declared term IS a DRIVE count (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`), and the four appended members are INSTRUMENTS of drives the register already counts — `P-GR-IM-2`'s `12` (`6` operations × `2` reads) · `P-GR-IM-5`'s `12` (`6` invalidating operations × `2` reads) · `P-GR-IM-8`'s `7` (`7` failure arms × `1` drive) drive exactly what they drove before; what changes is that those drives can now READ their subjects instead of reporting a gap.** **`P-GR-IM-10`'s term is UNMOVED at `4` = `4` DRIVE MEMBERS × `1` DRIVE, and the reading is printed so it is not inferred: its `4` DRIVE MEMBERS are the four AS-FILED members, and the four appended keys are read by the SAME TWO READINGS that row already performs — the ENABLED reading and the ABSENT key-set reading — so the appended keys add ASSERTIONS to those drives and never drives.** **THE OPERATIVE TWENTY-TWO-TERM TOTAL IS THEREFORE STILL `249`, printed with all its terms at `§5.5.3`'s closing block item `(8)`, with the per-row maximum still `40` (`P-GR-IM-13`) — and this pass re-prints both at that block's item `(12)` rather than leaving the reader to check.**

**(6) ONE BOUNDARY IS PRINTED RATHER THAN LEFT IMPLICIT: each of the three readers answers an object the caller ALREADY HOLDS A REFERENCE TO, so NO reader can enumerate the graph, mint a reference, walk a path segment or cross the realm.** **`§2.1`'s live-`cache`-cannot-cross-an-IPC-boundary fact (`§7` item 4) applies to a reader's answer exactly as it applies to a resolution's `cache` member: a seam answer is `[T]` realm-internal evidence and NEVER `[H]`, `[U]` or APP evidence (`§5.5.2` item 4).**

### 2.2 The prohibitions — **every prohibition cites an ENUMERATED static row**

**Caller-supplied (never built in, never defaulted, never enumerated):** every reference name; every anchor key; every
value; every constraint id on a register row; the tier-1 crossing seam; the declared-row input; every listener; and every
subscription's `{subtree}` opt-in. **The two modules contain NO application string, NO consumer noun as their own
vocabulary, NO `is-*` literal, NO unit string, NO default value, NO policy predicate and NO persistence of their own.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No consumer vocabulary** — no `tab`/`pane`/`zone`/`gutter`/`region` token **as the store's own vocabulary**, no `is-empty`/`is-minimized`/`is-revealed` literal, no fork-origin literal `minimized` (the mirror-class ban) | **The store's bytes carry only its own tokens and the caller's strings** (`§0A` note 9). **The declared-row input lives in a SEPARATE file** (`§0A` note 1) **so the store's own scan stands with an EMPTY exemption set**; **a consumer noun appearing in `store-core-graph.ts` FAILS** | **`R-1`**, `M-17`, `I-9`, `§5.5.1 P-GR-TP-5` |
| **P-2** | **No anchor is ever mutated in place, and no node's flag is ever rewritten in place** — ANCHORS ARE IMMUTABLE; RE-PARENTING = DELETE THE ANCHORS AND MINT NEW ONES | **There is NO anchor-mutation operation and NO flag-assignment operation on the surface.** A re-tier is the regeneration transaction, which mints NEW nodes under the original's location and deletes the original only on a census match (`§2.8` item 6). **A row that observes an anchor's `key` or `link` changing on a live object, or a node's `flag` changing without a new `ref`, FAILS** | **`R-2`**, `M-9`, `F-6`, `I-[T-1/2]`, `§5.5.1 P-GR-IM-2` |
| **P-3** | **No segment is anything but DATA** — never coerced, never trimmed, never used as a prototype key; `'__proto__'` / `'constructor'` / `'toString'` are ORDINARY STRINGS | **Every segment is compared as a STRING and every dictionary this unit keys by name is built on a structure that does not inherit Object's prototype keys.** **A store whose name→target dictionary is a plain object FAILS** — **which is the POSITIVE CONTROL, and it is the held `§3a` seed `ADV-SC-1`'s exact shape** (`docs/specs/store-core.md` `§3a`) | **`R-2`**, `M-8`, `F-3`, `I-2`, `§5.5.1 P-GR-TP-2` |
| **P-4** | **No new MCP surface, no new seam, and no change to any frozen contract** | `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set, the `scripts` key set and `docs/specs/gsession.md` `§2.5`'s delegate surface are **UNMOVED**; **no `scripts` key is added** — it would redden `tests/ui-leg-contract.test.ts`'s `L-1`, which pins the `scripts` KEY SET, **and a config change cannot satisfy it** | **`R-10`** (`§3.4 R-10` — the citation form is fixed at `§3.4`'s head note, because `§3.4` and `§3.5` both carry an `R-10`), `I-11`, `§5.1` |
| **P-5** | **No throw on any declared-domain input** | Every API member is **TOTAL over its declared domain** and answers a **record**. **The named exceptions, and there are exactly THREE: (a) the factory's LOAD REFUSAL for a declared-row input that does not load (a `GraphLoadError`); (b) `reset()`/`seed()` called without the test seam enabled.** **A throw anywhere else FAILS** | `M-1`, `F-24`, `I-8`, **`R-3`** |
| **P-6** | **No store-side clamp, and no size refused** — **THE STORE REFUSES NAMES, TIERS AND CAPS, NEVER SIZES** | **The store has no size parameter, no arithmetic and no comparator**: values are `unknown` and opaque. **No row of this file asserts a size, a magnitude, a distance or a clamp** | **`R-7`**, `I-10`, `§2.2` `P-9` |
| **P-7** | **No store write to the graph's HOST and no second authority over any value a landed row owns** | **The store calls listeners and nothing else.** No dispatch, no envelope node, no handler body, no component binding, no DOM call, no `elementForNodeId`. **And the store derives, defaults and re-keys NOTHING it was given**: the flag is the node's own, the spelling is the caller's, the order is the caller's. **A store that derived, defaulted or re-keyed a value it was given FAILS** | **`R-3`**, `I-1`, `I-8`, `M-16`, `F-6` |
| **P-8** | **No engine-id key, no global map, and no counter or UUID beyond the declared per-graph handle** | The `R-9` scope ruling is in force (`§0` ruling 13): a **per-link, caller-keyed, walk-gated** target set is lawful; a **GLOBAL engine-id-keyed map** is not. **No path segment is ever looked up against any id registry, and no segment is treated as an id.** **The store-minted handle is per-graph and monotone, is NEVER a lookup key, and its control is re-pointed so that it is NOT VACUOUS** (`§3.4` `R-9`) | **`R-9`**, `I-12`, `§2.4` item 2, `§5.5.1 P-GR-TP-2` |
| **P-9** | **No element, no coordinate, no geometry, no magnitude, no clock** | **No `document`/`window`/`globalThis`, no `getBoundingClientRect`/`getComputedStyle`/`matchMedia`, no `clientX`-family read, no `element` parameter anywhere in the surface, no `Date`, no `Math.random`.** The family's opacity discipline, applied to the store's values: **an opaque caller value passes through uninterpreted** | **`R-7`**, `I-10`, `§5.5.1 P-GR-TP-5` |
| **P-10** | **THE GEOMETRY CLAUSE, CARRIED VERBATIM** (`S-d11`, mandatory wherever geometry criteria are described): *"the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described"* | **A graph traversal makes geometry claims no more provable than a family module does, and it must not become the place a coordinate finally lives.** **NO row of this unit may assert a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact, and no green of this unit may be reported as one** | **`R-7`**, `I-10`, `§5.2` items 2/3 |
| **P-11** | **No `provident-ssr` import beyond the declared census — and the census is ZERO** | **`store-core-graph.ts` imports exactly TWO statements, one of which is `./store-graph-references.js`, and NOTHING ELSE at run time; `store-graph-references.ts` imports nothing.** **The vendored package's `Anchor` / `Link` / `LinkConfigErrorCode` / `NodeState` are CITED as an external, unadopted type surface and are NEVER imported** (they are unusable in contract anyway: `src/main/**` and the package are what a renderer-realm store may not reach) | **`R-11`** (`§3.4 R-11` — `§3.4`'s head note fixes the form and names every bare `R-9`…`R-12` site), `I-13`, `§5.1` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`…`R-12`): **a prohibition citing *"a static source
row"* with no id is not a row**, and **every prohibition above names at least one id that exists in `§3.4`.**

---

### 2.3 The grammar and the resolution walk (exact)

**THE GRAMMAR, exact and closed.**

```
<name>       ::= <tier> "." <top> [ "." <anchorKey> ]... [ "." <localName> ]
<tier>       ::= "temp" | "mem" | "file" | "secure"          // CASE-SENSITIVE, exactly four
<top>        ::= one non-empty caller segment                // the registered top-level name
<anchorKey>  ::= one non-empty caller segment                // an anchor KEY on the node the walk reached
<localName>  ::= one non-empty caller segment                // the LEAF's own local name
```

1. **THE FIRST SEGMENT IS THE TIER TOKEN, and it is A FILTER, NOT A PART OF THE NAME.** **Its domain is CLOSED and
   CASE-SENSITIVE**: `File.x` is **not** `file.x`; `disk.x` and `.x` are outside the domain. **The token is what the
   resolution FILTERS the resolved node's own flag on — it is not a segment of the stored name and not a key.**
   **`secure` is a legal prefix and is refused BEFORE the register is consulted and BEFORE any traversal**
   (`§2.4` item 5).
2. **THE LEAF NODE STORES ITS OWN LOCAL NAME.** `file.window.tabs.landingPage` stores the name `landingPage` **on the
   node**, and the prefixes are **the path the resolution walks** — `window` is the registered top-level name, `tabs`
   is the anchor key, `file` is the flag the walk filters on. **A node that stored a dotted path FAILS `M-2`.** **A
   segment is never the id of a node the walk did not reach.**
3. **EVERY SEGMENT IS NON-EMPTY AND A NAME IS A NON-EMPTY STRING, and EVERY SEGMENT IS DATA.** `file..x`, `file.`, `''`
   and a non-string are refused `reason:'malformed-name'`. **`'__proto__'`, `'constructor'` and `'toString'` are ORDINARY
   STRINGS**: a name built from them parses, walks and resolves by the same rules as any other, **and the store's
   name-keyed dictionaries are built so that they cannot be prototype keys** (`§2.2` `P-3`).
4. **THE GRAPH IS A TREE BY CONSTRUCTION, AND ITS ANCHORS ARE IMMUTABLE.** **Every node has EXACTLY ONE parent link
   (`parentLink`), and no operation creates a second**: a re-parent is **a DELETE of the anchors plus a MINT of new
   ones**, which is what makes the cache's anchor-set invalidator well-defined and what makes **a cycle
   UNCONSTRUCTIBLE**. **No visited set and no depth bound is owed**, because the walk's termination is a stated
   structural invariant with a positive control (`§2.2` `P-2`, `§3.3` `I-2`, `§3.4` `R-2`).
   **⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S SECOND AMENDMENT, `A2`; `RCA-8(d)` ANNOTATE-BESIDE — item `4` above stands byte-for-byte). THE SECOND NAMED TREE INVARIANT SITS BESIDE THIS ONE: MONOTONIC PERSISTENCE — `durability(child) ≤ durability(parent)` for EVERY parent link, under the ordering `file` > `mem` > `temp`, with `secure` a separate main-side collection outside the ordering and carrying no graph node; the invariant is VACUOUS AT A ROOT (`§2.1`'s named-invariant block prints the full clause, with its three enforcement sites, its `'durability-inversion'` refusal and its consequences for the commit regeneration, the merged read, the flag-minting rule, the cache invalidation rule, the event surface and the root-row caps).** **This item's own claims are UNMOVED: EXACTLY ONE parent link per node, no second by any operation, a cycle unconstructible, a re-parent = DELETE + MINT, no visited set and no depth bound owed, and the vacuous-control finding.** **The second invariant neither weakens the first nor adds a walk step: it constrains the FLAG a node may carry, not the NUMBER of links that reach it — so the tree's shape claims (`I-2`, `R-2`, `F-23`) and the walk's termination claim are untouched.**

5. **TIERS COMPOSE, AND AT MOST ONE NODE HOLDS A GIVEN `(logical path, tier)` PAIR.** **Two holders may coexist for ONE
   logical path ACROSS tiers** — the held model's logical-path binding survives, and the held first-hit shadow and the
   merged read with its `parts` list **both SURVIVE**. **A second attempt at the same pair is routed to one of its two
   DECLARED OUTCOMES by the call params**: `{onRepeat:'edit'}` (the DEFAULT) **treats it as an EDIT to the existing
   node**, and `{onRepeat:'refuse'}` **fails LOUDLY** with `reason:'duplicate-path-tier'` and leaves the store
   unchanged. **A body that silently creates a second node for one pair FAILS `M-6`; a body that refuses a legal
   SECOND TIER's holder FAILS `M-5`.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE UNIQUENESS CONSTRAINT AS IT APPLIES TO ROOTS AND TO NON-ROOT PATHS, AND THE AS-FILED ITEM KEPT VISIBLE ABOVE.** **The constraint binds NODES, never register rows; the ruling fixes only where it is COUNTED, and it is counted in two places with two subjects.** **(a) AT A ROOT: a root's logical path IS its top-level name, so *at most one node per (`top-level name`, tier)`* — a root's register row is that pair's single holder, and a second attempt at the same pair is still routed by the call params to `{onRepeat:'edit'}` (the default) or to a loud `reason:'duplicate-path-tier'` refusal that leaves the store unchanged (`§2.7` item 4).** **(b) BELOW A ROOT: a non-root path is **NOT A REGISTER ROW AT ALL** — the register holds nothing below a root — so a `(sub-root path, tier)` pair is counted over NODES, its repeat routing is unchanged, and **the register's row count is unaffected by it in either direction** (`rows = R`, the root count: `§2.4` item 3's annotation).** **Two holders across tiers for ONE logical path still coexist, at a root and below it alike — the held first-hit shadow and the merged read with its `parts` survive (`§2.5` item 4).** **Nothing of the constraint's two declared outcomes and nothing of `M-6`/`M-5` moves.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — item `5`'s bytes and its amendment paragraph above stand byte-for-byte). THE *"MERGED READ WITH ITS `parts` LIST"* HALF OF BOTH PARAGRAPHS IS WITHDRAWN; THE TIER-COMPOSITION HALF STANDS AND IS WHAT THIS ITEM CONTINUES TO PIN.** **WHAT THIS ITEM STILL SAYS, EXACTLY: two holders may coexist for ONE logical path ACROSS tiers — at a root and below it alike — and a repeat at one `(logical path, tier)` pair is routed by the call params to an `'edit'` or to a loud `'duplicate-path-tier'` refusal that leaves the store unchanged.** **WHAT IS WITHDRAWN: the merged arm and its `parts` list, which this item's two paragraphs named as the second half of the composition claim (`§2.5` item `4`; the read's surviving case set is HIT · QUALIFIED · MISS).** **`M-6` IS UNMOVED AND `M-5` KEEPS ITS ID, ITS LAYER (`[T]`) AND ITS PLACE IN THE RED SET'S AUTHORING ORDER (`§4.2` item `4`) WITH A RE-DERIVED SUBJECT (`§3.1`'s own annotation after the happy-state table: the declared-but-unwritten parent with a written child, answered by the MISS arm).**
6. **THE SEVEN FAILURE ARMS, EACH NAMING ITS FAILING STEP.** **A failed resolution returns a VERBOSE PER-STEP
   DIAGNOSTIC, never a throw** (`§2.2` `P-5`): the `reason` names the class, the `step` names where the walk failed, and
   `segment`/`owner` name what the walk had reached.

| # | The arm, at its own step | The diagnostic names | The reason token |
| --- | --- | --- | --- |
| **(i)** | **`C-TOP` — no register row for the first path segment** | the FIRST path segment and the fact that no register row carries it | `'undeclared-name'` |
| **(ii)** | **`D-ANCHOR` — the node the walk reached carries no anchor keyed by the segment** | the node's own reference and the missing anchor KEY (the caller's own segment) | `'no-such-anchor'` |
| **(iii)** | **`G-RESOLVE-LEAF` — the chain resolved and the leaf is unwritten** | the link's own target set and the missing local name | **NOT A REFUSAL: the DECLARED MISS** (`§2.8` item 2) |
| **(iv)** | **`H-FLAG` — a node of that name exists but its FLAG is not the tier the filter asks for** | the node's OWN flag, the flag the filter asked for, and the step's own name | `'tier-filter-miss'` |
| **(v)** | **`E-LINK` — the anchor exists and its link's target has been severed/reclaimed** | the link and the reclaimed target | `'severed-link'` |
| **(vi)** | **`F-CACHE` — the cache entry is stale AND the rebuild itself fails** | the stale entry's link and the reason the rebuild could not answer | `'rebuild-failed'` |
| **(vii)** | **the WRITE side's twin of (v) — a write to an ORPHANED reference** | the orphaned reference and the operation that failed on it | `'severed-link'` — **the same graph fact seen from the write side**, and it is a RETURNED RECORD |

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-4`; `RCA-8(d)` ANNOTATE-BESIDE — item `6`'s heading and its seven-row table above stand byte-for-byte, and this clause states the counts WITH THEIR TERMS so that the numbers agree or their difference is explained).**

**"THE SEVEN FAILURE ARMS" IS CORRECT, AND IT IS NOT A COUNT OF SEVEN READ-SIDE REFUSALS.** **The terms of the `7` rows: `5` READ-SIDE REFUSALS — `(i)` `'undeclared-name'` at `C-TOP` · `(ii)` `'no-such-anchor'` at `D-ANCHOR` · `(iv)` `'tier-filter-miss'` at `H-FLAG` · `(v)` `'severed-link'` at `E-LINK` · `(vi)` `'rebuild-failed'` at `F-CACHE` — PLUS `1` DECLARED MISS (`(iii)`, at `G-RESOLVE-LEAF`; `§2.8` item `2`: explicitly NOT a refusal) PLUS `1` WRITE-SIDE TWIN (`(vii)`: the same `'severed-link'` graph fact seen from the write side, returned as a WRITE RECEIPT and occupying no walk step at all).** **`5 + 1 + 1 = 7` ✓.**

**AND `GraphResolveStep` NAMES `8` STEP IDS, NOT SEVEN: `A-PARSE` · `B-SECURE-GATE` · `C-TOP` · `D-ANCHOR` · `E-LINK` · `F-CACHE` · `G-RESOLVE-LEAF` · `H-FLAG`.** **The comment above that union in `§2.1`'s block reads *"THE WALK'S SEVEN STEPS"*, and the union's own text is CORRECTED BESIDE to EIGHT ids — because the walk's steps and the arm table's rows are two different counts, and the block's bytes are kept.** **`8` ids ✓, `7` arm rows ✓, and the two counts agree with each other once their subjects are named.**

**THE DIFFERENCE, EXPLAINED RATHER THAN EXPLAINED AWAY.** **The `7` arm rows occupy `6` of the `8` step ids (`C-TOP` · `D-ANCHOR` · `E-LINK` · `F-CACHE` · `G-RESOLVE-LEAF` · `H-FLAG`); the `2` remaining step ids (`A-PARSE` · `B-SECURE-GATE`) carry their OWN refusals, stated at `§2.3` items `1`/`3` — `'malformed-name'` and `'secure-refused'` — and are NOT rows of this table; and the seventh arm row `(vii)` is the write side and occupies NO step id.** **`6` + `2` = `8` step ids ✓ and `6` + `1` = `7` arm rows ✓.** **COUNTED AS WALK OUTCOMES RATHER THAN AS TABLE ROWS: the `8` step ids carry `7` READ-SIDE REFUSAL TOKENS — `'malformed-name'` (`A-PARSE`) · `'secure-refused'` (`B-SECURE-GATE`) · `'undeclared-name'` (`C-TOP`) · `'no-such-anchor'` (`D-ANCHOR`) · `'severed-link'` (`E-LINK`) · `'rebuild-failed'` (`F-CACHE`) · `'tier-filter-miss'` (`H-FLAG`) — PLUS `1` DECLARED MISS (`G-RESOLVE-LEAF`) = `8` outcomes over `8` steps ✓, with the write-side twin adding one RETURNED RECORD for the same `'severed-link'` fact and no ninth step.** **NO ROW OF THE TABLE, NO TOKEN, NO STEP ID AND NO CLAUSE OF ITEM `7` BELOW MOVES; the two arms `A-PARSE`/`B-SECURE-GATE` keep their own precedence positions (`§2.5` item `2`) and are not promoted into the table by this reading.**

**⟶ ANNOTATED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-2`; `RCA-8(d)` ANNOTATE-BESIDE — the table row `(vi)` above and every byte of the `O-4` annotation above it STAND, and this clause supplies the DRIVE ARM `(vi)` was missing rather than re-reading it).** **THE GAP, IN THE TESTWRITER'S OWN TERMS: *"the cache entry is stale AND the rebuild itself fails"* names a state the contract declares and NONE of its declared surface could reach — `§2.6` item 4 puts the rebuild at the INVALIDATION SITE (the record's `DR-7`), the seam carried `reset` · `seed` · `parentLinkCountOf` · `cacheEntryFor` alone, and `cacheEntryFor(name)` only READS — so the arm had no injectable fault and therefore no drive.**

**THE CHOICE, AND WHY: OPTION `(a)` — A DECLARED TEST-ONLY FAULT-INJECTION MEMBER — IS TAKEN, and the alternative (declaring the arm NOT driveable) is refused.** **WHY THE INJECTOR RATHER THAN A DISCLAIMER: the arm's own row is `§3.2` `F-6` and its token is a member of the closed refusal union (`§2.1`'s block annotation: `'rebuild-failed'` among the `16`), so an arm that cannot be driven would leave a DECLARED TOKEN with no failing row — exactly the *"declared but undriven"* class `S-3` and `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` exist to surface — while the injector costs ONE optional seam member, no dependency, no new throw class and no term.**

**THE INSTRUMENT, ITS SUBJECT AND ITS BOUND: `failNextCacheRebuild` (`§2.1`'s `GraphStore` block, appended by this pass) arms the NEXT rebuild the invalidation site performs to fail, ONE-SHOT.** **IT CAN FAULT THAT ONE SITE AND NOTHING ELSE — not a read, not a write, not a serialization, not a validation, not a crossing, and not the CENSUS-COMPARISON arm whose own token is also `'rebuild-failed'` (`§2.8` item 6 (a), a different site with a different subject).** **THE ARM'S OBSERVABLE IS UNCHANGED BY ITS BEING DRIVEABLE: a RETURNED RECORD with `reason:'rebuild-failed'` at `step:'F-CACHE'`, naming the stale entry's link and the reason the rebuild could not answer — NEVER a throw, so `§2.2` `P-5`'s THREE named exceptions (the factory's load refusal and the two seam throws) are UNMOVED, and the injection adds no fourth.** **The armed failure is internal and is consumed by the mutating operation's own synchronous rebuild step (`§2.6` item 4), which is why the arm is observable only through the walk's next answer and never as an exception at the seam call.**

**WHAT THIS MOVES: NOTHING IN THE TABLE ABOVE.** **The seven arm rows, the six occupied step ids, the two arms carrying their own refusals, the seven read-side refusal tokens, the one declared miss and the one write-side twin are ALL UNMOVED (`5 + 1 + 1 = 7` arm rows ✓ · `8` step ids ✓), and no token is re-pointed.** **The rows the drive belongs to are already counted: `§5.5.1` `P-GR-IM-8`'s `7` drives (`7` failure arms × `1` drive) — this arm's drive being one of them, with the injector as its INSTRUMENT rather than a new drive — and `P-GR-TP-1`'s arm sweep, whose `4` arm drives and `24` term are unmoved.** **THE OPERATIVE TWENTY-TWO-TERM TOTAL IS STILL `249`; it is re-printed with its terms at `§5.5.3`'s closing block item `(12)`.**

7. **THE FILTER RULE, stated as the order of the walk and as the reason the token reported is the FIRST that applies.**
   **The walk is `A-PARSE` → `B-SECURE-GATE` → `C-TOP` → `D-ANCHOR`(per remaining segment) → `E-LINK` → `F-CACHE` →
   `G-RESOLVE-LEAF` → `H-FLAG` → answer.** **`H-FLAG` runs AFTER `G-RESOLVE-LEAF`, so a filter miss on a resolvable leaf
   is `'tier-filter-miss'` and never `'no-such-anchor'`** — the same *"the reason token reported is the FIRST row that
   applies"* discipline the held read pins for its precedence row. **A row that reports `'undeclared-name'` for a
   `secure.*` name, or `'tier-filter-miss'` for a name whose chain never reached a leaf, FAILS.**
8. **THE WALK'S ANSWER SHAPE IS THE HELD READ'S, WITH ONE CHANGED MEMBER: `flag` REPLACES `tier`'s CARRIER.** **The held
   answer's `value`/`cache`/`name` members survive**, `tier` is the node's own flag on a hit, and the members
   `merged`/`parts` are **ABSENT on the hit and the miss arms** (`§2.5` item 3).

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — item `8` above stands byte-for-byte). THE HIT ARM'S AND THE MISS ARM'S FINAL CLAUSE IS RE-DERIVED FROM *"the members `merged`/`parts` are ABSENT on the hit and the miss arms"* TO *"the hit and the miss arms carry NO `merged` AND NO `parts` MEMBER AT ALL"* — the two members are WITHDRAWN from the result types, so their absence is a property of the TYPES rather than a per-arm omission.** **THE REST OF THE ITEM IS UNMOVED: the held answer's `value`/`cache`/`name` members survive, and `tier` is the node's OWN flag on a hit (`§2.5` item `1`; the surviving case set is printed at `§2.5` item `4`).**

---

### 2.4 The register (exact)

**⟶⟶ THE ARCHITECT'S REGISTER CLARIFICATION (2026-10-01) — THE OPERATIVE READING OF THIS SECTION, PLACED BEFORE ITEM `1` SO THAT EVERY ITEM BELOW IS READ UNDER IT.** **The architect's words, verbatim: *"Clarification: The register is only for top-level names, i.e. the root nodes of descendant trees."*** **THE OPERATIVE SENTENCE OF THIS SECTION, and of every clause of this file that touches the register: THE REGISTER HOLDS ONLY TOP-LEVEL NAMES — THE ROOT NODES OF DESCENDANT TREES. NOTHING BELOW A ROOT IS REGISTERED. A ROW EXISTS FOR A ROOT OR NOT AT ALL, and the register's ROW COUNT EQUALS THE NUMBER OF ROOT NODES (the top-level names) and NEVER A TOTAL NODE COUNT.** **The clauses below that carry this reading are the dated annotations beside `§2.4` items `1`/`3`/`4`/`5`/`6`/`7`/`8`, the paragraph beside the two register types at `§2.1`, the annotations beside `§0A` notes `1`/`5`/`6`, beside `§2.3` item 5 and `§2.7` item 4, beside `§6.4` and beside `§7a.1` — each keeps its as-filed sentence VISIBLE and none rewrites one byte of it (`RCA-8(d)`).** **ONE OBJECT IS NAMED ONCE AND IS NOT THIS ONE: the typed register of `§5.5.1` (`21` rows / `233` declared attempts) is the PROPERTY register, a DIFFERENT OBJECT from the store's runtime top-level-name register this section governs — the note is carried at `§5.5.1`, and no count crosses between the two.** **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS): the `233` quoted in this clause is the OPERATIVE declared total — printed WITH its twenty-one terms at `§5.5.3`'s corrected column (`233` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12`), per-row maximum `40` (`P-GR-IM-13`) — while `§5.5.1`'s own table prints its twenty-one AS-FILED terms, summing to `427`; the two figures and every site that prints either are reconciled at `§5.5.3`'s closing block, and nothing in this clause is rewritten.** **NOTHING ELSE MOVES: no row is added, dropped or merged, no cap value changes, no term changes, and every clause not named above stands exactly as filed.**

**⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S SECOND AMENDMENT, `A2` — THE INVARIANT'S CONSEQUENCE FOR THIS SECTION AND FOR THE ROOT-ROW CAPS). THE REGISTER'S SUBJECT SET IS UNMOVED BY THE INVARIANT, AND THE INVARIANT IS VACUOUS AT A ROOT — WHICH IS WHY NO CAP QUANTITY MOVES.** **A register row exists only for a ROOT node, a root node has NO PARENT LINK (`GraphNode.parentLink` is `null`), and MONOTONIC PERSISTENCE constrains a LINK — so a root may carry ANY of the three flags, and `RCAP-1`/`RCAP-2`/`RCAP-3` keep counting ROOT ROWS BY FLAG and amplifier-form subscriptions over top-level names exactly as item `6`'s annotation prints them.** **What the invariant adds to THIS section is a WRITE-SIDE arm rather than a register-side quantity: a mint or a regeneration whose requested tier is more durable than the node's own parent node's flag is REFUSED `'durability-inversion'` (item `7`'s annotation, arm `(h)`; `§2.1`'s named-invariant block prints the rule, its three enforcement sites and its consequences).** **AND ONE NON-CONSEQUENCE IS STATED SO IT IS NOT INFERRED: the invariant adds NO register refusal, NO construction-time arm and NO cap — item `5`'s closed six arms, item `6`'s three caps and this ruling block are otherwise UNTOUCHED, and the register's row count is still the ROOT count (`rows = R`).**

1. **THE ROW SHAPE, re-derived under the round-3 answers — five members, printed with the source of each.**
   `{ name, nodeRef, constraintId?, reserved, derived }`. **(a) `name` — the CALLER'S OWN SPELLING of the top-level item,
   carried verbatim, never re-interpreted** (the held no-vocabulary rule, cited by row name). **(b) `nodeRef` — the
   store-minted handle, or `null` for a COLD ITEM.** **(c) `constraintId` — an id into the constraint table, or `null`
   (the held row shape's own field name, retained).** **(d) `reserved` — the held field name retained; its home is the
   register row for a top-level item and the ANCHOR for a per-leaf instance** (`§7a.1` item 6). **(e) `derived` —
   `true` iff the row is the graph's own projection.** **The held row's `tier` field is DROPPED**: under the filter rule
   the tier is not a declared property of the name at all, and the held `G-3` survives **as the filter miss**
   (`§2.3` item 6 (iv)).

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION): THE AS-FILED FIVE MEMBERS, AND THE VALUES THEY CAN NOW TAKE.** **The SHAPE is unchanged — same five member names, same types; what the ruling fixes is the VALUE RANGE: `derived` is `true` ON EVERY ROW THAT EXISTS, because every row is the graph's projection of a ROOT node — the register holds only top-level names, so a row exists for a root or not at all and **`derived:false` is UNREACHABLE in a register row**.** **`reserved` and `constraintId` keep their homes exactly as `(d)` files them — *"the register row for a top-level item and the ANCHOR for a per-leaf instance"* — with *"the top-level item's row"* now read as **THE ROOT'S ROW**, since nothing below a root is registered.** **The DROPPED `tier` member and the `G-3`-class reading of `(e)` are UNCHANGED and, under the ruling, TIGHTER: `G-3` survives **as the filter miss** (`§2.3` item 6 (iv)); a flag/filter row is read against the resolved node's OWN flag at a ROOT exactly as at any other node; and because a register row carries no flag member at all, **no filter decision is ever read from a register row** — which is what `§2.2` `P-1` already requires.**

2. **THE HANDLE IS NEVER A LOOKUP KEY.** **The register's `nodeRef` is a per-top-level-node handle the store mints inside
   its own graph; it is NOT a global id registry, it is NOT keyed by engine or authored ids, and IT IS NOT LOOKED UP BY
   ANY PATH SEGMENT.** **The walk reaches a node through its ANCHORS and LINKS.** **A row that resolved a PATH SEGMENT
   against a set of store-minted node handles FAILS `R-9`** (read as **`§3.4 R-9`** — the citation form is fixed at `§3.4`'s head note) — that is the residue of the scope ruling, and it is intact.
3. **THE REGISTER IS THE GRAPH'S TOP-LEVEL PROJECTION PLUS THE CALLER'S DECLARED ROWS.** **The register's row count for
   derived rows equals the parentless-node count, BY CONSTRUCTION** — the caller's spelling CREATES the node, and the row
   is then derived rather than separately declared.

   **⟶ WITHDRAWN 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE AS-FILED SENTENCE ABOVE IS KEPT VISIBLE, AND THE ADMISSION IT MAKES IS WITHDRAWN IN THOSE WORDS.** **The as-filed item admits a **CALLER-DECLARED ROW INPUT BESIDE THE GRAPH'S PROJECTION** — *"THE REGISTER IS THE GRAPH'S TOP-LEVEL PROJECTION **PLUS THE CALLER'S DECLARED ROWS**"* — and **THAT ADMISSION IS WITHDRAWN**: a caller-declared ROW does not exist in this model, nothing below a root is registered, and the register is the graph's top-level projection **AND ONLY THAT**.** **The item's own count, re-printed with its terms: `rows = R`, where `R` = the PARENTLESS-NODE count = the ROOT count; the as-filed reading's `rows = R + C` (`C` = the caller-declared cold rows) collapses to `rows = R` because `C = 0` BY THIS RULING.** **What SURVIVES from the as-filed sentence: the row is DERIVED, never separately declared — the clause this item's second half pins — and the caller's own spelling is still the row's `name` (`§2.4` item 1(a)).** **What does NOT survive: any row whose subject is not a root, and any row whose `nodeRef` is `null`.** **THE CALLER'S DECLARATION IS NOT DELETED — IT IS RE-HOMED: it survives as the surface that NAMES a top-level item, i.e. that makes a name a ROOT NAME (`§2.4` item 8's annotation), and never as a row.**
4. **THE COLD ITEM, AND THE HELD REFUSAL/MISS DISTINCTION AT TOP LEVEL.** **A declared row whose path holds no node is
   `derived:false` with `nodeRef:null` and is the COLD ITEM.** **`resolve` on a cold item's path answers the DECLARED
   MISS `{found:false, value:undefined, tier:null, cache:null, name}`, NEVER a refusal** — while a path **no register row
   carries** answers `'undeclared-name'`. **The two states stay distinguishable by their own positive controls, which is
   exactly the held `docs/specs/store-core.md` `§3.2` `F-9` control at top level, and a body in which they collapse
   FAILS `F-2`.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE AS-FILED ITEM IS KEPT VISIBLE ABOVE, AND THIS PARAGRAPH IS ITS OPERATIVE TEXT.** **A COLD ITEM IS A *ROOT NAME WITH NO ROW YET*: a top-level name whose root node does not exist, so the register holds NO ROW for it.** **The as-filed members `derived:false` / `nodeRef:null` describe a ROW; under the ruling the cold item HAS NO ROW — so the cold item is expressed by THE ROW'S ABSENCE, `derived:false` is unreachable, and `nodeRef:null` never appears in a register row.** **THE HELD REFUSAL/MISS DISTINCTION SURVIVES INTACT, AND THIS IS THE POINT OF THE PARAGRAPH, because `F-2`'s two arms must keep their own subjects. The three states, named so no reader collapses them:** **(i) A REGISTERED ROOT** — a first path segment the register holds a ROW for — resolves by the walk; **(ii) A COLD ROOT NAME** — a top-level name the declaration surface carries whose root node does not exist yet, so the register holds no row for it — draws the DECLARED MISS `{found:false, value:undefined, tier:null, cache:null, name}`, NEVER a refusal; **(iii) NOT A ROOT NAME AT ALL** — a first path segment that is neither a registered root's nor a cold root name — draws `'undeclared-name'` at `C-TOP`.** **The discriminating observable between (ii) and (iii) is therefore the TOP-LEVEL NAME DECLARATION (`§2.4` item 8's module), not a `derived:false` row; a reader who takes (iii)'s subject to include a cold root name would COLLAPSE the two and FAIL `F-2`.** **The held `docs/specs/store-core.md` `§3.2` `F-9` control is preserved at top level exactly as this item's last sentence claims, and by the same positive controls (`F-2`).**
5. **THE REGISTER'S OWN REFUSED SET — SIX CONSTRUCTION-TIME ARMS, CLOSED.** **The register has no table load in the held
   sense; its refusals fire AT CONSTRUCTION of the declared-row input (a `GraphLoadError`), and they are:** **(a)** a
   declared row carrying **no name** or a **non-string/empty name** → `'malformed-name'`; **(b)** a declared row whose
   name's first segment is `secure` → `'secure-refused'`; **(c)** a name **declared twice in the input** →
   `'undeclared-name'` (the doubled row is not a declaration, so the name has no declaration that loads — the held
   `G-2` class, preserved); **(d)** a declared row colliding with a **reserved namespace key** → `'reserved-namespace'`;
   **(e)** a declared row colliding with **another row for the same `(path, tier)`** → `'duplicate-path-tier'` **where the
   input's params route it to refusal**; **(f)** a **malformed or ambiguous pattern** in the input →
   `'malformed-pattern'`. **AND THE POSITIVES, one per arm: a well-formed input LOADS; each of the four legal tier tokens
   LOADS; a name declared once LOADS; a non-colliding name LOADS; a second TIER's holder for one logical path LOADS; a
   well-formed interior-wildcard pattern LOADS.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION): WHICH OF THESE SIX CLOSED ARMS SURVIVE, ARM BY ARM, BECAUSE NOTHING BELOW A ROOT IS DECLARED.** **The set stays CLOSED AT SIX and not one token changes; what changes is each arm's SUBJECT: every arm now fires over a TOP-LEVEL NAME declaration, and NO arm has a SUB-ROOT subject, because a declaration below a root no longer exists to reach one.** **(a) `'malformed-name'` — SURVIVES; subject = a top-level name carrying no name, a non-string or an empty name.** **(b) `'secure-refused'` — SURVIVES, AND IS STRENGTHENED on the write side, where the same arm is decided BEFORE the register and BEFORE any traversal (`§2.4` item 7(b)) — so no register row can carry a `secure` name in any state.** **(c) `'undeclared-name'` for a name declared twice — SURVIVES; subject = a DOUBLED TOP-LEVEL NAME (the held `G-2` class, preserved verbatim).** **(d) `'reserved-namespace'` — SURVIVES; subject = a top-level name colliding with a reserved namespace key, and the reserved instance's own row IS a ROOT's row (`§2.4` item 1(d), item 7(f)).** **(e) `'duplicate-path-tier'` — SURVIVES ON ONE HALF ONLY: with no declared-row input there is no row input that could hold a second row for one `(path, tier)` pair, so the CONSTRUCTION-TIME half has NO SUBJECT; the arm is carried by the WRITE side, where `§2.4` item 7(e) already names it over the same pair, and by `§2.7` item 4's two declared outcomes.** **(f) `'malformed-pattern'` — SURVIVES, and ONLY as a TOP-LEVEL pattern: the per-leaf pattern kind is retired and a top-level pattern is admitted (`§7a.1` item 6), so a sub-root pattern cannot reach this arm.** **AND THE POSITIVES STAND ONE PER ARM, unchanged, with ONE clarification printed so it is not a silent re-read: *"a second TIER's holder for one logical path LOADS"* is read as *"a second tier's holder for one ROOT's logical path LOADS"* — two holders of one root name may coexist across tiers, because the uniqueness constraint binds NODES and never register rows (`§2.3` item 5's annotation).**
**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-6`; `RCA-8(d)` ANNOTATE-BESIDE — item `5`'s six arms, their subjects, their tokens and their positives above stand byte-for-byte, its own annotation included). ARM `(b)`'s SUBJECT, RESTATED SO THE REGISTER'S OWN FIXTURE CANNOT CONTRADICT IT: a declared row whose name's first segment is `secure` REFUSES AT CONSTRUCTION with `'secure-refused'`, so NO `secure` SPELLING IS EVER A LOADING DECLARATION — and, under the register clarification, no register row can carry a `secure` name IN ANY STATE.** **The closed-at-SIX count, the six tokens and the six named positive controls are UNMOVED; no arm is added or dropped by this reading.** **WHAT IT CHANGES IS ONE FIXTURE'S READING ONLY: `§5.5.1`'s fixture carries the `secure` spelling as its REFUSED-CONTROL INPUT and never as a loaded row — printed at that fixture's own annotation — and the `secure` tier's own values remain the separate main-side collection's (`§2.11` item `2`; `§3.2` `F-14`).**

6. **THE CAPS — THE REGISTER'S OWN, WITH VALUES AND OVERFLOW OUTCOMES.** **The caps live on the TOP-LEVEL REGISTER and
   REACHABILITY collects WITHIN THE GRAPH** (the proposal's `§0.4` `A-G`; the two quantities are different, and no row may
   conflate them).

   | # | The capped thing | The value | The declared OVERFLOW OUTCOME |
   | --- | --- | --- | --- |
   | **`RCAP-1`** | **the registered top-level rows whose top-level node carries the `mem` flag** | **`1024`** rows | **THE WRITE IS REFUSED: `{status:'refused', reason:'cap-exceeded', cleared: [], repaired: [], rows: [], crossings: 0, events: 0}`, and the store is LEFT COMPLETELY UNCHANGED.** **NO EVICTION, NO FIFO, NO LRU, NO SILENT DROP** — **an eviction would be the store choosing which caller value to destroy, which is the second-authority class `P-7` closes** |
   | **`RCAP-2`** | **the registered top-level rows whose top-level node carries the `temp` flag** | **`4096`** rows | **Identical to `RCAP-1`.** |
   | **`RCAP-3`** | **the amplifier-form subscriptions across the register** (`{subtree:true}` and prefix/tier-wide forms) | **`64`** subscriptions | **THE SUBSCRIPTION IS REFUSED and REGISTERS NOTHING — the listener is NEVER invoked, and no entry exists to unsubscribe.** **An EXACT-reference subscription is NEVER capped** |

   **The values are the held figures, RELOCATED ACROSS A QUANTITY, and each carries a RE-DERIVATION DUTY** (`§7a.1`
   item 7): they were derived for tier-collection elements and amplifier subscriptions, and this register counts ROWS.
   **The COUNTS are read from the register's own rows, never from a trie or a node count** (the held cap discipline,
   cited by row name). **The OVERFLOW OUTCOME is NOT reversible**, because a refusal that clears nothing is the landed
   non-destructive posture.

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION): WHAT `RCAP-1`/`RCAP-2`/`RCAP-3` COUNT, PRINTED WITH THEIR TERMS — THE HELD VALUES KEPT, THE HELD OUTCOMES KEPT.** **Under the ruling the register's rows ARE the root nodes, so both register-side caps count ROOT ROWS: `RCAP-1` counts THE REGISTERED TOP-LEVEL ROWS WHOSE ROOT NODE CARRIES THE `mem` FLAG — equivalently, the number of TOP-LEVEL NAMES one per root node whose own node is `mem`-flagged, printed as `rows(roots flagged mem) ≤ 1024`; `RCAP-2` is the same count with `temp`, printed as `rows(roots flagged temp) ≤ 4096`.** **Neither counts a TOTAL NODE COUNT in any state, and NEITHER can count a non-root node: a sub-root node has no row to be counted in, which is now true by construction rather than by discipline.** **`RCAP-3` counts the AMPLIFIER-FORM SUBSCRIPTIONS OVER TOP-LEVEL NAMES — printed as `amplifier-form subscriptions over top-level names ≤ 64` — because the register holds nothing below a root to subscribe to; an EXACT-reference subscription is still NEVER capped.** **THE THREE VALUES ARE THE HELD FIGURES, KEPT WITH THEIR RE-DERIVATION DUTY — `1024` · `4096` · `64`, derived for tier-collection elements and amplifier subscriptions and inherited across the quantity change this item already names (`§7a.1` item 7).** **THE THREE OVERFLOW OUTCOMES ARE UNTOUCHED: `cap-exceeded`, `cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0`, the store left completely unchanged — the not-reversible half of the item stands exactly as filed.** **AND NO CELL OF THE TABLE ABOVE CHANGES, because each cell already reads the flag from the NODE and not from the row: what this annotation adds is the two words *ROOT* and *top-level* where the cells' own quantities live, with the counts read from the register's own rows and never from a trie (`§0A` note 6's cap discipline, cited by row name).**
7. **THE REGISTER'S WRITE-SIDE REFUSAL MAPPING — the top-level analogue of the held token map, and the only arms that can
   fire.** **(a)** a name whose first path segment carries no register row → `'undeclared-name'` at `C-TOP`; **(b)** a
   `secure.*` name → `'secure-refused'`, **decided before the register**; **(c)** a malformed or non-string name →
   `'malformed-name'`; **(d)** a registration or write that would exceed `RCAP-1`/`RCAP-2` → `'cap-exceeded'`; **(e)** a
   second attempt at one `(path, tier)` pair, under `{onRepeat:'refuse'}` → `'duplicate-path-tier'`; **(f)** a
   `remove` on a `reserved:true` top-level row's own name → `'reserved-name'`, **refused BY NAME and never by value**;
   **(g)** `'reserved-namespace'`, `'malformed-pattern'` and `'ambiguous-path'` are **carried from the held union and
   fired at the sites this contract's construction-time arms name.** **NO OTHER ARM CAN FIRE, and a row that mints a
   token outside this list FAILS `F-2`.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION): ARM (a) FIRES ONLY FOR A NAME THAT IS NOT A ROOT NAME THE REGISTER KNOWS.** **The `'undeclared-name'`-class refusals across this contract now fire ONLY for a name whose first path segment is NOT A REGISTERED ROOT and not a cold root name — i.e. for a name that is not a root name at all (`§2.4` item 4's annotation prints the three states with their own arms); a **COLD ROOT NAME — a root name with no row yet — draws the DECLARED MISS and NEVER this token**, and `F-2`'s two arms therefore keep their subjects.** **Arms (b)–(g) are otherwise UNCHANGED, each read over top-level names: **(b)** `secure` decided before the register; **(c)** malformed or non-string; **(d)** a registration or write that would exceed `RCAP-1`/`RCAP-2` **as item 6's annotation prints those two quantities (root rows, by flag)**; **(e)** a second attempt at one `(path, tier)` pair under `{onRepeat:'refuse'}` — the WRITE side, which is now the only site the arm can reach (`§2.4` item 5's annotation); **(f)** a `remove` on a `reserved:true` ROOT's own name, refused BY NAME and never by value; **(g)** the three carried tokens, fired at the sites the construction-time arms name.** **NO OTHER ARM CAN FIRE, exactly as filed.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S SECOND AMENDMENT, `A2`) — THE MAPPING ABOVE IS KEPT VISIBLE AND THE ARM SET GROWS BY ONE, so the register's write-side refusal set is no longer the seven arms `(a)`…`(g)` and nothing else.** **THE NEW ARM: `(h)` a MINT or a REGENERATION whose requested tier is MORE DURABLE than the node's own PARENT NODE's flag → `'durability-inversion'`** — **a RETURNED RECORD carrying `cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0`, with the store LEFT COMPLETELY UNCHANGED**, on the authority of the second named tree invariant (`§2.1`'s named-invariant block: MONOTONIC PERSISTENCE — `durability(child) ≤ durability(parent)`, ordering `file` > `mem` > `temp`, `secure` outside the ordering and carrying no graph node).** **Its sites are the MINT (`§2.8` item `3`) and the REGENERATION's new root tier (`§2.8` item `5`).** **Its subject is the NODE'S OWN PARENT NODE's flag, read from the node's `parentLink` — never from a name, never from a register row and never from a tier token** — which keeps the arm inside `§2.2` `P-8`'s posture: no path segment, no id registry and no consumer vocabulary is consulted for it.** **THE AS-FILED SENTENCE *"NO OTHER ARM CAN FIRE"* IS THEREFORE READ AS *"no arm other than `(a)`…`(h)` can fire"*, and a row that mints a token outside that set FAILS `F-2`.** **Arms `(a)`…`(g)` are otherwise UNTOUCHED, and the union's operative membership and count (`SIXTEEN` = `8` held + `5` amendment + `3` this pass's two amendments) are reconciled at `§2.1`'s block annotation.**

8. **THE DECLARED-ROW INPUT'S HOME, and why the unit still has two modules.** **The input lives in
   `src/renderer/store-graph-references.ts`** (`§0A` note 1): **the register's row identity is the CALLER'S spelling, and
   the store's own bytes must be able to stand a scan with an EMPTY exemption set.** **The real tenant's rows arrive
   later as an input; this unit's own test carries a TEST-ONLY fixture whose spellings are GENERIC CALLER STYLE
   (`<entity>`/`<id>`/`<key>`-shaped) and carry NO consumer noun, so the fixture exercises every arm above WITH its
   positive control and keeps the store's scan vacuous of exemptions.** **A pattern over TOP-LEVEL names is meaningful;
   a per-leaf pattern is not, and the per-leaf pattern kind's fate is recorded at `§7a.1` item 5.**

   **⟶ READ UNDER THE CLARIFICATION 2026-10-01 — THE AS-FILED ITEM KEPT VISIBLE ABOVE, ITS SUBJECT NARROWED AND ITS HOME UNMOVED.** **`src/renderer/store-graph-references.ts` carries the CALLER'S TOP-LEVEL NAME DECLARATIONS: the names that make a name a ROOT NAME and against which a COLD ITEM is defined (`§2.4` item 4's annotation). It contributes **NO ROW** to the register — that half of the input is withdrawn (`§2.4` item 3's annotation) — and it is therefore a NAME surface, never a row surface.** **Everything else in the item stands: the module's path, its export surface (`1` value export + `3` type declarations, `§2.1` item 2), the one-import census (`§5.5.1` `P-GR-TP-6`), the `§5.1` diff scope, and `§0A` note 1's reason for a second file (the store's own bytes must stand a scan with an EMPTY exemption set).** **AND ITS CLOSING PATTERN SENTENCE IS NOW TRUE BY CONSTRUCTION: *"A pattern over TOP-LEVEL names is meaningful; a per-leaf pattern is not"* — under the ruling a register row exists only for a top-level name, so nothing else could carry a pattern.**

---

### 2.5 The read and the walk's answer

1. **THE RULE, in one sentence.** **`resolve(name)` parses the name, refuses `secure` before anything else, looks the
   first path segment up in the register, walks the anchors and links, checks the link's cache, resolves the leaf's own
   local name against the link's target set, FILTERS the resolved node's flag on the name's tier token, and answers the
   held read's shape.**
2. **THE PRECEDENCE IS FIXED AND TOTAL: `secure` → malformed → undeclared → the resolved leaf's miss → the filter miss →
   the answer.** **The reason token reported is the FIRST row that applies.** **A row that reports `'undeclared-name'`
   for a `secure.*` name, or `'tier-filter-miss'` where the chain never reached a leaf, FAILS.**
3. **THE ANSWER CARRIES THE TIER COLLECTION'S OWN HANDLE, BY IDENTITY.** **`cache` IS the same object (`toBe`) as
   `store.tiers[hit.flag]`** — the held identity rule survives the amendment, **and a row that observes a copy FAILS
   `M-3`.** **`cache` is a live object reference and may NOT cross an IPC boundary** (`docs/specs/mcp-endpoint.md`
   `P-E6`), **which is one of the reasons the graph is renderer-realm.**
4. **THE MERGED READ AND ITS `parts` SURVIVE.** **A path NO node holds, whose DESCENDANTS are held, answers the merged
   arm**: `merged:true`, `tier:null`, `cache:null`, and a **NON-EMPTY `parts` list ORDERED by the OVERLAY ORDER
   (`file` → `mem` → `temp` — DESCENDING durability, the reverse of the search order)**, **each entry naming THE PATH
   THE TIER ACTUALLY HOLDS and NEVER the read path.** **The merged value is NON-AUTHORITATIVE**: no node holds it, and it
   is recomputed on every read. **A body that answers a merged composite at a pair a node holds FAILS `F-6`** — the
   held first-hit rule stands: where a node holds the read path, the hit arm answers and no merge runs.

   **⟶ WITHDRAWN 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — EVERY BYTE OF ITEM `4` ABOVE STANDS AND THIS CLAUSE IS ITS OPERATIVE REPLACEMENT). THE MERGED ARM IS WITHDRAWN AND THE `parts` LIST, THE OVERLAY ORDER, THE `GraphPart` TYPE AND THE `GraphMergedRead` TYPE GO WITH IT.**
   **THE ARCHITECT'S WORDS, VERBATIM (the ruling's own authority for this clause): *"The merged arm is not in the graph spec because in the graph pattern the nodes already contain their tier references locally. Passing the clone/reference to the function calling the read already allows it to identify the node tier."*** **THE GROUND, STATED IN THIS CONTRACT'S OWN TOKENS: a DESCENDANT is reached THROUGH its parent's anchors — a node holding `p.x` is only reachable through a link an anchor on the node holding `p` holds (`§2.3` item `2`, `§2.2` `P-3`) — so *"a path NO node HOLDS whose DESCENDANTS are held"* is a state the graph CANNOT PRESENT, and the merged arm had no subject.** **A caller that receives the subtree — the clone OR the reference — reads each node's tier from the NODE ITSELF, because `GraphNode.flag` is *"the ONLY residency carrier"* (`§2.1`'s `GraphNode` block).**

   **THE READ'S SURVIVING CASE SET, NAMED, WITH EACH CASE'S BEHAVIOUR — THREE CASES AND NO FOURTH.**
   **(i) THE HIT.** **The walk reaches a node and that node's OWN flag IS the tier the name's first segment filters on.** **The answer is `{found:true, value:<the node's own value>, tier:<the node's own flag>, flag:<the node's own flag>, cache:<`store.tiers[flag]`, BY IDENTITY>, name:<the caller's own spelling>}` (`§2.1`'s `GraphReadHit`; `§2.5` item `3`); NO composition, NO provenance list and NO second holder is consulted, and the value is the ONE node's own.**
   **(ii) THE QUALIFIED READ.** **The walk reaches a node and that node's flag is NOT the tier the name filters on.** **The answer is the RETURNED RECORD `'tier-filter-miss'` at step `H-FLAG`, naming the node's OWN flag AND the flag the filter asked for (`§2.3` items `6`(iv)/`7`, `R-6`): a tier-qualified name addresses ONE tier and DOES NOT FALL THROUGH to another holder, and `H-FLAG` runs AFTER `G-RESOLVE-LEAF`, so a filter miss on a resolvable leaf is NEVER `'no-such-anchor'`.** **Where the name resolves to no holder at all, the walk's own arms answer instead (`C-TOP` · `D-ANCHOR` · `E-LINK` · `F-CACHE`), and where the resolved leaf is unwritten the MISS below answers — the qualified case is the FLAG DISAGREEMENT and nothing else.**
   **(iii) THE MISS.** **The resolved leaf holds NO VALUE — the DECLARED MISS `{found:false, value:undefined, tier:null, cache:null, name:...}` (`§2.1`'s `GraphReadMiss`; `§2.3` item `6`(iii); `§2.4` item `4`), NEVER a composite and NEVER a refusal.** **THE ONE STATE IN WHICH A PATH IS UNHELD WHILE ITS DESCENDANTS ARE RESIDENT IS THE DECLARED-BUT-UNWRITTEN PARENT WITH A WRITTEN CHILD, AND IT IS THIS CASE'S SUBJECT: a parent reference that has been tier-locally cleared (`§2.8` item `4`) while a child below it still holds a value answers the MISS, and the child's OWN read answers the HIT with the CHILD's own flag — the caller reads each tier from the node that carries it.**
   **THE FIRST-HIT BOUNDARY, RESTATED AS A PLAIN PROPERTY OF THE HIT ARM (it no longer separates two arms, because there is only one arm to separate): WHERE A NODE HOLDS THE READ PATH, THE HIT ARM ANSWERS FROM THAT NODE ALONE — its value, its own flag and its own handle — and the walk consults NO second holder and assembles NO composite.** **THE MIS-CITATION THE AS-FILED SENTENCE AND `§0` RULING `6`'s CELL CARRY IS RECORDED RATHER THAN PROPAGATED: both cite `F-6` for this boundary, and `§3.2` `F-6` is the `'rebuild-failed'` arm — THE FIRST-HIT BOUNDARY'S ROW IS `§3.2` `F-8`, whose as-filed subject is restated onto the hit arm at that row's own annotation; the citation `F-6` is left visible in both as-filed sites and read as `F-8`.**
   **AND THE WITHDRAWAL'S OTHER HALF IS STATED SO ITS EXTENT IS COUNTABLE: the register row whose subject was the merged read — `§5.5.1` `P-GR-TP-7` — is RE-DERIVED onto the NODE-LOCAL TIER READING at that row's own annotation, its term re-derived there and printed with all twenty-two terms at `§5.5.3`'s closing block; and `§2.6` item `6`'s comparator clause is re-derived beside its own site (the `parts`-ABSENT-as-ABSENT reading is withdrawn with the member).**
5. **THE REGENERATION TRANSACTION'S OWN READ FACE.** **Across the regeneration window, a read answers EITHER the value
   OR a refusal — NEVER both, and never a partial state** — because the refusal is decided by the graph **on the SAME
   synchronous turn that the regeneration mutates it**.
   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S FIRST AMENDMENT, `A1`) — item `5` above stands byte-for-byte, and this clause prints the REVERSIBILITY WINDOW in full.** **A commit that regenerates a set is REVERSIBLE FROM THE TRANSACTION'S FIRST STEP UNTIL ITS ACCEPTANCE: between them, EVERY READ ANSWERS THE ORIGINAL — the pre-transaction node and its value — and NO read ever sees the BUILT set, a partially re-tiered subtree, or a half-serialized form.** **The window's observable, stated so it is falsifiable: `resolve` on any path inside the regenerating subtree answers EXACTLY what it answered before the call, for the whole window (members compared by value, a `cache` by identity), and a read that answers a built-but-unaccepted node FAILS.** **The window's shape is item `5`'s own discipline EXTENDED over the new steps: the refusal is still decided by the graph on the SAME synchronous turn that the regeneration mutates it, the window now spans `build → compare census → serialize → validate → accept` (`§2.8` item `5`), and each earlier step's failure CLOSES the window with the ORIGINAL STILL AUTHORITATIVE — nothing accepted, nothing deleted, nothing cleared, a RETURNED RECORD (`§2.8` item `6`'s three-arm table).** **AND A COMMIT TO A LOWER TIER IS NOT TWO-PHASE: THIS CONTRACT'S OWN TEXT IS CHECKED AND IT DOES NOT SAY OTHERWISE — the transaction is entered by a commit that requests a tier HIGHER than the holder's (`§2.8` item `3`), and the crossing exists at the `file` tier ALONE (`§2.8` item `8`; `§1` item `6`), so a `mem`/`temp` commit is SINGLE-PHASE with a synchronous acceptance and the SERIALIZATION GATE IS THE `file` TIER'S ALONE.** **A lower-tier commit's own rules are unmoved: it clears nothing above it (`§2.8` item `2`), and it is not this transaction's subject at all.**

6. **THE WRITE TO AN ORPHANED REFERENCE.** **A write whose walk reaches a link whose target is severed fails LOUDLY,
   with `reason:'severed-link'`, as a RETURNED RECORD — not a throw and not a silent no-op.** **This is the whole of
   what replaces the deleted pin set: a smaller surface, and a failure the caller can see.**

---

### 2.6 The two caches (exact)

1. **THE TWO KINDS, and there is NO THIRD.** **(a) THE REGISTER CACHE** — a dictionary keyed by a name, holding the
   **LOWEST-DURABILITY MATCH** for that name; **(b) THE PER-LINK CACHE** — the same dictionary shape, scoped to ONE
   link, held ON that link (`GraphLink.cache`). **Neither is a register row member and neither is authoritative: a
   dictionary entry is a derived structure, so a row that stored a cache entry IN the register row would make the
   register a second authority over resolution and FAILS `R-5`.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION): THE REGISTER CACHE'S KEY DOMAIN, PRINTED — `name → THE LOWEST-DURABILITY MATCH`, FOR TOP-LEVEL NAMES ONLY.** **Under the ruling the register holds only top-level names, so the REGISTER CACHE (§2.6 item 1(a)) is keyed over TOP-LEVEL NAMES: an entry's `name` is a top-level name, and its `matchedRef`/`matchedTier` are that name's root node and the root node's own flag.** **NOTHING BELOW A ROOT IS CACHED IN IT — there is no register row below a root for an entry to shadow — and the PER-LINK CACHE is the structure that carries everything else (§2.6 item 1(b): the same dictionary shape, scoped to ONE link and held ON that link).** **The item's own invalidator clause already reads *"any change to the register — any operation that registers, de-registers or re-projects a TOP-LEVEL row"*, which the ruling makes exact: a top-level row IS a root's row.** **Entry shape, rebuild site, the two-part invalidation rule and the identity/purity rules are UNCHANGED.**
2. **THE ENTRY SHAPE, exact: `{ name, matchedRef, matchedTier }`.** **`name` is the resolved spelling; `matchedRef` is
   the node the entry answers; `matchedTier` is that node's own flag.** **The entry is the held read's own shadowing
   rule made into a cache record** — *an in-flight `temp` value wins over a committed `file` one* — **and it is computed
   from the graph with NO ambient input: no clock, no counter, no insertion time, no `Math.random`.**
3. **THE INVALIDATION RULE IS EXHAUSTIVE AND TWO-PARTED, and this is the whole of it:** **a cache entry is invalidated
   by (a) ANY CHANGE TO THE REGISTER — any operation that registers, de-registers or re-projects a top-level row — or
   (b) ANY CHANGE TO A LINK'S ANCHOR SET.** **Because anchors are IMMUTABLE (`§2.2` `P-2`), there is no *"mutate an
   anchor's link"* operation whose effect a cache could miss, so (b) is the ONLY way a link's addressability changes.**
   **CONSEQUENCE, stated because it is what makes the resurrection class closable BY THE RULE: the landed clear rule
   CHANGES THE RESIDENT SET the entry was derived from, and is therefore an invalidator by (a)'s own words.**
4. **THE REBUILD HAPPENS AT THE INVALIDATION SITE, NEVER ON THE READ PATH (the record's `DR-7`, resolved as a working
   default).** **A rebuild is performed by the mutating operation that changed the register or the anchor set — in the
   same synchronous step — and a read NEVER writes a cache entry.** **Why:** a read that rebuilds would be **a read with
   a side effect on derived state**, against the two landed rows that pin the read's purity, **and the held two-run
   store-state-independence row's own two runs could then differ in the cache's state** (`§0A` note 3). **A row that
   observes the read path mutating a cache entry FAILS `R-5`.**

   **⟶ ANNOTATED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-2`; `RCA-8(d)` ANNOTATE-BESIDE — the item above stands byte-for-byte). THIS SITE'S REBUILD IS THE ONE SUBJECT OF THE SEAM'S FAULT INJECTOR: `failNextCacheRebuild` (`§2.1`'s `GraphStore` block, appended by this pass) arms THIS step — the synchronous rebuild the mutating operation performs — to fail, which is what makes `§2.3` item 6 (vi)'s `'rebuild-failed'` arm at `F-CACHE` driveable and observable through the walk's next answer.** **`DR-7` IS UNMOVED IN BOTH DIRECTIONS: the rebuild still happens AT THE INVALIDATION SITE and never on the read path, and a failed rebuild neither moves the rebuild to the read path nor lets a read answer from a stale entry — the arm's declared answer is the RETURNED RECORD, and the read path's purity claim (`R-5`, `§3.3` `I-14`) is untouched by the injector's existence.**
5. **ANCHOR IMMUTABILITY IS WHAT MAKES THE RULE WELL-DEFINED, and a re-parent is a cache-invalidating event.** **A
   re-parent DELETES the anchors and MINTS new ones, which is a change to some link's anchor set; and a commit's
   regeneration removes and mints anchors, so the affected caches are invalidated BY THE SAME OPERATION.** **A
   regeneration is a register-and-anchor-set change, never a silent field write.**
6. **TWO READS ON ONE STATE ARE STRUCTURALLY IDENTICAL.** **The held two-run store-state-independence differential is
   satisfied AS LANDED with the rebuild at the invalidation site** (`§0A` note 3; `§3.4` `R-6`; `§5.5.1`
   `P-GR-IM-12`). **A `cache` is compared BY IDENTITY against the same handle across both runs, `parts` ABSENT is
   compared as ABSENT, and the answer's members are compared by value.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — item `6` above stands byte-for-byte). THE COMPARATOR'S MEMBER SET IS RE-DERIVED, because the `parts` member it names is WITHDRAWN WITH THE MERGED ARM (`§2.5` item `4`): the declared members compared BY VALUE are `found` · `value` · `tier` · `flag` · `name`, and a live `cache` is compared BY IDENTITY against the same handle across both runs.** **THE WITHDRAWN READINGS ARE NAMED SO NO ROW RE-DERIVES THEM: *"`parts` ABSENT compared as ABSENT"* and the `merged` member's by-value comparison both go with the two members, and a row that reads a `parts` or a `merged` member of an answer is a row against a withdrawn surface.** **EVERYTHING ELSE IN ITEM `6` IS UNMOVED: the rebuild happens AT THE INVALIDATION SITE, a read NEVER writes a cache entry, and the two-run differential is satisfied AS LANDED (`§0A` note `3`, `§3.4` `R-6`).**

---

### 2.7 The constraint table and `REPAIR` (exact)

1. **THE DECLARATION SHAPE, exact.** `{ id, kind, matchedSet, evaluatedOn, repair, onRepeat, refusalReason }`
   (`GraphConstraint`). **`kind` is `'count-exactly-one'` or `'unique-path-tier'`; `matchedSet` names the set the
   constraint is evaluated over; `evaluatedOn` is the list of operations that evaluate it; `repair` is
   `'next-surviving-by-order'` or `'none'`; `onRepeat` is `'edit'` or `'refuse'`; `refusalReason` is a token or `null`,
   and `null` means THIS ROW NEVER REFUSES.**

   **⟶ SUPERSEDED / RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS` — "THE CONSTRAINTS ARE
   PASSED FUNCTIONS, NOT A DATA TABLE" — `docs/decisions.md`, 2026-10-03; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed
   item above stands byte-for-byte and is the SUPERSEDED reading). THE DECLARATION SHAPE IS A FUNCTION-CARRIER —
   `{ id, matchedSet, evaluatedOn, constraint, repair? }` (`GraphConstraint`, RE-DERIVED AT `§2.1`'S BLOCK).** **THE
   CALLER SUPPLIES, per constraint: an `id` — a DECLARATION KEY, never a mechanism word (`§2.7` item 7); the
   `matchedSet` — a CALLER-SUPPLIED NAME the register/link resolves to the data it checks; the operation list it is
   evaluated on (`evaluatedOn`); THE CONSTRAINT FUNCTION; and THE REPAIR FUNCTION — OPTIONAL where
   rejection-via-refusal is the whole answer.** **THE CONSTRAINT FUNCTION'S CONTRACT, EXACT: it receives (the CHANGED
   DATA, the CURRENT state, the NEXT state) and returns a BOOLEAN, optionally carrying an error message / refusal
   reason back in the call's FEEDBACK — a returned record, never a throw.** **THE REPAIR FUNCTION'S CONTRACT, EXACT:
   called on a violation of this constraint, it takes CORRECTIVE ACTION to the data and outputs a SUCCESS BOOLEAN and
   an OPTIONAL ERROR MESSAGE.** **THE CLOSED `kind` / `repair` / `onRepeat` DATA-TOKEN DOMAINS ARE REMOVED from the
   constraint surface: `'count-exactly-one'` and `'unique-path-tier'` are NOT closed kinds — the former is ONE EXAMPLE
   use, documented at item 5; the latter is a GRAPH INVARIANT, NOT a constraint (item 4) — and the `onRepeat` /
   `'duplicate-path-tier'` pair routing stays in the WRITE machinery (`GraphWriteOptions`, `§2.3` item 5, `§7a.1`
   item 10), deleted only from the constraint row.**
2. **EVALUATION POINTS, exhaustive.** **EVERY WRITE (`set`, `commit`) AND EVERY `remove` evaluates the table on its
   POST-STATE.** **`clear` and `sweep` DO NOT evaluate it** — they remove references rather than write them, and the
   landed evaluation set is *"every write **and** `remove`"*. **A row that observes a constraint evaluated on a `clear`
   FAILS `M-13`; a row that observes a `remove` SKIPPING the evaluation FAILS `M-13`.**

   **⟶ CONFIRMED UNCHANGED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`): THE EVALUATION POINTS DO
   NOT MOVE. EVERY WRITE (`set`, `commit`) AND EVERY `remove` evaluates each caller-supplied constraint on its
   POST-STATE; `clear` and `sweep` DO NOT evaluate it.** **A repair's own write is itself evaluated, on ITS OWN
   post-state (item 3, UNCHANGED).** **`M-13`'s and `F-21`'s evaluation-point assertions are UNCHANGED.**
3. **THE REPAIR LANDS IN THE SAME COMMITTED WRITE, and it has its OWN event.** **A violating write is REPAIRED, never
   refused by the constraint it satisfies**, and **the repair's write clears the repaired reference's lower copies by
   the same logical-path rule and clears NOTHING if the higher tier refused.** **A repair EMITS ITS OWN `cause:'repair'`
   EVENT carrying the repaired value**, **and the violating caller's own write still emits its own** — so a repairing
   operation is countable as *"one event for the caller's reference plus one per repaired reference"*.

   **⟶ SUPERSEDED / RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-
   BESIDE — the as-filed item above stands byte-for-byte and is the SUPERSEDED reading). THE REPAIR IS A PASSED
   FUNCTION, AND THE MODEL'S OBSERVABLES ARE RESTATED EXACTLY:** **the repair is the CALLER-SUPPLIED function called
   on this constraint's violation; it takes corrective action to the data and outputs a SUCCESS BOOLEAN and an
   OPTIONAL ERROR MESSAGE.** **A violating write is REPAIRED — never refused by the constraint it satisfies — ONLY
   WHERE THE CONSTRAINT CARRIES A REPAIR FUNCTION; a constraint WITHOUT a repair answers by REFUSAL-VIA-FEEDBACK
   (its refusal reason comes from the constraint's OWN feedback — a RETURNED RECORD, never a throw), and a REFUSED or
   ABSENT repair CLEARS NOTHING and leaves the store byte-identical to its pre-call state.** **A repair LANDS IN THE
   SAME COMMITTED WRITE (no partial state, no window in which the post-state violates the constraint), emits ITS OWN
   `cause:'repair'` EVENT carrying the repaired value while the violating caller's own write still emits its own, and
   the receipt's `repaired[]` names EACH repaired reference.** **THE REASON'S DOMAIN: the store's closed
   refusal-union discipline for its OWN tokens is UNCHANGED (`GraphRefusalReason`, `SIXTEEN` members, `§2.1`'s block
   annotation); the caller's constraint may return its own reason in feedback, and that reason is a DATA STRING in
   the record, NEVER a NEW STORE TOKEN.**

   **⟶ ANNOTATED BESIDE 2026-10-05 (THE `U-STORE-DOC-SWEEP` HOME-TRUTH PASS — the gate-7 proofreader's finding the
   `U-PANE-DRAG-COMPLIANCE` close-out routed, plus the same finding's arm in the pane-drag red set; `RCA-8(d)`
   ANNOTATE-BESIDE — the RE-DERIVED item above and its `2026-10-03` annotation STANDS BYTE-FOR-BYTE and are NOT
   rewritten; this clause is this pass's dated reading of the re-derived item's third sentence, and the
   `U-PANE-DRAG-COMPLIANCE` files this pass does NOT touch carry the sibling annotations for the same clause).** THE CLAIM
   *"a REFUSED or ABSENT repair CLEARS NOTHING and leaves the store byte-identical to its pre-call state"* IS SPLIT
   BESIDE, BECAUSE ITS TWO HALVES HAVE TWO DIFFERENT LANDED ANSWERS — and the operative model is the ONE the
   `U-PANE-DRAG-COMPLIANCE` contract carries as THE AUTHORITY for the machinery (`docs/specs/pane-drag-compliance.md`
   `§0` ruling 3, which reads the re-derived text of `§2.7` items 1/2/3/5 and `§2.1`'s `GraphConstraint` block as the
   authority and the data-table form as the SUPERSEDED model).**
   ***(1) THE `"ABSENT"` HALF IS THE OPERATIVE ONE AND IS LANDED: a write whose violating constraint carries NO
   `repair` member at all answers REFUSAL-VIA-FEEDBACK*** — `evaluateConstraints`' repairless arm
   (`src/renderer/store-core-graph.ts:evaluateConstraints`, the `typeof member.repair !== 'function'` branch) returns
   `{refused: true, reason: <the member's own `feedback.reason`, defaulting to `'validate-failed'`>}`, the caller's
   write is rolled back BYTE-EXACTLY by the write journal (`src/renderer/store-core-graph.ts:journalBefore` /
   `:revertTo`), and the receipt is the returned record `refusalOfFeedback(...)` with EVERY member empty
   (`src/renderer/store-core-graph.ts:refusalOfFeedback`). **NO THROW. THE ARMED FIXTURE IS `F-2` AND ITS LANDED
   EVIDENCE IS `docs/specs/pane-drag-compliance.md` `§3b.1`'s `F-2` row** (the zone-size constraint WITHOUT a repair;
   the receipt `{status:'refused', reason:<the constraint's own feedback reason>, cleared: [], repaired: [],
   rows: [], crossings: 0, events: 0}`, the store byte-identical to its pre-call state).
   ***(2) THE `"REFUSED"` HALF — A PRESENT-BUT-FAILING REPAIR, i.e. a repair function whose own call returns
   `false` — DOES NOT CLEAR THE WRITE AND DOES NOT LEAVE THE STORE BYTE-IDENTICAL, AND THIS IS THE CLAUSE THIS
   ANNOTATION CORRECTS.*** **THE LANDED MACHINERY NEVER CONSULTS THE REPAIR'S RETURNED SUCCESS BOOLEAN:**
   `src/renderer/store-core-graph.ts:evaluateConstraints` calls `member.repair(next, feedback)` and DISCARDS the
   returned value (the `false`/`true` boolean the REPAIR FUNCTION'S CONTRACT at item 1 declares is **CALLER-SIDE
   REPORTING and nothing else**), then lands whatever the corrective action actually did **as a pre/post DIFF on the
   matched root's leaf record** — a NEW record entry becomes a REAL leaf node under the matched root
   (`src/renderer/store-core-graph.ts:mintRecordLeaf`), a CHANGED entry rewrites that leaf's value
   (`src/renderer/store-core-graph.ts:setValue`) against the unbounded recursive snapshot
   (`src/renderer/store-core-graph.ts:deepCopyOf` / `:deepEqualOf`). **SO A FAILING REPAIR THAT ACTS ON NOTHING IS
   INDISTINGUISHABLE FROM A SUCCESSFUL ONE THAT ACTS ON NOTHING, AND THE WRITE ITSELF STANDS: the caller's write
   keeps its OWN value and its OWN `status: 'committed'`, the receipt reads `repaired: []` and `cleared: []`, NO
   `cause:'repair'` event fires, and NOTHING THROWS. What is NOT admissible is a PARTIAL/REPAIR-SIDE MUTATION: the
   diff is taken over the whole record, so any entry the corrective action did touch becomes a named repaired
   reference with its own event.**
   ***(3) THE EVIDENCE, CITED RATHER THAN RE-DERIVED.*** **The re-aimed `F-3` row of the pane-drag red set (recorded
   beside the as-filed cell at `docs/specs/pane-drag-compliance.md` `§3b.1`, `F-3`) is the drive: the as-filed
   *"the store is byte-identical to its pre-call state"* is UNMAINTAINABLE against the landed machinery, and the
   landed end state is `repaired: []`, `cleared: []`, NO repair event, NO throw, the write's own `status:
   'committed'` and its value STANDING.** **The same reading is carried at `docs/specs/pane-drag-compliance.md`
   `§2.2` item 3's annotation** (the as-filed sentence there stands visible; the operative one is *"an UNSUCCESSFUL
   (present-but-failing) repair's `false` …"* with the re-aimed `F-3` end state printed in full).
   ***(4) WHAT DOES NOT MOVE.*** **The evaluation points (item 2) are UNCHANGED; the repair's SAME-COMMITTED-WRITE
   landing, its OWN `cause:'repair'` event and its `repaired[]` naming are UNCHANGED and are exactly what the
   machinery implements; the refusal-via-feedback discipline is UNCHANGED and is the repairless arm above; and the
   reason's domain (the caller's reason is a DATA STRING, never a new store token) is UNCHANGED.** **A row that
   drives a PRESENT-BUT-FAILING repair and asserts this item's as-filed *"byte-identical"* sentence FAILS against
   the landed machinery and drives a WITHDRAWN expectation; the driveable positive control for the byte-identical
   claim is the REPAIRLESS arm (`F-2`).**
4. **THE UNIQUENESS CONSTRAINT, WITH ITS TWO DECLARED OUTCOMES.** **At most one node holds a given `(logical path, tier)`
   pair.** **An attempt to add one where it already exists is routed by the call params**: **`'edit'` rewrites the
   existing node's value in place of minting a second node** (the DEFAULT), and **`'refuse'` fails LOUDLY with
   `reason:'duplicate-path-tier'` and leaves the store unchanged** (its OVERFLOW-STYLE posture: `cleared: []`,
   `events: 0`, nothing written). **A body that mints a second node for one pair FAILS `M-6`.** **`{onRepeat}` on the
   call OVERRIDES the constraint row's `onRepeat`; where neither declares it, the default is `'edit'`** (`§7a.1`
   item 10).

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE AS-FILED ITEM KEPT VISIBLE ABOVE; THIS ITEM'S *"logical path"* IS READ AT ITS TWO SUBJECTS, WITH THE REGISTER'S ROW COUNT OUT OF THE RECKONING.** **AT A ROOT: one node per `(top-level name, tier)`, and the register holds that pair's single row — so this constraint's root-side outcome IS readable from a register row (`§2.3` item 5's annotation (a)).** **BELOW A ROOT: the pair is counted over NODES, and a non-root path is **NOT A REGISTER ROW AT ALL**, so no part of a sub-root pair's outcome is readable from the register or from its row count (`§2.3` item 5's annotation (b); `rows = R`, the root count).** **The two declared outcomes, the `{onRepeat}` override, the `'edit'` default and `§7a.1` item 10's routing surface are UNCHANGED — the ruling touches this item's COUNTING SUBJECT and nothing else.**

   **⟶ SUPERSEDED / RE-DERIVED IN ITS CONSTRAINT-SURFACE MEMBERSHIP 2026-10-03 (the ACTIVE row
   `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed item and its 2026-10-01 annotation
   stand byte-for-byte). `unique-path/tier` IS NOT A CONSTRAINT: THE SINGLE-HOLDER-PER-`(path, tier)` RULE IS A GLOBAL
   BEHAVIORAL STATE OF THE GRAPH — A GRAPH INVARIANT ENFORCED BY THE STORE'S OWN WRITE MACHINERY, THE SAME CLASS AS
   THE TREE-BY-CONSTRUCTION AND MONOTONIC-PERSISTENCE INVARIANTS.** **IT IS REMOVED FROM THE CONSTRAINT SURFACE: no
   caller-suppliable constraint row carries it, and it appears NOWHERE in `GraphConstraint` (`§2.1`'s block).** **ITS
   ENFORCEMENT STAYS EXACTLY WHERE IT ALREADY LIVES — the write-surface / invariant clauses are NOT re-derived: the
   at-most-one-node-per-pair rule, its two declared outcomes, and the `{onRepeat}` / `'duplicate-path-tier'` pair
   routing are WRITE MACHINERY (`§2.3` item 5, `§2.4` item 7(e), `§2.8` items 1/3, `GraphWriteOptions`, `§3.3` `I-3`,
   `M-6`, `P-GR-IM-3`) — only the ROW-LEVEL `onRepeat` MEMBER is deleted from the constraint surface (`§7a.1`
   item 10).** **THE `{onRepeat}` PARAMETER OF THIS ITEM'S AS-FILED SENTENCE IS THE WRITE SURFACE'S OWN PARAMETER,
   UNCHANGED, AND THE SENTENCE'S *"OVERRIDES the constraint row's `onRepeat`"* IS READ AS SPENT: there is NO row-level
   `onRepeat` site left for a call to override.**
5. **THE EXACTLY-ONE-ACTIVE CASE, with the NEXT-SURVIVING-BY-`order` rule and the WRAP.** **For the
   `count-exactly-one` kind over a matched set with a caller-supplied order: `0` active → activate the NEXT SURVIVING
   entry BY THE CALLER'S OWN ORDER, WRAPPING TO THE FIRST when the closed entry was last; `≥2` active → deactivate every
   active entry except the REFERENT, the referent being the caller's own written reference or, on a
   `remove`-triggered evaluation, THE REMOVED ENTRY'S OWN INDEX.** **The repair consults NOTHING but the caller's own
   order — no insertion time, no tie-break, no store-side preference.**

   **⟶ SUPERSEDED / RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-
   BESIDE — the as-filed item above stands byte-for-byte and is the SUPERSEDED reading). `count-exactly-one` IS AN
   EXAMPLE, NOT A CLOSED KIND — THE SPECIFIC USE CASE FOR THE GENERAL-PURPOSE CONSTRAINT/REPAIR SYSTEM, DOCUMENTED
   HERE IN THE CALLER'S OWN SHAPE:** **THE CONSTRAINT is a FUNCTION that CHECKS THAT EXACTLY ONE TAB IS MARKED
   `active`; THE REPAIR is a FUNCTION that DE-ACTIVATES SURPLUS ACTIVE TABS if there are more than one, or ACTIVATES
   THE MOST RECENTLY ACTIVE TAB (as indicated by TAB-LOCAL DATA) if none, or OPENS THE LANDING PAGE if the tab set is
   EMPTY.** **BOTH ARE CALLER-SUPPLIED CODE supplied at construction — the store CALLS the functions and interprets
   NEITHER's internals (item 7); the matched-set resolution and every order / tie-break / landing-page choice are the
   CALLER's OWN.** **THE AS-FILED NEXT-SURVIVING-BY-`order` MACHINERY (its referent rule, its WRAP and its
   no-insertion-time/no-tie-break constraints) IS SUPERSEDED AS THE STORE'S OWN PROMISE — it may survive as part of
   the caller's own repair implementation, and no store clause promises it any more; what the store promises is only
   that it CALLS the supplied constraint on the evaluation points (item 2) and LANDS a supplied repair's corrective
   action in the same committed write (item 3).** **A RowWriter that drives the as-filed kind-token
   (`kind:'count-exactly-one'`) drives the SUPERSEDED data-table form and FAILS (item 1, RE-DERIVED).**

   **⟶ ANNOTATED BESIDE 2026-10-05 (THE `U-STORE-DOC-SWEEP` PASS — the same pass's correction of item `3`'s as-filed
   *"a REFUSED or ABSENT repair CLEARS NOTHING"* half; `RCA-8(d)` ANNOTATE-BESIDE — the re-derived item above stands
   byte-for-byte).** **ITS LAST SENTENCE IS SHARPENED BESIDE, BECAUSE *"a supplied repair"* IS TRUE OF EVERY REPAIR AND
   NOT ONLY OF A SUCCEEDING ONE: THE STORE LANDS A SUPPLIED REPAIR'S CORRECTIVE ACTION **WHATEVER THAT FUNCTION'S OWN
   SUCCESS BOOLEAN SAYS**.** **`src/renderer/store-core-graph.ts:evaluateConstraints` calls `member.repair(next, feedback)`
   and DISCARDS the returned value; the landing is the PRE/POST DIFF on the matched root's leaf record
   (`:deepCopyOf` / `:deepEqualOf` / `:mintRecordLeaf` / `:setValue`).** **SO: a repair that performs no corrective change
   lands `repaired: []` and the caller's own write stands `'committed'`; a repair that changes entries lands exactly those
   entries with their own `cause:'repair'` events; and NO clause of this item promises that a `false` return undoes the
   write.** **THE CALLER'S CODE AND THE CALLER'S CHOICES (the matched-set resolution, every order / tie-break / landing-page
   choice, per this item above) are UNCHANGED BY THIS READING, and the item's SUPERSESSION of the as-filed
   next-surviving-by-`order` machinery as THE STORE'S OWN PROMISE is UNCHANGED.** **The full operative reading is item `3`'s
   `2026-10-05` annotation; the armed evidence is `docs/specs/pane-drag-compliance.md` `§3b.1`'s `F-2` and re-aimed
   `F-3` rows.**
6. **A SECOND CONSTRAINT WITH NO INTERACTION RULE DOES NOT LOAD.** **An input carrying two distinct constraint ids where
   neither declares an interaction rule is refused AT CONSTRUCTION with `reason:'malformed-pattern'`** (the landed
   cascading rule, made mechanical); **the positive control is that a one-row table LOADS.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S RULING ON THE INTERACTION PRECONDITION; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed item above stands byte-for-byte, and this clause is its OPERATIVE TEXT).** **THE ARCHITECT'S WORDS, VERBATIM: *"Why is an interaction necessary? Any constraint violation is a rejection."*** **THE AS-FILED PRECONDITION IS WITHDRAWN, AND THE REASON IS STATED RATHER THAN LEFT TO A READER: ITS EXCEPTION WAS UNEXPRESSIBLE BY CONSTRUCTION.** **Item `1` of this section declares the constraint row's own shape — `{ id, kind, matchedSet, evaluatedOn, repair, onRepeat, refusalReason }`, SEVEN members — and that shape carries NO INTERACTION-RULE MEMBER, so the as-filed clause's *"where neither declares an interaction rule"* was TRUE OF EVERY INPUT TWO DISTINCT CONSTRAINT IDS COULD APPEAR IN: the precondition HAD NO EXPRESSIBLE EXCEPTION, its refusal fired on every two-id input the shape could carry, and NO INPUT COULD EVER SATISFY THE EXCEPTION THE CLAUSE NAMED.** **AND THE PRECONDITION WAS NEVER NEEDED: nothing about enforcement requires two constraints to know about each other.** **THE OPERATIVE RULE, STATED PLAINLY IN THIS CLAUSE'S OWN CELL: THE CONSTRAINT TABLE DECLARES `N` INDEPENDENT ROWS — each row IS a predicate plus a response, and the declaration shape printed at item `1` is the whole of what a row may say.** **EACH ROW IS EVALUATED ON EVERY WRITE (`set`/`commit`) AND EVERY `remove`, over that call's POST-STATE** (item `2`, UNCHANGED). **ANY VIOLATION IS A REJECTION, carried as THAT ROW'S OWN declared `refusalReason` — EXCEPT WHERE THE ROW ITSELF DECLARES A `repair`, WHICH LANDS IN THE SAME COMMITTED WRITE** (item `3`, UNCHANGED). **NO ROW DECLARES, KNOWS OR NEEDS ANOTHER ROW.** **THE CASCADING FORM IS THEREFORE RE-HOMED, NOT REFUSED: a `repair`'s own write IS a write (item `2`), so it is evaluated on ITS OWN post-state, and a violation it leaves is the violated row's declaration applied to it — a rejection carrying that row's token, or that row's own declared repair in the SAME committed write — which is why `NW-8`(c)'s cascading case needs no LOAD refusal to be answered** (`docs/specs/data-ownership-model-plan.md` `§7.3` `NW-8`(c), quoted in the held `docs/specs/store-core.md` `§0A` note 10, whose *"a second one owes its interaction rule before it is declared"* is SUPERSEDED BESIDE by this ruling). **`N` IS THE DECLARED ROW COUNT AND NOTHING ELSE: this contract's own register fixture declares `N = 2` — `unique-path-tier` · `count-exactly-one` — and BOTH ARE LEGAL TO DECLARE TOGETHER, EACH ENFORCED INDEPENDENTLY** (`§5.5.1`'s fixture annotation, printed at the fixture itself). **WHAT SURVIVES FROM THE AS-FILED ITEM: its positive control's subject-matter — a well-formed declaration LOADS — and the TOKEN `'malformed-pattern'`, which remains a HELD member of the closed union and still fires at the construction-time arm that owns it, `§2.4` item `5`(f) (*"a malformed or ambiguous pattern"* in the input), carried at `§2.4` item `7`(g).** **NO ARM OF `§2.4` ITEM `5`'S CLOSED SIX IS ADDED, DROPPED OR RE-SUBJECTED BY THIS WITHDRAWAL: the two-id precondition was NEVER one of the six** (item `5`'s own annotation: *"the set stays CLOSED AT SIX"*). **AND THE WITHDRAWAL REMOVES AN ARM AND NEVER A MEMBER: the union's operative count and printed membership are UNCHANGED at `SIXTEEN` = `8` HELD + `5` THIS CONTRACT'S AMENDMENT + `3` THE TWO ARCHITECT AMENDMENTS (`8 + 5 + 3 = 16` ✓), because `'malformed-pattern'` is a HELD member with a surviving site** (`§2.1`'s block annotation's clause `(3)` prints the reconciliation and every site of either figure; `§5.5.3`'s closing block item `(13)` re-prints the register's own figures, which this withdrawal does not move either).
**⟶ SUPERSEDED / RE-DERIVED 2026-10-03 (item 6's RE-DERIVATION — the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-
   BESIDE — the as-filed item and its 2026-10-01 annotation above stand byte-for-byte). THE SECOND-CONSTRAINT LOAD
   RULE HAS NO SUBJECT IN THE RE-DERIVED MODEL: CONSTRAINTS ARE CODE FEATURES SUPPLIED AT CONSTRUCTION — there is NO
   constraint DATA to load, NO constraint-install path as data, and NO table a caller mutates at runtime (`§2.1`'s
   block; the factory's `constraints` option is the ONE supply site; no `addConstraint`-style surface exists or is
   added).** **THE OPERATIVE RULE, STATED PLAINLY IN THIS CLAUSE'S OWN CELL: THE CALLER-SUPPLIED CONSTRAINT SET
   DECLARES `N` INDEPENDENT MEMBERS — each is a predicate plus an optional response (the function-carrier shape of
   item 1 is the whole of what a member may say), EACH IS EVALUATED ON EVERY WRITE (`set`/`commit`) AND EVERY `remove`
   over that call's POST-STATE (item 2, UNCHANGED), ANY VIOLATION IS A REJECTION carried as the constraint's OWN
   feedback reason — EXCEPT WHERE THE MEMBER CARRIES A REPAIR, WHICH LANDS IN THE SAME COMMITTED WRITE (item 3,
   UNCHANGED) — and NO MEMBER DECLARES, KNOWS OR NEEDS ANOTHER.** **THE CASCADING FORM IS RE-HOMED EXACTLY AS THE
   2026-10-01 ANNOTATION ABOVE STATES: a repair's own write IS a write (item 2), evaluated on ITS OWN post-state, and
   a violation it leaves is answered by the member whose constraint it violates.**
7. **THE TABLE IS VOCABULARY-CLEAN.** **No row, id or repair action spells a consumer token as the STORE's vocabulary
   beyond the declared constraint id** — **the id is a declaration key, not a mechanism word**, and the mirror-class ban
   binds the table's bytes.

   **⟶ SUPERSEDED / RE-DERIVED 2026-10-03 (the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-
   BESIDE — the as-filed item above stands byte-for-byte and is the SUPERSEDED reading). THE VOCABULARY RULE'S
   OPERATIVE FORM: THE CONSTRAINT ID IS A DECLARATION KEY — NEVER A STORE MECHANISM WORD — AND THE CONSTRAINT /
   REPAIR FUNCTIONS ARE THE CALLER'S CODE: THE STORE CALLS THEM AND NEVER INTERPRETS THEIR INTERNALS.** **The
   mirror-class ban binds the STORE'S OWN BYTES — no member of the constraint surface spells a consumer token as
   STORE vocabulary — while the CALLER's function bytes may spell anything the caller owns, because they are not the
   store's bytes; no mechanism-word test reads them (`M-17`'s scan scopes the two modules' OWN bytes, `§2.2` `P-1`),
   and the store answers the caller's matched-set NAME by resolving the value the caller named, never by interpreting
   the name (`§2.7` item 1).**
8. **`reachable(name)` IS THE REACHABILITY QUERY AND IT IS NOT A CAP.** **Reachability decides WHAT MAY BE DELETED; the
   register's caps decide HOW MANY VALUES MAY EXIST.** **They are different quantities and no row may use one as the
   other** (`§0A` note 6).

---

### 2.8 The write surface — `set`, `commit`, `remove`, `clear`, `sweep`, `sever`

1. **`set` NEVER CLEARS, NEVER MINTS A NODE AND NEVER CHANGES A FLAG.** **A `set` on a path whose `(path, tier)` pair
   holds a node writes that node's value and answers `cleared: []`.** **A `set` on a path with NO node is REFUSED
   `'undeclared-name'`** — **because the flag a new node would need is minted by `commit` alone** (`§0A` note 4).
   **A row that observes a `set` clearing anything, or minting a node, FAILS `M-9`.**
2. **`commit` CLEARS THE SAME LOGICAL PATH IN EVERY LOWER-DURABILITY TIER, AND ONLY THAT.** **The clear happens AFTER
   the higher tier durably accepted the value, NEVER BEFORE** — and **a refused or throwing commit clears NOTHING and
   emits NOTHING.** **The clear is BY LOGICAL PATH, NEVER by suffix or prefix**: a commit NEVER clears a higher tier and
   NEVER clears recursively. **A commit to a path no lower tier holds clears nothing — a declared, reportable outcome
   (`cleared: []`), never a refusal and never a silent no-op.** **The held rules `C-1`…`C-5` are cited by row name and
   their semantics are UNCHANGED; what changes is that a tier-qualified commit to a HIGHER tier is now the entry point to
   the regeneration transaction (`§2.8` item 5).**
   **⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S FIRST AMENDMENT, `A1`) — item `2`'s persist-before-clear ordering STANDS UNCHANGED, and this clause states what a FAILED file commit does to it.** **The order is unmoved: the higher tier's durable acceptance comes FIRST, the clears come AFTER it (`C-2`'s own rule), and a refused or throwing commit clears NOTHING and emits NOTHING.** **WHAT THE AMENDMENT ADDS IS A GATE ON WHAT COUNTS AS ACCEPTANCE AT THE `file` TIER: acceptance now requires the built set to have been SERIALIZED to stable JSON AND THAT SERIALIZED FORM TO HAVE VALIDATED (`§2.8` items `5`/`6`), so a commit whose built set cannot be converted to saveable JSON, or whose serialized form does not validate, NEVER REACHES the acceptance that would license a clear.** **THEREFORE, ON ANY OF THE THREE FAILURE ARMS (CENSUS MISMATCH · SERIALIZATION FAILURE · VALIDATION FAILURE): `cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0`; NO lower-durability copy is cleared; NO subscription is released and NO `cause:'severed'` event is emitted — `§2.10` item `3`'s arm is the SEVERANCE's release-reporting arm, and a failed regeneration is NOT a severance, because nothing is deleted and no reference is released; and EVERY RESIDENT COPY STILL RESOLVES.** **Item `2`'s other sentences — the clear by logical path, the never-a-higher-tier rule, the never-recursive rule, the declared `cleared: []` outcome and the citation of the held `C-1`…`C-5` — are UNTOUCHED.**

3. **`commit` IS THE MINTING AND RE-MINTING OPERATION.** **On a path with no node, `commit` MINTS one node at the
   requested tier and registers its top-level row.** **On a path whose `(path, tier)` pair already holds a node, `commit`
   routes the attempt to the pair's declared outcome** (`§2.7` item 4). **On a path held at a LOWER tier, `commit`
   performs the REGENERATION TRANSACTION at the requested tier.**
4. **`remove`, `clear` and `sweep` KEEP THE HELD SHAPES, cited by row name.** **`remove(name)` CLEARS DOWNWARD** — the
   NAMED TIER AND EVERY LESS-PERSISTENT COPY of the same logical path, never a higher tier (`remove('file.x')` → `file`,
   `mem`, `temp`; `remove('mem.x')` → `mem`, `temp`; `remove('temp.x')` → `temp` only) — **and its post-state is a MISS on
   that logical path at every tier the name reaches.** **`clear(name)` is TIER-LOCAL, NON-RECURSIVE, and one event per
   cleared reference.** **`sweep` unmarks and clears the swept entries and emits ONE EVENT PER SWEPT REFERENCE, never
   one event carrying a list.** **A refused `remove` clears nothing.** **A tier-free `remove`/`set`/`commit` is refused
   `'malformed-name'`** — the write side requires a tier qualifier, because the store may not choose the tier.
5. **THE SUBTREE REGENERATION TRANSACTION — THREE STEPS, IN THIS ORDER.** **(1) BUILD the regenerated subtree: the node
   and EVERY descendant, each re-tiered, as NEW nodes under the original's location.** **(2) COMPARE ITS CENSUS WITH THE
   ORIGINAL'S.** **(3) DELETE THE ORIGINAL ONLY ON A MATCH.** **The census term, resolved as a working default: THE
   TIER'S OWN ROW COUNT — the number of register rows the regenerated set occupies at the requested tier — and
   `collectionSizeAt(tier, subtree)` is the declared instrument.** **The corroborating reading, recorded beside it, is
   the resident set's own segment total; the two are NOT interchangeable and a row may not compare one in the
   comparison and the other in its assertion** (`§7a.1` item 11).
   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S FIRST AMENDMENT, `A1`) — item `5`'s three printed steps above are KEPT VISIBLE AND EXTENDED TO FIVE, IN THIS ORDER, and the extension is what makes a tier-1 commit REVERSIBLE.** **THE ORDERING, STATED EXPLICITLY: `(1)` BUILD the regenerated subtree (the node and EVERY descendant, each re-tiered, as NEW nodes under the original's location) → `(2)` COMPARE its census with the original's (item `5`'s declared instrument, the tier's own row count, with the corroborating segment total asserted BESIDE it) → `(3)` SERIALIZE the built set to STABLE JSON under item `9`'s rules (the translation that is the channel's cargo, item `8`) → `(4)` VALIDATE the serialized form — the declared validation is three readings: it parses back as JSON · it carries exactly the built set's `N` affected references · it carries no value the JSON rules could not represent → `(5)` ACCEPT: the tier-1 write crosses through the declared, STUBBED `crossing` seam and answers `'committed'`, and ONLY THEN is the ORIGINAL DELETED — and only then do item `2`'s lower-tier clears run (`C-2`'s persist-before-clear ordering, unchanged).** **WHAT EACH EARLIER STEP'S FAILURE LEAVES BEHIND — THE SAME THING AT EVERY STEP: THE ORIGINAL ALIVE, NOTHING DELETED, NOTHING CLEARED, NOTHING RECLAIMED, AND A RETURNED RECORD (never a throw, `§2.2` `P-5`).** **A failure at `(1)` leaves the graph exactly as it was; at `(2)` the census mismatch is declared; at `(3)` or `(4)` the built set is DISCARDED with the original untouched; and the DELETION is reachable ONLY from `(5)`'s accepted crossing — which is why item `6`'s sentence *"the deletion is the transaction's LAST step"* remains true of the extended machine.** **THE ARCHITECT'S WORDS, VERBATIM, ARE THE AUTHORITY FOR THE ORDER: *"Commits to file store level must be reversible at least until the actual file store has been serialized and validated. An attempted write to a file store should fail if it cannot be converted to saveable JSON."*** **THE FIVE STEPS APPLY TO A `file`-TIER REGENERATION; FOR A `mem`-TARGET REGENERATION, STEPS `(3)`/`(4)` ARE DECLARED NOT-APPLICABLE-BY-TIER — the crossing exists for the `file` tier alone (item `8`; `§1` item `6`) — so that transaction is `build → compare → accept-and-delete`, SINGLE-PHASE; this contract's own text is what is being read here, and no clause of it makes a lower-tier commit two-phase (`§2.5` item `5`'s annotation states the same finding).** **AND THE SECOND AMENDMENT'S BOUND IS CHECKED BEFORE THE CENSUS STEP: the transaction's NEW ROOT TIER must satisfy `durability(new tier) ≤ durability(the original root's own parent node's flag)` wherever that parent exists (MONOTONIC PERSISTENCE, `§2.1`'s named-invariant block), and an UPWARD re-tier of a child subtree is REFUSED `'durability-inversion'` there — while a DOWNWARD re-tier of a whole subtree is LEGAL, because every descendant moves with its root and no child is left above its parent.** **(THE SITES THAT CITE THIS TRANSACTION, LISTED SO NOTHING IS LEFT TO ASSEMBLY — each is extended here or annotated BESIDE at its own site in this same pass, and none is left reading its as-filed three steps as the whole machine: `§0` ruling `9` (extended; the `§0` amendment block records it) · `§1` item `1` · `§2.5` item `5` (annotated) · `§2.6` item `5` (the invalidator half, unmoved) · `§2.8` items `2`/`3`/`6`/`7`/`8` (item `2` annotated as above; item `3`'s entry point unmoved; item `6` = the three arms; item `7` = the receipt and events, unmoved in shape; item `8` = the crossing, unmoved) · `§3.1` `M-10`/`M-11`/`M-12` and `§3.2` `F-9`/`F-10`/`F-12` (annotated after their tables) · `§4.2` item `5` (its row list unmoved) · `§5.3` item `2` (its scope sentence annotated) · `§5.5.1` `P-GR-IM-9`/`P-GR-SM-1` (annotated after the table) · `§7a.1` items `4`/`7`/`11` (their amended readings printed in the closing effect block) · `§8` item `8` (annotated).)** **THE AMENDMENT'S OWN PROMPT NAMES `§2.7` FOR THIS TRANSACTION; `§2.7` HERE IS THE CONSTRAINT TABLE, AND THE TRANSACTION IS PINNED AT `§2.8` ITEMS `5`/`6`/`7` — the mis-citation is recorded at `§0`'s amendment block and is not propagated.**

6. **A CENSUS MISMATCH IS A DECLARED FAILURE THAT LEAVES THE ORIGINAL ALIVE.** **Nothing is deleted, no partial state
   lands, and the failure is a RETURNED RECORD with `reason:'rebuild-failed'`** — **the declared failure token for this
   transaction.** **The flag is NEVER rewritten in place, and the regenerated nodes are NEW nodes under the original's
   location, so the walk cannot mis-read a re-tier as a severance: the deletion is the transaction's LAST step and it
   happens only after the census matched.**
   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S FIRST AMENDMENT, `A1`) — item `6` above is KEPT VISIBLE AND ITS DECLARED FAILURE IS ONE OF THREE ARMS, EACH WITH ITS OWN DECLARED TOKEN AND ITS OWN RECEIPT ROW WORDING.** **The as-filed arm stands exactly as written: a CENSUS MISMATCH is a declared failure that leaves the original alive, and its token is `'rebuild-failed'`.** **THE OTHER TWO ARMS ARE NEW, AND THIS IS WHERE THE REFUSAL UNION GROWS (by two members, reconciled at `§2.1`'s block annotation):**

   | # | The arm, at its step | Its declared token | Its receipt row wording | What it leaves behind |
   | --- | --- | --- | --- | --- |
   | **(a)** | **CENSUS MISMATCH**, at step `(2)` of item `5` | **`'rebuild-failed'`** — **the EXISTING token, and it covers THIS ARM ALONE** | *"the regenerated set's census did not match the original's; the original is authoritative"* | **the original alive · nothing deleted · `cleared: []` · `repaired: []` · `rows: []` · `crossings: 0` · `events: 0`** |
   | **(b)** | **SERIALIZATION FAILURE** — a value of the built set cannot be represented as SAVEABLE JSON, at step `(3)` | **`'serialize-failed'` — NEW** | *"the built set could not be converted to saveable JSON; the original is authoritative"* | **identical to `(a)`** |
   | **(c)** | **VALIDATION FAILURE** — the serialized form does not validate, at step `(4)` | **`'validate-failed'` — NEW** | *"the serialized form did not validate; the original is authoritative"* | **identical to `(a)`** |

   **EACH ROW IS A RETURNED RECORD AND NEVER A THROW (`§2.2` `P-5`), and each carries `cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0` with the store LEFT COMPLETELY UNCHANGED.** **NO EXISTING TOKEN COVERS `(b)` OR `(c)`: `'rebuild-failed'` is the census arm's declared token and is NOT re-pointed — re-pointing it would make two different failures indistinguishable and would falsify item `6`'s own sentence — `'cap-exceeded'` is the cap posture's, and no held token names a JSON-representability or a validation failure; hence the union grows to `SIXTEEN` members (`§2.1`'s block annotation prints the count with all three term groups, `8 + 5 + 3`).** **THE DELETION IS REACHABLE ONLY FROM AN ACCEPTED STEP `(5)`, so NO arm of this table can delete, clear, reclaim or release anything, and `§2.10` item `3`'s `'severed'` arm is NOT emitted by any of them.** **Item `6`'s own sentences — the flag NEVER rewritten in place, the regenerated nodes NEW nodes under the original's location, the deletion the transaction's LAST step, the walk unable to mis-read a re-tier as a severance — are UNTOUCHED.** **AND `F-9`'s operative form is these three arms, not the census arm alone (`§3.2`'s own annotation after the fail-state table).**

7. **THE CROSSING, THE RECEIPT AND THE EVENT SET FOR A SUBTREE-WIDE REGENERATION.** **For `N` AFFECTED REFERENCES (the
   node plus every descendant): ONE RECEIPT ROW PER AFFECTED REFERENCE (`rows[]` has `N` entries), ONE CROSSING FOR THE
   WHOLE REGENERATED SET (`crossings: 1` — the set is ONE COMMITTED WRITE, and a crossing that serializes one reference
   at a time is a FINDING), and THE PER-AFFECTED-REFERENCE EVENT RULE UNCHANGED (one event per affected reference, a
   sweep of `N` emits `N`, a refused write emits `0`).**
8. **THE `file`-TIER WRITE IS A TRANSLATION, AND THE TRANSLATION IS THE CHANNEL'S CARGO.** **A write that crosses to
   `file` puts A STABLE-JSON TRANSLATION OF THE GRAPH through the declared, STUBBED `crossing` seam** — **not a
   per-reference list and not a tombstone.** **The crossing is `U-STORE-PERSIST`'s and this unit asserts NOTHING about
   its order, idempotency or failure recovery.**
9. **THE STABLE-JSON STABILITY RULES, resolved as a working default (the record's `DR-6`).** **The translation reuses the
   held canonical comparator's rules, with the coupling STATED rather than hidden: (a) an object's OWN ENUMERABLE OWN
   KEYS are emitted in SORTED order; (b) primitives are rendered BY VALUE, with `-0` and `NaN` distinguished by
   `Object.is`; (c) `undefined`-valued members are OMITTED, so ABSENT and `undefined` are the same absence; (d) a
   `GraphNodeRef` is rendered as its own string, because the handle is a serializable nameable form; (e) a
   `GraphTierHandle` is rendered as its `tier` token, never as a live object; (f) the affected-node set is derived from
   the graph the deletion happened in, so **two translations of the same graph with nodes created in a different order
   are BYTE-IDENTICAL.**
10. **A MULTI-REFERENCE OPERATION IS ONE COMMITTED WRITE.** **A regeneration's reference set is ordered and is crossed
    ONCE; the receipt returns one row per reference; and the constraint evaluation is evaluated OVER THE WHOLE SET in
    the one committed write.** **A body that crossed once per reference FAILS `R-8`.**

---

### 2.9 The multi-level export

1. **THE EXPORT IS A SNAPSHOT.** **`export(name)` returns a FRESH object per call, NON-AUTHORITATIVE, recomputed on
   every read — the same status the held model declares for its one composite.** **A caller that mutates it changes
   nothing in the store, which is a feature.** **A row that treats an export as committable, cacheable or authoritative
   FAILS `M-15`.**
2. **A LIVE HANDLE INTO THE CACHE IS NOT GRANTED, and no aliasing between an export and a store value exists.** **An
   export may not be used as a value to write back.**
3. **THE CROSSING RULE — LOCAL-ONLY, NOT REQUIRED TO SERIALIZE.** **An export is for LOCAL USE WITHIN A FUNCTION.** **It
   MAY NOT carry a live `cache` handle beyond its caller's own frame, and no row may claim it crossed an IPC
   boundary.** **The crossing form (a JSON-safe export) is named as the escalation if a host caller ever needs it** —
   **and taking it is a spec amendment with its own gate, not an in-flight choice** (`§7a.1` item 9).

   **⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — items `1`–`4` above stand byte-for-byte). THE EXPORT'S RESULT SET SHRINKS WITH THE READ'S, AND THE EXPORT ITSELF IS UNMOVED.** **`export(name)` is declared over `GraphResolveResult | GraphRefusalReason`, and `GraphResolveResult` is now `GraphReadHit | GraphReadMiss` (`§2.1`'s block annotation beside that union; `§2.5` item `4`) — so an export answers the HIT, the MISS or a refusal TOKEN, and the SNAPSHOT of a store-assembled composite is WITHDRAWN WITH THE ARM THAT PRODUCED IT.** **THE FOUR ITEMS ABOVE ARE UNTOUCHED: the export is still a FRESH, NON-AUTHORITATIVE, LOCAL-ONLY snapshot, a live `cache` still may not cross an IPC boundary, and no timing figure is claimed.** **AND THE QUESTION THE WITHDRAWAL LEAVES BESIDE THE EXPORT IS ANSWERED RATHER THAN LEFT OPEN: a caller holding a node reference reads that node's own `flag` (`§2.5` item `4`'s case set), so the export's remaining duty is the SNAPSHOT of a subtree's values — it is NOT the merged arm's replacement and it is NOT claimed to be one.**
4. **THE EXPORT'S COST IS NOT CLAIMED TO BE `O(1)`.** **A traversal's cost is proportional to the depth of the walk and
   the size of the subtree it materializes, and a valid leaf cache entry amortizes NOTHING of the export.** **No timing
   figure is claimed anywhere in this file** (`RCA-12`).

---

### 2.10 The event surface

1. **THE ENVELOPE, exact: `{name, flag, value, cleared[], cause}`, with `origin` on the `descendant` arm alone and
   `subtree:true` as that arm's own marker.** **`name` is the reference's spelling the caller used · `flag` is the tier
   that FIRED (for a `descendant` event, the tier that holds the WRITTEN path) · `value` is present as a KEY on every
   arm and `undefined` in substance where the arm carries none · `cleared[]` is PRESENT AND POSSIBLY EMPTY on every arm
   and is NEVER omitted.**
2. **THE EIGHT-ROW ARM TABLE IS THE TOTAL MEMBER-SET STATEMENT.** **`✓` = REQUIRED AND NON-EMPTY IN SUBSTANCE; `—` =
   REQUIRED AS A KEY, EMPTY/`undefined` IN SUBSTANCE.**

   | `cause` | `name` | `flag` | `value` | `cleared[]` | `origin` | What the arm MEANS |
   | --- | --- | --- | --- | --- | --- | --- |
   | **`'set'`** | ✓ | ✓ | ✓ | — | — | an equal-value write fires NOTHING; **a `set` is NOT a commit and must never be counted as one** |
   | **`'commit'`** | ✓ | ✓ | ✓ | **✓ — possibly EMPTY** | — | emitted AFTER the higher tier durably accepted and AFTER the clears; **`cleared[]` here is the AUDIT list, not the cleared reference's only channel** |
   | **`'clear'`** | ✓ | ✓ | — | — | — | **one event per cleared reference; a cleared lower reference fires its OWN `cause:'clear'` on its OWN path** |
   | **`'sweep'`** | ✓ (one event EACH) | ✓ | — | — | — | **`N` swept entries ⇒ `N` events, never one event carrying a list** |
   | **`'remove'`** | ✓ | ✓ | — | ✓ | — | distinguishable from a commit-with-clears BY ITS `cause` TOKEN and by `value: undefined`, **never by a count** |
   | **`'repair'`** | ✓ | ✓ | ✓ | ✓ | — | **a repair emits its OWN event**; the violating caller's own write also emits its own |
   | **`'descendant'`** | ✓ (the ANCESTOR opted in on) | ✓ | — | — | **✓ — REQUIRED HERE ALONE** | ancestors fire ONLY for `{subtree:true}` subscribers; **an ancestor with no opt-in subscriber fires NOTHING** |
   | **`'severed'`** | ✓ (the RELEASED reference) | ✓ | — | **✓ — the references the severance cleared** | — | **THE EIGHTH ARM, added by this contract (`§7a.1` item 4): the release-reporting arm. A reclaim that released a live subscriber's reference and reported NOTHING would be a silent disappearance** |

3. **THE SUBSCRIBER-RELEASE RULE, and the count row RE-DERIVED RATHER THAN RELAXED.** **`sever(from, anchorKey)` DELETES
   the `file`-flagged node on the far side of the link, RELEASES EVERY SUBSCRIPTION REGISTERED ON THAT NODE OR ON ANY
   REFERENCE IT HELD, and EMITS EXACTLY ONE `cause:'severed'` EVENT PER RELEASED REFERENCE, naming the released
   reference in its own `name` and in the severing receipt's `cleared[]`.** **After the severance, the subscription
   count for each released reference reads exactly `0`** — the held per-realm-per-reference discipline's **third release
   trigger**, added beside the realm's death and `reset()`. **A row that observes an unanswered delivery (a live
   listener on a reference the graph no longer contains) FAILS `F-11`; a row that observes a silent disappearance (a
   release with no event) FAILS `F-11`; and a row that observes MORE than one event for one released reference FAILS
   `F-11`.**
4. **THE DELIVERY RULES, cited and unchanged in shape.** **A store subscription is PER REALM, PER REFERENCE**: one
   subscription, for as long as the realm lives, on one declared reference; **its count after `N` graph
   re-derivations stays `1`**. **`unsubscribe()` answers `true` the first time and `false` on every later call — never a
   throw.** **A NON-CALLABLE listener is refused `'malformed-name'` and registers NOTHING.** **A listener that THROWS
   does not propagate to the mutator's caller: the store catches it, continues the fan-out in registration order, and
   the operation's receipt is UNCHANGED by the throw.**
5. **`events` IS THE COUNT OF EVENTS EMITTED — NOT THE COUNT OF LISTENERS INVOKED.** **One event to three listeners is
   `events: 1` and three deliveries.** **Both readings are asserted against the subscribers' own delivery record, so a
   body cannot pass by counting only one.**
6. **A WRITE PINGS EXACTLY ITS OWN PATH; ANCESTORS FIRE ONLY FOR OPT-IN SUBSCRIBERS.** **The `descendant` event carries
   NO value and `origin` is the WRITTEN PATH FULLY QUALIFIED** — so a subscriber learns WHICH descendant changed and
   WHICH tier holds it. **A write to a descendant NEVER writes, clears or pings a persistent ancestor.**

---

### 2.11 The construction and the realm (stated once, so no pass infers it)

1. **Who creates the store, when, and what a second creation does** — `§0A` note 8: **one store per realm, at boot,
   held by the wiring, never in a module-level binding; a second creation is caught by the ROW that counts
   constructions.**
2. **The graph is renderer-realm; the security collection is main-side.** **A graph spanning two realms is
   unimplementable** (its nodes are live references), **so the graph, the register and the two caches are renderer-realm
   and `secure` is unreachable from the generic surface BY CONSTRUCTION** — refused on the name's own first segment
   **before** the register is consulted and **before** any traversal (`§2.4` item 5).
3. **Recursion is structurally impossible, and this is the declared semantics the held totality posture lacked.** **The
   tree invariant is a construction property with a positive control; the segment-as-data rule is a declared string
   comparison. Neither a visited set nor a depth bound is owed, and no row may require one.** **A positive control that
   cannot express its failing case is VACUOUS and is itself a finding** (`§3.4` `R-2`, `§5.5.1` `P-GR-TP-2`).
4. **The severance's ordering is persist-first, then delete.** **Inside the crossing the node is unreachable but alive:
   a READ that arrives there answers the value or a refusal, never both; a WRITE that arrives there FAILS LOUDLY; and
   the crash window is DECLARED as *"a lost WRITE, never a lost DELETE"*.** **The recovery half belongs to the channel's
   unit** (`§7a.1` item 3).

---

## 3. Behaviour (every state / fail-state)

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The walk resolves the architect's own example end to end** | a register row for `window`; a node with the anchor `tabs`; that anchor's link targeting a node whose `localName` is `landingPage` and whose flag is `file`; `resolve('file.window.tabs.landingPage')` | an ANSWER: `found:true`, the node's value, `flag:'file'`, `cache` IDENTICAL (`toBe`) to `tiers.file`, `name:'file.window.tabs.landingPage'` | `§2.3` items 1/2/7, `§2.5` item 1, `R-6` | `[T]` |
| **M-2** | **The leaf stores its OWN LOCAL NAME, never a dotted path** | the same fixture; the node's own bytes and the register row's spelling are read | the node's `localName` is **exactly `landingPage`**; **no node carries a dotted path as its local name**; `window` is the register row's spelling and `tabs` is the anchor's key — three different structures, three different strings | `§2.3` item 2, `§2.4` item 1, `I-4` | `[T]` |
| **M-3** | **`cache` IS the tier collection's own handle, by identity** | a hit whose flag is `mem` | `result.cache === store.tiers.mem` (`toBe`), and **the same handle answers its own `get` with the same value** | `§2.5` item 3, `§2.6` item 1, `§2.2` `P-7` | `[T]` |
| **M-4** | **TIERS COMPOSE: two holders coexist for one logical path, across tiers** | a `file`-flagged node at `(p, 'file')` and a `temp`-flagged node at `(p, 'temp')`, both registered | **BOTH writes commit**, the register carries the row, and **`resolve('p')` answers the first hit in ascending durability (`temp`) while `resolve('file.p')` answers the `file` holder** — **two holders, one logical path, no collision** | `§2.3` item 5, `§2.5` item 2, `§0` ruling 6 | `[T]` |
| **M-5** | **THE MERGED READ AND ITS `parts` SURVIVE** | no node holds `p`; a `file`-flagged node holds `p.child` and a `temp`-flagged node holds `p.child` | `resolve('p')` ⇒ `{found:true, value:<the composite>, tier:null, cache:null, name:'p', merged:true, parts:[{tier:'file',path:'p.child'},{tier:'temp',path:'p.child'}]}` — **ordered by overlay order, every `path` a HELD path, no entry equal to `'p'`** | `§2.5` item 4, `§0` ruling 6, `R-6` | `[T]` |
| **M-6** | **THE UNIQUENESS CONSTRAINT: a repeat at ONE `(path, tier)` pair is an EDIT or a LOUD FAILURE, per call params** | two `commit` calls for the SAME `(logical path, tier)` pair, once with `{onRepeat:'edit'}` and once with `{onRepeat:'refuse'}` *(⟶ READ 2026-10-03 under the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`: `{onRepeat}` HERE IS THE WRITE-SURFACE PARAMETER — `GraphWriteOptions` — and the uniqueness is a GRAPH INVARIANT enforced by the store's own write machinery, NOT a constraint row; `§2.7` item 4 is RE-DERIVED to that read; this row's drive and its two declared outcomes are UNCHANGED)* | **the first rewrites the existing node in place of minting a second, and exactly ONE node exists for the pair; the second is REFUSED `'duplicate-path-tier'` with `cleared: []`, `events: 0`, and the store BYTE-IDENTICAL to its pre-call state** | `§2.7` item 4, `§2.3` item 5, `§5.5.1 P-GR-IM-3` | `[T]` |
| **M-7** | **The committed reference's own subscriber gets EXACTLY ONE `cause:'commit'`; each cleared lower reference fires its OWN `cause:'clear'`** | `file.p`, `mem.p` and `temp.p` resident; subscribers on all three; `commit('file.p', v)` | the `file` subscriber receives **exactly one** event, `cause:'commit'`, carrying the audit list; **the `mem` and `temp` subscribers each receive exactly one event, `cause:'clear'`, ON THEIR OWN PATHS**; `events` reads `3` | `§2.8` item 2, `§2.10` items 2/5, `R-2` | `[T]` |
| **M-8** | **A segment that is a hostile string is DATA and resolves like any other name** | a register row and a node whose anchor key and local name are `'__proto__'`, `'constructor'` and `'toString'` | **every one parses, walks and resolves by the ordinary rules; a `resolve` of each answers its declared shape; a `set` through each COMMITS** — and **the store's name-keyed dictionaries answer the SAME entries a linear scan of the graph would** | `§2.2` `P-3`, `§2.3` item 3, `I-2`, `§5.5.1 P-GR-TP-2` | `[T]` |
| **M-9** | **`commit` MINTS the flag; `set` never mints and never changes one** | a path with no node; then `set` on it; then `commit` on it | the `set` is **REFUSED `'undeclared-name'`** and the graph is unchanged; the `commit` **MINTS one node with `flag` equal to the requested tier** and registers the row; a subsequent `set` on the same pair **writes the value and leaves the flag unchanged** | `§0A` note 4, `§2.8` items 1/3, `§5.5.1 P-GR-IM-11` | `[T]` |
| **M-10** | **ANCHORS ARE IMMUTABLE: a re-parent DELETES and MINTS, and no operation mutates an anchor** | a node with an anchor `tabs`; a `commit` that re-tiers its subtree; the anchor objects are read before and after | **the post-regeneration node is a NEW node with a NEW `ref` and NEW anchor objects; the pre-regeneration anchor object is UNTOUCHED and unreachable; NO operation on the surface assigns an anchor's `key` or `link`** | `§2.2` `P-2`, `§2.6` item 5, `I-2` | `[T]` |
| **M-11** | **THE REGENERATION TRANSACTION: build → compare census → delete ONLY on a match** | a `temp`-flagged subtree of `N` nodes; `commit('file.p', v)` on its root | **the regenerated set is the node and EVERY descendant, each re-tiered; the census matches; the original is deleted as the LAST step; `rows[]` carries `N` entries; `crossings === 1`; each affected reference fired its own event** | `§2.8` items 5/6/7, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **M-12** | **The census' declared instruments, stated separately and never interchanged** | the fixture above; `collectionSizeAt(tier, subtree)` and the resident set's segment total are both read | **the census COMPARISON uses the tier's own row count; the corroborating segment total is asserted BESIDE it; a row whose comparison and assertion use different instruments FAILS** | `§2.8` item 5, `§7a.1` item 11 | `[T]` |
| **M-13** | **A repair lands in the SAME committed write, and emits its OWN event** | a declared `count-exactly-one` constraint over a matched set *(⟶ READ 2026-10-03 under the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`: the *"declared `count-exactly-one` constraint"* is the SUPERSEDED data-row reading; the OPERATIVE drive supplies the CALLER-SUPPLIED `count-exactly-one` CONSTRAINT FUNCTION and its REPAIR FUNCTION — the worked example of `§2.7` item 5 — and this row's repair-observable assertions (same committed write, own `cause:'repair'` event, `repaired[]` naming the repaired reference, no violating window) are UNCHANGED (`§2.7` items 2/3, RE-DERIVED BESIDE))*; a violating write; subscribers on both the caller's reference and the repaired reference | **ONE operation**: the receipt carries the caller's write AND the repair, `repaired[]` names the repaired reference, the repaired reference receives **one event with `cause:'repair'` carrying the repaired value**, and **there is NO window in which the post-state violates the constraint** | `§2.7` item 3, `§2.8` item 2, `R-7` | `[T]` |
| **M-14** | **A severance DELETES the `file`-flagged node and TRANSLATES the graph for the crossing** | a `file`-flagged node reachable only through one link; `sever(from, 'tabs')` | **the node is DELETED (not orphaned, not tombstoned); the cross-boundary write carries a STABLE-JSON TRANSLATION of the graph, not a per-reference list; the severed node and its descendants are ABSENT from the translation** | `§2.8` item 8, `§2.9`, `§0` ruling 10, `R-4` | `[T]` |
| **M-15** | **The export is a SNAPSHOT — fresh per call, NON-AUTHORITATIVE, and LOCALLY usable** | two `export` calls on one state; the caller mutates the first | **the two exports are structurally identical under the canonical comparator but are DIFFERENT objects; mutating one changes NOTHING in the store or in the other; a subsequent `resolve` answers the same as before** | `§2.9` items 1/2, `§0A` note 7 | `[T]` |
| **M-16** | **No second authority: the store derives, defaults and re-keys nothing it was given** | a caller's own spelling with mixed case and a leading underscore; a caller's own order list | **the register row reads the spelling VERBATIM; the repair consults the caller's order VERBATIM; the answer's `name` is the caller's own spelling; no normalization, no re-key, no derived default** | `§2.2` `P-7`, `§2.7` item 5, `I-1` | `[T]` |
| **M-17** | **The two modules ship NO consumer vocabulary in their own bytes** | the modules' raw bytes, scanned for the mirror-class literals and the consumer nouns as STORE vocabulary | **zero hits**, with the POSITIVE control that a fixture byte string carrying one **FAILS** the same scan | `§2.2` `P-1`, `R-1`, `§5.5.1 P-GR-TP-5` | `[T]` |

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, THE ARCHITECT'S FIRST AMENDMENT `A1`; `RCA-8(d)` ANNOTATE-BESIDE — every row of the table above stands byte-for-byte). THE THREE ROWS THIS AMENDMENT MOVES, ITSELF-NAMED, WITH WHAT MOVES AND WHAT DOES NOT:** **`M-11` — its REQUIRED BEHAVIOUR reads *"build → compare census → delete ONLY on a match"*, and the OPERATIVE reading is the FIVE-STEP ORDER with the serialization and validation gates before acceptance (`§2.8` item `5`'s annotation): the regenerated set is SERIALIZED and the serialized form VALIDATED before the original is deleted.** **Its other assertions are UNMOVED: the regenerated set is the node and EVERY descendant each re-tiered, the census matches, the original is deleted as the LAST step, `rows[]` carries `N` entries, `crossings === 1`, and each affected reference fires its own event.** **`M-12` — UNMOVED: the census' declared instruments, the comparison's instrument and the corroborating reading asserted BESIDE it all stand (`§2.8` item `5`); the amendment adds steps AROUND the comparison and changes neither its instrument nor its subject.** **`M-10` — UNMOVED: the regeneration still mints NEW nodes with NEW anchors, and no anchor is mutated in place.** **NO ROW IS ADDED TO `§3.1`, and no M-row's trigger, layer or Pinned-by cell changes.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — every row of the table above stands byte-for-byte, `M-5`'s cell included, and `M-5` KEEPS ITS ID, ITS LAYER (`[T]`) AND ITS PLACE IN THE AUTHORING ORDER (`§4.2` item `4`)). THE ONE ROW THIS RULING RE-DERIVES IS `M-5`, AND ONLY ITS SUBJECT, ITS TRIGGER AND ITS REQUIRED BEHAVIOUR MOVE.**
**`M-5`'s AS-FILED CELL — SUBJECT *"THE MERGED READ AND ITS `parts` SURVIVE"*, TRIGGER *"no node holds `p`; a `file`-flagged node holds `p.child` and a `temp`-flagged node holds `p.child`"*, EXPECTATION the `merged:true` / `tier:null` / `cache:null` composite with an overlay-ordered `parts` list, PINNED BY *"`§2.5` item `4`, `§0` ruling `6`, `R-6`"* — IS WITHDRAWN BESIDE THOSE WORDS (`§2.5` item `4`'s own annotation prints the ruling's verbatim ground), AND ITS RE-DERIVED FORM IS PRINTED HERE:**
**`M-5` RE-DERIVED — SUBJECT: THE READ'S SURVIVING CASE SET (HIT · QUALIFIED · MISS), DRIVEN AT THE ONE STATE IN WHICH A PATH IS UNHELD WHILE ITS DESCENDANTS ARE RESIDENT — A DECLARED-BUT-UNWRITTEN PARENT WITH A WRITTEN CHILD.** **TRIGGER: `commit('file.entity.id.child', v)` (so the parent reference `entity.id` and the child reference `entity.id.child` both exist and the child holds a value); then the TIER-LOCAL clear of the parent's reference (`clear('file.entity.id')`, `§2.8` item `4`), which drops the parent's value and touches NO descendant.** **REQUIRED BEHAVIOUR, IN THREE CASES AND ONE READING — (i) HIT: `resolve('file.entity.id.child')` answers `found:true` with the CHILD's own value and the CHILD's OWN flag (`'file'`), and its `cache` is `store.tiers.file` BY IDENTITY (`toBe`); (ii) QUALIFIED: the same path under a DISAGREEING token (`resolve('temp.entity.id.child')`) answers the RETURNED RECORD `'tier-filter-miss'` at `H-FLAG`, naming the node's own flag AND the flag asked for, and NEVER `'no-such-anchor'` and never the child's value (`§2.3` items `6`(iv)/`7`, `R-6`); (iii) MISS: `resolve('file.entity.id')` — the parent reference, whose value is unwritten while its child is resident — answers the DECLARED MISS `{found:false, value:undefined, tier:null, cache:null, name:'file.entity.id'}`, NEVER a composite and NEVER a refusal (`§2.1`'s `GraphReadMiss`; `§2.3` item `6`(iii)); and (iv) THE NODE-LOCAL TIER READING, WITH ITS POSITIVE CONTROL: the flag the hit's answer carries is the flag read off the NODE the walk reached (`nodeFor(<the child's own ref>)['flag']`, read through the test-only seam), and NOT a tier label RESTATED BY THE STORE FROM THE CALLER'S TOKEN — the positive control being the SAME store and the SAME node driven under the disagreeing token, whose answer names the NODE's own flag and not the token.** **PINNED BY `§2.5` item `4`, `§2.3` items `1`/`6`(iii)/`6`(iv)/`7`, `§2.6` item `6` (the re-derived comparator), `R-6`, `§0`(A3).** **`M-5`'s LAYER IS `[T]` AND ITS TERM IS NONE (it is a `§3.1` row, not a register row); NO ROW IS ADDED TO `§3.1` AND NO OTHER M-ROW IS TOUCHED.**

### 3.2 Documented fail-states / non-happy states

**NOTE the shape: every outcome in this block is a RETURNED RECORD, not an error** — **the only throw classes in the whole
unit are the factory's LOAD REFUSAL and the two test-seam throws** (`§2.2` `P-5`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **ARM (i): no registered top-level name** | `resolve('file.nosuch.x')` | a refusal record **WITH its diagnostic**: `reason:'undeclared-name'`, `step:'C-TOP'`, `segment:'nosuch'`, `owner:null` — **and never a throw** | `§2.3` item 6 (i), `§2.4` item 7(a), `R-4` | `[T]` |
| **F-2** | **The cold item is a MISS while the unregistered name is a REFUSAL — the two stay distinguishable** | (a) a declared row whose path holds no node; (b) a path no register row carries | (a) **the DECLARED MISS** `{found:false, value:undefined, tier:null, cache:null, name}`; (b) **`{status:'refused', reason:'undeclared-name'}`** — **the held `F-9` control preserved at top level, and a body in which they collapse FAILS** | `§2.4` item 4, `§2.8` item 1, `§0` ruling 4 | `[T]` |
| **F-3** | **ARM (ii): no such anchor key** | `resolve('file.window.nosuchanchor.x')` on a node carrying no such anchor | **`reason:'no-such-anchor'`, `step:'D-ANCHOR'`, `segment:'nosuchanchor'`, `owner:<the node's ref>`** — **never `'undeclared-name'`** (the name IS declared; its chain is absent, and using the other token would be a MISREPORT of a closed union) | `§2.3` item 6 (ii), `§2.2` `P-3`, `R-4` | `[T]` |
| **F-4** | **ARM (iv): the filter miss on a resolvable leaf** | a node whose `localName` is `landingPage` and whose flag is `temp`; `resolve('file.window.tabs.landingPage')` | **`reason:'tier-filter-miss'`, `step:'H-FLAG'`, with the node's OWN flag and the flag the filter asked for both named** — **and the positive control is the SAME name with the agreeing token `temp`, which ANSWERS** | `§2.3` item 6 (iv)/item 7, `§2.5` item 2, `R-6` | `[T]` |
| **F-5** | **ARM (v): a severed link on the READ side** | `resolve` through a link whose target has been severed and reclaimed | **`reason:'severed-link'`, `step:'E-LINK'`, naming the link and the reclaimed target** — never a throw, never a silent fall-through to another tier | `§2.3` item 6 (v), `§2.5` item 6, `R-4` | `[T]` |
| **F-6** | **ARM (vi): a stale entry whose rebuild itself fails** | a stale cache entry whose rebuild cannot answer; `resolve` on that name | **`reason:'rebuild-failed'`, `step:'F-CACHE'`, naming the stale entry's link and the reason the rebuild could not answer** — **and the STALE-CACHE arm WITHOUT a rebuild failure is NOT a refusal at all: it is a declared NORMAL path** | `§2.3` item 6 (vi), `§2.6` item 4, `R-5` | `[T]` |
| **F-7** | **ARM (vii): a WRITE to an ORPHANED reference fails LOUDLY** | `set`/`commit`/`remove` on a path whose walk reaches a severed link | **`{status:'refused', reason:'severed-link', cleared: [], events: 0}` as a RETURNED RECORD** — **no pin set exists, and no silent no-op is admissible** | `§2.3` item 6 (vii), `§0` ruling 11, `I-6` | `[T]` |
| **F-8** | **The first-hit arm WINS over the merged arm where a node holds the read path** | a `file`-flagged node at `p`; a `temp`-flagged node at `p.child`; `resolve('p')` | **`{found:true, flag:'file', cache:<file's handle>, name:'p'}` with `parts` ABSENT and `merged` ABSENT** — **no merge runs**; a body answering `merged:true` FAILS | `§2.5` item 4, `§3.1` `M-5`'s mirror, `R-6` | `[T]` |
| **F-9** | **A CENSUS MISMATCH is a declared failure that leaves the ORIGINAL ALIVE** | a regeneration whose regenerated set's census does not match the original's | **`{status:'refused', reason:'rebuild-failed'}`, `crossings: 0`, `events: 0`, and the ORIGINAL STILL RESOLVES** — **nothing deleted, no partial state** | `§2.8` item 6, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **F-10** | **A `remove` one descendant DURING the regeneration window: ONE crossing, one row per reference, EITHER outcome** | `set('temp.P', v)`; `commit('file.P', v)`; then `remove` of one descendant during the window | **the receipt shows ONE crossing and one row per affected reference, and EITHER a completed regeneration OR the declared failure that left the original alive** — **a partial state, or a deletion on a mismatch, FAILS** | `§2.8` items 5/7, `§0` ruling 9, `§5.5.1 P-GR-SM-1` | `[T]` |
| **F-11** | **A severance RELEASES its subscribers and REPORTS the release** | a subscription on a `temp` reference; the parent chain severed | **exactly ONE declared `cause:'severed'` event naming the released reference; the subscription count for it goes to `0`; the severing receipt's `cleared[]` names it** — **an unanswered delivery, a silent disappearance, or MORE than one event for one reference FAILS** | `§2.10` item 3, `R-2`, `§5.5.1 P-GR-TP-6` | `[T]` |
| **F-12** | **A refused write clears NOTHING and emits NOTHING, on EVERY mutator** | a cap overflow; a malformed name; an undeclared name; a reserved name; a `secure.*` name — each driven with lower-tier copies resident | **every refusal carries `cleared: []`, `rows: []`, `crossings: 0`, `events: 0`, and every resident lower-tier copy STILL RESOLVES** | `§2.8` items 2/4, `R-3`, `§0` ruling 9 | `[T]` |
| **F-13** | **A cap's overflow REFUSES, and NEVER evicts, clears or emits** | each of `RCAP-1`/`RCAP-2`/`RCAP-3` driven to its value and one past it, with lower-tier copies resident | **at the cap: `{status:'refused', reason:'cap-exceeded', cleared: [], rows: [], crossings: 0, events: 0}`, the register BYTE-IDENTICAL to its pre-call state; ONE BELOW the cap: `{status:'committed'}` — the positive control** — **an eviction, a FIFO/LRU drop, a lower-tier clear or any event on this path FAILS** | `§2.4` item 6, `§0A` note 6, `§5.5.1 P-GR-TP-3` | `[T]` |
| **F-14** | **`secure.*` is refused BEFORE the register is consulted and BEFORE any traversal** | `resolve('secure.<k>')`, `resolve('secure.undeclared')`, `subscribe`/`remove`/`clear`/`set`/`commit` on a `secure.*` name — **each on a name that is NOT declared** | **every one answers `{status:'refused', reason:'secure-refused'}`** — **NEVER `'undeclared-name'`**, and **never a `'tier-filter-miss'`**; **the positive control is that the SAME names without the `secure` segment answer `'undeclared-name'`** | `§2.4` item 5, `§2.5` item 2, `§0` ruling 12 | `[T]` |
| **F-15** | **A `secure`-flagged node never appears in the register or the traversal** | a graph whose register is read exhaustively; every traversal step's reached set is read | **no register row's `nodeRef` resolves to a `secure`-flagged node, and no walk step reaches one** — the separate collection is unreachable from the generic surface **BY CONSTRUCTION**, not by a per-walk check | `§2.4` item 5, `§2.11` item 2, `I-7` | `[T]` |
| **F-16** | **A malformed name is refused, and the four legal tokens are the positive control** | `''`, a non-string, `'file..x'`, `'file.'`, `'File.x'`, `'disk.x'`, `'.x'`, `'file'` | **all refused `reason:'malformed-name'`, never a throw**; **each of the four legal tier tokens on a declared name COMMITS** | `§2.3` items 1/3, `R-4`, `§5.5.1 P-GR-TP-1` | `[T]` |
| **F-17** | **A tier-free write is refused** | `set('p', v)`, `commit('p', v)`, `remove('p')` | **all three refused `'malformed-name'`** — the store may not choose the tier — **while a `resolve` on the same spelling is LEGAL, because the read has a filter order and the write has none** | `§2.8` item 4, `R-4` | `[T]` |
| **F-18** | **The register's own construction-time refusals, each with its named positive control** | the six arms of `§2.4` item 5, each beside its control | **each arm REFUSES AT CONSTRUCTION with its own token (a `GraphLoadError`), and each control LOADS** — **and the store a refused input would have built DOES NOT EXIST** | `§2.4` item 5, `R-4`, `§5.5.1 P-GR-IM-6` | `[T]` |
| **F-19** | **A MALFORMED OR AMBIGUOUS DECLARED PATTERN DOES NOT LOAD — the SURVIVING malformed-declaration refusal** *(**RE-AIMED 2026-10-01** by the architect's ruling on the interaction precondition; **THE AS-FILED CELLS ARE KEPT VISIBLE IN THESE WORDS — SUBJECT: *"A second constraint with no interaction rule does not load"*; TRIGGER: *"a declared-row input carrying two distinct constraint ids where neither declares an interaction rule"*; EXPECTATION: *"the input does NOT load (`reason:'malformed-pattern'`); the positive control is that the one-row table LOADS"*; PINNED BY: *"`§2.7` item 6, `R-7`"*** — the precondition is WITHDRAWN, its exception being UNEXPRESSIBLE BY CONSTRUCTION because `§2.7` item 1's declaration shape carries no interaction-rule member, and its operative text is printed at `§2.7` item 6's annotation)* | a declared input carrying a **malformed or ambiguous TOP-LEVEL pattern** (`§2.4` item 5(f)) — the construction-time `'malformed-pattern'` arm that SURVIVES the withdrawal | **the input does NOT load** (`reason:'malformed-pattern'`, the factory's `GraphLoadError`); **the positive control is that a well-formed interior-wildcard TOP-LEVEL pattern LOADS** (`§2.4` item 5's own named control) — **AND THE AS-FILED SUBJECT'S OWN INPUT, this contract's two-constraint register fixture (`unique-path-tier` + `count-exactly-one`), LOADS AND ENFORCES INDEPENDENTLY, so the as-filed expectation is REFUTED BESIDE rather than merely withdrawn** (`§2.7` item 6's annotation; `§5.5.1`'s fixture annotation) *(⟶ READ 2026-10-03 under the ACTIVE row `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`: the *"two-constraint register fixture (`unique-path-tier` + `count-exactly-one`)"* is read as the SUPERSEDED DATA-ROW form — the OPERATIVE register fixture supplies the caller-supplied constraint FUNCTIONS, the `unique-path-tier` pair-rule being NOT a constraint at all (a graph invariant, `§2.7` item 4) and `count-exactly-one` the worked example (`§2.7` item 5); the construction-time `'malformed-pattern'` arm this row drives is UNCHANGED)* | `§2.4` item 5(f), `§2.4` item 7(g), `§5.5.1 P-GR-IM-6` | `[T]` |
| **F-20** | **A `remove` on a `reserved:true` top-level row's own name is refused BY NAME** | `remove(<the reserved name>)` and `remove(<a sibling's own name>)` | **the reserved one is `{status:'refused', reason:'reserved-name'}` and the sibling `{status:'committed'}`** — **the refusal is BY NAME, never by value, so the positive control is exact** | `§2.4` items 1(d)/7(f), `R-3` | `[T]` |
| **F-21** | **The constraint is evaluated on `set`/`commit`/`remove` and NOT on `clear`/`sweep`** | a declared constraint; a violating write; then a `clear` and a `sweep` that leave the same violation | the write is **repaired in the SAME committed write** and carries `repaired:[…]`; **the `clear` and `sweep` receipts carry `repaired: []`** | `§2.7` item 2, `R-7` | `[T]` |
| **F-22** | **The export may not cross and may not be treated as authoritative** | `export(name)` then an attempt to serialize it across a boundary, or to write it back | **the export carries NO live `cache` handle beyond the caller's frame and NO row claims it crossed an IPC boundary; writing an export back is not a granted operation** | `§2.9` items 2/3, `R-8` | `[T]` |
| **F-23** | **A graph is UNCONSTRUCTIBLE with a second parent link, and a cyclicity claim has a drivable positive control** | a drive that attempts to give one node a second parent link; a drive that attempts a cycle | **no operation produces a node with more than one parent link, so no cycle exists; the POSITIVE CONTROL is a probe over the store's own link set showing that a second parent link is REFUSED — and a control that cannot express its failing case is VACUOUS and FAILS** | `§2.2` `P-2`, `§2.3` item 4, `I-2`, `§5.5.1 P-GR-IM-2` | `[T]` |
| **F-24** | **The totality universal: NOTHING throws on a declared-domain input** | every API member driven with `undefined`, `null`, `42`, `'x'`, a `Symbol`, a `BigInt`, a `Proxy` whose traps throw, a record with throwing accessors, an array, a function, and (for the listener slot) a non-callable | **every member answers its declared shape and nothing throws** — **the ONLY throws are the factory's LOAD REFUSAL and the two test-seam throws, and each of those three is asserted separately in the same row** | `§2.2` `P-5`, `R-3`, `§5.5.1 P-GR-TP-1` | `[T]` |
| **F-25** | **`R-9`'s positive control is RE-POINTED so that it is NOT VACUOUS** | the control drives a name whose whole segment is a string the store does not own, AND the same drive against a **store A that has been driven with no register row and no node** | **the control REDDENS on a global engine-id-keyed map and PASSES on this store — and it FAILS as vacuous if it cannot distinguish them, so the vacuity test is: a store that has never minted a row must still answer the drive DISTINGUISHABLY from the one that has.** **A control that passes on both FAILS** | `§2.2` `P-8`, `§3.4` `R-9`, `§0` ruling 13, `§6` item 3 | `[T]` |

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, THE ARCHITECT'S FIRST AMENDMENT `A1`; `RCA-8(d)` ANNOTATE-BESIDE — every row of the table above stands byte-for-byte). THE THREE ROWS THIS AMENDMENT TOUCHES, ITSELF-NAMED:** **`F-9` — its as-filed trigger is *"a regeneration whose regenerated set's census does not match the original's"* and its as-filed token `'rebuild-failed'` is CORRECT and now names ONE OF THREE ARMS: the row's OPERATIVE form drives the three arms of `§2.8` item `6`'s table and reads each arm's OWN token (`'rebuild-failed'` · `'serialize-failed'` · `'validate-failed'`), with the ORIGINAL STILL RESOLVING and `crossings: 0`, `events: 0` in ALL THREE.** **`F-10` — UNMOVED: the concurrent-`remove` drive's EITHER-outcome shape and its one-crossing/one-row-per-reference assertions stand; the added steps change which terminals are reachable not at all, and the declared failure still leaves the original alive.** **`F-12` — UNMOVED AND STRENGTHENED BY ADDITION: its *"on EVERY mutator"* posture now includes `§2.8` item `6`'s `(b)`/`(c)` arms and `§2.4` item `7`'s arm `(h)`, each carrying `cleared: []`, `rows: []`, `crossings: 0`, `events: 0` and leaving every resident lower-tier copy resolving.** **NO ROW IS ADDED TO `§3.2`, and no F-row's trigger, layer or Pinned-by cell changes.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — every row of the table above stands byte-for-byte, `F-8`'s cell included, and `F-8` KEEPS ITS ID, ITS LAYER (`[T]`) AND ITS PLACE IN THE AUTHORING ORDER (`§4.2` item `4`)). THE ONE ROW THIS RULING RE-DERIVES IS `F-8`, AND IT IS RE-DERIVED ONTO A PLAIN PROPERTY OF THE HIT ARM RATHER THAN ONTO A BOUNDARY BETWEEN TWO ARMS.**
**`F-8`'s AS-FILED CELL — SUBJECT *"The first-hit arm WINS over the merged arm where a node holds the read path"*, TRIGGER *"a `file`-flagged node at `p`; a `temp`-flagged node at `p.child`; `resolve('p')`"*, EXPECTATION *"`{found:true, flag:'file', cache:<file's handle>, name:'p'}` with `parts` ABSENT and `merged` ABSENT — no merge runs; a body answering `merged:true` FAILS"*, PINNED BY *"`§2.5` item `4`, `§3.1` `M-5`'s mirror, `R-6`"* — IS READ BESIDE ITS OWN WORDS AS FOLLOWS.**
**`F-8` RE-DERIVED — SUBJECT: WHERE A NODE HOLDS THE READ PATH, THE HIT ARM ANSWERS FROM THAT NODE ALONE: its value, its OWN flag and its own handle, with NO composition, NO provenance list and NO second holder consulted.** **TRIGGER: a `file`-flagged node holding `p` with a resident written descendant (`commit('file.entity.id')`, then `commit('temp.entity.id.child', 't')`), and the SAME logical path driven at ANOTHER tier's token.** **REQUIRED BEHAVIOUR: `resolve('file.entity.id')` answers `{found:true, flag:'file', tier:'file', cache:<`store.tiers.file`, BY IDENTITY>, name:'file.entity.id'}` — a HIT with a non-null tier and the node's own flag; and `resolve('mem.entity.id')` on the same state answers the QUALIFIED case — the RETURNED RECORD `'tier-filter-miss'` at `H-FLAG` naming the node's own flag AND the flag asked for — and NEVER the file node's own value under a `mem` request (the DURABILITY-LIE class `R-6` closes), and NEVER a composite.** **A body that composes a value at a path a node holds, or that answers a second holder's value under a token the resolved node's own flag disagrees with, FAILS.** **PINNED BY `§2.5` items `2`/`4`, `§2.3` items `6`(iv)/`7`, `R-6`, `§0`(A3).** **AND THE TWO AS-FILED CITATIONS ARE RECONCILED RATHER THAN PROPAGATED: this row's own `§3.1` `M-5`-mirror pointer now names `M-5`'s RE-DERIVED SUBJECT (the miss at an unwritten parent), and the `F-6` citation `§2.5` item `4`'s as-filed sentence and `§0` ruling `6`'s cell carry for this boundary is recorded there as a mis-citation for `F-8` — THIS ROW — and is not propagated here.** **NO ROW IS ADDED TO `§3.2` AND NO OTHER F-ROW IS TOUCHED.**

**⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S RULING ON THE INTERACTION PRECONDITION; `RCA-8(d)` ANNOTATE-BESIDE — every OTHER row of the table above stands byte-for-byte; the ONE row this ruling re-aims is `F-19`, and its as-filed subject is KEPT VISIBLE in its own cell).** **`F-19` KEEPS ITS ID, ITS LAYER (`[T]`) AND ITS PLACE IN THE RED SET'S AUTHORING ORDER (`§4.2` item `5`); ITS SUBJECT, ITS DRIVE, ITS EXPECTATION AND ITS PINNED-BY CELL ARE RESTATED BESIDE, and the restatement is grounded at the surviving site rather than inferred: the as-filed subject's precondition is WITHDRAWN (`§2.7` item 6's annotation: its exception was unexpressible by construction, the declaration shape at `§2.7` item 1 carrying no interaction-rule member), and the clause that ACTUALLY SURVIVES with the same token (`'malformed-pattern'`) is the construction-time arm `§2.4` item 5(f) — *"a malformed or ambiguous pattern"* in the input — carried at `§2.4` item 7(g).** **THE SURVIVING SUBJECT IS THEREFORE A MALFORMED OR AMBIGUOUS TOP-LEVEL PATTERN, WITH THE CONTROL `§2.4` ITEM 5 ALREADY NAMES (*"a well-formed interior-wildcard pattern LOADS"*); the register row that drives that same arm is `§5.5.1` `P-GR-IM-6` (its term `12` = `6` arms × `2` halves, arm `(f)`), so the re-aimed row and the register agree term for term and no register term moves.** **AND THE AS-FILED SUBJECT'S OWN INPUT IS PRINTED AS REFUTED RATHER THAN DELETED: the fixture's two constraint rows (`unique-path-tier` + `count-exactly-one`) are LEGAL TO DECLARE TOGETHER and EACH IS ENFORCED INDEPENDENTLY (`§5.5.1`'s fixture annotation; `§2.7` item 6's annotation), so the as-filed expectation *"the input does NOT load"* would be FALSE of this contract's own register fixture — which is why the withdrawal is recorded as a CORRECTION of a clause and not as a relaxation of a refusal.** **ONE MIS-CITATION IN THE AS-FILED CELL IS RECORDED RATHER THAN PROPAGATED: `F-19`'s as-filed Pinned-by cell cites `R-7`, and `§3.4`'s `R-7` is the NO-ELEMENT / NO-GEOMETRY scan (cited by `P-6`, `P-9`, `P-10`), which touches no clause of `§2.7` item 6 — the re-aimed row is pinned by the three citations printed in its own cell (`§2.4` item 5(f), `§2.4` item 7(g), `§5.5.1 P-GR-IM-6`), and the as-filed `R-7` citation is left visible in the sentence above rather than re-carried.** **NO OTHER F-ROW IS TOUCHED BY THIS RULING, and `§3.2`'s row count is UNMOVED.**

### 3.3 Invariants that hold in every state

| id | Invariant |
| --- | --- |
| **I-1** | **The graph is the SOURCE OF TRUTH for value residency; the tier collections and the per-tier indexes are VIEWS and INDEXES over it.** The store derives, defaults and re-keys nothing it was given (`§0` ruling 1, `§2.2` `P-7`). |
| **I-2** | **THE GRAPH IS A TREE BY CONSTRUCTION: every node has EXACTLY ONE parent link, and no operation creates a second.** Re-parenting deletes and re-mints anchors, so **a cycle is unconstructible** — no visited set and no depth bound is owed (`§2.3` item 4, `§2.2` `P-2`). |
| **I-3** | **TIERS COMPOSE: at most ONE node holds a given `(logical path, tier)` pair**, and two holders may coexist for one logical path ACROSS tiers. The merged read and `parts` survive (`§2.3` item 5, `§2.7` item 4). |
| **I-4** | **A NODE STORES ITS OWN LOCAL NAME, never a stored dotted path**, and the tier token is a FILTER rather than a part of any name (`§2.3` items 1/2). |
| **I-5** | **ANCHORS ARE IMMUTABLE, and no node's flag is rewritten in place** — the only operation that re-tiers is the regeneration transaction, which mints new nodes (`§2.2` `P-2`). |
| **I-6** | **A WRITE TO AN ORPHANED REFERENCE FAILS LOUDLY, as a returned record.** No pin set exists and none is owed (`§0` ruling 11). |
| **I-7** | **`secure` is refused BY NAME, BEFORE the register is consulted and BEFORE any traversal**, so a `secure`-flagged node is unreachable from the generic surface by construction (`§2.4` item 5). |
| **I-8** | **No member throws on any declared-domain argument**; the three named throws are the whole exception set (`§2.2` `P-5`). |
| **I-9** | **The store ships NO vocabulary**: no consumer noun as store vocabulary, no `is-*` literal, no unit string, no invented default, no policy predicate (`§2.2` `P-1`). |
| **I-10** | **No element, coordinate, geometry, magnitude or clock read anywhere in the surface or the bytes** (`§2.2` `P-9`/`P-10`). |
| **I-11** | **No new MCP surface, no new seam, and no change to any frozen contract** (`§2.2` `P-4`). |
| **I-12** | **No path segment is looked up against any id registry, and the store's handle is never a lookup key.** The store keeps no global string-to-entry map (`§2.2` `P-8`). |
| **I-13** | **The import census is EXACT: `store-core-graph.ts` carries one non-type import and nothing else; `store-graph-references.ts` imports nothing; the vendored package is never imported** (`§2.2` `P-11`). |
| **I-14** | **Every graph mutation INVALIDATES the affected cache entries by the two-part rule, in the same synchronous step** (`§2.6` item 3). |
| **I-15** | **The event envelope's five common members are present AS KEYS on every event, `cleared` is never omitted, and `origin` appears on the `descendant` arm ALONE** (`§2.10` items 1/2). |
| **I-16** | **One event per AFFECTED reference**: a commit emits its own AND each cleared lower reference fires its own `cause:'clear'`; a sweep of `N` emits `N`; a severance emits one per RELEASED reference; a refused write emits `0` (`§2.10` items 3/5). |
| **I-17** | **The export is a NON-AUTHORITATIVE SNAPSHOT, LOCAL-ONLY, and never carries a live `cache` beyond its caller's frame** (`§2.9`). |

**⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S SECOND AMENDMENT, `A2`; `RCA-8(d)` ANNOTATE-BESIDE — the table above stands byte-for-byte). THE SECOND NAMED TREE INVARIANT, PLACED BESIDE `I-2`: MONOTONIC PERSISTENCE — for every parent link, `durability(child) ≤ durability(parent)`, under the ordering `file` > `mem` > `temp`, with `secure` a separate main-side collection outside the ordering and carrying no graph node; the rule is VACUOUS AT A ROOT.** **WHAT ENFORCES IT AND WHAT A VIOLATION DOES: the minting operation (`commit` is the only flag-assignment site), the regeneration (the whole subtree re-tiers in one committed write), and the uniqueness constraint (an `'edit'` repeat never changes a flag); a violation attempt is REFUSED with the returned record `reason:'durability-inversion'` and nothing in the store changes (`§2.1`'s named-invariant block prints the full clause, `§2.4` item `7`'s annotation adds the arm as `(h)`).** **ITS FALSIFIER, SO THE INVARIANT IS NOT A SLOGAN: any node whose own flag is MORE durable than the flag of the node its `parentLink` reaches — read by a census over every node the graph has ever minted, exactly as `§3.4` `R-2` reads the parent-link count over the same set — and, at the cache layer, any cache entry whose `matchedTier` is more durable than its matched node's own parent chain (`§2.6` item `3`'s two-part invalidator rule is UNCHANGED by this invariant).** **NO `I-` ROW IS ADDED BY THIS PASS AND NO ID IS RENUMBERED: the `§3.3` family is cited as `I-1`…`I-17` at `§4.1`, and this pass does not move that citation — the invariant's EXECUTED form is the register row `§5.5.1` `P-GR-IM-14` (`S-GR-PERSIST-1`, driven as the state-machine/totality pair over the four tokens), which is the row a red set drives, and this annotation is its readable statement beside `I-2`.** **`I-2` itself is UNMOVED, and no invariant above is weakened, tightened or restated by this addition.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the table above stands byte-for-byte, `I-3`'s cell included). ONE INVARIANT'S SECOND SENTENCE IS RE-DERIVED: `I-3`'s *"The merged read and `parts` survive"* becomes *"the read answers from the ONE node that holds the address, and each node's tier is read from the node itself"* (`§2.5` item `4`; `§0`(A3)).** **`I-3`'s FIRST SENTENCE IS UNMOVED AND IS THE INVARIANT'S LOAD-BEARING HALF: at most ONE node holds a given `(logical path, tier)` pair, and two holders may coexist for one logical path ACROSS tiers.** **NO `I-` ROW IS ADDED, RENUMBERED OR WEAKENED: the `§3.3` family is still cited as `I-1`…`I-17` at `§4.1`.**

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-3`; `RCA-8(d)` ANNOTATE-BESIDE — the heading above and every row below stand byte-for-byte). TWO SECTIONS OF THIS FILE USE THE SAME ROW IDS `R-9`…`R-12` FOR DIFFERENT SUBJECTS, AND THE CITATION FORM THAT RESOLVES A BARE `R-9` IS FIXED HERE.**

**(1) THE TWO RANGES.** **`§3.4` carries the STATIC rows `R-1`…`R-12` — the scans and set-equality claims that `§2.2`'s prohibition table cites.** **`§3.5` carries the EXISTENCE rows — `R-9` (this unit renders no page) · `R-10` (the repo-state claims: `docs/skills/designing-pages.md` does not exist · the construction count is `1` · the seam is absent in a production-shaped construction) · `R-11` (both module paths are NEW) · `R-12` (the held contract is byte-identical) · `R-13` (the `[H]` half grows by exactly one row).** **So `R-9`…`R-12` name FOUR different things in each section, and `R-13` exists at `§3.5` ALONE.**

**(2) THE CITATION FORM, operative from this pass on.** **A BARE `R-n` citation means the `§3.4` STATIC row — `§2.2`'s own closing sentence already reads *"The static rows `§2.2` cites are ENUMERATED, not asserted (`§3.4` `R-1`…`R-12`)"*, and the prohibition table's Pinned-by cells are the sites that sentence governs.** **AN EXISTENCE ROW IS ALWAYS CITED WITH ITS SECTION, `§3.5 R-n`.** **`R-13` is cited `§3.5 R-13` wherever it appears, because no `§3.4` `R-13` exists.** **No row is renumbered and no subject is renamed: the disambiguation is BY SECTION, never by changing an id** — the two families keep their subjects and their bytes.

**(3) EVERY BARE `R-9`…`R-12` CITATION IN THIS FILE, CHECKED IN THIS PASS AND DISPOSITIONED WITH ITS INTENDED SECTION (the check is complete over this file's bytes), EACH ALSO ANNOTATED AT ITS OWN SITE IN THIS SAME PASS SO NO READER HAS TO TRAVEL HERE:** **`§2.2` `P-4`'s Pinned-by cell — `R-10` → intended `§3.4 R-10` (the frozen surfaces by set equality), NOT `§3.5 R-10`** · **`§2.2` `P-11`'s Pinned-by cell — `R-11` → `§3.4 R-11` (the import census)** · **`§2.4` item `2` — *"FAILS `R-9`"* → `§3.4 R-9` (the re-pointed control)** · **`§4.1` — *"FAILS `R-13`'s own branch rule"* → `§3.5 R-13`** · **`§5.5.1` `P-GR-IM-10`'s compensating cell — `R-12` → `§3.4 R-12` (the seam-absent half, part `(c)`)** · **`§5.5.1` `P-GR-IM-12`'s compensating cell — `R-13` → `§3.5 R-13`** · **`§5.5.1` `P-GR-TP-2`'s compensating cell — `R-9` → `§3.4 R-9`** · **`§5.5.1` `P-GR-TP-6`'s compensating cell — `R-11` and `R-12` → `§3.4 R-11` (the census) and `§3.4 R-12` (the module-level-binding half, parts `(a)`/`(b)`).** **THE SITES ALREADY QUALIFIED, LISTED FOR COMPLETENESS SO THE SET IS COUNTABLE AND CLOSED: `§0` ruling `13` (`§3.4 R-9`) · `§3.2` `F-25` (`§3.4` `R-9`) · `§4.1`'s red branch (`§3.5 R-10`(a), `§3.5 R-12`) · `§4.1`'s row census (`§3.4`'s `R-1`…`R-12`, `§3.5`'s existence rows) · `§2.2`'s closing sentence (`§3.4` `R-1`…`R-12`) · `§6.3`'s two held-file rows, which cite `docs/specs/store-core.md` `§3.4` and are NOT this file's ids at all.** **COUNTED WITH ITS TERMS: `8` BARE CITATION SITES AND `9` BARE CITATIONS IN THIS FILE — by id: `R-9` × `2` (at `§2.4` item `2` and `§5.5.1` `P-GR-TP-2`) · `R-10` × `1` (`§2.2` `P-4`) · `R-11` × `2` (`§2.2` `P-11` and `§5.5.1` `P-GR-TP-6`) · `R-12` × `2` (`§5.5.1` `P-GR-IM-10` and `P-GR-TP-6`) · `R-13` × `2` (`§4.1` and `§5.5.1` `P-GR-IM-12`); `2 + 1 + 2 + 2 + 2 = 9` citations over `8` sites — the one site carrying two being `P-GR-TP-6` — and `8` + `1` = `9` ✓.** **EVERY ONE OF THE EIGHT IS ANNOTATED AT ITS OWN SITE IN THIS SAME PASS with its intended section, so a reader of any one of them does not have to travel here, and NO bare citation in this file is left unexplained by this note (`R-13` is the `§3.5`-only id and is read as `§3.5 R-13` in both of its bare sites).**

| id | The static claim | The scan's scope and its positive control | Cited by |
| --- | --- | --- | --- |
| **R-1** | **Over BOTH modules' raw bytes, there is NO consumer vocabulary as store vocabulary and NO mirror-class literal**: no `tab`/`pane`/`zone`/`region`/`gutter` word, no `is-empty`/`is-minimized`/`is-revealed`, no `minimized` literal, no unit string. **Tokens held as FRAGMENTS so the scan cannot read its own rule list.** | **both modules' bytes**, with a **POSITIVE control** (a fixture string carrying one must FAIL) and a **NEGATIVE control** (ordinary wording PASSES). **`store-graph-references.ts` is IN this scan's scope, because it is this unit's own input module** | `P-1` |
| **R-2** | **The tree invariant HOLDS UNDER DRIVE, and each node's parent-link count never exceeds ONE** — including after a re-tier, a deletion, a `remove` and a severance. | a `parentLinkCountOf(nodeRef)` census over **every node the graph has ever minted**, **with a POSITIVE control that a double-parent construction is REFUSED and that the control can EXPRESS its failing case** (a vacuous control FAILS as a finding) | `P-2`, `P-3`, `I-2` |
| **R-3** | **For EVERY mutator, a refusal implies `cleared: []` AND `rows: []` AND `crossings: 0` AND `events: 0` AND every resident copy untouched.** | the six mutators × the refusal classes, **with the positive control that the same call on a legal input clears what it declares** | `P-5`, `P-7`, `F-12` |
| **R-4** | **The walk's precedence is total and ordered — `secure` → malformed → undeclared → the leaf miss → the filter miss → the answer — and every refusal carries a DIAGNOSTIC naming its step.** | the precedence inputs crossed with the two name forms, **each with its own expected reason AND step id**; **a refusal record without a diagnostic FAILS** | `P-5`, `§2.3` item 6, `§2.5` item 2 |
| **R-5** | **A cache entry is never a REGISTER ROW MEMBER, never authoritative, and the read path NEVER mutates one.** | the register row's own key set (the entry's members must be ABSENT from it) **and** a read-driven probe (`cacheEntryFor(name)` before and after a `resolve` on a stale entry — **unchanged**), **with a POSITIVE control that a rebuild performed by a mutator DOES change it** | `P-7`, `§2.6` items 2/4 |
| **R-6** | **The tier token is a FILTER, never a second residency authority: the answer's `tier`/`flag` is the resolved node's OWN flag, and a disagreement is a DIAGNOSTIC rather than a silent pick.** | the disagreement fixture **plus its agreeing positive control**; **a body that answers a `temp`-flagged node's value under a `file` request FAILS** — the durability-lie class | `§0` ruling 3, `§2.2` `P-7`, `§2.3` item 7 |
| **R-7** | **No `element` parameter, no geometry-shaped claim, no size, no magnitude and no clamp appears anywhere in the surface or in any row DESCRIPTION.** **`S-d11`'s clause is carried verbatim at `§2.2` `P-10`.** | the modules' bytes **and** this unit's own test file's row descriptions, **with a positive control that a description claiming a magnitude FAILS** | `P-6`, `P-9`, `P-10` |
| **R-8** | **No path, file, `fs`, `node:*`, `process`, `require`, `document`, `window`, `globalThis`, `getBoundingClientRect`, `getComputedStyle`, `matchMedia`, `clientX`-family, `Date` or `Math.random` token exists in either module or in this unit's own test file.** **And the export is `O(subtree)`, never claimed `O(1)`.** | both files' raw bytes, with a positive control (a fixture carrying `node:fs` must FAIL) | `P-9`, `§2.9` item 4 |
| **R-9** | **THE RE-POINTED `R-9` CONTROL.** **The clause's target is a GLOBAL engine-id-keyed map; a PER-LINK, CALLER-KEYED, WALK-GATED target set is NOT in that class; and THE STORE'S HANDLE IS NEVER A LOOKUP KEY.** | **(a)** a scan of the modules for any segment-against-handle lookup, **with a positive control that a lookup of a path segment against the minted-handle set FAILS**; **(b)** the **NON-VACUITY control**: the same drive against a store **that has never minted a row** must answer **DISTINGUISHABLY** from one that has — **a control that passes on both is VACUOUS and FAILS**; **(c)** `R-9`'s no-counter / no-UUID half: the minted handle is a per-graph monotone string and **no UUID site exists** | `P-8`, `§0` ruling 13, `§6` item 3 |
| **R-10** | **No MCP/registration surface moved**: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set, the `scripts` key set and `docs/specs/gsession.md` `§2.5`'s delegate surface are all UNMOVED by this unit's diff. | the frozen surfaces asserted **by set equality against the NAMES**; **the `scripts` KEY SET asserted unchanged because adding a key would redden `tests/ui-leg-contract.test.ts`'s `L-1` — a config change CANNOT satisfy it** | `P-4`, `§5.1`, `I-11` |
| **R-11** | **The import census, NAME-COMPLETE**: `store-core-graph.ts` carries exactly ONE non-type import (`./store-graph-references.js`) and no other; `store-graph-references.ts` imports nothing at all; **neither module imports `provident-ssr`, `electron`, `node:*`, `src/main/**`, `src/shared/**`, the held `store-core.js` or the held `store-references.js`**; and **neither carries a module-level mutable binding** holding a store, a graph, a register, a cache, a listener set or the seam flag. | both files' raw bytes, **NAME-COMPLETE** (the census names each module and each binding), **with a positive control that a second import statement FAILS, that a `src/main/**` import FAILS, and that a module-scope `const store = createGraphStore(...)` FAILS** | `P-11`, `I-13` |
| **R-12** | **No module-level mutable binding holds a store, a graph, a register or a cache; the construction count per realm is exactly `1`; and the seam's four members are ABSENT unless enabled.** | (a) the module's top-level scope, **with a positive control that a module-scope store binding FAILS**; (b) the wiring's construction count; (c) `'reset' in store === false`, `'seed' in store === false`, `'parentLinkCountOf' in store === false` and `'cacheEntryFor' in store === false` when the seam was not enabled | `P-7`, `§2.11` item 1, `§5.5.1 P-GR-IM-10` |

**⟶ ANNOTATED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`/`TW-2`; `RCA-8(d)` ANNOTATE-BESIDE — row `R-12` above stands byte-for-byte, its four named `in`-checks included). THE PRODUCTION-NEGATIVE READING IS EXTENDED IN SUBJECT, NOT IN KIND: the seam now carries `8` members (`4` as-filed + `4` appended — `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild`, `§2.1`'s block annotation), so row `(c)`'s key-set reading is read over ALL EIGHT KEYS — the four names it already prints PLUS the four appended — and a production-shaped construction in which ANY of the eight is present FAILS `R-12` exactly as one carrying `reset` does.** **THE ROW'S THREE PARTS, ITS `1`-PER-REALM CONSTRUCTION COUNT, ITS TOP-LEVEL-SCOPE SCAN AND ITS POSITIVE CONTROL ARE ALL UNMOVED; only the subject set of `(c)` is named, and `§5.5.1` `P-GR-IM-10` (its compensating row) keeps its term `4`.**

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-3`; `RCA-8(d)` ANNOTATE-BESIDE). THE EXISTENCE ROWS BELOW KEEP THEIR `R-9`…`R-13` IDS AND ARE ALWAYS CITED WITH THEIR SECTION (`§3.5 R-n`), because `§3.4` uses `R-9`…`R-12` for different subjects and `R-13` exists here alone.** **The disambiguation rule, the two ranges and the complete list of this file's bare `R-9`…`R-12` citations with their intended sections are at `§3.4`'s head note; no row below is renumbered, no claim is restated and no probe is changed by that note — `R-11`'s `src/shared/**` and vendored-tree byte-identity claim and `R-12`'s held-contract byte-identity claim are the two a later pass must reconcile if either file ever moves, and neither has moved in this pass (this pass edited THIS contract only).**

| id | The claim | The probe |
| --- | --- | --- |
| **R-9** | **This unit renders NO page and authors no page design**, so the `user-flow-audit.md` `§7.1` predicate does not trigger and **no report is due** — **a zero-row report is INVALID**. | a glob of the unit's diff for any envelope node, handler body, component binding or authored element; **any hit FAILS** |
| **R-10** | **(a) `docs/skills/designing-pages.md` DOES NOT EXIST**, so there is no test-use-case coverage matrix and no demo-page index to update; **(b) the construction count per realm is `1`; (c) the seam is ABSENT in a production-shaped construction.** | (a) a glob of `docs/skills/*` — **the file's later appearance is a finding against THIS row, to be reconciled in the same pass**; (b) the wiring's own construction count; (c) the store's own key set |
| **R-11** | **`src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts` are both NEW** (both verified free 2026-10-01), **and `src/shared/**` and the vendored tree stay BYTE-IDENTICAL across this unit's whole committed set.** | a commit-range probe over `src/shared/**` and `node_modules/provident-ssr/**` — **any byte there FAILS** |
| **R-12** | **The held `docs/specs/store-core.md` is BYTE-IDENTICAL across this unit's whole committed set**, and **neither new module imports it**. | a commit-range probe over that file **plus** a read of both modules' import statements — **any byte there, or any import of it, FAILS** |
| **R-13** | **The `[H]` half grows by exactly ONE row — the load-cycle row — and by nothing else.** | the unit's own `§5.5.1` `P-GR-IM-12` is the one `[H]`-driven row; **any second `[H]` drive introduced without a gate FAILS** |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**A TestWriter authors `tests/store-core-graph.test.ts` from THIS FILE and its `§5.5.1` register ONLY — no implementation
reading — and RUNS it, reporting the failing set VERBATIM.** **The rows are `§3.1`'s `M-1`…`M-17`, `§3.2`'s `F-1`…`F-25`,
`§3.3`'s `I-1`…`I-17`, `§3.4`'s `R-1`…`R-12`, `§3.5`'s existence rows, and the register's `21` rows.** **At red time the
modules DO NOT EXIST, so the whole set is expected to fail on the import itself** — **except the STATIC and EXISTENCE
rows, which are evaluable at red time and must be driven in BOTH branches:**

- **RED branch (the modules absent):** assert **ABSENCE** of the two module paths and **that no `src/**` file imports
  either path**; assert the `docs/skills/designing-pages.md` absence (`§3.5 R-10`(a)); assert that the held
  `docs/specs/store-core.md` is byte-identical (`§3.5 R-12`); assert that no tracked count moved.
- **GREEN branch (the modules present):** assert the modules **EXIST**, that `store-core-graph.ts` exports **exactly
  `2 + 27 = 29` names NAMED** (`§2.1` item 3), that the import census holds (`R-11`), and that the renderer wiring is the
  only importer.

**A row that fails merely because the work was done FAILS `R-13`'s own branch rule** — read as **`§3.5 R-13`** (`§3.4` carries no `R-13`; `§3.4`'s head note fixes the citation form).

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — every sentence of `§4.1` above stands byte-for-byte). TWO FIGURES IN THIS SECTION ARE CORRECTED BESIDE.** **(1) THE REGISTER IS `22` ROWS, NOT `21` — `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓ — because the architect's monotonic-persistence amendment adds `P-GR-IM-14` (`§2.1`'s named-invariant block; `§5.5.1`'s table; strategy `S-GR-PERSIST-1`, term `16`); the red set drives ALL `22` in register order and the added row is NOT optional.** **(2) THE GREEN BRANCH'S CENSUS IS `2 + 29 = 31` NAMED EXPORTS, NOT `2 + 27 = 29`:** **`§2.1` item `3`'s annotation prints the twenty-nine type declarations BY NAME with their terms (`3 + 6 + 4 + 1 + 1 + 5 + 2 + 2 + 5 = 29` ✓), the two counted declarations being `GraphTierGetResult` and `GraphAffectedRow` (`O-1`).** **NOTHING ELSE IN THIS SECTION MOVES: the RED branch's four assertions, `R-11`'s import census (read as `§3.4 R-11`), the `docs/skills/designing-pages.md` absence (`§3.5 R-10`(a)), the held contract's byte-identity (`§3.5 R-12`), the held `docs/specs/store-core.md` byte-identity and the unmoved-count assertion all stand — and the `§3.3` row census is still cited `I-1`…`I-17`, because this pass adds no `I-` row.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — every sentence of this section above and of its first annotation stands byte-for-byte). A THIRD FIGURE IS CORRECTED BESIDE, AND THE GREEN BRANCH'S CENSUS IS RE-STATED WITH ITS NAMES AND ITS TERMS: THE OPERATIVE CENSUS IS `2 + 27 = 29` NAMED EXPORTS — `2` runtime value exports plus `27` type declarations — because the two declarations that existed only to serve the withdrawn merged read (`GraphPart` · `GraphMergedRead`) are WITHDRAWN (`§2.1` item `3`'s second annotation prints the twenty-seven BY NAME and prints the arithmetic `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓).** **THE THREE FIGURES THIS SECTION HAS NOW PRINTED ARE ALL KEPT VISIBLE AND ARE NOT THE SAME CLAIM: the as-filed `2 + 27 = 29` (whose twenty-seven EXCLUDED `GraphTierGetResult`/`GraphAffectedRow`), the pre-withdrawal `2 + 29 = 31` (`O-1`'s correction), and the operative `2 + 27 = 29` (which EXCLUDES the two withdrawn declarations and INCLUDES the two `O-1` counted). THE FIGURE `29` THEREFORE OCCURS TWICE WITH TWO DIFFERENT MEMBERSHIPS, WHICH IS EXACTLY WHY THE CENSUS MUST BE PRINTED BY NAME AND WHY `§4.4` `S-7`'s *"a row asserts a COUNT without NAMING the names"* FAILS.** **NOTHING ELSE MOVES: the RED branch's four assertions, the `R-11` import census, the `docs/skills/designing-pages.md` absence, the held contract's byte-identity and the `§3.3` row census citation (`I-1`…`I-17`) all stand, and the register's `22` rows keep their ids, terms, strategy ids, pinned seed and `(bounded)` markings.**

### 4.2 Red-set authoring order

1. **The static and existence rows first** (they are evaluable now and they are what the red set reports at red time).
2. **The walk and its seven failure arms** (`M-1`, `M-2`, `F-1`…`F-7`, `R-4`).
3. **The filter rule and the register** (`M-4`, `F-2`, `F-14`…`F-18`, `R-6`).
4. **The uniqueness constraint and the merged read** (`M-5`, `M-6`, `F-8`). **⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; the sentence above stands byte-for-byte): the block's NAME is re-read as *"the uniqueness constraint and the read's case set (HIT · QUALIFIED · MISS)"*, and the three row ids are UNMOVED — `M-5` and `F-8` keep their ids and are re-derived onto their new subjects at `§3.1`'s and `§3.2`'s own annotations, this item's POSITION in the authoring order is UNMOVED, and no row is added to this item or dropped from it.**
5. **The write surface and the regeneration transaction** (`M-9`, `M-11`, `M-12`, `F-9`, `F-10`, `F-12`, `F-13`, `F-17`, `F-20`).
6. **The two caches** (`M-3`, `F-6`, `R-5`).
7. **The event surface and the severance arm** (`M-7`, `F-11`, `F-22`, `R-3`).
8. **The export** (`M-15`, `F-22`).
9. **The totality, the tree invariant, the hostile segments and the purity rows** (`F-23`, `F-24`, `F-25`, `I-2`, `R-1`, `R-2`, `R-7`, `R-8`).
10. **The register's `21` rows LAST** (`22` after the architect's monotonic-persistence amendment folded in by this pass — `P-GR-IM-14` is driven IN REGISTER ORDER with the other twenty-one, not appended to the run's tail as an afterthought), in register order, **with the caps and the stop rule** (`§5.5`).

### 4.3 What the red is NOT

- **It is NOT a partial set.** A red that omits a `§3` row or a register row **is not the red this spec owes.**
- **It is NOT a green.** **No row may be reported as passing at red time except the static/existence rows' RED branches.**
- **It is NOT a substitute for the register.** **The register rows are the quantification layer; the `§3` rows are the
  sample layer, and neither replaces the other.**
- **It is NOT a proof of anything about persistence, the tier-1 channel, the fork's tree, a rendered surface or the app.**
  **No `[U]`, no `[D]` and no APP claim is made by any row of this unit.**

### 4.4 The stop conditions (binding)

| id | Stop condition |
| --- | --- |
| **S-1** | **A `§3` row's expected answer cannot be derived from THIS FILE.** The row is **WITHDRAWN and reported**; the spec is amended in the same pass. |
| **S-2** | **A register row is un-runnable or un-enumerable.** **It is reported as a FAILURE, never as a pass.** |
| **S-3** | **The register's total is not the sum of its own terms.** **A total that is not the sum of its own printed terms is a REVIEW FINDING** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE), and a mis-sum is corrected by **annotating beside the as-filed form, never by silently rewriting it.** |
| **S-4** | **A cap is evicted, silently dropped, or made to clear anything.** The cap's declared outcome is **a refusal with `cleared: []`, `rows: []`, `crossings: 0` and `events: 0`.** |
| **S-5** | **A row claims a rendered-geometry, layout, paint, applied-CSS, containment-boundary or magnitude fact — or offers a `[U]` row for one.** **The claim is DELETED; the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4 S-6`'s own words, carried verbatim). |
| **S-6** | **A clause claims a coordinate, an element or a magnitude enters the store's surface.** **The clause is DELETED** — the family's opacity discipline and `S-d11`'s clause bind. |
| **S-7** | **A prohibition cites *"a static source row"* with no id, or a row asserts a COUNT without NAMING the names.** Both are FAILS (`§2.2`'s closing sentence; `§2.1`'s census). |
| **S-8** | **A second store authority appears** — a second construction in a realm, a module-level store binding, or a `cache`/handle that was serialized to make one. |
| **S-9** | **A node's `flag` is written in place, or an anchor is mutated in place**, rather than the re-tier being the regeneration transaction. |
| **S-10** | **A cap value or the seam is changed without a gate.** The values are working defaults and architect-reversible, **but a change is a spec amendment with its own gate, not an in-flight edit.** |
| **S-11** | **The held file's arithmetic findings are repeated rather than re-derived** — a total printed without its terms, a row count that its own table refutes, or a carried term that is not re-derived. |

### 4.5 Delegation gate

**This unit is NOT delegable to a TestWriter until: (a) this contract is FILED and APPROVED by the architect (the spec
gate — the ONE approval the chain waits for, `AUTONOMY AFTER SPEC APPROVAL` cited by row name); and (b) the STEP-0
determination at `§6` is accepted (a written zero-row rationale, never a silent one).** **After approval the chain
proceeds without further permission.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch)

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/renderer/store-core-graph.ts` | **NEW** — the **two value exports + twenty-seven type declarations** of `§2.1`, and nothing else (**⟶ ANNOTATED 2026-10-01, `O-1`: the operative census is `2` value exports + `29` type declarations = `31` exported names, the two counted declarations being `GraphTierGetResult` and `GraphAffectedRow`; `§2.1` item `3`'s annotation prints all nine terms. **THE DIFF SCOPE — ONE MODULE PATH, NEW, AND NOTHING ELSE IN ITS SHAPE — IS UNMOVED**) **⟶ RE-ANNOTATED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`): the OPERATIVE census is `2` value exports + `27` type declarations = `29` exported names — `GraphPart` and `GraphMergedRead` being WITHDRAWN with the merged arm — so this row's MODULE PATH, its `NEW` status and its *"and nothing else"* clause are UNMOVED and only the figure is read as `2 + 27` (`§2.1` item `3`'s second annotation prints the twenty-seven BY NAME with the arithmetic `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓)** | always |
| 2 | `src/renderer/store-graph-references.ts` | **NEW** — the register's caller-declaration input and its row type (`§2.1` item 2); **the TEST-ONLY fixture itself lives in the test file** | always |
| 3 | `tests/store-core-graph.test.ts` | **NEW** — the red set (`§4.2`), the register rows, the static/existence rows **and the TEST-ONLY fixture** | always |
| 4 | `docs/specs/store-core-graph.md` | this spec — its `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 5 | `docs/specs/store-core-graph-greens.md` | the unit's **gate-5 blind-greens artifact**, and any other `docs/specs/store-core-graph-*.md` of this unit **⟶ EXTENDED 2026-10-02 (THE ARCHITECT'S WAVE RULING; `RCA-8(d)` ANNOTATE-BESIDE — the row's own bytes above stand byte-for-byte): the module-wave family `D-GP-SVM` now APPLIES to this unit and a RETRO-FITTED RE-ENTRY IS ORDERED, so this row's set ALSO admits the two FROZEN-SURFACE artifacts at the family's own path convention — `docs/specs/store-core-module-store-core-graph-surface.md` and `docs/specs/store-core-module-store-graph-references-surface.md` (`scoped-visibility-modularity.md` `§4.2`'s hard equality of path segment and field 1) — plus their freeze records and any amendment rows they carry.** **THE EXTENSION IS AN EXTENSION OF THIS ROW'S SET AND NOT A NEW ROW, and it is not optional: the family's path convention is mandatory and the ruling is later and higher than this filing.** The compliance review's record (`docs/specs/store-core-graph-compliance-review.md` §9) is the ordered chain `W1`…`W7` | the pass that produces it |
| 6 | `src/renderer/renderer.ts` | **the WIRING ROLE ONLY, and ONLY if the wiring lands in this unit's pass**: it constructs the store once per realm at boot, before the hand-off, and registers the subscribers it needs. **It authors NO UI content and NO DOM** | the pass that lands the wiring; **a renderer edit that hand-writes DOM is a FINDING** |
| 7 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, and the per-unit documentation-review record | the pass that produces them |

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST. The frozen and
predecessor-own files are NAMED FIRST:**

1. **`docs/specs/store-core.md`** — **BYTE-IDENTICAL** for this unit's whole committed set. **Its register is never
   re-grained, its red set is never authored, and its two arithmetic findings are annotated beside their as-filed forms
   by the pass that owns them — NEVER by a rewrite from this unit.**
2. **`docs/specs/store-core-adoption-dossier.md`** — **cited by path and amended IN PLACE at the spec-gate pass**
   (`§6`); **this contract writes no byte of it.**
3. **`docs/specs/store-node-graph-proposal.md` and `docs/specs/store-node-graph-review.md`** — the proposal **admits
   nothing by itself** and the record is the **CLOSED** gate-1 record: **this unit derives them and may not re-litigate
   or edit them.**
4. **`src/shared/**` and `node_modules/provident-ssr/**`** — **BYTE-IDENTICAL**, including `src/shared/types.ts`.
5. **`src/main/**`** — the channel-name constants, the preload members, the migration, the atomic write and the security
   tier's own module are **`U-STORE-PERSIST`'s and `U-STORE-SECURITY`'s**, not this unit's. **The renderer cannot import
   `src/main/**` anyway** (`[H]`).
6. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change, **and no
   store-sourced value pushed into any of them**.
7. **`package.json` · `package-lock.json` · `tsconfig.json` · `tsconfig.tests.json` · `vitest.config.ts`** — **no script,
   no dependency, no devDependency, no include/exclude and no compiler option.** **`typecheck:tests` ALREADY EXISTS and
   this unit adds NO `scripts` key.**
8. **`scripts/**`** — no helper, no leg driver.
9. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member, no
   `MUTATING_METHODS` entry, no IPC method, no registration site.
10. **`docs/specs/mcp-endpoint.md` · `focus-tool.md` · `focus-model.md` · `gutter-ui.md` · `gutter.md` · `zones.md` ·
    `census.md` · `container.md` · `gsession.md` · `user-flow-audit.md`** — every sibling contract, **each under its own
    gate**.
11. **`docs/FORKER.md`** — its fork-facing cells are the architect's, on `Q-14`'s pass.
12. **`docs/skills/**`** — `designing-pages.md` does not exist and this unit renders no page.
13. **`AGENTS.md`**, and any tracker count.

**THE COMMIT-RANGE SCOPE RULE.** **A diff-scope row asserted over a commit range must scope its ALLOW-LIST CENSUS to
THIS UNIT'S OWN ARTIFACTS** — the two modules, this unit's test file, this spec, this unit's own `*-greens.md` and
`archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits, a sibling's
dirty working-tree file, or a sibling unit's artifact as this unit's diff.** **The DENIED set is the exception and is the
half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS** regardless of which pass
committed it. **A non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL.**

### 5.2 The legs this unit MUST run — FIVE, and the two three-part refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **This is this unit's WHOLE green.** **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — it proves **the contract's behaviour over arguments and over a driven in-realm graph store**, and **nothing** about persistence, the tier-1 channel, a rendered surface or the app. |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the twenty-seven type declarations (**read as `29` — `§2.1` item `3`'s annotation states the census by name and with its terms**), the two value signatures and the store interface's own members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** **⟶ RE-ANNOTATED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`): the OPERATIVE census this leg reads is `27` type declarations (`2 + 27 = 29` exported names) — the two declarations that existed only to serve the merged arm (`GraphPart` · `GraphMergedRead`) being WITHDRAWN — so the earlier *"read as `29`"* stands only as the pre-withdrawal correction and this leg's figure is `27`, printed BY NAME at `§2.1` item `3`'s second annotation** |
| **3** | **build** | `npm run build` | **[H]** | esbuild. **This unit adds modules imported by the renderer wiring**, so **the renderer bundle's census is EXPECTED to change** and **the other bundles must be BYTE-IDENTICAL** — **a renderer-bundle change is NOT evidence that the contract holds.** |
| **4** | **the additive test-layer leg** | `npm run typecheck:tests` | **[T]** | **the ONLY leg that compiles `tests/**`** (`AGENTS.md` item 4's additive fourth leg). **Any DONE row that cites typecheck as evidence about THIS unit's own test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/store-core-graph.test.ts`** — the named leg for `§2.1` item 3's type half | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** the type half is a **PRESENCE** claim, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while **leg 2 does not compile `tests/**` at all**. **IT ADDS NO SCRIPT, NO DEPENDENCY AND NO DIFF-SCOPE ROW.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART. A one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — including the walk's seven arms, the
   register, the two caches, the regeneration transaction, the severance and every static row. **`[U]` is the real-DOM
   observation leg (`npm run ui`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, and it is structural rather than a leg-availability excuse: NO ADMITTED UNIT AUTHORS A
   RENDERED SURFACE.** **Concretely, both limbs of the reason are absent: (a) this unit authors no element, no node, no
   text, no class, no attribute, no stylesheet and no control** — **so there is no rendered surface to observe**; **and
   (b) its flows are store-only, so there is no assembled visible behaviour whose truth is real-DOM-only.** **The `ui`
   leg exists and is green, and the divergence leg is green — the refusal is not an excuse about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row MAY NOT BE MOVED TO THE `ui` LEG
   SILENTLY."*** **Any later pass that wants a rendered row for this unit must get it from the unit that OWNS the
   rendered surface** — **the tab strip is `U-STORE-TABS-STRIP`'s (a PROPOSAL), and the two authored pages are
   `U-STORE-FOCUS`'s (a PROPOSAL); neither is admitted and neither is this unit's.** **A `[U]` row moved here silently is
   `§4.4 S-5`, and it does not land.** **AND THE WORD `waived` IS FORBIDDEN: gate 6's honest status is `STRUCTURAL`, and
   a DONE row that reports it as `waived` is a review finding.**

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED.** **The divergence leg is the shim ≡ real identity leg
and it is green — but no `[D]`-shaped row of this unit is runnable**, because **this unit's subject is a store's own
semantics over its own graph**, which the existing pinned leg does not enumerate. **A `[D]`-shaped row for this unit would
need its OWN harness and its own spec as its authority.**

**AND THE `user-flow-audit.md` `§7.1` PREDICATE, RECORDED:** **the determination is NOT TRIGGERING, in the predicate's own
terms, with limbs A and B both absent** (`CURRENT STATE` item 6). **The record of the determination is this sentence. NO
REPORT IS FILED, and a zero-row report is INVALID.**

### 5.3 The DONE row's shape

**The DONE row (`docs/next-steps.md`, the supervisor's pass, the architect's to grant) must carry, in this order — all
TWELVE items:**

1. **Unit + wave + status**: the successor unit's id as the architect admits it · its wave · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"the amended store architecture: a node-anchor-link graph as the
   source of truth; a tier token that is a FILTER; the leaf's own local name; a verbose per-step diagnostic; a
   top-level register with its own caps, projected from the graph and fed by a declared-row input; a per-`(path, tier)`
   uniqueness constraint; two caches with a two-part invalidator set and a rebuild at the invalidation site; the
   subtree-regeneration transaction; the downward `remove`; the eight-arm event surface with the `severed` arm and its
   release rule; the stable-JSON translation; the non-authoritative local-only export — and NOTHING ELSE. **No policy
   default, no store-side clamp, no consumer vocabulary, no element or geometry read, no graph write, no MCP surface, no
   UI, and no byte of the held contract."*

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-2`; `RCA-8(d)` ANNOTATE-BESIDE — the quoted scope sentence above stands byte-for-byte, in the DONE row's own template form). TWO OF ITS PHRASES ARE READ UNDER THE ARCHITECT'S REGISTER CLARIFICATION.** **(1) *"a top-level register with its own caps, projected from the graph and fed by a declared-row input"* — THE *"FED BY A DECLARED-ROW INPUT"* HALF IS WITHDRAWN (`§2.4` item `3`'s annotation withdraws it in those words), AND THE OPERATIVE RULE IS **TOP-LEVEL NAMES ONLY, A PURELY DERIVED REGISTER**: every row is the graph's projection of a ROOT node, one row per root and never a row below one, and the caller's declaration survives as the TOP-LEVEL NAME surface that MAKES a name a ROOT NAME (`§2.4` item `8`'s annotation) — never as a row.** **A DONE row written from this template must therefore read *"projected from the graph, with the caller's top-level name declarations"* and must NOT reintroduce *"fed by a declared-row input"*.** **(2) THE REST OF THE QUOTED SCOPE IS UNMOVED — *"a tier token that is a FILTER"*, *"the leaf's own local name"*, *"the per-`(path, tier)` uniqueness constraint"*, *"two caches with a two-part invalidator set and a rebuild at the invalidation site"*, *"the subtree-regeneration transaction"* (five steps, three failure arms — `§2.8` items `5`/`6`), *"the downward `remove`"*, *"the eight-arm event surface with the `severed` arm and its release rule"*, *"the stable-JSON translation"* and *"the non-authoritative local-only export"* — and the boundary clauses (no policy default, no store-side clamp, no consumer vocabulary, no element or geometry read, no graph write, no MCP surface, no UI, no byte of the held contract) are UNCHANGED.**
3. **The surface confirmation, explicitly**: *"`src/renderer/store-core-graph.ts` exports exactly **TWO value exports**
   (`createGraphStore`, `createGraphStoreError`) and **TWENTY-SEVEN type declarations**, NAMED (`GraphTierToken` ·
   `GraphNodeFlag` · `GraphRefusalReason` · `GraphResolveStep` · `GraphResolveDiagnostic` · `GraphNodeRef` · `GraphNode` ·
   `GraphAnchor` · `GraphLink` · `GraphTierHandle` · `GraphRegisterRow` · `GraphRegister` · `GraphRegisterCacheEntry` ·
   `GraphLinkCacheEntry` · `GraphConstraint` · `GraphPart` · `GraphReadHit` · `GraphReadMiss` · `GraphMergedRead` ·
   `GraphResolveResult` · `GraphWriteReceipt` · `GraphWriteOptions` · `GraphEvent` · `GraphSubscription` ·
   `GraphCrossing` · `GraphStore` · `GraphLoadError`) — **`THREE` read-result shapes and their union plus the rest, and the
   count is stated here WITH its terms: `3 + 6 + 4 + 1 + 1 + 4 + 2 + 2 + 4 = 27` ✓** (**⟶ CORRECTED BESIDE 2026-10-01, `O-1`: the operative terms are `3 + 6 + 4 + 1 + 1 + 5 + 2 + 2 + 5 = 29` ✓ — `GraphTierGetResult` joins the read-result-shape group and `GraphAffectedRow` joins the receipt/options/store/error group — so the DONE row's surface confirmation must print **`TWO` value exports + `TWENTY-NINE` type declarations = `THIRTY-ONE` exported names, with both added names named and all nine terms printed**; `§2.1` item `3`'s annotation is the authority); **(⟶ RE-CORRECTED BESIDE 2026-10-01, THE ARCHITECT'S MERGED-ARM RULING `A3` OF `§0`: the OPERATIVE confirmation a DONE row must print is **`TWO` value exports + `TWENTY-SEVEN` type declarations = `TWENTY-NINE` exported names, NAMED — `GraphPart` and `GraphMergedRead` being WITHDRAWN with the merged arm, so the twenty-seven are the `O-1` twenty-nine MINUS those two, and the terms are `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓, with `GraphTierGetResult` and `GraphAffectedRow` still counted; `§2.1` item `3`'s second annotation is the authority and prints the names AND the arithmetic. A DONE row that prints `31`, or that prints `29` without naming the names, FAILS `§4.4` `S-7`**); it imports **ONE** module
   (`store-graph-references.js`) and carries **no module-level store binding**, and **its test seam is ABSENT unless
   `{enableTestSeam:true}` was passed**."*
4. **The code/test delta**: the two modules + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register rows ran and
   which were reported un-run** and **which rows were driven in their RED branch**.
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, *`src/**` ONLY* · `npm run build`
   `[H]` (the renderer bundle's census moved, every other bundle byte-identical) · `npm run typecheck:tests` · **leg 5** —
   **and the explicit sentence that the node-suite green proves nothing about persistence, the tier-1 channel, a
   rendered surface or the app.**
7. **The `[U]`/`[D]` status, and gate 6's `STRUCTURAL` status**: **`[U]` not offered**, with `§5.2`'s **THREE-PART** clause;
   **`[D]` not claimed**, with its `PRECONDITION-GATED` status; **gate 6 stated as `STRUCTURAL`, with its reason.**
   **The word `waived` must not appear as this unit's status.** **AND the `user-flow-audit.md` `§7.1` determination,
   recorded as NOT TRIGGERING with no report filed.**
8. **The adversarial pass's findings** (`§3a`/`§3b`, **including the read-only PBT audit of `§5.5.1`'s executed tables**)
   and the **blind-greens + per-unit documentation-review records**.
9. **The tracker reconciliation** — including **the explicit statement that `src/shared/**` and the vendored tree are
   byte-identical, that the held contract is byte-identical, and that the ledger's counts are unmoved until the
   architect grants the DONE row.**
10. **The property register's execution record**: per register row, the **id · type · attempts-run · held · broken**
    counts, **each row's strategy id (`S-GR-*`)**, the **pinned seed `20261002`** and its **step form**, the
    **stop-after-5-consecutive-failures status**, the **total attempts against the `≤400` cap** with **every row's count
    against the `≤100` per-row cap**, and **the explicit sentence that every row whose property text quantifies over a
    domain larger than its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it
    states.**
11. **The register's ARITHMETIC, printed WITH its per-row terms** (**⟶ ANNOTATED 2026-10-01: the register this item speaks of is `22` rows with an operative declared total of `249`, not `21` / `233` — item `10`'s annotation above names the added row `P-GR-IM-14` (strategy `S-GR-PERSIST-1`, term `16`) and `§5.5.3`'s closing block prints `249` with all twenty-two terms; item `11`'s own RULE is UNMOVED and is the rule that makes `249` the figure to print**)**, and reconciled against the tables the test file
    actually produces: **a total that is not the sum of its own terms is a review finding.** **Where a row's attempts are
    several assertions over one execution, or a count of DISTINCT inputs rather than of DRIVES, the DONE row must report
    BOTH the declared attempts and the honest DISTINCT-DRIVE figure** — **the declared term is a DRIVE count**
    (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`, cited by row name), **assertions are printed BESIDE it and never inside
    it.**
12. **The decision requests' disposition** (`§7a.1`): **the eleven items' outcomes as ruled by the architect, each with
    its own row**, and **the `CARRIED` items with their owners and their positive revisit conditions named — never a
    bare `OWED`.**

### 5.4 Rollback

**The unit is a NEW module pair plus a NEW test file.** **Rollback is the removal of the two modules and the test file,
the revert of the wiring role if it landed, and the revert of this spec** — **no migration, no data file, no schema
version, and no other unit's artifact is entangled**, because **the store owns no file and persists nothing.**

---

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` obliges the register BEFORE the red set for a code-bearing unit, and
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM` forbids trimming it to a count.** **This repo HAS
NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the five keys `@types/node`, `electron`, `esbuild`,
`typescript`, `vitest` — **no `fast-check`, no property runner, no fourth dependency of any kind.** **This unit is
CODE-BEARING** (a graph store with two value exports, a walk, a register projection, two caches, a constraint evaluator, a
regeneration transaction and an event fan-out), **so the recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE.** **A register ENUMERATES every discernible testable property; the
per-section threshold (`≤8`) is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates `21` rows and
reports the count as its EXTENT — no property was dropped, merged or left unenumerated to fit a threshold**, and **`21` IS
AN OUTCOME, NOT A TRIM.** **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the ruling paragraph above stands byte-for-byte). THE FIGURE `21` IS CORRECTED BESIDE TO `22` — `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓ — because the architect's MONOTONIC-PERSISTENCE amendment (`A2`) adds ONE row, `P-GR-IM-14` (`§2.1`'s named-invariant block; printed in `§5.5.1`'s table).** **THE RULING'S OWN POINT IS UNMOVED AND IS STRENGTHENED RATHER THAN BENT: the per-section threshold (`≤8`) is still a BREAKDOWN SIGNAL and never a ceiling, the count is still reported as the register's EXTENT, and no property was dropped, merged or left unenumerated to fit a threshold — the added row exists because the model has one MORE discernible testable property, which is the only admissible reason to add one.** **`22` IS AN OUTCOME, NOT A TRIM, and the zero-row exemption remains unavailable to this code-bearing unit.**

**No row of this register is an `F-` row**, and **no `§6`/`FS-n` citation appears as a register
row.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/store-core-graph.test.ts`) — the file the red set
   already owes, and the file the register **rides as part of the red**. **No row is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript inside the test
   file.** **The rows that draw do so from a hand-rolled 32-bit LCG with `state₀ = 20261002`;
   `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`; EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state
   selecting the pool member — `index = stateₙ₊₁ mod pool.length`, with `pool.length = 22`.** **No `next(k)` helper, no
   `Math.random`, no wall-clock seed, no shrinking and no adaptive input search.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows evaluated
   **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES**. **A register row is never refused on the
   ground that "no PBT harness exists."**
4. **The register COMPLEMENTS the `§3` rows and never replaces them.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set exactly, and **a row
   whose property text quantifies over a domain LARGER than its table carries the explicit `(bounded)` marking.** **An
   un-run register row is reported as a FAILURE, never as a pass.**
6. **The register's own boundaries, named rather than silently relied on: (a) it drives the `file` tier through the
   DECLARED, STUBBED crossing seam and asserts NOTHING about the real channel; (b) no `Proxy` whose traps return
   inconsistent answers across reads is in any pool; (c) each row's table is a SUBSET of the input space this contract
   pins, and its silence about a shape it does not list is a stated boundary, not an unrecorded omission; (d) each
   register row's terms are re-derived for THIS model and no held term is inherited unchanged** (`§5.5.3`).

### 5.5.1 THE REGISTER — **`21` typed rows, the FAMILY PREFIX DECLARING THE ROW'S OWN TYPE: `13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, ALL executed by design**

**⟶ ONE OBJECT-NAMING NOTE, CARRIED ONCE IN THIS FILE (2026-10-01, BESIDE THE ARCHITECT'S REGISTER CLARIFICATION, WHICH BINDS THIS SECTION TOO).** **THE REGISTER OF THIS SUBSECTION IS THE **PROPERTY** REGISTER — `21` typed rows (`13` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`), `233` declared attempts, printed WITH their twenty-one terms and a term-by-term addition at `§5.5.3` — and it is **A DIFFERENT OBJECT** from the STORE'S RUNTIME TOP-LEVEL-NAME REGISTER that `§2.4` governs.** **The one counts ROWS OF A PROPERTY TABLE and ATTEMPTS; the other counts TOP-LEVEL NAMES, one row per ROOT node, and is never a total node count (`§2.4`'s ruling block).** **NO COUNT CROSSES FROM ONE REGISTER TO THE OTHER: the `21` here is NOT the store's row count, the `233` here is NOT a store quantity, and a pass that reads either figure against the other — or that reads `§2.4`'s *"row count equals the number of root nodes"* as a claim about this table — has conflated two objects.** **The same sentence binds `§5` above, `§5.5.2` and `§5.5.3` below, and every DONE-row citation of this register's figures.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS; `RCA-8(d)` ANNOTATE-BESIDE — the note above stands byte-for-byte and this clause is this pass's dated reading of it). THE `233` NAMED ABOVE IS THE OPERATIVE DECLARED TOTAL, AND ITS TERMS ARE `§5.5.3`'s CORRECTED COLUMN'S — `233` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12` — with per-row maximum `40` (`P-GR-IM-13`).** **BUT THIS NOTE HEADS A TABLE WHOSE OWN TWENTY-ONE PRINTED TERMS ARE THE AS-FILED DRIVE FORMS, SUMMING TO `427`, so the note's *"printed WITH their twenty-one terms … at `§5.5.3`"* points at the CORRECTED column and NOT at the table directly beneath it.** **The two figures are reconciled, and the gap is filed as a finding with its owner and its positive revisit condition, in `§5.5.3`'s closing block (`THE SITE RECONCILIATION`, finding (6)); the table's as-filed cells stay visible here and no byte of them is rewritten.** **NO COUNT CROSSES TO THE STORE'S RUNTIME REGISTER, and this annotation moves no count at all: `21` rows, `21` strategy ids and the `2` `(bounded)` markings stand as filed.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS, WITH THE ARCHITECT'S SECOND AMENDMENT FOLDED IN; `RCA-8(d)` ANNOTATE-BESIDE — the heading above, the object-naming note above and every row of the table below stand byte-for-byte, and this clause is this pass's dated reading of the register's size). THE REGISTER IS NOW `22` TYPED ROWS — `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓ — WITH `22` STRATEGY IDS AND THE SAME `2` `(bounded)` MARKINGS (`P-GR-TP-1` · `P-GR-IM-12`).** **THE ONE ROW ADDED IS `P-GR-IM-14`, ON THE AUTHORITY OF THE NAMED TREE INVARIANT MONOTONIC PERSISTENCE (`§2.1`'s named-invariant block): for every parent link, `durability(child) ≤ durability(parent)`, under the ordering `file` > `mem` > `temp`, with `secure` a separate main-side collection outside the ordering and carrying no graph node — DRIVEN AS A STATE-MACHINE/TOTALITY PAIR OVER THE FOUR TOKENS, strategy `S-GR-PERSIST-1`, term `16`.** **THE PAIR IS THE ROW'S TWO DRIVE LEGS, NOT TWO ROWS — stated so the phrase is not read as a request for a second row: the STATE-MACHINE LEG drives the `9` ordered `(parent, child)` pairs over the ordered three tokens (`file` · `mem` · `temp` — each pair's transition attempted and its outcome read) and the TOTALITY LEG drives the `7` `secure`-involving pairs (`4` with `secure` as parent + `4` with `secure` as child − the `1` double-counted `(secure, secure)` pair = `7`), each DECIDED as a refusal because `secure` carries no graph node; `9 + 7 = 16` = `4` tokens × `4` tokens ✓ — one drive per pair, with each drive's two legs asserted together.** **THE AS-FILED `21`-ROW FIGURES ARE KEPT VISIBLE AND SUPERSEDED BESIDE: the heading's `21` (`13 + 1 + 7`), the object-naming note's `21` rows and `233` declared attempts, and the earlier docs-repair annotation's `21` / `233` all read as the PRE-AMENDMENT record — the operative pair is `22` rows / `249` declared attempts, printed with all twenty-two terms at `§5.5.3`'s closing block and reconciled site by site at that block's item `(10)`.** **NOTHING ELSE MOVES: no row is dropped, merged or renumbered, no `(bounded)` marking changes, no strategy id of the existing `21` rows changes, the pinned seed `20261002` and its one-LCG-step-per-draw form stand, the family-prefix rule (a prefix is a TYPE, never an ordinal) stands, and NO COUNT CROSSES TO THE STORE'S RUNTIME REGISTER — the note above still binds: the store's register counts ROOT NODES (`§2.4`'s ruling block).** **AND THE ROW COUNT IS STILL AN OUTCOME, NOT A BUDGET (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`): the added row is a property the model has and the table did not, which is the only admissible reason to add one.**

**THE FAMILY CONVENTION, STATED ONCE SO NO READER DERIVES A COUNT FROM AN ID: the prefix is the row's DECLARED TYPE,
never its ordinal** — `P-GR-IM-*` = `P-IM` invariant · `P-GR-SM-*` = `P-SM` state-machine · `P-GR-TP-*` = `P-TP`
totality. **An id whose prefix disagreed with its Type column would FAIL the register's own typing rule.** **The prefix
`P-GR-*` (`GR` = this unit, **g**raph **r**esolution) collides with no sibling's register and with no `§3` family
(`M-*`/`F-*`/`I-*`/`R-*`).** **The strategy-id prefix is `S-GR-*`, one per row.**

**THE DECLARED-ROW FIXTURE THIS REGISTER RUNS AGAINST, named because the register is un-runnable without it.** **One
declared-row input, carried by this unit's own test file, with GENERIC CALLER-STYLE spellings and NO consumer noun:**
**`file.<entity>.order`** (a top-level row) · **`file.<entity>.pinned`** (a top-level row with the reserved flag) ·
**`mem.<entity>.<id>.working`** · **`temp.<entity>.<id>.candidate`** · **`secure.<entity>.secret`** (declared and
**tier-internal only**) — **plus the constraint row `{ id: 'unique-path-tier', kind: 'unique-path-tier', matchedSet:
'<the fixture's top-level rows>', evaluatedOn: ['commit'], repair: 'none', onRepeat: 'refuse', refusalReason:
'duplicate-path-tier' }` and the row `{ id: 'count-exactly-one', kind: 'count-exactly-one', matchedSet: '<one pattern's
instances>', evaluatedOn: ['set','commit','remove'], repair: 'next-surviving-by-order', onRepeat: 'edit', refusalReason:
null }`.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-6`; `RCA-8(d)` ANNOTATE-BESIDE — the fixture paragraph above stands byte-for-byte, `secure.<entity>.secret` and its *"(declared and tier-internal only)"* included). THE CONTRADICTION IS RESOLVED BY RE-READING THE `secure` ENTRY AS THE REFUSED CONTROL, NOT BY RENAMING IT: `§2.4` item `5`(b) refuses AT CONSTRUCTION a declared row whose name's first segment is `secure`, so **NO `secure` SPELLING IS A LOADING DECLARATION AND NO REGISTER ROW CAN CARRY A `secure` NAME IN ANY STATE**.** **THE OPERATIVE READING, IN FOUR CLAUSES.** **(1) THE FIXTURE IS TWO INPUTS, NOT ONE: the LOADING declarations — the four non-`secure` names `file.<entity>.order` · `file.<entity>.pinned` · `mem.<entity>.<id>.working` · `temp.<entity>.<id>.candidate` — and the REFUSED-CONTROL INPUT, which carries `secure.<entity>.secret` and exists so that arm `(b)` has its NAMED POSITIVE CONTROL (`F-18`'s one-control-per-arm requirement; this register's `P-GR-IM-6`, `6` arms × `2` halves).** **(2) *"(declared and tier-internal only)"* IS CORRECTED BESIDE TO: *"carried by the REFUSED-CONTROL input; it NEVER LOADS, and the `secure` tier's own values are the separate main-side collection's (`§2.11` item `2`), which the generic surface refuses by name before the register is consulted and before any traversal (`§2.3` item `1`; `§2.4` item `5`; `§3.2` `F-14`)"*.** **(3) `P-GR-TP-1`'s pool entry *"a `secure.*` declared name"* IS READ AT THAT SAME CLAUSE — it is a DRAW that must answer `'secure-refused'`, never a name that resolves; *"a `secure.*` undeclared name"* is its companion draw and answers the same token (`F-14`), never `'undeclared-name'`.** **(4) THE ALTERNATIVE — renaming the fixture row to a non-`secure` spelling — IS PRICED AND NOT TAKEN: it would leave arm `(b)` without its named positive control, making `F-18`'s one-control-per-arm requirement unsatisfiable, and `F-14` needs a `secure.*` drive at the generic surface in any case.** **THE FIXTURE'S OTHER CONTENT IS UNMOVED: the generic caller-style spellings, the reserved-flag row, the two constraint rows, the no-consumer-noun property, and the fixture's role as this register's driver.**

**⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S RULING ON THE INTERACTION PRECONDITION; `RCA-8(d)` ANNOTATE-BESIDE — the fixture paragraph above and its `O-6` annotation stand byte-for-byte, and this clause records THE TWO CONSTRAINT ROWS' STATUS under the ruling).** **THE FIXTURE'S TWO DECLARED CONSTRAINTS — as the fixture paragraph prints them, `{ id: 'unique-path-tier', kind: 'unique-path-tier', matchedSet: '<the fixture's top-level rows>', evaluatedOn: ['commit'], repair: 'none', onRepeat: 'refuse', refusalReason: 'duplicate-path-tier' }` and `{ id: 'count-exactly-one', kind: 'count-exactly-one', matchedSet: '<one pattern's instances>', evaluatedOn: ['set','commit','remove'], repair: 'next-surviving-by-order', onRepeat: 'edit', refusalReason: null }` — ARE LEGAL TO DECLARE TOGETHER, AND EACH IS ENFORCED INDEPENDENTLY.** **The ruling's operative rule is `§2.7` item 6's annotation: the constraint table declares `N` INDEPENDENT rows, each evaluated on every write and every `remove`, and NO ROW DECLARES, KNOWS OR NEEDS ANOTHER ROW — so the fixture's `N = 2` is LAWFUL, and NO INTERACTION RULE IS OWED BY EITHER ROW.** **THE TWO ROWS' DISPOSITIONS ARE PRINTED SEPARATELY SO NEITHER IS READ FOR THE OTHER: `unique-path-tier` REFUSES (its own token `'duplicate-path-tier'`, under its `onRepeat: 'refuse'`; `§2.7` item 4's two declared outcomes) · `count-exactly-one` REPAIRS IN THE SAME COMMITTED WRITE (its `refusalReason` is `null`, so THAT ROW NEVER REFUSES; item 5's NEXT-SURVIVING-BY-`order` rule and its WRAP).** **AND THE CASCADING CASE IS ANSWERED WITHOUT A LOAD REFUSAL: a repair's own write IS a write, evaluated on ITS OWN post-state (item 2), so a repair that would leave the OTHER row violated is answered by THAT row — a rejection carrying its token, or that row's own declared repair in the SAME committed write** (`§2.7` item 6's annotation, where `NW-8`(c)'s cascading case is re-homed; the `§3a` `ADV-GR-14` seed's *"which does not load"* is corrected beside at that seed). **THIS READING IS WHAT MAKES THE REGISTER DRIVEABLE AT ALL: every register drive constructs the store with this fixture (`§5.5.1`'s property text is *"the declared-row fixture this register runs against"*), so an as-filed refusal of any two-id input would have REFUSED THE REGISTER'S OWN FIXTURE and left no row able to construct a store** (`§5.5.3`'s closing block item `(13)`; `§3.2` `F-19`'s re-aimed cell). **NO REGISTER TERM MOVES BY THIS READING: the fixture is the register's DRIVE SUBSTRATE, not a term of any row, and the operative twenty-two-term total stays `249` — `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `16` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12` (`§5.5.3`'s closing block item `(13)`).** **THE FIXTURE'S OTHER CONTENT IS OTHERWISE UNMOVED: the `O-6` annotation's four clauses, the refused-control input, the four loading spellings, the reserved-flag row and the no-consumer-noun property all stand as filed.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-GR-IM-1`** | `P-IM` invariant | **THE TREE INVARIANT: for EVERY node the graph has ever minted, the parent-link count is EXACTLY `1`** — after a mint, a re-tier, a downward `remove`, a `clear`, a `sweep` and a severance — **and no operation on the surface can produce a second parent link.** | **YES** | `M-10`, `F-23`, `I-2`, `R-2` | `S-GR-TREE-1` | **`24` attempts** = **`6` operations × `4` node classes** (a top-level node · an intermediate node · a leaf · a regenerated node) — the parent-link count read **after each operation**. |
| **`P-GR-IM-2`** | `P-IM` invariant | **ANCHOR IMMUTABILITY AND FLAG IMMUTABILITY: for EVERY anchor object read before and after an operation, `key` and `link` are UNCHANGED; and for EVERY node, `flag` changes only together with a NEW `ref`.** A live node's flag never changes in place, and a regenerated node is a different object. | **YES** | `M-10`, `M-9`, `I-5`, `F-6` | `S-GR-IMMUT-1` | **`36` attempts** = **`6` operations × `6` anchor/flag reads** (the anchor on the written node · the anchor on a sibling · the anchor on an ancestor · the leaf's flag · the root's flag · a regenerated node's `ref`). |
| **`P-GR-IM-3`** | `P-IM` invariant | **THE PER-`(LOGICAL PATH, TIER)` UNIQUENESS: for EVERY pair, at most ONE node holds it** — and a second attempt is routed to **an EDIT** (the node count for the pair stays `1`, the value is the new one) **or a LOUD FAILURE** (`'duplicate-path-tier'`, `cleared: []`, `events: 0`, the store unchanged), **per call params**, and **NEVER a second node**. | **YES** | `M-6`, `F-12`, `I-3`, `§2.7` item 4 | `S-GR-UNIQ-1` | **`24` attempts** = **`6` pairs × `4` drive forms** (the first commit · the EDIT repeat · the REFUSE repeat · a second TIER's holder for the same path). |
| **`P-GR-IM-4`** | `P-IM` invariant | **THE REGISTER'S PROJECTION IDENTITY: for EVERY state, the count of `derived:true` register rows equals the count of parentless nodes, and every cold item is `derived:false` with `nodeRef:null`.** | **YES** | `M-4`, `F-2`, `I-4`, `§2.4` item 3 | `S-GR-PROJ-1` | **`18` attempts** = **`6` register states × `3` readings** (the derived-row count · the parentless-node count · the cold-item count). |
| **`P-GR-IM-5`** | `P-IM` invariant | **THE TWO-PART CACHE INVALIDATION, EXHAUSTIVELY: after ANY register change OR ANY change to a link's anchor set, every affected entry is INVALID — and no OTHER operation invalidates one.** The drives include the clear rule (an invalidator by the rule's own words), a regeneration (a register-and-anchor-set change), and a severance. | **YES** | `M-11`, `F-6`, `I-14`, `R-5` | `S-GR-CACHE-1` | **`24` attempts** = **`6` invalidating operations × `4` entry classes** (the register entry for the path · the register entry for a sibling · the link entry for the written path · the link entry for an untouched path). **The positive control is the untouched entry, which must SURVIVE.** |
| **`P-GR-IM-6`** | `P-IM` invariant | **THE REGISTER'S CONSTRUCTION-TIME REFUSAL SET IS CLOSED AT SIX ARMS, each with a NAMED POSITIVE CONTROL**, and **a refused input leaves NO store.** | **YES** | `F-18`, `F-2`, `R-4`, `§2.4` item 5 | `S-GR-REG-1` | **`24` attempts** = **`6` refusal arms × `4` halves** — **(a)** the refusal drive (the arm's own token), **(b)** its positive control (which LOADS), **(c)** the absence-of-store assertion, **(d)** the re-drive with a DIFFERENT row order (which must refuse identically, so the refusals do not depend on input order). **Six arms × four halves = `24`.** |
| **`P-GR-IM-7`** | `P-IM` invariant | **THE WALK'S PRECEDENCE IS TOTAL AND ORDERED: `secure` → malformed → undeclared → the leaf miss → the filter miss → the answer**, and **the reason reported is the FIRST that applies**, with **the positive control that each adjacent pair is distinguishable** — a `secure.*` undeclared name answers `'secure-refused'` and NEVER `'undeclared-name'`; a name whose chain never reached a leaf answers `'no-such-anchor'` and NEVER `'tier-filter-miss'`. | **YES** | `F-1`, `F-3`, `F-4`, `F-14`, `R-4` | `S-GR-PREC-1` | **`30` attempts** = **`6` precedence classes × `5` drive forms** (the unqualified spelling · the qualified agreeing spelling · the qualified disagreeing spelling · the write-side drive · the tier-local `get`/`has` pair). |
| **`P-GR-IM-8`** | `P-IM` invariant | **EVERY REFUSAL CARRIES ITS VERBOSE PER-STEP DIAGNOSTIC: `reason`, `step`, `segment`, `owner`** — with the step matching the arm's own step, and `owner:null` EXACTLY at `C-TOP`. | **YES** | `F-1`…`F-7`, `§2.3` item 6 | `S-GR-DIAG-1` | **`21` attempts** = **`7` failure arms × `3` diagnostic readings** (the `reason` token · the `step` id · the `segment`/`owner` pair). |
| **`P-GR-IM-9`** | `P-IM` invariant | **THE COMMIT REGENERATES THE WHOLE SUBTREE AND DELETES THE ORIGINAL ONLY ON A MATCH: the regenerated set is the node AND EVERY DESCENDANT, each re-tiered; the census matches; the original is deleted LAST; a mismatch leaves the original ALIVE.** | **YES** | `M-11`, `M-12`, `F-9`, `§5.5.1 P-GR-SM-1` | `S-GR-REGEN-1` | **`18` attempts** = **`6` subtree shapes × `3` census outcomes** (matched → the original is gone and the regenerated set is live · mismatched → the original is alive and nothing is deleted · the corroborating segment-total reading asserted BESIDE the comparison). |
| **`P-GR-IM-10`** | `P-IM` invariant | **THE TEST SEAM'S SHAPE AND ITS PRODUCTION-NEGATIVE ROW: with `{enableTestSeam:true}` all four members are callable; WITHOUT it all four keys are ABSENT and the store's own key set is EXACTLY the interface's declared members; `reset()` clears the graph, the register and both caches and RELEASES every subscription, emitting NO event; `seed(rows)` drives each row through the ORDINARY write path and a refused row leaves the store unchanged; each seam call without the seam THROWS.** | **YES** | `F-24`, `R-12` (read as **`§3.4 R-12`** — `§3.4`'s head note fixes the form), `§5.5.1 P-GR-IM-12` | `S-GR-SEAM-1` | **`12` attempts** = **`4` seam members × `3` states** (the seam ENABLED · the seam ABSENT with the key set asserted exactly · the seam-less call that must throw). |
| **`P-GR-IM-11`** | `P-IM` invariant | **THE FLAG IS MINTED BY `commit` ALONE: `commit` MINTS a node whose `flag` equals the requested tier and RE-MINTS by regeneration; `set` NEVER mints a node and NEVER changes a flag; a `set` on a path with no node is REFUSED `'undeclared-name'`; and the filter reads the node's OWN flag.** | **YES** | `M-9`, `F-4`, `I-5`, `§0A` note 4 | `S-GR-FLAG-1` | **`12` attempts** = **`4` operations × `3` flag readings** (the minted node's flag · the same node's flag after a `set` · the flag the filter compares). |
| **`P-GR-IM-12`** | `P-IM` invariant — **THE LOAD-CYCLE ROW (`[T]` with an `[H]` drive)** | **RESOLVE → LOAD (`loadEnvelope` or `loadDoc`) → RESOLVE ANSWERS IDENTICALLY, WITH NO REBUILD AND NO DECLARED WRITE IN BETWEEN.** The store's graph does not inherit the host's per-generation teardown, and the second resolution's cache entry is the SAME entry. | **YES (bounded — the property says "any load" while the drive performs the two named loads; the universal is NOT proven and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** — **`[H]` drive**: the two load symbols are `src/renderer/runtime.ts:loadEnvelope` and `:loadDoc`, whose teardown-and-rebuild-and-never-dispose sequence is the retention record's `RH-1`, with `RH-5` for the never-released root | `M-1`, `M-3`, `F-6`, `§2.6` item 6, `R-13` (read as **`§3.5 R-13`** — `R-13` exists only at `§3.5`; see `§3.4`'s head note) | `S-GR-LOAD-1` | **`18` attempts** = **`3` states × `6` drive steps** (resolve the fixture's path · read the cache entry · run a load · resolve again · read the cache entry again · assert the two answers are structurally identical under the canonical comparator). **The engine fact this row tests: the engine's graph is REPLACED PER LOAD, and this host never disposes a discarded `Supervisor` — so a store riding it would lose every resolution on every load, and the architecture would be wrong rather than slow.** |
| **`P-GR-IM-13`** | `P-IM` invariant | **THE TWO-RUN STORE-STATE-INDEPENDENCE DIFFERENTIAL, with the CANONICAL STRUCTURAL COMPARATOR: for EVERY (store state, call) pair, the answer is IDENTICAL across two runs whose ONLY difference is the store's tier state** — `===`-identical where primitive, and identical under the comparator where an object (`parts` ABSENT compared as ABSENT; a `cache` compared BY IDENTITY against the same handle; `found`/`tier`/`flag`/`merged`/`name` by value) — **AND the read path mutates NO cache entry, so the second run's cache state is the first run's cache state.** | **YES** | `M-3`, `M-16`, `F-6`, `R-5`, `§0A` note 3 | `S-GR-DIFF-1` | **`20` attempts** = **`5` store states × `4` calls**, each driven TWICE, with **the cache-entry reading taken BETWEEN the two runs**. **The `5` states:** all cold · a `temp` shadow over a `mem` holder · a `mem` shadow over a `file` holder · a cold item (a declared row with no node) · a severed path. **The `4` calls:** an unqualified `resolve` · a qualified `resolve` · the tier-local `get` · the tier-local `has`. **THE COMPARATOR IS WRITTEN IN THE TEST FILE, adds NO dependency, and is NOT a comparison seam in the module.** |
| **`P-GR-IM-14`** | `P-IM` invariant — **ADDED 2026-10-01 by the architect's second amendment (`A2`); this is the register's `22`nd row, and it is driven IN REGISTER ORDER with the other twenty-one** | **MONOTONIC PERSISTENCE: for EVERY parent link in the graph, `durability(child) ≤ durability(parent)` under the ordering `file` > `mem` > `temp` (`secure` is a separate main-side collection OUTSIDE the ordering, carrying no graph node) — NO NODE IS EVER MORE DURABLE THAN THE NODE THAT REACHES IT; the invariant is VACUOUS AT A ROOT; and an attempt to violate it is REFUSED with a RETURNED RECORD `reason:'durability-inversion'` (`cleared: []`, `repaired: []`, `rows: []`, `crossings: 0`, `events: 0`) with the store LEFT COMPLETELY UNCHANGED.** | **YES** | `M-10`, `M-11`, `M-12`, `F-9`, `I-2`, `I-5`, `§2.4` item 7(h), `§2.8` item 5 | `S-GR-PERSIST-1` | **`16` attempts** = **`4` tokens × `4` tokens** — one drive per `(parent, child)` token pair, each drive carrying BOTH LEGS of the state-machine/totality pair: the **STATE-MACHINE LEG** over the `9` ordered pairs of the ordered three (`file` · `mem` · `temp`: the re-tier transition attempted and its outcome read) and the **TOTALITY LEG** over the `7` `secure`-involving pairs (`4` + `4` − `1` = `7`, each DECIDED as a refusal because `secure` carries no graph node); `9 + 7 = 16` ✓. **The positive control is a DOWNWARD re-tier of a whole subtree (LEGAL); the negative control is a child minted or regenerated ABOVE its parent's flag (REFUSED `'durability-inversion'`, store unchanged).** The drives read the node's own `parentLink` and the two flags — never a name, never a register row and never a tier token (`§2.2` `P-8`'s posture). |
| **`P-GR-SM-1`** | **`P-SM` state-machine** | **THE REGENERATION TRANSACTION IS A CLOSED THREE-STEP MACHINE WITH A DECLARED FAILURE TERMINAL: `BUILD → COMPARE → (DELETE-ON-MATCH \| REFUSE)`, with NO reachable state in which the original is deleted on a mismatch, no reachable state in which a partial subtree is live, and every terminal reachable.** | **YES** | `M-11`, `F-9`, `F-10`, `§2.8` items 5/6 | `S-GR-TXN-1` | **`15` attempts** = **`5` transition classes × `3` terminals** (the commit that regenerates · the comparison · the delete-on-match · the mismatch refusal · the concurrent `remove` inside the window), **with the `3` terminals being `REGENERATED`, `REFUSED-ORIGINAL-ALIVE` and `ANSWERED-FROM-THE-ORIGINAL`.** |
| **`P-GR-TP-1`** | `P-TP` totality | **THE WALK'S TOTALITY OVER ITS SEVEN ARMS: for EVERY arm, the answer is a RETURNED RECORD — a `GraphResolveResult` or a refusal record carrying its diagnostic — and NOTHING THROWS.** The one declared exception set (the factory's LOAD REFUSAL and the two seam throws) is asserted separately in the same row. | **YES (bounded — the property says "every name" while the pool holds `22` and the drive performs `24` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-1`…`F-7`, `F-24`, `I-8`, `R-3` | `S-GR-TOTAL-1` | **`24` attempts** = **`6` pinned-seed DRAWS × `4` arm drives**, where **one attempt is one drive** and the per-call assertions (did-not-throw · declared kind · declared members) are reported as the row's `assertions` figure, NEVER as attempts. **The `22`-member pool includes: `''` · a non-string · `'file'` · `'file.'` · `'file..x'` · `'File.x'` · `'disk.x'` · a `.`-heavy name · a 4 kB name · `'__proto__'`-shaped segments · `'constructor'`-shaped segments · an undeclared top-level name · a cold item's name · the fixture's pattern-matching name · the fixture's reserved name · a `secure.*` declared name · a `secure.*` undeclared name · a path whose parent is held · a path whose descendants are held · a name with an anchor key that does not exist · a name whose leaf is unwritten · a name whose leaf flag disagrees.** |
| **`P-GR-TP-2`** | `P-TP` totality | **HOSTILE SEGMENTS ARE DATA, and `R-9`'s re-pointed control is NOT VACUOUS: `'__proto__'` / `'constructor'` / `'toString'` (and a non-string, and `''`) are compared as STRINGS and NEVER used as a prototype key.** **The POSITIVE control: a store whose name→target dictionary is a PLAIN OBJECT FAILS** in the same drive — **the held `§3a` seed `ADV-SC-1`'s exact shape.** **The NEGATIVE control: the same drive on the declared structure PASSES.** | **YES** | `M-8`, `F-25`, `I-2`, `I-12`, `R-2`, `R-9` (read as **`§3.4 R-9`** — the re-pointed control; `§3.4`'s head note fixes the form) | `S-GR-HOSTILE-1` | **`24` attempts** = **`8` hostile inputs × `3` drives** (a `resolve` · a `set`/`commit` through the segment · the dictionary's own membership reading). **The `8` inputs:** `'__proto__'` · `'constructor'` · `'toString'` · `'hasOwnProperty'` · `'valueOf'` · a non-string · `''` · a 4 kB segment. |
| **`P-GR-TP-3`** | `P-TP` totality | **THE CAP NON-DESTRUCTIVE POSTURE: at the cap the operation is REFUSED with `reason:'cap-exceeded'`, `cleared: []`, `rows: []`, `crossings: 0`, `events: 0`, and the register BYTE-IDENTICAL to its pre-call state; ONE ELEMENT BELOW the cap the same operation COMMITS** — and **NO eviction, FIFO drop, LRU drop, lower-tier clear or event ever accompanies an overflow.** | **YES** | `F-13`, `M-4`, `I-14`, `§2.4` item 6 | `S-GR-CAP-1` | **`6` attempts** = **`3` caps × `2` halves** (at the cap · one below). `RCAP-1` is driven by filling `mem`-flagged register rows to its value and one past; `RCAP-2` by filling `temp`-flagged rows; `RCAP-3` by registering amplifier-form subscriptions. **A reported DISTINCT figure is carried BESIDE this term: the `6` drives observe `3` distinct outcomes, because the refusal and the acceptance are the same two shapes for each cap.** |
| **`P-GR-TP-4`** | `P-TP` totality | **THE EXPORT'S SNAPSHOT TOTALITY AND ITS LOCAL-ONLY CROSSING RULE: for EVERY export drive, the answer is a fresh NON-AUTHORITATIVE object whose members are self-contained — no live `cache` beyond the caller's frame, no aliasing to a store value, no authority, and a mutation of the export changes NOTHING in the store.** | **YES** | `M-15`, `F-8`, `F-22`, `I-17`, `§2.9` | `S-GR-EXPORT-1` | **`18` attempts** = **`6` export shapes × `3` claims** (freshness/identity · non-authority/aliasing · no live handle beyond the frame). **The `6` shapes:** a leaf export · a subtree export · an export of a path with a resident descendant (the boundary case) · a cold item's export · a severed path's export · an export on which the caller then writes back (which must not be a granted operation). |
| **`P-GR-TP-5`** | `P-TP` totality | **THE SEVERANCE'S EVENT AND RELEASE, AND THE NO-VOCABULARY / NO-GEOMETRY SCAN, WITH ITS CONTROLS: a severance emits EXACTLY ONE declared `cause:'severed'` event PER RELEASED REFERENCE, its subscription count goes to `0`, the receipt names it — and the scan's verdict over the modules' and the test file's corpora is the declared one, with both positive controls FAILING as declared.** | **YES** | `F-11`, `F-14`, `F-15`, `M-17`, `R-1`, `R-7`, `R-8` | `S-GR-SEVER-1` | **`20` attempts** = **`5` severance classes × `4` corpora-and-events readings** (**the event count and its `cause`** · **the subscription count after** · **the receipt's `cleared[]`** · **a no-instrument-claims-geometry scan reading**). **The `5` classes:** a `file`-flagged node with one subscriber · with several · with a subtree-opted ancestor subscriber · a `mem`/`temp`-flagged node · a link whose target is already severed (the idempotence positive control). **The `4` scan corpora:** `store-core-graph.ts` · `store-graph-references.ts` · the test file · a synthetic corpus carrying a banned token and a magnitude claim (which MUST FAIL). |
| **`P-GR-TP-6`** | `P-TP` totality | **THE IMPORT / NO-MODULE-LEVEL-BINDING CENSUS: `store-core-graph.ts` carries EXACTLY ONE non-type import (`./store-graph-references.js`), `store-graph-references.ts` imports nothing, NEITHER imports the vendored package or `src/main/**` or the held modules, and NEITHER carries a module-level mutable binding holding a store, a graph, a register, a cache, a listener set or the seam flag.** | **YES** | `R-11`, `R-12` (read as **`§3.4 R-11`** — the import census — and **`§3.4 R-12`** — the module-level-binding half; `§3.4`'s head note fixes the form), `I-13`, `§2.1` item 1 | `S-GR-CENSUS-1` | **`15` attempts** = **`5` fixtures × `3` censuses** (the import statements · the top-level declarations · the module-level bindings). **The `5` fixtures:** the two real modules · a fixture adding a second import statement · a fixture importing `src/main/**` · a fixture with a module-scope store binding. |
| **`P-GR-TP-7`** | `P-TP` totality | **THE MERGED READ AND ITS `parts` SURVIVE AND ARE TOTAL: for EVERY merged drive, `parts` is NON-EMPTY and ORDERED by the overlay order (`file` → `mem` → `temp`); every entry names THE PATH THE TIER ACTUALLY HOLDS and NEVER the read path; `tier` is `null` and `merged` is `true`; `cache` is `null`; the value is a composite no node holds; and a merge runs ONLY where NO node holds the read path.** | **YES** | `M-5`, `F-8`, `I-3`, `I-17`, `§2.5` item 4 | `S-GR-MERGE-1` | **`24` attempts** = **`6` merge shapes × `4` claims**. **The `6` shapes:** a `file`-held child only · a `file`-held child plus a `temp`-held grandchild · the same path held in `file` AND `temp` (the overlay wins by the durability order) · the same path held at TWO tiers AND a descendant held (the first-hit boundary) · a node holding the read path with a held descendant (**no merge runs**) · a cold item with NO held descendant (the miss). **The `4` claims:** `parts`' ORDER · `parts`' PATH identity · the `tier`/`merged`/`cache` triple · the value's non-authoritative status. |

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S CLARIFICATION) — THE ONE ROW OF THIS TABLE THE RULING RE-STATES, ITS AS-FILED PROPERTY KEPT VISIBLE IN THE TABLE ABOVE AND ITS TERM LEFT AT `6`.** **`P-GR-IM-4` now reads: *"THE REGISTER'S PROJECTION IDENTITY: for EVERY state, **THE COUNT OF REGISTER ROWS EQUALS THE COUNT OF ROOT (PARENTLESS) NODES** — a row exists for a root or not at all — **EVERY row's `derived` is `true`**, and **A COLD ITEM HAS NO ROW**: it is a root name with no row yet, and the row's ABSENCE is the assertion."* **The two as-filed readings the ruling moves to the assertion side are named so the move is not silent: *"the count of `derived:true` register rows"* becomes *"the count of register rows"* (the same set — every row is `derived:true`), and *"every cold item is `derived:false` with `nodeRef:null`"* becomes *"a cold root name has NO row"*.** **WHAT DOES NOT CHANGE: the row's drives, its strategy id `S-GR-PROJ-1`, its `6` register states, and its term — `6` attempted, `6` declared, one reading per state, with the parentless-node count and the cold-item reading asserted BESIDE the row count; the as-filed `3`-reading form was the as-filed drive form's and is NOT re-derived here (`§7a.1` item 5 is the only default the ruling moves).** **AND THE FIXTURE ABOVE IS READ UNDER THE SAME RULING: its caller-declared input is taken as the CALLER'S TOP-LEVEL NAME DECLARATIONS (`§2.4` item 8's annotation), its register-side states are the ROOT rows those names produce, and no entry of it is counted as a register row below a root — because the register holds nothing below a root.** **No row was added, dropped or merged: this table still carries `21` rows, and `§5.5.3`'s `233` stands with its printed terms.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the block above stands byte-for-byte, and every row of the table above it keeps its bytes). TWO ROWS ARE MOVED BY THE ARCHITECT'S FIRST AMENDMENT (`A1`) AND TWO COUNTS ARE MOVED BY THE SECOND (`A2`); BOTH ARE PRINTED HERE, AND NEITHER MOVED ROW'S TERM MOVES.** **(1) `P-GR-IM-9` — ITS AS-FILED PROPERTY READS *"the commit regenerates the whole subtree and deletes the original only on a match"*, AND ITS OPERATIVE READING ADDS THE GATES: the regenerated set is SERIALIZED to stable JSON and the SERIALIZED FORM VALIDATED before acceptance, and the deletion is reachable ONLY from an accepted crossing (`§2.8` items `5`/`6`); the row's THREE-ARM refusal set (`'rebuild-failed'` · `'serialize-failed'` · `'validate-failed'`) is ASSERTED over the same drives.** **ITS TERM IS UNMOVED at `12` = `6` subtree shapes × `2` census outcomes, because a declared term IS a drive count and the acceptance question stays binary per arm (accepted, or not accepted with the ORIGINAL ALIVE) — the third token is an ASSERTION beside the `2` outcomes, not a third outcome-drive.** **(2) `P-GR-SM-1` — ITS AS-FILED PROPERTY READS *"a closed THREE-STEP machine: `BUILD → COMPARE → (DELETE-ON-MATCH | REFUSE)`"*, AND ITS OPERATIVE READING IS A FIVE-STEP MACHINE WITH THE SAME THREE TERMINALS: `BUILD → COMPARE → SERIALIZE → VALIDATE → ACCEPT`, where ACCEPT carries the delete-on-match, and whose refusal terminal (`REFUSED-ORIGINAL-ALIVE`) is reached from any of the three arms with ONE OF THREE TOKENS.** **Its terminal set stays `3` (`REGENERATED` · `REFUSED-ORIGINAL-ALIVE` · `ANSWERED-FROM-THE-ORIGINAL`, the last being the reversibility window's own observable — `§2.5` item `5`), so its term is UNMOVED at `15` = `5` transition classes × `3` terminals, with the two added steps and the three tokens ASSERTED beside the same drives.** **NO `(bounded)` MARKING, STRATEGY ID, SEED OR CAP VALUE CHANGES FOR EITHER ROW.** **(3) THE TWO COUNTS THE SECOND AMENDMENT MOVES: THE REGISTER IS `22` ROWS (`14 + 1 + 7 = 22` ✓) WITH AN OPERATIVE DECLARED TOTAL OF `249` = `233` + `16`, printed with all twenty-two terms at `§5.5.3`'s closing block; the as-filed `21`-row / `233` figures stay visible above as the pre-amendment record, and the added row (`P-GR-IM-14`) is printed IN the table above rather than described from a distance.** **(4) THE FIXTURE ABOVE IS READ UNDER THE REGISTER CLARIFICATION AND UNDER `O-6`: its `secure` spelling is the REFUSED-CONTROL input and never a loaded row, and its caller-declared input is taken as the CALLER'S TOP-LEVEL NAME DECLARATIONS (`§2.4` item `8`'s annotation) — both readings printed at the fixture's own annotation.**

**⟶ AMENDED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-3`; `RCA-8(d)` ANNOTATE-BESIDE — `P-GR-IM-14`'s as-filed property cell in the table above, its strategy cell and the closing amendment block above this clause ALL STAND BYTE-FOR-BYTE, its TERM `16` included, and this clause is that row's OPERATIVE READING of the `secure`-involving half of its drive.)**

**THE CONTRADICTION, NAMED WITH ITS TWO SITES RATHER THAN LEFT TO A READER: the row's cell and the block above say the `7` `secure`-involving `(parent, child)` pairs are *"each DECIDED as a refusal because `secure` carries no graph node"*, while `§2.4` item 7(b) — the register's own write-side precedence — decides a `secure.*` name `'secure-refused'` BEFORE the register is consulted and BEFORE any traversal, and `§2.4` item 5(b)'s annotation states that NO register row can carry a `secure` name IN ANY STATE.** **A reader who takes that sentence to mean the seven answer the row's OWN declared token, `'durability-inversion'`, is contradicted by the contract's own precedence — and the drive cannot even begin: the pair's PARENT is named by a `secure.*` spelling, so the parent node the invariant would be read against CANNOT EXIST.**

**THE OPERATIVE READING, WITH THE TOKEN PER DIRECTION — THE PAIR CLASSES PRINTED WITH THEIR TERMS. THE `16` DRIVES ARE UNMOVED (`4` tokens × `4` tokens ✓), and they are printed here in TWO decompositions so neither is read alone: by LEG (`9` state-machine + `7` totality) and by OBSERVED OUTCOME (`3` + `7` + `6`), below.**

**(a) THE `9` ORDERED PAIRS OF THE ORDERED THREE (`file` · `mem` · `temp`) — THE ONLY PAIRS THAT CARRY THE ROW'S OWN DECLARED TOKEN.** **`3` of them are INVERSIONS — `(parent mem, child file)` · `(parent temp, child file)` · `(parent temp, child mem)` — and each is REFUSED `'durability-inversion'`, carrying the declared record (`cleared: []` · `repaired: []` · `rows: []` · `crossings: 0` · `events: 0`) with the store LEFT COMPLETELY UNCHANGED.** **The other `6` — the `3` EQUAL pairs plus the `3` DESCENDING pairs `(file, mem)` · `(file, temp)` · `(mem, temp)` — are NOT REFUSALS AT ALL: the mint COMMITS and the invariant HOLDS.** **`3` + `6` = `9` ✓.**

**(b) THE `4` PAIRS WITH `secure` AS THE PARENT — `'secure-refused'`, AND VACUOUS-WITH-REASON.** **`(secure, file)` · `(secure, mem)` · `(secure, temp)` · `(secure, secure)`: the drive's own first act would be minting the PARENT, whose spelling is a `secure.*` name, and `§2.4` item 7(b) — with `§2.4` item 5(b)'s annotation and `§2.3` item 1 — decides it `'secure-refused'` BEFORE the register and BEFORE any traversal, so THE PARENT NODE CANNOT EXIST AND THE PAIR HAS NO SUBJECT.** **THE PAIR IS THEREFORE VACUOUS-WITH-REASON (the reason: no graph node carries `secure` — `GraphNodeFlag` is `'temp' | 'mem' | 'file'`, and `secure` is a separate main-side collection outside the ordering), AND THE TOKEN A DRIVE OBSERVES IS `'secure-refused'` — NEVER `'durability-inversion'`.**

**(c) THE `3` PAIRS WITH `secure` AS THE CHILD AND A NON-`secure` PARENT — `'secure-refused'`, AND VACUOUS-WITH-REASON, IDENTICALLY.** **`(file, secure)` · `(mem, secure)` · `(temp, secure)`: the CHILD cannot be minted as a graph node at all (same reason as `(b)`), and the only route to naming it at the generic surface is a `secure.*` spelling, refused `'secure-refused'` at `B-SECURE-GATE` (`§2.3` item 1; `§2.5` item 2's precedence; `§3.2` `F-14`).** **The pair is VACUOUS-WITH-REASON for the same reason, and its observed token is the same.**

**(d) THE DOUBLE-COUNT, PRINTED SO THE `7` IS CHECKABLE RATHER THAN ASSERTED: `(secure, secure)` is the ONE pair both directions name, so `4` (secure as parent) + `3` (secure as child over a non-`secure` parent) = `7` ✓ — equivalently the row's own `4 + 4 − 1 = 7` ✓, the `1` being that shared pair, which is itself VACUOUS-WITH-REASON and itself decides `'secure-refused'`.**

**THE OUTCOME TABLE, IN ONE LINE, SO NO DIRECTION IS READ OFF A PROSE SENTENCE: `'durability-inversion'` — the `3` INVERSION pairs of `(a)`, AND NOTHING ELSE; `'secure-refused'` — the `7` `secure`-involving pairs of `(b)`/`(c)`, every one of them, decided at `B-SECURE-GATE`; VACUOUS-WITH-REASON (NO SUBJECT) — the same `7`, every one of them; NO REFUSAL AT ALL — the `6` non-inversion pairs of `(a)`.** **`3 + 7 + 6 = 16` ✓ — one drive per pair, and the three classes PARTITION the drives, so no pair is counted twice and none is left out.**

**WHAT MOVES AND WHAT DOES NOT, PRINTED SEPARATELY SO THE AMENDMENT'S EXTENT IS COUNTABLE.** **UNMOVED: the row's id (`P-GR-IM-14`) · its declared type (`P-IM` invariant) · its strategy id (`S-GR-PERSIST-1`) · its TERM `16` · its `4` × `4` drive form · its positive control (a DOWNWARD re-tier of a whole subtree — LEGAL) · its negative control (a child minted or regenerated ABOVE its parent's flag — REFUSED `'durability-inversion'`, store unchanged) · its reads (the node's own `parentLink` and the two flags — never a name, never a register row, never a tier token) · the invariant it drives (`durability(child) ≤ durability(parent)` under `file` > `mem` > `temp`, `secure` outside the ordering and carrying no graph node) · its vacuity at a root · and the ONE arm on the write surface that carries `'durability-inversion'`, `§2.4` item 7(h), with its two sites (`§2.8` items `3`/`5`).** **MOVED — THIS ROW'S `secure`-HALF READING ONLY: the token a `secure`-involving pair observes is `'secure-refused'`; the pair is VACUOUS-WITH-REASON rather than a refusal by the invariant; and the `7` therefore counts VACUOUS DRIVES whose observed token is the SECURE GATE'S, not invariant violations.** **NO TOKEN IS ADDED TO OR REMOVED FROM THE REFUSAL UNION, and the union's operative count stays `SIXTEEN` (`§2.1`'s block annotation: `8` held + `5` this contract's amendment + `3` the two architect amendments).** **⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S RULING ON THE INTERACTION PRECONDITION): THAT COUNT IS STILL `SIXTEEN` AFTER THE RULING — `8 + 5 + 3 = 16` ✓ — because the withdrawn `§2.7` item 6 precondition REMOVES AN ARM AND NO MEMBER: its token `'malformed-pattern'` is a HELD member with a surviving site (`§2.4` item 5(f), carried at item `7`(g)).** **This row, its `secure`-half reading, its term `16`, its `4` × `4` form and its strategy id `S-GR-PERSIST-1` are UNMOVED (`§2.1`'s block annotation's clause `(3)`; `§5.5.3`'s closing block item `(13)`).**

**THE TOTAL, RE-PRINTED WITH ALL TWENTY-TWO TERMS BECAUSE THIS AMENDMENT MUST SHOW IT MOVED NOTHING: `249` = `6` (`P-GR-IM-1`) + `12` (`P-GR-IM-2`) + `6` (`P-GR-IM-3`) + `6` (`P-GR-IM-4`) + `12` (`P-GR-IM-5`) + `12` (`P-GR-IM-6`) + `12` (`P-GR-IM-7`) + `7` (`P-GR-IM-8`) + `12` (`P-GR-IM-9`) + `4` (`P-GR-IM-10`) + `4` (`P-GR-IM-11`) + `6` (`P-GR-IM-12`) + `40` (`P-GR-IM-13`) + `16` (`P-GR-IM-14`) + `15` (`P-GR-SM-1`) + `24` (`P-GR-TP-1`) + `16` (`P-GR-TP-2`) + `6` (`P-GR-TP-3`) + `6` (`P-GR-TP-4`) + `10` (`P-GR-TP-5`) + `5` (`P-GR-TP-6`) + `12` (`P-GR-TP-7`), with the chain `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249` ✓ — TWENTY-TWO TERMS, UNCHANGED.** **Per-row maximum is STILL `40` (`P-GR-IM-13`) and the caps comparison is STILL `249 ≤ 400` ✔ · `40 ≤ 100` ✔.** **AND THE SITES THAT PRINT THIS ROW'S CLAIM ARE RECONCILED IN THIS SAME PASS: the row's own cell and the closing block above keep their as-filed bytes and are read under this clause; `§5.5.3`'s closing block gains item `(12)`, which prints the unchanged total with its terms and disposes the sites this pass touched; and the seam extension's own clause (`§2.1`'s block annotation, `TW-1`/`TW-2`) states why it, too, moves no term.** **A ROW OR A PASS THAT PRINTS `249` WITHOUT ITS TERMS, OR THAT PRINTS ANY FIGURE OTHER THAN `249` FOR THIS REGISTER, FAILS `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.**

**⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`, FOLDED IN BY THE WITHDRAWAL PASS; `RCA-8(d)` ANNOTATE-BESIDE — EVERY ROW OF THE TABLE ABOVE, EVERY ANNOTATION AFTER IT AND EVERY BYTE OF THE `TW-3` CLAUSE AND OF THE RE-PRINTED TOTAL STAND). `ONE` ROW'S SUBJECT WAS THE MERGED READ AND IS RE-DERIVED HERE; NOT ONE OTHER ROW'S PROPERTY, TYPE, ID, PHASE OR TERM IS TOUCHED.**
**(1) THE ROW, NAMED SO IT IS NOT CONFUSED WITH ITS NEIGHBOUR: THE ROW WHOSE SUBJECT WAS THE MERGED READ IS `P-GR-TP-7` — *"THE MERGED READ AND ITS `parts` SURVIVE AND ARE TOTAL"*, as-filed term `24` = `6` merge shapes × `4` claims, corrected term `12` = `6` merge shapes × `2` drives.** **`P-GR-TP-4` IS **NOT** THAT ROW: `P-GR-TP-4` is THE EXPORT'S SNAPSHOT TOTALITY (`6` = `6` export shapes × `1` drive), and a pass that re-derives `P-GR-TP-4` for the merged read would be re-deriving the wrong row.**
**(2) `P-GR-TP-7` RE-DERIVED — SUBJECT: THE NODE-LOCAL TIER READING.** **THE PROPERTY, IN OPERATIVE FORM: *FOR EVERY NODE A CALLER RECEIVES — the node itself, or a clone or a reference of it passed to the function calling the read — THE TIER THE CALLER IDENTIFIES IS THE NODE'S OWN `flag`, READ FROM THAT NODE: a HIT's answer carries the resolved node's own flag; a QUALIFIED read's diagnostic names the node's own flag AND the flag the token asked for; a MISS asserts NO tier (`tier:null`); and NO TIER LABEL IS EVER RESTATED BY THE STORE FROM THE CALLER'S TOKEN. The POSITIVE CONTROL is that a store which restated the token as the node's tier — or which composed a tier the graph does not carry — FAILS the same drive on the SAME node under a DISAGREEING token.*** **`§2.3` item `1` (the token is a FILTER, not a name part), `§2.3` items `2`/`6`(iii)/`6`(iv)/`7`, `§2.1`'s `GraphNode` block (`flag` is *"the ONLY residency carrier"*), `§2.5` item `4`.** **ITS STRATEGY ID IS UNMOVED: `S-GR-MERGE-1` stays the row's own id — a strategy id is one opaque `S-GR-*` label per row and the register's strategy-id count stays `22` — and its `MERGE` mnemonic is recorded here as the label of the row's SURVIVING subject rather than renamed by a sweep.**
**(3) ITS TERM IS RE-DERIVED, NOT PRESERVED: `12` = `6` SUBTREE SHAPES × `2` READINGS, and the coincidence with the corrected column's earlier `12` is stated rather than relied on, because the two `12`s rest on DIFFERENT subjects and DIFFERENT factors.** **THE `6` SHAPES: (i) a leaf the read resolves (its own flag) · (ii) an interior node with a written descendant (the node's own flag, and the descendant's own flag read one by one) · (iii) a node whose flag AGREES with the token (the HIT) · (iv) the SAME node under a DISAGREEING token (the QUALIFIED read: the diagnostic names the node's own flag and the token) · (v) the DECLARED-BUT-UNWRITTEN parent with a WRITTEN CHILD (the MISS: the descendant's own flag is still read from the descendant) · (vi) a REGENERATED node (a NEW `ref` carrying its own flag after a downward re-tier).** **THE `2` READINGS: (a) THE NODE-LOCAL READING — the flag the answer carries (`tier`/`flag`) compared against the `flag` of the node the walk reached, read through the test-only reader `nodeFor` (`§2.1`'s block annotation item `(4)`) · (b) THE NO-RESTATED-LABEL READING — every tier the answer or the diagnostic names is TRACEABLE TO A NODE'S OWN `flag` (a hit's `cache.tier`, a qualified read's diagnostic `owner`'s node flag, or a miss's `tier:null` that asserts none), so a store that echoed the token FAILS the reading on the same node under the disagreeing token.** **`6 × 2 = 12` ✓ — one drive per `(shape, reading)` pair.**
**(4) ITS COMPENSATING `§3` ROWS ARE RE-DERIVED WITH THE SUBJECT: `M-5` (the re-derived case set and the miss at an unwritten parent) · `F-8` (the re-derived hit-arm boundary) · `I-3` (its first sentence: tiers compose) · `§2.3` items `1`/`2` · `§2.5` item `4`.** **`I-17` (the export) is WITHDRAWN FROM THIS ROW'S COMPENSATING SET because the export's own row is `P-GR-TP-4` and this row no longer asserts anything about a store-assembled composite.**
**(5) WHAT DOES *NOT* MOVE, PRINTED SO THE AMENDMENT'S EXTENT IS COUNTABLE: the register's ROW COUNT (`22` = `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`), its `22` strategy ids, its ONE pinned-seed generator (`S-GR-TOTAL-1`, seed `20261002`, one LCG step per draw, `pool.length = 22`), its `2` `(bounded)` markings (`P-GR-TP-1` · `P-GR-IM-12`), its per-row maximum (`40`, `P-GR-IM-13`) and EVERY OTHER ROW'S TERM.** **`P-GR-IM-13`'s cell keeps its bytes and its term `40`; its COMPARATOR's member set is re-derived at `§2.6` item `6`'s annotation (the `parts` member and its ABSENT-as-ABSENT reading go), and `P-GR-TP-4`'s export shapes keep their names and their term `6`, with the one shape that named a *"path with a resident descendant (the boundary case)"* read as the re-derived `F-8` hit-arm boundary and never as a composite.** **AND SO THE DECLARED TOTAL IS RE-PRINTED WITH ALL TWENTY-TWO TERMS AT `§5.5.3`'s closing block item `(14)`, ITS CHAIN INCLUDED, TOGETHER WITH THE SITE RECONCILIATION THIS WITHDRAWAL OWES.**

### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

1. **THE `(bounded)` SET IS `2` ROWS AND NO OTHERS: `P-GR-TP-1` and `P-GR-IM-12`.** **Every other row's property text
   quantifies over EXACTLY the domain its table carries.** **A row whose property text quantifies over a LARGER domain
   than its table carries MUST carry the marking, and it is a FAILURE to omit it.**
2. **THE COMPONENT-BREAKDOWN SIGNAL, stated so the count is not read as a trim.** **(a)** The register is `21` rows
   because the MODEL has `21` discernible testable properties; **`8` is a SIGNAL and `21` is an OUTCOME.** **(b)** The
   three families are `13` + `1` + `7` (`IM` + `SM` + `TP`), **so the breakdown signal is carried by family, named,
   rather than hidden inside a single figure.**

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — item `2` above stands byte-for-byte). ITS FIGURES ARE CORRECTED BESIDE TO `22` ROWS AND `14` + `1` + `7` (`IM` + `SM` + `TP`), with the item's own reading intact: `8` is a SIGNAL, the register's EXTENT is the OUTCOME, and the added row exists because the model has one more discernible testable property (`P-GR-IM-14`, the architect's monotonic-persistence invariant, `§2.1`'s named-invariant block) — NOT to satisfy any threshold. The `(bounded)` set, the three families' names and the *"no trim"* claim are UNMOVED.**
3. **THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING, PER ROW.** **Every row's table is a SUBSET of the input space
   THIS CONTRACT pins**, and **the check's per-row verdict is `CLEAN` for all `21`** (**⟶ ANNOTATED 2026-10-01: the check was run over the `21` rows then in the table, and its verdict STANDS FOR THOSE `21`; the register's `22`nd row, `P-GR-IM-14`, is `CLEAN` BY THE SAME DETERMINATION — its `16` drives are the four tokens' `(parent, child)` pairs, a subset of `§2.1`'s declared ordering domain and of `§2.4` item `7`'s arm set, READ rather than run, exactly as this item states its own method**) — **stated as a determination this
   filing made by READING its own tables against `§2`'s declared domains, NOT as a measurement of a run** (nothing was
   run; `CURRENT STATE` item 1).
4. **WHAT THE REGISTER DOES NOT PROVE.** **(a)** It proves nothing about the tier-1 CHANNEL (the crossing seam is
   stubbed). **(b)** It proves nothing about a rendered surface or the app. **(c)** Its pinned-seed row is a SAMPLE of a
   larger domain and is marked accordingly. **(d)** It is `[T]` evidence exactly as a `§3` row is, and **no register row
   may be read as `[H]`, `[U]`, `[D]` or APP evidence** — **with the ONE named exception of `P-GR-IM-12`'s `[H]` drive,
   which is a drive of the LOAD SYMBOLS and not a measurement of app behaviour.**
5. **THE HELD TERMS THIS REGISTER DOES NOT INHERIT, NAMED SO THE CLASS IS NOT REPEATED.** **The held register's declared
   row count (`20`) contradicts its own table's rows, and its term table covers `20` of them — so `P-SC-TP-7`'s term
   appears in the table and in no printed total** (`docs/specs/store-core.md` `§5.5.1`/`§5.5.3`; the arithmetic findings
   the record routes). **THIS REGISTER'S declared row count, its table's row ids and its printed term list are the SAME
   quantity, counted three ways: `21` = `21` = `21`, and `13 + 1 + 7 = 21` ✓.** (**⟶ ANNOTATED 2026-10-01: the identity is UNMOVED IN FORM AND CORRECTED BESIDE IN FIGURE — counted three ways the register is now `22` = `22` = `22`, and `14 + 1 + 7 = 22` ✓, because the architect's monotonic-persistence amendment adds `P-GR-IM-14`; the identity's METHOD (declared row count = table row ids = printed term list) is exactly what this item pins, and the added row's term `16` is printed in the register's operative total at `§5.5.3`'s closing block**)** **A later pass that re-prints a bare
   total after a re-grain, or that lets a term fall outside its own row set, FAILS `S-3`.**

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

| The row | Its declared term |
| --- | --- |
| `P-GR-IM-1` | **`24`** = `6` operations × `4` node classes |
| `P-GR-IM-2` | **`36`** = `6` operations × `6` anchor/flag reads |
| `P-GR-IM-3` | **`24`** = `6` pairs × `4` drive forms |
| `P-GR-IM-4` | **`18`** = `6` register states × `3` readings |
| `P-GR-IM-5` | **`24`** = `6` invalidating operations × `4` entry classes |
| `P-GR-IM-6` | **`24`** = `6` refusal arms × `4` halves |
| `P-GR-IM-7` | **`30`** = `6` precedence classes × `5` drive forms |
| `P-GR-IM-8` | **`21`** = `7` failure arms × `3` diagnostic readings |
| `P-GR-IM-9` | **`18`** = `6` subtree shapes × `3` census outcomes |
| `P-GR-IM-10` | **`12`** = `4` seam members × `3` states |
| `P-GR-IM-11` | **`12`** = `4` operations × `3` flag readings |
| `P-GR-IM-12` | **`18`** = `3` states × `6` drive steps *(bounded)* |
| `P-GR-IM-13` | **`20`** = `5` store states × `4` calls |
| `P-GR-SM-1` | **`15`** = `5` transition classes × `3` terminals |
| `P-GR-TP-1` | **`24`** = `6` pinned-seed draws × `4` arm drives *(bounded)* |
| `P-GR-TP-2` | **`24`** = `8` hostile inputs × `3` drives |
| `P-GR-TP-3` | **`6`** = `3` caps × `2` halves |
| `P-GR-TP-4` | **`18`** = `6` export shapes × `3` claims |
| `P-GR-TP-5` | **`20`** = `5` severance classes × `4` corpora-and-events readings |
| `P-GR-TP-6` | **`15`** = `5` fixtures × `3` censuses |
| `P-GR-TP-7` | **`24`** = `6` merge shapes × `4` claims |

**THE TERM-BY-TERM ADDITION, so a mis-sum is visible to a reader without arithmetic of their own:**
**`24 → 60 → 84 → 102 → 126 → 150 → 180 → 201 → 219 → 231 → 243 → 261 → 281 → 296 → 320 → 344 → 350 → 368 → 388 → 403 →
427`.** **THEREFORE THE DECLARED TOTAL IS `427`, AND `427 ≤ 400` IS FALSE.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed table, its chain and its written-out terms above stand byte-for-byte). THE AS-FILED COLUMN HAS `21` ROWS BECAUSE IT IS THE PRE-AMENDMENT RECORD, AND THE REGISTER IT DESCRIBES IS NOW `22`: the added row `P-GR-IM-14` HAS NO AS-FILED FORM AT ALL — it is an ADDITION, not a correction — so it appears in NEITHER this `427` chain NOR the corrected `233` chain, and both chains' own `21`-term sums are UNMOVED.** **WHAT THIS BUYS THE ARITHMETIC, STATED SO IT IS CHECKABLE: the amended register's row census is `3` agreement rows + `18` corrections + `1` addition = `22` rows (`3 + 18 + 1 = 22` ✓), and the operative twenty-two-term total is `233` + `16` = `249`, printed at the closing block's item `(8)` below.** **NO CELL ABOVE IS REWRITTEN, and the `427 ≤ 400` verdict above remains the AS-FILED verdict, kept visible under `S-3`.**

**⟶ THE CAPS ARE THEREFORE NOT SATISFIED BY THIS REGISTER AS ITS ROWS ARE DRAWN, AND THE CORRECTION IS STATED BESIDE THE
AS-FILED FORM RATHER THAN SMOOTHED (`S-3`; `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).** **THE DRIVE FORMS ARE
THEREFORE RE-DERIVED to bring the total within the cap, with the CORRECTED column printed BESIDE each as-filed term and
NO ROW'S property, case set or `(bounded)` marking moved:**

| The row | Its AS-FILED term, kept visible | **The CORRECTED drive form, which is the term the caps are compared against** |
| --- | --- | --- |
| `P-GR-IM-1` | *`24` = `6` operations × `4` node classes* | **`6`** = `6` operations × `1` node class — **the tree invariant is read on the WHOLE graph after each operation, so the `4` node classes are ASSERTIONS over the same `6` drives** |
| `P-GR-IM-2` | *`36` = `6` operations × `6` reads* | **`12`** = `6` operations × `2` reads — the anchor/flag reads are `6` ASSERTIONS per drive |
| `P-GR-IM-3` | *`24` = `6` pairs × `4` forms* | **`6`** = `6` pairs × `1` commit — the EDIT/REFUSE/second-tier forms are ASSERTIONS over the same drives |
| `P-GR-IM-4` | *`18` = `6` states × `3` readings* | **`6`** = `6` register states × `1` reading — the two further readings are ASSERTIONS |
| `P-GR-IM-5` | *`24` = `6` operations × `4` classes* | **`12`** = `6` operations × `2` reads — the register entry and the link entry in ONE drive each, with the two untouched-entry controls as ASSERTIONS |
| `P-GR-IM-6` | *`24` = `6` arms × `4` halves* | **`12`** = `6` arms × `2` halves (the refusal drive and its positive control); the absence-of-store and re-order drives are ASSERTIONS |
| `P-GR-IM-7` | *`30` = `6` classes × `5` forms* | **`12`** = `6` classes × `2` forms (the read-side drive and the write-side drive); the other three forms are ASSERTIONS |
| `P-GR-IM-8` | *`21` = `7` arms × `3` readings* | **`7`** = `7` arms × `1` drive — the three diagnostic readings are ASSERTIONS over each drive |
| `P-GR-IM-9` | *`18` = `6` shapes × `3` outcomes* | **`12`** = `6` shapes × `2` census outcomes (matched · mismatched); the corroborating reading is an ASSERTION |
| `P-GR-IM-10` | *`12` = `4` members × `3` states* | **`4`** = `4` members × `1` drive |
| `P-GR-IM-11` | *`12` = `4` operations × `3` readings* | **`4`** = `4` operations × `1` drive |
| `P-GR-IM-12` | *`18` = `3` states × `6` steps* | **`6`** = `3` states × `2` drives (the two loads) — the four further steps are ASSERTIONS |
| `P-GR-IM-13` | *`20` = `5` states × `4` calls* | **`40`** = `5` states × `4` calls × **`2` runs** — **each run IS a drive, so this row's corrected term is LARGER than its as-filed form** |
| `P-GR-SM-1` | *`15` = `5` classes × `3` terminals* | **`15`** = `5` transition classes × `3` terminals (unchanged — each (class, terminal) pair is its own drive) |
| `P-GR-TP-1` | *`24` = `6` draws × `4` drives* | **`24`** = `6` draws × `4` arm drives *(bounded)* (unchanged) |
| `P-GR-TP-2` | *`24` = `8` inputs × `3` drives* | **`16`** = `8` inputs × `2` drives (the resolve and the write); the dictionary reading is an ASSERTION |
| `P-GR-TP-3` | *`6` = `3` caps × `2` halves* | **`6`** (unchanged) |
| `P-GR-TP-4` | *`18` = `6` shapes × `3` claims* | **`6`** = `6` export shapes × `1` export drive |
| `P-GR-TP-5` | *`20` = `5` classes × `4` readings* | **`10`** = `5` classes × `2` drives (the severance and the scan) |
| `P-GR-TP-6` | *`15` = `5` fixtures × `3` censuses* | **`5`** = `5` fixtures × `1` census |
| `P-GR-TP-7` | *`24` = `6` shapes × `4` claims* | **`12`** = `6` merge shapes × `2` drives; the four claims are ASSERTIONS |

**THE CORRECTED TERM-BY-TERM ADDITION: `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 154 → 178 →
194 → 200 → 206 → 216 → 221 → 233`.** **THEREFORE THE DECLARED TOTAL IS `233`, PRINTED WITH ITS TWENTY-ONE TERMS:
`233` = `6` (`P-GR-IM-1`) + `12` (`P-GR-IM-2`) + `6` (`P-GR-IM-3`) + `6` (`P-GR-IM-4`) + `12` (`P-GR-IM-5`) + `12`
(`P-GR-IM-6`) + `12` (`P-GR-IM-7`) + `7` (`P-GR-IM-8`) + `12` (`P-GR-IM-9`) + `4` (`P-GR-IM-10`) + `4` (`P-GR-IM-11`) + `6`
(`P-GR-IM-12`) + `40` (`P-GR-IM-13`) + `15` (`P-GR-SM-1`) + `24` (`P-GR-TP-1`) + `16` (`P-GR-TP-2`) + `6` (`P-GR-TP-3`) +
`6` (`P-GR-TP-4`) + `10` (`P-GR-TP-5`) + `5` (`P-GR-TP-6`) + `12` (`P-GR-TP-7`).**

**CAPS, COMPARED AGAINST THE CORRECTED (DECLARED) FIGURES: `233 ≤ 400` ✔ · per-row maximum `40` (`P-GR-IM-13`) ≤
`100` ✔ · stop-after-5-consecutive-failures: NOT TRIGGERED at filing (nothing ran) — the status is the DONE row's to
report.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — the corrected table, its chain, its written-out terms and its caps paragraph above stand byte-for-byte). THESE CORRECTED FIGURES ARE THE PRE-AMENDMENT REGISTER'S AND ARE NOW ONE ROW SHORT OF THE OPERATIVE ONES: the corrected column's `21` terms sum to `233`, and its `233 ≤ 400` ✔ with per-row `40` (`P-GR-IM-13`) ≤ `100` ✔ remains TRUE for the twenty-one rows it covers.** **THE OPERATIVE PAIR AFTER THE FOLDED-IN AMENDMENTS IS `22` ROWS / `249` = `233` + `16` — printed with all twenty-two terms and the caps comparison at the closing block's items `(7)`–`(9)` below, which do NOT re-grain this table: `249 ≤ 400` ✔, and the per-row maximum is STILL `40` (`P-GR-IM-13`) ≤ `100` ✔, because the added row's term `16` lies below the existing maximum.** **The stop-after-5-consecutive-failures status and the rule that an un-run register row is a FAILURE are UNMOVED, and `P-GR-IM-14` is a row like any other for that rule.**

**AND THE HONEST SENTENCE, STATED RATHER THAN LEFT TO A READER: what was corrected is the DRIVE FORM each cell prints
(assertions moved BESIDE their drives, per `A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`); NO ROW'S property, enumerated case
set or `(bounded)` marking moved, and NO row was dropped, merged or added to reach the total.** **The as-filed forms are
KEPT VISIBLE above, per `S-3`, because a table that silently rewrote its own arithmetic would be repeating the defect
class this successor exists to leave behind.**
**`P-GR-SM-1`, `P-GR-TP-1`, `P-GR-TP-3` and the four rows whose as-filed and corrected forms agree are NOT corrections at
all: their as-filed term was already a DRIVE count, and they are printed in the corrected column unchanged.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, `O-5`; `RCA-8(d)` ANNOTATE-BESIDE — the sentence above stands byte-for-byte). THE *"FOUR ROWS"* CLAUSE IS CORRECTED BESIDE: THE AGREEMENT SET IS `3`, AND THE THREE ROWS THE SENTENCE ITSELF NAMES ARE THAT WHOLE SET — there is no second, unnamed set of four.** **THE AGREEMENT SET, PRINTED WITH ITS TERMS: `3` of the `21` as-filed rows — `P-GR-SM-1` (`15` = `15`), `P-GR-TP-1` (`24` = `24`) and `P-GR-TP-3` (`6` = `6`) — read column against column in the two tables above; hence `21 − 3 = 18` rows ARE corrections, and the sentence's `3 + 4` reading would have claimed `7` agreements against a `21`-row table that contains `3`.** **The correction is a FIGURE correction and nothing else: the sentence's substantive claim — that a row whose as-filed term was already a DRIVE count is NOT a correction and is printed unchanged — is TRUE and is what the three named rows exemplify.** **AND WITH THIS PASS'S ADDED ROW THE CENSUS IS `3` + `18` + `1` = `22` (`3` agreements, `18` corrections, `1` addition — `P-GR-IM-14`, which has no as-filed form and is therefore neither an agreement nor a correction), so a later pass that re-prints this sentence must print the agreement set as `3`, the correction set as `18` and the addition as `1`.**

**⟶ ENUMERATED AND RECONCILED 2026-10-01 (THE DOCS-REPAIR PASS) — THE REGISTER'S TERMS, COUNTED ONCE HERE FROM THIS FILE'S OWN `§5.5.1` TABLE; THE TWO SUMS, EACH PRINTED WITH ITS TERMS; WHICH IS OPERATIVE, AND WHY; AND EVERY SITE IN THIS FILE THAT PRINTS A REGISTER ATTEMPT TOTAL OR A PER-ROW MAXIMUM, DISPOSITIONED. NOT ONE BYTE ABOVE IS REWRITTEN AND NO TERM, ROW, STRATEGY ID, SEED OR CAP VALUE MOVES (`RCA-8(d)`).**

**(1) THE `21` ROWS AND THEIR TERMS AS `§5.5.1`'s TABLE PRINTS THEM — the table's last column, read cell by cell, each term printed with its own factors:** **`P-GR-IM-1` `24` (`6` operations × `4` node classes) · `P-GR-IM-2` `36` (`6` operations × `6` anchor/flag reads) · `P-GR-IM-3` `24` (`6` pairs × `4` drive forms) · `P-GR-IM-4` `18` (`6` register states × `3` readings) · `P-GR-IM-5` `24` (`6` invalidating operations × `4` entry classes) · `P-GR-IM-6` `24` (`6` refusal arms × `4` halves) · `P-GR-IM-7` `30` (`6` precedence classes × `5` drive forms) · `P-GR-IM-8` `21` (`7` failure arms × `3` diagnostic readings) · `P-GR-IM-9` `18` (`6` subtree shapes × `3` census outcomes) · `P-GR-IM-10` `12` (`4` seam members × `3` states) · `P-GR-IM-11` `12` (`4` operations × `3` flag readings) · `P-GR-IM-12` `18` (`3` states × `6` drive steps) · `P-GR-IM-13` `20` (`5` store states × `4` calls) · `P-GR-SM-1` `15` (`5` transition classes × `3` terminals) · `P-GR-TP-1` `24` (`6` pinned-seed draws × `4` arm drives) · `P-GR-TP-2` `24` (`8` hostile inputs × `3` drives) · `P-GR-TP-3` `6` (`3` caps × `2` halves) · `P-GR-TP-4` `18` (`6` export shapes × `3` claims) · `P-GR-TP-5` `20` (`5` severance classes × `4` corpora-and-events readings) · `P-GR-TP-6` `15` (`5` fixtures × `3` censuses) · `P-GR-TP-7` `24` (`6` merge shapes × `4` claims).** **Every cell was READABLE at its own row: no cell of this table had to be left unread, and no figure below is inferred from a row id.**

**(2) THE SUM OF THE TABLE'S TWENTY-ONE TERMS, WITH ITS TERMS: `427` = `24` + `36` + `24` + `18` + `24` + `24` + `30` + `21` + `18` + `12` + `12` + `18` + `20` + `15` + `24` + `24` + `6` + `18` + `20` + `15` + `24` — twenty-one terms, and this file's own as-filed chain reaches `427` from the same figures (`24 → 60 → … → 388 → 403 → 427`).**

**(3) THE SUM THE AS-FILED DRIVE FORMS PRODUCE, WITH ITS TERMS: `427` — and it is THE SAME TWENTY-ONE FIGURES, row for row and id for id.** **The as-filed column of this section's own first table prints `24` · `36` · `24` · `18` · `24` · `24` · `30` · `21` · `18` · `12` · `12` · `18` · `20` · `15` · `24` · `24` · `6` · `18` · `20` · `15` · `24` — identical, term for term, to `§5.5.1`'s column enumerated at (1). SO THE TWO SUMS THIS BLOCK NAMES ARE ONE FIGURE, `427`, AND `427 ≤ 400` IS FALSE.** **A reader who expected the two sums to DIFFER is directed to (6): this reconciliation turns on the ABSENCE of that difference, not on its presence — the table's terms ARE the as-filed forms, and the operative total is a third reading (`233`) whose terms are the CORRECTED column's.**

**(4) WHICH IS OPERATIVE, AND WHY: `233` IS OPERATIVE, WITH ITS TERMS — `233` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12` (the CORRECTED column above, twenty-one terms, `233 ≤ 400` ✔), with per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔.** **WHY: a declared term IS a DRIVE count (`A-DECLARED-REGISTER-TERM-IS-A-DRIVE-COUNT`), and the correction moved assertions BESIDE their drives while moving no property, no case set and no `(bounded)` marking; this section's own caps paragraph compares the caps against the CORRECTED figures.** **THE TABLE'S `427` IS THEREFORE THE AS-FILED (PRE-CORRECTION) TOTAL AND IS NOT THE OPERATIVE ONE — it is the figure this file keeps VISIBLE under `S-3` rather than smoothing away.**

**(5) THE SITE RECONCILIATION — every site in this file that prints a register attempt total or a per-row maximum, each named by section/block and dispositioned. No site is silently rewritten; the two that print a superseded figure are corrected BESIDE, and the rest are listed as AGREEING:**

| The site (by section / block) | What it prints | Disposition |
| --- | --- | --- |
| `CURRENT STATE` item `3` | `389` declared attempts · `389 ≤ 400` · per-row maximum `36` (`P-GR-IM-2`) | **CORRECTED BESIDE** — `389` is no term set's sum (neither `427` nor `233`); the operative pair is `233` / `40` (`P-GR-IM-13`); the dated annotation sits at that item, whose bytes are kept |
| `§5.5.1`'s object-naming note | `233` declared attempts, *"printed WITH their twenty-one terms … at `§5.5.3`"* | **CORRECTED BESIDE** — `233` IS the operative total and its terms are this section's CORRECTED column's; the table BELOW that note prints the twenty-one AS-FILED terms (sum `427`), so the note's terms are at `§5.5.3` and not in the table it heads (finding (6)) |
| `§5.5.1`'s table (the `21` rows) | the twenty-one as-filed terms, summing `427` | **THE AS-FILED RECORD, KEPT AND ENUMERATED** at (1)–(3) above; identical term-for-term to this section's as-filed column; the re-grain that would print the operative terms IN the table is finding (6) |
| `§5.5.2` item `2` | `21` rows · `13` + `1` + `7` = `21` | **AGREEING** — a row and family census; no attempt total and no per-row maximum printed |
| `§5.5.2` item `5` | `21` = `21` = `21` (declared row count, table row ids, printed term list) | **AGREEING** — its claim is a ROW-COUNT identity and the printed term list does carry twenty-one terms; it asserts no figure agreement, so the `427`-versus-`233` split is finding (6)'s and does not refute this clause |
| `§5.3` item `10` | the `≤400` total cap and the `≤100` per-row cap | **AGREEING** — the caps are named and no figure is printed |
| `§5.3` item `11` | *"printed WITH its per-row terms"* · *"the declared term is a DRIVE count"* | **AGREEING** — the rule that makes `233` operative; no figure printed |
| `§5.2` item `3` | `≤100` per row · `≤400` in total | **AGREEING** — the caps' values only |
| `§5.5.3`, the as-filed table and its chain | `427` · *"`427 ≤ 400` IS FALSE"* | **AGREEING** — the site that pins the as-filed sum and its arithmetic, kept visible under `S-3` |
| `§5.5.3`, the corrected table, its chain and its written-out terms | `233` with its twenty-one terms | **AGREEING — and OPERATIVE** |
| `§5.5.3`'s caps paragraph | `233 ≤ 400` ✔ · per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔ | **AGREEING — the site that pins the operative figures** |
| `§6`'s clarification block (the object-naming clause) | `§5.5.1`'s `21` rows / `233` declared attempts | **AGREEING, bare total annotated beside** — `233` is operative and carries its terms at this section's corrected column; per-row maximum `40` |
| `§7` item `7` | `21` rows · `233` declared attempts · as-filed `427` | **AGREEING, annotated beside** — the `233` and its agreeing terms are the corrected column's, and the as-filed `427` is named as kept |
| the file-end line | a `21`-row register whose `233` declared attempts are the sum of their own printed terms | **AGREEING** — the corrected column's terms |
| `§6.4`'s overflow arithmetic | `16` + `1` = `17` | **OUT OF CLASS** — the overflow list's entries, not a register attempt total |
| `§2.4`'s caps (`RCAP-1`/`RCAP-2`/`RCAP-3`) | the ROOT-ROW caps and their quantities | **OUT OF CLASS** — the STORE's runtime top-level-name register is a DIFFERENT OBJECT from this property register (`§5.5.1`'s note); no count crosses between them |

**(6) THE ONE FINDING THIS RECONCILIATION RAISES — WITH AN OWNER AND A POSITIVE REVISIT CONDITION, NEVER A BARE `OWED`.** **THE `§5.5.1` TABLE'S TWENTY-ONE PRINTED TERMS SUM TO `427`, WHILE THE NOTE ABOVE THAT TABLE, `§5.5.2`, `§5.5.3`'s caps paragraph AND `§7` item `7` ALL NAME THE OPERATIVE TOTAL AS `233` — so a reader who sums the register's own main table gets a total (`427`) that is not the total the caps are compared against, which is exactly the class `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` names.** **This pass does NOT silently re-grain that table; the as-filed cells stay, per `S-3`. OWNER: the unit's next doc-bearing pass (the spec-gate close-out, or the TestWriter pass that first drives the register). POSITIVE REVISIT CONDITION: the first pass that reports RUN attempts per row must either move `§5.5.1`'s last column to the corrected drive counts BESIDE the as-filed terms (an annotation per row, as-filed cells kept) or print the operative total BESIDE the table, and in the same pass state that the table's as-filed terms sum to `427`.** **NO `(bounded)` MARKING, ROW, STRATEGY ID, PINNED SEED OR CAP VALUE IS TOUCHED BY THIS FINDING.** **AND ONE CAVEAT IS PRINTED RATHER THAN LEFT TO A READER: every figure above is one this pass READ at a named site in THIS file (`CURRENT STATE` item `3` · `§5.5.1`'s table · `§5.5.3`'s two tables, their two chains and its written-out term list · `§5.5.3`'s caps paragraph); `389` is the ONE figure this file prints that no term set here reproduces, and it is recorded as SUPERSEDED rather than resolved.**

---

**⟶ AMENDED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS — THE ARCHITECT'S TWO AMENDMENTS FOLDED IN; `RCA-8(d)` ANNOTATE-BESIDE: NOT ONE BYTE OF THIS SECTION ABOVE IS REWRITTEN, AND NO TERM, ROW, STRATEGY ID, SEED OR CAP VALUE OF THE `21` AS-FILED ROWS MOVES).**

**(7) THE ROW COUNT AFTER THE AMENDMENTS: `22` — `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓ — with `22` strategy ids and the same `2` `(bounded)` markings.** **The added row is `P-GR-IM-14` (MONOTONIC PERSISTENCE, `§2.1`'s named-invariant block), strategy `S-GR-PERSIST-1`, term `16`, driven as the state-machine/totality pair over the four tokens.** **IT HAS NO AS-FILED FORM: it is an ADDITION, not a correction and not an agreement row — which is what keeps this block's arithmetic checkable: `3` agreement rows + `18` corrections + `1` addition = `22` rows (`3 + 18 + 1 = 22` ✓), while the two `21`-row columns' own sums (`427` · `233`) are UNMOVED.**

**(8) THE OPERATIVE DECLARED TOTAL, PRINTED WITH ALL TWENTY-TWO TERMS, IN REGISTER ORDER: `249` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `16` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12` — the terms being `P-GR-IM-1` `6` · `P-GR-IM-2` `12` · `P-GR-IM-3` `6` · `P-GR-IM-4` `6` · `P-GR-IM-5` `12` · `P-GR-IM-6` `12` · `P-GR-IM-7` `12` · `P-GR-IM-8` `7` · `P-GR-IM-9` `12` · `P-GR-IM-10` `4` · `P-GR-IM-11` `4` · `P-GR-IM-12` `6` · `P-GR-IM-13` `40` · **`P-GR-IM-14` `16`** · `P-GR-SM-1` `15` · `P-GR-TP-1` `24` · `P-GR-TP-2` `16` · `P-GR-TP-3` `6` · `P-GR-TP-4` `6` · `P-GR-TP-5` `10` · `P-GR-TP-6` `5` · `P-GR-TP-7` `12`.** **THE CHAIN, SO A READER NEEDS NO ARITHMETIC OF THEIR OWN: `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249` ✓ — twenty-two terms, and it is `233` (the corrected column's twenty-one terms, above) + `16` (the added row) = `249`, while the as-filed column's twenty-one terms sum to `427` and stay visible above.** **A ROW ASSERTING `233` OR `249` WITHOUT ITS TERMS FAILS `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`.**

**(9) THE CAPS, COMPARED AGAINST THESE FIGURES: `249 ≤ 400` ✔ in total · per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔ · `≤100` attempts per row and `≤400` in total, rows evaluated SEQUENTIALLY IN REGISTER ORDER (the added row in its own place, not appended to the run's tail), STOP AFTER 5 CONSECUTIVE FAILURES — status at filing: NOT TRIGGERED (nothing ran; the status is the DONE row's to report).** **An un-run register row is reported as a FAILURE, never as a pass — and `P-GR-IM-14` is a row like any other.**

**(10) THE SITE RECONCILIATION, EXTENDED IN THIS PASS TO EVERY SITE THAT PRINTS THE TOTAL, THE ROW COUNT OR A PER-ROW MAXIMUM — EACH CORRECTED BESIDE AT ITS OWN SITE, WITH THE AS-FILED FIGURE KEPT VISIBLE (the table at item `(5)` above is NOT rewritten; these are the sites it names plus the ones this pass's amendments moved).** **AND SO NO ROW OF item `(5)`'s TABLE IS READ AS STILL CURRENT: the rows it lists for `§5.5.1`'s object-naming note, `§5.5.1`'s table, `§5.5.2` item `2`, `§5.5.2` item `5`, `§5.5.3`'s corrected table and caps paragraph, `§6`'s clarification block, `§7` item `7` and the file-end line are SUPERSEDED IN FIGURE by this section's items `(7)`–`(9)` — their as-filed dispositions stand as the pre-amendment readings, and the operative pair is `22` rows / `249` — while the two rows it disposes as OUT OF CLASS (`§6.4`'s overflow arithmetic, `§2.4`'s `RCAP-*`) are unmoved.**

| The site (by section / block) | What it printed as filed | Its disposition after the amendments |
| --- | --- | --- |
| `CURRENT STATE` item `3` | `21` rows (`13 + 1 + 7`) · `389` · per-row `36` | **CORRECTED BESIDE at that item** — `22` rows (`14 + 1 + 7`) · `249` · per-row `40` |
| `CURRENT STATE` item `2` | `2` value exports + `27` types = `29` names | **CORRECTED BESIDE** — `2` + `29` = `31` (`O-1`; `§2.1` item `3`'s annotation) |
| `CURRENT STATE` item `7` | `eleven` decision requests | **AGREEING, annotated beside** — the count is unmoved; four of the eleven carry amended readings |
| `§0`'s amendment block | — (new) | **THE SITES' INDEX** — both amendments, their operative sentences and every landing site |
| `§1` item `9` | *"a `21`-row register"* | **CORRECTED BESIDE** — `22` rows |
| `§2.1` item `3` and its annotation | `27` declarations / `29` names | **CORRECTED BESIDE** — `29` declarations / `31` names, by name and with terms |
| `§2.1`'s block annotation | the union's `18` declared against `13` printed | **CORRECTED BESIDE** — the operative count is `16` = `8` + `5` + `3` |
| `§2.4`'s ruling block | `21` rows / `233` | **CORRECTED BESIDE** — `22` / `249` |
| `§4.1` · `§4.2` item `10` | `21` rows · `2 + 27 = 29` | **CORRECTED BESIDE** — `22` rows · `2 + 29 = 31` |
| `§5.1` row `1` · `§5.2` leg `2` · `§5.3` item `3` | `twenty-seven` type declarations | **CORRECTED BESIDE** — `twenty-nine` |
| `§5.3` items `10`/`11` | the `≤400` / `≤100` caps | **CORRECTED BESIDE** — `249 ≤ 400` ✔ · per-row `40` ≤ `100` ✔ |
| `§5.5` ruling paragraph · `§5.5.2` items `2`/`3`/`5` | `21` rows · `13 + 1 + 7` | **CORRECTED BESIDE** — `22` · `14 + 1 + 7` |
| `§5.5.1` heading · object-naming note · its earlier annotation · the table's own as-filed column · the closing amendment block | `21` rows · `233` | **CORRECTED BESIDE** — `22` rows · `249`; the as-filed column stands and the ADDED ROW is printed in the table itself |
| `§5.5.3`, the as-filed table, its chain and its written terms | `427` | **AGREEING — the as-filed record, kept visible** |
| `§5.5.3`, the corrected table, its chain, its written terms and its caps paragraph | `233` with twenty-one terms · `233 ≤ 400` ✔ · `40 ≤ 100` ✔ | **AGREEING FOR THE TWENTY-ONE ROWS IT COVERS, AND ONE ROW SHORT OF THE OPERATIVE PAIR** — `22` rows / `249` are printed at items `(7)`–`(9)` above |
| `§5.5.3`'s closing sentence (the agreement rows) | *"…and the four rows whose as-filed and corrected forms agree…"* | **CORRECTED BESIDE at that sentence (`O-5`)** — the agreement set is `3`, not `7` |
| `§6`'s clarification block, as item `(5)` names it | *"`§5.5.1`'s `21` rows / `233` declared attempts"* | **NOT-A-FINDING, WITH ITS ARITHMETIC: this pass's read finds `0` sites in `§6` that print a register attempt total** — the figures `§6` does print are its declared-surface census (`§6.1`) and its `O-6` closure count (`§6.4`), each corrected beside at its own site |
| `§6.1`'s declared surface · `§6.1`(d)'s token list · `§6.4`'s `O-6` row · `§6.4`'s closing paragraph | `27` types · *"five new refusal tokens"* · *"EIGHTEEN MEMBERS"* | **CORRECTED BESIDE** — `29` types · the token set is `SIXTEEN` (`8 + 5 + 3`) |
| `§7` item `7` and its annotation | `21` rows · `233` · as-filed `427` | **CORRECTED BESIDE** — `22` rows · `249` |
| `§8` item `12` | `21` = `21` = `21` · `13 + 1 + 7 = 21` | **CORRECTED BESIDE** — `22` = `22` = `22` · `14 + 1 + 7 = 22` |
| the file-end note | a `21`-row register · `233` | **CORRECTED BESIDE** — a `22`-row register · `249` |
| `§6.4`'s overflow arithmetic · `§2.4`'s `RCAP-*` | `16` + `1` = `17` · the ROOT-ROW caps | **OUT OF CLASS** — unchanged from item `(5)`'s disposition (the one counts overflow entries; the other counts ROOT ROWS and no count crosses to this property register) |

**(11) THE ONE THING THIS BLOCK DOES NOT DO, STATED RATHER THAN LEFT TO A READER: it does NOT re-grain `§5.5.1`'s last column — a reader who sums that table's twenty-one as-filed terms still gets `427`, and a reader who sums the corrected column still gets `233`; the operative total `249` is printed HERE with all twenty-two terms, and the added row is printed IN the table it belongs to.** **THE FINDING THIS FILE ALREADY CARRIES at item `(6)` (owner + positive revisit condition) IS THEREFORE EXTENDED, NOT REPLACED: its owner is unchanged, its revisit condition is unchanged, and the pass that meets it must print `22` rows / `249` with all their terms — the added row's `16` included.** **AND THE ONE `O-9`-CLASS FINDING THIS PASS ADDS IS FILED AT ITS OWN SITE, WITH AN OWNER AND A POSITIVE REVISIT CONDITION: `§2.1`'s block annotation records the union's as-filed `18`-declared-against-`13`-printed mismatch and fixes the operative count at `16`.**

**(12) THE TESTWRITER'S REPAIR PASS'S SITE RECONCILIATION, IN THE SAME FORM — EVERY SITE THIS PASS TOUCHED, DISPOSITIONED, AND THE OPERATIVE TOTAL RE-PRINTED WITH ITS TERMS SO THE READER NEED NOT SUM ANYTHING (`RCA-8(d)`: NOT ONE BYTE ABOVE IS REWRITTEN, AND NO TERM, ROW, STRATEGY ID, SEED, CAP VALUE OR `(bounded)` MARKING MOVES).**

| The site (by section / block) | What this pass did there | Disposition of every figure it prints |
| --- | --- | --- |
| `§2.1`'s `GraphStore` block (the test-only seam) | APPENDED `4` members — `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild` — in the block's own declaration form; the four as-filed members keep their bytes | **NO FIGURE OF THIS SECTION MOVES** — `4 + 4 = 8` seam members, and `§5.5.1` `P-GR-IM-10`'s term stays `4` = `4` DRIVE MEMBERS × `1` DRIVE |
| `§2.1`'s block annotation (`TW-1` / `TW-2`) | a new dated clause: the member census, the degradation rule, the production-negative extension, the rows unblocked | **A NEW CLAUSE WITH ITS OWN TERMS** (`4 + 4 = 8`); it prints `249` only as the unchanged operative total |
| `§2.3` item 6, row `(vi)` (with the table above it) | a new dated clause: the arm is DRIVEABLE, via `failNextCacheRebuild`, one-shot and one-subject | **AGREEING** — the `7` arm rows, the `6` occupied step ids, the `7` read-side tokens, the `1` declared miss and the `1` write-side twin are unmoved (`5 + 1 + 1 = 7` ✓), and `P-GR-IM-8`'s `7` is unmoved |
| `§2.6` item 4 (the invalidation site, `DR-7`) | a new dated clause naming the ONE subject the injector may fault | **AGREEING** — no figure is printed there, and `DR-7`'s subject and the read path's purity are unmoved |
| `§5.5.1` `P-GR-IM-14` (cell, clause and closing block) | the `secure`-half OPERATIVE READING: token per direction, pairs per class, vacuous-with-reason | **TERM `16` UNMOVED**; the classes partition it (`3` + `7` + `6` = `16` ✓), and the union's `SIXTEEN` is unmoved |
| `§5.5.3` (this item) | the total re-printed with all twenty-two terms and the chain | **AGREEING — the operative pair is STILL `22` ROWS / `249` · per-row maximum `40` (`P-GR-IM-13`) · `249 ≤ 400` ✔ · `40 ≤ 100` ✔** |
| `§7` item `11` (new) | the two unmaterialised arms recorded, each with an owner and a positive revisit condition | **AGREEING** — a row census and two named arms; no attempt total and no per-row maximum printed |
| `CURRENT STATE` item `3` · `§1` item `9` · `§5.5`'s ruling paragraph · `§5.5.2` items `2`/`3`/`5` · `§5.5.3` items `(7)`–`(9)` · `§6`'s clarification block · `§7` item `7` · the file-end block | NOT TOUCHED BY THIS PASS | **AGREEING** — each already reads `22` rows / `249` (or a row census or a cap) and none is moved |

**THE OPERATIVE TOTAL, PRINTED ONE LAST TIME WITH ALL TWENTY-TWO TERMS SO NO SITE OF THIS FILE LEAVES IT TO ARITHMETIC: `249` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `16` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12`, in register order (`P-GR-IM-1` … `P-GR-IM-14`, `P-GR-SM-1`, `P-GR-TP-1` … `P-GR-TP-7`), chain `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249` ✓.** **THE FINDING AT ITEM `(6)` IS NEITHER MET NOR REPLACED BY THIS PASS AND ITS OWNER AND REVISIT CONDITION STAND AS FILED: `§5.5.1`'s last column still prints the twenty-one AS-FILED terms (sum `427`) and the corrected column still sums to `233`; what this item adds is that the OPERATIVE reading of both — `249`, with the added row's `16` printed in the table and here — is now printed at three sites instead of one.** **NO `(bounded)` MARKING, ROW, STRATEGY ID, PINNED SEED OR CAP VALUE IS TOUCHED BY THIS PASS EITHER.**

**(13) THE INTERACTION-PRECONDITION WITHDRAWAL'S ARITHMETIC — THE REGISTER CHECKED ROW BY ROW AGAINST THE WITHDRAWN ARM, THE OPERATIVE TOTAL RE-PRINTED WITH ALL TWENTY-TWO TERMS AND ITS CHAIN, AND EVERY SITE THAT PRINTS A TOTAL, A ROW COUNT OR A PER-ROW MAXIMUM DISPOSITIONED (2026-10-01, THE ARCHITECT'S RULING ON `§2.7` ITEM 6; `RCA-8(d)`, NOT ONE BYTE ABOVE IS REWRITTEN).**

**(a) THE ROWS THAT DROVE THE WITHDRAWN ARM, ANSWERED BY ENUMERATION RATHER THAN BY ASSURANCE: `NONE`.** **The withdrawn precondition is `§2.7` item 6's as-filed refusal of *"an input carrying two distinct constraint ids where neither declares an interaction rule"*, and the register's ONLY row that drives the construction-time refusal set is `P-GR-IM-6`, whose SIX ARMS are enumerated at `§2.4` item 5 — **(a)** `'malformed-name'` · **(b)** `'secure-refused'` · **(c)** `'undeclared-name'` (a DOUBLED top-level name) · **(d)** `'reserved-namespace'` · **(e)** `'duplicate-path-tier'` (the WRITE side, the only half with a subject) · **(f)** `'malformed-pattern'` (a TOP-LEVEL pattern that is malformed or ambiguous) — **AND `§2.7` ITEM 6'S PRECONDITION IS NOT AMONG THEM**, which that item's own annotation states in its own words (*"the set stays CLOSED AT SIX"*).** **SO NO ROW'S PROPERTY, TYPE, STRATEGY ID OR TERM IS RE-DERIVED BY THIS WITHDRAWAL, and the row is printed so that `NONE` is checkable: `P-GR-IM-6` keeps its id, its `P-IM` type, its strategy id `S-GR-REG-1` and its term `12` = `6` refusal arms × `2` halves (the refusal drive and its NAMED POSITIVE CONTROL), with the absence-of-store assertion and the re-order drive asserted BESIDE those drives — which is exactly the reading `§5.5.1`'s third annotation and `§7` item `11`(b) already give it.** **(b) THE ONE PLACE THE WITHDRAWN CLAUSE WOULD HAVE REACHED THE REGISTER IS ITS DRIVE SUBSTRATE, AND THE RULING REMOVES THE CONTRADICTION: the register's fixture declares `N = 2` constraint rows — `unique-path-tier` · `count-exactly-one` — and EVERY register drive constructs the store with them (`§5.5.1`'s fixture paragraph; its new annotation), so an as-filed refusal of any two-id input would have REFUSED THE REGISTER'S OWN FIXTURE and left NO ROW ABLE TO CONSTRUCT A STORE.** **Under the ruling the fixture is LAWFUL BY DECLARATION, each row is enforced independently, and the drives' substrate is UNCHANGED.** **(c) THE OPERATIVE DECLARED TOTAL, RE-PRINTED WITH ALL TWENTY-TWO TERMS AND ITS CHAIN, UNMOVED: `249` = `6` (`P-GR-IM-1`) + `12` (`P-GR-IM-2`) + `6` (`P-GR-IM-3`) + `6` (`P-GR-IM-4`) + `12` (`P-GR-IM-5`) + `12` (`P-GR-IM-6`) + `12` (`P-GR-IM-7`) + `7` (`P-GR-IM-8`) + `12` (`P-GR-IM-9`) + `4` (`P-GR-IM-10`) + `4` (`P-GR-IM-11`) + `6` (`P-GR-IM-12`) + `40` (`P-GR-IM-13`) + `16` (`P-GR-IM-14`) + `15` (`P-GR-SM-1`) + `24` (`P-GR-TP-1`) + `16` (`P-GR-TP-2`) + `6` (`P-GR-TP-3`) + `6` (`P-GR-TP-4`) + `10` (`P-GR-TP-5`) + `5` (`P-GR-TP-6`) + `12` (`P-GR-TP-7`), chain `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249` ✓ — TWENTY-TWO TERMS.** **THE ROW COUNT IS `22` = `14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP` (`14 + 1 + 7 = 22` ✓), the per-row maximum is STILL `40` (`P-GR-IM-13`), `249 ≤ 400` ✔ and `40 ≤ 100` ✔, and NO ROW, TERM, STRATEGY ID, PINNED SEED, CAP VALUE OR `(bounded)` MARKING IS TOUCHED BY THIS PASS.** **(d) THE SITE RECONCILIATION, OVER EVERY SITE THAT PRINTS A TOTAL, A ROW COUNT OR A PER-ROW MAXIMUM — each named by section/block and dispositioned; NOT ONE SITE IS SILENTLY REWRITTEN, and the sites this pass touched are named as such:**

| The site (by section / block) | What it prints | Its disposition after this pass |
| --- | --- | --- |
| `CURRENT STATE` item `3` | `22` rows (`14 + 1 + 7`) · `249` · per-row `40` | **AGREEING — UNCHANGED** (its dated annotation stands) |
| `CURRENT STATE` item `2` | `2` + `29` = `31` exported names | **OUT OF CLASS** — the export census, not a register total |
| `§1` item `9` | *"a `22`-row register"* | **AGREEING — UNCHANGED** |
| `§2.1`'s block annotation | the union's `SIXTEEN` (`8` + `5` + `3`) | **OUT OF CLASS for the register totals — and RECONCILED in this same pass at that block's new clause `(3)`, with the count UNCHANGED** |
| `§2.4`'s ruling block | `22` rows / `249` | **AGREEING — UNCHANGED** |
| `§4.1` · `§4.2` item `10` | `22` rows · `2 + 29 = 31` | **AGREEING — UNCHANGED** |
| `§5.3` items `10`/`11` | the `≤400` / `≤100` caps | **AGREEING — no figure printed** |
| `§5.5`'s ruling paragraph | `22` rows · `14 + 1 + 7` | **AGREEING — UNCHANGED** |
| `§5.5.1`'s heading · object-naming note · its two earlier annotations · the table's own as-filed column · the closing amendment block | `22` rows · `249`; the as-filed column's twenty-one terms (sum `427`) | **AGREEING — UNCHANGED**; the as-filed column and the earlier annotations stand as the pre-amendment record, so the finding at item `(6)` is UNMOVED and its owner/revisit condition stand |
| `§5.5.1`'s fixture paragraph and its annotations | the two constraint rows and the register's drive substrate | **RECONCILED IN THIS SAME PASS — a new annotation at the fixture prints both rows' status under the ruling; NO TERM MOVES** |
| `§5.5.2` items `2`/`3`/`5` | `22` rows · `14 + 1 + 7` · `22 = 22 = 22` | **AGREEING — UNCHANGED** |
| `§5.5.3`'s as-filed table, chain and written-out terms | `427` | **AGREEING — the kept-visible as-filed record** |
| `§5.5.3`'s corrected table, chain, written-out terms and caps paragraph | `233` with twenty-one terms · `233 ≤ 400` ✔ · `40 ≤ 100` ✔ | **AGREEING FOR THE TWENTY-ONE ROWS IT COVERS — one row short of the operative pair**, as item `(8)` already states |
| `§5.5.3` items `(7)`–`(9)` and `(12)` | `22` rows / `249` with all twenty-two terms and the chain | **AGREEING — OPERATIVE** |
| `§6`'s clarification block · `§6.1`'s declared surface · `§6.1`(d)'s token list · `§6.4`'s `O-6` row and its closing paragraph | the export census and the union's `SIXTEEN` | **OUT OF CLASS for the register totals; the union figure is RECONCILED at `§2.1`'s clause `(3)` in this same pass and is UNCHANGED** (a dated sentence is added at `§6.4` in this same pass) |
| `§7` item `7` and its annotations | `22` rows · `249` · as-filed `427` | **AGREEING — UNCHANGED** |
| `§7` item `11` | the two unmaterialised arms, each with owner + positive revisit condition | **AGREEING — a row census; it prints no total and no per-row maximum** |
| `§8` item `12` | `22 = 22 = 22` · `14 + 1 + 7 = 22` | **AGREEING — UNCHANGED** |
| the file-end note and its annotation block | a `22`-row register · `249`; the union's `SIXTEEN` | **AGREEING — UNCHANGED**, extended by one dated item in this same pass |
| `§2.7` item 6 (new annotation) · `§3.2` `F-19` (re-aimed) · `§3.2`'s new annotation · `§3a`'s `ADV-GR-14` | the withdrawn precondition, its re-aimed fail-state and the cascading seed | **OUT OF CLASS for the register totals — the union figure they carry is UNCHANGED at `SIXTEEN`** |
| `§6.4`'s overflow arithmetic | `16` + `1` = `17` | **OUT OF CLASS** — the overflow list's entries, not a register attempt total |
| `§2.4`'s `RCAP-1`/`RCAP-2`/`RCAP-3` | the ROOT-ROW caps | **OUT OF CLASS** — the store's runtime top-level-name register is a different object from this property register, and no count crosses (`§5.5.1`'s object-naming note) |

**AND THE PASS'S OWN EXTENT, STATED SO NOTHING IS LEFT TO ASSEMBLY: the withdrawal is recorded at SIX sites of this file — `§2.7` item 6 (its operative text) · `§3.2` `F-19` (the re-aimed fail-state, its as-filed subject kept visible in its own cell) · `§3.2`'s annotation after the fail-state table (the re-aim's grounds and the as-filed `R-7` mis-citation) · `§2.1`'s block annotation's clause `(3)` (the union count and every site reconciled) · `§5.5.1`'s fixture annotation (the two constraint rows' status) · `§5.5.1` `P-GR-IM-14`'s `TW-3` clause (the count re-printed as unchanged) — plus this item, plus one dated paragraph at `§7a.1`, one dated sentence at `§6.4`, one dated annotation at `§3a`'s `ADV-GR-14`, and one dated item at the file-end note.** **NO `src/**` BYTE, NO TEST FILE, NO TRACKER AND NO OTHER SPEC IS TOUCHED BY THIS PASS, and the register's `22` rows / `249` declared attempts are UNCHANGED WITH THEIR TWENTY-TWO TERMS PRINTED AT (c) ABOVE AND AT ITEM `(8)`.**

**(14) THE MERGED-ARM WITHDRAWAL'S ARITHMETIC (2026-10-01, THE ARCHITECT'S RULING `A3` OF `§0`; `RCA-8(d)`: NOT ONE BYTE ABOVE IS REWRITTEN). THE ROW RE-DERIVED IS `P-GR-TP-7` — THE REGISTER'S ONLY ROW WHOSE SUBJECT WAS THE MERGED READ (`P-GR-TP-4` BEING THE EXPORT'S ROW, `P-GR-TP-7`'s SUBJECT, TERM, STRATEGY ID AND COMPENSATING SET ARE RE-DERIVED AT THAT ROW'S OWN ANNOTATION AFTER THE TABLE ABOVE).**
**(a) THE TERM, RE-DERIVED WITH ITS FACTORS: `P-GR-TP-7` `12` = `6` subtree shapes × `2` readings — the shapes (i)…(vi) and the readings (a)/(b) named at that annotation — and the register's declared total therefore DOES NOT MOVE: it stays `249` with ALL TWENTY-TWO TERMS, IN REGISTER ORDER: `249` = `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `16` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12`, the terms being `P-GR-IM-1` `6` · `P-GR-IM-2` `12` · `P-GR-IM-3` `6` · `P-GR-IM-4` `6` · `P-GR-IM-5` `12` · `P-GR-IM-6` `12` · `P-GR-IM-7` `12` · `P-GR-IM-8` `7` · `P-GR-IM-9` `12` · `P-GR-IM-10` `4` · `P-GR-IM-11` `4` · `P-GR-IM-12` `6` · `P-GR-IM-13` `40` · `P-GR-IM-14` `16` · `P-GR-SM-1` `15` · `P-GR-TP-1` `24` · `P-GR-TP-2` `16` · `P-GR-TP-3` `6` · `P-GR-TP-4` `6` · `P-GR-TP-5` `10` · `P-GR-TP-6` `5` · **`P-GR-TP-7` `12` (RE-DERIVED: `6` subtree shapes × `2` readings)**.** **THE CHAIN, SO NO READER NEEDS ARITHMETIC OF THEIR OWN: `6 → 18 → 24 → 30 → 42 → 54 → 66 → 73 → 85 → 89 → 93 → 99 → 139 → 155 → 170 → 194 → 210 → 216 → 222 → 232 → 237 → 249` ✓ — twenty-two terms, `249`.** **CAPS, AGAINST THESE FIGURES: `249 ≤ 400` ✔ in total, per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔, and the stop-after-5-consecutive-failures rule unmoved.** **A TERM THAT MOVES IS PRINTED WITH ITS FACTORS, ITS TOTAL, ITS CHAIN AND ITS RECONCILIATION LIST — NEVER NUDGED — AND THIS ONE MOVED IN SUBJECT AND IN FACTORS WHILE ITS FIGURE HAPPENED TO STAND, WHICH IS STATED HERE SO THE FIGURE IS NOT READ AS UNCHANGED BY DEFAULT.**
**(b) THE SITE RECONCILIATION OF *THIS* PASS — every site that prints the CENSUS, the register's TOTAL, its ROW COUNT or a PER-ROW MAXIMUM, each dispositioned; NO SITE IS SILENTLY REWRITTEN AND THE AS-FILED FIGURES STAND BESIDE EVERY CORRECTION:**
**THE CENSUS SITES — `CURRENT STATE` item `2` (`CORRECTED BESIDE`: `2` + `27` = `29`) · `§2.1` item `3` and its two annotations (`THE OWNING SITE`; the twenty-seven BY NAME, the withdrawn slots printed as `0`, `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓) · `§2.1`'s block annotation clause `(2)` (`AMENDED BESIDE`, with the member withdrawals named) · `§4.1`'s green branch and its annotation (`CORRECTED BESIDE`: `2 + 27 = 29`, with the three printed figures named as three different memberships) · `§5.1` row `1` (`RE-ANNOTATED BESIDE`) · `§5.2` leg `2` (`RE-ANNOTATED BESIDE`) · `§5.3` item `3` (`RE-CORRECTED BESIDE`) · `§6.1`'s declared surface (`CORRECTED BESIDE`) · `§6.4`'s `O-1` row and its closing paragraph (`RE-STATUSED BESIDE`: the merged read is WITHDRAWN, not *"defined and now live"*) · `§3b`'s audit of the file-end note (`RE-ANNOTATED BESIDE`) — and `§2.1` item `2`'s own census (`1` value export + `3` type declarations) is UNMOVED and NOT a site of this pass.**
**THE REGISTER SITES — `CURRENT STATE` item `3` · `§1` item `9` · `§2.4`'s ruling block · `§4.1` · `§4.2` item `10` · `§5.3` items `10`/`11` · `§5.5`'s ruling paragraph · `§5.5.1`'s heading, its object-naming note, its fixture paragraph, its table (as-filed column AND the added row), its annotations and the new `P-GR-TP-7` clause · `§5.5.2` items `2`/`3`/`5` · `§5.5.3`'s as-filed table and chain, its corrected table and chain, its caps paragraph, items `(7)`–`(13)` and this item · `§6`'s clarification block · `§6.4`'s overflow arithmetic · `§7` item `7` · `§8` item `12` · the file-end note — ALL `AGREEING — UNCHANGED`: this pass moves NO register figure at all (`22` rows, `14 + 1 + 7 = 22` ✓ · `249` with its twenty-two terms · per-row maximum `40` · `249 ≤ 400` ✔ · `40 ≤ 100` ✔), and the `§2.4` `RCAP-*` rows and `§6.4`'s overflow arithmetic stay `OUT OF CLASS` as items `(5)`/`(10)`/`(13)` dispose them.**
**AND THE PASS'S OWN EXTENT, COUNTED SO IT IS CHECKABLE: the withdrawal is recorded at `28` sites of this file — `§0`(A3) (`1`) · `§0`'s `A2` landing-sites index (`2`) · `§0`'s `A2` consequences clause `(b)` at the named-invariant block (`3`) · `§2.1` item `3`'s second annotation (`4`) · `§2.1`'s block annotation clause `(2)` (`5`) · `§2.3` item `5` (`6`) · `§2.3` item `8` (`7`) · `§2.5` item `4`, the owning clause (`8`) · `§2.6` item `6` (`9`) · `§2.9` (`10`) · `§3.1` `M-5` (`11`) · `§3.2` `F-8` (`12`) · `§3.3` `I-3` (`13`) · `§4.1`'s green branch and its annotation (`14`) · `§4.2` item `4` (`15`) · `§5.1` row `1` (`16`) · `§5.2` leg `2` (`17`) · `§5.3` item `3` (`18`) · `§5.5.1`'s `P-GR-TP-7` clause (`19`) · `§5.5.3`'s item `(14)` (`20`) · `§6.1`'s declared surface (`21`) · `§6.4`'s `O-1` row (`22`) · `§6.4`'s `O-2` row (`23`) · `§6.4`'s closing paragraph (`24`) · `§7` item `6` (`25`) · `§8` item `5` (`26`) · `§3a`'s `ADV-GR-10` seed (`27`) · `§3b`'s audit of the file-end note (`28`) — `1 + 27 = 28` ✓, counting each site ONCE however many sentences it carries.** **BESIDE THOSE, this pass adds ONE item that is not a withdrawal site: the sweep report at `§7` item `12`.** **NO `src/**` BYTE, NO TRACKER, NO `AGENTS.md` AND NO SIBLING SPEC IS TOUCHED BY THIS PASS; the two test files of this unit are re-derived by the same pass, and the module paths, the row ids and the `§3a`/`§3b` shape are unmoved.**


---

## 6. THE STEP-0 DOSSIER BLOCK — the written determination the record's `§5`(c) owes

**THE DETERMINATION, IN ONE LINE: THE ADOPTION TRIGGER DOES NOT FIRE — this unit adopts NO externally-sourced
identifier — SO THE ADOPTION DOSSIER IS ZERO-ROW, AND ITS WRITTEN RATIONALE IS THIS SECTION, NAMING THIS CONTRACT'S OWN
DECLARED SURFACE.**

**WHY THE DOSSIER IS A BLOCK IN THIS FILE AND NOT A SECOND FILE.** **The gate-1 record makes the dossier a SPEC-GATE
INPUT** (its `§2` verdict table and its `§6` `C-4`: *"`docs/specs/store-core-adoption-dossier.md` is cited by path with the
`A-6`/`A-7`/(`A-8`) re-statuses and the `R-9` collision row reconciled by row id; the successor's own zero-row rationale
is written, never silent"*), **and a second file is not in this package's authority.** **So the determination, the
rationale and the reconciliation all live HERE, and the held dossier is amended IN PLACE by the spec-gate pass, not by
this file.**

### 6.1 The zero-row rationale, written

**The successor unit adopts no externally-sourced identifier.** **The whole of its vocabulary is:**
**(a)** **`docs/specs/store-core-adoption-dossier.md`'s ALREADY-ADOPTED rows `A-1`…`A-8`**, cited by path and row id — **the
four tier tokens, the per-tier surface, the layered read, `commit`, `subscribe` and their release scope**;
**(b)** **the held `docs/specs/store-core.md`'s project-internal contract vocabulary** — the refusal union, the write
receipt, the event envelope, the caps and their non-destructive outcome — **carried here as re-declared names under a
non-colliding prefix, and never as an import**;
**(c)** **the architect's own directive and his round-2/round-3 answers, and the ACTIVE
`R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET` row** — **this
project's own decision source**; and
**(d)** **names minted by this contract**, whose semantics nothing outside this project supplies: **`GraphNode` ·
`GraphAnchor` · `GraphLink` · `GraphRegister` · the two cache entry types · the store-minted handle · and the five new
refusal tokens (`'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` ·
`'tier-filter-miss'`)** (**⟶ CORRECTED BESIDE 2026-10-01, `O-9`: this contract's refusal tokens are `SIXTEEN`, not thirteen — these `five` PLUS the two the first amendment adds (`'serialize-failed'` · `'validate-failed'`) and the one the second adds (`'durability-inversion'`); `§2.1`'s block annotation prints the three term groups, `8 + 5 + 3 = 16`**) — the first four of which are the proposal's own four (`§5.2` item 2 of that file) plus the one
the round-3 uniqueness ruling creates.

**THE DECLARED SURFACE THIS RATIONALE NAMES, so that the zero rows are checkable against a NAMED quantity:**
**`2` value exports and `27` type declarations = `29` exported names in `src/renderer/store-core-graph.ts` (**⟶ CORRECTED BESIDE 2026-10-01, `O-1`: the operative census is `2` value exports + `29` type declarations = `31` exported names, the two counted declarations being `GraphTierGetResult` and `GraphAffectedRow` — `§2.1` item `3`'s annotation names all twenty-nine and prints all nine terms; **THE ZERO-ROW RATIONALE'S OWN FORCE IS UNMOVED**, because the adoption trigger still does not fire and no externally-sourced identifier is adopted by either amendment — the three added refusal tokens are names MINTED BY THIS CONTRACT, listed at (d) above) **⟶ RE-CORRECTED BESIDE 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`): the OPERATIVE census of this declared surface is `2` value exports + `27` type declarations = `29` exported names, because the two declarations that existed only to serve the withdrawn merged arm — `GraphPart` · `GraphMergedRead` — are WITHDRAWN (`§2.1` item `3`'s second annotation prints the twenty-seven BY NAME with the arithmetic `3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓).** **THE ZERO-ROW RATIONALE'S OWN FORCE IS UNMOVED AND IS STRENGTHENED BY THE WITHDRAWAL: it REMOVES two names from the declared surface rather than adding one, the adoption trigger still does not fire, and no externally-sourced identifier is adopted — so the dossier's zero-row determination is unaffected in either direction.** (`§2.1` item
3), plus `1` value export and `3` type declarations in `src/renderer/store-graph-references.ts` (`§2.1` item 2).**
**The vendored package's `Anchor` / `Link` / `LinkConfigErrorCode` / `NodeState` are CITED as an external, unadopted
analogy ONLY — and they are unusable in contract anyway, because the renderer realm cannot import the package without
crossing a census this unit's `R-11` forbids.** **Zero identifier rows; the rationale is WRITTEN, not silent; and a
silent zero-row on an adopted unit would be a review finding.**

**AND THE `≤8` FIGURE IS A COMPONENT-BREAKDOWN SIGNAL, NEVER A CEILING** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
cited by row name) — **which is why extending the HELD dossier in place, rather than filing a successor-local one, is
lawful and preferred.**

### 6.2 The held dossier's reuse, re-statused BY PATH

**`docs/specs/store-core-adoption-dossier.md` is REUSED, NOT REPLACED.** **It is cited here by path, its `STATUS OF ALL
ROWS: defined` reading is unchanged, and three of its rows are re-statused with an amended reading.** **The re-statuses
are owed IN PLACE at the spec-gate pass; this file records them so the pass has them by row id.**

| The held row | Its status here | Its amended reading, and the clause that moves it |
| --- | --- | --- |
| **`A-1`** · `file` | **`defined`, UNCHANGED** | the token survives as the filter's own fourth member; the carrier is now the node's flag (`§2.3` item 1) |
| **`A-2`** · `mem` | **`defined`, UNCHANGED** | unchanged in substance |
| **`A-3`** · `temp` | **`defined`, UNCHANGED** | unchanged in substance; the terminal sweep still returns the tier to its floor |
| **`A-4`** · `secure` | **`defined`, UNCHANGED, STRENGTHENED** | the refusal is now decided **before the register AND before any traversal**, so the separate collection is unreachable by construction (`§2.4` item 5) |
| **`A-5`** · the per-tier `get`/`set` surface | **`defined`, UNCHANGED in substance** | the tier-local surface keeps its meaning; the handle is now a VIEW over the graph, and its identity rule survives (`§2.5` item 3) |
| **`A-6`** · the layered `read` | **`defined` → `defined`, READING NARROWED** | the merged read and `parts` **now SURVIVE** under the round-3 `DR-11` ruling, so the row's readings that treated the two composing cases as unreachable are read as LIVE, and the row's own *"OUTSIDE"* column is re-read against a merged arm that is reachable (`§2.5` item 4) |
| **`A-7`** · `commit` | **`defined` → `defined`, SCOPE WIDENED** | *"clears the same LOGICAL PATH in every lower-durability tier"* becomes **one clause of a wider transaction** — the subtree regeneration (`§2.8` items 2/5/6); **the clear rule itself is UNTOUCHED** |
| **`A-8`** · `subscribe` | **`defined`, with an AMENDED RELEASE PATH** | the third release trigger (a severance) is **now a DECIDED clause** — the `'severed'` arm and its release rule at `§2.10` item 3 — **so the row does NOT reach `undefined-until-answered`, and the release path is written rather than open** |

**THE SUBSUMPTION RECORD, carried unchanged:** the two sibling units owe no separate dossier, and **each of their specs
must cite the held dossier by path and record the subsumption row by row** (`U-STORE-PERSIST` consumes `A-1`, `A-4`,
`A-7`, `A-8`; `U-STORE-SECURITY` consumes `A-1`, `A-4`, `A-5`) — **and this unit's own contract consumes `A-1`…`A-5`
directly and `A-6`/`A-7`/`A-8` through the re-statuses above.**

### 6.3 THE COLLISION BLOCK'S ONE NEW HIT, RECONCILED BY ROW ID

**THE FORM IS THE HELD DOSSIER'S AND IS NOT NEGOTIABLE: each hit is reconciled BY ROW ID as *"banned by row `<R-id>` for
reason `<Y>`; legitimate in this layer because `<Z>`"*. A hit is NEVER reconciled by RELAXING a prohibition; the only
other lawful disposition is an EXPLICIT RE-NAME REQUEST, and none is made here.**

| # | The prohibition row hit | Banned by row — FOR THE REASON Y | LEGITIMATE in this layer — BECAUSE Z | Falsifier |
| --- | --- | --- | --- | --- |
| **`K-13`** | **`docs/specs/store-core.md` `§3.4` `R-9`** — *"No path segment is looked up against any id registry, and the store keeps no counter, no UUID site and no string-to-entry map"*, positive control *"a `Map` keyed by a derived value FAILS"* | **banned by row `R-9` for the reason that a GLOBAL, PROCESS-WIDE, ENGINE-ID-KEYED string-to-entry map would be a THIRD holder** over the same ids the engine's registry and the `cssIndex`/`propsIndex` pair already index (the plan's `§7.2` `F-5`, `§3.3` row `2.3-8`) | **legitimate in this layer because the prohibition's SCOPE HAS BEEN RULED — not re-read — by the architect, and the ruling is the ACTIVE row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`:** the class the clause binds is a **global engine-id-keyed map**, and the class it does **not** bind is a **per-link, per-edge, caller-keyed, walk-gated target set**. **The store's dictionary is PER-EDGE** (one anchor on one node), **keyed by the CALLER'S OWN DECLARED SEGMENT**, and consulted **as the LAST STEP of a walk that already reached that node** — and it is **UNREACHABLE WITHOUT ITS WALK**, which is the observable the ruling names. **`R-9`'s no-counter / no-UUID half STANDS and binds the store-minted handle's minting (`§7a.1` item 8), and the handle is NEVER a lookup key (`§2.4` item 2).** | a per-link set that resolves a node **without** its walk; a key that is an ENGINE or AUTHORED id string rather than the caller's own segment; a store-minted handle that a path segment resolves against. **AND the vacuity test: `R-9`'s own positive control is RE-POINTED, and a control that passes on BOTH a global engine-id-keyed map and this store FAILS as vacuous** (`§3.4` `R-9`, `F-25`) |

**EVERY OTHER HIT THIS UNIT COULD RAISE, RECONCILED BY ROW ID — each printed with its verdict so the set is COMPLETE
and countable, and so an unreconciled hit is a FINDING rather than a silence:**

| # | The row | Its disposition here, BY ROW ID |
| --- | --- | --- |
| **`R-9`** | `docs/specs/store-core.md` `§3.4` | **RECONCILED BY ROW ID, by the scope ruling** (`K-13` above) |
| **`R-11`** | `docs/specs/store-core.md` `§3.4` (the one-import census) | **SUPERSEDED BESIDE, NOT RECONCILED**: that census bound **the held module**. **This unit's own `R-11` is its successor** (one non-type import; `store-graph-references.js`), **and the held census is read as the held file's own row, untouched.** **The successor does not import the held module, so the held census is not violated and not relaxed** |
| **`R-12`** | `docs/specs/store-core.md` `§3.4` (the frozen surfaces by set equality) | **UNCHANGED AND RE-ASSERTED**: this unit moves none of the five frozen surfaces, **and its own `R-10` is the same claim under this contract's numbering** |
| **`R-3`** / **`R-4`** / **`R-5`** / **`R-13`** of `docs/specs/store-core.md` `§3.4` | the clear/refusal, the read's precedence, the registry's refusals and the arm table | **CARRIED BY SUBSTITUTION, under this contract's own numbering** (`§3.4` `R-3`, `R-4`, and `§2.10` item 2's arm table): **the held row keeps its bytes and its subject; this contract's rows are its successor forms** |
| **`P-1`** of `docs/specs/zones.md` `§2.2` (no consumer vocabulary) | the mirror-class ban with `H-r15` | **NO HIT — OBEYED.** This unit ships **no** consumer noun as its own vocabulary, **no `is-*` literal**, **no unit string**; every segment is the caller's, carried verbatim (`§2.2` `P-1`) |
| **`P-3`** / **`P-4`** of `docs/specs/zones.md` `§2.2` (no policy default; no UI-config store, no mechanism persistence) | the policy and persistence bans (**⟶ CITATION CORRECTED BESIDE 2026-10-01, `O-7`: this cell's *"the store's `file` writes go through a stubbed seam (`§2.2` `P-7`, `§2.6` item 6)"* points at the WRONG section — `§2.6` item `6` is the TWO-RUN STORE-STATE-INDEPENDENCE row, while the seam is pinned at **`§2.1`'s `GraphCrossing`** (the interface block: `put(row:{name,value}) → {status:'committed' \| 'refused'}`, default a no-op recorder) and **`§2.8` item `8`** (the translation that is the channel's cargo), with the seam's stubs and boundaries at `§2.1` item `2`'s neighbouring note, `§5.5` item `6`(a) and `§5.5.2` item `4`(a). The substitution `§2.6` item `6` → `§2.1`'s `GraphCrossing` + `§2.8` item `8` is the only change to this cell; its **NO HIT — OBEYED** verdict is UNMOVED, and the store still holds no persistence of its own) | the policy and persistence bans | **NO HIT — OBEYED.** The store holds **no policy default** and **no persistence of its own**; the tier-1 channel is another unit's, and the store's `file` writes go through a stubbed seam (`§2.2` `P-7`, `§2.6` item 6) |
| **`P-5`** of `docs/specs/zones.md` `§2.2` (no new MCP surface) | the five-seam negative | **NO HIT — OBEYED, AND THE NEW-CONTRACT GATE IS THIS SPEC GATE.** Nothing is registered (`§2.2` `P-4`, `§3.4` `R-10`) |
| **`PCT-1`** / **`P-CT-13`** of `docs/specs/container.md` `§2.2` | the mirror-class taxonomy, with `H-r15` | **NO HIT — OBEYED.** No mirror-class literal is adopted, and the store's own scan is `§3.4` `R-1` |
| **`S-d8`** prohibition 4, with **`NO-FOUNDATION-CONFIG-FILE-FACILITY`** clauses 2/3 | the persisted-state prohibition | **NO HIT — the ACTIVE `FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY` row's clause (1) is the gate, and clauses 2/3 survive: this unit is that gate's product and smuggles nothing** |
| **`S-d11`** (the mandatory geometry clause) | **NOT a token ban: a MANDATORY DISCLOSURE RULE** | **CARRIED VERBATIM** at `§2.2` `P-10`, with its two fences named (the export's cost sentence at `§2.9` item 4, and the register's caps at `§2.4` item 6 — **neither is a geometry claim**) |
| **`E10-SINGLE-SINK-CHANNEL`** | the single-sink composition | **NO HIT — RE-ASSERTED, NOT RELAXED.** This unit ships **no** sink and **no** gesture; its obligation is the *one receipt row per reference* shape (`§2.8` item 7) |
| **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** | the frozen eleven-item delegate surface | **NO HIT — UNTOUCHED.** This unit adds **no** session member and reads no session state; **its `subscribe` is the STORE'S own surface** (`§2.10` item 4) |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** | the register's necessity and its uncapped row count | **NO HIT — OBEYED.** This unit is code-bearing, so the zero-row exemption is unavailable: its typed register is authored **with** this contract at `§5.5.1`, and its row count is an **OUTCOME** |
| **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** | the family's opacity discipline with the no-reach clause | **NO HIT — OBEYED.** Every value is `unknown` and opaque; **no parameter through which a coordinate, a magnitude or an element reach could arrive exists** (`§2.2` `P-9`) |
| **`ZONE-SIZE-DOMAIN-IS-CONSUMER-CARRIED-AND-THE-MINIMUM-CLAMP-IS-FAMILY-SIDE`** | the store refuses names, tiers, caps — **never sizes** | **NO HIT — OBEYED.** There is no size parameter, no arithmetic and no comparator (`§2.2` `P-6`) |

**THE CENSUS OF THIS BLOCK, PRINTED WITH ITS TERMS: `17` rows = `1` RECONCILED-BY-RULING (`R-9`) + `1` SUPERSEDED-BESIDE
(`R-11`, whose successor is this unit's own) + `1` RE-ASSERTED (`R-12`) + `4` CARRIED-BY-SUBSTITUTION (`R-3`/`R-4`/`R-5`/
`R-13`) + `10` NO-HIT rows. `1 + 1 + 1 + 4 + 10 = 17` ✓.** **No hit is reconciled by relaxing a prohibition, and NO
HIT IS UNRECONCILED.**

### 6.4 THE OVERFLOW ENTRIES, RE-STATUSED

**The held dossier's overflow list (`O-1`…`O-16`) is carried with three entries re-statused by the round-3 answers and
one entry added. Each is statused; none is dropped.**

| # | The entry | Its status here |
| --- | --- | --- |
| **`O-1`** | the **merged read** and its **`parts`** list | **`defined`, AND NOW LIVE**: under the round-3 `DR-11` ruling the merged arm **SURVIVES**, so this is not the conditional reading the amendment once carried (`§2.5` item 4) — **⟶ RE-STATUSED BESIDE 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed status above stands byte-for-byte). THE ENTRY'S OPERATIVE STATUS IS *`WITHDRAWN`*: the merged arm and its `parts` list are WITHDRAWN — *"the merged arm is not in the graph spec because in the graph pattern the nodes already contain their tier references locally"*, the architect's verbatim words — so this entry is NO LONGER a live adopted reading and NO LONGER a subject any row may drive. IT IS NOT `undefined-until-answered` EITHER: it is WITHDRAWN, which is a third disposition and is recorded as such (`§2.5` item `4`; the read's surviving case set is HIT · QUALIFIED · MISS). THE ENTRY'S OWN SUBJECT IS NOT SILENTLY DROPPED: the one state the arm could have served — a path unheld while its descendants are resident — is the MISS arm's subject, driven as the declared-but-unwritten parent with a written child (`§3.1` `M-5`'s re-derived annotation).** |
| **`O-2`** | the **residency index** (the held per-tier trie) | **`defined`, RE-READ AS AN INDEX**: it answers for the collection it indexes and **is never consulted for identity**; **a row that resolves a NAME from it FAILS** (`§2.2` `P-1`, `I-1`) — **⟶ WITHDRAWN-BY-NON-ADOPTION 2026-10-01 (THE WITHDRAWAL PASS'S LEGACY-FEATURE SWEEP, `§7` item `12`(a)(1); `RCA-8(d)` ANNOTATE-BESIDE — the as-filed status stands byte-for-byte). THIS CONTRACT PINS **NO INDEX** BESIDE THE REGISTER AND THE TWO CACHES: a tree-wide search of `src/**` and `tests/**` returns NO `Trie`/`trie`/`holdsExact`/`holdsDescendantBelow` identifier, the graph IS the index (`§3.3` `I-1`), and the ONE clause that names a trie EXCLUDES it (`§2.4` item `6`: *"The COUNTS are read from the register's own rows, never from a trie or a node count"*).** **THE ENTRY IS THEREFORE NOT A LIVE MECHANISM OF THIS CONTRACT BUT A RECORD OF THE HELD MODEL'S INDEX — kept visible, marked, and NOT to be re-adopted without a clause that pins it and an amendment with its own gate. THE ENTRY'S ROW AND ITS COUNT ARE UNMOVED (`4` re-statused + `1` new + `12` read at their own rows = `17` ✓).** |
| **`O-6`** | the **refusal-reason token union** | **`defined` — RE-CLOSED BY THIS CONTRACT AT EIGHTEEN MEMBERS** (**⟶ CORRECTED BESIDE 2026-10-01, `O-9`: the operative closure is `SIXTEEN` MEMBERS — `8` held + `5` this amendment's + `3` added by the two architect amendments folded in by this pass (`'serialize-failed'` · `'validate-failed'` · `'durability-inversion'`), `8 + 5 + 3 = 16` ✓ — and the as-filed `EIGHTEEN` is reproduced by no term set this file prints; the reconciliation, with the three term groups named, is at `§2.1`'s block annotation. THIS CELL'S SUBSTANTIVE CLAIM IS UNMOVED: the union IS re-closed by this contract, and the closure IS recorded at `§7a.1` item 1, so the entry stays `defined` and is not `undefined-until-answered`): the held eight, plus the five this amendment needs (`§2.1`), **with the closure recorded at `§7a.1` item 1** |
| **`O-12`** | the **three caps** | **`defined`, RELOCATED ACROSS A QUANTITY**: the register-side `RCAP-1`/`RCAP-2`/`RCAP-3` with their values and their non-destructive overflow outcomes (`§2.4` item 6, `§0A` note 6) |
| **`O-17`** | **NEW — the per-`(logical path, tier)` uniqueness constraint** and its two declared outcomes | **`defined` BY THIS CONTRACT** (`§2.7` item 4, `§2.3` item 5); **the round-3 ruling created it and no held row supplies it** |
| **every other `O-n`** | `O-3` · `O-4` · `O-5` · `O-7`…`O-11` · `O-13`…`O-16` | **read at their own rows, UNCHANGED in status; none is `undefined-until-answered` and none is restated here** |

**THE ARITHMETIC, PRINTED WITH ITS TERMS: the held overflow list's `16` entries plus `1` this contract adds =
`17`; of them `4` are re-statused here (`O-1` · `O-2` · `O-6` · `O-12`) and `1` is new (`O-17`); `4 + 1 + 12 = 17` ✓.**

**⟶ THE CLARIFICATION'S EFFECT ON THIS BLOCK (2026-10-01), STATED SO THE BLOCK IS NOT READ AS MOVING THE REGISTER OR ITS COUNTS.** **`O-12`'s three caps are the ROOT-ROW caps, with the quantities `§2.4` item 6's annotation prints (`RCAP-1`/`RCAP-2` = the root rows whose own node carries the `mem`/`temp` flag; `RCAP-3` = the amplifier-form subscriptions over top-level names) — the entry's own *"RELOCATED ACROSS A QUANTITY"* reading and the three values are UNCHANGED.** **`O-2`'s residency index stays *"an index that is never consulted for identity"*, and a row that resolves a NAME from it FAILS (`§2.2` `P-1`)** — **which the ruling strengthens rather than weakens: the register, not the index, holds the top-level names.** **AND THE ONE CONFLATION THIS BLOCK COULD INVITE IS CLOSED HERE: the *"zero-row"* this block speaks of is the ADOPTION DOSSIER'S zero-row rationale (`§6.1`), and it has NOTHING to do with the register's row count — the dossier counts ADOPTED IDENTIFIERS and the register counts ROOT NODES, and the two counts never cross (`§5.5.1`'s object-naming note).** **This block's declared-surface census (`2` value exports + `27` type declarations = `29` names in `store-core-graph.ts`, and `1` + `3` in `store-graph-references.ts` — **⟶ CORRECTED BESIDE 2026-10-01, `O-1`: the operative census is `2` value exports + `29` type declarations = `31` exported names, `GraphTierGetResult` and `GraphAffectedRow` being the two counted declarations, each named and each slotted into the terms at `§2.1` item `3`'s annotation; the second module's `1` + `3` is UNMOVED, and the ruling's own point — that it re-reads the register's subject set without adding, dropping or renaming an export — remains TRUE of the corrected figure**) is UNAFFECTED: the ruling re-reads the register's subject set without adding, dropping or renaming one export.**

**⟶ RE-CORRECTED BESIDE 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the paragraph above stands byte-for-byte). THIS BLOCK'S DECLARED-SURFACE CENSUS IS NOW `2` VALUE EXPORTS + `27` TYPE DECLARATIONS = `29` EXPORTED NAMES in `src/renderer/store-core-graph.ts` (`GraphPart` · `GraphMergedRead` being WITHDRAWN with the merged read), plus `1` value export and `3` type declarations in `src/renderer/store-graph-references.ts` — the second module's half UNMOVED.** **`O-1`'s OWN STATUS IN THIS BLOCK'S TABLE IS CORRECTED AT ITS OWN ROW (the merged read and its `parts` list are WITHDRAWN, not *"defined and now live"*), and the withdrawal adds, drops and renames NO OTHER name of this contract's declared surface: what it removes is TWO declarations and TWO result members, both of which existed ONLY to serve the withdrawn arm.** **THE BLOCK'S ARITHMETIC IS OTHERWISE UNTOUCHED: `17` entries = `4` re-statused (`O-1` · `O-2` · `O-6` · `O-12`) + `1` new (`O-17`) + `12` read at their own rows, `4 + 1 + 12 = 17` ✓ — where `O-1`'s disposition is now `WITHDRAWN` rather than `defined`, a CORRECTION OF STATUS AND NOT A CHANGE OF COUNT.**

**⟶ THE INTERACTION-PRECONDITION RULING'S EFFECT ON THIS BLOCK (2026-10-01; `RCA-8(d)` ANNOTATE-BESIDE — the `O-6` row, the arithmetic paragraph and the clarification paragraph above stand byte-for-byte).** **`O-6`'S OPERATIVE CLOSURE IS UNCHANGED AT `SIXTEEN` = `8` HELD + `5` THIS CONTRACT'S AMENDMENT + `3` THE TWO ARCHITECT AMENDMENTS (`8 + 5 + 3 = 16` ✓), because the withdrawn `§2.7` item 6 precondition REMOVES AN ARM AND NO MEMBER: the arm minted `'malformed-pattern'`, which is a HELD member of the union and STILL FIRES at its surviving construction-time site `§2.4` item 5(f) (carried at item `7`(g), driven by the register's `§5.5.1` `P-GR-IM-6` arm `(f)`).** **THE ROW'S OWN FIGURES ARE UNMOVED: the as-filed `EIGHTEEN` stays visible and corrected beside, the `THIRTEEN` printed membership stays visible, and the row's substantive claim — that the union IS re-closed by this contract, with the closure recorded at `§7a.1` item 1 — stands, so the entry remains `defined` and NOT `undefined-until-answered`.** **THE BLOCK'S OWN ARITHMETIC IS UNTOUCHED: the held overflow list's `16` entries plus `1` this contract adds = `17`, of which `4` are re-statused (`O-1` · `O-2` · `O-6` · `O-12`) and `1` is new (`O-17`), `4 + 1 + 12 = 17` ✓.** **THE UNION FIGURE IS RECONCILED SITE BY SITE AT `§2.1`'s block annotation's clause `(3)`, and the register's own totals — which this block does not print — are re-printed with their twenty-two terms at `§5.5.3`'s closing block item `(13)`.**

### 6.5 What this block is NOT, and what it owes

1. **IT IS NOT A CONTRACT.** It pins no behaviour, no signature and no fail-state. **Every one of those is the body of
   THIS FILE above**, and a clause of this block that could be read as a behaviour is read as a citation to the row
   that owns it.
2. **IT RELAXES NOTHING.** No prohibition row is amended, annotated or superseded **inside** this block; **the one
   reconciliation is BY ROW ID under a ruling that already landed.**
3. **IT OWES FOUR THINGS, EACH WITH A NAMED OWNER AND A POSITIVE REVISIT CONDITION, and NO BARE `OWED` APPEARS:**
   **(a)** the held dossier's **in-place** amendment (`A-6`/`A-7`/`A-8` re-statused; the `K-13` collision row and its
   reconciliation written into it) — **owner: the spec-gate pass; revisit: the same pass that files this contract's
   approval.** **(b)** the held contract's **one dated status marker** naming this successor path and the
   SUPERSEDED-BESIDE state — **owner: the supervisor's spec-gate pass; revisit: the gate that writes it.** **(c)** the
   held contract's **two arithmetic findings**, annotated beside the as-filed forms — **owner: the held unit's spec-gate
   pass or this one's; revisit: the first pass that touches either file.** **(d)** the **`G1` cell annotation and the
   `docs/pending.md` `P-7` row** — **owner: the orchestrator/supervisor; revisit: the gate-1 close-out pass.** **None of
   the four is `undefined-until-answered`, and none blocks the spec gate.**

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed owed wording above stands byte-for-byte and this clause is this pass's dated reading of it). ALL FOUR ARE DISCHARGED, EACH AT A NAMED SITE, BY THE IMMEDIATELY PRECEDING PASS (the architect's spec-gate pass, dated 2026-10-01).** **(a)** **the held dossier's IN-PLACE amendment** — `docs/specs/store-core-adoption-dossier.md` `§5.1` (the eight held rows `A-1`…`A-8` re-statused BY ROW ID with every as-filed cell kept: `5` read unchanged + `3` re-read = `8` ✓) and its `§5.2` (the ONE new collision row `K-13`, reconciled BY ROW ID against the ACTIVE row `R-9-SCOPE-BANS-A-GLOBAL-ENGINE-ID-KEYED-MAP-AND-NOT-A-PER-LINK-CALLER-KEYED-WALK-GATED-TARGET-SET`). **(b)** **the held contract's ONE dated status marker** — `docs/specs/store-core.md` `CURRENT STATE` (*HELD / SUPERSEDED-BESIDE*, naming this successor path and keeping its bytes). **(c)** **the held contract's TWO arithmetic findings, annotated BESIDE the as-filed forms** — `docs/specs/store-core.md` `§5.5.3` (the printed chain's `400` against the table's twenty terms summing to `374`, stale at five rows: `P-SC-IM-7` `24`/`8` · `P-SC-TP-3` `40`/`24` · `P-SC-IM-8` `24`/`22` · `P-SC-TP-4` `22`/`24` · `P-SC-TP-7` `14`/`20`, net `+26`) and `docs/specs/store-core.md` `§5.5.1` (its declared id range and family split `11 + 1 + 8` against the table's `12 + 1 + 7 = 20`), each citing `archive/findings/2026-10-01-store-core-register-arithmetic.md` as the settling measurement. **(d)** **the `G1` re-point and the `P-7` annotation** — `docs/next-steps.md`'s `G1` row (its in-cell re-point of the live contract to this successor, with no count moved) and `docs/pending.md`'s `P-7` row (its dated annotation carrying the register clarification and the four landed residues).** **NO ITEM IS WITHDRAWN AND NONE IS RE-OPENED: four owed things became four LANDED things, the held file's bytes are unmoved (only dated annotations added BESIDE its as-filed forms), and `§6.5` item `4`'s `UNVERIFIABLE — CARRIED` item keeps the architect as its owner and its own positive revisit condition.** **This annotation adds no new obligation, moves no count, and the four items listed above are NOT owed again by any later pass.**
4. **AND ONE ITEM IS `UNVERIFIABLE — CARRIED`:** **the lifetime of a translate-minted anchor/link instance across two
   loads is not answered by any byte this pass read** (the vendored package ships no `docs/`, so its type surface is the
   whole of what is reachable). **OWNER: the architect, or a shell-capable pass. POSITIVE REVISIT CONDITION: the first
   pass that must state whether such an instance is RE-DERIVED or REUSED on a second load — which is exactly what
   `§5.5.1` `P-GR-IM-12`'s load-cycle row is driven to detect.**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **THE UNIT IS NOT GREEN, NOT RED, AND NOT IMPLEMENTED.** **Its red set does not exist** (`CURRENT STATE` item 1).

   **⟶ ANNOTATED 2026-10-01 (THE TESTWRITER'S REPAIR PASS, `TW-1`/`TW-2`/`TW-3`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed sentence above stands byte-for-byte). ITS THIRD CLAUSE IS SUPERSEDED BESIDE: THE RED SET NOW EXISTS.** **`tests/store-core-graph.test.ts` and `tests/store-core-graph-register.ts` were filed and committed by the TestWriter's red-set pass (the two scoped commits `f7c4d32` and `278e316` at this repo's `HEAD` chain), the register's `22` rows and `249`-declared-attempt total are the figures the repair report measured, and `§5.5.3`'s closing block's own item `(9)` (*"the status is the DONE row's to report"*) is still the outstanding half: NOTHING HAS BEEN RUN as a green, and the DONE row does not exist.** **THE FIRST TWO CLAUSES ARE UNMOVED AND ARE THE ONES THAT MATTER FOR THIS PASS: the unit is NOT GREEN and its modules (`src/renderer/store-core-graph.ts`, `src/renderer/store-graph-references.ts`) DO NOT EXIST, which is the module-absence state the red set reports and the reason every row it drives reports either the absence or one of the contract gaps this pass closes.** **AND THE SEAM THIS PASS APPENDS IS DECLARED, NOT IMPLEMENTED: an implementation pass owes `nodeFor` · `anchorFor` · `linkFor` · `failNextCacheRebuild` in `store-core-graph.ts` beside the four as-filed members, subject to the same production-negative row — until then a row that needs one of the four REPORTS THE GAP rather than passing (`§2.1`'s block annotation, item `(2)`).**

2. **`RCA-12` BINDS EVERYTHING ABOVE: a `[T]` green is envelope/pure-layer evidence, and for this unit there is no other
   layer it could reach** — **with the one named exception of `P-GR-IM-12`'s `[H]` drive.** **No row of this unit claims a
   rendered, assembled or persisted fact.**
3. **THE UNIT'S OWN `[H]` HALF — the renderer wiring's construction and subscription role — is the wiring's, and a clause
   of this file that reads as landing it is a finding** (`§5.1` row 6).
4. **`cache` IS A LIVE OBJECT REFERENCE AND CANNOT CROSS AN IPC BOUNDARY** (`docs/specs/mcp-endpoint.md` `P-E6`). **This is
   WHY the graph is renderer-realm, and it is a boundary FACT, not a design preference.**
5. **THE WALK'S OWN COST CLAIM IS NOT MADE HERE.** **No timing figure of any kind exists in this file**, and **no row
   claims that a resolution is `O(1)`** — **a valid entry amortizes the LEAF, and nothing else.** **A later pass may not
   introduce a timing figure without its own measurement.**
6. **THE MERGED VALUE AND THE EXPORT ARE NON-AUTHORITATIVE.** **No node and no tier holds either; both are recomputed;
   and a row that treated one as committable or cacheable FAILS.**

   **⟶ AMENDED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — item `6` above stands byte-for-byte). THE ITEM'S SUBJECT SET SHRINKS TO ONE: THE MERGED VALUE IS WITHDRAWN WITH THE MERGED ARM, and the EXPORT's non-authoritative status stands alone (`§2.9` items `1`/`2`, `§2.5` item `4`).** **WHAT SURVIVES IN FULL FORCE: *"No node and no tier holds it; it is recomputed; and a row that treated it as committable or cacheable FAILS."*** **AND THE WITHDRAWAL ADDS A DUTY RATHER THAN REMOVING ONE: because the merged composite no longer exists, a caller that wants a subtree's values reads them from the NODES themselves — each node's value and each node's own `flag` — so a row that expects a store-assembled composite is a row against a withdrawn surface.**
7. **THE HELD CONTRACT'S ARITHMETIC IS NOT INHERITED, AND THIS FILE'S OWN AS-FILED ARITHMETIC IS KEPT VISIBLE.** **Its
   `21` rows, its `233` declared attempts and its twenty-one terms agree; its as-filed drive forms (`427`) are printed
   BESIDE the corrected ones rather than deleted, because a silent rewrite is the defect class itself.**

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS; `RCA-8(d)` ANNOTATE-BESIDE — the sentence above stands byte-for-byte and this clause is this pass's dated reading of it). THE `233` ABOVE IS THE OPERATIVE DECLARED TOTAL, AND THE TWENTY-ONE TERMS THAT *"AGREE"* WITH IT ARE `§5.5.3`'S CORRECTED COLUMN'S — NOT `§5.5.1`'S TABLE'S, WHOSE TWENTY-ONE PRINTED TERMS ARE THE AS-FILED FORMS AND SUM TO `427`.** **The operative pair is therefore `233` ≤ `400` ✔ with per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔, and the as-filed `427` named above is the kept-visible pre-correction total that FAILED the cap.** **The site-by-site reconciliation, the enumeration of all twenty-one terms and the one finding the gap raises (owner + positive revisit condition) are at `§5.5.3`'s closing block; no byte of the as-filed forms, of `§5.5.1`'s table, or of this item is rewritten.**
   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — item `7` above and its earlier annotation stand byte-for-byte). THE FIGURES ARE CORRECTED BESIDE: after the architect's monotonic-persistence amendment folded in by this pass, the register is `22` ROWS and its operative declared total is `249`, printed with all twenty-two terms and their chain at `§5.5.3`'s closing block items `(7)`–`(9)` — not `21` / `233`, and with the per-row maximum still `40` (`P-GR-IM-13`).** **THE ITEM'S METHOD IS UNMOVED AND IS EXACTLY WHAT THIS PASS DID WITH THE ADDED ROW: the held contract's arithmetic is not inherited; this file's as-filed arithmetic stays VISIBLE beside the corrected figures rather than deleted; and the added row `P-GR-IM-14` is an ADDITION with NO as-filed form — printed in the table, in the operand list and in the operative total (`233` + `16` = `249`) — so no as-filed cell had to be rewritten to accommodate it.** **AND THE FILE'S OWN DEFECT CLASS IS NOT RE-OPENED: every total printed by this pass carries its terms, the as-filed `427` and the corrected `233` remain the twenty-one-row record, and the two findings this pass files (`O-9`'s union count and `O-5`'s agreement set) each carry an owner and a positive revisit condition rather than a bare `OWED`.**

8. **THE LEDGER IS UNMOVED.** **`docs/next-steps.md` reads `21 DONE / 3 open` UNITS = `24`; row `G1`'s spec cell still
   reads `OWED — not filed`; and this pass moved no count.**
9. **THIS PASS RAN NOTHING AND COMMITTED NOTHING.** **No `npm test`, no leg, no `tsc`, no `typecheck:tests`, no build, no
   Electron boot, no MCP session, no `git` command.** **Every figure in this file is either this pass's own file read or
   a figure quoted from a named artifact with that ownership stated.**
10. **THE TWO CARRIED ITEMS ARE NAMED WITH OWNERS AND POSITIVE REVISIT CONDITIONS, and no bare `OWED` appears in this
    file:** **(a)** the `UNVERIFIABLE — CARRIED` anchor/link cross-load lifetime (`§6` item 4); **(b)** the held
    contract's two arithmetic findings and the held dossier's in-place amendment (`§6` item 3).
11. **THE TWO UNMATERIALISED ARMS THE TESTWRITER'S REPAIR REPORT NAMED ARE RECORDED HERE — 2026-10-01, ADDED BY THE
    SAME PASS THAT APPENDED THE SEAM'S ACCESSORS — each with its OWNER and a POSITIVE REVISIT CONDITION, and NEITHER ROW
    IS DELETED, WEAKENED, MERGED OR RE-POINTED BY THE RECORDING: `§5.5.1` `P-GR-IM-8` keeps its id, its `P-IM` type, its
    strategy id `S-GR-DIAG-1` and its term `7`; `§5.5.1` `P-GR-IM-6` keeps its id, its `P-IM` type, its strategy id
    `S-GR-REG-1` and its term `12`.** **Both dispositions are the `§3b` family's `CARRIED-WITH-OWNER (with a positive
    revisit condition)` — never a bare `OWED`, and never a silent skip.**
    **(a) `P-GR-IM-8`'s WRITE-TO-ORPHANED-REFERENCE ARM — `§2.3` item 6 row `(vii)`, the write side's twin of `(v)`,
    token `'severed-link'`, occupying no walk step.** **THE GAP, IN THE CONTRACT'S OWN WORDS: the arm's subject is a WRITE
    TO AN ORPHANED REFERENCE, and `§2.10` item 3 DELETES the `file`-flagged node on the far side of a severance (and
    RELEASES the subscriptions on it) rather than ORPHANING it — so NO STATE THIS CONTRACT'S DECLARED SURFACE CAN REACH
    presents an orphaned reference to be written to.** **The row's `7` arm-drives therefore carry this arm as the one the
    drive reports WITH ITS REASON (*"no subject"*), and the reporting is the row's honest reading rather than its
    evasion.** **OWNER: the architect, at the spec gate — the arm's reachability is a CONTRACT fact (`§2.10` item 3's
    reclaim rule), not an implementation choice, and NO PASS BELOW MAY MINT AN ORPHANED-REFERENCE STATE TO MAKE THE DRIVE
    PASS.** **POSITIVE REVISIT CONDITION: the first pass that changes `§2.10` item 3 from DELETE to ORPHAN — or that
    admits a severance leaving a link followable toward a cleared target — MUST re-drive this arm and print its step, its
    token and its receipt wording; until such a pass, a drive reporting this arm as HELD is a FALSE pass and a FINDING.**
    **⟶ ANNOTATED 2026-10-01 (THE TESTWRITER'S RED-SET REPAIR PASS, `TW-4`; `RCA-8(d)` ANNOTATE-BESIDE — the `(a)` paragraph above stands byte-for-byte and its UNREACHABILITY claim is SUPERSEDED BESIDE, not rewritten). THE WRITE-TO-ORPHANED-REFERENCE ARM IS DRIVEABLE, AND IT IS DRIVEN.** **THE SUBJECT IS SUPPLIED BY THE CONTRACT AT ITS OWN SITES, so the as-filed *"NO STATE THIS CONTRACT'S DECLARED SURFACE CAN REACH presents an orphaned reference to be written to"* is FALSE AS FILED: `§2.5` item `6` — *"A write whose walk reaches a link whose target is severed fails LOUDLY, with `reason:'severed-link'`, as a RETURNED RECORD"*; `§2.3` item `6` row `(v)` — *"the anchor exists and its link's target has been severed/reclaimed"*, at step `E-LINK`; `§2.3` item `6` row `(vii)` — *"the WRITE side's twin of (v) — a write to an ORPHANED reference"*, token `'severed-link'`, a RETURNED RECORD and *"occupying no walk step at all"* (`§2.3` item 6's own annotation: *"the seventh arm row `(vii)` is the write side and occupies NO step id"*); `§3.2` `F-7`'s own trigger — *"`set`/`commit`/`remove` on a path whose walk reaches a severed link"* — with its required behaviour *"`{status:'refused', reason:'severed-link', cleared: [], events: 0}` as a RETURNED RECORD — no pin set exists, and no silent no-op is admissible"*; and `§3.3` `I-6` — *"A WRITE TO AN ORPHANED REFERENCE FAILS LOUDLY, as a returned record."*** **AND THE CLAIM IS REFUTED BY THE RED SET'S OWN EXISTING DRIVES, NOT MERELY BY A RE-READ: `F-7` drives the arm in `tests/store-core-graph.test.ts` (a mint, a severance, then `set`/`commit`/`remove` through the severed link, each asserted `'severed-link'` with `cleared: []`), and this register's own `§5.5.1` `P-GR-TP-5` drives the same released reference (its severance classes read *"after the severance the released reference no longer answers a value"* and assert the refusal token).** **THE MISREADING THIS SUPERSEDES IS NAMED SO IT IS NOT REPEATED: `§2.10` item `3`'s reclaim rule DELETES the node on the far side of the severance — and that deletion is EXACTLY the state `E-LINK` names (*"severed/reclaimed"*), because what the caller still holds is the ANCHOR whose LINK's target is gone; the write walks to that anchor and fails on it, which is why the arm is a RETURNED RECORD and not the absence of a subject.** **WHAT THE DRIVE NOW DOES, SO THE READING IS CHECKABLE: it mirrors `F-7` — mint the anchor through the ordinary write path (`§2.8` item `3`), sever its link (`§2.10` item `3`), read the released reference's refusal token, then drive `set`/`commit`/`remove` through it, each asserting `'severed-link'` as a RETURNED RECORD with the diagnostic's `reason`/`step`/`segment`/`owner` read on the write receipt (`E-LINK`, the caller's failing segment, and the node the walk had REACHED).** **WHAT MOVES: NOTHING BUT THIS CLAIM — `§5.5.1` `P-GR-IM-8` keeps its id, its `P-IM` type, its strategy id `S-GR-DIAG-1` and its term `7` (`7` failure arms × `1` drive), the seven arm rows and the `2` self-carrying arms of `§2.3` item `6`'s table are UNMOVED, `§3.2` `F-7` keeps its id, its trigger, its token, its layer and its Pinned-by cell, the `OWNER`/`POSITIVE REVISIT CONDITION` clause of `(a)` above stays visible as the as-filed record of a claim this annotation supersedes, and the register's `22` rows, its `22` terms and the operative declared total `249` (`§5.5.3`'s closing block item `(8)`: `6` + `12` + `6` + `6` + `12` + `12` + `12` + `7` + `12` + `4` + `4` + `6` + `40` + `16` + `15` + `24` + `16` + `6` + `6` + `10` + `5` + `12`, `249 ≤ 400` ✔, per-row maximum `40` ≤ `100` ✔) are UNMOVED — so NO TERM IS RE-DERIVED BY THIS ANNOTATION AND THE `(b)` ITEM BELOW IS UNTOUCHED.** **THIS IS THE PASS'S ONLY EDIT TO THIS FILE (`§5.1`'s diff scope; no other byte of it moved).**
    **(b) `P-GR-IM-6` ARM `(e)`'s CONSTRUCTION-TIME HALF — `§2.4` item 5(e), *"a declared row colliding with another row
    for the same `(path, tier)`"* under `{onRepeat:'refuse'}`.** **THE GAP, ALREADY STATED BY `§2.4` ITEM 5'S OWN
    ANNOTATION: *"with no declared-row input there is no row input that could hold a second row for one `(path, tier)`
    pair, so the CONSTRUCTION-TIME half has NO SUBJECT"* — the arm is carried by the WRITE side (`§2.4` item 7(e)) and by
    `§2.7` item 4's two declared outcomes, so the row's six construction-time arms are driven as FIVE WITH A SUBJECT PLUS
    ONE REPORTED AS HAVING NONE, and the row's `12` (`6` arms × `2` halves) is UNMOVED because the absent half is
    REPORTED, never silently skipped or counted as held.** **OWNER: the architect, at the spec gate — the subject was
    removed by the register clarification (`§2.4`'s ruling block; `§7a.1` item 5, whose option `(a)` is withdrawn).**
    **POSITIVE REVISIT CONDITION: if the architect restores a caller-declared ROW input (`§7a.1` item 5's own priced
    reversal — `derived:false` rows return, the register's count is again `rows = R + C`, and a cold item is again a row),
    the construction-time half REGAINS ITS SUBJECT in that same pass and must be re-driven within the row's existing `6`
    arms × `2` halves — a term that does not move in either direction, so the operative twenty-two-term total
    (`249`, `§5.5.3`'s closing block item `(8)`) is unmoved by this recording.**
    **AND ONE NON-CONSEQUENCE IS STATED SO IT IS NOT INFERRED: recording these two arms moves NO count anywhere in this
    file — not the register's row count, not its terms, not its per-row maximum, not a `(bounded)` marking, and not the
    `§5.5.2` honesty block, whose item 4 (*"what the register does not prove"*) is UNMOVED.**

12. **THE LEGACY-FEATURE SWEEP (2026-10-01, ADDED BY THE WITHDRAWAL PASS, WHICH ALSO RE-DERIVED `M-5`, `F-8` AND `§5.5.1` `P-GR-TP-7`) — EVERY MECHANISM THIS CONTRACT PINS, CLASSIFIED AGAINST ONE QUESTION: *does the node-graph model make this unnecessary* — because the graph is the source of truth, because nodes carry their tier flag locally, because anchors are immutable, because reachability collects, or because the store's own operations already produce the same observable?** **THE THREE CLASSES: `EXCISE NOW` (never built — no `src/**` code and no test drive that would lose its subject) · `MARK FOR REMOVAL` (present in the build at `HEAD` `f262e67` and therefore to be removed by a SUBSEQUENT pass, with the site named) · `KEEP` (with the clause that requires it).** **NO `src/**` EDIT IS MADE BY THIS PASS, so every `MARK` is a hand-off and not a change; and the sweep is stated as A DETERMINATION MADE BY READING the two modules, the two test files and this contract's own clauses — not as a measurement of a run.**
    **(a) `EXCISE NOW` — TWO MECHANISMS, EACH WITH THE EVIDENCE THAT IT WAS NEVER BUILT.** **(1) THE PER-TIER RESIDENCY TRIE** (the seed's first item, kept in the held model *"as an index"*): **NO SUCH MECHANISM EXISTS ANYWHERE IN THE BUILD OR THE RED SET** — a tree-wide search for `Trie`/`trie`/`holdsExact`/`holdsDescendantBelow` returns NO IDENTIFIER; what it returns is one row LABEL that says the counts are read *"never from a trie"*, and this contract's own clauses, which name a trie only to EXCLUDE it (`§2.4` item 6: *"The COUNTS are read from the register's own rows, never from a trie or a node count"*; `§7a.1` item 11's parenthetical about the held table). **The graph IS the index** (`§3.3` `I-1`), so nothing is owed a replacement, and the one query the trie could have contributed — the merged arm's descendant-below lookup — is WITHDRAWN with the merged read (`§0`(A3)).** **CONSEQUENCE FOR `§6.4`: the `O-2` overflow entry — *"the residency index (the held per-tier trie) … RE-READ AS AN INDEX"* — has NO SUBJECT in this contract, which pins no index beside the register and the two caches; it is read here as `WITHDRAWN`-BY-NON-ADOPTION rather than as a live mechanism, and a later pass that wants it back owes a clause that pins it and an amendment with its own gate.** **(2) THE PER-TIER ALIAS DECLARATION:** never adopted (`§2.3` item 1 — the tier token is a FILTER and not part of a name — and the held `lowerAliases` shape was superseded in the held model), so there is nothing to excise from the build; it is recorded so a later pass does not RE-IMPORT it. **THE PIN SET IS NOT RE-LISTED HERE: ruling `11` already withdrew it and the build carries no pin structure — it is the first precedent for this sweep's pattern, not a fourth item.**
    **(b) `MARK FOR REMOVAL` — THE SYMBOLS THE BUILD STILL CARRIES BECAUSE THE RED SET WAS AUTHORED BEFORE THIS RULING, EACH WITH ITS SITE.** **(1) `src/renderer/store-core-graph.ts:mergedAnswer` — a COMPLETE implementation of the withdrawn arm, DEFINED ONCE AND NEVER CALLED (the live composite path is the inline block in `:resolveRead`); it is DEAD CODE from today, not scaffolding.** **(2) `src/renderer/store-core-graph.ts:resolveRead` — the COMPOSITE FALL-THROUGH below the declared miss (`:collectParts` → `:partsUnder` → the `merged:true` object), and with it the two helpers `src/renderer/store-core-graph.ts:collectParts` and `:partsUnder`, which have NO OTHER CALLER.** **(`src/renderer/store-core-graph.ts:heldPathsOf` is NOT in this set: `:sweepOp` calls it for the swept path list, so it KEEPS — the two call sites are named so the removal set is exact.)** **(3) `src/renderer/store-core-graph.ts:exportOf` — the `read.tier === null` branch, which re-assembles the composite for the export's result.** **(4) THE FOUR WITHDRAWN DECLARATIONS AND MEMBERS in `src/renderer/store-core-graph.ts` — `:GraphPart` · `:GraphMergedRead` · the `merged?: undefined` / `parts?: undefined` member lines of `:GraphReadHit` and `:GraphReadMiss` · the `| GraphMergedRead` member of `:GraphResolveResult` (`§2.1`'s block annotation, item `(2)` of the amended reading).** **(5) `src/renderer/store-core-graph.ts:deepestExisting` and `:climbToBound` — two FURTHER functions DEFINED ONCE AND NEVER CALLED (the first reads a node by name, the second walks a parent chain toward a bound and opens by discarding its own argument); neither is a mechanism this contract pins, so each is dead code in a module whose export census is itself a contract claim.** **OWNER for the whole set: the unit's next `src/**`-bearing pass (the Implementer pass that answers this red set). POSITIVE REVISIT CONDITION: that pass, which must ALSO keep the module's exported NAME SET at the amended census (`2` + `27` = `29` exported names, `§2.1` item `3`'s second annotation) — a module still exporting the two withdrawn types FAILS the census row.**
    **(c) `KEEP` — EVERY OTHER MECHANISM THIS CONTRACT PINS, WITH THE CLAUSE THAT REQUIRES IT.** **THE TWO CACHES** (`§2.6` items `1`/`2`/`3`, `§3.3` `I-14`, `§5.5.1` `P-GR-IM-5`): **they neither overlap each other nor duplicate a trie — the register cache is keyed by TOP-LEVEL NAME ONLY and the per-link cache is held ON one link (`GraphLink.cache`), two disjoint key domains, and no trie exists to duplicate (item `(a)`(1)).** **THE TIER COLLECTIONS / `GraphTierHandle` / `store.tiers`** (`§2.5` item `3`: the hit's `cache` IS `store.tiers[hit.flag]` BY IDENTITY; `M-3`): **a VIEW over the graph and not a second table (`§3.3` `I-1`), so it cannot be removed without a contract change — and, recorded honestly, NO HOST CONSUMER OF IT EXISTS IN THE BUILD YET (the wiring role of `§5.1` row `6` has not landed), which is a REASON TO KEEP IT AS PINNED and not a reason to drop it.** **THE TIER-LOCAL `get`/`set`/`has`/`clear` SURFACE** (`§2.1`'s `GraphTierHandle` block): **not made redundant by the read — `§5.5.1` `P-GR-IM-7`'s five drive forms include *"the tier-local `get`/`has` pair"* and `P-GR-IM-13`'s four calls are *"an unqualified `resolve` · a qualified `resolve` · the tier-local `get` · the tier-local `has`"*, so removing the surface would void two rows' subjects.** **`sweep` AND `clear` BESIDE `remove`** (`§2.8` item `4`; `§2.10` item `2`'s arm table; `§3.2` `F-21`): **three DISTINCT observables — `clear` is TIER-LOCAL and NON-RECURSIVE with one event per cleared reference · `sweep` clears the swept entries and emits `N` events for `N` swept entries · `remove` CLEARS DOWNWARD — and `F-21`'s second half (`repaired: []` on `clear`/`sweep` while `set`/`commit`/`remove` are evaluated) is unsatisfiable if either is removed; ONE HONEST OBSERVATION IS RECORDED RATHER THAN ACTED ON: the word *"unmark"* survives in `§2.8` item `4`'s as-filed sentence, while in this model a node's flag is never a MARK (`§2.1`'s `GraphNode` block) — that verb is a residue of the flag-table model's vocabulary and is a SPEC-WRITER'S item, not a mechanism to delete.** **THE MULTI-LEVEL EXPORT** (`§2.9` items `1`–`3`, `§3.3` `I-17`, `M-15`, `F-22`, `§5.5.1` `P-GR-TP-4`): **a clone or a reference does NOT make it unnecessary — passing a subtree hands the caller nodes it already holds, while the export is the contract's ONE multi-level read of a subtree's values as a fresh NON-AUTHORITATIVE snapshot; only its merged branch is `MARK` (item `(b)`(3)).** **THE `'severed'` EVENT ARM, DISTINCT FROM THE READ'S MISS/REFUSAL ARMS** (`§2.10` item `3`, `§3.3` `I-16`, `F-11`, `§5.5.1` `P-GR-TP-5`): **the event arm is the RELEASE REPORT a reclaim owes a live subscriber, while `'severed-link'` is the read/write side's own refusal token at `E-LINK` (`§3.2` `F-5` · `F-7`) — two observables of one graph fact, and a reclaim that released a reference and reported nothing is the silent disappearance `F-11` exists to catch.** **THE CONSTRAINT TABLE, THE `'repair'` ARM AND THE `{onRepeat}` ROUTING** (`§2.7` items `1`–`6`, `§3.1` `M-6`, `M-13`, `§3.2` `F-21`, `§5.5.1` `P-GR-IM-3`). **THE REGENERATION TRANSACTION, ITS CENSUS INSTRUMENT, THE STUBBED CROSSING SEAM AND THE STABLE-JSON TRANSLATION** (`§2.8` items `5`–`9`, `§3.1` `M-11`/`M-12`, `§5.5.1` `P-GR-SM-1`). **THE TWO-RUN DIFFERENTIAL AND ITS CANONICAL COMPARATOR** (`§2.6` item `6` — with its `parts` clause alone re-derived beside that item — `§3.4` `R-5`, `§5.5.1` `P-GR-IM-13`). **THE REGISTER'S PROJECTION AND THE HOLDER INDEX BESIDE IT** (`§2.4` item `3`; `§5.5.1` `P-GR-IM-4`). **THE SEAM'S FAULT INJECTOR AND ITS STALE-ENTRY SET** (`§2.3` item `6`(vi), `§3.2` `F-6`, `§5.5.1` `P-GR-IM-8`). **THE NAME-DECLARATION INPUT MODULE** (`§2.4` item `8`, `§2.1` item `2`, `§5.5.1` `P-GR-TP-6`). **THE REPEATED-SEVER IDEMPOTENCE RECORD** (`§5.5.1` `P-GR-TP-5`'s fifth severance class: *"a link whose target is already severed (the idempotence positive control)"*, which reads the receipt's `cleared[]` on a SECOND sever).**
    **(d) ONE BUILD GAP THIS SWEEP FOUND AND DID NOT CLASSIFY AWAY — the OPPOSITE of a legacy mechanism: THE PER-ENTRY `active` MARK IS NEVER SET TO `true`.** **`src/renderer/store-core-graph.ts:setValue` writes `active:false`, `:evaluateConstraints` is the ONLY reader, and NOTHING ELSE WRITES THE MEMBER — so the `count-exactly-one` repair's `≥2` arm can never fire, while the contract pins that repair as a DECIDED clause (`§2.7` items `3`/`5` — the next-surviving-by-`order` rule and its WRAP — driven by `§3.1` `M-13` and `§3.2` `F-21` and carried by the register fixture's own `count-exactly-one` row).** **CLASSIFICATION: `KEEP` for the MECHANISM (it is required by clause) and a RECORDED GAP for the BUILD — OWNER: the unit's next `src/**`-bearing pass; POSITIVE REVISIT CONDITION: that pass either makes the mark writable through the declared surface, or the row that drives the `≥2` arm reports the gap as a FAILURE (`§5.5` item `5`).** **AND IT IS STATED AS A FINDING RATHER THAN A CLASSIFICATION: whether the mark is INTENDED to be settable by a caller could NOT be verified from the docs and the tests alone, because this contract's surface declares NO member that sets it.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**One clause is reported rather than guessed, and it is narrow.** **`§2.4` item 6's `RCAP-3` names the amplifier-form
subscription as its subject, and neither the record nor the plan states what a "prefix / tier-wide" subscription MEANS
for a graph store** — the held model's amplifier form was defined over a per-tier declaration table, which this model
does not have. **This filing therefore declares the amplifier form as `{subtree:true}` alone** (the one form the surface
carries), **drives it with the fixture, and leaves a prefix form to the escalation `§7a.1` item 7 names.** **A TestWriter
CAN derive a falsifiable row from that** — the cap, its value and its outcome are all pinned — **so this is a REPORT, not
a blocked clause.** **Everything else in this file is derivable.**

### 7a.1 THE DECISION REQUESTS — ELEVEN ITEMS, EACH WITH A WORKING DEFAULT, A RECOMMENDATION, AND WHAT IT AFFECTS

**These are the clauses this filing resolved AS A WORKING DEFAULT rather than derived from a source. Each is IMPLEMENTED
in `§2`, so the red set is authorable today. The architect's ruling on any one of them is a spec amendment with its own
gate, and NO item is `undefined-until-answered`.**

| # | The decision | Options | RECOMMENDATION (the working default implemented) | What it affects if reversed |
| --- | --- | --- | --- | --- |
| **1** | **The refusal union's closure — the FIVE members this amendment adds** (`'duplicate-path-tier'` · `'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'` · `'tier-filter-miss'`), beside the held EIGHT | **(a)** close the union at **eighteen** members, with the five added and each mapped to its own arm; **(b)** mint fewer by reusing held tokens; **(c)** leave the closure open | **(a)** — **the four proposal-side tokens exist because the held union has no member for their arms (`'no-such-anchor'`'s use of `'undeclared-name'` would be a MISREPORT of a closed union), and the fifth is the round-3 uniqueness ruling's own loud failure.** **The held `'tier-contradiction'` is NOT carried: the round-2 `A-D` answer removed the two-authority disagreement it named, and the token it was re-pointed to is `'tier-filter-miss'`** (**⟶ CORRECTED BESIDE 2026-10-01, `O-9`: the recommended closure figure `eighteen` is superseded by the operative **`SIXTEEN` = `8` held + `5` this amendment's + `3` added by the two architect amendments folded in by this pass** — `'serialize-failed'` (A1's serialization failure) · `'validate-failed'` (A1's validation failure) · `'durability-inversion'` (A2's monotonic-persistence refusal), each mapped to its own arm at `§2.8` item `6` and `§2.4` item `7`(h). **THE ITEM'S REVERSIBILITY IS UNCHANGED AND ITS OPTIONS STAND:** `(a)` remains the recommendation, now read as *"close the union at SIXTEEN members, with the eight added members (five + three) each mapped to its own arm"*; `(b)` *"mint fewer by reusing held tokens"* is refused on the same ground the item already states — a reused token would MISREPORT a different failure class, which is exactly what `'rebuild-failed'` is kept from doing for the serialization and validation arms — and `(c)` *"leave the closure open"* stays refused. **Any reversal is a spec amendment with its own gate, and the reconciliation with the printed membership is at `§2.1`'s block annotation. THE ITEM IS NOT `undefined-until-answered` BEFORE OR AFTER THIS CORRECTION**) | `§2.1`'s `GraphRefusalReason`, `§2.3` item 6, `§2.4` item 5, `R-4`, `§6.4` `O-6` |
| **2** | **The flag's declaration site — WHICH OPERATION MINTS A NODE'S `type`** | **(a)** `commit` mints and re-mints it; **(b)** `set` carries it as a new parameter; **(c)** a declaration carries it | **(a)** — **the regeneration transaction is already the one operation that re-tiers, so the flag's site and the transaction's site are ONE; a `set`-supplied flag would be a flag the CALLER declares, and a flag nobody declares is a default, closed by the held `P-2`** (**⟶ AMENDED READING 2026-10-01, `A2`; THE RECOMMENDATION IS UNMOVED — `commit` still MINTS and RE-MINTS, `set` still never mints — and the minted flag's VALUE RANGE is now BOUNDED BY THE PARENT NODE'S OWN FLAG: `durability(minted flag) ≤ durability(parent node's flag)` under `file` > `mem` > `temp`, with `secure` outside the ordering, and a violation is REFUSED `'durability-inversion'` (`§2.1`'s named-invariant block; `§2.4` item `7`(h); the mint-side site is `§2.8` item `3`). **THE FLAG'S SITE IS UNMOVED: `commit` alone mints and re-mints it, and no option `(b)`/`(c)` is revived — the bound is a CONSTRAINT ON THE MINTED VALUE, not a second declaration site**) | `§0A` note 4, `§2.8` items 1/3, `M-9`, `F-4`, `§5.5.1 P-GR-IM-11` |
| **3** | **THE SEVERANCE'S EVENT AND ITS CROSSING** — what a reachability-triggered reclaim emits, and what it crossed on | **(a)** an EIGHTH `cause` token `'severed'`, per released reference, with the released reference named in the severing receipt; **(b)** report it through the existing `'remove'` arm; **(c)** no event; **(d)** a write-failure token only, with the reclaim event-free | **(a)** — **`(b)` makes a reclaim indistinguishable from a caller-requested removal and falsifies the held `'remove'` arm's own sentence; `(c)` is the silent second write the `'repair'` arm's reason forbids; `(d)` leaves a live listener observing a reference the graph no longer contains.** **The count row is RE-DERIVED, not relaxed: one event per RELEASED reference** | `§2.10` items 2/3, `R-2`, `F-11`, `§5.5.1 P-GR-TP-5` |
| **4** | **The severance's `file`-flagged ORDERING and its recovery window** | **(a)** persist-then-delete (the landed order), with the crash window declared as *"a lost WRITE, never a lost DELETE"*; **(b)** a tombstone; **(c)** delete-then-persist | **(a)** — **(c) inverts a landed ordering and is refused on the merits; (b) is the named escalation if the architect wants the durable tier's crash window closed too** (**⟶ AMENDED READING 2026-10-01, `A1`; THE RECOMMENDATION IS UNMOVED — persist-then-delete stands, and the tombstone stays the named escalation — and the `file` HALF of the ordering now MEANS MORE: the tier-1 write that ACCEPTS the deletion's premise is itself gated, because a `file`-tier write must be SERIALIZED to stable JSON AND THE SERIALIZED FORM VALIDATED before it is accepted (`§2.8` items `5`/`6`), so a severance whose crossing cannot be converted to saveable JSON FAILS with a returned record and NOTHING is deleted and NO reference is released (no `cause:'severed'` event fires). **The cross-window sentence *"a lost WRITE, never a lost DELETE"* is UNMOVED, and `M-14`'s assertions keep their shape**) | `§2.11` item 4, `M-14`, `§6` item 3(b) |
| **5** | **THE REGISTER'S IDENTITY FOR A COLD ITEM** — purely derived, or a caller-declared row beside the projection | **(a)** a declared row beside the graph-derived projection, so a cold item is `derived:false` and the held refusal/miss distinction survives at top level; **(b)** purely derived, with the miss re-homed on a node that does not exist | **(a)** — **it preserves the held `F-9` control EXACTLY: an unregistered name is a TYPED REFUSAL while a declared-but-unwritten name is a MISS, and the two stay decidable by their own positive controls. Under (b) the held control would have no subject** | `§2.4` items 3/4, `F-2`, `§6.2` `A-6`, `§5.5.1 P-GR-IM-4` |
| **6** | **Where `reserved` and the per-leaf pattern kind RE-HOME** — the register can express a top-level prohibition but not a per-leaf one | **(a)** `reserved` re-homes on the ANCHOR for a per-leaf instance and on the register row for a top-level item; a per-leaf pattern is retired, and a TOP-LEVEL pattern is admitted; **(b)** drop them (which makes the landed two-call control unsatisfiable — a landed-ruling regression, not a simplification); **(c)** a small per-reference exception table beside the register (which strains the one-home rule) | **(a)** — **it is the only option under which the landed two-call control passes: the reserved entry's own removal REFUSED `'reserved-name'`, a sibling instance's removal SUCCEEDING** | `§2.4` items 1(d)/7(f), `F-20`, `§5.5.1 P-GR-IM-6` |
| **7** | **THE REGISTER-SIDE CAPS' VALUES** (`RCAP-1`/`RCAP-2`/`RCAP-3`) | **(a)** keep the held figures `1024`/`4096`/`64` as working values with an explicit re-derivation duty; **(b)** re-derive all three from the register's own worst case; **(c)** one cap only, leaving the per-family counts uncapped | **(a)**, **with the RE-DERIVATION DUTY NAMED** — **the held values were derived for a DIFFERENT quantity (tier-collection elements and amplifier subscriptions), so a value inherited across a quantity change is exactly the class the terms discipline exists to surface.** **The OUTCOME is NOT reversible: a refusal that clears and emits nothing is the landed `C-3` posture.** **(c) is not admissible as stated, because it re-opens the population-bound finding the caps exist to answer** | `§2.4` item 6, `§0A` note 6, `F-13`, `§5.5.1 P-GR-TP-3`, `§7a` |
| **8** | **THE STORE-MINTED HANDLE'S OWN MINTING RULE** | **(a)** a per-graph counter, monotone within one store's graph, serializable for the translation; **(b)** a random-free derived handle (a path of anchor keys); **(c)** the node object itself, by identity | **(a)** — **it is the only option that keeps the handle SERIALIZABLE for the translation and TESTABLE by a row.** **The price is the static row's re-pointing, and the price is paid: `R-9`'s control is RE-POINTED so that it REDDENS on a global engine-id-keyed map, passes on this store, and FAILS as vacuous if it cannot distinguish them** | `§2.2` `P-8`, `§2.4` item 2, `§3.4` `R-9`, `F-25`, `§6.3` `K-13` |
| **9** | **THE EXPORT'S CROSSING RULE** — may a multi-level export cross an IPC boundary, and must it be JSON-safe | **(a)** LOCAL-ONLY, not required to serialize (the directive's own words *"for local use within a function"*); **(b)** it may cross, and is then JSON-safe; **(c)** no export | **(a) as the contract clause, with (b) named as the ESCALATION if a host caller ever needs it** — **the authority answer (a fresh NON-AUTHORITATIVE snapshot) is already right and reuses the status the held model declares for its one composite** | `§2.9` items 1/3, `F-22`, `§5.5.1 P-GR-TP-4` |
| **10** | **THE PER-`(PATH, TIER)` REPEAT'S ROUTING SURFACE** — where the "per call params" of the round-3 ruling lives | **(a)** an OPTIONAL parameter on the write surface (`{onRepeat}`/`{onDuplicate}`), whose default is `'edit'`, with the constraint row's own `onRepeat` as the second site and the call OVERRIDING the row; **(b)** a constraint-row-only declaration (which cannot vary per call); **(c)** no parameter, with the outcome fixed by the model | **(a)** — **the ruling's own words are *"per call params"*, and a row that cannot express a per-call choice would not carry the ruling. The default `'edit'` is the non-destructive arm and matches the held model's own preference for an edit over a second node** (**⟶ AMENDED READING 2026-10-01, `A2`; THE RECOMMENDATION IS UNMOVED — the `{onRepeat}`/`{onDuplicate}` parameter, its `'edit'` default and the constraint row's second site all stand — and ONE ADJACENT ARM IS ADDED so the routing surface is not read as the only refusal a repeat or a mint can draw: a mint or a regeneration whose requested tier is MORE DURABLE than the node's parent node's flag is REFUSED `'durability-inversion'`, which is NOT this arm's `'duplicate-path-tier'` and NOT a repeat outcome at all (`§2.4` item `7`(h); `§2.1`'s named-invariant block)). **The `'edit'` outcome still NEVER CHANGES A FLAG, which is one of the three sites that enforce the invariant** (**⟶ RE-DERIVED 2026-10-03, THE ACTIVE ROW `D-GP-…-CONSTRAINTS-ARE-FUNCTIONS`; `RCA-8(d)` ANNOTATE-BESIDE — THE RECOMMENDATION'S WRITE-SURFACE HALF STANDS, AND ITS CONSTRAINT-ROW HALF IS SUPERSEDED: the `{onRepeat}`/`{onDuplicate}` OPTIONAL PARAMETER on the write surface and its `'edit'` DEFAULT are WRITE MACHINERY and stay; the SECOND SITE — the constraint row's own `onRepeat` — IS REMOVED, because the RE-DERIVED CONSTRAINT ROW CARRIES NO `onRepeat` MEMBER (`§2.1`'s block; `§2.7` items 1/4), so the CALL has no row-level site to override; `'duplicate-path-tier'` remains the write-side refusal the pair-routing draws (`§2.4` item 7(e)), and the effect blocks below that repeat *"the constraint row's second site ... stand"* are read UNDER this annotation) | `§2.3` item 5, `§2.7` item 4, `§2.1`'s `GraphWriteOptions`, `M-6`, `§5.5.1 P-GR-IM-3` |
| **11** | **THE REGENERATION TRANSACTION'S CENSUS TERM** — which count the match compares | **(a)** the TIER'S OWN ROW COUNT, per the held cap discipline (*"the caps are counted at the tier that holds the collection, from the TIER'S OWN TABLE (never from the trie)"*); **(b)** the resident set's own segment total, per the held floor row; **(c)** both, disjunctively | **(a)**, **with (b) carried as the CORROBORATING reading asserted BESIDE the comparison and never substituted for it** — **(a) uses the same instrument as the cap that bounds the write, so the transaction's all-or-nothing test and its population bound are one quantity** (**⟶ AMENDED READING 2026-10-01, `A1`; THE RECOMMENDATION IS UNMOVED — option `(a)`, the tier's own row count, with `(b)` as the CORROBORATING reading asserted beside it — and the CENSUS STEP'S POSITION is now explicit: it is step `(2)` of the transaction's five steps, so the census decides whether steps `(3)`–`(5)` run at all, and the SERIALIZATION and VALIDATION gates precede acceptance (`§2.8` items `5`/`6`). **The instrument, its non-interchangeability with the segment total and `M-12`'s assertion are UNMOVED; the item's options `(b)`/`(c)` stay as priced**) | `§2.8` item 5, `M-12`, `F-9`, `§5.5.1 P-GR-IM-9` |

**⟶ THE CLARIFICATION'S EFFECT ON THESE ELEVEN, PRINTED ONE BY ONE (2026-10-01) — SO *"WHICH DEFAULTS MOVED"* HAS ONE ANSWER AND NO READER HAS TO INFER ONE FROM THE ANNOTATIONS.** **ONE MOVED, TEN DID NOT.** **THE ONE THAT MOVED IS ITEM `5` — *"THE REGISTER'S IDENTITY FOR A COLD ITEM"* — which is the successor-side row of the record's `DR-1`(i)/(ii) and `DR-9`. ITS NEW WORDING, in the reversible-default form this table keeps: *"THE WORKING DEFAULT IS **A PURELY DERIVED REGISTER**: every row is the graph's projection of a ROOT node, the register holds ONLY top-level names (the root nodes of descendant trees) and nothing below a root, a row exists for a root or not at all, and **A COLD ITEM IS A ROOT NAME WITH NO ROW YET** — expressed by the ROW'S ABSENCE and answered as the DECLARED MISS (`§2.4` items 3/4's annotations). The as-filed option `(a)` — a caller-declared ROW beside the graph-derived projection — IS WITHDRAWN.* **REVERSIBLE: the architect may restore a caller-declared ROW input, in which case `derived:false` rows return, the register's count is again `rows = R + C`, and the cold item is again a row — at the as-filed `(a)` cost this table already prices (two declaration surfaces for one item, the second-authority class `P-13` makes expensive). NO REVERSAL RE-OPENS THE HELD `F-9`/`F-2` CONTROL EITHER WAY: under the ruling the control's subject is the top-level name declaration.**"** **Note for the record that `DR-1` is split across items `1` (its `(iv)`), `2` (its `(iii)`) and `5` (its `(i)`/`(ii)`): ONLY item `5`'s part of `DR-1` moves.** **THE TEN THAT STAND, with the two the ruling was CHECKED against named explicitly so the check is visible rather than assumed: item `10` — *"THE PER-`(PATH, TIER)` REPEAT'S ROUTING SURFACE"*, i.e. the round-3 `DR-11` ruling's own surface — is **NOT MOVED**: the routing, its `{onRepeat}`/`{onDuplicate}` parameter and its `'edit'` default are unchanged, and the ruling only fixes that the constraint is counted over NODES, so a non-root path is not a register row and a root's pair is (`§2.3` item 5's and `§2.7` item 4's annotations); item `7` — *"THE REGISTER-SIDE CAPS' VALUES"*, i.e. the record's `DR-8` — is **NOT MOVED IN VALUE AND NOT MOVED IN OUTCOME**: `1024`/`4096`/`64` stand as working values with the re-derivation duty named, only the QUANTITY is fixed (ROOT ROWS — `§2.4` item 6's annotation), and no figure, term, cap row or falsifier changes.** **Items `1` · `2` · `3` · `4` · `6` · `8` · `9` · `11` are untouched by the ruling and stand exactly as filed.**

---

**⟶ THE TWO AMENDMENTS' EFFECT ON THESE ELEVEN, PRINTED ONE BY ONE (2026-10-01, THE DOCS-REPAIR PASS) — SO *"WHICH MOVED"* HAS ONE ANSWER AND NO READER HAS TO INFER ONE FROM THE ANNOTATIONS ABOVE.** **THE COUNT OF `eleven` IS UNMOVED: no item is added, dropped or renumbered, and both amendments are CONTRACT CONTENT folded in at `§2`, not new decision requests.**

**ONE MOVED.** **ITEM `1` — *"the refusal union's closure"*: its recommended figure moves from `eighteen` to the operative `SIXTEEN` = `8` held + `5` this contract's amendment + `3` added by the two architect amendments (`'serialize-failed'` · `'validate-failed'` · `'durability-inversion'`).** **REVERSIBLE, in this table's own form: the architect may re-close the union at any figure; the reversal's cost is a re-print of the count with its terms at `§2.1`'s block annotation, `§6.4`'s `O-6` row, `§6.1`(d)'s token list and the file-end note — and it re-opens nothing else, because no arm, no token's meaning and no clause body of `§2` moves. The item's options `(b)`/`(c)` stand refused as priced.**

**FOUR GAINED AN AMENDED READING WITH THEIR RECOMMENDATION UNMOVED (each annotated in its own cell above): ITEM `2`** (the flag's minting site — `commit` still mints and re-mints and `set` still never mints; the minted flag's VALUE RANGE is now bounded by the parent node's own flag, with `'durability-inversion'` its refusal) · **ITEM `4`** (the severance's `file`-flagged ordering — persist-then-delete stands and the tombstone stays the named escalation; the tier-1 write that ordering accepts is now gated by serialization and validation, so a failed crossing deletes nothing and releases nothing) · **ITEM `10`** (the per-`(path, tier)` repeat's routing surface — the `{onRepeat}`/`{onDuplicate}` parameter, its `'edit'` default and the constraint row's second site stand; `'durability-inversion'` sits BESIDE the arm and is not a repeat outcome) · **ITEM `11`** (the regeneration's census term — option `(a)` and the tier's own row count stand, with the corroborating segment total still asserted beside; the census is now step `(2)` of the transaction's five steps).

**SIX DID NOT MOVE, EACH FOR A NAMED REASON: ITEM `3`** (the severance's event and crossing — the `'severed'` arm, its one-event-per-released-reference count and its receipt naming the released reference are untouched by both amendments, and a FAILED file commit emits no such event at all) · **ITEM `5`** (the register's identity for a cold item — already settled by the architect's register clarification, whose ONE moved default stands as printed in the block above; neither amendment re-reads it) · **ITEM `6`** (where `reserved` and the per-leaf pattern kind re-home — neither amendment touches the anchor/row home, the pattern kinds or `F-20`'s two-call control) · **ITEM `7`** (the register-side caps' values — `1024`/`4096`/`64` stand with their re-derivation duty, because MONOTONIC PERSISTENCE IS VACUOUS AT A ROOT and the caps still count ROOT ROWS) · **ITEM `8`** (the store-minted handle's minting rule — a per-graph, monotone, serializable handle stands with its `R-9` re-pointing intact; neither amendment adds a counter, a UUID or a lookup key) · **ITEM `9`** (the export's crossing rule — LOCAL-ONLY and not required to serialize, with the JSON-safe crossing form still the named escalation; the amendments' serialization gate is the TIER-1 WRITE's and reads nothing of the export)** — **and the census agrees with the table: `1` moved + `4` amended readings with unmoved recommendations + `6` unmoved = `11` ✓.**

**⟶ THE INTERACTION-PRECONDITION RULING'S EFFECT ON THESE ELEVEN (2026-10-01; `RCA-8(d)` ANNOTATE-BESIDE — every cell of the table above and both effect blocks above stand byte-for-byte). ZERO OF THE ELEVEN MOVE, AND ITEM `1`'S FIGURE IS RE-PRINTED WITH ITS TERMS RATHER THAN TOUCHED.** **THE COUNT OF `eleven` IS UNMOVED: no item is added, dropped or renumbered by this ruling — the withdrawn `§2.7` item 6 precondition was a CONTRACT CLAUSE, not a decision request, and the cascading form's fate is settled by the ruling itself rather than left to a default.** **ITEM `1` — *"the refusal union's closure"*: its operative figure is `SIXTEEN` = `8` HELD + `5` this contract's amendment + `3` the two architect amendments (`8 + 5 + 3 = 16` ✓), and THIS RULING DOES NOT MOVE IT, because the withdrawal removes an ARM and no MEMBER — the withdrawn arm's token `'malformed-pattern'` is a HELD member with a surviving construction-time site (`§2.4` item 5(f), carried at item `7`(g)) — so the item's options `(a)`/`(b)`/`(c)` and its refusal of `(b)` (*"a reused token would MISREPORT a different failure class"*) stand exactly as filed.** **ITEM `10` — *"the per-`(path, tier)` repeat's routing surface"* — is NOT MOVED: the constraint ROWS' independence says nothing about the repeat outcome, and the `{onRepeat}`/`{onDuplicate}` parameter, its `'edit'` default and the constraint row's own `onRepeat` second site all stand.** **ITEMS `2` · `3` · `4` · `5` · `6` · `7` · `8` · `9` · `11` are untouched by this ruling, each for the reason the two effect blocks above already print.** **AND ONE NON-CONSEQUENCE IS STATED SO IT IS NOT INFERRED: the ruling adds NO twelfth decision-request item and RE-OPENS NO withdrawn option (`§7a.1` item `5`'s register-identity reversal is unmoved).** **THE UNION FIGURE THIS BLOCK CITES IS RECONCILED SITE BY SITE AT `§2.1`'s block annotation's clause `(3)`, and the register's own figures are re-printed with their twenty-two terms at `§5.5.3`'s closing block item `(13)`.**

**AND ONE OWED RULING IS RECORDED HERE RATHER THAN LEFT IMPLICIT, WITH AN OWNER AND A POSITIVE REVISIT CONDITION — NEVER A BARE `OWED`: `O-8`'s ADDED SIGNATURE for `storeGraphReferences`** (`§2.1` item `2`'s annotation prints it in the contract's own signature form, with the alternative form named).** **OWNER: the architect, at the spec gate. POSITIVE REVISIT CONDITION: the first pass that writes the module must either take the printed function form or rule the alternative (`export const storeGraphReferences: StoreGraphDeclarationInput`, the held `storeReferences` precedent's data-declaration shape) — a ONE-LINE amendment at `§2.1` item `2`, NOT a re-grain and NOT a twelfth decision-request item, because the eleven-item set is counted at `CURRENT STATE` item `7`, `§5.3` item `12` and the file-end note, and this pass moves none of those three counts.**

---

## 8. Falsification / stop conditions

**Per claim, a row that can actually redden — and for every behavioural claim, the falsifier that would overturn it.
PROVENANCE is item 13.**

1. **THE TIER-IS-A-FILTER CLAIM.** **Falsifier: an answer whose `tier`/`flag` disagrees with the resolved node's OWN
   flag, or a walk that keeps searching for a node whose flag matches the name.** Row `R-6`, `F-4`, register row
   `P-GR-IM-11`.
2. **THE TREE-BY-CONSTRUCTION CLAIM.** **Falsifier: any node with two parent links, or any operation that produces
   one.** Row `I-2`, `F-23`, register row `P-GR-IM-1`. **And the vacuity condition: a positive control that cannot
   express its failing case is itself a finding.**
3. **THE SEGMENTS-ARE-DATA CLAIM.** **Falsifier: a store whose name→target dictionary is a plain object — the same
   drive on `'__proto__'` must then FAIL.** Row `M-8`, `F-25`, register row `P-GR-TP-2`.
4. **THE PER-`(PATH, TIER)` UNIQUENESS CLAIM.** **Falsifier: two nodes for one pair, or a refusal that also refuses the
   SECOND TIER's legitimate holder.** Row `M-4`, `M-6`, `F-12`, register row `P-GR-IM-3`.
5. **THE MERGED READ'S SURVIVAL.** **Falsifier: `parts` absent on a merged arm, an entry equal to the read path, a
   non-null `cache` on the merged arm, or a merge run where a node holds the read path.** Row `M-5`, `F-8`, register row
   `P-GR-TP-7`.

   **⟶ RE-DERIVED 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the falsifier above stands byte-for-byte as the WITHDRAWN CLAIM's falsifier).** **THE CLAIM IT FALSIFIED IS WITHDRAWN, SO THE FALSIFIER IS REPLACED RATHER THAN DELETED, AT THE SAME ROW IDS: THE NODE-LOCAL TIER READING.** **FALSIFIER: a read whose answer carries a tier that is NOT the resolved node's OWN `flag` — read off the node through the test-only reader `nodeFor` — or a QUALIFIED read whose diagnostic does not name the node's own flag and the flag the token asked for, or a MISS that asserts a tier (`tier` non-null) or a composite where the resolved leaf holds no value.** **A store that RESTATES the caller's token as the node's tier FAILS on the same node driven under a DISAGREEING token, and a read that composes a value at a path a node holds FAILS.** **Row `M-5` (its re-derived annotation at `§3.1`), `F-8` (its re-derived annotation at `§3.2`), register row `P-GR-TP-7` (its re-derived clause at `§5.5.1`).** **The row ids, their layers and their places in `§4.2`'s authoring order are UNMOVED.**
6. **THE CACHE INVALIDATION.** **Falsifier: `mem.P` and `temp.P` resident with live cache entries, then
   `commit('file.P', v)` — a read of `P` must MISS; a rebuilt entry answering the cleared value FAILS.** Row `F-6`,
   register rows `P-GR-IM-5`/`P-GR-IM-13`.
7. **THE READ'S PURITY.** **Falsifier: a `resolve` that writes a cache entry — read `cacheEntryFor(name)` before and
   after a stale-entry resolution; it must be UNCHANGED.** Row `R-5`, register row `P-GR-IM-13`.
8. **THE REGENERATION TRANSACTION.** **Falsifier: `set('temp.P', v)`; `commit('file.P', v)`; `remove` one descendant
   during the window — one crossing, one row per affected reference, and either a completed regeneration or a DECLARED
   failure that left the original alive; a partial state, or a deletion on a mismatch, FAILS.** Row `M-11`, `F-9`,
   `F-10`, register row `P-GR-SM-1`.

   **⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, THE ARCHITECT'S FIRST AMENDMENT `A1`; `RCA-8(d)` ANNOTATE-BESIDE — item `8` above stands byte-for-byte). THE FALSIFIER'S ORDER IS EXTENDED TO FIVE STEPS WITHOUT CHANGING ITS OUTCOME SET: the drive is `set('temp.P', v)`; `commit('file.P', v)`; `remove` one descendant during the window — and the regenerated set must now be SERIALIZED to stable JSON and the SERIALIZED FORM VALIDATED before the original is deleted, so the admissible outcomes are ONE COMPLETED REGENERATION or ONE OF THE THREE DECLARED FAILURES (`'rebuild-failed'` · `'serialize-failed'` · `'validate-failed'`), each leaving the ORIGINAL ALIVE with `crossings: 0` and `events: 0`.** **A partial state, a deletion on a mismatch, a clear or a subscription release on ANY failure, or a deletion reached without an accepted step `(5)` FAILS — and the same falsifier covers the SECOND amendment's bound: a regeneration whose new root tier exceeds the original root's parent node's flag must be REFUSED `'durability-inversion'` with the original alive, while a DOWNWARD re-tier of a whole subtree must COMPLETE.** **The row list (`M-11`, `F-9`, `F-10`, `P-GR-SM-1`) is UNMOVED, and `P-GR-SM-1`'s amended reading (five steps, three terminals, term `15` unmoved) is printed at `§5.5.1`'s closing amendment block.**
9. **THE SEVERANCE'S EVENT AND RELEASE.** **Falsifier: subscribe on a `temp` reference; sever the parent chain — exactly
   ONE declared event, the count to `0`, and the severing receipt naming the released reference; an unanswered delivery
   or a silent disappearance FAILS.** Row `F-11`, register row `P-GR-TP-5`.
10. **THE CAP NON-DESTRUCTIVE POSTURE.** **Falsifier: an overflow that evicts, drops, clears a lower tier, or emits — or
    a below-cap control that does not commit.** Row `F-13`, register row `P-GR-TP-3`.
11. **THE LOAD-CYCLE CLAIM — the amendment's largest structural dependency.** **Falsifier: resolve
    `file.window.tabs.landingPage` → run `loadEnvelope` (or `loadDoc`) → resolve again; the second resolution must need
    NO rebuild and must answer IDENTICALLY, with no declared write in between — if it needs one, the store's graph is
    riding the engine's and the ARCHITECTURE, not the performance, is wrong.** Row `P-GR-IM-12` `[H]`-driven. **The
    engine fact behind it is the retention record's `RH-1`** (with `RH-5`), **carried as that record's reading and not
    re-measured here.**
12. **THE HELD CONTRACT'S DEFECTS ARE NOT REPEATED.** **Falsifier: this register declares a row count its own table
    refutes, a total its own terms do not sum to, or a term outside its own row set — the register's declared row count,
    its table's row ids and its printed term list must be the SAME quantity, counted three ways (`21` = `21` = `21`, and
    `13 + 1 + 7 = 21`).** Row `§5.5.2` item 5, `§4.4` `S-3`. (**⟶ ANNOTATED 2026-10-01: the identity is corrected BESIDE in figure and unmoved in method — `22` = `22` = `22`, and `14 + 1 + 7 = 22`, because `P-GR-IM-14` joins the table (`§5.5.1`); the register's twenty-two terms are printed with their total at `§5.5.3`'s closing block, item `(8)`. The defect class this item names — a declared row count its own table refutes, a total its own terms do not sum to, or a term outside its own row set — is exactly what the added row must NOT introduce, and the added row's term `16` is inside the row set and inside the total.**)
13. **PROVENANCE, so no figure here is untraceable.** **Read for this pass:** the gate-1 record
    `docs/specs/store-node-graph-review.md` **in full**; the proposal `docs/specs/store-node-graph-proposal.md` at
    `§0.1`/`§0.2`/`§0.3`/`§0.4`, `§1`, `§2.1`, `§2.2`, `§2.3`, `§2.4`/`§2.4a`, `§5.1`, `§5.2`, `§10`, `§11`, `§12`,
    `§13` **and its closing round-2 block**; all four filed step reports
    (`archive/gate1/2026-10-01-STORE-NODE-GRAPH-gate1-step1-validity.md` · `…-step2-critique.md` ·
    `…-step3-architecture.md` · `…-step4-change-analysis.md`); `docs/specs/store-core.md` at its `CURRENT STATE`, `§0`/`§0A`,
    the Layer declaration, `§1`, `§2.1`…`§2.12`, `§3.1`…`§3.5`, `§4.1`…`§4.5`, `§5.1`, `§5.2`, `§5.3`, `§5.5.1`, `§5.5.2`,
    `§5.5.3`, `§6`, `§7`, `§7a`/`§7a.1`, `§8`, `§3a`/`§3b`; `docs/specs/store-core-adoption-dossier.md` **in full**;
    the amended-architecture finding record `archive/findings/2026-10-01-store-core-register-arithmetic.md` **in full**;
    `docs/specs/user-flow-audit.md` `§1`/`§2`/`§3` (the `§7.1` predicate and its zero-row exemption);
    `docs/decisions.md`'s data-ownership rows and the four ACTIVE rows this file cites, **by name**;
    `docs/specs/data-ownership-model-plan.md` at `§1.1`…`§1.9`, `§2.5`, `§5.2.7`, `§5.6.5`, `§6.5`; `AGENTS.md` items 3–11;
    and the format precedents `docs/specs/store-core.md` (cited above), `docs/specs/gutter.md` and
    `docs/specs/relocate.md` at their `§5.2`/`§5.3`/`§5.5` shapes. **Globbed and verified free 2026-10-01:**
    `docs/specs/store-core-graph*.md` → **no file** (so this path was free); `src/**/store*` → **no file**;
    `tests/store*` → **no file**; `docs/skills/*` → **`process-guardrails.md` ALONE** (so
    `docs/skills/designing-pages.md`, its test-use-case coverage matrix and its demo-page index **DO NOT EXIST — there is
    nothing to update, and this unit renders no page**). **NOT read, therefore not verified and not claimed:** any
    `src/**` byte beyond the module-path globs above; `tests/**`; `node_modules/provident-ssr/**` (so the vendored type
    surface is carried as the proposal's own `[T]` reading, with that ownership stated); `../Preempt-Providence/**` and
    the fork's tree; `docs/HANDOFF.md`; `docs/defects.md`; `docs/guide/**`; and `archive/**` beyond the four step reports
    and the one finding record named above. **NOTHING WAS RUN AND NOTHING WAS COMMITTED by this pass: no suite, no leg,
    no `tsc`, no `typecheck:tests`, no build, no Electron boot, no MCP session, no `git` command.** **Every figure in
    this file is either this pass's own file read at a named section/row, or a figure quoted from a named artifact with
    that artifact's ownership stated.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**⟶ THE SEED HUNT RAN 2026-10-03 — THE HEADING'S AS-FILED `OWED` IS SPENT ON ITS STATUS VALUE ONLY (`RCA-8(d)` ANNOTATE-BESIDE — the heading and the seed table above stand byte-for-byte):** the read-only adversarial drove the whole landed store, returned the SEVEN host findings `G4-F1`…`G4-F7`, and the findings are DISPOSITIONED at `§3b`'s filled table below and at `docs/specs/store-core-graph-compliance-review.md` `§9D` (ALL `HOST-FIX + re-grain`, EXECUTED via the `UNIT-ADV-1` re-freeze — new digest `sha256:a374e25e…`); the SATISFIED seeds and the RESOLVED-BY-PINNING items are enumerated at `§9D`, `ADV-GR-10` stays WITHDRAWN under `A3`, and NO seed and NO finding is left as a bare `OWED`.

**(`AGENTS.md` RCA-3: the read-only adversarial pass is MANDATORY per completed unit. The read-only PBT audit of
`§5.5.1`'s executed tables is part of the same gate.)**

| id | The seed |
| --- | --- |
| **ADV-GR-1** | **A name whose segments are hostile strings**: `'__proto__'`, `'constructor'`, `'toString'`, `'hasOwnProperty'`, a 4 kB segment, a segment with `.` inside a pattern's literal. **The store must treat every one as DATA.** |
| **ADV-GR-2** | **A declared-row input that is itself hostile**: a frozen array, a `Proxy` whose `get` traps throw, rows with missing keys, rows whose declared tier disagrees with their own name, and a pattern whose `segments` array is mutated after load. |
| **ADV-GR-3** | **A link whose target is severed BETWEEN the cache check and the resolve**, and a second `sever` on an already-severed link (**idempotence**). |
| **ADV-GR-4** | **A regeneration whose census matches but whose SUBTREE contains a node the caller removed during the window** — the concurrent-`remove` arm, driven for both declared terminals. |
| **ADV-GR-5** | **A listener that calls `sever` (or `commit`) during its own delivery**, and a listener that unsubscribes itself or another mid-fan-out. |
| **ADV-GR-6** | **A `sever` that releases a subscription and a listener that re-subscribes to the same reference from inside the severance's own event.** |
| **ADV-GR-7** | **The `cache` member smuggled out of the realm** — a row that JSON-stringifies a resolution result, **and** the export driven past the local-only rule. |
| **ADV-GR-8** | **Two `commit` calls at the SAME `(path, tier)` in one synchronous turn**, once with each declared outcome, and a `commit` racing a `remove` of the same pair. |
| **ADV-GR-9** | **The seam enabled in a production-shaped construction**, the key set read, and `seed(rows)` driven with an undeclared row. |
| **ADV-GR-10** | **A merged read whose overlay composes two STRUCTURALLY INCOMPATIBLE values** — the declared answer is a `parts`-visible conflict with NO reconciliation. **⟶ WITHDRAWN 2026-10-01 (THE ARCHITECT'S MERGED-ARM RULING, `A3` OF `§0`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed seed stands byte-for-byte). THIS SEED'S SUBJECT IS WITHDRAWN WITH THE MERGED ARM: there is no overlay and no `parts`-visible conflict to declare, because a caller reads each node's tier from the node itself and no composite is assembled (`§2.5` item `4`).** **THE SEED IS NOT REPLACED BY A NEW ID AND NO OTHER SEED MOVES — the `§3a` set is a SEED SET for the adversarial pass, and an adversarial pass that drives this seed now drives a WITHDRAWN surface and FAILS as such. THE SEED'S NEAREST SURVIVING SUBJECT IS RECORDED HERE RATHER THAN LEFT TO BE RE-INVENTED: two READINGS of one address that disagree about the node's tier — which is the QUALIFIED case's own falsifier (`§2.5` item `4`(ii); `R-6`).** |
| **ADV-GR-11** | **A cold item written by a `set` (refused) versus by a `commit` (which mints)** — the flag-minting boundary. |
| **ADV-GR-12** | **`reset()` called from inside a listener during a fan-out**, with cache entries live. |
| **ADV-GR-13** | **The load-cycle row driven at a moment when a cache entry is stale** — `P-GR-IM-12`'s sharpest form: the second resolution after a load must still need **no rebuild**. |
| **ADV-GR-14** | **A cap boundary crossed DURING a repair** (a repair's own write being the row that would exceed `RCAP-1`), and a repair that itself would violate a SECOND constraint (the cascading case — which does not load). |

**⟶ ANNOTATED 2026-10-01 (THE ARCHITECT'S RULING ON THE INTERACTION PRECONDITION; `RCA-8(d)` ANNOTATE-BESIDE — the seed row above stands byte-for-byte). THE SEED'S SECOND SUBJECT'S PARENTHETICAL, *"(the cascading case — which does not load)"*, IS CORRECTED BESIDE: THE CASCADING CASE IS NOT A LOAD REFUSAL ANY MORE.** **This seed is the ONE site in this file that printed the withdrawn `§2.7` item 6 precondition's consequence, so it is reconciled here rather than left to a reader.** **THE SEED'S TWO SUBJECTS ARE OTHERWISE UNMOVED AND BOTH REMAIN DRIVEABLE: (a) the cap boundary crossed DURING a repair (a repair's own write being the row that would exceed `RCAP-1`, `§2.4` item 6) — untouched by the ruling; and (b) the cascading form, now driven as an EVALUATION-TIME outcome rather than as a construction refusal: a repair's own write IS a write, so the table is evaluated on ITS post-state (`§2.7` item 2) and a violation the repair leaves is answered by THAT row — a rejection carrying its own declared `refusalReason`, or that row's own declared repair in the SAME committed write (`§2.7` item 3; the operative rule printed at `§2.7` item 6's annotation).** **A drive that expects the cascading pair to be REFUSED AT CONSTRUCTION therefore drives a WITHDRAWN expectation and FAILS, exactly as the re-aimed `§3.2` `F-19` cell states.** **NO OTHER `§3a` SEED MOVES, and the union's operative count is UNCHANGED at `SIXTEEN` (`§2.1`'s block annotation's clause `(3)`).**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**Every finding gets ONE row, and no finding may be filed as a bare `OWED`.** **The admissible dispositions are the
family's four, plus the two the PBT audit adds:** `FIXED CONTRACT-SIDE` · `FIXED TEST-SIDE` · `NOT-A-FINDING (with its
arithmetic)` · `ROUTED (with its owner and its own gate)` · `CARRIED-WITH-OWNER (with a positive revisit condition)` ·
`PBT-AUDIT: over-strength / under-assertion / evasion (each dispositioned)`.

| id | Finding | Disposition | Evidence / arithmetic | Owner |
| --- | --- | --- | --- | --- |
| **G4-F1** | the WRITE-side C-TOP gate: a `commit`/`set`/`seed` whose TOP name is undeclared is REFUSED `'undeclared-name'`; the write-side mint never mints an undeclared or dotted root; the seam's pinned seed sentence is a write-side gate | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed module's write gate + the integration `P1` drive) | `HIGH`; the pin at the re-frozen surface's `set`/`commit`/`seed` grammar row; the byte: the write refusal before any mint/transaction; re-grain: `P1` + the store-focus `S22-3` re-grain; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F2** | the READ-side TOP is the segment at INDEX 1 BY POSITION (`rootParts[1]`); an undeclared index-1 segment answers `'undeclared-name'` BEFORE any traversal; the silent re-spell is FORBIDDEN | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed parse + the integration `P2` drive) | `HIGH-MED`; the pin at the re-frozen surface's grammar row; the byte: `rootParts` reads `[1]` by position; re-grain: `P2`; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F3** | the receipt's `events` is a function of the AFFECTED REFERENCES, not of the listeners — one affected reference answers `events: 1` with zero subscribers | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed receipt counting + the integration `P3` drive) | `MED`; the pin at the re-frozen surface's receipt-shape rows; re-grain: `P3` + the store-focus `S22-3`/`REG-SM-1` event-count re-grains; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F4** | the sweep's `cleared[]`/`'sweep'`-event set matches its POST-STATE — per-swept-reference truthfulness; a still-readable descendant is neither named nor fired | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed sweep's per-swept listing/firing + the integration `P4` drive) | `MED`; the pin at the re-frozen surface's `sweep` member row; the byte: `cleared: swept.map(...)`, one `'sweep'` event per swept entry; re-grain: `P4`; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F5** | the export is a FRESH deep copy at EVERY depth — no depth bound, no aliasing of a live stored object; mutating the export never mutates the store | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed `Object.create(null)` copy at every depth + the integration `P5` drive) | `MED-LOW`; the pin at the re-frozen surface's `export` member row; re-grain: `P5` (cyclic store value; two exports distinct; mutation at any depth changes nothing); the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F6** | the constraint evaluation's DATA record and ANY machinery dictionary keyed by caller-owned names (`stableGraphTranslation`, `deepCopyOf`'s outputs, the leaf record) is PROTOTYPE-SAFE | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin — a dated row ADDED in the frozen span, as the surface did not state it + the conformed `Object.create(null)`/`Map` records + the integration `P6` drive) | `LOW`; re-grain: `P6` + the legacy `M-8`/`P-GR-TP-2` hostile-name class; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |
| **G4-F7** | "equal value" is the PINNED `===`, NOT `Object.is` — a second `NaN` write fires exactly as `===` says; `-0`/`0` is equal and fires nothing | **`HOST-FIX + re-grain` — EXECUTED** (`UNIT-ADV-1` pin + the conformed `===`-gate + the integration `P7` drive) | `LOW`; the pin at field 4.3's `'set'` arm row; the byte: the fire/no-fire decision on the stored value under `===`; re-grain: `P7`; the audit-report finding id | **the supervision duty + the unit's `§3a` seed hunt — EXECUTED 2026-10-03** |

**⟶ THE TABLE IS FILLED 2026-10-03 (THE GATE-4 DISPOSITION LANDING — folded into ONE pass with gate 7's proofread and gate 8's documentation review, recorded honestly as one; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed placeholder *"(to be filled by gate 4)"* and this section's six-disposition vocabulary sentence above stand byte-for-byte, and this clause is the operative reading).** **SEVEN ROWS, SEVEN SEVERITIES — `HIGH` · `HIGH-MED` · `MED` · `MED` · `MED-LOW` · `LOW` · `LOW` — every disposition `HOST-FIX + re-grain`, EXECUTED via the `UNIT-ADV-1` re-freeze; NO BARE `OWED`.** **THE EXECUTION CHAIN, WITH ITS RECORD AT THE COMPLIANCE REVIEW'S `§9D`:** amendment (the seven pins inside the re-frozen span + the references artifact's linkage row) → new digest `sha256:a374e25e…` (was `2933fcb8…`) → seat re-cycle **94/94** (`87 + 7`; gate 4 EMPTY) → integration re-cycle **40/40** (`33 + 7`; `P1`–`P7`) → the re-grain family (integration · store-modules-bytes `M-LS-8`/`M-LS-9`/`E-2` · store-focus `S22-3`/`REG-SM-1` · the legacy suite) → the register harness (legacy **71/71**, `REGISTER-EXEC` 22/22 held, the T9 residue CLOSED) → full `npm test` **ZERO red** (trio + `typecheck:tests` clean).** **THE SEEDS: the SATISFIED seeds and the RESOLVED-BY-PINNING items are enumerated at `§9D` (their mapping by seed text to pin subject, executed inside the re-grain suites); `ADV-GR-10` stays WITHDRAWN under `A3`; NO seed is left bare.** **THE LEGACY-COUNT TRAJECTORY `11 → 12 → 11 → 0` is complete at `§9D`.** **THE FIVE LANDING SITES OF THIS FILL: the dispositions' `Owner` cells name the supervision duty; the `Evidence / arithmetic` cells carry the severities and the drives; the wave chronicle sits at the compliance review `§9D`; the tracker record and the gate-10 carry list sit at the `G1` cell; the review record is `archive/reviews/2026-10-03-U-STORE-CORE-doc-review.md`.**

**⟶ ANNOTATED 2026-10-01 (THE DOCS-REPAIR PASS, SECOND PASS; `RCA-8(d)` ANNOTATE-BESIDE — THE FILE-END NOTE'S FIGURES AND PHRASES ARE READ HERE, AND THIS BLOCK SITS IMMEDIATELY ABOVE THAT NOTE SO THAT NOTHING FOLLOWS IT, preserving `CURRENT STATE`'s placement rule). THREE OF THE FILE-END NOTE'S CELLS ARE CORRECTED BESIDE, AND EVERY ONE OF ITS AS-FILED WORDS STANDS.**

**(1) *"Two value exports and twenty-seven type declarations"* IS CORRECTED BESIDE TO `2` VALUE EXPORTS AND `29` TYPE DECLARATIONS (`31` EXPORTED NAMES), the two counted declarations being `GraphTierGetResult` and `GraphAffectedRow` — `O-1`, with the twenty-nine NAMED and the nine terms printed at `§2.1` item `3`'s annotation, and with every site that prints the census reconciled beside in this same pass.** **The declarations themselves are untouched; the census was the defect.**

**(2) *"a top-level register projected from the graph, with a declared-row input"* IS READ UNDER THE ARCHITECT'S REGISTER CLARIFICATION — `O-2`: the operative rule is TOP-LEVEL NAMES ONLY AND A PURELY DERIVED REGISTER; the caller's declaration survives as the surface that MAKES a name a ROOT NAME (`§2.4` item `8`'s annotation) and never as a row, so this phrase is superseded beside in the same words `§2.4` item `3`'s annotation uses.**

**(2a) THE NOTE'S CENSUS PHRASE *"Two value exports and twenty-seven type declarations"* IS CORRECTED BESIDE A SECOND TIME, AND THE TWO CORRECTIONS ARE DIFFERENT CLAIMS (2026-10-01, THE ARCHITECT'S MERGED-ARM RULING `A3` OF `§0`).** **Item `(1)` above corrected the figure to `29` TYPE DECLARATIONS (`2 + 29 = 31` exported names) by counting `GraphTierGetResult` and `GraphAffectedRow`. THE OPERATIVE CENSUS IS NOW `2` VALUE EXPORTS + `27` TYPE DECLARATIONS = `29` EXPORTED NAMES, because `GraphPart` and `GraphMergedRead` are WITHDRAWN WITH THE MERGED ARM — so the note's as-filed `27` is right in FIGURE and wrong in MEMBERSHIP, exactly as `§2.1` item `3`'s second annotation prints (`3 + 6 + 4 + 1 + 0 + 4 + 2 + 2 + 5 = 27` ✓, the twenty-seven BY NAME).** **A row that reads this note's `27` as the figure item `(1)` refuted, OR that reads item `(1)`'s `29` as still operative, FAILS: the note's own bytes stand as filed, item `(1)` stands as the pre-withdrawal correction, and the operative reading is this item.**

**(3) *"a `21`-row typed register whose `233` declared attempts are the sum of their own twenty-one printed terms"* IS CORRECTED BESIDE TO A `22`-ROW TYPED REGISTER (`14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓) WHOSE OPERATIVE DECLARED TOTAL IS `249`, PRINTED WITH ALL TWENTY-TWO TERMS AND THEIR CHAIN AT `§5.5.3`'s CLOSING BLOCK, ITEMS `(7)`–`(10)`** — the added row being `P-GR-IM-14` (MONOTONIC PERSISTENCE, `S-GR-PERSIST-1`, term `16`), and the as-filed `21` / `233` pair standing as the pre-amendment record whose own terms still sum correctly (`233` + `16` = `249`).** **The caps compare `249 ≤ 400` ✔ in total with per-row maximum `40` (`P-GR-IM-13`) ≤ `100` ✔.**

**(4) ONE FIGURE THIS NOTE DOES NOT CARRY IS STATED SO THE SET IS CLOSED: the refusal union's operative membership is `SIXTEEN` (`8` held + `5` this contract's amendment + `3` added by this pass's two amendments) — reconciled with its as-filed DECLARED `EIGHTEEN` and its printed `THIRTEEN` at `§2.1`'s block annotation (`O-9`) — while the event surface is still the EIGHT-ARM table (`§2.10` item `2`), unmoved by either amendment.**

**(5) AND THE NOTE'S OWN SUBSTANCE IS OTHERWISE UNMOVED, with one addition it predates: the graph as the source of truth; immutable anchors and one parent link per node — PLUS THE SECOND NAMED TREE INVARIANT, MONOTONIC PERSISTENCE (`§2.1`), which this note does not mention only because it was filed before the amendment; the tier token as a FILTER on the node's own flag; the walk whose every failure names its step; the per-`(logical path, tier)` uniqueness constraint with its two declared outcomes; two caches with a two-part invalidator set and a rebuild at the invalidation site; the subtree-regeneration transaction — now FIVE steps with THREE declared failure arms (serialize and validate before acceptance: `§2.8` items `5`/`6`); the downward `remove`; the eight-arm event surface with the `severed` arm and its subscriber-release rule; the stable-JSON translation; the non-authoritative local-only export; the eleven-item decision-request set with its one amended recommendation; and the `§6` STEP-0 dossier block that determines the adoption trigger does NOT fire and writes its zero-row rationale rather than leaving it silent.**

**(6) THE INTERACTION-PRECONDITION RULING (2026-10-01): THE REFUSAL-UNION FIGURE ITEM `(4)` PRINTS IS UNCHANGED AT `SIXTEEN` (`8` HELD + `5` THIS CONTRACT'S AMENDMENT + `3` THE TWO ARCHITECT AMENDMENTS, `8 + 5 + 3 = 16` ✓), AND THE NOTE'S REGISTER FIGURES ARE UNMOVED TOO — a `22`-row typed register (`14` `P-GR-IM` + `1` `P-GR-SM` + `7` `P-GR-TP`, `14 + 1 + 7 = 22` ✓) whose operative declared total is `249`, printed with all twenty-two terms and their chain at `§5.5.3`'s closing block items `(8)` and `(13)`, with per-row maximum `40` (`P-GR-IM-13`), `249 ≤ 400` ✔ and `40 ≤ 100` ✔.** **WHY THE UNION FIGURE DOES NOT MOVE: the withdrawn `§2.7` item 6 precondition minted `'malformed-pattern'`, a HELD member of the union whose surviving construction-time site is `§2.4` item 5(f) (carried at `§2.4` item 7(g)) — so the withdrawal removes an ARM and NO MEMBER** (`§2.1`'s block annotation's clause `(3)` prints the reconciliation; `§2.7` item 6's annotation prints the operative rule).** **AND ONE PHRASE OF THE NOTE'S OWN SUBSTANCE IS READ UNDER THAT RULING WITHOUT BEING REWRITTEN: the note's *"a per-`(logical path, tier)` uniqueness constraint with two declared outcomes"* stands, and the note's silence on the OTHER constraint rows is now explicit — the table declares `N` INDEPENDENT rows (`§2.7` item 6), and this contract's own fixture declares `N = 2` (`§5.5.1`'s fixture annotation).**

**END OF THE CONTRACT.** **Two value exports and twenty-seven type declarations; a node-anchor-link graph that is the source
of truth; immutable anchors and one parent link per node; a tier token that is a FILTER on the node's own flag; a
seven-arm walk whose every failure names its step; a top-level register projected from the graph, with a declared-row
input, its own caps and a closed refusal set; a per-`(logical path, tier)` uniqueness constraint with two declared
outcomes; two caches with a two-part invalidator set and a rebuild at the invalidation site; a subtree-regeneration
transaction with a census term and a declared failure; a downward `remove`; an eight-arm event surface with the `severed`
arm and its subscriber-release rule; a stable-JSON translation; a non-authoritative local-only export; a `21`-row typed
register whose `233` declared attempts are the sum of their own twenty-one printed terms; an eleven-item decision-request
set, each with a working default and a recommendation; and a §6 STEP-0 dossier block that determines the adoption trigger
does NOT fire and writes the zero-row rationale rather than leaving it silent.**
