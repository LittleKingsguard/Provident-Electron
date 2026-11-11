# `app-layout` — the L0 exit walkthrough (`walkthrough.md` §1–§6, D-1 §4.1)

- **Run 1 of 5** · 2026-11-09 · staged root `/tmp/wt-app-layout` (HEAD `707d792`, 176 files, `scripts/strata-walkthrough.mjs stage`) · runner: this seat, from the staged root, `check` and `pins` only.
- **Instrument notes** (§5): `tests/`, `scripts/` and `node_modules/` are **out of every staged root by design**, so **no battery claim could be EXECUTED from the root** — the eleven `AL` rows, the four legs and the demo's live drive are read from the tree's own runs at this head, not re-run here. **`check` exits `1` on three cites to the `panes-layout` module's layer pages**, and **that is a recorded forward cite, not a missing page**: the row in `strata/decisions.md` headed *"two instrument notes"* states that the row naming them describes them as **a future unit's OWED re-issue**, and that the instrument **cannot distinguish a forward cite from a missing page**. **The corpus is not edited for it, and this record names no path it would have to resolve.**

## 1. The scenario set (11 steps, the scope's own `S-1`…`S-11`, `goal · expected · source`)
1. a caller mints by name · `applyCommand` resolves a string `target` and refuses an unresolvable one · `docs/L2/producing-runtime/interface.md` §3
2. the envelope authors the interface · the top-bar, the tabs row, four zones, a stage, two handles, the menus and its receipt · `docs/L3/app-envelope/design.md` §3
3. the row is N and reads the record · one row per `order` entry, its own label, one active marker · `docs/L1/app-layout.md` §5 `AL-2`
4. the row is a control · a click moves the record's active member, for a pointer **and** for an agent's dispatch · `docs/L2/renderer-wiring/interface.md` §2 turn 2
5. the marker moves and the rows are fresh · every id churns, the price named, each fresh row still dispatchable · `docs/L1/app-layout.md` §5 `AL-4`
6. the zones take their figures · `['zones'].size` is the height or the width, `display` composed into one value · `docs/L2/view-record/interface.md` §1
7. the pane takes its adjustable member · `width` in a top/bottom zone, `height` in a sidebar, both in the stage, and the other stands untouched · `docs/L2/view-record/interface.md` §4
8. the stage obeys the active tab · one page shown, the other hidden, and the landing entry decides which · `docs/L1/app-layout.md` §5 `AL-5`
9. the pane is the menu it claims · four menus, eighteen labelled items, the seven refused rendered `disabled` · `docs/L1/app-layout.md` §5 `AL-6`
10. the route is total · eleven execute, seven refuse by name, the transport survives every attempt · `docs/L2/app-shell/interface.md` §3
11. both domains widened · two panes, four zones, the two placements told apart, and `zones` in no file · `docs/L1/app-layout.md` §5 `AL-8`

## 2. Report
**All eleven steps resolved and NONE was guessed**, and every checkable claim agrees with `src/renderer/renderer.ts`, `src/renderer/tabs-client.ts`, `src/shared/tabs-landing.ts`, `src/main/tabs-record/index.ts`, `src/main/main.ts` and `src/shared/demo-envelope.ts` at this head. **The battery is `11/11`** (`tests/e2e/app-layout/`, five boots), and **`docs-stale`, `docs-insufficient` and `undocumented` are ALL EMPTY** for the pages the unit wrote.
**The unit's own claim is measured, not asserted**: the tabs row switches for a human click **and** for `provident.dispatch` (the minted row carries a live-function closure, `D-209`), the menus pane dispatches eleven **and executes them on the live `webContents`** while refusing seven before any other arm (`D-196`/`D-207`), and the regions take the figures their records hold **in rendered markup** (`AL-10`).
**Two caveats are carried rather than closed.** **(i)** **`AL-10` reads markup, never computed style** — computed style is unreachable on a gating leg, measured twice (`D-208`), so **`D-204`'s missing instrument still does not exist**. **(ii)** **A defect outside this unit was volunteered by its battery**: a switch onto a tab standing **earlier** in `order` lands its write and still reads `active: false` (`D-211`) — the tabs referent's, routed to `store-tabs-record`, and `AL-4` deliberately avoids depending on that direction rather than pinning broken behaviour.

## 3. Verdict, routing and the loop recommendation (§5)
**`PASS`** — not `DOC-GAP` (every scenario's cite sits on the page that carries its claim), not `STALE` (no claim disagrees with the tree), not `REBUILD` (nothing structural moved after design). **The two caveats are routed, not deferred**: the computed-style instrument is `D-204`'s and belongs to a leg that gates; the backwards switch is `D-211`'s and belongs to `store-tabs-record`.
