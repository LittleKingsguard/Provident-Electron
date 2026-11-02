# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **The renderer still owns the tab record, so the app has TWO.** `src/renderer/renderer.ts` still declares `TABS_CONSTRAINT`, and **nothing in `src/renderer/` calls `provident.tabs`** (measured: `grep -rn 'provident.tabs' src/renderer/` is empty) — so the bridge member D-63 landed has no consumer, and the crossing's record and the renderer's graph store can disagree with no one to reconcile them. The crossing is now green (`tests/integration/store-tabs-record/crossing.test.ts`), so this is the move's consumer half and nothing else blocks it | `store-tabs-record`'s L2, then its L4 | the renderer reads and commits through `provident.tabs`, `TABS_CONSTRAINT` is gone from `src/renderer/`, and `tests/e2e/**` is at parity |

Every other open item is `pending.md`'s, and each states what it waits on: the `data.*` answer sites and D-22's second
half wait on admission, one boot-battery process tree waits on a run on the machine that reported it, `strata-lint`'s record
gap on the harness owner. **`A-4`'s flake is no longer among them** — its cause was measured and its fix landed on
2026-11-02, and `pending.md` records both rather than letting a flake that stopped stand in for a cause that was found.
**ST-F2 is no longer among them** — `pending.md` records why it was deleted rather than narrowed on 2026-11-02 — and **ST-F1** stays live in
`strata/records/store-tabs-record-unit.md` §1; neither is pushed from here (D-5, D-24). **Row 2 is gone with its work, not
deferred**: `docs/L3/store-tabs-record/signatures.md` rev 2 is regenerated from the three modules and pinned against them by
`tests/unit/store-tabs-record/signatures.test.ts` — D-45's checking arm, which reds on a divergence in either direction.
