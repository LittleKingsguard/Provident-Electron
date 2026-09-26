# Spec — `U-GUTTER`: the node-local resize controller composed on the landed session (+ the exported pure `clampToBounds`)

**Unit `U-GUTTER` · wave `E` · ledger row `E3` · upstream `SCH-6` (`A-d4`, ADOPTED-RESHAPED) ·
composes `U-GSESSION` (`E6`, `DONE`) · derives `docs/specs/gutter-review.md`'s twelve rulings and
satisfies its `C1`–`C5` · filed 2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/gutter-review.md` is the CLOSED gate-1 record**
(step 1 `VALID-WITH-CONDITIONS` · step 2 `SOUND-WITH-CONDITIONS` · step 3 `DELEGABLE-WITH-CONDITIONS` —
**the TWELVE GOVERNING RULINGS** · step 4 `PASS-WITH-RECORDED-CONDITIONS` — **`C1`–`C5`** and **the
must-not list**). **This spec DERIVES those rulings and conditions. It does NOT re-litigate, weaken or
re-open any of them**, and **a clause of this file that contradicts a ruling is a finding against this
file, not a re-opening of the ruling** (the record's own governing rule, its §4 preamble).

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing **lands one NEW file**
(`docs/specs/gutter.md`) and **nothing else**. **The module does not exist. No test file exists. No red
set has been run. No leg, no trio, no register row has been executed. No gate record exists. The unit
stays an open `## OPEN` row (`E3`) with its ledger status the supervisor's**, and **it is NOT delegable
until a TestWriter has RUN and REPORTED the red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and
this filing's own dated ruling notes · `§1` — the scope and its named cost · `§2` — the exact surface,
the seven seams with their named safe defaults, the arithmetic and value rules, the seam rules and the
composition boundary · `§3` — every state, fail-state, invariant and static/existence row · `§4` — the
red, the authoring order and the binding stop conditions · `§5` — the wiring, the four legs, the DONE
row's shape and **the thirteen-row typed register** · `§6`–`§8` — falsification, honest limits,
ambiguity report and the citation index · `§3a`/`§3b` — the adversarial seed set at the file end.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s archival rows; the
sibling specs' file-end notes). **This spec carries no length census of any file.**

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b`
file-end note — the placement the sibling specs use.)** **This block is the FILING-TIME state, and it is
the whole of it:** — **⟶ SUPERSEDED IN PART 2026-09-27 (THE RED-RUN AMENDMENT PASS, whose own `⟶
RECORDED` block sits at the END of this status area, item by item):** **items 1, 3 and 5 below are the
FILING-TIME readings and are kept visible as provenance. THE MEASURED STATE NOW: the module does NOT
exist, BUT the RED SET DOES — `tests/gutter.test.ts` has been AUTHORED and RUN at gate 3, reporting `90`
rows with `71` FAILED / `19` PASSED; no leg, no trio, no greens, no gate record and no DONE row exist;
the register's declared total is `299` (item 3's as-filed `314` is a corrected mis-sum); and the
`reset` code domain carries TWO controller-local codes (item 6's as-filed *"the controller-local
`'unusable-default'` code"* is extended by `'not-resizable'`).** **THE UNIT IS STILL NOT GREEN.**

1. **THE FILING STATE, HONESTLY.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one file — the NEW `docs/specs/gutter.md`** — and edited **no existing file**. **The module
   (`src/shared/gutter.ts`), the test file (`tests/gutter.test.ts`), the red set, the legs, the
   register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT EXIST YET.**
   The unit is **`OWED` at every gate after this one**, and **it is NOT delegable until a TestWriter has
   RUN and REPORTED the red set** (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW `src/shared/gutter.ts`**
   exporting **TWO value exports and TEN type declarations = TWELVE exported names** (`§2.1`), whose
   factory options carry **EXACTLY SEVEN injected seams, NAMED and ORDERED, with `capture` ABSENT**
   (`§2.1` item 3), with **exactly one import statement** — a type-only import of the landed session
   module (`§0A` note 2) — and with **no module-level mutable state**.
3. **THE REGISTER (`§5.5.1`): `13` typed rows in FOUR families** — `P-GT-PU-1`..`P-GT-PU-3` ·
   `P-GT-IM-1`..`P-GT-IM-4` · `P-GT-SM-1`..`P-GT-SM-4` · `P-GT-TP-1`..`P-GT-TP-2` — **`299` declared
   attempts, printed with their thirteen terms and a term-by-term addition at `§5.5.3`**, one pinned-seed
   generator (`S-GT-TOTAL-1`, `20260927`, one LCG step per draw, `pool.length = 20`), **`3` rows carrying
   a `(bounded)` marking**, and **the POOL-VERSUS-BOUNDARY check RUN and CLEAN for all `13` rows**
   (`§5.5.2` item 7). — **⟶ CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT PASS — THE ARITHMETIC MIS-SUM,
   the FIFTH consecutive sibling to hit the class):** **the as-filed `314` in this item is a MIS-SUM and
   is kept visible above; the DECLARED TOTAL IS `299`, THE SUM OF THE REGISTER'S OWN THIRTEEN PRINTED
   TERMS.** **THE THIRTEEN TERMS ARE UNCHANGED AND NO TERM MOVED** — `60` (`P-GT-PU-1`) + `11`
   (`P-GT-PU-2`) + `10` (`P-GT-PU-3`) + `18` (`P-GT-IM-1`) + `20` (`P-GT-IM-2`) + `22` (`P-GT-IM-3`) +
   `28` (`P-GT-IM-4`) + `20` (`P-GT-SM-1`) + `15` (`P-GT-SM-2`) + `5` (`P-GT-SM-3`) + `12`
   (`P-GT-SM-4`) + `60` (`P-GT-TP-1`) + `18` (`P-GT-TP-2`) — and the term-by-term addition is
   **`60 → 71 → 81 → 99 → 119 → 141 → 169 → 189 → 204 → 209 → 221 → 281 → 299`** (`§5.5.3`'s table,
   as corrected). **THE FAMILY SUBTOTALS, stated consistently with that addition: `PU` = `60+11+10` =
   `81` · `IM` = `18+20+22+28` = `88` · `SM` = `20+15+5+12` = `52` · `TP` = `60+18` = `78` — and
   `81+88+52+78 = 299`.** **The caps are compared against `299` (`299 ≤ 400`; per-row maximum `60` ≤
   `100`).** **A total that is not the sum of its own terms is a REVIEW FINDING**
   (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE), **and the as-filed `314` is
   recorded here as a dated CORRECTED ARITHMETIC DEFECT rather than silently rewritten.** **The
   `(bounded)` set stays `3` rows** — `P-GT-PU-2` · `P-GT-IM-2` · `P-GT-TP-1`, named identically here,
   at `§5.5.1` and at `§5.5.2` items 2/3 — and **`P-GT-SM-2` is NOT one of them**.
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus
   `npm run typecheck` `[H]` (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]`
   (**five bundles byte-identical**), and a **fourth leg** (a standalone strict `tsc --noEmit` over
   `tests/gutter.test.ts`). **NO `[U]` ROW IS OFFERED** (the three-part refusal: `§5.2`) and **NO `[D]`
   ROW IS CLAIMED** (`PRECONDITION-GATED` on `U-DIVERGENCE-EXT`, row `C2`).
5. **THE GATE RECORDS: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is `OWED`), no
   blind-greens record (`docs/specs/gutter-greens.md` is named in the diff scope and is OWED), no
   per-unit documentation review, no DONE row (`§5.3` fixes its eleven-item shape), and **gate 6 is
   STRUCTURAL, not waived** (`§5.2`).
6. **THE THREE OPEN QUESTIONS THIS FILING REPORTS RATHER THAN SETTLES** (`§7a`/`§7a.1`): the
   controller-local `'unusable-default'` code · `detach()`'s scope when the session is shared · the
   classification of the one type-only import of the session this unit composes. **Each has a working
   default implemented in `§2` and a recommendation; a later pass that changes one must open a gate.**
7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO
   existing file):** `docs/next-steps.md`'s row **`E3`** still reads its spec cell as
   **`OWED — not filed`**, and the row's status is unchanged. **`E10` stays `PROPOSED — awaiting
   admission`** and **is not owed by `E3`.** **The `U-CENSUS` edge is DISSOLVED** in the row's
   `Blocked on` cell already (`§2.5` item 2).
8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone
   (globbed this pass), so there is **no test-use-case coverage matrix and no demo-page index to update**,
   and **this unit renders no page** (`§3.5 R-9`'s probe; `§7` item 7).
9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no
   test run, no leg run, no trio run, no `tsc` invocation, no Electron boot, no commit and no writing
   git command of any kind.** The new file is **untracked and must be committed by the supervisor**
   (`RCA-8`'s per-gate commit rule).

**⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS) — THIS PASS'S AMENDMENTS, LISTED SO THEY ARE
ATTRIBUTABLE AND BOUNDED.** **WHAT PROMPTED IT: the gate-3 red set RAN and REPORTED.**
**`tests/gutter.test.ts` executed `90` rows and reported `71` FAILED / `19` PASSED** (the module-absent
boundary plus the static/existence rows that are already evaluable); **the findings it reported are what
this pass lands.** **THE PASS'S OWN EXTENT: THIS FILE ONLY** — **no `src/**`, no `tests/**`, no tracker,
no sibling spec and no `docs/specs/gutter-review.md` touched, no commit and no writing git command.**

**THE AMENDMENTS THIS PASS LANDS, each an in-place dated `⟶` annotation with the as-filed form kept
visible at its own site:**

**(1) THE DECLARED TOTAL IS CORRECTED FROM `314` TO `299`** — `299` **IS** the sum of the register's own
thirteen printed terms (the as-filed `314` was a MIS-SUM), **at every site that prints it**: this block's
item 3 · `§5.5.1`'s header/cells · `§5.5.2` · `§5.3` items 10/11 · `§5.5.3` · `§7` item 9 · the `§8`
index rows · `§3a`/`A-15`. **NO ROW'S TERM MOVED; the caps are compared against `299`.**
**(2) THE `reset` RESULT-CODE TABLE IS RULED AND STATED** at `§2.3` item 4 (`§2.5` item 5 clause 4):
the session's **SEVEN** codes propagate **verbatim**, and **TWO controller-local codes are DECLARED and
NEVER passed into the session** — `'unusable-default'` and `'not-resizable'` — with `'no-gesture'` the
session's own code on the idle path. **The SESSION's seven-member domain is UNTOUCHED and no eighth
member enters it.**
**(3) `§3.1`/`§3.4`/`§5.5.1`'s TWO-WRITER READING IS CORRECTED**: the single-writer composition's two
readings AGREE at `1`; the TWO-WRITER composition's **sink's own record reads `2` while the controller's
counter still reads `1`** — **THAT DIVERGENCE is what makes the row falsifiable.**
**(4) A NEW CLAUSE ROW, `M-20`, CARRIES `detach()`'s MULTI-ELEMENT LIMB** (the `§7a.1` item 2 working
default), with `M-13` named as its in-red carrier; **an explicit `P-GT-SM-5` row is added to the register
WITHOUT an attempt term** (see item (5) below).
**(5) `§5.5.1 P-GT-SM-3`'s shape-`(5)` text is COMPLETED** (it was truncated at *"a composit…"*) to the
**SECOND CONSUMER-SIDE WRITE CLASS** — **a consumer's own `onEnd` calling the sink** — and the shapes
`(1)`–`(5)` list is stated completely.

**THE FOUR CONFIRMATIONS THIS PASS OWES, stated so they bind the reader:** **(i) NO REGISTER ROW WAS
ADDED OR REMOVED** — the register is still **`13` typed rows in FOUR families**, no id was added in its
space (the `P-GT-SM-5` cell of item (4) is a **`§3.1`-class clause row with NO ATTEMPT TERM**, named a
register sibling but deliberately OUTSIDE the thirteen-term arithmetic and the `≤400`-cap comparison);
**(ii) THE ONLY ARITHMETIC CHANGE IS THE TOTAL'S CORRECTION TO `299`, ITS OWN TERMS' SUM** — every one
of the thirteen terms, every family subtotal's components, the seed `20260927`, the caps and the
`(bounded)` set are UNMOVED; **(iii) NO ATTEMPT TERM MOVED**; and **(iv) NO SECTION WAS RENUMBERED** —
no `§`-number was added or moved, the `§5.3 → §5.5` gap (no `§5.4`) and the absent `§5.5.0` stay exactly
as recorded at `§5.3`'s note, and the new `M-20`/`P-GT-SM-5` ids are the next free members of their own
families.

**THE UNIT REMAINS NOT GREEN.** **Its red set has RUN and REPORTED — `90` rows, `71` failed / `19`
passed — and the Implementer's green is the NEXT STEP, not this pass's.** **This pass claims NO green,
takes NO gate, and writes NO DONE claim.**

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.**
Where the record's own §7 flags a corrected citation, **the corrected site is the one cited here** —
never the transcription that was corrected.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`A-d3` — the node-local interaction rule**: *all shell interaction mechanisms work through local handlers on the element that receives the interaction; document-delegated pointer tracking is REJECTED.* | `§1` item 2, `§2.2` (P-2/P-3/P-6), `§2.5`, `§3.4 R-2`/`R-3`, `I-6` |
| **2** | **`A-d4` — the panes/zones family is IN SCOPE and the adoption is binding**, with **the mandatory GEOMETRY CLAUSE**: *the contract and its call counts are provable here; **any rendered-geometry claim is UNPROVABLE in this repo today**.* (`docs/decisions.md` `SHELL-CHROME-PANES-ZONES-IN-SCOPE`.) | `§0A` note 11, `§1` item 2, `§2.1` (the controller's call counts), `R-8`, `I-11`, `§5.2`, `§6`, `§7` item 4 |
| **3** | **`SCH-6`'s `SECOND-GESTURE-AUTHORITY` objection IS ANSWERED IN THE CONTRACT — BY COMPOSITION.** The controller is *driven by* the landed session, composes it, and **re-expresses NONE of its lifecycle**, so it creates no second authority over the gesture lifecycle. | `§2.5` (the composition boundary), `§2.2` (P-4), `§3.4 R-7`, `I-7`, `I-8`, `§2.6` item 6 |
| **4** | **`SCH-6`'s `ARITHMETIC-OVER-INJECTED-VALUES` objection is OVERRIDDEN by `A-d4`, NOT answered by it** (`docs/decisions.md` `GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS`, part 1(a)). **This unit's warrant is the architect's ruling PLUS its clause rows; no pass may present this unit as having ANSWERED the arithmetic objection.** | `§0A` note 12, `§7` item 13, `§8` (the `GUTTER-WARRANT…` row) |
| **5** | **The frozen delegate surface:** `docs/specs/gsession.md` `§2.5`'s **eleven-item numbered delegate list is FROZEN AND COMPLETE** (`docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`). **This unit writes against it and re-opens no item of it.** | `§2.5` (the call census), `§3.4 R-14`, `§8` (the `GSESSION-DELEGATE…` row) |
| **6** | **Ruling 1 — THE CONTROLLER IS THE SINGLE WRITER.** The session is constructed with its `commit` option wired to **exactly ONE** callback — the composition's **single sink writer** — invoked **at most once per gesture, only at an `end`/`reset` terminal, never on `cancel`**. **NO OTHER WRITE CHANNEL EXISTS** (no write from `onMove`/`onStart`/`onEnd`/`onCancel`). **Two positive controls are REQUIRED: a TWO-WRITER composition must FAIL a row and a NO-WRITER composition must FAIL a row**; and **a slot-empty composition must state, IN THE SAME SENTENCE, that the session then reports `committed: true` while NOTHING WAS WRITTEN** (`C1`). | `§2.3` item 3 (the write-count clause, with both controls and the `C1` sentence), `§2.5` item 4, `§3.2 F-9`/`F-10`/`F-11`, `§5.5.1 P-GT-SM-3`, `I-2` |
| **7** | **Ruling 2 — THERE IS NO MAGNITUDE CHANNEL.** The value is **CONSUMER-PRODUCED** (`onMove` ⇒ `gesture.set`), **read at most once at the terminal** by the injected `sizeFor(element, gesture, axis)`, and committed as `clampToBounds(raw, boundsFor(element, axis))`. **A consumer-supplied `sizes`-style value is a NAMED PRECONDITION entering only as an argument to the consumer's own callbacks.** **The unit ships NO drag arithmetic, no coordinate read and no magnitude — a NAMED, RECORDED COST, not an omission**; what local handlers purchase is **origin REACHABILITY, not magnitude-equivalence**; **no pass may claim agent-drivable drags.** | `§0A` note 3, `§1` items 2/4, `§2.2` (P-8), `§2.3` item 1, `§3.4 R-8`, `I-11`, `§7` item 2 |
| **8** | **Ruling 3 — `axisFor` IS FUNDED AS AN OPAQUE TOKEN.** `axisFor: (element) => unknown`; the token is passed to `boundsFor`/`sizeFor`/`defaultSizeFor` and **is NEVER interpreted** — **no axis vocabulary in the module's bytes**. **Absent, non-callable or throwing ⇒ the token is `undefined`.** | `§0A` note 4, `§2.1` (`AxisFor`), `§2.2` (P-5), `§2.3` item 2, `§3.4 R-1`, `I-5` |
| **9** | **Ruling 4 — THE CONTROLLER OWNS THE RESET ENTRY POINT.** `reset(element)`, over the session's `reset` terminal: the handle is **captured in the controller's own hook, NEVER synthesised, NEVER retained past the terminal**; **no active gesture ⇒ refuse `'no-gesture'` with ZERO session calls**; **the session's own codes propagate VERBATIM (the seven members, no eighth)**; the committed value is **`clampToBounds(defaultSizeFor(element, axis), boundsFor(element, axis))`, at most once, with ZERO session calls when the default is unusable**; and **the controller NEVER calls `session.begin` outside the documented establishment.** | `§0A` note 5, `§2.3` item 4 (the reset clause), `§2.5` item 5 (the reset entry point's full contract), `§3.1 M-14`..`M-17`, `§3.2 F-12`..`F-15`, `§5.5.1 P-GT-SM-4` |
| **10** | **Ruling 5 — `isResizable` IS EVALUATED EXACTLY ONCE PER GESTURE, AT ESTABLISHMENT.** **Truthiness; absent ⇒ not resizable; a throw ⇒ not resizable.** **`false` ⇒ the gesture ESTABLISHES and TERMINATES NORMALLY with ZERO sink writes**, and **the outcome distinguishes it from a cancel**. **It is never an install-time gate.** | `§0A` note 6, `§2.3` item 2, `§3.1 M-8`/`M-9`, `§3.4 R-13`, `§5.5.1 P-GT-IM-3`, `I-4` |
| **11** | **Ruling 6 — THE COMPOSITION NEVER OPTS IN TO CAPTURE.** **`capture` is ABSENT from the install options and there is NO `capture` option on the controller**, so *"no capture before establishment"* is **INHERITED and OBSERVED** — with a **positive control** (a composition that DID pass `capture: true` must FAIL a row). **The session's parked release-after-failed-establishment question stays PARKED with its existing trigger** (`docs/pending.md` §I). | `§0A` note 7, `§2.1` (the frozen seam set, `capture` ABSENT), `§2.2` (P-7), `§3.4 R-10`, `§5.5.1 P-GT-SM-2`, `§2.6` item 4 |
| **12** | **Ruling 7 — `clampToBounds` IS TOTAL WITH NO REFUSAL DOMAIN**: `clampToBounds(value: unknown, bounds: unknown): number`; a `typeof`-gated bounds read (**`NaN` when either bound is not a `number`**), then **`Math.max(min, Math.min(value, max))`**; **the eleven-row fail-state table**; and **`S-PURE-1..5`**: **no coercion · no result-record · no built-in literal · no second clamp · no geometry.** | `§0A` note 8, `§2.3` item 2 (the no-refusal-domain clause + the full fail-state table), `§3.2 F-1`..`F-8`, `§4.4 S-PURE-1`..`S-PURE-5`, `§5.5.1 P-GT-PU-1`/`P-GT-PU-2`/`P-GT-PU-3` |
| **13** | **Ruling 8 — SEVEN NAMED SAFE DEFAULTS (the `docs/specs/listhost.md` `§7a` item 4 form, as `docs/specs/slothost.md` `§2.1` mirrors it): one per injected seam, with its declared outcome.** **The totality universal carries its BOUNDARY IN ITS OWN WORDS** — a universal whose bound is not stated in its own cell is not a register row. | `§2.4` (the table, verbatim in substance), `§2.1` (the seam table), `§3.2 F-16`, `§5.5.1 P-GT-TP-1`, `§5.5.1 P-GT-TP-2` |
| **14** | **Ruling 9 — THE `U-CENSUS`/`U-GSESSION` BOUNDARIES, STATED AS BOUNDARIES.** **No import of any sibling — not even type-only** (`docs/specs/census.md` `§1` item 7; the `H-r6` dissolved-edge class) **EXCEPT the landed session module this unit composes**; **`sizes` enters only as an injected-callback argument**; **one controller per session/control, with the explicit LIMIT that the mechanism has NO shared registry and CANNOT detect a second controller**; **no handle past a terminal**; **session state is read only through `stats()`/`gesture()`/`disposed`.** | `§0A` note 9, `§2.2` (P-9/P-10), `§2.5` items 2/3/6, `§3.4 R-5`/`R-7`, `I-8` |
| **15** | **Ruling 10 — THE REGISTER IS THIRTEEN ROWS IN FOUR FAMILIES**: `P-GT-PU-*` (3) · `P-GT-IM-*` (4) · `P-GT-SM-*` (4) · `P-GT-TP-*` (2). **Fully enumerable with NO pointer input** (a recording session double, the landed session, a counting sink, throwing stubs). **Totals printed with their terms; declared AND distinct-drive figures both reported; caps `≤100`/row · `≤400` total · stop-after-5; a pinned seed only if a generator is used; and the pool-versus-boundary check RUN BEFORE FILING.** **`≤8` is a BREAKDOWN SIGNAL, not a ceiling: 13 rows is an OUTCOME and must NOT be trimmed.** | `§5.5`, `§5.5.1` (the thirteen rows), `§5.5.2` (the honesty block, the check's per-row result), `§5.5.3` (the arithmetic), `§5.3` items 10/11 |
| **16** | **Ruling 11 — THE FOUR LEGS, THE THREE-PART `[U]` CLAUSE, `[D]`, AND GATE 6.** The four legs: `npm test` `[T]` · `npm run typecheck` `[H]`, **`src/**`-ONLY** · `npm run build` `[H]`, **five bundles byte-identical** · **a standalone strict `tsc --noEmit` over `tests/gutter.test.ts`** — **NOT optional and NOT a script addition**. **The three-part `[U]` clause**: the refusal · the structural reason · `docs/specs/zones.md` `§4.4 S-6`'s *"may not be moved to the `ui` leg silently"*. **`[D]` unclaimed, `PRECONDITION-GATED` on `U-DIVERGENCE-EXT` (`C2`)** — not claimed, not implied. **Gate 6 is STRUCTURAL, NOT WAIVED.** | `§5.1`, `§5.2` (all four legs + the three-part clause + `[D]`), `§5.3` items 6/7, `§7` item 5 |
| **17** | **Ruling 12 — THE CHANGE SURFACE.** **MAY touch:** `src/shared/gutter.ts` (NEW — exactly the controller + `clampToBounds` + its types) · `tests/gutter.test.ts` (NEW) · `docs/specs/gutter.md` (NEW) · `docs/specs/gutter-greens.md` (NEW) · the unit's tracker rows · `archive/reviews/*`. **MUST NOT touch** the twelve denied paths — and **the REAL gutter UI is a NAMED FUTURE UNIT OUTSIDE `E3`** (ledger row `E10`, `PROPOSED — awaiting admission`), **which `E3` does NOT owe.** | `§1` items 6/7, `§5.1` (the allow-list + **the explicit DENIED set**, `C5`), `§1` item 5, `§2.6` item 7 |

**Where the record's §7 corrects a citation, this filing obeys the correction, and it does so WITHOUT
re-opening the substance:**

- **The outcome discriminator's site is `docs/specs/gsession.md` `§2.5` item 10** (`commit(gesture, value)`,
  with **`gesture.outcome`** the `'end'`-vs-`'reset'` discriminator), beside **`§2.3` item 4**
  (`handle.outcome`) and **`§0A` note 5** — **NOT `§0A` note 6**, which rules that `reset` IS a session
  terminal and that its value stays the caller's. **This filing cites `§2.5` item 10 for the
  discriminator everywhere it needs it** (`§2.3` item 4, `§2.5` item 5, `I-3`).
- **The `§2.5` "Nothing else exists" discipline is the PARAGRAPH after item 11, not "item 7"**
  (`gsession.md` `§2.5` carries eleven numbered items; item 7 is `dispose()`). **This filing cites it
  that way and claims no item number for it** (`§2.1` item 5; `C3`).

### 0A. The dated ruling notes — the clauses the record leaves to this filing, RULED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about the twelve
rulings and the five conditions; it is **silent** about several clauses a TestWriter must have before it
can author a falsifiable row. **This filing DECIDES each of those clauses here**, each with its reason and
its landing site. **No note below weakens a ruling, a condition or any item of the must-not list**; the
places where this filing could NOT derive a clause from the record are **reported, not guessed**, at
**`§7a`/`§7a.1`**.

**Note 1 — the module path is `src/shared/gutter.ts`, and the test file is `tests/gutter.test.ts`.**
**No source names either path.** The sibling convention decides it (`src/shared/gesture-session.ts`,
`zones.ts`, `census.ts`, `layout-projection.ts`, `owned-list-host.ts`, `slot-host.ts`) and the unit's own
name (`U-GUTTER`) decides the stem. **Nothing else in this file presumes the path.** The same note names
the test file because **`§5.1`'s diff scope must be a real, checkable allow-list**.

**Note 2 — the module is `src/shared/gutter.ts`, and it imports EXACTLY ONE sibling, TYPE-ONLY: the
landed session module.** Ruling 9's *"no import of any sibling"* binds the **`U-CENSUS` edge** and every
other sibling; the session this unit **composes** is not an import edge of that class — it is the
composition's whole point (`docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`).
**RULED:** the ONLY import statement in this module is a **type-only** import of the session module
(`import type { … } from './gesture-session.js'`), and **`§3.4 R-4` is the row that pins that exact
shape** — an import of any **other** path, a **value** import of the session module, or **any second
import statement**, FAILS. **The module imports no `provident-ssr`, no `electron`, no `node:*`, no
`src/main/**`, no `src/renderer/**`, no shim and no other sibling — and it never imports `zones.ts` or
`census.ts`, not even type-only.**

**Note 3 — THERE IS NO MAGNITUDE CHANNEL, and this filing does not invent one.** Ruling 2 is derived, not
extended: the controller has **no coordinate input, no delta input, no `clientX`/`clientY` read, no
`pointerId` read, no event-object parameter anywhere in its surface** (`§2.1`), and **no `sizes` map of
its own**: a consumer that has a `sizes` value passes it **into its own `boundsFor`/`sizeFor`/
`defaultSizeFor` closures**, which is where the `U-CENSUS` value enters (`census.md` `§1` item 7; `§2.5`
item 2). **The unit ships no drag arithmetic and no magnitude — a NAMED COST, recorded at `§1` item 4.**

**Note 4 — THE SINGLE BOUNDS PAIR: `boundsFor(element, axis)` is the ONE bounds channel.** There is
**no second bounds seam, no optional bounds, no per-axis bounds table and no bounds default** in the
module. The clamp is therefore **one call of a pure function over one caller-supplied pair** (`§2.3`
item 2), and **a `boundsFor` that returns a non-record, an absent pair or an unreadable pair yields
`NaN` and therefore NO sink write** (`§2.3` item 3's write-count clause). **The pair's shape is not
validated by this module: `clampToBounds`'s `typeof` gate IS the validation, and its answer for an
unusable pair is `NaN`, never a refusal** (ruling 12 / `§0A` note 8).

**Note 5 — THE OPAQUE AXIS TOKEN, and the reset entry point's element argument.** `axisFor` returns
**`unknown`**; the controller **carries it and passes it on** (`boundsFor`/`sizeFor`/`defaultSizeFor`
each receive it as their third/second argument). **The controller NEVER interprets the token** — it does
not compare it, stringify it, test it, branch on it or store it in a keyed map (`§2.2` P-5, `§3.4 R-1`).
**The reset entry point takes the ELEMENT — `controller.reset(element)` — and NOT an axis token**: the
token is re-derived from the element by `axisFor` **once, inside the reset path**, exactly as the
establishment path derives it (`§2.5` item 5). **RULED**, because the alternative (a caller-supplied
token at `reset`) would make the token a caller-visible vocabulary and would let a reset name an axis the
establishment never saw.

**Note 6 — `isResizable` is evaluated EXACTLY ONCE PER GESTURE, AT ESTABLISHMENT, and the decision is
CACHED FOR THAT GESTURE ONLY.** The evaluation happens inside the controller's own `onStart` hook (the
establishment seam the session calls, `gsession.md` `§2.3` item 1(d)), **after `axisFor` and only for a
gesture the session ESTABLISHED** (`begin` ⇒ `{ok: true}`). **The result is held in the controller's own
per-gesture record and DISCARDED at the terminal** — no gesture's resizability decision is carried into
the next gesture, and **the seam is never consulted again for that gesture** (not from `onMove`, not from
the sink callback, not from `stats()`). **Truthiness decides; absent ⇒ not resizable; a throw ⇒ not
resizable and SWALLOWED** (ruling 10 + ruling 8's `isResizable` row). **Because the evaluation sits in a
hook the controller owns, the controller's own `try`/`catch` decides the swallow** — so a throwing
`axisFor`/`isResizable` **never reaches the session's establishment failure path** and **never triggers
the session's `onStart`-throw cleanup** (`gsession.md` `§2.3` item 1(d)): the gesture establishes
normally with `undefined` / `false`.

**Note 7 — THE CAPTURE OPT-IN IS ABSENT, AND THE PARKED RELEASE STAYS PARKED.** The controller's factory
options carry **no `capture` member** (`§2.1` item 5's frozen seam set) and **the controller passes no
`capture` field to `session.install`** — the install options it forwards are exactly the four hooks
(`§2.1` item 3). **`"no capture before establishment"` is therefore INHERITED AND OBSERVED, with the
positive control `§3.4 R-10` requires** (a composition that passes `capture: true` must FAIL the row), so
the clause is **not vacuously true**. **AND: the session's parked question — whether a capture taken at an
establishment that then FAILS should be released — STAYS PARKED with its existing trigger**
(`gsession.md` `§2.3` item 6's parked note; `docs/pending.md` §I). **This filing neither releases it nor
re-opens it; a composing unit that needs a release reopens it as a NEW clause with its own gate.**

**Note 8 — `clampToBounds` HAS NO REFUSAL DOMAIN: every input yields a `number`.** `clampToBounds` is
**TOTAL** and **returns a `number` for EVERY input** — including `NaN` — and **never throws, never returns
`undefined`, never returns a record, never returns a string and never refuses.** **There is no `ok`, no
`code`, no `reason`, no `skipped`, no sentinel object and no thrown error anywhere in its contract**; the
`NaN` answer is **a value, not a refusal** (ruling 12). **This is the same discipline
`docs/specs/zones.md` `§2.3` item 4 and `docs/specs/census.md` `§0A` ruling note 8 carry**, and it is the
reason `§3.2`'s pure fail-state rows are **value rows** rather than refusal rows.

**Note 9 — THE SESSION IS A CONSTRUCTION ARGUMENT, AND ITS UNUSABILITY IS THE VALID-STATE DEGRADATION.**
`session` is **the first factory seam**, and a session that is **absent, non-object, or a record whose
seven members are not callable** yields **a VALID BUT INERT controller**: `attach` ⇒ `false`, `reset` ⇒
the declared refusal, `stats()` ⇒ zeroed counters, `detach()` ⇒ `false`, **and NOTHING EVER THROWS at the
consumer boundary** (ruling 8's `session` row, `§2.4` item 1). **The controller's own factory is TOTAL:
`createResizeController` never throws for ANY argument, including a hostile options object, a `Proxy`, a
primitive or `undefined`.**

**Note 10 — THE CONTROLLER EXPOSES ITS OWN COUNTS, AS AN ORDINARY MODULE SURFACE, AND THEY ARE NOT
MCP-VISIBLE.** `"one commit per gesture"` and `"cancel ⇒ zero sink writes"` are **only falsifiable if the
sink calls are countable**, and `"a two-writer composition must FAIL a row"` is **only falsifiable if the
composition can be driven from two writers and the counts compared**. **RULED:** the controller carries
**`stats()`**, returning its own `ResizeStats` (the seam-set item 8 of `§2.1`), and **it is a module
method exactly as `gsession.md` `§0A` note 12 rules `stats()`/`gesture()` to be** — **no IPC method, no
MCP tool, no `RpcCommand`, no `list_targets` handle, no store.** **A later pass that wired these counters
to an agent-reachable surface would be adding an MCP surface and would need its own gate.**

**Note 11 — THE GEOMETRY CLAUSE, DISCHARGED AS THIS UNIT'S OWN.** **`A-d4`'s mandatory clause is carried
verbatim in substance: *the contract and its call counts are provable here; ANY rendered-geometry claim is
UNPROVABLE in this repo today.*** The discharge is **three-part** and lives at `§5.2`: **the refusal**
(no `[U]` row is offered) · **the structural reason** (the module is imported by no `src/**` file, and it
reads no coordinate) · **`docs/specs/zones.md` `§4.4 S-6`'s *"may not be moved to the `ui` leg
silently"***. **No `§3` row makes a claim of the forbidden kind, so no `§3` row is weakened by the
absence of a `[U]` row** (`I-11`, `R-8`).

**Note 12 — THIS UNIT'S WARRANT, STATED SO NO LATER PASS OVER-READS IT.** **`A-d4` OVERRIDES the
`ARITHMETIC-OVER-INJECTED-VALUES` admission objection; it does not answer it.** The unit's warrant is
**the architect's ruling plus this spec's clause rows** — **the twelve rulings derived above, the
thirteen-row register, and the red/green legs.** **No DONE row, no greens artifact and no later pass may
describe this unit as having argued or answered the mechanism-vs-UI-element classification**
(`docs/decisions.md` `GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS`; the record's §3 counter-case).

**No item of `§7a` is decided here.** `§7a`/`§7a.1` report the clauses this filing could **not** derive
from the record, each with a working default, a recommendation and the clause it blocks.

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no Electron
window booted, no `tsc` invocation was made, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/gutter.ts` module, and the landed session it composes | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned) | **the EXTENDED harness (`U-DIVERGENCE-EXT`, row `C2`) does not exist**; **this spec claims no `[D]` row** (`§5.2`) |

**Five honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this
   repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No window
   is booted, no IPC round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a
   document**: the **element is an argument**, the **session is an argument** (or a recording double),
   and the **sink is an argument**. **A `[T]` green here proves CONTRACT CALL COUNTS ONLY** — the counts
   ruling 2's sentence names as the provable half.
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no
   `globalThis`-rooted lookup, no `matchMedia`, no `getComputedStyle`, no `getBoundingClientRect`, no
   `activeElement`, no layout member, no `Date`, no `Math.random`, no `process.env`. **Every environment
   reading is a caller-supplied argument or a caller-supplied callback.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its
   rows are authored in **this unit's own test file** and executed by the **same node suite**
   (`npm test`, `§5.2` leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and
   **no register row may be read as `[H]`, `[U]`, `[D]` or assembled-app evidence.**
5. **A sink-call green is NOT a write-observed-in-a-renderer green.** Every counted write is a **call the
   controller made into an argument-supplied function** — **never a fact about a pane's width, a CSS
   custom property's applied value, a layout pass or a rendered geometry.**

---

## 1. Scope

**One deliverable: one `src/shared` module — a PURE TOTAL `clampToBounds` plus a resize CONTROLLER
COMPOSED ON the landed node-local session**, with **all values injected**, **one commit per gesture**,
**`cancel` ⇒ zero commits and zero sink writes**, **`reset` ⇒ at most one commit of the CLAMPED supplied
default**, and **no capture before establishment (inherited and OBSERVED)**.

1. **What the unit is, in one sentence.** A **node-local, policy-free-by-construction resize
   controller**: it **composes** the landed session (`U-GSESSION`, `E6`, `DONE`), **forwards the
   consumer's four hooks** into the session's own install/establishment path, **captures the gesture
   handle in its own `onStart`**, **evaluates `isResizable` once per gesture at establishment**,
   **derives the gesture's value at the terminal** by calling the consumer's own
   `sizeFor(element, gesture, axis)` **at most once**, **clamps it through its exported pure
   `clampToBounds` over the consumer's own `boundsFor(element, axis)` pair**, and **writes it to the
   consumer's one sink at most once per gesture** — plus **`reset(element)`**, which commits the
   **clamped** consumer-supplied default through the session's own `reset` terminal.
2. **What the unit is NOT — NO MAGNITUDE CHANNEL, and that is a NAMED COST.** **The unit ships NO drag
   arithmetic, NO coordinate read and NO magnitude.** The controller **never sees an event object**, has
   **no `clientX`/`clientY`/`deltaX`/`pageY` input**, and **cannot compute a distance** (ruling 7 /
   `§0A` note 3). **What a local handler purchases is origin REACHABILITY, not magnitude-equivalence**
   (`gsession.md` `§2.3` item 5/7, `I-11`), and **NO pass may claim agent-drivable drags, and no pass may
   claim this unit's committed value is magnitude-equivalent to `provident.op`'s `state-slice`.**
   **The value is CONSUMER-PRODUCED**: the consumer computes it in its own `onMove` and hands it back
   with `gesture.set(value)`.
3. **What the unit is NOT — no policy of its own.** **No default bound, no default size, no axis
   vocabulary, no threshold, no unit string, no token, no store, no census read and no second writer.**
   Every one of those is the **consumer's** and arrives **as an injected seam or an injected argument**
   (`§2.2`). **The only arithmetic the module performs is `clampToBounds`'s one formula**, and **the only
   write it performs is one call to the one sink it was handed.**
4. **What the unit is NOT — no geometry, and no second gesture authority.** It makes **no geometry
   observation call of any kind** (`§3.4 R-8`) and **re-expresses none of the session's lifecycle**: it
   **never attaches a listener**, **never calls `session.begin`**, and **never becomes a second writer on
   the same channel** (ruling 3; `§2.5`). **The session remains the single gesture authority** — the
   remedy validity finding `V-13` names (`gsession.md` `§2.6` item 6).
5. **What the unit is NOT — no UI.** **The REAL gutter UI — a provident-rendered drag affordance, the
   ONLY place a coordinate source or a `[U]` row could legitimately live — is a NAMED FUTURE UNIT OUTSIDE
   `E3`, filed as ledger row `E10`, and `E3` does NOT owe it** (ruling 12; `docs/next-steps.md`'s `## OPEN`
   row `E10`, whose own clause reads **`PROPOSED — awaiting admission`**, the architect's). This unit
   authors **no element, no text, no class, no attribute, no stylesheet and no control** — **it authors no
   UI content at all**, and `§3.4 R-11` is the row that can FAIL for a write.
6. **What is EXPLICITLY OUT of scope (do not do in this unit).** No gutter UI (`E10`, `PROPOSED`); no
   import of `U-CENSUS`'s module and **no census read of any kind** (the `sizes` value enters only as an
   argument to the CONSUMER's own injected callbacks — `census.md` `§1` item 7); no session code (the
   session is `DONE` and **its module and test file are FROZEN**); no store, no persistence, no journal,
   no cache, no module-level mutable state; no CSS and no stylesheet; no new MCP surface, no IPC method,
   no `RpcCommand` member, no tool and no resource; no divergence-harness work and **no `[D]` row**; no
   `docs/skills/designing-pages.md` update. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed
   `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
   matrix, no demo-page index and no page-design layer to update** — and **this unit renders no page**
   (`§3.5 R-9` is the probe that keeps that claim falsifiable).
7. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec +
   its `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new
   `src/shared/` module and touches **no existing file** except this spec and the trackers (`§5.1`).
8. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY.** **The unit ships no feature and has NO
   IN-TREE CONSUMER**: `src/shared/gutter.ts` will be **imported by no `src/**` file** and will appear in
   **none of the five esbuild bundles**. **Its value is the contract itself** — a resize controller any
   consumer can wire to its own bounds, default, resizability and sink — **and its green is
   envelope/pure-layer evidence that the contract holds FOR A CALLER, never that the app behaves
   differently.** **The honest cost**: this spec + a **thirteen-row** register + red/green **with
   remands** + the adversarial pass + blind greens + the per-unit documentation review + a DONE row +
   per-gate commits (`RCA-8(f)`).

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/gutter.ts`** (`§0A` note 1). **It imports EXACTLY ONE sibling, TYPE-ONLY — the
session module (`§0A` note 2) — and `§3.4 R-4` is the row that pins that shape.**

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: TWELVE exported names, in TWO
HALVES — TWO value exports and TEN type declarations.** **The two halves are counted separately on
purpose**, because sibling reviews have caught a census cell contradicting the block beside it, and
because **a type declaration is erased at runtime** — so a single *"12 exports"* claim would be
**half-unfalsifiable**. **This block declares exactly `2 + 10 = 12` exported names and nothing else**:

**(a) THE TWO RUNTIME VALUE EXPORTS — exactly `createResizeController` and `clampToBounds`**
(`§3.4 R-5`(a) reads the imported namespace's own keys, **BY NAME**, with a positive control that a
namespace carrying a **third** value export FAILS).

**(b) THE TEN TYPE DECLARATIONS — exactly `AxisFor`, `BoundsFor`, `ClampBounds`, `CommitSink`,
`DefaultSizeFor`, `IsResizable`, `ResizeController`, `ResizeControllerHandle`, `ResizeControllerOptions`
and `ResizeStats`** (`§3.4 R-5`(b): a type-only name is **erased at run time**, so the type half is a
**PRESENCE** claim pinned by **`§5.2` leg 4's standalone strict `tsc`** — the same form
`gsession.md` `§3.4 R-6`(b) was re-stated to; the SET-EXACTNESS of the **type** half is a **DOC** claim
owned by this census, not a runtime row claim).

**A row asserting only a COUNT without NAMING the names FAILS `R-5`'s own text** (`§4.4 S-7`).

**1. `clampToBounds` — THE PURE TOTAL FUNCTION (ruling 12; `§0A` note 8).**

```ts
/** THE CLAMP — PURE and TOTAL, with NO REFUSAL DOMAIN (§0A note 8).
 *
 *  `bounds` is read through a `typeof` GATE: when EITHER bound is not a `number`
 *  — absent, `undefined`, a primitive, a non-record, a record whose bound field is
 *  unreadable OR THROWS — the answer is `NaN`. When BOTH bounds are numbers the
 *  answer is the FORMULA VERBATIM:
 *
 *      Math.max(min, Math.min(value, max))
 *
 *  TOTAL: it returns a `number` for EVERY input, throws for NONE, and never returns
 *  `undefined`, a record, a string, a boolean or a sentinel. There is no `ok`, no
 *  `code`, no `reason` and no `skipped` in this contract: `NaN` is a VALUE, not a
 *  refusal (§2.3 item 2). It MUTATES NOTHING, RETAINS NOTHING and READS NOTHING but
 *  its two arguments (§3.3 I-12).
 *
 *  `-0` is PRESERVED when it is the formula's answer (`Object.is`, §2.3 item 2). */
export function clampToBounds(value: unknown, bounds: unknown): number

/** THE CALLER'S BOUNDS PAIR — TWO numbers, both CARRIER-SUPPLIED, never defaulted.
 *  This module owns NO bound, NO default pair and NO per-axis table (§0A note 4).
 *  `min > max` is NOT validated: the formula's answer for an inverted pair is `min`
 *  (§2.3 item 2), and no refusal exists for it. */
export interface ClampBounds {
  readonly min: number
  readonly max: number
}
```

**2. THE SEVEN INJECTED SEAMS — the factory's options, with their exact signatures.** **These are ruling
8's seven seams and ruling 3's token, and `§2.1` item 5 FREEZES the set.**

```ts
/** SEAM 1 — THE OPAQUE AXIS TOKEN (ruling 8 / `§0A` note 5). Called AT MOST ONCE per
 *  gesture, at ESTABLISHMENT. The return value is an OPAQUE TOKEN: this module carries
 *  it and passes it on, and NEVER interprets it — it is not compared, stringified,
 *  tested or stored in a keyed map, and NO axis vocabulary appears in this module's
 *  bytes (§2.2 P-5, §3.4 R-1). ABSENT / non-callable / THROWING ⇒ the token is
 *  `undefined` (the seam's NAMED SAFE DEFAULT), swallowed by the controller's own
 *  try/catch so no session establishment path is disturbed (§0A note 6). */
export type AxisFor = (element: unknown) => unknown

/** SEAM 2 — THE ONE BOUNDS CHANNEL (§0A note 4). Called AT MOST ONCE per gesture that
 *  reaches a terminal with a value to clamp. Its return is handed to `clampToBounds`
 *  UNEXAMINED — the `typeof` gate inside the clamp is the only validation there is.
 *  ABSENT / non-callable / THROWING ⇒ the clamp answers `NaN` ⇒ NO SINK WRITE
 *  (ruling 8's row). A THROW PROPAGATES to the caller of the terminal (§2.4 item 3);
 *  it is swallowed by NOBODY. */
export type BoundsFor = (element: unknown, axis: unknown) => unknown

/** SEAM 3 — THE RESET DEFAULT'S SOURCE (ruling 9). Called ONLY from `reset(element)`,
 *  AT MOST ONCE per reset, and ONLY when this composition established a gesture and
 *  `isResizable` was TRUE for it. Its value is CLAMPED before it is committed (§2.3
 *  item 4): `clampToBounds(defaultSizeFor(element, axis), boundsFor(element, axis))`.
 *  ABSENT / non-callable / THROWING ⇒ the default is UNUSABLE ⇒ the reset REFUSES with
 *  `code: 'unusable-default'` and ZERO session calls (ruling 9). A non-number return is
 *  NOT refused: it clamps like any other value and the answer is `NaN`. */
export type DefaultSizeFor = (element: unknown, axis: unknown) => unknown

/** SEAM 4 — THE VALUE SOURCE (ruling 7). Called AT MOST ONCE per gesture, AT THE
 *  TERMINAL, with `(element, gesture, axis)` — the EXACT handle the session gave this
 *  controller, so `gesture.value` is the consumer's own last `gesture.set(...)` value
 *  and `gesture.outcome` is the terminal's own word. Its return is the `raw` value the
 *  clamp receives. ABSENT / non-callable ⇒ `undefined` ⇒ the clamp answers `NaN` ⇒
 *  `sinkCalls === 0` AND IT IS NOT A CANCEL (ruling 8's row). A THROW PROPAGATES to the
 *  caller of the terminal (§2.4 item 3). */
export type SizeFor = (element: unknown, gesture: GestureHandle, axis: unknown) => unknown

/** SEAM 5 — THE RESIZABILITY DECISION (ruling 10). Called AT MOST ONCE per gesture, at
 *  ESTABLISHMENT, and its TRUTHINESS decides. It is NEVER an install-time gate: a
 *  control always attaches, and the decision belongs to the gesture. ABSENT /
 *  non-callable / THROWING ⇒ NOT RESIZABLE; `false` ⇒ the gesture ESTABLISHES and
 *  TERMINATES NORMALLY with ZERO sink writes, and its outcome (`'end'`) still
 *  DISTINGUISHES IT FROM A CANCEL. */
export type IsResizable = (element: unknown, axis: unknown) => unknown

/** SEAM 6 — THE ONE SINK (ruling 6). This is the composition's single sink writer: the
 *  controller invokes it AT MOST ONCE per gesture, ONLY at the terminal of a gesture
 *  that reached one with a CLAMPED NUMBER, and NEVER from `onMove`/`onStart`/`onEnd`/
 *  `onCancel`. It receives the session's own gesture handle for the terminal
 *  (`gesture.outcome` is `'end'` or `'reset'`) and the clamped `number`. ITS THROW IS
 *  SWALLOWED by the session's own commit seam (ruling 8's `commit` row): the session
 *  never re-throws it, and THE WRITE ATTEMPT IS ALREADY COUNTED and NEVER RETRIED —
 *  `ResizeStats.sinkCalls` reads `1` and `ResizeStats.written` stays `0` for that
 *  gesture. */
export type CommitSink = (gesture: GestureHandle, value: number) => void
```

**3. THE CONTROLLER'S FACTORY, ITS OPTIONS AND ITS RETURN — the EXACT SEVEN-MEMBER SEAM SET.**

```ts
/** THE COMPOSITION'S OPTIONS — EXACTLY SEVEN MEMBERS, IN THIS ORDER, no eighth and no
 *  policy default (§2.1 item 5; `C3`). `capture` is ABSENT BY RULING (ruling 11): this
 *  composition never opts in, so "no capture before establishment" is INHERITED AND
 *  OBSERVED rather than vacuously true (§3.4 R-10). */
export interface ResizeControllerOptions {
  /** SEAM 7 — THE SESSION THIS CONTROLLER IS COMPOSED ON (ruling 9's boundary).
   *  ABSENT / non-object / a record whose members are not callable ⇒ a VALID but INERT
   *  controller: `attach` ⇒ `false`, the declared refusals, zeroed stats, and never a
   *  throw (§0A note 9). This module READS the session only through `stats()`,
   *  `gesture()` and `disposed`, and CALLS only `install`, `reset` and `dispose` on it
   *  (§2.5 item 1). */
  readonly session?: unknown
  readonly axisFor?: AxisFor
  readonly boundsFor?: BoundsFor
  readonly defaultSizeFor?: DefaultSizeFor
  readonly isResizable?: IsResizable
  readonly sizeFor?: SizeFor
  readonly commit?: CommitSink
}

/** THE PER-CONTROL HOOKS a consumer passes to `attach` — ALL FOUR OPTIONAL, and FORWARDED
 *  UNCHANGED into the session's own `install(element, …)` call. The controller adds
 *  NOTHING to them: no fifth hook, no wrapping policy, no value computation.
 *  `onMove` is where the CONSUMER COMPUTES ITS OWN VALUE and hands it back with
 *  `gesture.set(value)` (ruling 7) — and it is the session that calls this hook for
 *  every real `pointermove` of the active gesture. */
export interface ResizeControllerHandle {
  readonly element: unknown
  readonly onStart?: (element: unknown) => void
  readonly onMove?: (gesture: GestureHandle) => void
  readonly onEnd?: (element: unknown, value: unknown) => void
  readonly onCancel?: (element: unknown) => void
}

/** THE CONTROLLER — FIVE MEMBERS, and this is the WHOLE surface (`§2.1` item 4).
 *  Every member is TOTAL: none throws for ANY argument, whatever the session or the
 *  seams do (§2.4 item 1). */
export interface ResizeController {
  /** Attach ONE control: forwards the four hooks into `session.install(element, …)`
   *  and records the element in the controller's OWN ledger, BY IDENTITY. Returns
   *  `true` iff THIS call delegated and the session installed. Returns `false` —
   *  delegating NOTHING — when: the element is already attached here (a repeat attach
   *  is a NO-OP, first-config-wins, `false`); the element is `null`/`undefined`; the
   *  session is unusable or disposed; or the session's own `install` returned `false`.
   *  TOTAL: never throws. THE CONTROLLER ATTACHES NO LISTENER OF ITS OWN (ruling 3). */
  attach(element: unknown, hooks?: ResizeControllerHandle): boolean
  /** Detach THIS controller's own baseline: `session.dispose()` exactly once, then the
   *  controller's ledger is dropped. Returns `true` iff the session reported a detach
   *  with `complete === true`. Returns `false` WITHOUT a session call when: the
   *  controller holds NO attached element; the session is unusable; the session is
   *  already disposed; or **MORE THAN ONE element is attached here** — because the
   *  session is shared, and detaching it on behalf of one control would detach every
   *  other control's listeners (`§7a.1` item 2). IDEMPOTENT: a repeat call makes no
   *  session call. TOTAL: never throws. */
  detach(): boolean
  /** RESET — the entry point ruling 9 gives this controller (`§2.5` item 5). Commits
   *  `clampToBounds(defaultSizeFor(element, axis), boundsFor(element, axis))` AT MOST
   *  ONCE, through the session's own `reset` terminal, for an ACTIVE gesture.
   *  Refusals are returned, NEVER thrown. TOTAL: never throws. */
  reset(element: unknown): ResizeResetResult
  /** The controller's own counters (`§0A` note 10). NOT MCP-visible. NEVER throws. */
  stats(): ResizeStats
  /** `true` FOREVER once `detach()` has completed, or once the session reads
   *  `disposed === true`. */
  readonly detached: boolean
}

/** THE RESET RESULT — a discriminated record, and the code domain is the session's own
 *  SEVEN-MEMBER union PLUS this controller's one entry-point code (see the note below
 *  the block). `committed === true` IFF a sink write occurred for this reset call, which
 *  is what the composition's own counts say — never a session-side guess. */
export interface ResizeResetResult {
  readonly ok: boolean
  readonly code: ResizeCode
  readonly committed: boolean
}

/** THE CONTROLLER'S OWN COUNTERS (`§0A` note 10). All monotonic except `lastCode`. */
export interface ResizeStats {
  /** Elements attached by THIS controller, by identity. */
  readonly attached: number
  /** Gestures THIS controller established (i.e. its `onStart` ran for a session
   *  `{ok:true}` establishment). NEVER counts a refused establishment. */
  readonly gestures: number
  /** SINK CALLS ATTEMPTED — every invocation of the injected `commit`, INCLUDING one
   *  that threw. This is the counter the write-count clause asserts over. */
  readonly sinkCalls: number
  /** SINK CALLS THAT RETURNED without throwing. `sinkCalls - written` is therefore the
   *  count of swallowed sink throws (ruling 8's `commit` row). */
  readonly written: number
  /** `reset(element)` calls that reached the session's `reset` terminal. */
  readonly resets: number
  /** The LAST result code this controller produced (`'ok'` before anything happened). */
  readonly lastCode: ResizeCode
}

/** THE CONTROLLER'S CODE DOMAIN — the session's SEVEN members, VERBATIM, plus the TWO
 *  controller-local codes this controller emits for its OWN refusals (see the note below
 *  the block). NO member is added to the session's union, and NO code of this
 *  controller's is ever passed INTO the session.
 *
 *  ⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS): the as-filed union carried ONE
 *  controller-local code (`'unusable-default'`); the ruling declares a SECOND,
 *  `'not-resizable'`, for the established-but-non-resizable reset path — the two are the
 *  COMPLETE controller-local set, and the session's seven-member domain is untouched. */
export type ResizeCode =
  | 'ok'
  | 'not-installed'
  | 'busy'
  | 'disposed'
  | 'disconnected'
  | 'stale'
  | 'no-gesture'
  | 'unusable-default'
  | 'not-resizable'

/** THE FACTORY. TOTAL: NEVER THROWS, for ANY argument — including a hostile options
 *  object, a `Proxy`, a primitive or `undefined`. An unusable session yields a usable,
 *  inert controller (§0A note 9). */
export function createResizeController(options?: ResizeControllerOptions): ResizeController
```

**THE TWO ADDED CODES, STATED SO NEITHER CAN BE READ AS AN EIGHTH SESSION MEMBER.**
**`'unusable-default'` is THIS CONTROLLER's own refusal for its OWN entry point** — the `reset(element)`
call whose `defaultSizeFor` seam is **absent, non-callable or throwing**, where **no session call may be
made at all** (ruling 9). **`'not-resizable'` is the SECOND controller-local code, and the RED-RUN
AMENDMENT PASS (2026-09-27) declares it: the `reset(element)` call for an ESTABLISHED gesture whose
`isResizable` decision was FALSY — a refusal the SESSION never sees, because no session call is made on
that path either** (ruling 10; `§2.3` item 4 clause 2). **BOTH are NEVER passed into the session**
(`session.reset` is not called on either path), **the session's own seven-member union is UNCHANGED and
no eighth member is added to it** (`gsession.md` `§4.4 S-9`; the record's must-not list), and **every
code the session RETURNS propagates through this controller VERBATIM** — `'no-gesture'` for a reset with
no active gesture, `'disposed'`, `'stale'`, `'not-installed'`, `'busy'`, `'disconnected'`, `'ok'`. **The
seven session codes are read from the session's own results, never re-invented here**;
**`'unusable-default'` and `'not-resizable'` are the COMPLETE controller-local set**, and each is
reported as such at `§7a.1` item 1. **THE SESSION's SEVEN-MEMBER DOMAIN IS UNTOUCHED — and no code of
this controller's ever enters it.** **The complete `reset` result-code table — which codes come from the
session verbatim and which two are controller-local — is stated at `§2.3` item 4 (item 4's own
sub-table), and its `§2.5` cross-reference is item 5's clause 4.**

**THE FROZEN SEAM SET — `C3`, and it is a SET claim, never a count.** **The factory's `options` object
carries EXACTLY SEVEN members, NAMED and ORDERED, and nothing else:**

| # | Seam | Signature | Its NAMED SAFE DEFAULT (ruling 8) |
| --- | --- | --- | --- |
| **1** | `session` | `unknown` (read as the session's own seven members) | **a VALID but INERT controller**: `attach` ⇒ `false`, the declared refusals, zeroed stats, never a throw |
| **2** | `axisFor` | `(element: unknown) => unknown` | **the token is `undefined`**, passed on OPAQUELY |
| **3** | `boundsFor` | `(element: unknown, axis: unknown) => unknown` | **unusable ⇒ `NaN`-clamped ⇒ NO SINK WRITE** |
| **4** | `defaultSizeFor` | `(element: unknown, axis: unknown) => unknown` | **`undefined` ⇒ the reset REFUSES with ZERO session calls** |
| **5** | `isResizable` | `(element: unknown, axis: unknown) => unknown` | **NOT RESIZABLE** — the gesture establishes and terminates with zero writes |
| **6** | `sizeFor` | `(element: unknown, gesture: GestureHandle, axis: unknown) => unknown` | **`undefined` ⇒ `sinkCalls === 0` — AND IT IS NOT A CANCEL** |
| **7** | `commit` | `(gesture: GestureHandle, value: number) => void` | **the write is SWALLOWED by the session's commit seam — ALREADY COUNTED, never retried** |

**FOUR SET CLAIMS pin this table, and each can FAIL:** **(i)** the seven members above are the ONLY
members — **an EIGHTH member FAILS** (a positive control: an options object carrying one more seam must
be rejected by the row, not accepted); **(ii)** **`capture` is ABSENT** from `ResizeControllerOptions`
AND from the object this module passes to `session.install` (ruling 11; `§3.4 R-10`); **(iii)** **NO
POLICY DEFAULT EXISTS ANYWHERE** — no default size, no default bounds, no axis token literal, no unit
string, no threshold, no `selectors` vocabulary (`§3.4 R-1`); **(iv)** **THE CALL MULTIPLICITY IS RULED**:
`axisFor` and `isResizable` **at most once per gesture, at establishment**; `boundsFor` and `sizeFor`
**at most once per gesture, at the terminal**; `defaultSizeFor` **at most once per reset**; **`commit`
at most once per gesture**; **`session` read, never called, except through `§2.5`'s list.**

**4. THE CONTROLLER'S MEMBERS, AND WHAT `"whatever else the rulings imply"` RESOLVES TO.** **The
controller carries EXACTLY FIVE members — `attach`, `detach`, `reset`, `stats` and the readonly
`detached` — and NO SIXTH.** The rulings imply these five and nothing more: `attach`/`detach` are the
composition of the session's own install/baseline-restore (ruling 3's *"re-express none"*), `reset` is
the entry point ruling 9 gives **this** controller, `stats()` is `§0A` note 10's count seam, and
`detached` is the read-only state reading ruling 14 grants (`gsession.md` `§2.5` item 8's shape). **There
is NO `begin`, NO `end`, NO `cancel`, NO `gesture()`, NO `install`, NO `dispose`, NO `commit` method, NO
`sink`, NO `on`, NO `set`, NO `value` getter and NO `[Symbol.iterator]` on this controller** — **each
would be a second expression of a lifecycle the session owns** (`§2.5` item 6; `§4.4 S-8`).
**`stats()`'s shape is named and frozen by `ResizeStats` above** — its six fields are the falsifiable
observables the write-count clause and the register read (`§2.3` item 3, `§5.5.1 P-GT-SM-3`).

**5. `session.install`'s options, as THIS module passes them: exactly the four hooks — no `capture`.**
The object this module hands the session is `{onStart, onMove, onEnd, onCancel}` **and nothing else**.
**The controller's own `onStart` is a WRAPPER the controller supplies** (it calls the consumer's
`onStart` if one was given, then evaluates `axisFor`/`isResizable` in its own `try`/`catch`); **the
consumer's `onMove`, `onEnd` and `onCancel` are forwarded BY REFERENCE, unwrapped**, so the session's own
call semantics (`gsession.md` `§2.3` item 2, `§0A` note 11) are exactly the consumer's. **`capture` is
ABSENT — not `false`, ABSENT** — which is ruling 11's *"the composition never opts in"* read at the byte
level.

---

### 2.2 What is CALLER-SUPPLIED, and the prohibitions — **every prohibition cites an ENUMERATED static row**

**Caller-supplied (never built in, never defaulted, never enumerated):** the **session**; the **control
element**; the **sink**; **all five policy seams** (`axisFor`, `boundsFor`, `defaultSizeFor`,
`isResizable`, `sizeFor`); the **four hooks**; **every value** (the consumer computes it in `onMove`);
**every bound**; **every default**; and **any `sizes`-style value a consumer holds** (which enters only
as an argument to the consumer's OWN closures — `§2.5` item 2). **The module contains NO application
string, NO zone/pane/tab/axis/selector/threshold vocabulary, NO unit string, NO `data-*` name, NO default
size, NO default bound, NO census read and NO policy predicate.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No coordinate, no event, no magnitude** (ruling 7; the named cost) | **No member of this module's surface takes an event object, and no coordinate/event field is read**: no `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/`screenY`/`offsetX`/`offsetY`/`movementX`/`movementY`, no `pointerId`, no `button`/`buttons`, no `deltaX` — **and no parameter exists through which one could arrive** | **`R-8`**, **`R-1`**, `§2.3` item 1, `I-11` |
| **P-2** | **No DOM access and no element lookup** (`A-d3`: *never a global element lookup*) | **No `document`/`window`/`globalThis`-rooted access, no `closest`/`querySelector*`/`getElementById` token in ANY form**; **the element is an argument, handed to the session unchanged** (`gsession.md` `§0A` note 2) | **`R-2`**, `§2.5` item 1, `I-6` |
| **P-3** | **No listener, and no capture, of the controller's own** (rulings 3/11) | **The controller attaches NO listener**: every attach goes through `session.install`, which is the session's own single `pointerdown` attach (`gsession.md` `§2.3` item 1); **the module contains no `addEventListener`/`removeEventListener`/`setPointerCapture`/`releasePointerCapture` token and no `capturePointer` call of its own** | **`R-3`**, **`R-10`**, `I-7`, `§5.5.1 P-GT-SM-2` |
| **P-4** | **No session-lifecycle re-expression** (ruling 3 — the `SECOND-GESTURE-AUTHORITY` objection's answer) | **The controller never calls `session.begin`, `session.end` or `session.cancel`; it owns no gesture state machine, no "one gesture at a time" guard, no listener window, no disposal order and no counter of the session's gestures** — it **forwards hooks** and **reads only `stats()`/`gesture()`/`disposed`** | **`R-7`**, `§2.5` item 1, `§3.4 R-14`, `I-8` |
| **P-5** | **No axis vocabulary, no unit string, no token literal, no threshold, no selector** (ruling 8; the `U-CENSUS` `P-1` vocabulary discipline) | **The only strings this module owns are its own result codes and the four hook names it forwards**; **the axis token is never interpreted and never appears as a literal**; **no unit string, no `'px'`, no `'0px'`, no `calc(`, no `threshold`, no `selectors`** | **`R-1`**, `§2.3` item 2, `§0A` note 5 |
| **P-6** | **No store, no persistence, no cache, no module-level state** | **No file, no `localStorage`, no store object, no memo, no `Map`/`WeakMap` cache keyed by element, no module-level mutable state.** The instance keeps **its own attached-element ledger** and **at most ONE per-gesture record** (the handle, the token, the resizability decision), **DISCARDED at every terminal**; only the counters persist for the instance's lifetime (`§2.3` item 5) | **`R-2`**, **`R-6`**, `I-9`, `§5.5.1 P-GT-SM-2` |
| **P-7** | **No capture opt-in** (ruling 11) | **There is NO `capture` member on `ResizeControllerOptions`, and the object this module passes to `session.install` carries no `capture` field**: *"no capture before establishment"* is **INHERITED and OBSERVED**, with `R-10`'s positive control | **`R-10`**, `§2.1` items 3/5, `I-7` |
| **P-8** | **No drag arithmetic and no magnitude** (ruling 7) | **The module's only arithmetic is `clampToBounds`'s one formula**; it **computes no delta, no ratio, no percentage, no scale and no distance**, and **no row may claim a magnitude** | **`R-8`**, **`R-1`**, `I-11`, `§7` item 2 |
| **P-9** | **No sibling import — not even type-only — other than the session this unit composes** (ruling 14) | **Exactly one import statement exists, type-only, from the session module** (`§0A` note 2); **`zones.ts`/`census.ts` are NEVER imported — a later pass asserting an edge in either direction would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class; `census.md` `§1` item 7) | **`R-4`**, `§2.5` item 2, `§8` (the dissolved-edge row) |
| **P-10** | **No census read of any kind** (ruling 14) | **The module contains no census token, no track-variable name, no `zones`/`revealed`/`specOf`/`sizes` parameter**: a consumer's `sizes` value reaches this unit's seams **only inside the consumer's own closures**, as an argument to **its own** injected callbacks | **`R-1`**, **`R-4`**, `§2.5` item 2, `§8` |
| **P-11** | **No second writer** (ruling 6) | **One sink, one call site, at most once per gesture** — and **two positive controls that make the claim falsifiable**: a two-writer composition FAILS (`F-9`) and a no-writer composition FAILS (`F-10`) | **`R-13`**, `§2.3` item 3, `§5.5.1 P-GT-SM-3`, `I-2`/`I-2b` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-15`): **a prohibition
citing *"a static source row"* with no id is not a row**, and **every prohibition above names at least
one id that exists in `§3.4`.**

---

### 2.3 The arithmetic and value rules — stated falsifiably

**Item 1 — THE VALUE-SOURCE CHAIN, and there is exactly ONE path through it.**

```
the consumer's own onMove  ──▶  gesture.set(value)          (consumer code; the value is CONSUMER-PRODUCED)
        … the session's terminal …                                  (end / reset / cancel)
the controller's own onStart captured THE HANDLE                (never synthesised, never retained past the terminal)
        at the terminal (inside the composition's sink callback, which the session invokes):
   gesture.outcome === 'reset'  ──▶  raw = clampToBounds(defaultSizeFor(element, axis), boundsFor(element, axis))
   gesture.outcome === 'end'    ──▶  raw = sizeFor(element, gesture, axis)
                                     clamped = clampToBounds(raw, boundsFor(element, axis))
                                     clamped is a number  ──▶  ONE sink write: commit(gesture, clamped)
                                     clamped is NaN       ──▶  NO sink write
   a cancel terminal            ──▶  the sink callback is NEVER INVOKED  ⇒  ZERO writes
```

**Three clauses make the chain falsifiable, and each is a row:** **(i)** **the value is read AT MOST
ONCE, at the terminal** — never from `onMove`, never from a start turn, never from `stats()`; **(ii)**
**the sink is invoked from EXACTLY ONE call site**, which is the composition's single `commit` callback
that the session owns; **(iii)** **the clamp happens at EXACTLY ONE site** — `§4.4 S-PURE-4` forbids a
second clamp anywhere in the module, including a "pre-normalising" one inside a seam wrapper.

**Item 2 — THE EVALUATION ORDER, with each seam's multiplicity, RULED.**

| Order | When | What is called | Multiplicity RULED |
| --- | --- | --- | --- |
| **(a)** | `attach(element, hooks?)` | `session.install(element, {onStart, onMove, onEnd, onCancel})` — **`capture` ABSENT** | **once per distinct element**; a repeat attach delegates NOTHING (first-config-wins) |
| **(b)** | the session ESTABLISHES a gesture and calls the controller's own `onStart(element)` | **`axisFor(element)` FIRST**, then — only if a gesture was established — **`isResizable(element, axis)`** | **`axisFor` once per ESTABLISHED gesture; `isResizable` once per ESTABLISHED gesture**; neither is ever re-consulted for that gesture |
| **(c)** | the session's terminal invokes the composition's `commit(gesture, value)` | **`boundsFor(element, axis)` AT MOST ONCE**; and **`sizeFor(element, gesture, axis)` for an `'end'`, or `defaultSizeFor(element, axis)` for a `'reset'` — AT MOST ONCE each** | **at most once per gesture**, and **`defaultSizeFor` at most once per reset** |
| **(d)** | inside the same callback | **`clampToBounds` EXACTLY ONCE**, over the pair (c) returned | **one clamp, one site** |
| **(e)** | the same callback, if the clamped value is a number | **`commit(gesture, clamped)` EXACTLY ONCE** | **at most once per gesture** |

**The ORDER is falsifiable in both directions:** **`axisFor` before `isResizable`** (the token is
`isResizable`'s second argument, so a row asserting the argument's identity proves the order);
**`isResizable` before any terminal evaluation** (a `false` decision means `sizeFor`/`boundsFor`/
`defaultSizeFor` are **never called for that gesture**); **the clamp after the seams and before the
sink**; and **the sink never invoked on the cancel path** — **which needs no guard, because the session
invokes the commit channel ZERO times there** (`gsession.md` `§2.3` item 4).

**Item 3 — THE WRITE-COUNT CLAUSE (`C1`), with BOTH positive controls and the slot-empty sentence.**

> **For EVERY gesture, `sinkCalls ∈ {0, 1}`. It is `1` IFF (i) the gesture REACHED its terminal through
> the session's `end` terminal, (ii) `isResizable` was TRUE for that gesture, (iii) `sizeFor` returned a
> value and `boundsFor` returned a usable pair such that the clamp's answer is not `NaN`, and (iv) a
> `commit` sink was supplied. In EVERY other case — a `cancel`, a refused terminal, a gesture with
> `isResizable === false`, an absent or throwing `sizeFor`/`boundsFor`, a `NaN` clamp answer, an
> establishment that never happened, a `reset` whose default was unusable — `sinkCalls` is `0`.** **The
> count is asserted from the controller's OWN `stats().sinkCalls` READ TOGETHER WITH the injected sink's
> own call record**, never from one of them alone.

**NO OTHER WRITE CHANNEL EXISTS (ruling 6, derived).** **The composition writes NOTHING from `onMove`,
from `onStart`, from `onEnd` or from `onCancel`** — those four hooks are **forwarded to the session
unwrapped and are not write sites of this unit's**, and **a consumer that writes from its own hooks is
writing from ITS OWN channel, which is not the sink this unit's rows count** (`F-12`).

**THE TWO POSITIVE CONTROLS, both REQUIRED, both falsifiable (`C1`):**

- **A TWO-WRITER COMPOSITION MUST FAIL A ROW (`F-10`).** A composition in which **a second writer also
  calls the sink for the same gesture** — the case `U-RELOCATE`'s successor note names as *"two
  controllers = two writers on different sinks"* — **must FAIL** the row that asserts
  *"the sink's call record for the gesture has length `1`"*, **because the record has length `2`.** **The
  row is written so that it CAN fail: it asserts the EXACT multiset of sink calls, not "at least one".**
- **A NO-WRITER COMPOSITION MUST FAIL A ROW (`F-11`).** A composition that **supplies no `commit` seam
  at all** — **the SLOT-EMPTY composition** — **must FAIL** the row that asserts *"a gesture reaching
  `end` with a numeric clamped value writes exactly once"*, **because it writes ZERO times.** **AND, IN
  THE SAME SENTENCE, the state this composition reports: THE SESSION THEN REPORTS `committed: true`
  WHILE NOTHING WAS WRITTEN** — `gsession.md` `§2.1`'s `TerminalResult` makes `committed` the
  **committing-terminal discriminator**, independent of whether a `commit` callback exists, so
  *"one commit per gesture"* **is satisfied by that composition VACUOUSLY and must never be quoted as
  evidence that a write happened.** **A row that counts sink calls can therefore be satisfied by a
  composition that never wired the channel — which is exactly why `F-11` exists as a control.**

**Item 4 — THE RESET CLAUSE (ruling 9), stated in full.**

> **`reset(element)`: when the controller holds the handle of an ACTIVE gesture for that element and
> `isResizable` was TRUE for that gesture, it evaluates the default through the caller's seam ONCE, CLAMPS
> it with the caller's bounds pair — `clampToBounds(defaultSizeFor(element, axis), boundsFor(element,
> axis))` — and calls `session.reset(element, handle, clampedValue)` exactly once, so that the value the
> session commits is the CLAMPED value, NOT the raw default.** **It commits AT MOST ONE value per
> gesture** — and when the default is unusable (the seam absent, non-callable or throwing) **it makes
> ZERO session calls and refuses with `'unusable-default'`.**

**The reset contract's clauses, each in its own line so no TestWriter has to infer one:**

1. **The handle is the one the controller captured in its own `onStart`**, **NEVER synthesised** and
   **NEVER retained past the terminal** (`§2.5` items 5/6).
2. **An `isResizable === false` gesture takes ZERO session calls from `reset`** — the decision was made
   once, at establishment, and **it is not re-evaluated here** (ruling 10). — **⟶ RULED 2026-09-27 (THE
   RED-RUN AMENDMENT PASS): THE REFUSAL'S CODE IS THE CONTROLLER-LOCAL `'not-resizable'` — `{ok: false,
   code: 'not-resizable', committed: false}` — NOT a session code, because the SESSION IS NEVER ASKED on
   this path, and NOT the `'ok'`-shaped reading the as-filed `F-13` cell printed (that as-filed form is
   kept visible at `§3.2 F-13`). The two controller-local codes, `'unusable-default'` and
   `'not-resizable'`, are the COMPLETE controller-local set (`§2.1`'s note); the session's seven-member
   domain is untouched and no code of this controller's ever enters it.**
3. **The committed value is the CLAMPED default, and it may be `NaN`-free only when the pair is usable**:
   an unusable pair clamps to `NaN`, the controller **still calls the session's `reset` terminal exactly
   once with that `NaN`**, and **the sink is NOT written** (`sinkCalls` stays `0`) while
   **`ResizeResetResult.committed` reports what the composition did — `false`.** **The session's own
   `TerminalResult.committed` for that call is `true`** (it is the committing-terminal discriminator) —
   **the same distinction `C1`'s slot-empty sentence draws, and the same reason the two counters are
   never conflated** (`§5.5.1 P-GT-SM-4`).
4. **Zero session calls when the DEFAULT ITSELF is unusable** (absent / non-callable / throwing) —
   the refusal is `'unusable-default'`, `committed: false`, and **the active gesture is UNTOUCHED** (a
   refusal never half-terminates, `gsession.md` `§2.3` item 8).
5. **No active gesture ⇒ `'no-gesture'` with ZERO session calls** — the session's OWN code, propagated
   **VERBATIM** (ruling 9), which is also what the session would answer, so the controller's refusal and
   the session's would agree.
6. **Every other session code propagates verbatim** — `'disposed'` on a disposed session, `'stale'` for
   a handle the session no longer honours. **The controller never translates, wraps, renames or
   re-lexes a session code** (`§2.5` item 5).
7. **`gesture.outcome === 'reset'` IS THE DISCRIMINATOR** — `gsession.md` `§2.5` item 10 (the corrected
   site, with `§2.3` item 4's `handle.outcome` beside it). **The composition's sink callback branches on
   `gesture.outcome` and on NOTHING else to tell a reset from a user-chosen end**, which is why a reset's
   committed value is the default and an end's is the consumer's own value.

**THE COMPLETE `reset` RESULT-CODE TABLE — WHICH CODES COME FROM THE SESSION VERBATIM AND WHICH TWO ARE
CONTROLLER-LOCAL.** *(**⟶ ADDED 2026-09-27 BY THE RED-RUN AMENDMENT PASS**: the gate-3 red run could not
derive the non-resizable case's code from the as-filed text, and the ruling declares it. This table is
the ONE statement of the domain; `§2.5` item 5 clause 4 carries the cross-reference.)*

| # | The code | Its SOURCE | The `reset(element)` path that produces it | Session calls made | `committed` |
| --- | --- | --- | --- | --- | --- |
| **1** | `'ok'` | **the SESSION's own code, VERBATIM** | an ACTIVE resizable gesture, usable default, usable bounds ⇒ the session's own `reset` terminal ran | **exactly ONE** (`session.reset(element, handle, clamped)`) | `true` iff a sink write occurred |
| **2** | `'no-gesture'` | **the SESSION's own code, VERBATIM** | **no ACTIVE gesture** for that element | **ZERO** | `false` |
| **3** | `'not-installed'` | **the SESSION's own code, VERBATIM** | the session refuses because the element was never installed | **exactly the refusal path's calls, counted by the row** | `false` |
| **4** | `'busy'` | **the SESSION's own code, VERBATIM** | the session refuses while another gesture owns the instance | the refusal path's calls | `false` |
| **5** | `'disposed'` | **the SESSION's own code, VERBATIM** | a disposed session (its own permanent-inert rule) | the refusal path's calls | `false` |
| **6** | `'disconnected'` | **the SESSION's own code, VERBATIM** | the session's own disconnected refusal | the refusal path's calls | `false` |
| **7** | `'stale'` | **the SESSION's own code, VERBATIM** | a handle the session no longer honours | the refusal path's calls | `false` |
| **8** | `'unusable-default'` | **CONTROLLER-LOCAL — DECLARED in `§2.1`, NEVER PASSED INTO THE SESSION** | the `defaultSizeFor` seam is absent, non-callable or throwing, for an ACTIVE resizable gesture | **ZERO** (no session call may be made on this path, ruling 9) | `false` |
| **9** | `'not-resizable'` | **CONTROLLER-LOCAL — DECLARED in `§2.1`, NEVER PASSED INTO THE SESSION** | an ESTABLISHED gesture whose `isResizable` decision was FALSY (the decision is NOT re-evaluated) | **ZERO** (the session never sees this refusal) | `false` |

**THE DOMAIN, STATED SO IT CANNOT BE MISREAD: NINE CODES = the session's SEVEN + this controller's TWO.**
**The SESSION's seven-member domain is UNTOUCHED and NO EIGHTH MEMBER ENTERS IT** (`gsession.md` `§4.4
S-9`): codes `1`–`7` are **read from the session's own results and returned byte-identically**, and codes
`8`–`9` are **emitted only on paths where the session is not called at all**, so **no controller code is
ever passed INTO the session** (`§2.4` item 4; `I-14`; `§4.4 S-11`). **A row that expects a NINTH code,
an eighth SESSION code, or one of the two controller-local codes to appear in a session call FAILS.**

**Item 5 — THE `install`-ONCE CLAUSE (`C4`).**

> **The controller NEVER re-installs per gesture.** `session.install` is called from `attach` and from
> NOWHERE ELSE — **never from a start turn, never from `onMove`, never from `reset`, never per gesture.**
> **A repeat `attach` on the same element is the session's own first-config-wins NO-OP returning
> `false`** (`gsession.md` `§2.4` item 2) — and this controller **does not even reach the session** on
> that path: it returns `false` from its own ledger first, so **no session call is made** and the first
> config stays in force. **A FAILED `attach`'s `false` IS NOT A START SIGNAL** — the controller never
> treats a `false` attach, a `false` repeat attach, or any refusal as a reason to establish a gesture or
> to retry the attach in a loop. **The one exception to "never reach the session" is a first attach on a
> FRESH element, where the delegation is the point.**

---

### 2.4 The seam rules — the seven NAMED SAFE DEFAULTS, and `C2`'s four throw paths

**Item 1 — THE SEVEN NAMED SAFE DEFAULTS (ruling 8, in the `docs/specs/listhost.md` `§7a` item 4 form
that `docs/specs/slothost.md` `§2.1` mirrors).** **Each seam's absent / non-callable / throwing state has
a NAMED outcome, and the outcome is asserted — never a bare `try`/`catch` with no contract.**

| Seam | What its absent / non-callable / throwing state MEANS | The NAMED SAFE DEFAULT (the declared outcome) |
| --- | --- | --- |
| `session` | the composition was not given a usable session | **a VALID BUT INERT controller**: `attach` ⇒ `false`, the declared refusals, zeroed stats, **never a throw** |
| `axisFor` | no token source | **the token is `undefined`**, passed on **OPAQUELY** |
| `boundsFor` | no usable bounds | **unusable ⇒ the clamp answers `NaN` ⇒ NO SINK WRITE** |
| `defaultSizeFor` | no usable default | **`undefined` ⇒ the reset REFUSES with ZERO session calls** |
| `isResizable` | no resizability decision | **NOT RESIZABLE** — the gesture establishes and terminates normally with zero writes |
| `sizeFor` | no value source | **`undefined` ⇒ `sinkCalls === 0` — and it is NOT a cancel** |
| `commit` | the sink threw | **SWALLOWED by the session's commit seam — the write is ALREADY COUNTED, NEVER RETRIED** |

**The totality universal, WITH ITS BOUNDARY IN ITS OWN WORDS (ruling 8's requirement, and
`§5.5.1 P-GT-TP-1` carries the same words):**

> **NO METHOD OF THIS CONTROLLER THROWS — for any argument shape — and `A THROWING INJECTED SEAM IS
> EXCLUDED FROM THAT UNIVERSAL ONLY WHERE THE SEVEN-SEAM TABLE ABOVE NAMES A DIFFERENT, EXPLICIT
> OUTCOME FOR IT**: an absent, non-callable or throwing `session`/`axisFor`/`isResizable`/
> `defaultSizeFor`/`commit` is **CAUGHT and mapped to its named safe default**, and **no method
> re-throws it**; **while a throwing `boundsFor` or `sizeFor` PROPAGATES to the caller of the terminal
> that invoked the session, and the session's own establishment/terminal ordering still leaves the
> gesture's baseline restored and its record discarded** (`gsession.md` `§0A` note 11) — **so the
> universal is bounded by exactly those TWO propagations, named here, and by NOTHING else.**

**Item 2 — THE FOUR CONSUMER-CALLABLE THROW PATHS (`C2`), each with (a) its declared outcome, (b) the
gesture's post-state, and (c) its write count.**

| # | Seam and WHEN it is called | (a) Declared outcome | (b) The gesture's post-state | (c) Sink writes |
| --- | --- | --- | --- | --- |
| **1** | **`axisFor` — at ESTABLISHMENT** | **SWALLOWED** by the controller's own `try`/`catch`; the token is `undefined` | **`'active'`** — the gesture ESTABLISHES normally; **not `busy`**, not refused, and the session's own `onStart`-throw cleanup is NOT triggered | the gesture proceeds; its write count is decided by the ordinary rules at its terminal |
| **2** | **`isResizable` — at ESTABLISHMENT** | **SWALLOWED**; **NOT RESIZABLE** | **`'active'`** — the gesture establishes and **terminates normally**; **not `busy`** | **ZERO** for that gesture (`isResizable === false` short-circuits every terminal evaluation) |
| **3** | **`defaultSizeFor` — at `reset`** | **SWALLOWED** by the controller; the default is UNUSABLE | **the ACTIVE gesture is UNTOUCHED** — the refusal is INERT (`'active'` before and after), **not `busy`** | **ZERO** — **and ZERO session calls** (ruling 9) |
| **4** | **`boundsFor` / `sizeFor` — at the TERMINAL** | **PROPAGATES** to the caller of the terminal — it is consumer code, and the composition swallows only its OWN seams' errors in the two establishment cases above | **`'idle'`, NOT `'busy'`**: the session has ALREADY detached the tracking three, marked the gesture inactive and discarded its record (`gsession.md` `§0A` note 11, `§2.3` item 2(c)) — so **the element stays installed and a new gesture establishes normally** | **ZERO OR EXACTLY ONE — NEVER TWO.** The clamp and the sink sit AFTER the seam that threw, so a throwing `boundsFor`/`sizeFor` **cannot have written** on that path; and **if the sink itself throws, the write is STILL COUNTED and NEVER RETRIED** (ruling 8's `commit` row) |

**THE `(c)` COLUMN'S UNIVERSAL, stated once so no row over-reads it: a throwing `boundsFor`/`sizeFor`
still yields ZERO or EXACTLY ONE sink write — NEVER TWO**, and **the same holds for a throwing `commit`**
(the attempt is counted once, never retried). **The controller's `stats()` is the reading: `sinkCalls`
counts ATTEMPTS (including a throw) and `written` counts RETURNS.**

**Item 3 — THE TOTAL-MEMBER-READ RULE.** **The controller reads the session's members TOTALLY: a hostile
holder, a missing member or a THROWING ACCESSOR yields "unusable" rather than an exception** — the same
rule `gsession.md`'s landed module applies to its own injected source (`readMember`), applied here to the
session and to the controller's own options. **Consequence: `createResizeController` NEVER THROWS for ANY
argument**, including a `Proxy` whose traps throw, a frozen object, a primitive, `null` and `undefined`;
**the factory's totality is a row (`§5.5.1 P-GT-TP-2`), not a hope.**

**Item 4 — THE NO-INVENTED-CODE RULE.** **This module adds NO code member to the session's SEVEN-member
closed union** (`gsession.md` `§4.4 S-9`) and **never passes a code INTO the session**: it **reads**
codes from the session's own results and **propagates them verbatim** (`§2.3` item 4). **The only
controller-local code is `'unusable-default'`, and it is emitted for a path where the session is not
called at all** (`§2.1`'s note; `§7a.1` item 1). **A row proposing an eighth SESSION code, a fifth
session outcome or a `session.cancel` call from this module is `§4.4 S-11`, and it does not land.**

---

### 2.5 The composition boundary

**Item 1 — WHAT THE CONTROLLER MAY CALL ON THE SESSION, and NOTHING ELSE.** **Its authority is
`docs/specs/gsession.md` `§2.5`'s numbered list — the FROZEN delegate surface — narrowed to what a
COMPOSITION needs:**

| The controller may call | Multiplicity | `gsession.md` authority |
| --- | --- | --- |
| `session.install(element, {onStart, onMove, onEnd, onCancel})` | once per distinct element | `§2.5` item 2 |
| `session.reset(element, handle, value)` | once per `reset(element)` that runs | `§2.5` item 5 |
| `session.dispose()` | once per `detach()` that runs | `§2.5` item 7 |
| `session.stats()` · `session.gesture()` · `session.disposed` | read-only, any number of times | `§2.5` item 8 |

**AND IT MAY CALL NOTHING ELSE ON THE SESSION.** **`session.begin` is NOT in this table and is NEVER
called by this module** (ruling 9's own sentence: *"the controller NEVER calls `session.begin` outside
the documented consumer-driven establishment"*; `gsession.md` `§2.5` item 3 is a **test/consumer seam**,
not a controller actuator). **`session.end` and `session.cancel` are NOT called by this module either** —
a user-chosen end arrives through the session's own listeners, and a cancel is the session's business.
**`session.installGestureListeners`/`detachGestureListeners`/`POINTER_TYPES` are NOT used by this
module.** **`GestureHandle.set` is NOT called by this module** — it is called by the **consumer** in its
own `onMove` (`gsession.md` `§2.5` item 9). **`session.disposed` is READ, never assigned.** **This table
IS `§3.4 R-14`'s row**, and **a call outside it FAILS that row.**

**Item 2 — THE `U-CENSUS` SENTENCE (`§1` item 6 of this file; `census.md` `§1` item 7's DISSOLVED EDGE),
stated once and unweakened.**

> **THIS MODULE IMPORTS NOTHING FROM `U-CENSUS` — NOT THE MODULE, NOT A TYPE, NOT A VALUE — and it makes
> NO CENSUS READ OF ANY KIND. A consumer's `sizes`-style value arrives ONLY as an ARGUMENT to the
> CONSUMER'S OWN injected callbacks (`boundsFor`, `sizeFor`, `defaultSizeFor`), because those callbacks
> are the consumer's closures. The LEDGER EDGE is DISSOLVED: `docs/next-steps.md`'s `E3` row's `Blocked
> on` cell names `U-GSESSION` ONLY, and `U-CENSUS`'s half is corrected in that cell in the gate-1 pass.
> The `U-GUTTER`-as-successor-in-need relationship `census.md` `§1` item 7 states is KEPT AND
> UNWEAKENED — it is a VALUE relationship (the `sizes` value and the token strings), NOT an import edge
> and NO LONGER a blocking ledger edge.**

**Consequence for rows:** **a row that needs a census key set, a `zones`/`revealed`/`specOf` map, a
`sizes` map held by this module, or a track-variable name is `§4.4 S-12`** — it does not land here, and
it does not get "pulled in for convenience" from `U-CENSUS`.

**Item 3 — THE `U-GSESSION` SENTENCE, stated once.** **This unit COMPOSES the landed session and
RE-EXPRESSES NONE OF ITS LIFECYCLE.** It **reads only `stats()`, `gesture()` and `disposed`**; it **calls
only the four rows of item 1's table**; it **owns no gesture state machine, no listener, no window and
no disposal order**; and it **never becomes a second writer on a channel the session owns**. **The
`SECOND-GESTURE-AUTHORITY` objection is ANSWERED BY COMPOSITION — and by nothing else** (ruling 3).
**The session's own spec, red set and gates are the session's** (`RCA-2`): **this unit may not edit
`docs/specs/gsession.md`'s contract, the session module, or its test file** (`§5.1`'s DENIED set).

**Item 4 — ONE CONTROLLER PER SESSION AND PER CONTROL, WITH THE STATED ENFORCEMENT LIMIT (ruling 14;
`gsession.md` `§2.6` item 7's TWO-PART *REQUIREMENT + LIMIT* form).**

> **THE REQUIREMENT: one controller per session, and one controller per control element.** **THE LIMIT,
> stated honestly and in the same breath: the mechanism has NO SHARED REGISTRY and CANNOT DETECT a second
> controller.** A second controller constructed over the same session **would be invisible to the
> first**, and **no module of this unit throws, refuses or reports on that account.** **The requirement
> is therefore discharged by the COMPOSITION RULE (this item) plus the CALL-COUNT ROW** —
> `§5.5.1 P-GT-SM-3` and `R-13`, which read the sink's own call record and the controller's own
> `stats().sinkCalls`, **so a two-writer composition is caught by a COUNT rather than by a check.**
> **A row asserting that this module "detects" a second controller is `§4.4 S-8` and does not land.**

**Item 5 — THE RESET ENTRY POINT'S FULL CONTRACT (ruling 9), in nine falsifiable clauses.**

1. **`reset(element)` takes the ELEMENT** (`§0A` note 5) and derives the axis token itself, once, via
   `axisFor` — **the caller never supplies a token.**
2. **The handle is the one captured in the controller's own `onStart`**, for the gesture that is
   ACTIVE now. **It is NEVER synthesised** (the controller cannot construct a `GestureHandle` and must
   not pretend to) and **NEVER retained past a terminal** (`gsession.md` `§2.5` item 3's handle clause).
3. **No active gesture ⇒ refuse `'no-gesture'` with ZERO session calls.** The refusal is **`{ok: false,
   code: 'no-gesture', committed: false}`** and **the session is not touched** — no `reset`, no
   `stats()`, no `dispose()`.
4. **The session's own codes propagate VERBATIM** — the seven members, **no eighth**: `'disposed'` from a
   disposed session, `'stale'` from a handle the session refuses, `'ok'` on success. **The controller
   adds no code to the session's union and passes none in** (`§2.4` item 4). **⟶ CROSS-REFERENCE ADDED
   2026-09-27 (THE RED-RUN AMENDMENT PASS): THE COMPLETE `reset` RESULT-CODE TABLE — the session's SEVEN
   codes verbatim plus the TWO controller-local codes `'unusable-default'` and `'not-resizable'`, with
   the session-call count each path makes — is stated at `§2.3` item 4's table. THE SESSION's
   SEVEN-MEMBER DOMAIN IS UNTOUCHED: no eighth member enters it, and neither controller-local code is
   ever passed into the session.**
5. **The committed value is `clampToBounds(defaultSizeFor(element, axis), boundsFor(element, axis))`** —
   **the CLAMPED value, never the raw default.**
6. **At most ONE commit per reset**, and **zero session calls when the default is unusable** (seam
   absent / non-callable / throwing) ⇒ **`'unusable-default'`, `committed: false`, the active gesture
   untouched.**
7. **`gesture.outcome === 'reset'` is the DISCRIMINATOR** — `gsession.md` `§2.5` item 10 (the corrected
   citation site), with `§2.3` item 4's `handle.outcome` and `§0A` note 5 beside it. **This is how the
   composition's sink callback tells a reset from a user-chosen end.**
8. **The controller NEVER calls `session.begin`** — at any point, including in `reset`'s path and
   including as a "recovery" from a refusal. **Establishment is the consumer's/session's own act**
   (`gsession.md` `§2.5` item 3).
9. **A refused reset changes NOTHING**: no sink write, no session call, no counter other than
   `lastCode`, and **the active gesture stays active with the same id and the same value.**

**Item 6 — A HANDLE PAST A TERMINAL IS NEVER USED.** The controller **clears its per-gesture record at
the terminal** — inside the same sink callback — so **a later `reset(element)` cannot reach for a dead
handle** and **`stats()` never reports a stale gesture.** **This is the `gsession.md` `§2.5` item 3
clause *"keep a reference to the handle past the terminal"* applied to THIS unit's own record**, and it
is what makes clause 2 above assertable.

---

### 2.6 The sibling properties — each DERIVABLE FROM THE LANDED SESSION, and none re-expressed

**What this subsection is.** The gate-1 record's condensed clause set (`§5`/`§6`) pins **seven**
properties. **This filing asserts EVERY ONE of them is expressible through the landed session's own
surface** — with the clause that expresses it and the row here that pins it — and **it finds NO property
that cannot be expressed.**

| # | The sibling property (source) | The clause that expresses it (session authority) | The row here |
| --- | --- | --- | --- |
| **1** | **one commit per gesture** | the session invokes `commit` exactly once per gesture reaching `end`/`reset` and counts it (`gsession.md` `§2.3` items 4/5) — **this unit's sink is that callback**, and the sink's own record is the count | **`M-1`**, **`F-10`**, **`§5.5.1 P-GT-SM-1`**/**`P-GT-SM-3`** |
| **2** | **`cancel` ⇒ ZERO commits and ZERO sink writes** | `cancel` ⇒ `committed:false` and **the commit callback is invoked zero times** (`gsession.md` `§2.3` item 4), so **the sink is unreachable by construction on that path** | **`M-4`**, **`F-2`**, `I-2b`, `§5.5.1 P-GT-SM-1` |
| **3** | **`reset` ⇒ AT MOST ONE commit OF THE CLAMPED SUPPLIED DEFAULT** | the session's own `reset` terminal's one commit of the caller's value with `outcome:'reset'` (`gsession.md` `§2.3` item 4, `§2.5` item 5, `§0A` note 6), **plus this unit's clamp** (`§2.3` item 4) | **`M-14`**..**`M-17`**, **`F-12`**..**`F-15`**, **`§5.5.1 P-GT-SM-4`** |
| **4** | **no capture before establishment — INHERITED and OBSERVED** | `gsession.md` `§2.3` item 6: capture is one call inside `begin`, after the tracking listeners open, and ONLY for a control that opted in — **and this composition never opts in** (ruling 11) | **`R-10`** (with its positive control), **`§5.5.1 P-GT-SM-2`** |
| **5** | **an interrupt leaves NO retained sink and NO listener** | `gsession.md` `§2.3` item 2(c)/item 7 detaches **before** any consumer code, and the session retains no sink of its own; **this unit retains no sink either — it holds the consumer's sink as a construction argument and drops its per-gesture record at the terminal** | **`M-4`**, **`M-13`**, `I-9`, `§2.5` item 6 |
| **6** | **NO SECOND GESTURE AUTHORITY — and NO SECOND WRITER** | `gsession.md` `§2.3` item 3 (one active gesture per instance, `'busy'` on a second start, no consumer-callable `commit()`) **plus ruling 6's single-writer discipline**: this unit calls `session.begin`/`end`/`cancel` **never**, and owns exactly one write site | **`I-2`**, **`I-8`**, **`F-9`**/**`F-10`**, `§5.5.1 P-GT-SM-3` |
| **7** | **the GUTTER UI IS NOT THIS UNIT** | ruling 12: the real gutter UI is **ledger row `E10`, `PROPOSED — awaiting admission`**, the only place a coordinate source or a `[U]` row could legitimately live, and **`E3` does NOT owe it** | **`R-8`**, `§1` item 5, `§5.2`, `§8` (the `E10` row) |

**The `U-RELOCATE` (`E4`) note, recorded and NOT restated as this unit's clause.** Per the gate-1
record's change analysis, **`E4` INHERITS the single-writer discipline PER COMPOSITION** — two
controllers are two writers **on DIFFERENT sinks** — and **`E4`'s spec should CITE the resolved channel
clause rather than restate it**, because **restating it is the second-authority hazard this unit's
rulings exist to close** (`gsession.md` `§2.6` item 6). **This filing states that as an obligation ON
`E4`'s spec, and asserts NOTHING about `E4`'s rows.**

**THE SESSION-SIDE PRECONDITION, NAMED AND NOT ASSUMED.** **`[D]` is unclaimed and
`PRECONDITION-GATED`** on `U-DIVERGENCE-EXT` (ledger row `C2`), which **does not exist** (`§3.5 R-11`
is the probe). **No pass may claim a real-DOM, retargeting or divergence-shaped property from this
unit's node green, from the node suite, or from the pinned `N = 9` divergence leg.** **This spec offers
NO `[U]` row and NO `[D]` row** (`§5.2`), **and a DONE row that reports such a claim as green is a review
finding.**

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]**
the divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row**, and
**every row is a contract row for the TestWriter; none is a measurement this pass took.** **Every row
carries an id and a `Pinned by` citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **A control attaches, and the SESSION owns the listener** | `createResizeController({session, …})` over a recording session double; `attach(elA)` | **exactly ONE `session.install` call** carrying `elA` (identity) and an options object whose own keys are **exactly the four hooks** — a typed recording session asserts the options object's key SET, so a `capture` field FAILS here; **no `addEventListener` of any kind**; the return is `true` | `§2.1` items 3/5, `§2.5` item 1, `R-3`/`R-10` | `[T]` |
| **M-2** | **`clampToBounds` clamps into range, at each edge and inside it** | a caller pair `{min: 0, max: 100}` driven with value `150`, then `-5`, then `42` | **`100`, then `0`, then `42`** — i.e. `Math.max(min, Math.min(value, max))` **verbatim**; the return is a `number` in every drive | `§2.3` item 2, `§0A` note 8 | `[T]` |
| **M-3** | **The seam order at establishment, and the token's identity at the terminal** | a full lifecycle: attach, session-driven establishment, `pointermove` (consumer `onMove` calls `gesture.set(7)`), `pointerup` | the recorded call log is **`axisFor` then `isResizable`** at establishment, then **`sizeFor` then `boundsFor` then the sink** at the terminal; **the `axis` argument each of `isResizable`/`sizeFor`/`boundsFor` receives is the EXACT object `axisFor` returned** (`toBe`); the sink receives **the session's own handle** and **the clamped `number`** | `§2.3` items 1/2, `§0A` notes 5/6 | `[T]` |
| **M-4** | **A `cancel` writes nothing, and the sink callback is never invoked** | a full lifecycle terminated by the recorded `pointercancel` handler | **the sink's recorded call count is `0`**; **`stats().sinkCalls === 0`**; `stats().written === 0`; the session's terminal result reads `committed: false`; **the controller's per-gesture record is dropped** | `§2.3` item 3, `§2.6` item 2, `§2.5` item 6 | `[T]` |
| **M-5** | **A normal `end` writes EXACTLY ONCE with the CLAMPED value** | attach → establish → `set(0.1 + 0.2)` → `pointerup`, with `boundsFor` ⇒ `{min: 0, max: 0.3}` and `sizeFor` ⇒ `0.30000000000000004` | **one sink call**, with **`0.3`** (the clamp's answer), **not** the raw seam value; `stats().sinkCalls === 1`; `stats().written === 1`; `stats().gestures === 1` | `§2.3` items 1/3, `§5.5.1 P-GT-SM-1` | `[T]` |
| **M-6** | **The value is CONSUMER-PRODUCED and reaches the sink unmodified by this unit beyond the clamp** | `onMove` sets a sentinel number `777`; `sizeFor` **reads `gesture.value` and returns it** (`(el, g) => g.value`); bounds `{min: 0, max: 1000}` | the sink receives **`777`** **by value** (`toBe` for the number), and the row asserts `gesture.value === 777` at the seam — **the composition itself computed no delta and no magnitude** | `§2.3` item 1, `§1` item 2, `I-11` | `[T]` |
| **M-7** | **`axisFor`'s token is opaque: changing its TYPE changes nothing about the outcome** | three drives with `axisFor` returning an object `{k: 1}` (identity-asserted), then the string `'vertical'`, then `undefined` | **all three establish and terminate normally**; `boundsFor`/`sizeFor`/`defaultSizeFor` each receive **exactly** what `axisFor` returned (`toBe` on the object); **the emitted sink value is byte-identical across the three drives** — the module branched on no token | `§2.2` P-5, `§0A` note 5, `R-1` | `[T]` |
| **M-8** | **`isResizable === false` establishes and terminates NORMALLY, with ZERO writes** | `isResizable: () => false`; a full `pointerup` lifecycle | the gesture **ESTABLISHES** (`stats().gestures === 1`), `axisFor` and `isResizable` were each called **exactly once**, `sizeFor`/`boundsFor`/`defaultSizeFor` are called **ZERO times**, `sinkCalls === 0`, and **the terminal outcome is `'end'` — NOT `'cancel'`**, which is what distinguishes it | `§0A` note 6, ruling 10, `I-4` | `[T]` |
| **M-9** | **A falsy `isResizable` of ANY kind is not resizable; a truthy one of any kind is** | `isResizable` driven as `() => 0`, `() => ''`, `() => null`, `() => undefined`, `() => false`; then as `() => 1`, `() => 'no'`, `() => new Object()`, `() => []` | the five falsy drives each yield **zero writes and a normal `'end'`**; the four truthy drives each yield **exactly one write**; **truthiness decides, and nothing else does** | ruling 10, `§2.4` item 1, `§5.5.1 P-GT-IM-3` | `[T]` |
| **M-10** | **`isResizable` is NEVER an install-time gate** | `attach(elA)` with an `isResizable` that would return `false`, then `attach(elB)` **with no gesture at all** | **both attaches return `true`**, both delegate to `session.install`, and **`isResizable` is called ZERO times during either attach** — the decision belongs to the gesture | ruling 10, `§2.3` item 2(b), `§2.1` item 3 | `[T]` |
| **M-11** | **Two gestures are two gestures: the decision and the token are re-derived, and nothing carries** | two full lifecycles on the same element, with `isResizable` returning `false` then `true` | `axisFor` and `isResizable` are called **once per gesture (2 each)**; the FIRST writes `0` times and the second writes **exactly once**; **no value, token or decision carries across the boundary** | ruling 10, `§2.3` item 2(b), `I-9` | `[T]` |
| **M-12** | **`attach` delegates ONCE per element and a repeat attach delegates NOTHING** | `attach(elA)` then `attach(elA)` again (with DIFFERENT hooks) | the first returns `true`; the second returns **`false`**; **`session.install` is called exactly ONCE in total**; **the first hooks stay in force** (the driver fires the recorded start and asserts the FIRST `onMove` ran, not the second) | `§2.3` item 5 (`C4`), `gsession.md` `§2.4` item 2, `I-3` | `[T]` |
| **M-13** | **`detach()` restores the controller's baseline through the session, once** | `attach(elA)`; `detach()`; `detach()` again | the FIRST call delegates **`session.dispose()` exactly once** and returns `true` when the session reports `complete: true`; the SECOND makes **ZERO session calls** and returns `false`; **`detached` reads `true` forever after**; the session's own detach arithmetic is the session's row (`gsession.md` `M-13`), not re-asserted here. — **⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS): THIS ROW IS THE RED SET'S CARRIER FOR THE MULTI-ELEMENT LIMB — the landed test drives `attach(elA)`, `attach(elB)`, `detach()` ⇒ `false` with ZERO session calls as an arm INSIDE `M-13` — and the limb now also has an EXPLICIT row, `M-20`, appended below in this family. `M-13`'s own clauses are unchanged; the limb's declaration is `M-20`'s.** | `§2.5` item 1, `§2.1` item 4, `I-9`, **`M-20`** | `[T]` |
| **M-14** | **`reset(element)` commits the CLAMPED supplied default, ONCE, through the session's reset terminal** | attach; establish (with `isResizable` true); `onMove` sets a sentinel user value `12345`; `boundsFor` ⇒ `{min: 0, max: 100}`; `defaultSizeFor` ⇒ `420`; then `reset(el)` | **exactly ONE `session.reset` call**, carrying **the exact handle the session gave at establishment**, the element, and **`100`** — the CLAMPED value, **not `420` and not the user's `12345`**; the sink receives **`100`** once; `stats().resets === 1`; `stats().sinkCalls === 1` | `§2.3` item 4, `§0A` note 5, `§5.5.1 P-GT-SM-4` | `[T]` |
| **M-15** | **`gesture.outcome === 'reset'` IS the discriminator, and the sink can read it** | the same drive as `M-14`, with a sink that records `gesture.outcome` and `gesture.value` | the recorded outcome is **`'reset'`** (not `'end'`); the recorded handle's `value` reads the committed **`100`**; and — the control — the same sink driven by an ordinary `end` records **`'end'`** | `gsession.md` `§2.5` item 10 (**the corrected site**), `§2.3` item 4, `§0A` note 5 | `[T]` |
| **M-16** | **A reset with NO active gesture refuses `'no-gesture'` and makes ZERO session calls** | `attach(el)`, no establishment, then `reset(el)` | **`{ok: false, code: 'no-gesture', committed: false}`**; the recording session's call log is **EMPTY** (no `reset`, no `stats`, no `dispose`); **`defaultSizeFor` is called ZERO times** | `§2.3` item 4 clause 5, `§2.5` item 5 clause 3, `F-12` | `[T]` |
| **M-17** | **A reset refuses without touching the ACTIVE gesture** | an established gesture, then a reset drive whose `defaultSizeFor` throws; then a normal `pointerup` | the refusal is **`{ok: false, code: 'unusable-default', committed: false}`**; **the gesture is STILL ACTIVE** (same id, same value) and **the subsequent `pointerup` commits normally with `outcome: 'end'`** — the refusal half-terminated nothing | `§2.3` item 4 clauses 4/9, `§2.4` item 2(3), `F-12` | `[T]` |
| **M-18** | **The controller's counters are its own and are readable** | after `M-5`'s lifecycle, then `M-4`'s cancel, then `M-14`'s reset | `stats()` reports `{attached: 1, gestures: 3, sinkCalls: 2, written: 2, resets: 1, lastCode: 'ok'}`, and **every figure is reconciled against the recording sink's own call record and the recording session's own log** | `§0A` note 10, `§2.1`'s `ResizeStats`, `§2.3` item 3 | `[T]` |
| **M-19** | **`clampToBounds` is pure: identical arguments yield identical results, and nothing is retained or mutated** | one caller pair driven TWICE in sequence, with a post-call snapshot of both arguments (`Object.keys`, `Object.isFrozen`, prototype identity, the `value` binding) | the two results are **equal** (`Object.is` for the `-0`/`NaN` cases, `===` otherwise); the post-call snapshot is **identical to the pre-call snapshot**; a **frozen** pair behaves exactly like its unfrozen twin; **no memo, cache or counter exists** | `§2.1` item 1, `I-12`, `§5.5.1 P-GT-PU-3` | `[T]` |
| **M-20** | **`detach()`'s MULTI-ELEMENT limb: it refuses, with ZERO session calls, while more than one element is attached to this controller** — *(**⟶ ADDED 2026-09-27 BY THE RED-RUN AMENDMENT PASS**: the limb was stated only in `§2.1` item 4's prose and in `§7a.1` item 2, with no explicit row; the red set drives it as an arm of `M-13`, which this row names as its CARRIER. It is appended as the NEXT FREE `M-` id — no existing id moved and no section number changed.)* | `attach(elA)`; `attach(elB)`; then `detach()` | **`false`**, with **ZERO session calls of any kind** (no `dispose`, no read, nothing) — because the session is SHARED and detaching it on behalf of one control would detach the other control's listeners; **nothing is half-detached**: BOTH ledger entries stay intact, the controller still reports `attached === 2` through `stats()`, and **`detached` stays `false`**; a later `detach()` still refuses while two elements remain, and the row's control drive (`attach(elA)` alone, `detach()`) returns `true` with exactly ONE `session.dispose()` | `§2.1` item 4 (the `detach` doc block), `§7a.1` item 2 (**the WORKING DEFAULT this row carries — NOT a ruled clause**), `§2.5` item 4, `M-13` (**the red set's carrier**), `§5.5.1 P-GT-SM-5` | `[T]` |

### 3.2 Documented fail-states / non-happy states

**The pure function's rows first (`F-1`..`F-8`) — and NOTE the shape: `clampToBounds` has NO REFUSAL
DOMAIN, so every outcome in that block is a VALUE, not an error** (ruling 12; `§0A` note 8).

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A NON-NUMBER `value`** | `clampToBounds` with `value` driven as `'12'`, `'0'`, `null`, `undefined`, `true`, `false`, `{}`, `[]`, `Symbol('s')`, a function, `12n`/`0n` | **`NaN` in every case** — **no coercion, no `Number(...)`, no `parseFloat`, no `+value`, no `String` round-trip** (`S-PURE-1`); **the bounds are not consulted for a different answer** | ruling 12, `§2.3` item 2, `§4.4 S-PURE-1` | `[T]` |
| **F-2** | **`NaN` as the value** | `value = NaN`, bounds `{min: 0, max: 100}` | **`NaN`** — the formula's own answer (`Math.min(NaN, 100)` is `NaN`), **not** the `min` and **not** the `max` | ruling 12, `§2.3` item 2 | `[T]` |
| **F-3** | **A non-finite VALUE reaches the formula verbatim** | `value = +Infinity` then `-Infinity`, bounds `{min: 0, max: 100}` | **`100`, then `0`** — `max` and `min` respectively; **no refusal, no `'Infinity'` string, no throw** | ruling 12, `§2.3` item 2 | `[T]` |
| **F-4** | **A finite negative value clamps to `min`** | `value = -3` (and `-Number.MIN_VALUE`), bounds `{min: 0, max: 100}` | **`0`** in both cases — **`min`**, because the formula's `max(min, …)` applies; **no empty-token-style substitution, no `NaN`** | ruling 12, `§2.3` item 2 | `[T]` |
| **F-5** | **`-0` is PRESERVED when it is the answer** | `value = -0` with bounds `{min: -0, max: 100}`, and again with `{min: 0, max: 100}` | the first answers **`-0`** (`Object.is(result, -0) === true`) and the second answers **`0`** (`Object.is(result, 0) === true`) — **the sign is neither invented nor destroyed: the FORMULA's answer is returned as-is** | ruling 12, `§2.3` item 2, `I-12` | `[T]` |
| **F-6** | **Equal bounds** | `value = 7`, bounds `{min: 7, max: 7}`; and `value = 100`, same bounds | **the value** in both cases (`7`, then `7` — the second clamps to `7`) — **no special case, no refusal** | ruling 12, `§2.3` item 2 | `[T]` |
| **F-7** | **INVERTED bounds (`min > max`)** | `bounds = {min: 100, max: 0}`, with `value = 50`, then `150`, then `-5` | **`100`, `100`, `100`** — i.e. **`min`**, in every drive; the row's message states that **this is the VERBATIM FORMULA'S answer** and **not a refusal** — **a module that validates the pair, swaps it, or returns `NaN` FAILS.** | ruling 12, `§2.3` item 2, `§0A` note 4 | `[T]` |
| **F-8** | **An UNUSABLE or UNREADABLE bounds pair** | `bounds` driven as: `undefined`, `null`, `42`, `'x'`, `true`, `Symbol('b')`, a function, `[]`, `[0, 100]`, `{}` (no bound fields), `{min: 0}` (max absent), `{min: '0', max: '100'}` (non-number bound), `{min: NaN, max: 100}` (a `number`-typed `NaN`), `{min: 0, max: Infinity}` (non-finite but `number`-typed), and a record whose `min` getter **THROWS** | the `typeof`-gated cases — absent, non-record, primitive, unreadable, non-`number` field, throwing field read — all answer **`NaN`**; **`{min: NaN, max: 100}` answers `NaN` too, by the formula** (`Math.max(NaN, …)`); and **`{min: 0, max: Infinity}` answers the formula verbatim** (with `value = 42` ⇒ **`42`**), because both bounds ARE `number`s. **No throw escapes in ANY drive.** | ruling 12, `§2.3` item 2, `§4.4 S-PURE-2`, `§0A` note 4 | `[T]` |
| **F-9** | **THE TWO-WRITER COMPOSITION — positive control #1 (`C1`)** | a composition in which **a second writer ALSO calls the sink for the same gesture** (the driver wires a second controller over the same session, or calls the sink directly from a hook), on an otherwise-correct `end` lifecycle | **the row FAILS**: the sink's call record for the gesture has **length `2`**, and the row asserts **EXACTLY length `1`** — so the row **can** fail, which is what makes the single-writer discipline falsifiable. **The controller's own `stats().sinkCalls` reads `1` while the SINK's record reads `2`** — `§5.5.1 P-GT-SM-3` asserts **both readings**, so a composition cannot pass by counting only its own calls. — **⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS): THE TWO READINGS ARE DISTINCT BY DESIGN, and the divergence is the row's falsifier.** **For the CORRECT (single-writer) composition the sink's own record and the controller's `stats().sinkCalls` BOTH read `1`; for the TWO-WRITER composition the SINK'S OWN RECORD reads `2` while the CONTROLLER'S COUNTER still reads `1`** — because a second writer's call does not pass through this controller's one call site, and **that is exactly why the row asserts both readings rather than one.** **The as-filed `P-GT-SM-3` cell said the two readings *"AGREE at `1`"* while also saying the controller's count reads `1` *because* the sink's record reads `2`; the two could not both hold for the two-writer shape, so that wording was a CONTRACT DEFECT and is kept visible at `§5.5.1`. The same distinction is stated at `§3.4 R-13`.** | ruling 6, `C1`, `§2.3` item 3, `R-13` | `[T]` |
| **F-10** | **THE NO-WRITER COMPOSITION (SLOT-EMPTY) — positive control #2 (`C1`), WITH THE REQUIRED SENTENCE** | `createResizeController({session, axisFor, boundsFor, isResizable, sizeFor})` — **no `commit` seam at all**, or a `commit` seam that is non-callable; a full `end` lifecycle with a numeric clamped value | **the row FAILS**: the write count is **`0`**, not `1`. **AND THE COMPOSITION'S STATE IS STATED IN THE SAME SENTENCE, as `C1` requires: THE SESSION THEN REPORTS `committed: true` WHILE NOTHING WAS WRITTEN** (`gsession.md` `§2.1`'s `TerminalResult` makes `committed` the committing-terminal discriminator, independent of whether a `commit` callback was installed: `{ok:true, code:'ok', committed:true}` with `stats().commits` staying `0`). **THEREFORE *"one commit per gesture"* IS VACUOUSLY TRUE FOR THIS COMPOSITION AND MUST NEVER BE QUOTED AS EVIDENCE THAT A WRITE HAPPENED** | ruling 6, `C1`, `§2.3` item 3, `I-2b` | `[T]` |
| **F-11** | **A THROWING SINK** | the sink throws on its one invocation | **the write is SWALLOWED by the session's own commit seam — it is ALREADY COUNTED and NEVER RETRIED**: `stats().sinkCalls === 1`, `stats().written === 0`, `stats().commits` unchanged, **no consumer boundary sees an error**, and the gesture is **`idle`** afterwards with its baseline restored | ruling 8's `commit` row, `§2.4` item 1, `gsession.md` `§2.1`'s `SessionOptions.commit` | `[T]` |
| **F-12** | **A reset whose default is UNUSABLE** | `defaultSizeFor` **absent**; then non-callable; then **throwing** | **all three refuse with `'unusable-default'`, `committed: false`, ZERO session calls** (`defaultSizeFor` is the only seam consulted at that point, and `boundsFor` is NOT called either); **the active gesture is untouched**; **the sink is not written** | ruling 9, `§2.3` item 4 clauses 4/9, `§2.4` item 2(3), `§5.5.1 P-GT-SM-4` | `[T]` |
| **F-13** | **A reset with NO `isResizable` decision (`false`)** | an established gesture with `isResizable: () => false`, then `reset(el)` | **ZERO session calls** — the decision was made once, at establishment, and **is not re-evaluated**; **the refusal is the CONTROLLER-LOCAL `'not-resizable'`** — **`{ok: false, code: 'not-resizable', committed: false}`** *(**⟶ RULED 2026-09-27, THE RED-RUN AMENDMENT PASS: this cell AS FILED read *"the refusal is `'no-gesture'`-shaped only if no gesture is active, otherwise it is `'ok'` with `committed: false` and zero writes"* — the ruling replaces that two-branch reading with ONE declared code, `'not-resizable'`, because the session is NEVER ASKED on this path, so no session code is honest for it and an `'ok'`-shaped success would mis-report a refusal. The as-filed wording is kept visible here; `§7a.1` item 1's recommendation is unchanged and extended by this ruling.)*; **the session is not touched at all**; `defaultSizeFor` is called **ZERO times**; **the sink is not written**; and **the active gesture is UNTOUCHED** | ruling 10, `§2.3` item 4 clauses 2/4 (and item 4's reset result-code table, row `9`), `§2.5` item 5 clause 4, `§5.5.1 P-GT-SM-4` | `[T]` |
| **F-14** | **A reset whose BOUNDS are unusable (the clamp answers `NaN`)** | an established, resizable gesture; `defaultSizeFor` ⇒ `500`; `boundsFor` ⇒ `{}` or a throwing pair | **exactly ONE `session.reset` call**, carrying **`NaN`**; **the sink is NOT written** (`sinkCalls` stays `0`) and **`ResizeResetResult.committed` reads `false`** — **while the session's own `TerminalResult.committed` for that call reads `true`** (the same distinction `F-10`'s sentence draws). **A row that conflates the two counters FAILS** | `§2.3` item 4 clause 3, `§5.5.1 P-GT-SM-4`, `F-10` | `[T]` |
| **F-15** | **A reset on a session that refuses: `'disposed'`** | `attach(el)`, an establishment, then `session.dispose()` (or the controller's own `detach()`), then `reset(el)` | the refusal code is **the session's own `'disposed'`, propagated VERBATIM**, with **`committed: false`**, **zero writes**, and **zero session calls from the controller beyond the refusal path** | ruling 9, `§2.5` item 5 clause 6, `I-3` | `[T]` |
| **F-16** | **An UNUSABLE or hostile `session`, and the total factory** | `createResizeController()` · `({})` · `({session: undefined})` · `({session: 42})` · `({session: {}})` (no callable members) · `({session: <a Proxy whose traps throw>})` · `({session: Object.freeze({})})` · `(42)` · `('x')` · `(null)` | **construction NEVER throws**; the returned controller is **VALID BUT INERT**: `attach` ⇒ `false` (**no session call**), `reset` ⇒ a refusal record with **zero session calls**, `detach()` ⇒ `false`, `stats()` ⇒ **zeroed counters**, `detached` reads `false` until a `detach()` that refuses; **every member returns its declared shape for every argument** | ruling 8's `session` row, `§0A` note 9, `§2.4` item 3, `§5.5.1 P-GT-TP-2` | `[T]` |
| **F-17** | **A THROWING `boundsFor` / `sizeFor` at the terminal (`C2` path 4)** | (a) `boundsFor` throws; (b) `sizeFor` throws | the throw **PROPAGATES to the caller of the terminal**; **the gesture is `idle`, NOT `busy`** (the session already detached and discarded its record); **the element stays installed and a new gesture establishes normally**; **the sink write count for the throwing gesture is `0`** — and, in the control drive where the sink ALSO throws, it is **`1` attempt and NOT retried** — **so the count is ZERO or EXACTLY ONE, NEVER TWO** | `C2`, `§2.4` item 2(4), `§5.5.1 P-GT-IM-2` | `[T]` |
| **F-18** | **A THROWING `axisFor` / `isResizable` at establishment (`C2` paths 1/2)** | (a) `axisFor` throws; (b) `isResizable` throws | **both are SWALLOWED** by the controller's own `try`/`catch`; the gesture **ESTABLISHES NORMALLY** (`stats().gestures` increments), is **NOT `busy`**, and the session's establishment failure path is **NOT triggered**; in (a) the token `undefined` reaches the terminal seams; in (b) the gesture writes **ZERO** times and terminates with outcome **`'end'`** | `C2`, `§2.4` item 2(1)/(2), `§0A` notes 5/6 | `[T]` |
| **F-19** | **A consumer that writes from its OWN hooks** | the consumer's `onMove` calls the sink itself, or its `onEnd` does | **this unit's rows do NOT count that write as the composition's** — the composition's `sinkCalls` is the count of **the controller's own one call site**; the row states explicitly that a consumer's own channel is **a DIFFERENT channel**, and that **a composition whose TOTAL write count is two FAILS `F-9`'s row** (so the loophole closes where it matters) | ruling 6, `§2.3` item 3, `R-13` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **`clampToBounds` is TOTAL, PURE and FORMULA-EXACT**: it returns a `number` for EVERY input, throws for NONE, mutates nothing, retains nothing, and its answer is **either** the `typeof`-gate's `NaN` **or** `Math.max(min, Math.min(value, max))` **verbatim** with both bounds `number`s | Ruling 12's whole content | `§2.3` item 2, `F-1`..`F-8`, `M-2`, `§5.5.1 P-GT-PU-1` |
| **I-2** | **THE SINGLE WRITER: for every gesture, the composition invokes its ONE sink call site AT MOST ONCE, and the gesture's whole write record has length `≤ 1`** | Ruling 6; the `C1` clause | `§2.3` item 3, `M-5`, `F-9`, `§5.5.1 P-GT-SM-3` |
| **I-2b** | **NO WRITE OUTSIDE THE TERMINAL CHANNEL: nothing in this module writes from `onMove`, `onStart`, `onEnd` or `onCancel`, and a `cancel` reaches the sink ZERO times BY CONSTRUCTION** | Ruling 6; the sibling property 2 | `§2.3` item 3, `M-4`, `F-10`, `§2.6` item 2 |
| **I-3** | **THE SESSION IS THE SOLE GESTURE AUTHORITY, AND THE CONTROLLER OWNS NO LIFECYCLE**: the controller never attaches a listener, never calls `session.begin`/`end`/`cancel`, and never writes a channel the session owns beyond its one sink | Ruling 3 — the `SECOND-GESTURE-AUTHORITY` objection's answer; `V-13`'s remedy | `§2.5` items 1/3/6, `R-7`, `R-14`, `§2.6` item 6 |
| **I-4** | **`isResizable` DECIDES ONCE PER GESTURE AND AT ESTABLISHMENT**: called at most once for a gesture, never at install, never at a terminal, never re-consulted; a `false` decision short-circuits every terminal seam for that gesture | Ruling 10 | `§2.3` item 2(b), `§0A` note 6, `M-8`..`M-11`, `§5.5.1 P-GT-IM-3` |
| **I-5** | **THE TOKEN IS OPAQUE**: no member of this module interprets the axis token — it is not compared, stringified, tested, used as a map key, or spelled as a literal anywhere | Ruling 8 | `§2.2` P-5, `M-7`, `R-1` |
| **I-6** | **NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER**: the module contains no `document`/`window`/`globalThis`-rooted access, no element-query token in any form, and it reads no ambient global | `A-d3`; admission clause (B) | `R-2`, Layer anchor 3 |
| **I-7** | **NO LISTENER AND NO CAPTURE OF THIS UNIT'S OWN**: every attach is a `session.install` delegation; the module calls no capture member, and it passes **no `capture` field** to the session | Rulings 3/11 | `R-3`, `R-10`, `M-1`, `§5.5.1 P-GT-SM-2` |
| **I-8** | **THE COMPOSITION BOUNDARY IS A CLOSED SET**: the only session members this module CALLS are `install`, `reset` and `dispose`; the only ones it READS are `stats()`, `gesture()` and `disposed` | Ruling 14; `gsession.md` `§2.5`'s frozen list | `§2.5` item 1, `R-14`, `§3.4 R-7` |
| **I-9** | **NOTHING CARRIES ACROSS A GESTURE**: the controller's per-gesture record (the handle, the token, the resizability decision) is **DISCARDED at every terminal** — including a cancel and a refused terminal; the instance's attached-element ledger and its monotonic counters are the only state that outlives a gesture; **no element-keyed value, cache, memo or map exists** | Prohibition P-6; `gsession.md` `§0A` note 8's shape applied here | `§2.3` item 5, `§2.5` item 6, `M-11`, `M-13`, `§5.5.1 P-GT-SM-2` |
| **I-10** | **THE CONTROLLER IS TOTAL AT THE SEAM: `createResizeController` NEVER throws for ANY argument, and `attach`/`detach`/`reset`/`stats` return their declared shape for every input — a hostile, absent or throwing `session` is DEGRADED to the inert controller, never propagated** | Ruling 8's `session` row; admission clause (B)'s totality standard | `§2.4` items 1/3, `F-16`, `§5.5.1 P-GT-TP-2` |
| **I-11** | **NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: no row of this unit may assert a rendered-geometry, layout, paint, coordinate, applied-CSS or click-retargeting property, and no green of this unit may be reported as one; the module reads NO coordinate and takes NO event object** | `A-d4`'s mandatory clause; the named cost | `§0A` notes 3/11, `R-8`, `§5.2`, `§7` items 2/4, `§5.5.1 P-GT-TP-1` |
| **I-12** | **`clampToBounds` MUTATES AND RETAINS NOTHING**: after any call, both arguments are reference-identical and value-identical to their pre-call state; a frozen pair works exactly like an unfrozen one; there is no module-level mutable state | Purity, and the `-0`/`NaN` readings' stability | `§2.1` item 1, `M-19`, `§5.5.1 P-GT-PU-3` |
| **I-13** | **NO STORE, NO PERSISTENCE, NO MCP SURFACE, NO CENSUS READ**: no file, no `localStorage`, no store object, no IPC method, no tool, no resource, no `RpcCommand` member, **and no census read of any kind** — the `sizes` value reaches this unit only inside the consumer's own closures | Prohibitions P-6/P-10; the dissolved edge | `R-1`, `R-4`, `R-6`, `§2.5` item 2 |
| **I-14** | **THE CODE DOMAIN IS THE SESSION'S SEVEN, VERBATIM, PLUS THIS CONTROLLER'S TWO ENTRY-POINT CODES**: no eighth SESSION member exists, **and neither controller-local code (`'unusable-default'`, `'not-resizable'`) is ever passed INTO the session** | Ruling 9; `gsession.md` `§4.4 S-9`; the must-not list | `§2.1`'s note, `§2.4` item 4, `R-15`, `§4.4 S-11` |
| **I-15** | **`[U]` IS NOT OFFERED AND `[D]` IS NOT CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL**: the module is imported by no `src/**` file and reads no coordinate, so there is no rendered surface to observe and nothing for a measuring leg to measure; `[D]` is precondition-gated on `U-DIVERGENCE-EXT` (`C2`), which does not exist | Ruling 11; `zones.md` `§4.4 S-6` | `§5.2`, `R-8`/`R-9`/`R-11`, `§7` item 5 |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its eleven
prohibitions**. **A prohibition citing *"a static source row"* with no id is not a row** (the sibling
reviews' recurring finding), so **every static claim in this file has an id here**, and **each scan is
closed against the evasion class** (token assembly, comment-carrying, realm-rooted computed access) by
**`§4.4 S-6`'s stop condition**. **Every row here is `static`-layer: it reads this unit's own FILES or
drives an injected argument, never a real DOM.**

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (P-1, P-5, P-8, P-10).** *Over the MODULE's source (`src/shared/gutter.ts`) INCLUDING its comments, no occurrence, in any form, of: a coordinate/event-field token (`clientX`, `clientY`, `pageX`, `pageY`, `screenX`, `screenY`, `offsetX`, `offsetY`, `movementX`, `movementY`, `pointerId`, `deltaX`, `deltaY`, `button`, `buttons`, `isPrimary`); an axis vocabulary token (`horizontal`, `vertical`, `inline`, `block`, `x-axis`, `y-axis` as mechanism vocabulary); a unit or token literal (`'px'`, `'0px'`, `'fit-content'`, `calc(`, `--`, a CSS custom-property prefix); a `threshold` token; a selector token (`selectors`, `querySelector*`, `closest`, `getElementById`); a census token (`census`, `zones`, `revealed`, `specOf`, `sizes`, `trackVar`, `trackProp`, `emptyToken`); or a store/cache token (`localStorage`, `sessionStorage`, `store`, `cache`, `memo`, `persist`).* **The scan reads a NORMALIZED view in which string-literal concatenation is JOINED before scanning (`'client' + 'X'`, a template with substituted parts, a token split across a line break) and COMMENTS ARE SCANNED LIKE CODE**, with a word/identifier BOUNDARY rule. **SCOPE, stated because this row's spelling collides with legitimate text:** the module **must** contain its own result codes and hook names, **and the TEST FILE must carry the banned spellings inside this row's own control data and assertion messages** — so the scan's scope is **the module file (whole, comments included)** plus **this row's OWN controlled corpora**, and **a whole-file negative over the test file is DELIBERATELY DROPPED** (such a scan could only fail). **Controls, both required:** a **POSITIVE control** (a corpus spelling a banned token raw, joined, and inside a comment **FAILS**) and a **NEGATIVE control** (this unit's own legitimate text — the result codes, the hook names, `clampToBounds`'s parameter names — **PASSES**). **A row that passes for a module spelling any banned token in any of those three forms is UNFALSIFIED and must not be filed.** | P-1/P-5/P-8/P-10, `I-5`, `I-13`, `§4.4 S-6` | static |
| **R-2** | **The forbidden-ACCESS row (P-2, P-6; `I-6`, `I-13`).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, a helper returning the realm, and **the no-token realm route** (`({}).constructor.constructor('return this')()`, `Reflect.construct`, `Function.prototype.call`-shaped code construction) — **and no ambient read for a value**: `document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, `matchMedia`, `getComputedStyle`, `getBoundingClientRect`, `activeElement`, `Date`, `Math.random`, `process`, `node:fs`, `localStorage`, `eval`, `new Function`. **STATED LIMIT, so the row is not written unassertably: a BLANKET ban on `[expr]` is NOT claimed** — a **locally constructed object's** computed access and ordinary **array indexing** carry no banned token and are **deliberately not banned**; **a row that asserts "no bracket notation at all" FAILS this row's own text** (`§4.4 S-8`). | P-2/P-6, `I-6`, `I-13` | static |
| **R-3** | **The EVENT-WIRING row (P-3; `I-7`).** *The module performs NO listener attachment and NO capture of its own: it contains no `addEventListener`, no `removeEventListener`, no `setPointerCapture`, no `releasePointerCapture`, no `capturePointer` call, and no `on<event>=`-style assignment; the ONLY attach it can cause is the `session.install` delegation.* **Its falsifiable half:** a module containing any of those tokens as a call **FAILS**, and **an attach that does not go through `session.install` FAILS** (the row drives the recorded session log, `M-1`). **Its honest limit:** a text scan cannot prove the absence of an attach for all control flow — so the row pairs the token scan with the **runtime delegated-log row** (`M-1`, `R-10`), and **the pair is the row**. | P-3, `I-7`, `M-1` | static + `[T]` |
| **R-4** | **The IMPORT-BOUNDARY row (P-9; `§0A` note 2).** *`src/shared/gutter.ts`'s import statements are EXACTLY ONE, and it is a TYPE-ONLY import from `./gesture-session.js`.* **Any second import statement FAILS. A VALUE import from the session module FAILS (the module must need no runtime symbol from it). An import of ANY other path FAILS — `zones.ts`, `census.ts`, `layout-projection.ts`, `owned-list-host.ts`, `slot-host.ts`, `mount-invariant-guard.ts`, `dom-shim.ts`, `types.ts`, the engine, `electron`, `node:*`, `src/main/**`, `src/renderer/**`** — **and a later pass asserting a dependency edge to `U-CENSUS` would be a FABRICATED EDGE** (`census.md` `§1` item 7; `H-r6`). **A later unit that legitimately imports THIS module is not a violation of it** — the row binds THIS module's own imports, and the *"imported by no `src/**` file"* claim is `R-6`'s. | P-9/P-10, `§2.5` item 2, `§8` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/gutter.ts` exports EXACTLY the twelve names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `createResizeController` and `clampToBounds`** (read from the imported namespace's own keys, **by name**, with a **positive control** that a namespace carrying a **third** value export **FAILS**); **(b) THE TYPE-ONLY NAMES — `AxisFor`, `BoundsFor`, `ClampBounds`, `CommitSink`, `DefaultSizeFor`, `IsResizable`, `ResizeController`, `ResizeControllerHandle`, `ResizeControllerOptions`, `ResizeStats` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 4 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text** (`§4.4 S-7`). | `§2.1`, `§5.2` leg 4, `F-16` | runtime + type-level |
| **R-6** | **The NO-SHIM / NO-NEW-SURFACE / NO-IMPORTER row (P-6, P-10; `I-13`).** *The change set does not touch `src/shared/dom-shim.ts` (no member added, no member needed); the five-seam negative holds — `ALL_TOOLS` still the pinned **21-NAME** set, `RpcMethod` still **21** members, `MUTATING_METHODS` still the **7** named entries, `VALID_GROUPS` still **5** members — asserted **by SET EQUALITY AGAINST THE NAMES where a name-complete row exists, and NEVER by a bare count** (`§4.4 S-7`); **and at the time this unit's red set runs, `src/shared/gutter.ts` is imported by NO `src/**` file** (an import-graph probe, `R-12`'s companion claim).* | P-6/P-10, `I-13`, `§5.1` | static |
| **R-7** | **The COMPOSITION-BOUNDARY row (P-4; `I-8`; the `SECOND-GESTURE-AUTHORITY` answer).** *Over the MODULE's source, the ONLY member names READ FROM the session object are `install`, `reset`, `dispose`, `stats`, `gesture` and `disposed`; the ONLY ones CALLED are `install`, `reset`, `dispose` (and `stats`/`gesture` as reads).* **The row asserts the ABSENCE of every forbidden one — `begin`, `end`, `cancel`, `set`, `installGestureListeners`, `detachGestureListeners`, `POINTER_TYPES` — as a token scan over the module's bytes, AND the positive half as a runtime call-log assertion** (`M-1`, `M-12`, `M-13`, `M-14`: the recorded session log contains **no `begin`, no `end`, no `cancel`**). **A call outside the table FAILS.** **Its honest limit:** a text scan cannot prove the absence of a call for all control flow, so **the pair is the row**. | P-4, `§2.5` item 1, `I-3`, `I-8` | static + `[T]` |
| **R-8** | **THE GEOMETRY / MAGNITUDE / COORDINATE ROW (`A-d4`'s mandatory clause, in falsifiable form; P-1, P-8; `I-11`).** *Over the MODULE's source AND over this unit's own `[T]` test file, the change set contains **no geometry-observation call, no coordinate or magnitude read and no geometry-shaped claim**: no `getComputedStyle`, no `getBoundingClientRect`, no `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`/`scrollWidth`-family member, no `matchMedia`, no `style` write, no class write, no `innerHTML`, no `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/`screenY`/`movementX`/`movementY`/`offsetX`/`offsetY` read, and **no assertion whose failure message or description claims a rendered/layout/coordinate/applied-CSS/magnitude fact**.* **Its falsifiable half:** a module or fixture that observes geometry or a coordinate, or a row description claiming a resolution, an applied length or a magnitude, **FAILS**. **Its stated bound (three parts, the form `docs/specs/zones.md` `§3.4 R-7` established):** (a) the MODULE file's raw bytes, comments included; (b) THIS UNIT'S OWN test file's raw bytes; (c) the row DESCRIPTIONS extracted from that test file — with the geometry tokens held as **FRAGMENTS** so the scan cannot read its own rule list, and both halves carrying a **POSITIVE** control (a corpus that reads `clientX`, and a description claiming a magnitude, must FAIL) and a **NEGATIVE** control (ordinary count wording PASSES). **Its honest limit:** a text scan cannot prove the absence of a claim for all prose — the **contract half** is `§5.2`'s refusal to offer a `[U]`/`[D]` row and `I-11`. | P-1/P-8, `I-11`, `§0A` note 11, `§5.2` | static |
| **R-9** | **The absent-page-design row (`§1` item 6; `§7` item 7).** *`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs* — an `fs.existsSync`-style probe (globbed `docs/skills/*` at filing: `process-guardrails.md` alone). **Its FAIL is meaningful: if the file DOES exist, this unit OWES a test-use-case coverage row in that file's coverage matrix plus an entry in its demo-page index** — and **this filing's position is that the unit renders no page, so the row would be an ABSENCE row rather than a claim**, stated here so the obligation is not silently dropped. | `§1` item 6, `§7` item 7 | static |
| **R-10** | **THE CAPTURE-ABSENCE ROW (P-7; `I-7`; ruling 11), with its POSITIVE CONTROL.** *The module contains no `capture` token as an option member, and the object it builds for `session.install` carries **no `capture` field**: the row reads the recorded `install` arguments and asserts the options object's own key SET is EXACTLY `{onStart, onMove, onEnd, onCancel}`.* **THE POSITIVE CONTROL, and it is required so the clause is not vacuously true:** a composition that **DID** pass `capture: true` — or an options object carrying a fifth `capture` key — **MUST FAIL this row.** **The row's second half is the inherited observation**, which it states rather than claims: **because no `capture` field is passed, the session records `capture` falsy for every control, so ZERO capture calls occur both before establishment AND after it** (`gsession.md` `§2.3` item 6(a)) — **the row asserts the ZERO count over a full lifecycle from the recording session's own capture log.** | P-7, `I-7`, `M-1`, `§5.5.1 P-GT-SM-2` | static + `[T]` |
| **R-11** | **THE UI-CONTENT WRITE ROW (P-… the `P-4`-class prohibition, this unit's own form).** *Over the MODULE's source INCLUDING its comments, no occurrence, in any form, of a UI-CONTENT WRITE token: `setAttribute`, `removeAttribute`, `classList`, `className`, `textContent`, `innerText`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `createElement`, `createTextNode`, `appendChild`, `insertBefore`, `removeChild`, `replaceChildren`, and the `style`-write family (`style.setProperty`, `.style.=` and a `cssText` write).* **The scan reads the same NORMALIZED view `R-1` reads** (literals joined, comments scanned as code, a word boundary) **and carries the same two controls: a POSITIVE control** (a corpus spelling one of these tokens raw, joined across a literal boundary, and inside a comment **FAILS**) **and a NEGATIVE control** (this unit's own legitimate text — the result codes, the hook names, `clampToBounds`'s parameter names — **PASSES**). **Its scope is the MODULE file plus this unit's OWN controlled corpora**, and **a whole-file negative over the test file is DELIBERATELY DROPPED** (that file must carry the spellings inside this row's control data). **Its honest limit:** a text scan cannot prove the absence of a write for all control flow, so the row is **PAIRED with a runtime write-log assertion** — a module handed a **write-recording** element must make **no write call of any kind** on it — **and the pair is the row.** **THIS IS THE ROW THAT CAN FAIL FOR A UI-CONTENT WRITE, and it exists because `§1` item 5 forbids this unit a UI.** | `§1` item 5, `I-6`, `§4.4 S-13` | static + `[T]` |
| **R-12** | **The DIFF-SCOPE row (`§5.1`; P-9/P-10).** *Only the files of `§5.1`'s allow-list are touched by this unit's committed range: the module (NEW), the test file (NEW), this spec, the unit's own `*-greens.md`, the unit's own tracker rows, and `archive/reviews/**`.* **A changed path outside that list FAILS the row — and THE DENIED SET BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST**: `src/shared/gesture-session.ts` and `tests/gesture-session.test.ts` named FIRST, then every other sibling `src/shared/*` module and its tests, `src/main/**`, `src/renderer/**`, the app graph, `package.json`, `package-lock.json`, `scripts/**`, `tsconfig.json`, `vitest.config.ts`, the MCP surface, and every sibling artifact (`C5`; `§5.1`). **A non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (a unit's own mandatory gate artifacts must be committable — `RCA-8(a)`); and **the canonical artifacts must be non-vacuously present in the range** (which keeps the row from being satisfied by an empty range). **The row also asserts the companion claim: at the time this unit's red set runs, `src/shared/gutter.ts` is imported by NO `src/**` file.** | `§5.1`, `C5`, `§7` item 6 | static |
| **R-13** | **THE SINGLE-WRITER / WRITE-COUNT ROW (P-11; `I-2`, `I-2b`; ruling 6 and `C1`), A PAIR.** *Runtime half:* over a full lifecycle set (an `end`, a `cancel`, an `isResizable: false` end, a refused terminal, a reset), **the sink's own call record and the controller's `stats().sinkCalls` AGREE — and the record's length for a gesture is `≤ 1`** — *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this runtime half AS FILED read *"AGREE, and the record's length for a gesture is `≤ 1`"* as if the agreement held for EVERY composition, which would contradict `F-9`'s own positive control. THE RULED FORM: for the CORRECT (single-writer) composition the sink's record and `stats().sinkCalls` BOTH read `1`; for the TWO-WRITER composition the SINK'S OWN RECORD reads `2` while the CONTROLLER'S COUNTER still reads `1` — the DIVERGENCE is what makes the row falsifiable, so BOTH readings are asserted and a composition cannot pass by counting only its own calls. The as-filed wording is kept visible at `§5.5.1 P-GT-SM-3` and `§3.2 F-9`.)* — with **`F-9` (two writers) and `F-10` (no writer) as the two POSITIVE controls, which the same row drives and which must FAIL.** *Static half:* **the module contains exactly ONE call of the sink reference** (the row counts call sites in the normalized source, and **a second call site FAILS**). **Its honest limit, stated: a call-site count is a text claim about control flow** — so **the pair is the row**, and the runtime half is what `P-GT-SM-3` quantifies. | ruling 6, `C1`, `§2.3` item 3, `§5.5.1 P-GT-SM-3` | static + `[T]` |
| **R-14** | **THE SESSION-CALL-CENSUS ROW (P-4; `I-8`; ruling 14).** *Over the module's source and over a recorded session log:* **the module READS the session only through `stats()`, `gesture()` and `disposed`, and CALLS only `install`, `reset` and `dispose`** — **asserted BY NAME, not by a count** — and **`session.begin` appears in NO call log and in NO byte of the module.** **The row's `[T]` half is the recorded-log assertion (`M-1`, `M-12`, `M-13`, `M-14`, `M-16`); its static half is the token scan.** **A row asserting this by *"the module calls the session `N` times"* FAILS `R-14`'s own text** (`§4.4 S-7`). | `§2.5` item 1, `I-3`, `I-8`, `R-7` | static + `[T]` |
| **R-15** | **THE CODE-PROPAGATION ROW (P-11's neighbour; `I-14`; ruling 9).** *Over a table of session-refusal shapes* — a disposed session, a stale handle, no active gesture, a busy session, an uninstalled element — **the controller returns the session's own code VERBATIM, and the string that reaches the caller is byte-identical to the one the session returned** (read from the recorded session log, compared by `===`). **The row also asserts the closed-set half: the module's own code literals are exactly the seven session members PLUS `'unusable-default'` and `'not-resizable'`, and NOTHING ELSE** — **an EIGHTH SESSION member appearing in the module, or a controller code being passed INTO `session.reset`, FAILS** (`§4.4 S-11`; the must-not list). *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this row AS FILED read *"the seven session members PLUS `'unusable-default'`"*; the ruling declares a SECOND controller-local code, `'not-resizable'`, so the closed set this row asserts is the NINE-member domain of `§2.3` item 4's table — the session's seven, verbatim, plus the two local codes. The LANDED test file's `R-15` assertion reads the as-filed eight-member list, so it needs the second code added BEFORE the Implementer's green; THIS PASS MAY NOT EDIT IT (`§5.1`'s DENIED set) and the residue is reported here.**)* | ruling 9, `I-14`, `§2.4` item 4, `§2.5` item 5 clause 6 | static + `[T]` |

**What these static rows do NOT do.** They add **no `§3` contract behaviour**: each asserts a property of
**this unit's own files** or a **runtime call log**, and **none may be satisfied by a claim about a
browser or a renderer**. They land in the **SAME test file** as the red set and **change no register
statement, type, strategy id or attempt count** (`§5.5.1`).

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-16** | **The module-absence row (`§4.1`'s red premise) — TWO FORMS, and BOTH are the row.** **THE RED FORM (governing AT RED TIME):** *at the moment the red set is AUTHORED and RUN, `src/shared/gutter.ts` does not exist and `tests/gutter.test.ts` is the only unit-owned file in the change set* — an `fs.existsSync`-style probe; **if the module EXISTS before the red run, this row FAILS and the `RCA-1` red order is broken — the pass that finds it must REPORT the inversion rather than proceed.** **THE GREEN FORM (governing AT GREEN TIME, added so the row survives the cycle):** *in the state where `§5.1` row 1 (the module, NEW) has LANDED, the module EXISTS, the unit-owned change set is EXACTLY the module + this test file (no OTHER `gutter*` path anywhere in `src/**` or `tests/**`), both canonical artifacts are present, the census is asserted NON-EMPTY before the equality, and the red-run census recorded the red form.* | `§4.1`, `RCA-1`, `§4.2` item 1 | static |
| **R-17** | **The `[D]`-precondition row (`§2.6`'s named precondition, probe-able).** *At the time this unit's red set is authored, the extended divergence harness DOES NOT EXIST* — a probe on the `H-r10` deliverable (`U-DIVERGENCE-EXT`, ledger row `C2`: the scenario-envelope channel + the attribute-presence extractor), whose row is `BLOCKED`. **Its FAIL is meaningful and welcome: if the harness HAS landed, a `[D]`-shaped row becomes runnable and this unit MAY then take it — with that harness's own spec as its authority and its own preconditions stated.** **Until then `[D]` stays unclaimed and no pass may claim it** (`§5.2`). | ruling 11, `§2.6`, `§5.2`, `§8` | static |
| **R-18** | **The session-precondition row (the composition's own premise, probe-able).** *At the time this unit's red set is authored, `src/shared/gesture-session.ts` EXISTS and exports the four value exports `createGestureSession`, `installGestureListeners`, `detachGestureListeners` and `POINTER_TYPES`, and its `EventSource` declares the optional `capturePointer` member* — an import-and-key probe **BY NAME**, with **a positive control that a namespace missing one of those names FAILS**. **Its FAIL is meaningful: this unit composes that surface, and a missing name would mean the frozen delegate surface moved** (`§8`'s `GSESSION-DELEGATE…` row) — **which is a finding to REPORT, never a licence to edit the session's module or its spec** (`§5.1`'s DENIED set). | ruling 5, `§2.5`, `§5.1`, `§8` | static |

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/gutter.test.ts`** (`§0A` note 1) — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/gutter.js'` (or the repo's equivalent module-resolution failure) for
every row that imports the module, **plus the static/existence rows that can already be evaluated** —
`R-9` (the absent-page-design probe), `R-12` (the diff scope), `R-16` (the module-absence probe) and
`R-17` (the `[D]` precondition), **which need no module at all**; `R-4`, `R-5`, `R-6`, `R-7` and
`R-18`'s session half are evaluable **immediately** as well, because **the session module already exists**
— **while `R-1`/`R-2`/`R-3`/`R-8`/`R-10`/`R-11`/`R-13`/`R-14`/`R-15` scan THIS module's bytes and become
evaluable exactly when it lands** (which is what `R-16`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely
additive**, and **the unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that the contract's CALL
COUNTS and its pure-function arithmetic behave as `§2`/`§3` say over the enumerated drivers** — the
provable half `A-d4`'s clause names. It is **NOT** evidence that any pane resizes, that a pointer drag
works, that a real element received an event, that a CSS custom property was applied, that a layout pass
ran, that a `click` was not retargeted, or that the app behaves differently — **in particular, at the end
of this cycle the module is still imported by NO `src/**` file** (`R-12`'s companion claim).

### 4.2 Red-set authoring order

1. **The `§3.5` existence/precondition rows `R-16`/`R-17`/`R-18` FIRST** — they are the red's own premise
   and are evaluable before this unit's module exists.
2. **Then the `§3.4` static rows `R-1`..`R-15`** (`R-4`/`R-5`/`R-6`/`R-7` are evaluable immediately;
   `R-1`/`R-2`/`R-3`/`R-8`/`R-10`/`R-11`/`R-13`/`R-14`/`R-15` read the module file and are evaluable
   **once it exists**).
3. **Then the `clampToBounds` block `M-2`, `M-19`, `F-1`..`F-8`** — the pure function's rows come before
   the composition's, because **the composition's contract depends on the clamp's answer** and a red on
   the pure half is diagnosis a green cannot give.
4. **Then the invariants `I-1`..`I-15`**, then **`M-1`, `M-3`..`M-18`**, then **`F-9`..`F-19`**, then the
   composition-boundary rows — **in that order** (`F-9`/`F-10`, the two positive controls, sit with the
   write-count rows they make falsifiable). **⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS): `M-20`
   (the `detach()` multi-element limb) is APPENDED as the next free `M-` id and takes its place WITH the
   `M-` group above — no id moved, and the landed test file's `M-1`..`M-19` group already carries it as an
   arm of `M-13` (`M-20`'s own cell names that carrier).**
5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**,
   after the `F-*` rows, **in register order** (`P-GT-PU-1` · `P-GT-PU-2` · `P-GT-PU-3` · `P-GT-IM-1` ·
   `P-GT-IM-2` · `P-GT-IM-3` · `P-GT-IM-4` · `P-GT-SM-1` · `P-GT-SM-2` · `P-GT-SM-3` · `P-GT-SM-4` ·
   `P-GT-TP-1` · `P-GT-TP-2`). They ride **`npm test` (leg 1)** unchanged and **need no new file, no new
   script, no `package.json` change and no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and
   existence row that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are
   recorded. **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first,
   with the old text kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order**
with **STOP AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop
early**, and **the un-run rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run
that reports all `299` attempts as executed is the finding, not the expectation.** *(**⟶ CORRECTED
2026-09-27, THE RED-RUN AMENDMENT PASS: this sentence AS FILED read `314`; the DECLARED total is the sum
of the register's own thirteen printed terms, `299`, and the term-by-term addition is at `§5.5.3`. The
as-filed `314` is kept visible at `§5.5.3` and in the `⟶ RECORDED` block at the file's top status area;
NO ROW'S TERM MOVED and the stop-after-5 rule this sentence depends on is unchanged.**)* **The register's
execution markings are DESIGN, not results**: **a row that is marked executable in `§5.5.1` but broken
when run is a SPEC FINDING, reported rather than tuned to green.**

### 4.3 What the red is NOT

- **Not a DOM test, and not a test of a controller of the DOM.** **No real `Element`, no `document`, no
  shim member, no rendered pane**: **the element is any object the row chooses**, the **session is either
  the landed session driven through a recording source or a recording double of its own**, and the
  **sink is the row's own spy** (`§4.4 S-8`'s class).
- **Not a geometry test, and not a magnitude test.** No coordinate read, no layout, no
  `getComputedStyle`, no `getBoundingClientRect`, no applied CSS custom property — **`R-8` is the row that
  forbids it**, and `I-11` is the invariant.
- **Not a session test.** **No row of this unit asserts a session property**: the session's lifecycle,
  its listener counts, its commit counts and its baseline restore are `U-GSESSION`'s rows
  (`docs/specs/gsession.md` `§3`), and **this unit reads only the session's surface through its own
  calls** (`§4.4 S-9`).
- **Not a census test, and not a `U-CENSUS` test.** **No row may need a census key set, a `zones` /
  `revealed` / `specOf` map, a `sizes` map held by this module, or a track-variable name** (`§4.4 S-12`);
  a consumer's `sizes` value appears **only inside the row's own injected closures**.
- **Not a real-browser event test, and not a retargeting test.** A `[T]` green cannot show that a real
  `pointerdown` reaches a handler, that capture behaves in a renderer, or that a press's `click` is not
  retargeted — **that is precondition-gated on `U-DIVERGENCE-EXT` (`C2`)** and **`[D]` is unclaimed**
  (`§5.2`).
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a consumer-vocabulary test.** A row naming a real zone/pane/tab, a selector, a threshold, a unit
  string or a CSS token is a **`P-1`/`P-5` violation** — such spellings may appear **only** inside `R-1`'s
  own control corpora.

### 4.4 The stop conditions (binding)

**The first five are ruling 12's `S-PURE-1..5`, derived VERBATIM in substance; the rest are the classes
the gate-1 record and this filing's own surface require.** **All thirteen bind the red set, the
implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-PURE-1** | A row is only satisfiable if the clamp **COERCES** (`Number(value)`, `parseFloat`, `+value`, a `String` round-trip) or **PARSES** a numeric string | **Violates ruling 12** — a non-number `value` answers `NaN` (`F-1`). **Re-write the row; never weaken the limb.** |
| **S-PURE-2** | A row asserts a **`code`/`reason`/`ok`/`skipped`/result-record** shape from `clampToBounds`, or expects a **throw** from it | **Violates ruling 12 and `§0A` note 8** — **the pure function has NO refusal domain** and every outcome is a VALUE. **Re-write as a value assertion; adding a union is a NEW CONTRACT and needs its own gate.** |
| **S-PURE-3** | A row is only satisfiable if the clamp **supplies a built-in literal** — a default pair, a `'0px'`, a `min`/`max` constant, a sentinel number | **Violates ruling 12's `no built-in literal` and `P-5`** — **every bound is caller-supplied; the only literals the function owns are its two parameter names and its formula's operators.** |
| **S-PURE-4** | A row needs a **SECOND CLAMP SITE** — a pre-normalising clamp inside a seam wrapper, a clamp in `attach`, a clamp in `reset`'s refusal path, a "sanitising" clamp of a caller's default before the documented one | **Violates ruling 12's `no second clamp` and `§2.3` item 1(iii)** — **exactly ONE clamp site exists.** **Stop and report: it is a contract change.** |
| **S-PURE-5** | A row asserts a **rendered-geometry, coordinate or magnitude** fact about the clamp or its result (an applied width, a resolved CSS length, a pixel measurement) | **Violates `A-d4`'s mandatory clause and `I-11`** — the claim is **DELETED**; this spec offers **no `[U]` row**, and **the row may not be moved to another leg silently** (`S-9` below). |
| **S-6** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed** (the architect's `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED` rule: *a static prohibition satisfiable by splitting a token is not satisfied*). The row forms are `R-1`/`R-11`. |
| **S-7** | A row asserts a prohibition by a **bare COUNT** (*"`ALL_TOOLS` stays 21"*, *"two exported values"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a seam.** The row must assert **SET EQUALITY AGAINST THE NAMES** or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-5`/`R-6`/`R-12`/`R-14`), and an existence claim must be an `fs.existsSync`-style **probe whose FAIL is meaningful** (`R-9`/`R-16`/`R-17`/`R-18`). |
| **S-8** | A test needs a **real DOM**, a real element, **a `document`**, a shim member, or a **second controller's private state** to express a row — or a row asserts that this module **DETECTS a second controller** | **Violates the layer declaration's anchor 2, `§2.5` item 4's stated LIMIT and `R-2`'s stated limit.** The row is re-written against the **recorded session doubles and the sink spy** (`M-1`'s form). **A row that needs a DOM, or that claims a detection the mechanism does not have, is a row this unit cannot have.** |
| **S-9** | A row asserts a **rendered-geometry, coordinate, layout, paint, applied-CSS, capture-in-a-renderer or magnitude** property — or a `[T]` green is to be reported as one | **Violates `A-d4`'s mandatory clause, `I-11` and `R-8`** — the claim is **DELETED**; this spec offers **no `[U]` row and no `[D]` row**, and `§5.2` states why. **The row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** — `docs/specs/zones.md` `§4.4 S-6`'s own words, which this unit's `[U]` clause carries (`§5.2`). |
| **S-10** | A row is only satisfiable if the **session COMPUTES, CLAMPS, DEFAULTS or VALIDATES a value**, or if the **controller re-expresses the session's lifecycle** — a start listener of its own, a `session.begin` call, a gesture guard, a listener window, a disposal order, a second commit channel | **Violates rulings 3/6 and `§2.5` item 3** — the session is the single gesture authority and `A-d3`'s shape is the composition's premise. **Stop and report: it is a contract change needing its own gate, not an implementation choice.** |
| **S-11** | A row proposes **an EIGHTH session result code**, a **fourth session outcome**, a **fifth hook**, a `selectors`/`threshold`/`unit` parameter, an **options field that could smuggle a policy default in**, or a **second writer** | **Each is a contract change.** The session's SEVEN-member union (`gsession.md` `§4.4 S-9`), the frozen delegate surface and ruling 6's single sink are the contract; **stop and report to the supervisor.** **This unit's own `'unusable-default'` is NOT an eighth session code — it never enters the session** (`§2.1`'s note, `I-14`). |
| **S-12** | A row needs a **sibling import**, a **census read**, a `zones`/`revealed`/`specOf`/`sizes` parameter of this module's own, a **store**, a **persistence channel**, or a **shim change** | **Violates ruling 14, `census.md` `§1` item 7 and `P-9`/`P-10`** — **a dependency edge asserted toward `U-CENSUS` would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class). **Stop and route the row to its owner** (`U-CENSUS`, the consumer, or the session). |
| **S-13** | A row (or the implementation) **authors UI content** — a class write, an attribute write, a style write, a text or markup write, a created element, an appended node — or claims a rendered affordance | **Violates `§1` item 5** (`E3` ships no UI; the real gutter UI is `E10`, `PROPOSED`) **and the `AGENTS.md` project-wide provident-rendered-UI constraint**: a UI element authored outside the provident graph is a review finding. **The row is deleted, and the obligation is routed to `E10`** — **`R-11` is the row that FAILS for a write.** |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken
a row to reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist** (*done: this filing*),
**(b) a TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), and **(c) the
supervisor's ordering** — and `E3`'s ledger row stays an open `## OPEN` row whose status is the
supervisor's. **No status is advanced by this filing**, and `E3`'s `Blocked on` cell's dependency
(`U-GSESSION` alone) is **satisfied by `## DONE — U-GSESSION`** (`§2.5` item 2's dissolved edge).
**`U-RELOCATE` (`E4`) is unblocked on the landed session's delegate surface in the same sense — while its
own spec, red set and gates remain its own** (`RCA-2`).

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — `C5`'s DENIED SET, NAMED FIRST

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/gutter.ts` | **NEW** — the **two value exports + ten type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/gutter.test.ts` | **NEW** — the red set (`§4.2`), the register rows and the static/existence rows | always |
| 3 | `docs/specs/gutter.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/gutter-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/gutter-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and a **sibling spec** only for a dated status/annotation correction that changes **no normative clause** | the pass that produces them |

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST
(`C5`). The frozen files are NAMED FIRST:**

1. **`src/shared/gesture-session.ts`** — **FROZEN** (the landed session's module; this unit composes it,
   never edits it).
2. **`tests/gesture-session.test.ts`** — **FROZEN** (the session's test file).
3. **Every other sibling `src/shared/*` module and its test file** — `zones.ts` · `census.ts` ·
   `layout-projection.ts` · `owned-list-host.ts` · `slot-host.ts` · `mount-invariant-guard.ts` ·
   `dom-shim.ts` · `types.ts` · **and every existing test file of another unit**.
4. **`src/main/**`** and **`src/renderer/**`** — the app's process boundaries.
5. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change.
6. **`package.json`** and **`package-lock.json`** — no script, no dependency, no devDependency. **In
   particular LEG 4 (`§5.2`) adds NO SCRIPT: it is a standalone invocation.**
7. **`scripts/**`** — no helper, no leg driver.
8. **`tsconfig.json`** and **`vitest.config.ts`** — no include/exclude/compiler-option change.
9. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member,
   no `MUTATING_METHODS` entry, no IPC method, no registration site.
10. **Every sibling artifact** — a sibling unit's `*-greens.md`, its review record, its tracker-only rows,
    **and `docs/specs/gutter-review.md` (the closed gate-1 record, whose twelve rulings this spec derives
    and may not re-litigate)**.
11. **`docs/specs/gutter-ui.md`** — **`E10`'s** spec, if and when the architect admits that unit: **not
    this unit's file** (ruling 12).

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule,
stated so a scope row cannot mistake correct gate work for a boundary violation** (the lesson from the
last three passes): a diff-scope row asserted over a **commit range** must scope its **allow-list census
to THIS UNIT'S OWN ARTIFACTS** — *the module, this unit's test file, this spec, this unit's own
`*-greens.md` and `archive/reviews/**` record, and the unit's own tracker rows* — and **must NOT read a
later unit's commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this unit's
diff.** **The DENIED set is the exception and is the half that binds the WHOLE committed set**: a denied
path anywhere in the range **FAILS** the row regardless of which pass committed it. **A non-denied path
outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires
every gate boundary to leave a commit, including this unit's own). **The canonical artifacts must be
non-vacuously present in the range**, and **`§3.4 R-12` is the row that carries this rule.**

### 5.2 The legs this unit MUST run — THE FOUR, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — and for this unit it proves **contract call counts and the pure function's arithmetic**, and **nothing** about a renderer (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the ten type declarations, the two value signatures and the controller's members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables** (`docs/pending.md` §H records the same limit for every unit). |
| **3** | **build** | `npm run build` | **[H]** | esbuild, **FIVE BUNDLES**. **This unit adds a module imported by nobody, so the bundle set and its output must be BYTE-IDENTICAL** — a bundle census that changed is a FINDING, and a bundle census that did **not** change is **not** evidence the module works. |
| **4** | **standalone strict `tsc --noEmit` over `tests/gutter.test.ts`** — the named leg for `R-5`(b) | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts ten **TYPE-ONLY** names, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while **leg 2 does not compile `tests/**` at all**. The honest leg is a standalone strict `tsc` over the test file: if any of the ten names is renamed, removed or left unexported, the file **FAILS TO COMPILE**. **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION** (ruling 11): it adds **no script to `package.json`, no dependency and no diff-scope row**, and **no register row depends on it** — **the `docs/specs/gsession.md` `§5.2` leg-4 precedent, whose lesson is recorded there and in `docs/specs/census.md` `§5.2`: in the preceding units this leg was the ONLY leg that could see a type error in a test file, and it caught one.** **A DONE row that reports `R-5`(b) as green must cite THIS leg, not a runtime assertion.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as ruling 11 requires.
A one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — including the controller's
   call counts, the clamp's arithmetic, the write counts, the reset surface and every static row.
   **`[U]` is the real-Electron observation leg** (`npm run ui`, landed by `U-REALDOM-BOOT`), and **no row
   of this unit is run there.**
2. **THE STRUCTURAL REASON, in the ledger's own words.** *"The **contract** and its **call counts** are
   provable here; **any rendered-geometry claim is UNPROVABLE in this repo today**."* **Concretely, and
   this is why the reason is STRUCTURAL rather than a leg-availability excuse: (a) the module is imported
   by NO `src/**` file** (`R-6`, `R-12`) — **so there is NO RENDERED SURFACE TO OBSERVE**; **and (b) the
   module READS NO COORDINATE** (`§2.2` P-1, `I-11`) — **so there is NOTHING FOR A MEASURING LEG TO
   MEASURE.** **The `ui` leg exists and is green, and the divergence leg is green
   (`R13 RESULT: 9 checks, 0 failures`) — the refusal is not an excuse about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row **may not be moved to the
   `ui` leg silently**."*** **Any later pass that wants a rendered-geometry row for this family must get
   it from the unit that OWNS the rendered surface** — **ledger row `E10`** (`PROPOSED — awaiting
   admission`), **whose spec, preconditions and `[U]` battery are its own, and which `E3` does NOT owe**
   (ruling 12). **A `[U]` row moved here silently is `§4.4 S-9`, and it does not land.**

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED.** **The divergence leg is the
shim ≡ real identity leg (`npm run divergence`, `N = 9` pinned, `H-r18`'s HARD constraint) and it is
green — but the EXTENDED harness (`U-DIVERGENCE-EXT`, ledger row `C2`: the scenario-envelope channel +
the attribute-presence extractor) DOES NOT EXIST**, so **no `[D]`-shaped row of this unit is runnable**:
**`R-17` is the probe that states it**, and **no pass may claim `[D]` evidence from the existing pinned
leg, from this unit's node green, or from an assumed `C2`.** **If `C2` lands, a `[D]`-shaped row becomes
possible — with that harness's own spec as its authority and its own preconditions stated.**

**GATE 6 IS STRUCTURAL, NOT WAIVED.** The live-app verification gate is **not waived by this filing and
not satisfied by it either**: **gate 6's honest status is that the live app CANNOT REACH this module** —
it is imported by no `src/**` file and appears in none of the five bundles — **so gate 6 is closed by the
same structural reason `[U]` is refused** (the shape `docs/specs/gsession.md`'s `CURRENT STATE` and
`docs/specs/census.md` `§1` item 6 already use), **and the DONE row must STATE the structural reason
rather than omit the gate** (`§5.3` item 7). **A DONE row that reports gate 6 as "waived" is a review
finding; the correct form is "structural — no importer, no rendered surface, and the reason stated".**

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all ELEVEN
items**:

1. **Unit + wave + status**: `U-GUTTER` · wave **E** (ledger row `E3`) · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"a node-local resize controller composed on the
   landed session plus an exported pure `clampToBounds` and nothing else: **all values injected**; **one
   commit per gesture**; **`cancel` ⇒ zero commits and zero sink writes**; **`reset` ⇒ at most one commit
   of the CLAMPED supplied default**; **no capture before establishment (inherited and OBSERVED)**; **NO
   DRAG ARITHMETIC, NO COORDINATE, NO MAGNITUDE — a NAMED COST**; no bounds of its own, no axis
   vocabulary, no unit string, no census read, no store, no session code, no UI."* **A DONE row that does
   not state this is a review finding** — it is the unit's defining constraint (`§1` items 2/3/4/5).
3. **The surface confirmation, explicitly**: *"`src/shared/gutter.ts` exports exactly **TWO value exports**
   (`createResizeController`, `clampToBounds`) and **TEN type declarations** (`AxisFor`, `BoundsFor`,
   `ClampBounds`, `CommitSink`, `DefaultSizeFor`, `IsResizable`, `ResizeController`,
   `ResizeControllerHandle`, `ResizeControllerOptions`, `ResizeStats`) — **`2 + 10 = 12` names** — its
   factory options carry **exactly SEVEN seams** with **`capture` ABSENT**, and it is **imported by NO
   `src/**` file**."* **The census is `§2.1`'s and `R-5` is its row.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which
   register rows ran and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**`
   ONLY*** · `npm run build` `[H]` (**the five bundles byte-identical**) · **leg 4** (the standalone
   strict `tsc` over `tests/gutter.test.ts`) — **and the explicit sentence that the node-suite green is
   envelope/pure-layer evidence and NOT assembled-app evidence**, and for this unit **that it proves
   nothing about a rendered pane, a pointer drag, a coordinate, an applied CSS value, a layout pass or a
   click retarget.**
7. **The `[U]`/`[D]` status, and gate 6's structural status**: **`[U]` not offered**, with `§5.2`'s
   **THREE-PART** clause (the refusal · the structural reason — no importer; no coordinate read · the
   `zones.md` `§4.4 S-6` sentence *"may not be moved to the `ui` leg silently"*); **`[D]` not claimed**,
   with its `PRECONDITION-GATED` status on `U-DIVERGENCE-EXT` (`C2`) and **`R-17`'s probe result
   stated**; **gate 6 stated as STRUCTURAL, not waived**, with its reason. **A DONE row that claims a
   rendered-geometry proof, a `[D]` row, or a waived gate 6 is a review finding** (`I-11`, `R-8`, `§5.2`).
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, **MANDATORY per completed
   unit**, **including the gate-11 read-only PBT audit of `§5.5.1`'s executed tables and the
   pool-versus-boundary check re-run against the landed tables**) and the **blind-greens +
   per-unit documentation-review records** (`AGENTS.md` items 10a/10d, RCA-4/RCA-6 — the blind set is
   **`docs/specs/gutter-greens.md`**). **A DONE row that cites no adversarial pass is a review finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this
   unit's only dependency is the landed `U-GSESSION`, that `U-CENSUS`'s edge is DISSOLVED, and that
   `E10` is a `PROPOSED` row the architect has not admitted and which `E3` does not owe** (`§2.5` item 2,
   `§1` item 5).
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken** counts, **each row's strategy id (`S-GT-*`)**, the **pinned seed
    `20260927`** and its **step form** where a generator is used, the
    **stop-after-5-consecutive-failures status** (`not triggered`, or `triggered at row …`), the **total
    attempts reported against the `≤400` cap** with **every row's count against the `≤100` per-row cap**,
    and **the explicit sentence that every row whose property text quantifies over a domain larger than
    its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it states.**
    **A DONE row that reports the register as "executed" without these per-row counts and strategy ids is
    a review finding** — the markings are **execution DESIGN**, and **a read-only PBT audit may not accept
    this spec's table alone**: it reads the counts here **and** the TestWriter's tables in
    `tests/gutter.test.ts`. **⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS): THE DONE ROW'S
    ARITHMETIC IS THE CORRECTED ONE — `299` DECLARED, `299` = its thirteen printed terms, the caps
    compared against `299`, with the as-filed `314` named as the corrected mis-sum (`§5.5.3`).** **Two
    cells carry NO attempt term and MUST NOT appear in this item's arithmetic: the register-space clause
    cell `P-GT-SM-5` (the `detach()` multi-element limb) and the `§3.1` row `M-20` it points at — both
    added by this pass, neither counted.**
11. **The register's ARITHMETIC and its DUAL COUNT.** The DONE row must print the **total WITH its
    per-row terms** — **`299` = `60` (`P-GT-PU-1`) + `11` (`P-GT-PU-2`) + `10` (`P-GT-PU-3`) + `18`
    (`P-GT-IM-1`) + `20` (`P-GT-IM-2`) + `22` (`P-GT-IM-3`) + `28` (`P-GT-IM-4`) + `20` (`P-GT-SM-1`) +
    `15` (`P-GT-SM-2`) + `5` (`P-GT-SM-3`) + `12` (`P-GT-SM-4`) + `60` (`P-GT-TP-1`) + `18`
    (`P-GT-TP-2`)** — **and must reconcile that figure against the tables the test file actually
    produces**: **a total that is not the sum of its own terms is a review finding**
    (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE). **⟶ CORRECTED 2026-09-27
    (THE RED-RUN AMENDMENT PASS): this item AS FILED printed `314` as the total for exactly these
    thirteen terms — the term-by-term addition is `60 → 71 → 81 → 99 → 119 → 141 → 169 → 189 → 204 →
    209 → 221 → 281 → 299`, so `314` was a MIS-SUM and the declared total is `299` (= `81` `PU` + `88`
    `IM` + `52` `SM` + `78` `TP`). NO ROW'S TERM MOVED; the caps are compared against `299`.** **Where a
    row's attempts
    are several assertions over ONE execution, or a count of DISTINCT inputs rather than of DRIVES, the
    DONE row must report BOTH the declared attempts and the honest DISTINCT-DRIVE figure** — here
    **FOUR rows carry both**: `P-GT-PU-2` (`11` declared / `2` distinct `(value, bounds)` pairs — **and it
    declares its `(bounded)` marking for exactly that reason**), `P-GT-IM-2` (`20` declared / `18`
    distinct seam-path observations), `P-GT-SM-1` (`20` declared / `19` distinct path×shape pairs), and
    `P-GT-SM-4` (`12` declared / `11` distinct entry-point observations) — **while `P-GT-SM-3`'s `5` is
    `5` distinct drives, not five assertions over one execution.** **The DECLARED figures are what the
    caps are compared against; the distinct-drive figures are reported BESIDE them and never substituted
    for them.** **A DONE row that quotes the total alone, or that substitutes a distinct-drive figure in
    the cap comparison, is a review finding.**

**⟶ RECORDED: the `§5.3 → §5.5` numbering gap (there is NO `§5.4`) is DELIBERATE and needs NO fix** — it
is the same deliberate gap in the sibling specs (`docs/specs/gsession.md`, `zones.md`, `census.md`,
`projection.md`, `listhost.md`, `slothost.md`), recorded by their documentation reviews (`AGENTS.md`
item 10d / RCA-6). **`§5.3` is the DONE-row shape and `§5.5` is the property register; NO clause is
missing — the section simply does not exist. Renaming or renumbering is FORBIDDEN for citation
stability.** **This file has NO `§5.5.0`**: it was filed **after** the gate-11 ruling and carries its
register **from the start**, so there is no superseded zero-row exemption to keep verbatim. **`§5.5` is
followed by `§5.5.1`, `§5.5.2` and `§5.5.3`, and nothing else.**

---

## 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`H-r4` obliges an explicit zero-row/typed-PBT decision per unit, and gate 11 makes the register
MANDATORY BEFORE the red set for a code-bearing unit.** **This repo HAS NO PBT HARNESS**: `package.json`'s
`devDependencies` key set is the **five keys** `@types/node`, `electron`, `esbuild`, `typescript`,
`vitest` — **no `fast-check`, no `hypothesis`, no property runner**. **This unit is CODE-BEARING** (a real
controller with two value exports, an injected-seam surface, a state machine and a pure function), so the
**recorded ZERO-ROW EXEMPTION IS NOT AVAILABLE to it** (`docs/decisions.md`'s ACTIVE row
`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, whose exemption is restricted to genuinely invariant-free /
doc-only / config-only / non-JS units). **`§5.5.1` below is therefore a real typed register**, executed by
**plain deterministic vitest tables**, **with NO new dependency, no fifth leg and no `package.json`
change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE (`docs/decisions.md`'s ACTIVE row
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`, part 1).** **A register
ENUMERATES every discernible testable property of its unit; the per-section threshold (`≤ 8`) is a
BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates `13` rows and reports the count as
its EXTENT — no property was dropped, merged or left unenumerated to fit a threshold**, and **`13` IS AN
OUTCOME, NOT A TRIM** (it is ruling 10's own family set: `3` + `4` + `4` + `2`). **The unit's own
recommendation on the breakdown signal is recorded at `§5.5.2` item 1.** **No row of this register is an
`F-` row**, and **no `§6`/`FS-n` citation appears as a register row.**

**⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS) — ONE REGISTER-SPACE CELL IS ADDED, AND NO
ATTEMPT-BEARING ROW IS ADDED OR REMOVED.** **The gate-3 red set reported that `detach()`'s
MULTI-ELEMENT limb — the `§7a.1` item 2 WORKING DEFAULT, where `detach()` refuses (`false`, ZERO session
calls) while MORE THAN ONE element is attached — was stated only in prose and carried by no explicit
cell; the red set drives the limb as an arm INSIDE `M-13` (`§3.1`).** **THE RULING: the limb gets an
explicit cell.** **This pass adds it as `P-GT-SM-5` — a `§3.1`-class CLAUSE cell, appended AFTER
`P-GT-SM-4` in the `SM` family (an in-place ADDENDUM, NOT a renumbering: no existing id moves and
`P-GT-TP-1`/`P-GT-TP-2` keep their positions).** **AND THE DECLARED-TERM ARITHMETIC DOES NOT MOVE: the
register is STILL `13` ATTEMPT-BEARING rows in the same four families (`3` + `4` + `4` + `2`), whose
thirteen terms sum to `299`.** **`P-GT-SM-5` CARRIES NO ATTEMPT TERM** — it is named a register sibling
but is deliberately **OUTSIDE the `299` total and outside the `≤400`-cap comparison**, exactly as the
sibling units name a rule list without counting it, **so NO ROW WAS ADDED TO THE REGISTER'S ATTEMPT
SPACE and no cap comparison changes.** **The `SM` family therefore prints `5` cells
(`P-GT-SM-1`..`P-GT-SM-5`) of which four are attempt-bearing — stated here because a reader who counts
cells will otherwise read `14`.** **This is a `TEST-SIDE` residue: the landed test file does not yet
drive an explicit `P-GT-SM-5` cell (its list at the file's register-order block names the original
thirteen), and THIS PASS MAY NOT EDIT IT (`§5.1`'s DENIED set).**

### 5.5.1 THE REGISTER — **`13` typed rows in FOUR families, ALL executed by design**

**What this section is, in one sentence.** A **typed register of `13` rows** whose **six genuine
quantifications in the ledger's own words** — (i) *the pure clamp's TOTALITY over its whole enumerated
input space*; (ii) *one commit per gesture, over EVERY gesture and EVERY sink shape*; (iii) *`cancel` ⇒
zero commits and zero sink writes*; (iv) *`reset` ⇒ at most one commit of the CLAMPED supplied default*;
(v) *no capture before establishment, over EVERY configuration*; and (vi) *the seven-seam totality
universal over hostile arguments* — are **executed here as quantifications over finite, pinned
enumerations**, **hand-rolled and deterministic, with no new dependency**.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-GT-*`** (`GT` = this
unit, **g**u**t**ter) — so **a register row is never mistaken for a `§3` row** (whose families are
`M-*`/`F-*`/`I-*`/`R-*`) **and never for a sibling's register** (`P-ZN-*`, `P-CN-*`, `P-PJ-*`, `P-LH-*`,
`P-SH-*`, `P-GS-*`). **The four families are ruling 10's**: **`PU`** = the pure function · **`IM`** = the
injected seams · **`SM`** = the state machine / write counts · **`TP`** = totality. **The strategy-id
prefix is `S-GT-*`, one per row.** **Type algebra is `docs/specs/engine-pin.md` `§5.5`'s: `P-IM`** =
invariant · **`P-SM`** = state-machine · **`P-TP`** = totality.

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/gutter.test.ts`, `§4.1`/`§5.1`) —
   the file the red set already owes, and the file the register **rides as part of the red** (`§4.2`
   item 5). **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript
   inside the test file.** **ONE row uses a generator** — `P-GT-TP-1`, the seven-seam totality sweep whose
   pool is drawn — and **it is pinned to literals in the test file itself: a hand-rolled 32-bit LCG with
   `state₀ = 20260927`; `stateₙ₊₁ = (stateₙ · 1664525 + 1013904223) mod 2³²`; and EACH DRAW APPLIES
   EXACTLY ONE LCG STEP, the resulting state selecting the pool member — `index = stateₙ₊₁ mod
   pool.length`, with `pool.length = 20`** — so **one pool draw consumes exactly ONE LCG step.** **Stated
   so no TestWriter reads a two-step or a scaling form into it: there is NO `next(k)` helper in this
   register, and `pool.length` participates in NO rule beyond that one modular reduction.** **No
   `Math.random`, no wall-clock seed, no shrinking, no adaptive input search.** **`P-GT-TP-2` uses NO
   generator** — its table is fixed and enumerated.
3. **Caps, uniform for the whole register: `≤100` attempts per row, `≤400` attempts in total**, rows
   evaluated **sequentially in register order**, **STOP AFTER 5 CONSECUTIVE FAILURES** (the running row's
   remaining attempts are abandoned and no further row starts). **A register row is never refused on the
   ground that "no PBT harness exists."**
4. **Sample rows are the `§3` rows this register compensates, never replaced by it.** **No `§3` row is
   weakened, widened or re-scoped by the register.**
5. **No row may be reported as executed if it was sampled** — every row's cell states its input set
   exactly, and **a row whose property text quantifies over a domain LARGER than its table carries the
   explicit `(bounded)` marking** (`§5.5.2` item 2).
6. **The register's own boundaries, named rather than silently relied on:** **(a) NO POINTER INPUT IS
   NEEDED OR USED BY ANY ROW** — every row drives a **recording session double** or the **landed session
   with a recording event source**, a **counting sink** and **throwing stubs**, and **no row hands this
   module an event object or a coordinate** (ruling 10's "fully enumerable with no pointer input");
   **(b) no `Proxy` whose traps return inconsistent answers across reads** is in any pool (the hostile
   shapes are **fixed** table members, deliberately, so no draw is ambiguous); **(c) each row's
   pool/table is a SUBSET of the input space this contract pins**, and **its silence about a shape it
   does not list is a stated boundary, not an unrecorded omission**; **(d) `P-GT-PU-1` is the row that
   carries the pure function's TOTALITY, `P-GT-SM-3` is the row that carries the single-writer
   discipline — and NO OTHER ROW MAY BE QUOTED FOR EITHER.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-GT-PU-1`** *(the PURE-TOTALITY quantification — the `clampToBounds` enumerated domain)* | `P-IM` invariant | **For EVERY input in the row's enumerated domain — the `18` `value` classes below each driven against the canonical finite pair, the `9` `bounds` classes below each driven against a canonical value, AND the `33`-cell cross-product subset that pairs the ambiguous classes — `clampToBounds` returns a `number`, NEVER throws, and its answer is EXACTLY the declared one for that member: the `typeof`-gate's `NaN` for any pair whose bounds are not both `number`s, and `Math.max(min, Math.min(value, max))` VERBATIM for every pair whose bounds ARE both `number`s — where `-0` is PRESERVED as the formula's answer and an INVERTED pair (`min > max`) answers `min`.** **The converse halves asserted in the same row: the function mutates NEITHER argument, reads no third input, and returns no record, no string, no `undefined` and no `boolean` in ANY cell.** | **YES** *(the domain IS the whole input space this contract pins: every member is a declared class with its own expected answer — `18 + 9 + 33 = 60` cells, and no cell is a sample of an unlisted shape)* | `M-2`, `M-19`, `F-1`..`F-8`, `I-1`, `I-12`, `§2.3` item 2, `§0A` note 8 | `S-GT-PURE-1` | **`60` attempts** = **`18` value-class drives + `9` bounds-class drives + `33` cross-product cells**, one `clampToBounds` call each. **The `18` value classes (each driven against canonical `{min: 0, max: 100}`):** **(1)** `'12'` · **(2)** `'0'` · **(3)** `null` · **(4)** `undefined` · **(5)** `true` · **(6)** `false` · **(7)** `{}` · **(8)** `[]` · **(9)** `Symbol('v')` · **(10)** a function · **(11)** `12n` · **(12)** `0n` · **(13)** `NaN` · **(14)** `+Infinity` · **(15)** `-Infinity` · **(16)** `-3` · **(17)** `-0` · **(18)** `42`. **The `9` bounds classes (each driven against canonical `value = 42`, with `-0`'s drive using `value = -0`):** **(1)** canonical `{min: 0, max: 100}` · **(2)** `{min: 7, max: 7}` (equal) · **(3)** `{min: 100, max: 0}` (inverted) · **(4)** `{min: '0', max: '100'}` (non-number fields) · **(5)** `{}` (absent fields) · **(6)** `42` (a primitive) · **(7)** a record whose `min` getter THROWS · **(8)** `{min: 0, max: Infinity}` (non-finite, both `number`s) · **(9)** `{min: NaN, max: 100}` (a `number`-typed `NaN`). **The `33` cross-product cells** pair the five ambiguous value classes `(13)`..`(17)` with the five ambiguous bounds classes `(3)`,`(5)`,`(7)`,`(8)`,`(9)` — `25` cells — plus the `8` cells that pin the two preservation readings (the `-0` value against the canonical, equal, inverted and `Infinity`-max pairs, and `42` against the equal, inverted, primitive and throwing pairs). **Per attempt assert:** the exact expected `number` (`Object.is` for every `-0`/`NaN` expectation, so a `0` cannot stand in for a `-0`), a `typeof` check that the return is `number`, a **did-not-throw** assertion, and the pre/post snapshot of both arguments. |
| **`P-GT-PU-2`** *(the ORDERING / BOUNDARY property of the clamp — the three declared outcomes)* | `P-IM` invariant | **For EVERY drive in the row's fixed `11`-drive table over ONE pair of bounds, the clamp's answer is EXACTLY ONE of the row's THREE declared outcomes — `min` (the value was below the pair), `the value itself` (the value was inside the pair), or `max` (the value was above the pair) — and the answer NEVER straddles two of them: an inside drive never answers a bound, an above drive never answers `min` or the value, and a below drive never answers `max` or the value.** **The row's second half, which is why it carries a `(bounded)` marking: it asserts that the clamp's behaviour is IDENTICAL for `2` DISTINCT pairs — the canonical `{min: 0, max: 100}` and a second pair `{min: -50, max: 25}` — i.e. the outcome is a function of `value` and the PAIR, never of any pair's identity, spelling, frozen-ness or creation order.** | **YES (bounded — the row declares `11` drives, whose honest DISTINCT `(value, bounds)` pair count is `2`, because the table drives each of the three declared outcomes under the SAME canonical pair and re-drives them under the second pair, and the `12` non-number value classes are `P-GT-PU-1`'s domain, not this row's. The universal "for every pair" is NOT proven, and no reader may read this row as its proof)** | `M-2`, `F-3`, `F-4`, `F-6`, `F-7`, `I-1`, `§2.3` item 2 | `S-GT-PURE-2` | **`11` attempts** = **`6` drives under the canonical pair + `5` drives under the second pair**, one `clampToBounds` call each. **The canonical-pair drives:** **(a)** `value = 150` ⇒ above ⇒ `100` · **(b)** `value = -5` ⇒ below ⇒ `0` · **(c)** `value = 42` ⇒ inside ⇒ `42` · **(d)** `value = 100` ⇒ on the max boundary ⇒ `100` (inside-or-above, and the declared outcome is `100` either way) · **(e)** `value = 0` ⇒ on the min boundary ⇒ `0` · **(f)** `value = 250` with the INVERTED pair `{min: 100, max: 0}` ⇒ the declared outcome is **`100`**, i.e. the `min` limb — the drive that proves the inverted case is not a fifth outcome. **The second-pair drives:** **(g)** `value = 999` ⇒ `25` · **(h)** `value = -999` ⇒ `-50` · **(i)** `value = -20` ⇒ `-20` · **(j)** `value = 25` ⇒ `25` · **(k)** `value = -50` ⇒ `-50`. **Per attempt assert:** the exact expected number AND that the answer is one of the three declared limb values for that pair — so a module returning a fourth thing (a `NaN`, a string, a re-derived bound) **FAILS**; and the identical-outcome pair check re-drives `(a)`..`(e)`'s outcome shapes under `(g)`..`(k)` to assert pair-independence. |
| **`P-GT-PU-3`** *(PURITY / DETERMINISM / NO-RETENTION of the clamp)* | `P-IM` invariant | **For EVERY entry of the row's fixed `10`-entry table, the call is PURE: driven twice in sequence it returns an EQUAL answer both times (`Object.is`-equal for the `NaN`/`-0` entries), NEITHER argument is mutated or retained (a post-call snapshot — own keys in order, each value by `Object.hasOwn` and index, `Object.getPrototypeOf`, `Object.isFrozen` — is identical to the pre-call snapshot), a FROZEN pair behaves exactly like its unfrozen twin, and NO module-level state exists (a third, interleaved call with different arguments does not change the first pair's repeat answer).** | **YES** *(a fixed table over a declared domain, and the table is the whole purity claim: the two call sequences and the frozen twin are named per entry)* | `M-19`, `I-12`, `§2.1` item 1, `§1` item 3, `§5.5.1 P-GT-PU-1` | `S-GT-PURE-3` | **`10` attempts** = **`5` caller-object shapes × `2` access patterns (unfrozen / `Object.freeze`d-twice-in-sequence)**, one drive per cell, each drive a PAIR of calls plus the snapshot comparison. **The `5` shapes:** **(1)** a plain `{min, max}` record · **(2)** an `Object.create(null)` record carrying `min`/`max` · **(3)** a record whose `min` is an **own accessor** · **(4)** a **frozen** record (its unfrozen twin is shape `(1)`) · **(5)** a `Map`-shaped holder given as the `bounds` argument (**an unusable pair by the `typeof` gate — it answers `NaN`, and the row asserts the arguments are still untouched**). **Per attempt assert:** the two answers are `Object.is`-equal; the pre/post snapshot deep-equals; `Object.isFrozen(pair)` is unchanged; and **a third interleaved call with a different pair leaves the first pair's repeat answer unchanged.** |
| **`P-GT-IM-1`** *(the `sizeFor` SEAM quantification — the value source and its two declared outcomes)* | `P-IM` invariant | **For EVERY `sizeFor` shape in the row's `4`-shape domain and EVERY gesture path in its `5`-path domain, the seam's CALL COUNT and the row's WRITE COUNT are EXACTLY the declared pair for that cell: `sizeFor` is called AT MOST ONCE per gesture, and ONLY on an `'end'` terminal of a RESIZABLE gesture — never at establishment, never for an `isResizable: false` gesture, never on a `cancel`, never on a refused terminal; a CALLABLE `sizeFor` whose answer clamps to a number yields `sinkCalls === 1`; and `ABSENT` / `NON-CALLABLE` / THROWING `sizeFor` yields `sinkCalls === 0` — and, stated in the same row, THAT IS NOT A CANCEL (the terminal's outcome is still whatever the terminal was: an `'end'` for an end, and the sink simply never ran).** | **YES** *(the `4` shapes × the `5` paths IS the domain the property names, and every cell has its own declared pair)* | `M-3`, `M-5`, `M-8`, `F-17`, `I-4`, `§2.3` items 1/2, `§2.4` item 1 | `S-GT-SEAM-1` | **`18` attempts** = **`4` `sizeFor` shapes × `5` gesture paths**, driven in fixed order (shape-major). **The `4` shapes:** **(1)** a callable returning a number (`777`) · **(2)** ABSENT (no field) · **(3)** NON-CALLABLE (a number, a string) · **(4)** THROWING. **The `5` paths:** **(a)** a full `'end'` lifecycle with `isResizable` truthy · **(b)** a full `'end'` lifecycle with `isResizable` falsy · **(c)** a `cancel` lifecycle · **(d)** a REFUSED terminal (a stale handle passed to the session's `end`) · **(e)** a `dispose()` mid-gesture. **Per attempt assert:** the recorded call count for `sizeFor` (exactly `1` for path `(a)`; exactly `0` for every other cell of shapes `(2)`,`(3)`; exactly `1` for `(4)` on path `(a)` and `0` elsewhere), `stats().sinkCalls` (`1` only for shape `(1)` × path `(a)`; `0` in every other cell), the terminal's `outcome` (the row asserts the outcome is NOT `'cancel'` for paths `(a)`/`(d)` — the clause that makes *"not a cancel"* falsifiable), and that the `element`/`gesture`/`axis` arguments matched the session's own handle and the token `axisFor` returned. |
| **`P-GT-IM-2`** *(the `boundsFor` + `defaultSizeFor` SEAM quantification — the ONE bounds channel and the reset default's source)* | `P-IM` invariant | **For EVERY seam shape in the row's `5`-shape domain and every path in its `4`-path domain, the two seams' CALL COUNTS and the WRITE COUNT are EXACTLY the declared ones: `boundsFor` is called AT MOST ONCE per gesture, ONLY at a terminal that evaluates a value (an `'end'` of a resizable gesture, or a `reset`), and it RECEIVES THE SAME TOKEN `axisFor` returned; `defaultSizeFor` is called AT MOST ONCE per reset and NEVER on any other path; an unusable `boundsFor` (absent / non-callable / a non-record / a throwing pair) makes the clamp answer `NaN` and therefore yields `sinkCalls === 0`; and a THROWING `boundsFor` PROPAGATES to the caller of the terminal while still leaving `sinkCalls` at `0` — so the write count is ZERO or EXACTLY ONE, NEVER TWO.** | **YES (bounded — the property text quantifies over "EVERY seam shape and EVERY path", while the table drives `5` shapes × `4` paths; the universal is NOT proven. Its DECLARED term is `20` and its honest DISTINCT seam-path observations are `18`, because `2` of the `5` shapes are byte-identical in what the module can observe across the `bounds` and `default` paths)** | `M-3`, `M-14`, `F-14`, `F-17`, `I-1`, `§2.3` items 2/4, `§2.4` item 2 | `S-GT-SEAM-2` | **`20` attempts** = **`5` seam shapes × `4` drive paths**, driven in fixed order. **The `5` shapes (each driven as a `boundsFor` AND as a `defaultSizeFor`):** **(1)** a callable returning the canonical pair · **(2)** ABSENT · **(3)** NON-CALLABLE · **(4)** a callable returning an UNUSABLE pair (`{}`, a primitive, a non-number field, a throwing field read — driven as one shape's four variants) · **(5)** THROWING. **The `4` drive paths:** **(a)** an `'end'` lifecycle with `isResizable` truthy (drives `boundsFor` only) · **(b)** a `reset` on a resizable gesture (drives `boundsFor` AND `defaultSizeFor`) · **(c)** a `reset` where the default is what is under test (drives `defaultSizeFor` first) · **(d)** a `cancel` lifecycle (drives NEITHER). **Per attempt assert:** the exact call count for each seam (`0` for path `(d)` in every cell; `1` for `boundsFor` on `(a)`/`(b)`; `1` for `defaultSizeFor` on `(b)`/`(c)`), `stats().sinkCalls` against the declared pair, the token identity the seam received (`toBe`), the propagation for shape `(5)` on `(a)`/`(b)`, and — for shape `(4)` — the `NaN`-answer path with `sinkCalls === 0`. |
| **`P-GT-IM-3`** *(the `isResizable` quantification — ONE evaluation per gesture, at establishment, and the `false` path)* | `P-IM` invariant | **For EVERY `isResizable` shape in the row's `4`-shape domain, the seam is called EXACTLY ONCE for an ESTABLISHED gesture and ZERO times for a gesture that never established, it is NEVER called at `attach`, and its TRUTHINESS is the whole decision: a falsy answer (including ABSENT and THROWING, which are the `not-resizable` default) makes the gesture ESTABLISH and TERMINATE NORMALLY with `sinkCalls === 0` AND AN OUTCOME THAT IS NOT `'cancel'`, while a truthy answer lets the terminal seams run and the write count become `1`.** | **YES** *(the `4` shapes are the whole declared domain — `4` DISTINCT module-observable shapes, exactly as `§0A` note 6 requires: not callable, callable-and-falsy, callable-and-truthy, throwing)* | `M-8`, `M-9`, `M-10`, `M-11`, `F-18`, `I-4`, `§0A` note 6 | `S-GT-SEAM-3` | **`22` attempts** = **`4` shapes × `5` drives + `2` attach-time drives**. **The `4` shapes:** **(1)** ABSENT · **(2)** NON-CALLABLE · **(3)** a callable returning a FALSY value (driven as `false`, `0`, `''`, `null`, `undefined`, `NaN` — one shape, its variants asserted inside the drive) · **(4)** a callable THROWING. **The `5` drives per shape:** **(a)** `attach` only, NO gesture — asserts `isResizable` was called **ZERO** times and `attach` still returned `true` (the *never an install-time gate* clause) · **(b)** a full `'end'` lifecycle — asserts the call count (`1` for `(3)`/`(4)`; `0` for `(1)`/`(2)`), `sinkCalls` (`1` for `(3)`, `0` for `(1)`/`(2)`/`(4)`), and the outcome (**not `'cancel'`**) · **(c)** a `cancel` lifecycle · **(d)** a `refused` establishment (`begin` on an uninstalled element — asserts `isResizable` was NOT called) · **(e)** two sequential gestures — asserts the seam is called **once PER gesture** (**`2`** for `(3)`/`(4)`), which is what falsifies *"once, and per gesture rather than per instance"*. **The `2` attach-time drives:** a truthy and a falsy `isResizable` at `attach` time, both asserting **zero** seam calls during the attach. **Per attempt assert:** the exact call count, `stats().gestures`, `stats().sinkCalls`, and the terminal `outcome`. |
| **`P-GT-IM-4`** *(the `axisFor` / token quantification AND the frozen seven-seam set)* | `P-IM` invariant | **For EVERY seam shape in the row's `4`-shape domain, BOTH halves hold: (i) `axisFor` — the seam is called AT MOST ONCE per ESTABLISHED gesture, its ABSENT / NON-CALLABLE / THROWING shapes yield the token `undefined` and are SWALLOWED (the gesture still establishes and still terminates normally, and never becomes `busy`), and the value it returned reaches `isResizable`/`boundsFor`/`sizeFor`/`defaultSizeFor` BY IDENTITY; and (ii) THE SEAM SET IS FROZEN — the factory's options object carries EXACTLY the SEVEN declared members, NAMED and ORDERED, `capture` is ABSENT, no eighth member is honoured, and no policy default exists.** | **YES** *(the `4` shapes are the whole declared `axisFor` domain, and the seam-set half is a SET claim over a closed list, not a sample)* | `M-3`, `M-7`, `F-18`, `I-5`, `R-1`, `R-10`, `§2.1` items 3/5, `§0A` note 5 | `S-GT-SEAM-4` | **`28` attempts** = **`4` `axisFor` shapes × `7` SEAMS**. **The `4` shapes:** **(1)** a callable returning a token OBJECT (identity-asserted) · **(2)** ABSENT · **(3)** NON-CALLABLE · **(4)** THROWING. **The `7` seams** are `§2.1` item 3's set, driven one per attempt: `session` · `axisFor` · `boundsFor` · `defaultSizeFor` · `isResizable` · `sizeFor` · `commit`. **Per attempt assert:** for **`axisFor`** itself — the call count (`1` per established gesture; `0` for `(2)`/`(3)`), and for `(4)` the swallow + normal establishment; for **the other six seams** — that the seam's received `axis` argument **IS the object `axisFor` returned** (`toBe`, the identity clause that makes the token's opacity falsifiable) or is `undefined` for shapes `(2)`..`(4)`; and, for the **seam-set half**, the options object's own key set read BY NAME — **asserted on every one of the `28` attempts**, so an eighth member added to any drive FAILS, and `capture`'s presence FAILS. |
| **`P-GT-SM-1`** *(the COMMIT-COUNT quantification per terminal path — required rows (ii) and (iii))* | `P-SM` state-machine | **For EVERY terminal path in the row's `4`-path domain and EVERY sink shape in its `5`-shape domain, the `commit` channel's behaviour is EXACTLY the declared pair: an `'end'` terminal of a resizable gesture with a usable bounds pair invokes the sink EXACTLY ONCE; a `cancel` terminal (including a `pointercancel`, a consumer abort and a `dispose()` mid-gesture) invokes it ZERO times; a REFUSED terminal invokes it ZERO times; a `reset` is `P-GT-SM-4`'s domain and is driven here only as a control; and the count NEVER exceeds one per gesture — whatever the value states and whatever the consumer's hooks do.** **The converse clauses asserted in the same row: an `end` whose seam value clamps to `NaN` writes ZERO times (and is still an `'end'`), and a `cancel` writes ZERO times even when the consumer set a value on the gesture.** | **YES** *(the `4` paths × `5` shapes IS the declared domain; `19` of the `20` cells are distinct module-observable path×shape pairs, because one refusal path and one cancel path read the same observable — a `dispose()` mid-gesture produces the same terminal evidence as a `cancel` under a non-writing sink shape, and that is recorded as the row's declared-vs-distinct figure rather than asserted as distinct)* | `M-4`, `M-5`, `M-6`, `F-11`, `I-2`, `I-2b`, `§2.3` item 3, `§5.3` item 11 | `S-GT-COMMIT-1` | **`20` attempts** = **`4` terminal paths × `5` sink shapes**, driven in fixed order (path-major). **The `4` paths:** **(1)** the recorded `'pointerup'` handler (a real session-driven end) · **(2)** the recorded `'pointercancel'` handler · **(3)** a REFUSED terminal (the session refuses a stale handle) · **(4)** a `dispose()` arriving mid-gesture (through `detach()` or the session's own dispose). **The `5` sink shapes:** **(a)** a normal counting sink · **(b)** a sink that THROWS · **(c)** NO sink at all (the slot-empty composition — `committed: true` with nothing written, `F-10`) · **(d)** a NON-CALLABLE sink value · **(e)** a counting sink with the consumer setting a value on the gesture via `gesture.set`. **Per attempt assert:** the sink's own recorded call count AND the controller's `stats().sinkCalls` AND `stats().written` (**both readings, so the row cannot pass by counting only its own calls**), the session's terminal `committed`, and the terminal `outcome` where a terminal exists. |
| **`P-GT-SM-2`** *(the NO-WRITE-BEFORE-ESTABLISHMENT / NO-SECOND-WRITE / NO-RETAINED-SINK quantification — required row (v))* | `P-SM` state-machine | **For EVERY stage in the row's `5`-stage domain and EVERY slot shape in its `3`-shape domain: the sink is invoked ZERO times before a gesture's terminal, it is NEVER invoked twice for one gesture, it is NEVER invoked for an unestablished gesture, and NOTHING IS RETAINED across the boundary — after the terminal `stats().sinkCalls` holds its count but the controller's per-gesture record (handle, token, resizability decision) is GONE, a subsequent `reset` finds no handle (and refuses `'no-gesture'`), and no element-keyed value, cache or memo exists.** **The capture clause is asserted in the same row: ZERO capture calls at every stage, and the `install` options object carries no `capture` field.** | **YES (bounded — the property text names "EVERY stage and EVERY slot shape" while the table drives `5` stages × `3` slot shapes; the universal is NOT proven, and the two zero-write clauses are asserted over the whole enumerated grid rather than derived)** | `M-4`, `M-13`, `M-16`, `I-7`, `I-9`, `R-10`, `§2.3` item 5, `§2.5` item 6 | `S-GT-WINDOW-1` | **`15` attempts** = **`5` stages × `3` slot shapes**, driven in fixed order. **The `5` stages:** **(1)** after `attach`, before any establishment · **(2)** during the gesture, after a consumer `gesture.set` · **(3)** at the terminal (the frame in which any write occurs) · **(4)** after the terminal (a `reset` attempted on the now-idle controller) · **(5)** after two full sequential gestures. **The `3` slot shapes:** **(1)** a gesture that terminated by `'end'` · **(2)** a gesture that terminated by `'cancel'` · **(3)** a gesture that NEVER established (only an `attach` happened). **Per attempt assert:** `stats().sinkCalls` and the sink's own record at that stage (**exactly the declared running count, never "at least"**), `stats().attached`, the refusal code from stage `(4)`'s `reset` (**`'no-gesture'`**), `gesture()`'s returned record being **discarded** where the row can observe it, the recorded **capture count being `0` at every stage**, and the recorded `install` options' own key set containing **no `capture`**. |
| **`P-GT-SM-3`** *(THE SINGLE-WRITER / DOUBLE-WRITE quantification — required row (ii) at its sharpest)* | `P-SM` state-machine | **For EVERY composition shape in the row's `5`-shape domain, the write channel's behaviour is EXACTLY the declared one: ONE CORRECT COMPOSITION writes exactly once per resizable `'end'` gesture and the sink's record and the controller's `stats().sinkCalls` AGREE at `1`; A TWO-WRITER COMPOSITION FAILS (the sink's record reads `2` for one gesture) while the controller's own count still reads `1` — WHICH IS WHY BOTH READINGS ARE ASSERTED; A NO-WRITER COMPOSITION (SLOT-EMPTY) FAILS (the count reads `0` where `1` is required) AND THE SESSION REPORTS `committed: true` WHILE NOTHING WAS WRITTEN; A CONSUMER-SIDE WRITE from the consumer's own hook is NOT this composition's write — but a composition whose TOTAL write count for one gesture is `2` FAILS; and NOTHING that never reached a terminal writes at all.** | **YES** *(the `5` shapes are `5` DISTINCT drives, not five assertions over one execution — each drives a different composition and each has its own falsifiable expected count)* | `F-9`, `F-10`, `F-19`, `I-2`, `I-2b`, `R-13`, `§2.3` item 3, `§2.5` item 4 | `S-GT-WRITER-1` | **`5` attempts** = **`5` composition shapes**, one full `'end'` lifecycle each. **The `5` shapes:** **(1)** the CORRECT single-writer composition (one sink, wired to the session's commit channel by this controller) · **(2)** the TWO-WRITER composition (a second writer also calls the sink for the same gesture) — **declared to FAIL the row** · **(3)** the NO-WRITER composition (`commit` absent — the slot-empty shape) — **declared to FAIL the row**, and the row states, in this cell, **that the session reports `committed: true` while nothing was written** · **(4)** a consumer whose own `onMove` calls the sink, **and, in the SAME consumer-side WRITE CLASS (4)/(5)**, **(5)** a consumer whose own `onEnd` calls the sink — **THE SECOND CONSUMER-SIDE WRITE CLASS, completed here** *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this cell AS FILED was TRUNCATED mid-word at *"a composit…"*, so the `5`-shape list was not fully stated and shape `(5)` had no text at all; the ruling completes it to the SECOND consumer-side write class — a consumer's own `onEnd` calling the sink — which is the wording the red set authored. The shapes `(1)`–`(5)` are now stated COMPLETELY, in order and with no gap: `(1)` correct single-writer · `(2)` two-writer · `(3)` no-writer (slot-empty) · `(4)` consumer-side write from `onMove` · `(5)` consumer-side write from `onEnd`.)* — and **the two readings the row asserts for EVERY shape are DISTINCT BY DESIGN** *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this cell AS FILED said the two readings *"AGREE at `1`"* for shape `(1)` while also saying the controller's own count reads `1` BECAUSE the sink's record reads `2` — the two could not both hold for the two-writer shape, so the row as worded was not falsifiable. The RULED reading: for the CORRECT (single-writer) composition the sink's record and the controller's `stats().sinkCalls` BOTH read `1`; for the TWO-WRITER composition the SINK'S OWN RECORD reads `2` while the CONTROLLER'S COUNTER still reads `1` — and THAT DIVERGENCE is what makes the row falsifiable. The same distinction is stated at `§3.2 F-9` and `§3.4 R-13`.**)*: **the `5` shapes are `5` DISTINCT drives, and THREE of them carry a total write count of `2`** — the two-writer composition and the two consumer-side-write shapes — **so a composition cannot pass by counting only its own calls, and a row that asserted a single reading would be satisfiable by a composition that never wired the channel.** **Per attempt assert:** the sink's own recorded call count (exactly the declared figure, never *"at least"*), the controller's `stats().sinkCalls`, and — for shape `(3)` — **that the session reports `committed: true` while nothing was written** (the `C1` sentence, in the same cell). · **(5)** a composition whose gesture never reaches a terminal (a `cancel`) — the count is `0`. **Per attempt assert:** the sink's own record length for the gesture, `stats().sinkCalls`, `stats().written`, the session's terminal `committed`, and — for shape `(2)` — that the controller's own count is `1` **while** the sink's record is `2`, so a pass cannot be obtained by trusting one reading. |
| **`P-GT-SM-4`** *(the RESET-SURFACE quantification — code propagation and the CLAMPED default; required row (iv))* | `P-SM` state-machine | **For EVERY reset entry-point shape in the row's `6`-shape domain, the reset surface behaves EXACTLY as ruling 9 declares: with an ACTIVE resizable gesture and a usable default the controller calls `session.reset(element, handle, value)` exactly once with THE CLAMPED DEFAULT (never the raw default, never a user-set value), writes the sink exactly once, and the value the sink receives is the clamped one; with NO active gesture the refusal is `'no-gesture'` with ZERO session calls; with an unusable `defaultSizeFor` the refusal is `'unusable-default'` with ZERO session calls; with an unusable BOUNDS pair the session's reset IS called once with `NaN` and the sink is NOT written; with `isResizable` FALSE the reset makes ZERO session calls; and on a DISPOSED session the code is the session's own `'disposed'`, propagated VERBATIM — the session's SEVEN codes are never renamed, wrapped or re-lexed, and NO code of this controller's is ever passed INTO the session.** | **YES** *(the `6` shapes are the declared domain of the entry point — every refusal class and every success class, each with its own declared code and call count: `11` DISTINCT module-observable readings, because the two THROWING `defaultSizeFor`/`boundsFor`-at-default limbs are declared as one unusable-default class with a single observable)* | `M-14`, `M-15`, `M-16`, `M-17`, `F-12`, `F-13`, `F-14`, `F-15`, `R-15`, `§2.3` item 4, `§2.5` item 5 | `S-GT-RESET-1` | **`12` attempts** = **`6` reset entry-point shapes × `2` readings** (the **controller's** result record, and the **session's** recorded call/response), driven in fixed order. **The `6` shapes:** **(1)** an ACTIVE resizable gesture, usable default (`defaultSizeFor` ⇒ `420`), usable bounds (`{min: 0, max: 100}`) ⇒ **one session call, value `100`, one sink write, `{ok:true, code:'ok', committed:true}`** — **⟶ COMPLETED 2026-09-27 (THE RED-RUN AMENDMENT PASS): the `6` shapes AS FILED were stated as *"every refusal class and every success class"* but the enumerating cell ran out at shape `(1)`, so the ruling's own shape list is stated HERE COMPLETELY and in the row's declared order: `(1)` an ACTIVE resizable gesture with a usable default and a usable bounds pair ⇒ ONE session call with the CLAMPED value, ONE sink write, `committed: true` · `(2)` NO active gesture ⇒ the session's own `'no-gesture'`, ZERO session calls, ZERO writes · `(3)` an unusable `defaultSizeFor` (ABSENT) ⇒ `'unusable-default'`, ZERO session calls, ZERO writes · `(4)` an unusable `defaultSizeFor` (THROWING) ⇒ `'unusable-default'`, ZERO session calls, ZERO writes, **and `(3)`/`(4)` are declared as ONE unusable-default class (the reason the distinct figure is `11`)** · `(5)` an unusable BOUNDS pair (the clamp answers `NaN`) ⇒ ONE session call carrying `NaN`, ZERO sink writes, controller-side `committed: false` WHILE the session's own `TerminalResult.committed` reads `true` (THE TWO-COUNTERS-DIFFER CLASS) · `(6)` **`isResizable` FALSE on an ESTABLISHED gesture ⇒ ZERO session calls and the controller-local `'not-resizable'`, `committed: false`, ZERO writes** — **and the DISPOSED-session case, where the code is the session's own `'disposed'` propagated VERBATIM.** **THE RED-RUN DIVERGENCE, REPORTED NOT INVENTED: the landed `tests/gutter.test.ts` drives `P-GT-SM-4` with SIX shapes whose list is `(1)` active/usable · `(2)` no active gesture · `(3)` unusable default (absent) · `(4)` unusable default (throwing) · `(5)` unusable BOUNDS · `(6)` DISPOSED — so its shape `(6)` is the DISPOSED case and the **`isResizable`-FALSE limb is NOT among the six driven cells** (`isResizable` is hard-wired truthy in that table). THE DECLARED TERM (`12` = `6` × `2`) AND THE DISTINCT FIGURE (`11`) ARE UNCHANGED AND THIS PASS MAY NOT EDIT THE TEST FILE (`§5.1`'s DENIED set): the missing limb is a TEST-SIDE residue, and `F-13`/`M-17`'s own rows drive the non-resizable refusal at their sites.** · **(2)** NO active gesture ⇒ **`'no-gesture'`, zero session calls** · **(3)** `defaultSizeFor` ABSENT ⇒ **`'unusable-default'`, zero session calls** · **(4)** `defaultSizeFor` THROWING ⇒ **`'unusable-default'`, zero session calls** · **(5)** an unusable BOUNDS pair (`{}`) ⇒ **one session call carrying `NaN`, `sinkCalls === 0`, the controller reporting `committed: false` while the session's `TerminalResult.committed` reads `true`** · **(6)** a DISPOSED session (or `isResizable` falsy — driven as this shape's second variant, each asserted separately) ⇒ **the session's own `'disposed'` / zero session calls respectively, propagated verbatim**. **Per attempt assert:** the exact session-call count and the exact value the session received (`Object.is` for the `NaN` drive), the sink's own record, the controller's result record and its `committed`, the terminal `outcome` at the sink (**`'reset'`** for shape `(1)` — the discriminator clause), the identity of the handle passed to `session.reset` (**the one the session gave at establishment**), and, for shapes `(2)`..`(4)`, that the recording session's log gained **NOTHING** and that `defaultSizeFor`/`boundsFor` were called the declared number of times. |
| **`P-GT-SM-5`** *(the `detach()` MULTI-ELEMENT limb — **⟶ ADDED 2026-09-27 BY THE RED-RUN AMENDMENT PASS**; a `§3.1`-CLASS CLAUSE CELL carrying **NO ATTEMPT TERM**, appended in place AFTER `P-GT-SM-4` and OUTSIDE the register's `299` total and `≤400`-cap comparison)* | **`P-SM` clause cell** *(no attempt term — NOT one of the `13` attempt-bearing rows)* | **`detach()` is ZERO-ARGUMENT and CONTROLLER-WIDE: it REFUSES — returning `false` with ZERO session calls — while MORE THAN ONE element is attached to THIS controller, because the session is shared and detaching it on behalf of one control would detach every OTHER control's listeners; with EXACTLY ONE element attached it delegates `session.dispose()` exactly once and returns `true` iff the session reports `complete === true`; the refusal makes NO session call of any kind, leaves every attached element's ledger entry intact (nothing is half-detached), and `detached` does NOT read `true` on a refusal.** **THE DEFAULT'S STATUS IS STATED WITH IT: this is the `§7a.1` item 2 WORKING DEFAULT, NOT a ruled clause — `§7a.1` item 2 STAYS OPEN, and a later pass that changes it MUST open a gate.** | **NOT APPLICABLE — clause cell, NO ATTEMPT TERM** *(its drives are named in the cell to its right; no cap comparison, no `(bounded)` marking and no distinct figure attach to it)* | `M-13` (**the red set's CARRIER for this limb**), `M-20` (**the `§3.1` clause row this pass adds**), `§2.1` item 4 (the `detach` doc block), `§7a.1` item 2, `§2.5` item 4 (the one-controller-per-session requirement's practical form) | **NONE** *(no strategy id: this cell is not executed by a register strategy, and inventing an `S-GT-*` id for it would imply an attempt term it does not carry)* | **NO enumeration strategy — the cell names its drives and nothing more.** **Its drives (for the TestWriter's clause row, `M-20`):** **(1)** `attach(elA)`, `detach()` ⇒ `true`, exactly ONE `session.dispose()` call, `detached` reads `true`; **(2)** `attach(elA)`, `attach(elB)`, `detach()` ⇒ **`false`** with **ZERO session calls** and **nothing dropped** (both ledger entries intact, `detached` still `false`); **(3)** `attach(elA)`, `detach()`, `detach()` ⇒ the second call makes ZERO session calls and returns `false` (**`M-13`'s idempotence limb**), and `detached` reads `true` forever after. **NO ATTEMPT IS COUNTED FOR THIS CELL, so NOTHING here may be added to the thirteen terms, to the `299` total or to any cap comparison.** | — ruling 8's universal, with its BOUND in its own words, over a pinned-seed pool)* | `P-TP` totality | **For EVERY seam shape drawn from the pinned `20`-member pool and driven through EITHER of the row's `2` composition configurations: NO METHOD OF THE CONTROLLER THROWS, and `createResizeController` itself never throws, for ANY argument — AND `A THROWING INJECTED SEAM IS EXCLUDED FROM THAT UNIVERSAL ONLY WHERE `§2.4` item 1's SEVEN-SEAM TABLE NAMES A DIFFERENT, EXPLICIT OUTCOME FOR IT`: an absent, non-callable or throwing `session`/`axisFor`/`isResizable`/`defaultSizeFor`/`commit` is CAUGHT and mapped to its named safe default, while a throwing `boundsFor`/`sizeFor` PROPAGATES to the caller of the terminal that invoked the session.** **Every drawn drive returns its declared shape: a controller with `attach`/`detach`/`reset`/`stats`/`detached` all present and callable, a `reset` returning a `{ok, code, committed}` record, and a `stats()` returning the six declared fields.** | **YES (bounded — the property text says "EVERY seam shape" while the pool holds `20` and the drive performs `60` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS, which is what ruling 8 requires of it)** | `F-16`, `F-17`, `F-18`, `I-10`, `§2.4` items 1/2/3, `§0A` note 9 | `S-GT-TOTAL-1` | **`60` attempts** = **`30` pinned-seed DRAWS × `2` composition configurations**, where **one attempt is one totality DRIVE (one drawn shape passed as one seam of one configuration, with every method then called once)** and **the per-call ASSERTIONS (`≥ 3` each: did-not-throw · declared kind · declared members callable) are reported as the row's `assertions` figure, NEVER as attempts.** **The `30` draws**
| **`P-GT-TP-1`** *(the SEVEN-SEAM TOTALITY universal — ruling 8's universal, with its BOUND in its own words, over a pinned-seed pool)* | `P-TP` totality | **For EVERY seam shape drawn from the pinned `20`-member pool and driven through EITHER of the row's `2` composition configurations: NO METHOD OF THE CONTROLLER THROWS, and `createResizeController` itself never throws, for ANY argument — AND `A THROWING INJECTED SEAM IS EXCLUDED FROM THAT UNIVERSAL ONLY WHERE `§2.4` item 1's SEVEN-SEAM TABLE NAMES A DIFFERENT, EXPLICIT OUTCOME FOR IT`: an absent, non-callable or throwing `session`/`axisFor`/`isResizable`/`defaultSizeFor`/`commit` is CAUGHT and mapped to its named safe default, while a throwing `boundsFor`/`sizeFor` PROPAGATES to the caller of the terminal that invoked the session.** **Every drawn drive returns its declared shape: a controller with `attach`/`detach`/`reset`/`stats`/`detached` all present and callable, a `reset` returning a `{ok, code, committed}` record, and a `stats()` returning the six declared fields.** | **YES (bounded — the property text says "EVERY seam shape" while the pool holds `20` and the drive performs `60` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS, which is what ruling 8 requires of it)** | `F-16`, `F-17`, `F-18`, `I-10`, `§2.4` items 1/2/3, `§0A` note 9 | `S-GT-TOTAL-1` | **`60` attempts** = **`30` pinned-seed DRAWS × `2` composition configurations**, where **one attempt is one totality DRIVE (one drawn shape passed as one seam of one configuration, with every method then called once)** and **the per-call ASSERTIONS (`≥ 3` each: did-not-throw · declared kind · declared members callable) are reported as the row's `assertions` figure, NEVER as attempts.** **The `30` draws come from the `20`-member pool by the pinned LCG (`state₀ = 20260927`, ONE step per draw, `index = stateₙ₊₁ mod 20`) — **so the same pool member may be drawn more than once and NO claim of pool coverage is made**; **the pool's `20` members (fixed, in this order):** **(1)** `undefined` · **(2)** `null` · **(3)** `0` · **(4)** `''` · **(5)** `NaN` · **(6)** a function · **(7)** `{}` · **(8)** `[]` · **(9)** a frozen `{}` · **(10)** a bare primitive object `Object.create(null)` · **(11)** a record whose every member is a THROWING getter · **(12)** a `Proxy` whose `get`/`has`/`getOwnPropertyDescriptor` traps THROW · **(13)** a `Proxy` that returns `undefined` for every property · **(14)** a `Symbol('s')` · **(15)** `true` · **(16)** a `Map` instance · **(17)** a `Set` instance · **(18)** a `Date` instance · **(19)** `{on: 1, off: 2}` (non-callable members) · **(20)** a `Promise.resolve()`. **The `2` configurations:** **(A)** the drawn shape passed as `session` · **(B)** the drawn shape passed as one of the six seam members (`axisFor` on even draws, `commit` on odd draws — a fixed in-loop binding, no extra state). **Per attempt assert:** construction returned a controller with all five members present and callable; `attach`, `detach`, `reset`, `stats` each returned their declared shape **without throwing**; and **for configuration (A) specifically, all five members were still callable and `stats()` still reported the six declared fields.** |
| **`P-GT-TP-2`** *(the DECLARED-SHAPE-OVER-HOSTILE-ARGUMENTS quantification — totality of the four entry points)* | `P-TP` totality | **For EVERY argument shape in the row's `6`-shape domain, EVERY controller entry point is TOTAL: `createResizeController(arg)` returns a controller (never throws, never returns `null`/`undefined`/a primitive), `attach(element, hooks)` returns a `boolean`, `reset(element)` returns a `{ok, code, committed}` record, `detach()` returns a `boolean` and `stats()` returns the six declared fields — for EVERY one of the row's argument shapes, INCLUDING a hostile `Proxy`, a throwing accessor, a `Symbol`, a `BigInt`, a function, an array and an absent argument.** **The converse clauses asserted in the same row: no entry point leaves a state a later call cannot read (a `stats()` after any of them is readable and totals-consistent), and a refusal is always a RECORD or a `boolean`, never a throw.** | **YES** *(the `6` argument shapes × the `3` entry-point drives IS the declared grid; every cell has its own declared return kind)* | `F-16`, `I-10`, `M-16`, `§2.4` item 3, `§2.1` item 4 | `S-GT-SHAPES-1` | **`18` attempts** = **`6` argument shapes × `3` entry-point drives**, one call each. **The `6` argument shapes:** **(1)** `undefined` (the argument omitted) · **(2)** `null` · **(3)** `42` · **(4)** `'x'` · **(5)** a `Proxy` whose traps THROW · **(6)** a record with a throwing accessor on `session` (and the same shape re-driven with the throwing accessor on `commit`). **The `3` entry-point drives per shape:** **(a)** the FACTORY as the argument it is built for (`createResizeController(shape)`) ⇒ asserts a controller is returned and its five members are callable · **(b)** the RESULTING controller's `attach(shape)` and `attach(shape, shape)` ⇒ asserts a `boolean` in both drives and no throw · **(c)** the resulting controller's `reset(shape)`, `detach()` and `stats()` ⇒ asserts the `{ok, code, committed}` record, a `boolean`, and the six fields — **and then one MORE `stats()` to assert the state stayed readable.** **Per attempt assert:** the returned kind (`typeof`/field-presence), the did-not-throw assertion, the declared code from the closed set (`I-14`), and the totals-consistency of `stats()` (`sinkCalls ≥ written`, `attached ≥ 0`, every counter a finite non-negative integer). |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly: `3` of the `13` rows.** **`P-GT-PU-2`** (its text's
*"for every pair"* is bounded by its `11` drives over `2` pairs), **`P-GT-IM-2`** (its text's *"EVERY
seam shape and EVERY path"* is bounded by `5` shapes × `4` paths), and **`P-GT-TP-1`** (its text's
*"EVERY seam shape"* is bounded by a `20`-member pool and `60` draws). **`P-GT-SM-2` IS NOT ONE OF THEM — and the set is named IDENTICALLY at `§5.5.1`'s own cell,
at this block and in `§5.5.2` item 3's ledger: `P-GT-PU-2` · `P-GT-IM-2` · `P-GT-TP-1`, and nothing
else.** *(**⟶ RECORDED 2026-09-27, THE RED-RUN AMENDMENT PASS: the gate-3 red set reported this set's
spelling as a consistency finding — `P-GT-SM-2` is NOT a member. The register's own cell for
`P-GT-SM-2` carries the plain executable marking, and so does this block's list of the other `10` rows;
a pass or a case title that names `P-GT-SM-2` `(bounded)` is naming a row the register does not mark,
and the disagreement is a TEST-SIDE residue THIS PASS MAY NOT EDIT (`§5.1`'s DENIED set). NO MARKING
MOVED for this: the `(bounded)` set stays `3` rows.**)* **The other `10` rows carry the
plain executable marking**: each quantifies over a domain its table **is**, with every member declared
and every expected outcome asserted per member — `P-GT-PU-1`, `P-GT-PU-3`, `P-GT-IM-1`, `P-GT-IM-3`,
`P-GT-IM-4`, `P-GT-SM-1`, `P-GT-SM-2`, `P-GT-SM-3`, `P-GT-SM-4`, `P-GT-TP-2`. **No row is marked
`NOT EXECUTED`, and no row may be reported as executed if it was sampled.**

### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

**Item 1 — the row count is an OUTCOME, and the breakdown signal is recorded ONCE.** **`13` rows** were
enumerated because **`13` discernible testable property classes exist** (ruling 10's four families), and
**the `≤8` threshold is a guidance signal, not a ceiling** (`docs/decisions.md`
`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`, part 1). **THE BREAKDOWN
RECOMMENDATION (the separable component, named):** **`P-GT-TP-1`** is the row whose phases do not share
one input domain — it bundles **the sweep's totality drive** with **the pinned-seed pool draw** — and
**a future breakdown pass COULD split it into `(i)` a fixed-shape totality row over the hostile-record
classes and `(ii)` the drawn-pool row.** **That is a breakdown of ONE row into two, not a missing
property**, and **it is NOT owed by this filing** — **no row is added, removed or re-scoped here**, and
**`13` stays the extent.**

**Item 2 — the `(bounded)` markings, and they are not formality.** **`P-GT-PU-2`**, **`P-GT-IM-2`** and
**`P-GT-TP-1`** each state a universal **larger than their tables**, and each **says so in its own
`Executed?` cell**: *"the universal is NOT proven, and no reader may read this row as its proof."* **A
DONE row that reports any of the three as a proof of the unbounded universal it states is a review
finding.**

**Item 3 — THE DECLARED-VERSUS-DISTINCT LEDGER, so the two figures are never conflated and the DECLARED
ones are always the cap comparison.**

| Row | Declared attempts | Its honest distinct figure | Why they differ (stated, not implied) |
| --- | --- | --- | --- |
| `P-GT-PU-1` | `60` | **`60`** | every cell is a distinct `(value, bounds)` pairing with its own declared answer |
| `P-GT-PU-2` | `11` | **`2`** | the table drives the three declared outcomes under the canonical pair and re-drives them under a second pair, so `11` drives read **`2`** distinct `(value, bounds)` pairs — **the reason this row is marked `(bounded)`** |
| `P-GT-PU-3` | `10` | **`10`** | five caller-object shapes × two access patterns, each a distinct drive |
| `P-GT-IM-1` | `18` | **`18`** | four `sizeFor` shapes × five gesture paths, each a distinct module-observable cell |
| `P-GT-IM-2` | `20` | **`18`** | **`2`** of the `5` seam shapes are byte-identical in what the module can observe across the bounds and default paths (the ABSENT and NON-CALLABLE shapes read the same in both), so the observable seam-path figure is `18` |
| `P-GT-IM-3` | `22` | **`22`** | four shapes × five drives plus two attach-time drives, each distinct |
| `P-GT-IM-4` | `28` | **`28`** | four `axisFor` shapes × the seven named seams, each a distinct assertion pair |
| `P-GT-SM-1` | `20` | **`19`** | one refusal path and one cancel path under a non-writing sink shape read the same terminal evidence — the collision is named in the row's own cell |
| `P-GT-SM-2` | `15` | **`15`** | five stages × three slot shapes, each a distinct stage observation |
| `P-GT-SM-3` | `5` | **`5`** | **five distinct compositions**, not five assertions over one execution |
| `P-GT-SM-4` | `12` | **`11`** | the two THROWING limbs (`defaultSizeFor` throwing, and the throwing bounds-at-default variant) are declared as **one** unusable-default class with a single observable |
| `P-GT-TP-1` | `60` | **`60` DRAWS** — and **the DISTINCT-MEMBER count is a REPORTED figure, never asserted** | **a DRAW IS NOT A SWEEP**: `30` draws over a `20`-member pool do **not** guarantee that every member is drawn, **and NO row may assert "all 20"** — **a DONE row claiming full pool coverage is a review finding** |
| `P-GT-TP-2` | `18` | **`18`** | six argument shapes × three entry-point drives, each distinct |

**The DECLARED figures are what the `≤100`/row and `≤400` caps are compared against. The distinct figures
are REPORTED BESIDE them and are NEVER substituted for them** (`docs/decisions.md`
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, sub-rule 2; `§5.3` item 11).

**Item 4 — a DRAW is not a SWEEP, and the `P-GT-TP-1` pool is a SUBSET of the input space by
construction.** **The pool holds `20` members and the row draws `30` times**, so the row **reports** its
distinct-member count and **asserts nothing about coverage**. **The pool's silence about a shape it does
not list is a stated boundary, not an unrecorded omission**: a **revoked `Proxy`**, a **`Symbol.toPrimitive`
that throws**, and a **seam whose getter returns DIFFERENT answers on successive reads** are deliberately
**excluded** (the last one because it would make a draw ambiguous, strategy-discipline item 6(b)).

**Item 5 — the `S-GT-TOTAL-1` generator's ONE stated bias, recorded rather than hidden.** The pinned
LCG's reduction `index = stateₙ₊₁ mod 20` maps `2³² = 4294967296` states onto `20` residues, and
**`4294967296 mod 20 = 16`**, so **the first `16` pool indices are reachable from `⌈2³²/20⌉ =
214748365` preimages and the remaining `4` from `214748364`** — a **relative bias of ≈ 2.7 × 10⁻⁹ per
draw**, inherited from the sibling registers' identical one-step form. **It is stated so no later pass
reads the draw as exactly uniform; it is not a defect of the row** (the register is a **pinned-seed
reproducibility** instrument, not a sampler), and **the form, the seed and the caps are the ones the
ACTIVE rules pin.**

**Item 6 — `P-GT-SM-3` carries the single-writer discipline and NOTHING ELSE does.** **A DONE row or
audit that quotes *"one commit per gesture"*, *"cancel ⇒ zero writes"* or *"the two positive controls"*
MUST cite `P-GT-SM-3`** (with `P-GT-SM-1` for the per-path counts), and **no other register row may be
read as carrying them.** **`P-GT-PU-1` carries the pure function's TOTALITY; `P-GT-TP-1` carries the
seven-seam totality universal.**

**Item 7 — THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING (ruling 10; the check
`docs/specs/gsession.md` `§5.5.2` item 7 runs, and the class that was unsatisfiable in two sibling
units).** **The rule: a pool or table member that CONTRADICTS its own row's declared boundary is a
REGISTER DEFECT, and it is checked at AUTHORING TIME, not at green time — the member must satisfy the
row's boundary text, or the row must declare that member as an intended class with its OWN expected
outcome asserted, PER MEMBER.** **The check was run over all `13` rows, and the RESULT is CLEAN** — every
member of every pool/table satisfies its own row's declared boundary text, and **no member required a
boundary narrowing**:

| Row | Its declared boundary | The check's result |
| --- | --- | --- |
| `P-GT-PU-1` | *every input returns the declared `number`: the `typeof`-gate's `NaN`, or the formula verbatim* | **CLEAN** — all `60` cells are declared classes with their own answers; **the `9` bounds classes include the two that a careless boundary text would contradict** (`{min: NaN, max: 100}` is a `number`-typed bound pair whose answer is the FORMULA's `NaN`, and `{min: 0, max: Infinity}` is a `number`-typed non-finite pair answered by the formula verbatim), **and both are declared as such in the strategy cell**; `-0` is declared PRESERVED, and the `33` cross-product cells drive it |
| `P-GT-PU-2` | *exactly one of three declared outcomes per drive, over one pair at a time* | **CLEAN** — every drive declares its outcome, **including the inverted-pair drive, whose declared outcome is named as the `min` limb rather than left implicit**; the row's `(bounded)` marking names the `2`-pair scope, so no member claims a larger coverage than the table has |
| `P-GT-PU-3` | *pure: equal repeats, untouched arguments, frozen twins behave alike* | **CLEAN** — shape `(5)` (a `Map` as the `bounds` argument) is the deliberate unusable-member case, **and the row asserts that unusable answer AND the untouched-arguments clause for it**, so it does not contradict the purity boundary |
| `P-GT-IM-1` | *`sizeFor` at most once per gesture, only at a resizable `'end'` terminal, and its absent/non-callable/throwing shapes write zero* | **CLEAN** — all `4` shapes are within the declared domain, and path `(d)` (a refused terminal) and path `(e)` (a mid-gesture `dispose`) are **declared non-evaluating paths**, which is exactly what the boundary says |
| `P-GT-IM-2` | *`boundsFor` at most once per terminal that evaluates a value; `defaultSizeFor` at most once per reset and never elsewhere* | **CLEAN** — path `(d)` (a `cancel`) is declared as driving **no seam at all**, shape `(4)` (an unusable pair) is declared as **the `NaN` class with its own expected write count of `0`**, and shape `(5)` (throwing) is declared as **the propagating class** — **every member has its own limb, so the boundary text and the members agree byte for byte** |
| `P-GT-IM-3` | *exactly once per established gesture, zero at `attach`, truthiness decides* | **CLEAN** — the four shapes are exactly the declared domain, and **drive `(a)` (attach only) and drive `(d)` (a refused establishment) are the two zero-count cases the boundary names**; **the row declares that the ABSENT and NON-CALLABLE shapes yield `0` calls rather than 1** (the "absent ⇒ not resizable" default), so no member contradicts the count boundary |
| `P-GT-IM-4` | *`axisFor` at most once per established gesture and its three failure shapes are swallowed with `undefined`* | **CLEAN** — the four shapes are the declared domain, and **the `28`-attempt seam-set half is a SET claim over a closed seven-name list, not a sample**, so there is no member to contradict it; the identity clause is asserted against the token the row's own `axisFor` returned |
| `P-GT-SM-1` | *the declared sink count per terminal path, never more than one per gesture* | **CLEAN** — all `4` paths and all `5` sink shapes have a declared pair; **the slot-empty shape `(c)` is declared as the `committed: true`-with-nothing-written class** (which is why its expected count is stated as **`0` writes** and not as "the count the session reports"), and the refusing shapes are declared inert |
| `P-GT-SM-2` | *zero before establishment, never twice, nothing retained* | **CLEAN** — the `3` slot shapes include the **never-established** shape, which is the row's own boundary case, and stage `(4)` (a reset on the idle controller) is declared with its own expected refusal; **the capture clause is declared as a `0` at EVERY stage**, which is the shape the absence of an opt-in produces |
| `P-GT-SM-3` | *the declared count per composition shape, both readings agreeing for the correct one* | **CLEAN** — the two failing shapes are **DECLARED AS FAILING** (which is what a positive control is), and the row's boundary text says so; **nothing in the row requires a two-writer composition to pass**, so there is no contradiction. *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: the boundary text's *"both readings agreeing for the correct one"* is EXACT — the agreement holds for the CORRECT (single-writer) composition, and for the TWO-WRITER composition the sink's own record reads `2` while the controller's counter still reads `1`, which is the DIVERGENCE the row needs in order to be falsifiable. `§5.5.1 P-GT-SM-3` now says both things, and this cell's boundary reads them the same way.)* |
| `P-GT-SM-4` | *one session call with the clamped value; zero session calls on every refusal class; the session's codes verbatim* | **CLEAN** — the six shapes are the complete entry-point domain (**success, no-gesture, unusable default through two limbs, unusable bounds, disposed/not-resizable**), each with its own declared code and call count — *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this cell AS FILED ended with *"shape `(5)` is declared as the two-counters-differ class, and shape `(6)`'s two variants are declared separately"*; that as-filed tail is SUPERSEDED because `§5.5.1`'s own `P-GT-SM-4` cell now states the shapes in the row's declared order, where `(5)` IS the two-counters-differ class and `(6)` is the **`isResizable`-FALSE / `'not-resizable'`** limb whose second variant is the DISPOSED-session case — while the LANDED test file drives six shapes in which `(6)` is the DISPOSED case and the non-resizable limb is NOT among its cells, a TEST-SIDE residue reported at `§5.5.1 P-GT-SM-4` and NOT editable by this pass.)* |
| **`P-GT-SM-5`** *(the `detach()` MULTI-ELEMENT limb — **⟶ ADDED 2026-09-27 BY THE RED-RUN AMENDMENT PASS**; a `§3.1`-CLASS CLAUSE CELL carrying **NO ATTEMPT TERM**, appended in place after `P-GT-SM-4` and OUTSIDE the register's `299` total and `≤400`-cap comparison)* | **`P-SM` clause cell** *(no attempt term — NOT one of the `13` attempt-bearing rows)* | **`detach()` is ZERO-ARGUMENT and CONTROLLER-WIDE: it refuses — returning `false` with ZERO session calls — while MORE THAN ONE element is attached to THIS controller, because the session is shared and detaching it on behalf of one control would detach every OTHER control's listeners; with EXACTLY ONE element attached it delegates `session.dispose()` exactly once and returns `true` iff the session reports `complete === true`; the refusal makes NO session call of any kind, leaves every attached element's ledger entry intact (nothing is half-detached), and `detached` does NOT read `true` on a refusal.** **THE DEFAULT'S STATUS IS STATED WITH IT: this is the `§7a.1` item 2 WORKING DEFAULT, NOT a ruled clause — `§7a.1` item 2 stays OPEN and a later pass that changes it MUST open a gate.** | **NOT APPLICABLE — clause cell, no attempt term** *(its drives are named in the cell to its right; no cap comparison, no `(bounded)` marking and no distinct figure attach to it)* | `M-13` (**the red set's CARRIER for this limb**), `M-20` (**the new `§3.1` clause row this pass adds**), `§2.1` item 4 (the `detach` doc block), `§7a.1` item 2, `§2.5` item 4 (the one-controller-per-session requirement's practical form) | **NONE** *(no strategy id: this cell is not executed by a register strategy, and inventing an `S-GT-*` id for it would imply an attempt term it does not carry)* | **NO enumeration strategy — the cell names its drives and nothing more.** **Its drives (for the TestWriter's clause row, `M-20`):** **(1)** `attach(elA)`, `detach()` ⇒ `true`, exactly ONE `session.dispose()` call, `detached` reads `true`; **(2)** `attach(elA)`, `attach(elB)`, `detach()` ⇒ **`false`** with **ZERO session calls** and **nothing dropped** (both ledger entries intact, `detached` still `false`), and a subsequent `detach()` after one element is released still refuses while two remain; **(3)** `attach(elA)`, `detach()`, `detach()` ⇒ the second call makes ZERO session calls and returns `false` (**`M-13`'s idempotence limb**), and `detached` reads `true` forever after. |

**⟶ RECORDED 2026-09-27 (THE RED-RUN AMENDMENT PASS) — THE `SM` FAMILY NOW PRINTS FIVE CELLS, AND THE
ARITHMETIC DID NOT MOVE.** **`P-GT-SM-1`..`P-GT-SM-5`, of which FOUR (`SM-1`..`SM-4`) carry the four
attempt-bearing terms `20` + `15` + `5` + `12` = `52`, and `P-GT-SM-5` carries NONE.** **The register
therefore remains `13` attempt-bearing rows in four families (`3` + `4` + `4` + `2`) summing to `299`,
the caps are unchanged, the `(bounded)` set is unchanged at `3` rows (`P-GT-PU-2` · `P-GT-IM-2` ·
`P-GT-TP-1`), and NO EXISTING ID WAS RENUMBERED or moved — `P-GT-TP-1`/`P-GT-TP-2` keep their positions
after the `SM` family.** **The landed test file does not yet carry an explicit `P-GT-SM-5` cell (it
drives the limb as an arm of `M-13`), and THIS PASS MAY NOT EDIT IT (`§5.1`'s DENIED set): that is a
`TEST-SIDE` residue reported here rather than silently left.**
| `P-GT-TP-1` | *no method throws, with the throwing-`boundsFor`/`sizeFor` propagation as the named bound* | **CLEAN** — **the pool's members are totality inputs only**: the row claims no code boundary and no value boundary, so there is nothing for a member to contradict; **the one member that could have contradicted it — a shape that makes `boundsFor`/`sizeFor` throw — is not in the pool at all**, and the bound is stated in the row's own words rather than left implicit |
| `P-GT-TP-2` | *every entry point returns its declared shape for every argument shape* | **CLEAN** — the `6` argument shapes × `3` entry-point drives are all totality inputs, and each drive's declared return kind is stated; no member requires a code, a value or a state the boundary does not name |

**A register row found to contradict its own boundary at green time is a SPEC FINDING, reported rather
than tuned to green** — and **the LANDED tables must be re-checked by the adversarial pass**, because
this check was run against **this filing's tables**, not against the executed ones.

**Item 8 — THE EXECUTED LAYER IS NOT THIS FILING'S, stated once.** **This pass RAN NOTHING.** Every cell
above is **execution DESIGN**; the **measured** figures are the ones this unit's own
`tests/gutter.test.ts` and the independent blind run produce. **A read-only PBT audit may not report a
row as executed on the strength of this table alone** — the audit reads **the TestWriter's tables in
`tests/gutter.test.ts`** **and** this cell's arithmetic.

### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**`299` = `60` (`P-GT-PU-1`) + `11` (`P-GT-PU-2`) + `10` (`P-GT-PU-3`) + `18` (`P-GT-IM-1`) + `20`
(`P-GT-IM-2`) + `22` (`P-GT-IM-3`) + `28` (`P-GT-IM-4`) + `20` (`P-GT-SM-1`) + `15` (`P-GT-SM-2`) + `5`
(`P-GT-SM-3`) + `12` (`P-GT-SM-4`) + `60` (`P-GT-TP-1`) + `18` (`P-GT-TP-2`).**

**⟶ CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT PASS — ANNOTATE-NEVER-REWRITE, so the AS-FILED form is
kept visible at this site):** **the line above AS FILED read `314` = those SAME thirteen terms**, and
**`314` IS NOT THE SUM OF ITS OWN TERMS** — the thirteen printed terms sum to **`299`**, which is why
the declared total is now **`299`**. **The as-filed `314` is recorded here as a dated CORRECTED
ARITHMETIC DEFECT of this filing, not as a term and not as a total:** **NO ROW'S TERM MOVED** (all
thirteen printed terms are byte-identical to the as-filed ones), **the caps are compared against `299`**
(`299 ≤ 400` total, per-row maximum `60` ≤ `100`), and **the ACTIVE rule this defect belongs to is
`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` — *a total that is not the sum of its own
terms is a REVIEW FINDING*.** **`U-GUTTER` IS THE FIFTH CONSECUTIVE SIBLING TO HIT THIS CLASS** — the
rule's worked examples are `U-PROJ` (as-filed `239` → counted `231`), `U-LISTHOST` (as-filed `157` →
counted `168`), `U-ZONES` (as-filed `400` → counted `369`) and `U-GSESSION` (as-filed `468` → counted
`396`), and this unit is the fifth.

**CHECK THE ADDITION TERM BY TERM, so the arithmetic is checkable rather than asserted — the ACTIVE rule
(`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) requires exactly this, because a
mis-sum corrected only at the red run is the RECURRING finding:**

| Step | Running total | Term added |
| --- | --- | --- |
| `1` | `60` | `60` (`P-GT-PU-1`) |
| `2` | `71` | `+ 11` (`P-GT-PU-2`) |
| `3` | `81` | `+ 10` (`P-GT-PU-3`) |
| `4` | `99` | `+ 18` (`P-GT-IM-1`) |
| `5` | `119` | `+ 20` (`P-GT-IM-2`) |
| `6` | `141` | `+ 22` (`P-GT-IM-3`) |
| `7` | `169` | `+ 28` (`P-GT-IM-4`) |
| `8` | `189` | `+ 20` (`P-GT-SM-1`) |
| `9` | `204` | `+ 15` (`P-GT-SM-2`) |
| `10` | `209` | `+ 5` (`P-GT-SM-3`) |
| `11` | `221` | `+ 12` (`P-GT-SM-4`) |
| `12` | `281` | `+ 60` (`P-GT-TP-1`) |
| `13` | **`299`** | `+ 18` (`P-GT-TP-2`) |

**The step `13` row AS FILED read `314`, and the as-filed `314` is kept visible here as the corrected
arithmetic defect's own site (`⟶ CORRECTED 2026-09-27`, THE RED-RUN AMENDMENT PASS): steps `1`–`12` were
correct as filed and step `13` is the row where the mis-sum landed — **the running total after
`+ 18` (`P-GT-TP-2`) is `299`**, and the term-by-term chain is
**`60 → 71 → 81 → 99 → 119 → 141 → 169 → 189 → 204 → 209 → 221 → 281 → 299`**.*

**THE TOTAL IS THE SUM OF ITS OWN TERMS. It is inside the `≤400` register cap (`299 ≤ 400`), and the
per-row maximum is `60` (`P-GT-PU-1` and `P-GT-TP-1`, tied), inside the `≤100`/row cap. The family
subtotals are also checkable: `PU` `= 60+11+10 = 81` · `IM` `= 18+20+22+28 = 88` · `SM` `= 20+15+5+12 =
52` · `TP` `= 60+18 = 78`; and `81+88+52+78 = 299`.** **⟶ CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT
PASS): the sentence above AS FILED reached `314` at each of its three sites — *"inside the cap
(`314 ≤ 400`)"* and *"`81+88+52+78 = 314`"* — and the as-filed figures are kept visible here as the same
corrected defect; the family subtotals were correct as filed (`81`/`88`/`52`/`78`) and only the SUM was
wrong.**

**THE ARITHMETIC WAS CHECKED BEFORE FILING, and the check's own terms are printed here so a reader can
re-run it without re-deriving the rows.** **No term was reconciled after the first pass — this register
was enumerated WITH its terms and summed once**, which is what the ACTIVE rule's class requires (the
sibling units' worked examples are `U-PROJ`'s as-filed `239` → counted `231`, `U-LISTHOST`'s as-filed
`157` → counted `168`, `U-ZONES`'s as-filed `400` → counted `369`, and `U-GSESSION`'s as-filed `468` →
counted `396`). **`314` is therefore both the DECLARED total and the enumeration's own sum.** — **⟶
CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT PASS): THE AS-FILED SENTENCE ABOVE IS FALSE AND IS KEPT
VISIBLE AT ITS OWN SITE. `314` was NOT the enumeration's own sum — the register's own thirteen printed
terms sum to `299`, and `299` is therefore the DECLARED total and the only figure the caps are compared
against. The as-filed claim that *"the arithmetic was checked before filing"* did not catch the mis-sum;
the RED RUN did, which is why the ACTIVE rule's own text says *"a mis-sum corrected only at the red run
is the RECURRING finding"*. `U-GUTTER` is the FIFTH consecutive sibling in this class.***

**How the counting works, so the numbers are checkable rather than asserted.** **One "attempt" = one
exercised DRIVE of one register row** — one `clampToBounds` call on one declared input cell, one seam
drive on one path, one terminal drive under one sink shape, one reset entry-point drive on one reading,
**one totality drive of one drawn shape in one configuration**, or **one entry-point call on one argument
shape**. **Setup is NOT counted** (constructing a session double, building a recording log, snapshotting
state is precondition, not attempt). **Per-call ASSERTIONS are NEVER counted as attempts** —
`P-GT-TP-1`'s per-call assertions (`≥ 3` each) are reported as that row's **`assertions` figure**, which
is the granularity the ACTIVE rule's DUAL-COUNT sub-rule requires. **The DECLARED total is `299` and the
caps are compared against it.** **A DONE row reporting a total other than the one the test file's tables
produce is a review finding** (`§5.3` items 10/11).

**Register integration with the legs and the DONE row (so the property layer is not an orphan).** The
register rows are carried by **the same node suite** `npm test` already runs (`§5.2` leg 1) in **this
unit's own** `tests/gutter.test.ts` — **no new leg, no new file, no new script, no `package.json`
change, no new dependency** (`§5.1`'s diff scope is unchanged; **leg 4 is a standalone invocation, not a
script**). **No `[U]`/`[D]` row exists to depend on** (`§5.2`), so **no register row can be
layer-blocked.** **`§5.3`'s DONE row carries items 10 and 11** — the per-row counts, strategy ids, the
pinned seed and its step form, the stop-after-5 status, the total against the caps, the `(bounded)`
sentences, **and the arithmetic printed with its terms.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.**

1. **THE PURE HALF.** *If a pure TOTAL `clampToBounds(value, bounds)` cannot return a declared `number`
   for every input in its enumerated domain — holding the `typeof` gate, the formula verbatim, the
   inverted-pair and `-0` readings, and the absence of coercion, of a result record, of a built-in
   literal and of a second clamp — then the pure half is not realisable **the way ruling 12 pins it**, and
   the unit fails on that half.* **The tests are `PU-1`'s and `PU-2`'s rows: `M-2`, `M-19`, `F-1`..`F-8`,
   `I-1`, `I-12`, and the register rows `P-GT-PU-1`/`P-GT-PU-2`/`P-GT-PU-3`.** **(This is also where the
   unit's own warrant is tested: it must satisfy the ruling AS WRITTEN, not a re-reading of it —
   `A-d4` overrode the arithmetic objection rather than answering it, so the ruling's own words are the
   standard.)**
2. **THE COMPOSITION HALF.** *If a controller COMPOSED ON the landed session cannot derive — rather than
   re-express — **"one commit per gesture · `cancel` ⇒ zero commits and zero sink writes · `reset` ⇒ at
   most one commit of the CLAMPED supplied default**" as a **single-writer discipline over one named
   sink**, while keeping **no drag arithmetic, no coordinate and no magnitude channel** and adding **no
   second gesture authority**, then the composition is not realisable and the unit fails.* **The tests
   are `M-1`, `M-4`..`M-6`, `M-12`..`M-17`, `F-9`/`F-10`/`F-11`, `I-2`/`I-2b`/`I-3`/`I-4`, `R-13`, `R-14`,
   and the register rows `P-GT-SM-1`..`P-GT-SM-4`/`P-GT-IM-1`..`P-GT-IM-4`.**
3. **THE LAYER HALF.** *If the unit cannot express the mandatory geometry clause WITHOUT making a
   rendered-geometry claim — i.e. if any row of it needs a `[U]` or `[D]` leg to be falsifiable — then
   the unit exceeds its provable layer and the unit fails.* **The tests are `R-8` + `I-11` + `§5.2`'s
   refusal to offer a `[U]`/`[D]` row + `R-17`'s precondition probe**, and the finding it prevents is the
   false-green class in which a node-suite green is reported as a rendered or retargeting proof.

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause
is found and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; **(c)** the unit is **declined back** — admissible only if a clause
is shown to be **inseparable from the session's own lifecycle** (which would refute ruling 3's
composition claim) or **inseparable from rendered geometry** (which would refute the `[U]` refusal), and
**either would be a NEW GATE, not this unit's call** (`H-r1`'s cite-and-supersede rule).

**Stop conditions (`S-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]`/`[D]`
leg** — it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This
filing has exactly ONE such candidate and it is already named: the `[D]`-shaped row that
`U-DIVERGENCE-EXT` (`C2`) would gate, which is NOT CLAIMED and is NOT authored as a row at all**
(`§5.2`, `R-17`). **Every other claim in this file is a value, call-count, code or file-property claim
over arguments.**

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **one new
   spec file** and **nothing else**. The module, the test file, the red set, the legs, the register's
   executed layer and every gate are **OWED**; **the unit is NOT delegable until a TestWriter has RUN and
   REPORTED the red set** (`§4.5`).
2. **NO MAGNITUDE-EQUIVALENCE CLAIM, EVER.** *What local handlers purchase is origin REACHABILITY, not
   magnitude-equivalence.* The MCP dispatch surface carries an event **name** with no coordinates, so
   **this unit ships NO drag arithmetic, NO coordinate read and NO magnitude — a NAMED, RECORDED COST.**
   **No pass may claim agent-drivable drags, and no pass may claim this unit's committed value is
   magnitude-equivalent to `provident.op`'s `state-slice`** (`§1` item 2; `I-11`).
3. **THIS UNIT WILL BE A `src/shared/` MODULE IMPORTED BY NO `src/**` FILE, AND THAT IS LOAD-BEARING FOR
   EVERY CLAIM IN `§3`.** **Its value is REUSABLE-CONTRACT value**: a controller any consumer can wire to
   its own bounds, default, resizability and sink. **It ships NO UI and has NO IN-TREE CONSUMER**, so
   **its green proves THE CONTRACT HOLDS FOR A CALLER — not that the app behaves differently.** No
   window, no IPC round-trip, no MCP transport and no renderer behaviour changes when it lands
   (`R-6`/`R-12` pin the claim; `§1` item 8).
4. **THE GEOMETRY LIMIT, where a reader meets it.** **This unit asserts a LIFECYCLE, its CALL COUNTS and
   one pure function's arithmetic — and NEVER rendered geometry.** *"The contract and its call counts are
   provable here; any rendered-geometry claim is UNPROVABLE in this repo today."* **No `[U]` row is
   offered and no `[D]` row is claimed** (`§5.2`), because **the module has no importer and reads no
   coordinate — there is no rendered surface to observe and nothing for a measuring leg to measure.**
   **Gate 6 is likewise STRUCTURAL, with its reason stated** (`§5.2`).
5. **A SINK-CALL GREEN IS NOT A RENDERED-WRITE GREEN.** Every counted write is **a call into an
   argument-supplied function**, **never a fact about a pane's width, an applied CSS custom property, a
   layout pass or a rendered geometry** (layer anchor 5).
6. **THE `[U]` REFUSAL MAY NOT BE CIRCUMVENTED BY MOVING A ROW.** `docs/specs/zones.md` `§4.4 S-6`'s
   sentence — *"the row may not be moved to the `ui` leg silently"* — is carried in this unit's own
   three-part clause (`§5.2`), and **a rendered-geometry row for this family must come from `E10`**, the
   unit that owns the rendered surface, **through its own spec and its own preconditions.**
7. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case coverage
   matrix, no demo-page index and no page-design contract to update**. **`R-9` is the PROBE that keeps
   this claim falsifiable**, and **if that file comes to exist, this unit owes the coverage row and the
   demo-page entry** — with the honest note that a mechanism with no UI surface can only contribute an
   **absence** row.
8. **THE PARKED CAPTURE-RELEASE QUESTION IS NEITHER RELEASED NOR RE-OPENED.** The session's parked
   question — whether a capture taken at an establishment that then fails should be released — **stays
   PARKED with its existing trigger** (`gsession.md` `§2.3` item 6; `docs/pending.md` §I). **This
   composition never opts in, so it produces no capture at all** (`§0A` note 7); **a composing unit that
   needs a release reopens that question as a NEW clause with its own gate.**
9. **THE REGISTER'S MARKINGS ARE EXECUTION DESIGN, NOT RESULTS.** This pass **ran nothing**. **The
   arithmetic was checked BEFORE filing and the total is `314`, the sum of its thirteen terms with the
   term-by-term addition printed at `§5.5.3`** — and **a row marked executable here that is broken when
   the red runs is a SPEC FINDING, reported rather than tuned to green** (`§5.5.2` items 7/8). **⟶
   CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT PASS): THIS ITEM'S AS-FILED CLAIM IS FALSE ON ITS OWN
   TERMS AND IS KEPT VISIBLE ABOVE.** **`314` is NOT the sum of the thirteen terms — they sum to `299`
   (`60 → 71 → 81 → 99 → 119 → 141 → 169 → 189 → 204 → 209 → 221 → 281 → 299`, the addition table at
   `§5.5.3`) — so the DECLARED total is `299`, the caps are compared against `299`, NO ROW'S TERM MOVED,
   and the as-filed `314` is recorded as a dated corrected arithmetic defect (`docs/decisions.md`
   `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE: *a total that is not the sum of its own terms is
   a review finding*).** **This is the fifth consecutive sibling in that class, and the defect was
   caught by the gate-3 RED RUN, not by the filing's own check — which is exactly the failure mode the
   ACTIVE rule's text names.**
10. **NO ROW OF THIS UNIT CLAIMS AN ENGINE BEHAVIOUR, A PACKAGE CAPABILITY OR A `bodyRuns`/`BARE-TEXT-EMIT`
    SURFACE.** This module **imports no engine surface at all** (`§0A` note 2; `R-4`), and **it exercises
    `provident-ssr` nowhere** — so **no `docs/defects.md` / `docs/HANDOFF.md` entry can arise from this
    unit**, and **none may be written for it.**
11. **NO MCP SURFACE, NO STORE, NO PERSISTENCE, NO CSP CHANGE, NO SHIM CHANGE, NO IPC METHOD, NO
    JOURNAL.** `ALL_TOOLS` stays the pinned **21-name** set, `RpcMethod` **21**, `MUTATING_METHODS` **7**,
    `VALID_GROUPS` **5**; **this unit appears in none of the six registration sites**; and **`stats()` is
    a module method, not an agent-reachable surface** (`§0A` note 10; `I-13`).
12. **THE CODE DOMAIN IS CLOSED, AND THE TWO ADDED CODES ARE NAMED.** The session's SEVEN-member union is
    unchanged and **no eighth member is added to it**; **this controller's `'unusable-default'` and
    `'not-resizable'` are its own entry-point codes and never enter the session** (`§2.1`'s note,
    `§2.3` item 4's reset result-code table, `I-14`, `§7a.1` item 1). **⟶ RECORDED 2026-09-27 (THE
    RED-RUN AMENDMENT PASS): the as-filed item named ONE added code; the ruling declares TWO, so the
    domain is NINE members (the session's seven plus the two local) — no SESSION member moved.**
13. **THIS UNIT'S WARRANT IS THE RULING PLUS ITS CLAUSE ROWS.** `A-d4` **OVERRIDES** the
    `ARITHMETIC-OVER-INJECTED-VALUES` objection; it does **not** answer it. **No DONE row, no greens
    artifact and no later pass may describe this unit as having argued or answered the
    mechanism-vs-UI-element classification** (`§0A` note 12; `docs/decisions.md`
    `GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS`).
14. **THE GUTTER UI IS NOT THIS UNIT.** **Ledger row `E10` is a `PROPOSED` row, awaiting the architect's
    admission**, and **`E3` does not owe it** (`§1` item 5; ruling 12). **The `E3` row's own `Legs` cell
    was corrected in the gate-1 pass to a REFUSAL with its structural reason, not an offer** — and **this
    filing carries that refusal as the three-part clause** (`§5.2`).
15. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/gutter.md` — and edited NO existing file.**
    It ran **no test, no suite, no leg, no trio, no `tsc` invocation and no git command**; it wrote **no
    code**; and it touched **no `src/**`, no `tests/**`, no sibling spec, no tracker, no `package.json`,
    no `scripts/**`, no config and no adjacent repo.** **The tracker cells it leaves stale — `E3`'s spec
    cell reading `OWED — not filed`, and the row's status — are the SUPERVISOR's to reconcile**, recorded
    here so the staleness is **attributable rather than silent** (`§8`).

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **THREE clauses** could not be derived **falsifiably**
from the gate-1 record, because **two admissible readings both satisfy its words and the choice changes
either a PUBLIC SIGNATURE or a CONSUMER OBLIGATION.** **They are REPORTED here with a WORKING DEFAULT
(this filing's choice, implemented in `§2` and marked as a choice), a RECOMMENDATION and the CLAUSE each
one BLOCKS.** **No item is left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or
diff-scope clause is weakened, widened or re-scoped by this report.** **A later pass that changes any of
these three defaults MUST OPEN A GATE** (`H-r1`'s cite-and-supersede rule).

### 7a.1 THE OPEN QUESTIONS — three items, each with a working default, a recommendation and a blocked clause

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **The controller's OWN refusal code for `reset`'s unusable default** — ruling 9 says *"ZERO session calls when the default is unusable"* but does not say **what the caller is told**; and ruling 9 ALSO says *"the session's own codes propagate VERBATIM (the seven members, no eighth)"* | Two readings both satisfy the record: **(i)** the refusal reuses one of the session's seven codes, or **(ii)** the controller reports its own entry-point code. **A row cannot assert a code without choosing**, and the two readings differ on the wire — **and (i) would either mis-report a `'no-gesture'` for a session that was never asked, or force the controller to call the session (which ruling 9 forbids on that path)** | **A controller-local code `'unusable-default'`**, emitted ONLY on the entry point's own refusal path, **never passed into the session**; the session's seven codes still propagate **verbatim** everywhere the session IS called (`§2.1`'s note, `I-14`, `F-12`, `§5.5.1 P-GT-SM-4`). **⟶ RULED 2026-09-27 (THE RED-RUN AMENDMENT PASS), and the ruling EXTENDS the default to a SECOND local code: the established-but-non-resizable refusal is the controller-local `'not-resizable'` — so the controller's local set is COMPLETE at TWO codes, `'unusable-default'` and `'not-resizable'`, both DECLARED in `§2.1` and both NEVER passed into the session.** **This item's QUESTION is ANSWERED for `'unusable-default'` (the recommendation was ACCEPTED); the `'not-resizable'` extension is itself the ruling, and the TWO-CODE domain is stated as a table at `§2.3` item 4.** | **Do you accept a controller-local refusal code that never enters the session (recommended), OR do you want the unusable-default path to reuse a session code (which would require the controller to make a session call on a path ruling 9 says must make none), OR do you want the entry point to return `'no-gesture'` as if no gesture existed?** — **⟶ ANSWERED 2026-09-27: the controller-local code is ACCEPTED, and the red-run amendment pass RULED the second local code `'not-resizable'` for the non-resizable path (`F-13`), so this item is CLOSED as to substance and its text is kept visible as provenance.** | **ACCEPT THE CONTROLLER-LOCAL CODE.** The session's union stays **seven members with no eighth** (the record's must-not list is satisfied exactly), **no session call is made on the refusal path** (ruling 9's clause is satisfied exactly), and **no caller is told something false about the session's state** — whereas a reused `'no-gesture'` would be **literally untrue** for a refusal that happens while a gesture IS active | **`F-12`**, **`F-13`**, **`M-16`**, **`M-17`**, `§2.3` item 4 clause 4 (and item 4's reset result-code table), `§2.5` item 5 clause 4, `I-14`, `§5.5.1 P-GT-SM-4`, `R-15` — **the reset surface's whole code half** |
| **2** | **`detach()`'s SCOPE, when the session is shared** — ruling 9 grants this unit **no session-ownership member** and ruling 14 forbids it a second authority, while `gsession.md`'s baseline restore (`dispose()`) is **SESSION-wide, not element-scoped** | **A row cannot assert `detach()`'s behaviour as written**: the session's `dispose()` detaches **every** installed control's listeners (`gsession.md` `§2.3` item 7.2), so **a per-control `detach(element)` implemented as `session.dispose()` would silently detach a sibling control's listeners** — while a controller that owns **one** control can detach honestly | **`detach()` takes NO argument and is the CONTROLLER's own baseline restore**; it **refuses (returns `false`, ZERO session calls) when MORE THAN ONE element is attached here**, because detaching the shared session on behalf of one control would detach the others (`§2.1` item 4, `M-13`, `§7` item 3's single-controller rule) | **Do you accept a controller-wide, zero-argument `detach()` that refuses while a second control is attached (recommended), OR do you want a per-element `detach(element)` that the controller cannot honestly implement without a second authority over the session's ledger?** | **`M-13`**, `§2.1` item 4, `§5.5.1 P-GT-SM-2` stage `(4)`, and **the "one controller per session" requirement's practical form** (`§2.5` item 4) |
| **3** | **This module's IMPORT of the session it composes, versus ruling 14's *"no import of any sibling — not even type-only"*** | The record's ruling 14 forbids **sibling imports** in the same breath as the `U-CENSUS` boundary, and a row cannot be written until the session's own import edge is classified: a strict reading of *"no import of any sibling"* would forbid **the composition's own type seam**, which would leave the controller unable to name the session's types at all | **EXACTLY ONE import statement exists in the module, and it is a TYPE-ONLY import from `./gesture-session.js`** — the session this unit composes, **whose delegate surface `docs/decisions.md` `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` freezes FOR `E3` TO WRITE AGAINST**; every other import — any other path, any value import of the session, any second statement — FAILS (`§0A` note 2, `R-4`) | **Do you confirm that the composed session is NOT the sibling-import class ruling 14 forbids (recommended — it is the surface this unit is defined by composing), OR do you want the module to declare a STRUCTURAL session type of its own and import nothing at all — which would duplicate a frozen contract in this spec and risk the signature-in-two-places hazard the freeze exists to prevent?** | **`R-4`**, `§0A` note 2, `§2.5` item 1, `§2.1`'s signatures (`SizeFor`/`CommitSink` name the session's own `GestureHandle`), and **`R-18`**'s precondition row |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `0` ruled by this filing
as contract · `3` OPEN with a working default and a recommendation · `3` clause groups blocked.** **Every
item's default IS implemented in this spec's text**, so **the red set may be authored against the
defaults** — but **each default is a DEFAULT, marked as one, and a later pass that changes one must open a
gate.** — **⟶ CORRECTED 2026-09-27 (THE RED-RUN AMENDMENT PASS): ITEM 1 IS NOW RULED IN ITS OWN CODE
HALF.** **The ruling ACCEPTS the controller-local code for the unusable-default path and EXTENDS it to a
SECOND controller-local code, `'not-resizable'`, for the established-but-non-resizable path, so the
controller's local set is COMPLETE AT TWO CODES and the complete `reset` result-code table is stated at
`§2.3` item 4.** **The `3`-item arithmetic is kept visible above as the FILING-TIME reading; the
ruled/reported split is now `1` item ruled (`1`), `2` items still OPEN with a working default (`2`, `3`).**
**Items `2` and `3` remain WORKING DEFAULTS:** `detach()`'s zero-argument controller-wide scope (now
carried by the explicit clause row `M-20` and the register-space cell `P-GT-SM-5`, which do NOT harden the
default into contract — `§7a.1` item 2 stays OPEN), and the type-only session import (`R-4`). **`§7a.1` is a sub-heading of `§7a`, and no section number moves.** **The delegation gate's
ambiguity condition is therefore NOT satisfied by this filing: `§4.5` records the unit as non-delegable
on the red-set condition, and the supervisor must ALSO route these three items** — this filing reports
them rather than silently adopting them, which is the discipline the gate requires.

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited
**by SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited
by ROW ID** (`C2`, `E3`, `E6`, `E10`), **never by line**. **`docs/decisions.md`'s row anchors drift** (rows
are appended), so its rows are cited **by NAME**. **This spec writes no line-count census of any file.**

| Source | Status for `U-GUTTER` | Where |
| --- | --- | --- |
| **`docs/specs/gutter-review.md`** — the CLOSED gate-1 record: the reviewed proposal, the three step verdicts and the twelve governing rulings, `C1`–`C5`, the must-not list, the provenance notes | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** Its twelve rulings are **derived** at `§0`, its `C1`–`C5` are satisfied at `§2.3` item 3 / `§2.4` item 2 / `§2.1` item 5 / `§2.3` item 5 / `§5.1`, and **the record is NEVER edited by this unit** (`§5.1`'s DENIED set item 10) | `§0`, `§0A`, `§2`, `§5.1`, and this row |
| **`SCH-6` (`GUTTER-RESIZE-CONTROLLER`), as ADOPTED-RESHAPED by `A-d4`** (`docs/pending.md` §A's `SCH-6` row; `docs/decisions.md` `SHELL-CHROME-PANES-ZONES-IN-SCOPE`) | **ADOPTED as this unit's upstream** — the surface `createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, commit})` plus the exported pure `clampToBounds`, **with the record's shape corrections** (no magnitude channel; opaque token; the reset entry point owned here) | `§0` rulings 2/5, `§1`, `§2.1`, `§8` (this row) |
| **The `SECOND-GESTURE-AUTHORITY` objection to `SCH-6`** | **ANSWERED — BY COMPOSITION.** The controller is *driven by* the session and re-expresses none of its lifecycle | `§0` ruling 3, `§2.5` items 1/3/6, `I-3`, `R-7`/`R-14` |
| **The `ARITHMETIC-OVER-INJECTED-VALUES` objection to `SCH-6`** | **OVERRIDDEN BY `A-d4` — NOT ANSWERED.** *"Both of this row's objections are CARRIED AS CONTRACT ROWS"* is **true only of the `SECOND-GESTURE-AUTHORITY` one**; this filing records the overridden status in its own words and **does not re-litigate it** | `§0` rulings 3/4, `§0A` note 12, `§7` item 13, `docs/decisions.md` `GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS` |
| **`A-d3` / `INTERACTION-NODE-LOCAL`** (`docs/decisions.md`) | **ADOPTED** — the node-local rule, and the reason this unit owns no listener and no element lookup | `§0` ruling 1, `§2.2` P-2/P-3, `I-6`, `R-2`/`R-3` |
| **`A-d4`'s mandatory GEOMETRY CLAUSE** | **DISCHARGED as this unit's own clause, in THREE PARTS**: the refusal · the structural reason (no importer; no coordinate read) · `docs/specs/zones.md` `§4.4 S-6`'s *"may not be moved to the `ui` leg silently"* | `§0A` note 11, `§5.2`, `§7` items 4/6, `I-11`, `I-15` |
| **`A-d4`'s panes/zones family scope ruling** (`SHELL-CHROME-PANES-ZONES-IN-SCOPE`) | **ADOPTED** — the warrant this unit stands on, recorded as the ruling plus its clause rows | `§0` rulings 2/4, `§0A` note 12, `§7` item 13 |
| **`docs/specs/gsession.md` `§2.5`'s numbered delegate list** (`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`) | **ADOPTED AS THE FROZEN AUTHORITY for every session call this unit makes** — and **narrowed here to the composition's own four entries** (`install` · `reset` · `dispose` · the three readings). **This filing re-opens NO item of the list** | `§2.5` item 1, `R-14`, `R-18`, `§0` ruling 5 |
| **`docs/specs/gsession.md` `§2.6`'s seven sibling properties** | **DERIVED, not re-expressed**: each of the seven is expressible through the landed session's own surface, and **this unit asserts nothing new about the session** | `§2.6`, `§3`, `§5.5.1` |
| **`docs/specs/gsession.md` `§2.6` item 7's composition rule** (one controller per session/control, REQUIREMENT + LIMIT) | **CARRIED in the same two-part form**: the requirement, **plus the honest limit that this mechanism has no shared registry and cannot detect a second controller**, discharged by the composition rule plus the call-count row | `§2.5` item 4, `§5.5.1 P-GT-SM-3`, `§4.4 S-8` |
| **`docs/specs/gsession.md` `§2.5` item 10** (`commit(gesture, value)`, `gesture.outcome` the discriminator) — **THE CORRECTED CITATION SITE** | **ADOPTED as the outcome discriminator's home**, with `§2.3` item 4's `handle.outcome` and `§0A` note 5 beside it. **This filing cites `§2.5` item 10 for the discriminator everywhere and never `§0A` note 6** | `§0` (the corrected-citation note), `§2.3` item 4 clause 7, `§2.5` item 5 clause 7, `M-15` |
| **`docs/specs/gsession.md` `§2.5`'s "Nothing else exists" paragraph (after item 11)** — **THE CORRECTED SITE** | **CARRIED as the discipline this unit's own frozen seam set applies to ITSELF** (`C3`): **exactly seven members, no eighth, no policy default, `capture` ABSENT** | `§2.1` item 5, `§0` (the corrected-citation note), `P-GT-IM-4` |
| **`docs/specs/census.md` `§1` item 7** — the DISSOLVED edge | **ADOPTED AS A BOUNDARY, NOT A DEPENDENCY.** No import, not even type-only; **`sizes` arrives only as an argument to the CONSUMER's own injected callbacks**; **an edge asserted the other way would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class). **The value relationship is kept and unweakened** | `§2.5` item 2, `§1` item 6, `R-4`, `§4.4 S-12`, `§8` (this row) |
| **`docs/next-steps.md`'s `## OPEN` row `E3`** — **its legs cell is the FOUR legs plus the three-part `[U]` REFUSAL** | **CARRIED VERBATIM IN SUBSTANCE**: the four legs at `§5.2`, the refusal at `§5.2` | `§5.1`, `§5.2`, `§5.3` item 6/7, `§0` ruling 16 |
| **`docs/next-steps.md`'s `## OPEN` row `E10`** (`U-GUTTER-UI`, the real gutter UI) | **NOT THIS UNIT / PROPOSED** — **`PROPOSED — awaiting admission`**, the architect's; **the UI half of the panes/zones family**, the only place a coordinate source or a `[U]` row could legitimately live, **blocked on `E3`/`E4`**, with **its own spec, its own preconditions and its own gate** — and **`E3` does NOT owe it** | `§1` item 5, `§5.1` item 11, `§5.2`'s `[U]` clause, `§7` item 14 |
| **`docs/next-steps.md`'s row `E6`** (`U-GSESSION`) | **NOT THIS UNIT — this unit is ITS COMPOSER.** The session is `DONE`; **its module, its test file and its spec are DENIED paths for this unit** | `§0` ruling 5, `§2.5` item 3, `§5.1` item 1/2 |
| **`docs/next-steps.md`'s row `C2`** (`U-DIVERGENCE-EXT`) | **OWED — `BLOCKED`, and it is a PRECONDITION, not a dependency of this unit.** `[D]` stays unclaimed until it lands; **no pass may claim `[D]` evidence without it** | `§2.6`, `§5.2`, `R-17`, `§7` item 4 |
| **`docs/next-steps.md`'s row `E4`** (`U-RELOCATE`) | **NOT THIS UNIT** — the second composer, whose spec must **CITE this unit's resolved channel clause rather than restate it** (restating it is the second-authority hazard) | `§2.6` (the `E4` note), `§8` (this row) |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`13` typed rows in four families**, **`299` attempts** printed **with their thirteen terms and a term-by-term addition table** *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: this cell AS FILED read `314`; the thirteen terms sum to `299`, so `299` is the declared total and the caps are compared against it. NO TERM MOVED and the as-filed `314` is kept visible at `§5.5.3` and in the `⟶ RECORDED` block at the file's top status area.**)*, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no extra leg**, seed `20260927` for the one generator, caps `≤100`/row · `≤400` total · stop-after-5, and the pool-versus-boundary check **RUN and CLEAN for all `13` rows**. **The read-only PBT audit is OWED to the adversarial pass** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — `13` rows enumerated as the **EXTENT** (the `≤8` threshold treated as a breakdown **signal**), the breakdown recommendation recorded **once** (`§5.5.2` item 1, naming `P-GT-TP-1`), and **no property dropped, merged or left unenumerated** | `§5.5`, `§5.5.2` item 1, `§5.3` items 10/11 |
| **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — the total is printed **with its per-row terms** (`299` = its thirteen terms; **⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: the as-filed `314` was A MIS-SUM and is kept visible at `§5.5.3`, in `§5.3` item 11, in `§7` item 9 and in this file's `⟶ RECORDED` block — `U-GUTTER` is the FIFTH consecutive sibling in this class, and the defect was caught by the gate-3 RED RUN**), **the addition is printed term by term and checkable at `§5.5.3`**, the **DECLARED and DISTINCT-DRIVE figures are both reported** (`§5.5.2` item 3, `FOUR` rows carrying both), and **a total that is not the sum of its own terms is a finding** | `§5.5.3`, `§5.3` item 11, `§7` item 9 |
| **`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (`docs/decisions.md`, ACTIVE) | **ADOPTED** — the panes/zones family is in scope and this unit is one of its mechanisms; **it is NOT a UI element** and is therefore outside the `AGENTS.md` provident-rendering constraint **without needing an exception** | `§0` ruling 2, `§1` items 3/5, `§5.5.1 P-GT-…`, `§4.4 S-13` |
| **`GUTTER-WARRANT-IS-THE-RULING-PLUS-ITS-CLAUSE-ROWS`** (`docs/decisions.md`, ACTIVE) | **CARRIED IN FULL** — `A-d4` overrides rather than answers; the `SECOND-GESTURE-AUTHORITY` objection is answered by composition; the `U-CENSUS` edge is dissolved; the A/B/C adoption is honoured (opaque token funded; `isResizable` once per gesture; the UI unit is `E10`) | `§0` rulings 3/4, `§0A` notes 3/5/6/12, `§1` item 5, `§7` items 13/14 |
| **Validity finding `V-13`** (*a second authority over the same gesture lifecycle*) | **ANSWERED by the composition boundary** — this unit adds no gesture authority and no second writer; the session remains the single authority | `§2.5` items 1/3/6, `I-3`, `§2.6` item 6 |
| **The `RK-19` false-green class** (a rendered property "proved" from a node green) | **CARRIED as the clause this unit exists to prevent** | `I-11`, `R-8`, `§5.2`, `§6` falsification `3` |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | `§1` item 6, `§3.5 R-9`, `§7` item 7 |
| **`docs/specs/gutter.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 5, `§7` item 15 |
| **`docs/specs/gutter-greens.md`** | **OWED** — this unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), named in the diff scope so it is not discovered later | `§5.1` row 4, `§5.3` item 8 |
| **`docs/specs/gutter-ui.md`** | **OWED — NOT this unit's file**; it belongs to `E10`, `PROPOSED`, if and when the architect admits that unit | `§1` item 5, `§5.1` item 11 |
| **`docs/specs/gutter-review.md`** | **ADOPTED (the authority) and FROZEN (not editable by this unit)** — this filing derives it and does not amend it | `§0`, `§5.1` DENIED item 10 |
| **The gate-3 RED RUN's findings (2026-09-27), as landed by the RED-RUN AMENDMENT PASS** | **CARRIED IN PLACE, each with its as-filed form kept visible**: **the `314` → `299` arithmetic correction** (the register's own thirteen terms; `U-GUTTER` is the FIFTH consecutive sibling in the class — `docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) · **the `reset` result-code table with the TWO controller-local codes** (`§2.1`'s note, `§2.3` item 4, `§2.5` item 5 clause 4, `F-13`, `R-15`, `I-14`) · **the `P-GT-SM-3` two-writer reading divergence** (`§5.5.1`, `F-9`, `R-13`) · **the `detach()` multi-element limb's explicit cells** (`M-20`, `P-GT-SM-5`) · **the completed `P-GT-SM-3` shape list** — and **the pass's `⟶ RECORDED` block at the file's top status area**, which states that **NO REGISTER ROW WAS ADDED OR REMOVED, the ONLY arithmetic change is the total's correction to `299`, NO ATTEMPT TERM MOVED, NO SECTION WAS RENUMBERED, and THE UNIT REMAINS NOT GREEN** (`90` rows run, `71` failed / `19` passed) | `§3.2 F-13`, `§3.1 M-13`/`M-20`, `§3.4 R-15`, `§3.3 I-14`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§7a.1`, and the top status block |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It
creates **one new spec file** and edits **no existing document** — **no tracker row is touched, no sibling
spec is annotated, and no citation is repointed.** **Row `E3`'s spec cell therefore still reads
`OWED — not filed` until the supervisor's reconciliation pass flips it** — recorded here so the staleness
is **attributable rather than silent**. **This pass ran no test, no leg and no trio, edited exactly ONE
file, and made no commit** (`RCA-8`: **the new file is untracked and must be committed by the
supervisor**).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its
vocabulary and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A
later pass appends **inside `§3a`/`§3b`** or inside an existing section; **no section number moves,
nothing is renumbered, and the `§5.3 → §5.5` gap (no `§5.4`) and the absent `§5.5.0` stay exactly as
recorded**, because **renaming is forbidden for citation stability.**

---

## 3a. Adversarial findings — **status as filed: `OWED`; this table is the SEED SET for the pass that will run**

**Status as filed: `OWED`. No adversarial pass has run for `U-GUTTER`** — **the unit has no green yet**,
and `RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding,
and none may be cited as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no
`src/**`), it **must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the
per-row attempts, the strategy ids, the `299` total against its terms *(**⟶ CORRECTED 2026-09-27, THE
RED-RUN AMENDMENT PASS: this sentence AS FILED read `314`; the thirteen terms sum to `299` and the
as-filed form is kept visible at `§5.5.3`. NO TERM MOVED.**)*, the stop-after-5 rule, the pinned
seed and its step form — **and it must RE-RUN the pool-versus-boundary check against the LANDED tables**
(`§5.5.2` item 7). **Its findings are recorded in `§3b` and a HOST finding is fixed here with regression
rows — never in `docs/defects.md`, because a host finding is this repo's.** **A genuine `provident-ssr`
package defect would go to `docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER patched** —
**though this unit exercises no package surface at all, so no such finding can arise from it**
(`§7` item 10).

**The six vocabularies the disposition table uses, defined so no status word is ever left undefined:**
**`CONFIRMED-FIXED`** = a host finding, fixed here and regression-tested as a new `§3` row · **`CONFIRMED-
RULED`** = a behaviour examined and ruled correct, with the ruling recorded and its reason · **`CONTRACT-
AMENDED`** = a seed that exposed a gap in this spec, amended with the old text kept visible as
`SUPERSEDED` · **`NOT-A-FINDING`** = raised, examined, recorded with the reason · **`OWED`** = raised and
**not yet resolved** (the pass may not report done with an `OWED` row) · **`BLOCKING — SCOPE`** = a scope
violation the unit may not land with · plus the two the sibling tables carry: **`OWED — HOST FIX`** (the
fix is owed to a later Implementer pass, red-first, with its regression row owed to the TestWriter) and
**`PARKED-with-revisit-condition`** (recorded, not fixed, with the condition that reopens it and its
owner). **The as-filed status of every seed below is `OWED`, and `OWED` is defined here rather than left
bare.**

| Seed | Adversarial question | Layer |
| --- | --- | --- |
| **`A-1`** | **THE SINGLE-WRITER PROBE, exhaustively:** across `end`, `reset`, `cancel`, a refused terminal, a mid-gesture `dispose`, a throwing sink, a slot-empty composition and a two-writer composition — **is the sink invoked exactly the declared number of times in EVERY case, and do the SESSION's own call record, the SINK's record and the controller's `stats().sinkCalls` AGREE?** Does any path produce **two** writes? | `[T]` |
| **`A-2`** | **THE PURE-FUNCTION PROBE:** is every cell of `P-GT-PU-1`'s enumerated domain answered by the `typeof` gate or by the formula **verbatim** — including `-0` preservation, the inverted-pair `min` answer, the `{min: NaN, max: 100}` and `{min: 0, max: Infinity}` readings, the throwing field read and the `33` cross-product cells? **Is there ANY input that makes it throw, return a non-`number`, or read a third thing?** | `[T]` |
| **`A-3`** | **THE SEAM-ORDER PROBE:** is the establishment order exactly `axisFor` then `isResizable`, and the terminal order exactly `boundsFor` then `sizeFor` (or `defaultSizeFor`) then the single clamp then the sink? **Can any path reach a seam out of order, twice, or not at all where the contract requires it?** | `[T]` |
| **`A-4`** | **THE TOKEN-OPACITY PROBE:** does ANY code path interpret the axis token — compare it, stringify it, test it, branch on it, or use it as a key? **Is the token handed to `boundsFor`/`sizeFor`/`defaultSizeFor` the EXACT object `axisFor` returned, in every configuration?** | static + `[T]` |
| **`A-5`** | **THE RESIZABILITY PROBE:** is `isResizable` called **exactly once per gesture, at establishment, and never at install** — and does a falsy (or absent, or throwing) decision leave the gesture **established, terminated normally, with an outcome that is NOT `'cancel'` and ZERO writes**? | `[T]` |
| **`A-6`** | **THE RESET-SURFACE PROBE:** across an active gesture, no gesture, an unusable default (absent and throwing), an unusable bounds pair, `isResizable: false` and a disposed session — **is the code the declared one, is the session's code propagated verbatim, is the session called the declared number of times (zero on every refusal class), is the committed value the CLAMPED default, and is `gesture.outcome === 'reset'` the only discriminator the sink sees?** | `[T]` |
| **`A-7`** | **THE HOSTILE-SESSION PROBE:** a session that is absent, a primitive, a `Proxy` whose traps throw, a frozen record, a record with throwing accessors, a record whose members are non-callable, a disposed session — **is every outcome the DECLARED valid-state degradation, with no throw at the consumer boundary and no half-applied ledger?** | `[T]` |
| **`A-8`** | **THE VOCABULARY PROBE — and its own collision:** does the module's source (incl. comments) or this unit's controlled corpora carry a coordinate/event token, an axis vocabulary token, a unit or token literal, a `threshold`, a selector, a census token or a store token — **raw, token-assembled or in a comment**? **The collision to resolve explicitly: this spec's prose and `R-1`'s own control data MUST carry the spellings while the module must not** — **is the scan's scope exactly `R-1`'s?** | static |
| **`A-9`** | **THE ACCESS PROBE:** any `document`/`window`/`globalThis`-rooted access, any assembled or aliased realm route, any `addEventListener`/`removeEventListener`/`setPointerCapture`/`releasePointerCapture`/`closest`/`querySelector*`/`getElementById`/`getComputedStyle`/`getBoundingClientRect` in **any** form? **Any positive is a `BLOCKING — SCOPE` finding.** | static |
| **`A-10`** | **THE CAPTURE-ABSENCE PROBE:** does the module pass a `capture` field anywhere — to `session.install` or to any other call? **Does the composition's own options carry a `capture` member?** Is the **positive control** honoured (a composition that DID opt in must FAIL `R-10`)? | static + `[T]` |
| **`A-11`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything beyond its one type-only session import? **Is `src/shared/dom-shim.ts` untouched, is `src/shared/gesture-session.ts` and its test file untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-12`** | **THE CROSS-UNIT BOUNDARY:** does this unit duplicate a `U-CENSUS` responsibility (a census read, a key set, a `sizes` map of its own), a `U-ZONES` responsibility (a token literal, a unit string, an emptiness rule), a `U-GSESSION` responsibility (a lifecycle, a listener, a commit count of its own), a `U-PROJ`/`U-LISTHOST`/`U-SLOTHOST` responsibility, or a `U-RELOCATE` one (a drop model, a reveal set, a threshold arithmetic)? **Duplication is a FINDING; and an obligation pulled in "for convenience" is the `S-12`/`S-10` class.** | static + `[T]` |
| **`A-13`** | **THE GEOMETRY/MAGNITUDE PROBE:** does any row, in the module or in the test file, assert or claim a **rendered-geometry, coordinate, layout, paint, applied-CSS, capture-in-a-renderer or magnitude** property — or does any pass report this unit's green as one, or claim an MCP-reachable drag? **Any positive is the mandatory clause's violation and an `RK-19`-class false green.** | static + the DONE row |
| **`A-14`** | **THE `[U]`/`[D]` PROBE:** does any pass offer a `[U]` row, claim a `[D]` row, move a rendered-geometry row to the `ui` leg (silently or not), or report gate 6 as *waived* rather than **structural with its reason stated**? **`R-17`'s probe result must be stated.** | the DONE row + `R-17` |
| **`A-15`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the `299` total** *(**⟶ CORRECTED 2026-09-27, THE RED-RUN AMENDMENT PASS: the as-filed `314` was a MIS-SUM of the same thirteen terms, whose sum is `299`; the audit must read `299`, with the as-filed `314` kept visible at `§5.5.3` — NO TERM MOVED. The gate-3 red run has already REPORTED `299` as the sum of the spec's own named terms, so an audit that still reads `314` as the declared total is auditing a superseded figure.**)*? Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form (`pool.length = 20`) what the test file actually contains? **AND: is every pool/table member still consistent with its row's declared boundary text** — `§5.5.2` item 7's check **re-run against the LANDED tables** rather than this filing's? **Any mismatch is a SPEC FINDING.** **A register row found by the red run to be BROKEN is a SPEC FINDING too, and the gate-3 red set reported several — including `P-GT-SM-2`'s *"bounded"* labelling and `P-GT-SM-4`'s non-resizable limb; both are recorded at `§5.5.1`/`§5.5.2` and are TEST-SIDE residues this pass may NOT edit.** | `[T]` + the test file |
| **`A-16`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **assembled-app, real-pointer, coordinate, layout, applied-CSS or retargeting** evidence from this unit's `[T]` green — and does it state, explicitly, that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**, and that **this unit ships no drag arithmetic and no magnitude — a named cost**? | the DONE row |
| **`A-17`** | **THE `E10` BOUNDARY PROBE:** does any pass read this unit as delivering a working gutter, a drag affordance, or a UI of any kind — or cite `E10` as scheduled work rather than as a `PROPOSED` row awaiting the architect's admission? **`E10` is NOT owed by `E3`** (ruling 12). | static + the DONE row |
| **`A-18`** | **THE `§7a.1` PROBE:** do the three reported items remain marked as **working defaults** rather than silently hardened into contract without a ruling — and has the supervisor routed them? **A pass that treats a `§7a.1` default as ruled is a review finding** (`§7a.1`'s own arithmetic paragraph). | static + the DONE row |

**The seed set's own status, stated so it is not misread: `18` seeds, ALL `OWED` — no adversarial pass has
run, and a DONE row that cites no adversarial pass (or whose findings are unrecorded) is a review
finding** (`AGENTS.md` RCA-3). **`A-15` is the gate-11 audit and `A-13`/`A-14`/`A-16`/`A-17` are the
layer-honesty probes — the four classes this unit's family has historically failed on.**

## 3b. The adversarial pass's disposition table — **the SHAPE this contract will be reconciled to**

**This table is EMPTY BY CONSTRUCTION at filing, and its VOCABULARY is fixed here** so an appended
findings block needs **no renumbering and no new section**. **A row added later must use one of the
statuses below, or the pass must define its new token IN THIS TABLE with a one-line meaning** — an
undefined status word is what this shape exists to prevent.

| Status | Meaning |
| --- | --- |
| **CONFIRMED-FIXED** | a **host** finding, **fixed here + regression-tested** as a new `§3` row (or a new `R-*` row for a static finding) |
| **CONFIRMED-RULED** | a behaviour examined and ruled correct; the ruling recorded with its reason |
| **CONTRACT-AMENDED** | a seed that exposed a **gap in this spec** — the spec is amended with the old text kept visible as `SUPERSEDED`, and the row lands in `§3`/`§5.5.1` |
| **NOT-A-FINDING** | raised, examined, recorded with the reason |
| **OWED** | raised and **not yet resolved** — **the pass may not report done with an `OWED` row** |
| **OWED — HOST FIX** | a **host** finding whose fix is owed to the **Implementer** pass that follows, **red-first**, with its regression row owed to the **TestWriter**; **it may not be reported `DONE` until the fix lands, and its owner is named** |
| **OWED — TEST-SIDE** | a finding whose remedy is a **row** the TestWriter owns; **no `§5.5.1` statement, id, strategy id or attempt term may change for it** |
| **BLOCKING — SCOPE** | `A-9`/`A-11`/`A-12`/`A-13`/`A-8` returning positive: **the unit does not land** until the scope violation is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; **the package is NEVER patched.** **This unit exercises no package surface, so no `HANDOFF` row can arise from it** (`§7` item 10) |
| **PARKED-with-revisit-condition** | recorded, not fixed, with the condition that would reopen it and its owner |

**Status of the table itself: `OWED` — empty by construction.** **An appended findings row must cite, at
minimum: the seed id (`A-*`), the finding's severity, its disposition from the table above, its owner, and
the clause (`§`-section + row id) it changed or left unchanged.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).
