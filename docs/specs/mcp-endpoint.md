# Spec — MCP Endpoint Contract (Provident-Electron)

Status: LANDED (2026-08-21). This repo's behavior contract (AGENTS.md item 5):
full synthetic-event access + rendered-HTML visibility for MCP endpoints, for
agentic use and debugging exposure. It implements the upstream project's
parked **Phase C** (cross-process MCP/Electron endpoint —
`../Preempt-Providence/docs/pending.md`, decisions.md EVENT-DISPATCH-WIRING
Phase C) as a CONSUMER: no engine, no adapter, no render change.

## 1. Scope

An Electron shell ("Provident-Electron") runs the provident-ssr producing
process (the Phase B contract's P1 pattern) in the renderer, renders the demo
into the DOM (`DomAdapter`) and mirrors the same op stream into an
`SSRFragmentAdapter`. An MCP server in the main process exposes the app to
agents over two transports. The MCP tools are the "endpoints".

The producing graph is authoritative: a synthetic event mutates the graph
(Phase A `Supervisor.dispatchEvent` + the flush); the HTML is a view
(re-emitted on demand). This is the Phase B graph-canon / fragment-is-a-view
pin — the HTML never "reacts" on its own.

## 2. Transports

| Transport | Selector | Binding |
| --- | --- | --- |
| Streamable HTTP (default) | `--mcp-transport=http` / `PROVIDENT_MCP_TRANSPORT=http` | `http://127.0.0.1:<port>/mcp` (default 3787; `--mcp-port` / `PROVIDENT_MCP_PORT`) |
| stdio | `--mcp-transport=stdio` / `PROVIDENT_MCP_TRANSPORT=stdio` | the process's stdin/stdout (JSON-RPC) |

Notes:
- The HTTP transport requires `globalThis.crypto` (Node ≥19 / Electron ≥20
  embedded Node). The plain-Node dev shell (v18) cannot serve the HTTP path —
  verified inside Electron only. stdio is the plain-Node fallback.
- The main process is bundled CJS (`main.cjs`) because Electron's ESM main
  cannot `require()` CJS node builtins (the MCP SDK needs them).
- The HTTP transport is STATELESS: a fresh McpServer + transport per POST
  (the SDK's canonical stateless pattern); GET/DELETE → 405.
- The renderer's CSP must allow `'unsafe-eval'` — provident-ssr instantiates
  function-STRING handler bodies via `new Function` at translate; a strict CSP
  silently skips every string-body handler (REQ-GAP-7).

## 3. Tools (the MCP surface)

| Tool | Input | Returns |
| --- | --- | --- |
| `provident.dispatch` | `{ target, event, args?, requestId? }` | `{ results, dirtied, renderedHtml, ssrHtml, deduplicated? }` |
| `provident.get_rendered_html` | `{}` | `{ renderedHtml, ssrHtml, census }` |
| `provident.list_targets` | `{}` | `{ nodes: [{ nodeId, cssId?, propsId?, type, content, state, inTree, handlers }] }` |
| `provident.get_node_state` | `{ target }` | `{ nodeId, states, census }` |

### 3.1 `provident.dispatch`

Synthetic-event access (the goal #1 surface). Semantics (imported Phase A/B +
the 0.1.1 shared dispatch-report surface, ssr-synthetic-event.md §3):

- **target** — the Phase B two-vocabulary addressability:
  `{ kind: 'cssId', cssId }` (ergonomic, authored), `{ kind: 'nodeId',
  nodeId }` / `{ kind: 'wire', wire }` (authoritative), or a bare string
  resolved css.id → props.id → nodeId. Host-side resolution only
  (REQ-GAP-2); unknown target → tool error.
- **event / args** — `Supervisor.dispatchAndReport(nodeId, event, options,
  ...args)` (the shared engine surface). `args` are structured-clone-safe JSON
  (the Phase C concern); the handler's first-arg semantics depend on the
  handler's authored convention (REQ-GAP-1: modern `(ctx, value)` default vs
  `format: 'legacy'`).
- **flush-before-response** — `dispatchAndReport` awaits the engine's public
  `flush()` internally (deterministic settle; no host tick loop), then derives
  `dirtied = apply().dirtied ∪ keys(takePass2States())` (bounded,
  non-draining).
- **re-render** — the host then refreshes its render baseline from the
  NON-draining resolved store (`getResolvedStates` for each dirtied id) and
  runs its re-emit loop against BOTH adapters; the response carries the fresh
  `renderedHtml` (live `#app`) + `ssrHtml` (SSR re-emit) (REQ-GAP-5).
- **dirtied** — engine-derived (see above); a duplicate `requestId` echoes the
  first caller's report.
- **requestId** — idempotency is ENGINE-owned: `dispatchAndReport`'s opt-in
  bounded LRU dedup (ssr-synthetic-event.md §3.3) — a duplicate within the
  window (same requestId AND same (target, event)) returns the FIRST caller's
  report. No host-side dedup.

### 3.2 `provident.get_rendered_html`

Rendered-HTML visibility (goal #2 surface). Returns the live DOM innerHTML of
the mount, the SSR fragment re-emitted from the SAME graph (PAR-5 parity
view), and a node/compile census (registered / in-tree / unplaced / destroyed
/ prototypes) for debugging exposure. Every emitted element carries
`data-node-id="<engine nodeId>"` (the opt-in `nodeIdAttribute` render option,
REQ-GAP-3/A2) in BOTH views — so an agent reading the HTML can trace each
element back to its producing graph node (element → `data-node-id` →
`Supervisor` node → compiled state → `provident.dispatch`/`get_node_state`).

### 3.3 `provident.list_targets`

The addressable vocabulary for `provident.dispatch` + debugging: every live
node's nodeId, authored css.id, authored props.id, type, content, state,
in-tree flag, and declared handlers (event/phase/name). Exposes both id
vocabularies per node (REQ-GAP-3).

### 3.4 `provident.get_node_state`

The node's pass-2 resolved compiled states (read-only snapshot via
`supervisor.getResolvedStates`) + the census. For an agent inspecting why a
node resolved/unresolved after a dispatch.

## 4. Process layout

```
┌─ main (CJS bundle) ──────────────────────────────┐
│  MCP server (McpServer)                           │
│    ├─ transport: stdio  (StdioServerTransport)    │
│    └─ transport: http   (StreamableHttpServer...) │
│  RendererBackend (IPC bridge, queues until ready) │
│  BrowserWindow (loads dist/renderer/index.html)   │
└───────────────┬───────────────────────────────────┘
                │ ipcMain/ipcRenderer: provident:invoke/reply/ready
┌───────────────▼───────────────────────────────────┐
│─ preload (contextBridge: window.provident) ───────┤
└───────────────┬───────────────────────────────────┘
┌───────────────▼──────────── renderer (ESM) ───────┐
│  Runtime: translateLegacy → Supervisor+EventBridge │
│           → register → compile → recordResolved    │
│           → DomAdapter render + SSRFragmentAdapter │
│  dispatch / renderedHtml / listTargets / nodeState │
└────────────────────────────────────────────────────┘
```

IPC payloads (`src/shared/types.ts`): `RpcRequest { id, method, payload }` /
`RpcReply { id, ok, value|error }` on `provident:invoke` /
`provident:reply`; `provident:ready` gates the backend until the renderer
boots. All payloads are JSON-safe (structured-clone).

## 5. Pins (this repo)

- P-E1 **No package edit**: `node_modules/provident-ssr/` and
  `../Preempt-Providence/` are never modified; every gap lands in
  `docs/defects.md` + `docs/HANDOFF.md`.
- P-E2 **Graph-canon, fragment-is-a-view**: dispatch mutates the graph; the
  returned HTML is freshly re-emitted. Never "the HTML reacts".
- P-E3 **Two transports, one tool surface**: stdio and HTTP expose identical
  tools.
- P-E4 **Idempotent dispatch**: `requestId` dedup is ENGINE-owned (the 0.1.1
  opt-in bounded LRU — a duplicate echoes the first report). Exact echo within
  the window; best-effort under pressure (a dropped entry re-fires).
- P-E5 **Flush before response**: `dispatchAndReport` awaits the engine
  `flush()` internally; no result is returned before the apply cascade
  settled and the re-render ran.
- P-E6 **JSON-safe boundary**: args/results never carry live objects or
  functions (structured-clone discipline).
- P-E7 **Authored ids exposed**: `list_targets` reports css.id and props.id
  per node (both id vocabularies), so an agent can choose a target.
- P-E8 **data-node-id present (opt-in)**: every rendered element carries its
  engine nodeId in DOM and SSR views (the host opted in); presence is a
  renderer decision, never a reader assumption (ssr-synthetic-event.md §4).

## 6. Non-goals

- No engine/adapter/render change (upstream-owned; REQ-GAP-1..6 are the
  catalogue, not this repo's fixes).
- No browser hydration path (browsers get real DOM events + hydration;
  render.md §7). Real DOM events are wired through the same `DomAdapter.onEvent`
  seam, but the MCP surface is synthetic-event + read.
- No server push (pending.md SPECULATIVE rows) — the current surface is
  pull-based read-after-dispatch.

## 7. Verification

- `tests/runtime.test.ts` (9) pins the Runtime's MCP-facing operations against
  a DOM shim: bootstrap render, the opt-in `data-node-id` on every element
  (DOM = SSR), target listing, css.id dispatch mutation + re-render of both
  views, engine-derived `dirtied`, `event.value` echo, bare-string + unknown
  targets, engine-owned `requestId` dedup echo, node state.
- `tests/engine-surfaces.test.ts` (4) pins the adopted 0.1.1 shared surfaces
  directly (parity with the upstream contract): `dispatchAndReport`
  {results, dirtied} after an awaited flush, opt-in bounded `requestId` dedup
  (echo; a different key re-fires), `flush()` deterministic settle, and the
  `data-node-id` opt-in (DOM + SSR).
- `tests/mcp-stdio-e2e.test.mjs` drives the standalone MCP server (builds
  `dist/main/standalone.mjs`) over BOTH transports with the official SDK
  client: all four tools list + respond (stdio and Streamable HTTP).
- Real-Electron end-to-end (0.1.1, verified 2026-08-21): the SDK client talks
  to the running app over HTTP → IPC → renderer graph. `data-node-id` on all
  12 elements (DOM = SSR); `provident.dispatch` on `inc` mutated the graph and
  re-rendered both views with engine-derived `dirtied` (`["node-5","node-3",
  "node-1"]`); the engine `requestId` dedup echoed the first report (counter
  stopped at 2); `event.value` echo landed; node state works.
- The full trio (test + typecheck + build) is the completion gate (AGENTS.md
  item 4).