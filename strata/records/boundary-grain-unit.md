# boundary-grain — unit record

**The unit `D-301` admitted**, L1-designed and L2-landed: the boundary instrument's GRAIN, not its rule. `D-301` keeps the rule fixed — an entry is a FILE with its own reason, `B-2`'s three controls byte-identical, one reading still over the whole tree — and hands this unit only how many readings there are and what each covers.

- **THE DESIGN IS `docs/L1/boundary-grain.md`** (`P-1`…`P-7` at `tests/e2e/boundary-grain/`, and the page's own header carries its rev and length — `D-43`): the readings SPLIT. `W` (`tests/integration/store-view-record/boundary.test.ts`) keeps its home and its whole-tree `git status --porcelain --untracked-files=all` read; `P` (L1's own e2e row) validates the declarations. `B-1` asserts `dirty ⊆ declared` and `P-5` asserts `declared ⊆ dirty`, so together **declared == edit set** (`D-301`, `D-146`).
- **THE 262 STANDING PERMISSIONS ARE RETIRED WHOLE** — `W` went 2,025 → 144 lines, its `DECLARED_SCOPE` a computation over the in-flight declarations rather than a list (`D-301`, `D-146`). A declaration counts only while its page is in the edit set, so it dies at its landing commit instead of becoming a permission.
- **THE L2 HALF IS `docs/L2/view-record/boundary.md`** (`store-view-record`'s own page; its rev header and its ceiling are the page's, `D-43`): the row's grain as landed, its coupling, what a red means, and the block this pass's two writes needed a home in — named here so that page is reachable from the corpus as well as from the design's §5 (`D-301`).
- **WHAT THIS ROW'S OWN BLOCK DECLARES IS L0'S WRITES**, which no other seat may declare (`D-301` §3, `E-1`): **THE BLOCK BELOW IS THIS WINDOW'S WRITES, PATH FOR PATH AND REASON FOR REASON — this sentence enumerates nothing, because the block is the list** (`D-43`). **THE LANDING WINDOW CARRIED A FOURTH**, `strata/marks.json`, for the index `P`'s seven gating rows forced; it was committed at `D-302` and a declaration cannot outlive its write, so it is not in this block (`D-302`'s landing list is that window's and this block is this one's; no numeral stands in either sentence, `D-43`).

```boundary-declared
{"unit":"boundary-grain","layer":"L0","module":null,"writes":[
 {"path":"strata/decisions.md","why":"the register row D-301 that admits the unit, and D-302 that records the landing","d":"D-301"},
 {"path":"strata/records/boundary-grain-unit.md","why":"this record: the unit's design pointer, the retirement and the declaration home L0 owes its own writes","d":"D-301"},
 {"path":"strata/brief.md","why":"§2's mapRows figure re-read 21 -> 22 and §6's suite cell and flat/nested split re-taken for the two files this unit adds","d":"D-301"},
 {"path":"strata/records/boundary-grain-walkthrough.md","why":"the exit walkthrough's report, which walkthrough.md §6 requires and whose absence was a round's blocking finding","d":"D-301"},
 {"path":"strata/records/handover.md","why":"the session handover re-grained: a walkthrough round read it and found its unit count, its next-steps rows and its pending rows all behind the ledger","d":"D-301"},
 {"path":"strata/pending.md","why":"a walkthrough round found the file contradicting its own head, one row paragraph claiming a row the table no longer holds","d":"D-301"},
 {"path":"strata/proposals.md","why":"a walkthrough round found a present-tense marked-surface count the index now supersedes, re-grained to point at the index","d":"D-301"},
 {"path":"strata/next-steps.md","why":"a walkthrough round found its live table carrying a row whose work the ledger reads `done`, re-grained to point at that unit and at the measured mint","d":"D-301"},
 {"path":"strata/platform.md","why":"the readiness gate filed one non-blocking cite: its devDependencies offset named a range a manifest re-spells, now naming the block","d":"D-301"},
 {"path":"strata/.strata/units/boundary-grain.json","why":"the unit state this seat's own transitions wrote — the close, and the L2 landing pass before it (design §3: the state file belongs to the seat that took the transition)","d":"D-301"}]}
```

**Not closed yet**: the exit walkthrough (`strata/walkthrough.md`) has run round by round — each round's verdict, findings and fixes are `strata/records/boundary-grain-walkthrough.md`'s own table, which is the count (never a numeral here, `D-43`) — so this unit is landed and open, and readiness is the walkthrough's, never the stage's (`D-1`).
