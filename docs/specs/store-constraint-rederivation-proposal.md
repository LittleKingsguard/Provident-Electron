# PROPOSAL — the store's AUTHORIZED design constraints (the architect's own re-statement), and the finding that the filed store contract family is poisoned by constraints that were never ruled

**A PROPOSAL FOR THE PROPOSAL GATE. NOT A CONTRACT.** This file pins **no behaviour, no signature, no return shape and no fail-state**, and **nothing may be delegated, specified, built or tested from it** until gate 1 (validity ∥ critique → architecture review → change analysis) has passed **and the architect has approved it** — at which point the re-derivation is the architect's to rule and the contract is the spec writer's to write (`AGENTS.md` item 8). **THE VERDICT VOCABULARY, BOTH SITES, because the repo's records print both:** the **gate's closed vocabulary** is `PROCEED | APPROVE-WITH-CONDITIONS | BLOCKED-ON-SEMANTICS | FLAWED | REJECTED`, and **this repo's in-force word set is `DELEGABLE` / `DELEGABLE-WITH-CONDITIONS` / `NOT-DELEGABLE`**. **This file carries neither word: it is the artifact the gate reviews, and it asserts no verdict about itself.**

**FILED 2026-10-08 (machine clock) against git `HEAD` `1f41c4c` by the supervisor, FROM THE ARCHITECT'S OWN WORDS, transcribed verbatim and unedited.** The C-numbers are **the filing's own, added for citation only**; the numbering, the headings and the bold emphasis are the filing's, **the sentences are the architect's**. **The transcription, not any interpretation of it, is what the gate reviews.**

**THE CLAIM UNDER REVIEW, IN THE ARCHITECT'S OWN WORDS (§1) — the filed store contract family (`docs/specs/store-core.md` · `store-node-graph-proposal.md` · `store-core-graph.md` · `store-persist.md` · `store-security.md` · `store-focus.md` · `store-tabs-record.md` · the `S`-wave secure/tier-4 family · the plan `docs/specs/data-ownership-model-plan.md`) is poisoned by unnecessary constraints that were hallucinated into the original spec.** **§2 is the authorized constraint set that replaces them.**

---

## §1 — THE DIRECTIVE, verbatim

> Consider the entire store change poisoned by unnecessary constraints that were hallucinated into the original spec

## §2 — THE ACTUAL DESIGN CONSTRAINTS, verbatim

### §2.1 — the store's access rules

- **C1** — "data is accessed and modified by store-level functions."
- **C2** — "Read does not return original data, but returns a deep copy to ensure that writes *only* happen by explicit function call, not by reference."
- **C3** — "Writes mint new nodes/links/anchors to contain the primitive values contained by the received object, never providing a reference as value."
- **C4** — "Nodes are not mutable - writes discard and remint new nodes"

### §2.2 — the four tiers

- **C5** — "four tiers (secure, file, mem, temp)"
- **C6** — "secure is a separate graph, accessed by separate functions, and saves to a separate file. It cannot be accessed unless the MCP server is blocked. For all other purposes, it follows the same constraints as `file`"
- **C7** — "file is synchronized to a JSON file. Any failure to commit the JSON file to exactly match the data state of the file-level graph should cause the data operation modifying the file level to fail verbosely. I mean it. Any failure, on any modification. No exceptions."
- **C8** — "Mem is retained for the application session, but lost on app closure."
- **C9** — "Temp has the same behavior as mem, and is separate for policy reasons. Temp is meant to be used to contain pre-committed values for changes so that they can be tested, with easy rollback to a persistent state by retaining the state on the lower tier."

### §2.3 — the graph structures

- **C10** — "Stores are node/anchor/link tree structures, following the architectural pattern of the provident graph."
- **C11** — "nodes store the literals they are written with and the tier of the store they are in (file, mem, or temp - secure is determined by being in an isolated graph). Any properties that refer to other objects are replaced by `parent` anchors (i.e. an anchor that marks them as the parent side of a link)"
- **C12** — "anchors are the interface between nodes and links. They contain their parent and link references, their type (parent/child) and their child order/key. The child order/key is read when condensing the graph into an array/dict on save or read."
- **C13** — "Links can contain constraint functions, which can take the current state, the prospective future state, and the changed node as parameters, perform a logical check (ex. exactly one tab node is marked `active`) and return true (state is valid) or invoke a repair function (ex. most recent active tab is marked 'active') or return false with an error message explaining the constraint violation."
- **C14** — "Register contains root nodes of trees. It has the functionality of a link, without having a distinct parent."

### §2.4 — the address space

- **C15** — "Read and write require an address (ex. window.tabs.landingPage). Write additionally *requires* a tier, while read optionally accepts one."
- **C16** — "Address is walked upwards from the register (ex. Register is checked for node named 'window', node is checked for anchor at property 'tabs', associated link is checked for node named, 'landingPage')"
- **C17** — "If an address is unreachable (ex. no anchor at 'window.tabs'), return verbose error"
- **C18** — "If a write points to a node that could exist, but doesn't (ex. window.tabs exists, but link has no `landingPage` child), it adds the written data, using that address as its entry (ex. if it is passed data = {active: true, contents: {...}}, the node will contain active: true and a parent anchor for a link to the 'contents' object"
- **C19** — "If a write points to a node that already has data, that data and its descendant tree is overwritten. After successfully writing data (including file sync, if writing to the file tier), any lower-persistence instances of that address are purged."
- **C20** — "If a write resolves to an address that already has a node, but is targeted at a lower persistence tier (ex. existing node is `file` but write is for `temp`) write proceeds as if empty."
- **C21** — "A read transcribes the tree descended from the addressed node into an object, taking the lowest-persistence version of any given node (More than one node sharing both an address and a tier should be forbidden by store-write function logic)"

### §2.5 — the event surface

- **C22** — "event listeners are used to rerun functions that collect and use stored data. (ex. the zone render process retrieves the pane information for its zone, so it can re-render on any change)"
- **C23** — "an event listener can be unattached (waiting for an address that is currently unreachable) or attached to its target node"
- **C24** — "On startup, event listeners are added before the store is loaded from file. This lets them trigger when the data is fully loaded."

---

## §3 — WHAT THIS FILE ASSERTS, AND WHAT IT DOES NOT

1. **IT ASSERTS NOTHING ABOUT THE CORPUS.** §1 is the architect's claim; §2 is the authorized constraint set. **Which filed clauses are hallucinated, which are merely unsourced, and what each costs to unwind is the GATE'S finding, not this file's** — this file is the artifact the gate reviews, and a filing that pre-judged its own review would be a filing defect at this gate.
2. **IT ADDS NO REQUIREMENT.** No constraint in §2 is softened, widened or supplemented here; the transcription carries no "and therefore" of its own.
3. **IT MOVES NO EXISTING BYTE, CITATION OR COUNT.** No spec, tracker, decision row, digest, seal or ledger count is edited, superseded, re-frozen or re-opened by this filing. **Every filed artifact named in the header stands byte-for-byte as it was filed**, including its authority blocks, its registers, its DONE rows and its frozen pins (`sha256:29772ac7…` span digest; the file pins `0664c52f…` / `5c0c1a97…`).
4. **THE GATE'S READ-ONLY INPUTS.** The gate's step-1/step-2 evidence base is the eight-group read-only constraint inventory at `archive/gate1/store-constraint-inventory/` (**`A-store-core.md`** · **`B1-node-graph-proposal.md`** · **`B2-store-core-graph.md`** · **`C-ownership-plan.md`** · **`D-tiers-persist-secure.md`** · **`E-consumers.md`** · **`F-foundation-modules-exclusion.md`** · **`G-landed-code.md`**), each classifying the corpus's own clauses against C1..C24 as `CONFORMS` / `CONTRADICTS` / `INVENTED` / `SILENT-ON-Cn`. **Those files are provenance (the `archive/` tree is gitignored by this repo's convention); the gate-1 record is the citable synthesis.**
5. **NO CODE TASK IS DELEGABLE FROM THIS FILE**, and no red set may be authored under it: **the spec gate after gate 1 is the architect's approval point** (`AGENTS.md` item 10a).

---

## §4 — THE ARCHITECT'S SECOND SET OF RULINGS, verbatim (`R1`..`R4`, added 2026-10-08 while gate 1 was running)

**§1, §2 AND §3 STAND BYTE-FOR-BYTE (`RCA-8(d)` ANNOTATE-BESIDE).** The clauses below are **appended**, not merged: they are the architect's own words, transcribed verbatim and unedited, in the order received, lettered **`R1`..`R4`** by this filing for citation only. **This filing asserts nothing about them either**; which of the gate's open semantics each one closes, and which of the corpus's clauses each one strikes, is **the gate's finding** — the place it is recorded is the gate-1 record's Semantics block and findings, never this transcription.

### §4.1 — the general-purpose ruling

- **R1** — "Importantly: This is a *general purpose tool*. It will be used in multiple downstream use cases and forked projects. DO NOT add additional constraints meant to restrict this to provided example scenarios like the tab management."

### §4.2 — the named instances of previously hallucinated constraints

- **R2** — "`Secure` needs to be able to store arbitrary data, potentially at runtime. DO NOT construct an address or value whitelist"
- **R3** — "The current state of the `file` tier must *always* be representative of the current saved state, and roll back on failure to save."
- **R4** — "Constraints are an extensible tool - modules must be able to add additional constraints and repair functions. DO NOT add built-in constraint functions"

### §4.3 — what §4 does and does not do

1. **IT ADDS NO MECHANISM.** `R1`..`R4` are prohibitions and one state duty, stated in the architect's own words; the filing neither softens nor widens them.
2. **IT MOVES NO EXISTING BYTE, CITATION, DIGEST OR COUNT** — the same bound §3 item 3 states, re-stated here because §4 lands after it.
3. **THE GATE'S TWO EARLIER RETURNS STAND AS FILED** (`archive/gate1/store-constraint-review/1-validity.md` · `2-critique.md` · `3-architecture.md`): `R1`..`R4` were not available to them, and none of their findings is withdrawn or re-scored by this filing.
4. **THE SPEC GATE REMAINS THE ARCHITECT'S APPROVAL POINT** (`AGENTS.md` item 10a): a ruling is not a contract, and no red set may be authored from this file.
