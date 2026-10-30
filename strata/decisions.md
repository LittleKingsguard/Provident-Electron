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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Discharged by:** `strata/records/archive-sweep-pins.md` and `archive/gate-corpus-2026-10-29/`

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "docs/ tree → archive/, · **Discharged by:** `AGENTS.md`, `strata/README.md` and the bootstrap unit's pointer set
AGENTS.md + README.md become short pointers (Recommended)"

**Decision:** `AGENTS.md` and `README.md` are rewritten in the same pass to ≤ 60 lines each: what
the app is, the two goals, the command set, and where the authoritative corpus lives. Neither
carries a workflow rule — a restated rule is a rule that drifts, and it would be loaded ahead of
`strata/brief.md` on every session start. Everything they drop is in the archive (D-2).

---

## D-4 — The archive pass is a one-time mechanical sweep, authorised here

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Repoint or retire those · **Discharged by:** `strata/decisions.md` D-8 and D-9
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-4**, which stands as filed (D-1 makes · **Discharged by:** `strata/decisions.md` D-9
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Completes** D-4/D-8's retirement arm. **Source:** the · **Discharged by:** `strata/brief.md` §6 (the two-red ledger) and `archive/gate-corpus-2026-10-29/`
user's D-4 selection ("Repoint or retire those assertions in the same pass, recorded"), executed
against the L1 examiner's disposition table.

**Decision:** 15 test rows are retired, across seven files, because their **subject** is the corpus
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "The store may choose its own · **Discharged by:** `src/main/storeroom.ts` and `docs/L2/central-data/persistence.md` §1
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Supersedes:** the current `SecurityStore` design and · **Discharged by:** `src/main/operator-settings/` and `strata/records/security-store-storeroom-unit.md`
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, verbatim):** "The security store will be the · **Discharged by:** `src/main/operator-settings/` and `src/main/settings-surface/`
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Import once, then own a new · **Discharged by:** `strata/records/security-store-storeroom-unit.md`
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

---

## D-21 — The single operator reference is the surface module, and `main.ts` holds the surface

**Status:** ACTIVE · **Date:** 2026-10-29 · **Reconciles:** D-18's wording with the L2 interface.

**Source:** D-18's selection ("Operator-only reference, tested by absence") plus the L2 row it had to be
satisfied by, measured at the unit's own walkthrough.

**Decision:** D-18 said "`main.ts` constructing it". The construction is the **surface module's**
(`createSettingsSurface`), and `main.ts` constructs the *surface* and delegates the three channel bodies
to it. The invariant D-18 actually buys is unchanged and is what the rows assert: **exactly one
reference to the instance exists, it lives on the operator side, and nothing in the MCP stack holds
it** (`ISO-5`).

**Reading recorded because a reader will need it:** an `ASM-n` at L2 may satisfy a D-row without
rewriting it — the decision fixes the invariant, the interface fixes where the code puts it — but the
ASM may not *relax* an invariant, and a D-row whose wording names a file is a claim about the tree, so
when the tree moves the row gets a corrigendum like this one rather than a silent reading.

---

## D-22 — The old settings carrier retires first; the other modules consume the instance after it

**Status:** ACTIVE · **Date:** 2026-10-29

**Source (user, verbatim):** "Proceed with the full retirement of the old system, reimplementation of
the other modules to rely on the store as state engine will proceed after that checkpoint."

**Decision:** the **checkpoint** is the complete retirement of the old carrier, and nothing else. Then,
in the passes after it, the other modules are reimplemented to consume the instance as their state
engine.

**In the checkpoint (this unit, `settings-carrier-retirement`):**

- `provident-settings.json`'s hand-written carrier goes: its boot read (`src/main/main.ts:143`), its
  read at the settings channel (`:315`), its tmp+rename+fsync writer (`:384-390`), the `settingsPath`
  constant, and every other reader or writer of that path the tree still holds.
- The instance takes over that state the way it took over the security record: **imported once**, then
  owned (D-19's precedent). After the import the app never writes that file again.
- The persisted-file census falls to **two** — `provident-operator-settings.json` and
  `provident-profile.json` — and the rows that pinned three are re-grained, not deleted.
- Boot parity is its own red set: `maxJournalLength`, the group grants, the token and the exclusion
  state survive a restart **through the instance**, proven by a second construction rather than by a
  substring read.

**Outside the checkpoint, explicitly parked:** the gate's exclusion/tier-4 enforcement, the module
registry and the journal-length consumers moving onto the instance as state engine. Those are the
passes after this checkpoint is green, admitted as units like any other — they are not smuggled into
this one, and this unit may not read the instance from a place the isolation rows forbid (D-18).

**The checkpoint is green when** the carrier is gone (no writer, no reader of the old path anywhere),
the import-once arm carries its own red set, boot parity passes, the isolation rows stay green, and the
four legs plus `strata-lint` pass on a clean tree.

---

## D-23 — The group set's second copy lives in the operator-settings instance

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-15 and D-16.** · **Discharged by:** `src/main/operator-settings/index.ts`

**Source:** D-16's own instruction that the rebuild owns the copy, measured at the tree after the file it
lived in was deleted.

**Decision:** D-15 named `src/main/security-store.ts:87,122,339` as the group set's second live copy and
D-16 said the rebuild would own it. The file is now **deleted** (D-16 executed), so the copy lives at
`src/main/operator-settings/index.ts:112,178` — the instance — and the two live copies are
`src/main/security.ts` (`TOOL_GROUPS`, `VALID_GROUPS`) and that one.

**Reading recorded:** an append-only log will always keep a line cite into a tree that later moves, so a
row whose wording names a file gets a corrigendum like this one when the file goes (D-21's rule). The
alternative — silently reading D-15's cite as historical — leaves a reader chasing a path that no longer
exists, which is the drift the corpus exists to prevent.

---

## D-24 — The four package findings are intended behaviour; any gap is documentary

**Status:** ACTIVE · **Date:** 2026-10-29

**Source (user, verbatim):** "All of the package findings listed are intended behavior and should be
described in documentation. If documentation is missing that should be passed as a documentation defect"

**Decision:** none of the four findings is a behavioural defect. `AddressNotFound` on a delete of an
address where no row stands, the absence of a declared boot arm over non-image bytes, a `file`-tier write
purging the `mem` version at its own key, and a durable value's members returning in a fixed order are
all **the store working as designed**. The only demand that can stand against any of them is that the
package's documentation **describe** it.

Consequences, and they move the records:

- The unit records reclassify each row: `intended` plus its documentation status, never a behavioural
  demand. A row whose behaviour the shipped guide already describes carries **no demand at all**.
- Measured against the installed `provident-storeroom@1.6.1` guide at this head: the purge-at-own-tier
  rule is **documented** (`README.guide.md:380-382,423-424`), and the absent-address refusal family is
  documented (`:351,359,425`) including the delete arm — **no demand**. The boot behaviour over
  non-image bytes and the member ordering across the crossing are **not described anywhere in the
  guide's prose** (the only mention of ordering is `RELEASE-NOTES.md`) — those two are **documentation
  defects**.
- A documentation defect is filed in the unit record of the unit that met it and handed off the same way
  any finding is (D-5); it never justifies a code change in this repo or in the package.

---

## D-25 — The import carries the record; the exclusion pair is not an import member

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-19**, which stands as filed (D-1 makes this · **Discharged by:** `strata/records/security-store-storeroom-unit.md`
log append-only). **Source:** D-19's own wording, read against the tree at the exit walkthrough of
`security-store-storeroom` (run 3) and the layer documents that carry the design.

**Decision:** D-19's decision stands whole — the instance reads the legacy profile bytes once and then
owns a new shape, and the import carries a red set because a silent capability change on upgrade is
exactly the loss D-13's freedom must not buy. What this row corrects is D-19's **enumeration** of that
red set. It named "an operator's token, grants, exclusion state and tier-4 flag" as surviving the import;
measured at this head, the import carries **exactly the four record members**, and the exclusion pair is
not among them.

- The durable record at `['operator-settings']` (`file` tier) holds the token, the enabled-grant set,
  `maxJournalLength` and the ordered entries row set (`src/main/operator-settings/index.ts:113,537`).
- The exclusion pair at `['operator-exclusion']` is a `mem` row, written in memory and **never persisted**
  (`:114,499`; `docs/L1/security-store-storeroom.md` §3 `ASM-2`, `docs/L2/security-store-storeroom/interface.md`
  §1/§7 `ASM-L2-2`), so it boots to the safe pair `'mcp-enabled'` on every start and is not an import
  member at all.

**Consequence, stated because it moves a claim:** the upgrade's red set is the record's four members, not
five. An operator's exclusion state and tier-4 flag survive a **restart** in the sense that the declared
default is the safe one they are designed to boot to; they do not survive as data, and a reader who takes
D-19's list literally would design an import that carries a pair the store is built never to persist.

---

## D-26 — A live count is a measurement, and measurements live in `brief.md` §6

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-9 and D-10** on the numbers they carry,
which stand as filed. **Source:** D-9's and D-10's own wording, measured against the suite at this head
(`2 failed / 3,175 passed / 2 skipped` of `3,179` over `112` files) after the fifth blind walkthrough of
`strata-bootstrap` filed the drift as its top finding class.

**Decision:** a count that describes **this tree right now** is a measurement, and a measurement has one
home — `brief.md` §6's instrument table, which is rewritten whenever it is re-measured. A `D-n` row may
carry a count, and where it does, the number is that row's own dated reading and is **not** a claim about
the tree today: a reader takes the current figure from §6 and never from the row.

- D-9's "`3,114` collected rows before the sweep and `3,099` after" is the **sweep's delta** and stays
  exactly as filed; it measures what that pass moved, not what the suite holds now.
- D-10's "the existing 3,099 rows keep running where they are" fixes the **rule** — the suite keeps running
  in place until the map claims its paths — and its number is D-10's date, not today's reading.
- Any live document outside the register follows the same rule: it cites §6 rather than restating a count,
  so a re-measurement touches one table instead of a corpus (`brief.md` §6, D-1).

**Consequence, stated because it is the failure this row answers:** three walkthrough runs have now filed
a stale count as their finding, and each was "fixed" by writing a newer number into another document, which
drifted again at the next commit. The fix is to stop restating measurements outside the one table that owns
them — not to keep re-measuring faithfully into a dozen files.

---

## D-27 — The next unit is the main bundle's boot seam, and the walkthrough stays documentation-only

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Fix the boot seam first · **Discharged by:** `strata/records/bundle-boot-seam-walkthrough.md` (run 12, `PASS`)
(Recommended)"; "Documentation-only, as now (Recommended)".

**Decision:** the next unit admitted through the loop is the **boot seam** — the measured defect that
`dist/main/main.cjs` dies at module load, because the main bundle is built CJS while the ESM-only
`provident-storeroom` resolves its native addon through `import.meta.url`, which esbuild's CJS output
leaves as `{}`. The failure is `createRequire(undefined)` at `dist/main/main.cjs:38480`; it is recorded
with its reproduction in `strata/records/security-store-storeroom-unit.md` §2, and both Electron legs that
reach the bundle are red on it at this head (`npm run divergence` exit 1; `npm run ui` no verdict).

- It is admitted like any other unit: L1 files its `strata/modules.json` row **first**, and no design is
  admitted before the map (D-7, `modules.md` §3).
- It is sequenced ahead of D-22's parked second half because it is the **floor** of verification: nothing
  about a running app, a bridge hop or a rendered surface is observable until the bundle boots, so every
  later unit's evidence would otherwise stop at the node-suite boundary.
- The regression that closes it is a row that **runs the built bundle and requires a handshake** — not a
  node-level row that inspects source, which is the reading that let this defect survive three units
  (`security-store-storeroom-unit.md` §2, `F-1`).

**Walkthrough scope, confirmed rather than changed:** the exit walkthrough stays documentation-only. The
staging root carries the built bundles, but a run reads documents and never drives the app, so a `PASS`
certifies the documentation and never the app (`walkthrough.md` §2-§3, D-1).

---

## D-28 — A citation into a live, appendable file names the row, never the line

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the sixth blind walkthrough of `strata-bootstrap`,
measured against the tree at `bd04abf`: one inserted row in `strata/modules.json` moved every row below it
and broke **five** documents' cites at once, and no corpus rule required a cite that survives an insertion.

**Decision:** where a document cites `strata/modules.json` — or any other file the layers append to — it
names the **row or the section** and never a line number: "the `central-data` row of `strata/modules.json`",
not "`modules.json:83-94`". A line cite into an appendable file is a claim about a layout that the next
insertion falsifies, and a falsified cite is the drift this corpus exists to prevent (D-21, D-23, D-26).

- A cite into a **stable** file — one no layer appends to, `brief.md` §6's table or a code file's own body
  — keeps its line numbers, and a line cite is still the sharpest form available there.
- The rule binds the corpus, not the code: a comment in `src/**` citing a document by line stays as written
  (D-4), and a document citing an archived path keeps its path and section (D-2 §2).
- **What it changes for a reader:** a map cite that cannot name its row is not specific enough to be
  useful, so a re-grain of one replaces the number with the row's `name` and, where the figure matters,
  the figure itself — never a repaired line range.

**Consequence, stated because it happened:** the map grew one row this pass and eight cites in five
documents stopped landing. Re-pointing each number would fix the symptom until the next row; naming the row
fixes the cause, and it is the same reasoning D-26 applies to counts (D-1, `platform.md` §4).

---

## D-29 — The walkthrough instrument is a script, not another prose pass

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** "Rebuild the walkthrough · **Discharged by:** `scripts/strata-walkthrough.mjs`
instrument (Recommended)", after seven blind runs on the `bundle-boot-seam` unit and four more on the
open units found **no coverage failure at all** — every finding they filed was a drifted count, a
non-landing cite or a cross-document contradiction.

**Decision:** the exit walkthrough's staging root and its mechanical checks become a script,
`scripts/strata-walkthrough.mjs`, owned by the `harness` row like the other instruments. Three verbs:

- `stage <unit> [dest]` builds exactly the root `walkthrough.md` §3 declares — the corpus, the layers, the
  root pointers, the manifest, a correct tracked-path listing, a correct archived-path listing, the built
  bundles and an empty work directory — so the listing that a run reads is generated, never hand-made. The
  first hand-built listing prepended the archive prefix to paths that already carried it, and a run
  reported the resulting misreading as a corpus defect.
- `check <root>` resolves every path a staged document cites, through the archive prefix mapping, and
  exits non-zero on anything that does not land; a cite naming a file the tree no longer carries is
  reported as a **note** rather than a failure, because the corpus cites retired files on purpose.
- `pins [root]` prints the counts a document must cite rather than restate (D-26): test files flat and
  nested, source files, map rows and each row's derived cap.

**What it does not do, stated so nobody over-reads a green:** it resolves paths, not claims. It cannot tell
whether a sentence is true, whether a figure agrees across two documents, or whether a section cite names a
real section. Those remain the blind run's work — the script exists so the run spends its judgement on
truth rather than on arithmetic.

**Consequence:** a walkthrough report now carries the script's reading beside its verdict, and a run that
reports a path-class finding the script did not see is evidence about the script. `strata-state` already
refuses a fourth failure on the same artifact class (`run rebuild or pass`), so the corpus has no way left
to spend another pass on prose that a script can refuse.

---

## D-30 — Test triage for the storeroom rework: e2e is retained, integration and unit scenarios are marked

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, ruling and three selections):** "For e2e tests
(ex. agent hits MCP with X given existing state Y, expecting response Z or UI equivalent), retain as-is
unless existing behavior is found to be a defect"; "For integration/unit tests, mark the scenario for later
review/reimplementation"; "tests/e2e/** plus the three Electron legs"; "Per-scenario source marker +
L1-owned registry, script-checkable"; "marked rows are reported separately and stop gating".

**Decision:** the machinery is to be reworked onto the storeroom's constraint/repair and listener engines as
a state machine and event generator, so a scenario pinning today's build is a measurement with a shelf life.

- **Retained as-is:** `tests/e2e/**` and the three Electron legs (`battery`, `divergence`, `ui`). Each states
  an exchange at a process boundary — a supplied state, a surface, an answer that is the product — so a red
  there is a defect in behaviour until another measurement says otherwise.
- **Marked for later review/reimplementation:** every integration and unit scenario — `tests/integration/**`,
  `tests/unit/**` and the flat `tests/*.test.ts` suite. It is never re-grained: re-pointing a test row at a
  moved census or a renamed internal is the work this decision removes, and the rework replaces it whole.
- **The marker** rides in the test source beside what it marks: `// strata:marked rework — <reason>` above an
  `it` or a `test` marks that scenario; the same line with `marked-file` in the file's header marks every
  scenario in it, which is the shape every flat file and every strata integration/unit battery takes, being
  one kind throughout. A marker above a `describe` is refused rather than guessed at (`check`).
- **The registry** is `strata/marks.json`, L1-owned beside `strata/modules.json`, generated from those
  markers by `scripts/strata-marks.mjs` (the `harness` row) and never hand-edited: `index` writes it and
  refuses to write past a malformed marker, `check` refuses when source and index disagree, `report` prints
  both readings. Its counts are the index's, never restated in prose (D-26).
- **The gate:** a marked row stops gating. `npm test` reports the on-notice reading beside the gating one,
  and the four legs of `brief.md` §6 rest on `tests/e2e/**`, the three Electron legs and every unmarked row.
  How the runner separates the two readings is L2's arrangement to decide and L4's to land; this row states
  the rule only (D-3).
- **Carried over unmarked:** the worktree boundary assertion of `tests/store-tabs-record.test.ts` §4.2 item
  9, being a loop instrument rather than machinery — a loop that marks the row measuring its own tree has
  nothing left to measure.

**Consequences, stated because they follow:** the two long-standing reds — that same file's §4.2 items 7
and 8 — move from red to on notice and the rework owns them; a run that finds a marked scenario's expectation
outdated files a `mark`, not a defect; `brief.md` §5/§6 and `AGENTS.md` carry the split; no package change
follows and nothing is merged or pushed (D-5, D-6).

---

## D-31 — D-30 supersedes the test-row re-grain arm of D-10, D-11, D-13 and D-22

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-10, D-11, D-13 and D-22** on their
test-row arm; those rows stand as filed (D-1). **Source:** the register read against the tree after D-30
landed, where four live rows still instruct the re-grain D-30 forbids.

**Decision:** where any of the four says a **test row** is re-grained in the unit that moves a number, a
name or an arrangement, the row now reads: the test row is **marked** `// strata:marked-file rework` and
the rework replaces it whole (`strata/marks.json`; D-30). Nothing else in those rows moves.

- D-10's **location** goal stands untouched: a module's rows migrate into
  `tests/{e2e,integration/<module>,unit/<module>}/` at claim time. D-30 replaces the assertion's
  maintenance, not its address.
- D-11's "each test row that counts them", and D-13's and D-22's "re-grained, not deleted", keep their
  **subject** — the census copies and the persisted-file set still move with the unit that moves them —
  and lose only the instruction to re-point a test row's expectation.
- A **`src/` statement** that reads a moved number is not test-side and is still re-grained by the unit
  that moves it: `src/main/security.ts`'s `TOOL_GROUPS`/`VALID_GROUPS`, `ALL_TOOLS`, the `RpcMethod`
  union (D-11). D-30 touches nothing there.
- The old instruction was followed once and cost a pass: `docs/L1/central-data-management.md` §8 lists
  `tests/secure-store-discipline.test.ts`, whose rows were retired whole with the file by the sibling
  unit's E-5, so a re-grain of that row had no referent left to re-point.

**Consequence:** a unit that moves a number now re-grains the code and the documents, and **marks** the
test rows. D-10's migration and D-30's marking govern different things, and a reader who finds both should
not read a contradiction.

---

## D-32 — Corrigendum to D-20: the ordering was missed, and the principle still binds

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-20**, which stands as filed (D-1).
**Source:** the register against the tree — D-20 entered at `0eca66b` (2026-10-28 23:10), the rebuild's
implementation landed at `574cecd` (2026-10-29 00:08), and `central-data-management`'s walkthrough has
never closed (`strata/records/central-data-management-walkthrough.md`).

**Decision:** D-20's ordered pair is **spent and unmet**, and the corpus records that rather than reading
it away — which is D-21's own rule about a row that makes a claim about the tree.

- The **collision it existed to prevent occurred**, and the corpus still shows the scar:
  `docs/L1/central-data-management.md` C-2 lists `tests/secure-store-discipline.test.ts`, a file the
  rebuild's E-5 retired whole, and names `src/main/operator-settings/index.ts` as the second group-set
  copy "re-homed by the rebuild after `src/main/security-store.ts` was deleted (D-16)".
- The **principle binds from here**, in D-20's own words and not its spent ordering: no two units in
  flight over the same files, digests or census copies.
- It does **not** gate the `secure-panels` unit (D-35). The one file that unit shares with an open unit is
  `src/renderer/secure-panels.ts`, and central-data's own documents transfer that term to the pane's unit
  (`docs/L1/central-data-management.md` C-2's last term; `strata/records/central-data-management-unit.md`
  §2); an owner taking its own property is not the overlap D-20 forbids.
- The three open units' walkthroughs are **not** a precondition for a unit that touches none of their
  files. They close on their own schedule, at the cap decision their records owe (D-10).

---

## D-33 — Corrigendum to D-22: the retirement is named, not its line numbers

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-22**, which stands as filed (D-1).
**Source:** D-22's three cites into `src/main/main.ts` measured at this head — `:143`, `:315` and
`:384-390` no longer name the boot read, the settings-channel read or the tmp+rename+fsync writer.

**Decision:** D-22's checkpoint is **discharged**, and what it claims is the retirement, not the
coordinates: no `settingsPath` constant, no reader of `provident-settings.json` and no writer of it
anywhere in `src/main/main.ts`, with the state that carrier held carried by the operator-settings instance
under D-19/D-25's import-once.

- The three line cites are **D-22's dated reading** and are not repaired: a repaired range drifts at the
  next edit, and D-28 already rules that a cite which must survive a moving file names its subject.
- A reader takes from the row the retired carrier, its replacement and the checkpoint's green conditions —
  which `strata/records/settings-carrier-retirement-unit.md` carries in its own terms.

---

## D-34 — A discharged row says so on its own Status line

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** "D-34 — a convention for
marking a row discharged", from a review that found all thirty rows reading `ACTIVE` — executed,
standing and unpaid alike.

**Decision:** a row whose work is **wholly** discharged carries one added clause on its Status line:

` · **Discharged by:** <the record, artifact or row that closes it>`

Nothing else in the row moves. This is provenance, which D-1 already attaches to a statement: it is
**not** a rewording, and a change of substance still needs a corrigendum row.

- **Absence asserts nothing.** A row without the clause is not thereby open — it may be a standing rule, a
  rule whose work is partly done, or an obligation nobody has taken. A reader who needs the difference
  reads the row itself.
- A row discharged **in part keeps no clause**, and names its remainder in a corrigendum or in the unit
  record that owns it (D-22 with D-32; D-11 with D-35).
- The clause cites something that exists, and it is checked like any other citation (D-28).

---

## D-35 — The next unit is the Settings pane's sixth group

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** the `secure-panels` unit, from
the register review that ranked the open items.

**Decision:** the next unit admitted through the loop closes D-11's uncovered term:
`src/renderer/secure-panels.ts` enumerates five group names in `GROUPS` against the gate's six
(`src/main/security.ts`'s `ToolGroup`), so `data` is in `VALID_GROUPS` with **no operator control**.

- Its map row is already filed — `secure-panels`, seven claimed paths — so L1's first act is a design
  against an owned subtree, not a new claim (D-7).
- The pane is provident-authored data already: `paneEnvelope()` builds one toggle per `GROUPS` entry, so
  the change is a sixth entry in a data set on the graph path that exists. No hand-written DOM.
- It carries D-12's precondition — an operator-visible control over store state — which the undo unit
  will need in the same envelope, and it discharges the term central-data's documents transferred here
  (D-32).
- It is measured, not asserted: the app boots and `npm run ui` drives a live renderer (D-27), so a green
  on this unit is a rendered-surface reading rather than a node-suite one.

---

## D-36 — Corrigendum to D-35: the pane's map row claims eight paths, not seven

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-35**, which stands as filed (D-1).
**Source:** the `secure-panels` unit's L1 design, finding F-2, measured against the `secure-panels` row of
`strata/modules.json`: its `paths` carries **eight** entries — `src/renderer/secure-panels.ts` and seven
flat test files — while its `endpoints` is **7**.

**Decision:** D-35's "seven claimed paths" read the endpoints figure onto the path list. The row claims
eight paths and seven endpoints, and the derived cap `50 + 10×7 = 120` is unmoved by the correction.

- The row claims **no** `tests/e2e/` path at this head, which is finding F-1 of the same design: D-7's
  map-before-the-artifact ordering is unsatisfied for the battery this unit needs, and the claim is added
  by the map's own writer before the battery is authored — not by this row and not by L0.
- Recorded because a count in a decision row is both its own dated reading (D-26) **and** a claim about
  the tree (D-21). This one was wrong on both counts at once — the failure mode D-26 and D-28 exist to
  prevent, committed by the seat that wrote them.

---

## D-37 — The pane unit's proof is a live leg with a script key, outside the four legs

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** "A script key outside the four
legs, exactly as `ui` sits".

**Decision:** the `secure-panels` unit's decisive evidence — a rendered sixth toggle — is taken by a
live-renderer leg at `tests/e2e/secure-panels/panes-live.mjs`, reachable by one script key beside
`battery`, `divergence` and `ui`. It is **not** a fifth member of `brief.md` §6's floor: a display-gated leg
that every change had to satisfy would change the non-negotiable itself, and the corpus already carries
this shape — three Electron legs that run when a unit needs what only they can see.

- The floor stays **four legs**. A unit whose claim is a rendered surface adds this leg to its own evidence
  and says so in its record (D-1).
- The key is a `package.json` change, and that file is claimed by the `bundle-boot-seam` row: the key lands
  through that row's owner as harness work, never by L0 and never by the unit that needs it (D-7).
- The battery sits under `tests/e2e/`, the path D-30 retains: it is never marked, and it gates whenever it
  is run.

---

## D-38 — The carve-out is a class: a row that guards a loop instrument stays gating

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** D-37's selection, measured against the tree —
adding the `panes` key reddens `L-1` of `tests/ui-leg-contract.test.ts`, which pins the `scripts` key set
**as a set in both directions**, and that row carries D-30's file marker.

**Decision:** D-30's carve-out is not one row. A scenario whose subject is **how the loop measures** — the
leg set and the shape of each leg, the worktree boundary and its declared edit set, the script keys those
legs answer to — is an **instrument row**: it stays unmarked, it gates, and it may be **extended** when the
instrument set legitimately grows, because a marked instrument cannot measure the tree it guards.

- The test for membership is narrow: would the scenario still mean anything if every module were rewritten?
  A row about a leg's command, an edit set or a key set survives that rewrite; a row about a module's
  behaviour does not, and stays marked.
- Extension follows the row's **own** doctrine rather than this row's licence: `L-1`'s comment already says a
  legitimately added key extends the landed set and never turns the assertion into a lower bound.
- A row that merely **reads** `package.json` for a build arm is not an instrument row; the class is rows
  whose *subject* is the instrument (D-30, `strata-marks.mjs`'s carve-out reading).

---

## D-39 — A register corrigendum about a count cites the row, never the figure

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-36**, which stands as filed (D-1).
**Source:** the `secure-panels` map claim, measured — D-36 says the row "claims eight paths", and the claim
F-1 required landed later in the same pass, making it nine.

**Decision:** where a corrigendum turns on a **count inside a file the layers append to**, it cites the row
and not the figure, exactly as D-28 requires of any citation into such a file: "the `secure-panels` row of
`strata/modules.json`", never "eight paths".

- D-36's figure was true when measured and false an hour later. That is not a reason to stop counting; it is
  the reason the count is not the correction's subject. What D-36 corrects is the **claim kind** — a path
  count read as an endpoints figure — and that correction stands.
- A figure may still appear where it *is* the provenance (a dated reading under D-26), and then the row's own
  sentence dates it.
- The `secure-panels` row carries nine paths and seven endpoints at this head; a reader takes both from the
  row itself (D-26, D-28).

---

## D-40 — A scenario authored after D-30's sweep is not marked

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** D-30's own wording, read against the unit it was
written for — it marks "every integration and unit scenario", which taken literally would mark the new
batteries the `secure-panels` unit is authoring as its own evidence.

**Decision:** the mark covers what **existed when the rework was decided**. A scenario authored after it, for
a unit whose subject is not the rework, is **new evidence and gates**: it carries no marker, and leaving it
unmarked is the act of declaring it evidence rather than a pin.

- The mark is not inherited by a directory: `tests/integration/<module>/` being marked once does not mark a
  later file in it, and `strata-marks.mjs`'s readings show the difference as a gating site.
- A unit that marks its own new battery has said, in effect, that nobody should trust it yet — which is
  allowed, and then the unit's record must say so (D-1).
- The rework's own replacement rows are authored unmarked for the same reason: what the rework *adds* is the
  thing to hold to, and what it *replaces* is what D-30 released.

---

## D-41 — A cite into a source file names the site; an offset is a dated reading and says so

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the `secure-panels` landing, measured — a
twenty-line insertion moved **eleven** offsets that L1's and L2's documents were citing, and L3 had to
recompute every one of them inside the same session that wrote them.

**Decision:** a document citing a source file a unit edits names the **site** — "the constants block",
"`paneEnvelope()`", "`syncConfig`'s `toggle:` arm" — and never a bare offset. Where an offset is genuinely
useful it carries the state it was true at ("post-landing at `4bd17d6`") and is a dated reading (D-26).

- This is D-28 extended from *appendable* files to *moving* ones: the same failure — an insertion falsifying
  every cite below it — reached by a different mechanism, paid for twice in one unit.
- A blind run must not have to recompute an offset to read a claim. A finding of the form "the cited line is
  not that" is arithmetic, and the instrument resolves paths, not truth (D-29).
- **L4's edit order is the exception:** it is an instruction to a one-shot pass, so its offsets are
  pre-landing by construction and say so.

---

## D-42 — Corrigendum to D-39: the figure D-39 forbade is the one it carried

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-39**, which stands as filed (D-1).
**Source:** the `secure-panels` unit's blind exit walkthrough, run 1, measured against the staged tree —
D-39 says the row "carries nine paths and seven endpoints at this head", and the `secure-panels` row of
`strata/modules.json` carries **ten** paths and seven endpoints.

**Decision:** the correction is D-39's own rule turned on itself: a statement about a count in a map **cites
the row**, and the reader takes the figure there. D-39's sentence is read as its dated reading — the row held
nine paths when the e2e and integration claims were the last to land, and L2's integration claim made it ten.

- Nothing else in D-39 moves: the claim-kind correction it makes against D-36 stands, and so does the rule.
- A walkthrough found this, which is what a walkthrough is for. That the corpus's own rule-bearing row broke
  its rule is worth more to a reader than the number it got wrong.

---

## D-43 — A summary may not restate a fact another document or the state owns

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the `secure-panels` unit's **third** exit walkthrough,
which returned `STALE` with six findings and **not one of them in the unit's own three layers** — every one
was a corpus summary asserting a fact owned elsewhere: a ceiling from D-3, a code shape from L1's census, a
unit's stage from the handover, a uniqueness claim from a record.

**Decision:** a document that summarizes may **cite** a fact owned elsewhere and may not **restate** it. The
owners are `brief.md` §6 for counts (D-26), `strata/.strata/units/*.json` for a unit's stage and streaks, the
map for paths and endpoints, and each document for its own content (D-3).

- A summary that names another layer's internals — "E-1 cites `:40`" — cannot be kept true: the owner moves it
  and the summary is not re-read at that moment. Cite the row or the section and stop (D-28, D-41).
- A queue names **work**. A landed unit is not work; the entry names what the unit still **owes**.
- A ceiling is a rule of its owning row (D-3), so a file that outgrows one is trimmed or the rule is amended —
  never left as a silent breach.

**Consequence, stated because this is the third consecutive `STALE`:** `rebuild.md` §3 says a third
consecutive failure on one artifact indicts the **artifact**, not the prose. The three runs are recorded
together and they do indict it — the walkthrough is doing its job, since every finding was real, and what it
exposed is that the drift lives in the **summary layer**. This row is the correction, written as a rule
because repairing six sentences would produce the next six.

---

## D-44 — The walkthrough root carries `src/`, and an unverifiable claim is never a falsified one

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** `secure-panels`' fourth exit walkthrough, which filed
as **falsified** a claim that is **true**: `src/main/preload.ts`'s `set()` declaration says a closed-pair set
answers the channel refusal, and the staged `dist/main/preload.cjs` carries no such sentence — because that
block lives in a `declare global` **interface**, which esbuild erases. The run noted the alternative reading
and filed it anyway.

**Decision:** the staging root carries `src/` — a document's claims about code, including claims about
comments, are checkable only against the code — and a claim the root cannot settle is recorded as
**unverifiable**, never as falsified.

- Comments survive in source and vanish in every bundle. Since D-41 already names the site, and the site is
  in `src/`, the root must carry it or the rule cannot be tested.
- `tests/`, `scripts/` and `node_modules/` stay absent: a battery's or a driver's internals are not what a
  walkthrough judges.
- A run that cannot check a claim says `unverifiable` in its table and does not count it as a finding.

**Consequence, and it is the rebuild `rebuild.md` §3 called for:** the unit's first three failures were real
findings about the corpus's summaries (D-43), but the fourth was the instrument's own limit. So the
**instrument** changed and the sentence did not — which is what it means to indict the artifact rather than
the prose.

---

## D-45 — A document's hand-kept declaration block is checked, or it is not kept

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the `security-store-storeroom` unit's L2 documents,
measured — both declaration blocks had drifted from their modules (three verbs declared against five, four
against six, and a receipt shape carrying an ordinal the tree's answer does not), while the L3 document
declaring **the same surfaces** had not drifted at all.

**Decision:** a document may keep a declaration block only if something compares it to the tree. Cheapest
first:

- **(i) keep none** — cite the code and stop carrying a copy. Zero drift surface, and D-43's rule already
  says a summary cites rather than restates. It costs the reader a hop.
- **(ii) a battery row** comparing the block's declared **name set** against the module's exported names —
  no new instrument, no new module name, and per D-40 a row authored now **gates**. Measured on this unit:
  ~15 lines, and it would have caught both drifts.
- **(iii) a generated block**, which needs a new instrument row and a `brief.md` §6 entry, and strips the
  per-line glosses unless they move into a hand-kept table beside it.

**No arm moves a census:** a doc-side projection, a lint or a battery row mints no module endpoint (D-14).
Arm (ii) is the default where the glosses earn their keep; (i) where they do not.

**What looks like the check but is not:** `surface.test.ts`'s export-census row pins the **entry's run-time
exports** and asserts four callables of the six, so it could not have reddened on either drift, and it titles
itself "the four verbs" (routed to that unit's test writer).

---

## D-46 — A record of a past pass keeps its readings; a live document names sites

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the D-41 sweep, measured — after ~170 offset
citations became statements, the residue is exactly two kinds: three rows in the register and one historical
returns envelope, each of which is a record of what a document said at a time.

**Decision:** D-41 binds **live** documents. A record — a `D-n` row (D-33), a `.strata/returns/` envelope, a
walkthrough record, a closure record's dated table — **keeps the readings it took**, because its subject is
what was measured then, and re-pointing it would make the record agree with today at the cost of being true
about its own moment.

- The test is the document's tense: a sentence that says what **is** names a site; a sentence that says what
  **was measured** keeps its reading and dates it.
- A record whose reading no longer lands is not a defect to repair — it is evidence, and a reader who needs
  the current fact takes it from the live document or from `brief.md` §6 (D-26).
- The exception proves the rule: `docs/L1/settings-carrier-retirement.md`'s removal table is a dated record
  and stayed, while the same file's live claims were converted in the same pass.
