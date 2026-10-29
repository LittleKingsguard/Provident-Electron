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

## Run 2 — `STALE` (not green)

Second blind run, same seat: every step answerable with a citation, and the census figures reachable from the exception
document. Five falsified claims, all corrected in place this pass:

| Finding | Disposition |
|---|---|
| L1 §2 and `ASM-5`: the **19-module / N=16** snapshot against a map of 20 rows and `endpoints: 15` | 20 modules; `central-data` 15, `operator-settings` 12 and the `settings-surface` row at 19 named; ASM-5 at 5 exports with `register` off the called set |
| Citations to the **deleted** `src/main/security-store.ts` — L1 §3/§4, exception §2 `E-1`, `interface.md` §4, `behaviour.md` §8, `brief.md` §2 | repointed: `src/main/operator-settings/index.ts:112,178` for the group set's second copy, `settings-surface/index.ts:75-77,132` + `mcp-server.ts:42-57` for the tier-4 token |
| `persistence.md` §1/§7 named `provident-security.json` a steady-state **written** name | seeded-only (D-19); `provident-operator-settings.json` is the written operator file, and `provident-settings.json` is a seed too (D-22) |
| Pins that no longer land: exception §1's `strata/modules.json:72`, L1 §8 `C-2` | each resolves to the `central-data` row (`modules.json:82`, row `73-83`) and to the second live copy's actual home |
| The two silences run 1 carried | `interface.md` §5 settles the routes' answer with the group off, alternative recorded, and marks it **unlanded**; the second copy is named at its home everywhere it was implied |

**Verdict: not green.** A third blind run is owed before this unit is recommended as ready, and it stays at L0 with its walkthrough red (D-10, D-11).
