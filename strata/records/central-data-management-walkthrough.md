# record — `central-data-management` exit walkthrough, run 3 (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 use the `data` surface and say how a group is
granted · 2 say what owns a written row and which profile files are only seeded · 3 follow a write to its
receipt, and a write that cannot land · 4 find the census numbers and the pins that move with them ·
5 report a package defect and say what may be demanded. Seat: one fresh delegation, staged to
`/tmp/wt-central-data-management/` — `strata/`, `docs/L1..L3/`, the root pointers, `package.json`, a
tracked-path listing, an archived-path listing and the built bundles; no `src/`, no `tests/`.

## Run 3 — `STALE` (not green)

Every step was answerable with a resolving citation, and the census was re-counted from the built bundles:
27 tools / 6 groups (6/2/6/5/3/5) / 3 resource URIs, default grant 8 names, 13 with `data`; `central-data`
at N=15 and cap 200. Four claims were falsified; each is routed, none edited here (D-3):

| # | Falsified claim | Owner | Disposition |
|---|---|---|---|
| 1 | `README.md` said a group is granted through the Settings pane, so enabling `data` reaches 13 — but `src/renderer/secure-panels.ts:72` enumerates **five** names and builds one toggle each, so the sixth group has no control | L0 (README), the pane's unit (code) | README re-grained to the measured five-way list; the pane gap filed in the unit record as owed to its own unit |
| 2 | L1 §8 `C-2` and exception §2 close the re-grain set over the group set's two copies; the pane's five-name list is a third reader that stands in no class (D-11) | L1 | routed |
| 3 | L1 §4 says the five `data.*` routes are answered in main; `docs/L2/central-data/interface.md` §5 records them **Unlanded**, and the build carries no `data.*` string | L1 | routed |
| 4 | L1 §5 locates twelve scenarios in `tests/e2e/`; no central-data path is tracked there | L1 | routed — the battery is authored in this pass |

`docs-insufficient`: none — run 1's two silences are answered. `undocumented`: the pane's five-way group
list, and a renderer caller reaching the method switch's `unknown method` for the declared vocabulary.

**Verdict: not green.** The README finding is L0's and is fixed; the other three are L1's and are routed.
A fourth blind run is owed before this unit is recommended as ready (`walkthrough.md` §5, D-10, D-11).
