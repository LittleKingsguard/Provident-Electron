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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-15 and D-16.**

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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Corrigendum to D-19**, which stands as filed (D-1 makes this
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

**Status:** ACTIVE · **Date:** 2026-10-29 · **Source (user, selection):** "Fix the boot seam first
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

**Status:** ACTIVE · **Date:** 2026-10-30 · **Source (user, selection):** "Rebuild the walkthrough
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
