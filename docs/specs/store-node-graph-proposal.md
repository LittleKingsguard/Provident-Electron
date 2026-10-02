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

### §0.4 ⟶ ROUND 2 (2026-10-01) — THE ARCHITECT'S EIGHT ANSWERS, FOLDED IN, WITH THE SECTION THAT CARRIES EACH

**WHAT THIS BLOCK IS, AND WHAT THIS PASS DID.** **The gate-1 pair returned `BLOCKED-ON-SEMANTICS` / `FLAWED`
(`archive/gate1/2026-10-01-STORE-NODE-GRAPH-gate1-step1-validity.md` `§1`; `…-step2-critique.md` `§1`), and **the
architect has now answered eight mechanism-level questions** — the source of truth, deletion and persistence,
concurrency and orphans, the tier segment's meaning, commit regeneration, the caches, the caps, and `R-9`'s scope. **This
round folds all eight in, IN THIS FILE'S OWN VOICE, and dispositions every finding the two reports filed** (`§12`), with
the clauses still undecided raised as DECISION REQUESTS with options, costs and a recommendation (`§13`). **NOTHING ELSE
CHANGED: this pass edited exactly ONE file — this one — and its every removed byte is present inside its replacement,
beside a dated annotation (`RCA-8(d)`), so the as-filed text stays visible.** **The held contract, its dossier, the plan,
the trackers, `AGENTS.md`, `package.json`, every script and every config are UNTOUCHED; no unit's status moved; no ledger
count moved; no red set was authored; no register row was executed; no leg ran; no commit was made.** **AND THIS FILE STILL
CARRIES NO VERDICT ABOUT ITSELF: the round-2 answers are RULINGS FOLDED IN, not a verdict, and any verdict is the gate's
own closed vocabulary's (`§0`'s two-site rule).**

| # | The architect's answer, in one line | The section that carries it folded in |
| **A** | **THE GRAPH IS THE SOURCE OF TRUTH, WITH INTERNAL CACHING FOR TRAVERSAL SPEED** — the tier collections are **views** of the graph rather than a second copy; the winner is declared **per relation** (value residency · address resolution · deletion) with the operation that rewrites the loser named for each | `§0.4` `A-A` · `§2.1` (the structures) · `§2.4` row 1/row 2 (the register and the collections as views) · `§3(c)` (`D-DEL`) · `§4.1` (the `parts` premise, now conditional) |
| **B** | **DELETION AND PERSISTENCE: a severed `file`-tier node is DELETED, and on the write to file the store TRANSLATES THE GRAPH TO STABLE JSON** | `§0.4` `A-B` · `§3(c)(i)` (the severance) · `§3(c)(iv)` item 3 (the crash window, re-stated) |
| **C** | **CONCURRENCY AND ORPHANS: the JS process is single-threaded, so an in-flight parent-chain rewrite is a minimal concern; if it happens through async and/or caching, A WRITE TO AN ORPHANED REFERENCE FAILS — LOUDLY. NO PIN SET IS REQUIRED** | `§0.4` `A-C` · `§3(c)(iii)` (the superseded fifth structure) · `§4.2` cost 3 (the structure count) · `§6` `R12` |
| **D** | **THE TIER SEGMENT IS A FILTER, NOT PART OF THE NAME** — the leaf stores its own LOCAL name, the tier token is the FLAG THE RESOLUTION FILTERS ON, and a failed resolution returns a VERBOSE DIAGNOSTIC naming the failing step | `§0.4` `A-D` · `§2.2` item 4 · `§2.3` (the walk, four failure arms) · `§5.1` (`D`'s arms) · `§5.2` item 4 |
| **E** | **COMMIT REGENERATION re-tiers the WHOLE SUBTREE as a declared TRANSACTION — propagate through the whole subtree, THEN delete the original ONCE THE CENSUS MATCHES** | `§0.4` `A-E` · `§5.1` `J`/`J2` · `§5.1` item 6 · `§2.2` item 4 |
| **F** | **THE CACHES: the register cache and the per-link cache, each a `name → lowest-durability match` DICTIONARY; invalidated on any register change or any change to a link's anchor set; ANCHORS ARE IMMUTABLE and re-parenting = delete + mint** | `§0.4` `A-F` · `§2.1` row 3 (the link's cache) · `§3(c)` (`D-DEL`) · `§4.2` cost 2 · `§9` `RISK 2` |
| **G** | **THE CAPS: the TOP-LEVEL REGISTER HAS CAPS, and REACHABILITY REPLACES WITHIN THE GRAPH** | `§0.4` `A-G` · `§5.2` item 6 · `§6` `R11` · `§4.2` cost 4 |
| **H** | **`R-9`'s SCOPE IS RULED: the clause bans a GLOBAL ENGINE-ID-KEYED map, not a PER-LINK target set keyed by name — with the argument MADE, its own gate, its own decisions row and an amendment row in the held contract at that gate** | `§0.4` `A-H` · `§3(a)` (Collision 1, replaced) · `§6` `R5` · `§7.2` option (a) |
**A-A — THE SOURCE OF TRUTH, ANSWERED BY THE ARCHITECT, AND WHAT FOLLOWS FROM IT.** **The answer, in the architect's own
words: *"In this revision the graph is the source of truth, with internal caching for traversal speed."*** **FOLDED IN, and
its consequences stated rather than left to a reader: (1) THE TIER COLLECTIONS ARE **VIEWS** OF THE GRAPH — a `file`/`mem`/
`temp`/`secure` collection is a membership predicate over the graph (the node's own tier flag), NOT a second copy of what
the graph holds, so the reading `§2.4` row 2's alternative (b) offered ("tables whose entries are node references", i.e. the
node set as a **second** copy) is **NOT the answer taken** and stays visible as the superseded alternative; (2) THE
STRUCTURES' STATUSES are therefore: the graph is the **authority**, the collections and the per-tier tries are **views and
indexes over it**, and `TopLevelRegister` (`§2.1` row 4) is the graph's own **top-level projection** — which is what makes
*"register only needs to count top-level items"* checkable (the register's row count equals the parentless-node count, §2.4
row 1); (3) THE WINNER IS DECLARED **PER RELATION, NEVER ONCE** — the critique's `§3-1` requires exactly that, and the
three relations are below.**
**THE THREE RELATIONS, EACH WITH ITS WINNER AND THE OPERATION THAT REWRITES THE LOSER.** **A graph/collection/trie
disagreement is the class the held contract already reddens for the trie alone (`docs/specs/store-core.md` `§3.4` `R-14` —
*"a trie that disagrees with its own table is a FAILURE"*), so the winner is named here for each of the three, and each
row's loser is rewritten by a NAMED operation rather than by a background reconciliation.**

| # | The relation | **WHAT WINS** | **WHAT LOSES, AND THE OPERATION THAT REWRITES IT** |
| **`D-RES`** | **VALUE RESIDENCY** — which tier a value lives in | **THE NODE'S OWN `type` FLAG (the graph).** A node's tier is a property of the LOCATION; the name's first segment is a **filter the walk applies** (`A-D`), never a second residency authority | **the tier collections (views by construction — nothing to rewrite) and the per-tier tries.** The loser is rewritten by **the tier's own mutating operation, in the same synchronous step** — the held rule the amendment KEEPS verbatim (`store-core.md` `§2.7` item 2: *"`set`/`commit` insert or mark a leaf; `remove`/`clear` unmark it AND PRUNE"*, *"NO OTHER SITE MAINTAINS IT"*) |
| **`D-ADDR`** | **ADDRESS RESOLUTION** — what a dotted name resolves to | **THE GRAPH'S ANCHOR → LINK → TARGET WALK.** A name is resolved by traversing the graph, not by looking a whole logical path up in a per-tier table (§1 `M-1`) | **the per-tier trie, as an index**: it answers `holdsExact`/`holdsDescendantBelow` for the collection it indexes and **is never consulted for identity**. A row that resolves a NAME from a trie FAILS; the trie is rewritten by the same tier-local mutators as `D-RES` |
| **`D-DEL`** | **DELETION** — what removes a node | **THE GRAPH'S REACHABILITY (the link set) plus the two landed operation paths** — `commit`-clears-lower (`store-core.md` `§2.10` item 1) and `remove`'s downward clear (`§2.10` item 3, the ruling `R3-6`) — **and, for a `file`-flagged node, the TRANSLATED STABLE-JSON WRITE (`A-B`)** | **the resolution caches**: a deletion invalidates them by the rule in `A-F` (a change to a link's anchor set, or any register change) rather than by a repair pass. **A reclaim that left a live cache entry behind would answer a deleted value**, which is `§9` `RISK 2`'s falsifier |
**A-B — DELETION AND PERSISTENCE, FOLDED IN.** **The architect's words: *"Severed file-tier node is deleted - on write to
file the store has to be translated to stable json."*** **FOLDED IN: (1) a severed `file`-TIER node is DELETED — not
orphaned, not tombstoned in memory (`§3(c)(i)`); (2) the file is written by **TRANSLATING THE GRAPH TO STABLE JSON** at the
write** — so the thing the tier-1 channel carries is a **translation of the graph**, and `§3(c)(i)` item 3's *"what the
file loses at the next commit"* is re-stated as **the translated node set, minus the severed node and its descendants**;
(3) **THE TRANSLATION IS THE `[H]`-SIDE OBLIGATION OF THE CHANNEL, NOT OF THE RENDERER'S WALK** — the renderer owns the
graph and the values, `main` owns the file and the bytes (the plan's `§2.5` revision; the held contract's `§2.12` item 2),
so the translation is what **crosses** the channel, and the crossing is `U-STORE-PERSIST`'s. **THE STABLE-JSON REQUIREMENT
IS A NEW ROW AND IS ROUTED, NOT DECIDED HERE: the word STABLE needs a declaration (key order, `-0`/`NaN`, `undefined`
valued members — the held contract's own `P-SC-IM-11` comparator already faces the same three questions at
`docs/specs/store-core.md` `§5.5.1`), and it is raised as `§13` `DR-6`.**
**A-C — CONCURRENCY AND ORPHANS, FOLDED IN — AND THIS ANSWER SUPERSEDES THE PROPOSAL'S OWN FIFTH STRUCTURE.** **The
architect's words: *"JS process is single-threaded, so parent-chain rewrites in flight should be a minimal concern; In the
event it does happen due to async and/or caching issues, write to an orphaned reference fails."*** **FOLDED IN: (1) NO PIN
SET IS REQUIRED** — a caller cannot lose an episode to a parent-chain rewrite, because the rewrite cannot interleave with
the caller's own synchronous turn (the JS process is single-threaded), and the async/caching case is answered by (2) below
rather than by a root set; **(2) A WRITE TO AN ORPHANED REFERENCE FAILS, LOUDLY** — the failure is a **declared, returned
refusal** (never a silent no-op, never a throw that reaches a caller's own stack: the held `§2.2` `P-4` posture), and its
token is a **decision request** at `§13` `DR-3` (the candidate reading re-uses the traversal's `'severed-link'` token from
`§5.2` item 2); **(3) THIS SUPERSEDES THE PROPOSAL'S OWN FIFTH STRUCTURE, and the as-filed text stays visible.** **The
as-filed claim, kept beside this answer: *"AND THE PIN SET IS A NEW STRUCTURE THE STORE MUST KEEP CONSISTENT — a fifth
structure beside the graph, the register, the resolution cache and the tier collections"* (`§3(c)(iii)` item 2, and `§4.2`
cost 3's *"FIVE, IN FACT"*).** **⟶ SUPERSEDED 2026-10-01 (ROUND 2): a pin set is NOT part of the model. The critique's
`§4-3` (the pin set read as a resolution re-entrancy) and its condition `C-8` are therefore ANSWERED IN THE NEGATIVE, not
carried — no caller-supplied root set, no forgotten-release leak class, and no collector that resolves names during a
resolution.**
**A-D — THE TIER SEGMENT IS A FILTER, NOT PART OF THE NAME — AND IT DISSOLVES THE `D-4` CONTRADICTION.** **The architect's
words: *"`file.window.tabs.landingPage` locally stores the name, 'landingPage'. The prefixes are the path resolution walks
to find it, each referred to by the reference ('window' --> the registered top-level name, 'tabs' --> the property the
anchor for the link is associated with, 'file' --> the type of flag it looks for. If it doesn't find a node named
'landingPage', linked to the 'tabs' anchor on top-level 'window', with a tier of 'file', then it returns a verbose error
message on a read, indicating where it failed to find the reference."*** **FOLDED IN, IN FOUR CLAUSES: (1) THE LEAF NODE
STORES **ITS OWN LOCAL NAME** (`landingPage`) — a name is not a stored dotted path; (2) THE TIER TOKEN IS **THE FLAG THE
RESOLUTION FILTERS ON** — a filter applied to what the walk finds, **not a segment of the stored name and not a key**;
(3) A FAILED RESOLUTION RETURNS A **VERBOSE DIAGNOSTIC NAMING THE FAILING STEP** — the architect's four named cases (no
registered top-level name · no such property/anchor · no such node name · no node of that name carries the requested tier
flag) plus **every other arm the walk can fail at**, enumerated in `§2.3` and `§5.1`; (4) **THIS DISSOLVES THE
FLAG-VERSUS-NAME CONTRADICTION THE STEP-1 REPORT CALLED BLOCKING** (`…-step1-validity.md` `§1` ground (a); `§2.2` item 4
and `§2.3` `S7`'s `'tier-contradiction'`). **⟶ THE AS-FILED TEXT IS KEPT VISIBLE BESIDE, NOT REWRITTEN:** **the amendment's
own canonical example is the case that dissolves.** **The as-filed reading made the same fact live twice — the tier in the
name's first segment AND the tier on the node — with the two able to disagree (`§2.2` item 4: *"the same fact is held
twice, and the two can disagree"*).** **Under the architect's answer there is ONE carrier of residency (the node's flag)
and ONE filter (the name's first segment); a filter that matches nothing is not a contradiction between two authorities,
it is a resolution that FAILED.** **CONSEQUENTLY, AND THIS IS THE ROUND-2 RULING ON THE WALK'S `S7`:** **the
`'tier-contradiction'` TOKEN DOES NOT SURVIVE AS A *DISAGREEMENT* ARM.** **The token itself survives, re-pointed, as the
VERBOSE DIAGNOSTIC's own name for the architect's fourth case — *"no existing `landingPage` has `file` tier"* — i.e. a
FILTER MISS with a diagnostic that NAMES the four steps and the one that failed, and NOT a two-authority conflict.** **The
two options, with their costs, are `§13` `DR-1`: (a) keep `'tier-contradiction'` as the diagnostic token for the filter
miss (RECOMMENDED — it is the architect's own fourth case and it needs no new member beyond the four `§5.2` item 2 already
carries); (b) mint a distinct `'tier-filter-miss'` token and leave `'tier-contradiction'` for a genuine two-authority case,
which no longer exists in the model and would therefore be a DECLARED-BUT-UNREACHABLE member — the status the held `§0A`
note 4 already gives `'ambiguous-path'`.**
**A-E — COMMIT REGENERATION, FOLDED IN AS A DECLARED TRANSACTION.** **The architect's words: *"Commit to
higher-persistence tier - regenerate node at new tier + propagate to children; limiting mutability is intended to simplify
possible conversion to native code plugin later"*, clarified as *"As 2, with clarification: Propagate regeneration up the
whole subtree, then delete original once census matches"* — i.e. **OPTION (2): REGENERATION RE-TIERS THE WHOLE SUBTREE**,
with the clarification folded in as the transaction's own third step.** **FOLDED IN, IN FIVE CLAUSES: (1) A COMMIT TO A
HIGHER-PERSISTENCE TIER REGENERATES THE NODE AT THE NEW TIER AND PROPAGATES THROUGH THE WHOLE SUBTREE** — the
regenerated set is the node and every descendant, each re-tiered; **(2) THE TRANSACTION'S ORDER IS: BUILD THE REGENERATED
SUBTREE → COMPARE ITS CENSUS WITH THE ORIGINAL'S → ONLY ON A MATCH, DELETE THE ORIGINAL**; **(3) A CENSUS MISMATCH IS A
DECLARED FAILURE THAT LEAVES THE ORIGINAL ALIVE** — nothing is deleted, no partial state lands, and the failure is a
RETURNED record (the held `§2.2` `P-4` posture: a refusal is a record and never a throw); **(4) THE CROSSING, THE RECEIPT
AND THE EVENT SET FOR A SUBTREE-WIDE REGENERATION** are stated on the row: **`N` AFFECTED REFERENCES** (the node plus every
descendant), **ONE RECEIPT ROW PER AFFECTED REFERENCE** (the shape the plan's `§2.5` `Y-2` round-3 block pins — *"THE
RECEIPT RETURNS ONE ROW PER REFERENCE"*), **THE PER-AFFECTED-REFERENCE EVENT RULE UNCHANGED** (the held `§2.11` item 2 /
`§3.3` `I-14` / `§3.4` `R-2`: one event per affected reference, a sweep of `N` emits `N`, a refused write emits `0`), and
**ONE CROSSING FOR THE WHOLE REGENERATED SET — the set is ONE COMMITTED WRITE, per the same round-3 block's clause (1)
(*"ONE COMMIT = ONE ORDERED REFERENCE SET … a crossing that serializes one reference at a time is a FINDING"*)**, so the
answer to *"one crossing or several"* is **ONE**; **(5) THE STATED DESIGN INTENT: LIMITING MUTABILITY — a node's flag is
set once and changed only by this regeneration, never in place — IS INTENDED TO SIMPLIFY A LATER CONVERSION TO A
NATIVE-CODE PLUGIN.** **AND THE TWO CASES THE CRITIQUE NAMED ARE ANSWERED BY THIS SHAPE RATHER THAN LEFT OPEN: THE FLAG IS
NOT REWRITTEN IN PLACE (so there is no *"durability change with no write, receipt or event"*), and THE REGENERATED NODES
ARE NEW NODES UNDER THE ORIGINAL'S LOCATION (so the walk's `A-SEVERED` arm cannot mis-read a re-tier as a severance: the
deletion is the transaction's LAST step and it happens only after the census matched).** **THE CENSUS'S OWN TERM SET IS A
DECISION REQUEST, NOT AN INVENTION HERE — `§13` `DR-5` (the held `§2.9` item 3 counts a cap *"from the TIER'S OWN TABLE
(never from the trie)"*, and the held `§5.5.1` `P-SC-TP-5` measures a tier's node count *"after a `sweep` … the resident
set's own segment total"*, so the census is a real, already-shaped quantity — but WHICH of those counts the regeneration's
match compares is not stated by any landed row).**
**A-F — THE CACHES, FOLDED IN (`Q-4` ANSWERED).** **The architect's words: *"Caches exist at the top-level register and
per-link, both as dictionaries containing the lowest-durability match for each name. Caches invalidate on any change to the
top-level register or if the a set of anchors on a link changes. Anchors are immutable, reparenting requires deleting the
anchors and minting new ones."*** **FOLDED IN, IN FIVE CLAUSES: (1) TWO CACHE KINDS** — **the register cache** and **the
per-link cache** — and **NO THIRD**; **(2) EACH IS A DICTIONARY OF `name → THE LOWEST-DURABILITY MATCH`** — the held read's
own shadowing rule made into a cache entry (an in-flight `temp` value wins over a committed `file` one; `store-core.md`
`§2.5` item 2, `§3.1` `M-1`); **(3) THE INVALIDATION RULE IS EXHAUSTIVE AND TWO-PARTED: ANY CHANGE TO THE TOP-LEVEL
REGISTER, OR ANY CHANGE TO A LINK'S ANCHOR SET** — and it is **the rule that makes `§9` `RISK 2`'s resurrection falsifier
decidable**, because the landed clear rule (`§2.10` item 1(a)) changes the resident set and therefore invalidates; **(4)
ANCHORS ARE IMMUTABLE, AND RE-PARENTING IS DELETE-THE-ANCHORS PLUS MINT-NEW-ONES** — which is **what makes clause (3)
well-defined**: there is no "mutate an anchor's link" operation whose effect the cache could miss, so *"a change to a link's
anchor set"* is the ONLY way a link's addressability changes; **(5) CONSEQUENCE FOR A DURABILITY CHANGE:** because a
commit's regeneration removes and mints anchors (`A-E`), **the affected caches are invalidated by the same operation** —
the regeneration is a register-and-anchor-set change, not a silent field write.** **RECONCILED WITH THE HELD TWO-RUN
STORE-STATE-INDEPENDENCE ROW, EXPLICITLY: the held `§5.5.1` `P-SC-IM-11` (*"THE TWO-RUN STORE-STATE-INDEPENDENCE
DIFFERENTIAL"*, named at `§5.5.2` item 5 as *"the ONLY row that actually EXECUTES the store-state-independence claim"*)
requires a call's answer to be IDENTICAL across two runs whose only difference is the store's tier state.** **A READ THAT
REBUILDS A CACHE IS STILL A FUNCTION OF ITS ARGUMENTS iff the rebuild is DETERMINISTIC in the graph state — which is what
clause (2) makes it: the entry is the lowest-durability match, computed from the graph, with no ambient input (no clock, no
counter, no insertion time).** **SO THE ROW IS NOT RE-DERIVED AND NOT RELAXED — IT IS SATISFIABLE AS LANDED, and the
rebuild's determinism is the condition it rests on.** **⟶ BUT WHETHER THE REBUILD RUNS INSIDE THE READING OPERATION IS A
DECISION REQUEST (`§13` `DR-7`), because that is a different question from determinism: the held `§2.9` item 3 pins *"`read`
is UNCAPPED: a read never changes a count and can never overflow"*, and a read that WRITES a cache entry is a read with a
side effect on derived state.**
**A-G — THE CAPS, FOLDED IN (`Q-4`'s companion, and the critique's `§4-6` ANSWERED).** **The architect's words: *"Top-level
register has caps, reachability replaces within the graph."*** **FOLDED IN: (1) THE CAPS LIVE ON THE TOP-LEVEL REGISTER** —
the bound is on the register's own rows, which is exactly what *"register only needs to count top-level items"* implies
(a count over a structure the model already has); **(2) REACHABILITY REPLACES WITHIN THE GRAPH** — the graph's own reclaim
(§3(c)) answers the model's leak classes INSIDE the graph, and **the caps answer the population bound the critique's `§4-6`
measured as missing**: *"reachability bounds what the collector may delete, not how many values may exist"*, so a graph in
which every node hangs from a live path reclaims nothing — **the register's caps are what refuse in that state.**
**(3) WHAT THE REGISTER'S CAPS COUNT, THEIR VALUES, AND THE OVERFLOW OUTCOME — STATED ON THE ROW, WITH EVERY VALUE THE
PROPOSAL CANNOT DERIVE MARKED AS A DECISION REQUEST:**

| # | The register-side cap | What it counts | Its value | The declared overflow outcome |
| **`RCAP-1`** | the registered top-level items of a **`mem`-flagged** register family | the number of register rows whose top-level node carries the `mem` flag | **the held `CAP-1` figure `1024` — RE-DERIVED HERE, NOT INHERITED: the held value is the held `§2.9` item 1's tier-2 COLLECTION element count, and this row counts REGISTER ROWS, so the figure is a DECISION REQUEST (`§13` `DR-8`) with `1024` as the working value** | **refused, `cleared: []`, `events: 0`, the store's own tables BYTE-IDENTICAL to their pre-call state — the held `C-3` non-destructive posture applied to a cap, which the held `§2.9` item 2 pins verbatim and which this answer does NOT change** |
| **`RCAP-2`** | the registered top-level items of the **`temp`** family | the number of register rows whose top-level node carries the `temp` flag | **the held `CAP-2` figure `4096`, under the same re-derivation and the same `§13` `DR-8` request** | identical to `RCAP-1` |
| **`RCAP-3`** | **the amplifier-form subscriptions across the register** (prefix/tier-wide / `{subtree:true}`) | the number of live subscriptions registered with the amplifier form | **the held `CAP-3` figure `64` — this one is the LEAST re-derived of the three, because the held `§2.9` item 1 `CAP-3` already counts subscriptions rather than tier entries, and the register is where the top-level names they observe are declared — the figure still carries `§13` `DR-8`** | **the subscription is refused and REGISTERS NOTHING; an EXACT-reference subscription is NEVER capped (the held `§2.9` item 1 `CAP-3` clause, unchanged)** |
**AND THE THREE TIER-SIDE CAPS ARE SUPERSEDED — WITH THEIR AS-FILED TEXT VISIBLE.** **The as-filed claim, kept beside this
answer: *"**REPLACES the three caps** (`§2.9`'s `CAP-1`/`CAP-2`/`CAP-3`) with **reachability** as the bound: a value severed
from the graph is **reclaimed**, so the model's own leak classes are answered by collection rather than by a counted
refusal"* (`§1` `M-4`, and `§6` `R11`'s *"SUPERSEDED"* cell).** **⟶ SUPERSEDED 2026-10-01 (ROUND 2): reachability does NOT
replace the caps; it replaces WITHIN THE GRAPH, and the caps move to the register (`A-G` above). The held token
`'cap-exceeded'` therefore KEEPS A REFERENT and is not *"AT RISK"* — `§5.2` item 6 is annotated beside.**
**A-H — `R-9`'s SCOPE IS RULED, NOT RE-READ — AND COLLISION 1's `F-5` CELL IS RE-CLASSIFIED BY ARGUMENT.** **THE RULING:
`docs/specs/store-core.md` `§3.4` `R-9` bans a **GLOBAL ENGINE-ID-KEYED** map. It does NOT ban a **PER-LINK TARGET SET
KEYED BY NAME**, which is what the amendment's walk consults.** **THE ARGUMENT IS MADE HERE, so a later gate can test it
rather than take it on trust.** **§3(a) item 2's hit is `R-9`'s own bytes: *"No path segment is looked up against any id
registry, and the store keeps no counter, no UUID site and no string-to-entry map."*** **Three differences distinguish the
store's per-link name→node resolution from the element-id kind the clause and `F-5` protect:** **(1) WHAT THE KEY IS.** A
store-minted key is **the caller's own declared segment** — the held plan's `§1.3` rule states it in those words: *"a
declared name is a declaration of the CALLER'S spelling, not a vocabulary the store owns"* (`§1.8` `R-6`) — while an
element-id key is an **engine/authored id string** minted outside the caller's namespace (`cssIndex`/`propsIndex` are
*"rebuilt … per graph generation"*, layer 1 `§2.3`). **(2) WHAT THE CONTAINER IS.** The store's set is **PER-EDGE**: a
link's target set is scoped to ONE anchor on ONE node, so a lookup is **the last step of a walk that already reached that
node** and never a global probe. The prohibited map is **GLOBAL and process-wide** — the shape `F-5` counts: *"two holders
of the element-id kind already exist (the engine registry + `cssIndex`/`propsIndex`); a store keyed by authored ids or node
ids would be a THIRD holder"* (plan `§3.3` row `2.3-8`, plan `§7.2` `F-5`, layer 1 `§7` `F-5`), i.e. a THIRD global index
over the SAME ids the engine and the host already index. **(3) THE OBSERVABLE THAT DISTINGUISHES THEM, NAMED because the
critique's `§7-2` requires one:** **a per-link set is UNREACHABLE without its walk** — no caller can address a node by
spelling its id from outside: the same id string declared under a different top-level name is a DIFFERENT address, and a
segment that is not the id of any node the walk reached is a **diagnostic failure** (`A-D`'s verbose error), not a lookup
miss. **A GLOBAL engine-id-keyed map has the opposite observable: ANY caller holding an id string resolves it in one probe,
across namespaces and across graphs — and the ENGINE's own resolution (`[H]` `src/renderer/runtime.ts:resolveTarget`
resolving an engine `nodeId`, then an authored `css.id`, then an authored `props.id`) already has exactly that property, so
a store that did the same would be the third holder by construction.** **FOLDED IN: (1) this ruling REPLACES Collision 1's
recommendation — `§3(a)`'s resolution (1) (*"`R-9`'s wording must be re-read"*) is superseded, and `§3(a)`'s as-filed text
stays visible beside it; (2) THE STEP-1 REPORT'S OBJECTION IS ANSWERED: the objection was that a *"re-read"* is a
PROHIBITION RELAXATION (`…-step1-validity.md` `§1` ground (c), `§4`), and it was right about a re-read — **what the round-2
answer does is RULE THE CLAUSE'S SCOPE**, which is a different act: a scope ruling names the class the prohibition binds and
the argument that distinguishes the classes, and it is recorded as **its own decisions row** with **an amendment row in the
held contract at its own gate**; (3) `R-5`'s FIRST half (no ENGINE id) and the import census `P-9`/`R-11`/`I-1` are
UNCHANGED, and so is `R-9`'s *"no counter, no UUID site"* half; (4) **`F-5`'s *"explicitly not worsened"* cell is
RE-CLASSIFIED BY THIS ARGUMENT** — the cell's claim (plan `§7.2` `F-5`: *"LEFT — AND EXPLICITLY NOT WORSENED"*, with
`plan §3.3` row `2.3-8`'s *"do not centralize this"* reason) is TRUE under the ruling for the reason in (1)–(3) above:
the store's id space is per-link, caller-keyed and walk-gated, so it is NOT a third holder of the element-id kind — **and
the critique's `§7-2` question (*"is a store-minted node id a string-to-entry map keyed by a store-owned counter, or a
distinct kind?"*) is answered: the amendment's register row does NOT key nodes by a counter, and `§2.1` row 4's `nodeId`
is annotated beside.** **THE GATE THIS OWES, NAMED: the ruling's decisions row + the held contract's amendment row land at
`U-STORE-CORE`'s spec-gate pass (or its successor's, per `§7.2` option (a)) — the amendment's own §3(a) is a PROPOSAL and
may not write either.**


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

   **⟶ AMENDED 2026-10-01 (ROUND 2) — THE ARCHITECT'S ANSWER DISSOLVES THIS ROW'S PREMISE, AND THE AS-FILED TEXT ABOVE
   STAYS VISIBLE BESIDE IT.** **The architect's words: *"`file.window.tabs.landingPage` locally stores the name,
   'landingPage'. The prefixes are the path resolution walks to find it, each referred to by the reference ('window' -->
   the registered top-level name, 'tabs' --> the property the anchor for the link is associated with, 'file' --> the type
   of flag it looks for. If it doesn't find a node named 'landingPage', linked to the 'tabs' anchor on top-level
   'window', with a tier of 'file', then it returns a verbose error message on a read, indicating where it failed to find
   the reference."* (`§0.4` `A-D`).** **SO THE ROW'S OWN PREMISE — *"the same fact is held twice"* — IS FALSE AS OF THIS
   ROUND, and `§10` `Q-6`'s *"which wins"* question is answered rather than open: THERE IS ONE RESIDENCY CARRIER (the
   node's `type` flag, which `§0.4` `D-RES` makes the winner for VALUE RESIDENCY) AND ONE FILTER (the name's first
   segment, which is not a stored part of any name and not a second authority over anything).** **A filter that matches
   nothing is a RESOLUTION FAILURE with a verbose diagnostic, not a two-authority disagreement — so this row's
   *"which wins"* framing is superseded BESIDE while its landed-rule reasoning (`P-13`/`I-12`/`P-2`) is what makes the
   *"ONE carrier, ONE filter"* reading mandatory rather than optional: a store that treated the name's segment as a second
   residency authority WOULD derive a value it was given.** **`§2.3`'s `S7` is annotated at its own site; the walk's
   failure arms are re-stated in full in the new table there, and the token question is `§13` `DR-1`.**
**⟶ THE WALK'S FAILURE ARMS, RE-STATED IN FULL (ROUND 2, `2026-10-01`) — BECAUSE THE ARCHITECT'S ANSWER MAKES THE FAILED
STEP THE WHOLE POINT.** **The architect's words: *"If it doesn't find a node named 'landingPage', linked to the 'tabs'
anchor on top-level 'window', with a tier of 'file', then it returns a verbose error message on a read, indicating where
it failed to find the reference (ex. no registered 'window' top-level name, no 'tabs' property, no 'landingPage', no
existing landingPage has 'file' tier)"* (`§0.4` `A-D`).** **THE FOUR NAMED CASES, PLUS EVERY OTHER ARM THIS WALK CAN FAIL
AT — enumerated rather than discovered, and each carrying the STEP it fails at, so the diagnostic can name it. NONE of the
seven is decided here: the TOKEN column states what the held union or the amendment currently supplies, and the tokens the
held union cannot supply are `§13` `DR-1`'s subject.**

| # | The arm, at its own step | The architect's case, where the table above has no separate row | What the diagnostic names | The token as it stands |
| **(i)** | **`S2` — no registered top-level name** | ***"no registered 'window' top-level name"*** | the FIRST path segment and the fact that no register row carries it | the held `'undeclared-name'` (`docs/specs/store-core.md` `§2.6` item 3's `G-1`/`H-1` arm) — **SURVIVES for this arm** |
| **(ii)** | **`S3` — no such property/anchor on the node the walk reached** | ***"no 'tabs' property"*** | the node's own name and the missing anchor KEY (the caller's own segment, `§2.4` row 3) | **NO HELD MEMBER** — proposed `'no-such-anchor'` (`§5.2` item 2) |
| **(iii)** | **`S6` — no target carries the leaf's local name** | ***"no 'landingPage'"*** | the link's own target set and the missing local name | the held chain-vs-leaf split: a chain that stopped earlier is `'no-such-anchor'`; **a chain that resolved to an unwritten leaf is the held DECLARED MISS** (`store-core.md` `§2.5` case (e)) |
| **(iv)** | **`S7` — a node of that name exists but its FLAG is not the tier the filter asks for** | ***"no existing landingPage has 'file' tier"*** | the node's OWN flag, the flag the filter asked for, and the step's own name | **the `'tier-contradiction'` token, RE-POINTED to this filter-miss case (`§0.4` `A-D`); the alternative token is `§13` `DR-1`** |
| **(v)** | **`S4` — the anchor exists and its link's target has been severed/reclaimed** | *not named by the architect; reachable because `§3(c)`'s collector exists* | the link and the reclaimed target | **NO HELD MEMBER** — proposed `'severed-link'` (`§5.2` item 2) |
| **(vi)** | **`S5` — the cache entry is stale AND the rebuild itself fails** | *not named by the architect; reachable because a cache exists* | the stale entry's link and the reason the rebuild could not answer | **NO HELD MEMBER** — proposed `'rebuild-failed'` (`§5.2` item 2) |
| **(vii)** | **the write side's twin of (v) — a WRITE to an orphaned reference** | the architect's concurrency answer: *"write to an orphaned reference fails"* (`§0.4` `A-C`) | the orphaned reference and the operation that failed on it | **NOT DECIDED — `§13` `DR-3`; the candidate reading re-uses (v)'s `'severed-link'`** |
**AND THE DIAGNOSTIC'S OWN SHAPE IS A DECISION REQUEST, NOT AN INVENTION HERE.** **The architect's phrase is *"a verbose
error message on a read, indicating where it failed to find the reference"*, and the held contract's whole refusal posture
is the opposite of a message: *"a reason is a RETURNED RECORD MEMBER; it is NEVER a throw"* (`store-core.md` `§2.1`'s
`StoreRefusalReason` comment; `§2.2` `P-8`).** **So the two readings are (a) the returned refusal record keeps its shape
and the diagnostic is carried as ADDITIONAL, declared members (the failed step id and the caller's segment), or (b) the
refusal record's own `reason` member gains a per-step token set.** **Both are costed at `§13` `DR-1`; NEITHER is chosen
here.** **WHAT IS NOT OPEN: the refusal STAYS A RETURNED RECORD on the read path — a throw would redden the held `§2.2`
`P-4`/`§3.3` `I-2` totality posture, which the round-2 answer does not touch.**
   quotes the same hot path). **⟶ ROUND 2: the register-side caps (`§0.4` `A-G`, `§6` `R11`) are what bound this path
   now that reachability bounds deletion rather than population — the critique's `§4-6` reading.**
   architect must rule it.** **⟶ ANSWERED 2026-10-01 (ROUND 2): THE ARCHITECT'S OWN WORDS MAKE THE EXAMPLE A FAILED
   RESOLUTION — *"If it doesn't find a node named 'landingPage', linked to the 'tabs' anchor on top-level 'window', with a
   tier of 'file', then it returns a verbose error message on a read, indicating where it failed to find the
   reference"* (`§2.3`'s failure-arm table, case (iv); `§0.4` `A-D`). So the walk does NOT *"keep searching for a
   `file`-flagged node"*: a filter miss is a DIAGNOSTIC, and the name is never authoritative over the flag — which is
   what `§2.2` item 4's landed-rule reasoning (`P-13`/`I-12`/`P-2`) requires. The as-filed either/or above stays
   visible; the live reading is the architect's.**


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
| **S3** | **`ANCHOR`** | *"looking for an anchor at the 'tabs' property"* — the next segment is looked up as an **anchor KEY** on the current node | the **`StoreAnchor`** *(proposed)* and its **`StoreLink`** *(proposed)* | **`A-NO-ANCHOR`** — the node carries no anchor keyed `tabs` → **A NEW REFUSAL TOKEN IS NEEDED** (proposed `'no-such-anchor'`); the held union has no member for it (§5) | | ** | ** | **⟶ ROUND 2: this arm is the architect's own case (ii), *"no 'tabs' property"*, and the diagnostic NAMES the caller's segment (`§2.3`'s failure-arm table)** |
| **S4** | **`LINK`** | *"then checking the associated link"* — the anchor's link is read; a link whose target was **severed** (the graph's reclaim arm, §3(c)) is not followable | the **`StoreLink`** *(proposed)* and its **cache entry** *(proposed)* | **`A-SEVERED`** — the link exists but its target is severed/reclaimed → **A NEW TOKEN IS NEEDED** (proposed `'severed-link'`) |
| **S5** | **`CACHE`** | *"for a valid cache and resolving (either from fresh cache or rebuilding a stale one)"* — the link's cache entry is checked: **VALID** → resolve from it; **STALE** → **REBUILD** and resolve from the rebuilt entry | the **`ResolutionCache`** entry *(proposed)* | **`A-REBUILD`** — the rebuild itself fails (a severed target, a persisted record that does not answer, a flag contradiction) → **A NEW TOKEN IS NEEDED** (proposed `'rebuild-failed'`); **and the STALE-CACHE arm is NOT a refusal at all** — it is a declared normal path, which is new work the held model has no clause for |
| **S6** | **`RESOLVE`** | *"resolving … a 'landingPage' id"* — the link's targets are resolved to the id `landingPage`, i.e. **the last segment IS an id, and the store looks it up against the graph's own target set** | the **resolved `StoreNode`** for `landingPage` *(proposed)* | **`A-NO-ID`** — the link resolves but no target carries the id: if the chain resolved and the leaf is simply unwritten → the held **DECLARED MISS** (`§2.5` case (e)) **SURVIVES**; if the chain stopped earlier → `'no-such-anchor'` |
| **S7** | **`FLAG`** | *"a 'landingPage' id with the `type='temp'` property"* — the resolved node's **`type` is `'temp'`** while the name asked for **`file`** | the **node's `type` flag** *(proposed)* and the **name's tier token** (held) | **`A-FLAG`** — the flag contradicts the tier the name asked for → **A NEW TOKEN IS NEEDED** (proposed `'tier-contradiction'`) **unless §10 `Q-6` rules the name authoritative, in which case this arm becomes `'no-such-node'`-shaped and the walk must find a `file`-flagged sibling instead** | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): `Q-6` IS ANSWERED — THE TIER TOKEN IS A **FILTER** APPLIED TO THE NODE'S FLAG, NOT A SECOND RESIDENCY AUTHORITY (`§0.4` `A-D`, `§2.2` item 4), so this arm is the architect's own case (iv) (*"no existing landingPage has 'file' tier"*): A FILTER MISS WITH A VERBOSE DIAGNOSTIC. The `'tier-contradiction'` token survives RE-POINTED to this case; the alternative token is `§13` `DR-1`.** |
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

### §2.4a THE REGISTER'S ROW SHAPE, RE-STATED UNDER THE ROUND-2 ANSWERS (the critique's three register defects, answered)

**WHY THIS SUBSECTION EXISTS.** **The step-2 critique filed three `must-fix` defects against the register as this file
described it — it is CIRCULAR (`§3-3`), its `nodeId` is the forbidden string-to-entry map (`§3-2`), and it carries no `tier`
field so `G-3` has no input (`§3-4`).** **The round-2 answers (the graph as the source of truth, `§0.4` `A-A`/`A-F`/`A-H`;
the register cache, `A-F`) decide all three. This subsection states the row shape that FOLLOWS, marks what is still
undecidable, and routes the remainder to `§13`.**
**(1) THE CIRCULARITY IS RESOLVED BY THE SOURCE-OF-TRUTH RULING — AND THE AS-FILED CLAIM STAYS VISIBLE.** **The as-filed
claim, kept beside: *"**THE REGISTER IS THEREFORE EXACTLY THE SET OF PARENTLESS NODES** — which is what makes *"register
only needs to count top-level items"* checkable: **the register's row count equals the parentless node count**"* (`§2.4`
row 1).** **The critique's objection (`§3-3`) was that this cannot be reconciled with `§3(b)` item 1's *"a declaration IS a
declaration of a top-level item"*, because a node is parentless by a GRAPH FACT while a declaration is the CALLER'S
SPELLING (the held `store-core.md` `§2.6` item 7: *"a declared name is a declaration of the CALLER'S spelling, not a
vocabulary the store owns"*).** **⟶ RESOLVED 2026-10-01 (ROUND 2): THE TWO ARE NOT RIVALS, BECAUSE THE GRAPH IS THE SOURCE
OF TRUTH AND THE REGISTER IS ITS PROJECTION.** **Under `A-A`, the graph holds a top-level node (a parentless node carrying
its own local name, `A-D`) and the register is the graph's own top-level PROJECTION — so the caller's spelling CREATES the
node, and the row is then DERIVABLE rather than separately declared. THE ROW IS NOT A SECOND DECLARATION SURFACE; it is a
view whose row count equals the parentless-node count BY CONSTRUCTION.** **What this does NOT decide is whether a
CALLER-DECLARED row may exist beside the derivation (a row naming an item before it holds a value — the held model's
declared-but-never-written miss, `store-core.md` `§2.5` case (e)), because the two readings give the register two
different meanings for a cold item; that is `§13` `DR-9`, not a clause this pass may invent.** **(2) THE `nodeId` MAP IS
ANSWERED BY THE `R-9` SCOPE RULING — WITH THE AS-FILED ROW KEPT VISIBLE.** **The as-filed row shape, kept beside:
`{ name, nodeId, constraintId? }` (`§2.1` row 4).** **The critique's objection (`§3-2`) was that this IS the map `R-9`'s
static row forbids (*"the store keeps no counter, no UUID site and no string-to-entry map"*, `store-core.md` `§3.4`
`R-9`).** **⟶ ANSWERED 2026-10-01 (ROUND 2): `R-9`'s SCOPE IS RULED (`§0.4` `A-H`), and under the ruling a PER-LINK, PER-EDGE,
WALK-GATED set of the caller's own local names is not the class the clause bans.** **Consequences for the ROW: the row's
`nodeId` is a **per-top-level-node handle the store mints inside its own graph**, not a global id registry keyed by
engine/authored ids, and **it is not looked up by any path segment** — the walk reaches a node through its ANCHORS and
LINKS, and the register's `name` is the caller's OWN spelling of the top-level item.** **A row that resolved a PATH SEGMENT
against a set of store-minted node handles FAILS — and that is the residue of `R-9` that this ruling leaves intact.**
**(3) THE MISSING `tier` FIELD IS ANSWERED BY `A-D` PLUS THE REGISTER CACHE.** **The as-filed row shape carries no `tier`
(`§2.1` row 4), and the critique's `§3-4` showed `G-3` (a name whose first segment does not match its DECLARED tier,
evaluated against the declaration's own `tier` field in the held `store-core.md` `§2.6` item 2) therefore has NO INPUT.**
**⟶ ANSWERED 2026-10-01 (ROUND 2): `G-3` IS SUPERSEDED AS A REGISTER ROW AND SURVIVES AS A FILTER MISS.** **The held `G-3`
was a declaration-time check on a field the amendment does not carry; under `A-D` the tier is not a declared property of
the NAME at all — it is the FILTER the resolution applies to the resolved node's own flag, and its failure is `§2.3`'s
failure-arm case (iv) with a verbose diagnostic.** **The row keeps its referent as a CONTRADICTION BETWEEN TWO
CALLER-VISIBLE FACTS (the name's first segment and the node's own flag), evaluated ON THE RESOLUTION, not on the
declaration.** **(4) WHAT THE ROW THEREFORE CARRIES, WITH THE STILL-UNDECIDABLE FIELDS MARKED.** **The register row, as the
round-2 answers leave it — every field's SOURCE named, and the two fields no answer decides marked `§13`:**

| # | The row's member | Its source, under the round-2 answers | Its status |
| **1** | **the caller's OWN spelling of the top-level item** (its own local name, `A-D`) | the caller's declaration, carried verbatim (the held `store-core.md` `§0A` note 5's no-vocabulary rule and the plan's `§1.3` `R-1`) | **DECIDED** — this is the row's identity, and the spelling is never re-interpreted |
| **2** | **the top-level node's own handle inside the store's graph** (the as-filed `nodeId`) | **the store's own graph**, minted by the store; **NOT a global id registry and NOT looked up by any path segment** (`A-H`'s ruling) | **DECIDED IN CLASS, `§13` `DR-10` for its own minting rule** (a counter and a per-graph sequence are both admissible under the ruling; which one is a contract clause, and the choice is what a later static row must be able to scan) |
| **3** | **the constraint id** (the as-filed `constraintId?`) | the held row shape's own field name, retained (`§2.1` row 4's *"keeps the held row's FIELD NAMES where it can (`reserved`, `constraint`)"*); the constraint's maintenance rides the links (`§3(b)` item 5) | **DECIDED** — field name and referent retained; the ENUMERATION source is `§3(b)` item 5's open item |
| **4** | **`reserved`** | the held field name retained; **its HOME is the re-homing question** (`§10` `Q-7`, the `RISK 3` two-call control) | **`§13` `DR-3`-adjacent and NOT decided here** — the re-home is the architect's (`§3(b)` item 3(b); `RISK 3`) |
| **5** | **the `tier` field** | **NOT a row member under `A-D`** — the tier is the resolution's FILTER (member 3 above), and `G-3` survives as that filter's miss | **DECIDED** (the field is dropped; the held `G-3` is re-pointed) |
| **6** | **the per-leaf pattern kind and the `shape` field** (`concrete`/`pattern`) | **the held matcher's own two kinds** — and the open question is whether a TOP-LEVEL name may be declared as a PATTERN (the held `G-9`/`G-10` load-time refusals have no load under a derived register) | **`§13` `DR-1`/`DR-9`** — this is one of the register's own refused-set questions, and no round-2 answer reaches it |
| **7** | **the register CACHE's own pointer** (`A-F`) | **the register cache is a SEPARATE dictionary** (`name → lowest-durability match`), NOT a row member | **DECIDED** — the cache is its own structure, invalidated on any register change; a row that stored a cache entry IN the register row would make the register a second authority over resolution (`P-13`/`I-12`) |
**(5) AND THE HONEST LIMIT.** **A row's FIELD SET is a contract clause, and this file may not write one.** **What is
decided above is what the round-2 answers force; what is marked `§13` is a DECISION REQUEST with options and costs.**
**The two register defects that survive as questions are the ROW'S OWN MINTING RULE (`DR-10`) and the REGISTER'S REFUSED
SET (`DR-1`) — the second of which the step-1 report escalated as its `§6` item 8 (*"the top-level register's own refusal
set … the arms that can still fire are nowhere enumerated"*), and which `§5.2` item 6's `'cap-exceeded'` annotation and
`§3(b)` item 4's four new arms do NOT close.**
**⟶ ROUND 2 (2026-10-01) — COLLISION 1's RECOMMENDATION IS REPLACED BY A RULING, AND THE AS-FILED RECOMMENDATION AND ITS
WEAKNESS PARAGRAPH STAY VISIBLE ABOVE (`RCA-8(d)`).** **THE ARCHITECT RULED `R-9`'s SCOPE: the clause bans a GLOBAL
ENGINE-ID-KEYED map, NOT a PER-LINK TARGET SET KEYED BY NAME — and the ruling carries its own gate, its own
`docs/decisions.md` ACTIVE row, and an amendment row in the held contract at that gate (`§0.4` `A-H`).** **THE ARGUMENT IS
MADE AT `§0.4` `A-H` (its three differences: WHAT THE KEY IS · WHAT THE CONTAINER IS · THE OBSERVABLE THAT DISTINGUISHES
THEM), and it is made THERE rather than asserted here, so that this collision's own section can state its STATUS.** **WHAT
THIS DOES TO THE TABLE ABOVE — row by row, so a later gate can test each:**
**(1) THE RECOMMENDED RESOLUTION (1) IS SUPERSEDED — AND ITS AS-FILED WEAKNESS PARAGRAPH IS ANSWERED.** **The as-filed
resolution (1)'s cost cell said `R-9`'s *"no string-to-entry map"* clause is one *"whose wording must be re-read as 'no
ENGINE-id-keyed map'"*; the step-1 report's ground (c) called that a PROHIBITION RELAXATION and refused it
(`…-step1-validity.md` `§1`/`§4`).** **That objection was RIGHT about a RE-READ: a re-read narrows printed bytes without a
ruling.** **What the architect's answer does instead is RULE THE SCOPE — it names the class the clause binds (a GLOBAL
engine-id-keyed map) and the class it does not (a per-link, caller-keyed, walk-gated target set), and the argument that
distinguishes them is MADE, testable, and carries its own gate.** **So resolution (1)'s TEXT is superseded while its
CONCLUSION (store-minted ids, the import census intact, `R-5`'s first half intact, `R-9`'s no-counter/no-UUID half intact)
survives BY THE RULING RATHER THAN BY THE RE-READ.** **(2) `F-5`'s *"explicitly not worsened"* CELL IS RE-CLASSIFIED BY THE
SAME ARGUMENT** — the row's cell (plan `§7.2` `F-5`, with `plan §3.3` row `2.3-8`'s *"do not centralize this"* reason) is
TRUE under the ruling, for the three reasons `§0.4` `A-H` states; **the critique's `§7-2` demand — *"what is the OBSERVABLE
that distinguishes them"* — is answered at `A-H` item (3), and that answer is the load-bearing half of this collision's
disposition.** **(3) THE STEP-1 REPORT'S CONDITION 1 IS THEREFORE DISCHARGED, NOT CARRIED:** *"`R-9`'s 'no string-to-entry
map' clause must be re-read, not relaxed — or Collision 1 takes resolution (2)"* (`…-step1-validity.md` `§7` item 1) — **the
ruling is a third disposition that clause did not list, and resolution (2) is NOT taken: the directive's own canonical
example stays implementable and `R-5`/`R-9` are not lost.** **(4) THE ROWS THE RULING TOUCHES, NAMED ONE BY ONE:** **plan
`§1.3` `R-5` (its SECOND half only)** · **the held contract `§2.3` item 5 and `§3.4` `R-9` (SCOPE RULED, substance kept)** ·
**plan `§3.3` row `2.3-8`** · **plan `§7.2` `F-5`'s *"explicitly not worsened"* cell** — **plus the `docs/decisions.md`
ACTIVE row the ruling owes and the held contract's own amendment row, BOTH AT `U-STORE-CORE`'s spec-gate pass or its
successor's (`§7.2` option (a)), and NEITHER written by this pass.** **THE COLLISION IS THEREFORE NO LONGER *"five rows hit,
two of them re-read"*: it is FOUR rows whose scope is RULED, ZERO re-reads, and two rows (`R-5`'s first half, the import
census `P-9`/`R-11`/`I-1`) UNTOUCHED.**
collision yields.** **⟶ ROUND 2 (2026-10-01) — THE CRITIQUE'S `§5-2` IS ANSWERED IN KIND, AND THE ANSWER IS ROUTED, NOT
DECIDED: *"`G-4`'s and `G-9`'s/`G-10`'s refusals are LOAD-TIME refusals, and a derived register has no load."*** **THE
HONEST READING: `G-9` and `G-10` are refused *"AT LOAD"* in the held contract's own words (`store-core.md` `§2.6` item 3's
token table; `§3.4` `R-5`'s *"the ten write/load rows"*), with positive controls at register row `P-SC-IM-4` and `§3.4`
`R-5`.** **Under `§0.4` `A-A` the register is a projection of the graph, so there is no table load to refuse and the two
rows need a REPLACEMENT EVENT — and the only candidates the model offers are (a) a CONSTRUCTION-TIME refusal (the node's
construction fails), or (b) a GRAPH-INVARIANT row (a table can still be supplied as the caller's declaration input, and
then it has a load after all).** **Both are defensible and NEITHER IS DECLARED HERE: they are `§13` `DR-1`'s sibling —
`DR-9` — with the falsifier the critique named (*"two anchors of the same key on one node — must the table fail to load (as
today) or the node fail to construct?"*).** **THE ONE POSITIVE ABOVE IS THEREFORE RE-READ AS A REPLACEMENT PROPOSAL, not
as a preservation: the ambiguity class stays ENFORCEABLE, and WHERE it is enforced is the open clause.**
   **⟶ AMENDED 2026-10-01 (ROUND 2) — THE ARCHITECT'S ANSWER REPLACES THIS SUBSECTION'S `Y-2`-CROSSING FRAME, AND THE
   AS-FILED TEXT ABOVE STAYS VISIBLE (`RCA-8(d)`).** **The architect's words: *"Severed file-tier node is deleted - on
   write to file the store has to be translated to stable json"* (`§0.4` `A-B`).** **FOLDED IN, AND THE CRITIQUE'S `§4-1`
   IS ANSWERED: (a) A SEVERED `file`-TIER NODE IS DELETED — the reclaim is a DELETION, not an unlink, which the as-filed
   text above already says; (b) THE FILE IS WRITTEN BY TRANSLATING THE GRAPH TO STABLE JSON at the write, so the thing the
   channel carries is a TRANSLATION OF THE GRAPH rather than a per-reference `{name, value}` list — **and that is what
   answers the critique's question *"what is `Y-2`'s `refs[]` for a crossing no caller requested?"*: the translation's own
   affected-node set IS the reference set, derived from the graph the deletion happened in, not from a caller's pending
   operation.** **(c) THE CROSSING IS STILL `C-2`'s — PERSIST FIRST, THEN RECLAIM — and persist-first is what makes the
   window the critique measured (`§4-1`: *"for the whole duration of the crossing the node is unreachable but alive"*)
   a DECLARED window rather than an undeclared one: the read that arrives inside it answers the value, the deletion lands
   on the receipt, and A WRITE to an orphaned reference inside the window FAILS LOUDLY (`§0.4` `A-C`, `§13` `DR-3`).**
   **(d) WHAT THE FILE LOSES AT THE NEXT WRITE IS THE TRANSLATED NODE SET MINUS THE SEVERED NODE AND ITS DESCENDANTS —
   the as-filed clause's claim, re-based on the translation.** **(e) THE TWO CLAUSES THE CRITIQUE'S `§4-1` FALSIFIER
   NEEDS ARE STATED: the severing operation's receipt NAMES the affected set it crossed on, and across the window the read
   answers EITHER the value OR a refusal — never both — because the refusal is decided by the graph on the SAME
   synchronous turn that the reclaim mutates it.** **(f) WHAT IS STILL UNDECIDED: the translation's own STABILITY rules
   (key order, `-0`/`NaN`, members whose value is `undefined`), which no round-2 answer states — `§13` `DR-6`.**
   **⟶ SUPERSEDED 2026-10-01 (ROUND 2) — THE ARCHITECT'S CONCURRENCY ANSWER REMOVES THIS STRUCTURE, AND THE AS-FILED
   TEXT ABOVE STAYS VISIBLE (the critique's `§4-3`, the pin set read as a resolution RE-ENTRANCY).** **The architect's
   words: *"JS process is single-threaded, so parent-chain rewrites in flight should be a minimal concern; In the event it
   does happen due to async and/or caching issues, write to an orphaned reference fails."* (`§0.4` `A-C`).** **FOLDED IN:
   NO PIN SET EXISTS in the model.** **So (a) this subsection's clauses 1–3 (the caller-supplied root set, the
   forgotten-release leak class, and `sweep`'s *"release the pin set, then reclaim"* step) are SUPERSEDED, not carried;
   (b) THERE IS NO COLLECTOR RE-ENTRANCY — the critique's `§4-3` finding is answered by REMOVING the mechanism it
   indicted, because a collector that never resolves a caller's names during a resolution cannot be re-entrant; (c) THE
   CRITIQUE'S CONDITION `C-8` (*"the pin set's root resolution, its omission outcome and its re-entrancy are declared"*) is
   therefore DISCHARGED IN THE NEGATIVE, with `U-STORE-DRAG`'s stop-and-ask item (which the as-filed `§7.1` item 5 gained
   for the pin set) WITHDRAWN beside; (d) THE ASYNC/CACHING CASE IS ANSWERED BY A REFUSAL INSTEAD: a write to an orphaned
   reference FAILS, LOUDLY, as a RETURNED record — the token is `§13` `DR-3`, and the reading here is that it is the same
   failure the walk's `A-SEVERED` arm reports (`§5.2` item 2's `'severed-link'`), because an orphan and a severed link are
   the same graph fact seen from the read side and the write side.** **(e) WHAT THIS COSTS, HONESTLY: a caller whose
   episode is genuinely interrupted by an async parent-chain rewrite must now HANDLE A DECLARED WRITE FAILURE rather than
   rely on a pinned root — which is a smaller surface, and a failure the caller can see, rather than a structure the store
   must keep consistent.**
**⟶ CONDITIONAL 2026-10-01 (ROUND 2) — THE CRITIQUE'S `§8-1` IS ACCEPTED, AND THE AS-FILED CLAIM ABOVE IS KEPT VISIBLE
AND MADE CONDITIONAL ON A FACT NO LANDED ROW ESTABLISHES.** **The critique's objection, in its own words: *"the premise is
not established, and the model's own worked case contradicts it … the slice's four references are different names … so
there is no at-address collision to eliminate: the merged arm's precondition survives the amendment untouched."*** **THE
HONEST READING, STATED RATHER THAN SMOOTHED: `§0.4` `A-A` makes the graph the source of truth FOR RESIDENCY, which is what
would eliminate the *"structurally incompatible objects at the same path"* case — but THAT case arises only if two writes
carrying the SAME LOGICAL PATH land in different tiers, and the held model BINDS BY LOGICAL PATH precisely so that they
compose (the held `§2.5` item 2's first-hit shadow, `§3.1` `M-1`; the same-logical-path/multi-tier fixture, `§3.1`
`M-6`).** **WHETHER THE AMENDMENT STILL PERMITS TWO TIER-FLAGGED HOLDERS FOR ONE LOGICAL PATH IS A CONTRACT QUESTION THIS
FILE MAY NOT DECIDE — it is `§13` `DR-11`, and this paragraph's *"`parts` has no reason to exist"* claim is DECLARED
CONDITIONAL ON `DR-11`'s ANSWER.** **Under the answer that a logical path has ONE holder, the claim stands and `parts` is
unreachable; under the answer that two holders may coexist, the merged arm and `parts` SURVIVE and `§6` `R3` is not a
supersession at all — which is why the claim is marked CONDITIONAL here rather than left as an assertion.**
| **J** | `REGENERATE` | a commit that re-tiers a node (`§0.4` `A-E`) | `→ K2` (the regenerated subtree's CENSUS MATCHES the original's, so the original is deleted as the transaction's LAST step) · `→ REFUSE('regeneration-failed')` **(NEW, token `§13` `DR-5`)** — **a CENSUS MISMATCH is a DECLARED FAILURE THAT LEAVES THE ORIGINAL ALIVE: nothing deleted, no partial state, a returned record** |
| **J2** | `REGENERATED` | a matched census | **terminal for the transaction** — the regenerated subtree is live at the new tier, the original is deleted, `N` affected references were crossed ONCE (one committed set) with one receipt row per reference, and each affected reference fired its own event (the held one-event-per-affected-reference rule) |
   (ROUND 2): the architect's eight answers DO NOT reach this clause, so it is NOT resolved here and NOT invented here. It
   is raised as a DECISION REQUEST with options, costs and a recommendation at `§13` `DR-4` — the three options being a
   DECLARED ACYCLICITY INVARIANT enforced at construction, a VISITED SET kept per resolution, and a DEPTH BOUND derived
   from the register's own cap (`§0.4` `A-G`) — together with the SEGMENT-AS-DATA rule for hostile segments (`'__proto__'`
   / `'constructor'` / `'toString'`, the held `§3a` seed `ADV-SC-1`), which is the same clause's other half. `§13` `DR-4`
   NAMES the owner (the architect) and the falsifier (a body that walks a cyclic link, or that treats a hostile segment as
   anything but DATA, with no declared rule).**
| **5** | **`'regeneration-failed'`** *(NEW, ROUND 2 — an `A-E` consequence, not an as-filed entry)* | **`J`** — a commit's subtree regeneration whose CENSUS MISMATCHES the original's, so the transaction fails and the original stays alive (`§0.4` `A-E`) | the held union has no member for *"a write's own multi-node transaction failed and nothing was changed"*: its deletion/posture tokens are operation causes, and a census mismatch is a transaction failure. **The token and its exact spelling are `§13` `DR-5`** |
**⟶ RE-STATED 2026-10-01 (ROUND 2), BECAUSE THE STEP-1 REPORT'S `§5` SHOWED THE AS-FILED ARITHMETIC DOES NOT SURVIVE ITS OWN
ROWS, AND BECAUSE THREE ROUND-2 ANSWERS MOVE THREE CELLS.** **THE AS-FILED FIGURES ABOVE STAY VISIBLE (`RCA-8(d)`). THE
CORRECTED CLASSIFICATION, IN THE STEP-1 REPORT'S OWN FORM, WITH ITS TERMS — AND IT IS THE ONE `§12`'s HELD-CONTRACT ROW
CITES:** **`7` UNCONDITIONAL SURVIVORS + `3` CONDITIONAL + `4` REPLACED + `4` SUPERSEDED + `1` NEW = `19` CLASSIFICATIONS
OVER `17` ROWS.** **The terms, named so no reader re-derives them:**
**(a) `7` UNCONDITIONAL SURVIVORS: `R2` · `R4` · `R10` · `R13` · `R14` · `R16` · and `R9`'s `clear` half** — **note that the
as-filed row set counts `R7` here; the correction MOVES it (`(b)` below).**
**(b) `3` CONDITIONAL SURVIVORS: `R7`** (the `reserved` re-home — *"SURVIVES ONLY IF RELOCATED"*, and the round-2 answers do
NOT decide it; `RISK 3` stands) **· `R9`** (`remove`/`sweep`'s MECHANISM — not declared until `§13` `DR-3` supplies the
severance's event and crossing) **· `R12`** (the reset/seed seam — it survives, and its own LIST is corrected, with its
`clear`/`sweep` neighbours conditional in the same pass). **AND A FOURTH CONDITIONAL, CARRIED BESIDE RATHER THAN COUNTED
IN THE THREE: `R14`** (the read's answer shape and the `cache`-is-the-handle identity rule — conditional on `§13` `DR-7`,
because a read that rebuilds inside the operation is what makes `cache`'s identity claim testable).
**(c) `4` REPLACED: `R1` · `R6` · `R8` · `R13`** — **as filed.**
**(d) `4` SUPERSEDED: `R3` · `R5` · `R11` · `R15`** — **and the round-2 corrections cut BOTH WAYS here: `R5`'s classification
becomes *"SCOPE RULED, not superseded"* (`§0.4` `A-H`) and `R11`'s becomes *"RELOCATED, not superseded"* (`A-G`), while
`R15`'s stays a REPLACED-order re-derivation and `R3`'s stays CONDITIONAL on `§13` `DR-11`.** **SO THE LIVE SET IS `2` clean
SUPERSEDED (`R3` conditional · `R15`) plus `2` re-classified (`R5` scope-ruled · `R11` relocated)** — **stated in those
words because a reader who takes *"four superseded"* from the as-filed line would over-state the amendment's cost.**
**(e) `1` NEW: `R17`.**
**(f) `19` CLASSIFICATIONS OVER `17` ROWS is not a mis-sum: `R5` and `R11` are each classified in two columns (their
as-filed class and their round-2 re-classification), and `R9` carries two mechanisms with different statuses — so
`17` rows yield `19` classifications + `R9`'s split, which is why the step-1 report's `19` is the honest figure and the
as-filed `17`-row line is a classification COUNT OF THE FIRST READING ONLY.** **AND THE STEP-1 REPORT'S OTHER `§5` FINDING IS
ACCEPTED: *"`R3`'s 'the merged arm's two composing cases are unreachable' is asserted rather than derived"* (`§8` item 8) —
`R3` is now CONDITIONAL on `§13` `DR-11` at its own site (`§4.1`'s round-2 block), which is the derivation the report
asked for in place of the assertion.**
**⟶ CORRECTED AND EXTENDED 2026-10-01 (ROUND 2). TWO CORRECTIONS AND ONE ADDITION, EACH KEPT BESIDE THE AS-FILED FORM
(`RCA-8(d)`): (a) THE AS-FILED COUNT *"`10` unimplementable rows"* IS A TABLE-ROW COUNT AND MIS-COUNTS THE SUBJECT — the
table's own rows `3–4` merge TWO held rows/clauses (`§2.5` item 5 + `§3.1` `M-5`), so the class carries **NINE held
rows/clauses over TEN table items**, which is the step-1 report's `D-4` correction; (b) THE ROUND-2 ANSWER MOVES ONE
TABLE ROW: the caps row (`§2.9` + `§3.1` `M-13` + `§3.2` `F-18`) is NOT unimplementable under `§0.4` `A-G` — its referent
RELOCATES to the register (`§6` `R11`'s round-2 block, `§13` `DR-8`), so it is removed from this class and re-filed as a
RELOCATION; (c) ONE TABLE ROW IS ADDED: **the held contract's own top-level refusal set is unimplementable AS WRITTEN** —
`docs/specs/store-core.md` `§2.6` item 3's sixteen-row token map has no top-level analogue under a top-level-only register,
and the arms that can still fire are NOWHERE ENUMERATED (the step-1 report's `§6` item 8), with `§5.2` item 6's
`'cap-exceeded'` and `§3(b)` item 4's four new arms NOT closing it. **So the honest count is `TEN TABLE ITEMS (with one
merge and one removal) + ONE ADDITION`, and the added row is item 11 below** — **raised as a DECISION REQUEST (`§13`
`DR-1`), not decided here.**
**⟶ CORRECTED 2026-10-01 (ROUND 2) — THE ARITHMETIC ABOVE IS KEPT VISIBLE AND ITS TWO FIGURES ARE CORRECTED, WITH THE TRUE
TERMS PRINTED (`REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`; the step-1 report's `D-5` and its `§5`).** **WHAT WAS WRONG:
the as-filed partition does not close — `2 + 6 + 12 = 20` is arithmetically true but the MIDDLE TERM IS NOT THE TERM THE
AMENDMENT MOVES, because the twelve rows the step-1 report enumerated as *"invalidated in part"* are the ones this file
called *"surviving"*.** **THE CORRECTED PARTITION, WITH ITS TERMS: `2` WHOLLY INVALIDATED + `12` INVALIDATED IN PART + `6`
SURVIVING = `20` ✓.** **The `2` WHOLLY INVALIDATED: `P-SC-TP-4` (the merged read and `parts`) · `P-SC-IM-12` (the caps and
their overflow outcomes).** **The `12` INVALIDATED IN PART: `P-SC-IM-1` (its merged arm) · `P-SC-IM-4` (its per-leaf
`G-3`/`G-9`/`G-10` cases) · `P-SC-IM-5` (matcher precedence) · `P-SC-IM-6` · `P-SC-IM-7` · `P-SC-IM-8` (the evaluation
point) · `P-SC-IM-9` · `P-SC-IM-11` (its `parts` comparison rule) · `P-SC-IM-13` · `P-SC-TP-1` · `P-SC-TP-2` ·
`P-SC-TP-3` (its `parts`/`merged` arms) — plus the second-query half of `P-SC-TP-5`, which the step-1 report counts within
the same twelve.** **The `6` SURVIVING: `P-SC-SM-1` · `P-SC-TP-5` (its first query) · `P-SC-TP-6` · `P-SC-TP-7` ·
`P-SC-IM-10` · `P-SC-IM-2`'s non-clear half.** **AND THE `400` TOTAL: THE TOTAL WAS NEVER BROKEN AND THIS FILE'S *"does not
survive"* PHRASING IS ABOUT THE FIGURE'S RE-USE, NOT ABOUT THE SUM — the step-2 critique's `§9-1` measured it exactly
(`30 + 28 + 24 + 40 + 40 + 9 + 14 + 8 + 20 + 24 + 22 + 24 + 24 + 6 + 5 + 5 + 20 + 6 + 5 + 20 = 400`, the printed chain
`30 → 58 → 82 → 122 → 162 → 171 → 185 → 209 → 229 → 269 → 293 → 315 → 339 → 345 → 350 → 355 → 375 → 381 → 386 → 400`, caps
`400 ≤ 400` and per-row maximum `40 ≤ 100` both unmoved).** **SO THE HONEST STATEMENT IS: THE SUM STANDS; FOURTEEN OF ITS
TWENTY TERMS CHANGE (the `2` + the `12`), NOT EIGHT; and a DONE row that re-prints `400` unchanged after an amended
register is a finding.** **THE FOURTEEN TERMS, NAMED, SO NO READER INFERS THEM FROM A COUNT: `P-SC-TP-4` · `P-SC-IM-12` ·
`P-SC-IM-1` · `P-SC-IM-4` · `P-SC-IM-5` · `P-SC-IM-6` · `P-SC-IM-7` · `P-SC-IM-8` · `P-SC-IM-9` · `P-SC-IM-11` ·
`P-SC-IM-13` · `P-SC-TP-1` · `P-SC-TP-2` · `P-SC-TP-3`.**
**⟶ AND THE HELD CONTRACT'S OWN DEFECT, REPORTED HERE BECAUSE THIS PASS CANNOT FIX IT AND BECAUSE A PROPOSAL THAT
RE-GRAINS A REGISTER MAY NOT RE-PRINT A FIGURE THE REGISTER CONTRADICTS: THE FAMILY SPLIT.** **`docs/specs/store-core.md`
`§5.5.2` item 2 prints the register's three families as *"`9` + `3` + `8` (`IM` + `SM` + `TP`)"*, while the same file's
`§5.5.1` heading, its `CURRENT STATE` item 3 and this proposal's own `§6.1` all print **`11` `P-SC-IM` + `1` `P-SC-SM` + `8`
`P-SC-TP`**, and the rows at `§5.5.1`'s own table are **`13` `P-SC-IM` (`IM-1`…`IM-13`) + `1` `P-SC-SM` (`SM-1`) + `6`
`P-SC-TP` (`TP-1`…`TP-7`) = `20` ✓**.** **THREE SITES, THREE DIFFERENT SETS, ONE FILE — the step-1 report filed it as
`D-held` (its `§2`'s last row) and the step-2 critique measured the same contradiction (its `§9-1`).** **THIS PASS REPORTS
AND ROUTES IT; IT DOES NOT EDIT THE HELD FILE (`§0`'s one-file rule).** **OWNER: `U-STORE-CORE`'s spec-gate pass, or the
successor contract's own spec gate under `§7.2` option (a) — the same pass that owns this register's re-grain.**
 **THE ROUTING IS EXPLICIT: whichever pass lands the successor register corrects `§5.5.1`'s heading, `CURRENT STATE` item
3 and `§5.5.2` item 2 TOGETHER, prints the corrected split WITH ITS TERMS, and keeps the three as-filed forms visible
under a dated annotation (`RCA-8(d)`).**
| **2** | **`U-STORE-CORE`'s FIRST RED SET** | **NOT AUTHORABLE AS WRITTEN, AND THIS IS THE DECISIVE FACT.** The architect ruled that *"THE FIRST RED SET CARRIES THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"* (`§1` item 1; the record's `§7`'s annotated ruling; the decision row `NEXT-SURVIVING-…` clause (7) and the `docs/decisions.md` `AUTONOMY AFTER SPEC APPROVAL` chain) ** | ** | **⟶ CORRECTED 2026-10-01 (ROUND 2): the as-filed parenthetical cites the wrong site for the second-`createStore` failure row — the failure is caught by `docs/specs/store-core.md` **`§2.12` item 1** with **`§3.5` `R-10`(b)** (the existence row that counts constructions per realm), NOT `§3.4` `R-10`/`§5.1` (step-1's `D-8`; see also `§7.1`'s item 4 citation). The as-filed citation stays visible; the corrected site is the one a later pass cites**. **Since no second pass is available, a red set that carried the held model and then re-grain the whole model would be the split the ruling forbids so the choice is not "amend and re-grain": it is "amend the contract FIRST, then author the first red set once"** ** | ** | **⟶  RE-STATED 2026-10-01 (ROUND 2): the claim HOLDS, and its CONDITION is now named, because the architect's eight answers decide the MODEL and not the FILING. The red set is authorable only once `§10` `Q-10` is settled — re-file (option (a): a new spec gate and a successor contract at the PROPOSED path `docs/specs/store-core-graph.md`) or amend in place (option (b): the held `§5.5.1` register re-grained). Under (a) the successor's register is authored FRESH against the successor contract, so the as-filed red set is REPLACED rather than re-grained; under (b) the register is re-grained with the FOURTEEN corrected terms (`§6.1`). Either way the red set is authored ONCE, against ONE contract — which is the ruling's own requirement — and until `Q-10` is settled the held red set stays NOT AUTHORABLE. The falsifier this row already carries stands** |
| **5** | **The five proposals' blocked-on lists** (the plan's `§6.5` round-3 table; `docs/pending.md` `P-6`) | **`U-STORE-FOCUS`** — its declaration set's SHAPE changes (top-level rows + anchors), **so a re-grain of its declaration rows is owed in addition to its existing blockers** (`docs/specs/focus-model.md`'s refusal rows + `docs/specs/focus-tool-greens.md` `FT-09`). **`U-STORE-DRAG`** — **its stop-and-ask list GAINS an item: the pin set and the episode's reclaim semantics** (§3(c)(iii)); its `RH-2` gate is unmoved. ** | ** | ** | **⟶ WITHDRAWN 2026-10-01 (ROUND 2): the pin set is GONE (`§0.4` `A-C` — no pin set is required; a write to an orphaned reference fails loudly, `§13` `DR-3`), so this item's GAIN IS RETRACTED and the stop-and-ask's live item is the severance's declared event and crossing (`DR-3`) plus the regeneration transaction's crossing/receipt/event set (`§0.4` `A-E`) where a `U-STORE-DRAG` episode commits to a higher tier. The as-filed gain stays visible above.** **`U-STORE-LAYOUT`** — reference SPELLINGS are unchanged, so its `ZQ-2`/`ZQ-3`/`ZQ-4` rows and `file.window.bounds`'s ruled shape (renderer owns, `main` applies) are unmoved; **its per-module store obligations re-grain**. **`U-STORE-MODULES`** — the `15 = 8 STORE-BACKED + 7 PURE` scope ruling and the `2 + 6` byte split (the ruling `R3-4`) survive, **but each of the eight modules' named obligations now names a walk-based read, so all eight re-grain.** **`U-STORE-TABS-STRIP`** — unmoved (it is a rendered strip; the `user-flow-audit.md` `§7.1` predicate follows it either way) |
  fails on the next pass.** **⟶ PARTLY CLOSED 2026-10-01 (ROUND 2, `§0.4` `A-F`): the VALIDITY rule is now declared —
  two caches, each a `name → lowest-durability match` dictionary, invalidated by ANY change to the top-level register OR
  ANY change to a link's anchor set — and the LANDED CLEAR RULE DOES CHANGE THE RESIDENT SET THE ENTRY WAS DERIVED FROM,
  so it IS an invalidator by the rule's own words: `commit('file.P', v)` clears the same logical path in every lower tier
  (the held `§2.10` item 1(a)), which changes the graph the entry was derived from, which invalidates the entry.** **SO
  THIS FALSIFIER IS SATISFIABLE AS STATED and the resurrection it names is closed BY THE RULE rather than by a repair
  pass.** **WHAT REMAINS OPEN — and it is why this risk is PARTLY rather than fully closed — is the timing question
  `§13` `DR-7` (is the rebuild inside the reading operation?), because a rebuild that runs on the read path is the one
  place the fix could still be defeated: if a read can rebuild an entry from a graph whose clear has not yet landed, the
  resurrection returns. The revisit condition is therefore the same ruling, narrowed to the timing half.**
  NOT authoritative and the flag is not a SECOND authority over the same fact — the tier token is the FILTER the
  resolution applies to the resolved node's own flag, and a filter miss is a VERBOSE DIAGNOSTIC naming the failed step
  (the architect's own case (iv): *"no existing landingPage has 'file' tier"*).** **THE FLAG'S DECLARATION SITE IS
  THEREFORE THE NODE'S OWN CONSTRUCTION — which the walk's `S6`/`S7` already imply and which `§13` `DR-1` carries as an
  explicit request, because *"which operation mints `type`"* (the critique's `§5-5`) is still a contract clause no
  round-2 answer names.** **THE DURABILITY-LIE HALF OF THIS RISK IS CLOSED BY CONSTRUCTION: a store cannot tell a caller
  its value is persisted when it is not, because the filter never returns a node whose flag disagrees with the requested
  tier — it DIAGNOSES instead.**
**⟶ CORRECTED 2026-10-01 (ROUND 2) — FIVE OF THIS PARAGRAPH'S FIGURES ARE CORRECTED BESIDE THE AS-FILED FORMS, WHICH STAY
VISIBLE (`RCA-8(d)`; the step-1 report's `D-1`…`D-5`, `D-7`, `D-held`).** **The corrected set, printed with its terms:**
**(a) the *"`10` unimplementable rows"* is `9` held rows/clauses over `10` table items, and the class is re-stated at
`§6.1`'s round-2 block (one merge counted; the caps row withdrawn as a RELOCATION; the register-refusal row added) —
`D-4`.** **(b) the register arithmetic is `2 + 12 + 6 = 20` ✓, NOT `2 + 6 + 12 = 20` with a different middle term's
meaning — `D-5` — and FOURTEEN terms change rather than eight (`§6.1`).** **(c) the record's *"`4` conditions on
`U-STORE-CORE`"* is `8` conditions `C-1`…`C-8`, with the record's own annotation naming `C-2`/`C-5`/`C-6`/`C-7`/`C-8` as
`CORE`'s first-red-set content — `D-2`.** **(d) the `§6`'s `17`-row classification `8 + 5 + 3 + 1` is re-stated at `§6`'s
round-2 block as `7` unconditional + `3` conditional + `4` REPLACED + `4` SUPERSEDED + `1` NEW = `19` classifications over
`17` rows — step 1 `§5`.** **(e) the qualifier-only rule's citation is `docs/specs/store-core.md` `§2.5` item 2, NOT
`§2.3` item 3 (`§2.3` item 3 is the no-alias rule) — `D-7`.** **AND THE ONE `D-held` ITEM, CARRIED NOT CORRECTED HERE: the
held contract's own family split (`§5.5.2` item 2's `9` + `3` + `8` vs `§5.5.1`'s heading and `CURRENT STATE` item 3's
`11` + `1` + `8` vs the table's own rows' `13` + `1` + `6`) is reported and ROUTED at `§6.1`, with its owner named
(`U-STORE-CORE`'s spec-gate pass or the successor's) — because this file amends nothing in `docs/specs/store-core.md`.**
**The `400` total's own sum is NOT corrected: it was never broken (`§6.1`'s round-2 block).**

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
| **1** | **WHAT A DECLARATION NOW IS** | **a declaration of a TOP-LEVEL ITEM** — its name, and (per §2.4 row 1) its standing as a parentless node. **Its `constraint` field and its `reserved` field are retained** (the held row shape's field names, `§2.6` item 2); **its `name` is no longer a full tier-qualified reference and its `shape` field (`concrete`/`pattern`) has no per-leaf meaning.** **Declaredness below the top level becomes RESOLVABILITY** — a leaf is "declared" iff the walk reaches it | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): under `§0.4` `A-A` the register is the GRAPH'S OWN TOP-LEVEL PROJECTION, so this clause is true BY CONSTRUCTION rather than by a second declaration surface; whether a CALLER-DECLARED row may also exist for a cold item is `§13` `DR-9`/`DR-10`, and `§2.4a` states the row shape the answers force** |
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
| **2** | **A CACHE THAT CAN BE STALE — AND THEREFORE A REBUILD RULE.** | the directive requires a *"valid cache"* and a *"rebuilding a stale one"*, and **neither the directive nor the repo states what makes an entry stale, who rebuilds it, or whether a rebuild is observable.** **The held model has NO cache-validity concept at all** — its read consults its tables synchronously and its only derived structures are the per-tier tries, which are maintained *"INSIDE THE TIER'S OWN MUTATING OPERATIONS, in the same synchronous step"* with **NO EXTRA WRITE** and **NO EXTRA PING** (held `§2.7` items 2/3; the plan's `§1.9` (i)). **So the amendment introduces the held model's first DERIVED-AND-POSSIBLY-WRONG structure — and the held model explicitly refused that class by making its one derived structure synchronous and event-free.** **The falsifier is §9's risk 2: a rebuild that resurrects a cleared value** | | ** | ** | **⟶ ANSWERED 2026-10-01 (ROUND 2, `§0.4` `A-F`): THE DIRECTIVE'S *"valid cache"* AND *"rebuilding a stale one"* NOW HAVE THEIR RULE — TWO caches (the register cache and the per-link cache), each a `name → lowest-durability match` dictionary, invalidated by ANY change to the top-level register OR ANY change to a link's anchor set, with ANCHORS IMMUTABLE so that *"a change to a link's anchor set"* is the only way a link's addressability moves. THE STALENESS QUESTION IS THEREFORE CLOSED IN KIND: an entry is stale IFF the thing it was derived from changed, and the two things are named. WHAT REMAINS OPEN IS NOT VALIDITY BUT TIMING — whether the rebuild runs INSIDE the reading operation — and that is `§13` `DR-7`, deliberately NOT decided here, because the held `§2.9` item 3 pins *"`read` is UNCAPPED: a read never changes a count and can never overflow"*.** |
| **3** | **A NEW STRUCTURE THE STORE MUST KEEP CONSISTENT — FIVE, IN FACT.** | the held model keeps **the four tier tables + one trie per tier + the declaration table + the constraint table + the subscription record**; `§2.1`'s amendment needs **the graph (nodes/anchors/links) + the register + the resolution cache + the tier collections + (if reclaim of an episode is to be safe) the pin set** — and **the pin set is the one that has no held analogue and whose absence deletes an in-flight value (§3(c)(iii))**. **The consistency burden is the real cost: the held model's trie row is checkable against its own table by a differential (`§3.4` `R-14`, register row `P-SC-TP-5` — *"a trie that disagrees with its own table is a FAILURE"*), and each new structure owes its own such row** | | ** | ** | **⟶ CORRECTED 2026-10-01 (ROUND 2, `§0.4` `A-A`/`A-C`/`A-F`): THE *"FIVE, IN FACT"* FIGURE IS SUPERSEDED — THE COUNT IS FOUR, and the fifth member the as-filed cell names is DELETED, not carried. The as-filed list is kept visible above. THE CORRECTED TERMS, PRINTED WITH THEM: the amendment keeps the graph (nodes/anchors/links) · the register (the graph's top-level PROJECTION, `A-A`) · the resolution caches (TWO dictionaries, `A-F`) · the tier collections (VIEWS of the graph, `A-A`) — and **the PIN SET IS GONE** (`A-C`: no pin set is required, and a write to an orphaned reference fails loudly). So `5` becomes `4`, the *"if reclaim of an episode is to be safe"* parenthetical is withdrawn with its subject, and §7.1 item 5's stop-and-ask gain (the pin set and the episode's reclaim semantics) is withdrawn beside. The per-tier TRIES stay as views/indexes and remain a fifth thing to keep consistent — which is why the honest count is *"four new structures PLUS the per-tier tries the held model already keeps"*, and the critique's `§3` structure-count correction (the trie it keeps and the secure collection it keeps, both omitted from the as-filed count) is accepted in that form** |
| **4** | **THE REGISTER'S COVERAGE SHRINKS TO TOP LEVEL.** | **the held registry can refuse an undeclared name at WRITE TIME for every reference** (`§2.6` item 3's `G-1`; `§1` item 4's *"the store's SECOND CONTRACT SURFACE"*); **the amendment refuses at the TOP-LEVEL segment only and treats declaredness below it as resolvability** (§3(b) item 1). **The measurable loss: the per-leaf refusal set `G-1`…`G-10` × `H-1`…`H-6` — 16 enumerated rows with 16 named positive controls (`§3.4` `R-5`; register row `P-SC-IM-4`, *"`40` attempts = `10` cases × `2` halves"*) — collapses to the subset that survives at top level, and the per-reference `reserved` refusal the round-3 ruling `R3-2` depends on has no home (§3(b) item 3(b))** | | ** | ** | **⟶ CORRECTED 2026-10-01 (ROUND 2): the register row is cited IN A FORM THE REGISTER DOES NOT PRINT (step-1's `D-1`). The register prints `P-SC-IM-4` as *"`10` registry cases × `2` halves"* over *"`10` refusal cases AND its `10` paired positive controls"*; the *"× 2 halves"* form belongs to `P-SC-IM-12` (the caps). The corrected citation is `"40 = 10 registry cases × 2 halves"`, and the held contract's own `§5.5.3` prints that row's term as `40` = `10` registry cases × `2` halves — so the FIGURE was right and the FORM was wrong. The as-filed form stays visible.** |

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
| **I** | `FLAG` | the resolved node's `type` flag | `→ ANSWER` (the flag agrees with the name's tier token) · `→ REFUSE('tier-contradiction')` **(NEW)** — **or, under §10 `Q-6`'s alternative, the name is authoritative and the walk returns to `H` to seek an agreeing sibling** | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): `Q-6` IS ANSWERED — the tier token is the FILTER the resolution applies to the flag (`§0.4` `A-D`), so the second branch (name authoritative, walk continues) is NOT taken: a filter miss is the architect's case (iv) *"no existing landingPage has 'file' tier"*, reported as a VERBOSE DIAGNOSTIC naming the failed step. The token `'tier-contradiction'` survives RE-POINTED to this filter-miss (`§2.3`'s failure-arm table; `§13` `DR-1` for the alternative)** |
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
   non-total by construction.** **This is the amendment's clearest new totality obligation.** **⟶ STILL OPEN 2026-10-01
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
| **6** | `'cap-exceeded'` | **AT RISK — its referent is the three caps** | **the amendment replaces the caps with reachability** (§1 `M-4`; §6 `R11`), so the token's three arms (`CAP-1`/`CAP-2`/`CAP-3`'s overflow outcomes, `§2.9` item 1) have no referent **unless the register itself is capped, which the directive's *"only needs to count top-level items"* suggests rather than forbids** | | ** | ** | **⟶ RESOLVED 2026-10-01 (ROUND 2, `§0.4` `A-G`): THE TOKEN KEEPS A REFERENT — the architect's answer moves the caps to the TOP-LEVEL REGISTER (`RCAP-1`/`RCAP-2`/`RCAP-3`) and uses reachability WITHIN the graph, so the as-filed *"AT RISK"* is superseded and the three overflow outcomes stand with the register as their counter. The VALUES carry a re-derivation request (`§13` `DR-8`) because the held figures count tier collections and this row counts REGISTER ROWS** |
| **7** | `'ambiguous-path'` | **SURVIVES AS AN UNREACHABLE-OR-NARROWED TOKEN** | the held `§0A` note 4 **already scopes this token to the ONE tier-free case, leaving it *"declared but currently unreachable"*** (`§7a.1` item 2a), and the plan's own `remove` falsifier requires a tier-qualified removal to succeed with a lower copy resident — **so its status is unchanged by the amendment, and its ambiguity is the held filing's, not this proposal's** |
| **8** | `'reserved-namespace'` | **SURVIVES, RELOCATED** | its held arm is a concrete declaration colliding with a caller-supplied reserved key (`§2.6` item 6) — **its natural amendment home is an ANCHOR KEY colliding with a reserved key** |

**THE TOKENS THE TRAVERSAL NEEDS AND THE UNION DOES NOT HAVE — FOUR, EACH A CLOSURE DECISION:**

| # | The proposed token | The state that mints it | Why the held union cannot express it |
| --- | --- | --- | --- |
| **1** | **`'no-such-anchor'`** | `D` (and `H`'s stopped-chain arm) | the held model has no anchors, so its union has no member for *"the top-level item exists and the owner chain does not"* — the held nearest arm is `'undeclared-name'`, **whose use here would be a MISREPORT** (the name IS declared; its chain is absent), and a misreporting closed union is exactly what the plan's own `ProjectionSkipReason` discipline refuses (`docs/specs/projection.md` `§2.1`'s closed union comment: *"a closed union may grow by ruling; what it may NOT do is misreport"*) |
| **2** | **`'severed-link'`** | `E` | the reclaim arm is new (§3(c)); the held union's deletion tokens are all OPERATION causes, not graph states |
| **3** | **`'rebuild-failed'`** | `G` | the held model has no cache (§4.2 cost 2) |
| **4** | **`'tier-contradiction'`** | `I` | the held model's tier is a property of the NAME, so no disagreement is expressible; `G-3` (a name whose first segment disagrees with its declared tier) is its nearest relative and is per-reference | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): `I` now reports a FILTER MISS against the node's own flag (`§0.4` `A-D`) — the architect's case (iv), *"no existing landingPage has 'file' tier"* — and the token is RE-POINTED to that case rather than to a two-authority disagreement, which no longer exists in the model (`§13` `DR-1` for the alternative naming)** |
| **5** | *(a fifth REFUSAL KIND, if link access control lands)* **an ACCESS refusal** — the directive's *"links can be used to direct and control reference access"* | a link that refuses a traversal the register admitted | the held union's eight tokens include no access member, and the held `secure` refusal is by NAME rather than by link — **so an access arm is a NEW REFUSAL KIND, not a new token in an existing kind.** **AND A `[T]` PRECEDENT EXISTS, WITH ITS BOUND NAMED:** the vendored `LinkConfigErrorCode` union is **`'unique-order' \| 'count-exceeded' \| 'count-underflow' \| 'role-mismatch'`** — four tokens that *refuse a link's own membership/order/role*, which is a real link-level refusal vocabulary; **but all four are CONFIG-TIME errors on a link's declaration (`LinkConfig`'s `parent?: {count: 1}` and its `children` counts), never RUNTIME access decisions over a traversal**, so they are a precedent for the SHAPE and not for the SEMANTICS | | ** | ** | **⟶ STILL OPEN 2026-10-01 (ROUND 2): THE ARCHITECT'S EIGHT ANSWERS DO NOT DECIDE THE ACCESS-REFUSAL KIND, so this entry is NOT resolved and NOT dropped here — it is raised as `§13` `DR-2`, with its two options (a SECOND REFUSAL KIND with its own union, mapping table and positive controls, whose cost is an export-census consequence — the held `store-core.md` `§2.1` `TWENTY`-name census, with `§2.2` `P-12`/`§3.3` `I-11`/`§3.4` `R-12` pinning the five frozen seams BY SET EQUALITY, so a second kind is a twenty-first export; OR squeezing the access arm into the first kind, against `§5.2`'s own finding that an access arm is a new KIND). The critique's `§7-4` is therefore ROUTED, not closed** |

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
| **R5** | **the no-engine-id rule** — plan `§1.3` `R-5` (second half); held `§2.3` item 5 + `§3.4` `R-9` | **SUPERSEDED, AND THIS IS COLLISION 1** | §3(a) resolution **(1)** *(recommended)*: the store's own store-minted graph ids; the ENGINE-id half of both rows survives | **plan `§1.3` `R-5` (second half) · plan `§3.3` row `2.3-8` · plan `§7.2` `F-5`'s *"explicitly not worsened"* cell · held `§2.3` item 5` and `§3.4` `R-9` — and a `docs/decisions.md` ACTIVE row, because none of the four is a decision row today** | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): the cell's *"§3(a) resolution (1)"* is REPLACED BY A RULING — `R-9`'s SCOPE IS RULED (a GLOBAL ENGINE-ID-KEYED map is banned; a PER-LINK target set keyed by name is not), with the argument MADE at `§0.4` `A-H` and the four touched rows NAMED at `§3(a)`'s round-2 block. THE CLASSIFICATION OF THIS ROW IS THEREFORE *"SCOPE RULED, NOT SUPERSEDED"*: `R-5`'s second half and `R-9`'s no-string-to-entry-map clause are read at their ruled scope rather than withdrawn, so the row NO LONGER SITS IN THE SUPERSEDED COLUMN — it is a SCOPE RULING whose amendment row and decisions row are owed at `U-STORE-CORE`'s spec-gate pass.** |
| **R6** | **the registry's per-reference pattern table** — `§2.6` items 2/5; `G-1`…`G-10`'s per-leaf arms | **REPLACED** | a **top-level-only register** (§3(b)); per-leaf declaredness becomes resolvability | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (5)**'s registry clause; **the record's `C-2`/`C-3`; held `§7a.1` item 1** (the declaration fixture's supplier) |
| **R7** | **the registry's `reserved` per-reference refusal** — `§2.6` item 2; `G-4`; `§2.6` item 5 row 3 | **SURVIVES ONLY IF RELOCATED** | §10 `Q-7`: re-home `reserved` on the **anchor** or the **link** so the landing entry's by-name refusal survives | **`docs/decisions.md` `NEXT-SURVIVING-REPAIR-LANDING-AS-A-TABID-INSTANCE-…` clause (2)** — *the landing reference reserved by ONE `concrete` declaration that OUTRANKS the pattern, so only the ENTRY's OWN removal is refused*. **This is the amendment's sharpest landed-ruling exposure** | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): THIS ROW IS A CONDITIONAL SURVIVOR, NOT AN UNCONDITIONAL ONE. The architect's eight answers do NOT decide `reserved`'s re-home, so the held contract re-check's *"SURVIVES ONLY IF RELOCATED"* is the live classification (`§12`'s held-contract row; `RISK 3` stands unchanged), and its two-call control (`M-10`/`F-14`) remains the falsifier.** |
| **R8** | **the constraint table's evaluation point** — `§2.10` items 6/9; the plan's `§1.9` (iv) | **REPLACED (evaluation point only)** | declared on the top-level row, evaluated **at the anchor the write passes through** (§3(b) item 5); **the `R3-1` outcome rule and the `REPAIR`/never-refuse posture are UNCHANGED** | **`QUALIFIED-READ-…`**'s constraint-clause and **`NEXT-SURVIVING-…` clause (1)** (the repair rule survives verbatim); what supersedes is the plan's *"EVERY WRITE AND EVERY `remove`"* evaluation set |
| **R9** | **`remove` / `clear` / `sweep`** — `§2.10` items 2/3; `§2.12` item 3 | **SURVIVES AS OPERATIONS; `sweep`'s MECHANISM REPLACED** | `remove`'s DOWNWARD rule survives semantically with a **replaced mechanism** (sever + reclaim vs logical-path clear) — **§10 `Q-1` decides whether the logical path is kept as a second key, in which case the mechanism survives too**; `clear` survives verbatim (tier-local, non-recursive); `sweep` becomes **release-the-pin-set + reclaim** with the `N`-events rule intact | **`NEXT-SURVIVING-…` clause (4)** (the downward rule — survives semantically); **§3(c)(iv)** shows the two interactions (dedupe, no double event) that must be declared for it to stay true | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): THIS ROW IS A CONDITIONAL SURVIVOR TOO — its *"sever + reclaim"* mechanism is NOT declared until `§13` `DR-3` supplies the severance's own event and crossing, and the pin-set half of `sweep` is WITHDRAWN (`§0.4` `A-C`: no pin set exists). `clear` survives verbatim; `remove`'s DOWNWARD rule survives semantically with reachability as its mechanism; and `sweep` becomes *"reclaim what the terminal made unreachable"* with the `N`-events rule intact.** |
| **R10** | **the event surface and the per-affected-reference rule** — `§2.11`'s seven arms; `§3.3` `I-14`; `§3.4` `R-2` | **SURVIVES, EXTENDED** | the same envelope and the same one-event-per-affected-reference count, **plus a new `cause` token for severance/reclaim** (§3(c)(ii) item 2) | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (4)** and **`QUALIFIED-READ-…`**'s envelope clause (both survive; the union's closure re-opens, so a dated annotation is owed rather than a supersession) |
| **R11** | **the three caps** — `§2.9` items 1–3 (`CAP-1` 1024 · `CAP-2` 4096 · `CAP-3` 64); `§3.1` `M-13`; `§3.2` `F-18` | **SUPERSEDED** | **reachability** replaces counted caps (§1 `M-4`); the model's own leak classes are answered by collection, not by a refusal | **the record's `C-7`** (*"every cap value and its overflow outcome is declared"*); **`QUALIFIED-READ-…`**'s and **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (1)**'s cap references; **the non-destructive posture `C-3` stays** and is a CONSTRAINT on the collector (§3(c)(i) item 1) | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2, `§0.4` `A-G`): THIS ROW IS NOT A SUPERSESSION. The architect's answer keeps the caps and MOVES them to the TOP-LEVEL REGISTER (`RCAP-1`/`RCAP-2`/`RCAP-3`), with reachability replacing WITHIN THE GRAPH rather than replacing the caps. So the live classification is *"RELOCATED — the caps' REFERENT moves from the tier collections to the register's own rows"*, `C-7`'s obligation is discharged by the register's caps rather than by deletion, the non-destructive posture (`C-3`) binds the register-side overflow exactly as it bound the tier-side one, and the three values carry a RE-DERIVATION REQUEST (`§13` `DR-8`) because the held figures count tier collections while the register-side caps count REGISTER ROWS — so the held values are working values, not inherited ones.** |
| **R12** | **the test-only reset/seed seam** — `§2.8` items 1–4; `§3.4` `R-10`(c) | **SURVIVES** | unchanged in shape; **its `reset()` must additionally rebuild the graph, the register, the resolution cache and the pin set**, which is a widening of one clause and not a replacement | none — the record's `C-8` is discharged by the surviving row | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): the cell's OWN LIST is corrected — the pin set is GONE (`§0.4` `A-C`), so `reset()` rebuilds the graph, the register AND ITS CACHE, and the TWO resolution caches (`A-F`: the register cache and the per-link cache). The as-filed list stays visible above; the corrected list is the one a later pass cites. The row remains a SURVIVOR, and this is a CONDITIONAL one only insofar as its `clear`/`sweep` neighbours are (`R9`).** |
| **R13** | **`storeReferences`** — `§2.6` item 1; the plan's `§1.3` `R-2`; the record's `C-4` | **SURVIVES IN HOME AND REALM; REPLACED IN SHAPE** | still renderer-side beside the store, consulted in-realm with zero crossings; **its row shape becomes a top-level register row** (`§2.4` row 1), and its export census changes | **the record's `C-4`** (the file and realm — survives); **held `§7a.1` item 6** (the export census — replaced) |
| **R14** | **the read's answer SHAPE and the declared miss** — `§2.1`; `§2.5` cases (d)/(e); `M-1`/`M-2`; the held `cache`-is-the-handle identity rule (`M-2`, `§2.2` `P-5`) | **SURVIVES** | `{found, value, tier, cache, name}` stays, with **`value` from the node and `tier` from the flag**; `cache` becomes **the tier collection's own handle, or the resolution-cache entry** — **§10 `Q-2`/`Q-9` decide which, and `M-2`'s `toBe`-identity row must be re-derived against whichever is chosen** | **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2)** (the shape and the miss survive) |
| **R15** | **the read's PRECEDENCE** — `§2.5` item 1's fixed and total order `secure → malformed → registry → first hit → merged → miss`; `§3.4` `R-4` | **REPLACED** | the amended order `secure → malformed → register → anchor/link walk → cache/rebuild → flag → answer-or-miss` (§5.1's `A`…`L`) | **`QUALIFIED-READ-…` clause (1)** and **`FOUR-TIER-DATA-OWNERSHIP-MODEL` clause (2)** — the ORDER is a landed clause, so a re-derivation is owed rather than an annotation | | ** | ** | **⟶ AMENDED 2026-10-01 (ROUND 2): the amended order's last two steps are re-worded by the architect's answers — the tier token is a FILTER and its miss is a DIAGNOSTIC (`§0.4` `A-D`), and the register is the graph's top-level PROJECTION rather than a table looked up before a walk (`A-A`). So the live order is `secure → malformed → register-projection → anchor/link walk → cache/rebuild → flag filter → answer-or-diagnostic`, and the MISS/refusal distinction the held model pins (`§3.2` `F-9`) survives unchanged at the leaf (`§5.1` items 5 and `L`). The re-derivation of the held precedence row (`§3.4` `R-4`) is still owed — the ORDER is a landed clause.** |
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
| **6** | `§3.3` `I-13` (the per-arm key census over `parts`/`merged`) | the members it censuses are gone | | ** | ** | **⟶ CORRECTED 2026-10-01 (ROUND 2): the as-filed citation is a MIS-CITATION — the row is `§3.4` `R-13` (the per-arm `hasOwnProperty` census), as item 10 below already states; `§3.3`'s `I-13` is the event envelope's five common members (the step-1 report's `D-6`). The correction is by ANNOTATION and the as-filed form stays visible** |
| **7** | `§2.9` (`CAP-1`/`CAP-2`/`CAP-3`) + `§3.1` `M-13` + `§3.2` `F-18` | its three caps and their overflow outcomes have no referent | | ** | ** | **⟶ WITHDRAWN FROM THIS CLASS 2026-10-01 (ROUND 2): `§0.4` `A-G` RELOCATES the caps to the top-level register (`RCAP-1`/`RCAP-2`/`RCAP-3`) with reachability replacing WITHIN the graph — so the row's referent MOVES rather than dies, the overflow outcomes are reused verbatim, and the row's live status is *"RELOCATED, with a re-derivation request on the three values (`§13` `DR-8`)"* rather than *"unimplementable"* (`§6` `R11`'s round-2 block). The as-filed cell stays visible** |
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
| **1** | **`U-STORE-CORE`'s BOUNDARY** | **YES — SUBSTANTIVELY.** The unit's one-sentence contract (`§1` item 1) enumerates *"the layered read with its five cases and its `{found, value, tier, cache, name}` / `{merged, parts}` shapes, the reference grammar …, the DECLARED NAME REGISTRY …, the residency trie, the constraint table with its one `REPAIR` row, `remove`/`clear`/`sweep` …, and the one event envelope with its seven `cause` tokens"* — **and the amendment changes THE READ (`R15`/`R3`), THE REGISTRY (`R6`/`R7`), THE TRIE'S SECOND QUERY (`R2`), THE CONSTRAINT TABLE'S EVALUATION POINT (`R8`), `sweep` (`R9`) AND THE CAPS (`R11`).** **Six of the seven enumerated elements move.** **The unit's NAME, its realm (renderer, `§2.12` item 2), its tier tokens, its answer shape, its commit rule and its event envelope all survive; its SHAPE does not** | | ** | ** | **⟶ CORRECTED 2026-10-01 (ROUND 2): THE COUNT IS FOUR, NOT SIX — and it is corrected BY ANNOTATION, with the as-filed words kept visible (step-1's `D-3`). FOUR of the seven enumerated elements move: the READ · the REGISTRY · the TRIE (its second query) · the CONSTRAINT TABLE (its evaluation point). THE ELEMENTS THE AS-FILED SENTENCE COUNTED IN ADDITION ARE NOT IN `§1` ITEM 1's ENUMERATED SEVEN AT ALL: `sweep` and the caps are named by other clauses of the unit's one-sentence contract, not inside the enumerated seven. So *"six of the seven"* counts two elements that the list it refers to does not contain, and the honest figure over the SEVEN is FOUR. The `sweep`/caps movement is real and is counted where it belongs — `§6` `R9`/`R11` — not against a seven-element list that does not include them.** |
| **2** | **`U-STORE-CORE`'s FIRST RED SET** | **NOT AUTHORABLE AS WRITTEN, AND THIS IS THE DECISIVE FACT.** The architect ruled that *"THE FIRST RED SET CARRIES THE WHOLE MODEL AND NO SECOND CORE PASS IS DECLARED"* (`§1` item 1; the record's `§7`'s annotated ruling; the decision row `NEXT-SURVIVING-…` clause (7) and the `docs/decisions.md` `AUTONOMY AFTER SPEC APPROVAL` chain). **Since no second pass is available, a red set that carried the held model and then re-grain the whole model would be the split the ruling forbids — so the choice is not "amend and re-grain": it is "amend the contract FIRST, then author the first red set once"** |
| **3** | **`U-STORE-PERSIST` (admitted, row `G2`)** | **AFFECTED, NOT WHOLESALE.** Its subject is tier 1 as **a table + the main-side channel** — the boot hand-off, the commit crossing, the atomic write, the migration, the receipts (the record's `§4`; the plan's `§2.5`). **The amendment changes what the hand-off CARRIES (register rows + graph membership rather than a `{name, value}[]` list), and it makes SEVERANCE a commit-class write (§3(c)(i) item 1)** — **so its `Y-1`/`Y-2` shapes and its receipt set both change, and `NW-15`'s kill-between-persist-and-receipt duty (the record's `C-9`) becomes MORE load-bearing, because a lost write is recoverable while a lost DELETE is a resurrection (§3(c)(iv) item 3)** |
| **4** | **`U-STORE-SECURITY` (admitted, row `G3`)** | **LARGELY UNAFFECTED, AND ARGUABLY SIMPLIFIED.** The directive's *"security is a separate collection"* **agrees with every landed tier-4 rule** — main-only, no renderer read, a typed refusal before the registry, manual-UI-only by construction (`docs/specs/mcp-endpoint.md` `§6.4`; layer 1 `§5` `A-7`; held `§2.6` item 4). **Its `RH-3` cap and burst duties and its atomic-write/receipt duties are untouched.** **The one new question it inherits: whether the separate collection is a COLLECTION IN THE SAME SENSE as §2.4 row 2's three, or a structure of its own** | | ** | ** | **⟶ ANSWERED 2026-10-01 (ROUND 2): under `§0.4` `A-A` the three non-security tier collections are VIEWS of the graph, and the directive's *"separate collection"* is the tier that is OUTSIDE the graph's traversal by construction (§2.1 row 5, `§2.2` item 3) — so the separate collection is NOT a view and NOT a member of the graph's traversal, which is what makes the `secure` refusal decidable BEFORE the walk begins. The unit is otherwise unaffected, as this row says.** |
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
  default, and `§2.2` `P-2` closes invented defaults.** **⟶ ANSWERED 2026-10-01 (ROUND 2, `§0.4` `A-D`/`A-A`): the name is

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
| **Q-1** | **DOES THE RESOLUTION VOCABULARY SUPERSEDE THE NO-ENGINE-ID RULE?** | **(1) supersede `R-5`'s second half only, with store-minted ids and the import census intact** — cost: two rows re-read, the `F-5` third-holder finding re-classified, one new `docs/decisions.md` row. **(2) keep `R-5` whole and make the walk return a non-id handle** — cost: the directive's own example must be re-spelled, and the analogy weakens. **(3) rename the vocabulary** — cost: nothing is fixed and the collision is renamed rather than confronted (refused on the merits) | **(1)** — §3(a)'s recommended resolution, with the `F-5` re-classification MADE rather than asserted |** | ** | **⟶ ROUND 2 (2026-10-01): DECIDED IN KIND BY THE ARCHITECT — `R-9`'s SCOPE IS RULED (`§0.4` `A-H`), resolution (1)'s WORDING is superseded and its CONCLUSION survives by the ruling, and `F-5`'s cell is re-classified by the three-part argument at `A-H` (`§3(a)`'s round-2 block). The `docs/decisions.md` ACTIVE row and the held contract's amendment row are owed at `U-STORE-CORE`'s spec-gate pass or its successor's** |
| **Q-2** | **DOES THE STORE'S GRAPH SURVIVE A RE-DERIVATION, OR IS IT REBUILT?** | **(1) the store's OWN graph, independent of the engine's per-load teardown** — cost: the *"similar to the provident architecture"* is a STRUCTURAL analogy, not a shared object, and a reader expecting one graph will be corrected. **(2) the engine's graph** — cost: every load invalidates every resolution (RISK 1), the store imports `provident-ssr` (reddening `§2.2` `P-9` / `§3.4` `R-11` / `§3.3` `I-1`), and `src/shared/**` or the vendored tree becomes fork-visible (§8 item 2). **(3) a hybrid: the store's own graph, with the engine's `data-node-id` used as a declared KEY on the store's own nodes** — cost: it re-opens `R-5`'s first half and re-creates the third-holder question | **(1)** — it is the only option that closes RISK 1 by construction AND keeps §8's fork section short |** | ** | **⟶ ROUND 2 (2026-10-01): the store's OWN graph stands, and the architect's source-of-truth answer (`§0.4` `A-A`) settles what THIS question left open — the graph is the authority for residency, the tier collections are VIEWS, and the tries are indexes (`§2.4a`, `§0.4` `D-RES`/`D-ADDR`/`D-DEL`). `Q-2`'s store-owns-its-graph half is therefore ANSWERED; what remains from this question is `Q-10` (the FILING)** |
| **Q-3** | **IS RECLAIM EAGER OR DEFERRED TO A COMMIT?** | **(1) persist-first for `file`-flagged nodes (§3(c)(i) item 2: the durable accept orders the reclaim, so a crash loses a WRITE, never a DELETE), eager-with-a-declared-event for `mem`/`temp`** — cost: two timings with two receipt shapes, and a `mem` reclaim is not crash-safe (acceptable: `mem` is realm-scoped by construction, the plan's `§2.5`). **(2) deferred to the next commit for every tier** — cost: unreachable nodes accumulate within a realm, which is the leak class the collector exists to answer. **(3) eager everywhere plus a persisted TOMBSTONE** — cost: a new persisted structure with its own reconciliation rule, buying crash-safety for the durable tier | **(1)** — with the tombstone named as the escalation path if the architect wants the crash window closed for `file` as well |** | ** | **⟶ ROUND 2 (2026-10-01): the architect's deletion answer (`§0.4` `A-B`) makes the durable half a TRANSLATION write rather than a tombstone, and the concurrency answer (`A-C`) removes the pin set the eager/deferred choice was entangled with. What this question still needs is `§13` `DR-3` (the severance's declared EVENT and CROSSING — the critique's condition `C-6`), which is not answered** |
| **Q-4** | **WHAT MAKES A CACHE ENTRY STALE, AND WHO REBUILDS IT?** | **(1) a per-link VERSION TOKEN bumped by every write/clear/reclaim that touches the link's subtree, with the rebuild inside the reading operation** — cost: a version field on every link, and the invalidator set must be EXHAUSTIVE or RISK 2 fails. **(2) no cache: every resolution walks** — cost: it deletes the directive's own *"valid cache / rebuilding a stale one"* clause, and it makes RISK 5's cost unconditional. **(3) a write-through cache invalidated only by the store's own mutators** — cost: sound for the store's own writes and UNSOUND for a `main`-side change arriving by the `Y-3` push (the plan's `§2.5`), which the held model already declares a no-op on today's single-window app | **(1)**, with the invalidator set named in the contract — **and the clear rule (`C-1`…`C-5`) named as an invalidator, or RISK 2's falsifier fails** |** | ** | **⟶ ANSWERED 2026-10-01 (ROUND 2, `§0.4` `A-F`): `Q-4`'s VALIDITY half is decided — TWO caches (the register cache and the per-link cache), `name → lowest-durability match`, invalidated by any top-level-register change or any change to a link's anchor set, with ANCHORS IMMUTABLE so re-parenting is delete-plus-mint. The clear rule is an invalidator BY THAT RULE (it changes the resident set). WHAT REMAINS OPEN IS THE TIMING: this option's *"with the rebuild inside the reading operation"* is raised as `§13` `DR-7`, because the held `§2.9` item 3 pins *"`read` is UNCAPPED: a read never changes a count and can never overflow"* and a read that writes a cache entry is a read with a side effect** |
| **Q-5** | **IS THE MULTI-LEVEL EXPORT A SNAPSHOT OR A LIVE HANDLE?** | **(1) a SNAPSHOT: a fresh object per call, NON-AUTHORITATIVE, no tier behind it** — cost: an export is recomputed per call (the depth cost again), and a caller that mutates it changes nothing (which is a feature). **(2) a LIVE HANDLE into the cache** — cost: a new mutability surface, an aliasing hazard between the export and the store's own value, and the held model nowhere grants one. **(3) the caller's option** | **(1)** — it reuses the status the held model already declares for the one composite it produces (held `§2.5` item 5: *"NON-AUTHORITATIVE — no tier holds it, it is recomputed on every read"*; the gate-1 record's `§10` `R3` risk), so it is the only option whose authority question is already ruled |
| **Q-6** | **WHEN THE FLAG AND THE NAME'S TIER SEGMENT DISAGREE, WHICH WINS?** | **(1) the FLAG is authoritative and the disagreement is a TYPED REFUSAL (`'tier-contradiction'`)** — cost: one new token and the register must declare the expected flag (or the flag is a default, closed by `§2.2` `P-2`). **(2) the NAME is authoritative and the walk seeks an agreeing sibling** — cost: it re-derives the held first-hit rule's shadowing semantics inside a graph, which is the mechanism `R3` supersedes. **(3) the answer silently reports the node's own flag** — cost: the durability lie RISK 6 names | **(1)** — it keeps the tier vocabulary honest, which is the vocabulary's whole job |** | ** | **⟶ SUPERSEDED 2026-10-01 (ROUND 2, `§0.4` `A-D`): option (1)'s *"the FLAG is authoritative and the disagreement is a TYPED REFUSAL"* framing assumed TWO authorities over one fact; the architect's answer removes the second authority — the tier token is the FILTER, the flag is the only residency carrier, and a filter miss is a verbose diagnostic (case (iv)). Option (2) is NOT taken, and option (3)'s durability lie is closed by construction. The token naming is `§13` `DR-1`** |
| **Q-7** | **DO `reserved` AND THE PER-LEAF PATTERNS RE-HOME ON THE ANCHOR/LINK, OR ARE THEY DROPPED?** | **(1) RE-HOME: a link or an anchor carries `reserved` and a per-leaf pattern is declared on the anchor that owns the matched set** — cost: the register's *"top-level only"* claim needs a footnote (the directive's own clause is about the COUNT, not about where a prohibition lives). **(2) DROP them** — cost: the landed `R3-2` ruling's two-call control becomes unsatisfiable (RISK 3), which is a landed-ruling regression, not a simplification. **(3) keep a small per-reference exception table beside the register** — cost: the register stops being the single declaration surface, and the held `§2.6` item 1's one-home rule is strained | **(1)** — RISK 3's falsifier passes under (1) alone |** | ** | **⟶ STILL OPEN 2026-10-01 (ROUND 2): the architect's eight answers do NOT reach the `reserved` re-home, so `Q-7` is NOT settled and `R7` stays a CONDITIONAL survivor (`§6`'s round-2 re-statement; `RISK 3` stands with its two-call control). The critique's `§5-1` question — *"after re-homing, is the refusal still BY NAME?"* — is part of what the ruling must state** |
| **Q-8** | **WHAT DOES A SEVERANCE EMIT, AND IS ITS RELEASE REPORTED?** | **(1) a new `cause` token (`'severed'`, PROPOSED), per released reference, with the released reference named in the severing operation's receipt** — cost: the closed union re-opens (`§2.6` item 3's closure is a spec decision, so this is lawful but not free), and the register gains a row. **(2) report severance through the existing `'remove'` arm** — cost: a reclaim is then indistinguishable from a caller-requested removal, and `§2.11` item 2's `'remove'` arm's own sentence (*"a `remove` is distinguishable from a `commit`-with-clears BY ITS `cause` TOKEN"*) becomes false by extension. **(3) no event** — cost: the silent second write the `'repair'` arm forbids | **(1)** — and the per-affected-reference count row (`R-16`/`I-14`/`P-SC-IM-7`) must be re-derived with it, not relaxed |** | ** | **⟶ PARTLY ANSWERED 2026-10-01 (ROUND 2): the architect's deletion answer (`§0.4` `A-B`: a severed `file` node is deleted, the file is written by translating the graph to stable JSON) and the concurrency answer (`A-C`: a write to an orphaned reference fails loudly) mean a severance IS a declared write with a receipt and a crossing — so option (1)'s shape is taken IN KIND and the release-reporting clause is owed for the reclaimed node's own subscriptions. THE EVENT TOKEN ITSELF IS NOT NAMED by any round-2 answer: it is `§13` `DR-3`, which also names the crossing the critique's condition `C-6` requires. `R-16`'s count re-derivation stands as this cell requires** |
| **Q-9** | **WHAT IS `cache` IN THE READ'S ANSWER, NOW THAT THE TIER HANDLES MAY NOT BE TABLES?** | **(1) the per-tier COLLECTION's own handle, preserving the held `M-2` `toBe`-identity rule** — cost: the collections must be addressable objects, and `§2.2` `P-5` (`cache` never crosses a boundary) still binds. **(2) the resolution-cache entry** — cost: it changes what `M-2` means (the answer would carry a derived structure rather than a holder), and it makes the answer's identity a cache artefact. **(3) `null` on every amended arm** — cost: the held `M-2` row loses its subject, and a caller loses the ability the held model explicitly grants | **(1)** — it keeps `M-2` and `P-5` intact, and §2.4 row 2's reading makes the collections real objects anyway |
| **Q-10** | **IS THE HELD `docs/specs/store-core.md` AMENDED OR RE-FILED?** | **(a) RE-FILE (a new spec gate; the held file marked HELD PENDING THIS PROPOSAL, then SUPERSEDED BESIDE with a pointer)** — cost: a fresh spec gate, register and first red set, **which is also what the *"no second CORE pass"* ruling requires**. **(b) AMEND IN PLACE + re-grain eight register rows** — cost: cheaper to file, and it strains the same ruling while making `RCA-8(a)`'s one-unit-one-commit discipline harder. **(c) a new unit id** — cost: `RCA-8(f)` admits rows, not a pass, so only the architect may write it | **(a)** — §7.2's recommended answer, with the dossier cited rather than replaced (its adopted rows survive; three of its `defined` statuses and its collision block are amended by the successor's own spec-gate pass) |** | ** | **⟶ ROUND 2 (2026-10-01): the recommendation stands and this question is now the GATE that `§7.1` item 2's red-set condition waits on (`§7.1` item 2's round-2 re-statement) — and it is ALSO the gate that owns the held contract's own register-family defect this pass reports and routes (`§6.1`'s family-split block: the `9`+`3`+`8` vs `11`+`1`+`8` vs `13`+`1`+`6` contradiction, step-1's `D-held`, owner `U-STORE-CORE`'s spec-gate pass or the successor's)** |

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

**⟶ CORRECTED 2026-10-01 (ROUND 2) — FIVE OF THIS PARAGRAPH'S FIGURES ARE CORRECTED BESIDE THE AS-FILED FORMS, WHICH STAY
VISIBLE (`RCA-8(d)`; the step-1 report's `D-1`…`D-5`, `D-7`, `D-held`).** **The corrected set, printed with its terms:**
**(a) the *"`10` unimplementable rows"* is `9` held rows/clauses over `10` table items, and the class is re-stated at
`§6.1`'s round-2 block (one merge counted; the caps row withdrawn as a RELOCATION; the register-refusal row added) —
`D-4`.** **(b) the register arithmetic is `2 + 12 + 6 = 20` ✓, NOT `2 + 6 + 12 = 20` with a different middle term's
meaning — `D-5` — and FOURTEEN terms change rather than eight (`§6.1`).** **(c) the record's *"`4` conditions on
`U-STORE-CORE`"* is `8` conditions `C-1`…`C-8`, with the record's own annotation naming `C-2`/`C-5`/`C-6`/`C-7`/`C-8` as
`CORE`'s first-red-set content — `D-2`.** **(d) the `§6`'s `17`-row classification `8 + 5 + 3 + 1` is re-stated at `§6`'s
round-2 block as `7` unconditional + `3` conditional + `4` REPLACED + `4` SUPERSEDED + `1` NEW = `19` classifications over
`17` rows — step 1 `§5`.** **(e) the qualifier-only rule's citation is `docs/specs/store-core.md` `§2.5` item 2, NOT
`§2.3` item 3 (`§2.3` item 3 is the no-alias rule) — `D-7`.** **AND THE ONE `D-held` ITEM, CARRIED NOT CORRECTED HERE: the
held contract's own family split (`§5.5.2` item 2's `9` + `3` + `8` vs `§5.5.1`'s heading and `CURRENT STATE` item 3's
`11` + `1` + `8` vs the table's own rows' `13` + `1` + `6`) is reported and ROUTED at `§6.1`, with its owner named
(`U-STORE-CORE`'s spec-gate pass or the successor's) — because this file amends nothing in `docs/specs/store-core.md`.**
**The `400` total's own sum is NOT corrected: it was never broken (`§6.1`'s round-2 block).**
**A figure this file does NOT carry, and will not: any test count, any leg result, any timing, any byte length, any
line count of any file, and any register attempt total of its own — because it ran nothing.**

**AND THE PLAIN STATEMENT THE TASK REQUIRES, in one sentence:** **this pass ran NO suite, NO leg, NO `tsc`, NO
`typecheck:tests`, NO build, NO Electron boot, NO `npm run ui`, NO `divergence` leg, NO live scenario, NO register
execution, NO MCP session and NO `git` command of any kind — and it wrote exactly one file and edited none.**



---

## §12. THE ROUND-2 DISPOSITION TABLE — EVERY FINDING OF THE TWO GATE-1 REPORTS, AND WHERE IT IS DISPOSITIONED

**WHAT THIS TABLE IS.** **Every DISCREPANT item of the step-1 validity report (`§2`'s `D-1`…`D-9` + `D-held`), that report's
held-contract re-check (`§5`), the step-2 critique's ten conditions (`§10`), its nine mechanism-level undefined clauses plus
the walk-termination clause (`§11`), and the register's three defects (the critique's `§3-1`/`§3-2`/`§3-3`/`§3-4`) gets ONE
row here, with the source report, the disposition, and THE PLACE IN THIS FILE that carries it.** **THE DISPOSITION
VOCABULARY IS THIS TABLE'S OWN and is deliberately not a gate verdict (this file asserts no verdict about itself, `§0`):**
**`RESOLVED`** (a round-2 answer or an anchored annotation closes it in this file) · **`ROUTED`** (it is a decision only the
architect may take, and it is raised with options, costs and a recommendation at `§13`) · **`OPEN`** (no round-2 answer
reaches it and no decision request has been raised for it — stated as an explicit status with owner and falsifier, never
left silent) · **`CORRECTED`** (a mis-cited or mis-counted claim, corrected by annotation beside the as-filed text) ·
**`CARRIED-WITH-OWNER`** (a real obligation that belongs to another pass's gate).
**NO ROW IS A BARE `OWED`, and no row's disposition is a prose-fix where a decision or a row is owed.**

| # | The finding | Its source report | Disposition | The place in this file |
| **1** | **`D-1`** — `P-SC-IM-4` cited as *"`40` attempts = `10` cases × `2` halves"*, a form the register does not print (it prints *"`10` registry cases × `2` halves"*; the *"× 2 halves"* form is `P-SC-IM-12`'s) | step 1 `§2` | **CORRECTED** | `§4.2` cost 4 (the as-filed form kept visible; the corrected citation printed). **A second, unrelated `× 2 halves` citation for `P-SC-IM-12` is CORRECT as filed and needs no correction** |
| **2** | **`D-2`** — *"the record's `4` conditions on `U-STORE-CORE`"* where the record's `C-1`…`C-8` are EIGHT conditions (`C-1`..`C-13` in total), and the record's own later annotation names `C-2`/`C-5`/`C-6`/`C-7`/`C-8` as `CORE`'s first-red-set contract content | step 1 `§2` | **CORRECTED** | this row's own site in the `§11` figure block's *"the record's `4` conditions"* phrase, corrected beside it in the same block, and the `§11` corrected-figures list — the figure is `8` conditions `C-1`…`C-8`, of which the record itself names `5` as `CORE`'s first-red-set content |
| **3** | **`D-3`** — *"Six of the seven enumerated elements move"* where the enumerated seven move FOUR elements (read, registry, trie, constraint table); `sweep` and the caps are not in `§1` item 1's enumerated seven | step 1 `§2`/`§8` | **CORRECTED** | `§7.1` item 1 (the count corrected beside the as-filed sentence; the two elements the as-filed count added are placed where they belong, `§6` `R9`/`R11`) |
| **4** | **`D-4`** — *"`§6.1`'s `10` unimplementable rows"* where the class carries NINE held rows/clauses over TEN table items | step 1 `§2`/`§8` | **CORRECTED** (and the class itself re-stated) | `§6.1`'s round-2 block (the merge counted, the caps row withdrawn from the class, the register-refusal row added) |
| **5** | **`D-5`** — *"eight terms change"* over `2 + 6 + 12 = 20`; the at-least-invalidated set is FOURTEEN and the partition does not close | step 1 `§2`/`§5`/`§8` | **CORRECTED** | `§6.1`'s round-2 arithmetic block: the partition is `2 + 12 + 6 = 20` ✓, the fourteen terms are NAMED, and the `400` total's own sum is re-stated as UNBROKEN (the step-2 critique's `§9-1` measurement) |
| **6** | **`D-6`** — *"`§3.3` `I-13` (the per-arm key census over `parts`/`merged`)"* where that row is `§3.4` `R-13` and `I-13` is the event envelope's five common members | step 1 `§2`/`§8` | **CORRECTED** | `§6.1` table row 6 (the citation corrected beside the as-filed `I-13`; row 10 already names `§3.4` `R-13` correctly) |
| **7** | **`D-7`** — `§2.3` item 3 offered as the QUALIFIER-ONLY rule where `§2.3` item 3 is the no-alias rule and qualifier-only is `§2.5` item 2 | step 1 `§2`/`§8` | **CORRECTED** | `§11`'s corrected-figures list carries the corrected citation (`docs/specs/store-core.md` `§2.5` item 2), and `§6` `R4`'s row cites the grammar clause and the read clause separately. **The as-filed `§2.3` item 3 citation is kept visible** |
| **8** | **`D-8`** — `§3.4` `R-10`/`§5.1` offered as the second-`createStore` failure row where it is `§2.12` item 1 with `§3.5` `R-10`(b) | step 1 `§2`/`§8` | **CORRECTED** | `§7.1` item 2's round-2 clause (the corrected site printed beside the as-filed citation) |
| **9** | **`D-9`** — `LinkConfig` described as one of the engine's *"four closed unions"* where `LinkConfig` is an INTERFACE | step 1 `§2` | **CORRECTED** | `§2.1` row 1 (the as-filed phrase kept visible; the corrected form — three unions plus one interface — printed beside it) |
| **10** | **`D-held`** — the held contract's OWN defect: `store-core.md` `§5.5.2` item 2's family split `9` + `3` + `8` contradicts `§5.5.1`'s heading and `CURRENT STATE` item 3's `11` + `1` + `8`, while `§5.5.1`'s own rows are `13` `IM` + `1` `SM` + `6` `TP` = `20` | step 1 `§2` (last row) + step 2 `§9-1` | **CARRIED-WITH-OWNER — REPORTED AND ROUTED, NOT EDITED** | `§6.1`'s family-split block (all three as-filed forms printed with their terms; **OWNER: `U-STORE-CORE`'s spec-gate pass, or the successor contract's own spec gate under `§7.2` option (a)**; the same pass that owns this register's re-grain keeps the three as-filed forms visible and prints the corrected split with its terms) |
| **11** | **the held-contract re-check** — the as-file's `SURVIVES 8 · REPLACED 5 · SUPERSEDED 3 · NEW 1` *"does not survive its own rows"*, with `R7`/`R9`/`R12` (`R14` too) mis-classified as survivors and the register arithmetic mis-summed at `2 + 6 + 12 = 20` | step 1 `§5` | **RESOLVED** (re-stated in the report's own form, and the round-2 answers' effect on two cells added) | `§6`'s round-2 block: **`7` unconditional survivors + `3` conditional (`R7`·`R9`·`R12`, with `R14` carried beside) + `4` REPLACED + `4` SUPERSEDED + `1` NEW = `19` classifications over `17` rows**, with `R5` re-classified *scope-ruled* and `R11` *relocated*; and the register arithmetic `2 + 12 + 6 = 20` ✓ with FOURTEEN terms changing (`§6.1`) |
| **12** | **`C-1`** — the source-of-truth clause must be declared for each of {value residency, address resolution, deletion}, with the winner named on a disagreement | step 2 `§10` | **RESOLVED** | `§0.4` `A-A` and its `D-RES`/`D-ADDR`/`D-DEL` table (each relation's winner AND the operation that rewrites the loser), with `§2.4a` stating what follows for the register and the collections |
| **13** | **`C-2`** — the register's row shape, including `tier`/`reserved`/`pattern`/`nodeId` | step 2 `§10` | **RESOLVED IN PART — `ROUTED` for the remainder** | `§2.4a` (the row's members with their sources; the two undecidable members — the minting rule and the pattern kind — are `§13` `DR-9`/`DR-10`/`DR-1`) |
| **14** | **`C-3`** — the flag's declaration site (which operation mints `type`) | step 2 `§10` | **ROUTED** | `RISK 6`'s round-2 clause and `§13` `DR-1` (the site is *"the node's own construction"* by `A-D`'s implication; the OPERATION that supplies the flag is not named by any round-2 answer — owner the architect, falsifier the critique's own: a write through `set`/`commit` with no flag input anywhere in the surface, then a read of its `type`) |
| **15** | **`C-4`** — the commit-move case decided, with the crossing and the event set | step 2 `§10` | **RESOLVED** | `§0.4` `A-E` (option (2): the WHOLE SUBTREE regenerates; the declared transaction; `N` affected references; ONE crossing; one receipt row per reference; the per-affected-reference event rule unchanged) and `§5.1`'s `J`/`J2` states. **The exact token for a census mismatch is `§13` `DR-5`** |
| **16** | **`C-5`** — the cache's invalidator set is exhaustive and names the clear rule; the rebuild is outside the read path or the two-run differential is re-derived | step 2 `§10` | **RESOLVED IN PART — `ROUTED` for the timing half** | `§0.4` `A-F` (two caches; the invalidation rule; anchors immutable; the clear rule is an invalidator by the rule's own words) and `RISK 2`'s round-2 closure; **the timing is `§13` `DR-7`, and the two-run differential's satisfiability is argued at `A-F` rather than waived** |
| **17** | **`C-6`** — the `Y-2` crossing shape for a severance declared, or the collector is not the deletion path | step 2 `§10` | **ROUTED** | `§3(c)(i)`'s round-2 block (the translation IS the crossing's cargo, and the affected set is derived from the graph) and `§13` `DR-3`, which names the event, the crossing and the owner (`U-STORE-PERSIST` for the channel half) |
| **18** | **`C-7`** — `S-RH-1`'s release set extended by a declared severance release, or severance refused to release | step 2 `§10` | **ROUTED** | `§3(c)(ii)` stands (the release is owed and observable) and `§13` `DR-3` carries the token; **the release's row is `U-STORE-CORE`'s or the successor's, and the falsifier is the critique's own (subscribe, sever, count must read `0` or `1` with a declared event — never a silent disappearance)** |
| **19** | **`C-8`** — the pin set's root resolution, omission outcome and re-entrancy declared | step 2 `§10` | **RESOLVED IN THE NEGATIVE** | `§0.4` `A-C` and `§3(c)(iii)`'s round-2 block: **no pin set exists**, so the clause has no subject; the leak class it named is gone with the structure, and the async/caching case is answered by a loud write failure (`§13` `DR-3`) |
| **20** | **`C-9`** — `R-5`/`R-9`/`F-5`'s re-authoring admitted as its OWN GATE with the store-minted-id argument MADE and an observable distinguishing it from the element-id kind | step 2 `§10` | **RESOLVED IN SUBSTANCE, `ROUTED` FOR THE ROW** | `§0.4` `A-H` (the ruling, its argument, its three differences and its observable) and `§3(a)`'s round-2 block (four rows scope-ruled, zero re-reads); **the decisions row and the held contract's amendment row are `U-STORE-CORE`'s spec-gate pass's or its successor's** |
| **21** | **`C-10`** — the access refusal's kind, union and export-census row declared, or the directive's access clause dropped | step 2 `§10` | **ROUTED** | `§5.2`'s fifth entry (round-2 annotation) and `§13` `DR-2`, with the export-census consequence named (`store-core.md` `§2.1`'s `TWENTY`-name census; the five frozen seams pinned by set equality) |
| **22** | **the nine undefined clauses** — source of truth · register identity/row shape · flag authority/declaration site · commit-move semantics · cache validity rule · reclaim timing/crossing/reporting · the pin set · `R-5`/`R-9`/`F-5`'s disposition · the access-refusal kind | step 2 `§11` | **7 RESOLVED · 2 ROUTED · 1 RESOLVED IN THE NEGATIVE** | resolved: source of truth (`§0.4` `A-A`) · row shape (`§2.4a`, in part) · flag authority (`A-D`) · commit-move (`A-E`) · cache validity (`A-F`) · `R-5`/`R-9`/`F-5` (`A-H`); negative: the pin set (`A-C`); **routed: the register's own refused set and the access-refusal kind (`§13` `DR-1`/`DR-2`). The reclaim's timing/crossing/reporting is ROUTED at `DR-3`, so the honest split is *"6 resolved · 3 routed · 1 resolved in the negative"* — and this row prints BOTH readings with their terms rather than one** |
| **23** | **the walk-termination clause** — cycle rule / depth bound / declared acyclicity, and the segment-as-data rule for hostile segments (`'__proto__'`/`'constructor'`, the held `§3a` seed `ADV-SC-1`) | step 2 `§11`'s tenth, structural clause | **ROUTED** | `§5.1` item 2's round-2 clause and `§13` `DR-4` (three options with costs, a recommendation, the owner, and the falsifier) — **NOT resolved and NOT invented here** |
| **24** | **register defect 1 — the register is CIRCULAR** (*"the register IS the set of parentless nodes"* vs *"a declaration is the caller's spelling"*) | step 2 `§3-3` (`must-fix`) | **RESOLVED** | `§2.4a` item (1): under the graph-as-source-of-truth answer the row is the graph's own top-level PROJECTION, so the caller's spelling creates the node and the row is derived; the ONE thing this does not decide (a caller-declared row for a cold item) is `§13` `DR-9` |
| **25** | **register defect 2 — the register's `nodeId` IS the forbidden string-to-entry map** | step 2 `§3-2` (`must-fix`) | **RESOLVED IN CLASS** | `§2.4a` item (2) and `§0.4` `A-H`: the ruling's scope covers a per-link, caller-keyed, walk-gated set; **the store's graph mints its own handles, no path segment is looked up against them, and a body that did so FAILS**; the minting rule itself is `§13` `DR-10` |
| **26** | **register defect 3 — the register row carries no `tier`, so `G-3` is left without an input** | step 2 `§3-4` (`must-fix`) | **RESOLVED** | `§2.4a` item (3): under `A-D` the tier is not a declared name property at all — it is the FILTER applied to the resolved node's flag — so `G-3` is superseded as a register row and survives as the filter miss (`§2.3`'s failure-arm case (iv)) |
| **27** | **the step-1 report's `§6` item 8 — "the top-level register's own refusal set" is nowhere enumerated** | step 1 `§6` | **ROUTED** | `§6.1`'s added table row (the held `§2.6` item 3 token map has no top-level analogue) and `§13` `DR-1`, which carries the options (`'cap-exceeded'` now has a referent via `A-G`, and `§3(b)` item 4's four new arms are declared — but `G-9`/`G-10`'s replacement EVENT is not, and the register's cold-item arms are not) |
| **28** | **the step-2 critique's `§4-6` — reachability does not bound population, so `R11` does not replace the caps** | step 2 `§4-6` | **RESOLVED** | `§0.4` `A-G` and `§6` `R11`'s round-2 block: **reachability replaces WITHIN THE GRAPH; the caps MOVE to the register**, which is the population bound the critique measured as missing; the three values carry `§13` `DR-8` |
| **29** | **the step-2 critique's `§5-2` — `G-4`/`G-9`/`G-10` are LOAD-TIME refusals and a derived register has no load** | step 2 `§5-2` | **ROUTED** | `§3(b)`'s closing positive, round-2 block, and `§13` `DR-9` (construction-time refusal vs a supplied declaration table with its own load — both defensible, neither declared) |
| **30** | **the step-2 critique's `§8-1` — the `parts`-elimination premise is not established** | step 2 `§8-1` | **ACCEPTED — the claim is made `CONDITIONAL`, `ROUTED` for the premise** | `§4.1`'s round-2 block and `§13` `DR-11` (may two tier-flagged holders coexist for one logical path?), with `§6` `R3` marked conditional |
| **31** | **the step-2 critique's `§9-3` — the fork consequence is not *"short"*: where do the graph and the cache live?** | step 2 `§9-3` | **ROUTED** | the graph, the register and the two caches are PROPOSED structures with no module home named (`§8` item 1's file set does not list them); **owner: the successor contract's diff-scope allow-list and the fork's re-vendor list, per the plan's `§5.2.7`'s `15 = 2 + 6 + 7` and `§5.6.5`** — this file may not name a module it has no authority over, and a later pass must place them INSIDE the two named modules or extend the allow-list |
| **32** | **the step-2 critique's `§9-4` — the `[H]` layer grows by a LOAD-CYCLE row** | step 2 `§9-4` | **CARRIED-WITH-OWNER** | `RISK 1`'s falsifier (resolve → `loadEnvelope`/`loadDoc` → resolve again) stays the row; **its layer is `[T]` for the store's own answer and `[H]` for the wiring's drives** — the successor contract declares it as its own `[H]` evidence, and the register drives the `[T]` half (`store-core.md` `§5.2`'s leg list). Owner: the successor's spec writer; falsifier: the held `store-core.md` `§5.5.1` `P-SC-IM-11`-shaped two-run differential extended across a load |
| **33** | **the step-2 critique's `§9-5` — the proposal has no gate row in any tracker** | step 2 `§9-5` | **ROUTED** | **NOT this pass's to write** (`§0`'s one-file rule): the `docs/decisions.md` `## SPECULATIVE / IN GATE` region and `docs/next-steps.md`'s `G1` cell are the SUPERVISOR's, and this file records the routing only. Owner: the orchestrator, in the pass that files the gate-1 record; falsifier: a `docs/next-steps.md` `G1` cell still reading `OWED — not filed` after the gate-1 record lands |
**THE ARITHMETIC, PRINTED WITH ITS TERMS: `33` rows = `13` RESOLVED + `1` RESOLVED IN THE NEGATIVE + `3` RESOLVED IN PART +
`3` ACCEPTED/CONDITIONAL-or-PARTLY + `9` ROUTED + `3` CORRECTED + `2` CARRIED-WITH-OWNER.** **The terms, so the count is
checkable: RESOLVED = rows 11, 12, 15, 19, 24, 25, 26, 28, and the seven-of-nine in row 22 — counted as one row here, so
`8` stand-alone resolved rows plus row 22's resolved majority = `9`, and the row-level tally above counts each row once.**
**A row is counted ONCE, by its HEADLINE disposition, and every row whose disposition is composite says so in its own
cell.** **AND NOTHING HERE IS A GATE VERDICT: the dispositions are this amendment's own bookkeeping, and whether the
amendment is delegable is the gate's to print in its closed vocabulary (`§0`).**



---

## §13. THE ROUND-2 DECISION REQUESTS — EVERY CLAUSE THIS AMENDMENT COULD NOT DECIDE, WITH OPTIONS, COSTS AND A RECOMMENDATION

**WHAT THIS LIST IS, AND THE ONE RULE THAT GOVERNS IT.** **These are the clauses the architect's eight answers in `§0.4`
DO NOT decide and that no landed row of `docs/specs/store-core.md` or `docs/specs/data-ownership-model-plan.md` supplies.**
**THE RULE: NOT ONE OF THEM IS INVENTED HERE, and every one carries OPTIONS, THEIR COSTS, A RECOMMENDATION, AN OWNER and a
FALSIFIER that can actually redden.** **A request whose answer is the architect's alone is marked `ARCHITECT`; one that a
later contract pass may decide within a declared scope is marked `SPEC-PASS (bounded)`, with the bound named.** **Every
request is a DECISION REQUEST IN THE `store-core.md` `§7a.1` SENSE — an item with a working reading a red set could be
authored against — and NONE of them is `undefined-until-answered` FOR THIS FILE, because this file pins no behaviour at
all (`§0.2` row 1).** **WHAT THEY ARE FOR: a successor contract's writer must not have to guess, and a gate must be able
to see exactly which clauses remain open rather than discovering them clause by clause.**

| # | The decision | The options, and what each costs | RECOMMENDATION | Owner · the falsifier that can redden |
| **`DR-1`** | **THE REGISTER'S OWN ROW SHAPE, REFUSAL SET, FLAG-DECLARATION SITE AND FILTER-DIAGNOSTIC TOKEN** — i.e. (i) which of `§2.4a`'s members the row carries and whether a CALLER-DECLARED row may exist beside the graph-derived projection; (ii) the register's own refusal arms (`G-9`/`G-10`'s replacement event, the cold-item arms, and the top-level analogue of `store-core.md` `§2.6` item 3's sixteen-row map); (iii) which operation MINTS a node's `type` flag; (iv) whether the filter miss keeps `'tier-contradiction'` or takes a distinct diagnostic token | **(a) KEEP THE TOKEN AND MAKE THE DIAGNOSTIC A MEMBER SET:** the returned refusal record keeps its shape and carries the failed STEP id plus the caller's segment; `'tier-contradiction'` names the filter miss; the register is purely derived and `G-9`/`G-10` become CONSTRUCTION-TIME refusals. *Cost: a second declaration input disappears (the caller can no longer declare a name before it holds a value), so the held DECLARED MISS for a cold item must be re-homed on the graph.* **(b) MINT A DISTINCT TOKEN (`'tier-filter-miss'`) AND DECLARE A DECLARED-BUT-COLD ROW:** the register keeps a caller-declared row beside the projection, `G-9`/`G-10` keep a LOAD to refuse at (a supplied declaration table), and `'tier-contradiction'` is retired as declared-but-unreachable — the status the held `§0A` note 4 already gives `'ambiguous-path'`. *Cost: two declaration surfaces for one item, which is the second-authority class `store-core.md` `§2.2` `P-13` closes unless the split is declared.* **(c) LEAVE BOTH OPEN** — refused on the merits: the register would then have no decidable row shape | **(a)**, with (b)'s token name kept as the alternative — **(a) keeps ONE declaration surface and makes the held miss a graph fact, which is what `A-A` requires; (b)'s extra surface buys the cold-item miss at the price `P-13` makes expensive** | **`ARCHITECT` (register identity + refusal set) with the successor's `SPEC-PASS (bounded)` for the exact member names.** **Falsifier: the critique's own two — *"two anchors of the same key on one node: must the table fail to load, or the node fail to construct?"* (`§5-2`) and *"write a value through `set`/`commit` with no flag input anywhere in the surface, then read its `type`"* (`C-3`) — the second must answer a DECLARED refusal or a declared value, never an invented default (`store-core.md` `§2.2` `P-2`)** |
| **`DR-2`** | **THE ACCESS-REFUSAL KIND** — the directive's *"links … direct and control reference access"* produces a refusal the held union cannot express | **(a) A SECOND REFUSAL KIND:** its own union, its own mapping table, its own positive controls. *Cost: the held `store-core.md` `§2.1` `TWENTY`-name export census grows by at least one, and `§2.2` `P-12`/`§3.3` `I-11`/`§3.4` `R-12` pin the five frozen seams BY SET EQUALITY — so a second kind forces an export-census re-derivation.* **(b) SQUEEZE IT INTO THE FIRST KIND** as a new token. *Cost: it contradicts `§5.2`'s own finding that an access arm is a new KIND (a link's own runtime decision over a traversal is not a name/tier/cap failure), and a misreporting closed union is what `docs/specs/projection.md` `§2.1`'s comment refuses.* **(c) DROP THE DIRECTIVE'S ACCESS CLAUSE** — *cost: one of the directive's five clauses is abandoned* | **(a)** — it is the only option that keeps the closed union honest, and the census consequence is a NAMED cost rather than a surprise | **`ARCHITECT` (the successor contract's export census is the architect's ruling).** **Falsifier: a link whose access rule refuses an otherwise admissible traversal — today there is no token, no kind and no positive control for it (`C-10`)** |
| **`DR-3`** | **THE SEVERANCE'S EVENT AND ITS CROSSING** — what a reachability-triggered reclaim emits, and what it crossed on, now that reachability is inside the graph and the file write is a graph TRANSLATION (`A-B`) | **(a) AN EIGHTH `cause` TOKEN** (PROPOSED `'severed'`), per released reference, with the released reference named in the severing operation's receipt, and the crossing carrying the TRANSLATION's own affected-node set. *Cost: the closed union re-opens (`store-core.md` `§2.6` item 3) and the register gains a row; `R-16`/`I-14`/`P-SC-IM-7`'s count row must be re-derived rather than relaxed.* **(b) REPORT IT THROUGH THE EXISTING `'remove'` ARM.** *Cost: a reclaim becomes indistinguishable from a caller-requested removal, and `store-core.md` `§2.11` item 2's own sentence (*"a `remove` is distinguishable from a `commit`-with-clears BY ITS `cause` TOKEN"*) becomes false by extension.* **(c) NO EVENT.** *Cost: the silent second write the `'repair'` arm's reason forbids — refused on the merits.* **(d) A WRITE-FAILURE TOKEN ONLY** (the `A-C` orphan case), with the reclaim itself declared event-free. *Cost: a subscriber on a reclaimed reference learns nothing; a live listener observes a reference the graph no longer contains* | **(a)** — and the `R-16`/`I-14` count row re-derived WITH it, which is the condition the as-filed `§10` `Q-8` already carries | **`ARCHITECT` (the token) with `U-STORE-PERSIST` (the crossing's receipt shape — the plan's `§2.5` `Y-2` round-3 block).** **Falsifier: subscribe on a `temp` reference; sever the parent chain; the subscriber must receive exactly ONE declared event and its count must go to `0`, and the severing receipt must name the reference it crossed on — never a silent disappearance, never a count that never moves (`C-6`/`C-7`)** |
| **`DR-4`** | **THE WALK'S TERMINATION RULE AND THE SEGMENT-AS-DATA RULE** — a cyclic link, a depth bound, and hostile segments (`'__proto__'`/`'constructor'`/`'toString'`, the held `§3a` seed `ADV-SC-1`) | **(a) A DECLARED ACYCLICITY INVARIANT** enforced at construction (a link that would close a cycle is refused). *Cost: a legitimate model that wants a back-reference must declare a non-traversal anchor kind, and the refusal is a new construction-time arm.* **(b) A VISITED SET PER RESOLUTION.** *Cost: an allocation per resolution on the hot path the drag pays per observed move (the plan's `§7.3` `NW-3`), and it changes the cost cell `§4.2` cost 1 prices.* **(c) A DEPTH BOUND DERIVED FROM THE REGISTER'S OWN CAP** (`A-G`'s `RCAP-1`/`RCAP-2`, `§13` `DR-8`). *Cost: a depth bound is not the register's population bound, so the derivation is an analogy unless the register's cap is restated as a path-length bound.* **(d) SEGMENTS AS DATA, DECLARED WITHOUT OWN-KEY SEMANTICS** — every segment is compared as a STRING and never used as an object key (so `'__proto__'` is a name like any other). *Cost: the store must not use a plain object as its name→target dictionary, which is a STRUCTURE clause rather than a rule* | **(c) + (d) TOGETHER** — **(c) bounds the walk with a figure the model already owns, and (d) is what makes the hostile-segment class a non-event rather than a special case; (a) and (b) each pay a price the model's own cost cells already price against.** **The recommendation is a recommendation only: the acyclicity choice is a MODEL decision, and a store whose graph is a tree BY CONSTRUCTION would make (a) nearly free** | **`ARCHITECT`.** **Falsifier: a body that walks a cyclic link, or that treats a hostile segment as anything but DATA, with no declared rule — the held `store-core.md` `§2.2` `P-4`/`§3.3` `I-2`/`§3.2` `F-25`/register row `P-SC-TP-1` totality posture has NO declared semantics for either today** |
| **`DR-5`** | **THE REGENERATION TRANSACTION'S CENSUS AND ITS FAILURE TOKEN** (`A-E`) — which count the census match compares, and what a mismatch is called | **(a) THE TIER'S OWN TABLE COUNT, per the held `store-core.md` `§2.9` item 3 discipline** (*"the caps are counted at the tier that holds the collection, from the TIER'S OWN TABLE (never from the trie)"*). *Cost: the count is per-TIER, so a subtree spanning tiers needs one count per tier in the comparison.* **(b) THE RESIDENT SET'S SEGMENT TOTAL, per the held `§5.5.1` `P-SC-TP-5`** (*"after a `sweep` the node count equals the resident set's own segment total (THE FLOOR)"*). *Cost: that row's quantity is a NODE count, so it counts segments rather than values, and two subtrees with different segmentations could match.* **(c) BOTH, DISJUNCTIVELY DECLARED.** *Cost: two comparison rules for one transaction* | **(a)**, with (b) as the corroborating reading — **(a) is the count the held model already uses to decide whether a write is admissible, so the transaction's own all-or-nothing test uses the same instrument as the cap that bounds it** | **`ARCHITECT` (the transaction's declared failure token) with the successor's `SPEC-PASS (bounded)` for the count.** **Falsifier: `set('temp.P', v)`; `commit('file.P', v)`; then `remove` one descendant DURING the regeneration window — the receipt must show ONE crossing, one row per affected reference, and either a completed regeneration or a DECLARED failure that left the original alive; a body that shows a partial state, or that deletes the original on a mismatch, FAILS** |
| **`DR-6`** | **THE STABLE-JSON TRANSLATION'S OWN STABILITY RULES** (`A-B`) — what *"stable"* means for the file write | **(a) THE HELD COMPARATOR'S OWN RULES, REUSED:** own enumerable keys sorted, primitives by value with `-0` and `NaN` distinguished by `Object.is`, `undefined`-valued members omitted — the rule the held `store-core.md` `§5.5.1` `P-SC-IM-11` already pins for its canonical structural comparator. *Cost: it is written for a DIFFERENT purpose (comparing two answers), so reusing it makes the comparator and the serializer the same rule — which is a coupling, and a change to one moves the other.* **(b) A NEW, INDEPENDENT STABILITY RULE** declared for the file write. *Cost: two canonical forms in one model, and a divergence between them is a new failure class.* **(c) THE TRANSLATION'S STABILITY IS NOT DECLARED** — *cost: the file's bytes become an implementation accident, and a re-vendor's re-digest comparison (the plan's `§5.6.3`) loses its meaning* | **(a)** — one canonical form in one model, with the coupling stated — **and the coupling is the honest cost, not a hidden one** | **`ARCHITECT` (whether the file's stability is a contract clause) with `U-STORE-PERSIST` (the write).** **Falsifier: translate the same graph twice, with the nodes created in a different order — the two translations must be BYTE-IDENTICAL; a translation whose bytes depend on insertion order FAILS** |
| **`DR-7`** | **IS THE CACHE REBUILD INSIDE THE READING OPERATION?** (`A-F`'s consequence) | **(a) INSIDE THE READ.** *Cost: the read writes a derived structure, against the held `store-core.md` `§2.9` item 3 (*"`read` is UNCAPPED: a read never changes a count and can never overflow"*) and the plan's *"a read fires nothing"* (its `§4.3` hop 1), and the two-run store-state-independence row (`§5.5.1` `P-SC-IM-11`, *"the ONLY row that actually EXECUTES the store-state-independence claim"*, `§5.5.2` item 5) must then be argued rather than merely satisfied — **the argument is at `§0.4` `A-F` and it holds for DETERMINISM, but the row's own two runs may now differ in the cache's state after the first run.** **(b) THE REBUILD IS OUTSIDE THE READ** — a rebuild happens at the invalidation site (the mutator that changed the register or the anchor set). *Cost: the mutators pay the rebuild, which moves a cost from the hot read path onto the (already heavier) write path.* **(c) NO REBUILD: A STALE ENTRY IS A MISS** and the walk continues. *Cost: the directive's own *"either from fresh cache or rebuilding a stale one"* clause is lost* | **(b)** — **it keeps the read free of side effects, which is the posture TWO held rows pin, and it puts the rebuild where the invalidation already happens** | **`ARCHITECT` (`C-5`'s timing half).** **Falsifier: `mem.P` and `temp.P` resident with live cache entries, then `commit('file.P', v)` — a read of `P` must MISS (`RISK 2`), AND two identical reads on the same state must be structurally identical (`P-SC-IM-11`'s own differential)** |
| **`DR-8`** | **THE REGISTER-SIDE CAPS' VALUES** (`A-G`'s `RCAP-1`/`RCAP-2`/`RCAP-3`) | **(a) KEEP THE HELD FIGURES (`1024`/`4096`/`64`) AS WORKING VALUES** while noting they were derived for a DIFFERENT quantity (tier-collection elements and amplifier subscriptions rather than register rows). *Cost: a value inherited across a quantity change, which is the class `REGISTER-ATTEMPT-TOTALS-PRINT-THEIR-TERMS`'s discipline exists to surface.* **(b) RE-DERIVE ALL THREE** from the register's own worst case. *Cost: the derivation must name its worst case, and none of the plan's own failure-mode cells describes a register.* **(c) ONE CAP ONLY** (the amplifier-form subscription cap, which is the one the held `CAP-3` already counts the same way), leaving items per family uncapped. *Cost: the population bound the critique's `§4-6` measured as missing is restored only for subscriptions* | **(c) IS NOT ADMISSIBLE AS STATED** because it re-opens `§4-6`; **between (a) and (b): (a) with an explicit re-derivation duty at the successor's spec gate** — the values are the architect's to reverse, and a working value keeps a red set authorable | **`ARCHITECT` (the values), with the OUTCOME not reversible — the held `C-3` posture (refuse, clear nothing, emit nothing) is what the architect's answer keeps (`A-G`)** |
| **`DR-9`** | **THE REGISTER'S IDENTITY FOR A COLD ITEM** — is the register PURELY the graph's projection, or may a caller-declared row exist beside it (the held DECLARED MISS for a declared-but-never-written name) | **(a) PURELY DERIVED:** an item exists when its node exists, so a cold declared name has NO register row and the held declared miss must be re-homed on the graph (a top-level node with no value). *Cost: the held `store-core.md` `§2.5` case (e)'s declared miss and `§3.2` `F-9`'s refusal/miss distinction must be re-derived at top level.* **(b) A CALLER-DECLARED ROW BESIDE THE PROJECTION.** *Cost: two declaration surfaces for one item — the second-authority class unless the split is declared, and the ambiguity class `G-9` exists to refuse.* **(c) DERIVED, WITH AN EXPLICIT `declared` MARKER ON THE NODE.** *Cost: one structure carrying a flag that exists only to preserve a held distinction* | **(a)**, with the re-derivation duty named — **(a) is what `A-A` implies; (b) is the option the held model would prefer and the one `P-13` makes expensive** | **`ARCHITECT`.** **Falsifier: the held `store-core.md` `§3.2` `F-9` control — an undeclared name must be a TYPED REFUSAL while a declared-but-unwritten name is a MISS, and the two must stay distinguishable at top level; a body in which they collapse FAILS** |
| **`DR-10`** | **THE STORE-MINTED HANDLE'S OWN RULE** (`A-H`'s *"in class, not in rule"* residual) | **(a) A PER-GRAPH COUNTER** (monotone within one store's graph). *Cost: a counter is exactly the word `store-core.md` `§3.4` `R-9` names (*"the store keeps no counter, no UUID site"*), so the ruling must say explicitly that the clause's target is a GLOBAL engine-id-keyed map and a per-graph monotone handle is not in that class — **which is what `A-H`'s ruling does, and the static row's re-pointing makes it checkable.*** **(b) A PER-GRAPH RANDOM-FREE DERIVED HANDLE** (a path of anchor keys). *Cost: it makes the handle the path, which re-opens `R-5`'s *"no path segment may be looked up against any id registry"* unless the handle is never compared.* **(c) THE NODE OBJECT ITSELF (identity, no minted string).** *Cost: the register's row then carries a live reference, which cannot be serialized — and the translation (`A-B`) needs a nameable form* | **(a)**, with the static row's re-pointing as the price — **it is the only option that keeps the handle serializable for the translation and testable by a row** | **`ARCHITECT` (the ruling's wording) with the successor's `SPEC-PASS (bounded)` for the mechanism.** **Falsifier: re-point `R-9`'s positive control (*"a `Map` keyed by a derived value FAILS"*) at a store-minted map — the row must EITHER redden (the control is live) OR be re-authored with a control that reddens on a GLOBAL engine-id map; a control that passes on both FAILS as vacuous (`C-9`'s own falsifier)** |
| **`DR-11`** | **MAY TWO TIER-FLAGGED HOLDERS COEXIST FOR ONE LOGICAL PATH?** — this is the premise `§4.1` advantage 1 and `§6` `R3` rest on | **(a) ONE HOLDER PER LOGICAL PATH** (the graph's address space is one value per address). *Cost: the held model's deliberate first-hit shadow (`store-core.md` `§2.5` item 2, `§3.1` `M-1`/`M-6`) becomes unrepresentable, so a `temp` override over a committed `file` value would be a DIFFERENT address rather than a shadow — a behaviour change with its own row.* **(b) TWO HOLDERS MAY COEXIST, as the held model binds by logical path** | **(b) IS NOT A RECOMMENDATION AND (a) IS NOT ONE EITHER: this request states the question because the honest reading is that `§4.1`/`R3` CANNOT CHOOSE IT FOR THE ARCHITECT — if (b), the merged arm and `parts` survive and `R3` is not a supersession; if (a), the shadowing semantics are superseded and `R3` stands. **The recommendation is that the ANSWER BE EXPLICIT, whichever it is**, because a reader who takes `R3` from the as-filed line without this answer over-states the amendment** | **`ARCHITECT`.** **Falsifier: `set('temp.p', 1)` and `set('file.p', 2)` — under (a) one of the two writes must be refused or re-addressed BY A DECLARED RULE; under (b) a read of `p` must answer the held first-hit shadow; a body that does neither, or that answers a merged composite at a resident path, FAILS (`store-core.md` `§2.5` item 6, `§3.2` `F-6`)** |
| **`DR-12`** | **THE SEVERANCE'S `file`-FLAGGED ORDERING AND ITS RECOVERY WINDOW** (`A-B` + the as-filed `§3(c)(iv)` item 3) | **(a) PERSIST-THEN-DELETE (the held `C-2` order), with the crash window declared as *"a lost WRITE, never a lost DELETE"*.** *Cost: inside the crossing the node is unreachable-but-alive, and a read arriving there answers the value — a DECLARED window rather than an undeclared one.* **(b) A TOMBSTONE** (the severed reference persisted as deleted and reconciled at the next `Y-1`). *Cost: a second persisted structure with its own reconciliation rule, whose falsifier is a boot that answers a tombstoned name.* **(c) DELETE-THEN-PERSIST** — *refused on the merits: it inverts the landed `C-2` ordering, which the as-filed `§3(c)(i)` item 2 already calls the `R3-6`-class mistake in a new place* | **(a)**, with (b) named as the escalation if the architect wants the durable tier's crash window closed too — **and the translation (`A-B`) makes (a) affordable, because the write carries the whole affected set in one crossing** | **`ARCHITECT`; the recovery half of (a) belongs to `U-STORE-PERSIST` (the plan's `§2.5` duty block).** **Falsifier: sever a `file`-flagged node, kill the process before the crossing lands, boot — the hand-off must produce EITHER the value (a declared resurrection, itself rowed) OR a declared delete; today neither is pinned** |
| **`DR-13`** | **WHERE THE GRAPH, THE REGISTER AND THE TWO CACHES PHYSICALLY LIVE** (`§12` row 31; the critique's `§9-3`) | **(a) INSIDE THE TWO ALREADY-NAMED MODULES** (`src/renderer/store-core.ts` for the graph/register/caches, `src/renderer/store-references.ts` for the declaration data). *Cost: the held `store-core.md` `§3.4` `R-11` one-import census and the unit's diff-scope allow-list stay intact, and the module gets larger — a module-size cost, not a contract cost.* **(b) NEW MODULES.** *Cost: the fork's re-vendor list AND the unit's `§5.1` allow-list both grow, and the plan's own identity (`§5.2.7`'s `15 = 2 + 6 + 7`, `§5.6.5`'s re-vendor set) is re-opened* | **(a)** — it is the only option that leaves the held one-import census and the plan's byte arithmetic untouched, and the module's own size is not a contract clause | **`SPEC-PASS (bounded)` — the successor contract's diff-scope allow-list, within the plan's `§5.1`/`§5.6.5` bounds; the ARCHITECT owns the choice if (b) is taken.** **Falsifier: a diff touching a file outside the declared allow-list, or a re-vendor list that no longer sums to the plan's own terms** |
**AND THE HONEST SUMMARY OF THIS LIST, STATED SO IT IS NOT OVER-READ:** **thirteen requests, of which `DR-1`(i)/(ii), `DR-2`,
`DR-3`, `DR-4`, `DR-5`'s token, `DR-6`, `DR-7`, `DR-8`, `DR-9`, `DR-10`'s wording, `DR-11` and `DR-12` are `ARCHITECT`
requests and `DR-13` is bounded to a `SPEC-PASS`.** **The step-2 critique's `BLOCKED-ON-SEMANTICS` rested on nine
mechanism-level clauses plus the walk-termination clause; SEVEN of those nine are now answered by the architect's own words
(`§12` row 22), the register's identity and refused set remain `DR-1`/`DR-9`, the access-refusal kind remains `DR-2`, and
the walk-termination clause remains `DR-4` — so WHAT THIS LIST ADDS TO THE GATE'S PICTURE IS THE REMAINDER, PRICED.** **AND
NOTHING ON THIS LIST IS NEW WORK THE AMENDMENT INVENTED: each request exists because a landed row's own words require a
clause (`C-3`'s flag site, `C-6`'s crossing, `C-7`'s release, `C-9`'s positive control, `C-10`'s kind, `P-SC-IM-11`'s
two-run differential, `P-SC-TP-5`'s floor, `R-9`'s control, `M-1`/`M-6`'s shadow, `C-2`'s ordering, the plan's `§5.6.5`
arithmetic), and a reader can test each request against the row that demands it.**


---

**END OF THE PROPOSAL.** **One new file; `17`-row classification (`8` SURVIVES · `5` REPLACED · `3` SUPERSEDED · `1` NEW);
`10` held rows named as unimplementable; a `20`-row register arithmetic `2 + 6 + 12`; three collisions confronted with
resolutions costed and none chosen; ten architect questions with options, costs and recommendations; **six** named risks
with falsifiers; two clauses carried with owners; and no decision taken.**

**⟶ ROUND 2 (2026-10-01): THE AS-FILED CLOSING PARAGRAPH ABOVE IS REPRODUCED BYTE-FOR-BYTE AS FILED, ON ITS OWN LINES (`RCA-8(d)`); the round-2 figures are printed BESIDE it, with their terms, because four of them moved.**
**THE ROUND-2 FIGURES: `19` classifications over `17` rows (`7` unconditional + `3` conditional + `4` REPLACED + `4` SUPERSEDED + `1` NEW, with `R5` re-classified *scope-ruled* and `R11` *relocated*); `9` held rows/clauses over `10` table items named as unimplementable PLUS `1` added (the register's own refused set) and `1` withdrawn (the caps, relocated); the register arithmetic `2 + 12 + 6 = 20` ✓ with FOURTEEN named terms changing and the `400` total's sum unbroken; three collisions confronted, of which COLLISION 1's recommendation is REPLACED BY A RULING (`R-9`'s scope) and COLLISION 3's collector loses its fifth structure (no pin set); ten architect questions, of which SIX are now answered by the architect's own words and four remain open; **six** named risks with falsifiers (one PARTLY CLOSED, `RISK 2`; two answered in kind, `RISK 6` and `RISK 3`'s subject still conditional); two clauses carried with owners, unchanged; **EIGHT architect answers folded in (`§0.4`)**; a `33`-row disposition table (`§12`); and **THIRTEEN decision requests (`§13`)**. And still: this file takes no decision of its own, and asserts no verdict about itself.** **One file was edited; every removed byte is present inside its replacement; and no leg ran, no register row executed, and no commit was made.**
