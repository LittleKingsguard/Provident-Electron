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

---

## §5 — THE ARCHITECT'S ANSWERS TO THE GATE-1 BUBBLE (`R5`..`R8`, added 2026-10-08; §1–§4 STAND BYTE-FOR-BYTE)

**`RCA-8(d)` ANNOTATE-BESIDE.** The gate's own record (`docs/specs/store-constraint-rederivation-review.md` §5, the dispositioned `D-GP-SAD-5` row) bubbled **five questions** to the architect. **Four are answered below, in the architect's own selections, quoted verbatim as the answers' own labels; one — the read's case set — is answered `Elaborate`, i.e. the architect asked this filing's author to set the readings and their consequences out before ruling, and THAT QUESTION STANDS OPEN.** The lettering `R5`..`R8` is this filing's, for citation only.

- **`R5` — THE SCOPE. `"REPLACE — full re-derivation from C1–C24"`.** The re-derivation **REPLACES** the filed store family: the successor contract derives from `C1`..`C24` (with `R1`..`R4`) **alone**, and the corpus's clause-level conformances do not carry over. **Consequences stated, not softened:** the invalidated evidence is annotated `STALE PENDING <successor> §n` and **never deleted**; the successor's surface **moves the frozen field 2**, so a **re-freeze** is owed with its amendment row naming the successor clause and the module wave's own gate 3/4 re-cycle; and **the architect admits the rows this forces** (`RCA-8(f)`) — no pass may re-open a `DONE` row or move a ledger count on its own.
- **`R6` — THE TIER CARRIER (architect-against-architect pair 1, RESOLVED). `"C15 governs — tier is a write parameter; supersede round-2 B-1"`.** `C15`'s form governs: **a write REQUIRES a tier as a parameter; a read OPTIONALLY accepts one**; and the round-2 answer `B-1` (*"A tier segment is an EXPLICIT QUALIFIER only"*) is **SUPERSEDED** — its supersession is the architect's, recorded here in his words, and the annotation beside `B-1` at `docs/specs/data-ownership-model-plan.md` is owed to the pass that next touches that file.
- **`R7` — `temp`'s ROLLBACK. `"Automatic — dropping the temp node restores the retained lower-tier state"`.** No new store-level verb is created: `C9`'s rollback **is** the retained lower-tier instance, and **no purge may delete the retained lower copy while a `temp` instance of the address stands** (`C19`'s purge is thereby bounded by `C9`'s retention — the pair the record carried as `S-20`/`D8`).
- **`R8` — `C7`'s RESIDUAL. `"All file-tier mutations, observed as a returned typed record"`.** Every file-tier mutation — `set`-class writes, `remove`-class removals, subtree overwrites and the boot hydration's write-back — is subject to the commit duty; a failure to save is answered **to the caller as a returned typed record** (never a throw, never a swallowed status), and the operation **does not land** (`R3`'s rollback).
- **THE READ'S CASE SET (pair 2) — `"Elaborate"`, AND IT REMAINS OPEN.** The architect asked for the readings and their consequences to be set out before he rules; that elaboration was delivered to him by the supervisor in the same pass, and **no reading is taken here**.

**WHAT THIS §5 DOES NOT DO.** It does not soften `C1`..`C24`, does not widen `R1`..`R4`, admits no unit, moves no ledger count and re-freezes no artifact; it records the architect's own answers and the one question he left open.

---

## §6 — THE ARCHITECT'S RULING ON THE READ, AND THE MONOTONIC-PERSISTENCE INVARIANT (`R9`, added 2026-10-08; §1–§5 STAND BYTE-FOR-BYTE)

**`RCA-8(d)` ANNOTATE-BESIDE.** This closes the gate's fifth bubbled question (**architect-against-architect pair 2**). It is the architect's own words, verbatim and unedited:

- **`R9` — THE READ'S CASE SET AND THE PERSISTENCE ORDER.** *"If a specific tier is passed, read that tier specifically. Otherwise, read the lowest-persistence node at the targeted address and all downstream addresses when assembling. Note: a node cannot have a higher persistence than its parent (ex. 'window.tabs.landingPage' cannot be in `file` if 'window' is in `mem`)"*

**WHAT IT SETTLES, stated so nothing is re-derived from it:**
1. **A TIER-QUALIFIED READ HAS NO FALLBACK.** A read carrying a tier reads **that tier specifically**; an address that tier does not hold is `C17`'s verbose error, never a lower-tier answer.
2. **AN UNQUALIFIED READ ASSEMBLES PER NODE.** It takes **the lowest-persistence node at the addressed address and at every downstream address** — so a `temp` (or `mem`) instance of a *descendant* is visible to a read of its ancestor. **This is the rule `C9`'s test-before-commit purpose needs, and `R7`'s automatic rollback falls out of it unchanged.**
3. **THE PERSISTENCE ORDER IS NOW STATED, AND IT IS MONOTONIC.** `file` > `mem` > `temp` (with `secure` **outside** every ordering — `C6`'s separate graph, separate functions, separate file), and **a node may not be more persistent than its parent** — the invariant the corpus carried as *"a node cannot have higher persistence than its parent"* and which `C19`/`C20`/`C21` presuppose. **The successor contract MUST carry it as a clause of its own**, not as a premise.
4. **NO `parts` MEMBER IS CREATED BY THIS RULING.** The round-3 merged-read arm's provenance list is **not** part of the answer; the successor contract's read shape is `C21`'s object alone, with the tier mix implicit in the per-node rule above **and the tier-qualified read available as the way to ask about one tier deliberately**. *(Recorded as the successor's DECLARED DEFAULT, reversible by the architect at its spec gate.)*
5. **IT CONFIRMS THE CONSUMED CORPUS CLAUSE AND SUPERSEDES NOTHING ELSE.** The monotonic rule matches the operative contract's already-ruled invariant; **the `C15`/`B-1` supersession stands as §5 `R6` recorded it**, and no other clause moves.

**WHAT THIS §6 DOES NOT DO.** It admits no unit, re-opens no `DONE` row, re-freezes no artifact, moves no ledger count, and softens nothing in `C1`..`C24` or `R1`..`R8`.

---

## §7 — THE TOMBSTONE ADDITION (`R10`, added 2026-10-08; §1–§6 STAND BYTE-FOR-BYTE)

**`RCA-8(d)` ANNOTATE-BESIDE.** The architect's own words again, verbatim and unedited:

- **`R10` — TOMBSTONING NODES ON WRITE.** *"Addition: Write needs to be able to tombstone nodes, ex. tombstoning a `mem` node on a write to `temp` prevents it from being read until the temp node is cleared, unless the read is scoped to `mem`. This can be used to soft-delete nodes. Tombstoning at file tier omits it from the saved file, which will delete the node on commit."*

**WHAT IT ADDS, IN THE ARCHITECT'S OWN TERMS — no more and no less:** a **write may tombstone** a node, i.e. carry a deletion marker as part of that write; the tombstone's effect is **suppression of reads of the tombstoned node while the carrying node stands** (`temp` tombstones a `mem` node ⇒ that `mem` node is unreadable until the `temp` node is cleared), **except that a read scoped to the tombstoned node's own tier still reads it** (the `mem`-scoped read in his example); it is the instrument for **soft-delete**; and **a tombstone carried at the `file` tier omits the node from the saved file, deleting it on commit.**

**WHY IT IS FILED HERE RATHER THAN ADJUDICATED.** It is a **new constraint on the store**, so it is the architect's to state (he has) and the successor contract's to derive (it may not); it **interacts with `C19`/`C20`/`C21`/`R7`/`R9`** — the purge rule, the lower-tier write rule, the per-address lowest-persistence assembly and `temp`'s automatic rollback — and **the interactions are set out as readings for the architect in the same pass as this filing**, not taken here.

**WHAT THIS §7 DOES NOT DO.** It admits no unit, re-opens no `DONE` row, re-freezes no artifact, moves no ledger count, and softens nothing in `C1`..`C24` or `R1`..`R9`.

---

## §8 — THE TOMBSTONE READ SEMANTICS, THE FILE-TIER LIFECYCLE, AND THE ADMISSION DISPOSITION (`R11`·`R12`, added 2026-10-08; §1–§7 STAND BYTE-FOR-BYTE)

**`RCA-8(d)` ANNOTATE-BESIDE.** The architect's own words and selection, verbatim:

- **`R11` — WHAT A READ ANSWERS AT A TOMBSTONE.** *"The tombstone is invisible to the read - a `temp` tombstone hides the `mem` node *and* doesn't return on the read, because it represents deleted data. The read does not propagate through the tombstone"*
- **`R12` — THE FILE-TIER TOMBSTONE'S LIFECYCLE.** *"Tombstone in memory → node removed on successful commit, rolled back on failure"* (the architect's selection among the readings offered: the tombstone stands in memory; a successful commit removes the node from the graph as well as from the file; a failed save rolls the tombstone back and leaves the node intact — `R3`/`R8`: the operation does not land).
- **THE ADMISSION DISPOSITION.** *"Hold admission — author the contract first and admit the row at its spec gate"* (the architect's selection): **no unit row is admitted by this filing**; the successor **contract is authored under this proposal's authority**, and **the row is admitted at its own spec gate**, which remains **the architect's approval point** (`AGENTS.md` item 10a; `RCA-8(f)`: the architect admits rows).

**WHAT `R11` SETTLES:** a **tombstone is never returned as data** — it does not appear in a transcription — **it hides the tombstoned node, and the read does not propagate through it**: there is **no fall-through to a lower-persistence copy of the same address** and **no descent through the tombstone into its subtree**, because the tombstone **represents deleted data**. **`R10`'s tier-scoped read stands beside this**: a read scoped to the tombstoned node's own tier still reads it (the `mem`-scoped read of `R10`'s own example), which is how a consumer inspects the retained state behind a soft delete.

**WHAT THESE §§ DO NOT DO.** They admit no unit, re-open no `DONE` row, re-freeze no artifact, move no ledger count, and soften nothing in `C1`..`C24` or `R1`..`R10`.
