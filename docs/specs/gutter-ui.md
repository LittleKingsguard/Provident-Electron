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
   `src/shared/gutter-affordance.ts`** exporting **FOUR value exports and SEVEN type declarations =
   ELEVEN exported names** (`§2.1`), which **consumes** the `E3` controller and the landed session through
   the frozen delegate surface (`docs/specs/gsession.md` `§2.5`) and **adds no second writer and no second
   gesture authority**; **PLUS an authoring change to `src/shared/demo-envelope.ts`** (the authored gutter
   card of `§2.1` item 7) — the **only** production sites this unit touches, both named in `§5.1`.

3. **THE REGISTER (`§5.5.1`): `7` typed rows in THREE families** — `P-GU-SM-1`..`P-GU-SM-3` ·
   `P-GU-IM-1`..`P-GU-IM-2` · `P-GU-TP-1`..`P-GU-TP-2` — **`142` declared attempts, printed with their
   seven terms and a term-by-term addition at `§5.5.3`**, no generator (so **no pinned seed is needed and
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
OBSERVATED STATE.** The decision rule is stated at `§2.3` item 5 and is **falsifiable on the node suite**:
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
`E3`'s factory and lets `E3` be the single writer. **A module of this unit that called `commit` itself, or
that registered a second writer, is `§4.4 S-5` and does not land** (`§3.1 M-5`, `§5.5.1 P-GU-SM-1`).

**Note 10 — THE CAPTURE OPT-IN IS INSTALLED HERE, AND `E3` NEVER OPTS IN.** **RULED:** the module passes
`capture: true` in the options object it hands `controller.attach(element, hooks)` **iff and only iff the
caller's `capturePointer` option is TRUE**, the DOM source it supplies **implements**
`capturePointer(element)` through the element's own `setPointerCapture` **when that member exists**, and
**the session invokes it at most once per gesture, inside `begin`, after establishment** — so **"no
capture before establishment" is SATISFIED by construction and is asserted as a row**
(`docs/specs/gsession.md` `§2.3` item 6; `docs/decisions.md` `GSESSION-CAPTURE-CAPABILITY-IS-SOURCE-SUPPLIED-AND-OPTIONAL`, cited by NAME). **A capture call from the module's own bytes — outside the source it
supplies — is `§4.4 S-6` and does not land.** **The session's PARKED release-after-failed-establishment
question KEEPS ITS EXISTING TRIGGER** (`docs/pending.md` §I): this unit **neither releases it nor
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
   coordinate source, the cursor, the live preview channel, the capture decision, the drop-revert and
   every rendered-geometry claim of the family** — and it **composes** `E3`'s controller, **re-expressing
   none of its discipline** and **never becoming a second writer or a second gesture authority**.
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
6. **What the unit may land.** The **NEW affordance module** + the **authored demo-envelope card** + the
   **red/green rows** + the **register rows** + **this spec** + its `*-greens.md` + the unit's own
   tracker/record artifacts. **No `E3`, session, renderer, main-process or MCP file changes**
   (`§5.1`).
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
**type-only** import from `./gesture-session.js`, and a **type-only** import from `./gutter.js` (the
controller's own types). **It imports no `provident-ssr`, no `electron`, no `node:*`, no `src/main/**`,
no `src/renderer/**`, no shim, and no sibling other than those two.**

**EXPORT CENSUS — stated before the block, and it MUST AGREE with the block: ELEVEN exported names, in TWO
HALVES — FOUR value exports and SEVEN type declarations.** **The two halves are counted separately on
purpose**, because sibling reviews have caught a census cell contradicting the block beside it, and
because **a type declaration is erased at runtime** — so a single *"11 exports"* claim would be
**half-unfalsifiable**.

**(a) THE FOUR RUNTIME VALUE EXPORTS — exactly `createGutterAffordance`, `cursorDeclarationFor`,
`domEventSource` and `sizeFromPointer`.**

**(b) THE SEVEN TYPE DECLARATIONS — exactly `CursorOf`, `EventSourceLike`, `GutterAffordance`,
`GutterAffordanceOptions`, `PointerPosition`, `PointerResolver` and `PreviewState`.**

**A row asserting only a COUNT without NAMING the names FAILS `§3.4 R-1`'s own text** (`§4.4 S-1`).
**`resolveEventPointer` and `sizeClampedFor` are NON-EXPORTED module-local declarations** (the `E3`
census's own discipline, `docs/specs/gutter.md` `§2.1`'s corrected census): they are **read through the
module's behaviour**, never imported by a row; **`§3.4 R-1`(b) FAILS if a twelfth name appears.**

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

/** THE COORDINATE-TO-SIZE MAPPING — THE CALLER'S SEAM (§0A note 4).
 *  REQUIRED. It receives the module's own `PointerPosition` and the gesture's pre-drag size, and it
 *  owns the axis semantics: a horizontal gutter subtracts `x`, a vertical one subtracts `y`, whatever
 *  the caller's layout means. Its answer is handed UNEXAMINED to `clampToBounds` (`E3`'s exported pure
 *  function), whose `typeof` gate is the only validation there is. A non-number answer ⇒ the clamp
 *  answers `NaN` ⇒ NO SINK WRITE (the `E3` named safe default, `docs/specs/gutter.md` `§2.4` item 1).
 *  A THROW from it PROPAGATES to the caller of the module's own listener turn (`§2.3` item 5, F-3),
 *  exactly as `E3`'s own seam throws behave at a terminal. */
export declare function sizeFromPointer(pointer: PointerPosition, start: number): number

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
  on(element: unknown, type: string, handler: () => void): void
  off(element: unknown, type: string, handler: () => void): void
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
  /** REQUIRED — the coordinate-to-size mapping (`§0A` note 4). */
  readonly sizeFromPointer: (pointer: PointerPosition, start: number) => unknown
  /** REQUIRED — the axis token source. It is ALSO what `E3`'s factory receives as `axisFor`, wired
   *  from ONE closure so the cursor's axis and the controller's axis cannot disagree
   *  (`§2.1` item 3, `§5.5.1 P-GU-IM-2`). */
  readonly axisOf: (element: unknown) => unknown
  /** REQUIRED — the cursor mapping (`§0A` note 8). */
  readonly cursorOf: CursorOf
  /** REQUIRED — the module's ONE preview call, invoked during the drag only (`§2.5`). */
  readonly applyPreview: (state: PreviewState) => void
  /** REQUIRED — the module's ONE cursor call, invoked on hover only (`§2.6` item 3). */
  readonly applyCursor: (element: unknown, declaration: string | undefined) => void
  /** REQUIRED — the pre-drag size source. It is ALSO `E3`'s `defaultSizeFor` (one closure, §2.1
   *  item 3), so an invalid release's reset clamps the PRE-DRAG SIZE the consumer holds. */
  readonly startSizeOf: (element: unknown, token: unknown) => unknown
  /** REQUIRED — the bounds pair source; `E3`'s `boundsFor` (one closure, §2.1 item 3). */
  readonly boundsOf: (element: unknown, token: unknown) => unknown
  /** REQUIRED — the resizability decision; `E3`'s `isResizable` (one closure, §2.1 item 3). */
  readonly resizableOf: (element: unknown, token: unknown) => unknown
  /** REQUIRED — THE ONE SINK (`E3`'s `commit` seam, one closure, §2.1 item 3). This unit NEVER calls
   *  it; `E3` is the single writer (`§0A` note 9). */
  readonly commit: (gesture: unknown, value: number) => void
  /** OPTIONAL — THE CAPTURE OPT-IN (`§0A` note 10). Truthy ⇒ the module passes `capture: true` to
   *  `controller.attach`; falsy or absent ⇒ NO `capture` field is passed at all. */
  readonly capturePointer?: boolean
  /** OPTIONAL — the caller's veto on a drag state (`§2.3` item 5). ONLY an exact `false` marks the
   *  drag INVALID; `true`, `undefined`, a non-boolean, an absent seam and a throw are NOT vetoes. */
  readonly isDragValid?: (state: PreviewState) => unknown
}

/** THE AFFORDANCE — FIVE MEMBERS, and this is the WHOLE surface. Every member is TOTAL: none throws
 *  for ANY argument, whatever the session, the callbacks or the events do (§3.2 F-6, P-GU-TP-1). */
export interface GutterAffordance {
  /** Attach ONE affordance: creates the session (`createGestureSession({source, commit})` with the
   *  module's OWN single writer, `§2.1` item 3), creates the controller, installs the module's four
   *  hooks, attaches the module's hover/context listeners through `source`, and returns `true` iff
   *  every delegation succeeded. A repeat `attach()` is a NO-OP returning `false` (§2.3 item 1). */
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
| **1** | **THE CENSUS.** The module exports **exactly four value names and exactly seven type names**, named above, and **nothing else**. | **`§3.4 R-1`**(a)/(b) |
| **2** | **THE THREE IMPORTS.** **Exactly three import statements**: a **value** import of `clampToBounds` from `./gutter.js`; a **type-only** import from `./gesture-session.js`; a **type-only** import from `./gutter.js`. Any other path, or a value import of either sibling, **FAILS**. | **`§3.4 R-8`** |
| **3** | **THE ONE-CLOSURE WIRING.** The five `E3` seams (`axisFor`, `boundsFor`, `defaultSizeFor`, `isResizable`, `commit`) are built from **the caller's own closures** (`axisOf` · `boundsOf` · `startSizeOf` · `resizableOf` · `commit`), **and each of them is called by the module EXACTLY ONCE per gesture at most** — the module does not wrap them in a counter, a cache or a second clamp. | **`§5.5.1 P-GU-IM-2`**, `§3.4 R-3` |
| **4** | **THE SESSION IS CREATED HERE, WITH THE MODULE'S OWN WRITER.** The module calls `createGestureSession({source, commit})` **exactly once per `attach()`**, where `commit` is the module's own single forwarding writer — **the ONLY `commit` the session is given**, which `E3`'s `commit` seam receives through `options.commit`. **A second `createGestureSession` call in `attach`'s path FAILS.** | **`§3.1 M-5`**, `§5.5.1 P-GU-SM-1` |
| **5** | **THIS MODULE'S COUNTERS ARE ITS OWN SURFACE, AND ARE NOT MCP-VISIBLE.** `stats()` returns the seven fields above; **no IPC method, no MCP tool, no `RpcCommand`, no `list_targets` handle, no store** — a later pass wiring them to an agent-reachable surface would be adding an MCP surface and would need its own gate. | **`§3.4 R-2`**, `§3.5 R-11` |
| **6** | **THE MODULE AUTHORS NO UI CONTENT — the exact negative token list.** The module's bytes (comments included, token-assembly joined) contain **`createElement`, `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `insertAdjacentText`, `textContent`, `innerText`, `className`, `classList`, `appendChild`, `insertBefore`, `removeChild`, `document.write` and every element-creation token** in **NO** form. **The three DOM-touching members it DOES contain are named and are the whole carve-out: `addEventListener` · `removeEventListener` · `setPointerCapture`** (and `removeEventListener`'s counterpart for capture, `releasePointerCapture`, **MUST NOT appear** — this unit never releases). | **`§3.4 R-1`**, `§2.2` P-1 |
| **7** | **THE AUTHORING SITE — the demo envelope's gutter card, authored as DATA.** `src/shared/demo-envelope.ts` gains **one authored `<section>` card** containing, **as provident envelope data**: **(a)** the **affordance node** — a `div` with an authored `css.id`, an authored `css.classes` list, an authored `css.style` carrying the base `cursor` declaration and no geometry claim, an authored `props.id`, and **at least one authored handler** whose `event` is `'pointerdown'` (so the affordance is **`list_targets`-visible and `provident.dispatch`-reachable**, `§3.5 R-9`); **(b)** the **target node** — a `div` with an authored `css.id`, an authored `css.style` carrying a **base size declarative**, and an authored `props.id`; **(c)** a **status node** — a `div` with an authored `css.id`, an authored `props.id` and authored **placeholder `content`**, whose `content` the authored handler body writes so a committed value is **readable through `provident.get_rendered_html` / `get_markdown`**. **Handler bodies are function-STRING data in the modern `(ctx, value)` convention** (`docs/decisions.md` `DEMO-HANDLER-CONVENTION`, cited by NAME) and follow the envelope's existing `ctx.tree.allNodes()` + `props.id` scan + `clientAPI.apply` shape (`src/shared/demo-envelope.ts`'s landed bodies). **NO element is created outside the envelope, and no renderer file changes.** | **`§3.4 R-1`/`R-2`**, `§3.5 R-9` |

---

### 2.2 What is CALLER-SUPPLIED, and the prohibitions — **every prohibition cites an ENUMERATED row**

**Caller-supplied (never built in, never defaulted, never enumerated):** the **session**; the **event
source**; the **affordance element**; the **target element**; **every mapping** (`sizeFromPointer`,
`axisOf`, `cursorOf`); **every presentation write** (`applyPreview`, `applyCursor`); **every value source**
(`startSizeOf`, `boundsOf`, `resizableOf`); **the one sink** (`commit`); the **capture opt-in**; and the
**validity veto** (`isDragValid`). **The module contains NO axis vocabulary, NO cursor literal, NO unit
string, NO default size, NO default bound, NO threshold, NO selector, NO store, NO census read and NO
policy predicate.**

| # | Prohibition | How THIS unit satisfies it | Pinned by |
| --- | --- | --- | --- |
| **P-1** | **No UI content authored by the module** (the project-wide constraint) | **The module authors no element, no text, no class taxonomy, no styling rule and no handler body** — the authored card is **data** in `src/shared/demo-envelope.ts` (`§2.1` item 7), and the module's own content tokens are **zero** (the nine-token negative list of `§2.1` item 6). | **`R-1`**, `§2.1` items 6/7 |
| **P-2** | **No document-delegated listener and no global element lookup** (`A-d3`) | **No listener is ever attached to `document`, `window` or any ancestor**: `domEventSource()` attaches to **the element it is given** and to **nothing else**; the module contains **no `closest`/`querySelector*`/`getElementById`** and **never obtains an element except as an argument**. **The module's ONLY DOM-API members are named** (`§2.1` item 6). | **`R-6`**, `§2.1` item 9, `§3.5 R-12` |
| **P-3** | **No second gesture authority, and no second writer** | The module **calls no session terminal itself** (`begin`/`end`/`cancel` appear in **no** call of its bytes: `§3.4 R-5`), **holds the session's ONE `commit`** and **calls no `commit` of its own** (`§0A` note 9), and **owns no listener window, no disposal order and no "one gesture at a time" guard**. | **`R-4`**, **`R-5`**, `I-1`/`I-2`, `§5.5.1 P-GU-SM-1` |
| **P-4** | **No policy of its own** | No default bound, no default size, no axis token literal, no cursor literal, no unit string, no threshold, **no `data-*` name of its own**. The two strings the module owns are its **`PreviewState` field names** and **its own cursor-less sentinel `'undefined'` reading** (a return, never a wire value). | **`R-7`**, `§2.4` item 2, `§0A` notes 4/8 |
| **P-5** | **No store, no persistence, no cache, no module-level state** | No file, no `localStorage`, no store object, no memo, **no `Map`/`WeakMap` keyed by element**, **no module-level mutable state**. The instance keeps **one per-gesture record** (pre-drag size, token, handle) **discarded in a `finally` at every terminal** (`§0A` note 5) and **its own counters**. | **`R-7`**, `I-3` |
| **P-6** | **No capture before establishment, and no release** | The module **passes `capture: true` to `attach` iff the caller opted in**, **never calls a capture method from its own bytes**, and **never calls `releasePointerCapture`** — the session's own `begin`-internal call is the only capture call, and **no release clause exists in the frozen session** (`docs/specs/gsession.md` `§2.3` item 6(c), its PARKED note). | **`R-6`**, `I-4`, `§0A` note 10 |
| **P-7** | **No new MCP surface, no IPC, no preload, no config** | No tool, no resource, no group, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, **no `package.json` / `scripts/**` / `tsconfig.json` / `vitest.config.*` change** (`§5.1`'s DENIED set). | **`R-9`**, `§5.1` |
| **P-8** | **No re-expression of `E3` or the session** | The module **composes**: it calls `E3`'s factory and the session's factory, installs four hooks, and **implements no clamp of its own** (it calls the exported `clampToBounds`), **no code domain of its own**, and **no terminal of its own**. | **`R-3`**, **`R-4`**, `§2.6` items 1/2 |
| **P-9** | **No rendered-fact claim from the node suite** | **A `[T]` row may not assert a rendered geometry, an applied style on a real element, a cursor's effect, a layout, or a real pointer** — those are `[U]` claims (`§5.2`). | **`R-10`**, `§5.3` item 6, `§4.4 S-7` |

**The static rows `§2.2` cites are ENUMERATED, not asserted** (`§3.4 R-1`..`R-12`): **a prohibition
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
| **1** | — | `createGutterAffordance(options)` | builds the session and the controller, installs **no** listener | no element lookup, no listener before `attach` | `createGestureSession` once; `createResizeController` once | `M-6` |
| **2** | `idle` | `attach()` | **`createGestureSession({source, commit})`** (the module's own writer), **`createResizeController({session, axisFor, boundsFor, defaultSizeFor, isResizable, commit})**, **`source.on(element, 'pointerover', …)`** and **`source.on(element, 'pointerout', …)`** and **`source.on(element, 'pointerdown', …)`**, then **`controller.attach(element, {onStart, onMove, onEnd, onCancel, capture?})`** | **no** `document`-delegated listener, **no** capture call of its own, **no** `element` lookup | `session.install` (via `E3`) exactly once per distinct element; `source.on` × `3` | `M-6`, `M-7` |
| **3** | `idle`/`hover` | a repeat `attach()` | returns **`false`**, delegates **nothing** | no second session, no second install, no listener churn | **ZERO** | `M-7` |
| **4** | `hover` | the `'pointerover'` handler runs | **`token = axisOf(element)`**, **`declaration = cursorDeclarationFor(cursorOf(token))`**, **`applyCursor(target, declaration)`** | **no** session call, **no** controller call, **no** preview call, no record | **ZERO session calls** | `M-10`, `P-GU-SM-3` |
| **5** | `hover` | the `'pointerout'` handler runs | **`applyCursor(target, undefined)`** **iff a declaration was written for this hover** | **no** session/controller call, **no** preview call | **ZERO session calls** | `M-11` |
| **6** | `hover`/`pressed` | the `'pointerdown'` handler runs **with a SECONDARY button** (`button === 2`, read through a `typeof` gate) while **no gesture is active** | **NOTHING**: it does not begin a gesture, does not swallow, does not call the session | **no** session terminal, **no** `session.begin` | **ZERO** | `M-14`, `F-7` |
| **7** | `hover` | the `'pointerdown'` handler runs with a **PRIMARY** button and the session establishes (its own start listener fires) | **`onStart(element)` runs**: `token = axisOf(element)`, `preDragSize = startSizeOf(element, token)` stored in the record | **no** sink write, **no** `commit` call, **no** preview call | `E3`'s own `session.install` was already made at `attach` | `M-8` |
| **8** | `dragging` | a `'pointermove'` the session forwards to the module's `onMove(gesture)` wrapper | **captures the handle** (the ONLY legal channel, `E3`'s ruling `5`), then **`pointer = resolveEventPointer(event)`** — **but the frozen session passes NO event to `onMove`**, so the module reads the pointer from **its OWN move listener** (`§2.4` item 1), correlates it by the active record, and then: `raw = sizeFromPointer(pointer, preDragSize)` ⇒ `value = clampToBounds(raw, boundsOf(element, token))` ⇒ **`valid = isFinite(value) && validByVeto`** ⇒ **`applyPreview({value, token, valid, resizable})`** | **no** sink write; **no** graph dispatch; **no** second coordinate read | **ZERO session calls** | `M-12`, `M-13`, `F-1` |
| **9** | `dragging` | **the drag state became INVALID** by `§2.3` item 5 (the observed move was invalid **or** a prior move was) **and a `pointermove` turn is running** | **`controller.reset(element)`** — the module's ONE session-touching call on this path — and **does NOT preview the invalid value** | **no** `session.begin`/`end`/`cancel`, **no** second `reset` for the same gesture | `session.reset` (via `E3`) **exactly once** | `M-13`, `F-2` |
| **10** | `dragging` | the `'pointermove'`/`'pointerup'` handler runs **with a SECONDARY button** (the right-click / drop path) | **the session's own `cancel` terminal is what terminates the gesture** (the module does not call it); the module **reverts the preview through `applyPreview({value: preDragSize, …})`** in its terminal hook | **no** `session.cancel` call, **no** `controller.reset` on this path, **no** sink write | `E3` writes NOTHING (`cancel` ⇒ zero commits) | `M-9`, `F-3` |
| **11** | `dragging` | the session's `end` terminal (its own `pointerup` listener) with a VALID state | the module's `onEnd` runs; the module **writes no preview**; **`E3` writes the sink EXACTLY ONCE**; the record is discarded in a `finally` | **no** module-side sink call, **no** `session.reset` | `E3`'s one sink write; **ZERO module session calls** | `M-8`, `M-12`, `P-GU-SM-1` |
| **12** | `pressed`/`dragging` | the session's `cancel` terminal arrived without the module's drop path (a `pointercancel`, a `dispose()` mid-gesture) | the module's `onCancel` runs; **`applyPreview({value: preDragSize, …})`**; the record is discarded in a `finally` | **no** sink write, **no** session call | **ZERO** | `M-9` |
| **13** | any | `detach()` | **`source.off` × 3** for the module's own listeners, then **`controller.detach()`** | no double-detach, no session call of its own | `session.dispose` (via `E3`) exactly once when it delegates | `M-15` |
| **14** | any | the session reads `disposed === true` | **every member short-circuits**: `attach()` ⇒ `false`, `detach()` ⇒ `false`, **no session call of any kind** | no delegation to a disposed session | **ZERO** | **`M-4`** |

**THE VALIDITY RULE, stated exactly (`§0A` note 6): a DRAG STATE observed on a pointer move is VALID iff
ALL of the following hold — (i) `resolveEventPointer` answered a `PointerPosition`; (ii)
`sizeFromPointer(pointer, start)` answered a value; (iii) `clampToBounds`'s answer for that value over
`boundsOf(element, token)` is a **finite number** (`Number.isFinite`); and (iv) the caller's
`isDragValid` did **not** answer an exactly-`false` veto. In EVERY other case — a null pointer, a
non-finite clamp answer, a `NaN`, an `Infinity`, or an exact `false` veto — the drag state is INVALID,
and INVALID IS STICKY FOR THAT GESTURE: once any observed move of a gesture is invalid, the gesture's
release is invalid, and no later valid move un-invalidates it.** **The sticky half is a working default
(`§7a.1` item 2); a later pass that wants "the last observed move decides" must open a gate.**

**THE TERMINAL WRITE TABLE — the numbers every write-count row asserts (rows `M-8`/`M-9`,
`P-GU-SM-1`):**

| The terminal | `applyPreview` writes | sink writes (by `E3`) | module session calls | `E3`'s `reset` |
| --- | --- | --- | --- | --- |
| **`end` of a VALID drag** | **`0`** (the graph commit is the visible change) | **exactly `1`** | **`0`** | `0` |
| **`reset` of an INVALID drag** (usable default + resizable) | **`0`** | **exactly `1`** (the clamped pre-drag size) | **`1`** (`controller.reset(element)`) | `1` |
| **`reset` refused** (`'not-resizable'` / `'unusable-default'`) | **`0`** | **`0`** | **`1`** (the refusal path still made the call) | `1` |
| **`cancel`** (a `pointercancel`, a `dispose()` mid-gesture) | **`1`** (the revert to the pre-drag size) | **exactly `0`** | **`0`** | `0` |
| **the DROP path** (right-click) | **`1`** (the revert) | **exactly `0`** | **`0`** | `0` |

**A gesture NEVER produces more than one sink write and more than one preview write per observed move: a
state that violates either FAILS the rows above.**

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
   the module's OWN move listener  ──▶  resolveEventPointer(event)        (THE ONLY COORDINATE READ)
                                          │  null ⇒ the move is INVALID (§2.3 item 5) and NO preview is written
                                          ▼  a PointerPosition
   pointer + preDragSize  ──▶  sizeFromPointer(pointer, start)           (THE CALLER'S MAPPING)
                                          ▼  raw
   raw + boundsOf(element, token)  ──▶  clampToBounds(raw, bounds)        (E3's EXPORTED PURE FUNCTION)
                                          ▼  value (a number; `NaN` ⇒ the move is INVALID)
   applyPreview({ value, token, valid, resizable })                      (THE PREVIEW CHANNEL, §2.5)
                                          … the session's terminal …
   E3's sink callback: one `commit(gesture, clamped)` iff the terminal is an `end`/`reset`
   ```

   **The chain has THREE falsifiable clauses, and each is a row: (i)** the coordinate is read **once per
   observed move**; **(ii)** `sizeFromPointer` is called **at most once per observed move** and **never at
   a terminal**; **(iii)** **the clamp happens at exactly ONE site in the family** — `E3`'s
   `clampToBounds`, called by this module for the preview and by `E3` at the terminal — and **a SECOND
   clamp implemented in this module is `§4.4 S-5` and does not land**
   (`docs/specs/gutter.md` `§4.4 S-PURE-4`).
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
   when the move is VALID** for the value; on the **cancel**, **drop** and **refused-reset** paths it is
   invoked **exactly once with `{value: preDragSize, token, valid: false, resizable}`** (the revert); on
   the **`end`** and **`reset`** paths it is **NOT invoked**. **`stats().previews` counts the
   invocations, and `§2.3`'s terminal write table is the declared multiset.**
4. **THE PREVIEW'S CONCRETE FORM IS THE CALLER'S, AND THE WORKING DEFAULT IS A TRANSIENT INLINE-STYLE
   WRITE.** In this repo the caller applies it by writing a **`style` declaration on the live
   provident-rendered target element** — available because the envelope's authored `css.style` is
   serialized at translate (`serializeStyle`) and applied by the `DomAdapter` as an inline style, so a
   transient style write **does not create an element and does not author any provident data**.
5. **THE NAMED HAZARD, RECORDED SO A LATER PASS DOES NOT "IMPROVE" INTO IT.** A preview implemented as a
   **graph dispatch** re-renders the graph, and **the re-render replaces the element under the pointer
   mid-gesture** — the listener the session installed is on the OLD element. **That is why the default is
   the transient write, and why a preview-by-dispatch requires its own gate** (`§7a.1` item 3, `§4.4
   S-8`).
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
   declaration)`**; **the clear is `applyCursor(element, undefined)`** and it happens **on hover exit and
   nowhere else**. **The HOVER EVALUATION BUDGET is a working default (`§7a.1` item 1): `axisOf` once per
   `'pointerover'`, `cursorOf` once per hover evaluation, `applyCursor` once per hover enter with a
   declaration and once per hover exit with `undefined` — and ZERO calls to `E3`'s controller on any hover
   path.** **The DEMO's mapping is caller code in `src/shared/demo-envelope.ts`'s authored card** — the
   module's bytes carry **no cursor literal** (`§2.2` P-4, `§3.4 R-7`).
4. **THE CAPTURE DECISION, AND THE UI'S INSTALL PATH.** **THIS unit owns the capture decision; `E3` never
   opts in** (`docs/specs/gutter.md` `§0A` note 7, its `R-10`). **The install path is this unit's:** the
   options object handed to `controller.attach(element, hooks)` carries **`capture: true` iff the caller's
   `capturePointer` is truthy**, and **no `capture` field at all** otherwise (absent, not `false`); the
   **source** this unit supplies implements `capturePointer(element)` **only** when the element has that
   member, and **is otherwise the declared degradation** (no call, no throw, the gesture proceeds —
   `docs/decisions.md` `GSESSION-CAPTURE-CAPABILITY-IS-SOURCE-SUPPLIED-AND-OPTIONAL`,
   `docs/specs/gsession.md` `§2.3` item 6(a)). **The module's own bytes contain NO capture call.**
5. **THE RELEASE MAPPING, composed from `E3`'s own clause rather than restated**
   (`docs/specs/gutter.md` `§2.3` item 4's release-mapping block): **VALID ⇒ the session's `end`
   terminal ⇒ EXACTLY ONE commit of the CLAMPED DRAGGED VALUE · INVALID ⇒ the session's `reset` terminal
   with the SUPPLIED DEFAULT, which for this behaviour is THE PRE-DRAG SIZE THE CONSUMER HOLDS ⇒ EXACTLY
   ONE commit of the CLAMPED SUPPLIED DEFAULT · RIGHT-CLICK / DROP ⇒ the session's `cancel` terminal ⇒
   ZERO COMMITS AND ZERO SINK WRITES, with the visible revert belonging to the CONSUMER's preview channel
   and NOT to the sink.** **`gesture.outcome` (`'end'` / `'reset'` / a cancel's no-commit) is how the
   distinction is read, and `controller.reset(element)` is the surface for the invalid-release and
   drop-revert paths.** **THIS UNIT ADDS EXACTLY ONE THING AND IT IS THE `§0A` note 6 TIMING CLAUSE: the
   invalid arm's `controller.reset(element)` is called from the DRAG while the gesture is still active,
   because after the session's own `pointerup` terminal there is no active handle to reset.**
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
| **M-1** | **THE CLOSED SESSION READ SET — this unit reads NO session member at all, and `E3`'s set is the six named members with NO invented seventh** | a static census over `src/shared/gutter-affordance.ts` and `src/shared/gutter.ts`; **plus** a runtime drive with a **session double that EXPOSES `registerCompositionWriter` and `registerCommit`** and records every member read | **(i)** this module's own source references **no** session member by name (`install`/`reset`/`dispose`/`stats`/`gesture`/`disposed` appear **zero** times in it — it reaches them only through `E3`); **(ii)** `src/shared/gutter.ts` contains **neither** `registerCompositionWriter` **nor** `registerCommit` in **any** form (raw, assembled, commented); **(iii)** the session double's exposure of those two names **changes nothing**: **ONE sink call for one gesture**, and the committed value is the **CLAMPED** one (a fallback committing the RAW default FAILS this row). **A session exposing either name and yielding TWO sink calls for one gesture FAILS.** *(This is `E3`-HOST-2's remedy row, driven from a real consumer.)* | **`docs/pending.md` §I-sexies `E3`-HOST-2 / §I-septies item 1**, `docs/specs/gutter.md` `§2.5` item 1, `§3.4 R-5` | `static` + `[T]` |
| **M-2** | **THE DISPOSED-SESSION SHORT-CIRCUIT** | build the affordance over a **disposed** session (or dispose it, then call every member) | **`attach()` ⇒ `false` with ZERO session calls**; **`detach()` ⇒ `false` with ZERO session calls**; **`detached` reads `true`**; `stats()` readable with zeroed gesture counters; **NO throw at any boundary** — the module honours `session.disposed === true` rather than delegating to a dead session. *(This is `E3`-HOST-3's remedy row: `detached` must reflect the session's own disposal.)* | **`docs/pending.md` §I-sexies `E3`-HOST-3**, `docs/specs/gsession.md` `§2.3` item 7 (permanently inert), `§3.4 R-5` | `[T]` |
| **M-3** | **THE THROWING-HOOK DISCARD — a consumer hook that THROWS leaves NO retained record, and a later reset makes ZERO session calls** | `attach()`; establish; make the **caller's `applyPreview` THROW** on one observed move; catch the propagated throw; then call the module's own reset entry point / drive a `reset` on the dropped handle | the throw **PROPAGATES** (it is consumer code) **and the per-gesture record is ALREADY DISCARDED in the module's `finally`**; a subsequent `reset(element)` for that gesture **refuses with ZERO session calls** (`'no-gesture'`-class), **and the module's own `resets` counter did not increment**. **A retained record is the `E3`-HOST-1 defect and FAILS this row.** *(This is `E3`-HOST-1's remedy row, driven by this unit's own consumer hook.)* | **`docs/pending.md` §I-sexies `E3`-HOST-1 / §I-septies item 1**, `§0A` note 5, `docs/specs/gutter.md` `§2.5` item 6 | `[T]` |
| **M-4** | **`attach()` installs THREE listeners through the source, and the session owns the fourth** | a recording source double; `attach()` | **exactly THREE `source.on` calls for this module's own listeners** — the hover enter, the hover exit and the context-button read — each carrying **the affordance element by identity**, plus **the session's own single `'pointerdown'` attach** (made through the same source by `E3`'s `attach`): so the source's log shows **FOUR `on` calls**, **three of them this module's**; **the module's three carry NO `document` and no element other than the affordance**; `attach()` returns `true`; **no capture call** unless opted in | `§2.3` row 2, `§2.2` P-2, `docs/specs/gsession.md` `§2.3` item 1(a) | `[T]` |
| **M-5** | **THE SINGLE WRITER, ON THE REAL COMPOSITION — exactly ONE sink call per gesture, and a SECOND WRITER FAILS a row** | `attach()`; a full observed lifecycle (hover ⇒ primary `pointerdown` ⇒ moves ⇒ `pointerup`); then the same drive against a **two-writer composition** (a harness-registered forwarding channel in addition to the composition's writer) | **single writer:** the sink's own call record reads **`1`** for the gesture and the `E3` controller's `stats().sinkCalls` reads **`1`** — **the two readings AGREE**; **two writers:** the sink record reads **`2`** while the controller's counter still reads **`1`** — **THE DIVERGENCE IS THE FALSIFIER**, and the row is written to fail for it (**the exact multiset of sink calls is asserted, never "at least one"**). **The module itself made NO sink call in either drive** (`§2.1` item 3's `commit` seam is passed to `E3` only). | **`docs/specs/gutter.md` `§2.3` item 3, its `F-9`/`F-10`, `§5.5.1 P-GT-SM-3`**, `§5.5.1 P-GU-SM-1`, `§0A` note 9 | `[T]` |
| **M-6** | **The factory is TOTAL, and it builds the session and the controller exactly once** | `createGutterAffordance()` with **no argument**; with `undefined`; with `42`; with `'x'`; with a `Proxy` whose traps throw; with a record whose accessors throw; with a full valid options object | **NEVER throws**; every case returns an object whose **five members are present and callable**; for the valid case the **session factory and the controller factory were each called exactly once**, and **no listener was attached** before `attach()` | `§2.1` item 3, `§3.2 F-6`, `§5.5.1 P-GU-TP-1` | `[T]` |
| **M-7** | **`attach()` delegates once; a repeat attach delegates NOTHING** | `attach()` then `attach()` again | first ⇒ `true`; second ⇒ **`false`** with **ZERO further `source.on` calls and ZERO session calls**; **the first configuration stays in force** | `§2.3` row 3 | `[T]` |
| **M-8** | **A VALID drag commits the CLAMPED value EXACTLY ONCE, through `E3`, and writes NO preview at the terminal** | hover; primary `pointerdown` (the session establishes); one observed move whose `sizeFromPointer`/`boundsOf` yield a value **outside** the pair; then the session's own `pointerup` | `stats().moves === 1`; `stats().previews === 1` (the mid-drag observation); **`applyPreview` was NOT invoked again at the terminal**; **the sink received the CLAMPED value exactly once** (`E3`'s writer); `controller.stats().sinkCalls === 1`; `controller.stats().written === 1` | `§2.3` items 8/11, `§2.5` item 3, `docs/specs/gutter.md` `§2.3` item 3 | `[T]` |
| **M-9** | **A RIGHT-CLICK DROP commits NOTHING and reverts through the PREVIEW** | establish; one observed move; then a **secondary-button press** observed during the drag | the sink's own call record reads **`0`**; `controller.stats().sinkCalls === 0`; **`applyPreview` was invoked exactly ONCE MORE with `value === the pre-drag size` and `valid === false`** (the revert); `stats().drops === 1`; the session's terminal result reads `committed: false`; **the module called NO session terminal and NO `controller.reset`** (`stats().resets === 0`) | `§2.3` item 10, `§2.5` item 3, `§2.6` item 6 | `[T]` |
| **M-10** | **The HOVER path writes the cursor ONCE with the resolved declaration and makes ZERO session/controller calls** | `attach()`; the source's `'pointerover'` handler fires | **`axisOf` was called exactly once**, **`cursorOf` exactly once**, **`applyCursor` exactly once with the resolved declaration**; `stats().cursorWrites === 1`; `stats().lastCursor` equals the declaration; **ZERO session calls and ZERO controller calls** (`E3`'s `axisFor` is **not** consulted on this path — the hover read is the module's own, `§7a.1` item 1) | `§2.6` item 3, `§2.3` row 4 | `[T]` |
| **M-11** | **The hover EXIT clears the cursor, and a no-declaration hover writes NOTHING** | `'pointerover'` then `'pointerout'`; then a second pair whose `cursorOf` answers `{}` | first pair: **one `applyCursor(target, declaration)` then one `applyCursor(target, undefined)`**; second pair: **`applyCursor` is called with `undefined` for the clear, while the ENTER wrote nothing** (`stats().cursorWrites` did **not** increase); **ZERO session/controller calls in all four turns** | `§2.6` item 3, `§5.5.1 P-GU-TP-2` | `[T]` |
| **M-12** | **The VALUE is derived from the pointer, and the derivation is the declared chain** | establish with a known pre-drag size; one observed move carrying a **plain event double** with `clientX`/`clientY`; `sizeFromPointer` and `boundsOf` recording their arguments | `resolveEventPointer`'s reading reached `sizeFromPointer` as **a frozen `{x, y}` carrying no event reference**; `sizeFromPointer` was called **exactly once, with `(pointer, preDragSize)`**; `clampToBounds`'s answer (`E3`'s exported function) is **the value the sink committed** at the terminal; `applyPreview` received **that same clamped value**; **`stats().moves === 1`** | `§2.4` items 1/2, `docs/specs/gutter.md` `§2.1` item 1 | `[T]` |
| **M-13** | **AN INVALID DRAG RESETS TO THE PRE-DRAG SIZE, and the reset is called from the DRAG while the gesture is active** | establish; then one observed move whose `boundsOf` yields an **unusable pair** (so the clamp answers `NaN`); while the gesture is still active | **`controller.reset(element)` was called exactly once** (`stats().resets === 1`); it was called **during the drag turn** (the session's gesture was still active at the call — asserted on the session double's own call log); the committed value is the **CLAMPED PRE-DRAG SIZE**; **`applyPreview` did NOT receive the `NaN`**; the sink received **exactly one** value | `§2.3` item 9, `§0A` note 6, `docs/specs/gutter.md` `§2.3` item 4 | `[T]` |
| **M-14** | **A secondary-button `pointerdown` with NO active gesture is INERT** | `attach()`; no gesture; the module's own `'pointerdown'` handler fires with `button === 2` | **ZERO session calls, ZERO controller calls, ZERO preview writes, ZERO cursor writes**; the module does not `preventDefault`, does not swallow and does not begin anything; a later primary `pointerdown` establishes normally | `§2.3` row 6, `§2.2` P-3 | `[T]` |
| **M-15** | **`detach()` removes the module's OWN listeners and then delegates once** | `attach()`; `detach()`; `detach()` again | first call: **exactly THREE `source.off` calls** (the module's own three, each matching its `on` by the same three values) **before** the controller's own delegation; `detach()` returns `true`; **`detached` reads `true`**; second call: **`false` with ZERO source calls and ZERO session calls**; **the session's own baseline arithmetic is the session's row, not re-asserted here** | `§2.3` row 13, `docs/specs/gsession.md` `§2.3` item 7 | `[T]` |
| **M-16** | **A non-resizable gesture still establishes, still shows the cursor, and previews NOTHING** | `resizableOf` answering a falsy value; hover; primary `pointerdown`; an observed move; `pointerup` | the gesture **ESTABLISHES and TERMINATES NORMALLY** (its outcome is **not** `'cancel'`); **`applyPreview` is invoked ZERO times**; the sink's record reads **`0`**; **the hover cursor was still written** | `§2.4` item 4, `docs/specs/gutter.md` `§0A` note 6, `§3.1 M-8` | `[T]` |
| **M-17** | **The counters are this module's own and reconcile with the instruments** | after `M-8`, `M-13`, `M-9` | `stats()` reports the declared figures for `moves`/`previews`/`cursorWrites`/`cursorClears`/`resets`/`drops`/`lastCursor`, **each reconciled against the recording source's log, the sink's own record and `controller.stats()`** | `§2.1` item 5, `§2.3`'s write table | `[T]` |

### 3.2 Documented fail-states / non-happy states

| id | Fail-state | Trigger (exact) | Required behaviour | Pinned by | Layer |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **An UNRESOLVABLE pointer on a move** | one observed move whose event is `null`, `42`, a `Proxy` whose traps throw, or an object with a non-finite `clientX` | `resolveEventPointer` answers `null`; **the move is INVALID and `applyPreview` is NOT invoked for it**; `stats().moves` **did** increment; the gesture stays active; **nothing is committed by this turn** | `§2.4` item 1, `§2.3` item 5 | `[T]` |
| **F-2** | **A THROWING `sizeFromPointer`** | `sizeFromPointer` throws on one observed move | **the throw PROPAGATES to the caller of the module's listener turn** (`E3`'s named behaviour for a consumer seam at a terminal, `docs/specs/gutter.md` `§2.4` item 2 row 4); **the record is discarded in the `finally`**; **NO preview write and NO sink write for that turn**; a later drive finds **no active gesture of this module's** and the module makes **ZERO session calls** for it | `§0A` note 5, `docs/specs/gutter.md` `§2.4` item 2, `§3.1 M-3` | `[T]` |
| **F-3** | **A `dispose()` (or a `pointercancel`) MID-GESTURE** | establish; observed move; then the session's `cancel` terminal via `pointercancel`, and separately via a mid-gesture `dispose()` | the module's `onCancel` runs **exactly once**: **`applyPreview` invoked exactly once with the pre-drag size**; **the sink's record reads `0`**; `stats().drops` **did not increment** (this is the cancel path, not the drop path); the record is discarded | `§2.3` item 12, `§2.5` item 3 | `[T]` |
| **F-4** | **A reset for a gesture whose record is GONE** | drive a `reset` after a terminal (`M-3`'s shape, without the throw) | the call **refuses with ZERO session calls** (the `E3` entry point's own refusal) and **the module's own `resets` counter does not move**; **no half-termination of anything** | `§3.1 M-3`, `docs/specs/gutter.md` `§2.5` item 5 clause 3 | `[T]` |
| **F-5** | **THE `E3` PARKED DEFECT, REPORTED RATHER THAN FIXED HERE — the row that FAILS on the current `E3` module is EVIDENCE, not a defect of this unit** | drive `M-1`/`M-2`/`M-3` against the **landed** `src/shared/gutter.ts` | **if a row FAILS, the finding is a HOST finding against `E3`** and **must be reported to the supervisor** with the failing row id and the measured call counts; **this unit may NOT edit `E3`'s module or its test file** (`§5.1`'s DENIED set); **a pass that "fixes" it there fails this row** | **`docs/pending.md` §I-septies items 1/3**, `§0A` note 12, `§5.1` | `[T]` + the DONE row |
| **F-6** | **A HOSTILE or unusable options object** | `createGutterAffordance(undefined)`, `(42)`, `('x')`, a `Proxy` whose traps throw, a record with throwing accessors, `{session: undefined}` | **construction NEVER throws**; every member of the result is present and callable; `attach()` ⇒ `false` **with ZERO session calls** (the `E3` declared degradation, a VALID but INERT controller); `detach()` ⇒ `false`; `stats()` is readable and zeroed | `§2.1` item 5, `§3.1 M-6`, `docs/specs/gutter.md` `§0A` note 9 | `[T]` |
| **F-7** | **A secondary-button press on an UNSETTLED gesture** | the module's `'pointerdown'` handler fires with `button === 2` in the window between the primary press and the session's establishment | **NOTHING is dropped on a gesture that does not exist**: no session call, no preview write, no counter move beyond the observed-turn counters; **the subsequent establishment proceeds normally** | `§2.3` items 6/14 | `[T]` |
| **F-8** | **A THROWING `applyCursor`, `applyPreview` or `isDragValid`** | each of the three throws in turn | **the throw PROPAGATES** (consumer code) and **the module's own state stays consistent**: the record is discarded in the `finally` (`applyPreview`'s case), the counters that were incremented before the throw stay incremented, and **no second invocation of anything happens for that turn**; **no session call of the module's own is made in any of the three cases** | `§0A` note 5, `§3.1 M-3` | `[T]` |
| **F-9** | **`isDragValid` answering anything that is NOT exactly `false`** | `isDragValid` driven as `() => true`, `() => undefined`, `() => 0`, `() => ''`, `() => 1`, an absent seam, a non-callable value, and a throwing one | **none of them vetoes the drag**: a finite clamped value with a non-`false` veto is **VALID** and commits at the `end` terminal; **ONLY an exact `false` marks the drag INVALID** | `§2.3` item 5, `§2.1` item 3 | `[T]` |
| **F-10** | **A non-finite clamp answer of ANY origin** | `sizeFromPointer` answering `NaN`, `Infinity`, `-Infinity`, `'12'`, `null`, `true`, an object, or the bounds pair being unusable | **the drag state is INVALID in every case** (the clamp's answer is not finite); the invalid arm is taken **once** (`stats().resets === 1`); **no preview of a non-finite value is ever written**; the committed value is the clamped pre-drag size | `§2.3` item 5, `§2.4` item 2, `docs/specs/gutter.md` `§2.3` item 2 | `[T]` |
| **F-11** | **`capturePointer` opted in on a source WITHOUT the member** | `capturePointer: true` with a source whose surface has **no** `capturePointer` | **ZERO capture calls and NO throw**: the gesture **establishes and terminates normally** — the session's own declared degradation; **the module's own bytes contain no capture call in either case** | `§2.6` item 4, `docs/specs/gsession.md` `§2.3` item 6(a), `M-8b` thereof | `[T]` |
| **F-12** | **The affordance element is `null`/`undefined`/a non-object** | `element: null`; `target: null`; both | **construction does not throw, `attach()` ⇒ `false` with ZERO session calls**; **no listener is attached to anything**; **no global lookup is attempted**; `stats()` is readable | `§2.2` P-2, `§2.3` row 2, `docs/specs/gutter.md` `§2.1` item 4 | `[T]` |
| **F-13** | **A row asserting a rendered fact on `[T]` is REFUSED, not satisfied** | any proposed `§3` row asserting a geometry, an applied style on a real element, a cursor's visual effect or a real pointer | **the row does not land**: those are `[U]` claims (`§5.2` legs 5/6). **The refusal is three-part:** (i) the node suite runs under the shim, whose elements have **no layout** and whose `style` is a recording object; (ii) **a rendered fact needs a real window**, and this unit has one — the `ui` leg — so the refusal is **not** an excuse about leg availability; (iii) `docs/specs/zones.md` `§4.4 S-6`'s sentence: *"the row **may not be moved to the `ui` leg silently**"* — **a rendered row belongs in `§5.2`'s `[U]` set BY NAME, at filing time.** | `§5.2`, `§4.4 S-7`, `§2.2` P-9 | `static` |

### 3.3 Invariants that hold in every state

| id | Invariant | Why it is here | Pinned by |
| --- | --- | --- | --- |
| **I-1** | **ONE WRITER, ONE CALL SITE: for every gesture in every state, the sink is written AT MOST ONCE, and this module writes to it ZERO times.** The module passes the caller's `commit` into `E3`'s factory and never invokes it. | the `E3` `C1` discipline composed (`docs/specs/gutter.md` `§2.3` item 3) | `M-5`, `§5.5.1 P-GU-SM-1` |
| **I-2** | **ONE COORDINATE READ: `resolveEventPointer` is the family's only coordinate read, and it is called at most once per observed pointer move.** | ruling 2's scope split | `§3.4 R-3`, `P-GU-IM-1` |
| **I-3** | **NO RETENTION ACROSS A TERMINAL: the per-gesture record (pre-drag size, token, handle) is discarded in a `finally` at EVERY terminal, and no element-keyed value, cache or memo exists.** | `E3`-HOST-1's class closed at this unit's own record | `M-3`, `F-2`/`F-8`, `§2.2` P-5 |
| **I-4** | **NO CAPTURE BEFORE ESTABLISHMENT AND NO RELEASE EVER: the module contains no capture call and no release token; the capture call is the session's own, inside `begin`, after establishment, and only for an opted-in control.** | `A-d3`'s binding reading + the session's PARKED note | `F-11`, `§3.4 R-6`, `§0A` note 10 |
| **I-5** | **THE PREVIEW IS A PRESENTATION CHANNEL: it is never the sink, never persistent, never MCP-visible, and it is written at most once per observed move.** | `E3`'s preview rule composed | `M-8`/`M-9`, `§5.5.1 P-GU-SM-2` |
| **I-6** | **ELEMENT IDENTITY IS BY REFERENCE: the affordance and the target are the objects the caller handed, never derived from a string, never re-resolved.** | `A-d3`'s no-lookup rule | `§3.4 R-6`, `M-4` |
| **I-7** | **TOTALITY AT THE BOUNDARY: `createGutterAffordance` never throws for ANY argument, and `cursorDeclarationFor`/`sizeFromPointer`/`domEventSource` never throw for ANY input.** | the `E3` totality standard applied to this unit's own surface | `F-6`, `§5.5.1 P-GU-TP-1` |
| **I-8** | **NO SECOND GESTURE AUTHORITY: the module calls no session terminal, owns no gesture state machine and no "one gesture at a time" guard, and attaches no listener outside the affordance element.** | `V-13`'s remedy, composed | `§3.4 R-4`, `§3.4 R-5` |
| **I-9** | **NO MODULE-LEVEL MUTABLE STATE: the factory's result holds its own counters and at most one per-gesture record; nothing else persists.** | the `SCH-6` acceptance line made testable | `§2.2` P-5, `§3.4 R-7` |
| **I-10** | **NO RENDERED-FACT CLAIM FROM `[T]`: no `[T]` row of this unit asserts a geometry, an applied style, a layout or a real pointer.** | the mandatory layer discipline | `F-13`, `§5.2`, `§4.4 S-7` |
| **I-11** | **THE DEMO'S DRIFT IS MEASURED, NOT ASSUMED: the authored card changes the demo's rendered census and its tool outputs, and the unit's live battery records the BEFORE and AFTER readings rather than a projection.** | `U-THEME-CONTROL`'s lesson (`docs/pending.md` §B's `SCH-3` row: *"measure it, do not assume it"*), applied here | `§3.5 R-9`, `§5.U` |
| **I-12** | **NO NEW MCP SURFACE AND NO SHELL CHANGE: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the renderer RPC switch and the preload bridge are UNCHANGED, asserted by SET EQUALITY against the names where a name-complete row exists.** | the `E3`/session discipline, carried | `§3.4 R-9`, `§5.1` |

### 3.4 The STATIC rows — **the rows `§2.2`'s prohibition table cites, ENUMERATED**

**Every static claim in this file has an id here, and each scan is closed against the evasion class
(token assembly, comment-carrying, realm-rooted computed access) by `§4.4 S-1`'s stop condition.** **The
scope of every scan is stated with it, because a whole-file scan of a file that must contain a spelling
can only fail** (`docs/specs/gsession.md` `§3.4 R-1`'s own lesson).

| id | Row (a TestWriter authors this) | Pinned by | Layer |
| --- | --- | --- | --- |
| **R-1** | **THE CENSUS AND THE AUTHORSHIP ROW.** **(a)** The module's imported namespace exposes **exactly FOUR value names** — `createGutterAffordance`, `cursorDeclarationFor`, `domEventSource`, `sizeFromPointer` — **read BY NAME**, with a **positive control that a fifth value name FAILS**; **(b)** the **SEVEN** type names are **presence claims** pinned by `§5.2` leg 4 (a type-only name is erased at run time), and a **twelfth exported name of any kind FAILS**; **(c)** **the module's own content-token census is EMPTY** over the nine-token negative list of `§2.1` item 6, scanned **comments included, token-assembly joined**, with a **positive control** (a corpus spelling one of them raw/joined/in a comment **FAILS**) and a **negative control** (the module's legitimate text — `addEventListener`, `removeEventListener`, `setPointerCapture`, its own member names — **PASSES**). | `§2.1` items 1/6, `§2.2` P-1 | static |
| **R-2** | **THE SURFACE-SET ROW.** The affordance object carries **exactly the five members** `attach` · `detach` · `detached` · `stats` · `controller`, **read as the object's own key set BY NAME**; **a sixth member FAILS**; and **no member of it is an MCP-reachable surface** (no tool descriptor, no `RpcMethod` string, no IPC channel name, no `list_targets` handle). | `§2.1` item 5, `§2.2` P-7 | static |
| **R-3** | **THE COORDINATE/MAGNITUDE VOCABULARY ROW.** Over the module's source **including comments**, no occurrence in any form of a **second coordinate token** (`pageX`/`pageY`, `screenX`/`screenY`, `offsetX`/`offsetY`, `movementX`/`movementY`, `deltaX`, `pointerId`), **no magnitude vocabulary** (`delta` as an identifier, `distance`, `ratio`, `percentage`, `scale`), and **no coordinate read outside `resolveEventPointer`'s own body**. **The two legal tokens `clientX`/`clientY` are the NEGATIVE control and MUST PASS.** **The scan's scope is the module file plus this row's own controlled corpora.** | `§2.4` items 1/5, `§2.2` P-4, `§1` item 7 | static |
| **R-4** | **THE NO-SECOND-AUTHORITY ROW.** The module contains **no** `session.begin`, `session.end`, `session.cancel`, `session.install`, `session.dispose`, `session.stats`, `session.gesture` **call of its own** (it reaches those only through `E3`), **no** `addEventListener` on anything but the given element, **no listener-window bookkeeping**, and **no second `createGestureSession` call site outside `attach`'s path**. | `§2.6` item 2, `§2.3` row 2, `§2.2` P-3 | static |
| **R-5** | **THE CLOSED-READ-SET ROW — `M-1`'s static half.** **(i)** `src/shared/gutter.js`'s module contains **neither `registerCompositionWriter` nor `registerCommit`** in any form (raw, token-assembled, commented) — **the invented-seam probe must be GONE, and this row FAILS if it is present**; **(ii)** **this module's own session-member reference census is EMPTY** — a `grep`-shaped scan for the six-member closed set's spellings in `gutter-affordance.ts` finds **no session-member reference**. | **`docs/pending.md` §I-sexies `E3`-HOST-2**, `docs/specs/gutter.md` `§2.5` item 1 | static |
| **R-6** | **THE ACCESS/DELEGATION ROW.** **No `document`/`window`/`globalThis`-rooted access**, **no `closest`/`querySelector*`/`getElementById`**, **no `document.addEventListener`**, **no `releasePointerCapture`**, and **the module's DOM-API members are EXACTLY `addEventListener`, `removeEventListener` and `setPointerCapture`, each appearing in `domEventSource`'s own body and nowhere else.** **A row asserting "no DOM API at all" FAILS this row's own text** (`§4.4 S-1`). | `§2.2` P-2/P-6, `§2.6` item 4 | static |
| **R-7** | **THE POLICY/VOCABULARY ROW.** No **cursor literal** (`col-resize`, `row-resize`, `ew-resize`, `ns-resize`, `cursor` as an authored string value), no **axis vocabulary** (`horizontal`/`vertical`/`x`/`y` as literals), no **unit string** (`'px'`, `'0px'`), no **threshold**, no **selector**, no **`data-*` name**, no **default size or bound**, and **no store/persistence/cache token** (`localStorage`, `sessionStorage`, `memo`, a `Map`/`WeakMap` keyed by element). **`cursorDeclarationFor`'s own parameter name and the `cursor` PROPERTY NAME it reads ARE the negative control and MUST PASS** (it reads a property called `cursor`; it does not carry a value). | `§2.2` P-4/P-5, `§0A` notes 4/8 | static |
| **R-8** | **THE IMPORT ROW.** **Exactly three import statements** exist, **named**: a **value** import of `clampToBounds` from `./gutter.js`; a **type-only** import from `./gesture-session.js`; a **type-only** import from `./gutter.js`. **Any other path — `provident-ssr`, `electron`, `node:*`, `src/main/**`, `src/renderer/**`, the shim, any other sibling — FAILS**, as does **a second value import** or **a value import of the session**. | `§2.1` item 2, `§0A` notes 2/12 | static |
| **R-9** | **THE DIFF-SCOPE ROW.** The unit's **allow-list census is scoped to ITS OWN ARTIFACTS** — the affordance module, the demo-envelope authoring hunk, this unit's test file, this spec, this unit's `*-greens.md` and its `archive/reviews/**` record, and the unit's own tracker rows — and **the DENIED set binds the WHOLE committed set**: *any* denied path appearing anywhere in the range **FAILS** the row, **regardless of which pass committed it**; **a non-denied path outside the allow-list is a FINDING for the adversarial pass, not an automatic FAIL**. | `§5.1` | static |
| **R-10** | **THE PAGE-DESIGN PROBE.** `docs/skills/designing-pages.md` **does not exist** (globbed `docs/skills/*` this pass: `process-guardrails.md` alone), so there is **no test-use-case coverage matrix and no demo-page index to update**. **THE PROBE MUST BRANCH on the file's presence**: if it exists at green time, this unit **owes the coverage row and the demo-page entry** — and **a row that fails because the file appeared is a defective row** (the `E3` `R-16` green-branch lesson, `docs/specs/gutter.md` `§3.5 R-16`). | `§7` item 8, `docs/specs/ci-ui-leg.md` `§1`'s out-of-scope clause | static |
| **R-11** | **THE NO-NEW-SURFACE ROW.** `ALL_TOOLS` (**21** names), `RpcMethod` (**21**), `MUTATING_METHODS` (**7**), `VALID_GROUPS` (**5**), the renderer RPC switch and the preload bridge are **UNCHANGED**, asserted **by SET EQUALITY against the names** where a name-complete row exists (`tests/engine-pin-version.test.ts`'s `PINNED_TOOL_SET`), **never by a bare count**; and the leg's own measurement channel stays the **existing** tools (`docs/decisions.md` `REAL-DOM-UI-GATE-LEG`; `docs/specs/ci-ui-leg.md` `§0` prohibition 5). | `§3.3 I-12`, `§2.2` P-7 | static |
| **R-12** | **THE NODE-LOCAL LISTENER ROW.** Every listener this unit causes is attached **through the injected source**, **to the affordance element it was given**, **once per event type**, and **every one is removed on `detach` with the SAME three values**; **zero** listeners on `document`/`window`/an ancestor; **zero** `closest`/`querySelector*`; **zero** capture calls before establishment. | `§2.2` P-2, `docs/decisions.md` `INTERACTION-NODE-LOCAL` | static |

### 3.5 The EXISTENCE rows — the repo-state claims this filing makes, each with a probe

| id | The claim | The probe (a TestWriter authors it) |
| --- | --- | --- |
| **R-8x** | **`src/shared/gutter-affordance.ts` does not exist at red time** | **the module-absence row**: assert **absence** and that **no unit path is imported by any `src/**` file** — and **branch on presence at green time** (if it exists, assert it **EXISTS**, that it is **imported by the demo envelope only**, and that the `4 + 7 = 11` census holds). **A row that fails because the work was done is defective** (`docs/specs/gutter.md` `§3.5 R-16`'s lesson). |
| **R-9** | **The authored gutter card is IN the demo envelope, and the demo's outputs DRIFT because of it** | **the demo-census row**: the authored card's nodes appear in **`list_targets`'s vocabulary** (the affordance's authored `css.id` and `props.id` resolve) and in **`get_rendered_html`**; and the unit's **live battery records the BEFORE/AFTER census and HTML readings** rather than a projected delta (`§3.3 I-11`, `§5.U`). **The drift is MEASURED.** |
| **R-10** | **`docs/skills/designing-pages.md` does not exist** | **`§3.4 R-10`** (the branching probe). |
| **R-11** | **`npm run ui` and the live driver exist and are runnable** | **the precondition + leg rows**: the leg's own **precondition** is `npm run divergence` green for the same built tree (`docs/specs/ci-ui-leg.md` `§5`), and the module's live-battery rows are discharged **by running the commands of `§5.2`**, with their exact output recorded (`§5.3` item 6). |
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
| **B-14** | **THE IMPORT/ISOLATION PROBE:** only the three declared imports; **`src/shared/gesture-session.ts` and `src/shared/gutter.ts` and their test files untouched**; `src/renderer/**` and `src/main/**` untouched; **any changed file outside `§5.1`'s allow-list while inside its DENIED set is `BLOCKING — SCOPE`**. | static |

**The seed set's own status: `14` seeds, ALL `OWED`.** **`B-2` is the reason this unit was admitted and
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

**What the red MUST contain, in this order:**

1. **The existence/absence rows** (`§3.5 R-8x`/`R-12`) — the module-absence row **branching on presence**,
   the frozen-peer probes, and the **demo-card absence** probe (the authored `css.id`s do not resolve at
   red time).
2. **The static rows** (`§3.4 R-1`..`R-12`), each with its own **positive and negative control**.
3. **The state rows** (`§3.1 M-1`..`M-17`) and the **fail-states** (`§3.2 F-1`..`F-13`), driven through
   **a recording source double**, **element doubles**, **caller-supplied callbacks** and the **shim**
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
   where they are expected to expose its defects.
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
   defaults).
4. **The live battery's preconditions are NAMED, not assumed:** a usable `DISPLAY` for the `npm run ui`
   leg (`docs/specs/ci-ui-leg.md` `§6`), `npm run divergence` green for the same built tree
   (`§5.2` leg 4), and the driver's reachability limits stated (`§5.2` leg 6). **`U-DIVERGENCE-EXT`
   (`C2`) is NOT a precondition of this unit** — **this spec claims no `[D]` row.**
5. **The demo-envelope authoring site is acknowledged as an in-scope `src/**` change** — this unit is
   **not** an additive-only unit, and a delegation prompt that forbids `src/**` edits **cannot land it**
   (`§5.1`).

---

## 5. Wiring

### 5.1 Diff scope (what this unit may touch) — the DENIED SET, NAMED FIRST

**OUTSIDE THE SCOPE, ALWAYS — THE DENIED SET, WHICH BINDS ABSOLUTELY AND OUTRANKS THE ALLOW-LIST. The
frozen and forbidden files are NAMED FIRST:**

1. **`src/shared/gesture-session.ts`** and **`tests/gesture-session.test.ts`** — **FROZEN** (`U-GSESSION`
   is `DONE`; this unit composes it).
2. **`src/shared/gutter.ts`** and **`tests/gutter.test.ts`** — **`E3`'s own module and test file**: this
   unit **composes** them, **reports** findings against them, and **never edits them** (`§0A` note 12).
3. **`docs/specs/gutter.md`** and **`docs/specs/gutter-review.md`** — `E3`'s contract and the closed
   gate-1 record: **derived, never re-litigated, never edited**.
4. **The Electron shell chrome and the process boundaries** — **`src/main/**`** (main process, preload,
   MCP server, the security store, `standalone.ts`, `battery-host.ts`) and **the rest of
   `src/renderer/**`** (`runtime.ts`, `renderer.ts`, `secure-panels.ts`, `index.html`) — **the shell's own
   chrome is the ONLY exception to the provident-authoring constraint, and this unit needs no piece of
   it.** **The preload/MCP surface is denied in particular: no tool, no resource, no group, no
   `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method, no
   registration site.**
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
| 1 | **`src/shared/gutter-affordance.ts`** | **NEW — the affordance module.** The **four value exports + seven type declarations** of `§2.1`, and nothing else. | always |
| 2 | **`src/shared/demo-envelope.ts`** | **THE AUTHORING SITE — an EDIT, bounded to ONE new authored gutter card** (`§2.1` item 7): the affordance node, the target node, the status node and the authored handler body/bodies, **as envelope data**. **No existing node is renamed, re-ided, removed or re-authored**, and the file's existing comment block is **extended, never rewritten** (`RCA-8`'s append rule). | always |
| 3 | **`tests/gutter-ui.test.ts`** | **NEW — the red set (`§4.2`), the register rows and the static/existence rows.** | always |
| 4 | **`docs/specs/gutter-ui.md`** | this spec — `§3a`/`§3b` findings as they land, and any `SUPERSEDED` annotation. | always |
| 5 | **`docs/specs/gutter-ui-greens.md`** | the unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), and any other `docs/specs/gutter-ui-*.md` of this unit. | the pass that produces it |
| 6 | **`docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` · `docs/FORKER.md` · `docs/defects.md` · `docs/HANDOFF.md` · `archive/reviews/**`** | the unit's own **tracker/record surface** — the supervisor's DONE row, the unit's own rows, the per-unit documentation-review record, **the `E3`-side finding's row if one is raised**, and a **sibling spec only for a dated status/annotation correction that changes NO normative clause**. | the pass that produces them |

**THE COMMIT-RANGE SCOPE RULE, stated so a scope row cannot mistake correct gate work for a boundary
violation** (the lesson `docs/specs/gutter.md` `§5.1` records): an allow-list census asserted over a
**commit range** must scope its list **to THIS UNIT'S OWN ARTIFACTS**, and **must NOT read a later unit's
commits, a sibling's dirty working-tree file, or a sibling unit's artifact as this unit's diff.** **The
DENIED set is the exception and binds the WHOLE committed set** (`§3.4 R-9`).

### 5.2 The legs this unit MUST run — **SEVEN, and THE LIVE BATTERY IS MANDATORY**

| # | Leg | Command (exact) | Layer | Notes |
| --- | --- | --- | --- | --- |
| **1** | **node suite** | **`npm test`** | **[T]** | the red (`§4`) **and** the green, **register rows included**. **Envelope/pure-layer evidence only** (layer anchors 1/2). |
| **2** | **typecheck** | **`npm run typecheck`** | **[H]** | **`src/**` ONLY** — `tsconfig.json`'s `include` is `src/**/*.ts` and its `exclude` names `tests`, so **this leg never reads this unit's test file or its register tables** (`docs/pending.md` §H's standing limit). |
| **3** | **build** | **`npm run build`** | **[H]** | esbuild, **five bundles**. **UNLIKE `E3`, BYTE-IDENTITY IS NOT THIS UNIT'S CLAIM**: the affordance module is **reached by the renderer bundle through the demo envelope's authoring site only if the demo imports it** — and **the demo does NOT** (the envelope is data; the module's consumer is the harness and, in the demo's live path, the caller that resolves elements). **The honest claim is therefore: the five bundles are REBUILT and their names/entries are UNCHANGED (no new entry point, no new output file), and the delta is STATED MEASURED, not asserted byte-identical.** **A bundle CENSUS change (a sixth output, a renamed entry) is a FINDING.** |
| **4** | **standalone strict `tsc` over the unit's own test file** — the named leg for `R-1`(b) and `R-8` | **`npx tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution bundler --types node,vitest/globals tests/gutter-ui.test.ts`** | **[T]** (the type layer of the unit's own rows) | **Why it is a LEG and not a trio member:** the seven type names are **erased at run time**, and **leg 2 does not compile `tests/**` at all** — so a renamed, removed or unexported type name is **only** visible here (`docs/specs/gsession.md` `§5.2` leg 4's precedent, whose red was `TS2353`). **IT IS NOT OPTIONAL AND IT IS NOT A SCRIPT ADDITION**: it adds **no script, no dependency and no diff-scope row**. |
| **5** | **THE REAL-DOM LEG — MANDATORY** | **`npm run ui`** | **[U]** | **This is the leg that makes every rendered claim of this unit observable**, and **it is MANDATORY for this unit and NEVER PARKED-BY-DEFAULT** (ruling 5; `docs/pending.md` §I-septies's admission ruling). **It is `npm run build && node scripts/electron-ui.mjs`.** **Its precondition is leg 4 of the run's own pinned sequence: `npm run divergence` green for the SAME BUILT TREE** (`docs/specs/ci-ui-leg.md` `§5`) — a red precondition **exits `2` before any measurement**, a missing display **exits `3`**, and **neither is a green**. **Its exit codes are `{0,1,2,3}` with no fifth code and no skip.** **A retried green is still a green but is LABELLED `attempt=<k>`.** **THIS UNIT PARKS THIS LEG ONLY FOR A STRUCTURAL REASON** — an OS-owned native dialog, or a scope the leg cannot reach — **never for convenience, and the reason must be recorded with its evidence** (`§4.4 S-12`). |
| **6** | **THE PROJECT'S LIVE DRIVER, against the RUNNING app, exercising the interaction through the reachable surface** | **`npm run divergence`** (the precondition and the `N = 9` identity leg) · **`npm start`** (boots the app for a live target; `electron .`) · **`npm run mcp -- --target http --port 3787 targets`** · **`npm run mcp -- --target http --port 3787 html`** · **`npm run mcp -- --target http --port 3787 dispatch gutter-vertical pointerdown`** · the same four commands against the **battery** target (`--target battery`, the default) where a live window is not needed. | **[U]** + **[H]** | **`scripts/mcp-cli.mjs` IS the project's live driver** — there is **no `scripts/live-drive.mjs`** in this tree (globbed `scripts/*`: `mcp-cli.mjs`, `electron-divergence.mjs`, `electron-spawn.mjs`, `electron-ui.mjs`), and the CLI is the driver the repo actually ships. **HONEST REACHABILITY, stated rather than assumed: the MCP `dispatch` surface carries an event NAME and serializable args and NO COORDINATES** (`docs/decisions.md` `MCP-ENDPOINT`; `docs/specs/gsession.md` `§2.3` item 1(d): the session's handler *"takes no parameter"*), so **the pointer-driven half of the interaction CANNOT be driven from the MCP tools** — it is exercised by **leg 5** (`npm run ui`, a real renderer in a real window) and, on the node suite, by the module's own drives with **synthetic `pointerdown`/`pointermove`/`pointerup` event objects through the source seam**. **A row that requires the MCP surface to carry a coordinate is `§4.4 S-3` and does not land.** **What the MCP surface CAN and MUST be used to observe, recorded exactly:** the authored card's **census and vocabulary** (`targets`), the **rendered HTML** including the `data-node-id` attributes (`html`), and the **authored handler's dispatch result** (`dispatch`, which proves the affordance is provident-reachable rather than hand-written DOM). **A live-battery record that claims a coordinate was driven through `provident.dispatch` is a FALSE RECORD and a review finding.** |
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
3. **The surface confirmation, explicitly**: *"`src/shared/gutter-affordance.ts` exports exactly **FOUR
   value exports** (`createGutterAffordance`, `cursorDeclarationFor`, `domEventSource`,
   `sizeFromPointer`) and **SEVEN type declarations** (`CursorOf`, `EventSourceLike`, `GutterAffordance`,
   `GutterAffordanceOptions`, `PointerPosition`, `PointerResolver`, `PreviewState`) — **`4 + 7 = 11`
   names** — with **exactly three import statements**, and `src/shared/demo-envelope.ts` carries the
   authored gutter card."* **A DONE row that prints a twelfth name, or that omits this census, is a review
   finding.**
4. **THE FOUR PARKED `E3` OBLIGATIONS, EACH ANSWERED BY NAME** — **the throwing-hook discard (`M-3`), the
   closed session read set (`M-1`/`R-5`, including the removal of the invented
   `registerCompositionWriter`/`registerCommit` seam), the disposed-session short-circuit (`M-2`), and the
   two-writer divergence on the real composition (`M-5`)** — **each with its row id and its measured
   outcome, and with any `OWED — E3-SIDE` finding reported to the supervisor and NOT fixed from this
   unit.** **A DONE row that does not name these four is a review finding** (ruling 3).
5. **The red, per `§4.1`** — the failing set as **RUN and REPORTED, verbatim**, **including which register
   rows ran and which were reported un-run**, and **which of the four obligations the red already exposed**.
6. **The legs' results WITH LAYER LABELS, and the LIVE BATTERY AS A RECORD**: `npm test` `[T]` · `npm run
   typecheck` `[H]`, **`src/**` ONLY** · `npm run build` `[H]` (the five bundles' **entry/name census
   UNCHANGED**, with the delta **measured**, per leg 3's note) · leg 4 (the standalone strict `tsc` over
   `tests/gutter-ui.test.ts`) · **leg 5 `npm run ui` `[U]` with its exit code, its result line and its
   retry label** · **leg 6's driver commands with their observed values** — **plus the explicit sentence
   that the node-suite green is envelope/pure-layer evidence and NOT assembled-app evidence, and that the
   `[U]` claims are the five named rows of `§5.2`.** **A DONE row that reports a live battery it did not
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
    per-row terms** — **`142` = `22` (`P-GU-SM-1`) + `10` (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45`
    (`P-GU-IM-1`) + `20` (`P-GU-IM-2`) + `18` (`P-GU-TP-1`) + `12` (`P-GU-TP-2`)** — and **must reconcile
    that figure against the tables the test file actually produces**: **a total that is not the sum of its
    own terms is a review finding** (`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`,
    ACTIVE). **Where a row's attempts are several assertions over ONE execution, or a count of DISTINCT
    inputs rather than of DRIVES, the DONE row must report BOTH the declared attempts and the honest
    DISTINCT-DRIVE figure** — **TWO** rows here carry two differing figures: **`P-GU-IM-1`** (`45`
    declared / `15` distinct value classes) and **`P-GU-TP-1`** (`18` declared / `6` distinct argument
    shapes). **The DECLARED figures are what the caps are compared against; the distinct figures are
    reported BESIDE them and never substituted for them.**
12. **THE `§5.U` DELTA MATRIX AND ITS COVERAGE REPORT** (`§5.U`): the matrix as filed, the live runner's
    **structured coverage report** with its `summary.total` **equal to the matrix's `7` U-row count**, the
    **read-only audit** on that report, and **the recorded gap that the predicate's source document
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
| **`P-GU-SM-1`** *(the SINGLE-WRITER quantification over every terminal path — required row (i))* | `P-SM` state-machine | **For EVERY terminal path in the row's `5`-path domain and EVERY composition shape in its `2`-shape domain, the sink's behaviour is EXACTLY the declared pair: a VALID `end` invokes it EXACTLY ONCE; an invalid `reset` invoked it EXACTLY ONCE with the CLAMPED pre-drag size; a REFUSED reset (`'not-resizable'` / `'unusable-default'`) invokes it ZERO times; a `cancel` invokes it ZERO times; the DROP path invokes it ZERO times — and in EVERY cell the MODULE ITSELF made ZERO sink calls, so `E3`'s `stats().sinkCalls` and the sink's own record AGREE.** **The converse clauses asserted in the same row: no path produces two writes; the module's `applyPreview` count never makes a preview reach the sink; and the two-writer shape's readings DIVERGE (sink record `2`, `E3` counter `1`) — which is what makes shape `(2)` falsifiable rather than vacuous.** | **YES** *(the `5` paths × the `2` composition shapes IS the domain the property names, and every cell declares its own pair)* | `M-5`, `M-8`, `M-9`, `M-13`, `M-16`, `I-1`, `§2.3`'s terminal write table | `S-GU-WRITER-1` | **`22` attempts** = **`5` terminal paths × `2` composition shapes + the `12` mid-drag observations the path-`(a)` and path-`(b)` cells additionally read.** **The `5` paths:** **(a)** a VALID `end` · **(b)** an invalid `reset` with a usable default and a resizable gesture · **(c)** a REFUSED reset (`'not-resizable'` and `'unusable-default'`, one path, its two variants asserted inside the drive) · **(d)** a `cancel` via `pointercancel` · **(e)** a `cancel` via a mid-gesture `dispose()`. **The `2` composition shapes:** **(1)** the single-writer composition (the module's `commit` passed to `E3` only) · **(2)** the TWO-WRITER composition (a harness-registered forwarding channel invoked **at the SAME committing terminal** the composition's writer serves, so the divergence is not an artefact of timing). **Per attempt assert:** the sink's own call record (**the exact multiset, never "at least one"**), `E3`'s `stats().sinkCalls`, `E3`'s `stats().written`, the module's `stats().previews`, and `stats().resets`/`stats().drops`. |
| **`P-GU-SM-2`** *(the PREVIEW-NEVER-SINKS quantification — required row (ii))* | `P-SM` state-machine | **For EVERY stage in the row's `5`-stage domain and EVERY move shape in its `3`-shape domain: `applyPreview` is invoked AT MOST ONCE PER OBSERVED MOVE; it is invoked ZERO times at a committed (`end`/`reset`) terminal; it is invoked EXACTLY ONCE with the pre-drag size on the cancel and drop paths; it is NEVER invoked for a move whose pointer did not resolve or whose clamped value is not finite; and NO preview invocation is ever accompanied by a sink write in the same turn.** | **YES (bounded — the property text says "EVERY move shape" while the table drives `3` shapes; the universal is NOT proven, and the three zero-write clauses are asserted over the whole enumerated grid rather than derived)** | `M-8`, `M-9`, `M-12`, `M-13`, `F-1`, `F-3`, `F-10`, `I-5`, `§2.5` | `S-GU-PREVIEW-1` | **`15` attempts** = **`5` stages × `3` move shapes**, driven in fixed order. **The `5` stages:** **(1)** before establishment (a hover turn) · **(2)** during the drag after a VALID move · **(3)** during the drag after an INVALID move · **(4)** at the terminal frame · **(5)** after the terminal (a later hover turn). **The `3` move shapes:** **(1)** a resolvable pointer with a finite clamped value · **(2)** an unresolvable pointer (`null` event / a throwing accessor) · **(3)** a resolvable pointer whose clamped value is not finite (`NaN` via an unusable pair, or `Infinity` via a `sizeFromPointer` answer). **Per attempt assert:** `stats().previews`, `stats().moves`, the `PreviewState` the callback received (`value`/`valid`/`resizable`/`token`), **and the sink's own record** — **declared exactly, never "at most"**. |
| **`P-GU-SM-3`** *(the RELEASE MAPPING and the DROP-REVERT — required rows (iii) and (iv))* | `P-SM` state-machine | **For EVERY release shape in the row's `5`-shape domain: a VALID release reaches the session's `end` terminal and yields EXACTLY ONE commit of the CLAMPED DRAGGED VALUE; an INVALID release reaches the session's `reset` terminal with the CLAMPED PRE-DRAG SIZE (exactly one commit, or zero when the reset is refused) **and the module's `controller.reset(element)` call happened while the gesture was STILL ACTIVE**; a RIGHT-CLICK / DROP yields ZERO COMMITS AND ZERO SINK WRITES with the visible revert through the preview channel; and `isResizable === false` yields zero commits with an outcome that is NOT `'cancel'`.** | **YES** *(the `5` shapes are the whole declared release domain, and each declares its own session calls, commits and preview writes)* | `M-9`, `M-13`, `M-14`, `M-16`, `F-7`, `F-9`, `F-10`, `§2.6` items 5/6 | `S-GU-RELEASE-1` | **`15` attempts** = **`5` release shapes × `3` readings**, one drive each. **The `5` shapes:** **(1)** a VALID drag released by the session's own `pointerup` · **(2)** an INVALID drag (a non-finite clamped value) · **(3)** an INVALID drag refused at the reset (`'not-resizable'`; and re-driven with `'unusable-default'`) · **(4)** a SECONDARY-button press during the drag (the drop) · **(5)** a SECONDARY-button press with NO active gesture (inert). **The `3` readings per shape:** **(a)** the module's own counters (`resets`/`drops`/`previews`) · **(b)** the session double's call log (**asserting the reset's call happened while the gesture was ACTIVE**, and that the module called **no** terminal itself) · **(c)** the sink's record and `E3`'s `stats()`. |
| **`P-GU-IM-1`** *(THE COORDINATE UNIQUENESS AND THE ONE-READ RULE — required row (v))* | `P-IM` invariant | **For EVERY event shape in the row's `15`-class domain, `resolveEventPointer` answers EXACTLY the declared reading — a frozen `{x, y}` carrying `clientX`/`clientY` for a usable pair, and `null` for EVERY other shape — it NEVER throws, it reads NO other event field, and the `PointerPosition` it returns carries NO reference to the event (so a caller cannot re-read a coordinate from it).** **The converse clauses asserted in the same row: the module's own source contains NO second coordinate token and NO magnitude vocabulary, and the caller's `sizeFromPointer` is called AT MOST ONCE per observed move.** | **YES (bounded — the row declares `45` drives whose honest DISTINCT value-class figure is `15`, because each of the `15` event classes is driven `3` times: once through `resolveEventPointer` directly, once through the module's observed-move turn, and once through the caller's `sizeFromPointer` argument recording. The universal "for every event" is NOT proven, and no reader may read this row as its proof)** | `M-12`, `F-1`, `F-10`, `I-2`, `R-3`, `§2.4` items 1/5 | `S-GU-POINTER-1` | **`45` attempts** = **`15` event classes × `3` drives**, driven in fixed order (class-major). **The `15` classes:** **(1)** a plain `{clientX: 10, clientY: 20}` · **(2)** `clientX`/`clientY` both `0` · **(3)** negative coordinates · **(4)** fractional coordinates · **(5)** an own accessor supplying the pair · **(6)** a FROZEN event object · **(7)** an `Object.create(null)` event carrying the pair · **(8)** `clientX` present and `clientY` absent · **(9)** `clientX` a string (`'10'`) · **(10)** `clientX` `NaN` · **(11)** `clientY` `Infinity` · **(12)** the event is `null` · **(13)** the event is `undefined` · **(14)** the event is a primitive (`42`, `'x'`, `true` — one class, its variants asserted inside the drive) · **(15)** a `Proxy` whose traps throw (and the same class re-driven with a throwing accessor on `clientX`). **Per drive assert:** the reading (`Object.is`-equal for `-0`/`NaN`-bearing inputs is not applicable; the pair is asserted by value and by **frozen-ness**), **no throw**, **the absence of any other event-field read (asserted with an event object whose other fields are getters that THROW)**, and **the `PointerPosition`'s own key set is exactly `{x, y}`**. |
| **`P-GU-IM-2`** *(THE ONE-CLOSURE AND ONE-EVALUATION-PER-GESTURE invariant over the composed seams)* | `P-IM` invariant | **For EVERY seam in the row's `5`-seam domain and EVERY lifecycle in its `4`-lifecycle domain, the composed seam is consulted EXACTLY the declared number of times: `axisOf` — zero times at `attach`, once per hover evaluation, and once per ESTABLISHED gesture (through `E3`'s `axisFor`); `boundsOf` — at most once per gesture, and only at a terminal that evaluates a value; `startSizeOf` — EXACTLY ONCE per gesture, at establishment; `resizableOf` — ONCE per gesture, and only through `E3`'s own establishment evaluation (so the module's `PreviewState.resizable` does NOT add a second call); `commit` — invoked by `E3` at most once per gesture and by the module ZERO times.** | **YES** *(the `5` seams × the `4` lifecycles IS the domain the property names, and every cell declares its own count)* | `M-8`, `M-10`, `M-12`, `M-13`, `M-16`, `I-8`, `§2.1` item 3, `§2.6` item 3 | `S-GU-SEAM-1` | **`20` attempts** = **`5` seams × `4` lifecycles**. **The `5` seams:** `axisOf` · `boundsOf` · `startSizeOf` · `resizableOf` · `commit`. **The `4` lifecycles:** **(a)** `attach` only, no gesture · **(b)** a hover turn, no gesture · **(c)** a full VALID gesture (`hover` → establishment → 1 move → `pointerup`) · **(d)** a full INVALID gesture (establishment → 1 invalid move → the reset). **Per attempt assert:** that seam's recorded call count and argument identity (`toBe` on the token), **and the module's `PreviewState.resizable` reading is derived from the SAME evaluation `E3` made** (a second `resizableOf` call in lifecycle `(c)` FAILS). |
| **`P-GU-TP-1`** *(THE MODULE'S TOTALITY over hostile arguments — required row (vi))* | `P-TP` totality | **For EVERY argument shape in the row's `6`-shape domain, EVERY entry point is TOTAL: `createGutterAffordance(arg)` returns an affordance whose FIVE members are all present and callable (never throws, never returns `null`/`undefined`/a primitive), `attach()` returns a `boolean`, `detach()` returns a `boolean`, `stats()` returns the seven declared fields, and `controller` is present — for EVERY one of the row's `6` argument shapes, including an omitted argument, a `null`, a primitive, a `Proxy` whose traps throw, and a record whose accessors throw.** **The converse clauses asserted in the same row: no entry point leaves a state a later call cannot read; a refusal is always a RECORD or a `boolean`, never a throw; and `cursorDeclarationFor`/`domEventSource` are total for every member of the same `6`-shape domain.** | **YES** *(the `6` argument shapes × the `3` entry-point drives IS the declared grid, and every cell declares its own return kind)* | `M-6`, `F-6`, `F-12`, `I-7`, `§2.1` item 5 | `S-GU-TOTAL-1` | **`18` attempts** = **`6` argument shapes × `3` entry-point drives**, one call each. **The `6` argument shapes:** **(1)** `undefined` (the argument omitted) · **(2)** `null` · **(3)** `42` · **(4)** `'x'` · **(5)** a `Proxy` whose traps throw · **(6)** a record with a throwing accessor on `session`, `source`, `element`, `target` and `applyPreview` (one shape, its variants asserted inside the drive). **The `3` entry-point drives per shape:** **(a)** the FACTORY with that shape as its argument (`createGutterAffordance(shape)`) **and** with it as an OPTION inside an otherwise valid options object ⇒ asserts the five members are callable · **(b)** the resulting affordance's `attach()`, `attach()` again and `detach()` ⇒ asserts a `boolean` in all three drives and no throw · **(c)** the resulting affordance's `stats()` and its `controller` ⇒ asserts the seven fields and that no throw occurs — **plus, per shape, one `cursorDeclarationFor(shape)` and one `domEventSource()` drive**, asserted for the same totality. |
| **`P-GU-TP-2`** *(THE CURSOR RESOLUTION'S TOTALITY AND THE CURSOR-LITERAL ABSENCE — required row (vii))* | `P-TP` totality | **For EVERY `cursorOf` answer shape in the row's `10`-shape domain, `cursorDeclarationFor` returns EXACTLY the declared reading: a trimmed non-empty string for an own `cursor` string property; `undefined` for EVERY other shape — a non-object, `null`, `undefined`, a primitive, an ARRAY, a record with no `cursor` property, a non-string `cursor`, an empty string, a whitespace-only string, a `Proxy` whose traps throw, and a throwing accessor — and it NEVER throws and NEVER touches an element, a document or a style object.** **The converse clauses asserted in the same row: the module carries NO cursor literal of its own (`col-resize`/`row-resize`/`ew-resize`/`ns-resize` appear ZERO times in its bytes), and the module writes the cursor NOTHING when the resolution is `undefined`.** | **YES** *(the `10` shapes are the whole declared domain, and each has its own declared reading)* | `M-10`, `M-11`, `F-11`, `R-7`, `§2.6` item 3 | `S-GU-CURSOR-1` | **`12` attempts** = **`10` answer shapes × `1` drive + `2` cursor-absence drives** (one static scan of the module's bytes for the four cursor literals, and one runtime drive asserting `applyCursor` is called with `undefined` — and no declaration — for the `undefined`-resolution path). **The `10` shapes:** **(1)** `{cursor: 'col-resize'}` (the positive control — it MUST resolve) · **(2)** `{cursor: '  row-resize  '}` (trimming) · **(3)** `{cursor: ''}` · **(4)** `{cursor: '   '}` · **(5)** `{cursor: 42}` · **(6)** `{}` · **(7)** `null` · **(8)** `'col-resize'` (a bare string — NOT a record; it resolves to `undefined`) · **(9)** an ARRAY carrying a `cursor`-named index is **not** an own property of the shape the row names: the row's array member is `['cursor']` and it resolves to `undefined` · **(10)** a `Proxy` whose `get` trap throws (and the same class re-driven with a throwing accessor). **Per drive assert:** the reading (`undefined` or the trimmed string, by `===`), **no throw**, and **no element/document/style access**. |

**⟶ THE REGISTER'S `(bounded)` SET, named exactly: `2` of the `7` rows — `P-GU-SM-2`** (its text's *"EVERY
move shape"* is bounded by its `3` shapes × `5` stages) **and `P-GU-IM-1`** (its text's *"For EVERY event
shape"* is bounded by its `15` classes over `45` drives). **The other `5` rows carry the plain executable
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

**Item 2 — THE `(bounded)` MARKINGS, and they are not formality.** **`P-GU-SM-2`** and **`P-GU-IM-1`** each
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
| `P-GU-SM-1` | `22` | **`22`** | `5` paths × `2` shapes plus `12` distinct mid-drag observations, each a distinct reading |
| `P-GU-SM-2` | `15` | **`15`** | `5` stages × `3` move shapes, each a distinct stage observation — **and it is `(bounded)` for its TEXT, not for a collapsed table** |
| `P-GU-SM-3` | `15` | **`15`** | `5` release shapes × `3` readings, each a distinct reading |
| `P-GU-IM-1` | `45` | **`15`** | the `15` event classes are each driven `3` times (directly, through the move turn, and through the caller's argument recording), so the honest distinct-class figure is `15` — **the reason this row is marked `(bounded)`** |
| `P-GU-IM-2` | `20` | **`20`** | `5` seams × `4` lifecycles, each a distinct count pair |
| `P-GU-TP-1` | `18` | **`6`** | the `6` argument shapes are re-driven across `3` entry points, and the `cursorDeclarationFor`/`domEventSource` drives add no new argument shape — so the distinct argument-shape figure is `6` |
| `P-GU-TP-2` | `12` | **`10`** | the `10` answer shapes plus `2` cursor-absence drives (one static, one runtime), which add no answer shape |

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

**`142` = `22` (`P-GU-SM-1`) + `10` (`P-GU-SM-2`) + `15` (`P-GU-SM-3`) + `45` (`P-GU-IM-1`) + `20`
(`P-GU-IM-2`) + `18` (`P-GU-TP-1`) + `12` (`P-GU-TP-2`).**

**CHECK THE ADDITION TERM BY TERM, so the arithmetic is checkable rather than asserted** — the ACTIVE rule
(`docs/decisions.md` `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) requires exactly this, **because a mis-sum
corrected only at the red run is the RECURRING finding, five times in this family**
(`U-PROJ` `239`→`231` · `U-LISTHOST` `157`→`168` · `U-ZONES` `400`→`369` · `U-GSESSION` `468`→`396` ·
`U-GUTTER` `314`→`299`):

| Step | Running total | Term added |
| --- | --- | --- |
| `1` | `22` | `22` (`P-GU-SM-1`) |
| `2` | `32` | `+ 10` (`P-GU-SM-2`) |
| `3` | `47` | `+ 15` (`P-GU-SM-3`) |
| `4` | `92` | `+ 45` (`P-GU-IM-1`) |
| `5` | `112` | `+ 20` (`P-GU-IM-2`) |
| `6` | `130` | `+ 18` (`P-GU-TP-1`) |
| `7` | **`142`** | `+ 12` (`P-GU-TP-2`) |

**THE TERM-BY-TERM CHAIN IS `22 → 32 → 47 → 92 → 112 → 130 → 142`.**
**THE FAMILY SUBTOTALS, stated consistently with that addition: `SM` = `22 + 10 + 15` = `47` · `IM` =
`45 + 20` = `65` · `TP` = `18 + 12` = `30` — and `47 + 65 + 30 = 142`.**

**THE TOTAL IS THE SUM OF ITS OWN TERMS. It is inside the `≤400` register cap (`142 ≤ 400`), and the
per-row maximum is `45` (`P-GU-IM-1`), inside the `≤100`/row cap.** **A total that is not the sum of its
own terms is a REVIEW FINDING.** **The DECLARED figures are what the caps are compared against; the
distinct-drive figures of `§5.5.2` item 4 are reported BESIDE them and never substituted.**

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

**1. THE MATRIX — `7` U-rows, `≤8`, every one a USER-VISIBLE flow this unit changes.** **The `Pre`
observation is what a user/agent sees on the tree BEFORE this unit's change; the `Post` observation is
what it sees AFTER — and the `Post` column is a REQUIREMENT on the live battery, MEASURED at the live gate
and never projected** (`§3.3 I-11`).

| U-row | The user-visible flow | Pre observation | Post observation (MEASURED at the live gate) | Layer |
| --- | --- | --- | --- | --- |
| **`U-1`** | **The demo page has a gutter affordance at all** | no gutter element exists; `list_targets` carries no affordance node; the demo's authored card set has no gutter card | the authored affordance node **resolves by its authored `css.id` and `props.id`**, and the card's nodes are in `list_targets`'s vocabulary | `[U]` + `[H]` |
| **`U-2`** | **The affordance's rendered cursor shape** | no affordance, so no gutter cursor is present anywhere in the rendered HTML | the affordance element's **authored base `cursor` declaration is present in `get_rendered_html`** and, on hover, the module's `applyCursor` writes the resolved declaration **in the real renderer** | `[U]` |
| **`U-3`** | **A press on the affordance starts the resize gesture** | no affordance and no composition: a press has nothing to start | a real primary press on the affordance **establishes the session's gesture** (the session's own listener runs; the module's `onStart` runs once) — observed through the live leg's own channel | `[U]` |
| **`U-4`** | **The drag shows the resized state live from the cursor** | no drag and no preview: the target's geometry does not move with any pointer | the target's **live rendered geometry changes with the pointer during the drag** (the preview channel), and the **committed graph value is readable afterwards** through the existing tools | `[U]` |
| **`U-5`** | **A valid release commits; an invalid one resets to the pre-drag size** | no commit exists and no reset exists | a valid release **commits the clamped dragged value exactly once** (the graph's authored content carries it); an invalid release **commits the clamped pre-drag size exactly once** — both measured | `[U]` + `[T]` |
| **`U-6`** | **A right-click drops the drag and resets** | nothing to drop and nothing to reset | the drop **commits nothing** (`zero` sink writes) and the visible state returns to the pre-drag size — measured | `[U]` + `[T]` |
| **`U-7`** | **The demo's census and tool outputs after the authoring change** | the pre-change census, `get_rendered_html` length and `get_markdown` text — **recorded BEFORE the change** | the post-change readings, **recorded as deltas rather than projected** — and the **`data-node-id` of every new authored element is present in both views** | `[U]` + `[H]` |

**2. THE STRUCTURED COVERAGE REPORT THE LIVE RUNNER MUST EMIT.** **It is a JSON object with AT LEAST these
fields, and the live battery's record quotes it verbatim** (`§5.3` item 12):

```
{
  "unit": "U-GUTTER-UI",
  "matrixSource": "docs/specs/gutter-ui.md §5.U",
  "predicateSource": "docs/specs/user-flow-audit.md §7.1",
  "predicateSourcePresent": false,        // the gap, U-GAP-1 — asserted FALSE at THIS tree
  "rows": [
    { "u": "U-1", "layer": "U|H", "observation": "<measured value>", "verdict": "CHANGED|UNCHANGED|NOT-OBSERVABLE" },
    …one entry per matrix U-row, in matrix order…
  ],
  "summary": { "total": 7, "changed": <n>, "unchanged": <n>, "notObservable": <n> },
  "commands": [ { "cmd": "<the exact command>", "exit": <code>, "observed": "<value>" }, … ]
}
```

**Three clauses are falsifiable and each is a row: (i)** **`summary.total` MUST EQUAL the matrix's U-row
count (`7`)** — a zero-row or short report is **invalid**, not empty (`docs/pending.md` §I's own
consequence clause for `U-GSESSION`); **(ii)** **every `rows[i].verdict` must be accompanied by an
`observation`**, and a `NOT-OBSERVABLE` verdict **must name the structural reason** — **a `NOT-OBSERVABLE`
verdict reached for convenience is `§4.4 S-12` and does not land**; **(iii)** **every `commands[i]` entry
carries the exact command and its exit code**, so the report cannot be authored from memory.

**3. THE READ-ONLY AUDIT ON THAT REPORT.** **After the live run, a READ-ONLY pass (the adversarial pass's
`B-12`, or the per-unit documentation review) audits the report and must: (a) reconcile
`summary.total` against `§5.U`'s row count; (b) reconcile every `verdict` against the recorded
`observation` and the recorded `commands` — **a `CHANGED` verdict with no command that produced the change
is a finding**; (c) check that the **`U-7` delta is a measurement rather than a projection**; and (d)
record that **`predicateSourcePresent` is `false` and the gap `U-GAP-1` is still open** unless the
predicate has been filed by then. **The audit is READ-ONLY: it changes no `src/**`, no `tests/**` and no
script.** **A live-battery record whose coverage report was authored rather than emitted is a review
finding** (`§5.3` item 12).

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
   are `M-8`..`M-14`, `F-1`..`F-11`, `I-5`, and the register rows `P-GU-SM-2`/`P-GU-SM-3`/`P-GU-IM-1`.**
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
   S-12`). **The exact commands are `§5.2`'s legs 5/6/7.**
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
14. **THIS PASS EDITED EXACTLY ONE FILE — the NEW `docs/specs/gutter-ui.md` — and edited NO existing
    file.** It ran **no test, no suite, no leg, no trio, no `tsc` invocation, no Electron boot and no git
    command**; it wrote **no code**; and it touched **no `src/**`, no `tests/**`, no sibling spec, no
    tracker, no `package.json`, no `scripts/**`, no config and no adjacent repo.** **The tracker cells it
    leaves stale — `E10`'s spec cell reading `OWED — not filed` and its as-filed `BLOCKED` chain — are the
    SUPERVISOR's to reconcile**, recorded here so the staleness is **attributable rather than silent**
    (`§8`).

### 7a. Ambiguity report — the clauses a TestWriter could NOT derive a falsifiable row from

**This subsection reports, and how to read it.** **THREE clauses** could not be derived **falsifiably**
from the architect's intent statement and the sources, because **two admissible readings both satisfy
their words and the choice changes either a PUBLIC SURFACE or a CONSUMER OBLIGATION.** **They are
REPORTED here with a WORKING DEFAULT (this filing's choice, implemented in `§2` and marked as a choice), a
RECOMMENDATION and the CLAUSE each one BLOCKS.** **No item is left as a silent gap**, and **no `§2`/`§3`
row, prohibition, register row or diff-scope clause is weakened, widened or re-scoped by this report.**
**A later pass that changes any of these three defaults MUST OPEN A GATE.**

### 7a.1 THE OPEN QUESTIONS — three items, each with a working default, a recommendation and a blocked clause

| # | The clause(s) that are silent or that admit two readings | Why a falsifiable row could not be derived as written | This filing's WORKING DEFAULT (implemented in `§2`, marked as a default) | THE QUESTION (to the architect) | This filing's RECOMMENDATION | The clause it BLOCKS |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **THE HOVER EVALUATION BUDGET for the axis/cursor seam** — *"On mouseover: change cursor to the appropriate shape for vertical/horizontal adjustment"* requires the axis **before any gesture exists**, while `E3`'s `axisFor` is called **at most once per ESTABLISHED gesture** and the controller may not be asked outside one (`docs/specs/gutter.md` `§0A` note 5, `§2.3` item 2(b)) | **A row cannot assert "the hover read costs zero controller calls" AND "the cursor's axis is the controller's axis" from the sources alone**: they are the same reading taken at two different times, and the budget decides whether the seam is consulted once per hover, once per move, or once per gesture | **The module reads its OWN `axisOf(element)` on the HOVER path** — once per `'pointerover'`, with `cursorOf` once per evaluation and `applyCursor` once per enter/exit — and **ZERO calls to `E3`'s controller on any hover path**; the caller wires `axisOf` into **both** `E3`'s `axisFor` and the hover read from **ONE closure**, so the two cannot disagree (`§2.6` item 3, `§2.1` item 3) | **Do you accept a hover path that consults the CALLER's own axis seam once per hover entry, with `E3`'s controller untouched (recommended — it keeps `E3` policy-free and the hover cheap), OR do you want the cursor to be resolved only once a gesture has established (which would leave the "mouseover" clause of your intent statement undischarged), OR do you want a per-move hover evaluation (which re-introduces a per-event read the node-local rule discourages)?** | **`M-10`/`M-11`** (the hover rows), `P-GU-IM-2` (`axisOf`'s declared counts), `§2.6` item 3, `§3.4 R-7` (the cursor-vocabulary absence) |
| **2** | **THE TIMING OF THE INVALID-RELEASE DECISION** — the intent says *"On release: if dragged state is valid, commit … otherwise, reset"*, while `E3`'s `reset` is legal **only for an ACTIVE gesture** and the session's own `pointerup` listener **ends every gesture at its own terminal** (`docs/specs/gutter.md` `§2.5` item 5 clause 3; `docs/specs/gsession.md` `§2.3` item 4) | **A row cannot assert "an invalid release resets" as a RELEASE-TURN behaviour**: measured against the frozen session, at the release turn there is no active handle to reset — so either the decision moves earlier, or the module must call a terminal itself (which `E3` forbids it), or the frozen session must change (which THIS unit may not do) | **The validity decision is taken from the DRAG's own observed state (the last observed move + the sticky rule) and the invalid arm calls `controller.reset(element)` from the module's own `pointermove` turn WHILE THE GESTURE IS STILL ACTIVE** — the ONE session-touching call `E3` permits on that path (`§0A` note 6, `§2.3` item 9) | **Do you accept the invalid arm being taken from the drag (recommended — it is the only shape the frozen session supports), OR do you want the frozen session re-opened so that a release can carry a "reset" instruction (a NEW GATE on `U-GSESSION`, which this unit may not open), OR do you want the module to call `session.end`/`session.reset` itself (which re-expresses the lifecycle `E3`'s ruling 3 forbids)?** | **`M-13`** (the invalid reset row), **`F-2`/`F-10`**, `P-GU-SM-3` (its reading that the reset happened while the gesture was ACTIVE), `§4.4 S-4` |
| **3** | **THE PREVIEW CHANNEL'S WRITE FORM** — *"On drag: dynamically show the resized state based on the current cursor position"* does not say **what** is written, while the affordance and the target are **provident-rendered** and a graph write re-renders (`AGENTS.md`'s constraint; `src/renderer/runtime.ts`'s render path) | **A row cannot assert both "the preview is a transient channel that is never the sink" and "the preview is provident-authored data"**: a graph dispatch during a drag re-renders and **replaces the element the session's listener is on**, so the second reading silently breaks the gesture | **The preview is a TRANSIENT PRESENTATION write applied through the caller's `applyPreview` seam — in this repo, a `style` declaration on the live provident-rendered target — and the COMMITTED state is the graph's**, written through `E3`'s one sink and read back through `get_rendered_html`/`get_markdown` (`§2.5` items 4/5/6) | **Do you accept the preview as a transient presentation write on the provident-rendered element, with the COMMITTED state in the graph (recommended — it keeps the element alive for the gesture and keeps the commit MCP-visible), OR do you want the preview itself to be an authored graph update (which needs a re-render-safe rebinding story the frozen session does not provide), OR do you want no live preview at all (which would leave your drag clause undischarged)?** | **`M-8`/`M-9`** (the preview counts), **`P-GU-SM-2`**, `§4.4 S-8`, `§5.U`'s `U-4` |

**The report's arithmetic, stated so the gate is checkable: `3` items reported · `0` ruled by this filing
as contract · `3` OPEN with a working default and a recommendation · `3` clause groups blocked.** **Every
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
| **THE SCOPE RULING (A) — `U-GUTTER` (`E3`) REMAINS THE POLICY-FREE CLAMP + COMMIT-DISCIPLINE LAYER; the UI unit (`E10`) OWNS the cursor, the coordinates, the live preview channel, the capture decision and the drop-revert** — `docs/decisions.md` `GUTTER-E3-REMAINS-THE-POLICY-FREE-CLAIM-COMMIT-LAYER` | **ADOPTED as this unit's warrant and boundary.** **`E3` is COMPOSED, not edited**; **its twelve rulings and `C1`–`C5` are NOT re-opened**; **the frozen session is unchanged** | `§0` ruling 2, `§0A` note 12, `§1` items 2/3/4, `§2.6`, `§7` item 12 |
| **THE ARCHITECT'S PARKING RULING** — *"Park checks until the UI exists, then start UI spec"* — and the four parked items (`docs/pending.md` §I-sexies's `E3`-HOST-1/2/3 and the two-writer divergence check) | **ADOPTED AS THIS UNIT'S FIRST OBLIGATIONS.** Four rows carry them (`M-1`..`M-5`), **each with its remedy's owner named**: a failure is **`OWED — E3-SIDE`** and is **NOT fixed from this unit** | **`§0` ruling 3, `§3.1 M-1`–`M-5`, `§3.2 F-5`, `§3b`'s `OWED — E3-SIDE`** |
| **`docs/pending.md` §I-septies's ADMISSION of `E10` (`U-GUTTER-UI`)** | **ADOPTED** — the admission supersedes the row's `PROPOSED — awaiting admission` marking, **the live battery is mandatory, and the user-flow-audit gap is to be stated rather than omitted** | `§0` rulings 3/5/10, `§5.2`, `§5.U`, `§7` item 7 |
| **`AGENTS.md`'s project-wide UI constraint (`AGENTS.md` "Project-wide constraint (UI rendering)")** + **`docs/decisions.md` `UI-RENDERED-WITH-PROVIDENT`**, with **`UI-STATIC-MEANS-APP-STATE-DERIVED` (A-d7)** leaving its text unchanged | **ADOPTED, UNCHANGED, AND SATISFIED BY DATA.** The affordance is **envelope data**; the module authors no UI content; the preview/cursor writes are transient presentation writes on the provident-rendered element and are **not** a second rendering path | `§0` ruling 4, `§2.1` items 6/7, `§2.2` P-1, `§3.4 R-1`/`R-2`, `§5.1`, `§7` item 4 |
| **`docs/decisions.md` `SHELL-CHROME-CARVE-OUT-FUNCTIONAL` (A-d1)** — the carve-out is **FUNCTIONAL**, and a mechanism is not a UI element | **NOT THIS UNIT'S LICENCE, and explicitly not used.** **The shell chrome is the only exception and this unit needs none of it**: the affordance is a **UI element**, so it is authored, and the module is a **mechanism that authors no content** | `§5.1`'s DENIED item 4, `§2.2` P-1 |
| **`docs/decisions.md` `INTERACTION-NODE-LOCAL` (A-d3)** and **`GSESSION-CAPTURE-CAPABILITY-IS-SOURCE-SUPPLIED-AND-OPTIONAL`** | **ADOPTED** — the node-local listener rule and the capture capability's exact shape (the flag is the consumer's, the capability is the source's, the count is the session's) | `§0` rulings 6/8, `§2.1` item 9, `§2.2` P-2/P-6, `§2.6` item 4, `§3.4 R-6`/`R-12` |
| **`docs/specs/gsession.md` `§2.5`'s numbered delegate list** (`GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`) | **ADOPTED AS THE FROZEN AUTHORITY, and NOT RE-OPENED.** This unit calls the session **only through `E3`**, and **does not re-open a single item** | `§0` ruling 6, `§2.6` item 2, `§3.4 R-4`/`R-5` |
| **`docs/specs/gsession.md` `§2.3`'s lifecycle** (one listener per control, the tracking window, the three terminals, the seven-member code domain, the PARKED capture note) | **ADOPTED AND COMPOSED** — this unit attaches no listener of its own to the session's element beyond its own three source listeners, calls no terminal, and adds no code | `§2.3`, `§2.6` item 2, `§3.3 I-4`/`I-8` |
| **`docs/specs/gutter.md` — `E3`'s contract** (the composed surface, the value chain, the preview-channel rule, the release mapping, the single-writer discipline, the reset entry point, the closed session read set, the named safe defaults, the seven seams, the ten type declarations and two value exports) | **ADOPTED AS THE COMPOSED CONTRACT — derived, never re-litigated, and never edited** (`§5.1`'s DENIED item 2). **This unit's own two-readings rule extends it: `E3`'s counters and the sink's record are read TOGETHER** | `§0` ruling 7, `§2.4`, `§2.6` items 1/5/6, `§3.1 M-5`, `§8` (this row) |
| **`docs/specs/gutter-review.md` — the CLOSED gate-1 record** (the twelve rulings, `C1`–`C5`, the must-not list) | **FROZEN AND NOT EDITABLE BY THIS UNIT.** This filing composes the record's outcomes; **it does not amend the record** | `§0` ruling 7, `§5.1` DENIED item 3 |
| **`docs/decisions.md` `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`** (ACTIVE) and **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`** (ACTIVE) | **DISCHARGED BY THIS FILING** — `§5.5.1` is this unit's register: **`7` typed rows in three families**, **`142` attempts** printed **with their seven terms and a term-by-term addition table**, **no `F-` row**, **no `§6`/`FS-n` citation as a row**, **no new dependency**, **no generator and no seed claimed**, caps `≤100`/row · `≤400` total · stop-after-5, **`2` `(bounded)` rows**, and the pool-versus-boundary check **RUN and CLEAN for all `7` rows**. **The read-only PBT audit is OWED to the adversarial pass (`B-13`)** | `§5.5`, `§5.5.1`, `§5.5.2`, `§5.5.3`, `§5.3` items 10/11 |
| **THE USER-FLOW-AUDIT PREDICATE (`docs/specs/user-flow-audit.md` `§7.1`, `§5.U`, `§6.1`, `§6.2`)** | **OWED — AND ITS SOURCE DOCUMENT DOES NOT EXIST IN THIS TREE** (sixth confirmation). The matrix is authored **in the gate instructions' form**; **the gap is filed with an owner and a revisit condition**; **the predicate's mechanical trigger FIRES for this unit on its merits** (a UI-rendering unit), so the hardening is applied rather than skipped | **`§5.U`** (the matrix, the coverage report, the read-only audit, `U-GAP-1`), `§7` item 7, `§0` ruling 10 |
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
| **`docs/specs/gutter-ui.md` (this file)** | **LANDED BY THIS FILING** (`OWED — not filed` → FILED). **The tracker cell is the SUPERVISOR's to flip** — this pass edits no tracker | this file, `§5.1` item 6, `§7` item 14 |
| **`docs/specs/gutter-ui-greens.md`** | **OWED** — this unit's **gate-5 blind-greens artifact** (`AGENTS.md` item 10a), named in the diff scope so it is not discovered later | `§5.1` row 5, `§5.3` item 8 |
| **THE `E3`-SIDE FINDINGS THIS UNIT MAY RAISE** (whatever `M-1`..`M-3`/`F-5` expose about the parked `E3` defects) | **OWED, WITH A NAMED OWNER — the supervisor + an Implementer pass on `E3`'s own denied path.** **Never fixed from this unit**; recorded in the DONE row and in the trackers, **not** in `docs/defects.md` (a host finding is this repo's) | `§3.2 F-5`, `§3b`'s `OWED — E3-SIDE`, `§5.3` items 4/7 |

**Archival-loop check (`AGENTS.md` item 6): this filing archives, moves and repoints NOTHING.** It creates
**one new spec file** and edits **no existing document** — **no tracker row is touched, no sibling spec is
annotated, and no citation is repointed.** **Row `E10`'s spec cell therefore still reads `OWED — not
filed` until the supervisor's reconciliation pass flips it** — recorded here so the staleness is
**attributable rather than silent**. **This pass ran no test, no leg, no trio and no live battery, edited
exactly ONE file, and made no commit** (`RCA-8`: **the new file is untracked and must be committed by the
supervisor**).

**File-end note (placed here so an appended findings block extends the file WITHOUT renumbering
`§6`/`§7`/`§8`).** **THE UNIT'S OWN RECORD IS `§3b` — at filing it is EMPTY BY CONSTRUCTION, with its
vocabulary and append shape fixed there. NOTHING may be added after `§3b` as a new top-level section.** A
later pass appends **inside `§3a`/`§3b`** or inside an existing section; **no section number moves,
nothing is renumbered, and the `§5.3 → §5.5` gap (no `§5.4`), the `§5.U` label and the absent `§5.5.0` stay
exactly as recorded**, because **renaming is forbidden for citation stability.**
