# boundary-grain — unit record

**The unit `D-301` admitted**, L1-designed and L2-landed: the boundary instrument's GRAIN, not its rule. `D-301` keeps the rule fixed — an entry is a FILE with its own reason, `B-2`'s three controls byte-identical, one reading still over the whole tree — and hands this unit only how many readings there are and what each covers.

- **THE DESIGN IS `docs/L1/boundary-grain.md`** (120 lines, `P-1`…`P-7` at `tests/e2e/boundary-grain/`): the readings SPLIT. `W` (`tests/integration/store-view-record/boundary.test.ts`) keeps its home and its whole-tree `git status --porcelain --untracked-files=all` read; `P` (L1's own e2e row) validates the declarations. `B-1` asserts `dirty ⊆ declared` and `P-5` asserts `declared ⊆ dirty`, so together **declared == edit set** (`D-301`, `D-146`).
- **THE 262 STANDING PERMISSIONS ARE RETIRED WHOLE** — `W` went 2,025 → 144 lines, its `DECLARED_SCOPE` a computation over the in-flight declarations rather than a list (`D-301`, `D-146`). A declaration counts only while its page is in the edit set, so it dies at its landing commit instead of becoming a permission.
- **WHAT THIS ROW'S OWN BLOCK DECLARES IS L0'S WRITES**, which no other seat may declare (`D-301` §3, `E-1`): the register row that admits the unit, this record, the corpus figures re-read for it, and the marks index its own battery's rows forced.

```boundary-declared
{"unit":"boundary-grain","layer":"L0","module":null,"writes":[
 {"path":"strata/decisions.md","why":"the register row D-301 that admits the unit, and D-302 that records the landing","d":"D-301"},
 {"path":"strata/records/boundary-grain-unit.md","why":"this record: the unit's design pointer, the retirement and the declaration home L0 owes its own writes","d":"D-301"},
 {"path":"strata/brief.md","why":"§2's mapRows figure re-read 21 -> 22 for the boundary-instrument row L1 filed","d":"D-301"},
 {"path":"strata/marks.json","why":"the index regenerated because P adds seven gating rows (design §7, E-16)","d":"D-301"}]}
```

**Not closed yet**: the exit walkthrough (`strata/walkthrough.md`) has not run, so this unit is landed and open — readiness is the walkthrough's, never the stage's (`D-1`).
