# Gate-1 record — the amended store architecture `docs/specs/store-node-graph-proposal.md`

**A DOCS-ONLY DISPOSITION OF A PROPOSAL. NO `src/**` OR `tests/**` BYTE MOVES, NO TEST IS AUTHORED, NO LEG IS RUN, NO LEDGER COUNT MOVES.**

**ALL FOUR STEPS HAVE RUN. THE VERDICTS, AS RETURNED: STEP 1 `role_validity` `BLOCKED-ON-SEMANTICS` · `FLAWED`
· STEP 2 `role_critique` `BLOCKED-ON-SEMANTICS` · STEP 3 `role_architecture_review` `APPROVE-WITH-CONDITIONS` /
`NOT-DELEGABLE` · STEP 4 `role_change_analysis` `APPROVE-WITH-CONDITIONS`, PRINTED BESIDE THIS REPO'S IN-FORCE
WORDS **`NOT-DELEGABLE`** (the proposal) AND **`DELEGABLE-WITH-CONDITIONS`** (the successor contract, after its
spec gate).**

**⟶ THE VOCABULARY RULING (a TWO-SITE RULE, NOT A COMPROMISE).** **(1) THE GATE VERDICT** is printed in the
supervisor's closed vocabulary — `PROCEED | APPROVE-WITH-CONDITIONS | BLOCKED-ON-SEMANTICS | FLAWED | REJECTED`
— because that is what the gate's instructions mandate and what its consumers read. **(2) THE REPO'S IN-FORCE
WORD** is printed beside it, because that is what must land inside this repo's own artifact; the in-force set
is `DELEGABLE` / `DELEGABLE-WITH-CONDITIONS` / `NOT-DELEGABLE`. **`BLOCKED-ON-SEMANTICS` IS NOT IN FORCE ANYWHERE
IN THIS REPO:** it is an unadopted **request** at `docs/pending.md` `§K` (`K-2`). **Steps 1's and 2's
`BLOCKED-ON-SEMANTICS` words are kept visible above as those passes' own dated returns and are read as
`FLAWED`-class substance, now dissolved on the merits.**

**THE ROUND-3 ANSWERS CLOSE ALL THREE SEMANTIC BLOCKS — SO THIS RECORD IS NOT `BLOCKED-ON-SEMANTICS`.**
**(1) `DR-2` — DISSOLVED, NOT RULED.** The architect's clarification, verbatim: *"The phrasing is to say that
links maintain the tree shape instead of normal object → property reference."* The directive's *"direct and
control reference access"* was **never an access-control mechanism**: a link is **the structural parent-child
edge that maintains the tree shape**, in place of an ordinary object→property reference. **Therefore: no second
refusal kind, no new token, no twenty-first export, and no census re-derivation against the five frozen
seam set-equality rows** (`docs/specs/store-core.md` `§2.1`'s `TWENTY`-name census; `§2.2` `P-12` / `§3.3`
`I-11` / `§3.4` `R-12`). **The held union stays CLOSED at `8`** (`§2.6` item 3), pending only its
already-recorded `'cap-exceeded'` confirmation. **The as-filed `DR-2` text — step 3's *"clearest semantic
block"* — is SUPERSEDED and stays visible as superseded** (`RCA-8(d)`).
**(2) `DR-4` — RULED: THE GRAPH IS A TREE BY CONSTRUCTION, AND A SEGMENT IS DATA.** Every node has one parent
link; re-parenting deletes and re-mints anchors (`§0.4` `A-F`), so **a cycle is unconstructible**; the walk's
termination is a **stated structural invariant with a positive control**, and **no visited set and no depth
bound is owed**. Hostile segments (`'__proto__'` / `'constructor'` / `'toString'`) are **DATA** — never
coerced, never used as a prototype key — which is what gives the held totality posture (`§2.2` `P-4` · `§3.3`
`I-2` · `§3.2` `F-25` · register row `P-SC-TP-1`) **declared semantics**. This selects `DR-4`'s option (a) and
holds option (d).
**(3) `DR-11` — RULED: TIERS COMPOSE, WITH A PER-`(path, tier)` UNIQUENESS CONSTRAINT.** The architect's words,
verbatim: *"As 1, with constraint on register/link that at most one node can have a given logical path and
persistence tier - attempting to add one where it already exists will be treated as an edit to the existing
one or fail loudly, depending on call params."* So **two holders may coexist across tiers** (the held model's
logical-path binding survives); **the merged read and `parts` SURVIVE**; and **the proposal's *"`parts` has no
reason to exist"* claim (`§4.1` advantage 1, `§6` `R3`) COLLAPSES** — `R3` is **not** a supersession. **The
consequence for the amendment's cost accounting: fewer supersessions than the draft claimed** (the merged arm,
`P-SC-TP-4`, and `P-SC-TP-3`'s and `P-SC-IM-11`'s `parts` arms are not invalidated by `R3`). **And the
register/link now ENFORCES uniqueness per pair**, with two declared outcomes — an edit to the existing node,
or a loud failure, per call params — which is a NEW structural obligation the successor's contract must carry.

### §1 WHAT THE PROPOSAL ASKS

The architect directed that **ownership / name-addressing be mapped using a node-anchor-link graph similar to
the provident architecture**, with **file/mem/temp as a flag on the node object**, **links that direct and
control reference access and maintain constraints**, a **top-level register that only needs to count top-level
items**, **security as a separate collection**, a **cache with a fresh-or-rebuild rule**, a **severed node
deleted from the graph**, and — after eight round-2 answers — a graph that **IS the source of truth with
internal caching for traversal speed**, a **tier segment that is a FILTER on the resolved node's own flag**
(the leaf storing its own local name, a failed resolution returning a **verbose per-step diagnostic**), a
**commit that regenerates the whole subtree as a transaction** (build → compare census → delete only on a
match), **two caches** (register-side, per-link) invalidated by any register change or any change to a link's
anchor set, **immutable anchors** (re-parenting = delete + mint), a severed `file`-tier node **deleted** with the
file written by **translating the graph to stable JSON**, **caps that move to the top-level register** with
**reachability collecting inside the graph**, and **no pin set** (a write to an orphaned reference fails
loudly). **The proposal admits nothing by itself** (`§0.2`); it raises **thirteen decision requests** (`§13`),
of which **three were semantic blocks at step 3 and all three are now closed by the round-3 answers**.

### §2 FEASIBILITY VERDICT

**`APPROVE-WITH-CONDITIONS` ≡ `NOT-DELEGABLE` for the proposal and `DELEGABLE-WITH-CONDITIONS` for the
successor contract after its spec gate.** The amended architecture is implementable and its three relations
are decided with winners, rewriting operations and falsifiers; **nothing is `undefined-until-answered`**, so
**the delegable word is not blocked** — and **the spec gate itself still needs the architect's go-ahead**,
which is the one approval the chain waits for.

| Artifact | In-force word | Conditions |
| --- | --- | --- |
| **`docs/specs/store-node-graph-proposal.md`** (the proposal) | **`NOT-DELEGABLE`** | the nine contract-content `DR-*` answers carry working values; nothing forces a block |
| **the successor contract** (`docs/specs/store-core-graph.md`, PROPOSED and verified free) | **`DELEGABLE-WITH-CONDITIONS`**, **after its spec gate** | `C-1`…`C-9` of §6, plus the fresh STEP-0 zero-row rationale |
| **`docs/specs/store-core.md`** (HELD) | **FILED; SUPERSEDED-BESIDE at the successor's spec gate** | its two arithmetic findings, routed to be corrected **by annotation beside the as-filed forms** |
| **`docs/specs/store-core-adoption-dossier.md`** (HELD) | **REUSED, cited by path, amended in place at the successor's spec gate** | three re-statuses (`A-6`/`A-7`/`A-8`) + the `R-9` collision row |

### §3 THE FOUR STEP RETURNS, AS RETURNED

| Step | Role | As returned | Substance |
| --- | --- | --- | --- |
| 1 | `role_validity` | `BLOCKED-ON-SEMANTICS` · `FLAWED` | three grounds: the flag-versus-name contradiction in the directive's own example; register-impact arithmetic that does not close; and one recommended collision resolution that **asked a prohibition to be re-read**, which the dossier's collision form forbids. **Nine `D-*` discrepancies**, one `D-held`, two carried items, eight undefined semantics, eight conditions |
| 2 | `role_critique` | `BLOCKED-ON-SEMANTICS` | the best-evidenced design record in the tree with **nine mechanism-level clauses plus the structural walk-termination clause** unanswered; the strongest counter-case (**an amendment that added the walk and the cache and kept the held deletion rules**) survives in part; ten conditions `C-1`…`C-10` with falsifiers; the register arithmetic `2 + 6 + 12 = 20` and the `400` sum **unbroken**; the family split broken |
| 3 | `role_architecture_review` | **`APPROVE-WITH-CONDITIONS`** / `NOT-DELEGABLE` | both prior blocking classes closed in substance (flag-versus-name dissolved by the filter answer; `R-9`'s scope ruled with a made, testable argument); the three relations decided; **thirteen `DR-*` triaged `3 blocks · 9 contract-content · 1 routing`**; the held contract recommended for **RE-FILING**; **one NEW held-contract arithmetic finding**; twelve conditions |
| 4 | `role_change_analysis` | **`APPROVE-WITH-CONDITIONS`** | **this record.** The three round-3 answers close the three blocks; **nothing `undefined-until-answered`**; **STEP 0 RUN — the adoption trigger does NOT fire, and the zero-row rationale is written**; **the held contract's fate decided: RE-FILE a successor**; nine conditions remain and **none forces a semantics block** |

**WHERE THIS RECORD CORRECTS ITS PREDECESSORS, because a later reader must not inherit an unverified
figure.** **(a)** Step 3 reported the held register's printed terms as summing to **`396`**. **Re-read this
pass at `docs/specs/store-core.md` `§5.5.3`'s own term table: the `20` printed terms are `30, 28, 24, 40, 40,
9, 14, 8, 20, 24, 22, 24, 24, 6, 5, 5, 20, 6, 5, 20`, and the file's own printed chain ends `… → 386 → 400`;
they sum to `400`.** **What IS defective is the row COVERAGE:** the table carries `20` terms against a
register whose own rows number **`21`** (`P-SC-IM-1`…`-13` = `13`, `P-SC-SM-1` = `1`, `P-SC-TP-1`…`-7` = `7`),
so **`P-SC-TP-7` appears in the table and in no printed total`, and `400` is the sum of `20` of the register's
`21` terms.** **The defect is a row-count/coverage defect, not a mis-sum.** **(b)** The **declared** row count
is also broken: `CURRENT STATE` item 3 and `§5.5.1`'s id-range sentence both say **`20`** rows
(`11 + 1 + 8`, and `P-SC-TP-1`…`P-SC-TP-8` — **and `P-SC-TP-8` does not exist**), while the table's rows give
**`21`**. **The two findings are therefore: the row count, and the term table's coverage of it** — both
**routed, by annotation beside the as-filed forms, never by rewrite** (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-
TERMS`, ACTIVE). **(c)** The proposal's own `§12` headline arithmetic (a summary that does not sum) is
**step 3's finding, carried and not re-derived here**.

### §4 THE PER-ITEM DISPOSITION — THE BINDING TABLE

**The proposal's mechanisms:** node-anchor-link addressing **SUPERSESSION (architect-only)**, admissible since
the store owns its graph · residency as a node flag **COMPATIBLE ADDITION on the token set, NEW CONTRACT on
the carrier** (its site is `DR-1`(iii)) · links carrying access and constraints **HALVED BY THE ROUND 3** — the
access half **DISSOLVED**, the constraint half `NEW CONTRACT` · the top-level-only register **SUPERSESSION** ·
reclaim-on-severance **NEW CONTRACT with a SUPERSESSION edge** · the resolution cache **NEW CONTRACT (own
gate)** · the multi-level export **NEW CONTRACT** · the security collection **COMPATIBLE ADDITION** · the pin
set **DELETED (round 2)** · **the per-`(path, tier)` uniqueness constraint NEW (round 3)**.
**The held contract's rows, with both arithmetic findings:** the `17`-row classification, the `9` held
rows/clauses over `10` table items, the refusal union's `5 + 2 + 1 + 4`, the `TWENTY`-name export census and
the five frozen seams are **as the three reports read them**; **the register's row count (`21` vs the declared
`20`) and its term table's coverage (`20` of `21` rows) are the two findings**, routed as `§3`(a)/(b) above.
**The thirteen `DR-*`:** **`0` semantic blocks · `9` contract-content (`DR-1`, `DR-3`, `DR-5`, `DR-6`,
`DR-7`, `DR-8`, `DR-9`, `DR-10`, `DR-12`) · `1` routing (`DR-13`) · `3` answered/dissolved (`DR-2`
dissolved · `DR-4` ruled · `DR-11` ruled). `0 + 9 + 1 = 10` live requests + `3` closed = `13` ✓.**
**The ledger:** **`21 DONE / 3 open` UNITS = `24`** (`G1` `U-STORE-CORE` · `G2` `U-STORE-PERSIST` · `G3`
`U-STORE-SECURITY`; identity `2 engine + 2 harness + 4 (D) + 10 (E) + 3 (F) + 3 (G) = 24`); **this record moves
no count** (`RCA-8(f)`). **The held contract's fate: RE-FILE a successor** (§7 below).

### §5 THE SEMANTICS BLOCK — STEP 0

**(a) STEP 0 RAN**, and it inspected the proposal's `§0`–`§13` (with `§0.1`, `§0.4`, `§2.1`, `§2.3`,
`§2.4`/`§2.4a`, `§5.2`, `§6`/`§6.1`, `§11`, `§12`, `§13` read in full); the held dossier's `§1` and `§2`;
`docs/specs/store-core.md`'s `CURRENT STATE`, `§2.1`, `§2.2`, `§3.4` (`R-9`/`R-11`/`R-12`), `§4.4` (`S-3`),
`§5.5.1`, `§5.5.3`, `§7a.1`; the record's `§1`–`§8`; `docs/pending.md`'s `§K`, the parks region and the
disposition-region headings; `docs/next-steps.md`'s ledger line and the `G1` row; `docs/decisions.md`'s
headings; the retention record at `RH-1`/`RH-5`; and `docs/specs/user-flow-audit.md` `§7.1`.

**(b) THE ADOPTION-TRIGGER DETERMINATION, identifier by identifier.** `StoreNode`, `StoreAnchor`,
`TopLevelRegister` and its members, the register cache, the per-link cache, the store-minted handle and the
three new refusal tokens (`'no-such-anchor'` · `'severed-link'` · `'rebuild-failed'`) are **MINTED HERE** —
the proposal's own words are that the address model *"is PROPOSED here, not inherited"*. `StoreLink` is
**MIXED**: its constraint-bearing role is **CITED** as an analogy to the vendored package's type surface
(read `[T]`, external, unadopted, and unusable in contract because the held one-import census forbids the
import), while its members are minted here. The four tier tokens, the surviving refusal tokens, the read
surface, `commit`, `subscribe` and the caps' outcome are **this project's own, ALREADY ADOPTED by
`U-STORE-CORE` and already carried as dossier rows `A-1`…`A-8`**. `RCAP-1`/`RCAP-2`/`RCAP-3` are the held
figures **relocated across a quantity**, cited with a re-derivation duty. The directive itself is **the
architect's — this project's own source**. **The vendored package's `Anchor` / `Link` /
`LinkConfigErrorCode` / `NodeState` are CITED, NEVER ADOPTED.**

**(c) THE DOSSIER DETERMINATION.** **THE TRIGGER DOES NOT FIRE — not for the amendment and not for the
successor — and a ZERO-ROW DOSSIER WITH A WRITTEN RATIONALE IS OWED by the successor** (`AGENTS.md`'s
STEP-0: a zero-row dossier is legal only with a written rationale, and a silent zero-row on an adopted unit
is a review finding). **The rationale:** the successor adopts no externally-sourced identifier; its
vocabulary is (a) the held dossier's rows `A-1`…`A-8`, cited by path; (b) the held contract's project-internal
vocabulary; (c) the architect's directive and his round-2/round-3 answers; and (d) names minted by the
successor's own contract. **`docs/specs/store-core-adoption-dossier.md` is REUSED, NOT REPLACED, and amended
IN PLACE at the successor's spec gate:** `A-6` (the layered read) and `A-7` (`commit`) are **re-statused with a
narrowed/widened reading** — `A-6` because **`parts` SURVIVES** under the round-3 `DR-11`, `A-7` because the
clear is now **one clause of the regeneration transaction** — and `A-8` (`subscribe`) is re-statused **only
if** its third release trigger lands undeclared, which `DR-3`(c) refuses on the merits. **The COLLISION BLOCK
gains ONE hit: `store-core.md` `§3.4` `R-9`** — **reconciled BY ROW ID**: the prohibition's scope has been
**RULED** by the architect (`§0.4` `A-H`) to bind a **GLOBAL engine-id-keyed map**, and not a per-link,
per-edge, caller-keyed, walk-gated target set, with the **no-counter / no-UUID** half intact and binding the
handle's minting (`DR-10`). **The reconciliation is the ruling, never a re-reading** — which is what
discharges step 1's condition 1. **Every other `K-*` prohibition row is either reconciled by row id or
re-named; an unreconciled hit is a FINDING.** **The `≤8` figure is a component-breakdown SIGNAL, never a
ceiling** (`REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`, cited by row name), so
extending the held dossier in place rather than filing a successor-local one is lawful and recommended.

**(d) THE OPEN-ROW LIST AND THE OPEN-SEMANTICS LIST, EVERY PRIOR ITEM NAMED.** **THE OPEN-ROW LIST IS EMPTY.**
All eight of step 1's `§6` undefined semantics, all nine of step 2's `§11` mechanism clauses **plus its
tenth structural item**, all ten of step 2's `C-1`…`C-10`, all twelve of step 3's `§9` conditions and the
held `§7a.1` six items are **closed, ruled, dissolved, or carried with an owner and a positive revisit
condition** — each named in the step-4 report's `§2`(d) table. **THE OPEN-SEMANTICS LIST — ELEVEN ENTRIES
(the `≤8` budget's overflow, never dropped):** (1) the register's own row shape and refused set (`DR-1`
(i)/(ii)) · (2) the flag's declaration site (`DR-1`(iii)) · (3) the filter-diagnostic token (`DR-1`(iv)) ·
(4) the severance's event and crossing (`DR-3`) · (5) the regeneration census term and its failure token
(`DR-5`) · (6) the stable-JSON stability rules (`DR-6`) · (7) whether the cache rebuild sits inside the read
(`DR-7`) · (8) the register-side cap values and their overflow (`DR-8`) · (9) the register's identity for a
cold item (`DR-9`) · (10) the store-minted handle's rule **and `R-9`'s re-pointed positive control**
(`DR-10`) · (11) the export's crossing rule. **Plus ONE new obligation the round-3 answer creates:** the
**per-`(logical path, tier)` uniqueness constraint** and its two declared outcomes. **NO ENTRY IS
`undefined-until-answered`, so NO ROW FORBIDS THE DELEGABLE VERDICT**, and **the two carried items are named
with owners:** the anchor/link cross-load lifetime (`UNVERIFIABLE — CARRIED`, owner the architect, revisited by
the load-cycle row) and the store's own subscription count after a reclaim (no row until `DR-3`).

**(e) THE ARCHITECT'S ANSWERS OWED — NINE CONDITIONS, NONE FORCING A BLOCK.** (1) the register's row shape
and refused set — (a) purely derived with construction-time refusals **RECOMMENDED**; (b) a caller-declared
row beside the projection; (2) the flag's declaration site — **`commit` (regeneration) RECOMMENDED**; (3) the
severance's event — an eighth `cause` token **RECOMMENDED**, with `R-16`/`I-14`/`P-SC-IM-7`'s count row
**re-derived, not relaxed**; (4) the cap values — the held `1024`/`4096`/`64` as **working values** with a
re-derivation duty; (5) the census term — the tier's own table count **RECOMMENDED**; (6) the stable-JSON
rules — reuse the held canonical comparator's rules with the coupling stated; (7) the rebuild's site — **at
the invalidation site RECOMMENDED** (a read that mutates would defeat `P-SC-IM-11`'s two-run differential);
(8) the store-minted handle — a per-graph counter, with `R-9`'s control **re-pointed so it is not vacuous**;
(9) the export's crossing rule — **local-only, not required to serialize**, with the crossing form named as
the escalation. **Plus the trackers:** the `G1` cell annotation, the `docs/pending.md` `P-7` row, and the
`R-9` scope ruling's ACTIVE row.

### §6 THE CONDITIONS, WITH OWNERS

| # | Condition | Owner | Forces a block? |
| --- | --- | --- | --- |
| **C-1** | the successor's **spec gate** — the contract FILED and APPROVED, carrying the three relations, the seven walk arms, the register's row shape, the tier-as-filter, the per-`(path, tier)` uniqueness constraint, the tree-by-construction invariant, segments-as-data, the two caches' invalidator set and rebuild site, the regeneration transaction, the severance event, the stable-JSON rules, the export's crossing rule, the caps and their non-destructive overflow, and the refusal union re-closed at `8` + four members | architect | **NO — it is the gate itself** |
| **C-2** | the **nine `DR-*` contract-content answers** land with working values (`DR-1`, `DR-3`, `DR-5`…`DR-10`, `DR-12`) and the `DR-13` routing bound to the successor's diff-scope allow-list | architect + the successor's spec writer | **NO** |
| **C-3** | the **`R-9` scope ruling LANDS** — one `docs/decisions.md` ACTIVE row **and** the held contract's amendment row, at the successor's spec-gate pass; **its positive control is re-pointed so it is not vacuous** | architect / the successor's spec-gate pass | **NO** |
| **C-4** | **`docs/specs/store-core-adoption-dossier.md`** is cited by path with the `A-6`/`A-7`/(`A-8`) re-statuses and the `R-9` collision row reconciled **by row id**; the successor's own **zero-row rationale is written, never silent** | the successor's spec-gate pass | **NO** |
| **C-5** | the successor's **typed `§5.x` register exists BEFORE its red set**, with the load-cycle row among its `[T]` rows and the `[H]` drives named; caps `≤100`/row, `≤400` total, stop-after-5; totals printed **with their terms** | the successor's spec writer (`role_spec_writer`) | **NO** (`AGENTS.md` item 11) |
| **C-6** | **gate 6 is `STRUCTURAL`**, recorded with its reason; the `user-flow-audit.md` `§7.1` predicate **determined as NOT TRIGGERING** (limbs A and B both absent); **NO report** — a zero-row report is INVALID and `waived` is forbidden | the successor's gate-6 pass | **NO** |
| **C-7** | the **held contract's two arithmetic findings** are corrected **by annotation beside the as-filed forms** — the register's declared row count (`20`) against its table's rows (`21`, `13 + 1 + 7`), and its term table's coverage (`20` terms for `21` rows; `400` is the sum of `20` terms; `P-SC-TP-8` does not exist) | `U-STORE-CORE`'s spec-gate pass, or the successor's | **NO** |
| **C-8** | the **`G1` ledger cell** is annotated with the successor's path and the round-3 rulings, **and the `docs/pending.md` `P-7` row lands**; the successor's **admission question** is filed to the architect | orchestrator / supervisor; the admission: architect | **NO** |
| **C-9** | the **fork-facing design-level re-write** of `docs/FORKER.md` is left to `Q-14`'s pass AFTER `U-STORE-MODULES` lands; **the two now-false cells already carry their declarative corrections**; the fork re-runs the `N = 9` conformance leg over a rebuilt tree | orchestrator, at the fork's pass | **NO** |

**NO CONDITION IN THIS RECORD FORCES `BLOCKED-ON-SEMANTICS`.** Every one is a contract-content, values,
filing, routing or tracker decision about a fact already decided.

### §7 THE HELD CONTRACT'S FATE, AND THE GATE CHAIN

**DECIDED (step 4's recommendation, the architect's to confirm): RE-FILE a successor at
`docs/specs/store-core-graph.md` (PROPOSED name, VERIFIED FREE — `docs/specs/store-core-graph*.md` matches
nothing; `docs/specs/*graph*` matches only the proposal).** **Why, in one sentence:** the governing ruling
(*"THE FIRST RED SET CARRIES THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"*) requires **one red set
against one contract**, and in-place amendment pays its filing saving with a **re-grain of a register whose own
declaration and term table disagree with its own size**.
**What happens to each artifact, exactly:** `docs/specs/store-core.md` **keeps its bytes** and gains **one
dated status marker** written by the successor's spec-gate pass; its two arithmetic findings are annotated
beside the as-filed forms; **its register survives as the as-filed record of the OLD model** and is never
re-grained; its red set is **never authored** and its *"authorable today"* status becomes spent provenance.
**The dossier is reused, cited and amended in place**, as `§5`(c). **The `G1` cell keeps its id** and gains a
dated annotation; **the counts do not move** (`21 DONE / 3 open` = `24`). **The fork's moving set is unchanged**
from the record's own list plus the two named modules; **the graph, the register and the two caches have no
separate module home** (`DR-13`(a) recommended, inside the two named modules); **no vendored `src/shared/**`
byte moves**, and the plan's re-vendor identity `15 = 2 + 6 + 7` is untouched.
**THE GATE CHAIN, per unit:** **spec gate** (the one approval the chain waits for) → **a fresh STEP-0
determination** (zero rows + written rationale) → **red** (`role_test_writer`, the failing set reported) →
**green** (`role_implementer`, least code) → **gate 4** (read-only adversarial **+ the read-only PBT audit**;
findings dispositioned, never a bare `OWED`) → **gate 5** (blind greens from the docs only, author ≠
implementer) → **gate 6** (**`STRUCTURAL`**, with its reason: **the unit authors no rendered surface**; the
`§7.1` predicate **determined as not triggering**; **no report**, and `waived` forbidden) → **gates 7/8**
(proofreader + per-unit documentation review, reviewer ≠ writer) → **gate 9** (the trio **plus the additive
`npm run typecheck:tests`**; **no new `scripts` key** — it would redden `tests/ui-leg-contract.test.ts`'s
`L-1`) → **gate 10** (the DONE row + the ledger move **the architect must grant**), **committing at every
boundary** (`RCA-8(a)`), **one unit per commit** (`RCA-8(f)`).
**THE REGISTER'S PROPERTY CLASSES, in outline:** `P-IM` — the tree-by-construction invariant (one parent link
per node); the per-`(path, tier)` uniqueness constraint; the two-run store-state-independence differential;
the import / no-module-level-binding census; **THE LOAD-CYCLE ROW**. `P-SM` — the regeneration transaction's
three-step machine. `P-TP` — the seven-arm walk's totality (returned records, never throws); hostile segments
as DATA with positive and negative controls; the cap non-destructive posture; the no-vocabulary /
no-geometry scan. **`P-SC-TP-7`'s `20` term on the held file's own table is the shape the successor must NOT
inherit** (a term outside its register's own row set). **Typed rows only; never an `F-` row; no new
dependency; no fourth leg; the row count an OUTCOME, not a budget.**

### §8 THE CHANGE PACKAGE

**The record itself** — `docs/specs/store-node-graph-review.md` (**VERIFIED FREE**: `docs/specs/store-node-
graph-*.md` matches only the proposal; the path does not exist). It takes the `docs/specs/<proposal>-review.md`
gate-record family's next place — **the `data-ownership-model-review.md` record states itself as that family's
`19th` member, and a glob of `docs/specs/*review*.md` returns nineteen files, so this is the family's
TWENTIETH member — a reviewer's own count of a glob, printed as such, and load-bearing for nothing.**
**`docs/pending.md` — ONE new parks-region row `P-7`** (VERIFIED FREE: the parks table's rows run
`P-1`…`P-6`), placed **after `P-6`'s annex and BEFORE the `## SPECULATIVE / IN GATE` heading**, carrying the
record's path, the round-3 answers, the `R3`-collapse finding, the successor's admission question and the nine
conditions. **Why a parks row and NOT a lettered disposition subsection: the lettered `§M`/`§N`/`§O` region is
the FORK-REQUEST disposition region, and this proposal is not a fork-sourced ask**; the precedent is the
data-ownership record, whose own `§8` says it *"takes NO new disposition letter."* **`§Q` is reserved to the
parked install-collision package; `§R` is unlanded.** **`docs/next-steps.md` — ONE dated annotation inside the
`G1` cell's row** naming the successor path, the round-3 rulings and the held file's pending
SUPERSEDED-BESIDE status; **no count moves.** **`docs/decisions.md` — ONE new ACTIVE row, for the `R-9` SCOPE
ruling only** (the one genuinely unpinned fact; this pass grepped the ledger and found **no** row naming the
clause or its scope). **The tree-by-construction invariant, the per-`(path, tier)` uniqueness rule and the
filter-not-name rule are NOT owed a row by this review** — the successor's contract pins the first two, and
the third is already this project's own landed reading; **if the architect prefers to pin them, ONE
consolidated row may carry them at the successor's spec gate.** **ROUTED, each under its own gate: the held
contract's amendment rows; the held register's two arithmetic findings; the `docs/FORKER.md` design-level
re-write (`Q-14`'s pass, AFTER `U-STORE-MODULES`); the `G1` cell and the `P-7` row; and `mcp-endpoint.md`
`§3.8` + its item 2, the focus units' refusal rows and `FT-09` (their own units', untouched here).**
**EXPLICITLY NOT TOUCHED:** `src/**` · `tests/**` · every spec other than the proposal and the held two ·
`AGENTS.md` · `package.json`, any script or config · `docs/defects.md` · `docs/HANDOFF.md` · `archive/**`.
**THE `RCA-8` BOUNDARY AND THE LEGS:** this is **docs-only**, so **NO LEG RUNS** — no `npm test`, no
`typecheck`, no `typecheck:tests`, no build, no `ui`, no divergence, no battery, no Electron boot, no MCP
session, **no `git` command**. **One scoped commit per gate boundary, naming the gate** (`RCA-8(a)`); the
record is a **NEW file** (`RCA-8(c)`); **anchored `edit`s only** for the tracker rows (`RCA-8(d)`), each
adding lines at its own site; **the decision row inserted only after the last row any in-repo anchor cites**.

### §9 RISK REGISTER, RESIDUALS AND THE FALSIFIER

| # | Risk | Falsifier that can redden |
| --- | --- | --- |
| **R1** | **the store's graph lifetime against the host's per-generation teardown** — the amendment's largest structural dependency | **THE LOAD-CYCLE FALSIFIER:** resolve `file.window.tabs.landingPage` → run `loadEnvelope` (or `loadDoc`) → resolve again; **the second resolution must need NO rebuild and must answer identically, with no declared write in between**; if it needs one, the store's graph is riding the engine's per-load graph and the architecture — not the performance — is wrong (`[H]`: `runtime.ts:loadEnvelope`/`:loadDoc` tear the graph down and build a new `Supervisor`, and `:tearDownGraph` never calls `Supervisor.dispose()`, so the discarded generation stays pinned — the retention record's **`RH-1`**, with **`RH-5`** for the never-released root). **Carried:** the translate-minted anchor/link lifetime across two loads is `UNVERIFIABLE — CARRIED`, owner the architect |
| **R2** | **a cache invalidation that misses a path** (the resurrection class) | `mem.P` + `temp.P` resident with live cache entries, then `commit('file.P', v)` — **a read of `P` must MISS**; and two identical reads on one state must be structurally identical (`P-SC-IM-11`'s differential). **A rebuild that runs ON the read path is the one place this can be defeated** — hence `DR-7`'s recommendation |
| **R3** | **a census transaction failing mid-regeneration** | `set('temp.P', v)`; `commit('file.P', v)`; `remove` one descendant DURING the window — **one crossing, one row per affected reference, and either a completed regeneration or a DECLARED failure that left the original alive**; a partial state, or deletion on a mismatch, FAILS |
| **R4** | **severance deleting a value a live subscriber still observes** | subscribe on a `temp` reference; sever the parent chain — **exactly ONE declared event, the count to `0`, and the severing receipt naming the released reference**; an unanswered delivery or a silent disappearance FAILS |
| **R5** | **a hostile segment, or a cycle** | the `P-TP` rows' positive controls: **a store whose name→target dictionary is a plain object FAILS**; **a graph admitting a second parent link FAILS**. A control that cannot express its failing case is vacuous and is itself a finding |
| **R6** | **the fork consequence** | any diff outside the declared allow-list, or a re-vendor list that no longer sums to `2 + 6 + 7`, FAILS. **No vendored byte moves**; the fork re-runs the `N = 9` conformance leg over a rebuilt tree; the `docs/FORKER.md` design-level re-write stays routed |

**RESIDUALS, carried with owners:** the `UNVERIFIABLE — CARRIED` anchor/link lifetime · the store's own
subscription count after a reclaim (no row exists until `DR-3` is answered) · the successor's `[H]` half growing
by exactly the **load-cycle** row and nothing else · **the held contract's two arithmetic findings**, reported
and routed, corrected by annotation and never by rewrite · and **the two figures step 3 reported that this
record corrects** (`§3`'s note (a)/(b)) — **the `396` sum is not what `docs/specs/store-core.md` `§5.5.3`
prints; the live defect is row count and term coverage.**

### §10 PROVENANCE

**Read this pass (read-only; no shell, no test, no leg, no `git`, nothing run, no file written):** the proposal
`docs/specs/store-node-graph-proposal.md` at `§0.1`, `§0.2`, `§0.4` (in full), `§1`, `§2.1`, `§2.3`, `§2.4`,
`§2.4a` (in full), `§3`(a)–(c), `§4.1`, `§5.1`, `§5.2`, `§6`, `§6.1`, `§7.1`/`§7.2`, `§8`, `§9`, `§10`, `§11`
(in full), `§12`, `§13` (in full) and the closing round-2 block; the three filed step reports
(`archive/gate1/2026-10-01-STORE-NODE-GRAPH-gate1-step1-validity.md`, `…-step2-critique.md`,
`…-step3-architecture.md`) **in full**; `docs/specs/store-core.md` at `CURRENT STATE`, `§2.1`, `§2.2`
(`P-4`/`P-10`), `§2.6`, `§2.9`, `§2.10`, `§3.4` (`R-1`…`R-16`), `§4.4` (`S-3`), `§5.5.1` (the register table and
the id-range sentence), `§5.5.3` (the term table and its chain, in full), `§7a.1`; the held dossier in full
through `§2`; `docs/specs/data-ownership-model-review.md` at `§1`–`§8`; `docs/pending.md` at `§K`, `§M`–`§P`,
the parks region (`P-1`…`P-6` and the two annotations), the disposition-region headings and the `P-6` annex;
`docs/next-steps.md`'s ledger line and the `G1`/`G2`/`G3` rows; `docs/decisions.md`'s `##` headings and the
row names the proposal cites; `docs/specs/foundation-app-data-model-retention.md` at `RH-1`/`RH-5`;
`docs/specs/user-flow-audit.md` `§7.1`; and `docs/specs/install-collision-one-element-one-session-review.md`
at its `§Q`-placement rows. **Every figure this report prints is one of: (a) VERIFIED at its own site this pass
— the proposal's `1482`-line extent; `store-core.md`'s `CURRENT STATE` item 3 (`20` rows, `11 + 1 + 8`); the
`§5.5.1` id-range sentence (`P-SC-IM-1`…`-11`, `P-SC-SM-1`, `P-SC-TP-1`…`-8`); the table's row ids
(`13 + 1 + 7 = 21`); `§5.5.3`'s `20` terms and their chain to `400`; `§4.4` `S-3`'s own sentence; `§2.2` `P-4`'s
sentence; the `TWENTY`-name export census (`TWO` + `EIGHTEEN`); the ledger `21 DONE / 3 open` = `24` and the
`G1` cell's `OWED — not filed`; the `docs/pending.md` parks letters and the `P-7`/`§Q` availability;
`docs/specs/store-node-graph-review.md`'s absence; the retention record's `RH-1`/`RH-5` sentences; `§K`'s
`K-2` request; or (b) the REVIEWER'S OWN COUNT of a glob or a table read at its own site — the family's
`nineteen` `*review*.md` files, and the disposition-table reads step 3 made. **NO test count, no timing figure,
no leg result and no byte length is carried** — this pass ran nothing and claims no measurement.
**A figure this report CORRECTS, printed with its site:** the held register's printed terms **sum to `400`**
at `§5.5.3`, and the live defect is the **row count and the term table's coverage**, not the sum.
**Not verified, therefore not claimed:** the vendored package's JS internals beyond the type surface the
proposal labels `[T]`; `../Preempt-Providence/**`; the fork's tree; `tests/**`; `docs/specs/store-core.md`'s
`§5.5.2` (its family-split site was **not re-read** by this pass, so no figure from it is re-asserted here);
the family specs' prohibition rows beyond those the proposal and the record cite; `docs/HANDOFF.md`,
`docs/defects.md`, `docs/guide/**`, `docs/skills/**`; `archive/**` beyond the six gate-1 files named above;
and **the prompt's stated `1483`-line extent, which this pass read as `1482`**.

---
