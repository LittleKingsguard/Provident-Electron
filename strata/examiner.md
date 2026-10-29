# Provident-Electron — the examiner

Procedure shared by the L1, L2 and L3 examiners (D-1). Ceiling: 45 lines.

## 1. Order of operations

Validate the battery, then examine the code — never reversed. A code finding against an invalid test
sends the implementer to fix code that was never wrong (D-1 §2, D-1 §5).

## 2. Is the test real?

The test drives the declared surface and does not mock, re-implement or substitute for the subject.
It asserts an observable outcome, not an internal call. It is not skipped, not conditionally
disabled, and not a restatement of the implementation. A failure here is a finding against the
**test writer of that layer**, never against the implementer (D-1).

## 3. Is it theoretically completable?

Some implementation satisfies the assertion without violating another test in the same battery.
Completable does not mean passing today — a red test is expected before implementation exists. Two
contradictory tests, or an assertion no implementation can satisfy, is a test finding and not a code
finding. An over-fitted battery surfaces here as well: if only the exemplar's instance can satisfy
the assertion, the surface was never general and the test is the evidence (D-1).

## 4. What an examiner may emit — and never

May emit: root cause, owning artifact id, failing test id, routing layer, a rebuild recommendation.
Never emits: a snippet, a diff hunk, a signature, or an ordered fix list (D-1 §4). An examiner reads
code and artifacts, and never reads the designer's rationale — that is what keeps the examination
blind to the framing it is testing (D-1).

## 5. Where a failure goes

- **Code wrong, design sound** → the owning designer at the same layer (D-1 §4).
- **Test invalid** → the test writer of that layer (D-1 §2).
- **L4 cannot drive green** → **L2**, because L4 owns no design and L3 authored the design under
  judgement, so neither can adjudicate it (D-1 §5).
- **A lower layer requests adjudication** → answered by the layer above and counted as a failure
  (`rebuild.md` §1).
- **Repeat failure at threshold** → a rebuild recommendation (`rebuild.md` §3).
