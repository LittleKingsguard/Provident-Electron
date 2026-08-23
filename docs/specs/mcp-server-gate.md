# Spec — A1-W4: Plumb the SecurityGate into the MCP server + settings IPC (the fail-open fix)

Status: **SPEC** (delegation gate). Source: `docs/specs/mcp-server-wiring.md`
(the pure functions) + `docs/specs/architecture-review.md` A1. The adversarial
review confirmed the current server is **fail-open** (all 4 tools registered,
no token check). This unit binds the `SecurityGate` into `ProvidentMcpServer`.

## 1. Scope

`src/main/mcp-server.ts` registers tools unconditionally and `handleHttp` has
no token check. This unit:

1. **Gate the tool registration** — `ProvidentMcpServer` takes a `SecurityGate`;
   `createServer` registers ONLY `registeredToolNames(gate, ALL)` (deduped).
   A disabled group ⇒ that tool is not registered.
2. **HTTP token gate** — `handleHttp` calls `gate.checkRequest(headers).ok`;
   on `false`, respond 401 (JSON-RPC error) BEFORE any tool runs. stdio is not
   token-gated (spawn-local).
3. **Settings IPC** — `provident:security:get` returns the gate config;
   `provident:security:set` applies a patch and re-derives registration.
   Manual-UI-only (never an MCP tool).

## 2. The surface (exact)

```ts
// McpServerOptions gains:
gate?: SecurityGate        // default: new SecurityGate()

export interface SecuritySnapshot { token: string | null; enabled: ToolGroup[] }

// ProvidentMcpServer methods:
getGateConfig(): SecuritySnapshot          // gate.config (a copy)
applyGatePatch(patch: { token?: string|null; groups?: ToolGroup[]; disable?: ToolGroup[] }): SecuritySnapshot
```

- `new ProvidentMcpServer(opts)` — if `opts.gate` is absent, a fresh
  `SecurityGate()` (default read+dispatch).
- `createServer` registers only `registeredToolNames(this.gate, ALL_TOOLS)`.
- `handleHttp` (POST/GET /mcp): `if (!this.gate.checkRequest(headers).ok) →
  401`.
- `applyGatePatch(patch)` — `this.gate = this.gate.apply(patch)` (new gate) and
  re-builds the server's registered tools. For stdio (one long-lived server),
  the refresh uses `server.getRegisteredTools()` + `RegisteredTool.update(
  {enabled:false})` for now-disallowed tools (the SDK escape hatch), and
  registers any newly-allowed ones.

## 3. `ALL_TOOLS` (the full registration list)

The current 4 (`dispatch`, `get_rendered_html`, `list_targets`,
`get_node_state`) + the planned graph/code tools (`load`, `op`, `export`,
`validate`, `teardown`, `code.get`, `code.set`, `code.create`, `code.delete`,
`code.validate`, `code.load`), as `provident.`-prefixed names. Each is either
implemented (the 4) or stubbed to return an "not implemented" tool result until
Unit C lands. Under the DEFAULT gate, only the `read`+`dispatch` subset
registers; graph/code tools are NOT present.

## 4. Verify (states)

- `new ProvidentMcpServer({backend})` (no gate) has gate = default; its
  `registeredTools` (via a test-visible getter or by spy on registerTool) =
  the 4 current tools; graph/code tools are NOT registered.
- `new ProvidentMcpServer({backend, gate: new SecurityGate().apply({groups:['graph']})})`
  → `provident.load` IS registered.
- `handleHttp` with a token gate: a POST without `Authorization: Bearer <token>`
  → 401; with it → proceeds.
- `applyGateConfig({groups:['code']})` → `getGateConfig().enabled` includes
  `code`; a subsequent `registerTool` for a code tool is allowed.
- `getGateConfig()` returns a COPY (mutating the returned `enabled` does not
  affect the server gate).
