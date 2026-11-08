# `pane-drag-temp` — the unit record (`D-132` landed as `D-145`)

- **Unit:** `pane-drag-temp`, admitted by `next-steps.md` row `5` · **landed 2026-11-07 on `main`, uncommitted at this record's writing** · **edit list `E-1`…`E-8`** in `docs/L1/pane-drag-temp.md` §7, one writer each (`D-3`)

## 1. What landed, one line per module

- **`store-view-record`** — `['drag']` at `temp`, **declared and unpaired** (no constraint: no invariant holds a gesture transient); `commitDrag` writes the whole family, `clearDrag` deletes it (no placeholder); the `viewDeclaredRoots()` entry in the address's own hunk (`D-101`) and **the address joining `subscribe`'s array in the constants' hunk** (`D-137`); four published roots.
- **`app-shell` + `secure-panels`** — the `view` member is **seven** at both halves, one edit (`D-112`): `read` · `commitPane` · `commitZones` · `commitTheme` · `commitDrag` · `clearDrag` · `onChanged`; `main()` registers twenty handlers.
- **`renderer-wiring`** — the seat is the affordance's ONE preview seam (`state.valid`): one `commitDrag` per placement change, `clearDrag` at the gesture's end; `release` keeps sink → `commitPane` → ending; the ghost is returned as `{attached, renderGhost}`, driven by `startViewShape`'s subscription, and **fails closed**; `previewOf`, `previews` and `gestureIdOf` deleted.
- **`central-data`** — its roots-equality row re-grained to the batch **plus the one unpaired entry**, so a second unpaired entry or a pair minted at `['drag']` reds it.
- **`demo-panes`** — the demo's two `previewOf` calls replaced by the address, and the bundle rebuilt (`D-118`).
- **The measured deviation**: the ghost reads the member's size as a **leaf node** (`member.size.value`), because the readout answers `{_tier, value}`; the design's bare-number form would have cleared on every live delivery.

## 2. Readings at this head (a leg not measured is not claimed)

- `npm test` **`2,928 passed / 2 skipped` of `2,930`** over `140` files · `typecheck` **0** · `typecheck:tests` **0** · `build` **0**.
- The unit's own battery `P-1`…`P-6` **6/6 green** over seven Electron boot(s) on scratch profiles, with the live-boot lock and the artifact-set wait.
- `crossings` **`0` failures over `28` rows** · marks `319` gating sites in `43` files · `strata-lint` exits `1` with its ONE accepted `register` FAIL.
- **`P-4`'s end-of-reading arm names the ROW**, not the family root, because the surface's delete refuses a branch address — the row's acceptance says so rather than the contract bending to the row.

## 3. The walkthrough and what is owed

- **The exit walkthrough reads `STALE` on currency for the third time** (`strata/records/pane-drag-temp-walkthrough.md`): the substance is right and the pages are behind their own landing. **Not presented as ready** (`walkthrough.md` §5).
- **Owed, and now a rule rather than a follow-up** (`D-145`): each landing must re-grain its own design pages in the same pass. Outstanding: this unit's four pages, and the two earlier units' passes (`D-143`, `D-144`).
- **Owed by their owners**: `src/main/data/surface.ts`'s root-census prose (four roots, now five), the ghost's leaf tolerance undocumented, and the "the seat is measured by nothing" row in `docs/L3/renderer-wiring/design.md` §8.
