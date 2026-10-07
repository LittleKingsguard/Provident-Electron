# Spec — `U-CONTAINER`: the pure selector/normalizer mechanism with the returned-as-text `contain` declaration

**Unit `U-CONTAINER` · wave `E` · ledger row `E5` · upstream `SCH-10` (`ZONE-CONTAINER-CHROME`) as
ADOPTED-RESHAPED by architect ruling `A-d4` · derives `docs/specs/container-review.md`'s conditions
`C-1`…`C-10`, its 26 findings, its `§9.4` architecture rulings and its `§9.5` conditions `G-1`…`G-3` ·
filed 2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/container-review.md` is the gate-1 record**
(four filed steps: **1** `VALID-WITH-CONDITIONS` (`C-1`…`C-10`) · **2** `FLAWED`, 26 findings in six axes
· **3** `DELEGABLE-WITH-CONDITIONS` (the module boundary, the nine-identifier semantics table, the
`AxisResolver`↔`AxisOf` reconciliation, the layer map, the prohibition audit, the register sketch, the
filing checklist, the blockers `B-1`/`B-2`/`B-3`) · **4** `DELEGABLE-WITH-CONDITIONS` (`G-1`…`G-3`, the
scope analysis, the gate-11 assessment, the process findings `F-1`…`F-5`), **plus the architect's ruling
pass appended inside it**), **AND THE ARCHITECT'S TWO RULINGS ARE RECORDED AS ACTIVE `docs/decisions.md`
ROWS**: **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** and
**`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`**, with **`B-3` recorded in that ledger
as `FILEABLE — WORKING DEFAULT`, NOT as a ruling**. **This spec DERIVES those conditions, findings and
rulings. It does NOT re-litigate, weaken or re-open any of them**, and **a clause of this file that
contradicts a condition, a finding or a ruling is a finding against this file, not a re-opening of the
condition** (the record's own governing-rule block, its `§7`; the rule `docs/specs/gutter.md` states for
its own record and which `docs/specs/gutter-ui.md` and `docs/specs/relocate-review.md` restate).

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing lands **one NEW file**
(`docs/specs/container.md`) and **nothing else**. **The module does not exist. No test file exists. No red
set has been authored or run. No leg, no trio, no `tsc` invocation and no register row has been executed.
No gate record after gate 1 exists.** The unit stays an open `## OPEN` row (`E5`) with its ledger status
the supervisor's, and **it is NOT delegable until a TestWriter has RUN and REPORTED the red set**
(`AGENTS.md` item 9, `§4.5`).

**⟶ STATUS UPDATE 2026-09-27 (the DEFECT-REPAIR AMENDMENT, `§0A` note 7; the paragraph above is the
FILING's own record and stays visible).** **⟶ AND A SECOND UPDATE 2026-09-27 (`§0A` note 8, AFTER THE FIRST IMPLEMENTER PASS LANDED `src/shared/container.ts` AT `91311ac`): THE DECLARED REGISTER TOTAL IS NOW `151` (two terms re-derived, `P-CT-IM-1` `40 → 48` and `P-CT-IM-3` `17 → 23`), the pinned-literal subtraction is pinned as a RECIPE on a QUOTE-PRESERVING JOINED view, the literal census is FOUR NAMED BODIES (`'contain: layout style paint'` · `''` · `'function'` · `'string'`), and four row-bound readings are pinned. The `137` figures inside this paragraph are the note-7.2 amendment's and stay visible as provenance.** **THE RED SET HAS SINCE BEEN AUTHORED, RUN AND REPORTED** —
`tests/container.test.ts`, **`68` rows · `49` FAILED / `19` PASSED** against a module that does not exist,
with the register **stopping at `P-CT-IM-1` after `5` consecutive failures** and its **`9` un-run register
rows reported as FAILURES**. **THIS FILE HAS BEEN AMENDED IN PLACE**: the **DECLARED REGISTER TOTAL is now
`137`** (*as filed `154`*; the as-filed total, its chain and its `127` subtotal stay VISIBLE at `§5.5.3`
beside their dated corrections), **four ROW-BOUND DEFECTS are pinned** (`R-7`'s underivable positive
control · `R-6`'s declared exemption set and its extended `screenX`/`screenY`/`offsetX`/`offsetY` members ·
`R-1`'s `style` exemption with the blessed pinned-literal subtraction · `R-1`(g)-vs-`R-6`'s token
collision), **two dated method notes landed** (`§3.4`'s normalization: **JOIN FIRST, THEN STRIP**, and the
literal-body census reads a **QUOTE-PRESERVING JOINED** view) and **the five TestWriter guesses are
dispositioned** (`§0A` note 7.6). **NO per-row term, row id, strategy id, seed, cap or `(bounded)` marking
moved** (`5` of `10` unmoved; `137 ≤ 400` and the largest row `40 ≤ 100` re-checked). **THE RED SET'S
REGISTER HARNESS OWES A RE-GRAIN, as a SEPARATE pass** (`§0A` note 7.3). **The module still does NOT
exist and NOTHING is green. This amendment edited ONE file — this one.**

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and
this filing's own dated ruling notes · the layer declaration — the four labels and the honesty anchors ·
`§1` — the scope and its named boundaries · `§2` — the exact surface, the caller-supplied set, the value
rules, the two contract edges, and the `axisResolver`↔`AxisOf` reconciliation **in the three unit-specific
filing items `§9.4.7` names** · `§3` — every state, fail-state, invariant and static/existence row ·
`§4` — the red, the authoring order and the binding stop conditions · `§5` — the wiring, the four legs,
the DONE row's shape and **the typed register** · `§6`–`§8` — falsification, honest limits, the open items
and the citation index · `§3a`/`§3b` — the adversarial seed set and the disposition table at the file end.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s rows are cited **by
NAME** — that ledger is appended-to and its line anchors drift; `docs/next-steps.md` **by ROW ID**; the
sibling specs' file-end notes carry the rule). **This spec carries no length census of any file.**

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b`
file-end note — the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY — *AS FILED*.** **⟶ ANNOTATED 2026-09-27 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW, `AGENTS.md` item 10d / RCA-6 — a DATED STATUS ANNOTATION ONLY; every clause below is the FILING's own record and is KEPT VISIBLE as the filing-time state, per this file's annotate-never-rewrite convention).** **THE UNIT IS NO LONGER AT FILING: `src/shared/container.ts` EXISTS (`85` lines, landed `91311ac`), `tests/container.test.ts` EXISTS (`68` rows, ALL GREEN, with its register RE-GRAINED to `DECLARED_TOTAL = 151` and `151/151` attempts executed, `broken 0`, `registerStoppedAt: null`), and gates 3/4/5/6 have landed — so every *"DOES NOT EXIST YET"*, *"NOTHING IS GREEN"* and *"`OWED` at every gate"* clause below describes THE FILING MOMENT, not the current tree.** **WHAT IS OWED AT THIS PASS: gate 9's trio (the supervisor's measurement), gate 10 (the DONE row + the ledger move, `§5.3`), the `docs/FORKER.md` container seam block (`§8`'s citation row, `docs/pending.md` `§L-4e`) and the lone-surrogate coverage gap (this block's item 11).** *(As filed:)* **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one file — the NEW `docs/specs/container.md`** — and edited **no existing file**, ran **no
   suite, no leg, no trio, no `tsc`, no Electron boot and no grep of its own beyond the read-tool searches
   it names where it uses them**, and made **no commit and no writing git command of any kind**. **The
   module (`src/shared/container.ts`), the test file (`tests/container.test.ts`), the red set, the legs,
   the register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT EXIST YET.**
   The unit is **`OWED` at every gate after this one**, and **it is NOT delegable until a TestWriter has
   RUN and REPORTED the red set** (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES — ⟶ ANNOTATED 2026-09-27 (gate 8): THE SURFACE NOW EXISTS AND AGREES WITH THIS ITEM, read from the landed module — SIX exported names, an EMPTY import census, no factory/options/session/state and no write; the as-filed heading *"(nothing of it exists yet)"* is the filing-time reading and is KEPT VISIBLE.** *(As filed:)* a **NEW `src/shared/container.ts`**
   exporting **THREE value exports and THREE type declarations = SIX exported names** (`§2.1`), with **NO
   IMPORT STATEMENT OF ANY KIND — not even type-only**, **no factory, no options object, no session, no
   module-level mutable state and no write of any kind** (`§2.5`).
3. **THE REGISTER (`§5.5.1`): `10` typed ROWS carrying `10` TERMS in THREE families** —
   `P-CT-IM-1`…`P-CT-IM-6` · `P-CT-SM-1`…`P-CT-SM-3` · `P-CT-TP-1` — **⟶ ANNOTATED 2026-09-27 (gate 8): THE DECLARED ATTEMPTS THIS ITEM CARRIES ARE `151`, NOT THE `154` BELOW — the as-filed `154` (and note-7.2's intermediate `137`) are the SUPERSEDED forms and are KEPT VISIBLE here; the live arithmetic is `§5.5.3`'s** (`151` = `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14`). **A DONE row or any later pass that quotes this item's `154` as the declared total is a review finding** (`§0A` note 8.4; `§5.5.3`). *(As filed:)* **`154` declared attempts, printed
   with their TEN terms and a term-by-term addition at `§5.5.3`**, one pinned-seed generator (`S-CT-TP-1`,
   seed `20260927`, one LCG step per draw, `pool.length = 14`), `5` of the `10` rows carrying a
   `(bounded)` marking, and **the POOL-VERSUS-BOUNDARY check RUN and CLEAN for all `10` rows**
   (`§5.5.2` item 7). **The register does NOT overshoot the `≤8` component-breakdown signal**: it lands
   **`10` rows against a `≤8` SIGNAL**, and **the overshoot is justified ONCE, in the ruling's own form**
   (`§5.5`, `§5.5.2` item 1).
   **⟶ AMENDED 2026-09-27 (`§0A` note 7.2) — THE DECLARED TOTAL IS `137`, AND THE AS-FILED `154` ABOVE STAYS
   VISIBLE**: **`137` = `40` + `26` + `17` + `10` + `12` + `5` + `3` + `5` + `5` + `14`**, chain
   **`40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 → 123 → 137`**, subtotals **`IM 110` · `SM 13` · `TP 14`
   = `137`**. **NO per-row term, row id, strategy id, seed or cap moved; the `(bounded)` set is unmoved at
   `5` of `10`; caps re-checked (`137 ≤ 400`, largest row `40 ≤ 100`).**
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus
   `npm run typecheck` `[H]` (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]`
   (**the built output set is `SIX` files — the FIVE `esbuild` outputs plus the copied
   `dist/renderer/index.html`**; this unit's module is imported by no `src/**` file, so the output set
   must be UNCHANGED), `npm run typecheck:tests` `[H]` (the additive fourth leg, `AGENTS.md` item 4), and
   a **standalone strict `tsc --noEmit` over `tests/container.test.ts`** as the named leg that pins the
   `R-5`(b) type half (`§5.2`). **NO `[U]` ROW IS OFFERED** (the three-part refusal, `§5.2`) and
   **NO `[D]` ROW IS CLAIMED** (`§5.2`).
5. **THE GATE RECORDS AFTER THIS ONE.** **⟶ UPDATED 2026-09-27 (`§0B`): TWO OF THEM NOW EXIST. `GATE 4`
   — THE ADVERSARIAL PASS AND ITS READ-ONLY PBT AUDIT — RAN at `841c33e` over the module landed at
   `91311ac`: `HOST DEFECTS: NONE` · `PACKAGE DEFECTS: NONE` (an EMPTY IMPORT CENSUS, no DOM/realm/MCP
   surface, no shim member), EIGHT findings — `ADV-CT-1`…`ADV-CT-8` — ALL contract/harness-side, each
   dispositioned at `§3b`, with the arithmetic CONFIRMED INDEPENDENTLY (`48+26+23+10+12+5+3+5+5+14 = 151`,
   the chain, the subtotals `IM 124 · SM 13 · TP 14`, both caps, the seed, the `(bounded)` set — no finding)
   and NOTHING RUN (its honest limit). `GATE 5` — THE BLIND GREENS (`docs/specs/container-greens.md`) —
   RAN: `24` executed scenarios, `24` PASS / `0` FAIL, `4` `NOT-BLIND-RUNNABLE` (the static byte/token
   censuses, and every rendered/applied/computed fact), plus `CN-G-24` (the type half, `tsc` exit `0`), with
   its own five findings `F-1`…`F-5` dispositioned at `§0B` and NONE a converted FAIL.** **STILL OWED: the
   per-unit documentation review, the proofreader, the DONE row (`§5.3` fixes its twelve-item shape), the
   red set's register-harness RE-GRAIN (`§0A` notes 7.3/8.4/9.6) and the TestWriter's `ADV-CT-7` row.**
   **Gate 6 remains `STRUCTURAL`, not waived** (`§5.2`), and **the `[U]`/`[D]` status is FILED: `[U]` NOT
   OFFERED, `[D]` NOT CLAIMED** (`§0B` note 9.5).
6. **THE OPEN ITEMS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1` — **three** items): the
   **`B-3` worked default** (the caller's mapping carries no emptiness/reveal/minimization member unless
   `U-CENSUS`/`U-ZONES` supply the value), **the returned record's member NAMES** (the spec pins
   `className` and `declaration`; the gate may rename them, which would move the register's row ids and no
   term), and **the `docs/FORKER.md` carry**. **Each has a working default implemented in `§2` and a
   recommendation; a later pass that changes one must open a gate.**
7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO
   existing file):** `docs/next-steps.md`'s row **`E5`** still reads its spec cell as **`OWED — not filed`**
   and its status unchanged; the row's **`Legs` cell** and its **acceptance cell** were already annotated
   by the `F-4` reconciliation pass and are **NOT re-annotated here**; and **`docs/decisions.md`'s `B-3`
   row stays `FILEABLE — WORKING DEFAULT`** until the gate rules it. **All of them are listed as owed
   tracker items in this filing's report and are NOT edited here** (`§7` item 11, `§8`'s archival note).
8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone
   (globbed this pass: `docs/skills/*` → one file), so there is **no test-use-case coverage matrix and no
   demo-page index to update**, and **this unit renders no page** (`§3.4 R-9`'s probe; `§7` item 6).
9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** One file written, zero files edited, no test
   run, no leg run, no trio run, no `tsc` invocation, no Electron boot, no commit. The new file is
   **untracked and must be committed by the supervisor** (`RCA-8`'s per-gate commit rule).
10. **⟶ UPDATED 2026-09-27 BY THE DEFECT-REPAIR AMENDMENT (`§0A` note 7) — THE FILE'S ARITHMETIC IS NOW
    THE AMENDED ONE, AND ITEMS 1–9 ABOVE ARE THE FILING'S OWN RECORD.** The red set **was authored, RUN
    and REPORTED**: `tests/container.test.ts`, **`68` rows · `49` FAILED / `19` PASSED** against an absent
    module, with the register stopping at `P-CT-IM-1` after `5` consecutive failures and its **`9` un-run
    rows reported as FAILURES**. It exposed **a CONTRACT ARITHMETIC DEFECT (the declared total: as filed
    `154`, amended to `137` = `40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `40 → 66 → 83 → 93 →
    105 → 110 → 113 → 118 → 123 → 137`, subtotals `IM 110 · SM 13 · TP 14`; the as-filed `154`/chain/`127`
    kept VISIBLE) and FOUR ROW-BOUND DEFECTS (`R-7`'s underivable control · `R-6`'s self-contradictory
    bound and its omitted `screenX`/`screenY`/`offsetX`/`offsetY` members · `R-1`'s missing `style`
    exemption · `R-1`(g)-vs-`R-6`'s token collision), plus **two dated method notes** and **five
    dispositioned TestWriter guesses** — all at `§0A` note 7. **NO per-row term, row id, strategy id, seed
    or cap moved; the `(bounded)` set is unmoved at `5` of `10`; both caps hold (`137 ≤ 400`, largest row
    `40 ≤ 100`).** **THE RED SET'S REGISTER HARNESS OWES A RE-GRAIN** (`§0A` note 7.3) — a SEPARATE pass,
    **⟶ AND THE ARITHMETIC MOVED AGAIN 2026-09-27 (`§0A` note 8, AFTER the module landed at `91311ac`): the DECLARED REGISTER TOTAL IS NOW `151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14` = `151`; the two moved terms are `P-CT-IM-1` `40 → 48` and `P-CT-IM-3` `17 → 23`, both RE-DERIVED (part D's answer — those extra executions ARE genuine drives), while `137` and the as-filed `154` stay visible as provenance, and `151` is NOT the as-filed `154`.** **The module LANDED at `91311ac` (`58` passed / `10` failed of `68`) and NOTHING IS GREEN; the pinned-literal subtraction is now a RECIPE on a QUOTE-PRESERVING JOINED view with the literal ALSO exempted by name at `R-1`(c)/`R-3`/`R-10`; the literal census is FOUR NAMED BODIES (the pinned text · `''` · `'function'` · `'string'`); and four row-bound READINGS are pinned (`X-1` branches · distinct identity ACROSS records · the LEFT rotation · the green `null` stop state).**
    and **the module still does not exist, so NOTHING here is green.** **This amendment edited THIS FILE
    alone: no test file, no module, no tracker, no sibling spec, no gate-1 record.**
11. **⟶ ADDED 2026-09-27 (GATE 8, THE PER-UNIT DOCUMENTATION REVIEW) — THE LONE-SURROGATE CLASS NAME IS A NAMED COVERAGE GAP, NOT A SILENT ABSENCE.** **THE BOUNDARY, stated with its arithmetic: `P-CT-IM-3`'s declared term is `23` (`7` usable + the landed `16` unusable) and the DECLARED TOTAL is `151`; a LONE-SURROGATE class name — `'\uD800'`, a `string` of length `≥ 1` under `§2.5` item 3's declared domain — was DELIBERATELY NOT AUTHORED AS A DRIVE in this pass, because authoring it would move the term `23 → 24` and the total `151 → 152` and would owe the whole re-grain cycle (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` applied to a term).** **AND IT WAS NOT A SILENT OMISSION: the shape IS already named as an owed row at `§3b`'s negative-generator task list item (2), whose own status word is `OWED — TEST-SIDE`.** **WHAT WAS MISSING, AND IS ADDED HERE: the register's own register/honesty surface did not name it as a coverage gap of the EXECUTED layer — a reader of `§5.5.1`/`§5.5.2` could have read the `23`-shape domain as complete.** **OWNER: the pass that next touches `tests/container.test.ts` (the `§3b` task list's TestWriter).** **THE TERM CONSEQUENCE, pre-committed so the next pass does not re-derive it: adding the surrogate as a further UNUSABLE drive makes `P-CT-IM-3` `24`, the declared total `152`, the chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 138 → 152`, subtotals `IM 125` · `SM 13` · `TP 14` = `152`; both caps still hold (`152 ≤ 400`, largest row `48 ≤ 100`) and the `(bounded)` set stays `5` of `10`. NO term, row id, strategy id, seed or cap moves for this RECORD alone.** **A gate-10 DONE row MUST carry this gap as OWED, never as covered** (`§5.3` item 8's register-record duty).

12. **⟶ ADDED 2026-09-27 (GATE 7, THE PROOFREADER PASS — finding `PF-12`, and the ONE live register record line this status block owed) — THE LIVE REGISTER RECORD LINE AND THE LIVE LEG FIGURES, WITH THEIR PROVENANCE STATED AT EVERY FIGURE — AND, IN THE SAME ITEM, THE GATE-10 CLOSE-OUT THIS FILE OWES (`PF-12`'s second half).** **THE LIVE REGISTER RECORD, verbatim in the form the landed `tests/container.test.ts` prints it through the node suite (`§5.2` leg 1):** **`totalDeclared 151 · attemptsExecuted 151 · broken 0 · registerStoppedAt null · seed 20260927 · the (bounded) set of five`** (`P-CT-IM-1` · `P-CT-IM-4` · `P-CT-IM-5` · `P-CT-SM-3` · `P-CT-TP-1`) — **read with the arithmetic `151` = `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14`, caps `151 ≤ 400` and largest row `48 ≤ 100` (`§5.5.3`).** **WHOSE MEASUREMENT THIS IS, stated exactly:** **the record line's figures are the GATE-8 DOCUMENTATION REVIEW's reading of the landed harness and of `§5.5.3` (this file, 2026-09-27) — NOT a run taken by THIS pass, which holds read/search/doc-write tools and no shell: it ran no suite, no leg, no `tsc`, no build and no Electron boot.** **THE LIVE LEG FIGURES, each with its own named owner so no figure is misattributed:** **`npx vitest run tests/container.test.ts` — `68` rows ALL GREEN, the register printing the record line above (GATE 8's reading, re-confirmed by the `E5` handover block's own measured state); `npm test` (the full suite) — **`OWED AT THIS PASS`** (the last recorded figure is the `E4` DONE row's `69` files / `1628` passed / `2` skipped / `0` failed, taken BEFORE this module landed and NOT re-run since); `npm run typecheck` · `npm run typecheck:tests` · `npm run build` — **`OWED AT THIS PASS`** (last recorded: `0`, `0`, `0`, as the `E4` DONE row carries them); the unit's own leg 4/5 standalone strict `tsc --noEmit` over `tests/container.test.ts` — **`OWED`** (no pass has run it for `E5`); `npm run divergence` · `npm run ui` — **`OWED` at this pass and NOT claimed: the module is imported by no `src/**` file, so neither leg can read it, and no figure for either is asserted anywhere in this file on this unit's behalf.** **A later pass that fills these cells MUST name itself and the command's own output; a cell that quotes a figure without its owner is a review finding.** **NO term, row id, strategy id, seed, cap or `(bounded)` marking moves for this item, and no leg result is claimed here.**

13. **⟶ ADDED 2026-09-27 (GATE 10, THE CLOSE-OUT PASS) — THE UNIT IS `DONE` AND THE LEDGER HAS MOVED.** **`U-CONTAINER` (`E5`) IS `DONE` — the ledger's FIFTEENTH `DONE` row, wave `E`'s SEVENTH — and the authoritative record is `docs/next-steps.md`'s `## DONE — U-CONTAINER` section, which carries the contract's `§5.3` TWELVE-ITEM shape filled item by item.** **THE LEDGER MOVE, as this file's own arithmetic must read it: `docs/next-steps.md`'s `E5` row is labelled `E5 — MOVED TO DONE (2026-09-27)` with its cells annotated as spent provenance; the live ledger is `15 DONE / 6 open` UNITS = `21` units; the open set is `E7` · `E8` · `E9` · `F1` · `F2` · `F3`; the next action is `E7` (`U-MENULIB`) at its SPEC GATE; and this unit's own declared total is UNMOVED at `151`.** **WHAT REMAINS `OWED` AND IS CARRIED BY THAT RECORD RATHER THAN BY THIS FILE: gate 9's live run (this close-out pass held NO SHELL, so it took no measurement — its DONE row marks every leg cell `OWED AT THIS PASS`), the `docs/FORKER.md` container two-edge seam block + glossary (`docs/pending.md` `§L-4e`), the lone-surrogate coverage gap (item 11 / `§5.5.2` item 10) and the six `§3b` negative generators.** **NO SECTION, ROW ID, TERM, STRATEGY ID, SEED OR CAP MOVES FOR THIS ITEM** — `§5.3`'s twelve-item shape, `§5.5.1`'s tables, `§5.5.3`'s arithmetic and `§3a`/`§3b`'s records all stand exactly as amended, and **the `§5.3 → §5.5` gap (no `§5.4`) and the absence of a `§5.5.0` are UNCHANGED** (`§5.3` item 12).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** Where
a ruling is **quoted**, the quotation is marked; where a step is this filing's own **derivation**, it says
so in place.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** (`docs/decisions.md`, ACTIVE; the gate-1 ruling `B-1`=`B`, recorded at `docs/specs/container-review.md` `§9.4.7` and `§9.4.2`). **The architect's choice, quoted in substance:** *"the module RETURNS the declaration TEXT and the consumer applies it."* **What it pins:** `contain: layout style paint` is a **module-owned OPAQUE CONSTANT STRING, NEVER PARSED, RETURNED by the unit (with the caller-supplied class name returned alongside it)**; **the unit performs NO WRITE OF ANY KIND**; **`[T]`-provable text identity**; **no renderer wiring, no `§5.1` path containing `src/renderer/**`, and NO live battery owed — gate 6 remains `STRUCTURAL`**; **`A-d4`'s *"ONE shipped declaration survives"* STAYS INTACT, because the artifact is shipped AS RETURNED TEXT, NOT AS APPLIED STYLING.** **The NOT-TAKEN alternatives, recorded so they are not re-invented:** `(A)` the module APPLIES it — **recorded as the reading that would make the unit a UI ELEMENT** under `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`/`S-d8` `(C)#2`, owing renderer wiring and a MANDATORY live battery **it cannot carry**; `(C)` the FORK owns the CSS — an **`A-d4` RE-SCOPE** needing a dated architect annotation beside that ruling. | `§0A` note 1, `§2.1` item 2 (`containerDeclarationFor`), `§2.3` item 4, `§2.5` items 1/3, `§3.1 M-10`/`M-11`, `§3.4 R-8`, `§5.1`, `§5.2`, `§5.5.1 P-CT-IM-3`/`P-CT-IM-4`/`P-CT-IM-5`/`P-CT-SM-3` |
| **2** | **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** (`docs/decisions.md`, ACTIVE; the gate-1 ruling `B-2`=`A`, recorded at `docs/specs/container-review.md` `§9.4.7` and `§9.4.2`). **`edge` — the FIRST argument of `orientationFor(edge, axisResolver)` — is ANY CALLER VALUE, UNINTERPRETED BY THE MECHANISM**, pinned **WITH THE NO-REACH CLAUSE: no parameter through which a `clientX`/`clientY`/`getBoundingClientRect`/element reach could arrive**, so **the unit READS NO COORDINATE AND NO GEOMETRY**; **`S-d11`'s mandatory unprovable-geometry clause lands wherever geometry is described.** **The NOT-TAKEN alternatives, recorded with their costs:** `(B)` a declared-unit SCALAR — would give the mechanism **a unit vocabulary and an arithmetic of its own**; `(C)` a caller-supplied NAMED ENUM — would give it **an edge vocabulary needing its own scan exemption**. | `§0A` note 2, `§2.5` item 2, `§3.3 I-8`, `§3.4 R-6`, `§5.2`, `§5.5.1 P-CT-SM-3` |
| **3** | **`B-3` IS A RECORDED WORKING DEFAULT, NOT A RULING** (`docs/decisions.md`, the `E5-B-3` row — its own title says *"NOTE (not `DECIDED`)"*; the gate-4 verdict's words at `docs/specs/container-review.md` `§9.5` `G-3` and `§9.4.7`). **THE WORKING DEFAULT: FORBIDDEN** — a caller-supplied `is-empty`/`is-minimized`/`is-revealed` member handed to this mechanism states emptiness **a SECOND TIME, UNDER A SECOND NAME** (`AU-2`; `census.md` `§0A` ruling note 3's `V-13` class) — **UNLESS `U-CENSUS`/`U-ZONES` SUPPLY THE VALUE**. **Its ARCHITECT-REVERSIBLE ALTERNATIVE, named with it: `B-3`=`(B)` — permitted only where `U-CENSUS`/`U-ZONES` supply it**; reversing the default is a **dated annotation, never a silent spec edit**. | `§0A` note 3, `§2.2` `P-CT-13`, `§2.3` item 3, `§5.5.1 P-CT-IM-2`, `§7a.1` item 1 |
| **4** | **`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (`docs/decisions.md`, ACTIVE): the panes/zones family is in scope, `A-d4` is binding, and **`U-CONTAINER` ← `SCH-10`** with *"`tokensFor(chrome, tokenFn)` / `orientationFor(edge, axisResolver)` with the mirror-class taxonomy caller-supplied; **ONE** shipped declaration `contain: layout style paint` whose class name is caller-supplied; consumer selectors/`:has()` stay consumer-side"*. | `§1` item 1, `§2.1` item 1, `§2.3` item 4, `§2.4`, `§8` |
| **5** | **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE). **The mechanism-vs-UI-element test, quoted:** a mechanism is outside the UI constraint **because it is not a UI element** — *"it authors no text, no control, no affordance, **no class taxonomy**, no slot content and **no styling**"* — and *"a mechanism that **authors content** — a status text, a status element, a **mirror-class taxonomy**, a slot model, **a literal default** — **IS a UI element authored outside the provident graph and remains a review finding**."* | `§0A` note 1, `§1` item 4, `§2.2` `P-CT-2`, `§3.4 R-8`, `§5.2`, `§7` item 5 |
| **6** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE): the caller seams are *"a **PUBLIC, EXPORTED, DOCUMENTED CONTRACT** that downstream consumers (forks) **IMPLEMENT**"*, and *"each seam's **signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is normative contract text** — a seam that is absent, non-callable or throwing must produce a declared safe default and a row that can FAIL, **never a silent no-op**."* | `§2.4` (the two-edge table and its falsifiable degradation rows), `§2.1` item 1 (the type half), `§8` |
| **7** | **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE): *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*, **and gate 1 must answer explicitly whether the allowed file set contains a path from the application's entry point to this mechanism.** | `§5.1` (the derived DENIED set, named first), `§5.2`, `§7` item 4 |
| **8** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE): a code-bearing unit's register is **MANDATORY before its red set**; the zero-row exemption is **UNAVAILABLE**; the row count is an **OUTCOME, not a budget**. | `§5.5`, `§5.5.1`, `§5.5.2` items 1/2 |
| **9** | **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** (`docs/decisions.md`, ACTIVE): assertions, observations and readings are printed **BESIDE** a term and **never counted in it**. | `§5.5.1` (every cell), `§5.5.2` item 3, `§5.5.3` |
| **10** | **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE): *"a total that is not the sum of its own terms, or a total quoted without its terms, is a review finding."* | `§5.5.2` item 3, `§5.5.3`, `§5.3` item 11, `§7` item 9 |
| **11** | **`SHIM-COMPLETION-CARVE-OUT`** (`docs/decisions.md`, ACTIVE): it admits **EXACTLY ONE** shim addition (`ShimElement.removeAttribute`) and **every other member in `H-r5`'s list stays forbidden** — *"not layout, CSS resolution, pointer/capture semantics, `dblclick`, `matchMedia`, `activeElement`/focus walk, `getComputedStyle`, `setProperty` or a render-count seam"*. | `§5.2` (why the declaration's applied half has no node-side reader), `§3.4 R-3`, `§7` item 8 |
| **12** | **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE): prohibition 5 is *"an adoption bound on units"*, and **every (C) unit's spec still carries prohibition 5 as a NON-GOAL ROW**; `ALL_TOOLS`/`RpcMethod`/`VALID_GROUPS`/`MUTATING_METHODS` are **not touched**. | `§0A` note 6, `§2.2` `P-CT-5`, `§3.3 I-13` |

### 0A. The dated ruling notes — the clauses the record leaves to this filing, RULED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about the module
boundary, the nine identifiers, the layer map and the register sketch; it leaves several clauses a
TestWriter must have before it can author a **falsifiable** row. **This filing DECIDES each of those
clauses here**, each with its reason and its landing site. **No note below weakens a condition, a ruling
or a register row**; the places where a clause could **not** be derived are **reported, not guessed**, at
`§7a`/`§7a.1`.

**Note 1 — THE DECLARATION IS RETURNED, THE UNIT WRITES NOTHING, AND THE APPLIED PROOF IS REFUSED, NOT
PARKED.** *(Ruled by `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`; the gate-1 record's
`§9.4.5`/`§9.4.6`/`§9.5.2`.)* **RULED: `containerDeclarationFor(className)` RETURNS the pinned text
alongside the caller's class name and performs NO WRITE OF ANY KIND.** **The instrument question is
therefore closed at FILING TIME, not at gate 6**: `ci-ui-leg.md` `§3.0 R2`'s **ONE measurement is SPENT**
(*"A second measurement is a new design decision"*, its `§1` item 3), `ci-ui-leg.md` `§2.1` item 6 **names
CSS resolution as OUTSIDE that leg** (*"rendered geometry, **CSS resolution**, layout, IPC behaviour, and
*any* attribute row — all four are **outside** this leg"*), and the `H-r10` extractor is an
**attribute-presence channel that CANNOT READ A DECLARATION**. **So the APPLIED half is refused in the
family's fixed three-part form (`§5.2`) and the RETURNED-TEXT half is `[T]`-provable — a byte-equality
row (`§3.4 R-8`, `§5.5.1 P-CT-IM-4`), never a promise.** **The alternative reading is recorded as NOT
TAKEN rather than argued away:** *a module that APPLYs the declaration would author a rendered surface,
owe a MANDATORY live battery, and still have no instrument able to read the write back* — that is the
`(A)` reading the ruling declined.

**Note 2 — `edge` IS AN OPAQUE CALLER VALUE, AND THE NO-REACH CLAUSE IS PINNED AS A STATIC ROW.** *(Ruled
by `E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`; the gate-1 record's `§9.4.2`.)*
**There is no parameter anywhere in this module's surface through which an event object, a
`clientX`/`clientY` value, a `getBoundingClientRect` result, a `getComputedStyle` result or an ELEMENT
could arrive** — the module is handed a caller value and hands it on. **The three parameters and the two
returned values exhaust the surface** (`§2.1`). **`S-d11`'s mandatory clause lands at `§2.5` item 2,
`§3.3 I-8` and `§3.4 R-6`** and fences every row that could be read as a geometry claim:
***the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts
contracts/arithmetic only)***.

**Note 3 — `B-3` IS A WORKING DEFAULT WITH ITS REVERSIBLE ALTERNATIVE NAMED, NOT A RULING.** *(The
`docs/decisions.md` `E5-B-3` row's own title says *"NOTE (not `DECIDED`)"*; gate-4's `G-3`.)* **THE
DEFAULT: the caller's mapping may carry NO `empty` / `is-empty` / `is-minimized` / `is-revealed` member,
unless `U-CENSUS`/`U-ZONES` supply the value.** **Its ARCHITECT-REVERSIBLE ALTERNATIVE `B-3`=`(B)` is
named with it: PERMITTED ONLY WHERE `U-CENSUS`/`U-ZONES` SUPPLY IT.** **The clause the default upholds is
named with it: the `AU-2` one-authority/emptiness rule** — `U-ZONES` owns emptiness (`isEmpty(census,
zoneId)`, `zones.md` `§2.3`) and `census.md` `§0A` ruling note 3 states that its own unit *"must not
compensate for that"* because compensating *"would be a **second authority over emptiness**, the `V-13`
class ruling 3 closes"* — **and the rule is CITED here, never re-opened.** **RULED FOR THIS FILING: the
default is implemented (`§2.3` item 3, `§2.2` `P-CT-13`, `§5.5.1 P-CT-IM-2`) WITHOUT the module growing a
member-name ban of its own beyond the three hyphenated taxonomy spellings it already carries** — because
the mechanism reads **no member of `chrome` at all as a decision**; the default is a statement about
**which mappings are admissible to the caller**, and the module's own row asserts it as **"the returned
value is the caller's own answer, unaffected by any member the record carries"** — a claim that holds
under BOTH readings and therefore does not smuggle the ruling that is not yet made. **The architect
reversing the default changes NO module byte, NO row id and NO register term** — recorded so the reversal
is cheap and honest (`§7a.1` item 1).

**Note 4 — THE MODULE PATH IS `src/shared/container.ts`, AND THE TEST FILE IS `tests/container.test.ts`.**
This filing fixes both, following the sibling naming convention (`src/shared/zones.ts` · `census.ts` ·
`gesture-session.ts` · `gutter.ts` · `gutter-affordance.ts` · `owned-list-host.ts` · `slot-host.ts` ·
`layout-projection.ts` · `relocate.ts` — all **read this pass via the glob of `src/shared/*.ts`, which
returned exactly fourteen files and NO `container.ts`**) and the unit's own name (`U-CONTAINER`), which
decides the stem. **Nothing else in this file presumes a path.** The test file is named because
**`§5.1`'s diff scope must be a real, checkable allow-list.**

**Note 5 — THE RETURNED DECLARATION RECORD'S MEMBER NAMES ARE PINNED HERE, AND THEY ARE THIS FILING'S
DERIVATION.** **THE GAP, stated plainly: the gate-1 record pins that the class name *"is returned
alongside"* the declaration text and pins the TYPE name `ContainerDeclaration`, but it does NOT pin the
record's members.** **RULED: `ContainerDeclaration` is `{ readonly className: string; readonly
declaration: string }` — TWO members, in that declaration order, no third** — **the value that proves the
return half of `E5-B-1` (`className`, the contract's own word for the caller-supplied class name) beside
the value that proves the `A-d4` artifact (`declaration`, the contract's own word for the shipped
declaration).** **Why these two names and no others:** they are **the two words the charter already uses**
(`docs/pending.md`'s `SCH-10` row: *"**ONE** shipped declaration survives (`contain: layout style
paint`) … the shipped declaration's **class name is caller-supplied**"*), so the record introduces **no
new vocabulary**; and a reader of `docs/FORKER.md` meets the same two words the ledger row uses.
**THE COLLISION THIS CREATES IS NAMED AND RECONCILED, not hidden:** `className` is on **two landed
negative token lists** (`gutter-ui.md` `§2.1` item 6 and `relocate.md` `§3.4 R-11`) — as a **UI-CONTENT
WRITE spelling**. **The reconciliation is `§2.3` item 6**: what those rows ban is **the write**
(`x.className = …`, `x.classList.…`), and **this module performs NO write**; the bare **member/parameter
name** is this unit's **declared contract vocabulary and is EXEMPT BY NAME in its own scan row**, exactly
as `threshold`/`distance` are exempt in `relocate.md` `§3.4 R-1`. **NO BAN IS WIDENED OR WEAKENED by this
note.** **RECORDED AS A WORKING DEFAULT TOO (`§7a.1` item 2): a gate that prefers `name`/`text`, or a
tuple order, may rename them — and doing so moves NO row id, NO term and NO attempt, because every row
below reads the members through their OWN cell's named binding.**

**Note 6 — PROHIBITION 5 IS A NON-GOAL ROW, AND THE NEGATIVE FILE/CONFIG SET IS PINNED.** *(The gate-1
record's `C-10`; `docs/decisions.md`'s `PROHIBITION-5-IS-AN-ADOPTION-BOUND`.)* **This module adds NO tool,
NO resource, NO group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry and no
IPC method.** The family's pinned surface negatives are **read as SET claims, never as a number quoted
here** (`§4.4 S-CT-8`): `ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` keep **exactly the
names they carry today**, and **`R-4`/`R-11` are the rows that can FAIL for a smuggled surface**. **The
negative file/config set, carried whole:** **no store and no persistence** (prohibition 4 / `S-d4`; the
sibling statement is `docs/decisions.md`'s `THEME-MECHANISM-AND-AUTHORED-CONTROL`: *"this repo owns no
UI-config store, `S-d4` is intact"*) · **no `src/main/**`** · **no `electron`, no `node:*`** · **no shim
change** (`H-r5`, amended **not weakened** — `SHIM-COMPLETION-CARVE-OUT` admits exactly one member and
forbids `getComputedStyle` permanently).

**Note 7 — THE DEFECT-REPAIR AMENDMENT, MADE AFTER THE RED SET RAN (2026-09-27).** *(The pass that AMENDS
this contract; it writes THIS FILE and nothing else. The gate-1 record, the two rulings, every row id, every
per-row term, every strategy id, the seed and both caps are UNMOVED — **the ONE number this amendment moves
is the DECLARED TOTAL**, and the as-filed forms all stay visible beneath their dated annotations, per
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1, *"a mis-sum is corrected by annotating, never by
silently rewriting"*.)*

**7.1 — THE RED RUN'S PROVENANCE, recorded so the amendment is attributable.** `tests/container.test.ts`
was **authored**, **RUN** and **REPORTED**: **`68` rows · `49` FAILED / `19` PASSED**, against a module that
**does not exist**. **`19` rows are the red-time-premise rows** the spec's own `§4.1`/`§4.2` item 1 call
"evaluable with no module at all" (`§3.5 X-1`, `§3.4 R-9`/`R-11`/`R-12`'s no-importer half and the
`R-1`..`R-13` static rows whose corpora are harness-side). **The REGISTER STOPPED at `P-CT-IM-1` after `5`
consecutive failures** (`§5.5`/`§5.5.1` strategy-discipline item 3), and the **`9` un-run register rows
BELOW it were REPORTED AS FAILURES, never omitted** — which is the behaviour `§4.2`'s stop-rule paragraph
demands (*"the un-run rows must be REPORTED AS FAILURES rather than silently omitted"*), so **the red run
satisfied the stop rule rather than violating it.** **The red set is FILED and REPORTED; this pass amends the
CONTRACT it reddened.**

**7.2 — THE REGISTER ARITHMETIC DEFECT, RULED (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`).** **THE TERM
VERDICT, stated first because everything else follows from it: NO PER-ROW TERM IS WRONG — not one of the ten.
The declared total, its addition chain and its `IM` subtotal were wrong, and the already-recorded "correction"
was wrong in a NEW way.** **THE TRUE ARITHMETIC, printed with its terms:**
**`137` = `40` (`P-CT-IM-1`) + `26` (`P-CT-IM-2`) + `17` (`P-CT-IM-3`) + `10` (`P-CT-IM-4`) + `12`
(`P-CT-IM-5`) + `5` (`P-CT-IM-6`) + `3` (`P-CT-SM-1`) + `5` (`P-CT-SM-2`) + `5` (`P-CT-SM-3`) + `14`
(`P-CT-TP-1`)**, **the chain `40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 → 123 → 137`**, and **the subtotals
`IM 110` · `SM 13` · `TP 14` = `137`.** **THE CAUSE OF THE FALSE `154`: the as-filed *"correction"* line
(`IM` = `40 + 26 + 17 + 10 + 12 + 5 + 17` = `127`) RE-ADDS `P-CT-IM-3`'s `17` A SECOND TIME — it was written
to fix a subtotal that omitted `P-CT-IM-3`, and it added that term twice, landing on the false `154`
(`127 + 13 + 14`). The as-written `110`/`13`/`14` = `137` line and the as-filed `154`/chain/`127` all stay
visible at `§5.5.3` under dated annotations; **the DECLARED TOTAL this contract now carries is `137`, printed
WITH its ten terms and its chain, at every site that carries it** (`§5.5.3`, `§5.3` item 11, the `CURRENT
STATE` block, `§1` item 8, `§4.2` item 6, `§5.5.2`'s references, `§7` item 9, `§8`'s citation-index rows and
`§3a`'s `A-14` audit question). **CAPS RE-CHECKED AGAINST THE CORRECTED FIGURE: `137 ≤ 400` (total) and the
largest row `40 ≤ 100` (`P-CT-IM-1`) — BOTH STILL HOLD**, with total headroom `263` and per-row headroom
`60`. **THE `(bounded)` SET IS UNMOVED: `5` of the `10` rows — `P-CT-IM-1` · `P-CT-IM-4` · `P-CT-IM-5` ·
`P-CT-SM-3` · `P-CT-TP-1`.** **NO row id, strategy id, seed, cap, family membership or per-row term moved;
the declared-vs-distinct ledger (`§5.5.2` item 3) is unmoved too, because it is per-row.**

**7.3 — THE RE-GRAIN OBLIGATION, STATED SO IT IS NOT DISCOVERED LATE.** **THE RED SET'S OWN REGISTER
HARNESS NOW OWES A RE-GRAIN**: it was **authored asserting the AS-FILED `154`** (`tests/container.test.ts`'s
register-status row asserts the as-filed total `154`, the as-filed chain ending `154`, the excess `17` and the
family subtotals `110`/`13`/`14`) **beside** the measured `137`. **With this amendment the DECLARED total IS
`137`**, so that row must be **re-grained to assert `137` as the DECLARED figure with the as-filed `154` kept
BESIDE it as the annotated provenance** — the annotation survives; only the polarity of "declared" vs
"measured" flips. **The re-grain is a SEPARATE pass, is owed to the TestWriter, and is NOT performed here**
(this pass holds no test-file tool). **What the re-grain must NOT do: move any per-row term, any row id, any
strategy id, the seed `20260927`, either cap, or the `(bounded)` set — it re-points the arithmetic row's
polarity and nothing else.**

**7.4 — THE FOUR ROW-BOUND DEFECTS THE RED FOUND, each pinned at its own row (`§3.4`/`§2.3`).**
**(1)** **`R-7`'s positive control was UNDERIVABLE AS WRITTEN**: the spec named *"a corpus carrying a SECOND
declaration-shaped literal"* as the control, but **the example given WAS the pinned literal — one of the two
ALLOWED literals — so a corpus carrying `const d2 = 'contain: layout style paint'` PASSES the row**, and a
**fragment-assembled corpus whose joined value is byte-identical to the pinned text is likewise a member of
the allowed set, not a violation of it.** **PINNED at `§3.4 R-7` and `§2.3` item 5: the control drives the
SPELLING-VARIANT form, and the byte-identical assembled declaration is IN the row's catch (out of the
allowed set) only as the ASSEMBLED spelling — a byte-identical assembled form is caught by `R-8`'s
assembly control and by the assembly-detecting view, never by the two-literal closed-set census, because that
census reads LITERAL BODIES and the body of a joined form IS the pinned text.** **(2)** **`R-6`'s stated bound
was SELF-CONTRADICTORY**: it scans the test file's raw bytes AND its row descriptions for the same geometry
tokens the scan row must itself hold — the collision `S-CT-6` requires every scan row to NAME an exemption
for. **PINNED at `§3.4 R-6`: its declared exemption set is the tokens BUILT FROM CHARACTER CODES and never
spelled, plus the fragment `'geometry'`, and NOTHING else; and `R-6`'s token list is EXTENDED to `§2.5` item
2's own members — `screenX`/`screenY` and `offsetX`/`offsetY` (named at `§2.5` item 2, omitted by the
as-filed row).** **(3)** **`R-1`'s exemption list omitted `style`**, while the one literal the module must own
is `contain: layout style paint` and `R-10` bans a bare `style`. **PINNED — the reconciliation is BLESSED,
not re-spelled: `R-1` carries `style` as a DECLARED EXEMPTION BY NAME, AND the subtraction of the pinned
literal before the write/CSS scans is the DECLARED reconciliation, with `M-10`(c) asserting the subtraction
is LOAD-BEARING** (`style` present before, absent after) **so the exemption cannot become a general licence:
every OTHER occurrence of the token is still caught.** **(4)** **`R-1`(g)'s token list COLLIDED with `R-6`'s
subject inside the same file** (`getComputedStyle`/`getBoundingClientRect`/`pointerId`/`matchMedia` — spelled
nowhere, built from character codes at both sites). **PINNED at both rows: the collision is reconciled by the
SAME declared-exemption/derivation form as (2) — the `R-1`(g) tokens that `R-6` also fences are held as
CODE-BUILT tokens and are `R-6`'s declared exemption, so both rows hold at once.**

**7.5 — THE TWO DATED METHOD NOTES (the TestWriter's authoring hazards, which are the CONTRACT's business
because a later author must not re-discover them).** **(a) JOIN FIRST, THEN STRIP.** The landed
`tests/**`-scan techniques **STRIP QUOTES BEFORE JOINING**, which means **they cannot join a
fragment-assembled literal into one piece** — the joined view for the ASSEMBLY controls must be produced by
**JOINING FIRST AND STRIPPING AFTERWARDS**, and **(b) the literal-body census must read a QUOTE-PRESERVING
joined view**, because a quote-stripped view has no literal bodies to read at all. **Until both hold, the
`R-7`/`F-8`/`P-CT-IM-4` ASSEMBLY-EVASION CONTROLS ARE UNFALSIFIED WHILE LOOKING GREEN** — the exact
`S-CT-6` vacuity class, in the harness rather than in the clause.

**7.6 — THE FIVE RECORDED GUESSES, DISPOSITIONED (each a PIN, none re-opened).** **`G1` — the `R-1`-vs-`style`
reconciliation: `§3.4 R-1`'s exemption list now NAMES `style` and the pinned-literal subtraction is the
DECLARED reconciliation (`7.4` item 3) — the option taken is the BLESSED SUBTRACTION; the exemption is
ADDED, not substituted.** **`G2` — `R-6`(c)'s *"row descriptions extracted from the test file"* had NO
extraction method: PINNED as the method used — EVERY `it`/`describe` TITLE CAPTURED AT DECLARATION TIME,
scanned as a SET, plus the file's own BYTES (raw and normalized)** — the capture-at-declaration form, so the
extraction is the file's real titles and not a copy. **`G3` — `R-1`'s scope over the test file was ambiguous:
CONFIRMED as the reading used — `R-1` scans the MODULE file, with the CORPORA carried as SEPARATE CONTROL
STRINGS, and the TEST-FILE scan BELONGS TO `R-6`.** **`G4` — `R-12`'s allow-list census needs `git`, which is
unavailable at run time: PINNED as the reading used — the FILESYSTEM PROBE: every DENIED path present on
disk, every artifact path of this unit's allow-list existing, and the IMPORTER GRAPH READ FROM THE TREE
(a recursive `src/**` read of the module's specifier), with NO git command.** **`G5` — `I-14`'s *"no electron
import"*: CONFIRMED as an IMPORT-STATEMENT assertion, not prose** — the probe reads the file's import
statements, so this file's own comments about the refusal cannot redden it.

**Note 8 — THE SECOND DEFECT-REPAIR AMENDMENT, MADE AFTER THE FIRST IMPLEMENTER PASS LANDED THE MODULE (2026-09-27).** *(The pass that AMENDS this contract again; it writes THIS FILE and nothing else. The gate-1 record, the two rulings, every row id, every strategy id, the seed `20260927` and both caps (`≤100`/row · `≤400` total) are UNMOVED. **TWO per-row TERMS and the DECLARED TOTAL move, on part-D's answer below, and every moved figure is printed beside the form it replaces** — `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1, *"a mis-sum is corrected by annotating, never by silently rewriting"*, applied to terms this time and not only to a total.)*

**8.0 — THE STOP'S PROVENANCE, recorded so this amendment is attributable.** `src/shared/container.ts` **LANDED at commit `91311ac`** — **`85` lines**, the three value exports + the three type declarations, **an empty import census**, no module-level state, and the pinned constant `'contain: layout style paint'` **returned by constant reference** — reaching **`58` passed / `10` failed of `68` rows** (the module-absent red was `68` rows · `49` FAILED / `19` PASSED) and then **STOPPING to report rather than editing the red set**, which is the correct Implementer behaviour (a red set is repaired by a TestWriter, never by the Implementer). **THE IMPLEMENTER'S TEN REPORTED DEFECTS ARE NINE CLASSES** (its own pairing: `F-12` + `P-CT-IM-6` are one class in two rows). **THIS AMENDMENT DISPOSES FOUR OF THEM AS CONTRACT DEFECTS — parts `A`/`B`/`C` below — AND THE REGISTER'S DECLARED-vs-EXECUTED DISCREPANCY AS PART `D`.** **The remaining test-side rows (`X-1`'s branch, `F-12`/`P-CT-IM-6`, `P-CT-SM-1`(a), `REGISTER-STATUS`) are PINNED HERE as the reading they must assert and are owed to the TestWriter's repair pass** (`§0A` note 7.3's re-grain is folded into it). **This pass holds no test-file tool: nothing below was executed; every measured figure is the commit's own report or this pass's read of the two files it names.**

### 0B. The gate records — notes 9.1–9.6

**⟶ INSERTED 2026-09-27 (GATE 7, THE PROOFREADER PASS — finding `PF-1`, HIGH; annotate-never-rewrite, so NOTHING below is rewritten).** **THE DEFECT AS FILED: this heading DID NOT EXIST while EIGHT sites in this file cited `§0B`** (`CURRENT STATE` items 5/10 and its `§5.5.1`-citation note, `§0A` note 9.1's own closing note and notes 9.2/9.6, `§3a`'s `A-14` row, `§8`'s register row and its `docs/specs/container-greens.md` row) — **so every `§0B` citation was DANGLING**. **THE HEADING IS INSERTED HERE, ABOVE notes 9.1–9.6, and the duplicated *"Note 8 — THE SECOND DEFECT-REPAIR AMENDMENT …"* header that stood where notes 9.1–9.6 began is MOVED OUT of their way** (the note-8 amendment's own continuation — `8.1`–`8.5` — is anchored under the note-8 block above; see the pointer left in its place). **THE NUMBERING NOW RUNS IN ORDER AND EVERY ADDRESS RESOLVES: note 8 (and its `8.0`–`8.5`) → `§0B` notes `9.1`–`9.6` → the note-8 continuation `8.1`–`8.5`, whose site is unchanged.** **NO claim, figure, term, row id, strategy id, seed or cap moves for this insertion: it is a heading plus this dated annotation.**

**9.1 — THE GATE-4 RECORD, in its own form.** **`HOST DEFECTS: NONE` · `PACKAGE DEFECTS: NONE`** — the package half stated with its reason: **an EMPTY IMPORT CENSUS (`R-4`), NO DOM/realm/MCP surface, and NO shim member**, so this unit exercises no `provident-ssr` surface and `docs/defects.md`/`docs/HANDOFF.md` receive nothing. **THE PASS FILED EIGHT FINDINGS, ALL CONTRACT- OR HARNESS-SIDE — `ADV-CT-1`…`ADV-CT-8` — and each is dispositioned at `§3b` (the findings table plus the audit table and its negative-generator task list): `-1` `P-CT-IM-3`'s MIS-GRAINED DISTINCT figure (`18` harness / `12` printed / `17` re-derived) · `-2` `P-CT-IM-3`'s own cell (`17`/`10` vs the re-derived `23`) · `-3` `P-CT-IM-1`'s `(bounded)` justification resting on the note-8.4-declared-WRONG *"the `8` further drives are ASSERTIONS"* clause · `-4` the stale-figure cluster (`§1` item 8 · `§5.5.3`'s printed total and chain · `§5.5.2`'s tail · the test-file header comments) · `-5` `§5.5.2` item 9's stale `17` · `-6` `§5.5.2` item 4's omitted pool-exclusion member · `-7` TEST-SIDE (a TestWriter row; recorded, not fixed here) · `-8` the LCG bias figure (~`10×` off; `1/306783378 ≈ 3.26 × 10⁻⁹`).** **THE PASS ALSO CONFIRMED THE ARITHMETIC INDEPENDENTLY, filing NO finding on it: `48+26+23+10+12+5+3+5+5+14 = 151`, the chain, the subtotals `IM 124 · SM 13 · TP 14`, both caps, the seed `20260927`, and the `(bounded)` set of five.** **ITS HONEST LIMIT, in its own record: IT RAN NOTHING.**

**⟶ NOTE ON `ADV-CT-4`/`-7`: of the EIGHT, SEVEN were disposed IN this contract and TWO carried a TEST-SIDE half — `ADV-CT-4`'s test-file header-comment sweep and `ADV-CT-7`'s own row, both named at `§0B` note 9.6 and in `§3b`'s negative-generator task list.** **⟶ BOTH TEST-SIDE HALVES ARE NOW DISCHARGED AND MEASURED SO BY THE GATE-8 DOCUMENTATION REVIEW (2026-09-27): the header sweep LANDED and `ADV-CT-7`'s `PRE-2` repair LANDED — see `§3b`'s two rows; what survives as `OWED — TEST-SIDE` is the SEPARATE class of six negative generators, the lone-surrogate shape among them.**

**9.2 — THE GATE-5 RECORD (`docs/specs/container-greens.md`): the BLIND greens, `24` EXECUTED SCENARIOS — `24` PASS / `0` FAIL / `4` `NOT-BLIND-RUNNABLE` (`CN-G-N1`…`-N4`), plus `CN-G-24` (the type half, `tsc` exit `0`), over the module landed at `91311ac`, at the tree's `841c33e` — `git status --porcelain` EMPTY at the pass's start, `src/shared/container.ts` and `tests/container.test.ts` NEVER READ (the blindness claim), and the five findings `F-1`…`F-5` with NONE a converted FAIL.** **THE TWO `NOT-BLIND-RUNNABLE` CLASSES ARE NAMED, so the green is not over-read: `(i)` every STATIC byte/token census over the module (`CN-G-N1`/`CN-G-N2` — `R-1`/`R-2`/`R-4`/`R-6`/`R-7`/`R-8`/`R-10`/`R-12`/`R-13`'s census halves, including the four-body allowed set and the note-8.1 subtraction recipe); and `(ii)` every RENDERED/applied/computed/layout/paint/browser-acceptance fact (`CN-G-N3`) — the contract's own three-part `[U]` refusal, with the returned-text green explicitly NOT an applied-style green.** **THE FIVE FINDINGS, dispositioned: `F-1` = the SAME stale register cells `ADV-CT-2`/`-3` name (`P-CT-IM-1`'s and `P-CT-IM-3`'s cells), FIXED by this pass at those cells; `F-2` = TWO HARNESS BUGS OF THE BLIND WRITER'S OWN (a conformant closure driven where an ABSENT seam was asserted, and an inverted name→index table in the order comparison), both corrected and every scenario RE-RUN — NOT CHARGED TO THE MODULE, and recorded as the pass's own honesty; `F-3` = *"`'contain' + ': layout style paint'` is `===` the pinned text, so the ASSEMBLY-evasion half is statically-only falsifiable"* — THE CONTRACT'S READING, confirmed and already its own: the assembly half belongs to `R-8`'s assembly rule and to any PRE-JOIN byte reading (`§0A` notes 7.5/8.2), never to a byte-equality assertion on a returned string; `F-4` = THE SHAPE DOMAINS ARE NOT PINNED (`M-2`'s *"twelve"* v. the register's `eight`; the `TP-1` pool seed-drawn) — `§0B` note 9.3 PINS THEM BY NAME below *(⟶ ADDRESS CORRECTED 2026-09-27, GATE 7's `PF-2`: this clause read *"`§0A` note 9.3"*, an address note 9.3 never had in this contract's own numbering — the note-9 block is `§0B`'s, per the heading inserted at `PF-1`; the pointer's target and its meaning are unchanged)*; `F-5` = the unusable class-name set is `16` per `§2.5` item 3 / `F-7` but `10` in `P-CT-IM-3`'s cell — RECONCILED TO `16` at that cell, which is exactly what `ADV-CT-2` requires.**

**9.3 — THE DOMAINS, PINNED BY NAME (the `F-4` remedy; the `F-5` count follows the same form).** **THE READING IS NOW CONTRACT, not a choice each pass re-makes:** **(a) `chrome`/`edge`: `M-2`'s *"twelve"* is the §3 SAMPLE ROW'S ILLUSTRATIVE ENUMERATION (a record · `null` · `undefined` · `42` · `'x'` · `true` · a `Symbol` · a `12n` · a `Map` · an array · a function · `Object.create(null)`), and `P-CT-IM-1`'s REGISTER DOMAIN IS THE AUTHORITATIVE ONE — ITS `8` NAMED SHAPES (frozen record · null-proto record · `Map` with an `is-empty` key · `null` · `undefined` · a `Symbol` · a `12n` · a trap-throwing `Proxy`) × ITS `5` NAMED `tokenFn` SHAPES = `48` drives. THE TWO ARE NOT IN CONFLICT: the register enumerates the ROW's domain and the sample row names shapes the register omits (a primitive number, a string, a boolean, an array, a function), so a driver MAY drive the union but MUST NOT report a count from `M-2`'s list AS the register's term. `P-CT-SM-3`'s `edge` domain is its own `4` NAMED SHAPES (an opaque object · a string · `undefined` · a revoked `Proxy`) × its `3` resolver shapes. **(b) THE `TP-1` POOL IS THE REGISTER'S OWN `14` MEMBERS, SEED-DRAWN** — `S-CT-TP-1`, seed `20260927`, ONE LCG step per draw, `index = stateₙ₊₁ mod 14` — and the pool is a SUBSET by construction (`§5.5.2` item 4's three stated exclusions), so a driver that draws its own `14` shapes is driving the PROPERTY TEXT, never the term; `CN-G-20`'s `14` own shapes are recorded as ITS OWN, not as the term. **(c) THE CLASS-NAME DOMAIN IS `7` USABLE + `16` UNUSABLE = `23`, NAMED AT `§5.5.1 P-CT-IM-3`'s cell — the `16` of `§2.5` item 3 / `F-7`, NEVER the as-filed `10`.** **(d) THE SEAM-FORM DOMAINS are `P-CT-IM-1`'s `5` `tokenFn` shapes and `P-CT-SM-3`'s `3` resolver shapes; a blind pass's own `10`-form sweeps are `(bounded)` over ITS OWN enumeration.** **NO TERM MOVES FOR THIS NOTE: the domains are NAMED, the counts stay the terms note 8.4 printed.**

**9.4 — THE GATE-6 `STRUCTURAL` STATEMENT, CONFIRMED AND NAMED WITH ITS FALSIFIER.** **The contract already carries it at `§5.2` — *"GATE 6 IS `STRUCTURAL`, NOT WAIVED"*, with the word `waived` FORBIDDEN — and `§5.2` NAMES THE FALSIFIER: the module is imported by NO `src/**` file, appears in NONE of the built outputs, and reads NO coordinate/geometry/element, so a diff scope admitting a renderer path, the demo envelope, an authored class write or a proving probe FIRES the `§5.2` `§7.1` predicate, makes the three-part `[U]` refusal UNAVAILABLE and converts gate 6 into a live battery.** **NOTHING in gates 4/5 moves it: the gate-5 pass booted no window, ran no `npm run ui`, and its `CN-G-N3` records the boundary as STRUCTURAL; gate 6 remains `STRUCTURAL`, and a `waived` reading remains a review finding.**

**9.5 — THE UNIT'S `[U]`/`[D]` STATUS, AS FILED, unmoved by either gate.** **`[U]`: NOT OFFERED** (the three-part refusal at `§5.2`, whose reader question is answered `NONE`) · **`[D]`: NOT CLAIMED** (`PRECONDITION-GATED`, `§5.2`) · **THE `§7.1` PREDICATE: `DOES NOT TRIGGER`**, with its evidence and falsifier · **the legs declared: the node suite `[T]` plus `typecheck` `[H]` (`src/**` only), `build` `[H]` (the SIX-file output set), `typecheck:tests` `[H]`, and the standalone strict `tsc` leg 5.** **GATE 5 DID NOT WIDEN ANY OF THEM** — it ran the four read-only legs and leg 5's `tsc` over a `/tmp` type file, and its `CN-G-24` remains a PRESENCE claim (`§3.4 R-5`(b)), never an *exactly-three* one.

**9.6 — THE ONE TEST-SIDE ITEM THIS NOTE CARRIED (`ADV-CT-4`'s test-file half + `ADV-CT-7`) — AS WRITTEN, AND NOW DISCHARGED.** **`tests/container.test.ts`'s HEADER COMMENT BLOCK then printed the note-7.2 arithmetic — *"the DECLARED TOTAL this harness asserts is `137`"* with the `137` chain — while the file's OWN register rows below it already asserted `151`/`DECLARED_TOTAL = 151`/`INTERMEDIATE_DECLARED_TOTAL = 137`/`AS_FILED_TOTAL = 154`; and the header owed the sweep to `151` (with `137` and `154` kept visible as the intermediate and as-filed forms).** **⟶ SWEPT, AND MEASURED SO BY THIS PASS (GATE 8, 2026-09-27): the landed header now reads *"the DECLARED TOTAL THIS HARNESS ASSERTS IS `151`"* (= `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124 · SM 13 · TP 14 = 151`), with the as-filed `137` block KEPT ABOVE IT as annotated provenance — so `ADV-CT-4`'s test-side half is DISCHARGED and `ADV-CT-7`'s own row is CONFIRMED-REPAIRED (both dispositioned in `§3b`).** **WHAT REMAINS OWED TEST-SIDE IS THE SIX NEGATIVE GENERATORS of `§3b`'s task list — including the LONE-SURROGATE class name, which the `CURRENT STATE` block's item 11 and `§5.5.2` item 10 now carry as a NAMED COVERAGE GAP with its term consequence pre-committed (`23 → 24`, total `151 → 152`).** **The as-written form of this note is kept visible above as the pass's own reading; no claim in it is weakened, and each clause is marked with what it now measures.**

**⟶ CONTINUATION OF NOTE 8 (the second defect-repair amendment) — `8.1`–`8.5`, `PF-1`.** **THE DUPLICATED HEADER THAT STOOD AT THIS EXACT SITE IS MOVED, NOT DELETED: the two copies were byte-identical, which is why the site read as a second note 8 rather than as this amendment's continuation.** **THE AS-WRITTEN FORM, KEPT VISIBLE: *"Note 8 — THE SECOND DEFECT-REPAIR AMENDMENT, MADE AFTER THE FIRST IMPLEMENTER PASS LANDED THE MODULE (2026-09-27)"* — this is a verbatim quote of the removed duplicate header, not a live heading.** **THE FIRST COPY IS THE HEADING OF THE NOTE-8 BLOCK ABOVE (it opens `8.0`, which is this amendment's own provenance); the `8.1`–`8.5` subsections below are that same amendment's parts `A`–`D`, so NOTE 8 PRECEDES NOTE 9 and no second note 8 exists.** **`§0B`'s heading now covers notes `9.1`–`9.6`, which sit above this continuation in the file's byte order because the note-9 block landed between the note-8 header (`8.0`) and the note-8 parts (`8.1`–`8.5`); NO other site of this file moves for this note.**

**8.1 — THE PINNED-LITERAL SUBTRACTION IS PINNED AS A RECIPE, AND THE AS-AUTHORED FORM WAS A NO-OP (part A; must-fix).** **THE DEFECT, measured against the red set's own harness:** `viewWithoutPinnedLiteral` (`tests/container.test.ts`) does `view.split(`'contain: layout style paint'`).join(' ')` — a split on the **QUOTED** literal — while the view it is handed is `normalizeView`'s, which **strips `'`/`"`/`` ` ``**. **In a quote-stripped view the quoted needle does not occur, so the subtraction removes NOTHING**; `R-1`(c)'s `contain:` token, `R-3`'s CSS-literal half and `R-10`(a)'s `style` member therefore all still see the pinned declaration's own words and redden **a CONFORMANT module**, and **`M-10`(c)** — which asserts `style` **present before and absent after** the subtraction — consequently **demands the token be present and absent at once**, which is unsatisfiable. **THIS IS A CONTRACT DEFECT IN THE BLESSED RECIPE (`§0A` note 7.4 item 3), NOT A MODULE DEFECT.** **⟶ RULED — OPTION (iii), BOTH MECHANISMS AT ONCE, and each has a NAMED, DIFFERENT JOB:** **(i) THE SUBTRACTION OPERATES ON A QUOTE-PRESERVING JOINED VIEW** — the split runs **BEFORE any quote-stripping**, i.e. the **JOIN FIRST, THEN STRIP** rule `§0A` note 7.5 already pins for the assembly controls, read strictly: **the pinned-literal subtraction is itself a JOIN-FIRST consumer.** **THE VIEW, named exactly: `joinedQuotedView(source)` = comments STRIPPED, string-literal concatenation JOINED, quotes PRESERVED** (the view note 7.5 item 2 already requires for the literal-body census — `tests/container.test.ts`'s `joinOnlyView` **is already this view**, so no new technique is needed, only the right input). **THE RECIPE, stated so a TestWriter implements it without guessing:** **(1)** `joined = joinedQuotedView(moduleSource)`; **(2)** `subtracted = joined.split("'" + PINNED + "'").join(' ')` — **split on the QUOTED pinned literal, because `joined` PRESERVES the quotes that make the needle occur**; **(3)** the write/CSS scans (`R-1`(c), `R-3`'s CSS-literal half, `R-10`(a), and `M-10`(c)'s two readings) read **`subtracted`**; **(4)** **`M-10`(c)'s POSITIVE CONTROL is the same two readings over `joined`** — **`joined.includes('style')` is TRUE (the pinned declaration is really there) and `subtracted.includes('style')` is FALSE (the subtraction is LOAD-BEARING)** — **so the subtraction can no longer be a no-op: it is asserted to be load-bearing on the very token it removes.** **(ii) THE PINNED LITERAL IS ALSO EXEMPTED BY NAME**, as **a SECOND, INDEPENDENT control at the three rows the literal's own words would otherwise redden** — `R-1`(c), `R-3`, `R-10` — **with each row's positive and negative controls NAMED:**
> **`R-1`(c)** — **positive:** a corpus carrying a **CSS property-literal form OUTSIDE the pinned literal** (`contain: layout` in a second constant, or any other `contain:` occurrence) and a corpus spelling a `'px'`-class unit literal both **FAIL**; **negative:** the MODULE — whose only `contain:` sits inside the pinned literal, now subtracted — **PASSES**, **and so does a corpus carrying only the pinned literal.**
> **`R-3`** — **positive:** a corpus adding a `.css` file / a shim member / a config key **FAILS**; **negative:** the module and its test file **PASS** with the pinned literal subtracted.
> **`R-10`** — **positive:** the `F-9` corpus (`el.className = 'x'`, `el.setAttribute('style', decl)`) **FAILS both halves**; **negative:** the module's own `typeof className === 'string'` check and its `className` member name **PASS** (see **8.1(b)** below, which is the same row's second half).
**AS-FILED WORDING KEPT VISIBLE, and this is the site that blessed the broken form:** `§2.2`(D) row `2`'s *"**the pinned declaration literal is subtracted first, because its own words are the ONE declaration this unit owns**"*, `§3.4 R-10`'s *"**the DECLARED RECONCILIATION is the BLESSED SUBTRACTION of the pinned literal BEFORE this scan**"* and `§0A` note 7.4 item 3's *"**the subtraction of the pinned literal before the write/CSS scans is the DECLARED reconciliation**"* **all stand as written; what this note adds is the VIEW the subtraction runs on, the load-bearing control that proves it ran, and the exemption-by-name that stays as the backstop where a scan does not subtract at all. NO ban is narrowed: every OTHER occurrence of any token on `R-1`(c)/`R-3`/`R-10`'s lists is still caught** (`§2.3` item 5's *"every OTHER occurrence of the token is still caught"* clause, carried).
**8.1(b) — `R-10`'s BARE `className =` WRITE-FORM ALSO CATCHES A READ (part A, second half).** **THE DEFECT, measured:** the write-form regex `(^|[^A-Za-z0-9_$.])className\s*=` **matches `typeof className === 'string'`** — **the very check `§2.5` item 3's class-name domain and `§2.3` item 6 require** — because `className ===` contains `className =`. **⟶ PINNED: the bare form is `(^|[^A-Za-z0-9_$.])className\s*=(?!=|>)` and the dotted form is `\.\s*className\s*=(?!=|>)`** — **a `=` followed by another `=` (the equality operators) or by `>` (an arrow) is NOT a write form.** **CONTROLS: positive — `el.className = 'x'` FAILS; negative — `typeof className === 'string'` and a bare `className` member name PASS.** **NO ban is narrowed: every real write form on the two landed lists still fails, and `classList`, `setAttribute`, `innerHTML`, `outerHTML`, `appendChild`, `createElement` and `style` keep NO exemption.**

**8.2 — THE STRING-LITERAL CENSUS IS PINNED BY NAME, AND `R-7`'s ALLOWED SET IS CORRECTED (part B).** **THE DEFECT: `§2.3` item 5 says *"EXACTLY FOUR string literals"* in one sentence and *"the count is TWO"* in the next, and `R-7`'s allowed set `{PINNED, ''}` therefore EXCLUDES the very literals `§2.3` item 1's own dispatch table spells as `typeof tokenFn === 'function'` / `typeof className === 'string'` — so `R-7` reddens the module the dispatch table requires.** **DETERMINED FROM THE LANDED MODULE (`src/shared/container.ts` at `91311ac`, read this pass), which is the only admissible source for a census of a landed file.** **⟶ THE CENSUS, PINNED BY NAME — FOUR (4) DISTINCT STRING-LITERAL BODIES, and the `typeof` tags are string literals, spelled as such and NOT replaceable without rewriting the module's required checks:** **(1)** `'contain: layout style paint'` — the pinned declaration, **`1` literal occurrence**, the module's one CSS-shaped literal; **(2)** `''` — the declared EMPTY answer for an unusable class name, **`1` occurrence**; **(3)** `'function'` — the `typeof` tag used **TWICE**, in `tokensFor` and in `orientationFor`; **(4)** `'string'` — the `typeof` tag used **once**, in `containerDeclarationFor`. **`4` distinct bodies / `5` literal occurrences; `2` of the `4` are the `typeof`-tag class.** *(⟶ SCOPED 2026-09-27, GATE 7's `PF-10`: **THE `5` IS AN ENUMERATION CLAIM OF THIS NOTE'S OWN COUNT, NOT A HARNESS-ASSERTED FIGURE.** What the landed harness pins is **THE SET** (the four named bodies), **THE DISTINCT COUNT** (`4`) and **the `'function'` PAIR** (the `2` uses in `tokensFor` and `orientationFor`); the TOTAL OCCURRENCE COUNT (`1 + 1 + 2 + 1 = 5`) is this amendment's enumeration over the landed module, and **NO ROW ASSERTS IT** — the row that WOULD pin it is `§3.4 R-7` (whose allowed set is the four BODIES, an occurrence-blind form), so a later pass that wants the `5` asserted owes `R-7` an occurrence-count limb rather than quoting this note as its evidence. **NO TERM, ROW ID, STRATEGY ID, SEED OR CAP MOVES.**)* **THE THREE EXPORT NAMES (`tokensFor`, `orientationFor`, `containerDeclarationFor`) AND THE THREE TYPE NAMES (`AxisResolver`, `ChromeTokenFn`, `ContainerDeclaration`) ARE IDENTIFIERS, NEVER LITERALS** — **that half of the as-filed sentence was RIGHT, and it is the half the *"count is TWO"* reading collapsed into, which is how one item came to state two different numbers.** **⟶ `R-7`'s ALLOWED SET IS EXTENDED TO THE FOUR NAMED BODIES** — the pinned text · `''` · `'function'` · `'string'` — **and `§3.4 R-7`'s as-filed `EXACTLY TWO` sentence stays visible with this correction beside it.** **THE ROW'S CATCH IS UNCHANGED IN SUBSTANCE AND RE-CHECKED: a THIRD body — a second CSS-shaped literal, a selector spelling, a taxonomy member name, a unit string — FAILS; a SPELLING VARIANT of the pinned text FAILS; a fragment-ASSEMBLED declaration FAILS in its assembly form or is caught by `R-8`'s assembly control once joined (note 7.4 item 1, unmoved); and a module carrying EXACTLY the four declared bodies PASSES.** **`§2.3` item 5's *"EXACTLY FOUR"* was therefore RIGHT IN COUNT AND WRONG IN ITS NAMED LIST — it named the export/type identifiers as literals and omitted the two `typeof` tags — and *"the count is TWO"* was WRONG.** **THE COUNT OF TWO IS NOT RESTORED, AND THE IMPLEMENTER IS NOT ASKED TO CHANGE A MODULE BYTE:** `'function'`/`'string'` are the `typeof` tags `§2.3` item 1's dispatch table itself spells, so the ROW was wrong, not the module.

**8.3 — THE FOUR ROW-BOUND PINS (part C; each is the reading the row MUST assert).** **(a) `X-1` BRANCHES ON THE MODULE'S PRESENCE — the `§3.5 R-8x` form.** **`X-1` as authored asserts only the ABSENCE, so it fails BECAUSE THE WORK WAS DONE.** **⟶ PINNED: `X-1` carries TWO branches and both are the row. THE RED BRANCH (module absent, governing AT RED TIME):** assert `src/shared/container.ts` does **NOT** exist **and** that no unit path other than this test file exists under `src/**`/`tests/**`. **THE GREEN BRANCH (module present, governing AT GREEN TIME, and this is the branch the landed tree executes):** assert **the PAIR's presence** — `src/shared/container.ts` **EXISTS** and `tests/container.test.ts` **EXISTS** — **and the EXPORT CENSUS BY NAME** (`§2.1` item 1: the three value exports `tokensFor`, `orientationFor`, `containerDeclarationFor` **by name**, and the type half left to `§5.2` leg 5, which is the only leg that can read an erased name — `§3.4 R-5`). **The row MUST BRANCH ON PRESENCE rather than assert the red form unconditionally.** **(b) `F-12` / `P-CT-IM-6` ASSERT FRESHNESS ACROSS RECORDS, NEVER AGAINST A RECORD ITSELF.** **The as-authored `records.every((r) => !sameRef(r, records[0]))` is a SELF-COMPARISON at index `0` — false for `r === records[0]` — so NO fresh-record implementation can satisfy it, and it is the one defect class in two rows.** **⟶ PINNED READING: DISTINCT IDENTITY ACROSS THE RETURNED RECORDS — every pair of DISTINCT indices among the five returned records is a different object (`!==`), i.e. the assertion is pairwise over `i !== j` and NEVER index against itself — TOGETHER WITH the value half the two rows already state (the two member values byte-equal to the first call's, and the same two-member census).** **`P-CT-IM-6`'s declared-failing half is named with it: a module that caches the record reads the SAME object twice and FAILS, which is the property the row exists to carry.** **(c) `P-CT-SM-1`(a)'s ROTATION DIRECTION IS THE LEFT ROTATION.** **The clause's own claim is ORDER INDEPENDENCE: driving the sequence `['C','A','B']` must reproduce the first order's readings AS THAT ORDER'S OWN ROTATION.** **⟶ PINNED: with `first = drive(['A','B','C'])`, the comparison is `drive(['C','A','B'])` against `rotate(first, -1)` and `drive(['B','C','A'])` against `rotate(first, -2)` — where `rotate(arr, by) = arr.slice(by).concat(arr.slice(0, by))` and the offset is NEGATIVE, which is the LEFT rotation of the ORDER vector.** **The as-authored `drive(['C','A','B'])` against `rotate(first, +1)` is the INVERTED direction and fails a conformant module.** **(d) `REGISTER-STATUS`'s STOP ASSERTION IS NULL IN GREEN.** **⟶ PINNED: THE GREEN FORM asserts `registerState.stoppedAtRow === null` AND `registerState.stoppedFor === null` — no row stopped, because no five consecutive failures occurred — BESIDE the measured `attemptsExecuted` and the declared total.** **THE RED FORM IS KEPT AS A DECLARED BRANCH** (`§3.5 R-8x`'s branching pattern): **in the state where the module is ABSENT the register is EXPECTED to stop at `P-CT-IM-1` after `5` consecutive failures** (measured: that is exactly what the module-absent red did, with its `9` un-run rows reported as FAILURES), **and the row may assert non-null stop state ONLY through a branch conditioned on the module's absence — never unconditionally.** **`§4.2`'s stop-rule paragraph keeps its force: the un-run rows are REPORTED AS FAILURES.**

**8.4 — THE DECLARED-vs-EXECUTED DISCREPANCY IS DISPOSED AS A RE-DERIVATION (`A DECLARED REGISTER TERM IS A DRIVE COUNT`), AND TWO TERMS MOVE (part D).** **THE MEASUREMENT: `attemptsExecuted 150` against `totalDeclared 137`, `broken 2` (`P-CT-IM-6` `1`, `P-CT-SM-1` `1`).** **THE CAUSE, measured: `P-CT-IM-1` executes `48` drives where its declared term is `40`, and `P-CT-IM-3` executes `23` where its term is `17` (`48 + 23 = 71` against `40 + 17 = 57`; `137 + 13 = 150`).** **⟶ THE DECISION: THEY ARE GENUINE DRIVES, NOT ASSERTIONS — the terms are RE-DERIVED.** **THE EVIDENCE, read from the test file's own two rows:** **`P-CT-IM-1`** runs its `40` grid cells **plus `8` further drives** (one `row.run` per chrome shape, after the grid) — **each of the `8` builds its OWN fresh `chrome` value, its OWN fresh recording closure, and asserts its own answer identity, argument identity and count: its own state and its own assertion, i.e. a DRIVE by the ruling's own definition** — so the contract's *"the `8` further drives are ASSERTIONS over the same grid, printed BESIDE the term"* (`§5.5.1`'s cell and `§5.5.3`'s term table) **is the clause that is wrong, exactly as the ruling predicts when an item is counted the other way.** **`P-CT-IM-3`** runs its `7` usable shapes **plus `16` unusable shapes** — **the landed `UNUSABLE_CLASS_NAMES` table is `16` entries (`undefined` · the argument omitted · `null` · `''` · `0` · `-0` · `NaN` · `true` · `false` · a `Symbol` · a `12n` · `{}` · `[]` · a function · a throwing-`toString` object · a throwing-traps `Proxy`), each with its own return-value and write-log assertions** — so the contract's *"`10` unusable argument shapes"* is a **stale SUBSET of the row's own declared class-name domain** (`§2.5` item 3 and `F-7` both enumerate the full `16`), **and the term must follow the domain the contract itself states.** **`P-CT-IM-3`'s write-log positive control is NOT in either figure: the landed harness reports it beside the term, which is the design `§5.5.2` item 9(3) pins — so `§5.5.2` item 9(1)'s parenthetical claiming *"`P-CT-IM-3`'s `17` includes its write-log positive control"* is CORRECTED HERE and kept visible.** **⟶ THE NEW DECLARED TOTAL, printed WITH its terms and its chain:**
**`151` = `48` (`P-CT-IM-1`) + `26` (`P-CT-IM-2`) + `23` (`P-CT-IM-3`) + `10` (`P-CT-IM-4`) + `12` (`P-CT-IM-5`) + `5` (`P-CT-IM-6`) + `3` (`P-CT-SM-1`) + `5` (`P-CT-SM-2`) + `5` (`P-CT-SM-3`) + `14` (`P-CT-TP-1`)** · **chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`** · **subtotals `IM 124` · `SM 13` · `TP 14` = `151`**, **and the movement is `137 + (8 + 6) = 151`** (the two re-derived terms' own excess, `8 + 6 = 14`). **CAPS RE-CHECKED: `151 ≤ 400` (headroom `249`) and the largest row `48 ≤ 100` (`P-CT-IM-1`, headroom `52`) — BOTH HOLD. THE `(bounded)` SET IS UNMOVED AT `5` of `10` (`P-CT-IM-1` · `P-CT-IM-4` · `P-CT-IM-5` · `P-CT-SM-3` · `P-CT-TP-1`). NO row id, strategy id, seed or cap moved.** **⟶ A COINCIDENCE THAT MUST NOT BE READ AS AGREEMENT: the new `151` is NOT the as-filed `154`.** **`154` was a MIS-SUM (`137 + 17`, the `P-CT-IM-3` term counted twice, `§5.5.3`); `151` is the SUM OF THE TEN RE-DERIVED TERMS. The two figures are one `3` apart and unrelated; a pass that reports `151` as *"the as-filed 154"* or that keeps asserting `154` as the declared total is a review finding.** **⟶ EVERY SITE THAT PRINTS THE TOTAL OWES THE NEW FIGURE: `§5.5.1`'s register header and the two moved cells, `§5.5.2` items 3/9, `§5.5.3`, `§5.3` item 11, the `CURRENT STATE` block (items 3/10), `§1` item 8, `§4.2` item 6, `§7` item 9, `§8`'s two arithmetic rows, `§3a`'s `A-14`, and `§5.5`'s own count paragraph.** **⟶ THE RED SET'S REGISTER HARNESS OWES A RE-GRAIN, and it is now a DOUBLE obligation (this note FOLDS IN note 7.3, which stays visible) = the "part D answer" the task's part D requires: (i)** the declared figure it reconciles against is **`151`** (note 7.2's `137` is subsumed as the intermediate amended figure), so the harness's declared-total constant, its `declaredTermSum` assertion, its `terms.join(' + ')` literal and its `REGISTER_TERMS` table's two moved `declared` figures must all move to the numbers above; **(ii)** **the as-filed `154` stays VISIBLE BESIDE them as annotated provenance** (note 7.3's polarity flip is unchanged in form, one total further on); **(iii)** **the as-filed excess assertion `AS_FILED_TOTAL - declaredSum` becomes `154 - 151 = 3`** (it is `17` today, computed against `137`), **and its message must be re-pointed from *"the `P-CT-IM-3` term counted twice"* to *"the superseded mis-sum's own excess, unrelated to the re-derived terms"*; (iv)** the two self-comparison/rotation rows' repairs are `8.3(b)`'s and `8.3(c)`'s. **THE RE-GRAIN IS A SEPARATE TESTWRITER PASS AND IS NOT PERFORMED HERE** — **what it must NOT do: move any row id, any strategy id, the seed `20260927`, either cap, the `(bounded)` set, or any term OTHER than the two re-derived ones.** **AND THE TERM VERDICT, in the ruling's own form: the DISCREPANCY IS NOT LEFT RECORDED — the ten terms were RE-DERIVED (not re-labelled), the total moved `137 → 151`, the moved terms are `P-CT-IM-1` `40 → 48` and `P-CT-IM-3` `17 → 23`, and the `2` `broken` rows are TEST-side repairs owed to the same pass (`8.3(b)`/`8.3(c)`), never register-term business.**

**8.5 — WHAT IS WORSE THAN REPORTED (stated rather than smoothed).** **(1) THE `R-1`(c)-vs-`R-3`/`R-10` SPLIT IS NOT WHAT IT LOOKED LIKE:** the `contain:` token is `R-1`(c)'s and there is no `R-1`(c)-specific exemption list beyond `R1_EXEMPT`, so the subtraction is owed at `R-1`(c) as well, **and `M-10`(c)'s two `style` readings are the same defect seen at a second row** — `8.1`'s recipe covers all four sites deliberately. **(2) `P-CT-IM-3`'s over-execution was NOT on the Implementer's defect list:** the `150`-against-`137` gap was reported as a MEASUREMENT rather than as a defect in a DECLARED TERM, so **a row that was `6` drives wrong was invisible to the stop report; part D is what makes it visible.** **(3) THE `§2.3` ITEM 5 INCONSISTENCY HAD A THIRD READING THIS AMENDMENT REJECTS:** it was satisfiable by rewriting the MODULE to spell its `typeof` checks without the two tag literals — **rejected, because `§2.3` item 1's dispatch table is normative and spells them, and because a census amendment must never be discharged by changing the artifact it measures.** **(4) `§4.2` item 6 still prints the pre-amendment `154` as *"the figure a red run must NOT report as fully executed"*** — kept visible under its annotation, **superseded here by `151`, with `137` and `154` both readable as provenance.**
**⟶ CLOSED 2026-09-27 (gate 4, `§3b`'s `ADV-CT-4`): THE SWEEP THIS ITEM NAMED HAS NOW RUN — `§4.2` item 6's
own amendment line (`§5.5.3`'s `151` form) is the current one, as this item predicted, and the pre-amendment
`154` remains VISIBLE beneath it. THE ONE SITE THE SWEEP COULD NOT REACH ITSELF is the TEST-FILE HEADER
COMMENT BLOCK, which still prints `137` as *"the DECLARED TOTAL this harness asserts"*: it is
`OWED — TEST-SIDE` (`§0B` note 9.6, `§3b`'s task list), because this pass holds no test-file tool.**

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no Electron
window booted, no `tsc` invocation was made, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/container.ts` module | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned), **plus the landed extension channel of `U-DIVERGENCE-EXT` (`C2`, `DONE`)** | **nothing this unit's contract needs to observe**; **this spec claims no `[D]` row** (`§5.2`) |

**Six honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this
   repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No window is
   booted, no IPC round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a document**:
   the only arguments are **a caller value, a caller closure and a caller string**. **A `[T]` green here
   proves THREE PURE FUNCTIONS' RETURN VALUES, ONE CALLER CLOSURE'S INVOCATION COUNT, AND NOTHING ELSE.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no
   `globalThis`-rooted lookup, no `matchMedia`, no `getComputedStyle`, no `getBoundingClientRect`, no
   `activeElement`, no layout member, no `Date`, no `Math.random`, no `process.env`. **Every value is an
   argument.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its
   rows are authored in **this unit's own test file** and executed by the **same node suite**
   (`npm test`, `§5.2` leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and
   **no register row may be read as `[H]`, `[U]`, `[D]` or assembled-app evidence.**
5. **A returned-text green is NOT an applied-style green.** Byte-equality of a returned string is **never**
   a fact about a stylesheet, a computed style, a layout pass, a paint, a containment boundary, a browser's
   acceptance of a declaration, a rendered class, or a `:has()` rule matching — **none of which this unit
   produces, applies, loads or reads** (`§5.2`).
6. **The two returned values are RETURNED, and RETURNED IS NOT WRITTEN.** No row of this unit may read a
   returned class name as evidence that a class exists on an element anywhere.

---

## 1. Scope

**One deliverable: one `src/shared/` module — a PURE, TOTAL, STATELESS mechanism of three functions: a
token selector, an orientation normalizer, and the one shipped declaration returned as text with the
caller's class name beside it** — with **both mappings injected**, **the taxonomy caller-side and in no
module byte**, **no coordinate and no geometry read**, and **no write of any kind**.

1. **What the unit is, in one sentence.** A **node-local, policy-free-by-construction mechanism** that
   (a) **selects** the caller's token answer for a caller-supplied `chrome` record by calling the
   caller's own `tokenFn` **exactly once** and handing its answer on **unchanged**; (b) **normalizes**
   a caller-supplied `edge` value to the caller's own orientation value by calling the caller's own
   `axisResolver` **exactly once** and handing its answer on **unchanged**; and (c) **returns** the one
   shipped declaration text (`contain: layout style paint`) **beside the caller-supplied class name**,
   **applying nothing**. **No factory, no options object, no session, no state** (`§2.5`).
2. **What the unit is NOT — NO TOKEN PRODUCTION, NO TOKEN FORMATTING, AND NO SECOND AUTHORITY.** The
   module is a **PURE SELECTOR**, **not a producer and not a formatter** (the gate-1 record's `§9.4.2`,
   `AU-1`). It computes **no token, no size, no unit, no `-0` rule, no empty-token limb and no malformed
   limb**: `U-ZONES` owns the value-formatting rule (`zones.md` `§2.4`) and `U-CENSUS` owns the record
   build, and **a second copy of either is a FINDING** (`census.md` `§1` item 3 — *"size formatting, the
   empty-token limb, the malformed-spec limb, the `-0` rule, the `Map`/record census semantics or the
   dispatch precedence"*). **The module's whole arithmetic is ZERO ARITHMETIC OPERATIONS.**
3. **What the unit is NOT — NO EMPTINESS, REVEAL OR MINIMIZATION DECISION.** `U-ZONES` owns emptiness
   (`isEmpty(census, zoneId)`, `zones.md` `§2.3`); `U-CENSUS` **may not compensate** for it (`census.md`
   `§0A` ruling note 3: *"this unit must not compensate … a second authority over emptiness, the `V-13`
   class ruling 3 closes"*); and `census.md` `§0A` ruling note 12 limits the record to **existence, not
   display** — *"iterating the record's KEYS and reading the record's VALUES are therefore two different
   questions — existence and display — and only the first is answered by this contract."* **This module
   answers NEITHER question: it answers *what did the caller's own `tokenFn` return*.** **The `B-3`
   working default is `§2.3` item 3.**
4. **What the unit is NOT — no UI element, no class taxonomy, no styling applied.** Per
   `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test the module authors **no text, no control, no affordance, no
   class taxonomy, no slot content and no styling**; **the mirror-class taxonomy it *serves* is the
   CALLER's and appears in NO module byte** (`A-d4`'s injection answer to `CONSUMER-VOCABULARY`), and
   **the one declaration it owns is an unparsed STRING it RETURNS** (`E5-B-1`). **NO `:has()` RULE, NO
   SELECTOR SPELLING AND NO STYLESHEET IS NAMED, RETURNED, DOCUMENTED OR EXEMPLIFIED HERE.**
5. **What the unit is NOT — no coordinate, no geometry, no element.** There is **no parameter through
   which an event object, a coordinate, a bounding rect, a computed style or an ELEMENT could arrive**
   (`E5-B-2`; `§3.4 R-6`). **The geometry the family produces is UNPROVABLE in this repo today (the node
   layer asserts contracts/arithmetic only)** — that clause is mandatory wherever geometry is described
   and it fences `§2.5` item 2, `§3.3 I-8` and `§3.4 R-6`.
6. **What is EXPLICITLY OUT of scope (do not do in this unit).** No renderer wiring and no demo envelope
   (`§5.1`'s DENIED set — this is the `G-1` discharge test's own falsifier); **no import of any sibling
   module, not even type-only** (`§2.1` item 3); no stylesheet, no rule, no CSS file, no CSS custom
   property, no `:has()` rule and no selector; no store, no persistence, no journal, no cache, no
   module-level mutable state; no new MCP surface, no IPC method, no `RpcMethod` member, no tool and no
   resource; no divergence-harness work and **no `[D]` row**; **no `docs/skills/designing-pages.md`
   update — that file DOES NOT EXIST** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone),
   so there is **no test-use-case coverage matrix, no demo-page index and no page-design layer to
   update** — and **this unit renders no page** (`§3.4 R-9` is the probe that keeps that claim
   falsifiable).
7. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec +
   its `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new
   `src/shared/` module and touches **no existing file** except this spec and the trackers (`§5.1`).
8. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY.** **The unit ships no feature and has NO
   IN-TREE CONSUMER**: `src/shared/container.ts` will be **imported by no `src/**` file** and will appear
   in **none of the built bundles**. **Its value is the contract itself, and for a fork it is exactly
   three things:** the **selector discipline** (one call, answer unchanged, no shape gate), the
   **normalizer discipline** (one call, answer unchanged, no vocabulary), and the **shipped declaration
   text** with its caller-supplied class name — **the fork applies both, because this repo does not.**
   **The honest cost**: this spec + a **`10`-row / `10`-term / `151`-attempt** register + red/green
   **with remands** + the adversarial pass + blind greens + the per-unit documentation review + a DONE
   row + per-gate commits (`RCA-8(f)`). **⟶ THE `151` IS THE DECLARED TOTAL (`§0A` note 8.4, gate 4's
   `ADV-CT-4` sweep); AS FILED this item read *"`10`-row / `10`-term / `137`-attempt"* and the `137` is
   SUPERSEDED, kept visible HERE.** **⟶ THE `137` WAS THE NOTE-7.2 AMENDED DECLARED TOTAL (2026-09-27);
   the as-filed form was `154` and is kept visible at `§5.5.3`.** **⟶ AND THE DECLARED TOTAL IS `151`, with TWO RE-DERIVED TERMS (`§0A` note 8.4, 2026-09-27, after the module landed at `91311ac`): `10` rows / `10` terms / `151` attempts = `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14`; `137` and `154` remain readable as the intermediate and as-filed forms, and `151` is NOT the as-filed `154`.**

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/container.ts`** (`§0A` note 4). **It imports NOTHING** (`§2.1` item 3).

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: SIX exported names, in TWO
HALVES — THREE value exports and THREE type declarations.** **The two halves are counted separately on
purpose** (the family's census rule: `gutter-ui.md` `§R.3` `R-SEAMS`; `gsession.md` `§2.1`'s own
two-halves census), because sibling reviews have caught a census cell contradicting the block beside it,
and because **a type declaration is erased at runtime** — so a single *"6 exports"* claim would be
**half-unfalsifiable**. **A row asserting only a COUNT without NAMING the names FAILS `R-5`'s own text**
(`§4.4 S-CT-8`).

1. **THE THREE RUNTIME VALUE EXPORTS — exactly `tokensFor`, `orientationFor` and
   `containerDeclarationFor`** (`§3.4 R-5`(a) reads the imported namespace's own keys **by name**, with a
   positive control that a namespace carrying a **fourth** value export FAILS). **THE THREE TYPE
   DECLARATIONS — exactly `AxisResolver`, `ChromeTokenFn` and `ContainerDeclaration`** (`§3.4 R-5`(b): a
   type-only name is **erased at run time**, so the type half is a **PRESENCE** claim pinned by
   **`§5.2` leg 5's standalone strict `tsc`**; **the two seam types are COUNTED IN THIS HALF on purpose**,
   per ruling 6, so a fork can import the shape it must implement). **`3 + 3 = 6`.**

2. **THE THREE FUNCTIONS, IN FULL, WITH THEIR RETURN SHAPES, THEIR DECLARED DEGRADATIONS AND THEIR
   ERROR PATTERNS.** **THE ERROR PATTERN IS THE CONTRACT AND IT IS UNIFORM: NONE OF THE THREE EVER
   THROWS, FOR ANY ARGUMENT, AND NONE HAS A REFUSAL DOMAIN.** There is **no `ok`, no `code`, no `reason`,
   no `thrown` and no sentinel in this contract**: an unusable argument produces **the declared EMPTY
   answer as a VALUE**.

```ts
/** THE SHIPPED DECLARATION, AS RETURNED TEXT — module-owned, OPAQUE, NEVER PARSED.
 *  `contain: layout style paint` is a STRING CONSTANT this module owns and RETURNS;
 *  the module reads NO BYTE of it for any decision (no parse, no split, no property
 *  read, no rule object, no `:`/`;` scan) and NEVER APPLIES IT
 *  (`docs/decisions.md` `E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`:
 *  the unit performs NO write of any kind; the CONSUMER applies the text).
 *  ITS PROOF IS BYTE-IDENTITY with the pinned constant (`§3.4 R-8`,
 *  `§5.5.1 P-CT-IM-4`), never a computed style, never a layout fact. */

/** THE CALLER'S TOKEN MAPPING — the FIRST of the module's two contract edges.
 *  REQUIRED. Called EXACTLY ONCE per `tokensFor` invocation, with the chrome value
 *  the caller itself supplied; the answer is handed on UNCHANGED — never coerced,
 *  never merged, never re-keyed, never defaulted.
 *  DECLARED DEGRADATION: absent / non-callable / throwing => the declared EMPTY
 *  answer `undefined`, and the throw is ABSORBED — never a throw, never a mechanism
 *  default, never a silent no-op (`§2.4` item 1). */
export type ChromeTokenFn = (chrome: unknown) => unknown

/** THE CALLER'S AXIS MAPPING — the SECOND contract edge, and the third name for a
 *  seam the family already names twice (`gutter-ui.md` `§R.3`'s `axisOf`, `E3`'s
 *  `axisFor`). SHAPE-IDENTICAL to the landed `AxisOf` (`(element: unknown) => unknown`)
 *  — a NAME/SHAPE relation, NEVER an import edge (`§2.2` `P-CT-11`, `§2.2` item 3).
 *  REQUIRED. Called EXACTLY ONCE per `orientationFor` invocation, with the edge value
 *  the caller itself supplied; the answer is handed on UNCHANGED.
 *  DECLARED DEGRADATION: absent / non-callable / throwing => the declared EMPTY
 *  answer `undefined`, and the throw is ABSORBED (`§2.4` item 2).
 *  THE ONE-CLOSURE RULE (`§2.2` item 3): a fork wires its SINGLE `axisOf` here too,
 *  so two axis readings cannot disagree. */
export type AxisResolver = (edge: unknown) => unknown

/** WHAT `containerDeclarationFor` RETURNS — TWO members, in THIS declaration order,
 *  and no third (`§0A` note 5). `className` is the caller's string, returned
 *  VERBATIM; `declaration` is the pinned text, byte-identical. */
export interface ContainerDeclaration {
  readonly className: string
  readonly declaration: string
}

/** THE TOKEN SELECTOR — PURE, TOTAL, STATELESS.
 *  Selects the caller's own token answer for the `chrome` value it is handed by
 *  calling `tokenFn` AT MOST ONCE (`§2.5` item 5, `§5.5.1 P-CT-SM-2`).
 *  It is NOT a producer and NOT a formatter (`§1` items 2/3): it builds no record,
 *  merges nothing, coerces nothing, stringifies nothing and does not inspect
 *  `chrome` beyond its own-key/`Map`-key discipline (`§2.5` item 1).
 *  DECLARED SHAPES:
 *    - `tokenFn` callable: `tokenFn(chrome)` is invoked EXACTLY ONCE and its answer
 *      is the return value, BY IDENTITY — for EVERY `chrome` value, including
 *      `null`, `undefined`, a primitive, a `Symbol`, a `BigInt`, a hostile `Proxy`
 *      and a `Map`. THERE IS NO SHAPE GATE ON `chrome`.
 *    - `tokenFn` absent / non-callable / throwing: `undefined` (the declared EMPTY
 *      answer), and NOTHING THROWS (`§2.4` item 1).
 *  NEVER THROWS. The module writes nothing and reads no ambient global. */
export function tokensFor(chrome: unknown, tokenFn: unknown): unknown

/** THE ORIENTATION NORMALIZER — PURE, TOTAL, STATELESS, and it computes NO
 *  orientation of its own: it normalizes the caller's edge value to the caller's
 *  OWN orientation value by calling `axisResolver` (`§2.5` item 5,
 *  `§5.5.1 P-CT-SM-3`). `edge` is an OPAQUE CALLER VALUE — UNINTERPRETED
 *  (`docs/decisions.md` `E5-B-2-...`); no coordinate, no geometry and no element
 *  can arrive through any parameter, and the output is the caller's own opaque value
 *  (`§2.5` item 2).
 *  DECLARED SHAPES:
 *    - `axisResolver` callable: `axisResolver(edge)` is invoked EXACTLY ONCE and its
 *      answer is the return value, BY IDENTITY — for EVERY `edge` value.
 *    - `axisResolver` absent / non-callable / throwing: `undefined` (the declared
 *      EMPTY answer), and NOTHING THROWS (`§2.4` item 2).
 *    - IDEMPOTENT: two invocations with the same pair produce the SAME return value
 *      (`===` for primitives and for the same object identity) — the module retains
 *      nothing between calls (`§5.5.1 P-CT-SM-1`).
 *  NEVER THROWS. */
export function orientationFor(edge: unknown, axisResolver: unknown): unknown

/** THE DECLARATION RETURNER — PURE, TOTAL, STATELESS, and it WRITES NOTHING
 *  (`docs/decisions.md` `E5-B-1-...`: "the unit performs NO WRITE OF ANY KIND —
 *  no `classList`, no `className`, no `style`, no `setAttribute`").
 *  Returns `{ className, declaration }` (`ContainerDeclaration`):
 *    - CLASS-NAME DOMAIN, declared exactly (`§2.5` item 3): `className` is returned
 *      VERBATIM BY IDENTITY IFF it is a STRING of length >= 1; ANY OTHER VALUE
 *      (`undefined`, `null`, `''`, a number, a boolean, a `Symbol`, a `BigInt`, an
 *      object, an array, a function, a `Proxy`, an object whose `toString` throws)
 *      yields the declared EMPTY answer `''` for the `className` member;
 *    - `declaration` is ALWAYS the pinned constant, EXACTLY
 *      `'contain: layout style paint'` (27 characters), returned by a constant
 *      reference and NEVER parsed;
 *    - MEMBER CENSUS: exactly TWO own enumerable keys, in the declaration order
 *      above, no third member, no getter and no prototype member (`§5.5.1
 *      P-CT-IM-5`);
 *    - REPEATED CALLS RETURN EQUAL VALUES WITH THE SAME MEMBER CENSUS, and the
 *      returned record is a FRESH record each call (no cache, no retention:
 *      `§5.5.1 P-CT-IM-6`).
 *  NEVER THROWS. It receives NO element and NO class-name-to-element write route
 *  exists anywhere in this module's surface. */
export function containerDeclarationFor(className: unknown): ContainerDeclaration
```

3. **THE IMPORT CENSUS: NONE — NOT ONE STATEMENT, NOT EVEN TYPE-ONLY.** **`§3.4 R-4` is the row that
   pins it, and `R-4`'s positive control is that a SINGLE import of ANY path FAILS it.** **Why it is
   EMPTY rather than one type-only line, stated because the sibling `E4` needed exactly one:**
   **(a)** the module **receives no session, no element and no sibling value** — its whole surface is
   **a caller value, a caller closure and a caller string** (`§2.1` item 2); **(b)** its one
   **name relationship** (`AxisResolver` ↔ the landed `AxisOf`) is **a SHAPE relation and NOT an import
   edge** — importing `AxisOf` from `gutter-affordance.js` would create **exactly the fabricated edge
   `§2.2` item 3 forbids**, and re-declaring the shape locally is the reading that keeps the edge
   non-existent; **(c)** the gate-1 record's `C-9` discharge is **precisely this**: *"no factory, no
   options object, no session, and the own-seam set EMPTY, so there is NO EDGE TO DECLARE and none is
   fabricated"* (`container-review.md` `§9.4.1`). **A later pass asserting an import edge in EITHER
   direction is a `S-CT-11` STOP** (`§4.4`).

### 2.2 What is CALLER-SUPPLIED, the prohibitions, the `axisResolver` reconciliation, and the
reconciliation table — the three unit-specific filing items of `container-review.md` `§9.4.7`

**Caller-supplied (never built in, never defaulted, never enumerated):** the `chrome` record and every
member of it; the token answer (`tokenFn`); the `edge` value; the orientation answer (`axisResolver`);
the class name; and **every vocabulary the caller's own mapping carries** — the mirror-class taxonomy's
member names included. **THE MODULE CONTAINS NO CONSUMER VOCABULARY, NO TAXONOMY LITERAL, NO SELECTOR, NO
UNIT STRING, NO CSS TOKEN, NO DEFAULT TOKEN, NO DEFAULT CLASS, NO DEFAULT EDGE, NO EMPTY/REVEAL/
MINIMIZATION DECISION, NO ARITHMETIC AND NO WRITE.**

**(A) THE `H-r8` `§0 Contract-prohibitions` SIX-ROW TABLE — one row per prohibition, each row NAMING the
test that pins it** (`H-r4`/`H-r8`; the sibling form is `zones.md` `§2.2` and `census.md` `§2.2`).

| # | Prohibition (`S-d8`/`H-r8`, clause `(C)`) | How THIS unit satisfies it | Pinned by (the test that pins it) |
| --- | --- | --- | --- |
| **`P-CT-1`** | **No consumer vocabulary** as a symbol, closed string-union member, default or documented constant — **including the mirror-class taxonomy `H-r15` names** | **`A-d4`'s injection answer, in its own words** (`docs/pending.md`'s `SCH-10` row): *"no `is-empty`/`is-minimized`/`is-revealed` literal appears anywhere in the mechanism"*. **The module's bytes carry NO pane/zone/tab/region vocabulary, NO `is-*` taxonomy spelling, NO unit string, NO selector spelling and NO CSS token — and EVERY STRING LITERAL THE MODULE OWNS IS DECLARED** (`§2.3` item 5: the declaration, the three export names, the three type names) | **`R-1`** (classes (a)/(b)/(d)) with its **declared exemptions named and both controls**, **`R-7`** (the closed-set literal row), `§5.5.1 P-CT-IM-1` |
| **`P-CT-2`** | **No app UI content** — no literal text, control, affordance, styling, or element the mechanism populates (`S-d8` `(C)#2`) | The module **authors no element, no text, no class, no attribute, no cursor and no stylesheet**: it **RETURNS** three values. **The one declaration it owns is a STRING it returns and never applies** (`E5-B-1`); **the class name is the CALLER's and is returned verbatim, never written**. `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s test is satisfied **because the module is not a UI element** | **`R-8`** (the byte-identity and no-write row), **`R-10`** (the no-write scan pair), `§5.5.1 P-CT-IM-3`/`P-CT-IM-4`, `§3.3 I-7` |
| **`P-CT-3`** | **No policy defaults** — no decision the consumer owns, baked in as the mechanism's default (`S-d8` `(C)#3`) | **Every value is caller-supplied.** The **only** degenerate value the module owns is **the ABSENCE of a value it would otherwise have to fabricate**: `undefined` for an unusable `tokenFn`/`axisResolver`, and `''` for an unusable class name — **each DECLARED, each a VALUE, none a policy**. There is **no default token, no default class, no default edge, no fallback vocabulary, no epsilon, no sentinel and no `try`-and-guess** | **`R-1`** (the absence discipline), **`R-7`**, `§2.4` items 1/2/3 (each degradation a row that can FAIL), `§5.5.1 P-CT-IM-1`/`P-CT-TP-1` |
| **`P-CT-4`** | **No UI-config store and no persistence** — no store of its own, no file, no `localStorage` (`S-d8` `(C)#4`; `S-d4`) | **ZERO module-level state**: no store, no cache, no registry, no memo, no counter, no `Map`/`WeakMap` of its own, no persistence, no module-level mutable binding. **Every call is a pure function of its arguments** | **`R-2`**, `§3.3 I-4`, `§5.5.1 P-CT-SM-1` clause (c) |
| **`P-CT-5`** | **No new MCP surface** — no tool, resource, group, `VALID_GROUPS` member, renderer RPC method or `MUTATING_METHODS` entry (`S-d8` `(C)#5`) — **a NON-GOAL ROW, never a licence** (`PROHIBITION-5-IS-AN-ADOPTION-BOUND`) | This module is **imported by no `src/**` file** and registers nothing: the pinned sets keep **exactly the names they carry today** (`ALL_TOOLS` / `RpcMethod` / `VALID_GROUPS` / `MUTATING_METHODS` — asserted **BY NAME as SET equality, never by a number quoted here**, per `§4.4 S-CT-8`). **The module's contract REQUIRES no tool** | **`R-2`** (the file-set row), **`R-3`** (the diff-scope row), `§3.3 I-13` |
| **`P-CT-6`** | **No unverifiable criterion** — nothing whose falsification needs a layer this repo does not own, and **no shim expansion** (`S-d8` `(C)#6`; `H-r5`) | **Every row in this file is `[T]`** — three pure functions over arguments — **EXCEPT the applied-containment behaviour, which this spec REFUSES in the family's fixed three-part form rather than promising** (`§5.2`; `H-r8` (C)#6 is satisfied **by a refusal that names the criterion and states why no instrument reads it**, not by a parked proof — `container-review.md` `§9.4.6`). `src/shared/dom-shim.ts` **gains no member** (`SHIM-COMPLETION-CARVE-OUT`) | **`R-6`** (the geometry/no-reach row), **`R-9`** (the page-design probe), `§5.2`, `§3.3 I-8` |

**(B) THE PROHIBITION TABLE'S FURTHER ROWS — the module's own derived prohibitions, each with an
enumerated static row** (`§3.4`; **a prohibition citing *"a static source row"* with no id is not a
row**).

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **`P-CT-7`** | **No DOM read and no element reach** (`A-d3`'s node-local discipline; `E3`'s `P-2` class) | **No `document`/`window`/`globalThis`-rooted access, no `closest`/`querySelector*`/`getElementById`/`createElement` token in ANY form, no element parameter anywhere** | **`R-2`**, **`R-6`**, `§3.3 I-6` |
| **`P-CT-8`** | **No write of any kind** — **no `classList`, no `className` WRITE, no `style`, no `setAttribute`, no `innerHTML`, no `textContent`, no `appendChild`, no element creation** | **The module returns values and writes nothing.** **The `className` MEMBER it RETURNS is a value, never a write site** (`§2.3` item 6) | **`R-10`** (the no-write scan pair), `§3.1 M-11`, `§5.5.1 P-CT-IM-3` |
| **`P-CT-9`** | **No selector spelling, no stylesheet, no rule, no CSS file** — and **the consumer's `:has()`/selector half is not named, returned, documented or exemplified here** (the `A-d4` reshape: *"consumer selectors and `:has()` rules stay consumer-side"*) | The module carries **no `:has(`, no `[data-`, no `selectors`, no `querySelector*`, no rule text and no CSS custom property**; **the one CSS-shaped literal it owns is the pinned declaration text, returned unparsed** | **`R-1`** (classes (b)/(d)), **`R-7`**, `§1` item 4 |
| **`P-CT-10`** | **No parsed declaration and no second CSS literal** — the shipped text exists as **ONE** unparsed constant | `§2.3` item 5 (the **closed-set literal claim with both controls**) and **`R-7`**: a SECOND `contain:`-shaped literal, a spelling variant of the pinned text, a `':'`/`';'`-split of it, or any property/rule object derived from it **FAILS** | **`R-7`**, **`R-8`**, `§5.5.1 P-CT-IM-4` |
| **`P-CT-11`** | **No sibling import, no fabricated edge, and no second axis authority** | **ZERO import statements** (`§2.1` item 3); **the `axisResolver`↔`axisOf`/`axisFor` relationship is a NAME/shape relation, NEVER an import edge** (`zones.md` `§1` item 7 / `census.md` `§1` item 7: *"a dependency edge asserted the other way would be a **fabricated edge**"*); **and the one-closure rule makes TWO readings of one element impossible** (`§2.2` item 3) | **`R-4`**, **`R-12`**, `§3.3 I-9`/`I-10` |
| **`P-CT-12`** | **No second token authority and no second emptiness authority** (`AU-1`/`AU-2`; `zones.md` `§1` item 6; `census.md` `§1` item 2/3, `§0A` ruling note 3) | **No formatting, no `String(size)`, no unit join, no `emptyToken` limb, no malformed limb, no `-0` rule, no census semantics, no dispatch precedence — and NO emptiness decision.** The module **produces no token at all**; it hands the caller's own answer on | **`R-1`** (the census/format token classes), **`R-13`** (the no-duplication row), `§5.5.1 P-CT-IM-2` |
| **`P-CT-13`** | **THE `B-3` WORKING DEFAULT: the caller's mapping carries NO `empty`/`is-empty`/`is-minimized`/`is-revealed` member deciding emptiness/reveal/minimization, unless `U-CENSUS`/`U-ZONES` supply the value** (`§0A` note 3 — **a WORKING DEFAULT, architect-reversible**) | The module reads **no member of `chrome` for any decision**: **the returned value is the caller's own `tokenFn` answer, unaffected by any member the record carries** — so the default holds under BOTH `B-3` readings and the module grows **no member-name ban of its own** | **`R-13`**, `§5.5.1 P-CT-IM-2`, `§7a.1` item 1 |

**(C) THE `axisResolver` ↔ `LANDED AxisOf` RECONCILIATION, AND THE ONE-CLOSURE RULE** — **filing item
`(c)` of `container-review.md` `§9.4.7`, and condition `C-9`'s discharge.** **THE THIRD NAME IS A REAL
COLLISION AND IT IS RECONCILED, NOT LEFT OPEN.** The family has **already named this seam twice**:
**`U-GUTTER`'s `axisFor`** (`docs/pending.md`'s family row: `createResizeController({session, axisFor, …})`;
landed as `AxisFor` in `src/shared/gutter.ts`) and **`U-GUTTER-UI`'s `axisOf`**, which is one of the
**ELEVEN public seams** the ACTIVE row `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT` makes
*"a PUBLIC, EXPORTED, DOCUMENTED CONTRACT that downstream consumers (forks) IMPLEMENT"* (`gutter-ui.md`
`§R.3`: `axisOf` = `AxisOf = (element: unknown) => unknown`, **REQUIRED**; **landed as an exported call
signature interface** — `export interface AxisOf { (element: unknown): unknown }`, in the
`src/shared/gutter-affordance.ts` read this pass).

1. **`AxisResolver` IS DECLARED SHAPE-IDENTICAL TO THE LANDED `AxisOf`.** **Same parameter arity (one),
   same parameter shape (`unknown`), same return shape (`unknown`), same REQUIRED status.** **A row that
   asserts the two types are the SAME DECLARED TYPE is a row this unit CANNOT have** — they are
   **separately declared**, and asserting an identity would require the import edge `§2.1` item 3 forbids.
   **What IS assertable, and what this spec pins, is the SHAPE: `R-5`(b) asserts `AxisResolver`'s
   presence as an exported type, and `§5.5.1 P-CT-SM-3` drives a resolver whose *declared* shape is exactly
   `(edge: unknown) => unknown`.**
2. **THE RELATIONSHIP IS A NAME/SHAPE RELATION — NEVER AN IMPORT EDGE.** Stated in `P-CT-11` and pinned by
   **`R-4`**: **importing `AxisOf` (or `AxisFor`, or anything else) to spell this type is a FABRICATED
   EDGE and FAILS `R-4` by construction.** A fork that wants one type file can import both from its own
   project; **this repo asserts only that the two shapes agree.**
3. **THE ONE-CLOSURE RULE, CARRIED FROM `gutter-ui.md` `§7a.1` item 1 AND PINNED HERE.** *"The caller
   wires `axisOf` into **both** `E3`'s `axisFor` and the hover read from **ONE closure**, so the two cannot
   disagree."* **RULED FOR THIS UNIT: a fork that maps panes/zones through BOTH `U-CONTAINER` and
   `U-GUTTER`/`U-GUTTER-UI` wires the SAME resolved axis answer into `axisResolver` — i.e. its single
   closure — and `axisFor` stays `E3`'s opaque seam.** **THE OBSERVABLE CONSEQUENCE, and it is the reason
   the rule is contract rather than advice: the same edge value must produce the SAME orientation through
   this module as the axis the fork's own resolver returns elsewhere — `§5.5.1 P-CT-SM-3`'s idempotence
   drive is the falsifiable half, and a second, differently-closured resolver is the shape that FAILS it
   by producing a different answer for the same input.**

**(D) THE RECONCILIATION TABLE — `C-3`'s discharge, in the RCA's own form: *"banned in layer X for reason
Y, legitimate in layer Z because …"*, each ban site QUOTED WITH ITS SCOPE, and the module's scan row
NAMING its exemptions.** **This table RE-MEASURES each ban site against the tree in THIS filing pass** (the
gate-1 record's `F-3` requires it, and the counts below are this filing's own read-tool searches, attributed
as such — **this pass holds no shell: every figure here is a read-tool count, not a shell count**).

| # | The ban (site, quoted) | What it guards (its scope) | Why it does not bind `U-CONTAINER` — the reconciliation |
| --- | --- | --- | --- |
| **1** | **`zones.md` `§1` item 3 / `§7` item 3** — *"**What it is NOT — no CSS is shipped, in any form** … it ships **no stylesheet, no rule, no declaration, no class name and no literal**"*; and **`census.md` `§1` item 5 / `§7` item 3** — *"**No stylesheet, no declaration, no class name, no rule, no token literal**"*, with the family sentence *"**no CSS is shipped by the family either**"* (and `census.md` `§0A` ruling note 11) | **THE LAYER IS "APPLIED STYLING".** The bans guard **a shipped stylesheet/rule/applied declaration** — an artifact that must be *loaded* to be *observed* — and each sibling's own unit is a token/record builder with no CSS artifact at all | **BANNED IN LAYER `zones.md`/`census.md` FOR REASON "an applied stylesheet is a UI artifact the node layer cannot observe".** **LEGITIMATE IN `U-CONTAINER`'s LAYER BECAUSE THE RULING `E5-B-1` SPLITS THE ARTIFACT IN TWO AND KEEPS ONLY THE HALF THE BAN CANNOT REACH:** the declaration exists **ONLY as an UNPARSED STRING CONSTANT RETURNED AS TEXT**, its proof is **byte-equality in `[T]`**, and **the module applies nothing, loads nothing, writes nothing and reads nothing back** — so **no stylesheet, no rule and no applied declaration is shipped by this unit either, and the family sentence stays literally true.** **`A-d4`'s *"ONE shipped declaration survives"* is honoured as RETURNED TEXT, not as applied styling** (`container-review.md` `§9.4.6`'s prohibition audit: prohibition 2 **passes IFF `B-1` lands as ruled**, and it did). |
| **2** | **The token bans — `relocate.md` `§3.4 R-1`'s vocabulary list and `gutter-ui.md` `§2.1` item 6's exact negative list** (*"the module's bytes (comments included, token-assembly joined) contain `createElement`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `textContent`, `innerText`, **`className`**, `classList`, `appendChild`, … and every element-creation token in **NO** form"*), and **`relocate.md` `§3.4 R-11`**'s UI-content-write list (*"no occurrence, in any form, of a UI-CONTENT WRITE token: `setAttribute`, `removeAttribute`, `classList`, **`className`**, `textContent`, `innerText`, `innerHTML`, …"*, paired with a runtime write-log assertion) | **THE LAYER IS "A UI-CONTENT WRITE SPELLING IN THE MODULE'S OWN BYTES"**, over the module file **including its comments**, and `R-11` pairs the scan with a **runtime write-log** | **BANNED IN LAYER `relocate.md`/`gutter-ui.md` FOR REASON "these spellings name a WRITE the mechanism must not perform".** **LEGITIMATE IN `U-CONTAINER` BECAUSE THE RULING SPLITS THE TOKEN FROM THE WRITE, AND THIS FILING NAMES THE SPLIT AS A DECLARED EXEMPTION RATHER THAN A NARROWED BAN:** the charter makes the class name **caller-supplied**, and `§0A` note 5 pins the **returned member name** `className`; **the module performs NO WRITE, so the ban's subject (`x.className = …`, `x.classList.…`, `x.setAttribute(…)`) has no site here.** **`§3.4 R-10`'s scan therefore carries `className` as a DECLARED EXEMPT MEMBER NAME and bans the WRITE FORMS WITH BOTH CONTROLS** — a corpus carrying `el.className = c` **FAILS**; a corpus carrying `containerDeclarationFor(className)` **PASSES**. **The ban is not relaxed: `classList`, `setAttribute`, `innerHTML`, `outerHTML`, `appendChild`, `createElement` and every other name on the two landed lists stay BANNED with NO exemption** (`§3.4 R-10`'s list is the union of both landed lists minus `className`). **⟶ AMENDED 2026-09-27 (`§0A` note 8.1): the BLESSED SUBTRACTION named in this cell runs on a QUOTE-PRESERVING JOINED view (comments STRIPPED · concatenation JOINED · quotes PRESERVED) — the as-authored form, applied to a quote-stripped view, removed nothing — and the pinned literal is ALSO exempted BY NAME at `R-1`(c)/`R-3`/`R-10`, with `M-10`(c)'s LOAD-BEARING control (`style` present in the joined view, absent after the subtraction) proving the subtraction is not a no-op. The cell's own sentence above stands as written.** |
| **3** | **The fabricated-edge discipline — `zones.md` `§1` item 7** (*"A dependency asserted later would be a **fabricated edge** (`H-r6`'s dissolved-edge class)"*), **`census.md` `§1` item 7** (*"a dependency edge asserted the other way would be a **fabricated edge**"*), **`census.md` `§3.3`'s `H-r6` dissolved-edge class**, and the ledger's own clause (`docs/next-steps.md`: `E5` *"is not a dependency in either direction"*) | **THE LAYER IS "AN ASSERTED IMPORT/COMPOSITION EDGE BETWEEN UNITS"** | **BANNED IN LAYER `zones.md`/`census.md`/the ledger FOR REASON "an edge that was dissolved must not be re-asserted by a later pass".** **LEGITIMATE HERE AS A *NON*-EDGE, DECLARED EXPLICITLY:** this unit has **ZERO imports** (`§2.1` item 3) and **the `axisResolver`↔`axisOf`/`axisFor` relationship is named as a NAME/shape relation, never an import edge** (`§2.2` item 3). **The one edge-shaped thing in this file is an EXPLICIT DENIAL of an edge, which is the form the discipline requires** — `§3.4 R-4`/`R-12` are the rows, and `§8`'s index carries the boundary row. |
| **4** | **The one-authority rules — `zones.md` `§1` item 6** (*"one authority over tokens, not two — ruling 4; validity finding `V-13`'s anti-second-authority remedy"*), **`census.md` `§1` item 2** (*"the emptiness decision has no other admissible source"*) and **`§1` item 3** (a second copy of *"size formatting, the empty-token limb, the malformed-spec limb, the `-0` rule, the `Map`/record census semantics or the dispatch precedence"* is a **FINDING**), **`census.md` `§0A` ruling note 3** (`V-13`) and **ruling note 12** (existence, **not** display) | **THE LAYER IS "A DECISION A LANDED SIBLING OWNS"** — emptiness, formatting, census semantics, dispatch precedence | **BANNED IN LAYER `zones.md`/`census.md` FOR REASON "a second authority over a decision is the `V-13` class".** **LEGITIMATE IN `U-CONTAINER` BECAUSE IT DECIDES NOTHING:** the module is a **PURE SELECTOR** — **it produces no token, formats nothing, computes no arithmetic and consults no census**; it **returns the caller's own answer**, and **the caller is the same consumer that already supplies the values to `U-ZONES`/`U-CENSUS`.** **The `B-3` working default is the one place this reconciliation has teeth, and it is recorded as a DEFAULT rather than smuggled as a ban** (`§0A` note 3, `P-CT-13`). **The existence-vs-display boundary of ruling note 12 is answered in the contract's own terms: `tokensFor` returns THE CALLER'S OWN ANSWER — it is neither an existence nor a display authority, and no returned value of this unit may be read as a display fact** (`§3.3 I-5`, `§7` item 3). |
| **5** | **The geometry clause — `S-d11`** (`provident-electron-shell-chrome-handoff-review.md` `§3`, quoted): *"the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only) — that clause must appear wherever geometry criteria are described"* | **THE LAYER IS "ANY GEOMETRY CRITERION"** — wherever a spec describes geometry, the unprovability clause must appear | **BANNED-NOWHERE: IT IS A MANDATORY DISCLOSURE RULE, NOT A TOKEN BAN.** **IT IS CARRIED VERBATIM HERE, at `§0A` note 2, `§1` item 5, `§2.5` item 2 and `§3.3 I-8`** — and it fences exactly two places where this unit's charter borders geometry: **the `edge` parameter** (which is an opaque caller value under `E5-B-2`, `relocate.md` `§2.2` `P-1` being the sibling shape) **and the declaration text's own word `layout`** (which is a **substring of an unparsed string constant**, never a layout fact this unit asserts, measures or claims). |
| **6** | **`S-d8`'s admission rule, prohibition (C)#2** — *"(2) **app UI content** — literal text, controls, affordances, **styling**, or any element the mechanism populates with content the consumer did not supply"* — and **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`**'s mechanism test | **THE LAYER IS "APP UI CONTENT A MECHANISM AUTHORS"** | **BANNED IN LAYER `S-d8` FOR REASON "a mechanism that authors content IS a UI element outside the provident graph".** **LEGITIMATE IN `U-CONTAINER` BECAUSE `E5-B-1` RULES THE ARTIFACT OUT OF THAT SUBJECT:** the module **authors no element, no text, no control, no affordance, no class taxonomy and no styling** — **it authors ONE STRING CONSTANT AND RETURNS IT.** The `(A)` reading (**apply it**) is the reading under which this reconciliation **WOULD FAIL**, and it is **recorded as NOT TAKEN** (`§0A` note 1, `§7a.1` item 3). |
| **7** | **`H-r15`'s re-entry scan** (`provident-electron-shell-chrome-handoff-review.md`, quoted): *"`U-SLOTHOST` must not grow per-zone/per-pane semantics or a **mirror-class taxonomy** (`is-empty`/`is-minimized`/`is-revealed`) — that would resurrect `SCH-10`/`SCH-4` under a new name, and its `§0 Contract-prohibitions` table must assert their absence"* — and **`slothost.md` `§2.2` prohibition 1** | **THE LAYER IS "A MIRROR-CLASS TAXONOMY INSIDE A MECHANISM"**, and its reachable scope is **another unit's module** | **BANNED IN LAYER `slothost.md` FOR REASON "`SCH-10`'s taxonomy must not re-enter the repo through a sibling".** **LEGITIMATE IN `U-CONTAINER` ONLY IN THE FORM `A-d4` RULED AND NO OTHER:** the taxonomy is **the CALLER's**, appears in **NO module byte**, and this unit's own `§0 Contract-prohibitions` table **asserts its absence** (`P-CT-1`), with **`§3.4 R-1`** the row that can FAIL. **The residual the gate-1 critique named (`AX-4`/`AU-2`) is carried as the `B-3` working default, not as a second ban** (`§0A` note 3). |

**RE-MEASURED HIT COUNTS FOR THIS TABLE, ATTRIBUTED TO THIS FILING PASS** (the record's `F-3` requires
step 1's counts to be re-measured at filing; **these are read-tool searches over this workspace, and they
are counts of MATCHING LINES, which is a discovery device, not a proof** — the RCA's own caveat, quoted in
the record's `§3`): **`is-empty` / `is-minimized` / `is-revealed` → `27` matching lines across `8` files**
(`docs/decisions.md` · `docs/next-steps.md` · `docs/pending.md` · `docs/specs/container-review.md` ·
`docs/specs/provident-electron-shell-chrome-handoff-review.md` · `docs/specs/slothost.md` ·
`docs/specs/slothost-greens.md` · `tests/slot-host.test.ts`) — **all of them provenance, prohibition,
census-report or control-corpus sites; ZERO in `src/**`** · **`zoneContainerChrome` /
`applyGestureContainment` → `6` matching lines across `3` files** (`docs/pending.md` ·
`docs/specs/container-review.md` · `docs/specs/provident-electron-shell-chrome-handoff-review.md`) — **all
provenance, ZERO outside it** · **`contain:` / `layout style paint` → `19` matching lines across `5` files**
(`docs/decisions.md` · `docs/next-steps.md` · `docs/pending.md` · `docs/specs/container-review.md` ·
`docs/specs/provident-electron-shell-chrome-handoff-review.md`) — **ZERO in `src/**` and ZERO in
`tests/**`** · **`tokensFor` / `tokenFn` / `axisResolver` → present ONLY in the same provenance and
family-doc set plus `docs/FORKER.md`'s unit-digest row (`:249`), ZERO in `src/**` and ZERO in `tests/**`** ·
**`AxisResolver` / `ChromeTokenFn` / `ContainerDeclaration` / `containerDeclarationFor` → ZERO hits
anywhere in the tree before this filing** · **`chrome` (word-boundary) → `138` matching lines in `docs/**`,
`1` in `tests/**` (`tests/gutter-ui.test.ts`, where the word is the SHELL's own chrome in a diff-scope
assertion), ZERO in `src/**`** · **`orientation` (word-boundary) → ZERO in `src/**`** ·
**`axisOf`/`axisFor` in `src/**` → `11` matching lines across `5` files** (`src/renderer/renderer.ts` ·
`src/shared/gutter-affordance.ts` · `src/shared/gutter.ts` · `src/shared/demo-envelope.ts`). **THE
EXEMPTIONS `R-1`/`R-7`/`R-10` NAME ARE STATED IN THEIR OWN CELLS at `§3.4`, and a scan row that does not
name them is VACUOUS** (`§4.4 S-CT-6`).

### 2.3 The value rules — stated falsifiably

**Item 1 — THE SELECTOR'S DISPATCH RULE, in full, evaluated in this order (the order is the contract).**

| Order | Condition (exact) | The return value |
| --- | --- | --- |
| **(a)** | `typeof tokenFn === 'function'` | **`tokenFn(chrome)` — ONE invocation, and its answer is returned BY IDENTITY**, for **every** `chrome` value including `null`, `undefined`, a primitive, a `Symbol`, a `BigInt`, an object, a `Map`, a function and a hostile `Proxy`. **The module coerces nothing, merges nothing, re-keys nothing and reads no member of `chrome` to decide this** |
| **(b)** | otherwise — `tokenFn` is **absent**, `undefined`, `null`, a non-callable primitive (a number, a string, a boolean, a `Symbol`, a `BigInt`), an object, an array, or a function-shaped `Proxy` whose `apply` trap THROWS | **`undefined` — the declared EMPTY answer**; **ZERO invocations**; **NOTHING THROWS**; and **the answer is the SAME for every `chrome` value** (the absence is not a function of the record) |

**Item 2 — THE NORMALIZER'S DISPATCH RULE, the same shape.** **`typeof axisResolver === 'function'` ⇒
`axisResolver(edge)` invoked ONCE and its answer returned BY IDENTITY for EVERY `edge` value; otherwise ⇒
`undefined`**, with **ZERO invocations and NOTHING THROWN** — **including the case where the `axisResolver`
is a callable whose body THROWS: the invocation is ATTEMPTED (count `1`), the throw is ABSORBED, and the
answer is the declared EMPTY `undefined`.** **The module computes no orientation, holds no axis/edge
vocabulary and performs no arithmetic.**

**Item 3 — THE `B-3` WORKING DEFAULT, STATED SO IT IS FALSIFIABLE UNDER EITHER READING.** **The module
consults NO member of `chrome` for any decision, and the returned value is the caller's own answer,
UNCHANGED — so a `chrome` carrying an `empty`, `is-empty`, `is-minimized` or `is-revealed` member produces
the SAME value it would produce without that member** (`§5.5.1 P-CT-IM-2`). **The default (`FORBIDDEN`
unless `U-CENSUS`/`U-ZONES` supply the value) is a statement about which mappings are ADMISSIBLE to the
caller; the module's own row asserts the unaffectedness, which is the half that holds under BOTH
readings.** **REVERSING THE DEFAULT CHANGES NO MODULE BYTE, NO ROW ID AND NO TERM** (`§0A` note 3,
`§7a.1` item 1).

**Item 4 — THE DECLARATION'S PROVENANCE, ITS PROOF AND ITS NON-APPLICATION.** **The declaration is the
module's own OPAQUE CONSTANT whose value is EXACTLY `'contain: layout style paint'` (27 characters).**
**The module RETURNS it as a string; the CONSUMER applies it** (`E5-B-1`). **THE OBSERVABLE IS
BYTE-EQUALITY AND CHARACTER-CODE EQUALITY against the pinned text — never a computed style, never a
layout fact, never a containment boundary and never a browser's acceptance** (`§3.4 R-8`, `§5.5.1
P-CT-IM-4`). **`A-d4`'s *"ONE shipped declaration survives"* is satisfied ON THIS READING**, and the
`(A)` reading (**apply**) is recorded as NOT TAKEN with its cost (`§0A` note 1).

**Item 5 — THE STRING-LITERAL CLOSED SET, AND THE ONE DECLARATION.** **The module owns EXACTLY FOUR string
literals and no more: the pinned declaration text; the empty string `''` (the declared degenerate answer);
and the module's own export member names appear as IDENTIFIERS, not as literals — so the count is TWO
string LITERALS unless the implementer spells a member name as a string (which the member census row
forbids).** **THE CLAIM IS STATED AS A CLOSED SET SO IT IS FALSIFIABLE WITH BOTH CONTROLS** (`§3.4 R-7`):
**a module carrying a THIRD string literal — a second CSS-shaped literal, a selector spelling, a taxonomy
member name, a unit string — FAILS the row; a module carrying exactly the two declared literals PASSES
it.** **A spelling variant of the pinned text (`'contain:layout style paint'`, `' contain: layout style
paint'`, a fragment-assembled `'contain' + ': layout style paint'`) FAILS `R-8`** — **the token-assembly
evasion is closed by `S-CT-6`, so an assembled form is caught rather than excused.**

**⟶ THE CLOSED SET ITSELF IS CORRECTED 2026-09-27 (`§0A` note 8.2), and the sentence above is kept visible:** **THE AS-FILED *"the count is TWO string LITERALS"* IS WRONG, and the as-filed *"EXACTLY FOUR string literals"* IS RIGHT IN COUNT AND WRONG IN ITS NAMED LIST.** **THE CENSUS, PINNED BY NAME FROM THE LANDED MODULE (`src/shared/container.ts`, `91311ac`): FOUR DISTINCT STRING-LITERAL BODIES — (1) `'contain: layout style paint'` (the pinned declaration, `1` occurrence) · (2) `''` (the declared EMPTY answer, `1` occurrence) · (3) `'function'` (the `typeof` tag, used TWICE — `tokensFor`, `orientationFor`) · (4) `'string'` (the `typeof` tag, used once — `containerDeclarationFor`) — `4` distinct bodies over `5` literal occurrences, and the two `typeof`-tag bodies are the class the as-filed list omitted while the THREE EXPORT NAMES and the THREE TYPE NAMES are IDENTIFIERS and never literals.** **`§3.4 R-7`'s allowed set is extended to these four named bodies; a THIRD body, a spelling variant of the pinned text and a fragment-assembled declaration all still FAIL. THE MODULE IS NOT CHANGED: the `typeof` tags are the ones `§2.3` item 1's dispatch table itself spells** (`§0A` note 8.2).

**⟶ AMENDED 2026-09-27 (`§0A` note 7.4 item 1) — THE CLOSED SET'S OWN BOUND, WHICH IS WHERE `R-7`'s
POSITIVE CONTROL WAS UNDERIVABLE.** **The as-filed `R-7` control said *"a corpus carrying a SECOND
declaration-shaped literal"* MUST FAIL and then EXEMPLIFIED it with `const d2 = 'contain: layout style
paint'` — but that literal IS the pinned literal, i.e. ONE OF THE TWO ALLOWED MEMBERS, so the control PASSES
and the row was unfalsifiable as written. The sentence above is kept visible, and the bound is PINNED here:**
**`R-7`'s closed set is a set of LITERAL BODIES — `{the pinned text, the empty string}` — so its control MUST
drive the SPELLING-VARIANT form (`'contain:layout style paint'` · `' contain: layout style paint'` · a
second constant carrying any third body) and NOT the pinned body a second time.** **WHETHER A
BYTE-IDENTICAL ASSEMBLED DECLARATION IS `IN` OR `OUT` OF THE CLOSED SET, STATED EXPLICITLY RATHER THAN LEFT
OPEN: a byte-identical assembled form is `IN` the row's CATCH (it FAILS the row) but only in its ASSEMBLED
spelling — the moment the joiner runs, its body IS the pinned text and is therefore a member of the allowed
set; so the assembly half of the control belongs to `R-8`'s assembly rule and to any scan that reads the
PRE-JOIN bytes, while `R-7`'s census of JOINED literal bodies catches exactly the third-body and
spelling-variant classes and nothing more.** **NO literal was added to the set, no term and no row id
moved.**

**Item 6 — `className` IS A RETURNED VALUE, NEVER A WRITE SITE — the reconciliation, stated so it cannot
be misread.** **`className` is (i) the identifier of the parameter of `containerDeclarationFor` and (ii)
the name of the member of `ContainerDeclaration`; it is NEVER the object of an assignment, a `setAttribute`
call, a `classList` operation or any other write.** **The two landed ban sites that name it
(`gutter-ui.md` `§2.1` item 6 and `relocate.md` `§3.4 R-11`) are reconciled at `§2.2`(D) row `2`, and the
module's own scan row carries `className` as a DECLARED EXEMPT MEMBER NAME while every write form on both
landed lists stays BANNED with both controls.** **A row that reads this exemption as a licence to write a
class FAILS `§4.4 S-CT-2` and is a `BLOCKING — SCOPE` finding.**

---

### 2.4 The two contract edges — their signatures, REQUIRED status, and DECLARED DEGRADATIONS, each with a
row that can FAIL

**THE OWN-SEAM SET IS EMPTY: no factory, no options object, no session** (the gate-1 record's `§9.4.4`).
**The ONLY two contract edges are the INJECTED CALLABLES**, and they are **the whole seam contract a fork
implements** — `docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`'s rule
applied: *"each seam's signature, REQUIRED/OPTIONAL status, totality and DECLARED DEGRADATION rule is
normative contract text."* **The form is `gutter-ui.md` `§R.3`'s** (name · signature · required? · what a
fork supplies · declared degradation), and **the third column of this table is the row that can FAIL**.

| Seam | Signature (the module's EXPORTED type) | Required? | What a fork supplies | DECLARED DEGRADATION (absent / non-callable / throwing) | The row that can FAIL |
| --- | --- | --- | --- | --- | --- |
| **`tokenFn`** | `ChromeTokenFn = (chrome: unknown) => unknown` | **REQUIRED** | the caller's own token mapping for its own chrome vocabulary — **the fork's mirror-class taxonomy lives HERE and only here** | **`tokenFn` absent → the DECLARED EMPTY answer `undefined`, ZERO invocations, no throw. Non-callable → the SAME declared EMPTY answer (never a silent no-op, never a mechanism default, never a coerced call). Throwing → the invocation is ATTEMPTED exactly once, the throw is ABSORBED, `undefined` is returned, and NOTHING ESCAPES — a callable that throws is never retried.** | **`M-4`/`M-5`** (the three degradation shapes) beside **`P-CT-SM-2`**'s call count and **`P-CT-TP-1`**'s totality drive |
| **`axisResolver`** | `AxisResolver = (edge: unknown) => unknown` — **SHAPE-IDENTICAL to the landed `AxisOf`** (`gutter-ui.md` `§R.3`), **a NAME/shape relation and NEVER an import edge** (`§2.2` item 3) | **REQUIRED** | the caller's own axis mapping for its own edge vocabulary, wired from the SAME single closure the fork wires into `E3`'s `axisFor` and `U-GUTTER-UI`'s `axisOf` (the one-closure rule, `§2.2` item 3) | **absent → `undefined`, ZERO invocations, no throw. Non-callable → the SAME declared EMPTY answer. Throwing → one ATTEMPTED invocation, the throw ABSORBED, `undefined` returned, nothing escapes, never retried.** | **`M-4`/`M-5`**'s axis drives beside **`P-CT-SM-3`** and **`P-CT-TP-1`** |

**THE DEGRADATION ROWS, one per class that can FAIL, because a declared degradation that no row can
falsify is a silent no-op with paperwork.** **They are `§3` rows and every one is assertable on `[T]` with
caller-supplied doubles:**

| Class | The row | What FAILS |
| --- | --- | --- |
| **absent edge** | **`M-4`** | a module that TREATS AN ABSENT SEAM AS A SUCCESS (returning something other than the declared EMPTY answer), **or that throws for it, FAILS `M-4` AND `§3.3 I-3`** |
| **non-callable edge** | **`M-4`**'s second drive (`42`, `'x'`, `null`, `{}`, `[]`, a `Symbol`, a `BigInt`) | the declared EMPTY answer and ZERO invocations; **a module that COERCES or GUESSES FAILS** |
| **throwing edge** | **`M-5`** | the attempt is **COUNTED ONCE**, the throw is **ABSORBED**, the declared EMPTY answer is returned and **nothing escapes the call**; **a module that propagates the throw FAILS `M-5` AND `§3.3 I-3`** |
| **the write class (the false-green class this unit exists to close)** | **`M-11`** + **`§3.4 R-10`** | a module that writes a class, a style, an attribute, a property or a node **FAILS the runtime write-log (ZERO writes expected, over a recording element) AND THE SCAN PAIR**; **a row asserting only *"returns the right strings"* FAILS this class's row** |

### 2.5 The composition boundary

**Item 1 — WHAT THE MODULE MAY READ, AND NOTHING ELSE.** **`chrome` is read by OWN-KEY / `Map.get` ONLY**
(the gate-1 record's `§9.4.2`): **the module inspects no prototype, no getter side effect and no absent
key's meaning**, and it **reads no member of `chrome` for ANY decision** (`§2.3` item 3). **A record read
is a total read** (`readMember`-style: a hostile holder, a missing member or a THROWING ACCESSOR yields
"unusable" rather than an exception) — **but the module's own surface has no member read it needs for a
decision, so the total-read rule lands here as a ROW rather than as a mechanism** (`§3.3 I-2`, `M-6`).
**Consequence: `chrome` MAY BE MUTATED by the caller between calls without changing any contract claim;
the module never writes to it and never retains it** (`§3.3 I-4`).

**Item 2 — THE NO-REACH CLAUSE, CARRIED VERBATIM IN ITS OWN WORDS.** **There is no parameter anywhere in
this module's surface through which an event object, a `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/
`screenY`/`offsetX`/`offsetY`/`movementX`/`movementY` value, a `pointerId`, a `button`/`buttons`, a
`deltaX`/`deltaY`, a `getBoundingClientRect` result, a `getComputedStyle` result, a `matchMedia` result,
an `activeElement` or an ELEMENT LOOKUP could arrive.** **THE MANDATORY GEOMETRY CLAUSE, verbatim from
`S-d11`: *the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts
contracts/arithmetic only)*.** **The clause fences `edge` (an opaque caller value, `E5-B-2`), the returned
class name (a string the caller supplied) and the declaration text's own word `layout` (a substring of an
unparsed constant) — and it is the reason no row of this unit may be written as a rendered-geometry, a
layout, a paint, an applied-CSS, a containment-boundary or a magnitude claim** (`§3.4 R-6`, `§3.3 I-8`).

**Item 3 — WHAT THE MODULE OWNS, AND THE ONE THING IT OWNS ENTIRELY.** **The module OWNS: the three
function names, the three type names, the parameter and member names of its own surface, the pinned
declaration constant, and the declared EMPTY answers.** **It owns NOTHING ELSE** — not a token, not a
class, not an axis, not a taxonomy member, not a unit, not a selector, not a default and not an element.
**The class name is the CALLER's; the mapping is the CALLER's; the values are the CALLER's.**

**Item 4 — THE ONE-CONTROLLER / ONE-INVOCATION DISCIPLINE, AND ITS LIMIT.** **Each function is
INDEPENDENT and STATELESS: `tokensFor(chrome, tokenFn)` invokes `tokenFn` once; `orientationFor(edge,
axisResolver)` invokes `axisResolver` once; `containerDeclarationFor(className)` invokes nothing.**
**There is NO registry, NO session and NO cross-call state, and therefore NO "second composer" hazard to
detect** — **stated as a LIMIT rather than a claim: a caller that wires two different closures into
`axisResolver` at two call sites gets two answers, and THIS MODULE CANNOT DETECT IT** (`§2.2` item 3's
one-closure rule is a **fork-facing requirement**, and its falsifiable half is `P-CT-SM-3`'s idempotence
drive on ONE closure).

**Item 5 — THE ENTRY-POINT PATH QUESTION, ANSWERED (`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`).** **DOES THE
ALLOWED FILE SET CONTAIN A PATH FROM THE APPLICATION'S ENTRY POINT TO THIS MECHANISM? — NO, AND THAT IS
THE DERIVATION'S OWN RESULT, NOT AN INHERITED COPY.** **Because `§5.1`'s allow-list contains ONE
production path (`src/shared/container.ts`) and NO `src/**` edit, no `src/renderer/**` path, no
`src/main/**` path and no demo-envelope path can reach it** — **so the mechanism has NO importer, NO
rendered surface, and NO in-app instantiation site** (`§5.2`'s structural refusal, `§7` item 4).

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]**
the divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row**, and
**every row is a contract row for the TestWriter; none is a measurement this pass took.** **Every row
carries an id and a `Pinned by` citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **The selector forwards the caller's answer UNCHANGED, and calls the seam EXACTLY once** | `tokensFor(chromeA, fn)` where `chromeA` is a frozen record and `fn` is a caller closure that records its own invocations and returns a sentinel object | **`fn`'s recorded invocation count is `1`**; **the return value IS the sentinel object by identity (`toBe`)**; **the argument `fn` received IS `chromeA` by identity (`toBe`)**; **`chromeA` is reference-identical and value-identical before and after**; **nothing throws** | `§2.1` item 2, `§2.3` item 1, `§5.5.1 P-CT-SM-2`, `I-1` | `[T]` |
| **M-2** | **The selector is TOTAL over the `chrome` domain — there is NO shape gate** | the same closure driven with `chrome` as: a record · `null` · `undefined` · `42` · `'x'` · `true` · a `Symbol` · a `12n` · a `Map` · an array · a function · `Object.create(null)` | **`fn` is invoked EXACTLY ONCE for EVERY one of the twelve shapes**, **each receives the value BY IDENTITY**, and **each answer is returned by identity**; **never a throw, never a branch that skips the call** | `§2.3` item 1 shape (a), `§5.5.1 P-CT-IM-1`, `I-1` | `[T]` |
| **M-3** | **The normalizer forwards the caller's answer UNCHANGED, and calls the seam EXACTLY once — for every `edge` shape** | `orientationFor(edge, axisFn)` over the same twelve shapes, with `axisFn` recording | **count `1` per call**, **the argument by identity**, **the answer by identity**; **never a throw**; **`edge` is UNINTERPRETED — no shape is privileged and none is refused** | `§2.3` item 2, `§5.5.1 P-CT-SM-3`/`P-CT-IM-1`, `E5-B-2` | `[T]` |
| **M-4** | **The DECLARED DEGRADATION of an ABSENT or NON-CALLABLE seam, for both edges, at once** | (a) `tokensFor(chrome, undefined)` · (b) `tokensFor(chrome, 42)` · (c) `orientationFor(edge, undefined)` · (d) `orientationFor(edge, 'x')` — each also driven with the seam OMITTED from the call entirely (arity two vs arity one) and with the seam carried as `null` | **every drive returns the declared EMPTY answer `undefined`**; **the recorded invocation count is `0` for every non-callable form**; **nothing throws**; **no mechanism default appears (no `''`, no `0`, no `{}`, no sentinel)**; **and `null` reads the SAME as the other non-callables** | `§2.4`'s two-edge table, `§2.3` items 1(b)/2, `§5.5.1 P-CT-TP-1` | `[T]` |
| **M-5** | **The DECLARED DEGRADATION of a THROWING seam: ONE attempted invocation, ABSORBED, and nothing escapes** | `tokensFor(chrome, () => { throw new Error('x') })` and `orientationFor(edge, () => { throw new Error('x') })` | **the recorded invocation count is `1`** (the attempt IS counted); **the return value is the declared EMPTY answer `undefined`**; **NOTHING THROWS out of `tokensFor`/`orientationFor`**; **the seam is NEVER RETRIED (count stays `1`)**; **and a second call with the same throwing seam produces the SAME declared answer with its own count of `1`** | `§2.4`'s two-edge table, `§0A` note 3's absence discipline, `§5.5.1 P-CT-TP-1` | `[T]` |
| **M-6** | **The record reads are TOTAL: a hostile holder, a throwing accessor and a `Map` are all handled without a throw** | (a) `tokensFor(Object.create(null), fn)` — a null-prototype record; (b) `tokensFor(new Proxy({}, { getOwnPropertyDescriptor() { throw new Error('x') }, ownKeys() { throw new Error('x') } }), fn)`; (c) `tokensFor(new Map([['is-empty', true]]), fn)`; (d) `tokensFor(Object.freeze({ empty: true }), fn)`; (e) the same four with a throwing `fn` | **every drive returns the declared answer (the caller's own answer on the callable path, `undefined` on the throwing path) and NOTHING THROWS**; **the module reads NO member of the record for a decision, and `Map.prototype.get` is NEVER invoked by the module** (the drive installs a `Map.prototype.get` spy over its own reversible patch and asserts count `0`) | `§2.5` item 1, `§2.3` item 3, `§5.5.1 P-CT-IM-2`, `I-2` | `[T]` |
| **M-7** | **The returned class name is VERBATIM where the caller supplied a usable string** | `containerDeclarationFor(className)` for `className` = `'is-empty'`; `'a'`; `'zone-42'`; a very long CSS-identifier-shaped string; a string with leading/trailing whitespace; a string with a `--` custom-property-shaped prefix; a string containing a space | **the returned record's `className` member IS that exact string BY IDENTITY (`toBe`) for EVERY drive** — **no normalization, no trimming, no case folding, no validation, no escaping, no prefixing and no length limit**; **`declaration` is the pinned text in the same record (one call, two members)**; **NOTHING THROWS** and **NOTHING IS WRITTEN** | `§2.1` item 2, `§2.5` item 3, `§5.5.1 P-CT-IM-3`, `P-CT-8` | `[T]` |
| **M-8** | **The returned class name is the declared EMPTY answer `''` for every UNUSABLE argument** | `containerDeclarationFor` driven with `undefined` · the argument omitted · `null` · `''` · `0` · `-0` · `NaN` · `true` · `false` · a `Symbol` · a `12n` · `{}` · `[]` · a function · an object whose `toString` and `valueOf` THROW · a `Proxy` whose traps throw | **the returned record's `className` reads EXACTLY `''` (`===`) for every drive, and `declaration` reads the pinned text**; **`toString`/`valueOf` are NEVER consulted** (the throwing-`toString` drive proves it); **NOTHING THROWS**; **NO mechanism default other than the declared `''` appears** | `§2.5` item 3, `§2.4`'s degradation discipline, `§5.5.1 P-CT-IM-3`/`P-CT-TP-1` | `[T]` |
| **M-9** | **The declaration text is returned byte-identically, and the returned record's member census is EXACTLY the two declared names** | `containerDeclarationFor(c)` for five usable class names, each read for **five observables**: (i) `declaration` `===` the pinned text; (ii) `declaration.length === 27`; (iii) the character-code sequence equals the pinned constant's; (iv) `Object.keys(record)` is exactly `['className','declaration']` (own **enumerable** string keys, in that order); (v) `Object.getPrototypeOf(record)` is `Object.prototype` and no member is a getter | **all five observables hold for every drive**; **a third member, a missing member, a reordered pair, a getter or a class-prototype record FAILS the row** | `§2.1` item 2, `§0A` note 5, `§2.3` items 4/5, `§5.5.1 P-CT-IM-4`/`P-CT-IM-5` | `[T]` |
| **M-10** | **The declaration is NEVER PARSED and NEVER APPLIED — the `[T]` proof of `E5-B-1`'s return half** | (a) `containerDeclarationFor('x')` called twice, with the returned strings compared **by identity to the two calls' own results and by value to the pinned constant**; (b) the same call driven with a **recording element** present in the drive (the element is passed to NOTHING in this module — it exists so the write-log can read `0`); (c) a static read of the module's bytes | **(a)** the text is byte-identical in both calls; **(b)** the recording element's write-log reads **ZERO writes of every kind** — zero property sets, zero method calls, zero attribute writes; **(c)** the module's bytes contain **no split of the text, no `':'`/`';'` scan, no `parse`, no `RegExp` over it, no property-name extraction and no rule object** **⟶ AMENDED 2026-09-27 (`§0A` note 8.1): (c) reads the TWO views by name — `joined` (comments STRIPPED · concatenation JOINED · quotes PRESERVED) and `subtracted` (the pinned literal removed from `joined`) — and asserts `joined.includes('style')` TRUE and `subtracted.includes('style')` FALSE, so the subtraction is proven LOAD-BEARING rather than a no-op; the as-filed wording above stands.** | `§2.3` items 4/5, `§2.5` item 3, `§3.4 R-8`/`R-10`, `§5.5.1 P-CT-IM-4`/`P-CT-SM-3`, `§0A` note 8.1 | `[T]` + static |
| **M-11** | **THE NO-WRITE ROW, over a recording element, for EVERY entry point** | a recording element whose own property writes, method calls and attribute writes are all logged; then (a) `tokensFor(chrome, fn)`; (b) `orientationFor(edge, axisFn)`; (c) `containerDeclarationFor(className)` — each driven **four times**, the element never passed to any of them | **the write-log reads ZERO for every one of the twelve drives: zero property sets, zero method invocations, zero attribute writes, zero node creations**; **and a POSITIVE CONTROL drive in which the harness itself writes one property on the same element reads `1`, so the log is proven live rather than dead** | `E5-B-1`, `§2.2` `P-CT-8`, `§3.4 R-10`, `§5.5.1 P-CT-IM-3`/`P-CT-SM-3` | `[T]` |
| **M-12** | **The whole surface is reachable and returns its declared shapes in ONE composition** | a single drive that imports the module and calls all three exports in sequence with a conformant caller set, reading every return value and every caller-recorded invocation count | **`tokensFor` ⇒ the caller's answer, count `1`; `orientationFor` ⇒ the caller's answer, count `1`; `containerDeclarationFor` ⇒ the two-member record; NOTHING THROWS; and the drive's own totals read `2` recorded invocations across the two seams and `2` members on the third return** | `§2.1` items 1/2, `§5.5.1 P-CT-TP-1`, `§3.4 R-5` | `[T]` |

### 3.2 Documented fail-states / non-happy states

**NOTE THE SHAPE: this unit has NO REFUSAL DOMAIN — every outcome below is a VALUE, not an error, and
there is no `ok`/`code`/`reason`/`thrown` anywhere in this contract** (`§2.1` item 2, `§4.4 S-CT-3`).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **An ABSENT or NON-CALLABLE `tokenFn`** | the seam omitted; `undefined`; `null`; `42`; `'x'`; `true`; `{}`; `[]`; a `Symbol`; a `12n` | **the declared EMPTY answer `undefined`**, **ZERO invocations**, **NOTHING THROWS**, **no coercion of the seam into a call and no fallback call of any other function**; **and the answer does not depend on the `chrome` value** (driven over three `chrome` shapes with the same declared answer each) | `§2.4` item 1, `§2.3` item 1(b), `§5.5.1 P-CT-TP-1` | `[T]` |
| **F-2** | **An ABSENT or NON-CALLABLE `axisResolver`** | as `F-1`, on the orientation path | **the declared EMPTY answer `undefined`**, **ZERO invocations**, **NOTHING THROWS**; **and the answer does not depend on the `edge` value** | `§2.4` item 2, `§2.3` item 2, `§5.5.1 P-CT-TP-1` | `[T]` |
| **F-3** | **A THROWING `tokenFn` — absorbed, never propagated** | a closure whose body throws; a **function-shaped `Proxy` whose `apply` trap throws**; a callable that throws a **non-`Error`** value (`throw 'x'`, `throw 42n`, `throw null`) | **one ATTEMPTED invocation (count `1`)**, **the throw ABSORBED**, **the declared EMPTY answer `undefined` returned**, **NOTHING ESCAPES the call**, **never retried**; **and the module's own state is unaffected — an immediately following conformant call behaves exactly like a first call** | `§2.4`, `§3.3 I-3`, `§5.5.1 P-CT-TP-1` | `[T]` |
| **F-4** | **A THROWING `axisResolver`** | as `F-3`, on the orientation path | **identical declared behaviour to `F-3`** | `§2.4`, `§3.3 I-3`, `§5.5.1 P-CT-TP-1` | `[T]` |
| **F-5** | **A HOSTILE `chrome` — a revoked `Proxy`, a trap-throwing `Proxy`, a self-referential record, a record with a throwing accessor** | `chrome` = `Proxy.revocable({}, {}).proxy` after `revoke()`; a `Proxy` whose `getOwnPropertyDescriptor`/`ownKeys`/`has` traps throw; `Object.assign(Object.create(null), {})` with a self-reference; a record carrying `get empty() { throw new Error('x') }` | **the declared answer for the seam's own state (the caller's own answer on the callable path) and NOTHING THROWS** — **the module reads no member for a decision, so a hostile record is as benign as a plain one**; **the `chrome` value reaches the seam BY IDENTITY in the callable case** | `§2.5` item 1, `§2.3` item 3, `§5.5.1 P-CT-IM-2`/`P-CT-TP-1` | `[T]` |
| **F-6** | **A HOSTILE `edge`** | the twelve shapes of `M-2`, plus a revoked `Proxy` and a `BigInt` | **the declared answer, no throw, and the value reaches the resolver BY IDENTITY**; **the module interprets NOTHING — there is no shape it refuses and none it privileges** | `E5-B-2`, `§2.3` item 2, `§5.5.1 P-CT-TP-1` | `[T]` |
| **F-7** | **AN UNUSABLE CLASS NAME — the class-name domain's outside, driven in full** | the sixteen argument shapes of `M-8` | **`className` reads EXACTLY `''`** and **`declaration` reads the pinned text**; **`toString`/`valueOf` are never consulted**; **NOTHING THROWS** | `§2.5` item 3, `§5.5.1 P-CT-IM-3` | `[T]` |
| **F-8** | **THE PARSE-CLASS CONTROL — a positive control that MUST FAIL the row it is attached to** | a corpus (not the module) in which the pinned declaration text is split on `':'` and its property name extracted; and a corpus in which the text is assembled from fragments | **the ROW FAILS**: the drive demonstrates that `§3.4 R-8`'s byte-identity assertion and `R-7`'s closed-set literal claim **catch both shapes**; **a scan that passes for either corpus is UNFALSIFIED and must not be filed** (`§4.4 S-CT-6`) | `§2.3` items 4/5, `§3.4 R-7`/`R-8`, `§4.4 S-CT-6` | static |
| **F-9** | **THE WRITE-CLASS CONTROL — a positive control that MUST FAIL** | a harness module that DOES write a class on the recording element (`el.className = 'x'`), and a harness module that DOES apply the declaration (`el.setAttribute('style', decl)`) | **both FAIL `M-11`'s write-log and `§3.4 R-10`'s scan pair**; **a write-log that reads `0` for the control is a DEAD log and is itself a finding** | `E5-B-1`, `§3.4 R-10`, `§5.5.1 P-CT-IM-3` | `[T]` + static |
| **F-10** | **THE IMPORT-CLASS CONTROL — a positive control that MUST FAIL** | a corpus module carrying exactly one import statement of ANY path — including `import type { AxisOf } from './gutter-affordance.js'` | **the row FAILS**, and the `AxisOf` shape is the SPECIFIC positive control because it is the one import a spec writer is most tempted to add (`§2.2` item 3) | `§2.1` item 3, `§3.4 R-4`, `§4.4 S-CT-11` | static |
| **F-11** | **THE FABRICATED-EDGE PROBE — a repo-state claim, with its probe** | a read of the module's own import set and of `src/**`'s importers of this module | **the module has ZERO imports** and, at the time this unit's red set runs, **`src/shared/container.ts` is imported by NO `src/**` file**; **a later unit that imports it legitimately is NOT a violation of this row** (`R-12`'s scope clause) | `§2.1` item 3, `§3.4 R-4`/`R-12`, `§5.1` | static |
| **F-12** | **A SECOND CALL'S INDEPENDENCE — no retention, no cache, no drift** | five repeated calls of each of the three exports with the SAME arguments, each call's return value compared against the first | **every repeated call returns an EQUAL value** (`===` for the primitives and the same string references; **`toBe` for the caller's own answer identity on the seam paths**), **the third export returns a FRESH record each call with the same member census**, and **no observable state differs between the first and the fifth call** **⟶ AMENDED 2026-09-27 (`§0A` note 8.3(b)): the FRESHNESS half is the assertion `records.every((r, i) => records.every((s, j) => i === j || !sameRef(r, s)))` — DISTINCT IDENTITY ACROSS RECORDS (every pair of DISTINCT indices is a different object) — and the as-authored `!sameRef(r, records[0])` form is REPLACED, because it is a SELF-COMPARISON at index `0`, false for `r === records[0]`, which NO fresh-record implementation can satisfy.** | `§2.3` item 5, `§5.5.1 P-CT-IM-6`/`P-CT-SM-1`, `§0A` note 8.3(b) | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **THE TWO SEAMS ARE CALLED AT MOST ONCE PER INVOCATION, AND THEIR ANSWERS ARE HANDED ON UNCHANGED — never coerced, never merged, never re-keyed, never defaulted, never retried** | `A-d4`'s injection answer plus `E5-B-1`'s returned half: the mechanism is a selector/normalizer, and a second call or a transformed answer would be a different contract | `§2.3` items 1/2, `M-1`/`M-3`, `§5.5.1 P-CT-SM-2`/`P-CT-SM-3` |
| **I-2** | **NO MEMBER OF `chrome` IS CONSULTED FOR ANY DECISION** — the module inspects no prototype, reads no absent key's meaning, never invokes `Map.prototype.get`, and no member of the caller's mapping (the `B-3` class included) changes the returned value | The `AU-2`/`V-13` one-authority rule, cited not re-opened; and the `B-3` default implemented in the only form that holds under both of its readings | `§2.3` item 3, `§2.2` `P-CT-12`/`P-CT-13`, `M-6`, `§5.5.1 P-CT-IM-2` |
| **I-3** | **NO METHOD OF THIS MODULE THROWS, FOR ANY ARGUMENT — and a throwing injected callable is ABSORBED, not propagated** | `S-d8`'s (C) admission plus the family's declared-degradation rule; **a throw would be a refusal domain this contract does not have** | `§2.1` item 2, `§2.4`, `M-4`/`M-5`, `§5.5.1 P-CT-TP-1` |
| **I-4** | **NO STORE, NO CACHE, NO MODULE-LEVEL MUTABLE STATE, AND NOTHING RETAINED ACROSS CALLS** — the module holds no value between invocations, writes no file, touches no `localStorage`, and returns fresh values each call | Prohibition 4 / `S-d4`; the family's zero-module-state discipline | `§2.2` `P-CT-4`, `M-11`/`F-12`, `§3.4 R-2`, `§5.5.1 P-CT-SM-1` |
| **I-5** | **NEVER AN EXISTENCE-OR-DISPLAY AUTHORITY**: no returned value of this unit may be read as a census existence fact or as a display fact — `tokensFor` returns the CALLER's own answer, and no pass may report it as either | `census.md` `§0A` ruling note 12's boundary (*"iterating the record's KEYS and reading the record's VALUES are therefore two different questions … and only the first is answered by this contract"*) — **this module answers NEITHER**, and the confusion is the second-authority shape `V-13` was opened over | `§2.2` `P-CT-12`, `§1` item 3, `§8` |
| **I-6** | **NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER**: no `document`/`window`/`globalThis`-rooted access, no element-query token in any form, no element parameter | `A-d3`'s node-local discipline; `E3`'s `P-2` class | `§2.2` `P-CT-7`, `§3.4 R-2`, `§2.5` item 2 |
| **I-7** | **THE MECHANISM AUTHORS NO UI CONTENT AND WRITES NOTHING** — no element, no text, no class, no attribute, no style, no cursor, no node, no stylesheet and no rule; **`returned` is not `written`** | `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`'s mechanism test and `E5-B-1`'s write refusal; `docs/decisions.md`'s `UI-RENDERED-WITH-PROVIDENT` constraint applies to UI elements, and this is not one | `§2.2` `P-CT-2`/`P-CT-8`, `M-11`, `§3.4 R-10` |
| **I-8** | **NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: no row of this unit may assert a rendered-geometry, layout, paint, applied-CSS, containment-boundary, browser-acceptance, cursor or magnitude property, and no green of this unit may be reported as one** — **the geometry the family produces is UNPROVABLE in this repo today (the node layer asserts contracts/arithmetic only)** | `S-d11`'s mandatory clause plus `E5-B-2`'s no-reach pin | `§2.5` item 2, `§3.4 R-6`, `§5.2`, `§7` items 2/4 |
| **I-9** | **NO IMPORT EDGE IN EITHER DIRECTION, AND NONE FABRICATED** — the module imports nothing, is imported by no `src/**` file, and the `axisResolver`↔`axisOf`/`axisFor` relationship is a NAME/shape relation only | The `H-r6` dissolved-edge class (`zones.md` `§1` item 7 / `census.md` `§1` item 7) | `§2.1` item 3, `§2.2` item 3, `§3.4 R-4`/`R-12` |
| **I-10** | **THERE IS ONE AXIS READING IN THE FAMILY, BY RULE** — a fork wires its SINGLE `axisOf` closure into `axisResolver` (and into `E3`'s `axisFor`), so two readings of one element cannot disagree; the module itself holds no axis state and cannot enforce this | `gutter-ui.md` `§7a.1` item 1's landed one-closure rule, carried and pinned here | `§2.2` item 3, `§2.5` item 4, `§5.5.1 P-CT-SM-3` |
| **I-11** | **THE DECLARATION TEXT IS A CONSTANT, IDENTICAL IN EVERY CALL, AND IT IS NEVER PARSED OR APPLIED** | `E5-B-1`'s returned half and `A-d4`'s *"ONE shipped declaration survives"* | `§2.3` items 4/5, `M-9`/`M-10`, `§3.4 R-7`/`R-8`, `§5.5.1 P-CT-IM-4` |
| **I-12** | **THE DECLARED EMPTY ANSWERS ARE `undefined` (both seams) AND `''` (the class name), AND THEY ARE THE ONLY DEGENERATE VALUES IN THE CONTRACT** | Prohibition 3's absence discipline: each is the **absence of a value the module would otherwise have to fabricate**, names nothing and cannot be mistaken for a caller value | `§2.3` items 1(b)/2/3, `M-4`/`M-5`/`M-8`, `§5.5.1 P-CT-TP-1` |
| **I-13** | **NO STORE, NO PERSISTENCE, NO MCP SURFACE, NO SHIM MEMBER, NO CSS FILE**: no tool, no resource, no group, no `RpcMethod`, no `MUTATING_METHODS` entry, no IPC method, **no stylesheet, no CSS file and no rule**; `src/shared/dom-shim.ts` **gains no member** | Prohibitions 5/6; `PROHIBITION-5-IS-AN-ADOPTION-BOUND`; `SHIM-COMPLETION-CARVE-OUT` | `§2.2` `P-CT-5`/`P-CT-6`/`P-CT-9`, `§3.4 R-3`/`R-11` |
| **I-14** | **`[U]` IS NOT OFFERED AND `[D]` IS NOT CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL**: the module is imported by no `src/**` file and reads no coordinate, so there is no rendered surface to observe and nothing for a measuring leg to measure | `§5.2`; `docs/specs/zones.md` `§4.4 S-6` | `§5.2`, `§3.4 R-6`/`R-9`/`R-10`, `§7` item 4, `§0A` note 7.6 `G5` — **whose drive is PINNED as an IMPORT-STATEMENT assertion (the test file's import statements are read, never its prose), so this file's own comments about the refusal cannot redden the row** |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its thirteen
prohibitions**. **A prohibition citing *"a static source row"* with no id is not a row** (the sibling
reviews' recurring finding), so **every static claim in this file has an id here**, and **each scan is
closed against the evasion class (token assembly, comment-carrying, realm-rooted computed access) by
`§4.4 S-CT-6`.** **Every row here is `static`-layer: it reads this unit's own FILES or drives an injected
argument, never a real DOM.**

**THE SCAN'S NORMALIZATION, STATED ONCE SO EVERY ROW BELOW INHERITS IT** (`S-CT-6`): every scan reads a
**NORMALIZED view** in which **string-literal concatenation is JOINED** (`'contain' + ': layout style
paint'` reads as one literal) **and COMMENTS ARE SCANNED AS CODE** — so a banned token in a comment, in a
fragment-assembled literal, or in a template hole **FAILS as if it were spelled plainly**.

**⟶ ADDED 2026-09-27 — THE TWO DATED METHOD NOTES (`§0A` note 7.5), stated as CONTRACT because a later
author must not re-discover them.** **(1) JOIN FIRST, THEN STRIP.** The normalization is two operations and
**THEIR ORDER IS NOT FREE**: the concatenation join must run **BEFORE** quotes are stripped, because a view
that strips quotes first can no longer see the `'…' + '…'` boundary the joiner needs — **so an
assembly-evasion control run against a strip-then-join view is UNFALSIFIED WHILE LOOKING GREEN.** **(2) THE
LITERAL-BODY CENSUS READS A QUOTE-PRESERVING JOINED VIEW.** A row that counts or compares **string literal
BODIES** (the `R-7` class) cannot read a quote-stripped view at all, because that view has no literal bodies
left; it reads the **comment-stripped, quote-PRESERVING, concatenation-JOINED** view. **CONSEQUENCE, stated
so it is not discovered as a false green: the `R-7`/`F-8`/`P-CT-IM-4` assembly-evasion controls are
falsifiable ONLY under these two views.**

| id | Row (a TestWriter authors this) | Its DECLARED EXEMPTIONS, and both controls | Pinned by | Layer |
| --- | --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (P-CT-1, P-CT-3, P-CT-9, P-CT-12).** *Over the MODULE's source (`src/shared/container.ts`) INCLUDING its comments and in the normalized view, no occurrence, in any form, of: **(a)** a pane/zone/tab/region vocabulary token (`pane`, `zone`, `tab`, `region`, `dashboard`, `column`, `gutter`); **(b)** a mirror-class taxonomy spelling (`is-empty`, `is-minimized`, `is-revealed`, `minimized`, `revealed`, `slotModel`, `emptySlot`) or the bare member key `empty` as an OWN KEY or a STRING; **(c)** a unit or CSS token literal (`'px'`, `'0px'`, `'fit-content'`, `'1fr'`, `'auto'`, `calc(`, the QUOTED CSS CUSTOM-PROPERTY LITERAL `'--` — an opening quote followed by two hyphens — and the CSS PROPERTY-LITERAL FORM `contain:` OUTSIDE the pinned declaration); **(d)** a selector token (`selectors`, `:has(`, `[data-`, `querySelector`, `querySelectorAll`, `closest`, `getElementById`, `querySelectorAll`); **(e)** a census/format token (`census`, `specOf`, `sizes`, `trackProp`, `trackVar`, `trackProp`, `emptyToken`, `trackFor`, `isEmpty`, `String(`, `parseFloat`); **(f)** a store token (`localStorage`, `sessionStorage`, `indexedDB`, `store`, `cache`, `memo`, `persist`); **(g)** a realm/ambient token (`document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, `activeElement`, `matchMedia`, `getComputedStyle`, `getBoundingClientRect`, `offsetWidth`, `offsetHeight`, `clientWidth`, `clientHeight`, `scrollWidth`, `clientX`, `clientY`, `pageX`, `pageY`, `movementX`, `movementY`, `pointerId`, `deltaX`, `deltaY`, `isPrimary`, `button`, `buttons`, `eval`, `new Function`, `process.env`, and the `globalThis[`-style computed realm access).* | **THE DECLARED EXEMPTIONS, NAMED — a scan row that does not name them is VACUOUS (`S-CT-6`):** **⟶ ADDED 2026-09-27 (`§0A` note 8.1): clause **(c)**'s `contain:` occurrence is evaluated over the QUOTE-PRESERVING JOINED view with the pinned literal SUBTRACTED (the recipe of `§0A` note 8.1(i)), so the module's own pinned declaration does not redden it; the pinned literal is ALSO exempted BY NAME here, with this clause's positive control (a `contain:` occurrence OUTSIDE the pinned literal, or a `'px'`-class unit literal, FAILS) and negative control (the module PASSES) named at `§0A` note 8.1(ii). NO ban is narrowed: every OTHER occurrence is still caught.** **`chrome` · `edge` · `orientation` · `token` · `tokensFor` · `tokenFn` · `resolveAxis`/`axisResolver` · `className` · `declaration` · `container` · `contain` · `declarationFor` · `Map`** — **⟶ AMENDED 2026-09-27 (`§0A` note 7.4 items 3/4, 7.6 `G1`): THE EXEMPTION LIST IS EXTENDED BY ONE NAME AND ONE COLLISION IS RECONCILED. (i) `style` IS ADDED TO THIS LIST, because the one literal the module must own IS `contain: layout style paint` and `R-10` bans a bare `style` — the reconciliation is the BLESSED SUBTRACTION: `style` is exempt as a word of the PINNED LITERAL, and the pinned literal is SUBTRACTED before the write/CSS scans, with `M-10`(c) asserting the subtraction is LOAD-BEARING (`style` present before the subtraction, ABSENT after) so every OTHER occurrence of the token is still caught; the exemption is added, NOT substituted for the subtraction. (ii) `R-1`(g)'s tokens that `R-6` ALSO fences (`getComputedStyle`, `getBoundingClientRect`, `pointerId`, `matchMedia` — and here, NOTHING ELSE) are held as CHARACTER-CODE-BUILT tokens and are `R-6`'s DECLARED EXEMPTION, which is the reconciliation that lets both rows hold inside one file. NO name was removed; no ban was narrowed.** — **THIS UNIT'S DECLARED CONTRACT VOCABULARY**, the names the adoption row and this spec's surface already own. **`chrome`/`edge`/`orientation` are on NO landed ban list** (re-measured this pass: `orientation` has ZERO `src/**` hits; `chrome` has ZERO `src/**` hits and one `tests/**` hit that is the SHELL's own chrome); **`className` is reconciled at `§2.2`(D) row `2` and re-stated at `§2.3` item 6**; **`container`/`contain` appear as substrings of the pinned declaration text and of this unit's own name.** **BOTH CONTROLS: (i) a corpus carrying `const c = 'is-empty'` and a corpus carrying `el.className = c` FAIL the row; (ii) a corpus carrying `containerDeclarationFor(className)` and `tokensFor(chrome, tokenFn)` PASS the row.** | P-CT-1/P-CT-3/P-CT-9/P-CT-12, `§2.2`(D), `§2.3` item 6 | static |
| **R-2** | **The forbidden-ACCESS and file-set row (P-CT-4, P-CT-5, P-CT-7; I-4, I-6, I-13).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, a helper returning the realm, and the **no-token realm route** (`({}).constructor.constructor('return this')()`, `Reflect.construct`, `Function.prototype.call`-shaped code construction) — **and no ambient read for a value**: the `R-1`(g) list. **THE FILE-SET HALF:** the change set does not touch `src/shared/dom-shim.ts`, does not add a MCP member, does not add a `scripts` key, does not touch `package.json`/`package-lock.json`/`tsconfig.json`/`tsconfig.tests.json`/`vitest.config.ts`, and does not touch `src/main/**` or `src/renderer/**`; **the MCP negatives are asserted as SET EQUALITY AGAINST THE NAMES, never as a count quoted here** (`S-CT-8`). **STATED LIMIT, so the row is not written unassertably: a BLANKET ban on `[expr]` is NOT claimed** — a **locally built object's** computed access and ordinary **array indexing** carry no banned token and are **deliberately not banned** (`slothost.md`'s `M-14` narrowing is the precedent); **a row that asserts *"no bracket notation at all"* FAILS this row's own text** | no exemptions beyond `R-1`'s; **both controls: (i) a corpus reading `globalThis['doc'+'ument']` FAILS; (ii) a corpus reading `pairs[i]` PASSES** | P-CT-4/P-CT-5/P-CT-7, `I-4`/`I-6`/`I-13` | static |
| **R-3** | **The NO-SHIM / NO-NEW-SURFACE / NO-CSS-FILE row (P-CT-5, P-CT-6, P-CT-9; I-13).** *`src/shared/dom-shim.ts` is byte-identical before and after; no `.css` file exists in the diff; no `scripts/**` file changes; no config file changes; no MCP registration site changes.* **A shim member addition, a new CSS file, a new `scripts` key or a config edit FAILS** **⟶ ADDED 2026-09-27 (`§0A` note 8.1): where any part of this row reads the MODULE's bytes for a `contain:`/CSS-literal occurrence, it reads the QUOTE-PRESERVING JOINED view with the pinned literal SUBTRACTED (the recipe of `§0A` note 8.1(i)); the pinned literal is ALSO exempted BY NAME here, with the positive control (a `.css` file / a shim member / a config key) and the negative control (the module and its test file PASS) named at `§0A` note 8.1(ii). No clause above is narrowed.** | none | P-CT-5/P-CT-6/P-CT-9, `I-13`, `§5.1`, `§0A` note 8.1 | static |
| **R-4** | **The IMPORT-BOUNDARY row (P-CT-11; I-9; `§2.1` item 3).** *`src/shared/container.ts` contains ZERO import statements — no value import, no type-only import, no dynamic `import(`, no `require(`.* **ANY import statement of ANY path FAILS, and `import type { AxisOf } from './gutter-affordance.js'` is the named positive control** (the one import a spec writer is most tempted to add, and the one that would create the fabricated edge `§2.2` item 3 forbids). **A later unit that legitimately imports THIS module is not a violation of this row** — the row binds THIS module's own imports, and the *"imported by no `src/**` file"* claim is `R-12`'s | none | P-CT-11, `§2.1` item 3, `F-10` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/container.ts` exports EXACTLY the six names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `tokensFor`, `orientationFor` and `containerDeclarationFor`** (read from the imported namespace's own keys, **by name**, with a **positive control** that a namespace carrying a **fourth** value export FAILS); **(b) THE TYPE-ONLY NAMES — `AxisResolver`, `ChromeTokenFn`, `ContainerDeclaration` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 5 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text** (`S-CT-8`) | none | `§2.1` items 1/2, `§5.2` leg 5, `F-10` | runtime + type-level |
| **R-6** | **THE GEOMETRY / COORDINATE / NO-REACH ROW (`E5-B-2`'s no-reach clause, `S-d11`'s mandatory clause, in falsifiable form; P-CT-7; I-8).** *Over the MODULE's source AND over this unit's own `[T]` test file, the change set contains **no geometry-observation call, no coordinate read and no geometry-shaped claim**: no `getComputedStyle`, no `getBoundingClientRect`, no `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`/`scrollWidth`-family member, no `matchMedia`, no `style` write, no class write, no `innerHTML`, no `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/`screenY`/`movementX`/`movementY`/`offsetX`/`offsetY` read, no `pointerId`/`button`/`buttons`/`deltaX` read, **no ELEMENT parameter anywhere in the module's surface**, and **no assertion whose failure message or description claims a rendered/layout/paint/applied-CSS/containment/magnitude fact**.* **ITS FALSIFIABLE HALF:** a module or fixture that observes geometry or a coordinate, an element parameter, or a row description claiming a resolution, an applied length, a containment boundary, a browser's declaration acceptance or a magnitude **FAILS**. **ITS STATED BOUND (three parts, the form `zones.md` `§3.4 R-7` established): (a) the MODULE file's raw bytes, comments included; (b) THIS UNIT'S OWN test file's raw bytes; (c) the row DESCRIPTIONS extracted from that test file** — with the geometry tokens held as **FRAGMENTS** so the scan cannot read its own rule list, and **both a POSITIVE control (a corpus reading `clientX`, and a description claiming a magnitude, must FAIL) and a NEGATIVE control (ordinary count wording PASSES)**. **ITS HONEST LIMIT:** a text scan cannot prove the absence of a claim for all prose — **the contract half is `§5.2`'s refusal to offer a `[U]`/`[D]` row and `I-8`** | **⟶ AMENDED 2026-09-27 (`§0A` note 7.4 item 2, 7.6 `G2`/`G4`): the as-filed `none` above is REPLACED as a DECLARED EXEMPTION SET, because the row's own stated bound was SELF-CONTRADICTORY without one — bound (b)/(c) scan THIS test file for the same geometry tokens the scan row must itself hold, the collision `S-CT-6` requires every scan row to NAME an exemption for. THE DECLARED EXEMPTIONS, NAMED: the geometry/coordinate vocabulary BUILT FROM CHARACTER CODES and never spelled anywhere in the file (the code literals are themselves the exemption), plus the single fragment `'geometry'` — and NOTHING else. (c)'s EXTRACTION METHOD is PINNED with it (`G2`): EVERY `it`/`describe` TITLE CAPTURED AT DECLARATION TIME, scanned as a SET, plus the file's own BYTES (raw and normalized). THE TOKEN LIST IS EXTENDED to `§2.5` item 2's own members named there and omitted by the as-filed row: `screenX`/`screenY` and `offsetX`/`offsetY` (with `movementX`/`movementY` unchanged).** | `E5-B-2`, `S-d11`, `I-8`, `§5.2`, `§0A` note 7.4 item 2 | static |
| **R-7** | **THE CLOSED-SET LITERAL ROW (P-CT-10; `§2.3` item 5).** *The module's STRING LITERALS are EXACTLY TWO: the pinned declaration text (one occurrence, byte-identical) and the empty string `''`.* **A THIRD string literal, a SECOND declaration-shaped literal, a spelling variant of the pinned text, or a fragment-assembled declaration FAILS.** **BOTH CONTROLS: (i) a corpus carrying `const d2 = 'contain: layout style paint'` in a second constant FAILS; (ii) a corpus carrying the two declared literals PASSES.** **ITS SCOPE, stated so it is not vacuous: this row reads the NORMALIZED view, so the assembly evasion lands in `R-8`'s own control too** | **⟶ AMENDED 2026-09-27 (`§0A` note 7.4 item 1): the as-filed control `(i)` — *"a corpus carrying `const d2 = 'contain: layout style paint'` in a second constant FAILS"* — IS WRONG AS WRITTEN and stays visible above: that body IS the pinned literal, i.e. ONE OF THE TWO ALLOWED MEMBERS, so the control PASSES and the row is unfalsifiable as filed. THE CONTROL IS RE-PINNED to the SPELLING-VARIANT form this spec already names as an `R-8` failure (`'contain:layout style paint'` · `' contain: layout style paint'` · a second constant carrying ANY third body), and the byte-identical ASSEMBLED declaration's membership in the closed set is STATED EXPLICITLY: it is IN the row's catch only in its ASSEMBLED spelling, because once the joiner runs its body IS the pinned text — so the assembly half belongs to `R-8`'s assembly rule and to any PRE-JOIN reading, never to the joined-body census. (ii)'s negative control is unchanged.** **⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.2): THE AS-FILED *"EXACTLY TWO"* AND THE AS-FILED CONTROL `(ii)` ARE CORRECTED — the ALLOWED SET IS THE FOUR NAMED BODIES the landed module owns: the pinned declaration text · `''` · `'function'` · `'string'`** (`'function'` used twice, in `tokensFor` and `orientationFor`; `'string'` once, in `containerDeclarationFor`). **THE ROW'S CATCH IS UNCHANGED: a THIRD body, a SECOND declaration-shaped literal, a spelling variant of the pinned text (`'contain:layout style paint'` · `' contain: layout style paint'`) or a fragment-assembled declaration FAILS — control `(i)` stays RE-PINNED to the SPELLING-VARIANT form, and control `(ii)` becomes *"a corpus carrying the FOUR declared bodies PASSES"*.** **WHY THE MODULE, NOT THE ROW: `§2.3` item 1's own dispatch table spells `typeof tokenFn === 'function'` / `typeof className === 'string'`, so a row excluding those bodies reddens the module the contract requires; and a census amendment must never be discharged by changing the artifact it measures** (`§0A` note 8.2). | P-CT-10, `§2.3` items 4/5, `F-8`, `§0A` note 7.4 item 1, `§0A` note 8.2 | static |
| **R-8** | **THE DECLARATION-TEXT ROW (P-CT-2, P-CT-10; `E5-B-1`; I-11).** *`containerDeclarationFor(className).declaration` is BYTE-IDENTICAL to the pinned constant `'contain: layout style paint'` — `length === 27`, every character code equal — for EVERY argument, AND the module's bytes contain no PARSE of it: **no `split`, no `indexOf(':')`, no `RegExp` over it, no property-name extraction, no rule object, no `StyleSheet`/`CSSRule` token, no `setProperty`, no `setAttribute('style'`, no `element.style`**.* **ITS FALSIFIABLE HALF (both controls): (i) a module returning a spelling variant, a fragment-assembled form, or a parsed-derived string FAILS; (ii) the `F-8` corpus — a module that splits the text on `':'` — FAILS the parse half.** | none | `E5-B-1`, `§2.3` items 4/5, `M-9`/`M-10`, `§5.5.1 P-CT-IM-4`, `F-8` | static + `[T]` |
| **R-9** | **The ABSENT-PAGE-DESIGN probe (the existence row that keeps `§1` item 6 falsifiable).** *`docs/skills/designing-pages.md` does NOT exist, so there is no test-use-case coverage matrix and no demo-page index to update.* **THE PROBE: a file-existence check whose FAIL is meaningful — if the file comes to exist, this unit OWES the coverage row and the demo-page entry** (with the honest note that a mechanism with no UI surface can only contribute an **absence** row) | none | `§1` item 6, `§7` item 6 | static |
| **R-10** | **THE NO-WRITE ROW — the scan pair (P-CT-2, P-CT-8; `E5-B-1`; I-7).** *(a) A STATIC scan over the module's bytes, comments included, for the union of the two landed UI-content-write lists (`gutter-ui.md` `§2.1` item 6 and `relocate.md` `§3.4 R-11`) — `createElement`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `textContent`, `innerText`, `classList`, `appendChild`, `removeChild`, `insertBefore`, `setAttribute`, `removeAttribute`, `setProperty`, `style`, `nodeValue`, `cursor`, `focus(`, `blur(` — **with `className` carried as a DECLARED EXEMPT MEMBER NAME, and the WRITE FORMS `\.className\s*=` and `\bclassName\b\s*=` banned WITH NO EXEMPTION.** (b) **A RUNTIME write-log** over a recording element reading ZERO writes (`M-11`). **THE PAIR IS THE ROW, because a text scan cannot prove the absence of a write for all control flow.** **BOTH CONTROLS: (i) the `F-9` corpus — `el.className = 'x'` and `el.setAttribute('style', decl)` — FAILS both halves; (ii) the module itself PASSES both, and a DEAD write-log (one that reads `0` for the control) is itself a finding.** **THE `className` EXEMPTION'S RECONCILIATION IS `§2.2`(D) row `2` and `§2.3` item 6: what the two landed lists ban is THE WRITE; this module returns a value and writes nothing, and the exemption is a DECLARED MEMBER NAME, never a relaxed ban** | **`className` (the member/parameter NAME), DECLARED — every other name on both landed lists stays BANNED with NO exemption. ⟶ AMENDED 2026-09-27 (`§0A` note 7.4 item 3, 7.6 `G1`): `style` is carried on `R-10(a)`'s token list, and the DECLARED RECONCILIATION is the BLESSED SUBTRACTION of the pinned literal BEFORE this scan (`style` exists inside the pinned declaration and NOWHERE else; `M-10`(c) asserts the subtraction is LOAD-BEARING) — the as-filed list above is UNCHANGED and no ban on it is narrowed.** **⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.1/8.1(b)) — THE RECIPE IS PINNED AND THE WRITE-FORM IS CORRECTED: (1) the subtraction runs on a QUOTE-PRESERVING JOINED view (comments STRIPPED · literal concatenation JOINED · quotes PRESERVED), because the as-authored form split on a QUOTED needle inside a QUOTE-STRIPPED view and therefore removed NOTHING; (2) the bare write form becomes `(^|[^A-Za-z0-9_$.])className\s*=(?!=|>)` and the dotted form `\.\s*className\s*=(?!=|>)`, so `typeof className === 'string'` — the check `§2.5` item 3 REQUIRES — is a NEGATIVE control rather than a hit, while `el.className = 'x'` stays a POSITIVE one; (3) the pinned literal is ALSO exempted BY NAME at this row as the backstop, with the positive/negative controls named at `§0A` note 8.1(ii).** | P-CT-2/P-CT-8, `E5-B-1`, `M-11`, `§5.5.1 P-CT-IM-3`, `F-9`, `§0A` note 7.4 item 3, `§0A` note 8.1/8.1(b) | static + `[T]` |
| **R-11** | **The NO-SHIM / NO-CONFIG / surface-negatives companion to `R-3`, stated as the DONE-row-checkable half:** *no `package.json` key changes (the `scripts` key set is UNCHANGED — this unit adds NO script, per `AGENTS.md` item 4's recorded process hazard: `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` key set, so ANY further script key reddens that row until a TestWriter extends the landed set, and a config change cannot satisfy it)*; *no dependency or devDependency is added* (`package.json`'s `devDependencies` key set stays the FIVE names — `@types/node`, `electron`, `esbuild`, `typescript`, `vitest` — **no `fast-check`, no property runner**, per `AGENTS.md` item 11(d)) | none | `§5.1` items 7/9, `§5.5` (NO NEW DEPENDENCY), `AGENTS.md` item 4's hazard | static |
| **R-12** | **The DIFF-SCOPE row and the no-importer probe (P-CT-5, P-CT-11; C-8's discharge).** *Every changed path in this unit's commit range is inside `§5.1`'s allow-list; NO path in `§5.1`'s DENIED set appears; and at the time this unit's red set runs, `src/shared/container.ts` is imported by NO `src/**` file* (an import-graph probe: a grep for the module's specifier across `src/**` returns ZERO). **SCOPE RULE, so the row cannot mistake correct gate work for a boundary violation: a diff-scope row asserted over a COMMIT RANGE must scope its allow-list census to THIS UNIT'S OWN ARTIFACTS** — the module, this unit's test file, this spec, this unit's own `*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows — **and must NOT read a later unit's commits or a sibling's dirty file as this unit's diff. The DENIED set is the exception and binds the WHOLE committed set.** | **⟶ AMENDED 2026-09-27 (`§0A` note 7.6 `G4`): THE ROW'S IMPLEMENTATION FORM IS PINNED, because `git` is UNAVAILABLE at run time — this row is evaluated by a FILESYSTEM PROBE: every DENIED path PRESENT on disk, every artifact path of this unit's allow-list EXISTING, and the IMPORTER GRAPH READ FROM THE TREE (a recursive `src/**` read matching the module's specifier, never a git command and never a comment). No clause above is weakened: the probe's FAIL is meaningful on each of the three halves.** | C-8, `§5.1`, `I-9`, `F-11`, `§0A` note 7.6 `G4` | static |
| **R-13** | **THE ONE-AUTHORITY / NO-DUPLICATION ROW (P-CT-12, P-CT-13; `AU-1`/`AU-2`; I-2, I-5).** *The module re-implements NOTHING a landed sibling owns: it contains no size formatting, no `String(size)` join, no unit concatenation, no empty-token limb, no malformed-spec limb, no `-0` rule, no `Map`/record census semantics and no dispatch precedence; and it makes NO emptiness/reveal/minimization decision — no comparison, no predicate, no branch on any member of `chrome`.* **ITS FALSIFIABLE HALF, and it is the row's whole content: a module that formats, joins a unit, picks an empty token, or decides emptiness FAILS; and the `B-3` default's own half — *the returned value is unaffected by any member the record carries* — is driven at `M-6` and at `P-CT-IM-2`.** **THE TWO `B-3` READINGS ARE BOTH SATISFIED BY THIS ROW, which is exactly why the default can be reversed without moving a byte** (`§0A` note 3) | none | P-CT-12/P-CT-13, `I-2`/`I-5`, `§5.5.1 P-CT-IM-2` | static + `[T]` |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Claim | The probe (its FAIL is meaningful) |
| --- | --- | --- |
| **X-1** | **`src/shared/container.ts` DOES NOT EXIST at filing, and `tests/container.test.ts` DOES NOT EXIST at filing** — **the two absence facts the red set's own red form rests on** **⟶ AMENDED 2026-09-27 (`§0A` note 8.3(a)): THE ROW BRANCHES ON THE MODULE'S PRESENCE, the `§3.5 R-8x` form, because the module LANDED at `91311ac` and the as-authored red form FAILS BECAUSE THE WORK WAS DONE.** **THE RED BRANCH (module absent, governing AT RED TIME):** the absence of both paths (with no other unit path under `src/**`/`tests/**`). **THE GREEN BRANCH (module present, governing AT GREEN TIME):** **the PAIR's presence** — both `src/shared/container.ts` and `tests/container.test.ts` EXIST — **and the EXPORT CENSUS BY NAME** (`§2.1` item 1's three value exports by name; the type half is `§5.2` leg 5's, because a type name is erased at run time). **The row MUST branch on presence rather than assert the red form unconditionally** | a file-existence check for both paths; **its RED form is the module-resolution failure the red set reports**, and **its GREEN form is the pair's presence** (`§4.1`) **plus the export census BY NAME** |
| **X-2** | **`docs/specs/container.md` is THIS file — the unit's contract is FILED** | a file-existence check; **the tracked-path assertion is the supervisor's commit** (`RCA-8`) |
| **X-3** | **`docs/specs/container.md` is NOT the gate-1 record, and the gate-1 record is NOT edited by this unit** | the record is a DENIED path in `§5.1` item 11; a diff-scope row (`R-12`) reads it |
| **X-4** | **`docs/skills/designing-pages.md` does not exist** (`§1` item 6; `R-9`) | the file-existence probe of `R-9`, whose FAIL means this unit owes the coverage row |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/container.test.ts`** (`§0A` note 4) — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/container.js'` (or the repo's equivalent module-resolution failure) for
every row that imports the module, **plus the static/existence rows that can already be evaluated** —
`§3.4`'s `R-9` (the absent-page-design probe), `§3.4`'s `R-11` (the config/dependency rows), `§3.4`'s
`R-12`'s no-importer half and **`§3.5`'s `X-1`** (the module-absence probe), **which need no module at
all**; `R-4`/`R-5`/`R-12` become fully evaluable when the module lands — **while
`R-1`/`R-2`/`R-3`/`R-6`/`R-7`/`R-8`/`R-10`/`R-13` scan THIS module's bytes and become evaluable exactly
when it lands** (which is what `X-1`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely
additive**, and **the unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that three pure functions
return their declared values, that two injected callables are invoked exactly once with their answers
handed on unchanged, that the declared degradations hold for every unusable seam shape, that the returned
declaration text is byte-identical to the pinned constant, and that the change set writes nothing**. It is
**NOT** evidence that a browser accepts the declaration, that containment applies, that a layout or paint
boundary exists, that a stylesheet or rule loads, that a `:has()` rule matches, that a class exists on any
element, that a coordinate or an element was read, or that any of this is reachable from the app —
**in particular, at the end of this cycle the module is still imported by NO `src/**` file** (`R-12`).

### 4.2 Red-set authoring order

1. **The `§3.5` existence row `X-1` FIRST**, with **`§3.4`'s `R-9`/`R-11`/`R-12`** — they are the red's
   own premise and are evaluable before this unit's module exists.
2. **Then the `§3.4` static rows `R-1`..`R-13`** (`R-4`/`R-5`/`R-7`/`R-8`/`R-10`/`R-13` become complete
   once the module exists; `R-1`/`R-2`/`R-3`/`R-6`/`R-10` read the module file and are evaluable **once it
   exists**).
3. **Then the totality and degradation rows `F-1`..`F-12` and `I-1`..`I-14`** — this unit's failure
   surface comes **before** its happy paths, because **a totality claim is what the whole contract rests
   on** and a red on totality is diagnosis a green cannot give.
4. **Then `M-1`..`M-12`** — the happy states, **with `M-11` (the write-log pair) sitting with the
   no-write rows it makes falsifiable** and **`M-9`/`M-10` sitting with `R-7`/`R-8`'s declaration rows**.5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**,
   after the `M-*` rows, **in register order** (`P-CT-IM-1` · `P-CT-IM-2` · `P-CT-IM-3` · `P-CT-IM-4` ·
   `P-CT-IM-5` · `P-CT-IM-6` · `P-CT-SM-1` · `P-CT-SM-2` · `P-CT-SM-3` · `P-CT-TP-1`). They ride
   **`npm test` (leg 1)** unchanged and **need no new file, no new script, no `package.json` change and
   no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and
   existence row that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are
   recorded. **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first,
   with the old text kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order**
with **STOP AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop
early**, and **the un-run rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run
that reports all `154` attempts as executed is the finding, not the expectation.** **The register's
execution markings are DESIGN, not results**: **a row that is marked executable in `§5.5.1` but broken when
run is a SPEC FINDING, reported rather than tuned to green.**
**⟶ AMENDED 2026-09-27 (`§0A` note 7.1/7.2): the figure a red run must NOT report as fully executed is
`137` (the amended declared total, `§5.5.3`); the AS-FILED `154` above stays visible under its annotation.
The red run that produced this amendment stopped at `P-CT-IM-1` after `5` consecutive failures and reported
its `9` un-run register rows as FAILURES — the stop rule HONOURED, not violated.**
**⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.4, after the module landed at `91311ac`): the figure a red run must NOT report as fully executed is now `151` (the re-derived declared total: `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`), and `137`/`154` stay visible as the intermediate and as-filed forms.**

### 4.3 What the red is NOT

- **Not a DOM test, and not a test of a controller of the DOM.** **No real `Element`, no `document`, no
  shim member, no rendered pane**: **there is no element parameter anywhere in this module's surface**
  (`§2.5` item 2). **The ONE place a recording element appears is `M-11`'s write-log — and it is never
  passed to the module**; it exists so the log can be read.
- **Not a CSS test, not a stylesheet test, and NOT A COMPUTED-STYLE TEST.** **No row may read an applied
  declaration back** — no `getComputedStyle`, no `element.style`, no `CSSRule`, no containment check. **The
  declaration's row is BYTE-EQUALITY of a returned string** (`R-8`), and **the applied half is REFUSED,
  not tested** (`§5.2`).
- **Not a geometry test, not a coordinate test and not a magnitude test.** The rows never read a
  coordinate, never take an event object, never call `getBoundingClientRect` — `R-6` is the row that
  forbids it and `I-8` is the invariant.
- **Not a census test, and not a `U-ZONES`/`U-CENSUS` test.** **No row may need a census key set, a
  `sizes` map, a `specOf` entry, a `trackProp`/`unit`/`emptyToken` triple or a track-variable name**; a
  consumer's `chrome` values appear **only as the drive's own injected argument**.
- **Not a sibling test, and not a composition test.** **No row may assert a `U-GUTTER`/`U-GUTTER-UI`/
  `U-ZONES`/`U-CENSUS` behaviour, import a sibling's module, or require `src/shared/container.ts` to be
  wired into anything.** The one-closure rule (`I-10`) is a **fork-facing requirement whose falsifiable
  half is `P-CT-SM-3`'s idempotence drive on this module's own seam** — never a test of another module.
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a consumer-vocabulary test, and not a UI test.** A row naming a real zone/pane/tab, a taxonomy
  member, a selector or a CSS token is a `P-CT-1`/`P-CT-9` violation — such spellings may appear **only**
  inside `R-1`'s/`R-10`'s own control corpora.

### 4.4 The stop conditions (binding)

**`S-CT-*` are this unit's own classes, derived in substance from the gate-1 record's `C-5`/`C-10`,
`E5-B-1`/`E5-B-2`, the `B-3` default and this filing's own surface. All thirteen bind the red set, the
implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-CT-1** | A row is only satisfiable if the module **READS A DOM, AN AMBIENT GLOBAL OR AN ELEMENT** | **Violates `P-CT-7` and `I-6`.** The claim is DELETED; **the obligation is routed to the unit that owns the rendered surface.** |
| **S-CT-2** | A row (or the implementation) **WRITES ANYTHING** — a class, a style, an attribute, a property, a node, a cursor, or the application of the declaration to an element | **Violates `E5-B-1` (`"NO WRITE OF ANY KIND"`) and `P-CT-8`.** The row is DELETED; **`E5-B-1` is a RULING and is not re-opened by a row.** |
| **S-CT-3** | A row asserts a **`code`/`reason`/`ok`/`thrown`/result-record** shape from any of the three exports, or expects a **throw** from one | **Violates `§2.1` item 2** — **this unit has NO REFUSAL DOMAIN** and every outcome is a VALUE. **Re-write as a value assertion; adding a union is a NEW CONTRACT and needs its own gate.** |
| **S-CT-4** | A row is only satisfiable if the module **PARSES or SPLITS the declaration text**, or **derives a property/rule from it** | **Violates `E5-B-1`'s *"NEVER PARSED"* clause and `P-CT-10`.** The row is DELETED. |
| **S-CT-5** | A row is only satisfiable if the module **supplies a built-in literal** — a default token, a default class, a default edge, a unit string, an empty token, a fallback vocabulary, an epsilon or a sentinel | **Violates `P-CT-3`.** Every value is caller-supplied; **the declared EMPTY answers are ABSENCES and are the only degenerate values in the contract** (`I-12`). |
| **S-CT-6** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed.** The row forms are `R-1`/`R-2`/`R-7`/`R-8`/`R-10`, **and each must NAME its declared exemptions (`R-1`'s contract-vocabulary set, `R-10`'s `className` member name) or it is vacuous** (`§2.2`(D)). |
| **S-CT-7** | A row asserts a **consumer-facing taxonomy decision** — that a `chrome` member decides emptiness, reveal or minimization, or that the returned value expresses one | **Violates `P-CT-12`/`P-CT-13` and `I-2`/`I-5`.** **The row is DELETED and the decision routed to `U-ZONES`/`U-CENSUS`** (`census.md` `§0A` ruling note 3; the `V-13` class). **A row that needs a `B-3` REVERSAL lands only through the architect's dated annotation** (`§7a.1` item 1) — never as a red-set row. |
| **S-CT-8** | A row asserts a prohibition by a **bare COUNT** (*"six exports"*, *"two seams"*, *"`ALL_TOOLS` is 21"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a surface.** The row must assert **SET EQUALITY AGAINST THE NAMES**, or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-5`/`R-12`), and **an existence claim must be a probe whose FAIL is meaningful** (`R-9`, `X-1`, `X-4`). |
| **S-CT-9** | A row needs a **real DOM**, a real element, a `document`, a shim member, or a **second module instance's private state** to express itself | **Violates the layer declaration's anchors 1/2 and `§2.5` item 2.** The row is re-written against **arguments and recorded doubles** (`M-1`'s form). **A row that needs a DOM is a row this unit cannot have.** |
| **S-CT-10** | A row asserts a **rendered-geometry, layout, paint, applied-CSS, containment-boundary, browser-acceptance, cursor or magnitude** fact — or a `[T]` green is to be reported as one — or offers a **`[U]` row** for the applied containment behaviour | **Violates `E5-B-1`, `S-d11`, `I-8` and `§5.2`'s three-part refusal.** The claim is **DELETED**; **the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`zones.md` `§4.4 S-6`'s own words, carried in this unit's `§5.2`). **Any pass wanting a rendered row must get it from the unit that OWNS the rendered surface.** |
| **S-CT-11** | A row needs a **sibling import** (value or type-only), a **census read**, a **store**, a **persistence channel**, a **shim change**, a **new dependency** or a **fourth value export** | **Violates `§2.1` item 3, `P-CT-11`/`P-CT-12` and `I-9`** — **a dependency edge asserted toward any sibling would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class), **and `import type { AxisOf }` is the named positive control** (`F-10`). **Stop and route the row to its owner.** |
| **S-CT-12** | A row requires the module to **detect that two different closures were wired into `axisResolver`**, or to enforce the one-closure rule itself | **Violates `§2.5` item 4's stated LIMIT.** The rule is a **fork-facing requirement** (`I-10`); **this module holds no axis state and cannot detect a second closure.** |
| **S-CT-13** | A row requires the **declaration's text to be READ BY ANY INSTRUMENT THIS REPO OWNS** — a `ui`-leg measurement, a divergence comparison, an extractor read-back — or claims such a read as evidence | **Violates `§5.2`'s refusal and the record's reader question (`container-review.md` `§9.4.5`: the reader is **NONE**).** **`ci-ui-leg.md` `§3.0 R2`'s ONE measurement is SPENT and its `§2.1` item 6 excludes CSS resolution**; the refusal is the honest form, and **a parked proof is what this condition exists to prevent.** |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken
a row to reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist** (*done: this filing*),
**(b) a TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), **(c) its typed register
to exist** (*done: `§5.5.1`* — item 11's precondition is satisfied **before** any red set), and **(d) the
supervisor's ordering** — and `E5`'s ledger row stays an open `## OPEN` row whose status is the
supervisor's. **No status is advanced by this filing.** **`E5`'s `Blocked on` cell (`SCH-10` (A-d4)) is a
DISPOSITION, not a live dependency** — and **its row's own annotation already records that its named
dependency (`U-RELOCATE`) is DISCHARGED.** **`U-RELOCATE` (`E4`), `U-ZONES` (`E1`), `U-CENSUS` (`E2`) and
`U-GUTTER` (`E3`) are SIBLINGS and NOT dependencies in either direction** — a later pass asserting an edge
would be a FABRICATED EDGE (`I-9`).

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST, DERIVED FROM THIS UNIT'S OWN CHARTER

**THE DENIED SET, NAMED FIRST, because it binds absolutely and outranks the allow-list** (ruling 7:
*"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*).
**THE DERIVATION IS STATED BEFORE THE LIST, because the derivation is the thing that can be wrong:** this
unit's charter is **three pure functions over caller arguments, with an EMPTY own-seam set and a
declaration RETURNED AS TEXT** (`§2.1`, `§2.5`) — so **every path whose only role would be to LOAD,
APPLY, RENDER or OBSERVE the artifact is denied, because nothing in this unit's contract needs it** (the
`E10` lesson: a copy-forward DENIED set deleted the only instantiation site and left a UI unit
observability-empty — **here the honest reading is the opposite, and it is derived rather than inherited:
this unit HAS no instantiation site to protect, because its artifact is TEXT**).

1. **`src/shared/dom-shim.ts`** — **FROZEN** (`SHIM-COMPLETION-CARVE-OUT` admits exactly one member, and
   this unit adds none).
2. **Every sibling `src/shared/*` module and its test file** — `zones.ts` · `census.ts` ·
   `gesture-session.ts` · `gutter.ts` · `gutter-affordance.ts` · `layout-projection.ts` ·
   `owned-list-host.ts` · `slot-host.ts` · `mount-invariant-guard.ts` · `demo-envelope.ts` · `types.ts` ·
   `path-fork-cycle.ts` — **and every existing test file of another unit**.
3. **`src/main/**`** and **`src/renderer/**`** — **the app's process boundaries.** ***THIS IS THE CLAUSE
   THAT BINDS***: the `G-1` discharge test and `E5-B-1`'s falsifier both name a `§5.1` containing
   `src/renderer/**` as the condition under which the `[U]` refusal is UNAVAILABLE and gate 6 becomes a
   live battery — **so this denial is not conventional, it is the refusal's own precondition.**
4. **`src/shared/demo-envelope.ts`** — **the demo surface is not this unit's**, and **a demo-side
   implementation of these seams would be an IMPLEMENTATION, never the contract** (ruling 6).
5. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change.
6. **Any CSS artifact of any kind** — no stylesheet, no `.css` file, no rule, no `<style>`, no
   `index.html` change.
7. **`package.json`** and **`package-lock.json`** — **no script, no dependency, no devDependency.** *(This
   denial is LOAD-BOUNDED: `tests/ui-leg-contract.test.ts`'s `L-1` pins the `scripts` KEY SET, so **any
   further script key reddens that row until a TestWriter extends the landed set; a config change cannot
   satisfy it** — `AGENTS.md` item 4's recorded process hazard. **Leg 5 of `§5.2` therefore adds NO
   SCRIPT.**)*
8. **`scripts/**`** — no helper, no leg driver.
9. **`tsconfig.json`**, **`tsconfig.tests.json`** and **`vitest.config.ts`** — no include/exclude/
   compiler-option change. (`npm run typecheck:tests` and `tsconfig.tests.json` already landed, so this
   unit needs no config change to cite its own legs.)
10. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member,
    no `MUTATING_METHODS` entry, no IPC method, no registration site.
11. **Every sibling artifact** — a sibling unit's `*-greens.md`, its review record, its tracker-only rows,
    **and `docs/specs/container-review.md` (the CLOSED gate-1 record, whose conditions, findings and
    rulings this spec derives and may not re-litigate)**, plus **`docs/decisions.md`'s `E5-B-1`/`E5-B-2`
    rows and its `E5-B-3` working-default row** (a spec may not edit a ruling).
12. **`docs/skills/designing-pages.md`** — it **does not exist**, and this unit does not create it
    (`R-9`'s probe; `§7` item 6).

**THE ALLOW-LIST:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/container.ts` | **NEW** — the **three value exports + three type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/container.test.ts` | **NEW** — the red set (`§4.2`), the register rows and the static/existence rows | always |
| 3 | `docs/specs/container.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/container-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/container-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and **a sibling spec only for a dated status/annotation correction that changes NO normative clause** | the pass that produces them |

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule,
stated so a scope row cannot mistake correct gate work for a boundary violation**: a diff-scope row
asserted over a **commit range** must scope its **allow-list census to THIS UNIT'S OWN ARTIFACTS** — *the
module, this unit's test file, this spec, this unit's own `*-greens.md` and `archive/reviews/**` record,
and the unit's own tracker rows* — and **must NOT read a later unit's commits, a sibling's dirty
working-tree file, or a sibling unit's artifact as this unit's diff.** **The DENIED set is the exception
and is the half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS** the
row regardless of which pass committed it. **A non-denied path outside the allow-list is a FINDING for the
adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate boundary to leave a commit).
**The canonical artifacts must be non-vacuously present in the range**, and **`§3.4 R-12` is the row that
carries this rule.**

**THE FALSIFIER THIS SCOPE CAN FAIL, stated so the layer decision is falsifiable rather than asserted**
(the gate-1 record's own words, verbatim in substance — and `E5-B-1`'s own consequence list):
***if this spec's diff scope contains `src/renderer/**`, `src/shared/demo-envelope.ts`, or an authored
class write, or a probe that APPLIES the declaration, then the `§7.1` predicate TRIGGERS, the three-part
`[U]` refusal is UNAVAILABLE, the live/UI battery is OWED, and the ledger's leg cell becomes a
finding.***

### 5.2 The legs this unit MUST run — THE FIVE, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — for this unit it proves **three pure functions' return values, two seam invocation counts, and the byte-identity of one returned string**, and **nothing** about a stylesheet, a computed style, a layout pass, a browser's acceptance, a `:has()` match or the app (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the three type declarations, the three value signatures and the returned record's members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild: **the built output set is `SIX` files — the FIVE `esbuild` outputs (four `src/main/**` bundles + the renderer bundle) plus the copied `dist/renderer/index.html`.** **This unit adds a module imported by nobody, so the output set must be UNCHANGED** — **a bundle census that changed is a FINDING, and a census that did NOT change is not evidence the module works.** |
| **4** | **test-layer typecheck** | `npm run typecheck:tests` | **[H]** (the additive fourth leg, `AGENTS.md` item 4) | compiles the whole `tests/**` tree under the same strictness a unit's own leg 5 uses. **`tsconfig.json` excludes `tests`, so a unit that cites typecheck as evidence about its OWN test file must cite THIS leg.** |
| **5** | **standalone strict `tsc --noEmit` over `tests/container.test.ts`** — the named leg for `R-5`(b) | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts three **TYPE-ONLY** names, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while leg 2 does not compile `tests/**` at all. **A DONE row that reports `R-5`(b) as green must cite THIS leg, not a runtime assertion.** **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION** (ruling 6's family rule): it adds **no script to `package.json`, no dependency and no diff-scope row**, and **no register row depends on it.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as the family requires.
A one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — **and in particular NOT for
   the declaration being APPLIED, NOT for containment taking effect, NOT for a layout or paint boundary,
   and NOT for a stylesheet or `:has()` rule matching.** **`[U]` is the real-Electron observation leg
   (`npm run ui`, landed by `U-REALDOM-BOOT`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, in two parts, and this is why it is STRUCTURAL rather than a leg-availability
   excuse: (a) the module is imported by NO `src/**` file** (`R-12`, `F-11`) — **so there is NO RENDERED
   SURFACE TO OBSERVE**; **and (b) the module READS NO COORDINATE, NO GEOMETRY AND NO ELEMENT** (`E5-B-2`
   — the no-reach clause; `R-6`, `I-8`) — **so there is NOTHING FOR A MEASURING LEG TO MEASURE.** **The
   `ui` leg exists and is green, and the divergence leg is green — the refusal is not an excuse about the
   legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row may not be moved to the
   `ui` leg silently."*** **Any later pass that wants a rendered-geometry row for this family must get it
   from the unit that OWNS the rendered surface** — whose spec, preconditions and `[U]` battery are its
   own, and which `E5` does NOT owe. **A `[U]` row moved here silently is `§4.4 S-CT-10`, and it does not
   land.**

**THE READER QUESTION, ANSWERED: `NONE` — and this is the answer the gate-1 record fixed, carried with its
evidence.** `ci-ui-leg.md` `§3.0 R2` **already spends the leg's ONE measurement** (*"A second measurement
is a new design decision"*, its `§1` item 3); `ci-ui-leg.md` `§2.1` item 6 **names CSS resolution as
outside the leg** (*"rendered geometry, **CSS resolution**, layout, IPC behaviour, and *any* attribute row
— all four are **outside** this leg"*); and `H-r10`'s extractor is an **attribute-presence channel that
CANNOT READ A DECLARATION**. **So NO instrument on any layer this repo owns reads the applied declaration
back — which is why the APPLIED half is REFUSED rather than promised, and why the RETURNED-TEXT reading is
the only one under which the unit's central artifact is `[T]`-provable** (`E5-B-1`; `S-CT-13`).

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED, AND THE NON-CLAIM IS RECORDED IN THESE
WORDS** (the sibling form is `relocate.md` `I-15`). **The divergence leg (`npm run divergence`, `N = 9`
pinned) and its landed extension channel are green** (`U-DIVERGENCE-EXT`, `C2`, `DONE`) — **but this
unit's contract needs nothing from them**: its rows assert **return values, invocation counts and the
byte-identity of one string**, and a divergence harness can only compare **a shim's rendering against a
real host's** — which is a claim about a **RENDERED SURFACE**, and **this unit authors none.**
**`R-6`/`R-9` are the probes that keep the non-claim falsifiable**, and **no pass may claim `[D]` evidence
from the existing pinned leg, from this unit's node green, or from an assumed `C2`.**

**GATE 6 IS `STRUCTURAL`, NOT WAIVED.** **The word is `STRUCTURAL` and the word `waived` is FORBIDDEN
here.** The live-app verification gate is **not waived by this filing and not satisfied by it either**:
**gate 6's honest status is that the live app CANNOT REACH this module** — it is imported by no `src/**`
file and appears in none of the built outputs — **so gate 6 is closed by the same structural reason `[U]`
is refused** (the shape `docs/specs/gsession.md`'s `CURRENT STATE` and `docs/specs/gutter.md` `§5.2`
already use), **and the DONE row must STATE the structural reason rather than omit the gate.**
**A DONE row that reports gate 6 as *"waived"* is a review finding; the correct form is *"structural — no
importer, no rendered surface, and the reason stated"*.**

**THE `§7.1` PREDICATE DECISION, RECORDED — `DOES NOT TRIGGER`.** *(`docs/specs/user-flow-audit.md` `§2`
requires the decision to be RECORDED either way — *"the decision is RECORDED either way (`TRIGGERS` or
`DOES NOT TRIGGER`, with the evidence that decided it)"* — never from preference.)* **DECISION — `DOES
NOT TRIGGER`, on both limbs, from this unit's own recorded change set and not from preference:**
**Limb A (`DOM-SHIM-BLINDNESS`) does not hold** — **the change authors NO rendered surface**: no element,
no node, no class, no text, no style, no attribute, no cursor and no geometry (`I-7`); **Limb B
(`UI-OVERHAUL`) does not hold** — **the module is imported by no `src/**` file and changes no user-visible
flow.** **THE EVIDENCE THAT DECIDED IT:** `§5.1`'s allow-list contains **no `src/renderer/**`, no
`src/shared/demo-envelope.ts` and no authored class write or declaration-applying probe**, and `§1` item 6
records that `docs/skills/designing-pages.md` does not exist, so there is no live surface for the audit to
reach. **ITS FALSIFIER:** the `§5.1` sentence above — **a diff scope admitting a renderer path, the demo
envelope, an authored class write or a probe that applies the declaration FIRES the predicate, makes the
three-part refusal unavailable, and converts the ledger's leg cell into a finding.** **CONSEQUENCE,
stated so the exemption is not confused with an empty report: NO `§5.U` matrix and NO `§6.1` report are
emitted, and the exemption is RECORDED with its reason** — *"'no report' and 'an empty report' are
different artefacts and the first is the only admissible form of the exemption."* **AND THE COST OF THE
INVERSION IS ALREADY MEASURED IN THIS REPO, so the decision is not free:** `docs/specs/
gutter-ui-live-battery.md`'s `ADV-GU-1` is the measured cost of wiring a mechanism live — the authored
status node read `100` BEFORE → `110` AFTER, i.e. **a live battery is what makes a rendered claim
provable, and it is exactly what a `[T]`-only mechanism does not owe.**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE
items**:

1. **Unit + wave + status**: `U-CONTAINER` · wave **E** (ledger row `E5`) · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"a pure, total, stateless `src/shared/` mechanism of
   three functions and nothing else: the caller's token mapping SELECTED and its answer handed on
   unchanged, the caller's orientation value NORMALIZED from an opaque caller edge and handed on
   unchanged, and the ONE shipped declaration `contain: layout style paint` RETURNED AS UNPARSED TEXT
   beside the caller-supplied class name; the mirror-class taxonomy is the CALLER's and appears in NO
   module byte; **the unit performs NO WRITE OF ANY KIND**; **no coordinate, no geometry and no element
   read**; **no import statement of any kind**; **no store, no cache, no module-level state, no session,
   no CSS file, no selector, no shim member, no MCP surface and no UI**."* **A DONE row that does not state
   this is a review finding** — it is the unit's defining constraint (`§1` items 2/3/4/5; `§2.5`).
3. **The surface confirmation, explicitly**: *"`src/shared/container.ts` exports exactly **THREE value
   exports** (`tokensFor`, `orientationFor`, `containerDeclarationFor`) and **THREE type declarations**
   (`AxisResolver`, `ChromeTokenFn`, `ContainerDeclaration`) — **`3 + 3 = 6` names** — its **own-seam set
   is EMPTY** (no factory, no options object, no session), its **only two contract edges are the injected
   callables `tokenFn` and `axisResolver`, both REQUIRED with declared degradations**; it imports
   **NOTHING — not even type-only**; and it is **imported by NO `src/**` file**."* **The census is
   `§2.1`'s and `R-5` is its row.** **A DONE row that prints a seventh exported name, or that omits this
   census, is a review finding.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register
   rows ran and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**`
   ONLY*** · `npm run build` `[H]` (**the `SIX`-file output set**, and whether it was byte-identical) ·
   `npm run typecheck:tests` `[H]` · **leg 5** (the standalone strict `tsc` over `tests/container.test.ts`)
   — **and the explicit sentence that the node-suite green is envelope/pure-layer evidence and NOT
   assembled-app evidence**, and for this unit **that it proves nothing about a stylesheet, a computed
   style, an applied declaration, a containment boundary, a layout or paint pass, a rendered class or a
   `:has()` rule** (`RCA-12`).
7. **The `[U]`/`[D]` status, the recorded `§7.1` decision, and gate 6's structural status**: **`[U]` not
   offered**, with `§5.2`'s **THREE-PART** clause (the refusal · the structural reason — no importer; no
   coordinate/geometry/element read · the `zones.md` `§4.4 S-6` sentence); **the reader question answered
   `NONE`** with its evidence; **`[D]` not claimed**, with its `PRECONDITION-GATED` status; **the `§7.1`
   predicate decision re-stated as `DOES NOT TRIGGER` with its evidence and its falsifier**; **gate 6
   stated as `STRUCTURAL`, never `waived`**, with its reason. **A DONE row that claims a rendered, applied
   or computed-style proof, a `[D]` row, or a waived gate 6 is a review finding.**
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, **MANDATORY per completed unit**,
   **including the gate-11 read-only PBT audit of `§5.5.1`'s executed tables and the pool-versus-boundary
   check re-run against the landed tables**) and the **blind-greens + per-unit documentation-review
   records** (`AGENTS.md` items 10a/10d, RCA-4/RCA-6 — the blind set is
   **`docs/specs/container-greens.md`**). **A DONE row that cites no adversarial pass is a review
   finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this
   unit has NO live dependency (`SCH-10` is a disposition, not a unit), that `U-RELOCATE`/`U-ZONES`/
   `U-CENSUS`/`U-GUTTER` are SIBLINGS and NOT dependencies in either direction, and that the owed tracker
   items of `§7` item 11 are discharged or re-parked with owners.**
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken · controls** counts, **each row's strategy id (`S-CT-*`)**, the **pinned
    seed `20260927`** and its **step form** for `P-CT-TP-1`, the **stop-after-5-consecutive-failures
    status** (`not triggered`, or `triggered at row …`), the **total attempts reported against the `≤400`
    cap** with **every row's count against the `≤100` per-row cap**, and **the explicit sentence that
    every row whose property text quantifies over a domain larger than its table carries the `(bounded)`
    marking and is NOT a proof of the unbounded universal it states.** **A DONE row that reports the
    register as "executed" without these per-row counts and strategy ids is a review finding** — the
    markings are **execution DESIGN**, and **a read-only PBT audit may not accept this spec's table
    alone**: it reads the counts here **and** the TestWriter's tables in `tests/container.test.ts`.
11. **The register's ARITHMETIC.** The DONE row must print the **total WITH its per-row terms** —
    **`154` = `40` (`P-CT-IM-1`) + `26` (`P-CT-IM-2`) + `17` (`P-CT-IM-3`) + `10` (`P-CT-IM-4`) + `12`
    (`P-CT-IM-5`) + `5` (`P-CT-IM-6`) + `3` (`P-CT-SM-1`) + `5` (`P-CT-SM-2`) + `5` (`P-CT-SM-3`) + `14`
    (`P-CT-TP-1`)** — **and must reconcile that figure against the tables the test file actually
    produces**: **a total that is not the sum of its own terms is a review finding**
    (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE). **Where a row's attempts
    are several assertions over ONE execution, or a count of DISTINCT inputs rather than of DRIVES, the
    DONE row must report BOTH the declared attempts and the honest DISTINCT-DRIVE figure** — here
    **EIGHT rows carry two differing figures, NAMED (`§5.5.2` item 3's ledger is the authority, and this
    item does not restate it exhaustively): `P-CT-IM-1` `40`/`33` · `P-CT-IM-2` `26`/`22` ·
    `P-CT-IM-3` `17`/`12` · `P-CT-IM-4` `10`/`5` · `P-CT-IM-6` `5`/`4` · `P-CT-SM-2` `5`/`4` ·
    `P-CT-SM-3` `5`/`3`** — **and `P-CT-TP-1`, whose `14` DRAWS carry a REPORTED, never-asserted,
    distinct-member count — a DRAW IS NOT A SWEEP, and a DONE row claiming full pool coverage is a review
    finding.** **The DECLARED figures are what the caps are compared against; the distinct figures are
    reported BESIDE them and never substituted** — **a DONE row that quotes the total alone, or that
    substitutes a distinct-drive figure in the cap comparison, is a review finding.**
    **⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.4, part D): THE DECLARED TOTAL THIS ITEM NOW PRINTS IS `151` = `48` (`P-CT-IM-1`) + `26` (`P-CT-IM-2`) + `23` (`P-CT-IM-3`) + `10` (`P-CT-IM-4`) + `12` (`P-CT-IM-5`) + `5` (`P-CT-IM-6`) + `3` (`P-CT-SM-1`) + `5` (`P-CT-SM-2`) + `5` (`P-CT-SM-3`) + `14` (`P-CT-TP-1`), chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14` = `151`; caps re-checked — `151 ≤ 400` and the largest row `48 ≤ 100`; the `(bounded)` set unmoved at `5` of `10`; the two RE-DERIVED terms are `P-CT-IM-1` `40 → 48` and `P-CT-IM-3` `17 → 23`, and `151` is NOT the as-filed `154` (which was a mis-sum: they are one `3` apart and unrelated). A DONE row that presents `154` as the declared total, or that presents `137` as the current one, is now a review finding; one printing them BESIDE `151` as annotated provenance is correct.** **The note-7.2 paragraph below is kept visible as the intermediate amended form.**
    **⟶ AMENDED 2026-09-27 (`§0A` note 7.2): THE DECLARED TOTAL THIS ITEM THEN PRINTED IS `137`:**
    **`137` = `40` (`P-CT-IM-1`) + `26` (`P-CT-IM-2`) + `17` (`P-CT-IM-3`) + `10` (`P-CT-IM-4`) + `12`
    (`P-CT-IM-5`) + `5` (`P-CT-IM-6`) + `3` (`P-CT-SM-1`) + `5` (`P-CT-SM-2`) + `5` (`P-CT-SM-3`) + `14`
    (`P-CT-TP-1`)**, chain **`40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 → 123 → 137`**, subtotals
    **`IM 110` · `SM 13` · `TP 14` = `137`**; **caps re-checked — `137 ≤ 400` and the largest row
    `40 ≤ 100`**; **the `(bounded)` set UNMOVED at `5` of `10`**; **the as-filed `154`, its as-filed chain
    and the as-filed `127` subtotal all stay VISIBLE as annotated provenance**
    (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1). **THE DONE ROW OWES `137` WITH ITS TERMS; a
    DONE row that still presents `154` as the declared total is now a review finding, while one printing
    `154` BESIDE `137` as the annotated as-filed form is correct. THE REGISTER HARNESS'S RE-GRAIN IS OWED
    SEPARATELY (`§0A` note 7.3). NO per-row term, row id, strategy id, seed or cap is moved.**
12. **The `§5.3` → `§5.5` numbering note, cited**: **there is NO `§5.4`** — the gap is DELIBERATE and is
    the family's (`docs/specs/gutter.md` `§5.3`'s own note). **This file also has NO `§5.5.0`**: it was
    filed **after** the gate-11 ruling and carries its register **from the start**, so there is no
    superseded zero-row exemption to keep visible. **A DONE row that reports a `§5.5.0` exemption for this
    unit is citing a clause this file does not contain.**

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`AGENTS.md` item 11 makes the register MANDATORY BEFORE the red set for a code-bearing unit.**
**This repo HAS NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the **five keys**
`@types/node`, `electron`, `esbuild`, `typescript`, `vitest` — **no `fast-check`, no `hypothesis`, no
property runner**. **This unit is CODE-BEARING** (three exported functions, two injected seams, a
totality surface and a byte-identity claim), so the **recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it**
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`). **There is NO `§5.5.0` in this file** — no superseded exemption
exists to keep visible. **`§5.5.1` below is therefore a real typed register**, executed by **plain
deterministic vitest tables**, **with NO new dependency, no sixth leg and no `package.json` change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).**
**A register ENUMERATES every discernible testable property of its unit; the per-section threshold (`≤8`)
is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates `10` rows carrying `10` TERMS
and reports the count as its EXTENT — no property was dropped, merged or left unenumerated to fit a
threshold — and `10` ROWS / `10` TERMS IS AN OUTCOME.** **THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S
OWN FORM: the `10` rows are ABOVE the `≤8` signal for exactly the reasons the gate-1 record's gate-11
assessment names, and each is a GENUINELY SEPARABLE observation rather than a split for its own sake:**
**(a)** the record requires an **EMPTINESS-AUTHORITY row** and a **CLASS-OWNERSHIP/IDEMPOTENCY row** that
its own seven-row sketch did not carry (`container-review.md` `§9.5.3`), and **both are rows here**
(`P-CT-IM-2`, `P-CT-IM-3`); **(b)** a **member-census/return-shape row** is separable from the
**declaration-text identity row** because **one pins STRUCTURE and the other pins VALUE** (`P-CT-IM-5`
vs `P-CT-IM-4`) — a fused row would be passable by a module whose record shape is wrong but whose text is
right; and **(c)** the returned record's **constancy across repeated calls** is a **purity/idempotence**
claim over a THIRD function whose two siblings have their own rows (`P-CT-IM-6`). **NO PROPERTY WAS
DROPPED, MERGED OR LEFT UNENUMERATED TO FIT A THRESHOLD.** **THE BREAKDOWN RECOMMENDATION, named once
(`§5.5.2` item 1): `P-CT-IM-1`'s two halves (selector purity and totality) and `P-CT-IM-4`'s two
observables (byte-identity and no-parse) are each separable in principle; splitting them is NOT owed,
NOT done, and changes no term.**

**THE REGISTER'S OWN STRUCTURE, stated once so the numbering is not read as an error: the `§5.3 → §5.5`
gap (there is NO `§5.4`) is DELIBERATE and is the family's** — the same gap in `docs/specs/gutter.md`,
`gsession.md`, `zones.md`, `census.md`, `projection.md`, `listhost.md` and `slothost.md`, **recorded by
their documentation reviews** (`AGENTS.md` item 10d / RCA-6). **`§5.3` is the DONE row's shape and `§5.5`
is the property register; NO clause is missing — the section simply does not exist, and renaming or
renumbering is FORBIDDEN for citation stability.** **This file has NO `§5.5.0`.** **`§5.5` is followed by
`§5.5.1`, `§5.5.2` and `§5.5.3`, and nothing else.**

#### 5.5.1 THE REGISTER — **`10` typed ROWS carrying `10` TERMS, in THREE families, ALL executed by design**

**⟶ AMENDED 2026-09-27 (`§0A` note 8.4, part D) — THE DECLARED TOTAL IS NOW `151`, AND TWO OF THE TEN TERMS ARE RE-DERIVED: `P-CT-IM-1` `40 → 48` (`8` `chrome` shapes × `5` `tokenFn` shapes, `40`, PLUS the `8` per-shape identity drives, which ARE drives: each a `row.run` with its own fresh `chrome` value, its own recorder and its own assertions) and `P-CT-IM-3` `17 → 23` (`7` usable class-name shapes + the landed `UNUSABLE_CLASS_NAMES` table's `16` entries; the write-log positive control is reported BESIDE the term, in neither figure).** **NEW ARITHMETIC, printed WITH its terms and its chain: `151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14` · chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151` · subtotals `IM 124` · `SM 13` · `TP 14` = `151`.** **CAPS RE-CHECKED: `151 ≤ 400` (total headroom `249`), largest row `48 ≤ 100` (`P-CT-IM-1`, headroom `52`). THE `(bounded)` SET IS UNMOVED AT `5` of `10` (`P-CT-IM-1` · `P-CT-IM-4` · `P-CT-IM-5` · `P-CT-SM-3` · `P-CT-TP-1`). NO row id, strategy id, seed (`20260927`) or cap moved, and all ten cells below stay VISIBLE with the two re-derived enumerations annotated IN PLACE.** **`151` IS NOT THE AS-FILED `154` (a mis-sum, `137 + 17`): they are one `3` apart and unrelated.**

**What this section is, in one sentence.** A **typed register of `10` rows / `10` terms** whose **FIVE
genuine quantifications** — (i) *the selector's purity and totality over the whole `chrome`/`tokenFn`
shape space*; (ii) *the one-authority rule, over every member shape a mapping could carry*; (iii) *the
class name's return-only behaviour, over the whole class-name argument space*; (iv) *the declaration
text's byte-identity and its non-parse, over every call*; and (v) *the totality universal over hostile
arguments and hostile callables* — are **executed here as quantifications over finite, pinned
enumerations**, **hand-rolled and deterministic, with no new dependency**.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-CT-*`** (`CT` = this
unit, **c**on**t**ainer) — so **a register row is never mistaken for a `§3` row** (whose families are
`M-*`/`F-*`/`I-*`/`R-*`/`X-*`) **and never for a sibling's register** (`P-RL-*`, `P-GT-*`, `P-GU-*`,
`P-GS-*`, `P-ZN-*`, `P-CN-*`, `P-PJ-*`, `P-LH-*`, `P-SH-*`). **The three families are the type algebra
`docs/specs/engine-pin.md` `§5.5` pins**: **`IM`** = injected seams and invariants · **`SM`** = the
purity/statelessness discipline · **`TP`** = totality. **The strategy-id prefix is `S-CT-*`, one per
row** — **TEN ids, one per row: `S-CT-ENUM-1` · `S-CT-EMPTY-1` · `S-CT-CLASS-1` · `S-CT-DECL-1` ·
`S-CT-SHAPE-1` · `S-CT-CONST-1` · `S-CT-STATELESS-1` · `S-CT-CALLCOUNT-1` · `S-CT-NORMALIZE-1` ·
`S-CT-TP-1`** — of which **NINE are ENUMeration strategies and ONE (`S-CT-TP-1`) is the pinned-seed
GENERATOR.** **EACH ROW'S OWN CELL NAMES ITS ID, THE IDS ARE DISTINCT, AND NO ROW IS LEFT WITHOUT ONE.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/container.test.ts`,
   `§4.1`/`§5.1`) — the file the red set already owes, and the file the register **rides as part of the
   red** (`§4.2` item 5). **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript
   inside the test file.** **ONE row uses a generator** — `P-CT-TP-1` — and **it is pinned to literals in
   the test file itself: a hand-rolled 32-bit LCG with `state₀ = 20260927`; `stateₙ₊₁ = (stateₙ · 1664525
   + 1013904223) mod 2³²`; and EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state selecting the
   pool member — `index = stateₙ₊₁ mod pool.length`, with `pool.length = 14`** — so **one pool draw
   consumes exactly ONE LCG step.** **Stated so no TestWriter reads a two-step or a scaling form into it:
   there is NO `next(k)` helper in this register, and `pool.length` participates in NO rule beyond that
   one modular reduction.** **No `Math.random`, no wall-clock seed, no shrinking, no adaptive input
   search.** **Every other row's table is fixed and enumerated.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows
   evaluated **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
   remaining attempts are abandoned and no further row starts). **A register row is never refused on the
   ground that "no PBT harness exists."**
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** **No `§3` row is
   weakened, widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set
   exactly, and **a row whose property text quantifies over a domain LARGER than its table carries the
   explicit `(bounded)` marking** (`§5.5.2` item 2).
6. **The register's own boundaries, named rather than silently relied on:** **(a) NO DOM, NO ELEMENT AND
   NO COORDINATE IS NEEDED OR USED BY ANY ROW** — every row drives **pure arguments, recording
   closures, a recording element for the write-log only (never passed to the module) and throwing
   stubs**; **(b) the hostile shapes are FIXED table members, deliberately, so no draw is ambiguous** —
   **the `P-CT-TP-1` pool's members are all totality INPUTS whose declared outcomes are stated;**
   **(c) each row's pool/table is a SUBSET of the input space this contract pins**, and **its silence
   about a shape it does not list is a stated boundary, not an unrecorded omission** (the pool omits a
   revoked `Proxy`, a `Symbol.toPrimitive` that throws, and a seam whose getter returns different answers
   on successive reads — the last because it would make a draw ambiguous); **(d) `P-CT-IM-1` carries the
   selector's purity/totality, `P-CT-IM-2` the one-authority discipline, `P-CT-IM-3` the return-only
   class name, `P-CT-IM-4` the declaration's byte-identity and non-parse, `P-CT-IM-5` the record shape,
   `P-CT-IM-6` the cross-call constancy, `P-CT-SM-1` the statelessness, `P-CT-SM-2` the once-and-unchanged
   call discipline for `tokensFor`, `P-CT-SM-3` the same for the orientation path plus its idempotence,
   and `P-CT-TP-1` the totality universal — **and NO OTHER ROW MAY BE QUOTED FOR ANY OF THEM.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-CT-IM-1`** *(the selector's purity and totality — **the row that closes the "no shape gate" question**)* | `P-IM` invariant | **For EVERY `chrome` shape in the row's `8`-shape domain AND EVERY `tokenFn` shape in its `5`-shape domain, `tokensFor` behaves EXACTLY as declared: it returns `tokenFn(chrome)` BY IDENTITY where `tokenFn` is callable, `undefined` where it is absent / non-callable (ZERO invocations) and `undefined` where it THROWS (the attempt counted ONCE and the throw ABSORBED) — and for EVERY cell it THROWS FOR NONE, coerces nothing, merges nothing, re-keys nothing and reads NO member of `chrome`.** | **YES (bounded — the property text says "EVERY shape" while the table drives `8` × `5` cells and `8` further drives; the universal is NOT proven)** | `M-1`, `M-2`, `M-4`, `M-5`, `M-12`, `F-1`, `F-3`, `F-5`, `I-1`/`I-3`, `§2.3` items 1/3, `§2.4`'s two-edge table | `S-CT-ENUM-1` | **`40` attempts** = **`8` `chrome` shapes × `5` `tokenFn` shapes.** **⟶ AMENDED IN PLACE 2026-09-27 (gate 4, `§3b`'s audit table; the arithmetic is `§0A` note 8.4's): THE DECLARED TERM THIS CELL CARRIES IS `48`, NOT `40` — `48` = `8` × `5` (`40`) PLUS the `8` further drives, WHICH ARE DRIVES; the as-filed `40` wording stays VISIBLE at the head of this cell, per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1.** **The `8` `chrome` shapes:** **(1)** a frozen record with own keys · **(2)** `Object.create(null)` with own keys · **(3)** a `Map` carrying an `is-empty` key · **(4)** `null` · **(5)** `undefined` · **(6)** a `Symbol` · **(7)** a `12n` · **(8)** a `Proxy` whose `getOwnPropertyDescriptor`/`ownKeys`/`has` traps THROW. **The `5` `tokenFn` shapes:** **(1)** a callable returning an opaque sentinel OBJECT · **(2)** a callable returning a PRIMITIVE (`0`, `''`, `false`) · **(3)** ABSENT (the member omitted / carried as `undefined`) · **(4)** NON-CALLABLE (`42`, `'x'`, `{}`, `[]`, a `Symbol`, a `12n`) · **(5)** a callable that THROWS. **Per attempt assert:** the declared return value (identity by `toBe` where the caller's answer is an object, `===` where it is a primitive), the recorded invocation count (`1` for shapes `(1)`/`(2)`/`(5)`, `0` for `(3)`/`(4)`), that the SEAM received the `chrome` value BY IDENTITY, and that NOTHING THREW. **The `8` further drives BESIDE the term:** each of the `8` `chrome` shapes driven once with shape `(1)`, asserting the answer's identity and the argument's identity (these are ASSERTIONS over the same grid, reported beside the term — see `§5.5.2` item 3's ledger and the `(bounded)` marking's own words). |
| **`P-CT-IM-2`** *(the one-authority / emptiness row the gate-11 assessment REQUIRED)* | `P-IM` invariant | **For EVERY member-key shape in the row's `5`-shape domain AND EVERY `tokenFn` shape in its `2`-shape domain: the module CONSULTS NO MEMBER OF `chrome` FOR ANY DECISION — the returned value is the caller's own answer, UNCHANGED, so a `chrome` carrying `empty`, `is-empty`, `is-minimized` or `is-revealed` produces the SAME value it produces without that member; no prototype member is read; and `Map.prototype.get` is invoked ZERO times by the module.** **THE `B-3` DEFAULT'S FALSIFIABLE HALF (`§2.3` item 3): unaffectedness, asserted under BOTH of its readings.** | **YES** *(the `5` key shapes × `2` `tokenFn` shapes is the declared grid, and each cell has its own declared pair — the same returned value as the corresponding member-free cell)* | `M-6`, `F-5`, `I-2`, `I-5`, `§2.3` item 3, `§2.2` `P-CT-12`/`P-CT-13`, `R-13` | `S-CT-EMPTY-1` | **`26` attempts** = **`5` member-key shapes × `2` `tokenFn` shapes (`10`) + `16` further control drives.** **The `5` member-key shapes:** **(1)** a record with NO taxonomy member · **(2)** a record carrying `empty: true` · **(3)** a record carrying `is-empty: 'yes'` · **(4)** a record carrying `is-minimized: true` and `is-revealed: false` · **(5)** a `Map` whose KEY is `is-empty` with value `true`. **The `2` `tokenFn` shapes:** **(a)** a callable returning a sentinel OBJECT (identity is the assertion); **(b)** a THROWING callable (the declared EMPTY answer is the assertion, and the throw must not reach the member path). **The `16` further drives, each named so the row's boundary is exact:** **(i)-(iv)** a `Map.prototype.get` spy installed over a reversible patch, driven with shapes `(5)`/`(1)` under `(a)` and `(b)`, asserting the SPY's count is `0` (the module never calls it); **(v)-(viii)** a prototype trap: `chrome` = `Object.create({ get is-empty() { throw new Error('x') } })` plus the same with `get empty`, `get is-minimized`, `get is-revealed`, each asserting the declared value and NO throw; **(ix)-(xii)** the four member shapes `(2)`-`(4)` plus `(1)` driven a SECOND time under `(a)` asserting the returned value is the SAME VALUE the member-free cell returned (the unaffectedness clause, by identity); **(xiii)-(xvi)** the `B-3` alternative-reading control: the same four drives with the record's member set to the OPPOSITE value (`empty: false`, etc.), asserting the SAME returned value — so a module whose answer tracks the member FAILS under EITHER `B-3` reading. **Per attempt assert:** the declared return value, the absence of any member-derived branch, and the spy/trap counts. |
| **`P-CT-IM-3`** *(the class name is RETURNED, never WRITTEN — the gate-11 assessment's CLASS-OWNERSHIP/IDEMPOTENCY row, in its `E5-B-1` form)* | `P-IM` invariant | **For EVERY class-name argument shape in the row's `23`-shape domain (`7` usable + `16` unusable) — AS FILED the row read *"the row's `17`-shape domain"*, a stale figure note `8.4` re-derived because the `10` was a SUBSET of the row's own declared class-name domain (`§2.5` item 3 and `§3.2 F-7` enumerate the full `16`) — this clause is CORRECTED HERE IN THE CELL and the as-filed `17` wording stays visible in this parenthetical: `containerDeclarationFor` returns `className` VERBATIM BY IDENTITY where the argument is a STRING of length ≥ 1, and the declared EMPTY `''` where it is ANY OTHER VALUE — `toString`/`valueOf` are never consulted, NOTHING THROWS, and the module performs NO WRITE OF ANY KIND (no class, no style, no attribute, no property, no node) — verified against a runtime WRITE-LOG over a recording element that is never passed to the module.** | **YES** *(the `23` argument shapes ARE the declared domain and each has its own declared answer; `23` is under the per-row cap. **AS FILED this cell read *"the `17` argument shapes are the declared domain"* — CORRECTED HERE, not rewritten away, per `§3b`'s `ADV-CT-2` and `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1.**)* | `M-7`, `M-8`, `M-10`, `M-11`, `F-7`, `F-9`, `I-7`, `I-11`, `§2.5` item 3, `§2.3` item 6, `R-10` | `S-CT-CLASS-1` | **`23` attempts** = **`7` USABLE argument shapes + `16` UNUSABLE argument shapes, one drive each.** **(AS FILED this cell read *"`17` attempts = `7` USABLE argument shapes + `10` UNUSABLE argument shapes, one drive each"* — the `10` is SUPERSEDED and stays visible HERE; the correction is `§3b`'s `ADV-CT-2` / `ADV-CT-5`, and its arithmetic is `§5.5.3`'s and note `8.4`'s.)** **The `7` usable:** `'is-empty'` (a taxonomy spelling used as CALLER DATA — it is the caller's string, and the module returns it verbatim) · `'a'` · `'zone-42'` · a 200-character identifier-shaped string · `'  spaced  '` · `'--custom-prop-shaped'` · `'has space'`. **The `16` unusable (the landed `UNUSABLE_CLASS_NAMES` table's own members; AS FILED this list named `10` — `undefined` · the argument OMITTED (arity zero) · `null` · `''` · `0` · `-0` · `NaN` · `true` · a `Symbol` · an object whose `toString` and `valueOf` THROW — and was a stale SUBSET)**: `undefined` · the argument OMITTED (arity zero) · `null` · `''` · `0` · `-0` · `NaN` · `true` · `false` · a `Symbol` · a `12n` · `{}` · `[]` · a function · a throwing-`toString` object · a throwing-traps `Proxy`. **Per attempt assert:** the `className` member's value (`toBe` for the usable strings, `===` `''` for the unusable); the `declaration` member reads the pinned text; the recording element's write-log reads ZERO writes of every kind; and the drive's own POSITIVE CONTROL — one harness-side write on the same element — reads `1`, so the log is proven live. **THE "IDEMPOTENCY" HALF, in this module's terms, stated because the sibling precedent's question does not transfer: there is NO APPLIER here, so there is no "second application to the same element" and no class OWNERSHIP on an element to decide** — **the idempotence this row carries is the RETURN half: the same argument yields the same two members on every call (`P-CT-IM-6`), and the WRITE count is `0` on every call, which is the strongest possible ownership claim (the module owns no element and no class, so a caller re-applying the text is a NO-OP from this unit's side).** |
| **`P-CT-IM-4`** *(the declaration text is BYTE-IDENTICAL and NEVER PARSED — `E5-B-1`'s `[T]` observable)* | `P-IM` invariant | **For EVERY call: the returned `declaration` is BYTE-IDENTICAL to the pinned constant `'contain: layout style paint'` — `length === 27` and every character code equal — AND the module reads NO byte of it for a decision: no `split`, no `indexOf`, no `RegExp`, no property-name extraction, no rule object.** **AND its `[T]` observability is the WHOLE claim: a browser's acceptance, a computed style or a containment boundary is NEVER asserted, here or anywhere in this register.** | **YES** *(the `5` call shapes × `2` observable classes are the declared grid, and the byte-equality is a closed comparison)* | `M-9`, `M-10`, `F-8`, `I-11`, `§2.3` items 4/5, `R-7`/`R-8`, `§5.2` (the reader question) | `S-CT-DECL-1` | **`10` attempts** = **`5` call shapes × `2` observable classes.** **The `5` call shapes:** **(1)** a usable class name · **(2)** an unusable class name · **(3)** the argument omitted · **(4)** a throwing-`toString` object · **(5)** the same call made a second time in the same drive. **The `2` observable classes, both read INSIDE each attempt:** **(I) VALUE** — `declaration === PINNED`, `declaration.length === 27`, and the character-code sequence equals the pinned constant's; **(II) NON-PARSE** — the drive's own control corpus (a module-shaped string whose declaration is assembled from fragments, and a corpus that splits the text on `':'`) FAILS the row's own assertion while the module's own call PASSES it. **Per attempt assert:** both observables, plus the explicit sentence **the returned-text equality is NOT evidence that the declaration is valid CSS, is accepted by any browser, or applies containment** (`§5.2`). |
| **`P-CT-IM-5`** *(the returned record's MEMBER CENSUS — the row that pins STRUCTURE, kept separable from `P-CT-IM-4`'s VALUE)* | `P-IM` invariant | **For EVERY call shape in the row's `6`-shape domain: the returned record's OWN ENUMERABLE STRING KEYS are EXACTLY `['className','declaration']` — two members, in that order, no third, no getter and no non-`Object.prototype` prototype — and each key's VALUE is a `string`.** | **YES** *(a closed two-name key set under one order, over a fixed `6`-shape table — every cell has its own declared census)* | `M-9`, `F-12`, `§0A` note 5, `§2.1` item 2, `§5.5.1 P-CT-IM-4` | `S-CT-SHAPE-1` | **`12` attempts** = **`6` call shapes × `2` census readings.** **The `6` call shapes:** a usable class name · `''` · `undefined` · a number · a throwing-`toString` object · a `Proxy` whose traps throw. **The `2` census readings, read inside each attempt:** **(i)** `Object.keys(record)` deep-equals `['className','declaration']` (own **enumerable** string keys, in order; a `Symbol` key or a non-enumerable member FAILS); **(ii)** `Object.getPrototypeOf(record) === Object.prototype` and `typeof record.className === 'string'` and `typeof record.declaration === 'string'`. **Per attempt assert:** both readings, plus a control that a record carrying a THIRD member FAILS the row. |
| **`P-CT-IM-6`** *(cross-call constancy — no cache, no drift, fresh record each call)* | `P-IM` invariant | **For EVERY repeated-call shape in the row's `5`-shape domain: five successive calls with the SAME arguments return EQUAL values — `===` for the primitives, the caller's own answer BY IDENTITY on the seam paths, and a FRESH record with the SAME census (`P-CT-IM-5`'s two-member, one-order claim) on the declaration path — and NO observable state differs between the first and the fifth call.** | **YES** | `F-12`, `M-1`..`M-3`, `I-4`, `§2.3` item 5 | `S-CT-CONST-1` | **`5` attempts** = **`5` repeated-call shapes, each driven FIVE times.** **The `5` shapes:** **(1)** `tokensFor` with a conformant pair · **(2)** `tokensFor` with a throwing seam · **(3)** `orientationFor` with a conformant pair · **(4)** `orientationFor` with an absent seam · **(5)** `containerDeclarationFor` with a usable class name. **Per attempt assert:** the five return values' mutual equality (`toBe` where the caller's own answer identity is the claim); on `(5)`, that each returned record is a **distinct object** (`!==` between calls) with the same census and the same two member values; and, at the fifth call, that the seam's recorded invocation count is exactly `5` on `(1)`/`(3)` and exactly `0` on `(2)`/`(4)` — **a count of `6` FAILS this row for a cache or a retained closure.** **⟶ AMENDED 2026-09-27 (`§0A` note 8.3(b)): the record-freshness clause reads DISTINCT IDENTITY ACROSS THE RETURNED RECORDS (pairwise over `i !== j`), never `!sameRef(r, records[0])` — a self-comparison at index `0` that no fresh-record implementation can satisfy; this cell's own *"a distinct object (`!==` between calls)"* is the reading now PINNED for both this row and `F-12`.** |
| **`P-CT-SM-1`** *(the statelessness / purity row — this unit has NO state machine, and this row is the contract that says so)* | `P-SM` state-machine | **The module has NO STATE: no module-level mutable binding, no store, no cache, no `Map`/`WeakMap` of its own, no counter and no memo; its behaviour is a pure function of its arguments in EVERY call position and order — and (c) the module is NOT DESTABILIZED BY ITS OWN CALLS: a call with a throwing seam or a hostile argument leaves an immediately following conformant call behaving exactly like a FIRST call.** | **YES** *(the `3` clauses are each driven, and no clause quantifies over an unbounded domain)* | `M-5`, `M-11`, `M-12`, `F-3`/`F-4`/`F-5`, `I-3`/`I-4`, `§2.2` `P-CT-4`, `R-2` | `S-CT-STATELESS-1` | **`3` attempts** = **`3` clauses.** **(a) ORDER INDEPENDENCE:** three drives of the same argument set in three orders (A-then-B-then-C, C-then-A-then-B, B-then-C-then-A), asserting every return value equals its first-order counterpart. **(b) NO CROSS-CALL COUPLING:** a drive that calls `tokensFor` with a hostile `chrome` (`P-CT-IM-1`'s shape `(8)`), then `orientationFor` with a throwing resolver, then `containerDeclarationFor` with a usable name — asserting each return value equals the SAME call made in isolation on a fresh import. **(c) STABILITY AFTER A THROW:** a hostile drive followed by a conformant drive, asserting the conformant call's own counts (`1`/`1`) and answers. **Per attempt assert:** the equality of the paired readings, and that no module-level binding is read or written (a static companion assertion, reported BESIDE the term). |
| **`P-CT-SM-2`** *(the once-and-unchanged discipline for the selector — `I-1`'s falsifiable half)* | `P-SM` state-machine | **For EVERY call shape in the row's `4`-shape domain: `tokensFor` invokes the caller's `tokenFn` EXACTLY ONCE per invocation, with the `chrome` value BY IDENTITY, and returns that call's answer BY IDENTITY — never a second call, never a retry, never a transformed answer.** | **YES** | `M-1`, `M-2`, `F-1`, `F-3`, `I-1`, `§2.3` item 1, `§2.4` item 1 | `S-CT-ENUM-1` | **`5` attempts** = **`4` call shapes + `1` positive control.** **The `4` shapes:** **(1)** a conformant call; **(2)** a THROWING seam (asserting the ATTEMPT count is `1` and the call is NOT retried); **(3)** a NON-CALLABLE seam (asserting the count is `0` and no coercion was attempted as a call); **(4)** a NON-OBJECT answer (`tokenFn` returning `0`, `''`, `false`, `NaN`, a `Symbol`, a `12n`) — **the answer must be returned VERBATIM and not normalized into a record** (this is the anti-`AU-1` cell: a module that wraps the answer into a `{tokens: …}` record FAILS here). **The `1` positive control:** the same seam called TWICE by the DRIVER (not by the module) reads a count of `2` — proving the recording instrument is live. **Per attempt assert:** the recorded count, the argument identity, the answer identity and the declared value. |
| **`P-CT-SM-3`** *(the once-and-unchanged discipline for the normalizer, PLUS its idempotence — the one-closure rule's falsifiable half)* | `P-SM` state-machine | **For EVERY edge shape in the row's `4`-shape domain AND EVERY resolver shape in its `3`-shape domain: `orientationFor` invokes the resolver EXACTLY ONCE per invocation, with the `edge` value BY IDENTITY, returns that call's answer BY IDENTITY; and TWO invocations with the SAME pair produce the SAME answer — the module holding nothing between them — so a fork that wires ONE closure gets ONE answer for ONE edge.** **AND the module reads no coordinate, no geometry and no element** (`E5-B-2`). | **YES** | `M-3`, `F-2`, `F-4`, `F-6`, `F-12`, `I-1`, `I-10`, `§2.3` item 2, `§2.5` item 2 | `S-CT-NORMALIZE-1` | **`5` attempts** = **`1` grid of `4` shapes (`4`) + `1` idempotence control.** **The `4` edge shapes (the grid row):** **(1)** an opaque object · **(2)** a string · **(3)** `undefined` · **(4)** a revoked `Proxy`. **The `3` resolver shapes, driven as a cross-product within the grid's `4` edge drives (`12` assertions reported BESIDE the term — the grid counts as `4` DRIVES):** a callable returning an opaque object · a throwing callable · an absent/non-callable seam. **The `1` idempotence control:** ONE closure, called twice with the same edge value, asserting the two answers are the SAME VALUE by identity AND the closure's own recorded count is `2` (once per invocation, never cached) — **a module that caches the answer reads `1` here and FAILS.** **Per attempt assert:** the recorded count per invocation, the argument identity, the answer identity, and the absence of any coordinate/geometry/element read (a static companion assertion, reported BESIDE the term). |
| **`P-CT-TP-1`** *(the TOTALITY universal — with its BOUND in its own words, over a pinned-seed pool, and NAMING its entry points and return shapes so the row can FAIL)* | `P-TP` totality | **For EVERY hostile shape drawn from the pinned `14`-member pool: (a) NONE OF THE MODULE'S THREE ENTRY POINTS THROWS — `tokensFor(chrome, tokenFn)` returns the declared value, `orientationFor(edge, axisResolver)` returns the declared value, and `containerDeclarationFor(className)` returns a `{className: string, declaration: string}` record — for ANY argument, INCLUDING `NaN`, `Symbol`, `BigInt`, `Object.create(null)`, a revoked `Proxy`, a trap-throwing `Proxy` and a throwing accessor; AND (b) THE DECLARED RETURN SHAPES HOLD: `tokensFor`'s value is the caller's own answer (or the declared `undefined`), `orientationFor`'s value is the caller's own answer (or the declared `undefined`), and `containerDeclarationFor`'s value is a two-member record whose `className` is a `string` and whose `declaration` is the pinned text — with the callables supplied as conformant recording closures so the SHAPE half is assertable independently of the hostile half.** **The universal is over the DRAWN domain and NOT over the whole input space.** | **YES (bounded — the property text says "EVERY hostile shape" while the pool holds `14` members and the drive performs `14` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-1`..`F-7`, `I-3`, `I-12`, `M-2`, `M-4`/`M-5`, `M-8`, `§2.4`, `§2.5` item 2 | `S-CT-TP-1` | **`14` attempts** = **`14` pinned-seed DRAWS, each applying EXACTLY ONE LCG step (`index = stateₙ₊₁ mod 14`), each draw driven through ALL THREE entry points in sequence.** **THE `14`-MEMBER POOL:** **(1)** `Object.create(null)` with own keys · **(2)** `NaN` · **(3)** a `Symbol` · **(4)** a `12n` · **(5)** a revoked `Proxy` (`Proxy.revocable({}, {})` after `revoke()`) · **(6)** a `Proxy` whose `getOwnPropertyDescriptor`/`ownKeys`/`has`/`get` traps ALL THROW · **(7)** a function · **(8)** an array · **(9)** a frozen record with own keys · **(10)** a record whose own `toString`/`valueOf`/`Symbol.toPrimitive` THROW · **(11)** a `Map` with an `is-empty` key · **(12)** the empty string `''` · **(13)** `undefined` · **(14)** `null`.** **Per attempt assert:** (i) NOTHING THREW from any of the three calls; (ii) `tokensFor`'s value equals the supplied closure's own recorded answer (`toBe`); (iii) `orientationFor`'s value equals the supplied closure's own recorded answer (`toBe`); (iv) `containerDeclarationFor`'s value has `typeof value.className === 'string'` and `value.declaration` byte-equal to the pinned constant; (v) the two closures' recorded counts are `1` and `1`. **THE POOL'S STATED BOUNDARY:** a **revoked `Proxy`** IS in the pool (it is shape `(5)`), while a seam whose getter returns DIFFERENT answers on successive reads is deliberately EXCLUDED (it would make a draw ambiguous, strategy-discipline item 6(b)), and **the pool's silence about any shape it does not list is a stated boundary, not an unrecorded omission.** |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly: `5` of the `10` rows.** **THE MARKED SET, and it is
named IDENTICALLY at this block, at `§5.5.2` item 2 and at the status block's item 3: `P-CT-IM-1` ·
`P-CT-IM-4` · `P-CT-SM-3` · `P-CT-IM-5` · `P-CT-TP-1`.** **Each is marked because its PROPERTY TEXT IS
LARGER THAN ITS TABLE OR ITS ASSERTION SET:** **`P-CT-IM-1`** (*"EVERY shape"* over `8` × `5` cells and
`8` further drives) **⟶ RE-CITED 2026-09-27 (gate 4, `§3b`'s `ADV-CT-3`, whose finding is that this very
clause rested on the note-8.4-declared-WRONG form): THE MARKING'S REASON IS THE RE-DERIVED
`48` = `8` × `5` + `8`, WHERE THOSE EIGHT **ARE** DRIVES — each a `row.run` with its own fresh `chrome`
value, its own fresh recorder and its own assertions (`§0A` note 8.4). THE AS-FILED FORM OF THIS CLAUSE,
KEPT VISIBLE AS THE SUPERSEDED JUSTIFICATION, READ: *"`40` = `8` × `5` (the `8` further drives are
ASSERTIONS over the same grid, printed beside the term)"* — **that clause is WRONG and must not be quoted
as the marking's reason; the marking itself is UNMOVED and the `(bounded)` set is UNMOVED at `5` of `10`.**) · **`P-CT-IM-4`** (*"EVERY call"* over `5` call shapes and `10` observables, whose
value half is a single closed comparison) · **`P-CT-IM-5`** (*"EVERY call shape"* over `6` with `12`
readings — the marking is carried because the census is asserted over a fixed table, not over all
records) · **`P-CT-SM-3`** (*"EVERY edge shape and EVERY resolver shape"* over a `4`-drive grid carrying
`12` cross-product assertions) · **`P-CT-TP-1`** (*"EVERY hostile shape"* over a `14`-member pool and `14`
draws). **THE UNMARKED SET (`5` of the `10` ROWS), named rather than counted: `P-CT-IM-2` ·
`P-CT-IM-3` · `P-CT-IM-6` · `P-CT-SM-1` · `P-CT-SM-2`** — each quantifies over a **CLOSED NAMED LIST, a
FIXED GRID or a fixed drive set whose every cell has its own declared outcome**, so **no marking is owed
and none is printed.** **`5 + 5 = 10`, the register's row count.**

#### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

**Item 1 — the row count is an OUTCOME, and the breakdown signal is recorded ONCE.** **`10` rows carrying
`10` TERMS** were enumerated because **ten discernible testable property classes exist**, and the **`≤8`
threshold is a guidance signal, not a ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
part 1). **THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S OWN FORM — `§5.5`'s three named reasons
(the gate-11 assessment's two REQUIRED additions, the STRUCTURE-vs-VALUE separation, and the third
function's constancy claim), with NO property dropped, merged or left unenumerated to fit a threshold.**
**THE BREAKDOWN RECOMMENDATION (the separable components, named once):** **`P-CT-IM-1`** — its
**selector-purity** half and its **totality** half have different observables (`toEqual`/`toBe` versus
the declared-empty answer) and a future pass **COULD** split it; and **`P-CT-IM-4`** — its
**byte-identity** limb and its **no-parse** limb are separable. **That is a breakdown of TWO rows into
four, not missing properties**, and **it is NOT owed by this filing** — **no row is added, removed or
re-scoped here**, and **`10` rows / `10` terms stay the extent.**

**Item 2 — the `(bounded)` markings, and they are not formality.** **`5` of the `10` rows carry an
explicit `(bounded)` marking — `P-CT-IM-1`, `P-CT-IM-4`, `P-CT-IM-5`, `P-CT-SM-3`, `P-CT-TP-1`** — and
each **says so in its own `Executed?` cell**: *"the universal is NOT proven, and no reader may read this
row as its proof."* **The other `5` rows quantify over CLOSED NAMED LISTS or FIXED GRIDS — no marking is
owed and none is printed** (`5 + 5 = 10`, the register's row count). **A DONE row that reports any of the
five as a proof of the unbounded universal it states is a review finding.**

**Item 3 — THE DECLARED-VERSUS-DISTINCT LEDGER, so the two figures are never conflated and the DECLARED
ones are always the cap comparison.**

| Row | Declared attempts | Its honest distinct figure | Why they differ (stated, not implied) |
| --- | --- | --- | --- |
| `P-CT-IM-1` | **`48`** *(RE-DERIVED, `§0A` note 8.4; the as-written `40` is the cell's superseded form)* | **`33`** | the `8`-shape × `5`-shape grid's **ABSENT/NON-CALLABLE cells read the same module-observable evidence for every `chrome` shape** (the seam is never reached), so `8` cells collapse into `1` reading each; **and the `8` further drives are REPORTED assertions over the same grid, never extra drives** — `40 - (8 - 1) - 0 = 33` **⟶ RE-DERIVED 2026-09-27 (`§0A` note 8.4): THE DECLARED TERM IS `48`, NOT `40` — the `8` further drives are GENUINE DRIVES (each a `row.run` with its own fresh `chrome` value, its own fresh recorder and its own assertions), so they are counted IN the term; the DISTINCT figure is REPORTED and unmoved in kind (the absent/non-callable collapse is the same collapse). The as-filed `40`/`33` stays visible above.** |
| `P-CT-IM-2` | `26` | **`22`** | the `10`-cell grid's shape `(3)` member keys (`is-empty`, `is-minimized`, `is-revealed`) read the SAME module-observable evidence (no member is consulted, so the identity of the key is not observable) — `3` of the `5` key shapes collapse, and the `16` further drives include `3` duplicates of grid cells: `26 - 3 - 1 = 22` |
| `P-CT-IM-3` | **`23`** *(RE-DERIVED, `§0A` note 8.4 — the as-written `17` is kept VISIBLE as this row's superseded form)* | **`17`** *(RE-DERIVED, `§3b`'s `ADV-CT-1` — the printed `12` below is SUPERSEDED and kept VISIBLE)* | the `10` unusable shapes land in **`5` distinct module-observable readings** (`undefined`/omitted · `null` · the falsy primitives · a `Symbol` · a throwing-`toString` object) and the `7` usable strings land in **`1`**, giving `5 + 1 = 6` plus the `6` write-log/write-count readings the drive records separately: **the honest distinct figure reported here is `12`** **⟶ RE-DERIVED 2026-09-27 (`§0A` note 8.4): THE DECLARED TERM IS `23`, NOT `17` — the landed `UNUSABLE_CLASS_NAMES` table holds `16` entries (against the stale `10` this cell's as-filed enumeration names), and each entry is its own drive with its own return-value and write-log assertions, so `7` usable + `16` unusable = `23`; the write-log POSITIVE CONTROL is reported BESIDE the term in neither figure (`§5.5.2` item 9(3)). The DISTINCT figure is REPORTED and unmoved in kind. The as-filed `17`/`12` stays visible above.** **⟶ THE DISTINCT FIGURE IS RE-DERIVED TOO, 2026-09-27 (gate 4, `§3b`'s `ADV-CT-1`): IT IS `17`, NOT `12`.** **THE MEASUREMENT THAT EXPOSED IT: the harness reads `18` distinct while this cell printed `12`, and the `12` was therefore mis-grained in BOTH directions at once.** **THE RE-DERIVATION, printed with its parts and against the CORRECTED domain (`7` usable + `16` unusable), not the as-filed `10`: `1` reading for the `7` usable strings (they land in ONE module-observable class) + `10` readings for the `16` unusable entries (the as-filed `5`-reading collapse was itself derived from the stale `10`-entry set; against the landed `16` the same collapse gives `10`) + `6` write-log/write-count readings the drive records separately = `1 + 10 + 6` = **`17`**. **THE PRINTED `12` IS THEREFORE SUPERSEDED AND IS KEPT VISIBLE ABOVE** *(⟶ ADDED 2026-09-27, GATE 7's `PF-8` — THE THREE FIGURES OF THIS ROW, MADE READABLE SIDE BY SIDE, and stated precisely because they do NOT coincide. **`23` IS THE DECLARED TERM** — the row's drive count (`7` usable + `16` unusable class-name shapes, `§0A` note 8.4). **`18` IS THE FIGURE THE LANDED HARNESS MEASURES *AND* ASSERTS** — the driver's own distinct-reading count over the row (`P-CT-IM-3: 23/18`, the asserted form, measured at the harness's own grain against the landed `16`-entry table). **`17` IS THIS CONTRACT'S RE-DERIVATION** of the distinct figure (`1 + 10 + 6`, above) — a GRAIN the driver does not assert, because the driver's enumeration counts `10` module-observable readings for the `16` unusable entries *plus* its own write-log/write-count readings at a finer split than this cell's `6`. **WHICH FIGURE THE DRIVER ASSERTS: the `18`, against the declared `23` — never the `17`**, so a DONE row or a later pass that reports `17` as *"the figure the driver asserts"* is a review finding, and one that reports `23` as the distinct figure is a second. **NO TERM, ROW ID, STRATEGY ID, SEED OR CAP MOVES FOR THIS ANNOTATION**, and the as-written clauses of this cell (including its `NOT ADOPTED` clause, inside the part of this table cell that this file's own read tool view truncates) are KEPT VISIBLE, unweakened and unread by this pass's tools.)* (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1: annotate, never silently rewrite). **THE `18` THE HARNESS READS IS NOT ADOPTED EITHER: a measured figure is not a declared one, and the two differ by the write-log positive control now reported BESIDE the term (`§5.5.2` item 9(3)) — so the honest distinct figure REPORTED here is `17`, the measured `18` being recorded as the harness's own reading, not as the contract's figure.** |
| `P-CT-IM-4` | `10` | **`5`** | the `2` observable classes are **readings of ONE call each**, and the `5` call shapes differ only in the argument — which the declaration value does not depend on, so the **DISTINCT-DRIVE figure is the `5` call shapes** |
| `P-CT-IM-5` | `12` | **`12`** | the `6` call shapes each carry their own declared census pair and the two readings are distinct observations, so `6 × 2 = 12` are all distinct |
| `P-CT-IM-6` | `5` | **`4`** | the `5` repeated-call shapes' `containerDeclarationFor` case and the conformant `tokensFor` case read the same class of evidence (a stable answer with a rising count), so `1` collapses |
| `P-CT-SM-1` | `3` | **`3`** | three distinct clauses, each a distinct observation |
| `P-CT-SM-2` | `5` | **`4`** | the `1` positive control re-reads shape `(1)`'s instrument rather than adding a distinct module observation |
| `P-CT-SM-3` | `5` | **`3`** | the idempotence control re-reads shape `(1)`'s closure, so the distinct figure is the `4`-shape grid's `3` distinct observable classes (a returned answer, a declared-empty answer, a counted attempt) |
| `P-CT-TP-1` | `14` | **`14` DRAWS** — and the DISTINCT-MEMBER count is a **REPORTED figure, never asserted** | **a DRAW IS NOT A SWEEP**: `14` draws over a `14`-member pool do **not** guarantee that every member is drawn, **and NO row may assert "all 14"** — **a DONE row claiming full pool coverage is a review finding** |

**The DECLARED figures are what the `≤100`/row and `≤400` caps are compared against. The distinct figures
are REPORTED BESIDE them and are NEVER substituted for them** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`,
sub-rule 2; `§5.3` item 11). **⟶ AMENDED 2026-09-27 (`§0A` note 8.4, part D of the second defect-repair amendment): TWO of the ten DECLARED figures in this ledger are RE-DERIVED — `P-CT-IM-1` `40` → `48` and `P-CT-IM-3` `17` → `23` — because the extra executions the green run measured (`48` and `23`) ARE GENUINE DRIVES, each with its own state and its own assertions, and `A DECLARED REGISTER TERM IS A DRIVE COUNT` therefore requires the TERM to follow the drives. `P-CT-IM-1`'s excess `8` are the eight per-`chrome`-shape identity drives, EACH a `row.run` with a fresh `chrome` value, a fresh recorder and its own assertions; `P-CT-IM-3`'s excess `6` are the landed `UNUSABLE_CLASS_NAMES` table's `16` entries against the stale `10` the cell enumerates. `P-CT-IM-3`'s write-log positive control stays BESIDE the term (this item's own `§5.5.2` item 9(3) design), so it is in neither figure. THE NEW DECLARED TOTAL IS `151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14`, caps re-checked (`151 ≤ 400`, largest row `48 ≤ 100`), the `(bounded)` set unmoved at `5` of `10`, and the DISTINCT figures stay REPORTED figures and are still never substituted.** **⟶ AMENDED 2026-09-27 (`§0A` note 7.2): the ledger above is PER-ROW and is
therefore UNMOVED; the DECLARED TOTAL that paragraph printed was `137`** =
**`40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14`**, chain **`40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 →
123 → 137`**, subtotals **`IM 110` · `SM 13` · `TP 14` = `137`** — **the as-filed `154` and its `127`
subtotal stay visible at `§5.5.3`; the `(bounded)` set is unmoved at `5` of `10`.**
**⟶ SWEPT AT THE TAIL 2026-09-27 (gate 4, `§3b`'s `ADV-CT-4`): THIS TAIL STILL PRINTED `137` AS *"the
DECLARED TOTAL"*, which reads as current to any reader who stops here — so THE DECLARED TOTAL THIS TAIL
CARRIES IS `151` = `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 →
127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14` = `151`; the `137` above is the INTERMEDIATE
amended form and the as-filed `154` the SUPERSEDED mis-sum, BOTH readable as provenance and NEITHER
admissible as the declared figure. Cap comparison uses `151` (`151 ≤ 400`, largest row `48 ≤ 100`).**

**Item 4 — a DRAW is not a SWEEP, and the `P-CT-TP-1` pool is a SUBSET of the input space by
construction.** **The pool holds `14` members and the row draws `14` times**, so the row **reports** its
distinct-member count and **asserts nothing about coverage**. **The pool's silence about a shape it does
not list is a stated boundary, not an unrecorded omission**: a seam whose getter returns **different
answers on successive reads**, and a `Symbol.toPrimitive` that throws **only on its second invocation**,
are deliberately **excluded** (the last two because they would make a draw ambiguous, strategy-discipline
item 6(b)). **⟶ ADDED 2026-09-27 (gate 4, `§3b`'s `ADV-CT-6`): THE AS-FILED LIST ABOVE OMITTED A LANDED
MEMBER, and the omission is CORRECTED HERE with the as-filed two-member list kept visible — THE LIST ALSO
EXCLUDES *"a record whose `toString`/`valueOf`/`Symbol.toPrimitive` THROW"*** (the member the landed set
and `P-CT-TP-1`'s own cell describe; it is excluded because a draw whose outcome depends on WHICH conversion
hook a hostile record reaches is AMBIGUOUS in exactly the sense strategy-discipline item 6(b) forbids, and
its home is `P-CT-IM-3`'s domain — where the unusable class names already carry a throwing-`toString`
object and a throwing-traps `Proxy` — never the totality pool). **THREE exclusions are therefore stated:
the successive-read-inconsistent seam · the second-invocation `Symbol.toPrimitive` · the all-three-hooks-
throwing record. The pool's `14` members, the `14` draws and the seed are UNMOVED by this addition.**

**Item 5 — the `S-CT-TP-1` generator's ONE stated bias, recorded rather than hidden.** The pinned LCG's
reduction `index = stateₙ₊₁ mod 14` maps `2³² = 4294967296` states onto `14` residues, and
**`4294967296 mod 14 = 4`**, so **`4` pool indices are reachable from `⌈2³²/14⌉ = 306783379` preimages and
the remaining `10` from `306783378`** — a **relative bias of ≈ 3.3 × 10⁻¹⁰ per draw**, inherited from the
sibling registers' identical one-step form. **⟶ CORRECTED 2026-09-27 (gate 4, `§3b`'s `ADV-CT-8`): THE
PRINTED MAGNITUDE WAS OFF BY ~`10×`.** **THE FIGURE IS `1/306783378 ≈ 3.26 × 10⁻⁹ per draw`** (the
as-filed `≈ 3.3 × 10⁻¹⁰` is SUPERSEDED and kept visible above; the preimage split `4` × `306783379` +
`10` × `306783378` = `4294967296`, the `mod 14` residue, the seed `20260927` and both caps are ALL
UNMOVED — only the printed magnitude was wrong, and the correction makes the bias ~`10×` LARGER, never
smaller). **It is stated so no later pass reads the draw as exactly
uniform; it is not a defect of the row** (the register is a **pinned-seed reproducibility** instrument,
not a sampler), and **the form, the seed and the caps are the ones the ACTIVE rules pin.**

**Item 6 — WHICH ROW CARRIES WHICH CLAIM, so no claim is quoted from a row that does not carry it.** **A
DONE row or audit that quotes the selector's purity/totality MUST cite `P-CT-IM-1`; the one-authority /
emptiness-authority rule, `P-CT-IM-2`; the return-only class name and the zero-write claim,
`P-CT-IM-3`; the declaration's byte-identity and non-parse, `P-CT-IM-4`; the record's member census,
`P-CT-IM-5`; cross-call constancy, `P-CT-IM-6`; the statelessness universal, `P-CT-SM-1`; the
once-and-unchanged call discipline for the selector, `P-CT-SM-2`; for the normalizer, `P-CT-SM-3`; and
the totality universal over hostile arguments, `P-CT-TP-1`.** **NO OTHER ROW MAY BE READ AS CARRYING ANY
OF THEM.**

**Item 7 — THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING.** **The rule: a pool or table member that
CONTRADICTS its own row's declared boundary is a REGISTER DEFECT, and it is checked at AUTHORING TIME,
not at green time — the member must satisfy the row's boundary text, or the row must declare that member
as an intended class with its OWN expected outcome asserted, PER MEMBER.** **The check was run over all
`10` rows, and the RESULT is CLEAN for all ten, with NO member requiring a boundary narrowing and NO
row whose table had to be re-scoped.** **The per-row results, each against its OWN boundary text:**

| Row | Its declared boundary | The check's result |
| --- | --- | --- |
| `P-CT-IM-1` | *no shape gate on `chrome`; one call; the answer unchanged* | **CLEAN** — every one of the `8` `chrome` shapes has its own declared value and count on every one of the `5` `tokenFn` shapes, **including the hostile `Proxy` shape `(8)`, which is declared as REACHING the seam by identity with the caller's answer**; the *"EVERY shape"* wording is the `(bounded)` marking's scope |
| `P-CT-IM-2` | *no member of `chrome` is consulted; the returned value is unaffected by any member* | **CLEAN** — the `5` member-key shapes each have their own declared pair, **and the `B-3` alternative-reading drives are DECLARED as asserting the SAME value**, which is exactly the boundary's own words |
| `P-CT-IM-3` | *verbatim for a usable string; `''` otherwise; no write* | **CLEAN** — the `7` usable shapes assert identity and the `10` unusable assert `''`; **the `'is-empty'` usable shape is DECLARED as caller DATA returned verbatim, which is the sharpest cell the boundary could have** |
| `P-CT-IM-4` | *byte-identical for every call; never parsed; never applied* | **CLEAN** — the `5` call shapes all assert the same 27-code sequence, **and the non-parse observable's FAILING control corpora are DECLARED AS FAILING**, which is what a positive control is |
| `P-CT-IM-5` | *exactly two own enumerable string keys, in one order, no getter* | **CLEAN** — a closed two-name list, not a sample; the third-member control is **DECLARED AS FAILING** |
| `P-CT-IM-6` | *equal values across repeated calls; a fresh record each call; no cache* | **CLEAN** — the `5` shapes each have their own declared equality, **and the count-at-the-fifth-call clause is the boundary's own falsifier for a cache** |
| `P-CT-SM-1` | *no state at all; order-independent; stable after a throw* | **CLEAN** — the `3` clauses are all totality/purity inputs with their own declared pairings; **no clause claims a state transition, because there is none** |
| `P-CT-SM-2` | *exactly one invocation per call, argument and answer by identity* | **CLEAN** — the `4` shapes each have their own declared count, **and shape `(4)`'s non-object answer cell is DECLARED as returned VERBATIM (the anti-wrapping cell)** |
| `P-CT-SM-3` | *exactly one invocation, by identity, idempotent, no coordinate read* | **CLEAN** — the `4`-shape grid carries its own `3`-resolver cross-product, **and the idempotence control DECLARES the `2`-count reading that catches a cache** |
| `P-CT-TP-1` | *no entry point throws; the declared return shapes hold* | **CLEAN** — **the pool's members are totality inputs only**: the row claims no value boundary and no code boundary, **the three entry points and their expected return shapes are NAMED in the row's own words**, and **the shapes that make a `chrome`/`edge`/class-name argument hostile are all in the pool while a successive-read-inconsistent seam is deliberately NOT** |

**A register row found to contradict its own boundary at green time is a SPEC FINDING, reported rather
than tuned to green** — and **the LANDED tables must be re-checked by the adversarial pass**, because this
check was run against **this filing's tables**, not against the executed ones.

**Item 8 — THE EXECUTED LAYER IS NOT THIS FILING'S, stated once.** **This pass RAN NOTHING.** Every cell
above is **execution DESIGN**; the **measured** figures are the ones this unit's own
`tests/container.test.ts` and the independent blind run produce. **A read-only PBT audit may not report a
row as executed on the strength of this table alone** — the audit reads **the TestWriter's tables in
`tests/container.test.ts`** **and** this cell's arithmetic.

**Item 9 — A DECLARED-FAILING CONTROL ATTEMPT IS A COUNTED DRIVE AND IS NEVER A `broken` ROW** (the rule
`§0A` note 15 item `S6` of the sibling set landed; carried here because this register has controls too). *(⟶ ADDRESS DISAMBIGUATED 2026-09-27, GATE 7's `PF-5`: this clause's address does NOT resolve inside THIS contract — **this file's notes end at 8** (`§0A` notes 1–8, plus the note-8 parts `8.0`–`8.5`) **and the note-9 block is `§0B`'s, notes 9.1–9.6**, so NO note 15 exists here. **THE ADDRESS NAMES THE SIBLING SET, NOT THIS FILE: the `S6` sub-rule is that sibling unit's own numbered note — cited here for provenance only, exactly as `§0A` note 3 cites `census.md`'s own `§0A` note 3 and note 12. THIS SUBSECTION OF THIS CONTRACT IS THE AUTHORITATIVE TEXT, and it is what the rows must read; the sibling citation is kept, unweakened.**)*
**(1) A CONTROL DRIVE IS A DRIVE**: it is counted in its row's `attemptsRun` **and it is already INSIDE
the row's declared TERM** — `P-CT-IM-3`'s `23` (**AS FILED this parenthetical read *"`P-CT-IM-3`'s `17`"*
— SUPERSEDED, and the `17` is kept visible HERE, per `§3b`'s `ADV-CT-5`, whose finding is that this very
correction repeated the stale figure. **AND THE ROW'S OWN CONTROL IS THE EXCEPTION THIS ITEM'S `8.4`
CORRECTION ALREADY NAMES: the re-derived term `23` is the row's DRIVES ONLY — `7` usable + `16` unusable —
because this item's own sub-rule `(3)` requires the write-log positive control to be reported BESIDE the
term; the clause `(1)` states for the other four rows is UNAFFECTED.**) includes its write-log positive control, `P-CT-IM-4`'s
`10` includes its failing control corpora, `P-CT-IM-5`'s `12` includes its third-member control,
`P-CT-SM-2`'s `5` includes its twice-called instrument control, and `P-CT-SM-3`'s `5` includes its
idempotence control — **because `A DECLARED REGISTER TERM IS A DRIVE COUNT`**. **⟶ CORRECTED 2026-09-27 (`§0A` note 8.4): the parenthetical's FIRST item is WRONG AS WRITTEN and stays visible above — the landed harness reports `P-CT-IM-3`'s write-log positive control BESIDE the term, which is sub-rule (3)'s own design, so that control is in NEITHER figure and `P-CT-IM-3`'s term is its DRIVES only, now re-derived to `23` (`7` usable + `16` unusable). The other four parentheticals STAND AS WRITTEN, because those controls ARE drives contained in their rows' declared domains (`P-CT-IM-4`'s failing control corpora, `P-CT-IM-5`'s third-member control, `P-CT-SM-2`'s twice-called instrument control, `P-CT-SM-3`'s idempotence control).** **(2) A CONTROL'S DECLARED
FAILURE IS AN OBSERVATION, NEVER A BREAK**: the drive CONTAINS the declared-failing shape and ASSERTS it,
so the attempt **HOLDS** and the row's `broken` count stays `0`. **(3) THE RECORD REPORTS THE CONTROLS
BESIDE THE TERM**: a per-row `controls` figure, printed beside `held`/`broken`, **NEVER counted in the
term**. **(4) THE STATUS ROW'S OWN IDENTITY IS PRESERVED**: **`held + broken === attemptsRun` still holds
for every row**, and **`broken === 0` remains the green criterion.**

**Item 10 — THE EXECUTED LAYER'S ONE NAMED COVERAGE GAP (ADDED 2026-09-27, GATE 8 — the honesty surface this
block owed).** **`P-CT-IM-3`'s `23`-shape domain is `7` usable + the landed `16` unusable; a LONE-SURROGATE
class name (`'\uD800'`) is a `string` of length `≥ 1` under `§2.5` item 3's declared domain and is NOT
among the `16`, so the row's declaration covers a shape its table does not drive.** **IT IS NOT A SILENT
ABSENCE — it is a RECORDED OBLIGATION with a named owner (`§3b`'s negative-generator task list item (2),
`OWED — TEST-SIDE`, and the `CURRENT STATE` block's item 11, which pre-commits the term consequence: the
row `23 → 24`, the declared total `151 → 152`).** **THE HONEST READING OF THIS BLOCK, stated so no reader
over-reads it: the `10` rows are `10` OUTCOMES of an enumeration exercise, and THIS ONE IS INCOMPLETE BY
ONE NAMED SHAPE — a DONE row that reports the register as complete while this item stands is a review
finding.**

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**⟶ SWEPT 2026-09-27 (gate 4, `§3b`'s `ADV-CT-4`) — THE DECLARED TOTAL THIS LINE CARRIES IS `151`: `151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`.** **THE AS-FILED FORM OF THIS LINE IS KEPT VISIBLE BESIDE IT, per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1, and it is the SITE `ADV-CT-4` named as reading as current:**

**`154` = `40` + `26` + `17` + `10` + `12` + `5` + `3` + `5` + `5` + `14`** *(AS FILED — the SUPERSEDED mis-sum, retained as the annotated provenance; it is NOT the declared total and MUST NOT be read as one.)*

**⟶ AMENDED AND SWEPT 2026-09-27 (`§0A` notes 8.4 and `§3b`'s `ADV-CT-4`) — THE DECLARED TOTAL THIS SUBSECTION CARRIES IS `151`:** *(⟶ CITATION CORRECTED 2026-09-27, GATE 7's `PF-4`: this line's address read *"`§0B`'s `ADV-CT-4`"* — `ADV-CT-4` is a `§3b` FINDING (`§3b`'s findings table, `CONTRACT-AMENDED`), never a `§0B` note, and `§0B` carries notes `9.1`–`9.6` only. **THE AS-WRITTEN ADDRESS IS KEPT VISIBLE ABOVE; the finding, the sweep and every figure are unchanged.***)*
**`151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`** — **TWO of the ten terms were RE-DERIVED from the landed test file's own drives (`P-CT-IM-1` `40 → 48`, `P-CT-IM-3` `17 → 23`; part D's answer to the declared-vs-executed discrepancy), and all other terms are UNMOVED.** **THE DECLARED CHAIN: `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`; THE DECLARED SUBTOTALS: `IM 124` · `SM 13` · `TP 14` = `151`. CAPS RE-CHECKED: `151 ≤ 400` (headroom `249`), largest row `48 ≤ 100` (headroom `52`). THE `(bounded)` SET IS UNMOVED AT `5` of `10`.** **⟶ `151` IS NOT THE AS-FILED `154` AND MUST NOT BE READ AS IT: `154` was a MIS-SUM (`137 + 17`, a double-counted `P-CT-IM-3`), while `151` IS THE SUM OF THE TEN RE-DERIVED TERMS — one `3` apart, and unrelated.** **The as-filed `154` and the note-7.2 `137` both stay VISIBLE as provenance, per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1, and the red set's register harness owes the re-grain of `§0A` note 8.4 — including the as-filed-excess assertion, which becomes `154 - 151 = 3`.**

**⟶ THE NOTE-7.2 INTERMEDIATE FORM, ALSO KEPT VISIBLE: the chain `40 → 66 → 83 → 93 → 105 → 110 → 113 → 118 → 123 → 137` and the subtotals `IM 110` · `SM 13` · `TP 14` — NOT the declared chain and NOT the declared total; the intermediate amended form the `151` re-derivation moved on from.**

**⟶ AS-FILED, KEPT VISIBLE — AND CORRECTED 2026-09-27 (`§0A` note 7.2), because the ten terms printed
directly above SUM TO `137`, NOT TO `154`.** **THE CORRECTED DECLARED TOTAL, with its terms:**
**`137` = `40` + `26` + `17` + `10` + `12` + `5` + `3` + `5` + `5` + `14`** — **the same ten terms, no term
moved, unmoved in count and identity.** **NO PER-ROW TERM IS WRONG; the printed TOTAL was, and the
as-filed `154` above is retained as the annotated as-filed form
(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` sub-rule 1: *"a mis-sum is corrected by annotating beside the
as-filed form, never by silently rewriting it"*).** **⟶ AND THIS SENTENCE'S *"NO PER-ROW TERM IS WRONG"* IS SUPERSEDED BY `§0A` note 8.4 AND KEPT VISIBLE: THE GREEN RUN FOUND TWO TERMS WRONG — `P-CT-IM-1` (`40` → `48`) and `P-CT-IM-3` (`17` → `23`) — NOT because the arithmetic was wrong but because the DRIVES the terms count were under-declared; the mis-sum diagnosis above is unaffected and the DECLARED TOTAL is now `151`.**

| The term | Its row | The enumeration that produces it |
| --- | --- | --- |
| **`48`** | `P-CT-IM-1` | `8` `chrome` shapes × `5` `tokenFn` shapes = `40` **plus the `8` further identity drives** = `48` **⟶ RE-DERIVED 2026-09-27 (`§0A` note 8.4): the `8` further drives ARE drives (each a `row.run` with its own fresh `chrome` value, its own recorder and its own assertions), so they are COUNTED IN the term. The as-filed `40`/`8` form is kept visible HERE: *"`40` = `8` × `5` (the `8` further drives are ASSERTIONS over the same grid, printed beside the term)"*.** |
| **`26`** | `P-CT-IM-2` | `5` member-key shapes × `2` `tokenFn` shapes (`10`) + `16` further control drives (spy, prototype traps, unaffectedness pairs, `B-3` alternative-reading pairs) = `26` |
| **`23`** | `P-CT-IM-3` | `7` usable class-name argument shapes + `16` unusable = `23` **⟶ RE-DERIVED 2026-09-27 (`§0A` note 8.4): the landed `UNUSABLE_CLASS_NAMES` table holds `16` entries, each its own drive; the as-filed form is kept visible HERE: *"`7` usable + `10` unusable = `17`"*, and the write-log positive control is reported BESIDE the term in neither figure (`§5.5.2` item 9(3)).** |
| **`10`** | `P-CT-IM-4` | `5` call shapes × `2` observable classes = `10` |
| **`12`** | `P-CT-IM-5` | `6` call shapes × `2` census readings = `12` |
| **`5`** | `P-CT-IM-6` | `5` repeated-call shapes, each driven five times (the repetitions are ASSERTIONS inside one attempt) = `5` |
| **`3`** | `P-CT-SM-1` | `3` statelessness clauses = `3` |
| **`5`** | `P-CT-SM-2` | `4` call shapes + `1` positive control = `5` |
| **`5`** | `P-CT-SM-3` | `1` grid of `4` edge shapes + `1` idempotence control = `5` (the `4 × 3 = 12` resolver cross-product assertions are printed BESIDE the term) |
| **`14`** | `P-CT-TP-1` | `14` pinned-seed draws × `1` entry-point sweep each (the `3` entry-point calls are ASSERTIONS inside the attempt) = `14` |

**THE TERM-BY-TERM ADDITION, so the total is checkable rather than asserted** *(the order is `§5.5.1`'s
row order)***:** **`40` → `66` → `83` → `93` → `105` → `110` → `113` → `118` → `123` → `154`.**

**⟶ AMENDED 2026-09-27 (`§0A` note 7.2): THE AS-FILED CHAIN ABOVE IS KEPT VISIBLE, AND THE
CORRECT CHAIN IS `40` → `66` → `83` → `93` → `105` → `110` → `113` → `118` → `123` → `137`.** **⟶ AMENDED
AGAIN 2026-09-27 (gate 4, `§3b`'s `ADV-CT-4`): THE CHAIN THIS SUBSECTION CARRIES IS THE RE-DERIVED ONE —
`48` → `74` → `97` → `107` → `119` → `124` → `127` → `132` → `137` → `151` — and BOTH the note-7.2 chain
(`40 → … → 137`) and the as-filed chain below are the SUPERSEDED/intermediate forms, kept visible.** **The as-filed chain's
LAST step (`123` → `154`) is the ONLY step that does not follow from its predecessor's own term: `123` +
the tenth term `14` = `137`, so the as-filed chain overstates its final step by `17` — and the `123`
before it is correct, so the defect is the FINAL STEP OF THE TOTAL and nothing upstream of it. That final
`+17` is the same `17` the as-filed `127` subtotal line re-added (`§5.5.1`'s third `IM` term, counted
once as a term and once more inside the subtotal).**

**`137` IS THE SUM OF THE TEN TERMS `§5.5.1` ENUMERATES** — **and the as-filed `154` above is the
ANNOTATED, SUPERSEDED DECLARED TOTAL, retained so the defect remains attributable.**
**THE CAPS, re-checked against the corrected figure:** **`137 <= 400` total** (headroom `263`), and
**the largest per-row term is `40` (`P-CT-IM-1`), inside `<= 100` per row** (headroom `60`) — **so both
caps hold.** **THE FAMILY SUBTOTALS, stated consistently with that addition:**
**`IM` = `40 + 26 + 17 + 10 + 12 + 5` = `110`** · **`SM` = `3 + 5 + 5`
= `13`** · **`TP` = `14`** — and **`110 + 13 + 14 = 137`**. **⟶ THE AS-FILED PARAGRAPH BELOW CALLED THAT A
DISCREPANCY AGAINST A `154` DECLARED TOTAL; THE CORRECTION IS THAT `110`/`13`/`14` WERE RIGHT ALL ALONG and
the declared total was wrong. The paragraph is KEPT VISIBLE AS-FILED with its own arithmetic annotated, per
the annotate-never-rewrite rule.** **THE AS-FILED FORM OF THAT PARAGRAPH, verbatim in substance:**
*("THAT IS NOT THE DECLARED TOTAL, AND THE DISCREPANCY IS STATED RATHER THAN SMOOTHED: the sum of the three
family subtotals is `137` while the declared total is `154`, a difference of `17`. THE CAUSE, measured
against this register's own terms: `P-CT-IM-3`'s term is `17` and it is an `IM` row — the subtotal line
above omits it, because it was written from the five `P-CT-IM-*` rows listed before it. THE HONEST
SUBTOTALS ARE `IM` = `40 + 26 + 17 + 10 + 12 + 5 + 17` = `127` · `SM` = `13` · `TP` = `14`, and
`127 + 13 + 14` = `154`)***.** **⟶ THAT "CORRECTION" IS ITSELF WRONG AND IS KEPT VISIBLE WITH ITS DEFECT
NAMED: `IM` = `40 + 26 + 17 + 10 + 12 + 5 + 17` RE-ADDS `P-CT-IM-3`'s `17` A SECOND TIME** — the row is
already the THIRD term of the as-written `IM` line (`40 + 26 + 17 + …`), so the appended `+ 17` is a
double-count of a term the line already contained; **the `110`-line's apparent omission was read as a
missing term when the line was complete, and the false `154` was reached by adding it twice**
(`127 + 13 + 14`). **THE HONEST SUBTOTALS, and they are the ORIGINAL as-written ones: `IM` = `110` ·
`SM` = `13` · `TP` = `14`, and `110 + 13 + 14` = `137` = the declared total.** **THE AS-WRITTEN
`110`/`13`/`14` LINE IS KEPT VISIBLE ABOVE** (and in the as-filed paragraph quoted here), per
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`'s correction rule; **the DECLARED TOTAL is now `137` and every
per-row TERM is UNMOVED — one number moved, and it is the total.** **THE ROW/TERM
RECONCILIATION, printed so it is checkable:** **the `10` ROWS and their terms are `IM-1` (`40`) ·
`IM-2` (`26`) · `IM-3` (`17`) · `IM-4` (`10`) · `IM-5` (`12`) · `IM-6` (`5`) · `SM-1` (`3`) · `SM-2`
(`5`) · `SM-3` (`5`) · `TP-1` (`14`)** — **`10` rows (six `IM` + three `SM` + one `TP`), `10` TERMS (one
per row, with NO row carrying a second term), and the total is `137`.** **THE `(bounded)` SET IS UNMOVED:
`5` of `10` — `P-CT-IM-1` · `P-CT-IM-4` · `P-CT-IM-5` · `P-CT-SM-3` · `P-CT-TP-1`.** **NO row id, strategy
id, seed (`20260927`), cap (`≤100`/row · `≤400` total) or per-row term is moved by this amendment.**
**THE RED SET'S REGISTER HARNESS NOW OWES A RE-GRAIN** (`§0A` note 7.3): it was authored asserting the
as-filed `154`; with this amendment the DECLARED figure IS `137`, so the assertion's polarity flips while
the as-filed `154` remains visible BESIDE it.
**⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.4) — THE PARAGRAPH ABOVE IS THE NOTE-7.2 FORM AND STAYS VISIBLE; THE CURRENT FORM IS: `151` = `48` (`IM-1`) + `26` (`IM-2`) + `23` (`IM-3`) + `10` (`IM-4`) + `12` (`IM-5`) + `5` (`IM-6`) + `3` (`SM-1`) + `5` (`SM-2`) + `5` (`SM-3`) + `14` (`TP-1`), chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124 · SM 13 · TP 14` = `151`, caps re-checked (`151 ≤ 400`, largest row `48 ≤ 100`), the `(bounded)` set unmoved at `5` of `10`.** **THE ROW/TERM RECONCILIATION ABOVE READS `IM-1` (`48`) · `IM-3` (`23`) in the current form; its as-written `IM-1` (`40`) · `IM-3` (`17`) is kept visible, and the sentence *"every per-row TERM is UNMOVED — one number moved, and it is the total"* is SUPERSEDED (not deleted): TWO TERMS MOVED, because the DRIVES those terms count were under-declared, while no row id, strategy id, seed or cap moved and no term moved for an arithmetic reason.** **The re-grain is now the DOUBLE obligation of `§0A` note 8.4, including the as-filed-excess assertion `154 - 151 = 3`.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.**

1. **THE SELECTOR HALF.** *If a pure, total, stateless `tokensFor(chrome, tokenFn)` cannot return a
   declared value for every input in its enumerated domain — holding the one-call discipline, the
   answer-un changed discipline, the no-shape-gate rule, the three declared degradations, the
   no-member-consulted rule and the absence of any coercion — then the selector half is not realisable
   **the way `A-d4`'s injection answer pins it**, and the unit fails on that half.* **The tests are
   `M-1`/`M-2`/`M-6`, `F-1`/`F-3`/`F-5`, `I-1`/`I-2`, `R-1`/`R-13`, and the register rows
   `P-CT-IM-1`/`P-CT-IM-2`/`P-CT-SM-2`/`P-CT-TP-1`.**
2. **THE NORMALIZER HALF.** *If a pure, total, stateless `orientationFor(edge, axisResolver)` cannot
   return a declared value for every input in its enumerated domain while reading **no coordinate, no
   geometry and no element** — holding the one-closure-compatible shape, the one-call discipline and the
   declared degradations — then the normalizer half is not realisable **the way `E5-B-2`'s no-reach clause
   pins it**, and the unit fails on that half.* **The tests are `M-3`, `F-2`/`F-4`/`F-6`, `I-8`/`I-10`,
   `R-6`, and the register rows `P-CT-SM-3`/`P-CT-TP-1`.**
3. **THE DECLARATION HALF.** *If the one shipped declaration cannot be expressed as an **unparsed
   returned string** whose identity is `[T]`-provable — i.e. if any row of it needs a `[U]` or `[D]` leg
   to be falsifiable — then the unit exceeds its provable layer and the unit fails.* **The tests are
   `M-9`/`M-10`/`M-11`, `F-8`/`F-9`, `I-7`/`I-11`, `R-7`/`R-8`/`R-10`, and the register rows
   `P-CT-IM-3`/`P-CT-IM-4`/`P-CT-IM-5`.**
4. **THE BOUNDARY HALF.** *If this unit cannot be stated without an import edge to any sibling, without a
   taxonomy literal in its bytes, without a member of `chrome` deciding something a landed sibling owns,
   and without a write — then the unit is not the mechanism `A-d4` adopted, and the unit fails.* **The
   tests are `R-1`/`R-2`/`R-4`/`R-12`/`R-13`, `F-10`/`F-11`, `I-2`/`I-5`/`I-9`, and the register rows
   `P-CT-IM-2`/`P-CT-SM-1`.**

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause
is found and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; **(c)** the unit is **declined back** — admissible only if a clause
is shown to be **inseparable from an applied stylesheet** (which would refute `E5-B-1`'s returned-text
reading and require the architect's dated annotation, not a spec edit) or **insurmountable without
importing a sibling** (which would refute the fabricated-edge discipline), and **either would be a NEW
GATE, not this unit's call.**

**Stop conditions (`S-CT-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]`/`[D]`
leg** — it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This
filing has NO such candidate**: **every claim in `§5.5.1` is a value, a count, a byte-sequence or a
file-property claim over arguments**, and **the one class that would have been `[U]`-shaped — the applied
declaration, the containment boundary and the browser's acceptance — is REFUSED at filing time and
carries NO row at all** (`§5.2`).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **one new
   spec file** and **nothing else**. The module, the test file, the red set, the legs, the register's
   executed layer and every gate after gate 1 are **OWED**; **the unit is NOT delegable until a TestWriter
   has RUN and REPORTED the red set** (`§4.5`).
2. **THE DECLARATION'S APPLIED HALF IS REFUSED, NOT PARKED, AND THE REFUSAL IS THE HONEST FORM.** **No
   instrument on any layer this repo owns reads an applied declaration back** (`§5.2`'s reader question:
   `NONE`). **No pass may claim this unit's green proves a browser accepts the declaration, that
   containment applies, that a layout or paint boundary exists, that a stylesheet loads, that a `:has()`
   rule matches, or that a class exists on any element.**
3. **NOTHING OF THIS UNIT IS AN EXISTENCE OR A DISPLAY AUTHORITY.** `tokensFor` returns **the caller's own
   answer**; **a pass that reports it as a census existence fact or as a display fact is a finding**
   (`census.md` `§0A` ruling note 12's boundary; `I-5`). **`U-ZONES` owns emptiness and `U-CENSUS` owns
   the record build; this module decides neither** (`§1` item 3).
4. **THE ENTRY-POINT PATH QUESTION IS ANSWERED `NO`, and the answer is derived from this unit's own
   charter, not copied from a sibling** (`§2.5` item 5): the mechanism is imported by no `src/**` file and
   has **no rendered surface and no in-app instantiation site.** **`[U]` is not offered and `[D]` is not
   claimed** (`§5.2`), and **gate 6 is `STRUCTURAL` with its reason stated.**
5. **THE MODULE IS A MECHANISM, NOT A UI ELEMENT — AND THAT IS THE RECONCILIATION `C-4` OWES, recorded
   with its one live clause.** **A-d4's kept artifact survives as RETURNED TEXT.** **The reading under
   which this reconciliation FAILS is named: if a later pass makes the unit APPLY the declaration, the
   unit becomes a UI element under `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`/`S-d8` `(C)#2`, owes renderer
   wiring and a MANDATORY live battery it cannot carry, and needs the architect — not a spec edit**
   (`§0A` note 1, `§5.1`'s falsifier, `§7a.1` item 3).
6. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case coverage
   matrix, no demo-page index and no page-design contract to update**. **`R-9` is the PROBE that keeps
   that claim falsifiable**, and **if that file comes to exist, this unit owes the coverage row and the
   demo-page entry** — with the honest note that a mechanism with no UI surface can only contribute an
   **absence** row.
7. **THE `docs/FORKER.md` CARRY IS OWED AND NON-GATING, and it is a REAL fork-facing obligation rather
   than a formality.** **`U-CONTAINER` adds adopted NAMES a fork must implement — `tokenFn`,
   `axisResolver`, the class name, and the returned record's two members** — and its **two-edge seam
   table (`§2.4`) is the contract they implement.** **Re-measured this filing pass: `docs/FORKER.md`
   carries a `U-CONTAINER` unit-digest row (`:249`) and NO seam block for this unit**; **`docs/pending.md`
   `§L-4b` is already `OPEN` for the SIBLING `U-RELOCATE`'s seven seams, and `§K`'s `K-9` (the `H-8`
   request: *a glossary in the fork-facing doc for every adopted name a fork must implement*) is a
   REQUEST, not a landed ruling** — **§K's vocabulary is therefore NOT used anywhere in this file as
   though it were in force.** **OWNER: whatever pass next touches `docs/FORKER.md`; it gates no unit.**
8. **NO CSS IS SHIPPED IN ANY FORM, AND THE DECLARATION IS THE ONE ARTIFACT THAT NEEDS THE SENTENCE.**
   **Because the declaration is RETURNED AS TEXT and never applied, it is not a stylesheet, not a rule,
   not an applied declaration and not a loaded artifact** — **so the family's *"no CSS is shipped, in any
   form, by this unit"* is literally true here as well** (`§2.2`(D) row `1`). **`src/shared/dom-shim.ts`
   gains no member** (`SHIM-COMPLETION-CARVE-OUT`; `R-3`).
9. **THE REGISTER'S MARKINGS ARE EXECUTION DESIGN, NOT RESULTS.** This pass **ran nothing**. **The total
   is `154`, the sum of the register's TEN printed terms**, and **the subtotal line's as-written
   `110`/`13`/`14` is recorded at `§5.5.3` as a dated corrected arithmetic defect rather than silently
   rewritten** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE: *a total that is not the sum of its
   own terms is a review finding*). **A row marked executable here that is broken when the red runs is a
   SPEC FINDING, reported rather than tuned to green.**
   **⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.4, part D): THE DECLARED TOTAL THIS ITEM NOW PRINTS IS `151` = `48` + `26` + `23` + `10` + `12` + `5` + `3` + `5` + `5` + `14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124` · `SM 13` · `TP 14` = `151` — TWO TERMS RE-DERIVED FROM THE LANDED DRIVES (`P-CT-IM-1` `40 → 48`, `P-CT-IM-3` `17 → 23`), the other eight unmoved, caps holding (`151 ≤ 400`, largest row `48 ≤ 100`), the `(bounded)` set unmoved at `5` of `10`. THE RE-DERIVATION IS NOT A `154` REVIVAL: `154` was a mis-sum and `151` is the sum of its own terms — they are one `3` apart and unrelated.**
   **⟶ AMENDED 2026-09-27 (`§0A` note 7.2, after the red ran): the sentence above is FALSE AS WRITTEN and
   stays visible. `154` is NOT the sum of the ten printed terms — `137` IS. THE DECLARED TOTAL IS NOW
   `137` = `40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `40 → 66 → 83 → 93 → 105 → 110 → 113 →
   118 → 123 → 137`, subtotals `IM 110 · SM 13 · TP 14`. The as-filed `154`, its chain and its `127`
   subtotal stay visible at `§5.5.3`; NO per-row term, row id, strategy id, seed or cap moved; both caps
   hold (`137 ≤ 400`, largest row `40 ≤ 100`); the `(bounded)` set is unmoved at `5` of `10`. THE RED
   SET'S REGISTER HARNESS OWES A RE-GRAIN (`§0A` note 7.3).**
10. **NO ROW OF THIS UNIT CLAIMS AN ENGINE BEHAVIOUR, A PACKAGE CAPABILITY OR A `bodyRuns`/`BARE-TEXT-EMIT`
    SURFACE.** This module **imports no engine surface at all** (`§2.1` item 3) and **exercises
    `provident-ssr` nowhere** — so **no `docs/defects.md` / `docs/HANDOFF.md` entry can arise from this
    unit**, and **none may be written for it.**
11. **THE TRACKER ITEMS THIS FILING BELIEVES ARE OWED — listed, and NOT edited here** (`§5.1`'s
    allow-list admits tracker rows only for the pass that produces them, and this pass is a filing):
    **(a)** `docs/next-steps.md`'s row **`E5`**: its **spec cell** (`OWED — not filed` → FILED) and its
    status; **(b)** the same row's **`Legs` cell** — **already annotated by the `F-4` reconciliation
    pass**; this filing **confirms** that annotation and asks for **no further edit**; **(c)** the same
    row's **acceptance cell** — **already annotated to point at this spec's own surface/seam section by
    the same pass, with the section number deliberately not invented before the filing**; **now that
    `§2.1`/`§2.4` exist, a later pass MAY name them** (`§0A` note 5's working default governs a rename);
    **(d)** `docs/pending.md` `§L-4b`'s **container half** (the `docs/FORKER.md` carry of `§7` item 7) —
    **a NEW owed row, owner: whatever pass next touches `docs/FORKER.md`, gating no unit**; **(e)**
    `docs/decisions.md`'s **`E5-B-3` row** — **it is `FILEABLE — WORKING DEFAULT` and this filing
    implements it as a default; the gate may promote it to a ruling by dated annotation.** **All five are
    listed as owed and are NOT edited here.**
12. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/container.md` — and edited NO existing
    file.** It ran **no test, no suite, no leg, no trio, no `tsc` invocation and no git command**; it
    wrote **no code**; and it touched **no `src/**`, no `tests/**`, no sibling spec, no tracker, no
    `package.json`, no `scripts/**`, no config and no adjacent repo.** **The tracker cells it leaves stale
    are the SUPERVISOR's to reconcile** (`§7` item 11; `§8`).
    **⟶ AMENDED 2026-09-27 (`§0A` note 7): a LATER pass — the defect-repair amendment — EDITED THIS FILE
    and NOTHING ELSE**, annotating beside the as-filed forms at every site that carries the register
    arithmetic (`§5.5.3`, `§5.3` item 11, the `CURRENT STATE` block, `§1` item 8, `§4.2` item 6, `§5.5.2`
    item 3, `§7` item 9, `§8`'s two rows, `§3a`'s `A-14`) and pinning the four row-bound defects at
    `§2.3` item 5 and `§3.4 R-1`/`R-6`/`R-7`/`R-10`/`R-12`/`I-14`. **Items 1–11 above keep their own
    force; item 12's "this pass" is the FILING pass and is read as such.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **Three items** could not be derived **falsifiably** from
the gate-1 record with a single reading, because **two admissible readings both satisfy its words and the
choice changes either a PUBLIC SHAPE, a MODULE BYTE or a FORK-FACING ARTIFACT.** **Two of them are OPEN
with a WORKING DEFAULT; the third is DERIVED and PINNED-PENDING-CONFIRMATION** (this filing's choice,
implemented in `§2` and marked as such), with a RECOMMENDATION and the CLAUSE each one BLOCKS. **No item
is left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or diff-scope clause is
weakened, widened or re-scoped by this report.** **A later pass that changes any of these defaults MUST
OPEN A GATE.**

### 7a.1 THE OPEN ITEMS — two working defaults and one derived-pending-confirmation item

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **`B-3` — WHETHER THE CALLER'S MAPPING MAY CARRY AN EMPTINESS/REVEAL/MINIMIZATION MEMBER** | **`B-3` IS NOT A RULING: `docs/decisions.md`'s own row title reads *"NOTE (not `DECIDED`)"*, and gate-4 filed it as `FILEABLE — WORKING DEFAULT`** (`container-review.md` `§9.5` `G-3`). **The two readings produce different CONTRACT OBLIGATIONS on the same mapping and different ROWS: under `(A)` the caller must not carry the member at all; under `(B)` it may, where `U-CENSUS`/`U-ZONES` supply the value.** **A row that asserts `(A)` outright would be asserting a ruling that does not exist** (`§0A` note 3) | **THE DEFAULT (implemented): the mapping carries NO `empty`/`is-empty`/`is-minimized`/`is-revealed` member UNLESS `U-CENSUS`/`U-ZONES` supply the value — AND THE MODULE'S OWN ROW ASSERTS ONLY THE HALF THAT HOLDS UNDER BOTH READINGS: the returned value is the caller's own answer, UNAFFECTED by any member the record carries** (`§2.3` item 3, `§2.2` `P-CT-13`, `§5.5.1 P-CT-IM-2`) | **Do you CONFIRM the default (`(A)`, forbidden unless supplied), or do you take the reversible alternative `(B)` (permitted only where `U-CENSUS`/`U-ZONES` supply it)?** | **CONFIRM THE DEFAULT (recommended)** — a caller-supplied `is-empty` member handed to this mechanism states emptiness a second time, under a second name (`AU-2`; `census.md` `§0A` ruling note 3's `V-13` class) | **Nothing is blocked on the RECOMMENDED reading. THE REVERSAL IS CHEAP AND NAMED: it changes NO module byte, NO row id, NO term and NO attempt** — because the row asserts unaffectedness, which is true under both readings. **A reversal that wanted a MEMBER-NAME BAN IN THE MODULE would move `§3.4 R-1`'s exemption list and would owe a register re-grain; that is a NEW GATE, not a default flip** |
| **2** | **THE RETURNED RECORD'S MEMBER NAMES — `className` and `declaration`** | **The gate-1 record pins that the class name *"is returned alongside"* the declaration text and pins the TYPE name `ContainerDeclaration`, but it NEVER pins the record's members** (`§0A` note 5). **The two readings differ in a PUBLIC SHAPE a fork must read, and the `className` spelling sits on two landed negative token lists as a WRITE spelling** (`§2.2`(D) row `2`) | **PINNED AS A WORKING DEFAULT: `ContainerDeclaration = { readonly className: string; readonly declaration: string }` — two members, in that order, no third**, with `className` carried as a **DECLARED EXEMPT MEMBER NAME** in `§3.4 R-10` and the WRITE FORMS banned with no exemption | **Do you accept `className`/`declaration` — the two words the `SCH-10` adoption row itself uses — or do you prefer other spellings (e.g. `name`/`text`) or a tuple?** | **ACCEPT `className`/`declaration` (recommended)** — they introduce **no new vocabulary**, they are **already the charter's own words**, and a fork meets the same two words in the ledger row | **Nothing is blocked on the RECOMMENDED reading, and a RENAME moves NO row id, NO term and NO attempt** — every row reads the members through its own cell's named binding. **What a rename WOULD touch, named so it is not a surprise: `§3.4 R-10`'s exemption list, `§2.1`'s `ContainerDeclaration` block, and `docs/FORKER.md`'s eventual carry** |
| **3** | **THE DECLARATION'S OWNERSHIP — `B-1` — IS RULED, AND ITS ALTERNATIVE IS RECORDED AS THE RE-SCOPE IT WOULD BE** | **This one is NOT open: it is RULED and PINNED.** It is listed here so a reader meets it in the same place as the other two, **NOT because it is undecided**. **`E5-B-1` chose option `(B)` (return the text; the consumer applies it), and the architect's ruling is an ACTIVE row cited by NAME** | **PINNED: the declaration is a module-owned OPAQUE CONSTANT STRING, NEVER PARSED, RETURNED with the caller-supplied class name; the unit performs NO write of any kind; the applied proof is REFUSED three-part rather than parked** (`§0A` note 1, `§2.3` items 4/5, `§5.2`) | **CONFIRM the returned-text reading (recommended) — OR, if you want the alternative, RULE which of the two NOT-TAKEN options you mean and note the `A-d4` consequence.** **Option `(A)` (the module APPLIES it) makes the unit a UI ELEMENT under `SHELL-CHROME-CARVE-OUT-FUNCTIONAL`/`S-d8` `(C)#2`, owes renderer wiring and a MANDATORY live battery it cannot carry, and — MEASURED — still has NO instrument able to read the applied declaration back** (`ci-ui-leg.md` `§3.0 R2`'s ONE measurement is SPENT; its `§2.1` item 6 excludes CSS resolution; the `H-r10` extractor cannot read a declaration). **Option `(C)` (the FORK owns the CSS) is an `A-d4` RE-SCOPE and needs a DATED ARCHITECT ANNOTATION beside that ruling** (`AGENTS.md` item 10a) | **CONFIRM the returned-text reading (recommended)** — it is the only reading under which this unit's central artifact is `[T]`-provable, and it is the reading under which `A-d4`'s *"ONE shipped declaration survives"* stays literally true | **Under `(A)`: `§5.1`'s DENIED set, `§5.2`'s three-part refusal, the `§5.2` `§7.1` decision, gate 6's `STRUCTURAL` status, `§3.4 R-8`/`R-10`, and the register's `P-CT-IM-3`/`P-CT-IM-4`/`P-CT-SM-3` all change — i.e. a NEW GATE. Under `(C)`: `A-d4`'s adoption, this unit's charter and `docs/next-steps.md`'s `E5` acceptance cell change — also a new gate, and an architect's, not a spec writer's** |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `1` RULED and
PINNED-PENDING-CONFIRMATION (`3`) · `2` OPEN with a working default and a recommendation (`1`, `2`) ·
`2` clause groups blocked by an OPEN item (`1`, `2`) · `0` items left as a silent gap.** **Every item's
default IS implemented in this spec's text**, so **the red set may be authored against the defaults** —
but **each default is a DEFAULT, marked as one, and a later pass that changes one must open a gate.**

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited
**by SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited
by ROW ID** (`E5`, `E4`, `E10`, `C2`), **never by line**. **`docs/decisions.md`'s row anchors drift**
(rows are appended), so its rows are cited **by NAME**. **The three provenance line references carried in
`§2.2`'s re-measurement block are the one exception, flagged there as a digest row's own marker — cite
the ROW, never the line.**

| Source | Status for `U-CONTAINER` | Where |
| --- | --- | --- |
| **`docs/specs/container-review.md`** — the CLOSED gate-1 record: the four step verdicts, the conditions `C-1`…`C-10`, the collision table, the 26 findings, the three architect questions, the five options, `§9.4`'s architecture rulings and `§9.5`'s conditions `G-1`…`G-3` | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** Its conditions are **derived** at `§0`/`§0A`, its filing checklist is landed item by item (`§2`..`§5`), and **the record is NEVER edited by this unit** (`§5.1`'s DENIED set item 11) | `§0`, `§0A`, `§2`..`§5`, `§5.1`, and this row |
| **`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED`** (`docs/decisions.md`, ACTIVE) | **ADOPTED, cited by NAME, never re-opened** — the declaration's ownership, the returned-text proof, the no-write rule, the absence of renderer wiring and the `STRUCTURAL` gate 6 | `§0` ruling 1, `§0A` note 1, `§2.1` item 2, `§2.3` items 4/5, `§2.5` items 1/3, `§3.1 M-10`/`M-11`, `§3.4 R-8`/`R-10`, `§5.1`, `§5.2`, `§7a.1` item 3 |
| **`E5-B-2-EDGE-IS-AN-OPAQUE-CALLER-VALUE-UNDER-THE-NO-REACH-CLAUSE`** (`docs/decisions.md`, ACTIVE) | **ADOPTED, cited by NAME, never re-opened** — `edge` is an opaque caller value and the no-reach clause is pinned as a static row | `§0` ruling 2, `§0A` note 2, `§2.5` item 2, `§3.3 I-8`, `§3.4 R-6`, `§5.5.1 P-CT-SM-3` |
| **`E5-B-3`** (`docs/decisions.md`, **a NOTE — `FILEABLE — WORKING DEFAULT`, NOT a ruling**) | **IMPLEMENTED AS A DEFAULT, with its reversible alternative named** — and **a pass must not present it as a ruling** | `§0` ruling 3, `§0A` note 3, `§2.2` `P-CT-13`, `§2.3` item 3, `§5.5.1 P-CT-IM-2`, `§7a.1` item 1 |
| **`SCH-10` (`ZONE-CONTAINER-CHROME`), as ADOPTED-RESHAPED by `A-d4`** (`docs/pending.md`'s `SCH-10` row and the `SCH-4`/`SCH-6`/`SCH-7`/`SCH-10` family row; `docs/decisions.md`'s `SHELL-CHROME-PANES-ZONES-IN-SCOPE`) | **ADOPTED as this unit's upstream** — the surface `tokensFor(chrome, tokenFn)` / `orientationFor(edge, axisResolver)` with the mirror-class taxonomy caller-supplied, plus **ONE** shipped declaration whose class name is caller-supplied, **with consumer selectors/`:has()` staying consumer-side**. **Its pre-`A-d4` disposition (`DECLINED + REFILED`, reason code `CONSUMER-VOCABULARY + CSS`) is `SUPERSEDED` and is READ AS PROVENANCE** | `§1` items 1/4, `§2.1`, `§2.2`(D) rows 1/6/7, `§2.3` item 4, `§8` (this row) |
| **`SHELL-CHROME-CARVE-OUT-FUNCTIONAL`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the mechanism-vs-UI-element test, and the reason this unit needs no exception to the project-wide constraint | `§0` ruling 5, `§1` item 4, `§2.2` `P-CT-2`, `§2.2`(D) row 6, `§7` item 5 |
| **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE) | **CARRIED**: this unit's two seam signatures, their REQUIRED status and their declared degradations are **normative contract text**, and **both seam types are EXPORTED so a fork can import the shape it implements** | `§0` ruling 6, `§2.1` item 1, `§2.4`, `§8` (this row) |
| **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the rule that DERIVES this unit's DENIED set, and as the entry-point question this spec ANSWERS (`NO`)** | `§0` ruling 7, `§2.5` item 5, `§5.1` |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** + **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`10` typed ROWS carrying `10` TERMS in three families**, **`151` attempts** *(the DECLARED total after the 2026-09-27 second amendment, `§0A` note 8.4 — TWO TERMS RE-DERIVED: `P-CT-IM-1` `40 → 48`, `P-CT-IM-3` `17 → 23`; the note-7.2 `137` is the intermediate amended figure and the as-filed `154` the superseded mis-sum, both kept visible)* printed **with their ten terms and a term-by-term addition table**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no extra leg**, seed `20260927` for the one generator, caps `≤100`/row · `≤400` total · stop-after-5. **⟶ UPDATED 2026-09-27: the read-only PBT audit that this row called `OWED` HAS RUN (gate 4) and its record — `HOST DEFECTS: NONE` · `PACKAGE DEFECTS: NONE` (an empty import census, no DOM/realm/MCP surface, no shim member), the eight contract/harness-side findings `ADV-CT-1`…`-8`, the independent arithmetic confirmation, and the honest limit that it RAN NOTHING — is at `§0B` note 9.1 and `§3b`'s audit table** *(⟶ ADDRESS CORRECTED 2026-09-27, GATE 7's `PF-3`: this row's own pointer read *"`§0B note 9.1`"* while `§0B` had no heading at all — the heading is inserted at `PF-1` and this pointer, which is the one that named the address correctly, now RESOLVES)* | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11, `§0B` note 9.1, `§3b` |
| **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED, AND THE SECOND ONE'S RULE FIRED TWICE**: `§5.5.3`'s family-subtotal line was a mis-sum as first written (`110`/`13`/`14` = `137` against a `154` total) and is **kept visible with its correction printed beside it**; **and that correction was itself a DOUBLE-COUNT of `P-CT-IM-3`'s `17`** — **⟶ AMENDED 2026-09-27 (`§0A` note 7.2): the declared total is `137` = `40 + 26 + 17 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, subtotals `IM 110 · SM 13 · TP 14`, and the as-filed `154`/chain/`127` all stay visible**; the declared and distinct-drive figures are both reported (`§5.5.2` item 3) **⟶ AMENDED AGAIN 2026-09-27 (`§0A` note 8.4): the declared total is now `151` = `48 + 26 + 23 + 10 + 12 + 5 + 3 + 5 + 5 + 14`, chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`, subtotals `IM 124 · SM 13 · TP 14`, with the two moved terms re-derived from the landed drives (`P-CT-IM-1` `40 → 48`, `P-CT-IM-3` `17 → 23`) and `137`/`154` kept visible as the intermediate and as-filed forms** | `§5.5.1`, `§5.5.2` items 3/9, `§5.5.3`, `§5.3` item 11, `§7` item 9, `§0A` note 7.2 |
| **`PROHIBITION-5-IS-AN-ADOPTION-BOUND`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — prohibition 5 is a NON-GOAL row here, and the pinned MCP sets are asserted as SET claims against the names | `§0` ruling 12, `§0A` note 6, `§2.2` `P-CT-5`, `§3.3 I-13` |
| **`SHELL-CHROME-...-HANDOFF-REVIEW`'s `S-d8`/`S-d11`/`H-r5`/`H-r6`/`H-r8`/`H-r10`/`H-r15`** (`docs/specs/provident-electron-shell-chrome-handoff-review.md`) | **CARRIED AS OBLIGATIONS**: `S-d8`'s six prohibitions (`§2.2`(A)), `S-d11`'s geometry clause (`§2.5` item 2), `H-r5`'s no-shim rule (`§2.2` `P-CT-6`), `H-r6`'s dissolved-edge class (`§2.2` item 3), `H-r8`'s `§0 Contract-prohibitions` table (`§2.2`(A)), `H-r10`'s extractor limit (`§5.2`), `H-r15`'s taxonomy hazard (`§2.2`(D) row 7) | `§0`, `§0A`, `§2.2`, `§3.4`, `§5.2` |
| **`docs/specs/zones.md` `§1` item 3 / `§7` item 3** and **`docs/specs/census.md` `§1` item 5 / `§7` item 3** — the no-CSS-in-any-form clauses | **RECONCILED, NOT RELAXED** — `§2.2`(D) row `1`, in the RCA's own *"banned in layer X for reason Y, legitimate in layer Z because …"* form, with **the ban's subject (an APPLIED/LOADED artifact) named and this unit's artifact (returned text) shown outside it** | `§2.2`(D) row 1 | 
| **`docs/specs/zones.md` `§2.2` `P-1`+`P-2`, `docs/specs/census.md` `§2.2` `P-1`+`P-2`** — the sibling prohibition tables | **MIRRORED IN FORM, NEVER COPIED IN CONTENT** — this unit's six-row table is its own, with its own pinning tests, and **no sibling prohibition is weakened** | `§2.2`(A) |
| **`docs/specs/gutter-ui.md` `§R.2`/`§R.3`** — the eleven public seams, the seam-table form, the corrected `3 + 17 = 20` census | **CARRIED AS THE FORM PRECEDENT and as the `AxisOf` reconciliation's other half**: the two-halves census, the per-seam degradation table, and **the one-closure rule** (`§7a.1` item 1) | `§2.1` items 1/2, `§2.2` item 3, `§2.4`, `§3.3 I-10` |
| **`docs/specs/gutter-ui.md` `§2.1` item 6** and **`docs/specs/relocate.md` `§3.4 R-11`** — the two landed UI-content-write token lists, both naming `className` | **RECONCILED, NOT RELAXED** — `§2.2`(D) row `2` and `§2.3` item 6: **the WRITE is banned with both controls; the MEMBER NAME is a declared exemption**; every other name on both lists stays banned with no exemption | `§2.2`(D) row 2, `§2.3` item 6, `§3.4 R-10` |
| **`docs/specs/relocate.md` `§3.4 R-1`** — the anti-evasion vocabulary scan with its exactly-two declared exemptions | **CARRIED AS THE FORM**, with this unit's own exemption list NAMED (`§3.4 R-1`) and **its own controls**; **`relocate.md`'s list is not widened and `U-RELOCATE`'s exemptions are not touched** | `§2.2`(D) row 2, `§3.4 R-1`, `§4.4 S-CT-6` |
| **`docs/specs/relocate.md` `§2.2` `P-1`** — the sibling no-coordinate/no-geometry row | **CARRIED AS THE SIBLING SHAPE** for `E5-B-2`'s no-reach clause | `§0` ruling 2, `§2.5` item 2, `§3.4 R-6` |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row may not be moved to the `ui` leg silently"* | **CARRIED VERBATIM in this unit's three-part `[U]` refusal** | `§5.2`, `§4.4 S-CT-10`, `§7` item 4 |
| **`docs/specs/ci-ui-leg.md` `§3.0 R2`** (*"ONE real measurement … A second measurement is a new design decision"*) and its **`§2.1` item 6** (CSS resolution outside the leg) | **CARRIED AS THE READER QUESTION'S EVIDENCE: the reader is `NONE`** | `§0A` note 1, `§5.2`, `§7` item 2 |
| **`docs/specs/user-flow-audit.md` `§2`** — the trigger predicate and its zero-row exemption | **APPLIED, and the decision RECORDED**: **`DOES NOT TRIGGER`**, with the evidence that decided it and its falsifier | `§5.2` (the decision block), `§5.3` item 7 |
| **`docs/specs/gutter-ui-live-battery.md`'s `ADV-GU-1`** | **CITED AS THE MEASURED COST OF THE WIRING INVERSION** — the authored status node read `100` BEFORE → `110` AFTER, i.e. **a live battery is what makes a rendered claim provable** | `§5.2` (the `§7.1` decision's cost note) |
| **`docs/specs/census.md` `§0A` ruling notes 3 and 12** and **`docs/specs/zones.md` `§1` item 6** | **CITED, NEVER RE-OPENED** — the one-authority rule, the existence-vs-display boundary, and the `V-13` class | `§1` item 3, `§2.2` `P-CT-12`/`P-CT-13`, `§2.2`(D) row 4, `§3.3 I-2`/`I-5`, `§7` item 3 |
| **`docs/specs/gsession.md` `§1` item 8** — the precedent that two halves sharing nothing may still be one unit | **CITED AS THE PRECEDENT** for this unit's one-unit finding (`UB-1`'s answer) | `§1` item 1, `§8` (this row) |
| **`docs/specs/listhost.md` `§5.5.1`** and **`docs/specs/projection.md` `§5.5.1`** — the register reference shapes | **CARRIED AS THE FORM** (typed rows, strategy ids, `(bounded)` markings, the declared-vs-distinct ledger, the printed terms) | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3` |
| **`docs/next-steps.md`'s `## OPEN` row `E5`** | **CARRIED IN SUBSTANCE**: its `Legs` cell and its acceptance cell are **already annotated by the `F-4` reconciliation pass** and this filing **confirms both**; the **acceptance cell MAY now name this spec's `§2.1`/`§2.4`** (`§7` item 11(c)) | `§7` item 11, `§5.3` item 3 |
| **`docs/FORKER.md`** | **A NEW OWED ROW: this unit's two-edge seam block and its adopted-name glossary** (`§7` item 7), owner: whatever pass next touches that file; **gates no unit** | `§7` item 7, `§7a.1` item 2 |
| **`docs/next-steps.md`'s rows `E4`/`E3`/`E1`/`E2`** (`U-RELOCATE`, `U-GUTTER`, `U-ZONES`, `U-CENSUS`) | **NOT THIS UNIT, and NOT dependencies in either direction** — siblings of the `A-d4` family; **a later pass asserting an edge would be a FABRICATED EDGE** | `§3.3 I-9`, `§4.5`, `§5.1` item 2, `§8` (this row) |
| **`docs/specs/gutter.md` `§2.2` `P-5`/`§3.4` `R-1`/`§4.4` `S-11` and `docs/specs/gsession.md` `§2.2` `P-1`/`P-5`/`P-7`/`§3.4` `R-1`** — the sibling token-ban sites | **NOT RE-OPENED, AND NOT RELIED ON** — **none of them names a token this unit owns** (re-measured this pass: `chrome`, `edge` and `orientation` are on no landed ban list), so **this unit owes them no reconciliation**; the one landed site that DOES bear on this unit is `className`'s, and it is reconciled at `§2.2`(D) row 2 | `§2.2`(D), `§2.3` item 6 |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | `§1` item 6, `§3.4 R-9`, `§7` item 6 |
| **`docs/specs/container.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 5, `§7` items 11/12 |
| **`docs/specs/container-greens.md`** | **⟶ LANDED 2026-09-27 (`§0B` note 9.2) — the gate-5 BLIND greens: `24` executed scenarios, `24` PASS / `0` FAIL, `4` `NOT-BLIND-RUNNABLE`, plus `CN-G-24`; at filing this row read `OWED`.** **Its `F-1`…`F-5` are dispositioned at `§0B`; `F-4`'s domains are PINNED at `§0B` note 9.3; and its `CN-G-N4` records that the `§5.5.1` tables were NOT audited (they are claims about the red set's own file, which a blind pass must not read)** | `§5.1` row 4, `§5.3` item 8, `§0B` notes 9.2/9.3 |
| **`docs/pending.md` `§K` (the RCA's requested harness modifications)** | **BACKGROUND ONLY.** Its own header reads *"REQUESTS, NOT LANDED RULINGS; the architect's to adopt, amend or decline"*. **Its vocabulary is NOT used anywhere in this file as though it were in force** — no `BLOCKED-ON-SEMANTICS` verdict, no adoption dossier and no new gate step. **`K-9`/`H-8` (a fork-facing glossary) is CITED as a REQUEST** | `§7` item 7, `§8` (this row) |
| **`docs/next-steps.md`'s pickup `§6` DO-NOT list** | **NOT RE-OPENED.** The `A-d4` family adoption, `SCH-10`'s disposition and the two `E5-B-*` rulings are **cited and applied, never questioned** | `§0` rulings 1/2/3/4, `§0A` notes 1/2/3 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates
**one new spec file** and edits **no existing document** — **no tracker row is touched, no sibling spec is
annotated, and no citation is repointed.** **Row `E5`'s spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded here so the staleness
is **attributable rather than silent**. **This pass ran no test, no leg and no trio, edited exactly ONE
file, and made no commit** (`RCA-8`: **the new file is untracked and must be committed by the
supervisor**).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its
vocabulary and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A
later pass appends **inside `§3a`/`§3b`** or inside an existing section; **no section number moves,
nothing is renumbered, and the `§5.3 → §5.5` gap (no `§5.4`) stays exactly as recorded**, because
**renaming is forbidden for citation stability.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**⟶ STATUS UPDATED 2026-09-27: THE PASS HAS RUN (gate 4, at `841c33e`) AND ITS RECORD IS APPENDED INSIDE
THIS SECTION AND IN `§3b` — SEE THE DISPOSITIONED FINDINGS TABLE, THE READ-ONLY PBT AUDIT TABLE AND THE
NEGATIVE-GENERATOR TASK LIST AT THE END OF `§3b`. THE `OWED` STATUS BELOW IS THE FILING'S OWN AND STAYS
VISIBLE.**

**Status as filed: `OWED`. No adversarial pass has run for `U-CONTAINER`** — **the unit has no green yet**,
and `RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding,
and none may be cited as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no
`src/**`), it **must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the
per-row attempts, the strategy ids, the `151` total against its terms (**⟶ CORRECTED 2026-09-27, GATE 8: this clause read *"the `154` total"* — the as-filed mis-sum, which no live audit may be pointed at; the declaration is `§5.5.3`'s, `10` terms summing to `151`, with `137` and `154` readable only as the intermediate and as-filed forms**), the stop-after-5 rule, the pinned
seed and its one-step-per-draw form — **and it must RE-RUN the pool-versus-boundary check against the
LANDED tables** (`§5.5.2` item 7). **Its findings are recorded in `§3b` and a HOST finding is fixed here
with regression rows — never in `docs/defects.md`, because a host finding is this repo's.** **A genuine
`provident-ssr` package defect would go to `docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER
patched** — **though this unit exercises no package surface at all, so no such finding can arise from it**
(`§7` item 10).

**The vocabularies the disposition table uses, defined so no status word is ever left undefined:**
**`CONFIRMED-FIXED`** = a host finding, fixed here and regression-tested as a new `§3` row ·
**`CONFIRMED-RULED`** = a behaviour examined and ruled correct, with the ruling recorded and its reason ·
**`CONTRACT-AMENDED`** = a seed that exposed a gap in this spec, amended with the old text kept visible as
`SUPERSEDED` · **`NOT-A-FINDING`** = raised, examined, recorded with the reason · **`OWED`** = raised and
**not yet resolved** (the pass may not report done with an `OWED` row) · **`OWED — TEST-SIDE`** = a finding
whose remedy is a row the TestWriter owns, with no `§5.5.1` statement, id, strategy id or attempt term
changed for it · **`BLOCKING — SCOPE`** = a scope violation the unit may not land with ·
**`PARKED-with-revisit-condition`** = recorded, not fixed, with the condition that reopens it and its
owner. **The as-filed status of every seed below is `OWED`, and `OWED` is defined here rather than left
bare.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **THE WRITE PROBE, exhaustively:** across all three entry points, with a recording element and with a `Proxy`-wrapped element — **is the write count EXACTLY zero in every case, on every property, method and attribute channel?** **Is the log PROVEN LIVE by its own positive control** (a harness-side write reads `1`)? **Does any code path write a class, a style, an attribute, a node or the declaration itself?** | `[T]` + static |
| **`A-2`** | **THE PARSE PROBE:** is the declaration text EVER consumed — a `split`, an `indexOf`, a `RegExp`, a property-name extraction, a `CSSRule` construction, a rule object, a `:`/`;` scan? **Is the returned text byte-identical on EVERY call, including calls whose class name is unusable?** | static + `[T]` |
| **`A-3`** | **THE SELECTOR PROBE:** is `tokenFn` invoked EXACTLY ONCE per `tokensFor` call, for EVERY `chrome` shape — **including a revoked `Proxy`, a trap-throwing `Proxy`, a `Symbol`, a `BigInt` and `Object.create(null)`** — with the answer returned VERBATIM and the argument passed BY IDENTITY? **Can any path invoke it twice, skip it where it should run, or wrap its answer into a record?** | `[T]` |
| **`A-4`** | **THE NORMALIZER PROBE:** the same questions for `axisResolver`/`orientationFor`, **plus the idempotence clause** — does ANY code path cache an answer (which would read `1` where `2` is required) or produce a different answer for the same pair? | `[T]` |
| **`A-5`** | **THE ONE-AUTHORITY PROBE:** does ANY code path branch on a member of `chrome` — `empty`, `is-empty`, `is-minimized`, `is-revealed`, any other — or invoke `Map.prototype.get`, `has` or an iterator to learn something about the record? **Is the returned value provably UNAFFECTED by the presence, absence or value of any member?** | static + `[T]` |
| **`A-6`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything at all — value, type-only, dynamic or `require`? **Is `src/shared/dom-shim.ts` untouched, are the sibling modules and test files untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-7`** | **THE VOCABULARY PROBE — and its own collision:** does the module's source (comments included, in the NORMALIZED view) carry a pane/zone/tab/region token, a mirror-class taxonomy spelling, a unit or CSS literal, a selector spelling, a census token, a store token or a realm token — **raw, token-assembled or in a comment**? **The collision to resolve explicitly: `R-1`'s control data MUST carry the spellings while the module must not, and this unit's contract vocabulary (`chrome`/`edge`/`orientation`/`className`/`declaration`) IS the module's own declared exemption list** — **is the scan's scope exactly `R-1`'s, and is the exemption list NAMED rather than implied?** | static |
| **`A-8`** | **THE TAXONOMY RE-ENTRY PROBE (`H-r15`'s hazard):** does the module grow a per-zone/per-pane semantic or a mirror-class taxonomy in ANY form — a member name, a literal, a default, a documented constant? **Does the `§0 Contract-prohibitions` table assert their absence with a row that can FAIL?** | static + `[T]` |
| **`A-9`** | **THE `B-3` PROBE:** with a `chrome` carrying `empty: true` and then `empty: false`, is the returned value the SAME? **Does the contract anywhere present the working default as a RULING rather than as a default with its reversible alternative named?** **A pass that reads the default as ruled — or that reads a `B-3` reversal as landing without the architect — is a review finding** | static + `[T]` |
| **`A-10`** | **THE DECLARED-DEGRADATION PROBE:** for each of the two seams, in each of the three shapes (absent, non-callable, throwing), **is the declared EMPTY answer returned, the count exactly as declared, and NOTHING thrown?** **Is any degradation a SILENT NO-OP — i.e. does any row only assert *"it did not throw"* where the contract requires the declared VALUE?** | `[T]` |
| **`A-11`** | **THE CROSS-UNIT BOUNDARY:** does this unit duplicate a `U-ZONES` responsibility (a token literal, a unit string, a formatting rule), a `U-CENSUS` responsibility (a record build, a census read, an emptiness decision of its own), a `U-PROJ`/`U-LISTHOST`/`U-SLOTHOST` one, or a `U-GUTTER`/`U-GUTTER-UI` one (an axis computation, an axis token of its own)? **Duplication is a FINDING; and an obligation pulled in "for convenience" is the `S-CT-11` class.** | static + `[T]` |
| **`A-12`** | **THE FABRICATED-EDGE PROBE:** does any pass assert an import or composition edge between this unit and any sibling — **including reading the `axisResolver`↔`AxisOf` shape relation as an import edge**? **Is the one-closure rule stated as a FORK-FACING requirement rather than as a mechanism capability this module has?** | static |
| **`A-13`** | **THE `[U]`/`[D]` PROBE:** does any pass offer a `[U]` row for the applied declaration, the containment boundary or the browser's acceptance; claim a `[D]` row; move a rendered row to the `ui` leg (silently or not); report gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason stated**; or omit the `§7.1` `DOES NOT TRIGGER` decision? | the DONE row + `§3.4 R-6`/`R-9` |
| **`A-14`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the declared total (`151` since the 2026-09-27 second amendment, `§0A` note 8.4; `137` and the as-filed `154` are annotated forms and must be read BESIDE it, never instead of it)**? **IN PARTICULAR: are the TWO RE-DERIVED TERMS the executed ones — `P-CT-IM-1` `48` and `P-CT-IM-3` `23` — and is `P-CT-IM-3`'s write-log positive control reported BESIDE its term rather than inside it?** Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form (`pool.length = 14`) what the test file actually contains? **AND: is every pool/table member still consistent with its row's declared boundary text** — `§5.5.2` item 7's check **re-run against the LANDED tables** rather than this filing's? **AND: does the audit read the `(bounded)` set correctly — `5` marked of `10` ROWS?** **Any mismatch is a SPEC FINDING.** | `[T]` + the test file |
| **`A-15`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **assembled-app, stylesheet, computed-style, applied-declaration, containment-boundary, layout, paint or browser-acceptance** evidence from this unit's `[T]` green — and does it state explicitly that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**? | the DONE row |
| **`A-16`** | **THE FORK-FACING PROBE:** does any pass read this unit as delivering a working chrome taxonomy, an applied containment, or a rendered affordance — **or read the returned text as an applied style**? **Does the fork-facing carry (`§7` item 7) name the two seams, the class name and the returned record's two members?** | static + the DONE row |
| **`A-17`** | **THE `§7a.1` PROBE:** do the three reported items remain marked as **working defaults** / **derived-pending-confirmation** rather than silently hardened into contract without a ruling — and has the supervisor routed them? **A pass that treats a working default as ruled, or the derived item as a verbatim architect sentence, is a review finding.** | static + the DONE row |
| **`A-18`** | **THE RECONCILIATION PROBE:** does any pass read the presence of the declaration text or of the `className` member name as a CONTRADICTION of a landed sibling's ban table — **or, conversely, use `§2.2`(D)'s reconciliation to RELAX a landed prohibition**? **The reconciliation is a derivation with DECLARED exemptions and both controls; a pass that reads it either way is a review finding.** | static |
| **`A-19`** | **THE `C-4` RECONCILIATION PROBE:** is the mechanism-vs-UI-element reconciliation (`§7` item 5) read as a PERMANENT answer, **or is its one live clause honoured — that an APPLYING unit is a different unit needing the architect**? **Does any pass quietly rely on a reader that does not exist?** | static + the DONE row |

**⟶ LANDED 2026-09-27 — THE ADVERSARIAL PASS HAS RUN (`GATE 4`), AND THIS SEED SET IS ITS DISPOSITIONED
RECORD.** **The pass attacked the module at `841c33e` (the module landed at `91311ac`) and its verdict is
stated first because everything below is read against it:**
**`HOST DEFECTS: NONE`** **and** **`PACKAGE DEFECTS: NONE`** **— and the second is stated in the family's
own form, with its reason rather than as a bare zero: *an EMPTY IMPORT CENSUS (`R-4`), NO DOM/realm/MCP
surface, and NO shim member* — so this unit exercises no `provident-ssr` package surface at all and no
package finding CAN arise from it (`§7` item 10; `docs/defects.md`/`docs/HANDOFF.md` receive NOTHING from
this unit).** **IT FILED EIGHT FINDINGS, ALL OF THEM CONTRACT- OR HARNESS-SIDE** — **NOT ONE is a host or
package defect** — and **each is dispositioned in `§3b`'s tables: `ADV-CT-1` · `ADV-CT-2` · `ADV-CT-3` ·
`ADV-CT-4` · `ADV-CT-5` · `ADV-CT-6` · `ADV-CT-8` land in THIS contract, and `ADV-CT-7` is TEST-SIDE**
(an obligation of the TestWriter, recorded in `§3b`'s task list and discharged nowhere here).

**THE PASS'S OWN INDEPENDENT CONFIRMATION, recorded because it is the gate's strongest evidence: it
CONFIRMED THE ARITHMETIC INDEPENDENTLY and filed NO finding against it** — `48 + 26 + 23 + 10 + 12 + 5 + 3
+ 5 + 5 + 14 = 151`, **the chain `48 → 74 → 97 → 107 → 119 → 124 → 127 → 132 → 137 → 151`**, **the
subtotals `IM 124` · `SM 13` · `TP 14`**, **both caps (`151 ≤ 400` total, largest row `48 ≤ 100`)**, **the
pinned seed `20260927`** and **the `(bounded)` set of five** — **NOT ONE of them moved, and the pass is the
first reader to check them OTHER THAN the filing.** **ITS HONEST LIMIT, stated in its own record: it RAN
NOTHING** — the audit is a READ-ONLY reading of `tests/container.test.ts`'s tables and of this file's
cells, so **no reading below is a measurement, and `P-CT-TP-1`'s pool-vs-boundary check is re-RUN against
the landed tables by the same reading, `§5.5.2` item 7's obligation satisfied on the static half only.**

**The seed set's own status, stated so it is not misread, and AMENDED by the line above: `19` seeds, ALL
`OWED` at FILING — and the `GATE 4` pass has since dispositioned the ones its audit reached, which are
recorded in `§3b`; the remainder stay `OWED` until a later pass takes them, and a DONE row that cites no
adversarial pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3). **`A-14` is the gate-11 audit; `A-1`/`A-2` are the two claims this unit's
central artifact rests on; `A-3`..`A-5` are the once-and-unchanged and one-authority classes; `A-13`/
`A-15`/`A-16`/`A-19` are the layer-honesty probes; `A-7`/`A-8`/`A-18` are the collision classes this
family has historically failed on.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended
findings block needs **no renumbering and no new section**. **A row added later must use one of the
statuses defined at `§3a`, or the pass must define its new token IN THIS TABLE with a one-line
meaning** — **a bare `OWED` is the one status that may not survive the pass** (`AGENTS.md` item 11(e)).

**⟶ LANDED 2026-09-27 (gate 4). The tables below ARE the appended record: the EIGHT findings first (one row
each, with its disposition and the site the remedy lands at), then the READ-ONLY PBT AUDIT (one row per
register row), then the AUDIT-PASS NEGATIVE-GENERATOR TASK LIST. `PACKAGE DEFECTS: NONE` (empty import
census, no DOM/realm/MCP surface, no shim member); `HOST DEFECTS: NONE`.**

| Finding | Status | The finding, one line | Where the remedy lands |
| --- | --- | --- | --- |
| **`ADV-CT-1`** | **`CONTRACT-AMENDED`** | **`P-CT-IM-3`'s DISTINCT figure is MIS-GRAINED: the harness measures `18`, this contract printed `12`, and the contract's own re-derived formula gives `17` — so the print is wrong in BOTH directions at once.** **⟶ RE-DERIVED: the DISTINCT figure is `17`** = the `7` usable shapes' `1` reading + the `16` unusable entries' `10` module-observable readings + the `6` write-log/write-count readings (`1 + 10 + 6 = 17`); **the printed `12` is SUPERSEDED and stays VISIBLE at `§5.5.2` item 3 under its dated annotation.** | `§5.5.2` item 3's `P-CT-IM-3` ledger cell (annotated in place; the as-filed `12` kept visible) |
| **`ADV-CT-2`** | **`CONTRACT-AMENDED`** | **`P-CT-IM-3`'s own `§5.5.1` CELL still says `17` attempts / `10` unusable shapes while the register header and note `8.4` re-derived `23` (`7` usable + the landed `16`) — the exact cell-level stale print the header annotation was supposed to reach.** | `§5.5.1` `P-CT-IM-3`'s cell (the `23` / `7` + `16` form printed IN the cell, with the as-filed `17`/`10` text kept visible beside it) |
| **`ADV-CT-3`** | **`CONTRACT-AMENDED`** | **`P-CT-IM-1`'s `(bounded)` JUSTIFICATION (`§5.5.1`'s `(bounded)`-set block) rests on the clause *"`40` = `8` × `5` (the `8` further drives are ASSERTIONS over the same grid, printed beside the term)"* — the very clause note `8.4` declared WRONG.** **⟶ THE MARKING MUST CITE THE RE-DERIVED `48` = `8` × `5` + `8`, where those eight ARE DRIVES.** | `§5.5.1`'s `(bounded)`-set block (the `P-CT-IM-1` clause re-cited to `48` with the as-filed `40` form visible) |
| **`ADV-CT-4`** | **`CONTRACT-AMENDED`** | **A STALE-FIGURE CLUSTER: `§1` item 8's *"`10`-term / `137`-attempt"*, `§5.5.3`'s printed `154 = 40 + 26 + 17 …` line and its chain line, `§5.5.2`'s tail printing `137` as *"the DECLARED TOTAL"*, and the test-file header comments' `137` block — five stale sites, each readable as current.** **⟶ SWEPT TO `151` with the as-filed forms VISIBLE under dated annotations at every site.** **THE ONE SITE THIS PASS COULD NOT SWEEP ITSELF (it held no test-file tool) was the TEST-FILE HEADER COMMENT BLOCK: its obligation was `OWED — TEST-SIDE`.** **⟶ AND THAT SITE IS NOW SWEPT — `DISCHARGED 2026-09-27 (GATE 8), MEASURED, NOT ASSUMED: `tests/container.test.ts`'s header now reads *"the DECLARED TOTAL THIS HARNESS ASSERTS IS `151`"* with the `151` chain and BOTH the intermediate `137` and the as-filed `154` kept VISIBLE BESIDE it (the `137` block is retained above it as annotated provenance), and the file's own `DECLARED_TOTAL = 151` / `INTERMEDIATE_DECLARED_TOTAL = 137` / `AS_FILED_TOTAL = 154` constants agree with it.** **THE ONE TEST-SIDE HALF OF THIS FINDING IS THEREFORE CLOSED; no site of the `ADV-CT-4` cluster reads as current any longer.** | `§1` item 8 · `§5.5.3`'s printed-total and chain lines · `§5.5.2`'s tail · and (TEST-SIDE, NOW SWEPT) `tests/container.test.ts`'s header comment block |
| **`ADV-CT-5`** | **`CONTRACT-AMENDED`** | **`§5.5.2` item 9's correction repeats the stale `17`: its parenthetical names `P-CT-IM-3`'s `17` as including the write-log positive control, while the same item's `(3)` and note `8.4` pin that control BESIDE the term.** | `§5.5.2` item 9(1) (the parenthetical corrected to `23` for the drives only, the as-filed `17` kept visible) |
| **`ADV-CT-6`** | **`CONTRACT-AMENDED`** | **`§5.5.2` item 4's pool-exclusion list OMITS a landed member — *"a record whose `toString`/`valueOf`/`toPrimitive` throw"* — so the recorded boundary is narrower than the pool the contract's own `P-CT-TP-1` cell and the shipped set describe.** | `§5.5.2` item 4 (the member ADDED to the stated exclusions; the as-filed two-member list kept visible) |
| **`ADV-CT-7`** | **`CONFIRMED-REPAIRED 2026-09-27 (GATE 8, MEASURED)`** | **Its remedy was a row the TestWriter owned; NO `§5.5.1` statement, id, strategy id or attempt term changed for it.** **⟶ THE REPAIR IS PRESENT IN THE LANDED FILE, MEASURED AT GATE 8 (annotate-never-rewrite: the as-filed `OWED — TEST-SIDE` status is kept visible here): `tests/container.test.ts`'s `PRE-2` row carries the repair in its own words — *"THE TWO SELF-SATISFYING CHECKS THIS ROW CARRIED ARE REPAIRED HERE"* — with `s₁…s₃` and the `14` draw INDICES re-pinned as LITERALS (so a changed `LCG_A`/`LCG_C`/`LCG_MOD`/`SEED`, a two-step draw or a different pool length FAILS against a figure that did not move with it), and the drawn MEMBERS pinned as literals beside it (with the undrawn indices reported as a stated boundary).** **WHAT REMAINS `OWED — TEST-SIDE` IS A DIFFERENT, ALREADY-RECORDED CLASS: `§3b`'s SIX NEGATIVE GENERATORS below (the revoked-`Proxy` `chrome`, the lone surrogate, the non-enumerable/`Symbol`-key record, the non-object answers, the fresh-object-per-read resolver).** | `tests/container.test.ts` (the `PRE-2` row and the pinned draw literals), and the task list below |
| **`ADV-CT-8`** | **`CONTRACT-AMENDED`** | **THE LCG BIAS FIGURE IS OFF BY ~`10×`: `§5.5.2` item 5 prints *"≈ 3.3 × 10⁻¹⁰ per draw"*, but `1/306783378 ≈ 3.26 × 10⁻⁹`.** **The `4`-vs-`10` preimage split, `4294967296 mod 14 = 4` and the seed are all UNMOVED; only the printed magnitude was wrong.** | `§5.5.2` item 5 (the corrected figure printed beside the as-filed one) |

**THE READ-ONLY PBT AUDIT — one row per `§5.5.1` register row, with the disposition the pass gave.** **The
pass RAN NOTHING: every row below is dispositioned on the LANDED TEST FILE'S TABLES as READ, never on a
measured run, and *an un-run register row is a FAILURE, never a pass* (`AGENTS.md` item 11(b)) — so an
`OWED` here is an obligation, never a clearance.** **`ADV-CT-1`/`-2`/`-3`/`-5` land on rows below; `IM-3` is
the one row carrying BOTH a contract and a test-side obligation.**

| Register row | Strategy id | Audit disposition | The remedy / the standing obligation |
| --- | --- | --- | --- |
| **`P-CT-IM-1`** | `S-CT-ENUM-1` | **`CONTRACT-AMENDED` (the `(bounded)` justification, `ADV-CT-3`) + `OWED — TEST-SIDE` (negative generators)** | `§5.5.1`'s `(bounded)`-set clause re-cited to `48 = 8 × 5 + 8`; the driver owes the **revoked-`Proxy` `chrome`** negative generator below |
| **`P-CT-IM-2`** | `S-CT-EMPTY-1` | **`OWED — TEST-SIDE`** (negative generators) | the pool-versus-boundary reading is CLEAN; the driver owes the member-read negatives below |
| **`P-CT-IM-3`** | `S-CT-CLASS-1` | **`CONTRACT-AMENDED` (the cell `17`/`10` → `23`/`16` and the distinct figure `12` → `17`; `ADV-CT-1`/`-2`/`-5`) + `OWED — TEST-SIDE`** | the cell and the ledger row are fixed here; the driver owes the **lone-surrogate class name (`'\uD800'`)** negative generator below |
| **`P-CT-IM-4`** | `S-CT-DECL-1` | **`OWED — TEST-SIDE`** (negative generators) **⟶ ANNOTATED 2026-09-27 (GATE 7's `PF-9`; the `OWED — TEST-SIDE` status word is KEPT VISIBLE and stays the row's status for the SEPARATE six-generator class): THIS ROW'S OWN CONTROL CORPUS ALREADY DISCHARGES THE HALF THIS CELL'S REMEDY COLUMN DESCRIBES — `P-CT-IM-4`'s NON-PARSE observable **IS** the row's declared control corpus (`§5.5.1`'s cell, observable `(II)`: *a module-shaped string whose declaration is assembled from fragments, and a corpus that splits the text on `':'`, FAIL the row's own assertion while the module's own call PASSES it*), so the *"the non-parse/assembly half is STATIC-ONLY"* clause in this cell UNDERSTATES the landed row: the half is DRIVEN by the row's own declared-failing controls, and the `§3a` `A-2`-class bound that remains is the bound on the RETURNED-STRING equality (no browser acceptance, no applied style — `§5.2`), never on the corpus's existence.** **THE ONE TRUE OBLIGATION THIS ROW STILL CARRIES IS THE SIX NEGATIVE GENERATORS of the task list below (`§3b`), of which `P-CT-IM-4`'s own member is the assembly-detecting view's control — NOT a missing corpus.** **NO `§5.5.1` statement, id, strategy id or attempt term changes for this annotation.** | the byte-identity half is driven; the **non-parse/assembly half is STATIC-ONLY** (`§3a`'s own bound) and stays so *(as-filled clause, kept visible — read with the annotation above)* |
| **`P-CT-IM-5`** | `S-CT-SHAPE-1` | **`OWED — TEST-SIDE`** (negative generators) | the census is CLEAN as read; the driver owes the **non-enumerable member + `Symbol` key** negatives below |
| **`P-CT-IM-6`** | `S-CT-CONST-1` | **`CONTRACT-AMENDED` (already: `§0A` note 8.3(b)'s DISTINCT-IDENTITY-ACROSS-RECORDS reading, carried into the cell)** | no further change; the pairwise reading is the pinned one |
| **`P-CT-SM-1`** | `S-CT-STATELESS-1` | **`CONTRACT-AMENDED` (already: `§0A` note 8.3(c)'s LEFT rotation and the green `null` stop state)** | no further change |
| **`P-CT-SM-2`** | `S-CT-ENUM-1` | **`OWED — TEST-SIDE`** (negative generators) | the driver owes the **`''`/`false`/`NaN`/`Symbol`/`12n` answer** negatives below |
| **`P-CT-SM-3`** | `S-CT-NORMALIZE-1` | **`OWED — TEST-SIDE`** (negative generators) | the driver owes the **resolver returning a FRESH object per read** negative below (the row the pool deliberately excludes) |
| **`P-CT-TP-1`** | `S-CT-TP-1` | **`CONTRACT-AMENDED` (`ADV-CT-8`'s bias figure) + `OWED — TEST-SIDE`** | the pin/seed/caps are unmoved; the draw's bias magnitude is corrected at `§5.5.2` item 5 |

**THE AUDIT-PASS NEGATIVE-GENERATOR TASK LIST — the six the pass named, each to its row, each an
`OWED — TEST-SIDE` row the TestWriter authors (no term, id, strategy id, seed or cap moves for any of
them).** **(1) `P-CT-IM-1`: a `chrome` as a REVOKED `Proxy`** (the shape the `8`-shape domain omits).
**(2) `P-CT-IM-3`: a LONE-SURROGATE class name — `'\uD800'`** (a `string` of length `≥ 1` under the
declared domain, and the shape a host's UTF-16 handling is most likely to break on). **(3) `P-CT-IM-5`: a
record carrying a NON-ENUMERABLE member, and a record carrying a `Symbol` key** (both must FAIL the
two-name census). **(4) `P-CT-SM-2`: an answer of `''` · `false` · `NaN` · a `Symbol` · a `12n`** (the
non-object-answer class returned VERBATIM). **(5) `P-CT-SM-3`: a resolver returning a FRESH OBJECT PER
READ** (the successiv-read-inconsistency class the `P-CT-TP-1` pool deliberately excludes as ambiguous, so
its only home is here). **(6) `ADV-CT-7`'s own test-side row**, which the TestWriter owns and which this
contract does not name for it.

---

**⟶ DATED POINTER, `2026-10-11` — THE `docs/pending.md` CITATIONS IN THIS FILE RESOLVE HERE (`RCA-8(d)`: an ADDITIVE block at the file's end, inside the file-end note's own append rule; NOT ONE PRE-EXISTING BYTE IS REWRITTEN, no row id, term, strategy id, seed or cap moves).** **THE TWO CITED SITES: the gate-8 filing-state annotation cites the `docs/FORKER.md` container seam block's home row as `docs/pending.md` `§L-4e`, and `§7` item 7(d) cites `docs/pending.md` `§L-4b`'s container half.** **THE `§L-4` ROWS (`L-4b`, `L-4e`) AND THE LETTER `§L` ARE RETIRED BY THE `2026-10-11` SWEEP; EACH CITE-SITE RESOLVES TO A STUB IN `docs/pending.md` `§6.4` (`§L`'s row stubs) + `§6.6` (the letter stub).** **THE PER-ROW RECORD IS `archive/pending/2026-10-11-retired-rows-index.md` (`§D`); THE AS-FILED TEXT IS `archive/pending/2026-10-11-pending-as-filed-pre-sweep.md` (`sha256 b437a7db5398af3f14d8286f8b3e442ceae38308baf17ee8970da4fa89368382`, byte-identical to `git show 35fc7f2:docs/pending.md`).** **THE LIVE OBLIGATION IS RESTATED IN `docs/pending.md` `§2.9` (the `docs/FORKER.md` seam/glossary carries, `U-CONTAINER`'s two-edge block included) and `§3` (the lone-surrogate and negative-generator residues). This unit's authority remains `docs/next-steps.md`'s `## DONE — U-CONTAINER` section.**
