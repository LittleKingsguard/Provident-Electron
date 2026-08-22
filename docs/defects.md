# Provident-Electron — Active Defect / Requirement-Gap List

Maintained by the document-archival loop (AGENTS.md item 6). This is the
implementation-test catalogue: defects and requirement gaps discovered while
consuming `provident-ssr` (the npm package whose source lives in the adjacent
`Preempt-Providence` folder). Open gaps on top; FIXED rows (with their fix
reference) below. THIS PROJECT DOES NOT FIX THE PACKAGE — every row is a
handoff candidate to the upstream project (see `docs/HANDOFF.md`).

Naming: `REQ-GAP-<n>` — a requirement gap, documentation gap, or missing
convenience for an MCP/Electron (or general non-DOM) host. Observed symptom →
reproduction → suspected root cause → proposed fix shape (upstream-owned).

## OPEN

_(none — REQ-GAP-1..8 are all resolved by upstream landings; see below.)_

## RESOLVED BY UPSTREAM (provident-ssr 0.1.1 / 0.1.2, 2026-08-21)

| ID | Gap (as filed) | Resolution in 0.1.x | Reference |
| --- | --- | --- | --- |
| **REQ-GAP-8** | `renderProducingProcess` (the canonical re-emit loop) cannot thread the opt-in `nodeIdAttribute` | **PASS (0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` now accepts the optional `renderOptions` and threads it to `emitElements`; `{ nodeIdAttribute: true }` stamps `data-node-id`, default undefined = byte-identical render. Ownership rules unchanged (caller owns prevMap, destroy-prune, caller drain, on-demand). THIS HOST NOW ADOPTS THE CANONICAL LOOP (the explicit emit-with-options loop is removed). | upstream decisions.md REQ-GAP-8 row (2026-08-21), ssr-synthetic-event.md §2.4/§4 |

## RESOLVED BY UPSTREAM (provident-ssr 0.1.1, 2026-08-21)

| ID | Gap (as filed) | Resolution in 0.1.1 | Reference |
| --- | --- | --- | --- |
| **REQ-GAP-1** | Inline handler bodies default MODERN; the legacy `(event, context)` stub is not the synthetic-event default | **PASS-AS-DOCUMENTED** — handlers.md/translate.md FORMAT MARKER pins the split; ssr-synthetic-event.md §2.3 gained the "inline defaults modern" sentence. No runtime format field on `HandlerDef` (deliberate). | handoffs-review §3.1, translate.md FORMAT MARKER |
| **REQ-GAP-2** | Runtime lookup is nodeId/wire-scoped; css.id is a render attribute only | **PASS-WITH-RESHAPE** — host-side only (by design). ssr-synthetic-event.md §2.2 pins: css.id→node is host-side, css.id is a SET (non-unique), a host index excludes destroyed/unplaced/prototype. NO engine lookup surface. | handoffs-review §3.2, ssr-synthetic-event.md §2.2 |
| **REQ-GAP-3** | Two id vocabularies + auto-mint collide in emitted HTML | **PASS-WITH-RESHAPE** — DEFECT #28 (auto-mint excluded from reverse; `json-out = json-in` restored), precedence documented (`css.id > authored props.id > mint`), and the opt-in `renderOptions: { nodeIdAttribute: true }` stamps `data-node-id` on every emitted element (DOM + SSR) — the element→graph traceability seam this host adopts. | handoffs-review §3.3/§A, DEFECT #28, ssr-synthetic-event.md §4 |
| **REQ-GAP-4** | `dispatchEvent` returns no apply/dirtied info; host derives it from the journal | **PASS** — the shared `Supervisor.dispatchAndReport(target, event, options, ...args): Promise<{results, dirtied}>` lands (additive; `dispatchEvent` unchanged). `dirtied = apply().dirtied ∪ keys(takePass2States())` (bounded, non-draining). Opt-in bounded `requestId` dedup (synchronous registration, echo semantics). This host adopts it. | handoffs-review §3.4/§C, ssr-synthetic-event.md §3 |
| **REQ-GAP-5** | Dispatch never re-renders; the re-emit loop is host-built boilerplate | **PASS (0.1.1 + 0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` exported from core (per-tree prevMap ownership, destroy-prune, caller drain, on-demand/P4 untouched) + the public `Supervisor.flush()` deterministic settle (D2). The 0.1.2 `renderOptions` threading closes the REQ-GAP-8 residual. | handoffs-review §3.5/§B, ssr-synthetic-event.md §2.4 |
| **REQ-GAP-6** | `DomAdapter` requires a DOM at construction | **CLOSED-ALREADY-ADDRESSED** — documented (adapters.md, contract.md); non-DOM hosts route to `SSRFragmentAdapter` + producing-process graph. | handoffs-review §3.6 |
| **REQ-GAP-7** | Strict CSP silently skips function-STRING handler bodies | **PASS-WITH-RESHAPE** — distinct `handler-body-eval-blocked` warn code (EvalError / "Refused to evaluate" / CSP signature) branched before `handler-body-invalid`; translate.md/handlers.md pin that function-SOURCE bodies require `'unsafe-eval'` and hosts must read `TranslatedTree.warnings`. NOTE (environment constraint, not package-fixed): the renderer still needs `'unsafe-eval'` for function-source bodies (new Function is the data format); the fix makes the failure DETECTABLE, not avoided. | handoffs-review §3.7, translate.ts `handler-body-eval-blocked` |

## FIXED (in this repo)

_(none this pass — the 0.1.2 adoption is verified; no open gaps remain.)_

## SUPERSEDED / ARCHIVED

_(none.)_