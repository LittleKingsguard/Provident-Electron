# Proposal — Journal reversibility endpoints (`provident.undo` / `provident.redo` / `provident.replay`)

**Status**: PROPOSAL — subject to the three-agent review gate (AGENTS.md item 8:
validity → critique → change-analysis). No code yet. This is the current
feature-completeness gap found in the MCP-endpoint check (2026-08-26): the
`provident-ssr` package's journal surface (`Supervisor.undo()`/`redo()`/`replay()`)
has NO representation in the MCP toolset.

**Date**: 2026-08-26.
**Target**: a change to THIS repo's MCP contract (`docs/specs/mcp-endpoint.md`).

## 1. The proposal

Add three additive MCP tools that expose the engine's journal reversibility
surface to agents:

| Tool | Input | Returns | Semantics |
| --- | --- | --- | --- |
| `provident.undo` | `{}` | `{ status, journalId?, dirtied?, renderedHtml, ssrHtml, warnings }` | invert the top of the `Supervisor` undo stack (per the G14 per-kind table) |
| `provident.redo` | `{}` | `{ status, journalId?, dirtied?, renderedHtml, ssrHtml, warnings }` | re-apply the undone op (no-journal, in-place result refresh) |
| `provident.replay` | `{}` | `{ status, dirtied?, renderedHtml, ssrHtml, warnings }` | re-run the journal in order on the current registry |

Today the engine's journal is reachable only through the `Supervisor` object
inside the renderer Runtime — no MCP tool calls `undo()`/`redo()`/`replay()`.
An agent that mutates the graph via `provident.op` (state-slice, attach, etc.)
cannot reverse a mistake; it must re-derive the whole graph via `provident.load`
or `provident.code.load`. The journal-reversibility battery
(`tests/journal-reversibility.test.ts`) drives these engine methods directly,
but they are invisible to an MCP agent.

## 2. The current gap (feature-completeness check, 2026-08-26)

The `provident-ssr` public surface (`dist/index.d.ts`) exports the full journal
API. The MCP toolset (17 tools + 3 resources) exposes none of it:

- `Supervisor.undo()` / `redo()` / `replay()` — **no MCP tool**.
- `provident.op` only forwards FORWARD ops. The engine's op switch
  (`ops.js:583`) handles `attach`/`detach`/`move`/`destroy`/`placement-attach`/
  `layer-apply`/`rows-mint`/`rows-clear`/`clone-instance`/`state-slice` — no
  `undo`/`redo`/`replay` kind.
- `runtime.applyCommand` → `supervisor.apply(payload)`; undo/redo/replay are
  separate `Supervisor` methods never invoked anywhere in `src/` (grep confirms
  zero hits).

This is a genuine, user-facing feature (reversible mutations) with no endpoint
representation — the primary finding of the completeness check.

## 3. Why this matters

- **Reversibility for agents**: an agent that dispatches a wrong `state-slice`
  or `attach` via `provident.op` can `provident.undo` instead of re-deriving
  the whole graph. This is the journal's whole purpose (ops.md §6 G14).
- **Parity with the engine contract**: the journal-reversibility battery proves
  the engine surface works; the MCP surface should expose it so an agent can
  drive the same contract.
- **Debugging exposure**: undo/redo/replay are the natural "step back / step
  forward / replay" primitives for an agent inspecting a graph's mutation
  history.

## 4. Design questions the gate must resolve

1. **Surface shape**: three separate tools (`provident.undo`/`redo`/`replay`)?
   OR a single `provident.op` with a `kind: 'undo'|'redo'|'replay'`? The
   former is explicit and matches the existing one-tool-per-operation pattern
   (`provident.op` is already the forward-op surface; adding journal kinds to it
   muddies the "managed channel" framing). The latter is fewer tools but
   overloads `op`.
2. **Security group**: undo/redo/replay MUTATE the graph (they re-apply /
   invert journaled ops) — they belong in the `graph` group (OFF by default),
   like `provident.op`/`load`/`teardown`. Confirm.
3. **Return shape**: mirror `provident.op`'s `{ status, dirtied?, minted?,
   renderedHtml, ssrHtml, warnings }`? The engine's `undo()`/`redo()`/`replay()`
   return `void` — the host must derive `dirtied`/`status` from the journal
   state + a re-render. What does `status` report (e.g. `'applied'` vs a
   `base-boundary` warn + fail vs a documented no-op)?
4. **The G14 per-kind contract**: undo is EXACT for `state-slice`/`attach`/
   `rows-mint`, a PINNED NO-OP for `destroy`, and a DOCUMENTED NO-OP for
   `detach`/`move`/`clone-instance`/`layer-apply`/`placement-attach`/`rows-clear`.
   The tool must surface these as `status`/`warnings`, never silently. How does
   the host know which op kind is at the top of the stack to report the right
   status?
5. **`base` boundary (Feature 3)**: an undo that would cross the condensed
   `base` marker warns `base-boundary` + fails. The tool must surface this.
6. **Re-render**: after undo/redo/replay, the host must re-render (the graph
   changed) — mirror the `op` path's `render()` + `rebuildIdIndex()`.
7. **Live-change notification (N3)**: undo/redo/replay MUTATE the app graph —
   they must be added to `MUTATING_METHODS` so the `resources/updated` push
   fires.

## 5. Constraints (this repo)

- No package change — `provident-ssr` is untouched (undo/redo/replay are
  existing `Supervisor` methods; the host just calls them).
- The G14 per-kind undo contract is authoritative (ops.md §6) — the tool must
  not invent inverses the engine doesn't provide.
- The `base` boundary (Feature 3) is never undo-able — the tool surfaces the
  `base-boundary` warn + fail.
- The `graph` group is OFF by default — these tools register only when a human
  enables `graph` (fail-closed, like `provident.op`).
- The stateless-HTTP constraint: these are stateless one-shot tools (no session
  state), compatible with a fresh McpServer per POST.
- The journal is per-`Supervisor`; the Runtime owns ONE supervisor. Undo/redo/
  replay operate on that single live graph.
