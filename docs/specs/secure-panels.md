# Spec — SecurePanels: the isolated Security/Debug pane graph

**Status**: LANDED (2026-08-25 — multi-graph isolation adoption). This spec
pins the shell's implementation of the upstream `GraphScope` isolation surface
(`../Preempt-Providence/docs/specs/multi-graph-isolation-spec.md`) for the
operator-only panes.

## 1. Purpose

The shell's project-wide constraint (AGENTS.md): every non-shell UI element
must be rendered with the provident framework. The Security Settings pane is
**manual-UI-only** (mcp-endpoint.md §6.4) — an agent must never grant itself
capabilities. Both the Security pane and the Debug pane are operator-only UI
that must NOT be reachable by the MCP surface.

Prior to this adoption, the panes were hand-written HTML/DOM in `index.html`
(`settings.ts`/`debug-panel.ts`), violating the constraint, AND they lived in
the same trust domain as the app. This spec renders them as provident data in a
**SECOND, ISOLATED graph** — its own `GraphScope`, so the MCP endpoints (which
read the app Runtime) can never see/dispatch them.

## 2. The isolated graph (D1-D8 contract)

`src/renderer/secure-panels.ts` — `SecurePanels(mount)` owns a second
provident graph:

- **Own `GraphScope`** — `createIsolatedScope()` (D1). The pane graph's
  registry sets (`registered`/`byId`/`contentNodes`/`defPrototypes`/
  `mintedByLayer`/`handlerDefs`/`translateUserData` + the sweep partition) are
  scope-local — no cross-graph addressability with the app Runtime's graph.
- **Own hub** — `createLinkHub()` (per-graph Links; D1 hub-keyed).
- **Own `Supervisor`** — `new Supervisor({ events: new EventBridge(), graphScope })` (D7 per-graph bridge).
- **Own `DomAdapter`** → its own root element (`#panes`).

The app `Runtime` (the MCP surface) boots its graph WITHOUT a `graphScope`
(module singleton = today's behavior, D8). The two graphs share nothing.

## 3. The panes (authored as provident data)

The envelope (function-STRING handler bodies, `translate.md` §2):

| Pane | Node ids | Behavior |
| --- | --- | --- |
| Security Settings | `settings-pane`, `security-status`, `token-input`, `token-clear`, `token-gen`, `toggle:<group>` | token status line; token input; Clear/Regenerate buttons; one toggle per group (`read`/`dispatch`/`graph`/`code`) |
| Debug / agent visibility | `debug-pane`, `status` | the app's census + SSR preview line |

Handlers call **`window.provident.security.get/set`** — the IPC bridge
(main→renderer→main). NEVER an MCP tool. A pane handler body is a
function-STRING that reaches `window.provident.security` and applies the
change over the main-process security store, then the `SecurePanels` host
re-fetches (`refresh()`) + re-renders.

`refreshDebug(runtime)` sources the APP graph's census + SSR preview into the
panes graph's `#status` node (the app graph is read; the pane graph is where
it renders).

## 4. Isolation guarantees (the security-critical acceptance criteria)

- **No cross-graph addressability**: the pane graph uses its own `GraphScope`,
  so `Runtime.dispatch`/`get_rendered_html`/`list_targets`/`get_markdown`/
  `get_node_state` (which read the app graph) NEVER see the security controls
  or the token value. Verified: the app `Runtime.renderedHtmlResult()` +
  `listTargets()` contain no pane content (D2 — handler-def resolution is
  scope-local; a graph-A consumer binding a pane handler name can never
  resolve/compile the pane's body).
- **Manual-UI-only by construction**: pane handlers call the IPC bridge
  (`window.provident.security`), never an MCP tool. An agent with MCP access
  cannot route to these handlers (they are in the isolated graph, and the IPC
  channel is main→renderer→main only — never registered as an MCP tool).

## 5. Verification

- `tests/secure-panels.test.ts` (4) — the isolated graph renders the security
  controls as provident data; the app Runtime never sees the pane content
  (isolation); a Regenerate handler + a group-toggle handler call the IPC
  bridge, never an MCP tool.
- `tests/debug-panel.test.ts` (1) — `SecurePanels.refreshDebug` writes the
  app's census + SSR preview into the panes graph `#status` node.
- `tests/blind-renderer-debug.test.ts` (D1.1/D1.3/D2.6/D3.8/D3.9) + the
  gemma4 blind battery (S30/S31) — the Debug pane's live line, via the panes
  graph.
- Trio + battery: green on `@littlekingsguard/provident-ssr@0.2.0-rc.2`.
