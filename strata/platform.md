# Provident-Electron — measured platform constraints

Reference facts the layers design within. Not design: what the deployment and this checkout actually
do, measured 2026-10-29, and **replaced** when a measurement changes, never annotated (D-1).
Ceiling: 60 lines.

## 1. Delegation

- The strata preset lives in the deployment (`~/.dsh/.agent-presets/strata/agent.cordis.yml`), not in
  this tree; the project carries the artifacts, the deployment carries the role walls. Every role
  row is a `dsh-tool-subagent` row with `toolName: role_*`, `maxDepth: 4` (five layers need four
  recursions), and an explicit `toolFilter.allow` list — a role that owns no L4 work cannot call
  `role_l4_implementer` (D-1).
- Children inherit this workspace and the delegation-scoped sandbox mode, and approval is pinned to
  never for a delegated child. A child therefore cannot stall a pass on a permission prompt (D-1).
- Layer returns arrive as text: the `subagent` tool exposes no structured-return parameter, so every
  return carries the envelope of `envelope.md` and is validated after the fact (D-1).

## 2. File walls

- The sandbox enforces whole-workspace modes only (read-only / workspace-write /
  danger-full-access); it cannot restrict writes to a subdirectory. Layer quarantine is therefore
  tool wall plus diff-scope lint, and must never be described as sandbox-enforced (D-1,
  `modules.md` §5).

## 3. This checkout

- Node `v24.20.0`; the bundle set is esbuild, the suite is vitest, the app is Electron `^44.4.5`,
  TypeScript `^5.5.0` (`package.json:18-24`, `node --version`).
- Six npm legs: `test`, `typecheck`, `typecheck:tests`, `build`, plus `battery`, `divergence`, `ui`,
  and the `mcp` CLI shim (`package.json:8-22`). `battery` and `divergence` build first; `ui` needs a
  `DISPLAY` and cannot run in a headless seat.
- The 2026-10-29 readings are `brief.md` §6's: `3 failed / 3,109 passed / 2 skipped` of `3,114`
  over `91` files, and three clean legs. A later pass re-measures rather than quoting this row.
- The repository is the sole workspace: this repo's `src/`, `tests/`, `scripts/` and `strata/`. The
  packages it consumes are read-only for every layer (D-5).

## 4. The harness cap, and the lint that computes it

- A module's harness is capped at `50 + 10×N` with `N` the endpoint count its `modules.json` row
  declares — MCP tools, routes, or a package's exported surface functions. The count is derived, and
  an author who declares their own N is setting their own cap (D-1, `modules.md` §4).
- `strata-lint` is the mechanism: it enforces ceilings per class (brief 150, procedure 60 or less,
  reference 60, register row 40), citation resolution, exemplar quarantine, statement-level
  provenance, state-file shape, envelope shape and module diff scope. It exits non-zero and the
  layer fails with it (D-1).
- It ships with the workflow, not with this project: run it from the workflow checkout against this
  tree, for example `node "../Agent Harness/strata/lint/strata-lint.mjs" strata`, and add
  `--changed <a,b>` when a unit's diff is being scope-checked (D-1).
- A missing `strata/modules.json` is reported as INFO and leaves diff scope unchecked; L1 files it
  with the first unit's map (D-7, `modules.md` §3).
