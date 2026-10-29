# Provident-Electron — strata decisions log

The only record of user intent for this project under the strata workflow. Append-only: a decision
is never edited, reworded or annotated, and a later decision supersedes an earlier one by naming it.
One section per decision, ≤ 40 lines each. **Source** is the user's own words or the exact option
they chose; a row with no user source is not a decision and belongs in `brief.md` as an `ASM-n`.

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
