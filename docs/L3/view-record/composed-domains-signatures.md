# L3 — `view-record`: the composed domains' signature stubs — two required inputs, four parameterised readers, and no new rule

- **Layer:** L3 · **Module:** `view-record` (map row `store-view-record`) · **Unit:** `modularity` (`U2`'s `S-7`) · **Branch:** `main` · **Rev:** 2 — **THE INPUTS ARE THUNKS AND THE SECOND INSTANT IS ONE MEMBER** (`AN-31`'s fix (a)): rev 1's required sets are withdrawn — the creation repair runs before the registry — so `paneIds`/`zoneIds` are optional thunks defaulting to the foundation's literals, and `standMissingFamilies()` is the additive post-registry pass. · **Rev:** 1 — **NEW**: `docs/L2/view-record/composed-domains.md` rev 1 fixes the cells; this page fixes the declarations under them (`D-1`, `D-2`; `design.md` stands at 150/150)
- **Ceiling:** 150 lines (class max); replaced, never appended (D-1, D-2) · **A stub is a DECLARATION and never a body** (D-3) · **Citations:** a site, never an offset (D-41)
- **Inputs:** `composed-domains.md` §1–§4; `docs/L3/declaration-registry/signatures.md` §2; `src/main/view-record/index.ts` (`ViewRecordOptions`, `paneNodeAdmits`, `zoneNodeAdmits`, `paneOf`, `repairPanes`, `repairedZones`, `zoneFamilyStatesSizes`), `src/shared/view-shape.ts` (`viewPanesPlaceholder`, `viewZonesPlaceholder`) · **Read order:** §1 the instance's inputs → §2 the placeholders → §3 the readers → §4 the invariants

## 1. `src/main/view-record/index.ts` — the two sets, required

```ts
export interface ViewRecordOptions {
  readonly store: Store
  readonly delivery: ViewDelivery
  /** THE PANE DOMAIN, COMPOSED, ASKED WHERE IT IS NEEDED (`composed-domains.md` §2; `AN-31`'s fix (a)): a THUNK, because the
   *  creation repair runs before the registry exists and the admission predicates run after it. **ABSENT ANSWERS
   *  `DECLARED_PANE_IDS`** — the foundation's own literal, and never `[]`, which would empty the creation repair. */
  readonly paneIds?: () => readonly string[]
  /** THE ZONE DOMAIN, same rule. */
  readonly zoneIds?: () => readonly string[]
  /** **THE SECOND INSTANT** (`AN-31`): the additive pass over the composed set, called once by `main.ts` after the registry
   *  stands. It adds the records the composed set names and the family lacks, and never rewrites a stated member (`C-9`). */
  standMissingFamilies?(): ViewMissingFamiliesAnswer
}
```

## 2. `src/shared/view-shape.ts` — the placeholders take the set

```ts
/** ONE RECORD PER COMPOSED PANE ID (`D-192`, `D-186`; `composed-domains.md` §1, §3): both axis members at
 *  `DEFAULT_PANE_SIZE`, `bounds` on `DEFAULT_PANE_ID` alone (absence IS the stage) and `MENUS_PANE_ZONE_ID` on every
 *  other id — **so a module pane is minted by the SAME branch and costs this function no figure and no member**
 *  (findings 3). A fresh record per call and per pane (`viewThemePlaceholder`'s rule). */
export const viewPanesPlaceholder = (ids: readonly string[]): Record<string, unknown>

/** ONE RECORD PER COMPOSED ZONE ID (`D-233`): `DEFAULT_ZONE_SIZES`' figure where the table names the id, the EMPTY record
 *  where it does not — today's declared degradation, unchanged, and the module zone's memberless record is its lawful
 *  consequence, never a second default (`composed-domains.md` §4 `OW-1`). */
export const viewZonesPlaceholder = (ids: readonly string[]): Record<string, unknown>
```

## 3. The readers that gain the composed set, and the one that does not

```ts
/** `paneNodeAdmits`: an id outside the composed pane set is refused BY NAME (the landed shape test, its set composed). */
function paneNodeAdmits(id: unknown, paneIds: readonly string[]): boolean

/** `zoneNodeAdmits`: the same, one family over; a family record naming an undeclared zone is refused there. */
function zoneNodeAdmits(id: unknown, zoneIds: readonly string[]): boolean

/** `paneOf`'s zone arm: a pane naming a zone outside the composed zone set is refused, not silently dropped. */
function paneOf(value: unknown, zoneIds: readonly string[]): ViewPaneReading | null

/** `repairPanes`: the creation repair's whole value is `viewPanesPlaceholder(paneIds)`. */
const repairPanes = (getStore: () => Store | null, paneIds: readonly string[]): ViewRepair

/** `repairedZones` / `zoneFamilyStatesSizes`: both iterate the COMPOSED zone set — the predicate is NOT loosened, so a
 *  memberless module zone answers `false` and the boot-time repair that follows is the lawful cost (`D-191`). */
const repairedZones = (held: unknown, zoneIds: readonly string[]): Record<string, unknown>
const zoneFamilyStatesSizes = (family: unknown, zoneIds: readonly string[]): boolean
```

```ts
/** THE CONSTRUCTION'S DECLARATIONS NOW CARRY THE TWO THUNKS (`AN-31`): the creation's constraints are built before the store,
 *  so each family's repair reads the thunk's answer at the instant it fires.
 */
export function viewConstraintDeclarations(
  getStore: () => Store | null,
  paneIds?: () => readonly string[],
  zoneIds?: () => readonly string[],
): readonly ViewConstraintDeclaration[]

/** THE SECOND PASS'S ANSWER, a value and never a throw (`D-105`): what was ADDED per family, in the family's own words. */
export interface ViewMissingFamiliesAnswer {
  readonly panes: { readonly status: 'committed' | 'absent'; readonly added: readonly string[] }
  readonly zones: { readonly status: 'committed' | 'absent'; readonly added: readonly string[] }
}

/** `ViewRecord.standMissingFamilies(): ViewMissingFamiliesAnswer` — the SAME mint-the-absent rule, at the instant the
 *  registry stands. A family that already stands is READ, never rewritten; only the absent records are written, through
 *  the same whole-value path the creation uses. **A ZONE WHOSE PLACEHOLDER STATES NO FIGURE IS SKIPPED**: the family judge
 *  is not loosened, so a memberless zone would be refused by the constraint the pass must satisfy — `OW-1`'s consequence,
 *  named rather than guessed. */
```

- **`defaultPaneGeometry(id)` IS UNMOVED AND TAKES NO SET**: it answers one id's figure and reads no domain; a module pane reaches it through the same loop as a foundation pane, which is why no pane id is spelled in the placeholder (`D-41`).

## 4. What L4 must not type, and the invariants the stubs carry

- **No defaulted set**: `paneIds`/`zoneIds` are required and are never derived, re-sorted or unioned here — the registry's answer is the set (`D-129`).
- **No second list**: the placeholder and the repair are given ONE list, so the set and the placeholder cannot drift; a derivation inside either function would be the second authority `D-151` deletes.
- **No loosened predicate**: `zoneFamilyStatesSizes` still quantifies over every composed zone id; a module zone with no figure makes it `false` rather than being excused, and the visible result is `D-191`'s unpainted zone (`OW-1`).
- **No new member on a record**: a module pane's record carries exactly the foundation panes' members (`width`, `height`, and one of `zone`/`bounds`) and no `id` — the key is the id (`viewPanesPlaceholder`'s own rule).
- **The renderer's iterating reads are `S-18`'s** (`renderer.ts`'s `DECLARED_PANE_IDS.indexOf` order and the maps) and are not declared here (`composed-domains.md` §2).
- **No body on this page and no figure in it**: the sizes are `DEFAULT_PANE_SIZE`'s and `DEFAULT_ZONE_SIZES`', read where they live (`D-41`, `D-26`).

```boundary-declared
{"unit":"modularity","layer":"L3","module":"view-record","writes":[{"path":"docs/L3/view-record/composed-domains-signatures.md","d":"D-306","why":"this page, rev 2 \u2014 fix (a) taken and LANDED: the thunks, the second-instant member, the parameterised family and the constraint projection; the block is replaced rather than appended (D-2), so it names only this pass's writes"},{"path":"src/shared/view-shape.ts","d":"D-306","why":"`viewPanesPlaceholder`/`viewZonesPlaceholder` take the composed id list, so the placeholder and the repair stay one spelling (`D-151`); `defaultPaneGeometry` is unmoved","by":"L4"},{"path":"src/main/view-record/index.ts","d":"D-306","why":"`S-7` LANDED \u2014 `ViewRecordOptions.paneIds?/zoneIds?` as thunks defaulting to the foundation's literals; `paneOf`/`paneNodeAdmits`/`panesAdmitAt`/`zoneNodeAdmits`/`zonesAdmitAt` and the two routes read the thunks; `panesMustStand`/`zonesMustStand`/`repairPanes`/`repairZones`/`repairedZones`/`zoneFamilyStatesSizes` take them; `viewFamily`/`viewConstraintDeclarations` thread them; `repairedPanes` and `standMissingFamilies()` are the additive second pass, which SKIPS a zone with no figure (`OW-1`)","by":"L4"},{"path":"src/main/view-surface/index.ts","d":"D-306","why":"the surface passes the thunks to the record and projects `standMissingFamilies()` \u2014 one member added to the crossing's surface, a boot act and not a route","by":"L4"},{"path":"src/main/main.ts","d":"D-306","why":"app-shell's file: the two thunks (`registry?.declaredPaneIds() ?? DECLARED_PANE_IDS`) are handed to `viewConstraintDeclarations` and `createViewSurface`, and the second pass runs after the registry with its additions logged by name","by":"L4"},{"path":"tests/integration/store-view-record/composed-domains.test.ts","d":"D-306","why":"`M-7` filed: the creation writes the foundation's records only; the second pass mints the module pane at the family's default geometry and carries a stated member; the two admission seats agree before and after the set grows; and a family that names every composed id is not written at all","by":"L4"},{"path":"tests/integration/store-view-record/crossing.test.ts","d":"D-306","why":"the surface census re-grained (`D-146`): six routes plus ONE boot act, and still no subscription member (`D-219`)","by":"L4"},{"path":"tests/integration/store-view-record/zone-family.test.ts","d":"D-306","why":"the same surface census re-grained, one family over","by":"L4"}]}
```
