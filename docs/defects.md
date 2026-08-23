# Provident-Electron — Active Defect / Requirement-Gap List

Maintained by the document-archival loop (AGENTS.md item 6). This is the
implementation-test catalogue: defects and requirement gaps discovered while
consuming `provident-ssr` (the npm package whose source lives in the adjacent
`Preempt-Providence` folder). Open gaps on top; PUBLISHED and RESOLVED rows
(with their dispositions) below. THIS PROJECT DOES NOT FIX THE
PACKAGE — every row is a handoff candidate to the upstream project (see
`docs/HANDOFF.md`).

Naming: `REQ-GAP-<n>` — a requirement gap, documentation gap, or missing
convenience for an MCP/Electron (or general non-DOM) host. Observed symptom →
reproduction → suspected root cause → proposed fix shape (upstream-owned).

## OPEN

_(none — REQ-GAP-1..8 resolved by 0.1.1/0.1.2; REQ-GAP-9..12 PUBLISHED in 0.1.3; see below.)_

## PUBLISHED (provident-ssr 0.1.3) — Round 4 / REQ-GAP-9..12

Answered by the upstream's three-agent gate
(`../Preempt-Providence/docs/specs/handoffs-review-2.md`, user rulings
2026-08-21/22) with reshapes landed in the WORKING TREE and **PUBLISHED in
provident-ssr 0.1.3** (verified in the installed dist: `createLinkHub`,
`evictDestroyedNode`/`destroyedRefs`, `markCascadeExplicit`). These rows are
the UPSTREAM dispositions; the battery's workarounds are now droppable in
favor of the published surfaces.

| ID | Gap (as filed) | Upstream disposition (published 0.1.3) | This repo's response |
| --- | --- | --- | --- |
| **REQ-GAP-9** | No public `LinkConfigNameHub` factory / no documented `loadState`→graph construction | **PASS-WITH-RESHAPE** — `createLinkHub()` exported (`translate.ts:185`, the barrel) + `LinkConfigNameHub` type barrel-export; the `node.ts:463` seed hub threading; the corrected 4-step recipe in serialize.md/contract.md (loadState → `new Node(d, hub)` template-first → `reconcileParentTargets(nodes)` → `supervisor.registerNode` per node, ONE hub shared). CAVEAT (user ruling): component-bearing docs → `translateLegacy(doc, {hub})`; `serializeSlice`→`loadState` is snapshot/restore-only (def-less/seam-less — rows-mint on reseed throws `rows-prototype-unresolved`; def-prototype round-trip parked). | PUBLISHED in 0.1.3 — the battery uses the exported `createLinkHub()` (no vendored hub). A1 first-class loads for component-bearing docs use `translateLegacy(doc,{hub})` (the recipe caveat). |
| **REQ-GAP-10** | No sanctioned handler-BODY-by-name injection | **PASS-WITH-RESHAPE (doc-only)** — the addLayer seam is sanctioned for PRE-MOUNT prototype/out-of-tree body setup (the fork-stress pattern); in-tree live injection uses the journaled `state-slice handlers` / `layer-apply` (function bodies per the RUNTIME-WRITE BODY LETTER); prefix rules (`slice-`/`hook-` reserved; `handler-seam` excluded from reverse); the hooks delimiter (value providers → managed channel ONLY; bodies → layer surface); D16 append-with-override precedence + clone inheritance WITHOUT teardown. `registerHandlerBody` REJECTED (eval-gate contamination). | PUBLISHED (doc-only) — the battery's pre-mount prototype injection is the sanctioned addLayer seam (import the upstream demo body + a guard test). |
| **REQ-GAP-11** | No `Supervisor` reset/unregister; destroyed nodes accumulate | **PASS-WITH-RESHAPE** — the self-evicting sweep: `finalizeDestroyed` EVICTS finalized nodes from `registered`/`byId`/`contentNodes`/`mintedByLayer` + the supervisor's `this.nodes` (the `destroyedRefs` tombstone keeps `getNode` resolution). Retention/`runtimeMinted` + in-tree/prototype nodes are untouched (the permanent-owner gate). `reset()`/`prune()`/`unregisterNode` REJECTED as new surface (wrong predicate; process-wide hazards). RequestId-per-scenario noted (the dedup window is per-supervisor; reusing a requestId across scenarios echoes stale reports — the battery uses fresh requestIds). | PUBLISHED in 0.1.3 (`evictDestroyedNode`/`destroyedRefs`) — the registry no longer grows across the battery's teardowns; the battery still asserts `inTree`/mount only (version-stable discipline, not a compromise). |
| **REQ-GAP-12** | No single clear-children op (per-child destroy loop) | **PASS-WITH-RESHAPE** — the destroy-CASCADE trigger flag: an explicit-destroy recurses EXPLICIT family children, SKIPPING placements + `'component'`-token prototypes, and routes `runtimeMinted` children to `markDestroyed` retention. The `clear-children` op REJECTED (the cascade flag fixes the real root cause — `finalizeDestroyed`'s content exemption — without a new op). **Per-child destroy STAYS the pinned teardown for fork-stress** (clones are runtimeMinted → retention; prototypes are skipped). User ruling: cascade applies to explicit children, skipping placements + component prototypes. | PUBLISHED in 0.1.3 (`markCascadeExplicit`) — the cascade handles plain family trees; fork-stress teardown keeps the per-child loop (runtimeMinted retention + prototype skip). |

## RESOLVED BY UPSTREAM (provident-ssr 0.1.1 / 0.1.2, 2026-08-21)

| ID | Gap (as filed) | Resolution in 0.1.x | Reference |
| --- | --- | --- | --- |
| **REQ-GAP-8** | `renderProducingProcess` (the canonical re-emit loop) cannot thread the opt-in `nodeIdAttribute` | **PASS (0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` now accepts the optional `renderOptions` and threads it to `emitElements`; `{ nodeIdAttribute: true }` stamps `data-node-id`, default undefined = byte-identical render. Ownership rules unchanged (caller owns prevMap, destroy-prune, caller drain, on-demand). THIS HOST NOW ADOPTS THE CANONICAL LOOP (the explicit emit-with-options loop is removed). | upstream decisions.md REQ-GAP-8 row (2026-08-21), ssr-synthetic-event.md §2.4/§4 |
| **REQ-GAP-1** | Inline handler bodies default MODERN; the legacy `(event, context)` stub is not the synthetic-event default | **PASS-AS-DOCUMENTED** — handlers.md/translate.md FORMAT MARKER pins the split; ssr-synthetic-event.md §2.3 gained the "inline defaults modern" sentence. No runtime format field on `HandlerDef` (deliberate). | handoffs-review §3.1, translate.md FORMAT MARKER |
| **REQ-GAP-2** | Runtime lookup is nodeId/wire-scoped; css.id is a render attribute only | **PASS-WITH-RESHAPE** — host-side only (by design). ssr-synthetic-event.md §2.2 pins: css.id→node is host-side, css.id is a SET (non-unique), a host index excludes destroyed/unplaced/prototype. NO engine lookup surface. | handoffs-review §3.2, ssr-synthetic-event.md §2.2 |
| **REQ-GAP-3** | Two id vocabularies + auto-mint collide in emitted HTML | **PASS-WITH-RESHAPE** — DEFECT #28 (auto-mint excluded from reverse; `json-out = json-in` restored), precedence documented (`css.id > authored props.id > mint`), and the opt-in `renderOptions: { nodeIdAttribute: true }` stamps `data-node-id` on every emitted element (DOM + SSR) — the element→graph traceability seam this host adopts. | handoffs-review §3.3/§A, DEFECT #28, ssr-synthetic-event.md §4 |
| **REQ-GAP-4** | `dispatchEvent` returns no apply/dirtied info; host derives it from the journal | **PASS** — the shared `Supervisor.dispatchAndReport(target, event, options, ...args): Promise<{results, dirtied}>` lands (additive; `dispatchEvent` unchanged). `dirtied = apply().dirtied ∪ keys(takePass2States())` (bounded, non-draining). Opt-in bounded `requestId` dedup (synchronous registration, echo semantics). This host adopts it. | handoffs-review §3.4/§C, ssr-synthetic-event.md §3 |
| **REQ-GAP-5** | Dispatch never re-renders; the re-emit loop is host-built boilerplate | **PASS (0.1.1 + 0.1.2)** — `renderProducingProcess(actionable, nodeById, adapter, prevMap, renderOptions?)` exported from core (per-tree prevMap ownership, destroy-prune, caller drain, on-demand/P4 untouched) + the public `Supervisor.flush()` deterministic settle (D2). The 0.1.2 `renderOptions` threading closes the REQ-GAP-8 residual. | handoffs-review §3.5/§B, ssr-synthetic-event.md §2.4 |
| **REQ-GAP-6** | `DomAdapter` requires a DOM at construction | **CLOSED-ALREADY-ADDRESSED** — documented (adapters.md, contract.md); non-DOM hosts route to `SSRFragmentAdapter` + producing-process graph. | handoffs-review §3.6 |
| **REQ-GAP-7** | Strict CSP silently skips function-STRING handler bodies | **PASS-WITH-RESHAPE** — distinct `handler-body-eval-blocked` warn code (EvalError / "Refused to evaluate" / CSP signature) branched before `handler-body-invalid`; translate.md/handlers.md pin that function-SOURCE bodies require `'unsafe-eval'` and hosts must read `TranslatedTree.warnings`. NOTE (environment constraint, not package-fixed): the renderer still needs `'unsafe-eval'` for function-source bodies (new Function is the data format); the fix makes the failure DETECTABLE, not avoided. | handoffs-review §3.7, translate.ts `handler-body-eval-blocked` |

## FIXED (in this repo)

_(none this pass — the battery plan is gated (e2e-test-battery-review.md) and
the 0.1.2 adoption is verified; no open gaps remain.)_

## SUPERSEDED / ARCHIVED

_(none.)_