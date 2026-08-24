# Summary — A1-W4: MCP Server Security Wiring (Unit: MCP Server Gate)

## Expected Behavior
Binds the `SecurityGate` into the `ProvidentMcpServer` to prevent "fail-open" behavior. Tools are only registered if their group is enabled, and HTTP requests are token-gated.

## Inputs & Outputs
- `new ProvidentMcpServer({ gate })`: Server initialization.
- `allowedToolNames()`: Output: List of tools permitted by the current gate.
- `handleHttp(headers)`: Input: POST request headers. Output: 401 if `gate.checkRequest().ok` is false.
- `applyGatePatch(patch)`: Input: Patch. Output: New `SecuritySnapshot`. Updates live registration (M1-widen).

## Error Conditions
- HTTP POST requests without valid tokens return 401.
- GET/DELETE requests return 405.
- `applyGatePatch` rejects bogus groups without throwing.
