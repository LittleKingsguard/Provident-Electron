# Blind-Test — `code.loadBatch` (all-or-nothing batched re-derive)

Status: **BLIND-TEST BATTERY** (AGENTS.md item 10a + the upstream Preempt-
Providence blind-test pattern). You are the blind writer. Produce scenario code
BLINDLY — from the DOCUMENTATION ONLY — and PREDICT each outcome BEFORE running
it. You must NOT read the implementation (`src/renderer/runtime.ts`,
`src/main/mcp-server.ts`, `src/main/security.ts`) to learn behavior; only the
docs + review name the module surface you import.

## Your read-set (read these ONLY)

- `docs/specs/mcp-endpoint.md` §4.1 (the `code.*` CRUD tools, incl. the
  `code.loadBatch` row) + §6.5 (A4)
- `docs/specs/loadbatch-review.md` (B1-B8 — the accepted reshapes)
- `docs/specs/loadbatch-proposal.md` (the proposal)
- `docs/specs/mcp-endpoint.md` §6.2 (the tool groups, for the `code`-group
  gating)

Do NOT read `src/renderer/runtime.ts`, `src/main/mcp-server.ts`,
`src/main/security.ts`, or any `tests/loadbatch*.test.ts` file. You MAY import
what the docs name: `Runtime` (`src/renderer/runtime.js`), `installShim`/`mountEl`
(`src/shared/dom-shim.js`), `demoEnvelope` (`src/shared/demo-envelope.js`),
`ProvidentMcpServer` (`src/main/mcp-server.js`), `SecurityGate`
(`src/main/security.js`), `type McpBackend` (`src/main/mcp-server.js`).

## Your task

For EACH scenario below: (1) decide HOW to express it in code from the docs
ALONE — the exact method name, signature, and assertion are YOUR call, inferred
from the docs; (2) PREDICT the outcome before running; (3) run it; (4) record
the ACTUAL outcome. A mismatch is a DOC-CLARITY / DOC-COMPLETENESS /
CODE-CONSISTENCY finding — record which.

Create `tests/blind-loadbatch.test.ts`. Use `describe`/`it`/`expect`,
`beforeAll(installShim)`. After running, paste the full vitest output.

---

## Scenarios

**S1. A batch applies N ops and re-derives once.** The docs (B5) say
`code.loadBatch` returns the re-derive `LoadResult` (census, renderedHtml,
ssrHtml, warnings) + a per-op status array. From the docs alone, find how to
invoke a batch and what it returns. PREDICT: a batch of N valid ops applies all N
and returns a per-op status for each, plus the re-derive result. (The method
name/signature + the op shape are yours to infer.)

**S2. All-or-nothing — a failing op leaves the envelope untouched.** The docs
(B2) say a batch applies to a clone; on ANY op failure the live envelope is
UNTOUCHED (no half-applied state). PREDICT: a batch where op 1 is valid and op 2
is invalid (e.g. a `create` on a non-array path) throws, and op 1's change is
NOT present afterward. (How you observe "the envelope is untouched" is yours to
infer — the docs describe the envelope as the source of truth.)

**S3. Ordered with dependencies.** The docs (B3) say a later op can reference a
path created by an earlier op in the same batch. PREDICT: a batch that creates an
array entry then sets that entry's value works (the later op sees the earlier
op's result). (The exact op sequence is yours to infer.)

**S4. A malformed op is rejected.** The docs (B4) say a malformed op (unknown
kind / bad shape) is rejected. PREDICT: a batch with an unknown op kind throws,
and the envelope is untouched. (The error shape is yours to infer.)

**S5. No-envelope case.** The docs (B7) say `code.loadBatch` throws "no envelope
loaded" when there is no legacy envelope (an A1 doc load sets it to null).
PREDICT: after a doc load, a batch throws the no-envelope error. (How you do a
doc load is yours to infer — the docs describe the A1 snapshot path.)

**S6. `code`-group gating.** The docs (B6) say `code.loadBatch` is a `code`-group
tool (OFF by default). PREDICT: under the default gate (`read`+`dispatch`), the
tool is NOT allowed/registered; after enabling `code`, it is. (How you observe
"allowed/registered" is yours to infer — the docs describe the tool groups.)

---

## Report format

1. For EVERY scenario, show: the code you wrote blindly, the PREDICTION line,
   and the RUN result (PASS/FAIL).
2. Classify each mismatch:
   - **DOC-CLARITY**: the doc prose was ambiguous / self-contradictory / named
     a surface or value it did not pin (quote the doc line).
   - **DOC-COMPLETENESS**: the doc omitted a scenario/edge/return-shape that
     the code exposes.
   - **CODE-CONSISTENCY**: the doc's claim contradicts the live behavior (quote
     the doc claim vs the observed output).
3. Where the docs left an implementation decision open (the method/op/error
   you had to infer), note it — that is the intended exercise.
