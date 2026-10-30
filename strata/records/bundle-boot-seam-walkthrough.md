# record — `bundle-boot-seam` exit walkthrough, run 12 — `PASS` (D-10; replaced on every run)

**Scenario set** (L0-authored from the documentation): 1 what was broken, and why the verification floor
never saw it · 2 the arrangement chosen, every `package.json` line it lands in, and what it cost · 3 what the
entry had to change, and the proof nothing else moved · 4 how a boot is proven, and what a failed boot must
answer · 5 what the artifact cannot do · 6 which writes belong to whom, and what lies outside.

**Seat.** One fresh delegation per run, staged to a generated copy of `strata/`, `docs/L1..L3/`, the root
pointers, `package.json`, a tracked-path listing, an archived-path listing and the built bundles —
`scripts/strata-walkthrough.mjs stage`, which also resolved every path cite (exit 0) before the run began.

## Run 12 — `PASS`

All six steps were answered from the documents alone, and every checkable claim in the unit's three layers
agreed with the other staged documents and with the staged surface:

| Step | What the run verified |
|---|---|
| 1 | the defect as D-27 records it, and the floor's blindness stated in the **past** tense, agreeing with `signatures.md` §6 and L1 §7 after the re-grain |
| 2 | `package.json:7` names the ESM entry; `:10` and `:11` each carry `--format=esm --external:provident-storeroom`, exactly two occurrences; no key added, `:26` unchanged |
| 3 | the emission carries one `dirname3(fileURLToPath(import.meta.url))` and exactly two `join3(here, …)` sites; five artifacts, no `main.cjs`, no source map |
| 4 | all seven observables exist in the built bundle, each named by one of B-1..B-8, with the reason-before-the-bound rule behind them |
| 5 | the three limit statements agree, and no packaging config exists anywhere in the tree |
| 6 | every declared write sits on its own row, and no path is claimed twice |

`docs-insufficient`: none. `docs-stale`: none. `undocumented`: none.

## What twelve runs cost, and what they bought

Runs 1–11 never failed on coverage. Each named between one and five **contradicted claims** — a stale count,
a cite into an appendable file that had moved, a retired artifact named in the present tense, and finally the
corpus's own shim rule, which stopped being true the moment this unit's battery entered `npm test`. Two rules
came out of that (D-26, D-28) and one instrument (D-29), and the unit is now green on every measure the corpus
has: its three batteries at 8/8, 5/5 and 8/8, and `battery` 184/184, `divergence` 9/9 and `ui` 11/11 — the
first time all three Electron legs have passed together (`strata/brief.md` §6).

**Verdict: `PASS`.** The unit is recommended as ready and is closed (`stage: done`, streak cleared).
