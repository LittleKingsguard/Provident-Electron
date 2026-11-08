# `tier-readout` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 1 of 1** · 2026-11-07 · staged root `/tmp/fw-tier` · runner: a fresh delegation that had seen neither the
  code nor the design work · **verdict `STALE`** — the contract is right, the set that states it is not (`D-144`)
- **Instrument note** (`walkthrough.md` §5): `tests/`, `scripts/`, `node_modules/` are out of the staged root by design,
  so no battery claim could be EXECUTED and the package's own `TieredNode` could only be taken on the corpus's word —
  recorded **unverifiable**, never falsified. Three cited `docs/L1/` pages were not staged: a staging omission, not a gap.
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
## 2. Report — run 1
**All ten steps resolved**, and every central claim agrees byte for byte with `src/main/data/surface.ts`, `types.ts`, `store.ts`,
`src/main/storeroom.ts` and `dist/main/main.mjs`. `docs-stale`: `docs/L2/central-data/behaviour.md` still answers a read with a bare
`value:'x'` and an empty address with `value:{}` (both contradicted by the landed arm); `interface.md` §9's `H-4` still says the
`provident.data.read` description "still promises a literal" although `src/main/mcp-server.ts:1133` and all three bundles carry the
AFTER sentence; `docs/L3/central-data/design.md`'s status still reports its rows RED until an L4 that has landed; `persistence.md`'s
"what a caller writes is what `read` copies back" is now false. `docs-insufficient`: **which token** the empty register answers (the one
page that would say it says `{}`), and whether a stored `_tier` is reachable **from this surface** (the rule rests on the store's own
`read`, which no `data.*` tool hands a caller). `undocumented`: the readout's payload growth, the consumer's unwrap rule, and the
round-trip scope (`T-5`'s "no `_tier` in the file's bytes" versus §2a's "a written-back answer is ordinary data").
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `DOC-GAP` (the failures are contradictions, not silences) and not `UNUSABLE` (a reader who follows the citations to
`interface.md` §2a and L1 §1–§4 is told the truth). Routing to the owning layers: `central-data`'s `behaviour.md`, `persistence.md`,
`interface.md` §9 and `docs/L3/central-data/design.md`'s status to their own passes (`D-3`). **The unit is NOT recommended as ready**;
`D-144` records it landed-and-green with the currency pass owed, and `pending.md` carries it.
