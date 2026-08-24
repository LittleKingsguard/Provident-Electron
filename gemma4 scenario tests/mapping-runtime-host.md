# Mapping — Runtime Host (Unit A)

- **Scenario R1-R3 (Loads)**:
  - `src/renderer/runtime.ts:286` (`loadEnvelope`): Implements A2 legacy envelope loading.
  - `src/renderer/runtime.ts:313` (`loadDoc`): Implements A1 serialized doc loading.
  - `src/renderer/runtime.ts:335` (`load`): MCP wrapper that dispatches to envelope, doc, or command-array load paths.

- **Scenario R4 (applyCommand)**:
  - `src/renderer/runtime.ts:359` (`applyCommand`): Implements managed-channel op application with adversarial hardening (rejects malformed commands/nodes without throwing).

- **Scenario R4 (export/validate)**:
  - `src/renderer/runtime.ts:438` (`exportLegacy`): Exports only in-tree, not-destroyed nodes to avoid census mismatch.
  - `src/renderer/runtime.ts:453` (`exportSerialized`): Serializes the current graph.
  - `src/renderer/runtime.ts:459` (`validateExport`): Validates an export using a throwaway graph and compares the census.

- **Scenario R5 (teardown)**:
  - `src/renderer/runtime.ts:497` (`teardown`): Destroys all non-root in-tree nodes and drops payloads.
  - `src/renderer/runtime.ts:508` (`teardownResult`): Async MCP wrapper that awaits the R6 settle-gate before and after teardown.

- **Scenario R6 (id-index/Census)**:
  - `src/renderer/runtime.ts:226` (`rebuildIdIndex`): Rebuilds the authored-id index (A5) for in-tree nodes.
  - `src/renderer/runtime.ts:1018` (`census`): Calculates the current graph census (registered, inTree, etc.).
