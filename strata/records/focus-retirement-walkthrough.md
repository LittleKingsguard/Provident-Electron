# `focus-retirement` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 3 of 3** · 2026-11-07 · staged root `/tmp/fw3` (`walkthrough.md` §3) · runner: a fresh delegation that had seen
  neither the code nor the design work · **verdict `STALE`** again, narrower than run 2 — substance green, currency red (`D-143`)
- **Instrument errors, stated beside the verdict and not amended into the corpus** (§5): the staged root omitted
  `docs/L2/focus-model/interface.md` (a staging omission, not a missing document), and `tests/`, `scripts/`, `node_modules/`
  are out by design, so no battery row a page cites could be EXECUTED — those are **unverifiable**, never falsified.
## 1. The scenario set (12 steps; `goal · expected · source`, §2)
1. an agent moves the UI to a tab · the act sets the active tab in the tab record durably, answering the record as re-read · `docs/L2/mcp-surface/interface.md` §1, §3
2. the move survives a restart · a durable tier named, a second process on the same profile reading the same active row · `docs/L1/focus-retirement.md` §4, `docs/L2/store-tabs-record/interface.md`
3. a two-active value · `exactly-one-active` rejects and its repair normalises inside the commit; the caller never clears · `docs/L2/store-tabs-record/interface.md` §4, `docs/L3/store-tabs-record/design.md` §7
4. the old focus mirror is gone · no address, declaration or route; a read absent; `commitFocus` gone from both halves · `docs/L2/view-record/interface.md` §2, `docs/L2/secure-panels/interface.md` §4
5. which data roots are declared · four across two crossings, both guard arms · `docs/L2/central-data/interface.md` §1a
6. the renderer follows the write · the tab record's own push, re-read, terminals driven · `docs/L2/renderer-wiring/interface.md` §2, §5
7. `newTab: true` opens a row · one new row joins the order and is seated; no new tool or route · `docs/L2/mcp-surface/interface.md` §4
8. an unresolved target without `newTab` · no write; the record as read beside the route's own refusal · `docs/L2/mcp-surface/interface.md` §4
9. a store refusal is not swallowed · the writer's ledger carried member for member; the tool's own class is its argument holder · `docs/L2/mcp-surface/interface.md` §3
10. who owns the normalisation · the record's repair; the renderer may seat two actives on purpose · `docs/L3/renderer-wiring/design.md` §2, §6
11. the one composition's contract · `order` preserved, rows whole, no invented member, no `landing` · `docs/L3/renderer-wiring/design.md` §3
12. the two declaration halves stay one edit · twice declared, one edit, the half-landed failure stated · `docs/L2/app-shell/interface.md` §4, `docs/L3/secure-panels/design.md` §3
## 2. Report — run 3
**All twelve steps resolved and settled YES**, each checked against `src/` and `dist/` (zero hits for every deleted symbol in both
trees; the act at `['tabs']`/`file`; the post-write re-read as the answer; the repair normalising rather than refusing; four declared
roots behind two guard arms; the five-member lockstep pair; one composition inventing nothing). No step needed a document the root lacks.
**`docs-stale`** — five pages still call landed work open: `docs/L2/store-tabs-record/interface.md` §5/§7 ("decided, not yet landed" —
the landing is `src/renderer/renderer.ts`'s route, `composeRecord` and the `data.write` call), `docs/L1/focus-retirement.md` §2/`E-3`
(an `app-shell` before-state that no longer exists), `docs/L2/renderer-wiring/interface.md` §6 ("red until `src/**` lands"), and
`docs/L2/central-data/interface.md` §1/§2/§5 (four citations and one export list no longer landing on the bytes they name).
**`undocumented`** — two `src/renderer/renderer.ts` comments still call a non-string `target` "the tool's own refusal" (the class the
pages get right), `src/main/data/types.ts`'s "four declarations" count, the `--provident-user-data=` switch, and the `focus-model` page.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `PASS` (a reader still cannot tell a landed edit from an open one on those pages), not `DOC-GAP` (every expected
outcome is settleable), not `UNUSABLE` (nothing is fabricated). Routing to the owning layers: the three L2 pages to their own passes,
the L1 row to L1, the two code comments to `renderer-wiring`'s licence and its L4 (`D-3`). **The unit is NOT recommended as ready**;
`D-143` records it landed-and-green with this walkthrough owed, and `strata/pending.md` carries the second currency pass as the block.
