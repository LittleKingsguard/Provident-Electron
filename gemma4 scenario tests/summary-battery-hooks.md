# Summary — Battery §5.3 Hooks-Scenarios (Unit: Battery Hooks)

## Expected Behavior
A specialized test unit verifying the "hooks" mechanism where data providers (theme, user, counter) are updated via `dispatch` and consumed by other nodes. Includes containment probes for error codes.

## Inputs & Outputs
- `provident.load {kind:'envelope', envelope: hooksScenariosEnvelope()}`: Loads the hooks fixture.
- `provident.dispatch`: Triggers control buttons (e.g., `theme-light-btn`) to update hook values.
- `get_rendered_html`: Output should contain derived attributes (e.g., `themeName="light"`, `count="2"`).
- `get_node_state`: Output shows resolved `bindings` for consumer nodes.
- Containment Probes: Dispatching specific probes should return `results[].error.code` values:
    - `hook-name-unresolved`
    - `hook-mode-blocked`
    - `hook-kind-mismatch`
    - `hook-seam-exempt` (status `applied`, but value unchanged).

## Error Conditions
- Hook rejections appear as `error.code` in `dispatch.results`, never as throws.
- `hook-seam-exempt` is not an error but a silent ignore (layer not landed).
