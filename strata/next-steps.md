# next-steps — work that is actionable now (D-61). Ceiling 40 lines.

**A row leaves this file when its work lands** (D-61). Ordered by what a wrong answer costs, not by size.
Blocked work lives in `pending.md`; unasked ideas in `proposals.md`.

| # | Work | Owner | Closed when |
|---|---|---|---|
| 1 | **Answer the L4 adjudication on the constraint.** `.strata/returns/store-tabs-record-l4.json` records that `design.md` §4's "the engine's constraint" could not be transcribed: the package declares `addConstraint(pair, constraint)` with `(context: unknown) => unknown` and no declared context members. L4 enforced exactly-one-active with a corrective write at the commit boundary instead — the invariant holds, the mechanism is not the designed one. Either L3 declares the context's shape so the engine can carry it, or §4 is amended to make the boundary the designed home; a layer cannot judge its own design (`rebuild.md` §3) | `store-tabs-record`'s L2, which owns the verdict | `design.md` §4 and the code agree, and the adjudication envelope is superseded by a resolved one |
|---|---|---|---|


The `§5.U` battery landed with its unit (D-62) and the suite is green — `scripts/strata-suite-reading.mjs` reads
gating 0 / on notice 0, and `brief.md` §6 carries the reading (D-26).
