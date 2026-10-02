# PROPOSAL — an AMENDED ARCHITECTURE for the store design: a node-anchor-link address space, residency as a node flag, links carrying access and constraints, and a top-level-only register

**A PROPOSAL FOR THE PROPOSAL GATE. NOT A CONTRACT.** This file pins **no behaviour, no signature, no return shape and no
fail-state**, and **nothing may be delegated, specified, built or tested from it** until gate 1 (validity ∥ critique →
architecture review → change analysis) has passed **and the architect has approved it** — at which point the amendment is
the architect's to rule and the contract is the spec writer's to write (`AGENTS.md` item 8). **THE VERDICT VOCABULARY, BOTH
SITES, because the repo's records print both:** the **gate's closed vocabulary** is
`PROCEED | APPROVE-WITH-CONDITIONS | BLOCKED-ON-SEMANTICS | FLAWED | REJECTED`, and **this repo's in-force word set is
`DELEGABLE` / `DELEGABLE-WITH-CONDITIONS` / `NOT-DELEGABLE`** — the two-site rule `docs/specs/data-ownership-model-review.md`
opens with, whose precedent is `docs/specs/install-collision-one-element-one-session-review.md` `§0`. **This file carries
neither word: it is the artifact the gate reviews, and it asserts no verdict about itself.**

**THE HELD CONTRACT IS HELD PENDING THIS PROPOSAL, AND THIS PROPOSAL EDITS NOTHING.** `docs/specs/store-core.md`
(filed 2026-10-01 at `62b5cb8`) and its STEP-0 dossier `docs/specs/store-core-adoption-dossier.md` **remain exactly as
filed and are described here as HELD PENDING THIS PROPOSAL**. **This pass wrote exactly ONE new file — this one — and
edited NO existing file**: not `docs/specs/store-core.md`, not its dossier, not
`docs/specs/data-ownership-model-plan.md`, not `docs/specs/data-ownership-model-review.md`, not `docs/decisions.md`,
not `docs/pending.md`, not `docs/next-steps.md`, not any sibling spec, not `docs/defects.md`, not `docs/HANDOFF.md`,
not `AGENTS.md`, not `package.json`, not a script and not a config. **No unit's status moved, no ledger count moved,
no red set was authored, no register row was executed, no leg ran, and no commit was made.**

**CITE SECTIONS AND ROW IDS, NEVER LINE NUMBERS, OF ANY FILE; BYTES BY `file:symbol`.** **ID-COLLISION RULE, binding on
every citation below:** the plan's `§1.3` and the held contract's `§3.4` **each have an `R-5`, and they are different
rows** — plan `§1.3` `R-5` is the ENGINE-ID rule; `docs/specs/store-core.md` `§3.4` `R-5` is a registry static row.
**Every row id in this file is qualified by its file and section.** The same holds for `P-1`/`P-3`/`P-4` across
`zones.md`/`census.md`/`store-core.md`.

**LAYER LABELS (`RCA-12`), used on every behavioural claim:** **[T]** node suite / pure module · **[H]** this repo's
`src/**` · **[U]** the real-DOM `ui` leg · **[D]** the divergence leg · **APP** the assembled app. **This file makes no
`[U]` and no APP claim** — it made no reading of a running app, and it is a docs-only artifact.

---

## §0. THE ARCHITECT'S DIRECTIVE, VERBATIM, AND WHAT THIS FILE IS

### §0.1 The directive, quoted exactly as given (the amendment's whole authority, and its whole text)

> *"Consider for proposal gate an amended architecture for the store design.*
> *Ownership/name-addressing is mapped using a node-anchor-link graph similar to the provident architecture.*
> *Security is a separate collection, the file/mem/temp layers are resolved as a flag on the node object.*
> *The parent-child links can be used to direct and control reference access and maintain constraints.*
> *Register only needs to count top-level items because everything else can be tracked by internal graph reference (and deleted if severed from graph).*
> *Ex. `file.window.tabs.landingPage` is internally starting at the 'window' top-level object, looking for an anchor at the 'tabs' property, then checking the associated link for a valid cache and resolving (either from fresh cache or rebuilding a stale one) a 'landingPage' id with the `type='temp'` property.*
> *Intended advantage: Graph natively tracks ownership across layers and can easily export a complete, multi-level data object from cache for local use within a function."*

**Eight sentences, and this proposal is derived from those eight sentences and from the repo's own bytes — never from a
reading of the architect's intent beyond them.** **Where the directive's text does not decide a clause, this file says
so in §10 and does NOT decide it.**

### §0.2 What this file IS, and what it is NOT

| # | It is | It is not |
| --- | --- | --- |
| 1 | **A proposal** — a stated model, its collisions, its costs, its risks and its open questions, each with options and a recommendation | **a contract**: no clause here is a requirement, and a later pass may not cite this file as one |
| 2 | **The artifact gate 1 reviews** — validity ∥ critique → architecture → change analysis | **a gate-1 record**: the gate's own record lands as `docs/specs/<proposal>-review.md` (`AGENTS.md` item 8), which is **not this file and does not exist** |
| 3 | **A confrontation of three collisions** (§3), each with admissible resolutions, their costs, and the landed rows they would supersede | **a supersession**: **every supersession named in this file is ARCHITECT-ONLY and needs its own gate**; none is performed, proposed as performed, or smuggled through a rename |
| 4 | **A priced amendment** (§4, §9) — what it buys, what it costs, what would falsify it | **a recommendation to proceed**: §10's questions are stated, costed and recommended, and **none is decided** |

### §0.3 The two questions the architect's own words ask, and the one the directive answers by construction

1. **What does "similar to the provident architecture" mean, in checkable terms?** **§2.5 answers it from the repo's own
   bytes**: the engine's node/anchor/link vocabulary is **documented in part** (an anchor is a real, first-class member of
   a node's compiled state; links are minted per graph on a link hub; a load tears the graph down and rebuilds it), and
   **the parts the repo does not document are named as PROPOSED here rather than attributed to the engine**.
2. **Does the store's graph ride the engine's graph?** **The directive does not say**, and the repo's bytes make this the
   amendment's single largest design question: the engine's graph is **replaced per load** (`[H]`,
   `src/renderer/runtime.ts:loadEnvelope` / `:loadDoc`), so a store riding it would lose every resolution on every load.
   **§10 `Q-2` states it, costs it and recommends the store's OWN graph** — and **§8 shows that answer is what keeps the
   fork's vendored tree byte-identical**.

---

## §1. WHAT THIS PROPOSAL ASKS

**In the architect's own terms — the amended address space and its four mechanisms, each with the one line of the held
model it would replace.** **The right column names the held contract's clause (`docs/specs/store-core.md`) or the plan's
(`docs/specs/data-ownership-model-plan.md`) that the mechanism displaces; §6 classifies every one of them
item by item.**

| # | The mechanism, in the directive's terms | What it replaces in the held model |
| --- | --- | --- |
| **M-1** | **THE NODE-ANCHOR-LINK ADDRESS SPACE.** Ownership and name-addressing are mapped by a **graph** of **nodes**, **anchors** (a named property slot on a node) and **links** (the parent→child edge an anchor holds), and a dotted name is resolved by **walking that graph** rather than by looking a whole logical path up in a per-tier table. | **REPLACES the held read's exact-path lookup**: `§2.5` items 1/2's "search `temp` → `mem` → `file` and answer the FIRST HIT" becomes a traversal over the store's own graph, and `§2.10` item 1(a)'s clear **by LOGICAL PATH** becomes a clear **by graph reach** (or survives, if the graph keeps logical paths — §10 `Q-1`). |
| **M-2** | **RESIDENCY AS A NODE FLAG.** `secure` is **a separate collection**; the `file`/`mem`/`temp` layers are **resolved as a `type` flag on the node object** (the directive's own words), so which tier a value lives in is a property of **the location**, not of the name's first segment. | **REPLACES the three per-tier TABLES as the residency carrier** (`§2.4`'s tier-local handles and their six-row decision table, `§2.7`'s per-tier trie ownership) while **keeping the four tier tokens themselves** (`§2.3` item 1's closed, case-sensitive domain, `§2.1`'s `StoreTier` union). |
| **M-3** | **LINKS CARRY ACCESS CONTROL AND CONSTRAINTS.** The parent-child links **direct and control reference access** and **maintain constraints**, so an access rule and a constraint are held **on the edge that reaches the value**. | **REPLACES the constraint table's store-wide evaluation point** (`§2.10` item 6's "`set`, `commit` and `remove` each evaluate the constraint table on their POST-STATE") with an evaluation at **the anchor the write passes through**, and **REPLACES `§2.6` item 2's per-reference `constraint` field** (a constraint declared on the reference) with a constraint declared on the **top-level row** and maintained on the **link** (§3(b)). |
| **M-4** | **A TOP-LEVEL-ONLY REGISTER, WITH REFERENCE-TRACKED DESCENDANTS AND RECLAIM-ON-SEVERANCE.** *"Register only needs to count top-level items because everything else can be tracked by internal graph reference (and deleted if severed from graph)."* | **REPLACES the declared name registry's per-REFERENCE pattern table** (`§2.6` items 2/5, the `concrete`/`pattern` two-kind matcher and its `concrete`-beats-pattern precedence) with a register whose rows are **top-level items only**, and **REPLACES the three caps** (`§2.9`'s `CAP-1`/`CAP-2`/`CAP-3`) with **reachability** as the bound: a value severed from the graph is **reclaimed**, so the model's own leak classes are answered by collection rather than by a counted refusal. |
| **M-5** | **SECURITY AS A SEPARATE COLLECTION** (the directive's own clause), **outside** the main graph's traversal. | **SURVIVES the landed discipline and REPLACES tier 4's placement as a fourth table**: the renderer never reads tier 4, every `secure.*` name is refused on the generic surface (`§2.5` case (a), `§2.6` item 4's secure-first order), and the tier is main-only (`docs/specs/mcp-endpoint.md` `§6.4`; layer 1 `docs/specs/foundation-app-data-model.md` `§5` `A-7`). **The directive's "separate collection" is the closest thing in the amendment to a landed row.** |

**And the amendment's own ONE-LINE CLAIM, in the directive's words, so a reviewer can test it directly:** *"Graph natively
tracks ownership across layers and can easily export a complete, multi-level data object from cache for local use within
a function."* **§4 works both halves through a second example and prices them.**

---

## §2. THE MODEL, STATED EXACTLY

**Every structure below is PROPOSED UNLESS its row says otherwise.** **A structure this file names in `code` font and
marks *(proposed)* does not exist in this repo, is not pinned by any landed row, and is offered as the shape a contract
would have to pin.**

### §2.1 The five structures, and the engine's own analogues (what is documented, and what is not)

| # | The proposed structure | Its role, in one line | The engine's analogue, and its evidence |
| --- | --- | --- | --- |
| **1** | **`StoreNode`** *(proposed)* — `{ id, type, anchors, links }`, where **`type` ∈ `{'file','mem','temp','secure'}`** (the four tokens the held contract already closes at `§2.3` item 1) | **the unit of ownership**: one value (or one owned sub-object) with its own residency flag | **PARTIALLY DOCUMENTED.** The engine has a **real `Node` with an `anchors` array** — `[H]`: `src/renderer/runtime.ts:isPlacementRouted` reads `n.anchors.some(a => a.role === 'content')`, and `src/renderer/runtime.ts:projectedState` projects each anchor to `{role, target, value}`; the engine's `CompiledState` also carries **`type`**, **`parent`** and **`children`** members as raw fields (`[H]`, `src/renderer/runtime.ts:projectedState`'s returned record). **NOT DOCUMENTED:** a node's **store-tier flag**. **AND THE KEY COLLISION IS NAMED HERE SO NO CONTRACT CONFLATES IT: the directive's `type='temp'` and the engine's `type` are DIFFERENT QUANTITIES SHARING A KEY NAME.** `[H]` the authored envelope uses `type` for the ELEMENT (`src/shared/demo-envelope.ts:demoEnvelope`'s `type: 'div' \| 'h1' \| 'section' \| 'button' \| …`), and `CompiledState.type` carries the same meaning through `src/renderer/runtime.ts:projectedState`; `[T]` the engine's own type surface has no residency token anywhere (`AnchorTarget`/`NodeState`/`Role`/`LinkConfig` are the four closed unions it exports, and none is a tier). **So a store node's `type` is a NEW field on a NEW structure, and a contract that re-used the engine's `type` key for residency would be reading an element tag as a durability token** — **which is the `§2.2` `P-2` invented-value class, not a naming preference.** |
| **2** | **`StoreAnchor`** *(proposed)* — `{ key: string, link: StoreLink }`: a **named property slot** on a node | **the "anchor at the 'tabs' property"** of the directive's example | **DOCUMENTED IN PART, AND THE ENGINE'S ANCHOR IS A FIRST-CLASS OBJECT (`[T]`).** `[T]` `node_modules/provident-ssr/dist/core/types.d.ts`'s `Anchor` is *"`{ role: Role; target: AnchorTarget; options: AnchorOptions; link: Link; value?: unknown; owner?: Node }`"* — **an anchor carries a `link` backref AND an `owner` backref**, and `Role` is an eight-member union (`'parent' \| 'child' \| 'source' \| 'target' \| 'duplex' \| 'container' \| 'content' \| 'component'`). **In-repo evidence agrees at the observable end:** an anchor is a member of a node's compiled state, shaped `{role, target, value}` after projection — `[H]` `src/renderer/runtime.ts:projectedState`; `docs/specs/battery-hooks-unit.md`'s row **`H1`** records the raw shape: *"the engine's resolved `CompiledState.anchors` carry live circular `Node`/`Link` refs"*, which is why the host projects them to *"`{role, target, value?}` plain data"*. **UNDOCUMENTED IN THIS REPO, and the amendment's own extension: an anchor KEYED BY A CALLER-SUPPLIED PROPERTY NAME** (`tabs`) — the engine's anchor key is a **`role`** from a closed eight-member set, and **the only role this repo ever names is `'content'`** (`[H]` `src/renderer/runtime.ts:isPlacementRouted`; `docs/specs/runtime-host.md` `§3.1`; `docs/specs/mount-invariant-guard.md` `§3.1` `M-14`), so the role/name conflation is the amendment's own step |
| **3** | **`StoreLink`** *(proposed)* — `{ from, to \| to[], cache, access, constraint }`: the edge an anchor holds | **the "associated link"** — and the **carrier of access control and of constraints** | **DOCUMENTED AS A PER-GRAPH OBJECT AND, AT THE PACKAGE'S OWN TYPE SURFACE, AS A CONSTRAINT-BEARING RECORD (`[T]`); NOT DOCUMENTED IN THIS REPO AT ALL.** **In this repo:** links are **minted per graph on a hub** — `docs/specs/runtime-host.md` `§3.2` pins `loadDoc`'s `loadState(doc)` → seeds → `new Node(seed, createLinkHub())` → `reconcileParentTargets(nodes)`, *"ONE hub shared with the supervisor"*; `docs/specs/secure-panels.md` `§2` pins the pane graph's **own** hub (*"Own hub — `createLinkHub()` (per-graph Links; D1 hub-keyed)"*); `docs/specs/e2e-test-battery.md` records `createLinkHub()` landing at `provident-ssr@0.1.3` (REQ-GAP-9). **`[T]` reads of the vendored type surface (an external, unadopted surface — not a landed row of this repo):** `Link` is an exported **class** (`dist/core/link.d.ts`) with `mintLinkId()`, `DEFAULT_PARENT_CHILD`, `DEFAULT_COMPONENT`, `DEFAULT_PLACEMENT`, and (`dist/core/types.d.ts`) `id`, `config`, `anchors`, `anchorsOf`, `parents()/children()/sources()/targets()`, `addAnchor`/`removeAnchor`/`setOrder(anchor, priority)`/`destroy()`; `LinkConfig` names `'parent-child' \| 'component' \| 'placement'` with a **cardinality member** (`parent?: {count: 1}`) and four `LinkConfigErrorCode`s — `'unique-order' \| 'count-exceeded' \| 'count-underflow' \| 'role-mismatch'`. **SO THE DIRECTIVE'S *"links … maintain constraints"* HAS A REAL ENGINE PRECEDENT — a link config CONSTRAINS ITS MEMBERS AND REFUSES ON CARDINALITY/ORDER/ROLE VIOLATION — while `LinkConfigErrorCode`'s four tokens are CONFIG-TIME errors, never runtime access decisions.** **UNDOCUMENTED IN THIS REPO, and PROPOSED here: a link carrying a CACHE, a per-link ACCESS RULE, or a runtime constraint id; and no landed row — in this repo or at the `[T]` type surface — says a link is ADDRESSABLE BY A PROPERTY NAME** |
| **4** | **`TopLevelRegister`** *(proposed)* — the register: **one row per TOP-LEVEL node** — `{ name, nodeId, constraintId? }` | **the "register only needs to count top-level items"** of the directive | **NOT DOCUMENTED AS SUCH — but the held contract's registry is its nearest relative** (`§2.6` items 1/2: a row shape with `shape`, `name`, `tier`, `reserved`, `constraint`). The amendment **keeps the held row's FIELD NAMES where it can** (`reserved`, `constraint`) and **drops `shape`/`name`-per-leaf** |
| **5** | **`secureCollection`** *(proposed)* — tier 4's own collection, **outside** the register and **outside** the traversal | **"security is a separate collection"** | **DOCUMENTED AS A DISCIPLINE, NOT AS A STRUCTURE:** `docs/specs/mcp-endpoint.md` `§6.4` (*"manual-UI-only by construction"*); layer 1 `§5` `A-7` (*"an agent cannot grant itself capabilities"*); the held contract's `§2.6` item 4 makes the refusal **precede the registry check** so no caller learns the tier's schema |

**AND THE PROVENANCE OF THE ANALOGY, STATED SO IT IS NOT OVER-READ (`RCA-12`).** **THE ENGINE'S ANCHOR/LINK VOCABULARY IS NOT DOCUMENTED AS A DATA MODEL IN THIS REPO — it is documented IN THIS REPO only as four unrelated things:** **(i) an anchor is a first-class member of a node's compiled state, projectable to `{role, target, value}` (`[H]` `src/renderer/runtime.ts:projectedState`); (ii) the `content`-ROLE anchor as a placement-routing PREDICATE (`[H]` `src/renderer/runtime.ts:isPlacementRouted`; `docs/specs/runtime-host.md` `§3.1`); (iii) `CompiledState.anchors` as a JSON-SERIALIZATION HAZARD (`docs/specs/battery-hooks-unit.md` `H1`); and (iv) load-path CALL STEPS (`createLinkHub()`/`reconcileParentTargets(nodes)` — `docs/specs/runtime-host.md` `§3.2`).** **So the address model the directive asks for — a top-level object, a collection, an anchor addressed by a caller property name, a link carrying a cache and an access rule — is PROPOSED here, not inherited.** **THE ONE PART THAT IS GENUINELY INHERITED IS THE CONSTRAINT-BEARING LINK, and it is inherited from the PACKAGE's own type surface, read here as `[T]` (§2.1 row 3) and NOT as a landed row of this repo.** **And `docs/specs/engine-pin.md` and `docs/specs/engine-drift.md` pin NO node/anchor/link structure at all** — the pin unit pins a version/lockfile, a shim method, two host-side shape guards and a set of literal captures; the drift unit pins **census COUNTS** (`§3.3.2`'s `M-3`…`M-11`: the five `Census` fields, the post-teardown `inTree === 1`, the d12 `inTree === 23`, the demo `12/12`, the placement-routed `inTree === 7`) and id-set behaviours — **and its own discipline paragraph is the reason this file quotes no structure from it:** *"Census rows must record the population, not just the number."* **The parts of the engine's link/hub/registry internals NOT covered by the `[T]` type surface above are `UNVERIFIABLE — CARRIED`** (§9's carried clause 1 names the owner, the remaining gap and the positive revisit condition).

### §2.2 The residency flag, and where it physically lives

**Four rows, each a clause the amendment asks the architect to rule (never a clause this file decides).**

1. **THE FLAG IS ON THE NODE (`type`), and its domain is the held contract's closed four-token set** — `'file'`,
   `'mem'`, `'temp'`, `'secure'` — **case-sensitive and exactly four** (`docs/specs/store-core.md` `§2.3` item 1;
   `§2.1`'s `StoreTier`). **So the amendment changes WHERE the tier is recorded, not WHICH tokens exist.**
2. **WHERE IT PHYSICALLY LIVES — the realm question is INHERITED, not re-opened.** The plan's `§2.5` revision puts
   `file`/`mem`/`temp` **in the renderer realm** and `secure` **main-only**; the held contract's `§0A` note 1b records
   why that is forced (the read's `cache` member is a live object reference that cannot cross an IPC boundary —
   `docs/specs/mcp-endpoint.md` `P-E6`). **A node-graph store is subject to the SAME constraint:** the graph objects are
   live references, so a graph spanning two realms is unimplementable, and **the graph therefore lives in the renderer
   realm with the security collection on the main side — which is what the directive's "separate collection" asks for
   anyway** [H]/[T].
3. **A `secure`-flagged node never appears in the register or the traversal.** The amendment **strengthens** the held
   `secure`-first rule: the refusal is decided **before** any traversal begins, on the name's own first segment
   (`§2.6` item 4), so the separate collection is unreachable from the generic surface **by construction** rather than by
   a check inside each walk.
4. **THE FLAG CREATES A REDUNDANCY THE HELD MODEL DOES NOT HAVE, AND IT IS NAMED RATHER THAN SMOOTHED.** **The directive's
   example spells the tier into the NAME (`file.window…`) while the tier also lives on the NODE (`type='temp'`) — so the
   same fact is held twice, and the two can disagree.** **Why that is a landed-rule matter, not a style note:** the
   held contract's `§2.2` `P-13` and `§3.3` `I-12` close *"the second authority over any value a landed row owns"*, and
   `§3.1` `M-6`/`§2.2` `P-2` close *"an invented value"*. **The amendment must declare WHICH wins** (recommended: the
   flag, with the disagreement a TYPED REFUSAL — §5's state `X-FLAG`), because a silent pick is the second-authority
   class and the directive's own example (`type='temp'` under a `file.*` name) is **exactly the disagreement case**.

### §2.3 How a name is parsed, and how it is resolved — the canonical walk

**THE WALK, worked END TO END on the architect's own example, `file.window.tabs.landingPage`, naming every intermediate
structure the directive names and every failure arm the walk can reach.** **The directive's own sentence is the
specification:** *"internally starting at the 'window' top-level object, looking for an anchor at the 'tabs' property,
then checking the associated link for a valid cache and resolving (either from fresh cache or rebuilding a stale one) a
'landingPage' id with the `type='temp'` property."*

| Step | State | What happens (in the directive's own terms) | The intermediate structures named | The failure arm |
| --- | --- | --- | --- | --- |
| **S1** | **`PARSE`** | the name is split on `.` — **the store's own string operations stay the held contract's exhaustive list** (`§2.3`'s four operations: the `typeof`/length check, `split('.')`, a whole-segment equality, a whole-logical-path equality). **`['file','window','tabs','landingPage']`**; the first segment is the tier token `file`; the path is `['window','tabs','landingPage']` | the **tier token** (held, `§2.3` item 1) and the **segment list** — **no new structure** | **`A-MALFORMED`** — absent / non-string / empty / an empty segment / an out-of-domain first segment → the held **`'malformed-name'`** (`§2.5` case (b)) **SURVIVES unchanged** |
| **S2** | **`TOP`** | *"starting at the 'window' top-level object"* — the first path segment is looked up in the **`TopLevelRegister`** *(proposed)* | the **register row** and the **top-level `StoreNode`** | **`A-NO-TOP`** — no register row for `window` → the held **`'undeclared-name'`** **SURVIVES** for this arm (the register IS the declaration) |
| **S3** | **`ANCHOR`** | *"looking for an anchor at the 'tabs' property"* — the next segment is looked up as an **anchor KEY** on the current node | the **`StoreAnchor`** *(proposed)* and its **`StoreLink`** *(proposed)* | **`A-NO-ANCHOR`** — the node carries no anchor keyed `tabs` → **A NEW REFUSAL TOKEN IS NEEDED** (proposed `'no-such-anchor'`); the held union has no member for it (§5) |
| **S4** | **`LINK`** | *"then checking the associated link"* — the anchor's link is read; a link whose target was **severed** (the graph's reclaim arm, §3(c)) is not followable | the **`StoreLink`** *(proposed)* and its **cache entry** *(proposed)* | **`A-SEVERED`** — the link exists but its target is severed/reclaimed → **A NEW TOKEN IS NEEDED** (proposed `'severed-link'`) |
| **S5** | **`CACHE`** | *"for a valid cache and resolving (either from fresh cache or rebuilding a stale one)"* — the link's cache entry is checked: **VALID** → resolve from it; **STALE** → **REBUILD** and resolve from the rebuilt entry | the **`ResolutionCache`** entry *(proposed)* | **`A-REBUILD`** — the rebuild itself fails (a severed target, a persisted record that does not answer, a flag contradiction) → **A NEW TOKEN IS NEEDED** (proposed `'rebuild-failed'`); **and the STALE-CACHE arm is NOT a refusal at all** — it is a declared normal path, which is new work the held model has no clause for |
| **S6** | **`RESOLVE`** | *"resolving … a 'landingPage' id"* — the link's targets are resolved to the id `landingPage`, i.e. **the last segment IS an id, and the store looks it up against the graph's own target set** | the **resolved `StoreNode`** for `landingPage` *(proposed)* | **`A-NO-ID`** — the link resolves but no target carries the id: if the chain resolved and the leaf is simply unwritten → the held **DECLARED MISS** (`§2.5` case (e)) **SURVIVES**; if the chain stopped earlier → `'no-such-anchor'` |
| **S7** | **`FLAG`** | *"a 'landingPage' id with the `type='temp'` property"* — the resolved node's **`type` is `'temp'`** while the name asked for **`file`** | the **node's `type` flag** *(proposed)* and the **name's tier token** (held) | **`A-FLAG`** — the flag contradicts the tier the name asked for → **A NEW TOKEN IS NEEDED** (proposed `'tier-contradiction'`) **unless §10 `Q-6` rules the name authoritative, in which case this arm becomes `'no-such-node'`-shaped and the walk must find a `file`-flagged sibling instead** |
| **S8** | **`RESOLVED`** | the answer is returned | the held read's answer shape **`{found, value, tier, cache, name}`** (`§2.5` case (d)) — **RETAINED**, with `value` from the node and `tier` from the **flag** | **—** |

**FIVE THINGS THE WALK MAKES VISIBLE, EACH STATED RATHER THAN DISCOVERED.**

1. **The walk's own depth is `3` segment steps before the leaf (`window` → `tabs` → `landingPage`), against the held
   read's at-most-`3` exact table lookups — which is the cost §4 and §9(5) price.** **The two are NOT the same shape: the
   held read's three lookups are `O(1)` hash probes over whole keys; the walk is `O(depth)` per resolution, and a
   resolution per move is the drag's real case** (the plan's `§7.3` `NW-3`; the held contract's `§2.9` `CAP-3` reason
   quotes the same hot path).
2. **The directive's example ENDS IN THE FLAG DISAGREEMENT.** `file.window.tabs.landingPage` resolving to a node whose
   `type` is `'temp'` is the amendment's own canonical case, and it is **the exact case `§2.2` item 4 names**: either the
   flag is authoritative (a refusal, or an honest answer that the value is `temp`), or the name is (and the walk must
   keep searching for a `file`-flagged node). **The example cannot be read as a happy path under both readings, so the
   architect must rule it.**
3. **Two new intermediate structures are load-bearing and the directive names neither**: the **cache's validity rule**
   (what makes an entry stale) and the **register's row shape** (what a top-level row carries). **§10 `Q-3`/`Q-4` carry
   them as questions, and §3(b) shows what the register's shape forces.**
4. **The `'landingPage' id` is the collision's sharpest point.** The directive says the walk **resolves an id**; the plan's
   `§1.3` `R-5` forbids a reference from naming an engine/node id, and the held contract's `§2.3` item 5 + `§3.4` `R-9`
   make it a FAILING row (*"the store never treats a segment as an id"*; *"No path segment is looked up against any id
   registry"*). **§3(a) confronts this in those words.**
5. **`secure` never enters the walk.** A name whose first segment is `secure` is refused **before** `S2`
   (held: `§2.5` case (a), `§2.6` item 4) — so the separate collection of §2.1 row 5 is **unreachable from the generic
   surface by construction**, which is the amendment's cheapest landed-rule win.

### §2.4 The register, the collection, and the top-level object — stated exactly

**Three definitions the directive needs and its own words do not fully fix. Each is PROPOSED, and each is a §10
question.**

| # | Term | The proposed reading | The alternative, named with it |
| --- | --- | --- | --- |
| **1** | **THE TOP-LEVEL OBJECT** (the directive's *"the 'window' top-level object"*) | **a register row's own root node**, i.e. a node with **no parent link** and a register row naming it. **The register is therefore exactly the set of parentless nodes** — which is what makes *"register only needs to count top-level items"* checkable: **the register's row count equals the parentless node count** | **(b)** the register is a **declared list** independent of the graph, so a node may be parentless without being registered (an orphan the reclaimer's root set does not contain — §3(c)) |
| **2** | **THE COLLECTION** (the directive's *"security is a separate collection"*) | **a named set of nodes** — the tier-4 collection is a collection **outside the register** and outside the traversal. **The reading EXTENDS to the non-security tiers: each of `file`/`mem`/`temp` is also a collection, membership by the node's `type` flag** — so *"collection"* is the amendment's replacement for the held per-tier TABLE (`§2.4`) | **(b)** *"collection"* means **tier 4 alone**, and `file`/`mem`/`temp` remain tables whose entries are node references **(this reading keeps the held `§2.4` surface nearly byte-intact and is the cheaper one; `Q-1` weighs it)** |
| **3** | **THE ANCHOR'S KEY vs THE LINK'S TARGET** | **the anchor's key is a CALLER segment** (the directive's *"'tabs' property"*), and the link's target is a **node id the store owns**. **So the caller names the ANCHOR and the store resolves the node** — the caller never spells the target id | **(b)** the caller may spell the **child id** directly (`file.window.tabs.landingPage`'s last segment read as an id, per the directive's own words) — **which is the reading `§3(a)` collides with `R-5`, and the reading `Q-5` must settle** |

---

## §3. THE THREE COLLISIONS, CONFRONTED

**Three collisions, each stated with the landed rows it hits, the admissible resolutions with their costs, and a
recommendation.** **NONE is decided here.** **Where a resolution requires superseding a landed rule, this file says so in
those words and routes it to the architect with its own gate.**

### §3(a) COLLISION 1 — VOCABULARY AND ADDRESSING: the model resolves a segment as a node id, and two landed rules forbid it

**THE HIT, EXACTLY, ROW BY ROW.** **The amendment's walk resolves `landingPage` as an id (`§2.3` `S6`) and resolves
`tabs` as an owner key against the store's own structure (`§2.3` `S3`).** **The landed rows it hits:**

| # | The landed row | Its clause, as landed | Why the amendment hits it |
| --- | --- | --- | --- |
| **1** | **plan `§1.3` `R-5` — "NO REFERENCE NAMES AN ENGINE ID"** | *"A `path` segment **may not be an engine node id, a `data-node-id` value, or a css.id/props.id** in the store's own vocabulary."* … *"The caller may put a component's own id string inside its own namespace segment — the store just may not treat it as an id."* | **the walk DOES treat a segment as an id.** **The row's second sentence is the amendment's exact edge: putting an id string in a namespace is lawful; RESOLVING it as an id is not** |
| **2** | **the held contract `§2.3` item 5 + `§3.4` `R-9`** | *"**NO REFERENCE NAMES AN ENGINE ID.** … the store never treats a segment as an id. **A row that looks a segment up against any id registry FAILS `R-9`.**"*; `R-9`: *"**No path segment is looked up against any id registry, and the store keeps no counter, no UUID site and no string-to-entry map.**"* | **`S6` looks a segment up against the graph's target set, and `S3` looks one up against a node's anchors — which is `R-9`'s exact prohibition, whatever the registry is CALLED** |
| **3** | **plan `§3.3` row `2.3-8` + plan `§7.2` `F-5` + layer 1 `§7` `F-5`** | *"**A store keyed by authored ids or node ids would be a THIRD holder**"* of the element-id kind; `F-5`: *"two holders of the element-id kind (the engine registry + `cssIndex`/`propsIndex`) … a store keyed by node ids would be a THIRD holder"*; layer 1 `§7` `F-5` is the finding itself, and layer 1 `§2.3`'s `cssIndex`/`propsIndex` row records that the index is *"rebuilt … **per graph generation**"* | **the amendment's graph ids are ids of a graph, and if they are the ENGINE's node ids the store becomes the third holder `F-5` names** |
| **4** | **the held contract `§2.2` `P-9` + `§3.4` `R-11` + `§3.3` `I-1`** | `P-9`: *"**No import of `src/main/**`, `src/shared/**`, `provident-ssr` or any sibling mechanism**"*; `R-11`: *"`store-core.ts` has **EXACTLY ONE import statement** — `store-references.js`, the row type only"* | **if the store's graph IS the engine's `Node`/`Link` objects, the store must import `provident-ssr` — so `R-11`'s one-import census and `I-1` redden, and the store acquires a dependency the held contract's realm reasoning (`§0A` note 1b) deliberately excludes** |
| **5** | **the engine's own addressing is BY ID STRING, which is the fact that makes 1–4 bite rather than being academic** — `[H]`: `src/renderer/runtime.ts:resolveTarget` resolves an engine `nodeId`, then an authored `css.id`, then an authored `props.id`; layer 1 `§4.3`'s table records the commit route as **`applyCommand({kind:'state-slice', node: <AUTHORED id string>, …})`**, and layer 1 `§4.3` item 3 makes handing it an element instead *"the same `L-5` finding"* | — | **the engine has exactly one address space (authored/node ids), so "an anchor-keyed name that resolves an id" is unavoidably adjacent to it** |

**THE VOCABULARY HALF, stated precisely because it is WEAKER than it looks and this file will not overstate it.** **The
amendment's own words — `node`, `anchor`, `link`, `graph` — are NOT consumer vocabulary, and they are NOT the mirror-class
taxonomy:** plan `§1.3` `R-1` bans *"a pane/zone/tab/track token"*, an `is-empty`/`is-minimized`/`is-revealed` literal and
a unit string; `docs/specs/container.md` `§2.2` `P-CT-1` bans consumer vocabulary **and the mirror-class taxonomy**
`H-r15` names; `docs/specs/zones.md` `§2.2` `P-1` and `docs/specs/census.md` `§2.2` `P-1` ban consumer vocabulary **as a
closed union** (census's dated `ADV-CN-5` amendment: a union of PRIMITIVE KINDS passes). **So `node`/`anchor`/`link` do
NOT hit `R-1`/`P-1`/`P-CT-1` by their names.** **What they hit is `R-5`/`R-9` by their FUNCTION, and the honest framing is
that the amendment is not a vocabulary ban case at all — it is an ADDRESSING case, and the earlier reviews' framing of
it as "banned consumer vocabulary" would be a mis-citation.**

**THE TWO OR THREE ADMISSIBLE RESOLUTIONS, WITH THEIR COSTS.**

| # | Resolution | What it costs | Landed rows it would supersede (ARCHITECT-ONLY, each with its own gate) |
| --- | --- | --- | --- |
| **(1) SUPERSEDE `R-5`'s SECOND HALF ONLY, AND KEEP `R-9`'s SUBSTANCE BY MAKING THE STORE'S IDS STORE-MINTED** *(recommended)* | **the store's graph is the store's OWN structure with ids the STORE mints (the caller declares a top-level name; the store keys its own nodes); the store never binds a segment to an ENGINE node id, never imports `provident-ssr`, and never consults `cssIndex`/`propsIndex` or the engine's registry.** **What changes: `R-5`'s *"the store just may not treat it as an id"* half — because the amendment's whole point is that the store DOES treat it as an owner key. What does NOT change: `R-5`'s FIRST half (no ENGINE id), `R-9`'s no-engine-registry half, and the import census `P-9`/`R-11`/`I-1`.** | **the collision is narrowed from five rows to two (`R-5`'s second half; `R-9`'s *"no string-to-entry map"* clause, whose wording must be re-read as *"no ENGINE-id-keyed map"*); the `F-5` third-holder finding must be re-classified, and the re-classification is the amendment's burden of proof: a store-minted id space is NOT the element-id kind, and the argument must be MADE rather than asserted** | **plan `§1.3` `R-5` (second half)** · **plan `§3.3` row `2.3-8`** · **plan `§7.2` `F-5` (its *"explicitly not worsened"* cell)** · **held contract `§2.3` item 5 and `§3.4` `R-9`** — **plus a `docs/decisions.md` ACTIVE row, because none of those four is a decision row today** |
| **(2) KEEP `R-5` AND `R-9` WHOLE, AND MAKE THE WALK RETURN A NON-ID HANDLE** | **the walk's final step returns a store-minted HANDLE (an opaque token), and no segment is ever compared against a set of ids — `landingPage` becomes an anchor key like `tabs`, so the name's depth is one segment longer than the directive's example and the example's own wording (*"resolving … a 'landingPage' id"*) is NOT implementable as written** | **zero supersession; the directive's example must be re-spelled; the graph's target sets become ANCHOR-keyed rather than id-keyed, which is arguably closer to the engine (an anchor IS a role in the engine's vocabulary) and further from the directive's text** | **none — but the amendment loses its own canonical example, which is a cost paid in the architect's terms** |
| **(3) RE-NAME THE VOCABULARY AND KEEP THE MECHANISM** | the structures keep their function and take non-engine names (`owner`/`slot`/`edge` instead of `node`/`anchor`/`link`) | **nothing about the collision is fixed: `R-5`/`R-9` are about FUNCTION (a segment resolved as an id), so renaming leaves the two-row hit intact while making the amendment's *"similar to the provident architecture"* UNCHECKABLE — the analogy would be renamed away** | **none — and the collision would be RENAMED RATHER THAN CONFRONTED, which is the disposition this proposal explicitly refuses** |

**RECOMMENDATION: (1), and the recommendation is a recommendation only.** **It is the only resolution under which the
directive's own example is implementable AND the two rows that protect the ENGINE's id space stay substantially intact.**
**Its honest weakness, stated rather than buried:** **`F-5`'s "third holder" finding is the architect's own scope ruling
in spirit, and re-classifying `F-5` is not a formality — it is the claim that a store-minted graph id space is a
different KIND from the engine's element-id kind, and a reviewer is entitled to reject that claim on the bytes.**

### §3(b) COLLISION 2 — A TOP-LEVEL-ONLY REGISTER: what a DECLARATION becomes, what survives, what becomes unreachable, what becomes newly refusable, and where a constraint lives

**THE HELD CONTRACT'S DECLARATION IS PER-REFERENCE.** Every `read`/`set`/`commit`/`remove`/`subscribe` name must be
**declared once** — a `concrete` row naming the exact spelling or a `pattern` row naming its shape — and the matcher's
precedence is **concrete beats pattern, then more-literal-segments wins, and two equally-specific matching patterns
REFUSE THE TABLE AT LOAD** (`§2.6` items 2/5; `G-9`/`G-10`). **The directives' register is per-TOP-LEVEL-ITEM.** **The
following six clauses state what that does.**

| # | The clause | Under a top-level-only register |
| --- | --- | --- |
| **1** | **WHAT A DECLARATION NOW IS** | **a declaration of a TOP-LEVEL ITEM** — its name, and (per §2.4 row 1) its standing as a parentless node. **Its `constraint` field and its `reserved` field are retained** (the held row shape's field names, `§2.6` item 2); **its `name` is no longer a full tier-qualified reference and its `shape` field (`concrete`/`pattern`) has no per-leaf meaning.** **Declaredness below the top level becomes RESOLVABILITY** — a leaf is "declared" iff the walk reaches it |
| **2** | **THE `G-1`…`G-10`-CLASS REFUSAL CASES THAT SURVIVE, NAMED ONE BY ONE (held `§2.6` item 3's token map)** | **SURVIVE UNCHANGED: `G-1`** (a name no row declares → `'undeclared-name'`, now decided at `S2` for the top-level segment) · **`G-2`** (a top-level name declared twice → the table does not load; `'undeclared-name'`) · **`G-5`** (a tier segment outside the four tokens → `'malformed-name'`) · **`G-6`** (a `secure.*` name → `'secure-refused'`, decided before the register) · **`G-7`** (an empty or non-string name, or an empty segment → `'malformed-name'`) · **`G-4`** (`remove` on a RESERVED name → `'reserved-name'` — **but see item 3**) · **`H-2`/`H-5`** (a declared-but-never-written name → the DECLARED MISS) · **`H-3`/`H-6`** (`secure`) · **`H-4`** (the precedence) `. **AT RISK, because they are per-reference by construction: `G-3`** (a name whose first segment does not match its declared `tier` → with the tier on the NODE, `G-3` becomes the **flag disagreement** `S7` names, and its token does not exist) · **`G-9`/`G-10`** (the ambiguous table and the malformed pattern → they survive **only if top-level patterns survive**, i.e. only if the register keeps a pattern kind for top-level names) · **`G-8`** is already *"SUPERSEDED: this row has NO SUBJECT"* and stays so. **SURVIVE, RELOCATED: the `reserved-namespace` collision rule** (`§2.6` item 6) — its natural home becomes an **anchor key** rather than a leaf spelling |
| **3** | **WHAT BECOMES UNREACHABLE** | **(a) THE PER-LEAF DECLARED-MISS vs UNDECLARED-NAME SPLIT.** `H-1`/`H-5`'s *"an undeclared name is a TYPED REFUSAL, a declared-but-never-written name is a MISS"* (`§3.2` `F-9`) has no referent at leaf level: the leaf is undeclared **until it resolves**, so the two states collapse into one unless the register gains a second kind. **(b) THE `reserved:true` PER-REFERENCE REFUSAL.** **The held model's own worked instance is the tab slice's reserved landing entry** — `remove('file.tabs.landing')` refused **BY NAME** while `remove('file.tabs.t7.target')` succeeds (`§2.6` item 5 row 3; the ruling `R3-2`; `§0` ruling 13; `§3.2` `F-14`). **Under a top-level-only register BOTH calls name the same top-level item (`tabs`), so the refusal cannot live on a register row.** **This is the single sharpest functional loss in the amendment, and it is a LANDED-RULING case, not a preference:** it is `docs/decisions.md` 's `NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-PER-REFERENCE-CLEAR-EVENTS-DOWNWARD-REMOVAL-THE-REFERENCE-SET-CROSSING-AND-THE-CRITERION-AS-A-PLACEMENT-RULE` clause (2). **(c) THE PATTERN MATCHER'S PRECEDENCE ARGUMENT** — with one kind of row at one level, *"concrete beats pattern, then more-literal-segments wins"* has nothing to arbitrate |
| **4** | **WHAT BECOMES NEWLY REFUSABLE** | **four new arms the held union cannot name, each reachable only because the walk exists:** `'no-such-anchor'` (`S3`) · `'severed-link'` (`S4`) · `'rebuild-failed'` (`S5`) · `'tier-contradiction'` (`S7`). **And one newly refusable CLASS: an access refusal.** The directive gives links **access control**, so a link may refuse a traversal the register admitted — a refusal kind the held model has **no token and no table row for** (`§2.6` item 3's eight tokens include no access member) |
| **5** | **HOW A CONSTRAINT IS DECLARED AT TOP LEVEL WHILE MAINTAINED ON LINKS** | **the declaration is a register row's `constraint` field** (held field name, new referent): the top-level row declares **the constraint id and the anchor that names the matched set**; **the maintenance rides the links**, so the evaluator runs at **the anchor the write passes through** rather than at the store's whole post-state (held `§2.10` item 6's evaluation set). **The rule the held model pins for the outcome is UNCHANGED and must stay unchanged:** *"`0` active → the NEXT SURVIVING entry by the caller's own order, WRAPPING to the first; `≥2` active → deactivate every active entry except the REFERENT"* — the `R3-1` rule, whose ONLY input is the caller's own `order` (`§2.10` item 9; the plan's `§1.9` (iv)'s round-3 block). **What changes is WHERE the evaluation fires, not WHAT it does.** **The tab slice's exactly-one-active constraint is the worked case in §4** |
| **6** | **THE HONEST VERDICT ON THIS COLLISION** | **the register's SHRINKAGE is not merely fewer rows: it moves declaredness from a TABLE to a TRAVERSAL, and it removes the one per-reference refusal the landed round-3 rulings depend on (`reserved`).** **So this collision is the amendment's largest SEMANTIC loss, not its largest structural one** — **and §10 `Q-7` asks whether `reserved` and the per-leaf patterns can be RE-HOMED on the anchor/link rather than dropped, which is the repair that would make the register shrink without losing the ruling** |

**AND THE ONE POSITIVE THE COLLISION PRODUCES, STATED FAIRLY:** **the held registry's own hardest row is `G-9` — an
ambiguous table must REFUSE AT LOAD rather than first-match-wins, "because first-match-wins would make the registry's
meaning depend on row order, which is the `F-8` class one layer down" (`§2.6` item 5 row 2).** **A graph makes
double-registration structurally visible (two anchors of the same key on one node, two register rows for one name), so the
ambiguity class is ENFORCEABLE AT CONSTRUCTION rather than only at load — a genuine improvement, and the only one this
collision yields.**

### §3(c) COLLISION 3 — RECLAIM-ON-SEVERANCE: the store gains reachability-based collection

**THE DIRECTIVE'S CLAUSE:** *"everything else can be tracked by internal graph reference (and deleted if severed from
graph)."* **A store that deletes on severance acquires a COLLECTOR, and a collector is a new authority over deletion.**
**The held model has exactly two deletion paths and both are explicit:**

| # | The held deletion rule | Its clause |
| --- | --- | --- |
| **1** | **`commit` clears the SAME LOGICAL PATH in every lower-durability tier, AFTER the higher tier durably accepted, and clears NOTHING on a refusal** | `§2.10` item 1(a)/(b)/(c); `C-1`…`C-5`; the decision row `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1) |
| **2** | **`remove` clears DOWNWARD — `remove('file.x')` clears `file`, then `mem`, then `temp`; `remove('temp.x')` clears `temp` only; a removal NEVER clears a HIGHER tier** | `§2.10` item 3(a); the ruling `R3-6`; the decision row `NEXT-SURVIVING-…` clause (4) |

**The amendment's collector is a THIRD deletion path, and it deletes by REACHABILITY rather than by logical path.** **Four
cases, each stated with its answer and its cost.**

#### (i) A SEVERED `file`-TIER NODE — does the persisted file lose it at the next commit?

**YES, AND THE COLLECTOR CANNOT REACH THE FILE BY ITSELF.** **The realm split puts the tier-1 FILE in `main` and the
VALUES in the renderer** (the plan's `§2.5`; the held contract's `§2.12` item 2 and `§2.2` `P-8`: *"No persistence outside
the tier-1 channel"*), so a reclaim of a `file`-flagged node is an in-memory deletion whose **durability is a
`Y-2`-class crossing** — one atomic write behind the channel, with a receipt (`U-STORE-PERSIST`'s contract; the held
contract stubs the crossing at `§2.2` `P-9`). **Three consequences, each a clause a contract would owe:**

1. **A SEVERANCE OF A `file`-FLAGGED NODE IS A COMMIT-CLASS OPERATION**, not an in-memory unlink: it needs a receipt
   (`status`/`cleared[]`/`events`), it can be REFUSED, and **on a refusal it must delete NOTHING** — the non-destructive
   posture the held `§2.2` `P-4`'s exhaustive throw list and `§2.10` item 1(c) exist to preserve.
2. **THE ORDERING MUST BE `C-2`'S: PERSIST FIRST, THEN RECLAIM.** **The held rule is *"the clear happens AFTER the higher
   tier durably accepted the value, NEVER BEFORE"*** (`§2.10` item 1(b)). **A collector that reclaims first and persists
   later inverts a landed ordering, which is the `R3-6`-class mistake in a new place.**
3. **WHAT THE FILE LOSES AT THE NEXT COMMIT: the severed node and its descendants' persisted entries, and nothing else.**
   The plan's atomic duty (the `${path}.tmp` + `renameSync` + `fsync` discipline, with
   `src/main/security-store.ts`'s plain `writeFileSync` **named as the pattern NOT to copy**) already belongs to the
   channel (`[H]`: the plan's `§2.5`'s atomic-duty block; the decision row `FOUNDATION-STORE-FACILITY-…` clause (4)).

#### (ii) A SUBSCRIBED NODE THAT BECOMES UNREACHABLE

**THE HARD LANDED ROW HERE IS `S-RH-1`, and it is the one that makes this case more than bookkeeping.** **A store
subscription is PER REALM, PER REFERENCE: ONE subscription, for as long as the realm lives, on ONE declared reference;
the count after `N` generations stays `1`** — held `§2.11` item 5, `§3.3` `I-15`, `§3.4` `R-16`, register row
`P-SC-IM-9`, and the decision row `FOUR-TIER-DATA-OWNERSHIP-MODEL`'s `S-RH-1` clause. **A reclaimed node has no
realm-independent existence to be observed, so four clauses are owed:**

1. **RECLAIM MUST RELEASE THE RECLAIMED NODE'S OWN SUBSCRIPTIONS IN THE SAME OPERATION** — otherwise a live listener
   observes a reference that no longer exists, and the delivery count becomes *"1 per subscribed reference"* over a
   reference set that is not the graph's.
2. **AND THE RELEASE MUST BE OBSERVABLE.** **The held event surface's seven `cause` tokens are**
   `'set' · 'commit' · 'clear' · 'sweep' · 'remove' · 'repair' · 'descendant'` (`§2.11` item 2) — **none of them is
   severance or reclaim**, so a release that is not reported is **the silent second write the held `§2.11` item 2's
   `'repair'` row exists to forbid.** **A new `cause` token is therefore owed (proposed `'severed'`), and that re-opens
   the union — a closure the held contract calls *"a contract-shape decision the spec makes"* (`§2.6` item 3).**
3. **THE PER-REFERENCE COUNT ROW MUST BE RE-DERIVED, NOT RELAXED.** `R-16` predicts `1` after `1` construction, `N`
   loads and `M` re-derivations — **a reclaim is a fourth event class and its count must be declared, or the row's
   prediction becomes ambiguous.** **The admissible reading: a reclaim does NOT touch other references' counts
   (`N + 1` stays the superseded reading), and it takes exactly one subscribed reference's count to `0`.**
4. **THE HONEST LIMIT:** **a reclaim's release is `[T]`-observable only** — the store calls listeners and nothing else
   (`§2.2` `P-7`; `§3.3` `I-8`), so **a "reclaim green" proves a call was made, never that a pane, a strip or a rendered
   surface noticed.**

#### (iii) AN IN-FLIGHT `temp` EPISODE WHOSE PARENT CHAIN IS REWRITTEN

**THIS IS THE COLLECTOR'S DANGEROUS CASE, and it is reachable today:** **the drag's per-move write is on the hot path
(the plan's `§7.3` `NW-3`), and a per-move `temp` placement whose parent is re-resolved mid-gesture becomes momentarily
unreachable.** **A collector that runs on reachability alone deletes the in-flight value it was written to carry.** **Two
clauses are owed:**

1. **THE ROOT SET IS NOT THE REGISTER ALONE.** **The reclaimer's roots are the register's rows PLUS a declared PIN SET** —
   the in-flight episode's own anchors, declared by the caller at episode start and released at the episode's terminal.
   **The pin set must be CALLER-supplied, because a store-side *"which value is in flight"* decision is the second
   authority the held `§2.2` `P-13`/`§3.3` `I-12` close.**
2. **AND THE PIN SET IS A NEW STRUCTURE THE STORE MUST KEEP CONSISTENT** — a fifth structure beside the graph, the
   register, the resolution cache and the tier collections (§4's cost table prices it).
3. **THE `sweep` RELATION IS WHERE THIS CASE PAYS OFF.** The held `sweep` unmarks the swept tier's entries and emits
   **ONE EVENT PER SWEPT REFERENCE** (`§2.12` item 3; `§2.11` item 2's `'sweep'` arm, *"a sweep of `N` entries emits `N`
   events — one per reference — and NEVER one event carrying a list"*). **Under reclaim, an episode's terminal sweep
   becomes: release the pin set, then reclaim what became unreachable — and the `N`-events rule must still hold, so
   reclaim must emit per reference, never one event with a list.**

#### (iv) THE TWO INTERACTIONS THE COLLECTOR HAS WITH THE LANDED DELETION RULES, AND A CRASH

| # | The interaction | The clause the amendment owes |
| --- | --- | --- |
| **1** | **COLLECTOR vs `commit`-CLEARS-LOWER.** The clear is **by logical path** (`§2.10` item 1(a): *"the clear is BY LOGICAL PATH, NEVER BY SUFFIX … `p` and `p.child` are DIFFERENT paths"*); the collector deletes **by reach**. **They can disagree: a `mem` node whose `file` twin is live can be reclaimed while the commit's audit list still names it.** | **the two rules must be declared DISJOINT: a reclaim NEVER crosses tiers by logical path (it deletes exactly the unreachable nodes, whatever their flags), and a `commit`'s `cleared[]` is resolved from the RESIDENT set, never from the traversal** — because `cleared[]` is *"the AUDIT LIST"* (`§2.11` item 2's `'commit'` arm) and an audit list the walk cannot reach is an audit list that cannot be checked |
| **2** | **COLLECTOR vs `remove`'s DOWNWARD RULE (`R3-6`).** `remove('file.x')` clears `file`, then `mem`, then `temp`. **If severing the `file` node severs a link a `temp` descendant hangs from, the same leaf is RECLAIMED and CLEARED — so the receipt's `cleared[]` could name it twice and its subscriber could receive two events.** | **ONE DELETION PER REFERENCE PER OPERATION: `cleared[]` is deduped by reference, and the per-affected-reference rule (`I-14`, `R-2`, `P-SC-IM-7` — *"NO subscriber ever receives two events for one reference from one operation"*) must hold across BOTH paths.** **The ordering is `C-2`'s for the durable tier, and the reclaim of a value the `remove` already named is a NO-OP** |
| **3** | **A CRASH BETWEEN A SEVERANCE AND THE NEXT COMMIT.** **The `file`-flagged node is reclaimed in memory; the process dies before the atomic write; at the next boot the `Y-1` hand-off returns the persisted value — SO THE DELETION IS LOST AND THE VALUE IS RESURRECTED.** | **THIS IS THE AMENDMENT'S MOST SERIOUS SINGLE COST, and it is a RESURRECTION, not a loss.** **The two honest answers, both costed in §10 `Q-8`: (a) PERSIST-FIRST (reclaim of a `file`-flagged node is ordered behind the durable accept, and the in-memory severance is committed only on a receipt — the crash window then loses a WRITE, never a DELETE); or (b) A TOMBSTONE (the severed reference is persisted as deleted and reconciled at the next `Y-1`), which buys a second persisted structure and a reconciliation rule, and whose own falsifier is a boot that answers a tombstoned name. (b) is the shape the landed atomic-write discipline's recovery clause already has (`U-STORE-PERSIST`'s contract; the plan's `§2.5` duty block), which is why it is defensible — and it is still a NEW persisted structure with its own correctness burden.** |

---

## §4. WHAT IT BUYS, AND WHAT IT COSTS

### §4.1 The two stated advantages, worked through a SECOND example — the tabs/focus slice

**The directive's advantage, in its own words:** *"Graph natively tracks ownership across layers and can easily export a
complete, multi-level data object from cache for local use within a function."* **Both halves worked on the model's own
first tenant.**

**THE EXAMPLE, in the model's own vocabulary (the plan's `§1.7`; the held contract's `§2.6` item 5 row 3):** the slice's
references are `file.tabs.landingPage` (the reserved landing entry), `file.tabs.<tabId>.active` (the exactly-one-active
predicate), `file.tabs.order` (the caller's own order), and a **per-move `temp` placement** (`temp.drag.<gestureId>.placement`,
the plan's `§1.3`'s proposed example list).

| # | The reference | Its node, under the amendment | Its anchors and links |
| --- | --- | --- | --- |
| **1** | **`file.tabs.landingPage`** | a `StoreNode` with **`type='file'`** — the landing entry | its parent chain: register row `tabs` → the `tabs` anchor → the link whose target set contains `landingPage` |
| **2** | **`file.tabs.order`** | the **`tabs` top-level node's OWN value** (the caller's order list) — **not a child node**, which is what makes it a legal constraint input | an anchor keyed `order` on the `tabs` node, holding the caller's list verbatim |
| **3** | **`file.tabs.<tabId>.active`** | a node with **`type='file'`** per entry | an anchor keyed `active` on the entry node; **the matched set is the link's own target set**, which is how the constraint's `≥2`/`0` arms get their enumeration |
| **4** | **`temp.drag.<gestureId>.placement`** | a node with **`type='temp'`**, linked from the entry's `placement` anchor | the **cross-layer fact made native**: the PARENT chain is `file`-flagged and the placement node is `temp`-flagged |

**ADVANTAGE 1 — CROSS-LAYER OWNERSHIP IS TRACKED NATIVELY, AND IT IS THE `parts` LIST'S REPLACEMENT CANDIDATE.** **The
held model needs a whole mechanism to say *"the parent is persistent, this child is not"*: the MERGED READ, whose
`parts` list of `{tier, path}` pairs exists *"so the list stays a provenance record"*, with `merged:true`/`tier:null`/
`cache:null`, the overlay by DESCENDING durability, the first-hit-wins boundary, and the declared limit that *"a merge is
OVERLAY-BY-PATH, not a deep structural merge"* and that two tiers holding structurally incompatible objects is a
`parts`-visible conflict with **NO reconciliation** (held `§2.5` item 5's five rows and item 6; the plan's `§1.9` (ii)
and its round-3 corrections; register rows `P-SC-TP-4`, `P-SC-IM-1`). **Under the amendment the SAME FACT is a property
of the link: entry `3`'s link names a `temp`-flagged child under a `file`-flagged parent, and the export reads it directly.**
**The consequence is strong and worth stating plainly: THE MERGED ARM AND `parts` HAVE NO REASON TO EXIST IN THE AMENDED
MODEL — the graph has ONE holder per address, so the two cases the merged arm exists to compose (a value no tier holds;
a parent in one tier with children in another) are either unreachable or directly readable.** **And the held model's own
declared LIMIT disappears with it: with one holder per address there are no *"structurally incompatible objects at the same
path"* to conflict.**

**ADVANTAGE 2 — THE MULTI-LEVEL EXPORT.** **One traversal of the entry node's anchors and links materialises the whole
entry — its `active` flag, its position in `order`, and its in-flight `placement` — as a single object for local use
inside a function.** **What that replaces, precisely: the held model's `read` returns ONE reference's value or a
`parts`-provenance composite; it never returns *"the whole entry"*, and assembling one from four reads is the caller's
work.** **The honest bounds on the claim, stated so it is not over-read:** the export is **`[T]`-observable only** (it is
a function of in-memory structures; the store calls listeners and never the graph — `§2.2` `P-7`), and **its authority is
the OPEN question §10 `Q-9` raises**: a fresh object per call is a snapshot with no tier behind it (which is the
status the held model already declares for a merged value — held `§2.5` item 5's *"NON-AUTHORITATIVE — no tier holds it,
it is recomputed on every read"*, and the gate-1 record's `§10` `R3` risk), while a live handle into the cache is a new
mutability surface the held model nowhere grants.

### §4.2 The costs, all four, priced in the held model's own units

| # | The cost | Its terms, in the held model's units |
| --- | --- | --- |
| **1** | **A TRAVERSAL PER RESOLUTION, AGAINST THREE MAP LOOKUPS.** | the held read is **at most three exact lookups** (`§2.5` item 2: unqualified searches `temp` → `mem` → `file`, stops at the first hit; a qualified read addresses exactly one tier), i.e. **`O(1)` per tier, ≤3 probes, no walk**. The amendment's walk is **`O(depth)`**, and the directive's own example is **depth 3 before the leaf** (§2.3, steps `S2`–`S6`). **On the hot path this is the cost that matters:** the drag writes once per observed move and a subscriber per move is *"a re-render amplifier"* whose cap the held contract derives from exactly that sentence (`§2.9` `CAP-3`'s reason quotes the plan's own wording) — so **a per-move resolution pays the depth, and the held contract's `CAP-3` rationale becomes a rationale for bounding TRAVERSALS rather than subscriptions if the amendment lands** |
| **2** | **A CACHE THAT CAN BE STALE — AND THEREFORE A REBUILD RULE.** | the directive requires a *"valid cache"* and a *"rebuilding a stale one"*, and **neither the directive nor the repo states what makes an entry stale, who rebuilds it, or whether a rebuild is observable.** **The held model has NO cache-validity concept at all** — its read consults its tables synchronously and its only derived structures are the per-tier tries, which are maintained *"INSIDE THE TIER'S OWN MUTATING OPERATIONS, in the same synchronous step"* with **NO EXTRA WRITE** and **NO EXTRA PING** (held `§2.7` items 2/3; the plan's `§1.9` (i)). **So the amendment introduces the held model's first DERIVED-AND-POSSIBLY-WRONG structure — and the held model explicitly refused that class by making its one derived structure synchronous and event-free.** **The falsifier is §9's risk 2: a rebuild that resurrects a cleared value** |
| **3** | **A NEW STRUCTURE THE STORE MUST KEEP CONSISTENT — FIVE, IN FACT.** | the held model keeps **the four tier tables + one trie per tier + the declaration table + the constraint table + the subscription record**; `§2.1`'s amendment needs **the graph (nodes/anchors/links) + the register + the resolution cache + the tier collections + (if reclaim of an episode is to be safe) the pin set** — and **the pin set is the one that has no held analogue and whose absence deletes an in-flight value (§3(c)(iii))**. **The consistency burden is the real cost: the held model's trie row is checkable against its own table by a differential (`§3.4` `R-14`, register row `P-SC-TP-5` — *"a trie that disagrees with its own table is a FAILURE"*), and each new structure owes its own such row** |
| **4** | **THE REGISTER'S COVERAGE SHRINKS TO TOP LEVEL.** | **the held registry can refuse an undeclared name at WRITE TIME for every reference** (`§2.6` item 3's `G-1`; `§1` item 4's *"the store's SECOND CONTRACT SURFACE"*); **the amendment refuses at the TOP-LEVEL segment only and treats declaredness below it as resolvability** (§3(b) item 1). **The measurable loss: the per-leaf refusal set `G-1`…`G-10` × `H-1`…`H-6` — 16 enumerated rows with 16 named positive controls (`§3.4` `R-5`; register row `P-SC-IM-4`, *"`40` attempts = `10` cases × `2` halves"*) — collapses to the subset that survives at top level, and the per-reference `reserved` refusal the round-3 ruling `R3-2` depends on has no home (§3(b) item 3(b))** |

---

## §5. THE RESOLUTION ALGORITHM AS A STATE MACHINE

### §5.1 Every state and every fail-state

**States are the walk's own (`§2.3`), plus the two the held read has and the amendment keeps. `→` = a transition.**
**`REFUSE(t)` = a typed refusal carrying token `t`. `MISS` = the declared miss. `ANSWER` = the declared hit.**

| # | State | On what input it is entered | Its declared transitions |
| --- | --- | --- | --- |
| **A** | `PARSE` | any name | `→ B` (a well-formed name in the closed four-token domain) · `→ REFUSE('malformed-name')` (absent / non-string / empty / empty segment / out-of-domain first segment) |
| **B** | `SECURE-GATE` | a parsed name | `→ REFUSE('secure-refused')` **iff the first segment is exactly `secure`** — **decided BEFORE the register is consulted, as the held rule requires** (`§2.6` item 4) · `→ C` otherwise |
| **C** | `TOP` | a non-`secure` name's first path segment | `→ D` (a register row matches) · `→ REFUSE('undeclared-name')` (no register row — the held `G-1`/`H-1` arm, **surviving**) |
| **D** | `ANCHOR(i)` | the `i`-th path segment on the current node | `→ E` (an anchor is keyed by the segment) · `→ REFUSE('no-such-anchor')` **(NEW)** · `→ D(i+1)` when a further segment remains |
| **E** | `LINK` | an anchor with a link | `→ F` (the link's target is reachable) · `→ REFUSE('severed-link')` **(NEW)** — the reclaim arm, and its post-state is the reclaimed node's absence from the collections |
| **F** | `CACHE` | a reachable link | `→ H` (**cache entry VALID**) · `→ G` (**cache entry STALE** — a DECLARED NORMAL PATH, not a failure) · `→ H` (**no cache entry** — a first resolution) |
| **G** | `REBUILD` | a stale entry | `→ H` (the rebuild succeeds and the entry is replaced) · `→ REFUSE('rebuild-failed')` **(NEW)** |
| **H** | `RESOLVE-LEAF` | the last path segment, against the link's target set | `→ I` (a target carries the id) · `→ MISS` (the chain resolved and the leaf is unwritten — the held `H-2`/`H-5` arm, **surviving**) · `→ REFUSE('no-such-anchor')` (the chain stopped earlier) |
| **I** | `FLAG` | the resolved node's `type` flag | `→ ANSWER` (the flag agrees with the name's tier token) · `→ REFUSE('tier-contradiction')` **(NEW)** — **or, under §10 `Q-6`'s alternative, the name is authoritative and the walk returns to `H` to seek an agreeing sibling** |
| **J** | `ANSWER` | a resolved, flag-agreeing node | **terminal** — the held answer shape `{found:true, value, tier, cache, name}` (`§2.5` case (d)) |
| **K** | `MISS` | a declared top-level item whose leaf is unwritten | **terminal** — the held declared miss `{found:false, value:undefined, tier:null, cache:null, name}` (`§2.5` case (e)) |
| **L** | `REFUSE(t)` | any refusal arm | **terminal** — the held refusal record `{status:'refused', reason:t}` shape |

**AND THE FIVE CLAUSES THE MACHINE OWES, each a row a contract could fail:**

1. **TOTALITY: NOTHING THROWS ON A DECLARED-DOMAIN INPUT.** **The held rule is binding and unchanged: every API member is
   TOTAL over its declared domain and answers a RECORD, with exactly THREE named exceptions — `createStore`'s LOAD
   REFUSAL, and `reset()`/`seed()` without the test seam** (`§2.2` `P-4`; `§3.3` `I-2`; `§3.2` `F-25`; register row
   `P-SC-TP-1`). **A walk with a recursive structure is the classic place for a throw to appear (a cyclic link, a
   hostile segment such as `'__proto__'`/`'constructor'` — the held `§3a`'s seed `ADV-SC-1`), so the machine must declare
   its CYCLE RULE and its SEGMENT-AS-DATA rule, and both are new.**
2. **THE WALK TERMINATES ON EVERY INPUT.** **A link graph can contain a cycle (a node linked from its own descendant),
   and the held model has no cycle concept — its namespace is a dotted string over a table.** **A depth bound, a
   visited set, or a declared acyclicity invariant must be pinned by the contract — **it is §10 `Q-4`'s companion clause,
   and its OWNER is the architect with the positive revisit condition *"the ruling on the cache-validity rule states the
   traversal's termination clause in the same pass"*; until then a body that walks a cyclic link has no declared
   totality** — and a body that walks a cyclic link without one is
   non-total by construction.** **This is the amendment's clearest new totality obligation.**
3. **THE FLAG CHECK IS ORDERED, AND ITS ORDER IS THE CONTRACT.** **`I` runs AFTER `H`, so a flag disagreement on a
   resolvable leaf is `'tier-contradiction'` and never `'no-such-anchor'` — the same *"the reason token reported is the
   FIRST row that applies"* discipline the held `§2.5` item 1 pins for its six-row precedence.**
4. **THE REBUILD IS NOT A REFUSAL.** **`F → G → H` is a normal path; a contract that reported the stale-cache case as a
   failure would make the directive's own sentence (*"either from fresh cache or rebuilding a stale one"*) unsatisfiable.**
5. **THE MISS AND THE REFUSAL STAY DISTINGUISHABLE.** **The held model's hardest read-side distinction is *"an undeclared
   name is a TYPED REFUSAL, a declared-but-never-written name is a MISS"* (`§2.6` item 3's `H-1`/`H-2`/`H-5`; `§3.2`
   `F-9`) — and under a top-level-only register the distinction survives at `C` (refusal) vs `H → MISS`, but with a
   NARROWER refusal class (§3(b) item 3(a)).**

### §5.2 The refusal tokens, token by token, against the held contract's closed EIGHT-member union

**THE HELD UNION, as the contract closes it (`§2.6` item 3's token-mapping table; `§2.1`'s `StoreRefusalReason`): exactly
EIGHT tokens** — `'undeclared-name'` · `'malformed-name'` · `'secure-refused'` · `'reserved-name'` ·
`'malformed-pattern'` · `'cap-exceeded'` · `'ambiguous-path'` · `'reserved-namespace'`.

| # | The held token | Under the amendment | Why |
| --- | --- | --- | --- |
| **1** | `'undeclared-name'` | **SURVIVES, NARROWED TO TOP LEVEL** | `C`'s no-register-row arm; the per-leaf arms it covered (`G-1`/`G-2`/`G-3`/`H-1`/`H-5`) are replaced by resolvability (§3(b) items 1/2) |
| **2** | `'malformed-name'` | **SURVIVES UNCHANGED** | `A`'s arm keeps the held `§2.3` items 1/2 domain verbatim — the four tokens, case-sensitive, non-empty segments |
| **3** | `'secure-refused'` | **SURVIVES, STRENGTHENED** | `B`'s arm is now **before the register AND before any traversal**, so the separate collection is unreachable by construction |
| **4** | `'reserved-name'` | **SURVIVES ONLY IF RELOCATED** | the held `G-4` refusal is **BY NAME** on a per-reference declaration (`§2.6` item 2's `reserved`/`§2.6` item 5 row 3); a top-level-only register cannot express it (§3(b) item 3(b)) — **so the token survives only if §10 `Q-7`'s re-homing on an anchor or link succeeds** |
| **5** | `'malformed-pattern'` | **SURVIVES ONLY IF TOP-LEVEL PATTERNS SURVIVE** | it carries the held `G-9`/`G-10` arms (an ambiguous table; a malformed pattern) — **at top level a pattern over top-level names is meaningful; a per-leaf pattern is not** |
| **6** | `'cap-exceeded'` | **AT RISK — its referent is the three caps** | **the amendment replaces the caps with reachability** (§1 `M-4`; §6 `R11`), so the token's three arms (`CAP-1`/`CAP-2`/`CAP-3`'s overflow outcomes, `§2.9` item 1) have no referent **unless the register itself is capped, which the directive's *"only needs to count top-level items"* suggests rather than forbids** |
| **7** | `'ambiguous-path'` | **SURVIVES AS AN UNREACHABLE-OR-NARROWED TOKEN** | the held `§0A` note 4 **already scopes this token to the ONE tier-free case, leaving it *"declared but currently unreachable"*** (`§7a.1` item 2a), and the plan's own `remove` falsifier requires a tier-qualified removal to succeed with a lower copy resident — **so its status is unchanged by the amendment, and its ambiguity is the held filing's, not this proposal's** |
| **8** | `'reserved-namespace'` | **SURVIVES, RELOCATED** | its held arm is a concrete declaration colliding with a caller-supplied reserved key (`§2.6` item 6) — **its natural amendment home is an ANCHOR KEY colliding with a reserved key** |

**THE TOKENS THE TRAVERSAL NEEDS AND THE UNION DOES NOT HAVE — FOUR, EACH A CLOSURE DECISION:**

| # | The proposed token | The state that mints it | Why the held union cannot express it |
| --- | --- | --- | --- |
| **1** | **`'no-such-anchor'`** | `D` (and `H`'s stopped-chain arm) | the held model has no anchors, so its union has no member for *"the top-level item exists and the owner chain does not"* — the held nearest arm is `'undeclared-name'`, **whose use here would be a MISREPORT** (the name IS declared; its chain is absent), and a misreporting closed union is exactly what the plan's own `ProjectionSkipReason` discipline refuses (`docs/specs/projection.md` `§2.1`'s closed union comment: *"a closed union may grow by ruling; what it may NOT do is misreport"*) |
| **2** | **`'severed-link'`** | `E` | the reclaim arm is new (§3(c)); the held union's deletion tokens are all OPERATION causes, not graph states |
| **3** | **`'rebuild-failed'`** | `G` | the held model has no cache (§4.2 cost 2) |
| **4** | **`'tier-contradiction'`** | `I` | the held model's tier is a property of the NAME, so no disagreement is expressible; `G-3` (a name whose first segment disagrees with its declared tier) is its nearest relative and is per-reference |
| **5** | *(a fifth REFUSAL KIND, if link access control lands)* **an ACCESS refusal** — the directive's *"links can be used to direct and control reference access"* | a link that refuses a traversal the register admitted | the held union's eight tokens include no access member, and the held `secure` refusal is by NAME rather than by link — **so an access arm is a NEW REFUSAL KIND, not a new token in an existing kind.** **AND A `[T]` PRECEDENT EXISTS, WITH ITS BOUND NAMED:** the vendored `LinkConfigErrorCode` union is **`'unique-order' \| 'count-exceeded' \| 'count-underflow' \| 'role-mismatch'`** — four tokens that *refuse a link's own membership/order/role*, which is a real link-level refusal vocabulary; **but all four are CONFIG-TIME errors on a link's declaration (`LinkConfig`'s `parent?: {count: 1}` and its `children` counts), never RUNTIME access decisions over a traversal**, so they are a precedent for the SHAPE and not for the SEMANTICS |

**THE HONEST ARITHMETIC, PRINTED WITH ITS TERMS.** **THE HELD UNION IS CLOSED AT `8`, AND ITS CLOSURE IS A
CONTRACT-SHAPE DECISION THE SPEC MADE** (`§2.6` item 3; the gate-1 record's open-semantics entry for the refusal token
union, `docs/specs/store-core-adoption-dossier.md` `§3` `O-6`). **Under the amendment: `5` of the `8` survive (`1` narrowed ·
`3` strengthened · `8` relocated), `2` survive CONDITIONALLY on §10 `Q-7` (`'reserved-name'` · `'malformed-pattern'`), `1`
is at risk (`'cap-exceeded'`), and `4` new members are required (`'no-such-anchor'` · `'severed-link'` ·
`'rebuild-failed'` · `'tier-contradiction'`) — so the union re-opens and any new closure is ARCHITECT-ONLY.**

---

## §6. WHAT IT SUPERSEDES IN THE HELD MODEL, ITEM BY ITEM

**Every row of the held contract the task list names is here, plus the two the amendment's own mechanisms force.**
**Classification: SUPERSEDED · REPLACED · SURVIVES · NEW.** **The last column names the LANDED rows each move would
ITSELF supersede — every one of which is ARCHITECT-ONLY and needs its own gate, because `docs/specs/store-core.md`
`§8` states its own authority in those words: *"This filing SUPERSEDES nothing and AMENDS no landed row."***

| # | The held clause | Classification | What the amendment puts there | Landed rows it would itself supersede (ARCHITECT-ONLY, own gate) |
| --- | --- | --- | --- | --- |
| **R1** | **the per-tier tables and the tier-local surface** — `§2.4`'s three handles and their six-row decision table; `§2.1`'s export census | **REPLACED** | per-tier **collections** whose membership is the node's `type` flag (§2.4 row 2); the four tokens survive | **`docs/decisions.md` `FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1)** (*"each tier has its OWN get/set surface"* — the surface survives, the TABLE does not) |
| **R2** | **the residency trie** — `§2.7` items 1–6 | **SURVIVES AS AN INDEX, WITH ONE QUERY** | the trie stays as the per-collection path index and answers `holdsExact`; **its SECOND query `holdsDescendantBelow` is SUPERSEDED**, because the merged arm it serves is gone (R3) | **`docs/decisions.md` `QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION` clause (2)**'s trie clause (the trie survives; the round-3 `sweep`-prunes ruling survives); **the record's `C-6`** is discharged by a surviving row |
| **R3** | **the merged read with `parts`** — `§2.5` item 5's five rows and item 6's boundary (`N-7`); `§3.1` `M-5`; `§3.2` `F-6`; `§3.4` `R-13`'s `parts`/`merged` census | **SUPERSEDED** | the **multi-level export** (§4.1 advantage 2); the graph has one holder per address, so the merged arm's two composing cases are unreachable | **`QUALIFIED-READ-…` clause (2)** (*"a read of a path NO tier holds but whose DESCENDANTS are resident returns a MERGED value … whose return shape gains a `parts` list"*); **the plan's `§1.9` (ii)** and its round-3 corrections |
| **R4** | **the grammar's qualifier-only rule and the tier-first segment** — `§2.3` items 1/3; `§0` ruling 8 | **SURVIVES WITH A REPLACED ROUTING** | the tier token stays the closed, case-sensitive first segment; **a qualified read ROUTES to a flag check (`I`) rather than to a table**, and *"one spelling, one home"* gets STRONGER (one node, one address) | **`QUALIFIED-READ-…` clause (1)** (the qualifier-only rule survives; no alias field exists either way) |
| **R5** | **the no-engine-id rule** — plan `§1.3` `R-5` (second half); held `§2.3` item 5 + `§3.4` `R-9` | **SUPERSEDED, AND THIS IS COLLISION 1** | §3(a) resolution **(1)** *(recommended)*: the store's own store-minted graph ids; the ENGINE-id half of both rows survives | **plan `§1.3` `R-5` (second half) · plan `§3.3` row `2.3-8` · plan `§7.2` `F-5`'s *"explicitly not worsened"* cell · held `§2.3` item 5` and `§3.4` `R-9` — and a `docs/decisions.md` ACTIVE row, because none of the four is a decision row today** |
| **R6** | **the registry's per-reference pattern table** — `§2.6` items 2/5; `G-1`…`G-10`'s per-leaf arms | **REPLACED** | a **top-level-only register** (§3(b)); per-leaf declaredness becomes resolvability | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (5)**'s registry clause; **the record's `C-2`/`C-3`; held `§7a.1` item 1** (the declaration fixture's supplier) |
| **R7** | **the registry's `reserved` per-reference refusal** — `§2.6` item 2; `G-4`; `§2.6` item 5 row 3 | **SURVIVES ONLY IF RELOCATED** | §10 `Q-7`: re-home `reserved` on the **anchor** or the **link** so the landing entry's by-name refusal survives | **`docs/decisions.md` `NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-…` clause (2)** — *the landing reference reserved by ONE `concrete` declaration that OUTRANKS the pattern, so only the ENTRY's OWN removal is refused*. **This is the amendment's sharpest landed-ruling exposure** |
| **R8** | **the constraint table's evaluation point** — `§2.10` items 6/9; the plan's `§1.9` (iv) | **REPLACED (evaluation point only)** | declared on the top-level row, evaluated **at the anchor the write passes through** (§3(b) item 5); **the `R3-1` outcome rule and the `REPAIR`/never-refuse posture are UNCHANGED** | **`QUALIFIED-READ-…`**'s constraint-clause and **`NEXT-SURVIVING-…` clause (1)** (the repair rule survives verbatim); what supersedes is the plan's *"EVERY WRITE AND EVERY `remove`"* evaluation set |
| **R9** | **`remove` / `clear` / `sweep`** — `§2.10` items 2/3; `§2.12` item 3 | **SURVIVES AS OPERATIONS; `sweep`'s MECHANISM REPLACED** | `remove`'s DOWNWARD rule survives semantically with a **replaced mechanism** (sever + reclaim vs logical-path clear) — **§10 `Q-1` decides whether the logical path is kept as a second key, in which case the mechanism survives too**; `clear` survives verbatim (tier-local, non-recursive); `sweep` becomes **release-the-pin-set + reclaim** with the `N`-events rule intact | **`NEXT-SURVIVING-…` clause (4)** (the downward rule — survives semantically); **§3(c)(iv)** shows the two interactions (dedupe, no double event) that must be declared for it to stay true |
| **R10** | **the event surface and the per-affected-reference rule** — `§2.11`'s seven arms; `§3.3` `I-14`; `§3.4` `R-2` | **SURVIVES, EXTENDED** | the same envelope and the same one-event-per-affected-reference count, **plus a new `cause` token for severance/reclaim** (§3(c)(ii) item 2) | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (4)** and **`QUALIFIED-READ-…`**'s envelope clause (both survive; the union's closure re-opens, so a dated annotation is owed rather than a supersession) |
| **R11** | **the three caps** — `§2.9` items 1–3 (`CAP-1` 1024 · `CAP-2` 4096 · `CAP-3` 64); `§3.1` `M-13`; `§3.2` `F-18` | **SUPERSEDED** | **reachability** replaces counted caps (§1 `M-4`); the model's own leak classes are answered by collection, not by a refusal | **the record's `C-7`** (*"every cap value and its overflow outcome is declared"*); **`QUALIFIED-READ-…`**'s and **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1)**'s cap references; **the non-destructive posture `C-3` stays** and is a CONSTRAINT on the collector (§3(c)(i) item 1) |
| **R12** | **the test-only reset/seed seam** — `§2.8` items 1–4; `§3.4` `R-10`(c) | **SURVIVES** | unchanged in shape; **its `reset()` must additionally rebuild the graph, the register, the resolution cache and the pin set**, which is a widening of one clause and not a replacement | none — the record's `C-8` is discharged by the surviving row |
| **R13** | **`storeReferences`** — `§2.6` item 1; the plan's `§1.3` `R-2`; the record's `C-4` | **SURVIVES IN HOME AND REALM; REPLACED IN SHAPE** | still renderer-side beside the store, consulted in-realm with zero crossings; **its row shape becomes a top-level register row** (`§2.4` row 1), and its export census changes | **the record's `C-4`** (the file and realm — survives); **held `§7a.1` item 6** (the export census — replaced) |
| **R14** | **the read's answer SHAPE and the declared miss** — `§2.1`; `§2.5` cases (d)/(e); `M-1`/`M-2`; the held `cache`-is-the-handle identity rule (`M-2`, `§2.2` `P-5`) | **SURVIVES** | `{found, value, tier, cache, name}` stays, with **`value` from the node and `tier` from the flag**; `cache` becomes **the tier collection's own handle, or the resolution-cache entry** — **§10 `Q-2`/`Q-9` decide which, and `M-2`'s `toBe`-identity row must be re-derived against whichever is chosen** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2)** (the shape and the miss survive) |
| **R15** | **the read's PRECEDENCE** — `§2.5` item 1's fixed and total order `secure → malformed → registry → first hit → merged → miss`; `§3.4` `R-4` | **REPLACED** | the amended order `secure → malformed → register → anchor/link walk → cache/rebuild → flag → answer-or-miss` (§5.1's `A`…`L`) | **`QUALIFIED-READ-…` clause (1)** and **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2)** — the ORDER is a landed clause, so a re-derivation is owed rather than an annotation |
| **R16** | **`commit`-clears-lower, its `C-2` ordering, and the refused-cleans-nothing posture** — `§2.10` item 1(a)–(f); `§2.2` `P-4`'s throw list | **SURVIVES** | unchanged in substance, and **it is the rule the collector must OBEY rather than replace** (§3(c)(i) item 2) | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1)**'s commit clause (survives); **`E10-SINGLE-SINK-CHANNEL` is untouched** and the held `§2.10` item 8's one-commit rule survives |
| **R17** | **nothing — this row is the amendment's own addition** | **NEW** | **the store's own graph** (nodes/anchors/links, §2.1) · **the resolution cache and its rebuild rule** · **the pin set** · **the collector** · **the flag check** · **the four new refusal tokens** | none — but each carries its own register obligations under `docs/decisions.md`'s `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`, and **the collector's rows are the ones the register must carry FIRST** (§9) |

**THE ARITHMETIC, PRINTED WITH ITS TERMS.** **`17` rows: `SURVIVES` `8` (R2 · R4 · R7* · R9 · R10 · R12 · R14 · R16) ·
`REPLACED` `5` (R1 · R6 · R8 · R13 · R15) · `SUPERSEDED` `3` (R3 · R5 · R11) · `NEW` `1` (R17)** — **where `R7` is a
CONDITIONAL survivor, `R9`'s mechanism is replaced and `sweep`'s is SUPERSEDED, and `R15` carries `R3`'s and `R11`'s arms.**

### §6.1 THE HELD CONTRACT'S ROWS THAT BECOME UNIMPLEMENTABLE — named, because *"superseded"* and *"invalidated"* are different quantities

**A clause can survive in substance and still be unimplementable as WRITTEN. Ten held-contract rows/clauses fall in that
class, and they are the amendment's true bill:**

| # | The held row/clause | Why it becomes unimplementable |
| --- | --- | --- |
| **1** | `§2.3` item 5 (*"NO REFERENCE NAMES AN ENGINE ID"*) | the walk resolves a segment as an id (§3(a)) — **unless §3(a) resolution (2) is taken** |
| **2** | `§3.4` `R-9` (*"No path segment is looked up against any id registry"*) | `S6` does exactly that against the graph's own target set |
| **3–4** | `§2.5` item 5 + `§3.1` `M-5` (the merged arm and `parts`) | the merged arm's precondition (no tier holds the path) and its two composing cases are unreachable |
| **5** | `§3.2` `F-6` (the first-hit arm WINS over the merged arm) | a boundary between two arms one of which no longer exists |
| **6** | `§3.3` `I-13` (the per-arm key census over `parts`/`merged`) | the members it censuses are gone |
| **7** | `§2.9` (`CAP-1`/`CAP-2`/`CAP-3`) + `§3.1` `M-13` + `§3.2` `F-18` | its three caps and their overflow outcomes have no referent |
| **8** | `§2.7` item 4's query (ii) `holdsDescendantBelow` + `§3.1` `M-11`'s two-query row | its only consumer is the merged arm |
| **9** | `§2.5` item 1's precedence row + `§3.4` `R-4` | the order contains two arms that cannot run |
| **10** | `§3.4` `R-13`'s per-arm `hasOwnProperty` census | it censuses `parts`/`merged` on the first-hit and miss arms |

**AND THE REGISTER, ARITHMETICALLY — because the register is the contract's own mandatory obligation and a
`docs/decisions.md` ACTIVE row makes an un-run register row a FAILURE, never a pass
(`PBT-REGISTER-REQUIRED-FOR-CODE-UNITS`; `REGISTER-ENTRY-COUNT-IS-NOT-CAPPED-AND-ARCHIVE-IS-THE-TRUTH-MECHANISM`).**
**`§5.5.1`'s `20` typed rows, re-read under the amendment: `2` are INVALIDATED WHOLESALE (`P-SC-TP-4` — the merged read
and `parts`; `P-SC-IM-12` — the caps and their overflow outcomes), `6` are INVALIDATED IN PART (`P-SC-IM-1`'s merged arm ·
`P-SC-IM-4`'s per-leaf `G-3`/`G-9`/`G-10` cases · `P-SC-IM-5`'s matcher precedence · `P-SC-TP-3`'s `parts`/`merged` arms ·
`P-SC-TP-5`'s second query · `P-SC-IM-11`'s `parts` comparison rule), and `12` SURVIVE** — **`2 + 6 + 12 = 20` ✓, with
`P-SC-IM-8`'s evaluation-point clause and `P-SC-IM-6`/`P-SC-IM-7`'s arm sets each carrying a widening rather than a
replacement.** **The `400`-attempt arithmetic therefore does not survive the amendment either: it is the sum of the
twenty terms, and eight terms change.**

---

## §7. THE UNIT SPLIT AND SEQUENCING IMPACT

### §7.1 Does this change `U-STORE-CORE`'s boundary, its first red set, or the three admitted units' scope?

| # | The unit / artifact | The impact, honestly |
| --- | --- | --- |
| **1** | **`U-STORE-CORE`'s BOUNDARY** | **YES — SUBSTANTIVELY.** The unit's one-sentence contract (`§1` item 1) enumerates *"the layered read with its five cases and its `{found, value, tier, cache, name}` / `{merged, parts}` shapes, the reference grammar …, the DECLARED NAME REGISTRY …, the residency trie, the constraint table with its one `REPAIR` row, `remove`/`clear`/`sweep` …, and the one event envelope with its seven `cause` tokens"* — **and the amendment changes THE READ (`R15`/`R3`), THE REGISTRY (`R6`/`R7`), THE TRIE'S SECOND QUERY (`R2`), THE CONSTRAINT TABLE'S EVALUATION POINT (`R8`), `sweep` (`R9`) AND THE CAPS (`R11`).** **Six of the seven enumerated elements move.** **The unit's NAME, its realm (renderer, `§2.12` item 2), its tier tokens, its answer shape, its commit rule and its event envelope all survive; its SHAPE does not** |
| **2** | **`U-STORE-CORE`'s FIRST RED SET** | **NOT AUTHORABLE AS WRITTEN, AND THIS IS THE DECISIVE FACT.** The architect ruled that *"THE FIRST RED SET CARRIES THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"* (`§1` item 1; the record's `§7`'s annotated ruling; the decision row `NEXT-SURVIVING-…` clause (7) and the `docs/decisions.md` `AUTONOMY AFTER SPEC APPROVAL` chain). **Since no second pass is available, a red set that carried the held model and then re-grain the whole model would be the split the ruling forbids — so the choice is not "amend and re-grain": it is "amend the contract FIRST, then author the first red set once"** |
| **3** | **`U-STORE-PERSIST` (admitted, row `G2`)** | **AFFECTED, NOT WHOLESALE.** Its subject is tier 1 as **a table + the main-side channel** — the boot hand-off, the commit crossing, the atomic write, the migration, the receipts (the record's `§4`; the plan's `§2.5`). **The amendment changes what the hand-off CARRIES (register rows + graph membership rather than a `{name, value}[]` list), and it makes SEVERANCE a commit-class write (§3(c)(i) item 1)** — **so its `Y-1`/`Y-2` shapes and its receipt set both change, and `NW-15`'s kill-between-persist-and-receipt duty (the record's `C-9`) becomes MORE load-bearing, because a lost write is recoverable while a lost DELETE is a resurrection (§3(c)(iv) item 3)** |
| **4** | **`U-STORE-SECURITY` (admitted, row `G3`)** | **LARGELY UNAFFECTED, AND ARGUABLY SIMPLIFIED.** The directive's *"security is a separate collection"* **agrees with every landed tier-4 rule** — main-only, no renderer read, a typed refusal before the registry, manual-UI-only by construction (`docs/specs/mcp-endpoint.md` `§6.4`; layer 1 `§5` `A-7`; held `§2.6` item 4). **Its `RH-3` cap and burst duties and its atomic-write/receipt duties are untouched.** **The one new question it inherits: whether the separate collection is a COLLECTION IN THE SAME SENSE as §2.4 row 2's three, or a structure of its own** |
| **5** | **The five proposals' blocked-on lists** (the plan's `§6.5` round-3 table; `docs/pending.md` `P-6`) | **`U-STORE-FOCUS`** — its declaration set's SHAPE changes (top-level rows + anchors), **so a re-grain of its declaration rows is owed in addition to its existing blockers** (`docs/specs/focus-model.md`'s refusal rows + `docs/specs/focus-tool-greens.md` `FT-09`). **`U-STORE-DRAG`** — **its stop-and-ask list GAINS an item: the pin set and the episode's reclaim semantics** (§3(c)(iii)); its `RH-2` gate is unmoved. **`U-STORE-LAYOUT`** — reference SPELLINGS are unchanged, so its `ZQ-2`/`ZQ-3`/`ZQ-4` rows and `file.window.bounds`'s ruled shape (renderer owns, `main` applies) are unmoved; **its per-module store obligations re-grain**. **`U-STORE-MODULES`** — the `15 = 8 STORE-BACKED + 7 PURE` scope ruling and the `2 + 6` byte split (the ruling `R3-4`) survive, **but each of the eight modules' named obligations now names a walk-based read, so all eight re-grain.** **`U-STORE-TABS-STRIP`** — unmoved (it is a rendered strip; the `user-flow-audit.md` `§7.1` predicate follows it either way) |
| **6** | **THE ORDERING CONSEQUENCE** | **the amendment does NOT unblock anything.** `FOCUS` stays behind its two routed prerequisites; `DRAG` stays behind `RH-2`'s contract gate; **and `U-STORE-CORE`'s own first red set moves BEHIND a new proposal-gate pass** — so the amendment's cost includes the gate chain it re-opens (§7.2) |

### §7.2 Does it invalidate the held contract wholesale (a new spec gate) or amend it in place (an amendment + re-grain)?

**The question has exactly two answers, their consequences are different, and this file RECOMMENDS one without deciding it
(§10 `Q-10`).**

| # | The answer | What happens to `docs/specs/store-core.md` | What happens to its dossier | The cost |
| --- | --- | --- | --- | --- |
| **(a) RE-FILE: A NEW SPEC GATE** *(recommended)* | **the held contract stays FILED and is marked HELD PENDING THIS PROPOSAL, and on the architect's approval is marked SUPERSEDED BESIDE with a pointer to a successor contract — NEVER rewritten** (the repo's annotate-never-rewrite convention, `RCA-8(d)`; the precedent the plan itself sets for `C-4-R2`(a)'s tier-local wording and for `§1.9` (iv)'s *"first surviving"*) | **a successor contract lands at a new path (PROPOSED name: `docs/specs/store-core-graph.md`), written by `role_spec_writer` at a NEW spec gate with a fresh STEP-0 determination; the held file keeps its bytes and gains only a dated status marker — which a pass OTHER than this one writes** | **the dossier's eight adopted rows mostly SURVIVE** (the four tier tokens · the per-tier `get`/`set` surface · the layered read · `commit` · `subscribe` are all still adopted and all still cited from the architect's words), **so the successor contract CITES the dossier rather than replacing it**; **three of its `defined` statuses need re-status (`O-1`'s merged read + `parts` · `O-2`'s trie queries · `O-12`'s three caps), and its collision block GAINS the `R-5`/`R-9` hits §3(a) names** — **an amendment to the dossier, owned by the successor's spec-gate pass** | **the highest process cost: a fresh spec gate, a fresh register, and a fresh first red set** — **and it buys the thing the "no second CORE pass" ruling makes necessary: ONE red set authored against ONE contract, with no re-grain** |
| **(b) AMEND IN PLACE + RE-GRAIN** | **the held contract gains a dated amendment block and eight of its `§5.5.1` register rows are re-derived** (the `2 + 6` count of §6.1), **with the superseded clauses kept visible beside** | **unchanged as a file; its §5.5.1 register is re-authored and its `400`-attempt total re-printed WITH its terms** (the ACTIVE rule `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`) | **the same amendment as (a)** | **cheaper on filing, and it directly strains the architect's own ruling:** re-graining a register whose contract changed under it is *"a register that splits them out anyway"* in spirit (the record's `§7` ruling's own falsifier), **and `RCA-8(a)`'s one-unit-one-commit discipline is harder to keep when one file carries two models** |
| **(c) A THIRD ANSWER, NAMED SO IT IS NOT OVERLOOKED** | **a NEW UNIT id for the amendment** (PROPOSED name: `U-STORE-GRAPH`), with `U-STORE-CORE`'s held contract abandoned rather than superseded | — | — | **`RCA-8(f)`: THE ARCHITECT ADMITS ROWS, NOT A PASS** — a new unit id is an admission only the architect may write, and a docs-only proposal pass may not write it |

---

## §8. THE FORK CONSEQUENCE, EXACTLY

**Stated with the plan's own arithmetic, and with the one clause that keeps this amendment fork-NEUTRAL.**

1. **WHICH FILES WOULD MOVE.** **The same set the gate-1 record's `§9` already names for the three admitted units, and
   NO additional file:** `src/renderer/store-core.ts` (NEW — the graph store) · `src/renderer/store-references.ts` (NEW —
   the top-level register) · `src/main/store-channels.ts` (NEW — channel-name constants only) · `src/main/main.ts`
   (handlers, atomic write, boot order, migration) · `src/main/preload.ts` (the new members) ·
   `src/main/security-store.ts` (the atomic replacement + the receipt) · `src/main/mcp-server.ts` (options pass) ·
   `src/renderer/renderer.ts` (subscriber wiring) · `<userData>/provident-settings.json` (NEW at runtime, the PROPOSED
   carrier name). **`docs/FORKER.md`'s two now-false cells stay the amendment's, and the re-write order is unchanged**
   (`Q-14`'s pass; the decision row `FOUNDATION-STORE-FACILITY-…` clause (4)).
2. **DOES ANY VENDORED `src/shared/**` BYTE MOVE? NO — AND THAT IS A DESIGN DECISION THIS PROPOSAL ASKS THE ARCHITECT
   TO TAKE DELIBERATELY, NOT A BYPRODUCT.** **`src/shared/**` stays BYTE-IDENTICAL** (the record's `§9`; the held
   contract's `§1` item 9 and `§3.5` `R-11`; the plan's `§6.3` `U-STORE-CORE` boundary clause *"plus zero edits to
   `src/shared/**`"*; `Q-3`'s answer keeps the channel constants out of the vendored surface). **The amendment keeps it
   only under §3(a) resolution (1) or (2): the store's graph is the STORE'S OWN structure, so it adds no member to
   `src/shared/types.ts` and imports no `provident-ssr` type.** **Under §3(a) resolution (3)-if-widened — a store riding
   the engine's object graph — the vendored tree would move or the store would need a type-only import that `§3.4`
   `R-11`'s one-import census forbids, and the fork's owed set would grow with it.** **So the recommendation in §3(a)
   is what keeps this section short, and the two facts are the same fact.**
3. **WHAT THE FORK WOULD OWE (unchanged from the record's `§9`, restated so the amendment's neutrality is checkable):**
   **re-digest** the host files and the new modules (**this repo ships no per-module digest table** — the re-vendor is
   *"a SCHEDULING OBLIGATION WITH A LIST"*, the plan's `§5.6.5`); **re-run the conformance leg (`N = 9`), which reads
   the built tree — so a rebuild is required**; **re-decide its own carrier question**; and **correct the two
   fork-facing cells** (`docs/FORKER.md` `§1`'s `Does NOT ship` row and `§4`'s `### PERSISTENCE` block). **This repo
   writes no file under the fork's tree** (`H-r6`).
4. **THE ONE FORK-FACING CLAUSE THE AMENDMENT ADDS, and it is a warning rather than an obligation:** **the directive's
   *"similar to the provident architecture"* invites a future reader to bind the store to the engine's graph.** **The
   `docs/FORKER.md` re-write (a re-vendor scheduling artifact) is the LAST place that binding should be discovered** —
   **so the architect's `Q-2` ruling, whenever it lands, belongs in the same documentation pass** (`Q-14`'s), **and a
   binding that lands without it is a documentation-review finding at that pass's gate** (`AGENTS.md` item 10d).

---

## §9. RISKS AND FALSIFIERS

**Six risks. Each carries its falsifier in the held model's own form — an observation a row could take, not an
admiration.** **No risk is filed as an open item: each carries an owner and a positive revisit condition (§10's
questions), or is marked `UNVERIFIABLE — CARRIED`.**

### RISK 1 — A RESOLUTION THAT WALKS A STRUCTURE THE ENGINE MAY RE-DERIVE

**THE RISK, STATED WITH ITS EVIDENCE.** **The graph is REPLACED WHOLESALE PER LOAD, and "per graph generation" is a HOST
lifetime — the ENGINE has no generation concept and no graph-replacement API (`[T]`: a grep of the vendored dist finds
no generation object; the only related text is *"the rebuilt anchor graph"* in `dist/core/translate.js` and *"state
regeneration"* in `dist/core/resolve.d.ts`/`dist/core/types.d.ts`).** **The host's own record is explicit:** layer 1
`docs/specs/foundation-app-data-model.md` `§2.3`'s row for the graph gives its Lifetime as *"**per graph generation** (a
fresh `Supervisor` on every load)"* and its Owner as *"…`loadEnvelope`/`loadDoc` (**which REBUILD it**)"*, and the same
table gives **every** other graph-side structure the same lifetime (`Runtime.nodes`/`rootNode`, `prevStates`,
`domPrevMap`/`ssrPrevMap`, `ssr`, `bootstrapped`, `cssIndex`/`propsIndex`, `payloads`, `envelope`, `warnings` — and the
engine journal, the `requestId` dedup LRU, and the node registry/tombstones). **`docs/specs/runtime-host.md` `§3.1`
states the act in two sentences:** *"**Replaces the current graph**: tears down the existing content …, then
`translateLegacy(envelope)` → register → compile → `recordResolved` → render"* and *"**a fresh `Supervisor` is built on
every load**"*; `§3.2` gives the `loadDoc` route; `§3.7` records that the id index is *"rebuilt on every load/teardown"*.
**And the code says the same `[H]`:** `src/renderer/runtime.ts:loadEnvelope` calls **`this.tearDownGraph()`**, then
`structuredClone` → `translateLegacy` → **a NEW `Supervisor`** → per-node `registerNode` → `rebuildIdIndex` → `render`;
`:loadDoc` runs the same shape over `loadState(doc)` → `new Node(seed, createLinkHub())` → `reconcileParentTargets` →
register → compile → render; `:tearDownGraph` destroys the in-tree nodes and drops the payloads but **never calls
`Supervisor.dispose()`** — the retention fact `docs/specs/foundation-app-data-model-retention.md` `RH-1` records in
those words (*"Every `Supervisor` the host ever builds except the live one is pinned by the engine's module-level
`finalizeHooks` array, because this host never calls `Supervisor.dispose()`"*), with `RH-5` adding that the discarded
generation's ROOT is never released and layer 1 `§2.3` giving `cssIndex`/`propsIndex` the *"per graph generation"*
stamp. **So a store whose links ARE engine links loses every resolution on every load** — and the held contract's own
pinned subscription scope anticipates exactly this hazard from the other side: *"a graph re-derivation does NOT create,
destroy or duplicate a store subscription — the SAME subscription still observes the SAME reference, and the count after
`N` generations stays `1`"* (`§2.11` item 5; `§3.4` `R-16`; `§3.3` `I-15`; register row `P-SC-IM-9`), while the plan's
`RH-2` names the ELEMENT-side half of the same event (*"on a post-boot re-derivation the wiring must RE-RESOLVE its
elements … and RE-INSTALL the session's and the affordance's listeners on the NEW elements"*).
- **FALSIFIER:** a row that resolves `file.window.tabs.landingPage`, then performs a `loadEnvelope` (or `loadDoc`), then
  resolves again — **the second resolution must need NO rebuild and must answer identically; if it needs one, or answers
  differently without a declared write in between, the store's graph is riding the engine's and the row FAILS.**
- **OWNER:** the architect (§10 `Q-2`). **REVISIT CONDITION:** the ruling on whether the store's graph is its own
  structure or the engine's. **If the store's graph IS its own, the risk is closed by construction and the row above
  becomes the regression that keeps it closed.**

### RISK 2 — A CACHE-REBUILD RULE THAT CAN RESURRECT A CLEARED VALUE

**THE RISK.** **The directive requires a *"valid cache"* and a *"rebuilding a stale one"*, and a rebuild is a
re-derivation from the graph — so a rebuild can read a node whose logical-path twin was CLEARED by a landed rule that
does not delete the node.** **The concrete case:** `commit('file.P', v)` clears the SAME LOGICAL PATH in every
lower-durability tier (`§2.10` item 1(a)) — **and under the amendment a cleared `mem.P` node may still be REACHABLE
(tier and reachability are different relations), so a stale cache entry for it is rebuilt and the read answers a value the
commit cleared.** **The held rule the rebuild would silently override is strong:** the first-hit rule *"keeps an in-flight
`temp` value authoritative over a committed `file` one"*, and the plan's own `remove` falsifier is *"`set('mem.x', v)`
then `remove('file.x')` — a subsequent `read('x')` must MISS, not answer the `mem` copy"* (`R3-6`; held `§2.10` item 3(c)).
- **FALSIFIER:** with `mem.P` and `temp.P` resident and a live cache entry on each, `commit('file.P', v)` — **then a read
  of `P` must MISS (`cleared` at both lower tiers, `§3.2` `F-3`'s posture), and a rebuilt cache entry that answers the
  cleared value FAILS.**
- **OWNER:** the architect (§10 `Q-4`, the cache's validity rule). **REVISIT CONDITION:** the ruling on what makes an
  entry stale and who invalidates it — **and the ruling MUST name the clear rule as an invalidator, or this falsifier
  fails on the next pass.**

### RISK 3 — A TOP-LEVEL REGISTER THAT CANNOT EXPRESS A PER-NODE PROHIBITION

**THE RISK.** **The held model's `reserved:true` is a PER-REFERENCE refusal, and a landed round-3 ruling depends on it**
— `remove('file.tabs.landing')` REFUSED **by name** while `remove('file.tabs.t7.target')` succeeds
(`§2.6` item 2; `§2.6` item 5 row 3; `§3.2` `F-14`; decision row `NEXT-SURVIVING-…` clause (2); `§0` ruling 13).
**A top-level-only register cannot express it: both calls name the same top-level item `tabs`.** **So the prohibition
must live on an ANCHOR or a LINK — and the register, by the directive's own design, does not carry it.**
- **FALSIFIER:** the ruling's own two-call control, driven unchanged — the reserved entry's own removal REFUSED with
  `'reserved-name'`, a sibling instance's removal SUCCEEDING. **A body that refuses BOTH, or neither, FAILS.
  A register-only implementation cannot pass it, which is the finding.**
- **OWNER:** the architect (§10 `Q-7`). **REVISIT CONDITION:** the ruling on whether `reserved` and the per-leaf patterns
  re-home on the anchor/link — **a positive condition, because the re-homing is cheap and the loss without it is a
  landed ruling.**

### RISK 4 — RECLAIM DELETING A VALUE A LIVE SUBSCRIBER STILL OBSERVES

**THE RISK, with its three sub-cases (§3(c)(ii)).** **A store subscription is *"PER REALM, PER REFERENCE … for as long
as the realm lives"*** (`§2.11` item 5; register row `P-SC-IM-9`). **A reclaim that removes a node without releasing its
subscriptions leaves a live listener on a reference the graph no longer contains; a reclaim that releases them without
reporting the release is the silent second write the `'repair'` arm's own reason forbids; and a reclaim that reports the
release needs an eighth `cause` token, re-opening a union the contract closed.**
- **FALSIFIER:** subscribe on `temp.tabs.landingPage.placement`; sever the parent chain; **the subscriber must receive
  exactly ONE declared event and its count must go to `0` — neither an unanswered delivery nor a silent disappearance
  passes**, and the receipt of the severing operation must name the released reference.
- **OWNER:** the architect (§10 `Q-8`, eager vs deferred reclaim). **REVISIT CONDITION:** the ruling on reclaim's timing —
  **and the release-reporting clause is not optional under any timing, because it is `§2.11` item 2's own rule.**

### RISK 5 — A TRAVERSAL WHOSE COST IS PROPORTIONAL TO DEPTH ON A PER-MOVE PATH

**THE RISK, sized honestly.** **The held read is at most three exact lookups** (`§2.5` item 2); **the walk is
`O(depth)`**, and the drag's writes are **once per observed move** on a path the plan itself prices as hot: *"a `temp`
reference written once per observed move, with N subscribers, produces N listener invocations per move"* (the plan's
`§7.3` `NW-3`), which is why the held contract caps the amplifier form at `CAP-3`'s `64` **and** bounds the tier-3 entries
at `CAP-2`'s `4096` (`§2.9`). **The amendment replaces both counts with reachability — so the thing that bounds the hot
path becomes a bound on TRAVERSALS, and the directive does not name one.**
- **FALSIFIER:** a per-move-resolution row counting the nodes the walk visits for a `temp.drag.<gestureId>.placement`
  write, against the held read's visit count on the same name — **a visit count proportional to depth, with no declared
  traversal bound and no cache hit, FAILS; and under the amendment the honest admissible form is *"a resolution whose
  cache entry is valid visits `O(1)`"*, which is a claim the cache's validity rule must then support.** **`[T]`-only:
  no timing figure is claimed anywhere in this file (`RCA-12`; layer 1 `§4`/the record's `§10` `R9`).**
- **OWNER:** the architect (§10 `Q-4` again — the validity rule IS the bound). **REVISIT CONDITION:** the ruling on
  staleness, plus a declared traversal bound if the cache cannot be made to answer in `O(1)` on this path.

### RISK 6 — THE TIER HELD TWICE: THE FLAG AND THE NAME CAN DISAGREE, AND A SILENT PICK IS THE SECOND-AUTHORITY CLASS

**THE RISK.** **The directive's example spells `file` into the name and reports `type='temp'` on the node (§2.2 item 4;
§2.3 `S7`).** **The held model's second-authority rows are explicit** — `§2.2` `P-13` (*"No second authority over any
value a landed row owns … A store that derived, defaulted or re-keyed a value it was given FAILS `R-10`"*) and `§3.3`
`I-12`. **A store that resolves the disagreement by a private preference — preferring the name, say, because a qualified
read is easier — has derived a value it was given.** **AND THE DURABILITY LIE IS THE SHARPER HALF:** *"`read('file.…')`
answering a `temp`-flagged node"* tells a caller its value is persisted when it is not, which is precisely the
class a store's tier vocabulary exists to prevent.
- **FALSIFIER:** `read('file.window.tabs.landingPage')` where the resolved node's `type` is `'temp'` — **the contract must
  declare ONE outcome (the recommended: `REFUSE('tier-contradiction')`), and a body that answers the `temp` value as if
  it were `file`'s FAILS; the positive control is the flagged-agreeing name answering normally.**
- **OWNER:** the architect (§10 `Q-6`). **REVISIT CONDITION:** the ruling on which of the name and the flag is
  authoritative — **and the ruling must state the flag's own declaration site, because a flag nobody declares is a
  default, and `§2.2` `P-2` closes invented defaults.**

**AND TWO CLAUSES CARRIED RATHER THAN PRICED, each with its owner and its positive revisit condition (no bare `OWED` in
this file):**

1. **`node_modules/provident-ssr/**`'s type surface and README — READ `[T]` THIS PASS, BY A DELEGATED READ-ONLY EVIDENCE
   PASS, AND LABELLED AS SUCH.** **What was read there and is cited above, as `[T]` and never as a landed row of this
   repo:** `dist/core/types.d.ts`'s `Anchor`/`Role`/`AnchorTarget`/`AnchorOptions`/`Link`/`LinkConfig`/
   `LinkConfigErrorCode`/`NodeState` shapes; `dist/core/link.d.ts`'s `Link` class and its three `DEFAULT_*` configs;
   `dist/core/node.d.ts`'s `hubFor`/`LinkConfigNameHub`; `dist/core/supervisor.d.ts`'s member list (including
   `dispose()`, *"Idempotent; a disposed Supervisor is inert"*); `dist/core/translate.js`'s *"the rebuilt anchor graph"*;
   and the README's own statement of the resolved state (*"a flat list of `CompiledState` — one per node **and one per
   placement path-state**"*) and of its authority boundary — *"The in-repo specs under `docs/specs/*.md` are the full
   behavior contract; `docs/specs/contract.md` owns the exact public surface, `docs/specs/render.md` owns the op
   vocabulary and wire model, `docs/specs/translate.md` owns the envelope surface."* **The package ships no `docs/`
   (`"files": ["dist"]`), and those three contract files exist in NEITHER tree — so the `[T]` type surface is the whole
   of what is reachable.** **OWNER: the architect or a shell-capable pass; POSITIVE REVISIT CONDITION: the first pass
   that must state whether the engine's link object is addressable by a caller key, or whether a translate-minted
   anchor/link instance is RE-DERIVED or REUSED on a second load — the one question the `[T]` surface does not answer,
   and the one RISK 1's falsifier turns on.**
2. **The engine's per-load graph replacement is `[H]`-read, not `[U]`/APP-observed.** **`src/renderer/runtime.ts`'s
   `tearDownGraph`/`loadEnvelope`/`loadDoc` sequence is read at its own symbols; nothing in this file claims an
   OBSERVED load cycle.** **OWNER: any unit whose scenario needs it (a `[U]` row on a real boot);
   REVISIT CONDITION: the first `[U]` battery that loads an envelope twice and reads a resolved element after each.**

---

## §10. THE OPEN ARCHITECT QUESTIONS

**Ten questions, each with its options, its costs and a recommendation.** **NOT ONE IS DECIDED — and `Q-1`…`Q-5` are the
five the task requires at minimum, with `Q-6`…`Q-10` added because the model forces them.**

| # | The question | The options, and what each costs | RECOMMENDATION |
| --- | --- | --- | --- |
| **Q-1** | **DOES THE RESOLUTION VOCABULARY SUPERSEDE THE NO-ENGINE-ID RULE?** | **(1) supersede `R-5`'s second half only, with store-minted ids and the import census intact** — cost: two rows re-read, the `F-5` third-holder finding re-classified, one new `docs/decisions.md` row. **(2) keep `R-5` whole and make the walk return a non-id handle** — cost: the directive's own example must be re-spelled, and the analogy weakens. **(3) rename the vocabulary** — cost: nothing is fixed and the collision is renamed rather than confronted (refused on the merits) | **(1)** — §3(a)'s recommended resolution, with the `F-5` re-classification MADE rather than asserted |
| **Q-2** | **DOES THE STORE'S GRAPH SURVIVE A RE-DERIVATION, OR IS IT REBUILT?** | **(1) the store's OWN graph, independent of the engine's per-load teardown** — cost: the *"similar to the provident architecture"* is a STRUCTURAL analogy, not a shared object, and a reader expecting one graph will be corrected. **(2) the engine's graph** — cost: every load invalidates every resolution (RISK 1), the store imports `provident-ssr` (reddening `§2.2` `P-9` / `§3.4` `R-11` / `§3.3` `I-1`), and `src/shared/**` or the vendored tree becomes fork-visible (§8 item 2). **(3) a hybrid: the store's own graph, with the engine's `data-node-id` used as a declared KEY on the store's own nodes** — cost: it re-opens `R-5`'s first half and re-creates the third-holder question | **(1)** — it is the only option that closes RISK 1 by construction AND keeps §8's fork section short |
| **Q-3** | **IS RECLAIM EAGER OR DEFERRED TO A COMMIT?** | **(1) persist-first for `file`-flagged nodes (§3(c)(i) item 2: the durable accept orders the reclaim, so a crash loses a WRITE, never a DELETE), eager-with-a-declared-event for `mem`/`temp`** — cost: two timings with two receipt shapes, and a `mem` reclaim is not crash-safe (acceptable: `mem` is realm-scoped by construction, the plan's `§2.5`). **(2) deferred to the next commit for every tier** — cost: unreachable nodes accumulate within a realm, which is the leak class the collector exists to answer. **(3) eager everywhere plus a persisted TOMBSTONE** — cost: a new persisted structure with its own reconciliation rule, buying crash-safety for the durable tier | **(1)** — with the tombstone named as the escalation path if the architect wants the crash window closed for `file` as well |
| **Q-4** | **WHAT MAKES A CACHE ENTRY STALE, AND WHO REBUILDS IT?** | **(1) a per-link VERSION TOKEN bumped by every write/clear/reclaim that touches the link's subtree, with the rebuild inside the reading operation** — cost: a version field on every link, and the invalidator set must be EXHAUSTIVE or RISK 2 fails. **(2) no cache: every resolution walks** — cost: it deletes the directive's own *"valid cache / rebuilding a stale one"* clause, and it makes RISK 5's cost unconditional. **(3) a write-through cache invalidated only by the store's own mutators** — cost: sound for the store's own writes and UNSOUND for a `main`-side change arriving by the `Y-3` push (the plan's `§2.5`), which the held model already declares a no-op on today's single-window app | **(1)**, with the invalidator set named in the contract — **and the clear rule (`C-1`…`C-5`) named as an invalidator, or RISK 2's falsifier fails** |
| **Q-5** | **IS THE MULTI-LEVEL EXPORT A SNAPSHOT OR A LIVE HANDLE?** | **(1) a SNAPSHOT: a fresh object per call, NON-AUTHORITATIVE, no tier behind it** — cost: an export is recomputed per call (the depth cost again), and a caller that mutates it changes nothing (which is a feature). **(2) a LIVE HANDLE into the cache** — cost: a new mutability surface, an aliasing hazard between the export and the store's own value, and the held model nowhere grants one. **(3) the caller's option** | **(1)** — it reuses the status the held model already declares for the one composite it produces (held `§2.5` item 5: *"NON-AUTHORITATIVE — no tier holds it, it is recomputed on every read"*; the gate-1 record's `§10` `R3` risk), so it is the only option whose authority question is already ruled |
| **Q-6** | **WHEN THE FLAG AND THE NAME'S TIER SEGMENT DISAGREE, WHICH WINS?** | **(1) the FLAG is authoritative and the disagreement is a TYPED REFUSAL (`'tier-contradiction'`)** — cost: one new token and the register must declare the expected flag (or the flag is a default, closed by `§2.2` `P-2`). **(2) the NAME is authoritative and the walk seeks an agreeing sibling** — cost: it re-derives the held first-hit rule's shadowing semantics inside a graph, which is the mechanism `R3` supersedes. **(3) the answer silently reports the node's own flag** — cost: the durability lie RISK 6 names | **(1)** — it keeps the tier vocabulary honest, which is the vocabulary's whole job |
| **Q-7** | **DO `reserved` AND THE PER-LEAF PATTERNS RE-HOME ON THE ANCHOR/LINK, OR ARE THEY DROPPED?** | **(1) RE-HOME: a link or an anchor carries `reserved` and a per-leaf pattern is declared on the anchor that owns the matched set** — cost: the register's *"top-level only"* claim needs a footnote (the directive's own clause is about the COUNT, not about where a prohibition lives). **(2) DROP them** — cost: the landed `R3-2` ruling's two-call control becomes unsatisfiable (RISK 3), which is a landed-ruling regression, not a simplification. **(3) keep a small per-reference exception table beside the register** — cost: the register stops being the single declaration surface, and the held `§2.6` item 1's one-home rule is strained | **(1)** — RISK 3's falsifier passes under (1) alone |
| **Q-8** | **WHAT DOES A SEVERANCE EMIT, AND IS ITS RELEASE REPORTED?** | **(1) a new `cause` token (`'severed'`, PROPOSED), per released reference, with the released reference named in the severing operation's receipt** — cost: the closed union re-opens (`§2.6` item 3's closure is a spec decision, so this is lawful but not free), and the register gains a row. **(2) report severance through the existing `'remove'` arm** — cost: a reclaim is then indistinguishable from a caller-requested removal, and `§2.11` item 2's `'remove'` arm's own sentence (*"a `remove` is distinguishable from a `commit`-with-clears BY ITS `cause` TOKEN"*) becomes false by extension. **(3) no event** — cost: the silent second write the `'repair'` arm forbids | **(1)** — and the per-affected-reference count row (`R-16`/`I-14`/`P-SC-IM-7`) must be re-derived with it, not relaxed |
| **Q-9** | **WHAT IS `cache` IN THE READ'S ANSWER, NOW THAT THE TIER HANDLES MAY NOT BE TABLES?** | **(1) the per-tier COLLECTION's own handle, preserving the held `M-2` `toBe`-identity rule** — cost: the collections must be addressable objects, and `§2.2` `P-5` (`cache` never crosses a boundary) still binds. **(2) the resolution-cache entry** — cost: it changes what `M-2` means (the answer would carry a derived structure rather than a holder), and it makes the answer's identity a cache artefact. **(3) `null` on every amended arm** — cost: the held `M-2` row loses its subject, and a caller loses the ability the held model explicitly grants | **(1)** — it keeps `M-2` and `P-5` intact, and §2.4 row 2's reading makes the collections real objects anyway |
| **Q-10** | **IS THE HELD `docs/specs/store-core.md` AMENDED OR RE-FILED?** | **(a) RE-FILE (a new spec gate; the held file marked HELD PENDING THIS PROPOSAL, then SUPERSEDED BESIDE with a pointer)** — cost: a fresh spec gate, register and first red set, **which is also what the *"no second CORE pass"* ruling requires**. **(b) AMEND IN PLACE + re-grain eight register rows** — cost: cheaper to file, and it strains the same ruling while making `RCA-8(a)`'s one-unit-one-commit discipline harder. **(c) a new unit id** — cost: `RCA-8(f)` admits rows, not a pass, so only the architect may write it | **(a)** — §7.2's recommended answer, with the dossier cited rather than replaced (its adopted rows survive; three of its `defined` statuses and its collision block are amended by the successor's own spec-gate pass) |

---

## §11. PROVENANCE

**WHAT THIS PASS READ (all read-only), named so a reviewer can re-take it:**

- **The held contract and its gate-1 apparatus:** `docs/specs/store-core.md` (its `CURRENT STATE` block, `§0`, `§0A`,
  the Layer declaration, `§1`, `§2.2`–`§2.12`, `§3.1`–`§3.5`, `§5.5.1`, `§7a`/`§7a.1`, `§8`, `§3a`/`§3b`);
  `docs/specs/store-core-adoption-dossier.md` in full; `docs/specs/data-ownership-model-review.md` in full.
- **The plan:** `docs/specs/data-ownership-model-plan.md`'s `§1.3`, `§1.9` (i)–(v) with their round-3 blocks,
  `§2.5`, `§5.2.7`, `§6.5`, `§7.3`, `§8.2`, `§9.1` (the decided ledger, `OPEN-1`), and the heading sets of `§1.1`–`§9.1`.
- **The provident vocabulary this file's §2 rests on:** `docs/specs/runtime-host.md` (`§3.1`, `§3.2`, `§3.7`);
  `docs/specs/secure-panels.md` `§2`; `docs/specs/battery-hooks-unit.md` (its `H1` row);
  `docs/specs/e2e-test-battery.md` (its `createLinkHub`/REQ-GAP-9 rows); `docs/specs/foundation-app-data-model.md`
  (`§2.3`, `§4.3` items 2/3, `§7` `F-5`); `docs/specs/foundation-app-data-model-retention.md` (its `cssIndex` row and
  `RH-1`/`RH-5`); `docs/specs/mount-invariant-guard.md` `§1` item 1 and `§3.1` `M-14` (cited for the re-derivation
  invariant and the placement-routed count, **not** for anchor/link structure, which it does not contain);
  `docs/specs/mcp-endpoint.md` `§1` and `§3.5` (the graph-canon pin and the resolved-state reading);
  `docs/specs/projection.md` `§2.1` (its closed-union wording only); `docs/specs/engine-pin.md` and
  `docs/specs/engine-drift.md` at their headings, Layer declarations, `§5.5` and `§3.3.2` (**they pin no
  node/anchor/link structure — only counts and id-set behaviours**); `src/renderer/runtime.ts` at
  `:elementForNodeId`, `:loadEnvelope`, `:loadDoc`, `:tearDownGraph`, `:resetRenderState`, `:projectedState`,
  `:resolveTarget`, `:isPlacementRouted`, `:applyCommand`, `:rebuildIdIndex`, `:census`;
  `src/shared/demo-envelope.ts:demoEnvelope`.
- **The vendored package's TYPE SURFACE, read `[T]` and labelled as such throughout** (by a delegated read-only evidence
  pass in this same draft pass; the package is an external, unadopted surface and **no `[T]` statement in this file is a
  landed row of this repo**): `package.json` (version `0.5.1`; `"files": ["dist"]`), `dist/index.d.ts`,
  `dist/core/types.d.ts` (`Anchor`/`Role`/`AnchorTarget`/`AnchorOptions`/`Link`/`LinkConfig`/`LinkConfigErrorCode`/
  `NodeState`), `dist/core/link.d.ts`, `dist/core/node.d.ts`, `dist/core/supervisor.d.ts`, `dist/core/translate.js`, and
  `README.md`.
- **The landed prohibitions and rulings:** `docs/decisions.md`'s four data-ownership rows **by row name**
  (`FOUNDATION-STORE-FACILITY-IS-OPENED-AND-SUPERSEDES-NO-FOUNDATION-CONFIG-FILE-FACILITY`,
  `FOUR-TIER-DATA-OWNERSHIP-MODEL`, `QUALIFIED-READ-MERGED-READ-SUBTREE-EVENTS-AND-THE-PURITY-CRITERION`,
  `NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-PER-REFERENCE-CLEAR-EVENTS-DOWNWARD-REMOVAL-THE-REFERENCE-SET-CROSSING-AND-THE-CRITERION-AS-A-PLACEMENT-RULE`),
  its superseded `NO-FOUNDATION-CONFIG-FILE-FACILITY` row and its dated marker, and by row name
  `E10-SINGLE-SINK-CHANNEL` · `GSESSION-DELEGATE-SURFACE-IS-FROZEN-FOR-E3-E4` ·
  `PBT-REGISTER-REQUIRED-FOR-CODE-UNITS` · `AUTONOMY AFTER SPEC APPROVAL`; `docs/specs/zones.md` `§2.2` `P-1`/`P-3`/`P-4`;
  `docs/specs/census.md` `§2.2` `P-1` (with its `ADV-CN-5` amendment) and `P-3` (with `ADV-CN-4`) and `§3a` `A-19`;
  `docs/specs/container.md` `§2.2` `P-CT-1`/`P-CT-13`; `docs/specs/gutter.md` `§2.2` `P-9`/`P-10` and `§4.4` `S-PURE-4`;
  `docs/specs/provident-electron-shell-chrome-handoff-review.md`'s `## Design decisions (amended 2026-09-27 by
  A-d1/A-d2/A-d3)` section (`S-d8`'s six prohibitions, `S-d11`'s geometry clause, `H-r14`);
  `docs/specs/user-flow-audit.md`'s sections 2/3/4 (the gate's `§7.1`/`§6.1`/`§6.2`).

**WHAT THIS PASS DID NOT READ, and therefore does not claim:** **`docs/specs/projection.md`, `docs/specs/listhost.md`,
`docs/specs/census.md` and `docs/specs/mount-invariant-guard.md` were NOT read for engine graph vocabulary — and a
read-only evidence pass that checked them reports the reason is that THEY DO NOT CONTAIN ANY:** they are units about
other mechanisms (`layout-projection`, `owned-list-host`, `computeTrackVars`, the mount guard), `census.md` has **no
resolved-state reading** (`A-19` is a `§3a` adversarial seed about zone/track tokens, ruled at `§3b.1`), and
`mount-invariant-guard.md` names no anchor or link. **Only `projection.md` `§2.1` is cited in this file, for its closed
union's own wording about a union that may grow by ruling but must not misreport.** **ALSO NOT READ:** **the vendored
package's JS internals beyond the type/README surface listed above** (so a translate-minted anchor/link instance's
lifetime across two loads is `UNVERIFIABLE — CARRIED`, §9's carried clause 1); **`../Preempt-Providence/**` and the
fork's tree**; **`tests/**`**; **`docs/specs/gutter-ui.md` `§5.U`'s landed matrix** (cited only as the `§5.U` home per a
read-only evidence pass's report, and **not re-derived here**); **`docs/HANDOFF.md`**, **`docs/defects.md`**,
**`docs/guide/**`**, **`docs/skills/**`**; **`archive/**`**; **`docs/specs/slothost.md`'s own rows** (cited only through
the gate-1 record that reports them); the family specs' `P-*`/`P-CT-*` rows beyond those named above; and the remaining
rows of the held contract's `§2.1` export block, which this file cites only as a census.

**EVERY FIGURE THIS FILE QUOTES IS LABELLED, AND ITS SOURCE IS NAMED.** **The counts it carries are: the held union's
`8` tokens (`store-core.md` `§2.6` item 3) · the held grammar's `4` tier tokens (`§2.3` item 1) · the held register's
`20` typed rows and `400` declared attempts (`§5.5.1`, `§5.5.3`, and the `CURRENT STATE` block's item 3) · the held caps
`1024`/`4096`/`64` (`§2.9`) · the held static rows `R-1`…`R-16` (`§3.4`) · the held seven `cause` tokens (`§2.11`
item 2) · `§6`'s `17`-row classification `8 + 5 + 3 + 1` · `§6.1`'s `10` unimplementable rows and its register arithmetic
`2 + 6 + 12 = 20` · the record's `4` conditions on `U-STORE-CORE` and its `13` rows `C-1`…`C-13` · the plan's `15 = 2 + 6 + 7`
byte/purity identity (`§5.2.7`'s round-3 block) · the record's `21 DONE / 3 open` UNITS = `24` ledger reading · and the
engine evidence's `3` per-graph facts (a node's `anchors` array, a per-graph link hub, a per-load graph teardown).
**A figure this file does NOT carry, and will not: any test count, any leg result, any timing, any byte length, any
line count of any file, and any register attempt total of its own — because it ran nothing.**

**AND THE PLAIN STATEMENT THE TASK REQUIRES, in one sentence:** **this pass ran NO suite, NO leg, NO `tsc`, NO
`typecheck:tests`, NO build, NO Electron boot, NO `npm run ui`, NO `divergence` leg, NO live scenario, NO register
execution, NO MCP session and NO `git` command of any kind — and it wrote exactly one file and edited none.**

**END OF THE PROPOSAL.** **One new file; `17`-row classification (`8` SURVIVES · `5` REPLACED · `3` SUPERSEDED · `1` NEW);
`10` held rows named as unimplementable; a `20`-row register arithmetic `2 + 6 + 12`; three collisions confronted with
resolutions costed and none chosen; ten architect questions with options, costs and recommendations; **six** named risks
with falsifiers; two clauses carried with owners; and no decision taken.**
