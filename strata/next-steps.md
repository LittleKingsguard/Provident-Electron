# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **The renderer still owns the tab record, so the app has TWO.** `src/renderer/renderer.ts` keeps `TABS_CONSTRAINT` and nine references to it, and nothing in `src/renderer/` calls `provident.tabs` — so the bridge member landed by D-63 has no consumer, and the crossing's row and the renderer's graph store can disagree with no one to reconcile them. The crossing is now green (`tests/integration/store-tabs-record/crossing.test.ts`), so this is the move's consumer half and nothing else blocks it | `store-tabs-record`'s L2, then its L4 | the renderer reads and commits through `provident.tabs`, `TABS_CONSTRAINT` is gone from `src/renderer/`, and `tests/e2e/**` is at parity |

Every other open item is `pending.md`'s, and each states what it waits on: the `data.*` answer sites and D-22's second
half wait on admission, `A-4` on a reproduction, `strata-lint`'s record gap on the harness owner, and **ST-F1 and ST-F2**
on the package's own documentation — two distinct upstream findings, both filed in
`strata/records/store-tabs-record-unit.md` §1 and neither pushed from here (D-5, D-24).
