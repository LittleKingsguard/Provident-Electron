# Verification — Battery §5.3 Hooks-Scenarios (Unit: Battery Hooks)

## Methodology
1. **Extraction**: Extracted behavior from `docs/specs/battery-hooks-unit.md` and `docs/specs/battery-hooks-greens.md`.
2. **Summary**: Created `summary-battery-hooks.md`.
3. **Verification**: Executed `npm run build && node tests/e2e-battery.test.mjs` and analyzed the `§5.3 hooks-scenarios` section.

## Results
- **H1 (Load)**: PASS. `load census inTree > 1 (inTree=22)`, `renderedHtml non-empty`.
- **H2 (Theme)**: PASS. `theme-light` → `themeName="light"`, `theme-dark` → `themeName="dark"`.
- **H3 (User)**: PASS. `login` → `sessionLabel="alice (admin)"`, `logout` → `sessionLabel="guest"`.
- **H4 (Counter)**: PASS. `counter badge follows the push (count="2")`.
- **H5 (node_state)**: PASS. `node_state theme-readout bindings.theme resolved to dark`.
- **H6 (Probes)**: PASS.
    - `hook-name-unresolved`: PASS (`code=hook-name-unresolved`).
    - `hook-mode-blocked`: PASS (`code=hook-mode-blocked`).
    - `hook-kind-mismatch`: PASS (`code=hook-kind-mismatch`).
    - `hook-seam-exempt`: PASS (`status=applied` and `theme flips to light`).
- **H7 (Cleanup)**: PASS. `teardown inTree === 1`, `mount is root-only`.

**Final Status: PASS**
