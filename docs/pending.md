# Provident-Electron — Pending / Parked / Upstream Constraints

Maintained by the document-archival loop (AGENTS.md item 6). Three kinds of
rows: (a) PARKED — decisions deferred with their revisit condition; (b)
UPSTREAM — constraints owned by the `provident-ssr` project that this repo
must respect (imported from `../Preempt-Providence/docs/`); (c) SPECULATIVE —
recorded future proposals with their recorded constraints.

## PARKED

| Item | Date | Constraint / revisit condition |
| --- | --- | --- |
| **HEADLESS/SSR-ONLY producing process in the MAIN process** | 2026-08-21 | **UN-PARKED 2026-08-22 (design review — gate resolved).** The revisit condition was "a pure-Node MCP server using the same Runtime". The E2E-battery host (Unit D, `src/main/battery-host.ts`) is exactly that: a Node MCP server running the same `Runtime` under the DOM shim. The 0.1.3 publish additionally removes the last blocker for a true **SSR-only (no-DOM)** variant — `createLinkHub` + the self-evicting sweep + the destroy-cascade make an `SSRFragmentAdapter`-only producing process fully feasible with no vendored machinery. Adopted as the battery's Unit D (and, if wanted, a `--headless`/SSR-only MCP mode rides the same host). |
| **`requestId` idempotency + `{results, dirtied}` as an ENGINE surface** | 2026-08-21 | **RESOLVED by upstream 0.1.1** — `Supervisor.dispatchAndReport` + the opt-in bounded `requestId` dedup (echo semantics) + public `flush()` landed (ssr-synthetic-event.md §3). This host ADOPTS it; the host-side dedup is removed. No longer parked. |
| **A single canonical emitted `data-node-id`** | 2026-08-21 | **RESOLVED by upstream 0.1.1** — opt-in `renderOptions: { nodeIdAttribute: true }` (the scoped no-render-change-pin lift, REQ-GAP-3/A2). This host opts in. No longer parked. |
| **`renderProducingProcess` + `nodeIdAttribute`** | 2026-08-21 | **RESOLVED by upstream 0.1.2 (REQ-GAP-8)** — the loop gained the optional `renderOptions` param threaded to `emitElements`. This host now ADOPTS the canonical loop with `{ nodeIdAttribute: true }`. No longer parked. |
| **REQ-GAP-9..12 (the battery host conveniences)** | 2026-08-21 | **RESOLVED by upstream 0.1.3 (PUBLISHED 2026-08-22)** — `createLinkHub` + the seed-hub threading + the corrected A1 recipe; the addLayer seam letter; the self-evicting sweep; the destroy-cascade flag. No longer parked. |
| **Code-authoring trust gate (A1)** | 2026-08-22 | **DESIGN LANDED** — `mcp-endpoint.md` §6: tool groups (`read`/`dispatch` ON default, `graph`/`code` OFF) + optional loopback token (HTTP) + the manual-UI-only Settings pane. The `code.*` surface is NOT exposed until a human enables it. Implementation rides the battery Units A/C/D. |

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
| **E2E MCP test battery** (`docs/specs/e2e-test-battery.md`; gate review `docs/specs/e2e-test-battery-review.md`) — the three build mechanisms (A1 doc / A2 envelope / A3 command stream), five additive MCP tools (load/op/export/validate/teardown), fork-stress d12 placement/values/link + the new cycle-variant envelope + landings + hooks + handlers, single process no-external-reset with interface-driven teardown + the `hasPendingWork()` settle-gate. | 2026-08-21 | APPROVED-WITH-RESHAPE (gate passed 2026-08-21; reshapes R1..R16 applied; static-family correction + cycle spec 2026-08-22). REQ-GAP-9..12 PUBLISHED upstream 0.1.3. The MCP tools are host-side (no package change). Blocking gate: user go-ahead → delegated TestWriter red → Implementer green. |
| **A Node-only MCP server mode** (no Electron window): the same Runtime running under a DOM shim or SSRFragmentAdapter-only, spawned by an agent directly. | 2026-08-21 | **ADOPTED into the battery's Unit D (2026-08-22).** The E2E-battery host (`src/main/battery-host.ts`) IS this mode — a pure-Node `ProvidentMcpServer` owning the real `Runtime` under the DOM shim, spawned by the battery test over stdio. The 0.1.3 publish (createLinkHub + sweep + cascade) removes the last blocker for the SSR-only (no-DOM) variant. The Electron app remains the same contract against a real DOM; the Node host is the deterministic CI path + the one Electron-run is the divergence check (R13). No longer merely speculative — it is the battery's runtime. |
| **MCP resources (not just tools)** for rendered HTML + node state (agent-visible `mcp://` URIs). | 2026-08-21 | The SDK's resource registration is available; the HTML is currently a tool result. A resource would let an agent "read" the app state declaratively. Not implemented this round. |
| **Live change notification** (server-initiated) pushing a `notifications/tools/list_changed` or a resource update after every dispatch. | 2026-08-21 | The renderer would push to main after each re-render; main calls `server.sendResourceUpdated`/`sendToolListChanged`. Not implemented this round (the current flow is pull-based read after dispatch). |