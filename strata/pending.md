# pending — work that is real, agreed, and blocked (D-61). Ceiling 40 lines.

**Each row says what it waits on.** A row leaves this file when its work lands; a row whose blocker never
clears is deleted with the reason recorded here, not quietly kept. Actionable work is `next-steps.md`.

| # | Work | Waits on | Owner when unblocked |
|---|---|---|---|
| 1 | **The `§5.U` live battery for `store-tabs-record`** — the only red in `npm test`, and it is **on notice, not a gate** (`scripts/strata-suite-reading.mjs` reads gating 0 / on notice 2). `P-7` and the aggregate `REG-EXEC`, three broken readings. The archived gate-6 battery carries the provenance as prose (`cmd` ×10, `post` ×6, `instrument` ×22); the row requires them as `"cmd"`/`"post"` keys in a matrix this corpus never authored | a unit that owns `store-tabs-record` — the file is **marked for wholesale replacement** by D-30's rework, so authoring the matrix inside it would be replaced work | that unit's L1, as its own row |
| 2 | **The five `data.*` members of `RpcMethod` have no answer site** — no arm in `src/renderer/renderer.ts`'s switch and no handler in `src/main/main.ts`. `docs/L2/central-data/interface.md` §5 declares them "declared, not answered" rather than claiming them | admitting a unit for the `data` bridge (D-7: no design before a map row) | that unit |
| 3 | **D-22's parked second half** — the module registry and the journal-length consumers onto the instance. The tier-4 half moved out of this item when `ASM-4` settled the holder as a projection with no `src/**` reader | admitting the units that take each consumer | those units |
| 4 | **`gesture-session`'s `F-9(b)`** — the sibling census omits `secure-panels`' entry **because** `src/renderer/secure-panels.ts` is one of its unclaimed-probe controls, so the entry and the control must move in one pass or the negative control breaks | `gesture-session`'s next writer, with the control in the same edit | that writer |
| 5 | **`bundle-boot-seam`'s `A-4` is flaky under full-suite parallelism** (5/5 green in isolation). **The cause recorded here was `pathToFileURL(...).href` handing a path with a space a `%20` URL — measured wrong:** the href does carry `%20`, and `import()` still produces exactly the failure the row asserts (`Cannot read properties of undefined (reading 'exposeInMainWorld')`). What remains unmeasured is why it reds under load — a race on the emitted artifact, or `execFileSync`'s `--check` under contention | that file's next writer, with the cause measured before the fix | that writer |
| 6 | **`strata-lint` does not check `strata/records/`** — ten files in its registry, not one a record, so thirteen records' ceilings, provenance and citations are enforced by nothing (a rebuilt record passed at 43 lines against 40) | the instrument ships **outside this repo** and is not writable from here — measured, `Permission denied` — so it is a harness change | the harness owner |

**Not pending, and recorded so nobody re-opens them:** `R-7` (the `preload.ts` comment it named is corrected and
`docs/L2/secure-panels/interface.md` §8 records it discharged); the Tier4 type import in `main.ts` (discharged);
both paths `strata/records/security-store-storeroom-exception.md` §9 carried (fully discharged).
