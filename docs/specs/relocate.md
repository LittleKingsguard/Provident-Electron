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
   all `15` rows** (`§5.5.2` item 7). **The register overshoots the `≤8` breakdown signal on purpose, in
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
6. **THE TWO OPEN QUESTIONS THIS FILING REPORTS RATHER THAN SETTLES, AND THE ONE DERIVED ITEM IT PINS
   PENDING CONFIRMATION** (`§7a`/`§7a.1`): (a) whether the module's own move-turn invalidity test runs
   **before or after** the consumer's `onMove` wrapper forwards the hook, as a per-observation site;
   (b) whether the module counts its own `onPreview` invocations in `RelocateStats` (a **mechanism-side
   counter** question, not a channel question). Each has a working default implemented in `§2` and a
   recommendation; a later pass that changes one must open a gate. The **derived-pending-confirmation**
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
so FOUR spell a seam) · `RelocateHandle` (the four consumer hooks) · `RelocateOptions` (the seven-member
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
 *  `true`, and the row asserts the BOOLEAN, never the sign of an operand. */
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
 *  (`§3.2 F-6`). */
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
   *  or throwing seam, which is an attempt and is never retried). */
  readonly candidateCalls: number
  /** `resolveTarget` invocations the module ATTEMPTED. */
  readonly resolveCalls: number
  /** DURABLE REVEAL WRITES ATTEMPTED — every invocation of `onReveal`, INCLUDING
   *  one that threw. THE COUNTER THE HEADLINE ROW ASSERTS OVER. */
  readonly revealWrites: number
  /** REVEAL WRITES THAT RETURNED without throwing. `revealWrites - revealed` is
   *  the count of swallowed reveal throws. */
  readonly revealed: number
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
(`candidate`, `distance`) — **and no consumer vocabulary beyond those.**

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
| **P-10** | **No census read of any kind** (`U-CENSUS`'s dissolved edge) | **The module contains no census token, no track-variable name, no `zones`/`revealed`/`specOf`/`sizes` member.** **A consumer's reveal state reaches this unit ONLY as an argument to its own injected `onReveal`**, and a consumer's `sizes` value only inside the consumer's own closures | **`R-1`**, **`R-4`**, `§2.5` item 2, `§8` |
| **P-11** | **No second writer** (ruling 6; `E10-SINGLE-SINK-CHANNEL`) | **One sink seam, one call site, at most once per gesture, at one terminal** — and **two positive controls that make the claim falsifiable**: a two-writer composition FAILS (`F-6`) and a no-writer composition FAILS (`F-4`). **A preview invocation that also produces a reveal invocation FAILS** (`F-5`) | **`R-13`**, `§2.3` item 4, `§5.5.1 P-RL-SM-2`/`P-RL-SM-6`, `I-2` |
| **P-12** | **No UI content, and no rendered-surface claim** (rulings 2/5; `docs/decisions.md`'s mechanism-vs-UI test) | **The module authors no element, no text, no class, no attribute, no stylesheet, no control, no cursor and no geometry**: **it CALLS seams; the consumer writes.** **The ghost, the expansion and the visible revert are `[U]`-unprovable here and REFUSED** (`§5.2`) | **`R-11`**, **`R-8`**, `§1` item 5, `§5.2`, `§4.4 S-13` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4` `R-1`..`R-18`): **a prohibition
citing *"a static source row"* with no id is not a row**, and **every prohibition above names at least
one id that exists in `§3.4`.**

---

### 2.3 The arithmetic and value rules — stated falsifiably

**Item 1 — THE PROXIMITY DECISION, and its ONE arithmetic site.** **`withinProximity(distance,
threshold)` is the module's ONLY value comparison** (`§2.1` item 1 carries the full declared-answer
table). **The BOUNDARY IS INSIDE: `distance <= threshold`.** **This is the module's whole arithmetic, and
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
| **Count per gesture** | **EXACTLY `1`** at an `'end'`; **`0` on a `'reset'`** (the invalid arm reads ZERO — DERIVED, `§0A` note 6); **`0` on a `cancel`**; **`0` on a refusal** (stale/absent handle, `'busy'`, `'disposed'`, `'not-installed'`, `'disconnected'`) | **AT MOST `1` per observed move**, and **exactly `1` revert write** on the invalid arm (the visible revert's carrier) | **EXACTLY `1`** when the invalid arm is taken; **`0`** otherwise; **`0` sink writes of a draggable value** — one commit of the **caller-supplied pre-drag value** |
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
here, not assumed.)***

| Order | When | What is called | Multiplicity RULED |
| --- | --- | --- | --- |
| **(a)** | `attach(element, hooks?)` | `session.install(element, {onStart, onMove, onEnd, onCancel})` — **the module's OWN `onStart`/`onMove` wrappers, forwarding the consumer's hooks by identity where supplied** — **NO `capture` field** | **once per distinct element**; a repeat attach delegates NOTHING (first-config-wins) |
| **(b)** | the session ESTABLISHES a gesture and calls the module's own `onStart(element)` wrapper | **the caller-supplied pre-drag value is captured ONCE here** (`§0A` note 9), then the consumer's own `onStart(element)` runs, **forwarded by identity** | **the capture is once per ESTABLISHED gesture**; the consumer hook is once per establishment |
| **(c)** | the session calls the module's own `onMove(gesture)` wrapper for an observed move | **the handle is captured here** (the ONLY legal channel — `onStart` receives only the element), **then `candidatesFor(element)` AT MOST ONCE**, **then `withinProximity(distance, threshold)`**, **then `resolveTarget(element, candidates, gesture)` AT MOST ONCE** when the answer places the pane within proximity, **then the channel-(B) presentation write AT MOST ONCE**, **then the consumer's own `onMove(gesture)` runs, forwarded by identity**, **then the invalid-arm test** | **`candidatesFor` at most once per observed move; `resolveTarget` at most once per observed move and ONLY when the answer is within proximity; `onPreview` at most once per observed move; the invalid-arm test once per observed move until it sticks** |
| **(d)** | the session's terminal invokes the module's own `commit(gesture, value)` wrapper | **`gesture.outcome` is the discriminator.** For `'end'`: `onReveal(target, decision)` **AT MOST ONCE**, then `commit(gesture, value)` **AT MOST ONCE**, then the consumer's own `onEnd`, then the per-gesture record is discarded in a `finally`. For `'reset'`: **ZERO reveals**, the consumer's own `onEnd`/`onCancel` as the session owns them, and the record discarded. For a `cancel`: **the module's wrapper is never invoked at all** | **`onReveal` exactly `1` per `'end'` and `0` per `'reset'`; `commit` at most once per committing terminal** |

**Item 7 — THE PRE-DRAG VALUE'S CAPTURE POINT AND THE PER-GESTURE RECORD.** ***(Register amendment
`R-4`; `§0A` note 9.)*** **RULED: ONE capture point — the module's own `onStart` wrapper, for a gesture
the session ESTABLISHED — and the running count is asserted EXACTLY, never "at least".** **The per-gesture
record holds: the handle (captured in `onMove`), the element, the pre-drag value (captured in `onStart`),
the last observed candidate answer, the last resolved target, and the sticky invalidity flag — and it is
DISCARDED at EVERY terminal, in the module's own `finally`, never by asking the session anything** (the
session's record is already gone: `runTerminal` sets `slot = null` BEFORE it invokes the composition's
`commit` call, so `session.gesture()` reads `null` inside it — the gate-1 record's `§4.2` `B.0`).

**Item 8 — the module performs NO OTHER ARITHMETIC.** **No delta, no ratio, no percentage, no scale, no
sum, no average. The ONE comparison is `withinProximity`'s, and no row may claim a magnitude of the
pane.**

---

### 2.4 The seam rules — the SEVEN NAMED SAFE DEFAULTS, and the four throw paths

**Item 1 — THE SEVEN NAMED SAFE DEFAULTS (ruling 11, in the `docs/specs/listhost.md` `§7a` item 4 form
`docs/specs/gutter.md` `§2.4` item 1 mirrors).** **Each seam's absent / non-callable / throwing state has a
NAMED outcome, and the outcome is asserted — never a bare `try`/`catch` with no contract.**

| Seam | What its absent / non-callable / throwing state MEANS | The NAMED SAFE DEFAULT (the declared outcome) |
| --- | --- | --- |
| `session` | the module was not given a usable session | **a VALID BUT INERT module**: `attach` ⇒ `false` with ZERO session calls, `reset` ⇒ a refusal record with ZERO session calls, `detach()` ⇒ `false`, zeroed stats, **never a throw** |
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

**Item 3 — THE CANDIDATE ANSWER'S DEGRADATION, RULED FIELD BY FIELD** *(this filing's home for the
record's `M-1`)*. **The `distance` field's READ and its degradation, stated so no row is ambiguous: an
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
| **M-2** | **`withinProximity` answers the three declared outcomes, and the BOUNDARY IS INSIDE** | caller pairs driven with `(10, 20)` then `(20, 20)` then `(20.5, 20)`, then `(-5, -1)`, then `(0, 0)` | **`true`, then `true` (the boundary IS inside), then `false`, then `false` (a NEGATIVE finite threshold is a legal operand), then `true`**; the return is a `boolean` in every drive | `§2.1` item 1, `§2.3` item 1 | `[T]` |
| **M-3** | **The seam order at establishment and on an observed move, with the handle's identity** | a full lifecycle: attach; establishment; one observed move whose answer places the pane within proximity; `pointerup` | the recorded call log is **the module's own `onStart` wrapper then the consumer's `onStart`** at establishment, then on the move **`candidatesFor` then `resolveTarget` then `onPreview` then the consumer's `onMove`**, then at the terminal **`onReveal` then `commit` then the consumer's `onEnd`**; **the `gesture` argument each of `resolveTarget`/the consumer's `onMove` receives is the EXACT handle the session gave the module's wrapper** (`toBe`); the sink receives **the session's own handle** | `§2.3` item 6, `§2.5` items 4/5, `§0A` note 9 | `[T]` |
| **M-4** | **A `cancel` writes nothing and invokes no channel** | the same lifecycle terminated by the recorded `pointercancel` handler | **`stats().revealWrites === 0`**, `stats().sinkCalls === 0`, `stats().written === 0`, the session's terminal result reads `committed: false`, **and the module's per-gesture record is dropped** | `§2.3` item 4, `§2.6` item 2, `§2.5` item 6 | `[T]` |
| **M-5** | **A gesture within proximity on every move writes the reveal EXACTLY ONCE, at the `'end'` terminal** | attach; establishment; **five** observed moves, each within proximity; `pointerup` | **exactly ONE `onReveal` invocation** — the CONSUMER's own recorded count reads `1` AND `stats().revealWrites` reads `1` (they AGREE); `stats().moves === 5`; `stats().candidateCalls === 5`; the sink is called once at the terminal with outcome `'end'` | `§2.3` items 4/5, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` | `[T]` |
| **M-6** | **The reveal's write site is the module's own `commit` seam and the terminal domain is the ruled set** | (a) a full `'end'` lifecycle within proximity; (b) a full invalid-arm lifecycle; (c) a `cancel` lifecycle; and a control in which the module's `onReveal` is invoked from its own `onStart`/`onMove` wrapper | **(a)** exactly `1` reveal invocation, `gesture.outcome === 'end'` at the sink; **(b)** **ZERO reveal invocations** (the ruled `{'end'}` domain — DERIVED, `§0A` note 6) with the sink's own argument carrying the pre-drag value and `outcome === 'reset'`; **(c)** ZERO; **and the control drive FAILS the row's own assertion** (an `onReveal` invocation outside the commit seam is the fork-failing shape) | `§2.3` items 4/6(d), `§0A` note 6, `§2.6` item 7, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` | `[T]` |
| **M-7** | **A gesture crosses the proximity and comes back OUT — and the reveal count is STILL exactly one** | attach; establishment; move 1 within proximity (zone shows); move 2 outside every candidate's proximity (**zone hides**); move 3 within proximity again (zone shows again); `pointerup` | **exactly ONE `onReveal` invocation** at the terminal; **`onPreview` reads `3` invocations, and the third one's carried state declares the zone shown again** — i.e. **the displayed-ness is NOT monotonic and the durable write is not affected by it** | ruling 2 clause (1); `§2.3` item 5, `§5.5.1 P-RL-SM-1`/`P-RL-SM-6` | `[T]` |
| **M-8** | **A move OUTSIDE every candidate's proximity is the invalid arm, taken ONCE, from the module's own move turn** | attach; establishment (`onStart` captures the pre-drag value `777`); move 1 outside proximity; **then `pointerup`** | **`stats().resets === 1`** and the recording session's log shows **`reset` entered DURING the drag turn, while the gesture was still active**; the session's `reset` call carries **the exact handle** the module captured, the element, and **`777`**; the sink is called **once** with **`777`** and `outcome === 'reset'`; **the later `pointerup` commits NOTHING** (`stats().sinkCalls` stays `1`); **the consumer's own `onPreview` carries exactly one revert write** | `§0A` note 8, `§2.3` items 4/6(c), `§5.5.1 P-RL-SM-7` | `[T]` |
| **M-9** | **An `'end'` terminal inside proximity writes the sink EXACTLY ONCE, with the caller's resolved target** | attach; establishment; a move within proximity with a target `{zoneId: 'B'}`; `pointerup` | **one sink call**, receiving **the session's own handle** and the **exact object the consumer's `resolveTarget` returned** (`toBe`); **`onReveal` received that same target by identity**; `stats().sinkCalls === 1`, `stats().written === 1` | `§2.3` item 6(d), `§2.6` item 1, `§5.5.1 P-RL-SM-1`/`P-RL-SM-2` | `[T]` |
| **M-10** | **Nothing carries across a gesture boundary** | two full `'end'` lifecycles on the same element, the first with a target and a distance in proximity, the second with **no** candidates at all | the FIRST writes once and reveals once; the SECOND takes the invalid arm (`resets === 1` for that gesture) with **the second gesture's OWN pre-drag value captured at ITS establishment**; **no target, candidate, distance or handle from the first is readable in the second**; the counters are monotonic across both | `§2.3` item 7, `I-9`, `§5.5.1 P-RL-SM-4` | `[T]` |
| **M-11** | **THE RETARGET RULE — the old zone hides and the new shows in ONE observed-move turn** | attach; establishment; move 1 within proximity of candidate `A` (shows `A`); move 2 within proximity of candidate `B` and outside `A`'s proximity (retarget); `pointerup` | **`onPreview` reads exactly `2` invocations** for the two moves, **and the second invocation carries BOTH the hide of `A` and the show of `B`** — ONE transition, in ONE observed-move turn; **`stats().moves === 2`**; the durable reveal count at the terminal is still exactly `1` | ruling 2 clause (2); `§2.3` item 5, `§5.5.1 P-RL-SM-6` | `[T]` |
| **M-12** | **The pre-drag value is captured EXACTLY ONCE per gesture, at establishment** | three stage reads within one gesture: after `attach` and before establishment; after establishment; at the terminal — each read from the module's own observation surface (the invalid arm's committed value, or a seam that records what it received) | **`0` before establishment, `1` after establishment, and still exactly `1` at the terminal** — never "at least", never a second read; a SECOND gesture captures its own once | `§0A` note 9, `§2.3` item 6(b)/item 7, `§5.5.1 P-RL-SM-4` | `[T]` |
| **M-13** | **`reset(element)` takes the invalid arm, and its refusals are returned never thrown** | (a) an active gesture, then `reset(el)`; (b) `attach(el)` with **no** establishment, then `reset(el)`; (c) an unusable session, then `reset(el)` | **(a)** one `session.reset` call carrying the captured handle and the captured pre-drag value, and `{ok: true, code: 'ok', committed: true}`; **(b)** `{ok: false, code: 'no-gesture', committed: false}` with **ZERO session calls**; **(c)** **the INERT module's refusal record with ZERO session calls, and NEVER a throw** | `§2.1` item 1 (`reset`), `§2.4` items 1/5, `§5.5.1 P-RL-SM-7`/`P-RL-TP-2` | `[T]` |
| **M-14** | **The sink can read the discriminator, and the invalid arm's committed value is the CALLER's** | the `M-8` drive with a sink that records **its own `value` argument** and `gesture.outcome` | the recorded outcome is **`'reset'`** and the recorded value is **the caller-supplied pre-drag value by identity**, **NEVER a target, never a candidate and never a module-invented default**; and the control drive (an ordinary `'end'`) records **`'end'`** | `docs/specs/gsession.md` `§2.5` item 10; `§2.3` item 6(d), `§0A` note 8 | `[T]` |
| **M-15** | **The module's counters are its own and are readable, and the two reveal readings AGREE** | after `M-5`'s lifecycle, then `M-4`'s cancel, then `M-8`'s invalid arm | `stats()` reports the declared figures for `attached`/`gestures`/`moves`/`candidateCalls`/`resolveCalls`/`revealWrites`/`revealed`/`resets`/`sinkCalls`/`written`, **every figure reconciled against the recording sink's own call record and the recording session's own log**, and **`revealWrites === revealed === 1`** (no reveal throw occurred) | `§0A` note 10, `§2.1` item 1, `§3.2 F-5` | `[T]` |
| **M-16** | **`detach()` restores the module's baseline through the session, once** | `attach(elA)`; `detach()`; `detach()` again | the FIRST call delegates **`session.dispose()` exactly once** and returns `true` when the session reports `complete: true`; the SECOND makes **ZERO session calls** and returns `false`; **`detached` reads `true` forever after**; the session's own detach arithmetic is the session's row | `§2.1` item 1 (`detach`), `§2.5` item 1, `I-9` | `[T]` |
| **M-17** | **The consumer's four hooks are forwarded BY IDENTITY and nothing is swallowed** | a full lifecycle with all four consumer hooks supplied, each recording its own arguments | **each hook ran exactly once, with the arguments the session gave the module's wrapper** (`toBe` on the handle for `onMove`, on the element for `onStart`/`onEnd`/`onCancel`), **and the module's own wrapper's capture did not alter any argument** | `§2.1` item 1 (`RelocateHandle`), `§2.5` item 4, `I-5` | `[T]` |

### 3.2 Documented fail-states / non-happy states

**The pure function's rows first (`F-1`..`F-3`) — and NOTE the shape: `withinProximity` has NO REFUSAL
DOMAIN, so every outcome in that block is a VALUE, not an error.**

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **A NON-NUMBER operand** | `withinProximity` driven with `duration` as `'20'`, `'0'`, `null`, `undefined`, `true`, `false`, `{}`, `[]`, `Symbol('s')`, a function, `12n`/`0n`, a `Map` | **`false` in every case** — **no coercion, no `Number(...)`, no `parseFloat`, no `+value`, no `String` round-trip**; **the other operand is not consulted for a different answer**; **`12n` does NOT throw** (the gate precedes the comparison) | `§2.1` item 1, `§2.3` item 1, `§4.4 S-PURE-1` | `[T]` |
| **F-2** | **`NaN` on either side** | `(NaN, 20)`, `(20, NaN)`, `(NaN, NaN)` | **`false` in all three** — the comparison's own answer, **not `min`-style arithmetic and not a throw** | `§2.1` item 1, `§2.3` item 1 | `[T]` |
| **F-3** | **A NON-FINITE `number` reaches the comparison VERBATIM** | `(Infinity, Infinity)`, `(0, Infinity)`, `(5, -Infinity)`, `(-Infinity, -Infinity)`, `(42, 0)` | **`true`, `true`, `false`, `true`, `false`** — the formula's answers, **no finiteness refusal, no clamp, no throw** | `§2.1` item 1, `§2.3` item 1 | `[T]` |
| **F-4** | **THE NO-WRITER COMPOSITION — a positive control that MUST FAIL** | `createRelocateSession({session, candidatesFor, resolveTarget, onReveal, threshold, onPreview})` — **no `commit` seam at all**, or a `commit` that is non-callable; a full lifecycle within proximity | **the row FAILS**: the write count is **`0`** where the contract requires `1`. **AND THE COMPOSITION'S STATE IS STATED IN THE SAME SENTENCE: the session's own terminal result may read `committed: true` while THIS composition wrote NOTHING** — **therefore *"one commit per gesture"* is vacuous for this composition and must NEVER be quoted as evidence that a write happened** | ruling 6, `§2.4` item 1 (`commit`), `I-2`, `§5.5.1 P-RL-SM-2` | `[T]` |
| **F-5** | **THE TWO READINGS DIVERGE — the channel-identity falsifier, a positive control that MUST FAIL** | (a) the CONFORMANT composition, with a sink and an `onReveal` that **each record their own invocation**; (b) a composition whose `onReveal` and `commit` are **the SAME function**; (c) a composition in which an `onPreview` invocation **also produces an `onReveal` invocation** | **(a)** the consumer's `onReveal` record reads `1` **and** `stats().revealWrites` reads `1` — **they AGREE, and the agreement is the row's positive half**; **(b)** the row **FAILS**: one function received both channel classes; **(c)** the row **FAILS**: the two channels are not the same function and may not share a turn | `§0A` notes 6/10, `§2.3` item 4, `§3.4 R-13`, `§5.5.1 P-RL-SM-6` | `[T]` |
| **F-6** | **THE TWO-WRITER COMPOSITION — positive control, and it MUST FAIL** | a composition in which **a second writer ALSO calls the sink for the same gesture** (the driver calls the sink directly from a hook, or wires the session's `commit` construction option to **the same function** the module's own `commit` seam holds — the `E10-SINGLE-SINK-CHANNEL` violation) | **the row FAILS**: the sink's call record for the gesture has **length `2`**, where the contract requires `EXACTLY 1`. **The module's own `stats().sinkCalls` reads `1` while the SINK's record reads `2`** — **`P-RL-SM-2` asserts BOTH readings**, so a composition cannot pass by counting only its own calls | ruling 6, `§0A` note 7, `§2.3` item 4, `R-13`, `§5.5.1 P-RL-SM-2` | `[T]` |
| **F-7** | **A THROWING `onPreview` PROPAGATES from the observed-move turn** | the presentation seam throws on the first observed move within proximity | the throw **escapes the module's observed-move turn to that turn's caller**; **the per-gesture record is DISCARDED in the module's `finally`** (a later `reset(el)` refuses `'no-gesture'`-class with ZERO session calls); **no reveal and no sink write occurred**; **`stats().moves` counts the move that threw** | ruling 8, `§2.4` items 2/4, `I-10` | `[T]` |
| **F-8** | **A THROWING `commit` PROPAGATES from the terminal turn** | the sink throws on its one invocation at an `'end'` | the throw **escapes the terminal turn to its caller**; the write is **ALREADY COUNTED and NEVER RETRIED** (`stats().sinkCalls === 1`, `stats().written === 0`); the gesture is **`idle`**, **NOT `busy`**; **the element stays installed and a new gesture establishes normally** (a separate drive) | ruling 8, `§2.4` items 2/4, `§2.5` item 6 | `[T]` |
| **F-9** | **A `cancel` writes ZERO times even when the consumer set state on the gesture** | a lifecycle in which the consumer's own `onMove` records a value on the handle and the terminal is a `cancel` | **ZERO reveal invocations, ZERO sink calls, ZERO resets**; the terminal's outcome is **not `'end'`**; the module's record is dropped — **the preview count is NOT asserted to be zero here** (a cancel may follow moves that DID preview; that is `P-RL-SM-6`'s domain) | `§2.3` items 4/5, `§2.6` item 2, `M-4` | `[T]` |
| **F-10** | **The session's own refusals propagate VERBATIM as the module's `lastCode`** | a session double driven to refuse with each of its own codes in turn (a disposed session, a stale handle, no active gesture, a busy session, an uninstalled element, a disconnected source) | **the string the module's `stats().lastCode` reads is BYTE-IDENTICAL to the one the session returned** (`===`), and **NO module-local code exists anywhere in the module's bytes** — an eighth SESSION code, or any module-local code, FAILS | `§2.3` item 4, `§2.4` item 5, `R-15`, `I-14` | `[T]` |
| **F-11** | **An UNUSABLE or hostile `session`, and the total factory** | `createRelocateSession()` · `({})` · `({session: undefined})` · `({session: 42})` · `({session: {}})` · `({session: <a Proxy whose traps throw>})` · `({session: Object.freeze({})})` · `(42)` · `('x')` · `(null)` | **construction NEVER throws**; the returned module is **VALID BUT INERT**: `attach` ⇒ `false` (**no session call, `stats().attached === 0`**), `reset` ⇒ a refusal record with **zero session calls**, `detach()` ⇒ `false`, `stats()` ⇒ **zeroed counters**, `detached` reads `false` until a `detach()` that refuses | `§2.4` items 1/4, `I-10`, `§5.5.1 P-RL-TP-2` | `[T]` |
| **F-12** | **A hostile OPTIONS record — a throwing accessor, a `Proxy`, a non-record** | `createRelocateSession({get session() { throw new Error('x') }})`, the same for each of the seven members; a `Proxy` whose traps throw; `Object.freeze({})`; an array | **construction NEVER throws**, and the resulting module is the INERT module of `F-11` for the members the hostile read made unusable — **the total-member-read rule is what makes this a value and not a throw** | `§2.4` item 4, `§5.5.1 P-RL-TP-2` | `[T]` |
| **F-13** | **A candidate answer that is not a usable record — the whole answer** | `candidatesFor` returning `undefined`, `null`, `42`, `'x'`, `true`, a function, an ARRAY of `CandidateFor` records (a legal answer shape? **NO — see the row's own declaration**), and a record with a THROWING `distance` accessor | **declared: the answer is read through the module's own total member-read; a non-record answer supplies NO candidate and NO distance ⇒ the invalid arm at once, never a throw.** **An ARRAY is NOT a record and is therefore the same class** — the contract's answer shape is `{candidates: readonly CandidateFor[]}`, and **an array in its place supplies nothing** | `§2.4` item 3, `§2.3` item 6(c), `§5.5.1 P-RL-IM-1`/`P-RL-IM-5` | `[T]` |
| **F-14** | **A `distance` field that is absent, non-numeric, `NaN`, non-finite, or read through a throwing accessor** | five separate drives on the same within-band answer, **each with the `candidate` PRESENT** | **all five take the invalid arm** (nothing within proximity) **and NONE throws**; **and the CONTROL drive — an absent `candidate` with a within-proximity `distance` — is WITHIN PROXIMITY** (only the DISTANCE decides) | `§2.4` item 3, `§2.1` item 1 (`CandidateFor`), `§5.5.1 P-RL-IM-5` | `[T]` |
| **F-15** | **An ABSENT or non-callable `candidatesFor`** | the seam omitted; then supplied as `42`, `'x'`, an object, a `Proxy` whose traps throw | **the empty candidate set ⇒ nothing within proximity ⇒ the invalid arm AT ONCE**, with the refusal **not** a cancel; **`stats().candidateCalls` counts the ATTEMPT where the seam was present** and reads `0` where the seam was absent from the options object | `§2.4` items 1/2, `§2.3` item 6(c), `§5.5.1 P-RL-IM-1` | `[T]` |
| **F-16** | **An ABSENT, non-callable or THROWING `resolveTarget`** | the seam omitted; `42`; a callable that throws; a callable returning `undefined` | **in every case the terminal writes NOTHING for that gesture** (`stats().sinkCalls === 0`) **and it is NOT a cancel** (the terminal's outcome is still `'end'`), **and `stats().revealWrites === 0`** — **a target exists or the reveal has nothing to write** | `§2.4` items 1/3, `§2.2` `P-8`, `§5.5.1 P-RL-IM-2` | `[T]` |
| **F-17** | **An ABSENT or non-callable `onReveal`** | the seam omitted; `42`; a callable that throws | omitted/non-callable ⇒ **the write attempt is made and there is nothing to invoke: `revealWrites` counts the ATTEMPT only where a callable was present, and `revealed` reads `0`**; **a THROWING `onReveal` is ABSORBED at the module's own `commit` seam: `revealWrites === 1`, `revealed === 0`, and the terminal turn does NOT throw** — **the sink's own write is unaffected and still happens once** | `§2.4` items 1/2, ruling 8, `§5.5.1 P-RL-IM-4` clause (a) | `[T]` |
| **F-18** | **The invalid arm's STICKY refusal** | a gesture with moves `outside → inside → outside → outside` | **`stats().resets === 1`** — the arm is taken **AT MOST ONCE per gesture**; the second `outside` move takes **no** further reset call; **the consumer's `onPreview` still receives every move's presentation** (the per-move channel is not suppressed by the arm) | `§0A` note 8, `§2.3` item 6(c), `§5.5.1 P-RL-SM-7` | `[T]` |
| **F-19** | **A consumer that writes from its OWN hooks** | the consumer's `onMove` calls its own sink, or its `onEnd` does | **this module's rows do NOT count that write as the composition's** — `stats().sinkCalls` is the count of **the module's own one call site**; **and a composition whose TOTAL write count for one gesture is `2` FAILS `F-6`** (so the loophole closes where it matters) | ruling 6, `§2.3` item 4, `R-13` | `[T]` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **`withinProximity` is TOTAL, PURE and FORMULA-EXACT**: it returns a `boolean` for EVERY pair of inputs, throws for NONE, mutates nothing, retains nothing, and its answer is **either** the `typeof` gate's `false` **or** `distance <= threshold` **verbatim** | `§2.1` item 1's whole content | `§2.3` item 1, `F-1`..`F-3`, `M-2`, `§5.5.1 P-RL-IM-3` |
| **I-2** | **THE THREE CHANNELS ARE THREE DIFFERENT FUNCTIONS, AND (A) IS ONCE-PER-GESTURE-AT-`'end'`**: for every gesture, `onReveal` is invoked **at most once**, **only at an `'end'`**, and **never from `onStart`/`onMove`/`onPreview`**; a gesture crossing the proximity `N >= 2` times still reads **exactly one** | Rulings 4 and 2; the ledger's deliberate strengthening | `§2.3` items 4/5, `§2.6` item 7, `M-5`/`M-7`, `§5.5.1 P-RL-SM-1`/`P-RL-SM-3` |
| **I-3** | **THE SESSION IS THE SOLE GESTURE AUTHORITY, AND THE MODULE OWNS NO LIFECYCLE**: the module never attaches a listener, never calls `session.begin`/`end`/`cancel`, and never writes a channel the session owns beyond its one commit seam — **while entering the session's own `reset` terminal from its move turn is PERMITTED and is not a second authority** | Ruling 3 — the `SECOND-GESTURE-AUTHORITY` objection's answer; `V-13`'s remedy | `§2.5` items 1/3, `§2.2` `P-4`, `R-7`/`R-14` |
| **I-4** | **THE ZONE'S DISPLAYED-NESS IS NOT MONOTONIC, AND THE HIDE IS ON THE PER-MOVE CHANNEL**: it turns on within proximity and off again mid-gesture on either trigger, and a retarget's hide-plus-show is ONE invocation in ONE observed-move turn — **while the durable write is unaffected** | Ruling 2, clause by clause; **DERIVED mapping — `§0A` note 6** | `§2.3` item 5, `M-7`/`M-11`, `§5.5.1 P-RL-SM-6` |
| **I-5** | **THE CONSUMER'S HOOKS AND THE CONSUMER'S OPAQUE VALUES PASS THROUGH BY IDENTITY**: the handle, the element, the candidate, the target and the pre-drag value are never cloned, stringified, keyed or altered by this module | The opaque-value discipline (`E3`'s token rule applied here) | `§2.5` item 4, `M-3`/`M-9`/`M-17`, `R-1` |
| **I-6** | **NO DOM, NO AMBIENT READ, NO ELEMENT LOOKUP, EVER**: the module contains no `document`/`window`/`globalThis`-rooted access, no element-query token in any form, and reads no ambient global | `A-d3`; `E3`'s `P-2` class | `R-2`, layer anchor 3 |
| **I-7** | **NO LISTENER AND NO CAPTURE OF THIS MODULE'S OWN**: every attach is a `session.install` delegation; the module calls no capture member and passes **no install options at all** | Rulings 3/6; `§0A` note 11 | `R-3`, `R-10`, `M-1`, `§5.5.1 P-RL-SM-2` |
| **I-8** | **THE COMPOSITION BOUNDARY IS A CLOSED SET**: the only session members this module CALLS are `install`, `reset` and `dispose`; the only ones it READS are `stats()`, `gesture()` and `disposed` | Ruling 3; the frozen list | `§2.5` item 1, `R-7`/`R-14` |
| **I-9** | **NOTHING CARRIES ACROSS A GESTURE**: the module's per-gesture record (the handle, the element, the pre-drag value, the last candidate answer, the last target, the sticky flag) is **DISCARDED at every terminal in the module's own `finally`** — including a cancel and a refused terminal; the attached-element ledger and the monotonic counters are the only state that outlives a gesture; **no element-keyed value, cache, memo or map exists** | Prohibition P-6; the session's own one-gesture-deep shape applied here | `§2.3` item 7, `§2.5` item 6, `M-10`/`M-12`, `§5.5.1 P-RL-SM-4` |
| **I-10** | **THE MODULE IS TOTAL AT THE SEAM: `createRelocateSession` NEVER throws for ANY argument, and `attach`/`detach`/`reset`/`stats` return their declared shape for every input — a hostile, absent or throwing `session` or option is DEGRADED, never propagated — with EXACTLY TWO named propagation exceptions (`commit` at the terminal turn, `onPreview` at the observed-move turn)** | Ruling 8 as the family applies it | `§2.4` items 1/2/4, `F-7`/`F-8`/`F-11`/`F-12`, `§5.5.1 P-RL-TP-1`/`P-RL-TP-2` |
| **I-11** | **NEVER A GEOMETRY, COORDINATE OR MAGNITUDE CLAIM: no row of this unit may assert a rendered-geometry, layout, paint, coordinate, applied-CSS, cursor or click-retargeting property, and no green of this unit may be reported as one; the module reads NO coordinate, takes NO event object and computes NO distance** | Ruling 5's mandatory clause; the named cost | `§0A` note 5, `R-8`, `§5.2`, `§7` items 2/4, `§5.5.1 P-RL-TP-1` |
| **I-12** | **`withinProximity` MUTATES AND RETAINS NOTHING**: after any call both arguments are reference-identical and value-identical to their pre-call state; a frozen pair of operands works exactly like an unfrozen one; there is no module-level mutable state | Purity, and the `NaN`/non-finite readings' stability | `§2.1` item 1, `M-2`, `§5.5.1 P-RL-IM-3` |
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
| **R-1** | **The anti-evasion VOCABULARY row (P-1, P-5, P-8, P-10), with its DECLARED EXEMPTIONS AND BOTH CONTROLS.** *Over the MODULE's source (`src/shared/relocate.ts`) INCLUDING its comments, no occurrence, in any form, of: a coordinate/event-field token (`clientX`, `clientY`, `pageX`, `pageY`, `screenX`, `screenY`, `offsetX`, `offsetY`, `movementX`, `movementY`, `pointerId`, `deltaX`, `deltaY`, `button`, `buttons`, `isPrimary`); a geometry token (`getBoundingClientRect`, `getComputedStyle`, `offsetWidth`/`offsetHeight`/`clientWidth`/`clientHeight`/`scrollWidth`, `matchMedia`); a pane/zone/tab/axis vocabulary token (`pane`, `zone`, `tab`, `horizontal`, `vertical`, `inline`, `block`); a unit or token literal (`'px'`, `'0px'`, `'fit-content'`, `calc(`, `--`); a selector token (`selectors`, `querySelector*`, `closest`, `getElementById`); a census token (`census`, `zones`, `revealed`, `specOf`, `sizes`, `trackVar`, `trackProp`, `emptyToken`); or a store/cache token (`localStorage`, `sessionStorage`, `store`, `cache`, `memo`, `persist`).* **THE DECLARED EXEMPTIONS, and this is what conditions `C-C` requires: `threshold` and `distance` are EXEMPT BY NAME as THIS UNIT'S DECLARED CONTRACT VOCABULARY** (`§2.3` items 2/3, `§2.1` item 5) — they are the module's own option member and its own answer field, **and the exemption exists because the reconciliation clause licenses the token rather than because the scan is inconvenient.** **The scan reads a NORMALIZED view in which string-literal concatenation is JOINED before scanning (`'thresh' + 'old'`, a template with substituted parts, a token split across a line break) and COMMENTS ARE SCANNED LIKE CODE**, with a word/identifier BOUNDARY rule. **SCOPE, stated because this row's spelling collides with legitimate text:** the scan's scope is **the module file (whole, comments included)** plus **this row's OWN controlled corpora**; the module **must** contain its own member names and field names, **and the TEST FILE must carry the banned spellings inside this row's own control data and assertion messages** — so **a whole-file negative over the test file is DELIBERATELY DROPPED** (`docs/specs/gsession.md` `R-1`'s precedent: *"a whole-file scan of a file that must contain the spellings can only fail"*). **Controls, BOTH REQUIRED, and the POSITIVE control must not be satisfiable by an exemption:** a **POSITIVE control** (a corpus spelling a banned token raw, joined across a literal boundary, and inside a comment **FAILS**) and a **NEGATIVE control** (this unit's own legitimate text — the member names, `candidate`, `distance`, `threshold`, `withinProximity`'s parameter names — **PASSES**). **A row that passes for a module spelling any banned token in any of those three forms is UNFALSIFIED and must not be filed** (`§4.4 S-6`). **Without the exemption clause this row is either vacuous or contradicts `§2.3` item 3 — which is exactly why the exemption is DECLARED rather than implied** | P-1/P-5/P-8/P-10, `§2.3` items 2/3, `§0A` note 12, `§4.4 S-6` | static |
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
| **S-11** | A row proposes **an EIGHTH session result code**, a **fourth session outcome**, a **fifth hook**, a **`selectors`/`unit` parameter**, **a module-local code of this unit's own**, an **options field that could smuggle a policy default in**, or a **second writer** | **Each is a contract change.** **`threshold` is NOT this class** — it is the ADOPTED, caller-supplied parameter reconciled at `§2.3` item 3, and the record's ruling: *"a stop condition cannot be violated by the unit it never governed."* **But an `E4` row proposing an EIGHTH OPTION MEMBER — including a `distanceFor` seam — IS this class**, and it must **stop and report** (the alternative is recorded as ARCHITECT-REVERSIBLE at `§2.3` item 2, which is the honest form: a preference for the architect, never a spec-writer's addition). |
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

| ID | Type | Property | Executed? | Compensating sample rows (`§3`) | Strategy-id | Deterministic enumeration strategy |
| --- | --- | --- | --- | --- | --- | --- |
| **`P-RL-IM-1`** | `P-IM` invariant | **For EVERY `candidatesFor` shape in the row's `4`-shape domain and EVERY observation path in its `5`-path domain, the seam's CALL COUNT and the row's INVALID-ARM outcome are EXACTLY the declared pair for that cell: `candidatesFor` is called AT MOST ONCE per observed move, ONLY from the module's own move turn — never at establishment, never at a terminal, never on a `cancel`, never on a refused terminal, never after the invalid arm has stuck — and an ABSENT / NON-CALLABLE / THROWING seam yields the EMPTY candidate set ⇒ nothing within proximity ⇒ the invalid arm with NO throw out of the turn, and, stated in the same row, THAT IS NOT A CANCEL.** | **YES (bounded — the property text says "every observation path" over the turn domain while the table drives `5` paths, `4` of them observable; the `(bounded)` marking names that scope and the universal is NOT proven)** | `M-3`, `M-5`, `M-8`, `F-13`, `F-15`, `I-5`, `§2.3` items 6(c)/6(d), `§2.4` items 1/3 | `S-RL-ENUM-1` | **`21` attempts** = **`4` `candidatesFor` shapes × `4` observable paths (`16`) + `5` further drives.** **The `4` shapes:** **(1)** a callable returning a well-formed answer whose `distance` is within proximity · **(2)** ABSENT · **(3)** NON-CALLABLE (`42`) · **(4)** a callable THROWING. **The `4` observable paths:** **(a)** one observed move with an established gesture (**the only path that reaches the seam**) · **(b)** an ESTABLISHMENT with no move · **(c)** a `cancel` after one move · **(d)** a REFUSED establishment (`install` on an uninstalled element); **the FIFTH path class — a refused/`'busy'` terminal — is DECLARED NON-REACHING and is driven only as its `(d)` cell**, exactly as `P-RL-IM-1`'s boundary names it. **The `5` further drives, each declaring its own count:** **(e)** TWO sequential observed moves ⇒ `2` calls (the multiplicity that falsifies an instance-level cache) · **(f)** a move FOLLOWING a stuck invalid arm ⇒ `1` call for the gesture and `0` further resets · **(g)** shape `(1)` whose answer carries FIVE candidates, exactly ONE within proximity ⇒ `1` call and exactly one within-proximity decision · **(h)** shape `(1)` whose answer carries ZERO candidates ⇒ `1` call and the invalid arm · **(i)** shape `(1)` whose answer is well-formed but whose `distance` is unusable ⇒ `1` call and the invalid arm (**this drive is shared with `P-RL-IM-5` and is counted in BOTH terms, as `E3`'s `P-GT-IM-2` shared its permutation family with `P-GT-IM-1`**). **Per attempt assert:** the seam's own recorded call count (`exactly`, never "at least"), `stats().candidateCalls`, and the declared arm. **The `4`-shape × `4`-path grid is `16`; `16 + 5 = 21`.** |
| **`P-RL-IM-2`** | `P-IM` invariant | **For EVERY `resolveTarget` shape in the row's `4`-shape domain and EVERY gesture configuration in its `2`-shape domain, the seam's CALL COUNT and the WRITE COUNT are EXACTLY the declared ones: `resolveTarget` is called AT MOST ONCE PER OBSERVED MOVE and ONLY for a move whose answer places the pane within proximity (never at establishment, never at a terminal, never on a `cancel`); the resolved target is the CALLER'S answer, handed on BY IDENTITY to both the presentation channel and the reveal channel; and with an unusable `resolveTarget` the committing terminal writes NOTHING and does NOT throw — so NO DEFAULT TARGET and NO DEFAULT CANDIDATE SET and NO DEFAULT REVEAL STATE exists anywhere in the module, asserted in the same row on every attempt.** | **YES** | `M-3`, `M-9`, `F-16`, `I-5`, `§2.3` item 6(c), `§2.4` items 1/3, `§2.2` `P-8` | `S-RL-ENUM-2` | **`14` attempts** = **`4` `resolveTarget` shapes × `2` configurations (`8`) + `6` further drives.** **The `4` shapes:** **(1)** a callable returning an opaque target OBJECT · **(2)** ABSENT · **(3)** NON-CALLABLE (`42`) · **(4)** a callable THROWING. **The `2` configurations:** **(i)** the target is resolved DURING the gesture (per move — **the PINNED reading, `§7a.1` item 1**) · **(ii)** the target is carried in the candidate answer and resolved at the move anyway (**the control that the module's own multiplicity does not depend on the answer's shape**). **The `6` further drives:** **(a)** a callable returning `undefined` ⇒ `0` sink writes and **NOT a cancel** · **(b)** a callable returning a target, on a gesture with TWO within-proximity moves ⇒ `2` calls and the SECOND target is the one the terminal writes · **(c)** a callable returning a DIFFERENT target on the second move ⇒ the reveal receives the LAST target (`toBe`) · **(d)** a move OUTSIDE proximity ⇒ `0` calls for that move · **(e)** the options object carrying an EIGHTH member ⇒ the row FAILS (the set claim, shared with `P-RL-IM-4` and counted here too) · **(f)** the options object missing `resolveTarget` altogether ⇒ `0` calls and `0` writes, with the invalid arm **not** taken (the answer was within proximity; there is simply nothing to resolve) — **the distinction between *"no target"* and *"no proximity"* is THIS row's sharpest cell.** **Per attempt assert:** the call count, the identity of the target each channel received (`toBe`), and the declared write count. **`8 + 6 = 14`.** |
| **`P-RL-IM-3`** *(the `threshold` row — **the row `§C` decides**, with its TWO DECLARED HALVES and ONE TERM EACH)* | `P-IM` invariant | **TWO HALVES, each with its own term (`R-2`).** **(3a) THE COMPARISON — for EVERY `(distance, threshold)` class pair in the row's fixed grid, the module's exported pure `withinProximity` answers EXACTLY ONE DECLARED OUTCOME — inside / on the boundary / outside — for `d < t`, `d == t` and `d > t`, and answers `false` for EVERY HOSTILE pair, WITHOUT THROWING** (the declared answer table is `§2.1` item 1). **(3b) THE NO-DEFAULT CLAUSE — `threshold` is present as a caller-supplied value, it is READ (not merely carried), and NO DEFAULT, NO UNIT STRING and NO MECHANISM-SIDE DISTANCE COMPUTATION exists** — the `threshold`-absent configuration produces the invalid arm, never a default, and the module's own bytes contain no distance arithmetic. **Assertions are reported BESIDE each term, never inside it.** | **YES (bounded — the property text says "EVERY class pair" while the table drives `12` cells for (3a) and `3` for (3b); the universal is NOT proven)** | `M-2`, `F-1`..`F-3`, `F-14`, `I-1`, `§2.3` items 1/2/3, `§5.5.1 P-RL-IM-5` | `S-RL-PURE-1` (3a) · `S-RL-PURE-2` (3b) | **(3a) `12` attempts** = **`4` distance classes × `3` threshold classes.** **The `4` distance classes:** **(1)** a finite `number` below · **(2)** a finite `number` equal to the threshold · **(3)** a finite `number` above · **(4)** the HOSTILE class — driven as its `5` variants INSIDE the drive (non-number, `NaN`, `+Infinity`, `-Infinity`, a `12n`/`Symbol` operand), each declaring `false` and no throw. **The `3` threshold classes:** **(a)** a positive finite `number` · **(b)** `0` · **(c)** a NEGATIVE finite `number` (`-1`; the pair `(-5, -1)` declares `false`, the pair `(-2, -1)` declares `true`) — **so the boundary `d == t` and the negative-operand limb are both driven, and `-0` is driven as a `0`-class variant asserting the BOOLEAN only.** **`4 × 3 = 12`.** **(3b) `3` attempts:** **(1)** the options object WITHOUT `threshold` ⇒ the invalid arm on every within-candidate move, with `0` defaults observable anywhere · **(2)** a non-number `threshold` (`'20'`, `{}`, `null`) ⇒ the same invalid arm, never a coercion · **(3)** a within-candidate move with a usable `threshold` ⇒ the arm is NOT taken — **the positive control that makes (1)/(2) meaningful.** **Per attempt assert (printed BESIDE the term): the answer, the no-throw clause, the absence of a unit string, the absence of a second comparison site, and the arm taken.** |
| **`P-RL-IM-4`** | `P-IM` invariant | **THE SEAM SET IS FROZEN: the factory's options object carries EXACTLY the SEVEN declared members, NAMED and ORDERED — `session` · `candidatesFor` · `resolveTarget` · `onReveal` · `commit` · `threshold` · `onPreview` — and nothing else; AN EIGHTH MEMBER FAILS; `capture` is ABSENT (not `false`); a `distanceFor` member FAILS; and no policy default exists.** **The set claim is asserted ON EVERY ATTEMPT OF THE WHOLE REGISTER as a cross-row assertion PRINTED BESIDE each row's term and NEVER COUNTED IN IT** (`R-1`: a cross-row assertion is not a declared term), **and its OWN term here is this row's OWN drives only.** | **YES** *(the set claim is over a closed seven-name list, and every cell has its own declared outcome — no member is a sample of an unlisted shape)* | `M-1`, `R-1`, `R-4`, `R-10`, `§2.1` items 1/2, `§2.2` `P-8` | `S-RL-SET-1` | **`8` attempts** = the **`7` declared members each driven once as the VARYING member with the other `6` present** (`7`) **+ `1` positive control**. **The `7` drives:** each varies exactly one member's VALUE (including the absent form) and asserts the options object's own key SET read BY NAME is unchanged and exactly the seven, with `capture`'s presence FAILING. **The `1` positive control:** an options object carrying **`distanceFor`** — **an EIGHTH member, which must FAIL**; **the module's own handling of it is asserted too: the extra member is IGNORED, never honoured** (so the control has both a failing-set half and a stated module half). **Per attempt assert:** the key set by name, the declared order, `capture`'s absence, and that no member is defaulted. |
| **`P-RL-IM-5`** *(the record's `M-1` addition — the DISTANCE FIELD's read and its degradation)* | `P-IM` invariant | **For EVERY `distance`-field shape in the row's `7`-shape domain and EVERY gesture path in its `3`-path domain: the field is READ through the module's own total member-read — absent · `undefined` · a non-`number` · `NaN` · a non-finite `number` · a THROWING accessor · a usable `number` — and EVERY UNUSABLE STATE ANSWERS "NOTHING WITHIN PROXIMITY" ⇒ the invalid arm, and NEVER a throw.** **AND THE CONVERSE, asserted in the same row: an ABSENT `candidate` field with a WITHIN-PROXIMITY `distance` IS WITHIN PROXIMITY — ONLY THE DISTANCE DECIDES.** | **YES (bounded — the property text names "EVERY distance-class shape and EVERY gesture path" while the table drives `7` field shapes × `3` paths; the universal is NOT proven)** | `F-14`, `F-13`, `M-8`, `§2.4` item 3, `§2.1` item 1 (`CandidateFor`) | `S-RL-DIST-1` | **`21` attempts** = **`7` `distance` shapes × `3` gesture paths.** **The `7` shapes:** **(1)** a usable finite `number` within proximity · **(2)** a usable finite `number` outside proximity · **(3)** ABSENT (the field omitted) · **(4)** `undefined` EXPLICITLY present · **(5)** a non-`number` (`'5'`, `null`, `true`, a `Symbol`, a `12n`) · **(6)** `NaN` and, as variants inside the drive, `+Infinity`/`-Infinity` · **(7)** a record whose `distance` accessor THROWS. **The `3` gesture paths:** **(a)** the OBSERVED-MOVE path (the answer is consulted) · **(b)** the COMMITTING-TERMINAL path (the last observed answer is the one the terminal's target came from) · **(c)** the INVALID-ARM path (the arm the unusable states select). **Per attempt assert:** the within-proximity decision, the arm taken, the absence of a throw, and — on shape `(7)` — that the throw was ABSORBED rather than propagated (`§2.4` item 2). **`7 × 3 = 21`.** |
| **`P-RL-SM-1`** *(the HEADLINE row — and its declared terminal domain IS the RULED SET `{` `'end'` `}`)* | `P-SM` state-machine | **For EVERY terminal path in the row's `5`-path domain and EVERY crossing count in its `2`-count domain: `onReveal` is invoked EXACTLY ONCE for a gesture that reaches an `'end'` terminal, and ZERO TIMES for every other path — a `'reset'` terminal (**THE DECLARED TERMINAL DOMAIN IS `{` `'end'` `}`, THE RULED SET — ruling 2 clause (3), `§0A` note 6, DERIVED AND FLAGGED**), a `cancel`, a refused terminal, and a terminal whose target is `undefined`.** **AND THE FORK-FAILING LIMB, KEPT — it is this row's whole content: a gesture that crosses the proximity `N >= 2` times STILL reads EXACTLY ONE `onReveal` invocation, so the per-crossing shape FAILS.** **The reading is the CONSUMER'S OWN RECORD BESIDE the module's `RelocateStats.revealWrites` — they must AGREE.** | **YES** *(the `5` paths and the `2` counts are the declared domain, and every cell has its own declared pair)* | `M-5`, `M-6`, `M-7`, `M-9`, `F-9`, `F-16`, `F-17`, `I-2`, `§2.3` items 4/5, `§2.6` item 7 | `S-RL-REVEAL-1` | **`5` attempts** = **`5` terminal-path drives, each asserting the declared pair.** **The `5` paths:** **(1)** an `'end'` terminal of a gesture whose LAST observed move was within proximity and whose target is a target ⇒ **exactly `1` reveal**, carrying the target by identity, and `gesture.outcome === 'end'` at the sink · **(2)** a `'reset'` terminal (the invalid arm) ⇒ **exactly `0` reveals**, `stats().resets === 1`, and the sink's value is the caller's pre-drag value — **THE ZERO-REVEAL CELL THE RULING FORCES**, which is also why this row's domain is the ruled set · **(3)** a `cancel` ⇒ **`0` reveals and `0` sink calls** · **(4)** a REFUSED terminal (a stale/absent handle, `'busy'`, `'disposed'`, `'not-installed'`, `'disconnected'`) ⇒ **`0` reveals** · **(5)** an `'end'` terminal whose resolved target is `undefined` ⇒ **`0` reveals and `0` sink writes, and the outcome is still `'end'`** (the *not-a-cancel* control). **The `2` crossing counts are asserted INSIDE paths `(1)` and `(2)`: `N = 1` and `N = 5` within-proximity moves ⇒ both read exactly `1` reveal for path `(1)` and exactly `0` for path `(2)`** — **so `5` drives carry the crossing-invariance limb, and the limb is not a fifth row's business.** **Per attempt assert:** BOTH readings (`stats().revealWrites` and the consumer's own record) and their AGREEMENT; the carried target's identity; `gesture.outcome`. |
| **`P-RL-SM-2`** *(the channel split — the session's `commit` and the module's own sink are DIFFERENT functions)* | `P-SM` state-machine | **For EVERY composition shape in the row's `5`-shape domain and EVERY terminal class in its `2`-class domain, the write channel behaves EXACTLY as declared: ONE CONFORMANT composition writes exactly once per `'end'` gesture and the sink's own record and `stats().sinkCalls` AGREE; A TWO-WRITER composition FAILS (the sink's record reads `2` for one gesture while the module's own count still reads `1` — WHICH IS WHY BOTH READINGS ARE ASSERTED); A NO-WRITER composition FAILS (the count reads `0` where `1` is required); A COMPOSITION GIVING THE SAME FUNCTION TO THE MODULE'S `commit` SEAM AND TO THE SESSION'S `commit` CONSTRUCTION OPTION IS A TWO-WRITER COMPOSITION AND FAILS; and a consumer's OWN write from its own hook is NOT this composition's write — while a composition whose TOTAL write count for one gesture is `2` FAILS.** | **YES** | `M-9`, `F-4`, `F-6`, `F-19`, `R-13`, `I-2`, `§2.3` item 4, `§2.5` item 5, `§0A` note 7 | `S-RL-WRITER-1` | **`11` attempts** = **`5` composition shapes × `2` terminal classes (`10`) + `1` positive control.** **The `5` shapes:** **(1)** the CONFORMANT composition (one sink seam, one call site) · **(2)** a SECOND WRITER that calls the sink directly from the consumer's own `onEnd` **at the SAME committing terminal** (so both readings are about ONE gesture) · **(3)** a SLOT-EMPTY composition (no `commit` at all, or a non-callable one) · **(4)** the `E10-SINGLE-SINK-CHANNEL` violation — the SAME function handed to the module's `commit` seam and to the session's `commit` construction option · **(5)** a consumer whose own `onMove` writes its own sink. **The `2` terminal classes:** **(a)** an `'end'` · **(b)** a `'reset'` (the invalid arm). **The `1` positive control:** shape `(1)` driven twice with DIFFERENT sink identities, asserting the module holds no residue of the first. **Per attempt assert:** the sink's own record for the gesture, `stats().sinkCalls`, and their declared agreement or DIVERGENCE — **the divergence is the falsifier, and a composition whose two readings agree at `2` for shape `(2)` FAILS (the second write did not come from a second writer on the same terminal).** |
| **`P-RL-SM-3`** *(the falsifying row — `onReveal` NEVER from `onStart`/`onMove`)* | `P-SM` state-machine | **`onReveal`'s ONLY call site is the module's own `commit` seam. A STATIC CENSUS of `onReveal` references outside that site is EMPTY — and that census is an ASSERTION carried in each drive, reported BESIDE this row's term and NEVER counted in it (`R-1`).** **AND, as drives: a gesture that crosses the proximity `N >= 2` times reads exactly one invocation, and a driver whose `onReveal` is invoked from the module's own `onStart`/`onMove` FAILS this row.** | **YES** | `M-5`, `M-6`, `M-7`, `I-2`, `R-13`, `§2.6` item 7, `§0A` note 6 | `S-RL-SITE-1` | **`5` attempts** = **`5` observation drives.** **(1)** a gesture with ONE within-proximity move ⇒ `1` invocation, and the recorded invocation happens INSIDE the terminal (the drive's spy records the phase) · **(2)** a gesture with FIVE within-proximity moves ⇒ still exactly `1` · **(3)** a gesture with five moves, NONE within proximity ⇒ `0` invocations · **(4)** the CONTROL drive in which the module's own `onStart`/`onMove` wrapper calls `onReveal` ⇒ **the row FAILS** (an invocation outside the commit seam is caught by the phase assertion) · **(5)** the CONTROL drive in which `onReveal` is invoked TWICE from the same commit seam ⇒ **the row FAILS** on the count. **Per attempt assert:** the consumer's own record (count + phase + argument identity), `stats().revealWrites`, and their agreement. **THE STATIC CENSUS IS PRINTED BESIDE THE TERM AND IS NOT PART OF IT.** |
| **`P-RL-SM-4`** *(no retention across the boundary — with the pre-drag value's ONE capture point, `R-4`)* | `P-SM` state-machine | **For EVERY stage in the row's `3`-stage domain and EVERY slot shape in its `2`-shape domain: the caller-supplied PRE-DRAG VALUE is captured EXACTLY ONCE per gesture — at the module's own `onStart` wrapper, for a gesture the session ESTABLISHED — the running count is asserted EXACTLY and never "at least", and NOTHING IS RETAINED across the boundary: after the terminal the per-gesture record (handle, element, pre-drag value, last candidate answer, last target, sticky flag) is GONE, a subsequent `reset(element)` refuses `'no-gesture'`-class with ZERO session calls, and no element-keyed value, cache or memo exists.** | **YES (bounded — the property text says "EVERY stage and EVERY slot shape" while the table drives `3` stages × `2` slots; the universal is NOT proven)** | `M-10`, `M-12`, `M-16`, `I-9`, `F-11`, `§2.3` item 7, `§2.5` item 6 | `S-RL-WINDOW-1` | **`6` attempts** = **`3` stages × `2` slot shapes.** **The `3` stages:** **(1)** after `attach`, before any establishment ⇒ pre-drag count `0`, and an `onStart` that never ran · **(2)** after establishment, before any move ⇒ pre-drag count EXACTLY `1` · **(3)** at and after the terminal ⇒ still EXACTLY `1`, the record GONE, and a `reset(element)` refusing with ZERO session calls. **The `2` slot shapes:** **(a)** a gesture that terminated by an `'end'` · **(b)** a gesture that terminated by `'reset'` (the invalid arm) — **plus, as a variant INSIDE shape (b), a gesture whose session refused establishment: `0` captures and `0` records**. **Per attempt assert:** the pre-drag count (`exactly`), the record's presence/absence by observable consequence (a `reset`'s refusal code and its session-call count), and the absence of any element-keyed structure (a second element's gesture reads no value from the first). |
| **`P-RL-SM-5`** *(the `M-2` addition — the reset path's WRITE FORM)* | `P-SM` state-machine | **For EVERY arm in the row's `4`-arm domain: the invalid arm's VISIBLE REVERT is carried by the PER-MOVE CHANNEL (`onPreview`) and NO REVEAL WRITE OCCURS ON THAT ARM** — the reset terminal commits **exactly one** caller-supplied pre-drag value, `onReveal` reads **ZERO**, and — in the control columns — the `'end'` arm's reveal IS exactly `1`. **THE ASSERTION IS BY CHANNEL, NOT BY COUNT: the row asserts WHICH channel carried the revert, because a module that reverts through `onReveal` reads the same channel total and fails the contract.** | **YES** | `M-8`, `M-13`, `M-14`, `F-9`, `F-16`, `§2.3` item 4, `§0A` notes 6/8 | `S-RL-RESET-1` | **`3` attempts** = **`3` arm drives, each asserting a `(revealWrites, the row's own recorded preview count, sinkCalls)` triple** — **the preview reading is THE ROW'S SPY'S, because `RelocateStats` exposes NO `previewWrites` member** (`§7a.1` item 2's working default).** **(1) THE INVALID ARM** — a move outside every candidate's proximity, then `pointerup`: assert **`revealWrites === 0`**, **`onPreview` received exactly one revert write**, `resets === 1`, `sinkCalls === 1` with the pre-drag value, and **the later `pointerup` committing nothing** (the count stays `1`). **(2) THE CONTROL — THE `'end'` ARM**, otherwise identical but within proximity on the last move: assert **`revealWrites === 1`** and `sinkCalls === 1` and `resets === 0` — **the pair `(1)`/`(2)` is what makes the zero-reveal cell a CONTRAST rather than an absence.** **(3) THE CONTROL — REVERT VIA THE WRONG CHANNEL**, a driver whose revert is published through `onReveal`: **the row FAILS the by-channel assertion even though its channel TOTAL matches** — **this is the drive that makes "which channel" falsifiable and not merely "how many".** **Per attempt assert:** the triple, the channel each write arrived on (the spies are separate functions and the drive records the CALLER), and the sink's value identity. |
| **`P-RL-SM-6`** *(the RULING-FORCED row — the per-move channel's SHOW/HIDE TRANSITION count, with the RETARGET drive)* | `P-SM` state-machine | **For EVERY move shape in the row's `7`-shape domain and EVERY gesture configuration in its `2`-shape domain: `onPreview` is invoked AT MOST ONCE PER OBSERVED MOVE, ZERO times at a committing terminal, NEVER invokes the reveal channel, and NO invocation of either channel ever accompanies a sink write in the same turn; and THE ZONE'S DISPLAYED-NESS IS NOT MONOTONIC — an observed move that leaves the proximity HIDES, and a RETARGET hides the old zone and shows the new INSIDE ONE OBSERVED-MOVE TURN (hide-plus-show is ONE transition, not two).** | **YES (bounded — the property text names "EVERY move shape and EVERY configuration" while the table drives `7` moves × `2` configurations; the universal is NOT proven)** | `M-7`, `M-11`, `F-5`, `F-7`, `F-9`, `I-4`, `R-16`, `§2.3` item 5 | `S-RL-CHANNEL-1` | **`14` attempts** = **`7` move shapes × `2` gesture configurations.** **The `7` move shapes (in the fixed order a single gesture drives them, and each is ALSO driven standalone in configuration (ii)):** **(1)** a move INTO proximity ⇒ `1` show · **(2)** a second move still within the SAME zone ⇒ `1` invocation carrying the unchanged zone (**not a second show — the transition count, not the invocation count, is what the state declares**) · **(3)** a move OUT of proximity ⇒ `1` HIDE · **(4)** a move back INTO the same zone ⇒ `1` show again (**the non-monotonicity, driven explicitly**) · **(5)** a RETARGET move — within proximity of candidate `B`, outside `A`'s ⇒ **`1` invocation carrying BOTH the hide of `A` and the show of `B`, in ONE turn** · **(6)** a move outside every candidate's proximity AFTER a retarget ⇒ `1` hide · **(7)** an `'end'` terminal ⇒ **`0` preview invocations at the terminal**. **The `2` configurations:** **(i)** the ordered gesture `(1)→(2)→(3)→(4)→(5)→(6)→(7)` above · **(ii)** each shape driven STANDALONE from a fresh session (so no shape's reading depends on its predecessor). **Per attempt assert:** the invocation count for that move (**exactly `1` or `0`**), the state the invocation carried (the hide/show transition), the absence of any `onReveal` invocation in the same turn, and — on shape `(7)` — the absence of any preview at a terminal. **`7 × 2 = 14`.** |
| **`P-RL-SM-7`** *(the invalid-placement arm)* | `P-SM` state-machine | **For EVERY invalidity class in the row's `3`-class domain: the invalid arm is taken AT MOST ONCE per gesture — the module enters the session's `reset` terminal EXACTLY ONCE, FROM ITS OWN MOVE TURN WHILE THE GESTURE IS STILL ACTIVE, commits EXACTLY ONE caller-supplied pre-drag value, leaves the later `pointerup` committing NOTHING, and the session's own terminal result agrees with the sink's record. A later `pointerup` that commits ANYTHING FAILS.** | **YES** | `M-8`, `M-13`, `M-14`, `F-18`, `F-15`, `I-3`, `§0A` note 8, `§2.3` item 6(c) | `S-RL-INVALID-1` | **`7` attempts** = **`3` invalidity classes × `2` `pointerup` timings (`6`) + `1` sticky control.** **The `3` classes:** **(1)** NO candidates at all (an absent/non-callable/throwing seam, or an empty answer) · **(2)** candidates whose distances are ALL outside `threshold` · **(3)** candidates whose distances are UNUSABLE (`NaN`/non-number/non-finite/throwing) — **the class the record's `M-1` addition forces.** **The `2` timings:** **(a)** the `pointerup` arrives AFTER the invalid arm was taken ⇒ it commits **nothing** · **(b)** the `pointerup` arrives while the gesture is still active and the arm was taken on the same move turn ⇒ same declared counts (the arm is not re-taken). **The `1` sticky control:** a gesture with the moves `outside → inside → outside → outside` ⇒ **`resets === 1`** exactly, with the presentation channel still receiving every move. **Per attempt assert:** `stats().resets`, the session double's call log (the `reset` entry's position in the turn sequence — **during the drag, not at the release**), the sink's value identity against the caller's pre-drag value, and the total sink-call count for the gesture (`1`). |
| **`P-RL-SM-8`** *(the record's `M-2` second half — the reset path's code propagation)* | `P-SM` state-machine | **For EVERY refusal class in the row's `3`-class domain: the module returns the SESSION's own code VERBATIM (byte-identical, `===`), carries NO module-local code of its own, passes NO code INTO the session, and its `stats().lastCode` reads a member of the session's own closed union.** | **YES** | `M-13`, `F-10`, `F-11`, `R-15`, `I-14`, `§2.3` item 4, `§2.4` item 5 | `S-RL-CODES-1` | **`4` attempts** = **`3` refusal classes + `1` closed-set control.** **(1)** a `reset(element)` with NO active gesture ⇒ the session's own `'no-gesture'`-class code, VERBATIM, with ZERO session calls (`F-10`'s class) · **(2)** a `reset(element)` on a DISPOSED session ⇒ the session's own `'disposed'`-class code · **(3)** a `reset(element)` on a session whose `reset` refuses with each of its remaining members in turn ⇒ each code returned byte-identically · **(4)** the CONTROL: a module carrying a code literal that is NOT a member of the session's union, or passing a code INTO `session.reset` ⇒ **the row FAILS**. **Per attempt assert:** the returned string against the session's own returned string (`===`), the session-call count, and the absence of any literal code of the module's own. |
| **`P-RL-TP-1`** *(the SEVEN-SEAM TOTALITY universal — with its BOUND in its own words, over a pinned-seed pool)* | `P-TP` totality | **For EVERY seam shape drawn from the pinned `15`-member pool and driven through EITHER of the row's `2` composition configurations: NO METHOD OF THIS MODULE THROWS — for any argument — AND `A THROWING INJECTED SEAM IS EXCLUDED FROM THAT UNIVERSAL ONLY WHERE `§2.4` item 1's SEVEN-SEAM TABLE NAMES A DIFFERENT, EXPLICIT OUTCOME FOR IT`: an absent, non-callable or throwing `session`/`candidatesFor`/`resolveTarget`/`onReveal`/`threshold`/`onPreview` is CAUGHT and mapped to its named safe default, while a throwing `commit` PROPAGATES to the caller of the terminal turn and a throwing `onPreview` PROPAGATES from the observed-move turn. Every drawn drive returns its declared shape: `attach`/`detach` returning a `boolean`, `reset` returning a `{ok, code, committed}` record, `stats()` returning the eleven declared fields, and `detached` a `boolean`.** | **YES (bounded — the property text says "EVERY seam shape" while the pool holds `15` and the drive performs `30` draws; the universal is NOT proven, and no reader may read this row as its proof. THE BOUND IS STATED IN THIS CELL'S OWN WORDS)** | `F-7`, `F-8`, `F-11`, `F-12`, `F-17`, `I-10`, `§2.4` items 1/2/4 | `S-RL-TOTAL-1` | **`30` attempts** = **`15` pinned-seed DRAWS × `2` composition configurations**, where **one attempt is one totality DRIVE (one drawn shape passed as one seam of one configuration, with every method then called once)** and **the per-call ASSERTIONS (`>= 3` each: did-not-throw · declared kind · declared members callable) are reported as the row's `assertions` figure, NEVER as attempts.** **The `15` draws come from the pool by the pinned LCG (`state₀ = 20260927`, ONE step per draw, `index = stateₙ₊₁ mod 15`) — so the same pool member may be drawn more than once and NO claim of full coverage is made or asserted.** **The `15`-member pool:** `undefined` · `null` · `42` · `'x'` · `true` · a plain object with no callable member · an ARRAY · a FUNCTION · a `Symbol` · a `12n` · a frozen empty record · a record with a THROWING accessor · a `Proxy` whose traps THROW · a callable returning its own argument · a record whose single member is callable. **The `2` configurations:** **(i)** the drawn shape supplies the `session` seam with the other six in their usable default form · **(ii)** the drawn shape supplies EACH of `candidatesFor`/`resolveTarget`/`onReveal`/`commit`/`threshold`/`onPreview` in turn (the six-seam sweep — one drawn shape, six seam positions, the other five in their usable default form). **Per attempt assert:** the declared shape of every method's return and the declared propagation/absorption for the position under test. |
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
| `P-RL-IM-1` | `21` | **`17`** | the `4`-shape × `4`-path grid's **ABSENT/NON-CALLABLE/THROWING rows on paths `(b)`/`(c)`/`(d)` read the same module-observable evidence** (the seam is never reached), so `4` cells collapse into `1` reading each; the `5` further drives are distinct |
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
| `P-RL-IM-1` | *at most once per observed move, only from the move turn, and unusable ⇒ the invalid arm* | **CLEAN with the marking above** — every one of the `4` shapes has its own declared call count and arm on every one of the `4` observable paths, **the three unusable shapes' paths `(b)`/`(c)`/`(d)` cells are DECLARED as *"the seam is never reached"***, and the fifth path class is declared non-reaching **so no member contradicts the text** |
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

#### 5.5.3 Attempt arithmetic — STATED SO A READER CAN CHECK IT AGAINST THE TABLES

**THE DECLARED TOTAL, printed WITH its terms — and this is the figure every cap comparison uses:**

**`170` = `21` + `14` + `12` + `3` + `8` + `21` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` + `30` + `6`**

*(**THE AS-FILED FORM, kept visible per `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`: this line AS FIRST
WRITTEN read `149` = `21` + `14` + `12` + `8` + `3` + `5` + `11` + `5` + `6` + `3` + `14` + `7` + `4` +
`30` + `6` — a FIFTEEN-TERM form that OMITS `P-RL-IM-5`'s `21`. THE WHOLE CORRECTION IS AT THE FOOT OF
THIS SUBSECTION.**)*

| The term | Its row | The enumeration that produces it |
| --- | --- | --- |
| **`21`** | `P-RL-IM-1` | `4` `candidatesFor` shapes × `4` observable paths (`16`) + `5` further drives = `21` |
| **`14`** | `P-RL-IM-2` | `4` `resolveTarget` shapes × `2` configurations (`8`) + `6` further drives = `14` |
| **`12`** | `P-RL-IM-3` (3a) | `4` distance classes × `3` threshold classes = `12` |
| **`3`** | `P-RL-IM-3` (3b) | the `3` no-default drives = `3` |
| **`8`** | `P-RL-IM-4` | the `7` member drives + `1` positive control = `8` |
| **`21`** | `P-RL-IM-5` | `7` distance shapes × `3` gesture paths = `21` |
| **`5`** | `P-RL-SM-1` | `5` terminal-path drives (the `2` crossing counts ride inside `2` of them) = `5` |
| **`11`** | `P-RL-SM-2` | `5` composition shapes × `2` terminal classes (`10`) + `1` positive control = `11` |
| **`5`** | `P-RL-SM-3` | `5` observation drives = `5` |
| **`6`** | `P-RL-SM-4` | `3` stages × `2` slot shapes = `6` |
| **`3`** | `P-RL-SM-5` | `3` arm drives = `3` |
| **`14`** | `P-RL-SM-6` | `7` move shapes × `2` gesture configurations = `14` |
| **`7`** | `P-RL-SM-7` | `3` invalidity classes × `2` `pointerup` timings (`6`) + `1` sticky control = `7` |
| **`4`** | `P-RL-SM-8` | `3` refusal classes + `1` closed-set control = `4` |
| **`30`** | `P-RL-TP-1` | `15` pinned-seed draws × `2` compositions = `30` |
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
a WORKING DEFAULT; the third is DERIVED and PINNED-PENDING-CONFIRMATION** *(this filing's choice,
implemented in `§2` and marked as such)*, with a RECOMMENDATION and the CLAUSE each one BLOCKS. **No item
is left as a silent gap**, and **no `§2`/`§3` row, prohibition, register row or diff-scope clause is
weakened, widened or re-scoped by this report.** **A later pass that changes any of these defaults MUST
OPEN A GATE.**

### 7a.1 THE OPEN QUESTIONS — two open items and one derived-pending-confirmation item

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **THE MODULE'S OWN MOVE-TURN SITE FOR THE INVALIDITY TEST** — the record pins the invalid arm as taken **from the module's own move turn while the gesture is still active** (its `§5.5`(b) third item, the `E10` `R7` precedent) but **does not say WHERE in that turn**: **before** the consumer's `onMove` wrapper forwards the hook, or **after** it. **Both readings satisfy the record's words**, and the difference is observable: on the "after" reading a consumer's own `onMove` sees the invalidity already handled; on the "before" reading it sees the pre-arm state and may itself write | **A row cannot assert the TURN ORDER without a choice**, and `P-RL-SM-7`'s *"from its own move turn"* clause is the only place the ordering is visible. **The two readings produce different observable sequences for a consumer hook that inspects state, and the difference is a CONSUMER OBLIGATION rather than a private detail** | **THE INVALIDITY TEST RUNS AFTER THE CONSUMER'S `onMove` HOOK IS FORWARDED** — i.e. the module's move turn is **candidatesFor → proximity → resolveTarget → `onPreview` → the consumer's `onMove` → the invalid-arm test** (`§2.3` item 6(c), `M-3`'s recorded order). **The reason: the consumer's own hook must see the same gesture state the session gave it, and a hook that ran BEFORE the arm would observe a gesture the module was about to reset** — which would make the consumer's own per-move writes racy against the reset | **Do you accept the invalid-arm test running AFTER the consumer's `onMove` hook is forwarded (recommended), OR do you want the arm taken BEFORE the hook so a consumer's move turn always sees the post-arm state — noting that the second reading makes the consumer's own per-move writes land on a reset gesture?** | **`M-3`** (its recorded order), **`P-RL-SM-7`** (its *"from its own move turn"* clause), `§2.3` item 6(c), and the consumer-obligation half of the fork-facing statement |
| **2** | **WHETHER THE MODULE COUNTS ITS OWN PREVIEW INVOCATIONS IN `RelocateStats`** — the record's `M-2` addition says **which channel carries the invalid arm's visible revert** and **that no reveal write occurs on that arm**; it does **not** say whether `stats()` carries a `previewWrites` counter. **The two readings differ in a PUBLIC SHAPE**: a counter is a member a consumer can read and a row can assert against | **`P-RL-SM-5` asserts the by-channel triple `(revealWrites, previewWrites, sinkCalls)` — so the row's own assertability depends on whether the module exposes the third reading or whether the row must read it from its own spy.** **Both are admissible: the row is falsifiable either way, but the PUBLIC SURFACE differs, and a reader of `§2.1`'s `RelocateStats` block sees a counter that this item names as a choice** | **THE MODULE DOES NOT EXPOSE A PREVIEW COUNTER.** `RelocateStats`'s declared fields are **the readings the ROWS need and no more**, and the preview count is **NOT one of them**: `P-RL-SM-5` and `P-RL-SM-6` read `onPreview` invocations **from the row's OWN recording spy**, and `P-RL-SM-5`'s triple is therefore `(revealWrites, the spy's preview count, sinkCalls)` (`§5.5.1`). **The reason: a counter the contract does not need is a public member the contract then owes rows for, and `§2.1` item 3 freezes the member surface at five** — so the DECLARED `RelocateStats` block carries **no `previewWrites` field**. | **Do you accept the module reading the preview channel through the CALLER's own spy (recommended — it keeps `RelocateStats` at its eleven declared fields and adds no member), OR do you want a `previewWrites` counter in `RelocateStats`, which makes the channel readable without a spy and adds one field to a frozen shape?** | **`§2.1` item 1's `RelocateStats` block** (the eleven fields), **`P-RL-SM-5`**'s triple, **`P-RL-SM-6`**'s counts, and `§2.1` item 3's five-member surface |
| **3** | **THE `§9` MAPPING — the zone's mid-drag hide RIDES CHANNEL (B), and therefore channel (A) reads ZERO on the invalid arm** | **This one is NOT open: it is DERIVED, PINNED, and PENDING THE ARCHITECT'S CONFIRMATION AT THIS GATE.** **`docs/decisions.md`'s ruling 2 flags the mapping as a DERIVATION in its own row, and the gate-1 record's `§9` requires the spec to *"pin the derived reading, mark it as derived, and let the architect confirm or flip it"***. **It is listed here so the reader sees it in the same place as the other two, NOT because it is undecided** | **PINNED AS DERIVED: the hide rides (B)** — hence `P-RL-SM-1`'s declared terminal domain is **`{` `'end'` `}`** with the invalid arm's zero-reveal cell, and `P-RL-SM-6`'s retarget cell carries hide-plus-show in ONE observed-move turn (`§0A` note 6). **The ledger's *"exactly once per gesture at gesture end"* strengthening STANDS UNAMENDED AND LITERALLY TRUE** | **CONFIRM the derived reading (recommended), OR FLIP it — in which case the ledger's strengthening becomes FALSE AS WRITTEN on the invalid arm, `P-RL-SM-1`'s declared terminal domain moves to `{` `'end'`, `'reset'` `}`, `P-RL-SM-5`'s by-channel triple changes on the invalid arm, and `§5.5.3`'s arithmetic must be re-derived at the gate — which is why the flip is an architect's act and not a spec-writer's.** | — (no clause is blocked on the RECOMMENDED reading; the FLIP re-derives `P-RL-SM-1`/`P-RL-SM-2`/`P-RL-SM-5`/`P-RL-SM-6`'s cells and `§5.5.3`'s total) |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `0` ruled by this filing
as contract · `2` OPEN with a working default and a recommendation (`1`, `2`) · `1` DERIVED and
PINNED-PENDING-CONFIRMATION (`3`) · `3` clause groups blocked.** **Every item's default IS implemented in
this spec's text**, so **the red set may be authored against the defaults** — but **each default is a
DEFAULT, marked as one, and a later pass that changes one must open a gate.** **The delegation gate's
ambiguity condition is therefore `NOT SATISFIED` by this filing: `§4.5` records the unit as non-delegable
on the red-set condition, and the supervisor must ALSO route these items** — this filing reports them
rather than silently adopting them.

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
