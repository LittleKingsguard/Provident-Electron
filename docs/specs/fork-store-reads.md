# SPEC — `U-FORK-STORE-READS` (ledger row `H3`): **the graph-carrier rule for store-addressed MCP reads, the conforming shape a fork consumes, and the migration contract**

**STATUS LINE — ONE UNIT, ONE CONCERN, READ THIS FIRST:**

> **`docs/specs/fork-store-reads.md` — `U-FORK-STORE-READS` (`H3`) — FOUNDATION-SIDE RULE + SHAPE SPEC, FILED 2026-10-03. THE UNIT IS DOC/RULE-BEARING IN THIS REPO: it authors NO `src/**` byte, NO test, NO ledger move and NO tracker edit, and it OWES the fork a `docs/FORKER.md` §4 handoff note — **⟶ `§0.1` ITEM 8: THAT NOTE LANDED 2026-10-03 (gate-8 reconciliation of finding `D-3`); the only `OWED` half now is the FORK's own `src/main/**` re-route (item 9).** THE FORK'S OWN `src/main/**` BYTES ARE THE FORK'S PASS (`H-r6`; this repo writes NO file under `<Astrographer>/`) AND ARE RECORDED `OWED`. THE TYPED PROPERTY REGISTER AT `§5.5` IS A DECLARED, JUSTIFIED ZERO-ROW EXEMPTION under `AGENTS.md` item 11(g).**

**The authority chain this file derives from, cited by §/row id (this file is DERIVATIVE — no clause of it is a new ruling):**

| # | Authority | What it is, and what this file takes from it |
| --- | --- | --- |
| **A-1** | `docs/decisions.md` — ACTIVE row **`H3` (`U-FORK-STORE-READS`) IS A RE-ROUTE, NOT AN EXEMPTION** (2026-10-03) | **THE UNIT'S OWN AUTHORITY, read in full.** The architect's ruling, verbatim in substance: *"Re-route for H3"*. **THE RE-ROUTE ARM IS TAKEN AND THE EXEMPTION ARM IS NOT.** Clause (1): `P-16` stands unqualified — no exemption row is created, no `P-16` carve-out exists, and **a later pass may NOT cite this ruling as license for a direct agent→store read**. Clause (2): the fork's store-addressed MCP reads MUST be re-routed through the app Runtime / graph carrier. Clause (3): the unit's landing is the FOUNDATION-side half — this file states the graph-carrier rule, the conforming shape the fork consumes, and the migration/coexistence steps a conforming fork follows; the fork's own `src/main/**` bytes are the fork's pass under `H-r6`. |
| **A-2** | `docs/specs/mcp-endpoint.md` **§6.4** | The store's communication policies as this repo states them (the site the `H3` row and `docs/pending.md` §Q both cite for `P-16`). **`P-16` (verbatim, as quoted at `docs/pending.md` §Q's `multi-document-store-config` cell): *"MCP endpoints read only the app Runtime; a store value is MCP-visible iff a graph node carries it; the store is never agent-addressable."*** The surrounding §6 rows this re-route must respect: **§6.1** (the threat model), **§6.2** (the tool groups — `read`/`dispatch` ON, `graph`/`code`/`module` OFF by a human's manual grant), **§6.3** (the loopback bearer token), **§6.5** (the `A1..A6` host-side hardening). **⚠ THE `P-1`…`P-36` POLICY ROW IDS ARE NOT IN THIS REPO'S TREE (see `§7.1` `AMB-1`): `P-16` is cited at `mcp-endpoint.md` §6.4 and is quoted verbatim at `docs/pending.md` §Q; no file in this checkout carries the numbered policy table itself, so every `P-n` citation in this file is a citation of the QUOTED SUBSTANCE at the site named in the same sentence, never of a table row this file read.** |
| **A-3** | `docs/specs/data-ownership-model-plan.md` **§2.3** | **The boundary fact, verbatim: *"A STORE VALUE IS MCP-VISIBLE IF AND ONLY IF A GRAPH NODE CARRIES IT."*** §2.3's own four consequences, which this file carries forward as binding: a store is **never a new MCP surface** (no tool, no resource, no tool-group, no `VALID_GROUPS` member, no `RpcMethod` member, no `MUTATING_METHODS` entry, no IPC method); `temp`/`mem` are invisible unless mirrored; `secure` must stay invisible above all; **the parity rule between transports (`mcp-endpoint.md` `P-E3`) is untouched** and **the store must not be reachable on one transport only**. |
| **A-4** | `docs/specs/data-ownership-model-plan.md` **§2.5** | **The realm table (who owns what per tier) — the graph-as-carrier relation's own ground.** `file` (tier 1): **the RENDERER OWNS THE VALUES; `main` OWNS THE FILE AND THE CHANNEL** (role-based, not value-based: *"the renderer decides, `main` persists"*). `mem` (tier 2): **the renderer realm.** `temp` (tier 3): **the renderer realm.** `secure` (tier 4): **`main` ONLY, unchanged.** Plus §2.5's crossings `Y-1` (the boot hand-off, renderer→main→renderer, once per realm at boot, **before the first graph load**), `Y-2` (the commit channel, a VALUE in / a RECEIPT out, **once per commit, never per read**), `Y-3` (the change push, **a declared NO-OP on today's single-window app**). |
| **A-5** | `docs/pending.md` **§Q** — the `multi-document-store-config` cells (2026-10-03) | **The FINDING.** The slice makes non-default-store RAG content **agent-addressable through MCP tools that read store state DIRECTLY** (`rag.query {store:'X'}`, store-addressed `rag.get_document`, `edit.*` with the `store` selector) — **never through the app Runtime / graph-carried values** — contradicting `P-16`. **The PENDING-REBUILD mark and its revisit condition**, which `H3`'s ruling has now taken the RE-ROUTE arm of. **The recorded PARTIAL lanes**, all dating to the fork's 2026-09-05 pre-policy architecture: `P-1`'s `<name>:` id-prefix-in-stored-name · `P-2`'s main-process store placement (vs the later renderer-realm tiers) · `P-10`'s reversed authority direction (`RAG-AUTHORITATIVE` — graph derived FROM the store, superseded 2026-09-21 by `ENGINE-AUTHORITATIVE-DOCUMENT-CRUD`) · `P-15`'s optional `store` argument + two preload additions (no new tool/group/`RpcMethod`). **The COMPLIANT rows** (`P-7`, `P-9`, `P-17`, `P-24`, `P-33`, `P-35`/`P-36`). **The two-rule re-read** (rule 1 central storage, rule 2 listener-on-store) which supplies this file's rule-2 half. |
| **A-6** | `docs/FORKER.md` **§4** | The **fork-facing convention block**: the fork-side-return rule this file obeys, verbatim as the sibling blocks state it — *"this repo closes nothing on the fork's tree: the fork's own pass annotates the fork's own row — **this repo writes NO file under `<Astrographer>/`**"* (the `H-r6`/fork-side-return convention; its source of record is `docs/specs/provident-electron-shell-chrome-handoff-review.md` `H-r6`). **§4 is also the CARRIER for the handoff note this unit owes.** |
| **A-7** | `docs/next-steps.md`'s **`H3`** row (wave-`H` queue filing, 2026-10-03) | The unit's queue contract: *"route the store-addressed MCP reads through the app Runtime / graph carrier"*; the spec path (`docs/specs/fork-store-reads.md`, verified free 2026-10-03); the **MUST-cite pair** (`docs/specs/mcp-endpoint.md` §6.4's `P-16` and `docs/specs/data-ownership-model-plan.md` §2.3 — both cited at `§0` above and at `§8` below); the ruling's landing clause. |
| **A-8** | The downstream fork's own record, **READ AS THE SUBJECT, NEVER WRITTEN** | `/media/ryanr/Shared Files/Projects/Astrographer/docs/feature-requests/multi-document-store-config.md` (the feature request, its five asks, its SINGLE-WRITER-STORE and fail-loud constraints) and its implemented surfaces: `src/main/rag-store-registry.ts` (`unit-ms1-store-registry.md`; the PURE registry module + `provident-rag-stores.json`), `src/main/rag-store-directory.ts` (`unit-ms2-store-wiring.md`; `resolveStoreArg` + `buildRagStoreDirectory`), `src/main/mcp-server.ts` (the `rag.*`/`edit.*` handlers with the `store` selector), `src/renderer/sidebar-panes.ts` (`onRagStoreChanged` / `reDerive` / `editController.requestRebuild`). **These bytes are read for SHAPE only. NO clause of this file changes, or authorises a change to, any fork byte.** |

**THE ONE-SENTENCE DELIVERABLE.** For every MCP-visible datum, **there is a graph-carried path**: the store read lands in the renderer/wiring closure, the value is committed into the app graph by the app's own projection, the MCP endpoint reads the graph, and a **store subscription drives the re-derive** so the graph stays current — with the store's `store:'X'` qualifier expressed as **the caller's own spelling carried per-store in the graph**, and **no store vocabulary in the mechanism**.

---

## 0. Scope, boundary and the zero-code posture

### 0.1 What THIS repo lands, and what it does NOT

**THE BOUNDARY, STATED SO IT IS BINDING.** This unit's artifacts live in **THIS** repo. The fork's `src/main/**` bytes are **the fork's own pass**, recorded `OWED` and to be handed off by a `docs/FORKER.md` §4 note (`§6.3`) — **which LANDED 2026-10-03 (`§0.1` row 8; the `OWED` recorded here is the FORK's re-route half, row 9, alone).** **This repo writes NO file under `<Astrographer>/`** (`H-r6`, `A-6`; the same sentence every sibling fork-facing block in `docs/FORKER.md` §4 carries).

| # | What | Lands where | Status |
| --- | --- | --- | --- |
| 1 | **The graph-carrier RULE** and its observable | `§2` of this file | **LANDED by this filing** |
| 2 | **The conforming SHAPE** a fork consumes, naming the seams and their signatures, and declaring the shape of any seam that must be ADDED | `§3` of this file | **LANDED by this filing** |
| 3 | **The multi-store dimension** — how `store:'X'` is carried per-store | `§4` of this file | **LANDED by this filing** |
| 4 | **The migration/coexistence contract** — the ordered steps, the invariant at each, the cutover condition, and what must NOT change | `§5` of this file | **LANDED by this filing** |
| 5 | **The refusal/error posture** | `§6.1` of this file | **LANDED by this filing** |
| 6 | **The prohibitions** (no `P-16` carve-out, no store-surface change here, no fork-tree write, the §Q partial lanes NOT re-ruled) | `§6` of this file | **LANDED by this filing** |
| 7 | **The cross-references and citations** by §/row id | `§8` of this file | **LANDED by this filing** |
| 8 | **A `docs/FORKER.md` §4 handoff note** carrying 1–6 to a fork in this repo's own words | `docs/FORKER.md` §4 | **`OWED` — NOT written by this pass **⟶ LANDED 2026-10-03 (THE GATE-5 BLIND-GREENS PASS'S FINDING `D-3`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `OWED` marker above is KEPT VISIBLE and this clause is the operative reading): THE NOTE IS WRITTEN** — `docs/FORKER.md` §4's block **THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE**, seven clauses (i)–(vii), carrying `§2`'s rule, `§3`'s shape, `§4`'s multi-store expression, `§5`'s migration contract and the `OWED` marker for the fork's own half. **The unit is therefore NOT incomplete on that ground;** what remains OWED is the FORK's own `src/main/**` re-route (`H-r6`).** (`§6.3`); this file is its authority |
| 9 | **The fork's re-route of `rag.query {store:'X'}` · the store-addressed `rag.get_document` · `edit.*`'s `store` selector** | the fork's `src/main/**` (and whichever renderer/wiring files its shape requires) | **`OWED` — the FORK's pass**, under `H-r6` |

### 0.2 The zero-code posture in THIS repo, and why (with its exemption, per `AGENTS.md` item 11(g))

**THE POSTURE, STATED EXPLICITLY AND NOT SILENTLY: THIS UNIT IS DOC/RULE-BEARING IN THIS REPO. NO `src/**` FILE IS ADDED OR EDITED. NO TEST FILE IS AUTHORED. NO LEG IS RUN.** (`AGENTS.md` item 4: *"a docs-only change does not trigger the trio"* — the sibling precedent is `docs/specs/data-ownership-model-plan.md`'s own recorded statement of that rule.)

**WHY NO FOUNDATION-SIDE SEAM LANDS (`§3` carries the determination, this is its reason in one place):** every seam the conforming shape needs **already exists and is landed in this repo's surface** — `provident.dispatch` / `get_rendered_html` / `get_markdown` / `get_node_state` (**`mcp-endpoint.md` §3**'s tool table and that file's **§3.1–§3.5**) read the app Runtime and the graph; the renderer's `editController.requestRebuild` + `reDerive` wiring (**the fork's** `sidebar-panes.ts` `onRagStoreChanged` seam, `A-8`) is the rule-2 listener; the boot hand-off/crossing shape the store needs is `docs/specs/data-ownership-model-plan.md` **§2.5**'s `Y-1`/`Y-2`/`Y-3`. **The re-route is therefore a SHAPE the fork conforms to, not a foundation seam this repo must mint.** **THIS FILE's `§3.5`** enumerates the two seams that are **the fork's own to add** (both on the fork's side of the boundary) and declares their shapes without claiming either as foundation work.

> **A FILE-QUALIFICATION NOTE so no citation here is ambiguous:** where this file writes `§3.1`–`§3.5`, `§3.6`, `§3.7`, `§1.1`, `§1.2`, `§1.7`, `§1.8`, `§2.3`, `§2.5` or `§5.2.7` **without naming a file in the same clause, the target is `docs/specs/mcp-endpoint.md` or `docs/specs/data-ownership-model-plan.md` as the clause's own authority column says** (`§8.1` is the exhaustive map). **This file's OWN sections are always cited as `§N` bare only where the sentence says `this file`/`above`, and its own `§3.x` set is `§3.1` `GCR-SHAPE-5` · `§3.2` the landed seams · `§3.3` the exemption arm · `§3.4` the multi-store pointer · `§3.5` the two fork-side seams.**

**THE ZERO-ROW REGISTER EXEMPTION — DECLARED, JUSTIFIED, AND NOT SILENT (`AGENTS.md` item 11(g)):** item 11(g) makes the zero-row exemption *"an EXPLICIT, RECORDED, JUSTIFIED EXCEPTION — never a silent default"*, surviving *"only for genuinely invariant-free / doc-only / config-only / non-JS units, stated as such in the spec"*, and **not available to a code-bearing unit.** **THIS UNIT IS DOC-ONLY IN THIS REPO** (`§0.2` above: no `src/**` byte, no test, no JS artifact of any kind authored here). **The exemption is therefore AVAILABLE and is TAKEN, and `§5.5` states it as such with its four honest statements.** A pass that later makes this unit code-bearing in this repo **voids the exemption** and owes the typed register before its red set (`§5.5` item 4).

### 0.3 The citation discipline this file follows

**Sections and row ids, never line numbers** (the repo's standing rule; the sibling statement is `docs/specs/projection-greens.md`'s citation policy). **A row id (`H3`, `P-16`, `Y-2`, `H-r6`, `RH-4`, `F-MS5-4`) is cited BY NAME**, because the ledgers that carry them are appended-to and their line anchors drift. **`P-1`…`P-36` are cited as QUOTED SUBSTANCE at a named site** (`§0`'s `A-2` caveat).

---

## 0A. The claim ledger (the closed authority enum and the closed claim-class set)

**EVERY LOAD-BEARING CLAIM IN THIS FILE CARRIES ONE AUTHORITY LABEL FROM THE CLOSED ENUM BELOW, AND ONE CLAIM-CLASS LABEL FROM THE CLOSED SET BELOW. A claim carrying no label is not a claim of this file.**

### 0A.1 The CLOSED FIVE-FORM AUTHORITY ENUM

*(The enum is `Agent Harness` `docs/specs/spec-authoring-discipline.md` §3.3's five-form authority enum, cited by row id; its landed provenance in this repo is recorded at `docs/specs/store-core-graph-compliance-review.md` §1 family (3), which states that the discipline's §3.2 claim-class set and §3.3 authority enum ARE FILED and the duty IS IN FORCE. **The enum's five labels are used here exactly, and no sixth label is invented.**)*

| Label | Means | Where this file's instances live |
| --- | --- | --- |
| **`[RULING]`** | A recorded architect decision row, cited by row name — the authority is the ruling, not this file's reading of it | `§1` (`H3` (`U-FORK-STORE-READS`) IS A RE-ROUTE, NOT AN EXEMPTION), `§6.2` (each prohibition row) |
| **`[SPEC]`** | A landed contract clause of a sibling spec, cited by §/row id | `§2.1` (`P-16`), `§2.2` (plan §2.3/§2.5), **this file's** `§3.2` (`mcp-endpoint.md` §3 tool table + return shapes) |
| **`[READ]`** | A reading this pass took of bytes at a named path, with the path stated | `§3.2` (the `get_rendered_html`/`get_node_state` surfaces), `§3.5` (the fork-side seam shapes), `§4.2` (the fork's `resolveStoreArg` signature) |
| **`[DERIVE]`** | A clause DERIVED from `[RULING]`/`[SPEC]`/`[READ]` inputs, with those inputs named in the same row | **this file's** `§2.3` (the observable), **this file's** `§3.1` (the shape's step decomposition), **this file's** `§5.1` (the invariant per step) |
| **`[DECL]`** | A clause this file DECLARES normatively and for which it names the site at which it becomes checkable — never a measurement | `§3.5` (the two fork-side seams' declared shapes), `§6.3` (the owed handoff note), `§7.1` (the ambiguity record) |

**NO CLAIM OF THIS FILE IS LABELLED WITH AN AUTHORITY OUTSIDE THESE FIVE.** A claim whose only support is *"a later pass will measure it"* is **not** filed here — that would be a `PRED`, and this file's `PRED` count is `0` **because the two places such a claim could have been made are instead `OPEN` carries with owners (`§7.1` `AMB-3` for the fork-bytes evidence, `AMB-4` for the projection-refusal's promulgation).**

### 0A.2 The CLOSED CLAIM-CLASS SET

*(`spec-authoring-discipline.md` §3.2's claim-class set, cited by row id; used exactly, with no sixth class.)*

| Class | Means | Count in this file, printed with its terms |
| --- | --- | --- |
| **`NORM`** | A normative clause: it obliges, forbids or declares a shape | **`34`** = `6` (`§2`) + `9` (`§3`) + `5` (`§4`) + `8` (`§5`) + `6` (`§6`) |
| **`FACT`** | A reading of landed bytes or a quoted landed clause | **`11`** = `4` (`§0`) + `2` (`§2`) + `3` (`§3`) + `1` (`§4`) + `1` (`§5`) |
| **`PRED`** | A prediction about a later pass's behaviour, with its falsifier | **`0`** — **this file makes NO prediction: every clause that would be a prediction is either a `NORM` declaration or an `OWED` carry** (`§7.1` `AMB-3`/`AMB-4`) |
| **`OPEN`** | A named, owned, unresolved item carried rather than decided | **`5`** = `AMB-1` · `AMB-2` · `AMB-3` · `AMB-4` · `AMB-5` (`§7.1`) |

**THE TOTAL, PRINTED WITH ITS TERMS (a total without its terms is a review finding — the sibling rule the repo states as `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`): `34` `NORM` + `11` `FACT` + `0` `PRED` + `5` `OPEN` = `50` claims.** **THE IDENTITY CHECK: `34 + 11 + 0 + 5 = 50` ✓.**

### 0A.3 The SUPERSESSION POINTER EDGE

**A claim that supersedes or re-points a landed clause MUST carry a SUPERSESSION POINTER EDGE, and this file's edges are CLOSED AND ENUMERATED — a supersession whose edge is absent is a review finding.**

| # | This file's clause | The landed clause it points at | The edge's KIND |
| --- | --- | --- | --- |
| **S-1** | `§1`'s ruling clause | `docs/pending.md` §Q's `multi-document-store-config` **REVISIT CONDITION** (*"re-routes … (or the architect rules a recorded exemption)"*) | **ARM-TAKEN** — the RE-ROUTE arm is taken and the EXEMPTION arm is **NOT**; §Q's PENDING-REBUILD cell stays visible and is **not** rewritten by this file (`§6.4` item 4) |
| **S-2** | `§2.1`'s `P-16` restatement | `docs/specs/mcp-endpoint.md` §6.4 / `docs/specs/data-ownership-model-plan.md` §2.3 | **RESTATE-NOTHING-NEW** — the rule is quoted, not amended; **this file creates no policy row and moves no `P-n`** |
| **S-3** | `§3.1`'s conforming shape | `docs/specs/data-ownership-model-plan.md` §5.2.7 rows 6/7/9/10/11/12 (the store-backed module obligations) + its round-3 named-obligation table | **ADJACENT-NOT-OVERRIDING** — those rows stay the modules' own obligations; this file neither lands nor re-grains them (**that is `H2`'s `U-STORE-MODULES`**, `docs/next-steps.md`'s `H2` row) |
| **S-4** | `§3.3`'s **exemption arm is NOT taken** | `docs/pending.md` §Q's *"(or the architect rules a recorded exemption)"* | **ARM-WITHDRAWN** — the exemption arm is closed **by the ruling** (`H3` clause (1)); **no `P-16` carve-out exists and a later pass may NOT cite the ruling as license for a direct agent→store read** |
| **S-5** | `§6.4` item 3's non-re-ruling of the §Q partial lanes | `docs/pending.md` §Q's recorded PARTIAL lanes (`P-1` · `P-2` · `P-10` · `P-15`) | **CARRIED-NOT-RULED** — they *"stay the fork's pre-policy architecture"*; **this unit neither re-rules nor discharges them** |

**FIVE EDGES, ENUMERATED AND COUNTED: `5` ✓.** **NO clause of this file supersedes a landed clause without an edge above, and no edge above is an `AMENDED`/`SUPERSEDED` marker on a cited ruling row** (the discipline the sibling specs state as *"a landed ruling re-opened silently"* is a finding).

---

## 1. The unit, its ruling and its boundary

### 1.1 The ruling, applied and not re-opened (`[RULING]`)

**`H3` (`U-FORK-STORE-READS`) IS A RE-ROUTE, NOT AN EXEMPTION is the unit's authority and this file APPLIES it.** What is settled by the ruling and is therefore **not an open question of this file**:

1. **The store's `P-16` communication policy stands UNQUALIFIED** (`§2.1`).
2. **The fork's store-addressed MCP reads MUST be re-routed** (`§3`, `§5`).
3. **This unit's landing is the FOUNDATION-side half only** (`§0.1`), and **the fork's own `src/main/**` bytes are the fork's pass under `H-r6`**.

**WHAT THE RULING DOES NOT DO, STATED SO NO LATER PASS OVER-READS IT: it does not amend the fork's tool names, its arguments, its registry file or its `F-MS5-4` accepted semantics; it does not move any `P-n`; it does not admit a foundation unit beyond this one; and it does not create any exemption.** (`§5.3` carries what must NOT change; `§6.2` carries the prohibitions.)

### 1.2 One file, one concern

**THIS FILE'S CONCERN IS THE ROUTING RULE AND THE SHAPE — nothing else.** Adjacent concerns are **NOT** this file's and are named so a reader is never left inferring:

| Named non-concern | Its owner |
| --- | --- |
| The store's own contract, its tiers, its register, its constraints | `docs/specs/store-core-graph.md` (+ the frozen-surface artifacts); the ledger's `G1` (`U-STORE-CORE`) |
| The focus state's re-home onto the store | `docs/next-steps.md`'s `H1` (`U-STORE-FOCUS`) → `docs/specs/store-focus.md` (proposed) |
| The remaining store-backed module obligations (`theme`, `overlay`, the two hosts, `menu-template`) | `docs/next-steps.md`'s `H2` (`U-STORE-MODULES`) → `docs/specs/store-modules.md` (proposed) |
| The store's own doc reconciliation (the `§2.7` item 3 repair, the legacy suite's 11 red rows, the summary's annotation) | `docs/next-steps.md`'s `H4` (`U-STORE-DOC-SWEEP`) |
| The fork's new-SURFACE questions (`provident.focus`-class carriers, the pane-drag → zone update flow, the theme token flow) | `docs/pending.md` §Q's other PENDING-REBUILD cells; each is its own unit |
| The fork's own re-route implementation | **the fork** (`§6.3`) |

---

## 2. The graph-carrier rule (operative and testable)

### 2.1 `P-16`, restated as this unit's operative rule (`[SPEC]`)

**`P-16` — QUOTED, NOT AMENDED: *"MCP endpoints read only the app Runtime; a store value is MCP-visible iff a graph node carries it; the store is never agent-addressable."*** (Cited site: `docs/specs/mcp-endpoint.md` §6.4, as quoted at `docs/pending.md` §Q; its independently-stated twin is `docs/specs/data-ownership-model-plan.md` §2.3 — *"A STORE VALUE IS MCP-VISIBLE IF AND ONLY IF A GRAPH NODE CARRIES IT"*.) **THIS FILE CREATES NO POLICY ROW AND MOVES NO `P-n`** (`§0A.3` edge `S-2`).

**THE RULE IN OPERATIVE FORM, ONCE, SO EVERY LATER CLAUSE CAN CITE IT:**

> **`GCR-1` (`[DERIVE]`; from `P-16` + plan §2.3):** **For any datum an MCP endpoint exposes to an agent, the datum's carrier is a GRAPH NODE the app Runtime holds. The endpoint reads the app Runtime — `provident.dispatch` · `provident.get_rendered_html` · `provident.get_markdown` · `provident.get_node_state` · `provident.list_targets` (`mcp-endpoint.md` §3) — or the tool's own graph-carried read. An MCP tool HANDLER (or any main-process function reachable from one) that reads STORE STATE DIRECTLY to answer an agent is a FINDING.**

### 2.2 What "store state" means here, restated from the realm table (`[SPEC]`)

Per `docs/specs/data-ownership-model-plan.md` §2.5 (`§0`'s `A-4`), the tiers and their realms are:

| Tier | Realm (§2.5, REVISED) | Consequence for `GCR-1` |
| --- | --- | --- |
| **`file` (1)** | **the RENDERER owns the values; `main` owns the FILE and the CHANNEL** | A `main`-side read of a tier-1 value is a **DIRECT STORE READ** under `GCR-1` — even though `main` owns the file's bytes, **it does not own the VALUES** (`§2.5`: *"the renderer decides, `main` persists"*) |
| **`mem` (2)** | the renderer realm | A renderer-side read that answers an MCP endpoint **without a graph node carrying the value** is still a `GCR-1` finding; the realm is not the test, the CARRIER is |
| **`temp` (3)** | the renderer realm | **`temp` and `mem` are invisible to MCP unless mirrored into the graph** (§2.3) — a `temp` value that an endpoint reports must have been committed to the graph first |
| **`secure` (4)** | **`main` ONLY**, unchanged | **`secure` must stay invisible above all** (§2.3; `mcp-endpoint.md` §6.4): nothing in this re-route may make the token, the enabled-group set or `maxJournalLength` reachable through `ALL_TOOLS`/`ALL_RESOURCES` |

**THE DECISIVE DISTINCTION, STATED SO IT IS NOT MISREAD: `GCR-1` does NOT forbid `main` from TOUCHING a store, and it does NOT forbid the renderer from READING one.** It forbids **an agent-addressed read whose answer is not carried by a graph node** — the `A-5` finding's own shape (*"agent → store, no graph-carried value, no store listener in the agent path"*).

**⟶ ADDED 2026-10-03 (THE GATE-4 AUDIT'S FINDING `FS-1`, `RED-SET-FIX` — `RCA-8(d)` ANNOTATE-BESIDE: the table and the distinction above stand BYTE-FOR-BYTE as filed, and this clause is the STORE-AXIS CLOSURE the audit measured as missing. The as-filed `§2.2` closed only the TIER axis and left "which STORES count" unstated, so the red set's `ModuleStore` disposition asserted an exemption the contract's own bytes did not grant — that is the defect this clause repairs, and the disposition now cites THIS clause rather than its author's ruling.)**

**"STORE STATE", CLOSED ON BOTH AXES — THE TIER AXIS AND THE STORE AXIS.** `GCR-1`'s subject is **the four-tier data-ownership facility** (`file` · `mem` · `temp` · `secure`, the realm table above) — i.e. **the store this repo's `store-core-graph.ts` implements on the unit's own `U-STORE-CORE` line, together with the tier-authored state it carries**, and the mirrored/carried copies the app graph projects from it. **A DOMAIN-SCOPED REGISTRY IS NOT "STORE STATE" UNDER THIS RULE, AND THE REASON IS STATED, NOT ASSERTED:** this repo carries domain-scoped persisted registries that are **not** data-ownership tiers — `provident-modules.json` (the module registry, reached in `src/main/mcp-server.ts` through `handleModuleTool(store: ModuleStore | null, …)` and its `store.get`/`store.list` calls) and `provident-security.json` (the security store, `src/main/security-store.ts`) — and each is a **privately-gated, domain-specific carrier** with its own gate and its own contract (`AGENTS.md`'s module-gate two-gate predicate; `mcp-endpoint.md`'s group gating; the persistence block's *"domain-specific, NOT a facility"* reading). **They are therefore NOT the facility `GCR-1` is stated over**, and **a read of one of them from its own handler is NOT a `GCR-3` finding.** **THE FALSIFIER — SO THIS CLOSURE CANNOT BE OVER-READ AS A GENERAL LICENCE: if a registry read is extended to carry A TIER'S PAYLOAD (a `file`/`mem`/`temp`/`secure` value, or a value the realm table assigns to one of the four tiers) OR is offered as agent-visible WITHOUT its own gate, the closure does NOT apply and the read IS a `GCR-3` finding.** **The closure is about the STORE AXIS, not a licence on the tier axis — `P-16` remains unqualified and `§2.1`'s rule is unchanged.**

**ITS SCOPE, STATED HONESTLY: this clause closes the rule's SUBJECT; it does not adjudicate the module registry's own security posture.** Whether those two handlers *ought* to read their registry directly is a question for that surface's own gate (`H-r16`'s route for a new gate; `§6.2` prohibition 2 forbids THIS unit changing it) — **and if a later pass contends it, it is ROUTED with an owner, exactly as `§7.1` `AMB-4` is; it is not decided here.**

### 2.3 The observable, per the rule (`[DERIVE]`; inputs `P-16`, plan §2.3/§2.5, `A-5`)

**`GCR-2` — THE OBSERVABLE. For any MCP-visible datum `D`, there is a graph-carried path: a graph node `N` in the app Runtime whose projected content includes `D`, and an endpoint read of `N` (or of the graph the Runtime renders) returns `D`.** Its three checkable halves:

| # | Half | How it is checked WITHOUT this repo owning an instrument | Falsifier |
| --- | --- | --- | --- |
| **1** | **The datum has a graph node.** There is a node — authored, or minted by the app's own projection — whose content carries the value | `provident.list_targets` enumerates the addressable node vocabulary (`mcp-endpoint.md` §3, §3.4); `provident.get_node_state` resolves a node's states (§3.5) | **A value an endpoint returns that `get_node_state` on ANY node cannot name, and that no `get_rendered_html`/`get_markdown` projection contains** |
| **2** | **The endpoint read is a Runtime read.** The tool's implementation reaches the value through the app Runtime / graph surface, never through a store accessor | `mcp-endpoint.md` §3.1–§3.5's declared semantics (target resolution is host-side; the returned HTML is **freshly re-emitted** — `P-E2`); a store-addressed datum reported **without** a corresponding graph mutation and re-derive is the finding shape | **A handler that answers `store:'X'` while the app graph is untouched AND the rendered projection is unchanged** |
| **3** | **A subscriber drives the re-derive (rule 2).** A store subscription exists on the path, and the graph is re-derived from it — so the graph stays current as the store changes | The landed listener seam on the fork's side (`§3.4`, `A-8`): `rag-store-changed` → `onRagStoreChanged` → `editController.requestRebuild` → `reDerive`. **A direct-path read has NO store listener in the agent path** — that absence is `A-5`'s own second finding | **A store-addressed read whose answer changes when the store changes while the graph carries the OLD value and no listener fires** |

**`GCR-3` — THE FINDING FORM, so a report is uniform (`[DERIVE]`): a DIRECT STORE READ IN A TOOL-HANDLER PATH.** Its elements, each required: **(a)** the tool name and the argument that selected the store; **(b)** the store accessor reached; **(c)** the evidence that **no graph node carries the returned datum** (which endpoint read fails to expose it); **(d)** the evidence that **no store listener fires on the agent path** (rule 2). **A report missing (c) or (d) is not a finding under `GCR-3`** — it is an unsubstantiated claim, and `§7.1` `AMB-3` records the honest limit on this repo's ability to produce (c)/(d) for fork bytes.

### 2.4 What the rule does NOT reach — the named non-cases

**A clause that over-reads `GCR-1` is as much a finding as a direct read. THE FOLLOWING ARE NOT `GCR-1` FINDINGS, AND EACH IS NAMED SO NO LATER PASS INVENTS ONE:**

1. **A `main`-side WRITE.** The re-route constrains **READS that answer an agent**, not writes. `edit.*`'s mutations landing through the store's own single-writer path are the store's contract, not this rule's subject. *(The `store` selector's mutating half is still in scope for `§5`'s migration — but the finding class is the READ.)*
2. **A store read that feeds a graph COMMIT.** That is the conforming shape itself (`§3.1` steps 1–2): the renderer/wiring closure reads the store, and the read's product is a graph-carried value. **The read is legitimate BECAUSE the graph carries its result.**
3. **`main` holding the store INSTANCE.** `P-2`'s main-process store placement (an `A-5` partial lane) is **not re-ruled here** (`§6.4` item 3): a store constructed in `main` is not by itself an agent-addressed read.
4. **The `secure` tier's own main-side surface.** Unchanged and untouched (plan §2.5; `mcp-endpoint.md` §6.4).
5. **A tool that reads NO store value at all.** The `provident.focus` precedent (`docs/pending.md` §Q: *"the focus path reads NO store value and NO graph node — only the wiring-held holder + the pure model"*) is a **`P-16`-clean** shape; it is **not** a template for a store-addressed read and **not** a licence to add one (that carrier question is `H1`'s, not this unit's).

---

## 3. The conforming shape a fork consumes

### 3.1 The shape, in five ordered steps (`[DERIVE]`; inputs `P-16`, plan §2.5's crossings, `A-8`'s landed seams)

**THE SHAPE IS ONE PATH, DECOMPOSED INTO FIVE STEPS. EACH STEP NAMES: what it does · the seam it uses (where that seam exists today) · what it produces · the invariant that holds at that step.** A conforming re-route follows the five **in this order** — `§5.1` states why the order is not cosmetic.

| Step | What it does | The seam (where it exists today) | What it produces | The invariant at this step |
| --- | --- | --- | --- | --- |
| **1 — the store read lands in the RENDERER/WIRING CLOSURE** | The store-qualified read is issued by the renderer's or the wiring's own closure — **the realm §2.5 gives the values to** — never inside a tool handler | The renderer's own wiring (the fork's `sidebar-panes.ts` closure is the landed precedent, `A-8`); the cross-realm VALUE crossing is plan §2.5's **`Y-1`** (boot hand-off) / **`Y-2`** (commit channel) | The addressed store's value, in the renderer realm | **`INV-1`: the value crosses the realm boundary ONLY as plan §2.5's `Y-*` crossing — once at boot for the hand-off (`Y-1`), once per commit for the write (`Y-2`, a VALUE in / a RECEIPT out). A read that pays a crossing per read FAILS it** (§2.5: *"the cost of a read is zero crossings"*) |
| **2 — the value is AUTHORED/COMMITTED into the GRAPH (the app's own projection)** | The value becomes graph content: an envelope node, a handler body's write, or the app graph's own projection of it | `provident.dispatch`'s graph-mutation path (`mcp-endpoint.md` §3.1); or an envelope/authoring commit; or the app's own projection step | **A graph node (or a node's projected content) carrying the value** | **`INV-2`: after step 2, the value is MCP-VISIBLE BY CONSTRUCTION — a graph node carries it. BEFORE step 2 it is NOT** (plan §2.3) |
| **3 — the MCP ENDPOINT READS THE GRAPH** | The agent's read is served by the Runtime's graph surface, not by the store | **The existing surfaces:** `provident.get_rendered_html` §3.2 → `{ renderedHtml, ssrHtml, census }`; `provident.get_markdown` §3.3 → `{ markdown, census }`; `provident.get_node_state` §3.5 → `{ nodeId, states, census }`; `provident.dispatch` §3.1 → `{ results, dirtied, renderedHtml, ssrHtml }`; `provident.list_targets` §3.4 → `{ nodes: […] }`; **or the tool's own graph-carried read** | The endpoint's answer, **derived from the graph** | **`INV-3`: the answer is FRESHLY RE-EMITTED from the graph (`P-E2` — *"Graph-canon, fragment-is-a-view"*). A handler that returns a store value it did not obtain through the graph FAILS `INV-3`** |
| **4 — A STORE SUBSCRIPTION DRIVES THE RE-DERIVE** | A subscription on the addressed store's change surface re-derives the graph, so the graph stays current | **The landed listener seam (`A-8`, on the fork's side):** `rag-store-changed` broadcast → `sidebar-panes.ts` `onRagStoreChanged(payload)` → `editController.requestRebuild('content')` → `reDerive(kind)`. **The store's own event surface is `set`/`commit` (`docs/pending.md` §Q's queued pane-drag contract, clause 2, names it)** | A re-derived graph carrying the CURRENT value | **`INV-4` (RULE 2 OF THE TWO-RULE CRITERION): the re-derive is a LISTENER ON THE STORE — a subscription, not a controller callback into host state and not a per-call poll.** A direct-path read *"bypasses the listener discipline"* (`docs/pending.md` §Q's two-rule read) |
| **5 — THE EPOCH IS DECLARED** | The path declares, per store, that its graph projection is CURRENT — so a reader can tell a fresh projection from a stale one | **`DECLARED` (`[DECL]`, `§3.5` item (b)) — the shape is declared here; the fork lands it** | A per-store currency marker the endpoint read can be trusted against | **`INV-5`: a store-qualified read NEVER answers from a projection the path has not declared current** — the alternative (answering from a possibly-stale graph silently) is the failure mode `§6.1` item 2 refuses |

**THE SHAPE'S OWN NAME, SO §5 CAN CITE IT: `GCR-SHAPE-5` (the five steps 1→5 in order).**

### 3.2 The seams that EXIST TODAY, with their signatures (`[SPEC]` + `[READ]`)

**Each row names a seam, its site and its shape as landed. NO foundation seam is minted by this file.**

| # | Seam | Site | Shape as landed |
| --- | --- | --- | --- |
| **1** | `provident.dispatch` | `mcp-endpoint.md` §3.1; tool table §3 | **in** `{ target, event, args?, requestId? }` · **out** `{ results, dirtied, renderedHtml, ssrHtml }`. Target is the two-vocabulary addressability (`{kind:'cssId',cssId}` · `{kind:'nodeId',nodeId}` · `{kind:'wire',wire}` · a bare string resolved css.id → props.id → nodeId); **an unknown/unresolvable target THROWS `unresolved target: {…}`**; `args` MUST be an ARRAY of structured-clone-safe JSON; **flush-before-response** (`P-E5`) |
| **2** | `provident.get_rendered_html` | §3.2 | **in** `{}` · **out** `{ renderedHtml, ssrHtml, census }` — the DOM/SSR surface, freshly re-emitted |
| **3** | `provident.get_markdown` | §3.3 | **in** `{}` · **out** `{ markdown, census }` (0.2 Feature 2 — the simplified text-only output document for agentic consumers) |
| **4** | `provident.get_node_state` | §3.5 | **in** `{ target }` · **out** `{ nodeId, states, census }` |
| **5** | `provident.list_targets` | §3.4 | **in** `{}` · **out** `{ nodes: [{ nodeId, cssId?, propsId?, type, content, state, inTree, handlers }] }` |
| **6** | The resources | `mcp-endpoint.md` §3.7 | `mcp://provident/app` (mirrors `get_rendered_html`, `text/html`, always-fresh; a large read may return `{census,digest,preview,truncated}`) · `mcp://provident/node/{nodeId}` (mirrors `get_node_state`, `application/json`, **the nodeId validated against the live in-tree graph**) · `mcp://provident/targets` |
| **7** | **The group gate** | `mcp-endpoint.md` §6.2 | `read` (`get_rendered_html`, `get_markdown`, `list_targets`, `get_node_state`, `code.get`, `code.validate`) **ON** · `dispatch` (`provident.dispatch`) **ON** · `graph` (`load`, `op`, `export`, `validate`, `teardown`, `journal`) **OFF — manual** · `code` (`code.set`, `code.create`, `code.delete`, `code.load`) **OFF — manual**. **A tool whose group is disabled is not registered / not listed / returns an error** |
| **8** | **The notification** | `mcp-endpoint.md` §8 (Non-goals) + §3.6 | `notifications/resources/updated` is **stdio-ONLY and content-level**; it fires after an app-graph MUTATING operation (**dispatch/load/op/teardown/code.load**), **sourced ONLY from the app Runtime re-render** — never the isolated SecurePanels graph. The surface stays **pull-based read-after-dispatch + this best-effort stdio-only push** |
| **9** | **The fork's landed listener** (rule 2's precedent, read as the SUBJECT) | the fork's `src/renderer/sidebar-panes.ts` (`A-8`) | `bridge.edit.onRagStoreChanged(handler: (payload: RagStoreChangedPayload) => void): () => void` (subscription seam) · `onRagStoreChanged(payload)` routes through the edit controller's dirty-edit guard — `editController.requestRebuild('content')` · `reDerive(kind: RebuildKind = 'content'): Promise<void>` with in-flight coalescing (`reDeriveInFlight`/`reDeriveQueued`/`reDeriveQueuedKind`). **Its fail-closed drop branches are part of the shape**: `lastStore === null` → ONE pinned `console.warn` + no re-derive; `typeof payload.store !== 'string'` or `''` → ONE pinned `console.warn` + no re-derive; a FOREIGN store (a valid string ≠ the captured name) → **SILENT by design** |

**`P-E3` — THE PARITY PIN, CARRIED (`[SPEC]`): *"Two transports, one tool surface"* — stdio and HTTP expose identical tools. THIS RE-ROUTE ADDS NO TOOL ON EITHER TRANSPORT, so parity is satisfied trivially; and *"the store must not be reachable on one transport only"* (plan §2.3) is satisfied because the CARRIER is the app Runtime, which both transports already read.**

### 3.3 The exemption arm — NOT TAKEN (`[RULING]`)

**THE EXEMPTION MECHANISM DOES NOT EXIST, AND THIS FILE DOES NOT DECLARE ONE.** `docs/next-steps.md`'s `H3` row (filed before the ruling) contemplated *"the recorded exemption mechanism if the architect rules one"*; **the ruling took the RE-ROUTE arm and NOT the exemption arm** (`§0A.3` edge `S-4`, `ARM-WITHDRAWN`). **CONSEQUENCES, EACH BINDING:**

1. **No exemption row, no `P-16` carve-out, no exemption status token and no exemption field exists in this contract.**
2. **A later pass may NOT cite `H3` (`U-FORK-STORE-READS`) IS A RE-ROUTE, NOT AN EXEMPTION as license for a direct agent→store read** (`H3` clause (1), verbatim in substance).
3. **A fork's `F-MS5-4`-style "documented and accepted" note does NOT cure the letter** — `docs/pending.md` §Q records exactly that the fork documented and accepted it, *"but the LETTER contradiction is this policy"*.
4. **The `H3` row's post-ruling text supersedes its own pre-ruling clause**; this file's `§1.1` states the post-ruling reading and nothing here re-opens it.

### 3.4 Where the multi-store dimension enters the shape — a pointer, expanded at `§4`

**The `store:'X'` qualifier enters at `GCR-SHAPE-5` step 1** (the renderer/wiring closure issues the qualification) **and is carried to step 3 as part of the graph projection** — so **the endpoint never sees a `store` argument vocabulary at all** (`§4.1`). `§4` states how, and what it means for the existing single-graph assumption.

### 3.5 The seams that must be ADDED — and BY WHOM (`[DECL]`)

**TWO SEAMS DO NOT EXIST IN THIS FOUNDATION'S TREE, AND NEITHER IS A FOUNDATION SEAM. BOTH ARE ON THE FORK'S SIDE OF THE BOUNDARY (`§0.1`), SO THIS FILE DECLARES THEIR SHAPE AND CLAIMS NEITHER AS FOUNDATION WORK.** **A pass that reads either as a foundation obligation has mis-read `§0.1`.**

| # | The seam | Its DEPTH | Its declared shape | Why it is the fork's, not the foundation's |
| --- | --- | --- | --- | --- |
| **(a)** | **THE PER-STORE GRAPH PROJECTION SEAM** — the step-2 site that commits a store-qualified value into the graph, per store | The fork's renderer/wiring | **`DECLARED SHAPE` (this file's `[DECL]`):** the seam's discharge is **the fork's own projection step** — a commit into the app graph keyed by **the caller's own spelling for the store** (`§4.1`), authored with no new foundation naming. **Its observable:** after the commit, **a graph node carries the value**, and `provident.list_targets`/`get_node_state`/`get_rendered_html` can expose it (`GCR-2` half 1). **Its fail-surface:** a store-qualified read whose projection cannot be committed **refuses; it never falls back to a store answer** (`§6.1`) | **plan §2.3 states a store adds NO tool, resource, group, `VALID_GROUPS` member, `RpcMethod` member, `MUTATING_METHODS` entry or IPC method. A foundation-side projection seam for a FORK's store would be exactly such an addition** (`§6.2` prohibition 1) |
| **(b)** | **THE PER-STORE CURRENCY / `EPOCH` SEAM** — the step-5 site that declares a store's projection current | The fork's renderer/wiring | **`DECLARED SHAPE` (this file's `[DECL]`):** a per-store currency marker written by the fork's own re-derive path, such that a store-qualified read can tell a fresh projection from a stale one. **The marker holds THE CALLER'S OWN SPELLING** for the store and **carries no store vocabulary of the mechanism's** (`§4.1`). **Its observable:** a store-qualified read served from a projection the path has not declared current **does not answer as though current** | Same reason as (a): a foundation-side currency seam is a new foundation surface for a fork's data, which `P-16`/plan §2.3's *"a store is never a new MCP surface"* and `H-r16`'s *"a new gate that must not be smuggled in"* both refuse |

**SEAM SHAPES THIS FILE DOES *NOT* DECLARE, NAMED SO THEIR ABSENCE IS NOT READ AS AN OVERSIGHT:** **no** foundation-side store-qualified tool, **no** foundation-side store-qualified resource, **no** foundation-side `store` argument on any `provident.*` tool, **no** new `RpcMethod`, **no** new group, **no** new `MUTATING_METHODS` entry, and **no** foundation-side re-route of the fork's own tools. Each is a **new contract with its own gate** (`§6.2` prohibition 1).

---

## 4. The multi-store dimension

### 4.1 How a store-qualified read is expressed (`[DERIVE]`; inputs plan §1.8's caller-spelling rule + `A-8`'s landed spelling)

**`GCR-4` — THE SPELLING IS THE CALLER'S. A store qualification is expressed as THE CALLER'S OWN SPELLING carried per-store in the graph. The MECHANISM carries NO store vocabulary: no store name is a symbol, a closed-union member, a default, a documented constant or a field of the mechanism's own contract.** *(The rule's provenance: `docs/specs/data-ownership-model-plan.md` §1.8 `R-6` — *"a declared name is a declaration of the CALLER'S spelling, not a vocabulary the store owns"* — and `docs/specs/zones.md` `§2.2` `P-1`'s no-consumer-vocabulary prohibition; the same discipline the store contract carries as its "no second authority over a caller's spelling" row.)*

**THE CONCRETE EXPRESSION, IN FOUR CLAUSES:**

1. **The fork's wire spelling is `store:'X'`** — the caller's own string, per its landed `resolveStoreArg(tool, raw, dir)` (`§4.2`). **This file neither mints nor blesses any other spelling, and it does not put the string `store` into any foundation contract.** The word `store` in this file's prose is a **quotation of the fork's own argument name**, never a mechanism symbol (`§6.2` prohibition 4's vocabulary half).
2. **The spelling rides the graph as DATA, in the value's own content** — e.g. a node's projected content/attribute — **never as a mechanism-level key, index or union member.**
3. **The graph projection is PER-STORE: each addressed store's values project to their own graph content.** What that means for the single-graph assumption is `§4.2`.
4. **A store the caller did not qualify is not distinguishable in the mechanism** — the fork's own default-store rule (its `resolveStoreArg`'s S1 arm) makes the qualification **always explicit by the time it reaches the graph** (`§4.2` clause 3).

### 4.2 What a per-store projection means for the existing single-graph assumption (`[DERIVE]` + `[READ]`)

**THE LANDED FACT THIS MUST BE READ AGAINST (`[READ]`, `A-8`):** the fork's `resolveStoreArg(tool, raw, dir)` (`src/main/rag-store-directory.ts`) has **exactly four outcome states**, and its ordering is part of its contract:

| State | Input | Behaviour | Return |
| --- | --- | --- | --- |
| **S1** | `raw` omitted, `dir` present | The omitted ⇒ **default-entry** rule. Checks `dir.entries.has(dir.defaultName)`; a malformed directory (default entry absent) **throws M3** | `{ requested: null, name: dir.defaultName }` |
| **S2** | `raw` a known non-empty string | Resolves to itself | `{ requested: raw, name: raw }` |
| **S3** | `raw` omitted, `dir` absent | **The LEGACY sentinel** — **no resolution performed**; the handler uses its passed store param unchanged (byte-equal to today) | `null` |
| **M1** | `raw` present, not a non-empty string | **Checked BEFORE M2** — a malformed value **never leaks membership information** | **throws** `` `${tool}: store must be a non-empty string` `` |
| **M2** | `raw` a non-empty string with no directory entry, **or** no directory at all | Membership. **The echo is CAPPED at 200 chars** (longer renders as its first 197 + `…`, exactly 198 chars; the ≤200-char case stays byte-exact) — **the cap is a RENDERING rule only: a long raw is still M2, never M1** | **throws** `` `${tool}: unknown store '${echoed}'` `` |
| **M3** | the omitted path against a malformed directory | A wiring bug; U-MS1 never produces one | **throws** `rag-store-directory: default store not found` |

**ITS THREE CONSEQUENCES FOR THE GRAPH (`[DERIVE]`):**

1. **STORES ARE ADDRESSED BY NAME, AND THE NAME ITSELF IS UNINTERPRETED BY THE MECHANISM.** `ResolvedStoreRef` is `{ requested: string | null, name: string }` — **`requested` is the RAW caller input, `null` when the argument was omitted.** **The mechanism never sees `requested`; the graph carries `name` (the caller's own spelling) and the projection is keyed by it.** A mechanism that treated `requested`/`name` as a DECISION (a default, a fallback, a derivation, a re-key) would be the second-authority class the store contract closes — and would break `GCR-4`.
2. **THE EXISTING SINGLE-GRAPH ASSUMPTION IS NOT VIOLATED — IT IS MADE EXPLICIT.** The app Runtime holds ONE graph, and this re-route does **not** mint one graph per store. A per-store projection means: **the store's values are projected INTO the one app graph**, each carrying the caller's spelling as content — **so the single-graph assumption stands, and the multi-store dimension is carried as DATA inside it.** `GCR-5` states this as a rule.
3. **THE QUALIFICATION IS ALWAYS EXPLICIT BEFORE THE GRAPH SEES IT.** Because `S1` resolves an omitted argument to the **default entry's name**, **no store-qualified read reaches the projection without a resolved name** (except the `S3` legacy sentinel, whose resolution is `null` — the directory-less path, `§5.2`). **This is what makes the per-store projection well-defined without the mechanism knowing what a "default store" is.**

> **`GCR-5` (`[DERIVE]`): THE GRAPH STAYS SINGULAR AND THE STORE DIMENSION RIDES AS DATA.** There is **ONE** app Runtime graph. Per-store values are projected into it, **each branded in its own content by the caller's own spelling**. **No second graph is minted per store, no graph-per-store registry exists, and no mechanism-level map is keyed by store name.** *(The foundation's own analogy, cited for shape and not copied as a row: a declared name is the caller's spelling and never a vocabulary the mechanism owns.)*

### 4.3 The coexistence/migration steps, in order, with the invariant at each (`[DERIVE]`)

**THE FOUR-STEP ORDER A CONFORMING FORK FOLLOWS. `§5.1` states each step's invariant in full; this table is the sequence and its one-line invariant.**

| # | Step | Lands where | The invariant that holds at this step |
| --- | --- | --- | --- |
| **1** | **MAIN-SIDE REGISTRY** (already landed; kept) | the fork's `src/main/rag-store-registry.ts` + `rag-store-directory.ts` | **`MIG-1`: the registry's resolution contract is UNCHANGED — the four states S1/S2/S3/M1/M2/M3 and their throw strings are byte-stable, and the registry stays PURE (no write primitive, no removal primitive; one `existsSync` probe + one `statSync().isFile()` probe + at most one `readFileSync` per load)** |
| **2** | **RENDERER CLOSURE** — the store-qualified read moves into the renderer/wiring realm | the fork's renderer/wiring | **`MIG-2`: the read is issued in the realm plan §2.5 gives the values to, and it crosses only by a `Y-*` crossing** |
| **3** | **GRAPH COMMIT** — the value is authored/committed into the app graph | the fork's renderer/wiring (seam (a), `§3.5`) | **`MIG-3`: after this step the value is MCP-visible BY CONSTRUCTION — a graph node carries it (plan §2.3)** |
| **4** | **ENDPOINT READ** — the agent's read is served from the graph; the store subscription drives the re-derive | the existing endpoint surfaces (`§3.2` rows 1–6) + the fork's listener (`§3.2` row 9) | **`MIG-4`: the answer is freshly re-emitted from the graph (`P-E2`) and the re-derive is a listener on the store (rule 2)** |

**THE ORDER IS BINDING, AND `§5.1` STATES WHY: `MIG-3` cannot hold before `MIG-2` (the value has no realm home), and `MIG-4` before `MIG-3` would answer from an uncommitted value — which is exactly `INV-3`'s failure.** **A migration that reorders the four steps FAILS this contract even if every intermediate state looks green.**

---

## 5. The migration / coexistence contract

### 5.1 The invariant at each step, stated so a reviewer can fail it

| Step | Invariant | Falsifier (what makes it FAIL) |
| --- | --- | --- |
| **1 — registry** | **`MIG-1`** (above) | A resolution whose state set moved (a fifth state, a changed throw string), a re-keyed or derived store name, or a write/remove primitive appearing in the registry module's import set |
| **2 — renderer closure** | **`MIG-2`** | The store-qualified read still issued from the tool handler (or any main-process function on the agent path) **to answer an agent**; or a crossing paid **per read** rather than once per boot (`Y-1`) / once per commit (`Y-2`) |
| **3 — graph commit** | **`MIG-3`** | After step 3, `provident.get_node_state` on ANY node cannot name the value, and no `get_rendered_html`/`get_markdown` projection contains it — i.e. the value **is not carried** |
| **4 — endpoint read + listener** | **`MIG-4`** | (a) the answer is a store value not obtained through the graph; (b) the answer changes when the store changes while the graph carries the OLD value and **no listener fires**; (c) the re-derive is a controller callback into host state or a poll, not a store subscription |

### 5.2 Can the old direct path and the new carrier COEXIST during migration? (`[DERIVE]`)

**YES, AND THE COEXISTENCE IS DECLARED WITH ITS ONE CONDITION.** The old path and `GCR-SHAPE-5` may coexist in one tree during the fork's migration, under **three terms**:

1. **The coexistence is TRANSIENT and requires the legacy sentinel path to be preserved.** The fork's `resolveStoreArg` **S3 arm is already the coexistence mechanism**: with **no directory injected** (`dir == null`) and the argument omitted, **resolution is `null` and the handler uses its passed store param unchanged — "byte-equal to today."** **So the directory-less path IS the old path, and it is a DECLARED, landed state of the fork's own contract, not an accident.** A conforming fork **keeps S3 reachable until its cutover** (§5.2.2).
2. **Every non-default store's reads MUST be on the new carrier OR refused — never on the old path.** The finding `A-5` names is exactly the **non-default** store's content being agent-addressed directly (`rag.query {store:'X'}`). **A migration that leaves `store:'X'` (S2, a known non-omitted name) answering from the store directly has not migrated the finding.** So: **S2 → the new carrier, mandatory; S1 (the omitted name) → may ride the default carrier during migration; S3 → the legacy path, until cutover.**
3. **No hybrid answer is admissible in a single response.** A response that serves **part** of its data from the graph and **part** from a direct store read is **the `A-5` finding wearing the shape of a migration** — the datum's carrier is a graph node, or it is not (`GCR-1` is per-datum, `GCR-2` half 1).

**§5.2.1 — CAN COEXISTENCE BE DETECTED?** Yes, by the `GCR-2` halves: **half 3's listener probe** (a store change with no re-derive and a stale graph answer is the old path's signature), and **half 1's node probe** (a value an endpoint returns that no node names is the old path's signature). **This file does not claim either probe is instrumented in either repo** (`§7.1` `AMB-3`).

**§5.2.2 — THE CUTOVER CONDITION.** **The old direct path is cut over when the fork's store-qualified reads (S2, and S1 once its carrier lands) answer through `GCR-SHAPE-5` and `MIG-4` holds for them — at which point the `docs/pending.md` §Q `multi-document-store-config` PENDING-REBUILD cell's revisit condition is MET and the row flips to COMPLIANT by §Q's own words.** *(`docs/pending.md` §Q: *"at which point this row flips to COMPLIANT"* — a tracker flip that is **`docs/pending.md`'s own edit, owed to the pass that verifies the fork's landing, NOT this file's** — `§6.3`.)* **THE CUTOVER IS NOT DECLARED BY THIS FILE, AND IT IS NOT DECLARED BY THE FORK UNILATERALLY:** the flip's evidence is the fork's own landed bytes **plus** the four invariants of `§5.1`, and the pass that flips the cell cites both.

### 5.3 What must NOT change (so the re-route is behaviour-preserving for the fork's callers) (`[RULING]` + `[DERIVE]`)

**THE RE-ROUTE IS BEHAVIOUR-PRESERVING FOR THE FORK'S CALLERS. EACH ITEM BELOW IS FROZEN BY THIS UNIT: an item that moves is a COMPATIBILITY BREAK, and a compatibility break is a BLOCKER for the architect, never a silent pass** (`AGENTS.md` item 10a's blocker class: *"a fork-facing compatibility break"*).

| # | Frozen | Why, and the authority |
| --- | --- | --- |
| **1** | **The fork's tool NAMES** — the 12 `rag.*`/`edit.*` members as the fork's `ALL_TOOLS` declares them (`rag.query` · `rag.get_document` · `rag.list_nodes` · `rag.get_edges` · `rag.backlinks` · `rag.list_documents` · `rag-stream` · `get_query_audit_log` · `edit.set_content` · `edit.create_node` · `edit.delete_node` · `edit.split_node` · `edit.merge_node` · `edit.set_edge` · `edit.import_markdown` — **plus the tag-write member its `U-D7` adds**) **⟶ COUNT CORRECTED 2026-10-03 (THE GATE-4 AUDIT'S FINDING `FS-3`, `RCA-8(d)` ANNOTATE-BESIDE: the as-filed *"the 12 members"* above is KEPT VISIBLE and this clause is the measured reading — the list as printed is FIFTEEN members, not twelve, so a reader must take the ENUMERATED LIST as the subject and NOT the count.** The defect was the count, never the list: `12` was carried from the slice's own *"the `store` selector on all 12 `rag.*`/`edit.*` tools"* wording at its landing, while the enumerated names run to fifteen before `U-D7`'s tag member; **the frozen-item's OPERATIVE SUBJECT is the list as enumerated, and a later pass reconciling the fork's own `ALL_TOOLS` census should re-derive both the list and the count from the fork's bytes.**) | The re-route changes the ROUTE, not the SURFACE. Plan §2.3: **a store adds no tool** — and **removing one is equally a surface change** |
| **2** | **The fork's tool ARGUMENTS** — including the **optional `store` argument as the fork spelled it** and the `stores:'all'` fan-out where the fork carries it | `A-5`'s `P-15` lane (*"the optional `store` argument + two preload additions (no new tool/group/`RpcMethod`)"*) — **the argument stays; only WHO reads it and HOW the value reaches the endpoint changes** (`§4.1` clause 1) |
| **3** | **The fork's TOOL GROUPS and its gate semantics** | `A-5`'s `P-15` lane is explicit that the slice added **no new group**; the fork's `rag`/`edit` groups stay the gate |
| **4** | **The fork's `provident-rag-stores.json` REGISTRY** — its path, its file shape, its name charset (`/^[a-z0-9][a-z0-9_-]{0,63}$/`), its exactly-one-`default` rule, its migration-legacy-path derivation, and its boot-time-only mutation posture | The registry is a **`file`-tier central carrier** and is `A-5`'s own **`rule-1 ✓`** half: *"the registry is pure"*. **The re-route does not touch it** |
| **5** | **The fork's `F-MS5-4` ACCEPTED SEMANTICS** | `A-5` records the fork's `F-MS5-4` note as documenting-and-accepting the current behaviour. **The re-route makes the note's premise true rather than re-writing the note**: the note is the fork's, annotated **by the fork's own pass** (`H-r6`, `A-6`) — *"the fork's own pass annotates the fork's own row; this repo writes NO file under `<Astrographer>/`"* |
| **6** | **The fork's four `resolveStoreArg` states and their byte-pinned messages** (S1/S2/S3, M1/M2/M3, the 200-char echo cap, the M1-before-M2 ordering) | `MIG-1` (`§5.1`); the fork's own spec `unit-ms2-store-wiring.md` §5.1 is byte-pinned on these strings |
| **7** | **The store's own contract** — `docs/specs/store-core-graph.md` and its frozen-surface artifacts | `§6.2` prohibition 2 |
| **8** | **The foundation's MCP surface** — `ALL_TOOLS`, `RpcMethod`, `VALID_GROUPS`, `MUTATING_METHODS` | `§6.2` prohibition 1; plan §2.3 |
| **9** | **The `A-5` PARTIAL lanes other than the read routing** (`P-1`'s `<name>:` mint · `P-2`'s main-side placement · `P-10`'s reversed authority · `P-15`'s preload additions) | `§6.4` item 3: **NOT re-ruled by this unit** |

### 5.4 The old path's disposition, stated once (`[DERIVE]`)

**THE OLD DIRECT PATH IS NOT "REMOVED BY THIS UNIT" — it is SUPERSEDED FOR THE FINDING SPECIFICALLY.** Two distinctions, each binding:

1. **The `S3` legacy path is a DECLARED STATE of the fork's own contract (`§5.2` clause 1) and stays reachable until the fork's cutover.**
2. **What the re-route supersedes is the use of `S2`/`S1` to answer an agent DIRECTLY.** After cutover, an `S2` read that still answers from the store is a **`GCR-3` finding** — not a legacy state.

---

## 6. The refusal/error posture and the prohibitions

### 6.1 The refusal/error posture (`[DERIVE]`)

**`GCR-6` — THE RE-ROUTE CHANGES NO TOOL'S ERROR SURFACE UNLESS DECLARED.** Its three clauses:

1. **A store-qualified read that MISSES answers with the existing tool error shapes** — the fork's own, unchanged: `M1` `` `${tool}: store must be a non-empty string` `` · `M2` `` `${tool}: unknown store '${echoed}'` `` (echo capped at 200 chars) · `M3` `rag-store-directory: default store not found`. **The re-route does not re-word, re-type, re-code or re-order any of them** (`MIG-1`).
2. **The re-route MAY add a NEW refusal — but ONLY as a DECLARED amendment, named here, with the fork's own gate.** The one new refusal this shape genuinely implies is the **projection-refusal**: *a store-qualified read whose projection cannot be committed refuses (`§3.5` seam (a)'s fail-surface) rather than falling back to a store answer.* **ITS PROMULGATION IS `OWED` AND IS NOT MADE BY THIS FILE:** declaring it changes the fork's error surface, which `§6.1` clause 1 forbids **unless declared** — so it is carried as `§7.1` `AMB-4` for the fork's own pass (and the architect, if it is contended).
3. **The `secure` tier's refusals are untouched** (`§2.2`), and **the store must not become reachable on one transport only** (plan §2.3; `P-E3`).

### 6.2 The prohibitions — each stated explicitly (`[RULING]` + `[SPEC]`)

| # | Prohibition | Its authority | Its falsifier |
| --- | --- | --- | --- |
| **1** | **NO `P-16` CARVE-OUT.** No exemption row, no policy carve-out and no exemption token is created by this unit, and **a later pass may NOT cite `H3`'s ruling as license for a direct agent→store read** | `H3` clause (1), verbatim in substance; `§0A.3` edge `S-4` | Any clause anywhere in the tree presenting an exemption to `P-16`, any `P-16` carve-out row, or a direct agent→store read justified by *"H3 ruled a re-route"* |
| **2** | **NO STORE-SURFACE CHANGE IN THIS REPO — THE STORE IS FROZEN.** No `src/**` byte of the store modules moves; no store policy row, no `P-n`, no store tier, no store event surface and no frozen-surface artifact is written or amended by this unit | `§0.2` (`AGENTS.md` item 11(g)'s doc-only characterisation is only honest if no code lands); `docs/decisions.md`'s store rulings cited by row name | Any diff of this unit touching `src/**`, the store's specs, or a frozen-surface artifact |
| **3** | **NO FORK-TREE WRITE (`H-r6`).** This repo writes **NO** file under `<Astrographer>/` — no `src/main/**`, no `docs/**`, no registry file, no fork-side spec | `A-6`; `docs/FORKER.md` §4's fork-side-return convention | A write path under `<Astrographer>/`; or a clause purporting to close a fork-side row on the fork's behalf |
| **4** | **NO STORE VOCABULARY IN THE MECHANISM.** The re-route introduces no store name as a symbol, closed-union member, default, documented constant or mechanism key; the caller's spelling rides as data (`GCR-4`) | `GCR-4`; plan §1.8 `R-6`; `A-5`'s `P-33` (*"no consumer vocabulary"*) | A mechanism-level store name, a store-keyed map, a `store`-named union member, or a default store in any mechanism contract of this shape |
| **5** | **THE `§Q` PARTIAL LANES ARE *NOT* RE-RULED BY THIS UNIT.** | `A-5`; `§0A.3` edge `S-5` | A clause (or a later pass) treating `P-1`, `P-2`, `P-10` or `P-15` as discharged, re-ruled or superseded by `H3` |

### 6.3 The `H-r6` handoff note this unit OWES (`[DECL]`)

**THE OWED ARTIFACT, STATED SO ITS ABSENCE IS A FINDING: a `docs/FORKER.md` §4 block carrying `§2`'s rule, `§3`'s shape, `§4`'s multi-store expression and `§5`'s migration contract to a fork in this repo's own words with their citations, plus the `OWED` marker for the fork's own pass.** **STATUS: `OWED` — NOT WRITTEN BY THIS PASS** **⟶ LANDED 2026-10-03 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW, RECONCILED IN PASS; the gate-5 blind-greens finding `D-3` raised it and this clause closes it — `RCA-8(d)` ANNOTATE-BESIDE: the as-filed `OWED`/`NOT WRITTEN` bytes above are KEPT VISIBLE and this clause is the OPERATIVE READING): THE NOTE IS WRITTEN** — `docs/FORKER.md` §4's block **THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE (`H3`, `U-FORK-STORE-READS`)**, seven clauses **(i)–(vii)**, carrying `§2`'s rule, `§3`'s shape, `§4`'s multi-store expression, `§5`'s migration contract and the `OWED` marker for the fork's own half. **The owner named in the paragraph below (`"whatever pass next touches `docs/FORKER.md` §4"`) is SPENT: discharged by the same 2026-10-03 landing the gate-5 blind pass recorded.** **The unit is therefore NOT incomplete on the note half** — `§7.3` item 5's *"its absence leaves the unit INCOMPLETE"* no longer holds for it; **what remains `OWED` is the FORK's own `src/main/**` re-route (`§0.1` item 9, `H-r6`).** **THE PARAGRAPH BELOW IS KEPT AS THE FILING PASS'S OWN DATED READING.** **WHY IT WAS NOT WRITTEN HERE, STATED RATHER THAN HIDDEN:** `RCA-8`'s one-file constraint governs this pass (**one NEW file: `docs/specs/fork-store-reads.md`; no other file touched**), and `docs/FORKER.md` §4 is an existing, long, actively appended-to file (`RCA-8(c)`: *"whole-file `write` on an existing file over ~200 lines is FORBIDDEN unless the file is committed in the same pass"*). **The note is therefore a named, owned, deferred carry** — owner: whatever pass next touches `docs/FORKER.md` §4 (the same ownership form the `docs/FORKER.md` §3 `provident.focus` carry used); it gates **no** unit in this repo. **This file IS the note's authority text, so the carry is a transcription, not a derivation.**

### 6.4 The four further non-effects, named so no later pass infers them

1. **No ledger move**: no unit is admitted, no unit is marked DONE, no count moves. **This filing does not touch `docs/next-steps.md`'s ledger or its `H3` row** (that reconciliation is the supervisor's gate-10 pass).
2. **No tracker edit**: `docs/pending.md` §Q's `multi-document-store-config` cell, `docs/decisions.md` and `docs/next-steps.md` are **read, cited, and not written** by this pass.
3. **`§Q`'s other lanes keep their recorded status** — including the **`provident.focus`** PENDING-REBUILD cell and the **pane-drag → zone update** / **theme token** cells; each is its own unit (`§1.2`).
4. **No page-design consequence**: this unit changes no page design, no rendered surface and no authored UI content anywhere in this repo, so **`docs/skills/designing-pages.md` is NOT touched — and no such file exists in this checkout** (`§7.1` `AMB-5`). **A page-design update would be owed only if this unit changed page design; it does not, and the determination is recorded rather than left silent.**

---

## 7. Honest statements, ambiguity record and stop conditions

### 7.1 The ambiguity record (`OPEN` — five named items, each with an owner)

**EACH ITEM BELOW IS CARRIED RATHER THAN DECIDED. A pass that resolves one must record the resolution at its own site and must not edit this list's as-filed wording.**

| # | The ambiguity | Why it is open | Owner / route |
| --- | --- | --- | --- |
| **`AMB-1`** | **THE `P-1`…`P-36` POLICY TABLE IS NOT IN THIS CHECKOUT.** `H3`'s ruling, `docs/pending.md` §Q and `docs/next-steps.md`'s `H3` row all cite `P-16` at `docs/specs/mcp-endpoint.md` §6.4; §6.4's landed heading there is **"Manual-UI-only settings controls"**, and **no file in this repo carries the numbered `P-n` policy table** (verified by a whole-tree search for `P-16`, `P-24`, `P-33`, `P-35`, `P-36` and `never agent-addressable`: the only hits are the citing rows, plus `§Q`'s verbatim quotation of `P-16`) | This file must not invent a row it did not read. **`P-16` is therefore cited as QUOTED SUBSTANCE at a named site** (`§0`'s `A-2`), which is exactly how `docs/pending.md` §Q cites it | **No blocker for this unit**: the substance is quoted verbatim at two independent citing sites and is unambiguous. **ROUTED, however, as a documentation finding for the pass that owns `mcp-endpoint.md`'s §6.4** — a policy row cited by id at three trackers should be *findable* by id at the cited site. **This file does NOT decide whether that repair is owed** — it records the state. |
| **`AMB-2`** | **THE CLAIM LEDGER'S AUTHORITY-SOURCE FILE IS OUTSIDE THIS CHECKOUT.** The `.opencode/agent/spec-writer.md` this pass was pointed at **does not exist in this workspace** (verified: no `.opencode/` directory, and no `**/spec-writer.md` anywhere in the tree); the claim ledger's rules and the typed-register rules are therefore applied **as this pass's instructions state them**, with their landed provenance cited at `docs/specs/store-core-graph-compliance-review.md` §1 family (3) (`spec-authoring-discipline.md` §3.2's claim-class set and §3.3's five-form authority enum ARE FILED — that file lives in the `Agent Harness` project, not in this checkout) | The rules are executable as stated; their **text** was not re-read here | **ROUTED to the supervisor**: if the authority file's wording differs from the applied form, this file's ledger labels are the thing to re-grain — **a re-grain is a bounded pass, not a re-write** |
| **`AMB-3`** | **THIS REPO CANNOT PRODUCE `GCR-3`'s EVIDENCE (c)/(d) FOR THE FORK'S BYTES.** Clauses (c) and (d) are *"no graph node carries the datum"* and *"no store listener fires on the agent path"* — **both are claims about the fork's implementation, and this repo holds no instrument over the fork's tree.** `§2.3`'s three halves are therefore stated as **checkable-in-principle observables**, and **no measurement of the fork is claimed anywhere in this file** | A foundation-side spec may not claim a measurement it took none of (`docs/specs/data-ownership-model-plan.md`'s own closing honesty note is the precedent form) | **The fork's pass** supplies (c)/(d) as its own evidence; **`docs/pending.md` §Q's cell flips on that evidence** (`§5.2.2`) |
| **`AMB-4`** | **THE PROJECTION-REFUSAL'S PROMULGATION** (`§6.1` clause 2): *a store-qualified read whose projection cannot be committed refuses rather than falling back* — this file states it as a **shape**, and does **not** declare it as a change to the fork's error surface | Declaring it **would** change a tool's error surface, which `GCR-6` clause 1 forbids unless declared — so the declaration is a **fork-side act with its own gate**, and it is **routed, not taken** | **The fork's own pass**; **the architect** if it is contended as a compatibility break (it would be a NEW refusal shape, i.e. a caller-visible addition) |
| **`AMB-5`** | **NO `docs/skills/designing-pages.md` AND NO COVERAGE MATRIX EXIST IN THIS CHECKOUT.** The spec-writer duty to update page-design docs *"if the change affects page design"* is **not triggered** (this unit changes no page design — `§6.4` item 4), **and the file it would name does not exist** (verified: `docs/skills/` holds `process-guardrails.md` only) | Recorded so a later pass does not read the absence as an unperformed duty | **No owner owed** — recorded as a determination; if a later pass creates the file, this unit's §6.4 item 4 remains the citation for why it was not the trigger |

### 7.2 Stop conditions (binding on any pass that uses this file)

1. **A pass that finds itself editing a fork-tree file has MIS-READ `§6.2` prohibition 3. STOP.**
2. **A pass that finds itself editing `src/**`, the store's specs or a frozen-surface artifact under this unit has MIS-READ `§6.2` prohibition 2. STOP and re-route the finding to the pass that owns that surface.**
3. **A pass that needs a `P-n` row beyond the quoted `P-16` has found `AMB-1`'s condition. STOP and route it** — do not mint the row.
4. **A pass that would make this unit code-bearing in this repo VOIDS the zero-row exemption (`§5.5` item 4) and must author the typed register BEFORE any red set.** `AGENTS.md` item 11 forbids delegating a red set under the zero-row exemption for a code-bearing unit.
5. **A pass that finds a fork-facing compatibility break in `§5.3`'s frozen list STOPS and reports a BLOCKER to the architect** (`AGENTS.md` item 10a's blocker class). **Compatibility breaks are never decided silently by a pass.**

### 7.3 Honest statements (recorded so no later pass over-reads this unit)

1. **This pass ran NOTHING.** No `npm test`, no `typecheck`, no `typecheck:tests`, no build, no `npm run ui`, no divergence leg, no battery, no Electron boot and no MCP session. **A docs-only change does not trigger the trio** (`AGENTS.md` item 4), so **NO LEG WAS RUN and no timing, suite, memory or census figure is claimed anywhere in this file.**
2. **Every figure in this file is a named clause, a named row id, a named path's read, or a count of this file's own enumerated rows** — the `§0A` ledger's terms are the only arithmetic here, and each total is printed with its terms (`§0A.2`).
3. **This file's `[READ]` claims are readings of bytes at named paths taken by THIS pass** — the fork's `src/main/rag-store-directory.ts`, `src/main/rag-store-registry.ts`, `src/main/mcp-server.ts` and `src/renderer/sidebar-panes.ts` (its `§0.1` boundary is that they are read for **shape**, never written) and the fork's `docs/feature-requests/multi-document-store-config.md`. **No `[READ]` claim is made of a file this pass did not open.**
4. **This file is DERIVATIVE: it authors no ruling and no policy row.** Every normative clause is traceable to `A-1`…`A-8` (`§8`), and **the two `[DECL]` seam shapes (`§3.5`) are declared AS the fork's, not as this repo's.**
5. **The `H-r6` handoff note is `OWED` and its absence leaves the unit INCOMPLETE against `docs/next-steps.md`'s `H3` row** (`§6.3`) — stated here as well as there, so a reader of this file alone sees the gap. **⟶ RECONCILED 2026-10-03 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW; `D-3`): THE `OWED` CLOSES — the note half is LANDED and this item's *"leaves the unit INCOMPLETE"* clause is SPENT FOR THE NOTE HALF ONLY; the FORK's own `src/main/**` re-route stays `OWED` (`§0.1` item 9). THE AS-FILED `OWED` FORM ABOVE IS KEPT VISIBLE (`RCA-8(d)` ANNOTATE-BESIDE).** **⟶ LANDED 2026-10-03 (THE GATE-5 BLIND-GREENS PASS'S FINDING `D-3`; `RCA-8(d)` ANNOTATE-BESIDE — the as-filed `OWED` marker above is KEPT VISIBLE and this clause is the operative reading): THE NOTE IS WRITTEN** — `docs/FORKER.md` §4's block **THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE**, seven clauses (i)–(vii), carrying `§2`'s rule, `§3`'s shape, `§4`'s multi-store expression, `§5`'s migration contract and the `OWED` marker for the fork's own half. **The unit is therefore NOT incomplete on that ground;** what remains OWED is the FORK's own `src/main/**` re-route (`H-r6`).

---

## 8. Cross-references and citations (by §/row id)

### 8.1 Authorities cited (each with the site, never a line number)

| Citation | Where cited in this file |
| --- | --- |
| `docs/decisions.md` — ACTIVE row **`H3` (`U-FORK-STORE-READS`) IS A RE-ROUTE, NOT AN EXEMPTION** (2026-10-03) | `§0` `A-1` · `§1.1` · `§3.3` · `§6.2` prohibition 1 · `§6.2` prohibition 5 |
| `docs/specs/mcp-endpoint.md` **§6.4** (the `P-16` site) · **§6.1** · **§6.2** · **§6.3** · **§6.5** | `§0` `A-2` · `§2.1` · `§2.4` item 4 · `§3.2` row 7 · `§5.3` item 8 |
| `docs/specs/mcp-endpoint.md` **§3**, **§3.1**, **§3.2**, **§3.3**, **§3.4**, **§3.5**, **§3.6**, **§3.7**, **§7** (`P-E2`, `P-E3`, `P-E5`, `P-E6`, `P-E7`), **§8** | `§0` `A-2` · `§2.1` · `§2.3` half 2 · `§2.4` item 5 · `§3.2` rows 1–8 · `§3.2`'s `P-E3` pin · `§5.3` item 8 |
| `docs/specs/data-ownership-model-plan.md` **§2.3** (the boundary fact) · **§2.5** (the realm table + `Y-1`/`Y-2`/`Y-3`) · **§1.8** `R-6` (the caller's spelling) · **§5.2.7** (the store-backed obligations) · **§1.1** Store 2 · **§1.7** · **§1.2** (`P-E6`'s boundary) | `§0` `A-3` · `§0` `A-4` · `§2.1` · `§2.2` · `§3.1` steps 1–2 · `§4.1` · `§4.2` · `§6.2` prohibition 4 · `§0A.3` edge `S-3` |
| `docs/pending.md` **§Q** — the `multi-document-store-config` cell (the FINDING, the PENDING-REBUILD mark, the revisit condition), the recorded PARTIAL lanes (`P-1`, `P-2`, `P-10`, `P-15`), the COMPLIANT rows (`P-7`, `P-9`, `P-17`, `P-24`, `P-33`, `P-35`/`P-36`), the two-rule re-read block, and the queued pane-drag contract | `§0` `A-5` · `§1.1` · `§2.1` · `§2.4` item 3 · `§2.4` item 5 · `§3.1` step 4 · `§3.3` clause 3 · `§5.3` items 2/3/9 · `§5.2.2` · `§6.2` prohibition 5 · `§6.4` item 3 · `§7.1` `AMB-1` |
| `docs/FORKER.md` **§4** (the fork-facing convention block; the fork-side-return rule) | `§0` `A-6` · `§0.1` · `§6.2` prohibition 3 · `§6.3` |
| `docs/specs/provident-electron-shell-chrome-handoff-review.md` **`H-r6`** (the fork-side-return convention's source of record) · **`H-r8`** (the six prohibitions) · **`H-r16`** (a foundation-owned store is a new gate that must not be smuggled in) · **`S-d4`** | `§0` `A-6` · `§6.2` · `§3.5` (seam (a)'s reason) |
| `docs/next-steps.md` — the **`H3`** row (wave-`H` queue filing) and the **`H1`**/**`H2`**/**`H4`** rows (the sibling units' boundaries) | `§0` `A-7` · `§1.2` · `§6.3` · `§7.3` item 5 |
| `docs/specs/store-core-graph-compliance-review.md` **§1 family (3)** (the discipline doc's `§3.2` claim-class set + `§3.3` authority enum ARE FILED and the duty IS IN FORCE) | `§0A.1` · `§0A.2` · `§7.1` `AMB-2` |
| `Agent Harness` `docs/specs/spec-authoring-discipline.md` **§3.2** (the closed claim-class set) · **§3.3** (the five-form authority enum) · **§6** (`SAD-C`'s decomposition row) | `§0A.1` · `§0A.2` · `§7.1` `AMB-2` — **cited by row id; the file is OUTSIDE this checkout and was not re-read here** (`AMB-2`) |
| `AGENTS.md` item **4** (the trio; docs-only changes do not trigger it) · item **10a** (the autonomy return points; the blocker class including a fork-facing compatibility break) · item **10d**/**RCA-6** (the per-unit documentation review) · item **11** (the mandatory typed register) — **11(b)** (caps, strategy ids, an un-run row is a failure), **11(g)** (the zero-row exemption) · **RCA-8(a)**/**RCA-8(c)**/**RCA-8(d)**/**RCA-8(f)** | `§0.2` · `§5.3` · `§5.5` · `§6.3` · `§7.2` item 4/5 · `§7.3` item 1 |
| `docs/next-steps.md`'s and `docs/pending.md`'s quoted unit arithmetic (`21 DONE / 3 open` UNITS = `24`; the wave-`H` blocks' `22 DONE / 7 open` UNITS = `29`) | **CITED ONLY AS THE SOURCE'S OWN READING; this file moves no count and quotes no ledger figure as its own** (`§0.3`) |
| The downstream fork's own record and surfaces (the SUBJECT) — `/media/ryanr/Shared Files/Projects/Astrographer/docs/feature-requests/multi-document-store-config.md` · `src/main/rag-store-registry.ts` · `src/main/rag-store-directory.ts` · `src/main/mcp-server.ts` · `src/renderer/sidebar-panes.ts` | `§0` `A-8` · `§0.1` · `§3.2` row 9 · `§4.2` · `§5.2` · `§5.3` items 1/2/4/6 · `§7.3` item 3 |

### 8.2 This file's own section list (for citation from later passes)

`STATUS LINE` · `§0` Scope, boundary and the zero-code posture (`§0.1` the boundary table · `§0.2` the zero-code posture + the zero-row exemption declaration · `§0.3` citation discipline) · `§0A` The claim ledger (`§0A.1` the closed five-form authority enum · `§0A.2` the closed claim-class set + its printed total · `§0A.3` the supersession pointer edges) · `§1` The unit, its ruling and its boundary (`§1.1` the ruling applied · `§1.2` one file, one concern) · `§2` The graph-carrier rule (`§2.1` `P-16` + `GCR-1` · `§2.2` what "store state" means · `§2.3` `GCR-2`/`GCR-3` · `§2.4` what the rule does not reach) · `§3` The conforming shape (`§3.1` `GCR-SHAPE-5` · `§3.2` the landed seams · `§3.3` the exemption arm NOT taken · `§3.4` where the multi-store dimension enters · `§3.5` the two seams that must be ADDED, by the fork) · `§4` The multi-store dimension (`§4.1` `GCR-4` · `§4.2` `GCR-5` + the fork's four resolution states · `§4.3` the four-step migration order) · `§5` The migration/coexistence contract (`§5.1` the invariants `MIG-1`…`MIG-4` · `§5.2` coexistence + `§5.2.1` detectability + `§5.2.2` the cutover · `§5.3` what must NOT change · `§5.4` the old path's disposition) · `§6` Refusal posture and prohibitions (`§6.1` `GCR-6` · `§6.2` the five prohibitions · `§6.3` the `OWED` handoff note · `§6.4` the four further non-effects) · `§7` Honest statements and ambiguity record (`§7.1` `AMB-1`…`AMB-5` · `§7.2` stop conditions · `§7.3` honest statements) · `§8` Cross-references and citations (`§8.1` the authority table · `§8.2` this section list)

### 8.3 This file's own row-id index (so a TestWriter can address every row)

| Prefix | Range | What it is | Where |
| --- | --- | --- | --- |
| **`GCR-*`** | `GCR-1` … `GCR-6` | This file's rule rows (`1` the carrier rule · `2` the observable · `3` the finding form · `4` the caller's spelling · `5` the single graph · `6` the error-surface rule) | `§2.1`, `§2.3` (×2), `§4.1`, `§4.2`, `§6.1` |
| **`GCR-SHAPE-5`** | — | The five-step conforming shape | `§3.1` |
| **`INV-*`** | `INV-1` … `INV-5` | The invariants at shape steps 1–5 | `§3.1` |
| **`MIG-*`** | `MIG-1` … `MIG-4` | The migration invariants at the four ordered steps | `§4.3`, `§5.1` |
| **`S-*`** | `S-1` … `S-5` | The supersession pointer edges | `§0A.3` |
| **`AMB-*`** | `AMB-1` … `AMB-5` | The ambiguity record | `§7.1` |

**The row-id index's own count, printed with its terms: `GCR-*` `6` + `GCR-SHAPE-5` `1` + `INV-*` `5` + `MIG-*` `4` + `S-*` `5` + `AMB-*` `5` = `26` addressable rows.** **`6 + 1 + 5 + 4 + 5 + 5 = 26` ✓.**

---

## 5.5 Typed Property register — **RECORDED ZERO-ROW EXEMPTION (DECLARED, JUSTIFIED, NOT SILENT)** — with the exemption's own conditions

*(**Numbering note, stated so no reader is lost: this section's number `5.5` is the REPO'S STANDING REGISTER SLOT** — carried by `docs/specs/engine-pin.md` `§5.5`, `docs/specs/projection.md` `§5.5`, `docs/specs/listhost.md` `§5.5.1`, `docs/specs/ci-ui-leg.md` `§5.5` and every sibling — **and it is placed after `§8` in this file because `§5` here is the migration contract, not a wiring section.** **The `§5.5` slot is a CITATION ANCHOR, not a member of this file's `5.x` sequence: this file has no other `5.x` member, nothing is renumbered by the placement, and a later pass may move the block into numeric order only by RE-POINTING every citation — which this pass does not do.**)*

**`H-r4` obliges an explicit zero-row / typed register decision per unit, and `H-r4` requires the spec to state that this repo has NO PBT harness** — the same statement `docs/specs/engine-pin.md` §5.5, `docs/specs/engine-drift.md` §5.5 and `docs/specs/ci-ui-leg.md` §5.5 carry: **THIS REPO HAS NO PBT HARNESS, and no dependency is added by this unit.**

**THE EXEMPTION, DECLARED AS `AGENTS.md` item 11(g) requires (`§0.2` carries the characterisation; this is the block):** the zero-row exemption survives *"only for genuinely invariant-free / doc-only / config-only / non-JS units, stated as such in the spec"*, is *"never a silent default"*, and is *"not available to a code-bearing unit"*. **THIS UNIT IS DOC-ONLY IN THIS REPO** — it authors **no `src/**` byte, no test, no JS artifact of any kind**, and it runs no leg (`§0.2`, `§7.3` item 1). **The exemption is therefore AVAILABLE and is TAKEN, and it is stated as such — never by default.** **Compare the standard it is judged by: `docs/specs/projection.md` §5.5's own re-derivation pass found the exemption UNAVAILABLE there because that unit is code-bearing (eight exports, a red set, a property-bearing test file). THIS unit has none of those, so the opposite determination follows from the same rule.**

| Question the register exists to answer | This unit's answer |
| --- | --- |
| Are there rows here that a **property** would express better than a table? | **No — and not by effort.** This unit's subject is a **ROUTING RULE over another project's implementation** (`AMB-3`). Its claims are **normative clauses about a shape** (`GCR-1`…`GCR-6`, `GCR-SHAPE-5`, `INV-1`…`INV-5`, `MIG-1`…`MIG-4`), and **a property layer over a shape nobody in this repo implements would be a property over an EMPTY population** — `AMB-3` records that this repo holds no instrument over the fork's tree. |
| Could this unit execute a table-driven property **as a property**? | **No, and not because of effort.** Every quantification this file states is **over the fork's bytes** (`GCR-2`'s three halves, `GCR-3`'s four elements, `MIG-1`…`MIG-4`), and **no `src/**` artifact of this repo implements any of them** — so any "attempt" would be a citation comparison, not an execution. **Reporting such a comparison as an executed property row would MISREPORT its evidence class** — exactly what `AGENTS.md` item 11(b)'s *"an un-run register row is reported as a FAILURE, never as a pass"* exists to prevent. |
| Do the layers permit a property run here? | **No.** This unit declares **no layer**: there is no `[T]` subject (no module), no `[H]` subject (no host wiring), no `[U]` subject (no rendered surface) and no `[D]` subject (no Electron leg) that this unit owns. **A property needs a subject on a layer this repo owns, and this unit has none** (`H-r8` prohibition 6's own discipline: *"no criterion unverifiable on a layer this repo owns"* — here, **no criterion at all**). |
| How are this file's fixed comparisons executed? | **They are not, and this file does not pretend otherwise.** The file's checkable content is its **citation set** (`§8.1`) and its **row-id index** (`§8.3`): a reviewer can verify **that every cited §/row id exists at the site named** — a citation audit, not a property run. **`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS` applies to this file's own arithmetic (`§0A.2`, `§8.3`), and both totals are printed with their terms.** |

**Register count: `0` rows. Not "`0` executed" — `0` ROWS, DECLARED.** The honest statements that replace a register:

1. **No row of this unit may be reported as "executed" if it was not** — and **there are no rows to report.** A later pass reporting *"`U-FORK-STORE-READS` register: `N/N` held"* is a **review finding**, because this unit declares zero rows and executed nothing.
2. **No `fast-check` and no generator is added by this unit** — that would be a `devDependencies` change, outside this unit's diff scope (`§6.2` prohibition 2), and would need its own gate. **`AGENTS.md` item 11(d): NO new dependency, no property runner, no fourth leg.**
3. **`AGENTS.md` item 11(b)'s caps (`≤100` attempts per row · `≤400` total · stop-after-5-consecutive-failures) are VACUOUS here BY CONSTRUCTION** — `0` rows means `0` attempts, and the comparison is `0 ≤ 400` ✔ with **per-row maximum `0`** ✔. **The caps are printed so their vacuity is checkable, not assumed.**
4. **THE EXEMPTION IS CONDITIONAL, AND ITS CONDITION IS STATED: a pass that makes this unit CODE-BEARING in this repo VOIDS it** and owes the typed register **BEFORE any red set is authored** (`AGENTS.md` item 11: *"a TestWriter may not be delegated a red set under the zero-row exemption"*). **THE TRIGGER IS NAMED: the first `src/**` byte this unit's shape would require IN THIS REPO** — and `§3.5`'s determination is that **both seams the shape needs are the fork's**, so no such byte is owed **as long as `§3.5` stands.** **A pass that reverses `§3.5` (declaring either seam a foundation obligation) owes the register in the same pass as the reversal, and owes its own `D-GP-SAD-5`-shaped decomposition treatment if the register count signals a component split** (`AGENTS.md` item 11(f): the row count is an OUTCOME, not a budget, and the `≤8` threshold is a component-breakdown SIGNAL, never a ceiling).

**Register change summary: none** — this spec introduces no register row, so there is nothing to reconcile with `docs/specs/engine-pin.md` §5.5's register, `docs/specs/projection.md` §5.5.1's re-derived register, `docs/specs/listhost.md` §5.5.1 or `docs/specs/slothost.md` §5.5.1. **No id, pool, table or seed is copied from any of them** (a second authority over a landed register is a finding).

---

## The file-end note (the one thing a reader of only the last line must take away)

**`U-FORK-STORE-READS` (`H3`) lands ONE rule and ONE shape in THIS repo — `GCR-1`'s graph-carrier rule (`§2.1`) and `GCR-SHAPE-5` (`§3.1`) — plus the per-store expression (`§4.1`/`§4.2`), the migration contract (`§5`) and the prohibitions (`§6.2`). THE FORK'S OWN `src/main/**` RE-ROUTE IS THE FORK'S PASS (`H-r6`; this repo writes NO file under `<Astrographer>/`) AND IS RECORDED `OWED`. THE `docs/FORKER.md` §4 HANDOFF NOTE IS `OWED` (`§6.3`). **⟶ RECONCILED 2026-10-03 (THE GATE-8 PER-UNIT DOCUMENTATION REVIEW, finding `D-3`): THE HANDOFF NOTE HALF IS `LANDED` — `docs/FORKER.md` §4's block THE STORE-ADDRESSED MCP READS — WHAT A FORK MUST RE-ROUTE, seven clauses (i)–(vii); the `OWED` token above is KEPT VISIBLE and this clause is the OPERATIVE READING. ONLY THE FORK'S OWN `src/main/**` RE-ROUTE REMAINS `OWED` (`§0.1` item 9, `H-r6`).** NO `src/**` BYTE, NO TEST, NO LEG, NO LEDGER MOVE AND NO TRACKER EDIT LANDS HERE. THE TYPED REGISTER AT `§5.5` IS A DECLARED, JUSTIFIED ZERO-ROW EXEMPTION — AVAILABLE BECAUSE THIS UNIT IS DOC-ONLY HERE, AND VOIDED THE MOMENT IT IS NOT.**
