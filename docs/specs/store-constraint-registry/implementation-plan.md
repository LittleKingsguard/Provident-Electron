## Part — implementation plan: the unit's ordered landing/verification plan and its acceptance criterion (`U-STORE-CONSTRAINT-REGISTRY`)

**Contract:** `docs/specs/store-constraint-registry/contract.md` — this part is its **part-map entry `implementation-plan`**, of **KIND `carrier`** (`docs/specs/spec-scope-and-structure/contract.md §C.6` · `§C.11.6`; the map row's KIND cell).

**A CARRIER INTRODUCES NO CLAIM OF ITS OWN (`docs/specs/spec-scope-and-structure/contract.md §C.11.6`).** Every statement in this part is either **(a) a POINTER** to the contract clause that already carries the behavioural, surface, fail-state, register, parameter or duty claim — written `path §n`, path-qualified as `§C.11.9` requires — or **(b) a SCHEDULE ROW**, an owner and a position, authorized by a rule of this repo (`AGENTS.md` item n). **This part adds NO behavioural rule, NO new figure or census, NO cap, NO new reason token, NO new register row, NO new `§`-number for the contract and NO new id family**; its own sections are its own `§P.n` numbers and collide with nothing in the contract.

### §P.1 The schedule's own statement — **a schedule is NOT an ordering claim**

**The sections below are A SCHEDULE** (`docs/specs/spec-scope-and-structure/contract.md §C.0.3`: the part map is a pointer set carrying **no order**, and *"a schedule is not an ordering claim"*). **Three consequences, each falsifiable:**
1. **No citation anywhere depends on a `§P.n` number or on a phase's position in `§P.3`'s table.**
2. **The order below is the order this repo's own process fixes, and it is cited, not asserted** — the chain `red → green → adversarial → PBT audit → blind greens → live → proofreader → doc review → trio → DONE` is `AGENTS.md` item 10a's enumeration, with `RCA-1`/`RCA-2` (item 3) fixing the first two positions and `RCA-6` (item 10d) the doc-review position.
3. **This schedule starts nothing.** Authoring it admits no ledger row, moves no ledger count, executes no register row and touches no freeze — which is the contract's own operative status (`docs/specs/store-constraint-registry/contract.md`, its status line).

### §P.2 The pre-flight — what must exist before the first red row is

1. **THE CONTRACT DIRECTORY IS FILED AND THE ARCHITECT'S SPEC GATE IS CLEARED** (`AGENTS.md` items 9–10a: the spec gate is the one approval the chain waits for) — **and the contract's condition cells are ALL SETTLED at that gate: `C-1` (the spelling) and `C-3` (the edge's authorability) RULED by the architect on `2026-10-13`, `C-2` and `C-4` discharged by the contract's first pass, and `C-5` (the edge's funnel existence, observable only once `F3` lands) recorded with its owner and its blocker** (`docs/specs/store-constraint-registry/contract.md §0.2` items 5–9). **`C-3` is ruled ALONGSIDE `F3`'s landing, so this schedule's phase 1 stands as written: the RED SET is authored NOW from the contract directory alone and targets the module path**; **`C-1`'s settlement changes no rule at all** (`docs/specs/store-constraint-registry/contract.md §0.2` item 6).
2. **THE TYPED REGISTER EXISTS, IS TYPED AND IS UN-RUN** (`docs/specs/store-constraint-registry/property-register.md §5.5.1`: `19` rows, `246` attempts, `≤100`/row, `≤400` total, stop-after-5) — **authored BEFORE the red set, which is `AGENTS.md` item 11's own requirement.**
3. **THE PARAMETER ROWS EXIST — one per declared parameter** (`docs/specs/store-constraint-registry/parameter-semantics.md §6`: `20` rows) — a missing row is a gate-2 finding (`AGENTS.md` item 5's spec discipline, applied at this gate).
4. **THE DEPENDENCY IS DECLARED AND NOT ACTIVATED** (`docs/specs/store-constraint-registry/registers.md §2.4` item 1(c)) — **so nothing in the pre-flight requires a package module, an install, a lockfile change or a network step.**
5. **NOTHING IN THE PRE-FLIGHT MOVES A FREEZE** (`docs/specs/store-constraint-registry/registers.md §2.5` item 6; `A2 docs/decisions.md:22` · `:28`).

### §P.3 The phases — what it does, its owner, and why it is in that position

| Phase | What it does | Owner (`AGENTS.md` role table) | Why it is in that position |
| --- | --- | --- | --- |
| **1** | Author the unit's RED SET from the contract directory ALONE, RUN it, and REPORT the failing set with each row's cited clause; execute the `19` register rows' strategy ids and report each row's held/broken verdict, its attempts-run/declared and the caps | **TestWriter** | `AGENTS.md` item 3 (`RCA-1`: tests FIRST, and the red set RUN and REPORTED before any implementation); item 11(b) (the register layer is EXECUTED by the TestWriter, and an un-run row is a FAILURE) |
| **2** | Implement the least bytes at the `runWrite` edge that turn the red set green — the register state, its records, its report and its removal/bound arms — and re-run the trio plus the test-layer leg | **Implementer** | `AGENTS.md` item 3(c) (least code to green) and item 4 (the validation quartet) |
| **3** | Adversarial pass: edge cases / unauthorized access / malformed inputs — **including the READ-ONLY PBT AUDIT over this unit's register, its over-strength, under-assertion and evasion checks each dispositioned** | **Adversarial reviewer** (read-only) | `AGENTS.md` item 3 (`RCA-3`: the adversarial pass is MANDATORY per completed unit); item 11(e) (the audit is the adversarial pass's and each check is dispositioned, never a bare `OWED`) |
| **4** | Blind greens: the green-scenario artifact authored from the DOCUMENTATION ONLY (no implementation read) and RUN against the live module/host | **Blind-test writer** | `AGENTS.md` item 10a–10c (`RCA-4`: self-verified greens are the anti-pattern this closes) |
| **5** | Proofreader: audit the docs against the code and the specs; fix inconsistencies, stale refs and counts in the same pass | **Proofreader** (read-only) | `AGENTS.md` item 10b |
| **6** | Per-unit documentation review: reconcile this contract directory, its cited section numbers, its census figures and the active trackers against the ACTUAL build | **Documentation reviewer** (read-only; record to `archive/reviews/<date>-U-STORE-CONSTRAINT-REGISTRY-doc-review.md`) | `AGENTS.md` item 10d (`RCA-6`: the doc review is a MANDATORY per-unit gate, not an afterthought) |
| **7** | The trio and the test-layer leg; then the DONE row and the ledger move | **Implementer + supervisor** | `AGENTS.md` item 4 (the quartet) and items 5/6 (tracker reconciliation in the same pass) |

### §P.4 The acceptance criterion

**The criterion is this repo's own and is cited, not invented: a unit is delegable once (a) its contract exists and (b) a TestWriter has run and reported the red set** (`AGENTS.md` item 9). **For THIS unit the further terms are the ones the contract already carries and this part only points at:** **the closed surface and record shapes** (`docs/specs/store-constraint-registry/registers.md §2.1`–`§2.5`) · **the join key and the duplicate arm** (`docs/specs/store-constraint-registry/registers.md §2.2`) · **the state set, the removal arms and the declared bound** (`docs/specs/store-constraint-registry/lifecycle.md §2.3`) · **the cited fail-state arms** (`docs/specs/store-constraint-registry/lifecycle.md §2.3` item 6) · **the typed register, executed and audited** (`docs/specs/store-constraint-registry/property-register.md §5.5.1`) · **the parameter rows** (`docs/specs/store-constraint-registry/parameter-semantics.md §6`).

### §P.5 The reconciliation duty this part carries — **dated, and discharged in this pass**

**The plan is DRAFTED FOR EVERY UNIT AT THE PROPOSAL STAGE and RECONCILED TO THE CONTRACT ONCE A CONTRACT LANDS** (this repo's plan rule: a held proposal's plan is authored even where the hold stops the spec gate — the plan is reviewable evidence, never the contract's pinnable claim). **This unit's plan is authored WITH, and reconciled TO, `docs/specs/store-constraint-registry/contract.md`, dated `2026-10-13`** — its reconciliation is the contract path in this part's header, the pointers above, and `docs/specs/store-constraint-registry/contract.md §0.2` item 5's declaration of the edit scope and its order. **Terms: `1` reconciliation, `1` date (`2026-10-13`), `0` claims of its own ✓.**

### §P.6 What this plan does NOT decide, stated so no reader over-reads it

1. **It decides no `C-1` and no `C-3` reading of its own** — both were RULED by the architect at the spec gate on `2026-10-13`, and this plan only POINTS at those rulings (`§P.2` item 1; `docs/specs/store-constraint-registry/contract.md §0.2` items 6–7).
2. **It orders no byte of `src/**` and no freeze.** The contract's edit scope is `docs/specs/store-constraint-registry/contract.md §0.2` item 5; this part points at it.
3. **It asserts no measurement.** Every figure it names is the contract's own or the landed register's own, cited by path.
