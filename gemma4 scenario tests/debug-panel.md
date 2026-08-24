# Scenario Test: Debug Panel
## Expected Behavior (from debug-panel.md)
- Reads `renderedHtmlResult()` and writes to `#status`.
- Census line: `inTree <n> · registered <n> · unplaced <n> · destroyed <n> · prototypes <n>`.
- SSR Preview: First ~120 chars, collapsed to one line.
- Read-only: No mutation of graph.

## Verification Script
```bash
npm test tests/debug-panel.test.ts tests/blind-renderer-debug.test.ts
```

## Results
- **PASS**: `tests/blind-renderer-debug.test.ts` (27 tests) verifies census formatting, SSR truncation, and stability.
- **Observed Drift**: None.
