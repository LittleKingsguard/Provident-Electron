# Review — `U-OVERLAY` (wave **E**, ledger row `E9`) — **GATE 1: the four-step proposal review**

**Status: STEPS `1` AND `2` ARE CARRIED BY THIS RECORD — AND STEPS `3` AND `4` HAVE *NOT RUN*.** **Step 1
(`role_validity`) returned `FLAWED`, with TWELVE findings. Step 2 (`role_critique`) returned `FLAWED`, with EIGHT
findings and THREE ARCHITECT QUESTIONS.** **STEP 3 (`role_architecture_review`) HAS NOT RUN. STEP 4
(`role_change_analysis`) HAS NOT RUN. THEREFORE THIS RECORD CARRIES *NO VERDICT*, GATE 1 IS *NOT COMPLETE AS A
REVIEW*, AND THE UNIT IS *NOT DELEGABLE* — neither `DELEGABLE`, nor `DELEGABLE-WITH-CONDITIONS`, nor the
`VALID-WITH-CONDITIONS`/`SOUND-WITH-CONDITIONS` pairing the sibling records carry at this stage.** **NO CONDITION
SET EXISTS, because no pass derived one.** **A reader must not read two `FLAWED` verdicts plus a filed record as a
gate that closed: on this record's own state the unit sits at its SPEC GATE with its contract *unwritten* and its
two returning steps *negative on the proposal as filed*.**

**THE PROVENANCE OF THIS RECORD, STATED FIRST, AND IT IS A DOCUMENTED COMPRESSION.** **Step 1's and step 2's
reports were NEVER FILED as artifacts of their own.** **This is the SAME process finding the `E4` cycle recorded as
`P-1`** (`docs/specs/relocate-review.md` `§5.9`: step-1/step-2 reports that were *never filed as any artifact at
all*) **and that the `E7` cycle recorded again as its `§7` `P-1`** (`docs/specs/menulib-review.md`), where the fix
was to make the gate-1 record **the filing home of steps 1 and 2** — the `E4`/`E7` precedent this record follows.
**THE RECORD YOU ARE READING WAS WRITTEN BY THE FILING PASS (a documentation-steward pass), NOT BY THE
REVIEWERS.** Steps 1 and 2 returned to the supervisor; **no file was written by either pass**; **this single pass
landed their substance as this record so nothing is lost**, and it wrote **NOTHING ELSE** — **the contract those
steps gate is NOT filed by this pass, because steps 3 and 4 have not run and there is no resolved shape to file.**
**THE READER MUST READ THE PROVENANCE CORRECTLY: (a)** the **two `FLAWED` verdicts, the finding counts (twelve and
eight) and the three architect questions are the reviewers' returns** — filed here as substance, not re-derived;
**(b)** **every grouping, table, clause-level expansion and file/section citation below is THIS FILING PASS's**, and
each is marked where a marker matters; **(c)** **no reviewer re-read this file before it landed**, so a reviewer's
own wording that a later reader needs is **not recoverable from this record and is not quoted as though it were** —
the honest statement of the compression. **Unlike the `E8` filing, this pass files NO contract beside the record**
(the `E8` pass filed `docs/specs/theme.md` in the same commit; here there is nothing to file — `§4`, `§5`).

**LIMITATION BLOCK — WHAT THIS RECORD IS *NOT* EVIDENCE OF, STATED BEFORE ANYTHING IS CITED FROM IT.** **(1) BOTH
STEPS RAN READ-ONLY.** **Neither step wrote a file, edited a tracker, flipped a cell or ran a source change** —
this record is the only artifact either step produced, and it was produced by the filing pass. **(2) THE STEP-2
PASS HELD NO SHELL.** **Step 1 held a shell and used it for READ-ONLY searches** (its measured tree facts,
`§2.2`, are those searches); **step 2's shell was absent**, so **step 2's findings are derived from the charter,
the upstream dispositions and the landed records — not from any measurement of its own** — and **no step-2 finding
may be quoted as a measurement.** **(3) NO LEG WAS RUN BY ANY OF THE THREE PASSES** — no suite, no trio, no `tsc`,
no Electron boot, no `npm run ui`, no `npm run divergence`, no register execution. **Every figure in this record is
a read-tool result, a quoted tracker cell, a quoted ruling, or a derivation, and none is a leg** (`RCA-12`).
**(4) THE STALE `H-r7` PREMISE IS CARRIED, NOT RESOLVED HERE** (`§2.2` row 4, `§6`): this record **NAMES the
stale site and the landed evidence that contradicts it**, and **reconciles nothing** — the reconciliation is the
supervisor's, at its own site, by annotate-beside (`RCA-8(d)`). **(5) NO COUNT MOVED** (`§5`).

| | |
| --- | --- |
| **Unit** | `U-OVERLAY` — **the ONLY unit left in wave `E`** (the ledger's one remaining `E`-group OPEN row): *"the overlay state machine + inert-background **declaration** + re-parent contract"* |
| **Wave / ledger row** | **E** / **`E9`** (`docs/next-steps.md`'s `## OPEN` table row `E9`) — **an OPEN row, whose cells this pass does NOT flip** |
| **Upstream** | **`SCH-12`** `OVERLAY-FRAME-PRIMITIVE` (the fork's `SC-3`, P1) — **`ADOPTED-RESHAPED`**, reason code **`ADOPTED-VERSION-UNBLOCKED`**, with **the package-stream refile WITHDRAWN**; the **focus-trap half** and the **`inert`/a11y documentation half** stay refiled (to `PS-1` for the docs half) — the two owners are **this repo (mechanism)** and **the fork + its `PS-1` stream** |
| **Code-bearing?** | **YES.** **`AGENTS.md` item 11 binds: a typed `§5.x` register MUST exist BEFORE the red set is authored, and the zero-row exemption is UNAVAILABLE to a code-bearing unit** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`) — and **no register exists, because no spec exists** |
| **Dependency** | **`U-THEME` (`E8`) is `DONE`** (the ledger's SEVENTEENTH `DONE` row) so that dependency is **SPENT**; **`U-ENGINE-PIN` and `U-DIVERGENCE-EXT` are both `DONE`**; **the `H-r7` completion the ledger row also names is *LANDED*, not `OWED`** — the stale premise of `§2.2` row 4. **THE LIVE NEXT ACTION IS THIS UNIT, AT ITS SPEC GATE** |
| **Charter, in the tracker's words** | `docs/next-steps.md`'s `E9` row, quoted: *"`U-OVERLAY` — the overlay state machine + inert-background **declaration** + re-parent contract"*; the `U7` plan row adds: *"state machine transitions (open/close/toggle/escape-equivalent-as-callback) with every state and fail-state · the inert-background contract asserted as a DECLARATION the consumer applies (the mechanism returns/records the inert set; it wires **no** events inside itself) · re-parent contract (where the overlay's node goes, and that it is returned/released on close) · **no event wiring inside the mechanism** · the inert background is never a stamped hard-coded `inert` string · no focus trap, no `activeElement` walk"*, with the legs cell reading *"node suite; **the real-DOM half of any `inert` row → the divergence leg** (`H-r10`)"* |
| **Contract** | **`docs/specs/overlay.md` — `OWED — not filed`, AND IT REMAINS SO AFTER THIS PASS.** **It is THE ONE REMAINING `E`-GROUP SPEC.** **It is not filed by this pass** because gate 1 did not complete (`§4`); **a `glob` of `docs/specs/overlay*` returns NO FILES** (this pass's own read) |
| **Gate-1 steps** | **`1` `role_validity`** → **`FLAWED`**, twelve findings (**§2**) · **`2` `role_critique`** → **`FLAWED`**, eight findings + three architect questions (**§3**) · **`3` `role_architecture_review`** → **`NOT RUN`** (**§4**) · **`4` `role_change_analysis`** → **`NOT RUN`** (**§4**) |
| **Filing provenance** | **Written by the FILING PASS, not by the reviewers** (the header block; `§6` `OV-1`) |
| **Tree state** | **Not measured as a commit by this pass.** The measurements this record DOES assert are **step 1's read-only searches** (`§2.2`, carried as filed) **plus this filing pass's own file reads** (named in `§2.2` and `§6`) — **none of them is a leg, a suite or a build** |

---

## §1 THE UNIT, AND WHAT THE PROPOSAL ASKS

**`E9` / `U-OVERLAY` is `SCH-12`'s adopted-reshaped MECHANISM half, and nothing else** — the fork's
`OVERLAY-FRAME-PRIMITIVE` criterion, reshaped by the handoff amendment into a **`src/shared/`-class mechanism with
three named parts**: **(i) a STATE MACHINE** over overlay transitions (open / close / toggle, with the
`Escape`-equivalent arriving **as a caller callback**, never as an installed listener), **with every state and
fail-state named**; **(ii) an INERT-BACKGROUND **DECLARATION** — a presence/absence declaration *the consumer
applies*, where "the mechanism returns/records the inert set and wires no events inside itself"* and where **"the
inert background is never a stamped hard-coded `inert` string"** is an acceptance clause; and **(iii) a RE-PARENT
CONTRACT** that **states which element is re-parented and who owns it after close**.

**THE PROPOSAL'S OWN NEGATIVE SET, quoted from the disposition (`docs/pending.md`'s upstream-`SCH-12` row and
`docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `SCH-12` adjudication):** **no event wiring inside
the mechanism** (the consumer owns the scrim and `Escape` listeners) · **no hard-coded `inert` string the mechanism
stamps** · **no focus trap, no `activeElement` walk** — that half **stays refiled**, because the shim has no
`activeElement` and **this repo will not grow it**.

**THE PROHIBITION 5 / `H-r8` BOUNDARY, stated because every adopted unit carries it:** `SCH-12`'s admission is
**clause (C)** of the `S-d8` rule — *a reusable shell-chrome mechanism with a consumer-agnostic contract* — bounded
by the **six prohibitions** (`H-r8`: no consumer vocabulary as symbols/enumerated constants · no app UI content
authored · no policy defaults · no UI-config store or persistence · no new MCP surface · no criterion unverifiable
on a layer this repo owns), and `PROHIBITION-5-IS-AN-ADOPTION-BOUND` reads prohibition 5 as **an adoption bound on
units**, not as a repo-wide ban.

**WHAT THE PROPOSAL IS NOT.** **It is not the focus-trap unit** (refiled; `F2`/`F3` are the focus rows on the
ledger, not this unit). **It is not the fork's `inert`/a11y documentation deliverable** (`PS-1`'s). **It is not a
UI unit by charter** — but **whether a *rendered* overlay makes it one is exactly one of the open questions step 2
raises** (`§3.1` finding 4) **and step 3 would have settled**.

**THE CAPABILITY FLOOR IS CLOSED AND IS NOT A BLOCKER, RESTATED SO NO PASS RE-OPENS IT.** `docs/pending.md`'s
**`UPSTREAM-CAPABILITY-FLOOR — the `inert`/boolean-attribute capability`** row reads **`CLOSED CAPABILITY FLOOR`**:
the closed boolean-attribute set (27 members, `'inert'` among them) first arrived in `0.4.1` and is present in
`0.5.1`, in **both** adapters, so `inert="false"` can never be emitted; **the pre-amendment `SCH-12`
package-stream refile is WITHDRAWN on that ground**. **The row also records the consequence that matters here: the
harness half of a real-DOM `inert` row needs `removeAttribute` in the shim (`H-r7`'s scoped completion) and any
real-DOM boolean row needs the divergence-harness extension (`H-r10`) — both of which have SINCE LANDED** (`§2.2`
rows 3 and 4).

---

## §2 STEP 1 — `role_validity`: **`FLAWED`**, twelve findings

**The verdict and the finding count are the step-1 reviewer's return, filed here as substance.** **`FLAWED` is a
verdict on the PROPOSAL AS FILED — not on a contract**, because `docs/specs/overlay.md` did not exist when it was
returned **and does not exist now** (`§5`). **The twelve findings are carried below GROUPED BY AXIS; the axis
names and the grouping are this filing pass's, the findings are the reviewer's.**

### §2.1 The twelve findings, grouped

| Group | # | The finding, condensed | Why it blocks a `VALID` reading |
| --- | --- | --- | --- |
| **THE NEGATIVE-OBLIGATION AXIS** | **1** | **WHAT EACH OF THE THREE PARTS MUST *NOT* DO IS UNSTATED.** The adoption names three parts (state machine · inert declaration · re-parent contract) and **no prohibition per part**: the proposal does not say the state machine may not own listeners, that the declaration may not be applied by the mechanism, or that the re-parent contract may not be *performed* by it. **The two live precedents it must be read against: `E5-B-1`** (`E5-B-1-DECLARATION-IS-RETURNED-AS-TEXT-AND-NEVER-APPLIED` — the declaration is a **module-owned opaque constant RETURNED and never applied**, with the **consumer** applying it, which is exactly what kept `U-CONTAINER` a **pure mechanism** with **gate 6 `STRUCTURAL`**) **and `A-d3`** (`INTERACTION-NODE-LOCAL` — interaction goes through **local handlers on the element that receives the interaction**; document-delegated tracking is REJECTED) | **A mechanism whose *not-doing* is unspecified is a mechanism whose boundary is unassertable** — and `H-r8`'s prohibition 6 (no criterion unverifiable on a layer this repo owns) turns on precisely that boundary |
| **THE UNPINNED-CONTRACT AXIS** | **2** | **THE STATE SET IS UNPINNED ANYWHERE.** The charter names **four verbs** (open · close · toggle · the `Escape`-equivalent-as-callback) and **no state set, no transition table, no fail-state** — the ledger's own plan asks for *"every state and fail-state"*, and **nothing in the charter, the disposition or the amendment enumerates one** | **A state machine unit with an unpinned state set has no row that can fail** — the `P-SM` class of `AGENTS.md` item 11 presupposes a declared machine |
| | **3** | **THE BACKGROUND-TARGET PARAMETER'S DOMAIN IS UNPINNED, AND IT COLLIDES WITH TWO LANDED RULES.** The inert declaration must name **which element is the background** — but the charter does not say whether that target is an **element**, a **caller-supplied opaque name/handle**, or a **mechanism-owned element reference**, nor what happens when it is absent/foreign. **It collides with (a) the family's caller-supplied-name precedent** (`U-THEME`'s `applyThemeDeclaration(attributeName, resolved)`: a **non-empty string echoes VERBATIM BY IDENTITY**, a non-string/`''`/omitted argument yields the **declared `null`** — and `String()`/`toString`/`valueOf` are NEVER consulted) **and (b) the region-host NO** (the family's units take **no ambient element**; `U-SLOTHOST`'s container source had to become an **injected element factory**, `SLOTHOST-CONTAINER-SOURCE-IS-INJECTED`) | **An undefined parameter domain is an `H-3` finding — a declared parameter without a semantics row** — and both collisions are *checkable* rules this contract would be silently violating |
| | **4** | **THE DECLARATION'S SHAPE IS UNPINNED**: **which fields** it carries, whether its **key set is closed**, and **what an absence means** — **the empty set**, or **`null`** — are all unstated. **The `E5-B-1`/`E8` form is the demand: a shape with an exactly-known member set and a *declared* absence** (`U-THEME`'s returned write is a three-member record `{name, value, removal}` with the removal case as **DATA**; `U-CONTAINER`'s declaration is returned **text**) | **A declaration whose absence is ambiguous cannot be asserted**, and the two readings (empty set vs `null`) differ in the module's vocabulary — **an `H-r8` prohibition-1 question, not a style question** |
| | **5** | **THE RE-PARENT CONTRACT'S PRE/POST CONDITIONS ARE UNPINNED**: **which element** is re-parented, **who owns it after close**, **whether the mechanism PERFORMS the move or only DESCRIBES it**, and **what the observable is**. The charter's own words ask three of those and answer none | **"The re-parent contract" is a *contract* only if it can fail.** Under `A-d3`'s node-local discipline and `E5-B-1`'s declaration precedent, **a mechanism that performs the move is doing the consumer's work** — the finding is that the proposal never says which side of that line it is on |
| | **6** | **THE COLLISION TABLE IS OWED AND DOES NOT EXIST.** Seven tokens this unit's surface would run into are **not reconciled against the landed ban lists**: **`background`** · **`focus`** · **`layer`** · **`stack`** · **`modal`** · **`dialog`** · **`portal`**. **The sharpest instance: `docs/specs/menulib.md` `§3.4 R-1` clause (e) bans `focus(`/`blur(`/`appendChild`/`removeAttribute` — and `setAttribute`/`setProperty` alongside them — over THAT MODULE'S BYTES, while THIS unit's own contract may need the re-parent verbs** (`appendChild`/`remove`/`parent` bookkeeping). **`R-1`'s scope is `src/shared/menu-template.ts` alone, so the ban does not reach this module — but that is a RECONCILIATION to be stated, never an assumption to be relied on silently** (the landed form is *"banned in layer X for reason Y, legitimate in layer Z because …"*, with the scan row NAMING its exemptions or being **vacuous**) | **The family's rule is that a scan row without named exemptions is unfalsified** — and a token that appears in a sibling's ban list **must be reconciled before the row is authored, not after it reddens** |
| **THE HARNESS-ROW AXIS** | **7** | **WHETHER THE REAL-DOM `inert` ROW IS IN SCOPE AS A NEW SCENARIO KIND — OR IS ALREADY SPENT.** The `H-r10` extension landed with a **pinned two-member `SCENARIO_KINDS` set** (`'demo'` and `'props-falsy-toggle'`), and `docs/specs/ci-divergence-leg.md` `§A-1.5` states the rule verbatim: **"A third kind is a new contract row, not a free choice."** **So a real-DOM `inert` row authored by this unit is either (a) already covered by `'props-falsy-toggle'`, or (b) a THIRD KIND, which is a new contract row for `ci-divergence-leg.md` and not something this unit may simply add** | **A leg's pinned kind set is a contract, and choosing a third kind is an amendment with its own row — never an implementation detail** (`§3.1` finding 8 is the same question from step 2's side) |
| **THE STALE-PREMISE AXIS** | **8** | **THE LEDGER'S `H-r7` PREMISE IS STALE, AND THE STALE SITE IS NAMEABLE.** **`docs/next-steps.md`'s `## OPEN` table row `E9`, `Blocked on` cell — in its own dated close-out annotation — reads: *"the `H-r7` completion it also names remains `OWED`"*; the same file's `§4` item 4 annotation reads *"with the `H-r7` completion still `OWED`"*** (`docs/next-steps.md`, the `E9` row and the pickup's `§4`). **THE LANDED EVIDENCE THAT CONTRADICTS BOTH: (i) the shim carries the method** — `src/shared/dom-shim.ts` `removeAttribute(k)` at `:158` (read this pass), plus the `id`-slot clear; **(ii)** `docs/decisions.md`'s **`SHIM-COMPLETION-CARVE-OUT`** and **`ENGINE-PIN-VALUE-SLOT-CLEAR`** both read **ACTIVE** and the first records the method as **landed**; **(iii)** `docs/specs/mount-invariant-guard.md` states it outright: *"The **one** admitted shim carve-out (`H-r7`, `ShimElement.removeAttribute`) is **already landed** and is **not this unit's to touch"*; **(iv)** `docs/defects.md`'s harness-gap entry reads **"LANDED and green"**, with `U-ENGINE-PIN` **`DONE`** | **A fresh reader following the ledger would re-file or re-open a closed completion** — `docs/defects.md` explicitly forbids that (*"a later pass must **not** re-file it or re-open the completion"*) — **and would mis-read this unit's live precondition** |
| **THE LAYER / GATE-6 AXIS** | **9** | **THE PER-LEG LAYER QUESTION IS UNANSWERED, AND SO IS *WHO OWES THE GATE-6 DETERMINATION*.** The row's legs cell reads *"node suite; **the real-DOM half of any `inert` row → the divergence leg**"* — which **names no `[U]`/`[D]`/`[H]` claim set and states no refusal form**. **The three-part form is the family's** (**the refusal · the structural reason · `zones.md` `§4.4 S-6`'s sentence** *"the row may not be moved to the `ui` leg silently"*), **gate 6 must be stated as `STRUCTURAL` or as an OWED LIVE BATTERY — and the word `waived` is forbidden** — **and the determination turns on whether a *rendered* overlay exists**, which is the same fork step 2 raises as its layer finding (`§3.1` finding 4) | **If this unit's surface can be rendered, gate 6 is a MANDATORY live battery the unit owes and cannot carry from the node suite; if it cannot, the `[U]` refusal must be three-part and structural.** **Both readings are currently unfiled, and a `[D]` claim would need a `RENDERED SURFACE` this unit authors none of** |
| **THE REGISTER / `§0` AXIS** | **10** | **THE REGISTER'S FOUR DOMAINS ARE NOT NAMED — and no register exists.** `AGENTS.md` item 11 requires typed rows (`P-IM`/`P-SM`/`P-TP` — **never an `F-` row, never a `§6`/`FS-n` citation used as a register row**), executed deterministically, each row reporting **strategy id + held/broken**, caps **≤100/row · ≤400 total · stop-after-5-consecutive-failures**, **an un-run row reported as a FAILURE**, and **the attempt total printed WITH its per-row terms**. **The family's landed practice declares FOUR DOMAINS up front** (the `E8` register's: the setting domain · the closed environment domain · the removal/echo domain · the opaque never-interpreted domain) — **and this unit has named NONE** (the obvious candidates being the transition domain, the inert-member domain, the target/absence domain and the re-parent domain, **none of which the charter pins**) | **`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` binds before the red set; a unit with an unpinned state set cannot type its `P-SM` rows** (`§2.1` finding 2) |
| | **11** | **WHETHER THE `§0` SIX-ROW PROHIBITION TABLE **AND** THE TYPED REGISTER LAND *BEFORE* THE RED SET.** `H-r8` requires **a shared `§0 Contract-prohibitions` block in every adopted unit spec, one row per prohibition, and each row must NAME the test that pins it** (a prohibition citing *"a static source row"* with no id is not a row) — **and `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `H-r8` row lists `overlay.md` among the six specs that must carry it**. **The finding: the ordering is unstated** — the register is a pre-red obligation by ruling, while the `§0` table's own ordering relative to the red set must be **stated** rather than assumed | **Two pre-red obligations with an unstated order is a delegation-gate hazard** (`AGENTS.md` item 9: a unit is delegable only once its contract exists **and** a TestWriter has run and reported the red set) |
| **THE DISPOSITION AXIS** | **12** | **WHICH FINDINGS ARE ARCHITECT-RULED VERSUS FILEABLE DEFAULTS IS NOT SAID.** The `E5-B-3`/**`E5-B-1`** and `E7` precedents distinguish **(a) a genuine architect-owned question the contract cannot answer** (a blocker under `AGENTS.md` item 10a) from **(b) a `FILEABLE` RECORDED WORKING DEFAULT with an architect-reversible alternative** (*"it does NOT gate the filing"*) — **and the proposal's twelve findings are not sorted into those two classes**, so the next pass cannot know which of them stop the chain | **Without the split, every finding reads as a blocker** — which is how a gate stalls on questions that the family's own form settles by a recorded default plus a dated reversal clause |

### §2.2 Step 1's measured tree facts, as filed

**These are the step-1 reviewer's own read-only measurements, carried here VERBATIM IN SUBSTANCE.** **The filing
pass re-read the two file-level rows it could confirm without a shell, and both are marked; the rest stand as the
reviewer's reading and are NOT re-measured here.**

| # | The step-1 fact, as returned | This filing pass's note |
| --- | --- | --- |
| **1** | **`src/**` HAS *NO* OVERLAY / DIALOG / MODAL / POPOVER / FOCUS-TRAP / PORTAL SURFACE OF ANY KIND, AND NO DOM `inert` ATTRIBUTE.** **`inert` appears in `src/**` ONLY as DEGRADATION PROSE — in `gutter.ts`, `gesture-session.ts` and `main.ts` — never as an attribute, a prop write or a member.** | **CARRIED, not re-measured.** The consequence is the same one `U-THEME`'s step 1 returned: **the whole contract is a FORWARD DECLARATION with nothing in-repo to reverse-engineer from** |
| **2** | **NO OVERLAY MCP TOOL AND NO OVERLAY RESOURCE.** | **CARRIED, not re-measured.** The contract must assert MCP negatives as **SET EQUALITY AGAINST NAMES**, never as a count (`S-ML-6`'s rule) |
| **3** | **`src/shared/dom-shim.ts` CARRIES `removeAttribute` PLUS `parent` / `appendChild` / `remove()` NODE-MOVE BOOKKEEPING.** | **CONFIRMED BY READING THE FILE THIS PASS:** `removeAttribute(k)` at `:158` (with its documented *"Mirrors `HTMLElement.removeAttribute` for the shim's two bookkeeping"* clause), `parent` at `:51`, `appendChild` at `:117` (setting `c.parent = this` at `:121`), and the `remove()`-shaped removal at `:185-188` (splicing out of `this.parent.children` and nulling `this.parent`). **THIS ROW IS THE FOUNDATION OF THE STALE-PREMISE FINDING (`§2.1` finding 8) AND OF THE COLLISION FINDING (`§2.1` finding 6): the re-parent verbs the charter talks about ALREADY EXIST IN THE SHIM'S BOOKKEEPING — `H-r5`'s list forbids `closest`/`querySelector(All)`/`dispatchEvent`/pointer capture/`matchMedia`/`activeElement`/`setProperty`/a render-count seam, and node-move bookkeeping is NOT in that list** |
| **4** | **`docs/specs/ci-divergence-leg.md` `§A-2`/`§A-3` (the landed `H-r10`) ALREADY PINS `inert`** — as **`scenarioEnvelope('props-falsy-toggle')`'s BOOLEAN MEMBER**, read by a **SET-WISE attribute extractor**. | **CONFIRMED BY READING THE SPEC THIS PASS.** `§A-3.1` names the pinned member as **`inert`** (the member the pin's closed set admits at `0.5.1`; a second member, `readonly`, only as its own row); `§A-3.4` fixes **three extraction points** (P1 after load · P2 after the falsy-OFF write · P3 after the nullish REMOVAL); `§A-3.5` pins **presence at P1 and ABSENCE at P2/P3 on BOTH hosts** and **forbids asserting a serialized form**; `§A-2.2`/`§A-2.5` pin the extractor's return as a **SET of attribute NAMES** compared by **set equality, never a substring diff, never a count**; and `§A-1.5` closes the kind set at **two** members with the rule *"A third kind is a new contract row, not a free choice."* **This is the fact behind step 1's finding 7 and step 2's finding 3** |

### §2.3 What step 1's `FLAWED` verdict does and does not mean

**`FLAWED` is a verdict on the PROPOSAL, and it is the strongest negative this family's step 1 returns.** **It does
NOT mean the unit is refused**: the upstream adoption (`SCH-12` `ADOPTED-RESHAPED`) is **an architect disposition
and is not re-opened here**, and the closed capability floor (`§1`) removes the one ground on which the pre-amendment
refile rested. **What it means is narrower and harder: twelve questions stand between the charter's three part-names
and a filable contract, and NOT ONE of them is answerable from the charter, the disposition or the amendment as
written** — **six of them (the unpinned-contract axis) are contract content, three are harness/layer content, one is
a tracker-cell contradiction, one is a pre-red ordering question and one is a disposition question.** **Steps 3 and
4 would have begun to close them; they have not run (`§4`).**

---

## §3 STEP 2 — `role_critique`: **`FLAWED`**, eight findings and three architect questions

**The verdict and the count are the step-2 reviewer's return.** **The step-2 pass held NO SHELL** (`§`-header
limitation 2), so **these findings are derived from the charter, the upstream dispositions and the landed records —
none from a measurement.** **The grouping is this filing pass's; the findings are the reviewer's.**

### §3.1 The eight findings

| # | The finding | The collision / the demanded reconciliation |
| --- | --- | --- |
| **1** | **THE DECLARATION IS UNTYPED.** The charter says *"the mechanism returns/records the inert set"* — **which is a bare NOUN, exactly the reading step 2 condemned in `E8`'s `declaration-only` applier.** **The four candidate readings: a RETURNED WRITE** (the `theme.md` shape: a `{name, value, removal}`-class record whose removal case is **DATA**), **a MODULE-OWNED CONSTANT** (the `E5-B-1` shape: an opaque constant **returned as text and never applied**), **a CALLBACK**, or **a RECORDED set** (a mutation of module state, which no landed mechanism here has). **AND IF IT IS A RETURNED WRITE, WHICH OF `<attribute name, boolean, element identity>` THE MECHANISM CHOOSES IS UNSTATED** | **THE `inert` COLLISION MUST BE RECONCILED:** the divergence leg has **already pinned `inert`** as `props-falsy-toggle`'s boolean member with a set-wise extractor (`§2.2` row 4) — so **a mechanism that mints an `inert` attribute name is minting a name another contract already owns**, and `H-r8` prohibition 1 (no consumer vocabulary as symbols/enumerated constants) is the clause that decides it. **`U-THEME`'s pinned resolution — a caller-supplied name echoed verbatim by identity, with `String()`/`toString`/`valueOf` never consulted — is the family's answer to the same question** |
| **2** | **THE RE-PARENT HALF IS A DOM MUTATION THE MECHANISM MAY NOT PERFORM.** *"Where the overlay's node goes, and that it is returned/released on close"* is, read literally, **a move of a live node** — which is **`appendChild`/`remove()` territory**: precisely the verbs `menulib.md` `§3.4 R-1`(e) bans **over its own module's bytes**, and precisely the class `E5-B-1` refused for the container declaration. **The finding names the three honest forms: a RETURNED PLAN** (the move described as data, performed by the consumer) · **A CONSUMER OBLIGATION** (a documented duty with a declared degradation) · **or an UNPROVABLE CLAIM** (a claim no layer this repo owns can carry — `H-r8` prohibition 6) | **A mutation the mechanism performs makes the unit's proof obligation a `[U]`/live-battery claim it may not be able to carry** — while **a refused mutation keeps it a pure mechanism and gate 6 `STRUCTURAL`**, exactly the `E5-B-1` fork |
| **3** | **THE REAL-DOM `inert` ROW ALREADY EXISTS** as the engine's **`props-falsy-toggle`** scenario (the landed `H-r10`). **THE FINDING'S QUESTIONS: what would THIS UNIT'S ROW *ADD*, and is the honest claim the `M-46` `UNMEASURABLE → CONSISTENT` CONVERSION the leg EXPRESSLY SAYS WAS NOT MADE?** **THE EVIDENCE, quoted: `docs/specs/engine-drift-measurements.md`'s `M-46` reads `UNMEASURABLE`, its own text says *"Per §6 stop condition 8 this row may never be reported as `CONSISTENT`"*, its revisit condition is *"`H-r10`'s attribute-presence extractor lands"* — and `M-42` stands as the NEGATIVE EVIDENCE** | **A unit may not collect credit for another contract's landed row**, and **a status conversion the leg forbids is a fabricated claim if it appears in a DONE row** — so **whether this unit owes a real-DOM row AT ALL, and by which unit, is a question for the architect** (`§3.2` `Q3`) |
| **4** | **THE LAYER / GATE-6 QUESTION, UNRESOLVED.** **`[T]` covers the state machine; `[D]`'s attribute extractor IS THE ENGINE'S** (the `H-r10` channel, landed by `U-DIVERGENCE-EXT`, not by this unit); **and the open question is whether A RENDERED OVERLAY makes this a UI UNIT owing the MANDATORY LIVE BATTERY of gate 6 — or whether its rendering is the CONSUMER's** (in which case the `[U]` refusal must be the family's three-part form and gate 6 is `STRUCTURAL`) | **The fork decides the whole leg set, the register's layer column and the `§7.1` predicate decision** — and the family's rule is that a `[U]` row **may not be moved to the `ui` leg silently**, while `[D]` needs a rendered surface this unit authors none of |
| **5** | **THE UNIT-BOUNDARY RECOMMENDATION: a NARROWER MECHANISM, WITH THE RE-PARENT HALF *REFUSED*.** **The precedent is exact: the FOCUS-TRAP half was refused** (it needs `document.activeElement` plus a focusable walk — the shim has none and this repo will not grow it), and it **stays refiled to the fork**. **Step 2 recommends the same treatment for the re-parent half if findings 1/2 do not resolve it into DATA** — leaving a mechanism that is a **state machine + an inert declaration**, both of which have landed shapes to copy | **A refusal that is *stated* is an honest narrowing; a refusal that is *silent* is a charter violation** — so if this boundary is taken, **`SCH-12`'s residual must be re-stated as refiled, not dropped** |
| **6** | **THE PROCESS OBLIGATIONS (first group) — the `§0` table, the SEMANTICS TABLE, the COLLISION REPORT, the LAYER MAP and the REGISTER are ALL OWED and NONE exists.** **The `§0` six-row prohibition table with a NAMED test per row (`H-r8`); the semantics table with NO `undefined-until-answered` row (`H-3`: no bare identifier in a contract); the collision reconciliation in the *"banned in layer X for reason Y, legitimate in layer Z because …"* form, with the scan row NAMING its exemptions or standing vacuous; the layer map; and the typed `§5.x` register with totals printed WITH their terms** | **These are the five artifacts that distinguish a filable contract from a charter restatement** — and findings 1–5 of `§2.1` are exactly what they would have to answer |
| **7** | **THE PROCESS OBLIGATION (second): the DERIVED DENIED SET, answering *"is there a path from the application's entry point to this mechanism?"*** — `UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`'s rule is that **each unit's DENIED set is DERIVED from that unit's own charter, never copied from a sibling**, **named first in the contract**, with the entry-point question **answered explicitly and never inherited** | **The answer turns on finding 4's fork**: an importable-and-rendered mechanism HAS a path; an importer-less pure mechanism does not — **and the two answers imply different `§5.1` deny sets and different gate-6 outcomes** |
| **8** | **THE PROCESS OBLIGATION (third): a `ci-divergence-leg.md` AMENDMENT IF A THIRD `SCENARIO_KINDS` MEMBER IS ADDED.** **The landed leg's kind set is CLOSED AT TWO** (`'demo'`, `'props-falsy-toggle'`) **and its own clause reads *"A third kind is a new contract row, not a free choice"*** — **so a real-DOM `inert` row this unit authors through a new kind is an AMENDMENT to a landed contract, with its own row, its own `[EXT]` tally arithmetic and its own re-pin analysis** (`m = 4` at the landed leg, and **`A-4.1` takes no re-pin**) | **A kind added without the amendment is a contract violation dressed as an implementation detail** — and the leg's fail states (`EXT-F1`…`EXT-F6`) are the rows that would catch it |

### §3.2 Step 2's THREE ARCHITECT QUESTIONS, carried verbatim in substance

**These are the reviewer's questions, not this filing pass's and not rulings. STEPS 3 AND 4 HAVE NOT RUN, so NO
question below has been derived, pinned, or dispositioned anywhere** — the column that in the sibling records reads
*"Where step 3 landed it"* reads **`NOT RUN`** here, and that is the whole difference this record's state makes.

| # | The question | Status on this record |
| --- | --- | --- |
| **`Q1`** | **THE DECLARATION'S OWNERSHIP AND RETURNED FORM** — *is the inert set a RETURNED write (and if so, which of `<attribute name, boolean, element identity>` the mechanism chooses), a MODULE-OWNED CONSTANT returned as text, a CALLBACK, or module-recorded state? And who APPLIES it?* | **`NOT RUN` — no derivation exists.** **The family's two live precedents are `E5-B-1` (returned text, never applied) and `E8`'s returned `{name, value, removal}` record with the removal case as DATA; neither has been adopted for this unit** |
| **`Q2`** | **THE RE-PARENT'S PROVABLE STATUS** — *is the re-parent half a RETURNED PLAN, a CONSUMER OBLIGATION, or a claim no layer this repo owns can carry — and if the latter, is the half REFUSED (the focus-trap precedent) and re-stated as refiled?* | **`NOT RUN` — no derivation exists.** **This question and step 2's finding 5 are the same fork seen from two sides** |
| **`Q3`** | **WHETHER A REAL-DOM ROW IS OWED AT ALL, AND BY WHICH UNIT** — *given that `props-falsy-toggle` already pins `inert` on the real DOM through the `H-r10` channel, does `U-OVERLAY` owe a real-DOM row, and is the honest claim the `M-46` `UNMEASURABLE → CONSISTENT` conversion the leg expressly says was NOT made?* | **`NOT RUN` — no derivation exists.** **The leg's own rule (`§A-1.5`) and the measurements record's own stop condition (`M-46`) are the two clauses that constrain any answer** |

**THE HONEST FORM OF THIS SECTION: THREE QUESTIONS, NO ANSWERS, AND NO DEFAULT RECORDED BESIDE ANY OF THEM.** **The
sibling records could file a `FILEABLE` working default next to each question (the `E5-B-3` form) because a step-3
derivation existed to be defaulted *from*; here there is none** — so **a later pass must NOT read these three as
"answerable by recorded default"**, and **this record deliberately does not manufacture defaults it did not derive.**

---

## §4 STEPS 3 AND 4 — **`NOT RUN`**

**STEP 3 (`role_architecture_review`) HAS NOT RUN. STEP 4 (`role_change_analysis`) HAS NOT RUN. NO VERDICT IS
CARRIED BY THIS RECORD, AND THIS IS THE RECORD'S MOST IMPORTANT LINE.**

**THE CONSEQUENCES, STATED PLAINLY SO NO READER INFERS A GATE THAT CLOSED:**

1. **THERE IS NO VERDICT.** Not `DELEGABLE`, not `DELEGABLE-WITH-CONDITIONS`, not a conditions set (`C-*` or
   `G-*`) — **because no pass derived one.** **Gate 1 is NOT complete as a review on this record's own state**,
   unlike `docs/specs/theme-review.md` and `docs/specs/menulib-review.md`, **whose four steps are carried and
   whose verdicts therefore exist.**
2. **THE UNIT IS *NOT DELEGABLE*, ON TWO INDEPENDENT GROUNDS.** **(a)** **`AGENTS.md` item 9**: a code unit is
   delegable only once **its `docs/specs/*.md` contract exists** — and **`docs/specs/overlay.md` does not exist**
   (`§5`). **(b)** **`AGENTS.md` item 11** (`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`): a code-bearing unit's spec
   **MUST carry its typed `§5.x` register BEFORE its red set is authored**, and **the zero-row exemption is
   unavailable to a code-bearing unit** — **the unit is code-bearing (its charter lands a `src/shared/`
   mechanism), and no register exists because no spec exists.**
3. **NO PROPOSAL WAS RESOLVED INTO A SHAPE.** **Steps 3 and 4 are the two passes that would have turned the
   charter's three part-names into a filable surface, a layer map, a register sketch and a filing checklist** —
   **and the twelve + eight findings above are precisely the material those passes exist to work through.**
4. **THE GATE'S OWN SEQUENCE IS UNAFFECTED BY THIS RECORD.** **Step 3 requires both step outputs (they exist
   now, filed here) and step 4 requires step 3's** — so **the chain may resume at step 3**, and **nothing in this
   filing shortens, skips or pre-judges it.**

---

## §5 WHAT THIS RECORD DOES *NOT* DO

**Stated as its own section because the negative half of a gate record is the half a later pass over-reads.**

1. **NO CODE.** **No `src/**` file was written, edited or even proposed here** — **there is no `src/shared/` overlay
   module, and this record does not sketch one.**
2. **NO RED SET.** **No test file was written, no failing set was run, and no TestWriter was delegated anything**
   (`AGENTS.md` items 3/9) — **and none is delegable off this record** (`§4` item 2).
3. **NO REGISTER.** **No typed `§5.x` rows, no domains, no terms, no caps, no seed and no strategy ids exist for
   this unit** (`§2.1` finding 10) — **and none is sketched here, because the register's own domains depend on
   findings that are unresolved.**
4. **NO STATUS FLIP — AND THE LEDGER IS UNMOVED.** **No tracker row, no ledger cell, no `## OPEN`/`## DONE`
   label, no count and no queue pointer was changed by this pass.** **THE LEDGER READS EXACTLY AS IT DID BEFORE
   THIS RECORD: `17 DONE / 4 open` UNITS = `21` units** (`17 + 4 = 21`; the table's identity clause
   `2 engine + 2 harness + 4 (D) + 10 (E) + 3 (F) = 21` holds), **the open set being `E9` `U-OVERLAY` · `F1`
   `U-THEME-CONTROL` · `F2` `U-FOCUS-MODEL` · `F3` `U-FOCUS-TOOL` = `4`**, with **`22` live rows = `21` unit rows
   + the non-unit fork row `F4`** and **the `MOVED TO DONE` label set identical to the `DONE` set at `17`.**
   **`E9` REMAINS AN OPEN ROW AND IS STILL THE LIVE NEXT ACTION AT ITS SPEC GATE.**
5. **NO CONTRACT FILING.** **`docs/specs/overlay.md` REMAINS `OWED — not filed`** — **it is THE ONE REMAINING
   `E`-GROUP SPEC**, and **a `glob` of `docs/specs/overlay*` returns NO FILES** (this pass's own read). **This
   record does NOT file it, does not stub it, and does not pre-empt any clause of it** — **`E8`'s filing and its
   record shared one pass because `E8`'s four steps had returned; here two have not.**
6. **NO ANNOTATION OF ANY EXISTING FILE, AND NO COUNT MOVED.** **This pass wrote exactly ONE NEW file — this
   record — and edited NO existing file**: **no tracker row, no decision row, no sibling spec and no gate record was
   touched** (`RCA-8(d)`: annotate, never rewrite). **The stale `H-r7` premise is NAMED and NOT REPAIRED here**
   (`§2.1` finding 8, `§6`) — **its reconciliation belongs to the supervisor at the ledger's own site.**
7. **NO REVIEWER RETURN WAS RE-DERIVED.** **The two verdicts, the two finding counts and the three questions are
   the reviewers' returns, filed as substance; the groupings and citations are this filing pass's** — **and no
   reviewer re-read this file before it landed** (`§`-header provenance).

---

## §6 THE PROCESS FINDINGS THIS GATE PRODUCED, AND THE STALE PREMISE

| | Finding | Owner |
| --- | --- | --- |
| **`OV-1`** | **THE STEPS 1 AND 2 REPORTS WERE NEVER FILED — AND THIS RECORD IS THE COMPRESSION THAT CARRIES THEM.** **The same defect the `E4` cycle recorded as `P-1`** (`docs/specs/relocate-review.md` `§5.9`) **and the `E7` cycle as its `§7` `P-1`** (`docs/specs/menulib-review.md`, where the gate-1 record was made the steps' filing home). **HERE THE FILING HOME EXISTS AND THE RECORD IS WRITTEN BY THE FILING PASS, NOT BY THE REVIEWERS** — so **the reviewers' own wording is not recoverable from it**, and **a later reader must not read this file as two filed reviews with a completed gate.** **The `E4`/`E7` precedent is followed in FORM (filing home) and not in OUTCOME (there, the filing pass also filed the contract; here there is none to file).** | **The supervisor** (it owns gate boundaries and `RCA-8(a)` commits) — **the FILING half is discharged by this pass; the PROCESS half stays `OPEN`, now three instances deep in the `E`-group** |
| **`OV-2`** | **THE STALE `H-r7` PREMISE IS RECORDED FOR THE SUPERVISOR TO RECONCILE AT ITS OWN SITE — AND THIS PASS DOES NOT RECONCILE IT.** **The stale reading: `docs/next-steps.md`'s `## OPEN` row `E9`'s `Blocked on` cell (its dated close-out annotation) and the same file's `§4` item 4 both say *"the `H-r7` completion … `OWED`"*.** **The landed evidence that contradicts it: `src/shared/dom-shim.ts` `:158` carries `removeAttribute(k)` (read this pass); `docs/decisions.md`'s `SHIM-COMPLETION-CARVE-OUT` / `ENGINE-PIN-VALUE-SLOT-CLEAR` are ACTIVE and record it landed; `docs/specs/mount-invariant-guard.md` says it is *"already landed and is not this unit's to touch"*; `docs/defects.md`'s harness-gap entry reads *"LANDED and green"* with a standing instruction that a later pass must not re-open it; and `U-ENGINE-PIN` is `DONE`.** | **The supervisor's reconciliation pass** — a cell repair, `RCA-8(d)`-safe (**annotate beside, never rewrite**). **A repair is a documentation act; it gates no unit** |
| **`OV-3`** | **NO LEG WAS RUN AND NO SHELL WAS HELD BY THE PASS THAT WROTE THIS RECORD.** **The step-2 reviewer also held no shell; step 1's shell was used for read-only searches only** (its facts are `§2.2`). **Every figure here is a read, a quote or a derivation, and NO later pass may quote any figure here as a measurement of its own** (`RCA-12`). | **The supervisor**, at gate 9 (its measurement is the only one that counts) |
| **`OV-4`** | **THE FILING'S OWN EXTENT, STATED SO IT IS ATTRIBUTABLE:** this pass wrote **exactly ONE NEW file — `docs/specs/overlay-review.md` — and edited NOTHING ELSE**; **no tracker row, no decision row and no sibling spec was changed**; and **the new file is untracked and must be committed by the supervisor** (`RCA-8(a)`/`(c)`) — **a gate that leaves a session rather than a commit is the `P-1`-class loss the rule exists for.** | **The supervisor** |

**THE MEASUREMENTS THIS PASS DID TAKE, named so they are attributable rather than implied:** **(a)** a `glob` of
`docs/specs/overlay*` (**NO FILES**); **(b)** a read of `src/shared/dom-shim.ts`'s `removeAttribute` / `parent` /
`appendChild` / removal sites (**`:158`**, **`:51`**, **`:117`/`:121`**, **`:185-188`**); **(c)** a read of
`docs/specs/ci-divergence-leg.md`'s `§A-2`/`§A-3` (**the set-wise extractor, the three extraction points, the pinned
`inert` member, the two-member closed kind set**); **(d)** a read of `docs/pending.md`'s `SCH-12` row and its
`UPSTREAM-CAPABILITY-FLOOR` row (**the closed floor**); **(e)** a read of `docs/decisions.md`'s
`SHIM-COMPLETION-CARVE-OUT` / `ENGINE-PIN-VALUE-SLOT-CLEAR` and of the `docs/next-steps.md` row `E9` with its
`§4` pickup items; **(f)** a read of `docs/specs/menulib.md` `§3.4 R-1`(e) (**the `focus(`/`blur(`/`appendChild`/
`removeAttribute` ban and its module scope**); and **(g)** a read of `docs/specs/engine-drift-measurements.md`'s
`M-46`/`M-42`/§6-stop-condition row (**`UNMEASURABLE`, and the conversion the leg forbids**). **All seven are
read-tool results, and none is a leg.**

---

## §7 WHAT MUST HAPPEN NEXT, IN ORDER

1. **RE-RUN STEP 3 (`role_architecture_review`)** against the two filed step outputs — **it is the pass that turns
   the twenty findings into a shape, a layer map, a collision reconciliation and a register sketch** — **and then
   step 4 (`role_change_analysis`)**, which requires step 3's output. **Neither may be skipped, and neither is
   pre-judged by this record.**
2. **SETTLE THE THREE ARCHITECT QUESTIONS (`§3.2` `Q1`/`Q2`/`Q3`) — NOW, AND AS QUESTIONS, because no default
   exists beside any of them.** **`Q1` (the declaration's ownership and returned form) and `Q2` (the re-parent
   half's provable status, with the focus-trap precedent as the named alternative) are the two that decide most of
   the twelve + eight findings; `Q3` (whether a real-DOM row is owed at all, and by which unit) decides the leg
   cell and the `[D]` claim.** **A ruling on any of them lands as a `DECIDED:` row in `docs/decisions.md` with its
   consequences pinned in the sibling form.**
3. **RECONCILE THE STALE `H-r7` PREMISE AT THE LEDGER'S OWN SITE** (`OV-2`) — **annotate beside, never rewrite**
   — **so no later pass re-files or re-opens a landed completion.**
4. **FILE `docs/specs/overlay.md` ONLY AFTER steps 3 and 4 return** (`AGENTS.md` item 9), **carrying the `§0`
   six-row prohibition table with a named test per row, the semantics table with no `undefined-until-answered`
   row, the collision reconciliation for the seven tokens in the demanded form, the derived DENIED set with the
   entry-point question answered, the layer map, the gate-6 statement (`STRUCTURAL` with its falsifier, or the
   live battery — the word `waived` is forbidden either way), and the typed `§5.x` register with its four domains
   declared and its totals printed WITH their per-row terms** (`AGENTS.md` item 11). **Its register lands BEFORE
   any red set.**
5. **ONLY after the spec gate: the TestWriter red** (`AGENTS.md` items 9 + 11) — **never before.** **Then item
   10a's autonomy clause carries the unit through gates 3–10 without further permission.**
6. **IF, AND ONLY IF, the architect takes step 2's narrower-mechanism recommendation, RE-STATE `SCH-12`'s
   refusals in `docs/pending.md`'s own row** — **a refused half that is not re-stated as refiled is a silent
   charter change** (`§3.1` finding 5).

**WHAT REACHES THE ARCHITECT, AND WHEN: `Q1`, `Q2` AND `Q3` — AND THEY ARE A REAL BLOCKER, NOT A FORMALITY.** **On
this record there is no derivation to default them into** (`§3.2`), **`docs/specs/overlay.md` is unfiled and
unfilable without them, and step 3 is the pass that would have put a derivation on the table.** **A reversal of
`Q2` toward the refused half moves the unit's `§5.1` deny set, its gate-6 outcome and its register domains; a `Q1`
pin moves the declaration's whole shape; and a `Q3` answer decides whether this unit owns a leg row at all.**

**WHAT IS NOT OWED AND MUST NOT BE MANUFACTURED: no `[U]`/`[D]` row** (both are step 3's or step 4's to derive, and
neither has run) · **no register sketch** (item 11 binds the *spec*, and there is no spec) · **no conditions set
`C-*`/`G-*`** (no pass derived one) · **no re-opening of `SCH-12`'s adoption or of the `UPSTREAM-CAPABILITY-FLOOR`
row** (the floor is `CLOSED` and the adoption is an architect disposition) · **and no `DONE`-shaped sentence about
this unit anywhere** (`E9` is an OPEN row).
