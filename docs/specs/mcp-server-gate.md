# Spec — A1-W4: Plumb the SecurityGate into the MCP server + settings IPC (the fail-open fix)

Status: **SPEC** (delegation gate; LANDED 2026-08-23). Source:
`docs/specs/mcp-server-wiring.md` (the pure functions) +
`docs/specs/architecture-review.md` A1. The adversarial review confirmed the
pre-gate server was **fail-open** (all tools registered, no token check). This
unit binds the `SecurityGate` into `ProvidentMcpServer` (LANDED), with the M1
stdio re-gate widening fix (LANDED 2026-08-23).

## 1. Scope

`src/main/mcp-server.ts` registers tools unconditionally and `handleHttp` has
no token check. This unit:

1. **Gate the tool registration** — `ProvidentMcpServer` takes a `SecurityGate`;
   `createServer` registers ONLY `registeredToolNames(gate, ALL)` (deduped).
   A disabled group ⇒ that tool is not registered.
2. **HTTP token gate** — `handleHttp` calls `gate.checkRequest(headers).ok` on
   POST; on `false`, respond 401 (JSON-RPC error) BEFORE any tool runs.
   GET/DELETE ⇒ 405 (returned before the token check; the SDK stateless
   ordering — no tool runs on GET/DELETE). stdio is not token-gated
   (spawn-local).
3. **Settings IPC** — `provident:security:get` returns the gate config;
   `provident:security:set` applies a patch and re-derives registration.
   Manual-UI-only (never an MCP tool). **NOT YET LANDED** (see mcp-endpoint.md
   §6.4 status).

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
- `handleHttp` (POST /mcp): `if (!this.gate.checkRequest(headers).ok) → 401`.
- `applyGatePatch(patch)` — `this.gate = this.gate.apply(patch)` (new gate) and
  re-builds the server's registered tools. For stdio (one long-lived server),
  the refresh toggles `RegisteredTool.update({enabled})` for now-disallowed
  tools (the SDK escape hatch), AND registers any newly-allowed tools not
  already in the live `registered` map (the M1-widen fix — a widen to a
  previously-disabled group makes those tools callable on the live server).

## 3. `ALL_TOOLS` (the full registration list)

**CORRECTED 2026-09-27 (count drift):** this section previously said "the **18**
`provident.`-prefixed names" and "**7** tools under the default gate". **The live
list is 21 names** (`src/main/mcp-server.ts:281-303`, read this pass) and the
default-gate registered subset is **7** today / **8** once `provident.focus`
lands (see `docs/specs/mcp-endpoint.md` §3.8's `OWED` note; **the module trio
landed after this section was written**, which is why 18 was stale). The
`provident.`-prefixed names, all IMPLEMENTED as of Unit C (the graph +
code-CRUD tools are real, not stubs): `dispatch`, `get_rendered_html`,
`get_markdown`, `list_targets`, `get_node_state`, `code.get`, `code.validate`
(the `read` group is **6** tools — `get_markdown` was missing from this list
until **CORRECTED 2026-09-27**; with `dispatch` that is **7** live under the
default gate) + `load`, `op`,
`export`, `validate`, `teardown`, `journal` (`graph`) + `code.set`,
`code.create`, `code.delete`, `code.load`, `code.loadBatch` (`code`) + the three
**`module.install`/`module.update`/`module.list`** names (`module`, OFF by
default, gated by the two-gate `module`+`code` predicate). Under the
DEFAULT gate, only the `read`+`dispatch` subset (7 tools) registers; graph/code/
module tools are NOT present.

## 4. Verify (states)

- `new ProvidentMcpServer({backend})` (no gate) has gate = default; its
  `allowedToolNames()` = the **7** read+dispatch tools (6 `read` + `dispatch`); graph/code tools are NOT
  registered.
- `new ProvidentMcpServer({backend, gate: new SecurityGate().apply({groups:['graph']})})`
  → `provident.load` IS registered.
- `handleHttp` with a token gate: a POST without `Authorization: Bearer <token>`
  → 401; with it → proceeds.
- `applyGatePatch({groups:['code']})` → `getGateConfig().enabled` includes
  `code`; a subsequent `registerTool` for a code tool is allowed.
- `getGateConfig()` returns a COPY (mutating the returned `enabled` does not
  affect the server gate).
- **M1-widen** — `applyGatePatch({groups:['code']})` on a LIVE stdio server
  REGISTERS the newly-allowed code tools (`registeredEnabled('provident.code.load')`
  → `true`); a narrow then re-widen to a new group lands the tools callable.
