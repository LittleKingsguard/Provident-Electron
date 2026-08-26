# Live Change Notification — change-analysis review (step 3 of the three-agent gate)

**Status**: change-analysis of the live-change-notification proposal (AGENTS.md
item 8). Synthesizes the step-1 validity review and step-2 critique; my own
re-read of every cited site confirms both outputs' claims. No files changed by
this document. Companion: `docs/specs/live-notification-proposal.md` (the
proposal), `docs/specs/mcp-endpoint.md` (§2 transports, §3.6 resources, §8
non-goals), `src/main/mcp-server.ts`, `src/renderer/renderer.ts`,
`src/renderer/secure-panels.ts`, `src/shared/types.ts`.

## 1. The proposal (recap)

After an agent dispatches a synthetic event (or a load/op/teardown/code.load
mutates the graph), the MCP server notifies the client that state changed, so an
agent reacts instead of pull-reading `get_rendered_html`. The renderer pushes to
main after each re-render; main calls the SDK's notification surface
(`sendResourceListChanged` / `sendToolListChanged`).

## 2. Step-1 validity verdict

**VALID-WITH-RESHAPES.** The SDK notification surfaces exist; the stateless-HTTP
tension is REAL (HTTP builds a fresh `McpServer` per POST with
`sessionIdGenerator: undefined` → no targetable push channel; stdio is the only
long-lived session); the isolation constraint is coherent. Four reshapes
required:
- Per-resource update is on the low-level `Server.sendResourceUpdated` (not the
  high-level `McpServer`), and requires a prior `resources/subscribe`.
- A new renderer→main push IPC channel must be added (invoke/reply/ready provide
  no unsolicited renderer→main push).
- Split triggers: renderer re-render → resource push; main `applyGatePatch` →
  `sendToolListChanged` (not renderer-driven).
- Acknowledge overriding `mcp-endpoint.md` §8's "No server push" non-goal.

## 3. Step-2 critique

The critique's HIGH findings converge with the validity reshapes and sharpen them:
- **H1** — a dispatch changes neither the tool list nor the resource LIST; only
  `applyGatePatch` does. Firing `sendToolListChanged`/`sendResourceListChanged`
  after a dispatch is a false claim. The correct notification for a dispatch is
  the per-resource `sendResourceUpdated({ uri })` (content change), split from
  the list-changed notifications (registration-set change).
- **H2** — the HTTP dead channel must be an ENFORCED stdio-only scope (no-op /
  surfaced marker on HTTP), not just documented — else an HTTP agent's
  "wait for state change" workflow hangs silently.
- **H3** — the push source must be the app Runtime render ONLY (a coarse "any
  re-render" hook would leak operator SecurePanels activity through the
  push channel — a privacy break of the isolation guarantee).
- **M1/M2/M3/L3** — coalescing (one notify per tool invocation), the new
  `provident:notify` IPC channel + preload + main route, an opt-in/off +
  gate-aware default-OFF notification surface, and a stdio test matrix.

## 4. Change-analysis synthesis

Both steps agree the idea is sound and matches the parked row ("the future
invalidation answer" for the landed MCP resources) — but the proposal as written
is NOT implementable without the following reshapes. It is ADDITIVE and gated.

### Reshape N1 (H1) — notification-type enum + correct triggers
Adopt a typed notification model, not a boolean "state changed":
- `resource-updated { uri }` — on a dispatch/op/load/teardown/code.load that
  changes a resource URI's CONTENT (the app + the dirtied node/{nodeId} set).
- `resource-list-changed` — ONLY on `applyGatePatch` when the resource enable-set
  changes (registration set).
- `tool-list-changed` — ONLY on `applyGatePatch` when a tool is enabled/disabled
  (main-side event; never renderer-driven).

### Reshape N2 (H2) — stdio-only push, enforced not just documented
Push is delivered ONLY on the stdio transport (the long-lived session). On HTTP
(fresh server per POST, no session), a notify attempt is a no-op with a surfaced
marker (stderr warning) — never a silent hang. The stdio-only scope is stated in
`mcp-endpoint.md` §2 and signalled to the client (a documented `instructions`
line), so an HTTP agent can detect the absence of push.

### Reshape N3 (H3) — app-Runtime-only push source + isolation guard
The push hook attaches INSIDE the app `Runtime`'s render path (or a `Runtime`
method). `SecurePanels` NEVER emits on the push channel — an operator pane action
(group toggle / token regenerate) must never surface as a push (that would leak
operator activity to the agent, breaking the isolation guarantee). A coarse
"any graph re-render" hook or a `MutationObserver` on `#panes` is a review
finding.

### Reshape N4 (M2) — new renderer→main IPC channel
Add `provident:notify` (a shared type + preload method + `ipcMain.on` route in
main that walks the live stdio `McpServer` and maps the notify into the correct
SDK call per N1). The existing `provident:invoke/reply/ready` are
request/response and cannot carry an unsolicited push.

### Reshape N5 (M3/M4) — gated + opt-in notification surface
The notification surface is a new agent-observable channel. It is DEFAULT OFF,
toggleable from the manual-UI Settings pane, and gate-aware: `resource-updated`
for a `read`-gated URI is emitted only when `read` is enabled; no notify is
emitted for an action the gate denies. An agent cannot turn on its own
observability (the manual-UI-only trust gate holds).

### Reshape N6 (M1/L3) — coalescing + test matrix
One notify per MCP tool invocation's write-side (emitted after the reply), not
per re-render (a batch/load re-renders multiple times). A stdio test matrix: a
stdio client receives the correct notification after a dispatch; `list_changed`
fires only on `applyGatePatch`; an HTTP server emits NO notification.

### Reshape N7 (validity #1) — low-level `sendResourceUpdated` + subscribe gate
The per-resource update rides the low-level `McpServer.server.sendResourceUpdated`
(`{ uri }`), and is sent only to a client that previously `resources/subscribe`d
the URI. A coarse `sendResourceListChanged` needs no subscribe. Track subscribed
URIs per client.

## 5. Recommendation

**PROCEED-WITH-RESHAPES** — but the proposal is larger than the parked row
implied: it is not "after each dispatch" but a typed, gated, stdio-only push
surface with a new IPC channel. The N1-N7 reshapes are required; N2 (stdio-only
enforcement) and N3 (app-Runtime-only source) are blocking security/privacy
reshapes. The proposal ALSO overrides the `mcp-endpoint.md` §8 "No server push"
non-goal — that is the contract change this gate exists to sanction. If the
reshapes are accepted, implementation proceeds via the normal TDD path.
