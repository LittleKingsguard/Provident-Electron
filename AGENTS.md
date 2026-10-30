# Provident-Electron — agent notes

**The authoritative corpus is `strata/`. Read `strata/brief.md` first.** This file is a pointer: it
carries the two goals and the non-negotiables, each citing the row that owns it. The **steps** live in `strata/decisions.md` and the six procedures beside it (D-3); a non-negotiable here is a floor, never a
procedure — where the two could be confused, the row decides.

## The two goals

1. **Implementation test of `provident-ssr`** and of the sibling `provident-storeroom`. Upstream source
   and docs live in the adjacent `../Preempt-Providence/` checkout, which is not a dependency of this
   repo. **Neither package is ever modified**: a defect or requirement gap is recorded with symptom,
   reproduction, suspected root cause and proposed fix shape, upstream-owned, in the record of the unit
   that surfaced it, which stays live in `strata/records/` (`strata/decisions.md` D-5, D-52).
2. **Prebuild baseline for Electron apps on that framework** — synthetic-event access plus
   rendered-HTML visibility as MCP endpoints, for agentic use and debugging exposure.

## Non-negotiables

- **UI authority.** Every element outside the Electron shell's own chrome is provident data — envelope
  nodes, handler bodies, hooks, component bindings — driven through the producing graph, never
  hand-written DOM; an element rendered outside it is invisible to `provident.dispatch`,
  `get_rendered_html` and `get_markdown`. Source: the charter's own section, retained in
  `archive/gate-corpus-2026-10-29/AGENTS.md:22-34` (§ "Project-wide constraint (UI rendering)").
- **A node-suite green is envelope-green, never app-green** — the module rows run under a layout-less DOM
  shim; the boot battery that spawns the built bundle states its own exception, and even that green is a
  process green, never a rendered-surface one (`strata/brief.md` §6, D-27).
- **What gates is the boundary, not the machinery** — `tests/e2e/**` and the Electron legs are retained
  because each states an agent-or-drive exchange at a process boundary; an integration or unit scenario
  that stood when the rework was decided is marked and reports **on notice**, while one authored after
  that sweep gates (`strata/decisions.md` D-30, D-40). Never marked: a `tests/e2e/` file, or the
  worktree boundary row — a loop that marks the row measuring its own tree measures nothing.
- **Four legs before any change is reported** — `npm test`, `typecheck`, `typecheck:tests`, `build` (`brief.md` §6).
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

Branch `strata` carries the work; `main` is frozen until the user grants merge permission (`strata/decisions.md`
D-6). **Which units are landed, open or closed is state, not prose**: read `strata/.strata/units/*.json` and the
map's `strata/modules.json`, and take the counts from `strata/brief.md` §6 — never from this file (D-26, D-43).

## Commands

```sh
npm install && npm run build      # main, preload, standalone, battery host, renderer
npm test && npm run typecheck && npm run typecheck:tests
npm start                         # build + launch; --mcp-transport=http|stdio, default http :3787
npm run mcp -- --help             # the local MCP CLI, against the battery host or a running app
npm run battery | npm run divergence | npm run ui | npm run panes   # Electron legs; ui/panes need a DISPLAY
```
