# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **Re-point the renderer at the crossing — and settle the REMOVAL first.** `src/renderer/renderer.ts` still owns the tab record in its own graph store (`TABS_CONSTRAINT`, nine references), and nothing in `src/renderer/` calls `provident.tabs` — so the record has two homes, no sync, and the bridge member is unused (D-60's class). **Attempting the port found a design gap that must be settled before code moves**: the renderer's close is a **removal** (`holder.remove(tabsEntryName(id))`, whose own receipt the row reports), while the crossing's L2 declares **three routes and says in as many words that there is no `delete`** — so a close cannot be expressed through `read/commit/onChanged`. The L2 owes either a removal route or a `commit` that admits absence, and the renderer's port follows it | `store-tabs-record`'s L2 revises §3, then `renderer-wiring`'s next writer | the L2 declares how a tab leaves, `grep 'provident.tabs' src/renderer/` is non-empty, `TABS_CONSTRAINT` is gone from `renderer.ts`, and the `panes` leg reads 7/7 |
|---|---|---|---|

What is left is `pending.md`'s five rows, and every one states what it waits on: the `data.*` answer sites and D-22's
second half wait on admission, `A-4` waits on a reproduction, `strata-lint`'s record gap waits on the harness owner, and
ST-F1 waits on the package's own documentation.

