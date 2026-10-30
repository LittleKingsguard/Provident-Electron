# record — `secure-panels`: package findings, the readings, and what the unit carries (D-5)

- **Unit:** `secure-panels` · **Layer:** L0 at this record · **Branch:** `strata` (D-6) · **Ceiling:** 40 lines (D-1)

## 1. Package findings — `provident-storeroom`, upstream-owned, never patched (D-5)

- **No new package finding.** The zero-length boot is the sibling's, filed once as `P-1` of
  `docs/L2/security-store-storeroom/persistence.md` §9 and cited here, never re-filed.
- The asymmetry measured — a `set` while the tier-4 pair is closed **commits**, since `tier4-closed` is a
  `read` outcome and the set handler consults no tier state — is the tree's composition, not a package defect
  (`src/main/settings-surface/index.ts`'s own words; D-16).

## 2. The readings (D-26: taken by this unit, so stated here and nowhere restated)

- **`npm run panes` — 7/7, exit 0, on a real renderer.** The declared set is six and the rendered set
  matches; the sixth row renders `☐ data (…)` in a `261x79` box; one click flips it to `☑`, adds `data` to
  the status line, and takes
  `tools/list` **19 → 24**, gaining exactly the five `provident.data.*` names as a set; a second boot on the
  same profile paints it on at first paint from the carrier; the second click revokes, **24 → 19**; the five
  landed rows are ordered identically throughout, and no pane node is reachable from
  `provident.list_targets` or `provident.get_rendered_html` on either boot.
- **`npx vitest run tests/integration/secure-panels` — 11/11**: the arrangement, the projection's order, the
  click's one patch, and the record as bytes — zero-length, grant, revoke, then an empty list that is a record.
- **The four legs**: `npm test` carries its two long-standing reds and nothing else; `typecheck`,
  `typecheck:tests` and `build` are clean. Red-first on the same evidence before the landing: **2/7**, **8/11**.

## 3. Carried to other rows, routed and not fixed here (D-3)

- **F-5 → the `ipc-contract` row:** `SecuritySettings.enabled`'s comment enumerates four group names — stale
  since `module`, again since `data`: a **fourth reader**, and a comment, so nothing reddens.
- **R-7 → the `security-store-storeroom` row:** `src/main/preload.ts`'s comment says a closed-pair `set`
  answers a refusal, and it is measured to commit; `read()` also mints the refusal with `MCP: disabled`
  where the archived line pairs it with `MCP: enabled` — the surface's rule, not this pane's.
- **`gesture-session` F-9(b):** no `secure-panels` entry in its sibling list, so it charged this unit's
  artifact to itself; **`bundle-boot-seam` A-4** failed once in four runs on a `%20` `file://` import.

## 4. Owed by L0

- **The exit walkthrough.** Runs 1-3 were `STALE`, each on corpus drift and none on this unit's layers; the
  fourth found the root's own limit (D-44) and rebuilt it, so a fifth run is what closes the unit (D-10).
