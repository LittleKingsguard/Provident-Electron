# Battery — Implementation Handover (for a fresh sub-agent)

Status: **CONTEXT HANDOVER** (AGENTS.md item 1 — the prior agent crossed the
75% context threshold mid-loop and handed off). This file is the exact next
state for a fresh agent to continue the TDD + adversarial + green-scenario
loop toward e2e readiness. Everything below is verified/green as stated.

## Current state (all green — run `npm test`, `npm run typecheck`, `npm run build`)

**111 tests pass.** Files: `tests/security.test.ts` (38), `tests/security-gate.test.ts`
(24), `tests/runtime-host.test.ts` (13), `tests/mcp-server-wiring.test.ts` (15),
`tests/mcp-server-gate.test.ts` (7), `tests/runtime.test.ts` (9),
`tests/engine-surfaces.test.ts` (5). The MCP e2e (`tests/mcp-stdio-e2e.test.mjs`,
both transports) passes.

**Landed units (spec → red → green → adversarial → green-scenarios):**
- **A1 core**: `src/main/security.ts` — `groupForTool`, `toolAllowed`,
  `defaultSecurityConfig`, `authorized`, `applyPatch` + `SecurityGate`.
  Hardened (F1 non-string header, F2 array-vs-Set, F3/F4 patch shape, F5
  purity, F6 empty-token, F7 header-key case, F-gate null/undefined). Specs:
  `docs/specs/mcp-security.md`, `mcp-security-gate.md`, greens
  `mcp-security-greens.md`.
- **Unit A Runtime host**: `src/renderer/runtime.ts` — `loadEnvelope`, `loadDoc`,
  `applyCommand`, `exportLegacy`, `exportSerialized`, `validateExport`,
  `teardown`, the id-index (A5). Hardened (H1 placement compilePath routing,
  H2 in-tree-only id-index/resolve/listTargets, H3 clean reject). Spec
  `docs/specs/runtime-host.md`.
- **A1-W2 pure functions**: `src/main/mcp-server.ts` — `toolForName`,
  `registeredToolNames` (dedup, fail-closed). Spec `docs/specs/mcp-server-wiring.md`.
- **A1-W4/W5 gate plumbing**: `ProvidentMcpServer` holds a `SecurityGate`;
  `registerTools` registers only `allowedToolNames()` (the 4 implemented tools
  gated); `handleHttp` 401s on a failed token check. Spec
  `docs/specs/mcp-server-gate.md`.

## The adversarial review on A1-W5 left MUST-fixes (NOT yet done)

Read `src/main/mcp-server.ts` (the `applyGatePatch`, `ALL_TOOLS`,
`registerTools`), `docs/specs/mcp-server-wiring.md`, `docs/specs/mcp-server-gate.md`.

- **M1 [HIGH] — stdio re-gate is a NO-OP (TOCTOU fail-open).**
  `applyGatePatch` only swaps `this._gate`; it never touches the running
  long-lived stdio server. A NARROW (`disable:['dispatch']`) leaves the tool
  registered on stdio (HTTP is fine — fresh server per POST). Fix: in
  `applyGatePatch`, iterate `this.server.getRegisteredTools()` and
  `RegisteredTool.update({ enabled:false })` for now-disallowed tools, and
  register newly-allowed ones; OR rebuild the stdio server on re-gate. Red
  test: narrow a live server, assert the tool is disabled. (Currently masked —
  only the 4 tools exist, so nothing can be narrowed away — but it re-opens
  fail-open when graph/code tools land.)
- **M2 [HIGH, fail-closed but contract-breaking] — `ALL_TOOLS`/specs claim
  `code.get`/`code.validate` are registered (read group, in the default gate);
  `registerTools` does NOT implement them → silently absent.** Enabling
  `graph`/`code` silently registers nothing (no crash, no error). Fix: EITHER
  implement `code.get`/`code.validate` (and stub the graph/code tools) OR drop
  the unimplemented names from `ALL_TOOLS` + the spec tables so intent =
  reality. `docs/specs/mcp-server-wiring.md` §5 has an internal "5 vs 6"
  inconsistency to fix.
- **M3 [low]: record the GET→405-before-401 ordering and "enable = no-op for
  unimplemented groups" as a decision** in `docs/decisions.md`.

## The next design units (the battery — spec → red → green → adversarial → greens)

- **Unit C — the 5 graph MCP tools** (`load`/`op`/`export`/`validate`/`teardown`)
  + **the 6 code-CRUD tools** (`code.get`/`set`/`create`/`delete`/`validate`/
  `load`). They call the Runtime host methods. The MCP server already has
  `ALL_TOOLS` (all 15 names) but only 4 are registered — implement the rest,
  gated. Specs: `docs/specs/mcp-endpoint.md` §3/§4, `docs/specs/runtime-host.md`.
- **Unit D — the battery host + runner**: `src/main/battery-host.ts` (a Node MCP
  server owning a real `Runtime` under the DOM shim) + `tests/e2e-battery.test.mjs`
  (single process, C4 no-external-reset, teardown-only). Spec
  `docs/specs/e2e-test-battery.md` §6.
- **Unit B — the cycle-variant envelope** `pathForkCycleLegacyData(depth)`
  (the NEW static path-fork cycle spec `docs/specs/e2e-test-battery.md §5.1.x`).
- **A2 lifecycle / A6 readiness timeout / A3 CI leg / A4 batch** — from
  `docs/specs/architecture-review.md`.

## Process (subagents.md + the adversarial rule)

Per `docs/subagents.md` + this repo's AGENTS.md item 7: **Spec → TestWriter
red → Implementer green → adversarial sub-agent → blind-test green scenarios →
trackers**, then the trio (`npm test`, `npm run typecheck`, `npm run build`).
Engine (package) defects → `docs/defects.md` + `docs/HANDOFF.md`; host findings
fixed in-repo. The adversarial agent's instruction: "write adversarial scenarios
looking for unhandled edge cases, unauthorized access, unguarded bad data,
malformed requests; any engine defect goes to the handoff." The security gate
`provident:security:get/set` manual-UI IPC is still NOT built (Unit C + the
settings UI).

## Verification of this handover

`npm test` = 111 pass; `npm run typecheck` clean; `npm run build` clean; the
MCP e2e (stdio + HTTP) passes. No open package defects; all findings are
host-side.
