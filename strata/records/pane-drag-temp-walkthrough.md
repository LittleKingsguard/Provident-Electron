# `pane-drag-temp` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 1 of 1** · 2026-11-07 · staged root `/tmp/fw-drag` · runner: a fresh delegation that had seen neither the code nor
  the design work · **verdict `STALE`** on currency, never on substance (`D-145`)
- **Instrument note** (`walkthrough.md` §5): `tests/`, `scripts/`, `node_modules/` are out of the staged root by design, so no
  battery, leg or `sha256` claim could be run — recorded **unverifiable**, never falsified (`ASM-L0R-2`).
## 1. The scenario set (10 steps; `goal · expected · source`)
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
## 2. Report — run 1
**All ten steps resolved**, and every design substance checked agreed with `src/` and `dist/` (the address and tier, the whole-family
write, `R3`/`R4`/`R5`'s order, the closure flag, the tier-blind listener, the declared-unpaired entry, the two reused refusal tokens,
the one-row delete). **Both hazards were checked and are absent**: no page puts the drag's value in closure state, and no page routes
the temp reading through `read()`. **`docs-stale` — five L2/L3 pages plus two corpus rows carry pre-landing present tense**: the pair's
absence, the `view` member at five, `main()` at eighteen handlers, `viewDeclaredRoots()` at three/four, and `G8`'s bare-number predicate
where the code reads a leaf node. **`undocumented`**: the ghost's leaf tolerance, `src/main/data/surface.ts`'s stale root-census prose as
an owed item, and no stated build reading for this unit.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `DOC-GAP` (nothing the ten steps need is missing) and not `UNUSABLE` (the design content is checkable and correct).
Routing to the owning layers (`D-3`): the four L2/L3 pages to their own currency passes, the two corpus rows to L0 (closed in `D-145`'s
edits). **The unit is NOT recommended as ready.** The loop recommendation is now a rule of the close rather than a follow-up: **a unit's
landing must re-grain its own design pages in the same pass**, because every layer measures at its own head and the landing is what
falsifies those measurements (`D-145`).
