# Mapping — Battery Handlers (Unit: Battery Handlers)

- **Handler Matrix (S1a-S10)**:
  - `src/renderer/runtime.ts:905` (`dispatch`): Handles the synthetic event dispatches that drive the handler scenarios (S1a-S10).
  - `src/renderer/runtime.ts:921` (`dispatch`): Projects handler results and errors (S8 containment) into JSON-safe formats.
  - `src/renderer/runtime.ts:165` (`render`): Prunes destroyed nodes from `prevStates` to ensure dismissed elements (S9 toast) stop rendering.
  - `src/renderer/runtime.ts:443` (`exportLegacy`): Ensures only in-tree nodes are exported, satisfying the S1a/S1b export-validate round-trip.
