# Provident-Electron — strata decisions log

The only record of user intent for this project under the strata workflow. Append-only: a decision
is never edited, reworded or annotated, and a later decision supersedes an earlier one by naming it.
One section per decision, ≤ 40 lines each. **Source** is the user's own words or the exact option
they chose; a row with no user source is not a decision and belongs in `brief.md` as an `ASM-n`.
A **corrigendum** row is sourced by the user-sourced row it corrects plus the measurement that
compelled it, and it carries that row's authority — it may not change what the user decided.

---

## D-1 — The strata workflow replaces the gate workflow for this repository

**Status:** ACTIVE · **Date:** 2026-10-29

**Source (user, verbatim):** "Take ownership of the project, adding in the necessary documentation
for the strata workflow persona"; "The project has been active in the gate workflow since inception
but the accumulation of documentation is starting to slow down development"; "construct the
necessary documentation for the strata subagents".

**Decision:** `strata/` is the authoritative corpus for all further work, and the ratified strata
workflow — the preset this session runs — governs how work moves. The gate workflow's rules retire
with its corpus (D-2); none of them is re-filed here.

The adopted mechanisms, each by its id in the workflow's own ratification
(`../Agent Harness/strata/decisions.md`, user-ratified 2026-10-25 — cited below as *canonical*), and
where this tree carries it:

| Canonical row | The rule adopted | Carried at |
|---|---|---|
| D-2 | three record kinds; per-class ceilings; replace, never annotate | `brief.md` §1 |
| D-3 | five layers, one artifact class and one write scope each | `brief.md` §3 |
| D-4 | the nested loop: a layer examines what the layer below produced | `brief.md` §4 |
| D-5 | an `ASM-n` proceeds with its rejected alternative recorded; only user intent climbs | `brief.md` §8 |
| D-9, D-19, D-20 | the harness is ordinary code, capped at `50 + 10×N` | `platform.md` §4 |
| D-10, D-11 | the blind documentation walkthrough; a non-green result is still reported | `walkthrough.md` |
| D-12 | the examiner diagnoses and recommends; it never patches | `examiner.md` §4 |
| D-13 | L4 holds no design; inability to drive green bubbles to L2 | `examiner.md` §5 |
| D-14 | the battery is validated before code is examined | `examiner.md` §1 |
| D-15 | an adjudication request is a failure and is counted | `rebuild.md` §1 |
| D-16, D-17 | one module per agent; isolation by subfolder convention plus diff-scope lint | `modules.md` |
| D-22 | provenance attaches to a statement; an uncited normative line fails the lint | `brief.md` §1 |

Bare `D-n` in any other file means a row of THIS log; a canonical row is always named as such.

---

## D-2 — The gate corpus is archived and never carried forward

**Status:** ACTIVE · **Date:** 2026-10-29

**Source (user, verbatim):** "construct the necessary documentation for the strata subagents, and
then archive all existing docs".

**Decision:** every tracked file under `docs/` — 219 files, 20 MB, including the four-file brief
set, the spec tree, the six trackers and `FORKER.md` — moves to `archive/gate-corpus-2026-10-29/`
preserving its tree, in one commit. The archive is gitignored and is the retrieval mechanism; no
live file carries a correction paragraph, a dated annotation or history (D-1 §1).

- A superseded document is **replaced**, never annotated (D-1).
- The archived corpus is cited by path through one prefix mapping: `docs/<x>` resolves at
  `archive/gate-corpus-2026-10-29/<x>` (`archive.md` §2). Code comments that cite `docs/…` stay in
  place and resolve through that mapping (D-4).
- `docs/` stays live and is where the layers write: `docs/L1/`, `docs/L2/<module>/`,
  `docs/L3/<module>/` (`modules.md` §1).

---

## D-3 — The root entry points become pointers, not rule carriers

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "docs/ tree → archive/,
AGENTS.md + README.md become short pointers (Recommended)"

**Decision:** `AGENTS.md` and `README.md` are rewritten in the same pass to ≤ 60 lines each: what
the app is, the two goals, the command set, and where the authoritative corpus lives. Neither
carries a workflow rule — a restated rule is a rule that drifts, and it would be loaded ahead of
`strata/brief.md` on every session start. Everything they drop is in the archive (D-2).

---

## D-4 — The archive pass is a one-time mechanical sweep, authorised here

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Repoint or retire those
assertions in the same pass, recorded (Recommended)"

**Decision:** 27 assertions across 13 test files assert that specific `docs/…` paths exist or name
them in a diff-scope allow-list. The archive move breaks them because their referent moved. The
bootstrap pass therefore repoints each one to its `archive/gate-corpus-2026-10-29/` path, or retires
it where the assertion existed only to pin a gate-corpus artifact against drift, and names every
touched row in `archive.md` §3. After this pass, only the layer write scopes change code and tests
(`modules.md` §1); the exemption does not renew.

---

## D-5 — A package finding belongs to the unit that surfaced it

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Park it: findings land in
the owning unit's record and archive with it (Recommended)"

**Decision:** the implementation-test goal continues — a defect or requirement gap in
`provident-ssr` or `provident-storeroom` is still recorded with symptom, reproduction, suspected
root cause and proposed fix shape, still upstream-owned, and the packages are still never modified.
What ends is the **standing cross-unit catalogue**: there is no live `defects.md`, and a finding is
filed in the record of the unit that surfaced it, archived with that unit when it closes (D-2). The
archived catalogue (`archive/gate-corpus-2026-10-29/defects.md`) is the historical record of the
gate era, not a queue.

---

## D-6 — Work happens on branch `strata`; `main` is frozen until merge permission

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, verbatim):** "Work in the branch version
until merge permission is given"; **selection:** "Create `strata` off main (Recommended)"

**Decision:** branch `strata` is created off `main` at `28e9ac1` and carries the bootstrap. A commit
lands at every gate boundary — the bootstrap docs before the archive move, the archive move, the
pinned-row sweep, and the trio run — so a destructive-capable operation is never the only copy of
work. No merge to `main`, no push to `origin/main`, and no rewrite of `main` until the user grants
merge permission in their own words.

---

## D-7 — The next unit is a central data management system over `provident-storeroom`

**Status:** ACTIVE · **Date:** 2026-10-29

**Source (user, verbatim):** "The current branch state is WIP towards implementing a central data
management system, and the decision has been made to progress by importing the provident-storeroom
package. The implementation of the package beyond import is still pending."

**Decision:** the import stands as landed — `f349549` added `src/main/storeroom.ts` as the single
import, `4e404e2` named the package in the seven dependency-set pins, `1cab040` put the seam test
through the additive test-layer leg. The implementation beyond the seam is the pending work, and
it is admitted only as a unit through the loop: L1 files the module map first (`modules.md` §3),
and no design is admitted before it. Until then the seam stays inert — it constructs a store and
hands it back, and exposes nothing over MCP, renders nothing, and persists nothing
(`src/main/storeroom.ts:9-21`).

---

## D-8 — The archive sweep's scope is every executable doc path, corrected by measurement

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-4**, which stands as filed (D-1 makes
this log append-only). **Source:** the L1 examiner's measurement at the sweep
(`strata/.strata/returns/archive-sweep-pins.json`), read against D-4's selection.

**Decision:** D-4's "27 assertions across 13 test files" was a count of greps, not of referents. The
measured set is **32 sites / 29 distinct assertions in 15 files**, and **71 affected rows in 27
files** once the classes a grep misses are counted: a path constant dereferenced by many rows (15
files), an unguarded `readdirSync` that throws instead of failing (2 sites), and a module-scope
read that stops a whole file collecting (1 site). The sweep covers all 71, because a thrown
collection error cannot be absorbed by a count.

Three arms, each row filed in the sweep commit:

| Arm | Sites | The rule |
|---|---|---|
| `REPOINT` | 48 | a filesystem read whose referent moved: rewrite the literal to `archive/gate-corpus-2026-10-29/<x>` — the assertion is unchanged, only the path is |
| `RETIRE` | 2 | `git show HEAD:docs/…` byte-identity pins (`tests/store-core-graph.test.ts:780,783` and `:1028,1030`): the archive is untracked, so no repoint exists, and D-1 retires the gate rule with its corpus |
| `LEAVE` | 21 | absence probes (true before and after), and live `git status --porcelain` / historical `git log <range>` readings, which are green once the move is committed (D-6's gate order) |

**Recorded, not repointed:** `tests/secure-exclusion.test.ts:4775` keeps its guard and goes vacuously
green once `docs/specs/` is gone — an examiner finding under `examiner.md` §2, named here for the unit
that owns the row. Comments that cite `docs/…` stay as written and resolve through the prefix mapping
(D-4); no comment was rewritten by the sweep.

---

## D-9 — The rows whose subject was the gate corpus are retired; the known-red ledger is two

**Status:** ACTIVE · **Date:** 2026-10-29 · **Completes** D-4/D-8's retirement arm. **Source:** the
user's D-4 selection ("Repoint or retire those assertions in the same pass, recorded"), executed
against the L1 examiner's disposition table.

**Decision:** 15 test rows are retired, across six files, because their **subject** is the corpus
that D-2 archived and no repoint can satisfy them:

| Rows | Why retirement and not repoint |
|---|---|
| `census` `R-8`, `zones` `R-4`, `gutter` `R-12`, `gesture-session` `R-7`, `layout-projection` `R-20` | the diff-scope and amendment-namespace controls: each predicate is written against `^docs/specs/<x>\.md$` and reads the live corpus, so a repointed path fails the predicate itself |
| `store-core-graph` `§4.1(red)` and `§5.1` | the held-contract byte pins compare the worktree copy with `git show HEAD:docs/specs/store-core.md`; the archive is untracked, so there is no path in `HEAD` to compare against |
| `fork-store-reads` `S-1`, `S-2`, `S-4`, `S-10` (8 rows) | the archived contract's own citation-resolution set: they resolve a document's citations against the live tree, which the prefix mapping settles but their predicate does not |

**Consequence, stated because it moves a ledger:** the suite's known-red set is now **two** rows —
`store-tabs-record` §4.2 item 7 (`P-7`, the un-run live battery) and item 8 (`REG-EXEC`, the
register's broken attempts) — not the three the brief shipped with. The third, `store-core-graph`
`§5.1`, was red for a held-contract byte drift whose subject D-2 removes; its obligation is not
discharged but **dissolved with its artifact class**, and the live equivalents are strata-lint's
citation resolution over `docs/L1..L3/` and the module diff-scope check (`platform.md` §4). A later
pass that wants a held-contract stability row authors one against a live artifact, not a gate one.

**Nothing product-facing is retired.** Every retired row was a gate-process control over the
corpus; no row that exercises `src/`, the MCP surface, the store or any shipped behaviour was
touched. The measured delta is `3,114` collected rows before the sweep and `3,099` after.

---

## D-10 — The existing test suite is migrated after the module set is mapped and claimed

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, verbatim):** "Long-term goal is to migrate
the existing test suite, but that should happen after module set is mapped out and claimed".

**Decision:** moving the flat `tests/**/*.test.ts` suite into the strata layout — `tests/e2e/`,
`tests/integration/<module>/`, `tests/unit/<module>/` — is a **declared long-term goal**, and it is
sequenced behind the module map, not beside it.

- **The precondition is a filed map and claimed paths.** L1 files `strata/modules.json` and its rows
  claim the subtrees they own (`modules.md` §3); only then does a test row have a destination, because
  a module's tests are the rows inside its declared paths.
- **Migration is per module, at claim time.** When a module claims a suite subtree, its rows move with
  it; there is no wholesale re-layout ahead of the map, because the map is what decides which rows
  belong to whom.
- **Until then the flat suite stands as filed**, and `ASM-1`'s adoption of it is interim rather than
  final: the existing 3,099 rows keep running where they are, under the four legs of `brief.md` §6.
- **A migration row is ordinary unit work.** It runs through the loop like any other change —
  test-side work belongs to the test writer of the owning layer (`brief.md` §3), never to L0 and never
  to the module's implementer.

---

## D-11 — The central store gets its own MCP tool group

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Add a
`provident.data.*` tool group"

**Decision:** this unit adds a **sixth** group to the gate — `data` — whose tools are named
`provident.data.*`. It is OFF by default like `graph`, `code` and `module`, so the **default grant is
unchanged** (`['read','dispatch']`, 8 tools). L1's ASM-7 default (no new surface) is refuted by this row
and does not survive in the design.

The consequence is a census move, and it is named rather than absorbed: the tool count goes from **22**
to **22 + |data|**, the group count from **five** to **six**, and every statement that pins those
numbers re-grains in the same unit that registers the tools — `src/main/security.ts`'s
`TOOL_GROUPS`/`VALID_GROUPS`, `ALL_TOOLS`, the `RpcMethod` union, the group table in the archived
contract, and each test row that counts them. A count that moves without its row moving is a finding.

---

## D-12 — The profile store is write-through in this unit; undo is its own unit

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Write-through only; undo is a
later unit (Recommended)"

**Decision:** the store journals and persists internally, and nothing operator-visible reverses
profile data in this unit. Operator-facing undo/rollback is a separate unit: it needs provident-authored
UI (no hand-written DOM, ever) and its own surface decision, so admitting it here would carry two units
through one design gate (D-1).

---

## D-13 — The central store may choose its own on-disk shape

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "The store may choose its own
on-disk shape"

**Decision:** the existing `<userData>/provident-settings.json` bytes are **not** a compatibility
constraint on the central store's layout. Where a unit changes the profile's shape it records the
change in that unit's record; there is no standing migration obligation.

**Consequence, and it is a ledger move like D-9's:** the live compliance battery's Family B reading —
"exactly two persisted files" — stops being a true standing pin the moment the store writes its own
file. The rows that assert it are re-grained by the owning layer's test writer in the unit that adds the
file; they are not deleted, and no other row inherits their claim by default.

---

## D-14 — The harness cap bounds the harness artifact, not the migrated suite

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Caps the harness/driver
artifact only (Recommended)". **Ratifies:** L1's `ASM-4` (the N convention), which no longer floats.

**Decision:** `50 + 10×N` bounds a module's **harness** — driver, fixtures, factories, mock seams. A
module's product batteries and the rows D-10 migrates are **evidence**, not harness, and do not count
against it; otherwise the first migrated suite (hundreds of lines) would breach a 120–270 line cap the
moment the migration runs.

`N` is the count of the surface a module **exposes or consumes** — MCP tools and resources, bridge
routes, package exports called, and a pure module's exported value names — with both sides of one route
counted. The lint derives the cap from the module's declared row; the author never declares the cap.

---

## D-15 — The re-grain runs against the live tree; the archived group table is not editable

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-11.** **Source:** D-11's own enumeration,
measured against D-2 by the L1 pass that executed it.

**Decision:** D-11 named "the group table in the archived contract" among the places that must move
with the tool census. That one cannot move: D-2 archived the corpus as a closed, untracked historical
record, and editing it to match today's tree would falsify a superseded reading (D-9's precedent). The
re-grain therefore executes against the **live** tree only.

Two corrections to D-11's list, both measured:

- The group set lives in **two** live copies, not one: `src/main/security.ts:151` (`VALID_GROUPS`) and
  `src/main/security-store.ts:87,122,339`, whose settings filter would silently drop a `data` patch if
  only the first moved. Both are in the re-grain set.
- The rest of D-11 stands unchanged: `ALL_TOOLS` 22 → 27 with the five `provident.data.*` tools,
  `RpcMethod` 22 → 27, groups five → six, and the default grant still `['read','dispatch']` (8 tools,
  so enabling `data` lists 13).

---

## D-16 — The security store is rebuilt as its own provident-storeroom instance, isolated from MCP

**Status:** ACTIVE · **Date:** 2026-10-29 · **Supersedes:** the current `SecurityStore` design and
implementation.

**Source (user, verbatim):** "The security store implementation is going to be rebuilt entirely to
instead be a separate provident-storeroom instance that is isolated from MCP, disregard the current
design and implementation."

**Decision:** `src/main/security-store.ts` — the five-member `SecurityStore` (`get`,
`lastWriteReceipt`, `readEntry`, `set`, `writeEntry`), its receipt form closed at `'write-failed'`, and
its `tier4-closed` answer — is **disregarded, not carried**. Its design and implementation are replaced
wholesale, and no part of the old shape is preserved by default.

- **Its own instance, not the central store's.** The replacement is a **separate**
  `provident-storeroom` instance with its own lifetime and its own file. It is not the instance
  `provident.data.*` reads, and sharing that instance would defeat the separation.
- **Isolation from MCP is a hard invariant.** No MCP tool, resource, `RpcMethod` member, bridge channel
  or rendered surface may read or write the security instance. Concretely: the `provident.data.*`
  surface is scoped to the central profile store and **refuses** a security-owned path, and every
  path that reaches the security record stays on the operator's manual-UI channels
  (`src/main/main.ts`, `src/main/preload.ts`). The invariant is *tested* — a declared boundary with no
  row behind it is a claim, not a control.
- **The group set's second live copy moves with it.** `VALID_GROUPS` lives inside the file being
  rebuilt (`security-store.ts:87`, D-15); the rebuild owns that copy and must not drop it.
- **Nothing here is patched in place.** D-13's persisted-file census, and every frozen digest imaging
  `security-store.ts` (E-4's class), are **re-derived by the rebuild's own unit** — the old bytes and
  the old digests do not survive a wholesale replacement.

**Consequence:** this opens a unit of its own (`security-store-storeroom`), which starts at L1 like
every other: the `operator-settings` row in `strata/modules.json` and the module's I/O surface are the
first things that must change. It does not merge to `main` until the user grants it (D-6).

---

## D-17 — The instance is the operator-settings state machine; its surface is a separate module

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, verbatim):** "The security store will be the
state machine underlying the operator-settings surface (the surface itself will interact with read/write
and listeners as a separate module), and also containing the current security record."

**Decision:** the rebuilt `provident-storeroom` instance is the **state machine** under the operator's
settings, not a repository behind one module. It holds the current security record — bearer token, group
grants, exclusion state, tier-4 flag — **and** the operator-settings state that today lives in the profile
files.

- **The surface is a separate module.** It sees the instance only through **read, write and listeners**;
  it never reaches into the instance's internals, and the instance knows nothing about the surface. That
  is the same interface a foreign consumer gets from the package, so the surface's tests can drive it
  without the instance's code.
- **Listeners are the change path**, so a committed write reaches the gate, the window and any rendered
  view through subscription rather than through a poll or a re-read.
- **Consequences to carry as this unit's own work:** the `operator-settings` row in `strata/modules.json`
  and the new surface module's row are re-declared by L1; `preload.ts`'s imports move off
  `security-store.ts`; and the group set's second live copy (`VALID_GROUPS`, D-15) moves with the instance
  and must not be dropped.

---

## D-18 — Isolation from MCP is enforced by one operator-only reference, tested by absence

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Operator-only reference, tested
by absence (Recommended)"

**Decision:** exactly **one** reference to the instance exists, held by the operator path — `main.ts`
constructing it, the surface module and the gate consuming it. Nothing in the MCP stack holds it, and no
`provident.data.*` tool, MCP resource, `RpcMethod` member or bridge channel resolves into it.

The control is **absence, asserted**: rows state that no data path, resource or bridge member reaches the
instance's file or its keys, and that the operator's channel set is the manual-UI IPC only. A refusal
implemented inside the MCP stack would make a refusal bug a data leak, which is why sharing the instance
was rejected.

---

## D-19 — The instance imports the existing profile bytes once, then owns a new shape

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Import once, then own a new
shape (Recommended)"

**Decision:** on first boot after the rebuild, the instance reads the existing profile files once and
imports the security record into its own shape; from then on it owns that shape and the old names are
**retired, not written**. The import carries its own red set — an operator's token, grants, exclusion
state and tier-4 flag survive it, and a row proves it — because a silent capability change on upgrade is
exactly the kind of loss D-13's freedom must not buy.

---

## D-20 — The central-data unit's walkthrough closes before the rebuild starts

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Close the current unit's
exit walkthrough first, then rebuild (Recommended)"

**Decision:** the `central-data-management` unit gets its L0 exit walkthrough first, on the settled tree;
the `security-store-storeroom` rebuild then starts at L1 against that baseline. Two units in flight over
the same files, digests and census copies is the condition this ordering exists to avoid.
