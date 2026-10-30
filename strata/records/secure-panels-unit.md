# record — `secure-panels`: package findings, the readings it took, and what it carried (D-5)

- **Unit:** `secure-panels` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)
- **What this file is:** the unit's **closure record** for D-5 — its package findings, the readings it took, and the items it carried to other rows.
  The unit is **closed**, so its stage, streaks and build count are `strata/.strata/units/secure-panels.json`'s, its run history, verdict and the walkthrough's
  findings are `strata/records/secure-panels-walkthrough.md`'s, and its paths and endpoint count the `secure-panels` row of `strata/modules.json`'s — cited, never restated (D-26, D-43, D-48, D-52).

## 1. Package findings — `provident-storeroom`, upstream-owned, never patched (D-5)

- **No new package finding.** The zero-length boot is the sibling's, filed once as `P-1` of `docs/L2/security-store-storeroom/persistence.md` §9 and cited here, never re-filed.
- **The asymmetry measured is the tree's composition, not a package defect:** a `set` while the tier-4 pair is closed **commits**, because
  `tier4-closed` is a `read` outcome and the set handler consults no tier state — which `src/main/preload.ts`'s `set` comment says at this head and
  `docs/L2/secure-panels/interface.md` carries, not a row against the package (D-16).

## 2. The readings this unit took (dated; a live figure is `strata/brief.md` §6's, never this file's — D-26)

- **`npm run panes` — 7/7, exit 0, on a real renderer.** The declared set is six and the rendered set matches; the sixth row renders `☐ data (…)` in a
  `261x79` box; one click flips it to `☑`, adds `data` to the status line, and takes `tools/list` **19 → 24**, gaining exactly the five
  `provident.data.*` names as a set; a second boot on the same profile paints it on at first paint from the carrier; the second click revokes, **24 →
  19**; the five landed rows are ordered identically throughout, and no pane node is reachable from `provident.list_targets` or
  `provident.get_rendered_html` on either boot.
- **`npx vitest run tests/integration/secure-panels` — 11/11**: the arrangement, the projection's order, the click's one patch, and the record as
  bytes — zero-length, grant, revoke, then an empty list that is a record. Red-first on the same evidence before the landing: **2/7**, **8/11**.
- **The four legs**: `npm test` carried its two long-standing reds and nothing else; `typecheck`, `typecheck:tests` and `build` were clean; their live readings are `strata/brief.md` §6's (D-26, D-30).

## 3. Carried to other rows, routed and not fixed here (D-3)

- **`F-5` → the `ipc-contract` row, CARRIED:** `SecuritySettings.enabled`'s doc comment in `src/shared/types.ts` enumerates the enabled groups as four names
  — stale since `module` and again since `data` — a **fourth reader** of the group set, and a comment rather than a type, so nothing reddens on it
  (`docs/L1/secure-panels.md` §8 `F-5`).
- **`R-7` → the `security-store-storeroom` row, DISCHARGED and named so it is not re-opened:** the `set` comment in `src/main/preload.ts` now states that a
  closed tier is a `read` outcome only and a `set` commits whatever the tier state is, which is the measurement the finding asked for
  (`docs/L2/secure-panels/interface.md` §8, rev 6).
- **`gesture-session` `F-9(b)`: CARRIED.** Its sibling census has no `secure-panels` entry, so it charges this unit's artifact to itself — and
  `src/renderer/secure-panels.ts` is one of its `UNCLAIMED_PATH_CONTROL` probes, so the entry and that control must be repaired in one pass by that row
  (`tests/gesture-session.test.ts`).
- **`bundle-boot-seam` `A-4`: CARRIED, with its cause now named.** That row loads the preload artifact through `pathToFileURL(...).href`, so a
  checkout whose path carries a space hands it a `%20` URL; it failed once in four runs (`tests/integration/bundle-boot-seam/arrangement.test.ts`).

**Closed** on its exit walkthrough's `PASS`, whose run history — the run that produced D-44 among it — is that record's (`strata/records/secure-panels-walkthrough.md`; `rebuild.md` §3, D-10, D-48).
