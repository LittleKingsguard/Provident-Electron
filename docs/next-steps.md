# Provident-Electron — Work Queue

Maintained by the document-archival loop (AGENTS.md item 6). Open work on
top; finished items move to the tracker rows they produced. This queue is
this repo's local next-steps (the upstream queue lives in
`../Preempt-Providence/docs/next-steps.md`).

## OPEN

| # | Item | Status / blocker |
| --- | --- | --- |
| 1 | **E2E battery — SPEC-COMPLETE, awaiting user go-ahead** (`docs/specs/e2e-test-battery.md`, review `docs/specs/e2e-test-battery-review.md` + addendum = APPROVED-WITH-RESHAPE). Fork-stress = STATIC path-enumeration family (23 nodes / 4095 path-state elements); cycle variant = new `pathForkCycleLegacyData` spec (§5.1.x). | Gate passed; static-family correction applied; blocked on user go-ahead before the delegations below. |
| 1a | **Unit A — host capabilities (battery mode Runtime)** — **DONE + HARDENED (TDD + adversarial)**. `src/renderer/runtime.ts` has `loadEnvelope`/`loadDoc`/`applyCommand`/`exportLegacy`/`exportSerialized`/`validateExport`/`teardown` + the id-index (A5) + compilePath placement routing (H1) + in-tree-only resolution (H2) + clean reject (H3). Spec `docs/specs/runtime-host.md`; `tests/runtime-host.test.ts` (13) green. | **DONE (2026-08-22)** — green. |
| 1b | **Unit B — the cycle-variant envelope data module** `pathForkCycleLegacyData(depth)` (author in this repo; no upstream static equivalent) — placement→values→link cycle per layer, zero handlers/clones, 23-node/4095-element census. | Deliverable spec exists (§5.1.x); red → green to implement + verify the mixed-method render + census. |
| 1c | **Unit C — the additive MCP tools** the 5 graph tools `load`/`op`/`export`/`validate`/`teardown` + the 6 code-CRUD tools `code.get`/`set`/`create`/`delete`/`validate`/`load` (the authoring surface, mcp-endpoint.md §4) + `warnings` in returns (R10) + `provident` IPC wiring. | Red → green; R2 (A1 recipe), R3 (snapshot-parity validate), R7 (assertion hygiene), R13 (SSR-first), P-C1..C5 (envelope-authoring pins) all in the spec. |
| 1d | **Unit D — the battery host + runner** `src/main/battery-host.ts` + `tests/e2e-battery.test.mjs` (single-process, C4 no-external-reset, teardown-only resets), the battery-wide assertion hygiene (authored ids, non-empty dispatch, fresh requestIds), the `hash64` digest assertions over large renders. | Red → green; then the one Electron-run divergence check (R13) before shim is trusted. |
| 2 | **Surface `TranslatedTree.warnings` through MCP** — fold into `provident.load`/`validate` returns (R10) so CSP-eval-blocked handlers are MCP-visible. | Pending — consumed by Unit C (part of 1c). |
| 3 | **Renderer debug panel** — live census + SSR fragment in `#status`. | Pending — nice-to-have. |
| 4 | **Publish-trigger refresh — DONE** — `provident-ssr@0.1.3` published the Round-4 landings; refreshed + verified (createLinkHub, evictDestroyedNode/destroyedRefs, markCascadeExplicit all present; trio + MCP e2e green). | **DONE (2026-08-22)** — the battery now drops the vendored hub (A1) and relies on the published surfaces. |

| 5 | **Architecture reshapes A1..A6** (from `docs/specs/architecture-review.md`, gate 2026-08-22). **A1 (core + SecurityGate + Runtime host + server gate plumbing + M1/M2/M3 fixes) LANDED + HARDENED (TDD + adversarial)**: `src/main/security.ts` + `src/renderer/runtime.ts` host methods + `src/main/mcp-server.ts` (gate plumbing, gated registration, HTTP 401, stdio re-gate, stub tools) + specs + **112 tests green**; MCP e2e (both transports) green. **Next**: Unit C (replace the graph/code STUBS with real tools), Unit D (battery host+runner), Unit B (cycle envelope), A2/A3/A4/A6. | A1 + M1/M2/M3 DONE; Units C/D/B + A2/A3/A4/A6 pending. |

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