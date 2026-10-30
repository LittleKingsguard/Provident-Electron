# record — `strata-bootstrap` rebuild retrospective, builds 3 — ceiling 20 (`rebuild.md` §4)

The artifact rebuilt is the **summary layer**: `brief.md`, the register's cross-references, the unit records.
It **supersedes the recommendation** in `strata-bootstrap-walkthrough.md` (run 14), which proposed this rebuild
and now says it was taken — a proposal taken is not a proposal standing (D-46, `rebuild.md` §4).

**What did we believe that was false?** That a summary can be *maintained*. Fourteen rounds edited `brief.md`
and the records as the layers moved, and each edit left the next sentence behind — a count, a leg list, a
section number, a cite into a file the census move had shifted. A summary is not a copy of facts needing a
touch-up; it is a **derivation**, and a derivation patched in place stops being one.

**Which test should have caught it, and why did it not?** The walkthrough caught every instance and never the
**pattern**: each round filed the drift against the document carrying it, so the corpus repaired five symptoms
a round and never named the cause. `strata-lint` cannot see it — a brief restating a drifted figure passes
ceilings, provenance and state shape — and no instrument compared a summary statement against its owner.

**What changes next cycle?** (1) A summary statement is **derived, never maintained**: `brief.md`'s counts come
from `pins` and its claims from the owning layer, in one pass. (2) A figure is checkable when it **cites its
instrument**, so a drift shows as a mismatch and not as prose. (3) The walkthrough reports a **class**, not
just an instance — run 14 naming the class is what made this rebuild possible.
