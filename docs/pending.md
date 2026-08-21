# Provident-Electron — Pending / Parked / Upstream Constraints

Maintained by the document-archival loop (AGENTS.md item 6). Three kinds of
rows: (a) PARKED — decisions deferred with their revisit condition; (b)
UPSTREAM — constraints owned by the `provident-ssr` project that this repo
must respect (imported from `../Preempt-Providence/docs/`); (c) SPECULATIVE —
recorded future proposals with their recorded constraints.

## PARKED

| Item | Date | Constraint / revisit condition |
| --- | --- | --- |
| **HEADLESS/SSR-ONLY producing process in the MAIN process** | 2026-08-21 | PARKED (not implemented). A main-process graph using only `SSRFragmentAdapter` (no DOM, no renderer) would let the MCP server dispatch + re-emit without a BrowserWindow. Rejected for now: the user chose "Renderer DOM + IPC bridge", and REQ-GAP-6 makes DomAdapter impossible in main. Revisit if a rendererless/headless mode is wanted (Electron `--headless` or a pure-Node MCP server using the same Runtime). |
| **`requestId` idempotency + `{results, dirtied}` as an ENGINE surface** | 2026-08-21 | **RESOLVED by upstream 0.1.1** — `Supervisor.dispatchAndReport` + the opt-in bounded `requestId` dedup (echo semantics) + public `flush()` landed (ssr-synthetic-event.md §3). This host ADOPTS it; the host-side dedup is removed. No longer parked. |
| **A single canonical emitted `data-node-id`** | 2026-08-21 | **RESOLVED by upstream 0.1.1** — opt-in `renderOptions: { nodeIdAttribute: true }` (the scoped no-render-change-pin lift, REQ-GAP-3/A2). This host opts in. No longer parked. |
| **`renderProducingProcess` + `nodeIdAttribute`** | 2026-08-21 | **PARKED (REQ-GAP-8, open)** — the exported canonical loop cannot thread the opt-in option, so this host keeps its explicit emit-with-options loop. Revisit when the upstream adds the option (or when a companion package wraps the loop + options). |

## UPSTREAM (imported constraints)

| Constraint | Source | What this repo does |
| --- | --- | --- |
| NEVER edit `node_modules/provident-ssr/` or `../Preempt-Providence/` source | AGENTS.md (this repo) | All gaps recorded in `docs/defects.md` → `docs/HANDOFF.md` |
| Engine is ESM-only; `.js`-suffixed imports | upstream decisions.md NPM-PACKAGING | Renderer bundle imports `provident-ssr` barrel + `provident-ssr/core/*.js`; main is bundled CJS (the SDK's CJS export condition) |
| `on<event>="true"` is inert; synthetic events target the producing graph, never the HTML | upstream ssr-synthetic-event.md §2.3 (DOM-F12) | MCP dispatch drives `Supervisor.dispatchEvent` on the graph; HTML is a view |
| Phase A dispatch never re-renders | upstream handlers.md §3 | The Runtime calls `render()` after each dispatch (REQ-GAP-5) |
| No SSR-only render path / no `data-wire` on SSR output | upstream ssr-synthetic-event.md §3, adapters.md | The SSR re-emit goes through the same `SSRFragmentAdapter`; addressability is host-side |
| `clientConfig` gates + `content` payloads = legacy envelope semantics | upstream translate.md §1 | The demo envelope uses `runInstantiation: true, runRendering: true`, `content: []` |
| Inline handlers default to MODERN; legacy requires `format: 'legacy'` | upstream translate.ts FORMAT MARKER | Demo bodies use modern; the gap is catalogued (REQ-GAP-1) |

## SPECULATIVE

| Proposal | Date | Constraints recorded |
| --- | --- | --- |
| **A Node-only MCP server mode** (no Electron window): the same Runtime running under a DOM shim or SSRFragmentAdapter-only, spawned by an agent directly. | 2026-08-21 | Would re-use `src/renderer/runtime.ts` + the mcp-server; the DOM part needs `tests/helpers/dom-shim.ts` style shim or an SSR-only Runtime mode. Revisit when a rendererless consumer appears. |
| **MCP resources (not just tools)** for rendered HTML + node state (agent-visible `mcp://` URIs). | 2026-08-21 | The SDK's resource registration is available; the HTML is currently a tool result. A resource would let an agent "read" the app state declaratively. Not implemented this round. |
| **Live change notification** (server-initiated) pushing a `notifications/tools/list_changed` or a resource update after every dispatch. | 2026-08-21 | The renderer would push to main after each re-render; main calls `server.sendResourceUpdated`/`sendToolListChanged`. Not implemented this round (the current flow is pull-based read after dispatch). |