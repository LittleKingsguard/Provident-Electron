# Provident-Electron — Pending / Upstream Constraints

Maintained by the document-archival loop (AGENTS.md item 6). Two kinds of
rows: (a) UPSTREAM — constraints owned by the `provident-ssr` project that this
repo must respect (imported from `../Preempt-Providence/docs/`); (b) DEFERRED —
lower-value adversarial gaps parked until a use case surfaces.

Retired PARKED and SPECULATIVE rows are archived in
`archive/pending/2026-08-26-archival-pass.md`.

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

## DEFERRED (adversarial gaps — lower value)

| Item | Date | Constraint / revisit condition |
| --- | --- | --- |
| **Journal adversarial gap: `base-boundary` status after condense** (GAP 1) | 2026-08-26 | **PARTIALLY RESOLVED 2026-08-26.** `maxJournalLength` is now configurable via SecuritySettings; the Supervisor accepts it; the SecurePanels UI has a numeric input for it; the production chain (store → IPC → renderer → Runtime → Supervisor) is threaded (2026-08-26 fix). The condense size guard prevents base-boundary on small graphs (base snapshot ≥ journal). The host surfaces `base-boundary` status faithfully when the engine returns it. The base-boundary status is reachable only on graphs large enough that the base snapshot is smaller than the pre-base journal. |
| **Journal adversarial gap: `scheduledDirtied` contents after undo** (GAP 2) | 2026-08-26 | **DEFERRED — lower value.** The return-shape test (J-return) asserts `scheduledDirtied` exists as a property. Asserting its exact contents couples the host test to engine internals. Defer until an agent-facing use case depends on knowing WHICH nodes were dirtied. |
| **Journal adversarial gap: `stackTopKind` / `redoTopKind` after ops** (GAP 3) | 2026-08-26 | **DEFERRED — lower value.** Same reasoning as GAP 2. The return-shape test asserts these fields exist; asserting their exact values couples the host test to engine internals. Defer until an agent uses these fields to decide whether to call undo/redo again. |
| **Journal adversarial gap: zod boundary rejects malformed input** (GAP 11) | 2026-08-26 | **DEFERRED — lower value.** The MCP server uses `z.enum(['undo','redo','replay'])` for the action field. The runtime's own guard (`unknown journal action`) is the second line of defense. The existing J-invalid + J-adversarial malformed tests cover the runtime boundary; the zod boundary is an SDK-level concern. |
| **Journal adversarial gap: renderer destruction mid-flight** (GAP 12) | 2026-08-26 | **DEFERRED — hard to test (async race).** The journal op's `await this.settleGate()` is vulnerable to renderer destruction mid-flight. The `RendererBackend`'s pending-entry cleanup rejects the pending promise. Defer to A2 hardening (per-request timeouts + reload re-arm). |
