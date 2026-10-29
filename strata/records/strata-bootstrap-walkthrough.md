# record — `strata-bootstrap` exit walkthrough, run 5 (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 file a user decision · 2 start the next unit ·
3 place an L3 write · 4 report a failure up the loop · 5 the archive's authority and the verification
instruments. Seat: one fresh delegation, staged to `/tmp/wt-strata-bootstrap/` — `strata/`, `docs/L1..L3/`,
the root pointers, `package.json`, a tracked-path listing, an archived-path listing and the built bundles;
no `src/`, no `tests/`.

## Run 5 — `STALE` (not green)

All five steps answered by citation, and the corpus's own counts were re-derived: 24 decisions, 20 module
rows with every path resolving and none claimed twice, `50 + 10×N` in four documents with every derived
cap, 112 test files (89 flat + 23 nested), 3,179 = 2 + 3,175 + 2, and four returns conforming to the
envelope. What it falsified, and where each went:

| Falsified claim | Owner | Disposition |
|---|---|---|
| Two live records pin different `strata-lint` counts — 34 at `archive-sweep-pins.md:40`, 42 in `handover.md` | L0 | fixed: the sweep record now reads this head's instrument and `archive.md` §3 owns the delta |
| `archive.md` §3's arms and the sweep record's 21 `LEAVE` sites were never reconciled against D-8's 71 rows | L0 | fixed: §3 now says what each arm counts — literals, rows, sites — and why they do not sum |
| `settings-carrier-retirement-unit.md` declared 40 lines and ran 42; `archive.md` ran 76 with no class, though `strata/README.md` claims every file has one | L0 | fixed: both inside their ceilings, and `README.md` now declares a class for `archive.md`, `handover.md` and itself |
| `handover.md` read "D-1..D-23" against 24 rows, and counted the three units' runs as 2+2+1 | L0 | fixed |
| The corpus recorded four runs in this one file, against `walkthrough.md` §6's "replaced on every run" | L0 | fixed: every walkthrough record now carries the current run only |
| `docs/L1/{central-data-management,settings-carrier-retirement}.md` name `tests/e2e/` batteries no path carries | L1 | routed — both batteries authored in this pass |
| `walkthrough.md` mapped its four verdicts onto no envelope verdict; `envelope.md` did not list `notes`; `rebuild.md` did not say what clears a streak; `strata/README.md` defined no legal `stage` value | L0 | fixed in the three procedure files and the README |
| **Instrument error, not a corpus finding:** the staged `archive-tree.txt` prepended the prefix to paths that already carried it, so every archived topic looked one segment too deep and the prefix rule read as broken | the staging root | recorded here and **not** acted on in the corpus; the tree carries the gate corpus at the documented prefix, and 215 files of earlier corpora beside it that no document named — now stated in `archive.md` §1 |

**Verdict: not green.** Every finding above is fixed or routed in this pass, so a sixth run is owed before
`strata-bootstrap` is recommended as ready (`walkthrough.md` §5, D-10, D-11).
