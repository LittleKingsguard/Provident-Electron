# Proposal — Live Change Notification (server-initiated push after a dispatch)

**Status**: PROPOSAL — subject to the three-agent review gate (AGENTS.md item 8:
validity → critique → change-analysis). No code yet. This is the current
SPECULATIVE row in `docs/pending.md` ("Live change notification").

**Date**: 2026-08-25.
**Target**: a change to THIS repo's MCP contract (`docs/specs/mcp-endpoint.md`).

## 1. The proposal

After an agent dispatches a synthetic event (or a `load`/`op`/`teardown`/`code.load`
mutates the graph), the MCP server notifies the client that state changed, so an
agent learns of the change instead of pull-reading `get_rendered_html` on a
guess. Concretely, the renderer pushes "state changed" to main after each
re-render; main calls the SDK's notification surface:
- `sendResourceListChanged()` (the `mcp://provident/...` resource list may have
  changed — e.g. the `targets`/node set churned on a load/teardown), and/or
- `sendToolListChanged()` (the tool surface changed — e.g. a group re-gate).

The MCP server is in `src/main/mcp-server.ts`; the renderer is
`src/renderer/renderer.ts` (the app Runtime + the isolated SecurePanels graph).

## 2. The current speculative row (docs/pending.md)

> **Live change notification** (server-initiated) pushing a
> `notifications/tools/list_changed` or a resource update after every dispatch. |
> 2026-08-21 | The renderer would push to main after each re-render; main calls
> `server.sendResourceUpdated`/`sendToolListChanged`. Not implemented this round
> (the current flow is pull-based read after dispatch).

## 3. Why this matters

- **Agent efficiency / correctness**: the current flow is pull-based — an agent
  must call `get_rendered_html` to learn whether its dispatch changed anything.
  A push lets an agent react to state changes (and, for the landed MCP
  resources, invalidates a cached resource URI — the companion to the
  always-fresh-snapshot rule in `mcp-endpoint.md` §3.6).

## 4. Design questions the gate must resolve

1. **The stateless-HTTP tension (the crux).** The HTTP transport is STATELESS
   (a fresh `McpServer` + `StreamableHTTPServerTransport` per POST, with
   `sessionIdGenerator: undefined` — `mcp-server.ts:528`). A server-initiated
   notification has **no persistent session/channel to target** on HTTP. The
   stdio transport is a single long-lived session — push works there. So:
   is push feasible on HTTP at all, or is it stdio-only? If stdio-only, is that
   acceptable (the battery + headless/agent paths are stdio)?
2. **What triggers a notification**: every dispatch (chatty), or only on a
   structural change (a load/teardown that changes the node/resource set)?
   `sendToolListChanged` is meaningful only on a group re-gate; a dispatch
   doesn't change the tool list.
3. **Resource-update granularity**: does a notification mean "something changed"
   (a coarse `sendResourceListChanged`), or a specific resource URI update? The
   SDK has `sendResourceListChanged` (the LIST changed) but the MCP spec's
   per-resource update is a separate notification.
4. **Isolation**: the renderer must push from the app Runtime re-render, and
   must NOT leak that the isolated SecurePanels graph changed (the panes are
   operator-only; an agent must not learn their state through a side channel).
5. **Coalescing**: re-renders can be frequent (a dispatch → one re-render). Does
   the renderer need to coalesce pushes (e.g. per microtask/tick) to avoid
   flooding main + the client?

## 5. Constraints (this repo)

- P-E2 graph-canon: the notification reflects the app graph the tools read.
- The isolation guarantee: the SecurePanels graph's changes must never surface
  through a notification (the agent must not infer pane state).
- The stateless-HTTP reality: push may be stdio-only by construction.
- No package change — `provident-ssr` is untouched (the renderer's re-render is
  host-side; the SDK notification surface is used as-is).
