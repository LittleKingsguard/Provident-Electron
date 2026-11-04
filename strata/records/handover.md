# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` in full — its last row is the current one.

## What is landed

**Seven units**, the tree committed at every gate boundary. Which are `done` is **state** (`.strata/units/*.json`); what each landed is its own design documents' and its map row's (`strata/modules.json`). Both are cited here and neither is restated: **a landed unit is not a queue** (D-26, D-43).
`settings-carrier-retirement` (`docs/L1/settings-carrier-retirement.md` §3-§5; the `operator-settings` and `app-shell` rows) · `central-data-management` (`docs/L3/central-data/design.md`; the `central-data` row) · `security-store-storeroom` (`docs/L1/security-store-storeroom-exception.md` §9; the `operator-settings` and `settings-surface` rows).
`strata-bootstrap` (`strata/` itself, and `strata/archive.md` for the archived corpus) · `bundle-boot-seam` (`docs/L2/bundle-boot-seam/`; its row's `package.json` and three battery directories) · `secure-panels` (`docs/L1/secure-panels.md` §7 `E-1`; the `secure-panels` row).
`store-tabs-record` (`docs/L2/store-tabs-record/interface.md`, `docs/L3/store-tabs-record/signatures.md` rev 2, and `strata/records/store-tabs-record-unit.md`; its own row, which also claims the `npm run crossings` leg, and `store-view-record`'s).

## What stands between the tree and the product now

- **The boot seam is fixed** (D-27): the built main bundle boots, every leg's reading is `brief.md` §6's table — `panes` among them, the fourth leg and outside the floor (D-37) — and no count is restated here (D-26).
- **The test triage is decided, instrumented and applied** (D-30, D-40): `tests/e2e/**` and the Electron legs gate, the scenarios that stood when the rework was decided report on notice, and one authored after that sweep gates. The readings are `strata-marks.mjs report`'s and `strata/marks.json`'s, never this file's, and until a runner separates the two `npm test` still measures the whole tree (§6).
- **The Settings pane's roster is a projection of a table the gate's `ToolGroup` types** (D-35, D-38), so the pane cannot drift from the gate again; which groups exist is `brief.md` §2's.
- **The artifact is not self-contained**: it resolves `provident-storeroom` from `node_modules` at run time, so a packaged build ships the package and a loadable addon (`docs/L3/bundle-boot-seam/design.md` §4 `G-8`).

## What a fresh session does next, in order

**The queue is `strata/next-steps.md`, `strata/pending.md` and `strata/proposals.md`** (D-61): next-steps is what is actionable now and in what order — **and its table is empty at this head, every row having left with its work** — pending is what is blocked and on what, proposals is what nobody has asked for.
**State decides what is open, and it is read before any prose about it is believed.** `stage` is the last structural transition and never a verdict (`strata/README.md`, § "State, not prose"), so seven units reading `done` makes no unit ready and skips no survey:
- **three of the seven carry a standing `lastFailure`** — `bundle-boot-seam` and `settings-carrier-retirement` a `walkthrough-record` red, `store-tabs-record` an `l4-implementation` adjudication — and only `rebuild` clears one;
- **`pending.md` holds the blocked work, and its rows ARE the list — never a number** — `strata-lint`'s record gap — and the deviations those rows name stand open in the records they belong to. **THE `data.*` ANSWER SITES ARE NO LONGER AMONG THEM**: `D-112` answered all five on 2026-11-04 (five renderer arms, five `ipcMain.handle` sites, one `data` member in lockstep, eleven gating rows, no push), and the departure is recorded in `pending.md` WITH its second role, `D-82`'s clause-2 revival condition, which now lives in `D-112` and is unchanged in substance — a route is not a consumer and the cell stays `N/A`. **The eleven unimported `src/shared/` modules are no longer among them**: the ruling was taken on 2026-11-04 and it is **carried as designs**, the user's, with `D-111` recording the disposition and what carrying leaves unsaid. **And `src/shared/overlay.ts`'s absent consumer is no longer among them either**: the user's ruling gave it the consumer it was owed — *"The overlay is used to contain UI elements that should block general app access while open, ex. security tools and other configuration settings"* — `D-113` authored the surface and wired the application on 2026-11-05, and `pending.md` records the departure with its reason.

So the first act is a **SURVEY** — every row in `pending.md`, what each waits on, and the deviations — and the first row of `next-steps.md` comes only after it.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** The boundary row asserts the worktree against a declared edit set, so a dirty tree reddens it **by construction** — commit, then measure (`tests/integration/store-view-record/boundary.test.ts`; brief §6).
- **The layer wall is prompt-level in this seat**: without the preset's `role_*` tools the L1/L2/L3 seats are plain delegations carrying the role's persona and procedure, so only the instruction and the diff hold scope.
- **A disposition is not a landing**: a `routed` finding is not fixed, and a fix over prose must be re-read rather than substituted — a commit hash once ate a row count in two L1 documents (D-3).
- **Instruments before prose** (D-29, D-30, D-44): `strata-walkthrough.mjs` stages, checks and pins; `strata-marks.mjs` keeps markers and index agreeing — a finding a script should have caught indicts it. **Commit per gate**, never merge or push (D-6); four legs and `strata-lint`, run from `strata/`.
- **`npm test` — not only the Electron legs — can leave process trees**: the boot battery spawns Electron and a teardown lives only as long as
  its vitest hooks, so check `ps -eo pid,etime,args | grep -E 'node_modules/electron/dist|dist/main/main.mjs'` after a run and expect it empty.
  The teardown now SIGKILLs a boot's whole tree by process-tree walk, never by SIGTERM — the main process ignores it — and **proves zero**, failing loudly with every survivor listed; `reapProfile`'s cmdline-only match saw neither `--type=zygote` child (D-74).
- **A snapshot of an artifact another worker may rebuild is not a reading.** `dist/` is co-owned: `boot-contract.test.ts`'s `beforeAll` runs
  `npm run build` (first arm `npm run clean`) while `arrangement.test.ts` reads the same files, so "it exists" is true one millisecond and false
  the next. Every read of a co-owned artifact is a BOUNDED wait — present, non-empty, unchanged across two polls — and a failure is awaited to its reason line rather than sampled: a published error arrives in more than one stderr chunk (D-74).
