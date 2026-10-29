# record — `central-data-management` exit walkthrough (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 use the `data` surface · 2 what owns the data ·
3 follow a write to its receipt · 4 find the census numbers and their pins · 5 report a defect.
Seat: one fresh delegation, quarantined to `strata/`, `docs/L1..L3/`, the root pointers and
`src/main/data/` file names.

## Run 1 — `STALE`

All five steps were answerable with citations, and the runner reached the right numbers (27 / 6 / 8 /
3 / endpoints 15 / cap 200) from the exception document. What it falsified:

| Finding | Disposition |
|---|---|
| `README.md`'s MCP-surface block still read **22 tools in five groups**, summing to 22 | fixed in place — 27 in six groups, 6+2+6+5+3+5, 13 names with `data` |
| `strata/brief.md` §2 still read **22** tools and **5** groups, with a dead `security.ts:5-42` cite | fixed in place — 27 tools, six groups, both `VALID_GROUPS` copies cited |
| The unit's state carried `stage: done` and a stale `lastFailure` beside a walkthrough that had not run | recorded honestly: the walkthrough is a failure on the unit until a run passes |
| Only 2 of the unit's 5 artifacts had a return in `.strata/returns/` | noted, not reconstructable — the L2/L3 envelopes were not persisted as they were returned |

**docs-insufficient, routed rather than fixed here:** no document narrates *granting* a group (every text
describes the enabled state); no document says whether the five `data.*` bridge routes answer while the
group is off; and D-16/D-18's MCP-isolation invariant names no row, so the isolation is believed, not
checked. The last one is the `security-store-storeroom` rebuild's to build (D-16/D-18), not this unit's.

**Verdict: not green.** A second blind run is owed before this unit is recommended as ready (D-10, D-11).

## Run 2 — see the pass's next return

A second blind run was dispatched with the other three; its verdict is recorded when it returns.
