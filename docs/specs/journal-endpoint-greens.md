# Blind-test greens — `provident.journal` (journal reversibility endpoint)

**Status**: BLIND-TEST WRITER artifact (AGENTS.md item 10a). Produced from the
DOCUMENTATION ONLY — `docs/specs/mcp-endpoint.md` §3.6, `docs/specs/journal-endpoint-review.md`
(J3-J8), `docs/specs/journal-endpoint-proposal.md`, and the upstream engine spec
`docs/specs/undo-redo-report.md`. No implementation reading. **Execution
POSTPONED (2026-08-26)** — the scenarios below are the green-scenario artifact;
a fresh agent runs them against the live modules and records pass/fail.

## Contract under test (from the docs)

1. `provident.journal` takes `{ action: 'undo'|'redo'|'replay' }`.
2. It drives the engine's `Supervisor.undo()`/`redo()`/`replay()` and re-renders.
3. Returns `{ status, scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary, renderedHtml, ssrHtml, warnings }`.
4. `status` is `'applied'` | `'no-op'` | `'base-boundary'`.
5. `undo` after a `state-slice` reverts the value; `redo` re-applies; `replay` re-runs.
6. `undo` with an empty stack → `status:'no-op'` (never throws).
7. A malformed/non-string action → throws `unknown journal action`.
8. The tool is in the `graph` group (OFF by default); enabled when `graph` is granted.
9. The server registers `provident.journal` only when `graph` is enabled.

## Scenarios

| # | Scenario | Expected (from docs) |
| --- | --- | --- |
| B1 | `journal('undo')` after a `state-slice` on the counter content | `status:'applied'`; the rendered HTML no longer contains the post-op value |
| B2 | `journal('redo')` after the undo | `status:'applied'`; the rendered HTML contains the post-op value again |
| B3 | `journal('replay')` after a `state-slice` | `status:'applied'`; the rendered HTML contains the post-op value |
| B4 | `journal('undo')` with an empty stack | `status:'no-op'`; never throws |
| B5 | `journal('bogus')` / `journal(undefined)` / `journal(null)` / `journal(42)` | throws `unknown journal action` |
| B6 | `SecurityGate` default (read+dispatch) | `provident.journal` NOT allowed |
| B7 | `SecurityGate` with `graph` granted | `provident.journal` allowed |
| B8 | `ProvidentMcpServer` default gate | `allowedToolNames()` does NOT include `provident.journal` |
| B9 | `ProvidentMcpServer` after `applyGatePatch({groups:['graph']})` | `allowedToolNames()` includes `provident.journal` |
| B10 | The journal result shape | has `status`, `scheduledDirtied`, `renderedHtml`, `ssrHtml`, `warnings`, `baseBoundary` |

## Runner (throwaway — NOT committed)

A fresh agent writes a throwaway script in `/tmp/opencode/` importing the real
`Runtime` (`src/renderer/runtime.js`), `SecurityGate`/`ProvidentMcpServer`
(`src/main/*.js`), the DOM shim (`src/shared/dom-shim.js` `installShim()`/
`mountEl()`), and the demo envelope (`src/shared/demo-envelope.js`
`demoEnvelope()`), then runs B1-B10 and records pass/fail. A FAIL is a doc/spec
drift OR an un-hardened regression — never a pass.

## Execution record (filled by the runner)

| # | Result | Notes |
| --- | --- | --- |
| B1 | _pending_ | |
| B2 | _pending_ | |
| B3 | _pending_ | |
| B4 | _pending_ | |
| B5 | _pending_ | |
| B6 | _pending_ | |
| B7 | _pending_ | |
| B8 | _pending_ | |
| B9 | _pending_ | |
| B10 | _pending_ | |
