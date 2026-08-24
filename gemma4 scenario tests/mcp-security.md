# Scenario Test: MCP Security Gate
## Expected Behavior (from mcp-security.md / mcp-server-gate.md)
- Default: `read`, `dispatch` enabled.
- `applyPatch`: `groups` is additive, `disable` removes.
- `authorized`: Constant-time token check for HTTP.
- Gating: Disabled groups are not registered/callable.

## Verification Script
```bash
npm test tests/security.test.ts tests/security-gate.test.ts tests/blind-security-gate.test.ts
```

## Results
- **PASS**: `tests/blind-security-gate.test.ts` (84 tests) verifies the a-priori contract including adversarial fixes F1-F7.
- **Observed Drift**: None.
