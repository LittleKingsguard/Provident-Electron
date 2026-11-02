# Provident-Electron — strata decisions log

The only record of user intent for this project under the strata workflow. Append-only: a decision
is never edited, reworded or annotated, and a later decision supersedes an earlier one by naming it.
One section per decision, ≤ 40 lines each. **Source** is the user's own words or the exact option
they chose, or — for a rule the corpus derived from its own measured error — the measurement itself, which
the row names (D-47). An assumption no ruling settled belongs in `brief.md` as an `ASM-n`, not here.
A **corrigendum** row is sourced by the row it corrects — user-sourced or measurement-sourced (D-47) — plus
the measurement that compelled it, and it carries that row's authority: it may not change what a user decided.

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Discharged by:** `strata/records/archive-sweep-pins.md` and
`archive/gate-corpus-2026-10-29/`

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
AGENTS.md + README.md become short pointers (Recommended)" · **Discharged by:** `AGENTS.md`,
`strata/README.md` and the bootstrap unit's pointer set

**Decision:** `AGENTS.md` and `README.md` are rewritten in the same pass to ≤ 60 lines each: what
the app is, the two goals, the command set, and where the authoritative corpus lives. Neither
carries a workflow rule — a restated rule is a rule that drifts, and it would be loaded ahead of
`strata/brief.md` on every session start. Everything they drop is in the archive (D-2).

---

## D-4 — The archive pass is a one-time mechanical sweep, authorised here

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Repoint or retire those
assertions in the same pass, recorded (Recommended)" · **Discharged by:** `strata/decisions.md` D-8 and
D-9

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-4**, which stands as filed (D-1 makes this
log append-only). **Source:** the L1 examiner's measurement at the sweep
(`strata/.strata/returns/archive-sweep-pins.json`), read against D-4's selection. · **Discharged by:**
`strata/decisions.md` D-9

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
user's D-4 selection ("Repoint or retire those assertions in the same pass, recorded"), executed against
the L1 examiner's disposition table. · **Discharged by:** `strata/brief.md` §6 (the two-red ledger) and
`archive/gate-corpus-2026-10-29/`

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "The store may choose its own
on-disk shape" · **Discharged by:** `src/main/storeroom.ts` and `docs/L2/central-data/persistence.md` §1

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
implementation. · **Discharged by:** `src/main/operator-settings/` and
`strata/records/security-store-storeroom-unit.md`

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
and listeners as a separate module), and also containing the current security record." · **Discharged
by:** `src/main/operator-settings/` and `src/main/settings-surface/`

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
shape (Recommended)" · **Discharged by:** `strata/records/security-store-storeroom-unit.md`

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-15 and D-16.** · **Discharged by:**
`src/main/operator-settings/index.ts`

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-19**, which stands as filed (D-1 makes
this log append-only). **Source:** D-19's own wording, read against the tree at the exit walkthrough of
`security-store-storeroom` (run 3) and the layer documents that carry the design. · **Discharged by:**
`strata/records/security-store-storeroom-unit.md`

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Fix the boot seam first
(Recommended)"; "Documentation-only, as now (Recommended)". · **Discharged by:**
`strata/records/bundle-boot-seam-walkthrough.md` (run 12, `PASS`)

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

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** "Rebuild the walkthrough
instrument (Recommended)", after seven blind runs on the `bundle-boot-seam` unit and four more on the
open units found **no coverage failure at all** — every finding they filed was a drifted count, a
non-landing cite or a cross-document contradiction. · **Discharged by:** `scripts/strata-walkthrough.mjs`

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

---

## D-47 — The register admits two sources, and a measurement-sourced row says which it is

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the `strata-bootstrap` walkthrough, measured — the
register's own preamble said "a row with no user source is not a decision and belongs in `brief.md` as an
`ASM-n`", while six rows in the same file are sourced wholly by a measurement (D-28, D-41, D-43, D-44, D-45,
D-46) and every layer cites them as binding.

**Decision:** a row has one of two sources. A **user-sourced** row records intent. A **measurement-sourced**
row records what the corpus learned from its own error: it **cites the measurement**, it **may not change
what a user-sourced row decided**, and it binds exactly as a corrigendum does (D-15, D-25, D-33).

- The preamble's "belongs in `brief.md` as an `ASM-n`" governs an **assumption** — something a layer holds
  without a ruling. A rule derived from a measured failure is not an assumption, and the register is its home.
- A measurement-sourced row names its measurement in its `Source` line; one that cannot is an opinion, and an
  opinion is what D-1's provenance rule exists to keep out.

---

## D-48 — A walkthrough verdict is scoped to the unit it walks

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** four rounds of walking three units, measured — every
round's findings were single-sentence defects in the corpus at large, each unit's own scenario set was
answerable throughout, and the one class that genuinely blocked a unit was a unit **contradicting itself
inside its own layer** (the security-record layer saying the retired import reads "at most once per profile"
while its own `behaviour.md` says "again at the next boot").

**Decision:** a verdict answers two questions — can the scenarios be answered from the documentation, and does
**this unit's** documentation contradict the tree or itself. Contradictions found elsewhere are filed to their
owner and **do not block the verdict**.

- **Blocking:** a claim in the unit's own L1/L2/L3 documents or its record, or any corpus claim without which
  one of its scenarios cannot be answered.
- **Not blocking:** a stale sentence in another unit's document, a source comment in a file this unit does not
  claim, or a figure owned by `brief.md` §6 that has moved (D-26).
- **The report is never scoped, only the verdict**: every finding is recorded and routed in full, so a run
  that finds nothing outside its unit is reporting a fact about the corpus, not about its diligence.
- A unit may therefore close on its own evidence while corpus-wide findings remain owed elsewhere — which is
  what `close` means, and never a claim that the corpus is clean.

**Why this is not a lowered bar:** the bar it protects is "can a customer use this unit's documents". A
`central-data` claim in a file `strata-bootstrap` does not touch cannot make bootstrap's documentation
unusable, and paying a further round per unit to re-measure the same corpus is how four rounds became the
price of one close.

---

## D-49 — A corrigendum to D-34: the clause goes at the end of the block, never into a line

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-34**, which stands as filed (D-1). **Source:**
the `strata-bootstrap` walkthrough, measured — D-34 said a wholly discharged row "carries one added clause on
its Status line", and applying that literally spliced the clause into **eleven** rows mid-sentence, cutting a
user-sourced quotation in half wherever the Status line wrapped.

**Decision:** the clause goes at the **end** of the row's Status/Source block, after the source field has closed
— never inserted into a line, and never inside a quotation. D-34's rule is unchanged: the decision text does not
move, only that one clause is added.

- A row whose `Source` quotes the user must still read as a quotation end to end; the clause is provenance,
  and provenance that interrupts the words it attributes is worse than none.
- The eleven rows repaired here are evidence that the rule needed the placement stated, and this row states it
  rather than leaving "on its Status line" to be read as "wherever the line ends".

---

## D-50 — Corrigendum to D-35: what the pane carried when it was admitted

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-35**, which stands as filed (D-1). **Source:**
the `strata-bootstrap` walkthrough, run 8 — D-35 says "`src/renderer/secure-panels.ts` enumerates five group
names in `GROUPS` … so `data` is in `VALID_GROUPS` with no operator control", and the file that unit landed
now carries a six-entry label table with the roster projected from its keys.

**Decision:** D-35's description of the pane is **its own dated reading**, the defect as it stood when the
unit was admitted (D-26, D-41). What the unit landed is `docs/L1/secure-panels.md` §7 `E-1`'s to state, and
D-36, D-39 and D-42 corrected that row's *counts* without touching this sentence.

- A row that admits a unit by describing the defect inherits the defect's shelf life; a reader wanting the
  shape today takes it from the unit's own design, not from the row that chartered it.
- The alternative — rewriting D-35 — is what D-1 forbids, and D-23's precedent is that the tree moving earns
  a corrigendum rather than a silent edit.

---

## D-51 — A row that supersedes a policy re-grains the documents that instruct it

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the `central-data-management` walkthrough, run 6,
measured — two of its three findings were documents still **instructing** a policy that D-24 and D-31 had
superseded: an L1 exception still carried a behavioural fix shape D-24 rules out, and its re-grain sections
still told the test writer to move each row to a new figure, which D-31 replaced with a mark.

**Decision:** when a row supersedes a policy, the pass that files it also re-grains the **live documents that
instruct** that policy — not only the records that report it. A superseded instruction is worse than a stale
count: the count misleads a reader, the instruction gets executed.

- The distinction from D-43: D-43 stops a summary **restating** an owner's fact. This row stops a document
  **carrying out** a superseded rule, which no reader can catch unless they happen to know the later row.
- The check is cheap and mechanical: for each row superseded, grep the corpus for the policy's verbs
  ("re-grain", "move each row", "fix shape") and re-grain every live hit.
- Records are exempt as ever (D-46): a past pass's report keeps the policy it followed.

**Consequence:** this is the third rule in this pass that exists because a correction was applied where it was
found rather than where it was filed — D-41 (offsets), D-43 (restatements), and this one (instructions).

---

## D-52 — Corrigendum to D-5: a unit's record is not archived, it stays live

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-5**, which stands as filed (D-1). **Source:**
the `strata-bootstrap` walkthrough, run 9, measured — D-5 says a finding is "archived with that unit when it
closes (D-2)", and nothing has ever been archived with a unit: `archive/` holds the retired gate corpus and
nothing else, and every unit's record sits live in `strata/records/`, including three units closed on a PASS.

**Decision:** a unit's record **stays live in `strata/records/`**. There is no per-unit archive; `archive/` is
the retired gate corpus and its two bodies (D-2, `archive.md` §1), and archiving a unit's record would put it
where `archive.md` §2 says nothing may be treated as authority.

- The sentence was a promise, and promises are the one thing a corpus cannot carry: it appeared in D-5,
  `walkthrough.md` §6 and `examiner.md` §5, so four documents told a reader that closing a unit moves its
  record somewhere it has never gone.
- What survives is D-5's real obligation: the finding is recorded in the unit's own record, in the four-part
  shape, upstream-owned, never patched.

---

## D-53 — A row that locates code by text must read the code, not the prose

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** two independent collisions in one session, measured — the
isolation rows reddened on an honest comment in `src/main/storeroom.ts`, and six more rows reddened because a
comment in `src/main/main.ts` reproduced call spellings **above** the calls they name, so `indexOf` found the
comment and the comparison inverted.

**Decision:** where a test row finds a site by searching source text, it searches **code with comments
stripped** — and keeps string and template bodies verbatim, because a name inside a literal is a name a drive
could pass. A row that reads raw text is a row that punishes documentation.

- A comment cannot call a constructor, compose a path or satisfy an ordering constraint, so counting one is a
  false positive; equally, a comment that **paraphrases call syntax** can shadow the call below it, which is a
  false negative that inverts the assertion rather than failing it.
- The idiom already exists and is cited rather than re-invented: `stripComments()` in
  `tests/ui-leg-contract.test.ts`, an instrument row under D-38.
- A comment should describe a site in words rather than quote it — the cheap half of the same lesson, and what
  the `main.ts` order list now does.

---

## D-54 — Corrigendum to D-46: the residue it counted was the moving-file one

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-46**, which stands as filed (D-1). **Source:** the
`strata-bootstrap` walkthrough, run 10, measured — D-46 said "the residue is exactly two kinds: three rows in the
register and one historical returns envelope", and the tree carries **105** bare `src/**/*.ts:line` cites across
23 live documents, seven of them in the register itself.

**Decision:** D-46's count is the residue of **cites into files this branch edits** — the class D-41 governs —
and it never counted an offset into a file no unit has touched in this pass. A cite into `security.ts`'s
`ToolGroup` union or `types.ts`'s `SecuritySettings` is a dated reading of a file that has not moved, and D-41
itself leaves those alone.

- The distinction is the whole of D-41: an offset is a defect when the file moves under it, not when the corpus
  contains one.
- A reader counting "offsets" without that scope will find a hundred and conclude the rule failed; the rule
  never claimed them.

---

## D-55 — Corrigendum to D-3: the pointers carry the non-negotiables, which are floors and not rules

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-3**, which stands as filed (D-1). **Source:** the
`strata-bootstrap` walkthrough, run 13, measured — D-3 says "Neither carries a workflow rule", and `AGENTS.md`
states five: UI authority, envelope-green is never app-green, what gates is the boundary, the four-leg floor, and
that no layer judges its own design.

**Decision:** a **non-negotiable is a floor, not a rule**, and D-3's sentence bars the second, not the first. The
distinction is what each does when it fires: a *rule* tells a session the next step (a procedure owns that, and a
restated step drifts silently), while a *floor* says what may never be true whatever the step — and a session that
has not read the corpus still must not modify a package or judge its own design.

- Each non-negotiable cites its owning row, so the pointer states a bound and the corpus keeps the procedure.
- Where the two can be confused the row decides; that is the whole reason the floor is stated where a session
  loads it first.
- The alternative — moving the non-negotiables into the procedure files — would delete the only statements that
  survive a session which never opens `strata/`.

---

## D-56 — Corrigendum to D-54: the two examples it exempted are files this pass moved

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-54**, which stands as filed (D-1). **Source:** the
`strata-bootstrap` walkthrough, run 14, measured — D-54 exempted "a cite into `security.ts`'s `ToolGroup` union or
`types.ts`'s `SecuritySettings`" as a reading of a file that has not moved, and both moved in this very pass: the
census move added `'data'` to `ToolGroup` with five tool rows, and five members to `RpcMethod`.

**Decision:** D-54's **rule** stands and its **examples** do not. The test for D-41 is not whether a file *feels*
stable but whether **any unit in this pass has edited it** — and a count that a unit moved makes every offset below
it stale, in whichever file it lives.

- The two files D-54 named are exactly the kind of file the rule must catch: a union and a type table, small,
  central, and edited by every census move.
- A cite into them therefore names the site ("the `ToolGroup` union", "the `RpcMethod` union's `data.*` members"),
  and the exemption D-54 offered belongs to files no unit has touched at this head — not to the two most-edited
  ones in `src/shared` and `src/main`.

---

## D-57 — Corrigendum to D-49: the clause's home is its own block, never a quotation

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-49**, which stands as filed (D-1). **Source:** the
`strata-bootstrap` walkthrough, run 18, measured — D-49 says a `Discharged by:` clause goes "at the END of the
Status/Source block, after the source field has closed", and D-2, D-16 and D-23 each place it in the **Status**
block, before `**Source:**`.

**Decision:** the rule D-49 was filed for is **one clause in its own block, never spliced into a quotation and
never appended to a line of prose** — which is what went wrong when D-34 was applied literally and eleven rows got
it spliced mid-sentence. Its **placement relative to `Source`** is not part of the rule: the three rows that put it
after `Status` are compliant, because the clause is a block and a reader can find it.

- What may never recur is the splice: a clause inserted inside a quoted user sentence changes what the user said.
- What D-49 called "the end" is where the block happens to sit in most rows, not a position obligation; a
  corrigendum cannot impose one on rows already filed, and three of them demonstrate the rule is satisfied without.

---

## D-58 — A Source names the measurement, never a walkthrough run number

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-55, D-56 and D-57**, which stand as filed (D-1).
**Source:** the `strata-bootstrap` walkthrough, measured — three consecutive corrigenda cited "run 13", "run 14" and
"run 18" as what measured them, and `strata/records/<unit>-walkthrough.md` is **replaced on every run**
(`walkthrough.md` §6), so a run number in a row is unverifiable by construction: by the time a reader checks, the
record holds a later run.

**Decision:** a row sourced by a measurement names **the measurement** — "the walkthrough's finding that X", "the
`refs` check's reading", "the census the archive move took" — and never the ordinal of a run. D-47 already required
the measurement to be named; this row says what naming it means for a record that is replaced.

- D-55, D-56 and D-57 each named both — the finding and a run number — so their substance stands and only the ordinal
  is void. A reader checking them should look for the finding in the current record, which holds the latest run's
  verdict and no history.
- The same rule already governs `brief.md`: a live figure belongs to §6 and a record keeps a dated reading (D-26,
  D-46). A run number in a Source was the register committing the error it forbids elsewhere.

---

## D-59 — Corrigendum to D-29: what `stage` builds, as the procedure now declares it

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-29**, which stands as filed (D-1). **Source:** the
`strata-bootstrap` walkthrough, measured — D-29 enumerated what `stage` builds as "the corpus, the layers, the root
pointers, the manifest, …", and `walkthrough.md` §3 declares the **`src/`** those documents make claims about
(D-44) while naming the manifest as a separate row of its own output.

**Decision:** the enumeration follows the procedure, not the row: `stage` builds the corpus, the layers, **the
`src/` and `dist/` the layers claim about**, the root pointers, a tracked and an archived path listing, and an empty
work directory. The manifest is **not** a staged document — it is the instrument's own report of what it staged,
printed beside the root.

- The row's sentence and its subject are two different documents that moved apart: D-44 added `src/` to §3 and no
  pass re-grainned the row that enumerates it, which is D-51's class in the register itself.
- A row that enumerates another document's contents is the most fragile kind of restatement the corpus allows; it
  is tolerable only because the enumeration is short and the procedure is the owner.

---

## D-60 — A sweep removes only what no row asserts, and the worktree rows are not content rows

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction to sweep legacy code from the completed
modules, measured — nine unused imports and nine dead-looking exports were found, and removing them was tested rather
than assumed. Three are removable; six are **row subjects**, and every removal also reddened `I-12`, `F-9(b)`, `S-1`,
`P-7` and `REG-EXEC`, which read `git status` and not file content.

**Decision:** a sweep removes a name only when **no row asserts it** and the four legs agree; and a row that reads
`git status` is a worktree-discipline row, never evidence that a committed edit is forbidden.

- `themeWiringRole` has no importer and is the subject of `§5.1 row 12`'s source probe — removing it reddened 50 rows.
  `POINTER_TYPES`, `createProfileStore`, `applyThemeDeclaration`, `IPC_INVOKE`, `Tier4ClosedRefusal` and
  `Tier4WriteAnswer` are named by tests. All seven stay.
- `Tier4ClosedRefusal`/`Tier4WriteAnswer` in `main.ts` remain the owed item the unit records name: they are a **row
  subject** for another file, so removing them belongs to a unit that re-registers those rows, not to a sweep.
- The three removable names are `RenderedHtmlResult`, `ListTargetsResult` and `NodeStateResult`, imported by
  `src/main/mcp-server.ts` and referenced by nothing; they land under the `mcp-surface` row that already claims the
  file, so no new map claim is made (D-32).

---

## D-61 — Three open-work trackers, and a tracker entry dies when its work does

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction — "build tracker docs for next-steps,
pending, and speculative work, as separate files … for still-open work *only*, not a checklist of completed work.
When a feature is green and doc passes are complete, drop from trackers."

**Decision:** `strata/next-steps.md`, `strata/pending.md` and `strata/proposals.md` carry the open work, at **40 lines
each**, and a tracker lists **only what is still open**.

- **next-steps** — work that is actionable now, ordered, each row naming its owner and what would close it.
- **pending** — work that is real and agreed but **blocked**: on a decision, a unit admission, an upstream package,
  or the user. A pending row says what it waits on.
- **proposals** — speculative work nobody has asked for, kept so it is not re-derived; a proposal that is wanted
  moves to next-steps with a decision row, and one that is refused is deleted.

**A row leaves its tracker the moment its work lands** — a feature green with its doc passes complete is not open,
and a tracker that keeps it is a checklist of the past, which is the thing this row exists to prevent. The live
queue for *units* stays `strata/.strata/units/*.json` and this register (`archive.md` §2's rule, unchanged): a
tracker is a readable view of open work, never an authority for what a unit is doing.

---

## D-62 — Admit `store-tabs-record` as a unit, taking the tab record from `graph-store`'s row

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction, verbatim — "Create a unit/module for the
tab management `store-tabs-record`".

**Decision:** the **tab record** — the `file.tabs.*` row family, its exactly-one-active constraint and its repair —
becomes a unit of its own, and `graph-store`'s row stops carrying its batteries.

- **Why it is a split and not a new claim:** `graph-store` already claims `tests/store-tabs-record.*`, so a second row
  claiming them would be two units over one path (D-32). L1 moves the three tab battery paths and re-derives both
  rows; the source subtree (`src/renderer/store-core-graph.ts`) stays `graph-store`'s, because the tab record is a
  *row family the store hosts*, not a second store.
- **What the unit owns:** the three tab batteries, and the `§5.U` live battery that `strata/pending.md` has carried —
  that document is the first artifact this unit owes, and it is why the row was blocked.
- **What it does not own:** the store itself (`store-rederive`), the envelope that seeds the tabs
  (`app-envelope`), and the renderer wiring (`renderer-wiring`). A unit that reached into any of those would be
  claiming a sibling's artifact by another route.

---

## D-63 — The tab record crosses the bridge; no renderer-side instance

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction, verbatim — "Use bridge crossing".

**Decision:** the tab record's store lives **main-side on a `provident-storeroom` instance**, and the renderer reaches
it only through the bridge. No renderer-side instance, and the native addon stays out of a `nodeIntegration: false`
renderer (`src/main/main.ts`'s window options).

- **Its own instance, not the profile store's.** `provident-profile.json` is `central-data`'s and its surface is that
  unit's (`src/main/data/surface.ts`); a second unit over one path is what D-32 forbids. The tab record takes a
  **third** instance beside the profile store and the operator's, and its file is that instance's.
- **The bridge must carry it, and the five declared-but-unanswered `data.*` members are the precedent to weigh**: they
  are a renderer→main store crossing that was declared and never answered. Whether the tab record rides those members
  or adds its own is the crossing's design question — named here, not decided, because reusing them would put two
  units over one route.
- **The engines run where the instance does.** `TABS_CONSTRAINT` is a `GraphConstraint` the renderer evaluates today;
  under this decision the constraint, the repair and the listeners are the **instance's**, and the renderer becomes a
  client that renders what the store says. That is the state-machine-and-event-generator shape the rework intends.
- **It decouples the tabs from `src/renderer/store.ts`.** That store is renderer-side and stays unwired (ASM-7); it is
  no longer a prerequisite for this rework, and adopting it is a separate question with its own census cost.
- **The census moves.** A third instance, the bridge routes it adds and the twelve unwired mechanisms' count are the
  map's to re-derive, not this row's to state (D-26, D-39).

---

## D-64 — Corrigendum to D-63: the tab record rides the app's CENTRAL store instance

**Status:** ACTIVE · **Date:** 2026-10-30 · **Corrigendum to D-63**, which stands as filed (D-1). **Source:** the user's
instruction, verbatim — "Use the same central store instance".

**Decision:** the tab record lives in the **one central `provident-storeroom` instance** the app already has, at the
`['tabs']` addresses in `provident-profile.json`. It gets **no instance of its own**, and D-63's "its own instance, not the
profile store's, because a second unit over one path is what D-32 forbids" is **superseded**: D-32 governs two units
*claiming one path in the map*, not two surfaces reading one store — the record and the profile rows are different
addresses in one document, and the app keeps one store rather than three.

- **Written names return to two.** The third name this unit had begun creating at boot
  (`provident-tabs-record.json`) goes away with the third instance; `DECLARED_WRITTEN_JSON` in
  `tests/store-compliance-live.mjs` returns to the two it carried before.
- **The crossing is unchanged.** D-63's bridge decision stands in full — one member, three routes, the renderer a client,
  the engine's constraint and repair. What changes is only *whose* instance answers the routes.
- **What it costs, named rather than absorbed:** the central instance today is constructed **lazily**, on the first
  operation that needs one, and `central-data`'s `persistence.md` §2 pins that a profile which is only read creates
  nothing. Sharing the instance therefore moves **when** `provident-profile.json` is created — boot instead of first use —
  which is that unit's declared guarantee, so the change belongs to **`central-data`'s L2**, not to a unilateral edit here.
- **Until that lands**, this unit's instance remains the temporary second one and the third written name is the honest
  current reading; `strata/pending.md` carries the move.

---

## D-65 — The store is always needed at boot, and constraints are batched before it is constructed

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction, verbatim — "The store will always be needed
at boot. Boot order — first get the list of constraints and listeners from each module that imposes them, then initialize
the store with the batched constraints. The listeners will drive the rest of the data flow."

**Decision:** the app's central `provident-storeroom` instance is **constructed at boot, unconditionally**, and it is
constructed **once, with the constraints every module declares**, in this order:

1. **Collect.** Each module that imposes a constraint or needs a listener exports its **declaration** — a pair
   `{address, id, constraint}` for a constraint, and the listener's own declaration beside it. No module constructs a store.
2. **Construct once, batched.** Boot gathers those declarations into one `cfg.constraints` list and one listener list and
   creates the store with them. `guide §7.2` route one: the batch **arms** the functions at construction, and within one
   supplied list a repeated `id` is **rejected** — so the identifiers are a namespace the modules share, not private ones.
3. **Then boot proceeds.** The store stands, the constraint pass is armed, and **listeners drive the rest of the data
   flow** — a commit moves the record, a listener is told the address, and what reads the record re-reads it.

**What this settles:** D-64's blocker is **gone**. Sharing the central instance no longer moves a lazy construction into
boot, because boot is where it belongs: `central-data`'s "a profile that is only read creates nothing" is superseded by this
row — the store is needed at boot and its file is created there, by design.

**What it costs, named:** every module's constraint must be a **declaration** rather than a constructor call, the ids must
be unique across the whole app, and a module that wants a listener declares it instead of subscribing for itself.

---

## D-66 — The tab watch fires on a SUB-PROPERTY write, and the body reads the object

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source:** the user's instruction, verbatim — "The tab watch should trigger
when a sub-property is written, because that changes the object read from tabs", and "watch tabs, read the tab object
within the constraint, and then file the repair using that information".

**Decision:** a constraint pair at `['tabs']` is triggered by a write to **any sub-property under it** — `['tabs','order']`,
`['tabs', <id>]` — because such a write **changes the object the pair reads at its own address**. The body's job is then
exactly three acts: **watch `tabs`**, **read the tab object** (the record as the store serves it), and **file the repair from
that reading**.

- **The record may therefore stay split across the addresses the module writes** — an `order` seat and one leaf per tab —
  without the pair needing a per-leaf arrangement. What the pair reads is the whole object, and what changes it is the write.
- **`exactly-one-active` is expressible this way and could not be expressed otherwise**: it is a fact about the whole set, so
  it needs the whole object, which is what the pair's own address gives it.
- **Consequence for this module's implementation**: a split layout is legitimate, and the failure measured tonight — every
  `commit` answering `refused` — is therefore a **defect in this module's constraint/repair convergence**, not evidence that
  the layout is wrong. The repair must leave a record the very next evaluation passes; tonight's does not.

## D-67 — A repair NAMES the commit it was handed; the open-attempt hold is not a ban on the address

**Status:** ACTIVE · **Date:** 2026-11-01 · **Source:** the user's correction, verbatim — "Clarification: the ban on
writes at an open attempt by a repair function".

**Decision:** `KC-7` — *"a constraint attempt is already open at `tabs`; it is disposed of by its own K-3 and by no other
act"* — is a ban on a **second `K-2` at the held address**, never a ban on that address. A repair is handed
`{address, id, op, tier, value, pending}`, whose `pending` is the commit's own member (`surface.md §2.11` clause 6: the
repair *"should be using the package surface functions … so that they can make their own write call use that commit"*);
passing that context at `write`'s **fourth position** makes the repair's write **join** the open attempt, so it meets no
hold and lands inside the same commit. A repair therefore writes wherever its correction belongs — including the attempt's
own address — and returns **the op its write landed**, `{ok: true, op: receipt.op}`.

- **Both halves are measured, not read** (2026-11-01, the installed `provident-storeroom@1.6.1`). Writing `['tabs']`
  inside a pass opened at `['tabs']` **without** the commit was refused with that sentence and an empty `log`; the same
  write **with** it answered `{op: {opId: 'op-2', seq: 2}}` and the pass re-ran green.
- **The correction this row makes is mine, not the package's.** An earlier pass concluded from that refusal that terminal
  acts must land on a descendant so the record root stayed free for the repair, and built two-step acts around it. That
  conclusion was wrong, and the two-step acts are withdrawn: one whole record per act, terminal or repair.
- **The `{ok: true, op}` return is not a preference either**: the kernel credits a repair only through `landedOp`, and a
  `void` return carries "no op" (`KC-4`). That contract is documented nowhere a consumer can read it — filed upstream as
  `ST-F2` (`strata/records/store-tabs-record-unit.md` §1), which is why this row states it here as well.
- **A repair should leave ONE legal record.** A repair correcting only its own field hands the re-run a record that still
  violates the others, and each repair nests another until the restart budget (`RESTART_LIMIT` 3) is spent. The GATE
  stays one pair per invariant — the refusal's sentence must name the field — while every repair heals the whole record.

---

## D-68 — `provident-storeroom` moves to 1.6.2, and the repair's return contract reaches the artifacts it ships

**Status:** ACTIVE · **Date:** 2026-11-01 · **Source:** measurement — the published `1.6.2` installed and read at its own bytes
this date (its `RELEASE-NOTES.md` §1.6.2, `README.guide.md` §7.6 and §7.2's clause stamped 2026-11-02, `index.d.ts`'s
`Constraint` docblock), plus a drive of the guide's own example through the published entry.

**Decision:** the consumed package is **`provident-storeroom ^1.6.2`**, up from `^1.6.1`, and every in-repo pin of the
reviewed version moves with it — `package.json` and `package-lock.json`, `tests/storeroom-surface.test.ts`'s `S-1.3`,
`brief.md` §2's pinned row, and the census header in `src/main/storeroom.ts`.

- **The caret already admitted it and the pin moved anyway**: `^1.6.1` resolved to `1.6.2` the day it published, so nothing
  here needed a repo change to receive it — the pin is a **reviewed** pin (D-41's site), not a resolution floor.
- **The eleven cells moved together, none left behind**: the manifest's `version`, its five exact `optionalDependencies`
  pins and the five `platforms/*/package.json` versions all read `1.6.2`, and the lock carries all six at `1.6.2`.
- **What a consumer sees change**, each an item of the package's own `RELEASE-NOTES.md` §1.6.2 change list: a pair whose
  PARENT does not resolve is **skipped, not asked**; a pair whose parent resolves is applied **even where the parent holds a
  leaf**; `ConstraintListInvalid` answers the **malformed list alone**; a repair at a **registration instant can write**
  through a `write` on its own record, taking the store write's first three positions and **no fourth**; the re-run after a
  repair **always runs**; `value` on a registration record is read **once**; a `rollback`'s judgement reads the same rule.
  **The one member added is not on the store** — `write` rides the repair's record at that instant — so the store's own census
  reads **14, unmoved**.
- **Two costs the release declares rather than leaving to bug reports**: a pair at a deep address no longer guards its
  ANCESTOR's removal (to guard a container, register AT the container), and a construction refused for a well-formed pair with an absent parent now stands.
- **What 1.6.2 discharges for this repo is a citation, not a behaviour.** The app's four tab-record pairs stand at `['tabs']`,
  whose parent is the register and always resolves, and their repairs already name the commit at `write`'s fourth position
  and answer `{ok: true, op}` — so none of the seven arms moves them, and the suite is unmoved at `3,247` tests.
- **The repair's `{ok: true, op}` return contract is now documented in the shipped artifacts**: `README.guide.md` §7.6 declares the
  closed two-arm set with a worked example and §7.2's 2026-11-02 clause declares the registration instant's write route, and
  `index.d.ts`'s `Constraint` docblock declares both — so **D-67's *"documented nowhere a consumer can read it"* is read through this row.**
- **So is the "name the commit at `write`'s fourth position" rule** — the guide's example carries it at its own line and the
  docblock at its own — so D-67's practice is no longer folklore this repo alone holds.
- **What 1.6.2 does NOT deliver, said so it is not read as done:** `Constraint` is **still** `(context: unknown) => unknown`,
  so the return is prose in a docblock and not a type a consumer can annotate; and the `produced no op` sentence **still names
  the attempt's address**, the release naming that a recorded defect row with *"no successor queued"*.
- **Both halves are measured, not read** (2026-11-01, the installed `1.6.2`): the guide's §7.6 block driven on its own bytes
  answers `{"opId":"op-3","address":["b"]}` with `read(['a'])` `2`, while the same body returning `undefined` is refused
  `the repair two-goes-elsewhere produced no op at a` and its own write stands at `b` — `ST-F1` discharged at its evidence,
  `ST-F2` narrowed to what is still owed (`records/store-tabs-record-unit.md` §1, `pending.md`).

---

## D-69 — `['tabs']`'s existence is an ENFORCED INVARIANT, and the repair that creates it has two routes

**Status:** ACTIVE · **Date:** 2026-11-01 · **Source:** the user's instruction, verbatim — "`provident-storeroom` was just
upgraded to 1.6.2, which adds explicit support for enforcing the existence of a top-level address by constraint. The record
root `['tabs']` is currently created only as a side effect of the first `commit`, so between boot and the first commit the
record does not exist at all and `read()` answers an empty record with no `landing` seat"; plus the measurements below.

**Decision:** a **fifth declaration** rides this module's batch — id `tabs-must-stand`, address `['tabs']` — whose body
refuses when the address holds nothing and whose repair CREATES the record. The created record is the one the invariant
already demands of an empty one: the landing page, seated and active, with all three field defaults filled (the row
`healRecord`'s `order.length === 0` branch mints, now named `landingRow` and shared by both). **So `['tabs']` is an enforced
invariant of the instance and no longer a side effect of the first commit.** The id is exported beside `TABS_CONSTRAINT_ID`.

- **The body judges `context.value` and needs no store handle.** A pair whose own key is ABSENT is APPLIED where its parent
  resolves, and `['tabs']`'s parent is the register, which always resolves — so the pair is asked over an empty store at
  construction. The existing wrapper answers `true` when its getter returns null, and at that instant the boot has bound no
  handle yet, so **this body alone does not go through the wrapper**: a registration's `value` is the current value read at
  the address and `undefined` where nothing is held, which is all absence needs. The other four keep the wrapper unchanged.
- **The registration instant's write route takes THREE positions and cannot name a commit; the landing instant's takes FOUR
  and must.** A repair at a registration instant is handed a record carrying a `write` member (`write(address, tier, value)`)
  — the commit there is the registration's own, and a supplied fourth position is a `TypeError` thrown before any store act.
  At a landing instant the record is the six-member one with no `write`, and `pending` must be named at `write`'s fourth
  position or the write is refused `KC-7` (D-67). **The two are different instants' own contracts, so one repair helper
  branches on the record's own `write` member** and answers through `repairAnswer` in both arms.
- **The write runs no pass of its own**: the pair is judged by the registration's own re-run over the op the repair
  returned, so the body is asked twice — absent, then over the created record, where it answers `true`.
- **Consequence, carried rather than absorbed: a fresh record carries the landing tab.** `read()` on a never-committed
  record answers `order: ['tabs-landing-page']` with that entry active where it once answered `[]` with no landing seat, and
  the first commit APPENDS to the record instead of creating the root. Nothing in the module depended on the old emptiness.
- **Measured, 2026-11-01, over a scratch `filePath` with the batch supplied:** before the declaration, `read()` at
  construction answers `{"status":"committed","order":[],"landing":"","rows":[]}` and the store's own `read(['tabs'])`
  refuses `AddressNotFound`; with it, the root stands holding the landing page with `landing: 'tabs-landing-page'` before
  any module verb is called, and the first `commit` answers `order: ['tabs-landing-page','tab-1']` with `tab-1` active.
  **The record is the instance's, not the file's, at that instant**: the profile file stays at 0 bytes until the first
  write's terminal act materialises it, so a fresh profile's written-name census is UNMOVED and `DECLARED_WRITTEN_JSON`
  still holds at its two names.

---

## D-70 — The change push is REGISTERED, `repaired` is DERIVED, and `cursor` is deleted as a member that named nothing

**Status:** ACTIVE · **Date:** 2026-11-01 · **Source:** the user's instruction, verbatim — *"every committed change to the
record delivers exactly one notification"*, and *"`cursor` … is a member that names nothing in the package that would ever
supply it"* — plus the measurements below, driven over the installed `provident-storeroom@1.6.2`.

**Decision:** three corrections to the crossing, each measured before it was written, and the third a contract deletion.

- **A LISTENER CANNOT BE INSTALLED WHERE A CONSTRAINT'S `id` STANDS**, so the record's change delivery installs at a
  DESCENDANT address and REGISTERS a body. `subscribe` asked for `['tabs']` — where all five of this module's pairs stand —
  and the package refused it `AddressMalformed`: *"… the constraint 'tabs-must-stand' stands there, and a listener and a
  constraint do not share one"*. It installs at `['tabs','order']`, lawful because a trigger is decided by `PREFIX` **or**
  by `TOUCHED` and the one whole value every act writes carries its `order` seat; and the registration is the package's TWO
  acts — `listen(handle, addresses)`, then `register(handle, listener)`.
- **`subscribe` HAD INSTALLED NOTHING AND INVOKED NOTHING, so the push existed in name only.** It passed `handler` to
  nothing — the parameter's only two occurrences in the file were its declaration and itself — and the `catch` around the
  refused `listen` answered a withdrawal that withdrew nothing, so every `commit` and `remove` answered `committed` while no
  subscriber heard one. The battery's counter reads `0` on the revert and `1` per committed change now.
- **`repaired` IS DERIVED FROM THE STORE AND NEVER PREDICTED, AND `cursor` IS DELETED.** A repair-running commit answered
  `{"status":"committed"}` — keys `["status"]` — though the interface declares `repaired` and `design.md` §4 promises it: the
  write's own record carries no member for a repair inside its own commit. So the act holds the record it INTENDED, writes
  it, and compares it with the record that STANDS — CANONICALLY, member order and absence normalised, because a raw
  `JSON.stringify` differs on every clean act — answering `repaired: true` only where they differ and OMITTING the member on
  a clean act. `remove` derives it the same way. **`cursor` was read off the store's write receipt, whose shape is
  `{op, watched, triggered}`; the package declares no such member, so the name had no source at all.**
- **`cursor`'s removal is a CONTRACT DELETION, not a design change**: no route, address or census moves, and the member is
  gone from `TabsRecordAnswer`, from L2 §2's two answer rows, and from the bridge's `commit`/`remove` declarations in
  lockstep (`preload.ts`, `secure-panels.ts`). `'constraint-repaired'` — a reason token no code produced — goes with it.
- **Two more measured facts ride in the same fix.** The handle is MINTED PER SUBSCRIPTION: one spelled name made `register`
  replace the earlier function and `unlisten` withdraw it WHOLE (measured `{first: 0, second: 1}`, unchanged after the first
  withdrawal). And the body CONTAINS the caller's throw: a listener's throw crosses into the write that fired it, and an
  uncontained subscriber turned a landed commit into `{"status":"refused","message":"boom-in-subscriber"}`. The body WRITES
  NOTHING — the renderer re-reads.
- **Measured, 2026-11-01, over a scratch `filePath` with the batch supplied:** a listener at `['tabs','order']` fires once
  for a commit of a NEW tab, once for a commit that only UPDATES a label, once for a `remove`, and once for the root
  `delete` whose `tabs-must-stand` repair re-creates the record inside that same commit; it fires ZERO times for a `mem`
  write at `['elsewhere']`. **The construction instant is the one arm no listener can hear** — the instance that holds the
  registry is the one being constructed — measured with a handle adopted by `cfg.listeners`, which delivered nothing there
  and delivered on the next commit.
- **A `listen` WITH NO `register` IS A LAWFUL RESERVATION AND HOLDS NOTHING AGAINST A PAIR — ONLY A LIVE LISTENER DOES**: the entry `listen` writes stands in the write's `triggered` list and fires nothing, and it carries no kind — the package's own record calls it *"a reservation, `off: true`, no function"* — so only a LIVE listener blocks a pair's `id`, one whose `off` is cleared and a function installed and whose kind is no constraint's (the package's own `D-24`/`D-25`, whose subject is a live listener). **Measured 2026-11-01 over the packaged `1.7.0`**, one fresh instance per arm: `listen('dup', [['q']])` with no `register`, then `addConstraint({address: ['q'], id: 'dup'})`, **ANSWERED**; the same with `register` before the add **THREW** `AddressMalformed` — *"the listener 'dup' keeps that handle, and a listener and a constraint do not share one handle"* — and threw where the live listener stood at `['x']` and the pair at `['q']`, so the arm reads the HANDLE and not the address; and a listener claiming a carried pair's `id` threw at `listen` and again at `register`. **THE LESSON, because a drive that never called `register` reported the rule as one-directional to the user: measure a REGISTERED listener, never a bare `listen` — a reservation is silent, and this `subscribe` is built on that silence, registering at once and withdrawing the entry where `register` fails.**

---

## D-71 — `provident-storeroom` moves to `1.7.0`: the cross-kind rule reads the HANDLE alone, and the change push returns to `['tabs']`

**Status:** ACTIVE · **Date:** 2026-11-01 · **Source:** the user's instruction this pass carries — the published `1.7.0`
removes the rule this app worked around, so the workaround goes — plus the measurements below, driven on the published
artefact (`latest`, tagged `v1.7.0`) at its own bytes.

**Decision:** the consumed package is **`provident-storeroom ^1.7.0`**, up from `^1.6.2`, and the tab record's change push
installs at the record's OWN address, `['tabs']`, beside all five of its constraint pairs.

- **The eleven cells moved together, none left behind**: the manifest's `version`, its five exact `optionalDependencies`
  pins and the five `platforms/*/package.json` versions all read `1.7.0`, and the lock carries all six nodes at `1.7.0` with
  their own `resolved` and `integrity`; the three generated doc version lines read `1.7.0` at their own lines.
- **The package lifted the ADDRESS exclusion and kept only the HANDLE** (its §7.3 clause of 2026-11-01, and its own
  cross-kind register): a constraint pair and a listener MAY stand at one address — the pair ASKED by the pass, the
  listener DELIVERED after it; multiple pairs at one address, and multiple listeners, are lawful; and the ONE cross-kind
  restriction is that a listener's handle must not equal a pair's `id`, refused `AddressMalformed` at
  `listen`/`register`/`addConstraint`, in both directions. **An application that moved a subscription off a constrained
  address to work around a refusal may reclaim it**, and this module does.
- **So the `['tabs','order']` installation is withdrawn, and it was always a workaround**: measured 2026-11-01 on the
  then-installed `1.6.2`, `listen` at `['tabs']` threw *"a listener and a constraint do not share one"*. That reading stays
  as that tree's own; the address is named by no rule `1.7.0` keeps.
- **The handles cannot collide, and that is a property of the SPELLING**: this module mints `tabs-record:<n>@tabs` — a fixed
  prefix no constraint id carries, a minted ordinal, and the address — while its five ids are `tabs-must-stand`,
  `exactly-one-active`, `tab-has-title`, `tab-has-content` and `tab-has-lastActiveAt`, every one a literal. A table of
  literals cannot spell the minted part.
- **The fact that made the PREVIOUS pass's upstream report wrong, and the rule this row sets: measure a REGISTERED
  listener, never a bare `listen`.** An entry `listen` writes and `register` never fills is a lawful, SILENT reservation —
  the package's own record calls it *"a reservation, `off: true`, no function"* — so it holds nothing against a pair's `id`
  and the cross-kind refusal does not fire for it; only a LIVE listener does, and a drive that never called `register`
  reported the rule as one-directional. This `subscribe` registers at once and withdraws the entry where `register` fails.
- **Measured 2026-11-01 on the published `1.7.0`, one fresh instance per arm:** all five of this module's pairs at
  `['tabs']` plus a live listener there with a distinct handle — **accepted**; one whole-record write answered `triggered`
  naming the five ids AND the listener, each at `['tabs']`, and fired it **once**; a write a pair REFUSED threw the pass's
  own form and delivered **nothing**. **The store's census is unmoved** — `Object.getOwnPropertyNames(store)` still reads
  the declared **14** members and **11** own symbols.
- **What moves in the artifacts, and nothing else**: `src/main/tabs-record/index.ts`'s `LISTENER_ADDRESS` goes and the
  record root is reused rather than re-spelled; `design.md` §5 (rev 8) and `interface.md` §2 (rev 3) are rewritten for the
  new pattern; and the live pins move — `package.json`, `storeroom-surface.test.ts`'s `S-1.3`, `brief.md` §2's row and
  `src/main/storeroom.ts`'s census header. **The dated readings do not move**: what `1.6.1` and `1.6.2` were measured to do
  stays written as that tree's own, and `signatures.md`'s staleness stays next-steps' row 2.

---

## D-72 — A repair RETURNS its credited arm explicitly; the module's own types make a `void` repair a compile error

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's instruction this pass carries, verbatim — "Stop writing
undefined-return repairs. A repair must return its credited arm explicitly — `{ ok: true, op }` — and never `undefined`,
never `void`, and never a bare `{ ok: true }`" — plus the measurements below, on the installed `provident-storeroom 1.7.0`.

**Decision:** every repair in this app returns **its credited arm explicitly**, `{ok: true, op}` — `op` being what the write
it made landed — and the only other lawful return is the declared failed arm `{ok: false, message}`. **`undefined`, `void`
and a bare `{ok: true}` are not written here, on any version of the package**, and `repairAnswer` is the credited arm's one
constructor.

- **Why, and it is a measurement rather than a preference**: `undefined` is the exact shape `ST-F2` was filed on — a repair
  at `['a']` that wrote its correction at `['b']` and returned nothing was refused `KC-4` with *"the repair … produced no op
  at a"*, a sentence naming the CALLER's address while the repair's write stood at its own (`records/store-tabs-record-unit.md`
  §1; `D-67`'s third bullet). **Re-measured 2026-11-02 on this module**: with `healRecord` returning nothing, a plain
  `commit` answered `{"status":"refused","reason":"ConstraintPassRefused","message":"the repair exactly-one-active produced
  no op at tabs"}` and fifteen rows of the crossing battery red — the return is load-bearing, never decorative.
- **`1.9.0` makes an op-less repair CREDITED, and this project does not take that licence.** That release credits a repair by
  the legs its own write wrote rather than by the value it returned, and widens its declared repair return to accept `void`.
  **That is a decision about the package's kernel, not a rule adopted here**: the explicit return states the intent, stays
  correct on ANY installed version, and spares the next reader from working out which release credits what. On the installed
  `1.7.0` a `void` return is still refused, so today the package enforces this too — **the point is that it must stay enforced
  by US after a bump**, which the next two bullets make true.
- **So the rule is STRUCTURAL, not conventional** — a type, not a habit a reviewer must hold. `TabsRepairAnswer` is the union
  of the two arms, `TabsRepair` is `(context: unknown) => TabsRepairAnswer`, `TabsConstraintAnswer` is `true | {message,
  repair} | {message, repair?: never}`, and the five declarations are `readonly TabsConstraintDeclaration[]`, **so a repair or
  a body that returns nothing is a COMPILE ERROR in this repo** (`npm run typecheck`). Every site satisfies them with NO cast;
  the one cast near a repair — `context as never` at `write`'s fourth position — is the package's commit parameter.
- **A type-level row pins it where a revert reds it** (`tests/integration/store-tabs-record/crossing.test.ts`, compiled by
  `npm run typecheck:tests`): three `@ts-expect-error` assertions, one per forbidden shape. **Measured 2026-11-02: widen the
  credited arm to `| void` → `TS2578` *"Unused '@ts-expect-error' directive"* twice, the runtime row's reads of `ok` and `op`
  red with it; restore → clean.** That runtime row reads the answer the ENGINE receives — a wrapped `repair` on the
  declaration, recording `{ok: true, op}` with a non-empty `opId` — the module exposing no other route to a repair's return.
- **The package's own `RepairOutcome` now includes `void`, and that is precisely why it is not used here**: a repair typed by
  the release's union would admit exactly what this row forbids, and at `1.7.0` the package's `Constraint` is still
  `(context: unknown) => unknown` — prose in a docblock, never a type. The module's types are LOCAL and EXPORTED, so the boot
  and any later renderer work annotate against the same rule rather than against a release's licence.

---

## D-73 — A repair write NAMES the commit, and the module makes an unnamed one a compile error

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's instruction this pass carries, verbatim — *"Repairs that do not
pass the commit are unsupported. Do not write them. A write it makes must join that attempt, and the only way to join is to name
the commit the repair was handed"* — plus the audit and the measurements below, on the installed `provident-storeroom 1.7.0`.

**Decision:** every write a repair makes **NAMES THE COMMIT IT WAS HANDED** — at a **landing instant** the commit's record at
`write`'s **FOURTH** position, at a **registration instant** the `write` MEMBER the registration's repair record carries,
**three positions and no fourth** (a fourth there is a `TypeError` before any store act). **A repair write that names neither is
not written here**: it opens a second commit at an address that already holds one, and the machinery refuses it `KC-7` or credits
it against the wrong op (`D-67`).

- **Why, in the package's own framing**: a constraint body's direct write is **declared unsupported** while the capability stays —
  *"any changes should be handled by a repair"* — and a repair's own write is the supported route **because it rides the commit it
  is part of** (`guide §7.6`; its `§7.2` clause of 2026-11-02, item (4), is the registration route's).
- **The audit found no unnamed repair write, and says so plainly** (2026-11-02, `grep -rn "\.write(\|\.delete(\|\.rollback("
  src/ --include='*.ts'`): on a store handle, **seven** `.write(` calls, one `.delete(` and no `rollback` — `commit` and `remove`
  in `createTabsRecord` (TERMINAL acts: no attempt is open, so naming a commit is neither possible nor required), four terminal
  acts in `operator-settings` and `data/surface`, and the tab record's repairs, which already named the commit as
  `context as never`. Every other `.write(`/`.delete(` in `src/` is a `Map`/`Set` or a surface's own member. **The defect closed is
  LATENT**: `never` tells the compiler nothing, so `mintRecord`'s second cast sat one refactor from naming nothing.
- **And it is STRUCTURAL, which is the whole of this change.** `TabsCommitCarrier` is EXPORTED — one member
  `readonly pending: readonly TriggerPair[]`, taken from the position's own class test (a non-null, non-`Proxy`, non-array object
  carrying an OWN, present, non-`undefined` `pending`: `1.7.0`'s `commitPositionRefusal`, mirrored by `isCommitCarrier` at run
  time). `writeJoined(store, commit, value)` is the module's **ONE** repair write with its carrier position **REQUIRED**, both
  repair bodies go through it, and the registration arm keeps its three positions because it is passed the ROUTE the record lends
  — a different handle from the store, so the helper is not applicable to it. A repair write with no commit is an ARITY ERROR.
- **One cast survives in the repair path, only at the package boundary.** The installed `1.7.0` declares
  `write(address, tier, value, commit?: CommitRecord)` with **FOUR** members, while a landing repair's record is the six-member
  `{address, id, op, tier, value, pending}` with no `attempt` — it satisfies the class test and not the declaration.
  `commit as CommitRecord` is that seam, commented at `writeJoined` with what removes it: a release declaring
  `commit?: CommitCarrier`, one member `readonly pending: readonly TriggerPair[]` — the shape the release after `1.7.0` declares,
  which the carrier already IS. **This supersedes `D-72`'s clause counting `context as never` as "the package's commit
  parameter"**: `never` was a type lie, and the honest carrier replaced it.
  **⟶ SUPERSEDED IN PART, 2026-11-02: `1.9.0` IS THAT RELEASE, AND THE CAST IS GONE.** The installed
  `provident-storeroom 1.9.0` declares `write(address: Address, tier: Tier, value: unknown, commit?: CommitCarrier): WriteRecord`
  beside `export interface CommitCarrier { readonly pending: readonly TriggerPair[] }` — one member, the exact shape
  `TabsCommitCarrier` already carried — so the carrier is assignable with **no assertion**: `writeJoined` now reads
  `store.write(TABS_RECORD_ADDRESS, 'file', value, commit)`, the `CommitRecord` type import is gone from
  `src/main/tabs-record/index.ts`, and `npm run typecheck` is clean without it. **Everything else in this bullet stands
  unchanged** — the carrier position is still REQUIRED, `writeJoined` is still the module's ONE repair write, both repair bodies
  still go through it, and the registration arm still cannot reach it. Measured the same day, end to end: a live
  `exactly-one-active` repair writes the whole corrected record at the fourth position through the uncast carrier, answers
  `{ok: true, op}`, throws nothing, leaves the corrected record standing, and fires its listener once.
- **A type-level row pins it where a widening reds it** (`tests/integration/store-tabs-record/crossing.test.ts`, compiled by
  `npm run typecheck:tests`): three `@ts-expect-error` rows over `writeJoined` — carrier omitted, an array, `null` — beside a
  positive control, plus a run-time row pinning the class test case for case. **Measured 2026-11-02: `commit:
  TabsCommitCarrier | undefined` → `TS2578` *"Unused '@ts-expect-error' directive"* at the omission row while
  `npm run typecheck` over `src/**` stayed GREEN, so the catching leg is `typecheck:tests`; `commit: unknown` → three `TS2578`;
  restore → both clean.** The JOIN stays measured by the repair-answer row's credited op, the delivery row's ONE notification.

---

## D-74 — A boot battery's teardown SIGKILLs a boot's whole process TREE and PROVES zero; a bounded wait re-acquires only ABSENCE

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's instruction this pass carries — *"after `npm test` completes, no
process naming this repository survives … treat SIGTERM as a courtesy and SIGKILL as the guarantee … verify zero and fail the
teardown loudly if anything survives"* — plus the measurements below, on this head and this checkout.

**Decision:** the boot battery's teardown **kills with SIGKILL, walks the process TREE (profile OR descent from a spawned root),
repeats until a sweep finds nothing, and VERIFIES ZERO — failing loudly with every survivor listed.** SIGTERM is never load-bearing.
And a bounded artifact wait **re-acquires only the ABSENCE class**: a content fault always reds the row.

- **SIGKILL, because SIGTERM was measured not to work**: the reported survivor ignored SIGTERM for three seconds and needed SIGKILL. The
  MCP SDK's `StdioClientTransport.close()` keeps its own `stdin.end()` → SIGTERM → SIGKILL ladder — a courtesy that lets a clean app
  exit cleanly, reaching the MAIN process only — so the tree reap runs after it and is what guarantees the outcome.
- **A TREE, because the cmdline cannot name the tree**: a live boot here is five processes and only three carry the scratch profile —
  both `--type=zygote` children carry `--no-sandbox` and nothing else, and they were reaped by INHERITANCE, exactly the guarantee that
  is gone when the parent is the survivor. Membership is the profile set UNION the descendants of every spawned root.
- **NOT a process group**, a measurement rather than a preference: `detached: true` plus a negative-pid kill was tried in this repo and
  regressed the SDK stdio transport the handshake rows drive (`MCP error -32001`, `1 checks, 2 failures` —
  `scripts/electron-spawn.mjs`'s own account). The tree is reaped, never grouped.
- **`/proc`, because the old reaper's only failure path was silence**: `catch { return }` around a `ps` pipeline meant one unreadable
  listing left the tree alive with the caller unable to tell "reaped" from "not reaped". `/proc` needs no external binary, nothing on
  PATH can shadow it, and an unreadable table THROWS; `ps` stays only as the fallback for a host without it, buffer sized for a busy
  machine (measured here: 79-90 KB, so a 1 MB default would not have overflowed — the *response to any* failure was the defect).
- **Zero is PROVEN, and a survivor is a verdict.** `afterAll` reaps, removes the profiles only after the zero, and throws naming every
  survivor. Measured with the sweeps disabled and one process left naming a profile: the file fails with `4 process(es) SURVIVED …
  pid … (ppid …) …` while all eight rows pass — a leak is now a red file, not a directory someone finds later. `process.on('exit')`
  is the net for the teardown that never runs (a killed worker, a rejected `beforeAll`), as `scripts/electron-spawn.mjs` does.
- **And the waits, the same defect in another shape**: a bound that answers alone cannot tell "never happened" from "too slow". The
  boot wait reads the child's `error` and `close` too, so a dead child reds AT ONCE naming its exit — measured: a bundle that exits
  silently reds in 1.5 s with `EXITED (code 3, signal null) … "never", not "too slow"`, one that hangs silently reds at the bound with
  `still ALIVE (pid …) … "too slow", not "never"`. The 60 s bound is kept, with its margin stated: the control's observable arrives at
  p95 83 ms over 15 boots: a ~720x margin.
- **The artifact read re-acquires ABSENCE and nothing else, and every read of a co-owned artifact is BOUNDED** — `A-1`..`A-4` and,
  once measured, the GATING `B-1`, which carried the same defect with no bound at all and red with `existsSync` false in 1 of 5 full
  runs having built the artifact itself, because the sibling worker's `clean` landed after it. Reproduced before the fix: driving a
  concurrent `npm run build` at `A-4` red it **2 of 4 runs** at a +250 ms offset with `MODULE_NOT_FOUND` at its `--check`; after,
  0 of 16 across four offsets and 4 of 4 under a continuous build loop. **The bite is kept and measured**: a preload that parses but
  never reaches `contextBridge` still reds `A-4`, an artifact carrying `var import_meta = {}` reds `A-2`..`A-4`, and a stable
  unparseable one reds in 0.47 s with node's own SyntaxError — a row that retried a content fault could not fail, which is worth less
  than no row (the boundary rows are why these batteries exist, `D-27`).

---

## D-75 — The landing entry's id is `'landing'`, and this record cannot SPELL it yet: `landing` is one of its two SEATS

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's two decisions this pass carries, verbatim — *"The landing entry
id is `'landing'`. The renderer's spelling wins; the crossing adopts it."* and *"There is no migration. No install holds tabs in the
operator-settings carrier, so the old rows are dropped rather than migrated. Do not build a boot migration."* — plus the measurements below, 2026-11-02.

**Decision:** both user decisions stand as taken, and the id they name is **not yet spelled by the record**: `'landing'` is the
landing ENTRY's id, while `TABS_LANDING_ID` still reads `'tabs-landing-page'`, because the record's own family already spends that
name on a different thing. **So the alignment is held rather than half-landed, and the reason is measured rather than argued.**

- **THREE THINGS SHARE THESE LETTERS, ONLY THE FIRST IS THE ENTRY, AND THERE IS A FOURTH.** The **entry id** is `'landing'` by the
  decision above — what `order` seats and what the minted row's `id` and `label` carry. The **authored page node** `'tabs-landing-page'`
  does NOT move: `src/shared/demo-envelope.ts`'s `TABS_LANDING_PAGE_ID` is the node a client resolves through
  `Runtime.elementForNodeId`. The **content target** stays `'tabs-landing-page'` too (`TAB_CONTENT_FALLBACK`), because a row's
  `target` is the content it CONTAINS while its `id` is its IDENTITY, and `'landing'` names no authored node — a blank target
  repaired to it would mint the unresolvable-target terminal the error page exists to show. **The fourth spelling is the `landing`
  SEAT** (`['tabs','landing']`, L1 §1's second singleton, L2 §1's table), and it is the one that keeps the other three from mattering.
- **WHY THE ENTRY CANNOT MOVE YET — MEASURED**, scratch profile with the five declarations batched, one fresh instance per arm. The
  family keys one member per tab in the SAME flat object as its seats, so `composeRecord` writes the row at `landing` and then the seat
  string over it: the construction write's own bytes read `{"landing":"landing","order":["landing"]}`, `read()` answers
  `order: ['landing']` with `rows: []`, and the first `commit({id:'landing',…})` is refused `ConstraintPassRefused` — *"the pair
  tabs#exactly-one-active violated a re-run and its repair had already been applied"*. **A healthy record is worse**: the same commit
  answers `{status:'committed'}` and writes `{"landing":"landing","order":["tab-1","landing"], …}` with NO `landing` row member, so
  `read()` names a landing row the record does not hold. **And the fix is not a rename**: a record carrying the landing ROW at that
  key with no string seat passes all five pairs and reads `landing: 'tab-1'`, so the seat must be DERIVED rather than stored.
- **"RESERVED" THEREFORE HAS NO COUNTERPART IN THE CROSSING YET — A HOLE THIS ROW NAMES RATHER THAN FILLS.** The renderer guards the
  spelling twice: `mintTabId('landing')` answers `'reserved-spelling'`, and its store answers `remove('file.tabs.landing')`
  `'reserved-name'`. The expectation this pass carried was that the crossing answers that same reservation with an UPDATE on `commit`
  and the empty-sequence REPAIR on `remove`; **the measurement is that neither happens today** — the guards lose their counterpart to
  a GAP and not by design, an entry id equal to either SEAT name (`order`, `landing`) being unrepresentable here with nothing at
  either route refusing it. **No reserved flag and no new refusal were added** (a crossing design change this pass does not take):
  the guard such a write needs is **REPORTED HERE AND BUILT NOWHERE**, and the repair is the answer once the seat is derived.
- **NO MIGRATION, AND NOTHING WAS DROPPED.** No install holds these rows in the operator-settings carrier, so they are dropped rather
  than migrated and no boot migration is built; this pass had nothing to drop either, since the rows are simply not read.
- **CONSEQUENCE FOR THE RENDERER PASS, CORRECTED AGAINST WHAT THIS PASS EXPECTED.** The two records do **not** yet spell the entry the
  same way, so the migration is an OWNERSHIP CHANGE **AND** the disposition of the `landing` seat — not an ownership change alone. Its
  cheapest measured shape: derive the seat (`read()`'s `landing` member is already the fallback `landingOf` computes) and let
  `['tabs','landing']` mean the landing entry's leaf, exactly as the renderer's `file.tabs.landing` does. **Only then does the entry
  id move, and only then is the migration the ownership change this pass set out to hand over.**

---

## D-76 — The `landing` seat is DERIVED, not stored, so the family has ONE seat and the entry's id can be spelled

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's decision D-75 carries — the landing entry's id is `'landing'` —
plus D-75's own four measurements, re-measured on this head before the change and again after it (2026-11-02).

**Decision:** `['tabs','landing']` is **the landing ENTRY's own leaf and no longer a SEAT.** `composeRecord` writes the `order`
array and one member per seated id and **no witness at all**; `landingOf` derives the witness — the landing entry's row when it
reads active, else `order`'s active row — and `read()`'s `landing` member **is that derivation**. One namespace is left where
there were two, which is what frees `landing` to be an entry's id. **The five pairs are unmoved**, and that is the test of the
change rather than a hope: `exactly-one-active` still requires one active among the survivors, the empty sequence still re-mints
the landing entry, and `tab-has-content`'s fallback is still the authored `'tabs-landing-page'` CONTENT target.

- **Why, in the collision this head measured** (a scratch profile with the five declarations batched, one fresh instance per arm).
  The family keys one member per tab in the SAME flat object as its seats, so with the entry spelled `'landing'` the composer wrote
  the row and then the seat STRING over it: the construction instant's own bytes read `{"landing":"landing","order":["landing"]}`
  and `read()` answered `rows: []`. **A HEALTHY record was worse** — the same `commit({id:'landing',…})` was ANSWERED
  `{status:'committed'}` and wrote `{"landing":"landing","order":["tab-1","landing"], …}` with **no `landing` row member**, so the
  record answered `committed` over a read that names a landing row it does not hold. **And a record carrying the landing ROW at
  that key, no string seat, passes all five pairs** and reads `landing: 'tab-1'`: the seat, not the id, was the whole obstruction.
- **Measured after it, the same arms on this head.** The construction write's own bytes are now
  `{"order":["tabs-landing-page"],"tabs-landing-page":{…}}` with `read()` answering `landing: 'tabs-landing-page'`, and the same
  `commit({id:'landing',…})` on a healthy record writes a real row member at that key, seats it in `order` and reads it back — so
  the hole was the seat and it is closed by the derivation, not by a guard over it.
- **What this means for a client**: `read()`'s `landing` member is the DERIVATION, not a stored pointer — `'landing'` when the
  landing entry is the shown tab, `''` on a record no legal act has left — so a client reads it as "which tab is the terminal" and
  never composes it. The rows are the state; this is the one member of them that names the shown one.
- **Two steps follow this row and each is appended here as it lands**: the refusal of an entry id equal to the one remaining
  stored seat (`order`), and then the id move itself. **Neither is taken on this row's word**: each is measured on its own head.
- **⟶ THE SEAT-NAME GUARD, appended when it landed (2026-11-02).** After the derivation `order` is the ONE stored seat, so an entry
  id of `order` is unrepresentable exactly as `landing` was — and it was accepted as silently: measured with the guard removed,
  `commit({id:'order',…})` was ANSWERED `{"status":"committed","repaired":true}` and the record **lost every tab** (the member write
  overwrote the `order` array the whole family is seated from), while `remove('order')` was answered `committed` as the store's own
  success over a name that is no member. **Both routes that take an id refuse it before any store act**, under `SEAT_NAME_REASON`
  (`'seat-name'`) and `SEAT_NAME_MESSAGE`, and one crossing row reads the refusal at both entry points and the record byte-identical after.
- **⟶ THE ID MOVED, appended when it landed (2026-11-02).** `TABS_LANDING_ID` is `'landing'` — `LANDING_ENTRY_KEY`, the literal
  `TABS_LANDING_ADDRESS` is spelled from — and EXPORTED, because the renderer pass reads one spelling. `landingRow`, `mintRecord`,
  `healRecord`, the crossing's rows, L1 §1 and its two `§5.U` posts, L2 §1/§2/§6 and L3 design §2 carry it; `TAB_CONTENT_FALLBACK`
  did NOT move, `'landing'` naming no authored node. **`D-75`'s "held" clause is superseded here; its dated measurements stay
  written as that head's own** (D-46). Measured: `order: ['landing']`, `read().landing` = `'landing'`, a commit under that id
  updates ONE member in place, and `remove` of it as the last tab re-mints it.

---

## D-77 — The renderer's tab client APPEARS in Stage A: one read-only module, one un-awaited boot read at the END of `main()`, and an absent member that answers

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's instruction this pass carries, verbatim — "Stage A of the
renderer migration — the client APPEARS, nothing is deleted" — on the staging already agreed in the corpus
(`strata/next-steps.md` row 1; D-63's client role, `docs/L2/store-tabs-record/interface.md` §6).

**Decision:** the renderer gets the tab record's client as ONE module, `src/renderer/tabs-client.ts` (claimed by this
record's map row), and **this stage is ADDITIVE**: `TABS_CONSTRAINT`, the graph-store record, `readTabsRef`, `mintTabId`,
`closeTab`, `evaluateTabsBootStep`, `driveTabsLandingPage`, the `file.tabs.*` writes and the Y-1/Y-2/Y-3 hand-off are
unmoved, and no element, route or answer changes. The client reads through `tabs.read()`, re-reads after every
`tabs.onChanged` delivery, holds no record of its own, and takes **no write route at all** — `commit` and `remove` are
Stage B's, and a write site with no caller is a route nobody drives.

- **WHERE THE BOOT READ SITS, AND WHY IT IS NOT AWAITED.** `main()`'s boot order is a GATE's reading:
  `tests/e2e/bundle-boot-seam/` asserts the bundle-boot trace's ORDER (hand-off → store → hydrate → boot step → runtime →
  pages → gutters → Y-3 → `ready()`). The instrument's one read is therefore STARTED as the LAST statement of `main()`,
  **after `bridge.ready()`**, and its promise is not awaited: no step's order moves, and a bridge that is slow, silent or
  failing cannot delay the first graph load, the pages' drive or the ready signal. **A pass that needs the reading EARLIER
  is changing the boot, and that is Stage B's own measurement — never a silent move of this call site.**
- **WHAT THE ABSENT MEMBER MEANS, STATED.** `window.provident.tabs` is optional at its declaration and is simply NOT THERE
  in three realms: the node suite's layout-less shim, a plain page loaded without the preload, and a bridge older than the
  crossing. In all three the client answers `{ status: 'absent' }` with a closed reason (`'no-tabs-member'`, or
  `'no-read-route'` where the member carries no `read`), and `subscribe` answers `subscribed: false` with a withdrawal that
  is still callable. **It is NOT a refusal**: L2 §3's refusal vocabulary is the store's own words, and a realm with no
  crossing has no store that spoke — so a missing instrument never reads as a record that failed.
- **`unread` IS THE CLIENT'S OWN THIRD STATE AND NOT A REFUSAL.** A route that rejected, and an answer outside L2 §2's
  declaration, both answer `unread` with the divergence named, because a record that could not be read must never be
  rendered as a record that was empty. The client is TOTAL on all four arms: nothing it does throws out of a read or a
  subscription.
- **THE WITNESS IS ONE PREDICATE, DERIVED FROM `read()`'s ANSWER ALONE** (L2 §6): the landing terminal stands where
  `landing` names a row reading `active: true` AND no other row does — one comparison and not two — and the error terminal
  where a row carries an `error`; both nodes are the ENVELOPE's, resolved through `Runtime.elementForNodeId`, and the
  client authors no element and no text. The derivation is exported, and the renderer bundle re-exports it, so the live
  driver reads the SAME predicate off both records rather than a re-spelling of it.

---

## D-78 — A STORE is a `provident-storeroom` instance and there are to be TWO: the provident-ssr graph is a RENDERING ENGINE, and `next-steps` row 1 is a PURGE

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** the user's three rulings, verbatim, carried on this head's inventory pass (`928e1b1`): **(1)** "There should only ever be the two crossing instances (normal + secure). Any references to other stores, including the renderer's graph store, is a legacy code feature that is obsolete and should be purged." **(2)** "The intended renderer process is that the listener drives the data loading, while the listener is driven by the store creation load + the constraint/repair passes." **(3)** "The provident-ssr graph is not a store. It is a rendering engine. Do not refer to it as a store. Do not use it as a store. It controls the render and the data shape is driven by the listener events."

**Decision.** **A STORE is a `provident-storeroom` instance, and there are to be exactly two**: a **normal crossing** and a **secure crossing**. Everything else that persists or holds state is **LEGACY and is PURGED**, the app's own frozen graph store included. **The provident-ssr graph is a RENDERING ENGINE and is none of those things**: it is **not a store**, it is **not called one**, and it is **not used as one** — nothing is held in it as state and nothing is read out of it as data. It controls the render, and **the data shape it renders is driven by the listener events**. The chain is **store acts** (creation load, constraint/repair passes) → **listener deliveries** → **the read** → **the data shape** → **the rendering engine renders it**, in that order and no other.

**The inventory this row rules on.** **Six store-like things stand at this head, and two are intended.** Intended: **(a)** the **normal crossing** — `createProfileStore` at the boot's one construction (`src/main/main.ts:132`, the five tab-record declarations batched, `<userData>/provident-profile.json`); **(b)** the **secure crossing** — the operator-settings instance (`src/main/operator-settings/index.ts:405`, three `file` addresses on `provident-operator-settings.json`, no constraint and no listener). Legacy: **(c)** the app's own frozen graph store `src/renderer/store-core-graph.ts`, constructed at `src/renderer/renderer.ts:819` — **the app's, never the package's**; **(d)** `src/renderer/store.ts`, the re-derive store, landed and imported by no file under `src/`; **(e)** `src/main/data/store.ts:120`, a **second instance of the seam opened on the boot store's own file**; **(f)** `src/main/module-store.ts`, the module registry on raw `fs`. The frozen store's `file.*` mirror is additionally persisted into the secure crossing's `['operator-app-state']` address — legacy content inside an intended store.

**`next-steps.md` row 1 is a PURGE and not a migration.** It was filed as a move ("the renderer reads and commits through `provident.tabs`"); what it carries now is deletion to a stated end, and its closure is **two instances and no other store-like thing in `src/`**.

- **The measurement that makes it a purge.** Exactly one path wires a legacy store into the render: the boot hand-off (`renderer.ts:1301`–`1339`) hydrates the frozen store from the secure instance's app-state rows, and the gutter wiring reads it (`renderer.ts:1734`, `:1880`) to clamp and to `state-slice` one authored node. **The tab record reaches no render at all** — `driveTabsLandingPage` (`renderer.ts:681`) resolves the two authored pages and its answer is **discarded** where `main()` calls it (`renderer.ts:1385`) — so ruling 2's chain is stated by this corpus and implemented by nothing today.
- **Ruling 3's sweep, run on this head BEFORE this row was filed.** `grep -rn "graph store\|graph-store\|store-core-graph" strata/ docs/ src/ AGENTS.md` answered **39 hits — 20 `strata/`, 10 `docs/`, 9 `src/`, 0 `AGENTS.md` — and not one is the rendering engine**: every hit names the app's frozen store, its map row, or a test that pins it, and no file in this tree calls the rendering engine a store. **This row adds four hits to that figure by naming the terms and quoting ruling 1**, whose own words are "the renderer's graph store" — so 39 is the reading at the instant before it landed, and the citation is that instant rather than a number a record can move by being written (D-43).
- **It supersedes the framing of the rows above it, never their dated text** (D-46). The register it reads is D-71 to D-77 — the change push returned to `['tabs']`, a repair's return was made explicit and its write made to name its commit, a boot battery's teardown was made to prove zero survivors, and the landing seat was derived and then its entry id moved; those measurements stand as written, and the package-facing rows among them stay the package's (`D-5`, `D-52`).

---

## D-79 — The THIRD instance is COLLAPSED onto the normal crossing: two instances over one file silently discard each other's writes, and `data.*` at `['tabs']` is now REPAIRED while it answers `committed`

**Status:** ACTIVE · **Date:** 2026-11-02 · **Source:** D-78's ruling that there are to be exactly two `provident-storeroom` instances, and this head's inventory, which named `src/main/data/store.ts`'s construction as a **second instance of the seam opened on the file the normal crossing already owns** — the same `provident-profile.json` the boot opens at `src/main/main.ts:132`.

**Decision.** **The surplus instance is collapsed and the app opens its profile once.** `createDataSurface` takes the caller's handle (`DataSurfaceOptions.store`) and `src/main/main.ts:297` passes the boot's own `centralStore`, which exists twelve lines earlier; the surface's port returns that instance and **constructs nothing**, so `data.*` acts through the normal crossing — the instance carrying the five tab-record declarations — and one register stands over the one file. **The handle is OPTIONAL and the absent arm is the batteries', not the app's**: an operation whose reading answers `absent` answers the cold tier without constructing anything, so a battery stands the surface alone on a seeded directory; a **supplied** store would create the file (a construction creates its `filePath` exclusively), the reading would answer `occupied`, and gating rows that pin the cold tier (`tests/e2e/central-data/scenarios.test.ts:134-135`, `:276`, `:385`, `:405-406`) could not stand. **The two-instance census is now INSTANCES, not importers** — `S-9` counts importing FILES and was blind to this instance because the surface reached the package through the seam, so it stayed green while a second store opened the same bytes; its assertions are untouched and still pin three importers (the seam, the operator-settings instance, the tab-record instance), and its TITLE, which read "exactly two" against an assertion naming three since the tab record landed its own import, is corrected to three.

- **THE HAZARD, MEASURED BEFORE THE CHANGE, AND IT IS NOT BENIGN.** A throwaway harness on a scratch profile, deleted after, opened two `createProfileStore`s over one name. *A constructed, B constructed on the empty file, A wrote `{"boot":"A-row"}`, B wrote `{"dataRow":"B-row"}`* → the file held **only B's row**; A's gone. *A wrote `{"seed":"A-seed"}`, B constructed and ADOPTED those bytes, B wrote `fromB`, A wrote `fromA`* → the file came back `{"fromA":"A-row","seed":"A-seed"}`, **B's row discarded**. *Both wrote `['x']`, A then B* → the disk held B, **A answered `"A"` and B answered `"B"`**, and neither call threw or refused. **The instance that writes last flushes its OWN whole register**, so the loss is silent in both directions and visible only from the instance that did not flush. The two 4096-entry journals are IN-MEMORY and never reach the file (8 writes → 57 bytes, a flat `{"k0":0,…}` map), and a fresh instance adopts whatever stands — so what interleaves is the register, and D-78's "two independent journals, one file" is the mechanism, not the visible bytes.
- **AND THE SURPLUS INSTANCE COULD LEAVE A TAB RECORD THAT NO CONSTRAINT PASS REPAIRS.** An instance with no constraints — exactly what the surface built, the seam's defaults being `listeners: []`, `constraints: []` — accepted `write(['tabs'], 'file', 42)` and `['tabs']` read back **`42`**; the boot instance went on reading its own legal record in memory, and **the next boot repaired nothing**: a constrained construction over that file answered `read(['tabs']) = 42`. So the third instance was not merely extra: it was a second writer of the tab record's file, outside the declarations that police it, and it could leave a record the crossing then serves as a tab.
- **THE JOURNAL LENGTH IS PRESERVED EXACTLY, AND THE LAZY CONSTRUCTION SAVED NO I/O.** Both sides asked for `4096` — `main.ts` passes no `journalLength` to either, so `DEFAULT_JOURNAL_LENGTH` (`src/main/storeroom.ts:71`) is the figure on both — and the supplied instance's journal IS the one the surface asked for; a caller that supplies a differently-sized instance fixes the surface's figure too, because **a store's journal is set at creation and never moves**, so there is nothing to preserve there and no way to. The deferral bought nothing at the file: the boot store had already opened and created the file at `:132`, so what waited was a **second register and a second journal in memory**, and the collapse deletes exactly that.
- **WHAT A `data.*` WRITE AT A POLICED ADDRESS NOW ANSWERS, MEASURED THROUGH THIS SURFACE WITH THE BOOT'S HANDLE.** `write({path:['tabs'], value:42})` → **`{"status":"committed","path":["tabs"],"cursor":3}`**, and what STANDS at `['tabs']` is the legal landing-seated record — the five declarations all fired and repaired it. `{}`, a record naming two actives, and a record naming none answer the same and stand the same. `delete(['tabs'])` → `{"status":"committed","removed":false,"tiers":[],"cursor":null}`, the record intact. **So it is PROTECTION of the record and an UNTRUTHFUL `committed`** — `committed` is this surface's word for a write that landed, and the write landed and was then rewritten inside its own commit. At an address the declarations do not NAME, `write(['tabs','rows'], 'v')` is accepted and the member stands in the store until the record's next commit composes the record whole and drops it, while the record's own `read()` ignores it throughout (measured both ways). **A GUARD IS PROPOSED, NOT BUILT**: the store's write receipt carries `triggered`, the surface discards it, and answering `committed` with the repairs named — the tab record's own `repaired` member, derived the same way — would make the answer honest; that moves L2 §2/§3's closed vocabulary and needs a ruling.
- **WHAT DID NOT MOVE, PROVED BY RUNNING THE EXISTING SUITES UNEDITED.** The seven on-notice central-data files (3 integration + 4 unit) are green at `59` rows with **not one line changed**, and the gating battery is `12/12`: `read`, `write` and `delete` at an ordinary path answer exactly what they answered before, and the cold tier still constructs nothing. **One answer WIDENS and is stated rather than buried**: `list({})` at the root now enumerates the ONE register, so it carries the tab record's leaves (`["tabs","landing","active"]`, `…`) where the second instance's empty register served none — measured `7` paths against `1`, and the register it reports is the profile's own.
- **IT SUPERSEDES THE FRAMING OF THE ROWS ABOVE IT, NEVER THEIR DATED TEXT** (D-46): D-78's inventory counted six store-like things and this row leaves **five**, the two intended instances being the normal and secure crossings. The package-facing rows among them stay the package's — the package is read and never modified, and a defect of it belongs to the unit that surfaced it, filed with symptom, reproduction and proposed fix shape (`D-5`, `D-52`).
