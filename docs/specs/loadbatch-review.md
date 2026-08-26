# `code.loadBatch` / write buffer — change-analysis review (step 3 of the three-agent gate)

**Status**: change-analysis of the `code.loadBatch` proposal (AGENTS.md item 8).
Synthesizes the step-1 validity review and step-2 critique; my own re-read of
every cited site confirms both outputs' claims. No files changed by this
document. Companion: `docs/specs/loadbatch-proposal.md` (the proposal),
`docs/specs/mcp-endpoint.md` (§4 code-CRUD, §6.5 A4), `src/renderer/runtime.ts`,
`src/main/security.ts`, `src/main/mcp-server.ts`, `src/shared/types.ts`.

## 1. The proposal (recap)

Add a `provident.code.loadBatch` tool that stages N `code.*` envelope edits and
performs ONE re-derive (a single teardown + translate + compile + render) instead
of one per edit. The current `code.*` tools mutate `this.envelope` in place and
`code.load` re-derives the whole graph (A4: O(graph) per edit).

## 2. Step-1 validity verdict

**VALID-WITH-RESHAPES.** The core semantics (N staged edits → one re-derive) are
fully representable on the existing envelope surface — a batch is a loop over the
existing `codeSet`/`codeCreate`/`codeDelete` mutators + one `codeLoad`. The
O(graph)-per-edit claim is accurate. Four reshapes required:
- **Drop the write-buffer/`beginBatch`/`commitBatch` variant** — it adds session
  state that is incompatible with the stateless-HTTP constraint (a fresh
  McpServer per POST). Keep the one-tool `code.loadBatch(ops[])` form.
- **Add the full MCP/IPC wiring** — `RpcMethod` member, renderer switch case +
  `MUTATING_METHODS`, battery-host case, `mcp-server.ts` `ALL_TOOLS` + input
  schema.
- **Add `'provident.code.loadBatch': 'code'` to `TOOL_GROUPS`** — otherwise the
  tool never registers (fail-closed).
- **Resolve the P-C4 atomicity question** — the mutators operate in place with
  no rollback, so all-or-nothing needs a mechanism.

## 3. Step-2 critique

The critique's HIGH findings sharpen the reshapes:
- **H1** — the efficiency claim is a strawman: P-C2 already lets an agent make N
  `code.set` calls (no re-derive) then ONE `code.load`. The batch's real win is
  N−1 MCP/IPC round-trips + a single validation + (if atomic) all-or-nothing —
  NOT a reduction in O(graph) re-derives. The "~2.8s·N" arithmetic is wrong.
- **H2** — atomicity is asserted without a mechanism: in-place mutation can't
  roll back. Adopt all-or-nothing via clone-then-validate-then-commit.
- **H3** — ordering vs validate-before-apply is a contradiction for dependent
  ops (a later op referencing a path created by an earlier op). Resolve: apply
  ops sequentially to the clone, validating each op's path against the evolving
  clone, then full P-C4 translate validation before commit.
- **H4** — the `code`-group registration is a six-site checklist (TOOL_GROUPS,
  ALL_TOOLS, RpcMethod, renderer switch, MUTATING_METHODS, battery-host) — a
  miss at any site creates a gate bypass or a dead tool.
- **M1** — reject the write-buffer form (session state hazard).
- **M2** — the no-envelope case (A1 doc loads set `this.envelope = null`) must
  throw the same "no envelope loaded" error.
- **M3** — the batch-op schema is under-specified (esp. `delete`'s two
  addressing forms).
- **M4** — the return shape is unspecified (LoadResult + per-op status).
- **L1-L3** — honest benefit framing; a test matrix; the eval-in-validation note.

## 4. Change-analysis synthesis

Both steps agree the proposal is directionally sound but NOT implementable as
written — it leaves the two most consequential decisions (atomicity mechanism,
ordering-vs-validation) open and overstates its value. The following reshapes are
REQUIRED before implementation.

### Reshape B1 — single-tool form only (reject the write-buffer)
Adopt `provident.code.loadBatch(ops[])` — an array of ops, one call, no session
state. The `beginBatch`/`commitBatch` write-buffer variant is REJECTED (it
violates the stateless-HTTP constraint and adds a second source of truth).

### Reshape B2 — all-or-nothing atomicity via clone-then-validate-then-commit
Apply all ops to a `structuredClone` of the envelope. On any op failure, discard
the clone — the live `this.envelope` is untouched. Only on full success, commit
the clone to `this.envelope` and re-derive once. This honors P-C4 ("rejected
with the framework's own codes, never applied silently") and the "no half-applied
state" claim.

### Reshape B3 — ordering with dependencies
Apply ops SEQUENTIALLY to the clone, validating each op's path against the
EVOLVING clone (so a later op can reference a path created by an earlier op),
then run the full P-C4 translate validation on the final clone before commit.
This gives both ordering-with-dependencies AND all-or-nothing.

### Reshape B4 — pinned batch-op schema
A discriminated union per op: `{op:'set', path, value}` /
`{op:'create', path, entry}` / `{op:'delete', path, index?}` — with the
`delete` addressing rule (path-index vs `index` arg, mutually exclusive, F2/F8)
pinned. A malformed op is rejected with the framework's codes (P-C4), never
applied silently.

### Reshape B5 — return shape
`LoadResult` (census, renderedHtml, ssrHtml, warnings) + a per-op status array
(or, on rejection, the failing op index + code) so an agent can correct a
rejected batch.

### Reshape B6 — the `code`-group registration checklist (six sites)
1. `TOOL_GROUPS` in `src/main/security.ts` — `'provident.code.loadBatch': 'code'`.
2. `ALL_TOOLS` in `src/main/mcp-server.ts`.
3. `RpcMethod` union in `src/shared/types.ts`.
4. The renderer `switch` case in `src/renderer/renderer.ts`.
5. `MUTATING_METHODS` in `src/renderer/renderer.ts` (so the live-change
   notification fires after a batch re-derive).
6. The `battery-host.ts` dispatch.
Plus a gating test: `groupForTool('provident.code.loadBatch') === 'code'` and it
is OFF under the default `['read','dispatch']` set.

### Reshape B7 — no-envelope case
`code.loadBatch` throws the same "no envelope loaded" error when
`this.envelope === null` (A1 doc loads), mirroring the other `code.*` writes.

### Reshape B8 — honest benefit framing + test matrix
The batch's win is N−1 round-trips + a single validation + all-or-nothing — NOT
a reduction in the single O(graph) re-derive cost (A4 unchanged). A test matrix
covers: all-or-nothing rejection, dependent-op ordering, no-envelope,
malformed-op schema rejection, `code`-group gating (OFF by default), and the
live-change notification (N3) firing.

## 5. Recommendation

**PROCEED-WITH-RESHAPES.** The proposal is a legitimate A4 follow-on and the
single-tool form is implementable on the existing envelope surface. The B1-B8
reshapes are required; B2 (atomicity mechanism) and B3 (ordering rule) are the
blocking design decisions the gate must force. The write-buffer variant is
rejected. Implementation proceeds via the normal TDD path (red → green →
adversarial → greens → doc-review).
