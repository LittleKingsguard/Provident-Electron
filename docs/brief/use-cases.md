<!-- Purpose: the actors of Provident-Electron, the exact drive each uses, and the outcome each observes — one use case per table. -->
Status: ACTIVE · authored 2026-10-29 · source of truth: the code, cited per row

# Use cases

Tool names, argument shapes and return members below are taken from the code, not from the prose.
Two facts fix the vocabulary: **22 tools** are registered (`ALL_TOOLS`,
`src/main/mcp-server.ts:576-599`) and **3 resources** (`ALL_RESOURCES`,
`src/main/mcp-server.ts:638-642`). Every tool takes a JSON argument object and answers one MCP
`text` content block containing `JSON.stringify(value, null, 2)` (`src/main/mcp-server.ts:371`).

## UC-1 — An agent drives the UI by synthetic events

| Field | Content |
| --- | --- |
| Actor | an MCP client (agent or IDE) holding the `dispatch` group |
| Job | make the app *do* something, then see what the app now is |
| Drive | `provident.dispatch` with `{ target, event, args?, requestId? }` — e.g. `{ "target": "inc", "event": "click" }`; `target` may be a bare string, `{kind:'cssId',cssId}`, `{kind:'nodeId',nodeId}` or `{kind:'wire',wire}` (`src/main/mcp-server.ts:838-853`) |
| Resolution | a bare string resolves nodeId → `css.id` → `props.id`, in-tree and not-destroyed only (`src/renderer/runtime.ts:224-239,265-273`); the host does this, the engine never does (`docs/specs/mcp-endpoint.md §3.1`) |
| Mutation | one engine call, `dispatchAndReport(nodeId, event, opts, ...args)`, which awaits the flush internally, derives `dirtied`, and applies opt-in `requestId` dedup (`src/renderer/runtime.ts:1164-1188`) |
| Outcome | `{ results, dirtied, renderedHtml, ssrHtml }` — `results` is the `HandlerResult[]` with thrown handlers normalised to `{ error: { message, name } }`, and both views are freshly re-emitted (`src/renderer/runtime.ts:1188-1195`) |
| Then observe | `provident.get_rendered_html`, `provident.get_node_state`, `provident.list_targets`; on stdio a mutating call also pushes `notifications/resources/updated` (`src/renderer/renderer.ts:829,1046-1048`, `src/main/mcp-server.ts:760-773`) |
| Fail-states | unresolvable target throws `unresolved target: <json>` and mutates nothing (`src/renderer/runtime.ts:1165-1168`); **`Runtime.dispatch` *spreads* `req.args`** (`...(req.args ?? [])`, `src/renderer/runtime.ts:1178`), so a **non-array** `args` reaching the Runtime — the shape the battery host hands it, unvalidated (`src/main/battery-host.ts:41-42`) — makes a bare string's first character the handler's `value`; the **MCP tool's own schema** declares `args` as an array (`src/main/mcp-server.ts:851`), so this is the Runtime/in-process arm, not the schema-checked tool arm; a group the operator disabled is not registered at all, so the tool is absent from `tools/list` rather than present-but-refusing (`src/main/security.ts:57-61`, `src/main/mcp-server.ts:604`) |
| Spec | `docs/specs/mcp-endpoint.md §3.1`; the registration gate: `docs/specs/mcp-server-wiring.md §1` item 1 |

## UC-2 — An agent or developer reads the rendered application as text

| Field | Content |
| --- | --- |
| Actor | an MCP client, or a developer at a terminal (`npm run mcp`) |
| Job | answer "*what does this app currently show?*" without a human at the window |
| Drive | `provident.get_rendered_html` `{}` → `{ renderedHtml, ssrHtml, census }`; `provident.get_markdown` `{}` → `{ markdown, census }`; `provident.get_node_state` `{ target }` → `{ nodeId, states, census }`; `provident.list_targets` `{}` → `{ nodes: [{ nodeId, cssId?, propsId?, type, content, state, inTree, handlers }] }` (`src/renderer/runtime.ts:1197-1209,1244-1282`) |
| WHAT THE SNAPSHOT IS | a **point-in-time re-emit of the current graph**: `renderedHtml` is the mount's live `innerHTML`, `ssrHtml` is the same graph re-emitted through `SSRFragmentAdapter`, so the two are a parity view of one graph (`src/renderer/runtime.ts:192-199,1211-1223`). Every emitted element carries `data-node-id="<engine nodeId>"` in **both** views, so element → node → `get_node_state`/`dispatch` is traceable (`src/renderer/runtime.ts:90`, `docs/specs/mcp-endpoint.md §3.2`) |
| WHAT IT IS NOT | not reactive — nothing re-renders unless a call mutates the graph (`docs/specs/mcp-endpoint.md §1`); **no geometry and no layout**, because the shim is layout-less (`src/shared/dom-shim.ts:1-3`); markdown is **non-interactive** — `on:*` and `data:*` props are dropped, so the markdown carries **no element→node mapping** (`docs/specs/mcp-endpoint.md §3.3`, `src/renderer/runtime.ts:1225-1241`); and over `1,000,000` characters the payload is replaced by `{ census, digest, preview, truncated }` — the census plus an FNV-1a 64-bit hash of the full text, never the fragment (`src/main/mcp-server.ts:1274,1457-1484`) |
| Census | `{ registered, inTree, unplaced, destroyed, prototypes }` counted over `supervisor.allNodes()` (`src/renderer/runtime.ts:1318-1327`) |
| Fail-states | an unresolvable `target` on `get_node_state` throws the same `unresolved target:` error (`src/renderer/runtime.ts:1271-1273`); `list_targets` silently omits destroyed/out-of-tree nodes rather than listing them as unaddressable (`src/renderer/runtime.ts:1246-1250`) |
| Spec | `docs/specs/mcp-endpoint.md §3.2`, `§3.3`, `§3.4`, `§3.5` |

## UC-3 — A developer diagnoses a graph/render divergence

| Field | Content |
| --- | --- |
| Actor | a host developer, or the `divergence` leg in CI |
| Job | decide whether the HTML disagrees with the graph, or the shim disagrees with a real DOM |
| Drive (in-app) | one `provident.dispatch` returns `renderedHtml` **and** `ssrHtml` from the *same* actionable set, so a mismatch between them is a genuine adapter/graph divergence and not a timing artefact (`src/renderer/runtime.ts:188-199,1189-1194`) |
| Drive (structural) | `provident.export` `{format:'legacy'\|'serialized'}` → `{ export, census }`; `provident.validate` `{kind,export}` → `{ valid, censusMatch, treeSigMatch, warnings }`, re-loading the export into a **throwaway** graph and comparing census + a structural shape signature (`src/renderer/runtime.ts:695-716`) |
| Drive (shim vs real) | `npm run divergence` boots the real Electron app and the shim battery host on the same envelope and compares shim-stable surfaces only — census, node state, SSR fragment, `data-node-id` parity (`scripts/electron-divergence.mjs:1-8`) |
| Known divergence class | `dataset` used to be a plain object in the shim while the real DOM emitted `data-wire="node-N"` on every element — the divergence leg's set-wise attribute extractor is what found it, and the shim's `dataset` is now attribute-backed (`src/shared/dom-shim.ts:62-70`) |
| Outcome | a named difference (attribute set, census count, fragment text) or `R13 RESULT: 9 checks, 0 failures`; the check count `N = 9` is pinned by the leg's own contract (`docs/specs/ci-divergence-leg.md` §5) |
| Limits | the divergence leg is structural-surfaces-only and never an IPC-layer claim (`docs/specs/foundation-app-data-model.md:25`) |
| Spec | `docs/specs/ci-divergence-leg.md §5` (the pin) and `§A-4` (the pin is not re-pinned); the `R13` rule is quoted in `scripts/electron-divergence.mjs:5-8` |

## UC-4 — An agent or CI run exercises the same contract headless, over both transports

| Field | Content |
| --- | --- |
| Actor | CI, or an agent with no display |
| Job | drive and assert the MCP contract without an Electron window |
| Drive — stdio | the client spawns the process: `dist/main/standalone.mjs` (mock backend — tool wiring only) or `dist/main/battery-host.mjs` (a **real** `provident-ssr` Runtime under the DOM shim), then speaks JSON-RPC on stdin/stdout (`src/main/standalone.ts:1-14,50-65`, `src/main/battery-host.ts:1-12,83-105`) |
| Drive — Streamable HTTP | the app is already running; the client POSTs to `http://127.0.0.1:<port>/mcp` (default port `3787`), selected by `--mcp-transport=http` or `PROVIDENT_MCP_TRANSPORT` (`src/main/main.ts:39-59`, `src/main/mcp-server.ts:1107-1116`) |
| Why two transports exist | **stdio is spawn-local and long-lived**: the parent is the launcher, it is not token-gated, and it is the only transport that can deliver a server push. **HTTP is attach-late and stateless**: a fresh `McpServer` + transport per POST (`GET`/`DELETE` → `405`), a bearer token gate answers `401` before any tool runs, and a push is a declared no-op (`src/main/mcp-server.ts:746-762,1107-1176`, `docs/specs/mcp-endpoint.md §2`) |
| Outcome | the client sees the same tool names and the same return shapes on both transports; `tests/mcp-stdio-e2e.test.mjs` drives both with the official SDK client (`docs/specs/mcp-endpoint.md §9`) |
| Fail-states | `404` for any path but `/mcp`; `405` for `GET`/`DELETE`; `401` without the token when one is set; `503` with the token `exclusion-closed` while the operator's store is open (`src/main/mcp-server.ts:1122-1152`) |
| Spec | `docs/specs/mcp-endpoint.md §2`, `docs/specs/mcp-server-gate.md` §2 |

## UC-5 — The security / isolation posture: what a client may reach, and what decides it

| Field | Content |
| --- | --- |
| Actor | the human operator (grants), the MCP client (consumes), the agent (is bounded) |
| Job | let an agent observe and drive the loaded graph, without letting it author or evaluate code unless a human said so |
| The gate | every tool belongs to a group; a tool whose group is disabled is **not registered**, hence absent from `tools/list` and uncallable (`src/main/security.ts:5-61`, `src/main/mcp-server.ts:604,813-831`) |
| The five groups | `read` and `dispatch` are ON by default; `graph`, `code` and `module` are OFF until the operator enables them (`src/main/security.ts:86-88,151`) |
| Two-gate | a module tool backed by an executable entry needs **`module` AND `code`**, at registration and at each invocation (`src/main/security.ts:70-84`, `src/main/mcp-server.ts:621-632`) |
| The second axis | the operator's exclusion record is separate from the group set: while `mcp-disabled`, each registered handler answers the closed refusal `exclusion-closed` **before** any renderer dispatch, and an in-flight call is abandoned rather than answered late (`src/main/mcp-server.ts:465-491,830-831,568-572,1441-1452`) |
| Authentication | optional loopback bearer token (`Authorization: Bearer …` or `MCP-Token`), constant-time compared, rejected `401` before any tool runs; a token authorises *who*, the group grants *what* (`src/main/security.ts:126-149`, `src/main/mcp-server.ts:1137-1142`, `docs/specs/mcp-endpoint.md §6.3`) |
| Not reachable | the isolated Security/Debug pane graph (`src/renderer/secure-panels.ts:302-305`); the operator's settings file except through the manual-UI IPC channels (`src/main/main.ts:423-500`); anything in the operator's profile that no tool names |
| Fail-states | a hostile header value is treated as absent, never a crash (`src/main/security.ts:108-124`); a malformed settings patch is rejected whole and changes nothing (`src/main/security.ts:159-193`) |
| Spec | `docs/specs/mcp-endpoint.md §6`; `docs/specs/mcp-security.md §2` (note: that section names **four** groups, while `src/main/security.ts:3` declares **five**); `docs/specs/secure-exclusion.md §2`, `§3` |

## UC-6 — The repository's own purpose: a finding becomes a catalogue row and a handoff item

| Field | Content |
| --- | --- |
| Actor | the implementer of this repo, acting as the package's implementation test |
| Job | turn a defect or requirement gap in `provident-ssr` or `provident-storeroom` into a traceable item the upstream maintainer can act on |
| Drive | observe the behaviour through the app's own surfaces (an MCP call, a battery row, a live probe), then record it — **never patch the package** (`AGENTS.md:11-12`) |
| The row | `docs/defects.md`: observed symptom → reproduction → suspected root cause → proposed fix shape, upstream-owned (`docs/defects.md:11-13`) |
| The handoff | `docs/HANDOFF.md`, a digest for the maintainer regenerated per package release; **Round 15** at the head, against `provident-storeroom@1.5.0` (`docs/HANDOFF.md:1-8`) |
| Worked example | the `1.5.0` review filed `DEF-AU` as the head of the `1.5.0` demand set and moved the ledger to `42` live rows (`docs/next-steps.md:230`) |
| Counter-example (host-side) | a defect in *this* repo's `src/` is fixed here with a regression test, not handed off — e.g. the `provident.op` payload unwrap (`src/renderer/renderer.ts:981-986`) |
| Outcome | a dated, cited row; a handoff round that names demand vs observation; and a package relationship the fork inherits unchanged |
| Spec | `AGENTS.md:191-198` (item 7, the defect-catalogue + handoff rule); `docs/defects.md`; `docs/HANDOFF.md` |

## UC-7 — A consumer takes this repo as a prebuild baseline

| Field | Content |
| --- | --- |
| Actor | a developer starting a new Electron app on `provident-ssr` |
| Job | inherit the agentic/debug surface without re-deriving it |
| Inherits | the MCP server + gate + both transports + the renderer IPC bridge (`src/main/mcp-server.ts`, `src/main/preload.ts`, `src/main/main.ts`); the readiness/timeout/large-payload hardening (`src/main/mcp-server.ts:1213-1228,1386-1428,1457-1484`); the shim-backed headless host and the batteries (`src/main/battery-host.ts`, `tests/e2e-battery.test.mjs`); the demo envelope as a worked example of the "everything is data" rule (`src/shared/demo-envelope.ts`) |
| Must change | the **Electron pin** — the repo says explicitly that a fork should choose its own rather than copy `^44` (`README.md:41-51`); the demo envelope and its node ids; the gate defaults if the product wants different ones (`src/main/security.ts:86-88`); the profile file names and the reserved top-level namespaces (`src/main/main.ts:30,101-119`) |
| Must know | the fork-facing docs are **not** delivered: six `docs/FORKER.md` seam/glossary blocks are recorded `OWED` (`docs/pending.md:76`), so a fork inherits the code but not a written fork contract |
| Outcome | a bootable shell whose MCP surface is the same 22-tool contract, with the demo replaced |
| Limits | inheriting the repo inherits its process rules and its trackers; those are not a product deliverable |
| Spec | `README.md:16-19,40-51`; `docs/pending.md:76` (the six `OWED` `docs/FORKER.md` blocks) |

## Use case → feature area

| UC | Exercises (see `features.md`) |
| --- | --- |
| UC-1 | §2 synthetic events · §1 MCP surface · §6 focus/gestures where the target is focus or a drag |
| UC-2 | §3 rendered-view visibility · §5 focus, gestures, overlay (what the text omits) |
| UC-3 | §4 graph and store · §10 the validation and battery layer |
| UC-4 | §8 transports and modes · §10 the validation and battery layer |
| UC-5 | §7 security and isolation · §9 persistence and recovery |
| UC-6 | §11 the storeroom seam · §10 the validation and battery layer |
| UC-7 | §1 MCP surface · §9 persistence and recovery · §7 security and isolation |
