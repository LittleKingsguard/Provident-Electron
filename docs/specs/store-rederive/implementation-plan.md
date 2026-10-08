## Part — implementation plan: the unit's ordered landing/verification plan and its acceptance criterion (`U-STORE-REDERIVE`)

**Contract:** `docs/specs/store-rederive/contract.md` — this part is its **part-map entry `implementation-plan`**, of
**KIND `carrier`** (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.6 · §C.11.6; the map row's KIND
cell, and the `implementation-plan` / `data-class-structure` / `process-flow` carrier set §C.6's dated
amendment note fixes). **It was authored at the architect's request at this spec gate, and its authoring is
the omission→entry conversion the contract's index region records in the same pass** (that contract's
§C.6 binding rule 3; `../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.6 · §C.11.8 part
(v-4)) — **no part was written empty, and no other file of this unit moves.**

**A CARRIER INTRODUCES NO CLAIM OF ITS OWN (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md`
§C.11.6).** **Every statement in this part is one of two things, and there is no third:**
**(a) a POINTER** to the contract clause that already carries a behavioural, surface, fail-state, register,
parameter or duty claim — written `path §n`, path-qualified as **§C.11 applies the ordinary cross-reference
clause (that contract's §C.11.9)** requires — or **(b) a SCHEDULE ROW**, an owner and a position, authorized by
a **rule of this repo** (`AGENTS.md` item n) or by the harness rule's own path. **This part adds NO behavioural
rule, NO new figure or census, NO cap, NO new reason token, NO new register row, NO new `§`-number for the
contract, NO acceptance cell that moves a ledger count and NO new id family**; its own sections are its own
`§P.n` numbers, and they collide with nothing in the contract (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md`
§C.11.6).

### §P.1 The schedule's own statement — **a schedule is NOT an ordering claim**

**The sections below are A SCHEDULE, and a schedule is not an ordering claim**
(`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.0.3: the part map is a **pointer set**
carrying **no order**, and *"a schedule is not an ordering claim"*; the pilot's own plan part is the shape this
one copies — `../Agent Harness/docs/specs/token-budget/implementation-plan.md`, and the phase-table printer at
`../Agent Harness/docs/specs/spec-scope-and-structure/migration-plan.md` §M.1, whose columns are **phase · what
it does · owner · why it is in that position**).

**Three consequences, each falsifiable, so the reader does not have to guess what this part is:**

1. **No citation anywhere depends on a `§P.n` number or on a phase's position in `§P.4`'s table.** A gate
   reached out of the printed order breaks no citation; a `§P.n` section moved in a later bounded pass
   breaks none either (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.0.3).
2. **The order below is the order this repo's own process fixes, and it is cited, not asserted** — the
   chain `red → green → adversarial → blind greens → live → proofreader → doc review → trio → DONE` is
   `AGENTS.md` item 10a's own enumeration, and `RCA-1`/`RCA-2` (that same file, item 3) fix the first two
   positions. **Where this part prints a position, it prints that rule's position.**
3. **This schedule starts nothing.** Authoring it admits no unit row, moves no ledger count, executes no
   register row and touches no freeze — which is the contract's own operative status, **`FILED — HELD AT THE
   SPEC GATE BY THE ARCHITECT`** (`docs/specs/store-rederive/contract.md`, the header block's first dated
   annotation), and is restated as this part's own bound at `§P.7`.

### §P.2 The pre-flight — what must exist before the first red row is authored

**Nothing in `§P.3`–`§P.7` may begin until every line below resolves.** Each line names its source, and
**the one line that is NOT yet satisfied is marked as such** rather than smoothed.

| # | The precondition | Its state, and its source |
| --- | --- | --- |
| **1** | **THE ARCHITECT'S SPEC-GATE GO-AHEAD FOR THIS UNIT.** The contract's own status line makes the successor's spec gate *"the one approval the chain waits for"*; the architect returned **`HOLD — do not start the cycle`** at the gate, and that return is recorded in the header block's first dated `ANNOTATED BESIDE` clause | **NOT YET TAKEN.** `AGENTS.md` item 10a (the only approval the chain waits for; after it the chain runs without further permission, through every repair/remand cycle those gates force, and returns only at FINAL CLOSE-OUT or on a genuine blocker) · `docs/specs/store-rederive/contract.md`, the header block's first dated annotation and its status line |
| **2** | **`Q-2` IS CLOSED — the `R5` `REPLACE` reading is confirmed, so no `KEPT`/`RE-DERIVED`/`DELETED` clause table is owed.** The contract followed `R5` and named the question; the architect's spec-gate return answered it (`R14`) | **TAKEN.** `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 7 (`Q-2`) · `docs/specs/store-rederive/contract.md` §0.2 item 4 · the header block's first dated annotation, ruling **(Q-2)** |
| **3** | **`Q-1` — THE CODE WAVE'S MODULE PATH VERSUS THE FROZEN ARTIFACT'S FIELD-7 EDIT-SET — IS THE ARCHITECT'S TO RULE, AND THIS PLAN DOES NOT RULE IT.** The contract's **declared default** is `src/renderer/store.ts` (NEW), reversible at this gate; the **recommended option** is **(a) a NEW path**, because the successor's surface differs at field 2 **in kind**, so the artifact is amended for a NEW module rather than for a rewritten old one; **option (b) reuse the landed path** blocks `docs/specs/store-rederive/contract.md` §1.2 item 1 and the red set's import line | **OPEN — the plan records the default and the recommendation WITHOUT DECIDING.** `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1 (`Q-1`, both options priced and what each blocks) · `docs/specs/store-rederive/contract.md` §0A `DD-20` · §1.2 item 1 · the header block's first dated annotation, ruling **(Q-1)**: the successor gets its **OWN** surface artifact and the old one is **superseded-in-effect** |
| **4** | **THE RE-FREEZE'S ORDERING, STATED SO NO PASS RE-FREEZES SILENTLY.** The **successor's own** frozen surface artifact is owed **at the successor's freeze**; the **old** artifact (`docs/specs/store-core-module-store-core-graph-surface.md`, its span digest `sha256:29772ac7…` and its file pins `0664c52f…` / `5c0c1a97…`) is **NOT** re-frozen, its licence set is **NOT** widened, and **not one of its bytes moves** — its evidence is annotated **`STALE PENDING`** rather than deleted, by the pass that re-opens each unit | **ORDERED, NOT PERFORMED.** `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1 · `docs/specs/store-rederive/contract.md` §0.2 items 2/6 · §1.2 item 4 · `AGENTS.md` item 10a's *"a frozen-contract change … needs a user decision"* arm |
| **5** | **THE FIVE CARRIED DEFECTS OF THE HELD TEXT ARE PARKED WITH AN OWNER AND ARE NOT THIS PLAN'S TO CLEAR.** `SD-SPLIT-1` (the two `§4.5`→`§4.4` mis-cites) · `SD-SPLIT-2` (the union's declared `22` against its `1–21` enumeration) · `SD-SPLIT-3` (the register's `276` mis-sum, whose terms give `288`) · `SD-SPLIT-4` (`layer-honesty.md` §3 item 1's *"the FOUR named"* over five enumerated sites) · `SD-SPLIT-5` (an in-code comment's superseded union size) | **PRE-EXISTING, CARRIED FAITHFULLY, OWNED BY THE UNIT'S SPEC WRITER AT ITS NEXT BOUNDED PASS**, and none blocks this plan's own delegability. `docs/pending.md` §3, the five `SD-SPLIT-n` rows |

**The pre-flight's own bound, stated once:** a precondition that is **open** (lines 1 and 3) **stops the chain
at that line** and is reported to the architect as a blocker in the concrete form `AGENTS.md` item 10a
requires — what is blocked, the evidence, two or three options with a recommendation, and what each blocks.
**A later pass may NOT read this plan as the go-ahead it waits for.**

### §P.3 The declared edit scope — the files the build MAY touch, and the set it may NOT

**The scope is the contract's, and this table is a pointer set over it**
(`docs/specs/store-rederive/contract.md` §1.2 items 1–5). **This part adds no path, removes no path and
prices no path.**

| # | The declared edit scope | What the unit may do there | Source |
| --- | --- | --- | --- |
| **1** | **`src/renderer/store.ts` (NEW)** — one module holding the **whole declared surface**: the `5` generic functions, the `5` secure functions, the record shapes, the closed `22`-token fail-state union and the `13` step ids | **authored**, whole | `docs/specs/store-rederive/contract.md` §1.2 item 1 · §0A `DD-20` · `docs/specs/store-rederive/store-model.md` §2.1 · §2.14 |
| **2** | **the boot region of `src/renderer/renderer.ts`** — the store's **construction site**, the **`listen(...)` registrations that must precede the load** (`C24`), and the **`load()` call** | **edited**: wiring only — construction, registration, the load call | `docs/specs/store-rederive/contract.md` §1.2 item 2 · `docs/specs/store-rederive/seams-and-lifecycle.md` §2.12 items 1–3 |
| **3** | **the type-only import lines of `src/renderer/theme-store.ts` and `src/renderer/overlay-store.ts`**, **where and only where they name this contract's types** | **edited**: those import lines alone | `docs/specs/store-rederive/contract.md` §1.2 item 2 (the `3 = 1 + 2` importer census) · `docs/specs/store-rederive/census.md` §4.3 |
| **4** | **`tests/store-rederive.test.ts`** — the red set | **authored** by the TestWriter | `docs/specs/store-rederive/contract.md` §1.2 item 3 · `docs/specs/store-rederive/layer-honesty.md` §3 item 4 |
| **5** | **`tests/store-rederive-register.ts`** — the register's **executed layer** (the layer that EXECUTES the `27` rows) | **authored** by the TestWriter | `docs/specs/store-rederive/contract.md` §1.2 item 3 · `docs/specs/store-rederive/property-register.md` §5.5 item 1 · §5.5.1 |

**THE NOT-TOUCHED SET, NAMED SO THE SILENCE IS A RESULT.** **Every other `src/**` file** (the landed
`src/renderer/store-core-graph.ts` and `src/renderer/store-graph-references.ts` included) · **every test file
of the replaced family** · **every tracker** (`docs/next-steps.md` · `docs/decisions.md` · `docs/pending.md` ·
`docs/defects.md` · `docs/HANDOFF.md` — **no tracker is touched BY THE BUILD of this plan's five rows; the
gate-10 tracker move is that gate's own**, `AGENTS.md` item 6) · **and the frozen artifact's bytes** (`docs/specs/store-rederive/contract.md`
§1.2 items 4–5). **A diff reaching outside the five rows above is outside this unit's declared edit scope and
is not a licence question — it is the scope's own breach.**

**THE LICENCE GUARDRAIL, STATED AS A POINTER AND NOT AS A NEW RULE.** **If this unit is run as a MODULE WAVE,
the integration wave's edit-set is `⊆` the frozen artifact's declared surface `∪` its declared host wiring
points** — the frozen artifact's own field-7 hard subset rule, whose licence for the landed module is the
four concrete paths **`{ src/renderer/store-core-graph.ts, src/renderer/store-graph-references.ts,
src/renderer/renderer.ts, tests/store-core-graph-integration.test.ts }`**, with **the contract and every
tracker explicitly NOT members** and **a pass wanting one of them inside it owing a re-freeze with an
amendment row, never a silent widening** (`docs/specs/store-core-module-store-core-graph-surface.md`, field 7
and its *"not a silent widening"* clause · `docs/decisions.md`'s ACTIVE row of 2026-10-02 for the module-wave
family — *"the wave family `D-GP-SVM-3`/`D-GP-SVM-5` applies to this unit"*, with its artifact's **EIGHT
required fields**, its **freeze by the supervisor session**, its **red set re-authored from the artifact
alone**, its **read-only audit at gate 4, not skippable**, its legal states **`T1`–`T11`** and its illegal set
**`I1`–`I7`**, and **a wave green being ENVELOPE-GREEN, never APP-green** · **the gate-12 layering discipline (`RCA-12`), whose repo-visible text is `docs/specs/user-flow-audit.md`**).
**Consequence, stated rather than implied: `src/renderer/store.ts` is NOT a member of the OLD artifact's
field-7 set, so a module wave that reached it under the old artifact would be the silent widening that clause
forbids.** The successor's own artifact supplies its own field 7 at the successor's freeze — which is
`§P.4`'s first phase, and which is why that phase precedes the red set.

### §P.4 The ordered phases — phase · what it does · owner · input · output · the rule that authorizes it

**One row per phase, in the order the chain runs them** (the order rule is `§P.1`'s, cited there and not
re-argued here). **The table is a SCHEDULE**; the "why it is in that position" ground is carried in the last
column, and **every ground is a rule's, never this part's.**

| Phase | What it does | Owner | Input | Output | Why it is in that position — the authorizing rule |
| --- | --- | --- | --- | --- | --- |
| **P0 — THE SURFACE ARTIFACT** | **the SUCCESSOR'S OWN frozen surface artifact**, authored at the family's `§4.2` path convention with its **`8` required fields** (module · interface functions **with per-parameter semantics rows** · module-external start/end points · module i/o surface · error shapes · host wiring points · edit-set · **content hash**), then **frozen by the supervisor session** with its recorded **`sha256`** and its **five-column amendment row**, the freeze record landing in the unit's acceptance cell | `role_spec_writer` authors; **the supervisor session freezes** | `docs/specs/store-rederive/store-model.md` §2.1 (the surface) · `docs/specs/store-rederive/parameter-semantics.md` §6 (the per-parameter rows the artifact's field 2 re-uses) · `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1 | the successor's frozen surface artifact **+ its digest + its amendment row** | **FIRST, ON THE CRITICAL PATH:** the module wave's sole input is the artifact, so **a module wave that ran before the artifact existed would have no surface to write its tests from** (`docs/decisions.md`'s ACTIVE 2026-10-02 module-wave row, the ordered chain · `docs/specs/store-rederive/contract.md` §0.2 item 6 · §1.2 item 4). **The re-freeze of the OLD artifact is the architect's instrument and is NOT this phase** — see `§P.6`'s stop table and `§P.2` lines 3–4 |
| **P1 — GATE 3, THE RED SET** | **the red set authored FROM THE SPEC ONLY and RUN, with its failing set REPORTED BEFORE ANY IMPLEMENTATION**; its shape follows the spec's own case sets (`docs/specs/store-rederive/store-model.md`'s `M-`/`F-`/`R-` rows, `docs/specs/store-rederive/seams-and-lifecycle.md`'s arms, `docs/specs/store-rederive/census.md`'s grids) — **and, because this unit is CODE-BEARING, the EXECUTED property layer** (row **P2** below) | `role_test_writer` | the contract directory, whole (`docs/specs/store-rederive/contract.md` + its parts, INCLUDING `docs/specs/store-rederive/property-register.md` §5.5.1) | **the two test paths the scope declares** — the red set and the register's executed layer, `docs/specs/store-rederive/contract.md` §1.2 item 3 · **the reported failing set and the register's printed rows** | **RED BEFORE GREEN (`RCA-1`, `AGENTS.md` item 3): the implementation-first order is a process violation even when the final suite is green**, and **the red set must be RUN and REPORTED per unit BEFORE implementation**; **a code unit is delegable only once its contract exists AND a TestWriter has run and reported the red set** (`AGENTS.md` item 9) |
| **P2 — the property layer the red set EXECUTES** | **the register's `27` typed rows executed by a DETERMINISTIC property layer**: **plain vitest tables over CLOSED, exhaustively enumerated input sets**, **one table per row**, **each row printing its STRATEGY ID and its HELD/BROKEN verdict**, the caps **`≤100` attempts per row · `≤400` attempts total · stop after `5` consecutive failures**, **an UN-RUN row reported as a FAILURE, never as a pass**, and **the attempt total printed WITH its per-row terms**; the instrument is **`npm test`** | `role_test_writer` (the layer is **executed**, never authored by the implementer) | `docs/specs/store-rederive/property-register.md` §5.5 · §5.5.1 (the `27` rows, each with its strategy id `S-SD-*` and its term) · §5.5.2 (the honesty block) · §5.5.3 (the arithmetic) | the register's executed layer inside the test path `docs/specs/store-rederive/contract.md` §1.2 item 3 names for it + **the printed attempt totals, WITH their terms** | **`AGENTS.md` item 11: for a code-bearing unit the typed register is mandatory and the layer is EXECUTED; `NO new dependency` — no property runner, no `fast-check`, no fourth leg** (`AGENTS.md` item 11(d)), **and the register's rows are CLOSED tables where no draw is taken, so no pinned-seed generator is owed** (`docs/specs/store-rederive/property-register.md` §5.5 item 1 · §5.5.2 item 2). **The register exists BEFORE the red set: it is authored WITH the contract and BEFORE any red set** (`AGENTS.md` item 11 (the mandatory-register rule; the ACTIVE ledger row that pins it BY NAME is `docs/decisions.md`'s `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`); `docs/specs/store-rederive/property-register.md` §5.5 item 1) |
| **P3 — GATE 3, THE GREEN** | **the LEAST code that turns exactly that red set green**, inside the declared edit scope of `§P.3`, with the trio re-run | `role_implementer` | the reported red set + the declared edit scope | `src/renderer/store.ts` · the wiring edits of `§P.3` rows 2–3 · a green red set | **LEAST CODE TO GREEN, AFTER the red set is reported (`AGENTS.md` item 3(b)–(c))**, and **`RCA-2`/`RCA-5`: a multi-unit deliverable is split PER UNIT — this unit's sequence never shares one inline run with a sibling unit's** (`AGENTS.md` item 2 · item 3) |
| **P4 — GATE 4, ADVERSARIAL + the read-only PBT audit** | **the read-only adversarial pass** (edge cases · unauthorized access · malformed inputs) **and the register's read-only audit** (over-strength · generator coverage · evasion); **every finding dispositioned with ONE of the six recorded dispositions** — `HOST-FIX` · `RED-SET-FIX` · `SPEC-FIX` · `PAR-NOTE` · `PACKAGE-DEFECT` · `SATISFIED` — and **written into the contract's `§3a`/`§3b`**; **host findings fixed HERE and regression-tested**; **a package defect goes to `docs/defects.md` + `docs/HANDOFF.md` and is NEVER patched** | `role_adversarial_reviewer` (read-only) | the green tree + `docs/specs/store-rederive/property-register.md` §5.5.1 | `docs/specs/store-rederive/layer-honesty.md` **§3a**/`§3b` filled · fixed host findings · the defect catalogue rows if any | **`RCA-3`: the adversarial pass is MANDATORY per completed unit, not optional**, and **`§3a`/`§3b` are OWED to it and to no earlier pass** (`docs/specs/store-rederive/layer-honesty.md` §3 item 3 · `AGENTS.md` item 7's package carve-out · item 11(e)) |
| **P5 — GATE 5, THE BLIND GREENS** | **the `*-greens.md` set AUTHORED AND RUN from the docs alone, by an agent who did NOT implement** — `docs/specs/store-rederive/*` + the greens set, **no implementation reading** | `role_blind_test_writer` | the delivered docs + the green tree (run against it, not read from it) | the unit's greens record + its per-scenario pass/fail | **`AGENTS.md` item 10a/10b: a greens set authored by the same agent who implemented the unit, WITHOUT a blind re-run, is a review finding — the exact anti-pattern the rule closes** |
| **P6 — GATE 6, THE LIVE DETERMINATION** | **a WRITTEN determination of whether this unit triggers the mandatory live battery**, from the predicate's own two limbs, **with the evidence that decided it and the falsifier that would flip it**; **a PARK is structural only with a recorded reason** — a merely-parked battery is **NOT** a pass; **where it triggers, the battery RUNS** | `role_test_writer`/the live driver's operator for the run; **the determination is recorded in the unit's own record** | the contract's declared change set + **the trigger predicate filed at `docs/specs/user-flow-audit.md` (its item 2, `THE TRIGGER PREDICATE` — the preset's `§7.1`)** | the recorded determination (`TRIGGERS` / `DOES NOT TRIGGER`) + its evidence + its falsifier, or the run's structured report where it triggers | **`AGENTS.md` item 10a places the live/UI battery at gate 6; the predicate is `docs/specs/user-flow-audit.md` (its item 2, `THE TRIGGER PREDICATE` — the preset's `§7.1`; mechanical, decided from the unit's own recorded change set), and the decision is RECORDED either way.** **THE PREDICATE'S OWN EVIDENCE FOR THIS UNIT, POINTED AT AND NOT DECIDED HERE:** the contract declares **NO rendered surface** — no page, no element, no text, no class, no slot content, no envelope, no DOM write — so `AR-16` *"is satisfied vacuously here and binds the consumer units"* (`docs/specs/store-rederive/contract.md` §1.3 item 1 · `docs/specs/store-rederive/contract.md` §0.2 item 5's `AR-16` line), **and `docs/skills/designing-pages.md` does not exist in this repository's `docs/skills/` tree**, so no test-use-case coverage matrix and no demo-page index are owed (`docs/specs/store-rederive/contract.md` §1.3 item 2). **The plan records the class (a store module plus a wiring region) and the reason; the OPERATIVE determination is the gate's, written AT the gate, never inferred here.** |
| **P7 — GATES 7/8, PROOFREADER + per-unit DOCUMENTATION REVIEW** | **the proofreader** audits the docs against code + specs and fixes doc inconsistencies (spec refs, section numbers, claims vs behaviour, version/test-count staleness); **the documentation reviewer** reconciles the unit's contract, its greens record and **the active trackers** against the **actual** build, and **fixes stale entries in the SAME pass** | `role_proofreader` · `role_documentation_reviewer` (both read-only) | the green tree + the greens set + the trackers | the proofread's fixed cells · **the review record at `archive/reviews/<date>-U-STORE-REDERIVE-doc-review.md`** | **`RCA-6`/`AGENTS.md` item 10d: the documentation review is MANDATORY after the greens, not optional — run per unit, never batched** (`AGENTS.md` item 6's archival loop applied AS A GATE) |
| **P8 — GATE 9, THE TRIO AND ITS ADDITIVE FOURTH LEG** | **`npm test` · `npm run typecheck` · `npm run build`**, plus **`npm run typecheck:tests`** wherever the unit makes a claim about **its own test file**, **with the LAYER each verification covers stated** | the supervisor session (or its delegated runner) | the frozen green tree | the four commands' measured exit codes and figures, **each with its layer** | **`AGENTS.md` item 4: the trio is UNCHANGED and the fourth leg is ADDITIVE in both directions — `npm run typecheck` keeps its `src/**`-only behaviour** (`tsconfig.json` includes `src/**/*.ts` and excludes `tests`, so **the trio's second leg NEVER READS A TEST FILE**), **and a unit citing typecheck as evidence about its OWN test file must cite the fourth leg (or its own leg 4)**. **the gate-12 layering discipline (`RCA-12`, `docs/specs/user-flow-audit.md`) governs the reporting: a node-suite green is ENVELOPE-green, never APP-green** |
| **P9 — THE DONE ROW, THE LEDGER MOVE, THE ARCHIVAL LOOP** | **the DONE row written with its full content**, **the tracker/ledger move**, **the `docs/decisions.md` / `docs/next-steps.md` updates**, and **the archival loop** (merge into the core docs, archive obsolete docs into the gitignored `archive/`, repoint every reference to a moved file) | **the architect admits the row (`RCA-8(f)`); the supervisor session writes it and moves the tracker cells** | every gate's landed artifact | the DONE row · the moved ledger · the reconciled trackers · the archived records with repointed citations | **`RCA-8(f)`: the architect admits ROWS, not a pass — a successor contract, or a spec-writer pass, does not move a ledger count** (`docs/specs/store-rederive/contract.md` §0.2 item 3) **· `AGENTS.md` item 6 (the archival loop, run every significant change, with every reference to an archived file repointed)** |

**THE DONE ROW'S CONTENT, ITEM BY ITEM — the plan requires each, and this list adds no cell to any tracker
schema.** **The red set** (collected / passed / failed, as RUN, before implementation) · **the green count** ·
**the adversarial pass's findings and their dispositions, with `§3a`/`§3b` named** · **the blind-greens
result** · **the documentation-review pass and its record's path** · **the trio's and the fourth leg's
results, each with its layer** · **the register's EXECUTED totals — the attempt total printed WITH its
per-row terms, the HELD/BROKEN split, `un-run`, and whether the stop rule fired** · **and the commit at that
gate boundary**. **Every one of these is a field an existing DONE row of this repo already carries** — the
shapes are at, e.g., the `## DONE — U-STORE-TABS-RECORD` gate-3 and gate-6 rows of `docs/next-steps.md`
(cited **by name**, never by line `A-SSS-18`'s convention: `§n` and row ids are the citation currency).

**THE COMMIT DISCIPLINE, BOUND TO EVERY ROW ABOVE — `RCA-8` (`AGENTS.md` item 3's neighbourhood and its own
lettered rules).** **A commit at EVERY gate boundary that changed files** (spec → red → green →
adversarial/doc-review → DONE); **a working tree carrying more than ONE unit's uncommitted work is itself a
review finding**; **a whole-file `write` on an existing file over ~200 lines is FORBIDDEN unless the file is
committed in the same pass**; **append means append**; **an untracked document that matters is committed
BEFORE further passes edit it**; **and commits are scoped, one per gate boundary, with a message naming the
unit and the gate.**

### §P.5 The acceptance criterion — what makes this unit DONE, and what makes it NOT done

**THE CRITERION IS A CHECKABLE LIST, and every line is a pointer: the cell itself is the acceptance cell
the `D-GP-HS-5` form fixes, cited BY ROW NAME where a row name exists — the form is instanced at
`docs/specs/store-core-module-store-core-graph-surface.md`'s field-8 freeze record and at `docs/next-steps.md`'s
acceptance cell for that unit — and its CONTENT is the contract's own clauses plus the repo rules named here.**
**A line that cannot be checked from an artifact is not on this list.**

**DONE requires ALL of the following:**

1. **The architect's spec-gate go-ahead for this unit is recorded.** (`§P.2` line 1; `AGENTS.md` item 10a.)
2. **`Q-1` IS RULED, and the red set's import line names the ruled module path.** (`docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1; the plan's own pre-flight, `§P.2` line 3.)
3. **The successor's own frozen surface artifact exists, is frozen by the supervisor session, and carries
   its `sha256` and its amendment row.** (`§P.4` P0; `docs/specs/store-rederive/contract.md` §1.2 item 4;
   `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1.)
4. **The red set was authored from the spec ALONE, RUN, and its failing set REPORTED before any
   implementation.** (`§P.4` P1; `RCA-1` — `AGENTS.md` item 3; `AGENTS.md` item 9.)
5. **The register's `27` rows were EXECUTED, each printing its strategy id and its HELD/BROKEN verdict, with
   `un-run: none`; and the total the criterion is checked against is the `R16`/`R17` DECLARED TOTAL, printed
   with its twenty-seven terms — `288` at `docs/specs/store-rederive/property-register.md` `§5.5.3` and at the
   `§5.5.1` foot — and that total IS the sum of those terms; **`§5.5.1`'s heading cell's `276` is the carried
   `SD-SPLIT-3` defect, corrected only by annotate-beside**; the caps hold
   (`≤100` per row · total `≤400`) and the stop-after-`5` rule is reported as fired or unfired.**
   (`§P.4` P2; `docs/specs/store-rederive/property-register.md` §5.5 items 1–2 · §5.5.1 · §5.5.3;
   `AGENTS.md` item 11(b)–(c) and its `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` discipline; the register's
   own declared total is printed at `docs/specs/store-rederive/property-register.md` §5.5.1's foot and
   re-printed at §5.5.3; the carried defect's row is `docs/pending.md` §3's `SD-SPLIT-3`, which `§P.2` line 5
   and `§P.6` stop row 9 name as not this plan's to clear.)
6. **The green is the least code that turns exactly that red set green, inside the declared edit scope, with
   the trio re-run.** (`§P.4` P3; `AGENTS.md` item 3; `§P.3`.)
7. **The adversarial pass ran read-only, the register's PBT audit ran read-only, every finding is
   dispositioned with one of the six recorded dispositions, and `docs/specs/store-rederive/layer-honesty.md`
   §3a/§3b carry them; host findings are fixed here and regression-tested; package findings are catalogued
   and never patched.** (`§P.4` P4; `RCA-3`; `AGENTS.md` item 7; item 11(e); `docs/specs/store-rederive/layer-honesty.md`
   §3 item 3.)
8. **The greens set was authored AND run by an agent who did not implement the unit.** (`§P.4` P5;
   `AGENTS.md` item 10b; item 10a's chain.)
9. **The live determination is WRITTEN, with its evidence and its falsifier — `TRIGGERS` or
   `DOES NOT TRIGGER`; where it triggers, the battery RAN and its report exists; where it does not trigger,
   the reason is structural and recorded, and no battery is claimed as a pass.** (`§P.4` P6;
   `docs/specs/user-flow-audit.md` (its item 2, `THE TRIGGER PREDICATE` — the preset's `§7.1`); `docs/specs/store-rederive/contract.md` §1.3.)
10. **The proofread and the per-unit documentation review ran, and the review record is at
   `archive/reviews/<date>-U-STORE-REDERIVE-doc-review.md`, with the unit's contract, its greens record and
   the active trackers reconciled against the actual build in that same pass.** (`§P.4` P7; `RCA-6`;
   `AGENTS.md` item 10d.)
11. **The trio is green AND the fourth leg is green wherever the unit claims anything about its own test
    file, and EVERY verification's LAYER is stated** — envelope/pure vs assembled/renderer/app — with **no
    APP-green reported from a node-green**. (`§P.4` P8; `AGENTS.md` item 4; **the gate-12 layering discipline, `RCA-12`, whose repo-visible text is `docs/specs/user-flow-audit.md`**)
12. **A commit exists at every gate boundary that changed files.** (`§P.4`'s commit block; `RCA-8(a)`,
    `AGENTS.md` item 3's `RCA-8` block.)
13. **The DONE row carries every field `§P.4` lists, and the ledger move was taken by the architect — the
    row admitted (`RCA-8(f)`), the counts printed with their terms.** (`§P.4` P9;
    `docs/specs/store-rederive/contract.md` §0.2 item 3.)

**IT IS NOT DONE IF — each is a pointer to the rule that already makes it so, never a new one:**

1. **AN UN-RUN REGISTER ROW IS REPORTED AS A PASS.** (`docs/specs/store-rederive/property-register.md` §5.5
   item 2 · §5.5.2 item 4; `AGENTS.md` item 11(b).)
2. **THE GREENS SET WAS AUTHORED BY THE AGENT WHO IMPLEMENTED THE UNIT**, without a blind re-run.
   (`AGENTS.md` item 10b.)
3. **THERE IS NO ADVERSARIAL PASS, OR ITS FINDINGS ARE UNRECORDED, OR A FINDING IS LEFT A BARE `OWED`.**
   (`RCA-3`; `AGENTS.md` item 11(e); `docs/specs/store-rederive/layer-honesty.md` §3 item 3.)
4. **THERE IS NO DOCUMENTATION REVIEW** (or the spec/trackers drifted uncaught into the next pass).
   (`RCA-6`; `AGENTS.md` item 10d.)
5. **ANY LEG OF THE TRIO IS RED, OR THE FOURTH LEG IS RED WHERE IT WAS OWED, OR A LAYER IS UNSTATED** — and
   **an APP-green reported from a node-green is the failure `RCA-12` names.**
6. **THE RED SET WAS AUTHORED OR RUN AFTER THE IMPLEMENTATION**, or the red set was never run and reported.
   (`RCA-1`; `AGENTS.md` items 3/9.)
7. **A DIFF REACHES OUTSIDE THE DECLARED EDIT SCOPE OF `§P.3`** — including into the frozen artifact's bytes,
   another unit's test file, or a tracker. (`docs/specs/store-rederive/contract.md` §1.2 items 1–5.)
8. **A FROZEN ARTIFACT'S SPAN CHANGED WITHOUT A RE-FREEZE AMENDMENT ROW AND ITS NEW DIGEST**, or the old
   artifact was re-frozen by this unit. (`docs/specs/store-rederive/contract.md` §1.2 item 4;
   `docs/specs/store-core-module-store-core-graph-surface.md`'s freeze and re-freeze rules; `AGENTS.md`
   item 10a's frozen-contract-change blocker.)
9. **A LEDGER COUNT MOVED BY ANY INSTRUMENT OTHER THAN THE ARCHITECT.** (`RCA-8(f)`;
   `docs/specs/store-rederive/contract.md` §0.2 item 3.)
10. **THE UNIT'S OWN CONTRACT TEXT CHANGED VALUE** — a rule, a `§`-number, an F-id, a pin or a recorded cell —
    rather than only its location. (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md`
    §C.11.8's requirement; `docs/specs/store-rederive/contract.md` §0B item 3.)
11. **A RED SET AUTHORED AGAINST AN UNRULED MODULE PATH.** (`§P.2` line 3; `§P.6` stop row 2;
    `docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1.)

### §P.6 The stop conditions and the blockers — where the build stops and returns to the architect

**The plan NAMES its stop points so that a pass meeting one does not improvise past it.** **A stop is a
RETURN TO THE ARCHITECT in `AGENTS.md` item 10a's concrete form** (what is blocked · the evidence · two or
three options with a recommendation · what each blocks) — **not a silent widening and not a second
question about a ruling already recorded.** **`AGENTS.md` item 10a's own two return points are the frame:
FINAL CLOSE-OUT, or a genuine blocker.**

| # | The stop | Why it stops the chain there |
| --- | --- | --- |
| **1** | **THE SPEC-GATE GO-AHEAD IS NOT GIVEN** (the contract's operative status is `FILED — HELD AT THE SPEC GATE BY THE ARCHITECT`) | **it is the ONE approval the chain waits for; nothing in this plan may be started on a `HOLD`** (`AGENTS.md` item 10a; `docs/specs/store-rederive/contract.md`, status line and first head annotation) |
| **2** | **`Q-1` IS UNRULED — the module path versus the frozen field-7 edit-set** (the declared default `src/renderer/store.ts`, the recommendation a NEW path, option (b) blocking `§1.2` item 1 and the red set's import line) | **a freeze question, not a behaviour question, and not this plan's to decide** (`docs/specs/store-rederive/owed-and-cross-references.md` §7 item 1 · §7 item 7 (`Q-1`) · `docs/specs/store-rederive/contract.md` §0A `DD-20`) |
| **3** | **A RE-FREEZE IS ORDERED, OR A LICENCE MUST BE WIDENED** — the old artifact is neither re-frozen nor re-licensed by this unit; the successor's artifact is owed at the successor's freeze | **a frozen-contract change needs the architect's decision, and a licence widened by silence is the finding the artifact's own field-7 clause names** (`docs/specs/store-rederive/contract.md` §0.2 item 6 · §1.2 item 4 · `AGENTS.md` item 10a) |
| **4** | **A TEST CANNOT BE SATISFIED INSIDE THE DECLARED EDIT SCOPE (THE LICENCE)** — e.g. a required drive would need a byte outside `§P.3`'s five rows | **the scope is the contract's; widening it is a scope change the contract cannot answer** (`docs/specs/store-rederive/contract.md` §1.2 · `AGENTS.md` item 10a's *"a scope change"* arm) |
| **5** | **AN UNSATISFIABLE CLAUSE PAIR, OR A CONTRADICTION NO PASS MAY RESOLVE ON ITS OWN** | **`AGENTS.md` item 10a names it as a blocker by construction**; the plan does not adjudicate one here, and **`docs/specs/store-rederive/contract.md` §0B item 3's supersession-pointer rule fixes the form a resolution must take** (a pointer to the LIVE form, never a dead end) |
| **6** | **A DUTY OF `docs/specs/store-rederive/owed-and-cross-references.md` §7 IS REACHED AND ITS OWNER HAS NOT ACTED** — `§7` items 1–7: the re-freeze and `Q-1` (item 1) · `AR-9`'s landed non-compliance, taken here and discharged at `docs/specs/store-rederive/write-and-read.md` §2.7 items 2/5 (item 2) · **`AR-18`'s dated `decisions.md` block, with `docs/specs/store-rederive/store-model.md` §2.1's fork-facing caveat** (item 3) · **`AR-2`'s provenance table, FRACTION 1's** (item 4) · **`AR-12`'s `STALE PENDING <successor> §n` annotations, the documentation reviewer's per re-opened unit** (item 5) · **`AR-16`'s consumer side, any unit that authors a page from this store** (item 6) · **and the two questions this contract could not resolve — `Q-1` and `Q-2` — of which `Q-2` the architect's return answered and `Q-1` stays open** (item 7) | **every one of those duties is recorded with an owner and a POSITIVE revisit condition — never bare — and a pass that finds one outstanding reports it rather than taking it** (`docs/specs/store-rederive/owed-and-cross-references.md` §7, whole) |
| **7** | **THE REGISTER'S OWN HONESTY BLOCK IS REACHED** — what the register does NOT cover, and the two-instance question it explicitly declines | **a unit that drives two instances over one path owes its OWN clause and its OWN rows; this contract claims nothing about it** (`docs/specs/store-rederive/property-register.md` §5.5.2 item 3) |
| **8** | **A PACKAGE DEFECT IS FOUND** (`node_modules/provident-ssr/` or the upstream source) | **it is catalogued in `docs/defects.md` + `docs/HANDOFF.md` and NEVER patched** (`AGENTS.md` item 7's adversarial carve-out; `§P.4` P4) |
| **9** | **THE FIVE CARRIED DEFECTS ARE REACHED** — the `SD-SPLIT-1`…`SD-SPLIT-5` rows, which are the unit's spec writer's at its next bounded pass | **the plan may not clear them silently; they are annotated beside, never rewritten** (`docs/pending.md` §3, the five rows) |

### §P.7 What this plan does NOT do

**One block, and it is the plan's own negative scope — every verb a pointer, no verb a new claim.**

1. **IT STARTS NO CYCLE.** No red set is delegated, no implementer is dispatched, no leg is run and no gate
   is entered by the act of authoring this part (`docs/specs/store-rederive/contract.md`, the header block's
   four dated annotations, each restating that the status is unchanged).
2. **IT ADMITS NO UNIT ROW AND MOVES NO LEDGER COUNT.** The counts stay exactly as the trackers state them,
   and **the architect admits rows** (`RCA-8(f)`; `docs/specs/store-rederive/contract.md` §0.2 item 3).
3. **IT EXECUTES NO REGISTER ROW.** The register's `27` rows are CONTRACT TEXT; **their execution is the red
   set's** (`docs/specs/store-rederive/property-register.md` §5.5.1's foot, `un-run: none` · §5.5.2 item 1 ·
   `docs/specs/store-rederive/layer-honesty.md` §3 item 4).
4. **IT TOUCHES NO FREEZE.** The old artifact's bytes, its span digest `sha256:29772ac7…` and its file pins
   `0664c52f…` / `5c0c1a97…` are untouched; **no re-freeze is ordered, implied or performed here**
   (`docs/specs/store-rederive/contract.md` §0.2 item 6).
5. **IT AUTHORS NO NEW CLAIM** — no behavioural rule, no figure or census, no cap, no reason token, no
   register row, no parameter row, no `§`-number for the contract, no id family
   (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.11.6). **Its statements are
   pointers and schedule rows, and nothing else.**
6. **ITS AUTHORING CHANGED NOTHING OF THE CONTRACT'S TEXT** other than the index region's own **three**
   recorded bookkeeping writes of the same pass — the omission row's removal **with the conversion sentence
   added to the scope-boundary cell beside it**, the part-map row's addition, and the closure-state cell's
   re-print on the new terms — **each recorded one line per changed cell, old → new, with the `§C.11.7` step
   that required it named** (`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.11.8 part
   (v-4); the recording itself lives in the split/bookkeeping record the supervisor re-checks).
7. **IT DOES NOT DECIDE `Q-1`, does not re-open any ruling the architect has already recorded, and does not
   amend any clause of the contract it points at.**

### §P.8 The pointer index — every part and section this plan points at

**A pointer index, and it is not a census of the parts** (the part map carries no count —
`../Agent Harness/docs/specs/spec-scope-and-structure/contract.md` §C.0.3; `docs/specs/store-rederive/contract.md`,
the part-map cell). **It exists so a reviewer can resolve this part's pointers without the map's help.**

**The contract document:** `docs/specs/store-rederive/contract.md` — the header block (its status line and its
four dated annotations) · its index region · `§0` (`§0.1` the authority · `§0.2` the `REPLACE` scope and the
conditions in force · `§0A` the `24` declared working defaults · `§0B` the claim ledger) · `§1` (`§1.1` what
the store is · `§1.2` the declared edit scope · `§1.3` the page-design determination).

**Its parts, each by path:** `docs/specs/store-rederive/store-model.md` (§2.1 the declared surface, the `10`
functions and the record shapes · §2.2 the four tiers, the persistence order and the monotonic invariant ·
§2.3 the address space and the walk · §2.4 the mint · §2.14 the closed fail-state union, `22` tokens, **its
item 2 the message list's home**) ·
`docs/specs/store-rederive/write-and-read.md` (§2.5 the write and its complete arm table `A1`–`A10` · §2.6
the tombstone · §2.7 the `file` tier's commit duty · §2.8 the read and its two forms) ·
`docs/specs/store-rederive/seams-and-lifecycle.md` (§2.9 the `secure` graph and its gate · §2.10 the
constraint seam, **its item 4 the operative form of the message list** · §2.11 the event surface · §2.12 the
boot · §2.13 the lifetimes) ·
`docs/specs/store-rederive/layer-honesty.md` (§3, with its `§3a`/`§3b` placeholders) ·
`docs/specs/store-rederive/census.md` (§4, with `§4.3` the surfaces · `§4.9a`/`§4.9b`) ·
`docs/specs/store-rederive/property-register.md` (§5.5 · §5.5.0 · §5.5.1 · §5.5.2 · §5.5.3 — **the part's
pointers reach §5.5 items 1–2, §5.5.1, §5.5.1's foot, §5.5.2 items 1/3–4 and §5.5.3**) ·
`docs/specs/store-rederive/parameter-semantics.md` (§6, `PAR-1`…`PAR-14`, `16` rows — **the part's pointers
reach `PAR-7` and `PAR-13`**) ·
`docs/specs/store-rederive/owed-and-cross-references.md` (§7 the `OWED` list · §8 the cross-references).

**The harness rules this part points at** (`../Agent Harness/docs/specs/spec-scope-and-structure/`):
`contract.md` §C.0.2 (the scope boundary and the recorded omissions) · §C.0.3 (the part map is a pointer set;
**a schedule is not an ordering claim**) · §C.1/§C.3 (the directory convention and the closure predicate) ·
§C.2 (the two-region rule) · §C.6 (the name-resolution table and its three binding rules) · §C.11.4/§C.11.6
(a section moves entire; **a carrier introduces no claim of its own**) · §C.11.7 (one map entry = one name =
one file) · §C.11.8 (content preservation and its four permitted difference classes) · §C.11.9 (any
cross-document reference names `path §n`).

**This repo's own rules, by item:** `AGENTS.md` item 2 (`RCA-5`, per-unit delegation) · item 3 (TDD order,
`RCA-1`/`RCA-2`, the commit rules `RCA-8(a)`–`(f)`) · item 4 (the trio, the additive fourth leg) · item 6 (the
archival loop) · item 7 (the defect catalogue and the package carve-out) · item 8 (the proposal-review gate) ·
item 9 (the delegation gate) · item 10a (autonomy after spec approval and its two return points) · item 10b
(blind greens) · item 10d (`RCA-6`, the per-unit documentation review) · item 11 (the typed register, the
executed layer, the read-only PBT audit, the zero-row exemption) · and `RCA-3` (the adversarial pass is
mandatory per unit) and **the gate-12 layering discipline (`RCA-12`, cited from the operator preset and carried in
`docs/specs/user-flow-audit.md`'s own text — this repository's `AGENTS.md` carries no item bearing it)** (verify the right layer).

**The record, the tracker and the family documents this plan points at, by path:**
`docs/specs/store-constraint-rederivation-proposal.md` (`P`, the constraint set's verbatim home) ·
`docs/specs/store-constraint-rederivation-review.md` (`R`, the gate-1 record) ·
`docs/specs/store-core-module-store-core-graph-surface.md` (the OLD frozen artifact, its field 7 and its
*"not a silent widening"* clause; **and its field-8 freeze record, the site that instances the `D-GP-HS-5`
acceptance-cell form**) · `docs/decisions.md` (the 2026-10-02 ACTIVE module-wave family row — **the unit's
acceptance cell for that unit at `docs/next-steps.md` is where the `D-GP-HS-5` form is instanced and where the
`D-GP-HS-6` amendment-row shape is re-used, both cited BY ROW NAME at the artifact's own foot** — and the
`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` and `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`
disciplines) · `docs/pending.md` (§3's five `SD-SPLIT-n` carries) · `docs/next-steps.md` (the DONE-row and
gate-record precedents, cited **by name**) · `docs/specs/user-flow-audit.md` (**its item 2, `THE TRIGGER PREDICATE` — the preset's `§7.1`; its item 2's matrix obligation, whose preset token is `§5.U`; its item 3, `THE STRUCTURED COVERAGE REPORT` — the preset's `§6.1`; and its item 4, `THE READ-ONLY AUDIT` — the preset's `§6.2` — that file carries no numbered heading, so `§7.1`/`§5.U`/`§6.1`/`§6.2` resolve into it by its own items, as its own text states**) · `docs/skills/designing-pages.md` (**absent from this
repository's `docs/skills/` tree**, a fact the contract records at `docs/specs/store-rederive/contract.md`
§1.3 item 2) · `archive/reviews/<date>-U-STORE-REDERIVE-doc-review.md` (the gate-8 record's path).
