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

_(none — REQ-GAP-1..8 resolved by 0.1.1/0.1.2; REQ-GAP-9..12 PUBLISHED in 0.1.3; DEFECT-SSR-REMOVE RESOLVED in 0.1.4; DEFECT-JOURNAL-UNDO + DEFECT-JOURNAL-REPLAY-APPEND RESOLVED in 0.1.5; ISO-ADV-D RESOLVED in 0.2.0-rc.4; see below.)_

## RESOLVED BY UPSTREAM (provident-ssr 0.2.0-rc.4, 2026-08-25)

| ID | Defect (as filed) | Resolution in 0.2.0-rc.4 | This repo's verification |
| --- | --- | --- | --- |
| **ISO-ADV-D (X13)** — `translateNodeData` `data.children` recursion drops `graphScope`, so an isolated graph's children fall into `DEFAULT_SCOPE` (an isolation leak + the rc.3 cross-graph guard rejects `state-slice` on them) | **FIXED (0.2.0-rc.4, commit `d1691cd`)** — threaded `graphScope` into the `data.children` recursion (`translate.ts:1046`), matching the def-children :835 + template/content-children :1117 sites. One-line fix as filed. | `tests/secure-panels.test.ts` (group-toggle) + `tests/isolation-adversarial-e2e.test.ts` (pane mutation/teardown) pass again; `tests/isolation-adv-d.test.ts` (1) asserts an isolated graph's child carries the scope (not resolvable from the default/app scope, resolvable from its own). **9/9 + 1 green.** |



## RESOLVED BY UPSTREAM (provident-ssr 0.1.5, 2026-08-24)

| ID | Gap (as filed) | Resolution in 0.1.5 | This repo's verification |
| --- | --- | --- | --- |
| **DEFECT-JOURNAL-UNDO** | `Supervisor.undo()` reverted only `attach`/`destroy`/`rows-mint`; a `state-slice`/`detach`/`clone-instance` undo was a silent no-op. | **FIXED (0.1.5)** — `undo()` now inverts `state-slice` EXACTLY (the journaled `sliceLayers` → removeLayer per id, hooks `hookUndo` anchor restore, `markPass2` + E2E-3 consumer walk; per-inverse try/catch, destroyed/missing silent). `detach`/`move`/`clone-instance`/`layer-apply`/`placement-attach`/`rows-clear` are now **DOCUMENTED NO-OPs** (the G14 per-kind table, ops.md §6 — each with its parked fact-set for a future user-gated pass), NOT silent gaps. | `tests/journal-reversibility.test.ts` O1 asserts state-slice undo reverts; O5/O7 assert the documented no-op pins. 9/9 green. |
| **DEFECT-JOURNAL-REPLAY-APPEND** | A `state-slice append` replayed against an already-appended array grew it (`["x"]`→`["x","x"]`→`["x","x","x","x"]`). | **FIXED (0.1.5)** — replay() now gates a state-slice whose recorded `sliceLayers` all exist (the OO-2 idempotency pattern); a replayed append never grows. `redo()` is no-journal (one entry per op, no double-undo). Clone-instance replay gates on the recorded `minted` set resolving live. | `tests/journal-reversibility.test.ts` O2/O2b/O3 assert replay idempotency. **9/9 green.** |


## RESOLVED BY UPSTREAM (provident-ssr 0.1.4, 2026-08-24)

| ID | Gap (as filed) | Resolution in 0.1.4 | Reference |
| --- | --- | --- | --- |
| **DEFECT-SSR-REMOVE** | `SSRFragmentAdapter` retained removed/destroyed elements in the serialized fragment (the adapter-parity battery P6 probe) | **FIXED (0.1.4)** — `SSRFragmentAdapter.removeEl` now detaches the fragment from its parent's `children` array, nulls its parent, purges it from `created`, and rematerializes the parent (dist/core/adapters.js:397-424) — mirroring `DomAdapter.removeEl` (PAR-5/SSR-F4 parity). The adapter-parity battery S5 now reports "SSR drops the destroyed element (parity recovered)" (73 checks, 0 failures). | handoffs-review-3.md (2026-08-23), the adapter-parity battery `docs/specs/adapter-parity-battery.md` + `docs/specs/adapter-parity-greens.md` |

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

## DOC-CONSISTENCY FINDINGS (2026-08-23 — the gemma4 blind battery)

These are NOT package gaps (no `provident-ssr` defect; the engine + host code
are consistent). They are THIS-REPO documentation defects that sent the blind
writer (`docs/specs/gemma4-blind-battery.md` → `tests/gemma4-blind-battery.test.ts`)
to wrong assertions, and one ground-truth defect in the companion
`docs/specs/gemma4-blind-expected.md`. All fixed in the same pass (the
docs below were corrected; the review record is
`archive/reviews/2026-08-23-gemma4-doc-review.md`).

| ID | Doc artifact (line) | Doc claim | LIVE behavior (probed 2026-08-23) | Class | Disposition |
| --- | --- | --- | --- | --- | --- |
| D1 | `battery-handlers-greens.md` H1 (20–24) | anon S1a rendered HTML **IS present** `dropdown-menu` (the component-def node emits it) | anon render has **NO** `dropdown-menu` — `AUTH_INIT_BODY` destroys the dropdown child (kids[1]) and destroyed nodes are pruned from the emit | CODE-CONSISTENCY (doc vs live) | greens corrected; `gemma4-blind-expected.md` S28 corrected (same claim) |
| D2 | `gemma4-blind-expected.md` S16 (35) | cycle d12 DOM view emits **4096** `data-node-id`, SSR **4095** (root adds one) | DOM **4095**, SSR **4095** — the root does NOT add a `data-node-id` occurrence in the DOM view (it carries the attr once as a node, and 4095 path-states is the full set) | CODE-CONSISTENCY (expected-map wrong; the greens/spec 4095 claim is right) | expected map corrected to 4095/4095 |
| D3 | `runtime-host.md` §3.3 + `runtime-host-greens.md` R4 #14 (F2) | an unknown op `kind` → `{status:'rejected'}` (implied for ANY op) | `op({kind:'bogus', node:<valid>})` → `{status:'no-usable-state'}` — the engine returns `no-usable-state` for an unhandled kind on a RESOLVED node; the host's `rejected` guard covers only the unknown-kind path with NO resolvable node | DOC-COMPLETENESS (the `no-usable-state` verdict is never named; the rejection vocabulary is imprecise) | runtime-host.md §3.3 + greens note the split |
| D4 | `runtime-host-greens.md` R2 (5–6) + battery S2 | "load `userEnvelope()`" | `userEnvelope` is NOT defined/pinned anywhere in the read-set — the fixture the scenario depends on is absent; a blind writer must reconstruct it from prose | DOC-COMPLETENESS | greens note the fixture is not pinned |
| D5 | `runtime-host.md` §2/§3.4 + battery S8 | `validateExport`/`validate` both named; `treeSigMatch` implied a field on the round-trip | `validateExport` returns `{valid, censusMatch, warnings}` (NO `treeSigMatch`); only the MCP `validate()` wrapper adds `treeSigMatch`. A reader can't tell which returns what | DOC-CLARITY | runtime-host.md pins the two signatures |
| D6 | battery S10/S11 (`teardown` vs `teardownResult`) | "after `teardown()` (or `await teardownResult()`)" then read `.inTree` | `teardown()` returns a bare `Census`; `teardownResult()` returns `{census, renderedHtml, warnings}`. `load()` returns `{census, …}` not a bare Census. Reading `.inTree` off the wrapper is a mis-assertion | DOC-CLARITY (return shapes never pinned) | greens + battery note the wrapper shapes |
| D7 | battery S26 / `mcp-endpoint.md` §3.1 `args` | `args?` (no array pin) | `dispatch` spreads `...args`; a non-array `args:'light'` becomes chars → `themeName="l"`; only `args:['light']` bakes `"light"` | DOC-CLARITY | mcp-endpoint.md pins `args` as an array |
| D8 | battery S13/edge `listTargets` root id | (implicit) root nodeId `'0'` | root `nodeId` is `'0'` and has NO authored `cssId` (D2/H2-correct) | PASS (no defect) | — |
| D9 | battery S22/S23 + runtime-battery greens | `codeSet`/`codeDelete` after a plain constructor boot | the constructor's `{envelope:}` option does NOT populate the CRUD `this.envelope` — `codeSet` throws `no envelope loaded` until a `loadEnvelope`/`load`. The greenspace implies a prior load but never states the constructor path | DOC-COMPLETENESS (minor) | runtime-host.md §2 notes the CRUD envelope is only set by load paths |
| D10 | battery edge + `mcp-endpoint.md` §3.1 | unknown-target → "tool error" | `dispatch` throws `unresolved target: {"kind":"cssId","cssId":"nope"}` (wording `/unresolved target/`, not `/unresolved node target/`) | DOC-CLARITY | mcp-endpoint.md pins the message shape |
| D11 | `runtime-host-greens.md` R5 #21/#22 + `gemma4-blind-expected.md` S10 | teardown mount is "root-only — `mount.innerHTML` is the root's own serialization, NOT `''`" | after `teardown()` the mount is **EMPTY** (`innerHTML === ''`, inTree === 1) — the root element is NOT re-emitted; `tests/runtime-host.test.ts:157` asserts `innerHTML === ''` | CODE-CONSISTENCY (doc vs live) | greens + expected map corrected to `''` |

## SUPERSEDED / ARCHIVED

_(none.)_