# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` in full — its last row is the current one.

## What is landed

Six units, tree committed at every gate boundary; each unit's stage and walkthrough streak are state
(`strata/.strata/units/*.json`), so no count of them is restated here (D-26):

| Unit | Code |
|---|---|
| `settings-carrier-retirement` | `main.ts` carrier removed |
| `central-data-management` | `src/main/storeroom.ts`, `src/main/data/` (7 files) |
| `security-store-storeroom` | `src/main/operator-settings/`, `src/main/settings-surface/`; `security-store.ts` deleted |
| `strata-bootstrap` | `strata/`, `archive/gate-corpus-2026-10-29/` |
| `bundle-boot-seam` | ESM main bundle at `dist/main/main.mjs`, the package external (D-27) |
| `secure-panels` | the pane's roster as a projection of a gate-typed table; a live leg on `panes` (D-35, D-37) |

**Census:** `strata/brief.md` §6 and §2 own every count and the map is `strata/modules.json`'s; this record
restates neither, because a count in a second place drifts at the next commit (D-26, D-28, D-43).

## What stands between the tree and the product now

- **The boot seam is fixed** (D-27): all three Electron legs are green for the first time, and their
  readings live in `strata/brief.md` §6, never restated here (D-26).
- **The test triage is decided, instrumented and applied** (D-30): `tests/e2e/**` and the three Electron
  legs are retained and gate — `panes` is the fourth and sits outside the floor (D-37) — and the scenarios **that stood when the rework was decided**
  carry `// strata:marked-file rework` and report on notice, one authored after that sweep gates (D-40), and ten carve-outs inside marked files still gate (D-38) — `strata/marks.json`'s `gates` list is the reading. The two readings are
`scripts/strata-marks.mjs report`'s, never restated here (D-26); the runner still measures the whole tree.
- **The Settings pane grants all six groups** and that unit is **closed**: `secure-panels` landed its roster
  as a projection of a table the gate's `ToolGroup` types, and passed its exit walkthrough at run 5
  (`docs/L1/secure-panels.md` §7 `E-1`; D-35, D-38; `strata/records/secure-panels-walkthrough.md`).
- **The artifact is not self-contained**: it resolves `provident-storeroom` from `node_modules` at run time,
  so a packaged build ships the package and a loadable addon (`docs/L3/bundle-boot-seam/design.md` §4 `G-8`).

## What a fresh session does next, in order

1. **Close the three open units.** All three were rebuilt (`builds: 2`, streaks cleared); what each needs now
   is a run whose own documents are clean, then `pass` and `close` — or a finding and another round
   (`strata/records/*-walkthrough.md`; D-48, `strata/rebuild.md` §3).
2. **Land D-30's runner split**: the markers are in and `strata/marks.json` is generated, so what remains is
   L2's arrangement for reporting the gating reading beside the on-notice one, and L4 landing it.
3. **D-22's second half**, still parked: the gate's exclusion/tier-4 enforcement (giving
   `src/main/tier4-state.ts`'s reader its first `src/**` consumer and discharging `ASM-4`), the module
   registry, and the journal-length consumers onto the instance. It is also where `R-7` lands.
4. **The carried small items**: `F-5`'s stale comment in `src/shared/types.ts` (the group set's fourth
   reader), `gesture-session` `F-9(b)`'s missing sibling entry, and `bundle-boot-seam`'s `A-4` flake.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** The flat suite's boundary row asserts the worktree against a
  declared edit set, so a dirty tree reddens it **by construction** — commit, then measure; it keeps gating.
- **The layer wall is prompt-level in this seat.** Without the preset's `role_*` tools the L1/L2/L3 seats are
  plain delegations carrying the role's persona and procedure: only the instruction and the diff hold scope.
- **A `routed` disposition is not a landed one.** Two findings in `central-data-management`'s run 5 still
  read `routed` alone at this head: route to an owner only with a landing, or record it as owed (D-3).
- **A fix over prose must be re-read, not substituted** — a commit hash once ate a row count in two L1 documents.
- **Instruments before prose** (D-29, D-30, D-44): `strata-walkthrough.mjs` stages, checks and pins;
  `strata-marks.mjs` keeps markers and index agreeing — a finding a script should have caught indicts it.
- **Commit per gate**, never merge or push (D-6); four legs and `strata-lint` (run from `strata/`).
