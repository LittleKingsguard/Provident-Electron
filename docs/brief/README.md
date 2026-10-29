<!-- Purpose: index and one-page overview of the project brief — what Provident-Electron is, what it is not, and where to read next. -->
Status: ACTIVE · authored 2026-10-29 · source of truth: the code, cited per row

# Provident-Electron — project brief

**Citation grammar, binding on all four files here.** A *code* citation is `path:line` from the repo
root and was read at this head. A *spec* citation is `docs/specs/<file>.md §<n>` and only names a
section that was actually opened. A claim with neither is written `UNVERIFIED — reason: …`. Where
prose and code disagree, **the code is quoted and the prose is named as stale.**

## 1. What this repository is, in six lines

| # | Fact | Cite |
| --- | --- | --- |
| 1 | An Electron app whose renderer **is** a `provident-ssr` producing process: the graph is authoritative and the HTML is a view, re-emitted on demand | `src/renderer/runtime.ts:1-9`, `docs/specs/mcp-endpoint.md §1` |
| 2 | The main process runs an MCP server exposing that graph to agents over stdio or Streamable HTTP | `src/main/mcp-server.ts:1-8`, `src/main/mcp-server.ts:1097-1117` |
| 3 | **Goal 1 — implementation test of the `provident-ssr` npm package.** The package is never modified; every defect or requirement gap is catalogued and handed off | `AGENTS.md:8-15`, `docs/defects.md:1-13` |
| 4 | **Goal 2 — prebuild baseline for Electron apps on that framework**: full synthetic-event access + rendered-HTML visibility as MCP endpoints, for agentic use and debugging exposure | `AGENTS.md:16-19` |
| 5 | The app doubles as the implementation-test host for the **sibling package** `provident-storeroom`, whose defects the catalogue carries | `src/main/storeroom.ts:1-20`, `docs/HANDOFF.md:1-8` |
| 6 | The demo app is authored entirely as provident **data** — envelope nodes plus handler-body strings — never as hand-written DOM | `src/shared/demo-envelope.ts:1-18`, `AGENTS.md:22-34` |

## 2. The set

| File | The question it answers | Who it is for |
| --- | --- | --- |
| `docs/brief/README.md` (this file) | What is this, what is it not, where do I start? | anyone arriving cold |
| `docs/brief/use-cases.md` | Who drives this app, with which call, and what do they get back? | agent authors, integrators, test designers |
| `docs/brief/features.md` | What exists, at top level by area — and where is it, and is it admitted? | architects, forkers, reviewers |
| `docs/brief/limits-and-state.md` | What is actually verified, at which layer, what is red, what is owed? | the architect, the next supervisor, anyone about to trust a green |

## 3. What this app is NOT

- **It does not modify either package.** No change to `node_modules/provident-ssr/`, to the adjacent
  `../Preempt-Providence/` source, or to `provident-storeroom`; a finding is a catalogue row, never a
  patch (`AGENTS.md:11-12`, `src/main/storeroom.ts:9-12`, `docs/defects.md:6-9`).
- **It does not render UI outside the provident graph.** Every non-shell element is provident data
  driven through the producing graph; the Electron shell's own chrome (window frame, native menu,
  preload bridge, MCP server) is the only carve-out (`AGENTS.md:22-34`).
- **A UI element rendered outside the framework is invisible to the MCP surface** — it is unreachable
  by `provident.dispatch`, absent from `get_rendered_html` and from `get_markdown` (`AGENTS.md:31-33`).
- **The node suite cannot verify the assembled or rendered app.** In this repo's own layer
  declaration `[T]` is "never assembled-app evidence (no window, no IPC, no transport)"
  (`docs/specs/foundation-app-data-model.md:22`).
- **The DOM shim is deliberately layout-less.** Its own words: *"We do NOT need real layout — only the
  element tree + attribute/text bookkeeping DomAdapter uses"* (`src/shared/dom-shim.ts:1-3`); none of
  `getBoundingClientRect`, `getComputedStyle`, `clientWidth`, `clientHeight`, `offsetWidth` or
  `offsetHeight` appears anywhere in `src/` (repo-wide search of `src/`).
- **The MCP surface cannot push over HTTP.** The HTTP transport is stateless, a fresh server per POST,
  so `notifications/resources/updated` is delivered on stdio only and is a declared no-op on HTTP
  (`src/main/mcp-server.ts:746-773`, `docs/specs/mcp-endpoint.md §2`).
- **The operator-facing Security/Debug panes are not an MCP surface.** They render through their own
  isolated graph scope, and the MCP endpoints read the app Runtime only
  (`src/renderer/secure-panels.ts:302-305`, `docs/specs/mcp-endpoint.md §3.7`).
- **The storeroom seam exposes nothing.** It constructs a store and hands it back; nothing there is
  exposed over MCP, rendered, or persisted to the operator's profile (`src/main/storeroom.ts:9-12,64-75`).

## 4. Start here — three files, in this order

1. **`AGENTS.md`** — the two goals (`:8-19`) and the process rules that every claim in this repo is held
   to: the trio and its additive fourth leg (`:143-164`), the gates (`:216-349`), the typed property
   register (`:302-348`). Read the goals first, the gates before believing any status word.
2. **`docs/specs/mcp-endpoint.md`** — the behaviour contract: transports (§2), the tool surface (§3),
   the authoring surface (§4), the security and permission design (§6), the pins (§7). Note that
   `§3.8` is stale against the code and says so itself (see `features.md`).
3. **`src/main/mcp-server.ts`** — the surface as it actually is: `ALL_TOOLS` (the 22 registered names)
   at `:576-599`, the HTTP/stdio start at `:1097-1117`, the invocation-turn guard at `:830-831`.

## 5. At a glance — three numbers, owned elsewhere

| Number | Value | Cite | Detail lives in |
| --- | --- | --- | --- |
| MCP tools registered | **22** | `src/main/mcp-server.ts:576-599` (`ALL_TOOLS`) | `features.md` §1 |
| MCP resources | **3** (2 fixed URIs + 1 template) | `src/main/mcp-server.ts:638-642` (`ALL_RESOURCES`) | `features.md` §1 |
| Files under `docs/specs/` | **181** = 163 flat + 18 in two contract directories | glob of `docs/specs/*` (163) and `docs/specs/*/*.md` (18) | `features.md` (numbers table) |

Test-file counts, the ledger, and the defect tallies are stated with their tracker named in
`limits-and-state.md` — the per-instrument file counts excepted, which `features.md` §10 owns; none of
them is repeated here.
