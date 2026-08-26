# MCP Resources for Rendered State — change-analysis review (step 3 of the three-agent gate)

**Status**: change-analysis of the MCP-resources proposal (AGENTS.md item 8).
Synthesizes the step-1 validity review and step-2 critique; my own re-read of
every cited site confirms both outputs' claims. No files changed by this
document. Companion: `docs/specs/mcp-resources-proposal.md` (the proposal),
`docs/specs/mcp-endpoint.md`, `src/main/mcp-server.ts`, `src/main/security.ts`,
`src/renderer/runtime.ts`, `src/renderer/secure-panels.ts`.

## 1. The proposal (recap)

Add MCP resources so an agent can READ rendered state declaratively via `mcp://`
URIs, alongside the existing `read`-group tools:
- `mcp://provident/app` — the rendered HTML view (`get_rendered_html` result)
- `mcp://provident/node/{nodeId}` — a node's resolved state (template)
- `mcp://provident/targets` — the addressable vocabulary (`list_targets` result)

The resource callbacks forward over the SAME `RendererBackend` IPC bridge the
tools use (main → renderer → app Runtime).

## 2. Step-1 validity verdict

**VALID-WITH-RESHAPES.** The SDK surface fully supports it
(`registerResource` fixed + `ResourceTemplate`; `RegisteredResource`/
`RegisteredResourceTemplate` with `enabled`/`update`/`remove`), the Runtime
methods exist and are JSON-safe, the stateless-HTTP pattern is compatible
(per-server-build registration rides the existing per-POST build), and the
SecurePanels isolation holds by construction (resource callbacks route only to
the app Runtime; no code path reaches the pane graph). Three reshapes required:
R1 gate resources under the `read` group; R2 capture + live re-gate the resource
handles; R3 wire registration into both transport builds.

## 3. Step-2 critique

The critique's **HIGH findings** converge with R1/R2 and add H2 (the node
template must validate against the live in-tree graph + cleanly fail, and must
never route to the isolated panes graph). MEDIUM findings: M1 (resources are
redundant with the read tools — scope or justify); M2 (caching/staleness
unaddressed — always-fresh snapshots, invalidation is a follow-up); M3
(oversized-payload truncation invisible — document mimeType/digest); M4
(template over enumerated, node-URI discovery via the `targets` resource).

**Critique gate:** if resources bypass the group gate (the "always-registered"
option), the proposal should be REJECTED — it would create a read path the
human Settings pane explicitly shuts off.

## 4. Change-analysis synthesis

Both steps agree on the crux: **the MCP security model is tool-centric, and
resources fall outside it unless reshaped into the `read` group.** The proposal
is ADDITIVE and feasible, but it MUST adopt the following reshapes to be
implementable without violating the repo's A1 deny-by-default gate and the
isolation/JSON-safe pins.

### Reshape R1 (H1, blocking) — resources are `read`-group members
- A resource↔group mapping (parallel to `TOOL_GROUPS` in `security.ts`):
  `mcp://prov/app`, `mcp://prov/node/{nodeId}`, `mcp://prov/targets` → `read`.
- Register a resource only when its group is allowed (the same
  `allowedToolNames`-style filter for the resource list).
- **Never** the "always-registered/token-like" option — that would bypass the
  A1 gate (an agent could `resources/read mcp://prov/app` with `read` disabled).

### Reshape R2 (H1) — capture + live re-gate the resource handles
- A parallel `Map<string, RegisteredResource | RegisteredResourceTemplate>`
  captured at registration (the `this.registered` analogue).
- `applyGatePatch` toggles them alongside the tools (`update({ enabled })`); the
  widen path registers newly-allowed resources (stdio live-server) while the
  per-POST HTTP server rebuilds from the current gate.

### Reshape R3 — wire into both transport builds
- A `registerResources` companion (or shared `buildSurface`) invoked in
  `createServer()` (serves BOTH stdio + per-POST HTTP), gated by the same
  allowed-set derivation as tools.

### Reshape R4 (H2) — node-template read hardening + isolation
- The `mcp://prov/node/{nodeId}` read validates the id against the live in-tree/
  not-destroyed set (mirroring `resolveTarget`/`rebuildIdIndex`), returning a
  clean resource not-found (never a stale/ghost snapshot, never a 500).
- Routing stays strictly on `RendererBackend.invoke('nodeState', …)` → app
  `Runtime`; a test asserts the resource surface can never read the SecurePanels
  graph.

### Reshape R5 (M2/M3/M4) — contract semantics
- Resource reads are **always-fresh point-in-time snapshots** (never cached); the
  client must not hold a resource URI's content across a dispatch.
- Document per-resource `mimeType`: `mcp://prov/app` → `text/html` (with the
  oversized `{census,digest,preview,truncated}` digest contract documented);
  `mcp://prov/node/{nodeId}` + `mcp://prov/targets` → `application/json`.
- Template over enumerated; concrete node-URI discovery is via the `targets`
  resource (`resources/list` lists the template, not concrete nodes).

### Reshape M1 (scope decision) — the change-analysis recommends:
- **Adopt** `mcp://prov/app` + `mcp://prov/targets` (the two highest-value
  declarative reads) AND keep the `mcp://prov/node/{nodeId}` template (it is
  the genuinely-additive one: an agent can reference a specific node's state
  declaratively). The redundancy is acceptable because the VALUE is the
  resource-native declarative URI surface (some clients reference URIs rather
  than imperative calls), not new engine capability. Each resource documents the
  exact tool it mirrors so the redundancy is explicit, not hidden.

### Reshape (M2 companion) — reconcile `pending.md`
- The companion "live change notification" speculative row stays parked but is
  noted as the future invalidation answer for cached resource URIs.

## 4. Recommendation

**PROCEED-WITH-RESHAPES.** The proposal is additive and feasible; the R1-R4
reshapes are required (R1/R2 are blocking — resources must ride the `read`
group + live re-gate). The M1 scope decision (keep all three URIs) is adopted.
The companion live-change-notification row stays parked. This document is the
gate verdict; implementation proceeds via the normal TDD (red → green →
adversarial → greens → doc-review) path.
