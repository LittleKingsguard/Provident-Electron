# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` **D-1..D-28**. This file is the short version.

## What is landed

Four units on the `provident-storeroom` instance, tree committed at every gate boundary:

| Unit | State | Code |
|---|---|---|
| `settings-carrier-retirement` | **closed** — walkthrough `PASS` at its run 2 | `main.ts` carrier removed |
| `central-data-management` | batteries green; walkthrough red at run 3 | `src/main/storeroom.ts`, `src/main/data/` (7 files) |
| `security-store-storeroom` | batteries green; walkthrough red at run 3 | `src/main/operator-settings/`, `src/main/settings-surface/`; `security-store.ts` deleted |
| `strata-bootstrap` | corpus + archive; walkthrough red at run 5 | `strata/`, `archive/gate-corpus-2026-10-29/` |

**Census:** `strata/brief.md` §6 and §2 own every count and the module map is `strata/modules.json`'s —
this record restates neither, because a count in a second place drifts at the next commit (D-26, D-28).

## What stands between the tree and the product now

- **The boot seam is fixed** (D-27, `bundle-boot-seam`): the main bundle is ESM at `dist/main/main.mjs`, the
  package is external, and the entry derives its own directory from its own module URL. All **three**
  Electron legs are green for the first time — `battery` 184/184, `divergence` 9/9 on its pinned N plus
  four extension checks, `ui` 11/11 with real geometry — and the unit's own batteries are 8/8, 5/5 and 8/8.
  The readings live in `strata/brief.md` §6 and are never restated here (D-26).
- **The Settings pane still cannot grant the sixth group.** `src/renderer/secure-panels.ts:72` enumerates
  five group names, so `data` is in the gate's valid set with no operator control. Filed in
  `strata/records/central-data-management-unit.md` §2, owed to the `secure-panels` row's unit.
- **The artifact is not self-contained**, and a fork must know it: it resolves `provident-storeroom` from
  `node_modules` at run time, so a packaged build ships the package with its platform optional dependency
  and a loadable addon (`docs/L3/bundle-boot-seam/design.md` §4 `G-8`). It never was self-contained.

## What a fresh session does next, in order

1. **The pane's sixth group**, as its own unit — it closes the walkthrough finding that has survived four
   passes, and the running app can now be driven for real to prove it.
3. **D-22's second half**, still parked and still admitted as units: the gate's exclusion/tier-4 enforcement
   (which is also what gives `src/main/tier4-state.ts`'s reader its first `src/**` consumer, discharging
   `ASM-4`), the module registry (`src/main/module-store.ts` is the last hand-written JSON carrier of the
   retired shape), and the journal-length consumers onto the instance as their state engine.
4. **A decision about the walkthrough instrument.** All three open units now carry
   `streaks.walkthrough-record: 3` and `rebuildEligible: true`. `rebuild.md` §3 says a third consecutive
   failure indicts the artifact, not the prose — and this pass proved it twice: one run's decisive finding
   was an error in **L0's own staging listing**, and three runs' remaining findings were stale counts that
   earlier passes had "fixed" by writing a newer number into another document.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** `tests/store-tabs-record.test.ts` §4.2 item 9 asserts the
  worktree against a declared edit set, so a dirty tree makes it red **by construction**. Commit, then measure.
- **The layer wall was prompt-level this pass.** The seat ran without the preset's `role_*` tools, so the L1
  and L2 seats were plain delegations carrying the role's persona and its procedure file. The write scopes
  held; nothing enforced them but the instruction and the diff.
- **L0 never edits another layer's document (D-3).** Every `docs/L1`/`docs/L2` finding goes to a seat that
  owns that path, even when the fix is one sentence.
- **A fix over prose must be re-read, not substituted.** `536bdc6` had already eaten one count (`53`) and was
  still standing in two L1 documents as a row count; a blind pass found it where a re-read had not.
- **Commit per gate**, never merge or push (D-6). Four legs plus `strata-lint`, and `strata-lint` with
  `--changed <a,b>` when a unit's diff is scope-checked.
