# Proposal — `code.loadBatch` / write buffer (A4)

**Status**: PROPOSAL — subject to the three-agent review gate (AGENTS.md item 8:
validity → critique → change-analysis). No code yet. This is the current
SPECULATIVE row in `docs/pending.md` ("`code.loadBatch` / write buffer (A4)").

**Date**: 2026-08-25.
**Target**: a change to THIS repo's MCP contract (`docs/specs/mcp-endpoint.md`).

## 1. The proposal

Add a `provident.code.loadBatch` tool (or a write-buffer surface) that stages N
`code.*` envelope edits and performs **ONE** re-derive (a single teardown +
translate + compile + render) instead of one per edit.

Today, each `code.set`/`code.create`/`code.delete` mutates the envelope in place,
and `code.load` re-derives the whole graph. An agent making N edits must call
`code.load` N times (or once at the end). The A4 reshape documented `code.load`
as O(graph) per edit (non-incremental; a render discontinuity — the prior view is
destroyed then rebuilt; a 4095-element tree is the ~2.8s enumeration pass). A
batch surface lets an agent stage N edits and re-derive once.

## 2. The current speculative row (docs/pending.md)

> **`code.loadBatch` / write buffer (A4)** — stage N `code.*` envelope edits and
> perform ONE re-derive (a single teardown + translate + compile + render)
> instead of one per edit. | 2026-08-25 (shifted from the A4 doc-note) | The A4
> reshape (mcp-endpoint.md §6.5) documented `code.load` as O(graph) per edit
> (non-incremental; a render discontinuity — the prior view is destroyed then
> rebuilt; a 4095-element tree is the ~2.8s enumeration pass). `code.loadBatch`/
> write-buffer is the FUTURE batching surface — currently `code.*` edits
> accumulate on the envelope until an explicit `code.load`. **SPECULATIVE — not
> implemented, no gate yet.** A future gate: stage N edits in one write buffer,
> one `code.loadBatch` re-derive; must preserve P-C2 (re-load is the apply
> step), P-C4 (schema-validate the batch before applying), and the A4
> non-incremental-cost framing.

## 3. Why this matters

- **Efficiency**: N `code.*` edits + one `code.loadBatch` = ONE re-derive,
  instead of N `code.load` calls (each O(graph)). For a large tree this is the
  difference between ~2.8s and ~2.8s·N.
- **Atomicity**: a batch is validated once (P-C4) and applied once — an agent
  can stage a coherent set of edits (e.g. add a hook provider + a handler body +
  a component binding) and materialize them together, rather than risking a
  half-applied intermediate state.

## 4. Design questions the gate must resolve

1. **Surface shape**: a `provident.code.loadBatch` tool that takes an array of
   `code.*` operations (`[{op:'set', path, value}, {op:'create', path, entry},
   {op:'delete', path, index}]`) and applies them to the envelope, then ONE
   re-derive? OR a write-buffer (a `code.beginBatch`/`code.commitBatch` pair
   that stages edits on a side buffer, then `code.loadBatch` commits)? The
   former is simpler (one tool, no session state); the latter matches the
   "write buffer" name but adds session state.
2. **Ordering + atomicity**: are the batch ops applied in order, and is the
   whole batch rejected (P-C4) if ANY op is invalid — or are valid ops applied
   and invalid ones reported? (The current `code.load` rejects the whole
   envelope on any bad warning.)
3. **The envelope is the source of truth**: does `code.loadBatch` mutate the
   SAME `this.envelope` the individual `code.*` tools mutate (so a batch is
   just N staged edits + one load), or a separate buffer that must be merged?
4. **Interaction with the existing `code.*` tools**: can an agent mix
   individual `code.set` calls with a `code.loadBatch`? (e.g. stage 2 edits via
   `code.set`, then `code.loadBatch` with 1 more, then `code.load`.)
5. **Security group**: `code.loadBatch` is a WRITE + re-load (eval via
   `new Function` on load) — it belongs in the `code` group (OFF by default),
   like `code.load`.
6. **The A4 non-incremental cost**: a batch is still ONE O(graph) re-derive —
   it does NOT make `code.load` incremental. The win is N-edits→1-re-derive, not
   a faster re-derive. Confirm this framing.

## 5. Constraints (this repo)

- P-C2: re-load is the apply step — `code.loadBatch` is the apply step for the
  staged batch.
- P-C4: schema-validate the batch before applying (a malformed edit is rejected
  with the framework's own codes, never applied silently).
- P-C5: authoring is a bounded unit — the blast radius is the envelope + one
  re-derive.
- P-E6: JSON-safe boundary (the batch ops are structured-clone-safe).
- The A4 non-incremental-cost framing (a batch is one O(graph) re-derive).
- No package change — `provident-ssr` is untouched (the batch is host-side
  envelope editing + the existing `loadEnvelope` path).
