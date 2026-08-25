# Provident-Electron — Work Queue

Maintained by the document-archival loop (AGENTS.md item 6). Open work on
top; finished items move to the tracker rows they produced. This queue is
this repo's local next-steps (the upstream queue lives in
`../Preempt-Providence/docs/next-steps.md`).

## OPEN

| # | Item | Status / blocker |
| --- | --- | --- |
| 12 | **Journal reversibility stress battery (2026-08-24)** — `docs/specs/journal-reversibility-battery.md` + `docs/specs/journal-reversibility-greens.md` + `tests/journal-reversibility.test.ts` (9 tests, drives the engine's undo/redo/replay directly). **2 ENGINE DEFECTS confirmed + RESOLVED in provident-ssr 0.1.5:** `DEFECT-JOURNAL-UNDO` (state-slice undo now exact; detach/move/clone-instance/layer-apply/placement-attach/rows-clear are DOCUMENTED no-op pins in the G14 per-kind table, ops.md §6) + `DEFECT-JOURNAL-REPLAY-APPEND` (sliceLayers replay gate + no-journal redo). Destroy-undo is the documented contract pin. Host-side: none. Battery asserts the resolved contract — **9/9 green.** | **DONE (2026-08-24)** — battery green (9 tests); both journal defects resolved upstream in 0.1.5. |
| 11 | **Adapter parity battery (2026-08-23)** — `docs/specs/adapter-parity-battery.md` + `docs/specs/adapter-parity-greens.md` + `tests/adapter-parity-battery.test.mjs` (73 checks, drives the battery host over stdio). Probes DOM (`renderedHtml`) vs SSR (`ssrHtml`) across the adapter seams. **P1/P7/P8/P9 host parity GREEN** (structural digest + data-node-id set + SSR-survives-reload + fork-arm). Contract pins P2/P3/P4 documented. **P6 SURFACED AN ENGINE DEFECT**: `SSRFragmentAdapter` retained removed/destroyed elements in the serialized fragment (`DEFECT-SSR-REMOVE`) — **RESOLVED in provident-ssr 0.1.4** (the fix landed upstream; the battery now reports parity recovered, 73/73). | **DONE (2026-08-24)** — battery green; DEFECT-SSR-REMOVE resolved upstream. |

| 1 | **E2E battery — COMPLETE (Units B/C/D + R13, 2026-08-23)** (`docs/specs/e2e-test-battery.md`). All 4 fork-stress d12 variants (placement/values/link/**cycle**) + landings + handlers + code-CRUD driven over MCP, 93 battery checks green; battery host `src/main/battery-host.ts` (real Runtime under the DOM shim, all tool groups pre-enabled) + `tests/e2e-battery.test.mjs` (single process, teardown-only reset, root-only + settle-gate asserts). Cycle-variant data module `src/shared/path-fork-cycle.ts`. **R13 (Electron divergence) DONE — 9/9 checks green** via `scripts/electron-divergence.mjs`; the shim is now trusted. R13 also surfaced a host bug (stale SSR adapter collapsed re-emits across reloads) which is fixed + regression-tested. | **DONE (2026-08-23)** — complete. |
| 1a | **Unit A — host capabilities (battery mode Runtime)** — **DONE + HARDENED (TDD + adversarial)**. `src/renderer/runtime.ts` has `loadEnvelope`/`loadDoc`/`applyCommand`/`exportLegacy`/`exportSerialized`/`validateExport`/`teardown` + the id-index (A5) + compilePath placement routing (H1) + in-tree-only resolution (H2) + clean reject (H3) + the H4/H5/H6 adversarial fixes (non-object/non-Node node reject, codeDelete range check, validateExport kind discrimination). Spec `docs/specs/runtime-host.md`; `tests/runtime-host.test.ts` (16) green. | **DONE (2026-08-22)** — green. |
| 1b | **Unit B — the cycle-variant envelope data module** `pathForkCycleLegacyData(depth)` + `pathForkCycleLegacyData`-shaped cycle over the static trio (`src/shared/path-fork-cycle.ts`); census 23-node/4095-element; `tests/path-fork-cycle.test.ts` (9) green; consumed by the battery's cycle d12 variant. | **DONE (2026-08-23)** — green. |
| 1c | **Unit C — the additive MCP tools** — the 5 graph tools `load`/`op`/`export`/`validate`/`teardown` + the 6 code-CRUD tools `code.get`/`set`/`create`/`delete`/`validate`/`load` (real, replacing the M2 stubs) + `warnings` in returns (R10) + the Runtime's load/op/export/validate/teardownResult + envelope CRUD (`codeGet`/`codeSet`/`codeCreate`/`codeDelete`/`codeValidate`/`codeLoad`) + IPC wiring. `tests/runtime-battery.test.ts` (30, incl. H7..H13 adversarial + the A3-b code.load teardown pin) green. | **DONE (2026-08-23)** — green. |
| 1d | **Unit D — the battery host + runner** `src/main/battery-host.ts` + `tests/e2e-battery.test.mjs` (single-process, C4 no-external-reset, teardown-only resets), the battery-wide assertion hygiene (authored ids, non-empty dispatch, fresh requestIds), the 93-check battery. | **DONE (2026-08-23)** — battery green; R13 (Electron divergence) DONE. |
| 2 | **Surface `TranslatedTree.warnings` through MCP** — fold into `provident.load`/`validate`/`op`/`teardown`/`code.validate` returns (R10) so CSP-eval-blocked handlers are MCP-visible. | **DONE (2026-08-23)** — `warnings` returned by all battery + code tools. |
| 3 | **Renderer debug panel** — live census + SSR fragment in `#status`. `src/renderer/debug-panel.ts` (`initDebugPanel`, read-only) + `renderer.ts` wiring (refresh after bootstrap + after every MCP reply). `tests/debug-panel.test.ts` (8, incl. F1/F2 adversarial) green. Spec `docs/specs/debug-panel.md`; greens `debug-panel-greens.md`. | **DONE (2026-08-23)** — TDD red→green→adversarial→greens→doc-review. |
| 4 | **Publish-trigger refresh — DONE** — `provident-ssr@0.1.3` published the Round-4 landings; refreshed + verified. | **DONE (2026-08-22)** — the battery now drops the vendored hub (A1) and relies on the published surfaces. |

| 5 | **Architecture reshapes A1..A6**. A1 + M1/M2/M3 + Units C/D/B + A2/A3/A4/A6 LANDED. | A1 + M1/M2/M3 + Units C/D/B + A2/A3/A4/A6 DONE; A5 was DONE earlier (id-index). All reshapes complete. |
| 6 | **R13 — ONE Electron-run divergence check** — `scripts/electron-divergence.mjs` drives the real Electron app (real DOM) + the DOM-shim battery host over stdio and compares structural surfaces (census, SSR, data-node-id set, nodeId vocabulary, dirtied ids normalized for the root-only-boot offset, counter content, non-empty dispatch). **9/9 checks green.** R13 surfaced + fixed a real host bug: the `SSRFragmentAdapter` retained stale state across graph reloads, collapsing the SSR re-emit to empty (fixed: recreate the SSR adapter + reset prevMaps on load — `resetRenderState`; regression test `runtime-battery.test.ts`). | **DONE (2026-08-23)** — battery shim is now trusted for 4095-node trees. |
| 7 | **Tests close spawned server/app processes at end** — repeated test runs left orphaned Node + Electron processes (each spawn left a live BrowserWindow or a held-open Node server; the stdio transport does not auto-exit). Fixed: `main.ts`/`battery-host.ts`/`standalone.ts` all `exit` on stdin close (the client disconnect ends stdin). Verified: no lingering `main.cjs`/`battery-host`/`standalone.mjs`/electron after a full run. | **DONE (2026-08-23)** — process cleanup. |
| 8 | **Renderer `provident.teardown` IPC path awaits the async `teardownResult`** — review found the `renderer.ts` `teardown` case assigned `runtime.teardownResult()` (a Promise) to the reply value WITHOUT awaiting, so the IPC reply carried a non-JSON Promise and the R6 settle-gate never ran on that path (the twentieth-pass "all call sites awaited" claim was wrong for `renderer.ts`). Fixed: `await`. | **DONE (2026-08-23)** — TDD red→green. |
| 9 | **Manual-UI Security Settings pane (the A1 trust-gate's remaining piece, mcp-endpoint.md §6.4)** — persistence (`security-store.ts`), the `provident:security:get/set` IPC (main), the preload `window.provident.security` exposure, the renderer Settings pane (`settings.ts` + `index.html` `#settings-pane`: token show/clear/regenerate + one toggle per tool group), and the MCP server booting from the persisted config. `tests/security-store.test.ts` (5) green. | **DONE (2026-08-23)** — TDD red→green. |
| 10 | **Battery §5.3 hooks-scenarios (DEFERRED)** — `docs/specs/e2e-test-battery.md` §5.3 (the `hooksScenariosEnvelope`: theme/user/counter hook providers + the `hook-name-unresolved`/`hook-seam-exempt`/`hook-mode-blocked`/`hook-kind-mismatch` containment verdicts) was marked NOT-YET-LANDED in the spec. **§5.3 DONE (2026-08-23)** — landed per the unit spec `docs/specs/battery-hooks-unit.md` (TestWriter red → green → adversarial → greens → doc-review). **§5.5 full anon/alice/main handler matrix (S1a, S1b, S2..S10) DONE (2026-08-23)** — landed per the unit spec `docs/specs/battery-handlers-unit.md` (TestWriter red → green → adversarial → greens → doc-review). | **§5.3 + §5.5 DONE (2026-08-23)** — battery 184/184. |

## DONE (2026-08-23, twenty-seventh pass — blind scenario subagents through ALL green-scenario docs)

Per the user's "start blind scenario subagents, following the example in the
upstream project and running through all of the scenario documents written
during the build": five blind-test writers (AGENTS.md item 10a, the upstream
writer→proofreader pattern) produced artifacts from the DOCUMENTATION ONLY (no
implementation read) and ran them against the live modules, covering every
`*-greens.md` written during the build.

- **Blind writers + artifacts** (all green after the proofreader pass):
  - `runtime-host-greens.md` → `tests/blind-runtime-host.test.ts` (39).
  - `mcp-security-greens.md` + `mcp-server-gate-greens.md` →
    `tests/blind-security-gate.test.ts` (84).
  - `renderer-backend-greens.md` + `debug-panel-greens.md` →
    `tests/blind-renderer-debug.test.ts` (27).
  - `battery-hooks-greens.md` + `battery-handlers-greens.md` →
    `tests/blind-battery-hooks-handlers.test.ts` (21).
  - `ci-divergence-greens.md` → `tests/blind-ci-divergence.test.ts` (3).
  - (Plus the pre-existing `tests/blind-battery-verify.test.ts` covering
    `battery-units-greens.md`, 37.)
- **Doc drift found + fixed** (all doc-fixes, no code regression):
  - `runtime-host-greens.md` #15 (`op kind:'state'` → `'state-slice'`),
    #21/#22 (teardown mount is root-only, NOT `''` — the root stays),
    #27 (the auto-minted root has no authored `cssId`).
  - `mcp-security-greens.md` G8 #5-10 (token-only `SecurityGate` construction
    throws — fixed to the canonical `{token, enabled}` form + a note).
  - `battery-handlers-greens.md` H1/H2/leak-guard (the `dropdown-menu`/`Log out`
    strings emit from the component-def node and are NOT destroyed — assert the
    LIVE controls + root-only census, not the def-node strings).
  - `ci-divergence-leg.md` §4 (N = 9, not ≥ 10 — the settle-gate is a Runtime
    unit assertion, not in the harness).
- **Trio + battery**: **394 tests** (was 220 — the 5 blind artifacts added 174),
  typecheck clean, build clean, battery **184/184**. Findings record:
  `archive/findings/2026-08-23-blind-test-all-greens.md`.

## DONE (2026-08-23, twenty-sixth pass — Battery §5.5 handler-scenarios)

Per the user's §5.5 unit directive: the full anon/alice/main handler matrix
(S1a, S1b, S2..S10) landed via the full per-unit cadence (RCA-1..6). The spec
is `docs/specs/battery-handlers-unit.md`; the greens are
`battery-handlers-greens.md`.

- **TestWriter red** — the new §5.5 `runScenario`s failed on the FIRST target
  dispatch: `unresolved target: {"kind":"cssId","cssId":"s1a-chip"}` (the
  handlers envelopes address nodes by `props.id`, the test originally targeted
  by `css.id`). Fixed the drive path to plain-string targets (resolves via
  `props.id`). Recorded as the red set.
- **Implementer green** — `tests/fixtures/handlers-scenarios-data.mjs` (the
  data-only port of the upstream `userAuthEnvelope`/`mainEnvelope` + the 14
  handler body consts, provenance header) + `tests/e2e-battery.test.mjs` §5.5
  section (S1a anon, S1b alice + logout, S2..S10 main, each with the manual
  load-phase drive + rendered-HTML asserts + export/validate/teardown).
- **Adversarial (RCA-3)** — 3 host findings, all fixed + regression-asserted
  in the §5.5 checks (see the spec §3a table):
  - F1 — a destroyed node's stale state re-emitted forever: the self-evicting
    sweep evicts a destroyed node from `allNodes()`, and
    `renderProducingProcess` keeps a state whose `nodeById` lookup is
    `undefined` — so the destroyed toast kept rendering. Fixed: the Runtime's
    `render` prunes `prevStates` entries whose node is no longer in the
    registry (`src/renderer/runtime.ts`).
  - F2 — a contained `Error` in `dispatch.results` serialized to `{}` over
    JSON (an `Error`'s own enumerable props are empty). Fixed: `dispatch`
    projects each `Error` result to `{error:{message,name}}`.
  - F3 — `exportLegacy` included destroyed nodes, so a structurally-mutated
    seam/def-bearing envelope (S1a/S1b dropdown destroyed) failed the
    export→validate censusMatch. Fixed: `exportLegacy` exports only in-tree,
    not-destroyed content nodes.
  - No package (`provident-ssr`) defect — all host-side, none handed off.
- **Documentation review (RCA-6)** — reconciled the spec + greens + trackers:
  `e2e-test-battery.md` §5.5 status PARTIAL→LANDED + the check count; the unit
  spec header → LANDED + §3a adversarial table; next-steps #10 §5.5 DONE row;
  review record `archive/reviews/2026-08-23-battery-handlers-doc-review.md`.
- **Trio + battery** — **220 tests** (was 220 — no new unit tests; the §5.5
  checks live in the e2e battery), typecheck clean, build clean, battery
  **184/184** (was 116 — the §5.5 section adds 68 checks).

## DONE (2026-08-23, twenty-fifth pass — Battery §5.3 hooks-scenarios)

Per the user's §5.3 unit directive: the full hooks-scenarios block
(theme/user/counter value providers + the four containment verdicts) landed
via the full per-unit cadence (RCA-1..6). The spec is
`docs/specs/battery-hooks-unit.md`; the greens are `battery-hooks-greens.md`.

- **TestWriter red** — the new §5.3 `runScenario` failed on the FIRST target
  dispatch: `unresolved target: {"kind":"cssId","cssId":"theme-light-btn"}`
  (the envelope addresses nodes by `props.id`, the test originally targeted by
  `css.id`). Fixed the drive path to plain-string targets (resolves via
  `props.id`). Recorded as the red set.
- **Implementer green** — `tests/fixtures/hooks-scenarios-data.mjs` (the
  data-only port of the upstream `hooksScenariosEnvelope` + the 4 probe
  handler bodies returning the `clientAPI.apply` result + a `hooksKind`
  `'component'` declaration + a `SetTheme` def-shaped seam target) +
  `tests/e2e-battery.test.mjs` §5.3 section (dispatch 6 controls → readouts,
  node_state bindings, the 4 containment probes, export/validate/teardown).
- **Adversarial (RCA-3)** — 3 host findings, all fixed + regression-asserted
  in the §5.3 checks (see the spec §3a table):
  - F1 — readout assertions passed VACUOUSLY (button labels contain the words);
    now assert the derived `themeName=`/`sessionLabel=`/`count=` bakes.
  - H1 — `get_node_state` THREW `Converting circular structure to JSON` on any
    component-bearing node (engine `CompiledState.anchors` carry live circular
    Node/Link refs; the raw snapshot violated the `types.ts:71` JSON-safe
    contract). Fixed: `nodeState` projects a JSON-safe snapshot
    (`src/renderer/runtime.ts`), 2 regression tests in `runtime-host.test.ts`.
   - F3 seam-exempt "layer did NOT land" assertion was VACUOUS (the root
    resolves to 0 states); replaced with a functional proof (a theme dispatch
    after the probe still flips the readout — the SetTheme seam is intact).
  - No package (`provident-ssr`) defect — all host-side, none handed off.
- **Documentation review (RCA-6)** — reconciled the spec + greens + trackers:
  `e2e-test-battery.md` §5.3 status PARTIAL→LANDED + the check count; the unit
  spec header → LANDED + §3A adversarial table; next-steps #10 §5.3 DONE row;
  review record `archive/reviews/2026-08-23-battery-hooks-doc-review.md`.
- **Trio + battery** — **219 tests** (was 217 — the 2 nodeState regression
  tests), typecheck clean, build clean, battery **116/116** (was 93 — the §5.3
  section adds 23 checks).

## DONE (2026-08-23, twenty-fourth pass — #3 Renderer debug panel)

Per the user's "proceed with #3": the Renderer debug panel (live census + SSR
fragment in `#status`) landed via the full per-unit cadence (RCA-1..6:
spec → TestWriter red → Implementer green → adversarial → greens →
documentation review).

- **Spec** `docs/specs/debug-panel.md` (§2 surface `initDebugPanel(runtime):
  () => void`, §3 behavior, §4 verify, §3a adversarial, §5 wiring).
- **TestWriter red** → module-not-found (0 tests run, `debug-panel.ts` absent).
- **Implementer green** → `src/renderer/debug-panel.ts` (read-only: reads
  `runtime.renderedHtmlResult()`, writes a one-line census + a truncated SSR
  preview to `#status`); wired into `src/renderer/renderer.ts` (refresh after
  bootstrap + after every MCP reply). `tests/debug-panel.test.ts` (6) green.
- **Adversarial** → F1 (a non-number census field printed `undefined`/`NaN` →
  coerced to `?`), F2 (a non-string `ssrHtml` threw TypeError → coerced to
  `''`). Red tests → green; recorded in the spec §3a. (8 tests now.)
- **Greens** — `docs/specs/debug-panel-greens.md` (D1..D4, 10 scenarios)
  encoding the F1/F2 hardening.
- **Documentation review** (RCA-6, the new mandatory step) — reconciled the
  spec + greens + trackers against the build: fixed next-steps #3
  (Pending → DONE) + added the spec's missing §3a adversarial-findings table;
  record at `archive/reviews/2026-08-23-debug-panel-doc-review.md`.
- **Trio**: **217 tests** (was 209 — the 8 debug-panel red→green + adversarial
  tests), typecheck clean, build clean, MCP e2e both transports green, battery
  93/93.

## DONE (2026-08-23, twenty-third pass — documentation review added to the agent process + archival loop imported)

Per the user's "add documentation review to agent implementation process after
scenarios writing; import the archival loop from the upstream Preempt-Providence
project for this":

- **AGENTS.md item 10d** — added a **documentation review** step to the per-unit
  process, running AFTER the greens (before the unit is done). A read-only
  **documentation reviewer** reconciles the unit's spec + `*-greens.md` + active
  trackers against the ACTUAL build (names/signatures/return shapes/census
  claims/cross-refs/section numbers/test-counts); fixes stale entries in the
  SAME pass; appends the record to `archive/reviews/<date>-<unit>-doc-review.md`.
- **RCA-6** — the documentation review is MANDATORY per unit, not optional. A
  unit DONE row that cites no doc-review pass (or whose spec/trackers drifted
  uncaught into the next pass) is a review finding. This encodes the
  twentieth-pass design-compliance drift lesson (stale test-counts, phantom
  return fields, renumbered sections surfaced across every spec — because the
  doc review was batched late, not per-unit).
- **AGENTS.md item 6** — re-imported the full upstream Preempt-Providence
  archival loop (the cleanup-pass discipline: merge into core docs, archive
  obsolete docs into the GITIGNORED `archive/` dir, repoint every citation),
  adapted to this repo's trackers. The active-tracker list is now explicit.
- **Roles table** — gained the **Documentation reviewer** role (explore/general,
  read-only).
- **`docs/skills/process-guardrails.md`** — updated to the six guards
  (RCA-1..RCA-6) + the 9-step per-unit cadence (step 7 = the documentation
  review) + the expanded reviewer checklist.
- **`archive/` dir** — created (already gitignored) with `README.md` +
  `reviews/` + `findings/` + `defects/` topics, faithful to the upstream
  `archive/README.md` (nothing deleted; archiving is not destruction).
- No code change (process/docs only); trio green (209 tests), typecheck +
  build clean.

## DONE (2026-08-23, twenty-second pass — A2/A3/A4/A6 architecture reshapes)

Per the user's "start #5 pass": the four remaining architecture reshapes
(`docs/specs/architecture-review.md` §4) landed, each its own red→green→
adversarial→greens cycle (RCA-2/5 — split PER UNIT).

- **A2/A6 — RendererBackend lifecycle hardening** (spec
  `docs/specs/renderer-backend-hardening.md`). `RendererBackend` gains
  `RendererBackendOptions` (readyTimeoutMs/invokeTimeoutMs/largePayloadBytes)
  + test seams (`isReady`/`pendingCount`). A6: readiness-gate timeout (never
  hang forever before ready). A2: per-request timeout (never hang forever
  waiting for a reply); reload/destroy re-arm (`did-finish-load`/`closed`/
  `destroyed` reject all in-flight `pending` + re-arm the gate); bounded/digest
  large payloads (`renderedHtml`/`ssrHtml` > `largePayloadBytes` →
  `{census, digest, preview, truncated:true}`). `tests/renderer-backend.test.ts`
  (12) TDD red→green.
  - **Adversarial (F1..F6)**: F1 (initial `did-finish-load` is NOT a reload —
    `firstLoadSeen` skip); F2/F7 (stale `readyPromise` awaiter released —
    `handleReset` rejects the old gate); F3 (readiness-timer cleared on
    success); F4 (send-throw caught + pending cleaned); F5 (double-fire
    idempotent); F6 (re-attach ignores the old window's resets). Red→green.
  - **Greens**: `docs/specs/renderer-backend-greens.md` (R1..R10).
- **A3 — permanent CI divergence leg + `code.load` teardown pin** (spec
  `docs/specs/ci-divergence-leg.md`). `npm run divergence` (the
  `scripts/electron-divergence.mjs` harness, already present) runs the real
  Electron app + the DOM-shim battery host over the SAME demo + dispatch +
  compares 9 structural surfaces (9/9 green). The `code.load` teardown pin
  (`tests/runtime-battery.test.ts` A3-b): `codeLoad()` drains
  (`hasPendingWork()===false`) + clears prior userData (no leak into the
  re-derive). Red→green (the pin was already-true; it is now a regression net).
  - **Greens**: `docs/specs/ci-divergence-greens.md` (D1..D2).
- **A4 — `code.load` non-incremental cost (doc-only)** — recorded in
  `docs/specs/mcp-endpoint.md` §6.5: `code.load` is O(graph) per edit
  (whole-graph teardown + translate + compile + render), with a render
  discontinuity (prior view destroyed then rebuilt); `code.loadBatch` is a
  FUTURE surface, NOT implemented.
- **A6 stateless-HTTP idempotency note** — recorded in `decisions.md` (each
  HTTP POST builds a fresh `McpServer`; dedup is per-supervisor, not
  per-session).
- **Trio + battery + e2e + divergence**: **209 tests** (was 196 — the
  renderer-backend + A3-b red→green tests), typecheck clean, build clean,
  MCP e2e both transports green, battery 93/93, R13 divergence 9/9; no
  lingering processes.

## DONE (2026-08-23, twenty-first pass — manual-UI Security Settings pane, the A1 trust-gate completion)

Per the user's "proceed with pending change" (the manual-UI Settings pane, the
one NOT-YET-LANDED piece of `mcp-endpoint.md §6.4`):

- **Persistence store** `src/main/security-store.ts` — a JSON store in userData,
  loaded on boot, write-through; first-run default `read`+`dispatch` ON /
  `graph`+`code` OFF / token null; a corrupt file falls back to the default
  (never crashes). `tests/security-store.test.ts` (5) TDD red→green.
- **Main-process IPC** — `provident:security:get`/`set` via `ipcMain.handle`
  (`main.ts`); the MCP server is built from the persisted config on boot;
  `set` re-wires the LIVE MCP server tool-gating (`applyGatePatch`) + persists.
- **Preload** — exposes `window.provident.security.get()`/`.set(patch)` (main→
  renderer→main only).
- **Renderer Settings pane** (`src/renderer/settings.ts` + `index.html`
  `#settings-pane`) — token show/clear/regenerate + one toggle per tool group,
  reflecting the LIVE enabled set, updating the running server on change.
- The settings surface is **manual-UI-only by construction** (never an MCP tool,
  so an agent cannot grant itself capabilities) — the A1 trust gate is now
  complete.
- Trio green (**196 tests**), typecheck clean, build clean, MCP e2e both
  transports green, battery 93/93, R13 9/9; no lingering processes.

## DONE (2026-08-23, twentieth pass — design-compliance pass vs specs)

Per the user's "run design pass for compliance with specs": three read-only
compliance reviews (cluster A = mcp-endpoint + mcp-security*; cluster B =
runtime-host + e2e-test-battery + battery greens; cluster C = mcp-server-wiring
+ mcp-server-gate + their greens + architecture-review) reconciled every spec
against the running code. Findings split into doc-fixes (stale claims) and
code-fixes (contract violations); all fixed + the trio re-verified.

- **Code fixes (TDD red → green)**:
  - **M1-widen** — `applyGatePatch` did NOT register newly-allowed tools on a
    LIVE stdio server (spec `mcp-server-gate.md` §2: "registers any
    newly-allowed ones"). Fixed: `applyGatePatch` now calls `registerTools`
    for the newly-allowed names absent from the live `registered` map. Red
    test (`M1-widen`) → green.
  - **R6 settle-gate** — `teardownResult` `void`-ed the settle-gate
    (fire-and-forget), so `hasPendingWork()` was `true` after teardown
    (violating the R6 provable-quiescence contract). Fixed: `teardownResult`
    is now `async` and `await`s the settle-gate before + after `teardown()`; a
    public `hasPendingWork()` test seam added. Red test → green. The three
    sync `teardownResult()` call sites updated to `await`.
- **Doc fixes (stale claims reconciled)**:
  - `mcp-endpoint.md` — `provident.dispatch` return dropped the phantom
    `deduplicated?` field; §6.2 `graph` group gained `validate`; §6→§8 jump
    closed (renumbered §7 Pins / §8 Non-goals / §9 Verification); §9 test
    counts updated (`engine-surfaces` 4→5, `runtime-battery` 19→28); §6.4
    (manual-UI IPC) + §6.5 (A2/A3/A4/A6) marked with NOT-YET-LANDED status
    notes.
  - `e2e-test-battery.md` — `provident.op` payload corrected to
    `{command: OpCommand}`; §6 `hasPendingWork()===false` claim restated (the
    R6 settle-gate is asserted at the Runtime unit level, the async
    `teardownResult`); §5.3 hooks-scenarios + §5.5 handler matrix marked
    PARTIAL/NOT-YET-LANDED.
  - `runtime-host.md` — §2 surface cross-references the MCP wrappers
    (`load`/`op`/`export`/`validate`/`teardownResult`/`code*`) + the
    `treeSigMatch` parity; §3.3 reject shape dropped the phantom `error`
    field + lists the H3/H4 rejection sources + the async `teardownResult`;
    §3.5 `validateExport` hub-branch + H6 kind discrimination; §3.6
    userData-clear wording (fresh-supervisor rebuild) + the awaited
    settle-gate; §4 placement census depth-scaled (d12→23, depth-4→7).
  - `mcp-server-wiring.md` — §1 POST-only 401 (GET/DELETE→405 first); §4
    `httpAuthorized` restated as `gate.checkRequest().ok` (no separate
    export); §5 "5 tools"→6 + `code.load` two-part-name + 15-tool widen.
  - `mcp-server-gate.md` — status LANDED; "4 current tools"→6; "planned/
    stubbed"→implemented (Unit C); POST-only 401; M1-widen contract recorded;
    §4 verify 6-tool default + M1-widen state.
  - `architecture-review.md` §1 — tool grouping aligned with `TOOL_GROUPS`
    (read=5, dispatch=1, graph=5, code=4; 6 live under default).
  - Greens: `runtime-host-greens.md` #1 "never equality"→`>=` (equality holds
    for the no-mint demo); `battery-units-greens.md` #19 vs #34 reconciled
    (cycle = `registered===23`; e2e runner = `>= 23` version-stable);
    `mcp-server-gate-greens.md` W3 `httpAuthorized` restated via
    `checkRequest().ok`; `mcp-security-greens.md` G6#38 "authorization error"
    → "not registered (tool not found)"; `mcp-security-gate.md`
    `checkRequest` signature widened to the post-hardening `unknown|null`.
  - Test tighten: `runtime-battery.test.ts` non-array-commands assertion now
    matches `/not iterable/` (the greens contract).
- **Trio + battery + e2e**: **191 tests** (was 189 — the 2 new red→green
  tests), typecheck clean, build clean, MCP e2e both transports green,
  battery **93/93** green.

## DONE (2026-08-23, nineteenth pass — adversarial + blind-test green scenarios for ALL completed sections)

Per the user's "run adversarial + green scenarios draft for all completed
sections": ran the adversarial loop (AGENTS.md item 7) + drafted blind-test
green-scenario sets for every completed section. Only the A1 security gate had
a green set (`mcp-security-greens.md`); the rest were missing.

- **Adversarial (host-side findings → fixed here, never the package)** — two
  read-only adversarial reviews + empirical probes surfaced + confirmed host
  contract violations:
  - **H4 (F1/F10)** — `applyCommand`/`op` with a NON-string/non-object `node`
    value (a number/object) or a non-object command (`null`/primitive) THREW
    (`source.clone` on the raw value / a `cmd.node` read on `null`), violating
    runtime-host.md §3.3 "a rejected op never throws". Fixed: `applyCommand`
    rejects any non-object command AND any `node` that is not a string or a
    Node. Red tests → green.
  - **H5 (F8)** — `codeDelete` with an out-of-range (or negative) index silently
    returned `{ok:true, removed:undefined}` (a negative index would splice from
    the end, corrupting the envelope). Fixed: `codeDelete` throws
    `code.delete: '<path>' index <n> out of range` for a non-integer/negative/
    ≥-length index; the array is untouched. Red test → green.
  - **H6 (F5)** — `validateExport('bogus', …)` silently took the serialized
    path instead of an explicit invalid-kind verdict; now returns
    `{valid:false}`. (Already failing-closed; recorded in the spec §3a table.)
- **Green-scenario drafts (blind-test sets)** — one per completed section,
  verified against the running code before landing:
  - `docs/specs/runtime-host-greens.md` — Unit A (R1..R8: loadEnvelope/userData/
    loadDoc/applyCommand/export/validate/teardown/id-index/placement-routed/
    code-CRUD), the H1..H6 regression net.
  - `docs/specs/mcp-server-gate-greens.md` — A1-W2 wiring + A1-W4/W5 gate
    (toolForName/registeredToolNames/httpAuthorized/server gate/M1 stdio re-gate).
  - `docs/specs/battery-units-greens.md` — Unit B cycle variant + Unit C battery
    surface/code-CRUD + Unit D battery host/runner (B1/C1/B3/B4/C1/D1).
- **Specs reconciled**: `docs/specs/runtime-host.md` §3a gained the H4/H5/H6
  rows (the host-side adversarial fixes).
- **Trio + battery + e2e**: **144 tests** (was 141 — the 3 adversarial red→green
  tests added), typecheck clean, build clean, MCP e2e (stdio + HTTP) green,
  battery **93/93** green.

## DONE (2026-08-23, eighteenth pass — full battery: Units B/C/D + cycle variant + R13 divergence)

Per the user's "proceed with full battery":
- **Unit B** — `src/shared/path-fork-cycle.ts` (`pathForkCycleLegacyData(depth)`,
  the NEW static cycle variant cycling placement/values/link per layer, zero
  handlers/clones). `tests/path-fork-cycle.test.ts` (9) green.
- **Unit C** — the 5 graph tools (`load`/`op`/`export`/`validate`/`teardown`)
  + the 6 code-CRUD tools (`code.get`/`set`/`create`/`delete`/`validate`/`load`)
  are now REAL (replacing the M2 stubs), backed by new `Runtime` methods
  (`load`/`op`/`export`/`validate`/`teardownResult` + `codeGet`/`codeSet`/
  `codeCreate`/`codeDelete`/`codeValidate`/`codeLoad`) + the envelope
  (source-of-truth) store + `warnings` returns (R10). `tests/runtime-battery.test.ts` (29, incl. H7..H13) green.
- **Unit D** — `src/main/battery-host.ts` (a Node MCP server owning a REAL
  `Runtime` under the DOM shim; all tool groups pre-enabled for the CI path) +
  `tests/e2e-battery.test.mjs` (single process, teardown-only reset, root-only +
  settle-gate asserts). **93 battery checks green** across the 4 fork-stress
  d12 variants + landings + handlers + code-CRUD. The DOM shim moved to
  `src/shared/dom-shim.ts` so the host can import it.
- Trio green (**141 tests**), typecheck + build clean, MCP e2e (both transports)
  green.
- **R13 (the last battery gate) DONE**: `scripts/electron-divergence.mjs` drives
  the real Electron app (real DOM) + the DOM-shim battery host over stdio and
  compares structural surfaces (census, SSR, data-node-id set, nodeId
  vocabulary, dirtied ids normalized for the root-only-boot offset, counter
  content, non-empty dispatch). **9/9 checks green — the shim is now trusted
  for 4095-node trees.** R13 also surfaced a real host bug: the
  `SSRFragmentAdapter` retained stale state across graph reloads, collapsing
  the SSR re-emit to empty. Fixed by recreating the SSR adapter + resetting
  the prevMaps on load (`resetRenderState`); regression test
  (`runtime-battery.test.ts`).

## DONE (2026-08-23, twentieth pass — process-compliance remediation: RCA + blind TDD + adversarial H7..H13 + skills)

Triggered by the user's RCA request. The original battery pass (Units B/C/D/R13)
implemented-then-tested (a process miss). This pass closed the gap:
- **RCA** documented in `docs/specs/process-rca-battery.md` (root causes: momentum
  over process, context-budget pressure, test-first affordance reused from Unit A
  rather than re-run, R13's bug-find misattributed).
- **Blind TDD** — a fresh TestWriter sub-agent (no implementation read) wrote
  `tests/blind-battery-verify.test.ts` from the greens docs ONLY. Result:
  **37/39 pass**, 2 skipped (the e2e-runner scenarios); **1 red → scenario 17**
  (`treeSigMatch:true` for a legacy round-trip). Investigated: the throwaway
  re-translate of a seam/def-bearing export emits only the root — this is the
  **R3 caveat**, not a bug. The greens doc OVER-CLAIMED `treeSigMatch:true`; fixed
  the doc + blind test to the honest R3 contract (`{valid,censusMatch}` + signal
  `treeSigMatch` is a boolean).
- **Adversarial H7..H13** (read-only sub-agent) found 7 host defects, all fixed +
  regression-tested in `tests/runtime-battery.test.ts`:
  - H7 codeDelete path-index out-of-range → now throws `/out of range/`.
  - H8 codeDelete double-splice (path element + index arg) → mutually exclusive.
  - H9 malformed path (unbalanced bracket) → rejected, no garbage key.
  - H10 validate bogus kind → valid:false (no silent serialized parse).
  - H11 op with plain-object node/source → rejected (no `.clone()` TypeError).
  - H12 op state-slice without mutation → rejected (no unhandled TypeError).
  - H13 codeLoad of a structurally-invalid envelope → rejected, not a silent
    root-only load.
  - Plus H4/F10: non-array `commands` → rejected (never a silent per-key apply).
- Suite now **191 pass / 2 skip (193)**; typecheck + build clean; battery **93/93**;
  MCP e2e both transports green; R13 9/9 green.
- The compliance checker sub-agent verdict was **PARTIAL → now CLOSED**: the red
  run is recorded (scenario 17 red→green), the adversarial findings are
  documented (`runtime-host.md §3b`) + enforced, the greens blind loop ran, and
  the stale test-count claims in next-steps (Unit C "18" → "28") are reconciled.
- **Skills + docs corrected for the RCA** (the user's follow-up): `AGENTS.md`
  items 2/3/7/10 now carry the RCA-1..RCA-5 guards (no inverted red/green; split
  multi-unit deliverables PER UNIT; adversarial pass MANDATORY per unit; greens
  blind-verified; >50%-context delegated). New process skill
  `docs/skills/process-guardrails.md` consolidates them; `docs/decisions.md`
  gained the PROCESS-GUARDRAILS row; the RCA record is
  `docs/specs/process-rca-battery.md` (closure §7).

## DONE (2026-08-22, seventeenth pass — M1/M2/M3 must-fix defects)

Per the user's direction:
- **M1 (first option)** — `applyGatePatch` now re-gates the LIVE stdio server:
  captured `RegisteredTool` handles (the SDK exposes no enumerator) are
  toggled `enabled` per the new gate, so a NARROW takes effect immediately.
  Red test (`registeredEnabled` narrow → disabled → re-enabled) → green.
- **M2 (stubs until Unit C)** — the unimplemented graph/code tools now
  register as explicit STUBS (`{ok:false, notImplemented:true, tool}`) when
  their group is enabled; `code.get`/`code.validate` (read group, default) are
  stubs too, so the gate's enabled-map and the real registration AGREE (no
  silent no-op). Confirmed by the MCP e2e: the default tool surface now
  includes the two read-group stubs.
- **M3 (doc fix)** — `docs/decisions.md` gained the M1/M2 DECIDED rows (stdio
  re-gate in place; unimplemented groups register stubs). GET→405-before-401
  recorded as intent.
- 112 tests green, typecheck + build clean, MCP e2e (both transports) green.

## DONE (2026-08-22, sixteenth pass — A1-W4/W5 gate plumbing, TDD + adversarial + handover)

- **Spec** `docs/specs/mcp-server-gate.md`. TestWriter red → Implementer green
  for the `SecurityGate` plumbing (gate option, getGateConfig, applyGatePatch,
  gate accessor) then the fail-open fix: `registerTools` registers only
  `allowedToolNames()` and `handleHttp` 401s on a failed token check.
  111 tests green, typecheck + build, MCP e2e (both transports) green.
- **Adversarial (A1-W5)** → confirmed the HTTP fail-open is closed + gating
  registration = gating dispatch (SDK-verified); left MUST-fixes **M1** (stdio
  re-gate no-op/TOCTOU), **M2** (ALL_TOOLS↔registerTools↔specs divergence —
  code.get/code.validate unregistered; graph/code enable = silent no-op),
  **M3** (decisions doc: GET→405-before-401, enable-no-op). No engine defect.
- Context threshold crossed → wrote the **handover `docs/HANDOFF-battery.md`**
  (exact next state + M1/M2/M3 + the Units C/D/B + the A2/A3/A4/A6 list + the
  process loop) for a fresh sub-agent.

## DONE (2026-08-22, fifteenth pass — A1-W3 server-wiring pure functions, TDD + adversarial)

- **Spec** `docs/specs/mcp-server-wiring.md` (`toolForName`/`registeredToolNames`
  + the httpAuthorized/registration contract).
- **TestWriter red** → `toolForName`/`registeredToolNames` not exported.
- **Implementer green** → the two pure functions; 100/100. Fixed a TestWriter
  contract ambiguity (`provident.nope` → `'nope'`, not throw).
- **Adversarial** → confirmed the pure functions are correct but **dead code**
  (the server does not gate yet — that's the NEXT wiring unit) + F2
  (`toolForName('provident.')`/double-prefix returned garbage — now fail-closed
  throw) + F3 (`registeredToolNames` kept duplicates → SDK register crash —
  now deduped). Red tests → green. 104/104, typecheck + build.
- **Engine note**: no provident-ssr defect (all host-side); the SDK's duplicate-
  registration throw + `RegisteredTool.update({enabled})` are the two SDK
  surfaces the wiring leans on.

## DONE (2026-08-22, fourteenth pass — Unit A Runtime host capabilities, TDD + adversarial + greens)

- **Spec** `docs/specs/runtime-host.md` (loadEnvelope/loadDoc/applyCommand/
  export/validate/teardown + the compilePath bootstrap + id-index).
- **TestWriter red** → 10 tests (module methods missing). Fixed a TestWriter
  contract bug (loadDoc used an impossible `{template:{}}` doc → now a valid
  serialized doc).
- **Implementer green** → the host methods + id-index added; 86/86. The
  Implementer's "dispatch catch-all fallback" was an out-of-process change
  (made a `push` event fire a `click` handler to satisfy a mis-written test) —
  I reverted it to spec dispatch and corrected the test (`event:'click'`).
- **Adversarial** → H1 (placement loads never path-enumerated → wrong 3-element
  fragment), H2 (teardown left resolvable unplaced ghosts + stale index),
  H3 (applyCommand clone-instance with bad node threw). Red tests → green:
  `compilePath` placement routing, in-tree-only id-index/resolveTarget/
  listTargets, clean reject on unresolvable node. 89/89, typecheck + build.
- **Greens** — the H1/H2/H3 fixes recorded in `runtime-host.md` §3a (the
  blind-test green scenarios).
- The adversarial-loop carve-out held: no engine defect found (compilePath/
  destroy are existing engine surfaces); all fixes are host-side.

## DONE (2026-08-22, thirteenth pass — A1-W SecurityGate unit, TDD + adversarial + greens)

- **Spec** `docs/specs/mcp-security-gate.md` (the SecurityGate class: config
  store + gate decisions shared by the MCP server + settings UI).
- **TestWriter red** → 18 tests, `SecurityGate is not a constructor`.
- **Implementer green** → `SecurityGate` added to `src/main/security.ts`
  (immutable-ish; fresh copies on construct/config/apply); 70/70.
- **Adversarial** found F-gate (HIGH: `checkRequest(null|undefined)` throws,
  violating "never throws") + F-key (MEDIUM: uppercase header keys missed).
  Red tests for both → green: `authorized`/`checkRequest` now accept null/
  undefined headers (fail-closed) + case-insensitive `header()` lookup.
  76/76, typecheck + build clean.
- **Green blind-test scenarios** `mcp-security-greens.md` Part 2 (G7..G10,
  21 scenarios + transport note) encode the F-gate/F-key hardening.
- The adversarial-loop carve-out (AGENTS.md item 7): package defects → handoff;
  host findings → fixed here.

## DONE (2026-08-22, twelfth pass — A1 adversarial review + blind-test green scenarios)

- After the A1 green, ran the adversarial sub-agent (edge cases, unauthorized
  access, malformed inputs): found F1 (crash on non-string/array `authorization`
  header), F2 (array-vs-Set `enabled` gap — the gate threw on its own config),
  F3 (garbage `token` stored), F4 (crash on non-iterable `disable`), F5
  (enabled-array aliasing), F6 (empty-string-token bypass), F7 (header-key
  casing contract). Verdict: not safe to wire as-is.
- Hardened `src/main/security.ts` to close F1..F6 (coerce header, array-or-Set
  gate, validate token/groups/disable, always-fresh array, reject empty token)
  — the 52-test suite + typecheck stay green.
- Recorded the findings + fix contract in `docs/specs/mcp-security.md` §6a and
  wrote the **blind-test green scenario set** (`docs/specs/mcp-security-greens.md`,
  38 unit scenarios + 2 transport notes) — the regression net for the
  adversarial fixes, to be run by an agent who has NOT read the implementation
  (AGENTS.md item 10 / subagents.md).

## DONE (2026-08-22, eleventh pass — A1 security-gate unit, TDD red→green)

- Per the subagents process (docs/subagents.md): wrote the delegation spec
  (`docs/specs/mcp-security.md`), delegated the TestWriter (red — 30 cases,
  module-not-found), resolved a contract ambiguity (additive `groups` +
  `disable`, §5), delegated the Implementer (green — `src/main/security.ts`,
  38 pass), verified the full trio (52 tests, typecheck, build).
- A1's pure permission/token module is LANDED. Wiring into the MCP server
  (register only allowed tools) + the manual-UI settings IPC + the HTTP
  loopback-token check is the next (bounded) step.

## DONE (2026-08-22, tenth pass — A1 security/permissions design landed)

- Applied the A1..A6 reshapes into the design (`docs/specs/mcp-endpoint.md` §6):
  the tool-group permission model (`read`/`dispatch` ON by default; `graph`/
  `code` OFF — gated by a human), the optional loopback bearer token (HTTP
  transport), and the **manual-UI-only Settings pane** (operator-configured,
  never reachable over MCP).
- Fed the design back into the review loop (`architecture-review.md` §5
  addendum) — verdict unchanged (VALID-AS-STATED / APPROVED-WITH-RESHAPE).

## DONE (2026-08-22, ninth pass — top-level architecture three-agent gate)

- Ran the top-level-architecture gate (validity + critique read-only reviewers,
  change-analysis synthesis) at `docs/specs/architecture-review.md`. Verdict:
  **VALID-AS-STATED / APPROVED-WITH-RESHAPE** — the process split is correct,
  every `provident-ssr@0.1.3` surface is real, and the critique's findings
  (the two trust boundaries: the eval gate reachable by an unauthenticated
  peer; the renderer treated as never-reloading with unbounded payloads) are
  host-side hardening (reshapes A1..A6).
- Recorded the verdict in `docs/decisions.md` (TOP-LEVEL-ARCH row) and updated
  the CODE-CRUD row with the A1 trust-gate pin.

## DONE (2026-08-22, eighth pass — code-CRUD authoring surface)

- Added the **code-authoring CRUD surface** to `docs/specs/mcp-endpoint.md` §4
  (six additive `provident.code.*` tools: get/set/create/delete/validate/load)
  — manipulates the ENVELOPE (the data source of truth) OUTSIDE the live graph;
  edits are staged and materialized by re-load (P-C2), bodies ride as
  function-STRING data (P-C3, CSP `'unsafe-eval'`), validated at the translate/
  `loadState` boundary (P-C4). This is "manipulating the code" (e.g. functions
  that write `hooks.<name>` through the managed channel) without touching graph
  internals.
- Wired the surface into the battery plan: §3 tool table, §5.4 code-CRUD
  scenario (the hooks add-a-provider example), Unit C in next-steps, and the
  P-E9 pin in mcp-endpoint.md §6. Renumbered the spec sections (process layout
  → §5, pins → §6, non-goals → §7, verification → §8).
- No package change — the CRUD edits existing envelope fields
  (`hooks`, `handlers[].body`, `component`, `props`/`css`/`content`).

## DONE (2026-08-22, seventh pass — provident-ssr 0.1.3 publish refresh)

- `provident-ssr` refreshed to ^0.1.3 (the upstream Round-4 landings
  published). Verified the installed dist carries `createLinkHub`,
  `evictDestroyedNode`/`destroyedRefs`, `markCascadeExplicit`, and the
  `LinkConfigNameHub` type export; trio (14 tests) + typecheck + build + MCP
  e2e all green.
- Trackers reconciled: defects.md/HANDOFF.md Round-4 rows → "PUBLISHED
  (0.1.3)"; decisions.md version-pin row updated; the battery's vendored-hub
  workaround is now droppable (A1 uses the exported `createLinkHub()`).

## DONE (2026-08-22, sixth pass — fork-stress structure correction + cycle spec)

- Adopted the user's fork-stress correction: the replicated demos are the
  STATIC path-enumeration family (23 graph nodes incl. root / 4095 path-state
  elements; ONE `compilePath` pass; zero clones) — the runtime clone family is
  out of scope.
- New deliverable spec `pathForkCycleLegacyData(depth)` in
  `docs/specs/e2e-test-battery.md §5.1.x` — the cycle variant the upstream has
  no static equivalent for (placement-only / values / link cycling per layer;
  `handler` excluded by design: no static runtime expansion exists).
- Gate review addendum (`docs/specs/e2e-test-battery-review.md`) records the
  ruling + the census correction (the F-13 "4117 in-tree" belongs to the
  runtime clone family, not the static trio) + the host-capability pin
  (`compilePath`-per-node bootstrap) + the delegated-TDD residual watch items.

## DONE (2026-08-21, fifth pass — the battery three-agent gate + reshape)

- Ran the three-agent gate for the E2E-battery proposal: step-1 validity,
  step-2 critique (parallel read-only reviewers), step-3 change-analysis at
  `docs/specs/e2e-test-battery-review.md` (verdict APPROVED-WITH-RESHAPE; the
  required reshapes R1..R16).
- Applied R1..R16 to `docs/specs/e2e-test-battery.md` (version-stable census
  arithmetic; corrected A1 recipe incl. `reconcileParentTargets`;
  snapshot-parity scope; C4-vs-d12 amendment; the teardown settle-gate;
  assertion hygiene; userData/pass-2-drain/warnings seams; cycle-variant A3
  scoping; body provenance; shim fidelity; live-prod privacy guard rail).
- Reconciled trackers: `docs/defects.md` Round-4 rows → LANDED-BUT-UNPUBLISHED
  upstream dispositions; `docs/HANDOFF.md` Round 4 → reshaped; `docs/decisions.md`
  gained the MCP-BATTERY + package-version-pin rows; `.gitignore` gained
  `live-prod/`.

## DONE (2026-08-21, fourth pass — E2E-battery plan + REQ-GAP-9..12)

- Wrote the E2E-battery plan (`docs/specs/e2e-test-battery.md`): the three
  build mechanisms (A1 doc load / A2 legacy envelope load / A3 command
  stream), the MCP contract extension (5 additive tools), the scenario
  catalogue (fork-stress d12 × 4, landings, hooks, handlers), the single
  battery runner, and the risks.
- Identified + logged four requirement gaps the battery needs that the package
  lacks (REQ-GAP-9..12) in `docs/defects.md` + `docs/HANDOFF.md` Round 4:
  no public hub factory (A1), no sanctioned handler-body-by-name injection,
  no Supervisor reset/unregister, no single clear-children op.

## DONE (2026-08-21, third pass — 0.1.2 adoption)

- Refreshed `provident-ssr` to ^0.1.2.
- Reviewed the REQ-GAP-8 landing (upstream decisions.md row): `renderProducingProcess`
  gained the optional `renderOptions` param threaded to `emitElements`.
- Adopted the canonical loop: the Runtime's re-emit now calls
  `renderProducingProcess(actionable, nodeById, adapter, prevMap, { nodeIdAttribute: true })`
  per adapter (DOM + SSR, each with its own caller-owned prevMap). The explicit
  emit-with-options loop is removed. REQ-GAP-8 closed.
- Tests: `tests/engine-surfaces.test.ts` now drives the canonical loop (5 tests,
  incl. a REQ-GAP-8 opt-in default-off pin) + `tests/runtime.test.ts` (9) =
  14 green; typecheck clean; build clean; MCP e2e (both transports) green;
  real-Electron e2e green (data-node-id DOM=SSR on all 12 elements, engine
  dirtied, engine dedup echo, event.value echo).
- Trackers updated: defects.md (REQ-GAP-8 → RESOLVED, none open), decisions.md
  (ADOPT row), pending.md, HANDOFF.md, spec, README.

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