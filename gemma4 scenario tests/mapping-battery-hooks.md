# Mapping — Battery Hooks (Unit: Battery Hooks)

- **Hook Providers & Containment**:
  - `src/renderer/runtime.ts:143` (`isPlacementRouted`): Handles the bootstrap path for placement-routed trees (R-new adversarial fix).
  - `src/renderer/runtime.ts:362` (`applyCommand`): The entry point for dispatching hook-related ops (via `supervisor.apply`).
  - `src/renderer/runtime.ts:905` (`dispatch`): MCP wrapper that coordinates dispatch, rendering, and result reporting for hook scenarios.
  - **Containment Logic**: The specific rejection codes (`hook-name-unresolved`, etc.) are produced by the `provident-ssr` engine and returned through `Runtime.dispatch` at `src/renderer/runtime.ts:921`.
