# Gate-1 record — the data-ownership model `docs/specs/data-ownership-model-plan.md`

**A DOCS-ONLY DISPOSITION OF A PLAN. NO `src/**` OR `tests/**` BYTE MOVES, NO TEST IS AUTHORED, NO LEG IS RUN, NO LEDGER COUNT MOVES.**

**ALL FOUR STEPS HAVE RUN. THE VERDICTS, AS RETURNED: STEP 1 `role_validity` `BLOCKED-ON-SEMANTICS`
(remand: the block **PERSISTS**, narrowed to `L-1`/`L-2`/`L-3`) · STEP 2 `role_critique`
`BLOCKED-ON-SEMANTICS` (remand: **LIFTED**, residuals `R-1`…`R-6`) · STEP 3 `role_architecture_review`
`APPROVE-WITH-CONDITIONS` · STEP 4 `role_change_analysis` **`APPROVE-WITH-CONDITIONS`**, PRINTED BESIDE
THIS REPO'S IN-FORCE WORDS **`DELEGABLE-WITH-CONDITIONS`** (the three admitted units) AND
**`NOT-DELEGABLE`** (the five proposals).

**⟶ THE VOCABULARY RULING (a TWO-SITE RULE, NOT A COMPROMISE).** **(1) THE GATE VERDICT is printed in the
supervisor's closed vocabulary — `PROCEED | APPROVE-WITH-CONDITIONS | BLOCKED-ON-SEMANTICS | FLAWED |
REJECTED` — because that is what the gate's instructions mandate and what its consumers read. (2) THE
REPO'S IN-FORCE WORD is printed beside it, because that is what must land inside this repo's own artifact;
the in-force set is `DELEGABLE` / `DELEGABLE-WITH-CONDITIONS` / `NOT-DELEGABLE`
(`docs/specs/container-review.md`), and the precedent for the pair is
`docs/specs/install-collision-one-element-one-session-review.md` §0.** **`BLOCKED-ON-SEMANTICS` IS NOT IN
FORCE ANYWHERE IN THIS REPO:** it is an unadopted **request** in `docs/pending.md` §K (*"REQUESTS, NOT
LANDED RULINGS"*). **Steps 1's and 2's words are kept visible above as their own dated returns and are read
as `FLAWED`-class substance, now dissolved on the merits: every item of both remands is closed or carried
with an owner, and no dossier row and no open-semantics entry is `undefined-until-answered` (§5).**

### §1 WHAT THE PROPOSAL ASKS

The architect asked that the data architecture be centralised into **four stores** with their own get/set
surfaces, one read searching them **in ascending order of durability**, a **commit that clears a
lower-persistence store**, and **event listeners on specific references**, and then: *"Plan data ownership
model change."* The filed plan answers with: **four tiers** (`file` renderer-owned through a main-side
channel, `mem`, `temp`, `secure` main-only with no renderer read); **one read** that stops at the first hit
and never invents a default; a tier segment as an **explicit qualifier**; a per-tier **resident-path prefix
trie**; a **merged read with a `parts` list**; **path-scoped events** with an opt-in `{subtree:true}`
ancestor event; a **declared name registry** (a pattern table matched by shape); **first-class constraints**
evaluated on every write and every `remove`, with a `REPAIR` arm; a first-class **downward-clearing
`remove`**; **one event per affected reference**; a **reference-set commit crossing** with one receipt row
per reference; and a shared-module adoption decided by a **purity criterion used as a placement rule**, with
the `8 / 7` split recorded as the architect's **scope ruling**. Its first tenant is a **tabs/focus slice**
(a proposal). **The plan admits nothing by itself**; the architect's third-round answer `R3-7` **admits
`U-STORE-CORE` + `U-STORE-PERSIST` + `U-STORE-SECURITY` and no others**, moving **no** ledger row.

### §2 FEASIBILITY VERDICT

**`APPROVE-WITH-CONDITIONS` ≡ `DELEGABLE-WITH-CONDITIONS` for the three admitted units; the five proposals
remain `NOT-DELEGABLE`.** The model is implementable, its mechanism is the only shape in which the
architect's own `cache`-as-live-object reference is faithful (that reference cannot cross an IPC boundary —
`docs/specs/mcp-endpoint.md` `P-E6` `[T]`), and the role-based split it forces (**renderer decides, `main`
persists**) is a genuine improvement on the withdrawn mirror. **Nothing is `undefined-until-answered`** — so
the delegable word is not blocked; **the spec gate itself still needs the architect's go-ahead.**

| Unit | In-force word | Conditions |
| --- | --- | --- |
| `U-STORE-CORE` | **`DELEGABLE-WITH-CONDITIONS`** | C-1…C-8 |
| `U-STORE-PERSIST` | **`DELEGABLE-WITH-CONDITIONS`** | C-1, C-9, C-10, C-2's exemption |
| `U-STORE-SECURITY` | **`DELEGABLE-WITH-CONDITIONS`** | C-1, C-11, C-2's exemption |
| `U-STORE-FOCUS` · `-LAYOUT` · `-DRAG` · `-MODULES` · `-TABS-STRIP` | **`NOT-DELEGABLE`** | the admission + the named blocker each (plan `§6.5`'s round-3 table, `docs/pending.md` `P-6`) |

### §3 THE FOUR STEP RETURNS, AS RETURNED

| Step | Role | As returned | Substance |
| --- | --- | --- | --- |
| 1 | `role_validity` | `BLOCKED-ON-SEMANTICS` | the record is largely **true** at its cited sites; the routed/performed boundary **holds**; two `DISCREPANT` rows (the module-registry writer set; the `unknown-id` route's two token-less files); four arithmetic defects; seven buildability verdicts (1 partly · 2 partly · 3 no · 4 mostly · 5 no · 6 partly · 7 partly) |
| 1-remand | `role_validity` | block **PERSISTS**, narrowed | of five forced classes four **DISSOLVED**; three items survive in the amendment's own new text — `L-1` `L-2` `L-3`; two `FIXED` rows **partially closed** (`N-16`, `N-2`/`N-3`); two findings silently dropped (`N-17`, `N-18`); seven totals did not close |
| 2 | `role_critique` | `BLOCKED-ON-SEMANTICS` | the best-evidenced design record in the tree; undecided at three load-bearing joints (the read's per-tier resolution; the fifteen-edge reading; the registry's declaration unit); the smaller **staged** model is the strongest counter-case |
| 2-remand | `role_critique` | **LIFTED** | all three blocking semantics answered at the bytes; residuals `R-1`…`R-6` + findings `N-1`…`N-8`; the criterion judged **a placement rule, not a decision procedure**; 48 `CLOSED`, 9 `PARTIALLY CLOSED`, 1 `NOT CLOSED`, 1 `SILENTLY DROPPED` |
| 3 | `role_architecture_review` | **`APPROVE-WITH-CONDITIONS`** | the architecture as a picture; each admitted unit's contract surface; the dependency graph; **five inventions** the first spec must pin; **eleven frozen-contract consequences** (largest: `docs/FORKER.md` §1's now-false cell); risks incl. the third tier-1 holder in `main`. **Delegable for the three admitted units only** |
| 4 | `role_change_analysis` | **`APPROVE-WITH-CONDITIONS`** | **this record.** Both remands' surviving items **closed or carried with owner**; **nothing `undefined-until-answered`**; **STEP 0 ran — the dossier trigger FIRES and the obligation is recorded**; six architect questions remain and **none** forces a semantics block |

**THE TWO REMANDS' ITEMS, CLOSED — the binding form, because these were the last blockers.**
**Step 1's `L-1`** is closed by **`R3-1`**: the zero-active repair activates the **NEXT surviving entry by
`file.tabs.order`, WRAPPING to the first** when the closed entry was last, and on a **`remove`-triggered**
evaluation **the removed entry's own index is the referent** (plan `§1.9` (iv)'s round-3 block, `§1.7` item
5's round-3 bullet, `§4.3` clause (f)).
**`L-2`** is closed by **`R3-2`**: the landing reference is a **normal `<tabId>` instance** — inside the
`file.tabs.<tabId>.*` matched set **and** a member of `file.tabs.order` — reserved by **one `concrete`
declaration that outranks the pattern**, so only the **entry's own** removal is refused (`G-4`), and the
close-last-tab repair writes the landing entry's `active` **and** its place in `order` in the same committed
write.
**`L-3`** is closed by **`R3-3`**: a commit emits **one event per affected reference** — the higher-tier
reference fires its own `cause:'commit'` carrying `cleared[]` (the **audit list**), and **each cleared lower
reference fires its own `cause:'clear'` event on its own path**; `Q-7`'s *"no second clear-event"* is read
narrowly and superseded beside at that scope.
**`L-4`** (`RH-2` inside the `5`-fixed tally) is **CARRIED-WITH-OWNER** (the architect, at `RH-2`'s contract
gate); **`L-5`** is closed by **`N-17`** (the slice never routes an unowned id into `focus-model`; the
renderability query answers first); **`L-6`** is closed **as a disposition** — one declaration site, `FOCUS`
declaring and `CORE` consuming — with the honest consequence recorded below.
**Step 2's `R-1`…`R-6` are all closed by round 3**: `R-1` (`theme`) and `R-2` (the pure-side negative row)
by **`R3-4`**; `R-3` (the multi-reference crossing) by **`R3-5`**; `R-4` (`remove`) by **`R3-6`**; `R-5`
(the five count sites) by round 3's annotation work; `R-6` (the strip's ordering consequence) by **`R3-7`**
plus the parks rows.

### §4 THE PER-UNIT AND PER-LIMB DISPOSITION — THE BINDING TABLE

| Part / unit | Disposition | Where it lands / what it waits on |
| --- | --- | --- |
| the four tiers' placement; the layered read and its five cases; the merged arm + `parts`; the trie; the registry (`G-1`…`G-10`, `H-1`…`H-6`); the constraint table + `REPAIR`; `remove`/`clear`/`sweep`; the seven-arm event table; `R3-6`'s downward removal; `R3-5`'s reference-set crossing | **ADMITTED** | `U-STORE-CORE`'s contract; the `clear`/`sweep` receipts and the trie's two queries pinned **in** it |
| tier 1's channel; the atomic/`fsync`/`tmp`/recovery duties; the changed boot order; the settings schema version; the `Q-5` module-store migration with **both** writer classes re-pointed | **ADMITTED** | `U-STORE-PERSIST`'s contract |
| tier 4's re-home; the atomic write replacing `persist()`'s plain `writeFileSync`; the receipt replacing the swallow; the `secure.*` typed refusal; `RH-3`'s two halves | **ADMITTED** | `U-STORE-SECURITY`'s contract |
| the tabs/focus slice; the rendered tab strip; the layout record + `file.window.bounds` + `ZQ-2`/`ZQ-3`/`ZQ-4`; the drag episode + `SINK-1`..`5` + `RH-2`'s gate; the shared-surface adoption (`15 = 8 + 7`) | **PROPOSALS (`NOT-DELEGABLE`)** | plan `§6.5`'s round-3 table; `docs/pending.md` `P-6`; `FOCUS` additionally on `docs/specs/focus-model.md`'s refusal rows + `docs/specs/focus-tool-greens.md` `FT-09`; `DRAG` additionally on `docs/specs/gutter-ui.md` §2.3 row 16; `MODULES` additionally on §5 item 7 |
| `docs/specs/mcp-endpoint.md` §3.8 + its item 2; `docs/specs/focus-tool.md`'s refusal rows; `docs/specs/gutter-ui.md` §2.3 row 16; `docs/FORKER.md` §1's cell + §4's `### PERSISTENCE`; `docs/specs/census.md`'s `A-19` probe; the ten shared-module contracts' no-store language | **ROUTED / CITE-ONLY** | each under its own gate; **not performed and not edited here** |
| the parked zone-minimize unit; the `Q-11` `live-drive` citation; `X-1`/`X-2`/`X-3`; the mirror; `NW-1`; `lowerAliases`; `C-4`'s alias list; the wildcard `remove` | **SUPERSEDED** (annotated beside; `NW-1`'s number retired) | by this model's own gates; `docs/pending.md` `P-2` |
| `docs/next-steps.md` | **CARRIED** — `21 DONE / 0 open`, UNITS = `21`, `RCA-8(f)` unchanged | owner: the architect; **positive revisit condition: the admission row(s) for the three units** |
| `docs/specs/store-core-adoption-dossier.md` | **OWED — an obligation, not a default** (§5) | owner: `U-STORE-CORE`'s spec-gate pass; **positive revisit condition: `CORE`'s spec gate opens, at which point it is an entry condition and its absence is a finding** |

### §5 THE SEMANTICS BLOCK — STEP 0

**(a) STEP 0 RAN, before the verdict was formed.** It inspected the plan **in full, section by section**;
the five filed review artifacts; `docs/decisions.md` at the facility row, its dated `SUPERSEDED` marker and
the four store rows; `docs/pending.md` (`§P` and the parks region's rows `P-1`…`P-6`); `docs/next-steps.md`'s
live counts; and globs of `docs/specs/*review*.md` and `docs/specs/store*`. **No `src/**`, no `tests/**`,
nothing run.**

**(b) THE ADOPTION-TRIGGER DETERMINATION, identifier by identifier.** **ADOPTED** (origin outside this
project, cited): the four tier tokens `file` · `mem` · `temp` · `secure` (the architect's four-store
sentence, carried verbatim at the plan's `§0`; pinned by `§1.1`, `§1.3`'s grammar, `§1.8` `G-3`/`G-5`;
`docs/decisions.md` · `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1)); the **layered read** with its
`value`/`cache`/`name` members (`§1.2`, `§1.9` (v)); the per-tier **`get`/`set`** surface (`§1.1`, `§1.8`
`H-5`/`H-6`); **`commit`** (`§1.4` `C-1`..`C-5`, `C-4-R`, `R3-6`); **`subscribe`** and the
reference-listener paradigm, incl. the round-2 `{subtree:true}` opt-in and its `descendant` arm (`§1.5`
`B-6`, `§1.9` (iii)); **`parts`**, the **merged read**, the **residency trie** and the **pattern table**
(round-2 answers 3/4, quoted at `§0` `B-3`/`B-4`; `§1.9` (i)/(ii), `§1.8`); the **constraint kinds** and
the **seven `cause` tokens** (round-2 answers 5/6; `§1.9` (iv), `§1.5`); **`landing`/`tabId`** as a
**declaration key** and never as store vocabulary (`§1.3` `R-1`; the slice's declaration set is
`FOCUS`'s). **MINTED HERE** (origin is this plan, pinned by its own clause): `remove` · `clear` · `sweep` ·
`has` (`§1.1` store 2, `§1.4` `C-5`, `§1.7` item 4, `§1.9` (v)); the `tier` return member; the
**refusal-reason token union** (`§1.8`, `§1.4` `C-4-R2`, `§3.9` (iii) — **the union's closure is a
contract-shape decision the spec makes**); **`storeReferences`** (`§1.3` `R-2`, `§3.6` `A-6` — **home
undecided**). **PROHIBITED, NOT ADOPTED**: the **mirror-class taxonomy** (`is-empty`/`is-minimized`/
`is-revealed`; the fork-origin literal `minimized`) — `docs/specs/container.md` `P-CT-1` with `H-r15`'s
hazard; the store's `R-1` and `ZQ-2` bind it, and the registry's own bytes carry the same negative. **The
precedent for why this column is mandatory:** `docs/pending.md` §L `P-5` records that the adopted identifier
**`threshold`** collided with **three** landed prohibition tables and **no gate step grepped for it**.
**CITED-ONLY, never adopted**: `FocusRefusalCode` (function-internal, `§1.7` item 9); the fork's
`live-drive.mjs` (`§8.6`); `Supervisor`/`finalizeHookCount` (reached by the `provident-ssr/core/registry`
**subpath**, `§7.1`).

**(c) THE DOSSIER DETERMINATION — AN OBLIGATION, RECORDED.** **The trigger FIRES**: the three admitted
units' contract vocabulary is the architect's own. The plan says so itself (`§8.1`) and names the artifact:
**`docs/specs/store-core-adoption-dossier.md`**. **That file does not exist** (glob `docs/specs/store*` →
nothing), and step 1's `D-1` recorded the absence with its owner (*"the spec/gate-1 pass of the FIRST
ADMITTED store unit"*). **Therefore: a dossier IS owed, by `U-STORE-CORE`, before its red set is
delegated**, with the **collision block** owed in the same artifact: each prohibition-row hit reconciled by
row id — `S-d8` prohibition 4 + layer 1 `§5` `A-2` (reconciled: clause 1 superseded by the ACTIVE row
`FOUNDATION-STORE-FACILITY-IS-OPENED-…`, clauses 2/3 surviving); `container.md` `P-CT-1`/`H-r15`
(reconciled: not adopted); `zones.md` `P-1`/`P-3`/`P-4` and `census.md` `P-3`/`A-19` (reconciled for these
units; `P-4`'s general-form supersession **has no `docs/decisions.md` row** — §6 item 7 below);
`gsession.md` §2.5 (untouched); `E10`/`S-PURE-4`/`§6.4`/`A-7`/`MCP-STATELESS-HTTP`/`PAR-1`
(untouched/re-asserted).
**The dossier's ≤8 identifier rows, exact:** (1) `file` · (2) `mem` · (3) `temp` · (4) `secure` · (5) the
per-tier `get`/`set` surface · (6) the layered `read` (+ `value`/`cache`/`name`) · (7) `commit` · (8)
`subscribe` + the reference-listener paradigm. **Each row carries**: the identifier; its kind; what it
measures/decides; its unit; **its domain and the values outside it**; the observable that proves it; the
clause that pins it; **ownership in labelled columns (who supplies / who evaluates — never as a
definition)**; the mandatory source citation (*the architect's words, plan `§0` + `§<n>`; `docs/decisions.md`
· `<D-id>`*); and STATUS. **All eight are `defined`.**
**OVERFLOW → THE OPEN-SEMANTICS LIST (never dropped):** the merged read + `parts`; the residency trie; the
pattern table; the constraint table + `REPAIR`; the event envelope + the seven `cause` tokens; the refusal
token union's closure; `landing`/`<tabId>` (FOCUS's dossier, not CORE's); `storeReferences` (semantics
defined, home an ownership question); `remove`/`clear`/`sweep`/`has`; and the mirror-class taxonomy as
**PROHIBITED**. **No entry in either list is `undefined-until-answered`, so no row forbids the delegable
verdict.** **A recorded reading:** the overflow rule is read as biting on entries whose **STATUS is
`undefined-until-answered`**; if the architect reads it strictly, the lawful remedy is to raise the dossier's
row budget or to split the round-2/round-3 vocabulary into the sibling registers (the plan's `§8.1` round-2
table already does this for the round-2 vocabulary) — **never a semantic block**. **STEP 0 decides no
semantics: every row cites a source or is filed above.**
**A zero-row dossier is NOT available** (these are adopting units), and no silent default is taken.
**The recorded exemption for the other two units:** `U-STORE-PERSIST` and `U-STORE-SECURITY` owe **no
separate dossier** because their adopted vocabulary is a **strict subset** of `CORE`'s rows, and **each
unit's spec must cite `docs/specs/store-core-adoption-dossier.md` by path and state the subsumption row by
row**; a silent non-citation is a review finding at that spec gate.
**A PROCESS FINDING, RECORDED RATHER THAN SMOOTHED:** on the strict reading the dossier was owed **before**
this gate-1 ran and did not land. **It does not force `BLOCKED-ON-SEMANTICS`** (no row is undefined), **and
it does not require re-running gate 1** — the identifier set is fully cited in the plan's own text and above.
Owner: `CORE`'s spec-gate pass.

**(d) THE OPEN-ROW LIST AND THE OPEN-SEMANTICS LIST.** Every finding of both remands is dispositioned, one
row each, at the plan's `§5.10` round-3 block (`FIXED` · `ROUTED` · `SUPERSEDED` · `CARRIED-WITH-OWNER`), and
its own arithmetic is printed with its terms (step 1's six persisting items = 5 FIXED + 1 carried; nine
dependencies = 8 carried + 1 routed; twenty-one findings all FIXED plus one SUPERSEDED; step 2's eight
findings = 6 FIXED + 2 carried; six residuals all FIXED). **The OPEN-SEMANTICS LIST is the overflow list in
(c) above — ten entries, all `defined` or `PROHIBITED`.** **Items carried with an owner and a positive
revisit condition, named rather than laundered:** `L-4`/`RH-2` (the architect, at `RH-2`'s gate); the
truncation-carried single-line cells (a shell-capable pass or the architect's own read — **and the round-3
restatements make the load-bearing ones readable, which narrows this carry**); `§5.9`'s unread-row sweep
(`docs/pending.md` `P-4`); `OPEN-1` (the tab list's cap — the architect; blocks no unit); the third tier-1
holder in `main` (a `PERSIST` row, §7 R1); the trie's session bound (a `CORE` register row, §7 R2); the
merged value's status (a `CORE` row, §7 R3); the registry's missing version field (a `CORE`+`PERSIST`
cross-row, §7 R4).

**(e) THE ARCHITECT'S ANSWERS OWED — SIX, NONE OF WHICH FORCES `BLOCKED-ON-SEMANTICS`.** Each is a
contract-content, ownership, tracker or routing decision about facts already decided, with options and a
recommendation carried, and **none has an `undefined-until-answered` row attached**:
1. **`storeReferences`' home and realm** — (a) inside `src/renderer/store-core.ts` (the registry **is**
   `CORE`'s second contract surface, and the read is in-renderer); (b) a renderer-side sibling; (c) the
   filing pass's `src/main/**` sibling of `store-channels.ts`, **which the read cannot import** (`[H]`:
   `src/renderer/renderer.ts`'s import block admits `./runtime.js`, `./secure-panels.js` and `../shared/**`
   only). **Recommendation: (a), with (b) as the extraction path. CONDITION for `CORE`'s spec gate.**
2. **The registry's declaration fixture for `CORE`'s first red set** — (a) a **test-only fixture of
   caller-style spellings** in `CORE`'s own spec, carrying a production-negative row so it cannot become a
   live surface (R-1-safe); (b) wait for `U-STORE-FOCUS`'s declaration set — **blocked: FOCUS is a proposal**;
   (c) read `N-18`'s resolution as putting the real names in `CORE`'s contract. **Recommendation: (a), with
   (c) as the eventual ordering. CONDITION; no block** (ownership never stands as a definition).
3. **The trie's two queries** (exact-leaf vs has-descendant) — both as register rows. **CONDITION.**
4. **`docs/decisions.md` · `FOUNDATION-STORE-FACILITY-IS-OPENED-…` clause 2** asserts the supersession
   *"IS THE ROUTE THE OLD ROW ITSELF NAMED"* while the plan's `§5.1` `Q-4` defines the taken route as *"NOT
   by reading the row's own affirmative new-gate route"*; the row's own dated `SUPERSEDED` marker already
   reconciles most of it (*"its clause 3 — THE NEW-GATE ROUTE … which is precisely the route the replacement
   row records as OPENED"*). (a) one dated **annotation-beside** under clause 2; (b) read clause 2 as a
   content claim and leave it; (c) a new ACTIVE row. **Recommendation: (a), owner the architect. CONDITION;
   no block** — no admitted unit consumes clause 2.
5. **Whether `docs/next-steps.md` receives the admission row for the three units** — (a) one row per unit
   (the ledger moves to `21 DONE / 3 open`, UNITS = `24`, the identity clause re-derived); (b) one
   consolidated non-unit row; (c) no row until each spec gate. **Recommendation: (a), written by the
   architect/orchestrator at the spec-gate boundary — a unit whose close has nowhere to land is a finding at
   gate 10. A docs-only pass may not write it (`RCA-8(f)`). CONDITION PRECEDENT to the spec gate.**
6. **The STEER (A) shared-surface supersession's landed record** — the largest supersession in the plan
   (fifteen modules' no-store rows; ten contracts' language) is classified at plan `§5.9` as
   **SUPERSESSION (architect-only)** and **has no `docs/decisions.md` row**. (a) one ACTIVE row before
   `U-STORE-MODULES`' spec gate; (b) let that contract cite the plan. **Recommendation: (a). CONDITION for a
   proposal's gate.**
**AND THE ORDERING QUESTION THE PLAN LEAVES TO THE ARCHITECT:** the fork-facing cell (`docs/FORKER.md` §1's
*"a persistence / config-file facility — the FORK OWNS ITS OWN CARRIER"* row, with §4's `### PERSISTENCE`
heading) is **false as of the facility's OPENING** (a landed ACTIVE row), not as of `U-STORE-MODULES`'
landing, yet `Q-14` ties its re-write to a pass **after** that unadmitted unit. **Recommendation (c): correct
the two now-false cells now, in a bounded declarative amendment, and leave the design-level re-write to
`Q-14`'s pass.** **CONDITION; no block.**

### §6 THE CONDITIONS, WITH OWNERS

| # | Condition | Owner | Forces a block? |
| --- | --- | --- | --- |
| **C-1** | the architect's `docs/next-steps.md` admission row(s) for the three units (a ledger row is an admission; `RCA-8(f)`) | architect | **NO — a condition precedent to each spec gate** |
| **C-2** | `docs/specs/store-core-adoption-dossier.md` lands with `CORE`'s spec gate (≤8 rows, all `defined`; the collision block; the overflow list), and `PERSIST`/`SECURITY` each cite it and record the subsumption row by row | `CORE`'s spec-gate pass; `PERSIST`/`SECURITY` spec writers | **NO** (no row is undefined) |
| **C-3** | the registry's declaration fixture's supplier is declared | `CORE`'s spec writer, on the architect's ruling | **NO** |
| **C-4** | `storeReferences`' file and realm are pinned | architect → `CORE`'s spec | **NO** |
| **C-5** | the `clear`/`sweep` receipt member sets and their tier-local-vs-generic placement are pinned **in** `CORE`'s contract (the plan's `C-5` carry) | `CORE`'s spec writer | **NO** |
| **C-6** | the trie's two queries are register rows | `CORE`'s spec writer | **NO** |
| **C-7** | every cap value **and its overflow outcome** (tier-2 collections, tier-3 entries, prefix/tier-wide subscriptions) is declared, and the trie's node count returns to its floor after a sweep | `CORE`'s spec writer; the architect reverses a value if he wishes | **NO** |
| **C-8** | the test-only reset/seed seam **and** the refusal-reason token union are pinned, with the seam carrying a production-negative row | `CORE`'s spec writer | **NO** |
| **C-9** | `PERSIST` pins the ordering/idempotency/kill-between-persist-and-receipt reconciliation; *"registered defaults"* for a generic file; the fail-disabled-vs-default-on-corrupt reconciliation; and the third `remove`'s single semantic | `PERSIST`'s spec writer | **NO** |
| **C-10** | **the third holder of tier-1 state in `main`** (the parsed record between the boot read and `Y-1`) is **named and bounded by a row** | `PERSIST`'s spec writer | **NO** |
| **C-11** | `SECURITY` pins the `RH-3` cap value + the burst's replacement + the declared test seam; whether `set()`'s return shape changes (marked a break if so); and the pane-cap/`maxJournalLength` relation | `SECURITY`'s spec writer, on the architect's ruling | **NO** |
| **C-12** | the `F-6` route reconciliation and the `F-7` §3.8 item 2 clause are routed, each under its own gate | architect | **NO** |
| **C-13** | `OPEN-1`, the `§5.9.1` sweep and the three proposals' gates proceed as carried | architect / the admittted units' writers | **NO** |

**NO CONDITION IN THIS RECORD FORCES `BLOCKED-ON-SEMANTICS`.** Every one is a contract-content, ownership,
tracker, routing or ordering decision about a fact already decided.

### §7 THE GATE CHAIN FOR THE THREE ADMITTED UNITS

Per unit: **spec gate** (the contract filed and approved — **the one approval the chain waits for**,
`AGENTS.md` item 10a) → **red** (`role_test_writer`, the failing set reported) → **green**
(`role_implementer`, least code) → **gate 4** (read-only adversarial **+ the read-only PBT audit**; findings
dispositioned, **never a bare `OWED`**) → **gate 5** (blind greens from the docs only) → **gate 6**
(**`STRUCTURAL` for all three**, with its structural reason stated per unit: **no admitted unit authors a
rendered surface**; the word `waived` may not be substituted; the `user-flow-audit.md` `§7.1` predicate is
**determined as not triggering for all three** — limbs A and B both absent — **and the determination is
recorded, with the admissible form being NO report; a zero-row report is INVALID**) → **gates 7/8**
(proofreader + per-unit documentation review, reviewer ≠ writer) → **gate 9** (the trio **plus the additive
`npm run typecheck:tests`**; **no new `scripts` key** — it would redden `tests/ui-leg-contract.test.ts`'s
`L-1`; `PERSIST` additionally owes `NW-17`'s preload set-equality row, which `L-1` cannot catch) → **gate 10**
(the DONE row + the ledger move **the architect must grant**), **committing at every boundary**
(`RCA-8(a)`), **one unit per commit** (`RCA-8(f)`).
**Registers:** each unit's contract carries its typed `§5.x` register **before** the red set
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`): `U-STORE-CORE`'s five corrected rows (`§8.2`'s round-3 block) plus
the trie/merge/constraint/matcher subjects, and — for every function it claims is a function of its
arguments — the three register rows with the **canonical structural comparator** where `===` is
unsatisfiable; `U-STORE-PERSIST`'s atomicity/`tmp`/migration/receipt rows; `U-STORE-SECURITY`'s
atomicity/refusal/two-holder/sanitize rows. **Per-unit falsifiers** are the ones printed at the plan's
`§1.9` (iv), `§1.4`'s round-3 block, `§1.5`'s round-3 block, `§1.8` `G-4`/`H-1`/`H-2`/`H-5`, `§2.5`'s `Y-2`
round-3 block, `§8.2` and `§8.3` — **and gate 4's falsifier for `CORE`'s `RH-1` row must import
`finalizeHookCount` from `provident-ssr/core/registry`** (**from the main entry it fails to compile**: the
cheapest possible red).

### §8 THE CHANGE PACKAGE

**The record itself** — this file, `docs/specs/data-ownership-model-review.md` (**verified free**:
`docs/specs/*review*.md` matches 18 files and not this one; `docs/specs/data-ownership*` matches the plan
only; `docs/specs/store*` matches nothing). It occupies the `docs/specs/<proposal>-review.md` gate-record
family (the 19th), modelled on `docs/specs/install-collision-one-element-one-session-review.md` and
`docs/specs/zone-gesture-preview-and-collapsed-drop-target-review.md`. **In `docs/pending.md` it takes NO
new disposition letter**: `§K`/`§L` are the request/finding sections and `§M`/`§N`/`§O`/`§P` are the landed
dispositions; **`§Q` is reserved, unlanded, to the parked install-collision package**; this record's tracker
half is a row in the **parks region** whose current set is `P-1`…`P-6`.
**`docs/pending.md`** — **ONE dated annotation BESIDE `P-6`** (anchored `edit`, never a rewrite): this
record's path; the closed vocabulary printed beside the two delegable words; the three units' delegability;
the dossier obligation and its owner; and the six architect questions. **`P-6` ALREADY carries the
three-admitted/five-proposals table with what each waits on** (verified at its own row) — so a new row would
duplicate it; take `P-7` only if the architect prefers a distinct row.
**`docs/decisions.md` — NONE OWED by this pass.** Every decision cited here is an already-landed ACTIVE row.
The two decision-side items are the architect's: clause 2's reconciliation (§5 (e) item 4) and the STEER (A)
row (§5 (e) item 6).
**ROUTED, each with its own gate and not performed here:** `docs/specs/mcp-endpoint.md` §3.8 (+ its item 2);
`docs/specs/focus-tool.md`'s refusal rows; `docs/specs/focus-model.md`'s refusal rows;
`docs/specs/focus-tool-greens.md` `FT-09`; `docs/specs/gutter-ui.md` §2.3 row 16; `docs/FORKER.md` §1's cell
and §4's `### PERSISTENCE` block; `docs/specs/census.md`'s `A-19` probe; the ten shared-module contracts'
no-store language.
**EXPLICITLY NOT TOUCHED:** `src/**` · `tests/**` · every spec other than the plan · `docs/FORKER.md`'s
cells · `docs/next-steps.md`'s counts and rows · `AGENTS.md` · `package.json`, any script or config ·
`docs/defects.md` · `docs/HANDOFF.md` · `archive/**`.
**THE RCA-8 BOUNDARY AND THE LEGS:** this is a **docs-only** change, so **no leg runs** — no `npm test` (the
suite), no `typecheck`, no `typecheck:tests`, no build, no `ui`, no `divergence`, no battery, no Electron
boot, no MCP session, **no `git` command**. One scoped commit per gate boundary, naming the gate
(`RCA-8(a)`); **anchored `edit`s only** (`RCA-8(d)`); the record is a NEW file (`RCA-8(c)`).

### §9 THE FORK CONSEQUENCE

**For the three admitted units the moving set is the HOST FILES AND THE NEW MODULES, NOT THE VENDORED TREE:**
`src/renderer/store-core.ts` (NEW, `CORE`) · `src/main/store-channels.ts` (NEW, `PERSIST`) ·
`storeReferences` (NEW, home undecided — §5 (e) item 1) · `src/main/main.ts` (handlers, atomic write, boot
order, migration) · `src/main/preload.ts` (three new members) · `src/main/security-store.ts` (the atomic
replacement + receipt) · `src/main/mcp-server.ts` (a one-line options pass) · `src/renderer/renderer.ts`
(subscriber wiring) · `<userData>/provident-settings.json` (NEW at runtime). **`src/shared/**` is NOT touched
by these three units** (`Q-3` keeps `src/shared/types.ts` byte-identical; `§6.3`'s `U-STORE-CORE` boundary is
*"plus zero edits to `src/shared/**`"*); the two modules whose own bytes move (`owned-list-host.ts`,
`slot-host.ts`) belong to `U-STORE-MODULES`, a **proposal**.
**WHAT THE FORK OWES:** **re-digest** the five host files + the new modules (this repo ships **no** per-module
digest table — the re-vendor is *"a SCHEDULING OBLIGATION WITH A LIST"*, plan `§5.6.5`); **re-run the
conformance leg (`N = 9`), which reads the built tree → a rebuild is required**; **re-decide its own carrier
question**; and **correct the two now-false fork-facing cells** (`docs/FORKER.md` §1's `Does NOT ship` row and
§4's `### PERSISTENCE` heading). **This repo writes no file under the fork's tree (`H-r6`).**
**THE ORDERING QUESTION, stated exactly:** the cell is false as of the facility's **opening** (a landed ACTIVE
row), not as of `U-STORE-MODULES`' landing, while `Q-14` ties its re-write to a pass after that unadmitted
unit. **Recommendation: correct the two now-false cells now (bounded, declarative) and leave the
design-level re-write to `Q-14`'s pass.** **CONDITION; no block** — the three admitted units move no vendored
byte.

### §10 RISK REGISTER, RESIDUALS AND THE FALSIFIER

| # | Risk | Falsifier / mitigation |
| --- | --- | --- |
| **R1** | **the third holder of tier-1 state in `main`** (the parsed record between the boot read and `Y-1`) — the shape `NW-1` was deleted for, relocated | a `PERSIST` row naming and bounding it (C-10); falsifier: a renderer `read` after the hand-off answers the handed-off value |
| **R2** | **the trie's session bound** (`set` grows a leaf per gesture; `sweep` unmarks but is not stated to prune; no node bound) | a `CORE` register row: after `M` gestures and a sweep the trie returns to its floor; the tier-3 cap value and overflow outcome declared (C-7) |
| **R3** | **the merged value's ownership** (`cache:null`, no tier behind a fresh composite) | a `CORE` row pinning a non-authoritative status or a declared snapshot; the `parts`-shadowing case carries a declared outcome |
| **R4** | **the registry's missing version field** (a persisted tenant-keyed table with no upgrade path) | a `CORE`+`PERSIST` cross-row; falsifier: an older declaration table must answer a **declared** outcome |
| **R5** | **the renderer owning a persisted file**: kill-between-persist-and-receipt; reload-mid-write (`RendererBackend.handleReset`'s landed *abandon in-flight work* posture `[H]`); two renderers, one file | `NW-15`'s duty becomes a `PERSIST` contract clause (C-9) + a negative row for the multi-realm case |
| **R6** | **scope creep inside `CORE`** (read + trie + merge + registry + constraints + lifecycle) | the register's row count is an **outcome, not a budget**; any split is **declared** |
| **R7** | **a dossier row filed without a source** | every row cites the architect's words or a clause; an uncited row is a finding |
| **R8** | **a landed ruling re-opened silently** | any `AMENDED`/`SUPERSEDED` marker on `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4`, `E10-SINGLE-SINK-CHANNEL`, `S-PURE-4`, `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, or `docs/specs/gutter-ui.md` §2.3 row 16 — all are cited by name only |
| **R9** | **a figure quoted as a measurement** (`RCA-12`) | every number here is a file read at a named section/row or `file:symbol`, or a cited artifact's own number with its owner named; **no leg, suite, battery, `tsc`, build or register figure is claimed**; **no timing figure exists** |
| **R10** | **the gate-1 record's own path colliding** | verified free by glob; a second record claiming `docs/specs/data-ownership-model-review.md` is a finding |
| **R11** | **a `docs/next-steps.md` count moving under this gate's name** | `21 DONE / 0 open`, UNITS = `21`, `RCA-8(f)`; the admission row is the architect's and is **not** written here |

**UNVERIFIABLE — CARRIED (each with its owner named; no bare `OWED` in this record):** the >2000-char
single-line cells (a shell-capable pass / the architect's own read — narrowed by round 3's restatements);
`node_modules/provident-ssr/**` (the `finalizeHookCount` subpath fact and the pane `Supervisor`'s missing
`maxJournalLength` are prior passes' reads, quoted with that ownership); `../Astrographer/**` and
`../Preempt-Providence/**`; `tests/**`; the family `P-*`/`P-CT-*` rows the plan did not read
(`docs/pending.md` `P-4`).
**FALSIFIER — WHAT WOULD OVERTURN THIS RECORD:** (1) a shell-capable read showing an **adopted** identifier is
undefined at the bytes → `BLOCKED-ON-SEMANTICS` at `CORE`'s spec gate, with the open list attached; (2) an
`[H]` read showing the renderer **can** import `src/main/**` (which would void §5 (e) item 1's premise);
(3) any `src/**`, `tests/**` or `docs/next-steps.md` byte or count moving under this gate's name; (4) an
architect ruling that no admission row will be written (a gate-10 finding, not a semantics block); (5) a
landed row contradicting the model's tier domain or the registry's refusal set.

### §11 PROVENANCE

**The four passes held read/search tools only; the three earlier passes wrote no file, and this record is the
supervisor's filing of step 4's returned report.** **Across all passes: no suite, no leg, no `tsc`, no
`typecheck:tests`, no build, no Electron boot, no `npm run ui`, no `divergence`, no battery, no register
execution, no `git`, no commit, and no file written.** The step reports are filed under `archive/gate1/` and
are cited by path rather than re-quoted:
`2026-10-01-DATA-OWNERSHIP-MODEL-gate1-step1-validity.md` · `…-step1-validity-remand.md` ·
`…-step2-critique.md` · `…-step2-critique-remand.md` · `…-step3-architecture.md`. **Every BINDING clause of
steps 1–3 that survives into this record is carried in this record's own text, so no reader needs the archive
to act on it.**
**Foundation read for this record:** `docs/specs/data-ownership-model-plan.md` (its `§0` preambles, `§1.1`–
`§1.9`, `§2.1`–`§2.5`, `§3.1`–`§3.9`, `§4.3`/`§4.4`, `§5.2`–`§5.10`, `§6.1`–`§6.5`, `§7.1`/`§7.3`,
`§8.1`–`§8.7`, `§9.1`, `§10`) · the five filed review artifacts · `docs/decisions.md` (the facility row in
full, its dated `SUPERSEDED` marker, and the four store rows) · `docs/pending.md` (`§P`; the parks region and
rows `P-1`…`P-6`; §L `P-5`'s `threshold` precedent) · `docs/next-steps.md`'s live counts · the globs
`docs/specs/*review*.md`, `docs/specs/data-ownership*`, `docs/specs/store*` · two gate-record precedents
(`install-collision-…-review.md`; `zone-gesture-preview-and-collapsed-drop-target-review.md` by its heading
set) · `AGENTS.md` items 3–11 and `RCA-1`…`RCA-12`. **Read only as filed, not re-verified here:** the
family specs' `P-*`/`P-CT-*` rows beyond those the plan cites; `node_modules/provident-ssr/**`; the fork's
tree; `tests/**`; `docs/HANDOFF.md`; `docs/guide/**`; `docs/skills/**`; `archive/**` other than the five step
reports. **No count, census, section id, row id or file name in this record is invented; no count was moved;
and every behavioural claim carries its layer label (`RCA-12`).**
