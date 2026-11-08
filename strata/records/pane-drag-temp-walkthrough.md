# `pane-drag-temp` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 2 of 2** · 2026-11-07 · staged root `/tmp/fw-drag2` · runner: a fresh delegation that had seen neither the code nor
  the design work · **verdict `STALE`** again, narrowed from run 1 to THREE pages and three insufficiencies (`D-145`) ·
  those were then re-grained in the single currency pass, so the substance never moved in either run
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
## 2. Report — run 2 (run 1's findings closed by the currency pass)
**All ten steps resolved**, and every substance checked agreed with `src/` and `dist/` — the address and tier, the whole-family write,
`R3`/`R4`/`R5`'s order, the closure flag, the tier-blind listener, the declared-unpaired entry, the four roots, the seven members in both
halves, the twenty handlers, the leaf-node size, the empty receipt at a branch, the two reused refusal tokens. **Run 2's own findings,
three pages and three silences: (i)** `docs/L1/focus-retirement.md` still measured the view record at three roots, the channel file at
five names and the surface at four request routes "at this head" — the later unit's landing had moved all three; **(ii)**
`docs/L2/renderer-wiring/interface.md` §3 and `docs/L3/renderer-wiring/design.md` §4 asserted that **every** closed ghost arm removes the
declaration, where the attribute-less arm returns ahead of the paint and removes nothing (the signatures page already said so);
**(iii)** a licence table's "Before (measured at this head)" header over a pre-landing cell. **`docs-insufficient`**: the release's **sink**
was named on three pages and defined on none; `behaviour.md` §6's delete-of-absent receipt omitted `repaired`/`log`. All six were
re-grained in the single currency pass taken under `D-145`, and the `src` docblock and `DC-8(a)` description carrying the same claim are
routed to their own pass.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `DOC-GAP` (nothing the ten steps need is missing) and not `UNUSABLE` (the design content is checkable and correct).
**The unit is NOT presented as ready on this record**: run 2's three findings were closed by the currency pass `D-145` requires, but no
third run has been taken, and a verdict is a reading, not an inference. The loop recommendation `D-145` states now stands as a rule of
the close: **a unit's landing re-grains its own design pages in the same pass**, because every layer measures at its own head and the
landing is what falsifies those measurements.
