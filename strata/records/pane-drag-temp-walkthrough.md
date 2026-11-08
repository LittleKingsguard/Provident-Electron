# `pane-drag-temp` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 4 of 4** · 2026-11-08 · staged root `/tmp/fw4-drag` (HEAD `ad25910`, 169 files, `scripts/strata-walkthrough.mjs stage`) · runner: a fresh delegation that had seen neither the code nor the design work · **verdict `STALE`** — ten of ten steps answered from the named pages, and ONE source docblock contradicts the code beside it (`D-147`)
- **Instrument note** (§5): `tests/`, `scripts/`, `node_modules/` are out by design, so every battery, leg, `sha256` and lint claim is **unverifiable**, never falsified — including `provident-storeroom`'s own `temp` semantics, which the unit's claim rests on and this root cannot reach.
## 1. The scenario set (10 steps; `goal · expected · source`, §2)
1. where the in-process value lives · `['drag']` at `temp`, keyed by pane id · `docs/L2/view-record/interface.md` §1
2. is it durable · no — `temp` persists nowhere; the durable half is `['panes']` at `file` · `docs/L1/pane-drag-temp.md` §3
3. what commits at the end, through which route · `commitPane` at `['panes']`/`file` · `docs/L2/renderer-wiring/interface.md` §2
4. when the temp reading ends, and the release's order · sink → `commitPane` → ending, one per gesture · `docs/L3/renderer-wiring/design.md` §2/§3
5. what the ghost asks, paints, and on a lost delivery · one `data.read`, `_tier` test, fails closed · `docs/L2/renderer-wiring/interface.md` §3
6. one write per placement change or per gesture · per placement change · `docs/L2/renderer-wiring/interface.md` §2.1
7. why the root is unpaired · no invariant holds a transient; a repair's subject is "no drag" · `docs/L2/view-record/interface.md` §1
8. how the renderer hears an outside write · the tier-blind subscription array · `docs/L2/view-record/interface.md` §4
9. do both halves carry the same members · seven, one edit, a half ships silently · `docs/L2/app-shell/interface.md` §3
10. which arms carry refusals · the two route tokens; nothing judges a `temp` value; a delete names one ROW · `docs/L2/view-record/interface.md` §5
## 2. Report — run 4
**All ten steps resolved with no guessing**, and every substance checked agreed with `src/` and `dist/`: the address
and tier, the whole-family write, `R3`/`R4`/`R5`'s order under the one-ending flag, the single ghost read and `_tier`
test, the per-placement-change write, the unpaired fourth root with no drag row in the batch, the four-address
tier-blind listener, the seven-member lockstep pair, the twenty handlers, and the two reused refusal tokens with
nothing judging a `temp` value. Steps 8 and 10 each needed a second hop (§4 → §7; §5 → `central-data`'s
`behaviour.md` §6) and both hops are supplied, so neither is an insufficiency.
**`docs-stale` — one.** `src/renderer/renderer.ts:2542-2544`'s `renderGhost` docblock says a target that will not take
an attribute "each REMOVE the declaration", where the code at `:2595` returns **ahead of the paint and removes
nothing**, and `dist/renderer/renderer.js` carries the same gate — while the pages (`renderer-wiring` L2 §3, L3 §4,
`signatures.md` §1) all state the exception correctly. This is the arm `D-145`'s currency pass fixed on the pages and
left in the source prose `D-44` made checkable. **One `unverifiable`**: `docs/L3/renderer-wiring/design.md` §8 and
`docs/L1/pane-drag-temp.md` §4 still call `tests/unit/renderer-wiring/preview-seat.test.ts` owed, while `tree.txt`
carries that path and `D-146` records it landed 4/4 green — `tests/` is absent, so this is the FIRST thing the next
run must settle from a root that carries `tests/`.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `DOC-GAP` (`docs-insufficient` and `undocumented` are both EMPTY: every behaviour a reader meets on
this path is stated on a page or in a docblock) and not `UNUSABLE` (nothing blocked the run and nothing is fabricated).
It is `STALE` because one claim inside the documented surface is contradicted by the code beside it and by the bundle.
Routing (`D-3`): `renderer-wiring`'s next pass, ONE comment, plus the `DC-8(a)` description carrying the same claim.
**The unit is NOT presented as ready.** This is the narrowest verdict of the three and it turns on a single docblock:
the loop recommendation is that a currency pass re-grain EVERY carrier of a claim it corrects, including the `src/`
prose `D-44` made checkable — the pages were fixed and the source was not.
