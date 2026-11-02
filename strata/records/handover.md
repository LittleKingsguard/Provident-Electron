# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` in full — its last row is the current one.

## What is landed

Six units, the tree committed at every gate boundary. Which are `done` and which is not is **state**
(`strata/.strata/units/*.json`); what each landed is its own design documents' and its map row's (`strata/modules.json`).
Both are cited here and neither is restated: **a landed unit is not a queue**, and no unit is open at this head (D-26, D-43).

| Unit | Where what it landed is read |
|---|---|
| `settings-carrier-retirement` | `docs/L1/settings-carrier-retirement.md` §3-§5; the `operator-settings` and `app-shell` rows |
| `central-data-management` | `docs/L3/central-data/design.md`; the `central-data` row |
| `security-store-storeroom` | `docs/L1/security-store-storeroom-exception.md` §9; the `operator-settings` and `settings-surface` rows |
| `strata-bootstrap` | `strata/` itself, and `strata/archive.md` for the archived corpus |
| `bundle-boot-seam` | `docs/L2/bundle-boot-seam/`; its row's `package.json` and three battery directories |
| `secure-panels` | `docs/L1/secure-panels.md` §7 `E-1`; the `secure-panels` row |

## What stands between the tree and the product now

- **The boot seam is fixed** (D-27): the built main bundle boots, and every leg's reading is `strata/brief.md` §6's table — `panes` among them, the
  fourth leg and outside the floor (D-37). No count is restated here (D-26).
- **The test triage is decided, instrumented and applied** (D-30): `tests/e2e/**` and the three Electron legs gate, the scenarios that stood when
  the rework was decided report on notice, and one authored after that sweep gates (D-40). The readings are `scripts/strata-marks.mjs report`'s and
  `strata/marks.json`'s `gates` list, never this file's (D-26); until a runner separates the two, `npm test` still measures the whole tree (brief §6).
- **The Settings pane's roster is a projection of a table the gate's `ToolGroup` types**, so the pane cannot drift from the gate again;
  which groups exist is `brief.md` §2's (D-35, D-38).
- **The artifact is not self-contained**: it resolves `provident-storeroom` from `node_modules` at run time, so a packaged build ships the package and
  a loadable addon (`docs/L3/bundle-boot-seam/design.md` §4 `G-8`).

## What a fresh session does next, in order

**The queue is `strata/next-steps.md`, `strata/pending.md` and `strata/proposals.md`** (D-61), and this record does not
restate it (D-43): next-steps is what is actionable now and in what order, pending is what is blocked and on what,
proposals is what nobody has asked for. Read those three before acting.

State decides what is open: `strata/.strata/units/*.json` says every unit is `done`, so nothing here waits on a
walkthrough, and a session's first act is the first row of `next-steps.md` rather than a survey.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** The flat suite's boundary row asserts the worktree against a declared edit set, so a dirty tree reddens
  it **by construction** — commit, then measure (`tests/store-tabs-record.test.ts`; brief §6).
- **The layer wall is prompt-level in this seat**: without the preset's `role_*` tools the L1/L2/L3 seats are plain delegations carrying the role's persona
  and procedure, so only the instruction and the diff hold scope.
- **A disposition is not a landing**: a `routed` finding is not fixed, and a fix over prose must be re-read rather than substituted — a
  commit hash once ate a row count in two L1 documents (D-3).
- **Instruments before prose** (D-29, D-30, D-44): `strata-walkthrough.mjs` stages, checks and pins; `strata-marks.mjs` keeps markers and index
  agreeing — a finding a script should have caught indicts it. **Commit per gate**, never merge or push (D-6); four legs and `strata-lint`, run from `strata/`.
- **`npm test` — not only the Electron legs — can leave process trees**, because the boot battery spawns Electron and a teardown lives only as long as
  its vitest hooks. Check with `ps -eo pid,etime,args | grep -E 'node_modules/electron/dist|dist/main/main.mjs'` after a run: it must be empty. The
  battery's teardown now SIGKILLs a boot's whole tree by process-tree walk, never by SIGTERM (Electron's main process ignores it), and **proves zero**,
  failing loudly with every survivor listed; `reapProfile`'s old cmdline-only match could not see the two `--type=zygote` children at all (D-74).
- **A snapshot of an artifact another worker may rebuild is not a reading.** `dist/` is co-owned: `boot-contract.test.ts`'s `beforeAll` runs
  `npm run build` (whose first arm is `npm run clean`) while `arrangement.test.ts` reads the same files, so "it exists" is true one millisecond
  and false the next. Every read of a co-owned artifact is a BOUNDED wait — present, non-empty, unchanged across two polls — and a failure is
  awaited to its reason line rather than sampled, because a published error arrives in more than one stderr chunk (D-74).
