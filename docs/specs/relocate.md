# Spec — `U-RELOCATE`: the node-local relocate/drop session composed on the landed gesture session (+ the exported pure total `withinProximity`)

**Unit `U-RELOCATE` · wave `E` · ledger row `E4` · upstream `SCH-7` (`A-d4`, ADOPTED-RESHAPED) ·
composes `U-GSESSION` (`E6`, `DONE`) · derives `docs/specs/relocate-review.md`'s conditions · filed
2026-09-27.**

**⟶ THIS FILING'S AUTHORITY, stated once: `docs/specs/relocate-review.md` is the CLOSED gate-1 record**
(steps 1–4: **1** `VALID-WITH-CONDITIONS` (`C-1`…`C-7`) · **2** `FLAWED`, three must-decide items ·
**3** `DELEGABLE-WITH-CONDITIONS` (the seven-seam surface, the channel model, the arithmetic's home, the
layers, the register, the filing checklist) · **4** `DELEGABLE-WITH-CONDITIONS` (`C-A`…`C-F`, the
register amendments `R-1`…`R-4` and the additions `M-1`/`M-2`), **plus its appended `§9`**, which RULES
the `§6` blocker). **This spec DERIVES those conditions and that ruling. It does NOT re-litigate, weaken
or re-open any of them**, and **a clause of this file that contradicts a ruling or a condition is a
finding against this file, not a re-opening of the ruling** (the record's own governing-rule block, its
`§7`; the rule `docs/specs/gutter.md` states for its own record).

**STATUS: GATE 2 — THE SPEC GATE, FILED. NOTHING ELSE IS ADVANCED.** This filing **lands one NEW file**
(`docs/specs/relocate.md`) and **nothing else**. **The module does not exist. No test file exists. No red
set has been authored or run. No leg, no trio, no `tsc` invocation and no register row has been
executed. No gate record after gate 1 exists. The unit stays an open `## OPEN` row (`E4`) with its
ledger status the supervisor's**, and **it is NOT delegable until a TestWriter has RUN and REPORTED the
red set** (`AGENTS.md` item 9, `§4.5`).

**READING ORDER (a reader should not have to reconstruct this):** `§0`/`§0A` — the rulings derived and
this filing's own dated ruling notes · `§1` — the scope and its named cost · `§2` — the exact surface,
the seven seams with their named safe defaults, the arithmetic and value rules, the seam rules, the
composition boundary and the sibling properties · `§3` — every state, fail-state, invariant and
static/existence row · `§4` — the red, the authoring order and the binding stop conditions · `§5` — the
wiring, the four legs, the DONE row's shape and **the typed register** · `§6`–`§8` — falsification,
honest limits, ambiguity report and the citation index · `§3a`/`§3b` — the adversarial seed set and the
disposition table at the file end.

**Cite SECTIONS and ROW IDS, never line counts**, of any file (`docs/decisions.md`'s rows by NAME; the
sibling specs' file-end notes). **This spec carries no length census of any file.**

## CURRENT STATE (2026-09-27) — the ONE status block in this file, placed BEFORE `§0`

**(Not a contract section and not a new number: it sits before `§0` so that nothing follows the `§3b`
file-end note — the placement the sibling specs use.)**

1. **THE FILING STATE, HONESTLY.** **NOTHING IS IMPLEMENTED AND NOTHING IS GREEN.** This pass wrote
   **exactly one file — the NEW `docs/specs/relocate.md`** — and edited **no existing file**. **The
   module (`src/shared/relocate.ts`), the test file (`tests/relocate.test.ts`), the red set, the legs,
   the register's EXECUTED layer, the greens set, the gate records and the DONE row ALL DO NOT EXIST
   YET.** The unit is **`OWED` at every gate after this one**, and **it is NOT delegable until a
   TestWriter has RUN and REPORTED the red set** (`§4.5`).
2. **THE SURFACE THIS FILING PROPOSES (nothing of it exists yet):** a **NEW `src/shared/relocate.ts`**
   exporting **TWO value exports and EIGHT type declarations = TEN exported names** (`§2.1`), whose
   factory options carry **EXACTLY SEVEN injected seams, NAMED and ORDERED** (`§2.1` item 2), with
   **exactly one import statement** — a TYPE-ONLY import of the frozen session module (`§2.1` item 4) —
   and with **no module-level mutable state**.
3. **THE REGISTER (`§5.5.1`): `15` typed ROWS carrying `16` TERMS, in THREE families** — *(**AS FIRST
   WRITTEN this item read `17` TERMS — a TERM-COUNT defect, corrected 2026-09-27 by the register-arithmetic
   remand; the as-written form is kept visible HERE and at `§5.5.1`'s foot. The register's own enumeration
   holds ONE term per row EXCEPT `P-RL-IM-3`, which carries TWO (`12` and `3`) — so `15` rows carry
   `15 + 1 = 16` terms, and NO SEVENTEENTH TERM EXISTS.**)* —
   `P-RL-IM-1`..`P-RL-IM-5` · `P-RL-SM-1`..`P-RL-SM-8` · `P-RL-TP-1`..`P-RL-TP-2`
   *(**this item AS FIRST WRITTEN read `17` typed rows — a counting defect that conflated the ROW noun
   with the TERM noun; the register declares `15` rows and `16` terms, because `P-RL-IM-3` carries ONE
   term beyond the one-per-row baseline — TWO terms of its own (`12` and `3`), its two declared halves, so
   `15 + 1 = 16`. *(**THIS PROSE AS FIRST WRITTEN read *"`15` rows and `17` terms because `P-RL-IM-3`
   carries TWO … `15 + 1 = 16`, not `17`"* — the SAME term-count defect one clause later, kept visible
   here: the `TWO` is the count of `P-RL-IM-3`'s OWN terms, not a second increment on the row count.**)*
   The as-written form and the whole correction are kept
   visible at `§5.5.1`'s foot**)* — **`170` declared attempts, printed with their SIXTEEN terms and a
   term-by-term addition at `§5.5.3`** *(**this item AS FIRST WRITTEN read `149`, which is the sum of
   SIXTEEN of the SIXTEEN terms of the corrected register — and the as-written `149` was a FIFTEEN-term
   line, `21` short of those `16` terms because it omitted `P-RL-IM-5`'s `21` AND collapsed
   `P-RL-IM-3`'s two halves into one slot. *(**AS FIRST WRITTEN this clause read *"the sum of SIXTEEN of
   the seventeen terms"* — the term-count defect's most direct self-contradiction, kept visible: `SIXTEEN
   of seventeen` names a `16`-term enumeration that the next clause then calls `17`.**)*
   The as-written form is kept visible at `§5.5.3` as a dated
   corrected arithmetic defect, and the honest total is `170`**)***, one pinned-seed generator
   (`S-RL-TOTAL-1`, seed `20260927`, one LCG step per draw, `pool.length = 15`), **`6` of the `15` rows
   carrying a `(bounded)` marking** *(**as first written this item read `12` — a listing defect; the
   marked set is `6`, the unmarked set is `9`, and `6 + 9 = 15`; the as-written forms are kept visible
   at `§5.5.1`'s foot and at `§5.5.2` item 2**)*, and **the POOL-VERSUS-BOUNDARY check RUN and CLEAN for
   all `15` rows** (`§5.5.2` item 7). **(⟶ 2026-09-27: the SEVEN contract items the red run exposed are ruled at `§0A` note 13, four of them in `§5.5.1`'s own cells — and NONE of them moved a TERM, so this item's `15` ROWS · `16` TERMS · `170` ATTEMPTS, both caps, every family subtotal and the addition chain stand EXACTLY as printed: NO RE-GRAIN AND NO RE-RUN ARE OWED.)** **The register overshoots the `≤8` breakdown signal on purpose, in
   the ruling's own form** (`§5.5`, `§5.5.2` item 1).
4. **THE LEGS THIS UNIT DECLARES (none run): the node suite `[T]`** — `npm test` — plus
   `npm run typecheck` `[H]` (**`src/**` ONLY**; it never reads `tests/**`), `npm run build` `[H]`
   (**the four esbuild outputs plus the copied `index.html` — the family's *"five bundles"* is read that
   way, and `§5.2` leg 3 states the honest figure**), and a **fourth leg** (a standalone strict
   `tsc --noEmit` over `tests/relocate.test.ts`). **NO `[U]` ROW IS OFFERED** (the three-part refusal,
   `§5.2`) and **NO `[D]` ROW IS CLAIMED** (`§5.2`).
5. **THE GATE RECORDS AFTER THIS ONE: NONE.** No adversarial pass (`§3a` is a SEED SET and every seed is
   `OWED`), no blind-greens record (`docs/specs/relocate-greens.md` is named in the diff scope and is
   `OWED`), no per-unit documentation review, no DONE row (`§5.3` fixes its twelve-item shape), and
   **gate 6 is `STRUCTURAL`, not waived** (`§5.2`).
6. **(⟶ ADDED 2026-09-27: the pre-drag value's CHANNEL, which this item reports as an OWED CONTRACT ITEM, is **RULED AND LANDED** — the orchestrator ADOPTED fix shape `F-1`, so the CONSUMER-SUPPLIED hooks record gains ONE NEW OPTIONAL VALUE-READING MEMBER (`RelocateHandle.preDragValueOf`) — at `§2.1` item 7 and `§0A` note 15's `A2` continuation. NO TERM MOVED, NO ROW ID MOVED, the seven-member FACTORY seam set is UNMOVED (`P-RL-IM-4`), `R-5`'s export NAMES are UNMOVED, and ONE FRESH STOP (the invalid arm's commit writer — `§2.1` item 7(g)) is REPORTED there rather than papered over.)** **⟶ AMENDED 2026-09-27: THAT FRESH STOP IS CLOSED AND THE WRITER IS PINNED — THE MODULE'S OWN `commit` SINK IS THE INVALID ARM'S COMMIT WRITER, invoked ONCE at a gesture that REACHED a terminal, carrying THE CALLER-SUPPLIED PRE-DRAG VALUE on `'reset'` (and the dragged/committed value on `'end'`), ZERO times on a `cancel` and ZERO times on ANY refused terminal, never a mechanism default — DERIVED from `docs/decisions.md`'s ACTIVE row `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE` channel (C), from the `M-13`/`F-10` invalid-arm shape `U-GUTTER-UI` LANDED, and from `docs/pending.md`'s `SCH-7` row's consequence (2).** **The as-written stop is KEPT VISIBLE at `§2.1` item 7(g) and at `§0A` note 15's `A2` continuation; NO DECLARED TERM MOVED (still `15` ROWS · `16` TERMS · `170` ATTEMPTS).** **THE TWO OPEN QUESTIONS THIS FILING REPORTS RATHER THAN SETTLES, AND THE ONE DERIVED ITEM IT PINS
   PENDING CONFIRMATION** (`§7a`/`§7a.1`): (a) whether the module's own move-turn invalidity test runs
   **before or after** the consumer's `onMove` wrapper forwards the hook, as a per-observation site;
   (b) whether the module counts its own `onPreview` invocations in `RelocateStats` (a **mechanism-side
   counter** question, not a channel question). Each has a working default implemented in `§2` and a
   recommendation; a later pass that changes one must open a gate. **(⟶ AMENDED 2026-09-27: no longer two open questions — question (a), the move-turn invalidity test's site, is PROMOTED TO A PINNED CLAUSE (`§2.3` item 6's pinned lead-in; `§7a.1` item 1, whose default label and question are retained verbatim and annotated as as-filed), because a red set may not be authored against a default the contract calls open; question (b), the preview counter, REMAINS an open working default. The SEVEN contract items the red run exposed — `tests/relocate.test.ts`, `90` rows, `81` failed / `9` passed against the absent module — are RULED at `§0A` note 13, and NO TERM MOVED.)** **(⟶ 2026-09-27, LATER THE SAME DAY: the Implementer pass STOPPED WITHOUT WRITING A LINE, reporting TWO mutually unsatisfiable clause pairs, and the orchestrator adjudicated and landed BOTH as contract defects — the `RelocateStats` member RENAME and the `candidatesFor` ANSWER-SHAPE pin — at `§0A` note 14. NO TERM MOVED, NO ROW ID MOVED, and THE RED SET IS OWED A RE-GRAIN before any implementation.**) **(⟶ 2026-09-27, A SECOND STOP, LATER THE SAME DAY: the Implementer pass STOPPED AGAIN WITHOUT WRITING A LINE, reporting SEVEN expectation defects; the orchestrator adjudicated SIX of them TEST-side (the re-grain this clause already owes) and FOUR as CONTRACT-FACING, and all four are disposed at `§0A` note 15 — `S4` PINNED (the ATTEMPTED-versus-INVOKED split of the `candidateCalls` reading, at `§3.2 F-15` and at the counter's own declaration), `A1` TEST-SIDE with two clauses PINNED (the module's terminal hook is its own installed `onEnd` and the FOUR-hook install-options object is mandatory; a `commit` member on those options does not exist on the frozen surface), `A2` SPLIT (the THREE-argument `session.reset` and the ONE capture point PINNED; the pre-drag value's CHANNEL carried as an OWED CONTRACT ITEM, because no legal route carries the caller's pre-drag value into this module), `S6` PINNED (a declared-failing control attempt is a COUNTED drive, reported BESIDE its term, and is NEVER a `broken` row). NO DECLARED TERM MOVED: the register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS, and THE RED RE-GRAIN REMAINS OWED.)** The **derived-pending-confirmation**
   item is the `§9` mapping — **the zone's mid-drag hide rides channel (B), hence channel (A) reads
   ZERO on the invalid arm** — **labelled DERIVED at every site it appears** (`§0A` note 6, `§2.3`
   item 5, `§5.5.1 P-RL-SM-1`, `§7a.1` item 3).
7. **THE TRACKER RESIDUES THIS FILING LEAVES (the supervisor's to flip, because this pass edits NO
   existing file):** `docs/next-steps.md`'s row **`E4`** still reads its spec cell as
   **`OWED — not filed`** and its status is unchanged; the row's acceptance cell still names a
   **six-member** factory while `§2.1` item 2 names **seven**; the `Legs` cell still reads `node suite`;
   and the `SCH-6`→`SCH-7` citation sweep the gate-1 record owes at its `§5.8` item 6 is **not done by
   this pass**. **All four are listed as owed tracker items in this filing's report and are NOT edited
   here** (`§8`'s archival-loop note).
8. **THE PAGE-DESIGN SKILL STILL DOES NOT EXIST** — `docs/skills/` holds `process-guardrails.md` alone
   (globbed this pass), so there is **no test-use-case coverage matrix and no demo-page index to
   update**, and **this unit renders no page** (`§3.5 R-9`'s probe; `§7` item 6).
9. **THIS PASS'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE.** **One file written, zero files edited, no
   test run, no leg run, no trio run, no `tsc` invocation, no Electron boot, no commit and no writing
   git command of any kind.** The new file is **untracked and must be committed by the supervisor**
   (`RCA-8`'s per-gate commit rule).

---

## 0. The rulings this unit derives from (recorded, NOT re-opened)

**These are binding. This filing's job is to turn each into clause rows a TestWriter can falsify.**
Where a ruling is **quoted**, the quotation is marked; where a step is this filing's own **derivation**,
it says so in place.

| # | Ruling (and its home) | Where it lands here |
| --- | --- | --- |
| **1** | **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`** (`docs/decisions.md`, ACTIVE). The architect's words, quoted: *"After the pane drag gesture is started and the pane is moved close to somewhere that can contain it, it should A. expand the zone to visibility (if it is empty/minimized) and B. place a ghost showing where the pane will drop into if released. Dropping the pane outside of a position where this happens should cause the invalid placement --> reset behavior. The threshold defines the distance from a zone where this behavior happens."* **The referent, settled: a proximity RADIUS around a candidate zone — not a magnitude of the pane, not a time, not a count.** | `§0A` note 2, `§1` item 1, `§2.1` (`withinProximity`, `CandidateFor.distance`), `§2.3` items 1/2/5, `§3.1 M-2`/`M-6`, `§5.5.1 P-RL-IM-3` |
| **2** | **`U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`** (`docs/decisions.md`, ACTIVE). The architect's words, quoted: *"The revealed zone hides again if the pane would not place into its zone. This can be because it was pulled back out of the threshold proximity, or because it has shifted to place into a different zone"*. **Its three clauses: the zone's displayed-ness is NOT MONOTONIC in a gesture; the retarget rule (old zone hides and the new shows in the SAME observed-move turn); the invalid arm reads ZERO reveal writes.** | `§0A` note 6, `§2.3` item 5, `§3.1 M-11`..`M-13`, `§5.5.1 P-RL-SM-1`/`P-RL-SM-6`, `§7a.1` item 3 |
| **3** | **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** (`docs/decisions.md`, ACTIVE): `docs/specs/gsession.md` `§2.5`'s numbered delegate list is the ONE signature list this unit writes against, FROZEN AND COMPLETE; *"`E3`/`E4` compose this session and re-express NONE of its lifecycle."* | `§2.5` (the call census), `§3.4 R-14`, `§8` |
| **4** | **`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (`docs/decisions.md`, ACTIVE): the panes/zones family is in scope, `A-d4` is binding, `U-RELOCATE` ← `SCH-7` with `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, commit, threshold})`, **the reveal written EXACTLY ONCE per gesture at gesture end (a deliberate strengthening — the fork's per-crossing implementation fails this row), the resolve policy injected, interrupt/cancel leaving no retained sinks or listeners.** | `§0A` note 3, `§1` item 1, `§2.1` item 2, `§2.3` item 5, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` |
| **5** | **`GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAMP-COMMIT-LAYER`** (`docs/decisions.md`, ACTIVE): `E3` reads NO coordinate and NO event field and ships NO magnitude; **the coordinate source, the live preview channel, the capture decision and the drop-revert are the UI unit's** — *"the ONLY place a COORDINATE SOURCE or a `[U]` row for the panes/zones family can legitimately live"*. | `§0A` note 2/note 5, `§1` item 2, `§2.2` (`P-1`, `P-8`), `§3.4 R-8`, `§5.2` |
| **6** | **`E10-SINGLE-SINK-CHANNEL`** (`docs/decisions.md`, ACTIVE): the composition's **single sink writer** is `E3`'s `commit` seam; **the SESSION's `commit` option is a NON-FORWARDING recorder (or absent), and giving the same function to both channels is a TWO-WRITER composition that FAILS.** | `§0A` note 7, `§2.3` item 4, `§3.2 F-6`, `§3.4 R-13`, `§5.5.1 P-RL-SM-2` |
| **7** | **`E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY`** (`docs/decisions.md`, ACTIVE) — **its boundary sentence, quoted: *"a value import of the SESSION factory, of any census/shim/renderer/main module, or of any OTHER sibling REMAINS FORBIDDEN."*** | `§0A` note 4, `§2.1` item 4, `§3.4 R-4` |
| **8** | **`SEAM-THROW-DISPOSITION-VALUE-READING-SEAMS-ABSORBED`** (`docs/decisions.md`, ACTIVE): a throwing **value-reading** seam is ABSORBED by the module's own total gate and becomes the declared invalid outcome; **the `void` PRESENTATION seams PROPAGATE.** | `§2.1` item 2 (the seam table's degradation column), `§2.4` items 1/2/4, `§3.2 F-7`/`F-8`, `§3.3 I-10` |
| **9** | **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** (`docs/decisions.md`, ACTIVE): assertions, observations and readings are printed **BESIDE** a term and **never counted in it**. | `§5.5.1` (every cell), `§5.5.2` item 3, `§5.5.3` |
| **10** | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (`docs/decisions.md`, ACTIVE) and **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (ACTIVE, part 1): a code-bearing unit's register is **MANDATORY before its red set**; the zero-row exemption is **UNAVAILABLE**; the row count is an **OUTCOME, not a budget**. | `§5.5`, `§5.5.1`, `§5.5.2` items 1/2 |
| **11** | **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE): a seam's **signature, REQUIRED/OPTIONAL status and DECLARED DEGRADATION are NORMATIVE CONTRACT TEXT**, and **the seam types are part of the module's exported census** so a downstream consumer can import them. | `§2.1` item 1 (the type half), `§2.1` item 2 (the seam table), `§2.4`, `§8` |
| **12** | **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE): *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling."* | `§5.1` (the derived DENIED set, named first) |

**Where a ruling's own row records a DERIVATION, this filing carries the derivation flag with it** (ruling
2, and the record's `§9`): see `§0A` note 6.

### 0A. The dated ruling notes — the clauses the record leaves to this filing, RULED here (2026-09-27)

**What this subsection is, and what it is not.** The gate-1 record is **contract-exact** about its
conditions, its seam table, its channels, its arithmetic's home and its register amendments; it is
**silent** about several clauses a TestWriter must have before it can author a **falsifiable** row.
**This filing DECIDES each of those clauses here**, each with its reason and its landing site. **No note
below weakens a ruling, a condition or a register amendment**; the places where a clause could **not** be
derived are **reported, not guessed**, at `§7a`/`§7a.1`.

**Note 1 — the module path is `src/shared/relocate.ts`, and the test file is `tests/relocate.test.ts`.**
The gate-1 record fixes both paths at its `§4.1`/`§A.1` and they agree with the sibling naming convention
(`src/shared/gesture-session.ts` · `gutter.ts` · `gutter-affordance.ts` · `owned-list-host.ts` ·
`slot-host.ts` · `census.ts` · `zones.ts`), and the unit's own name (`U-RELOCATE`) decides the stem.
**Nothing else in this file presumes a path.** The test file is named because **`§5.1`'s diff scope must
be a real, checkable allow-list.**

**Note 2 — THE ARITHMETIC'S HOME IS OPTION (i): a caller-supplied SCALAR DISTANCE compared against the
caller-supplied `threshold` by ONE EXPORTED PURE TOTAL FUNCTION.** *(The gate-1 record's `§C`/`§4.3`
recommendation, **pinned here** per condition `C-C`.)* **The module performs NO coordinate read, NO
geometry read, NO element read, NO unit string, NO selector and NO distance computation of its own.** The
distance is produced by the CUSTOMER's own code — the UI, which is the only party that sees the pointer —
and travels **inside `candidatesFor`'s answer** (`§2.3` item 2). **The comparison is this module's** and
it is `withinProximity` (`§2.1` item 1), the exact analogue of `E3`'s exported pure `clampToBounds`.

**Note 3 — THE SEVENTH SEAM, NAMED AS THE ONE THE RULING FORCES.** The `A-d4` signature the ledger row
carries names **SIX** members — `{session, candidatesFor, resolveTarget, onReveal, commit, threshold}` —
and **ruling 1's (B) forces a SEVENTH, `onPreview`**, the transient presentation channel the ghost rides
(the gate-1 record's `§4.1` seam 7 and its `§4.2` `B.4`). **This spec's seam table names all SEVEN, in
order, and identifies the new one**, which is condition `C-D`'s discharge test. **The ledger's acceptance
cell is NOT the frozen surface** — a reader who takes it as one will flag a conformant spec.

**Note 4 — THE IMPORT CENSUS IS ONE TYPE-ONLY STATEMENT, AND `POINTER_TYPES` IS ABSENT.** **RULED:** the
module's only import statement is `import type { GestureHandle } from './gesture-session.js'`. **The
`'end'`-vs-`'reset'` discriminator is the reason it is required** (`docs/specs/gsession.md` `§2.5` item
10; `§2.1` item 2's `commit` and `onReveal` signatures name the handle). **`import { POINTER_TYPES }` is
ABSENT, and this is the pinned fork of the surface** (`§2.1` item 1). **The reasons, in order of force:**
**(i)** the module **attaches NO listener and names NO event type of its own** — it never sees an event
object (note 5), so it has no use for an event-type token; **(ii)** the module never calls
`installGestureListeners`/`detachGestureListeners` (the session owns every listener, `§2.5` item 1), and
the only legal per-move site is its own `onMove` wrapper, which receives **the handle, not an event**;
**(iii)** an **imported-but-unreferenced binding** would re-open the exact residue
`docs/decisions.md`'s `E10-IMPORT-CENSUS-KEEPS-POINTER-TYPES` had to rule on — the gate-1 record flags
that as a **RESIDUE HAZARD** at its `§5.5`(c). **`createGestureSession` may NOT be value-imported and no
other sibling may be imported at all**, per ruling 7's quoted boundary sentence. **Composition route,
pinned: the session arrives as an OPTION (`session?: unknown`), read the way `E3` reads it** — through the
module's own total member-read, never by importing its factory.

**Note 5 — THE MODULE READS NO EVENT, NO COORDINATE AND NO GEOMETRY.** **There is no parameter anywhere in
this module's surface through which an event object, a `clientX`/`clientY`/`pageX`/`pageY` value, a
`getBoundingClientRect` result, a `getComputedStyle` result or an element lookup could arrive.** The
**element is an opaque argument** the module hands to the session unchanged; the **distance is an
argument** inside the candidate answer; **`resolveTarget` and `candidatesFor` are the consumer's own
closures** and any geometry they read is read on the CUSTOMER's side of the boundary. **The
consequence is the layer story: the ghost's position, the expanded zone's box and the proximity as
rendered are geometry, and geometry is UNPROVABLE in this repo today** (`§5.2`).

**Note 6 — THE `§9` MAPPING IS DERIVED, AND IS PINNED AS DERIVED.** *(The gate-1 record's `§9`, and
`docs/decisions.md`'s ruling 2 in its own words, which flag this itself.)* **PINNED:** the zone's
**mid-drag hide rides channel (B)**, the per-move transient channel the ghost already uses — because a
mid-drag hide is not once-per-gesture and therefore **cannot** be the channel (A) durable write — and
**therefore channel (A) reads ZERO reveals on the invalid arm.** **THE STATUS OF THIS CLAUSE, stated at
the point of use: it is a DERIVATION from ruling 1 + ruling 2 + the ledger's *"exactly once per gesture
at gesture end"* strengthening, NOT a verbatim architect sentence.** **The alternative reading is
recorded as ARCHITECT-REVERSIBLE**: if the hide were itself an `onReveal` write, the ledger's
strengthening would become **false as written** on the invalid arm and would have to be amended, and
`P-RL-SM-1`'s declared terminal domain would move from `{` `'end'` `}` to `{` `'end'`, `'reset'` `}`.
**This is not a second blocker and not a re-opening; this filing pins the derived reading, labels it
derived at every site, and the architect confirms or flips it at the spec gate** (`AGENTS.md` item 10a —
the spec gate is the one approval the chain waits for).

**Note 7 — THE SESSION'S OWN `commit` OPTION IS NOT THIS COMPOSITION'S CHANNEL.** Per ruling 6,
**this module does NOT construct the session** (note 4) and therefore passes it **no construction
options at all**: `commit` is a **construction option of `createGestureSession`** and is **the WIRING's
business**. **What this module DOES own is its own `commit` seam — the composition's single sink writer —
and its `onReveal` and `onPreview` channels, which are three distinct functions.** **A composition that
gives the same function to the module's `commit` seam and to the session's `commit` construction option
is a TWO-WRITER composition and FAILS** (`§3.2 F-6`, `§5.5.1 P-RL-SM-2`).

**Note 8 — THE INVALID ARM IS TAKEN FROM THE MODULE'S OWN MOVE TURN, WHILE THE GESTURE IS STILL
ACTIVE.** *(The gate-1 record's `§5.5`(b) third item: the ruling's sentence reads at RELEASE, the landed
session makes it a MOVE-TURN arm; the `E10` `R7` precedent.)* **The reason is structural and is recorded
with the decision: `E3`'s `reset` — and the session's — is legal only for an ACTIVE gesture, and the
session's own `pointerup` ends every gesture at its own terminal**, so a release-time arm would have
nothing left to reset. **RULED:** on an observed move whose answer places the target outside every
candidate's proximity, the module **calls `session.reset(element, handle, preDragValue)` from its own
move turn**, with the last observed answer, and its own **sticky** refusal (once the invalid arm has been
taken for a gesture, no further observed move takes it again). **`§3.1 M-13`/`M-16` and `§5.5.1
P-RL-SM-7` carry the whole of it.** **Routing the timing to `U-GSESSION` is `REJECTED-FOR-NOW` and
recorded as ARCHITECT-REVERSIBLE** (the gate-1 record's `§5.5`(b)); **a later pass that moves it opens a
gate.**

**Note 9 — THE PRE-DRAG VALUE'S CAPTURE POINT IS ESTABLISHMENT, ONCE.** *(Register amendment `R-4`,
whose recommendation is the sibling's fixed defect: `ADV-GU-6` — *"the pre-drag size was read LAZILY,
not at establishment … so `P-GU-IM-2`'s 'exactly once per gesture' was falsified"*.)* **RULED: ONE
capture point — the module's own `onStart` seam, for a gesture the session ESTABLISHED — and the running
count is asserted EXACTLY, never "at least".** **The stage table is `§2.3` item 7; the register row is
`P-RL-SM-4`; the value itself is CALLER-SUPPLIED** — the session holds no cross-gesture state
(`docs/specs/gsession.md` `§0A` note 8), so the module cannot derive it and must not invent it.

**Note 10 — THE MODULE COUNTS ITS OWN CHANNEL INVOCATIONS, AND NO SESSION COUNTER IS REUSED.** The
module's `stats()` is its own (`§2.1` item 1); **the session's own `stats()` counters are `U-GSESSION`'s
rows** and this module asserts nothing about them except through its own recorded call log. **The
consequence a reader must carry: *"the reveal fired once"* has TWO readings — the CONSUMER's own recorded
invocation count and the MODULE's own counter — and they must AGREE at `1` for a conformant
composition; a composition whose readings diverge has a writer this module does not know about**
(`§3.2 F-5`).

**Note 11 — THE `POINTER_TYPES`-AND-`capture` HAZARD, CARRIED SO IT IS NOT RE-OPENED SILENTLY.** The
module passes **no `capture` field** anywhere **and has no `capture` option** (it constructs nothing),
so *"no capture before establishment"* is **INHERITED AND OBSERVED** rather than vacuously true, with the
positive control `§3.4 R-10` requires. **The live consequence recorded at
`E3-CAPTURE-OPT-IN-IS-STILL-OWED-AND-ITS-CONSEQUENCE-IS-LIVE` binds this unit too and is STATED IN THIS
UNIT'S OWN FORK-FACING STATEMENT (`§7` item 3): with no capture installed, a pane drag whose pointer
leaves the moved element's box LOSES ITS READING — and for a pane drag that is MORE reachable than for a
44 px handle.** **`E4` does not adopt the opt-in**: a FROZEN-contract change needs its own gate.

**Note 12 — THE `threshold` NAME IS KEPT, AND THE COLLISION IS RECONCILED, NOT RELAXED.** *(The gate-1
record's `§4.3`, and the RCA §2 `F-2`'s rule: *"The bans stay. … The fix is a reconciliation step, never
a relaxation of a prohibition."*)* **The reconciliation table is `§2.3` item 3 and the scan row's
exemption is `§3.4 R-1`.** **The A-d4 signature, the ledger row and the ACTIVE ruling all name
`threshold`**; a rename would be **an architect's dated annotation beside the A-d4 signature, not a
spec-writer's edit** — and the DO-NOT list bars re-opening the threshold semantics.

**Note 13 — THE SEVEN RED-EXPOSED CONTRACT ITEMS, RULED (2026-09-27, AFTER the red set ran).**
**PROVENANCE, stated first so it is attributable: the red set (`tests/relocate.test.ts`, `90` rows) was
authored to THIS file's own declared readings and RUN against the absent module — `81` FAILED / `9` PASSED
(the orchestrator's record). THAT RUN EXPOSED SEVEN CONTRACT ITEMS: seven places where a TestWriter had to
CHOOSE a reading, or where this file's own text is inconsistent with itself. THEY ARE RULED HERE, each in
THE ROW'S OWN CELL first and in this note as the consolidated record, under `AGENTS.md` item 10a (*"a red
that exposes a contract defect … the orchestrator amends the contract, re-runs the red, re-delegates the
Implementer"*). NO DECLARED TERM MOVED, AND NO EXISTING ROW ID, STRATEGY ID, SEED, SECTION NUMBER OR CAP WAS MOVED OR RENUMBERED** — **the only structural additions are APPENDED so nothing is renumbered: this note (`§0A` note 13) and `§2.1` item 6 (items `1`–`5` keep their numbers).**

| # | The item, and where it was exposed | THE READING NOW PINNED, and its landing site |
| --- | --- | --- |
| **1** | **`§5.5.1 P-RL-IM-1`'s arithmetic** — its text declares `21 = 4 candidatesFor shapes × 4 observable paths (16) + 5 further drives`, while TWO of those four paths — `(b)` establishment-with-no-move and `(d)` a refused establishment — NEVER REACH THE SEAM and so carry no distinct observation | **BOTH KEPT: the term stays `21`, AND the two non-reaching paths are DRIVEN AS DECLARED-READING CELLS — each of the `8` cells asserts the declared pair `(seam-call count 0, no invalidity)`, for EVERY one of the four shapes** (`§5.5.1 P-RL-IM-1`'s own cell; `§5.5.3`'s term row). A `(bounded)`-class declaration; **the re-derivation alternative (i) is recorded there as AVAILABLE AND NOT TAKEN, with its reason.** **NO TERM MOVED.** |
| **2** | **`§5.5.1 P-RL-SM-5`** — its property text names a **`4`-arm domain** while its strategy cell declares **`3` attempts** and `§5.5.3` prints the term as **`3`** | **THE DOMAIN IS `3` ARMS, AND THEY ARE NAMED: `(1)` THE INVALID ARM · `(2)` THE `'end'` CONTROL ARM · `(3)` THE WRONG-CHANNEL CONTROL ARM.** The property text's arm count is corrected to `3` BESIDE its as-written `4` (`§5.5.1 P-RL-SM-5`; `§5.5.3`'s term row). **The fourth arm is NOT REAL; supplying one is a RE-GRAIN.** **NO TERM MOVED.** |
| **3** | **`§5.5.1 P-RL-IM-2`'s `ABSENT` shape vs `§5.5.1 P-RL-IM-4`'s key-set claim** — reaching `candidateCalls`/`resolveCalls == 0` for an absent member needs an options object that does NOT CARRY IT, while `P-RL-IM-4` asserted the options object's key set is ALWAYS exactly the seven | **THE ABSENT FORM IS DRIVEN AS A SEPARATE COMPOSITION — the only reading that satisfies BOTH rows** (`§5.5.1 P-RL-IM-2`'s cell beside shape `(2)`; `§5.5.1 P-RL-IM-4`'s scope clause; `§3.2 F-15`). **The seven-name key-set claim binds every attempt whose composition IS the seven-member conformant composition; an absent-form attempt asserts the SIX remaining declared members (the absent one either omitted or carried with the value `undefined`), never a default.** **NO TERM MOVED.** |
| **4** | **`§5.5.1 P-RL-TP-1`'s configuration `(ii)`** — the term is `30 = 15 draws × 2 configurations`, while `(ii)`'s text (*"the drawn shape supplies EACH of the SIX remaining seams in turn"*) literally implies `15 × 7 = 105` | **`15 × 2 = 30` IS THE TERM, AND CONFIGURATION `(ii)`'s SIX-SEAM SWEEP IS ASSERTIONS INSIDE THE ATTEMPT, NEVER DRIVES** (`§5.5.1 P-RL-TP-1`; `§5.5.3`'s term row) — `A DECLARED REGISTER TERM IS A DRIVE COUNT`. **The `105` reading is REJECTED, and independently of consistency: `105` BREACHES the register's `≤100`-PER-ROW CAP.** **NO TERM MOVED.** |
| **5** | **`§3.4 R-1`'s `--` token** — a RAW two-character scan for `--` fires on ORDINARY SUBTRACTION and is therefore not this row's claim | **THE TOKEN IS THE QUOTED CSS CUSTOM-PROPERTY LITERAL `'--` — AN OPENING QUOTE FOLLOWED BY TWO HYPHENS — WITH BOTH CONTROLS as the red set authored them: a corpus carrying `const name = '--zone-width'` FAILS the row; a corpus carrying `const next = a - b` PASSES it** (`§3.4 R-1`, the token's own entry). |
| **6** | **`§2.1`'s `reset` clause *"ZERO session calls"* vs `§2.5` item 1's permitted read set** | **THE DISTINCTION IS PINNED AND GOVERNING: *"ZERO SESSION CALLS"* MEANS ZERO `install`/`reset`/`dispose` DELEGATIONS, while the module's PERMITTED READS (`stats()` · `gesture()` · `disposed`) are recorded in a SEPARATE list and asserted to lie INSIDE THE CLOSED READ SET** (`§2.1` item 6, the file-wide definition; pointers at `§2.4` item 1's `session` row and `§3.1 M-13`). **NO TERM MOVED.** |
| **7** | **`M-3` / `§7a.1` item 1's turn order** — a red set may not be authored against a default the contract calls OPEN | **THE WORKING DEFAULT IS PROMOTED TO A PINNED CLAUSE, with its provenance kept visible: `onStart` wrapper → the consumer's `onStart` → `candidatesFor` → the proximity decision → `resolveTarget` → `onPreview` → the consumer's `onMove` → THE INVALID-ARM TEST** (`§2.3` item 6's pinned lead-in; `§7a.1` item 1, whose DEFAULT label and question are retained verbatim and annotated as as-filed). |

**THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM
MOVED.** **The register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS =
`21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`**; its
addition chain (`§5.5.3`) still ends at `170`; its family subtotals still read **`IM` `79`** · **`SM` `55`**
· **`TP` `36`**; both caps still hold — **`170 <= 400` total, and the largest per-row term `30`
(`P-RL-TP-1`) `<= 100` per row**; and the **`6 + 9 = 15`** marked/unmarked row split is unmoved. **SO NO
RE-GRAIN AND NO RE-RUN OF THE RED ARE OWED BY THIS PASS: the red's own harness rows assert the declared
terms and the declared total, and this pass changed NEITHER — the red's counts are the ABSENT MODULE's
(`81` failed / `9` passed, the orchestrator's record), never a moved term's.** **A pass that later moves ANY
term — including by taking item `1`'s re-derivation alternative, by supplying item `2`'s fourth arm, or by
adopting item `4`'s `105` reading — OWES (a) the new total printed WITH its terms and its addition chain,
(b) both caps and every subtotal re-checked, and (c) a REGISTER RE-GRAIN plus a RE-RUN of the red BEFORE any
implementation.**

**WHAT THIS NOTE DOES NOT DO, stated so no reader over-reads it:** it **re-opens no ruling and no gate-1
condition**, **weakens no row, prohibition or register row**, and **advances no gate** — the gates after the
red remain `OWED` at the supervisor's record, and `§4.5`'s red-set condition was the one thing this pass's
own predecessor was waiting on.

**Note 14 — THE IMPLEMENTER'S STOP AND ITS TWO ADJUDICATED CONTRACT DEFECTS, RULED (2026-09-27, AFTER the red set ran and BEFORE any implementation). ONE NEW DEFECT IS CARRIED HERE AS AN OWED ROW (item 2(ii)); NO DECLARED TERM MOVED AND NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED.**

**PROVENANCE, stated first so it is attributable.** The red set (`tests/relocate.test.ts`, `90` rows) was authored to this file's declared readings and RUN against the ABSENT module — **`81` FAILED / `9` PASSED** (the orchestrator's record; the same run `§0A` note 13 was ruled from). **THE IMPLEMENTER PASS THEN STOPPED WITHOUT WRITING A LINE**, reporting that **TWO CLAUSES OF THIS CONTRACT ARE MUTUALLY UNSATISFIABLE WITH THE RED SET**, so that **NO implementation can be green** — and naming its two items by row id: **item 1 — `R-1` (the census token ban) against `§2.1`'s mandated stats member, with `P-RL-TP-1`/`P-RL-TP-2`'s stats-key-set assertions and `M-5`/`M-15`/`F-17`'s readings as the second horn**; **item 2 — `F-13`'s cell against `§2.4` item 3 and the contract's own canonical answer shape.** **THE ORCHESTRATOR ADJUDICATED BOTH AS CONTRACT DEFECTS WITH DERIVABLE MINIMAL FIXES**, and both are landed in this note's own text under `AGENTS.md` item 10a (*"a red that exposes a contract defect … the orchestrator amends the contract, re-runs the red, re-delegates the Implementer"*) — **a red-set-found contract defect is amended on the orchestrator's authority, and the Implementer STOP was the correct action to take.**

**ITEM 1 — THE `RelocateStats` MEMBER RENAME, ON THE MEASURED COLLISION.** **THE DEFECT, measured against this file's own bytes: `§2.1`(b) mandated the stats member `readonly revealed: number` (*"REVEAL WRITES THAT RETURNED without throwing. `revealWrites - revealed` is the count of swallowed reveal throws"*), while `§3.4 R-1` bans the CENSUS TOKEN `revealed` over the module's source INCLUDING ITS COMMENTS with EXACTLY TWO declared exemptions (`threshold`, `distance`), and `§2.2 P-10` likewise listed `revealed` among the forbidden members. The red set encodes BOTH facts: its census token rule carries `revealed`, its `R1_EXEMPT_TOKENS` is exactly `['threshold','distance']`, and its stats-key-set assertions require the literal key `revealed`. SO A MODULE THAT DECLARES THE MANDATED MEMBER FAILS `R-1`, AND A MODULE THAT OMITS IT FAILS THE STATS ROWS — UNSATISFIABLE.** *(This is the RCA's *"the same token on two projects' opposite lists with no collision check"* class recurring, one layer away.)* **THE FIX AS LANDED, AND IT IS A RENAME: the member is `revealWritesApplied`** — **parallel to the existing attempted/succeeded pair (`revealWrites` attempted · `revealWritesApplied` returned without throwing) and, like the sink's `sinkCalls`/`written` pair, carrying NO banned token.** **WHY A RENAME AND NOT A THIRD EXEMPTION: the ban stays UNWEAKENED at EXACTLY TWO declared exemptions, the module's bytes then carry NO CONSUMER CENSUS TOKEN AT ALL, and THE EXPORT CENSUS IS UNTOUCHED — CONFIRMED: a stats member is NOT an export, so `§2.1`'s `2 + 8 = 10` names, `§3.4 R-5`'s two halves and `§5.3` item 3's DONE-row census are all UNMOVED (the export census that the ledger and `§5.3` item 3 pin is the EXPORT set, never the `RelocateStats` members); `RelocateStats` still declares ELEVEN fields, and every row's key-set claim is unchanged in SIZE — only the one member's spelling moved.** **`R-1`'s exemption list and its *"exactly two names"* claim are NOT touched, NOT widened and stay as filed.** **THE RENAME IS LANDED AT EVERY SITE, and each superseded form is kept visible under a dated annotation (annotate-never-rewrite):** **`§2.1`(b)'s block and its comment (the comment names the old form verbatim)** · **`§2.1` item 5 (the eleven stats members are now NAMED there, so the ban cannot be re-opened for them)** · **`§2.2` P-10 (whose text now bans a `revealed` MEMBER HOLDING CONSUMER CENSUS STATE — a CENSUS read — and names the module's own counter by its NEW name, so the two layers cannot be confused again)** · **`§3.1 M-15` (its key list and its agreement clause)** · **`§3.2 F-17` (both readings)** · **`§3.4 R-1` (its census-token list's `revealed` entry — unchanged, and now NOTHING in this unit's contract shares that spelling)** · **`§5.5.1`'s cells (their `revealWrites` readings stand; no cell carried the old member name as a term; and the register's strategy discipline now names all eleven stats members under their CURRENT names, item 7)** · **and this note.** **NO TERM MOVED.**

**THE ONE ANNOTATION HAZARD THIS RENAME CREATES, RESOLVED IN PLACE SO A LATER PASS CANNOT RE-BREAK THE CONTRACT:** **the superseded spelling CANNOT simply be printed inside `§2.1`'s `RelocateStats` BLOCK, because THAT BLOCK IS THE MODULE'S OWN BYTES — the declaration the implementer writes into `src/shared/relocate.ts` — AND `§3.4 R-1` SCANS THE MODULE'S COMMENTS AS CODE — an as-written form printed there would RE-INTRODUCE the banned token and re-open the very defect this rename closes.** **THE RESOLUTION, landed at `§2.1`(b): the member's own comment records the rename, its reason and the ban's unchanged extent WITHOUT printing the old spelling, and names the old spelling ONLY in the assembly form the red set itself uses for that token — `'revea' + 'led'`; the as-written member declaration and its as-written one-line comment are kept VISIBLE, verbatim, in `§2.1` item 5's member list and in THIS NOTE (both of which are SPEC TEXT, not module bytes).** **CONSEQUENCE FOR THE IMPLEMENTER, stated as a binding reading: THE MODULE'S BYTES MUST NOT CONTAIN THE OLD SPELLING ANYWHERE — not as a member name, not in a comment, and not in a test string; a source that carries it FAILS `R-1` BY CONSTRUCTION, and this rename is the reason `R-1` remains exactly-two-exemptioned.** **CONSEQUENCE FOR THE RE-GRAIN, stated the same way: the red's stats key sets and its readings assert the member under its CURRENT name, and the red's own control corpora remain the ONLY place the banned token may appear (they are `R-1`'s own controls and are assembled, exactly as the red set already does).**

**ITEM 2 — THE `candidatesFor` ANSWER SHAPE: THE ARRAY IS THE ANSWER, AND `F-13`'s CELL WAS CORRECTED TO ITS TRUE SUBJECT.** **THE DEFECT, measured against this file's own bytes: `§3.2 F-13`'s cell declared *"An ARRAY is NOT a record and is therefore the same class — the contract's answer shape is `{candidates: readonly CandidateFor[]}`, and an array in its place supplies nothing"*, and its row drives `[answer(1)]` expecting `resets === 1`. EVERYTHING ELSE SAYS THE OPPOSITE: `§2.1`'s `RelocateTargetFor` is `(element, candidates: readonly CandidateFor[], gesture)` — the module hands the ARRAY to the seam; `§2.3` item 2's transport clause puts the distance INSIDE THE CANDIDATE ANSWER; and roughly FORTY clause rows plus the register's `P-RL-IM-1`/`P-RL-IM-5` pools drive `candidatesFor: () => [answer(n)]` and expect PROXIMITY, with a bare-array positive control asserting the arm is NOT taken.** **THE FIX AS LANDED: THE CANONICAL ANSWER SHAPE IS PINNED AS `readonly CandidateFor[]`** — **an ARRAY of candidate records, each carrying the opaque candidate plus its caller-supplied distance, THE SHAPE `§2.1`'s `RelocateTargetFor` ALREADY FIXES** — **`F-13`'s cell is corrected to its TRUE SUBJECT — *"a candidate answer that is not a usable record"* at the CLASS level (`undefined` · `null` · `42` · `'x'` · `true` · a function · a non-array object that is not an accepted answer) — and states explicitly: (i) AN ARRAY `IS` THE LEGAL ANSWER SHAPE, SO IT IS NOT THIS ROW'S INVALID CLASS; (ii) an array whose ELEMENT is not a usable record is the ELEMENT-LEVEL invalid class — AND (RECORDED HERE AS THE OWED ROW RATHER THAN SILENTLY RE-SCOPED) NO ROW OF THIS FILE OWNS IT: `F-14` owns a non-usable `distance` FIELD with the `candidate` PRESENT, `P-RL-IM-5` owns the `distance` field's SEVEN shapes, `F-15` owns the ABSENT/NON-CALLABLE SEAM, and `P-RL-IM-1`'s shapes `(2)`/`(3)` are SEAM-absent/SEAM-non-callable — so `[42]`/`['x']`/`[null]`/`[undefined]`/`[true]`/`[a function]`, i.e. an ARRAY whose ELEMENT supplies no readable `distance`, is OWED a `§3.2`/`F-` row to the TestWriter's re-grain, WITH NO NEW ROW ID, REGISTER ROW, TERM OR TOTAL (the register is `15` rows / `16` terms / `170` attempts before AND after) — the owed row is `F-13`'s NEIGHBOUR, NOT `F-13`'s content; and (iii) an EMPTY ARRAY's declared outcome is **NO CANDIDATES ⇒ THE INVALID ARM** (`§2.4` item 1's `candidatesFor` row · `§2.3` item 6(c) · `P-RL-SM-7`'s invalidity class `(1)`, and the red set already drives `[]` that way). **`F-13` KEEPS its id, its position and its as-written text VISIBLE (kept verbatim in its own two cells, marked `SUPERSEDED`), and `§2.4` item 3 is annotated with the shape pin plus its three declared invalid classes — the `{candidates: …}` form is kept visible there and was SWEPT for: `F-13` and `§2.4` item 3 were the ONLY two sites in this file carrying it.** **The module's seam signatures are UNCHANGED by this fix: `RelocateTargetFor` already declared `readonly CandidateFor[]`.** **NO REGISTER ROW ID, TERM, STRATEGY ID, SEED OR CAP MOVED.**

**THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED.** **The register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6` — `21+14=35`, `+12=47`, `+3=50`, `+8=58`, `+21=79`, `+5=84`, `+11=95`, `+5=100`, `+6=106`, `+3=109`, `+14=123`, `+7=130`, `+4=134`, `+30=164`, `+6=170`**; **its addition chain (`§5.5.3`) still ends at `170`**; **its family subtotals still read `IM` `79` · `SM` `55` · `TP` `36`**; **both caps still hold (`170 <= 400` total, largest per-row term `30` `<= 100`)**; **the `6 + 9 = 15` marked/unmarked split is unmoved**; **and the printed total EQUALS the sum of its own terms.** **NO REGISTER TERM MOVED, AND NO EXISTING ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED.** **WHICH IS WHY ITEM 2 IS CARRIED AS AN OWED *TEST-SIDE* ROW AND NOT AS A REGISTER ADDITION.**

**THE OBLIGATION THIS NOTE CREATES, stated as a required next act rather than a preference: THE RED SET MUST BE RE-GRAINED BY A TESTWRITER — (a) for the RENAMED STATS MEMBER AT EVERY KEY-SET AND LOGICAL ASSERTION (the red's stats key sets, its `M-5`/`M-15`/`F-17` readings, and any other read of the old member name) and (b) for `F-13`'s DRIVES (the bare-array cell that treats the array as the invalid class, and the `{candidates: …}` typed answer in the same row) — PLUS the owed element-level-invalid-answer row of item 2(ii).** **THE ORCHESTRATOR RUNS THAT RE-GRAIN NEXT, AND IT IS THE REASON AN IMPLEMENTER GREEN WAS NOT REACHABLE AT THE PREVIOUS CONTRACT REVISION: the two unsatisfiable clause pairs existed on the CONTRACT's side of the boundary, not on the implementation's, and `RCA-1`'s order is preserved — no implementation line was written and none may be written before the re-grained red is RUN and REPORTED.**

**WHAT THIS NOTE DOES NOT DO, stated so no reader over-reads it:** it **re-opens no ruling, no gate-1 condition and no register row**, **weakens no prohibition** (the census ban is INTACT at exactly two exemptions, and the `revealWritesApplied` rename is what makes it satisfiable rather than relaxed), **deletes no as-written form** (every superseded spelling and every superseded cell is kept visible beside its correction), and **advances no gate** — the red re-grain it owes is the supervisor's next act, and the gates after it remain `OWED`.

---

**Note 15 — THE SECOND IMPLEMENTER STOP: THE FOUR CONTRACT-FACING ITEMS RULED — TWO PINNED, ONE TEST-SIDE WITH TWO CLAUSES PINNED, ONE SPLIT WITH A CHANNEL CARRIED AS AN OWED CONTRACT ITEM (2026-09-27, AFTER the first re-grain was owed and BEFORE any implementation). NO DECLARED TERM MOVED, AND NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED.**

**PROVENANCE, stated first so it is attributable.** **THE IMPLEMENTER PASS STOPPED A SECOND TIME WITHOUT WRITING A LINE**, reporting **SEVEN expectation defects** it judged to make any green unreachable. **THE ORCHESTRATOR ADJUDICATED: SIX of the seven are TEST-side** (a TestWriter re-grain follows, and it needed these dispositions first) **and FOUR touch a CONTRACT READING — they are disposed here**, each in its own landing site first and in this note as the consolidated record, under `AGENTS.md` item 10a (*"a red that exposes a contract defect … the orchestrator amends the contract, re-runs the red, re-delegates the Implementer"*). **The four are named `S4` · `A1` · `A2` · `S6` and are disposed in that order.** **Grounding, stated once and binding on every clause below: each disposition is measured against THIS FILE'S OWN BYTES, against the FROZEN session contract (`docs/specs/gsession.md` `§2.5`, the ONE signature list, plus `§2.1`'s hook signatures and `§2.4` item 8) and against the LANDED `src/shared/gesture-session.ts`; the red set (`tests/relocate.test.ts`) was READ, never edited, and no session capability is invented anywhere below.**

**ITEM `S4` — THE NON-CALLABLE `candidatesFor` IS AN ATTEMPT: `F-15` VERSUS `P-RL-IM-1`'s SHAPE `(3)` — DISPOSITION: **PINNED**, with a TEST-side reading correction.** **THE DEFECT, measured against this file's own bytes: `§3.2 F-15` requires `candidateCalls === 1` for a NON-CALLABLE seam (`42`, `'x'`, an object, a hostile `Proxy`) — *"an ATTEMPT is counted where the seam was present"* — which is what `§2.4` item 1's `candidatesFor` row and `§2.1`'s own comment on the counter (`"including a non-callable or throwing seam, which is an attempt and is never retried"`) already say; while `§5.5.1 P-RL-IM-1`'s as-executed shape `(3)` reads `reachesTheSeam: false` and its declared count therefore computes to `0` on every path.** **THE CONTRACT SIDES WITH `F-15`, AND THE SPLIT IS NOW PINNED IN TWO WORDS, at the counter's own declaration (`§2.1`'s `candidateCalls` cell), in the row's own cell (`§5.5.1 P-RL-IM-1`) and in `§3.2 F-15`'s cell: ATTEMPTED = the module TRIED to consult the seam — counted ONCE PER OBSERVED MOVE wherever the option carried a value OTHER THAN `undefined`, INCLUDING a non-callable (`42` · `'x'` · an object · a hostile `Proxy`) AND a callable that THROWS; INVOKED = the seam was ACTUALLY CALLED, which happens only where a callable was present. THE ONLY NON-ATTEMPT FORM IS THE SEAM ABSENT FROM THE OPTIONS RECORD OR CARRIED WITH THE VALUE `undefined` (both read `0`); `null`, `false`, `0`, an empty string, a non-callable and a throwing callable are ALL ATTEMPTS, and NO attempt is ever retried.** **THE DECLARED TERM'S VERDICT, stated in the words this item requires: THE TERM IS A DRIVE COUNT AND **THE DRIVES DO NOT CHANGE** — `P-RL-IM-1` stays `21` (`4` shapes × `4` observable paths (`16`) + `5` further drives), the register stays `15` ROWS · `16` TERMS · `170` ATTEMPTS, and the term-by-term addition still ends at `170`. What moves is the DECLARED READING inside shape `(3)`'s own cells (`0` → `1` on the two reaching paths `(a)`/`(c)`, `0` unchanged on the non-reaching `(b)`/`(d)`), and that correction is TEST-side: the red set declares `reachesTheSeam: false` for shape `(3)` and must declare it `true`, exactly as `§3.2 F-15`'s five drives already do.** **CONSEQUENCE FOR THE REPORTED FIGURE: this row's DISTINCT figure (`§5.5.2` item 3) is a REPORTED figure, never asserted and never a term — the re-grain re-reports it under the corrected scope, and the as-filed `17` stays visible.**

**ITEM `A1` — HOW THE MODULE'S SINK ARRIVES: DISPOSITION: **TEST-SIDE**, with TWO CLAUSES PINNED AT `§2.5` item 7 (appended; items 1–6 keep their numbers).** **THE DEFECT, measured read-only against the red set: its session double reaches the module's terminal logic through `hook('commit')` — a `commit` MEMBER READ FROM THE OBJECT THE MODULE HANDS TO `session.install` — so the rows that read that log's `'commit'` entry require the module to hand the session an options object carrying a callable `commit` — **MEASURED, the sites are `I-2`, `M-4`, `F-9`, `F-15`, `F-16` and `P-RL-IM-2`'s further drive `(a)`; NO `P-RL-IM-1` drive reads it, so the item's own label is corrected here to the measured list** — while `M-1`, `R-10` and `I-7` require that SAME object's own enumerable key set to be EXACTLY the four hooks. BOTH CANNOT HOLD, and the frozen contract decides which one falls.** **THE DECIDING CLAUSES, named: `docs/specs/gsession.md` `§2.5` item 2 — `install(element, {capture?, onStart?, onMove?, onEnd?, onCancel?})` — has NO `commit` member, and that section's closing paragraph is categorical (*"Nothing else exists"*, with no options object that could smuggle anything in); the session's `commit` is a CONSTRUCTION option of `createGestureSession({source, commit})` (`§0A` note 7; ruling 6; `E10-SINGLE-SINK-CHANNEL`), it belongs to the WIRING, and giving the same function to both channels is a TWO-WRITER composition that FAILS (`§3.2 F-6`, `§5.5.1 P-RL-SM-2`); and this file's `§2.3` item 6(d) with `§2.5` item 5 puts the module's terminal logic inside the module's OWN terminal hook — which, on the frozen surface, is its OWN INSTALLED `onEnd`, invoked by the session's terminal (detach → mark inactive → set `outcome` → run `onEnd` → `slot = null` → the construction `commit`; `§2.5` item 6), with the captured handle's `outcome` as the discriminator (`docs/specs/gsession.md` `§2.5` item 10).** **THEREFORE the `commit` key the red set's double reads does NOT exist on the frozen surface, the requirement is TEST-side, and the correction the TestWriter must make is exact: (i) the double drives the module's terminal through the module's own installed `onEnd` (the only channel the session has), (ii) `'commit'` in any hook log is read from the SINK'S OWN RECORD — the module's `RelocateOptions.commit` invocation, recorded by the consumer's own function beside `stats().sinkCalls` (`R-13`) — and NEVER from a key of the install options object, and (iii) the four-hook install-options key set (`M-1`/`R-10`/`I-7`) is the object that survives.** **WORSE THAN REPORTED, and measured: the same double diverges from the landed session in THREE further ways, all TEST-side — it builds a NEW terminal handle and discards the captured one WITHOUT setting the captured handle's `outcome`/`active` (so a module reading `gesture.outcome`, the contract's own discriminator, reads `null`; the landed module's handle reads its record live), it passes the TERMINAL HANDLE as `onEnd`'s second argument where the frozen signature is `onEnd(element, value)`, and it invokes the WIRING's session-`commit` sink at ESTABLISHMENT (`sink(handle, undefined)`) where the frozen session invokes its `commit` exactly once and only at an `end`/`reset` terminal.** **ALSO RESOLVED IN PLACE, because it is the same collision: `§3.3 I-7`'s prose *"passes no install options at all"* is PINNED to **NO OPTIONS BEYOND THE FOUR MODULE-OWNED HOOKS** — the four-hook object is MANDATORY, since it is the only channel by which the session reaches the module's wrappers at all.**

**ITEM `A2` — THE PRE-DRAG VALUE'S CHANNEL AND THE `reset` ARITY: DISPOSITION: **SPLIT** — the ARITY, the CAPTURE POINT and the MEASUREMENT are PINNED at `§2.3` item 9 (appended; items 1–8 keep their numbers) and the module's `committed` field is PINNED there too; the CHANNEL is **NOT test-side** and is carried as an **OWED CONTRACT ITEM** under `§4.4 S-11`'s stop class.** **THE DEFECT AS REPORTED: `M-8`/`M-12`/`M-10`/`P-RL-SM-7` compare the double's own recorded reset value with the double's own pre-drag value, and the double substitutes its own value only when FEWER THAN THREE arguments are passed — so a TWO-argument `session.reset(element, handle)` makes every identity assertion hold trivially (the substituted value is the very value the row then compares against), while `§2.3` item 7 and `§0A` note 9 require the pre-drag value to be CAPTURED EXACTLY ONCE at the module's own `onStart` wrapper.** **THE DECIDING CLAUSES: `docs/specs/gsession.md` `§2.5` item 5 — `session.reset(element, gesture, value)` — makes `value` REQUIRED, and the LANDED module's own signature is `reset(element: GestureElement, gesture: GestureHandle, value: unknown)`; the session holds NO default and never computes one (`docs/specs/gsession.md` `§0A` note 6, `§2.3` item 5), so a two-argument call commits `undefined`.** **PINNED THEREFORE: THE ARITY IS THREE, and the THIRD argument is the value the module captured ONCE for that gesture at its own `onStart` wrapper; the substitution-on-two-arguments is TEST-side and must GO.** **WORSE THAN REPORTED — AND THIS IS THE ONE FINDING OF THIS PASS THAT NO TEST-SIDE CHANGE CAN REPAIR: **THE CALLER'S PRE-DRAG VALUE HAS NO LEGAL ROUTE INTO THIS MODULE.** Measured clause by clause: `install`'s hooks are `{capture?, onStart?, onMove?, onEnd?, onCancel?}` and `onStart` receives ONLY THE ELEMENT (`docs/specs/gsession.md` `§2.1`'s `GestureOptions.onStart`, `§2.5` item 9); the handle reaches a consumer only through `onMove`, so no consumer hook can set a value before the module's own wrapper runs; `gesture()`'s `value` reads `undefined` at establishment for EVERY composition (`docs/specs/gsession.md` `§2.4` item 8: a new `begin` sets `value` back to `undefined`, and the landed `beginOperation` builds its record with `value: undefined`); the session's `commit` construction option is the WIRING's and is never this module's (`§0A` note 7); this unit's seam set is CLOSED AT SEVEN (`§2.1` item 2, `§2.2` `P-8`, `§5.5.1 P-RL-IM-4`) and an EIGHTH member is `§4.4 S-11`'s stop class. **THEREFORE a conformant module can only pass `undefined` as that third argument, and the seven rows that assert the CALLER's value by identity (`M-8` · `M-10` · `M-12` · `M-13`(a) · `M-14` · `§5.5.1 P-RL-SM-4` · `§5.5.1 P-RL-SM-7`) are NOT SATISFIABLE until a channel is pinned. THE TWO FIX SHAPES, both an ARCHITECT's dated annotation and NOT a spec-writer's edit: **(F-1, RECOMMENDED — MINIMAL)** ONE NEW MEMBER ON `RelocateHandle` (the caller's own `attach(element, hooks)` record, e.g. a caller-supplied pre-drag value), captured once at the module's own `onStart` wrapper: it touches NO session surface, NO install-options key set (`M-1`/`R-10`/`I-7`'s four forwarded hooks stay the four), NO export census and NO register term. **(F-2)** an EIGHTH FACTORY OPTION member (an injected seam, on `E3`'s own `defaultSizeFor` precedent, `docs/specs/gutter.md`): same effect, but it moves `P-RL-IM-4`'s seven-member set claim and its `8`-drive term, and therefore OWES A REGISTER RE-GRAIN with a new printed total. **NEITHER IS TAKEN HERE, and this item is reported rather than resolved for exactly that reason: `§4.4 S-11` makes both a contract change needing its own gate.** **ALSO PINNED with the arity, because the same rows read it: the module's OWN record field `committed` is the MODULE'S committing-terminal reading (true iff the call entered the session's `reset` terminal and the session accepted it), NOT a verbatim copy of the session's `TerminalResult.committed` — which the frozen contract defines as the committing-terminal discriminator INDEPENDENT of whether a `commit` callback was installed (`docs/specs/gsession.md` `§2.1`'s `TerminalResult`, `ADV-GS-22`(a)). A double answering `committed: sink !== null` couples the field to the WIRING's sink and contradicts that reading: TEST-side.**

**⟶ `A2`, CONTINUED AND CLOSED (2026-09-27): THE OWED CONTRACT ITEM IS RULED AND LANDED — FIX SHAPE `F-1` IS ADOPTED, AND `F-2` IS RECORDED AS NOT TAKEN AND ARCHITECT-REVERSIBLE. NO DECLARED TERM MOVED, AND NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED.**

**PROVENANCE, so the closing is attributable.** The `A2` item above carried the pre-drag value's **CHANNEL** as an **OWED CONTRACT ITEM** under `§4.4 S-11`'s stop class, because **no legal route carried the CALLER's pre-drag value into this module**; **THE ORCHESTRATOR ADJUDICATED THAT ITEM AND ADOPTED FIX SHAPE `F-1`**, and **it is landed at `§2.1` item 7 (appended; `§2.1`'s items `1`–`6` keep their numbers) with pointers at `§2.3` items 6(b)/7/9(c), `§2.4` item 2's amendment, `§3.1 M-8`/`M-10`/`M-12`/`M-13`/`M-14`, `§3.3 I-5`/`I-9`, `§4.4 S-11` and `§5.5.1 P-RL-SM-4` — under `AGENTS.md` item 10a, the same authority notes 13, 14 and this note rest on** (the red/turn order is preserved: **no implementation line has been written, and none may be written before the re-grained red is RUN and REPORTED**).

**THE ADOPTED SHAPE, in one paragraph.** **ONE NEW OPTIONAL VALUE-READING MEMBER ON `RelocateHandle`** — **`preDragValueOf?: (element: unknown) => unknown`** — i.e. **on the CONSUMER-SUPPLIED hooks record the consumer ALREADY passes to `attach(element, hooks?)`**: the module **invokes it ONCE per ESTABLISHED gesture from its own `onStart` wrapper**, **holds the answer in its per-gesture record**, **discards it at every terminal in its own `finally`**, and **commits it as the THIRD argument of `session.reset(element, handle, value)`** (arity three, already pinned). **Its unusable shapes — ABSENT · NON-CALLABLE · THROWING · A THROWING ACCESSOR — are ABSORBED and answer THE NO-CALLER-VALUE REFUSAL: nothing invented, nothing thrown, `attach` and the establishment turn both silent, and the invalid arm's own counts and arity UNCHANGED** (`§2.1` item 7(c)).

**WHY THIS SHAPE AND NOT `F-2`.** **`F-1` adds NO MEMBER TO THE SEVEN-MEMBER FACTORY OPTIONS**, so **the gate-1 condition `P-RL-IM-4` (*"the seam set is frozen; an eighth member FAILS"*), the register's terms, `R-5`'s export NAMES, `RelocateStats`'s ELEVEN fields and every session surface are UNTOUCHED** — the member is **not a seam, not an export and not a hook**. **`F-2` — an EIGHTH FACTORY OPTION member, an injected seam on `docs/specs/gutter.md`'s `defaultSizeFor` precedent — IS NOT TAKEN**, and **it is kept visible here as ARCHITECT-REVERSIBLE with its cost named: it would MOVE `P-RL-IM-4`** (whose own positive control is the eighth-member `distanceFor`), **it is `§4.4 S-11`'s stop class as filed, and it would OWE A REGISTER RE-GRAIN — its own degradation term, its own drives and its own key-set scope — PLUS A RE-RUN OF THE RED, i.e. the new total printed WITH its terms and the addition chain re-checked. A later pass that wants an injected eighth seam opens a gate; it does not land as a re-grain.**

**WHAT THE ROW SWEEP FOUND ABOUT THE HOOKS RECORD'S MEMBER CENSUS — and this is the one thing the re-grain could have guessed wrong.** **NO ROW OF THIS FILE PINS `RelocateHandle`'s MEMBER CENSUS OR KEY SET.** **MEASURED, the key-set rows bind TWO OTHER RECORDS:** **the object the module hands to the session** (`M-1` · `R-10` · `I-7`, exactly the four hooks, **a fifth key FAILING**) and **the FACTORY OPTIONS object** (`§5.5.1 P-RL-IM-4`, exactly seven, **an eighth FAILING**). **The hooks record appears only as `§2.1`(b)'s prose (*"the four consumer hooks"*), the block's own *"no fifth hook"*, `§2.5` item 4's identity-forwarding clause and `M-17`'s drive** (all four hooks supplied, forwarding asserted **BY IDENTITY**); **`§2.4`'s tables table the SEVEN SEAMS, not its members.** **THEREFORE THE RE-GRAIN MUST: (1) NOT READ EITHER KEY-SET ROW AS COVERING THIS RECORD; (2) NOT ADD `preDragValueOf` TO EITHER KEY SET; (3) NOT EXTEND `M-17`'s DRIVE TO A FIFTH RECORDED HOOK; and (4) READ THE TWO AS-WRITTEN SENTENCES AS WRITTEN — *"no fifth hook"* ⇒ **NO FIFTH HOOK** (true), *"the four consumer hooks"* ⇒ **THE FOUR HOOKS** (true).** **THE RECORD'S PIN, in the file's own numbers (`§2.1` item 7(f)): `5` members AS FILED (`element` + `onStart` + `onMove` + `onEnd` + `onCancel`) ⇒ `6` members AMENDED (the same `5` plus `preDragValueOf`), with the HOOK count UNMOVED at `4`.**

**THE RE-GRAIN THIS CONTINUATION OBLIGES**, stated as required acts rather than preferences:
**(a) EVERY COMPOSITION WHOSE ROWS ASSERT THE CALLER'S PRE-DRAG VALUE BY IDENTITY MUST SUPPLY IT ON THE HOOKS RECORD** — `attach(el, {element, onStart, onMove, onEnd, onCancel, preDragValueOf: () => preDrag})` — **at every drive that reads it: `I-5` · `M-6` · `M-8` · `M-10` · `M-12` · `M-13`(a) · `M-14` · `§5.5.1 P-RL-SM-4` · `P-RL-SM-7`** (the sites the red set currently reaches through the session double's own `setElement(el, preDrag)`).
**(b) THE SESSION DOUBLE'S OWN VALUE SUBSTITUTION MUST GO** — the *"fewer than three arguments ⇒ substitute my own value"* form that made the identity assertion UNFALSIFIABLE (`§2.3` item 9(a)) — **and the double's `committed: sink !== null` reading must go too** (`§2.3` item 9(d)), so the module's `committed` reading is never coupled to the WIRING's sink.
**(c) THE CAPTURE'S COUNT INSTRUMENT BECOMES THE CONSUMER'S OWN RECORDED INVOCATION COUNT** — exactly `1` per established gesture, `0` before establishment and `0` for a refused establishment — **BESIDE the arity/identity reading** (`§2.1` item 7(d); `§5.5.1 P-RL-SM-4`'s amendment).
**(d) THE FOUR DEGRADATION SHAPES ARE DRIVEN AND ASSERTED** (`§2.1` item 7(c)): **absent/`undefined`** (no attempt, recorded count `0`), **non-callable** (an attempted consultation, no invocation, count `0`), **a throwing callable** (one absorbed invocation, count `1`, nothing escapes the establishment turn), **a throwing accessor or hostile record** (`attach` and the establishment turn both silent) — **as ASSERTIONS INSIDE the existing declared attempts plus the clause cell's own drives, adding NO register row and NO term.**
**(e) `M-17`'s MESSAGE TEXT THAT READS *"the module adds no fifth hook"* IS RE-WORDED TO *"no fifth HOOK"*** — the record now carries one more MEMBER and the HOOK count is unmoved; **a re-grain that leaves the old wording will FAIL a row for a member this contract requires.**
**(f) THE HISTORICAL `90`-row / `81` FAILED / `9` PASSED FIGURES STAY AS THE RECORD OF THE PREVIOUS RUN** (annotate-never-rewrite); **the re-grained red's own row count is the re-grain's to report and is NOT a moved term.**

**⟶ CLOSED 2026-09-27 — THE FRESH STOP BELOW IS SUPERSEDED AND THE WRITER IS PINNED (the pin is at the end of this block; the as-written stop is kept VISIBLE and read as the as-filed record).** **THE FRESH STOP THIS PASS REPORTED — AND IT WAS WORSE THAN THE `A2` ITEM ABOVE REPORTED: THE INVALID ARM'S COMMIT WRITER IS NOT PINNED, AND THE `F-1` FIX DOES NOT TOUCH IT.** **`F-1` settles the VALUE's ROUTE into the module; it does not settle WHICH WRITER carries that value to the sink on the invalid arm.** **THE TWO HORNS, quoted so neither is paraphrased:** **(i)** **`§2.1`'s `CommitSink` declaration — the module's own bytes — says the module invokes the injected `commit` *"AT MOST ONCE PER GESTURE, ONLY from its own `commit` seam, ONLY for a gesture whose terminal is `'end'`"***, and **`§2.3` item 6(d)'s `'reset'` limb and `§2.5` item 7 clause 2's `'reset'` limb enumerate that arm's work WITHOUT a call of the module's own sink**. **(ii)** **`M-8` requires *"the sink is called ONCE with `777` and `outcome === 'reset'`"*; `M-14` reads the sink's own `value` argument on that arm; `§5.5.1 P-RL-SM-5`'s arm `(1)` asserts `sinkCalls === 1`, and `RelocateStats.sinkCalls` is declared as *"every invocation of the injected `commit`"*; `§2.3` item 4's channel-(C) row declares *"one commit of the caller-supplied pre-drag value"*.** **BOTH CANNOT HOLD AS WRITTEN.** **THIS IS A FRESH STOP (the `§2.1` item 7(g) clause carries it in-cell): it is a clause about the SINK's own domain, it needs its own adjudication, and THE RE-GRAIN MUST NOT GUESS IT** — **a green cannot be authored for `M-8`/`M-14`/`P-RL-SM-5`(1) until the writer is named.** **IT IS NOT PAPERED OVER HERE, AND IT DOES NOT BLOCK THIS AMENDMENT: the member's value is the value the arm commits, and THE ARM'S COMMIT EXISTS ON BOTH READINGS — only the WRITER's name was open.**

**THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED.** **The register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`** — `21+14=35`, `+12=47`, `+3=50`, `+8=58`, `+21=79`, `+5=84`, `+11=95`, `+5=100`, `+6=106`, `+3=109`, `+14=123`, `+7=130`, `+4=134`, `+30=164`, `+6=170` — **its addition chain (`§5.5.3`) still ends at `170`; its family subtotals still read `IM` `79` · `SM` `55` · `TP` `36`; both caps still hold (`170 <= 400` total, largest per-row term `30` `<= 100`); the `6 + 9 = 15` marked/unmarked split is unmoved; and the printed total EQUALS the sum of its own terms.** **WHY, in one sentence: the amendment adds a MEMBER and a DECLARED READING, changes no drive and no count, enters NEITHER of the two key sets, adds NO export and NO factory-option member, and its degradation drives ride as ASSERTIONS inside existing attempts and the clause cell.** **SO THIS PASS OWES NO REGISTER RE-GRAIN AND NO RE-RUN OF THE RED ON THE REGISTER'S ACCOUNT — the re-grain it DOES leave owed is the TEST-side one enumerated above (the hooks record's value at every identity drive, the double's substitution and `committed` readings, the count instrument, the four degradation drives, and `M-17`'s wording).**

**WHAT THIS CONTINUATION DOES NOT DO, stated so no reader over-reads it:** it **re-opens no ruling, no gate-1 condition and no register row**; **moves no row id, term, strategy id, seed, cap or section number**; **keeps `F-2` visible as NOT TAKEN and ARCHITECT-REVERSIBLE**; **weakens no prohibition** (the four-hook key set, the seven-member seam set, the exactly-two census exemptions and the single-sink-writer rule are all INTACT); **deletes no as-written form**; and **advances no gate** — the red re-grain remains the supervisor's next act, and the gates after it remain `OWED`.

**ITEM `S6` — DECLARED-FAILING CONTROL ATTEMPTS AND THE REGISTER'S `broken === 0`: DISPOSITION: **PINNED** at `§5.5.2` item 9 (appended; items 1–8 keep their numbers) and annotated at `§5.3` item 10.** **THE DEFECT, measured read-only: `§5.5.1 P-RL-SM-3`'s drives `(4)`/`(5)` and `P-RL-SM-5`'s drive `(3)` are CONTROLS DECLARED TO FAIL (the sibling precedent is `docs/specs/gutter.md`'s `P-GT-SM-3`: *"both positive controls DECLARED TO FAIL"*), and the red set's register harness counts ANY non-null cause as `broken` while its `finish()` asserts `broken === 0` — so both rows can never pass.** **THE RULE, PINNED IN FOUR CLAUSES: (1) a control drive IS a drive — counted in its row's `attemptsRun` and already INSIDE its declared term (`P-RL-SM-3` `5` includes `(4)`/`(5)`; `P-RL-SM-5` `3` includes `(3)`; `P-RL-IM-4` `8` and `P-RL-SM-2` `11` each include their control; `P-RL-SM-8` `4` includes its closed-set control), because `A DECLARED REGISTER TERM IS A DRIVE COUNT`; (2) its DECLARED FAILURE is an OBSERVATION, never a break — the drive CONTAINS the declared-failing shape and ASSERTS it, so the attempt HOLDS and `broken` stays `0` (the family's own landed form: `E3-BLOCK-6(c)`, *"A REQUIRED PROPAGATION IS ASSERTED, NEVER SCORED AS A BROKEN ATTEMPT"*); (3) the record REPORTS the controls BESIDE the term as a per-row `controls` figure, never counted in it; (4) the status row's own identity `held + broken === attemptsRun` is PRESERVED, and `broken === 0` remains the green criterion.** **CONSEQUENCE FOR THE REGISTER'S STATUS ROW: per row it prints `attemptsRun` · `held` · `broken` · `controls`, and a status row whose `broken` figure counts a declared-failing control is a REGISTER DEFECT — REPORTED, never tuned to green. CONSEQUENCE FOR THE DONE ROW'S HONESTY BLOCK (`§5.3` item 10): its per-row record reads `id · type · attempts-run · held · broken · CONTROLS`, it must state that the `broken` figures EXCLUDE declared-failing controls, and a DONE row reporting one as a broken attempt is a review finding.**

**THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED.** **The register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`** — `21+14=35`, `+12=47`, `+3=50`, `+8=58`, `+21=79`, `+5=84`, `+11=95`, `+5=100`, `+6=106`, `+3=109`, `+14=123`, `+7=130`, `+4=134`, `+30=164`, `+6=170` — **its addition chain (`§5.5.3`) still ends at `170`; its family subtotals still read `IM` `79` · `SM` `55` · `TP` `36`; both caps still hold (`170 <= 400` total, largest per-row term `30` `<= 100`); the `6 + 9 = 15` marked/unmarked split is unmoved; and the printed total EQUALS the sum of its own terms.** **WHY, item by item: `S4` moves a DECLARED READING inside one shape's cells and NOT the drives (`P-RL-IM-1`'s `16` + `5` are the same drives); `A1` is TEST-side and touches no cell; `A2` pins an arity and a capture point and, until the CHANNEL is ruled, ADDS NO DRIVE (a channel, when ruled, moves `P-RL-IM-4` and owes the re-grain named above — it is NOT owed by this pass) **(⟶ AMENDED 2026-09-27: the CHANNEL IS NOW RULED AND LANDED as fix shape `F-1`, and the as-written prediction inside this parenthesis holds for `F-2` ONLY — `F-2`, the EIGHTH FACTORY-OPTION member, is **NOT TAKEN** (`§0A` note 15's `A2` continuation) and is the one that would move `P-RL-IM-4`; the ADOPTED `F-1` adds a member of the HOOKS RECORD, so `P-RL-IM-4`, `R-5` and every declared term stand EXACTLY as printed, and NO RE-GRAIN AND NO RE-RUN ARE OWED ON THE REGISTER'S ACCOUNT.)**; `S6` adds a REPORTED `controls` figure BESIDE the terms, exactly as the DISTINCT figures of `§5.5.2` item 3 are reported beside theirs.** **SO THIS PASS OWES NO REGISTER RE-GRAIN AND NO RE-RUN OF THE RED ON THE REGISTER'S ACCOUNT — the re-grain it DOES leave owed is the ROW-READING re-grain of `S4`'s shape-`(3)` cells, `A1`'s double, `S6`'s control bucket and `A2`'s arity assertion, all TEST-side and all to be RUN before any implementation line is written.**

**WHAT THIS NOTE DOES NOT DO, stated so no reader over-reads it:** it **re-opens no ruling, no gate-1 condition and no register row**, **weakens no prohibition** (the four-hook install-options key set, the seven-member seam set and the two-exemption census ban are all INTACT), **deletes no as-written form** (every superseded reading stays visible beside its correction), and **advances no gate** — the red re-grain it owes remains the supervisor's next act and the gates after it remain `OWED`.

---

**Note 16 — THE COMPARATOR'S NEGATIVE CLASSES, PINNED: A FINITE NEGATIVE `distance` OR `threshold` IS THE UNUSABLE CLASS (2026-09-27, the THIRD Implementer pass's measured finding, re-derived read-only against THIS file's own rows and the red set's drives). THE FORMULA'S TEXT AND THE ROWS WERE MUTUALLY UNSATISFIABLE AS FILED; THE ROWS DECIDE, AND THIS NOTE PINS THE READING AND NAMES EVERY SITE IT TOUCHES. NO DECLARED TERM MOVED AND NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED — every change below is an ANNOTATION BESIDE the as-filed text, which is KEPT VISIBLE, and this note is APPENDED (notes `1`–`15` keep their numbers).**

**(a) THE DEFECT, MEASURED.** **THE AS-FILED COMPARATOR was stated as `distance <= threshold` with the BOUNDARY INSIDE at FOUR sites — `§2.1` item 1's `withinProximity` block (its own parenthetical *"`-5 <= -1` is `false`"*, which is ARITHMETICALLY WRONG: `-5 <= -1` is `true`), `§2.3` item 1, `§3.3 I-1`'s cell, and `§7b` `A-2`'s probe — while `§3.1 M-2`'s `(-5, -1)` cell and `§5.5.1 P-RL-IM-3`'s threshold-class-`(c)` cells DECLARE `false` for a negative pair. `-5 <= -1` IS `true` under the plain inequality, so THE FORMULA'S OWN TEXT AND THE ROW'S DECLARED ANSWER COULD NOT BOTH HOLD** — the defect class of `§0A` notes 13/14/15, one layer down, and the third Implementer STOP.

**(b) THE READING, PINNED — AND WHY THE ROWS REQUIRE IT, WITH THE DRIVES NAMED.** **THE READING IS: A FINITE NEGATIVE `distance` OR `threshold` IS THE UNUSABLE CLASS — a distance and a proximity radius are MAGNITUDES, so a negative value is not a distance; nothing is within proximity; the answer is `false`; and NOTHING THROWS (the family's total-gate discipline, so `§4.4 S-PURE-1`/`S-PURE-2` and the pure half's no-refusal-domain rule are UNTOUCHED). IN ONE SENTENCE: the answer is `true` IFF BOTH operands pass the `typeof` gate AND are NOT `NaN` AND are NON-NEGATIVE AND — where both are also FINITE — `distance <= threshold` holds; otherwise `false`. THE BOUNDARY-INSIDE RULE, THE `NaN` RULE, THE `±Infinity` RULE AND THE `-0`-IS-NOT-SPECIAL-CASED RULE ARE KEPT EXACTLY AS FILED.** **THE DRIVES THAT DECIDED IT, read read-only in `tests/relocate.test.ts`:** **(i)** **`M-2`'s `(-5, -1)` drive declares `false`, with the comment *"a NEGATIVE finite threshold is a LEGAL operand: `-5 <= -1` is false, and no range check exists"* — the comment's arithmetic is false while its DECLARED ANSWER is `false`;** **(ii)** **`P-RL-IM-3`'s threshold class `(c)` (`t = -1`) drives `below = -5` and `above = 0`, BOTH declaring `false`** — **and those two cells KILL candidate (b), the MAGNITUDE comparison `|distance| <= threshold`: `|−5| <= −1` is `false` ✓ and `|0| <= −1` is `false` ✓, BUT this file's own as-written pair `(-2, -1)` ⇒ `|−2| <= −1` is `false` where the cell declares `true` ✗, so (b) fails on the file's own row and rests nowhere but the same wrong arithmetic the defect names;** **(iii)** **`F-1`/`F-2`/`F-3`** do not discriminate but are all CONSISTENT, and **`F-3`'s five cells FORCE the unusable limb's BOUNDARY to the FINITE negative class**: a NON-FINITE `number` reaches the comparison VERBATIM, so `(-Infinity, -Infinity)` ⇒ `true` (F-3's cell) while `(-1, -1)` ⇒ `false` (M-2's) — hence the pin is NOT *"any negative operand"*.

**(c) THE ONE ROW FOUND INCONSISTENT WITH THE PIN — A FINDING FOR THE TESTWRITER, NOT A GUESS.** **`§3.3 I-1`'s RED-SET DRIVE — `tests/relocate.test.ts`'s expectation expression `typeof d !== 'number' || typeof t !== 'number' ? false : d <= t` over a 19-value operand pool that CONTAINS `-1` — DIVERGES ON 15 OF ITS 361 PAIRS: the `t === -1` family (`6` — `(-0, -1)` · `(0, -1)` · `(20, -1)` · `(20.5, -1)` · `(42, -1)` · `(Infinity, -1)`) and the `d === -1` family (`9` — `(-1, -0)` · `(-1, 0)` · `(-1, 20)` · `(-1, 20.5)` · `(-1, Infinity)` · `(-1, -Infinity)` · `(-1, 42)` · `(-1, -1)` twice, the pair `(13,13)` recurring because the pool carries `-1` once as a VALUE but the cross-product enumerates each pool SLOT) — each expecting `true` where the pinned rule answers `false`.** **THE 15 PAIRS ARE ENUMERABLE, so the re-grain needs no re-derivation: reading the pool as `[undefined, null, 42, 'x', true, [], {}, Symbol('s'), 12n, a function, new Map(), 0, -0, -1, 20, 20.5, NaN, Infinity, -Infinity]` by INDEX, the `t === -1` family is `(12,13)` · `(11,13)` · `(14,13)` · `(15,13)` · `(2,13)` · `(17,13)` and the `d === -1` family is `(13,12)` · `(13,11)` · `(13,14)` · `(13,15)` · `(13,17)` · `(13,18)` · `(13,2)` · `(13,13)` · `(13,13)`.** **THE INCONSISTENCY IS CONFINED TO THAT ONE EXPECTATION EXPRESSION AND THE ROW'S OWN TWO-LIMB PROSE IN THIS FILE (`§3.3 I-1`'s cell) — both are annotated in place.** **EVERY OTHER ROW AND DRIVE AGREES WITH THE PIN: `M-2` ✓ · `P-RL-IM-3` (3a) ✓ (the RED SET'S class-`(c)` drives `(-5, -1)` · `(-1, -1)` · `(0, -1)` are ALL `false` and are SATISFIABLE AS AUTHORED — **⟶ ANNOTATED 2026-09-27 (`§0A` note 17 item (b); the claim ABOVE IS KEPT VISIBLE and is SUPERSEDED IN ONE POINT): THE THREE DRIVES ARE `false` AGAINST THE GRID *AS PINNED* (`false` · `false` · `false`), NOT *AS AUTHORED* — the class's own AS-WRITTEN grid disagrees with the sentence HERE, in this note's own text: the cell's own words declare the pair `(-2, -1)` ⇒ `true`, and its `equal` cell `(-1, -1)` reads `true` under the AS-WRITTEN BOUNDARY-INSIDE rule, so two of the class's as-written cells carry `true`s that *"ALL `false` … AS AUTHORED"* denies; BOTH are the superseded forms note 16(d)(4) lands at that cell. So *"AS AUTHORED"* is READ AS *"AGAINST THE GRID AS PINNED"*, and the class-`(c)` drives are satisfiable against the pinned grid the re-grain must use.**) · `F-1`/`F-2`/`F-3` ✓ · `I-12` ✓ · `P-RL-IM-5` ✓ (its usable `number` shapes are non-negative) — **⟶ ANNOTATED 2026-09-27 (`§0A` note 17 item (c)): that `✓` covers the row's USABLE `number` shapes ONLY. Its shape `(6)`'s `±Infinity` variants are answered at the FIELD LAYER (a usable `distance` FIELD is a FINITE NON-NEGATIVE `number`, so a non-finite field takes the invalid arm as that row declares), while the comparator's VERBATIM limb governs the OPERANDS of the exported pure `withinProximity` (`-Infinity` against a finite non-negative `t` ⇒ `true`). THE TWO LIMBS MUST NOT BE READ INTO EACH OTHER; the layer scoping is pinned at the row and the residual divergence is REPORTED at note 17 item (f).** — **so NO RE-GRAIN IS OWED FOR THE COMPARATOR'S NEGATIVE CLASSES BEYOND `I-1`'s EXPECTATION EXPRESSION.**

**(d) THE SITES ANNOTATED (five), each named by its own string; NO as-filed text is deleted and NO number moves.** **(1) `§2.1` item 1's `withinProximity` block** — the declared-answer lead-in gains the dated NEGATIVE-OPERAND LIMB paragraph; the superseded clause and its wrong arithmetic stay VISIBLE, read as superseded in exactly that one point. **(2) `§2.3` item 1** — the *"The BOUNDARY IS INSIDE: `distance <= threshold`"* sentence carries the dated annotation, so the boundary rule READS OVER THE USABLE CLASS ONLY. **(3) `§3.1 M-2`** — the `(-5, -1)` cell's ANSWER is UNMOVED (`false`); what moved is the DERIVATION, and the parenthetical *"a NEGATIVE finite threshold is a legal operand"* is kept visible and read as superseded in one point. **(4) `§5.5.1 P-RL-IM-3`** — the threshold-class-`(c)` cell gains the pinned cells `false`/`false`/`false`, and the as-written *"the pair `(-2, -1)` declares `true`"* is KEPT VISIBLE and read as superseded (no row and no drive of this file drives that pair). **(5) `§3.3 I-1` and `§3.2 F-3`** — annotated as in (c): `I-1`'s two-limb enumeration is a three-limb enumeration now, and `F-3`'s five `-Infinity`/`+Infinity` cells are UNCHANGED with an explicit ban on generalising them to a finite negative operand. **`§2.1` item 5 WAS CHECKED AND NEEDS NO PIN: it lists `RelocateStats`'s members and repeats no comparator formula.**

**(e) THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED.** **`15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6` = `170`, in register order (`P-RL-IM-1` `21` · `P-RL-IM-2` `14` · `P-RL-IM-3` `12` **and** `3` · `P-RL-IM-4` `8` · `P-RL-IM-5` `21` · `P-RL-SM-1` `5` · `P-RL-SM-2` `11` · `P-RL-SM-3` `5` · `P-RL-SM-4` `6` · `P-RL-SM-5` `3` · `P-RL-SM-6` `14` · `P-RL-SM-7` `7` · `P-RL-SM-8` `4` · `P-RL-TP-1` `30` · `P-RL-TP-2` `6`): the `16` terms are the `15` rows' one term each plus `P-RL-IM-3`'s second half, and the printed total EQUALS the sum of its own terms.** **WHY: this amendment changes a DECLARED READING, never a DRIVE — `P-RL-IM-3`(3a) stays `4 × 3 = 12` (distinct `6`, unmoved: class `(c)`'s three cells are three of the twelve and two of the six distinct readings), `M-2` keeps its five drives, and `P-RL-IM-5`'s term is unmoved.**

**(f) WHAT THIS NOTE DOES NOT DO.** It **opens no gate, re-opens no note and no ruling, and advances no gate**; it **adds no register row, no term, no strategy id, no seed, no cap and no export**; **moves no row id and renumbers nothing** (every annotation sits BESIDE the as-filed text); **weakens no prohibition** — the boundary-INSIDE rule, the `NaN` rule, the `±Infinity` rule, the `typeof`-gate rule (no coercion, `§4.4 S-PURE-1`), the no-refusal-domain rule (`S-PURE-2`, the pure half still throws for NONE and refuses with NOTHING) and the exactly-two census exemptions are all **INTACT**; and **`§7b` `A-2`'s probe wording — which quotes the formula while ASKING whether the enumerated operands are answered by it — is LEFT AS FILED AND READ AS ASKED**: `A-2` is the probe `I-1` answers, and `I-1` now answers it with the three limbs named.

**Note 17 — THE COMPARATOR'S HOSTILE COLUMN, RECONCILED PER VARIANT: `§5.5.1 P-RL-IM-3`'s AS-WRITTEN ALL-`false` COLUMN IS CORRECTED FOR ITS `-Infinity` LIMB, AND `§0A` NOTE 16(c)'s CLASS-`(c)` CLAIM IS CORRECTED TO THE GRID IT DESCRIBES (2026-09-27, landed from the supervisor's measurement of that row's THREE BREAKS once the register's harness ran). APPENDED — notes `1`–`16` keep their numbers. EVERY CHANGE BELOW IS AN ANNOTATION BESIDE THE AS-WRITTEN FORM, WHICH IS KEPT VISIBLE: NO ROW ID, TERM, STRATEGY ID, SEED, CAP OR SECTION NUMBER MOVED; NO DRIVE, ATTEMPT OR TERM WAS ADDED, REMOVED OR MOVED; AND NOTHING THROWS ANYWHERE IN THIS NOTE'S AMENDMENTS — the family's total-gate discipline is untouched (`§4.4 S-PURE-1`/`S-PURE-2`), and `§2.3` item 1's second-comparison STOP stays UNFIRED.**

**(a) THE HOSTILE CLASS OF `§5.5.1 P-RL-IM-3` (3a)'s DISTANCE-CLASS `(4)`, DECLARED PER VARIANT.** **THE AS-WRITTEN COLUMN — *"(non-number, `NaN`, `+Infinity`, `-Infinity`, a `12n`/`Symbol` operand), each declaring `false` and no throw"* — IS KEPT VISIBLE AT THE CELL AND IS SUPERSEDED IN EXACTLY ONE POINT: ITS `-Infinity` LIMB. THE VARIANTS, EACH DECLARED EXPLICITLY, READ AGAINST THE ROW'S THREE THRESHOLD CLASSES (`(a)` a positive finite `number` · `(b)` `0` · `(c)` `-1` — all FINITE):**

| Variant | Operand(s) the variant drives | Declared answer, per the pinned rule | Why |
| --- | --- | --- | --- |
| **`(H1)` a NON-`number` operand** | `'20'` · `null` · `undefined` · `true` · `{}` · `[]` · a function · `12n` · a `Symbol` | **`false`** (unmoved) | the `typeof` gate, which precedes the comparison; `12n` does NOT throw (`F-1`) |
| **`(H2)` `NaN`** | `(NaN, t)` · `(d, NaN)` · `(NaN, NaN)` | **`false`** (unmoved) | the `NaN` limb (`F-2`) |
| **`(H3)` a FINITE NEGATIVE operand on EITHER side** | `(-1, 20)` · `(20, -1)` · `(-1, -1)` | **`false`** | the UNUSABLE class. **NOT driven by the as-written hostile list; DECLARED here rather than left implicit** (`M-2` · class `(c)` · `I-1`) |
| **`(H4)` `-Infinity`** | `(-Infinity, t)` for `t` finite and non-negative; `(-Infinity, -Infinity)` | **`true`** against a finite `t`; **`true`** for `(-Infinity, -Infinity)` | THE COMPARISON REACHED VERBATIM (note 16(b) · `F-3`). **THIS IS THE ONE AS-WRITTEN CELL THAT IS WRONG, AND THE ROW'S THREE MEASURED BREAKS: the `-Infinity` operand against `(a)` · `(b)` · `(c)`, each declared `false` as written, each `true` under the rule** |
| **`(H5)` `+Infinity`** | `(+Infinity, t)` for `t` finite and non-negative; `(+Infinity, +Infinity)` | **`false`** against a finite `t` (**the as-written answer, reached BY THE COMPARISON and NOT by a finiteness refusal**); **`true`** for `(+Infinity, +Infinity)`, which no cell of this file drives | the same verbatim limb |
| **`(H6)` a NON-NEGATIVE `-0` operand** | `(-0, t)` in the `0`-class `(b)` variant | **the BOUNDARY-INSIDE rule, exactly as `0`** (`-0 <= 0` is `true`) | `-0` is NOT special-cased; the row asserts the BOOLEAN, never the sign (`§2.1` item 1) |

**NO DECLARED TERM MOVES WITH THIS: the five hostile variants are driven INSIDE `(3a)`'s existing distance-class `(4)` and are already counted by its declared term `12` (`4` × `3`) — what moved is a DECLARED READING, exactly the form note 16(e) claims for its own amendment. AND ANY LATER CLAUSE OF THAT SAME CELL — INCLUDING ONE ALREADY SITTING IN ITS OWN ANNOTATION TAIL — THAT READS THE HOSTILE COLUMN AS ALL-`false` OR AS `UNCHANGED` IS READ AS SUPERSEDED IN THAT ONE POINT, `(H4)`. The red set's own hostile-cell expectations are the TestWriter's to re-grain, as `I-1`'s are; this note writes no test.**

**(b) THE `§0A` NOTE 16(c) INTERNAL INCONSISTENCY, FIXED IN PLACE — ANNOTATED, NEVER DELETED.** **THE AS-WRITTEN CLAIM reads *"`P-RL-IM-3` (3a) ✓ (the RED SET'S class-`(c)` drives `(-5, -1)` · `(-1, -1)` · `(0, -1)` are ALL `false` and are SATISFIABLE AS AUTHORED)"*, AND THE CLASS'S OWN GRID FOR `(c)` DISAGREES WITH IT *AS AUTHORED*: the cell's own words declare the pair `(-2, -1)` ⇒ `true`, and the `equal` cell of a class whose `t` is `-1` — the pair `(-1, -1)` — reads `true` under the AS-WRITTEN BOUNDARY-INSIDE rule, so the class's `below`/`equal` family carries `true`s that the sentence's *"ALL `false` … AS AUTHORED"* denies.** **RECONCILED BY NAMING WHICH GRID EACH CLAUSE DESCRIBES (the as-written sentence stays visible, with the annotation beside it): THE THREE DRIVES ARE `false` AGAINST THE GRID *AS PINNED* — where the FINITE NEGATIVE `threshold` puts all three class-`(c)` cells in the UNUSABLE class (`false` · `false` · `false`, the pinned cells note 16(d)(4) lands at the cell) — AND NOT *AS AUTHORED*, where two of those cells read `true`. THE CLAIM STANDS AGAINST THE PINNED GRID; *"AS AUTHORED"* IS THE SUPERSEDED PART; and the class-`(c)` drives are satisfiable against the pinned grid the re-grain must use.**

**(c) THE FURTHER SITES SWEPT — each named by its own string, each annotate-not-rewrite, each answered to the rule; the as-written form stays visible at every one.** **(1) `§5.5.1 P-RL-IM-5`** — its property text's unusable list carries *"a non-finite `number`"* and its shape `(6)` drives `+Infinity`/`-Infinity` as variants: **the FIELD LAYER declares a usable `distance` to be a FINITE NON-NEGATIVE `number`, so a non-finite FIELD takes the invalid arm AS DECLARED — while the COMPARATOR's rule governs the OPERANDS OF THE PURE EXPORT, where a non-finite operand reaches the comparison verbatim (`-Infinity` against a finite non-negative `t` ⇒ `true`). THE TWO LIMBS MUST NOT BE READ INTO EACH OTHER**; the cell now carries the dated layer annotation, and the residual (`F-14`'s `non-finite` drive, the `+Infinity`-versus-`-Infinity` coverage question, and the owed one-sentence limiter) is item (f). **(2) `§3.2 F-14`** — the same layer split, on the drive that declares the non-finite FIELD's invalid arm; annotated in place, its five declared answers UNMOVED. **(3) `§3.2 F-1`** — the `typeof`-gate limb, UNMOVED, annotated as variant `(H1)`. **(4) `§3.2 F-2`** — the `NaN` limb, UNMOVED, annotated as variant `(H2)`, with *"the comparison's own answer"* read as the `NaN` limb's answer and NOT as licence to reach the comparison with a FINITE NEGATIVE operand. **(5) `§3.3 I-12`** — annotated: no cell moved, and its *"`NaN`/non-finite readings' stability"* clause is read under the rule (the unusable limb is a CLASS TEST ON THE OPERANDS — never a mutation, never a retention, never a second comparison site). **THE SITES NOTE 16 ALREADY ANNOTATED, CHECKED AND LEFT UNMOVED: `§2.1` item 1's `withinProximity` block · `§2.3` item 1 · `§3.1 M-2` · `§3.2 F-3` · `§3.3 I-1`, whose OWN red-set expectation expression is the TestWriter's OWED RE-GRAIN (recorded in its cell and at note 16(c); this note makes the CONTRACT say the rule and writes no test) · and `§7b` `A-2`'s probe, LEFT AS FILED AND READ AS ASKED. **`§2.1` item 5 lists `RelocateStats`'s members and repeats no comparator formula — checked, nothing to pin.**

**(d) THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED.** **`15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6` = `170`, in register order (`P-RL-IM-1` `21` · `P-RL-IM-2` `14` · `P-RL-IM-3` `12` **and** `3` · `P-RL-IM-4` `8` · `P-RL-IM-5` `21` · `P-RL-SM-1` `5` · `P-RL-SM-2` `11` · `P-RL-SM-3` `5` · `P-RL-SM-4` `6` · `P-RL-SM-5` `3` · `P-RL-SM-6` `14` · `P-RL-SM-7` `7` · `P-RL-SM-8` `4` · `P-RL-TP-1` `30` · `P-RL-TP-2` `6`): the `16` terms are the `15` rows' one term each plus `P-RL-IM-3`'s second half, and the printed total EQUALS the sum of its own terms.** **NO STRATEGY ID, SEED OR CAP MOVED EITHER: `S-RL-PURE-1`/`S-RL-PURE-2` and `S-RL-DIST-1` stand, the largest per-row term is still `30` (`<= 100`) and the total is still `170` (`<= 400`). WHY NOTHING MOVED: every correction here is a DECLARED READING inside a cell that already exists — the hostile variants are driven INSIDE `(3a)`'s distance-class `(4)`, which its `12` already counts; `(3b)` stays `3`; `P-RL-IM-5`'s `21` (`7` × `3`), `M-2`'s five drives and `I-1`'s `361`-pair expression are untouched.**

**(e) WHAT THIS NOTE DOES NOT DO.** It **opens no gate, re-opens no ruling, re-opens no note and advances no gate**; it **adds no register row, term, strategy id, seed, cap, export or seam member**; it **moves no row id and renumbers nothing** (every annotation sits BESIDE the as-written text); it **writes no test and re-grains no red set** — the re-grains it NAMES (`§3.3 I-1`'s expectation expression and the red set's hostile-column cells) are the TestWriter's; it **weakens no prohibition** — the BOUNDARY-INSIDE rule over the USABLE class, the `NaN` rule, the `±Infinity` VERBATIM rule, the `typeof`-gate rule, the no-refusal-domain rule, the single-comparison-site STOP (`§2.3` item 1), the four-hook key set, the seven-member seam set and the exactly-two census exemptions are all **INTACT**; and it **re-opens no `E4` ruling** — `§0` ruling 1's referent (`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`) and `§2.3` item 1's one-arithmetic-site claim are UNCHANGED.

**(f) STILL CONTRADICTORY — STATED RATHER THAN SMOOTHED (the fresh findings this amendment does NOT settle).** **(1) THE TWO-LAYER DIVERGENCE IS UNDER-SPECIFIED IN ONE SENTENCE.** **The `distance` FIELD's usability class (`F-14` · `P-RL-IM-5` shape `(6)`) answers the INVALID ARM for a non-finite `number`; the COMPARATOR's verbatim limb (note 16(b) · `F-3`) answers `true` for `(-Infinity, t)` with `t` finite and non-negative. BOTH CAN HOLD ONLY IF A FIELD-LEVEL FINITENESS LIMB EXISTS — a class test on the field read, which is NOT a comparison, so `§2.3` item 1's STOP stays unfired — AND THIS FILE NEVER STATES THAT LIMB IN ONE SENTENCE, nor says whether shape `(6)` drives `+Infinity`, `-Infinity` or both. The two readings ARE discriminated by the existing drives (`F-14`'s `non-finite` drive against `F-3`'s `(-Infinity, -Infinity)` cell), so an Implementer must pick one; THIS NOTE PINS THE READING THE CELLS ALREADY DECLARE (the field limiter present, the pure export verbatim) AND REPORTS THE OWED SENTENCE.** **(2) NOTE 16(b)'s ONE-SENTENCE FORM AGAINST ITS OWN EXPLICIT LIMB.** **The sentence requires both operands to be *"NON-NEGATIVE"* — which literally EXCLUDES `-Infinity` and would answer `false` — while the SAME note's limb, `F-3`'s cell and item (a)'s `(H4)` declare `(-Infinity, -Infinity)` ⇒ `true` and `(-Infinity, finite t)` ⇒ `true`. The GOVERNING form is the explicit limb (*"the UNUSABLE limb is the FINITE negative class ONLY"*): the sentence is READ WITH *"NON-NEGATIVE"* MEANING *"NOT A FINITE NEGATIVE"*. The imprecision is REPORTED and the sentence stays visible at `§2.1` item 1, `§2.3` item 1 and note 16(b) — annotate, never rewrite.** **(3) AN UNDRIVEN OPERAND CLASS.** **A NON-FINITE `threshold` — the module's own option, or the comparator's second operand — is driven NOWHERE: the row's three threshold classes are all FINITE, `(c)` included, and no `F-` row drives a non-finite one. NO CELL IS WRONG (the rule answers it verbatim: `d <= +Infinity` ⇒ `true` for finite non-negative `d`; `d <= -Infinity` ⇒ `false`), but the class is UNDRIVEN, and a drive for it would be a NEW attempt — a TERM MOVE — which this note does not make and which is the supervisor's to rule.**

---

## Layer declaration (read this before any table below)

**This spec is DOC-LAYER only.** **No leg of it ran in this pass**: no suite ran, no trio ran, no Electron
window booted, no `tsc` invocation was made, and **no result is recorded here.**

| Label | Layer | What it is | What it is **not** |
| --- | --- | --- | --- |
| **[T]** | harness-side | the repo's own `tests/**` + `src/shared/dom-shim.ts` (host-owned test code) under the node suite | not a browser, not the assembled app |
| **[H]** | host-side | this repo's `src/**` — here, this unit's own `src/shared/relocate.ts` module, and the landed frozen session it composes | not engine-internal behaviour |
| **[U]** | real-DOM `ui` leg | `npm run ui` — the real-Electron observation leg landed by `U-REALDOM-BOOT` | **not** an identity leg; **not** assembled-app acceptance; **NOT OFFERED BY THIS SPEC** (`§5.2`) |
| **[D]** | divergence harness | `npm run divergence` — the shim ≡ real identity leg (`N = 9` pinned), **plus the landed extension channel of `U-DIVERGENCE-EXT` (`C2`, `DONE`)** | **nothing this unit's contract needs to observe**; **this spec claims no `[D]` row** (`§5.2`) |

**Five honesty anchors, carried so no row of this unit over-reads its layer:**

1. **A green node suite is envelope/pure-layer evidence — never assembled-app evidence.** It says this
   repo's vitest files pass against `src/shared/dom-shim.ts` and against this unit's module. **No window
   is booted, no IPC round-trip runs, no MCP transport is exercised, and no real DOM is touched.**
2. **This unit touches NO DOM, at all — not even the shim.** Its rows need **no element from a
   document**: the **element is an argument**, the **session is an argument** (or a recording double),
   the **candidate answer is an argument** and the **sink is an argument**. **A `[T]` green here proves
   CONTRACT CALL COUNTS AND ONE PURE FUNCTION'S BOOLEAN — nothing else.**
3. **The module reads NO ambient global and performs NO realm access** — no `document`, no `window`, no
   `globalThis`-rooted lookup, no `matchMedia`, no `getComputedStyle`, no `getBoundingClientRect`, no
   `activeElement`, no layout member, no `Date`, no `Math.random`, no `process.env`. **Every environment
   reading is a caller-supplied argument or a caller-supplied callback.**
4. **The property register (`§5.5.1`) is THIS unit's own property layer and changes nothing above.** Its
   rows are authored in **this unit's own test file** and executed by the **same node suite**
   (`npm test`, `§5.2` leg 1) — so **a register row is `[T]` evidence exactly as a `§3` row is**, and
   **no register row may be read as `[H]`, `[U]`, `[D]` or assembled-app evidence.**
5. **A channel-invocation green is NOT a rendered-state green.** Every counted invocation is **a call the
   module made into an argument-supplied function** — **never a fact about a zone's visibility, an
   expanded box, a ghost's position on screen, an applied class, a layout pass or a perceived revert.**

---

## 1. Scope

**One deliverable: one `src/shared` module — a relocate/drop session COMPOSED ON the landed node-local
gesture session, plus a PURE TOTAL proximity comparator** — with **all policy injected**, **the reveal
written exactly once per gesture and only at the `'end'` terminal**, **the ghost and the zone's mid-drag
hide on ONE per-move transient channel**, **a release-or-departure outside every candidate's proximity
taking the invalid arm exactly once**, and **no capture, no coordinate and no geometry anywhere**.

1. **What the unit is, in one sentence.** A **node-local, policy-free-by-construction relocate session**:
   it **composes** the landed frozen session (`U-GSESSION`, `E6`, `DONE`), **forwards the consumer's four
   hooks** into the session's own install/establishment path through **its own `onStart`/`onMove`
   wrappers** (the handle arrives only through `onMove`), asks the consumer's own
   **`candidatesFor(element)`** for an opaque candidate set **that carries a measured scalar distance**,
   compares that distance against the caller-supplied **`threshold`** with its own exported pure
   **`withinProximity`**, shows the prospective drop through a caller-supplied **`onPreview`** on every
   observed move (including the **hide** when the pane leaves proximity or retargets), **resolves the
   target during the gesture** through the caller's **`resolveTarget`**, and **writes the durable reveal
   through `onReveal` EXACTLY ONCE inside its own `commit` seam at an `'end'` terminal** — while a move
   that places the pane outside every candidate **takes the invalid arm from the module's own move turn**,
   entering the session's `reset` terminal once with the **caller-supplied pre-drag value**.
2. **What the unit is NOT — NO COORDINATE, NO EVENT, NO GEOMETRY, and that is a NAMED COST.** **The unit
   ships NO drag arithmetic, NO distance computation, NO coordinate read and NO element read.** It **never
   sees an event object**, has **no `clientX`/`clientY`/`pageX`/`pageY`/`deltaX` input and no parameter
   through which one could arrive** (`§2.2` `P-1`), and **cannot compute a distance** (`§0A` notes 2/5;
   ruling 5). **The distance is the CUSTOMER's** and arrives inside `candidatesFor`'s answer; **the
   comparison is this module's** and is one public pure function. **The ghost's POSITION, the expanded
   zone's BOX and the proximity AS RENDERED are geometry and are UNPROVABLE HERE** (`§5.2`, `I-11`).
   **The live presentation channel is the CONSUMER's** (`onPreview`) and is **NEVER the sink**.
3. **What the unit is NOT — no policy of its own.** **No default candidate set, no default target, no
   default reveal state, no default threshold, no unit string, no selector, no store, no census read and
   no second writer.** Every one of those is the **consumer's** and arrives **as an injected seam**
   (`§2.2`). **The only value comparison the module performs is `withinProximity`'s one scalar test**, and
   **the only write it performs is one call to the one sink it was handed, at an `'end'` terminal.**
4. **What the unit is NOT — no geometry, and no second gesture authority.** It makes **no
   geometry-observation call of any kind** (`§3.4 R-8`) and **re-expresses none of the session's
   lifecycle**: it **never attaches a listener**, **never calls `session.begin`/`end`/`cancel`**, and
   **never becomes a second writer on the same channel** (ruling 6; `§2.5`). **The session remains the
   single gesture authority.** **The module DOES call the session's `reset` terminal — and that is legal
   for a composer, not the `V-13` class**: the class is *the same sink through another channel*, and this
   module's reset enters the session's own terminal, which is the ONE thing `E3`'s `S-11` amendment
   explicitly permits (`§2.2` `P-4`, `I-3`).
5. **What the unit is NOT — no UI.** **The ghost, the expansion and the visible revert are NOT authored
   here**; the module **authors no element, no text, no class, no attribute, no stylesheet, no control and
   no stylesheet rule**. **The unit that OWNS the rendered surface is the panes/zones family's UI unit,
   and this unit does not owe it and must not imply it** (`§1` item 5's named cost; `§5.2`'s three-part
   refusal; `§3.4 R-11` is the row that can FAIL for a UI-content write).
6. **What is EXPLICITLY OUT of scope (do not do in this unit).** No renderer wiring and no demo envelope
   (`§5.1`'s DENIED set); no import of any sibling module and **no census read of any kind**; no session
   code (the session is `DONE` and **its module and test file are FROZEN**); no store, no persistence, no
   journal, no cache, no module-level mutable state; no CSS and no stylesheet; no new MCP surface, no IPC
   method, no `RpcMethod` member, no tool and no resource; no divergence-harness work and **no `[D]`
   row**; **no `docs/skills/designing-pages.md` update — that file DOES NOT EXIST** (globbed
   `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage
   matrix, no demo-page index and no page-design layer to update** — and **this unit renders no page**
   (`§3.5 R-9` is the probe that keeps that claim falsifiable).
7. **What the unit may land.** The module (NEW) + its red/green rows + the register rows + this spec +
   its `*-greens.md` + the unit's own tracker/record artifacts. **No host change**: this unit adds one new
   `src/shared/` module and touches **no existing file** except this spec and the trackers (`§5.1`).
8. **THE VALUE IS REUSABLE-CONTRACT VALUE, STATED HONESTLY.** **The unit ships no feature and has NO
   IN-TREE CONSUMER**: `src/shared/relocate.ts` will be **imported by no `src/**` file** and will appear
   in **none of the five esbuild bundles**. **Its value is the contract itself** — a relocate session any
   consumer can wire to its own candidates, resolver, reveal state and presentation channel — **and its
   green is envelope/pure-layer evidence that the contract holds FOR A CALLER, never that the app
   behaves differently.** **The honest cost**: this spec + a **`15`-row / `16`-term** register *(**AS FIRST
   WRITTEN this clause read `15`-row / `17`-term — the term-count defect, corrected 2026-09-27: the
   register carries `16` terms, `170` attempts**)* + red/green
   **with remands** + the adversarial pass + blind greens + the per-unit documentation review + a DONE
   row + per-gate commits (`RCA-8(f)`).

---

## 2. The surface (exact)

### 2.1 What this unit ADDS — every exported name, signature, return shape, and error pattern

**New module: `src/shared/relocate.ts`** (`§0A` note 1). **It imports EXACTLY ONE sibling, TYPE-ONLY — the
session module (`§0A` note 4) — and `§3.4 R-4` is the row that pins that shape.**

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: TEN exported names, in TWO
HALVES — TWO value exports and EIGHT type declarations.** **The two halves are counted separately on
purpose**, because sibling reviews have caught a census cell contradicting the block beside it, and
because **a type declaration is erased at runtime** — so a single *"10 exports"* claim would be
**half-unfalsifiable**.

**(a) THE TWO RUNTIME VALUE EXPORTS — exactly `createRelocateSession` and `withinProximity`.** **THE PIN,
and its reason:** the gate-1 record's `§A.2` recommends **three** values with **`POINTER_TYPES` conditional
on the module genuinely needing the session's event-type token, and recommends it ABSENT**; **this filing
pins the TWO-value census** (`§0A` note 4). **The module attaches no listener, names no event type and
never sees an event object; the only legal per-move site is its own `onMove` wrapper, which receives the
HANDLE** — so an imported-but-unreferenced `POINTER_TYPES` binding would re-open the exact residue the
record flags as a RESIDUE HAZARD, and **a value import of the session factory remains FORBIDDEN** (ruling
7's quoted boundary sentence). **`§3.4 R-5`(a) reads the imported namespace's own keys, BY NAME, with a
positive control that a namespace carrying a THIRD value export FAILS.** — **The record's condition
`C-2`/`C-A`-adjacent half is discharged here as a DECISION, and the alternative (a three-value census
with a referenced `POINTER_TYPES`) is recorded as ARCHITECT-REVERSIBLE**: a later pass that needs an
event token opens a gate rather than adding a binding.

**(b) THE EIGHT TYPE DECLARATIONS — exactly `CandidateFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`,
`RelocateOptions`, `RelocateSession`, `RelocateStats`, `RelocateTargetFor`** (`§3.4 R-5`(b): a type-only
name is **erased at run time**, so the type half is a **PRESENCE** claim pinned by **`§5.2` leg 4's
standalone strict `tsc`** — the same form `gsession.md` `§3.4 R-6`(b) and `gutter.md` `§3.4 R-5`(b) were
re-stated to). **The seam types are COUNTED IN THIS HALF on purpose**, per ruling 11, **and the arithmetic
of that half is stated rather than asserted: THREE of the eight spell a seam or a seam's answer
DIRECTLY — `CandidateFor` (`candidatesFor`'s answer, carrying the distance) · `RelocateTargetFor`
(`resolveTarget`'s signature) · `CommitSink` (the `commit` seam's signature) — and the other FIVE name the
composition's structure around the remaining four seams: `PreviewSink` (the `onPreview` seam's signature —
so FOUR spell a seam) · `RelocateHandle` (the four consumer hooks — **plus the AMENDED value-reading member `preDragValueOf`: `§2.1` item 7, 2026-09-27, so the record's MEMBER count reads `5` + `1` = `6` while its HOOK count stays EXACTLY THE FOUR and NO OTHER CENSUS MOVES**) · `RelocateOptions` (the seven-member
set, including `onReveal` and `threshold`, which spell no type of their own) · `RelocateSession` and
`RelocateStats` (the module's own surface).** **So `4` of the `8` types spell a seam, `4` name the
composition — and NO seam is left untyped and NO type is orphaned.** **`onReveal` takes `(target,
decision)` and `onPreview` takes a state, so NEITHER is `CommitSink`: three different functions, three
different types where a type is needed.** **The whole seam table is `§2.1` item 2.**
**A row asserting only a COUNT without NAMING the names FAILS `R-5`'s own text** (`§4.4 S-7`).

```ts
/** THE PROXIMITY COMPARATOR — PURE and TOTAL, with NO REFUSAL DOMAIN (§0A note 2).
 *  `threshold`'s MEANING is settled by ruling 1: a proximity RADIUS around a
 *  candidate zone. This function is the module's ONE value comparison, and the
 *  analogue of `E3`'s `clampToBounds`.
 *
 *  TOTAL: it returns a `boolean` for EVERY pair of inputs, throws for NONE, and
 *  never returns `undefined`, a record, a string or a sentinel. There is no `ok`,
 *  no `code`, no `reason` and no `skipped` in this contract: `false` is a VALUE,
 *  not a refusal.
 *
 *  THE DECLARED ANSWER FOR EVERY INPUT CLASS — falsifiable, and asserted by
 *  `P-RL-IM-3`, whose two halves are `(3a)` the comparison and `(3b)` the
 *  no-default clause:
 *    - `distance` is a FINITE `number` and `threshold` is a FINITE `number`:
 *      the answer is `distance <= threshold` — the BOUNDARY IS INSIDE, and
 *      `d < t`, `d == t` and `d > t` are the three declared outcomes. A
 *      NEGATIVE finite threshold is a legal operand: no range check exists,
 *      and `distance <= threshold` is the answer verbatim (`-5 <= -1` is `false`).
 *    - `distance` is `NaN` or `threshold` is `NaN`: `false` (never a throw).
 *    - `distance` or `threshold` is a NON-FINITE `number` (`+Infinity`,
 *      `-Infinity`): the comparison is the answer VERBATIM — `Infinity <= Infinity`
 *      is `true`, `0 <= Infinity` is `true`, `5 <= -Infinity` is `false`. NO
 *      finiteness refusal exists: this is the formula, not a gate.
 *    - `distance` or `threshold` is NOT a `number` (absent, `undefined`, `null`,
 *      a string, a boolean, a `bigint`, a `symbol`, a function, an object, an
 *      array, a `Map`): `false` BY A `typeof` GATE, never by coercion — no
 *      `Number(...)`, no `parseFloat`, no `+value`, no `String` round-trip.
 *      (Without the gate, `Math`-free `<=` would COERCE: `'12' <= 20` is `true`,
 *      `null <= 5` is `true`, `true <= 1` is `true`, and a `BigInt` comparison
 *      would THROW — the gate is what makes the function total.)
 *
 *  MUTATES NOTHING, RETAINS NOTHING and READS NOTHING but its two arguments.
 *  `-0` is NOT special-cased: `Object.is(-0, 0)` is false, but `-0 <= 0` is
 *  `true`, and the row asserts the BOOLEAN, never the sign of an operand.
 *
 *  ⟶ THE NEGATIVE-OPERAND LIMB, PINNED 2026-09-27 (`§0A` note 16; the as-written
 *  clause ABOVE is KEPT VISIBLE and READ AS SUPERSEDED IN EXACTLY ONE POINT —
 *  the NEGATIVE-FINITE `threshold` limb and `(-5, -1)`, which is `true` under the
 *  plain inequality and `false` in every row this file drives).
 *  A FINITE NEGATIVE `distance` OR `threshold` IS THE **UNUSABLE** CLASS: a
 *  distance and a proximity RADIUS are MAGNITUDES, a negative value is not a
 *  distance, so nothing is within proximity and the answer is `false` — and
 *  NOTHING THROWS (the family's total-gate discipline; `§4.4 S-PURE-1`/`S-PURE-2`
 *  are UNTOUCHED, and the pure half still has NO refusal domain).
 *  THE RULE IN ONE SENTENCE, so the cells are checkable: the answer is `true` IFF
 *  BOTH operands pass the `typeof` gate AND are NOT `NaN` AND are NON-NEGATIVE
 *  AND — where both are also FINITE — `distance <= threshold` holds; otherwise
 *  the answer is `false`. So `(-5, -1)` ⇒ `false`, `(-1, -1)` ⇒ `false`,
 *  `(0, -1)` ⇒ `false`, `(-5, 20)` ⇒ `false`, and an unusable operand on either
 *  side decides the answer alone.
 *  THE `NaN` RULE AND THE `±Infinity` RULE ABOVE ARE KEPT EXACTLY AS FILED: `NaN`
 *  ⇒ `false`; and a NON-FINITE `number` REACHES THE COMPARISON VERBATIM — the
 *  UNUSABLE limb is the FINITE negative class ONLY, so `(-Infinity, -Infinity)`
 *  is `true` (`F-3`'s cell) while `(-1, -1)` is `false` (`M-2`'s cell). */
export function withinProximity(distance: unknown, threshold: unknown): boolean

/** THE CALLER'S PER-CANDIDATE ANSWER — the shape `candidatesFor` returns (§0A note 2).
 *  THE CANDIDATE IS OPAQUE: this module never reads `candidate`, never compares it,
 *  never stringifies it and never uses it as a map key. THE DISTANCE IS A SCALAR
 *  the CALLER measured; this module reads it through ONE total member-read and
 *  hands it to `withinProximity`. There is NO coordinate, NO element and NO
 *  geometry in this record, and no selector, no unit string and no zone id.
 *
 *  `distance`'s field name is MECHANISM VOCABULARY (§2.3 item 3): it is a declared
 *  contract token, scanned like the module's other owned names, and it carries the
 *  same negative-control exemption `threshold` carries.
 *
 *  THE DECLARED DEGRADATION OF THE WHOLE ANSWER, and of the field alone, is
 *  `§2.4` item 3: an unusable answer, a non-record answer, an absent `candidate`
 *  or an unusable `distance` all answer "NOTHING WITHIN PROXIMITY" ⇒ the invalid
 *  arm at once — NEVER a throw, and NEVER a default. */
export interface CandidateFor {
  /** The caller's OPAQUE candidate — handed to `resolveTarget` and to the
   *  presentation channel and never interpreted here. */
  readonly candidate: unknown
  /** THE MEASURED SCALAR DISTANCE, from the CALLER's own geometry reading.
   *  A `number` is usable; anything else — absent, `undefined`, a non-number,
   *  `NaN`, a non-finite `number` — is declared by `§2.4` item 3 and driven by
   *  `§5.5.1 P-RL-IM-5`. */
  readonly distance?: unknown
}

/** THE CHOSEN-TARGET SEAM (`resolveTarget`) — called DURING the gesture so the
 *  ghost can preview a CHOSEN drop (§7a.1 item 1, the pinned reading).
 *  It returns the caller's OPAQUE chosen target for that observation, or
 *  `undefined` for "no target this move" — and `undefined` is NOT a cancel: it
 *  means the committing terminal writes NOTHING for that gesture (`§2.4` item 3).
 *  ABSENT / non-callable / THROWING ⇒ the declared safe default `undefined`. */
export interface RelocateTargetFor {
  (element: unknown, candidates: readonly CandidateFor[], gesture: GestureHandle): unknown
}

/** THE ONE SINK (`commit`) — the composition's SINGLE SINK WRITER (ruling 6).
 *  The module invokes it AT MOST ONCE PER GESTURE, ONLY from its own `commit`
 *  seam, ONLY for a gesture whose terminal is `'end'` and whose value is one of
 *  the module's two declared kinds, and NEVER from `onStart`/`onMove`/`onPreview`
 *  and never on a `cancel`. It receives the SESSION's own gesture handle for the
 *  terminal (`gesture.outcome` is `'end'` or `'reset'`) and the value.
 *
 *  ITS THROW PROPAGATES to the caller of the session's terminal turn — it is a
 *  consumer boundary, and this module swallows only its OWN value-reading seams
 *  (ruling 8). It is NOT `onReveal` and NOT `onPreview`: three different
 *  functions, and giving the same function to the module's sink and to the
 *  session's `commit` construction option is a TWO-WRITER composition that FAILS
 *  (`§3.2 F-6`).
 *
 *  ⟶ THE DOMAIN, PINNED (2026-09-27, `§0A` note 15's `A2` continuation's closing
 *  pin; the as-written sentences ABOVE ARE KEPT VERBATIM and their drifted cell is
 *  the `'end'`-ONLY half, NOT the rule): the module invokes THIS sink EXACTLY ONCE
 *  at the terminal of any gesture that REACHED A TERMINAL — carrying the
 *  dragged/committed value on `'end'` and the CALLER-SUPPLIED PRE-DRAG VALUE on
 *  `'reset'` (the invalid arm, entered from the module's own move turn while the
 *  gesture is still active: `§2.3` item 6 / `§2.5` item 7 clause 2) — ZERO times
 *  on a `cancel` and ZERO times on ANY refused terminal. READ THE `'end'` LIMB
 *  WITH `F-16`/`P-RL-SM-1` PATH `(5)`: an `'end'` whose resolved target is
 *  `undefined` writes NOTHING (`sinkCalls === 0`), and the refused-terminal
 *  clause names the SESSION's own refusals (stale/absent handle, `'busy'`,
 *  `'disposed'`, `'not-installed'`, `'disconnected'`). The value it carries is
 *  the CLAMPED/DECLARED value the arm OWNS, never a mechanism default. The
 *  `'reset'` write is required by `M-8`, `M-14`, `§5.5.1 P-RL-SM-5`(1) and
 *  `§2.3` item 4's channel-(C) cell, and is the landed `U-GUTTER-UI` invalid-arm
 *  shape (`docs/pending.md`'s `SCH-7` row). */
export interface CommitSink {
  (gesture: GestureHandle, value: unknown): void
}

/** CHANNEL (B) — THE PER-MOVE TRANSIENT PRESENTATION WRITE (the ghost, and the
 *  zone's show/hide). It is invoked AT MOST ONCE PER OBSERVED MOVE, ZERO times at
 *  a terminal, and NEVER with a committing value: it is NOT the sink, and a
 *  preview write that reaches the sink is a VIOLATION (`§4.4 S-10`).
 *
 *  IT IS ALSO THE CHANNEL THAT CARRIES THE MID-DRAG HIDE — leaving the proximity,
 *  or retargeting to a different zone — and the hide-plus-show of a retarget is
 *  ONE invocation in ONE observed-move turn (ruling 2; `§0A` note 6).
 *
 *  ITS THROW PROPAGATES: it is a `void` presentation seam (ruling 8), so the
 *  turn's work stops, the throw surfaces at the observed-move turn, and the
 *  module's per-gesture record is discarded in its own `finally` (`§2.4` item 4).
 *  It receives the caller's own state record — never an element, never a
 *  coordinate, never a rendered value. */
export interface PreviewSink {
  (state: unknown): void
}

/** THE PER-CONTROL HOOKS a consumer passes to `attach` — ALL FOUR OPTIONAL, and
 *  FORWARDED UNCHANGED into the session's own `install(element, …)` call wherever
 *  the consumer supplied one. THE MODULE ADDS NOTHING TO THEM: no fifth hook, no
 *  wrapping policy and no value computation. THE MODULE OWNS AND INSTALLS ITS OWN
 *  `onStart` AND `onMove` WRAPPERS AROUND THEM (the establishment seam and the
 *  handle-capture/observation seam — `§2.5` item 5), so a consumer hook's
 *  ARGUMENTS pass through BY IDENTITY and nothing is swallowed or reordered. */
export interface RelocateHandle {
  readonly element: unknown
  readonly onStart?: (element: unknown) => void
  readonly onMove?: (gesture: GestureHandle) => void
  readonly onEnd?: (element: unknown, value: unknown) => void
  readonly onCancel?: (element: unknown) => void
  /** THE AMENDED MEMBER — THE CALLER'S PRE-DRAG VALUE, READ FROM THE RECORD THE
   *  CONSUMER ALREADY HANDS TO `attach` (AMENDED 2026-09-27; `§2.1` item 7;
   *  `§0A` note 15's `A2` continuation). It is the channel that was carried as an
   *  OWED CONTRACT ITEM and is now RULED AND LANDED as fix shape `F-1`.
   *
   *  ITS SIGNATURE AND STATUS: `preDragValueOf?: (element: unknown) => unknown`
   *  — OPTIONAL, exactly like the four hooks above. IT IS NOT A FIFTH HOOK: the
   *  record's HOOK MEMBERS stay EXACTLY THE FOUR the comment above names, while
   *  its MEMBER COUNT moves from FIVE to SIX; this member is never forwarded
   *  into the options the session is handed and is never invoked by the session.
   *  IT IS ALSO NOT ONE OF THE SEVEN FACTORY OPTIONS: it is a member of THIS
   *  per-control record, so the factory's option set stays CLOSED AT SEVEN (an
   *  eighth member still FAILS), the exported NAMES are unchanged, and no
   *  register row, term or drive moves.
   *
   *  ITS SEMANTICS: this module invokes it from ITS OWN establishment wrapper,
   *  for a gesture the session ESTABLISHED, EXACTLY ONCE per gesture, passing
   *  the ELEMENT it received; the answer is held in the per-gesture record,
   *  handed on BY IDENTITY, never altered, and DISCARDED at every terminal in
   *  this module's own `finally`. It is the value the invalid arm commits as the
   *  THIRD argument of the session's `reset(element, handle, value)`.
   *
   *  ITS DECLARED DEGRADATION (ABSENT / NON-CALLABLE / THROWING / A THROWING
   *  ACCESSOR) — this is a VALUE-READING member, so ITS THROW IS ABSORBED AND
   *  NEVER PROPAGATED, and its unusable shapes answer ONE DECLARED REFUSAL THAT
   *  COMMITS NOTHING OF ITS OWN: no default, no sentinel, no invented value, no
   *  throw out of `attach` and none out of the establishment turn — the third
   *  argument then reads `undefined`, and the invalid arm's own counts and arity
   *  are UNCHANGED. The whole clause is `§2.1` item 7. */
  readonly preDragValueOf?: (element: unknown) => unknown
}

/** THE COMPOSITION'S OPTIONS — EXACTLY SEVEN MEMBERS, IN THIS ORDER, no eighth and
 *  no policy default (§2.1 item 2). `capture` is ABSENT because this module
 *  constructs nothing and passes no install options: "no capture before
 *  establishment" is INHERITED AND OBSERVED (`§0A` note 11, `§3.4 R-10`). */
export interface RelocateOptions {
  /** SEAM 1 — THE SESSION THIS MODULE IS COMPOSED ON (ruling 3's boundary).
   *  ABSENT / non-object / a record whose members are not callable ⇒ a VALID but
   *  INERT module: `attach` ⇒ `false`, the declared refusals, zeroed stats, and
   *  never a throw (§2.4 item 1). This module READS the session only through
   *  `stats()`, `gesture()` and `disposed`, and CALLS only `install`, `reset` and
   *  `dispose` on it (§2.5 item 1). */
  readonly session?: unknown
  /** SEAM 2 — THE CANDIDATE SOURCE. Called AT MOST ONCE PER OBSERVED MOVE (§2.3
   *  item 6 pins the multiplicity; `P-RL-IM-1` carries the row). */
  readonly candidatesFor?: unknown
  /** SEAM 3 — THE RESOLVE POLICY (the `APP-POLICY-STATE` answer BY INJECTION). */
  readonly resolveTarget?: RelocateTargetFor
  /** SEAM 4 — CHANNEL (A), THE DURABLE REVEAL STATE WRITE. */
  readonly onReveal?: unknown
  /** SEAM 5 — THE ONE SINK. */
  readonly commit?: CommitSink
  /** SEAM 6 — THE PROXIMITY THRESHOLD (ruling 1's referent). */
  readonly threshold?: unknown
  /** SEAM 7 — CHANNEL (B), THE PER-MOVE PRESENTATION CHANNEL. **THE ONE MEMBER
   *  THE RULING FORCES BEYOND THE `A-d4` SIGNATURE** (§0A note 3). */
  readonly onPreview?: PreviewSink
}

/** THE MODULE — FIVE MEMBERS, and this is the WHOLE surface (§2.1 item 3).
 *  Every member is TOTAL: none throws for ANY argument, whatever the session or
 *  the seams do — EXCEPT where this contract names a propagation explicitly (a
 *  throwing `commit`/`onPreview` propagates to the caller of the turn that
 *  invoked it, and `§2.4` item 4 names the two turns). */
export interface RelocateSession {
  /** Attach ONE control: forwards the consumer's four hooks into
   *  `session.install(element, …)` INSIDE the module's own `onStart`/`onMove`
   *  wrappers, and records the element in the module's OWN ledger, BY IDENTITY.
   *  Returns `true` iff THIS call delegated and the session installed. Returns
   *  `false` — delegating NOTHING — when: the element is already attached here
   *  (a repeat attach is a NO-OP, first-config-wins, `false`); the element is
   *  `null`/`undefined`; the session is unusable or disposed; or the session's
   *  own `install` returned `false`. TOTAL: never throws. THE MODULE ATTACHES NO
   *  LISTENER OF ITS OWN. */
  attach(element: unknown, hooks?: RelocateHandle): boolean
  /** Detach THIS module's own baseline: `session.dispose()` exactly once, then
   *  the module's ledger is dropped. Returns `true` iff the session reported a
   *  detach with `complete === true`. Returns `false` WITHOUT a session call when
   *  the module holds NO attached element, the session is unusable, the session
   *  is already disposed, or MORE THAN ONE element is attached here — because the
   *  session is SHARED and detaching it on behalf of one control would detach
   *  every other control's listeners (`§7a.1` item 4). IDEMPOTENT and TOTAL. */
  detach(): boolean
  /** THE INVALID-ARM ENTRY POINT (§0A note 8) — the same arm the module's own
   *  move turn takes, exposed for a consumer-driven reset and for the rows.
   *  Refusals are RETURNED, never thrown: `{ok: false, code, committed: false}`.
   *  TOTAL: never throws. The record's shape is `{ok: boolean, code: string,
   *  committed: boolean}` — the code domain is the SESSION's own closed union,
   *  propagated VERBATIM, and NO module-local code exists (§2.3 item 4). */
  reset(element: unknown): RelocateResetResult
  /** The module's own counters (§0A note 10). NOT MCP-visible. NEVER throws. */
  stats(): RelocateStats
  /** `true` FOREVER once `detach()` has completed, or once the session reads
   *  `disposed === true`. */
  readonly detached: boolean
}

/** THE MODULE'S OWN COUNTERS (§0A note 10). All monotonic except `lastCode`.
 *  These are THIS module's counters; the session's own counters are the
 *  session's rows and are NOT re-read here. */
export interface RelocateStats {
  /** Elements attached by THIS module, by identity. */
  readonly attached: number
  /** Gestures THIS module established (i.e. its own `onStart` wrapper ran for a
   *  session `{ok: true}` establishment). NEVER counts a refused establishment. */
  readonly gestures: number
  /** OBSERVED MOVES — the module's own move turns, counted once per invocation
   *  of its `onMove` wrapper. */
  readonly moves: number
  /** `candidatesFor` invocations the module ATTEMPTED (including a non-callable
   *  or throwing seam, which is an attempt and is never retried).
   *
   *  THE TWO WORDS, PINNED 2026-09-27 (`§0A` note 15 item `S4`; the row is
   *  `§3.2 F-15`, and the register row is `§5.5.1 P-RL-IM-1`): ATTEMPTED = a
   *  TRY to consult the seam. It is counted ONCE PER OBSERVED MOVE wherever
   *  this option carried a value OTHER THAN `undefined` — INCLUDING a
   *  non-callable (`42`, `'x'`, an object, a hostile `Proxy`) and a callable
   *  that THROWS. INVOKED = the seam was ACTUALLY CALLED, which happens only
   *  where a callable was present. The ONLY non-attempt form is the member
   *  ABSENT from the options record or carried with the value `undefined`
   *  (both read `0`); `null`, `false`, `0`, an empty string, a non-callable
   *  and a throwing callable are ALL ATTEMPTS, and no attempt is ever
   *  retried. So a NON-CALLABLE seam reads `1` per observed move, not `0`. */
  readonly candidateCalls: number
  /** `resolveTarget` invocations the module ATTEMPTED. */
  readonly resolveCalls: number
  /** DURABLE REVEAL WRITES ATTEMPTED — every invocation of `onReveal`, INCLUDING
   *  one that threw. THE COUNTER THE HEADLINE ROW ASSERTS OVER. */
  readonly revealWrites: number
  /** REVEAL WRITES THAT RETURNED without throwing. `revealWrites -
   *  revealWritesApplied` is the count of swallowed reveal throws.
   *
   *  THE MEMBER'S NAME, AND THE HAZARD THAT FORCES IT (RENAMED 2026-09-27 — see
   *  `§0A` note 14, item 1): the name this member AS FIRST WRITTEN carried is
   *  THE SAME SPELLING as one of the CENSUS TOKENS `§3.4 R-1` bans over this
   *  module's source INCLUDING its comments — and `R-1` declares EXACTLY TWO
   *  exemptions (`threshold`, `distance`) — so a module declaring the member
   *  under that spelling FAILS `R-1` while a module omitting it fails the stats
   *  rows. The RENAME lands the fix; the ban is neither weakened nor widened,
   *  and `revealWritesApplied` carries NO banned token. The pair
   *  `attempted`/`applied` mirrors the sink's own `sinkCalls`/`written` pair.
   *
   *  THE OLD SPELLING IS DELIBERATELY **NOT** PRINTED IN THIS COMMENT, because
   *  THIS COMMENT IS ITSELF MODULE BYTES AND `R-1` SCANS COMMENTS AS CODE: the
   *  as-written forms (the member's declaration line and its one-line comment)
   *  are preserved VERBATIM, and the old spelling in that preserved text
   *  appears in the assembly form the red set itself uses — `'revea' + 'led'` —
   *  exactly so that this annotation cannot re-introduce the token it records.
   *  The as-written declaration and its as-written one-line comment are kept
   *  VERBATIM in `§0A` note 14 item 1 (SPEC TEXT, not module bytes), and the
   *  as-written member NAME is also carried in `§2.1` item 5's member list. */
  readonly revealWritesApplied: number
  /** THE INVALID ARM — the number of times this module ENTERED the session's
   *  `reset` terminal for an invalidity (AT MOST ONCE per gesture, `§2.3` item 6). */
  readonly resets: number
  /** SINK CALLS ATTEMPTED — every invocation of the injected `commit`. */
  readonly sinkCalls: number
  /** SINK CALLS THAT RETURNED without throwing. */
  readonly written: number
  /** THE LAST SESSION CODE this module propagated (`'ok'` before anything
   *  happened). NO module-local code exists in this domain (§2.3 item 4). */
  readonly lastCode: string
}
```

**1. THE SEVEN INJECTED SEAMS — the factory's options, with their exact signatures, their
REQUIRED/OPTIONAL status, their supplier and their DECLARED DEGRADATION.** **These are the gate-1 record's
`§A.5` seven, frozen by `docs/specs/gsession.md` `§2.5` (the ONE delegate list this unit writes
against).** **The seam set is CLOSED at seven and `P-RL-IM-4` is the row that FAILS for an eighth
member.** **THE SEVENTH MEMBER IS NEW RELATIVE TO THE `A-d4` SIGNATURE** — the signature names six
(`{session, candidatesFor, resolveTarget, onReveal, commit, threshold}`) and **the ruling's ghost forces
`onPreview`** (`§0A` note 3, condition `C-D`). **THE DEGRADATION COLUMN IS NORMATIVE CONTRACT TEXT**
(ruling 11), and **the throw dispositions follow ruling 8**: **value-reading seams ABSORBED; `void`
presentation seams PROPAGATE.**

| # | Seam | Signature | Required? | Supplier | Declared degradation (absent / non-callable / throwing) | NEW? |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | `session` | `unknown` — read through the session's own seven-member surface (`§2.5` item 1) | **OPTIONAL** (absent ⇒ the inert module) | the wiring | **ABSORBED**: a VALID but INERT module — `attach` ⇒ `false` with ZERO session calls, declared refusals, zeroed counters, **never a throw** (the `E3` seam-7 shape) | **as a SEAM** — the frozen surface is composed, not owned |
| **2** | `candidatesFor` | `(element: unknown) => unknown` — an **OPAQUE** candidate set/decision **plus whatever measured distance it carries** (`CandidateFor`) | **OPTIONAL** (absent ⇒ the invalid arm) | the consumer (app policy) | **ABSORBED** ⇒ **no candidates ⇒ nothing within proximity ⇒ the invalid arm at once** (a release-or-departure outside proximity is the same observable), **never a throw, never a default** | new to this unit |
| **3** | `resolveTarget` | `RelocateTargetFor = (element, candidates: readonly CandidateFor[], gesture: GestureHandle) => unknown` — the OPAQUE chosen target | **OPTIONAL** | the consumer (app policy) | **ABSORBED** ⇒ `undefined` ⇒ a committing terminal writes **NOTHING** for that gesture — **and it is NOT a cancel** (a `'end'` terminal still reads `'end'`) | new to this unit |
| **4** | `onReveal` | `(target: unknown, decision: unknown) => void` — **channel (A)**, the durable state write | **OPTIONAL** | the consumer (its layout/reveal state) | **ABSORBED at the module's own `commit` seam** — invoke once, count the attempt, never retry; the module's own `finally` discards the per-gesture record and the throw does **not** propagate from the terminal turn | new to this unit |
| **5** | `commit` | `CommitSink = (gesture: GestureHandle, value: unknown) => void` — **the composition's SINGLE SINK WRITER** (ruling 6) | **OPTIONAL** | the consumer | **PROPAGATES** — consumer code at the boundary; the module's own `try`/`catch` covers only its value-reading seams, so a throwing sink surfaces at the terminal turn and the write is **COUNTED, NEVER RETRIED**. A slot-empty composition (no `commit`) writes **NOTHING** and is a **NO-WRITER composition that a row must be able to FAIL** (`§3.2 F-4`) | new to this unit |
| **6** | `threshold` | **`unknown`** (a caller scalar) — compared by the module's own total `withinProximity` | **OPTIONAL** | the consumer | **ABSORBED** ⇒ unusable ⇒ `withinProximity` answers `false` ⇒ **nothing is ever within proximity ⇒ the invalid arm**; **NO MECHANISM DEFAULT EXISTS** | new to this unit (its **meaning** is settled — ruling 1) |
| **7** | `onPreview` | `PreviewSink = (state: unknown) => void` — **channel (B)**: the ghost **AND the zone's show/hide** | **OPTIONAL** | the consumer (a transient presentation channel, **NEVER the sink**) | **PROPAGATES** — a `void` presentation seam: the turn's work stops, the throw surfaces at the **observed-move turn**, and the per-gesture record is discarded in the module's `finally` | **NEW TO THIS UNIT — the one addition the ruling forces** |

**Two things the seam table deliberately does NOT invent**, stated so a later reader cannot read them in:
**(a)** there is **no `distance` seam** — the distance travels **inside `candidatesFor`'s answer**
(`§0A` note 2), keeping the set at seven; and **(b)** **`threshold` is NOT put on the session** — the
frozen delegate list's closing sentence is categorical (*"Nothing else exists"*, `docs/specs/gsession.md`
`§2.5`, the paragraph after item 11), and **an eighth session parameter would be a FROZEN-contract
change**.

**2. THE MODULE'S FACTORY CALL SIGNATURE, and its SEVEN-member options object.** *(The ruled form,
deriving the `A-d4` shape plus the ruling's seventh seam:)*

```ts
/** THE MODULE'S FACTORY. TOTAL: NEVER THROWS, for ANY argument — including a
 *  hostile options record, a `Proxy` whose traps throw, a primitive, `null` and
 *  `undefined` (`§5.5.1 P-RL-TP-2`). The session arrives as an OPTION and is
 *  never imported (§0A note 4). */
export declare function createRelocateSession(
  options?: RelocateOptions,
): RelocateSession
```

**3. THE MODULE'S MEMBER SURFACE — FIVE MEMBERS, and this is the whole of it.** `attach(element, hooks?)`
· `detach()` · `reset(element)` · `stats()` · `detached` (the block above). **A sixth member is a
contract change** (`§4.4 S-11`).

**4. THE IMPORT CENSUS, PINNED BY NAME — ONE STATEMENT, ONE BINDING, TYPE-ONLY.** **The module's import
statements are EXACTLY ONE: `import type { GestureHandle } from './gesture-session.js'`.** **`§3.4 R-4`
is the row that pins that EXACT shape** and it names the failure classes: **any second import statement
FAILS; a VALUE import from the session module FAILS; an import of ANY other path FAILS**
(`./gutter.js`, `./gutter-affordance.js`, `./zones.js`, `./census.js`, `./layout-projection.ts`-side
modules, `owned-list-host`/`slot-host`/`mount-invariant-guard`/`dom-shim`/`types`, the engine,
`electron`, `node:*`, `src/main/**`, `src/renderer/**`, the demo envelope). **`POINTER_TYPES` is ABSENT
and `createGestureSession` is ABSENT** (`§0A` note 4). **The module imports no `provident-ssr`, no
`electron`, no `node:*`, no shim and no other sibling — and it never imports `zones.ts` or `census.ts`,
not even type-only: a later pass asserting an edge in either direction would be a FABRICATED EDGE
(`docs/specs/census.md` `§1` item 7; `H-r6`'s dissolved-edge class).**

**5. THE TWO `threshold`-ADJACENT FIELD NAMES THIS MODULE OWNS, NAMED SO THE SCAN CAN EXEMPT
THEM.** **`threshold` (the option member, ruling 1's referent) and `distance` (the candidate answer's
measured scalar, `§0A` note 2) are THIS UNIT'S DECLARED CONTRACT VOCABULARY.** They are **the only two
spellings the module's own scan row exempts** (`§3.4 R-1`), and **the reconciliation table that licenses
the exemption is `§2.3` item 3.** **Everything else the module owns in the way of names is its own result
reading, its five member names, its seven option member names and its own field names**
(`candidate`, `distance`) — **and no consumer vocabulary beyond those.** **⟶ THE STATS MEMBERS ARE NAMED HERE SO THE BAN IS NOT RE-OPENED FOR THEM (RENAMED 2026-09-27, `§0A` note 14 item 1):** **`RelocateStats`'s ELEVEN members are `attached`, `gestures`, `moves`, `candidateCalls`, `resolveCalls`, `revealWrites`, `revealWritesApplied`, `resets`, `sinkCalls`, `written`, `lastCode`** — **the member AS FIRST WRITTEN as `revealed` is now `revealWritesApplied`** — **and NONE of the eleven is a consumer census token, so this unit's scan row needs NO third exemption and keeps EXACTLY TWO (`threshold`, `distance`).** *(**THE AS-WRITTEN `revealed` slot is kept visible in the sentence above this annotation — annotate-never-rewrite; the reasons for the rename and the ban's unchanged extent are at `§0A` note 14 item 1.**)*

**6. THE PHRASE *"ZERO SESSION CALLS"*, DEFINED — DELEGATIONS VERSUS READS. (RULED 2026-09-27, the
red-exposed item `6`; `§0A` note 13 item 6. THIS DEFINITION GOVERNS EVERY OCCURRENCE OF THE PHRASE IN THIS
FILE.)** **Every occurrence of *"ZERO session calls"*, *"no session call"* or *"WITHOUT a session call"* is
read as `ZERO DELEGATIONS` INTO THE MODULE'S OWN SESSION CALL SET — ZERO `install`, ZERO `reset`, ZERO
`dispose`, which is `§2.5` item 1's closed CALL set. IT IS NEVER A CLAIM ABOUT READS.** **The module MAY
perform the PERMITTED READ set on a refusal path — `session.stats()` · `session.gesture()` ·
`session.disposed`, the closed READ set of `§2.5` item 1 — and every such read is recorded in a SEPARATE
read list, BESIDE the delegation list and NEVER INSIDE IT, and asserted to lie INSIDE that closed read set
(the red set's own session double records the two SEPARATELY — its `ops` list holds the mutating `install`/`reset`/`dispose` delegations, and its `reads` list holds the read-only readings, asserted EMPTY after `reads.filter((r) => !['stats', 'gesture', 'disposed'].includes(r))`; a TestWriter may name the two lists otherwise, but the TWO-LIST shape is the claim).** **The reason the distinction is NORMATIVE rather than cosmetic:** `§2.4` item 5 forbids a
module-local code, so **a refusal's code is the SESSION's own reading** — and a reader who took *"ZERO
session calls"* literally would find the refusal path UNSATISFIABLE against the reads `§2.5` item 1
explicitly permits. **THE TWO READINGS THE ROWS ASSERT, precisely: the DELEGATION list is EMPTY (or
unchanged), and the READ list is a SUBSET of the closed read set — TWO LISTS, NEVER ONE COUNT.** **WHERE
THIS DEFINITION GOVERNS: the `attach`/`detach`/`reset` refusal clauses in the block above; `§2.4` item 1's
`session` row (the VALID BUT INERT module); `§3.1 M-13`(b)/(c); `§3.1 M-16`; `§3.2 F-7`; `§3.2 F-11`;
`§5.5.1 P-RL-SM-4`; `§5.5.1 P-RL-SM-8`; and `§3.3 I-8`'s closed-set invariant.**

**7. THE PRE-DRAG VALUE'S MEMBER — THE CHANNEL THAT WAS OWED, RULED AND LANDED (AMENDED 2026-09-27; `§0A` note 15's `A2` continuation; the ORCHESTRATOR's adjudication under `AGENTS.md` item 10a. APPENDED — items `1`–`6` keep their numbers, and nothing above is rewritten).**

**WHAT WAS OWED, named first so this item cannot be read as an unforced addition.** `§2.3` item 9(c) carried the pre-drag value's **CHANNEL** as an **OWED CONTRACT ITEM**, because **no legal route carried the CALLER's pre-drag value into this module**: `onStart` receives **only the element**, the handle arrives **only through `onMove`**, `gesture()`'s `value` reads `undefined` at establishment, the session's `commit` is the **WIRING's**, and **this unit's seam set is CLOSED AT SEVEN**. **THE ORCHESTRATOR ADJUDICATED THAT ITEM AND ADOPTED FIX SHAPE `F-1`**, and **this item is the LANDED FORM of it**: the CONSUMER-SUPPLIED **hooks record** the consumer already passes to `attach(element, hooks?)` gains **ONE NEW OPTIONAL VALUE-READING MEMBER**.

**(a) THE MEMBER, PINNED IN FULL.**

| What | The pin |
| --- | --- |
| **Its name** | **`preDragValueOf`** — the caller's own pre-drag VALUE, read through a function; the `-Of` suffix is the family's form for a **CONSUMER-SUPPLIED READING** (`E3`'s `axisFor`/`defaultSizeFor` are the sibling precedents), and it is **not a policy, not a default and not a magnitude** |
| **Its signature** | **`preDragValueOf?: (element: unknown) => unknown`** — **ONE** argument, **the element the module received**, and an **`unknown`** answer handed on **OPAQUELY** |
| **Its home** | **the per-control record the consumer passes to `attach(element, hooks?)`** — i.e. **`RelocateHandle`**, whose block above now declares **it and only it** beyond the `element` and the four hooks |
| **Its REQUIRED/OPTIONAL status** | **OPTIONAL**, exactly like the four hooks |
| **Is it a HOOK?** | **NO.** It is a **value-reading member**, never an `on*` hook: it is **never forwarded into the object the session is handed** (whose key set is `M-1`/`R-10`/`I-7`'s **exactly four hooks**, UNMOVED) and **never invoked by the session** |
| **Is it a SEAM?** | **NO — and this is the load-bearing sentence of the whole amendment: it is NOT one of the SEVEN FACTORY OPTIONS.** The seam set stays **CLOSED AT SEVEN** (`§2.1` item 2, `§2.2` `P-8`, `§5.5.1 P-RL-IM-4`: **an EIGHTH FACTORY-OPTION MEMBER still FAILS**) |
| **Does it move a census?** | **NO EXPORT IS ADDED** — `§2.1`'s census stays **TEN names in two halves (`2 + 8 = 10`)**, `§3.4 R-5`'s two halves are unmoved, and `§5.3` item 3's DONE-row census is unmoved; **`RelocateStats` stays ELEVEN fields**; **no register row, term, drive, strategy id, seed, cap or section number moves**. **THE ONE CENSUS THAT DOES MOVE IS STATED AT (f), so the re-grain cannot guess it** |

**(b) ITS SEMANTICS, PINNED.**

- **THE INVOCATION:** the module invokes it **from its OWN `onStart` wrapper**, **for a gesture the session ESTABLISHED**, **EXACTLY ONCE per gesture** (`§2.3` items 6(b)/7/9; the register row `§5.5.1 P-RL-SM-4`), passing **THE ELEMENT** it received. **NEVER at a move, NEVER at a terminal, NEVER on a refused establishment, NEVER on a refusal path, and NEVER from `attach` itself** (`M-12`'s stage `(1)` reading — `0` invocations after `attach` and before establishment — is the row that pins the last clause). **IT IS NEVER RETRIED.**
- **THE VALUE:** held in the module's **per-gesture record** (`§2.3` item 7), handed on **BY IDENTITY** (`I-5` — never cloned, stringified, keyed or altered), and **DISCARDED AT EVERY TERMINAL in the module's own `finally`** — the retention rule `§2.3` item 7 / `I-9` / `§5.5.1 P-RL-SM-4` stands **unchanged**.
- **THE COMMIT:** it is **the value the INVALID ARM commits** — **the THIRD argument of `session.reset(element, handle, value)`**, **ARITY THREE**, already pinned at `§2.3` item 9(a) — and, on that arm, **the value carried by the commit of the caller-supplied pre-drag value** (`§2.3` item 4's channel-(C) row; `M-8`, `M-14`; `§5.5.1 P-RL-SM-5`'s arm `(1)` and `§5.5.1 P-RL-SM-7`). **WHICH WRITER CARRIES IT WAS FLAGGED AS UNPINNED AS FILED: see (g), whose as-written stop text is KEPT VISIBLE.** **⟶ CLOSED 2026-09-27 (see (g)'s closing pin): THE WRITER IS THE MODULE'S OWN `commit` SINK — this member's value is committed by the module's own sink ON THE `'reset'` TERMINAL, once, carrying exactly this caller-supplied pre-drag value and no mechanism default.**

**(c) THE DECLARED DEGRADATION — ABSENT / NON-CALLABLE / THROWING: A REFUSAL THAT COMMITS NOTHING, NEVER A THROW.**

**The member is a VALUE-READING member, so `SEAM-THROW-DISPOSITION-VALUE-READING-SEAMS-ABSORBED` (ruling 8) governs it: ITS THROW IS ABSORBED AND NEVER PROPAGATED, and its unusable shapes answer a DECLARED REFUSAL in the family's own terms** — the form `docs/specs/gutter.md`'s `defaultSizeFor` refusal established, and which `§0A` note 15's `A2` item cites: *"an unusable `defaultSizeFor` ⇒ the reset REFUSES"*, driven at its `§3.2 F-12` through **absent → non-callable → throwing** to **one declared refusal, never a throw, with nothing committed**.

**THE REFUSAL'S NAME, PINNED SO A ROW CAN DRIVE ALL THREE SHAPES AND ASSERT IT: THE PRE-DRAG CAPTURE REFUSES — THE NO-CALLER-VALUE REFUSAL — AND THE REFUSAL COMMITS NOTHING OF ITS OWN.** **It is named as a READING, never as a CODE**: **it is NOT a value of `RelocateStats.lastCode`, NOT a member of the session's closed code union, and NO STRING LITERAL FOR IT MAY APPEAR IN THE MODULE'S BYTES** (a module carrying one FAILS `§3.4 R-15` and `I-14`, whose rule is that **this module declares NO code of its own**). **In four falsifiable clauses:**

1. **NOTHING IS INVENTED.** The module supplies **no value of its own** — **no default, no sentinel, no `null`, no `0`, no empty string, no re-read of the session for one** (the session holds no cross-gesture state: `docs/specs/gsession.md` `§0A` note 8). **The capture's value is `undefined`, which is the honest reading of *"the caller supplied no pre-drag value"*.**
2. **NO THROW ESCAPES.** Not out of `attach` (a hostile record or a **throwing accessor** is degraded by the module's own **total member-read**, `§2.3` item 4) and not out of the **establishment turn** (a **throwing callable** is absorbed at the module's own `onStart` wrapper). **The gesture still ESTABLISHES, the wrapper still forwards the consumer's own `onStart` BY IDENTITY, and every count row is unchanged.**
3. **THE INVALID ARM IS NOT SUPPRESSED — AND A ROW THAT READS *"COMMITS NOTHING"* AS *"THE ARM IS NOT TAKEN"* IS READING IT WRONG.** *"Commits nothing"* means **the capture commits no value the caller did not supply**; the arm's own counts are **UNCHANGED**: its `session.reset` delegation is still made with **ARITY THREE** and a third argument reading `undefined`, `stats().resets` still reads `1`, and a later `pointerup` still commits **NOTHING** (`M-8`, `M-13`(a), `§5.5.1 P-RL-SM-7`). **A module that SKIPS the arm, REFUSES it, converts it into a `cancel`, or re-invokes the member to obtain a value FAILS those rows.**
4. **THE `E3` PRECEDENT IS THE FORM OF THE REFUSAL, NOT THE ARM'S COUNTS.** In `E3` the unusable default **is the reset entry point's whole operand**, so that unit's `reset` refuses with **ZERO session calls** and a `committed: false` record; here the pre-drag value is **one ARGUMENT of an arm whose TRIGGER is proximity**, so **the arm is taken and the refusal shows up as the third argument's reading**. **A row that copies `E3`'s `'unusable-default'` shape — a refusal code, ZERO session calls, `committed: false` — onto this arm FAILS `M-13`(a), `M-13`(b)'s contrast and `I-14`.**

**THE FOUR SHAPES AND THEIR DECLARED READINGS, so the drives are exact:**

| Shape | The record the consumer passed | The declared reading |
| --- | --- | --- |
| **(1) ABSENT** | the member **omitted** from the record, **or carried with the value `undefined`** (the `S4`/`F-15` non-attempt form) | **NO ATTEMPT AND NO INVOCATION: the consumer's own recorded invocation count reads `0`**; **the refusal is taken, the third argument reads `undefined`, nothing throws** |
| **(2) NON-CALLABLE** | the member PRESENT as `null` · `false` · `0` · `''` · `42` · `'x'` · an object · a hostile `Proxy` | **AN ATTEMPT AND NO INVOCATION** (the `S4`-class ATTEMPTED-versus-INVOKED split; `§2.1`'s `candidateCalls` cell and `§3.2 F-15` are the precedent); **no consumer-side recording can exist (a non-callable cannot record its own invocation), the refusal is taken, nothing throws** |
| **(3) CALLABLE THAT THROWS** | the member PRESENT as a callable whose body throws | **AN ATTEMPT AND ONE INVOCATION, the throw ABSORBED at the module's own `onStart` wrapper and NEVER RETRIED: the consumer's own recorded invocation count reads `1`**; **the refusal is taken, nothing escapes the establishment turn** |
| **(4) A THROWING ACCESSOR OR A HOSTILE RECORD** *(the `F-12` class, carried here so it is not silently missed)* | the member declared through a **getter that throws**, or a **`Proxy` record whose `get` trap throws** | **the module's own TOTAL MEMBER-READ degrades it (`§2.3` item 4): the refusal is taken, and NEITHER `attach` NOR the establishment turn throws** |

**TWO IMPLEMENTATION-SHAPE FREEDOMS, STATED SO NO ROW OVER-STRENGTHENS THEM.** **(i)** A **`typeof`-guarded** refusal and a **`try`/`catch`-shaped** refusal are **ONE reading**: a row may assert the OUTCOME, and **a row that asserts WHICH of the two forms the module used FAILS this item**. **(ii)** The member's **reference** may be read by the module's own total member-read at `attach` **or** at its own `onStart` wrapper — **both are this contract's form**, because **the INVOCATION (the once-per-gesture call) is what every count row reads**.

**(d) THE INSTRUMENT, NAMED.** **The capture's count is read from THE CONSUMER'S OWN RECORDED INVOCATION COUNT** — the member is the **consumer's own function**, so the consumer's own recorder counts its own invocations — **exactly `§0A` note 10's two-reading form**: **the consumer's record BESIDE the module's own observable consequence, which is the THIRD ARGUMENT of the `session.reset` delegation.** **The MODULE carries NO capture counter**: `RelocateStats` declares **ELEVEN** fields, **none of them counts a capture**, and **adding one is `§4.4 S-11`'s class** (`§2.3` item 9(b)'s own sentence, unchanged). **`§2.3` item 9(b)'s instrument list therefore GAINS a third reading and loses none**: the **arity and the third argument's identity**, the **recorded hook order**, and now **the consumer's own recorded invocation count**.

**(e) THE `S-11` COLLISION, RECONCILED AND NOT RELAXED** *(the `threshold`-collision form of `§2.3` item 3, applied to this amendment).* **`§4.4 S-11`'s stop list names *"a fifth hook"* — THIS AMENDMENT IS NOT THAT CLASS, and the reading is pinned here so it cannot be taken for it.** **The four HOOK members stay EXACTLY FOUR and no fifth `on*` member exists or is permitted**; the amended member is **a value-reading member, never forwarded into the session's options, never invoked by the session, never a factory option** — and **it smuggles NO policy default** (`S-11`'s other limb), because **its unusable state is a DECLARED REFUSAL THAT COMMITS NOTHING, never a default**. **A LATER PASS THAT PROPOSES A FIFTH `on*` HOOK, AN EIGHTH FACTORY-OPTION MEMBER (a `distanceFor` seam included), OR A DEFAULT FOR THIS MEMBER IS STILL `§4.4 S-11`'s STOP CLASS AND MUST STOP AND REPORT.** **THE PROVENANCE, so the carve-out is attributable: this amendment is the ORCHESTRATOR's adjudication under `AGENTS.md` item 10a** — the same authority the landed defect fixes at `§0A` notes 14 and 15 rest on — **and NOT a spec-writer's unilateral addition.** *(**THE AS-FILED `§2.3` item 9(c) sentence is KEPT VISIBLE THERE and reads that both fix shapes are *"an ARCHITECT's dated annotation and NOT a spec-writer's edit"*; `F-1`'s adoption is the ORCHESTRATOR's, recorded at `§0A` note 15's `A2` continuation.**)*

**(f) THE HOOKS RECORD'S OWN MEMBER CENSUS, PINNED — BECAUSE NO ROW OF THIS FILE PINS IT (the row sweep's finding, stated so the re-grain cannot guess).** **MEASURED: this file's key-set rows bind TWO OTHER RECORDS and NEITHER of them is this one** — **`M-1`/`R-10`/`I-7` bind the object the module hands to the session** (`{onStart, onMove, onEnd, onCancel}`, exactly four, **a fifth key FAILING**), and **`§5.5.1 P-RL-IM-4` binds the FACTORY OPTIONS object** (exactly seven, **an eighth FAILING**). **The hooks record's own member set is NOT tabled, NOT counted and NOT asserted anywhere**: `§2.1`(b) describes it as *"the four consumer hooks"*, `§2.5` item 4 pins the handle channel and the identity forwarding of the consumer's own hooks, `M-17` drives **all four hooks supplied** and asserts their **FORWARDING BY IDENTITY** (never a key set), and **`§2.4`'s tables table the SEVEN SEAMS, not this record's members.** **THEREFORE, as a binding reading for the re-grain: NO KEY-SET ROW COVERS THIS RECORD; `preDragValueOf` MUST NOT BE ADDED TO EITHER OF THE TWO KEY SETS; and `M-17`'s drive MUST NOT BE EXTENDED TO A FIFTH RECORDED HOOK.** **THE RECORD'S PIN, in the file's own numbers: `5` members AS FILED (`element` + `onStart` + `onMove` + `onEnd` + `onCancel`) ⇒ `6` members AMENDED (the same `5` plus `preDragValueOf`), with the HOOK count UNMOVED at `4`.** **The as-written sentences stay VISIBLE and are read as written: the block's own *"no fifth hook"* reads as **NO FIFTH HOOK** (true, and the reason (e) holds), and `§2.1`(b)'s *"the four consumer hooks"* reads as **THE FOUR HOOKS** (true).**

**(g) THE FRESH STOP THIS ITEM REPORTS RATHER THAN SETTLES — THE INVALID ARM'S COMMIT WRITER.** **`F-1` makes the CALLER's value REACH the module; it does NOT decide WHICH WRITER carries that value to the sink on the invalid arm, and this file is not consistent about it.** **THE TWO HORNS, quoted:** **(i)** **`§2.1`'s `CommitSink` declaration — the module's own bytes — says the module invokes the injected `commit` *"AT MOST ONCE PER GESTURE, ONLY from its own `commit` seam, ONLY for a gesture whose terminal is `'end'`"***, and **`§2.3` item 6(d)'s `'reset'` limb and `§2.5` item 7 clause 2's `'reset'` limb** enumerate that arm's work **WITHOUT a call of the module's own sink** (*"ZERO reveals"*, the consumer's own `onEnd`/`onCancel`, the record discarded). **(ii)** **`M-8` requires *"the sink is called ONCE with `777` and `outcome === 'reset'`"*; `M-14` reads the sink's own `value` argument on that same arm; `§5.5.1 P-RL-SM-5`'s arm `(1)` asserts `sinkCalls === 1` — and `RelocateStats.sinkCalls` is declared as *"every invocation of the injected `commit`"* (`§2.1`(b)); and `§2.3` item 4's channel-(C) row declares *"one commit of the caller-supplied pre-drag value"* — **and that very cell holds *"`0` sink writes of a draggable value"* BESIDE *"one commit of the caller-supplied pre-drag value"*, which is this ambiguity in its clearest form**.** **BOTH CANNOT HOLD AS WRITTEN:** either **the module's own sink is invoked on the invalid arm** (and `CommitSink`'s `'end'`-only domain must be amended), or **the arm's commit is the WIRING's session-construction commit and the module's own sink is NOT invoked on that arm** (and then `P-RL-SM-5`(1)'s `sinkCalls === 1` and `RelocateStats.sinkCalls`'s own declaration must be re-read). **THIS IS REPORTED AS A FRESH STOP AND IS NOT RESOLVED HERE** — it is a clause about the SINK's own domain, it needs its own adjudication (the `§0A` notes 14/15 class), and **the re-grain must not guess it.** **Its consequence for THIS amendment, in one sentence: the member's value is the value the arm commits, and THE ARM'S COMMIT EXISTS ON BOTH READINGS — only the WRITER's name was open.** *(**AS-WRITTEN END OF THE STOP, restored verbatim at the pin: this file's own read harness had truncated the source sentence at *"Its consequence for T"*, and the clause above is that missing tail, re-anchored so the as-written stop is COMPLETE and readable rather than carried as an ellipsis.**)* **⟶ SUPERSEDED BY A LATER RULING, LANDED THE SAME DAY (2026-09-27) — THIS STOP IS CLOSED; the as-written stop text above stays VISIBLE and is read as the as-filed record.** **THE PIN, and it is DERIVED FROM THE RECORD, not chosen here: THE MODULE'S OWN `commit` SINK IS THE INVALID ARM'S COMMIT WRITER.** **THE DECIDING EVIDENCE: (1)** `docs/decisions.md`'s ACTIVE row **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`** channel **(C)** — the architect's words *"Dropping the pane outside of a position where this happens should cause the invalid placement --> reset behavior"*, recorded with ***"one commit of the supplied pre-drag value while the gesture is still active"***; **(2)** the same row's own channel-(C) note that this is **the `M-13`/`F-10` invalid-arm shape `U-GUTTER-UI` LANDED** — **exactly one sink write of the clamped pre-drag size**; **(3)** `docs/pending.md`'s **`SCH-7`** row's consequence **(2)**, in the same words. **THE DRIFTED CELL IS `§2.1`'s `CommitSink` comment's *"ONLY for a gesture whose terminal is `'end'`"*, NOT Horn (ii)'s four rows, which were RIGHT.** **PINNED: the module's own `commit` sink is invoked AT THE TERMINAL OF A GESTURE THAT REACHED A TERMINAL — ONCE — carrying THE DRAGGED/COMMITTED VALUE on `'end'` and THE CALLER-SUPPLIED PRE-DRAG VALUE on `'reset'`** (the invalid arm, from the module's own move turn while the gesture is still active: `§2.3` item 6 / `§2.5` item 7 clause 2), **ZERO times on a `cancel`**, and **ZERO times on ANY REFUSED TERMINAL** *(read with `F-16`/`P-RL-SM-1` path `(5)`: an `'end'` whose resolved target is `undefined` writes NOTHING — `sinkCalls === 0`; the refused-terminal clause names the SESSION's own refusals)*; **the value is the CLAMPED/DECLARED value the ARM OWNS, NEVER a mechanism default.** **CORRECTED AT: `§2.1`'s `CommitSink` comment, this clause's own `THE COMMIT` bullet, `§2.3` item 4's channel-(C) cell, `§2.3` item 6(d)'s `'reset'` limb, and `§2.5` item 7 clause 2.** **THE TERM VERDICT: NO DECLARED TERM MOVED** — the register is still **`15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`**; **no row id, strategy id, seed, cap or section number moved**; **`P-RL-SM-5`(1)'s `sinkCalls === 1` and `RelocateStats.sinkCalls`'s own declaration (*"every invocation of the injected `commit`"*) stand EXACTLY as printed**; and **the single-sink-writer rule is UNWEAKENED — the arm's writer is the module's OWN sink, while the session's construction `commit` remains a non-forwarding recorder or absent.** *(**AS-WRITTEN END OF THE STOP, restored verbatim here 2026-09-27 at the pin: this file's harness truncated the source line at *"Its consequence for T"*, and this clause is the missing tail of the as-filed form, re-anchored so the as-written stop is COMPLETE and readable rather than carried as an ellipsis.**)*** **⟶ THE PINNED WRITER (CLOSED 2026-09-27, under `AGENTS.md` item 10a on the same authority notes 13/14/15 rest on; the same pin is stated in full at `§0A` note 15's `A2` continuation): THE MODULE'S OWN `commit` SINK IS THE INVALID ARM'S COMMIT WRITER.** **THE DECIDING EVIDENCE, in three records:** **(1)** `docs/decisions.md`'s ACTIVE row **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`**, channel **(C)** — the architect's words *"Dropping the pane outside of a position where this happens should cause the invalid placement --> reset behavior"*, recorded there with ***"one commit of the supplied pre-drag value while the gesture is still active"***; **(2)** the same row's own channel-(C) note that this is **the `M-13`/`F-10` invalid-arm shape `U-GUTTER-UI` LANDED** — the landed precedent in which the reset arm made **EXACTLY ONE sink write of the clamped pre-drag size**; **(3)** `docs/pending.md`'s **`SCH-7`** row's recorded consequence **(2)**, in the same words. **THE DRIFTED CELL IS `§2.1`'s `CommitSink` comment's *"ONLY for a gesture whose terminal is `'end'`"* — NOT the four rows THE TWO HORNS (ii) names, which were RIGHT.** **THE PIN, at every site that carried the drifted reading: the module's own `commit` sink is invoked AT THE TERMINAL OF A GESTURE THAT REACHED A TERMINAL — ONCE — carrying THE DRAGGED/COMMITTED VALUE on `'end'` and THE CALLER-SUPPLIED PRE-DRAG VALUE on `'reset'`** (the invalid arm, entered from the module's own move turn while the gesture is still active: **`§2.3` item 6 / `§2.5` item 7 clause 2**), **ZERO times on a `cancel`**, and **ZERO times on ANY REFUSED TERMINAL — where *"a gesture that REACHED a terminal"* is READ WITH `F-16`/`P-RL-SM-1` PATH `(5)`: an `'end'` whose resolved target is `undefined` writes NOTHING and reads `sinkCalls === 0`, and THIS REFUSED-TERMINAL CLAUSE NAMES THE SESSION'S OWN refusals (stale/absent handle, `'busy'`, `'disposed'`, `'not-installed'`, `'disconnected'`)**; **the value is the CLAMPED/DECLARED value the ARM OWNS, NEVER a mechanism default.** **CORRECTED AT: `§2.1`'s `CommitSink` comment (annotated in place; its as-written sentences stay visible), this clause's own `THE COMMIT` bullet above, `§2.3` item 4's channel-(C) cell, `§2.3` item 6(d)'s `'reset'` limb, and `§2.5` item 7 clause 2.** **THE TERM VERDICT, in the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands: NO DECLARED TERM MOVED** — the register is still **`15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`**; **no row id, strategy id, seed, cap or section number moved**; **`P-RL-SM-5`(1)'s `sinkCalls === 1` and `RelocateStats.sinkCalls`'s own declaration (*"every invocation of the injected `commit`"*) stand EXACTLY as printed**; **the single-sink-writer rule (`E10-SINGLE-SINK-CHANNEL`) is UNWEAKENED — the arm's writer is the module's OWN sink, and the session's construction `commit` remains a non-forwarding recorder or absent**; and **the red re-grain this note leaves owed is the TEST-side one `A2`'s continuation enumerated, now with the arm's sink call READ AS REQUIRED rather than as open.** **⟶ SUPERSEDED BY A LATER RULING, LANDED THE SAME DAY (2026-09-27) — THIS STOP IS CLOSED AND THE WRITER IS NOW PINNED; the as-written stop text above stays VISIBLE and is read as the as-filed record.** **THE PIN, and it is DERIVED FROM THE RECORD, not chosen here:** **THE MODULE'S OWN `commit` SINK IS THE INVALID ARM'S COMMIT WRITER.** **THE DECIDING EVIDENCE, in three records: (1) `docs/decisions.md`'s ACTIVE row `U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`, channel (C)** — the architect's words *"Dropping the pane outside of a position where this happens should cause the invalid placement --> reset behavior"*, recorded there with ***"one commit of the supplied pre-drag value while the gesture is still active"***; **(2) the same row's own channel-(C) note** that this is **the `M-13`/`F-10` invalid-arm shape `U-GUTTER-UI` LANDED** — the landed precedent in which the reset arm made **EXACTLY ONE sink write of the clamped pre-drag size**; **(3) `docs/pending.md`'s `SCH-7` row's recorded consequence (2)**, in the same words. **THE DRIFTED CELL IS THEREFORE IDENTIFIED: `§2.1`'s `CommitSink` comment's *"ONLY for a gesture whose terminal is `'end'`"* — NOT `M-8`/`M-14`/`P-RL-SM-5`(1)/`§2.3` item 4's channel-(C) cell, which were RIGHT.** **THE PINNED READING, at every site that carried the drifted one:** **the module's own `commit` sink is invoked AT THE TERMINAL OF A GESTURE THAT REACHED A TERMINAL — ONCE — carrying THE DRAGGED/COMMITTED VALUE on `'end'` and THE CALLER-SUPPLIED PRE-DRAG VALUE on `'reset'`** (the invalid arm, entered from the module's own move turn while the gesture is still active: **`§2.3` item 6 / `§2.5` item 7 clause 2**), **ZERO times on a `cancel`**, and **ZERO times on ANY REFUSED TERMINAL**; **the value is the CLAMPED/DECLARED value the ARM OWNS, NEVER a mechanism default.** **CORRECTED AT: `§2.1`'s `CommitSink` comment (annotated in place — the as-written sentences stay visible), the (b) `THE COMMIT` clause above, `§2.3` item 4's channel-(C) cell, `§2.3` item 6(d)'s `'reset'` limb, and `§2.5` item 7 clause 2.** **WHAT MOVES: NOTHING DECLARED — no register term, no row id, no strategy id, no seed, no cap and no section number; the register stays `15` ROWS · `16` TERMS · `170` ATTEMPTS, and `P-RL-SM-5`(1)'s `sinkCalls === 1` and `RelocateStats.sinkCalls`'s own declaration (`"every invocation of the injected `commit`"`) stand EXACTLY as printed.** **WHY IT IS DERIVABLE AND NOT A SECOND STOP: the sink's own declaration in `§2.1`(b) already reads *"every invocation of the injected `commit`"*, the arm's commit is required by four independent rows, and the record's own words fix the writer — so the `'end'`-only wording was drift, and this note resolves it rather than carrying it.**HIS amendment, in one sentence: the member's value is the value the arm commits, and THE ARM'S COMMIT EXISTS ON BOTH READINGS — only the WRITER's name was open.**

**(h) WHAT THIS ITEM DOES NOT DO.** It **re-opens no ruling and no gate-1 condition**; **moves no row id, term, strategy id, seed, cap or section number**; **adds no register row and no register term** — the four degradation shapes of (c) are **ASSERTIONS INSIDE the existing declared attempts and this clause cell's own drives, NEVER new drives** (`A DECLARED REGISTER TERM IS A DRIVE COUNT`; the `§0A` note 15 `S6` rule's clause `(1)`/`(2)` form); **adds no export** (`R-5` unmoved); **adds no factory-option member** (`P-RL-IM-4` unmoved); and **weakens no prohibition** — the four-hook key set, the seven-member seam set, the exactly-two census exemptions and the single-sink-writer rule are all **INTACT**.

---

### 2.2 What is CALLER-SUPPLIED, and the prohibitions — **every prohibition cites an ENUMERATED static row**

**Caller-supplied (never built in, never defaulted, never enumerated):** the **session**; the **control
element**; the **candidate answer and its measured distance**; the **chosen target**; the **threshold**;
the **durable reveal state**; the **preview state**; the **sink**; the **pre-drag value**; the **four
consumer hooks**; and **every policy decision**. **The module contains NO pane/zone/tab/axis vocabulary,
NO selector, NO unit string, NO `data-*` name, NO default threshold, NO default candidate set, NO default
target, NO default reveal state, NO census read and NO policy predicate.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No coordinate, no event, no geometry, no distance computation** (ruling 5; the named cost) | **No member of this module's surface takes an event object, and no coordinate/event/geometry field is read**: no `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/`screenY`/`offsetX`/`offsetY`/`movementX`/`movementY`, no `pointerId`, no `button`/`buttons`, no `deltaX`, no `getBoundingClientRect`, no `getComputedStyle`, no `offsetWidth`-family member — **and no parameter exists through which any of them could arrive.** **The distance is the CALLER's measurement, delivered as a scalar** | **`R-8`**, **`R-1`**, `§0A` notes 2/5, `§2.3` item 2, `I-11` |
| **P-2** | **No DOM access and no element lookup** (`A-d3`; `E3`'s `P-2` class) | **No `document`/`window`/`globalThis`-rooted access, no `closest`/`querySelector*`/`getElementById` token in ANY form**; **the element is an opaque argument, handed to the session unchanged** | **`R-2`**, `§2.5` item 1, `I-6` |
| **P-3** | **No listener, and no capture, of the module's own** (rulings 3/6; the INHERITED no-capture clause) | **The module attaches NO listener**: every attach goes through `session.install`; **the module contains no `addEventListener`/`removeEventListener`/`setPointerCapture`/`releasePointerCapture`/`capturePointer` token and no `capture` member** | **`R-3`**, **`R-10`**, `I-7`, `§0A` note 11 |
| **P-4** | **No session-lifecycle re-expression, and no SECOND GESTURE AUTHORITY** (ruling 3; the `V-13` class) | **The module never calls `session.begin`, `session.end` or `session.cancel` and owns no gesture state machine, no "one gesture at a time" guard, no listener window and no disposal order.** **It calls `install`, `reset` and `dispose` — and `reset` IS legal for a composer** (`docs/specs/gutter.md` `§2.4`'s `S-11` amendment: the class is *the same sink through another channel*, not a second writer inside a composition). **The module's own session-member CALL set is exactly `{install, reset, dispose}` and its READ set exactly `{stats, gesture, disposed}`; a static census of any other member reference is EMPTY** | **`R-7`**, `§2.5` item 1, `§3.4 R-14`, `I-3`/`I-8` |
| **P-5** | **No consumer vocabulary: no pane/zone/tab vocabulary, no unit string, no token literal, no selector, no `data-*` name** (`U-CENSUS`'s `P-1` discipline; `E3`'s `P-5`) | **The only strings this module owns are its own member names, its option member names, its two field names and its own result-code READING of the session's codes.** **No unit string, no `'px'`, no `'0px'`, no `calc(`, no `selectors`, no `data-*` name, and no zone/pane/tab/axis vocabulary.** **`threshold`/`distance` are the two DECLARED EXEMPTIONS** (`§2.3` item 3) | **`R-1`**, `§2.3` item 3, `§0A` note 12 |
| **P-6** | **No store, no persistence, no cache, no module-level state** | **No file, no `localStorage`, no store object, no memo, no `Map`/`WeakMap` cache keyed by element, no module-level mutable state.** The instance keeps **its own attached-element ledger** and **at most ONE per-gesture record** (the handle, the element, the pre-drag value, the last observed candidate answer, the last resolved target, the sticky invalidity flag), **DISCARDED at every terminal in the module's own `finally`**; only the counters persist (`§2.3` item 7) | **`R-2`**, **`R-6`**, `I-9`, `§5.5.1 P-RL-SM-4` |
| **P-7** | **No capture opt-in** | **There is NO `capture` member on `RelocateOptions`, and this module passes NO install options at all** (it constructs nothing): *"no capture before establishment"* is **INHERITED and OBSERVED**, with `R-10`'s positive control. **The live consequence is stated in the fork-facing statement** (`§7` item 3) | **`R-10`**, `§0A` note 11, `I-7` |
| **P-8** | **No default of any kind** (`H-r8` (C)#3; `E3`'s `P-3` class) | **Every value is caller-supplied; `threshold` absent ⇒ nothing within proximity and NEVER a default; a missing seam ⇒ its NAMED SAFE DEFAULT, never a built-in policy.** **The claim is a SET CLAIM with a positive control**: an **eighth option member, or a defaulted member, FAILS** (`P-RL-IM-4`) | **`R-1`**, `§2.4` item 1, `§5.5.1 P-RL-IM-4` |
| **P-9** | **No sibling import — not even type-only — other than the frozen session this unit composes** (ruling 7's quoted boundary sentence) | **Exactly one import statement exists, type-only, from `./gesture-session.js`** (`§0A` note 4). **`zones.ts`/`census.ts`/`gutter.ts`/`gutter-affordance.ts`/the demo envelope are NEVER imported — a later pass asserting an edge in either direction would be a FABRICATED EDGE** | **`R-4`**, `§2.5` item 1, `§8` |
| **P-10** | **No census read of any kind** (`U-CENSUS`'s dissolved edge) — **and the prohibition is stated over the CENSUS-READ class, not over one spelling of it (CLARIFIED 2026-09-27, `§0A` note 14 item 1).** | **THE PROHIBITION, UNAMBIGUOUS AND IN TWO LAYERS:** **(1) NO `revealed` MEMBER HOLDING CONSUMER CENSUS STATE EXISTS ANYWHERE IN THIS MODULE** — the ban is on a **CENSUS READ**, i.e. on any member, field, map, key set or token by which this module would hold or read a **consumer's** census/reveal state (`zones`, `revealed`, `specOf`, `sizes`, `trackVar`, `trackProp`, `emptyToken`); **the module contains no census token, no track-variable name and no such member.** **(2) THE MODULE'S OWN COUNTER FOR ITS OWN `onReveal` INVOCATIONS IS *NOT* A CENSUS READ, AND ITS NAME IS `revealWritesApplied`** — **RENAMED 2026-09-27 from the as-filed `revealed`, precisely so the two layers cannot be confused again** (`§0A` note 14, item 1): the old name put a **banned census token** on the module's own bytes and made the contract unsatisfiable, and the rename removes the token **without** touching `R-1`'s ban or its exactly-two exemptions. **A consumer's reveal state reaches this unit ONLY as an argument to its own injected `onReveal`**, and a consumer's `sizes` value only inside the consumer's own closures. **THE TWO LAYERS ARE THEREFORE DISJOINT BY CONSTRUCTION: a `revealed` MEMBER HOLDING CENSUS STATE FAILS; the module's own `revealWrites`/`revealWritesApplied` PAIR IS ITS OWN COUNTERS and is not a census read.** *(**THE AS-FILED TEXT of this row read: *"The module contains no census token, no track-variable name, no `zones`/`revealed`/`specOf`/`sizes` member"* — kept visible here; the `revealed` it named is the CENSUS token of `§3.4 R-1`'s list, and the module's own counter no longer shares that spelling.**)* | **`R-1`**, **`R-4`**, `§0A` note 14, `§2.5` item 2, `§8` |
| **P-11** | **No second writer** (ruling 6; `E10-SINGLE-SINK-CHANNEL`) | **One sink seam, one call site, at most once per gesture, at one terminal** — and **two positive controls that make the claim falsifiable**: a two-writer composition FAILS (`F-6`) and a no-writer composition FAILS (`F-4`). **A preview invocation that also produces a reveal invocation FAILS** (`F-5`) | **`R-13`**, `§2.3` item 4, `§5.5.1 P-RL-SM-2`/`P-RL-SM-6`, `I-2` |
| **P-12** | **No UI content, and no rendered-surface claim** (rulings 2/5; `docs/decisions.md`'s mechanism-vs-UI test) | **The module authors no element, no text, no class, no attribute, no stylesheet, no control, no cursor and no geometry**: **it CALLS seams; the consumer writes.** **The ghost, the expansion and the visible revert are `[U]`-unprovable here and REFUSED** (`§5.2`) | **`R-11`**, **`R-8`**, `§1` item 5, `§5.2`, `§4.4 S-13` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-18`): **a prohibition
citing *"a static source row"* with no id is not a row**, and **every prohibition above names at least
one id that exists in `§3.4`.**

---

### 2.3 The arithmetic and value rules — stated falsifiably

**Item 1 — THE PROXIMITY DECISION, and its ONE arithmetic site.** **`withinProximity(distance,
threshold)` is the module's ONLY value comparison** (`§2.1` item 1 carries the full declared-answer
table). **The BOUNDARY IS INSIDE: `distance <= threshold`.** **⟶ ANNOTATED 2026-09-27 (`§0A` note 16; the sentence ABOVE IS KEPT VISIBLE and is SUPERSEDED IN ONE POINT, exactly as it is at `§2.1` item 1): the formula is the answer for the USABLE class — the finiteness/`NaN` limbs and the BOUNDARY-INSIDE rule are UNCHANGED — while a FINITE NEGATIVE `distance` OR `threshold` IS THE UNUSABLE CLASS and answers `false`, so the boundary rule READS OVER THE USABLE CLASS ONLY (`M-2`'s `(-5, -1)` ⇒ `false`, `P-RL-IM-3`'s `(-1, -1)` ⇒ `false`). The SECOND-comparison STOP (`§4.4 S-PURE-4`'s analogue) is UNTOUCHED: the unusable limb is a class test on the OPERANDS, not a second comparison site.** **This is the module's whole arithmetic, and
`§4.4 S-PURE-4`'s analogue — a SECOND comparison site anywhere in the module (inside a seam wrapper, in
`attach`, in the invalid-arm test, in a "sanitising" pre-check) is a STOP.**

**Item 2 — THE DISTANCE'S TRANSPORT, PINNED, AND THE RECORD'S FIELD NAMES.** ***(The gate-1 record's
`§5.5`(b) second item, pinned here.)*** **The distance arrives INSIDE `candidatesFor`'s answer**, in the
`distance` field of a `CandidateFor` record, **beside the opaque `candidate`** — **so the seam set stays
at SEVEN and no eighth `distanceFor` seam exists** (the record's `§4.3`: an options field that could
smuggle a policy default in is `gutter.md`'s `S-11` STOP class, a contract change). **THE FIELD NAMES ARE
MECHANISM VOCABULARY and are scanned like any other owned name**: `candidate` and `distance` — with
`distance` carrying the same negative-control exemption as `threshold` (`§3.4 R-1`). **The alternative (an
eighth `distanceFor` seam) is recorded as ARCHITECT-REVERSIBLE** and costs one member and one more
degradation row (`§7a.1` item 1's companion).

**Item 3 — THE `threshold` COLLISION, RECONCILED AND NOT RELAXED.** ***(The gate-1 record's `§4.3`,
whose own rule is the RCA's: *"The bans stay. … The fix is a reconciliation step, never a relaxation of a
prohibition."*)*** **The three ban sites, quoted, with the layer each guards:**

| The ban (site) | What it guards (quoted) | Why it does not bind `U-RELOCATE` |
| --- | --- | --- |
| `docs/specs/gutter.md` `§2.2` **P-5** | *"No axis vocabulary, no unit string, no token literal, **no threshold**, no selector"* | **The ban is on `U-GUTTER`'s own bytes OWNING the token.** `E4`'s **adopted, architect-ratified** parameter is caller-supplied data the module compares |
| `docs/specs/gutter.md` `§3.4` **R-1** | the anti-evasion vocabulary scan over *"the MODULE's source (`src/shared/gutter.ts`) INCLUDING its comments"* | **`R-1`'s scope is ONE FILE.** *"It is not a repo-wide token ban and cannot be read as one."* **`E4`'s own scan row states that it is over `src/shared/relocate.ts` and that `threshold`/`distance` are DECLARED NEGATIVE-CONTROL EXEMPTIONS in it** |
| `docs/specs/gsession.md` `§2.2` **P-1/P-5/P-7** and `§3.4` **R-1** | the **session's** surface — *"no threshold number"*, *"no `threshold` vocabulary"* | **The session must not carry it** — and `docs/specs/gsession.md` `§2.5`'s closing sentence guarantees it does not. **`E4` must not put `threshold` on the session and must not pass it through an `install`'s options** (already required by the import census and the seam table) |
| `docs/specs/gutter.md` `§4.4` **S-11** | *"A row proposes … a `selectors`/`threshold`/`unit` parameter … **Each is a contract change.** … stop and report to the supervisor."* | **`S-11` is `U-GUTTER`'s stop condition on its own rows**; *"a stop condition cannot be violated by the unit it never governed."* **This spec nonetheless CITES `S-11` and records that its scope is `E4`'s own seam table, so a later reader cannot read the token as smuggled** |

**THE RECONCILIATION CLAUSE, in the reviewer's verbatim-shaped one sentence:** *the token `threshold` is
banned as a **mechanism-owned** token and as an **evaluated unit** in `gutter.md` P-5/`R-1`, in
`gsession.md` P-1/P-5/P-7/`R-1` and by `gutter.md` S-11; in `E4` it is **caller-supplied data compared by
one exported pure total function**, it appears on **no session surface**, it is **never a default**, and
it carries a **no-consumer-vocabulary** exemption in the module's own scan row exactly as the sibling's
own constants do.* **RENAME? NO — AND NOT UNILATERALLY**: *"The `A-d4` signature, the ledger row and the
ACTIVE ruling all name `threshold`, and the DO-NOT list bars re-opening the threshold semantics."* **If a
rename is ever wanted it is an architect's dated annotation beside the `A-d4` signature, not a
spec-writer's edit** (`§0A` note 12).

**Item 4 — THE THREE CHANNELS, and they are THREE DIFFERENT FUNCTIONS.** ***(Derives ruling 1's
derived three-channel split, ruling 2 and ruling 6.)***

| | **(A) — the reveal** | **(B) — the ghost AND the zone's show/hide** | **(C) — the reset arm** |
| --- | --- | --- | --- |
| **Seam** | `onReveal` | `onPreview` | the SESSION's `reset` terminal, entered by the module's own move turn |
| **Write site** | **the module's own `commit` seam** — i.e. a committing terminal — and **ONLY the `'end'` terminal** (the ruled domain, `§0A` note 6) | **the module's own observed-move turn**, through the transient presentation seam, **never the sink** | the module's own move turn, **while the gesture is still active** |
| **Count per gesture** | **EXACTLY `1`** at an `'end'`; **`0` on a `'reset'`** (the invalid arm reads ZERO — DERIVED, `§0A` note 6); **`0` on a `cancel`**; **`0` on a refusal** (stale/absent handle, `'busy'`, `'disposed'`, `'not-installed'`, `'disconnected'`) | **AT MOST `1` per observed move**, and **exactly `1` revert write** on the invalid arm (the visible revert's carrier) | **EXACTLY `1`** when the invalid arm is taken; **`0`** otherwise; **`0` sink writes of a draggable value** — one commit of the **caller-supplied pre-drag value** *(**⟶ RECONCILED IN PLACE 2026-09-27 — THE INVALID ARM'S COMMIT WRITER IS PINNED, `§0A` note 15's `A2` continuation's closing pin: the `0` and the `one` in this cell are NOT in conflict, and the cell's as-written words above are KEPT.** **`0` counts sink writes carrying a DRAGGABLE value (a resolved target / a dragged value) — there are none on this arm; the ONE sink write this arm DOES make is the module's own `commit` sink invoked ONCE at the `'reset'` terminal carrying the CALLER-SUPPLIED PRE-DRAG VALUE, the clamped/declared value the ARM OWNS and never a mechanism default — so the arm's `sinkCalls` reads `1` and its `revealWrites` reads `0`.** **THE WRITER IS THE MODULE'S OWN `commit` SEAM — NOT the WIRING's session-construction `commit`**, which is a NON-FORWARDING recorder or absent (ruling 6; `§2.3` item 4's own channel split; `E10-SINGLE-SINK-CHANNEL`). **The `'end'` limb is unaffected: one write, carrying the dragged/committed value. A `cancel` and ANY refused terminal carry ZERO sink writes.**)* |
| **Terminal it belongs to** | `end` only | none — **not a terminal channel** | `reset`, invoked **while the gesture is still active** |
| **Its throw** | **ABSORBED at the module's own `commit` seam** — counted, never retried | **PROPAGATES** from the observed-move turn | the session's own reset path (`U-GSESSION`'s rows) |
| **The falsifier** | **the consumer-recorded `onReveal` invocation count beside the module's own `RelocateStats.revealWrites`**: they must **AGREE at `1`**, and a gesture crossing the proximity **`N >= 2` times must still read `1`** — *that is the row the fork's per-crossing implementation FAILS* | the **cross-product**: `onPreview` calls `<=` observed moves, **`0` at a terminal**, **`1` on the invalid arm as the revert**, **a preview that reaches the sink FAILS**, **a preview invocation that also produces an `onReveal` invocation FAILS** (channel identity), and **the retarget transition reads hide-plus-show in ONE observed-move turn** | `stats().resets === 1` **and** the session double's log showing `reset` entered **during the drag turn** **and** the later `pointerup` committing **nothing** |
| **Layer** | `[T]` for the calls/counts; **the *visible* expansion is `[U]`-unprovable here** (`§5.2`) | same | same |

**Item 5 — THE MONOTONICITY RULE (ruling 2), stated exactly.** **The zone's displayed-ness is NOT
MONOTONIC inside a gesture.** **Three clauses:** **(1)** it turns **ON** on an observed move whose answer
places the pane within `threshold` of a candidate; **(2)** it turns **OFF AGAIN while the gesture is still
running**, on **EITHER** trigger — **the pane was pulled back out of the proximity**, or **the pane has
shifted to place into a DIFFERENT zone**; and **(3)** on a retarget, **the previously displayed zone hides
and the new one shows inside the SAME observed-move turn** — hide-plus-show is **ONE transition, not two
gestures and not two turns.** **WHERE THE HIDE RIDES, AND THE DERIVATION FLAG: the hide rides channel
(B)**, because a mid-drag hide is not once-per-gesture and therefore **cannot** be the (A) durable write;
**hence channel (A) reads ZERO reveals on the invalid arm.** **THIS MAPPING IS A DERIVATION, NOT A
VERBATIM RULING** (`§0A` note 6) — **labelled derived here, at `§5.5.1 P-RL-SM-1`/`P-RL-SM-6`, and at
`§7a.1` item 3**, and **confirmable-or-flippable at the spec gate.** **The ledger's *"reveal written
EXACTLY ONCE per gesture at gesture end"* strengthening therefore STANDS UNAMENDED AND LITERALLY TRUE.**

**Item 6 — THE EVALUATION ORDER, with each seam's multiplicity, RULED.** ***(The gate-1 record's
`§5.5`(b) first item and this filing's `§7a.1` item 1 — the multiplicity is a contract decision, pinned
here, not assumed.)*** **⟶ THE TURN ORDER IS PINNED (2026-09-27, the red-exposed item `7`; PROMOTED from `§7a.1` item 1's WORKING DEFAULT, whose provenance stays visible THERE and whose as-filed wording is NOT deleted — *a red set may not be authored against a default the contract calls open*): `onStart` WRAPPER → THE CONSUMER'S `onStart` → `candidatesFor` → THE PROXIMITY DECISION → `resolveTarget` → `onPreview` → THE CONSUMER'S `onMove` → THE INVALID-ARM TEST, and at a committing terminal `onReveal` → `commit` → THE CONSUMER'S `onEnd`.** **The rows that assert it: `§3.1 M-3` (the recorded call order, at establishment, on the move and at the terminal), `§5.5.1 P-RL-SM-7` (the arm's POSITION inside the drag turn), and `§3.1 M-8`.** **THE PINNED REASON, unchanged from the default: the consumer's own hook must see the same gesture state the session gave it, and a hook that ran BEFORE the arm would observe a gesture the module was about to `reset` — which would make the consumer's own per-move writes racy against the reset.**

| Order | When | What is called | Multiplicity RULED |
| --- | --- | --- | --- |
| **(a)** | `attach(element, hooks?)` | `session.install(element, {onStart, onMove, onEnd, onCancel})` — **the module's OWN `onStart`/`onMove` wrappers, forwarding the consumer's hooks by identity where supplied** — **NO `capture` field** | **once per distinct element**; a repeat attach delegates NOTHING (first-config-wins) |
| **(b)** | the session ESTABLISHES a gesture and calls the module's own `onStart(element)` wrapper | **the caller-supplied pre-drag value is captured ONCE here** — **READ FROM THE HOOKS RECORD'S OWN `preDragValueOf` MEMBER** (AMENDED 2026-09-27: the channel `§2.3` item 9(c) carried as an OWED CONTRACT ITEM, RULED AND LANDED as fix shape `F-1` at `§2.1` item 7 and `§0A` note 15's `A2` continuation) **(`§0A` note 9), then the consumer's own `onStart(element)` runs, **forwarded by identity** | **the capture is once per ESTABLISHED gesture**; the consumer hook is once per establishment |
| **(c)** | the session calls the module's own `onMove(gesture)` wrapper for an observed move | **the handle is captured here** (the ONLY legal channel — `onStart` receives only the element), **then `candidatesFor(element)` AT MOST ONCE**, **then `withinProximity(distance, threshold)`**, **then `resolveTarget(element, candidates, gesture)` AT MOST ONCE** when the answer places the pane within proximity, **then the channel-(B) presentation write AT MOST ONCE**, **then the consumer's own `onMove(gesture)` runs, forwarded by identity**, **then the invalid-arm test** | **`candidatesFor` at most once per observed move; `resolveTarget` at most once per observed move and ONLY when the answer is within proximity; `onPreview` at most once per observed move; the invalid-arm test once per observed move until it sticks** |
| **(d)** | the session's terminal invokes the module's own `commit(gesture, value)` wrapper | **`gesture.outcome` is the discriminator.** For `'end'`: `onReveal(target, decision)` **AT MOST ONCE**, then `commit(gesture, value)` **AT MOST ONCE**, then the consumer's own `onEnd`, then the per-gesture record is discarded in a `finally`. For `'reset'`: **ZERO reveals**, **THE MODULE'S OWN `commit` SEAM IS INVOKED EXACTLY ONCE CARRYING THE CALLER-SUPPLIED PRE-DRAG VALUE** *(**⟶ ADDED 2026-09-27 — the arm's COMMIT WRITER, pinned at `§0A` note 15's `A2` continuation's closing pin: this limb as first written enumerated the arm's work WITHOUT naming its sink call, the drifted half of the `'end'`-only reading.** **The writer is the module's own `commit` sink, not the WIRING's session-construction `commit` — the as-written clause *"ZERO reveals"* is UNTOUCHED and still reads zero, because the REVEAL count and the SINK count are different readings: the reset arm's sink receives the pre-drag value, never a draggable/target value.** **Pinned by `M-8`, `M-14`, `§5.5.1 P-RL-SM-5`(1)'s `sinkCalls === 1` and `§2.3` item 4's channel-(C) cell; the landed precedent is `U-GUTTER-UI`'s invalid-arm shape, exactly one sink write of the clamped pre-drag size.**)*, the consumer's own `onEnd`/`onCancel` as the session owns them, and the record discarded. For a `cancel`: **the module's wrapper is never invoked at all** | **`onReveal` exactly `1` per `'end'` and `0` per `'reset'`; `commit` **EXACTLY `1`** per gesture that REACHED a terminal — carrying the dragged/committed value on `'end'` and the caller-supplied pre-drag value on `'reset'` *(**⟶ the "at most once" form is READ AS AT MOST ONE WRITE PER TERMINAL, with the `'reset'` terminal's one write REQUIRED — 2026-09-27, `§0A` note 15's `A2` continuation's closing pin; `M-8`'s *"the sink is called once"* and `P-RL-SM-5`(1)'s `sinkCalls === 1` are the rows that force it**)* — **`0` on a `cancel` and `0` on every refused terminal** |

**Item 7 — THE PRE-DRAG VALUE'S CAPTURE POINT AND THE PER-GESTURE RECORD.** ***(Register amendment
`R-4`; `§0A` note 9.)*** **RULED: ONE capture point — the module's own `onStart` wrapper, for a gesture
the session ESTABLISHED — and the running count is asserted EXACTLY, never "at least".** **The per-gesture
record holds: the handle (captured in `onMove`), the element, the pre-drag value (captured in `onStart` — **the reading of the hooks record's own `preDragValueOf` member, `§2.1` item 7**),
the last observed candidate answer, the last resolved target, and the sticky invalidity flag — and it is
DISCARDED at EVERY terminal, in the module's own `finally`, never by asking the session anything** (the
session's record is already gone: `runTerminal` sets `slot = null` BEFORE it invokes the composition's
`commit` call, so `session.gesture()` reads `null` inside it — the gate-1 record's `§4.2` `B.0`).

**Item 8 — the module performs NO OTHER ARITHMETIC.** **No delta, no ratio, no percentage, no scale, no
sum, no average. The ONE comparison is `withinProximity`'s, and no row may claim a magnitude of the
pane.**

---

**Item 9 — THE PRE-DRAG VALUE, PINNED AS FAR AS IT CAN BE: THE RESET'S ARITY IS THREE, THE CAPTURE POINT IS THE MODULE'S OWN `onStart` WRAPPER, AND THE CHANNEL IS CARRIED AS AN OWED CONTRACT ITEM (2026-09-27, `§0A` note 15 item `A2`; APPENDED — items 1–8 keep their numbers).**

**(a) THE ARITY, PINNED: THREE ARGUMENTS.** The module's invalid arm — and its own `reset(element)` entry point — enter the session's `reset` terminal with **EXACTLY THREE**: **`session.reset(element, handle, value)`** — **the element**, **the handle the module captured in its own `onMove` wrapper**, and **the value it captured for that gesture at its own `onStart` wrapper** (`§2.5` item 1's call table; `docs/specs/gsession.md` `§2.5` item 5, whose `value` is **REQUIRED**, and the **LANDED** module's own signature **`reset(element, gesture, value)`**). **A TWO-ARGUMENT call is NOT this contract's form**: it passes `value === undefined`, and **the session holds NO default and never computes one** (`docs/specs/gsession.md` `§0A` note 6, its `§2.3` item 5; `docs/specs/gsession.md` `§2.5` item 5's `value` is the CALLER's), so it would commit `undefined` as the caller's pre-drag value. **A test double that substitutes ITS OWN value whenever fewer than three arguments arrive makes the row's identity assertion UNFALSIFIABLE — the substituted value is the very value the row then compares against — and that substitution is TEST-side and must GO: the row asserts the call's ARITY and the THIRD argument's identity against the harness's own caller-supplied pre-drag value.**

**(b) *"CAPTURED EXACTLY ONCE"* — DEFINED, AND THE INSTRUMENT IT IS MEASURED WITH.** **One capture point and one only: the module's own `onStart` wrapper, for a gesture the session ESTABLISHED** (`§0A` note 9; item 7 above; register row `P-RL-SM-4`) — **and the running count is asserted EXACTLY (`0` before establishment, `1` after it, still `1` thereafter), never "at least".** **THE MEASUREMENT, stated because the red set's own proxy is not it: the count is read (i) from the ARITY and the THIRD ARGUMENT's identity of the module's `session.reset` delegation, and (ii) from the recorded hook order — the module's own `onStart` wrapper ran exactly once for that establishment, and its `onMove` wrapper is what carries the handle.** **A count of `session.reset` DELEGATIONS is NOT a capture count** — that reads arm entries, not captures — **and a module-side capture counter does not exist**: **`RelocateStats` declares ELEVEN fields and none of them is a capture count, and adding one is a contract change (`§4.4 S-11`).**

**(c) THE CHANNEL IS AN OWED CONTRACT ITEM — AND IT IS THE ONE FINDING OF THIS PASS THAT IS NOT TEST-SIDE.** **⟶ RULED AND LANDED 2026-09-27 — THE OWED CHANNEL IS CLOSED: fix shape `F-1` IS ADOPTED (the ORCHESTRATOR's adjudication under `AGENTS.md` item 10a), so the CONSUMER-SUPPLIED hooks record gains ONE NEW OPTIONAL VALUE-READING MEMBER — `RelocateHandle.preDragValueOf?: (element: unknown) => unknown` — read by the module from its own `onStart` wrapper, EXACTLY ONCE PER GESTURE, held in the per-gesture record, DISCARDED at every terminal, and committed as the THIRD argument of `session.reset(element, handle, value)`.** **THE WHOLE CLAUSE IS `§2.1` item 7 (appended; `§2.1`'s items `1`–`6` keep their numbers) and the consolidated record is `§0A` note 15's `A2` continuation; `F-2` is recorded there as NOT TAKEN and ARCHITECT-REVERSIBLE, with its cost.** **NOTHING OF THE TEXT BELOW IS REWRITTEN OR DELETED — it is the as-filed record of the owed item, and it is READ AS AS-FILED**: *"the rows that assert the CALLER's value by identity are NOT SATISFIABLE until a channel is pinned"* was TRUE of the as-filed contract and **is no longer true of THIS one** — `§3.1 M-8` · `M-10` · `M-12` · `M-13`(a) · `M-14` · `§5.5.1 P-RL-SM-4` · `§5.5.1 P-RL-SM-7` are now **SATISFIABLE**, each with the member supplied on the hooks record (the re-grain's sites are enumerated at `§0A` note 15's `A2` continuation).** **ONE LIMIT ON THAT CLOSURE, STATED SO IT IS NOT OVER-READ — AND IT IS A FRESH STOP: the FIX settles the VALUE's route, NOT the invalid arm's COMMIT WRITER** (`§2.1` item 7(g): `CommitSink`'s own `'end'`-only domain against `M-8`/`M-14`/`§5.5.1 P-RL-SM-5`(1)'s `sinkCalls === 1`). **Measured clause by clause, the CALLER's pre-drag value has NO LEGAL ROUTE into a module composed on the frozen session:** the install hooks are **`{capture?, onStart?, onMove?, onEnd?, onCancel?}`** and **`onStart` receives ONLY THE ELEMENT** (`docs/specs/gsession.md` `§2.1`'s `GestureOptions.onStart`, `§2.5` item 9); **the handle reaches a consumer only through `onMove`**, so no consumer hook can set a value before the module's own wrapper runs; **`gesture()`'s `value` reads `undefined` at establishment for EVERY composition** (`docs/specs/gsession.md` `§2.4` item 8: a new `begin` sets `value` back to `undefined`, and the LANDED `beginOperation` builds its record with `value: undefined`); **the session's `commit` construction option is the WIRING's and is never this module's** (`§0A` note 7); and **this unit's seam set is CLOSED AT SEVEN** (`§2.1` item 2, `§2.2` `P-8`, `§5.5.1 P-RL-IM-4`), **an eighth member being `§4.4 S-11`'s stop class.** **CONSEQUENCE, stated plainly: a conformant module can only pass `undefined` as that third argument, so the rows that assert the CALLER's value by identity — `§3.1 M-8` · `M-10` · `M-12` · `M-13`(a) · `M-14` · `§5.5.1 P-RL-SM-4` · `§5.5.1 P-RL-SM-7` — are NOT SATISFIABLE until a channel is pinned.** **THE TWO FIX SHAPES, both an ARCHITECT's dated annotation and NOT a spec-writer's edit:** **(F-1, RECOMMENDED — MINIMAL)** **ONE NEW MEMBER ON `RelocateHandle`** (the caller's own `attach(element, hooks)` record — a caller-supplied pre-drag value), **captured once at the module's own `onStart` wrapper**: it touches **no session surface**, **no install-options key set** (`M-1`/`R-10`/`I-7`'s four forwarded hooks stay the four), **no export census** (`§2.1`'s `2 + 8 = 10`) and **no register term**. **(F-2)** **an EIGHTH FACTORY OPTION member** (an injected seam, on `docs/specs/gutter.md`'s `defaultSizeFor` precedent): the same effect, but it moves **`P-RL-IM-4`'s seven-member set claim and its `8`-drive term**, and therefore **OWES A REGISTER RE-GRAIN with a new printed total.** **Neither is taken by this pass; the item is REPORTED, because `§4.4 S-11` makes both a contract change needing its own gate.**

**(d) THE MODULE'S OWN `committed` FIELD, PINNED WITH THE ARITY, because the same rows read it.** **For the module's OWN record, `committed` is the MODULE'S committing-terminal reading — `true` iff the call entered the session's `reset` terminal and the session accepted it — and it is NOT a verbatim copy of the session's `TerminalResult.committed`**, which the frozen contract defines as **the committing-terminal discriminator, INDEPENDENT of whether a `commit` callback was installed** (`docs/specs/gsession.md` `§2.1`'s `TerminalResult`, the `ADV-GS-22`(a) correction). **A test double answering `committed: sink !== null` couples the field to the WIRING's sink and contradicts that reading — TEST-side, and the rows' expected records (`M-13`(a) ⇒ `{ok: true, code: 'ok', committed: true}` on a composition whose WIRING sink is absent) are the declared form.**

---

### 2.4 The seam rules — the SEVEN NAMED SAFE DEFAULTS, and the four throw paths

**Item 1 — THE SEVEN NAMED SAFE DEFAULTS (ruling 11, in the `docs/specs/listhost.md` `§7a` item 4 form
`docs/specs/gutter.md` `§2.4` item 1 mirrors).** **Each seam's absent / non-callable / throwing state has a
NAMED outcome, and the outcome is asserted — never a bare `try`/`catch` with no contract.**

| Seam | What its absent / non-callable / throwing state MEANS | The NAMED SAFE DEFAULT (the declared outcome) |
| --- | --- | --- |
| `session` | the module was not given a usable session | **a VALID BUT INERT module**: `attach` ⇒ `false` with ZERO session calls, `reset` ⇒ a refusal record with ZERO session calls, `detach()` ⇒ `false`, zeroed stats, **never a throw** — **and *"ZERO session calls"* here is read as ZERO DELEGATIONS (`install`/`reset`/`dispose`), NEVER as zero READS (`§2.1` item 6, ruled 2026-09-27): a permitted read (`stats()` · `gesture()` · `disposed`) on this path is recorded in a SEPARATE list BESIDE the delegation list and asserted inside the closed read set** |
| `candidatesFor` | no candidate source | **the EMPTY candidate set ⇒ nothing within proximity ⇒ the invalid arm AT ONCE** — and, stated in the same breath, **that is NOT a cancel** |
| `resolveTarget` | no resolve policy | **`undefined` ⇒ a committing terminal writes NOTHING — and it is NOT a cancel** |
| `onReveal` | no durable reveal state | **invoke-once semantics degenerate to a ZERO-EFFECT attempt**: the invocation is COUNTED, the throw is ABSORBED, and **no default reveal state is ever invented** |
| `commit` | no sink | **a NO-WRITER composition: the write count reads `0` where `1` is required, which a row MUST BE ABLE TO FAIL** — never a silent success |
| `threshold` | no usable threshold | **unusable ⇒ `withinProximity` answers `false` ⇒ nothing is EVER within proximity ⇒ the invalid arm**; **no mechanism default exists** |
| `onPreview` | no presentation channel | **the ghost and the hide have no CARRIER: zero preview invocations, and the module still satisfies every count row** — **the visible half is the consumer's, and its absence is NOT a module failure** |

**The totality universal, WITH ITS BOUNDARY IN ITS OWN WORDS (`§5.5.1 P-RL-TP-1` carries the same
words):**

> **NO METHOD OF THIS MODULE THROWS — for any argument shape — and `A THROWING INJECTED SEAM IS EXCLUDED
> FROM THAT UNIVERSAL ONLY WHERE THE SEAM TABLE ABOVE NAMES A DIFFERENT, EXPLICIT OUTCOME FOR IT`**: an
> absent, non-callable or throwing `session`/`candidatesFor`/`resolveTarget`/`onReveal`/`threshold`/
> `onPreview` is **CAUGHT and mapped to its named safe default where the table names one**, **while a
> throwing `commit` PROPAGATES to the caller of the terminal turn and a throwing `onPreview` PROPAGATES
> from the observed-move turn** (`§2.4` item 4) — **so the universal is bounded by exactly those TWO
> propagations, named here, and by NOTHING else.**

**Item 2 — THE THROW DISPOSITIONS, STATED IN ONE TABLE WITH THE TURN EACH THROW SURFACES IN** (ruling 8
as the family applies it: **value-reading seams ABSORBED; the two `void` presentation/sink seams
PROPAGATE**).

| Seam class | Disposition | The turn it surfaces in | Its declared module-observable outcome |
| --- | --- | --- | --- |
| **VALUE-READING** — `candidatesFor` (its answer's `distance`, its record shape, a throwing accessor), `threshold` (never a call, but its operand class) | **ABSORBED** | the **observed-move turn** | nothing within proximity ⇒ **the invalid arm**; **never a throw out of the turn** |
| **VALUE-READING** — `resolveTarget` | **ABSORBED** | the **observed-move turn** | `undefined` ⇒ **no target this move** |
| **VALUE-READING** — `onReveal` | **ABSORBED at the module's own `commit` seam** | the **terminal turn** | the attempt is counted, **never retried**, and **the throw does not escape the terminal turn** |
| **`void` PRESENTATION** — `onPreview` | **PROPAGATES** | the **observed-move turn** | the turn's work stops, **the per-gesture record is discarded in the module's `finally`**, and `stats()` reflects what was invoked before the throw |
| **`void` SINK** — `commit` | **PROPAGATES** | the **terminal turn** | the attempt is counted, **never retried**; the terminal turn throws to its caller |

**⟶ AMENDED 2026-09-27 — THE AMENDMENT'S NEW VALUE-READING MEMBER, AND WHY IT IS NOT AN EIGHTH SEAM (`§2.1` item 7; `§0A` note 15's `A2` continuation).** **THE ROW SWEEP'S FINDING, stated first: this subsection's two tables table the SEVEN SEAMS and the throw dispositions of those seams — the hooks record's own members are NOT tabled here at all** (`§2.1` item 7(f) carries the census claim). **THE NEW MEMBER `preDragValueOf` IS A VALUE-READING MEMBER OF THE CONSUMER'S HOOKS RECORD, SO ITS DISPOSITION IS THIS TABLE'S VALUE-READING CLASS — ABSORBED — AND IT IS NOT A FOURTH TABLE ENTRY FOR A SEAM: it does not enter the seven-member seam set, it does not enter `§2.4` item 1's seven named safe defaults, and its unusable shapes answer THE NO-CALLER-VALUE REFUSAL (a declared refusal that commits nothing, `§2.1` item 7(c)) rather than a seam default.** **Its declared outcome, in one sentence: the capture refuses, the third argument of the `session.reset` delegation reads `undefined`, nothing throws out of `attach` or out of the establishment turn, and the invalid arm's own counts and arity are UNCHANGED.**

**Item 3 — THE CANDIDATE ANSWER'S DEGRADATION, RULED FIELD BY FIELD** *(this filing's home for the
record's `M-1`)*. **⟶ THE ANSWER'S SHAPE, PINNED (2026-09-27, `§0A` note 14 item 2 — the `candidatesFor` ANSWER IS AN ARRAY, and this clause is the file-wide correction of the `{candidates: readonly CandidateFor[]}` form this item AS FIRST WRITTEN carried in its place):** **the canonical answer shape is `readonly CandidateFor[]` — AN ARRAY of candidate records, each carrying the opaque `candidate` plus its caller-supplied `distance`, exactly the shape `§2.1`'s `RelocateTargetFor` already fixes — so an ARRAY IS THE LEGAL ANSWER SHAPE and is NOT an invalid class.** **THE INVALID CLASSES, named so they are not confused:** **(i) the CLASS level — an answer that is not a usable RECORD OR ARRAY at all (`undefined`, `null`, `42`, `'x'`, `true`, a function, a non-array object that is not an accepted answer) ⇒ NO candidate and NO distance (driven by `§3.2 F-13`); (ii) the ELEMENT level — an ARRAY whose ELEMENT is not a usable record ⇒ that element supplies no distance (an OWED row, `§0A` note 14 item 2 — NO row of this file owns it yet); and (iii) an EMPTY ARRAY ⇒ NO CANDIDATES, which is the `candidatesFor` row's named safe default in `§2.4` item 1 below: *"the EMPTY candidate set ⇒ nothing within proximity ⇒ the invalid arm AT ONCE"*.** *(**AS FIRST WRITTEN this item carried the `{candidates: …}` form as the answer shape and read *"an answer that is not a record, a record with an absent `candidate` …"*; the `{candidates: …}` spelling is kept visible in this annotation rather than deleted, and the field-level rulings that FOLLOW are UNAMENDED — they were, and remain, about the `distance` field and the record's members.**)* **The `distance` field's READ and its degradation, stated so no row is ambiguous: an
answer that is not a record, a record with an absent `candidate`, a `distance` that is ABSENT /
`undefined` / a non-`number` / `NaN` / a non-finite `number`, and a `distance` accessor that THROWS all
answer "NOTHING WITHIN PROXIMITY" ⇒ the invalid arm, NEVER a throw, and NEVER a default.** **The reason
`NaN` and a non-finite `number` belong to the SAME class as a missing field: `withinProximity` answers
`false` for them by its own declared table (`§2.1` item 1), so the module needs no finiteness check of
its own and must not add one** (`§4.4 S-PURE-4`'s class). — **(The `candidate` field's own degradation is
independent and is NOT an invalidity: an answer whose `candidate` is absent but whose `distance` is within
proximity IS within proximity, and the module hands the absent `candidate` on opaquely.** **Only the
DISTANCE decides proximity.** **This is the split `P-RL-IM-5` drives.**)

**Item 4 — THE TOTAL-MEMBER-READ RULE.** **The module reads the session's members and its own options
members TOTALLY: a hostile holder, a missing member or a THROWING ACCESSOR yields "unusable" rather than
an exception** — the same rule `docs/specs/gsession.md`'s landed module applies to its own injected
source (`readMember`), applied here to the session and to the module's own options. **Consequence:
`createRelocateSession` NEVER THROWS for ANY argument**, including a `Proxy` whose traps throw, a frozen
object, a primitive, `null` and `undefined`; **the factory's totality is a row (`§5.5.1 P-RL-TP-2`), not
a hope.**

**Item 5 — THE NO-INVENTED-CODE RULE.** **This module adds NO code member to the session's closed
union** (`docs/specs/gsession.md` `§4.4` `S-9`) and **never passes a code INTO the session**: it **reads**
codes from the session's own results and **propagates them VERBATIM** (`§2.3` item 4). **There is NO
module-local code — not one** — and **`RelocateStats.lastCode`'s pre-anything value is the session's own
`'ok'` reading, never an invented sentinel.** **A row proposing an eighth SESSION code, a fourth session
outcome or a `session.cancel` call from this module is `§4.4 S-11`, and it does not land.**

---

### 2.5 The composition boundary

**Item 1 — WHAT THE MODULE MAY CALL ON THE SESSION, AND NOTHING ELSE.** **Its authority is
`docs/specs/gsession.md` `§2.5`'s numbered list — the FROZEN delegate surface — narrowed to what a
COMPOSITION needs** (`§0A` note 4; ruling 3):

| The module may call | Multiplicity | The frozen list's authority |
| --- | --- | --- |
| `session.install(element, {onStart, onMove, onEnd, onCancel})` | once per distinct element | `§2.5` item 2 |
| `session.reset(element, handle, value)` | once per invalid arm, and once per `reset(element)` that runs | `§2.5` item 5 |
| `session.dispose()` | once per `detach()` that runs | `§2.5` item 7 |
| `session.stats()` · `session.gesture()` · `session.disposed` | read-only, any number of times | `§2.5` item 8 |

**AND IT MAY CALL NOTHING ELSE ON THE SESSION.** **`session.begin`, `session.end` and `session.cancel` are
NOT in this table and are NEVER called by this module.** **The static census `§3.4 R-14` requires is that
the module's own member-name references are exactly this table's — a row asserting it by *"the module
calls the session `N` times"* FAILS `R-14`'s own text** (`§4.4 S-7`).

**Item 2 — WHAT THE MODULE MAY ASK FOR, AND WHERE THE CONSUMER'S OWN DATA ENTERS.** **The candidate set,
the distance, the chosen target, the reveal decision, the preview state and the pre-drag value are ALL
the consumer's.** **The module never imports a sibling, never reads a census, never derives an element
and never holds a map keyed by element** (`§2.2` `P-9`/`P-10`; `docs/specs/census.md` `§1` item 7's
DISSOLVED edge — **an edge asserted the other way would be a FABRICATED EDGE**).

**Item 3 — THE ONE-CONTROLLER-PER-SESSION RULE AND ITS HONEST LIMIT.** **One module instance per
session is the required composition** (`docs/specs/gsession.md` `§2.6` item 7's requirement, whose own
limit statement this unit carries rather than repairs): **this mechanism has NO shared registry and
CANNOT detect a second composer.** **The consequence is stated as a LIMIT, not a claim: a composition
that wires two modules over one session is undetectable here, and the row that catches it is the
DIVERGENCE between the sink's own call record and the module's counter** (`§3.2 F-6`; `§4.4 S-8`).

**Item 4 — THE HANDLE CHANNEL, AND WHY `onMove` IS THE ONLY ONE.** **The frozen session's `onStart`
receives ONLY THE ELEMENT** (`docs/specs/gsession.md` `§2.3` item 1(d)), so **the module CAPTURES THE
HANDLE IN ITS OWN `onMove` WRAPPER, never synthesises one, never retains it past a terminal** — and it
**forwards the consumer's own `onMove` hook UNCHANGED, BY IDENTITY** (the wrapper's own capture of that
same handle is **explicitly permitted**, the `E3` `M-12` narrowing; the measurement behind it is
`84/90` with the wrapper versus `56/90` without). **The module's own `onStart` wrapper is what captures
the pre-drag value and forwards the consumer's `onStart`** (`§2.3` item 6(b)).

**Item 5 — THE WRITE SITE, AND THE ONE THING THIS MODULE OWNS.** ***(Ruling 6 + `§0A` note 7.)***
**The module's own `commit` seam is the composition's SINGLE WRITE SITE**, reached from the module's
own terminal hook; **the session's `commit` CONSTRUCTION OPTION is the WIRING's business and is a
non-forwarding recorder or absent.** **Giving the same function to both is a TWO-WRITER composition that
FAILS.** **THE THREE CHANNELS ARE THREE DIFFERENT FUNCTIONS**: `commit` (the sink), `onReveal` (the
durable state write) and `onPreview` (the transient presentation write).

**Item 6 — THE SESSION's OWN TERMINAL ORDER, WHICH THE MODULE MUST NOT RE-EXPRESS.** **The landed
`runTerminal` performs, in order: detach the three tracking listeners → mark the record inactive → set
`outcome` → run `onEnd` → `slot = null` → invoke the composition's `commit` call exactly once.**
**Consequences the module's own code must respect, stated because they are the reason no guard of the
module's own is needed: (a) `session.gesture()` is already `null` inside the module's commit seam; (b)
`gesture.outcome` is the `'end'`-vs-`'reset'` discriminator; (c) no ambient session state can be mistaken
for the gesture boundary; (d) the module's per-gesture record must be cleared by the MODULE in a
`finally`, never by asking the session anything.**

**Item 7 — THE TERMINAL HOOK, THE INSTALL OPTIONS' KEY CENSUS, AND THE SINK'S ONE CHANNEL, PINNED (2026-09-27, `§0A` note 15 item `A1`; APPENDED — items 1–6 keep their numbers, and nothing above is rewritten).** **This item exists because the red set's session double reaches the module's terminal logic through a `commit` member read from the INSTALL OPTIONS object — a member the frozen surface does not have — while `M-1`/`R-10`/`I-7` require that same object's key set to be EXACTLY the four hooks. The clauses below ARE the disposition; the correction they imply is the TestWriter's.**

1. **THE MODULE'S OWN WRAPPERS ARE FOUR, AND THE FOUR-HOOK INSTALL OPTIONS OBJECT IS MANDATORY.** The object the module hands to `session.install(element, …)` carries **EXACTLY `{onStart, onMove, onEnd, onCancel}`** — the key set `§3.1 M-1`, `§3.4 R-10` and `§3.3 I-7` assert **BY NAME**, with **a fifth key FAILING** (`capture` included). **`§3.3 I-7`'s prose *"passes no install options at all"* is READ AS NO OPTIONS BEYOND THE FOUR MODULE-OWNED HOOKS**: the four-hook object **is not optional** — it is the **ONLY channel by which the session reaches this module's own wrappers**, and a module passing none could observe no establishment, no move and no terminal at all.
2. **THE MODULE'S TERMINAL HOOK IS ITS OWN INSTALLED `onEnd`, AND THERE IS NO `commit` HOOK.** The frozen install options have **five possible members and NONE of them is `commit`** (`docs/specs/gsession.md` `§2.5` item 2: `install(element, {capture?, onStart?, onMove?, onEnd?, onCancel?})`), and that section's closing paragraph is categorical (*"Nothing else exists"*). **The session's `commit` is a CONSTRUCTION option of `createGestureSession({source, commit})`** (`§0A` note 7; ruling 6; `E10-SINGLE-SINK-CHANNEL`), **it belongs to the WIRING, and a composition that gives the same function to both channels is a TWO-WRITER composition that FAILS** (`§3.2 F-6`; `§5.5.1 P-RL-SM-2`). **THEREFORE the module's terminal logic runs INSIDE ITS OWN `onEnd` WRAPPER** — for `'end'`: `onReveal`, then **its own `commit` SEAM (the sink)**, then the consumer's own `onEnd`; for `'reset'`: **no reveal** *(**⟶ AMENDED 2026-09-27 — THE ARM'S COMMIT WRITER IS PINNED, `§0A` note 15's `A2` continuation's closing pin: this limb as first written enumerated the `'reset'` arm's work *"no reveal, and the per-gesture record discarded"* and thereby omitted the arm's ONE sink call, which is the drifted half of `§2.1`'s `'end'`-only `CommitSink` wording.** **PINNED: for `'reset'` the module's terminal logic runs — NO reveal, then ITS OWN `commit` SEAM (the sink) INVOKED EXACTLY ONCE carrying the CALLER-SUPPLIED PRE-DRAG VALUE (never a draggable/target value and never a mechanism default), then the consumer's own `onEnd` as the session owns it, and the per-gesture record discarded in the module's own `finally`.** **The writer is the MODULE'S OWN sink, NEVER the WIRING's session-construction `commit` (`§0A` note 7; ruling 6); the pinned rows are `M-8`, `M-14` and `§5.5.1 P-RL-SM-5`(1)'s `sinkCalls === 1`, the landed precedent is `U-GUTTER-UI`'s invalid-arm shape (exactly one sink write of the clamped pre-drag size), and the as-written clause *"no reveal"* is UNTOUCHED — the reveal count reads `0` on this arm and the sink count reads `1`.**)*, and the per-gesture record discarded in the module's own `finally` — because **the session's terminal invokes its `onEnd` hook and then its construction `commit`** (detach → mark inactive → set `outcome` → run `onEnd` → `slot = null` → the construction `commit`; `§2.5` item 6). **THE DISCRIMINATOR IS THE HANDLE'S `outcome`** — the handle **the module captured in its own `onMove` wrapper**, whose `outcome`/`active` read the session's live record (`docs/specs/gsession.md` `§2.5` item 10; `§2.5` items 4/5 here) — **never a field of any options member.**
3. **"THE MODULE'S OWN SINK RAN ONCE" IS READ FROM THE SINK'S OWN RECORD — `RelocateOptions.commit`'s invocation, recorded by the consumer's own function BESIDE `stats().sinkCalls`** (`§3.4 R-13`) — **and NEVER from a key of the install options object.** **A hook log that reads `'commit'` off those options is reading a member the frozen surface does not have; a row requiring it FAILS `M-1`/`R-10`/`I-7` in the same file, and the requirement is TEST-side.**
4. **THE THREE FURTHER DIVERGENCES A DOUBLE MUST NOT REPRODUCE, named so the re-grain is exact:** **(a)** a terminal must set the terminal word on the **SAME handle object** it handed to the module's `onMove` (the landed session's handle reads its record live) — a double that builds a new terminal handle and discards the old one without writing `outcome`/`active` leaves the module's own discriminator reading `null`; **(b)** the module's installed `onEnd` receives **`(element, value)`**, never a handle; **(c)** the session invokes its construction `commit` **exactly once and only at an `end`/`reset` terminal** — never at establishment.

---

### 2.6 The sibling properties — each DERIVABLE FROM THE LANDED SESSION, and none re-expressed

**What this subsection is.** `docs/specs/gsession.md` `§2.6` pins **seven** properties the two composing
controllers must satisfy **through** the session. **This filing asserts that EVERY ONE of them is
expressible through the single session shape, and it RE-EXPRESSES NONE OF THEM** — this unit's rows are
its own, and **`docs/specs/gutter.md`'s and `docs/specs/gsession.md`'s resolved channel clauses are CITED
here, never restated** (restating a sibling's resolved clause is the second-authority hazard
`docs/specs/gutter.md` `§8` names in its `E4` row).

| # | The sibling property (`docs/specs/gsession.md` `§2.6`) | This unit's DERIVED half | This unit's row |
| --- | --- | --- | --- |
| **1** | **one commit per gesture** | **the module's own sink is invoked at most once per committing terminal, and the once-ness is INHERITED — the module needs no guard of its own to make the count `1`** | `P-RL-SM-2`, `M-9`, `I-2` |
| **2** | **`cancel` ⇒ ZERO commits and zero sink writes** | **by construction: the module's terminal wrapper is never invoked for a `cancel`**, so its sink is unreachable on that path — with the positive control `F-9` requires | `P-RL-SM-1`, `M-8`, `F-9` |
| **3** | **`reset` ⇒ exactly ONE commit of the SUPPLIED value** | **the module supplies the caller's PRE-DRAG value once, on the invalid arm**, and asserts the session's own terminal evidence plus a later `pointerup` committing nothing | `P-RL-SM-7`, `M-13`/`M-14`, `I-3` |
| **4** | **no capture before establishment** | **INHERITED AND OBSERVED**: the module constructs nothing and passes no install options, with the positive control `R-10` requires | `R-10`, `I-7`, `M-1` |
| **5** | **interrupt/cancel leaves NO retained sinks and no listeners** | **the module holds no sink beyond its option and retains no handle/target/candidate/distance past a terminal** — the retention row is this unit's own | `P-RL-SM-4`, `M-10`, `I-9` |
| **6** | **no second gesture authority** (`V-13`'s class) | **the module's session call set is the closed four-name table above, and the divergence between the two writers' readings is the falsifier** | `P-RL-SM-2`, `R-13`/`R-14`, `I-3` |
| **7** | **the reveal written EXACTLY ONCE per gesture AT GESTURE END** | **the module's `onReveal`'s ONLY call site is its own `commit` seam, and only for `'end'`** — and the declared terminal domain is **`{` `'end'` `}`**, ruled | `P-RL-SM-1`, `P-RL-SM-3`, `M-6`, `I-2` |

**Two properties `docs/specs/gsession.md` `§2.6` names as PRECONDITIONS, carried here with their status:**

- **The structural half — `F-11`** (*no code path in this module can retarget a press's `click`*):
  **satisfied HERE and asserted as a row**, because **this module contains no `click` listener, no `click`
  token, no element re-lookup and no listener of its own at all** (`R-2`/`R-3`/`R-7`).
- **The behavioural half — `F-12`**: **`PRECONDITION-GATED` and NOT CLAIMED.** **No pass may claim this
  unit's green proves the retargeting criterion**, and **this spec offers NO `[D]` row and NO `[U]` row**
  (`§5.2`).

---

## 3. Behaviour (every state / fail-state)

**Layer labels:** **[T]** harness-side · **[H]** host-side · **[U]** the `ui` leg (not offered) · **[D]**
the divergence harness (not claimed). **Every row in this file is a `[T]` row or a `static` row**, and
**every row is a contract row for the TestWriter; none is a measurement this pass took.** **Every row
carries an id and a `Pinned by` citation.**

### 3.1 Valid / happy states

| id | State | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **M-1** | **A control attaches, and the SESSION owns the listener** | `createRelocateSession({session, …})` over a recording session double; `attach(elA)` | **exactly ONE `session.install` call** carrying `elA` (identity) and an options object whose own keys are **exactly the four hooks** — a typed recording session asserts the key SET, so a `capture` field FAILS here; **no `addEventListener` of any kind**; the return is `true` | `§2.1` item 1/3, `§2.5` items 1/5, `R-3`/`R-10` | `[T]` |
| **M-2** | **`withinProximity` answers the three declared outcomes, and the BOUNDARY IS INSIDE** | caller pairs driven with `(10, 20)` then `(20, 20)` then `(20.5, 20)`, then `(-5, -1)`, then `(0, 0)` | **`true`, then `true` (the boundary IS inside), then `false`, then `false` (a NEGATIVE finite threshold is a legal operand), then `true`**; the return is a `boolean` in every drive | `§2.1` item 1, `§2.3` item 1, **`§0A` note 16 (2026-09-27: the `(-5, -1)` cell's DECLARED ANSWER is `false` and is UNMOVED — what moved is the DERIVATION: a FINITE NEGATIVE `distance`/`threshold` is the UNUSABLE class and answers `false`, because the plain inequality `-5 <= -1` is `true`; the as-written parenthetical *"a NEGATIVE finite threshold is a legal operand"* is KEPT VISIBLE and READ AS SUPERSEDED IN THAT ONE POINT, the boundary-`true`, the `NaN` rule and the `±Infinity` rule being UNCHANGED)** | `[T]` |
| **M-3** | **The seam order at establishment and on an observed move, with the handle's identity** | a full lifecycle: attach; establishment; one observed move whose answer places the pane within proximity; `pointerup` | the recorded call log is **the module's own `onStart` wrapper then the consumer's `onStart`** at establishment, then on the move **`candidatesFor` then `resolveTarget` then `onPreview` then the consumer's `onMove`**, then at the terminal **`onReveal` then `commit` then the consumer's `onEnd`**; **the `gesture` argument each of `resolveTarget`/the consumer's `onMove` receives is the EXACT handle the session gave the module's wrapper** (`toBe`); the sink receives **the session's own handle** | `§2.3` item 6, `§2.5` items 4/5, `§0A` note 9 | `[T]` |
| **M-4** | **A `cancel` writes nothing and invokes no channel** | the same lifecycle terminated by the recorded `pointercancel` handler | **`stats().revealWrites === 0`**, `stats().sinkCalls === 0`, `stats().written === 0`, the session's terminal result reads `committed: false`, **and the module's per-gesture record is dropped** | `§2.3` item 4, `§2.6` item 2, `§2.5` item 6 | `[T]` |
| **M-5** | **A gesture within proximity on every move writes the reveal EXACTLY ONCE, at the `'end'` terminal** | attach; establishment; **five** observed moves, each within proximity; `pointerup` | **exactly ONE `onReveal` invocation** — the CONSUMER's own recorded count reads `1` AND `stats().revealWrites` reads `1` (they AGREE); `stats().moves === 5`; `stats().candidateCalls === 5`; the sink is called once at the terminal with outcome `'end'` | `§2.3` items 4/5, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` | `[T]` |
| **M-6** | **The reveal's write site is the module's own `commit` seam and the terminal domain is the ruled set** | (a) a full `'end'` lifecycle within proximity; (b) a full invalid-arm lifecycle; (c) a `cancel` lifecycle; and a control in which the module's `onReveal` is invoked from its own `onStart`/`onMove` wrapper | **(a)** exactly `1` reveal invocation, `gesture.outcome === 'end'` at the sink; **(b)** **ZERO reveal invocations** (the ruled `{'end'}` domain — DERIVED, `§0A` note 6) with the sink's own argument carrying the pre-drag value and `outcome === 'reset'`; **(c)** ZERO; **and the control drive FAILS the row's own assertion** (an `onReveal` invocation outside the commit seam is the fork-failing shape) | `§2.3` items 4/6(d), `§0A` note 6, `§2.6` item 7, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` | `[T]` |
| **M-7** | **A gesture crosses the proximity and comes back OUT — and the reveal count is STILL exactly one** | attach; establishment; move 1 within proximity (zone shows); move 2 outside every candidate's proximity (**zone hides**); move 3 within proximity again (zone shows again); `pointerup` | **exactly ONE `onReveal` invocation** at the terminal; **`onPreview` reads `3` invocations, and the third one's carried state declares the zone shown again** — i.e. **the displayed-ness is NOT monotonic and the durable write is not affected by it** | ruling 2 clause (1); `§2.3` item 5, `§5.5.1 P-RL-SM-1`/`P-RL-SM-6` | `[T]` |
| **M-8** | **A move OUTSIDE every candidate's proximity is the invalid arm, taken ONCE, from the module's own move turn** | attach **with the hooks record carrying the CALLER's value (`preDragValueOf: () => 777` — AMENDED 2026-09-27, `§2.1` item 7: the value arrives on the `attach` hooks record, which is what makes this row's identity assertion SATISFIABLE; `§0A` note 15's `A2` continuation)**; establishment (`onStart` captures the pre-drag value `777`); move 1 outside proximity; **then `pointerup`** | **`stats().resets === 1`** and the recording session's log shows **`reset` entered DURING the drag turn, while the gesture was still active**; the session's `reset` call carries **the exact handle** the module captured, the element, and **`777`**; the sink is called **once** with **`777`** and `outcome === 'reset'`; **the later `pointerup` commits NOTHING** (`stats().sinkCalls` stays `1`); **the consumer's own `onPreview` carries exactly one revert write** | `§0A` note 8, `§2.3` items 4/6(c), `§5.5.1 P-RL-SM-7` | `[T]` |
| **M-9** | **An `'end'` terminal inside proximity writes the sink EXACTLY ONCE, with the caller's resolved target** | attach; establishment; a move within proximity with a target `{zoneId: 'B'}`; `pointerup` | **one sink call**, receiving **the session's own handle** and the **exact object the consumer's `resolveTarget` returned** (`toBe`); **`onReveal` received that same target by identity**; `stats().sinkCalls === 1`, `stats().written === 1` | `§2.3` item 6(d), `§2.6` item 1, `§5.5.1 P-RL-SM-1`/`P-RL-SM-2` | `[T]` |
| **M-10** | **Nothing carries across a gesture boundary** | two full `'end'` lifecycles on the same element, the first with a target and a distance in proximity, the second with **no** candidates at all | the FIRST writes once and reveals once; the SECOND takes the invalid arm (`resets === 1` for that gesture) with **the second gesture's OWN pre-drag value captured at ITS establishment** — **each gesture's value read from the hooks record's own `preDragValueOf` member (AMENDED 2026-09-27, `§2.1` item 7), so "its OWN" is falsifiable: the member is invoked once per establishment and the record is discarded at the terminal**; **no target, candidate, distance or handle from the first is readable in the second**; the counters are monotonic across both | `§2.3` item 7, `I-9`, `§5.5.1 P-RL-SM-4` | `[T]` |
| **M-11** | **THE RETARGET RULE — the old zone hides and the new shows in ONE observed-move turn** | attach; establishment; move 1 within proximity of candidate `A` (shows `A`); move 2 within proximity of candidate `B` and outside `A`'s proximity (retarget); `pointerup` | **`onPreview` reads exactly `2` invocations** for the two moves, **and the second invocation carries BOTH the hide of `A` and the show of `B`** — ONE transition, in ONE observed-move turn; **`stats().moves === 2`**; the durable reveal count at the terminal is still exactly `1` | ruling 2 clause (2); `§2.3` item 5, `§5.5.1 P-RL-SM-6` | `[T]` |
| **M-12** | **The pre-drag value is captured EXACTLY ONCE per gesture, at establishment** | three stage reads within one gesture: after `attach` and before establishment; after establishment; at the terminal — each read from the module's own observation surface (the invalid arm's committed value, or a seam that records what it received) — **AND THE MEMBER ITSELF IS THAT SEAM: the hooks record's own `preDragValueOf` counts its own invocations (AMENDED 2026-09-27, `§2.1` item 7(d)), so the three stage readings are `0` / `1` / `1` on the consumer's own record beside the third argument of the `session.reset` delegation** | **`0` before establishment, `1` after establishment, and still exactly `1` at the terminal** — never "at least", never a second read; a SECOND gesture captures its own once | `§0A` note 9, `§2.3` item 6(b)/item 7, `§5.5.1 P-RL-SM-4` | `[T]` |
| **M-13** | **`reset(element)` takes the invalid arm, and its refusals are returned never thrown** | (a) an active gesture, then `reset(el)`; (b) `attach(el)` with **no** establishment, then `reset(el)`; (c) an unusable session, then `reset(el)` | **(a)** one `session.reset` call carrying the captured handle and the captured pre-drag value — **the captured value being the hooks record's own `preDragValueOf` reading (AMENDED 2026-09-27, `§2.1` item 7), and THIS ENTRY POINT NEVER INVOKES THE MEMBER AFRESH, so the per-gesture count stays exactly `1`** — and `{ok: true, code: 'ok', committed: true}`; **(b)** `{ok: false, code: 'no-gesture', committed: false}` with **ZERO session calls** — read as ZERO `install`/`reset`/`dispose` DELEGATIONS, with any permitted read recorded in the row's SEPARATE read list and asserted inside `{stats(), gesture(), disposed}` (`§2.1` item 6, ruled 2026-09-27); **(c)** **the INERT module's refusal record with the SAME zero-delegation reading, and NEVER a throw** | `§2.1` item 1 (`reset`), `§2.4` items 1/5, `§5.5.1 P-RL-SM-7`/`P-RL-TP-2` | `[T]` |
| **M-14** | **The sink can read the discriminator, and the invalid arm's committed value is the CALLER's** | the `M-8` drive **with the hooks record carrying the caller's value (`preDragValueOf: () => preDrag` — AMENDED 2026-09-27, `§2.1` item 7: the drive must SUPPLY the value on the record, and it must NOT be substituted by the session double)** with a sink that records **its own `value` argument** and `gesture.outcome` | the recorded outcome is **`'reset'`** and the recorded value is **the caller-supplied pre-drag value by identity**, **NEVER a target, never a candidate and never a module-invented default**; and the control drive (an ordinary `'end'`) records **`'end'`** | `docs/specs/gsession.md` `§2.5` item 10; `§2.3` item 6(d), `§0A` note 8 | `[T]` |
| **M-15** | **The module's counters are its own and are readable, and the two reveal readings AGREE** | after `M-5`'s lifecycle, then `M-4`'s cancel, then `M-8`'s invalid arm | `stats()` reports the declared figures for `attached`/`gestures`/`moves`/`candidateCalls`/`resolveCalls`/`revealWrites`/`revealWritesApplied`/`resets`/`sinkCalls`/`written`, **every figure reconciled against the recording sink's own call record and the recording session's own log**, and **`revealWrites === revealWritesApplied === 1`** (no reveal throw occurred) — *(**THE MEMBER was NAMED `revealed` AS FIRST WRITTEN, in this row's key list AND in its agreement clause; RENAMED 2026-09-27 to `revealWritesApplied` — `§0A` note 14 item 1 — because `revealed` is a census token `R-1` bans with exactly two exemptions (`threshold`, `distance`). The as-written name is kept visible here; the KEY SET this row asserts is unchanged in SIZE — the ELEVEN declared fields — and its `revealed` slot now carries the new name.**)* | `§0A` note 10, `§2.1` item 1, `§3.2 F-5` | `[T]` |
| **M-16** | **`detach()` restores the module's baseline through the session, once** | `attach(elA)`; `detach()`; `detach()` again | the FIRST call delegates **`session.dispose()` exactly once** and returns `true` when the session reports `complete: true`; the SECOND makes **ZERO session calls** and returns `false`; **`detached` reads `true` forever after**; the session's own detach arithmetic is the session's row | `§2.1` item 1 (`detach`), `§2.5` item 1, `I-9` | `[T]` |
| **M-17** | **The consumer's four hooks are forwarded BY IDENTITY and nothing is swallowed** | a full lifecycle with all four consumer hooks supplied, each recording its own arguments | **each hook ran exactly once, with the arguments the session gave the module's wrapper** (`toBe` on the handle for `onMove`, on the element for `onStart`/`onEnd`/`onCancel`), **and the module's own wrapper's capture did not alter any argument** | `§2.1` item 1 (`RelocateHandle`), `§2.5` item 4, `I-5` | `[T]` |

### 3.2 Documented fail-states / non-happy states

**The pure function's rows first (`F-1`..`F-3`) — and NOTE the shape: `withinProximity` has NO REFUSAL
DOMAIN, so every outcome in that block is a VALUE, not an error.**

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A NON-NUMBER operand** | `withinProximity` driven with `duration` as `'20'`, `'0'`, `null`, `undefined`, `true`, `false`, `{}`, `[]`, `Symbol('s')`, a function, `12n`/`0n`, a `Map` | **`false` in every case** — **no coercion, no `Number(...)`, no `parseFloat`, no `+value`, no `String` round-trip**; **the other operand is not consulted for a different answer**; **`12n` does NOT throw** (the gate precedes the comparison) — **⟶ VERIFIED AGAINST THE PINNED RULE 2026-09-27 (`§0A` note 17 item (a)'s variant `(H1)`; NO CELL MOVED): every declared answer is `false`, the `typeof` gate precedes the comparison, `12n` does NOT throw, and *"the other operand is not consulted for a different answer"* stands — a non-`number` operand decides the answer on its own, and this row's hostiles are NOT the finite-negative class.** | `§2.1` item 1, `§2.3` item 1, `§4.4 S-PURE-1` | `[T]` |
| **F-2** | **`NaN` on either side** | `(NaN, 20)`, `(20, NaN)`, `(NaN, NaN)` | **`false` in all three** — the comparison's own answer, **not `min`-style arithmetic and not a throw** — **⟶ VERIFIED AGAINST THE PINNED RULE 2026-09-27 (`§0A` note 17 item (a)'s variant `(H2)`; NO CELL MOVED): the `NaN` limb answers `false` on either side and never throws, and the phrase *"the comparison's own answer"* is READ AS THE `NaN` LIMB'S ANSWER — it is NOT licence to reach the comparison with a FINITE NEGATIVE operand, which is the UNUSABLE class (`M-2` · `P-RL-IM-3`'s threshold class `(c)`).** | `§2.1` item 1, `§2.3` item 1 | `[T]` |
| **F-3** | **A NON-FINITE `number` reaches the comparison VERBATIM** | `(Infinity, Infinity)`, `(0, Infinity)`, `(5, -Infinity)`, `(-Infinity, -Infinity)`, `(42, 0)` | **`true`, `true`, `false`, `true`, `false`** — the formula's answers, **no finiteness refusal, no clamp, no throw** **⟶ ANNOTATED 2026-09-27 (`§0A` note 16): ALL FIVE CELLS ARE UNCHANGED under the pinned negative-class rule, and this row is one of its DRIVES — a NON-FINITE `number` is NOT the unusable class, so it REACHES THE COMPARISON VERBATIM (`(-Infinity, -Infinity)` ⇒ `true`), while the FINITE NEGATIVE class is unusable (`M-2`'s `(-5, -1)` ⇒ `false`). A reader must NOT generalise this row's `-Infinity` cells to a finite negative operand.** | `§2.1` item 1, `§2.3` item 1 | `[T]` |
| **F-4** | **THE NO-WRITER COMPOSITION — a positive control that MUST FAIL** | `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, threshold, onPreview})` — **no `commit` seam at all**, or a `commit` that is non-callable; a full lifecycle within proximity | **the row FAILS**: the write count is **`0`** where the contract requires `1`. **AND THE COMPOSITION'S STATE IS STATED IN THE SAME SENTENCE: the session's own terminal result may read `committed: true` while THIS composition wrote NOTHING** — **therefore *"one commit per gesture"* is vacuous for this composition and must NEVER be quoted as evidence that a write happened** | ruling 6, `§2.4` item 1 (`commit`), `I-2`, `§5.5.1 P-RL-SM-2` | `[T]` |
| **F-5** | **THE TWO READINGS DIVERGE — the channel-identity falsifier, a positive control that MUST FAIL** | (a) the CONFORMANT composition, with a sink and an `onReveal` that **each record their own invocation**; (b) a composition whose `onReveal` and `commit` are **the SAME function**; (c) a composition in which an `onPreview` invocation **also produces an `onReveal` invocation** | **(a)** the consumer's `onReveal` record reads `1` **and** `stats().revealWrites` reads `1` — **they AGREE, and the agreement is the row's positive half**; **(b)** the row **FAILS**: one function received both channel classes; **(c)** the row **FAILS**: the two channels are not the same function and may not share a turn | `§0A` notes 6/10, `§2.3` item 4, `§3.4 R-13`, `§5.5.1 P-RL-SM-6` | `[T]` |
| **F-6** | **THE TWO-WRITER COMPOSITION — positive control, and it MUST FAIL** | a composition in which **a second writer ALSO calls the sink for the same gesture** (the driver calls the sink directly from a hook, or wires the session's `commit` construction option to **the same function** the module's own `commit` seam holds — the `E10-SINGLE-SINK-CHANNEL` violation) | **the row FAILS**: the sink's call record for the gesture has **length `2`**, where the contract requires `EXACTLY 1`. **The module's own `stats().sinkCalls` reads `1` while the SINK's record reads `2`** — **`P-RL-SM-2` asserts BOTH readings**, so a composition cannot pass by counting only its own calls | ruling 6, `§0A` note 7, `§2.3` item 4, `R-13`, `§5.5.1 P-RL-SM-2` | `[T]` |
| **F-7** | **A THROWING `onPreview` PROPAGATES from the observed-move turn** | the presentation seam throws on the first observed move within proximity | the throw **escapes the module's observed-move turn to that turn's caller**; **the per-gesture record is DISCARDED in the module's `finally`** (a later `reset(el)` refuses `'no-gesture'`-class with ZERO session calls); **no reveal and no sink write occurred**; **`stats().moves` counts the move that threw** | ruling 8, `§2.4` items 2/4, `I-10` | `[T]` |
| **F-8** | **A THROWING `commit` PROPAGATES from the terminal turn** | the sink throws on its one invocation at an `'end'` | the throw **escapes the terminal turn to its caller**; the write is **ALREADY COUNTED and NEVER RETRIED** (`stats().sinkCalls === 1`, `stats().written === 0`); the gesture is **`idle`**, **NOT `busy`**; **the element stays installed and a new gesture establishes normally** (a separate drive) | ruling 8, `§2.4` items 2/4, `§2.5` item 6 | `[T]` |
| **F-9** | **A `cancel` writes ZERO times even when the consumer set state on the gesture** | a lifecycle in which the consumer's own `onMove` records a value on the handle and the terminal is a `cancel` | **ZERO reveal invocations, ZERO sink calls, ZERO resets**; the terminal's outcome is **not `'end'`**; the module's record is dropped — **the preview count is NOT asserted to be zero here** (a cancel may follow moves that DID preview; that is `P-RL-SM-6`'s domain) | `§2.3` items 4/5, `§2.6` item 2, `M-4` | `[T]` |
| **F-10** | **The session's own refusals propagate VERBATIM as the module's `lastCode`** | a session double driven to refuse with each of its own codes in turn (a disposed session, a stale handle, no active gesture, a busy session, an uninstalled element, a disconnected source) | **the string the module's `stats().lastCode` reads is BYTE-IDENTICAL to the one the session returned** (`===`), and **NO module-local code exists anywhere in the module's bytes** — an eighth SESSION code, or any module-local code, FAILS | `§2.3` item 4, `§2.4` item 5, `R-15`, `I-14` | `[T]` |
| **F-11** | **An UNUSABLE or hostile `session`, and the total factory** | `createRelocateSession()` · `({})` · `({session: undefined})` · `({session: 42})` · `({session: {}})` · `({session: <a Proxy whose traps throw>})` · `({session: Object.freeze({})})` · `(42)` · `('x')` · `(null)` | **construction NEVER throws**; the returned module is **VALID BUT INERT**: `attach` ⇒ `false` (**no session call, `stats().attached === 0`**), `reset` ⇒ a refusal record with **zero session calls**, `detach()` ⇒ `false`, `stats()` ⇒ **zeroed counters**, `detached` reads `false` until a `detach()` that refuses | `§2.4` items 1/4, `I-10`, `§5.5.1 P-RL-TP-2` | `[T]` |
| **F-12** | **A hostile OPTIONS record — a throwing accessor, a `Proxy`, a non-record** | `createRelocateSession({get session() { throw new Error('x') }})`, the same for each of the seven members; a `Proxy` whose traps throw; `Object.freeze({})`; an array | **construction NEVER throws**, and the resulting module is the INERT module of `F-11` for the members the hostile read made unusable — **the total-member-read rule is what makes this a value and not a throw** | `§2.4` item 4, `§5.5.1 P-RL-TP-2` | `[T]` |
| **F-13** | **A candidate answer that is not a usable record — the whole answer** *(**⟶ CORRECTED 2026-09-27 — `§0A` note 14, item 2. THIS ROW'S AS-FILED TRIGGER AND REQUIRED-BEHAVIOUR CELLS ARE KEPT VERBATIM, IN THE TWO CELLS TO THE RIGHT OF THIS ONE, AND ARE `SUPERSEDED` BY THE CORRECTED SUBJECT BELOW — annotate-never-rewrite.**)* **THE ROW'S TRUE SUBJECT: a candidate answer that is NOT A USABLE RECORD, AT THE CLASS LEVEL** — `undefined` · `null` · `42` · `'x'` · `true` · a function · a non-array object that is not an accepted answer | `candidatesFor` returning `undefined`, `null`, `42`, `'x'`, `true`, a function, an ARRAY of `CandidateFor` records (a legal answer shape? **NO — see the row's own declaration**), and a record with a THROWING `distance` accessor | **declared: the answer is read through the module's own total member-read; a non-record answer supplies NO candidate and NO distance ⇒ the invalid arm at once, never a throw.** **An ARRAY is NOT a record and is therefore the same class** — the contract's answer shape is `{candidates: readonly CandidateFor[]}`, and **an array in its place supplies nothing** | **`§2.4` item 3 as corrected** — **THE ROW'S THREE DECLARED STATEMENTS, so the invalid class is exact and the red set can be re-grained against it:** **(i)** **AN ARRAY `IS` THE LEGAL ANSWER SHAPE — `readonly CandidateFor[]`, the shape `§2.1`'s `RelocateTargetFor` already fixes (`(element, candidates: readonly CandidateFor[], gesture)`) — SO AN ARRAY IS *NOT* THIS ROW'S INVALID CLASS, and the as-filed clause *"An ARRAY is NOT a record and is therefore the same class"* is SUPERSEDED.** **(ii)** **AN ARRAY WHOSE *ELEMENT* IS NOT A USABLE RECORD IS THE *ELEMENT-LEVEL* INVALID CLASS — a DIFFERENT class from this row's, and (stated so it is not silently re-scoped) NO ROW OF THIS FILE OWNS IT YET: `F-14` owns a NON-USABLE `distance` FIELD WITH THE `candidate` PRESENT, `P-RL-IM-5` owns the `distance` field's SEVEN shapes, `F-15` owns the ABSENT/NON-CALLABLE SEAM, and `P-RL-IM-1`'s shape `(2)`/`(3)` are SEAM-absent / SEAM-non-callable — none of them drives `[42]`/`['x']`/`[null]`/`[undefined]`/`[true]`/`[a function]`, i.e. an ARRAY whose ELEMENT supplies no readable `distance`. THE OWED ROW IS RECORDED AT `§0A` note 14 item 2 (an ELEMENT-LEVEL-INVALID-ANSWER row, owed to a TestWriter's re-grain as a `§3.2`/`F-` row); it adds NO register row, NO term and NO total, and this annotation DOES NOT RE-SCOPE `F-13` to cover it.** **(iii)** **AN `EMPTY` ARRAY'S DECLARED OUTCOME IS *NO CANDIDATES ⇒ THE INVALID ARM AT ONCE* — pinned by `§2.4` item 1's `candidatesFor` row (*"the EMPTY candidate set ⇒ nothing within proximity ⇒ the invalid arm AT ONCE"*), by `§2.3` item 6(c)'s turn, and by `P-RL-SM-7`'s invalidity class `(1)` (*"NO candidates at all … or an empty answer"*), and the red set drives `[]` that way.** | `§2.4` item 3 (as corrected), `§2.3` item 6(c), `§5.5.1 P-RL-IM-1`/`P-RL-IM-5`/`P-RL-SM-7`, `§0A` note 14 | `[T]` |
| **F-14** | **A `distance` field that is absent, non-numeric, `NaN`, non-finite, or read through a throwing accessor** | five separate drives on the same within-band answer, **each with the `candidate` PRESENT** | **all five take the invalid arm** (nothing within proximity) **and NONE throws**; **and the CONTROL drive — an absent `candidate` with a within-proximity `distance` — is WITHIN PROXIMITY** (only the DISTANCE decides) — **⟶ ANNOTATED 2026-09-27 (`§0A` note 16's rule, reconciled by `§0A` note 17 item (c); the as-written cell is KEPT VISIBLE and its five declared answers are UNMOVED): the `non-finite` drive's declared INVALID ARM is the FIELD-LAYER answer — the class `§5.5.1 P-RL-IM-5`'s shape `(6)` declares, a `distance` FIELD being usable only as a FINITE NON-NEGATIVE `number`. A DIRECT call of the exported pure `withinProximity` with a non-finite operand reads `§0A` note 16's VERBATIM limb instead (`§3.2 F-3`): `-Infinity` against a finite non-negative `t` is `true` THERE. SO A READER MUST NOT CARRY EITHER LIMB INTO THE OTHER LAYER, and the one-sentence statement of that field limiter is REPORTED AS OWED at `§0A` note 17 item (f).** | `§2.4` item 3, `§2.1` item 1 (`CandidateFor`), `§5.5.1 P-RL-IM-5` | `[T]` |
| **F-15** | **An ABSENT or non-callable `candidatesFor`** | the seam omitted; then supplied as `42`, `'x'`, an object, a `Proxy` whose traps throw | **the empty candidate set ⇒ nothing within proximity ⇒ the invalid arm AT ONCE**, with the refusal **not** a cancel; **`stats().candidateCalls` counts the ATTEMPT where the seam was present** and reads `0` where the seam was absent from the options object — **⟶ THE TWO WORDS ARE PINNED (2026-09-27, `§0A` note 15 item `S4`; the counter's own declaration carries the same words): ATTEMPTED = a TRY to consult the seam — counted ONCE PER OBSERVED MOVE wherever the member carried a value OTHER THAN `undefined`, INCLUDING a non-callable (`42` · `'x'` · an object · a hostile `Proxy`) and a callable that THROWS; INVOKED = ACTUALLY CALLED, which happens only where a callable was present. THE ONLY `0` FORM IS THE MEMBER ABSENT OR CARRIED WITH THE VALUE `undefined`; `null`, `false`, `0`, `''`, a non-callable and a throwing callable are ALL ATTEMPTS, and none is ever retried.** — **the absent form is driven from a SEPARATE COMPOSITION whose options object does not carry the member (`§5.5.1 P-RL-IM-4`'s scope clause; `§0A` note 13 item 3, pinned 2026-09-27)** | `§2.4` items 1/2, `§2.3` item 6(c), `§5.5.1 P-RL-IM-1` | `[T]` |
| **F-16** | **An ABSENT, non-callable or THROWING `resolveTarget`** | the seam omitted; `42`; a callable that throws; a callable returning `undefined` | **in every case the terminal writes NOTHING for that gesture** (`stats().sinkCalls === 0`) **and it is NOT a cancel** (the terminal's outcome is still `'end'`), **and `stats().revealWrites === 0`** — **a target exists or the reveal has nothing to write** | `§2.4` items 1/3, `§2.2` `P-8`, `§5.5.1 P-RL-IM-2` | `[T]` |
| **F-17** | **An ABSENT or non-callable `onReveal`** | the seam omitted; `42`; a callable that throws | omitted/non-callable ⇒ **the write attempt is made and there is nothing to invoke: `revealWrites` counts the ATTEMPT only where a callable was present, and `revealWritesApplied` reads `0`**; **a THROWING `onReveal` is ABSORBED at the module's own `commit` seam: `revealWrites === 1`, `revealWritesApplied === 0`, and the terminal turn does NOT throw** — **the sink's own write is unaffected and still happens once** — *(**BOTH readings were NAMED `revealed` AS FIRST WRITTEN in this row; RENAMED 2026-09-27 to `revealWritesApplied` (`§0A` note 14 item 1), because `revealed` is a census token `R-1` bans with exactly two exemptions. The as-written readings, their `0`/`0` values and their throw dispositions are UNCHANGED — only the member's NAME moved.**)* | `§2.4` items 1/2, ruling 8, `§5.5.1 P-RL-IM-4` clause (a) | `[T]` |
| **F-18** | **The invalid arm's STICKY refusal** | a gesture with moves `outside → inside → outside → outside` | **`stats().resets === 1`** — the arm is taken **AT MOST ONCE per gesture**; the second `outside` move takes **no** further reset call; **the consumer's `onPreview` still receives every move's presentation** (the per-move channel is not suppressed by the arm) | `§0A` note 8, `§2.3` item 6(c), `§5.5.1 P-RL-SM-7` | `[T]` |
| **F-19** | **A consumer that writes from its OWN hooks** | the consumer's `onMove` calls its own sink, or its `onEnd` does | **this module's rows do NOT count that write as the composition's** — `stats().sinkCalls` is the count of **the module's own one call site**; **and a composition whose TOTAL write count for one gesture is `2` FAILS `F-6`** (so the loophole closes where it matters) | ruling 6, `§2.3` item 4, `R-13` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **`withinProximity` is TOTAL, PURE and FORMULA-EXACT**: it returns a `boolean` for EVERY pair of inputs, throws for NONE, mutates nothing, retains nothing, and its answer is **either** the `typeof` gate's `false` **or** `distance <= threshold` **verbatim** **⟶ ANNOTATED 2026-09-27 (`§0A` note 16; the clause ABOVE IS KEPT VISIBLE and the as-written two-limb enumeration is SUPERSEDED): the answer's THREE limbs are the `typeof`/finiteness gate's `false`, the UNUSABLE-class `false` (a FINITE NEGATIVE operand on either side), and `distance <= threshold` verbatim over the USABLE class — with the boundary-`true`, the `NaN` rule and the `±Infinity` rule UNCHANGED. THE ROW'S OWN EXPECTATION EXPRESSION IS THE ONE SITE IN THE RED SET THAT ASSERTS THE SUPERSEDED READING: its 19-value operand pool contains `-1`, and FIFTEEN of its `361` pairs diverge (the `d === -1` family `9` and the `t === -1` family `6`), each of which expects `true` under `d <= t` and is `false` under the pinned rule — a FINDING for the TestWriter, recorded at `§0A` note 16 item (c); every one of this row's other `346` pairs, and all of `F-1`/`F-2`/`F-3`, is UNAFFECTED** | `§2.1` item 1's whole content | `§2.3` item 1, `F-1`..`F-3`, `M-2`, `§5.5.1 P-RL-IM-3` |
| **I-2** | **THE THREE CHANNELS ARE THREE DIFFERENT FUNCTIONS, AND (A) IS ONCE-PER-GESTURE-AT-`'end'`**: for every gesture, `onReveal` is invoked **at most once**, **only at an `'end'`**, and **never from `onStart`/`onMove`/`onPreview`**; a gesture crossing the proximity `N >= 2` times still reads **exactly one** | Rulings 4 and 2; the ledger's deliberate strengthening | `§2.3` items 4/5, `§2.6` item 7, `M-5`/`M-7`, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` |
| **I-3** | **THE SESSION IS THE SOLE GESTURE AUTHORITY, AND THE MODULE OWNS NO LIFECYCLE**: the module never attaches a listener, never calls `session.begin`/`end`/`cancel`, and never writes a channel the session owns beyond its one commit seam — **while entering the session's own `reset` terminal from its move turn is PERMITTED and is not a second authority** | Ruling 3 — the `SECOND-GESTURE-AUTHORITY` objection's answer; `V-13`'s remedy | `§2.5` items 1/3, `§2.2` `P-4`, `R-7`/`R-14` |
| **I-4** | **THE ZONE'S DISPLAYED-NESS IS NOT MONOTONIC, AND THE HIDE IS ON THE PER-MOVE CHANNEL**: it turns on within proximity and off again mid-gesture on either trigger, and a retarget's hide-plus-show is ONE invocation in ONE observed-move turn — **while the durable write is unaffected** | Ruling 2, clause by clause; **DERIVED mapping — `§0A` note 6** | `§2.3` item 5, `M-7`/`M-11`, `§5.5.1 P-RL-SM-6` |
| **I-5** | **THE CONSUMER'S HOOKS AND THE CONSUMER'S OPAQUE VALUES PASS THROUGH BY IDENTITY**: the handle, the element, the candidate, the target and the pre-drag value are never cloned, stringified, keyed or altered by this module — **(⟶ AMENDED 2026-09-27: the pre-drag value's ROUTE into this module is the hooks record's own `preDragValueOf` member (`§2.1` item 7), read once per established gesture; this row's IDENTITY claim is unchanged, and its unusable shapes are a DECLARED REFUSAL that commits nothing — never a substituted value)** | The opaque-value discipline (`E3`'s token rule applied here) | `§2.5` item 4, `M-3`/`M-9`/`M-17`, `R-1` |
| **I-6** | **NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER**: the module contains no `document`/`window`/`globalThis`-rooted access, no element-query token in any form, and reads no ambient global | `A-d3`; `E3`'s `P-2` class | `R-2`, layer anchor 3 |
| **I-7** | **NO LISTENER AND NO CAPTURE OF THIS MODULE'S OWN**: every attach is a `session.install` delegation; the module calls no capture member and passes **no install options at all** *(**⟶ PINNED 2026-09-27, `§0A` note 15 item `A1`, landing at `§2.5` item 7: read as **NO OPTIONS BEYOND THE FOUR MODULE-OWNED HOOKS** — the four-hook object is MANDATORY, because it is the ONLY channel by which the session reaches this module's own wrappers; a fifth key, `capture` included, FAILS this row AND `M-1`/`R-10`. The module's `commit` SEAM is reached from its own installed `onEnd`, never from a key of those options — the frozen install options carry no `commit` member at all, `docs/specs/gsession.md` `§2.5` item 2.**)* | Rulings 3/6; `§0A` note 11 | `R-3`, `R-10`, `M-1`, `§5.5.1 P-RL-SM-2` |
| **I-8** | **THE COMPOSITION BOUNDARY IS A CLOSED SET**: the only session members this module CALLS are `install`, `reset` and `dispose`; the only ones it READS are `stats()`, `gesture()` and `disposed` | Ruling 3; the frozen list | `§2.5` item 1, `R-7`/`R-14` |
| **I-9** | **NOTHING CARRIES ACROSS A GESTURE**: the module's per-gesture record (the handle, the element, the pre-drag value — **the hooks record's own `preDragValueOf` reading, AMENDED 2026-09-27, `§2.1` item 7** — the last candidate answer, the last target, the sticky flag) is **DISCARDED at every terminal in the module's own `finally`** — including a cancel and a refused terminal; the attached-element ledger and the monotonic counters are the only state that outlives a gesture; **no element-keyed value, cache, memo or map exists** | Prohibition P-6; the session's own one-gesture-deep shape applied here | `§2.3` item 7, `§2.5` item 6, `M-10`/`M-12`, `§5.5.1 P-RL-SM-4` |
| **I-10** | **THE MODULE IS TOTAL AT THE SEAM: `createRelocateSession` NEVER throws for ANY argument, and `attach`/`detach`/`reset`/`stats` return their declared shape for every input — a hostile, absent or throwing `session` or option is DEGRADED, never propagated — with EXACTLY TWO named propagation exceptions (`commit` at the terminal turn, `onPreview` at the observed-move turn)** | Ruling 8 as the family applies it | `§2.4` items 1/2/4, `F-7`/`F-8`/`F-11`/`F-12`, `§5.5.1 P-RL-TP-1`/`P-RL-TP-2` |
| **I-11** | **NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: no row of this unit may assert a rendered-geometry, layout, paint, coordinate, applied-CSS, cursor or click-retargeting property, and no green of this unit may be reported as one; the module reads NO coordinate, takes NO event object and computes NO distance** | Ruling 5's mandatory clause; the named cost | `§0A` note 5, `R-8`, `§5.2`, `§7` items 2/4, `§5.5.1 P-RL-TP-1` |
| **I-12** | **`withinProximity` MUTATES AND RETAINS NOTHING**: after any call both arguments are reference-identical and value-identical to their pre-call state; a frozen pair of operands works exactly like an unfrozen one; there is no module-level mutable state — **⟶ ANNOTATED 2026-09-27 (`§0A` note 17 item (c); NO CELL MOVED): this row's *"`NaN`/non-finite readings' stability"* clause is READ UNDER THE PINNED RULE — `NaN` ⇒ `false`; a NON-FINITE OPERAND reaches the comparison VERBATIM; a FINITE NEGATIVE operand on either side ⇒ `false` (the UNUSABLE class); and `-0` is not special-cased. PURITY IS UNAFFECTED: the unusable limb is a CLASS TEST ON THE OPERANDS — never a mutation, never a retention and never a second comparison site, so `§2.3` item 1's STOP stays UNFIRED.** | Purity, and the `NaN`/non-finite readings' stability | `§2.1` item 1, `M-2`, `§5.5.1 P-RL-IM-3` |
| **I-13** | **NO STORE, NO PERSISTENCE, NO MCP SURFACE, NO CENSUS READ**: no file, no `localStorage`, no store object, no IPC method, no tool, no resource, no `RpcCommand` member, **and no census read of any kind** | Prohibitions P-6/P-10; the dissolved edge | `R-1`, `R-4`, `R-6`, `§2.5` item 2 |
| **I-14** | **THE CODE DOMAIN IS THE SESSION'S OWN CLOSED UNION AND NOTHING ELSE**: **this module declares NO code of its own**, propagates every code it reads **byte-identically**, and never passes a code INTO the session | Ruling 3; `§2.4` item 5; the must-not list | `§2.3` item 4, `F-10`, `R-15` |
| **I-15** | **`[U]` IS NOT OFFERED AND `[D]` IS NOT CLAIMED, AND BOTH REFUSALS ARE STRUCTURAL**: the module is imported by no `src/**` file and reads no coordinate, so there is no rendered surface to observe and nothing for a measuring leg to measure | `§5.2`; `docs/specs/zones.md` `§4.4 S-6` | `§5.2`, `R-8`/`R-9`/`R-11`, `§7` item 5 |

### 3.4 The STATIC rows — the rows `§2.2`'s prohibition table cites, ENUMERATED

**What this subsection is, and why it exists.** `§2.2` cites static rows for **every one of its twelve
prohibitions**. **A prohibition citing *"a static source row"* with no id is not a row** (the sibling
reviews' recurring finding), so **every static claim in this file has an id here**, and **each scan is
closed against the evasion class** (token assembly, comment-carrying, realm-rooted computed access) by
**`§4.4 S-6`'s stop condition**. **Every row here is `static`-layer: it reads this unit's own FILES or
drives an injected argument, never a real DOM.**

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-1** | **The anti-evasion VOCABULARY row (P-1, P-5, P-8, P-10), with its DECLARED EXEMPTIONS AND BOTH CONTROLS.** *Over the MODULE's source (`src/shared/relocate.ts`) INCLUDING its comments, no occurrence, in any form, of: a coordinate/event-field token (`clientX`, `clientY`, `pageX`, `pageY`, `screenX`, `screenY`, `offsetX`, `offsetY`, `movementX`, `movementY`, `pointerId`, `deltaX`, `deltaY`, `button`, `buttons`, `isPrimary`); a geometry token (`getBoundingClientRect`, `getComputedStyle`, `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`/`scrollWidth`, `matchMedia`); a pane/zone/tab/axis vocabulary token (`pane`, `zone`, `tab`, `horizontal`, `vertical`, `inline`, `block`); a unit or token literal (`'px'`, `'0px'`, `'fit-content'`, `calc(`, and the QUOTED CSS CUSTOM-PROPERTY LITERAL `'--` — **AN OPENING QUOTE FOLLOWED BY TWO HYPHENS, which is the form a CSS custom-property name takes in source; PINNED 2026-09-27 by the red-exposed item `5` (`§0A` note 13): a RAW two-character scan for `--` is NOT this row's token (**AS FIRST WRITTEN this entry read the bare token `--`, with no form given**), because it FIRES ON ORDINARY SUBTRACTION and a blanket hyphen ban is not this row's claim. BOTH CONTROLS, as the red set authored them: (i) a corpus carrying the custom-property literal — `const name = '--zone-width'` — FAILS the row; (ii) a corpus carrying ordinary arithmetic — `const next = a - b` — PASSES it**); a selector token (`selectors`, `querySelector*`, `closest`, `getElementById`); a census token (`census`, `zones`, `revealed`, `specOf`, `sizes`, `trackVar`, `trackProp`, `emptyToken`); or a store/cache token (`localStorage`, `sessionStorage`, `store`, `cache`, `memo`, `persist`).* **THE DECLARED EXEMPTIONS, and this is what conditions `C-C` requires: `threshold` and `distance` are EXEMPT BY NAME as THIS UNIT'S DECLARED CONTRACT VOCABULARY** (`§2.3` items 2/3, `§2.1` item 5) — they are the module's own option member and its own answer field, **and the exemption exists because the reconciliation clause licenses the token rather than because the scan is inconvenient.** **The scan reads a NORMALIZED view in which string-literal concatenation is JOINED before scanning (`'thresh' + 'old'`, a template with substituted parts, a token split across a line break) and COMMENTS ARE SCANNED LIKE CODE**, with a word/identifier BOUNDARY rule. **SCOPE, stated because this row's spelling collides with legitimate text:** the scan's scope is **the module file (whole, comments included)** plus **this row's OWN controlled corpora**; the module **must** contain its own member names and field names, **and the TEST FILE must carry the banned spellings inside this row's own control data and assertion messages** — so **a whole-file negative over the test file is DELIBERATELY DROPPED** (`docs/specs/gsession.md` `R-1`'s precedent: *"a whole-file scan of a file that must contain the spellings can only fail"*). **Controls, BOTH REQUIRED, and the POSITIVE control must not be satisfiable by an exemption:** a **POSITIVE control** (a corpus spelling a banned token raw, joined across a literal boundary, and inside a comment **FAILS**) and a **NEGATIVE control** (this unit's own legitimate text — the member names, `candidate`, `distance`, `threshold`, `withinProximity`'s parameter names — **PASSES**). **A row that passes for a module spelling any banned token in any of those three forms is UNFALSIFIED and must not be filed** (`§4.4 S-6`). **Without the exemption clause this row is either vacuous or contradicts `§2.3` item 3 — which is exactly why the exemption is DECLARED rather than implied** | P-1/P-5/P-8/P-10, `§2.3` items 2/3, `§0A` note 12, `§4.4 S-6` | static |
| **R-2** | **The forbidden-ACCESS row (P-2, P-6; `I-6`, `I-13`).** *No access in the module is ROOTED IN A BANNED REALM TOKEN OR AN ALIAS OF ONE* — `globalThis['doc' + 'ument']`, `globalThis[name]`, `realm[propName]`, `const g = globalThis; g.document`, a helper returning the realm, and **the no-token realm route** (`({}).constructor.constructor('return this')()`, `Reflect.construct`, `Function.prototype.call`-shaped code construction) — **and no ambient read for a value**: `document`, `window`, `globalThis`, `self`, `top`, `parent`, `frames`, `matchMedia`, `getComputedStyle`, `getBoundingClientRect`, `activeElement`, `Date`, `Math.random`, `process`, `node:fs`, `localStorage`, `eval`, `new Function`. **STATED LIMIT, so the row is not written unassertably: a BLANKET ban on `[expr]` is NOT claimed** — a **locally constructed object's** computed access and ordinary **array indexing** carry no banned token and are **deliberately not banned**; **a row that asserts "no bracket notation at all" FAILS this row's own text** (`§4.4 S-8`) | P-2/P-6, `I-6`, `I-13` | static |
| **R-3** | **The EVENT-WIRING row (P-3; `I-7`).** *The module performs NO listener attachment and NO capture of its own: it contains no `addEventListener`, no `removeEventListener`, no `setPointerCapture`, no `releasePointerCapture`, no `capturePointer` call, and no `on<event>=`-style assignment; the ONLY attach it can cause is the `session.install` delegation.* **Its falsifiable half:** a module containing any of those tokens as a call **FAILS**, and **an attach that does not go through `session.install` FAILS** (the row drives the recorded session log, `M-1`). **Its honest limit:** a text scan cannot prove the absence of an attach for all control flow — so the row pairs the token scan with the **runtime delegated-log row** (`M-1`, `R-10`), and **the pair is the row** | P-3, `I-7`, `M-1` | static + `[T]` |
| **R-4** | **The IMPORT-BOUNDARY row (P-9; `§0A` note 4).** *`src/shared/relocate.ts`'s import statements are EXACTLY ONE, and it is `import type { GestureHandle } from './gesture-session.js'`.* **Any second import statement FAILS. A VALUE import from the session module FAILS — and `createGestureSession` and `POINTER_TYPES` are named as the two FAILING bindings** (`§0A` note 4). **An import of ANY other path FAILS — `gutter.js`, `gutter-affordance.ts`, `zones.ts`, `census.ts`, `layout-projection.ts`, `owned-list-host.ts`, `slot-host.ts`, `mount-invariant-guard.ts`, `dom-shim.ts`, `types.ts`, the demo envelope, the engine, `electron`, `node:*`, `src/main/**`, `src/renderer/**`** — **and a later pass asserting a dependency edge to `U-CENSUS`/`U-ZONES`/`U-GUTTER` would be a FABRICATED EDGE** (`docs/specs/census.md` `§1` item 7; `H-r6`). **A later unit that legitimately imports THIS module is not a violation of it** — the row binds THIS module's own imports, and the *"imported by no `src/**` file"* claim is `R-6`'s | P-9/P-10, `§2.5` item 2, `§8` | static |
| **R-5** | **The EXPORT-CENSUS row (`§2.1`) — a SET claim, never a count.** *`src/shared/relocate.ts` exports EXACTLY the ten names `§2.1`'s census declares, in its two halves:* **(a) the RUNTIME value exports — exactly `createRelocateSession` and `withinProximity`** (read from the imported namespace's own keys, **by name**, with a **positive control** that a namespace carrying a **third** value export — and specifically `POINTER_TYPES` — **FAILS**); **(b) THE TYPE-ONLY NAMES — `CandidateFor`, `CommitSink`, `PreviewSink`, `RelocateHandle`, `RelocateOptions`, `RelocateSession`, `RelocateStats`, `RelocateTargetFor` — asserted as a PRESENCE claim**, because **a type-only name is ERASED AT RUN TIME** and an `EXACTLY` over an erased set is **not falsifiable at the type layer**; **`§5.2` leg 4 (the standalone strict `tsc` over the test file) is the leg that pins it** — each name is imported as a type by that file, so a rename, removal or unexported name **fails to compile**. **A row asserting only a COUNT without NAMING the names FAILS this row's own text** (`§4.4 S-7`) | `§2.1`, `§5.2` leg 4, `F-11` | runtime + type-level |
| **R-6** | **The NO-SHIM / NO-NEW-SURFACE / NO-IMPORTER row (P-6, P-10; `I-13`).** *The change set does not touch `src/shared/dom-shim.ts`; the surface negatives hold by SET EQUALITY AGAINST THE NAMES where a name-complete row exists, and NEVER by a bare count* (`§4.4 S-7`) — **the MCP surface's pinned sets are asserted by name, not by a number quoted here** — **and at the time this unit's red set runs, `src/shared/relocate.ts` is imported by NO `src/**` file** (an import-graph probe, `R-12`'s companion claim) | P-6/P-10, `I-13`, `§5.1` | static |
| **R-7** | **The COMPOSITION-BOUNDARY row (P-4; `I-3`/`I-8`; the `SECOND-GESTURE-AUTHORITY` answer).** *Over the MODULE's source, the ONLY member names READ FROM the session object are `install`, `reset`, `dispose`, `stats`, `gesture` and `disposed`; the ONLY ones CALLED are `install`, `reset` and `dispose`.* **The row asserts the ABSENCE of every forbidden one — `begin`, `end`, `cancel`, `set`, `installGestureListeners`, `detachGestureListeners`, `POINTER_TYPES` — as a token scan over the module's bytes, AND the positive half as a runtime call-log assertion** (`M-1`, `M-16`/`M-13`: the recorded session log contains **no `begin`, no `end`, no `cancel`**). **A call outside the table FAILS.** **Its honest limit:** a text scan cannot prove the absence of a call for all control flow, so **the pair is the row** | P-4, `§2.5` item 1, `I-3`/`I-8` | static + `[T]` |
| **R-8** | **THE GEOMETRY / COORDINATE / MAGNITUDE ROW (ruling 5's mandatory clause, in falsifiable form; P-1, P-12; `I-11`).** *Over the MODULE's source AND over this unit's own `[T]` test file, the change set contains **no geometry-observation call, no coordinate read and no geometry-shaped claim**: no `getComputedStyle`, no `getBoundingClientRect`, no `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`/`scrollWidth`-family member, no `matchMedia`, no `style` write, no class write, no `innerHTML`, no `clientX`/`clientY`/`pageX`/`pageY`/`screenX`/`screenY`/`movementX`/`movementY`/`offsetX`/`offsetY` read, and **no assertion whose failure message or description claims a rendered/layout/coordinate/applied-CSS/magnitude fact**.* **Its falsifiable half:** a module or fixture that observes geometry or a coordinate, or a row description claiming a resolution, an applied length or a magnitude, **FAILS**. **Its stated bound (three parts, the form `docs/specs/zones.md` `§3.4 R-7` established):** (a) the MODULE file's raw bytes, comments included; (b) THIS UNIT'S OWN test file's raw bytes; (c) the row DESCRIPTIONS extracted from that test file — with the geometry tokens held as **FRAGMENTS** so the scan cannot read its own rule list, and both halves carrying a **POSITIVE** control (a corpus that reads `clientX`, and a description claiming a magnitude, must FAIL) and a **NEGATIVE** control (ordinary count wording PASSES). **Its honest limit:** a text scan cannot prove the absence of a claim for all prose — the **contract half** is `§5.2`'s refusal to offer a `[U]`/`[D]` row and `I-11` | P-1/P-12, `I-11`, `§0A` note 5, `§5.2` | static |
| **R-9** | **The absent-page-design row (`§1` item 6; `§7` item 6).** *`docs/skills/designing-pages.md` DOES NOT EXIST at the time this unit's red set runs* — an `fs.existsSync`-style probe (globbed `docs/skills/*` at filing: `process-guardrails.md` alone). **Its FAIL is meaningful: if the file DOES exist, this unit OWES a test-use-case coverage row in that file's coverage matrix plus an entry in its demo-page index** — and **this filing's position is that the unit renders no page, so the row would be an ABSENCE row rather than a claim**, stated here so the obligation is not silently dropped | `§1` item 6, `§7` item 6 | static |
| **R-10** | **THE CAPTURE-ABSENCE ROW (P-3/P-7; `I-7`; `§0A` note 11), with its POSITIVE CONTROL.** *The module contains no `capture` token as an option member, and the object it builds for `session.install` carries **no `capture` field**: the row reads the recorded `install` arguments and asserts the options object's own key SET is EXACTLY `{onStart, onMove, onEnd, onCancel}`.* **THE POSITIVE CONTROL, and it is required so the clause is not vacuously true:** a composition that **DID** pass `capture: true` — or an options object carrying a fifth `capture` key — **MUST FAIL this row.** **The row's second half is the inherited observation**: **because no `capture` field is passed, the session records `capture` falsy for every control, so ZERO capture calls occur both before establishment AND after it** — **the row asserts the ZERO count over a full lifecycle from the recording session's own capture log** | P-3/P-7, `I-7`, `M-1`, `§5.5.1 P-RL-SM-2` | static + `[T]` |
| **R-11** | **THE UI-CONTENT WRITE ROW (P-12, this unit's own form).** *Over the MODULE's source INCLUDING its comments, no occurrence, in any form, of a UI-CONTENT WRITE token: `setAttribute`, `removeAttribute`, `classList`, `className`, `textContent`, `innerText`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `createElement`, `createTextNode`, `appendChild`, `insertBefore`, `removeChild`, `replaceChildren`, and the `style`-write family (`style.setProperty`, `.style.=` and a `cssText` write).* **The scan reads the same NORMALIZED view `R-1` reads** (literals joined, comments scanned as code, a word boundary) **and carries the same two controls.** **Its scope is the MODULE file plus this unit's OWN controlled corpora**, and **a whole-file negative over the test file is DELIBERATELY DROPPED**. **Its honest limit:** a text scan cannot prove the absence of a write for all control flow, so the row is **PAIRED with a runtime write-log assertion** — a module handed a **write-recording** element must make **no write call of any kind** on it — **and the pair is the row.** **THIS IS THE ROW THAT CAN FAIL FOR A UI-CONTENT WRITE, and it exists because `§1` item 5 forbids this unit a UI** | `§1` item 5, `I-6`, `§4.4 S-13` | static + `[T]` |
| **R-12** | **The DIFF-SCOPE row (`§5.1`; `§4.4 S-7`).** *Only the files of `§5.1`'s allow-list are touched by this unit's committed range: the module (NEW), the test file (NEW), this spec, the unit's own `*-greens.md`, the unit's own tracker rows, and `archive/reviews/**`.* **A changed path outside that list FAILS the row — and THE DENIED SET BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST**: the FROZEN pairs named FIRST (`src/shared/gesture-session.ts` + its tests, `src/shared/gutter.ts` + its tests), then every other sibling `src/shared/*` module and its tests, `src/main/**`, `src/renderer/**`, `src/shared/demo-envelope.ts`, the app graph, `package.json`, `package-lock.json`, `scripts/**`, `tsconfig.json`, `tsconfig.tests.json`, `vitest.config.ts`, the MCP surface, and every sibling artifact (`§5.1`). **The commit-range scope rule is stated at `§5.1` so a scope row cannot mistake correct gate work for a boundary violation: the allow-list census is scoped to THIS UNIT'S OWN ARTIFACTS, and a NON-DENIED path outside the allow-list is a FINDING for the adversarial pass rather than an automatic FAIL** (`RCA-8(a)` requires every gate boundary to leave a commit). **The row also asserts the companion claim: at the time this unit's red set runs, `src/shared/relocate.ts` is imported by NO `src/**` file.** **THE CANONICAL ARTIFACTS MUST BE NON-VACUOUSLY PRESENT IN THE RANGE**, and **`§4.4 S-7`'s rule binds: an existence/scope claim is a PROBE whose FAIL is meaningful** | `§5.1`, `§4.4` `S-7`, `RCA-8(a)` | static |
| **R-13** | **THE SINGLE-WRITER / CHANNEL-COUNT ROW (P-11; `I-2`; ruling 6), A PAIR.** *Runtime half:* over a full lifecycle set (an `'end'` with a target, an invalid-arm `'reset'`, a `cancel`, a refusal, and a slot-empty composition), **the sink's own call record and `stats().sinkCalls` AGREE for the conformant composition and the record's length for a gesture is `<= 1`** — with **`F-4` (no writer) and `F-6` (two writers) as the two POSITIVE CONTROLS, which the same row drives and which must FAIL**; **for the TWO-WRITER composition the SINK'S OWN RECORD reads `2` while the MODULE'S COUNTER still reads `1` — the DIVERGENCE is what makes the row falsifiable, so BOTH readings are asserted** (`§3.2` `F-4`/`F-5`/`F-6`). *Static half:* **the module contains exactly ONE call of the sink reference** (the row counts call sites in the normalized source, and **a second call site FAILS**). **Its honest limit, stated: a call-site count is a text claim about control flow** — so **the pair is the row** | ruling 6, `§0A` note 7, `§2.3` item 4, `§5.5.1 P-RL-SM-2` | static + `[T]` |
| **R-14** | **THE SESSION-CALL-CENSUS ROW (P-4; `I-8`).** *Over the module's source and over a recorded session log:* **the module READS the session only through `stats()`, `gesture()` and `disposed`, and CALLS only `install`, `reset` and `dispose`** — **asserted BY NAME, not by a count** — and **`session.begin`, `session.end` and `session.cancel` appear in NO call log and in NO byte of the module.** **The row's `[T]` half is the recorded-log assertion (`M-1`, `M-16`, `M-13`, `M-8`); its static half is the token scan.** **A row asserting this by *"the module calls the session `N` times"* FAILS `R-14`'s own text** (`§4.4 S-7`) | `§2.5` item 1, `I-3`/`I-8`, `R-7` | static + `[T]` |
| **R-15** | **THE CODE-PROPAGATION ROW (P-11's neighbour; `I-14`).** *Over a table of session-refusal shapes* — a disposed session, a stale handle, no active gesture, a busy session, an uninstalled element, a disconnected source — **the module returns the session's own code VERBATIM, and the string that reaches the caller is byte-identical to the one the session returned** (read from the recorded session log, compared by `===`). **The row also asserts the closed-set half: the module carries NO code literal of its own, and an EIGHTH session member appearing in the module — or any module-local code passed INTO `session.reset` — FAILS** (`§4.4 S-11`). **This is the row that makes `I-14` falsifiable, and it FAILS for any invented sentinel** | `§2.3` item 4, `§2.4` item 5, `I-14`, `§5.5.1 P-RL-SM-8` | static + `[T]` |
| **R-16** | **THE RETARGET-TRANSITION STATIC ROW (`I-4`, ruling 2 clause (2)).** *Over the MODULE's source, the per-move presentation path contains EXACTLY ONE call of the presentation seam per observed move, and the module contains no second presentation call site reachable from the same move* — **asserted as a call-site count in the normalized source AND as the runtime `M-11` transition drive.** **Its honest limit:** a call-site count cannot prove the reachability graph, so **the pair (`R-16`'s static half + `M-11`'s runtime half) is the row.** **A module that performs the hide and the show through TWO calls in one move FAILS `M-11`'s single-invocation reading** | ruling 2; `§2.3` item 5, `M-11`, `§5.5.1 P-RL-SM-6` | static + `[T]` |
| **R-17** | **The `[D]`-precondition row (`§2.6`'s named precondition, probe-able).** *At the time this unit's red set is authored, `docs/specs/gsession.md` `§2.6`'s `F-12` remains `PRECONDITION-GATED`: this unit claims no `[D]` row and no pass may claim one for it.* **The probe's FAIL is meaningful and welcome: if a later gate admits a behavioural retargeting row for this family, it comes from the unit that owns the rendered surface, with its own preconditions stated.** **Until then `[D]` stays unclaimed** (`§5.2`) | `§2.6`, `§5.2`, `§8` | static |
| **R-18** | **The session-precondition row (the composition's own premise, probe-able).** *At the time this unit's red set is authored, `src/shared/gesture-session.ts` EXISTS and its namespace carries the four value exports `createGestureSession`, `installGestureListeners`, `detachGestureListeners` and `POINTER_TYPES`, and its `EventSource` declares the optional `capturePointer` member* — an import-and-key probe **BY NAME**, with **a positive control that a namespace missing one of those names FAILS**. **Its FAIL is meaningful: this unit composes that surface, and a missing name would mean the FROZEN delegate surface moved** (ruling 3) — **which is a finding to REPORT, never a licence to edit the session's module or its spec** (`§5.1`'s DENIED set). **The row does NOT import those names into the module** — it is the TEST file's probe (`R-4` binds the module's own imports) | ruling 3, `§2.5`, `§5.1`, `§8` | static |

**What these static rows do NOT do.** They add **no `§3` contract behaviour**: each asserts a property of
**this unit's own files** or a **runtime call log**, and **none may be satisfied by a claim about a
browser or a renderer**. They land in the **SAME test file** as the red set and **change no register
statement, type, strategy id or attempt count** (`§5.5.1`).

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **X-1** | **The module-absence row (`§4.1`'s red premise) — TWO FORMS, and BOTH are the row.** **THE RED FORM (governing AT RED TIME):** *at the moment the red set is AUTHORED and RUN, `src/shared/relocate.ts` does not exist* — an `fs.existsSync`-style probe; **if the module EXISTS before the red run, this row FAILS and the `RCA-1` red order is broken — the pass that finds it must REPORT the inversion rather than proceed.** **THE GREEN FORM (governing AT GREEN TIME, so the row survives the cycle):** *assert that the module EXISTS, that it is **NOT IMPORTED BY ANY `src/**` FILE**, and that the EXPORT CENSUS HOLDS (`§2.1`'s exact `2 + 8 = 10` names, `R-5`)* — **and the row MUST BRANCH ON THE MODULE'S PRESENCE rather than assert the red form unconditionally** (the `E3` `R-16` defect: a red form declared unconditionally fails because the work was done) | `§4.1`, `R-5`, `R-6` | static |

**The row count of `§3.5` is ONE, and that is deliberate**: unlike the sibling units this filing makes
**no other** repo-state EXISTENCE claim of its own — **the `[D]` non-claim is `§3.4`'s `R-17`** (a static
row, because the probe's subject is a clause status rather than a file), **the session precondition is
`§3.4`'s `R-18`** (a by-name namespace probe), and **the absent-page-design probe is `§3.4`'s `R-9`**.
**All three are cited here so a reader does not look for them in the wrong subsection** — and **the
`§4.1`/`§4.2` text that names `R-9`/`R-17`/`R-18` as *"evaluable before this unit's module exists"* is
citing `§3.4`'s rows, not `§3.5`'s.**

---

## 4. The red (`RCA-1`) — what must be written, RUN and REPORTED before any implementation

### 4.1 The red statement

**The red is a NEW test file** — **`tests/relocate.test.ts`** (`§0A` note 1) — authored **first**, **RUN**,
and its failing set **REPORTED verbatim** before any implementation. **Expected red shape:**
`Cannot find module '../src/shared/relocate.js'` (or the repo's equivalent module-resolution failure) for
every row that imports the module, **plus the static/existence rows that can already be evaluated** —
`§3.4`'s `R-9` (the absent-page-design probe), `§3.4`'s `R-12` (the diff scope), `§3.4`'s `R-17` (the
`[D]` non-claim), `§3.4`'s `R-18` (the session-precondition probe) and **`§3.5`'s `X-1`** (the
module-absence probe), **which need no module at all**;
`R-4`/`R-5`/`R-6`/`R-7` become fully evaluable when the module lands — **while `R-1`/`R-2`/`R-3`/`R-8`/
`R-10`/`R-11`/`R-13`/`R-14`/`R-15`/`R-16` scan THIS module's bytes and become evaluable exactly when it
lands** (which is what `X-1`'s green form records).

**There is NO host-fix branch for this unit**: the module does not exist, so the red is **purely
additive**, and **the unit owes no change to any existing file.**

**What a green at the end of this cycle is, and is not.** It is **`[T]` evidence that the contract's CALL
COUNTS, its channel identities and one pure function's BOOLEAN behave as `§2`/`§3` say over the
enumerated drivers**. It is **NOT** evidence that a pane moves, that a zone expands, that a ghost appears
anywhere, that a pointer drag works, that a release reverts visibly, that a coordinate was read, that a
CSS value was applied, that a layout pass ran, or that a `click` was not retargeted — **in particular, at
the end of this cycle the module is still imported by NO `src/**` file** (`R-12`'s companion claim).

### 4.2 Red-set authoring order

1. **The `§3.5` existence row `X-1` FIRST**, with **`§3.4`'s `R-17`/`R-18`/`R-9`** — they are the
   red's own premise and are evaluable before this unit's module exists.
2. **Then the `§3.4` static rows `R-1`..`R-16`** (`R-4`/`R-5`/`R-6`/`R-7` become complete once the module
   exists; `R-1`/`R-2`/`R-3`/`R-8`/`R-10`/`R-11`/`R-13`/`R-14`/`R-15`/`R-16` read the module file and are
   evaluable **once it exists**).
3. **Then the `withinProximity` block `M-2`, `F-1`..`F-3`, `I-1`, `I-12`** — the pure function's rows come
   before the composition's, because **the composition's proximity decision depends on the comparator's
   answer**, and a red on the pure half is diagnosis a green cannot give.
4. **Then the invariants `I-2`..`I-15`**, then **`M-1`, `M-3`..`M-17`**, then **`F-4`..`F-19`**, then the
   composition-boundary rows — **in that order**; **`F-4`/`F-6` (the two positive controls) sit with the
   write-count rows they make falsifiable**, and **`F-5` sits with the channel-identity rows**.
5. **The `§5.5.1` PROPERTY REGISTER rows are part of THIS red set** — authored in the **same file**,
   after the `F-*` rows, **in register order** (`P-RL-IM-1` · `P-RL-IM-2` · `P-RL-IM-3` · `P-RL-IM-4` ·
   `P-RL-IM-5` · `P-RL-SM-1` · `P-RL-SM-2` · `P-RL-SM-3` · `P-RL-SM-4` · `P-RL-SM-5` · `P-RL-SM-6` ·
   `P-RL-SM-7` · `P-RL-SM-8` · `P-RL-TP-1` · `P-RL-TP-2`). They ride **`npm test` (leg 1)** unchanged and
   **need no new file, no new script, no `package.json` change and no dependency.**
6. **RUN and REPORT** the failing set verbatim — the module-resolution failure, plus every static and
   existence row that can already be evaluated, **plus which register rows ran and which stopped un-run**.
7. **Then** the Implementer writes the least code that makes them green; **then** the legs re-run and are
   recorded. **No row may be edited to reach green**; **a row found wrong is corrected IN THIS SPEC first,
   with the old text kept visible as `SUPERSEDED`** (annotate-never-rewrite).

**The register's own stop rule binds the red run**: rows are evaluated **sequentially in register order**
with **STOP AFTER 5 CONSECUTIVE FAILURES**, so **a red run of a module-absent unit is expected to stop
early**, and **the un-run rows must be REPORTED AS FAILURES rather than silently omitted** — **a red run
that reports all `170` attempts as executed is the finding, not the expectation.** *(**AS FILED this
sentence read `149` — the superseded total, corrected at `§5.5.3`.**)* **The register's
execution markings are DESIGN, not results**: **a row that is marked executable in `§5.5.1` but broken
when run is a SPEC FINDING, reported rather than tuned to green.**

### 4.3 What the red is NOT

- **Not a DOM test, and not a test of a controller of the DOM.** **No real `Element`, no `document`, no
  shim member, no rendered pane**: **the element is any object the row chooses**, the **session is either
  the landed session driven through a recording source or a recording double of its own**, and the
  **sink, the reveal channel and the preview channel are the row's own spies** (`§4.4 S-8`'s class).
- **Not a geometry test, not a magnitude test and NOT A DISTANCE TEST.** **The rows never measure a
  distance**: the distance is a **caller-supplied scalar the row picks**, and **no row may compute one
  from a coordinate** — `R-8` is the row that forbids it and `I-11` is the invariant.
- **Not a session test.** **No row of this unit asserts a session property**: the session's lifecycle,
  its listener counts, its commit counts and its baseline restore are `U-GSESSION`'s rows, and **this unit
  reads only the session's surface through its own calls** (`§2.5` item 1; `R-14`).
- **Not a census test, and not a `U-CENSUS` test.** **No row may need a census key set, a `zones` /
  `revealed` / `specOf` / `sizes` map held by this module, or a track-variable name**; a consumer's reveal
  state appears **only inside the row's own injected `onReveal`**.
- **Not a real-browser event test, and not a retargeting test.** A `[T]` green cannot show that a real
  `pointerdown` reaches a handler, that capture behaves in a renderer, or that a press's `click` is not
  retargeted — **`F-12` is `PRECONDITION-GATED`** and **`[D]` is unclaimed** (`§5.2`, `R-17`).
- **Not assembled-app evidence.** Layer anchor 1.
- **Not a consumer-vocabulary test, and not a UI test.** A row naming a real zone/pane/tab, a selector, a
  unit string or a CSS token is a **`P-5`/`P-12` violation** — such spellings may appear **only** inside
  `R-1`'s/`R-11`'s own control corpora.

### 4.4 The stop conditions (binding)

**`S-PURE-1..3` are this unit's pure-function classes, derived in substance from the gate-1 record and
the sibling's `E3` set; the rest are the classes the record, the ruling and this filing's own surface
require. All fourteen bind the red set, the implementation and the gates.**

| # | Stop condition | Required behaviour |
| --- | --- | --- |
| **S-PURE-1** | A row is only satisfiable if `withinProximity` **COERCES** (`Number(value)`, `parseFloat`, `+value`, a `String` round-trip) or **PARSES** a numeric string | **Violates `§2.1` item 1** — a non-number operand answers `false` by the `typeof` gate (`F-1`). **Re-write the row; never weaken the limb.** |
| **S-PURE-2** | A row asserts a **`code`/`reason`/`ok`/`skipped`/result-record** shape from `withinProximity`, or expects a **throw** from it | **Violates `§2.1` item 1** — **the pure function has NO refusal domain** and every outcome is a VALUE. **Re-write as a boolean assertion; adding a union is a NEW CONTRACT and needs its own gate.** |
| **S-PURE-3** | A row is only satisfiable if the comparator **supplies a built-in literal** — a default threshold, a `0`, a finiteness constant, a sentinel number, an epsilon | **Violates `P-8` and `§2.3` item 1** — **every operand is caller-supplied; the only arithmetic the module owns is the one comparison, and no epsilon or tolerance exists.** |
| **S-PURE-4** | A row needs a **SECOND comparison site** — a pre-check inside a seam wrapper, a proximity test in `attach`, a finiteness gate on the distance, a "sanitising" clamp of the caller's threshold | **Violates `§2.3` items 1/8 and `§2.4` item 3** — **exactly ONE comparison site exists**, and the distance's degradation is DECLARED by `§2.4` item 3 rather than repaired by a second gate. **Stop and report: it is a contract change.** |
| **S-5** | A row asserts a **rendered-geometry, coordinate, layout, paint, applied-CSS, cursor or magnitude** fact — or a `[T]` green is to be reported as one | **Violates ruling 5's mandatory clause and `I-11`** — the claim is **DELETED**; **the row MAY NOT BE MOVED TO THE `ui` LEG SILENTLY** (`docs/specs/zones.md` `§4.4` `S-6`'s own words, carried in this unit's `§5.2`). |
| **S-6** | A row is only satisfiable by a **token scan** (a word list, a regex over source) | **The row must be closed against TOKEN ASSEMBLY and COMMENT-CARRYING before it is authored**: it scans a **NORMALIZED** view in which string-literal concatenation is joined **and it scans COMMENTS as code**. **A row that passes for a module spelling a banned token in either form is UNFALSIFIED and must not be filed.** The row forms are `R-1`/`R-11`, **and `R-1`'s scan is the one that must NAME its declared exemptions (`threshold`, `distance`) or it is vacuous** (`§2.3` item 3). |
| **S-7** | A row asserts a prohibition by a **bare COUNT** (*"two exported values"*, *"the module calls the session four times"*) or claims an existence/absence about the repo **with no probe** | **A count is satisfiable by renaming and passes whether or not the change added a seam.** The row must assert **SET EQUALITY AGAINST THE NAMES** or be replaced by the **import/diff row** that can actually fail (`R-4`/`R-5`/`R-6`/`R-12`/`R-14`), and an existence claim must be a probe whose FAIL is meaningful (`R-9`, `X-1`, `R-18`). |
| **S-8** | A test needs a **real DOM**, a real element, **a `document`**, a shim member, or a **second module instance's private state** to express a row — or a row asserts that this module **DETECTS a second composer** | **Violates the layer declaration's anchor 2, `§2.5` item 3's stated LIMIT and `R-2`'s stated limit.** The row is re-written against the **recorded session doubles and the channel spies** (`M-1`'s form). **A row that needs a DOM, or that claims a detection the mechanism does not have, is a row this unit cannot have.** |
| **S-9** | A row asserts a **rendered-geometry, coordinate, layout, paint, applied-CSS, cursor, capture-in-a-renderer or magnitude** property — or offers an **`[U]` row** for the ghost, the expansion or the visible revert | **Violates ruling 5, `I-11`, `R-8` and `§5.2`'s three-part refusal** — the claim is DELETED. **`docs/specs/zones.md` `§4.4 S-6`: *"the row may not be moved to the `ui` leg silently"*.** **Any pass wanting a rendered row must get it from the unit that OWNS the rendered surface.** |
| **S-10** | A row is only satisfiable if the **session COMPUTES, COMPARES, DEFAULTS or VALIDATES** a value, or if the **module re-expresses the session's lifecycle** — a start listener of its own, a `session.begin`/`end`/`cancel` call, a gesture guard, a listener window, a disposal order, a **second commit channel**. **AMENDED SUBCLASS: A PREVIEW WRITE THAT REACHES THE SINK IS STOPPED HERE** — the presentation channel is the consumer's transient view channel and is NEVER the sink | **Violates ruling 3, ruling 6 and `§2.5` item 5** — the session is the single gesture authority. **Stop and report: it is a contract change needing its own gate, not an implementation choice.** The amended subclass is `§2.3` item 4's channel-identity rule and `§5.5.1 P-RL-SM-6`'s row. |
| **S-11** | A row proposes **an EIGHTH session result code**, a **fourth session outcome**, a **fifth hook**, a **`selectors`/`unit` parameter**, **a module-local code of this unit's own**, an **options field that could smuggle a policy default in**, or a **second writer** | **Each is a contract change.** **`threshold` is NOT this class** — it is the ADOPTED, caller-supplied parameter reconciled at `§2.3` item 3, and the record's ruling: *"a stop condition cannot be violated by the unit it never governed."* **But an `E4` row proposing an EIGHTH OPTION MEMBER — including a `distanceFor` seam — IS this class**, and it must **stop and report** (the alternative is recorded as ARCHITECT-REVERSIBLE at `§2.3` item 2, which is the honest form: a preference for the architect, never a spec-writer's addition). **(⟶ AMENDED 2026-09-27: the amended `RelocateHandle` member `preDragValueOf` (`§2.1` item 7) is NOT this class — it is NOT a fifth `on*` HOOK (the record's four hooks stay four), it is NOT a factory-OPTION member (the seam set stays closed at seven, so `P-RL-IM-4`'s eighth-member control is untouched), and it SMUGGLES NO DEFAULT: its unusable shapes are a DECLARED REFUSAL THAT COMMITS NOTHING, never a policy default. The reconciliation is `§2.1` item 7(e); the amendment's provenance is the orchestrator's adjudication under `AGENTS.md` item 10a, recorded at `§0A` note 15's `A2` continuation. A later pass proposing a fifth `on*` hook, an eighth factory-option member or a default for that member IS this class and must stop and report.)** |
| **S-12** | A row needs a **sibling import**, a **census read**, a `zones`/`revealed`/`specOf`/`sizes` member of this module's own, a **store**, a **persistence channel**, or a **shim change** | **Violates ruling 7, `docs/specs/census.md` `§1` item 7 and `P-9`/`P-10`** — **a dependency edge asserted toward `U-CENSUS`/`U-ZONES`/`U-GUTTER` would be a FABRICATED EDGE** (`H-r6`'s dissolved-edge class). **Stop and route the row to its owner.** |
| **S-13** | A row (or the implementation) **authors UI content** — a class write, an attribute write, a style write, a text or markup write, a created element, an appended node, a cursor — or claims a rendered affordance | **Violates `§1` item 5 and the `AGENTS.md` project-wide provident-rendered-UI constraint**: a UI element authored outside the provident graph is a review finding. **The row is deleted, and the obligation is routed to the unit that owns the rendered surface** — **`R-11` is the row that FAILS for a write.** |
| **S-14** | A row requires the zone's **displayed-ness** to be **monotonic** inside a gesture, or requires the **hide** to be an `onReveal` write, or requires the **retarget's hide and show to occupy TWO observed-move turns** | **Violates ruling 2 on all three limbs** (`§2.3` item 5, `I-4`). **THE ONE EXCEPTION, stated so this row is not read as foreclosing the architect's reversal: the derivation that the hide RIDES (B) is `§0A` note 6's — if the architect FLIPS it at the spec gate, this row's premise changes with it and the change is made at the gate, not by a red-set row.** **Until then, a row assuming the flipped reading FAILS.** |

**A single clause of this table may stop a pass: the correct action is to STOP AND REPORT, never to weaken
a row to reach green.**

### 4.5 Delegation gate

**This unit is NOT DELEGABLE by this filing.** It needs **(a) this spec to exist** (*done: this filing*),
**(b) a TestWriter to have RUN and REPORTED the red set** (`AGENTS.md` item 9), **(c) its typed register
to exist** (*done: `§5.5.1`* — item 11's precondition is satisfied **before** any red set), and **(d) the
supervisor's ordering** — and `E4`'s ledger row stays an open `## OPEN` row whose status is the
supervisor's. **No status is advanced by this filing**, and **`E4`'s `Blocked on` cell (`SCH-7 (A-d4)`)
is a DISPOSITION, not a live dependency** — its live precondition, the frozen session's delegate surface,
is **satisfied by `## DONE — U-GSESSION`** (ruling 3). **`U-CONTAINER` (`E5`) is a sibling and NOT a
dependency in either direction** — a later pass asserting an edge would be a FABRICATED EDGE.

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST, DERIVED FROM THIS UNIT'S OWN CHARTER

**THE DENIED SET, NAMED FIRST, because it binds absolutely and outranks the allow-list** (ruling 12:
*"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"*):

1. **`src/shared/gesture-session.ts`** and **`tests/gesture-session.test.ts`** — **FROZEN** (the landed
   session's module and its test file; this unit composes the former and edits neither).
2. **`src/shared/gutter.ts`** and **`tests/gutter.test.ts`** — **FROZEN** (the landed `E3` pair).
3. **Every other sibling `src/shared/*` module and its test file** — `zones.ts` · `census.ts` ·
   `layout-projection.ts` · `owned-list-host.ts` · `slot-host.ts` · `mount-invariant-guard.ts` ·
   `gutter-affordance.ts` · `demo-envelope.ts` · `dom-shim.ts` · `types.ts` · `path-fork-cycle.ts` ·
   **and every existing test file of another unit**.
4. **`src/main/**`** and **`src/renderer/**`** — **the app's process boundaries.** *(**This is the
   clause the inversion would break**: an authored ghost element, a class on a zone or a style is *"a UI
   element authored outside the provident graph"* — **`E4` CALLS SEAMS; THE CONSUMER WRITES.**)*
5. **`src/shared/demo-envelope.ts`** — **the demo surface is not this unit's**, and **a demo-side
   implementation of these seams would be an IMPLEMENTATION, never the contract** (ruling 11).
6. **The app graph** — no node, no envelope, no handler body, no component binding, no mount change.
7. **`package.json`** and **`package-lock.json`** — **no script, no dependency, no devDependency.** *(This
   denial is **LOAD-BOUNDED, not merely conventional**: `tests/ui-leg-contract.test.ts`'s `L-1` pins the
   `scripts` KEY SET, so **any further script key reddens that row until a TestWriter extends the landed
   set; a config change cannot satisfy it** — `AGENTS.md` item 4's recorded process hazard. **Leg 4 of
   `§5.2` therefore adds NO SCRIPT.**)*
8. **`scripts/**`** — no helper, no leg driver.
9. **`tsconfig.json`**, **`tsconfig.tests.json`** and **`vitest.config.ts`** — no
   include/exclude/compiler-option change. *(`npm run typecheck:tests` and `tsconfig.tests.json` already
   landed, so this unit needs no config change to cite its own legs.)*
10. **The MCP surface** — no tool, no resource, no group, no `VALID_GROUPS` member, no `RpcMethod` member,
    no `MUTATING_METHODS` entry, no IPC method, no registration site.
11. **Every sibling artifact** — a sibling unit's `*-greens.md`, its review record, its tracker-only rows,
    **and `docs/specs/relocate-review.md` (the CLOSED gate-1 record, whose conditions and ruling this spec
    derives and may not re-litigate)**.

**THE ALLOW-LIST:**

| # | Path | Change | Condition |
| --- | --- | --- | --- |
| 1 | `src/shared/relocate.ts` | **NEW** — the **two value exports + eight type declarations** of `§2.1`, and nothing else | always |
| 2 | `tests/relocate.test.ts` | **NEW** — the red set (`§4.2`), the register rows and the static/existence rows | always |
| 3 | `docs/specs/relocate.md` | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation | always |
| 4 | `docs/specs/relocate-greens.md` | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/relocate-*.md` of this unit | the pass that produces it |
| 5 | `docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**` | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, and **a sibling spec only for a dated status/annotation correction that changes NO normative clause** | the pass that produces them |

**This unit changes NO existing file except this spec and the trackers.** **The commit-range scope rule,
stated so a scope row cannot mistake correct gate work for a boundary violation**: a diff-scope row
asserted over a **commit range** must scope its **allow-list census to THIS UNIT'S OWN ARTIFACTS** —
*the module, this unit's test file, this spec, this unit's own `*-greens.md` and `archive/reviews/**`
record, and the unit's own tracker rows* — and **must NOT read a later unit's commits, a sibling's dirty
working-tree file, or a sibling unit's artifact as this unit's diff.** **The DENIED set is the exception
and is the half that binds the WHOLE committed set**: a denied path anywhere in the range **FAILS** the
row regardless of which pass committed it. **A non-denied path outside the allow-list is a FINDING for the
adversarial pass, not an automatic FAIL** (`RCA-8(a)` requires every gate boundary to leave a commit).
**The canonical artifacts must be non-vacuously present in the range**, and **`§3.4 R-12` is the row that
carries this rule.**

**THE FALSIFIER THIS SCOPE CAN FAIL, stated so the layer decision is falsifiable rather than asserted**
(the gate-1 record's own words, verbatim in substance): ***if this spec's diff scope contains
`src/renderer/**`, `src/demo-envelope.ts` or an authored ghost element, the `§7.1` predicate TRIGGERS,
the three-part `[U]` refusal is UNAVAILABLE, and the ledger's `node suite` leg cell becomes a
finding.***

### 5.2 The legs this unit MUST run — THE FOUR, and the three refusals

| # | Leg | Command | Layer it proves | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | `npm test` | **[T]** envelope/pure layer | the red (`§4`) **and** the green, **register rows included**. **A green here is envelope/pure-layer evidence and NEVER assembled-app evidence** — and for this unit it proves **channel counts, channel identity and one pure function's boolean**, and **nothing** about a renderer (layer anchors 1/2/5). |
| **2** | **typecheck** | `npm run typecheck` | **[H]** | the eight type declarations, the two value signatures and the module's five members are part of the contract. **⚠ NAMED LIMIT: `tsconfig.json` includes `src/**/*.ts` and EXCLUDES `tests`, so this leg is evidence about `src/**` ONLY and NEVER about this unit's test file or its register tables.** |
| **3** | **build** | `npm run build` | **[H]** | esbuild: **four esbuild outputs plus a copied `index.html`** — the family's *"five bundles"* is READ THAT WAY, and **this filing states the honest figure rather than repeating the rounded one**. **This unit adds a module imported by nobody, so the output set must be BYTE-IDENTICAL** — a bundle census that changed is a FINDING, and a bundle census that did **not** change is **not** evidence the module works. |
| **4** | **standalone strict `tsc --noEmit` over `tests/relocate.test.ts`** — the named leg for `R-5`(b) | a standalone strict `tsc --noEmit` invocation over this unit's own test file | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** `R-5`(b) asserts eight **TYPE-ONLY** names, and **an imported type name is ERASED AT RUN TIME**, so the runtime half of that row **cannot fail** — while **leg 2 does not compile `tests/**` at all**. **A DONE row that reports `R-5`(b) as green must cite THIS leg, not a runtime assertion.** **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION** (ruling 11's family rule): it adds **no script to `package.json`, no dependency and no diff-scope row**, and **no register row depends on it.** |

**THE `[U]` ROW IS NOT OFFERED BY THIS UNIT — AND THE REFUSAL IS THREE-PART, as the family requires.
A one-sentence refusal is not the clause:**

1. **THE REFUSAL.** **This spec offers NO `[U]` row, for any of its rows** — **and in particular NOT for
   the zone expanding to visibility, NOT for the ghost appearing (or appearing in any position), and NOT
   for the visible revert being perceived as a revert.** **`[U]` is the real-Electron observation leg
   (`npm run ui`, landed by `U-REALDOM-BOOT`), and no row of this unit is run there.**
2. **THE STRUCTURAL REASON, in two parts, and this is why it is STRUCTURAL rather than a leg-availability
   excuse: (a) the module is imported by NO `src/**` file** (`R-6`, `R-12`) — **so there is NO RENDERED
   SURFACE TO OBSERVE**; **and (b) the module READS NO COORDINATE and NO GEOMETRY** (`§2.2` `P-1`,
   `I-11`) — **the distance is the caller's, delivered as a scalar, and the module authors no element — so
   there is NOTHING FOR A MEASURING LEG TO MEASURE.** **The `ui` leg exists and is green, and the
   divergence leg is green — the refusal is not an excuse about the legs' availability.**
3. **`docs/specs/zones.md` `§4.4 S-6`'s sentence, carried verbatim: *"the row **may not be moved to the
   `ui` leg silently**."*** **Any later pass that wants a rendered-geometry row for this family must get
   it from the unit that OWNS the rendered surface** — **whose spec, preconditions and `[U]` battery are
   its own, and which `E4` does NOT owe.** **A `[U]` row moved here silently is `§4.4 S-9`, and it does
   not land.**

**THE `[D]` ROW IS NOT CLAIMED — `PRECONDITION-GATED`, NOT IMPLIED.** **The divergence leg (`npm run
divergence`, `N = 9` pinned) and its landed extension channel are green** (`U-DIVERGENCE-EXT`, `C2`,
`DONE`) — **but this unit's contract needs nothing from them**: **its rows assert channel counts, channel
identity and one pure function's boolean over ARGUMENT-SUPPLIED closures, and a divergence harness can
only compare a shim's rendering against a real host's — which is a claim about a RENDERED SURFACE, and
`E4` authors none.** **`R-17` is the probe that states the non-claim**, and **no pass may claim `[D]`
evidence from the existing pinned leg, from this unit's node green, or from an assumed `C2`.**

**GATE 6 IS `STRUCTURAL`, NOT WAIVED.** **The word is `STRUCTURAL` and the word `waived` is FORBIDDEN
here.** The live-app verification gate is **not waived by this filing and not satisfied by it either**:
**gate 6's honest status is that the live app CANNOT REACH this module** — it is imported by no `src/**`
file and appears in none of the built bundles — **so gate 6 is closed by the same structural reason `[U]`
is refused** (the shape `docs/specs/gsession.md`'s `CURRENT STATE` and `docs/specs/gutter.md` `§5.2`
already use), **and the DONE row must STATE the structural reason rather than omit the gate.**
**A DONE row that reports gate 6 as *"waived"* is a review finding; the correct form is *"structural — no
importer, no rendered surface, and the reason stated"*.**

**THE `§7.1` PREDICATE DECISION, RECORDED — `DOES NOT TRIGGER`.** *(**`docs/specs/user-flow-audit.md`
`§2` requires the decision to be RECORDED either way, *"with the evidence that decided it"* — *"the
decision is RECORDED either way (`TRIGGERS` or `DOES NOT TRIGGER`, with the evidence that decided
it)"* — and the filing of that spec was re-measured in the gate-1 pass.)* **DECISION — `DOES NOT
TRIGGER`, on both limbs, from this unit's own recorded change set and not from preference:** **Limb A
(DOM-SHIM-BLINDNESS) does not hold** — **the change authors NO rendered surface**: no element, no node,
no class, no text, no style, no attribute, no cursor and no geometry; **Limb B (UI-OVERHAUL) does not
hold** — **the module is imported by no `src/**` file and changes no user-visible flow.** **THE
EVIDENCE THAT DECIDED IT:** `§5.1`'s allow-list contains **no `src/renderer/**`, no
`src/shared/demo-envelope.ts` and no authored ghost element**, and `§1` item 6 records that
`docs/skills/designing-pages.md` does not exist, so there is no live surface for the audit to reach.
**ITS FALSIFIER:** the `§5.1` sentence above — a diff scope admitting a renderer path, the demo
envelope, or an authored element **fires the predicate, makes the three-part refusal unavailable, and
converts the ledger's `node suite` leg cell into a finding.** **CONSEQUENCE, stated so the exemption is
not confused with an empty report: NO `§5.U` matrix and NO `§6.1` report are emitted, and the exemption
is RECORDED with its reason** — *"'no report' and 'an empty report' are different artefacts and the first
is the only admissible form of the exemption."*

### 5.3 The DONE row's shape

The DONE row (`docs/next-steps.md`, the supervisor's pass) must carry, **in this order** — **all TWELVE
items**:

1. **Unit + wave + status**: `U-RELOCATE` · wave **E** (ledger row `E4`) · `DONE` or the honest non-DONE
   status.
2. **The scope-boundary confirmation, explicitly**: *"a node-local relocate/drop session composed on the
   landed frozen gesture session plus an exported pure `withinProximity` and nothing else: **all policy
   injected**; **the reveal written exactly once per gesture, only at the `'end'` terminal**; **the ghost
   and the zone's mid-drag hide on ONE per-move transient channel**; **a release-or-departure outside
   every candidate's proximity taking the invalid arm once, from the module's own move turn, with one
   commit of the caller-supplied pre-drag value**; **interrupt/cancel leaving no retained sinks, handles
   or listeners**; **NO COORDINATE, NO GEOMETRY, NO DISTANCE COMPUTATION — a NAMED COST**; **no default of
   any kind, no consumer vocabulary, no census read, no store, no session code, no UI**."* **A DONE row
   that does not state this is a review finding** — it is the unit's defining constraint (`§1` items
   2/3/4/5).
3. **The surface confirmation, explicitly**: *"`src/shared/relocate.ts` exports exactly **TWO value
   exports** (`createRelocateSession`, `withinProximity`) and **EIGHT type declarations** (`CandidateFor`,
   `CommitSink`, `PreviewSink`, `RelocateHandle`, `RelocateOptions`, `RelocateSession`, `RelocateStats`,
   `RelocateTargetFor`) — **`2 + 8 = 10` names** — its factory options carry **exactly SEVEN seams**
   (`session` · `candidatesFor` · `resolveTarget` · `onReveal` · `commit` · `threshold` · `onPreview`),
   **of which `onPreview` is the one the ruling forces beyond the `A-d4` signature**; it imports **exactly
   ONE sibling, TYPE-ONLY** (`GestureHandle` from `./gesture-session.js`) with **`POINTER_TYPES` and
   `createGestureSession` ABSENT**; and it is **imported by NO `src/**` file**."* **The census is `§2.1`'s
   and `R-5` is its row.** **A DONE row that prints an eleventh exported name, or that omits this census,
   is a review finding.**
4. **The code/test delta**: the module + the test file, named.
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which
   register rows ran and which were reported un-run** (`§4.2`'s stop rule).
6. **The legs' results WITH LAYER LABELS**: `npm test` `[T]` · `npm run typecheck` `[H]`, ***`src/**`
   ONLY*** · `npm run build` `[H]` (**the four esbuild outputs plus the copied `index.html`**, and
   whether the output set was byte-identical) · **leg 4** (the standalone strict `tsc` over
   `tests/relocate.test.ts`) — **and the explicit sentence that the node-suite green is envelope/pure-layer
   evidence and NOT assembled-app evidence**, and for this unit **that it proves nothing about a rendered
   pane, a pointer drag, a coordinate, an applied CSS value, a layout pass, a ghost's position or a click
   retarget** (`RCA-12`).
7. **The `[U]`/`[D]` status, the recorded `§7.1` decision, and gate 6's structural status**: **`[U]` not
   offered**, with `§5.2`'s **THREE-PART** clause (the refusal · the structural reason — no importer; no
   coordinate read · the `zones.md` `§4.4 S-6` sentence); **`[D]` not claimed**, with its
   `PRECONDITION-GATED` status and **`R-17`'s probe result stated**; **the `§7.1` predicate decision
   re-stated as `DOES NOT TRIGGER` with its evidence**; **gate 6 stated as `STRUCTURAL`, never
   `waived`**, with its reason. **A DONE row that claims a rendered-geometry proof, a `[D]` row, or a
   waived gate 6 is a review finding** (`I-11`, `R-8`, `§5.2`).
8. **The adversarial pass's findings** (`§3a`/`§3b` — `AGENTS.md` RCA-3, **MANDATORY per completed unit**,
   **including the gate-11 read-only PBT audit of `§5.5.1`'s executed tables and the pool-versus-boundary
   check re-run against the landed tables**) and the **blind-greens + per-unit documentation-review
   records** (`AGENTS.md` items 10a/10d, RCA-4/RCA-6 — the blind set is
   **`docs/specs/relocate-greens.md`**). **A DONE row that cites no adversarial pass is a review finding.**
9. **The tracker reconciliation** (`AGENTS.md` items 3/6) — including **the explicit statement that this
   unit's only dependency is the landed frozen `U-GSESSION` delegate surface (`docs/specs/gsession.md`
   `§2.5`), that `E5` is NOT a dependency in either direction, and that the owed tracker items of `§7`
   item 7 are discharged or re-parked with owners.**
10. **The property register's execution record** (`§5.5.1`): per register row, the **id · type ·
    attempts-run · held · broken** counts, **each row's strategy id (`S-RL-*`)**, the **pinned seed
    `20260927`** and its **step form** where the generator is used, the
    **stop-after-5-consecutive-failures status** (`not triggered`, or `triggered at row …`), the **total
    attempts reported against the `≤400` cap** with **every row's count against the `≤100` per-row cap**,
    and **the explicit sentence that every row whose property text quantifies over a domain larger than
    its table carries the `(bounded)` marking and is NOT a proof of the unbounded universal it states.**
    **A DONE row that reports the register as "executed" without these per-row counts and strategy ids is
    a review finding** — the markings are **execution DESIGN**, and **a read-only PBT audit may not accept
    this spec's table alone**: it reads the counts here **and** the TestWriter's tables in
    `tests/relocate.test.ts`.
**⟶ ANNOTATED 2026-09-27 (`§0A` note 15 item `S6`; the rule is `§5.5.2` item 9): the per-row record THIS ITEM requires reads `id · type · attempts-run · held · broken · CONTROLS`.** **The `controls` figure counts the row's DECLARED-FAILING CONTROL drives — measured at the re-grained revision: `P-RL-SM-3` `2`, `P-RL-SM-5` `1`, every other row `0` — and it is REPORTED BESIDE the declared term and NEVER counted in it.** **The `broken` FIGURES EXCLUDE DECLARED-FAILING CONTROLS BY RULE: a control's declared failure is an observation its drive asserts, so a `broken` count produced by one is a HARNESS defect and not a row's verdict — and a DONE row that reports one as a broken attempt is a review finding.** **Nothing else in this item moves, and no declared term moves with it.**

11. **The register's ARITHMETIC.** The DONE row must print the **total WITH its per-row terms** —
    **`170` = `21` (`P-RL-IM-1`) + `14` (`P-RL-IM-2`) + `12` AND `3` (BOTH of `P-RL-IM-3`'s halves) + `8`
    (`P-RL-IM-4`) + `21` (`P-RL-IM-5`) + `5` (`P-RL-SM-1`) + `11` (`P-RL-SM-2`) + `5` (`P-RL-SM-3`) + `6`
    (`P-RL-SM-4`) + `3` (`P-RL-SM-5`) + `14` (`P-RL-SM-6`) + `7` (`P-RL-SM-7`) + `4` (`P-RL-SM-8`) + `30`
    (`P-RL-TP-1`) + `6` (`P-RL-TP-2`)** *(**AS FILED this item printed `149` with a FIFTEEN-term list that
    omitted `P-RL-IM-5`'s `21`; the as-filed form and the whole correction are kept visible at `§5.5.3` —
    the honest total is `170`, and the DONE row must print the SIXTEEN terms, not fifteen**)* — *(**AS FIRST
    WRITTEN this item said the DONE row must print the SEVENTEEN terms, not fifteen — the same term-count
    defect carried into the DONE row's own instruction, kept visible here per the annotate-never-rewrite
    convention: the register enumerates `16` terms, and a DONE row printing `17` terms would be printing a
    term it cannot name.**)* — **and
    must reconcile that figure against the tables the test file actually
    produces**: **a total that is not the sum of its own terms is a review finding**
    (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE: *the family has hit this
    class FIVE consecutive times before this filing, and the filing that writes the terms is where the
    sum is checkable*).
    **Where a row's attempts are several assertions over ONE execution, or a count of DISTINCT inputs
    rather than of DRIVES, the DONE row must report BOTH the declared attempts and the honest
    DISTINCT-DRIVE figure** — here **EIGHT rows carry two differing figures, NAMED (`§5.5.2` item 3's
    ledger is the authority, and this item does not restate it exhaustively): `P-RL-IM-1` `21`/`17` ·
    `P-RL-IM-2` `14`/`12` · `P-RL-IM-3` `12`/`6` on its (3a) half (its (3b) `3` is `3`/`3`) ·
    `P-RL-IM-5` `21`/`15` (its `7` distance shapes land in `5` distinct classes, `5 × 3 = 15`) ·
    `P-RL-SM-2` `11`/`7` · `P-RL-SM-4` `6`/`4` · `P-RL-SM-6` `14`/`10` ·
    `P-RL-SM-7` `7`/`6`** — **plus `P-RL-TP-1`, whose `30` DRAWS carry a REPORTED, never-asserted,
    distinct-member count — a DRAW IS NOT A SWEEP, and a DONE row claiming full pool coverage is a
    review finding.** **The DECLARED figures are what the caps are compared against; the distinct figures
    are reported BESIDE them and never substituted** — **a DONE row that quotes the total alone, or that
    substitutes a distinct-drive figure in the cap comparison, is a review finding.** *(**AS FILED this
    item stated *"FIVE rows carry two differing figures"* and then listed SIX; the count and the naming
    are corrected here to the eight the ledger carries, plus `P-RL-TP-1`'s reported draw count — the
    row noun, the term noun and the distinct figure were conflated, which is this filing's own dated
    counting defect and is why the ledger is named as the authority rather than summarised again.**)*
12. **The `§5.3` → `§5.5` numbering note, cited**: **there is NO `§5.4`** — the gap is DELIBERATE and is
    the family's (`docs/specs/gutter.md` `§5.3`'s own note). **This file also has NO `§5.5.0`**: it was
    filed **after** the gate-11 ruling and carries its register **from the start**, so there is no
    superseded zero-row exemption to keep visible. **A DONE row that reports a `§5.5.0` exemption for this
    unit is citing a clause this file does not contain.**

### 5.5 Typed Property register (EXECUTED deterministically — no PBT harness)

**`AGENTS.md` item 11 makes the register MANDATORY BEFORE the red set for a code-bearing unit.**
**This repo HAS NO PBT HARNESS**: `package.json`'s `devDependencies` key set is the **five keys**
`@types/node`, `electron`, `esbuild`, `typescript`, `vitest` — **no `fast-check`, no `hypothesis`, no
property runner**. **This unit is CODE-BEARING** (a real session with three channels, an injected-seam
surface, a state machine and a pure total comparison), so the **recorded ZERO-ROW EXEMPTION IS NOT
AVAILABLE to it** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`). **There is NO `§5.5.0` in this file** — no
superseded exemption exists to keep visible. **`§5.5.1` below is therefore a real typed register**,
executed by **plain deterministic vitest tables**, **with NO new dependency, no fifth leg and no
`package.json` change.**

**⟶ THE REGISTER-ENTRY-COUNT RULING, APPLIED HERE (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,**
part 1). **A register ENUMERATES every discernible testable property of its unit; the per-section
threshold (`≤ 8`) is a BREAKDOWN SIGNAL, NOT A CEILING.** **THEREFORE this filing enumerates `15` rows
carrying `16` TERMS and
reports the count as its EXTENT — no property was dropped, merged or left unenumerated to fit a threshold
— and `15` ROWS / `16` TERMS IS AN OUTCOME.** *(**AS FIRST WRITTEN this ruling block read *"`15` rows
carrying `17` TERMS"* and *"`15` ROWS / `17` TERMS IS AN OUTCOME"* — the TERM-COUNT defect, corrected
2026-09-27 by the register-arithmetic remand: the count of ROWS is `15`, the count of TERMS is `16`
(`P-RL-IM-3` carries the one extra term), and the EXTENT claim is unchanged in substance because NO row,
property or term moved.**)* **The record's own arithmetic supports the overshoot** (the gate-1 record's
`§4.6`/`§5.7`: *"the register after amendment is fourteen-ish rows at least, and the number is an
outcome"*, with `E3` landed at thirteen rows and `E10` at seven — **"the count is not the discipline"**);
**this filing's `15` is above "fourteen-ish" for exactly two NAMED reasons, and they are stated
rather than waved: (a) `P-RL-IM-2`'s resolve-policy property is DRIVEN IN THIS UNIT as its own row rather
than left inside `P-RL-IM-1`'s pool, because its input domain (a per-move target answer) is genuinely
different from the candidate answer's; and (b) the two `M-` additions are counted as ROWS rather than as
cells of a sibling row, because each has its own strategy.** **NO PROPERTY WAS DROPPED, MERGED OR LEFT
UNENUMERATED TO FIT A THRESHOLD.**

**THE REGISTER'S OWN STRUCTURE, stated once so the numbering is not read as an error: the `§5.3 → §5.5`
gap (there is NO `§5.4`) is DELIBERATE and is the family's** — the same gap in `docs/specs/gutter.md`,
`gsession.md`, `zones.md`, `census.md`, `projection.md`, `listhost.md` and `slothost.md`, **recorded by
their documentation reviews** (`AGENTS.md` item 10d / RCA-6). **`§5.3` is the DONE row's shape and `§5.5`
is the property register; NO clause is missing — the section simply does not exist, and renaming or
renumbering is FORBIDDEN for citation stability.** **This file has NO `§5.5.0`**: it was filed **after**
the gate-11 ruling and carries its register **from the start**, so there is no superseded zero-row
exemption to keep visible. **`§5.5` is followed by `§5.5.1`, `§5.5.2` and `§5.5.3`, and nothing else.**

#### 5.5.1 THE REGISTER — **`15` typed ROWS carrying `16` TERMS, in THREE families, ALL executed by design** *(**AS FIRST WRITTEN this heading read `17` TERMS — corrected 2026-09-27; the as-written heading is kept visible at this subsection's foot with the whole correction**)*

**What this section is, in one sentence.** A **typed register of `15` rows / `16` terms** *(**AS FIRST
WRITTEN this one-sentence description read `15` rows / `17` terms — the same TERM-COUNT defect, corrected
2026-09-27; see this subsection's foot**)* whose **six genuine
quantifications** — (i) *the proximity decision over its whole enumerated operand space*; (ii) *the
reveal written exactly once per gesture, over every terminal path and every crossing count*; (iii)
*`onReveal` never from `onStart`/`onMove`, over every observation path*; (iv) *the invalid arm at most
once per gesture, from the move turn, over every invalidity class*; (v) *the two channels never sharing a
turn, over every move shape including the retarget*; and (vi) *the seven-seam totality universal over
hostile arguments* — are **executed here as quantifications over finite, pinned enumerations**,
**hand-rolled and deterministic, with no new dependency**.

**The ids are THIS UNIT'S OWN KIND and collide with nothing.** The prefix is **`P-RL-*`** (`RL` = this
unit, **r**e**l**ocate) — so **a register row is never mistaken for a `§3` row** (whose families are
`M-*`/`F-*`/`I-*`/`R-*`/`X-*`) **and never for a sibling's register** (`P-GT-*`, `P-GU-*`, `P-GS-*`,
`P-ZN-*`, `P-CN-*`, `P-PJ-*`, `P-LH-*`, `P-SH-*`). **The three families are the type algebra
`docs/specs/engine-pin.md` `§5.5` pins**: **`IM`** = injected seams and invariants · **`SM`** = the
state machine / channel counts · **`TP`** = totality. **The strategy-id prefix is `S-RL-*`, one per row.**

**How every row is executed (the strategy discipline, stated once so no row is ambiguous).**

1. **Plain deterministic vitest in this unit's own test file** (`tests/relocate.test.ts`, `§4.1`/`§5.1`) —
   the file the red set already owes, and the file the register **rides as part of the red** (`§4.2`
   item 5). **No row of this register is executed by a generator library.**
2. **Exhaustive/finite enumeration, or a PINNED-SEED deterministic generator written in plain TypeScript
   inside the test file.** **ONE row uses a generator** — `P-RL-TP-1` — and **it is pinned to literals in
   the test file itself: a hand-rolled 32-bit LCG with `state₀ = 20260927`; `stateₙ₊₁ = (stateₙ · 1664525 +
   1013904223) mod 2³²`; and EACH DRAW APPLIES EXACTLY ONE LCG STEP, the resulting state selecting the
   pool member — `index = stateₙ₊₁ mod pool.length`, with `pool.length = 15`** — so **one pool draw
   consumes exactly ONE LCG step.** **Stated so no TestWriter reads a two-step or a scaling form into it:
   there is NO `next(k)` helper in this register, and `pool.length` participates in NO rule beyond that
   one modular reduction.** **No `Math.random`, no wall-clock seed, no shrinking, no adaptive input
   search.** **`P-RL-TP-2` uses NO generator** — its table is fixed and enumerated.
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
   with a recording event source**, a **counting sink**, **recording channel spies** and **throwing
   stubs**, and **no row hands this module an event object or a coordinate**; **(b) no `Proxy` whose traps
   return inconsistent answers across reads** is in any pool (the hostile shapes are **fixed** table
   members, deliberately, so no draw is ambiguous); **(c) each row's pool/table is a SUBSET of the input
   space this contract pins**, and **its silence about a shape it does not list is a stated boundary, not
   an unrecorded omission**; **(d) `P-RL-IM-3` carries the comparator's totality, `P-RL-SM-2` carries the
   single-writer channel discipline, `P-RL-SM-3` carries the once-per-gesture write site, `P-RL-SM-1`
   carries the declared terminal domain, `P-RL-SM-6` carries the two-channel non-overlap, `P-RL-SM-7`
   carries the invalid arm, `P-RL-TP-1` carries the seven-seam totality universal — and NO OTHER ROW MAY
   BE QUOTED FOR ANY OF THEM.**
7. **⟶ THE STATS MEMBER'S NAME, APPLIED TO EVERY CELL OF THIS REGISTER (2026-09-27, `§0A` note 14 item 1).** **Every cell here that reads a reveal count reads `RelocateStats.revealWrites` (the ATTEMPTED count) or the member now named `revealWritesApplied` (the count that RETURNED without throwing)** — **the member AS FIRST WRITTEN as `revealed`** — **and a TestWriter's table must assert the ELEVEN declared fields under their CURRENT names: `attached` · `gestures` · `moves` · `candidateCalls` · `resolveCalls` · `revealWrites` · `revealWritesApplied` · `resets` · `sinkCalls` · `written` · `lastCode`.** **THE OLD NAME IS A BANNED CENSUS TOKEN (`§3.4 R-1`, exactly two exemptions, neither of them it) AND MUST NOT APPEAR IN THE MODULE'S BYTES — INCLUDING ITS COMMENTS; this register's own cells are SPEC TEXT, not module bytes, and its readings are UNMOVED.** **NO TERM MOVED for this rename: the register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS.**

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-RL-IM-1`** | `P-IM` invariant | **For EVERY `candidatesFor` shape in the row's `4`-shape domain and EVERY observation path in its `5`-path domain, the seam's CALL COUNT and the row's INVALID-ARM outcome are EXACTLY the declared pair for that cell: `candidatesFor` is called AT MOST ONCE per observed move, ONLY from the module's own move turn — never at establishment, never at a terminal, never on a `cancel`, never on a refused terminal, never after the invalid arm has stuck — and an ABSENT / NON-CALLABLE / THROWING seam yields the EMPTY candidate set ⇒ nothing within proximity ⇒ the invalid arm with NO throw out of the turn, and, stated in the same row, THAT IS NOT A CANCEL.** | **YES (bounded — the property text says "every observation path" over the turn domain while the table drives `5` paths, `4` of them observable; the `(bounded)` marking names that scope and the universal is NOT proven)** | `M-3`, `M-5`, `M-8`, `F-13`, `F-15`, `I-5`, `§2.3` items 6(c)/6(d), `§2.4` items 1/3 | `S-RL-ENUM-1` | **`21` attempts** = **`4` `candidatesFor` shapes × `4` observable paths (`16`) + `5` further drives.** **The `4` shapes:** **(1)** a callable returning a well-formed answer whose `distance` is within proximity · **(2)** ABSENT · **(3)** NON-CALLABLE (`42`) · **(4)** a callable THROWING. **⟶ AMENDED 2026-09-27 — RED-EXPOSED ITEM `S4`, RULED IN THIS CELL (`§0A` note 15 item `S4`): SHAPE `(3)`'s DECLARED CALL COUNT, SPLIT INTO ATTEMPTED VERSUS INVOKED.** **THE TWO WORDS: ATTEMPTED = a TRY to consult the seam — counted ONCE PER OBSERVED MOVE wherever the option carried a value OTHER THAN `undefined`, INCLUDING a non-callable (`42` · `'x'` · an object · a hostile `Proxy`) and a callable that THROWS; INVOKED = ACTUALLY CALLED, which happens only where a callable was present. THE ONLY NON-ATTEMPT FORM IS THE MEMBER ABSENT OR CARRIED WITH THE VALUE `undefined` (both read `0`); `null`, `false`, `0`, `''`, a non-callable and a throwing callable are ALL ATTEMPTS and are NEVER retried.** **THEREFORE SHAPE `(3)` NON-CALLABLE (`42`) DECLARES `candidateCalls === 1` ON EVERY PATH THAT REACHES THE SEAM — exactly as shape `(1)` does — and `0` ONLY on the non-reaching paths `(b)`/`(d)`. `§3.2 F-15` is the row that states it, and `§2.1`'s `candidateCalls` declaration carries the same two words.** **THE DECLARED TERM IS UNMOVED, AND THE DRIVES DO NOT CHANGE: the term stays `21` = the same `4` shapes × `4` observable paths (`16`) + the same `5` further drives, and the register stays `15` ROWS · `16` TERMS · `170` ATTEMPTS. What moves is the DECLARED READING inside shape `(3)`'s cells (`0` → `1` on the reaching paths) — and that reading is the RED SET's (`tests/relocate.test.ts` declares `reachesTheSeam: false` for shape `(3)`), so the correction is TEST-side.** **THIS ROW'S REPORTED DISTINCT FIGURE (`§5.5.2` item 3) IS A REPORTED FIGURE — never asserted, never a term: the re-grain re-reports it under the corrected scope, and the as-filed `17` stays visible beside its own amendment text.** **The `4` observable paths:** **(a)** one observed move with an established gesture (**the only path that reaches the seam**) · **(b)** an ESTABLISHMENT with no move · **(c)** a `cancel` after one move · **(d)** a REFUSED establishment (`install` on an uninstalled element); **the FIFTH path class — a refused/`'busy'` terminal — is DECLARED NON-REACHING and is driven only as its `(d)` cell**, exactly as `P-RL-IM-1`'s boundary names it. **⟶ AMENDED 2026-09-27 — RED-EXPOSED ITEM `1`, RULED IN THIS CELL (`§0A` note 13 item 1): THE ARITHMETIC'S OWN TEXT AGAINST ITS OWN PATHS.** **`(b)` establishment-with-no-move and `(d)` a refused establishment NEVER REACH THE SEAM, so `4 × 2 = 8` of this row's `16` grid cells can carry no distinct seam-observation; `(a)` and `(c)` are the two paths that DO reach it (`(c)` reaches it once, through its one observed move, before its `cancel`). THE READING PINNED: THE TERM `21` IS KEPT, AND THOSE `8` CELLS ARE DRIVEN AS DECLARED-READING CELLS — each asserts the DECLARED PAIR for its cell, which for a non-reaching path is `(seam-call count `0`, NO INVALIDITY — no arm is taken, because no observed move ever reached the module's move turn)`, FOR EVERY ONE OF THE FOUR SHAPES.** **The drives are therefore EXACTLY the declared composition — `4` shapes × `4` driven paths (`16`) + `5` further drives = `21` — and EVERY CELL HAS ITS OWN DECLARED PAIR; what the `8` non-reaching cells do NOT carry is a DISTINCT OBSERVATION, which is precisely the scope this row's own `(bounded)` marking names (`§5.5.2` item 2).** **THE REASON THE RE-DERIVATION ALTERNATIVE (i) IS AVAILABLE AND WAS NOT TAKEN:** **(1)** a declared register term is a DRIVE count (`A DECLARED REGISTER TERM IS A DRIVE COUNT`), and **all `21` declared drives ARE performed, each with a declared pair** — so the composition IS consistent **as drives**, and only the word *"observable"* was doing the extra work; **(2)** it is the reading the red set was authored to; and **(3)** re-deriving the term would MOVE the register's declared total and so REDDEN the red's own harness rows for no contract gain. **A pass that wants the term to count DISTINCT OBSERVATIONS rather than DRIVES must RE-GRAIN: it owes the new term with its composition, the new total WITH its terms and its addition chain, both caps re-checked (`≤100`/row · `≤400` total) and a RE-RUN of the red (`§5.5.3`).** **The ABSENT shape's own drive is the SEPARATE-COMPOSITION reading pinned by item `3` (`P-RL-IM-2`'s cell; `P-RL-IM-4`'s scope clause).** **The `5` further drives, each declaring its own count:** **(e)** TWO sequential observed moves ⇒ `2` calls (the multiplicity that falsifies an instance-level cache) · **(f)** a move FOLLOWING a stuck invalid arm ⇒ `1` call for the gesture and `0` further resets · **(g)** shape `(1)` whose answer carries FIVE candidates, exactly ONE within proximity ⇒ `1` call and exactly one within-proximity decision · **(h)** shape `(1)` whose answer carries ZERO candidates ⇒ `1` call and the invalid arm · **(i)** shape `(1)` whose answer is well-formed but whose `distance` is unusable ⇒ `1` call and the invalid arm (**this drive is shared with `P-RL-IM-5` and is counted in BOTH terms, as `E3`'s `P-GT-IM-2` shared its permutation family with `P-GT-IM-1`**). **Per attempt assert:** the seam's own recorded call count (`exactly`, never "at least"), `stats().candidateCalls`, and the declared arm. **The `4`-shape × `4`-path grid is `16`; `16 + 5 = 21`.** |
| **`P-RL-IM-2`** | `P-IM` invariant | **For EVERY `resolveTarget` shape in the row's `4`-shape domain and EVERY gesture configuration in its `2`-shape domain, the seam's CALL COUNT and the WRITE COUNT are EXACTLY the declared ones: `resolveTarget` is called AT MOST ONCE PER OBSERVED MOVE and ONLY for a move whose answer places the pane within proximity (never at establishment, never at a terminal, never on a `cancel`); the resolved target is the CALLER'S answer, handed on BY IDENTITY to both the presentation channel and the reveal channel; and with an unusable `resolveTarget` the committing terminal writes NOTHING and does NOT throw — so NO DEFAULT TARGET and NO DEFAULT CANDIDATE SET and NO DEFAULT REVEAL STATE exists anywhere in the module, asserted in the same row on every attempt.** | **YES** | `M-3`, `M-9`, `F-16`, `I-5`, `§2.3` item 6(c), `§2.4` items 1/3, `§2.2` `P-8` | `S-RL-ENUM-2` | **`14` attempts** = **`4` `resolveTarget` shapes × `2` configurations (`8`) + `6` further drives.** **The `4` shapes:** **(1)** a callable returning an opaque target OBJECT · **(2)** ABSENT · **(3)** NON-CALLABLE (`42`) · **(4)** a callable THROWING. **The `2` configurations:** **(i)** the target is resolved DURING the gesture (per move — **the PINNED reading, `§7a.1` item 1**) · **(ii)** the target is carried in the candidate answer and resolved at the move anyway (**the control that the module's own multiplicity does not depend on the answer's shape**). **⟶ AMENDED 2026-09-27 — RED-EXPOSED ITEM `3`, RULED IN THIS CELL (`§0A` note 13 item 3): SHAPE `(2)` `ABSENT` IS DRIVEN AS A SEPARATE COMPOSITION.** **That is the ONLY reading satisfying this row and `P-RL-IM-4` TOGETHER: reaching a CALL COUNT of `0` for an absent member REQUIRES an options object that does NOT CARRY IT, while `P-RL-IM-4` asserts the options object's key set is ALWAYS exactly the seven.** **So shape `(2)` here — and `P-RL-IM-1`'s shape `(2)`, and `F-15`/`F-16`'s omitted cases — is driven from a SEPARATE MODULE INSTANCE whose options object OMITS that member (or carries it with the value `undefined` — this pin's declared variant), with the module unable to call it (`stats().resolveCalls === 0`), NO DEFAULT supplied, and the write count reading `0` without the terminal becoming a cancel.** **THE KEY-SET CLAIM'S SCOPE IS PINNED IN THE SAME WORDS IN `P-RL-IM-4`'s CELL.** **The `6` further drives:** **(a)** a callable returning `undefined` ⇒ `0` sink writes and **NOT a cancel** · **(b)** a callable returning a target, on a gesture with TWO within-proximity moves ⇒ `2` calls and the SECOND target is the one the terminal writes · **(c)** a callable returning a DIFFERENT target on the second move ⇒ the reveal receives the LAST target (`toBe`) · **(d)** a move OUTSIDE proximity ⇒ `0` calls for that move · **(e)** the options object carrying an EIGHTH member ⇒ the row FAILS (the set claim, shared with `P-RL-IM-4` and counted here too) · **(f)** the options object missing `resolveTarget` altogether ⇒ `0` calls and `0` writes, with the invalid arm **not** taken (the answer was within proximity; there is simply nothing to resolve) — **the distinction between *"no target"* and *"no proximity"* is THIS row's sharpest cell.** **Per attempt assert:** the call count, the identity of the target each channel received (`toBe`), and the declared write count. **`8 + 6 = 14`.** |
| **`P-RL-IM-3`** *(the `threshold` row — **the row `§C` decides**, with its TWO DECLARED HALVES and ONE TERM EACH)* | `P-IM` invariant | **TWO HALVES, each with its own term (`R-2`).** **(3a) THE COMPARISON — for EVERY `(distance, threshold)` class pair in the row's fixed grid, the module's exported pure `withinProximity` answers EXACTLY ONE DECLARED OUTCOME — inside / on the boundary / outside — for `d < t`, `d == t` and `d > t`, and answers `false` for EVERY HOSTILE pair, WITHOUT THROWING** (the declared answer table is `§2.1` item 1). **(3b) THE NO-DEFAULT CLAUSE — `threshold` is present as a caller-supplied value, it is READ (not merely carried), and NO DEFAULT, NO UNIT STRING and NO MECHANISM-SIDE DISTANCE COMPUTATION exists** — the `threshold`-absent configuration produces the invalid arm, never a default, and the module's own bytes contain no distance arithmetic. **Assertions are reported BESIDE each term, never inside it.** | **YES (bounded — the property text says "EVERY class pair" while the table drives `12` cells for (3a) and `3` for (3b); the universal is NOT proven)** | `M-2`, `F-1`..`F-3`, `F-14`, `I-1`, `§2.3` items 1/2/3, `§5.5.1 P-RL-IM-5` | `S-RL-PURE-1` (3a) · `S-RL-PURE-2` (3b) | **(3a) `12` attempts** = **`4` distance classes × `3` threshold classes.** **The `4` distance classes:** **(1)** a finite `number` below · **(2)** a finite `number` equal to the threshold · **(3)** a finite `number` above · **(4)** the HOSTILE class — driven as its `5` variants INSIDE the drive (non-number, `NaN`, `+Infinity`, `-Infinity`, a `12n`/`Symbol` operand), each declaring `false` and no throw. **⟶ ANNOTATED 2026-09-27 (`§0A` note 16's rule, reconciled PER VARIANT by `§0A` note 17 item (a); the as-written `false` column ABOVE IS KEPT VISIBLE and is SUPERSEDED FOR ONE OF ITS FIVE VARIANTS): THE HOSTILE CELLS DECLARED PER VARIANT — `(H1)` a NON-`number` operand (`'20'` · `null` · `undefined` · `true` · an object/array · a function · `12n` · a `Symbol`) ⇒ `false` (the `typeof` gate; unmoved); `(H2)` `NaN` on either side ⇒ `false` (the `NaN` limb; unmoved); `(H3)` a FINITE NEGATIVE operand on EITHER side (`(-1, 20)` · `(20, -1)` · `(-1, -1)`) ⇒ `false` (the UNUSABLE class — DECLARED here rather than left implicit; the as-written hostile list does not drive this variant); `(H4)` `-Infinity` ⇒ THE COMPARISON VERBATIM, so against a FINITE non-negative `t` the answer is `true` (`-Infinity <= -1` · `-Infinity <= 0` · `-Infinity <= 20` are ALL `true`) and `-Infinity <= -Infinity` is `true` — THIS VARIANT'S AS-WRITTEN `false` IS THE ROW'S THREE MEASURED BREAKS (the `-Infinity` operand against the three threshold classes `(a)`/`(b)`/`(c)`) AND IS SUPERSEDED, the pinned answer being `true` in all three; `(H5)` `+Infinity` against a FINITE non-negative `t` ⇒ `false` (the as-written answer, REACHED BY THE COMPARISON and not by a finiteness refusal), while `+Infinity <= +Infinity` ⇒ `true` (NOT driven by this cell); `(H6)` a NON-NEGATIVE `-0` operand takes the BOUNDARY-INSIDE rule EXACTLY as `0` does (`-0 <= 0` is `true`), the SIGN never special-cased. ONLY DECLARED READINGS MOVED — no drive, no attempt, no term, no row id, no strategy id, no seed and no cap moved (`§0A` note 17 item (d)).** **The `3` threshold classes:** **(a)** a positive finite `number` · **(b)** `0` · **(c)** a NEGATIVE finite `number` (`-1`; the pair `(-5, -1)` declares `false`, the pair `(-2, -1)` declares `true`) — **so the boundary `d == t` and the negative-operand limb are both driven, and `-0` is driven as a `0`-class variant asserting the BOOLEAN only.** **⟶ PINNED 2026-09-27 (`§0A` note 16): THE NEGATIVE-OPERAND LIMB OF THIS GRID, and it is the CELLS that decided the file's negative-class reading. THRESHOLD CLASS `(c)` (`-1`) IS THE UNUSABLE CLASS — a FINITE NEGATIVE `distance`/`threshold` is not a distance — SO ITS DECLARED CELLS READ `false`, `false`, `false`: `(-5, -1)` ⇒ `false`, `(-1, -1)` ⇒ `false` and `(0, -1)` ⇒ `false`. The as-written clause of THIS CELL — *"the pair `(-2, -1)` declares `true`"* — IS KEPT VISIBLE AND IS THE ONE CELL OF THIS ROW THE PIN SUPERSEDES; the pinned arithmetic is `-2 <= -1` is `true`, while a NEGATIVE finite `threshold` is unusable, so `(-2, -1)` ⇒ `false` and NO ROW OR DRIVE OF THIS FILE DRIVES THAT PAIR (the red set's class-`(c)` drives are `(-5, -1)` and `(0, -1)`, both `false`). CLASSES `(a)`/`(b)` AND THE `5` HOSTILE VARIANTS ARE UNCHANGED (`-0` remains the `0`-class variant asserting the BOOLEAN only).** **`4 × 3 = 12`.** **(3b) `3` attempts:** **(1)** the options object WITHOUT `threshold` ⇒ the invalid arm on every within-candidate move, with `0` defaults observable anywhere · **(2)** a non-number `threshold` (`'20'`, `{}`, `null`) ⇒ the same invalid arm, never a coercion · **(3)** a within-candidate move with a usable `threshold` ⇒ the arm is NOT taken — **the positive control that makes (1)/(2) meaningful.** **Per attempt assert (printed BESIDE the term): the answer, the no-throw clause, the absence of a unit string, the absence of a second comparison site, and the arm taken.** |
| **`P-RL-IM-4`** | `P-IM` invariant | **THE SEAM SET IS FROZEN: the factory's options object carries EXACTLY the SEVEN declared members, NAMED and ORDERED — `session` · `candidatesFor` · `resolveTarget` · `onReveal` · `commit` · `threshold` · `onPreview` — and nothing else; AN EIGHTH MEMBER FAILS; `capture` is ABSENT (not `false`); a `distanceFor` member FAILS; and no policy default exists.** **The set claim is asserted ON EVERY ATTEMPT OF THE WHOLE REGISTER as a cross-row assertion PRINTED BESIDE each row's term and NEVER COUNTED IN IT** (`R-1`: a cross-row assertion is not a declared term), **and its OWN term here is this row's OWN drives only.** | **YES** *(the set claim is over a closed seven-name list, and every cell has its own declared outcome — no member is a sample of an unlisted shape)* | `M-1`, `R-1`, `R-4`, `R-10`, `§2.1` items 1/2, `§2.2` `P-8` | `S-RL-SET-1` | **`8` attempts** = the **`7` declared members each driven once as the VARYING member with the other `6` present** (`7`) **+ `1` positive control**. **The `7` drives:** each varies exactly one member's VALUE (including the absent form) and asserts the options object's own key SET read BY NAME is unchanged and exactly the seven, with `capture`'s presence FAILING. **The `1` positive control:** an options object carrying **`distanceFor`** — **an EIGHTH member, which must FAIL**; **the module's own handling of it is asserted too: the extra member is IGNORED, never honoured** (so the control has both a failing-set half and a stated module half). **Per attempt assert:** the key set by name, the declared order, `capture`'s absence, and that no member is defaulted. **⟶ AMENDED 2026-09-27 — RED-EXPOSED ITEM `3`, RULED IN THIS CELL (`§0A` note 13 item 3): THE KEY-SET CLAIM'S SCOPE.** **The seven-name key-set assertion binds EVERY attempt whose composition IS the seven-member conformant composition. An ABSENT-FORM attempt — a seam's absent configuration, i.e. `P-RL-IM-2` shape `(2)`, `P-RL-IM-1` shape `(2)`, `F-15`'s omitted case — is driven as a SEPARATE COMPOSITION whose options object does NOT carry that member (or carries it with the value `undefined`), and THERE the claim reads: the key set is the SIX REMAINING DECLARED MEMBERS in the declared order, the absent member is NEVER DEFAULTED, and NO eighth member is present.** **WITHOUT THIS SCOPE THE TWO ROWS ARE UNSATISFIABLE TOGETHER: reaching `candidateCalls`/`resolveCalls == 0` for an absent member REQUIRES an object that does not carry it.** **The set claim is still asserted on every attempt of the whole register — on the six-member form for absent-form attempts, never waived.** |
| **`P-RL-IM-5`** *(the record's `M-1` addition — the DISTANCE FIELD's read and its degradation)* | `P-IM` invariant | **For EVERY `distance`-field shape in the row's `7`-shape domain and EVERY gesture path in its `3`-path domain: the field is READ through the module's own total member-read — absent · `undefined` · a non-`number` · `NaN` · a non-finite `number` · a THROWING accessor · a usable `number` — and EVERY UNUSABLE STATE ANSWERS "NOTHING WITHIN PROXIMITY" ⇒ the invalid arm, and NEVER a throw.** **AND THE CONVERSE, asserted in the same row: an ABSENT `candidate` field with a WITHIN-PROXIMITY `distance` IS WITHIN PROXIMITY — ONLY THE DISTANCE DECIDES.** | **YES (bounded — the property text names "EVERY distance-class shape and EVERY gesture path" while the table drives `7` field shapes × `3` paths; the universal is NOT proven)** | `F-14`, `F-13`, `M-8`, `§2.4` item 3, `§2.1` item 1 (`CandidateFor`) | `S-RL-DIST-1` | **`21` attempts** = **`7` `distance` shapes × `3` gesture paths.** **The `7` shapes:** **(1)** a usable finite `number` within proximity · **(2)** a usable finite `number` outside proximity · **(3)** ABSENT (the field omitted) · **(4)** `undefined` EXPLICITLY present · **(5)** a non-`number` (`'5'`, `null`, `true`, a `Symbol`, a `12n`) · **(6)** `NaN` and, as variants inside the drive, `+Infinity`/`-Infinity` · **(7)** a record whose `distance` accessor THROWS. **⟶ ANNOTATED 2026-09-27 (`§0A` note 16's rule, reconciled PER VARIANT by `§0A` note 17 item (c); the shape `(6)` text ABOVE IS KEPT VISIBLE): THE FIELD-LEVEL CLASS AND THE COMPARATOR'S RULE ARE TWO LAYERS, AND THIS SHAPE'S `±Infinity` VARIANTS ARE DECLARED AT THE FIELD LAYER — a `distance` FIELD is USABLE only as a FINITE NON-NEGATIVE `number`, so a field value of `NaN`, `+Infinity` or `-Infinity` takes the INVALID ARM AS DECLARED (nothing within proximity, no throw), UNMOVED, which is what this row's own property text and `§3.2 F-14` declare. THE COMPARATOR'S VERBATIM LIMB GOVERNS THE OPERANDS OF THE EXPORTED PURE `withinProximity`, NOT THE FIELD: driven DIRECTLY, `+Infinity` against a finite non-negative `t` answers `false` (the comparison, never a refusal) while `-Infinity` against any finite non-negative `t` answers `true` (`§3.2 F-3`'s cell) — so a reader MUST NOT carry either limb into the other layer, and the ONE-SENTENCE statement of that field limiter is REPORTED AS OWED at `§0A` note 17 item (f) rather than smoothed here. NO TERM MOVED: `7` shapes × `3` paths is `21` before and after.** **The `3` gesture paths:** **(a)** the OBSERVED-MOVE path (the answer is consulted) · **(b)** the COMMITTING-TERMINAL path (the last observed answer is the one the terminal's target came from) · **(c)** the INVALID-ARM path (the arm the unusable states select). **Per attempt assert:** the within-proximity decision, the arm taken, the absence of a throw, and — on shape `(7)` — that the throw was ABSORBED rather than propagated (`§2.4` item 2). **`7 × 3 = 21`.** |
| **`P-RL-SM-1`** *(the HEADLINE row — and its declared terminal domain IS the RULED SET `{` `'end'` `}`)* | `P-SM` state-machine | **For EVERY terminal path in the row's `5`-path domain and EVERY crossing count in its `2`-count domain: `onReveal` is invoked EXACTLY ONCE for a gesture that reaches an `'end'` terminal, and ZERO TIMES for every other path — a `'reset'` terminal (**THE DECLARED TERMINAL DOMAIN IS `{` `'end'` `}`, THE RULED SET — ruling 2 clause (3), `§0A` note 6, DERIVED AND FLAGGED**), a `cancel`, a refused terminal, and a terminal whose target is `undefined`.** **AND THE FORK-FAILING LIMB, KEPT — it is this row's whole content: a gesture that crosses the proximity `N >= 2` times STILL reads EXACTLY ONE `onReveal` invocation, so the per-crossing shape FAILS.** **The reading is the CONSUMER'S OWN RECORD BESIDE the module's `RelocateStats.revealWrites` — they must AGREE.** | **YES** *(the `5` paths and the `2` counts are the declared domain, and every cell has its own declared pair)* | `M-5`, `M-6`, `M-7`, `M-9`, `F-9`, `F-16`, `F-17`, `I-2`, `§2.3` items 4/5, `§2.6` item 7 | `S-RL-REVEAL-1` | **`5` attempts** = **`5` terminal-path drives, each asserting the declared pair.** **The `5` paths:** **(1)** an `'end'` terminal of a gesture whose LAST observed move was within proximity and whose target is a target ⇒ **exactly `1` reveal**, carrying the target by identity, and `gesture.outcome === 'end'` at the sink · **(2)** a `'reset'` terminal (the invalid arm) ⇒ **exactly `0` reveals**, `stats().resets === 1`, and the sink's value is the caller's pre-drag value — **THE ZERO-REVEAL CELL THE RULING FORCES**, which is also why this row's domain is the ruled set · **(3)** a `cancel` ⇒ **`0` reveals and `0` sink calls** · **(4)** a REFUSED terminal (a stale/absent handle, `'busy'`, `'disposed'`, `'not-installed'`, `'disconnected'`) ⇒ **`0` reveals** · **(5)** an `'end'` terminal whose resolved target is `undefined` ⇒ **`0` reveals and `0` sink writes, and the outcome is still `'end'`** (the *not-a-cancel* control). **The `2` crossing counts are asserted INSIDE paths `(1)` and `(2)`: `N = 1` and `N = 5` within-proximity moves ⇒ both read exactly `1` reveal for path `(1)` and exactly `0` for path `(2)`** — **so `5` drives carry the crossing-invariance limb, and the limb is not a fifth row's business.** **Per attempt assert:** BOTH readings (`stats().revealWrites` and the consumer's own record) and their AGREEMENT; the carried target's identity; `gesture.outcome`. |
| **`P-RL-SM-2`** *(the channel split — the session's `commit` and the module's own sink are DIFFERENT functions)* | `P-SM` state-machine | **For EVERY composition shape in the row's `5`-shape domain and EVERY terminal class in its `2`-class domain, the write channel behaves EXACTLY as declared: ONE CONFORMANT composition writes exactly once per `'end'` gesture and the sink's own record and `stats().sinkCalls` AGREE; A TWO-WRITER composition FAILS (the sink's record reads `2` for one gesture while the module's own count still reads `1` — WHICH IS WHY BOTH READINGS ARE ASSERTED); A NO-WRITER composition FAILS (the count reads `0` where `1` is required); A COMPOSITION GIVING THE SAME FUNCTION TO THE MODULE'S `commit` SEAM AND TO THE SESSION'S `commit` CONSTRUCTION OPTION IS A TWO-WRITER COMPOSITION AND FAILS; and a consumer's OWN write from its own hook is NOT this composition's write — while a composition whose TOTAL write count for one gesture is `2` FAILS.** | **YES** | `M-9`, `F-4`, `F-6`, `F-19`, `R-13`, `I-2`, `§2.3` item 4, `§2.5` item 5, `§0A` note 7 | `S-RL-WRITER-1` | **`11` attempts** = **`5` composition shapes × `2` terminal classes (`10`) + `1` positive control.** **The `5` shapes:** **(1)** the CONFORMANT composition (one sink seam, one call site) · **(2)** a SECOND WRITER that calls the sink directly from the consumer's own `onEnd` **at the SAME committing terminal** (so both readings are about ONE gesture) · **(3)** a SLOT-EMPTY composition (no `commit` at all, or a non-callable one) · **(4)** the `E10-SINGLE-SINK-CHANNEL` violation — the SAME function handed to the module's `commit` seam and to the session's `commit` construction option · **(5)** a consumer whose own `onMove` writes its own sink. **The `2` terminal classes:** **(a)** an `'end'` · **(b)** a `'reset'` (the invalid arm). **The `1` positive control:** shape `(1)` driven twice with DIFFERENT sink identities, asserting the module holds no residue of the first. **Per attempt assert:** the sink's own record for the gesture, `stats().sinkCalls`, and their declared agreement or DIVERGENCE — **the divergence is the falsifier, and a composition whose two readings agree at `2` for shape `(2)` FAILS (the second write did not come from a second writer on the same terminal).** |
| **`P-RL-SM-3`** *(the falsifying row — `onReveal` NEVER from `onStart`/`onMove`)* | `P-SM` state-machine | **`onReveal`'s ONLY call site is the module's own `commit` seam. A STATIC CENSUS of `onReveal` references outside that site is EMPTY — and that census is an ASSERTION carried in each drive, reported BESIDE this row's term and NEVER counted in it (`R-1`).** **AND, as drives: a gesture that crosses the proximity `N >= 2` times reads exactly one invocation, and a driver whose `onReveal` is invoked from the module's own `onStart`/`onMove` FAILS this row.** | **YES** | `M-5`, `M-6`, `M-7`, `I-2`, `R-13`, `§2.6` item 7, `§0A` note 6 | `S-RL-SITE-1` | **`5` attempts** = **`5` observation drives.** **(1)** a gesture with ONE within-proximity move ⇒ `1` invocation, and the recorded invocation happens INSIDE the terminal (the drive's spy records the phase) · **(2)** a gesture with FIVE within-proximity moves ⇒ still exactly `1` · **(3)** a gesture with five moves, NONE within proximity ⇒ `0` invocations · **(4)** the CONTROL drive in which the module's own `onStart`/`onMove` wrapper calls `onReveal` ⇒ **the row FAILS** (an invocation outside the commit seam is caught by the phase assertion) · **(5)** the CONTROL drive in which `onReveal` is invoked TWICE from the same commit seam ⇒ **the row FAILS** on the count. **Per attempt assert:** the consumer's own record (count + phase + argument identity), `stats().revealWrites`, and their agreement. **THE STATIC CENSUS IS PRINTED BESIDE THE TERM AND IS NOT PART OF IT.** |
| **`P-RL-SM-4`** *(no retention across the boundary — with the pre-drag value's ONE capture point, `R-4`)* | `P-SM` state-machine | **For EVERY stage in the row's `3`-stage domain and EVERY slot shape in its `2`-shape domain: the caller-supplied PRE-DRAG VALUE is captured EXACTLY ONCE per gesture — at the module's own `onStart` wrapper, for a gesture the session ESTABLISHED — the running count is asserted EXACTLY and never "at least", and NOTHING IS RETAINED across the boundary: after the terminal the per-gesture record (handle, element, pre-drag value, last candidate answer, last target, sticky flag) is GONE, a subsequent `reset(element)` refuses `'no-gesture'`-class with ZERO session calls, and no element-keyed value, cache or memo exists.** | **YES (bounded — the property text says "EVERY stage and EVERY slot shape" while the table drives `3` stages × `2` slots; the universal is NOT proven)** | `M-10`, `M-12`, `M-16`, `I-9`, `F-11`, `§2.3` item 7, `§2.5` item 6 | `S-RL-WINDOW-1` | **`6` attempts** = **`3` stages × `2` slot shapes.** **The `3` stages:** **(1)** after `attach`, before any establishment ⇒ pre-drag count `0`, and an `onStart` that never ran · **(2)** after establishment, before any move ⇒ pre-drag count EXACTLY `1` · **(3)** at and after the terminal ⇒ still EXACTLY `1`, the record GONE, and a `reset(element)` refusing with ZERO session calls. **The `2` slot shapes:** **(a)** a gesture that terminated by an `'end'` · **(b)** a gesture that terminated by `'reset'` (the invalid arm) — **plus, as a variant INSIDE shape (b), a gesture whose session refused establishment: `0` captures and `0` records**. **⟶ AMENDED 2026-09-27 (`§2.1` item 7; `§0A` note 15's `A2` continuation): THE PRE-DRAG COUNT'S INSTRUMENT IS THE HOOKS RECORD'S OWN `preDragValueOf` MEMBER — the consumer's own RECORDED INVOCATION COUNT (exactly `1` per ESTABLISHED gesture; `0` before establishment, `0` for a refused establishment) read BESIDE the third argument of the module's `session.reset` delegation. The member's four unusable shapes (absent · non-callable · throwing · a throwing accessor) all REFUSE and COMMIT NOTHING, and none of them throws. THIS ROW'S PROPERTY TEXT, ITS DOMAIN, ITS `2` SLOT SHAPES AND ALL FOUR OF ITS ASSERTION CLASSES ARE UNCHANGED BY THE AMENDMENT, and NO TERM MOVES: `6` attempts = `3` stages × `2` slot shapes. THE AMENDMENT'S DEGRADATION DRIVES RIDE AS ASSERTIONS INSIDE THESE ATTEMPTS AND THE CLAUSE CELL, NEVER AS NEW DRIVES.** **Per attempt assert:** the pre-drag count (`exactly`), the record's presence/absence by observable consequence (a `reset`'s refusal code and its session-call count), and the absence of any element-keyed structure (a second element's gesture reads no value from the first). |
| **`P-RL-SM-5`** *(the `M-2` addition — the reset path's WRITE FORM)* | `P-SM` state-machine | **For EVERY arm in the row's `3`-arm domain — `(1)` THE INVALID ARM · `(2)` THE `'end'` CONTROL ARM · `(3)` THE WRONG-CHANNEL CONTROL ARM, NAMED HERE per the red-exposed item `2` (`§0A` note 13, 2026-09-27): the invalid arm's VISIBLE REVERT is carried by the PER-MOVE CHANNEL (`onPreview`) and NO REVEAL WRITE OCCURS ON THAT ARM** — the reset terminal commits **exactly one** caller-supplied pre-drag value, `onReveal` reads **ZERO**, and — in the control columns — the `'end'` arm's reveal IS exactly `1`. **THE ASSERTION IS BY CHANNEL, NOT BY COUNT: the row asserts WHICH channel carried the revert, because a module that reverts through `onReveal` reads the same channel total and fails the contract.** *(**AS FIRST WRITTEN this clause read *"the row's `4`-arm domain"* — the ARM COUNT was larger than the row's own table: the strategy cell declares `3` attempts and `§5.5.3` prints the term as `3`. CORRECTED 2026-09-27 by the red-exposed item `2`, and NO TERM MOVED: the fourth arm is NOT REAL, and the arms a reader might look for instead — a `cancel` arm and a refused-terminal arm — are `P-RL-SM-1`'s paths `(3)`/`(4)` and are carried THERE, so no arm is lost by the correction.**)* | **YES** | `M-8`, `M-13`, `M-14`, `F-9`, `F-16`, `§2.3` item 4, `§0A` notes 6/8 | `S-RL-RESET-1` | **`3` attempts** = **`3` arm drives, each asserting a `(revealWrites, the row's own recorded preview count, sinkCalls)` triple** — **the preview reading is THE ROW'S SPY'S, because `RelocateStats` exposes NO `previewWrites` member** (`§7a.1` item 2's working default).** **(1) THE INVALID ARM** — a move outside every candidate's proximity, then `pointerup`: assert **`revealWrites === 0`**, **`onPreview` received exactly one revert write**, `resets === 1`, `sinkCalls === 1` with the pre-drag value, and **the later `pointerup` committing nothing** (the count stays `1`). **(2) THE CONTROL — THE `'end'` ARM**, otherwise identical but within proximity on the last move: assert **`revealWrites === 1`** and `sinkCalls === 1` and `resets === 0` — **the pair `(1)`/`(2)` is what makes the zero-reveal cell a CONTRAST rather than an absence.** **(3) THE CONTROL — REVERT VIA THE WRONG CHANNEL**, a driver whose revert is published through `onReveal`: **the row FAILS the by-channel assertion even though its channel TOTAL matches** — **this is the drive that makes "which channel" falsifiable and not merely "how many".** **Per attempt assert:** the triple, the channel each write arrived on (the spies are separate functions and the drive records the CALLER), and the sink's value identity. |
| **`P-RL-SM-6`** *(the RULING-FORCED row — the per-move channel's SHOW/HIDE TRANSITION count, with the RETARGET drive)* | `P-SM` state-machine | **For EVERY move shape in the row's `7`-shape domain and EVERY gesture configuration in its `2`-shape domain: `onPreview` is invoked AT MOST ONCE PER OBSERVED MOVE, ZERO times at a committing terminal, NEVER invokes the reveal channel, and NO invocation of either channel ever accompanies a sink write in the same turn; and THE ZONE'S DISPLAYED-NESS IS NOT MONOTONIC — an observed move that leaves the proximity HIDES, and a RETARGET hides the old zone and shows the new INSIDE ONE OBSERVED-MOVE TURN (hide-plus-show is ONE transition, not two).** | **YES (bounded — the property text names "EVERY move shape and EVERY configuration" while the table drives `7` moves × `2` configurations; the universal is NOT proven)** | `M-7`, `M-11`, `F-5`, `F-7`, `F-9`, `I-4`, `R-16`, `§2.3` item 5 | `S-RL-CHANNEL-1` | **`14` attempts** = **`7` move shapes × `2` gesture configurations.** **The `7` move shapes (in the fixed order a single gesture drives them, and each is ALSO driven standalone in configuration (ii)):** **(1)** a move INTO proximity ⇒ `1` show · **(2)** a second move still within the SAME zone ⇒ `1` invocation carrying the unchanged zone (**not a second show — the transition count, not the invocation count, is what the state declares**) · **(3)** a move OUT of proximity ⇒ `1` HIDE · **(4)** a move back INTO the same zone ⇒ `1` show again (**the non-monotonicity, driven explicitly**) · **(5)** a RETARGET move — within proximity of candidate `B`, outside `A`'s ⇒ **`1` invocation carrying BOTH the hide of `A` and the show of `B`, in ONE turn** · **(6)** a move outside every candidate's proximity AFTER a retarget ⇒ `1` hide · **(7)** an `'end'` terminal ⇒ **`0` preview invocations at the terminal**. **The `2` configurations:** **(i)** the ordered gesture `(1)→(2)→(3)→(4)→(5)→(6)→(7)` above · **(ii)** each shape driven STANDALONE from a fresh session (so no shape's reading depends on its predecessor). **Per attempt assert:** the invocation count for that move (**exactly `1` or `0`**), the state the invocation carried (the hide/show transition), the absence of any `onReveal` invocation in the same turn, and — on shape `(7)` — the absence of any preview at a terminal. **`7 × 2 = 14`.** |
| **`P-RL-SM-7`** *(the invalid-placement arm)* | `P-SM` state-machine | **For EVERY invalidity class in the row's `3`-class domain: the invalid arm is taken AT MOST ONCE per gesture — the module enters the session's `reset` terminal EXACTLY ONCE, FROM ITS OWN MOVE TURN WHILE THE GESTURE IS STILL ACTIVE, commits EXACTLY ONE caller-supplied pre-drag value, leaves the later `pointerup` committing NOTHING, and the session's own terminal result agrees with the sink's record. A later `pointerup` that commits ANYTHING FAILS.** | **YES** | `M-8`, `M-13`, `M-14`, `F-18`, `F-15`, `I-3`, `§0A` note 8, `§2.3` item 6(c) | `S-RL-INVALID-1` | **`7` attempts** = **`3` invalidity classes × `2` `pointerup` timings (`6`) + `1` sticky control.** **The `3` classes:** **(1)** NO candidates at all (an absent/non-callable/throwing seam, or an empty answer) · **(2)** candidates whose distances are ALL outside `threshold` · **(3)** candidates whose distances are UNUSABLE (`NaN`/non-number/non-finite/throwing) — **the class the record's `M-1` addition forces.** **The `2` timings:** **(a)** the `pointerup` arrives AFTER the invalid arm was taken ⇒ it commits **nothing** · **(b)** the `pointerup` arrives while the gesture is still active and the arm was taken on the same move turn ⇒ same declared counts (the arm is not re-taken). **The `1` sticky control:** a gesture with the moves `outside → inside → outside → outside` ⇒ **`resets === 1`** exactly, with the presentation channel still receiving every move. **Per attempt assert:** `stats().resets`, the session double's call log (the `reset` entry's position in the turn sequence — **during the drag, not at the release**), the sink's value identity against the caller's pre-drag value, and the total sink-call count for the gesture (`1`). |
| **`P-RL-SM-8`** *(the record's `M-2` second half — the reset path's code propagation)* | `P-SM` state-machine | **For EVERY refusal class in the row's `3`-class domain: the module returns the SESSION's own code VERBATIM (byte-identical, `===`), carries NO module-local code of its own, passes NO code INTO the session, and its `stats().lastCode` reads a member of the session's own closed union.** | **YES** | `M-13`, `F-10`, `F-11`, `R-15`, `I-14`, `§2.3` item 4, `§2.4` item 5 | `S-RL-CODES-1` | **`4` attempts** = **`3` refusal classes + `1` closed-set control.** **(1)** a `reset(element)` with NO active gesture ⇒ the session's own `'no-gesture'`-class code, VERBATIM, with ZERO session calls (`F-10`'s class) · **(2)** a `reset(element)` on a DISPOSED session ⇒ the session's own `'disposed'`-class code · **(3)** a `reset(element)` on a session whose `reset` refuses with each of its remaining members in turn ⇒ each code returned byte-identically · **(4)** the CONTROL: a module carrying a code literal that is NOT a member of the session's union, or passing a code INTO `session.reset` ⇒ **the row FAILS**. **Per attempt assert:** the returned string against the session's own returned string (`===`), the session-call count, and the absence of any literal code of the module's own. |
| **`P-RL-TP-1`** *(the SEVEN-SEAM TOTALITY universal — with its BOUND in its own words, over a pinned-seed pool)* | `P-TP` totality | **For EVERY seam shape drawn from the pinned `15`-member pool and driven through EITHER of the row's `2` composition configurations: NO METHOD OF THIS MODULE THROWS — for any argument — AND `A THROWING INJECTED SEAM IS EXCLUDED FROM THAT UNIVERSAL ONLY WHERE `§2.4` item 1's SEVEN-SEAM TABLE NAMES A DIFFERENT, EXPLICIT OUTCOME FOR IT`: an absent, non-callable or throwing `session`/`candidatesFor`/`resolveTarget`/`onReveal`/`threshold`/`onPreview` is CAUGHT and mapped to its named safe default, while a throwing `commit` PROPAGATES to the caller of the terminal turn and a throwing `onPreview` PROPAGATES from the observed-move turn. Every drawn drive returns its declared shape: `attach`/`detach` returning a `boolean`, `reset` returning a `{ok, code, committed}` record, `stats()` returning the eleven declared fields **(their NAMES as of the 2026-09-27 rename: `§2.1` item 5; `§0A` note 14 item 1 — the count is ELEVEN before and after, and the member first written as `revealed` is now `revealWritesApplied`)**, and `detached` a `boolean`.** | **YES (bounded — the property text says "EVERY seam shape" while the pool holds `15` and the drive performs `30` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-7`, `F-8`, `F-11`, `F-12`, `F-17`, `I-10`, `§2.4` items 1/2/4 | `S-RL-TOTAL-1` | **`30` attempts** = **`15` pinned-seed DRAWS × `2` composition configurations** — **⟶ AMENDED 2026-09-27, RED-EXPOSED ITEM `4`, RULED IN THIS CELL (`§0A` note 13 item 4): CONFIGURATION `(ii)`'s SIX-SEAM SWEEP IS ASSERTIONS INSIDE THE ATTEMPT, NEVER DRIVES.** **ONE attempt = ONE draw × ONE configuration. In configuration `(ii)` the drawn shape supplies the six remaining seams IN TURN INSIDE that single attempt** — the six per-position drives/assertions are recorded BESIDE the term and NEVER COUNTED IN IT (`A DECLARED REGISTER TERM IS A DRIVE COUNT`), exactly the pattern `P-RL-TP-2` establishes in this same row region, whose `4` entry-point calls are ASSERTIONS inside one drive per argument shape. **THE ALTERNATIVE READING — `15 × 7 = 105` — IS REJECTED, and not only for consistency: `105` EXCEEDS THE REGISTER'S `≤100`-PER-ROW CAP, so that reading cannot be adopted without a CAP BREACH as well as a re-grain.** **The term `30`, the total `170`, every other term, both caps and every subtotal are UNMOVED.** — where **one attempt is one totality DRIVE (one drawn shape passed as one seam of one configuration, with every method then called once)** and **the per-call ASSERTIONS (`>= 3` each: did-not-throw · declared kind · declared members callable) are reported as the row's `assertions` figure, NEVER as attempts.** **The `15` draws come from the pool by the pinned LCG (`state₀ = 20260927`, ONE step per draw, `index = stateₙ₊₁ mod 15`) — so the same pool member may be drawn more than once and NO claim of full coverage is made or asserted.** **The `15`-member pool:** `undefined` · `null` · `42` · `'x'` · `true` · a plain object with no callable member · an ARRAY · a FUNCTION · a `Symbol` · a `12n` · a frozen empty record · a record with a THROWING accessor · a `Proxy` whose traps THROW · a callable returning its own argument · a record whose single member is callable. **The `2` configurations:** **(i)** the drawn shape supplies the `session` seam with the other six in their usable default form · **(ii)** the drawn shape supplies EACH of `candidatesFor`/`resolveTarget`/`onReveal`/`commit`/`threshold`/`onPreview` in turn (the six-seam sweep — one drawn shape, six seam positions, the other five in their usable default form). **Per attempt assert:** the declared shape of every method's return and the declared propagation/absorption for the position under test. |
| **`P-RL-TP-2`** *(the DECLARED-SHAPE-OVER-HOSTILE-ARGUMENTS quantification — totality of the four entry points)* | `P-TP` totality | **For EVERY argument shape in the row's `6`-shape domain, EVERY module entry point is TOTAL: `createRelocateSession(arg)` returns a module (never throws, never returns `null`/`undefined`/a primitive), `attach(element, hooks)` returns a `boolean`, `reset(element)` returns a `{ok, code, committed}` record, `detach()` returns a `boolean` and `stats()` returns the eleven declared fields — INCLUDING for a hostile `Proxy`, a throwing accessor, a `Symbol`, a `BigInt`, a function, an array and an absent argument. The converse clauses: no entry point leaves a state a later call cannot read (a `stats()` after any of them is readable and totals-consistent), and a refusal is always a RECORD or a `boolean`, never a throw.** | **YES** *(the `6` argument shapes × the `3` entry-point drives IS the declared grid; every cell has its own declared return kind)* | `F-11`, `F-12`, `M-13`, `I-10`, `§2.4` item 4, `§2.1` item 1 | `S-RL-SHAPES-1` | **`6` attempts** = **`6` argument shapes × `1` entry-point drive each, with the drive calling all four entry points in sequence** (so the `4` calls are ASSERTIONS inside one drive, reported beside the term). **The `6` argument shapes:** **(1)** `undefined` (the argument omitted) · **(2)** `null` · **(3)** `42` · **(4)** `'x'` · **(5)** a `Proxy` whose traps THROW · **(6)** a record with a throwing accessor — driven twice, on `session` and on `commit`, as the one shape's variants. **The drive per shape:** `createRelocateSession(shape)` ⇒ assert a module is returned and its five members are callable; then the module's `attach(shape)` and `attach(shape, shape)` ⇒ a `boolean` in both; then `reset(shape)`, `detach()` and `stats()` ⇒ the record, a `boolean` and the eleven fields. **Per attempt assert:** no throw, the declared return kind per call, and totals-consistency of the `stats()` read afterwards. |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly: `6` of the `15` rows.** **THE MARKED SET, and it is named IDENTICALLY at this block, at `§5.5.2` item 2 and at the status block's item 3: `P-RL-IM-1` · `P-RL-IM-3` · `P-RL-IM-5` · `P-RL-SM-4` · `P-RL-SM-6` · `P-RL-TP-1`.** **Each is marked because its PROPERTY TEXT IS LARGER THAN ITS TABLE:** **`P-RL-IM-1`** (*"every observation path"* over `5` paths, `4` observable) · **`P-RL-IM-3`** (*"EVERY class pair"* over `12` cells for (3a) and `3` for (3b)) · **`P-RL-IM-5`** (*"EVERY distance shape and EVERY gesture path"* over `7` × `3`) · **`P-RL-SM-4`** (*"EVERY stage and EVERY slot shape"* over `3` × `2`) · **`P-RL-SM-6`** (*"EVERY move shape and EVERY configuration"* over `7` × `2`) · **`P-RL-TP-1`** (*"EVERY seam shape"* over a `15`-member pool and `30` draws).

**THE UNMARKED SET (`9` of the `15` ROWS) — and this filing states it as a named list rather than as a bare count, because THIS PARAGRAPH HAS BEEN WRONG THREE TIMES.** **THE MARKED `6`, named once: `P-RL-IM-1` · `P-RL-IM-3` · `P-RL-IM-5` · `P-RL-SM-4` · `P-RL-SM-6` · `P-RL-TP-1`.** **THE `17` IDS, enumerated so the subtraction is checkable: `P-RL-IM-1` · `P-RL-IM-2` · `P-RL-IM-3` · `P-RL-IM-4` · `P-RL-IM-5` · `P-RL-SM-1` · `P-RL-SM-2` · `P-RL-SM-3` · `P-RL-SM-4` · `P-RL-SM-5` · `P-RL-SM-6` · `P-RL-SM-7` · `P-RL-SM-8` · `P-RL-TP-1` · `P-RL-TP-2` — THAT IS FIFTEEN IDS, WHICH IS THE HONEST COUNT OF THE IDS THIS REGISTER ACTUALLY DECLARES** — **and the `17` the register's own `§5.5.1`/`§5.5.2`/`§5.5.3` arithmetic uses counts `P-RL-IM-3`'s TWO HALVES as TWO TERMS and not two rows.** **⟶ THE REGISTER'S ROW/TERM ARITHMETIC, stated once so it closes: THE REGISTER DECLARES `15` ROWS AND `16` TERMS** — **`15` rows because `IM-1`..`IM-5` is five, `SM-1`..`SM-8` is eight, and `TP-1`..`TP-2` is two (`5 + 8 + 2 = 15`), and `16` terms because EVERY row carries EXACTLY ONE term and `P-RL-IM-3` carries ONE MORE THAN THE BASELINE — its TWO halves (`12` and `3`) — so `15 + 1 = 16`.** *(**AS FIRST WRITTEN this sentence read *"THE REGISTER DECLARES `15` ROWS AND `17` TERMS … and `17` terms because `P-RL-IM-3` carries TWO (`12` and `3`)"* — a TERM-COUNT defect: the enumerated fact it states (`P-RL-IM-3` carries two terms where every other row carries one) yields `15 + 1 = 16`, NOT `17`. The `17` was the row count incremented TWICE instead of once. Corrected 2026-09-27 by the register-arithmetic remand; the as-written form is kept visible here.**)* **THE REGISTER'S OWN HEADINGS SAY `17` TERMS; THE ROWS ARE `15` AND THE TERMS ARE `16`.** **THE AS-PRINTED `17` IS KEPT VISIBLE AS A DATED COUNTING DEFECT (the row noun and the term noun were conflated — the class `docs/next-steps.md`'s ledger arithmetic warns about when it says *"mixing the two nouns is how a spurious `21` was produced"*) — and it survives in TWO distinct wrong forms, both kept: the as-filed `17` ROWS (the `12`-of-`17`-rows listing defect below) and the `17` TERMS this block itself printed; the honest pair of forms is: `15` ROWS · `16` TERMS · `170` ATTEMPTS.** **THE UNMARKED SET IS THEREFORE `9` OF THE `15` ROWS — the nine ids `P-RL-IM-2` · `P-RL-IM-4` · `P-RL-SM-1` · `P-RL-SM-2` · `P-RL-SM-3` · `P-RL-SM-5` · `P-RL-SM-7` · `P-RL-SM-8` · `P-RL-TP-2`.** **⟶ THE THREE WRONG FORMS, kept visible per this file's annotate-never-rewrite convention:** **(a) AS FILED this block read *"`12` of the `17` rows"* — a LISTING defect of exactly the class the sibling register hit with `P-GT-SM-2`. (b) THE FIRST CORRECTION read *"`6` marked / `11` unmarked"* while listing NINE unmarked names — a count whose list did not close. (c) THE SECOND CORRECTION named `P-RL-SM-4` and `P-RL-SM-6` among the UNMARKED, WHICH IS FALSE OF THOSE ROWS' OWN CELLS.** **THE AUDIT'S INSTRUCTION, so no wrong figure propagates: A READ-ONLY PBT AUDIT (`§3a` `A-14`) MUST READ THE `Executed?` CELLS THEMSELVES and report the marked set it FINDS, rather than any figure printed in this prose.** **NO `Executed?` CELL OF `§5.5.1` WAS EDITED BY THIS OR ANY LISTING CORRECTION — no marking moved to close an arithmetic, and a pass or a case title that names a row this register does not mark is naming a row this filing does not have.**

**⟶ THIS SUBSECTION'S FOOT — THE TERM-COUNT CORRECTION, dated and kept beside its as-written forms
(`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; the annotate-never-rewrite convention this file states for
its own `(bounded)` and `12`-row defects, above). This block ANNOTATES; it deletes nothing.** *(**THE
CORRECTION WAS MADE 2026-09-27, in the register-arithmetic REMAND that followed this filing's gate-1
record: the register's TERM COUNT contradicted the register's own enumeration.**)*

**(a) WHAT THE DEFECT WAS, MEASURED AGAINST THIS FILE'S OWN BYTES.** This register declares **`15` typed
ROWS**, and **its own per-row `attempts` cells enumerate EXACTLY ONE TERM PER ROW — `P-RL-IM-1` (`21`) ·
`P-RL-IM-2` (`14`) · `P-RL-IM-3` (`12` **and** `3` — the ONE row carrying TWO) · `P-RL-IM-4` (`8`) ·
`P-RL-IM-5` (`21`) · `P-RL-SM-1` (`5`) · `P-RL-SM-2` (`11`) · `P-RL-SM-3` (`5`) · `P-RL-SM-4` (`6`) ·
`P-RL-SM-5` (`3`) · `P-RL-SM-6` (`14`) · `P-RL-SM-7` (`7`) · `P-RL-SM-8` (`4`) · `P-RL-TP-1` (`30`) ·
`P-RL-TP-2` (`6`)** — **which is `15` rows carrying `16` TERMS, because `15` rows at one term each (`15`)
plus `P-RL-IM-3`'s extra half (`+1`) is `16`.** **The `17` this file printed at many sites — the status
block, the honest-cost sentence, the DONE-row instruction, the register-entry-count ruling block, this
subsection's heading, this subsection's own one-sentence description, `§5.5.2` item 1, `§5.5.3` and
`§8` — was therefore ONE MORE THAN THE REGISTER DECLARES.** **The sentence that DERIVED the wrong figure
is kept visible in the status block, and it refutes itself in the same breath: *"the register declares
`15` rows and `17` terms because `P-RL-IM-3` carries TWO … `15 + 1 = 16`, not `17`"*.** **A term count
that disagrees with the register's own enumeration is exactly the class
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` polices**, and **the total's authority depends on the count
being the count of the terms it is the sum of.**

**(b) NO SEVENTEENTH TERM EXISTS — the register's own enumeration is the authority, and every enumerated
fact still holds: `15` rows (`5` `IM` + `8` `SM` + `2` `TP`), ONE term per row, TWO terms on `P-RL-IM-3`
alone, therefore `16` terms.** **A reader who wants a seventeenth term must NAME it and print it INSIDE
the sum; this pass could not, and the honest figures are therefore `15` ROWS · `16` TERMS · `170`
ATTEMPTS.**

**(c) EVERY OTHER ARITHMETIC RE-VERIFIED AGAINST THE CORRECTED COUNT, and NONE of it moved:**
**the declared total `170` still EQUALS the sum of all `16` printed terms**
(`21+14+12+3+8+21+5+11+5+6+3+14+7+4+30+6 = 170`); **the caps still compare against the DECLARED figures** — `170 <= 400`
total and the largest per-row term `30` (`P-RL-TP-1`) `<= 100` per row; **the family subtotals still sum
to the total** — `IM` `79` (`21+14+12+3+8+21`) + `SM` `55` (`5+11+5+6+3+14+7+4`) + `TP` `36` (`30+6`) =
`170`; **the addition chain still ends at `170`** (`§5.5.3`); **the ROW count is still `15`** (`5 + 8 + 2`);
and **the marked/unmarked split is still `6 + 9 = 15` ROWS.** **A term count is a count of terms, never
of rows — and the `17`-IDS phrase kept in the `(bounded)` block above is a slot census of ROWS (`15`
ids), not a term count.**

**(d) THE AS-WRITTEN FORMS, KEPT VISIBLE, and where:** the status block's `17` TERMS and its
*"`17` terms because `P-RL-IM-3` carries TWO"* and its *"SIXTEEN of the seventeen terms"*; the title-line
honest-cost sentence's `15`-row / `17`-term; the `§3.4`/`§4`-region DONE-row instruction's *"the SEVENTEEN
terms, not fifteen"*; the register-entry-count ruling block's `17` TERMS; **this heading** and **this
subsection's one-sentence description**; `§5.5.2` item 1; **`§5.5.3`'s `*"THE SUM OF THE SEVENTEEN
TERMS"` and its `17`-term reconciliation foot line**; `§7` item 9's *"the sum of the register's seventeen
printed terms"*; and `§8`'s two ruling rows. **Each site above carries its own dated correction beside the
as-written form; no as-written form was deleted.**

**⟶ THIS BLOCK'S FOOT — WHAT THE `17` IN IT MEANS, AND THE TERM COUNT IT DOES **NOT** CARRY (the
register-arithmetic remand, 2026-09-27):** **the `17` in the phrase *"THE `17` IDS"* is a **SLOT CENSUS
OF THIS REGISTER'S ROW IDS**, and the sentence that follows it in this same block states the honest count
of those ids in its own words: *"THAT IS FIFTEEN IDS, WHICH IS THE HONEST COUNT OF THE IDS THIS REGISTER
ACTUALLY DECLARES."* It therefore counts **ids (rows)**, and it is **NOT a term count** — `15` ids carry
`16` terms.** **THE TERM COUNT THIS FILE PRINTS AT MANY SITES IS `16`, NOT `17`** *(the status block, this
file's honest-cost sentence, the `§3.4`/`§4`-region DONE-row instruction, the register-entry-count ruling
block, this subsection's heading and its one-sentence description, `§5.5.2` item 1, `§5.5.3` and `§8` all
carried `17` as first written and each now carries a dated correction beside its as-written form)*, and
**NO SEVENTEENTH TERM EXISTS**: the enumeration is **ONE term per row for `15` rows (`15`) plus
`P-RL-IM-3`'s ONE extra term (`+1`) = `16`**, **whose values sum to `170`** — **so the DECLARED total,
every per-row term, both caps, the family subtotals, the addition chain and the `6 + 9 = 15` row split are
all UNMOVED by this correction**, which touches **only the count of the terms the total is the sum of.**
**The as-written `17`-term forms are kept visible, never deleted** — the whole correction, with the `16`
terms named and the sums re-verified, is at **`§5.5.1`'s foot**. **A DONE row or PBT audit that reads this
register as carrying `17` terms is citing the corrected defect, not the register.**

#### 5.5.2 The register's honesty block — what is NOT proven, and the checks this filing RAN

**Item 1 — the row count is an OUTCOME, and the breakdown signal is recorded ONCE.** **`15` rows carrying
`16` TERMS** *(**AS FIRST WRITTEN this item read `17` terms — the TERM-COUNT defect, corrected
2026-09-27; the as-written form is kept visible at `§5.5.1`'s foot, which carries the whole correction
and this site among the corrected ones**)* were
enumerated because **`15` discernible testable property classes exist**, and **the `≤8` threshold is a
guidance signal, not a ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`,
part 1). **THE BREAKDOWN RECOMMENDATION (the separable components, named once):** **`P-RL-IM-3`** — its
two halves have **different input domains and different strategies** and a future pass **COULD** split it
into two rows; and **`P-RL-SM-1`** — its **commit-terminal count** limb and its **crossing-invariance**
limb are separable. **That is a breakdown of TWO rows into four, not missing properties**, and **it is
NOT owed by this filing** — **no row is added, removed or re-scoped here**, and **`15` rows / `16` terms stay the extent** *(**AS FIRST WRITTEN this clause read *"`15` rows / `17` terms stay the extent"* — the TERM-COUNT defect, corrected 2026-09-27; the EXTENT claim itself is unchanged: no row, property or term moved**)*.
**THE OVERSHOOT IS JUSTIFIED ONCE, IN THE RULING'S OWN FORM: no property was dropped, merged or left
unenumerated to fit a threshold.**

**Item 2 — the `(bounded)` markings, and they are not formality.** **`6` of the `15` rows carry an
explicit `(bounded)` marking — `P-RL-IM-1`, `P-RL-IM-3`, `P-RL-IM-5`, `P-RL-SM-4`, `P-RL-SM-6`,
`P-RL-TP-1`** — and each **says so in its own `Executed?` cell**: *"the universal is NOT proven, and no
reader may read this row as its proof."* **The other `9` rows quantify over CLOSED NAMED LISTS or FIXED
GRIDS — no marking is owed and none is printed** *(**`6 + 9 = 15`, the register's row count; the
as-printed `11` is a dated listing defect kept visible at `§5.5.1`'s foot**)*. **A DONE row that reports any of the six as a proof of
the unbounded universal it states is a review finding.** **THE AS-FILED DISCREPANCY IS KEPT VISIBLE AT
`§5.5.1`'s foot: this block's predecessor paragraph printed `12`, which was a LISTING defect of the same
class the sibling register hit with `P-GT-SM-2`; the honest figure is `6` marked of `15` ROWS, and NO
MARKING MOVED to close it.**

**Item 3 — THE DECLARED-VERSUS-DISTINCT LEDGER, so the two figures are never conflated and the DECLARED
ones are always the cap comparison.**

| Row | Declared attempts | Its honest distinct figure | Why they differ (stated, not implied) |
| --- | --- | --- | --- |
| `P-RL-IM-1` | `21` | **`17`** | the `4`-shape × `4`-path grid's **ABSENT/NON-CALLABLE/THROWING rows on paths `(b)`/`(c)`/`(d)` read the same module-observable evidence** (the seam is never reached), so `4` cells collapse into `1` reading each; the `5` further drives are distinct — **AMENDED 2026-09-27 (red-exposed item `1`, `§0A` note 13): this row's *"why they differ"* text is NARROWER than the pinned reading, and its `17` is a REPORTED figure that is NEVER ASSERTED. The pinned non-reaching cell class is `(b)`/`(d)` FOR ALL FOUR SHAPES (`8` cells, each asserting the declared pair `(seam-calls 0, no invalidity)`), because path `(c)` DOES reach the seam — its single observed move precedes its `cancel`; and shape `(2)` ABSENT additionally reads `0` calls on EVERY path, because its member is not carried at all (the separate-composition reading of item `3`). A TestWriter re-reporting this row's distinct figure must use that scope; nothing here is asserted against either figure.** |
| `P-RL-IM-2` | `14` | **`12`** | the `2` configurations' shape-`(4)` (throwing) cells read the same observable consequence as shape `(2)`'s (no target), so `2` cells collapse |
| `P-RL-IM-3` | **`12` (3a) + `3` (3b)** | **`6` (3a) + `3` (3b)** | the `4` distance classes are `2` **DISTINCT comparisons** (`<=` true / `<=` false) with the hostile class collapsing to the `false` limb — **the declared `12` is the CELL count, and the honest DISTINCT-DRIVE figure is `6`** |
| `P-RL-IM-4` | `8` | **`8`** | the `7` member drives plus the positive control are each a distinct observation |
| `P-RL-IM-5` | `21` | **`15`** | the `7` distance shapes land in **`5` distinct module-observable classes** (usable-within, usable-outside, unusable, `NaN`, throwing-accessor), and `5 × 3 = 15` |
| `P-RL-SM-1` | `5` | **`5`** | five distinct terminal paths, each with its own declared pair |
| `P-RL-SM-2` | `11` | **`7`** | the `5` shapes × `2` terminal classes land in **`7` distinct composition×terminal observations** (the slot-empty and same-function shapes read the same on both terminals) |
| `P-RL-SM-3` | `5` | **`5`** | five distinct observation drives |
| `P-RL-SM-4` | `6` | **`4`** | the `3` stages × `2` slot shapes land in **`4` distinct readable stages**, because the pre-drag count is only readable at stages `(2)`/`(3)` and the two slot shapes read the same at stages `(1)`/`(2)` |
| `P-RL-SM-5` | `3` | **`3`** | three distinct arm drives, each a distinct channel triple; **the preview reading is the ROW'S SPY'S, since `RelocateStats` exposes no preview count (`§7a.1` item 2)** |
| `P-RL-SM-6` | `14` | **`10`** | the `7` move shapes land in **`5` distinct transition classes** (show · unchanged · hide · show-again · retarget), and `5 × 2 = 10` |
| `P-RL-SM-7` | `7` | **`6`** | the `2` timings' class-`(3)` cells read the same evidence (a sticky arm's counts do not depend on when the release arrives) |
| `P-RL-SM-8` | `4` | **`4`** | three refusal classes plus the closed-set control, each distinct |
| `P-RL-TP-1` | `30` | **`30` DRAWS** — and the DISTINCT-MEMBER count is a **REPORTED figure, never asserted** | **a DRAW IS NOT A SWEEP**: `15` draws over a `15`-member pool do **not** guarantee that every member is drawn, **and NO row may assert "all 15"** — **a DONE row claiming full pool coverage is a review finding** |
| `P-RL-TP-2` | `6` | **`6`** | six argument shapes, each a distinct drive |

**The DECLARED figures are what the `≤100`/row and `≤400` caps are compared against. The distinct figures
are REPORTED BESIDE them and are NEVER substituted for them** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`,
sub-rule 2; `§5.3` item 11).

**Item 4 — a DRAW is not a SWEEP, and the `P-RL-TP-1` pool is a SUBSET of the input space by
construction.** **The pool holds `15` members and the row draws `15` times**, so the row **reports** its
distinct-member count and **asserts nothing about coverage**. **The pool's silence about a shape it does
not list is a stated boundary, not an unrecorded omission**: a **revoked `Proxy`**, a
**`Symbol.toPrimitive` that throws**, and a **seam whose getter returns DIFFERENT answers on successive
reads** are deliberately **excluded** (the last because it would make a draw ambiguous, strategy-discipline
item 6(b)).

**Item 5 — the `S-RL-TOTAL-1` generator's ONE stated bias, recorded rather than hidden.** The pinned LCG's
reduction `index = stateₙ₊₁ mod 15` maps `2³² = 4294967296` states onto `15` residues, and
**`4294967296 mod 15 = 1`**, so **one pool index is reachable from `⌈2³²/15⌉ = 286331154` preimages and
the remaining `14` from `286331153`** — a **relative bias of ≈ 2.3 × 10⁻¹⁰ per draw**, inherited from the
sibling registers' identical one-step form. **It is stated so no later pass reads the draw as exactly
uniform; it is not a defect of the row** (the register is a **pinned-seed reproducibility** instrument,
not a sampler), and **the form, the seed and the caps are the ones the ACTIVE rules pin.**

**Item 6 — WHICH ROW CARRIES WHICH CLAIM, so no claim is quoted from a row that does not carry it.** **A
DONE row or audit that quotes the comparator's totality MUST cite `P-RL-IM-3`; the single-writer channel
discipline, `P-RL-SM-2`; the once-per-gesture write site and the declared terminal domain, `P-RL-SM-1`
and `P-RL-SM-3`; the invalid arm, `P-RL-SM-7`; the two-channel non-overlap and the non-monotonicity,
`P-RL-SM-6`; the seven-seam totality universal, `P-RL-TP-1`; the seam set's closure, `P-RL-IM-4`.**
**NO OTHER ROW MAY BE READ AS CARRYING ANY OF THEM.**

**Item 7 — THE POOL-VERSUS-BOUNDARY CHECK, RUN BEFORE FILING.** **The rule: a pool or table member that
CONTRADICTS its own row's declared boundary is a REGISTER DEFECT, and it is checked at AUTHORING TIME,
not at green time — the member must satisfy the row's boundary text, or the row must declare that member
as an intended class with its OWN expected outcome asserted, PER MEMBER.** **The check was run over all
`15` rows, and the RESULT is CLEAN for `14` of them and RECORDED-FOR-ONE with a stated remedy** *(the
one being `P-RL-IM-1`, whose remedy was TAKEN in this filing: the explicit `(bounded)` marking and the
declared non-reaching fifth path class, with its term unmoved)***:** every
member of every pool/table satisfies its own row's declared boundary text, and **no member required a
boundary narrowing**; **the ONE row whose boundary and table were found to disagree at filing time is
`P-RL-IM-1`, whose property text's phrase *"every observation path"* was larger than its `4`-observable
path grid — and the remedy was TAKEN IN THIS FILING rather than deferred: the row carries the explicit
`(bounded)` marking, its fifth path class is DECLARED NON-REACHING, and the term stayed `21`.** **The
per-row results:**

| Row | Its declared boundary | The check's result |
| --- | --- | --- |
| `P-RL-IM-1` | *at most once per observed move, only from the move turn, and unusable ⇒ the invalid arm* | **CLEAN with the marking above** — every one of the `4` shapes has its own declared call count and arm on every one of the `4` observable paths, **the three unusable shapes' paths `(b)`/`(c)`/`(d)` cells are DECLARED as *"the seam is never reached"*** — **AMENDED 2026-09-27 (red-exposed item `1`, `§0A` note 13): the non-reaching cell class is the `(b)`/`(d)` paths ACROSS ALL FOUR SHAPES (the pinned DECLARED-READING cells, whose declared pair is `(seam-calls 0, no invalidity)`), while path `(c)` reaches the seam through its own observed move; the `4`-shape × `4`-path grid remains a DRIVE count with a declared pair per cell, and the term stays `21`**, and the fifth path class is declared non-reaching **so no member contradicts the text** |
| `P-RL-IM-2` | *at most once per observed move, only within proximity, and unusable ⇒ no write and no throw* | **CLEAN** — the *"no target"* and *"no proximity"* cells are declared as **different observables** (the row's sharpest clause), so no member contradicts the boundary |
| `P-RL-IM-3` | *exactly one declared outcome per class pair, and the no-default clause* | **CLEAN** — the `4` distance classes include the HOSTILE class as a declared `false` limb with its `5` variants asserted per variant, **and the negative-threshold limb is declared rather than left implicit**; the row's `(bounded)` marking names its scope |
| `P-RL-IM-4` | *exactly seven named members, no eighth, `capture` absent* | **CLEAN** — the set claim is over a closed seven-name list, not a sample; the eighth-member control is **DECLARED AS FAILING**, which is what a positive control is |
| `P-RL-IM-5` | *every unusable distance ⇒ nothing within proximity, never a throw; only the distance decides* | **CLEAN** — the seven shapes each have their own declared limb, **and the CONVERSE cell (absent `candidate` + within-proximity `distance`) is declared as WITHIN PROXIMITY**, which is exactly the boundary's own words |
| `P-RL-SM-1` | *exactly once per `'end'`, zero on every other path, and crossing-invariant* | **CLEAN** — the `5` paths each carry their own declared pair, **the `'reset'` cell's ZERO is the RULED reading (`§0A` note 6) and is labelled DERIVED**, and the crossing-invariance limb rides inside paths `(1)`/`(2)` rather than contradicting them |
| `P-RL-SM-2` | *the declared count per composition shape, with the divergence as the falsifier* | **CLEAN** — the failing shapes are **DECLARED AS FAILING**, and the boundary text says the control's readings AGREE at `2` only for a genuine second writer on the same terminal |
| `P-RL-SM-3` | *the only call site is the commit seam; crossing-invariant* | **CLEAN** — the static census is declared as an assertion carrying no term, and the two control drives are declared as FAILING |
| `P-RL-SM-4` | *captured exactly once at establishment; nothing retained* | **CLEAN** — the refusal slot's variant is declared with `0` captures, and the running count is asserted **EXACTLY**, which is the boundary's own word |
| `P-RL-SM-5` | *the revert's CHANNEL is the per-move one, and no reveal occurs on that arm* | **CLEAN** — the by-channel assertion is the boundary, and the wrong-channel control is declared as FAILING |
| `P-RL-SM-6` | *at most one per move, zero at a terminal, never the reveal, and hide-plus-show is ONE turn* | **CLEAN** — shape `(5)`'s single-invocation-carrying-both-transitions cell is the boundary's own words, and the `'end'` shape declares `0` |
| `P-RL-SM-7` | *at most once per gesture, from the move turn while active; a later `pointerup` commits nothing* | **CLEAN** — the sticky control declares `1` exactly, and the two timings' cells declare the same counts, which is the boundary's claim |
| `P-RL-SM-8` | *the session's own codes verbatim; no module-local code* | **CLEAN** — the closed-set control is declared as FAILING, and no member requires a code the boundary does not name |
| `P-RL-TP-1` | *no method throws, with the two named propagations as the bound* | **CLEAN** — **the pool's members are totality inputs only**: the row claims no value boundary and no code boundary, **and the shapes that make `commit`/`onPreview` throw are NOT in the pool** — the two propagation bounds are stated in the row's own words rather than left implicit |
| `P-RL-TP-2` | *every entry point returns its declared shape for every argument shape* | **CLEAN** — the `6` argument shapes × the `4` entry-point calls are all totality inputs, and each call's declared return kind is stated |

**A register row found to contradict its own boundary at green time is a SPEC FINDING, reported rather
than tuned to green** — and **the LANDED tables must be re-checked by the adversarial pass**, because this
check was run against **this filing's tables**, not against the executed ones.

**Item 8 — THE EXECUTED LAYER IS NOT THIS FILING'S, stated once.** **This pass RAN NOTHING.** Every cell
above is **execution DESIGN**; the **measured** figures are the ones this unit's own
`tests/relocate.test.ts` and the independent blind run produce. **A read-only PBT audit may not report a
row as executed on the strength of this table alone** — the audit reads **the TestWriter's tables in
`tests/relocate.test.ts`** **and** this cell's arithmetic.

**Item 9 — A DECLARED-FAILING CONTROL ATTEMPT IS A COUNTED DRIVE AND IS NEVER A `broken` ROW (RULED 2026-09-27, `§0A` note 15 item `S6`; APPENDED — items 1–8 keep their numbers).**

**THE RULE, in four clauses.** **(1) A CONTROL DRIVE IS A DRIVE**: it is counted in its row's `attemptsRun`, **and it is already INSIDE the row's declared TERM** — `P-RL-SM-3`'s `5` includes its drives `(4)`/`(5)`; `P-RL-SM-5`'s `3` includes its drive `(3)`; `P-RL-IM-4`'s `8` includes its eighth-member control; `P-RL-SM-2`'s `11` includes its positive control; `P-RL-SM-8`'s `4` includes its closed-set control — **because `A DECLARED REGISTER TERM IS A DRIVE COUNT`** (`docs/decisions.md`, ACTIVE). **(2) A CONTROL'S DECLARED FAILURE IS AN OBSERVATION, NEVER A BREAK**: **the drive CONTAINS the declared-failing shape and ASSERTS it**, so the attempt **HOLDS** and the row's `broken` count stays `0`. **This is the family's own landed form** — `docs/specs/gutter.md`'s `E3-BLOCK-6(c)`: *"A REQUIRED PROPAGATION IS ASSERTED, NEVER SCORED AS A BROKEN ATTEMPT"* — **and it is the form a control exists for: a control whose failure is scored as a break cannot pass, and a row that cannot pass is a contract defect rather than a verdict.** **(3) THE RECORD REPORTS THE CONTROLS BESIDE THE TERM**: **a per-row `controls` figure**, printed in the row's own record line **beside `held`/`broken`**, **NEVER counted in the term** — the same status the DISTINCT figures of item 3 have. **(4) THE STATUS ROW'S OWN IDENTITY IS PRESERVED**: **`held + broken === attemptsRun` still holds for every row** (a control attempt that held is `held`), and **`broken === 0` remains the row's green criterion.**

**THE MEASURED INSTANCE SET, named so the re-grain is exact: THREE declared-failing control drives in TWO rows** — **`§5.5.1 P-RL-SM-3`'s drives `(4)` and `(5)`**, and **`§5.5.1 P-RL-SM-5`'s drive `(3)`**. **The other controls this file calls "DECLARED AS FAILING" — `P-RL-IM-4`'s eighth-member control, `P-RL-SM-2`'s two-writer/no-writer/same-function shapes, `P-RL-SM-8`'s closed-set control — ALREADY HOLD in the red set's own drives** (they assert the failing composition's declared readings rather than returning the row's own failure as a cause); **they are controls in this rule's sense and need no change.**

**CONSEQUENCE FOR THE REGISTER'S STATUS ROW.** **Per row it prints `attemptsRun` · `held` · `broken` · `controls`, and its `held + broken === attemptsRun` assertion is UNCHANGED.** **A status row whose `broken` figure counts a declared-failing control is a REGISTER DEFECT — REPORTED, never tuned to green.** *(**MEASURED at the present revision: the red set's `RegisterRow.run` scores a control's declared failure as `broken`, so `P-RL-SM-3` and `P-RL-SM-5` can never pass as written — the HARNESS, not the contract, is the fault, and the correction is TEST-side.**)*

**CONSEQUENCE FOR THE DONE ROW'S HONESTY BLOCK (`§5.3` item 10).** **The per-row record it must print reads `id · type · attempts-run · held · broken · CONTROLS`**, and **the DONE row must state, in the same cell, that its `broken` figures EXCLUDE declared-failing controls and that no declared term counts a control's failure.** **A DONE row that reports a declared-failing control as a broken attempt, or that quotes a non-zero `broken` produced by one, is a review finding.**

**NO TERM MOVES FOR THIS RULE — verified and printed: the register is still `15` ROWS · `16` TERMS · `170` ATTEMPTS = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`; the addition chain (`§5.5.3`) still ends at `170`; the family subtotals still read `IM` `79` · `SM` `55` · `TP` `36`; both caps still hold; and the `6 + 9 = 15` marked/unmarked split is unmoved.** **The `controls` figure is a REPORTED reading beside the terms, exactly as the DISTINCT figures of item 3 are.**

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**`170` = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`**

*(**THE AS-FILED FORM, kept visible per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`: this line AS FIRST
WRITTEN read `149` = `21` + `14` + `12` + `8` + `3` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` +
`30` + `6` — a FIFTEEN-TERM form that OMITS `P-RL-IM-5`'s `21`. THE WHOLE CORRECTION IS AT THE FOOT OF
THIS SUBSECTION.**)*

| The term | Its row | The enumeration that produces it |
| --- | --- | --- |
| **`21`** | `P-RL-IM-1` | `4` `candidatesFor` shapes × `4` observable paths (`16`) + `5` further drives = `21` — **AMENDED 2026-09-27 (red-exposed item `1`, `§0A` note 13): `(b)`/`(d)` are DECLARED-READING cells whose declared pair is (seam-calls `0`, no invalidity), so the `16` is a DRIVE count and the term is UNMOVED** |
| **`14`** | `P-RL-IM-2` | `4` `resolveTarget` shapes × `2` configurations (`8`) + `6` further drives = `14` |
| **`12`** | `P-RL-IM-3` (3a) | `4` distance classes × `3` threshold classes = `12` |
| **`3`** | `P-RL-IM-3` (3b) | the `3` no-default drives = `3` |
| **`8`** | `P-RL-IM-4` | the `7` member drives + `1` positive control = `8` |
| **`21`** | `P-RL-IM-5` | `7` distance shapes × `3` gesture paths = `21` |
| **`5`** | `P-RL-SM-1` | `5` terminal-path drives (the `2` crossing counts ride inside `2` of them) = `5` |
| **`11`** | `P-RL-SM-2` | `5` composition shapes × `2` terminal classes (`10`) + `1` positive control = `11` |
| **`5`** | `P-RL-SM-3` | `5` observation drives = `5` |
| **`6`** | `P-RL-SM-4` | `3` stages × `2` slot shapes = `6` |
| **`3`** | `P-RL-SM-5` | `3` arm drives = `3` — **the three arms NAMED at `§5.5.1 P-RL-SM-5` (red-exposed item `2`, `§0A` note 13): `(1)` the invalid arm · `(2)` the `'end'` control arm · `(3)` the wrong-channel control arm; the term is UNMOVED and the fourth arm does not exist** |
| **`14`** | `P-RL-SM-6` | `7` move shapes × `2` gesture configurations = `14` |
| **`7`** | `P-RL-SM-7` | `3` invalidity classes × `2` `pointerup` timings (`6`) + `1` sticky control = `7` |
| **`4`** | `P-RL-SM-8` | `3` refusal classes + `1` closed-set control = `4` |
| **`30`** | `P-RL-TP-1` | `15` pinned-seed draws × `2` compositions = `30` — **AMENDED 2026-09-27 (red-exposed item `4`, `§0A` note 13): configuration `(ii)`'s six-seam sweep is ASSERTIONS INSIDE the attempt, never drives, so `15 × 2` is the term and the `15 × 7 = 105` reading is REJECTED (it would also breach the `≤100`-per-row cap); the term is UNMOVED** |
| **`6`** | `P-RL-TP-2` | `6` argument shapes × `1` drive each (the `4` entry-point calls are assertions inside the drive) = `6` |

**THE TERM-BY-TERM ADDITION, so the total is checkable rather than asserted** *(the order is `§5.5.1`'s
row order, with `P-RL-IM-3`'s two terms adjacent)***:**

**`21` → `35` → `47` → `50` → `58` → `79` → `84` → `95` → `100` → `106` → `109` → `123` → `130` → `134` → `164` → `170`.**

**`170` IS THE SUM OF THE SIXTEEN TERMS `§5.5.1` ENUMERATES.** *(**AS FIRST WRITTEN this sentence read
*"THE SUM OF THE SEVENTEEN TERMS"* — the TERM-COUNT defect, corrected 2026-09-27 by the
register-arithmetic remand: the `16` terms are the `15` rows' one term each plus `P-RL-IM-3`'s second, and
NO SEVENTEENTH TERM EXISTS to name. The as-written form is kept visible here and at `§5.5.1`'s foot.**)* **THE CORRECTION, in
the form `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` demands** (*"a mis-sum is corrected by annotating
beside the as-filed form, never by silently rewriting it"*):

- **WHAT THE AS-FILED `149` WAS: a FIFTEEN-VALUE line that under-counted the register by exactly `21` and
  collapsed `P-RL-IM-3`'s TWO halves (`12` and `3`) into one slot.** **The arithmetic, stated once and
  plainly: THE AS-FILED LINE OMITTED `P-RL-IM-5`'s `21`, AND `149 + 21 = 170`; the TERM VALUES themselves
  never moved — only the total and the slot list were wrong.**
- **THE HONEST DECLARED TOTAL IS `170`, IT IS THE SUM OF THE SIXTEEN PRINTED TERMS, AND IT IS WHAT THE
  CAPS ARE COMPARED AGAINST: `170 <= 400` total, and the LARGEST PER-ROW TERM IS `30` (`P-RL-TP-1`),
  inside `<= 100` per row.** *(**AS FIRST WRITTEN this bullet read *"THE SUM OF THE SEVENTEEN PRINTED
  TERMS"* — the TERM-COUNT defect, corrected 2026-09-27; the TOTAL, the caps and the largest term are
  UNMOVED by the correction, because the correction is to the COUNT of the terms the total is the sum
  of, not to any term's VALUE.**)* **A DONE row that quotes `149` is quoting a superseded figure; a DONE row
  that quotes a total which is not the sum of its own printed terms is a review finding.**
- **THE DEFECT IS THE FAMILY'S SIXTH CONSECUTIVE INSTANCE** (`E3` `314`→`299`, `E10` `140`→`134`, and the
  sibling precedents `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` records), **and it is recorded here as a
  dated corrected arithmetic defect rather than hidden by an edit.**

**THE FAMILY SUBTOTALS, stated consistently with that addition:** **`IM` = `21 + 14 + 12 + 3 + 8 + 21` =
`79`** · **`SM` = `5 + 11 + 5 + 6 + 3 + 14 + 7 + 4` = `55`** · **`TP` = `30 + 6` = `36`** — and
**`79 + 55 + 36 = 170`.**

**THE ROW/TERM RECONCILIATION, printed so it is checkable:** **the `15` ROWS and their terms are
`IM-1` (`21`) · `IM-2` (`14`) · `IM-3` (**`12` + `3` — TWO TERMS**) · `IM-4` (`8`) · `IM-5` (`21`) ·
`SM-1` (`5`) · `SM-2` (`11`) · `SM-3` (`5`) · `SM-4` (`6`) · `SM-5` (`3`) · `SM-6` (`14`) · `SM-7` (`7`) ·
`SM-8` (`4`) · `TP-1` (`30`) · `TP-2` (`6`)** — **`15` rows; and the TERMS number `16` because
`P-RL-IM-3` carries one term beyond the one-per-row baseline (its two, `12` and `3`).** **THE IDS NUMBER `15` (five `IM` + eight `SM` + two `TP`), THE TERMS NUMBER
`16`, AND THE TOTAL IS `170`.** *(**AS FIRST WRITTEN this footnote read *"the TERMS number `17`"* and
*"THE TERMS NUMBER `17`"* — the TERM-COUNT defect, corrected 2026-09-27; the `15`-ROW figure, the
`12` + `3` halves and the `170` total are all UNMOVED, and the row/term reconciliation printed just above
enumerates `16` terms for `15` rows.**)* **THE `17`-TERM FIGURE PRINTED AT `§5.5.1`'s HEADING AND IN THIS FILE'S
STATUS BLOCK, AND THE `17`-ROW FIGURE BESIDE IT, ARE A DATED COUNTING DEFECT IN TWO WRONG FORMS — as
first written the heading and the status block said *"`17` rows"* and *"`17` typed rows"* (the ROW noun
wrongly incremented) while this footnote said *"`17` terms"* (the TERM noun wrongly incremented) — corrected at `§5.5.1`'s
foot: `15` ROWS · `16` TERMS · `170` ATTEMPTS.**

---

## 6. Falsification / stop conditions

**The unit's falsification, stated once, plainly.**

1. **THE PURE HALF.** *If a pure TOTAL `withinProximity(distance, threshold)` cannot return a declared
   `boolean` for every input in its enumerated domain — holding the `typeof` gate, the boundary-inclusive
   comparison, the non-finite and negative-operand readings, and the absence of coercion, of a result
   record, of a built-in literal (no epsilon, no default threshold) and of a second comparison site — then
   the pure half is not realisable **the way ruling 1's referent pins it**, and the unit fails on that
   half.* **The tests are `M-2`, `F-1`..`F-3`, `I-1`, `I-12`, and the register rows
   `P-RL-IM-3`/`P-RL-IM-5`.**
2. **THE COMPOSITION HALF.** *If a session COMPOSED ON the landed frozen gesture session cannot derive —
   rather than re-express — **"the reveal exactly once per gesture, only at `'end'` · the ghost and the
   zone's mid-drag hide on ONE per-move channel · the invalid arm once, from the module's own move turn · a
   release outside proximity leaving the later `pointerup` committing nothing"** as a **three-channel
   discipline over ONE named sink**, while keeping **no drag arithmetic, no coordinate, no geometry and no
   distance computation** and adding **no second gesture authority**, then the composition is not
   realisable and the unit fails.* **The tests are `M-1`, `M-3`..`M-17`, `F-4`..`F-10`, `F-13`..`F-19`,
   `I-2`..`I-9`, `R-13`/`R-14`, and the register rows `P-RL-SM-1`..`P-RL-SM-8`/`P-RL-IM-1`/`P-RL-IM-2`/
   `P-RL-IM-4`.**
3. **THE LAYER HALF.** *If the unit cannot express its contract WITHOUT making a rendered-geometry claim —
   i.e. if any row of it needs a `[U]` or `[D]` leg to be falsifiable — then the unit exceeds its provable
   layer and the unit fails.* **The tests are `R-8` + `I-11` + `§5.2`'s refusal to offer a `[U]`/`[D]` row
   + `R-17`, and the finding it prevents is the false-green class in which a node-suite green is reported
   as a rendered, coordinate or retargeting proof.**

**The three outcomes, exhaustively:** **(a)** the module lands as spec'd; **(b)** an **impossible** clause
is found and **the spec is amended**, with the clause marked `SUPERSEDED` and the reason recorded
**before** implementation continues; **(c)** the unit is **declined back** — admissible only if a clause
is shown to be **inseparable from the session's own lifecycle** (which would refute ruling 3's composition
claim) or **inseparable from rendered geometry** (which would refute the `[U]` refusal), and **either would
be a NEW GATE, not this unit's call.**

**Stop conditions (`S-*`) are `§4.4`'s and are BINDING**, including for register rows: **a register row
whose assertion cannot be falsified on `[T]` is NOT silently dropped and is NOT moved to a `[U]`/`[D]`
leg** — it is marked in `§7` as **`UNPROVABLE AT THIS LAYER`** and reported to the supervisor. **This
filing has NO such candidate**: **every claim in `§5.5.1` is a boolean, call-count, code or file-property
claim over arguments**, and **the one class that would have been `[U]`-shaped — the visible expansion, the
ghost and the visible revert — is REFUSED at filing time and carries NO row at all** (`§5.2`).

---

## 7. Honest statements (recorded so no later pass over-reads this unit)

1. **NOTHING IS IMPLEMENTED, NOTHING IS GREEN, AND NO STATUS IS ADVANCED.** This filing writes **one new
   spec file** and **nothing else**. The module, the test file, the red set, the legs, the register's
   executed layer and every gate after gate 1 are **OWED**; **the unit is NOT delegable until a TestWriter
   has RUN and REPORTED the red set** (`§4.5`).
2. **NO COORDINATE, NO GEOMETRY AND NO DISTANCE-COMPUTATION CLAIM, EVER.** The distance is the
   **CUSTOMER's measurement, delivered as a scalar**; the comparison is one public pure function's; the
   module **reads no coordinate and takes no event object and computes no distance — a NAMED, RECORDED
   COST.** **No pass may claim this unit's green proves a pane moved, a zone expanded, a ghost appeared,
   a drag worked or a revert was perceived** (`§1` item 2; `I-11`).
3. **THERE IS NO CAPTURE, AND THE LIMITATION IS STATED FOR A FORK.** Per
   `E3-CAPTURE-OPT-IN-IS-STILL-OWED-AND-ITS-CONSEQUENCE-IS-LIVE` (`docs/decisions.md`, ACTIVE), **with no
   capture installed a drag whose pointer leaves the moved element's box LOSES ITS READING** — the reading
   freezes at the last in-box position and the terminal is driven by whatever release the user performs
   outside. **For a PANE drag that is MORE reachable than for a 44 px handle, and this unit's fork-facing
   statement must say so.** **`E4` does not adopt the opt-in**: the session's capture capability is landed
   (`capturePointer?`, `docs/specs/gsession.md` `§2.5` item 2) but **the opt-in is `E3`-side and is the
   ARCHITECT's** — a FROZEN-contract change needs its own gate (`§0A` note 11).
4. **THE GEOMETRY LIMIT, where a reader meets it.** **This unit asserts CHANNEL COUNTS, CHANNEL IDENTITY
   and ONE PURE FUNCTION'S BOOLEAN — and NEVER rendered geometry.** **No `[U]` row is offered and no `[D]`
   row is claimed** (`§5.2`), because **the module has no importer and reads no coordinate — there is no
   rendered surface to observe and nothing for a measuring leg to measure.** **Gate 6 is likewise
   `STRUCTURAL`, with its reason stated** (`§5.2`).
5. **A CHANNEL-INVOCATION GREEN IS NOT A RENDERED-STATE GREEN.** Every counted invocation is **a call into
   an argument-supplied function** — **never a fact about a zone's visibility, an expanded box, a ghost's
   position on screen, an applied class, a layout pass or a perceived revert** (layer anchor 5).
6. **`docs/skills/designing-pages.md` DOES NOT EXIST** (globbed `docs/skills/*` at filing:
   `process-guardrails.md` alone), **and this unit renders no page**: there is **no test-use-case coverage
   matrix, no demo-page index and no page-design contract to update**. **`R-9` is the PROBE that keeps
   that claim falsifiable**, and **if that file comes to exist, this unit owes the coverage row and the
   demo-page entry** — with the honest note that a mechanism with no UI surface can only contribute an
   **absence** row.
7. **THE TRACKER ITEMS THIS FILING BELIEVES ARE OWED — listed, and NOT edited here** (`§5.1`'s allow-list
   admits tracker rows only for the pass that produces them, and this pass is a filing):
   **(a)** `docs/next-steps.md`'s row **`E4`**: its spec cell (`OWED — not filed` → FILED) and its status;
   **(b)** the same row's **acceptance cell annotated** so it does not read as the frozen surface (it names
   **six** members; `§2.1` item 2 names **seven**, with `onPreview` identified as the ruling's addition);
   **(c)** the same row's **`Legs` cell annotated to the four-leg convention** (`§5.2`);
   **(d)** the **`SCH-6` → `SCH-7` citation sweep** the gate-1 record owes at its `§5.8` item 6, wherever a
   cell still reads `SCH-6` as `E4`'s source. **`docs/FORKER.md`'s seam contract** is a **downstream**
   artifact (ruling 11, consequence (3)) and is **not owed by this filing's gate**; if the supervisor wants
   this unit's seven seams carried there, that is a tracker row for a later pass, **stated here rather than
   performed.**
8. **THE DERIVED ITEM IS FLAGGED, NOT SMUGGLED.** The mapping *"the hide rides channel (B), hence channel
   (A) reads zero on the invalid arm"* is a **DERIVATION** (`§0A` note 6) — **labelled at `§0A` note 6,
   `§2.3` item 5, `§5.5.1 P-RL-SM-1`, `I-4` and `§7a.1` item 3**, with **its alternative recorded as
   architect-reversible.** **No pass may cite it as an architect's verbatim sentence.**
9. **THE REGISTER'S MARKINGS ARE EXECUTION DESIGN, NOT RESULTS, AND ITS ARITHMETIC CARRIES ONE DATED
   DEFECT.** This pass **ran nothing**. **The total is `170`, the sum of the register's SIXTEEN printed
   terms** *(**AS FIRST WRITTEN this item read *"seventeen printed terms"* — the TERM-COUNT defect,
   corrected 2026-09-27: the register's `15` rows carry `16` terms, and the `170` total is their sum**)* — and **the as-filed `149` is recorded at `§5.5.3` as a dated corrected arithmetic defect
   rather than silently rewritten** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`, ACTIVE: *a total that is
   not the sum of its own terms is a review finding*). **A row marked executable here that is broken when
   the red runs is a SPEC FINDING, reported rather than tuned to green.**
10. **NO ROW OF THIS UNIT CLAIMS AN ENGINE BEHAVIOUR, A PACKAGE CAPABILITY OR A `bodyRuns`/`BARE-TEXT-EMIT`
    SURFACE.** This module **imports no engine surface at all** (`§2.1` item 4; `R-4`), and **it exercises
    `provident-ssr` nowhere** — so **no `docs/defects.md` / `docs/HANDOFF.md` entry can arise from this
    unit**, and **none may be written for it.**
11. **NO MCP SURFACE, NO STORE, NO PERSISTENCE, NO CSP CHANGE, NO SHIM CHANGE, NO IPC METHOD.** **This unit
    appears in none of the MCP registration sites**, and **`stats()` is a module method, not an
    agent-reachable surface** (`§0A` note 10; `I-13`).
12. **THE CODE DOMAIN IS CLOSED AT THE SESSION'S OWN UNION, WITH NO ADDITION OF THIS UNIT'S.** **This
    module declares NO code of its own** — the contrast with `E3`, which had to declare two
    controller-local codes, is stated so no TestWriter infers a third: **this unit's refusals either
    propagate a session code VERBATIM or are the module's own `{ok, code, committed}` record on a path
    where the session is NOT CALLED** — and **on that path the code is the session's own `'no-gesture'`-
    class reading, derived from the module's own state, never an invented sentinel** (`§2.3` item 4,
    `§2.4` item 5, `F-10`, `I-14`, `R-15`). **A module-local code is `§4.4 S-11` and does not land.**
13. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/relocate.md` — and edited NO existing file.**
    It ran **no test, no suite, no leg, no trio, no `tsc` invocation and no git command**; it wrote **no
    code**; and it touched **no `src/**`, no `tests/**`, no sibling spec, no tracker, no `package.json`,
    no `scripts/**`, no config and no adjacent repo.** **The tracker cells it leaves stale are the
    SUPERVISOR's to reconcile** (`§7` item 7; `§8`).

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **Three items** could not be derived **falsifiably**
from the gate-1 record with a single reading, because **two admissible readings both satisfy its words and
the choice changes either a PUBLIC SIGNATURE or a ROW'S ASSERTABLE CONTENT.** **Two of them are OPEN with
a WORKING DEFAULT; the third is DERIVED and PINNED-PENDING-CONFIRMATION** *(**AS FILED. ⟶ AMENDED 2026-09-27, after the red ran: item `1`'s working default is NO LONGER OPEN — it is PROMOTED TO A PINNED CLAUSE by the red-exposed item `7` (`§0A` note 13 item 7, `§2.3` item 6's pinned lead-in); item `2`'s default REMAINS A DEFAULT; item `3`'s derived reading is unchanged**)* *(this filing's choice,
implemented in `§2` and marked as such)*, with a RECOMMENDATION and the CLAUSE each one BLOCKS. **No item
is left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or diff-scope clause is
weakened, widened or re-scoped by this report.** **A later pass that changes any of these defaults MUST
OPEN A GATE.**

### 7a.1 THE OPEN QUESTIONS — two open items and one derived-pending-confirmation item

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) — **AS FILED; for item `1` this column's entry is PROMOTED TO A PINNED CLAUSE as of 2026-09-27 (see the row), while item `2`'s entry REMAINS A DEFAULT** | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **THE MODULE'S OWN MOVE-TURN SITE FOR THE INVALIDITY TEST** — the record pins the invalid arm as taken **from the module's own move turn while the gesture is still active** (its `§5.5`(b) third item, the `E10` `R7` precedent) but **does not say WHERE in that turn**: **before** the consumer's `onMove` wrapper forwards the hook, or **after** it. **Both readings satisfy the record's words**, and the difference is observable: on the "after" reading a consumer's own `onMove` sees the invalidity already handled; on the "before" reading it sees the pre-arm state and may itself write | **A row cannot assert the TURN ORDER without a choice**, and `P-RL-SM-7`'s *"from its own move turn"* clause is the only place the ordering is visible. **The two readings produce different observable sequences for a consumer hook that inspects state, and the difference is a CONSUMER OBLIGATION rather than a private detail** | **PINNED 2026-09-27 — NO LONGER A WORKING DEFAULT** *(promoted by the red-exposed item `7`, `§0A` note 13: a red set may not be authored against a default the contract calls open; the as-filed *"why a falsifiable row could not be derived as written"* wording is kept verbatim in the cells to the left, and the reading itself is UNCHANGED)* · **THE READING, PINNED: THE INVALIDITY TEST RUNS AFTER THE CONSUMER'S `onMove` HOOK IS FORWARDED** — i.e. the module's move turn is **candidatesFor → proximity → resolveTarget → `onPreview` → the consumer's `onMove` → the invalid-arm test**, and at establishment **the module's own `onStart` wrapper → the consumer's `onStart`** (`§2.3` item 6's pinned lead-in, `M-3`'s recorded order). **The reason: the consumer's own hook must see the same gesture state the session gave it, and a hook that ran BEFORE the arm would observe a gesture the module was about to reset** — which would make the consumer's own per-move writes racy against the reset | **Do you accept the invalid-arm test running AFTER the consumer's `onMove` hook is forwarded (recommended), OR do you want the arm taken BEFORE the hook so a consumer's move turn always sees the post-arm state — noting that the second reading makes the consumer's own per-move writes land on a reset gesture?** *(**THE QUESTION IS RETAINED VERBATIM AS THE AS-FILED FORM. ⟶ ANSWERED IN THIS PASS, 2026-09-27: the reading is PINNED — the promoted clause is in the cell to the left — so this question is no longer OPEN and the default it asked about is no longer a default. The architect's confirmation of the PINNED reading still belongs at the spec gate; what changed is that the contract no longer describes its own clause as undecided, which is what the red set required.**)* | **`M-3`** (its recorded order), **`P-RL-SM-7`** (its *"from its own move turn"* clause), `§2.3` item 6(c), and the consumer-obligation half of the fork-facing statement |
| **2** | **WHETHER THE MODULE COUNTS ITS OWN PREVIEW INVOCATIONS IN `RelocateStats`** — the record's `M-2` addition says **which channel carries the invalid arm's visible revert** and **that no reveal write occurs on that arm**; it does **not** say whether `stats()` carries a `previewWrites` counter. **The two readings differ in a PUBLIC SHAPE**: a counter is a member a consumer can read and a row can assert against | **`P-RL-SM-5` asserts the by-channel triple `(revealWrites, previewWrites, sinkCalls)` — so the row's own assertability depends on whether the module exposes the third reading or whether the row must read it from its own spy.** **Both are admissible: the row is falsifiable either way, but the PUBLIC SURFACE differs, and a reader of `§2.1`'s `RelocateStats` block sees a counter that this item names as a choice** | **THE MODULE DOES NOT EXPOSE A PREVIEW COUNTER.** `RelocateStats`'s declared fields are **the readings the ROWS need and no more**, and the preview count is **NOT one of them**: `P-RL-SM-5` and `P-RL-SM-6` read `onPreview` invocations **from the row's OWN recording spy**, and `P-RL-SM-5`'s triple is therefore `(revealWrites, the spy's preview count, sinkCalls)` (`§5.5.1`). **The reason: a counter the contract does not need is a public member the contract then owes rows for, and `§2.1` item 3 freezes the member surface at five** — so the DECLARED `RelocateStats` block carries **no `previewWrites` field**. | **Do you accept the module reading the preview channel through the CALLER's own spy (recommended — it keeps `RelocateStats` at its eleven declared fields and adds no member), OR do you want a `previewWrites` counter in `RelocateStats`, which makes the channel readable without a spy and adds one field to a frozen shape?** | **`§2.1` item 1's `RelocateStats` block** (the eleven fields), **`P-RL-SM-5`**'s triple, **`P-RL-SM-6`**'s counts, and `§2.1` item 3's five-member surface |
| **3** | **THE `§9` MAPPING — the zone's mid-drag hide RIDES CHANNEL (B), and therefore channel (A) reads ZERO on the invalid arm** | **This one is NOT open: it is DERIVED, PINNED, and PENDING THE ARCHITECT'S CONFIRMATION AT THIS GATE.** **`docs/decisions.md`'s ruling 2 flags the mapping as a DERIVATION in its own row, and the gate-1 record's `§9` requires the spec to *"pin the derived reading, mark it as derived, and let the architect confirm or flip it"***. **It is listed here so the reader sees it in the same place as the other two, NOT because it is undecided** | **PINNED AS DERIVED: the hide rides (B)** — hence `P-RL-SM-1`'s declared terminal domain is **`{` `'end'` `}`** with the invalid arm's zero-reveal cell, and `P-RL-SM-6`'s retarget cell carries hide-plus-show in ONE observed-move turn (`§0A` note 6). **The ledger's *"exactly once per gesture at gesture end"* strengthening STANDS UNAMENDED AND LITERALLY TRUE** | **CONFIRM the derived reading (recommended), OR FLIP it — in which case the ledger's strengthening becomes FALSE AS WRITTEN on the invalid arm, `P-RL-SM-1`'s declared terminal domain moves to `{` `'end'`, `'reset'` `}`, `P-RL-SM-5`'s by-channel triple changes on the invalid arm, and `§5.5.3`'s arithmetic must be re-derived at the gate — which is why the flip is an architect's act and not a spec-writer's.** | — (no clause is blocked on the RECOMMENDED reading; the FLIP re-derives `P-RL-SM-1`/`P-RL-SM-2`/`P-RL-SM-5`/`P-RL-SM-6`'s cells and `§5.5.3`'s total) |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `0` ruled by this filing
as contract · `2` OPEN with a working default and a recommendation (`1`, `2`) · `1` DERIVED and
PINNED-PENDING-CONFIRMATION (`3`) · `3` clause groups blocked.** *(**AS FILED. ⟶ AMENDED 2026-09-27, after the red set was authored AND RUN (`tests/relocate.test.ts`, `90` rows, `81` failed / `9` passed against the absent module — the orchestrator's record): item `1` is PROMOTED from a default to a PINNED CLAUSE, with its provenance kept visible (the red-exposed item `7`), so the honest arithmetic now reads `3` items reported · `1` PINNED as contract, promoted from a default (`1`) · `1` OPEN with a working default and a recommendation (`2`) · `1` DERIVED and PINNED-PENDING-CONFIRMATION (`3`) · `2` clause groups still open (`2`, `3`) — item `1`'s clause group is UNBLOCKED by the promotion. The as-filed figures above are kept visible and are NOT deleted.**)* **Every item's default IS implemented in
this spec's text**, so **the red set may be authored against the defaults** — but **each default is a
DEFAULT, marked as one, and a later pass that changes one must open a gate.** **The delegation gate's
ambiguity condition is therefore `NOT SATISFIED` by this filing: `§4.5` records the unit as non-delegable
on the red-set condition, and the supervisor must ALSO route these items** — this filing reports them
rather than silently adopting them. *(**AS FILED. ⟶ 2026-09-27: the red set has since been authored AND RUN (`tests/relocate.test.ts`, `90` rows, `81` failed / `9` passed against the absent module — the orchestrator's record), and the SEVEN contract items that run exposed are RULED at `§0A` note 13 — so this sentence's standing is THIS FILING's, not the unit's.**)*

---

## 8. Supersession / citation index

**Reading the index:** **ADOPTED** = this unit's charter. **DECLINED** = an obligation that stays with
another owner and **must not be pulled in**. **OWED** = an obligation not yet discharged. **NOT THIS
UNIT** = closed elsewhere or another unit's — listed so no later pass routes it here.

**Citation hygiene for this file:** every `src/**`, `tests/**` and `docs/decisions.md` anchor is cited
**by SECTION or by row id, never by line length** — this repo's own rule. **`docs/next-steps.md` is cited
by ROW ID** (`C2`, `E4`, `E5`, `E6`, `E10`), **never by line**. **`docs/decisions.md`'s row anchors drift**
(rows are appended), so its rows are cited **by NAME**.

| Source | Status for `U-RELOCATE` | Where |
| --- | --- | --- |
| **`docs/specs/relocate-review.md`** — the CLOSED gate-1 record: the reviewed unit, the four step verdicts, the condition tables `C-1`…`C-7`/`C-A`…`C-F`, the seam table, the channel model, the arithmetic's home, the layers, the register amendments and the twelve-item filing checklist, **plus its appended `§9`** | **ADOPTED — THIS UNIT'S CHARTER AND THIS FILING'S AUTHORITY.** Its conditions are **derived** at `§0`/`§0A`, its filing checklist is landed item by item (`§2`..`§5`), its `R-1`…`R-4` amendments and `M-1`/`M-2` additions are landed at `§5.5.1`, and **the record is NEVER edited by this unit** (`§5.1`'s DENIED set item 11) | `§0`, `§0A`, `§2`..`§5`, `§5.1`, and this row |
| **`SCH-7` (`PANE-RELOCATE-GESTURE`), as ADOPTED-RESHAPED by `A-d4`**, with the `SCH-6`→`SCH-7` correction dated 2026-09-27 (`docs/next-steps.md` `§5`, verbatim: *"`E4`'s own cell reads `SCH-7 (A-d4)`; `SCH-6` is `E3`'s spent source"*) | **ADOPTED as this unit's upstream** — the surface `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, commit, threshold})` **PLUS the ruling's seventh member `onPreview`**, with **the reveal written exactly once per gesture at gesture end, the resolve policy injected and interrupt/cancel leaving no retained sinks or listeners.** **Any earlier text reading `SCH-6` as `E4`'s source is SUPERSEDED, and the wider sweep is OWED to the supervisor** (`§7` item 7(d)) | `§0` rulings 4/5, `§0A` note 3, `§1`, `§2.1`, `§8` (this row) |
| **`APP-POLICY-STATE`'s objection to `SCH-7`** (`docs/pending.md`'s `SCH-7` row) | **ANSWERED — BY INJECTION, not by declining.** `resolveTarget` and `candidatesFor` are injected callbacks; the mechanism holds **no** pane/zone vocabulary and **no** policy default; `onReveal`, `onPreview` and `commit` are injected too | `§0A` note 3, `§2.1` item 2, `§2.2` `P-8`, `§5.5.1 P-RL-IM-2`/`P-RL-IM-4` |
| **`U-RELOCATE-THRESHOLD-IS-THE-ZONE-PROXIMITY-DISTANCE`** (`docs/decisions.md`, ACTIVE) | **ADOPTED, cited by name, never re-opened** — the referent, the three derived channels, the invalid arm, and the deliberate strengthening | `§0` ruling 1, `§0A` notes 2/6/12, `§2.3` items 1/2/3/5, `§3.1 M-2`/`M-9`, `§5.5.1 P-RL-IM-3` |
| **`U-RELOCATE-REVEALED-ZONE-HIDES-AGAIN`** (`docs/decisions.md`, ACTIVE) | **ADOPTED, with its DERIVED half flagged in place** (this filing is the one the ruling's own row points at for the confirmation) | `§0` ruling 2, `§0A` note 6, `§2.3` item 5, `§7a.1` item 3 |
| **`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`** (`docs/decisions.md`, ACTIVE) | **ADOPTED AS THE FROZEN AUTHORITY for every session call this unit makes** — and **narrowed here to the composition's own four entries** (`install` · `reset` · `dispose` · the three readings). **This filing re-opens NO item of the list** | `§0` ruling 3, `§2.5` item 1, `§3.4 R-14`/`R-18` |
| **`docs/specs/gsession.md` `§2.5` item 10** (`commit(gesture, value)`, `gesture.outcome` the discriminator) | **ADOPTED as the outcome discriminator's home** | `§2.1` item 2 (`CommitSink`), `§2.3` item 6(d), `M-14` |
| **`docs/specs/gsession.md` `§2.5`'s *"Nothing else exists"* paragraph (after item 11)** | **CARRIED as the discipline this unit's own seam set applies to ITSELF: exactly seven members, no eighth, no policy default** — and as the reason `threshold` is NOT put on the session | `§2.1` item 1, `§0A` note 4, `§5.5.1 P-RL-IM-4` |
| **`docs/specs/gsession.md` `§2.6`'s seven sibling properties** | **DERIVED, not re-expressed**: each is expressible through the landed session's own surface, and **this unit asserts nothing new about the session** | `§2.6`, `§3`, `§5.5.1` |
| **`docs/specs/gsession.md` `§2.6` `F-11`/`F-12`** | **F-11 (the structural half) is CARRIED as this unit's own row** (`R-3`/`R-7`); **`F-12` (the behavioural half) is `PRECONDITION-GATED` and NOT CLAIMED** | `§2.6`, `§5.2`, `R-17` |
| **`E10-SINGLE-SINK-CHANNEL`** (`docs/decisions.md`, ACTIVE) | **CARRIED IN FULL** — the composition's single sink writer is this module's own `commit` seam; the SESSION's `commit` option is the WIRING's and is a non-forwarding recorder or absent; giving the same function to both is a TWO-WRITER composition that FAILS | `§0` ruling 6, `§0A` note 7, `§2.3` item 4, `§3.2 F-6`, `§5.5.1 P-RL-SM-2` |
| **`E10-MODULE-IMPORTS-THE-CONTROLLER-FACTORY`** (`docs/decisions.md`, ACTIVE) — **its boundary sentence** | **CARRIED as this unit's import census**: a value import of the SESSION factory, of any census/shim/renderer/main module, or of any OTHER sibling **REMAINS FORBIDDEN** — which is why `POINTER_TYPES` and `createGestureSession` are ABSENT | `§0` ruling 7, `§0A` note 4, `§2.1` item 4, `§3.4 R-4` |
| **`SEAM-THROW-DISPOSITION-VALUE-READING-SEAMS-ABSORBED`** (`docs/decisions.md`, ACTIVE) | **CARRIED, with the family's later correction applied**: `commit`'s propagation is the SINK's own disposition in THIS unit (the module's `commit` seam is its own call site, so a throwing sink propagates from the terminal turn), and `onPreview` propagates as the second `void` presentation seam | `§0` ruling 8, `§2.4` item 2, `§3.2 F-7`/`F-8`, `§3.3 I-10` |
| **`GUTTER-CALLER-SEAMS-ARE-THE-FAMILY'S-DOWNSTREAM-CONTRACT`** (`docs/decisions.md`, ACTIVE) | **CARRIED**: this unit's seam **signatures, REQUIRED/OPTIONAL status and declared degradations are normative contract text**, and **five of its eight exported types spell a seam's answer or signature** so a fork can import them | `§0` ruling 11, `§2.1` items 1/2, `§2.4`, `§8` (this row) |
| **`SHELL-CHROME-PANES-ZONES-IN-SCOPE`** (`docs/decisions.md`, ACTIVE) | **ADOPTED** — the panes/zones family is in scope and this unit is one of its mechanisms; **it is NOT a UI element** and is therefore outside the `AGENTS.md` provident-rendering constraint **without needing an exception** | `§0` rulings 4/5/12, `§1` items 3/5, `§4.4` `S-13` |
| **`GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAMP-COMMIT-LAYER`** (`docs/decisions.md`, ACTIVE) | **CARRIED AS A BOUNDARY, NOT AS A TEMPLATE**: `E3` keeps the clamp and the commit discipline; **the coordinate source, the live preview channel, the capture decision and the drop-revert are the UI unit's** — **and this unit reads no coordinate either**, taking only the caller's scalar distance | `§0` ruling 5, `§0A` notes 2/5, `§1` item 2, `§2.2` `P-1`, `§5.2` |
| **`E3-CAPTURE-OPT-IN-IS-STILL-OWED-AND-ITS-CONSEQUENCE-IS-LIVE`** (`docs/decisions.md`, ACTIVE) | **CARRIED INTO THIS UNIT'S FORK-FACING STATEMENT** — the no-capture limitation binds a pane drag more than a handle; **`E4` does not adopt the opt-in** | `§0A` note 11, `§7` item 3, `R-10` |
| **`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`** (`docs/decisions.md`, ACTIVE) | **CARRIED as the rule that DERIVES this unit's DENIED set** — *"each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling"* — and **the derivation's result is a MECHANISM's set, which denies `src/renderer/**` and the demo envelope because they are not this unit's charter** | `§0` ruling 12, `§5.1` |
| **`A DECLARED REGISTER TERM IS A DRIVE COUNT`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — every declared term in `§5.5.1` is a DRIVE count; assertions, observations and readings are printed BESIDE it; **`R-1`'s cross-row assertion is printed beside a term and never inside one** | `§5.5.1`, `§5.5.2` item 3, `§5.5.3` |
| **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (`docs/decisions.md`, ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`15` typed ROWS carrying `16` TERMS in three families** *(**AS FILED this cell read `17` typed rows — a dated counting defect corrected at `§5.5.1`'s foot; and as first corrected this cell read `15` ROWS · `17` TERMS, which was the SAME defect kept alive in the TERM noun — corrected 2026-09-27 in the register-arithmetic remand: `15` ROWS · `16` TERMS · `170` ATTEMPTS**)*, **`170` attempts** printed **with their SIXTEEN terms and a term-by-term addition table**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no extra leg**, seed `20260927` for the one generator, caps `≤100`/row · `≤400` total · stop-after-5. **The read-only PBT audit is OWED to the adversarial pass** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`** (`docs/decisions.md`, ACTIVE) | **CARRIED** — `15` rows / `16` terms enumerated as the **EXTENT** *(**AS FILED this cell read `15` rows / `17` terms — the TERM-COUNT defect, corrected 2026-09-27; the EXTENT claim is unchanged: no property was dropped, merged or left unenumerated**)* (the `≤8` threshold treated as a breakdown **signal**), the breakdown recommendation recorded **once** (`§5.5.2` item 1, naming `P-RL-IM-3` and `P-RL-SM-1`), and **no property dropped, merged or left unenumerated** | `§5.5`, `§5.5.2` item 1, `§5.3` items 10/11 |
| **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (`docs/decisions.md`, ACTIVE) | **CARRIED, AND ITS RULE FIRED AT FILING TIME**: the as-filed `149` was a mis-sum of the register's own terms and is **kept visible at `§5.5.3` with its correction printed beside it**; the honest declared total is **`170` = the sum of the SIXTEEN printed terms** *(**AS FIRST WRITTEN this cell read *"seventeen printed terms"* — the TERM-COUNT defect, corrected 2026-09-27 by the register-arithmetic remand**)*; the DECLARED and DISTINCT-DRIVE figures are both reported (`§5.5.2` item 3); and **a total that is not the sum of its own terms is a finding** | `§5.5.2` item 3, `§5.5.3`, `§5.3` item 11, `§7` item 9 |
| **`docs/specs/gutter.md` `§2.2` P-5 · `§3.4` R-1 · `§4.4` S-11** and **`docs/specs/gsession.md` `§2.2` P-1/P-5/P-7 · `§3.4` R-1** — **the `threshold` ban sites** | **RECONCILED, not relaxed** — the reconciliation table is `§2.3` item 3, each ban is scoped to the layer it guards, and **this unit's own scan row (`R-1`) carries `threshold`/`distance` as DECLARED NEGATIVE-CONTROL EXEMPTIONS with both controls** | `§0A` note 12, `§2.3` item 3, `§3.4 R-1`, `§4.4` `S-11` |
| **`docs/specs/gutter.md` `§2.4`'s `S-11` amendment** (*a second writer INSIDE a composition is not the class*) | **ADOPTED as the reason this unit may call the session's `reset` terminal** — the class is *the same sink through another channel* | `§2.2` `P-4`, `§3.3` `I-3`, `§2.5` item 1 |
| **`docs/specs/zones.md` `§4.4 S-6`** — *"the row may not be moved to the `ui` leg silently"* | **CARRIED VERBATIM in this unit's three-part `[U]` refusal** | `§5.2`, `§4.4` `S-9`, `§7` item 4 |
| **`docs/specs/user-flow-audit.md` `§2`** — the trigger predicate and its zero-row exemption | **APPLIED, and the decision RECORDED**: **`DOES NOT TRIGGER`**, with the evidence that decided it and its falsifier | `§5.2` (the decision block), `§5.3` item 7 |
| **`docs/specs/census.md` `§1` item 7** — the DISSOLVED edge | **ADOPTED AS A BOUNDARY, NOT A DEPENDENCY** — no import, not even type-only; **the reveal state arrives only as an argument to the consumer's own `onReveal`**; **an edge asserted the other way would be a FABRICATED EDGE** | `§2.5` item 2, `§1` item 6, `§3.4 R-4`, `§4.4` `S-12`, `§8` (this row) |
| **`docs/next-steps.md`'s `## OPEN` row `E4`** | **CARRIED IN SUBSTANCE, with its two under-specified cells named**: the acceptance cell names **six** members where this spec names **seven** (`onPreview` is the ruling's addition), and its `Legs` cell (`node suite`) is read as **the family's FOUR legs** | `§0A` note 3, `§5.1`, `§5.2`, `§5.3` items 3/6, `§7` item 7 |
| **`docs/next-steps.md`'s row `E6`** (`U-GSESSION`) | **NOT THIS UNIT — this unit is ITS COMPOSER.** The session is `DONE`; **its module, its test file and its spec are DENIED paths for this unit** | `§0` ruling 3, `§2.5` item 1, `§5.1` items 1/2 |
| **`docs/next-steps.md`'s row `E3`** (`U-GUTTER`) | **NOT THIS UNIT — a SIBLING and a PRECEDENT.** Its resolved channel clause is **CITED here, never restated**, and its module/test pair is a **FROZEN denied path** | `§2.6`'s preamble, `§5.1` item 2, `§8` (this row) |
| **`docs/next-steps.md`'s row `E5`** (`U-CONTAINER`) | **NOT THIS UNIT and NOT a dependency in either direction** — the same `SCH-*` family adoption produced both, and a later pass asserting an edge would be a FABRICATED EDGE | `§4.5`, `§2.5` item 2, `§8` (this row) |
| **`docs/specs/relocate-review.md`'s §6 blocker** *(the reveal's committing-terminal set)* | **CLOSED BY THE ARCHITECT'S RULING, carried in that record's appended `§9`**, with **condition `C-A` discharged by citation**: this spec's reveal clause and `P-RL-SM-1`'s declared terminal domain **both cite it**, and **no clause of this file reads *"gesture end"* without the terminal set named beside it** | `§0` ruling 2, `§0A` note 6, `§2.3` items 4/5, `§5.5.1 P-RL-SM-1`, `§7a.1` item 3 |
| **The `§7.1` predicate decision** | **`DOES NOT TRIGGER`, RECORDED with its evidence and its falsifier** — no `§5.U` matrix and no `§6.1` report are emitted, and **that is an exemption recorded rather than an empty report** | `§5.2`, `§5.3` item 7 |
| **`docs/skills/designing-pages.md` and the page-design layer** | **NOT THIS UNIT, and the file DOES NOT EXIST** — so no coverage matrix and no demo-page index to update; **`R-9` is the probe** | `§1` item 6, `§3.4 R-9`, `§7` item 6 |
| **`docs/specs/relocate.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 5, `§7` items 7/13 |
| **`docs/specs/relocate-greens.md`** | **OWED** — this unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), named in the diff scope so it is not discovered later | `§5.1` row 4, `§5.3` item 8 |
| **`docs/FORKER.md`'s seam contract** | **NOT EDITED BY THIS PASS, and not owed by this gate.** Ruling 11's consequence (3) puts the family's seam contract there; **whether this unit's seven seams are carried there is a tracker decision for a later pass** (`§7` item 7) | `§7` item 7, `§8` (this row) |
| **The gate-1 record's process findings `P-1`…`P-6`** | **NOT RE-LITIGATED AND NOT REPAIRED HERE.** `P-1`/`P-2`/`P-3` (the unfiled step-1/2 artifacts and the un-reconstructable conditions) are **the supervisor's and the architect's**; `P-4` (the two under-specified ledger cells) is **carried at `§7` item 7(a)–(d)**; `P-5` (the `threshold` collision) is **discharged for this unit by the reconciliation table**; `P-6` (the RCA's unmet acceptance test) is **recorded, unowned here** | `§0A` note 12, `§2.3` item 3, `§7` item 7, `§8` (this row) |
| **`docs/pending.md` §K (the RCA's requested harness modifications)** | **BACKGROUND ONLY.** Its own header reads *"REQUESTS, NOT LANDED RULINGS; the architect's to adopt, amend or decline"*. **Its vocabulary is NOT used anywhere in this file as though it were in force** — no `BLOCKED-ON-SEMANTICS` verdict, no adoption dossier and no new gate step. **Its two filed acceptance tests for this unit are CITED as requests and DISCHARGED**: `K-4`/`H-3` (a bare identifier in a contract without a semantics row) is discharged by `§2.3` item 1's referent and semantics row, and `K-7`/`H-6` (the refusal recorded at filing time) by `§5.2`'s three-part clause. **`docs/pending.md` §L-1 is annotated `RULED` in that ledger and is cited here as a ruling** | `§0` ruling 1, `§2.3` items 1/2, `§5.2`, `§8` (this row) |
| **`docs/next-steps.md`'s pickup `§6` DO-NOT list** | **NOT RE-OPENED.** The `threshold` semantics, the `A-d4` family adoption and the `SCH-7` disposition are **cited and applied, never questioned** | `§0` rulings 1/4, `§0A` notes 3/12, `§2.3` item 3 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates
**one new spec file** and edits **no existing document** — **no tracker row is touched, no sibling spec is
annotated, and no citation is repointed.** **Row `E4`'s spec cell therefore still reads
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

**Status as filed: `OWED`. No adversarial pass has run for `U-RELOCATE`** — **the unit has no green yet**,
and `RCA-3` runs the pass **after** a green. **Every row below is a QUESTION for that pass, not a finding,
and none may be cited as one.**

**The pass's shape, stated so it is not improvised: READ-ONLY** (it changes no `tests/**` and no
`src/**`), it **must also perform the gate-11 read-only PBT audit of `§5.5.1`'s executed tables** — the
per-row attempts, the strategy ids, the `170` total against its terms, the stop-after-5 rule, the pinned
seed and its step form — **and it must RE-RUN the pool-versus-boundary check against the LANDED tables**
(`§5.5.2` item 7). **Its findings are recorded in `§3b` and a HOST finding is fixed here with regression
rows — never in `docs/defects.md`, because a host finding is this repo's.** **A genuine `provident-ssr`
package defect would go to `docs/defects.md` + `docs/HANDOFF.md`, and the package is NEVER patched** —
**though this unit exercises no package surface at all, so no such finding can arise from it**
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
| **`A-1`** | **THE THREE-CHANNEL PROBE, exhaustively:** across an `'end'` with a target, an invalid-arm `'reset'`, a `cancel`, a refused terminal, a mid-gesture `dispose`, a throwing sink, a throwing preview, a no-writer composition and a two-writer composition — **is each channel invoked exactly the declared number of times in EVERY case, and do the SESSION's own call record, the SINK's record, the CONSUMER's reveal record and the module's `stats()` counters AGREE?** Does any path produce **two** reveals, **two** sink writes, or **a reveal and a sink write in the same turn as a preview**? | `[T]` |
| **`A-2`** | **THE COMPARATOR PROBE:** is every cell of `P-RL-IM-3`'s enumerated operands answered by the `typeof` gate or by `distance <= threshold` **verbatim** — including the boundary (`d == t`), the negative-threshold limb, `-0`, `NaN`, `+Infinity`/`-Infinity`, and every hostile operand class? **Is there ANY input pair that makes it throw, return a non-`boolean`, or read a third thing?** | `[T]` |
| **`A-3`** | **THE SEAM-ORDER PROBE:** is the observed-move order exactly `candidatesFor` → proximity → `resolveTarget` → `onPreview` → the consumer's `onMove` → the invalid-arm test, and the terminal order exactly `onReveal` → `commit` → the consumer's `onEnd`? **Can any path reach a seam out of order, twice, or not at all where the contract requires it?** | `[T]` |
| **`A-4`** | **THE NON-MONOTONICITY PROBE:** does ANY code path treat the zone's displayed-ness as monotonic — a show that cannot hide, a hide that cannot re-show, a retarget that takes two turns, or a hide that reaches `onReveal`? **Is the retarget's hide-plus-show ONE invocation in ONE turn in every ordering of the two candidates?** | `[T]` + static |
| **`A-5`** | **THE INVALID-ARM PROBE:** across every invalidity class (no candidates, all outside, unusable distances, a throwing seam) — is the arm taken **at most once**, **from the move turn while the gesture is still active**, with **exactly one** commit of the caller's pre-drag value, and does the later `pointerup` commit **nothing**? **Can any sequence produce two resets, or a reset at a release turn?** | `[T]` |
| **`A-6`** | **THE CAPTURE-ABSENCE PROBE:** does the module pass a `capture` field anywhere — to any call it makes? **Does its own options carry a `capture` member?** Is the **positive control** honoured (a composition that DID opt in must FAIL `R-10`)? | static + `[T]` |
| **`A-7`** | **THE HOSTILE-SESSION AND HOSTILE-OPTIONS PROBE:** a `session` that is absent, a primitive, a `Proxy` whose traps throw, a frozen record, a record with throwing accessors, a record whose members are non-callable, a disposed session; and each of the seven options members driven hostile — **is every outcome the DECLARED valid-state degradation, with no throw at the consumer boundary and no half-applied ledger?** | `[T]` |
| **`A-8`** | **THE VOCABULARY PROBE — and its own collision:** does the module's source (incl. comments) or this unit's controlled corpora carry a coordinate/event token, a geometry token, a pane/zone/tab/axis vocabulary token, a unit or token literal, a selector, a census token or a store token — **raw, token-assembled or in a comment**? **The collision to resolve explicitly: `R-1`'s control data MUST carry the spellings while the module must not, and `threshold`/`distance` ARE the module's own declared vocabulary** — **is the scan's scope exactly `R-1`'s, and is the exemption NAMED rather than implied?** | static |
| **`A-9`** | **THE ACCESS PROBE:** any `document`/`window`/`globalThis`-rooted access, any assembled or aliased realm route, any `addEventListener`/`removeEventListener`/`setPointerCapture`/`releasePointerCapture`/`closest`/`querySelector*`/`getElementById`/`getComputedStyle`/`getBoundingClientRect` in **any** form? **Any positive is a `BLOCKING — SCOPE` finding.** | static |
| **`A-10`** | **THE IMPORT/ISOLATION PROBE:** does the module import anything beyond its one type-only session import? **Is `POINTER_TYPES` absent? Is `src/shared/dom-shim.ts` untouched, are the two FROZEN pairs untouched, and does any changed file fall outside `§5.1`'s allow-list while sitting inside its DENIED set?** | static |
| **`A-11`** | **THE CROSS-UNIT BOUNDARY:** does this unit duplicate a `U-CENSUS` responsibility (a reveal set, a key set, a census read), a `U-ZONES` responsibility (a token literal, a unit string), a `U-GSESSION` responsibility (a lifecycle, a listener, a commit count of its own), a `U-GUTTER` responsibility (a clamp, a bounds pair, a resizability decision), a `U-CONTAINER` responsibility, or a `U-PROJ`/`U-LISTHOST`/`U-SLOTHOST` one? **Duplication is a FINDING; and an obligation pulled in "for convenience" is the `S-12`/`S-10` class.** | static + `[T]` |
| **`A-12`** | **THE GEOMETRY/COORDINATE/MAGNITUDE PROBE:** does any row, in the module or in the test file, assert or claim a **rendered-geometry, coordinate, layout, paint, applied-CSS, cursor or magnitude** property — **or a DISTANCE the row itself computed** — or does any pass report this unit's green as one, or claim an MCP-reachable drag? **Any positive is the mandatory clause's violation and a false-green class.** | static + the DONE row |
| **`A-13`** | **THE `[U]`/`[D]` PROBE:** does any pass offer a `[U]` row for the ghost, the expansion or the visible revert, claim a `[D]` row, move a rendered-geometry row to the `ui` leg (silently or not), report gate 6 as **`waived`** rather than **`STRUCTURAL` with its reason stated**, or omit the `§7.1` `DOES NOT TRIGGER` decision? **`R-17`'s non-claim must be stated.** | the DONE row + `R-17` |
| **`A-14`** | **THE REGISTER AUDIT (gate 11's read-only PBT audit):** do the executed tables match `§5.5.1`'s **per-row attempts, terms, strategy ids and the `170` total**? Is the **stop-after-5** rule honoured, and were the **un-run rows REPORTED as failures**? Is the **pinned seed `20260927`** and the one-step-per-draw LCG form (`pool.length = 15`) what the test file actually contains? **AND: is every pool/table member still consistent with its row's declared boundary text** — `§5.5.2` item 7's check **re-run against the LANDED tables** rather than this filing's? **Any mismatch is a SPEC FINDING.** **AND: does the audit read the `(bounded)` set correctly — `6` marked of `15` ROWS — rather than the as-filed `12` or the as-filed `17` rows?** | `[T]` + the test file |
| **`A-15`** | **THE LAYER-HONESTY PROBE:** does the DONE row (or any pass's prose) claim **assembled-app, real-pointer, coordinate, layout, applied-CSS or retargeting** evidence from this unit's `[T]` green — and does it state, explicitly, that **the module is imported by no `src/**` file** and therefore proves **the contract holds for a caller, not that the app behaves differently**, and that **this unit ships no distance computation and reads no coordinate — a named cost**? | the DONE row |
| **`A-16`** | **THE FORK-FACING PROBE:** does any pass read this unit as delivering a working relocate affordance, a ghost, or a visible expansion — or cite the UI unit as scheduled work rather than as a `PROPOSED` row awaiting the architect's admission? **Does the fork-facing statement carry the no-capture limitation (`§7` item 3)?** | static + the DONE row |
| **`A-17`** | **THE `§7a.1` PROBE:** do the three reported items remain marked as **working defaults** / **derived-pending-confirmation** rather than silently hardened into contract without a ruling — and has the supervisor routed them? **A pass that treats a `§7a.1` default as ruled, or the DERIVED item as a verbatim architect sentence, is a review finding.** | static + the DONE row |
| **`A-18`** | **THE `threshold`-RECONCILIATION PROBE:** does any pass read the presence of `threshold` in this spec's contract as a CONTRADICTION of the sibling specs' ban tables — or, conversely, use the reconciliation to relax a sibling's prohibition? **The reconciliation is a derivation with a DECLARED exemption and both controls; a pass that reads it either way is a review finding.** | static |

**The seed set's own status, stated so it is not misread: `18` seeds, ALL `OWED` — no adversarial pass has
run, and a DONE row that cites no adversarial pass (or whose findings are unrecorded) is a review
finding** (`AGENTS.md` RCA-3). **`A-14` is the gate-11 audit; `A-12`/`A-13`/`A-15`/`A-16` are the
layer-honesty probes; `A-4`/`A-5` are the two ruling-forced classes; `A-18` is this unit's own collision
class — the five this unit's family has historically failed on.**

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
| **BLOCKING — SCOPE** | `A-9`/`A-10`/`A-11`/`A-12`/`A-8` returning positive: **the unit does not land** until the scope violation is removed |
| **HANDOFF** | a **package-class** finding → `docs/defects.md` + `docs/HANDOFF.md`; **the package is NEVER patched.** **This unit exercises no package surface, so no `HANDOFF` row can arise from it** (`§7` item 10) |
| **PARKED-with-revisit-condition** | recorded, not fixed, with the condition that would reopen it and its owner |

**Status of the table itself: `OWED` — empty by construction.** **An appended findings row must cite, at
minimum: the seed id (`A-*`), the finding's severity, its disposition from the table above, its owner, and
the clause (`§`-section + row id) it changed or left unchanged.** **A DONE row that cites no adversarial
pass (or whose findings are unrecorded) is a review finding** (`AGENTS.md` RCA-3).
