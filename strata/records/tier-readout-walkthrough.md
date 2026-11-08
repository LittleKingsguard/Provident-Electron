# `tier-readout` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 4 of 4** · 2026-11-08 · staged root `/tmp/fw4-tier` (HEAD `ad25910`, 169 files, built by
  `scripts/strata-walkthrough.mjs stage`) · runner: a fresh delegation that had seen neither the code nor the design
  work · **verdict `STALE`** — the contract is right and two live figures are not (`D-146`, `D-147`)
- **Instrument note** (§5): `tests/`, `scripts/`, `node_modules/` are out of the staged root by design, so no battery
  claim could be EXECUTED and the release's own `TieredNode`/`TierSet`/register node could only be taken on the
  corpus's word — recorded **unverifiable**, never falsified. Every one of the ten citations resolves to a section.
## 1. The scenario set (10 steps; `goal · expected · source`, §2)
1. an agent asks which tier a value came from · the answer's node names its own tier · `docs/L2/central-data/interface.md` §2a
2. one call, nodes at different tiers · each node names its own, never a per-call echo · `docs/L1/tier-readout.md` §1
3. leaf versus container · `kind:'row'` iff the node is a leaf, `'branch'` for object/array/empty register · `docs/L3/central-data/signatures.md` §2
4. one token, never a set · the argument's type versus the answer's · `docs/L2/central-data/interface.md` §2a
5. an empty address on a live profile · the store's own register node, a tier carried · `docs/L2/central-data/interface.md` §1
6. an empty address on a cold profile · `absent`, no node, no tier · `docs/L3/central-data/design.md` §3
7. a refusal · which arms carry evidence and which carry no tier · `docs/L2/central-data/interface.md` §2/§2a
8. a caller's own stored `_tier` · shadowed, siblings delivered, `read` still answers it · `docs/L1/tier-readout.md` §1
9. who mints the tier · the store, through ONE `readTiered` call; the seam gains no byte · `docs/L3/central-data/design.md` §3
10. does anything else move · `list` untouched, the seam's census unmoved, one description moves · `docs/L1/tier-readout.md` §2
## 2. Report — run 4
**All ten steps resolved and NONE was guessed**, and every central claim agrees with `src/main/data/surface.ts`,
`types.ts`, `args.ts`, `mapper.ts`, `src/main/mcp-server.ts` and `dist/main/main.mjs`: the per-node `_tier` passed
through unminted, no call-level echo, `kindOf`'s leaf/container discriminator, one token accepted and one answered,
the register node on a live profile and `absent` on a cold one, no tier on any refusal arm, the shadowing rule, ONE
`readTiered` call with the seam gaining no byte, and `list` untouched with one description moved.
**`docs-stale` — two.** **(i) This pass's own landing**: `docs/L2/central-data/interface.md` §1a's bullet ending "*That
comment is OWED and not taken here*" still says `surface.ts`'s header "still reads **four**" — `D-146` took that repair
and the bytes read FIVE — so the page tells a reader to expect a state the surface has left. **(ii)**
`docs/L1/central-data-management.md` §5's `S-9` row still measures the seam at "14 members / 11 symbols" imported by
"exactly two files", where `src/main/storeroom.ts` reads `15`/`13` and three files import it.
**`docs-insufficient`** — one: step 8's third clause, "`read` still answers it", never says WHICH `read` (the store's
own verb, not a `data.*` tool) on the page that states the clause. **`undocumented`** — the token the empty register
node carries on the boot store (`file`, its fixed creation tier) is derivable only from the register-tier rule.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `DOC-GAP` (every expected outcome is stated somewhere, so nothing was guessed and silences are not
what fails this run) and not `UNUSABLE` (a reader following the citations reaches the truth). Routing (`D-3`): §1a to
`central-data`'s L2 pass — the same page and the same repair `focus-retirement`'s run 4 reports, so ONE fix clears
both — and `S-9` to `central-data`'s L1. **The unit is NOT recommended as ready**; `D-144` records it landed-and-green
and this record is its block.
