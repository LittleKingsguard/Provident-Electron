# Provident-Electron — Agent Configuration

Context management and process guidelines for agents working in this
repository. This is a PORT of the process rules from the upstream
Preempt-Providence repo (`AGENTS.md`, `docs/subagents.md`) adapted to this
project's two distinct goals:

1. **Implementation test of the `provident-ssr` npm package.** The original
   source + documentation live in the ADJACENT `Preempt-Providence` folder
   (not a dependency of this repo — read it at
   `../Preempt-Providence/`). Agents MUST NOT make direct changes to the
   package code (`node_modules/provident-ssr/` or the upstream folder).
   Any defect or requirement gap discovered during implementation is
   CATALOGUED in `docs/defects.md` and handed off as an issue to the
   original project (see `docs/HANDOFF.md`).
2. **Prebuild baseline for Electron apps using the provident-ssr framework.**
   Full synthetic-event access + rendered-HTML visibility for MCP endpoints
   (agentic use + debugging exposure). This implements the upstream's parked
   "Phase C" (cross-process MCP/Electron endpoint) as a consumer.

## Context budget rules (imported from upstream)

1. **75% threshold**: past 75% of available context, stop starting new work
   and switch to preparing handover documents so a fresh sub-agent can
   continue.
2. **50% task threshold**: a task estimated to take >50% of context is
   delegated to sub-agents, never done inline.

## Process requirements

3. **TDD, always (imported, subagents.md workflow)**: every source-code task
   is red → green → verify, in order: (a) write tests encoding the states /
   fail-states (red); (b) run them and report the failing set; (c) implement
   the least code that makes them green; (d) re-run the validation (item 5).
   A change that adds no test is itself a review finding. Delegation prompts
   must never be "implement X and add tests".
4. **Validation after features/tests**: after any feature or test change run
   the trio before reporting complete:
   ```
   npm test           # vitest — full suite
   npm run typecheck  # tsc --noEmit
   npm run build      # esbuild bundles (main cjs + preload cjs + renderer esm)
   ```
   (This project has no demo-smoke; the upstream's trio is test + typecheck +
   demo:smoke. The build is this project's third leg.)
5. **Specs + decision records**: behavior contracts live in `docs/specs/*.md`
   (this repo's contract = the MCP endpoint spec, `docs/specs/mcp-endpoint.md`).
   Design decisions are recorded in `docs/decisions.md` as `DECIDED:` /
   `ACTIVE` / `SUPERSEDED` rows. Keep both in sync with the implementation.
6. **Document-archival loop (imported, adapted)**: after each significant
   change: (a) merge new/changed information into the core docs —
   `docs/specs/mcp-endpoint.md`, `docs/defects.md` (active defect/finding
   list — open on top, fixed rows below), `docs/decisions.md`,
   `docs/pending.md` (parked/upstream constraints + speculative items),
   `docs/next-steps.md` (work queue); (b) archive obsolete docs into the
   GITIGNORED `archive/` dir (`archive/<topic>/<date>-<name>.md`); (c) never
   leave a citation pointing at a moved file. The `archive/` dir is excluded
   from builds and tests.
7. **Defect-catalogue + handoff rule (this project's core duty)**: ANY defect
   or requirement gap discovered in the `provident-ssr` package — a behavior
   that contradicts `../Preempt-Providence/docs/specs/*.md`, a missing
   convenience an MCP/Electron host needs, a documentation gap — is recorded
   in `docs/defects.md` with: the observed symptom, the reproduction, the
   suspected root cause, and a proposed fix shape (upstream-owned). The
   finished catalogue is written to `docs/HANDOFF.md` (the issue-handoff
   document) before a pass is reported complete. DO NOT fix the package.

## Process gates for sub-agents (imported, adapted)

8. **Proposal review — three-agent gate (imported)**: a user/design proposal
   that changes THIS repo's contract goes through three sequential read-only
   reviews first (validity → critique → change-analysis), then lands as
   `docs/specs/<proposal>-review.md` before any code. Steps 1 and 2 are
   independent; step 3 requires both outputs. This applies to changes to the
   MCP contract — not to fixes inside a documented contract's shape.
9. **Delegation gate (imported)**: a code unit is only delegable once (a) its
   `docs/specs/*.md` contract exists, (b) a TestWriter unit has run and
   reported the red set. Reviewer sub-agents are read-only.

## Roles (imported, adapted)

| Role | Tool set | Guardrails |
| --- | --- | --- |
| Architect (me / user) | read/edit | owns decisions; makes design calls |
| Reviewer | explore/general, read-only | never edits; returns findings; a code change with no test is a finding |
| TestWriter | write/bash | writes tests FIRST (red) from specs; never implements alongside |
| Implementer | read/edit/bash | runs only after TestWriter reports red; least code to go green; re-runs trio |

Inputs always read from `docs/specs/*.md` + the upstream docs
(`../Preempt-Providence/docs/`) unless stated. Artifacts commit in the repo.