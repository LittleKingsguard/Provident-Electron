# record — `bundle-boot-seam` exit walkthrough, run 6 (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 what was broken, and why the verification floor
never saw it · 2 the arrangement chosen, and every `package.json` line it lands in · 3 what the entry had
to change, and the proof that nothing else moved · 4 how a boot is proven, and what a failed boot must
answer · 5 what the artifact cannot do · 6 which writes belong to whom, and what lies outside the unit.
Seat: one fresh delegation per run, staged to a copy of `strata/`, `docs/L1..L3/`, the root pointers,
`package.json`, a tracked-path listing, an archived-path listing and the built bundles.

## Run 6 — `STALE` (not green)

Every step answered from the cited documents, and every figure of the unit's own three layers landed:
the artifact's `1,345,550` bytes, its two bare-specifier sites, zero `import_meta`/`__dirname`/addon-path
references, five artifacts, N=12, the row's four paths, and `package.json`'s `:7`, `:10`, `:11`, `:26`.
Four sentences elsewhere in the corpus were contradicted by the surfaced artifact:

| Falsified claim | Owner | Disposition |
|---|---|---|
| `README.md`'s build line still described the main bundle as CJS | L0 | fixed — the main artifact is ESM |
| `docs/L1/central-data-management.md` §1 cited `dist/main/main.cjs`, an artifact no build emits | L1 | routed and fixed |
| `docs/L3/settings-carrier-retirement/signatures.md` §6 still claimed `node:path` binds `join` alone | L3 | routed and fixed — the binding set is E-2's consequence now |
| `docs/L2/bundle-boot-seam/interface.md`'s Inputs read the derived cap as a field of the map row | L2 | routed and fixed |

`docs-insufficient`: none in any of the six runs. `undocumented`: none.

## What six runs establish, and what they say about the instrument

Not one of the six runs failed on coverage. Every one named between one and four sentences — always a
stale cite, a count, or a cross-document contradiction — and the six sets barely overlapped, because each
fix moved the prose and the next pass read a different page. The engineering was green from run 1 onward:
`battery` 184/184, `divergence` 9/9 on the pinned N plus 4 extension checks, and `ui` 11/11 with real
geometry (`strata/brief.md` §6), with the unit's own three batteries green at every grain. This is the signal `rebuild.md`
§3 describes: seven passes on one artifact class indict the class, not the sentences.

**Verdict: not green.** Run 7 then found two sentences in one L2 document — a cite to an `L1 §0` that does
not exist and a four-command floor called "the three legs" — both fixed. Seven runs, seven passes, and not
one of them failed on coverage: the corpus's own answer to a seventh red is not another prose pass, and the
state machine has now made that unavoidable (below).
