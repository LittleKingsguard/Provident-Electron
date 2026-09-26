# Spec — `U-GUTTER-UI`: the provident-authored gutter affordance (the UI half of the panes/zones family)

**Unit `U-GUTTER-UI` · wave `E` · ledger row `E10` · upstream `SCH-6` / `SCH-4` / `SCH-7` (the `A-d4`
panes/zones family — the UI half) · **COMPOSES `U-GUTTER` (`E3`) and, through it, `U-GSESSION` (`E6`,
`DONE`)** · derives the architect's intended-behaviour statement and the `E3`/`E10` scope split (A) ·
filed 2026-09-27.**

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing **lands one NEW file**
(`docs/specs/gutter-ui.md`) and **nothing else**. **The affordance module does not exist. The demo
envelope is unchanged. No test file exists. No red set has been run. No leg, no trio, no live battery,
no register row has been executed. No gate record exists.** The unit stays an **ADMITTED** row (`E10`,
`docs/pending.md` §I-septies) with its ledger status the supervisor's, and **it is NOT delegable until a
TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and this
filing's own dated ruling notes · `§1` — the scope and its five boundaries · `§2.1`–`§2.6` — the exact
surface, the caller-supplied/build split, the drag-state machine, the value derivation, the preview rule,
the capture decision, the cursor mapping and the composition seam · `§3.1`–`§3.5` — every state,
fail-state, invariant and static/existence row · `§3a`/`§3b` — the adversarial seed set at the file end ·
`§4` — the red, the authoring order and the binding stop conditions · `§5.1`/`§5.3`/`§5.5`/`§5.U` — the
wiring, the legs (**the live battery is MANDATORY**), the DONE-row shape, the typed register and the
delta matrix · `§6`–`§8` — falsification, honest limits, ambiguity report and the citation index.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s rows are cited **by
NAME**, `docs/next-steps.md` **by ROW ID**; the sibling specs' file-end notes carry the rule). **This spec
carries no length census of any file.**

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b`
file-end note — the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one file — the NEW `docs/specs/gutter-ui.md`** — and edited **no existing file**, ran **no
   suite, no leg, no trio, no `tsc`, no Electron boot**, and made **no commit and no writing git command of
   any kind**. **The affordance module (`src/shared/gutter-affordance.ts`), the demo-envelope authoring
   (`src/shared/demo-envelope.ts`), the test file (`tests/gutter-ui.test.ts`), the red set, the live
   battery's records, the register's EXECUTED layer, the greens set, the gate records and the DONE row ALL
   DO NOT EXIST YET.** The unit is **`OWED` at every gate after this one**.

2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW
   `src/shared/gutter-affordance.ts`** exporting **THREE value exports and SEVENTEEN type declarations =
   TWENTY exported names** (`§2.1`) — **⟶ CORRECTED TWICE: the as-filed cell read *"FOUR value
   exports and SEVEN type declarations = ELEVEN exported names"*; the gate-1 repair pass wired
   `PointerResolver` (`4 + 7`), and the gate-1 STEP-3 pass's seam ruling (`§R.2` `R-SEAMS`) made the eleven
   seam types exported contract and restored the omitted `GutterAffordanceStats`, giving `4 + 17`; **and the
   same pass then DELETED the redundant `sizeFromPointer` VALUE (one seam, two exported spellings of it,
   which `§3.4 R-1`'s by-name set-equality cannot adjudicate), giving the ruled `3 + 17 = 20`** — the
   arithmetic term by term is at `§R.3` and the twenty names
   are printed there** (`§2.1`)**, which **consumes** the `E3` controller and the landed session through
   the frozen delegate surface (`docs/specs/gsession.md` `§2.5`) and **adds no second writer and no second
   gesture authority**; **PLUS an authoring change to `src/shared/demo-envelope.ts`** (the authored gutter
   card of `§2.1` item 7) — the **only** production sites this unit touches, both named in `§5.1`.
   **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): THE PRODUCTION SITES ARE NOW THREE, NOT
   TWO — the third is the bounded RENDERER WIRING (`src/renderer/renderer.ts` + `Runtime.elementForNodeId`
   in `src/renderer/runtime.ts`), which is where the affordance is actually constructed in the running app
   (`§R.1`, `§5.1` allow-list rows `10`/`11`). The as-filed *"the only production sites this unit touches"*
   sentence is SUPERSEDED on its count; its provident-authoring substance is unchanged.**

3. **THE REGISTER (`§5.5.1`): `7` typed rows in THREE families** — `P-GU-SM-1`..`P-GU-SM-3` ·
   `P-GU-IM-1`..`P-GU-IM-2` · `P-GU-TP-1`..`P-GU-TP-2` — **`140` declared attempts, printed with their
   seven terms and a term-by-term addition at `§5.5.3`** (**⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR
   PASS (`§R` `R3`): the as-filed figure here was `142`, which was the SIXTH mis-sum of this family — the
   `P-GU-SM-2` term is `15` by the row's own drive table (`5` stages × `3` move shapes), so the total is
   `22 + 15 + 15 + 45 + 20 + 18 + 12 = 140`; the as-filed `142` was computed from a `10` that appears in
   no cell of the row. **THE AS-FILED `142` IS KEPT VISIBLE HERE; `§5.5.3` carries the corrected addition
   and `§5.3` item 11 the corrected DONE-row print.**) — **⟶ AND SUPERSEDED ON THE FIGURE 2026-09-27, THE
   `E-3` RE-GRAIN PASS (the architect's *"Re-grain."*; `docs/pending.md` §I-terdecies; `docs/decisions.md`
   `A DECLARED REGISTER TERM IS A DRIVE COUNT`): **THE DECLARED TOTAL IS NOW `134` = `15` + `15` + `15` +
   `45` + `20` + `12` + `12`**, because a declared register term IS a drive count — `P-GU-SM-1` `22 → 15`
   (its `12` mid-drag items are ASSERTIONS over `5` drives, printed as a separate assertion figure beside
   the term) and `P-GU-TP-1` `18 → 12` (its `stats()`/`controller` items are READINGS of the same state,
   printed as a separate reading figure beside the term).** **THE `140` PRINTED ABOVE IS KEPT VISIBLE AS THE
   PRE-RE-GRAIN READING; `§5.5.1`'s two cells, `§5.5.2` item 4's ledgers, `§5.5.3`'s arithmetic and `§5.3`
   item 11's DONE-row requirement all carry `134` and the re-grain's dated annotation.** **The `2`-row
   `(bounded)` count in this item is a separate stale figure too — the ruled set is `4` of `7` (see
   `§5.5.1`'s `(bounded)` set and `§5.5.2` item 2).**, no generator (so **no pinned seed is needed and
   none is claimed**), **`2` rows carrying a `(bounded)` marking**, and **the row count is SMALL ON
   PURPOSE** — the lesson the parked `E3` cycle taught (`docs/pending.md` §I-septies: `E3`'s `13`-row
   register generated a mis-sum, four wrong declared-vs-distinct figures, two enumerations that did not
   match their own drives and a stale harness constant), so **a row this unit cannot drive is worse than
   no row** (`§5.5.2` item 2).

4. **THE LEGS THIS UNIT DECLARES (none run):** the node suite `[T]` — `npm test` — plus
   `npm run typecheck` `[H]` (**`src/**` ONLY**; it never reads `tests/**` — `tsconfig.json`'s `include`
   is `src/**/*.ts` and its `exclude` names `tests`), `npm run build` `[H]` (**five bundles**), a
   **standalone strict `tsc --noEmit` over `tests/gutter-ui.test.ts`**, **`npm run ui` `[U]` — the
   real-DOM leg, MANDATORY for this unit**, and **`npm run divergence` `[A]`** as the `npm run ui`
   precondition. **THE LIVE BATTERY IS MANDATORY AND NEVER PARKED-BY-DEFAULT** (`§5.2`): this is a
   **UI-RENDERING unit**, and `docs/pending.md` §I-septies says so in the admission ruling itself.

5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no
   blind-greens record (`docs/specs/gutter-ui-greens.md` is named in the diff scope and is OWED), no
   per-unit documentation review, no DONE row (`§5.3` fixes its twelve-item shape), and **no gate is
   waived**.

6. **THE OPEN QUESTIONS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1` — **three** items): the
   **hover evaluation budget** for the axis/cursor seam (the `E3` controller cannot be asked outside an
   established gesture, so the hover read needs its own seam); the **timing of the invalid-release
   decision** (a `reset` is legal only for an ACTIVE gesture, and the session ends every gesture at its own
   `pointerup`); and the **preview channel's write form** (a transient presentation write on the
   provident-rendered element, versus an authored-state write that would re-render mid-gesture). **Each
   has a working default implemented in `§2` and a recommendation; a later pass that changes one must open
   a gate.**

7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO
   existing file):** `docs/next-steps.md`'s row **`E10`** still reads its spec cell as **`OWED — not
   filed`** and its status as the as-filed `BLOCKED` chain; its `Legs` cell already carries the mandatory
   live-battery clause. **`E3`'s parked status is NOT touched by this filing** — `E3` stays
   `LANDED-GREEN-AT-90/90 WITH ITS CHECKS PARKED` (`docs/pending.md` §I-septies item 3), and **this unit
   is the only place those checks become observable**.

8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone
   (globbed this pass), so there is **no test-use-case coverage matrix and no demo-page index to update**
   (`§3.5 R-10` is the probe that keeps the claim falsifiable; `§7` item 8).

9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** One file written, zero files edited, no test
   run, no leg run, no trio run, no `tsc` invocation, no Electron boot, no commit. The new file is
   **untracked and must be committed by the supervisor** (`RCA-8`'s per-gate commit rule).

10. **⟶ RECORDED 2026-09-27 — THE GATE-1 REPAIR PASS (R1–R8), AND WHAT IT CHANGES ABOUT EVERY ITEM
    ABOVE.** **Items 1–9 above are the AS-FILED state of the FIRST filing and stay visible as the record
    of that pass.** **The contract in this file has since been REPAIRED IN PLACE** by the gate-1 repair
    pass (`docs/pending.md` §I-octies, whose two owed architect rulings have now been given), and this
    repair **changes what the as-filed text said in exactly the places §R lists** — among them: **the
    affordance IS now wired in the running app from an ALLOWED renderer path (§R1, `§5.1`), the live
    observables have instruments and a manual-record form (§R2, `§5.U`), the register total is corrected
    from the mis-summed `142` to `140` (§R3, `§5.5.1`/`§5.5.3`), the drag half has a move listener (§R4),
    the capture claim is WITHDRAWN (§R5), the value channel is ruled (§R6), and the invalid release is
    ruled (§R7).** **NO SOURCE FILE WAS EDITED BY THE REPAIR PASS EITHER — it edits this file only.**
    **The unit remains NOT GREEN and NOT DELEGABLE until the deferred gate-1 steps 3–4 (architecture ·
    change-analysis) run on THIS repaired contract** (§R's closing block).

---

## R. THE GATE-1 REPAIR RECORD (2026-09-27) — **the rulings this pass lands, each with its site**

**WHAT THIS SECTION IS.** **`§R` is a REPAIR RECORD, not a tenth contract section**: it states, once and
in one place, **the eight rulings (`R1`–`R8`) that the gate-1 review's findings and the architect's two
rulings produce**, each with **its landing site in this file**. **Every as-filed clause a ruling changes
is kept visible at its own site with a dated `⟶` annotation naming this repair** — **nothing was rewritten
silently and no section was renumbered** (`§5.3`'s numbering note and the file-end note both still hold).
**`R*` here are REPAIR ids and are NOT contract row ids**: the `R-*` rows of `§3.4`/`§3.5` and the
`R1`–`R4`/`R0`–`R4` row names of `docs/specs/ci-ui-leg.md` are DIFFERENT namespaces and are always cited
with their section (`§3.4 R-n`, `§3.5 R-n`, `ci-ui-leg.md §3.0 Rn`).

**The architect's decisive ruling, recorded verbatim in substance (2026-09-27): *"Yes the UI change is
allowed to touch the renderer — the UI needs to be rendered."*** **The filed contract had inherited
`src/renderer/**` from the sibling mechanism units' denied sets, which is wrong for THIS unit**: a UI unit
with no in-app composition site is **observability-empty by construction** (`docs/pending.md` §I-octies's
`[DECISIVE]` finding), and the architect's ruling removes that inheritance **bounded** — the renderer
wiring is admitted, **the shell chrome and the preload/MCP surface stay denied**, and the project-wide
provident-authoring constraint is **carried, not lifted** (`AGENTS.md`).

| # | The ruling | Lands at |
| --- | --- | --- |
| **R1** | **THE RENDERER WIRING IS ALLOWED — BOUNDED.** `src/renderer/renderer.ts` and `src/renderer/runtime.ts` enter the ALLOW-LIST for **exactly four roles** (construct the session + `E3`'s controller; resolve the affordance's rendered element(s) **from the producing graph**; call `createGutterAffordance(...)` and attach; drive the preview write) and **nothing else**; **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): THE AS-FILED *"exactly four roles"* IS A STALE COUNT AND THE RULED LICENCE IS **FIVE** ROLES — the list above omits the FIFTH, the `commit` seam's ONE managed-channel write, which the LATER step-3 pass added (`§2.1` item 8(v), `§R.2` `R-13`). THE AS-FILED COUNT IS KEPT VISIBLE; THE LIVE FIGURE IS `FIVE`, and `§2.1` item 8 / `§2.2` P-10 / `§3.4 R-13` all read `FIVE`. A pass that re-states *"four roles"* as the licence FAILS `§3.4 R-13`.** `src/main/**`, the preload/MCP surface, the shell chrome, `package.json`/`package-lock.json`/`tsconfig`/`vitest.config`, `scripts/**`, every sibling `src/shared/*` module + test, **`E3`'s `src/shared/gutter.ts` + `tests/gutter.test.ts`** and the **frozen `src/shared/gesture-session.ts` + its test** stay DENIED. **The constraint that governs the admitted edits: the affordance stays provident-rendered data driven through the producing graph — a renderer edit that HAND-WRITES DOM is a finding; the only renderer-side code this unit may add is the WIRING, never UI content.** The observability-empty clauses are DELETED; **who/where/which command is answered in the block below.** | **`§5.1`** (DENIED item 4 corrected, allow-list rows `10`/`11`, the renderer constraint, the scope-id note, `§3.4 R-9`/`R-11` repointed), **`§1` item 6**, **`§3.4 R-9`**, **`§3.5 R-8x`**, **`§5.2` leg 3**, **`§3.3 I-11`** |
| **R2** | **THE LIVE OBSERVABLES HAVE INSTRUMENTS — AND WHERE NONE EXISTS, AN HONEST RECORD.** Every `§5.U` U-row states **the exact command and the exact observed value**; **`§5.2` leg 5's claim that `npm run ui` exercises the pointer half is CORRECTED** (the leg drives `provident.dispatch` with **no coordinates**, and it **loads its own probe envelope**); **no shipped instrument emits `§5.U`'s structured coverage report**, so it is ruled a **MANUAL record the live-battery runner writes**, with its required fields quoted; rows a shipped instrument cannot measure are labelled **`NOT-OBSERVABLE (structural: …)`** and none is reached for convenience. | **`§5.2` leg 5's note, `§5.2` leg 6's note (the new `[U]`-instrument rule), `§5.U` items 1/2/4, `§5.3` item 12**, **`§4.4 S-12`'s companion** |
| **R3** | **THE REGISTER ARITHMETIC IS RULED FROM THE ROW'S OWN DRIVE TABLE.** `P-GU-SM-2` is **`15`** (`5` stages × `3` move shapes — the row's own cell); the **`10` in `§5.5.3`/`§5.3` item 11 was the sixth mis-sum of this family and is CORRECTED**; the declared total is **`140` = `22 + 15 + 15 + 45 + 20 + 18 + 12`** (see the ruling above; the as-filed `147`/`142` disagreement is resolved to `140` BY THE ROW'S OWN TABLE), printed **WITH its terms and the term-by-term addition**; the family subtotals are `52 / 65 / 30`; **`P-GU-SM-1`'s `12` and `P-GU-TP-1`'s `18` are re-granulated as ASSERTIONS-COUNTED-AS-DRIVES with their honest DISTINCT-DRIVE figures printed BESIDE them** (`15` and `12`), the caps (`≤100`/row · `≤400` total · stop-after-5) staying satisfied. | **`§5.5.1`** (`P-GU-SM-1`/`P-GU-TP-1` cells + the totals block), **`§5.5.2` item 4**, **`§5.5.3`**, **`§5.3` item 11**, **the status block's item 3** |
| **R4** | **THE POINTER CHANNEL IS RULED: THE MODULE ATTACHES ITS OWN MOVE LISTENER.** The module attaches **its OWN `'pointermove'` listener** to the affordance **through the source seam**, using a **caller-supplied event-type token (`moveTypeOf`, with the module's own non-pointer fallback `'move'`)** that **does NOT replicate the session's private `POINTER_TYPES` constant**; the **secondary-press observation point `F-7` needs is the module's own `'pointerdown'` turn**; **`M-4`'s *"exactly THREE"* is reconciled to the per-listener-set counts (the module's FOUR vs the session's ONE, five `source.on` calls in the composed attach)**; the **ordering** between the module's move turn and the session's wrapped `onMove` is stated, **including a move that arrives before the handle is captured**. | **`§2.1`** (the `moveTypeOf` seam + the corrected listener clause), **`§2.2` P-2/P-3's counts, `§2.3` rows 2/8 + the ordering clause, `§3.1 M-4`/`M-15`, `§3.2 F-7`, `§3.4 R-12`, `§3.3 I-8`, `§5.5.1 P-GU-SM-1`** |
| **R5** | **THE CAPTURE CLAIM IS WITHDRAWN.** **`E3`'s `attach(element, hooks?)` cannot carry `capture`** (its sealed clause forbids the opt-in) and **`E3` is FROZEN with its checks parked**, so **`§1` item 1, `§2.6` item 4 and `§0A` note 10's capture claim is WITHDRAWN**, the **vacuous rows `F-11` and `I-4` are DELETED with dated tombstones**, and the need becomes a **named `E3`-SIDE owed item** (a drag that must keep the pointer outside the affordance's box needs the opt-in, which needs `E3`'s `attach` to accept it or the wiring to install directly) **with its revisit condition and its honest UX consequence**. | **`§1` item 1, `§2.1`'s `capturePointer` seam cell, `§2.2` P-6, `§2.3` row 2, `§2.6` item 4, `§0A` note 10, `§3.2 F-11` (tombstone), `§3.3 I-4` (tombstone) + the new `I-13`, `§3.4 R-6`, `§4.4 S-6`, `§5.5.1 P-GU-TP-2`, `§6` item 2, `§8` (the new `E3`-side owed row)** |
| **R6** | **THE VALUE CHANNEL IS RULED: THE AFFORDANCE'S OWN `onMove` HOOK CALLS `handle.set(...)`.** The **session's documented consumer-side value channel** (`docs/specs/gsession.md` `§2.5` item 9) **is the channel**, the **wrapper passes the handle** (`E3`'s `wrappedOnMove` → the module's `onMove`), and **`E3`'s terminal commits the CLAMPED value read from it** — so the module supplies **`sizeFor: (element, gesture) => gesture.value`** and **no sixth seam is invented**. | **`§2.1` (the `sizeFor` wiring clause + `§2.1` item 3), `§2.3` row 8, `§2.4` item 2's chain, `§3.1 M-8`, `§5.5.1 P-GU-SM-1`** |
| **R7** | **THE INVALID-RELEASE RESOLUTION IS RULED (the architect's *"On release: if dragged state is valid, commit resized state, otherwise, reset"*).** The **VALID path** is the **session's own `pointerup` ⇒ `end` ⇒ exactly one commit of the CLAMPED DRAGGED VALUE**; the **INVALID path** is the **`reset` terminal taken the moment invalidity is ESTABLISHED during the drag** — **for a resizable element that means a SEAM FAILURE (an unusable pair, an unusable default, a discarded record), NOT an ordinary out-of-bounds value, which `E3` simply CLAMPS** ⇒ **exactly one commit of the CLAMPED PRE-DRAG SIZE the consumer holds, with the handle cleared so the later `pointerup` commits nothing**; the **visible state reverts** (the new `U-4`/`M-13` observable). **The architect's release clause is thereby observably satisfied**; **the divergence from "decide at the release instant" is stated, with the alternative (routing the timing to `U-GSESSION`, a new gate) named as REJECTED-FOR-NOW.** | **`§0A` note 6, `§2.3` items 5/9 + the terminal write table, `§2.4` item 2, `§2.5` item 3, `§2.6` item 5, `§3.1 M-13`, `§3.2 F-10`, `§4.4 S-4`, `§5.5.1 P-GU-SM-1`/`SM-3`, `§5.U` `U-4`/`U-5`, `§7a.1` item 2** |
| **R8** | **THE REMAINING DEFECTS: (a)–(g).** (a) the import census is stated and the contradiction dropped (`clampToBounds` value + the two type-only imports; **the session instance reaches the controller through the WIRING, not a value import**; `4 + 7 = 11` reconciled); (b) **`PointerResolver` is WIRED** into the options (`pointerOf?`) so the `4 + 7` census is the true one; (c) the **cursor target is the hovered AFFORDANCE** and every call site agrees; (d) the **invalid arm's preview REVERTS to the pre-drag size**; (e) the **two-writer falsifier is replaced by a LIVE-COMPOSITION check** (the sink's own record vs the controller's counter on the REAL session and the REAL wiring); (f) **`M-1`/`M-2`/`M-3` are marked `EXPECTED-RED AGAINST THE LANDED E3`** with their `OWED — E3-SIDE` owner and the DONE-row print shape (never "green"); (g) the **citation repairs** (`M-8b`, `P-7`→`R-11`, `P-9`→`F-13`/`I-10`, `R-9`'s untracked-file scope). | **`§2.1` (imports clause, `PointerResolver` wiring), `§2.6` item 3 + `§2.3` rows 4/5, `§3.1 M-11`, `§2.5` item 3, `§3.1 M-5`, `§3.1 M-1`/`M-2`/`M-3` + `§3.2 F-5` + `§5.3` item 4, `§2.2` P-7/P-9, `§3.2 F-11`, `§3.4 R-5`, `§5.1`'s scope-id note** |

### R.2 The seam ruling the architect gave AFTER the repair — **the eleven caller seams are the family's DOWNSTREAM CONTRACT** (2026-09-27)

**WHAT THIS SUBSECTION IS, AND WHY IT IS A RECORD RATHER THAN A RULING OF THIS PASS.** The gate-1 step-3
review (`docs/pending.md` §I-decies) filed condition **`C-1`…`C-10`** and escalation **`E-1`**, whose
proposal was *"let `demo-envelope.ts` export the demo's seam bundle as the deliverable"*. **THE ARCHITECT
RULED AGAINST THAT PROPOSAL AND SETTLED THE QUESTION ITSELF** (`docs/pending.md` §I-undecies, verbatim:
*"The caller seams will need to be used by the downstream projects, these are not just demo tools."*;
`docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`, cited by NAME). **THE RULING,
in two sentences: the eleven caller seams — `sizeFromPointer` · `axisOf` · `cursorOf` · `applyPreview` ·
`applyCursor` · `startSizeOf` · `boundsOf` · `resizableOf` · `commit` · `pointerOf` · `moveTypeOf` — are a
PUBLIC, EXPORTED, DOCUMENTED CONTRACT that DOWNSTREAM CONSUMERS (forks) IMPLEMENT, and this repo's demo
supplies exactly ONE EXAMPLE IMPLEMENTATION of it; the contract itself is the module's exported seam types
plus the seam table below.** **`§R.2` therefore lands `R-SEAMS` (this pass), and `R-9`…`R-13` below are the
pass's own `C-1`…`C-10` rulings.** **These are REPAIR ids, not contract row ids (`R.2`'s opening rule); the
eleven seam NAMES are contract, the `R-*` ids are not.**

| # | The ruling | Lands at |
| --- | --- | --- |
| **R-9** | **`C-1` — `elementForNodeId(id)` IS PINNED: ITS ID SPACE, ITS RESOLUTION, ITS CALL SITE, ITS NULL DISCIPLINE, AND THE FACT THAT IT IS NEW.** The id space is **engine `nodeId` first, then authored `css.id`, then authored `props.id`** — the precedence `resolveString` already uses (`src/renderer/runtime.ts` `resolveTarget`); resolution is **attribute-walk-only from the live mount** (`data-node-id`, which the runtime opts into with `renderOptions.nodeIdAttribute = true`), with **NO `querySelector*`, NO `closest`, NO `getElementById`, NO element creation**; **the call site is `main()` in `src/renderer/renderer.ts`, IMMEDIATELY AFTER `runtime.bootstrap()` and BEFORE the `if (!bridge)` conditional, and NOWHERE ELSE**; and the **null discipline** is **unresolvable ⇒ `null` ⇒ `attach()` returns `false` ⇒ a no-op, NEVER a throw**. **`Runtime` HAS NO EQUIVALENT METHOD TODAY** (`resolveTarget`/`resolveString` are private and return a NODE ID, not an element): the method is **GENUINELY NEW**. | **`§2.1` item 8(b), `§3.4 R-13`(iv), `§3.3 I-14`, `§5.1` row `11`, `§R.1` item 2** |
| **R-10** | **`C-2` — THE SOURCE HANDLERS ARE `(event: unknown) => void`, AND THE WIRING'S SOURCE IS THE ONLY DOM-EVENT OBSERVER AND FORWARDS THE EVENT — ON BOTH TURNS.** `EventSourceLike.on`/`off` are re-declared with the **forwarding** handler type; the wiring's source passes the DOM event as the handler's FIRST argument; **both the module's move turn and the module's pointerdown turn read that argument** (the pointerdown turn for the button read). **This is what makes a live pointer reachable at all**, and it is the governing finding of the step-3 review — **without it the module's listeners are coordinate-blind and the module's own drives would be the only way the value chain ever runs**. | **`§2.1`'s `EventSourceLike` block (with the as-filed zero-argument form kept visible), `§2.2` P-10, `§2.3` rows 2/6/8/10, `§3.4 R-6`, `§3.4 R-13`(v)** |
| **R-11** | **`C-3` — THE MODULE'S MOVE TYPE IS `POINTER_TYPES.move`, OBTAINED BY THE WIRING.** The opaque caller token is **SUPERSEDED as the only form**: the wiring supplies **the session's own exported constant's value** (`POINTER_TYPES.move` of `src/shared/gesture-session.ts`), so the type the module registers **IS the session's move type by construction**; the module still reads it through its total gate and still attaches nothing for a non-string/empty token. **A caller-invented token that attaches a type nobody dispatches is the `B-9`/`P-9` false-green class** (the row would stay green while nothing ever moved), so **the row asserting the registration asserts the TYPE MATCHED THE SESSION'S, not merely the COUNT** (`§3.1 M-18`, `§3.4 R-14`). | **`§2.1`'s `moveTypeOf` cell, `§2.1` clause 2/9, `§2.3` row 2, `§3.1 M-18`, `§3.4 R-14`, `§5.5.1 P-GU-SM-1`** |
| **R-12** | **`C-4` — LISTENER OWNERSHIP IS STATED FOR BOTH SETS ON THE SAME ELEMENT.** **The module's FOUR** (`pointerover`, `pointerout`, `pointerdown`, and the move type) are attached **through the injected source to the affordance element** and removed by **the MODULE** with the SAME three values; **the session's own set** (its `pointerdown` install plus, once a gesture establishes, the `move`/`end`/`cancel` tracking trio — **four event types, installed and tracked by the SESSION**) is removed by **the SESSION**, via `E3`'s `detach`/`dispose`; **the WIRING removes NOTHING** — it installs nothing itself and detaches nothing itself. **Both sets live on the SAME element, and neither owner removes the other's.** | **`§2.3` row 2's ownership clause (new), `§3.3 I-15`, `§3.1 M-15`, `§2.2` P-10** |
| **R-13** | **`C-5` — THE COMMIT SINK'S WRITE ROUTE IS NAMED, AND THE RE-RENDER HAZARD IS BOUND TO THE COMMIT TOO.** The wiring's `commit` seam performs **ONE managed-channel write on the runtime: `Runtime.applyCommand({ kind: 'state-slice', node: <the authored status node's engine id>, mutation: [{ targetProp: 'content', mode: 'replace', value: String(clamped) }] })`** — **NOT a preview write, NOT a direct graph dispatch authored in the handler body, and NOT the module's** (`E3` remains the single writer). **`§2.5` item 5's re-render hazard is bound to the COMMIT as well as to the preview**, and the **element-identity question is RULED AS AN OPEN CHOICE, not silently decided: `E-2` is escalated to the architect** — if the committed write replaces the affordance element, the affordance is single-shot and the wiring owes a **REBIND**, which would be a **SIXTH wiring role** and is **NOT** granted by this pass (see `§R.3` and `§7a.1` item 4). | **`§2.1` item 8(v) (the fifth role, marked `E-2`), `§2.2` P-10, `§2.5` item 5, `§3.1 M-19`, `§7a.1` item 4** |
| **R-14** | **`C-6` — `M-2` RESTATED TO THE MODULE-OBSERVABLE FORM, AND ITS `E3`-SIDE HALF MARKED `UNSATISFIABLE FROM THIS UNIT`.** As filed `M-2` demanded that the module *honour* `session.disposed === true` while **`M-1` forbids the module from referencing any session member by name — including `disposed`** — so the row was **UNSATISFIABLE from this unit**, not merely expected-red. **THE RESTATEMENT:** the module's own observable half is **`attach()` ⇒ `false`, `detach()` ⇒ `false`, every member total, and ZERO session calls** over a disposed-session double; **the `E3`-side half (`detached` reflecting the session's own disposal, and `attach`/`detach` short-circuiting before delegation) is `UNSATISFIABLE FROM THIS UNIT`** because the remedy is in the DENIED `src/shared/gutter.ts`. **`M-1`'s runtime half — the two-writer/single-writer census — is NOT expected-red; only its static half (ii), the invented seam in the denied file, is.** | **`§3.1 M-2` (as-filed text kept visible), `§3.2 F-5`, `§3.1 M-1`, `§5.3` item 4** |
| **R-15** | **`C-7` — THE DECLARED-TERM DERIVATIONS ARE CORRECTED WITHOUT MOVING A DECLARED TERM.** `P-GU-SM-1`'s `22` must **NOT** be derived as `10 drives + 12 assertions` (the `E3` `IM-4` class — an assertion count printed as a drive): its derivation is **`22` declared `22` with `15` distinct drives and `12` mid-drag ASSERTIONS printed beside it`**; **`P-GU-SM-1` is marked `(bounded)`** (its text quantifies over *"EVERY terminal path … and EVERY composition shape"* while its table drives `5` paths × `2` shapes), and **`P-GU-TP-1` is marked `(bounded)`** (its text says *"EVERY argument shape"* over `6` fixed shapes — it was ALREADY carrying the distinct-drive caveat but no marking). **NO DECLARED TERM MOVES: the total stays `140` and `E-3` (whether the honest distinct figures should BECOME the declared terms, moving `140 → 127`) stays an OPEN ARCHITECT CHOICE, reported at `§7a.1` item 5 and decided by nobody in this pass.** | **`§5.5.1`'s `(bounded)` set + the two rows, `§5.5.2` items 2/4, `§5.5.3`, `§5.3` items 10/11, `§7a.1` item 5** |
| **R-16** | **`C-9`, `C-10` AND THE RESIDUAL RISKS THE STEP-3 RECORD CARRIES.** The three stale clauses the last repair left are swept (`§2.6` item 3's *"authored in `demo-envelope.ts`"* wording, `§7` item 13's capture claim, `§2.1` item 7's *"no renderer file changes"*), **and the four residual risks of §I-decies are recorded where they belong**: the `npm run ui`/`npm run divergence` *"same built tree"* claim is **not mechanically true** (both scripts rebuild — `§5.2` leg 5's precondition note), leg 3's *"five bundles"* is really **four esbuild outputs + a copied `index.html`** (`§5.2` leg 3), a **post-boot re-derivation (`load`/`code.load`) tears the graph down and the wiring does not re-attach** — stated as **OUT-OF-CONTRACT, with the rebind obligation named as `E-2`'s** (`§1` item 5, `§2.3` row 1, `§7` item 15), and **the listener-ordering guarantee is asserted FROM THE SOURCE-CALL LOG, never from a real-DOM premise** (`§3.1 M-4`, `§2.3` row 8). | **`§2.6` item 3, `§7` items 13/15, `§2.1` item 7, `§5.2` legs 3/5, `§2.3` rows 1/8, `§3.1 M-4`** |

### R.3 THE SEAM CONTRACT — one row per seam, and one row per degradation class that can FAIL

**THIS SUBSECTION IS THE NORMATIVE SEAM TABLE.** **Per `docs/decisions.md`
`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`, every seam below is a REQUIREMENT ON THE
IMPLEMENTING CONSUMER (a fork), and its DEGRADATION is contract text: absent / non-callable / throwing ⇒
the declared safe default in the last column, NEVER a silent no-op.** **The signatures are the module's
EXPORTED seam types (`§2.1`), so a fork imports them rather than re-declaring a shape.**

| Seam | Signature (the module's EXPORTED type) | Required? | What a fork supplies | DECLARED DEGRADATION (absent / non-callable / throwing) |
| --- | --- | --- | --- | --- |
| **`sizeFromPointer`** | `SizeFromPointer = (pointer: PointerPosition, start: number) => unknown` — **⟶ PINNED TO ONE SPELLING 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A7`): THE NORMATIVE SPELLING IS THE MODULE'S EXPORTED **INTERFACE CALL SIGNATURE**, `export interface SizeFromPointer { (pointer: PointerPosition, start: number): unknown }` (`§2.1`'s code block). The function-TYPE spelling printed in this cell is the SAME TYPE and stays visible as this table's own form, but a fork that re-declares a shape of its own, and a row that asserts the SEAM's type by any other spelling, FAILS `§3.4 R-1`(b)'s by-name census. THE TWO SITES MOVE TOGETHER: this cell and `§2.1`.** | **REQUIRED** | the coordinate-to-size mapping for the fork's own axis semantics | a non-number answer reaches `clampToBounds` and yields `NaN` ⇒ **the move is INVALID ⇒ the `reset` arm** (the drag never silently keeps a stale value) |
| **`axisOf`** | `AxisOf = (element: unknown) => unknown` | **REQUIRED** | the fork's axis token for an element (also wired into `E3`'s `axisFor` from ONE closure) | `undefined` token; **the cursor seam is refused (no write)** and `E3`'s `boundsFor`/`defaultSizeFor`/`isResizable` see the same `undefined` and degrade **exactly as `E3` declares** (an unusable pair/default ⇒ the reset arm or a refusal) |
| **`cursorOf`** | `CursorOf = (token: unknown) => unknown` | **REQUIRED** | the token-to-cursor-declaration mapping (the fork's cursor vocabulary) | `cursorDeclarationFor` resolves `undefined` ⇒ **NO cursor write** (and `stats().lastCursor` stays `''`) — **observable, never a silent success** |
| **`applyPreview`** | `ApplyPreview = (state: PreviewState) => void` | **REQUIRED** | the transient presentation write for the fork's own element/stylesheet | **the turn's work stops: the throw PROPAGATES** (consumer code), the per-gesture record is discarded in the module's `finally`, and `stats().previews` reflects what was invoked before the throw — `F-8` |
| **`applyCursor`** | `ApplyCursor = (element: unknown, declaration: string \| undefined) => void` | **REQUIRED** | the cursor presentation write on the hovered affordance | **the throw PROPAGATES**, the clear never happens for that hover, and the counters stay as incremented — `F-8` |
| **`startSizeOf`** | `StartSizeOf = (element: unknown, token: unknown) => unknown` | **REQUIRED** | the pre-drag size the consumer holds (also `E3`'s `defaultSizeFor`) | a non-number ⇒ the reset's clamp yields `NaN` ⇒ **the `reset` is refused (`'unusable-default'`) with ZERO sink writes** — the declared `E3` refusal, not a silent commit |
| **`boundsOf`** | `BoundsOf = (element: unknown, token: unknown) => unknown` | **REQUIRED** | the `{min, max}` pair for the element | an unusable pair ⇒ `clampToBounds` answers `NaN` ⇒ **the move is INVALID ⇒ the `reset` arm** |
| **`resizableOf`** | `ResizableOf = (element: unknown, token: unknown) => unknown` | **REQUIRED** | the fork's resizability decision | falsy ⇒ `E3` short-circuits every terminal evaluation ⇒ **ZERO commits, ZERO previews, and the gesture still establishes and terminates normally** (`M-16`) |
| **`commit`** | `Commit = (gesture: unknown, value: number) => void` | **REQUIRED** | **THE ONE SINK** — the fork's single write route for a committed value | **the throw PROPAGATES from `E3`'s terminal**; the value is not written and no second writer exists. **THIS REPO'S EXAMPLE IMPLEMENTATION writes through `Runtime.applyCommand`'s `state-slice` shape** (`§R` `R-13`, `§2.1` item 8(v)) |
| **`pointerOf`** | `PointerResolver = (event: unknown) => PointerPosition \| null` | **OPTIONAL** | a fork that owns its event channel may resolve the pointer itself | absent ⇒ **the module's own TOTAL `resolveEventPointer` is used**; present but throwing/non-callable ⇒ the module's total gate answers `null` ⇒ **the move is INVALID (`F-1`/`F-6`)** — the throw never escapes the module's turn |
| **`moveTypeOf`** | `MoveTypeOf = (element: unknown) => unknown` | **OPTIONAL** | the fork's move-event type for the element — **this repo's wiring supplies `POINTER_TYPES.move`, the session's own exported constant** | a non-string or empty token ⇒ **NO move listener is attached**: the declared degradation in which the drag half has no reading source and the session's own `onMove` wrapper is the only move turn (`§2.3` row 2/8) — **and `§3.4 R-14` FAILS a wiring that supplies a token which is not the session's own, because THAT degradation looks exactly like a working drag until nothing moves** |

**THE DEGRADATION ROWS — one per class that can FAIL, because a declared degradation that no row can
falsify is a silent no-op with paperwork.** These are `§3.1`/`§3.2` rows and every one of them is
**assertable on `[T]`** with caller-supplied doubles:

| Class | The row | What FAILS |
| --- | --- | --- |
| **absent seam** | **`M-20`** (`§3.1`) | a required seam that is absent must reach its DECLARED degradation (the `reset` arm, the refusal, or ZERO commits) — **a module that treats an absent seam as a success FAILS**, and **a module that throws for an absent seam FAILS `I-7`** |
| **non-callable seam** | **`M-20`**'s second drive (`42`, `'x'`, an object, a `Proxy`) | same class as absent: **the declared degradation, never a throw and never a silent success** |
| **throwing seam** | **`F-8`** (already filed) + **`M-20`**'s third drive | the throw PROPAGATES for the THREE `void` PRESENTATION/SINK SEAMS (`applyPreview`, `applyCursor`, `commit`) and is **absorbed by the module's own total gate for the four VALUE-READING SEAMS** (`pointerOf`, `sizeFromPointer`, `axisOf`, `boundsOf`, `startSizeOf` and `resizableOf` — six names, whose answers reach `clampToBounds`'s `typeof` gate and the module's own `typeof` read, which IS the validation) — **a module that lets a value seam's throw escape its own listener turn FAILS (`F-1`/`F-6`), and a module that swallows a presentation seam's throw FAILS `F-8`**. **`axisOf`, `boundsOf`, `startSizeOf` and `resizableOf` are read through `E3`'s own seam rules as well, so their throws are `E3`'s declared ones where they arrive at a terminal (`docs/specs/gutter.md` `§2.4`).** |
| **wrong-type seam (the false-green class)** | **`M-18`** (`§3.1`) + **`§3.4 R-14`** | a move type that is NOT the session's own ⇒ **the drag half is dead while every count-based row still passes**; the row asserts **the registered type IS the session's exported move token**, and a row that asserts only *"one move listener was attached"* **FAILS this class's row** |
| **`E3`-declared refusals** (`'unusable-default'`, `'not-resizable'`) | **`M-13`/`M-16`** (already filed) | a refusal that still commits, or a refusal that throws, FAILS |

**THE CORRECTED EXPORT CENSUS — ⟶ RULED 2026-09-27, THIS PASS (`R-SEAMS`), STATED WITH ITS ARITHMETIC SO
THE TWO HALVES ARE NEVER CONFLATED.** **THE AS-FILED CENSUS WAS STATED AS `4` VALUE + `7` TYPE = `11`
NAMES. TWO THINGS ARE WRONG WITH IT AND BOTH ARE CORRECTED HERE:** **(a)** **THE SEAM RULING MAKES THE SEAM
TYPES EXPORTED CONTRACT**, so the type half grows by the **`9`** seam types below; **(b)** **THE AS-FILED
`7` WAS ITSELF ONE SHORT — `GutterAffordanceStats` is DECLARED, EXPORTED and named in the same code block,
and it appeared in no census cell**, so the pre-ruling type half was **`8`** and the pre-ruling census was
really **`4 + 8 = 12`**.

**THE RULED CENSUS: `3` VALUE EXPORTS + `17` TYPE DECLARATIONS = `20` EXPORTED NAMES (`3 + 17 = 20`).**
**⟶ THE `3` RATHER THAN `4` IS A SECOND CORRECTION THIS PASS OWES, found while pinning the seam types: the
as-filed module declared a runtime VALUE `export declare function sizeFromPointer(pointer, start)` AND, under
this ruling, exports the seam TYPE `SizeFromPointer` — **one seam, two exported names spelling it two ways,
which is the exact ambiguity `§3.4 R-1`'s BY-NAME set-equality cannot adjudicate** (a row must decide whether
`sizeFromPointer` and `SizeFromPointer` are one name or two). **THE VALUE EXPORT IS DELETED**, and it was
redundant on its own terms: this unit's drives reach the seam through `attach()`, and a fork implements it as
`options.sizeFromPointer`, so no caller ever needs the function binding. **THE RULED VALUES ARE
`createGutterAffordance` · `cursorDeclarationFor` · `domEventSource` (THREE)** and the module's whole runtime
value surface is those three. **The as-filed four-value set is kept visible above at `§2.1`; the ruled set is
the three.**
**(1) THE `3` VALUES:** `createGutterAffordance` · `cursorDeclarationFor` ·
`domEventSource`. **(2) THE `17` TYPES = the `8` previously-counted + the `9` seam
types (`8 + 9 = 17`).** **The `8`:** `CursorOf` · `EventSourceLike` · `GutterAffordance` ·
`GutterAffordanceOptions` · **`GutterAffordanceStats`** (`R-1`'s missing member, restored here) ·
`PointerPosition` · `PointerResolver` · `PreviewState`. **The `9` seam types (NEW, one per remaining seam —
the other two seams reuse `CursorOf` and `PointerResolver`):** `ApplyCursor` · `ApplyPreview` · `AxisOf` ·
`BoundsOf` · `Commit` · `MoveTypeOf` · `ResizableOf` · `SizeFromPointer` · `StartSizeOf`. **THE ELEVEN SEAMS
PAIR TO ELEVEN OF THESE TYPES EXACTLY ONCE (`11 = 2` reused + `9` new), so no seam is untyped and no type is
orphaned.** **EVERY SITE THAT CARRIED THE OLD CENSUS IS CORRECTED TO `3 + 17 = 20`: `§2.1`'s census paragraph
and its clause 1, `§3.4 R-1`, `§3.5 R-8x`, `§5.3` item 3, `§5.1` row 1, `§3.3 I-7`'s scope, and the status
block's item 2.** **A row asserting only a COUNT without NAMING the names FAILS `§3.4 R-1`'s own text
(`§4.4 S-1`) — which is why this paragraph names all twenty — and a TWENTY-FIRST exported name of ANY KIND
FAILS `§3.4 R-1`(b).** **The `2` module-local, NON-exported declarations (`resolveEventPointer`,
`sizeClampedFor`) are unchanged and remain non-exported.**

**⟶ A NUMBERING NOTE, RECORDED SO THE ORDER IS NOT READ AS AN ERROR: `§R.2` and `§R.3` are APPENDED after the `§R` table and BEFORE `§R.1`.** **They must follow the `§R` table they extend, and moving `§R.1` (the three answered sentences, added by the EARLIER repair pass) would RENUMBER it, which this spec forbids for citation stability. `§R.1` therefore keeps its number and its position; `§R.2`/`§R.3` are the step-3 pass's additions and are cited by their own names. The READING ORDER of the `§R` record is: the `§R` table → `§R.2` (the seam ruling) → `§R.3` (the two tables + the census) → `§R.1` (the three answered sentences).**

**WHAT THIS REPO'S DEMO SUPPLIES, AND WHAT IT IS CALLED.** **This repo ships EXACTLY ONE EXAMPLE
IMPLEMENTATION of the eleven seams, and its home is the demo-side file `src/shared/demo-envelope.ts`**
(`§5.1` allow-list row `2`, extended by ONE cell for it). **IT IS AN IMPLEMENTATION, NEVER THE CONTRACT:** a
fork that vendors the module does **not** inherit the demo's axis vocabulary, its cursor strings, its size
arithmetic, its bounds, its resizability policy or its commit route — it inherits **the types and the
degradation rules in the two tables above**, and supplies its own implementation of them. **`renderer.ts`
imports the MODULE's seam types for its wiring** (never a demo-owned contract shape); the demo file is
imported for its DATA and for this one example implementation, and **a clause of this spec that reads the
demo's implementation as normative is a finding against this file.**

**`E-2` AND `E-3` REMAIN THE ARCHITECT'S — REPORTED, NOT DECIDED (see `§7a.1` items 4/5).** **This pass
does NOT rule the commit write's element-identity question (a REBIND would be a SIXTH wiring role, `§R`
`R-13`) and does NOT move a declared register term (`E-3`'s `140 → 127` choice).**

### R.1 The three sentences the repaired contract must answer — **answered once, here**

**WHO CONSTRUCTS THE AFFORDANCE IN THE RUNNING APP, FROM WHICH ALLOWED FILE, AND BY WHAT COMMAND:**

1. **WHO:** **the renderer's own boot wiring constructs it** — `startGutterAffordance(runtime)` constructs the
   **gesture session** (`createGestureSession({ source, commit })`) and, through the module's factory, the
   **`E3` controller**; resolves the **affordance and target elements from the producing graph through
   `Runtime.elementForNodeId(...)`**; calls **`createGutterAffordance({ session, source, element, target,
   …seams })`** and **`.attach()`**; and owns the **preview write** (`applyPreview`) and the **cursor write**
   (`applyCursor`) as its two presentation seams. **The module constructs no element, resolves no
   selector and authors no UI content** (`§2.2` P-1; `AGENTS.md`).
2. **FROM WHICH ALLOWED FILE:** **`src/renderer/renderer.ts`** — the boot path's `main()` already builds
   `new Runtime({ mount, envelope: demoEnvelope(), maxJournalLength })` and calls `runtime.bootstrap()`
   before serving the preload bridge, so **the wiring lands in that file and nowhere else**; the ONE
   bounded helper it needs — **the producing graph's element resolution — is `Runtime.elementForNodeId(...)`
   in `src/renderer/runtime.ts`** (the graph's own id-index, then `data-node-id` within the mount:
   **no selector, no `closest`, no `querySelector*`, no hand-written DOM**). **Both files are allow-list
   rows `10`/`11` of `§5.1`; both are wired, never content.**
3. **BY WHAT COMMAND:** **`npm start`** (`npm run build && electron .`) boots the app with the authored
   demo envelope, and this unit's state is reached and observed by **`npm run mcp -- --target http --port
   3787 targets`** (the authored card resolves by its authored `css.id`/`props.id`), **`… html`** (the
   affordance's `data-node-id` and its authored base `cursor` in `get_rendered_html`), and
   **`… dispatch gutter-vertical pointerdown`** (the authored handler is dispatched **through the
   producing graph**, proving the affordance is provident-reachable rather than hand-written DOM) — with
   **`npm run ui`** as the mandatory real-DOM leg and **`npm run divergence`** as its precondition
   (`§5.2` legs 5/6/7). **The pointer-DRIVEN half is exercised by the module's own drives over synthetic
   event objects, by the wiring's live path under a real pointer, and by the leg's own probe; the MCP
   `dispatch` surface carries an event NAME and no coordinates** (`§7` item 6, `§5.2` leg 6).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.** Where
a ruling is a **boundary** rather than a charter, the row below says so and the clause it forbids is named
at another unit.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **THE ARCHITECT'S INTENDED BEHAVIOUR, the requirement statement of this unit, verbatim in substance:** *"On mouseover: Change cursor to the appropriate shape for vertical/horizontal adjustment. On click: Start gesture to resize the zone/pane. On drag: Dynamically show the resized state based on the current cursor position. On release: If dragged state is valid, commit resized state, otherwise, reset. On right-click: drop and reset."* | `§1` item 1, `§2.3` (the state machine), `§2.4` (the value derivation), `§2.5` (the preview rule), `§2.6` items 3/4, `§3.1 M-1`–`M-14`, `§3.2 F-1`–`F-13` |
| **2** | **THE `E3`/`E10` SCOPE SPLIT (ARCHITECT RULING (A), 2026-09-27): `U-GUTTER` (`E3`) REMAINS THE POLICY-FREE CLAMP + COMMIT-DISCIPLINE LAYER; the UI unit (`E10`) OWNS the cursor, the coordinates, the live preview channel, the capture decision and the drop-revert.** `E3` *"reads NO coordinate and NO event field"* and **the frozen session is NOT re-opened**. (`docs/decisions.md` `GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAIM-COMMIT-LAYER` — cited by NAME; `docs/specs/gutter.md` `§0A` note 13, `§1` item 2, `§8`'s scope-ruling row.) | `§1` items 2/3/4, `§2.4` item 1, `§2.5` item 1, `§2.6` items 5/6, `§3.4 R-3`/`R-4`, `§7` item 3, `§8` |
| **3** | **THE PARKED `E3` CHECKS ARE THIS UNIT'S FIRST OBLIGATIONS (architect ruling, 2026-09-27: *"Park checks until the UI exists, then start UI spec"*).** `docs/pending.md` §I-septies names them: **the throwing-hook discard**, the **closed session read set**, and the **disposed-session short-circuit** — *"the UI spec must carry the rows that expose them … so the first real consumer is what proves or disproves the fix"* — plus the **two-writer divergence check on the real composition**. | **`§3.1 M-1`/`M-2`/`M-3`/`M-4`/`M-5`** (the four obligations + the divergence control), `§3.3 I-1`/`I-2`, `§3.4 R-5`, `§5.3` item 4 |
| **4** | **THE PROJECT-WIDE UI CONSTRAINT (`AGENTS.md`, "Project-wide constraint (UI rendering)"; `docs/decisions.md` `UI-RENDERED-WITH-PROVIDENT`, cited by NAME):** *every non-shell UI element MUST be rendered with the provident framework — authored as provident-ssr data (envelope nodes / handler bodies / hooks / component bindings) and driven through the producing graph, NOT as hand-written HTML/DOM in the renderer; **a UI element added outside the framework is a review finding**; the Electron shell's own chrome is the only exception.* **`UI-STATIC-MEANS-APP-STATE-DERIVED` (A-d7) leaves this row's text unchanged.** | `§1` item 2, `§2.1` items 6/7 (the authored card), `§2.2` (the build/caller split), `§3.4 R-1`/`R-2`, `§5.1` (the authoring site and the DENIED shell set), `§7` item 4 |
| **5** | **THE MANDATORY-LIVE-BATTERY HARDENING (`docs/pending.md` §I-septies's admission ruling; `docs/decisions.md` `REAL-DOM-UI-GATE-LEG` and `REALDOM-UI-LEG-LANDED`, cited by NAME):** *a UI-rendering unit's live battery (`npm run ui`, and the project's live driver where the interaction is exercisable) is **MANDATORY, never parked-by-default***. `npm run ui` is the landed leg (`scripts/electron-ui.mjs`, contract `docs/specs/ci-ui-leg.md`); its green is a **MEASUREMENT**, never an identity leg. | `§5.2` legs 5/6/7 (the mandatory battery, with its exact commands), `§5.3` item 6, `§3.5 R-11`, `§7` item 5 |
| **6** | **THE FROZEN DELEGATE SURFACE:** `docs/specs/gsession.md` `§2.5`'s **eleven-item numbered delegate list is FROZEN AND COMPLETE** (`docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`, cited by NAME), **including the capture capability's NAME `capturePointer?` on `EventSource`** and **the corrected outcome-discriminator site `§2.5` item 10** (`gesture.outcome`). **This unit writes against it and re-opens no item of it.** | `§2.1` item 9 (the injected source), `§2.6` item 2, `§3.4 R-5` (the closed read set), `§3.4 R-6`, `§8` |
| **7** | **`E3`'s TWELVE GATE-1 RULINGS AND ITS `C1`–`C5` ARE THE COMPOSED CONTRACT, NOT THIS UNIT'S SUBJECT MATTER.** This unit **composes** `docs/specs/gutter.md`'s controller: it does **not** re-litigate the twelve rulings, does **not** weaken a `C1`–`C5` condition, and **a clause of this file that contradicts one is a finding against THIS file** (the gate-1 record's own governing rule, `docs/specs/gutter-review.md` `§1`'s preamble). | `§1` item 3, `§2.3`, `§2.6` item 1, `§3.2 F-13`, `§8` (the `gutter.md`/`gutter-review.md` rows) |
| **8** | **`A-d3` / `INTERACTION-NODE-LOCAL` (`docs/decisions.md`, cited by NAME): all interaction mechanisms work through LOCAL handlers on the element that receives the interaction; document-delegated pointer tracking is REJECTED; capture is permitted only AFTER establishment and only per-control opt-in.** | `§2.1` item 9, `§2.2` P-2/P-3, `§2.6` item 2, `§3.4 R-6`/`R-7`, `§3.5 R-12` |
| **9** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` (`docs/decisions.md`, ACTIVE, cited by NAME): gate 11 applies to every CODE-BEARING unit — a typed register of `≤8` rows is a BREAKDOWN SIGNAL, not a ceiling, but *"a row the unit cannot drive is worse than no row"*; and `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` requires the total to be printed WITH its terms.** | `§5.5`, `§5.5.1` (the seven rows), `§5.5.2` (the honesty block), `§5.5.3` (the arithmetic), `§5.3` items 10/11 |
| **10** | **THE USER-FLOW-AUDIT PREDICATE'S SOURCE DOCUMENT DOES NOT EXIST IN THIS TREE.** `docs/specs/user-flow-audit.md` is **absent** (globbed `docs/**/*user-flow*` this pass → **no files**; the string occurs nowhere under `docs/`), while the gate instructions cite its `§7.1` predicate and its `§5.U` / `§6.1` / `§6.2` trio. **This is now the SIXTH independent confirmation** (`docs/pending.md` §H and §I record five earlier ones). | **`§5.U`** — the matrix is authored **in the gate instructions' form** and the missing filed contract is recorded as a **gap with an owner and a revisit condition**, never silently omitted; `§7` item 7, `§8` |

**Where a citation in this unit's sources is corrected, this filing obeys the correction and does not
re-open the substance:**

- **`E3`'s closed session read set is `install` · `reset` · `dispose` · `stats` · `gesture` · `disposed`
  — and NOTHING ELSE** (`docs/pending.md` §I-sexies's `E3`-HOST-2 remedy (c), which names the invented
  `registerCompositionWriter`/`registerCommit` probe as a defect to be REMOVED). **This filing cites that
  set as the composition rule both for `E3`'s controller and for this unit's own consumption of the
  session** (`§3.4 R-5`).
- **The outcome discriminator's site is `docs/specs/gsession.md` `§2.5` item 10** (`commit(gesture, value)`
  with **`gesture.outcome`** the `'end'`-vs-`'reset'` discriminator), beside `§2.3` item 4 and `§0A`
  note 5 — **never `§0A` note 6.** This filing cites it that way wherever it needs it (`§2.3` item 6,
  `§2.6` item 4, `§3.1 M-12`).
- **The `§2.5` *"Nothing else exists"* discipline is the PARAGRAPH after item 11**, not "item 7"
  (`gsession.md` `§2.5` carries eleven numbered items; item 7 is `dispose()`). **This filing claims no
  item number for it** (`§2.1` item 9).

### 0A. The dated ruling notes — the clauses the sources leave to this filing, RULED here (2026-09-27)

**What this subsection is, and what it is not.** The architect's intent statement is a **requirement in
five clauses**; it is **silent** about the clauses a TestWriter must have before it can author a
falsifiable row. **This filing DECIDES each of those clauses here**, each with its reason and its landing
site. **No note below weakens a ruling, a condition or any item of `E3`'s must-not list**; the places
where this filing could **NOT** derive a clause are **reported, not guessed**, at `§7a`/`§7a.1`.

**Note 1 — the module path is `src/shared/gutter-affordance.ts`, and the test file is
`tests/gutter-ui.test.ts`.** **No source names either path.** The sibling convention decides it
(`src/shared/gesture-session.ts`, `gutter.ts`, `zones.ts`, `census.ts`, `layout-projection.ts`,
`owned-list-host.ts`, `slot-host.ts`) and the unit's own name decides the stem (`U-GUTTER-UI` → the
affordance). **Nothing else in this file presumes the path.** The same note names the test file because
**`§5.1`'s diff scope must be a real, checkable allow-list.**

**Note 2 — THE AFFORDANCE IS AUTHORED DATA; THE MODULE IS THE WIRING; NEITHER IS THE OTHER.** The
**rendered affordance** — its element, its id, its classes, its authored `css.style`, its authored
`props`, its authored handler bodies and its authored placeholder **content** — is **provident-ssr data in
`src/shared/demo-envelope.ts`** and is **driven through the producing graph** (`AGENTS.md`'s project-wide
constraint, ruling 4). **The module authors NO element, NO text, NO class taxonomy, NO attribute name and
NO handler body.** The module **wires** the authored element to the gesture session and the `E3`
controller, **resolves the pointer**, **applies the cursor and the preview through caller-supplied
seams**, and **records the committed value in the graph's own authored content through the caller's one
sink**. **A module that created an element, injected markup, or wrote a class list would be the review
finding `AGENTS.md` names** (`§2.2` P-1, `§3.4 R-1`).

**Note 3 — THE COORDINATE IS READ IN EXACTLY ONE PLACE: `resolveEventPointer(event)`, inside this
module's own bytes, called ONLY from the module's own event listeners.** **This is the ONLY coordinate read
in the panes/zones family** — `E3` reads none (`docs/specs/gutter.md` `§1` item 2, its `P-1`/`P-8`,
`I-11`), the session reads none (`docs/specs/gsession.md` `§2.3` item 1(d): *"the event object is not read
and not passed anywhere"*), and **the landed `EventSource` shape has no event parameter at all** — so
**this unit is where the coordinate legitimately lives** (ruling 2). **The read is `clientX`/`clientY`
only, through a `typeof` gate, and the function is TOTAL** (`§2.4` item 1). **A second coordinate read
anywhere in the family, or a coordinate read inside `E3`, is `§4.4 S-3` and does not land.**

**Note 4 — THE SIZE IS DERIVED FROM THE POINTER IN THIS UNIT'S OWN CODE, AND THE ARITHMETIC IS
CALLER-SUPPLIED.** **`sizeFromPointer(pointer, start)` is a REQUIRED caller seam** (it is the mapping from
a coordinate pair to a size for the caller's own axis), and **the module performs exactly two arithmetic
operations of its own**: the **subtraction `pointer.x - start.x` (or `pointer.y - start.y`) is NOT the
module's** — it belongs to the caller's `sizeFromPointer` — so the module's own arithmetic is
**(i) the `typeof` gate on the pointer and (ii) the call to `E3`'s exported pure `clampToBounds`**
(`docs/specs/gutter.md` `§2.1` item 1). **RULED, and the reason is the scope split:** a module that
computed a delta would be re-opening `E3`'s `ARITHMETIC-OVER-INJECTED-VALUES` question *in the UI unit's
bytes*, where the ruling's answer (`A-d4` **overrides** the objection; it does not answer it —
`docs/decisions.md` `GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS`) does not reach. **The module
therefore ships NO drag arithmetic of its own, and no row of this unit may claim a magnitude** — what it
ships is the **coordinate source, the preview channel, the cursor and the drop-revert**, which is exactly
what ruling 2 assigns it.

**Note 5 — THE PER-GESTURE RECORD IS THE MODULE'S OWN, IS ESTABLISHED IN `onStart`, AND IS DISCARDED IN A
`finally` AT THE TERMINAL.** It holds **the pre-drag size, the axis token and the gesture handle**. **The
`finally` is not decoration: it is `§3.1 M-3`'s obligation**, and `E3`'s parked `E3`-HOST-1 defect is
precisely *"the per-gesture record survives a THROWING consumer hook"* (`docs/pending.md` §I-sexies).
**RULED:** this unit's own record is cleared in a `finally` block around every consumer-hook invocation,
so **a consumer hook that throws cannot leave a retained record**, and **a later `reset(element)` on the
dropped handle refuses with ZERO session calls** (`§3.1 M-3`, `§3.2 F-4`).

**Note 6 — THE INVALID-RELEASE DECISION IS THE MODULE'S, AND IT IS TAKEN FROM THE DRAG'S OWN LAST
OBSERVATED STATE — ⟶ CONFIRMED AND SHARPENED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`) — AND IT IS
A SEAM FAILURE, NOT AN ORDINARY OUT-OF-BOUNDS VALUE, WHICH `E3` CLAMPS AND TREATS AS VALID.** The decision rule is stated at `§2.3` item 5 and is **falsifiable on the node suite**:
a drag whose **pointer resolved**, whose **`sizeFromPointer` answered a finite `number`**, and whose
**`clampToBounds` answer is a finite `number`** is **VALID**; anything else is **INVALID** — **plus the one
caller-supplied veto `isDragValid?(state)` whose EXACT `false` marks the drag invalid** (its `true`,
`undefined`, absence, non-callability or a throw is **not** a veto). **THE TIMING IS A WORKING DEFAULT, NOT
A RULED CLAUSE, and `§7a.1` item 2 states it honestly:** because `E3`'s `reset` is legal **only for an
ACTIVE gesture** (`docs/specs/gutter.md` `§2.5` item 5 clause 3) and the session's own `pointerup`
listener ends every gesture at its own terminal (`docs/specs/gsession.md` `§2.3` item 4), the invalid arm
is taken **from the module's own `pointermove` turn, while the gesture is still active**, by calling
`controller.reset(element)` — **which is the ONLY session-touching call `E3` permits on that path**. **A
later pass that wants the invalid arm decided AT the release must open a gate** (`§4.4 S-4`).
**⟶ RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`), so this is no longer only a working default:
the VALID path is the session's own `pointerup` ⇒ `end` ⇒ exactly one commit of the CLAMPED DRAGGED VALUE
(read back from the handle's value channel, `§R` `R6`); the INVALID path is the `reset` terminal taken the
moment invalidity is ESTABLISHED during the drag — a SEAM FAILURE, not an ordinary out-of-bounds value,
which `E3` simply clamps — ⇒ exactly one commit of the CLAMPED PRE-DRAG SIZE the consumer holds, with the
handle cleared so the later `pointerup` commits nothing.** **The architect's release clause — *"On release:
if dragged state is valid, commit resized state, otherwise, reset"* — is thereby OBSERVABLY satisfied: a
valid release commits, and an invalid drag ends in a reset of the previous size.** **THE DIVERGENCE IS
STATED: the decision is not taken AT the release instant, because measured against the frozen session
there is no active handle at the release turn.** **THE ALTERNATIVE — routing the timing to `U-GSESSION` (a
new clause, and a new gate on a frozen unit) — is NAMED AND REJECTED-FOR-NOW**; `§7a.1` item 2 keeps the
question recorded rather than deleted, with this ruling as its answer.**

**Note 7 — THE PREVIEW CHANNEL IS A TRANSIENT PRESENTATION WRITE, NEVER THE SINK.** *"Dynamically show the
resized state based on the current cursor position"* is discharged by the caller-supplied
**`applyPreview(state)`** seam, invoked by the module **during the drag only**, **at most once per
observed pointer move**, and **NEVER at a terminal of a committed drag**. **`E3`'s own rule is carried
unweakened** (`docs/specs/gutter.md` `§2.3` item 3's preview rule and `§2.6` item `4b`): **the sink is
written at most once per gesture and only at an `end`/`reset` terminal, so a preview write that reaches
the sink FAILS this unit's write-count rows** (`§3.1 M-8`/`M-9`, `§5.5.1 P-GU-SM-1`). **The preview's
concrete form in this repo is a caller's write** — the authored envelope's `css.style` is serialized at
translate (`translate.js`'s `serializeStyle`) and applied by the `DomAdapter` as an inline style, so a
transient `style` write on the **live provident-rendered element** is available to the caller **without
authoring an element and without re-rendering the graph mid-gesture**. **A preview implemented as a graph
dispatch is a NAMED HAZARD — the re-render replaces the very element under the pointer — and it is
therefore NOT the working default** (`§7a.1` item 3).

**Note 8 — THE CURSOR MAPPING IS CALLER-SUPPLIED, AND THE MODULE'S OWN ROLE IS THE *TIMING AND THE TOTAL
RESOLUTION*.** `cursorOf(token)` is a **required caller seam**; the module **resolves its answer totally**
(`cursorDeclarationFor`, `§2.1` item 2: an **own** `cursor` string property, trimmed, non-empty; anything
else ⇒ **no write**), **evaluates it on hover only**, **writes the declaration through the caller's
`applyCursor(element, declaration)` seam**, and **removes it on hover exit**. **RULED, and the reason is
`E3`'s `P-5`:** a module carrying `'col-resize'`/`'row-resize'` literals would put **an axis vocabulary in
this unit's bytes**, which is exactly the prohibition `E3`'s own seam set exists to keep policy-free — and
**the UI unit adding that vocabulary is not a licence to add it in a module the fork may vendor.** **The
demo's own mapping is caller code and is authored in `src/shared/demo-envelope.ts`** (`§2.1` item 7).

**Note 9 — THE COMPOSITION SEAM: THIS UNIT SUPPLIES THE FOUR HOOKS AND THE SEVEN SEAMS; `E3` SUPPLIES THE
WRITER; THE SESSION SUPPLIES THE ONLY LISTENER.** **The three roles, stated once so no reader has to
reconstruct them:** **the session** owns the gesture lifecycle and the listeners
(`docs/specs/gsession.md` `§2.3`); **the `E3` controller** owns the clamp, the single sink write and the
reset entry point (`docs/specs/gutter.md` `§1` item 1); **this module** owns **the event source, the
pointer read, the pre-drag size, the cursor, the preview writes, the invalid-release decision and the
capture opt-in**, and **it writes to the sink NOWHERE** — it passes the caller's `commit` seam into
`E3`'s factory and lets `E3` be the single writer. **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): the as-filed role list's *"the capture opt-in"* is WITHDRAWN with the capture claim (`§R` `R5`); the module's own list ends at the invalid-release decision, and the capture NEED is `E3`'s owed item (`§2.6` item 4).** **A module of this unit that called `commit` itself, or
that registered a second writer, is `§4.4 S-5` and does not land** (`§3.1 M-5`, `§5.5.1 P-GU-SM-1`).

**Note 10 — ⟶ WITHDRAWN 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): THE CAPTURE OPT-IN IS NOT
INSTALLED HERE, AND `E3` CANNOT BE ASKED TO CARRY IT.** **THE AS-FILED NOTE RULED:** *"the module passes
`capture: true` in the options object it hands `controller.attach(element, hooks)` iff and only iff the
caller's `capturePointer` option is TRUE, the DOM source it supplies implements `capturePointer(element)`
through the element's own `setPointerCapture` when that member exists … A capture call from the module's
own bytes — outside the source it supplies — is `§4.4 S-6` and does not land."* **THE RULING IS
SUPERSEDED ON ITS FIRST HALF: `E3`'s `attach(element, hooks?)` accepts ONLY the four hooks and its sealed
clause forbids the opt-in, so a `capture: true` field in a hooks object is INERT — it reaches nothing.
`E3` is FROZEN with its checks parked, so this unit cannot add the acceptance.** **WHAT STANDS: the module
makes no capture call of its own, passes no `capture` field anywhere, and `releasePointerCapture` appears
nowhere (`§3.3 I-13`).** **THE NEED IS RECORDED AS A NAMED `E3`-SIDE OWED ITEM, with its revisit
condition and its UX consequence, at `§2.6` item 4 and `§8`; the vacuous rows `F-11` and `I-4` are
DELETED with tombstones.** **The session's PARKED release-after-failed-establishment question KEEPS ITS
EXISTING TRIGGER** (`docs/pending.md` §I): this unit **neither releases it nor
re-opens it**, and a pass that wants a release opens a NEW clause with its own gate.

**Note 11 — THE RENDERED FACTS BELONG TO THE LIVE LEG, AND THIS UNIT'S NODE SUITE MAY NOT CLAIM ONE.**
**RULED, in one sentence: every rendered-geometry, applied-style, cursor-shaped, layout and real-pointer
claim of this unit is a `[U]` claim, discharged by `npm run ui` and the project's live driver
(`§5.2` legs 5/6/7), and a node-suite green may not be reported as one.** The node suite proves **the
value derivation, the state machine, the call and write counts, the closed read set and the totality of
this module's own functions over caller-supplied objects and the repo's shim** — and **nothing about a
window** (layer anchors, `§2`'s Layer declaration). **`§4.4 S-7` is the stop condition.**

**Note 12 — THIS UNIT DOES NOT RE-OPEN `E3`'s CONTRACT, AND IT DOES NOT FIX `E3`'s PARKED DEFECTS BY
EDITING `E3`.** **`docs/specs/gutter.md` and its module and test file are DENIED paths** (`§5.1`).
**What this unit does instead is the thing the admission ruling asks for:** it **drives the composition
from a real consumer**, so **the parked defects are EXPOSED BY ROWS** (`§3.1 M-3`/`M-4`/`M-5`) rather than
by a repair pass. **A row that passes on the current (unfixed) `E3` module is evidence of a defect, not of
a working composition** — and it is **reported to the supervisor as a HOST finding against `E3`**, whose
fix belongs to an Implementer pass on `E3`'s own denied path, **never to this unit** (`§5.3` item 7;
`§3.2 F-5`).

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here the affordance module, the authored demo envelope, and the `E3`/session modules it consumes | not engine-internal behaviour |
| **[U]** | real-DOM leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance in the shim sense |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **the EXTENDED harness (`U-DIVERGENCE-EXT`, `C2`) does not exist**; **this spec claims no `[D]` row** (`§5.2`) |

**Six honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this
   repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No window
   is booted, no IPC round-trip runs and no MCP transport is exercised.**
2. **This unit touches the DOM only through caller-supplied seams and the injected source.** Its `[T]`
   rows drive **a source double**, **element doubles**, **caller-supplied callbacks** and the **shim** —
   **a `[T]` green here proves the state machine, the pointer read over supplied event objects, the cursor
   resolution, the preview and sink counts, and the closed session read set.**
3. **The module reads NO ambient global** — no `document`, `window`, `globalThis`-rooted lookup,
   `matchMedia`, `getComputedStyle`, `activeElement`, `Date`, `Math.random` or `process.env`. **The
   `domEventSource()` VALUE the module exports binds to the ELEMENT IT IS GIVEN and nothing else**, and it
   is the **only** member of this module that touches a DOM API (`addEventListener`/`removeEventListener`/
   `setPointerCapture`) — see `§2.2` P-2's exact carve-out and `§3.4 R-6`'s row.
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its
   rows are authored in **this unit's own test file** and executed by the **same node suite** (`npm test`),
   so **a register row is `[T]` evidence exactly as a `§3` row is.**
5. **A live `[U]` green is ONE measurement leg's evidence about a REAL window** — it can carry a geometry
   or an applied-style claim **for the elements it actually observed**, and **never** an assembled-app
   acceptance, an IPC proof, or a proof that any particular row of another unit passes (`docs/specs/ci-ui-leg.md` `§3.3`'s overclaim row).
6. **The `[U]` leg's own limits bind this unit:** no `show:false`, no CI config, a required `DISPLAY`
   (`docs/specs/ci-ui-leg.md` `§6`), one boot per measurement attempt, and **a retried green is still a
   green but is LABELLED `attempt=<k>`** (`§5.3` item 6).

---

## 1. Scope

**One deliverable: one provident-authored gutter affordance in this repo's own demo envelope, plus the
`src/shared` module that wires it to the `E3` controller and, through it, the landed session — such that
mouseover shows the adjust cursor, a press starts the resize gesture, the drag shows the resized state
live from the cursor, a valid release commits the clamped dragged value, an invalid release resets to the
pre-drag size, and a right-click drops the drag and reverts.**

1. **What the unit is, in one sentence.** The **UI half of the panes/zones family**: it **owns the
   coordinate source, the cursor, the live preview channel, the drop-revert and every rendered-geometry
   claim of the family** — and it **composes** `E3`'s controller, **re-expressing none of its discipline**
   and **never becoming a second writer or a second gesture authority**.
   **⟶ WITHDRAWN 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): the as-filed sentence also named *"the
   capture decision"* among the things this unit owns, and THAT CLAIM IS WITHDRAWN — `E3`'s
   `attach(element, hooks?)` cannot carry `capture` (its sealed clause forbids the opt-in) and `E3` is
   FROZEN with its checks parked, so no capture opt-in of this unit's can reach the session. The need is
   recorded as a named `E3`-SIDE owed item with its revisit condition (`§2.6` item 4, `§8`), and the
   honest UX consequence is stated there: a drag that leaves the affordance's box tracks nothing until
   that item is discharged.** **⟶ ALSO CORRECTED 2026-09-27 (`§R` `R1`): the as-filed charter's
   *"observability"* half is no longer blocked — the affordance IS constructed by the renderer wiring
   (`§R.1`, `§5.1` rows `10`/`11`).**
2. **What the unit is — PROVENT-AUTHORED, and this is a hard constraint rather than a preference.** The
   gutter affordance is a **PROVIDENT-RENDERED UI element of this repo's own demo envelope**: authored as
   **provident-ssr data — envelope nodes, `css`, `props`, handler bodies, the card that contains it and the
   placeholder content it writes** — and **driven through the producing graph**, so that it is **reachable
   by `provident.dispatch` / `provident.get_rendered_html` / `provident.get_markdown` / `list_targets`**
   (`AGENTS.md`'s project-wide constraint; `docs/decisions.md` `UI-RENDERED-WITH-PROVIDENT`). **The
   module's own bytes author no element, no text, no class and no handler body**
   (`§2.1` item 7 is the authoring site; `§2.2` P-1; `§3.4 R-1`/`R-2`).
3. **What the unit is — a COMPOSER, and the boundaries are three-way.** **`E3` owns the clamp and the
   commit discipline** (the pure `clampToBounds`, the single sink writer, the one-commit-per-gesture rule,
   the reset entry point, the seven injected seams); **`U-GSESSION` owns the lifecycle** (the one listener
   per control, the tracking window, the three terminals, the seven-member code domain); **THIS UNIT owns
   the coordinate source, the cursor, the preview, the capture decision, the drop-revert, and the rendered
   geometry the `E3`/`E4` specs refuse** (ruling 2). **A clause of this unit that re-expresses a `E3` or
   session rule instead of composing it is `§4.4 S-9` and does not land** (ruling 7).
4. **What the unit is NOT — it does not re-open `E3`'s contract, and it does not fix `E3` in place.**
   `docs/specs/gutter.md`, `src/shared/gutter.ts` and `tests/gutter.test.ts` are **DENIED paths**
   (`§5.1`). **The parked `E3` defects are EXPOSED by this unit's rows and reported to the supervisor**;
   their fix is an Implementer pass on `E3`'s own path (`§0A` note 12).
5. **What the unit is NOT — no shell chrome, no second listener authority, no new surface.** No
   document-delegated listener, no global element lookup (`A-d3`); **no new MCP tool, resource, group,
   `RpcMethod` member, `MUTATING_METHODS` entry, IPC method or preload change**; no store, no
   persistence, no journal, no cache, **no module-level mutable state**; no CSS stylesheet, no token
   vocabulary, no `data-theme`-style literal; **no change to `package.json`, `scripts/**`, `tsconfig.json`
   or `vitest.config.*`** (`§5.1`'s DENIED set).
   **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the as-filed form of this item read
   *"no shell chrome … no new surface"* and listed `src/main/**` as forbidden — which still holds — but
   the sibling mechanism units' blanket denial of `src/renderer/**` was INHERITED here and is WRONG for a
   UI unit (the architect's ruling: *"the UI change is allowed to touch the renderer — the UI needs to be
   rendered"*). The renderer WIRING is now allowed and bounded at `§5.1` rows `10`/`11`; the shell chrome,
   the preload bridge and the whole MCP surface remain DENIED on that path; and a renderer edit that
   HAND-WRITES DOM is a FINDING, not a permitted change.**
6. **What the unit may land.** The **NEW affordance module** + the **authored demo-envelope card** + the
   **bounded renderer wiring** + the **red/green rows** + the **register rows** + **this spec** + its
   `*-greens.md` + the unit's own tracker/record artifacts. **No `E3`, session, main-process or MCP file
   changes** (`§5.1`).
   **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the as-filed cell read *"No `E3`,
   session, RENDERER, main-process or MCP file changes"* — the word `renderer` is DELETED by the
   architect's ruling, and the *bounded renderer wiring* is added to the landing list. `E3`'s module and
   test file, the frozen session and its test file, `src/main/**`, the preload/MCP surface and the shell
   chrome stay DENIED (`§5.1`).**
7. **THE FIVE NAMED BOUNDARIES OF THIS UNIT, stated so no clause can drift over one:**

   | # | Boundary | The clause that holds it | The row that FAILS on a crossing |
   | --- | --- | --- | --- |
   | **1** | **`E3`'s clamp/commit discipline is COMPOSED, never re-expressed** | `§2.6` item 1 | **`§3.4 R-3`**, `§5.5.1 P-GU-SM-1` |
   | **2** | **`U-GSESSION`'s lifecycle is COMPOSED, never re-expressed** | `§2.6` item 2 | **`§3.4 R-4`** |
   | **3** | **The coordinate exists ONLY in this unit's `resolveEventPointer`** | `§2.4` item 1 | **`§3.4 R-3`** (no coordinate in `E3`), **`§3.5 R-8`** (the static import/call census) |
   | **4** | **The preview is NEVER the sink** | `§2.5` item 3 | **`§3.1 M-8`/`M-9`**, `§5.5.1 P-GU-SM-1` |
   | **5** | **The affordance is provident-authored; the module authors no UI content** | `§2.2` P-1 | **`§3.4 R-1`** |

8. **THE VALUE IS A SHIPPED FEATURE, AND THE HONEST COST/BENEFIT IS THE OPPOSITE OF `E3`'s.** `E3`'s
   green was **reusable-contract value with no in-tree consumer** and a **named cost**. **This unit's
   benefit is the one the admission ruling names: it is where the family's behaviour becomes OBSERVABLE
   and where `E3`'s parked defects get their first real exercise** — the composition is driven by a real
   consumer, through a real provident-authored element, and the live battery exercises it in a real
   window. **The honest cost:** a `src/**` change to the **demo envelope** (so the demo's rendered census
   and the `get_rendered_html` / `list_targets` / `get_markdown` outputs **WILL DRIFT** — that drift is
   **MEASURED, not assumed**, `§3.5 R-9`), a **module that the demo's own bundle gains** (so the five-bundle
   byte-identity claim that `E3` made **no longer holds for this unit**, `§5.2` leg 3), a **`[U]` leg that
   must actually run** with a display and a running app, and **`E3` HOST findings that will surface as
   failures of this unit's rows** (`§3.2 F-5`).

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/gutter-affordance.ts`** (`§0A` note 1). **Its imports are EXACTLY THREE
statements** (`§3.4 R-8` pins the set): a **value** import of `clampToBounds` from `./gutter.js`, a
**type-only** import from `./gesture-session.js` (the `GestureHandle` type — the value channel of `§R`
`R6`), and a **type-only** import from `./gutter.js` (the controller's own types). **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`, condition `C-3`): A SECOND VALUE IMPORT IS REQUIRED — `POINTER_TYPES` from `./gesture-session.js`, the session's EXPORTED event-type constant, because the wiring's move type must BE the session's own token and the module may not replicate it as a literal. The as-filed set above is kept visible; the ruled set is TWO VALUES + TWO TYPE-ONLY bindings across the same THREE statements.** **It imports no `provident-ssr`, no `electron`, no `node:*`, no `src/main/**`,
no `src/renderer/**`, no shim, and no sibling other than those two.**

**⟶ RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(a)) — THE IMPORT CENSUS, STATED SO THE
CONTRADICTION IS GONE.** **The as-filed contract demanded that a session be constructed yet forbade a
VALUE import of the session module, and never said which member received the session** — the gate-1
review's first must-fix. **THE ANSWER, IN THREE SENTENCES:** **(i)** **`clampToBounds` is the module's
ONLY value import** (plus **zero** other values); **(ii)** **the module reaches the session by the WIRING,
not by an import: the renderer wiring (`§R.1`, `§5.1` row `10`) calls `createGestureSession({source,
commit})` and passes the resulting INSTANCE into `GutterAffordanceOptions.session`, which the module
forwards to `createResizeController({session, …})` — so the session value arrives as an ARGUMENT and needs
no import of any kind**; **(iii)** therefore the as-filed census was **`4 + 7 = 11` NAMES with THREE import
STATEMENTS (`1` value + `2` type-only)** — **⟶ SUPERSEDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS
(`§R.2`/`§R.3` `R-SEAMS`): the ruled census is `3 + 17 = 20` and the ruled import set is TWO VALUES
(`clampToBounds` **and `POINTER_TYPES`**) + TWO TYPE-ONLY bindings across THREE statements. THE `POINTER_TYPES`
VALUE IMPORT IS REQUIRED BY CONDITION `C-3`: the wiring's move type must BE the session's own exported token,
so the module cannot be a one-value-import module any more. The ruled figures are stated once at `§R.3` and
this cell's as-filed figures are kept visible here as that repair's provenance.** **The `4 + 6` figure was the gate-1 review's reading of the as-filed
census, in which `PointerResolver` was declared and used NOWHERE — it is WIRED by `§R` `R8`(b) below, so
`4 + 7` was the true census of that pass and `4 + 6` is SUPERSEDED.**

**⟶ CORRECTED AGAIN 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-SEAMS`): THE CENSUS IS NOW
`3` VALUE + `17` TYPE = `20` NAMES (`3 + 17 = 20`), because (a) the architect's seam ruling makes the
SEAM TYPES exported contract (`docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`),
which adds the `9` seam types `ApplyCursor` · `ApplyPreview` · `AxisOf` · `BoundsOf` · `Commit` ·
`MoveTypeOf` · `ResizableOf` · `SizeFromPointer` · `StartSizeOf`; (b) the as-filed `SEVEN` type names
OMITTED `GutterAffordanceStats`, which is declared and exported in this very block — so the pre-ruling type
half was `8`, not `7`; and (c) **the redundant `sizeFromPointer` VALUE export is DELETED**, because the seam
is now named by the type `SizeFromPointer` and one seam spelled two ways is not adjudicable by a by-name
census row.

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: TWENTY exported names, in TWO
HALVES — THREE value exports and SEVENTEEN type declarations** (`3 + 17 = 20`; **the as-filed cell read
*"ELEVEN exported names … FOUR value exports and SEVEN type declarations"* — `⟶ CORRECTED 2026-09-27, THE
GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-SEAMS`), for the three reasons above**). **The two halves are counted separately on
purpose**, because sibling reviews have caught a census cell contradicting the block beside it, and
because **a type declaration is erased at runtime** — so a single *"11 exports"* claim would be
**half-unfalsifiable**.

**(a) THE THREE RUNTIME VALUE EXPORTS — exactly `createGutterAffordance`, `cursorDeclarationFor` and `domEventSource`.** **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): THE AS-FILED SET READ *"THE FOUR RUNTIME VALUE EXPORTS — exactly `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource` and `sizeFromPointer`"*, and `sizeFromPointer` is DELETED (its seam is the exported type `SizeFromPointer`; the module needs no function binding of it, because this unit's drives reach the seam through `attach()` and a fork implements it as `options.sizeFromPointer`).**

**(b) THE SEVENTEEN TYPE DECLARATIONS — ⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`
`R-SEAMS`). THE AS-FILED SEVEN READ: `CursorOf`, `EventSourceLike`, `GutterAffordance`,
`GutterAffordanceOptions`, `PointerPosition`, `PointerResolver` and `PreviewState` — **which OMITTED
`GutterAffordanceStats`, declared and exported in the block below, and which predates the seam ruling that
makes the seam types part of the census.** THE RULED SEVENTEEN ARE: **the previously-counted EIGHT —
`CursorOf`, `EventSourceLike`, `GutterAffordance`, `GutterAffordanceOptions`, `GutterAffordanceStats`,
`PointerPosition`, `PointerResolver`, `PreviewState` — plus the NINE seam types `ApplyCursor`,
`ApplyPreview`, `AxisOf`, `BoundsOf`, `Commit`, `MoveTypeOf`, `ResizableOf`, `SizeFromPointer` and
`StartSizeOf`** (`8 + 9 = 17`). **The eleven caller seams pair to eleven of these types exactly once:
`cursorOf` ⇒ `CursorOf` and `pointerOf` ⇒ `PointerResolver` (already declared), and the other nine ⇒ the
nine new types.** **A fork imports these types; they are contract, not demo internals** (`§R.3`).

**A row asserting only a COUNT without NAMING the names FAILS `§3.4 R-1`'s own text** (`§4.4 S-1`).
**`resolveEventPointer` and `sizeClampedFor` are NON-EXPORTED module-local declarations** (the `E3`
census's own discipline, `docs/specs/gutter.md` `§2.1`'s corrected census): they are **read through the
module's behaviour**, never imported by a row; **`§3.4 R-1`(b) FAILS if a TWENTY-FIRST name appears.**

**⟶ UPDATED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`) — THE CENSUS PARAGRAPH'S OWN FIGURES, RESTATED SO THE BLOCK AND ITS SUMMARY AGREE.** **The ruled census is `3 + 17 = 20`; the as-filed `4 + 7 = 11` and its `4 + 6` predecessor are BOTH superseded (`4 + 6` because `PointerResolver` was wired by the §R `R8`(b) repair, `4 + 7` because the seam types joined the census and `GutterAffordanceStats` was omitted, and `4 + 17` because the redundant `sizeFromPointer` VALUE is deleted); the ruled import set is TWO VALUES + TWO TYPE-ONLY BINDINGS across THREE statements (`§2.1` clause 2), the second value being `POINTER_TYPES` of the session module (`R-11`).**

```ts
/** THE ONE COORDINATE READ IN THE PANES/ZONES FAMILY (§0A note 3).
 *  TOTAL: it returns `null` for every input that is not a usable coordinate pair and NEVER throws.
 *  The gate is a `typeof` gate on BOTH members, with a finite-number requirement on each:
 *  a `Proxy` whose traps throw, a throwing accessor, a `BigInt`, a `Symbol`, `NaN`, `Infinity`,
 *  a string, a missing member, a non-object (`42`, `'x'`, `null`, `undefined`) ⇒ `null`.
 *  ⟶ IT IS NON-EXPORTED. This block declares it for the contract's sake; `§3.4 R-1`(b) FAILS if it
 *  acquires an `export` keyword, and the row that needs the reading drives it through the factory. */
function resolveEventPointer(event: unknown): PointerPosition | null

/** THE POINTER, as this unit reads it: `clientX`/`clientY` ONLY.
 *  This is a VALUE record, frozen, carrying NO event reference, NO target, NO button and NO
 *  pointerId — so a caller's `sizeFromPointer` cannot receive the event and cannot re-read a
 *  coordinate from it (the one-read rule, `§3.4 R-3`). */
export interface PointerPosition {
  readonly x: number
  readonly y: number
}

/** ⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(b)) — THE CALLER'S POINTER RESOLVER, WIRED
 *  (the as-filed contract DECLARED this type and used it NOWHERE, which is why the gate-1 review read
 *  the census as `4 + 6`; it is now a live seam, so the census `4 + 7 = 11` was that pass's true figure —
 *  **⟶ and the RULED census of the step-3 repair pass is `3 + 17 = 20` (`§R.3` `R-SEAMS`), with this type
 *  among the `17`**).
 *  OPTIONAL caller seam: the event-object-to-`PointerPosition` resolution, for the caller that owns the
 *  real event channel. **WHEN SUPPLIED IT IS THE ONLY SITE THE COORDINATE IS OBTAINED FROM** and the
 *  module's own `resolveEventPointer` is NOT consulted (`§0A` note 3's one-read rule holds for the ONE
 *  resolver in force); its answer is handed to the module's own TOTAL gate, so a non-object, a partial
 *  pair, a `NaN`, an `Infinity`, a throwing accessor or a throw from the seam itself yields `null` and
 *  the move is INVALID. TOTAL: it may never throw INTO the module's turn (a throw is absorbed by the
 *  module's gate — the module's own listener turn stays total, `§3.2 F-1`/`F-6`). */
export type PointerResolver = (event: unknown) => PointerPosition | null

/** ⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3`, `R-SEAMS`): THE SEAM TYPES ARE
 *  EXPORTED CONTRACT. The architect's ruling (`docs/decisions.md`
 *  `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`) makes the eleven caller seams a PUBLIC
 *  contract that DOWNSTREAM consumers (forks) IMPLEMENT, so each seam's TYPE is exported from this module
 *  and each seam's signature, REQUIRED/OPTIONAL status, totality rule and DECLARED DEGRADATION is
 *  normative text (§R.3's seam table). THIS REPO'S DEMO SUPPLIES EXACTLY ONE EXAMPLE IMPLEMENTATION of
 *  them (the demo-side file `src/shared/demo-envelope.ts`, §5.1 row 2) and that implementation is NEVER
 *  the contract. `renderer.ts` imports THESE types for its wiring.
 *  THE NINE NEW TYPE DECLARATIONS (the other two seams reuse `CursorOf` and `PointerResolver` above). */
export interface SizeFromPointer { (pointer: PointerPosition, start: number): unknown } // ⟶ THE NORMATIVE SPELLING (C-A7): THIS INTERFACE CALL SIGNATURE, NOT A FUNCTION-TYPE ALIAS
export interface AxisOf { (element: unknown): unknown }
export interface ApplyPreview { (state: PreviewState): void }
export interface ApplyCursor { (element: unknown, declaration: string | undefined): void }
export interface StartSizeOf { (element: unknown, token: unknown): unknown }
export interface BoundsOf { (element: unknown, token: unknown): unknown }
export interface ResizableOf { (element: unknown, token: unknown): unknown }
export interface Commit { (gesture: unknown, value: number): void }
export interface MoveTypeOf { (element: unknown): unknown }

/** THE COORDINATE-TO-SIZE MAPPING — THE CALLER'S SEAM (§0A note 4).
 *  REQUIRED. It receives the module's own `PointerPosition` and the gesture's pre-drag size, and it
 *  owns the axis semantics: a horizontal gutter subtracts `x`, a vertical one subtracts `y`, whatever
 *  the caller's layout means. Its answer is handed UNEXAMINED to `clampToBounds` (`E3`'s exported pure
 *  function), whose `typeof` gate is the only validation there is. A non-number answer ⇒ the clamp
 *  answers `NaN` ⇒ NO SINK WRITE (the `E3` named safe default, `docs/specs/gutter.md` `§2.4` item 1).
 *  A THROW from it PROPAGATES to the caller of the module's own listener turn (`§2.3` item 5, F-3),
 *  exactly as `E3`'s own seam throws behave at a terminal.
 *  ⟶ DELETED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): THE AS-FILED BLOCK ALSO
 *  DECLARED A RUNTIME VALUE `export declare function sizeFromPointer(...)`, AND TWO NAMES MAY NOT BOTH BE
 *  `sizeFromPointer` IN ONE MODULE — a FUNCTION VALUE and an INTERFACE TYPE of the same name COLLIDE, which
 *  would have forced `.d.ts`-level declaration merging this unit's rows cannot assert (`§3.4 R-1`(a)/(b)'s
 *  BY-NAME set-equality would have been unfalsifiable). THE VALUE EXPORT IS THEREFORE DELETED AND THE SEAM
 *  IS **`SizeFromPointer` (the type) + `options.sizeFromPointer` (the wiring's argument)** — the module's
 *  own value surface is the THREE named below. The value export was REDUNDANT for a second reason: this
 *  unit's drives reach the seam THROUGH `attach()`, which is what `§R.3` says a fork implements.
 *  THE AS-FILED VALUES WERE `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource`,
 *  `sizeFromPointer`; THE RULED VALUES ARE `createGutterAffordance`, `cursorDeclarationFor`,
 *  `domEventSource` (THREE) and the census is `3 + 17 = 20` NAMES. */

/** THE AXIS-TOKEN-TO-CURSOR MAPPING — THE CALLER'S SEAM (§0A note 8).
 *  REQUIRED. It maps the SAME OPAQUE TOKEN `E3`'s `axisFor(element)` returns (the caller wires both
 *  from one closure, `§2.1` item 3) to a cursor declaration. The declaration is the CSS `cursor`
 *  VALUE ONLY — the caller may return `{ cursor: 'col-resize' }`; the string it returns is NOT
 *  interpreted beyond `String(...).trim()`, and the module carries NO cursor vocabulary of its own.
 *  TOTAL RESOLUTION: absent / non-callable / throwing, a non-object answer, an absent `cursor`
 *  property, a non-string `cursor`, and an empty-or-whitespace string ALL yield `undefined`
 *  (`cursorDeclarationFor`, `§5.5.1 P-GU-TP-2`) — and `undefined` means THE MODULE WRITES NOTHING. */
export type CursorOf = (token: unknown) => unknown

/** THE TOTAL RESOLUTION OF A `CursorOf` ANSWER (§5.5.1 P-GU-TP-2). EXPORTED so a row can drive it
 *  directly: `cursorDeclarationFor(value)` returns a trimmed non-empty `string`, or `undefined`.
 *  It NEVER throws, and it does NOT touch an element, a document or a style object. */
export declare function cursorDeclarationFor(value: unknown): string | undefined

/** THE EVENT SOURCE THIS UNIT INJECTS — the `A-d3` seam as the module's OWN adapter.
 *  It is a STRUCTURAL TYPE: the landed session's `§2.5`-frozen shape, declared HERE rather than
 *  imported, so the module's only import from the session stays TYPE-ONLY and the source it supplies
 *  is the module's own object (§3.4 R-8). */
export interface EventSourceLike {
  /** ⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-10`, condition `C-2`): THE HANDLER
   *  IS NOW DECLARED AS `(event: unknown) => void`, NOT `() => void`. **THE AS-FILED SHAPE READ
   *  `handler: () => void` — the gate-1 step-3 review's GOVERNING FINDING: with a ZERO-ARGUMENT handler
   *  the module's own listeners are COORDINATE-BLIND, so the live pointer could reach the module's
   *  resolver and `pointerOf` ONLY if the WIRING's source FORWARDS the DOM event to the handler as its
   *  FIRST argument, and the spec never said so.** THE RULE, now normative: **the wiring's source is the
   *  ONLY DOM-event observer in this composition — it holds the real `addEventListener` and, on each
   *  fired event, invokes the registered handler with THE DOM EVENT OBJECT as the first argument. BOTH of
   *  the module's event-reading turns use it: the MOVE turn (the coordinate, `§2.4`) and the module's own
   *  POINTERDOWN turn (the button read, `§2.3` rows 6/10).** A source that calls its handlers with NO
   *  argument is the wiring's own miswiring: the module's turns stay total (`F-1`/`F-14`-class: an absent
   *  event is an unresolvable pointer ⇒ an INVALID move), never a throw. */
  on(element: unknown, type: string, handler: (event: unknown) => void): void
  off(element: unknown, type: string, handler: (event: unknown) => void): void
  isConnected?(element: unknown): boolean
  capturePointer?(element: unknown): void
}

/** THE DOM-BACKED SOURCE — THE ONE MEMBER OF THIS MODULE THAT TOUCHES A DOM API.
 *  `domEventSource()` returns a source that attaches each listener to THE ELEMENT IT IS GIVEN via
 *  that element's own `addEventListener`, detaches via the SAME element's `removeEventListener` with
 *  the SAME handler reference, answers `isConnected(el)` from the element's own presence, and
 *  implements `capturePointer(el)` through the element's own `setPointerCapture` WHEN THAT MEMBER
 *  EXISTS — and is a NO-OP when it does not (the session's own declared degradation, gsession §2.3
 *  item 6(a)). It contains NO document-delegated listener, NO `closest`/`querySelector*`/`getElementById`,
 *  NO global lookup, and NO capture call of its own beyond the delegated member.
 *  ⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-10`, condition `C-2`): `domEventSource()`
 *  IS THE ONLY DOM-EVENT OBSERVER IN THIS COMPOSITION, AND IT FORWARDS THE EVENT. Its wrapped listener
 *  calls the registered handler with THE DOM EVENT OBJECT as the handler's FIRST argument (the
 *  `EventSourceLike` shape above), so the module's own move turn and pointerdown turn can read it. **A
 *  source that calls its handlers with NO argument is a miswiring whose consequence is a DECLARED
 *  degradation (an unresolvable pointer ⇒ an invalid move), never a throw.**
 *  TOTAL: a null / non-object / capture-less element makes every call a NO-OP. */
export declare function domEventSource(): EventSourceLike

/** THE VALUE DERIVATION AND ITS OUTCOME — what `applyPreview` and the counters speak (§2.4 item 2). */
export interface PreviewState {
  /** The CLAMPED value for this observed move — `clampToBounds(sizeFromPointer(...), bounds)`. */
  readonly value: number
  /** The axis token `axisOf(element)` returned for THIS gesture (opaque; passed on unchanged). */
  readonly token: unknown
  /** `true` iff this observed move's drag state was VALID by `§2.3` item 5's rule. */
  readonly valid: boolean
  /** `true` iff the caller's `isResizable` decision was truthy for THIS gesture. */
  readonly resizable: boolean
}

/** THE PER-CONTROL HOOKS THIS UNIT INSTALLS — the four hooks of `E3`'s `ResizeControllerHandle`
 *  (`docs/specs/gutter.md` `§2.1` item 3), ALL SUPPLIED BY THIS MODULE and none optional here. */
export interface GutterAffordanceOptions {
  /** THE SESSION. REQUIRED. Its unusability degrades exactly as `E3` declares (a VALID but INERT
   *  controller), and `§2.6` item 2 states which members this unit may read. */
  readonly session: unknown
  /** THE EVENT SOURCE this unit INJECTS. REQUIRED. `domEventSource()` is the real one; a recording
   *  double is the `[T]` form. */
  readonly source: EventSourceLike
  /** THE AFFORDANCE ELEMENT — the provident-rendered gutter handle. REQUIRED. Never looked up. */
  readonly element: unknown
  /** THE TARGET ELEMENT the cursor and the preview are applied to. REQUIRED. In this repo it is the
   *  provident-rendered pane/zone element the affordance resizes. */
  readonly target: unknown
  /** REQUIRED — the coordinate-to-size mapping (`§0A` note 4). Its EXPORTED type is `SizeFromPointer`
   *  (`§R.3`'s seam table is its normative row). */
  readonly sizeFromPointer: SizeFromPointer
  /** ⟶ ADDED 2026-09-27 (`§R` `R8`(b)) — THE OPTIONAL POINTER RESOLVER, typed by the exported
   *  `PointerResolver` (`§R.3`). When supplied it is the site
   *  the coordinate is obtained from (the module's `resolveEventPointer` then stands down); when
   *  absent the module's own resolver is used. Either way the answer passes the module's ONE total gate
   *  (`§2.4` item 1). */
  readonly pointerOf?: PointerResolver
  /** ⟶ ADDED 2026-09-27 (`§R` `R4`); **⟶ SUPERSEDED IN PART 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS
   *  (`§R.2` `R-11`, condition `C-3`): THE WIRING SUPPLIES THE SESSION'S OWN TOKEN.** The module must
   *  attach its OWN move listener; **the type it registers must BE the session's move type**, so the
   *  WIRING supplies **`POINTER_TYPES.move`** — `src/shared/gesture-session.ts`'s EXPORTED constant
   *  (the value `'pointermove'`) — as the answer of this seam. **The as-filed text said *"the caller
   *  supplies the event-type token (the demo wiring supplies the same event type the session uses, from
   *  the caller's own vocabulary)"*; a caller-INVENTED token that nobody dispatches converts a miswiring
   *  into a SILENT NO-OP that still goes green — the `B-9`/`P-9` false-green class — which is why
   *  `§3.1 M-18` and `§3.4 R-14` assert the registered TYPE MATCHED THE SESSION'S, not merely the
   *  count.** The answer is read through a `typeof` gate: a NON-EMPTY STRING is the token; anything else
   *  (absent, non-string, empty) means the module DOES NOT attach a move listener — the declared
   *  degradation, in which the drag half has no reading source and the session's own `onMove` wrapper is
   *  the only move turn (`§2.3` row 8's ordering clause). Its EXPORTED type is `MoveTypeOf`. */
  readonly moveTypeOf?: MoveTypeOf
  /** REQUIRED — the axis token source, typed by the exported `AxisOf`. It is ALSO what `E3`'s factory
   *  receives as `axisFor`, wired
   *  from ONE closure so the cursor's axis and the controller's axis cannot disagree
   *  (`§2.1` item 3, `§5.5.1 P-GU-IM-2`). */
  readonly axisOf: AxisOf
  /** REQUIRED — the cursor mapping (`§0A` note 8), typed by the exported `CursorOf`. */
  readonly cursorOf: CursorOf
  /** REQUIRED — the module's ONE preview call, invoked during the drag only (`§2.5`); typed by the
   *  exported `ApplyPreview`. */
  readonly applyPreview: ApplyPreview
  /** REQUIRED — the module's ONE cursor call, invoked on hover only (`§2.6` item 3); typed by the
   *  exported `ApplyCursor`. */
  readonly applyCursor: ApplyCursor
  /** REQUIRED — the pre-drag size source, typed by the exported `StartSizeOf`. It is ALSO `E3`'s
   *  `defaultSizeFor` (one closure, §2.1
   *  item 3), so an invalid release's reset clamps the PRE-DRAG SIZE the consumer holds. */
  readonly startSizeOf: StartSizeOf
  /** REQUIRED — the bounds pair source, typed by the exported `BoundsOf`; `E3`'s `boundsFor` (one
   *  closure, §2.1 item 3). */
  readonly boundsOf: BoundsOf
  /** REQUIRED — the resizability decision, typed by the exported `ResizableOf`; `E3`'s `isResizable`
   *  (one closure, §2.1 item 3). */
  readonly resizableOf: ResizableOf
  /** REQUIRED — THE ONE SINK (`E3`'s `commit` seam, one closure, §2.1 item 3), typed by the exported
   *  `Commit`. This unit NEVER calls
   *  it; `E3` is the single writer (`§0A` note 9). **⟶ NAMED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS
   *  (`§R` `R-13`, condition `C-5`): THE WRITE ROUTE THIS REPO'S WIRING IMPLEMENTS is ONE managed-channel
   *  write on the runtime — `Runtime.applyCommand({ kind: 'state-slice', node, mutation: [{ targetProp,
   *  mode: 'replace', value }] })` — NOT a preview write and NOT a handler body authored in the envelope
   *  (`§2.1` item 8(v), `§2.5` item 5).** */
  readonly commit: Commit
  /** OPTIONAL — ⟶ WITHDRAWN 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): THE CAPTURE OPT-IN CANNOT
   *  BE DELIVERED. `E3`'s `attach(element, hooks?)` accepts only the four hooks (its sealed clause
   *  forbids the opt-in), so passing `capture: true` in a hooks object is INERT and the capture claim is
   *  withdrawn from `§1` item 1, `§2.6` item 4 and `§0A` note 10. The seam is kept DECLARED so a caller
   *  that sets it is not silently misled, and its required behaviour is now: **the module does NOTHING
   *  with it and passes NO `capture` field anywhere** (the `E3`-SIDE owed item, `§2.6` item 4, `§8`).
   *  A row asserting an opt-in reaches the session FAILS — no such channel exists. */
  readonly capturePointer?: boolean
  /** OPTIONAL — the caller's veto on a drag state (`§2.3` item 5). ONLY an exact `false` marks the
   *  drag INVALID; `true`, `undefined`, a non-boolean, an absent seam and a throw are NOT vetoes. */
  readonly isDragValid?: (state: PreviewState) => unknown
}

/** THE AFFORDANCE — FIVE MEMBERS, and this is the WHOLE surface. Every member is TOTAL: none throws
 *  for ANY argument, whatever the session, the callbacks or the events do (§3.2 F-6, P-GU-TP-1). */
export interface GutterAffordance {
  /** Attach ONE affordance: ⟶ CORRECTED 2026-09-27 (`§R` `R1`/`R4`/`R6`): the module does **NOT**
   *  create the session — the WIRING does (`§R.1`, `§5.1` row `10`) and hands it in through
   *  `options.session`; the module creates the controller (`createResizeController({session, axisFor,
   *  boundsFor, defaultSizeFor, isResizable, sizeFor, commit})`, with **`sizeFor: (element, gesture) =>
   *  gesture.value`** — the session's documented consumer-side value channel, `§R` `R6`), installs the
   *  module's four hooks, attaches the module's OWN **FOUR** listeners (hover enter, hover exit, the
   *  context-button read and the module's own MOVE listener — `§2.3` row 2; the session adds its own
   *  via `E3`), and returns `true` iff every delegation succeeded. A repeat `attach()` is a NO-OP
   *  returning `false` (§2.3 item 1). */
  attach(): boolean
  /** Detach the module's OWN listeners through `source`, then `controller.detach()`. Returns `true`
   *  iff the controller reported `true`. IDEMPOTENT. TOTAL. */
  detach(): boolean
  /** `true` FOREVER once `detach()` has completed, or once the session reads `disposed === true`
   *  (§3.1 M-4's short-circuit). */
  readonly detached: boolean
  /** This module's OWN counters (`§2.1` item 5). NOT MCP-visible. NEVER throws. */
  stats(): GutterAffordanceStats
  /** The controller this affordance composed, exposed READ-ONLY so a row can read `E3`'s own
   *  counters beside this module's (`§5.5.1 P-GU-SM-1`'s two-reading rule). */
  readonly controller: unknown
}

/** THIS MODULE'S OWN COUNTERS. All monotonic except `lastCursor` (a string reading). */
export interface GutterAffordanceStats {
  /** Pointer-move turns OBSERVED by the module's own move listener (valid or not). */
  readonly moves: number
  /** `applyPreview` invocations. */
  readonly previews: number
  /** `applyCursor` invocations carrying a declaration (the hover WRITE count). */
  readonly cursorWrites: number
  /** `applyCursor(element, undefined)` invocations (the hover CLEAR count). */
  readonly cursorClears: number
  /** `controller.reset(element)` calls the module made on the invalid-release path. */
  readonly resets: number
  /** `controller.reset(element)` calls the module made on the drop-revert path. */
  readonly drops: number
  /** The LAST cursor declaration resolved (`''` before anything happened). */
  readonly lastCursor: string
}

/** THE FACTORY. TOTAL: NEVER THROWS, for ANY argument — including a hostile options object, a
 *  `Proxy`, a primitive or `undefined`. Every member of the returned affordance is present and
 *  callable in EVERY case, and an unusable session yields the `E3` DECLARED DEGRADATION. */
export declare function createGutterAffordance(options?: GutterAffordanceOptions): GutterAffordance
```

**`sizeFromPointer`, `cursorDeclarationFor` and `domEventSource` are EXPORTED so a row can drive them
directly**; the module's own internals (`resolveEventPointer`, `sizeClampedFor`) are **not**. **Every
declaration above is a CONTRACT: no member of `GutterAffordance` may be added** — `attach` · `detach` ·
`detached` · `stats` · `controller`, **and no sixth** (`§3.4 R-2`).

**The numbered clauses of this subsection, each falsifiable:**

| # | Clause | Pinned by |
| --- | --- | --- |
| **1** | **THE CENSUS.** The module exports **exactly three value names and exactly seventeen type names**, named above, and **nothing else**. **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the as-filed clause read *"exactly four value names and exactly seven type names"* = `11`; the seam ruling adds the `9` seam types, the as-filed `seven` omitted `GutterAffordanceStats`, and the redundant `sizeFromPointer` VALUE is deleted, so the ruled figures are `3 + 17 = 20` with all twenty names printed at `§R.3`.** | **`§3.4 R-1`**(a)/(b) |
| **2** | **THE IMPORTS.** **Exactly three import statements, with TWO VALUE imports**: a **value** import of `clampToBounds` from `./gutter.js`; a **value** import of **`POINTER_TYPES`** from `./gesture-session.js`; a **type-only** import (`GestureHandle`) from `./gesture-session.js`; a **type-only** import from `./gutter.js`. Any other path, or a value import of **anything else of either sibling**, **FAILS**. **⟶ CLARIFIED 2026-09-27 (`§R` `R8`(a)): the session INSTANCE arrives as `options.session` from the wiring — an ARGUMENT, never an import — which is what makes the census consistent with a module that must be handed a session (`§2.1`'s import-census ruling above).** **⟶ AMENDED AGAIN 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`, condition `C-3`): `POINTER_TYPES` IS A VALUE IMPORT AND IT IS REQUIRED. The as-filed cell read *"a value import of `clampToBounds` … a type-only import (`GestureHandle`) … a type-only import from `./gutter.js`"* — THREE statements of which ONE was a value — and the module may not replicate the session's private type constant, so it must IMPORT the exported one (`POINTER_TYPES.move`) as the answer the wiring passes through `moveTypeOf`. THE RULED SET IS **FOUR NAMED BINDINGS ACROSS THREE IMPORT STATEMENTS — TWO VALUES (`clampToBounds`, `POINTER_TYPES`) AND TWO TYPE-ONLY (`GestureHandle`, the controller's own type)**; a module that supplies a literal move type instead of `POINTER_TYPES.move` FAILS `§3.4 R-14`'s type-match row, and a module with a second value import of anything else FAILS this clause.** | **`§3.4 R-8`**, **`§3.4 R-14`** |
| **3** | **THE ONE-CLOSURE WIRING.** The five `E3` seams (`axisFor`, `boundsFor`, `defaultSizeFor`, `isResizable`, `commit`) are built from **the caller's own closures** (`axisOf` · `boundsOf` · `startSizeOf` · `resizableOf` · `commit`), **and each of them is called by the module EXACTLY ONCE per gesture at most** — the module does not wrap them in a counter, a cache or a second clamp. **⟶ EXTENDED 2026-09-27 (`§R` `R6`): a SIXTH `E3` option is wired and it is the VALUE CHANNEL — `sizeFor: (element, gesture) => gesture.value`, whose ONLY job is to read back the value the module's own `onMove` hook pushed through `handle.set(...)` (`§R` `R6`; the session's documented consumer-side channel). It is NOT a caller seam (no `options.sizeForOf` is added, and the caller supplies no sixth closure), it is a pure read of the handle, and it adds NO arithmetic of its own — the clamp stays `E3`'s.** | **`§5.5.1 P-GU-IM-2`**, `§3.4 R-3`, `§3.1 M-8` |
| **4** | **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): THE SESSION IS CREATED BY THE WIRING, AND THE MODULE CREATES THE CONTROLLER ONCE PER `attach()`.** **THE AS-FILED CLAUSE SAID the MODULE calls `createGestureSession({source, commit})` *"exactly once per `attach()`"* — which contradicted the module's own three-import census (a value call to the session factory requires either a value import or a fabricated edge). IT IS SUPERSEDED:** **the renderer wiring (`§R.1`, `§5.1` row `10`) calls `createGestureSession({source, commit})` ONCE, where `commit` is the wiring's single forwarding writer, and passes the INSTANCE in as `options.session`; the module calls `createResizeController(...)` EXACTLY ONCE per successful `attach()`, and never constructs a session.** **A `createGestureSession` call inside the module's bytes FAILS `§3.4 R-4`; a SECOND controller in `attach`'s path FAILS this clause.** | **`§3.1 M-5`**, `§5.5.1 P-GU-SM-1`, `§3.4 R-4`/`R-8` |
| **5** | **THIS MODULE'S COUNTERS ARE ITS OWN SURFACE, AND ARE NOT MCP-VISIBLE.** `stats()` returns the seven fields above; **no IPC method, no MCP tool, no `RpcCommand`, no `list_targets` handle, no store** — a later pass wiring them to an agent-reachable surface would be adding an MCP surface and would need its own gate. | **`§3.4 R-2`**, `§3.5 R-11` |
| **6** | **THE MODULE AUTHORS NO UI CONTENT — the exact negative token list.** The module's bytes (comments included, token-assembly joined) contain **`createElement`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `textContent`, `innerText`, `className`, `classList`, `appendChild`, `insertBefore`, `removeChild`, `document.write` and every element-creation token** in **NO** form. **The three DOM-touching members it DOES contain are named and are the whole carve-out: `addEventListener` · `removeEventListener` · `setPointerCapture`** (and `removeEventListener`'s counterpart for capture, `releasePointerCapture`, **MUST NOT appear** — this unit never releases). | **`§3.4 R-1`**, `§2.2` P-1 |
| **7** | **THE AUTHORING SITE — the demo envelope's gutter card, authored as DATA.** `src/shared/demo-envelope.ts` gains **one authored `<section>` card** containing, **as provident envelope data**: **(a)** the **affordance node** — a `div` with an authored `css.id`, an authored `css.classes` list, an authored `css.style` carrying the base `cursor` declaration and no geometry claim, an authored `props.id`, and **at least one authored handler** whose `event` is `'pointerdown'` (so the affordance is **`list_targets`-visible and `provident.dispatch`-reachable**, `§3.5 R-9`); **(b)** the **target node** — a `div` with an authored `css.id`, an authored `css.style` carrying a **base size declarative**, and an authored `props.id`; **(c)** a **status node** — a `div` with an authored `css.id`, an authored `props.id` and authored **placeholder `content`**, whose `content` the authored handler body writes so a committed value is **readable through `provident.get_rendered_html` / `get_markdown`**. **Handler bodies are function-STRING data in the modern `(ctx, value)` convention** (`docs/decisions.md` `DEMO-HANDLER-CONVENTION`, cited by NAME) and follow the envelope's existing `ctx.tree.allNodes()` + `props.id` scan + `clientAPI.apply` shape (`src/shared/demo-envelope.ts`'s landed bodies). **NO element is created outside the envelope, and no renderer file changes.** **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`, condition `C-9`): THE AS-FILED FINAL CLAUSE *"and no renderer file changes"* IS STALE AND IS DELETED. It predates the architect's `R1` ruling (*"the UI change is allowed to touch the renderer"*), which admitted the BOUNDED renderer wiring (`§R.1`, `§5.1` rows `10`/`11`), and it was left in place by the repair pass that made that ruling — so it contradicted `§1` item 6 and `§5.1`'s allow-list. THE LIVE CLAUSE IS: the demo card is authored as DATA, and the renderer changes THIS unit may make are the WIRING ONLY — never UI content (`§2.1` item 8, `§2.2` P-10, `§3.4 R-13`).** | **`§3.4 R-1`/`R-2`**, `§3.5 R-9` |
| **8** | **⟶ RULED 2026-09-27, THE `E-2` PASS (the architect's *"Reuse"*, `docs/pending.md` §I-duodecies): THE WIRING'S ROLE LIST IS THE FIVE ROLES BELOW AND THE SIXTH (REBIND) IS NOT OWED.** **THE SINK'S TARGET IS THE AUTHORED STATUS/READOUT NODE, DELIBERATELY OUTSIDE THE AFFORDANCE'S OWN NODE, AND THE COMMIT'S WRITE MUST NOT STRUCTURALLY REPLACE THE AFFORDANCE'S NODE (or its authored card's structure): reuse covers a PATCH, and a write that ADDS, REMOVES or MOVES that node would still change the element (`§2.5` item 5, `§3.1 M-19`, `§7a.1` item 4, `§5.U` `U-8`(e)).** **The affordance element is REUSED across the commit, the affordance is MULTI-SHOT, and a repeat `attach` stays the pinned first-config-wins no-op (`§2.3` row 3, `M-7`).** **⟶ THE AS-FILED FORM — ⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`) — AND ⟶ FIVE ROLES AS OF THE STEP-3 PASS (`§R.2` `R-9`…`R-13`): THE AUTHORING SITE'S COMPANION — the RENDERER WIRING, and the whole of what it may do.** **`src/renderer/renderer.ts`'s boot path** **(i)** constructs the **session** and (through the affordance factory) the **`E3` controller**; **(ii)** resolves the **affordance and target elements from the producing graph** via **`Runtime.elementForNodeId(...)`** (`src/renderer/runtime.ts`) — **`C-1` PINS THIS METHOD: id space engine `nodeId` ⇒ authored `css.id` ⇒ authored `props.id` (the precedence `resolveTarget` already uses); attribute-walk-only from the live mount (`data-node-id`, the runtime's own `nodeIdAttribute` opt-in); TOTAL (never throws); NO selector, NO `closest`, NO `querySelector*`, NO `getElementById`, NO element creation; `Runtime` HAS NO EQUIVALENT METHOD TODAY, so it is genuinely new; unresolvable ⇒ `null` ⇒ `.attach()` returns `false` ⇒ a NO-OP, never a throw; and its CALL SITE IS `main()` IMMEDIATELY AFTER `runtime.bootstrap()` AND BEFORE THE `if (!bridge)` CONDITIONAL, NOWHERE ELSE**; **(iii)** calls **`createGutterAffordance(...)`** and **`.attach()`**; **(iv)** owns the **`applyPreview`** and **`applyCursor`** presentation writes **and forwards the DOM event to every handler it registers through the source (`C-2`, `§R.2` `R-10` — the source is the ONLY DOM-event observer)**; **(v)** **⟶ ADDED 2026-09-27, THE STEP-3 PASS: owns the `commit` seam's ONE write route — ONE managed-channel write on the runtime, `Runtime.applyCommand({ kind: 'state-slice', node: <the authored status node's engine id>, mutation: [{ targetProp: 'content', mode: 'replace', value: String(<clamped value>) }] })` — NOT a preview write and NOT a handler body authored in the envelope (`§R.2` `R-13`, `§2.5` item 5).** **THE AS-FILED CELL READ *"Four roles, no more."* — CORRECTED TO FIVE, and the fifth is the commit route, not a rebind.** **A SIXTH ROLE — REBINDING THE AFFORDANCE AFTER THE COMMIT — IS *NOT* GRANTED BY THIS PASS: whether the committed write preserves the affordance element's identity or replaces it is `E-2`, an OPEN ARCHITECT CHOICE (`§7a.1` item 4); until it is ruled the wiring does NOT rebind, and the honest consequence is stated there.** **THIS WIRING AUTHORS NO UI CONTENT** — it creates no element, injects no markup, writes no class list, authors no handler body and adds no CSS: **a renderer edit that hand-writes DOM is a FINDING against `AGENTS.md`'s project-wide constraint, and the only renderer-side code this unit may add is this wiring.** **The affordance remains provident-rendered data driven through the producing graph** (`§R.1`, `§5.1` rows `10`/`11`, `§3.4 R-13`). | **`§5.1`**, **`§3.4 R-13`**, `§R.1`, `§R.2`, `§R.3`, `§1` items 2/6 |
| **9** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`, condition `C-3`): THE MOVE TYPE IS THE SESSION'S OWN, AND THE MODULE CARRIES NO EVENT-TYPE LITERAL OF ITS OWN.** The wiring answers **`moveTypeOf` with `POINTER_TYPES.move`** — the session module's EXPORTED, frozen constant (the value `'pointermove'`), imported by the module as a VALUE (`§2.1` clause 2) — so **the type the module registers for its own move listener IS the type the session itself dispatches**; the module reads the answer through its `typeof`/non-empty-string gate and attaches nothing otherwise (the declared degradation). **A caller-invented token, a hand-spelled `'pointermove'` literal, or a mismatched type is the false-green class `B-9`/`P-9` exist to close: the row would stay green on its call counts while NO move ever reached the module.** **Asserted by `§3.1 M-18` and `§3.4 R-14` — the TYPE, not the count.** **The module's OWN bytes contain NO pointer-event-type string: it neither replicates `POINTER_TYPES` nor authors an event-type literal (`§3.4 R-7`).** | **`§3.1 M-18`**, **`§3.4 R-14`**, `§3.4 R-7`/`R-8`, `§R.2` `R-11` |

---

### 2.2 What is CALLER-SUPPLIED, and the prohibitions — **every prohibition cites an ENUMERATED row**

**Caller-supplied (never built in, never defaulted, never enumerated):** the **session** (supplied by the
**renderer wiring**, `§R` `R1`; the module does not construct it); the **event
source**; the **affordance element**; the **target element**; **every mapping** (`sizeFromPointer`,
`axisOf`, `cursorOf`); **every presentation write** (`applyPreview`, `applyCursor`); **every value source**
(`startSizeOf`, `boundsOf`, `resizableOf`); **the one sink** (`commit`); **⟶ the pointer resolver
(`pointerOf`, `§R` `R8`(b)) and the move-event type token (`moveTypeOf`, `§R` `R4`)**; and the
**validity veto** (`isDragValid`). **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): the
as-filed list's *"the capture opt-in"* is WITHDRAWN — the seam is DECLARED and IGNORED, because `E3`'s
`attach` cannot carry it.** **The module contains NO axis vocabulary, NO cursor literal, NO unit
string, NO default size, NO default bound, NO threshold, NO selector, NO store, NO census read and NO
policy predicate.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No UI content authored by the module** (the project-wide constraint) | **The module authors no element, no text, no class taxonomy, no styling rule and no handler body** — the authored card is **data** in `src/shared/demo-envelope.ts` (`§2.1` item 7), and the module's own content tokens are **zero** (the nine-token negative list of `§2.1` item 6). | **`R-1`**, `§2.1` items 6/7 |
| **P-2** | **No document-delegated listener and no global element lookup** (`A-d3`) | **No listener is ever attached to `document`, `window` or any ancestor**: `domEventSource()` attaches to **the element it is given** and to **nothing else**; the module contains **no `closest`/`querySelector*`/`getElementById`** and **never obtains an element except as an argument**. **The module's ONLY DOM-API members are named** (`§2.1` item 6). | **`R-6`**, `§2.1` item 9, `§3.5 R-12` |
| **P-3** | **No second gesture authority, and no second writer** | The module **calls no session terminal itself** (`begin`/`end`/`cancel` appear in **no** call of its bytes: `§3.4 R-5`), **holds the session's ONE `commit`** and **calls no `commit` of its own** (`§0A` note 9), and **owns no listener window, no disposal order and no "one gesture at a time" guard**. | **`R-4`**, **`R-5`**, `I-1`/`I-2`, `§5.5.1 P-GU-SM-1` |
| **P-4** | **No policy of its own** | No default bound, no default size, no axis token literal, no cursor literal, no unit string, no threshold, **no `data-*` name of its own**. The two strings the module owns are its **`PreviewState` field names** and **its own cursor-less sentinel `'undefined'` reading** (a return, never a wire value). | **`R-7`**, `§2.4` item 2, `§0A` notes 4/8 |
| **P-5** | **No store, no persistence, no cache, no module-level state** | No file, no `localStorage`, no store object, no memo, **no `Map`/`WeakMap` keyed by element**, **no module-level mutable state**. The instance keeps **one per-gesture record** (pre-drag size, token, handle) **discarded in a `finally` at every terminal** (`§0A` note 5) and **its own counters**. | **`R-7`**, `I-3` |
| **P-6** | **⟶ WITHDRAWN IN PART 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): NO RELEASE, AND NO CAPTURE OPT-IN THIS UNIT CAN DELIVER** (the as-filed title was *"No capture before establishment, and no release"*; the capture half is withdrawn, the release half stands) | **The as-filed cell read: *the module passes `capture: true` to `attach` iff the caller opted in* — that passage is DELETED: `E3`'s `attach(element, hooks?)` cannot carry the opt-in, so the write is inert and the claim was vacuous.** **What STANDS and is now the whole clause: the module's own bytes contain NO capture call and NO `releasePointerCapture`; the module passes NO `capture` field anywhere; and the capture need is a named `E3`-SIDE owed item with its revisit condition (`§2.6` item 4, `§8`).** | **`§3.4 R-6`**, `§0A` note 10, `§2.6` item 4 |
| **P-7** | **No new MCP surface, no IPC, no preload, no config** | No tool, no resource, no group, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, **no `package.json` / `scripts/**` / `tsconfig.json` / `vitest.config.*` change** (`§5.1`'s DENIED set). | **`§3.4 R-11`**, `§5.1` |
| **P-8** | **No re-expression of `E3` or the session** | The module **composes**: it calls `E3`'s factory and the session's factory, installs four hooks, and **implements no clamp of its own** (it calls the exported `clampToBounds`), **no code domain of its own**, and **no terminal of its own**. | **`R-3`**, **`R-4`**, `§2.6` items 1/2 |
| **P-9** | **No rendered-fact claim from the node suite** | **A `[T]` row may not assert a rendered geometry, an applied style on a real element, a cursor's effect, a layout, or a real pointer** — those are `[U]` claims (`§5.2`). | **`§3.2 F-13`**, **`§3.3 I-10`**, `§5.3` item 6, `§4.4 S-7` |
| **P-10** | **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`); ⟶ EXTENDED 2026-09-27 BY THE STEP-3 PASS (`§R.2` `R-10`…`R-13`): THE WIRING AUTHORS NO UI CONTENT, AND ITS LICENCE IS FIVE NAMED ROLES.** **`src/renderer/renderer.ts`'s and `Runtime.elementForNodeId`'s added bytes create no element, inject no markup or text, write no class list, author no handler body and add no CSS**: the affordance stays **provident-rendered data driven through the producing graph**, and **a renderer edit that hand-writes DOM is a FINDING** (`AGENTS.md`'s project-wide constraint). **The as-filed sentence read *"the four wiring roles of `§2.1` item 8 are the WHOLE licence"* — corrected: the licence is the FIVE roles of `§2.1` item 8 ((i)–(v), the fifth being the `commit` seam's ONE managed-channel write, `§R` `R-13`), PLUS the event-forwarding obligation of `§R` `R-10` (a property of role (ii)'s source, not a sixth role), PLUS the example seam implementation homed in the demo file (`§R.3`).** | **`§3.4 R-13`**, `§5.1` rows `10`/`11`, `§2.1` item 8 |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4 R-1`..`§3.4 R-13`, the last added by
the 2026-09-27 repair pass, `§R` `R1`) **— a prohibition
citing *"a static source row"* with no id is not a row.** **Every prohibition above names at least one id
that exists in `§3.4`.**

---

### 2.3 The drag-state machine — SEVEN states, every transition ruled

**The states, named once, so no clause uses a state this table does not define:**

| State | What is true in it | Session's own state | The module's own state |
| --- | --- | --- | --- |
| **`idle`** | nothing is attached here, or `detach()` completed | `disposed` or uninstalled | no listeners of this module's own |
| **`hover`** | the affordance is attached and the pointer is over it, **no gesture** | installed, **no active gesture** | the module's hover listeners are on; **no per-gesture record exists** |
| **`pressed`** | a PRIMARY `pointerdown` was observed on the affordance **and** the session has not yet reported a gesture | installing / establishing | **no per-gesture record yet** |
| **`dragging`** | the session's own `begin` succeeded and the module's `onStart` ran | **active gesture**, four listeners on the element | **the per-gesture record holds `{preDragSize, token, handle: null}`** |
| **`released/committed`** | the session's `end` terminal ran with a VALID drag state | gesture terminated (`outcome: 'end'`) | record **discarded**; sink written **exactly once by `E3`** |
| **`released/reset`** | the invalid arm was taken: `controller.reset(element)` ran for the ACTIVE gesture | gesture terminated (`outcome: 'reset'`) | record **discarded**; sink written **exactly once by `E3`** — **IF the reset was usable** |
| **`dropped`** | a SECONDARY-button press was observed during `dragging`, the module took the drop path | gesture terminated by the session's `cancel` | record **discarded**; **ZERO commits and ZERO sink writes** |

**The transition table — every edge, its trigger, and its own falsifier:**

| # | From | Trigger (exact) | What the MODULE does | What it must NOT do | Session calls the module makes | Row |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | — | `createGutterAffordance(options)` | **(the session ALREADY EXISTS — the wiring built it and passed it in as `options.session`, `§R` `R1`)**; the module builds **the controller** and installs **no** listener | no element lookup, no listener before `attach`, **no `createGestureSession` call** | the session was constructed ONCE by the wiring, before this call; `createResizeController` once | `M-6` |
| **2** | `idle` | `attach()` | **`createGestureSession({source, commit})`** (the module's own writer), **`createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, commit})**, **`source.on(element, 'pointerover', …)`** and **`source.on(element, 'pointerout', …)`** and **`source.on(element, 'pointerdown', …)`** and **`source.on(element, moveTypeOf(element), …)`** — **this module's OWN FOUR listeners, the fourth being the MOVE listener ruled at `§R` `R4`** — then **`controller.attach(element, {onStart, onMove, onEnd, onCancel})`** **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`/`R-12`, conditions `C-3`/`C-4`): (a) THE FOURTH LISTENER'S TYPE IS THE SESSION'S OWN TOKEN — `moveTypeOf(element)` MUST answer `POINTER_TYPES.move`, the session's exported constant (`§2.1` item 9), and a call site that registers anything else FAILS `§3.4 R-14`; (b) LISTENER OWNERSHIP, STATED FOR BOTH SETS ON THE SAME ELEMENT: THE MODULE'S FOUR (hover enter, hover exit, the context-button read, the move listener) are INSTALLED BY THE MODULE and REMOVED BY THE MODULE (`source.off` × 4, `M-15`); THE SESSION'S OWN SET (its one `pointerdown` install, plus — only once a gesture establishes — the `move`/`end`/`cancel` tracking trio: FOUR EVENT TYPES, installed and tracked by the SESSION) is INSTALLED and REMOVED BY THE SESSION through `E3`'s `attach`/`detach`/`dispose`; and THE WIRING REMOVES NOTHING — it installs nothing itself and detaches nothing itself. Neither owner removes the other's listeners, and a `source.off` for another owner's type FAILS `§3.3 I-15`.** | **no** `document`-delegated listener, **no** capture call and **no `capture` field** of its own (`§R` `R5`), **no** `element` lookup, **no** `createGestureSession` call | `session.install` (via `E3`) exactly once per distinct element; the session's own `'pointerdown'` attach; **`source.on` × `4` by this module, `5` in the composed attach** | `M-6`, `M-7`, `M-18` |
| **3** | `idle`/`hover` | a repeat `attach()` | returns **`false`**, delegates **nothing** | no second session, no second install, no listener churn | **ZERO** | `M-7` |
| **4** | `hover` | the `'pointerover'` handler runs | **`token = axisOf(element)`**, **`declaration = cursorDeclarationFor(cursorOf(token))`**, **`applyCursor(element, declaration)`** — **the AFFORDANCE, not the target** (`§R` `R8`(c)) | **no** session call, **no** controller call, **no** preview call, no record | **ZERO session calls** | `M-10`, `P-GU-SM-3` |
| **5** | `hover` | the `'pointerout'` handler runs | **`applyCursor(element, undefined)`** — **the same AFFORDANCE** — **iff a declaration was written for this hover** | **no** session/controller call, **no** preview call | **ZERO session calls** | `M-11` |
| **6** | `hover`/`pressed` | the `'pointerdown'` handler runs **with a SECONDARY button** (`button === 2`, read through a `typeof` gate) while **no gesture is active** | **NOTHING**: it does not begin a gesture, does not swallow, does not call the session | **no** session terminal, **no** `session.begin` | **ZERO** | `M-14`, `F-7` |
| **6b** | `hover`/`dragging` | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-10`, condition `C-2`): THE MODULE'S OWN `'pointerdown'` TURN FIRES, AND THE BUTTON IT READS COMES FROM THE FORWARDED EVENT.** The wiring's source passes the DOM event as the handler's first argument (the amended `EventSourceLike`), and **the module reads `button` from THAT argument** — never from a module-held event reference, never from a second source, never from a coordinate. | **(i)** the turn reads `event.button` through a `typeof` gate and behaves as rows 6/10 declare; **(ii)** **an event with NO `button` member, a non-number `button`, or a turn invoked with NO argument is the declared degradation — the read yields no secondary press, so NOTHING is dropped and NOTHING throws**; **(iii)** **a source that calls its handlers with no argument degrades exactly this way** (which is why a handler declared `() => void` — the as-filed shape — could never see a real pointer at all, the step-3 review's governing finding). | **no** module-held event reference, **no** second observer, **no** throw for an absent event | **ZERO** | `M-14`, `F-7`, `F-14` |
| **6c** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-12`, condition `C-4`): LISTENER OWNERSHIP — THE MODULE'S FOUR AGAINST THE SESSION'S OWN SET, BOTH ON THE SAME ELEMENT.** After `attach()` and after a gesture establishes, the source's log carries **the module's FOUR** (`pointerover`, `pointerout`, `pointerdown`, `POINTER_TYPES.move`) and **the session's own install plus its tracking trio** (`move`, `end`, `cancel` — installed by the session at establishment, `docs/specs/gsession.md` `§2.3` item 1). | **each set is installed by its OWN owner and removed by its OWN owner: `detach()` issues `source.off` × `4` (the module's own, same three values as its `on`) and `controller.detach()` lets `E3`/the session remove theirs; the WIRING issues NO `source.on` and NO `source.off` of its own.** | **no** cross-owner removal (a `source.off` for a type the module did not install FAILS `I-15`), **no** `document`-delegated listener, **no** listener left attached after `detach()` | the module's `4` + the session's own | `M-4`, `M-15`, `M-18`, `I-15` |
| **7** | `hover` | the `'pointerdown'` handler runs with a **PRIMARY** button and the session establishes (its own start listener fires) | **`onStart(element)` runs**: `token = axisOf(element)`, `preDragSize = startSizeOf(element, token)` stored in the record | **no** sink write, **no** `commit` call, **no** preview call | `E3`'s own `session.install` was already made at `attach` | `M-8` |
| **8** | `dragging` | **⟶ REWRITTEN 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R4`/`R6`): the module's OWN move listener fires with the move event**, and (in the SAME turn) the session's wrapped `onMove(gesture)` wrapper runs | **THE ORDERING, ruled exactly: (i) the module's own `'pointermove'` listener turn runs FIRST** — it correlates the event with the active record, reads `pointer = pointerOf(event)` **or** `resolveEventPointer(event)`, then `raw = sizeFromPointer(pointer, preDragSize)` ⇒ `value = clampToBounds(raw, boundsOf(element, token))` ⇒ **`valid = isFinite(value) && validByVeto`** ⇒ **`handle.set(value)`** (the value channel, `§R` `R6`) ⇒ **`applyPreview({value, token, valid, resizable})`** when the move is valid, or **the reset arm (row 9)** when it is not; **(ii) the session's own wrapped `onMove` then runs and captures the handle** (`E3`'s `wrappedOnMove` is the ONLY legal handle channel). **The frozen session passes NO event to `onMove`**, which is exactly why the module's own listener exists (`§R` `R4`). **A move that arrives BEFORE the handle is captured** (the session's `begin` has established but the wrapper has not yet run for any move) **still reads, sets and previews — the module's record is keyed by the ELEMENT, not by the handle — and an INVALID move in that window calls `controller.reset(element)`, which refuses `'no-gesture'` with ZERO session calls and leaves the module's own `resets` counter UNMOVED** (`§3.1 M-13`'s counter rule; `docs/specs/gutter.md` `§2.5` item 5 clause 3). | **no** sink write; **no** graph dispatch; **no** second coordinate read; **no** session terminal | **ZERO session calls** | `M-12`, `M-13`, `F-1` |
| **9** | `dragging` | **the drag state became INVALID** by `§2.3` item 5 (the observed move was invalid **or** a prior move was) **and the module's own move turn is running** — **⟶ RULED 2026-09-27 (`§R` `R7`): this is a SEAM FAILURE (an unusable pair, an unusable default, a discarded record), NOT an ordinary out-of-bounds value — an out-of-bounds but FINITE value is CLAMPED by `E3` and the drag stays VALID.** | **`controller.reset(element)`** — the module's ONE session-touching call on this path — **then `applyPreview({value: preDragSize, token, valid: false, resizable})` (the VISIBLE REVERT, `§R` `R7`/`§R` `R8`(d))**, and **the handle is cleared for the later `pointerup` so it commits NOTHING further** | **no** `session.begin`/`end`/`cancel`, **no** second `reset` for the same gesture, **no** preview of the invalid value | `session.reset` (via `E3`) **exactly once**, with the clamped pre-drag size | `M-13`, `F-2` |
| **10** | `dragging` | the module's OWN `'pointerdown'` listener observes a **SECONDARY button** (`button === 2`, read through a `typeof` gate) while a gesture is active (the right-click / drop path — **the observation point `F-7` needs**, `§R` `R4`) | **the session's own `cancel` terminal is what terminates the gesture** (the module does not call it); the module **reverts the preview through `applyPreview({value: preDragSize, …})`** in its terminal hook | **no** `session.cancel` call, **no** `controller.reset` on this path, **no** sink write | `E3` writes NOTHING (`cancel` ⇒ zero commits) | `M-9`, `F-3` |
| **11** | `dragging` | the session's `end` terminal (its own `pointerup` listener) with a VALID state | the module's `onEnd` runs; the module **writes no preview**; **`E3` writes the sink EXACTLY ONCE**; the record is discarded in a `finally` | **no** module-side sink call, **no** `session.reset` | `E3`'s one sink write; **ZERO module session calls** | `M-8`, `M-12`, `P-GU-SM-1` |
| **12** | `pressed`/`dragging` | the session's `cancel` terminal arrived without the module's drop path (a `pointercancel`, a `dispose()` mid-gesture) | the module's `onCancel` runs; **`applyPreview({value: preDragSize, …})`**; the record is discarded in a `finally` | **no** sink write, **no** session call | **ZERO** | `M-9` |
| **13** | any | `detach()` | **`source.off` × `4`** for the module's own listeners (each with the SAME three values as its `on`), then **`controller.detach()`** | no double-detach, no session call of its own | `session.dispose` (via `E3`) exactly once when it delegates | `M-15` |
| **14** | any | the session reads `disposed === true` | **the row's REQUIRED behaviour (as filed): every member short-circuits** — `attach()` ⇒ `false`, `detach()` ⇒ `false`, **no session call of any kind** | no delegation to a disposed session | **ZERO** | **`M-2`** (**⟶ CORRECTED 2026-09-27, `§R` `R8`(f)/`R2`: the as-filed cell cited `M-4`, which is the LISTENER-COUNT row; the disposed-session row is `M-2`, and `M-2` carries the `EXPECTED-RED` / `OWED — E3-SIDE` status**) |

| **15** | **⟶ RULED 2026-09-27, THE `E-2` PASS (the architect's *"Reuse"*, `docs/pending.md` §I-duodecies): THE ELEMENT IS REUSED ACROSS THE COMMIT — NO REBIND, NO SIXTH ROLE, AND A STRUCTURAL WRITE THROUGH THE AFFORDANCE'S NODE REMAINS THE WIRING'S TO AVOID.** **THE RULED CELL, stated in full so the as-filed conditional below is not read as live: the runtime REUSES the emitted element across the write, so the as-filed *"IF that re-render replaces the affordance element"* is FALSE, the affordance is MULTI-SHOT, the SECOND gesture on the same affordance IS guaranteed, and no rebind is owed — the SIXTH role is NOT granted AND NOT NEEDED (`§2.1` item 8, `§2.3` row 3/`M-7`, `§7a.1` item 4).** **The structural-write boundary is the live caveat: reuse covers a PATCH, so the sink's `node` is the authored STATUS/READOUT node, deliberately OUTSIDE the affordance's own node, and a write that adds, removes or moves that node (or its authored card's structure) would still change the element (`§2.5` item 5, `§3.1 M-19`, `§5.U` `U-8`(e)).** **The runtime REUSES the emitted element across a graph write (a `state-slice` apply patches it in place), so the listener the session installed is on a LIVE element after the commit, the affordance is MULTI-SHOT, and the wiring performs NO rebind and NO re-resolution of the affordance element (the SIXTH wiring role is NOT OWED, `§2.1` item 8).** **THE BOUNDARY, stated with the identity claim: the write must NOT structurally replace the affordance node — reuse covers a PATCH, and a write that ADDS, REMOVES or MOVES the affordance's own node (or its authored card's structure) would still change the element — so THE SINK TARGETS THE AUTHORED STATUS/READOUT NODE, DELIBERATELY OUTSIDE THE AFFORDANCE'S NODE.** **The EVIDENCE is the LIVE second-gesture observation at `§5.U` `U-8`(e): drag → commit → drag AGAIN on the same affordance, recording the same element object (same `data-node-id` AND object identity across the write) and a committed second drag.** **⟶ THE AS-FILED FORM, KEPT VISIBLE AND SUPERSEDED — ⟶ ADDED 2026-09-27, THE GATE-1 STEP-3-REPAIR PASS (`§R.2` `R-13`, condition `C-5`): the session's VALID `end` terminal (row 11) AND the invalid `reset` terminal (row 9) both run `E3`'s ONE sink write — and THAT WRITE IS THE ONE PLACE THIS UNIT'S STATE REACHES THE GRAPH.** the `end`/`reset` terminal runs `E3`'s writer with the clamped value | **the WIRING's `commit` seam performs EXACTLY ONE managed-channel write on the runtime — `Runtime.applyCommand({ kind: 'state-slice', node, mutation: [{ targetProp, mode: 'replace', value }] })`** (the authored status node's engine id, the clamped value) — and **the re-render it triggers is the §2.5 item 5 hazard BOUND TO THE COMMIT**: if that re-render replaces the affordance element, the listener the session installed is on a dead element and the affordance is single-shot. **THAT IS `E-2` AND THIS PASS DOES NOT DECIDE IT** (`§7a.1` item 4): **no rebind is performed, no SIXTH role is granted, and the honest consequence is that a SECOND gesture on the same affordance is not guaranteed until `E-2` is ruled.** | **no** preview write, **no** module-side sink call, **no** direct handler-body dispatch, **no** `elementForNodeId` re-resolution mid-gesture (a rebind would need one and is NOT granted) | `E3`'s one sink write, then the wiring's one `applyCommand` call | `M-19`, `M-8`, `M-13`, `I-15` |


| **16** | **⟶ RULED ON ITS OWN TERMS 2026-09-27; THE `E-2` RULING DOES NOT REACH IT (see the note at the end of this cell).** **ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`, residual risk): a POST-BOOT RE-DERIVATION (`provident.load` / `code.load` / `code.loadBatch` / a journal base-restore / a `teardown`)** | the runtime re-derives the graph while the affordance is attached | **NOTHING — and that is the ruled behaviour: this is OUT OF CONTRACT.** The graph is torn down and the wired elements replaced, **the session's listeners and the module's own listeners remain on the PREVIOUS tree's elements**, and **the wiring does NOT re-attach.** **The affordance becomes INERT (no gesture, no cursor, no preview) and NO throw occurs** (every turn is total, `I-7`). | **no** automatic re-attachment, **no** rebind, **no** re-resolution of the affordance element, **no** module-side detection of the swap. **⟶ ANNOTATED 2026-09-27 (`E-2` CLOSED by the architect's *"Reuse"*): the reuse ruling covers a GRAPH WRITE that PATCHES an element; a RE-DERIVATION REBUILDS the tree, so the element the listeners are on is genuinely replaced and this row's INERT consequence STANDS unchanged — it is NOT `E-2`'s element-identity question any more (`§7` item 15).** | none — the module makes no session call here | `§7` item 15, `§2.3` row 15, `§7a.1` item 4 |

**THE VALIDITY RULE, stated exactly (`§0A` note 6; **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R`
`R7`)**): a DRAG STATE observed on a pointer move is VALID iff
ALL of the following hold — (i) `resolveEventPointer` (**or the caller's `pointerOf`**) answered a `PointerPosition`; (ii)
`sizeFromPointer(pointer, start)` answered a value; (iii) `clampToBounds`'s answer for that value over
`boundsOf(element, token)` is a **finite number** (`Number.isFinite`); and (iv) the caller's
`isDragValid` did **not** answer an exactly-`false` veto. In EVERY other case — a null pointer, a
non-finite clamp answer, a `NaN`, an `Infinity`, or an exact `false` veto — the drag state is INVALID,
and INVALID IS STICKY FOR THAT GESTURE: once any observed move of a gesture is invalid, the gesture's
release is invalid, and no later valid move un-invalidates it.** **The sticky half is a working default
(`§7a.1` item 2); a later pass that wants "the last observed move decides" must open a gate.**

**⟶ RULED 2026-09-27 (`§R` `R7`) — WHAT "INVALID" MEANS FOR THE RELEASE, and what it does NOT.**
**An OUT-OF-BOUNDS BUT FINITE clamped value is NOT an invalid drag: `E3` CLAMPS it and the drag stays
VALID, committing the clamped value at the `end` terminal.** **INVALID means a SEAM FAILURE — the clamp
answered a NON-FINITE value (an unusable pair, an unusable `sizeFromPointer` answer), or the caller's veto
fired exactly `false`, or the pre-drag record the reset needs is gone.** **Only the invalid arm takes the
`reset` terminal; and it is taken the moment invalidity is ESTABLISHED during the drag (row 9), never at
the release turn** — because the session's own `pointerup` listener ends every gesture at its own terminal
and `E3`'s `reset` is legal only for an ACTIVE gesture (`§R` `R7`; `§7a.1` item 2).

**THE TERMINAL WRITE TABLE — the numbers every write-count row asserts (rows `M-8`/`M-9`,
`P-GU-SM-1`):**

| The terminal | `applyPreview` writes | sink writes (by `E3`) | module session calls | `E3`'s `reset` |
| --- | --- | --- | --- | --- |
| **`end` of a VALID drag** | **`0`** (the graph commit is the visible change) | **exactly `1`** (the CLAMPED DRAGGED VALUE **read from the handle's own value channel**, `§R` `R6`) | **`0`** | `0` |
| **`reset` of an INVALID drag** (usable default + resizable) | **`1`** (**the VISIBLE REVERT to the pre-drag size** — **⟶ CORRECTED 2026-09-27, `§R` `R7`/`R8`(d): the as-filed `0` is SUPERSEDED — an invalid drag does NOT freeze at its last valid preview; it reverts visibly to the pre-drag size**) | **exactly `1`** (the clamped pre-drag size) | **`1`** (`controller.reset(element)`) | `1` |
| **`reset` refused** (`'not-resizable'` / `'unusable-default'`) | **`1`** (the same revert — the visible state must not be left showing a value that was never committed) | **`0`** | **`1`** (the refusal path still made the call) | `1` |
| **`cancel`** (a `pointercancel`, a `dispose()` mid-gesture) | **`1`** (the revert to the pre-drag size) | **exactly `0`** | **`0`** | `0` |
| **the DROP path** (right-click) | **`1`** (the revert) | **exactly `0`** | **`0`** | `0` |

**A gesture NEVER produces more than one sink write and more than one preview write per observed move: a
state that violates either FAILS the rows above.** **⟶ AMENDED 2026-09-27 (`§R` `R7`): the reset rows above
now carry ONE preview write each — the revert — which keeps the per-observed-move rule intact (the revert
is one write in the reset turn, not a second write for the move).**

---

### 2.4 The value derivation from the pointer — the ONLY coordinate read, stated falsifiably

1. **THE COORDINATE IS READ IN ONE PLACE, AND BY ONE FUNCTION.** `resolveEventPointer(event)` reads
   **`clientX` and `clientY` only**, through a `typeof` gate on each member with a
   **`Number.isFinite` requirement**, and returns a **frozen `{x, y}`** or **`null`**. **It returns
   `null` for: `null`, `undefined`, a primitive (`42`, `'x'`, `true`), a function, an absent member, a
   non-`number` member, `NaN`, `±Infinity`, a throwing accessor, and any object whose member reads
   throw** — and **it NEVER throws.** **It reads no other event field**: no `pageX`/`pageY`,
   `screenX`/`screenY`, `offsetX`/`offsetY`, `movementX`/`movementY`, `deltaX`, `pointerId`, `button` or
   `buttons` — **the `button` read for the drop path is a SEPARATE, named read inside the module's own
   `'pointerdown'` handler** (`§2.3` row 6) and **is not a coordinate**. **`§3.4 R-3` is the row that
   FAILS on a second read.**
2. **THE VALUE CHAIN, and there is exactly ONE path through it.**

   ```
   the module's OWN move listener  ──▶  pointerOf(event) ?? resolveEventPointer(event)   (THE ONLY COORDINATE READ)
                                          │  null ⇒ the move is INVALID (§2.3 item 5) and NO preview is written
                                          ▼  a PointerPosition
   pointer + preDragSize  ──▶  sizeFromPointer(pointer, start)           (THE CALLER'S MAPPING)
                                          ▼  raw
   raw + boundsOf(element, token)  ──▶  clampToBounds(raw, bounds)        (E3's EXPORTED PURE FUNCTION)
                                          ▼  value (a number; `NaN` ⇒ the move is INVALID)
   handle.set(value)                                                     (THE SESSION'S VALUE CHANNEL, §R R6)
   applyPreview({ value, token, valid, resizable })                      (THE PREVIEW CHANNEL, §2.5)
                                          … the session's terminal …
   E3's terminal:  sizeFor(element, gesture, axis) = gesture.value        (THE READ-BACK, §R R6)
                   ⇒ one `commit(gesture, clampToBounds(value, bounds))` iff the terminal is an `end`/`reset`
   ```

   **⟶ ADDED/AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R6`/`R8`(b)): the chain now NAMES the two
   legs the as-filed diagram omitted — the `handle.set(value)` write (without it no valid drag can commit,
   the gate-1 review's value-channel must-fix) and the `E3` terminal's `sizeFor` read-back, which is the
   module's `sizeFor: (element, gesture) => gesture.value` wiring.** The coordinate step shows the
   **caller's `pointerOf` first and the module's own resolver as the fallback** (`§2.4` item 1's amendment),
   so the one-read rule is unchanged.

   **The chain has THREE falsifiable clauses, and each is a row: (i)** the coordinate is read **once per
   observed move**; **(ii)** `sizeFromPointer` is called **at most once per observed move** and **never at
   a terminal**; **(iii)** **the clamp happens at exactly ONE site in the family** — `E3`'s
   `clampToBounds`, called by this module for the preview and by `E3` at the terminal — and **a SECOND
   clamp implemented in this module is `§4.4 S-5` and does not land**
   (`docs/specs/gutter.md` `§4.4 S-PURE-4`). **⟶ A FOURTH clause is added by the same repair: (iv) the
   module's own `onMove` turn calls `handle.set(value)` EXACTLY ONCE per valid observed move, and
   `E3`'s `sizeFor` read-back is a PURE READ of `gesture.value` — a second `set` in one turn, or a
   `sizeFor` that computes anything, FAILS (`§R` `R6`).**
3. **THE PRE-DRAG SIZE IS THE CONSUMER'S, AND IT IS CAPTURED IN `onStart`.** `startSizeOf(element, token)`
   is called **exactly once per gesture, in `onStart`**, and its answer is stored **in the module's own
   per-gesture record** — **the session holds no cross-gesture state** (`docs/specs/gutter.md` `§2.5`
   item 5 clause `1b`), so the pre-drag value **cannot** come from the session. **The same closure is
   `E3`'s `defaultSizeFor`**, so the invalid release's reset clamps **the pre-drag size**, and **the two
   readings cannot disagree** (`§5.5.1 P-GU-IM-2`).
4. **THE RESIZABILITY DECISION IS `E3`'s, AT ESTABLISHMENT, AND THIS UNIT READS IT — IT DOES NOT
   DECIDE IT.** `E3` evaluates `isResizable` **once per gesture at establishment** and short-circuits
   every terminal evaluation when it is falsy (`docs/specs/gutter.md` `§0A` note 6, `§3.1 M-8`). **The
   module's `resizable` field in `PreviewState` READS that same decision through its own `resizableOf`
   closure** — it is **not** a second evaluation, and **a row that finds `resizableOf` called twice for
   one gesture FAILS** (`§5.5.1 P-GU-IM-2`). **A non-resizable gesture STILL establishes, STILL shows the
   cursor, and STILL previews nothing**: the preview for it is `applyPreview({value: NaN ⇒ …})`-free by
   rule — the module **writes no preview at all when the decision is falsy**, because there is no size to
   show (`§3.1 M-13`).
5. **THE SIZE ARITHMETIC IS THE CALLER'S; THE MODULE'S OWN ARITHMETIC IS TWO OPERATIONS** (`§0A` note 4):
   the `typeof`/`isFinite` gate and the **call** to `E3`'s `clampToBounds`. **The module computes no
   delta, no ratio, no percentage, no scale and no distance**, and **no row of this unit may claim a
   magnitude** (`§3.4 R-3`). **A row asserting that this unit "computes the drag distance" is `§4.4 S-3`
   and does not land.**

---

### 2.5 The preview channel — **NEVER the sink**, and the exact revert rule

1. **THE RULE, in one sentence.** **The live drag feedback — *"dynamically show the resized state based on
   the current cursor position"* — is a TRANSIENT PRESENTATION channel this unit drives through the
   caller's `applyPreview` seam, it is written AT MOST ONCE PER OBSERVED MOVE, it is NEVER written at a
   committed terminal, and IT IS NEVER THE SINK.**
2. **`E3`'s rule is CARRIED, not restated** (`docs/specs/gutter.md` `§2.3` item 3's preview block and
   `§2.6` item `4b`): **the sink is written at most once per gesture and only at an `end`/`reset`
   terminal** — so **a preview write that reaches the sink is a VIOLATION, and this unit's write-count
   rows must be able to FAIL for it** (`§3.1 M-8`/`M-9`, `§5.5.1 P-GU-SM-1`). **This filing does NOT
   re-open that clause: it is quoted and it is what makes *"cancel ⇒ zero sink writes"* meaningful in the
   presence of live feedback.**
3. **THE EXACT INVOCATION RULE.** `applyPreview` is invoked **only** from the module's own observed-move
   turn, **only while an active gesture's record exists**, **at most once per observed move**, and **only
   when the move is VALID** for the value; on the **INVALID-reset**, **cancel**, **drop** and
   **refused-reset** paths it is
   invoked **exactly once with `{value: preDragSize, token, valid: false, resizable}`** (the revert); on
   the **`end`** path it is **NOT invoked**. **`stats().previews` counts the
   invocations, and `§2.3`'s terminal write table is the declared multiset.**
   **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`/`§R` `R8`(d)): the as-filed list named only
   the cancel, drop and refused-reset paths for the revert and left the INVALID-reset arm at `0` previews —
   which would FREEZE the visible state at the last valid preview while the graph commits the pre-drag size.
   RULED: the invalid arm REVERTS VISIBLY, so it carries the same single `{value: preDragSize, …}` write;
   the refused-reset arm carries it too (a refusal must not leave the screen showing a value that was never
   committed). `§2.3`'s terminal write table and `§3.1 M-13` carry the same figure.**
4. **THE PREVIEW'S CONCRETE FORM IS THE CALLER'S, AND THE WORKING DEFAULT IS A TRANSIENT INLINE-STYLE
   WRITE.** In this repo the caller applies it by writing a **`style` declaration on the live
   provident-rendered target element** — available because the envelope's authored `css.style` is
   serialized at translate (`serializeStyle`) and applied by the `DomAdapter` as an inline style, so a
   transient style write **does not create an element and does not author any provident data**.
   **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the *concrete form* is unchanged (a
   transient inline-style write on the live provident-rendered TARGET element, driven by the wiring), but
   the earlier reading that this is available *"to the caller"* while no caller existed in-tree is
   SUPERSEDED — the caller IS the renderer wiring (`§R.1`, `§5.1` row `10`), which resolves the target
   element from the producing graph and owns this one write. The write still creates no element, authors
   no provident data and is not a second rendering path (`§7` item 4).**
5. **THE NAMED HAZARD, RECORDED SO A LATER PASS DOES NOT "IMPROVE" INTO IT.** A preview implemented as a
   **graph dispatch** re-renders the graph, and **the re-render replaces the element under the pointer
   mid-gesture** — the listener the session installed is on the OLD element. **That is why the default is
   the transient write, and why a preview-by-dispatch requires its own gate** (`§7a.1` item 3, `§4.4
   S-8`).
   **⟶ BOUND TO THE COMMIT TOO 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-13`, condition
   `C-5`).** **THE AS-FILED CLAUSE BOUND THE HAZARD TO THE PREVIEW ONLY. THE COMMIT IS THE SAME HAZARD BY
   A DIFFERENT ROUTE, AND IT IS UNAVOIDABLE:** the wiring's `commit` seam is **ONE managed-channel write on
   the runtime** (`Runtime.applyCommand`'s `state-slice` shape, `§2.1` item 8(v)) — **and `applyCommand`
   RE-RENDERS (`§2.3` row 15).** **SO: the commit write MAY replace the affordance element, exactly as a
   preview-by-dispatch would; the wiring's commit is therefore permitted (it is the committed state, and it
   is how the graph becomes MCP-visible `U-5`) while a preview-by-dispatch is NOT (the preview needs no
   graph write at all).** **WHETHER THE COMMIT'S RE-RENDER PRESERVES THE AFFORDANCE ELEMENT'S IDENTITY IS
   ⟶ RULED 2026-09-27, THE `E-2` PASS: THE RUNTIME **REUSES** THE EMITTED ELEMENT (the architect's
   *"Reuse"*, `docs/pending.md` §I-duodecies) — a `state-slice` apply PATCHES the existing element in place,
   so **IDENTITY IS PRESERVED**; the affordance is **MULTI-SHOT**, the wiring performs **NO rebind** and the
   **SIXTH wiring role is NOT OWED** (`§2.1` item 8, `§2.3` row 15, `§7a.1` item 4).** **THE AS-FILED
   FORM IS KEPT VISIBLE AND IS SUPERSEDED: *"WHETHER THE COMMIT'S RE-RENDER PRESERVES THE AFFORDANCE
   ELEMENT'S IDENTITY IS NOT DECIDED HERE — THAT IS `E-2`, AN OPEN ARCHITECT CHOICE (`§7a.1` item 4)"*, with
   its consequence *"a SECOND gesture on the same affordance is not guaranteed"* — **THAT CONSEQUENCE IS
   WITHDRAWN by the ruling**.**
   **AND THE BOUNDARY THE REUSE DOES NOT COVER: the write must NOT structurally replace the affordance
   node** — reuse covers a PATCH, and a write that **ADDS, REMOVES or MOVES** the affordance's own node (or
   its authored card's structure) would still change the element, **which is exactly why THE SINK TARGETS
   THE AUTHORED STATUS/READOUT NODE, DELIBERATELY OUTSIDE THE AFFORDANCE'S NODE** (`§2.1` item 7(c)/(v),
   `§3.1 M-19`, `§5.U` `U-8`(e)). **The re-render hazard is therefore NAMED at both of its sites: preview
   (forbidden by default) and commit (permitted, and now ruled safe for ELEMENT IDENTITY while a structural
   write through the affordance's own node stays the wiring's to avoid).**
6. **WHAT THE PREVIEW IS *NOT*.** It is **not** a commit, **not** the authored state, **not** MCP-visible,
   **not** persistent, and **not** a claim about the layout: **the committed value is the graph's, and it
   is the graph's content that `get_rendered_html` / `get_markdown` read back** (`§2.1` item 7(c),
   `§3.5 R-9`). **A row that reads the preview as the committed state FAILS `§3.1 M-12`.**

---

### 2.6 The composition seam, the cursor and the capture decision

1. **THE COMPOSITION, in one picture, with the writer named.** **`E3` is the SINGLE SINK WRITER and this
   unit writes nothing to the sink** (`§0A` note 9). The three roles: **session = the lifecycle and the
   only listener** · **`E3` controller = the clamp, the one write and the reset entry point** · **this
   module = the source, the coordinate, the cursor, the preview, the capture opt-in and the drop-revert**.
   **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): THE AS-FILED ROLE LIST'S *"the
   capture opt-in"* IS STALE (the capture claim was WITHDRAWN by the gate-1 repair pass, `§R` `R5`, and is
   now an `E3`-SIDE owed item — this module installs NO capture opt-in: `§2.6` item 4, `§3.3 I-13`,
   `§3.2 F-14`). THE MODULE'S OWN ROLE LIST IS THEREFORE: the event source (the module's FOUR listeners,
   its own move turn included), the pointer read, the pre-drag size, the cursor, the preview writes, the
   invalid-release decision and the drop-revert — with the capture need named as `E3`'s, never delivered.** **⟶ RE-SWEPT AND CONFIRMED 2026-09-27, THE `E-2`/`E-3` PASS: THIS ROLE LIST IS THE LIVE ONE — the module owns NO capture opt-in (it passes no `capture` field anywhere, `§3.3 I-13`, `§3.2 F-14`) and it carries NO element-identity policy of its own, because element identity across the commit is the RUNTIME's behaviour and the WIRING's one write route, both ruled (`§2.1` item 8, `§2.5` item 5, `§2.3` row 15).** **A reader must not re-introduce either reading: *"this unit owns the capture decision"* and *"this unit holds an undecided element-identity policy"* are BOTH superseded.**
   **`§3.1 M-5` is the row: one sink call per gesture, and a second writer FAILS a row.**
2. **WHAT THIS UNIT MAY CALL ON THE SESSION, AND NOTHING ELSE — `E3`'s closed set, and this unit's own.**
   The module **calls the session NOWHERE itself**; it reaches the session **only through `E3`**, whose
   own closed set is `install` · `reset` · `dispose` · `stats` · `gesture` · `disposed`
   (`docs/pending.md` §I-sexies's `E3`-HOST-2 remedy (c); `docs/specs/gutter.md` `§2.5` item 1) — **and
   `E3`'s own parked defect is that its module probes two names that set does not contain
   (`registerCompositionWriter`/`registerCommit`).** **THIS UNIT'S ROW IS TWO-SIDED AND IS `§3.4 R-5`:**
   **(i)** `src/shared/gutter.ts` **must not contain** either invented token (a session double exposing
   them must not produce two sink calls for one gesture); **(ii)** **this module must not call, read or
   probe any session member at all**, and a **static census of this module's own session-member
   references is EMPTY**.
3. **THE CURSOR MAPPING — which cursor for which axis, and WHERE IT IS AUTHORED.** **The axis token is
   `E3`'s opaque token** (the caller's `axisOf(element)`, wired into both `E3`'s `axisFor` and the
   module's hover read — one closure, `§2.1` item 3). **The token→cursor mapping is the caller's
   `cursorOf(token)`** (`§0A` note 8) and its answer is **totally resolved** by the module's own
   `cursorDeclarationFor`: **an own `cursor` string property, trimmed, non-empty ⇒ that declaration;
   ANYTHING ELSE ⇒ `undefined` ⇒ NO WRITE.** **The write is the caller's `applyCursor(element,
   declaration)` — and `element` is THE HOVERED AFFORDANCE, never the target** (**⟶ RULED 2026-09-27, THE
   GATE-1 REPAIR PASS (`§R` `R8`(c)): the as-filed contract's call sites disagreed — `§2.3` rows 4/5 and
   `§3.1 M-11` named the affordance while this clause's companion text left the target possible; the cursor
   belongs to the element the pointer is OVER, so EVERY call site passes the affordance, and a row that
   finds the target passed FAILS `§3.1 M-11`**); **the clear is `applyCursor(element, undefined)`** and it happens **on hover exit and
   nowhere else**. **The HOVER EVALUATION BUDGET is a working default (`§7a.1` item 1): `axisOf` once per
   `'pointerover'`, `cursorOf` once per hover evaluation, `applyCursor` once per hover enter with a
   declaration and once per hover exit with `undefined` — and ZERO calls to `E3`'s controller on any hover
   path.** **The DEMO's mapping is caller code in `src/shared/demo-envelope.ts`'s authored card** — the
   module's bytes carry **no cursor literal** (`§2.2` P-4, `§3.4 R-7`).
   **⟶ SWEPT AND CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`, condition `C-9`).**
   **THE AS-FILED CLAUSE SAID THE DEMO'S MAPPING IS *"authored in `src/shared/demo-envelope.ts`'s authored
   card"* — WHICH CONFLATES TWO DIFFERENT THINGS: the CARD is provident envelope DATA (`§2.1` item 7, the
   authored nodes and handler body), while a caller seam is CALLER CODE that the wiring passes in. THE
   CORRECTED CLAUSE: this repo's demo supplies its `cursorOf`/`axisOf`/`sizeFromPointer`/`boundsOf`/
   `startSizeOf`/`resizableOf`/`commit`/`applyPreview`/`applyCursor`/`pointerOf`/`moveTypeOf`
   implementations **as the demo's ONE EXAMPLE IMPLEMENTATION, homed in the demo-side file
   `src/shared/demo-envelope.ts`** (`§5.1` allow-list row `2`, extended by ONE cell; `§R.3`), whose home is
   a demo-side file **because it is an implementation and NOT the contract** — **and the card's authored
   handler bodies remain DATA.** **A reader must not read the demo's example mapping as the contract, and a
   fork must not read it as normative: the contract is the module's exported seam types plus `§R.3`'s seam
   table.**
4. **THE CAPTURE DECISION, AND THE UI'S INSTALL PATH — ⟶ WITHDRAWN 2026-09-27, THE GATE-1 REPAIR PASS
   (`§R` `R5`): NO CAPTURE OPT-IN IS INSTALLED, AND THE NEED IS AN `E3`-SIDE OWED ITEM.**
   **THE AS-FILED CLAUSE SAID:** *"THIS unit owns the capture decision; `E3` never opts in … the options
   object handed to `controller.attach(element, hooks)` carries `capture: true` iff the caller's
   `capturePointer` is truthy … the source this unit supplies implements `capturePointer(element)` only
   when the element has that member."* **IT IS SUPERSEDED, and the reason is a FROZEN-SURFACE FACT, not a
   preference: `E3`'s `attach(element, hooks?)` accepts EXACTLY the four hooks (`onStart` · `onMove` ·
   `onEnd` · `onCancel`) and its sealed clause forbids the opt-in twice — so a `capture: true` field in a
   hooks object is INERT, and `E3` is FROZEN with its checks parked (`docs/specs/gutter.md` `§5.1`'s
   DENIED set). THE RULED BEHAVIOUR: `capturePointer` is DECLARED AND IGNORED; the module passes NO
   `capture` field anywhere; the module's own bytes contain NO capture call; and `releasePointerCapture`
   appears NOWHERE.** **THE OWED ITEM, NAMED RATHER THAN HIDDEN — `E3`-SIDE:** **a drag that must keep the
   pointer OUTSIDE the affordance's box needs the capture opt-in; delivering it requires EITHER `E3`'s
   `attach` to accept `capture` (an edit on a DENIED, frozen path, owned by an Implementer pass on `E3`)
   OR the WIRING to install the capability directly on the element (a scope question for a later gate, not
   for this unit).** **REVISIT CONDITION:** **the moment an `E3` pass lands the opt-in, or a gate admits
   direct installation by the wiring** — until then the item stays `OWED — E3-SIDE` and is reported to
   the supervisor, never fixed here (`§3b`, `§3.2 F-5`). **THE HONEST UX CONSEQUENCE, stated plainly: a
   drag that leaves the affordance's box loses its reading** — the session's tracking listeners are
   LOCAL to the element (`A-d3`), so the visible resize follows the pointer only while the pointer is over
   the affordance (or over the box the local listener still covers); the gesture still terminates at the
   session's own terminal, so the commit behaviour is unaffected, but the live feedback stops.
   **`§3.3 I-13` is the invariant, `§3.2 F-14` the row, and `§8` carries the owed item's tracker row.**
5. **THE RELEASE MAPPING, composed from `E3`'s own clause rather than restated**
   (`docs/specs/gutter.md` `§2.3` item 4's release-mapping block): **VALID ⇒ the session's `end`
   terminal ⇒ EXACTLY ONE commit of the CLAMPED DRAGGED VALUE — the value the module's own `onMove` turn
   pushed through `handle.set(...)` (`§R` `R6`) · INVALID ⇒ the session's `reset` terminal
   with the SUPPLIED DEFAULT, which for this behaviour is THE PRE-DRAG SIZE THE CONSUMER HOLDS ⇒ EXACTLY
   ONE commit of the CLAMPED SUPPLIED DEFAULT · RIGHT-CLICK / DROP ⇒ the session's `cancel` terminal ⇒
   ZERO COMMITS AND ZERO SINK WRITES, with the visible revert belonging to the CONSUMER's preview channel
   and NOT to the sink.** **`gesture.outcome` (`'end'` / `'reset'` / a cancel's no-commit) is how the
   distinction is read, and `controller.reset(element)` is the surface for the invalid-release and
   drop-revert paths.** **THIS UNIT ADDS EXACTLY ONE THING AND IT IS THE `§0A` note 6 TIMING CLAUSE: the
   invalid arm's `controller.reset(element)` is called from the DRAG while the gesture is still active,
   because after the session's own `pointerup` terminal there is no active handle to reset.**
   **⟶ AMENDED 2026-09-27 (`§R` `R7`): INVALID is a SEAM FAILURE (an unusable pair, an unusable default,
   a discarded record) and NOT an ordinary out-of-bounds value — an out-of-bounds but finite value is
   CLAMPED by `E3` and commits at the VALID `end` terminal. The invalid arm also carries the VISIBLE
   REVERT (`applyPreview` with the pre-drag size) and CLEARS the handle, so the later `pointerup` commits
   nothing further; the architect's release clause is observably satisfied by those two arms, and the
   divergence from "decide at the release instant" is stated with its rejected alternative at `§0A` note 6
   and `§7a.1` item 2.**
6. **THE DROP-REVERT, EXACTLY.** A **secondary-button press observed while `dragging`** makes the module
   **take the drop path**: it **does not call a session terminal**, it **writes the revert through
   `applyPreview({value: preDragSize, …})` exactly once**, and it **lets the session's own `cancel`
   terminal terminate the gesture** (which contributes **zero commits**). **The right-click's revert is
   therefore a PREVIEW write, never a sink write** — which is what makes it distinguishable from a reset
   in the rows (`§3.1 M-9`, `§3.2 F-3`).
7. **THE `E3`/`E4`/`E10` BOUNDARY, stated so no clause is routed here by mistake.** **This unit does not
   implement relocation** (`U-RELOCATE`, `E4` — a different unit), **does not implement the census**
   (`U-CENSUS`), **does not implement the projection** (`U-PROJ`), **and does not add a zone/pane
   vocabulary**. **A clause that pulls one of those in "for convenience" is `§4.4 S-9` and does not
   land.**

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg · **[D]** the divergence
harness (not claimed) · **`static`** = a rows-over-files claim. **Every row carries an id and a
`Pinned by` citation.** **The four PARKED `E3` OBLIGATIONS ARE THIS SECTION'S FIRST ROWS** (`M-1`..`M-5`);
**they are the reason this unit exists** (ruling 3).

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **THE CLOSED SESSION READ SET — this unit reads NO session member at all, and `E3`'s set is the six named members with NO invented seventh** — **⟶ STATUS RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(f)): `EXPECTED-RED` AGAINST THE LANDED `E3`, WITH ITS `OWED — E3-SIDE` OWNER.** **This row's static half (i) is green-able here; its half (ii) — *"`src/shared/gutter.ts` contains neither `registerCompositionWriter` nor `registerCommit` in any form"* — CANNOT BE MADE GREEN FROM THIS UNIT, because the landed `src/shared/gutter.ts` DOES contain the invented seam probe and that file is DENIED (`§5.1` item 0/2).** **A red here is the CORRECT red outcome and the evidence this unit exists for (`§3.2 F-5`); the DONE row must print `M-1: EXPECTED-RED — <measured call counts> — OWED — E3-SIDE (owner: supervisor + an Implementer pass on `src/shared/gutter.ts`)` and must NEVER print `green` for it** (`§5.3` item 4). **⟶ STATUS SHARPENED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-14`, condition `C-6`): ONLY THE **STATIC HALF (ii)** IS `EXPECTED-RED` / `OWED — E3-SIDE` (the invented seam lives in the DENIED `src/shared/gutter.ts`). **THIS ROW'S RUNTIME HALF — half (iii), the single-sink-call census with a session double exposing the two invented names — IS *NOT* EXPECTED-RED AND MUST BE REPORTED ON ITS OWN MEASURED OUTCOME**, because it asserts a property of THIS module and of the real composition, both of which are in this unit's scope. A DONE row that prints the whole row (including its runtime half) as `EXPECTED-RED`, or that excuses a genuine two-sink-call failure with the `E3`-side token, is a review finding.** **⟶ STATUS CHANGED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): `E3`-HOST-2 IS FIXED IN THE LANDED MODULE (`cc7fba5`) — the invented `registerCompositionWriter`/`registerCommit` probes and the whole `offerWriter` machinery are DELETED; the module reads only the closed set, and a session double that EXPOSES those names is READ NOT AT ALL (measured: the names appear nowhere in the module's bytes, and the probe record is EMPTY).** **THE AS-FILED `EXPECTED-RED`/`OWED — E3-SIDE` STATUSES ON BOTH HALVES ARE THEREFORE SPENT — half (ii) is green-able against the LANDED module and half (iii)'s runtime census must be reported as its OWN OUTCOME, as `R-14` already required — and a DONE row that prints `M-1: EXPECTED-RED — <call counts> — OWED — E3-SIDE` is a review finding (`§5.3` item 4).** **THE TWO HALVES ARE STILL REPORTED SEPARATELY; the fix lands the static half, it does not merge the halves.** | a static census over `src/shared/gutter-affordance.ts` and `src/shared/gutter.ts`; **plus** a runtime drive with a **session double that EXPOSES `registerCompositionWriter` and `registerCommit`** and records every member read | **(i)** this module's own source references **no** session member by name (`install`/`reset`/`dispose`/`stats`/`gesture`/`disposed` appear **zero** times in it — it reaches them only through `E3`); **(ii)** `src/shared/gutter.ts` contains **neither** `registerCompositionWriter` **nor** `registerCommit` in **any** form (raw, assembled, commented); **(iii)** the session double's exposure of those two names **changes nothing**: **ONE sink call for one gesture**, and the committed value is the **CLAMPED** one (a fallback committing the RAW default FAILS this row). **A session exposing either name and yielding TWO sink calls for one gesture FAILS.** *(This is `E3`-HOST-2's remedy row, driven from a real consumer.)* | **`docs/pending.md` §I-sexies `E3`-HOST-2 / §I-septies item 1**, `docs/specs/gutter.md` `§2.5` item 1, `§3.4 R-5` | `static` + `[T]` |
| **M-2** | **THE DISPOSED-SESSION SHORT-CIRCUIT** — **⟶ STATUS RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(f)): `EXPECTED-RED` AGAINST THE LANDED `E3`; `OWED — E3-SIDE`.** **The landed `E3`'s `detached` getter returns only the controller-local flag and `attach`/`detach` keep delegating to a disposed session (`docs/pending.md` §I-sexies `E3`-HOST-3), and `src/shared/gutter.ts` is DENIED — so this row cannot be made green from this unit.** **The DONE row prints `M-2: EXPECTED-RED — OWED — E3-SIDE`, never `green`** (`§5.3` item 4). **⟶ AND ⟶ MARKED `UNSATISFIABLE FROM THIS UNIT` 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-14`, condition `C-6`): THE `E3`-SIDE HALF OF THIS ROW CANNOT BE SATISFIED FROM HERE, AND MUST NOT BE REPORTED AS MERELY `EXPECTED-RED`.** **THE REASON, STATED PLAINLY: the as-filed drive requires the module to *honour* `session.disposed === true` — a READ of the session's `disposed` member — WHILE `M-1` FORBIDS THIS MODULE FROM REFERENCING ANY SESSION MEMBER BY NAME, `disposed` INCLUDED. The two rows as filed are CONTRADICTORY, so a red here is not a defect the module could fix.** **THE ROW IS RESTATED TO ITS MODULE-OBSERVABLE FORM: over a DISPOSED-session double the module's own half is `attach()` ⇒ `false`, `detach()` ⇒ `false`, `stats()` readable, NO throw at any boundary, and ZERO session calls of its own — all of which ARE assertable here — while the `E3`-SIDE half (`detached` reflecting the session's own disposal and `attach`/`detach` short-circuiting before delegation) stays `OWED — E3-SIDE` because its remedy is in the DENIED `src/shared/gutter.ts`.** **A DONE row that prints this row as `EXPECTED-RED` without `UNSATISFIABLE FROM THIS UNIT — E3-SIDE` for its second half is a review finding.** **⟶ STATUS CHANGED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): THE `E3`-SIDE HALF IS NO LONGER OWED — `E3`-HOST-3 IS FIXED IN THE LANDED MODULE (`cc7fba5`): `detached` now reads `ended || session.disposed === true`, and `attach`/`detach` (= `reset`) SHORT-CIRCUIT AT ZERO SESSION CALLS on a disposed session. THE AS-FILED `EXPECTED-RED`/`OWED — E3-SIDE`/`UNSATISFIABLE FROM THIS UNIT` STATUSES ARE THEREFORE SPENT: BOTH HALVES ARE ASSERTABLE AND THE ROW GOES **GREEN** AGAINST THE LANDED MODULE.** **THE `UNSATISFIABLE` TOKEN IS *NOT* WITHDRAWN AS A CLASS** — it stays defined at `§3b` and remains the right token for any row half whose remedy is still in a DENIED path — **but it does not describe this row's half any more, and a DONE row that prints `M-2: EXPECTED-RED — OWED — E3-SIDE` is now a review finding (`§5.3` item 4).** | build the affordance over a **disposed** session (or dispose it, then call every member) | **`attach()` ⇒ `false` with ZERO session calls**; **`detach()` ⇒ `false` with ZERO session calls**; **`detached` reads `true`**; `stats()` readable with zeroed gesture counters; **NO throw at any boundary** — the module honours `session.disposed === true` rather than delegating to a dead session. *(This is `E3`-HOST-3's remedy row: `detached` must reflect the session's own disposal.)* | **`docs/pending.md` §I-sexies `E3`-HOST-3**, `docs/specs/gsession.md` `§2.3` item 7 (permanently inert), `§3.4 R-5` | `[T]` |
| **M-3** | **THE THROWING-HOOK DISCARD — a consumer hook that THROWS leaves NO retained record, and a later reset makes ZERO session calls** — **⟶ STATUS RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(f)): `EXPECTED-RED` AGAINST THE LANDED `E3`; `OWED — E3-SIDE`.** **The landed `E3` clears its record AFTER the consumer hook and without `try/finally` (`docs/pending.md` §I-sexies `E3`-HOST-1), so the measured behaviour is ONE `session.reset` with the dead handle; that file is DENIED.** **The DONE row prints `M-3: EXPECTED-RED — <measured session-call count> — OWED — E3-SIDE`, never `green`** (`§5.3` item 4). **This unit's OWN record clearing stays in its `finally` (`§0A` note 5) — that half is this unit's and is asserted separately.** **⟶ STATUS CHANGED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): `E3`-HOST-1 IS FIXED IN THE LANDED MODULE (`cc7fba5`) — THE TERMINAL BOOKKEEPING IS NOW UNCONDITIONAL: the record is cleared in a `finally`, it is never restored, and the single write moved inside it — so a throwing consumer hook leaves NO retained record and the later `reset(element)` refuses with ZERO session calls. The as-filed `EXPECTED-RED — <measured session-call count> — OWED — E3-SIDE` print is SPENT: the row goes **GREEN** against the landed module, and a DONE row that still prints that token is a review finding (`§5.3` item 4). THE MEASURED COUNTS OF THE AS-FILED RUN REMAIN THE RECORD OF WHAT THE DEFECT WAS (one `session.reset` with the DEAD handle, on BOTH the throwing and the non-throwing arms), and the DONE row prints the FIXED reading beside them.** | `attach()`; establish; make the **caller's `applyPreview` THROW** on one observed move; catch the propagated throw; then call the module's own reset entry point / drive a `reset` on the dropped handle | the throw **PROPAGATES** (it is consumer code) **and the per-gesture record is ALREADY DISCARDED in the module's `finally`**; a subsequent `reset(element)` for that gesture **refuses with ZERO session calls** (`'no-gesture'`-class), **and the module's own `resets` counter did not increment**. **A retained record is the `E3`-HOST-1 defect and FAILS this row.** *(This is `E3`-HOST-1's remedy row, driven by this unit's own consumer hook.)* | **`docs/pending.md` §I-sexies `E3`-HOST-1 / §I-septies item 1**, `§0A` note 5, `docs/specs/gutter.md` `§2.5` item 6 | `[T]` |
| **M-4** | **`attach()` installs FOUR listeners of this module's own through the source, and the session owns a FIFTH** — **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R4`): the as-filed title read *"THREE listeners … and the session owns the FOURTH"*, which is SUPERSEDED by the move-listener ruling (the module needs its own `'pointermove'` reading source, `§2.3` row 8).** | a recording source double; `attach()` | **exactly FOUR `source.on` calls for this module's own listeners** — the hover enter, the hover exit, the context-button read **and the module's own move listener** — each carrying **the affordance element by identity**, **plus the session's own single `'pointerdown'` attach** made through the same source by `E3`'s `attach`: **so the source's log shows FIVE `on` calls in the composed attach, FOUR of them this module's and ONE the session's**; **the module's four carry NO `document` and no element other than the affordance** (and **the `detach` companion is FOUR `source.off` calls for the module's own, `M-15`**); `attach()` returns `true`; **no capture call at all** (`§R` `R5`). **A row asserting "three" FAILS this row's own text; a row that cannot say which listener set it counts FAILS `§4.4 S-2`.** **⟶ LAYER QUALIFIED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): THE COUNT AND THE ORDERING ARE READ FROM THE SOURCE-CALL LOG — the recording source double's own ordered log of `on`/`off` calls — and NEVER FROM A REAL-DOM PREMISE.** **The as-filed drive was already a `[T]` source double, and this note makes the limit explicit: the composed attach's `FIVE` figures are a claim about the SEAM's call sequence, NOT about which listener a browser fires first; a row that asserts a real DOM's dispatch order FAILS `§4.4 S-7` and belongs to the `[U]` set by name (`§3.2 F-13`).** | `§2.3` row 2, `§2.2` P-2/P-10, `docs/specs/gsession.md` `§2.3` item 1(a) | `[T]` |
| **M-5** | **THE SINGLE WRITER, ON THE REAL COMPOSITION — exactly ONE sink call per gesture** — **⟶ RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(e)): THE TWO-WRITER FALSIFIER IS REPLACED BY A LIVE-COMPOSITION CHECK.** **The as-filed drive required a *"two-writer composition (a harness-registered forwarding channel in addition to the composition's writer)"* — a shape drivable ONLY by a double implementing the invented `registerCompositionWriter`/`registerCommit` member that `E3`-HOST-2's fix REMOVES, so the falsifier depended on the very defect it existed to expose.** **IT IS SUPERSEDED:** the row now drives **the REAL session and the composition the wiring builds** — `createGestureSession({source, commit})` wired exactly as `src/renderer/renderer.ts` wires it (`§R.1`), with a **recording source double in place of the DOM-backed source** — and asserts that **the sink's own record and `E3`'s `stats().sinkCalls` AGREE, exactly, cell by cell, for every terminal path** — **what carries the term is a genuine two-reading comparison plus the module's own zero-call census, not a synthetic second writer.** | `attach()`; a full observed lifecycle over **the REAL session and the composition the wiring builds** (hover ⇒ primary `pointerdown` ⇒ moves ⇒ `pointerup`), then the invalid `reset`, the refused `reset`, the `cancel` and the drop paths | **single writer (the whole row):** for EVERY path, **the sink's own call record reads the declared count and the `E3` controller's `stats().sinkCalls` reads THE SAME count** — `1` for a valid `end`, `1` for an invalid `reset` (carrying the clamped pre-drag size), `0` for a refused reset, `0` for a `cancel`, `0` for the drop — **and the module's own sink-call count is `0` in every cell** (the module passes `commit` to `E3` only). **A divergence between the two readings is the FALSIFIER and FAILS the row; a second writer added anywhere fails it too, but nothing in the row's drive DEPENDS on such a double existing.** **The exact multiset of sink calls is asserted, never "at least one".** | **`docs/specs/gutter.md` `§2.3` item 3, its `F-9`/`F-10`, `§5.5.1 P-GT-SM-3`**, `§5.5.1 P-GU-SM-1`, `§0A` note 9 | `[T]` |
| **M-6** | **The factory is TOTAL, and it builds the CONTROLLER exactly once (the session is the WIRING's, `§R` `R1`)** — **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the as-filed title read *"it builds the session and the controller exactly once"*, which is SUPERSEDED — `createGestureSession` is the renderer wiring's call (`§R.1`, `§2.1` clause 4) and a call to it inside the module's bytes FAILS `§3.4 R-4`.** | `createGutterAffordance()` with **no argument**; with `undefined`; with `42`; with `'x'`; with a `Proxy` whose traps throw; with a record whose accessors throw; with a full valid options object (session included) | **NEVER throws**; every case returns an object whose **five members are present and callable**; for the valid case the **controller factory was called exactly once and `createGestureSession` ZERO times** (the session arrives as `options.session`), and **no listener was attached** before `attach()` | `§2.1` items 3/4, `§3.2 F-6`, `§5.5.1 P-GU-TP-1`, `§R` `R1` | `[T]` |
| **M-7** | **`attach()` delegates once; a repeat attach delegates NOTHING** | `attach()` then `attach()` again | first ⇒ `true`; second ⇒ **`false`** with **ZERO further `source.on` calls and ZERO session calls**; **the first configuration stays in force** | `§2.3` row 3 | `[T]` |
| **M-8** | **A VALID drag commits the CLAMPED value EXACTLY ONCE, through `E3`, and writes NO preview at the terminal** — **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R6`): THE VALUE CHANNEL IS NAMED.** **The as-filed row drove the move "whose `sizeFromPointer`/`boundsOf` yield a value outside the pair" and then expected the sink to receive it — but said NOTHING about how the value reaches `E3`'s terminal, and the spec supplied no `sizeFor`, so NO valid drag could commit (the gate-1 review's value-channel must-fix). IT IS SUPERSEDED:** the module's own `onMove` hook **calls `handle.set(clampedValue)`** — the session's documented consumer-side channel — and **`E3`'s `sizeFor: (element, gesture) => gesture.value` reads it back at the terminal, clamping it.** **The row now asserts the handle's value EXPLICITLY: `gesture.value === the clamped value` before the release, and the sink receiving THAT value.** | hover; primary `pointerdown` (the session establishes); one observed move whose `sizeFromPointer`/`boundsOf` yield a value **outside** the pair; then the session's own `pointerup` | `stats().moves === 1`; `stats().previews === 1` (the mid-drag observation); **the move's own turn called `handle.set` with the CLAMPED value, and `gesture.value` reads that value before the release** (`§R` `R6`); **`applyPreview` was NOT invoked again at the terminal**; **the sink received the CLAMPED value exactly once** (`E3`'s writer); `controller.stats().sinkCalls === 1`; `controller.stats().written === 1` | `§2.3` items 8/11, `§2.5` item 3, `§R` `R6`, `docs/specs/gutter.md` `§2.3` item 3 | `[T]` |
| **M-9** | **A RIGHT-CLICK DROP commits NOTHING and reverts through the PREVIEW** | establish; one observed move; then a **secondary-button press** observed during the drag | the sink's own call record reads **`0`**; `controller.stats().sinkCalls === 0`; **`applyPreview` was invoked exactly ONCE MORE with `value === the pre-drag size` and `valid === false`** (the revert); `stats().drops === 1`; the session's terminal result reads `committed: false`; **the module called NO session terminal and NO `controller.reset`** (`stats().resets === 0`) | `§2.3` item 10, `§2.5` item 3, `§2.6` item 6 | `[T]` |
| **M-10** | **The HOVER path writes the cursor ONCE with the resolved declaration and makes ZERO session/controller calls** | `attach()`; the source's `'pointerover'` handler fires | **`axisOf` was called exactly once**, **`cursorOf` exactly once**, **`applyCursor` exactly once with the resolved declaration**; `stats().cursorWrites === 1`; `stats().lastCursor` equals the declaration; **ZERO session calls and ZERO controller calls** (`E3`'s `axisFor` is **not** consulted on this path — the hover read is the module's own, `§7a.1` item 1) | `§2.6` item 3, `§2.3` row 4 | `[T]` |
| **M-11** | **The hover EXIT clears the cursor, and a no-declaration hover writes NOTHING** — **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(c)): THE CURSOR TARGET IS THE AFFORDANCE.** **The as-filed row passed `target` to `applyCursor` while `§2.6` item 3 and `§2.3` row 4 passed the hovered element — three call sites, two answers (the gate-1 review's cursor-target must-fix). THE RULING: `applyCursor(affordanceElement, declaration)` — the cursor is a property of the element the pointer is OVER, never of the element being resized.** | `'pointerover'` then `'pointerout'`; then a second pair whose `cursorOf` answers `{}` | first pair: **one `applyCursor(affordanceElement, declaration)` then one `applyCursor(affordanceElement, undefined)`**; second pair: **`applyCursor` is called with `undefined` for the clear, while the ENTER wrote nothing** (`stats().cursorWrites` did **not** increase); **ZERO session/controller calls in all four turns**; **every call site in this contract passes the AFFORDANCE, asserted by identity against the `element` option** | `§2.6` item 3, `§2.3` rows 4/5, `§5.5.1 P-GU-TP-2` | `[T]` |
| **M-12** | **The VALUE is derived from the pointer, and the derivation is the declared chain** — **⟶ CLARIFIED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R6`/`R8`(b)): the row is driven TWICE — once with the module's own resolver, once with a caller-supplied `pointerOf` — and both drives must produce the SAME reading; the row also asserts the `handle.set(...)` write and the `sizeFor` read-back of `§R` `R6`.** | establish with a known pre-drag size; one observed move carrying a **plain event double** with `clientX`/`clientY`; `sizeFromPointer` and `boundsOf` recording their arguments; **a second drive with `pointerOf` supplied** | the resolver's reading (the module's own `resolveEventPointer`, or the caller's `pointerOf` when supplied) reached `sizeFromPointer` as **a frozen `{x, y}` carrying no event reference**; `sizeFromPointer` was called **exactly once, with `(pointer, preDragSize)`**; `clampToBounds`'s answer (`E3`'s exported function) is **the value the sink committed** at the terminal; **the module's own `onMove` turn called `handle.set(clampedValue)` exactly once** and **`gesture.value` read it back before the release**; `applyPreview` received **that same clamped value**; **`stats().moves === 1` per drive** | `§2.4` items 1/2, `§R` `R6`, `docs/specs/gutter.md` `§2.1` item 1 | `[T]` |
| **M-13** | **AN INVALID DRAG RESETS TO THE PRE-DRAG SIZE, and the reset is called from the DRAG while the gesture is active** — **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`): THE VISIBLE STATE REVERTS, AND THE `pointerup` THAT FOLLOWS COMMITS NOTHING.** | establish; then one observed move whose **SEAM FAILURE** establishes invalidity (an **unusable bounds pair** ⇒ a non-finite clamp answer; or an **unusable default**; or a **discarded record** — `§R` `R7`; an ordinary OUT-OF-BOUNDS value is NOT this row, because `E3` simply CLAMPS it); while the gesture is still active | **`controller.reset(element)` was called exactly once** (`stats().resets === 1`); it was called **during the drag turn** (the session's gesture was still active at the call — asserted on the session double's own call log); the committed value is the **CLAMPED PRE-DRAG SIZE**; **`applyPreview` was invoked EXACTLY ONCE with `{value: preDragSize, valid: false, …}` (the VISIBLE REVERT — the invalid state does NOT freeze at the last valid preview)**; **the later `pointerup` commits NOTHING** (the handle was cleared); **`applyPreview` did NOT receive the `NaN`**; the sink received **exactly one** value | `§2.3` item 9, `§0A` note 6, `§2.5` item 3, `§R` `R7`, `docs/specs/gutter.md` `§2.3` item 4 | `[T]` |
| **M-14** | **A secondary-button `pointerdown` with NO active gesture is INERT** | `attach()`; no gesture; the module's own `'pointerdown'` handler fires with `button === 2` | **ZERO session calls, ZERO controller calls, ZERO preview writes, ZERO cursor writes**; the module does not `preventDefault`, does not swallow and does not begin anything; a later primary `pointerdown` establishes normally | `§2.3` row 6, `§2.2` P-3 | `[T]` |
| **M-15** | **`detach()` removes the module's OWN listeners and then delegates once** — **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R4`): the count is FOUR, not three** (the module's listener set gained its own MOVE listener, `§2.3` row 2) | `attach()`; `detach()`; `detach()` again | first call: **exactly FOUR `source.off` calls** (the module's own four, each matching its `on` by the same three values) **before** the controller's own delegation; `detach()` returns `true`; **`detached` reads `true`**; second call: **`false` with ZERO source calls and ZERO session calls**; **the session's own baseline arithmetic is the session's row, not re-asserted here** | `§2.3` row 13, `docs/specs/gsession.md` `§2.3` item 7 | `[T]` |
| **M-16** | **A non-resizable gesture still establishes, still shows the cursor, and previews NOTHING** | `resizableOf` answering a falsy value; hover; primary `pointerdown`; an observed move; `pointerup` | the gesture **ESTABLISHES and TERMINATES NORMALLY** (its outcome is **not** `'cancel'`); **`applyPreview` is invoked ZERO times**; the sink's record reads **`0`**; **the hover cursor was still written** | `§2.4` item 4, `docs/specs/gutter.md` `§0A` note 6, `§3.1 M-8` | `[T]` |
| **M-17** | **The counters are this module's own and reconcile with the instruments** | after `M-8`, `M-13`, `M-9` | `stats()` reports the declared figures for `moves`/`previews`/`cursorWrites`/`cursorClears`/`resets`/`drops`/`lastCursor`, **each reconciled against the recording source's log, the sink's own record and `controller.stats()`** | `§2.1` item 5, `§2.3`'s write table | `[T]` |

| **M-18** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`/`R-12`, conditions `C-3`/`C-4`): THE MOVE LISTENER'S TYPE IS THE SESSION'S OWN, AND THE LISTENER SETS HAVE ONE OWNER EACH.** *(The id `M-18` is free: the as-filed table ran `M-1`..`M-17`.)* | **(a)** `attach()` over a recording source double, with `moveTypeOf` answered **`POINTER_TYPES.move`** (imported from `src/shared/gesture-session.ts` by the TEST as well as the module); **(b)** the same drive with `moveTypeOf` answered by a DIFFERENT non-empty string; **(c)** a drive that observes a full lifecycle and then `detach()` | **(a) the registered type is `=== POINTER_TYPES.move`** — asserted by identity against the session module's own exported constant, **NOT by counting `source.on` calls**; **a row that asserts only *"one move listener was attached"* FAILS this row's own text** (`§4.4 S-2`); **(b)** with a mismatched token the module still registers ONE listener **of that wrong type** and **the session's own tracking listener still receives the real moves** — the observable difference the row exists to make visible; **(c)** the source log contains **exactly FOUR** `on` calls attributable to the module **and exactly FOUR** matching `off` calls at `detach()`, each with the SAME three values, and **ZERO `off` calls for a type the module did not install** (`I-15`). **The session's own install/tracking set is the SESSION's and is asserted only through `E3`'s own counts.** | `§2.1` item 9, `§2.3` rows 2/6c, `§3.4 R-14`, `§3.3 I-15`, `docs/specs/gsession.md` `§2.3` item 1(a) | `[T]` |
| **M-19** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-13`, condition `C-5`): THE COMMIT SINK'S WRITE ROUTE IS THE RUNTIME'S MANAGED CHANNEL — ONCE, WITH THE CLAMPED VALUE.** | a valid drag to its `end` terminal over the REAL session and the composition the wiring builds, with the **wiring's own `commit` seam** in place (a recording double standing in for `Runtime.applyCommand`), then the invalid-`reset` drive | **the sink seam is invoked exactly ONCE per committed terminal (`M-8`/`M-13`'s counts, unchanged) and it issues EXACTLY ONE managed-channel write — `{ kind: 'state-slice', node: <the authored status node>, mutation: [{ targetProp: 'content', mode: 'replace', value: <the clamped value as a string> }] }`** — **NOT a preview write (`applyPreview`'s count is unaffected), NOT a `styles`/`style` write, and NOT an authored handler-body dispatch**; **the write carries the CLAMPED value, and after it the wiring performs NO rebind and NO re-resolution of the affordance element** (`E-2` is open: `§2.3` row 15, `§7a.1` item 4) — **a wiring that rebinds FAILS this row until `E-2` is ruled.** **⟶ AND `E-2` IS RULED 2026-09-27 (the architect's *"Reuse"*, `docs/pending.md` §I-duodecies), SO THIS ROW ASSERTS THE DISTINCTION RATHER THAN A BARE IDENTITY CLAIM: the write's own payload names the AUTHORED STATUS/READOUT NODE as its `node`, and that node is NOT the affordance's node and NOT a structural change to the affordance's authored card — and a write whose `node` resolves to the affordance's own node, or a `mutation` that ADDS/REMOVES/MOVES it, FAILS this row** (`§2.1` item 8, `§2.5` item 5, `§7a.1` item 4). **The reuse itself is evidenced LIVE at `§5.U` `U-8`(e) (same element object + a committed second gesture), because a `[T]` row over a recording double cannot assert a real render's identity.** | `§2.1` item 8(v), `§2.3` row 15, `§2.5` item 5, `§5.U` `U-5`/`U-8`(e), `§R.2` `R-13`, `docs/pending.md` §I-duodecies | `[T]` + `[H]` |
| **M-20** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.3`): EVERY SEAM'S DEGRADATION IS A DECLARED SAFE DEFAULT, NEVER A SILENT NO-OP AND NEVER A THROW — the row class a fork's miswiring must be visible through.** | for **EACH of the eleven seams in turn**, three drives: **(1)** the seam ABSENT; **(2)** the seam NON-CALLABLE (`42`, `'x'`, `{}`, a `Proxy` whose traps throw); **(3)** the seam THROWING. Driven with the real session and the real `E3` controller; the `[T]` source double; `POINTER_TYPES.move` supplied. | **each drive reaches the DECLARED degradation of `§R.3`'s seam table — named, not "handled":** absent/non-callable/`throwing` `sizeFromPointer` ⇒ `clampToBounds` answers `NaN` ⇒ **the move is INVALID ⇒ the `reset` arm (`stats().resets === 1`), never a stale preview and never a throw**; the same for an unusable `boundsOf` pair; a throwing/absent `startSizeOf` ⇒ **the reset is REFUSED (`'unusable-default'`) with ZERO sink writes**; a falsy/absent `resizableOf` ⇒ **ZERO commits and ZERO previews, the gesture still terminating normally**; a throwing `cursorOf`-answer-shaped value ⇒ **`cursorDeclarationFor` answers `undefined` ⇒ NO cursor write**; a non-string/absent/empty `moveTypeOf` ⇒ **NO move listener attached** (and the session's `onMove` wrapper is the only move turn); a **throwing `applyPreview`/`applyCursor`/`commit` PROPAGATES** (consumer code — `F-8`), with the per-gesture record discarded in the module's `finally`; a **throwing `pointerOf` is absorbed by the module's own total gate ⇒ `null` ⇒ the move is INVALID (`F-1`)**. **A drive where an absent or non-callable seam produces a SUCCESS-looking state FAILS this row; a drive where any seam's throw escapes a turn that must stay total FAILS `I-7`/`F-1`/`F-6`.** | `§R.3` (the seam table + its degradation rows), `§3.2 F-1`/`F-6`/`F-8`, `§3.3 I-7`, `docs/specs/gutter.md` `§2.4` | `[T]` |

### 3.2 Documented fail-states / non-happy states

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **An UNRESOLVABLE pointer on a move** | one observed move whose event is `null`, `42`, a `Proxy` whose traps throw, or an object with a non-finite `clientX` | `resolveEventPointer` answers `null`; **the move is INVALID and `applyPreview` is NOT invoked for it**; `stats().moves` **did** increment; the gesture stays active; **nothing is committed by this turn** | `§2.4` item 1, `§2.3` item 5 | `[T]` |
| **F-2** | **A THROWING `sizeFromPointer`** **⟶ RULED 2026-09-27, THE RED-RUN REPAIR PASS (gate 3, first half) — THIS ROW'S AS-FILED READING (`PROPAGATES`) IS SUPERSEDED BY THE SEAM TABLE; the as-filed cell is kept visible below/above as the DRIFT SITE.** **THE GOVERNING CLAUSES, THREE AGAINST ONE: (i) `§2.4`'s seam table's own *throwing-seam* row — *"the throw PROPAGATES for the THREE `void` PRESENTATION/SINK SEAMS … and is ABSORBED by the module's own total gate for the four VALUE-READING SEAMS"* (`pointerOf`, `sizeFromPointer`, `axisOf`, `boundsOf`, `startSizeOf`, `resizableOf`); (ii) `§R.3`'s degradation table (the same sentence); (iii) `§3.1 M-20`'s class 3 (a throwing `sizeFromPointer` ⇒ *"the clamp answers `NaN` ⇒ the `reset` arm"*, `thrown === null`).** **THE AS-FILED READING below cites `docs/specs/gutter.md` `§2.4` item 2 row 4 — `E3`'s behaviour for a consumer seam AT A TERMINAL — while `sizeFromPointer` is read DURING A MOVE, and this module's own turn must stay total for the VALUE-READING seams (`§2.4`'s table, `§3.3 I-7`, `M-20`'s own title: *"NEVER … A THROW"*).** **THE RULED READING, which the red set's row is remanded to: the throw is ABSORBED by the module's own total gate ⇒ the move is INVALID ⇒ the `reset` arm (`stats().resets === 1`) with NO preview write, NO sink write, **and NO throw out of the turn**; the record is discarded in the `finally`; a later drive finds no active gesture of this module's and makes ZERO session calls.** **WHY THIS IS A REPAIR AND NOT A FORK: three normative sites rule ABSORBED and one downstream `§3.2` cell ruled PROPAGATES, so the conflict is a drifted row rather than an open design question — and it is recorded here (plus in the appended `⟶ RECORDED` block and `docs/decisions.md`) so the architect can reverse it at close-out rather than discover it silently. NO row id, term, seed, strategy id, section number or `§5.U` row moves.** | `sizeFromPointer` throws on one observed move | **the throw PROPAGATES to the caller of the module's listener turn** (`E3`'s named behaviour for a consumer seam at a terminal, `docs/specs/gutter.md` `§2.4` item 2 row 4); **the record is discarded in the `finally`**; **NO preview write and NO sink write for that turn**; a later drive finds **no active gesture of this module's** and the module makes **ZERO session calls** for it | `§0A` note 5, `docs/specs/gutter.md` `§2.4` item 2, `§3.1 M-3` | `[T]` |
| **F-3** | **A `dispose()` (or a `pointercancel`) MID-GESTURE** | establish; observed move; then the session's `cancel` terminal via `pointercancel`, and separately via a mid-gesture `dispose()` | the module's `onCancel` runs **exactly once**: **`applyPreview` invoked exactly once with the pre-drag size**; **the sink's record reads `0`**; `stats().drops` **did not increment** (this is the cancel path, not the drop path); the record is discarded | `§2.3` item 12, `§2.5` item 3 | `[T]` |
| **F-4** | **A reset for a gesture whose record is GONE** | drive a `reset` after a terminal (`M-3`'s shape, without the throw) | the call **refuses with ZERO session calls** (the `E3` entry point's own refusal) and **the module's own `resets` counter does not move**; **no half-termination of anything** | `§3.1 M-3`, `docs/specs/gutter.md` `§2.5` item 5 clause 3 | `[T]` |
| **F-5** | **THE `E3` PARKED DEFECT, REPORTED RATHER THAN FIXED HERE — the row that FAILS on the current `E3` module is EVIDENCE, not a defect of this unit** — **⟶ STATUS RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(f)): `M-1`/`M-2`/`M-3` ARE `EXPECTED-RED AGAINST THE LANDED `E3``, and the DONE row must print them that way.** | drive `M-1`/`M-2`/`M-3` against the **landed** `src/shared/gutter.ts` | **the rows are EXPECTED TO FAIL on the landed `E3` and that failure is the CORRECT outcome** (the invented seam is present, `detached` ignores `disposed`, the record survives a throwing hook — `docs/pending.md` §I-sexies `E3`-HOST-1/2/3); **the finding is a HOST finding against `E3`** and **must be reported to the supervisor** with the failing row id and the measured call counts; **this unit may NOT edit `E3`'s module or its test file** (`§5.1`'s DENIED set); **a pass that "fixes" it there fails this row**; and **the DONE row must print, per row, `EXPECTED-RED — <measured call counts> — OWED — E3-SIDE (owner named)` — NEVER `green`** (`§5.3` item 4). **⟶ SUPERSEDED IN PART 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): THE THREE HOST DEFECTS THIS ROW EXISTS TO EXPOSE ARE FIXED IN THE LANDED MODULE (`cc7fba5` — `E3`-HOST-1's unconditional `finally` bookkeeping, `E3`-HOST-2's DELETED invented seam, `E3`-HOST-3's `disposed` short-circuit).** **THE AS-FILED *"EXPECTED TO FAIL on the landed `E3`"* READING IS THEREFORE SPENT FOR THE THREE ROWS: `M-1`/`M-2`/`M-3` now go GREEN against the landed module, and the DONE row prints their GREEN readings with the as-filed measured counts BESIDE them as the record of the defect that was fixed.** **WHAT STANDS UNCHANGED: the finding was a HOST finding against `E3`, it is reported to the supervisor with the failing row id and the measured call counts, **this unit may NOT edit `E3`'s module or its test file** (`§5.1`'s DENIED set) — and the fix that landed was an Implementer pass on that DENIED path, exactly as this row required, never a fix from here. A DONE row that still prints `EXPECTED-RED — OWED — E3-SIDE` for `M-1`/`M-2`/`M-3` is a review finding (`§5.3` item 4), and so is a pass that reads THIS row as evidence the defects are open.** | **`docs/pending.md` §I-sexies's `E3`-HOST-1/2/3 dispositions and `cc7fba5`**, **`docs/pending.md` §I-septies items 1/3**, `§0A` note 12, `§5.1` | `[T]` + the DONE row |
| **F-6** | **A HOSTILE or unusable options object** | `createGutterAffordance(undefined)`, `(42)`, `('x')`, a `Proxy` whose traps throw, a record with throwing accessors, `{session: undefined}` | **construction NEVER throws**; every member of the result is present and callable; `attach()` ⇒ `false` **with ZERO session calls** (the `E3` declared degradation, a VALID but INERT controller); `detach()` ⇒ `false`; `stats()` is readable and zeroed | `§2.1` item 5, `§3.1 M-6`, `docs/specs/gutter.md` `§0A` note 9 | `[T]` |
| **F-7** | **A secondary-button press on an UNSETTLED gesture** | the module's `'pointerdown'` handler fires with `button === 2` in the window between the primary press and the session's establishment | **NOTHING is dropped on a gesture that does not exist**: no session call, no preview write, no counter move beyond the observed-turn counters; **the subsequent establishment proceeds normally** | `§2.3` items 6/14 | `[T]` |
| **F-8** | **A THROWING `applyCursor`, `applyPreview` or `isDragValid`** | each of the three throws in turn | **the throw PROPAGATES** (consumer code) and **the module's own state stays consistent**: the record is discarded in the `finally` (`applyPreview`'s case), the counters that were incremented before the throw stay incremented, and **no second invocation of anything happens for that turn**; **no session call of the module's own is made in any of the three cases** | `§0A` note 5, `§3.1 M-3` | `[T]` |
| **F-9** | **`isDragValid` answering anything that is NOT exactly `false`** | `isDragValid` driven as `() => true`, `() => undefined`, `() => 0`, `() => ''`, `() => 1`, an absent seam, a non-callable value, and a throwing one | **none of them vetoes the drag**: a finite clamped value with a non-`false` veto is **VALID** and commits at the `end` terminal; **ONLY an exact `false` marks the drag INVALID** | `§2.3` item 5, `§2.1` item 3 | `[T]` |
| **F-10** | **A non-finite clamp answer of ANY origin** — **⟶ CLARIFIED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`): this IS the invalid arm, and an OUT-OF-BOUNDS BUT FINITE value is NOT it (`E3` clamps that and the drag stays valid, `§3.1 M-8`).** | `sizeFromPointer` answering `NaN`, `Infinity`, `-Infinity`, `'12'`, `null`, `true`, an object, or the bounds pair being unusable | **the drag state is INVALID in every case** (the clamp's answer is not finite); the invalid arm is taken **once** (`stats().resets === 1`); **no preview of a non-finite value is ever written**; **EXACTLY ONE preview write carries the pre-drag size (the visible revert, `§R` `R7`/`R8`(d))**; the committed value is the clamped pre-drag size; **the later `pointerup` commits nothing further** | `§2.3` items 5/9, `§2.4` item 2, `§R` `R7`, `docs/specs/gutter.md` `§2.3` item 2 | `[T]` |
| ~~**F-11**~~ | **⟶ DELETED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`) — TOMBSTONE, and the row is NOT renumbered away (the id stays visible so no citation dangles silently).** **THE AS-FILED ROW READ: *"`capturePointer` opted in on a source WITHOUT the member"* ⇒ *"ZERO capture calls and NO throw: the gesture establishes and terminates normally — the session's own declared degradation"*, pinned by *"`§2.6` item 4, `docs/specs/gsession.md` `§2.3` item 6(a), `M-8b` thereof"*.** **WHY IT IS DELETED: the row is VACUOUS — it asserts a degradation of an opt-in this unit cannot deliver at all, so it can never FAIL and proves nothing; and its third citation `M-8b` names NO ROW in `docs/specs/gsession.md` (a dangling citation the gate-1 review found).** **THE LIVE CLAUSE IS `I-13` (`§3.3`): the module passes NO `capture` field anywhere and the need is recorded as an `E3`-SIDE owed item (`§2.6` item 4, `§8`). Any row citing `F-11` is repointed to `I-13`.** | — (deleted) | — |
| **F-14** | **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): A CALLER THAT OPTS IN ANYWAY IS INERT, NOT MISLED.** *(The id `F-14` was FREE at filing — the as-filed table ran `F-1`..`F-13` — so this added row takes the next free id and NOTHING is renumbered.)* | `capturePointer: true` supplied in the options | **the module still passes NO `capture` field to anything, makes no capture call of its own, and the gesture behaves EXACTLY as with the seam absent** — the option is **DECLARED and IGNORED**, and a row asserting that any capture behaviour changed FAILS. **The honest UX consequence is stated at `§2.6` item 4: without the opt-in a drag that leaves the affordance's box loses its reading (the session's local listeners only see the pointer while it is over the element).** | `§2.6` item 4, `§3.3 I-13`, `§8` | `[T]` |
| **F-12** | **The affordance element is `null`/`undefined`/a non-object** | `element: null`; `target: null`; both | **construction does not throw, `attach()` ⇒ `false` with ZERO session calls**; **no listener is attached to anything**; **no global lookup is attempted**; `stats()` is readable | `§2.2` P-2, `§2.3` row 2, `docs/specs/gutter.md` `§2.1` item 4 | `[T]` |
| **F-13** | **A row asserting a rendered fact on `[T]` is REFUSED, not satisfied** | any proposed `§3` row asserting a geometry, an applied style on a real element, a cursor's visual effect or a real pointer | **the row does not land**: those are `[U]` claims (`§5.2` legs 5/6). **The refusal is three-part:** (i) the node suite runs under the shim, whose elements have **no layout** and whose `style` is a recording object; (ii) **a rendered fact needs a real window**, and this unit has one — the `ui` leg — so the refusal is **not** an excuse about leg availability; (iii) `docs/specs/zones.md` `§4.4 S-6`'s sentence: *"the row **may not be moved to the `ui` leg silently**"* — **a rendered row belongs in `§5.2`'s `[U]` set BY NAME, at filing time.** **⟶ 2026-09-27 (`§R` `R2`): the `ui` leg EXISTS and is mandatory, but it does NOT measure this unit's affordance — its ONE measurement is taken on its own probe envelope, so a rendered row of THIS unit is discharged by the instrument named at `§5.U` item 4 (a shipped tool where one reads it, a `MANUAL OPERATOR` record otherwise).** | `§5.2`, `§5.U` item 4, `§4.4 S-7`, `§2.2` P-9 | `static` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **ONE WRITER, ONE CALL SITE: for every gesture in every state, the sink is written AT MOST ONCE, and this module writes to it ZERO times.** The module passes the caller's `commit` into `E3`'s factory and never invokes it. | the `E3` `C1` discipline composed (`docs/specs/gutter.md` `§2.3` item 3) | `M-5`, `§5.5.1 P-GU-SM-1` |
| **I-2** | **ONE COORDINATE READ: `resolveEventPointer` is the family's only coordinate read, and it is called at most once per observed pointer move.** | ruling 2's scope split | `§3.4 R-3`, `P-GU-IM-1` |
| **I-3** | **NO RETENTION ACROSS A TERMINAL: the per-gesture record (pre-drag size, token, handle) is discarded in a `finally` at EVERY terminal, and no element-keyed value, cache or memo exists.** | `E3`-HOST-1's class closed at this unit's own record | `M-3`, `F-2`/`F-8`, `§2.2` P-5 |
| ~~**I-4**~~ | **⟶ DELETED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`) — TOMBSTONE.** **THE AS-FILED CLAIM READ: *"NO CAPTURE BEFORE ESTABLISHMENT AND NO RELEASE EVER: the module contains no capture call and no release token; the capture call is the session's own, inside `begin`, after establishment, and only for an opted-in control"*, pinned by `F-11`, `§3.4 R-6`, `§0A` note 10.** **WHY IT IS DELETED: with the capture claim withdrawn (`§R` `R5`) the first two thirds are VACUOUS — there is no opted-in control in this composition, so the invariant constrains nothing and can never FAIL.** **THE LIVE CLAUSES ARE `I-13` (below) for the capture absence and `§2.2` P-6 for the release absence. Any row citing `I-4` is repointed to `I-13`.** | — (deleted) | — |
| **I-13** | **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R5`): NO CAPTURE CHANNEL EXISTS IN THIS COMPOSITION, AND NO RELEASE TOKEN APPEARS ANYWHERE.** The module passes **no `capture` field** to `attach` or to any other call, contains **no capture call of its own**, and contains **no `releasePointerCapture`**; **the `capturePointer` option is declared and IGNORED**; and **the drag's reading source is the module's own move listener on the affordance, which — without capture — sees the pointer only while it is over the element.** | `E3`'s sealed `attach` cannot carry the opt-in and `E3` is FROZEN | `F-14`, `§2.6` item 4, `§2.2` P-6, `§3.4 R-6` |
| **I-14** | **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): THE AFFORDANCE IS CONSTRUCTED IN THE RUNNING APP, FROM THE ALLOWED WIRING, AS PROVENT-RENDERED DATA.** The affordance the wiring attaches to is **the element the producing graph emitted** (resolved through the runtime's own id-index + `data-node-id`), the module is reached by **`src/renderer/renderer.ts`**, and **no element, text, class or handler body is authored outside the envelope**. | the architect's R1 ruling + `AGENTS.md`'s project-wide constraint | `§3.4 R-13`, `§2.2` P-10, `§5.1` rows `10`/`11`, `§R.1` |
| **I-15** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-12`/`R-13`, conditions `C-4`/`C-5`): ONE OWNER PER LISTENER SET, ONE SINK WRITE, ONE WRITE ROUTE, AND NO REBIND.** **On the SAME affordance element two listener sets coexist — the module's FOUR (hover enter, hover exit, the context read, the move listener), each installed and removed BY THE MODULE, and the session's own install/tracking set, installed and removed BY THE SESSION through `E3`; the wiring installs nothing itself and removes nothing itself.** **And for the committed value there is exactly ONE write route — the wiring's `commit` seam performing ONE managed-channel write on the runtime (`Runtime.applyCommand`'s `state-slice` shape) — with NO rebind and NO re-resolution of the affordance element after it (`E-2` open, `§7a.1` item 4).** **⟶ `E-2` RULED 2026-09-27 (the architect's *"Reuse"*): the element IS REUSED across the write, so this invariant's no-rebind half is now a CONSEQUENCE OF THE RULING rather than a stand-in for an undecided question — and the invariant gains its boundary: the ONE write route must not structurally replace the affordance's node (it targets the authored status/readout node, deliberately outside it), so a write whose `node` is the affordance's own node FAILS this invariant.** | the ownership and write-route guarantees a fork most easily breaks; both are stated as invariants so a row can FAIL on a cross-owner removal or a second write route | `§2.3` rows 2/6c/15, `M-15`, `M-18`, `M-19`, `§2.1` item 8(v) |
| **I-5** | **THE PREVIEW IS A PRESENTATION CHANNEL: it is never the sink, never persistent, never MCP-visible, and it is written at most once per observed move.** | `E3`'s preview rule composed | `M-8`/`M-9`, `§5.5.1 P-GU-SM-2` |
| **I-6** | **ELEMENT IDENTITY IS BY REFERENCE: the affordance and the target are the objects the caller handed, never derived from a string, never re-resolved.** | `A-d3`'s no-lookup rule | `§3.4 R-6`, `M-4` |
| **I-7** | **TOTALITY AT THE BOUNDARY: `createGutterAffordance` never throws for ANY argument, and `cursorDeclarationFor`/`sizeFromPointer`/`domEventSource` never throw for ANY input.** | the `E3` totality standard applied to this unit's own surface | `F-6`, `§5.5.1 P-GU-TP-1` |
| **I-8** | **NO SECOND GESTURE AUTHORITY: the module calls no session terminal, owns no gesture state machine and no "one gesture at a time" guard, and attaches no listener outside the affordance element.** | `V-13`'s remedy, composed | `§3.4 R-4`, `§3.4 R-5` |
| **I-9** | **NO MODULE-LEVEL MUTABLE STATE: the factory's result holds its own counters and at most one per-gesture record; nothing else persists.** | the `SCH-6` acceptance line made testable | `§2.2` P-5, `§3.4 R-7` |
| **I-10** | **NO RENDERED-FACT CLAIM FROM `[T]`: no `[T]` row of this unit asserts a geometry, an applied style, a layout or a real pointer.** | the mandatory layer discipline | `F-13`, `§5.2`, `§4.4 S-7` |
| **I-11** | **THE DEMO'S DRIFT IS MEASURED, NOT ASSUMED: the authored card changes the demo's rendered census and its tool outputs, and the unit's live battery records the BEFORE and AFTER readings rather than a projection.** **⟶ CLARIFIED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`/`R2`): the drift is now larger than the card alone — the renderer bundle carries the affordance module (`§5.2` leg 3, byte-identity disclaimed), and the BEFORE/AFTER readings are the `targets` and `html` outputs taken with `npm start` + `npm run mcp -- --target http --port 3787 …` (`§5.U` items 2/4, `U-7`).** **⟶ RULED 2026-09-27, THE RED-RUN REPAIR PASS: THIS CELL'S CLAIM IS THE DRIFT DEBT AND NOTHING ELSE — IT PINS NO MODULE-PRESENCE CONJUNCT.** The red set's row carried an extra `existsSync(MODULE_SRC) === false` conjunct that this cell does not state; the conjunct is removed and the row is repaired to the BRANCH form (`R-8x`'s pattern): at red time (module absent) the row asserts that no BEFORE/AFTER reading exists yet, and at green time (module present) it asserts that the debt is still owed to `U-7` and is NOT discharged by the module's arrival. **The repair is recorded in the appended `⟶ RECORDED` block; no id, term or section number moves.** | `U-THEME-CONTROL`'s lesson (`docs/pending.md` §B's `SCH-3` row: *"measure it, do not assume it"*), applied here | `§3.5 R-9`, `§5.U`, `§5.2` leg 3 |
| **I-12** | **NO NEW MCP SURFACE AND NO SHELL CHANGE: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the renderer RPC switch and the preload bridge are UNCHANGED, asserted by SET EQUALITY against the names where a name-complete row exists.** | the `E3`/session discipline, carried | `§3.4 R-9`, `§5.1` |

### 3.4 The STATIC rows — **the rows `§2.2`'s prohibition table cites, ENUMERATED**

**Every static claim in this file has an id here, and each scan is closed against the evasion class
(token assembly, comment-carrying, realm-rooted computed access) by `§4.4 S-1`'s stop condition.** **The
scope of every scan is stated with it, because a whole-file scan of a file that must contain a spelling
can only fail** (`docs/specs/gsession.md` `§3.4 R-1`'s own lesson).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-1** | **THE CENSUS AND THE AUTHORSHIP ROW.** **(a)** The module's imported namespace exposes **exactly THREE value names** — `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource` — **read BY NAME**, with a **positive control that a fourth value name FAILS**; **(b)** the **SEVENTEEN** type names are **presence claims** pinned by `§5.2` leg 4 (a type-only name is erased at run time), and a **TWENTY-FIRST exported name of any kind FAILS** (**⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the as-filed cell read *"exactly FOUR value names — … `sizeFromPointer` … a fifth value name FAILS"* and *"the SEVEN type names … a twelfth exported name"*; the seam ruling makes the nine seam types exported contract, the as-filed `seven` omitted `GutterAffordanceStats`, and the redundant `sizeFromPointer` VALUE is deleted, so the ruled census is `3` values + `17` types = `20` names and the failing controls are a FOURTH value and a TWENTY-FIRST name — all twenty are NAMED at `§R.3`**); **(c)** **the module's own content-token census is EMPTY** over the nine-token negative list of `§2.1` item 6, scanned **comments included, token-assembly joined**, with a **positive control** (a corpus spelling one of them raw/joined/in a comment **FAILS**) and a **negative control** (the module's legitimate text — `addEventListener`, `removeEventListener`, `setPointerCapture`, its own member names — **PASSES**). | `§2.1` items 1/6, `§2.2` P-1 | static |
| **R-2** | **THE SURFACE-SET ROW.** The affordance object carries **exactly the five members** `attach` · `detach` · `detached` · `stats` · `controller`, **read as the object's own key set BY NAME**; **a sixth member FAILS**; and **no member of it is an MCP-reachable surface** (no tool descriptor, no `RpcMethod` string, no IPC channel name, no `list_targets` handle). | `§2.1` item 5, `§2.2` P-7 | static |
| **R-3** | **THE COORDINATE/MAGNITUDE VOCABULARY ROW.** Over the module's source **including comments**, no occurrence in any form of a **second coordinate token** (`pageX`/`pageY`, `screenX`/`screenY`, `offsetX`/`offsetY`, `movementX`/`movementY`, `deltaX`, `pointerId`), **no magnitude vocabulary** (`delta` as an identifier, `distance`, `ratio`, `percentage`, `scale`), and **no coordinate read outside `resolveEventPointer`'s own body**. **The two legal tokens `clientX`/`clientY` are the NEGATIVE control and MUST PASS.** **The scan's scope is the module file plus this row's own controlled corpora.** | `§2.4` items 1/5, `§2.2` P-4, `§1` item 7 | static |
| **R-4** | **THE NO-SECOND-AUTHORITY ROW.** The module contains **no** `session.begin`, `session.end`, `session.cancel`, `session.install`, `session.dispose`, `session.stats`, `session.gesture` **call of its own** (it reaches those only through `E3`), **no** `addEventListener` on anything but the given element, **no listener-window bookkeeping**, and **no second `createGestureSession` call site outside `attach`'s path**. | `§2.6` item 2, `§2.3` row 2, `§2.2` P-3 | static |
| **R-5** | **THE CLOSED-READ-SET ROW — `M-1`'s static half.** **(i)** `src/shared/gutter.js`'s module contains **neither `registerCompositionWriter` nor `registerCommit`** in any form (raw, token-assembled, commented) — **the invented-seam probe must be GONE, and this row FAILS if it is present**; **(ii)** **this module's own session-member reference census is EMPTY** — a `grep`-shaped scan for the six-member closed set's spellings in `gutter-affordance.ts` finds **no session-member reference**. | **`docs/pending.md` §I-sexies `E3`-HOST-2**, `docs/specs/gutter.md` `§2.5` item 1 | static |
| **R-6** | **THE ACCESS/DELEGATION ROW.** **No `document`/`window`/`globalThis`-rooted access**, **no `closest`/`querySelector*`/`getElementById`**, **no `document.addEventListener`**, **no `releasePointerCapture`**, and **the module's DOM-API members are EXACTLY `addEventListener`, `removeEventListener` and `setPointerCapture`, each appearing in `domEventSource`'s own body and nowhere else.** **A row asserting "no DOM API at all" FAILS this row's own text** (`§4.4 S-1`). | `§2.2` P-2/P-6, `§2.6` item 4 | static |
| **R-7** | **THE POLICY/VOCABULARY ROW.** No **cursor literal** (`col-resize`, `row-resize`, `ew-resize`, `ns-resize`, `cursor` as an authored string value), no **axis vocabulary** (`horizontal`/`vertical`/`x`/`y` as literals), no **unit string** (`'px'`, `'0px'`), no **threshold**, no **selector**, no **`data-*` name**, no **default size or bound**, and **no store/persistence/cache token** (`localStorage`, `sessionStorage`, `memo`, a `Map`/`WeakMap` keyed by element). **`cursorDeclarationFor`'s own parameter name and the `cursor` PROPERTY NAME it reads ARE the negative control and MUST PASS** (it reads a property called `cursor`; it does not carry a value). | `§2.2` P-4/P-5, `§0A` notes 4/8 | static |
| **R-8** | **THE IMPORT ROW.** **Exactly three import statements** exist, **named**: a **value** import of `clampToBounds` from `./gutter.js`; a **value** import of **`POINTER_TYPES`** from `./gesture-session.js`; a **type-only** import from `./gesture-session.js` (`GestureHandle`); a **type-only** import from `./gutter.js`. **Any other path — `provident-ssr`, `electron`, `node:*`, `src/main/**`, `src/renderer/**`, the shim, any other sibling — FAILS**, as does **a third value import** or **a value import of the session FACTORY**. **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`, condition `C-3`): the as-filed cell named ONE value import (`clampToBounds`) and TWO type-only ones; the `POINTER_TYPES` VALUE import is now REQUIRED because the wiring's move type must BE the session's exported constant and the module may not replicate it as a literal (`§3.1 M-18`, `§3.4 R-14`). THE RULED SET: FOUR NAMED BINDINGS — TWO VALUES (`clampToBounds`, `POINTER_TYPES`) + TWO TYPE-ONLY — ACROSS THREE STATEMENTS.** | `§2.1` item 2, `§0A` notes 2/12 | static |
| **R-9** | **THE DIFF-SCOPE ROW.** The unit's **allow-list census is scoped to ITS OWN ARTIFACTS** — the affordance module, the demo-envelope authoring hunk, this unit's test file, this spec, this unit's `*-greens.md` and its `archive/reviews/**` record, and the unit's own tracker rows — and **the DENIED set binds the WHOLE committed set**: *any* denied path appearing anywhere in the range **FAILS** the row, **regardless of which pass committed it**; **a non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL**. | `§5.1` | static |
| **R-10** | **THE PAGE-DESIGN PROBE.** `docs/skills/designing-pages.md` **does not exist** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage matrix and no demo-page index to update**. **THE PROBE MUST BRANCH on the file's presence**: if it exists at green time, this unit **owes the coverage row and the demo-page entry** — and **a row that fails because the file appeared is a defective row** (the `E3` `R-16` green-branch lesson, `docs/specs/gutter.md` `§3.5 R-16`). | `§7` item 8, `docs/specs/ci-ui-leg.md` `§1`'s out-of-scope clause | static |
| **R-11** | **THE NO-NEW-SURFACE ROW.** `ALL_TOOLS` (**21** names), `RpcMethod` (**21**), `MUTATING_METHODS` (**7**), `VALID_GROUPS` (**5**), the renderer RPC switch and the preload bridge are **UNCHANGED**, asserted **by SET EQUALITY against the names** where a name-complete row exists (`tests/engine-pin-version.test.ts`'s `PINNED_TOOL_SET`), **never by a bare count**; and the leg's own measurement channel stays the **existing** tools (`docs/decisions.md` `REAL-DOM-UI-GATE-LEG`; `docs/specs/ci-ui-leg.md` `§0` prohibition 5). **⟶ RULED 2026-09-27, THE RED-RUN REPAIR PASS: THIS CELL PINS NO MODULE-PRESENCE CONJUNCT EITHER.** The red set's row carried an extra `!existsSync(MODULE_SRC)` conjunct (*"the affordance module does not exist yet"*) that this cell does not state and that flips RED the moment the work is done — the `E3`-BLOCK-1 / `docs/specs/gutter.md` `§3.5 R-16` DEFECTIVE-ROW class (*"a row that fails because the work was done is DEFECTIVE"*). **The conjunct is removed and the row repaired to the BRANCH form: at red time the module's absence is asserted, and at green time the row asserts only this cell's own claim — the pinned surface set is UNCHANGED by the module's arrival** (the module adds no tool, no resource, no group, no `RpcMethod`, no `MUTATING_METHODS` entry, no IPC method and no registration site). **Recorded in the appended `⟶ RECORDED` block; no id, term or section number moves.** | `§3.3 I-12`, `§2.2` P-7 | static |
| **R-12** | **THE NODE-LOCAL LISTENER ROW.** Every listener this unit causes is attached **through the injected source**, **to the affordance element it was given**, **once per event type**, and **every one is removed on `detach` with the SAME three values**; **zero** listeners on `document`/`window`/an ancestor; **zero** `closest`/`querySelector*`; **zero** capture calls anywhere (the capture claim is WITHDRAWN, `§R` `R5`). **⟶ CORRECTED 2026-09-27 (`§R` `R4`/`R5`): the module's own listener set is FOUR event types — the hover enter, the hover exit, the module's own context-button read AND the module's own MOVE listener (`§2.3` row 2) — and the session adds ONE more of its own through the same source; the as-filed *"once per event type"* still holds for each set, and the composed `source.on` count is `5` (`§3.1 M-4`).** | `§2.2` P-2, `§3.1 M-4`, `docs/decisions.md` `INTERACTION-NODE-LOCAL` | static |
| **R-14** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`, condition `C-3`): THE MOVE-LISTENER TYPE-MATCH ROW — THE TYPE, NOT THE COUNT.** **The row asserts that the event type this unit registers for its OWN move listener IS `POINTER_TYPES.move`, the session module's exported constant — read by IDENTITY against the imported constant, never by string comparison against a literal the row itself spells** (a row that spells `'pointermove'` and compares passes for a module that also spells it, which is exactly the false green this row closes). **(a)** the registration's second argument `=== POINTER_TYPES.move`; **(b)** the module's OWN bytes contain **no** event-type literal for the move type (it imports the constant, `§2.1` clause 2, and `§3.4 R-7`'s vocabulary scan covers the literals); **(c)** a POSITIVE CONTROL — a wiring whose `moveTypeOf` answers a different non-empty string makes the row **FAIL** (the drive still registers a listener, so a count-only row would stay green); **(d)** a NEGATIVE CONTROL — the module's legitimate tokens (`POINTER_TYPES.move` read through the gate, its own member names) **PASS**. **A row asserting only the COUNT of `source.on` calls FAILS this row's own text** (`§4.4 S-2`). | `§2.1` item 9, `§2.3` row 2, `§3.1 M-18`, `§R.2` `R-11` | static + `[T]` |
| **R-13** | **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`); ⟶ EXTENDED 2026-09-27 BY THE STEP-3 PASS (`§R.2` `R-9`/`R-10`/`R-13`, conditions `C-1`/`C-2`/`C-5`): THE RENDERER-WIRING ROW, WITH ITS ADDED CLAUSES (iv)/(v)/(vi).** **`src/renderer/renderer.ts`** and **`src/renderer/runtime.ts`** appear in the change set **for the FIVE wiring roles of `§2.1` item 8 and for `Runtime.elementForNodeId(...)` — and for NOTHING ELSE**: **(i)** the wiring's added bytes contain **no** `createElement`, `innerHTML`, `outerHTML`, `appendChild`, `insertBefore`, `textContent`, `className`/`classList`, `document.write`, no `document.querySelector*`/`getElementById`, and **no authored UI text, class list or handler body** — **a positive control** (a wiring change carrying ANY of those tokens **FAILS**); **(ii)** the wiring **creates no element outside the envelope** — the affordance and target elements it hands the module are **the elements the producing graph emitted** (resolved through the runtime's own id-index + `data-node-id`), asserted by **identity** against the graph-emitted element, with **a positive control** (a wiring that constructs its own element **FAILS**); **(iii)** the affordance is **provident-reachable**: its authored `css.id`/`props.id` resolve in `list_targets` and its authored handler dispatches through `provident.dispatch`, on the same tree the wiring attached to (`§3.5 R-9`). **⟶ ADDED 2026-09-27, THE STEP-3 PASS — THREE MORE CLAUSES:** **(iv)** **`Runtime.elementForNodeId(id)` EXISTS IN `src/renderer/runtime.ts` AND NOWHERE ELSE**, is **called from `main()` between the `runtime.bootstrap()` call and the `if (!bridge)` conditional** (asserted on the source's own call order, not on line numbers), resolves by **engine `nodeId` then authored `css.id` then authored `props.id`**, walks **only** the mount's direct children's `data-node-id` (no `querySelector*`/`closest`/`getElementById`), and is **TOTAL: an unresolvable/`null`/non-string/primitive id answers `null` and NEVER throws** (with a positive control: a selector-based or throwing implementation **FAILS**); **(v)** **THE WIRING'S SOURCE FORWARDS THE EVENT** — its registered handlers are invoked with the DOM event object as the first argument (a positive control: a source calling its handlers with no argument **FAILS**, because the module's own turns would then be coordinate-blind, `§R.2` `R-10`); **(vi)** **THE WIRING'S `commit` SEAM ISSUES ONE `Runtime.applyCommand` CALL OF THE `state-slice` SHAPE AND PERFORMS NO REBIND** (`§2.1` item 8(v), `§3.1 M-19`; a rebind **FAILS** until `E-2` is ruled). | **`§5.1`** rows `10`/`11`, `§2.1` item 8, `§R.1`, `§R.2`, `AGENTS.md`'s project-wide constraint | static + `[U]` |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | The claim | The probe (a TestWriter authors it) |
| --- | --- | --- |
| **R-8x** | **`src/shared/gutter-affordance.ts` does not exist at red time** | **the module-absence row**: assert **absence** and that **no unit path is imported by any `src/**` file** — and **branch on presence at green time** (if it exists, assert it **EXISTS**, that it is **imported by the renderer wiring (`src/renderer/renderer.ts`) and by NO other `src/**` file**, and that the `3 + 17 = 20` census holds** (**⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the as-filed branch read *"the `4 + 7 = 11` census holds"*, then `4 + 17 = 21`; the ruled census is `3` values + `17` types = `20` names, all named at `§R.3`**). **A row that fails because the work was done is defective** (`docs/specs/gutter.md` `§3.5 R-16`'s lesson). **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the as-filed branch asserted the module is *"imported by the demo envelope ONLY"* — an assertion that CONTRADICTED the same cell's *"not imported by any `src/**` file"* phrase and, worse, named the ONE site where the module can never be imported (the envelope is DATA, not code). It is DELETED and replaced by the wiring, which is the real and only importer: `src/renderer/renderer.ts` reaches `src/shared/gutter-affordance.ts` and the bundle therefore carries the module (`§5.2` leg 3).** |
| **R-9** | **The authored gutter card is IN the demo envelope, and the demo's outputs DRIFT because of it** | **the demo-census row**: the authored card's nodes appear in **`list_targets`'s vocabulary** (the affordance's authored `css.id` and `props.id` resolve) and in **`get_rendered_html`**; and the unit's **live battery records the BEFORE/AFTER census and HTML readings** rather than a projected delta (`§3.3 I-11`, `§5.U`). **The drift is MEASURED.** |
| **R-10** | **`docs/skills/designing-pages.md` does not exist** | **`§3.4 R-10`** (the branching probe). |
| **R-11** | **`npm run ui` and the live driver exist and are runnable** | **the precondition + leg rows**: the leg's own **precondition** is `npm run divergence` green **on the SAME SOURCE REVISION, immediately before the `ui` leg, with no intervening source edit** (`docs/specs/ci-ui-leg.md` `§5`; **⟶ QUALIFIED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`) — the as-filed cell read *"green for the same built tree"*, and both scripts REBUILD, so no byte-frozen artifact set is shared**), and the module's live-battery rows are discharged **by running the commands of `§5.2`**, with their exact output recorded (`§5.3` item 6). |
| **R-12** | **The session module and the `E3` module exist and are FROZEN** | the probe: `src/shared/gesture-session.ts` exports the **`4 + 8 = 12`** names of `docs/specs/gsession.md` `§2.1`, `src/shared/gutter.ts` exports the **`2 + 10 = 12`** names of `docs/specs/gutter.md` `§2.1`, and **neither file is modified by this unit** (`§5.1`'s DENIED set). |

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-GUTTER-UI`** — the unit has **no green**,
and `RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding,
and none may be cited as one.** **The pass is READ-ONLY** (it changes no `tests/**` and no `src/**`), it
**must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** (the per-row attempts,
the strategy ids, the total against its terms, the stop-after-5 rule, and the pool-versus-boundary check
**re-run against the LANDED tables**), and **it must re-run the `§5.U` audit (`§5.U` item 4)**. **A HOST
finding is fixed here with regression rows**; **a finding whose remedy lies in `E3`'s own denied path is
reported to the supervisor, never fixed from this unit** (`§3.2 F-5`). **A genuine `provident-ssr` package
defect goes to `docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER patched.**

**The six vocabularies the disposition table uses are `§3b`'s**, and **the as-filed status of every seed
below is `OWED`.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **B-1** | **THE SINGLE-WRITER PROBE ON THE REAL COMPOSITION:** across `end`, the invalid `reset`, the refused `reset`, `cancel`, the drop path, a mid-gesture `dispose` and a two-writer composition — **is the sink invoked exactly the declared number of times in EVERY case, and do `E3`'s counter, the module's `stats()` and the sink's own record AGREE?** **Does any path produce two writes — and does the module's own `commit` reference ever get invoked outside `E3`?** | `[T]` |
| **B-2** | **THE PARKED-DEFECT PROBE (the reason this unit exists):** do `M-1`/`M-2`/`M-3` **PASS on the landed `E3` module** — the invented-seam probe gone, `detached` honouring `session.disposed`, and the per-gesture record discarded in a `finally` around a THROWING consumer hook? **A failure is a HOST finding against `E3`, with the measured call counts recorded.** | `[T]` + the DONE row |
| **B-3** | **THE COORDINATE-UNIQUENESS PROBE:** does ANY byte outside `resolveEventPointer`'s own body read a coordinate; does any row claim a magnitude; does `E3` or the session read one; is the `PointerPosition` the caller receives **free of any event reference** (so a caller cannot re-read from it)? | static + `[T]` |
| **B-4** | **THE PREVIEW-VERSUS-SINK PROBE:** can ANY drive make a preview write reach the sink, or make a preview write occur at a committed terminal, or make more than one preview write per observed move? **Is the revert on the drop/cancel path a PREVIEW write and never a sink write?** | `[T]` |
| **B-5** | **THE VALIDITY-RULE PROBE:** is the validity decision EXACTLY `§2.3` item 5's four clauses — a null pointer, a non-finite clamp answer and an exact-`false` veto each INVALID, and a `true`/`undefined`/non-boolean/non-callable/throwing veto NOT a veto — and is the sticky rule honoured? | `[T]` |
| **B-6** | **THE CAPTURE PROBE:** does the module pass a `capture` field to `attach` for a **non-opted-in** caller; does the module's own bytes contain a capture call; is every capture call **after establishment**; does the **source's degradation** hold when the member is absent; and is `releasePointerCapture` absent everywhere? | static + `[T]` |
| **B-7** | **THE NODE-LOCAL PROBE:** any `document`/`window`-delegated listener, any `closest`/`querySelector*`/`getElementById`, any listener on an element other than the affordance, any listener surviving `detach`? **Any positive is `BLOCKING — SCOPE`.** | static + `[T]` |
| **B-8** | **THE PROVENT-AUTHORSHIP PROBE:** does the module author an element, text, class or handler body; does any change add a DOM node outside the envelope; is the authored card **reachable** through `list_targets` / `provident.dispatch` / `get_rendered_html`; and does the **demo's output drift only where the authored card puts it**? | static + `[U]` |
| **B-9** | **THE LAYER PROBE:** does any `[T]` row assert a geometry, an applied style, a layout or a real pointer; does the DONE row claim a rendered fact from the node suite; are the **`[U]` rows named as `[U]` at filing time** rather than moved to the live leg later? **Any positive is the false-green class.** | the DONE row + `§5.2` |
| **B-10** | **THE LIVE-BATTERY PROBE:** did the live battery **actually run** (`npm run ui` exit `0`, and the driver's own recorded output), with the **exact commands and observed values** recorded, and with the mandatory-vs-structural rule honoured (**this unit may not park it for convenience**)? | the DONE row |
| **B-11** | **THE CROSS-UNIT PROBE:** does this unit duplicate an `E3` responsibility (a clamp, a code domain, a terminal, a writer), a `U-GSESSION` one (a lifecycle, a listener window, a commit count), a `U-CENSUS`/`U-ZONES`/`U-PROJ` one, or a `U-RELOCATE` one (a drop MODEL, a reveal set, a threshold)? **Duplication is a FINDING; an obligation pulled in "for convenience" is the `S-9` class.** | static + `[T]` |
| **B-12** | **THE USER-FLOW PROBE:** does the `§5.U` matrix's U-row count equal the live runner's `summary.total`; is every U-row's **post** observation the one measured (not projected); and is the **read-only audit** performed on the runner's coverage report — **given that the predicate's own source document does not exist in this tree**? | the DONE row + `§5.U` |
| **B-13** | **THE REGISTER PROBE (gate 11's audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the declared total**, is the **stop-after-5** rule honoured and **every un-run row REPORTED**, and **is every pool/table member still consistent with its row's declared boundary text** (`§5.5.2` items 3/4 **re-run against the LANDED tables**)? **AND: is every row this unit CANNOT drive absent rather than nominally present** (`§5.5.2` item 2)? | `[T]` + the test file |
| **B-14** | **THE IMPORT/ISOLATION PROBE:** only the declared imports; **`src/shared/gesture-session.ts` and `src/shared/gutter.ts` and their test files untouched**; `src/renderer/**` and `src/main/**` untouched; **any changed file outside `§5.1`'s allow-list while inside its DENIED set is `BLOCKING — SCOPE`**. (**⟶ 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-11`): the as-filed cell read *"only the three declared imports"* as if that settled the set — the ruled set is FOUR NAMED BINDINGS (two values, two type-only) across three statements, `§3.4 R-8`.**) | static |
| **B-15** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3`): THE SEAM-CONTRACT PROBE — the false-green class this pass's conditions exist to close.** **Does the move listener's registered type IDENTICALLY equal the session's own exported `POINTER_TYPES.move` (not merely "one move listener was attached")? Do ALL ELEVEN seams reach their DECLARED degradation when absent, non-callable or throwing — with NO silent success and NO throw out of a turn that must stay total? Does any seam's miswiring leave a row GREEN while the drag is in fact dead? Does the wiring's `commit` route the value through `Runtime.applyCommand`'s `state-slice` shape (and not through a preview write, a styles write or an authored handler body)? Does any pass rebind the affordance after a commit or after a re-derivation (`E-2` is OPEN)?** | static + `[T]` |

**The seed set's own status: ⟶ `15` seeds, ALL `OWED` (`B-15` added 2026-09-27 by the gate-1 step-3 repair pass, `§R.2`/`§R.3`).** **`B-2` is the reason this unit was admitted and
`B-13` is the gate-11 audit; `B-9`/`B-10`/`B-12` are the three layer/live classes this family has
historically failed on.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended
findings block needs **no renumbering and no new section**. **A row added later must use one of the
statuses below, or the pass must define its new token IN THIS TABLE with a one-line meaning** — an
undefined status word is what this shape exists to prevent.

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a **host** finding in THIS unit's own scope, **fixed here + regression-tested** as a new `§3` row (or a new `R-*` row for a static finding) |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** — the spec is amended with the old text kept visible as `SUPERSEDED`, and the row lands in `§3`/`§5.5.1` |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — **the pass may not report done with an `OWED` row** |
| **OWED — HOST FIX** | a **host** finding whose fix is owed to the **Implementer** pass that follows, **red-first**, with its regression row owed to the **TestWriter**; **it may not be reported `DONE` until the fix lands, and its owner is named** |
| **OWED — `E3`-SIDE** *(the token this unit's family needs, defined here so a `B-2` failure has a name)* | a finding whose remedy is **inside `E3`'s own denied path** (`src/shared/gutter.ts` / `tests/gutter.test.ts`) or the frozen session: **reported to the supervisor with its measured call counts, NEVER fixed from this unit** |
| **OWED — TEST-SIDE** | a finding whose remedy is a **row** the TestWriter owns; **no `§5.5.1` statement, id, strategy id or attempt term may change for it** |
| **UNSATISFIABLE FROM THIS UNIT** *(the token the step-3 pass adds, 2026-09-27, for the row half that cannot be satisfied here at all — `§R.2` `R-14`)* | a row half whose REQUIRED behaviour **cannot be produced from this unit's own allowed files**, because satisfying it would need a read or a write on a DENIED path (e.g. `M-2`'s `E3`-side half, which needs the module to reference `session.disposed` — the very read `M-1` forbids). **Distinct from `EXPECTED-RED`**: an `EXPECTED-RED` row is a defect the composition is expected to expose, while an `UNSATISFIABLE` half could not pass however correct this unit's own bytes are. **Reported with its owner and its DENIED path; never fixed from this unit** |
| **BLOCKING — SCOPE** | `B-7`/`B-14`/`B-8`/`B-3` returning positive: **the unit does not land** until the scope violation is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; **the package is NEVER patched.** **This unit exercises no package surface directly, so a `HANDOFF` row can arise only through the engine's own DOM/event surfaces reached by the live leg** |
| **PARKED-with-revisit-condition** | recorded, not fixed, with the condition that would reopen it and its owner |

**Status of the table itself: `OWED` — empty by construction.** **An appended findings row must cite, at
minimum: the seed id (`B-*`), the finding's severity, its disposition from the table above, its owner, and
the clause (`§`-section + row id) it changed or left unchanged.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red set is `tests/gutter-ui.test.ts`, and it is authored FROM THIS SPEC ALONE — before a byte of the
module or of the demo-envelope card exists.** **Its FIRST RUN must report a failing set, and the failing
set is the evidence of the work not yet done.** **The red's own numbers are recorded in the DONE row**
(`§5.3` item 5). **The red is `[T]` and `static`; it makes NO `[U]` claim and runs no window.**

**⟶ ADDED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A1`) — THE RED SET IS AUTHORED FROM THIS SPEC ALONE, RUN, AND REPORTED, WITH ITS EXPECTED FAILURES AND THEIR MEASURED COUNTS.** **THE BINDING CLAUSES, each falsifiable:**
1. **THE RED IS AUTHORED FROM THE SPEC ALONE.** Every row's EXPECTATION, every helper and every CONSTANT comes **from this file's clauses** — never from `src/shared/gutter-affordance.ts`'s bytes, never from the landed `src/shared/gutter.ts`'s bytes, never from `tests/gutter.test.ts`'s helpers, and never from a prototype of the module. **`§4.4 S-10` is the stop condition**, and **a row whose expectation cannot be traced to a clause cited in its own `Pinned by` cell is a review finding.**
2. **IT IS RUN AND REPORTED BEFORE ANY IMPLEMENTATION**, per `RCA-1`: **the failing set is printed VERBATIM** (`§4.2`'s order, `§5.3` item 5), the **file count / test count / failed count / passed count / skipped count** are printed as the runner reports them, and **a red report that prints only a summary without the failing row ids is incomplete.**
3. **`M-1`/`M-2`/`M-3` ARE PRESENT IN THE RED RUN AND EXPECTED TO FAIL THERE.** **⟶ UPDATED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): the *"expected failure"* they carry is the RED-RUN expectation (no module exists yet, so every behaviour row fails), NOT an `E3`-side defect expectation — the three host defects are FIXED in the landed module (`cc7fba5`), so in the red report these three rows fail for the SAME reason every other behaviour row fails, and they must NOT be tagged with the `E3`-SIDE token in the red's own failing list.** **THE DONE row carries their GREEN readings with the as-filed measured counts beside them** (`§3.1 M-1`/`M-2`/`M-3`, `§3.2 F-5`, `§5.3` item 4).
4. **THEIR MEASURED CALL COUNTS ARE PRINTED WITH THE ROWS.** For `M-1`: the **static half's** reading (`src/shared/gutter.ts` contains neither invented name — now TRUE) **beside the runtime half's own sink-call census**; for `M-2`: the **session-call count** over a disposed-session double (`0` expected); for `M-3`: the **session-call count** on the post-throw `reset` (`0` expected). **A red or DONE report that prints a verdict for these rows without their counts is incomplete, and a count that is not the one the run produced is a false record.**
5. **NO EXPECTATION, HELPER OR CONSTANT MAY COME FROM THE LANDED BYTES** — the rule is `§4.4 S-10`, restated here because the red set is where the violation is easiest and most costly (`docs/pending.md` §I-septies's *"~17 of ~20 defects were in the proof"* record is the reason).

**What the red MUST contain, in this order:**

1. **The existence/absence rows** (`§3.5 R-8x`/`R-12`) — the module-absence row **branching on presence**,
   the frozen-peer probes, and the **demo-card absence** probe (the authored `css.id`s do not resolve at
   red time). **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R8`(f) and `R1`): the red MUST ALSO
   carry (a) the `EXPECTED-RED` markers for `M-1`/`M-2`/`M-3` — the red run is where they will fail, and
   the failing set is EXPECTED to contain them, so a red report that omits them is an incomplete report —
   and (b) the RENDERER-WIRING static row `§3.4 R-13` (the wiring's content-token census and the
   element-identity check), which is red at red time for the same reason the module-absence row is.**
2. **The static rows** (`§3.4 R-1`..`§3.4 R-12`, **plus the repair pass's `§3.4 R-13` and the step-3 pass's `§3.4 R-14`**), each with its own **positive and negative control**.
3. **The state rows** (`§3.1 M-1`..`M-20` — **⟶ WIDENED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3`): the as-filed range read *"`M-1`..`M-17`"*; the step-3 pass added `M-18` (the move-type/listener-ownership row), `M-19` (the commit write route) and `M-20` (the per-seam degradation row), and no id was renumbered**) and the **fail-states** (`§3.2 F-1`..**`F-14`**, with `F-11`
   DELETED and tombstoned), driven through **a recording source double**, **element doubles**,
   **caller-supplied callbacks** and the **shim**
   where a DOM-shaped double is needed.
4. **The register rows** (`§5.5.1`'s seven rows), authored as **plain deterministic vitest tables inside
   the same file** — **no generator, no seed, no new dependency.**
5. **The four parked-`E3`-obligation rows FIRST among the behaviour rows** (`M-1`..`M-5`), so the
   composition's own defects are the first thing the red run reports.

### 4.2 Red-set authoring order

1. **The static and existence rows first** (they are evaluable at red time and they pin the scope).
2. **`resolveEventPointer`'s and `cursorDeclarationFor`'s totality tables** — the two pure functions whose
   behaviour is fully specified by `§2.4` item 1 and `§2.6` item 3, driven as **value rows**.
3. **The composition drives** (`M-4`..`M-10`) over a **recording session double** first, then over the
   **landed session** where a real lifecycle is needed.
4. **The parked-obligation rows** (`M-1`..`M-3`) — **driven against the landed `E3` module**, which is
   where they are expected to expose its defects. **⟶ 2026-09-27 (`§R` `R8`(f)): these three are
   `EXPECTED-RED AGAINST THE LANDED `E3``, so the red report must list them as EXPECTED failures with
   their measured call counts — and the GREEN pass does NOT turn them green; they stay `OWED — E3-SIDE`
   until an `E3` pass fixes the denied path (`§3.2 F-5`, `§5.3` item 4).**
5. **The register rows LAST** — they are the property layer and they ride the same file.

### 4.3 What the red is NOT

- **It is NOT an implementation sketch.** **No row may import the module before the module exists**; the
  existence rows are written to **branch**, so completing the work turns them green rather than red.
- **It is NOT a `[U]` leg.** **No red row boots Electron, and none may be satisfied by the live battery.**
- **It is NOT a place to "fix" `E3`.** **A red row that fails because `E3` is defective is the CORRECT
  red outcome for `M-1`..`M-3`** (`§3.2 F-5`).
- **It is NOT a rendered-fact suite.** **Any row asserting a geometry, an applied style on a real element
  or a real pointer is refused at authoring time** (`§3.2 F-13`).
- **It is NOT the register's own evidence.** **A row may not be reported as executed if it was sampled**
  (`§5.5.2` item 3).

### 4.4 The stop conditions (binding)

| id | Stop condition |
| --- | --- |
| **S-1** | **A STATIC ROW PASSES FOR A VIOLATING BYTES-LEVEL FORM** (a token split across a literal, spelled inside a comment, or realm-rooted-computed) ⇒ **STOP: the row is UNFALSIFIED and must be rewritten before any other row is authored**, and the evasion class is added to the scan's corpus (`§3.4`'s preamble). |
| **S-2** | **A ROW'S CENSUS IS NOT NAMED** (a count without its names, a "the members" without the list) ⇒ the row FAILS its own text (`§3.4 R-1`/`R-2`). |
| **S-3** | **A CLAUSE CLAIMS A MAGNITUDE, A DISTANCE OR A SECOND COORDINATE READ FOR THIS UNIT** ⇒ **STOP**: this unit derives the size from the pointer through the CALLER's mapping (`§0A` note 4) and reads the coordinate in ONE place; a magnitude claim is the `E3` `ARITHMETIC` question re-opened where the ruling does not reach. |
| **S-4** | **A CLAUSE MOVES THE INVALID-RELEASE DECISION TO THE RELEASE TURN** (`§0A` note 6's working default) ⇒ **STOP and take it to the architect**: `E3`'s `reset` is legal only for an ACTIVE gesture, and at the session's own `pointerup` terminal there is no active handle. **A pass that "solves" it by calling `session.end` itself is `S-5`.** |
| **S-5** | **A SECOND WRITER, A SECOND CLAMP, A SECOND TERMINAL, OR A MODULE-SIDE `commit` CALL** ⇒ **STOP**: `E3` is the single sink writer and `clampToBounds` is the single clamp, and **a module of this unit that calls either itself violates the composition it exists to demonstrate** (`§0A` note 9). |
| **S-6** | **A CAPTURE CALL IN THE MODULE'S OWN BYTES, OR A RELEASE CALL ANYWHERE** ⇒ **STOP**: the capture call is the session's, inside `begin`, after establishment, and the frozen session has **no release clause** (`§0A` note 10). |
| **S-7** | **A ROW ASSERTS A RENDERED FACT THE NODE SUITE CANNOT SEE** (a geometry, an applied style on a real element, a cursor's visual effect, a layout, a real pointer) ⇒ **STOP**: the row is a `[U]` row and must be **listed in `§5.2`'s `[U]` set BY NAME** — **never authored as a `[T]` row and never moved to the live leg silently** (`§3.2 F-13`; `docs/specs/zones.md` `§4.4 S-6`). |
| **S-8** | **A PREVIEW IMPLEMENTED AS A GRAPH DISPATCH** ⇒ **STOP and re-derive**: the re-render replaces the element under the pointer, so the session's own listener is on a dead element (`§2.5` item 5, `§7a.1` item 3). |
| **S-9** | **A CLAUSE RE-EXPRESSES AN `E3`, SESSION, `U-CENSUS`, `U-ZONES`, `U-PROJ` OR `U-RELOCATE` RULE, OR PULLS ONE IN "FOR CONVENIENCE"** ⇒ **STOP**: this unit composes; it does not restate (`§2.6` item 7). |
| **S-10** | **A ROW READS THE IMPLEMENTATION INSTEAD OF THE DOCS** (an assertion derived from the module's bytes, a helper copied from `E3`'s test file, a constant taken from the prototype rather than from this spec) ⇒ **STOP**: this is the exact mechanism that produced the parked `E3` cycle's *"~17 of ~20 defects in the proof"* record (`docs/pending.md` §I-septies's reasoning clause), and **a row whose expectation comes from the bytes rather than from a clause is a review finding.** |
| **S-11** | **A GEOMETRY CLAIM MOVED SILENTLY TO THE LIVE LEG** ⇒ **STOP**: the `[U]` set is **fixed at filing time, by name** (`§5.2`), and a claim that acquires its layer later is the false-green class the geometry clause exists to close (`docs/specs/gutter.md` `§5.2`'s three-part refusal, carried in spirit at `§3.2 F-13`). |
| **S-12** | **THE LIVE BATTERY IS PARKED FOR A NON-STRUCTURAL REASON** ⇒ **STOP**: this unit may park its battery **only for a STRUCTURAL reason** — an OS-owned native dialog, or a scope the leg cannot reach — **and the reason must be recorded with its evidence** (`§5.2` leg 5). **Convenience is not a structural reason.** |
| **S-13** | **A ROW'S REMEDY LIES IN `E3`'S DENIED PATH AND THE PASS FIXES IT THERE ANYWAY** ⇒ **STOP**: the finding is `OWED — E3-SIDE`, reported to the supervisor (`§3.2 F-5`, `§3b`). |

### 4.5 Delegation gate

**The unit is delegable when, and only when, all of the following hold** (`AGENTS.md` item 9):

1. **This spec is FILED** (it is).
2. **A TestWriter has RUN and REPORTED the red set** for `tests/gutter-ui.test.ts`, **with its failing
   set verbatim**, **BEFORE** any implementation — and the red's numbers are recorded in the DONE row.
3. **The three `§7a.1` items are routed** — **this filing reports them rather than quietly adopting them**,
   and the supervisor must route them (they have working defaults, so the red may be authored against the
   defaults). **⟶ UPDATED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`): item 2 (THE INVALID-RELEASE
   TIMING) IS NO LONGER AN OPEN QUESTION — the architect's release clause was read against the frozen
   session and RULED (`§0A` note 6's ruling clause, `§2.3` items 5/9, `§2.6` item 5): the valid path is the
   session's own `end`, the invalid path is the `reset` terminal taken during the drag, and the
   `U-GSESSION` alternative is NAMED AND REJECTED-FOR-NOW. Items 1 and 3 remain WORKING DEFAULTS and are
   still the supervisor's to route.** **⟶ AND A FOURTH ITEM IS NOW OWED TO THE ARCHITECT/A SUPERVISOR
   ROUTING DECISION: the `E3`-SIDE capture opt-in (`§2.6` item 4, `§8`) — the withdrawn claim's remedy
   lives on a DENIED path, so it must be routed, not silently dropped.** **⟶ SWEPT 2026-09-27, THE
   GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): THE TWO *"ARCHITECT CHOICES"* THIS ITEM ROUTED ARE BOTH
   CLOSED — the commit write's ELEMENT-IDENTITY QUESTION (`E-2`) by the architect's *"Reuse"* (identity
   PRESERVED, NO rebind, the SIXTH role NOT OWED, the structural-write boundary stated, the live
   second-gesture evidence carried by `§5.U` `U-8`(e)) and the DECLARED-TERM QUESTION (`E-3`) by the
   architect's *"Re-grain."* (the declared terms ARE drive counts; the declared total is `134` =
   `15 + 15 + 15 + 45 + 20 + 12 + 12`) — `docs/pending.md` §I-duodecies/§I-terdecies, `§7a.1` items 4/5,
   `§2.1` item 8, `§5.5.1`/`§5.5.2`/`§5.5.3`, `§5.3` item 11. The as-filed wording above is kept visible;
   a pass that ROUTES `E-2`/`E-3` as still-owed architect choices is reading a spent item, and a pass that
   prints the pre-re-grain total `140` (or the as-filed `127` prediction) FAILS `§5.3` item 11.** **The
   only items from this clause that REMAIN OPEN are the `E3`-SIDE capture opt-in above and the two
   `§7a.1` defaults (items 1 and 3), with `E10`'s own routing still owed on the red-set condition.** **⟶ AND TWO MORE ITEMS ARE NOW
   OWED TO THE ARCHITECT, added 2026-09-27 by the gate-1 step-3 repair pass (`§R.2`): the COMMIT WRITE'S
   ELEMENT-IDENTITY QUESTION (`E-2`, `§7a.1` item 4 — a rebind would be a SIXTH wiring role and is NOT
   granted until ruled) and the DECLARED-TERM QUESTION (`E-3`, `§7a.1` item 5 — adopting the honest
   distinct figures would move the register total `140 → 127` and three sites with it).** **The
   delegation gate's ambiguity condition is therefore NOT satisfied by this pass either: `§4.5` still
   records the unit as non-delegable on the red-set condition, and the supervisor must route `E-2`/`E-3`
   as well.**
4. **The live battery's preconditions are NAMED, not assumed:** a usable `DISPLAY` for the `npm run ui`
   leg (`docs/specs/ci-ui-leg.md` `§6`), `npm run divergence` green **on the same source revision immediately before, with no intervening source edit** (**⟶ QUALIFIED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): the as-filed wording *"for the same built tree"* is not mechanically true — both legs rebuild**) (`§5.2` leg 4), and the driver's reachability limits stated (`§5.2` leg 6). **`U-DIVERGENCE-EXT`
   (`C2`) is NOT a precondition of this unit** — **this spec claims no `[D]` row.**
5. **The demo-envelope authoring site is acknowledged as an in-scope `src/**` change** — this unit is
   **not** an additive-only unit, and a delegation prompt that forbids `src/**` edits **cannot land it**
   (`§5.1`). **⟶ EXTENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`): the RENDERER WIRING is an
   in-scope `src/renderer/**` change too — `src/renderer/renderer.ts` + `Runtime.elementForNodeId` in
   `src/renderer/runtime.ts` (`§5.1` allow-list rows `10`/`11`, `§R.1`) — so a delegation prompt that
   forbids `src/**` edits OR that forbids the renderer cannot land this unit either.** **What such a prompt
   may still forbid, and MUST: `src/main/**`, the preload/MCP surface, the shell chrome, every frozen pair
   (`src/shared/gesture-session.ts` + its test, `src/shared/gutter.ts` + its test) and every sibling
   `src/shared/*` module.**

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST. The
frozen and forbidden files are NAMED FIRST:**

0. **⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`/`R5`): THE FOUR FROZEN FILES, NAMED FIRST AND
   WITHOUT QUALIFICATION** — **`src/shared/gesture-session.ts` and `tests/gesture-session.test.ts`**
   (`U-GSESSION`, `DONE`, FROZEN) and **`src/shared/gutter.ts` and `tests/gutter.test.ts`** (`E3`, landed
   green at `90/90` with its checks PARKED). **NO clause of this file, no red row, no register row and no
   repair pass may edit, patch, re-tune or "fix" any of the four** — a finding whose remedy lies in them is
   `OWED — E3-SIDE` and is reported to the supervisor (`§3b`, `§3.2 F-5`). **They stay DENIED after the
   R1 ruling exactly as before it: the renderer wiring was admitted, the frozen pairs were NOT.**

1. **`src/shared/gesture-session.ts`** and **`tests/gesture-session.test.ts`** — **FROZEN** (`U-GSESSION`
   is `DONE`; this unit composes it).
2. **`src/shared/gutter.ts`** and **`tests/gutter.test.ts`** — **`E3`'s own module and test file**: this
   unit **composes** them, **reports** findings against them, and **never edits them** (`§0A` note 12).
3. **`docs/specs/gutter.md`** and **`docs/specs/gutter-review.md`** — `E3`'s contract and the closed
   gate-1 record: **derived, never re-litigated, never edited**.
4. **The Electron shell chrome and the process boundaries** — **`src/main/**`** (main process, preload,
   MCP server, the security store, `standalone.ts`, `battery-host.ts`) and **the shell-chrome members of
   `src/renderer/**`** (`index.html`, and every shell concern: the `#app`/`#panes` mount elements, the
   window frame, the preload bridge wiring) — **the shell's own chrome is the ONLY exception to the
   provident-authoring constraint, and this unit needs no piece of it.** **The preload/MCP surface is denied in particular: no tool, no resource, no group, no
   `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, no
   registration site.**
   **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`) — THE DECISIVE ONE:** the as-filed item
   read *"and **the rest of `src/renderer/**`** (`runtime.ts`, `renderer.ts`, `secure-panels.ts`,
   `index.html`)"*, i.e. **it denied the renderer by INHERITANCE from the sibling mechanism units' denied
   sets** — which is WRONG for a UI unit: with no in-app composition site the affordance can never be
   constructed in a running app, so **the unit chartered as *"the place the family becomes observable"*
   was observability-empty by construction** (`docs/pending.md` §I-octies's `[DECISIVE]` finding). **The
   architect's ruling — *"Yes the UI change is allowed to touch the renderer — the UI needs to be
   rendered"* — removes that inheritance, BOUNDED, and the two wiring files move to the ALLOW-LIST
   (rows `10`/`11` below).** **`src/renderer/secure-panels.ts` STAYS DENIED** (another unit's isolated
   graph), and **a renderer edit that hand-writes DOM is a FINDING** (`AGENTS.md`'s project-wide
   constraint; `§3.4 R-13`) — **the only renderer-side code this unit may add is the WIRING, never UI
   content.**
5. **`package.json` · `package-lock.json` · `tsconfig.json` · `vitest.config.*`** — **no script, no
   dependency, no devDependency, no include/exclude, no compiler option.** **In particular the live legs
   add NO SCRIPT: `npm run ui`, `npm run divergence` and `npm run mcp` already exist.**
6. **`scripts/**`** — no leg driver, no helper, no change to `electron-ui.mjs` / `electron-spawn.mjs` /
   `electron-divergence.mjs` / `mcp-cli.mjs`.
7. **Every other sibling `src/shared/*` module and its test file** — `zones.ts` · `census.ts` ·
   `layout-projection.ts` · `owned-list-host.ts` · `slot-host.ts` · `mount-invariant-guard.ts` ·
   `dom-shim.ts` · `types.ts` · **and every existing test file of another unit**.
8. **Every sibling unit's artifact** — another unit's `*-greens.md`, its review record, its tracker-only
   rows, and **`docs/specs/ci-ui-leg.md`'s normative clauses**.
9. **The page-design layer** — `docs/skills/designing-pages.md` **does not exist** and this unit creates
   **no** such file (`§3.4 R-10`).

**THE ALLOW-LIST — every file this unit may touch, NAMED, with its change:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | **`src/shared/gutter-affordance.ts`** | **NEW — the affordance module.** The **three value exports + seventeen type declarations** of `§2.1` (**⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the as-filed cell read *"four value exports + seven type declarations"*; the ruled census is `3` + `17` = `20`, all named at `§R.3`**), and nothing else. | always |
| 2 | **`src/shared/demo-envelope.ts`** | **THE AUTHORING SITE — an EDIT, bounded to ONE new authored gutter card** (`§2.1` item 7): the affordance node, the target node, the status node and the authored handler body/bodies, **as envelope data**. **No existing node is renamed, re-ided, removed or re-authored**, and the file's existing comment block is **extended, never rewritten** (`RCA-8`'s append rule). **⟶ EXTENDED BY ONE CELL 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): THIS FILE ALSO HOMES THIS REPO'S *ONE EXAMPLE IMPLEMENTATION* OF THE ELEVEN CALLER SEAMS** (the `cursorOf`/`axisOf`/`sizeFromPointer`/`boundsOf`/`startSizeOf`/`resizableOf`/`commit`/`applyPreview`/`applyCursor`/`pointerOf`/`moveTypeOf` implementations the wiring passes in). **IT IS AN IMPLEMENTATION, NEVER THE CONTRACT** — the contract is the module's exported seam types plus `§R.3`'s seam table — **and the demo must not be cited as normative by any row, spec or fork.** **No OTHER demo-side file is added, and `src/shared/gutter-affordance.ts` (row 1) is where the TYPES live.** | always |
| 3 | **`tests/gutter-ui.test.ts`** | **NEW — the red set (`§4.2`), the register rows and the static/existence rows.** | always |
| 4 | **`docs/specs/gutter-ui.md`** | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation. | always |
| 5 | **`docs/specs/gutter-ui-greens.md`** | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/gutter-ui-*.md` of this unit. | the pass that produces it |
| 6 | **`docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**`** | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, **the `E3`-side finding's row if one is raised**, and a **sibling spec only for a dated status/annotation correction that changes NO normative clause**. | the pass that produces them |
| **10** | **`src/renderer/renderer.ts`** | **⟶ ADDED 2026-09-27 (`§R` `R1`) — THE RENDERER WIRING, BOUNDED TO FOUR ROLES AND NOTHING ELSE:** **(i)** construct the **session** (`createGestureSession({source, commit})`) and, through the module's factory, **`E3`'s controller**; **(ii)** **resolve the affordance's rendered element and the target element FROM THE PRODUCING GRAPH** (through `Runtime.elementForNodeId(...)` — never a selector, never a lookup, never a created element); **(iii)** call **`createGutterAffordance({…})`** and **`.attach()`**; **(iv)** **drive the preview write** (`applyPreview`) and the cursor write (`applyCursor`). **It authors NO UI content** (`§2.1` item 8, `§3.4 R-13`; `AGENTS.md`'s project-wide constraint — **a renderer edit that hand-writes DOM is a FINDING**). **⟶ CLARIFIED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A3`): THE LICENCE IS FIVE ROLES — (i)–(iv) above PLUS THE FIFTH, `commit` — and the FIFTH IS PINNED: ONE `Runtime.applyCommand` `state-slice` write to the AUTHORED STATUS NODE, carrying the CLAMPED value, with NO preview write, NO style/`styles` write, NO authored-handler-body dispatch, and NO rebind and NO re-resolution of the affordance element after it (`§2.1` item 8(v), `§R.2` `R-13`, `§3.1 M-19`, `§3.3 I-15`; `docs/pending.md` §I-duodecies).** **A wiring whose `commit` performs any OTHER write, or a second write, or a rebind, FAILS `§3.4 R-13` and `M-19`.** | always |
| **11** | **`src/renderer/runtime.ts`** | **⟶ ADDED 2026-09-27 (`§R` `R1`) — THE ONE BOUNDED GRAPH-READ METHOD** `elementForNodeId(id: string): unknown \| null` (`§2.1` item 8): **the producing graph's own id-index first, then `data-node-id` within the live mount**; **TOTAL (never throws)**; **no selector, no `closest`, no `querySelector*`, no `getElementById`, no element creation**, and **no other change to this file** — it stays the host's graph/rendering runtime, and **the R1 ruling admits NOTHING here beyond this one read-only resolution method**. | always |
| **12** | **`docs/FORKER.md`** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A4`) — THE FORK-FACING COMPATIBILITY STATEMENT, bounded to the ONE block `§R.4` `C-A4` authors (the seam contract's downstream obligations: what a fork must supply, what a seam change obliges downstream, the three homes of the contract, and the proof-status note).** **It may NOT restate this spec as normative, may NOT carry a second copy of the seam table, and may NOT add a row id, a §-number or a contract clause of its own: the block is a downstream-facing SUMMARY whose authority is the module's exported types + `§R.3`'s tables.** *(The id `12` was FREE: this allow-list runs `1`–`6` and `10`/`11`, and the gap `7`–`9` is the deliberate one `§5.1`'s scope-id note records — so nothing is renumbered.)* | the pass that authors the statement, and any pass that must keep it in step with a seam change |

**THE COMMIT-RANGE SCOPE RULE, stated so a scope row cannot mistake correct gate work for a boundary
violation** (the lesson `docs/specs/gutter.md` `§5.1` records): an allow-list census asserted over a
**commit range** must scope its list **to THIS UNIT'S OWN ARTIFACTS**, and **must NOT read a later unit's
commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this unit's diff.** **The
DENIED set is the exception and binds the WHOLE committed set** (`§3.4 R-9`).

**⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`/`R8`(g)) — TWO SCOPE-ID CLARIFICATIONS, so no
row is read against the wrong numbering:**

1. **`§5.1`'s OWN ROW NUMBERS ARE NOT `§3.4`'s.** This subsection numbers its **DENIED items** `1`–`9`
   and its **ALLOW-LIST rows** `1`–`6` **and `10`/`11`**. **`10`/`11` are the two RENDERER-WIRING rows and
   the gap `7`–`9` in the allow-list numbering is DELIBERATE** — it keeps the two new rows' ids from
   colliding with the pre-repair rows a citation may already name (`RCA-8`'s no-silent-renumber rule).
   **A citation written *"`§5.1` row N"* means the allow-list row; a citation written *"`§3.4 R-N"* means
   the static row; and a citation written *"`§5.1` item N"* means the DENIED item** (the DENIED list runs
   `0`–`9` since this repair; **`§5.1` item `0` is the frozen-files clause this repair added FIRST — item
   `1` is the pre-repair clause naming the same frozen session pair, KEPT so the as-filed text stays
   visible, item `2` is `E3`'s denied pair, and item `6` is `scripts/**`**). The bare `R-9`/`R-11`/`R-12` citations that used to appear inside this subsection
   **meant its OWN rows** and have been repointed where they meant a static row (`§2.2` P-7 → **`§3.4
   R-11`**, `§3.3 I-12` → **`§3.4 R-11`**, `§3.2 F-11` → the withdrawn-capture tombstone).
2. **THE DENIED-SET ROW'S SCOPE, STATED HONESTLY: it binds TRACKED FILES.** `§3.4 R-9`'s census is
   asserted over the **git-visible change set** (a commit range, or the staged/tracked diff) — **an
   untracked file cannot be bound by a row that cannot see it**, and this contract does not pretend
   otherwise. **THEREFORE: an untracked file that a pass INTENDS to add is a scope question for the
   ADVERSARIAL pass and the SUPERVISOR, not a FAIL of `R-9`** — and **the unit's own new artifacts (the
   module, the test file, this spec, its greens set) are EXPECTED to appear untracked at red/green time
   and MUST be committed by the supervisor at the gate boundary** (`RCA-8`(a)/(e)). **A pass may not cite
   this clause to keep an uncommitted sibling edit** — the clause is about the ROW's reach, not about a
   licence.

### 5.2 The legs this unit MUST run — **SEVEN, and THE LIVE BATTERY IS MANDATORY**

| # | Leg | Command (exact) | Layer | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | **`npm test`** | **[T]** | the red (`§4`) **and** the green, **register rows included**. **Envelope/pure-layer evidence only** (layer anchors 1/2). |
| **2** | **typecheck** | **`npm run typecheck`** | **[H]** | **`src/**` ONLY** — `tsconfig.json`'s `include` is `src/**/*.ts` and its `exclude` names `tests`, so **this leg never reads this unit's test file or its register tables** (`docs/pending.md` §H's standing limit). |
| **3** | **build** | **`npm run build`** | **[H]** | esbuild, **five bundles**. **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): THE AS-FILED *"FIVE BUNDLES"* WORDING IS INEXACT AND STAYS VISIBLE AS SUCH — the build is REALLY FOUR ESBUILD OUTPUTS PLUS A COPIED `index.html`.** **The ruled claim is therefore: FOUR esbuild outputs + ONE copied entry document = the FIVE artifacts the leg's own census names, with the artifact NAMES/ENTRIES UNCHANGED and any change (a fifth esbuild output, a renamed entry, a missing copy) a FINDING.** **UNLIKE `E3`, BYTE-IDENTITY IS NOT THIS UNIT'S CLAIM**: the affordance module is **reached by the renderer bundle through the WIRING at `src/renderer/renderer.ts`** (`§R.1`, `§5.1` row `10`), so the renderer bundle **DOES** carry it and **the byte-identity claim `E3` made is FALSE for this unit by construction**. **The honest claim is therefore: the five bundles are REBUILT and their names/entries are UNCHANGED (no new entry point, no new output file), and the delta is STATED MEASURED, not asserted byte-identical.** **⟶ WIDENED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`) TO THE HONEST DELTA THE CHANGE-ANALYSIS MEASURED — this cell previously said only *"the renderer bundle DOES carry it"*: THE RENDERER BUNDLE NEWLY CARRIES **THREE MODULES IT HAS NEVER CARRIED** — `gutter-affordance.ts` (the unit's NEW module) + `gesture-session.ts` + `gutter.ts`, the last two reached through the module's VALUE imports (`POINTER_TYPES`, `clampToBounds`) — **while the FOUR `src/main/**` OUTPUTS STAY BYTE-IDENTICAL**, **the FIVE-ARTIFACT CENSUS IS UNCHANGED**, and **the demo-keyed outputs DRIFT** (the census, `get_rendered_html` and `get_markdown` — `§3.3 I-11`, `§3.5 R-9`, `§5.U` `U-7`). **A pass that reports this leg as *"byte-identical bundles"* (as `E3` legitimately did) FAILS this cell; the renderer bundle's growth is the EXPECTED, MEASURED delta, and a bundle-census change (a sixth output, a renamed entry, a missing copy) is a FINDING.** **A bundle CENSUS change (a sixth output, a renamed entry) is a FINDING.** **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R1`/`R2`): the as-filed note argued that *"the demo does NOT"* import the module and that its consumer was *"the harness and, in the demo's live path, the caller that resolves elements"* — a caller that existed NOWHERE, which is exactly the observability hole the gate-1 review's `[DECISIVE]` finding names. That reasoning is SUPERSEDED: the wiring exists, it is allowed, and it is why the delta is a MEASURED bundle-growth figure rather than a projected one.** |
| **4** | **standalone strict `tsc` over the unit's own test file** — the named leg for `R-1`(b) and `R-8` | **`npx tsc --noEmit --strict --target ES2022 --lib ES2022,DOM,DOM.Iterable --module ESNext --moduleResolution bundler --types node,vitest/globals tests/gutter-ui.test.ts`** | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** the type names are **erased at run time** (the **`17`** of them in the ruled census, **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the as-filed cell read *"the seven type names"* — the seam ruling added the nine seam types and restored `GutterAffordanceStats`**), and **leg 2 does not compile `tests/**` at all** — so a renamed, removed or unexported type name is **only** visible here (`docs/specs/gsession.md` `§5.2` leg 4's precedent, whose red was `TS2353`). **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script, no dependency and no diff-scope row**. **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): the as-filed invocation OMITTED `--lib ES2022,DOM,DOM.Iterable`, which `tsconfig.json` supplies for the main typecheck — without it the standalone leg compiles with the DEFAULT library set, the DOM types this unit's test file and module reference are absent, and the leg can report errors (or omit errors) for a reason that has nothing to do with the census. THE RULED INVOCATION CARRIES THE FLAG, above.** |
| **5** | **THE REAL-DOM LEG — MANDATORY** | **`npm run ui`** | **[U]** | **This is the leg that carries this unit's ONE real-DOM measurement and its `[U]` PRECONDITION** (the as-filed wording — *"the leg that makes every rendered claim of this unit observable"* — is corrected below), and **it is MANDATORY for this unit and NEVER PARKED-BY-DEFAULT** (ruling 5; `docs/pending.md` §I-septies's admission ruling). **It is `npm run build && node scripts/electron-ui.mjs`.** **Its precondition is leg 4 of the run's own pinned sequence: `npm run divergence` green for the SAME BUILT TREE** (`docs/specs/ci-ui-leg.md` `§5`) — **⟶ QUALIFIED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): THE *"SAME BUILT TREE"* CLAIM IS NOT MECHANICALLY TRUE, and this contract no longer asserts it as if it were. MEASURED FACT: BOTH `npm run ui` AND `npm run divergence` REBUILD (each runs the build itself), so the two legs do NOT read one frozen artifact set — what they share is the SOURCE TREE and the build configuration, not a byte-frozen output.** **THE HONEST CLAIM THE DONE ROW MUST MAKE: `npm run divergence` was GREEN ON THE SAME SOURCE REVISION, IMMEDIATELY BEFORE the `ui` leg, WITH NO INTERVENING SOURCE EDIT** — and **a pass that reports *"the same built tree"* as a mechanical identity FAILS this note.** (The residual risk is recorded at `docs/pending.md` §I-decies and carried here so the leg's own precondition is not over-read.) **⟶ CLARIFIED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): THE PRECONDITION'S PRECISE FORM IS *"`npm run divergence` IS GREEN ON THE SAME SOURCE REVISION, RUN IMMEDIATELY BEFORE THE `ui` LEG, WITH NO INTERVENING SOURCE EDIT"* — the two legs REBUILD, so no byte-frozen artifact set is shared and a claim of a shared BUILT TREE is a FALSE RECORD. THE AS-FILED WORDING *"green for the SAME BUILT TREE"* is kept visible above and is NOT the honest form; the DONE row must print the SOURCE-REVISION form.** **a red precondition **exits `2` before any measurement**, a missing display **exits `3`**, and **neither is a green**. **Its exit codes are `{0,1,2,3}` with no fifth code and no skip.** **A retried green is still a green but is LABELLED `attempt=<k>`.** **THIS UNIT PARKS THIS LEG ONLY FOR A STRUCTURAL REASON** — an OS-owned native dialog, or a scope the leg cannot reach — **never for convenience, and the reason must be recorded with its evidence** (`§4.4 S-12`). **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R2`) — WHAT THIS LEG MEASURES, AND WHAT IT DOES NOT. The as-filed reading of this leg implied it *"exercises the pointer half"* of the interaction. IT DOES NOT, and the leg's own contract says so in its own words (`scripts/electron-ui.mjs`'s `R4` honest-limits line: *"NOT that provident.dispatch is a real gesture (it carries an event name, no coordinates)"*).** **MEASURED FACTS about this leg, read from the leg's own script this pass:** **(i)** it takes **exactly ONE measurement** (`measurementCount === 1`, and a second probe THROWS) — so it can carry **no second measurement and no U-row battery**; **(ii)** it **loads its OWN probe envelope** through `provident.load` before measuring (so the demo's authored gutter card is **replaced**, not measured, in boot A); **(iii)** it **dispatches `provident.dispatch` with an event NAME and NO COORDINATES** (the probe envelope's own `'click'` handler does the layout/computed-style reading in the real realm); **(iv)** its assertion set is the leg's own **`R0`–`R4`** rows (`UI RESULT: <n> failures (<g>/<n> assertions green …)`).** **THEREFORE: this leg is this unit's `[U]` PRECONDITION AND ITS ONE REAL-DOM MEASUREMENT — it is NOT the instrument that measures `§5.U`'s rows, and no row of this unit may claim it does.** **`§5.U` item 4 carries the corrected instrument assignment; `§3.3 I-11` and `§7` item 5 keep the mandate (the leg MUST run) with the corrected scope.** |
| **6** | **THE PROJECT'S LIVE DRIVER, against the RUNNING app, exercising the interaction through the reachable surface** | **`npm run divergence`** (the precondition and the `N = 9` identity leg) · **`npm start`** (boots the app for a live target; `electron .`) · **`npm run mcp -- --target http --port 3787 targets`** · **`npm run mcp -- --target http --port 3787 html`** · **`npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown`** · the same four commands against the **battery** target (`--target battery`, the default) where a live window is not needed. | **[U]** + **[H]** | **`scripts/mcp-cli.mjs` IS the project's live driver** — there is **no `scripts/live-drive.mjs`** in this tree (globbed `scripts/*`: `mcp-cli.mjs`, `electron-divergence.mjs`, `electron-spawn.mjs`, `electron-ui.mjs`), and the CLI is the driver the repo actually ships. **HONEST REACHABILITY, stated rather than assumed: the MCP `dispatch` surface carries an event NAME and serializable args and NO COORDINATES** (`docs/decisions.md` `MCP-ENDPOINT`; `docs/specs/gsession.md` `§2.3` item 1(d): the session's handler *"takes no parameter"*), so **the pointer-driven half of the interaction CANNOT be driven from the MCP tools** — it is exercised by **the module's own drives with synthetic `pointerdown`/`pointermove`/`pointerup` event objects through the source seam (`[T]`), by a MANUAL operator interaction recorded per `§5.U` item 4, and — for the measurement it actually takes — by leg 5's own probe** (`§R` `R2`: leg 5 loads its OWN probe envelope and dispatches an event NAME with no coordinates, so **A ROW THAT CLAIMS `npm run ui` DROVE A DRAG IS FALSE**). **A row that requires the MCP surface to carry a coordinate is `§4.4 S-3` and does not land.** **What the MCP surface CAN and MUST be used to observe, recorded exactly:** the authored card's **census and vocabulary** (`targets`), the **rendered HTML** including the `data-node-id` attributes (`html`), and the **authored handler's dispatch result** (`dispatch`, which proves the affordance is provident-reachable rather than hand-written DOM). **A live-battery record that claims a coordinate was driven through `provident.dispatch` is a FALSE RECORD and a review finding.** |
| **7** | **THE LIVE-BATTERY RECORD** | **not a command**: the pass records, per leg, **the exact command, its exit code and its observed values** — e.g. for leg 5: *`npm run ui` → exit `0`, `UI RESULT: 0 failures (…)`, the ONE measurement and its label, `retries=<k>`*; for leg 6: *`targets` → the card's node ids and handler names; `html` → the affordance element's `data-node-id` and its authored style; `dispatch` → the handler's `{results, dirtied}`* — **and the record states explicitly which claims are `[U]` and which are `[T]`/`[H]`** (`§5.3` item 6). | **[U]** + **[H]** | **A DONE row whose live-battery half is a promise rather than a record is a review finding.** |

**THE `[D]` LEG IS NOT CLAIMED.** **`U-DIVERGENCE-EXT` (`C2`) does not exist** (the scenario-envelope
channel + the set-wise attribute-presence extractor), so **no `[D]`-shaped row of this unit is runnable**:
**a row needing an attribute-presence extractor or a divergence-shaped comparison is NOT authored**, and
**`npm run divergence`'s green is a PRECONDITION and an identity check — never this unit's evidence**
(`docs/specs/ci-ui-leg.md` `§5.3`).

**THE `[U]` ROWS THIS UNIT OFFERS, NAMED AT FILING TIME** (so none is "discovered" later, `§4.4 S-11`):
**(i)** the affordance element and its authored card are **present in the real renderer's DOM** and carry
their authored `data-node-id`s; **(ii)** the authored **base `cursor` declaration is the applied
`cursor`** on the affordance element in the real renderer (an **applied-style** reading, read back through
the existing tools — `get_rendered_html` — or the leg's own measurement channel); **(iii)** the
**target element's rendered geometry is non-zero** before and after the interaction where the leg can
observe it; **(iv)** the **demo-census drift** caused by the authored card, **measured before and after**;
**(v)** the **`npm run ui` honesty rows** (`R0`–`R4` of `docs/specs/ci-ui-leg.md` `§3.0`) **as the leg's
own, not re-asserted here**. **Rows (i)–(iv) are `[U]` claims and are NOT `[T]` rows.**
**⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R2`) — THE INSTRUMENT OF EACH `[U]` ROW, SO NONE
IS OVER-CLAIMED:** **(i) is read by `npm start` + `npm run mcp -- --target http --port 3787 targets` and
`… html`** (`data-node-id`s and the authored ids — a shipped instrument); **(ii) SPLITS**: the **authored
base `cursor` declaration** is a **markup** reading — `get_rendered_html` returns the mount's markup, so the
authored declaration is visible there, while the **browser-applied computed cursor** and the **hover write
through `applyCursor`** are `MANUAL OPERATOR` observations (no shipped tool reads a computed style on the
demo's element, and `npm run ui`'s ONE measurement is taken on its own probe envelope); **(iii)** the
**target element's non-zero rendered geometry during a drag** is a `MANUAL OPERATOR` observation for the
same reason; **(iv)** is read by the same two shipped tools as (i), against a **before** reading taken
BEFORE the authored card lands; **(v)** is the leg's own and never this unit's.** **A row of this list that
claims a shipped instrument where the table at `§5.U` item 4 says `MANUAL OPERATOR` FAILS `§5.U`'s clause
(iv).**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE
items**:

1. **Unit + wave + status**: `U-GUTTER-UI` · wave **E** (ledger row `E10`) · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"a provident-authored gutter affordance in this
   repo's own demo envelope plus the `src/shared` module that wires it to the `E3` controller and, through
   it, the landed session — and nothing else: **the coordinate is read in ONE place**, **the cursor
   mapping and the size mapping are the CALLER's**, **the preview is a transient channel that is NEVER the
   sink**, **the capture opt-in is this unit's and never `E3`'s**, **the module writes to the sink
   NOWHERE**, and **no element, text, class or handler body is authored outside the envelope**."*
   **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): the as-filed quotation's
   clause *"the capture opt-in is this unit's and never `E3`'s"* IS STALE — the capture claim was
   WITHDRAWN (`§R` `R5`, `§2.6` item 4, `§3.3 I-13`, `§3.2 F-14`) — so the DONE row must print, in its
   place: *"this unit installs NO capture opt-in, passes NO `capture` field anywhere, and the need is a
   named `E3`-SIDE owed item"*. Everything else in the quotation stands.**
3. **The surface confirmation, explicitly**: *"`src/shared/gutter-affordance.ts` exports exactly **THREE
   value exports** (`createGutterAffordance`, `cursorDeclarationFor`, `domEventSource`) and **SEVENTEEN type
   declarations** (`ApplyCursor`, `ApplyPreview`, `AxisOf`,
   `BoundsOf`, `Commit`, `CursorOf`, `EventSourceLike`, `GutterAffordance`, `GutterAffordanceOptions`,
   `GutterAffordanceStats`, `MoveTypeOf`, `PointerPosition`, `PointerResolver`, `PreviewState`,
   `ResizableOf`, `SizeFromPointer`, `StartSizeOf`) — **`3 + 17 = 20` names** — with **exactly three
   import statements carrying FOUR bindings (the values `clampToBounds` and `POINTER_TYPES`, plus two
   type-only)**, and `src/shared/demo-envelope.ts` carries the
   authored gutter card **and this repo's ONE example implementation of the eleven caller seams**."*
   **A DONE row that prints a TWENTY-FIRST name, or that omits this census, is a review
   finding.** **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`/`§R.3` `R-SEAMS`): the
   as-filed print was *"FOUR value exports … and SEVEN type declarations (`CursorOf`, `EventSourceLike`,
   `GutterAffordance`, `GutterAffordanceOptions`, `PointerPosition`, `PointerResolver`, `PreviewState`) —
   `4 + 7 = 11` names"*; the seam ruling adds the nine seam types (the seam types are contract), the
   as-filed seven omitted `GutterAffordanceStats`, and the redundant `sizeFromPointer` VALUE is deleted, so
   the ruled print is the twenty above — and it
   must ALSO state that the demo's seam bundle is an EXAMPLE IMPLEMENTATION, never the contract.**
4. **THE FOUR PARKED `E3` OBLIGATIONS, EACH ANSWERED BY NAME — ⟶ STATUS/PRINT SHAPE RULED 2026-09-27,
   THE GATE-1 REPAIR PASS (`§R` `R8`(f)): `M-1`/`M-2`/`M-3` ARE `EXPECTED-RED AGAINST THE LANDED `E3``,
   AND THE DONE ROW MUST PRINT THEM THAT WAY — NEVER `green`.** **For each of the four, the DONE row
   prints: the row id, the MEASURED outcome, and — for `M-1`/`M-2`/`M-3` — the literal token
   `EXPECTED-RED — OWED — E3-SIDE (owner: the supervisor + an Implementer pass on `src/shared/gutter.ts`)`
   with the measured call counts that expose the parked defect.** **`M-4`/`M-5` are this unit's OWN
   obligations and may be reported green.** **The four:** — **the throwing-hook discard (`M-3`), the
   closed session read set (`M-1`/`R-5`, including the removal of the invented
   `registerCompositionWriter`/`registerCommit` seam), the disposed-session short-circuit (`M-2`), and the
   two-writer divergence on the real composition (`M-5`, now the LIVE-COMPOSITION two-reading check)** —
   **each with its row id and its measured
   outcome, and with any `OWED — E3-SIDE` finding reported to the supervisor and NOT fixed from this
   unit.** **A DONE row that does not name these four is a review finding** (ruling 3). **⟶ A DONE row
   that prints any of `M-1`/`M-2`/`M-3` as `green`, or that omits their owner, is a review finding too.**
   **⟶ SUPERSEDED IN PART 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A2`): THE
   `EXPECTED-RED — <measured counts> — OWED — E3-SIDE` TOKEN IS SPENT FOR ALL THREE — the host defects
   land FIXED at `cc7fba5` (`E3`-HOST-1/2/3), so the DONE row must print, per row, its GREEN reading
   AND the as-filed measured count BESIDE it as the record of what was fixed.** **`M-1`'s TWO HALVES
   ARE STILL REPORTED SEPARATELY — the static half (ii) and the runtime census (iii), and a DONE row that
   collapses them is a review finding — while `M-2`'s `E3`-side half is no longer `UNSATISFIABLE FROM THIS
   UNIT`. `M-4`/`M-5` remain this unit's OWN obligations and are reported on their own outcomes.**
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register
   rows ran and which were reported un-run**, and **which of the four obligations the red already exposed**.
6. **The legs' results WITH LAYER LABELS, and the LIVE BATTERY AS A RECORD**: `npm test` `[T]` · `npm run
   typecheck` `[H]`, **`src/**` ONLY** · `npm run build` `[H]` (the five bundles' **entry/name census
   UNCHANGED**, with the delta **measured**, per leg 3's note) · leg 4 (the standalone strict `tsc` over
   `tests/gutter-ui.test.ts`) · **leg 5 `npm run ui` `[U]` with its exit code, its result line and its
   retry label** · **leg 6's driver commands with their observed values** — **plus the explicit sentence
   that the node-suite green is envelope/pure-layer evidence and NOT assembled-app evidence, and that the
   `[U]` claims are the five named rows of `§5.2`.** **⟶ AND — ADDED 2026-09-27, THE `E-2` PASS — THE DONE ROW MUST ALSO RECORD `§5.U` `U-8`'s READING `(e)` VERBATIM: the second gesture on the SAME affordance after a commit, the SAME element object across the write (same `data-node-id` AND object identity), and a committed second drag.** **A DONE row that omits `(e)`, or that reports an element object differing across the write, is a review finding: that reading is the ONE measurement that distinguishes a reused element from a single-shot affordance, and no `[T]` row can make it.** **A DONE row that reports a live battery it did not
   run, or that omits the commands and the observed values, is a review finding.**
7. **The `[D]` status and the `E3`-side findings**: **`[D]` NOT claimed**, `PRECONDITION-GATED` on
   `U-DIVERGENCE-EXT` (`C2`), with the statement that **`npm run divergence`'s green was used as the live
   leg's PRECONDITION and as nothing else**; and **every `OWED — E3-SIDE` finding, with its owner**.
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, **MANDATORY per completed unit**,
   **including the gate-11 read-only PBT audit and the pool-versus-boundary check re-run against the
   LANDED tables**, **and the `§5.U` audit**), and the **blind-greens + per-unit documentation-review
   records** (`AGENTS.md` items 10a/10d, RCA-4/RCA-6 — the blind set is
   **`docs/specs/gutter-ui-greens.md`**). **A DONE row that cites no adversarial pass is a review
   finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this
   unit's dependency is the landed `E3` + session pair, that `E10`'s as-filed `PROPOSED`/`BLOCKED` cells
   are spent by the admission ruling (`docs/pending.md` §I-septies), and that `E3`'s OWN parked status is
   unchanged by this unit's landing.**
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken** counts, **each row's strategy id (`S-GU-*`)**, the **stop-after-5
    status** (`not triggered`, or `triggered at row …`), the **total attempts against the `≤400` cap**
    with **every row's count against the `≤100` per-row cap**, and **the explicit sentence that every row
    whose property text quantifies over a domain larger than its table carries the `(bounded)` marking and
    is NOT a proof of the unbounded universal it states.** **A DONE row that reports the register as
    "executed" without these per-row counts and strategy ids is a review finding.**
11. **The register's ARITHMETIC and its DUAL COUNT.** The DONE row must print the **total WITH its
    per-row terms** — **⟶ CORRECTED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R3`): the as-filed text here
    printed `142` = `22` + `10` + `15` + … and the cell of `P-GU-SM-2` prints `15`, so the as-filed `10`
    was the sixth mis-sum of this family. THE `R3` PRINT WAS:** **`140` = `22` (`P-GU-SM-1`) + `15`
    (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45` (`P-GU-IM-1`) + `20` (`P-GU-IM-2`) + `18` (`P-GU-TP-1`) +
    `12` (`P-GU-TP-2`)** — and **must reconcile
    that figure against the tables the test file actually produces**: **a total that is not the sum of its
    own terms is a review finding** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`,
    ACTIVE). **⟶ AND THE `E-3` RE-GRAIN SUPERSEDES THAT PRINT 2026-09-27 (the architect's *"Re-grain."*;
    `docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`) — THE
    DONE ROW MUST PRINT, AND THIS IS THE ONLY FORM IT MAY PRINT:** **`134` = `15` (`P-GU-SM-1`) + `15`
    (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45` (`P-GU-IM-1`) + `20` (`P-GU-IM-2`) + `12` (`P-GU-TP-1`) +
    `12` (`P-GU-TP-2`)** — **with the chain `15 → 30 → 45 → 90 → 110 → 122 → 134` and the subtotals
    `SM 45` · `IM 65` · `TP 24` = `134`, and with the caps read against those terms (`134 ≤ 400`, largest
    row `45 ≤ 100`, stop-after-5 `not triggered`).** **The `R3` print above is KEPT VISIBLE as that pass's
    own reading; a DONE row that prints `140`, `142` or `147` is a review finding.** **⟶ AND — ADDED
    2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`) — A TERM'S DERIVATION IS NOT
    A FREEDOM: the DONE row MUST NOT derive `P-GU-SM-1`'s term as *"`10` drives + `12` assertions"*: under
    the current ruling the term IS `15` — the DRIVES — and the `12` mid-drag observations are ASSERTIONS
    reported as a SEPARATE figure, while `P-GU-TP-1`'s term IS `12` — the DRIVES — with its `6`
    entry-point READINGS reported as a SEPARATE figure (`§5.5.1`'s cells, `§5.5.2` item 4's ledgers).
    `P-GU-SM-1` and `P-GU-TP-1` both stay `(bounded)`, and **an assertion or a reading counted inside a
    term is the `IM-4` over-strength class the re-grain exists to close** (`§7a.1` item 5).** **Where a row's attempts are several assertions over ONE execution, or a count of DISTINCT
    inputs rather than of DRIVES, the DONE row must report BOTH the declared attempts and the honest
    DISTINCT-DRIVE figure** — **⟶ RE-GRANULATED 2026-09-27 (`§R` `R3`), AND READ THROUGH THE `E-3` RE-GRAIN:
    `P-GU-IM-1` and `P-GU-TP-2` are the TWO rows that still carry two differing figures — `P-GU-IM-1`
    (`45` declared / `15` distinct value classes) and `P-GU-TP-2` (`12` declared / `10` distinct answer
    shapes); the AS-FILED form of this clause named two MORE (`P-GU-SM-1` (`22` declared / `15` distinct
    drives / `12` mid-drag ASSERTIONS) and `P-GU-TP-1` (`18` declared / `12` distinct drives)) — and for
    those two rows the re-grain makes the DECLARED term and the DRIVE figure the SAME number, with the
    `12` assertions and the `6` readings printed as separate figures beside the terms.** **The DECLARED
    figures are what the caps are compared against; a distinct figure that differs is
    reported BESIDE it and never substituted for it.**
12. **THE `§5.U` DELTA MATRIX AND ITS COVERAGE REPORT** (`§5.U`): the matrix as filed, the live runner's
    **structured coverage report** — **⟶ AMENDED 2026-09-27 (`§R` `R2`): the report is a MANUAL record (no
    shipped instrument emits it), filled from the per-row `instrument`/`cmd`/`exit`/`observation` fields of
    `§5.U` item 4's table, and quoted verbatim with `"emitter": "MANUAL"` — with its `summary.total`
    **equal to the matrix's `8` U-row count** (**⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS
    (`§R.3`): the as-filed cell read `7`; the `C-8` row `U-8` joined the matrix and the count moved with it**), the
    **read-only audit** on that report, the **`NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` labels** of
    `U-3`/`U-4`/`U-6` with their structural reasons, and **the recorded gap that the predicate's source document
    `docs/specs/user-flow-audit.md` does not exist in this tree** (its owner and its revisit condition).

**⟶ RECORDED: the `§5.3` → `§5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs NO fix** —
it is the same deliberate gap in the sibling specs (`docs/specs/gutter.md`, `gsession.md`, `zones.md`,
`census.md`, `projection.md`, `listhost.md`, `slothost.md`), recorded by their documentation reviews.
**`§5.3` is the DONE-row shape, `§5.5` is the property register and `§5.U` is the delta matrix; NO clause
is missing. Renaming or renumbering is FORBIDDEN for citation stability.** **`§5.U` sits AFTER `§5.5`
and BEFORE `§6` so that no existing `§`-number moves** (`§5.U` is a literal section label, not a
decimal — the gate instructions' own form).

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` (ACTIVE) applies: this unit AUTHORS BEHAVIOUR, so it is
CODE-BEARING and owes a typed `§5.x` register executed deterministically with no new dependency.**
**`§5.5.1` is the register, `§5.5.2` is its honesty block, `§5.5.3` is its arithmetic. There is no
`§5.5.0`** — this spec is filed **after** the gate-11 ruling and carries its register **from the start**,
so there is no superseded zero-row exemption to keep verbatim.

#### 5.5.1 THE REGISTER — **`7` typed rows in THREE families, and THE ROW COUNT IS SMALL ON PURPOSE**

**What this section is, in one sentence.** A **typed register of `7` rows** whose **genuine
quantifications** — (i) *the single-writer property over EVERY terminal path*; (ii) *the
preview-never-sinks property over EVERY observed move and every terminal*; (iii) *the cursor resolution's
totality over its whole enumerated input space*; (iv) *the release mapping's three arms*; (v) *the
drop-revert's zero-commit property*; (vi) *the closed read set and the coordinate uniqueness*; and (vii)
*the module's totality over hostile arguments* — are **executed here as quantifications over finite,
pinned enumerations**, **hand-rolled and deterministic, with no new dependency**.

**WHY SEVEN AND NOT MORE — THE LESSON THIS UNIT INHERITS, STATED AS A RULE.** The parked `E3` cycle's own
record (`docs/pending.md` §I-septies) is that **of the ~20 defects found in the whole cycle, THREE were in
product code and ~17 were in the PROOF** — a mis-sum, four wrong declared-vs-distinct figures, two
enumerations that did not match their own drives, a test helper that could not collect what it compared,
and a stale constant left by a removed harness channel. **THEREFORE, BINDING ON THIS REGISTER:
(a) `≤8` rows is a BREAKDOWN SIGNAL, not a ceiling — but A ROW THIS UNIT CANNOT DRIVE IS WORSE THAN NO
ROW, so no row is added to reach a count; (b) every row's table is the WHOLE of the behaviour it claims,
and a row whose table is smaller than its text says so with a `(bounded)` marking; (c) no row is authored
from the implementation's bytes (`§4.4 S-10`); (d) no total is printed without its terms; and (e) the
register does NOT carry a rendered fact — the rendered facts belong to the live leg, and `§5.5.2` item 3
says so plainly.**

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-GU-*`** (`GU` = this
unit) — so **a register row is never mistaken for a `§3` row** (families `M-*`/`F-*`/`I-*`/`R-*`) and
**never for a sibling's register** (`P-GT-*`, `P-GS-*`, `P-CN-*`, `P-ZN-*`, `P-PJ-*`, `P-LH-*`,
`P-SH-*`). **The three families:** **`SM`** = state machine / write counts · **`IM`** = invariants over
the composed seams · **`TP`** = totality. **The strategy-id prefix is `S-GU-*`, one per row.** **Type
algebra is `docs/specs/engine-pin.md` `§5.5`'s: `P-IM`** = invariant · **`P-SM`** = state-machine ·
**`P-TP`** = totality.

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/gutter-ui.test.ts`) — the file the
   red set already owes, and the file the register **rides as part of the red** (`§4.2` item 5).
   **NO row of this register is executed by a generator library, and NO row uses a seeded generator** —
   **so this register claims NO pinned seed**, and a later pass that adds one must add its seed, its step
   form and its pool length in the same cell.
2. **Exhaustive/finite enumeration over a fixed table, with every member declared and every expected
   outcome asserted per member.** **No `Math.random`, no wall-clock input, no shrinking, no adaptive input
   search.**
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows
   evaluated **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
   remaining attempts are abandoned and no further row starts). **A register row is never refused on the
   ground that "no PBT harness exists."**
4. **No row may be reported as executed if it was sampled** — every row's cell states its input set
   exactly, and **a row whose property text quantifies over a domain LARGER than its table carries the
   explicit `(bounded)` marking** (`§5.5.2` item 2).
5. **The register's own boundaries, named rather than silently relied on:** **(a) NO REAL POINTER INPUT IS
   NEEDED OR USED BY ANY ROW** — every row drives **a recording source double**, **element doubles**, **a
   recording session double or the landed session**, and **caller-supplied callbacks**; **(b) no `Proxy`
   whose traps return inconsistent answers across reads** is in any pool (the hostile shapes are **fixed**
   table members); **(c) each row's table is a SUBSET of the input space this contract pins**, and **its
   silence about a shape it does not list is a stated boundary, not an unrecorded omission**; **(d)
   `P-GU-SM-1` is the row that carries the single-writer discipline and `P-GU-TP-1` the module's totality
   — and NO OTHER ROW MAY BE QUOTED FOR EITHER.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-GU-SM-1`** *(the SINGLE-WRITER quantification over every terminal path — required row (i))* | `P-SM` state-machine | **For EVERY terminal path in the row's `5`-path domain and EVERY composition shape in its `2`-shape domain, the sink's behaviour is EXACTLY the declared pair: a VALID `end` invokes it EXACTLY ONCE; an invalid `reset` invoked it EXACTLY ONCE with the CLAMPED pre-drag size; a REFUSED reset (`'not-resizable'` / `'unusable-default'`) invokes it ZERO times; a `cancel` invokes it ZERO times; the DROP path invokes it ZERO times — and in EVERY cell the MODULE ITSELF made ZERO sink calls, so `E3`'s `stats().sinkCalls` and the sink's own record AGREE.** **The converse clauses asserted in the same row: no path produces two writes; the module's `applyPreview` count never makes a preview reach the sink; and the TWO READINGS AGREE IN EVERY CELL (the sink's own record against `E3`'s `stats().sinkCalls`) — which is the LIVE-COMPOSITION FALSIFIER that replaced the as-filed two-writer shape (`§R` `R8`(e); a synthetic second writer would need the invented seam `E3`-HOST-2 removes).** | **YES** *(the `5` paths × the `2` composition shapes IS the domain the property names, and every cell declares its own pair)* **⟶ RE-MARKED `(bounded)` 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): this row's property text says *"For EVERY terminal path … and EVERY composition shape"* while the table drives `5` paths × `2` shapes, so the marking is REQUIRED by `§5.5.2` item 2 — the as-filed cell carried the un-marked `YES` and is SUPERSEDED.** | `M-5`, `M-8`, `M-9`, `M-13`, `M-16`, `I-1`, `§2.3`'s terminal write table | `S-GU-WRITER-1` | **`⟶ RULED 2026-09-27, THE `E-3` RE-GRAIN PASS: `15` attempts** = **`5` terminal paths × `2` composition shapes + `5` distinct mid-drag move shapes — all real DRIVES** — **plus `12` mid-drag ASSERTIONS printed BESIDE the term and NEVER counted in it** (they are assertions over the row's `5` distinct mid-drag drives, not drives), **plus the DISTINCT-DRIVE figure `15`** (`docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`, ACTIVE; `docs/pending.md` §I-terdecies).** **THE AS-FILED TERM IS KEPT VISIBLE AND IS SUPERSEDED: *"`22` attempts = `5` terminal paths × `2` composition shapes + the `12` mid-drag observations the path-`(a)` and path-`(b)` cells additionally read."* ⟶ RE-GRANULATED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R3`): the honest DISTINCT-DRIVE figure is `15`, not `22`, and the `12` is an ASSERTION count, not twelve drives.** **⟶ AND THE DERIVATION ITSELF IS CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): THE `22` MUST **NOT** BE DERIVED AS *"`10` drives + `12` assertions"* — THAT FORM ADDED AN ASSERTION COUNT TO A DRIVE COUNT, which is the `E3` register's own `IM-4` over-strength class (`15` real drives + `12` assertions were summed as if all `27` were drives, and the `2`-shape/path arithmetic was then mis-stated as `10`/`12`). THE RULED DERIVATION, in one line: **the DECLARED term is `22`; the DRIVES are `10` (the `5` terminal paths × the `2` composition shapes) + `5` (the distinct MID-DRAG move shapes the path-`(a)`/path-`(b)` cells read inside their own drives) = `15`; and the `12` mid-drag OBSERVATIONS are ASSERTIONS over those `5` drives and are NEVER added to a drive count.** **A declared term is a cap-comparison figure and need not equal a drive count — what is forbidden is a DERIVATION that sums an assertion count with a drive count, and a DONE row that prints `22` as *"`10` drives + `12` assertions"* is exactly that error.** The row is therefore marked `(bounded)` (above), and the honest distinct-drive figure `15` stays printed BESIDE the declared `22` (`§5.5.2` item 4) and is never substituted for it (`E-3`'s choice is the architect's, `§7a.1` item 5).** **The `15` = the `10` path × composition cells (each ONE drive) + the `5` distinct MID-DRAG move shapes the path-`(a)`/`(b)` cells read inside their own drive; the `12` mid-drag OBSERVATIONS are the assertions those `5` shapes' readings are read through, so `12` is reported BESIDE the declared figure as an assertion count and never as attempts.** **The DECLARED `22` stays the cap-comparison figure (it is larger, never smaller, than the honest drive count) and the caps hold (`22 ≤ 100`/row).** **The `5` paths:** **(a)** a VALID `end` · **(b)** an invalid `reset` with a usable default and a resizable gesture · **(c)** a REFUSED reset (`'not-resizable'` and `'unusable-default'`, one path, its two variants asserted inside the drive) · **(d)** a `cancel` via `pointercancel` · **(e)** a `cancel` via a mid-gesture `dispose()`. **The `2` composition shapes:** **(1)** the single-writer composition (the module's `commit` passed to `E3` only, exactly as the wiring builds it, `§R.1`) · **(2)** the SAME composition driven with the sink's own record and `E3`'s counter both read in the same cell — **⟶ REWRITTEN 2026-09-27 (`§R` `R8`(e)): the as-filed shape `(2)` was a *"TWO-WRITER composition (a harness-registered forwarding channel …)"*, drivable ONLY by a double implementing the invented `registerCompositionWriter`/`registerCommit` member that `E3`-HOST-2's fix REMOVES; the live-composition check replaces it and needs no such member.**ng). **Per attempt assert:** the sink's own call record (**the exact multiset, never "at least one"**), `E3`'s `stats().sinkCalls`, `E3`'s `stats().written`, the module's `stats().previews`, and `stats().resets`/`stats().drops`. |
| **`P-GU-SM-2`** *(the PREVIEW-NEVER-SINKS quantification — required row (ii))* | `P-SM` state-machine | **For EVERY stage in the row's `5`-stage domain and EVERY move shape in its `3`-shape domain: `applyPreview` is invoked AT MOST ONCE PER OBSERVED MOVE; it is invoked ZERO times at a committed (`end`/`reset`) terminal; it is invoked EXACTLY ONCE with the pre-drag size on the cancel and drop paths **AND on the invalid-reset path (the VISIBLE REVERT — `§R` `R7`; the as-filed text listed only cancel/drop/refused-reset and left the invalid arm at zero, which would freeze the screen at the last valid preview)**; it is NEVER invoked for a move whose pointer did not resolve or whose clamped value is not finite; and NO preview invocation is ever accompanied by a sink write in the same turn.** | **YES (bounded — the property text says "EVERY move shape" while the table drives `3` shapes; the universal is NOT proven, and the three zero-write clauses are asserted over the whole enumerated grid rather than derived)** | `M-8`, `M-9`, `M-12`, `M-13`, `F-1`, `F-3`, `F-10`, `I-5`, `§2.5`, `§R` `R7` | `S-GU-PREVIEW-1` | **`15` attempts** = **`5` stages × `3` move shapes**, driven in fixed order. **The `5` stages:** **(1)** before establishment (a hover turn) · **(2)** during the drag after a VALID move · **(3)** during the drag after an INVALID move · **(4)** at the terminal frame · **(5)** after the terminal (a later hover turn). **The `3` move shapes:** **(1)** a resolvable pointer with a finite clamped value · **(2)** an unresolvable pointer (`null` event / a throwing accessor) · **(3)** a resolvable pointer whose clamped value is not finite (`NaN` via an unusable pair, or `Infinity` via a `sizeFromPointer` answer). **Per attempt assert:** `stats().previews`, `stats().moves`, the `PreviewState` the callback received (`value`/`valid`/`resizable`/`token`), **and the sink's own record** — **declared exactly, never "at most"**. |
| **`P-GU-SM-3`** *(the RELEASE MAPPING and the DROP-REVERT — required rows (iii) and (iv))* | `P-SM` state-machine | **For EVERY release shape in the row's `5`-shape domain: a VALID release reaches the session's `end` terminal and yields EXACTLY ONE commit of the CLAMPED DRAGGED VALUE; an INVALID release reaches the session's `reset` terminal with the CLAMPED PRE-DRAG SIZE (exactly one commit, or zero when the reset is refused) **and the module's `controller.reset(element)` call happened while the gesture was STILL ACTIVE**; a RIGHT-CLICK / DROP yields ZERO COMMITS AND ZERO SINK WRITES with the visible revert through the preview channel; and `isResizable === false` yields zero commits with an outcome that is NOT `'cancel'`.** | **YES** *(the `5` shapes are the whole declared release domain, and each declares its own session calls, commits and preview writes)* | `M-9`, `M-13`, `M-14`, `M-16`, `F-7`, `F-9`, `F-10`, `§2.6` items 5/6 | `S-GU-RELEASE-1` | **`15` attempts** = **`5` release shapes × `3` readings**, one drive each. **The `5` shapes:** **(1)** a VALID drag released by the session's own `pointerup` · **(2)** an INVALID drag (a non-finite clamped value) · **(3)** an INVALID drag refused at the reset (`'not-resizable'`; and re-driven with `'unusable-default'`) · **(4)** a SECONDARY-button press during the drag (the drop) · **(5)** a SECONDARY-button press with NO active gesture (inert). **The `3` readings per shape:** **(a)** the module's own counters (`resets`/`drops`/`previews`) · **(b)** the session double's call log (**asserting the reset's call happened while the gesture was ACTIVE**, and that the module called **no** terminal itself) · **(c)** the sink's record and `E3`'s `stats()`. |
| **`P-GU-IM-1`** *(THE COORDINATE UNIQUENESS AND THE ONE-READ RULE — required row (v))* | `P-IM` invariant | **For EVERY event shape in the row's `15`-class domain, `resolveEventPointer` answers EXACTLY the declared reading — a frozen `{x, y}` carrying `clientX`/`clientY` for a usable pair, and `null` for EVERY other shape — it NEVER throws, it reads NO other event field, and the `PointerPosition` it returns carries NO reference to the event (so a caller cannot re-read a coordinate from it).** **The converse clauses asserted in the same row: the module's own source contains NO second coordinate token and NO magnitude vocabulary, and the caller's `sizeFromPointer` is called AT MOST ONCE per observed move.** | **YES (bounded — the row declares `45` drives whose honest DISTINCT value-class figure is `15`, because each of the `15` event classes is driven `3` times: once through `resolveEventPointer` directly, once through the module's observed-move turn, and once through the caller's `sizeFromPointer` argument recording. The universal "for every event" is NOT proven, and no reader may read this row as its proof)** | `M-12`, `F-1`, `F-10`, `I-2`, `R-3`, `§2.4` items 1/5 | `S-GU-POINTER-1` | **`45` attempts** = **`15` event classes × `3` drives**, driven in fixed order (class-major). **The `15` classes:** **(1)** a plain `{clientX: 10, clientY: 20}` · **(2)** `clientX`/`clientY` both `0` · **(3)** negative coordinates · **(4)** fractional coordinates · **(5)** an own accessor supplying the pair · **(6)** a FROZEN event object · **(7)** an `Object.create(null)` event carrying the pair · **(8)** `clientX` present and `clientY` absent · **(9)** `clientX` a string (`'10'`) · **(10)** `clientX` `NaN` · **(11)** `clientY` `Infinity` · **(12)** the event is `null` · **(13)** the event is `undefined` · **(14)** the event is a primitive (`42`, `'x'`, `true` — one class, its variants asserted inside the drive) · **(15)** a `Proxy` whose traps throw (and the same class re-driven with a throwing accessor on `clientX`). **Per drive assert:** the reading (`Object.is`-equal for `-0`/`NaN`-bearing inputs is not applicable; the pair is asserted by value and by **frozen-ness**), **no throw**, **the absence of any other event-field read (asserted with an event object whose other fields are getters that THROW)**, and **the `PointerPosition`'s own key set is exactly `{x, y}`**. |
| **`P-GU-IM-2`** *(THE ONE-CLOSURE AND ONE-EVALUATION-PER-GESTURE invariant over the composed seams)* | `P-IM` invariant | **For EVERY seam in the row's `5`-seam domain and EVERY lifecycle in its `4`-lifecycle domain, the composed seam is consulted EXACTLY the declared number of times: `axisOf` — zero times at `attach`, once per hover evaluation, and once per ESTABLISHED gesture (through `E3`'s `axisFor`); `boundsOf` — at most once per gesture, and only at a terminal that evaluates a value; `startSizeOf` — EXACTLY ONCE per gesture, at establishment; `resizableOf` — ONCE per gesture, and only through `E3`'s own establishment evaluation (so the module's `PreviewState.resizable` does NOT add a second call); `commit` — invoked by `E3` at most once per gesture and by the module ZERO times.** | **YES** *(the `5` seams × the `4` lifecycles IS the domain the property names, and every cell declares its own count)* | `M-8`, `M-10`, `M-12`, `M-13`, `M-16`, `I-8`, `§2.1` item 3, `§2.6` item 3 | `S-GU-SEAM-1` | **`20` attempts** = **`5` seams × `4` lifecycles**. **The `5` seams:** `axisOf` · `boundsOf` · `startSizeOf` · `resizableOf` · `commit`. **The `4` lifecycles:** **(a)** `attach` only, no gesture · **(b)** a hover turn, no gesture · **(c)** a full VALID gesture (`hover` → establishment → 1 move → `pointerup`) · **(d)** a full INVALID gesture (establishment → 1 invalid move → the reset). **Per attempt assert:** that seam's recorded call count and argument identity (`toBe` on the token), **and the module's `PreviewState.resizable` reading is derived from the SAME evaluation `E3` made** (a second `resizableOf` call in lifecycle `(c)` FAILS). |
| **`P-GU-TP-1`** *(THE MODULE'S TOTALITY over hostile arguments — required row (vi))* | `P-TP` totality | **For EVERY argument shape in the row's `6`-shape domain, EVERY entry point is TOTAL: `createGutterAffordance(arg)` returns an affordance whose FIVE members are all present and callable (never throws, never returns `null`/`undefined`/a primitive), `attach()` returns a `boolean`, `detach()` returns a `boolean`, `stats()` returns the seven declared fields, and `controller` is present — for EVERY one of the row's `6` argument shapes, including an omitted argument, a `null`, a primitive, a `Proxy` whose traps throw, and a record whose accessors throw.** **The converse clauses asserted in the same row: no entry point leaves a state a later call cannot read; a refusal is always a RECORD or a `boolean`, never a throw; and `cursorDeclarationFor`/`domEventSource` are total for every member of the same `6`-shape domain.** | **YES (bounded)** *(the `6` argument shapes × the `3` entry-point drives IS the declared grid, and every cell declares its own return kind)* **⟶ RE-MARKED `(bounded)` 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): this row's property text says *"For EVERY argument shape"* while its table drives `6` FIXED shapes, so the marking is REQUIRED by `§5.5.2` item 2; the as-filed cell carried the un-marked `YES` and is SUPERSEDED — the row's distinct-drive caveat was already printed, so the MARKING was the only thing missing.** **⟶ RE-GRANULATED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R3`): the honest DISTINCT-DRIVE figure is `12`, not `18` — drive `(c)` (`stats()` and `controller` reads) is a READING of the state call `(b)` already produced, not a third drive. The DECLARED `18` stays the cap-comparison figure (`18 ≤ 100`/row); the `12` is printed BESIDE it and never substituted for it.** **⟶ AND RE-GRAINED 2026-09-27, THE `E-3` PASS (the architect's ruling, `docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`): THE DECLARED TERM IS NOW `12` — the row's `6` argument shapes × `2` DRIVES — and the `6` entry-point `(c)` items (`stats()` and `controller` READS) are printed BESIDE it as a separate reading figure, exactly as the `12` was printed beside the as-filed `18`.** **BOTH FIGURES STAY VISIBLE; the term the caps compare is the DRIVE count.** | `M-6`, `F-6`, `F-12`, `I-7`, `§2.1` item 5 | `S-GU-TOTAL-1` | **`⟶ RULED 2026-09-27, THE `E-3` RE-GRAIN PASS: `12` attempts** = **`6` argument shapes × `2` DRIVES (`6` factory constructions + `6` attach/detach drives)** — **plus `6` READINGS of that same state (`stats()` and `controller`) printed BESIDE the term and NEVER counted in it** (a reading is not a drive; this is where `18` was over-strength).** **THE AS-FILED TERM IS KEPT VISIBLE AND IS SUPERSEDED: *"`18` attempts = `6` argument shapes × `3` entry-point drives**, one call each — **of which `12` are distinct DRIVES (`6` factory constructions plus `6` attach/detach drives) and `6` are READINGS of those drives' results (`stats()` / `controller`).** **The `6` argument shapes:** **(1)** `undefined` (the argument omitted) · **(2)** `null` · **(3)** `42` · **(4)** `'x'` · **(5)** a `Proxy` whose traps throw · **(6)** a record with a throwing accessor on `session`, `source`, `element`, `target` and `applyPreview` (one shape, its variants asserted inside the drive). **The `3` entry-point drives per shape:** **(a)** the FACTORY with that shape as its argument (`createGutterAffordance(shape)`) **and** with it as an OPTION inside an otherwise valid options object ⇒ asserts the five members are callable · **(b)** the resulting affordance's `attach()`, `attach()` again and `detach()` ⇒ asserts a `boolean` in all three drives and no throw · **(c)** the resulting affordance's `stats()` and its `controller` ⇒ asserts the seven fields and that no throw occurs — **plus, per shape, one `cursorDeclarationFor(shape)` and one `domEventSource()` drive**, asserted for the same totality. |
| **`P-GU-TP-2`** *(THE CURSOR RESOLUTION'S TOTALITY AND THE CURSOR-LITERAL ABSENCE — required row (vii))* | `P-TP` totality | **For EVERY `cursorOf` answer shape in the row's `10`-shape domain, `cursorDeclarationFor` returns EXACTLY the declared reading: a trimmed non-empty string for an own `cursor` string property; `undefined` for EVERY other shape — a non-object, `null`, `undefined`, a primitive, an ARRAY, a record with no `cursor` property, a non-string `cursor`, an empty string, a whitespace-only string, a `Proxy` whose traps throw, and a throwing accessor — and it NEVER throws and NEVER touches an element, a document or a style object.** **The converse clauses asserted in the same row: the module carries NO cursor literal of its own (`col-resize`/`row-resize`/`ew-resize`/`ns-resize` appear ZERO times in its bytes), and the module writes the cursor NOTHING when the resolution is `undefined`.** | **YES** *(the `10` shapes are the whole declared domain, and each has its own declared reading)* | `M-10`, `M-11`, **`F-14`** (the live capture-absence row; the as-filed `F-11` is DELETED and tombstoned, `§R` `R5`), `R-7`, `§2.6` item 3 | `S-GU-CURSOR-1` | **`12` attempts** = **`10` answer shapes × `1` drive + `2` cursor-absence drives** (one static scan of the module's bytes for the four cursor literals, and one runtime drive asserting `applyCursor` is called with `undefined` — and no declaration — for the `undefined`-resolution path). **The `10` shapes:** **(1)** `{cursor: 'col-resize'}` (the positive control — it MUST resolve) · **(2)** `{cursor: '  row-resize  '}` (trimming) · **(3)** `{cursor: ''}` · **(4)** `{cursor: '   '}` · **(5)** `{cursor: 42}` · **(6)** `{}` · **(7)** `null` · **(8)** `'col-resize'` (a bare string — NOT a record; it resolves to `undefined`) · **(9)** an ARRAY carrying a `cursor`-named index is **not** an own property of the shape the row names: the row's array member is `['cursor']` and it resolves to `undefined` · **(10)** a `Proxy` whose `get` trap throws (and the same class re-driven with a throwing accessor). **Per drive assert:** the reading (`undefined` or the trimmed string, by `===`), **no throw**, and **no element/document/style access**. |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly — **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): THE SET IS `4` OF THE `7` ROWS, NOT `2`.** **THE AS-FILED SENTENCE READ *"`2` of the `7` rows — `P-GU-SM-2` … and `P-GU-IM-1`"*, and it is kept visible here as that pass's own text. THE RULED SET ADDS THE TWO ROWS WHOSE PROPERTY TEXT QUANTIFIES OVER *"EVERY terminal path … and EVERY composition shape"* (`P-GU-SM-1`) AND *"EVERY argument shape"* (`P-GU-TP-1`) WHILE THEIR TABLES DRIVE FINITE FIXED DOMAINS — the marking is required by `§5.5.2` item 2 and their absence was a MISSING marking, not a smaller domain. THE AS-FILED `2`: `P-GU-SM-2`** (its text's *"EVERY
move shape"* is bounded by its `3` shapes × `5` stages) **and `P-GU-IM-1`** (its text's *"For EVERY event
shape"* is bounded by its `15` classes over `45` drives). **The other `3` rows carry the plain executable
marking**: each quantifies over a domain its table **is**, with every member declared and every expected
outcome asserted per member. **No row is marked `NOT EXECUTED`, and no row may be reported as executed if
it was sampled.**

**⟶ THE ROWS THIS UNIT DELIBERATELY DOES *NOT* CARRY, named so a later pass does not read their absence
as an omission: (i) NO RENDERED-FACT ROW** — a geometry, an applied-style or a real-pointer property is
**not** a register row here, because **a node-suite register cannot drive it** and **a row the unit cannot
drive is worse than no row**; those are `§5.2`'s `[U]` rows. **(ii) NO `[D]`-SHAPED ROW** — the harness
does not exist. **(iii) NO ROW FOR `E3`'s OWN ARITHMETIC** — the clamp's totality is `E3`'s own register
(`P-GT-PU-1`), and **this unit may not re-assert it** (`§2.6` item 1). **(iv) NO ROW FOR THE SESSION'S
LIFECYCLE** — `U-GSESSION`'s register owns it. **Each absence is a boundary, stated rather than
silently relied on** (`§2.6` item 7).

#### 5.5.2 The register's honesty block — what is NOT proven here

**Item 1 — THE ROW COUNT IS AN OUTCOME, AND THE SMALL COUNT IS THE POINT.** **`7` rows** were enumerated
because **`7` discernible, DRIVABLE property classes exist**. **`≤8` is a guidance signal, not a
ceiling** (`docs/decisions.md` `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED…`), **and equally: the count is not a
target.** **THE BREAKDOWN/RECOMBINATION RECOMMENDATION, recorded once:** `P-GU-SM-1` and `P-GU-SM-3` share
the terminal-path domain and **a future pass COULD merge them**; **that pass must show that no property is
lost — a register row is a property, not a fixture** — and **it is NOT owed by this filing.**

**Item 2 — THE `(bounded)` MARKINGS, and they are not formality.** **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): THE MARKED SET IS `4` OF `7`, NOT `2`** — the as-filed sentence named **`P-GU-SM-2`** and **`P-GU-IM-1`** (kept visible below), and the ruled set **adds `P-GU-SM-1`** (its *"EVERY terminal path … and EVERY composition shape"* over `5` paths × `2` shapes) **and `P-GU-TP-1`** (its *"EVERY argument shape"* over `6` fixed shapes). **`P-GU-SM-2`** and **`P-GU-IM-1`** each
state a universal **larger than their tables**, and each **says so in its own `Executed?` cell**: *"the
universal is NOT proven, and no reader may read this row as its proof."* **A DONE row that reports either
as a proof of the unbounded universal it states is a review finding.**

**Item 3 — WHAT THE REGISTER DOES *NOT* PROVE, STATED PLAINLY (this unit's own addition to the honesty
block).** **NO RENDERED FACT IS PROVEN BY THIS REGISTER — NOT A GEOMETRY, NOT AN APPLIED STYLE, NOT A
CURSOR'S VISUAL EFFECT, NOT A LAYOUT, NOT A REAL POINTER.** **The register's evidence is `[T]` only: it
proves call counts, write counts, the value chain's shape, the resolution rules and totality **over
caller-supplied objects and the shim**. **The rendered facts belong to `§5.2`'s `[U]` rows and to the live
battery, and a DONE row that moves one of them into the register's column is a review finding**
(`§4.4 S-7`/`S-11`).

**Item 4 — THE DECLARED-VERSUS-DISTINCT LEDGER, so the two figures are never conflated and the DECLARED
ones are always the cap comparison.**

| Row | Declared attempts | Its honest distinct figure | Why they differ (stated, not implied) |
| --- | --- | --- | --- |
| `P-GU-SM-1` | **`⟶ 15`** *(RULED 2026-09-27, THE `E-3` PASS — the as-filed declared figure `22` is KEPT VISIBLE here as the superseded one, and `§5.5.1`'s cell prints both)* | **`15`** — **⟶ CORRECTED 2026-09-27 (`§R` `R3`), the as-filed `22` here was the SAME over-strength claim the cell carried: the honest DISTINCT-DRIVE figure is `15` (`10` path × composition cells + `5` distinct mid-drag move shapes)** — **⟶ AND THE AS-FILED *"WHY THEY DIFFER"* WORDING BELOW IS CORRECTED 2026-09-27 BY THE STEP-3 PASS (`§R.2` `R-15`, condition `C-7`): the `12` must NOT be read as *"`22` = `10` drives + `12` assertions"*; the declaration is a cap-comparison term and the drives are `15`, with the `12` ASSERTIONS reported separately. The row is now marked `(bounded)` (`§5.5.1`, `§5.5.2` item 2)** | `5` paths × `2` shapes gives `10` drives, plus `5` distinct mid-drag move shapes = **`15` DRIVES**; **the further `12` mid-drag OBSERVATIONS are ASSERTIONS over those `5` drives, never drives, and are reported as an assertion count beside the declared term** **⟶ AND RE-GRAINED 2026-09-27, THE `E-3` PASS: THE DECLARED ATTEMPTS CELL BECOMES `15`** (the same `15` the DISTINCT figure has always read) — **so this row's declared figure and its distinct figure AGREE, and the `12` ASSERTIONS are printed as a SEPARATE figure beside the term** (`docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`). **THE AS-FILED DECLARED `22` IS KEPT VISIBLE in this table's own left column and in `§5.5.1`'s cell, with this annotation as its supersession** |
| `P-GU-SM-2` | `15` | **`15`** | `5` stages × `3` move shapes, each a distinct stage observation — **and it is `(bounded)` for its TEXT, not for a collapsed table** (**⟶ this row's `15` is THE RULED TERM of the repaired register, `§R` `R3`; the `10` that stood in the summaries appears in no cell of this row**) |
| `P-GU-SM-3` | `15` | **`15`** | `5` release shapes × `3` readings, each a distinct reading |
| `P-GU-IM-1` | `45` | **`15`** | the `15` event classes are each driven `3` times (directly, through the move turn, and through the caller's argument recording), so the honest distinct-class figure is `15` — **the reason this row is marked `(bounded)`** |
| `P-GU-IM-2` | `20` | **`20`** | `5` seams × `4` lifecycles, each a distinct count pair |
| `P-GU-TP-1` | **`⟶ 12`** *(RULED 2026-09-27, THE `E-3` PASS — the as-filed declared figure `18` is KEPT VISIBLE here as the superseded one)* | **`12`** — **⟶ CORRECTED 2026-09-27 (`§R` `R3`), the as-filed `6` here under-counted: the distinct DRIVES are `12` (`6` factory constructions + `6` attach/detach drives), while entry-point `(c)` (`stats()` / `controller`) is a READING of drive `(b)`'s state and not a third drive** **⟶ AND THE `E-3` RE-GRAIN 2026-09-27 MAKES THAT DISTINCT FIGURE THE DECLARED TERM: the two figures now AGREE at `12`, and the `6` readings are printed BESIDE the term as a separate reading figure** | the `6` argument shapes × `2` DRIVES (`6 + 6 = 12`), plus `6` readings of the same drives **printed as a separate READING figure, never inside the term**; the `cursorDeclarationFor`/`domEventSource` drives add no new argument shape |
| `P-GU-TP-2` | `12` | **`10`** | the `10` answer shapes plus `2` cursor-absence drives (one static, one runtime), which add no answer shape |

**⟶ ADDED 2026-09-27 (`§R` `R3`) — THE ASSERTION-COUNT LEDGER, stated separately so an assertion can never
be read as a drive again (the audit class the parked `E3` cycle named at `IM-4`):** **`P-GU-SM-1` carries
`12` mid-drag ASSERTIONS over its `5` distinct mid-drag drives; `P-GU-IM-1`'s `45` declared attempts are
`15` classes × `3` DRIVES (all real, one per class per drive form — but they collapse to `15` distinct
VALUE CLASSES, which is why the row is `(bounded)`); `P-GU-TP-1`'s `18` declared attempts are `12` drives
plus `6` readings.** **In every case the DECLARED figure is the one the caps compare, and the distinct
figure is reported BESIDE it.**
**⟶ AMENDED 2026-09-27, THE `E-3` RE-GRAIN PASS: TWO OF THESE FIGURES ARE NOW THE DECLARED TERMS, NOT
MERELY THE DISTINCT ONES.** **`P-GU-SM-1` declares `15` DRIVES with its `12` mid-drag ASSERTIONS printed as
a SEPARATE figure beside the term; `P-GU-TP-1` declares `12` DRIVES with its `6` READINGS printed as a
separate reading figure beside the term.** **The ledger above is what the re-grain was decided from — it is
evidence of coverage and it STAYS — and the two figures it used to call "distinct" are now the two terms
the caps compare** (`docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A
DRIVE COUNT`, ACTIVE; `§5.5.1`'s two cells, `§5.5.3`).

**Item 5 — THE EXECUTED LAYER IS NOT THIS FILING'S, stated once.** **This pass RAN NOTHING.** Every cell
above is **execution DESIGN**; the **measured** figures are the ones this unit's own
`tests/gutter-ui.test.ts` and the independent blind run produce. **A read-only PBT audit may not report a
row as executed on the strength of this table alone** — the audit reads **the TestWriter's tables in
`tests/gutter-ui.test.ts`** **and** this cell's arithmetic.

**Item 6 — THE POOL-VERSUS-BOUNDARY CHECK, RUN AT FILING TIME AND RE-RUNNABLE AGAINST THE LANDED TABLES.**
**For every row, each table/pool member is checked against the row's own boundary text**, and the result is
one line per row: `P-GU-SM-1` **CLEAN** (every path is a terminal path the contract names) ·
`P-GU-SM-2` **CLEAN** (every stage and shape is a stage/shape the contract names) · `P-GU-SM-3` **CLEAN** ·
`P-GU-IM-1` **CLEAN** (every event class is a `resolveEventPointer` input the contract names, and the
throwing-accessor variant is the contract's own `null` answer) · `P-GU-IM-2` **CLEAN** (every seam is one
of the caller's declared seams and every lifecycle is one the state machine names) · `P-GU-TP-1` **CLEAN**
(the hostile shapes are totality inputs only, and the row claims no code boundary) · `P-GU-TP-2` **CLEAN**
(shape `(1)` is the row's own positive control and shapes `(7)`/`(9)`/`(10)` are `undefined` by the
declared rule). **A register row found to contradict its own boundary at green time is a SPEC FINDING,
reported rather than tuned to green** — and **the LANDED tables must be re-checked by the adversarial pass**
(`B-13`).

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**⟶ RULED 2026-09-27, THE `E-3` RE-GRAIN PASS — THE DECLARED TOTAL THIS CONTRACT PRINTS, WITH ITS TERMS:**
**`134` = `15` (`P-GU-SM-1`) + `15` (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45` (`P-GU-IM-1`) + `20`
(`P-GU-IM-2`) + `12` (`P-GU-TP-1`) + `12` (`P-GU-TP-2`)** — **the sum of exactly the seven printed terms**
(the convention: **a declared register term IS a drive count**, `docs/decisions.md` `A DECLARED REGISTER TERM
IS A DRIVE COUNT`; `docs/pending.md` §I-terdecies). **THE AS-FILED PRINT IS KEPT VISIBLE AND IS SUPERSEDED:**
**`140` = `22` (`P-GU-SM-1`) + `15` (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45` (`P-GU-IM-1`) + `20`
(`P-GU-IM-2`) + `18` (`P-GU-TP-1`) + `12` (`P-GU-TP-2`).**

**⟶ RECORDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R3`) — THE SIXTH MIS-SUM OF THIS FAMILY, CORRECTED
AND STATED SO IT CANNOT RECUR. THE AS-FILED TEXT OF THIS SUBSECTION PRINTED `142` = `22` + **`10`** +
`15` + `45` + `20` + `18` + `12`, and `§5.3` item 11 printed the same `142`; `§5.5.1`'s `P-GU-SM-2` cell
printed **`15`** (`5` stages × `3` move shapes — the row's own drive table). **THE RULING IS THE ROW'S OWN
CELL, because a cell that states its own arithmetic is the authority over a summary that names the row
without driving it: `P-GU-SM-2` IS `15`.** **THE MIS-SUMMED `10` APPEARS IN NO CELL OF THE ROW and is
SUPERSEDED WHEREVER IT STOOD (`§5.5.3`'s as-filed line, `§5.3` item 11, and the status block's item 3).**
**The as-filed forms are kept visible at those three sites with dated annotations, because a mis-sum
corrected only in the summary is exactly the recurrence this family has now produced six times.** **The
DECLARED figures below are re-granulated as well (`§R` `R3`): `P-GU-SM-1` stays declared at `22` with its
honest distinct-drive figure `15` and its assertion count `12` printed beside it, and `P-GU-TP-1` stays
declared at `18` with its honest distinct-drive figure `12` — the DECLARED figures remain the cap
comparison and are never replaced by the distinct ones.**
**⟶ AND THE `E-3` RE-GRAIN SUPERSEDES THAT SUB-PARAGRAPH 2026-09-27 (architect ruling, `docs/pending.md`
§I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`): the two DECLARED terms are
now `15` (`P-GU-SM-1`) and `12` (`P-GU-TP-1`) — the very figures this paragraph called the honest distinct
ones — so **the declared term and the distinct figure AGREE for those two rows**, and the `12` mid-drag
assertions / the `6` entry-point readings are printed as SEPARATE figures BESIDE the terms, never inside
them.** **The declaration is still the cap comparison — the caps stay satisfied (`134 ≤ 400`, largest row
`45 ≤ 100`) — because a drive count is what a cap should compare.**

**CHECK THE ADDITION TERM BY TERM, so the arithmetic is checkable rather than asserted** — the ACTIVE rule
(`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) requires exactly this, **because a mis-sum
corrected only at the red run is the RECURRING finding, five times in this family**
(`U-PROJ` `239`→`231` · `U-LISTHOST` `157`→`168` · `U-ZONES` `400`→`369` · `U-GSESSION` `468`→`396` ·
`U-GUTTER` `314`→`299`) **— and this unit is the SIXTH**
(`docs/pending.md` §I-octies: `147` in `§5.5.1`'s cells against `142` in the summaries, with
`P-GU-SM-2` reading `10` in one place and `15` in another) — **and THE FIRST TABLE BELOW IS THAT PASS'S
`R3` READING; THE SECOND TABLE IS THE RULED ONE AFTER THE `E-3` RE-GRAIN, and a reader must use the second
for every cap comparison and for the DONE row:**

| Step | Running total | Term added |
| --- | --- | --- |
| `1` | `22` | `22` (`P-GU-SM-1`) |
| `2` | `37` | `+ 15` (`P-GU-SM-2`) |
| `3` | `52` | `+ 15` (`P-GU-SM-3`) |
| `4` | `97` | `+ 45` (`P-GU-IM-1`) |
| `5` | `117` | `+ 20` (`P-GU-IM-2`) |
| `6` | `135` | `+ 18` (`P-GU-TP-1`) |
| `7` | **`140`** | `+ 12` (`P-GU-TP-2`) |

**⟶ AND THE RULED ADDITION AFTER THE `E-3` RE-GRAIN 2026-09-27 — THE PRINTED TERMS ARE NOW THE DRIVE COUNTS,
AND THIS IS THE TABLE THE CAPS AND THE DONE ROW USE:**

| Step | Running total | Term added |
| --- | --- | --- |
| `1` | `15` | `15` (`P-GU-SM-1`) |
| `2` | `30` | `+ 15` (`P-GU-SM-2`) |
| `3` | `45` | `+ 15` (`P-GU-SM-3`) |
| `4` | `90` | `+ 45` (`P-GU-IM-1`) |
| `5` | `110` | `+ 20` (`P-GU-IM-2`) |
| `6` | `122` | `+ 12` (`P-GU-TP-1`) |
| `7` | **`134`** | `+ 12` (`P-GU-TP-2`) |

**THE RULED TERM-BY-TERM CHAIN IS `15 → 30 → 45 → 90 → 110 → 122 → 134`.**
**THE RULED FAMILY SUBTOTALS, stated consistently with that addition: `SM` = `15 + 15 + 15` = `45` · `IM` =
`45 + 20` = `65` · `TP` = `12 + 12` = `24` — and `45 + 65 + 24 = 134`.**
**(The as-filed chain was `22 → 32 → 47 → 92 → 112 → 130 → 142` with subtotals `47 / 65 / 30`; the `§R` `R3`
chain was `22 → 37 → 52 → 97 → 117 → 135 → 140` with subtotals `52 / 65 / 30` — both are kept visible above
as their own passes' readings, and the `E-3` re-grain moves `SM` `52 → 45` and `TP` `30 → 24`.)**
**THE ASSERTION AND READING FIGURES PRINTED BESIDE THE TERMS, named so the arithmetic is auditable and
nothing is silently dropped: `P-GU-SM-1` carries `12` mid-drag ASSERTIONS beside its `15` DRIVES; `P-GU-TP-1`
carries `6` READINGS beside its `12` DRIVES; and the unchanged ledger figures (`P-GU-IM-1` `45` declared /
`15` distinct value classes · `P-GU-TP-2` `12` declared / `10` distinct answer shapes) stay reported at
`§5.5.2` item 4's ledger.**

**THE TOTAL IS THE SUM OF ITS OWN TERMS — AND AFTER THE `E-3` RE-GRAIN THE PRINTED TOTAL IS `134`, WHICH IS
THE SUM OF THE SEVEN PRINTED TERMS (`15 + 15 + 15 + 45 + 20 + 12 + 12`), so the as-filed state in which the
file printed `140` while its printed terms summed to `147` is RESOLVED rather than annotated.** **It is
inside the `≤400` register cap (`134 ≤ 400`), and
the per-row maximum is `45` (`P-GU-IM-1`), inside the `≤100`/row cap.** **A total that is not the sum of its
own terms is a REVIEW FINDING.** **The DECLARED figures are what the caps are compared against; the
distinct-drive figures of `§5.5.2` item 4 are reported BESIDE them and never substituted.**
**⟶ AND THE `P-GU-SM-1` TERM'S DERIVATION IS CORRECTED, NOT ITS VALUE — 2026-09-27, THE GATE-1 STEP-3
REPAIR PASS (`§R.2` `R-15`, condition `C-7`): the term stays `22` and MUST NOT be derived as *"`10` drives +
`12` assertions"* (an assertion count added to a drive count — the `E3` register's `IM-4` over-strength
class, which is why the row now carries `(bounded)` and prints its honest `15` DRIVES BESIDE the declared
`22`).** **THE DECLARED TOTAL WAS UNMOVED BY THAT PASS: `140`.** **The alternative — adopting the honest
distinct figures AS the declared terms, which would move the total `140 → 127` — was `E-3`, the ARCHITECT'S
OPEN CHOICE, reported at `§7a.1` item 5 and decided by nobody in that pass.**
**⟶ AND `E-3` WAS THEN RULED — 2026-09-27, THE RE-GRAIN PASS (the architect's *"Re-grain."*; `docs/pending.md`
§I-terdecies, `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`): the honest drive figures
BECAME the declared terms, so `P-GU-SM-1` is declared `15` and `P-GU-TP-1` is declared `12`, and the total
moves `140 → 134` — NOT to the `127` this paragraph used to predict, because `P-GU-IM-1`'s `45` stays `45`
(its `3` drives per class are real drives, and only its distinct-CLASS figure collapses) and `P-GU-TP-2`'s
`12` stays `12` (its `2` cursor-absence drives are real drives).** **The superseded recommendation — *"keep
`140` and the distinct-beside-declared form"*, with the `127` alternative it named — is KEPT VISIBLE at
`§7a.1` item 5 with this ruling as its answer, and no site may print a total that is not the sum of its own
printed terms.**

### 5.U The DELTA MATRIX (the user-flow-audit hardening) — **CAPPED at `8` U-rows**

**WHAT THIS SECTION IS, AND THE GAP IT REPORTS RATHER THAN OMITS.** The user-flow-audit hardening requires a
CAPPED delta matrix of **user-visible flows this unit changes**, each with its **pre** and **post**
observation, as a **REVIEW INPUT for the live gate**, **plus** a **structured coverage report** the live
runner must emit and a **read-only audit** on that report. **THE PREDICATE'S SOURCE DOCUMENT
`docs/specs/user-flow-audit.md` DOES NOT EXIST IN THIS TREE — confirmed SIX times** (globbed
`docs/**/*user-flow*` → **no files**; the string occurs nowhere under `docs/`; the five earlier
confirmations are recorded in `docs/pending.md` §H and §I). **THEREFORE: the matrix below is authored in
THE GATE INSTRUCTIONS' FORM, the gap is recorded here with an owner and a revisit condition, and NOTHING is
silently omitted** (ruling 10).

**THE GAP, WITH ITS OWNER AND ITS REVISIT CONDITION:**

| # | The gap | Owner | Revisit condition |
| --- | --- | --- | --- |
| **U-GAP-1** | **`docs/specs/user-flow-audit.md` is absent, while the gate instructions cite its `§7.1` predicate and its `§5.U`/`§6.1`/`§6.2` trio.** The mechanical trigger (dom-shim-blindness / UI-overhaul) therefore has **no filed contract in this repo**. **THIS unit IS a UI-rendering unit, so the predicate fires on its merits** — and the matrix is authored from the instructions' form. | **the next documentation/spec pass** — either **FILE the predicate** (a spec quoting the `§7.1`/`§5.U`/`§6.1`/`§6.2` contract into this repo) **or record that this repo does not adopt that hardening**. | **before the NEXT UI-overhaul / UI-rendering unit's live-battery gate, or at the next proofreader pass** — whichever comes first (`docs/pending.md` §H's row, re-pointed here at its sixth confirmation). |

**1. ⟶ UPDATED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.3`): THE MATRIX NOW CARRIES `8` U-ROWS AND IS STILL `≤8`, AND EVERY ROW NOW NAMES ITS INSTRUMENT (`C-8`, `C-10`).** **THE AS-FILED CLAUSE READ *"THE MATRIX — `7` U-rows, `≤8`, every one a USER-VISIBLE flow this unit changes"*; `U-8` (the real-open-window command sequence) is ADDED, `8` is the CAP, and NO ninth row is free** (`§4.4 S-12` unchanged). **C-10 IS DISCHARGED ROW BY ROW at item 4's table: each row names the PARTY that is the instrument — the module's own drive (`[T]`), the wiring's live path under a real pointer (`MANUAL OPERATOR`), the MCP tools (`npm run mcp -- --target http --port 3787 …`), or the operator (`MANUAL`) — and a row that names "the live gate" has named no instrument** (`§5.U` item 2's `instrument` field). **The `Pre`
observation is what a user/agent sees on the tree BEFORE this unit's change; the `Post` observation is
what it sees AFTER — and the `Post` column is a REQUIREMENT on the live battery, MEASURED at the live gate
and never projected** (`§3.3 I-11`). **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R2`): *"MEASURED
at the live gate"* means measured BY THE INSTRUMENT NAMED FOR THAT ROW in item 4's table — a shipped tool
where one can read it, a `MANUAL OPERATOR` record where none can — and **three rows (`U-3`/`U-4`/`U-6`) are
`NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` with their structural reasons stated there.** **A row whose
`Post` cell has no instrument in item 4 is an UNOWNED claim and FAILS the report's four clauses.**

| U-row | The user-visible flow | Pre observation | Post observation (MEASURED at the live gate) | Layer |
| --- | --- | --- | --- | --- |
| **`U-1`** | **The demo page has a gutter affordance at all** | no gutter element exists; `list_targets` carries no affordance node; the demo's authored card set has no gutter card | the authored affordance node **resolves by its authored `css.id` and `props.id`**, and the card's nodes are in `list_targets`'s vocabulary | `[U]` + `[H]` |
| **`U-2`** | **The affordance's rendered cursor shape** | no affordance, so no gutter cursor is present anywhere in the rendered HTML | the affordance element's **authored base `cursor` declaration is present in `get_rendered_html`** and, on hover, the module's `applyCursor` writes the resolved declaration **in the real renderer** | `[U]` |
| **`U-3`** | **A press on the affordance starts the resize gesture** | no affordance and no composition: a press has nothing to start | a real primary press on the affordance **establishes the session's gesture** (the session's own listener runs; the module's `onStart` runs once) — observed **by a `MANUAL OPERATOR` record** (`§5.U` item 4: no shipped instrument carries a pointer button or coordinate) | `[U]` (MANUAL — `§5.U` item 4) |
| **`U-4`** | **The drag shows the resized state live from the cursor** | no drag and no preview: the target's geometry does not move with any pointer | the target's **live rendered geometry changes with the pointer during the drag** (the preview channel), **and — `§R` `R7`/`R8`(d), 2026-09-27 — an INVALID drag REVERTS VISIBLY to the pre-drag size rather than freezing at its last valid preview**, and the **committed graph value is readable afterwards** through the existing tools | `[U]` (MANUAL — `§5.U` item 4) |
| **`U-5`** | **A valid release commits; an invalid drag resets to the pre-drag size** (⟶ the as-filed cell read *"an invalid one resets"* as a RELEASE behaviour; `§R` `R7` rules it a DRAG-TURN arm, with the architect's clause observably satisfied) | no commit exists and no reset exists | **⟶ TIGHTENED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A5`) — THE DRAGGED-VALUE READING, WITH ITS NEGATIVE CONTROL; the as-filed Post cell is quoted at the end of this cell.** **THE READING: after a VALID drag the authored STATUS/readout node's content, read back from `npm run mcp -- --target http --port 3787 html` (and `get_markdown`), MUST CARRY THE VALUE THE OPERATOR ACTUALLY DRAGGED TO — the clamped dragged value — NOT merely "a committed value".** **THE NEGATIVE CONTROL, part of the reading rather than an aside: the SAME read-back MUST ALSO BE PERFORMED WITH THE PRE-DRAG SIZE AS THE COMPARAND, AND THE PRE-DRAG SIZE MUST FAIL THAT READ** (it is the value `E3`'s fallback default would have committed), **so a record in which the pre-drag size satisfies the reading FAILS the row.** **THE FAILURE MODE THIS CLOSES, in the row's own words: if the wiring's `sizeFor` closure does NOT read back the handle the module's own `onMove` turn set (`handle.set(clamped)`, `§R` `R6`), `E3` falls back to its default value source and commits the RAW PRE-DRAG SIZE instead of the dragged value — and NOTHING FAILS:** the sink is still called exactly once, the element is still reused, the graph still changes, `M-5`'s two-reading falsifier passes, `M-8` passes, `M-19`'s write-route reading passes, and the status node still carries A committed value — **so "the status node carries the committed value" is satisfiable by a WRONG committed value, and this tightened reading is the only declared gate that can see it** (`§R.4` `C-A5`; `§R` `R6`). **THE AS-FILED POST CELL, KEPT VISIBLE: a valid release *"commits the clamped dragged value exactly once (the graph's authored content carries it)"* — which the tightening does NOT weaken; it makes the value COMPARABLE.** | `[U]` (MANUAL) + `[H]` |
| **`U-6`** | **A right-click drops the drag and resets** | nothing to drop and nothing to reset | the drop **commits nothing** (`zero` sink writes — established by an unchanged `html` reading before and after) and the visible state returns to the pre-drag size — **`MANUAL` + the `[H]` pair** | `[U]` (MANUAL) + `[H]` |
| **`U-7`** | **The demo's census and tool outputs after the authoring change** | the pre-change census, `get_rendered_html` length and `get_markdown` text — **recorded BEFORE the change** | the post-change readings, **recorded as deltas rather than projected** — and the **`data-node-id` of every new authored element is present in both views** | `[U]` + `[H]` |

**2. ⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R2`) — THE STRUCTURED COVERAGE REPORT IS A
MANUAL RECORD, BECAUSE NO SHIPPED INSTRUMENT EMITS IT.** **THE AS-FILED CLAUSE SAID *"the live runner must
emit"* it and quoted a JSON shape — but NO ALLOWED TOOL EMITS IT: `scripts/electron-ui.mjs` prints a
`UI RESULT:` line and takes exactly ONE measurement, `scripts/mcp-cli.mjs` has no such schema, and
`scripts/**` is DENIED (`§5.1` item 6), so this unit cannot add an emitter.** **THE RULING — the MANUAL
record, chosen because the rows ARE reachable by a human operator in a real window even though no
automated tool can drive or read them: the report is written by the live-battery runner, and every field
below is filled and QUOTED VERBATIM in the DONE row.** **THE EXACT FIELDS THE RUNNER MUST FILL, per
U-row, with nothing left to memory:**

| Field | What the runner MUST write | The record FAILS if… |
| --- | --- | --- |
| `u` | the U-row id, in matrix order (`U-1` … `U-7`) | an id not in `§5.U`'s matrix, or a missing id |
| `layer` | `U` / `H` / `T` per the matrix cell | a layer the matrix does not give that row |
| `instrument` | the EXACT instrument — one of `npm run ui` · `npm run mcp -- --target http --port 3787 <tool>` · `npm start` · **`MANUAL OPERATOR`** (a human driving the real window) — **never "the live gate"** | the words *"the live gate"* or *"the leg"* standing alone |
| `cmd` | the EXACT command line, copied from item 4's table, **or the literal token `MANUAL`** | a paraphrased command |
| `exit` | the command's exit code (`0` for a `MANUAL` row, whose evidence is its quoted observation) | a verdict with no exit code |
| `observed` | **the exact observed VALUE** — the tool's output line, or the operator's observation (what was seen, on which element) | a projection, a restatement of the matrix's expectation, or "as expected" |
| `verdict` | `CHANGED` / `UNCHANGED` / `NOT-OBSERVABLE` | `NOT-OBSERVABLE` **without** a structural `reason`, or reached for convenience (`§4.4 S-12`) |
| `reason` | REQUIRED for `NOT-OBSERVABLE`: the structural reason (*no shipped instrument carries a pointer coordinate* / *the tools read the graph, not the live preview style* / …) | a `NOT-OBSERVABLE` row with an empty reason |
| `before` | for `U-7` only: the PRE-change reading, **taken before the authored card landed** | a delta with no recorded before |

**THE AS-FILED JSON SHAPE IS KEPT — with its three falsifiable clauses intact — because the manual record
uses the SAME field names (it is the same object, written by a human instead of by a script). It is a JSON
object with AT LEAST these
fields, and the live battery's record quotes it verbatim** (`§5.3` item 12):

```
{
  "unit": "U-GUTTER-UI",
  "matrixSource": "docs/specs/gutter-ui.md §5.U",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": false,        // the gap, U-GAP-1 — asserted FALSE at THIS tree
  "emitter": "MANUAL",                    // ⟶ no shipped instrument emits this report (§R R2)
  "rows": [
    { "u": "U-1", "layer": "U|H", "instrument": "<exact instrument>", "cmd": "<exact command>", "exit": 0,
      "observation": "<the measured value, verbatim>", "verdict": "CHANGED|UNCHANGED|NOT-OBSERVABLE",
      "reason": "<required iff NOT-OBSERVABLE>" },
    …one entry per matrix U-row, in matrix order…
  ],
  "summary": { "total": 8, "changed": <n>, "unchanged": <n>, "notObservable": <n> },
  "commands": [ { "cmd": "<the exact command>", "exit": <code>, "observed": "<value>" }, … ]
}
```

**Three clauses are falsifiable and each is a row: (i)** **`summary.total` MUST EQUAL the matrix's U-row
count (`8` — **⟶ CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.3`): the as-filed figure here was `7`; the matrix gained `U-8` (the `C-8` real-open-window sequence) and `summary.total` moves WITH it — a report reconciling against a stale count is the SHORT-REPORT class this clause exists to catch, so the two sites move together or neither does**) — a zero-row or short report is **invalid**, not empty** (`docs/pending.md` §I's own
consequence clause for `U-GSESSION`); **(ii)** **every `rows[i].verdict` must be accompanied by an
`observation`**, and a `NOT-OBSERVABLE` verdict **must name the structural reason** — **a `NOT-OBSERVABLE`
verdict reached for convenience is `§4.4 S-12` and does not land**; **(iii)** **every `commands[i]` entry
carries the exact command and its exit code**, so the report cannot be authored from memory.
**⟶ AND A FOURTH, added 2026-09-27 (`§R` `R2`): (iv) every `rows[i]` entry names its `instrument` from the
closed set above, and a `MANUAL OPERATOR` row carries the operator's own observation rather than a tool's
output — the record may not blur the two.**

**⟶ ADDED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A6`) — THE COVERAGE REPORT IS FILLED FROM THE RUNS, NEVER AUTHORED: SIX BINDING CLAUSES.** **THE AS-FILED *"authored rather than emitted"* PROHIBITION IS NOT ENOUGH ON ITS OWN — a manual record CAN be authored from memory and still read as complete — so the following are stated as clauses a TestWriter and the live runner can both be held to:**
1. **`summary.total === 8`** — the report's total MUST EQUAL the matrix's U-row count (`8`), **and the three per-verdict counts must sum to it**; **a short report, a zero-row report or a total that disagrees with the matrix is INVALID rather than empty** (`§5.U` item 3(a), `§5.U` item 6's falsifiable clause (i)).
2. **EVERY `instrument` IS FROM THE CLOSED SET** — `npm run ui` · `npm run mcp -- --target http --port 3787 <tool>` · `npm start` · `MANUAL OPERATOR` — **and a row whose `instrument` is the words *"the live gate"* or *"the leg"* standing alone FAILS the report** (`§5.U` item 2's `instrument` field, item 3(e)).
3. **EVERY `cmd` IS A LITERAL COMMAND LINE OR THE LITERAL TOKEN `MANUAL`** — copied from item 4's table, never paraphrased; **and each command carries its own `exit` code** (`§5.U` item 2's `cmd`/`exit` fields).
4. **EVERY `MANUAL` ROW'S `observation` IS AN OPERATOR OBSERVATION — what was seen, and on which element — and NEVER a tool's output line.** **The two may not be blurred**, in either direction: **a tool's output line presented as an operator observation FAILS this clause**, and **an operator's description presented as a shipped instrument's output FAILS it too** (`§5.U` item 2's `observed` field, item 3(e)).
5. **`U-3`/`U-4`/`U-6` ARE LABELLED WITH THEIR STRUCTURAL REASONS** — `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`, reason *no shipped instrument carries a pointer coordinate and none reads a transient style write* — **and a `NOT-OBSERVABLE` verdict with an empty `reason`, or reached for convenience, is `§4.4 S-12` and does not land** (`§5.U` item 2's `reason` field).
6. **`U-GAP-1` IS RECORDED OPEN** — **`predicateSourcePresent: false`** with the gap's owner and revisit condition, **unless `docs/specs/user-flow-audit.md` has been filed by then, in which case the recorded value changes with the tree and the report says which it is** (`§5.U`'s `U-GAP-1` table, `§5.U` item 3(d)).
**AND THE RULE THE SIX SHARE: the report's fields are FILLED FROM THE RUNS — a field that could have been written before the live battery ran is a defect of the record, whether or not it happens to be accurate** (`§5.3` item 12; `§5.U` item 3's read-only audit).

**⟶ ITEM 4 IS PLACED AFTER ITEM 3, because it is the runner's TABLE and item 3 is its AUDIT — see the
end of this subsection.**

**3. THE READ-ONLY AUDIT ON THAT REPORT.** **After the live run, a READ-ONLY pass (the adversarial pass's
`B-12`, or the per-unit documentation review) audits the report and must: (a) reconcile
`summary.total` against `§5.U`'s row count; (b) reconcile every `verdict` against the recorded
`observation` and the recorded `commands` — **a `CHANGED` verdict with no command that produced the change
is a finding**; (c) check that the **`U-7` delta is a measurement rather than a projection**; and (d)
record that **`predicateSourcePresent` is `false` and the gap `U-GAP-1` is still open** unless the
predicate has been filed by then. **The audit is READ-ONLY: it changes no `src/**`, no `tests/**` and no
script.** **A live-battery record whose coverage report was authored rather than emitted is a review
finding** (`§5.3` item 12). **⟶ AMENDED 2026-09-27 (`§R` `R2`): *"authored rather than emitted"* now means
*a report whose fields were not filled from the runs below* — the report IS manual by ruling, so (e) the
audit must check that **every `rows[i].instrument` is one of the closed set, that every `cmd` is the exact
command line or the literal `MANUAL`, and that a `MANUAL` row's `observation` reads as an operator's
observation rather than a tool's output line.**

**4. ⟶ ADDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R2`) — THE OBSERVABLE/INSTRUMENT TABLE, one line
per U-row: the exact command and the exact observed value.** **This is the table the live runner fills.**
**The authored ids below are the ids `§2.1` item 7's authored card pins (the affordance's authored
`css.id`/`props.id` — `gutter-vertical` is the id `§5.2` leg 6 already dispatches, and the target's and
status node's authored ids are the card's own); the ROW asserts them by name, it does not invent them**
(`§3.5 R-9`).

| U-row | Instrument | Exact command (`cmd`) | The exact observed value (`observed`) | Verdict as filed |
| --- | --- | --- | --- | --- |
| **`U-1`** | **`npm start` + `npm run mcp -- --target http --port 3787 targets`** | `npm start` (boot) then `npm run mcp -- --target http --port 3787 targets` | the returned target list **contains the affordance's authored `css.id` and `props.id` (`gutter-vertical`) and the card's other authored ids** — recorded as the tool's own list entry | **OBSERVABLE — this row IS measured by a shipped instrument** |
| **`U-2`** | **(a)** `npm run mcp -- --target http --port 3787 html` · **(b)** **`MANUAL OPERATOR`** for the hover half | (a) `npm run mcp -- --target http --port 3787 html` · (b) `MANUAL` | (a) **the affordance element's rendered markup carries its authored base `cursor` declaration** (the `html` output's own element line) · (b) **with the pointer over `#gutter-vertical`, the browser-applied cursor is the declaration `cursorOf` resolved, and on exit it returns to the base** — the operator records what the real renderer applied | **OBSERVABLE (base declaration) + MANUAL-only for the hover write — no shipped instrument reads an applied style on the demo's element** (`get_rendered_html` reads the mount's markup; the leg's one measurement is taken on its own probe envelope) |
| **`U-3`** | **`MANUAL OPERATOR`** | `MANUAL` (after `npm start`) | **the operator's observation: a primary press on the affordance starts the drag**; the graph-visible half is recorded by `U-1`'s `dispatch` check (`npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown`, whose result proves the authored handler is reachable) | **MANUAL-only — no shipped instrument carries a pointer coordinate, so no automated call can press the affordance; `dispatch` fires the authored handler without a button or a coordinate** |
| **`U-4`** | **`MANUAL OPERATOR`** | `MANUAL` (after `npm start`) | **the operator's observation: the target element's rendered size follows the pointer during the drag, AND — `§R` `R7`/`R8`(d) — an invalid drag REVERTS visibly to the pre-drag size rather than freezing at its last valid preview**; the committed value is read back afterwards with `npm run mcp -- --target http --port 3787 html` | **MANUAL-only — the preview is a transient style write no shipped tool reads** |
| **`U-5`** | **`MANUAL OPERATOR`** + `npm run mcp -- --target http --port 3787 html` | `MANUAL`, then `npm run mcp -- --target http --port 3787 html` | **the graph's authored status content carries the committed value** — the clamped dragged value after a valid release, the clamped pre-drag size after an invalid one — read out of the `html`/`get_markdown` output; the operator records the release it performed | **MANUAL for the interaction, `[H]` for the committed reading** |
| **`U-6`** | **`MANUAL OPERATOR`** | `MANUAL` (after `npm start`) | **the operator's observation: a secondary press during the drag returns the visible state to the pre-drag size, and the graph's status content does NOT change** (zero commits) — the zero is established by the unchanged `html` reading taken before and after | **MANUAL-only, with an `[H]` before/after pair** |
| **`U-7`** | **`npm run mcp -- --target http --port 3787 targets`** and **`… html`**, against the **recorded before-reading** | the two commands above, run **before** and **after** the authored card lands | **the census counts and the `data-node-id` set: the card's new nodes and their node ids appear, and the pre-change readings were TAKEN, not projected** — a delta, not a projection | **OBSERVABLE — this row IS measured by shipped instruments** |
| **`U-8`** | **`npm start`** then the **MCP tools** (`targets`, `html`, `dispatch`), inside **ONE open window** — **plus, ⟶ as of 2026-09-27, THE `E-2` PASS, ONE `MANUAL OPERATOR` reading `(e)` on the SAME window** | `npm start` (boot; the window stays open) · `npm run mcp -- --target http --port 3787 targets` · `… html` · `… dispatch gutter-vertical pointerdown` | **FIVE readings from the SAME open window, quoted verbatim with their exit codes:** (a) `targets` list carries the authored `css.id`/`props.id` (`gutter-vertical`); (b) `html` carries the affordance element's `data-node-id` (so the element the WIRING resolved is the PRODUCING GRAPH's own element); (c) `dispatch … pointerdown` answers the authored handler's `{results, dirtied}`; (d) **the sequence was performed without a restart** (one boot, four commands), which is what makes (b) a statement about the WIRING rather than about a stale tree; **⟶ (e) ADDED 2026-09-27, THE `E-2` PASS — THE LIVE SECOND-GESTURE OBSERVATION: after ONE committed drag (drag → release, so the wiring's `commit` write has RUN), the operator performs a SECOND drag on the SAME affordance and records (e)(1) that the affordance resolves to the SAME element object across the write — asserted BOTH by the same `data-node-id` IN BOTH `html` readings AND by object identity of the element the wiring holds before and after the commit (an operator observation, or an instrument reading that reports the same object) — and (e)(2) that the SECOND drag COMMITS (the graph's authored status content changes again, read back with `… html`).** **This is the row that would have caught the SINGLE-SHOT failure the node suite is structurally blind to, and it is MANDATORY with the rest of the battery** (`docs/pending.md` §I-duodecies; `§2.1` item 8, `§2.3` row 15, `§3.1 M-19`, `§7a.1` item 4). **A record that reports a second drag which does not commit, or an element object that differs across the write, FAILS this row — and a record that omits (e) is an incomplete `U-8`, not a passing one.** | **OBSERVABLE — a shipped instrument measures all FOUR machine readings (a)–(d), and reading `(e)` — the second gesture's element identity and its committed value — is measured by a `MANUAL OPERATOR` observation on the same open window (no shipped instrument carries a pointer coordinate or reads an element's object identity), with `(e)(1)`'s `data-node-id` pair cross-checked against the `html` readings** (`§R.3`; `§5.U` item 2's `instrument` field; `docs/pending.md` §I-duodecies) (`C-8`; `§R.3`) |

| `[U]` + `[H]` |

**⟶ AND ONE FIELD-SHAPE CLARIFICATION, added 2026-09-27 (`§R.3`), so the new `U-8` row's composite instrument is not read as a defect:** **item 2's `rows[i].instrument` is a STRING field, so a row whose instrument is a SEQUENCE names its readings the way item 4's table does — `"npm start; npm run mcp -- --target http --port 3787 targets; … html; … dispatch gutter-vertical pointerdown"` — with the readings quoted in `observation` and each command ALSO carrying its own `commands[i]` entry (with its exit code).** **A composite instrument is NOT a report defect; a row whose instrument is the words *"the live gate"*, or whose observation is a projection, IS.**

**⟶ TIGHTENED 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A5`) — `U-8`'s READING `(e)` IS WIDENED FROM "A SECOND COMMIT HAPPENED" TO "THE SECOND GESTURE'S COMMITTED VALUE IS RECORDED".** **THE AS-FILED `(e)` (both the matrix cell above and the row's own `(5)` below) required two facts: the SAME element object across the commit write, and that the second drag COMMITS.** **THE TIGHTENING ADDS A THIRD, AND IT IS THE ONE THIS CONDITION EXISTS FOR: `(e)` MUST RECORD THE SECOND GESTURE'S COMMITTED VALUE — the value the operator dragged to on the SECOND drag, read back out of the authored STATUS/readout node — and MUST COMPARE IT AGAINST THE PRE-DRAG SIZE AS AN EXPLICIT NEGATIVE CONTROL (the pre-drag size must FAIL that reading), exactly as `U-5`'s tightened reading requires for the FIRST commit.** **WHY: "a second commit happened" is satisfied by a WRONG committed value exactly as `U-5`'s as-filed wording was (`§R.4` `C-A5`'s finding) — the second drag can commit the RAW PRE-DRAG SIZE through `E3`'s fallback default and the row would still read as a pass.** **A record of `(e)` that reports only *"the status content changed again"*, or that records a second committed value EQUAL TO THE PRE-DRAG SIZE, FAILS this row; and the second committed value MUST differ from the FIRST gesture's committed value, recorded as a comparison rather than an implication.**
| **`U-8`** | **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.3`), ANSWERING `C-8`: the affordance is reachable AND dispatchable on a real boot, in one recorded command sequence.** *(The id `U-8` was FREE: the as-filed matrix ran `U-1`..`U-7`, so this added row takes the next free id and NOTHING is renumbered. `U-8` is the SECOND row the `8`-row cap admits; a ninth is NOT free.)* | **A REAL OPEN WINDOW, one recorded sequence, FOUR readings — ⟶ FIVE AS OF 2026-09-27, THE `E-2` PASS (reading `(5)` below, NO new row id — the `8`-row cap is unchanged and nothing is renumbered):** **(1)** `npm start` — the app boots the authored demo envelope; **(2)** `npm run mcp -- --target http --port 3787 targets` — the affordance's authored `css.id`/`props.id` (`gutter-vertical`) appear in the returned target list; **(3)** `npm run mcp -- --target http --port 3787 html` — the affordance element's `data-node-id` appears in `get_rendered_html`, so the element the WIRING resolved is the element the PRODUCING GRAPH emitted; **(4)** `npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown` — the authored handler answers `{results, dirtied}`; **⟶ (5) ADDED 2026-09-27, THE `E-2` PASS — THE LIVE SECOND GESTURE: with the SAME window still open, the operator drives a real drag to a COMMIT, then drives a SECOND real drag on the SAME affordance and records the two facts `(e)` states — the affordance element resolves to the SAME OBJECT across the commit write (same `data-node-id` in both `html` readings, plus object identity), and the second drag COMMITS (the status content changes again).** **The window is OPEN for the whole sequence** (one boot, no restart), and **the operator records the raw outputs of every reading, each with its exit code** (`§5.U` item 2's field set, `emitter: MANUAL` for the sequence as a whole); **the `(5)` reading is the EVIDENCE `E-2`'s ruling owed** (`docs/pending.md` §I-duodecies, `§3.1 M-19`, `§2.3` row 15). | `[U]` + `[H]` |

**⟶ THE INSTRUMENT ASSIGNMENT, STATED SO NO ROW IS OVER-CLAIMED (`§R` `R2`):** **`npm run ui`
(`scripts/electron-ui.mjs`) measures NONE of these rows directly — it takes exactly ONE measurement, on ITS
OWN probe envelope loaded through `provident.load`, and its `R0`–`R4` assertions are the LEG's own rows,
not this unit's.** **What `npm run ui` contributes to this unit is: (a) its mandatory `[U]` green as the
leg's own measurement, and (b) its `R4` honest-limits line, which is the leg's own statement that
`provident.dispatch` carries no coordinates — the reason three rows above are `MANUAL`.** **`npm run
divergence` is the precondition and the `N = 9` identity leg, never this unit's evidence.** **`npm start` +
`npm run mcp -- --target http` IS the project's live driver and DOES measure `U-1` and `U-7` (census,
vocabulary, rendered HTML) — and it cannot carry a coordinate, a button, an applied style or a transient
preview write; a row that claims otherwise is a FALSE RECORD (`§7` item 6).**

**⟶ LABELS, STATED AS LABELS (`§R` `R2`): `U-3`/`U-4`/`U-6` are `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT`
with the structural reason *no shipped instrument carries a pointer coordinate and none reads a transient
style write*, and their `Post` observation is discharged by a `MANUAL OPERATOR` record — they are NOT
relabelled `NOT-OBSERVABLE` in the sense that the work is unobservable, because a real operator in the real
app observes exactly what the architect's intent statement describes.** **A pass that parks one of them for
CONVENIENCE is `§4.4 S-12` and does not land.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.**

1. **THE COMPOSITION HALF.** *If this unit cannot drive the `E3` controller and the landed session from a
   real consumer — one sink call per gesture, the closed session read set honoured, the disposed-session
   short-circuit honoured, and a TOSSED-OVER record on a throwing hook — then the composition this unit
   exists to demonstrate is not realisable, and the unit fails on that half. **Equally, if it cannot do so
   WITHOUT re-expressing the session's lifecycle or `E3`'s discipline, it exceeds its scope and fails.***
   **The tests are `M-1`..`M-5`, `I-1`/`I-2`/`I-8`, `R-4`/`R-5`, `R-8`, and the register rows
   `P-GU-SM-1`/`P-GU-IM-2`.**
2. **THE INTERACTION HALF.** *If the five clauses of the architect's intent cannot each be discharged by a
   falsifiable row over the module's own surface — hover ⇒ a resolved cursor declaration written once; a
   press ⇒ an establishment; a drag ⇒ a value derived from the pointer through the caller's mapping and
   shown through the preview channel; a valid release ⇒ one commit of the clamped dragged value; an
   invalid release ⇒ one reset to the pre-drag size; a right-click ⇒ a drop with zero commits and a
   preview revert — then the behaviour is not realisable as specified and the unit fails.* **The tests
   are `M-8`..`M-14`, **`F-1`..`F-14`** (**⟶ WIDENED 2026-09-27, `§R` `R5`: the as-filed range read *"`F-1`..`F-11`"*; `F-11` is DELETED with a tombstone, `F-12`/`F-13` already existed, and the added `F-14` takes the next free id — so a citation to the CLOSED range is the honest form**), `I-5`, and the register rows `P-GU-SM-2`/`P-GU-SM-3`/`P-GU-IM-1`.**
3. **THE LAYER HALF.** *If the unit cannot express its rendered claims as `[U]` rows run on the live leg —
   i.e. if a rendered claim has to be made from the node suite to be falsifiable — then the unit exceeds
   its provable layer at `[T]` and the unit fails.* **The tests are `F-13`, `I-10`, `R-10`, `§5.2`'s
   named `[U]` set and `§5.U`'s coverage report; the finding it prevents is the false-green class in which
   a node-suite green is reported as a rendered proof.**
4. **THE AUTHORSHIP HALF.** *If the affordance cannot be delivered as provident-authored data — if any
   part of it must be hand-written DOM, a created element, injected markup, a class taxonomy or a text
   node written from the module — then the unit violates the project-wide constraint and fails.* **The
   tests are `R-1`/`R-2`, `§2.1` items 6/7, and the live battery's `U-1`/`U-7` rows.**

**The three outcomes, exhaustively:** **(a)** the module and the authored card land as spec'd; **(b)** an
**impossible** clause is found and **the spec is amended**, with the clause marked `SUPERSEDED` and the
reason recorded **before** implementation continues — **the most likely candidates are `§7a.1`'s three
items**; or **(c)** the unit is **declined back** — admissible only if a clause is shown to be
**inseparable from `E3`'s or the session's own lifecycle** (which would refute the composition claim) or
**inseparable from a rendered geometry in a way the live leg cannot observe** (which would refute the
`[U]` claim), and **either would be a NEW GATE, not this unit's call.**

**Stop conditions (`S-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]`/`[D]`
leg** — it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This
filing has exactly ONE such candidate and it is already named: every rendered-geometry, applied-style,
cursor-effect and real-pointer claim, which is `[U]`-only and is listed BY NAME in `§5.2`** — **no such
claim is authored as a register row, and none is moved to the live leg silently** (`§5.2`'s
`[U]` set; `docs/specs/zones.md` `§4.4 S-6`).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This filing writes **one new spec file** and **nothing
   else**. The affordance module, the demo-envelope card, the test file, the red set, every leg, the live
   battery and the register's executed layer are **OWED**; **the unit is NOT delegable until a TestWriter
   has RUN and REPORTED the red set** (`§4.5`).
2. **THE COORDINATE LIVES HERE, AND IT IS THE ONLY ONE IN THE FAMILY.** This unit reads `clientX`/`clientY`
   in **exactly one function**, and it ships **no drag arithmetic of its own** — the coordinate-to-size
   mapping is the caller's (`§0A` note 4). **No pass may claim that this unit computes a magnitude, a
   distance or a delta, and no pass may claim that `E3` does** (`§3.4 R-3`, `§4.4 S-3`).
3. **THE PARKED `E3` CHECKS' DISPOSITION, stated so no reader expects this unit to FIX them.** This
   filing **carries the four obligations as rows** (`M-1`..`M-5`) and **names the remedy's owner**: a
   failure is **`OWED — E3-SIDE`**, reported to the supervisor, **never fixed from this unit** — because
   `src/shared/gutter.ts` and `tests/gutter.test.ts` are **DENIED paths** (`§5.1`, `§3.2 F-5`, `§3b`).
   **What this unit guarantees is that the defects are OBSERVABLE, not that they are fixed.**
4. **THE AUTHORSHIP CONSTRAINT WAS SATISFIED BY DATA, NOT BY AN EXCEPTION.** The affordance is **envelope
   data** (`§2.1` item 7). **The one nuance a reader must not misread:** the **transient preview and cursor
   writes** are applied **through caller-supplied seams to the provident-RENDERED elements** — they create
   no element, author no provident data and are **not** a second rendering path; **the committed state is
   the graph's, and the graph is where the value is read back** (`§2.5` items 4/6). **A pass that
   describes the preview as "the UI rendering itself outside the framework" has misread this contract.**
5. **THE LIVE BATTERY IS MANDATORY, AND ITS REASONS ARE RECORDED.** This is a **UI-RENDERING unit**
   (ruling 5). **It may park the live leg ONLY for a STRUCTURAL reason** — an OS-owned native dialog, or a
   scope the leg cannot reach — **recorded with its evidence**, and **never for convenience** (`§4.4
   S-12`). **The exact commands are `§5.2`'s legs 5/6/7.** **⟶ AMENDED 2026-09-27, THE GATE-1 REPAIR PASS
   (`§R` `R2`): the mandate is UNCHANGED and the SCOPE is corrected — the leg's ONE measurement is taken on
   the leg's OWN probe envelope (loaded through `provident.load`), `provident.dispatch` carries an event
   name and NO coordinates, and **`npm run ui` does NOT measure the demo's affordance or any `§5.U` row**;
   what it contributes is its mandatory `[U]` green, its `R0`–`R4` rows, and its own `R4` honest-limits
   statement.** **The rows this unit offers as `[U]` are discharged by `§5.U` item 4's table — two by
   shipped tools (`U-1`, `U-7`), one partly (`U-2`), and three by a `MANUAL OPERATOR` record
   (`U-3`/`U-4`/`U-6`).**
6. **THE MCP SURFACE CANNOT CARRY A COORDINATE, AND THIS UNIT SAYS SO.** The interaction's pointer-driven
   half is exercised by the **real-DOM leg** and by the module's own drives over synthetic event objects
   through the source seam — **not** by `provident.dispatch`. **A live record claiming an MCP-driven
   drag is a false record** (`§5.2` leg 6).
7. **THE USER-FLOW-AUDIT GAP IS RECORDED, NOT OMITTED.** `docs/specs/user-flow-audit.md` **does not exist
   in this tree** (sixth confirmation), so the predicate has **no filed source**; the matrix is authored in
   the instructions' form and the gap is filed at **`§5.U`'s `U-GAP-1` with an owner and a revisit
   condition**.
8. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` this pass:
   `process-guardrails.md` alone), so there is **no test-use-case coverage matrix and no demo-page index to
   update** — **and this unit DOES render a page element**, unlike `E3`, so **if that file comes to exist,
   this unit owes the coverage row and the demo-page entry for the authored card** (`§3.4 R-10`'s
   branching probe). **A pass that leaves the probe non-branching has authored a defective row.**
9. **THE DEMO'S DRIFT IS A REAL COST OF THIS UNIT.** The authored card **changes the demo's rendered
   census, its HTML and its markdown**, and **any demo-keyed assertion elsewhere in the repo may drift
   because of it.** **The drift is MEASURED, never assumed** (`§3.3 I-11`, `§3.5 R-9`, `§5.U`'s `U-7`),
   and **a pass that reports a projected delta has not measured it.**
10. **NO RENDERED FACT IS PROVEN BY THE REGISTER.** The register (`§5.5.1`) is `[T]` evidence over
    caller-supplied objects and the shim; **the rendered facts are `§5.2`'s `[U]` rows** (`§5.5.2` item 3).
11. **NO NEW MCP SURFACE, NO STORE, NO PERSISTENCE, NO SHELL CHANGE, NO CONFIG CHANGE.** `ALL_TOOLS`
    stays the pinned **21-name** set, `RpcMethod` **21**, `MUTATING_METHODS` **7**, `VALID_GROUPS` **5**;
    **this unit appears in none of the six registration sites**; **`stats()` is a module method, not an
    agent-reachable surface** (`§2.2` P-7, `§3.4 R-11`).
12. **THIS UNIT DOES NOT RE-OPEN `E3`'s TWELVE RULINGS, ITS `C1`–`C5`, ITS MUST-NOT LIST OR ITS `C1`'s
    SINGLE-WRITER CLAUSE** (ruling 7). It **composes** them; **a clause of this file that contradicts one
    is a finding against THIS file.**
13. **THE SESSION'S PARKED CAPTURE-RELEASE QUESTION IS NEITHER RELEASED NOR RE-OPENED.** This unit
    **does** produce capture calls when the caller opts in — and **that is exactly why the parked question
    stays parked with its existing trigger** (`docs/pending.md` §I; `§0A` note 10). **A pass that needs a
    release opens a NEW clause with its own gate.**
    **⟶ SWEPT AND CORRECTED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`, condition `C-9`).**
    **THE AS-FILED CLAUSE'S FIRST SENTENCE — *"This unit DOES produce capture calls when the caller opts
    in"* — IS STALE AND FALSE, and it survived the repair pass that withdrew the capture claim (`§R` `R5`,
    `§2.6` item 4, `§3.3 I-13`, `§3.2 F-14`).**
    **⟶ RE-SWEPT AND CONFIRMED 2026-09-27, THE `E-2`/`E-3` PASS: THIS ITEM CARRIES NEITHER WITHDRAWN
    READING — not a capture opt-in of this unit's (it installs none and passes no `capture` field anywhere)
    and not an element-identity policy (the element's survival across the commit is the RUNTIME's ruled
    behaviour, `§2.1` item 8, `§2.5` item 5, `§2.3` row 15, so this unit holds no such policy at all).** **THE LIVE CLAUSE: this unit produces NO capture call at
    all, passes NO `capture` field anywhere, and contains no `releasePointerCapture`** — the capability is
    the session's own and **no opt-in of this unit's can reach it**; **the need is the named `E3`-SIDE owed
    item, and the parked capture-release question therefore keeps its EXISTING trigger untouched** (this
    unit neither releases it nor re-opens it, and now it cannot even touch it). **A pass that reads the
    as-filed sentence as live has misread the contract; a pass that needs a release opens a NEW clause with
    its own gate.**
15. **⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-16`): A POST-BOOT RE-DERIVATION IS OUT
    OF CONTRACT, AND THE WIRING DOES NOT RE-ATTACH.** **The affordance is attached ONCE, at boot, from
    `main()` (immediately after `runtime.bootstrap()`, `§2.1` item 8(ii)).** **A re-derivation after boot —
    `provident.load`, `code.load`, `code.loadBatch`, a journal base-restore, a teardown — TEARS THE GRAPH
    DOWN (`Runtime.loadEnvelope`/`loadDoc`/`tearDownGraph`, the mounted elements replaced) and THE WIRING
    DOES NOT RE-ATTACH: the session's listeners and the module's own listeners were attached to the
    PREVIOUS tree's elements.** **THE CONSEQUENCE, STATED RATHER THAN DISCOVERED LATER: after any such
    re-derivation the affordance is INERT until the app is reloaded — no gesture, no cursor, no preview, and
    NO THROW (the module's turns are total, `I-7`).** **THIS IS OUT OF CONTRACT, NOT A DEFECT OF THIS UNIT,
    and it is the SAME element-identity question as the commit's** (`E-2`, `§2.5` item 5, `§2.3` row 15):
    **the REBIND obligation is `E-2`'s, it is the architect's, and this pass grants NO rebind role.** **A
    delegation prompt, a red row or a DONE row that claims re-attachment after a re-derivation FAILS this
    item.**
    **⟶ ANNOTATED 2026-09-27, THE `E-2` PASS (the architect's *"Reuse"*, `docs/pending.md` §I-duodecies),
    SO THIS ITEM IS NOT MISREAD AS STILL-OPEN:** **`E-2` IS RULED — the runtime REUSES the emitted element
    across a GRAPH WRITE, so the COMMIT no longer leaves a dead element and there is NO rebind role
    (`§2.1` item 8, `§2.5` item 5, `§2.3` row 15, `§3.1 M-19`).** **WHAT THIS ITEM DESCRIBES IS THEREFORE A
    NARROWER, STILL-TRUE CLASS: a POST-BOOT RE-DERIVATION (`load`/`code.load`/`loadBatch`/a journal
    base-restore/a teardown), which REBUILDS the tree rather than patching one element — the wiring still
    does NOT re-attach, the affordance is still INERT until reload, and **the reuse ruling does NOT extend
    to it** (`§2.3` row 16).** **The element-identity question this item shared with the commit's is CLOSED;
    the re-derivation's out-of-contract status is NOT `E-2`'s and stays as stated.**
14. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/gutter-ui.md` — and edited NO existing
    file.** It ran **no test, no suite, no leg, no trio, no `tsc` invocation, no Electron boot and no git
    command**; it wrote **no code**; and it touched **no `src/**`, no `tests/**`, no sibling spec, no
    tracker, no `package.json`, no `scripts/**`, no config and no adjacent repo.** **The tracker cells it
    leaves stale — `E10`'s spec cell reading `OWED — not filed` and its as-filed `BLOCKED` chain — are the
    SUPERVISOR's to reconcile**, recorded here so the staleness is **attributable rather than silent**
    (`§8`).
    **⟶ RECORDED 2026-09-27, THE GATE-1 REPAIR PASS (`§R`): the FIRST pass's extent above is kept as its
    own record, and THIS pass's extent is the same ONE FILE — but its `src/**`/`tests/**` reading is
    unchanged: no source or test file was edited by either pass. What CHANGED is the CONTRACT's text, in
    the places `§R` lists (the renderer wiring is now allowed and bounded, the register total is `140`, the
    capture claim is withdrawn, the value/move/invalid-release channels are ruled, and the `§5.U`
    observables have instruments). The three sentences the repaired contract must answer are at `§R.1`,
    and the state the unit is in after the repair — NOT green, NOT delegable, gate-1 steps 3–4 still owed —
    is at the file-end `⟶ RECORDED` block.**

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **THREE clauses** could not be derived **falsifiably**
from the architect's intent statement and the sources, because **two admissible readings both satisfy
their words and the choice changes either a PUBLIC SURFACE or a CONSUMER OBLIGATION.** **They are
REPORTED here with a WORKING DEFAULT (this filing's choice, implemented in `§2` and marked as a choice), a
RECOMMENDATION and the CLAUSE each one BLOCKS.** **No item is left as a silent gap**, and **no `§2`/`§3`
row, prohibition, register row or diff-scope clause is weakened, widened or re-scoped by this report.**
**A later pass that changes any of these three defaults MUST OPEN A GATE.**
**⟶ AMENDED 2026-09-27, THE `E-2`/`E-3` PASS: THE LIST BELOW IS STILL FIVE ITEMS, BUT ONLY TWO OF THEM ARE
OPEN — `item 2` was ruled by the gate-1 repair pass (`§R` `R7`), `item 4` (`E-2`, the commit write's
element identity) is now CLOSED by the architect's *"Reuse"* (`docs/pending.md` §I-duodecies), and `item 5`
(`E-3`, the declared register terms) is now CLOSED by the architect's *"Re-grain."* (`docs/pending.md`
§I-terdecies).** **Each closed item keeps its question, working default and recommendation VISIBLE as the
record of what was asked and recommended, with the ruling annotated above or after it — and the two
recommendations that are now SUPERSEDED are named where they stand: item 4's *"rule the element-reuse
question by measurement"* and item 5's *"keep `140` and the distinct-beside-declared form"*.**

### 7a.1 THE OPEN QUESTIONS — ⟶ five items as of 2026-09-27 (the as-filed heading read *"three items"*; items 4/5 were added by the gate-1 step-3 repair pass, `§R.2`), each with a working default, a recommendation and a blocked clause

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **THE HOVER EVALUATION BUDGET for the axis/cursor seam** — *"On mouseover: change cursor to the appropriate shape for vertical/horizontal adjustment"* requires the axis **before any gesture exists**, while `E3`'s `axisFor` is called **at most once per ESTABLISHED gesture** and the controller may not be asked outside one (`docs/specs/gutter.md` `§0A` note 5, `§2.3` item 2(b)) | **A row cannot assert "the hover read costs zero controller calls" AND "the cursor's axis is the controller's axis" from the sources alone**: they are the same reading taken at two different times, and the budget decides whether the seam is consulted once per hover, once per move, or once per gesture | **The module reads its OWN `axisOf(element)` on the HOVER path** — once per `'pointerover'`, with `cursorOf` once per evaluation and `applyCursor` once per enter/exit — and **ZERO calls to `E3`'s controller on any hover path**; the caller wires `axisOf` into **both** `E3`'s `axisFor` and the hover read from **ONE closure**, so the two cannot disagree (`§2.6` item 3, `§2.1` item 3) | **Do you accept a hover path that consults the CALLER's own axis seam once per hover entry, with `E3`'s controller untouched (recommended — it keeps `E3` policy-free and the hover cheap), OR do you want the cursor to be resolved only once a gesture has established (which would leave the "mouseover" clause of your intent statement undischarged), OR do you want a per-move hover evaluation (which re-introduces a per-event read the node-local rule discourages)?** | **`M-10`/`M-11`** (the hover rows), `P-GU-IM-2` (`axisOf`'s declared counts), `§2.6` item 3, `§3.4 R-7` (the cursor-vocabulary absence) |
| **2** | **THE TIMING OF THE INVALID-RELEASE DECISION** — **⟶ ANSWERED AND RULED 2026-09-27, THE GATE-1 REPAIR PASS (`§R` `R7`); the question below is KEPT as the record of what was asked, and the ruling is its answer.** — the intent says *"On release: if dragged state is valid, commit … otherwise, reset"*, while `E3`'s `reset` is legal **only for an ACTIVE gesture** and the session's own `pointerup` listener **ends every gesture at its own terminal** (`docs/specs/gutter.md` `§2.5` item 5 clause 3; `docs/specs/gsession.md` `§2.3` item 4) | **A row cannot assert "an invalid release resets" as a RELEASE-TURN behaviour**: measured against the frozen session, at the release turn there is no active handle to reset — so either the decision moves earlier, or the module must call a terminal itself (which `E3` forbids it), or the frozen session must change (which THIS unit may not do) | **The validity decision is taken from the DRAG's own observed state (the last observed move + the sticky rule) and the invalid arm calls `controller.reset(element)` from the module's own move turn WHILE THE GESTURE IS STILL ACTIVE** — the ONE session-touching call `E3` permits on that path (`§0A` note 6, `§2.3` item 9). **⟶ THE RULING (`§R` `R7`): the VALID path is the session's own `pointerup` ⇒ `end` ⇒ exactly one commit of the CLAMPED DRAGGED VALUE (read from the handle's value channel, `§R` `R6`); the INVALID path is the `reset` terminal taken the moment invalidity is ESTABLISHED (a SEAM FAILURE, not an ordinary out-of-bounds value) ⇒ exactly one commit of the CLAMPED PRE-DRAG SIZE the consumer holds, the handle cleared so the later `pointerup` commits nothing, and the visible state REVERTED. The architect's clause is thereby observably satisfied; the divergence from "decide at the release instant" is stated; and the alternative below — routing the timing to `U-GSESSION` — is NAMED AND REJECTED-FOR-NOW.** | **Do you accept the invalid arm being taken from the drag (recommended — it is the only shape the frozen session supports), OR do you want the frozen session re-opened so that a release can carry a "reset" instruction (a NEW GATE on `U-GSESSION`, which this unit may not open), OR do you want the module to call `session.end`/`session.reset` itself (which re-expresses the lifecycle `E3`'s ruling 3 forbids)?** **⟶ RECOMMENDATION ACCEPTED: the first option is now the CONTRACT.** | **`M-13`** (the invalid reset row), **`F-2`/`F-10`**, `P-GU-SM-3` (its reading that the reset happened while the gesture was ACTIVE), `§4.4 S-4` |
| **3** | **THE PREVIEW CHANNEL'S WRITE FORM** — *"On drag: dynamically show the resized state based on the current cursor position"* does not say **what** is written, while the affordance and the target are **provident-rendered** and a graph write re-renders (`AGENTS.md`'s constraint; `src/renderer/runtime.ts`'s render path) | **A row cannot assert both "the preview is a transient channel that is never the sink" and "the preview is provident-authored data"**: a graph dispatch during a drag re-renders and **replaces the element the session's listener is on**, so the second reading silently breaks the gesture | **The preview is a TRANSIENT PRESENTATION write applied through the caller's `applyPreview` seam — in this repo, a `style` declaration on the live provident-rendered target — and the COMMITTED state is the graph's**, written through `E3`'s one sink and read back through `get_rendered_html`/`get_markdown` (`§2.5` items 4/5/6) | **Do you accept the preview as a transient presentation write on the provident-rendered element, with the COMMITTED state in the graph (recommended — it keeps the element alive for the gesture and keeps the commit MCP-visible), OR do you want the preview itself to be an authored graph update (which needs a re-render-safe rebinding story the frozen session does not provide), OR do you want no live preview at all (which would leave your drag clause undischarged)?** | **`M-8`/`M-9`** (the preview counts), **`P-GU-SM-2`**, `§4.4 S-8`, `§5.U`'s `U-4` |
| **4** | **⟶ RULED AND CLOSED 2026-09-27, THE `E-2` PASS — THE ARCHITECT'S ANSWER IS *"Reuse"* (`docs/pending.md` §I-duodecies): THE RUNTIME REUSES THE EMITTED ELEMENT ACROSS A GRAPH WRITE (a `state-slice` apply PATCHES the existing element in place, so ELEMENT IDENTITY IS PRESERVED), the affordance is therefore MULTI-SHOT and NOT single-shot, the wiring owes **NO rebind** and **the wiring keeps FIVE roles — NOT six** (`§2.1` item 8; the SIXTH role the escalation contemplated is **NOT OWED**), a repeat `attach` stays the pinned **first-config-wins no-op** (`§2.3` row 3, `M-7`), and **the evidence is the LIVE second-gesture observation carried by `§5.U` `U-8`(e) — drag → commit → DRAG AGAIN on the same affordance, recording the same element object (same `data-node-id` AND object identity across the write) and a committed second drag.** THE ESCALATION'S RECOMMENDATION AND THE WORKING DEFAULT BELOW ARE **SUPERSEDED AND KEPT VISIBLE AS THE RECORD OF WHAT WAS ASKED**; **the "SINGLE-SHOT until this item is ruled" consequence is WITHDRAWN.** **The OTHER half of the escalation stands unchanged: the sink's WRITE ROUTE is `C-5`'s (one managed-channel write, `Runtime.applyCommand`'s `state-slice` shape) and the re-render hazard of `§2.5` item 5 is bound to the COMMIT as well as to the preview — with the reuse ruling as the reason the commit is SAFE FOR ELEMENT IDENTITY (and not for a structural write, see the boundary clause below).** **AND THE BOUNDARY CLAUSE THE RULING OWES, stated with the identity claim rather than beside it: the commit's write must NOT STRUCTURALLY REPLACE THE AFFORDANCE NODE — reuse covers a PATCH; a write that ADDS, REMOVES or MOVES the affordance's own node (or its authored card's structure) would still change the element. THE SINK TARGETS THE AUTHORED STATUS/READOUT NODE, DELIBERATELY OUTSIDE THE AFFORDANCE'S NODE (`§2.1` item 7(c), `§2.1` item 8(v), `§2.3` row 15, `§3.1 M-19`, `§2.5` item 5, `§5.U` `U-8`(e), `§7` item 15). A reader must not take *"the element is reused"* as a licence to dirty any node it likes.** **⟶ THE AS-FILED, SUPERSEDED FORM — ⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-13`, condition `C-5`): THE COMMIT WRITE'S ELEMENT-IDENTITY QUESTION — `E-2`, ESCALATED BY THE STEP-3 REVIEW AND STILL OPEN.** The wiring's `commit` seam performs **ONE managed-channel write** (`Runtime.applyCommand`, `state-slice` shape) and **`applyCommand` RE-RENDERS** (`§2.3` row 15) — so the write CAN replace the affordance element, exactly as the preview hazard would | **A row cannot assert BOTH *"the affordance survives a commit"* AND *"the write route is the runtime's managed channel"* from the sources alone:** whether the re-emitted element is the SAME object depends on the engine's diff (`renderProducingProcess`'s prevMap semantics) and on whether the affordance's own node is dirtied — **which the node-suite shim does not settle and which no row of this unit may assume.** A `[T]` row can assert the WRITE; it cannot assert element identity on a real render | **THIS REPO'S WORKING DEFAULT, and the honest consequence:** the commit **is permitted and is the only write route** (`§2.1` item 8(v)), **the wiring performs NO rebind after it**, and **the affordance is therefore SINGLE-SHOT in the app until this item is ruled — a second gesture on the same affordance is NOT guaranteed** (the FIRST gesture works, which is what the architect's intent statement requires). **A post-boot re-derivation is the same class and is stated OUT-OF-CONTRACT at `§7` item 15.** | **Does the committed `state-slice` write PRESERVE the affordance element's identity (in which case the affordance is multi-shot and no rebind is needed), OR DOES IT REPLACE it (in which case the wiring owes a REBIND — a SIXTH wiring role, and this spec must gain its clause: re-resolve through `Runtime.elementForNodeId(...)` after a commit and re-`attach()`)? If a rebind is owed, is it in-scope for `U-GUTTER-UI` (one more role on an already-admitted path) or a new gate?** | **RECOMMENDATION (NOT a ruling): rule the element-reuse question by MEASUREMENT first — drive the `U-8` sequence (`npm start` + the four MCP commands) and read the affordance element's `data-node-id` before and after a committed drag; if the node id is STABLE the write preserves identity and `E-2` closes as `NOT-A-FINDING`; if it is not, add the rebind role as a bounded sixth role and a `M-21` row. Until either happens, this spec ships the single-shot default with its consequence stated, and `M-19` FAILS a rebind.** | **`M-19`** (the commit-route row), **`§2.1` item 8(v)**, **`§2.5` item 5**, **`§2.3` rows 15/16**, **`§7` item 15**, the `§5.U` `U-4`/`U-5` cells |
| **5** | **⟶ RULED AND CLOSED 2026-09-27, THE `E-3` PASS — THE ARCHITECT'S ANSWER IS *"Re-grain."* (`docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`): the honest DRIVE figures BECAME the declared terms, so `P-GU-SM-1` is declared `15` and `P-GU-TP-1` is declared `12`, **the declared total is `134` = `15 + 15 + 15 + 45 + 20 + 12 + 12`** (chain `15 → 30 → 45 → 90 → 110 → 122 → 134`; subtotals `SM 45` · `IM 65` · `TP 24`; caps `134 ≤ 400`, largest row `45 ≤ 100`, stop-after-5 untriggered), and the three sites move TOGETHER: **`§5.5.1`'s two cells + `§5.5.2` item 4's assertion/reading ledgers, `§5.5.3`'s arithmetic/chain/subtotals, and `§5.3` item 11's DONE-row requirement.** **The `12` mid-drag ASSERTIONS (`P-GU-SM-1`) and the `6` entry-point READINGS (`P-GU-TP-1`) are printed as SEPARATE figures BESIDE their terms, and NO site may print a total that is not the sum of its own printed terms.** **THE RECOMMENDATION BELOW (`keep `140``) IS SUPERSEDED AND KEPT VISIBLE AS THE RECORD OF WHAT THIS FILING RECOMMENDED.** **⟶ THE AS-FILED, SUPERSEDED FORM — ⟶ ADDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2` `R-15`, condition `C-7`): `E-3` — WHETHER THE HONEST DISTINCT FIGURES SHOULD *BECOME* THE DECLARED TERMS.** The register's declared total is `140` (`22 + 15 + 15 + 45 + 20 + 18 + 12`, `§5.5.3`), while `P-GU-IM-1`'s honest distinct figure is `15` (of `45`), `P-GU-TP-1`'s is `12` (of `18`) and `P-GU-SM-1`'s is `15` DRIVES (of a declared `22`, plus `12` assertions) | **A row cannot assert both the declared-cap semantics and the honest-drive semantics at once**, and the choice **changes the printed total and three sites with it** | **THE DECLARED FIGURES STAY AS FILED: `140`, compared against the caps (`≤100`/row, `≤400` total), with every honest distinct figure printed BESIDE its declared term (`§5.5.2` item 4).** **NO declared term moved in this pass** (`R-15`) | **Do you want the honest distinct figures ADOPTED as the declared terms — which moves the total `140 → 127` and moves THREE sites together (`§5.5.1`'s rows, `§5.5.2` item 4's ledger, `§5.5.3`'s addition chain and `§5.3` item 11`), OR do you accept the declared-cap reading with the distinct figures carried beside it (recommended — it keeps the caps comparable with every other unit's register and keeps the honesty in the ledger where it is visible)?** | **RECOMMENDATION: keep `140` and the distinct-beside-declared form.** The declared cap figures are what the family's other registers compare (`U-PROJ` `231`, `U-LISTHOST` `168`, `U-ZONES` `369`, `U-GSESSION` `396`, `U-GUTTER` `299`), and a single unit switching semantics would make its total incomparable — **whereas the distinct figures, printed beside, lose no honesty. If the architect prefers `127`, this contract must move the three sites in ONE pass and say so in the DONE row.** | **`§5.5.1`** (the `22`/`18` cells), **`§5.5.2` item 4**, **`§5.5.3`** (the declared total + its chain), **`§5.3` item 11** |

**The report's arithmetic, stated so the gate is checkable: ⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS (`§R.2`): `5` items reported (the as-filed `3`, plus `E-2`'s element-identity/rebind question and `E-3`'s declared-term question — **the as-filed sentence *"`3` items reported"* is kept visible here as that pass's own text**) · `1` ruled by this filing as contract (`item 2`, ruled by the gate-1 repair pass, `§R` `R7`) · `4` OPEN with a working default and a recommendation · `5` clause groups blocked.**
**⟶ AND UPDATED 2026-09-27, THE `E-2`/`E-3` PASS: `5` items reported · `3` RULED (**`item 2`** by the gate-1 repair pass as contract, `§R` `R7`; **`item 4`** by the architect's *"Reuse"* — `E-2` CLOSED, no rebind, five wiring roles, with the structural-write boundary clause and the `U-8`(e) live second-gesture observation; **`item 5`** by the architect's *"Re-grain."* — `E-3` CLOSED, the declared terms are drive counts, the total is `134`) · **`2` OPEN with a working default and a recommendation (**`item 1`** the hover evaluation budget, **`item 3`** the preview channel's write form)** · **`5` clause groups blocked.** **Every
item's default IS implemented in this spec's text**, so **the red set may be authored against the
defaults** — but **each default is a DEFAULT, marked as one, and a later pass that changes one must open a
gate** (`H-r1`'s cite-and-supersede rule). **The delegation gate's ambiguity condition is therefore NOT
satisfied by this filing: `§4.5` records the unit as non-delegable on the red-set condition, and the
supervisor must ALSO route these three items.**

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited **by
SECTION or by row NAME, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited by
ROW ID** (`C2`, `E3`, `E6`, `E10`), **never by line**. **`docs/decisions.md`'s row anchors drift** (rows are
appended), so its rows are cited **by NAME**. **This spec writes no line-count census of any file.**

| Source | Status for `U-GUTTER-UI` | Where |
| --- | --- | --- |
| **The architect's intended-behaviour statement (2026-09-27), verbatim in substance** (mouseover ⇒ the adjust cursor · click ⇒ the gesture starts · drag ⇒ the resized state shown live from the cursor · release ⇒ a valid state committed and an invalid one reset · right-click ⇒ dropped and reset) | **ADOPTED — THIS UNIT'S REQUIREMENT STATEMENT AND ITS CHARTER.** Each of its five clauses lands as a row group: **the cursor** (`M-10`/`M-11`, `P-GU-TP-2`) · **the gesture start** (`M-4`/`M-8`) · **the live preview** (`M-12`, `P-GU-SM-2`) · **the release mapping** (`M-8`/`M-13`, `P-GU-SM-3`) · **the drop** (`M-9`, `F-7`) | `§0` ruling 1, `§1` item 1, `§2.3`–`§2.6`, `§3.1`, `§8` (this row) |
| **THE SCOPE RULING (A) — `U-GUTTER` (`E3`) REMAINS THE POLICY-FREE CLAMP + COMMIT-DISCIPLINE LAYER; the UI unit (`E10`) OWNS the cursor, the coordinates, the live preview channel, the capture decision and the drop-revert** — `docs/decisions.md` `GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAIM-COMMIT-LAYER` | **ADOPTED as this unit's warrant and boundary — WITH ONE CLAUSE OF ITS QUOTED TITLE WITHDRAWN.** **`E3` is COMPOSED, not edited**; **its twelve rulings and `C1`–`C5` are NOT re-opened**; **the frozen session is unchanged.** **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): the quoted ruling's clause *"the capture decision"* is a clause of the ARCHITECT'S ORIGINAL SCOPE SPLIT that this unit's own text has since WITHDRAWN (`§R` `R5`; `§1` item 1, `§2.6` item 4, `§3.3 I-13`, `§3.2 F-14`) — `E3`'s frozen `attach` cannot carry the opt-in, so **THIS UNIT OWNS NO CAPTURE DECISION and the need is a named `E3`-SIDE owed item**. The rest of the ruling — the cursor, the coordinates, the live preview channel and the drop-revert — is this unit's and stands.** | `§0` ruling 2, `§0A` note 12, `§1` items 2/3/4, `§2.6`, `§7` item 12 |
| **THE ARCHITECT'S PARKING RULING** — *"Park checks until the UI exists, then start UI spec"* — and the four parked items (`docs/pending.md` §I-sexies's `E3`-HOST-1/2/3 and the two-writer divergence check) | **ADOPTED AS THIS UNIT'S FIRST OBLIGATIONS.** Four rows carry them (`M-1`..`M-5`), **each with its remedy's owner named**: a failure is **`OWED — E3-SIDE`** and is **NOT fixed from this unit** | **`§0` ruling 3, `§3.1 M-1`–`M-5`, `§3.2 F-5`, `§3b`'s `OWED — E3-SIDE`** |
| **`docs/pending.md` §I-septies's ADMISSION of `E10` (`U-GUTTER-UI`)** | **ADOPTED** — the admission supersedes the row's `PROPOSED — awaiting admission` marking, **the live battery is mandatory, and the user-flow-audit gap is to be stated rather than omitted** | `§0` rulings 3/5/10, `§5.2`, `§5.U`, `§7` item 7 |
| **`AGENTS.md`'s project-wide UI constraint (`AGENTS.md` "Project-wide constraint (UI rendering)")** + **`docs/decisions.md` `UI-RENDERED-WITH-PROVIDENT`**, with **`UI-STATIC-MEANS-APP-STATE-DERIVED` (A-d7)** leaving its text unchanged | **ADOPTED, UNCHANGED, AND SATISFIED BY DATA.** The affordance is **envelope data**; the module authors no UI content; the preview/cursor writes are transient presentation writes on the provident-rendered element and are **not** a second rendering path | `§0` ruling 4, `§2.1` items 6/7, `§2.2` P-1, `§3.4 R-1`/`R-2`, `§5.1`, `§7` item 4 |
| **`docs/decisions.md` `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (A-d1)** — the carve-out is **FUNCTIONAL**, and a mechanism is not a UI element | **NOT THIS UNIT'S LICENCE, and explicitly not used.** **The shell chrome is the only exception and this unit needs none of it**: the affordance is a **UI element**, so it is authored, and the module is a **mechanism that authors no content** | `§5.1`'s DENIED item 4, `§2.2` P-1 |
| **`docs/decisions.md` `INTERACTION-NODE-LOCAL` (A-d3)** and **`GSESSION-CAPTURE-CAPABILITY-IS-SOURCE-SUPPLIED-AND-OPTIONAL`** | **ADOPTED** — the node-local listener rule and the capture capability's exact shape (the flag is the consumer's, the capability is the source's, the count is the session's) | `§0` rulings 6/8, `§2.1` item 9, `§2.2` P-2/P-6, `§2.6` item 4, `§3.4 R-6`/`R-12` |
| **`docs/specs/gsession.md` `§2.5`'s numbered delegate list** (`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`) | **ADOPTED AS THE FROZEN AUTHORITY, and NOT RE-OPENED.** This unit calls the session **only through `E3`**, and **does not re-open a single item** | `§0` ruling 6, `§2.6` item 2, `§3.4 R-4`/`R-5` |
| **`docs/specs/gsession.md` `§2.3`'s lifecycle** (one listener per control, the tracking window, the three terminals, the seven-member code domain, the PARKED capture note) | **ADOPTED AND COMPOSED** — this unit attaches no listener of its own to the session's element beyond **its own FOUR source listeners** (the hover enter, the hover exit, the context-button read **and the module's own move listener** — `§R` `R4`), calls no terminal, and adds no code. **⟶ SWEPT 2026-09-27, THE GATE-1 STEP-4 REPAIR PASS (`§R.4` `C-A8`): THE AS-FILED CELL READ *"its own three source listeners"* — a STALE COUNT swept with this row (`§R` `R4` added the module's own move listener, `§3.1 M-4`/`M-18` and `§3.4 R-12` read FOUR, and the composed `source.on` count is FIVE: the module's four + the session's one).** | `§2.3`, `§2.6` item 2, `§3.3 I-4`/`I-8` |
| **`docs/specs/gutter.md` — `E3`'s contract** (the composed surface, the value chain, the preview-channel rule, the release mapping, the single-writer discipline, the reset entry point, the closed session read set, the named safe defaults, the seven seams, the ten type declarations and two value exports) | **ADOPTED AS THE COMPOSED CONTRACT — derived, never re-litigated, and never edited** (`§5.1`'s DENIED item 2). **This unit's own two-readings rule extends it: `E3`'s counters and the sink's record are read TOGETHER** | `§0` ruling 7, `§2.4`, `§2.6` items 1/5/6, `§3.1 M-5`, `§8` (this row) |
| **`docs/specs/gutter-review.md` — the CLOSED gate-1 record** (the twelve rulings, `C1`–`C5`, the must-not list) | **FROZEN AND NOT EDITABLE BY THIS UNIT.** This filing composes the record's outcomes; **it does not amend the record** | `§0` ruling 7, `§5.1` DENIED item 3 |
| **`docs/decisions.md` `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (ACTIVE) and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`7` typed rows in three families**, **⟶ `140` attempts (CORRECTED 2026-09-27, `§R` `R3`: the as-filed cell read `142`, the sixth mis-sum of this family — `P-GU-SM-2` is `15` by its own drive table, so the total is `22 + 15 + 15 + 45 + 20 + 18 + 12 = 140`; the as-filed figure is kept visible here and at `§5.5.3`/`§5.3` item 11)** printed **with their seven terms and a term-by-term addition table**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no generator and no seed claimed**, caps `≤100`/row · `≤400` total · stop-after-5, **`2` `(bounded)` rows**, and the pool-versus-boundary check **RUN and CLEAN for all `7` rows**. **⟶ AND RE-GRAINED 2026-09-27, THE `E-3` PASS (`docs/pending.md` §I-terdecies; `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`): THE DECLARED ATTEMPTS ARE `134` = `15 + 15 + 15 + 45 + 20 + 12 + 12` (chain `15 → 30 → 45 → 90 → 110 → 122 → 134`; subtotals `SM 45` · `IM 65` · `TP 24`), the `(bounded)` set is `4` of the `7` rows (not `2` — `§R.2` `R-15`), and the assertion/reading figures (`P-GU-SM-1`'s `12` assertions, `P-GU-TP-1`'s `6` readings) are printed BESIDE their terms.** **The read-only PBT audit is OWED to the adversarial pass (`B-13`)** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **THE USER-FLOW-AUDIT PREDICATE (`docs/specs/user-flow-audit.md` `§7.1`, `§5.U`, `§6.1`, `§6.2`)** | **OWED — AND ITS SOURCE DOCUMENT DOES NOT EXIST IN THIS TREE** (sixth confirmation). The matrix is authored **in the gate instructions' form**; **the gap is filed with an owner and a revisit condition**; **the predicate's mechanical trigger FIRES for this unit on its merits** (a UI-rendering unit), so the hardening is applied rather than skipped. **⟶ AMENDED 2026-09-27 (`§R` `R2`): the coverage report is a MANUAL record (no shipped instrument emits it), and three U-rows are `NOT-OBSERVABLE-BY-ANY-SHIPPED-INSTRUMENT` with their structural reasons — the gap is unchanged and no row was moved for convenience.** | **`§5.U`** (the matrix, the coverage report, the observable/instrument table, `U-GAP-1`), `§7` item 7, `§0` ruling 10 |
| **⟶ THE ARCHITECT'S R1 RULING (2026-09-27) — *"Yes the UI change is allowed to touch the renderer — the UI needs to be rendered."*** | **ADOPTED AS THE DECISIVE SCOPE RULING OF THE REPAIR PASS (`§R` `R1`).** **`src/renderer/renderer.ts` + `src/renderer/runtime.ts` enter the ALLOW-LIST, BOUNDED to the four wiring roles and the one graph-read method (`§5.1` rows `10`/`11`); the shell chrome, `src/main/**`, the preload/MCP surface and every frozen/sibling module stay DENIED; and the provident-authoring constraint is CARRIED, not lifted — a renderer edit that hand-writes DOM is a FINDING (`§3.4 R-13`, `§2.2` P-10).** | **`§R` `R1`, `§R.1`, `§1` items 1/2/5/6, `§2.1` items 2/8, `§5.1`, `§3.4 R-13`, `§3.3 I-14`, `§5.2` leg 3** |
| **⟶ THE `E3`-SIDE OWED ITEM THE R5 WITHDRAWAL CREATES — the CAPTURE OPT-IN (2026-09-27)** | **OWED — `E3`-SIDE, with a named owner (the supervisor + an Implementer pass on `src/shared/gutter.ts`) and a stated revisit condition (the moment an `E3` pass makes `attach` accept `capture`, or a gate admits direct installation by the wiring).** **A drag that must keep the pointer outside the affordance's box needs it; until then the honest UX consequence stands — the live reading stops when the pointer leaves the element** (`§2.6` item 4). **NEVER fixed from this unit**; reported in the DONE row and in the trackers. | **`§R` `R5`, `§2.6` item 4, `§3.3 I-13`, `§3.2 F-14`, `§0A` note 10, `§3b`'s `OWED — E3-SIDE`** |
| **`docs/specs/ci-ui-leg.md`** (`U-REALDOM-BOOT`'s contract: the five rows `R0`–`R4`, the exit-code vocabulary `{0,1,2,3}`, the retry policy `RT-*`, the DISPLAY requirement, the `divergence` precondition, the honest-limits statement) | **ADOPTED AS THE `[U]` LEG'S AUTHORITY — CONSUMED, NOT AMENDED.** This unit **runs** the leg and **names its own `[U]` rows**; it adds no measurement to the leg and changes no clause of it | `§5.2` legs 5/6/7, `§0` ruling 5, `§5.3` item 6 |
| **`docs/decisions.md` `REAL-DOM-UI-GATE-LEG` / `REALDOM-UI-LEG-LANDED` / `DIVERGENCE-SPAWN-FIX`** | **ADOPTED** — the leg, its one additive seam, the two-flag spawn decision, and its honest limits | `§5.2` legs 4/5, `§5.3` item 7 |
| **`docs/next-steps.md`'s `## OPEN` row `E10`** | **ADOPTED AS THIS UNIT'S LEDGER ROW.** Its `Blocked on` chain (`E3` + `E4`) is **partly spent**: **`E3` is composed and landed; `E4` is NOT a dependency of this spec** — the row's `E4` clause belongs to the RELOCATE unit, not to a gutter UI. **Its `Legs` cell's mandatory-live clause is carried verbatim at `§5.2`.* *(Reconciling the cell is the supervisor's — this pass edits no tracker.)* | `§1`, `§5.1`, `§5.2`, `§5.3`, `§8` (this row) |
| **`docs/next-steps.md`'s row `E3`** (`U-GUTTER`) | **NOT THIS UNIT — this unit is its FIRST REAL CONSUMER.** `E3` is `LANDED-GREEN-AT-90/90 WITH ITS CHECKS PARKED`; **its module, its test file and its spec are DENIED paths**, and **a defect found there is reported, not fixed here** | `§0` ruling 3, `§0A` note 12, `§3.1 M-1`–`M-5`, `§3.2 F-5`, `§5.1` DENIED item 2 |
| **`docs/next-steps.md`'s row `E6`** (`U-GSESSION`) | **NOT THIS UNIT — this unit composes it through `E3`.** Its module and test file are **DENIED paths** | `§0` ruling 6, `§5.1` DENIED item 1 |
| **`docs/next-steps.md`'s row `C2`** (`U-DIVERGENCE-EXT`) | **OWED — and NOT a precondition of this unit.** `[D]` stays unclaimed; **`npm run divergence`'s green is used as the live leg's PRECONDITION and as nothing else** | `§5.2`'s `[D]` clause, `§5.3` item 7 |
| **`docs/next-steps.md`'s row `E4`** (`U-RELOCATE`) | **NOT THIS UNIT** — a sibling mechanism in the same family, whose own spec, preconditions and gates are its own | `§2.6` item 7, `§5.1` DENIED item 7 |
| **`docs/next-steps.md`'s row `F1`** (`U-THEME-CONTROL`) | **NOT THIS UNIT, but its lesson is carried**: an authored demo control's **census drift is MEASURED, not assumed** (`docs/pending.md` §B's `SCH-3` row) | `§3.3 I-11`, `§3.5 R-9`, `§7` item 9 |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row **may not be moved to the `ui` leg silently**"* | **CARRIED, in this unit's own three-part form** (`§3.2 F-13`, `§4.4 S-7`/`S-11`): the `[U]` set is **fixed at filing time, by name** | `§3.2 F-13`, `§4.4 S-7`/`S-11`, `§5.2`'s `[U]` set |
| **`docs/specs/gutter.md` `§5.2`'s three-part `[U]` refusal for the FAMILY's mechanism half** | **INHERITED AND INVERTED, deliberately**: `E3` refused a `[U]` row because it has **no importer and reads no coordinate**; **this unit HAS both**, so it **offers** `[U]` rows — **that inversion is the whole point of the `E3`/`E10` split**, and it is recorded so no reader reads `E3`'s refusal as binding here | `§0` ruling 2, `§1` item 3, `§5.2`'s `[U]` set, `§5.U` |
| **`src/shared/demo-envelope.ts`** (the authoring site: the envelope's data, its `ctx.tree.allNodes()` + `props.id` + `clientAPI.apply` handler shape, the `DEMO-HANDLER-CONVENTION` decision row) and **`src/renderer/runtime.ts`** (the mount, the `DomAdapter`'s real-DOM event wiring, the re-emit loop, `nodeIdAttribute`, the render path's element replacement) | **ADOPTED AS THE SUBSTRATE — READ, EXTENDED AT ONE CARD, AND OTHERWISE UNTOUCHED** (`§5.1`'s allow-list item 2 and DENIED item 4) | `§2.1` items 6/7, `§2.5` item 5, `§5.1` |
| **`scripts/mcp-cli.mjs`** (the project's live driver: `--target battery|http`, `targets`, `html`, `dispatch`, `run`) and **`scripts/electron-ui.mjs`** (the `[U]` leg) · **`scripts/electron-divergence.mjs`** and **`scripts/electron-spawn.mjs`** (the precondition) | **ADOPTED AS THE LIVE LEGS' INSTRUMENTS — CONSUMED, NEVER EDITED** (`§5.1` DENIED item 6). **`scripts/live-drive.mjs` DOES NOT EXIST in this tree** (globbed `scripts/*`), so the CLI is the driver this repo ships, **and the MCP surface's coordinate limit is stated at `§5.2` leg 6** | `§5.2` legs 4/5/6, `§7` item 6 |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT AND THE FILE DOES NOT EXIST** — so there is no coverage matrix and no demo-page index to update; **`§3.4 R-10` is the branching probe**, because **unlike `E3`, this unit DOES render a page element** | `§3.4 R-10`, `§3.5 R-10`, `§7` item 8 |
| **`docs/specs/gutter-ui.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED), **then REPAIRED IN PLACE 2026-09-27 by the gate-1 repair pass (`§R` `R1`–`R8`; the three answered sentences at `§R.1`, the file-end `⟶ RECORDED` block), THEN REPAIRED IN PLACE AGAIN the same day by the gate-1 STEP-3 (architecture) pass** (**`§R.2`** — the architect's seam ruling and the `C-1`…`C-10` landings `R-9`…`R-16`; **`§R.3`** — the seam table, the degradation rows and the corrected `3 + 17 = 20` census; the file-end `⟶ RECORDED` block). **The tracker cell is the SUPERVISOR's to flip** — none of the three passes edits a tracker | this file, **`§R`**, **`§R.1`**, **`§R.2`**, **`§R.3`**, `§5.1`'s allow-list row `6`, `§7` items 14/15, the file-end `⟶ RECORDED` blocks |
| **`docs/specs/gutter-ui-greens.md`** | **OWED** — this unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), named in the diff scope so it is not discovered later | `§5.1` row 5, `§5.3` item 8 |
| **⟶ THE ARCHITECT'S SEAM RULING (2026-09-27) — *"The caller seams will need to be used by the downstream projects, these are not just demo tools."*** (`docs/pending.md` §I-undecies; `docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`) | **ADOPTED AS THE STEP-3 PASS'S GOVERNING RULING, AND IT ANSWERS `E-1` — WHOSE PROPOSAL IS NOT ADOPTED.** **The eleven caller seams are a PUBLIC EXPORTED CONTRACT that downstream consumers (forks) implement: the contract is the module's exported seam types plus `§R.3`'s seam table, each seam's REQUIRED/OPTIONAL status and DECLARED DEGRADATION is normative, this repo's demo supplies exactly ONE EXAMPLE IMPLEMENTATION homed in the demo-side file (`§5.1` row 2, extended by one cell), and `renderer.ts` imports the MODULE's seam types.** **`docs/FORKER.md` carries the contract for downstream (one added block in its `§4`).** | **`§R.2` (the ruling), `§R.3` (the two tables + the census), `§2.1` (the seam types + item 9), `§5.1` row 2, `§3.1 M-20`, `§8` (this row), `docs/FORKER.md` §4** |
| **THE GATE-1 STEP-3 REVIEW'S TEN CONDITIONS (`docs/pending.md` §I-decies)** | **ADOPTED AND LANDED (`C-1`…`C-10`), with ITS THREE ESCALATIONS ANSWERED THUS: `E-1` by the architect's seam ruling (above, and its proposal NOT adopted); `E-2` (the commit write's element identity / the rebind) REPORTED AND LEFT OPEN at `§7a.1` item 4; `E-3` (the declared terms) REPORTED AND LEFT OPEN at `§7a.1` item 5.** **Its four RESIDUAL RISKS are recorded at their sites** (`§5.2` legs 3/5, `§7` item 15, `§3.1 M-4`). | **`§R.2` `R-9`…`R-16`, `§R.3`, `§5.U` `U-8`, `§3.1 M-18`/`M-19`/`M-20`, `§3.4 R-14`, `§3.3 I-15`, `§3b`'s `UNSATISFIABLE FROM THIS UNIT` token, the file-end `⟶ RECORDED` block** |
| **THE `E3`-SIDE FINDINGS THIS UNIT MAY RAISE** (whatever `M-1`..`M-3`/`F-5` expose about the parked `E3` defects) | **OWED, WITH A NAMED OWNER — the supervisor + an Implementer pass on `E3`'s own denied path.** **Never fixed from this unit**; recorded in the DONE row and in the trackers, **not** in `docs/defects.md` (a host finding is this repo's) | `§3.2 F-5`, `§3b`'s `OWED — E3-SIDE`, `§5.3` items 4/7 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates
**one new spec file** and edits **no existing document** — **no tracker row is touched, no sibling spec is
annotated, and no citation is repointed.** **Row `E10`'s spec cell therefore still reads `OWED — not
filed` until the supervisor's reconciliation pass flips it** — recorded here so the staleness is
**attributable rather than silent**. **⟶ AMENDED 2026-09-27, THE GATE-1 STEP-3 REPAIR PASS: THE AS-FILED ARCHIVAL-LOOP CHECK ABOVE DESCRIBES THE FIRST FILING.** **THIS pass edited TWO documents — this file IN PLACE and ONE bounded cell/block in `docs/FORKER.md` (`§4`'s seam-contract block, the fork-facing half of the architect's seam ruling) — and it archived, moved and repointed NOTHING else: `E10`'s tracker cell still reads its stale spec value, `docs/pending.md` still quotes the mis-summed `142`, and `E3`'s parked status is untouched.** **It ran no test, no leg, no trio and no live battery, wrote no code, made no commit and issued no writing git command; the supervisor owes the gate-boundary commit (`RCA-8`).**

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its
vocabulary and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A
later pass appends **inside `§3a`/`§3b`** or inside an existing section; **no section number moves,
nothing is renumbered, and the `§5.3 → §5.5` gap (no `§5.4`), the `§5.U` label and the absent `§5.5.0` stay
exactly as recorded**, because **renaming is forbidden for citation stability.**

---

## ⟶ RECORDED 2026-09-27 — THE GATE-1 REPAIR PASS (`§R` `R1`–`R8`), AND THE STATE THE UNIT IS IN AFTER IT

**NOT a new contract section and NOT a new number: this block is the repair pass's own record, placed at
the file's end so that NOTHING follows the append rule above and NO section number moves.** **It is the
dated counterpart of the `§R` table near the top: `§R` states WHAT was ruled and WHERE it landed; this
block states WHAT THIS PASS DID, WHAT IT COULD NOT DO, and WHAT IS STILL OWED.**

1. **WHAT THIS PASS DID.** **It amended THIS FILE IN PLACE — `docs/specs/gutter-ui.md` and nothing else.**
   **It edited no source file, no test file, no tracker, no sibling spec, no config and no script; it ran
   no suite, no leg, no trio, no `tsc`, no Electron boot and no live battery; and it made no commit and no
   writing git command of any kind.** **Every as-filed clause a ruling changes is kept visible at its own
   site with a dated `⟶` annotation naming this pass — nothing was rewritten silently, and no section was
   renumbered (`§5.3`'s numbering note, the `§5.U` label, the absent `§5.5.0` and the `§5.3 → §5.5` gap all
   stand exactly as filed).**
2. **THE EIGHT RULINGS AND THEIR SITES** — the table at `§R` is the authority; in one line each: **`R1`**
   the renderer wiring enters the bounded ALLOW-LIST (`§5.1` rows `10`/`11`, `§1` items 1/2/5/6, `§3.4`
   `R-13`, `§3.3` `I-14`, `§R.1`); **`R2`** the `§5.U` observables have instruments and a manual record
   (`§5.2` legs 5/6, `§5.U` items 2/3/4); **`R3`** the register is re-ruled and re-summed to `140`
   *(**⟶ SUPERSEDED ON THE FIGURE 2026-09-27, THE `E-2`/`E-3` PASS: the architect's *"Re-grain."* moved the
   declared terms to drive counts, so the declared total is `134` — see this file's closing `⟶ RECORDED`
   block and `§5.5.3`. The `140` in this paragraph is that pass's own dated reading and is kept as such.**)*
   (`§5.5.1`/`§5.5.2`/`§5.5.3`, `§5.3` items 10/11); **`R4`** the module attaches its own move listener
   (`§2.1`'s `moveTypeOf`, `§2.3` rows 2/8, `§3.1` `M-4`, `§3.2` `F-7`); **`R5`** the capture claim is
   withdrawn and owed to `E3` (`§1` item 1, `§2.2` P-6, `§2.6` item 4, `§0A` note 10, tombstones for
   `F-11`/`I-4`, `§3.3` `I-13`, `§8`); **`R6`** the value channel is `handle.set` + `sizeFor`
   (`§2.1` item 3, `§2.3` row 8, `§2.4` item 2, `§3.1` `M-8`); **`R7`** the invalid-release resolution is
   ruled with its divergence and its rejected alternative (`§0A` note 6, `§2.3` items 5/9 + the terminal
   write table, `§2.6` item 5, `§3.1` `M-13`, `§3.2` `F-10`, `§5.U` `U-4`); **`R8`** the seven remaining
   defects, (a)–(g), each at its own site (`§2.1`'s census and `PointerResolver` wiring, `§2.3` rows 4/5 +
   `§2.6` item 3, `§2.5` item 3, `§3.1` `M-5`, `§3.1` `M-1`/`M-2`/`M-3` + `§3.2` `F-5` + `§5.3` item 4,
   `§2.2` P-7/P-9, `§3.4` `R-5`, `§5.1`'s two scope-id clauses).
3. **THE THREE SENTENCES THE REPAIRED CONTRACT MUST ANSWER ARE ANSWERED AT `§R.1`:** **WHO constructs the
   affordance — the renderer's own boot wiring; FROM WHICH ALLOWED FILE — `src/renderer/renderer.ts` (plus
   `Runtime.elementForNodeId` in `src/renderer/runtime.ts`); BY WHAT COMMAND IS THAT STATE REACHED —
   `npm start`, then `npm run mcp -- --target http --port 3787 targets` / `… html` / `… dispatch
   gutter-vertical pointerdown`, with `npm run ui` as the mandatory real-DOM leg and `npm run divergence`
   as its precondition.**
4. **WHAT REMAINS OWED, NAMED SO NO LATER PASS READS THIS FILE AS PROGRESS.** **(a)** **THE UNIT IS NOT
   GREEN AND NOT DELEGABLE**: no module exists, no red set has run, no leg has run, no register row has
   been executed, no greens set exists, no adversarial pass has run (`§3a`/`§3b` are still SEED/EMPTY), and
   no DONE row exists. **(b)** **THE DEFERRED GATE-1 STEPS 3–4 (ARCHITECTURE · CHANGE-ANALYSIS) HAVE NOT
   RUN ON THE REPAIRED CONTRACT** — `docs/pending.md` §I-octies deferred them *"until the contract is
   repaired"*, and **the repair is this pass: they are the NEXT gate work, on THIS text, BEFORE the red
   set** (`AGENTS.md` item 8; the gate order run on a filed contract is the practice §I-octies says to
   keep). **(c)** **THE `E3`-SIDE ITEMS**: the capture opt-in (`§2.6` item 4, `§8`) and the three
   `EXPECTED-RED` obligation rows `M-1`/`M-2`/`M-3` (`§3.1`, `§3.2 F-5`, `§5.3` item 4) — **owner: the
   supervisor + an Implementer pass on `src/shared/gutter.ts`; never fixed from this unit.** **(d)** **THE
   TRACKER CELLS THIS PASS COULD NOT TOUCH** (this pass edits one file): `docs/next-steps.md`'s `E10` row
   still reads its spec cell as `OWED — not filed` and its as-filed `BLOCKED` chain, `docs/pending.md`
   §I-septies still quotes the mis-summed `142`, and `E3`'s parked status is untouched — **all four are
   the supervisor's to reconcile, and the quotation of `142` in §I-septies is now KNOWN-STALE by this
   pass's `R3` ruling.** **(e)** **THE MANUAL COVERAGE REPORT** (`§5.U` item 2) is unfilled because **no
   live run has happened**; its `U-1`/`U-2`/`U-7` rows are the ones a shipped instrument can fill, and
   `U-3`/`U-4`/`U-6` need an operator in a real window (`§5.U` item 4).
5. **THE HONEST HEADLINE, in one sentence: the gate-1 repair pass fixed the decisiveness problem the review
   found — the affordance now HAS a construction site in the running app, from an allowed and bounded
   renderer wiring, with the frozen pairs and the shell still denied — and corrected the contract's
   arithmetic, instrument and channel defects; but the unit is still NOT green, NOT delegable, and NOT
   through its gate.**

---

## ⟶ RECORDED 2026-09-27 — THE GATE-1 STEP-3 (ARCHITECTURE) REPAIR PASS: `C-1`…`C-10` LANDED, `R-SEAMS` LANDED, AND THE STATE THE UNIT IS IN AFTERWARDS

**NOT a new contract section and NOT a new number: this is the step-3 pass's own record, appended at the file's end, AFTER the append rule's block, as that block's own deliberate dated exception (the same placement the gate-1 repair pass's `⟶ RECORDED` block used) — so NO section number moves and NO contract section is added.** **It is the dated counterpart of `§R.2`/`§R.3` near the top: `§R` states WHAT the repair ruled; `§R.2`/`§R.3` state the SEAM RULING and the seam/degradation tables; this block states WHAT THIS PASS DID, WHAT IT COULD NOT DECIDE, and WHAT IS STILL OWED.**

1. **WHAT THIS PASS DID.** **It amended THIS FILE IN PLACE — `docs/specs/gutter-ui.md` and `docs/FORKER.md` (ONE bounded addition, the seam-contract block of `§4`, placed beside the family's other fork-facing cells) — and NOTHING ELSE.** **It edited no source file, no test file, no other tracker, no sibling spec, no config and no script; it ran no suite, no leg, no trio, no `tsc`, no Electron boot and no live battery; and it made no commit and no writing git command of any kind.** **Every as-filed clause a ruling changes is kept visible at its own site with a dated `⟶` annotation naming this pass, and NO SECTION WAS RENUMBERED** (`§5.3`'s numbering note, the `§5.U` label, the absent `§5.5.0` and the `§5.3 → §5.5` gap all stand as filed; `§R.2`/`§R.3` are appended in the `§R` record's own namespace). **`E3`'s and the session's files remain DENIED (`§5.1` items 0/1/2) and were NOT touched or read for change.**
2. **THE TEN CONDITIONS, LANDED ONE BY ONE — `C-1`…`C-10`.** **`C-1`** `elementForNodeId`'s id space (engine `nodeId` ⇒ authored `css.id` ⇒ authored `props.id`), its attribute-walk-only totality, its exact call site (`main()`, after `runtime.bootstrap()`, before the `if (!bridge)` conditional, nowhere else), its null discipline (unresolvable ⇒ `null` ⇒ `attach()` `false` ⇒ no-op, never a throw) and the fact that **`Runtime` has no equivalent today**: `§R.2` `R-9`, `§2.1` item 8(ii), `§3.4 R-13`(iv), `§5.1` row `11`. **`C-2`** the source handlers re-declared `(event: unknown) => void` and the wiring's source named as the ONLY DOM-event observer, forwarding the event on **both** turns: `§R.2` `R-10`, `§2.1`'s `EventSourceLike` block, `§2.3` rows 2/6b/6c, `§3.4 R-13`(v). **`C-3`** the move type RULED as `POINTER_TYPES.move` obtained by the wiring, with the false-green class named and a row asserting **the type matched the session's**: `§R.2` `R-11`, `§2.1` items 2/9 + the `moveTypeOf` cell, `§3.1 M-18`, `§3.4 R-14`. **`C-4`** listener ownership stated for both sets on the same element, each removed by its own owner, **the wiring removing nothing**: `§R.2` `R-12`, `§2.3` row 6c, `§3.3 I-15`. **`C-5`** the commit sink's write route named (ONE managed-channel write — `Runtime.applyCommand`'s `state-slice` shape — NOT a preview write, NOT an authored handler body), the `§2.5` item 5 re-render hazard **bound to the commit too**, and the element-identity/rebind question **marked `E-2` and NOT decided**: `§R.2` `R-13`, `§2.1` item 8(v), `§2.3` row 15, `§2.5` item 5, `§3.1 M-19`, `§7a.1` item 4. **`C-6`** `M-2` restated to the module-observable form with its `E3`-side half marked **`UNSATISFIABLE FROM THIS UNIT`**, and `M-1`'s runtime half stated as **NOT expected-red**: `§R.2` `R-14`, `§3.1 M-2`, `§3.1 M-1`, `§3b`'s new token. **`C-7`** `P-GU-SM-1`'s declared-term derivation corrected (its `22` is NOT `10` drives + `12` assertions) and **`P-GU-SM-1`/`P-GU-TP-1` marked `(bounded)`**, with **no declared term moved** and `E-3` left open: `§R.2` `R-15`, `§5.5.1` (two rows + the `(bounded)` set), `§5.5.2` items 2/4, `§5.5.3`, `§5.3` item 11, `§7a.1` item 5. **`C-8`** a `MANUAL` row bound to a real open window and a recorded command sequence with its `targets`/`html` readings: `§5.U`'s new **`U-8`** (plus the matrix/count/`summary.total` updates in `§5.U` items 1/2 and `§5.3` item 12). **`C-9`** the three stale clauses swept (`§2.6` item 3's *"authored in `demo-envelope.ts`"*, `§7` item 13's capture claim, `§2.1` item 7's *"no renderer file changes"*): `§R.2` `R-16` plus each site. **`C-10`** the instrument stated per live row (`§5.U` item 1's instrument clause and item 4's table, now row-complete through `U-8`).
3. **`R-SEAMS` LANDED — the architect's seam ruling (`docs/pending.md` §I-undecies; `docs/decisions.md` `GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`), with `E-1`'s rejected proposal NOT adopted.** The eleven caller seams are **contract, not demo tools**: **`§R.2`** names the ruling and its seven landings (`R-9`…`R-16`); **`§R.3`** carries **(1)** the corrected export census (`3` values + `17` types = **`20`** names, all named, with the `sizeFromPointer` value deletion explained), **(2)** the **seam table** (one row per seam: signature · required? · what a fork supplies · the declared degradation), **(3)** the **degradation table** (one row per class that can FAIL: absent · non-callable · throwing · wrong-type · the `E3` refusals), **(4)** the demo's **ONE example implementation** named as an implementation and homed by `§5.1` row 2's extended cell, **(5)** `renderer.ts` importing the **module's** seam types, and **(6)** `docs/FORKER.md`'s new seam-contract block in **`§4`**, placed immediately after the `SCH-1..SCH-13` unit table and beside the fork's `SCH-6` re-file note. **The type-only/wiring split is stated: the module exports the types, the wiring imports them, and the demo file supplies the example.**
4. **THE RESIDUAL RISKS, RECORDED WHERE THEY BELONG.** **(a)** the *"same built tree"* precondition of `npm run ui`/`npm run divergence` is **NOT MECHANICALLY TRUE** (both scripts rebuild): `§5.2` leg 5's note, `§3.5 R-11`, `§4.5` item 4. **(b)** leg 3's *"five bundles"* is **four esbuild outputs + a copied `index.html`**: `§5.2` leg 3. **(c)** a **post-boot re-derivation tears the graph down and the wiring does NOT re-attach — OUT OF CONTRACT, with the rebind obligation named as `E-2`'s**: `§2.3` row 16, `§7` item 15. **(d)** the **listener-ordering guarantee is asserted FROM THE SOURCE-CALL LOG, never from a real-DOM premise**: `§3.1 M-4`. **(e)** `M-1`'s static half stays red-by-design, so the DONE row must print its **measured** call counts (`§3.1 M-1`, `§5.3` item 4).
5. **WHAT THIS PASS DID *NOT* DECIDE — THE ARCHITECT'S, REPORTED AND NOT RULED.** **⟶ BOTH WERE RULED 2026-09-27, THE `E-2`/`E-3` PASS — THIS ITEM IS THAT PASS'S OWN DATED RECORD OF WHAT WAS OPEN, AND BOTH OF ITS HALVES ARE NOW CLOSED: `E-2` by the architect's *"Reuse"* (element identity PRESERVED, NO rebind, the SIXTH role NOT OWED, the structural-write boundary stated, the live second-gesture reading carried by `§5.U` `U-8`(e)) and `E-3` by the architect's *"Re-grain."* (the declared terms ARE the drive counts, the total is `134`).** **The as-filed text follows unchanged:** **(a) `E-2`** — whether the commit's `state-slice` write preserves the affordance element's identity or needs a **rebind** (a **SIXTH** wiring role): `§R.2` `R-13`, `§2.1` item 8(v), `§2.3` row 15, `§2.5` item 5, `§7a.1` item 4 — **the working default is NO rebind (single-shot affordance) with its consequence stated, and `§3.1 M-19` FAILS a rebind until `E-2` is ruled.** **(b) `E-3`** — whether the honest distinct figures should BECOME the declared terms (total `140 → 127`, **three sites moving together**): `§R.2` `R-15`, `§5.5.2` item 4, `§5.5.3`, `§5.3` item 11, `§7a.1` item 5 — **no declared term was moved, and the declared total is `140`.** **Neither was decided silently; both are named in `§4.5`'s routing list.**
6. **THE UNIT IS NOT GREEN.** **No module exists, no demo card exists, no test file exists, no red set has RUN, no leg has run, no register row has been EXECUTED, no live battery has run (`U-8` included), no greens set exists, no adversarial pass has run (`§3a`'s `15` seeds and `§3b`'s table are still `OWED`/empty), and no DONE row exists.** **The only artifacts of this pass are the two amended documents.**
7. **NEXT: GATE-1 STEP 4 (CHANGE-ANALYSIS) RUNS ON THIS STABLE TEXT.** **`docs/pending.md` §I-decies's verdict — `DELEGABLE-AFTER-SPEC` — is now conditional on this pass having landed its ten conditions and the seam ruling: it has, so STEP 4 (change-analysis) is the next gate work, on THIS text and BEFORE any TestWriter red set** (`AGENTS.md` item 8; the gate order §I-octies says to keep). **`E-2`/`E-3` and the `E3`-side items (`§2.6` item 4, `§3.1 M-1`/`M-2`/`M-3`) are routed to the architect/supervisor and remain `OWED — E3-SIDE`; the unit is still NOT delegable until a TestWriter has RUN and REPORTED the red set** (`§4.5`).

---

## ⟶ RECORDED 2026-09-27 — THE `E-2`/`E-3` PASS: the architect's two rulings LANDED (`E-3` RE-GRAIN, `E-2` CLOSED ON *"Reuse"*), AND THE STATE THE UNIT IS IN AFTERWARDS

**NOT a new contract section and NOT a new number: this is the pass's own record, appended at the file's end, AFTER the append rule's block, as that block's own deliberate dated exception (the same placement the two earlier `⟶ RECORDED` blocks used) — so NO section number moves, NO row id is renumbered and NO contract section is added.**

1. **WHAT THIS PASS DID.** **It amended TWO documents — THIS FILE IN PLACE and ONE bounded block in `docs/FORKER.md` (the downstream rule placed beside the seam-contract block of its `§4`) — and NOTHING ELSE.** **It edited no source file, no test file, no tracker, no sibling spec, no config and no script; it ran no suite, no leg, no trio, no `tsc`, no Electron boot and no live battery; and it made no commit and no writing git command of any kind.** **Every as-filed clause either ruling changes is kept visible at its own site with a dated `⟶` annotation naming this pass.**
2. **`E-3` LANDED — THE RE-GRAIN (the architect's *"Re-grain."*; `docs/pending.md` §I-terdecies, `docs/decisions.md` `A DECLARED REGISTER TERM IS A DRIVE COUNT`).** **A declared register term IS a drive count; assertions and readings are printed BESIDE it and are never counted in it.** **The three sites moved TOGETHER:** **(a) `§5.5.1`** — `P-GU-SM-1`'s term `22 → 15` with its `12` mid-drag ASSERTIONS and its `15` distinct drives printed beside it, and `P-GU-TP-1`'s term `18 → 12` with its `6` entry-point READINGS and its `12` drives printed beside it; **(b) `§5.5.2` item 4** — the declared/distinct ledger's two cells plus their assertion/reading ledgers; **(c) `§5.5.3`** — the ruled total, its term-by-term chain and its family subtotals, and **`§5.3` item 11**'s DONE-row requirement. **THE DECLARED TOTAL IS NOW `134` = `15` + `15` + `15` + `45` + `20` + `12` + `12`** (chain `15 → 30 → 45 → 90 → 110 → 122 → 134`; subtotals **`SM 45` · `IM 65` · `TP 24`**), **and THE PRINTED TOTAL IS NOW THE SUM OF THE PRINTED TERMS** — which resolves the state in which the file printed `140` while its printed terms summed to `147`. **Caps: largest row `45 ≤ 100` · total `134 ≤ 400` · stop-after-5 untriggered.** **`P-GU-IM-1`'s `45` and `P-GU-TP-2`'s `12` are UNCHANGED (their drives are real drives; only `IM-1`'s distinct-CLASS figure collapses).** **The as-filed `22`/`18`, the `R3` total `140` and the *"keep `140`"* recommendation at `§7a.1` item 5 are all KEPT VISIBLE and marked SUPERSEDED.**
3. **`E-2` CLOSED — *"Reuse"* (the architect, 2026-09-27; `docs/pending.md` §I-duodecies), and the three items the ruling owed are landed:** **(a) THE RULING AND ITS CONSEQUENCE** — the runtime REUSES the emitted element across a graph write (`state-slice` patches in place), **element identity is PRESERVED, the affordance is MULTI-SHOT, the wiring owes NO rebind, the wiring keeps FIVE roles and the SIXTH (rebind) is NOT OWED, and a repeat `attach` stays the pinned first-config-wins no-op** (`§2.1` item 8, `§2.3` rows 3/15, `§2.5` item 5, `§3.1 M-7`/`M-19`, `§3.3 I-15`, `§7` item 15, `§7a.1` item 4). **(b) THE STRUCTURAL-WRITE BOUNDARY** — **the commit's write must NOT structurally replace the affordance node: reuse covers a PATCH, and a write that ADDS, REMOVES or MOVES the affordance's own node (or its authored card's structure) would still change the element; THE SINK TARGETS THE AUTHORED STATUS/READOUT NODE, DELIBERATELY OUTSIDE THE AFFORDANCE'S NODE, and `M-19` now asserts THAT DISTINCTION rather than a bare identity claim** (`§2.1` item 8(v), `§2.5` item 5, `§2.3` row 15, `§3.1 M-19`). **(c) THE LIVE EVIDENCE ROW** — **`§5.U` `U-8` gains reading `(e)`: drag → commit → drag AGAIN on the same affordance, recording the SAME element object across the write (same `data-node-id` AND object identity) and a committed second drag.** **It EXTENDS the existing `U-8` (and its second block) rather than adding a ninth U-row: the cap is `8`, NO row id was renumbered, and `summary.total` stays `8`.** **(d) `docs/FORKER.md` carries the downstream rule beside the seam-contract block.** **The escalation's *"decide `E-2` by measurement"* recommendation is SUPERSEDED and kept visible; the SIXTH role is NOT OWED, and the *"single-shot affordance"* consequence is WITHDRAWN.**
4. **THE TWO RESIDUAL ROLE LISTS ARE SWEPT.** **`§0A` note 9 and `§2.6` item 1 are re-swept and CONFIRMED live-correct: neither says this unit owns the capture opt-in, and neither carries an undecided element-identity policy.** **`§7` item 13 is re-swept for the same two readings.** **`§7a`'s closing paragraph now states the item arithmetic honestly: `5` reported · `3` RULED (items 2, 4, 5) · `2` OPEN (items 1 and 3).**
5. **WHAT REMAINS OWED, NAMED SO NO LATER PASS READS THIS FILE AS PROGRESS.** **(a)** **THE UNIT IS NOT GREEN AND NOT DELEGABLE**: no module exists, no demo card exists, no red set has run, no leg has run, no register row has been EXECUTED (the register's executed layer is still `OWED`), no live battery has run — **`U-8`'s reading `(e)` included** — no greens set exists, no adversarial pass has run (`§3a`'s seeds and `§3b`'s table are still `OWED`/empty), and no DONE row exists. **(b)** **GATE-1 STEP 4 (CHANGE-ANALYSIS) RUNS NEXT, ON THIS TEXT and BEFORE any TestWriter red set** (`AGENTS.md` item 8). **(c)** **THE `E3`-SIDE ITEMS STAND**: the capture opt-in (`§2.6` item 4, `§8`) and the three `EXPECTED-RED` obligation rows `M-1`/`M-2`/`M-3` — **owner: the supervisor + an Implementer pass on `src/shared/gutter.ts`; never fixed from this unit.** **(d)** **THE TWO OPEN AMBIGUITY ITEMS** — `§7a.1` item 1 (the hover evaluation budget) and item 3 (the preview channel's write form) — keep their working defaults and their recommendations, and a later pass that changes either MUST OPEN A GATE. **(e)** **THE TRACKER CELLS** this pass could not touch (it edits no tracker): `docs/next-steps.md`'s `E10` row and `docs/pending.md`'s stale quotations remain the supervisor's to reconcile — **including the fact that `docs/pending.md` §I-terdecies's QUEUED list is now DISCHARGED by this pass (its `E-3` re-grain and `E-2` items 1–3 are landed; its item 4's write route was already pinned by `§R.2` `R-13`, and its item 5's `§7a.1` open items are now two, not five).**
6. **THE HONEST HEADLINE, in one sentence: both architect rulings are landed in the contract — the register's declared total is `134` as the sum of its seven printed drive terms with the assertion and reading figures printed beside them, and the commit no longer carries an element-identity question (the element is reused, no rebind, five wiring roles, with the structural-write boundary stated and a live second-gesture observation owed by the mandatory battery) — while the unit remains NOT green, NOT delegable and NOT through its gate.**

---

## ⟶ RECORDED 2026-09-27 — THE GATE-1 STEP-4 (CHANGE-ANALYSIS) PASS: ITS EIGHT CONDITIONS (`C-A1`…`C-A8`) LANDED, ITS ONE CRITICAL FINDING (`R-4` / `C-A5`), AND THE STATE THE UNIT IS IN AFTERWARDS

**NOT a new contract section and NOT a new number: this is the step-4 pass's own record, appended at the file's end, AFTER the append rule's block, as that block's own deliberate dated exception (the placement the three earlier `⟶ RECORDED` blocks used) — so NO section number moves, NO row id is renumbered and NO contract section is added.** **It is the dated counterpart of the conditions it lands: the CONDITION TEXT lives at its own sections (`§4.1`, `§5.U`, `§R.3`, `§5.1`, `§5.3` items 4/12, `§3.1`, `§3.2`) and the two rows it tightens (`U-5`, `U-8`(e)); this block states WHAT THE PASS DID, WHICH CONDITION LANDED WHERE, and WHAT IS STILL OWED.** **THE REVIEW'S OWN VERDICT AND ITS TRANSCRIPT PROVENANCE ARE RECORDED AT `docs/specs/gutter-ui-review.md` (step 4 `PASS-TO-RED-SET`) and `docs/pending.md` §I-quindecies (the transcript).**

1. **WHAT THIS PASS DID.** **It amended THIS FILE IN PLACE — `docs/specs/gutter-ui.md` and nothing else.** **It edited no source file, no test file, no tracker, no sibling spec, no config and no script; it ran no suite, no leg, no trio, no `tsc`, no Electron boot and no live battery; and it made no commit and no writing git command of any kind.** **Every as-filed clause a condition changes is kept visible at its own site with a dated `⟶` annotation naming this pass — nothing was rewritten silently, and no section was renumbered (`§5.3`'s numbering note, the `§5.U` label, the absent `§5.5.0` and the `§5.3 → §5.5` gap all stand exactly as filed).** **`E3`'s and the session's files remain DENIED (`§5.1` items 0/1/2) and were NOT touched; this pass READ `src/shared/gutter.ts` only to record the LANDED state (`cc7fba5`) that three of this unit's rows now assert against — a read, never an edit.**

2. **`C-A5` — THE NEW CRITICAL FINDING (`R-4`): A WRONG COMMITTED VALUE IS SILENTLY PRODUCIBLE AND INVISIBLE TO EVERY DECLARED GATE — AND IT IS NOW A READING, AT TWO SITES.** **THE FINDING, in one paragraph: if the wiring's `sizeFor` closure does NOT read back the handle the module's own `onMove` turn set (`handle.set(clamped)`, `§R` `R6`), `E3` falls back to its default value source and commits the RAW PRE-DRAG SIZE instead of the dragged value — and NOTHING FAILS:** the sink is still called exactly once, the element is still reused, the graph still changes, `M-5`'s two-reading falsifier passes, `M-8` passes, `M-19`'s write-route reading passes, `U-8`(e)'s second drag still commits, and `U-5`'s as-filed `html` read-back still shows *"the status node carries a committed value"* — **so every declared gate is satisfied by a WRONG value.** **THE ENFORCEMENT, at zero cost, AT THE TWO SITES THE FINDING NAMES:** **(a) `§5.U` `U-5`'s reading is TIGHTENED to a DRAGGED-VALUE reading — the authored STATUS/readout node must carry the value the OPERATOR ACTUALLY DRAGGED TO — with the PRE-DRAG size as an EXPLICIT NEGATIVE CONTROL that must FAIL the same reading, and with the failure mode stated in the row's own words; (b) `§5.U` `U-8`'s reading `(e)` is WIDENED — the SECOND gesture's COMMITTED VALUE must be recorded (not merely that a second commit happened), compared against the pre-drag size as the same negative control and against the FIRST commit's value, and a record showing a second committed value equal to the pre-drag size FAILS.** **WHY IT IS INVISIBLE AT `[T]`: the commit's value is read by `E3` from a handle the NODE SUITE never owns — a `[T]` drive supplies its own `sizeFor` — so no `[T]` row of this unit can see the wiring's closure at all** (`§3.1 M-19` reads the write's ROUTE, not the wiring's `sizeFor` closure). **The row that would catch it is `[U]`-only, which is why the two tightenings are the cheapest enforceable form.**
3. **`C-A4` — THE FORK-FACING COMPATIBILITY STATEMENT (NEW ARTIFACT, one bounded block; the clause, its required content and its proof status follow).**
   > **THE COMPATIBILITY STATEMENT — WHAT A FORK OWES, AND WHAT A SEAM CHANGE OBLIGES.**
   > **(1) WHAT A FORK MUST SUPPLY (the ONBOARDING COST, named):** the ELEVEN caller seams of `§R.3`'s table — **NINE of them `REQUIRED`** (`sizeFromPointer`, `axisOf`, `cursorOf`, `applyPreview`, `applyCursor`, `startSizeOf`, `boundsOf`, `resizableOf`, `commit`) and **TWO `OPTIONAL`** (`pointerOf`, `moveTypeOf`) — plus **an event source, an affordance element, a target element and a session instance**, all handed in as ARGUMENTS (`§2.1`'s `GutterAffordanceOptions`). **The REQUIRED seams are the fork's implementation burden; the OPTIONAL two have declared fallbacks and are not part of it.**
   > **(2) WHAT A SEAM CHANGE OBLIGES DOWNSTREAM:** a change to a seam's **signature, its `REQUIRED`/`OPTIONAL` status, or its DECLARED DEGRADATION** is a **BREAKING change for every fork that implements it** — **a fork must re-implement or re-verify that seam and its degradation row, and may not assume a silent default change** (a degradation is contract text and a fork's miswiring must stay VISIBLE). **A seam ADDITION is likewise a change to the contract's census** (`§3.4 R-1`(b) FAILS for a twenty-first exported name of any kind).
   > **(3) THE THREE HOMES OF THE SEAM CONTRACT — AND THEY MOVE TOGETHER:** **(i)** **the module's exported types** (`src/shared/gutter-affordance.ts`, `§2.1`'s code block — the `3 + 17 = 20` census); **(ii)** **this spec's `§R.3`** (the seam table and the degradation table, the normative statements of status and degradation); **(iii)** **`docs/FORKER.md` §4** (the downstream-facing statement). **A change landing in one home and not the others is a FINDING against this unit; the three are versioned by being changed in ONE pass.**
   > **(4) THE HONEST PROOF STATUS: TODAY THE CONTRACT IS PROVEN ONLY BY THE NODE SUITE.** **No leg of this unit proves a FORK's implementation: the `[T]` rows prove THIS module against caller-supplied doubles, and the `[U]` rows prove THIS repo's ONE EXAMPLE IMPLEMENTATION in THIS repo's app. A fork's own seams are proven by the fork's own rows against the degradation clauses in `§R.3` — and this statement is recorded so a fork does not read this unit's green as a statement about its own wiring.**
   > **(5) WHAT IS NOT THE CONTRACT:** **`src/shared/demo-envelope.ts`'s seam bundle is THIS REPO'S ONE EXAMPLE IMPLEMENTATION** (`§R.3`, `§5.1` row 2) — **it is not normative, and no fork inherits this repo's axis vocabulary, cursor strings, size arithmetic, bounds, resizability policy or commit route.**
   **ITS HOME, AND THE ROW THAT PERMITS IT: the statement is authored into `docs/FORKER.md` §4 as ONE bounded block BESIDE the seam-contract block §I-undecies already requires there, and the EDIT IS PERMITTED BY `§5.1`'s allow-list row `12` (the id `12` was free; nothing was renumbered).** **This spec's statement of record is this `C-A4` clause: it is the text `docs/FORKER.md` §4 must carry in substance, and a `FORKER.md` block that contradicts it — or that restates this spec as the authority instead of the module's exported types plus `§R.3` — is a FINDING against this unit.**
4. **`C-A1` AND `C-A2` LANDED.** **`§4.1` gains the five binding clauses of `C-A1` (the red authored from the SPEC ALONE; run and reported before any implementation; `M-1`/`M-2`/`M-3` present in the red run; their MEASURED CALL COUNTS printed; no expectation, helper or constant from the landed bytes — `§4.4 S-10`).** **`C-A2` lands as the `E3`-token change at `§3.1 M-1`/`M-2`/`M-3`, `§3.2 F-5`, `§4.1` item 3 and `§5.3` item 4: `M-1`'s TWO HALVES are reported SEPARATELY (static = its own reading, now GREEN against the landed module; runtime = its OWN measured outcome, never excusable with the `E3` token), `M-2` is no longer `UNSATISFIABLE FROM THIS UNIT`, and the three host defects are FIXED IN THE LANDED MODULE (`cc7fba5`) — so the as-filed `EXPECTED-RED — OWED — E3-SIDE` token is SPENT and the rows must now go GREEN against the landed module, with the as-filed measured counts printed BESIDE their green readings as the record of what was fixed.**
5. **`C-A3` LANDED AS A CLAUSE (`§5.1` row `10`'s role (v) and `§3.1 M-19`), STATED HERE SO IT IS UNAMBIGUOUS: THE WIRING'S `commit` IS EXACTLY ONE `Runtime.applyCommand` `STATE-SLICE` WRITE TO THE AUTHORED STATUS NODE — NO preview write, NO style/`styles` write, NO authored-handler-body dispatch — AND NO REBIND AND NO RE-RESOLUTION FOLLOWS IT (the `E-2` REUSE RULING, `docs/pending.md` §I-duodecies; `§2.1` item 8, `§2.5` item 5, `§3.1 M-19`, `§3.3 I-15`).** **THE ASSERTION IS OWED BY THE PASS THAT LANDS THE WIRING (`M-19`, `§3.4 R-13`), because the wiring DOES NOT EXIST in the tree this pass read (no `src/renderer/**` byte mentions the affordance module): the clause is contract text and the row is red until the wiring lands.**
6. **`C-A6`, `C-A7` AND `C-A8` LANDED.** **`C-A6` at `§5.U` item 2's new six-clause block (the report FILLED FROM THE RUNS; `summary.total === 8`; the closed `instrument` set; `cmd` literal-or-`MANUAL`; a `MANUAL` row's `observation` an operator observation; the `U-3`/`U-4`/`U-6` structural labels; `U-GAP-1` open).** **`C-A7` at `§R.3`'s `sizeFromPointer` cell and `§2.1`'s `SizeFromPointer` declaration — ONE normative spelling, the module's EXPORTED INTERFACE CALL SIGNATURE, with the function-type form kept visible as this table's own.** **`C-A8` at FIVE stale sites, each swept with its as-filed text kept visible:** **(a) `§R` `R1`'s *"exactly four roles"* → the ruled licence is FIVE (`§2.1` item 8, `§2.2` P-10, `§3.4 R-13`); (b) the `§8` row naming `docs/specs/gsession.md` `§2.3`'s lifecycle — *"its own three source listeners"* → the module attaches FOUR (`§R` `R4`, `§3.1 M-4`); (c) the `§8` row carrying the scope ruling (A) — its quoted *"the capture decision"* clause is WITHDRAWN (`§R` `R5`) and the row now says so; (d) `§4.5` item 3, which routed `E-2`/`E-3` as owed architect choices — BOTH ARE CLOSED (the reuse ruling; the re-grain), and the item now names the two `§7a.1` defaults and the `E3`-SIDE capture opt-in as the only items still open; (e) the two legs and the bundle sentence — `§5.2` leg 4's standalone `tsc` invocation gains `--lib ES2022,DOM,DOM.Iterable` (it omitted a library the main typecheck supplies, so the leg could fail or pass for a reason unrelated to the census), `§5.2` leg 5's precondition is restated in the honest SOURCE-REVISION form (*"green on the same source revision, immediately before, with no intervening source edit"*; both legs REBUILD, so no byte-frozen artifact set is shared), and `§5.2` leg 3's bundle sentence is WIDENED to the MEASURED delta the change-analysis measured — **the renderer bundle NEWLY CARRIES THREE MODULES IT HAS NEVER CARRIED (`gutter-affordance.ts` + `gesture-session.ts` + `gutter.ts`), the FOUR `src/main/**` OUTPUTS STAY BYTE-IDENTICAL, the FIVE-ARTIFACT CENSUS IS UNCHANGED, and the DEMO-KEYED OUTPUTS (census, `get_rendered_html`, `get_markdown`) DRIFT.**
7. **THE ORDERING CAVEAT, RECORDED SO THIS PASS IS NOT READ AS A LICENCE TO RUN THE BATTERY EARLY: the architect's order is amended, keeping its intent, to `E10` spec conditions → `E10` RED SET (run and reported, with its expected reds) → `E3`'s DEFECT RESOLUTION (red-first rows, then the fixes — **`E3`'s defects are now FIXED and its rows green at `93/93`, so this step is SPENT**) → `E10` IMPLEMENTATION TO GREEN → `E10`'s LIVE BATTERY ON THE FIXED `E3` → greens → adversarial → doc review → DONE.** **The reason, kept verbatim in substance: running the mandatory battery against a knowingly-defective `E3` would measure the wrong composition, invalidate the reading and force a second full battery run — the most expensive artifact in the unit — while `C-A5`'s class would be measured through unfixed code.**
8. **THE FIVE HOST-DEFECT AND `R-12` ITEMS OF `E3` ARE NOT THIS UNIT'S TO EDIT — AND THEY ARE NO LONGER DEFECTS.** **`E3`-HOST-1/2/3 are FIXED in the landed module (`cc7fba5`) and `E3` is reported GREEN at `93/93`** (with gates 4/5/done still to be re-recorded) — **recorded here because three of this unit's rows (`M-1`/`M-2`/`M-3`) assert against that module, and because the fix was an Implementer pass on `E3`'s DENIED path, exactly as `§3.2 F-5` requires. THIS UNIT STILL MAY NOT EDIT `E3`'s MODULE, ITS TEST FILE OR ITS SPEC** (`§5.1` items 0/1/2).
9. **WHAT REMAINS OWED, NAMED SO NO LATER PASS READS THIS FILE AS PROGRESS.** **(a)** **THE UNIT IS NOT GREEN AND NOT DELEGABLE**: the affordance module, the demo card, the RENDERER WIRING (including `Runtime.elementForNodeId`) and the test file DO NOT EXIST in the tree this pass read (no `src/**` byte mentions the affordance module); no red set has run, no leg has run, no live battery has run, no register row has been EXECUTED, no greens set exists, no adversarial pass has run (`§3a`'s `15` seeds and `§3b`'s table are still `OWED`/empty), and no DONE row exists. **(b)** **THE RED SET IS THE NEXT GATE WORK, ON THIS TEXT** (`AGENTS.md` item 9; `§4.5`) — and the eight conditions landed by this pass are the text it must be authored from, `C-A1`'s five clauses included. **(c)** **`E3`'s `§3a`/`§3b` RECORD IS NOT THIS FILE'S**: `E3`'s adversarial/gate records are `E3`'s own (`docs/specs/gutter.md` §3a/§3b), and the fix pass's disposition rows are appended THERE; this unit only CONSUMES `E3`'s landed behaviour. **(d)** **THE `E3`-SIDE CAPTURE OPT-IN** (`§2.6` item 4, `§8`) remains `OWED — E3`-SIDE and is the one item this unit cannot assert. **(e)** **THE TWO OPEN AMBIGUITY ITEMS** — `§7a.1` item 1 (the hover evaluation budget) and item 3 (the preview channel's write form) — keep their working defaults and their recommendations, and a later pass that changes either MUST OPEN A GATE. **(f)** **THE TRACKER CELLS** this pass could not touch (it edits no tracker): `docs/next-steps.md`'s `E10` row and `docs/pending.md`'s stale quotations remain the supervisor's to reconcile.
10. **THE HONEST HEADLINE, in one sentence: the change-analysis passed and its eight conditions are now clause text — the red set has a spec-alone authoring rule with its expected-reds and measured counts, the `E3`-side token is spent in favour of the landed-and-fixed module, the commit's write route is pinned as one managed-channel write with no rebind, the seam contract gained a fork-facing compatibility statement with its three homes and its honest proof status, the coverage report is a fill-from-the-runs record, each seam has ONE normative spelling, and five stale sites plus the two leg/bundle sentences are swept to what the change-analysis measured — while the unit remains NOT green, NOT delegable and NOT through its gate, and its one new critical finding (`C-A5`, the silently-wrong committed value) is closed only by the two `[U]` readings this pass tightened.**

---

## ⟶ RECORDED 2026-09-27 — THE RED-RUN REPAIR PASS (gate 3, second half): THE IMPLEMENTER'S STOP REPORT DISPOSITIONED — TWO DEFECTIVE ROWS REPAIRED AND ONE CLAUSE CONFLICT RULED

**NOT a new contract section and NOT a new number: this is the repair pass's own record, appended at the file's end, AFTER the append rule's block, as that block's own deliberate dated exception (the placement the four earlier `⟶ RECORDED` blocks used) — so NO section number moves, NO row id is renamed or renumbered, no register term, seed, strategy id or `§5.U` row moves, and no clause is silently rewritten.**

1. **WHAT THIS PASS DID, AND WHY IT WAS FORCED.** **It amended THIS FILE IN PLACE — `docs/specs/gutter-ui.md` (three cells annotated + this record) — and it directed ONE bounded `TestWriter` remand to `tests/gutter-ui.test.ts`. It edited no source file, ran no suite and no leg, and wrote no greens set.** **THE TRIGGER: the Implementer's gate-3 pass STOPPED with `0` lines of source written and reported that the red set is UNSATISFIABLE AS AUTHORED — two of its `15` currently-passing rows assert `src/shared/gutter-affordance.ts`'s ABSENCE as an unconditional conjunct, so they flip RED exactly when the unit's work is done (measured ceiling `73/75`, not `75/75`), and one pair of rows asserts mutually exclusive readings of the same drive.** **Neither defect is in the module: both are RED-SET row defects of the class this family has already ruled (`docs/specs/gutter.md` `§3.5 R-16`: *"a row that fails because the work was done is DEFECTIVE"*; the `E3`-BLOCK-1 record).**

2. **DEFECT 1 — TWO UNPINNED MODULE-ABSENCE CONJUNCTS, REMOVED AND BRANCHED.** **THE ROWS, with the assertions measured verbatim at `tests/gutter-ui.test.ts`:** **`R-11 §3.4`** (`:1502-1505`) asserted `expect(!existsSync(MODULE_SRC.href)).toBe(true)` (*"the affordance module does not exist yet"*), and **`I-11 §3.3`** (`:1820-1823`) asserted `expect(existsSync(MODULE_SRC.href)).toBe(false)` labelled *"(RED BRANCH) — at red time the authored card has NOT landed"*. **NEITHER CONJUNCT IS PINNED BY ANY CLAUSE: `§3.4 R-11`'s cell claims the pinned-surface SET EQUALITY (`ALL_TOOLS` 21 · `RpcMethod` 21 · `MUTATING_METHODS` 7 · `VALID_GROUPS` 5, plus the renderer RPC switch and the preload bridge), and `§3.3 I-11`'s cell claims that the DRIFT IS MEASURED rather than projected (its instrument is `U-7`'s BEFORE/AFTER readings) — neither says anything about whether the module exists.** **THE REPAIR, which is the form the SAME file already requires elsewhere (`§3.5 R-8x` carries an explicit RED branch and GREEN branch and its own message cites the DEFECTIVE-ROW lesson): each row BRANCHES on the module's presence — at red time the absence is asserted (with the red-time subject it must not have), at green time the row asserts ITS OWN CELL'S claim and nothing more (`R-11`: the pinned surface set is unchanged by the module's arrival; `I-11`: the drift debt is still owed to `U-7` and is NOT discharged by the module's arrival).** **A repair that merely DELETED the conjunct would have made both rows vacuous; the branch form keeps a red-time reading AND a green-time reading, so each row still fails for its own reason (`§4.4 S-7`'s non-vacuity rule).**

3. **DEFECT 2 — THE `sizeFromPointer` THROW DISPOSITION, RULED (THREE NORMATIVE SITES AGAINST ONE).** **THE CONFLICT, measured in the red set:** **`F-2 §3.2`** (`:3212`) asserts a throwing `sizeFromPointer` **PROPAGATES** (`fire.thrown !== null`), while **`M-20 §3.1`** class 3 (`:3058`) asserts the SAME drive with the SAME seam is **ABSORBED** (`fired.thrown === null`) and reaches the `reset` arm — so no implementation can satisfy both, and the two rows drive one identical life cycle (`pointerover` → `pointerdown` → `pointermove`). **THE GOVERNING CLAUSES, each already in this file before this pass: (i) `§2.4`'s seam table's *throwing-seam* row — the throw *"PROPAGATES for the THREE `void` PRESENTATION/SINK SEAMS (`applyPreview`, `applyCursor`, `commit`) and is ABSORBED by the module's own total gate for the four VALUE-READING SEAMS"* (`pointerOf`, `sizeFromPointer`, `axisOf`, `boundsOf`, plus `startSizeOf`/`resizableOf`); (ii) `§R.3`'s degradation table (the identical sentence, landed by the gate-1 STEP-3 repair pass); (iii) `§3.1 M-20` class 3.** **THE DRIFT SITE: `§3.2 F-2`'s cell, which cites `docs/specs/gutter.md` `§2.4` item 2 row 4 — `E3`'s behaviour for a consumer seam AT A TERMINAL — for a seam this module reads DURING A MOVE, i.e. inside the turn `§3.3 I-7` and `M-20`'s own title (*"NO throw out of a turn that must stay total"*) require to be total.** **THE RULING: a throwing VALUE-READING seam is ABSORBED by the module's own total gate; the move is INVALID ⇒ the `reset` arm (`stats().resets === 1`), NO preview write, NO sink write, and NO throw out of the turn; the record is discarded in the `finally`; the later drive makes ZERO session calls.** **`F-2`'s cell is ANNOTATED (SUPERSEDED reading kept visible), and `F-2`'s ROW IS REMANDED to the absorbed reading while keeping its own subject and its own measured readings (one throwing seam, one drive, its own `stats()`/preview/sink record).** **THE RULING IS RECORDED, NOT SILENT, and is reversible at close-out: it is carried by this block, by the annotated cells, by a `docs/decisions.md` ACTIVE row, and by the DONE row's own account — if the architect prefers PROPAGATES, the `§2.4`/`§R.3`/`M-20` sites are the ones to re-rule, and the three sites move together or the contradiction returns.**

4. **WHAT DID **NOT** MOVE, stated so a later citation is safe: no section number; no row id (`R-11`, `I-11`, `F-2`, `M-20` all keep their ids and their positions); no register row, declared term, seed, strategy id or cap (the `134`/`15`/`15`/`15`/`45`/`20`/`12`/`12` arithmetic and the `§5.5` register are untouched); no `§5.U` row (the `8`-row cap is unchanged and `U-8`'s readings `(a)`–`(e)` are untouched); no `§5.1` allow-list row or DENIED item; and no leg, command or exit-code claim.** **`§3a`'s `15` seeds and `§3b`'s disposition table are still the NEXT gate's (gate 4), and this pass authored no finding into them.**

5. **THE STATE AFTER THIS PASS.** **The red set is STILL THE RED SET: `60` failed / `15` passed of `75`, and it must read that way until the module lands** — the repaired `R-11`/`I-11` rows still take their RED branch, and the remanded `F-2` row still requires the live module (`requireLiveModule`). **The implementer's ceiling is therefore restored to the measured `75/75`; `src/shared/gutter-affordance.ts` still DOES NOT EXIST; and the gate-3 green pass is the next gate work, unchanged in scope (`§5.1` rows 1/2/10/11).**

