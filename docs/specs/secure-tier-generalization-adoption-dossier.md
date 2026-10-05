# ADOPTION DOSSIER — `U-STORE-SECURITY-GENERALIZED` (tier 4: arbitrary name-addressed storage + the MCP mutual-exclusion gate)

**STEP 0 run:** YES — this unit's contract vocabulary originates OUTSIDE this project's landed
tier-4 contract (it is an ARCHITECT PROPOSAL dated in-session, drawn from a provident-ssr store
member vocabulary this project adopted at `G1`/`G2`/`G3`, and from the spec wave's own vocabulary
in `docs/specs/data-ownership-model-plan.md` and `docs/specs/store-core-graph.md`). The zero-row
exemption is **NOT** available and is not claimed.

**Consuming project:** `/media/ryanr/Shared Files/Projects/Provident-Electron` (read-only this pass).
**Filing pass:** change-analysis (gate-1 step 4), read-only in the repo; this dossier is a scratch
artifact and is written OUTSIDE the repo by instruction.

**Adopted-unit boundary assumed for this dossier (the proposal's own three clauses):** (1) tier 4
saves to different files; (2) tier 4 does NOT permit lower-tier copies; (3) an access-control
policy keeps tier 4 unreadable by MCP-accessible methods, implemented as a mutual-exclusion state
machine between the MCP server and the security store.

**The proposal's THREE clauses are treated as THREE separable adopted surfaces, and the rows are
partitioned by that split** — `S` (tier shape), `A` (access-control/exclusion), `U` (the UI/graph
consequence). An `S`/`A`/`U` tag on each row is what makes the decomposition recommendation in the
gate record derivable from the dossier rather than asserted by it.

**HARD IMPOSED CAP: ≤ 8 identifier rows. 8 rows are used. 6 rows overflow to the OPEN-SEMANTICS
LIST below.** No row is dropped; every overflow item is filed as a question with candidate answers
and their consequences, per the STEP 0 rule.

---

## §1. THE IDENTIFIER ROWS

| # | Adopted identifier (as the proposal spells it) | Kind | What it measures / decides | Unit | Domain (and the values OUTSIDE it) | The observable that proves it | Pinned by | Source citation (mandatory) | STATUS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **A-1** `S` | **tier-4 name-addressed storage** — `secure.<top>[.<anchorKey>]...` holding ARBITRARY caller-named values | reference-grammar surface + storage facility | *decides* which names tier 4 can hold and how a caller addresses one | a caller-supplied dotted reference name | **IN (proposed):** any non-empty caller segment chain under a tier-4 top. **OUT (landed, binds today):** the whole domain is EMPTY — `store-core-graph.ts:478-479` refuses a declared name whose first segment is `secure` at CONSTRUCTION; `:922-923` refuses it on the READ walk at `B-SECURE-GATE`; `:1417` refuses it on the WRITE parse at `B-SECURE-GATE`; `:2277` refuses it in `subscribe`; `:766` excludes it from `rootParts`. **OUT also:** a tier token alone (`secure` with no top) and any empty segment — `parseName` → `malformed-name` (`:351-356`). | a named value stored under a caller-chosen name and read back **by name** through the tier's own API; today the same call answers a *typed refusal record* | `store-core-graph.md` `§2.3` item 1 (grammar: `<tier> ::= "temp" \| "mem" \| "file" \| "secure"`); `§2.5` items 1/2 (the refusal and its fixed precedence `secure → malformed → undeclared → …`); `store-security.md` `CURRENT STATE` item 4; `docs/specs/data-ownership-model-plan.md` `§1.1` store 4 (the tier "owns `{token, enabled[], maxJournalLength?}` … **That file, that path and that value are the tier's whole content**") | **undefined-until-answered** — *does tier 4 become name-addressed, and against WHICH registry (see A-5)?* |
| **A-2** `S` | **the store member vocabulary** — `set` · `get` · `commit` · `remove` · `clear` · `has` · `subscribe` · `resolve` | API surface (names + signatures + return shapes) | *decides* what a caller can do to a tier | one named reference per call, plus a value | **IN (proposed):** the same member set the generic store exposes. **OUT:** tier 4 is NOT a `GraphTierHandle` — `GraphNodeFlag = 'temp' \| 'mem' \| 'file'` (`:16`, `:255`) excludes `secure`, so `store.tiers` is `Object.freeze({temp, mem, file})` (`:2299-2303`) and `GraphTierHandle.tier: GraphTierToken` (`:60`) can never carry `'secure'`. **OUT (landed):** tier 4's own surface is `{ get(): SecuritySettings, set(patch): SecuritySettings, lastWriteReceipt(): SecurityWriteReceipt \| null }` — a **patch-shaped `set` with four fixed member names, no name parameter at all** (`security-store.ts:25-33`). | `store.tiers.secure` existing with `get/has/set/clear`; today `store.tiers.secure` is `undefined` and the four member names are the generic store's (`:2252-2298`) | `store-core-graph.ts:59-65` (`GraphTierHandle`), `:2252-2303` (the store literal + `tiers`); `store-core-graph.md` `§2.5` item 3 (the handle identity rule `cache === store.tiers[hit.flag]`) | **undefined-until-answered** — *which member set, and does tier 4 become a fourth `tiers` handle (which is a `GraphNodeFlag` domain change) or a parallel handle?* |
| **A-3** `S` | **`tier` / `durability`** — the residency carrier and its ordering | domain + invariant | *decides* what a node's tier flag may be and which direction a re-tier may go | a `GraphNodeFlag` per node; a rank per flag | **IN:** `GraphNodeFlag` is a closed three-member domain, and `DURABILITY_RANK = { file: 3, mem: 2, temp: 1 }` (`:262`) — tier 4 has **no rank**. **OUT (landed, binding):** `secure` is a separate main-side collection OUTSIDE the ordering and carries no graph node — the architect's amendment `A2` at `store-core-graph.md` `§0` ("*`secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS ORDERING AND CARRIES NO GRAPH NODE*"), enforced by `holderOf`'s `token !== 'secure'` guard (`:524`). | a tier-4 node existing in the graph, or a `durability(secure)` comparison; today neither is constructible | `store-core-graph.ts:16`, `:254-255`, `:262`, `:524`; `store-core-graph.md` `§0`(A2); `data-ownership-model-plan.md` `§1.1` store 4 Durability cell ("**highest** — and it is deliberately **outside the durability ordering the fall-through reads**") | **undefined-until-answered** — *is "not permitting lower-tier copies" (proposal clause 2) the same statement as "outside the durability ordering", or a stronger one?* |
| **A-4** `A` | **the `MCP-access` predicate / access-control policy token** | policy predicate | *decides* whether an agent-facing method may reach tier 4 | one method invocation (tool / resource / manual-UI IPC call) | **IN (proposed):** "MCP-accessible methods" = the `ProvidentMcpServer` tool + resource surface. **OUT:** the manual-UI channel `IPC_SECURITY_GET`/`IPC_SECURITY_SET` is **NOT** an MCP method and must stay reachable by the operator; the pane's bridge is `window.provident.security` (main→renderer→main) and is never registered as a tool. | the tool/resource registry census and the registered-tool set; today recorded as `ALL_TOOLS` 22 names (`mcp-server.ts:365-388`) and the group map `TOOL_GROUPS` (`security.ts:5-42`) — **no tier-4 token appears in either** | `mcp-endpoint.md` `§6.4` (the implementation-status block + "manual-UI-only by construction"); `data-ownership-model-plan.md` `§3.8` (the reader table); `foundation-app-data-model.md` `§5` `A-7`; `secure-panels.ts:1-17` (the isolation rationale) | **undefined-until-answered** — *"MCP-accessible method" is not a closed set in any landed record; is it `ALL_TOOLS` ∪ `ALL_RESOURCES`, or every method reachable from `backend.handleRequest`?* |
| **A-5** `S` | **the declared-name registry + its refusal tokens** | registry (the store's second contract surface) | *decides* which top-level names may be roots and which are refused, BY NAME | a declared row `{name, reserved?}`; a refusal token string | **IN (landed):** the registry is the graph's **top-level projection**, one row per root (`GraphRegisterRow`, `:75-85`); its construction-refusal set is closed at six arms (`loadDeclarations`, `:466-500`) and the **refusal union is closed at 16 members** (`:18-22`). **OUT (landed):** a declared row carrying a `secure` first segment is refused `'secure-refused'` **at construction** (`:478-479`), so "no `secure` spelling is ever a loading declaration". **OUT:** an arbitrary caller name is a **non-root** path, which the register does **not** hold at all. | the register's row set (`store.register.rows`, `:2304-2306`) and its `derived` flag; today a `secure`-rooted row is unconstructible | `store-core-graph.ts:18-22` (the closed union), `:75-85`, `:466-500`, `:2304-2306`; `store-core-graph.md` `§2.4` item 5, `§7a.1` item 1 (the union count `16 = 8` held + `5` + `3`); `store-security.md` `§2.4` item 1 | **undefined-until-answered** — *when an arbitrary tier-4 name arrives at a MULTI-WRITER (renderer + main) store in a re-firing renderer realm, does it enter the declared registry (a re-declaration surface, since `declarations` is construction-only, `renderer.ts:90-93`) or a store-internal map?* |
| **A-6** `A` | **the mutual-exclusion state machine's vocabulary** (`disabled` / `disabled-write` / `open` / `read-only` / `unavailable`) | state machine + refusal forms | *decides* whether the MCP server and the security store may both be open | the pair (MCP server availability, store availability) — process-global | **IN (proposed):** two mutually exclusive states plus (unstated) transitional ones. **OUT (landed, binding today):** there is **no exclusion state at all** — `SecurityGate` holds a token + an enabled-group set (`security.ts:184-214`) and `applyGatePatch` re-gates a RUNNING server in place (`mcp-server.ts:341`, `:438`; `main.ts:381`). A store write today **re-gates** the live server; it never disables it. **OUT also:** `enabled` is an array-only surface (`SecuritySettings.enabled: string[]`, `types.ts:316-323`) and `loadDeclarations` refuses `reserved` collisions by NAME (`:486-490`). | the server's answer to a tool call while the store is open, and the store's answer while the server is live; today both are simultaneously available — the excluded state is **unreachable** | `security.ts:184-214`; `mcp-server.ts:336-348`, `:438`; `main.ts:369-383`; `mcp-endpoint.md` `§6.4`; `store-security.md` `§0A` item 8 ("THE GATE RE-GATE IS UNCHANGED … COMPOSED WITH, never rewritten") | **undefined-until-answered** — *the state names, the terminal set, and what a refusal is called (`disabled`/`refused`/`unavailable`) are the architect's, and none is currently spelled anywhere in this project* |
| **A-7** `U` | **the isolated pane graph** (`createIsolatedScope()` · own hub · own `Supervisor` · own `DomAdapter`) | isolation mechanism | *decides* whether the operator UI is reachable from the MCP surface | one `GraphScope` instance, the pane's nodes, and the pane's mount element | **IN (proposal-implied):** the isolated graph **survives** but is no longer the access-control mechanism. **OUT (landed demand):** D1–D8 is a LANDED contract (`secure-panels.md` `§2`, `§4`, `§5a`–`§5e`, with 5 adversarial + e2e adversarial suites and the upstream `ISO-ADV-D` defect chain) and the AGENTS.md project-wide UI-rendering constraint requires the pane to be provident-authored data. **OUT:** a hand-written DOM pane is a review finding (AGENTS.md, "UI rendering" constraint). | `Runtime.renderedHtmlResult()`/`listTargets()` containing no pane content; a `dispatch` on a pane id throwing `/unresolved target/` | `secure-panels.md` `§2` (D1–D8), `§4`, `§5a`–`§5e`; `mcp-endpoint.md` `§6.4` (the isolated-graph bullet); `src/renderer/secure-panels.ts:1-17`, `:235-291`; `AGENTS.md`'s UI-rendering constraint | **undefined-until-answered** — *if the mutual-exclusion gate replaces the isolated graph as the control, does D1–D8 remain a CONTRACT (re-freeze/amendment) or become a presentation detail?* |
| **A-8** `A`+`S` | **"not permitting lower-tier copies" (proposal clause 2) vs. "the tier is not in the fall-through"** | namespace rule + persistence direction | *decides* what a tier-4 write does to the SAME logical path resident at other tiers | a (logical path, tier) pair | **IN (landed, binds today):** a tier-4 write is unconstructible; the stated landed rule is "not in the fall-through" — the FALL-THROUGH READ is what excludes it (qualified reads do NOT fall through, `store-core-graph.md` `§2.5` item 4 case (ii)). **OUT:** any tier-4 value resident at another tier; any tier-4 participation in a commit's clear-lower sweep (`clearLowerCopies`, `:1658-1669`, iterates `rootHolders` and compares `DURABILITY_RANK` — with `secure` unranked it cannot participate). **OUT also:** the STRONGER reading (tier 4 clears other tiers on commit) is not stated anywhere landed. | a `secure.<path>` value and the same logical path at `file`/`mem`/`temp` after a tier-4 commit — coexist, cleared, or refused | `data-ownership-model-plan.md` `§1.1` store 4 ("deliberately outside the durability ordering the fall-through reads"); `§1.3` `R-4`; `§3.8`; `stack:clearLowerCopies`; `store-core-graph.ts:1648-1669`, `:262` | **undefined-until-answered** — *three-way fork: (i) excluded-from-read only, (ii) clear the others on write, (iii) REFUSE the tier-4 write when a same-logical-path copy exists elsewhere. Each implies a different register and different error surface.* |

---

## §2. THE COLLISION BLOCK (mandatory; every hit reconciled BY ROW ID or raised as a RE-NAME REQUEST)

The consuming project's prohibition rows consulted, by path and row: `docs/specs/store-core-graph.md`
`§2.2`'s `P-1`…`P-11` and the closed 16-member refusal union at `§2.1`; `docs/specs/mcp-endpoint.md`
`§6.4`; `docs/specs/foundation-app-data-model.md` `§5` `A-7`; `docs/specs/ci-ui-leg.md` `§0`
prohibitions 1–6 and `§3.5` `SEAM-4`; `docs/specs/secure-panels.md` D1–D8 (`§2`, `§4`);
`docs/specs/data-ownership-model-plan.md` `§2.3` row 2.4-12 and `§3.8`'s three forbidden reads;
`docs/specs/store-security.md` `§1.3` item 1 and `§2.4` item 3.

| Hit | Row id + its own words (abridged, cited not restated) | Reconciliation |
| --- | --- | --- |
| **C-1** | `store-core-graph.md` `§2.2` **`P-4`** — *"No new MCP surface, no new seam, and no change to any frozen contract"*: `ALL_TOOLS`, `RpcMethod`, `MUTATING_METHODS`, `VALID_GROUPS`, the preload member set, the `scripts` key set are **UNMOVED** | **LEGITIMATE IN THIS LAYER — but CONDITIONAL.** The proposal adds no tool and no resource, so `P-4` is not breached by the mutual-exclusion gate *as stated*. It **would** be breached by any implementation that adds a tool to query or flip the exclusion state ("what is the server's state?"). **CONDITION:** the exclusion state must be observable only through the manual-UI IPC channel (a new `IPC_*` constant on `src/main/store-channels.ts` or a member of the existing `security.set` patch), never through a tool. `store-core-graph.md` `§1.3` item 3 / `§2.2` `P-4`. |
| **C-2** | `store-core-graph.md` `§2.1`'s block annotation + `§2.4` item 1 — the **CLOSED 16-member refusal union** (`16 = 8` held + `5` + `3`), `'secure-refused'` among the held 8; `store-security.md` `§2.4` items 1/3 — *"this unit adds NO second refusal site"* and *"a byte of THIS unit's diff that spells `secure-refused` … is a COLLISION finding"* | **RE-NAME REQUEST (not a relaxation).** Making tier 4 name-addressed REQUIRES a NEW refusal reason for the "tier 4 is unavailable while the MCP server is open" state. That token cannot be `'secure-refused'` (already held, and its meaning is "the generic surface refuses a `secure.*` name"), and it cannot be silently added to the 16-member union without a re-freeze. **Also a RE-NAME REQUEST on `'secure-refused'` ITSELF:** if tier 4 becomes legitimately addressable, the token's own meaning narrows to "refused while the exclusion state is closed" and its name becomes a misnomer in the store's own vocabulary. **Consequence:** either a new `GraphRefusalReason` member (union `16 → 17`, a re-freeze of `docs/specs/store-core-module-store-core-graph-surface.md` with a new sha256 + amendment row) or the refusal is carried OUTSIDE the store's union as a channel token (the `G2`/`G3` precedent: `SecurityWriteReceipt` is deliberately NOT in the union). **The architect must pick which.** |
| **C-3** | `store-core-graph.md` `§2.2` **`P-1`** — *"No consumer vocabulary — no `tab`/`pane`/`zone`/`gutter`/`region` token AS THE STORE'S OWN VOCABULARY"*; **`§0A` note 1/2** — the store's own bytes must stand a scan with an **EMPTY** exemption set, which is why the caller's spellings live in `store-graph-references.ts` | **LEGITIMATE IN THIS LAYER — reconciled by row `A-1` + `A-5` and by the module boundary.** Arbitrary caller names are the CALLER's strings, carried verbatim (the landed discipline, `store-graph-references.ts:29-35`). **But note the consequence the proposal has not priced:** a name-addressable tier 4 whose top-level names are ARBITRARY changes the *registry*-vs-*data* split — a caller naming a top must be re-declarable at runtime, and the declarations input is construction-only (`renderer.ts:90-93`). **This is the `A-5` open row, not a `P-1` breach.** |
| **C-4** | `store-core-graph.md` `§2.2` **`P-6`** / `§0` ruling 20 — *"THE STORE REFUSES NAMES, TIERS AND CAPS; IT NEVER REFUSES SIZES"*; **`P-9`** — *"No element, no coordinate, no geometry, no magnitude, no clock"* | **LEGITIMATE IN THIS LAYER.** Arbitrary VALUES are `unknown` and opaque at every tier below `file` (`:1554-1559`: "*A mem/temp write NEVER refuses a size, a magnitude or a shape*"), while the `file` tier has ONE declared non-representability rule (the stable-JSON translation). **CONDITION carried:** tier 4 persists to a FILE, so it inherits the `file` tier's representability rule — a tier-4 value that cannot be serialized must refuse, and the refusal token is the `file` tier's (`'serialize-failed'` / `'validate-failed'`), not a new one. |
| **C-5** | `store-core-graph.md` `§2.5` items 1/2 — the typed refusal at `B-SECURE-GATE`, *"REFUSES `secure` before anything else"*, with the precedence **`secure → malformed → undeclared → …`** | **RE-NAME REQUEST / EXPLICIT CONTRACT CHANGE.** The proposal's clause 3 **cannot** coexist with this row as written: the row's whole content is that `secure.*` is refused at the FIRST step of the walk, whereas the proposal requires `secure.*` to be a legitimate name behind an exclusion gate. **This is not a prohibition relaxation** — the row is a *contract clause*, and the proposal supersedes it. **The requested form:** the `B-SECURE-GATE` step is RE-DEFINED from *"refuse every `secure.*`"* to *"evaluate the exclusion state"* — i.e. the step's ID survives, its predicate changes from a constant `true`-refusal to a state read. **A re-freeze is owed** (`store-core-graph.ts` is a frozen-surface edit-set member; the operative digest is `sha256:29772ac7…`, `docs/next-steps.md`'s `G2`/`G1` cells). |
| **C-6** | `mcp-endpoint.md` `§6.4` — *"The settings surface is **manual-UI-only by construction**: the IPC channel is main→renderer→main, the MCP tool handlers never route to it, AND the pane lives in an isolated graph the MCP endpoints cannot read/dispatch."* | **LEGITIMATE IN THIS LAYER — and the proposal is STRONGER here, not weaker.** The mutual-exclusion gate adds a THIRD mechanism to the two already stated (channel unreachability + graph isolation). **Amendment, not supersession:** `§6.4` is an accumulation of mechanisms; the proposal adds one. **BUT a genuine tension exists and must be stated:** `§6.4`'s isolation half has been the *load-bearing* claim in five adversarial suites; if the gate is adopted, the isolation half becomes *defence in depth* while the gate becomes the *stated* control at `§6.4`. That is an amendment to which clause is called load-bearing — a documentation change with a security consequence. |
| **C-7** | `foundation-app-data-model.md` `§5` `A-7` — *"No MCP-visible path to the operator's configuration … An agent **cannot grant itself capabilities**"* | **LEGITIMATE IN THIS LAYER.** The mutual-exclusion gate is aimed precisely at `A-7`'s stated property. **No hit.** The proposal does not make the operator's configuration MCP-visible; whether it *forbids a capability grant* is unchanged (the gate is not a grant path). **The one caveat:** `A-7`'s row cites the isolated graph as one of its warranting mechanisms; if D1–D8 stops being a contract (see C-9), `A-7`'s citation must be re-pointed. That is a cross-reference consequence, not a breach. |
| **C-8** | `ci-ui-leg.md` `§0` **prohibition 3** — *"No policy defaults"* (the leg must not set a security default), pinned again at `§3.5` **`SEAM-4`** — *"The override does not flip a security default. The default enabled-group set (`read` + `dispatch`) is unchanged"* | **LEGITIMATE IN THIS LAYER — reconciled by row `A-6` with a carried CONDITION.** The two mutual-exclusion states are a NEW axis, not a change to the `read`+`dispatch` default set, so neither `SEAM-4` nor prohibition 3 is breached *by the state machine itself*. **CONDITION, and it is a real one:** if the "open the security store" action is implemented by DISABLING groups or by a new `enabled` member (e.g. `'secure'` as a sixth `VALID_GROUPS` member), then it **widens the default set** and breaches `SEAM-4` + the leg's prohibition 3, and `VALID_GROUPS` is frozen at five (`security.ts:138`, `security-store.ts:35`, `secure-panels.ts:56`). **The exclusion state must be a SEPARATE axis from the group set.** |
| **C-9** | `secure-panels.md` **D1–D8** (`§2`, `§4`, `§5a`–`§5e`): own `GraphScope`, own hub, own `Supervisor`, own `DomAdapter`; *"No cross-graph addressability"*; *"Manual-UI-only by construction"* | **LEGITIMATE IN THIS LAYER — reconciled by row `A-7` with an explicit CONDITION.** The proposal does not require the pane to become MCP-reachable: the operator still uses the manual-UI channel, which is not an MCP method (`A-4`). **CONDITION (the crux):** D1–D8 must NOT be read as *retired by* the gate. If the gate is present, the isolated graph is still required by (a) the AGENTS.md UI-rendering constraint and (b) five landed adversarial suites whose subjects are isolation. **The admissible move is an AMENDMENT that re-labels D1–D8 from "the security control" to "the UI-rendering constraint's realisation + defence in depth" — never a removal.** |
| **C-10** | `data-ownership-model-plan.md` `§2.3` **row 2.4-12** — *"`cfg: SecuritySettings` (the pane's snapshot) … **It must NOT be re-homed into a generic store** — routing the security snapshot through the generic read would put `secure.*` inside a fall-through structure and **widen `§6.4`'s channel by construction**."* | **RE-NAME REQUEST — this is a DIRECT HIT AND THE PROPOSAL AS STATED BREACHES IT.** Row 2.4-12 forbids the pane's security snapshot being re-homed into the generic store **because doing so would put `secure.*` inside a fall-through structure**. The proposal's clause 3 (mutual exclusion INSTEAD OF isolated-graph separation) is exactly the arrangement 2.4-12 was written to prevent — **unless** the architect also rules that the second sentence's objection is discharged by the exclusion gate. **Two admissible forms:** (a) the pane keeps its `cfg` snapshot OUT of the store (row 2.4-12 intact; the store is the operator's *own* surface, reached only by the store's own API) — **this is the reading the proposal's wording most supports** ("opening the security store for read/write" ≠ "the pane reads through the store"); or (b) the pane's snapshot IS re-homed, which **requires 2.4-12's second sentence to be superseded by an architect ruling**, not by a unit. **The proposal does not say which. This is a hard open row.** |
| **C-11** | `data-ownership-model-plan.md` `§3.8` — **the three forbidden reads**: *(1) a `read('secure.operator.token')` anywhere in the renderer; (2) a `subscribe('secure.*')`; (3) a tier-4 value inside a graph node, a tool result, a resource, or a notification payload. "Each is a row, and each is a finding if present."* | **THE THREE ARE NOT ONE PROHIBITION — SEPARATE THEM PRECISELY.** **(1) and (2)** forbid *renderer-originated generic-surface access to tier 4*. The proposal's gate plausibly satisfies (1)/(2) if the store stays main-side (`A-2`'s open row decides this). **(3) IS A DIFFERENT KIND OF PROHIBITION — it is a CARRIER prohibition** ("a tier-4 VALUE must not appear in a graph node / tool result / resource / notification"), and it is **NOT** a prohibition on tier 4 holding arbitrary data. Holding an arbitrary-value tier 4 in `main`, reachable only by the store's own API, is **compatible with (3)**; putting a tier-4 value into a node or a tool result is not, whatever the store's shape. **Ruling:** rows that say "tier 4 must hold no arbitrary data" — **there are NONE** (the closest is `§1.1` store 4's descriptive *"That file, that path and that value are the tier's whole content"*, an OBSERVATION about today, not a prohibition). Rows that say "a tier-4 value must not reach these four carriers" — **`§3.8`(3)**, `store-security.md` `CURRENT STATE` item 6, and `mcp-endpoint.md` `§6.4`'s isolation half. **The proposal changes NOTHING about the latter; it targets only the layout/access question.** This distinction is the single most important reconciliation in this block. |
| **C-12** | `store-security.md` `§1.3` item 1 — *"The store module's bytes do NOT move in this unit … **The `secure.*` refusal is the store's OWN landed surface** — this unit does NOT edit it, does NOT extend the 16-member refusal union, and adds NO second refusal site."* + `§2.4` item 3 | **RE-NAME REQUEST / EXPLICIT CONTRACT CHANGE.** `G3`'s own boundary declaration is that the store module's bytes do not move. The proposal **requires** them to move. **This is a legitimate supersession with a cost, not a breach:** `G3`'s clause is scoped *"in this unit"*, so a NEW unit may move the bytes; what it may NOT do is treat the move as free. **Cost carried:** a store re-freeze, a new digest, an amendment row, and a re-cycle of the seat + integration sets (`docs/specs/store-core-module-store-core-graph-surface.md` field 8 + its amendment table). |
| **C-13** | `store-core-graph.md` `§2.2` **`P-2`** — anchors immutable, no flag rewritten in place; **`P-5`** — *"No throw on any declared-domain input … exactly THREE"* throw classes; **`P-8`** — no global engine-id-keyed map | **LEGITIMATE IN THIS LAYER, with two carried reasons.** Arbitrary names do not mutate anchors (a name-addressed write is an ordinary mint/edit, `:1505-1537`); a tier-4 write on an OORPHANED or unavailable path must answer an ordinary RECEIPT, not a throw (`P-5`'s three-throw closed set is UNCHANGED, and the new gate's refusal must therefore be a returned record — consistent with `C-2`). |

**Unreconciled hits: NONE.** Every consulted row above is either reconciled by a row id or raised as
an explicit RE-NAME REQUEST (`C-2`, `C-5`, `C-10`, `C-12`). **`C-10` is recorded as the dossier's one
hit that the proposal AS STATED does not discharge** — it requires an architect ruling, not a
reading.

**An unreconciled hit is a finding** — and per that rule, `C-10` is reported as finding **F-3** in the
gate record.

---

## §3. THE OPEN-SEMANTICS LIST (the six rows that overflowed the ≤8 cap; each is a question, with
candidate answers and their consequences. NONE is decided here.)

**O-1 (overflow of `A-1`) — Is tier 4 namespaced under a tier-4-only top (`secure.<top>…`, mirroring
`file`/`mem`/`temp`), and is the proposal's clause 1 ("saving to different files") a statement about a
tier-4-specific FILE PER NAMESPACE or one file for the whole tier?**
· (a) one namespace, one file — simplest, and the only reading `data-ownership-model-plan.md` `§1.1`
store 4 supports today (one path, `<userData>/provident-security.json`); consequence: the earlier
"the witness gap" row applies — the `ui` leg witnesses exactly TWO file names
(`FORKER.md` `§4` (iv)), so a THIRD persisted file is unwitnessed by any leg and needs its own witness.
· (b) one namespace, one file PER TOP — consequence: the persisted-file census moves from exactly-two
to N, `FORKER.md` `§4` (ii)/(iv) and `store-persist.md`'s "EXACTLY-TWO persisted files" pin break, and
the `ui` witness must be rebuilt.
· (c) arbitrary names with NO shared `secure` prefix — consequence: `A-1`'s exclusion collides with
the `file` tier's `FILE_TIER_ROOT_NAMES` (`renderer.ts:43-50`) and with `RESERVED_NAMESPACES`
(`main.ts:25`), and `main.ts`'s settings-record read (`:114-136`, which admits only `file.`-prefixed
top-level keys plus `schemaVersion`) would have to widen.

**O-2 (overflow of `A-7`) — Does the isolated-graph requirement (D1–D8) survive as a CONTRACT, or
does the mutual-exclusion gate retire it to a presentation detail?**
· (a) survives as an AMENDED contract (re-labelled "UI-rendering constraint + defence in depth") —
consequence: `secure-panels.md` `§2`/`§4` gain a dated annotation; five adversarial suites keep their
subjects; the AGENTS.md UI constraint is untouched. **No re-freeze of the pane module is needed**
(`src/renderer/secure-panels.ts` is NOT in the store module's edit-set).
· (b) retired — consequence: five landed adversarial suites lose their subject and must be re-authored
or retired, and a hand-written pane would be required, which is an AGENTS.md review finding.
**This candidate is NOT admissible on the present record; it is listed because the proposal's wording
implies it and the implication must be ruled on explicitly rather than left implicit.**

**O-3 (overflow of `A-8`) — Does tier 4 CLEAR lower-tier copies of the same logical path on the
strength of the architect's "not permitting lower-tier copies"?** — this is `A-8`'s three-way fork,
repeated here because it is the highest-value unspelled clause in the proposal, and because one
candidate has a **cost the proposal has not priced**: candidate (ii) "clear the others on write" makes
tier 4 the FIRST tier whose write reaches DOWNWARD across the durability ordering, which the architect
`A2` amendment places `secure` OUTSIDE ("*`secure` IS A SEPARATE MAIN-SIDE COLLECTION OUTSIDE THIS
ORDERING*"). Candidate (iii) "REFUSE when a copy exists elsewhere" makes an operator `secure` write
fail because a renderer wrote the same path to `temp` — an authority inversion the store's `P-7`
("no second authority") does not coverage today. **All three candidates are live.**

**O-4 — WHAT IS THE DURABLE FORMAT, and what is the boot path?** `hydrate(rows)` today SKIPS every
non-`file` token (`store-core-graph.ts:2192-2196`: *"a refusal receipt (malformed / secure-refused) and
a tier-free or tier-only spelling are SKIPPED — hydrate mints `file.*` references only"*), and it mints
`file`-tier nodes only. **Question:** does a tier-4 record arrive at boot via a widened `hydrate`, via
the security store's own main-side read, or via a NEW seam? Candidates: (a) widen `hydrate`'s token
filter to `secure` — consequence: `hydrate` is a `HYDRATE-1`-declared seam with a frozen field-2
clause and a `P-5`-style closed throw set; widening it is a re-freeze. (b) keep `hydrate` `file`-only
and give tier 4 its own main-side boot read — consequence: no store re-freeze for the boot path, and
the two-holder shape (`current` + the file) persists.

**O-5 — WHERE DO ARBITRARY NAMES' DECLARATIONS LIVE?** The declared-row input is
CONSTRUCTION-ONLY (`renderer.ts:90-93`; `loadDeclarations()` runs once at factory construction,
`store-core-graph.ts:2249`). A re-firing renderer realm (`code.load` rebuilds the graph and a new
`Supervisor`, `store-core-graph.md` `§1`'s carried `[H]` fact) **re-constructs the store** — so a
runtime-added top-level name is LOST on every `code.load` unless its spelling was persisted and
re-`hydrate`d. **Question:** does the store gain a runtime declaration path (a new member — a new
surface, a `P-4`-adjacent change), or are tier-4 names constrained to fit the loaded record?

**O-6 — WHAT DOES `sanitize()`'s CLOSED SHAPE BECOME?** `sanitize()` (`security-store.ts:37-46`)
reconstructs a THREE-member `SecuritySettings` and drops every other key. If the tier holds arbitrary
names, `sanitize` either (a) survives as the *settings sub-namespace's* validator only, (b) is replaced
by a general record validator with per-value representability rules, or (c) is deleted. **Consequence
of (b):** the `file`-tier representability rule (`'serialize-failed'` / `'validate-failed'`) becomes
tier 4's too, and `C-4`'s condition bites.

---

## §4. WHAT THIS DOSSIER DOES NOT DO

1. **It decides NO semantics.** Every row either cites a landed source or is filed
   `undefined-until-answered` with the question the architect must answer.
2. **Ownership is carried in the columns, never as a definition.** The "Source citation" column names
   who supplies the identifier (a landed spec, a landed commit, or the architect's proposal) and the
   "the observable that proves it" column names who evaluates it. Neither column stands as a
   definition of any identifier.
3. **It files no verdict.** The closed gate-1 verdict vocabulary is
   `PROCEED | APPROVE-WITH-CONDITIONS | BLOCKED-ON-SEMANTICS | FLAWED | REJECTED`; with six open rows
   and one unreconciled hit (`C-10`), the delegable verdict is unavailable. The verdict is returned by
   the gate record, not by this dossier.
4. **It is a scratch artifact.** Per the filing instruction it lives outside the repo at
   `/tmp/change-analysis/store-security-generalization-adoption-dossier.md`; the in-repo home it would
   take at its spec gate is `docs/specs/store-security-generalization-adoption-dossier.md`.

---

## §5. THE ARCHITECT'S RULINGS — POST-GATE-1 AMENDMENT (2026-10-05)

**Anchored append, `RCA-8(d)` annotate-beside: NOTHING ABOVE IS REWRITTEN.** The eight rows' `STATUS`
cells above carry the **as-filed gate-1 reading** (`8 undefined-until-answered`, which is what made the
first filing `BLOCKED-ON-SEMANTICS`). This section is the **operative** status, recorded after the
architect answered. **THE FILED CONTENT-HASH `sha256:744d7f19…` IS THE PRE-AMENDMENT SNAPSHOT** (the
gate-1 record pins it as such); a reader quoting that digest MUST also quote this section.

**The rulings record is `docs/decisions.md`'s `SECURE-TIER-IS-A-FILESTORE-PEER` + `THE MCP SERVER AND
THE SECURE TIER ARE MUTUALLY EXCLUSIVE…` + `THE TIER-4 GENERALIZATION IS SPLIT PER UNIT`.**

| # | As-filed open question | THE RULING | STATUS now |
| --- | --- | --- | --- |
| **A-1** `S` | does tier 4 become name-addressed, and against which registry? | **YES to the shape, NO to the generic surface.** Tier 4's **shape** is opened to arbitrary data (ruling clause (5)); but the **generic store's `secure.*` refusal STANDS**, and the arbitrary names are reached through **the tier's own API** — not through the graph's declared registry. The **name-addressed storage mechanism is the unit's to specify** at its spec gate (ruling's explicit non-decisions). | **defined (mechanism OWED to the unit)** |
| **A-2** `S` | which member set, and does tier 4 become a fourth `tiers` handle? | **NOT a `tiers` handle, and `GraphNodeFlag` does NOT widen.** Tier 4 stays main-side with its **own** API (ruling clause (1)/(2)); the three flag-bearing tiers are unchanged. A fourth handle would be a frozen-surface change and is **not** taken. | **defined** |
| **A-3** `S` | is clause 2 the same as "outside the durability ordering", or stronger? | **THE SAME — A RESTATEMENT, AND THE STRONGER READING IS REFUSED.** `D-CLAUSE-2`: `secure.*` never resolves through `file`/`mem`/`temp`, and a tier-4 write never clears/aliases/creates a lower-tier holder. Tier 4 does **NOT** join the ordering (the destructive reading is refused: `commit('secure.settings.theme.token', v)` must never clear `file.settings.theme.token`). | **defined** |
| **A-4** `A` | what is the closed set "MCP-accessible methods"? | **`D-SCOPE` = the MCP server's tool surface ∪ resource surface ∪ notification surface** — every method reachable through the backend's request path, **not** merely `ALL_TOOLS`. The manual-UI `IPC_SECURITY_*` channel is **NOT** an MCP method and stays operator-reachable. | **defined** |
| **A-5** `S` | do arbitrary names enter the declared registry, or a store-internal map? | **STORE-INTERNAL (main-side), NOT the graph register** — the register is the renderer graph's top-level projection and tier 4 carries no graph node (A-2/A-3). **The exact mechanism and its persistence format are OWED — the unit's spec gate** (ruling's explicit non-decisions). | **defined (mechanism OWED to the unit)** |
| **A-6** `A` | the exclusion state names, terminal set and refusal form. | **`D-GATE`**: the legal pairs are `{MCP-ENABLED, TIER-4-CLOSED}` / `{MCP-DISABLED, TIER-4-OPEN}`; enforcement is at the **invocation turn** (not registration alone), with an **epoch + in-flight invalidation**, applied to **BOTH transports**. **The refusal token is a CHANNEL token, not a store-union member** (the `SecurityWriteReceipt` precedent — the union stays `16`). **Exact state names and receipt vocabulary are the unit's to specify.** | **defined (vocabulary OWED to the unit)** |
| **A-7** `U` | does D1–D8 survive, or become a presentation detail? | **`D-18` = D1–D8 STANDS, AND THE GATE IS ADDED BESIDE IT.** The isolated pane graph is **not** retired and **not** demoted; the pane's `cfg` snapshot stays **out** of the generic store, so `data-ownership-model-plan.md` `§2.3` row **2.4-12 is NOT superseded — its second sentence stands.** | **defined** |
| **A-8** `A`+`S` | clause 2's three-way fork: clear / ignore / refuse? | **"IGNORE" — none of the three destructive arms; it is the exclusion reading.** See `A-3`: no lower-tier alias exists, nothing is cleared and nothing is refused on account of a same-path copy (there is no cross-tier interaction at all). | **defined** |

**COLLISION `C-10` (`data-ownership-model-plan.md` `§2.3` row 2.4-12) — RECONCILED BY `D-18`.** The
hit was the one item the proposal **as stated** did not discharge. The ruling takes the **narrower
reading the row itself supports**: the pane's `cfg: SecuritySettings` snapshot **stays out of the
generic store**; the tier is opened for the **app's own subsystems at boot ingestion** (`D-19`), not
for the pane's snapshot path. **The row is therefore NOT superseded and needs no RE-NAME REQUEST.**
**RESULT: `0` unreconciled hits.**

**THE OPEN-SEMANTICS LIST — DISPOSITION AFTER THE RULINGS.** `O-2` (D1–D8's fate) → **CLOSED by
`D-18` (survives)**. `O-3` (clause 2's fork) → **CLOSED by `A-3`/`D-CLAUSE-2` (the restatement)**.
`O-4` (durable format + boot path vs `hydrate`'s non-`file` SKIP) → **CLOSED IN PRINCIPLE by `D-19`**:
tier 4 **consumed at boot into main-side holders**, so **`hydrate(rows)` is NOT widened and the frozen
clause is not touched**; the tier never joins the graph. `O-6` (`sanitize()`'s fate) → **PARTIALLY
CLOSED**: the shape is opened, but the **`enabled`/`token`/`maxJournalLength` validation SURVIVES**
(ruling clause (5) — the live `SecurityGate` trusts that object, and a general record that validates
nothing is inadmissible); the exact persistence format remains **OWED to the unit**. `O-1` (namespace
file shape) → **CLOSED**: one file, existing path; **the EXACTLY-TWO persisted-file pin is unchanged**
and **no third file is added** (so the `ui` leg's two-name witness needs no rebuild). `O-5` (where
arbitrary declarations live) → **CLOSED by `A-5` (store-internal, main-side)**.

**REMAINING OWED — ONE SCOPE QUESTION, CARRIED TO `docs/pending.md` `§R` as `P-R3`:** does the
tier-shape unit cover the **boot-ingestion reads alone** (the `D-19` shape; bounded; **no re-freeze**)
or **also grant runtime name-addressed writes after boot** (requires `GraphNodeFlag` widening and a
genuine re-freeze of `src/renderer/store-core-graph.ts` + its surface artifact)? **This is a scope
ruling, not an unanswered identifier** — every identifier above is now `defined`.
