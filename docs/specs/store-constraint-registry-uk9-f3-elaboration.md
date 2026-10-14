> **FILED BY THE SUPERVISOR, `2026-10-13`, FROM THE ROLE'S OWN RETURN.** `role_architecture_review` held no `write` tool on either attempt, so its bounded elaboration body is filed here unchanged; the run before this one could not be filed at all (its body exceeded the supervisor's read window). No byte of the role's text is altered. Its figures are the role's **counted** figures — the supervisor's measurements appear in the gate-1 record's delta and in `docs/handoffs/` records, and the one place they differ is noted there.

# `UK-9` / `F3` ELABORATION — input to a ruling

Labels: **measured** (read this pass) · **declared** (cited from contract/ledger text) · **derived** (my inference). No spec text, register, red set, design, decision row or ledger move.

## 1. What `F3` is
`F3 = U-STORE-REDERIVE-SUCCESSOR` **declared**: the in-flight unit's id+subject kept — OWNS `src/renderer/store.ts`, `docs/specs/store-rederive/` (10 files) and its parts, the ten-function surface, the typed register `27` rows / `288 = 232 + 8 + 24 + 12 + 12` attempts, red set `tests/store-rederive.test.ts` rows `C-1`…`C-18`, its own re-freeze duty. NOT IN IT: the constraint/repair seam + repair-once bound + token 20 + the message list `6 = 2 + 4` (`F1`); realm/IPC/wrapper (`F2`); the package import and every `opId`-rollback verb (`F4`); the `secure` enforcement site (`F3`'s own residual `R-5`).
**measured this pass, correcting F3's own cell (archive §1a):** `store.ts` NOW EXISTS (2,311 lines; `createStore` `:1073`, `Store` `:213-224`); **nothing imports it** — `renderer.ts:11` imports the LANDED `store-core-graph.js`; the red set imports only `tests/store-rederive-register.js:134` and never `src/**`. **derived:** `F3`'s byte-work is authoring/refactoring a module no runtime binds; "centralize" lands in unreachable bytes plus three contract documents.

## 2. The current editing surface — measured
| path | lines | role | owner |
| --- | --- | --- | --- |
| `store.ts` `runWrite` `:1962-2031` (funnel: pre-call snapshot `:1977-1988`) | declared "ONE private write path" | funnel | `F3` |
| `store.ts` internal writers `planWrite:1357` `applyPlan:1564` `commit:1891` `purgeAt:1916` (the `register.push` at `:1383`) | private | `F3` |
| `store.ts` private mutate-arms `runLoad:2112` (`register.push:2162`, `unmintedRoots.delete:2167`) · `runListen:2176` (`:2188`) · `runConstrain:2197` (`:2211`, `owner.push:2245`) · `runLoad:2167` | private | `F3` |
| `store.ts` surface `:2266-2295` | the ten functions; `gated` `:2251` | `F3` |
| `store-core-graph.ts` write path `commitOp:1794` `setOrMint:1920` `removeOp:1944` `clearOp:2007` `sweepOp:2025` `severOp:2062`; journal `:1360-1394`; surface `:2251-2350` (8 verbs) | private | FROZEN (art. digest `sha256:29772ac7…`; 5-col amendment list) |
| `store-graph-references.ts` `:1-36` | input; NO mutation path | FROZEN |
| `renderer.ts` **`:87-154`** — `TABS_*` constants `:110-138`, `tabsEntryReadsActive:145`, `writeTabsEntryActive:154` | **declarations + accessors, not an editing action** | `T2`→`F1` (re-author-or-delete) |
| `renderer.ts` real mutation verbs `:618, :643, :774, :1200-1201, :1932`; boot construction `buildWiredGraphStore:802, :809` | callers | `T2` wired; boot `F3` |

## 3. The three readings, priced
**(a) `store.ts` only.** One edit point in `runWrite`, or a registry point beside it; the five private paths (`runLoad`/`runListen`/`runConstrain` + the two `register.push` sites) lose their private route. Touches contract `store-model.md §2.5`+`§2.10`, `seams-and-lifecycle.md §2.10`, `write-and-read.md §2.5`; **`§5.x` moves no row** (register is contract text); `22` union and `6 = 2 + 4` untouched (**derived**: the registries sit *outside* the seam). **Re-freeze:** successor artifact is FROZEN (`sha256:1b16127f…`); a `§2.5`-semantics change alters fields 1–7 → new digest + five-column amendment row + re-run `P0`…`P2` — **F3's own duty, which its `disposition` cell already carries**.
**(b) incl. the FROZEN `store-core-graph.ts`.** Needs a NEW `sha256` over its span, a five-column amendment row, the wave's audit+freeze re-run (legal states `MODULE-RED/AUDITED/FROZEN`; re-freeze precedents `UNIT-ADV-1`→`HYDRATE-1` each re-ran gate 3/4 and integration). **declared conflict:** the `2026-10-11` ACTIVE row's `(D2)` — "NEITHER RE-FROZEN NOR RE-LICENSED AND NO BYTE OF IT MOVES" — so (b) requires an architect-amended freeze. Union/message list untouched. **Priciest by far.**
**(c) caller region only.** `:87-154` carries no mutation path (measured): it wraps `:618/:643/:774`. Contract parts touched: `F1`'s `T2` disposition only; register unchanged; union/message list unchanged. **It centralizes nothing** (3 callers; focus writes `:1200-1201/:1932` and the frozen 8 verbs stay outside).

## 4. `F3` vs the new fraction
(a) lands inside `F3` cleanly — its own path, funnel, register; no second unit in the pass. (b) needs an amended freeze **and** a second path-owner. (c) is not `F3`'s at all — `F1`'s `T2` cell. **A registry point at the `write`/`secureWrite` edge** (`:2270/:2276, :2285/:2291`) is the only seam a cross-call registry can occupy without a second store owner; putting it there edits `F3`'s bytes → two units in one pass.

## 5. Recommendation and the two-option line
**Recommended: `(a)` `store.ts` only — `F3` owns the funnel, the new fraction owns only the registry record (no second path-owner, no freeze fight).** `(b)`'s benefit is whole-program coverage; its cost is a re-freeze against a standing "no byte moves" ruling plus a module-wave re-cycle. `(c)` is cheapest and achieves nothing.
**One-line ruling: `UK-9` = (a) `store.ts` only, the registry owned by the new fraction at the `runWrite` edge — or (b) `(a)` plus the FROZEN store, which re-freezes.**

## 6. `F3`'s DONE row
Nothing here blocks it **declared**: three measured facts change re-freeze *pricing* (caller region is not an editing surface; the nine private paths sit inside `F3`; `store-core-graph.ts` is the live implementation whose bytes are pinned). `F3` holds **no ledger row** — `RCA-8(f)`: the architect admits rows.
