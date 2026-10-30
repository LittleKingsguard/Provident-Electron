# record — `strata-bootstrap` rebuild retrospective, builds 3 (D-1; replaces its predecessor)

Answers exactly three questions (rebuild.md §4). The artifact rebuilt is the corpus's **summary layer**:
`brief.md`, the register's cross-references, and the unit records.

## What did we believe that was false?

That a summary can be **maintained**. Fourteen rounds edited `brief.md` and the records as the layers moved,
and each edit left the next sentence behind: a count, a leg list, a section number, a cite into a file the
census move had shifted. The belief underneath was that a summary is a copy of facts that occasionally needs a
touch-up. It is not a copy — it is a **derivation**, and a derivation patched in place stops being one.

## Which test should have caught it, and why did it not?

The exit walkthrough did catch every instance. It did not catch the **pattern**: each round reported the drift
as a fresh finding against the document that carried it, so the corpus repaired five symptoms a round and never
named the cause. `strata-lint` cannot see it either — it checks ceilings, provenance and state shape, and a
brief that restates a drifted figure passes all three. No instrument compares a summary statement against the
owner it summarises.

## What changes next cycle?

1. **A summary statement is derived, never maintained**: `brief.md`'s counts come from `pins` and its claims
   from the layer that owns them, in one pass, and a rebuild re-derives both rather than editing them.
2. **A restatement is checkable when it is a citation**: where `brief.md` states a figure, the row cites the
   instrument that produced it, so a drift shows as a mismatch rather than as prose.
3. **The walkthrough reports a class, not just an instance**: when two consecutive runs file findings of one
   kind, the record names the kind — as run 14's did, which is what made this rebuild possible at all.
