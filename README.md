# Provident-Electron

A prebuilt Electron shell for apps built on the Provident SSR framework
([`provident-ssr`](https://www.npmjs.com/package/provident-ssr)): **full synthetic-event access** and
**rendered-HTML visibility**, exposed as MCP endpoints for agentic use and debugging exposure.

Its two goals: the **implementation test** of `provident-ssr` and `provident-storeroom` (neither package
is ever modified; findings are recorded and handed off), and a **prebuild baseline** a fork inherits.

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
Electron RENDERER — the provident-ssr producing process (graph + adapters)
```

The graph is authoritative: a synthetic event mutates it, then the host re-emits both the live DOM and
the SSR fragment. The HTML is a view, never a live surface.

## Setup and run

```sh
npm install && npm run build   # main (esm), preload (cjs), standalone, battery host, renderer (esm)
npm test && npm run typecheck && npm run typecheck:tests
npm start                      # build + launch, HTTP MCP on :3787 (stdio: -- --mcp-transport=stdio,
                               # or PROVIDENT_MCP_TRANSPORT / PROVIDENT_MCP_PORT)
npm run mcp -- --help          # the local MCP CLI
npm run battery | npm run divergence | npm run ui  # the Electron legs; ui needs a DISPLAY
```

## The MCP surface

**27 tools** in six groups — `read` six plus the three resources, `dispatch` two, `graph` six, `code` five,
`module` three, `data` five. The default grant is `['read','dispatch']`, so **8 tools register**; a disabled
group's tools are absent from `tools/list` rather than present-and-refusing.

**A group is granted by the operator alone**, through the Settings pane: `security.set` → `IPC_SECURITY_SET`
→ the surface module, which commits the grant and re-patches the live gate. A grant is a group name added to
the persisted `enabled` set in `<userData>/provident-operator-settings.json`. The act is manual-UI only and
**never an MCP tool** — no agent can grant itself capabilities.

**The pane grants every group the gate validates**, six of them: `src/renderer/secure-panels.ts` builds one
toggle per entry of a label table the gate's own `ToolGroup` types, so `data` is an operator control like the
other five, and a group the gate gains without a pane row is a `tsc` error rather than a silent gap
(`docs/L1/secure-panels.md` §7 `E-1`; `strata/decisions.md` D-35, D-38).

A drive is `provident.dispatch` (by css.id, nodeId or wire); observations are `get_rendered_html`,
`get_markdown`, `list_targets` and `get_node_state`; every emitted element carries `data-node-id`.

## License

AGPL-3.0, matching the `provident-ssr` package license.
