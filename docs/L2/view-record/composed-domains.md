# L2 — `view-record`: the pane and zone domains composed — the repair stays total, and a figure is its declarer's

- **Layer:** L2 · **Module:** `view-record` (map row `store-view-record`) · **Unit:** `modularity` (`U2`'s `S-7`) · **Branch:** `main` · **Rev:** 1 — **NEW, AND IT IS A SPLIT `D-1` ASKS FOR** (`docs/L2/view-record/interface.md` stands at 150/150): the modularity cells are stated here and the standing page is not appended to (`D-1`, `D-2`, `AN-15`)
- **Inputs:** `docs/L1/modularity.md` §3 `S-7`, §4 `C-4`/`C-9`, §6 `M-7`; `docs/L2/declaration-registry/interface.md` §3–§4; `docs/L3/declaration-registry/signatures.md` §2; `src/main/view-record/index.ts`, `src/shared/view-shape.ts` by site; `D-151`, `D-181`, `D-183`, `D-186`, `D-191`, `D-192`, `D-233`, `D-129`
- **Write scope:** `docs/L2/view-record/` (brief §3); `src/**` read-only at this layer (D-3) · **Status:** the two domains' composition is `S-7`'s and `S-7` is OWED with the registry (`OWED-4`); no `src/**` byte moves

## 1. The subject: two closed literals become two composed sets, and nothing about the repair's rule moves

- **`DECLARED_PANE_IDS` AND `DECLARED_ZONE_IDS` BECOME THE REGISTRY'S FOUNDATION SETS** (`C-4`, `S-7`): they survive as the foundation's own contribution — the panes the app authors, the four zones the layout paints — and every consumer asks `declaredPaneIds()`/`declaredZoneIds()` for the composed set (`docs/L2/declaration-registry/interface.md` §4).
- **THE REPAIR STAYS TOTAL OVER THE COMPOSED SET AND GAINS NO RULE** (`S-7`, findings 3): `panes-must-stand` writes ONE record per composed pane id at creation, both axis members at `DEFAULT_PANE_SIZE` (`D-192`), the stage branch on `DEFAULT_PANE_ID` alone and every other id zone-resident in `MENUS_PANE_ZONE_ID` — **a module pane is minted by that same branch, unedited**: it states a zone and no `bounds`, which is `C-9`/`D-186`'s lawful shape for a zone-resident pane, and no figure is invented for it (`D-174`).
- **THE ADMISSION PREDICATES READ THE COMPOSED SET** (`D-134`'s class): a pane id or zone id outside `declaredPaneIds()`/`declaredZoneIds()` is refused by name at `paneNodeAdmits`/`zoneNodeAdmits`/`paneOf`'s zone arm — today's rule, its source composed.
- **A ZONE'S FIGURE IS ITS DECLARER'S, AND THE FOUNDATION'S DECLARER IS `DEFAULT_ZONE_SIZES`** (`D-233`): `viewZonesPlaceholder` states that table's figure for every id it names and the EMPTY record for one it does not, which is today's declared degradation and not a weakening. **A module-declared zone states no figure at this head** (`capabilities.zones` is ids only, `src/shared/module-contract.ts:43`), so its record is memberless and `zoneFamilyStatesSizes` is false for it — the predicate is NOT loosened; the boot-time repair that follows is the lawful consequence, and `D-191`'s *"a zone stating no size paints nothing"* is what the operator sees. **The figure's declarer-side home for a module zone is OWED and is not invented here** (§4 `OW-1`).

## 2. The interface: two inputs, and the two families' own answers

- **THE INSTANCE TAKES THE TWO SETS, REQUIRED** (`ViewRecordOptions`): `paneIds` and `zoneIds`, from `registry.declaredPaneIds()`/`declaredZoneIds()`. Required for `S-9`'s reason: an optional member defaulting to the literals is the copy renamed, and one defaulting to `[]` silently empties the repair. A required member makes every construction site a `typecheck` red, which is the re-grain's own list on the floor leg (`D-11`).
- **THE SETS ARE HELD ONCE AND PASSED TO THE PURE HELPERS**: the family parsers and the repair builders are module-level functions, so they take `readonly string[]` as a parameter rather than closing over a mutable module-level list (`D-129`; `S-9`'s `ASM-OS-2` at this axis).
- **THE RENDERER'S READS ARE NOT THIS PAGE'S** (`S-18`, `U5`'s step): `renderer.ts`'s `DECLARED_PANE_IDS.indexOf(id)` order and its iterating reads are the renderer's maps, and they re-grain where the maps do (`PR-8`).

## 3. The two families, member by member

| Family | The composed set orders the repair | The figure | The absence |
|---|---|---|---|
| panes | one record per composed id, in the registry's order (foundation first) | `DEFAULT_PANE_SIZE` on both axes, `D-192`'s rule | the stage pane keeps its `bounds`; a zone-resident pane's absence is lawful (`D-186`) |
| zones | one record per composed id | `DEFAULT_ZONE_SIZES`' figure where named, `{}` where not (`D-233`) | a zone stating no `size` paints nothing (`D-191`) |

- **THE PLACEHOLDER AND THE REPAIR STAY ONE SPELLING** (`D-151`'s precondition, `viewPanesPlaceholder`'s own docblock): both are built from the SAME composed list, so the set and the placeholder cannot drift — the property is kept by passing one list to both, never by deriving it twice.
- **NEITHER FAMILY READS THE OTHER** (`D-186`): the panes' repair still takes no figure from `['zones']`, and the zones' repair still takes none from `['panes']`.

## 4. What this page does not own, and the one thing it owes

- **`OW-1` — the figure's declarer-side home for a module zone is OWED**: `capabilities.zones` carries ids only, so a module zone is composable and unpaintable until a figure has an author. It is named here rather than invented, and it is `S-22`'s coeffect question as much as this domain's (`docs/L1/modularity.md` §4 `C4`).
- **`PANE_STATUS_WORDS` is not a domain** (`docs/L1/modularity.md` §2): it stays `view-record`'s own three-word set and no registry entry exists for it.
- **The renderer's maps are `S-18`'s** and the drag's geometry reads are `view-client.ts`'s; this page moves neither.

```boundary-declared
{"unit": "modularity", "layer": "L2", "module": "view-record", "writes": [{"path": "docs/L2/view-record/composed-domains.md", "d": "D-306", "why": "this page, rev 1 NEW — S-7 split at the standing page's ceiling: the two literals become the registry's foundation sets, the repair stays total over the composed set with a module pane minted by the existing stage-vs-zone branch unedited, the admission predicates read the composed set, a zone's figure is its declarer's with the empty record as the declared degradation, the two required inputs, and the module zone's figure's home named as owed; no src byte"}]}
```
