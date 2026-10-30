# strata — the working corpus for Provident-Electron

This directory replaces the gate workflow's 219-file corpus (`archive.md`): the only document set the layers
read, and every document here declares a ceiling — this file's is 60 lines.

## What is here

| File | What it is | Ceiling |
|---|---|---|
| `brief.md` | the project brief: what the app is, the layers, the current unit, the instruments | 150 |
| `decisions.md` | the append-only register: user intent and measured rules, `D-n` (D-47) | 40 per row |
| `envelope.md` | the return contract every layer ends with | 40 |
| `walkthrough.md` | the L0 exit pass: documentation sufficiency, blind | 60 |
| `examiner.md` | the examiner's procedure at L1, L2 and L3 | 45 |
| `rebuild.md` | the rebuild protocol and its threshold | 40 |
| `modules.md` | module isolation, `modules.json`, the harness cap | 40 |
| `platform.md` | measured deployment and checkout constraints | 60 |
| `archive.md` | where the gate corpus went, and how its citations resolve | 60 |
| `modules.json` | the module map — L1-owned, absent until the first unit files it (`platform.md` §4 gives its shape) | — |
| `.strata/units/*.json` | state per unit, script-written: layer, stage, artifacts, assumptions, per-artifact `streaks` (`platform.md` §4 gives the full shape) | 40 |
| `records/<unit>-<pass>.md` | a review record (walkthrough, sweep): the scenario set or row table, replaced per run | 40 |
| `.strata/returns/*.json` | layer returns, as collected envelopes | — |
| `records/handover.md` | the session handover: where the branch stands and what a fresh session does next | 60 |

The preset that supplies the roles lives in the deployment, not here (`platform.md` §1): personas
point, procedures rule, and nothing here restates one.

## How a unit moves

1. L0 interviews the user, records the row in `decisions.md`, and opens the unit (`init`, then `enter`).
2. L1 takes `brief.md` plus the tree, files the module map into `modules.json`, then designs `docs/L1/`.
3. Each module goes down L2 → L3 → L4 as `brief.md` §4 describes; each return carries `envelope.md`.
4. L0 runs the walkthrough (`walkthrough.md`); anything but `PASS` is a loop state, never readiness.

## State, not prose

`strata-state` owns progress: `init`, `enter --layer`, `artifact --id`, `assume --id --text --alternative`,
`pass`, `fail [--reason] [--from]`, `rebuild`, `close`, `show`. A unit's layer, stage, artifacts, assumptions
and per-artifact `streaks` live in `.strata/units/<unit>.json`, overwritten at every transition; no document
records where a unit stands, and the shape is `platform.md` §4's list. `stage` has exactly two legal values,
written by the script and by nothing else: `design` at `init` and again at `rebuild`, `done` at `close`
(`platform.md` §4). **`stage` is the last structural transition, not a verdict:** a unit that closes and
then fails a walkthrough keeps `stage: done` while its `streaks` and `lastFailure` carry the red, so
readiness is the walkthrough's — never the stage's (`walkthrough.md` §5, D-10). A review task (an examiner's measurement, a walkthrough) may leave a return in `.strata/returns/` with no unit state row: it decides
nothing about a unit's progress.

## Checking this tree

L0 runs both at a unit's start and on every verdict; exit 0 means every ceiling, citation, quarantine,
provenance and shape check passed. From the repo root:

```
node "../Agent Harness/strata/lint/strata-lint.mjs" strata
node "../Agent Harness/strata/state/strata-state.mjs" strata show <unit>
```

**Neither lives in this repository** — both ship with the adjacent `../Agent Harness/` checkout, not a
dependency of this repo, so a fork must supply them or lose the loop's ceilings and transitions (D-44).
`scripts/` holds this tree's own two (`node scripts/strata-walkthrough.mjs`, `…-marks.mjs`) beside the
Electron legs and the MCP CLI; `tree.txt` is the list.
