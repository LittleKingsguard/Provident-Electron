# Summary — Battery §5.5 Handler-Scenarios Matrix (Unit: Battery Handlers)

## Expected Behavior
A comprehensive matrix of handler scenarios (anon, alice, main) verifying complex interactions: auth-seams, async loading, input filtering, and error containment.

## Inputs & Outputs
- `provident.load`: Loads `anonEnvelope`, `aliceEnvelope`, or `mainEnvelope`.
- `provident.dispatch`: Drives scenario-specific events (e.g., `AuthInit`, `load` for comments, `click` for weather).
- `get_rendered_html`: Output reflects handler effects (e.g., "Sign In" chip, 3 `.comment` nodes, weather temp).
- `S8 Containment`: Dispatching `broken-widget` should return a contained `Error` in `results` (e.g., `vendor-down`).

## Error Conditions
- `S8` containment: Errors must be projected to `{error: {message, name}}` over JSON; no throw.
- Teardown must restore root-only state (`inTree === 1`) to prevent cross-scenario leaks.
