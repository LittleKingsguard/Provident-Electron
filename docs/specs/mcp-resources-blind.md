# Blind-Test — MCP Resources (gated read-group `mcp://` URIs)

Status: **BLIND-TEST BATTERY** (AGENTS.md item 10a + the upstream Preempt-
Providence blind-test pattern). You are the blind writer. Produce scenario code
BLINDLY — from the DOCUMENTATION ONLY — and PREDICT each outcome BEFORE running
it. You must NOT read the implementation (`src/main/mcp-server.ts`,
`src/main/security.ts`) to learn behavior; only the docs + greens name the
module surface you import.

## Your read-set (read these ONLY)

- `docs/specs/mcp-endpoint.md` §3.6 (the resource contract)
- `docs/specs/mcp-resources-review.md` (R1-R5 — the accepted reshapes)
- `docs/specs/mcp-resources-proposal.md` (the proposal)
- `docs/specs/mcp-resources-greens.md` (the green scenarios)
- `docs/specs/mcp-security-gate.md` / `mcp-server-gate.md` (the gate + how the
  tool groups work, if you need the gate semantics)

Do NOT read `src/main/mcp-server.ts`, `src/main/security.ts`, or any
`tests/mcp-resources*.test.ts` file. You MAY import what the docs name:
`ProvidentMcpServer` (`src/main/mcp-server.js`), `SecurityGate`
(`src/main/security.js`), `type McpBackend` (`src/main/mcp-server.js`).

## Your task

For EACH scenario below: (1) decide HOW to express it in code from the docs
ALONE — the exact method name, signature, and assertion are YOUR call, inferred
from the docs; (2) PREDICT the outcome before running; (3) run it; (4) record
the ACTUAL outcome. A mismatch is a DOC-CLARITY / DOC-COMPLETENESS /
CODE-CONSISTENCY finding — record which.

Create `tests/blind-mcp-resources.test.ts`. Use `describe`/`it`/`expect`.
After running, paste the full vitest output.

---

## Scenarios

**S1. The resources exist and are gated by `read`.** The docs describe three
read-only resources (`app`, `targets`, `node/{nodeId}`) that are members of the
`read` tool group. From the docs alone, decide how a server exposes the fact
that a resource is registered + enabled. PREDICT: under the default gate
(`read` ON), all three are present/enabled; under a gate with `read` OFF, none
are. Express the "enabled/registered" check the way the docs imply — the exact
accessor/mechanism is yours to infer.

**S2 — disabling `read` shuts the resources off.** The docs (R1) say a resource
is "never always-registered" — a `read`-off human grant must shut off the
resources. From the docs, decide how a human narrows the gate (the group patch
mechanism) and how a resource read/enable reflects it. PREDICT: after the `read`
group is disabled, the resources are not readable/enabled; after re-enabling,
they are.

**S3 — a non-read group toggle leaves the resources alone.** The docs say
resources are `read`-group members. PREDICT: disabling `dispatch` (or `graph`/
`code`) does NOT disable the read resources.

**S4 — a fresh server built with `read` off registers no resources.** The docs
describe the stateless-HTTP pattern (a fresh server per POST built from the
current gate). PREDICT: a server constructed with a `read`-off gate exposes no
read resources at all. (How you construct a `read`-off gate is yours to infer —
the gate takes an `enabled` group list.)

**S5 — reading `app` returns the rendered view.** The docs say
`mcp://provident/app` mirrors `provident.get_rendered_html` and is an
always-fresh snapshot. From the docs alone, find how a resource read is invoked
and what it returns. PREDICT: the read surfaces the rendered-HTML snapshot
(`renderedHtml` + `ssrHtml` + `census`), fresh per call. (The read mechanism's
name/signature is yours to infer.)

**S6 — reading a specific node's state.** The docs say
`mcp://provident/node/{nodeId}` mirrors `provident.get_node_state` and the
nodeId is validated against the live in-tree graph. PREDICT: reading a valid
node id returns that node's resolved state; reading an unknown/destroyed id
surfaces a clean error (not a stale/ghost snapshot, not a raw 500). What the
docs imply the "clean error" looks like is yours to infer.

**S7 — resources never reach the isolated panes graph.** The docs say resources
route "only through the app Runtime" and NEVER the isolated SecurePanels graph.
The three resources mirror app `read`-group tools only. PREDICT: the resource
surface exposes NO way to read the SecurePanels graph (no pane-only method is
invokable). Express this as the docs imply (which methods a read is allowed to
invoke is yours to infer).

**S8 — reads are always-fresh.** The docs (R5/M2) say resource reads are
always-fresh point-in-time snapshots, never cached. PREDICT: two successive
reads reflect the current backend value (a mutation between them is visible).

**S9 — unknown URIs fail cleanly.** PREDICT: reading an unregistered URI yields
a clean not-found (an error the docs' shape implies — not a crash / not a silent
empty). The exact error text/shape is yours to infer from the docs.

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
