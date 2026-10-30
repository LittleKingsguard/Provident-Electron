# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` **D-1..D-30**. This file is the short version.

## What is landed

Five units, tree committed at every gate boundary; each unit's stage and walkthrough streak are state
(`strata/.strata/units/*.json`), so no count of them is restated here (D-26):

| Unit | Code |
|---|---|
| `settings-carrier-retirement` | `main.ts` carrier removed |
| `central-data-management` | `src/main/storeroom.ts`, `src/main/data/` (7 files) |
| `security-store-storeroom` | `src/main/operator-settings/`, `src/main/settings-surface/`; `security-store.ts` deleted |
| `strata-bootstrap` | `strata/`, `archive/gate-corpus-2026-10-29/` |
| `bundle-boot-seam` | ESM main bundle at `dist/main/main.mjs`, the package external (D-27) |

**Census:** `strata/brief.md` §6 and §2 own every count and the module map is `strata/modules.json`'s —
this record restates neither, because a count in a second place drifts at the next commit (D-26, D-28).

## What stands between the tree and the product now

- **The boot seam is fixed** (D-27): all three Electron legs are green for the first time, and their
  readings live in `strata/brief.md` §6, never restated here (D-26).
- **The test triage is decided and instrumented, not yet applied** (D-30): `tests/e2e/**` and the three
  Electron legs are retained; every integration and unit scenario is to be marked `// strata:marked rework`
  and reports on notice. `scripts/strata-marks.mjs` indexes and checks the markers, no file carries one yet,
  and the runner still measures the whole tree.
- **The Settings pane still cannot grant the sixth group.** `src/renderer/secure-panels.ts:72` enumerates
  five group names, so `data` is in the gate's valid set with no operator control — owed to the
  `secure-panels` row's unit (`strata/records/central-data-management-unit.md` §2).
- **The artifact is not self-contained**: it resolves `provident-storeroom` from `node_modules` at run time,
  so a packaged build ships the package and a loadable addon (`docs/L3/bundle-boot-seam/design.md` §4 `G-8`).

## What a fresh session does next, in order

1. **Decide the open units' walkthrough cap.** Each carries a `walkthrough-record` streak at the state
   machine's limit, which refuses a fourth `fail`: run its set under the instrument, then `pass` or
   `rebuild` (`strata/records/*-walkthrough.md`; `strata/rebuild.md` §3).
2. **Apply D-30**: mark the integration and unit scenarios, generate `strata/marks.json`, and let L2 decide
   how the runner separates the gating reading from the on-notice one.
3. **The pane's sixth group**, as its own unit — the one finding that has survived five passes, and the
   running app can now be driven for real to prove it.
4. **D-22's second half**, still parked: the gate's exclusion/tier-4 enforcement (which gives
   `src/main/tier4-state.ts`'s reader its first `src/**` consumer, discharging `ASM-4`), the module
   registry, and the journal-length consumers onto the instance as their state engine.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** The flat suite's boundary row asserts the worktree against a
  declared edit set, so a dirty tree reddens it **by construction** — commit, then measure; it keeps gating.
- **The layer wall is prompt-level in this seat.** Without the preset's `role_*` tools the L1/L2/L3 seats are
  plain delegations carrying the role's persona and procedure: only the instruction and the diff hold scope.
- **A `routed` disposition is not a landed one.** Two findings in `central-data-management`'s run 5 still
  read `routed` alone at this head: route to an owner only with a landing, or record it as owed (D-3).
- **A fix over prose must be re-read, not substituted** — a commit hash once ate a row count in two L1 documents.
- **Instruments before prose** (D-29, D-30): `strata-walkthrough.mjs` resolves path cites and prints the
  counts a document must cite, and `strata-marks.mjs` keeps markers and index agreeing — a finding a script
  should have caught is evidence about the script.
- **Commit per gate**, never merge or push (D-6); four legs and `strata-lint` (run from `strata/`).
