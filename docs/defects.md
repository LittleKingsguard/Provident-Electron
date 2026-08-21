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

| ID | Gap | Found by | Class | Fix shape (upstream-owned) | Reproduction |
| --- | --- | --- | --- | --- | --- |
| **REQ-GAP-8** | **`renderProducingProcess` (the exported canonical re-emit loop, REQ-GAP-5's landing) does NOT thread the opt-in `RenderOptions.nodeIdAttribute`.** The loop calls `emitElements(live, nodeById)` without options (render-helpers.js), so a host that adopts the canonical loop cannot get the `data-node-id` traceability attribute (REQ-GAP-3/A2) that its own `emitElements` offers. The handoffs-review Opening A/B explicitly planned the loop absorbing the A2 option in the same pass ("an `emitElements` options parameter updates the loop in the same commit — impossible to drift"); the shipped loop omitted it. A host therefore cannot use BOTH the canonical loop AND data-node-id — it must choose (Provident-Electron kept its explicit emit-with-options loop + parity). | Provident-Electron 0.1.1 adoption (2026-08-21): the Runtime needs `data-node-id` (agent HTML addressing) but `renderProducingProcess` cannot carry it. | missing convenience (small integration gap in the landed REQ-GAP-5 surface) | Add a `renderOptions` (or `nodeIdAttribute`) parameter to `renderProducingProcess` and thread it to `emitElements`; the loop's ownership rules (per-tree prevMap, destroy-prune, caller drain, on-demand) are unchanged. Small TDD change upstream. | Call `renderProducingProcess(actionable, nodeById, adapter, prevMap)`; the returned `els` carry no `data:node-id` op prop regardless of the caller wanting it. |

## RESOLVED BY UPSTREAM (provident-ssr 0.1.1, 2026-08-21)

| ID | Gap (as filed) | Resolution in 0.1.1 | Reference |
| --- | --- | --- | --- |
| **REQ-GAP-1** | Inline handler bodies default MODERN; the legacy `(event, context)` stub is not the synthetic-event default | **PASS-AS-DOCUMENTED** — handlers.md/translate.md FORMAT MARKER pins the split; ssr-synthetic-event.md §2.3 gained the "inline defaults modern" sentence. No runtime format field on `HandlerDef` (deliberate). | handoffs-review §3.1, translate.md FORMAT MARKER |
| **REQ-GAP-2** | Runtime lookup is nodeId/wire-scoped; css.id is a render attribute only | **PASS-WITH-RESHAPE** — host-side only (by design). ssr-synthetic-event.md §2.2 pins: css.id→node is host-side, css.id is a SET (non-unique), a host index excludes destroyed/unplaced/prototype. NO engine lookup surface. | handoffs-review §3.2, ssr-synthetic-event.md §2.2 |
| **REQ-GAP-3** | Two id vocabularies + auto-mint collide in emitted HTML | **PASS-WITH-RESHAPE** — DEFECT #28 (auto-mint excluded from reverse; `json-out = json-in` restored), precedence documented (`css.id > authored props.id > mint`), and the opt-in `renderOptions: { nodeIdAttribute: true }` stamps `data-node-id` on every emitted element (DOM + SSR) — the element→graph traceability seam this host adopts. | handoffs-review §3.3/§A, DEFECT #28, ssr-synthetic-event.md §4 |
| **REQ-GAP-4** | `dispatchEvent` returns no apply/dirtied info; host derives it from the journal | **PASS** — the shared `Supervisor.dispatchAndReport(target, event, options, ...args): Promise<{results, dirtied}>` lands (additive; `dispatchEvent` unchanged). `dirtied = apply().dirtied ∪ keys(takePass2States())` (bounded, non-draining). Opt-in bounded `requestId` dedup (synchronous registration, echo semantics). This host adopts it. | handoffs-review §3.4/§C, ssr-synthetic-event.md §3 |
| **REQ-GAP-5** | Dispatch never re-renders; the re-emit loop is host-built boilerplate | **PASS** — `renderProducingProcess(actionable, nodeById, adapter, prevMap)` exported from core (per-tree prevMap ownership, destroy-prune, caller drain, on-demand/P4 untouched). Plus the public `Supervisor.flush()` deterministic settle (D2). RESIDUAL: it doesn't thread `nodeIdAttribute` — REQ-GAP-8 (open). | handoffs-review §3.5/§B, ssr-synthetic-event.md §2.4 |
| **REQ-GAP-6** | `DomAdapter` requires a DOM at construction | **CLOSED-ALREADY-ADDRESSED** — documented (adapters.md, contract.md); non-DOM hosts route to `SSRFragmentAdapter` + producing-process graph. | handoffs-review §3.6 |
| **REQ-GAP-7** | Strict CSP silently skips function-STRING handler bodies | **PASS-WITH-RESHAPE** — distinct `handler-body-eval-blocked` warn code (EvalError / "Refused to evaluate" / CSP signature) branched before `handler-body-invalid`; translate.md/handlers.md pin that function-SOURCE bodies require `'unsafe-eval'` and hosts must read `TranslatedTree.warnings`. NOTE (environment constraint, not package-fixed): the renderer still needs `'unsafe-eval'` for function-source bodies (new Function is the data format); the fix makes the failure DETECTABLE, not avoided. | handoffs-review §3.7, translate.ts `handler-body-eval-blocked` |

## FIXED (in this repo)

_(none this pass — the 0.1.1 adoption is verified; REQ-GAP-8 is the sole open row.)_

## SUPERSEDED / ARCHIVED

_(none.)_