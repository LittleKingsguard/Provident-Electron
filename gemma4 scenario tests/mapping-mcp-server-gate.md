# Mapping — MCP Server Gate (Unit: MCP Server Gate)

- **Gated Registration**:
  - `src/main/mcp-server.ts:87` (`ProvidentMcpServer` class): Plumbs the `SecurityGate` into the MCP server.
  - `src/main/mcp-server.ts:137` (`allowedToolNames`): Filters `ALL_TOOLS` based on the current `SecurityGate` state.
  - `src/main/mcp-server.ts:187` (`createServer`): Registers only the allowed tools during server initialization.
  - `src/main/mcp-server.ts:141` (`applyGatePatch`): Implements the M1 live re-gate, toggling `RegisteredTool` handles and registering newly-allowed tools.
  - `src/main/mcp-server.ts:368` (`handleHttp`): Enforces the HTTP token gate before processing any POST request.
