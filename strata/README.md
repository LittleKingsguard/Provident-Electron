# strata — the working corpus for Provident-Electron

This directory replaces the gate workflow's 219-file corpus (archived, see `archive.md`). It is the
only document set the layers read, and every file here has a ceiling.

## What is here

| File | What it is | Ceiling |
|---|---|---|
| `brief.md` | the project brief: what the app is, the layers, the current unit, the instruments | 150 |
| `decisions.md` | the append-only log of user intent, `D-n` | 40 per row |
| `envelope.md` | the return contract every layer ends with | 40 |
| `walkthrough.md` | the L0 exit pass: documentation sufficiency, blind | 60 |
| `examiner.md` | the examiner's procedure at L1, L2 and L3 | 45 |
| `rebuild.md` | the rebuild protocol and its threshold | 40 |
| `modules.md` | module isolation, `modules.json`, the harness cap | 40 |
| `platform.md` | measured deployment and checkout constraints | 60 |
| `archive.md` | where the gate corpus went, and how its citations resolve | — |
| `modules.json` | the module map — L1-owned, absent until the first unit files it (`platform.md` §4 gives its shape) | — |
| `.strata/units/*.json` | state per unit, script-written: layer, stage, artifacts, assumptions, per-artifact `streaks` (`platform.md` §4 gives the full shape) | 40 |
| `records/<unit>-<pass>.md` | a review record (walkthrough, sweep): the scenario set or row table, replaced per run | 40 |
| `.strata/returns/*.json` | layer returns, as collected envelopes | — |
| `records/<unit>-walkthrough.md` | the L0 walkthrough record, replaced per run | 40 |

The preset that supplies the roles lives in the deployment, not here (`platform.md` §1). Nothing in
this tree restates a preset persona — personas point, procedures rule.

## How a unit moves

1. L0 interviews the user and records the answer in `decisions.md`; the design intent is the row, not
   a prose plan.
2. L1 takes `brief.md` plus the tree and files the module map into `modules.json`, then designs the
   e2e surface into `docs/L1/`.
3. Each module goes down L2 → L3 → L4 as `brief.md` §4 describes; each return carries `envelope.md`.
4. L0 runs the walkthrough (`walkthrough.md`) and reports outcome-first, naming any verdict that is
   not `PASS` as a loop state rather than as readiness.

## State, not prose

`strata-state` owns progress: `init`, `enter --layer`, `artifact --id`, `assume --id --text --alternative`,
`pass`, `fail [--reason] [--from]`, `rebuild`, `close`, `show`. A unit's layer, stage, artifacts, assumptions and per-artifact
`streaks` live in `.strata/units/<unit>.json`, overwritten at every transition; no document records
where a unit stands, and the shape is `platform.md` §4's list. This is what keeps the corpus from
re-growing. A review task (an examiner's measurement, a walkthrough) may leave a return in
`.strata/returns/` with no unit state row, because it decides nothing about a unit's progress.

## Checking this tree

The lint ships with the workflow (`platform.md` §4). From the repo root:

```
node "../Agent Harness/strata/lint/strata-lint.mjs" strata
```

Exit 0 means every ceiling, citation, quarantine, provenance and shape check passed. A failing check
fails the layer, not the author's intent.
