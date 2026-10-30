# handover — branch `strata` (`main` still `28e9ac1`, unmerged by D-6)

Read `strata/brief.md` first, then `strata/decisions.md` in full — its last row is the current one.

## What is landed

Six units, the tree committed at every gate boundary. Which are `done` and which is not is **state**
(`strata/.strata/units/*.json`); what each landed is its own design documents' and its map row's (`strata/modules.json`).
Both are cited here and neither is restated: a landed unit is not a queue, and only the open unit has one (D-26, D-43).

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

1. **Run the walkthrough the one open unit owes.** `strata-bootstrap` is the only unit not at `done` (state); it owes run 15 over the summary layer its own
   retrospective rebuilt, and only a `PASS` closes it (D-29, `rebuild.md` §3-§5).
2. **Land D-30's runner split**: the markers are in and `strata/marks.json` is generated, so what remains is L2's arrangement for reporting the gating reading beside the on-notice one, and L4 landing it.
3. **D-22's second half**, still parked and admitted as units like any other: the module registry and the journal-length consumers onto the instance.
   The tier-4 half has moved — `docs/L1/security-store-storeroom.md` §10 `ASM-4` settles at rev 3 that the holder stays as a projection with no
   `src/**` reader — so the work is the later unit that gives the enforcement path a use for it, not a first reader.
4. **Two bridge widenings**, each owed to the file's next writer: `src/main/main.ts`'s type-only import keeps `Tier4ClosedRefusal` and `Tier4WriteAnswer`,
   neither referenced; and `src/main/preload.ts`'s `store.put` reason — with its renderer-side copy in `src/renderer/renderer.ts` — is the closed pair
   where the channel answers the surface's own status (D-3, D-5).
5. **The carried small items**: `F-5`'s four-name comment on `SecuritySettings.enabled` in `src/shared/types.ts` (the `ipc-contract` row); `gesture-session`
   `F-9(b)`'s sibling census, where `src/renderer/secure-panels.ts` is also an unclaimed-probe control, so entry and control move in one pass; and
   `bundle-boot-seam` `A-4`, whose `pathToFileURL(...).href` hands a checkout path with a space a `%20` URL.
6. **The data bridge is design, not measurement**: the five `data.*` members of `RpcMethod` have no answer site — no arm in `src/renderer/renderer.ts`'s
   method switch, no handler in `src/main/main.ts` — so `docs/L2/central-data/interface.md` §5 waits on a unit nobody has admitted yet (D-7).

`R-7` is **not** in this queue and must not be re-opened: the `preload.ts` comment it named is corrected at this head, and `docs/L2/secure-panels/interface.md` §8 records it discharged at rev 6.

## Operating notes that cost real time

- **A run is only trustworthy on a clean tree.** The flat suite's boundary row asserts the worktree against a declared edit set, so a dirty tree reddens
  it **by construction** — commit, then measure (`tests/store-tabs-record.test.ts`; brief §6).
- **The layer wall is prompt-level in this seat**: without the preset's `role_*` tools the L1/L2/L3 seats are plain delegations carrying the role's persona
  and procedure, so only the instruction and the diff hold scope.
- **A disposition is not a landing**: a `routed` finding is not fixed, and a fix over prose must be re-read rather than substituted — a
  commit hash once ate a row count in two L1 documents (D-3).
- **Instruments before prose** (D-29, D-30, D-44): `strata-walkthrough.mjs` stages, checks and pins; `strata-marks.mjs` keeps markers and index
  agreeing — a finding a script should have caught indicts it. **Commit per gate**, never merge or push (D-6); four legs and `strata-lint`, run from `strata/`.
