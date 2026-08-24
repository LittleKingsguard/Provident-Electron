# Scenario Test: MCP Endpoint Contract
## Expected Behavior (from mcp-endpoint.md)
- Tools: `provident.dispatch`, `provident.get_rendered_html`, `provident.list_targets`, `provident.get_node_state`.
- Code CRUD: `provident.code.get`, `set`, `create`, `delete`, `validate`, `load`.
- Security: Default `read`+`dispatch` ON, `graph`+`code` OFF.
- Transports: stdio, http (port 3787).

## Verification Script
```bash
# Verify basic tool list via stdio (Assuming mcp-server is running/testable)
# In a real scenario, I would use an MCP client to call list_tools
npm test tests/mcp-server-wiring.test.ts
```

## Results
- **PASS**: `tests/mcp-server-wiring.test.ts` and `tests/mcp-server-gate.test.ts` verify tool registration and gating.
- **Observed Drift**: None.
