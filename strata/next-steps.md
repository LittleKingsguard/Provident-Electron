# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **The constraints do not fire on the addresses the module writes — measured, and it blocks everything downstream.** A row driving the crossing at the record grain over a real store (written 2026-10-30, then withdrawn from the map because it was red) showed every `commit` answered **refused**: the batched pairs watch `['tabs']`, while this module writes `['tabs','order']` and one `['tabs',<id>]` leaf per tab — so the pair either never fires or fires on a value that is not the record. The fix is a design one: **either the record becomes ONE value at `['tabs']`** (the renderer's own shape, which its constraint and repair already read) **or each pair watches the leaves it must guard** — and the second cannot express `exactly-one-active`, which is a fact about the whole set. The row was withdrawn rather than marked, because a row authored after D-30's sweep gates (D-40) and a red gate is not a tracker entry | `store-tabs-record`'s L2 revises §1, then its L4 | a row at `tests/integration/store-tabs-record/` drives all four constraints and the removal green, and the renderer's port follows |
|---|---|---|---|

What is left is `pending.md`'s five rows, and every one states what it waits on: the `data.*` answer sites and D-22's
second half wait on admission, `A-4` waits on a reproduction, `strata-lint`'s record gap waits on the harness owner, and
ST-F1 waits on the package's own documentation.

