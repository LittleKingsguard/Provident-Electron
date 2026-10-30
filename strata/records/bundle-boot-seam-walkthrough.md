# record — `bundle-boot-seam` exit walkthrough, run 3 (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 what was broken, and why the verification floor
never saw it · 2 the arrangement chosen and what it cost · 3 what the entry had to change, and the proof
that nothing else moved · 4 how a boot is proven, and what a failed boot must answer · 5 what the
artifact cannot do · 6 which writes belong to whom, and what lies outside the unit. Seat: one fresh
delegation per run, staged to a copy of `strata/`, `docs/L1..L3/`, the root pointers, `package.json`, a
tracked-path listing, an archived-path listing and the built bundles; no `src/`, no `tests/`.

## Run 3 — `STALE` (not green)

Every step was answerable from the documents, and every figure the staged surface can check landed
exactly: the artifact's `1,345,550` bytes, `package.json`'s `main`, `build` and `build:watch` lines, the
row's `endpoints` 12 and the derived cap 170, the five artifacts and their module systems, and the
tree's own counts. Three readable claims were contradicted:

| Falsified claim | Owner | Disposition |
|---|---|---|
| `docs/L2/bundle-boot-seam/behaviour.md` §2 attributes the boot order to `D-19`, which is the import-once row and carries no boot-order clause | L2 | routed |
| `docs/L1/bundle-boot-seam.md` §3 says two arrangements are visible "so the battery is completable (ASM-1, ASM-2)", while its own §9 files no assumption covering the second arm | L1 | routed |
| `docs/L2/bundle-boot-seam/interface.md` §7 calls the two unwired gate-era drivers "live legs", against L3's `design.md` §6 which measures that nothing runs them | L2 | routed |

`docs-insufficient`: none in any of the three runs. `undocumented`: none. The two earlier runs failed the
same way — on currency, never on sufficiency — and both were fixed by re-graining the layers' own
documents rather than by weakening a claim.

**What this unit's runs established:** the three Electron legs are green at this head — `battery` 184/184,
`divergence` 9/9 on the pinned N plus 4 extension checks, `ui` 11/11 with real geometry out of a live
renderer — and the unit's own batteries are green at every grain: unit 8/8, integration 5/5, e2e 8/8
(`strata/brief.md` §6).

**Verdict: not green.** Three sentences are the whole of it; each is routed to the layer that owns it.
A fourth run is owed before this unit is recommended as ready (`walkthrough.md` §5, D-10, D-11).
