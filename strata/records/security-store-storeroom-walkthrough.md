# record — `security-store-storeroom` exit walkthrough, run 3 (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 what replaced the deleted store, and where that
state lives · 2 prove the isolation from MCP · 3 describe a boot and the import · 4 say who may write the
record, and what a commit that cannot land answers · 5 find the coverage and each row's evidence status.
Seat: one fresh delegation, staged to `/tmp/wt-security-store-storeroom/` — `strata/`, `docs/L1..L3/`, the
root pointers, `package.json`, a tracked-path listing, an archived-path listing and the built bundles; no
`src/`, no `tests/`.

## Run 3 — `STALE` (not green)

All five steps answered with resolving citations: the instance and surface split, the two addresses and
their tiers, the seven-member bridge census (also read off `dist/main/preload.cjs`), the isolation absences
`ISO-1`..`ISO-6` with `RQ-1`, and the twelve scenarios with their carriers. Six claims were falsified:

| Falsified claim | Owner | Disposition |
|---|---|---|
| exception §9 reads "3,103 rows over 101 files"; the tree carries 112 `*.test.ts` and the suite 3,179 rows | L1 | routed |
| exception §9 prints `tests/secure-store-discipline.test.ts` "(**536bdc6** rows)" — a commit hash where a row count belongs; §4 `C-4` carries the same substitution damage | L1 | routed |
| L1 §5 and `ASM-5` still park the `provident-settings.json` crossing D-22 executed, whose rows stand at `['operator-app-state']` | L1 | routed |
| L1 §5's five-row boot-arm table is grounded on `security-store.ts`'s deleted `ingest()`, and the classes sharing one statement are absent + directory, not unparsable + non-object | L1 | routed |
| `persistence.md` §3 says five boot arms where L1 and `interface.md` §2.1 say six; `behaviour.md` cites `interface.md` §0-§8, and that document has no §4 | L2 | **landed** — six arms re-grounded on `src/main/operator-settings/index.ts:205-237`; the Inputs cite now names only sections that exist |
| D-19 names the exclusion state and the tier-4 flag as import survivors; both are `mem` rows, never persisted (`ASM-2`, `ASM-L2-2`), so the import carries the record's four members | L0 | **D-25** filed as a corrigendum |

`docs-insufficient`: the e2e batteries' corrected reading, which no document states and no staged runner can
obtain. `undocumented`: none.

**Standing deviation, re-measured rather than inherited:** no boot was exercised. The staged
`dist/main/main.cjs` dies at module load — `createRequire(undefined)` from esbuild's `import_meta = {}` shim
at `dist/main/main.cjs:38480` — corroborating the host-side defect the unit record already owns, so every
boot outcome above is documentation-and-bundle evidence, never a run (`walkthrough.md` §3).

**Verdict: not green.** The L2 findings and the D-19 corrigendum are discharged here; the L1 findings and
the missing corrected reading are routed. A fourth blind run is owed (`walkthrough.md` §5, D-10, D-11).
