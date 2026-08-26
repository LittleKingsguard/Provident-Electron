# Proposal — MCP Resources for Rendered State (read-only `mcp://` URIs)

**Status**: PROPOSAL — subject to the three-agent review gate (AGENTS.md item 8:
validity → critique → change-analysis). No code yet. This is the current
SPECULATIVE row in `docs/pending.md` ("MCP resources (not just tools)").

**Date**: 2026-08-25.
**Target**: a change to THIS repo's MCP contract (`docs/specs/mcp-endpoint.md`).

## 1. The proposal

Add MCP **resources** (not just tools) so an agent can READ the app's rendered
state declaratively via `mcp://` URIs, alongside the existing
`provident.get_rendered_html` / `provident.get_node_state` tools.

Concretely, register resources on the MCP server:

| Resource (URI) | Returns |
| --- | --- |
| `mcp://provident/app` | the current rendered HTML view (DOM innerHTML + SSR fragment + census) — the `get_rendered_html` result as a resource |
| `mcp://provident/node/{nodeId}` (a resource TEMPLATE) | a single node's pass-2 resolved state — the `get_node_state` result as a resource |
| `mcp://provident/targets` | the addressable vocabulary — the `list_targets` result as a resource |

An MCP client can then `resources/read` a fixed URI or a templated node URI
rather than calling a tool. The resource read callbacks forward over the SAME
`RendererBackend` IPC bridge the tools use (main → renderer → runtime).

## 2. The current speculative row (docs/pending.md)

> **MCP resources (not just tools)** for rendered HTML + node state
> (agent-visible `mcp://` URIs). | 2026-08-21 | The SDK's resource
> registration is available; the HTML is currently a tool result. A resource
> would let an agent "read" the app state declaratively. Not implemented this
> round.

## 3. Why this matters

- **Declarative reads**: some MCP clients model app state as resources (URIs
  the agent references) rather than imperative tool calls. A resource gives
  that surface.
- **Reuse**: the resource callbacks reuse the exact Runtime methods
  (`renderedHtmlResult()`, `nodeState()`, `listTargets()`) the tools already
  use — no new engine logic.

## 4. Design questions the gate must resolve

1. **URI scheme**: `mcp://provident/...` (the SDK's canonical scheme) vs a bare
   path. The SDK `registerResource` takes a URI; the default scheme is `mcp://`.
2. **Security group**: resources are READ-ONLY. Should they fall under the
   `read` tool group (gated with it) or be always-registered (like the HTTP
   token gate, independent of tool groups)?
3. **Node template vs enumerated**: a fixed resource per live node (registered
   at load) vs a single URI template `mcp://provident/node/{nodeId}` (resolved
   per read). Templates fit the 0.2 `GraphScope` reality better (nodes churn on
   load/teardown).
4. **The isolated panes graph**: MUST the resources NEVER expose the
   SecurePanels isolated graph (the app Runtime only) — same isolation
   guarantee as the tools?
5. **Stateless HTTP**: the transport is stateless (fresh McpServer per POST).
   Resources are registered per-server-build, so they ride the same stateless
   pattern the tools do — confirm no per-session state leaks.

## 5. Constraints (this repo)

- P-E6 JSON-safe boundary (resources carry the same JSON-safe snapshots).
- P-E2 graph-canon (resources read the SAME graph the tools read).
- The isolation guarantee (resources must not reach the SecurePanels graph).
- No package change — `provident-ssr` is untouched (resource callbacks are
  host-side over the existing Runtime).
