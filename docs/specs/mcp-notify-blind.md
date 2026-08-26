# Blind-Test — Live Change Notification (stdio-only, app-Runtime-sourced push)

Status: **BLIND-TEST BATTERY** (AGENTS.md item 10a + the upstream Preempt-
Providence blind-test pattern). You are the blind writer. Produce scenario code
BLINDLY — from the DOCUMENTATION ONLY — and PREDICT each outcome BEFORE running
it. You must NOT read the implementation (`src/main/mcp-server.ts`,
`src/renderer/renderer.ts`, `src/main/main.ts`, `src/main/preload.ts`) to learn
behavior; only the docs + review name the module surface you import.

## Your read-set (read these ONLY)

- `docs/specs/mcp-endpoint.md` §3.6 (the resources) + §8 (the stdio-only push
  non-goal)
- `docs/specs/live-notification-review.md` (N1-N7 — the accepted reshapes)
- `docs/specs/live-notification-proposal.md` (the proposal)
- `docs/specs/mcp-resources-review.md` (R1-R5 — the resource gating, which the
  notify surface rides on)

Do NOT read `src/main/mcp-server.ts`, `src/renderer/renderer.ts`,
`src/main/main.ts`, `src/main/preload.ts`, or any `tests/mcp-notify*.test.ts`
file. You MAY import what the docs name: `ProvidentMcpServer`
(`src/main/mcp-server.js`), `SecurityGate` (`src/main/security.js`),
`type McpBackend` (`src/main/mcp-server.js`).

## Your task

For EACH scenario below: (1) decide HOW to express it in code from the docs
ALONE — the exact method name, signature, and assertion are YOUR call, inferred
from the docs; (2) PREDICT the outcome before running; (3) run it; (4) record
the ACTUAL outcome. A mismatch is a DOC-CLARITY / DOC-COMPLETENESS /
CODE-CONSISTENCY finding — record which.

Create `tests/blind-mcp-notify.test.ts`. Use `describe`/`it`/`expect`.
After running, paste the full vitest output.

---

## Scenarios

**S1. A notify is a per-resource content update, not a tool/list change.** The
docs (N1) say the notify maps to `notifications/resources/updated` for
`mcp://provident/app` — a content change — and that `sendToolListChanged` /
`sendResourceListChanged` are applyGatePatch-only (a dispatch changes neither
list). From the docs alone, find how a server emits a notify and what message it
produces. PREDICT: the emitted notification is `notifications/resources/updated`
with the app URI, and is NOT a tool-list or resource-list change. (The method
name/signature is yours to infer.)

**S2. stdio-only — an HTTP notify is a no-op, never a hang.** The docs (N2)
say the HTTP transport is stateless (a fresh server per POST, no session), so a
notify there is a no-op. PREDICT: a server built for the HTTP transport, when
asked to notify, does NOT throw and does NOT hang — it reports that nothing was
delivered. (How you construct an HTTP server + how you observe "not delivered"
is yours to infer.)

**S3. stdio delivers.** The docs (N2) say the stdio transport is the long-lived
session where push works. PREDICT: a stdio server, when asked to notify, reports
that a notification was delivered. (How you make a stdio server "connected" for
the test is yours to infer — the docs may not name a seam; decide how to express
it.)

**S4. gate-aware — a `read`-off gate delivers nothing.** The docs (N5) say the
notify is gated with the `read` group (the resources' group; the `resources`
capability exists only when a `read` resource registers). PREDICT: a server
whose gate has `read` disabled delivers NO notification (a no-op), even on
stdio. (How you build a `read`-off gate is yours to infer — the gate takes an
`enabled` group list.)

**S5. app-Runtime-only source — the isolated panes graph never emits.** The
docs (N3) say the push is sourced ONLY from the app Runtime re-render, never the
isolated SecurePanels graph (an operator action must not leak to the agent
through the push). PREDICT: the SecurePanels graph exposes NO notify surface —
there is no code path from an operator pane action to a renderer→main push.
(How you express "no notify surface" is yours to infer — the docs describe the
pane graph as a separate, isolated owner.)

**S6. the notify fires after a MUTATING app-graph op.** The docs (N6) say the
push fires after a mutating app-graph operation (dispatch/load/op/teardown/
code.load) succeeds, one per tool invocation. PREDICT: a read-only operation
(renderedHtml/listTargets/nodeState) does NOT trigger a notify; a mutating one
does. (How you observe the trigger is yours to infer — the docs describe the
renderer pushing to main over a channel.)

---

## Report format

1. For EVERY scenario, show: the code you wrote blindly, the PREDICTION line,
   and the RUN result (PASS/FAIL).
2. Classify each mismatch:
   - **DOC-CLARITY**: the doc prose was ambiguous / self-contradictory / named
     a surface or value it did not pin (quote the doc line).
   - **DOC-COMPLETENESS**: the doc omitted a scenario/edge/return-shape that
     the code exposes.
   - **CODE-CONSISTENCY**: the doc's claim contradicts the live behavior (quote
     the doc claim vs the observed output).
3. Where the docs left an implementation decision open (the method/URI/error
   you had to infer), note it — that is the intended exercise.
