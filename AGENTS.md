# Provident-Electron — agent notes

**The authoritative corpus is `strata/`. Read `strata/brief.md` first.** This file is a pointer: it
carries the two goals and the non-negotiables and no workflow rule — the procedure lives in
`strata/decisions.md` and the six procedure files beside it (D-3).

## The two goals

1. **Implementation test of `provident-ssr`** and of the sibling `provident-storeroom`. Upstream source
   and docs live in the adjacent `../Preempt-Providence/` checkout, which is not a dependency of this
   repo. **Neither package is ever modified**: a defect or requirement gap is recorded with symptom,
   reproduction, suspected root cause and proposed fix shape, upstream-owned, in the record of the unit
   that surfaced it and archived with that unit (`strata/decisions.md` D-5).
2. **Prebuild baseline for Electron apps on that framework** — synthetic-event access plus
   rendered-HTML visibility as MCP endpoints, for agentic use and debugging exposure.

## Non-negotiables

- **UI authority.** Every element outside the Electron shell's own chrome is provident data — envelope
  nodes, handler bodies, hooks, component bindings — driven through the producing graph, never
  hand-written DOM; an element rendered outside it is invisible to `provident.dispatch`,
  `get_rendered_html` and `get_markdown`. Source: the charter's own section, retained in
  `archive/gate-corpus-2026-10-29/AGENTS.md:22-34` (§ "Project-wide constraint (UI rendering)").
- **A node-suite green is envelope-green, never app-green** — `npm test` runs under a layout-less DOM
  shim, with no window, no IPC and no transport (`strata/brief.md` §6).
- **Four legs before any change is reported**: `npm test`, `npm run typecheck`,
  `npm run typecheck:tests`, `npm run build` (`strata/brief.md` §6).
- **No layer judges its own design**: examiners diagnose and never patch, and L4 owns implementation
  only (`strata/examiner.md`, `strata/rebuild.md`).

## Where things are

| Path | What it holds |
|---|---|
| `strata/` | the live corpus: brief, decisions, six procedures, platform facts, unit state |
| `docs/L1/`, `docs/L2/<module>/`, `docs/L3/<module>/` | layer design scopes, written by their layers only |
| `src/main/`, `src/renderer/`, `src/shared/` | the app: MCP server + IPC bridge, producing process, shared modules |
| `tests/`, `scripts/`, `demo/` | the suite, the Electron legs and MCP CLI, the live pane-drag demo |
| `archive/gate-corpus-2026-10-29/` | the retired gate corpus; `docs/<x>` resolves here as `<x>` |

## Current state

Branch `strata` carries the bootstrap and `main` is frozen until the user grants merge permission
(`strata/decisions.md` D-6). Three units have landed on `provident-storeroom`: the central data store
(the `data` group), the security record rebuilt as its own isolated instance, and the retirement of the
old settings carrier — more are queued behind them, and the map is filed with a row per module (D-7, D-22).
Where work stands is state, not prose: `strata/.strata/units/*.json`.

## Commands

```sh
npm install && npm run build      # main, preload, standalone, battery host, renderer
npm test && npm run typecheck && npm run typecheck:tests
npm start                         # build + launch; --mcp-transport=http|stdio, default http :3787
npm run mcp -- --help             # the local MCP CLI, against the battery host or a running app
npm run battery | npm run divergence | npm run ui   # the Electron legs; ui needs a DISPLAY
```
