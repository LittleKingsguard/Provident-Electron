# Scenario Test: Runtime Host (Unit A)
## Expected Behavior (from runtime-host.md)
- `loadEnvelope`: Replaces graph, supports `userData`.
- `applyCommand`: Managed channel ops, rejects unknown kinds/nodes without throwing.
- `teardown`: Restores root-only (`inTree === 1`).
- `id-index`: Fast resolution of cssId/propsId.

## Verification Script
```bash
npm test tests/runtime-host.test.ts tests/blind-runtime-host.test.ts
```

## Results
- **PASS**: `tests/blind-runtime-host.test.ts` (39 tests) covers load, apply, export, and teardown.
- **Observed Drift**: None.
