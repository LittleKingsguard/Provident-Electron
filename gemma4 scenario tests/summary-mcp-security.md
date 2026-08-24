# Summary — MCP Security Gate & Agent Permissions (Unit A1)

## Expected Behavior
A security layer that gates MCP tool access based on permission groups (`read`, `dispatch`, `graph`, `code`) and authenticates requests via an optional bearer token. It supports immutable configuration patches.

## Inputs & Outputs
- `groupForTool(toolName)`: Input: Tool name. Output: `ToolGroup` or `null`.
- `toolAllowed(toolName, enabled)`: Input: Tool name, `Set` or `Array` of enabled groups. Output: `boolean`.
- `defaultSecurityConfig()`: Output: `{ token: null, enabled: ['read', 'dispatch'] }`.
- `authorized(headers, token)`: Input: HTTP headers, expected token. Output: `boolean`.
- `applyPatch(config, patch)`: Input: Current config, patch (`groups` additive, `disable` removes). Output: New `SecurityConfig`.

## Error Conditions
- `toolAllowed`: Returns `false` for unknown tools.
- `authorized`: Returns `false` for token mismatch, empty headers (if token required), or malformed headers (no throw).
- `applyPatch`: Rejects the entire patch (returns unchanged config) if groups/tokens are invalid or if members are outside the allowed union.
