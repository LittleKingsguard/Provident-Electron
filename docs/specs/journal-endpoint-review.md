# Journal reversibility endpoints — change-analysis review (step 3 of the three-agent gate)

**Status**: change-analysis of the `journal-endpoint-proposal.md` proposal
(AGENTS.md item 8). Synthesizes the step-1 validity review and step-2 critique;
my own re-read of every cited site confirms both outputs' claims. No files
changed by this document. Companion: `docs/specs/journal-endpoint-proposal.md`
(the proposal), `docs/specs/mcp-endpoint.md` (§3 tools, §8 non-goals),
`src/renderer/runtime.ts`, `src/renderer/renderer.ts`, `src/main/mcp-server.ts`,
`src/main/security.ts`, `src/shared/types.ts`,
`../Preempt-Providence/docs/specs/ops.md` (§6 G14).

## 1. The proposal (recap)

Add three additive MCP tools (`provident.undo` / `provident.redo` /
`provident.replay`) exposing the engine's journal reversibility surface
(`Supervisor.undo()`/`redo()`/`replay()`), which currently has NO MCP
representation. This is the primary finding of the 2026-08-26 feature-
completeness check: the package's journal surface is reachable only through the
`Supervisor` object inside the renderer Runtime, never through an MCP tool.

## 2. Step-1 validity verdict

**VALID-WITH-RESHAPES.** Every factual claim checks out against the code and
`ops.md` §6:

- `Supervisor.undo()`/`redo()`/`replay()` exist (`supervisor.d.ts:286,295,297`)
  and are never called in `src/` (grep = zero hits).
- `provident.op` forwards only forward ops (`ops.js:583` switch; no
  undo/redo/replay kind); `applyCommand` → `supervisor.apply` (`runtime.ts:408`).
- The MCP toolset (17 tools + 3 resources) has no journal tool (`mcp-server.ts`
  `ALL_TOOLS`/`ALL_RESOURCES`; `security.ts` `TOOL_GROUPS`).
- The G14 per-kind undo contract is authoritative as stated (ops.md §6): EXACT
  for state-slice/attach/rows-mint, PINNED NO-OP for destroy, DOCUMENTED NO-OPs
  for detach/move/clone-instance/layer-apply/placement-attach/rows-clear, and
  the `base` marker never undo-able.
- `graph` group is OFF by default; `op`/`load`/`teardown` are in it
  (`security.ts:14,17`; `defaultSecurityConfig` = `['read','dispatch']`).
- The battery drives undo/redo/replay directly (`journal-reversibility.test.ts`).
- `op()` returns `{ status, dirtied?, minted?, renderedHtml, ssrHtml, warnings }`
  (`types.ts:110-117`; `runtime.ts:543-553`).
- `MUTATING_METHODS` gates the live-change push (`renderer.ts:12,85`).

**No factual errors.** The "feature-completeness gap" claim is accurate.

## 3. Step-2 critique

The critique's HIGH findings sharpen the reshapes:

- **H1 (derivability — the core blocker)** — `undo()`/`redo()`/`replay()`
  return `void`; `undoStack`/`redoStack` are PRIVATE (`supervisor.d.ts:64-65`).
  The host cannot read which op kind is at the top of the stack, whether the
  stack is empty, or the inverted dirty set. After a condense, `journal[last]`
  is NOT the top of the undoStack (the stack is filtered to post-base ids while
  the journal retains the base marker). The proposed `{ status, journalId?,
  dirtied? }` return promises fields the host cannot produce faithfully from the
  public surface. **This is a package gap → record in `docs/defects.md` +
  `docs/HANDOFF.md` (AGENTS.md item 7), not a host patch.**
- **H2 (base-restore re-render)** — replay/undo/redo can trigger `_restoreBase`,
  a quiet graph-REPLACE that swaps `this.nodes` for fresh seed objects. The
  `op` path's focused-slice recompile (`runtime.ts:410-423`) + `rebuildIdIndex`
  is insufficient — a base-restoring journal op needs a WHOLE-graph rebuild +
  full id-index rebuild, not a dirty-subset recompile.
- **M1 (honest no-op status)** — with most op kinds documented no-ops (and
  `dispatch` never journaled), the tool must loudly report "documented no-op" /
  "nothing to undo/redo" / "base-boundary" or agents get false confidence. This
  is coupled to H1.
- **M2 (honest value framing)** — undo covers only a subset of `provident.op`
  kinds and NOT dispatch mutations (dispatch is a trigger, never journaled);
  and it is invalid after any re-derive (a fresh `Supervisor` empties the
  stacks). The proposal's "undo instead of re-derive" is a real but one-shot
  win.
- **L1 (surface shape)** — three tools is acceptable, but a single
  `provident.journal { action: 'undo'|'redo'|'replay' }` is cleaner given the
  shared void-return + shared derivability logic. Either is fine once H1 is
  resolved.
- **L2 (security)** — `graph`-group (OFF by default) is correct and fail-closed.
- **L3 (MUTATING_METHODS)** — all three belong in the set; complete.
- **L4 (scope)** — bounded; the only scope risk is H1 tempting a host-side
  "shadow the stacks" subsystem (drift-prone) — route to `docs/defects.md`
  instead.

## 4. Change-analysis synthesis

Both steps agree the proposal is directionally sound and worth shipping, but
NOT implementable as written: the return-shape derivation (H1) is a genuine
package gap, and the base-restore re-render (H2) is a host concern the proposal
under-specifies. The following reshapes are REQUIRED before implementation.

### Reshape J1 — record the derivability gap as a package defect (blocking)
The host cannot faithfully report `status`/`dirtied`/stack-top-kind because
`undo()`/`redo()`/`replay()` return `void` and the undo/redo stacks are private.
Record this in `docs/defects.md` (OPEN) + `docs/HANDOFF.md` as a handoff item:
the upstream should add a public read of the stack-top entry (kind + id) and
ideally the inverted dirty set (or a `{ status, dirtied }` return on
undo/redo/replay). **This repo does NOT patch the package.** Until the upstream
lands it, the host return contract is narrowed to what it can honestly derive.

> **RESOLVED BY UPSTREAM (2026-08-26, provident-ssr 0.2.1)** — the upstream
> landed the exact J1 reshape as `docs/specs/undo-redo-report.md` (DECIDED):
> `undo()`/`redo()`/`replay()` now return an `UndoRedoReport`
> (`{ status: 'applied'|'no-op'|'base-boundary', scheduledDirtied, stackTopKind?,
> redoTopKind?, baseBoundary }`) + read-only stack accessors (`undoDepth`,
> `redoDepth`, `undoTopKind`, `redoTopKind`, `undoBaseBoundary`). The
> `scheduledDirtied` is the markPass2-SCHEDULED (pending-flush) set — a host
> awaiting settled states must `await flush()` + `takePass2States()`. This repo
> bumped to `provident-ssr@^0.2.1` (2026-08-26) and typecheck is clean. The
> host return contract below (J2) is now UNBLOCKED — the host can report
> `status`/`scheduledDirtied`/`stackTopKind`/`baseBoundary` faithfully from the
> report, and the narrowed J2 shape is superseded by the full report surface.

### Reshape J2 — narrow the return contract to what the host can derive
Given J1, the tool return shape is narrowed to:
`{ status, renderedHtml, ssrHtml, warnings }` where `status` is one of
`'applied'` | `'no-op'` | `'nothing-to-undo'` | `'nothing-to-redo'` |
`'base-boundary'`. The host derives `status` from a **before/after re-render
snapshot** (a whole-graph shape-sig diff, reusing the existing `shapeSig()`
machinery) + the journal length, NOT from a private stack read. `dirtied` and
`journalId` are DROPPED from the return (not derivable faithfully). The
`base-boundary` case is detected by the host as "journal length unchanged AND
shape unchanged AND a base marker present" — a best-effort detection, documented
as such (the engine's `base-boundary` warn is console-level and not catchable).

> **SUPERSEDED BY UPSTREAM 0.2.1 (2026-08-26)** — the J1 fix gives the host a
> faithful `UndoRedoReport` (`status`/`scheduledDirtied`/`stackTopKind`/
> `redoTopKind`/`baseBoundary`) + read-only stack accessors. The narrowed
> before/after-snapshot derivation and the dropped `dirtied` field are no longer
> needed. The tool return shape is now the full report surface:
> `{ status, scheduledDirtied, stackTopKind?, redoTopKind?, baseBoundary,
> renderedHtml, ssrHtml, warnings }` (the host maps the engine's
> `scheduledDirtied` → the tool's `dirtied` after `await flush()` +
> `takePass2States()`).

### Reshape J3 — whole-graph rebuild on the base branch (host)
The host's journal-op handler must detect the base-restore branch and do a
WHOLE-graph recompile + full `rebuildIdIndex`, NOT the focused-slice recompile
the `op` path uses. The `op`-path skeleton (render + rebuildIdIndex) is the
right model, but the base branch swaps node objects and must rebuild from
scratch. This is a host-side concern (no package change).

### Reshape J4 — honest value framing in the spec
The spec must state: undo reverses only the EXACT subset (state-slice/attach/
rows-mint); destroy is a pinned no-op; detach/move/clone-instance/layer-apply/
placement-attach/rows-clear are documented no-ops; `dispatch` mutations are
NEVER undoable (dispatch is a trigger, not a journal entry); and the stacks are
emptied by any re-derive (`load`/`code.load`/`teardown` create a fresh
`Supervisor`). The tool's `status` must make a no-op explicit, never silent.

### Reshape J5 — surface shape: single `provident.journal { action }` (recommended)
Adopt a single `provident.journal` tool with a discriminated
`action: 'undo'|'redo'|'replay'` input, rather than three separate tools. All
three share an identical void-return/derivability problem and an identical
return shape; one tool collapses the duplicated host logic into one handler and
one spec. (Three tools is acceptable if the gate prefers the one-tool-per-
operation pattern, but the single-tool form is cleaner and is the recommendation.)

### Reshape J6 — the `graph`-group registration checklist (five seams)
1. `TOOL_GROUPS` in `src/main/security.ts` — `'provident.journal': 'graph'`.
2. `ALL_TOOLS` in `src/main/mcp-server.ts`.
3. `RpcMethod` union in `src/shared/types.ts`.
4. The renderer `switch` case in `src/renderer/renderer.ts`.
5. `MUTATING_METHODS` in `src/renderer/renderer.ts` (so the live-change
   notification fires after a journal op).
Plus a gating test: `groupForTool('provident.journal') === 'graph'` and it is
OFF under the default `['read','dispatch']` set.

### Reshape J7 — no-requestId pin
`undo`/`redo`/`replay` take no payload, so there is no idempotency key; a
double-undo is intrinsically non-idempotent (undoes two ops). The spec must
state this explicitly (no `requestId` field) so a retried call after a network
error does not silently double-undo.

### Reshape J8 — app-Runtime-only pin
The tool targets the app Runtime's single `Supervisor`, never the isolated
SecurePanels graph (mirror the §3.6 "never the isolated graph" rule).

## 5. Recommendation

**PROCEED-WITH-RESHAPES.** The proposal is a legitimate feature-completeness
follow-on and the journal surface is worth exposing to agents. The J1-J8
reshapes are required; J1 (the derivability gap → package defect) and J2 (the
narrowed return contract) are the blocking design decisions the gate must force.
J5 (single-tool form) is the recommended surface. Implementation proceeds via
the normal TDD path (red → green → adversarial → greens → doc-review), with the
J1 defect recorded in `docs/defects.md` + `docs/HANDOFF.md` in the same pass.

> **UPDATE (2026-08-26): J1 RESOLVED BY UPSTREAM 0.2.1.** The blocking
> derivability gap is closed — `undo()`/`redo()`/`replay()` return an
> `UndoRedoReport` + read-only stack accessors (`docs/specs/undo-redo-report.md`).
> This repo bumped to `provident-ssr@^0.2.1`; typecheck is clean. J2 is
> superseded by the full report surface. The remaining reshapes (J3 whole-graph
> rebuild on base-restore, J4 honest framing, J5 single-tool form, J6 five-seam
> registration, J7 no-requestId, J8 app-Runtime-only) stand. The proposal is now
> implementable; the J1 defect row in `docs/defects.md`/`docs/HANDOFF.md` is
> recorded as RESOLVED-BY-UPSTREAM.
