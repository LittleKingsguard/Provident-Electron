# Provident-Electron — Work Queue

Maintained by the document-archival loop (AGENTS.md item 6). Open work on
top; finished items move to the tracker rows they produced. This queue is
this repo's local next-steps (the upstream queue lives in
`../Preempt-Providence/docs/next-steps.md`).

## OPEN

| # | Item | Status / blocker |
| --- | --- | --- |
| 1 | **REQ-GAP-8 follow-up** — when upstream `renderProducingProcess` gains the `nodeIdAttribute`/renderOptions param, re-point the Runtime's re-emit at the canonical loop (the explicit emit-with-options loop is the current host shape). | Open (REQ-GAP-8 in defects.md). |
| 2 | **Surface `TranslatedTree.warnings` through MCP** — read translate warnings (`handler-body-eval-blocked`, `handler-body-invalid`, …) and expose them in `get_rendered_html` / a diagnostics field so an agent learns a handler was skipped (REQ-GAP-7's host-must-read-warnings pin, consumer side). | Pending — the CSP carve-out already lets our demo handlers compile; the surface is a debugging nicety. |
| 3 | **Update the renderer's debug panel** to show the live census + a copy of the SSR fragment (the `#status` area is currently "booting…"). | Pending — debugging exposure is a stated goal; the MCP tools already expose it, a visible panel is a nice-to-have. |

## DONE (2026-08-21, second pass — 0.1.1 adoption)

- Refreshed `provident-ssr` to ^0.1.1.
- Reviewed the upstream change-request landings (`docs/specs/handoffs-review.md`,
  ssr-synthetic-event.md §3/§4): REQ-GAP-1..7 dispositions.
- Adopted the shared surfaces (DECIDED: ADOPT-0.1.1-SHARED-SURFACES):
  `Supervisor.dispatchAndReport` (engine `{results, dirtied}` + opt-in
  `requestId` dedup), public `flush()`, and the opt-in `data-node-id`
  (`emitElements(…, { nodeIdAttribute: true })`). Host-side dedup + hand-rolled
  tick loop + journal-derived dirtied removed.
- Tests: `tests/runtime.test.ts` (9) + `tests/engine-surfaces.test.ts` (4) =
  13 green; `npm run typecheck` clean; `npm run build` clean; MCP e2e (both
  transports) green; real-Electron e2e green (data-node-id DOM=SSR on all 12
  elements, engine dirtied [node-5,node-3,node-1], engine dedup echo, echo).
- Trackers updated: defects.md (REQ-GAP-1..7 → RESOLVED BY UPSTREAM, REQ-GAP-8
  open), decisions.md (ADOPT row), pending.md (parked items resolved),
  HANDOFF.md (below).

## DONE (2026-08-21, first pass)

- Process port: `AGENTS.md`, `docs/defects.md`, `docs/decisions.md`,
  `docs/pending.md`, `docs/next-steps.md` (this file).
- Scaffolding: `package.json` (electron ^33, provident-ssr ^0.1.0→^0.1.1,
  @modelcontextprotocol/sdk ^1.30.0, esbuild, vitest), `tsconfig.json`,
  `vitest.config.ts`.
- Shared contract: `src/shared/types.ts` (IPC + MCP payloads),
  `src/shared/demo-envelope.ts`.
- Renderer: `src/renderer/runtime.ts` (producing-process Runtime), `renderer.ts`
  (bootstrap + bridge), `index.html`.
- Main: `src/main/main.ts`, `src/main/mcp-server.ts` (stdio + HTTP transports,
  RendererBackend IPC bridge), `src/main/preload.ts`, `src/main/standalone.ts`.
- Tests: `tests/runtime.test.ts` + `tests/helpers/dom-shim.ts` + `tests/mcp-stdio-e2e.test.mjs`.
- Verification: trio green, app boots in Electron 33, MCP e2e green.