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

## §4 STEPS 3 AND 4 — **`NOT RUN`** — **⟶ ANNOTATED 2026-09-27 (THE SUPERVISOR'S DOC-WRITER PASS): STEP 3 (`role_architecture_review`) HAS SINCE RUN AND THIS SECTION NOW CARRIES ITS SUBSTANCE (appended at this section's foot); STEP 4 (`role_change_analysis`) HAS *NOT* RUN. THE HEADING'S OWN BYTES STAND, THE SECTION IS NOT RENUMBERED, ITS ITEMS KEEP THEIR NUMBERS, AND THE STALE CLAUSES IN THEM ARE NAMED IN THE APPENDED BLOCK RATHER THAN REWRITTEN (`RCA-8(d)`).**

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

**⟶ STEP 3'S SUBSTANCE, LANDED IN THIS SECTION 2026-09-27 (THE SUPERVISOR'S DOC-WRITER PASS — an APPEND, not a rewrite: the heading above, items 1–4, their counts and this section's number are UNMOVED, and every stale clause in them is *named* here instead of edited).** **STEP 3 (`role_architecture_review`) HAS RUN — READ-ONLY, AND IT WROTE NO FILE** — **so its return is filed here as substance, by the same filing-home precedent the `§`-header provenance and `§6` `OV-1` already set for steps 1 and 2** (the `E4`/`E7` precedent: the gate-1 record is the steps' filing home). **STEP 4 (`role_change_analysis`) HAS *NOT* RUN** — **THEREFORE THERE IS STILL NO STEP-4 VERDICT, THE CHAIN IS STILL INCOMPLETE AT ITS FINAL STEP, AND THE FILING OF `docs/specs/overlay.md` STILL *WAITS ON IT*** (`AGENTS.md` item 9; `§7` items 4–5). **THE CLAUSES THIS ANNOTATION SUPERSEDES BY NAME, KEPT VISIBLE: the `§`-header's *"STEP 3 … HAS NOT RUN"* and *"THEREFORE THIS RECORD CARRIES NO VERDICT"* clauses; this section's item 1 (*"THERE IS NO VERDICT"*); item 3 (*"NO PROPOSAL WAS RESOLVED INTO A SHAPE"*); item 4's *"the chain may resume at step 3"*; `§5` item 6's *"edited NO existing file"*; and `§7` item 3's `OWED` stale-premise reconciliation** — **their bytes and their counts stand as their own passes' readings, and no section number, count or cell value has been moved to accommodate this append.**

**THE VERDICT STEP 3 RETURNED: `DELEGABLE-WITH-CONDITIONS` — AND NO ARCHITECT BLOCKER SURVIVES IT.** **Step 3 reduced step 2's THREE architect questions (`§3.2` `Q1`/`Q2`/`Q3`) to FOUR FILEABLE WORKING DEFAULTS, each architect-reversible and each filed for CONFIRM-OR-REVERSE at the spec gate** — **the `E5-B-3` form, i.e. class (b) of `§2.1` finding 12** (*"it does NOT gate the filing"*) — **so `§3.2`'s closing clause *"THREE QUESTIONS, NO ANSWERS, AND NO DEFAULT RECORDED BESIDE ANY OF THEM"* is superseded by this annotation: four defaults now sit beside them, and the questions are no longer questions for the architect to answer blind.** **THE FOUR DEFAULTS: (1) the declaration's form is a RETURNED WRITE; (2) the re-parent half is a REFUSAL; (3) the `inert`-row disposition — `[D]` NOT CLAIMED and `M-46` NOT CONVERTED; (4) the layer / gate-6 block.** **THE DERIVATION, WHICH THIS RECORD MUST CARRY:**

1. **THE STALE PREMISE, RESOLVED AS A CELL REPAIR (this is `§2.1` finding 8 / `§6` `OV-2`, and it is the one item on this list that is a TRACKER act, not a contract act).** **THE STALE SITES ARE TWO AND ONLY TWO: the `E9` ledger row's `Blocked on` cell and `§4` item 4 of `docs/next-steps.md`, both still reading the `H-r7` completion as OWED while BOTH ITS HALVES ARE LANDED** — **the shim half (`src/shared/dom-shim.ts`'s `removeAttribute`, `:158`, `§2.2` row 3) and the divergence leg's member (the landed `H-r10`, the pinned `inert` member and set-wise extractor at `docs/specs/ci-divergence-leg.md` `§A-3`, `§2.2` row 4), with `SHIM-COMPLETION-CARVE-OUT` ACTIVE** — **and the supervisor ANNOTATES BESIDE THOSE TWO CLAUSES, never rewriting them.** **THE ONE ROW THAT REMAINS ITS OWN IS `M-46`'s MEASUREMENT STATUS** (`docs/specs/engine-drift-measurements.md`: `UNMEASURABLE`, its own §6 stop condition, its own negative evidence `M-42`) — **it is that row's owner's, not this ledger row's, and this annotation does not convert or re-file it.** **IT BLOCKS NO GATE: `E9` sits at its SPEC GATE on its own chain.**
2. **THE `inert` ROW IS ALREADY SPENT, SO `[D]` MAY NOT BE CLAIMED — THE `Q3` DEFAULT, AND IT IS THE STRICTEST OF THE FOUR.** **The landed `H-r10` leg already pins `inert`** (its pinned `inert` member, the set-wise attribute extractor, the three extraction points P1/P2/P3, and the express bar on asserting a serialized form — `§2.2` row 4) — **SO: NO THIRD `SCENARIO_KINDS` MEMBER and NO `ci-divergence-leg.md` amendment** (the leg's kind set stays CLOSED AT TWO; *"a third kind is a new contract row, not a free choice"`), **and a row this unit might "owe" would measure only the CONSUMER'S OWN APPLIED WRITE — which NO LAYER THIS REPO OWNS CARRIES** (**`H-r8` prohibition 6**). **AND `M-46` MAY NOT BE CONVERTED** (that row's own stop condition and its own negative evidence). **THEREFORE `[D]` MAY NOT BE CLAIMED AT ALL — the unit files `PRECONDITION-GATED`, exactly as the two sibling units file it.** **`§3.2` `Q3` IS ANSWERED BY A RECORDED WORKING DEFAULT: no real-DOM row is owed by this unit, and no status conversion is made.**
3. **THE MODULE BOUNDARY, AS DERIVED (`Q1`'s and `Q2`'s default): `src/shared/overlay.ts`.** **TWO VALUE EXPORTS** — `overlayTransition(state: unknown, verb: unknown): OverlayTransition` and `overlayInertDeclaration(target: unknown, attributeName: unknown, inert: unknown): OverlayInertWrite` — **plus THREE TYPE DECLARATIONS** (`OverlayState` · `OverlayTransition` · `OverlayInertWrite`). **A CLOSED FOUR-STATE SET — `'closed' | 'open' | 'held' | 'closing'` — with every non-moving cell answering its own state and NO refusal state** (**the `§2.1` finding 2 / `P-SM` pin**). **THE RETURNED SHAPES: `OverlayTransition = {state, changed}` with `changed === (next !== previous)`; and `OverlayInertWrite = {name, value, removal, target}` — the `E5-B-1` RETURNED-WRITE form, NEVER a constant string and NEVER a stamped `inert` literal — with `removal = (value !== true)`, and `target` ECHOED BY IDENTITY AND NEVER CONSULTED** (the `E8`/`U-THEME` caller-supplied-name precedent: verbatim by identity, no `String()`/`toString`/`valueOf`). **AN EMPTY SEAM SET.** **AND THE RE-PARENT HALF IS *REFUSED* — the focus-trap treatment step 2 recommended (`§3.1` finding 5), now the `Q2` default: the mechanism holds NO NODE REFERENCE, NO `appendChild`/`remove`/`parent` VERB AND NO PLAN**, **because a returned plan is a move with no observable on any layer this repo owns** (`H-r8` prohibition 6) — **and THE ELEMENT IDENTITY AND THE POST-CLOSE OWNER ARE CALLER-SIDE, stated as a refusal and NEVER SILENTLY DROPPED** (the `§3.1` finding 5 rule; `SCH-12`'s residual must be re-stated as refiled, `§7` item 6).
4. **LAYER, GATE 6, AND §7.1 — THE FOURTH DEFAULT.** **`[T]` for the state machine, for the declaration and for every static row.** **`[H]` for `typecheck` / `build` / `typecheck:tests` and for the standalone strict `tsc` over the three type names.** **THE THREE-PART `[U]` REFUSAL** (the refusal · the structural reason · `zones.md` `§4.4 S-6`'s sentence — the row may not be moved to the `ui` leg silently). **`[D]` NOT CLAIMED** (item 2 above). **GATE 6 IS `STRUCTURAL`, NEVER WAIVED — `waived` is forbidden** — **reason: no `src/**` importer, in no built output, and it writes nothing; FALSIFIER: a diff scope containing `src/renderer/**`, `src/main/**`, a demo-envelope edit, or an authored element/attribute/class write.** **AND `§7.1` `DOES NOT TRIGGER`, with its evidence and the SAME falsifier, the exemption recorded with its reason.** **This settles `§2.1` finding 9 and `§3.1` finding 4's fork: the rendering is the consumer's, so no MANDATORY live battery is owed and no `[U]` row is moved anywhere.**
5. **THE PROHIBITION AUDIT: PASSES.** **The states and the verbs are INSTRUMENT vocabulary, not consumer vocabulary** (**the caller's `target` token and the attribute name pass through, exempt by name, NEVER interpreted** — `H-r8` prohibition 1). **AND THE SIBLING SCAN ROW IS RECONCILED, NOT ASSUMED** (`§2.1` finding 6): **`docs/specs/menulib.md` `§3.4 R-1` clause (e)'s ban on `focus(`/`blur(`/`appendChild`/`removeAttribute` is SCOPED TO THAT MODULE'S OWN BYTES**, and **this unit's bytes carry NONE of them — the refusal makes the re-parent verbs unnecessary, and the shim's node-move bookkeeping is shim-side and pre-existing** (`§2.2` row 3). **The reconciliation is recorded in the demanded *"banned in layer X for reason Y, legitimate in layer Z because …"* form.**
6. **AN EIGHT-ROW REGISTER SKETCH, `92` DECLARED ATTEMPTS, WITH FOUR DOMAINS NAMED** (the `§2.1` finding 10 / `§2.1` finding 11 obligation, sketched only): **the state set × transition alphabet (`4 × 5 = 20` pairs) · the background-target pool (`17` argument shapes) · the returned-declaration pool (`4` resolved-value shapes) · the node-reference pool (`4`, the refusal's drives)**; **the rows `P-OV-IM-1` `10` · `P-OV-IM-2` `12` · `P-OV-IM-3` `8` · `P-OV-SM-1` the whole matrix `20` · `P-OV-SM-2` `10` · `P-OV-TP-1` `7` · `P-OV-TP-2` `17` · `P-OV-TP-3` `4` · `P-OV-TP-4` `4`**, **TOTAL `92 = 10+12+8+20+10+7+17+4+4`**, **largest row `20 ≤ 100` and total `92 ≤ 400`.** **A COUNT TENSION IN THE RETURN, CARRIED AS RETURNED AND NOT SILENTLY RECONCILED (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): the sketch is returned as an *eight-row* block while NINE row ids are enumerated, and the total `92` is the sum of those NINE terms** — **this is a pre-filing sketch, no register is filed and no figure here is live, so the row count is reconciled at the spec gate, beside the as-returned form.** **NO ROW ID, SEED OR CAP IS MOVED HERE, and the register lands BEFORE any red set** (`AGENTS.md` item 11).
7. **THE DERIVED DENIED SET, NAMED FIRST (the `§3.1` finding 7 obligation): `src/renderer/**` — INCLUDING `index.html` AND `runtime.ts` — `src/main/**`, `src/preload/**`, the demo envelope and the demo path, `scripts/**`, `src/shared/dom-shim.ts` (NO MEMBER — the carve-out is SPENT), any MCP six-site wiring, any stylesheet, and the gate-1 record itself. AND THE ENTRY-POINT QUESTION IS ANSWERED EXPLICITLY: THERE IS *NO* PATH FROM THE APP ENTRY POINT TO THIS MECHANISM.** **The deny set is DERIVED from this unit's own charter, never copied from a sibling** (`UI-UNITS-MAY-TOUCH-THE-RENDERER-WIRING`).
8. **THE VERDICT, AND WHAT IT AUTHORIZES: `DELEGABLE-WITH-CONDITIONS` — YES, FILE `E9` IN THIS SHAPE, WITH THE REFUSALS STATED AND NEVER SILENT.** **The four defaults above are the conditions, all fileable as RECORDED WORKING DEFAULTS with architect-reversible alternatives, for CONFIRM-OR-REVERSE at the spec gate** (`docs/decisions.md`'s `DECIDED:` row when a reversal or a confirmation lands); **and no architect blocker survives, so `§7`'s framing of `Q1`/`Q2`/`Q3` as *"A REAL BLOCKER, NOT A FORMALITY"* is superseded by this annotation, its bytes kept.**

**WHAT THIS APPEND DOES *NOT* MOVE, STATED SO NO READER OVER-READS IT.** **(a) STEP 4 HAS *NOT* RUN — there is still NO step-4 verdict, and the filing of `docs/specs/overlay.md` still waits on it** (`§4` item 4's own sequence rule: step 4 requires step 3's, which now exists). **(b) `docs/specs/overlay.md` REMAINS `OWED — not filed`** (`§5` item 5 stands; this append does not file, stub or pre-empt a clause of it). **(c) NO CODE, NO RED SET, NO REGISTER AND NO STATUS FLIP HAPPENED** — no `src/**` file, no test file, no typed row and no tracker cell was written by the step-3 pass or by this append. **(d) THE LEDGER IS UNMOVED: `17 DONE / 4 open` UNITS = `21` units (`17 + 4 = 21`), the open set `E9` · `F1` · `F2` · `F3` = `4`, `E9` still an OPEN row and still the live next action at its SPEC GATE** (`§5` item 4 stands, every figure). **(e) ONE OWED ROW IS DISCHARGED BY THIS PASS AT ITS OWN SITE: `§6` `OV-2`'s supervision half and `§7` item 3's cell reconciliation are LANDED as annotations beside the two clauses named in item 1 above, in `docs/next-steps.md`** — **an annotation is not a rewrite, and `RCA-8(d)` governs.** **(f) NO SECTION WAS RENUMBERED AND NO COUNT, CELL VALUE OR LABEL MOVED ANYWHERE IN THIS FILE OR IN THE THREE TRACKERS THIS PASS TOUCHES.**

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
