# record — `strata-bootstrap` exit walkthrough (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation, never the source): 1 file a user decision ·
2 start the next unit · 3 place an L3 write · 4 report a failure · 5 the archive's authority and the
verification instruments. Each step's expected outcome is the citable answer, not a green product.

**Seat.** Three runs, each a fresh delegation quarantined to the documentation (no `src/`, no `tests/`,
no archive content, no suite, build or Electron leg). The staging root of `walkthrough.md` §3 was not
built; the quarantined runner read the real tree instead, which is a deviation to close when
`strata-walkthrough` exists.

| Run | Verdict | What it found | Disposition |
|---|---|---|---|
| 1 | `STALE` | 12 contradictions, incl. `modules.md` §3 vs `platform.md` §4 on who declares `endpoints`; `failStreak` against the state's `streaks`; a `package.json` cite on the wrong block; a root-README tool breakdown summing to 24 against 22; "seven" vs "six" procedures | all 12 fixed in `19ae7fe` |
| 2 | `DOC-GAP` | 5 drifts under the first fix (the README's `failStreak`, a "Six npm legs" bullet beside the corrected eight, the devDependency range, ASM-3's stale row count, an L1 row without its path) and 3 gaps: no home for a non-package finding, no state verb list, no map shape | 5 fixed, 3 closed in the same pass |
| 3 | `STALE` | 3 falsified claims: the "eight script keys" cite over a 13-key range; D-8's proposed arms (48/2/21) unreconciled with the executed split (55/15/21); `README.md` at 61 lines against D-3's 60 | fixed, with the arm reconciliation recorded in `archive.md` §3 |

**State at this record: not green.** The third run's residual claims are fixed and independently
re-measured (`wc -l README.md` = 60, `package.json:8-22` = 13 keys, the arms reconciled), but a fourth
blind run is the gate and is **owed** before this unit is recommended as ready (D-10, D-11). What the
runs did establish: every one of the five steps was answerable from a citable section by the third run,
and the corpus linted clean at exit 0 throughout.

**Carried as loop state, not as gaps:** the module map is absent, so module write scope is unchecked and
`strata-lint` reports it INFO (`platform.md` §4); that is D-7's first act for the next unit, not a defect
in this corpus.
