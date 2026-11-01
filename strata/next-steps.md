# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **Re-point the renderer at the crossing — the move's consumer half.** `src/renderer/renderer.ts` still owns the tab record in its own graph store (`TABS_CONSTRAINT` registered at construction, nine references to the tab machinery), and **nothing in `src/renderer/` calls `provident.tabs` at all** — so the record has two homes with no sync between them and the bridge member D-63/TABS added is currently unused by the UI (D-60's class: an unused crossing is a finding, not a spare). The renderer reads and commits through the bridge, the graph store's tab constraint and helpers retire, and the renderer's copy stops existing | `renderer-wiring`'s next writer, with `store-tabs-record`'s L2 for the hand-off | `grep 'provident.tabs' src/renderer/` is non-empty, `TABS_CONSTRAINT` is gone from `renderer.ts`, and the `panes` leg still reads 7/7 |
|---|---|---|---|

What is left is `pending.md`'s five rows, and every one states what it waits on: the `data.*` answer sites and D-22's
second half wait on admission, `A-4` waits on a reproduction, `strata-lint`'s record gap waits on the harness owner, and
ST-F1 waits on the package's own documentation.

