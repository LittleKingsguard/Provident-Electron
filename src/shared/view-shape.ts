// src/shared/view-shape.ts — THE VIEW RECORD'S DECLARED SHAPE, ONE SPELLING FOR BOTH REALMS (D-88).
//
// WHY THIS FILE EXISTS AT ALL, AND WHY IT IS `shared/` RATHER THAN `main/`. The crossing declares the view record's THREE
// families in `src/main/view-record/index.ts` (D-87, D-91; the appearance family is `D-97`'s and its vocabulary is at the
// end of this file), and the RENDERER reads the same three through the same member
// (`src/renderer/view-client.ts`). Two realm-local copies of the shapes, the measured defaults and the per-pane and
// per-zone derivations would be two answers to "what is a pane geometry" and to "what is a zone" — the one-spelling rule
// (`D-73`) applied to a vocabulary rather than to a function. So the vocabulary is here, `main` re-exports every name from
// its own module (no cite moves), and the renderer imports it instead of reaching into a main-process module.
//
// IT IS THE SHAPE AND NOT A STORE (D-78's ruling 3, D-88). Nothing here holds anything: these are type declarations, EIGHT
// constants (the two declared pane ids, the one zone the menus pane declares, the two measured pane defaults, the two
// declared id sets built from them, and the FOUR ZONE FIGURES), and SIX PURE functions (the three placeholders and the
// three derivations). No address space, no persistence, no constraint, no listener, no instance — a value of these types is
// thrown away and rebuilt on every delivery, which is exactly what makes it a projection rather than a record.
//
// **THE MEASURED DEFAULTS ARE THE TREE'S OWN AND NOT THIS FILE'S INVENTION** (D-87's ground, quoted rather than re-derived):
// MEASURED 2026-11-03, the reading `D-87` took: the authored pane's `props` read `size '100'`, `min '0'`, `max '200'`, and
// `gutterSeamExample`'s `startSizeOf`/`boundsOf` fell back to the same three figures. **NEITHER IS CARRIED ANY MORE** — the
// node's three props and the two seam readers went together at `F11` (`D-129`, `D-169`), so the figures above are a dated
// reading and no longer a site. The frozen store the view record replaces held NO pane default at all, so a read that
// MISSed at both of its tiers answered `undefined` — an unusable value that made the release refuse `'unusable-default'`
// with ZERO writes and made every move INVALID. The default is therefore the placeholder a REPAIR mints at the store's
// creation (`panes-must-stand`), and the same value this file's derivation answers for a pane the standing family does not
// name — one authority read from both sides. **AND THE ZONE FAMILY HAS A DEFAULT NOW, ONE FIGURE PER DECLARED ID, WHICH IS
// THE OTHER HALF OF THE SAME RULE** (`D-233`'s item (4)): `D-191`/`D-192` refused to lend the zones `DEFAULT_PANE_SIZE`
// because a pane's figure is not a zone's, and that refusal STANDS — what was missing was a zone's own declared figures,
// and `DEFAULT_ZONE_SIZES` below is them. **AND ITS PLACEHOLDER IS NO LONGER *"THE FAMILY THAT NAMES NO ZONE"***: that
// sentence is SUPERSEDED BY POINTER and not reworded (`D-46`) — the creation repair writes EVERY DECLARED ZONE ID
// (`viewZonesPlaceholder` below, FOUR ids since `D-181`), because a leaf write needs the zone's OWN NODE to stand under it
// and an open id set could not guarantee one (`D-151`, `D-139`); **AND SINCE `D-233` EACH OF THOSE RECORDS STATES A `size`**,
// because the record naming an id is not the same thing as the zone presenting on the surface.

/** **ONE PANE'S GEOMETRY, ADMITTED FIELD BY FIELD: an unknown member is dropped, never carried.**
 *
 *  **THE MEMBER SET IS `width`/`height`/`bounds?`/`zone?`, AND BOTH AXIS MEMBERS ARE STORED AND BOTH REQUIRED** (`D-189`,
 *  which SUPERSEDES `D-186`'s *"one `size`, two axes"* BY POINTER and not by rewording, `D-46`). Each member's own name
 *  says its axis, so no reader needs the `zone` to know what a figure measures — and the axes are two members rather than
 *  one precisely so that a pane dragged from a sidebar into a `top` zone does not arrive reusing a height as a width.
 *  **THE MEMBER THE PANE'S `zone` DOES NOT MAKE ADJUSTABLE IS RETAINED AND UNPAINTED, AND IT IS THE FEATURE**: it is the
 *  memory a zone change reads again, and it is not a second authority, because at any instant exactly one figure is
 *  painted per axis (`C-11`).
 *
 *  **`bounds` IS OPTIONAL, AND ABSENT IS LAWFUL RATHER THAN REPAIRED** (`D-186`, `D-129`): one pair read against the
 *  ADJUSTABLE axis — stored for `pane-a`, because the stage is derived and has no zone to inherit a clamp from, and absent
 *  for a zone-resident pane, whose clamp is the LAYOUT's (the top zone's width is full width and stored nowhere), so a
 *  required pair could only be invented. **`zone` IS OPTIONAL TOO** (`C-9`, `D-183`): present, it names one of
 *  `DECLARED_ZONE_IDS` and SELECTS which axis member a gesture may move; absent, it says the pane lives in the STAGE, which
 *  is not one of the four and therefore has no id to name.
 *
 *  **`index` IS THE ORDER, AND IT IS THE ONE MEMBER A GESTURE STATES RATHER THAN THE CREATION REPAIR.** The user defined
 *  what rearrangement means: *"if 'Menu' is at the top of the left sidebar, dragging 'Inspector' into the top of the
 *  sidebar should show the preview at the top and push the menu pane down (and commit in this placement). If both are in
 *  the top zone in the left-to-right order of menu, inspector, dragging menu to the right of inspector should change the
 *  order to inspector, menu"* — so a placement is `(zone, place among the panes)`, and the second half needs a member.
 *  **IT IS A PER-PANE NUMBER AND NOT A FAMILY SEAT, AND THAT IS A MEASURED CONSTRAINT RATHER THAN A PREFERENCE**: the
 *  `tabs` family's `order` seat is the corpus's precedent (one array, insertion a single fact), and this family CANNOT
 *  carry its sibling — `tests/e2e/app-layout/app-layout.test.ts`'s `AL-8` (gating, unmarked) asserts that `['panes']`
 *  names EXACTLY `DECLARED_PANE_IDS`, so a fourth key under that root reds by name. A pane's own record may carry a member
 *  the family's KEY SET does not see, so the place travels with the pane it places.
 *  **AND IT IS ABSENT ON EVERY PANE UNTIL A GESTURE STATES ONE, WHICH IS NOT A DEFAULT SPELLED AS SILENCE**: the reading's
 *  own order (the family's key order) IS the initial order, so an `index` written by the repair would state a fact the
 *  family already states — and `paneGeometryIn`'s answer is pinned member-for-member by
 *  `tests/integration/store-view-record/crossing.test.ts` (gating), which is the second measured reason this member is
 *  written by the act that arranges and by nothing else. A pane stating no `index` sorts at its own family position, so a
 *  profile written before this member existed keeps exactly the order it rendered. */
export interface ViewPaneGeometry {
  readonly id: string
  readonly width: number
  readonly height: number
  readonly bounds?: { readonly min: number; readonly max: number }
  readonly zone?: string
  readonly index?: number
}

/** **ONE ZONE, AS THE DRAG'S TWO ZONE TURNS READ IT (D-91) — AND ITS FOUR MEMBERS ARE THE FROZEN STORE'S, MEASURED, NOT
 *  THIS FILE'S INVASION.** The render turn reads a zone's `size` and `display` for its layout call
 *  (`renderer.ts:1799-1805`) and `candidatesFor` reads its opaque `slot` and its caller-measured `distance`
 *  (`:1935-1941`); those four are the whole family, every one of them at `mem`, and **EACH IS INDIVIDUALLY OPTIONAL**,
 *  which is measured rather than supposed: the tree's own writers seed `size`+`display` for three zones and `slot` alone
 *  for the third, and its two zone batteries write `slot`+`distance` with no `size` and no `display` at all. So a zone
 *  record names the members it has and this vocabulary carries no member the writer did not supply.
 *
 *  **`slot` IS OPAQUE AND `size`/`distance`/`display` ARE NOT.** The flow's own contract calls the slot the caller's
 *  opaque token — `candidatesFor` hands it through as `candidate` and this module never interprets it — so it is admitted
 *  by the crossing's boundary domain and carried as `unknown`. `size` is the zone's stored FIXED DIMENSION — its HEIGHT
 *  for `top`/`bottom` and its WIDTH for `left`/`right`, the axes the paint writes it on (`D-233`, `D-185`), so the figure
 *  means the length of the one axis the zone FIXES and nothing else — whose `0` IS THE CALLER'S MINIMIZE MARKER (the
 *  composition's `DRAG_MINIMIZE_MARKER`) and which is never negative; `distance` is the
 *  caller's own measure of how far a candidate is, finite and otherwise uninterpreted; `display` is the zone's state word,
 *  and the tree's only two spellings are strings (`'normal'`, `'minimized'`) handed to a layout call that compares them. */
export interface ViewZone {
  readonly id: string
  readonly slot?: unknown
  readonly distance?: number
  readonly size?: number
  readonly display?: string
}

/** **THE APPEARANCE DECLARATION AS `src/shared/theme.ts` COMPUTES IT — `{name, value, removal}`, CARRIED WHOLE** (D-97).
 *  The mechanism answers exactly these three members (`ThemeAttributeWrite`, `applyThemeDeclaration`), and this type is the
 *  CROSSING's spelling of them rather than a second answer: `name` is the caller-held attribute name echoed — `null` where
 *  no caller has named one, which at a fresh boot is every record — `value` the token it was resolved against, and `removal`
 *  the mechanism's removal arm. **NO MEMBER HERE IS DERIVED IN THIS REALM**: the record carries the mechanism's answer and
 *  the renderer applies it (`D-96`'s one-write surface, now fed by a record rather than computed at a boot). */
export interface ViewThemeDeclaration {
  readonly name: string | null
  readonly value: string
  readonly removal: boolean
}

/** **THE THEME FAMILY'S ONE VALUE — THE FOURTH FAMILY OF THE VIEW RECORD (D-97), AND ITS MEMBERS ARE THREE.**
 *  `token` is the appearance setting the app's own authored control produced, NORMALISED BY THE MECHANISM (`resolveTheme`'s
 *  `setting` member: the caller's string, or `null` for the empty setting the mechanism declares as absence); `attribute`
 *  is the caller-held attribute NAME the act carried, the input the derivation is a function of; and `declaration` is the
 *  mechanism's own answer for that pair. **WHY A DERIVED MEMBER IS STORED AT ALL, AND NOT RECOMPUTED AT THE READ**: clause 1
 *  of the convention (`D-82`) is a constraint over a VALUE, so a member recomputed on read could never be stale and the
 *  pair would have nothing to judge — and a read is the one arm clause 4 forbids a re-derivation on. The record is therefore
 *  SELF-DESCRIBING: what stands at the address is what the mechanism said about the setting it carries, and the pair
 *  `theme-must-stand` judges exactly that agreement.
 *
 *  **`token` AND `attribute` ARE WRITTEN AS ABSENCE WHEN THEY ARE `null`**, which is the crossing's boundary's rule and not
 *  this file's taste: the store carries strings, booleans, finite numbers, plain objects and arrays and REFUSES `null`
 *  (measured, `D-87`, `D-91`). So a record read back answers `null` for
 *  both through the admission, while the value standing at the address simply does not name them. */
export interface ViewThemeRecord {
  readonly token: string | null
  readonly attribute: string | null
  readonly declaration: ViewThemeDeclaration
}

/** **THE RECORD BEFORE ANY CALLER HAS NAMED AN ATTRIBUTE — A FRESH ONE ON EVERY CALL, so no caller can move this file's own
 *  constant** (`defaultPaneGeometry`'s rule). **ITS DECLARATION IS THE MECHANISM'S OWN ANSWER FOR THE ABSENT PAIR**, and that
 *  is a claim a row owns rather than a comment: `applyThemeDeclaration(null, null)` answers `{name: null, value: '',
 *  removal: true}`, which is this record's declaration member for member. It is the placeholder the creation repair mints
 *  and the declared default the read answers for a family that does not stand — ONE value at both sites, which is what keeps
 *  a placeholder from being a second authority beside the mechanism. **NOTHING CAN BE APPLIED FROM IT**: `name` is `null`,
 *  so there is no `props.<name>` for a renderer to write. **THAT IS A PROPERTY OF THIS VALUE AND NO LONGER A CLAIM ABOUT
 *  A BOOT** — `D-97` read it as what makes a boot silent, which held only while the family was `mem`; from `D-98` the tier
 *  is `file`, a SECOND boot's record may name an attribute, and boot silence is the boot PATH's (`fill()` adopts and
 *  applies nothing, and only a delivery applies). The placeholder still stands where the address is absent, which is
 *  every fresh profile. */
export const viewThemePlaceholder = (): ViewThemeRecord => ({
  token: null,
  attribute: null,
  declaration: { name: null, value: '', removal: true },
})

/** **WHERE ONE PANE'S GEOMETRY CAME FROM, AND IT NAMES A REAL DIFFERENCE**: `'record'` when the family names this pane and
 *  `'default'` when the measured default answered because it does not. The member exists because the alternative is a read
 *  that cannot be told from a store that answered `100` — the distinction `D-84` insisted on when it refused to let a
 *  placeholder be substituted at the READ and called a record. **THE ZONE FAMILY CARRIES THE SAME TWO WORDS AND THEY MEAN
 *  THE SAME THING THERE** (D-91): `'record'` when the family stands and this module could read it, `'default'` when it
 *  answered nothing readable — and the zone family has **no third word**, because a zone has no measured placeholder for
 *  the derivation to fall back to (see `zoneIn`). */
export type ViewGeometrySource = 'record' | 'default'

/** **THE PANE THE APP HAS, MEASURED AND NOT CHOSEN** — the id the drag composition's `paneIdOf` falls back to and the id
 *  its release turn hard-codes. The AUTHORED DOM PANE IS A DIFFERENT NAME (`demo-envelope.ts` authors `gutter-pane`): the
 *  store's family is keyed by the id the COMPOSITION addresses, and that is the rendering's business, not the address's. */
export const DEFAULT_PANE_ID = 'pane-a'
/** **THE SECOND DECLARED PANE — THE MENUS PANE, AND IT DISPLACES NOTHING** (`D-183`, on `D-180`'s eighteen items): `pane-a`
 *  keeps its subject — the gutter card's resizable pane, whose only producer is the release turn's
 *  `commitPane(DEFAULT_PANE_ID, { height })` — so the `['drag']` machinery, `panesMustStand`, the compliance battery and the
 *  gating `renderer-wiring` rows keep theirs, and this id is DECLARED BESIDE it rather than in its place. **IT IS SPELLED
 *  HERE ONCE** and the set below is built from it, so the declared domain and the placeholder cannot drift apart. */
export const MENUS_PANE_ID = 'pane-menus'
/** **THE THIRD DECLARED PANE — A SECOND PANE IN THE `top` ZONE, SO A ZONE HOLDS TWO AND THEIR ARRANGEMENT IS EXERCISABLE**
 *  (the user's second change verbatim: *"Add additional demo panes so that this can be tested with pane rearrangement in a
 *  zone"*). **IT DISPLACES NOTHING, EXACTLY AS THE MENUS PANE DISPLACED NOTHING** (`D-183`): `pane-a` keeps the gutter
 *  card's resize and `pane-menus` keeps the eighteen items and the menus handle, and this id is DECLARED BESIDE them.
 *  **IT IS ZONE-RESIDENT AT THE SAME DECLARED ZONE THE MENUS PANE DECLARES** (`MENUS_PANE_ZONE_ID`), because "two panes in
 *  one zone" is the whole of what it exists for: two panes that stand in different zones could never exercise an
 *  arrangement. **ITS FIGURES ARE THE FAMILY'S OWN `DEFAULT_PANE_SIZE` AND ARE NOT THIS CONSTANT'S**: the placeholder below
 *  writes both axis members for every declared id from the one measured default, so this id buys no figure and no bounds —
 *  it buys a pane. **AND THE ONE THING IT DOES COST IS THE `PANE_NODE_IDS` ENTRY**: that map is TOTAL over
 *  `DECLARED_PANE_IDS` (`renderer-wiring`'s `PM-1`, gating), so a declared id with no authored node would be a pane the
 *  record holds and no paint can reach. */
export const INSPECTOR_PANE_ID = 'pane-inspector'
/** **THE MEASURED DEFAULT SIZE** — the figure `D-87` measured off the authored pane's `props.size` (MEASURED 2026-11-03),
 *  which the node NO LONGER CARRIES (`F11`: the prop and the two seam readers that read it went together), and the figure
 *  `panes-must-stand` repairs to. **AT `D-189` IT IS THE DEFAULT FOR BOTH AXIS MEMBERS**, and its VALUE does not move: the
 *  split renamed `pane-a`'s member and kept the number (`D-192`). */
export const DEFAULT_PANE_SIZE = 100
/** **THE MEASURED DEFAULT BOUNDS PAIR** — the pair `D-87` measured off the authored pane's `props.min`/`props.max`
 *  (MEASURED 2026-11-03), which the node NO LONGER CARRIES (`F11`), and the pair `panes-must-stand` repairs to. A VALUE,
 *  copied into a fresh record by `defaultPaneGeometry` rather than handed out by reference, so no caller can move this
 *  file's own constant. */
export const DEFAULT_PANE_BOUNDS: { readonly min: number; readonly max: number } = { min: 0, max: 200 }
/** **THE PANE FAMILY'S ID DOMAIN, CLOSED AT THREE IDS — AND CLOSED BECAUSE A LEAF WRITE NEEDS IT TO BE** (D-138, **widened
 *  one → two at `D-183`, two → three for the second demo pane**; `DECLARED_ZONE_IDS` below is the same closure one family
 *  over, `D-151`). `['panes', id]` must
 *  be GUARANTEED to stand for every id the route is handed, and the store creates no parent (measured at this node), so an
 *  OPEN id set can guarantee nothing: the domain closes, and the creation repair writes exactly these ids, each with its
 *  declared default geometry (`viewPanesPlaceholder` below). **IT IS BUILT FROM THE ID CONSTANTS AND NOT SPELLED BESIDE
 *  THEM**, so the drag's own fallback (`DEFAULT_PANE_ID`) can never name a pane this record refuses and the
 *  placeholder cannot drift from the set. **THE SECOND ID NAMES ITS OWN READER, WHICH IS WHY THE WIDENING IS LAWFUL**: the
 *  menus pane renders eighteen authored items and its `width` is the member the paint writes, while `pane-a`'s subject —
 *  the gutter card's resize, the drag's release its only producer — is UNCHANGED (`OWED-1`, settled at `D-183`). **AND THE
 *  THIRD ID NAMES ITS OWN READER THE SAME WAY**: `INSPECTOR_PANE_ID` is the second pane in the `top` zone, authored so a
 *  zone holds two and a rearrangement in a zone can be exercised at all — a widening that adds an id and no node, no
 *  gesture entry and no arrangement would be three declared panes and nothing to look at. */
export const DECLARED_PANE_IDS: readonly string[] = [DEFAULT_PANE_ID, MENUS_PANE_ID, INSPECTOR_PANE_ID]

/** **THE ZONE FAMILY'S ID DOMAIN, CLOSED AT FOUR IDS — SPELLED, NOT DERIVED, AND THAT IS `D-192`'S SETTLEMENT** (D-151,
 *  D-139, **widened one → four at `D-181`**). `['zones', id]` must be GUARANTEED to stand for every id the route is handed,
 *  and the store creates no parent (measured at this node): an OPEN id set can guarantee nothing, so the domain closes and
 *  the creation repair writes exactly these ids, each with its declared default `size` (`DEFAULT_ZONE_SIZES` below since
 *  `D-233`; an EMPTY record before it).
 *
 *  **AND `DEFAULT_ZONE_ID` IS RETIRED, NOT RE-SPELLED** (`D-192`, settling `OWED-L2-1`): that constant existed because the
 *  declared set held ONE id and something had to be the default, and `zone-1` is not one of the four — so it named nothing
 *  once the set widened, and **there is no default zone to name**, because a pane's `zone` is OPTIONAL and its absence
 *  means the STAGE (`C-9`), the only default the design has. `D-169`'s dead-reader discipline, applied to a constant: it
 *  went with its readers, and no placeholder below re-spells it. **THE FOUR IDS ARE A MEASUREMENT AND NOT A PREFERENCE**:
 *  a pane naming `top` forces `top` to be a declared id, so the widening is the pane's default's price (`D-181`) — and the
 *  two members that were dead surface since `D-169`, `size` and `display`, are the layout's own figures now (`D-185`,
 *  `D-187`). */
export const DECLARED_ZONE_IDS: readonly string[] = ['top', 'bottom', 'left', 'right']
/** **THE ZONE THE MENUS PANE DECLARES — THE MEMBER THAT MAKES ITS `width` THE ADJUSTABLE ONE** (`D-183`, `D-186`, `D-189`,
 *  `D-192`). **IT IS NOT A DEFAULT ZONE AND NOT A FALLBACK**: no route of this module writes a `zone` (`C-8`), so its only
 *  two writers are the creation repair below and an outside `data.write`, and both are judged by the family's own parse —
 *  which is why a spelling that drifted off `DECLARED_ZONE_IDS`' `top` would be REFUSED rather than stored (`paneOf`,
 *  `paneNodeAdmits`, `D-105`). **ITS NAME IS THE MENUS PANE'S AND ITS VALUE IS THE ZONE-RESIDENT PLACEHOLDER'S**: the
 *  placeholder below writes this one figure for EVERY declared id that is not the stage pane, so the second demo pane
 *  arrives in `top` beside the menus pane from the same declaration and no second zone literal joins this file. */
export const MENUS_PANE_ZONE_ID = 'top'

/** **THE FOUR ZONE FIGURES — ONE DECLARED DEFAULT `size` PER DECLARED ZONE, SPELLED ONCE AND READ BY BOTH WRITERS**
 *  (`D-233`'s item (4): *"the zone repair should repair a default `size` exactly as `panes-must-stand` repairs a pane's
 *  geometry"*). **THE AXIS IS THE PAINT'S AND NOT THIS TABLE'S**: `top` and `bottom` are HEIGHTS and `left` and `right`
 *  are WIDTHS (`renderer.ts`'s `LAYOUT_ZONE_AXES`, `D-185`), so each figure is a length along the one axis that zone FIXES
 *  and is reinterpreted nowhere — the rule `ViewPaneGeometry`'s two axis members keep one family over. **AND IT IS A
 *  `size`, THE SAME MEMBER THE FROZEN STORE'S ZONES CARRIED** (`ViewZone` above), because the paint's operand is the
 *  record's member and not a second vocabulary.
 *
 *  **THE FOUR FIGURES ARE THE CORPUS'S OWN MEASURED PROBE READING — `top` 140, `bottom` 60, `left` 120, `right` 90 — KEPT
 *  UNCHANGED, FOR THREE REASONS.** (i) **THEY ARE A MEASUREMENT AND NOT THIS FILE'S INVENTION**, which is the standard
 *  `DEFAULT_PANE_SIZE`/`DEFAULT_PANE_BOUNDS` already answer to: a fresh figure here would be a preference standing where an
 *  instrument spoke. (ii) **EVERY ONE IS POSITIVE, AND THAT IS THE FIGURE'S WHOLE OFFICE**: `driveLayoutRegions` writes a
 *  zone's fixed axis into its `css.style` only from a `size` the record STATES, and writes NOTHING for a zone stating none
 *  (`D-233`: *"a ZONE STATING NO size IS WRITTEN NOTHING: no fallback, no default"*) — so a zone with no figure is a strip
 *  of no extent, present in the graph and in the rendered HTML and unpresentable and unpressable on the surface. That is
 *  the envelope's own `14px` handle argument at this family: a strip of zero thickness cannot be pressed at all. (iii) THEY
 *  LEAVE THE STAGE THE BULK OF THE WINDOW — `140 + 60 = 200` vertical and `120 + 90 = 210` horizontal against a remainder
 *  the arrangement gives the stage (`D-176`, `D-185`) — which is the bar-under-the-top-zone, strip-at-the-foot, two-side-
 *  rails reading the user's report asks for, and each is large enough to see at the app's `0.8rem` UI size.
 *
 *  **IT IS A DECLARED TABLE AND NOT FOUR FREE CONSTANTS**, and the shape is `DECLARED_PANE_IDS`' one module over: the
 *  placeholder below READS IT, so the four ids and the four figures cannot drift inside this file. **A DECLARED ID THE
 *  TABLE DOES NOT NAME ANSWERS THE EMPTY RECORD THE PLACEHOLDER WROTE BEFORE** (`D-181`), so a widening that adds an id and
 *  not a figure degrades to that id's old behaviour rather than inventing a number, and no figure is derived from a
 *  sibling. **NOTHING ELSE IN THE TREE STATES A ZONE FIGURE**: the envelope authors no zone dimension (an authored figure
 *  beside `['zones'].size` would be `D-129`'s second authority), so this table is the ONE source both writers read. */
export const DEFAULT_ZONE_SIZES: readonly { readonly id: string; readonly size: number }[] = [
  { id: 'top', size: 140 }, // a HEIGHT: the bar under the title bar, where the menus pane stands
  { id: 'bottom', size: 60 }, // a HEIGHT: the strip at the foot of the window
  { id: 'left', size: 120 }, // a WIDTH: the rail at the stage's left
  { id: 'right', size: 90 }, // a WIDTH: the rail at the stage's right
]

/** **THE ZONE FAMILY'S PLACEHOLDER: EVERY DECLARED ZONE ID WITH ITS DECLARED DEFAULT `size`** — `{'top': {size: 140},
 *  'bottom': {size: 60}, 'left': {size: 120}, 'right': {size: 90}}` since `D-233`, and **A FRESH RECORD ON EVERY CALL**,
 *  both for the family and for each zone in it, so no caller can move this file's constants or the set it is built from
 *  (`viewThemePlaceholder`'s rule). **IT REPLACES `D-91`'S *"THE FAMILY THAT NAMES NO ZONE"* BY POINTER AND NOT BY
 *  REWORDING** (`D-46`, `D-151`): that value cannot satisfy the leaf write's precondition, while `{}` IS a zone this
 *  file's vocabulary admits (`zoneIn` names a memberless zone and `main`'s `zoneOf` answers `{id}` for one), and the record
 *  it creates is the NODE a leaf write stands under. **AND AT `D-181` IT WROTE FOUR RECORDS WHERE IT WROTE ONE**, which is
 *  the whole of that widening's repair: each of the four ids the paint addresses must stand for a leaf write at
 *  `['zones', id, 'size']` to land under it.
 *
 *  **`D-181`'s MEMBERLESS RECORD WAS THE GAP THIS CLOSES** (`D-233`'s item (4), `D-220`'s *"no writer under `src/` states a
 *  `size`"*): a zone whose record names no member is a NODE the leaf write can land under, and it is NOT a zone the paint
 *  can present — the two halves of `OWED-4`'s answer, and only the first was filled. So the record states `size` now, the
 *  repair that writes it states a figure, and a zone is present on the first frame with no writer having spoken. **THE
 *  FIGURE COMES FROM `DEFAULT_ZONE_SIZES` AND FROM NOWHERE ELSE**, so the repair, the placeholder and the paint's operand
 *  are one spelling. A route supplying no member still writes nothing and answers `committed` (`D-53`'s reading at this
 *  family) — the repair is what states the figure, not the route. */
export const viewZonesPlaceholder = (): Record<string, unknown> => {
  const family: Record<string, unknown> = {}
  for (const id of DECLARED_ZONE_IDS) family[id] = defaultZoneRecord(id)
  return family
}

/** **ONE DECLARED ZONE'S RECORD, AS BOTH WRITERS STATE IT** — the figure `DEFAULT_ZONE_SIZES` declares for that id, or the
 *  EMPTY record this placeholder wrote before it had figures (`D-181`), which is the declared degradation and never a
 *  guess: a declared id the table does not name keeps ITS OWN old behaviour instead of borrowing a sibling's number. **A
 *  FRESH RECORD EVERY CALL** (`viewThemePlaceholder`'s rule), and the whole of the record is the one member the paint
 *  reads — no `display`, no `slot`, because this file states only what it declares. */
const defaultZoneRecord = (id: string): Record<string, unknown> => {
  const held = DEFAULT_ZONE_SIZES.find((entry) => entry.id === id)
  return held === undefined ? {} : { size: held.size }
}

/** **THE PANE FAMILY'S PLACEHOLDER: EVERY DECLARED PANE ID WITH ITS DECLARED DEFAULT GEOMETRY** —
 *  `{'pane-a': { width: 100, height: 100, bounds: { min: 0, max: 200 } }, 'pane-menus': { width: 100, height: 100,
 *  zone: 'top' }, 'pane-inspector': { width: 100, height: 100, zone: 'top' }}` — and **A FRESH RECORD ON EVERY CALL**, both
 *  for the family and for each pane in it, so no caller can
 *  move this file's constants or the set it is built from (`viewThemePlaceholder`'s rule).
 *
 *  **BOTH MEMBERS OF EVERY PANE ARE WRITTEN AT `DEFAULT_PANE_SIZE`, AND THAT IS `D-192` CORRECTING `D-191`**: the shape
 *  requires BOTH axis members, so a repair writing one per pane would leave the other UNSTATED and the shape unsatisfied —
 *  and the OPERATIVE pair is `pane-menus`.`width` (the adjustable axis in a `top` zone) and `pane-a`.`height` (the figure
 *  `D-189` renames from `size`). **THE FIGURE A ZONE-RESIDENT PANE STORES IS ITS MEMORY AND NOT THE ZONE'S**: a repair that
 *  read `['zones']` for it would be this corpus's first family-crossing repair and would store a figure the layout already
 *  computes (`D-186`), so the family's own measured default stands in and the divergence is STATED rather than inherited.
 *  **THE THIRD PANE COSTS THIS PLACEHOLDER NO FIGURE AND NO MEMBER**: it is declared in `DECLARED_PANE_IDS`, the loop is
 *  over that set, and the branch below is the STAGE pane's — so it arrives with both axis members at the one measured
 *  default, `zone: 'top'` and no `bounds`, which is `C-9`/`D-186`'s shape for a zone-resident pane and no invention.
 *
 *  **THE TWO RECORD FORMS DIFFER, AND THE DIFFERENCE IS THE WHOLE OF `C-9`/`D-186`**: `pane-a` carries its `bounds` — the
 *  stage is
 *  derived and has no zone to inherit a clamp from — and NO `zone`, because absence IS the stage; every zone-resident pane
 *  (`pane-menus`, and now `pane-inspector`) carries `zone: 'top'` and NO `bounds`, whose absence is LAWFUL for a
 *  zone-resident pane and is not repaired into one. **THE SET
 *  AND THE PLACEHOLDER CANNOT DRIFT** because the family is built from `DECLARED_PANE_IDS` and the `id` member is left off
 *  each record: the key is the id here. */
export const viewPanesPlaceholder = (): Record<string, unknown> => {
  const family: Record<string, unknown> = {}
  for (const id of DECLARED_PANE_IDS) {
    const geometry = defaultPaneGeometry(id)
    const record: Record<string, unknown> = { width: geometry.width, height: geometry.height }
    // **THE BRANCH IS ON THE STAGE PANE AND NOT ON A LIST OF ZONE-RESIDENT IDS**, and that is what makes a THIRD declared
    // pane cost this placeholder NOTHING: the criterion the two records differ by is `C-9`'s — `DEFAULT_PANE_ID` is the
    // pane that stands in the STAGE, and absence of `zone` IS the stage — so every OTHER declared id is zone-resident and
    // states `MENUS_PANE_ZONE_ID`. A widening therefore adds a pane with a zone and no `bounds`, which is the lawful shape
    // for a zone-resident pane (`D-186`), and no default is invented for it (`D-174`).
    if (id === DEFAULT_PANE_ID) {
      // THE STAGE PANE: `zone` absent by `C-9`, and its OWN stored clamp because the stage has nothing to inherit from.
      record['bounds'] = { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max }
    } else {
      // A ZONE-RESIDENT PANE: its adjustable member is the one its zone frees, its clamp is the LAYOUT's, and its `zone` is
      // the member the design derives (`D-183`, `D-186`, `D-192`) — absence would place it in the stage instead.
      record['zone'] = MENUS_PANE_ZONE_ID
    }
    family[id] = record
  }
  return family
}

/** The measured default geometry for one pane — a FRESH record every call, so no caller holds the constant above.
 *  **ITS TWO FIGURES ARE THE SAME NUMBER AND ITS TWO MEMBERS ARE NOT THE SAME AXIS** (`D-189`): `width` and `height` both
 *  answer `DEFAULT_PANE_SIZE`, and neither can be left to a zone — a stage pane paints BOTH from its own record (`C-11`),
 *  so an unstated axis would leave one axis with no source (`OWED-4`'s third instance). Its `bounds` is the measured clamp
 *  the stage pane keeps; a zone-resident pane's ABSENCE of one is the placeholder's and the record's, never this default's. */
export const defaultPaneGeometry = (id: string): ViewPaneGeometry => ({
  id,
  width: DEFAULT_PANE_SIZE,
  height: DEFAULT_PANE_SIZE,
  bounds: { min: DEFAULT_PANE_BOUNDS.min, max: DEFAULT_PANE_BOUNDS.max },
})

/** **ONE PANE'S GEOMETRY OUT OF A READING, WITH THE MEASURED DEFAULT ANSWERING A PANE THE FAMILY DOES NOT NAME.** It is
 *  PURE over a value, so the crossing's route (`docs/L2/view-record/interface.md` §2), the renderer's shape
 *  (`src/renderer/view-client.ts`) and the store's own repair all read the SAME derivation: the drag's read at
 *  `renderer.ts:1700-1722` is this function's answer, never a second policy. **ITS ANSWER CARRIES `status: 'committed'`
 *  BECAUSE IT IS L2 §2's COMMITTED READING** (`docs/L2/view-record/interface.md` §2) and the crossing's own battery pins
 *  that spelling: a derivation that answered the same values without the member would be a second, quieter answer to one
 *  question — the same reason this file exists rather than two realm-local copies. */
export const paneGeometryIn = (
  panes: readonly ViewPaneGeometry[],
  id: string,
): { readonly status: 'committed'; readonly pane: ViewPaneGeometry; readonly source: ViewGeometrySource } => {
  const held = panes.find((pane) => pane.id === id)
  if (held === undefined) {
    return { status: 'committed', pane: defaultPaneGeometry(id), source: 'default' }
  }
  // **EVERY MEMBER THE FAMILY ADMITS IS CARRIED** (`docs/L2/view-record/interface.md` §3, `D-105`): the two axis members,
  // and the optional `bounds` and `zone` WHERE THE RECORD NAMES ONE — because a member the family admits and this read
  // drops is invisible to a consumer while `source.panes` still says `'record'`, which is `D-105`'s fault exactly.
  const pane: {
    id: string
    width: number
    height: number
    bounds?: { readonly min: number; readonly max: number }
    zone?: string
    index?: number
  } = { id: held.id, width: held.width, height: held.height }
  if (held.bounds !== undefined) pane.bounds = { min: held.bounds.min, max: held.bounds.max }
  if (held.zone !== undefined) pane.zone = held.zone
  // **AND THE ORDER, WHERE THE RECORD STATES ONE** — the same rule as `bounds` and `zone`: `D-105`'s fault is a member the
  // family admits and this read DROPS while `source.panes` still says `'record'`, so a member carried by `ViewPaneGeometry`
  // is carried here. Where the record states none nothing is added, which is why a fresh family's answer is the four
  // members it always was (`crossing.test.ts`'s pinned pair).
  if (held.index !== undefined) pane.index = held.index
  return { status: 'committed', pane, source: 'record' }
}

/** **ONE ZONE OUT OF A READING — AND ITS MISSING ARM IS `null`, WHICH IS A MEASUREMENT AND NOT AN OVERSIGHT** (D-91).
 *  This function is `paneGeometryIn`'s counterpart and it deliberately does NOT answer a default record, because the zone
 *  family has **no measured placeholder for the derivation to give**: the frozen store held no zone default at all, a
 *  read that MISSed at its one tier answered `undefined`, the render turn handed that `undefined` straight to its layout
 *  call (`renderer.ts:1799-1805`), and `candidatesFor` answered `[]` (`:1935-1941`). So `null` here IS the answer the
 *  app's own paths give today for a zone nothing names, and **this derivation STILL answers no default of its own** — a
 *  derivation answering `{size: 100}` would be a second authority beside the read, which is exactly the fault `D-91`
 *  refuses. **WHAT MOVED IS THE WRITER AND NOT THIS FUNCTION** (`D-233`'s item (4)): the creation repair no longer mints a
 *  memberless record — it writes every DECLARED zone id with its declared default `size` (`viewZonesPlaceholder`, one
 *  spelling) — and `D-91`'s *"the family that names no zone"* is SUPERSEDED BY POINTER and not reworded (`D-46`,
 *  `D-151`). So this derivation's two absent-looking arms are told apart by THIS function: a declared zone answers the
 *  record the family carries (`{id, size}` after a repair, `{id}` for the older memberless state), and `null` answers only
 *  for an id this record does not declare. **AND ITS OUTPUT DOES NOT MOVE WITH THE CLOSED DOMAIN OR WITH THE FIGURE**: the
 *  two zone readers' layouts are `undefined` on both arms and `candidatesFor` answers `[]` on both, so what moves is the
 *  VOCABULARY (and now the record's own members) and not a reader (`D-151` (b), (c)).
 *
 *  **PURE OVER A VALUE, AND IT COPIES**: the four members are handed out on a fresh record per call, so no caller holds
 *  the shape the client will replace on the next delivery — `defaultPaneGeometry`'s reason, applied to a family whose
 *  members are optional rather than fixed. */
export const zoneIn = (zones: readonly ViewZone[], id: string): ViewZone | null => {
  const held = zones.find((zone) => zone.id === id)
  if (held === undefined) return null
  const zone: { id: string; slot?: unknown; distance?: number; size?: number; display?: string } = { id: held.id }
  if (held.slot !== undefined) zone.slot = held.slot
  if (held.distance !== undefined) zone.distance = held.distance
  if (held.size !== undefined) zone.size = held.size
  if (held.display !== undefined) zone.display = held.display
  return zone
}
