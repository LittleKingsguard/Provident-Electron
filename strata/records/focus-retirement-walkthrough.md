# `focus-retirement` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 4 of 4** · 2026-11-08 · staged root `/tmp/fw4-focus` (HEAD `ad25910`, 169 files, `scripts/strata-walkthrough.mjs stage`) · runner: a fresh delegation that had seen neither the code nor the design work · **verdict `STALE`** — the surface is right and one live sentence says it is not (`D-146`, `D-147`)
- **Instrument note** (§5): `tests/`, `scripts/`, `node_modules/` are out by design, so no battery, leg or package claim could be EXECUTED — **unverifiable**, never falsified; step 2's second-process leg is one of those halves. The three `panes-layout` cites in `strata/decisions.md` name documents that row describes as a future unit's OWED re-issue, so the instrument's `check` exit `1` on them is its forward-cite limit, not a defect of those documents.
## 1. The scenario set (12 steps; `goal · expected · source`, §2)
1. an agent moves the UI to a tab · the act sets the active tab in the tab record durably, answering the record as re-read · `docs/L2/mcp-surface/interface.md` §1, §3
2. the move survives a restart · a durable tier named, a second process on the same profile reading the same active row · `docs/L1/focus-retirement.md` §4, `docs/L2/store-tabs-record/interface.md`
3. a two-active value · `exactly-one-active` rejects and its repair normalises inside the commit; the caller never clears · `docs/L2/store-tabs-record/interface.md` §4, `docs/L3/store-tabs-record/design.md` §7
4. the old focus mirror is gone · no address, declaration or route; a read absent; `commitFocus` gone from both halves · `docs/L2/view-record/interface.md` §2, `docs/L2/secure-panels/interface.md` §4
5. which data roots are declared · **five** across two crossings — four from the view record, one from the tab record, the gesture family's unpaired — both guard arms · `docs/L2/central-data/interface.md` §1a
6. the renderer follows the write · the tab record's own push, re-read, terminals driven · `docs/L2/renderer-wiring/interface.md` §2, §5
7. `newTab: true` opens a row · one new row joins the order and is seated; no new tool or route · `docs/L2/mcp-surface/interface.md` §4
8. an unresolved target without `newTab` · no write; the record as read beside the route's own refusal · `docs/L2/mcp-surface/interface.md` §4
9. a store refusal is not swallowed · the writer's ledger carried member for member; the tool's own class is its argument holder · `docs/L2/mcp-surface/interface.md` §3
10. who owns the normalisation · the record's repair; the renderer may seat two actives on purpose · `docs/L3/renderer-wiring/design.md` §2, §6
11. the one composition's contract · `order` preserved, rows whole, no invented member, no `landing` · `docs/L3/renderer-wiring/design.md` §3
12. the two declaration halves stay one edit · twice declared, one edit, the half-landed failure stated · `docs/L2/app-shell/interface.md` §4, `docs/L3/secure-panels/design.md` §3
## 2. Report — run 4
**Nine of twelve steps settled YES from the sections they name**, each checked against `src/` and `dist/` (the act at
`['tabs']`/`file` answering the post-write re-read; the repair honouring the written referent and never refused by a
guard; zero hits for all six deleted symbols in both trees; **five** declared roots with the drag one unpaired; one new
`tab-<n>` row and no new tool; the refusal answered before any route; the seven-member lockstep pair at both halves).
**`docs-stale` — one, and it is this pass's own landing**: `docs/L2/central-data/interface.md` §1a still says
`surface.ts`'s root header "still reads **four**" and that "That comment is OWED and not taken here", where the bytes
read FIVE and name the unpaired entry — `D-146` took exactly that repair and did not re-grain the page that called it owed.
**`docs-insufficient`** — steps 6, 10 and 11: their named sections cannot answer them, the rev-5/rev-7 `renderer-wiring`
pages having been re-grained WHOLE onto `pane-drag-temp`, so the material now lives only in `docs/L1/focus-retirement.md`
§3/§4, a unit record and the `src/` docblocks. **`undocumented`** — the composition's `C1`–`C4` contract has no live design
section, and `src/main/data/types.ts`'s "the view record's four" does not say whether it counts the publication or the batch.
## 3. Verdict, routing and the loop recommendation (§5)
**`STALE`** — not `PASS` (three steps are not resolvable from the pages they name, and one sentence tells a reader to
expect a state the surface has left), not `DOC-GAP` (the renderer-wiring silence alone would be that; the contradiction
is what tips it), not `UNUSABLE` (nothing is fabricated and the corpus can settle every step). Routing (`D-3`): §1a to
`central-data`'s L2 pass; the two `renderer-wiring` pages to that module's L2/L3; the `types.ts` count to its licence.
**The unit is NOT presented as ready.** The loop recommendation applies `D-145`'s rule to this pass's own landing: a
repair taken in a pass must re-grain the page that recorded it as owed IN THAT PASS, and a page re-grained "whole" onto a
new unit must carry its predecessor's subject forward rather than replace it.
