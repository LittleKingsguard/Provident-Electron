# Summary — Runtime Host Capabilities (Unit A)

## Expected Behavior
The `Runtime` class is extended to support battery-mode host operations for MCP tools. It manages the lifecycle of a graph (load, apply commands, export, teardown) and maintains a high-performance ID index for node resolution.

## Inputs & Outputs
- `loadEnvelope(envelope, opts)`: Input: `LegacyInitialData`, optional `userData`. Output: `Census`.
- `loadDoc(doc)`: Input: `SerializedRenderDoc`. Output: `Census`.
- `applyCommand(cmd)`: Input: `OpCommand`. Output: `{ status, dirtied?, minted? }`.
- `exportLegacy()` / `exportSerialized()`: Output: `LegacyInitialData` / `SerializedRenderDoc`.
- `validateExport(kind, export)`: Input: `'legacy'|'serialized'`, export data. Output: `{ valid, censusMatch, warnings }`.
- `teardown()`: Output: `Census` (should be root-only, `inTree === 1`).

## Error Conditions
- `loadEnvelope` / `loadDoc`: Throws on malformed data; graph left in torn-down state.
- `applyCommand`: Returns `{ status: 'rejected' }` for unresolvable nodes, invalid command types, or unknown op kinds. NEVER throws.
- `validateExport`: Returns `{ valid: false }` for malformed exports or unknown kinds. NEVER throws.
- `codeDelete`: Throws `/out of range/` for invalid indices.
- `codeCreate`: Throws `/not an array/` when targeting non-array paths.
- `codeLoad`: Rejects structurally invalid edits with clear errors; does not silently tear down.
