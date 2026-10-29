# Provident-Electron

A prebuilt Electron shell for apps built on the Provident SSR framework
([`provident-ssr`](https://www.npmjs.com/package/provident-ssr)): **full synthetic-event access** and
**rendered-HTML visibility**, exposed as MCP endpoints for agentic use and debugging exposure.

Its two goals: it is the **implementation test** of `provident-ssr` and of `provident-storeroom`
(neither package is ever modified; findings are recorded and handed off), and it is a **prebuild
baseline** a fork inherits for the MCP surface, the gate, both transports and the renderer bridge.

**Read `strata/brief.md` next** — the authoritative brief: what the app is, the layers, the current
unit, and the instruments with their measured readings. `strata/decisions.md` records who decided what
and why; `AGENTS.md` carries the non-negotiables agents work under. `strata/` replaces the older
documentation corpus, retired but preserved at `archive/gate-corpus-2026-10-29/`.

## Architecture

```
MCP client (agent / IDE) ── stdio ──┬── Streamable HTTP (http://127.0.0.1:3787/mcp)
                                    ▼
Electron MAIN process — MCP server (@modelcontextprotocol/sdk) + IPC bridge
   │  IPC: provident:invoke / provident:reply / provident:ready
   ▼
Electron RENDERER — the provident-ssr producing process
   (Supervisor graph + DomAdapter render + SSRFragmentAdapter mirror)
```

The graph is authoritative: a synthetic event mutates the graph, then the host re-emits both the live
DOM and the SSR fragment. The HTML is a view, never a live surface.

## Setup and run

```sh
npm install && npm run build   # main (cjs), preload (cjs), standalone, battery host, renderer (esm)
npm test && npm run typecheck && npm run typecheck:tests
npm start                                       # build + launch, HTTP MCP on :3787
npm start -- --mcp-transport=stdio              # stdio instead
npm run mcp -- --help                           # the local MCP CLI
npm run battery | npm run divergence | npm run ui  # the Electron legs; ui needs a DISPLAY
```

Transports are also selectable with `PROVIDENT_MCP_TRANSPORT` / `PROVIDENT_MCP_PORT`.

## The MCP surface

**22 tools** in five groups: `read` holds six tools and the three resources, `dispatch` holds
`provident.dispatch` and `provident.focus`, `graph` holds the six graph verbs, `code` holds seven
code-tree verbs, `module` holds three. The default grant is `['read','dispatch']`, so **8 tools
register** until the operator enables more — a disabled group's tools are absent from `tools/list`
rather than present-and-refusing.

A drive is `provident.dispatch` (target by css.id, nodeId or wire; answers `{results, dirtied,
renderedHtml, ssrHtml}`); an observation is `provident.get_rendered_html`, `get_markdown`,
`list_targets` or `get_node_state`, and every emitted element carries `data-node-id` back to its node.
The demo envelope renders a counter, an echo input, a gutter card, two theme buttons and two tab
terminals; `demo/pane-drag-demo/` is the live store-integrated panes demo.

## License

AGPL-3.0, matching the `provident-ssr` package license.
