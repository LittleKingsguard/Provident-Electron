# pending — work that is real, agreed, and blocked (D-61). Ceiling 40 lines.

**Each row says what it waits on.** A row leaves this file when its work lands; a row whose blocker never
clears is deleted with the reason recorded here, not quietly kept. Actionable work is `next-steps.md`.

| # | Work | Waits on | Owner when unblocked |
|---|---|---|---|
| 1 | **The five `data.*` members of `RpcMethod` have no answer site** — no arm in `src/renderer/renderer.ts`'s switch and no handler in `src/main/main.ts`. `docs/L2/central-data/interface.md` §5 declares them "declared, not answered" rather than claiming them | admitting a unit for the `data` bridge (D-7: no design before a map row) | that unit |
| 2 | **D-22's parked second half** — the module registry and the journal-length consumers onto the instance. The tier-4 half moved out of this item when `ASM-4` settled the holder as a projection with no `src/**` reader | admitting the units that take each consumer | those units |
| 3 | **`npm test` left one process tree alive that no run at this head reproduces** (0 survivors after 6 full-suite and 12 paired boot-battery runs, and after a run with `ps` made to fail). The reaper could not see 2 of a boot's 5 processes — both `--type=zygote` carry no profile — and its only failure path was a silent `catch`; both are repaired and the teardown now kills with SIGKILL and PROVES zero (`D-74`). **What stays unmeasured is what ended that run's teardown**: the reported root carried its scratch profile in its cmdline, so a table-matching reaper could have killed it and did not — leaving "the hooks never ran", which no in-hook teardown can report | a reproduction on the machine that produced the tree | whoever sees one |
| 4 | **`strata-lint` does not check `strata/records/`** — ten files in its registry, not one a record, so thirteen records' ceilings, provenance and citations are enforced by nothing (a rebuilt record passed at 43 lines against 40) | the instrument ships **outside this repo** and is not writable from here — measured, `Permission denied` — so it is a harness change | the harness owner |
| 5 | **No live instrument reaches either `provident-storeroom` crossing.** `D-93` retired BOTH un-run live drivers whole — `tests/store-tabs-record-live.mjs` (19 rows) and `tests/store-compliance-live.mjs` (32) — because every one of their rows reached the app through `getWiredGraphStore()` or `provident.store.*`, and both are deleted; nothing now presses a control, seeds a record into `provident-profile.json` and reads a crossing's own answer back out of a RUNNING app, so the crossings are gated by the node suite alone (which is envelope-green, never app-green, `brief.md` §6) | a unit admitted to own the crossings' live legs (D-7: no design before a map row) | that unit |

**Not pending, and recorded so nobody re-opens them:** `R-7` (the `preload.ts` comment it named is corrected and
`docs/L2/secure-panels/interface.md` §8 records it discharged); the Tier4 type import in `main.ts` (discharged);
both paths `docs/L1/security-store-storeroom-exception.md` §9 carried (fully discharged). **And row `5` LEFT this file on 2026-11-03 with its reason measured, not quietly**: `D-85` declared the two `file` addresses whose absence keyed this unit's imports, and each of their repairs now PERFORMS the import it keyed — the *"marker a creation repair cannot forge"* that row waited on is not needed once the repair does the work the marker did, the `54`-red obstruction is measured closed over the real suites, and `D-82`'s clause-1 deviation (`V1`) closes at all three addresses.

**The row that carried `bundle-boot-seam`'s `A-4` (numbered `3` at that date) left this file on 2026-11-02 with its cause MEASURED, not because the flake stopped**: `boot-contract.test.ts`'s `beforeAll` runs `npm run build`, whose first arm is `npm run clean`, so `A-4`'s existence snapshot was taken before that clean and its `--check` read after it — red **2 of 4 runs at a +250 ms build offset with `MODULE_NOT_FOUND`**, while the `--check`-under-contention candidate is excluded (14.9 ms p95 idle → 46.0 ms p95 at 24-way load, never throwing on a file that is present). The fix is a bounded re-acquisition at that row's own site that retries ABSENCE only — a content fault still reds it, measured: a preload that parses but never reaches `contextBridge` reds `A-4`, and an artifact carrying `var import_meta = {}` reds `A-2`, `A-3` and `A-4`.

**The row that carried `ST-F1` — numbered `5` at that date — was deleted, not merged, on 2026-11-01: its blocker was the package's own documentation
change, and `provident-storeroom@1.6.2` made it — the repair arm now ships in both artifacts the row named (guide §7.6 and
`index.d.ts`'s `Constraint` docblock).** What that release did **not** discharge — the two instants still disagree on an
inherited `repair` — stays live in `strata/records/store-tabs-record-unit.md` §1 as ST-F1's own "still open" clause.

**The row that carried `ST-F2` — numbered `5` today — was deleted, not narrowed, on 2026-11-02: it carried the repair's failure sentence naming the CALLER's
address, and a return nothing types — and both halves are gone by measurement, so the row's blocker can never clear.**
`provident-storeroom@1.9.0` CREDITS an op-less repair: the release notes' own §1.9.0 item 1 says a repair returning
`undefined`, a bare `{ok: true}` *"or any value outside the declared arms at all"* is credited, and that *"the value the
repair returned is read by NOTHING"*. **So the sentence the row was about is not produced for the shape it named**, and
this tree cannot reach the residue either: every repair body here returns through `repairAnswer`
(`src/main/tabs-record/index.ts`, three call sites) or one of its two declared `{ok: false, message}` arms;
`TabsRepairAnswer` makes a `void` return a compile error under `npm run typecheck`; and `writeJoined` requires the carrier,
so no repair opens the nested attempt the surviving sentence is aimed at (`D-72`, `D-73`). **The row's other half is
discharged by the same release line**: the return is a declared type — `Constraint = (context: AttemptContext) =>
ConstraintOutcome`, with `RepairOutcome` in `index.d.ts` — and `RepairOutcome` is imported NOWHERE in this tree, the module
keeping its own narrower union. **AND THE PACKAGE HAS DISPOSED OF THE REMAINDER ITSELF, which is why this is a deletion and
not a narrowing**: the release notes' "THE REFUSAL TEMPLATE IS UNMOVED" paragraph keeps the sentence byte-for-byte and reads
the recorded defect row it belongs to as *"HALVED, not closed … the address half survives on the nested-attempt arm, and the
row stays OPEN with its population narrowed"* — a tracker row waiting on a release that queues a successor waits forever.
The finding stays live where it belongs, in `strata/records/store-tabs-record-unit.md` §1's own dated reading (`D-5`, `D-52`).
